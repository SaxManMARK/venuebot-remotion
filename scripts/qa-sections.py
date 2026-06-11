#!/usr/bin/env python3
"""Static QA over the Studio AI section configs.

Parses src/data/studioAiSections.ts (well-formed literal configs) and checks:
- clip coverage: no overlaps, no unintended micro-gaps, ends within duration
- chips fire inside their group's [from, until] window
- chip/stamp/closing windows sit inside the section duration
- every chip group window is covered by a clip or stamp (something on screen)
- proof clip files exist and are long enough for their slot (+crossfade tail)
"""

import json
import re
import subprocess
import sys
from pathlib import Path

SRC = "\n".join(
    Path(p).read_text()
    for p in ["src/data/studioAiSections.ts", "src/data/convertSections.ts"]
    if Path(p).exists()
)
FFPROBE = ".venv-whisper/bin/ffprobe"

# Evaluate the const offsets used in the file (sfB, sgB).
offsets = {m.group(1): float(m.group(2)) for m in re.finditer(r"const (\w+) = ([\d.]+);", SRC)}

def to_seconds(expr: str) -> float:
    expr = expr.strip()
    m = re.fullmatch(r"(\w+) \+ ([\d.]+)", expr)
    if m:
        return offsets[m.group(1)] + float(m.group(2))
    if expr in offsets:
        return offsets[expr]
    return float(expr)

def clip_len(path: str) -> float:
    out = subprocess.run(
        [FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"public/{path}"],
        capture_output=True, text=True,
    )
    return float(out.stdout.strip()) if out.returncode == 0 and out.stdout.strip() else -1.0

issues = []
sections = re.split(r"export const (m\dS\w+): ModuleSectionConfig = ", SRC)[1:]
for name, body in zip(sections[0::2], sections[1::2]):
    dur = float(re.search(r"duration: ([\d.]+)", body).group(1))

    clips = []
    for m in re.finditer(r'\{src: "([^"]+)", at: ([^,]+), until: ([^,]+), zoom: ([\d.]+)\}', body):
        clips.append({
            "src": m.group(1),
            "at": to_seconds(m.group(2)),
            "until": to_seconds(m.group(3)),
        })

    # clip slot checks
    prev_end = None
    for i, c in enumerate(clips):
        nxt = clips[i + 1] if i + 1 < len(clips) else None
        tail = 0.45 if nxt and abs(nxt["at"] - c["until"]) < 0.01 else 0.0
        slot = c["until"] - c["at"]
        if slot <= 0:
            issues.append(f"{name}: {c['src']} non-positive slot")
        if c["until"] > dur + 0.01:
            issues.append(f"{name}: {c['src']} runs past duration ({c['until']} > {dur})")
        length = clip_len(c["src"])
        if length < 0:
            issues.append(f"{name}: {c['src']} MISSING on disk")
        elif length + 0.05 < slot + tail:
            issues.append(f"{name}: {c['src']} too short: file {length:.2f}s < slot {slot:.2f}s + {tail} xfade tail")
        if prev_end is not None:
            gap = c["at"] - prev_end
            if 0.02 < gap < 1.0:
                issues.append(f"{name}: suspicious micro-gap {gap:.2f}s before {c['src']} (intended beats are >1s)")
            if gap < -0.01:
                issues.append(f"{name}: clip overlap {gap:.2f}s at {c['src']}")
        prev_end = c["until"]

    # bespoke beats (Convert editorial sections) cover the frame like clips do
    beats = [
        {"type": m.group(1), "at": to_seconds(m.group(2)), "until": to_seconds(m.group(3))}
        for m in re.finditer(r'type: "([\w-]+)",\s*\n\s*from: ([^,\n]+),\s*\n\s*until: ([^,\n]+),', body)
    ]
    for b in beats:
        if b["until"] > dur + 0.01:
            issues.append(f"{name}: beat {b['type']} runs past duration ({b['until']} > {dur})")

    def covered(t: float) -> bool:
        if any(c["at"] - 0.05 <= t <= c["until"] + 0.05 for c in clips):
            return True
        if any(b["at"] - 0.05 <= t <= b["until"] + 0.05 for b in beats):
            return True
        for sm in re.finditer(r"from: ([^,\n]+),\s*\n\s*until: ([^,\n]+),\s*\n\s*mode: \"full\"", body):
            if to_seconds(sm.group(1)) - 0.05 <= t <= to_seconds(sm.group(2)) + 0.05:
                return True
        return False

    # chip groups
    for gm in re.finditer(r"\{\s*(?:// [^\n]*\n\s*)*from: ([^,\n]+),\s*until: ([^,\n]+),\s*chips: \[(.*?)\]", body, re.S):
        g_from, g_until = to_seconds(gm.group(1)), to_seconds(gm.group(2))
        if g_until > dur + 0.01:
            issues.append(f"{name}: chip group runs past duration ({g_until} > {dur})")
        for cm in re.finditer(r'\{label: "([^"]+)", at: ([^}]+)\}', gm.group(3)):
            at = to_seconds(cm.group(2))
            if not (g_from - 0.01 <= at <= g_until - 0.3):
                issues.append(f"{name}: chip '{cm.group(1)}' at {at} outside window [{g_from}, {g_until}]")
        if not covered(g_from + 0.5):
            issues.append(f"{name}: chip group at {g_from} fires over an empty frame (no clip/stamp)")

    # stamps
    for sm in re.finditer(r"from: ([^,\n]+),\s*\n\s*until: ([^,\n]+),\s*\n\s*(?:mode: \"(\w+)\",\s*\n\s*)?(?:logo:[^\n]+\n\s*)?lines: \[(.*?)\]", body, re.S):
        s_from, s_until = to_seconds(sm.group(1)), to_seconds(sm.group(2))
        if s_until > dur + 0.01:
            issues.append(f"{name}: stamp runs past duration ({s_until} > {dur})")
        for lm in re.finditer(r'\{text: "([^"]+)", at: ([^,]+), variant', sm.group(4)):
            at = to_seconds(lm.group(2))
            if not (s_from - 0.01 <= at <= s_until - 0.4):
                issues.append(f"{name}: stamp line '{lm.group(1)}' at {at} outside [{s_from}, {s_until}]")

print(f"Checked {len(sections)//2} sections.")
if issues:
    print(f"\n{len(issues)} ISSUE(S):")
    for issue in issues:
        print(f"  - {issue}")
    sys.exit(1)
print("All checks passed.")
