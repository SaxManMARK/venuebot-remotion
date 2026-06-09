#!/usr/bin/env python3
"""Local VO transcription with word-level timestamps (mlx-whisper, no API key).

Produces the same outputs as scripts/transcribe-audio.mjs:
  transcripts/<slug>.transcript.json
  transcripts/<slug>.cue.md
  transcripts/<slug>.words.csv

Usage:
  .venv-whisper/bin/python scripts/transcribe-local.py <audio-file> --id M1-SD [--out-dir transcripts]
"""

import argparse
import csv
import json
import os
import re
import sys
from pathlib import Path

MODEL = "mlx-community/whisper-large-v3-turbo"
PROMPT = (
    "This is a VenueBot product video voiceover for wedding venue owners. "
    "Expected terms include VenueBot, Studio AI, Convert, Care, enquiry, enquiries, "
    "venue tours, CRM, WhatsApp, Bridebook and Hitched."
)


def format_time(seconds: float) -> str:
    total_tenths = round(seconds * 10)
    minutes, remaining = divmod(total_tenths, 600)
    secs, tenths = divmod(remaining, 10)
    return f"{minutes:02d}:{secs:02d}.{tenths}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("audio")
    parser.add_argument("--id", dest="section_id")
    parser.add_argument("--out-dir", default="transcripts")
    parser.add_argument("--language", default="en")
    args = parser.parse_args()

    # ffmpeg symlink lives next to this venv's python
    os.environ["PATH"] = str(Path(sys.executable).parent) + os.pathsep + os.environ["PATH"]

    import mlx_whisper

    source_name = args.section_id or Path(args.audio).stem
    slug = re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", source_name.lower()))

    result = mlx_whisper.transcribe(
        args.audio,
        path_or_hf_repo=MODEL,
        language=args.language,
        word_timestamps=True,
        initial_prompt=PROMPT,
    )

    words = [
        {"word": w["word"].strip(), "start": round(w["start"], 2), "end": round(w["end"], 2)}
        for seg in result["segments"]
        for w in seg.get("words", [])
    ]
    segments = [
        {"id": seg["id"], "start": round(seg["start"], 2), "end": round(seg["end"], 2), "text": seg["text"]}
        for seg in result["segments"]
    ]

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    transcript = {
        "task": "transcribe",
        "language": args.language,
        "duration": round(max((s["end"] for s in segments), default=0.0), 2),
        "text": result["text"].strip(),
        "words": words,
        "segments": segments,
    }
    (out_dir / f"{slug}.transcript.json").write_text(json.dumps(transcript, indent=2) + "\n")

    cue_lines = [
        f"# {source_name} Cue Sheet",
        "",
        f"Source: `{args.audio}`",
        "",
        "## Segment Cues",
        "",
        "| Time | Dialogue |",
        "|---|---|",
    ]
    for seg in segments:
        text = seg["text"].strip().replace("|", "\\|")
        cue_lines.append(f"| {format_time(seg['start'])}-{format_time(seg['end'])} | {text} |")
    cue_lines += ["", "## Word Cues", "", "| Time | Word |", "|---|---|"]
    for w in words:
        cue_lines.append(f"| {format_time(w['start'])}-{format_time(w['end'])} | {w['word'].replace('|', chr(92) + '|')} |")
    cue_lines.append("")
    (out_dir / f"{slug}.cue.md").write_text("\n".join(cue_lines))

    with (out_dir / f"{slug}.words.csv").open("w", newline="") as fh:
        writer = csv.writer(fh, quoting=csv.QUOTE_MINIMAL)
        writer.writerow(["start", "end", "word"])
        for w in words:
            writer.writerow([w["start"], w["end"], w["word"]])

    print(f"{slug}: {len(segments)} segments, {len(words)} words, {transcript['duration']}s")


if __name__ == "__main__":
    main()
