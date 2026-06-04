#!/usr/bin/env node

import {execFile} from "node:child_process";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {promisify} from "node:util";

const execFileAsync = promisify(execFile);

const args = process.argv.slice(2);

const getArg = (name) => {
  const index = args.indexOf(name);
  if (index === -1) {
    return null;
  }

  return args[index + 1] ?? null;
};

const audioPath = args.find((arg) => !arg.startsWith("--"));
const id = getArg("--id");
const outDir = getArg("--out-dir") ?? "transcripts";
const language = getArg("--language") ?? "en";

if (!audioPath) {
  console.error("Usage: npm run transcribe -- <audio-file> --id M1-SA");
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY. Set it before running transcription.");
  process.exit(1);
}

const sourceName = id ?? path.basename(audioPath, path.extname(audioPath));
const slug = sourceName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const prompt = [
  "This is a VenueBot product video voiceover for wedding venue owners.",
  "Expected terms include VenueBot, Studio AI, Convert, Care, enquiry, enquiries, venue tours, CRM, WhatsApp, Bridebook and Hitched.",
].join(" ");

await mkdir(outDir, {recursive: true});

const redactSecret = (value) =>
  String(value).replaceAll(process.env.OPENAI_API_KEY, "[redacted-api-key]");

let stdout = "";
let stderr = "";

try {
  const result = await execFileAsync(
    "curl",
    [
      "--silent",
      "--show-error",
      "--fail",
      "https://api.openai.com/v1/audio/transcriptions",
      "-H",
      `Authorization: Bearer ${process.env.OPENAI_API_KEY}`,
      "-H",
      "Content-Type: multipart/form-data",
      "-F",
      `file=@${audioPath}`,
      "-F",
      "model=whisper-1",
      "-F",
      "response_format=verbose_json",
      "-F",
      "timestamp_granularities[]=word",
      "-F",
      "timestamp_granularities[]=segment",
      "-F",
      `language=${language}`,
      "-F",
      `prompt=${prompt}`,
    ],
    {maxBuffer: 1024 * 1024 * 20},
  );

  stdout = result.stdout;
  stderr = result.stderr;
} catch (error) {
  const output = [
    error.stderr ? redactSecret(error.stderr) : "",
    error.stdout ? redactSecret(error.stdout) : "",
  ]
    .filter(Boolean)
    .join("\n")
    .trim();

  console.error("Transcription request failed.");

  if (error.code === 56 || output.includes("401")) {
    console.error(
      "OpenAI returned 401 Unauthorized. Check that OPENAI_API_KEY is copied fully, active, and has access to the OpenAI Platform API.",
    );
  }

  if (output) {
    console.error(output);
  }

  process.exit(1);
}

if (stderr.trim()) {
  console.error(stderr);
}

const transcript = JSON.parse(stdout);
const rawPath = path.join(outDir, `${slug}.transcript.json`);
const cuePath = path.join(outDir, `${slug}.cue.md`);
const wordsPath = path.join(outDir, `${slug}.words.csv`);

await writeFile(rawPath, `${JSON.stringify(transcript, null, 2)}\n`);

const formatTime = (seconds) => {
  const totalTenths = Math.round(seconds * 10);
  const minutes = Math.floor(totalTenths / 600);
  const remainingTenths = totalTenths % 600;
  const secs = Math.floor(remainingTenths / 10);
  const tenths = remainingTenths % 10;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${tenths}`;
};

const csvEscape = (value) => `"${String(value).replaceAll('"', '""')}"`;

const words = transcript.words ?? [];
const segments = transcript.segments ?? [];

const cueLines = [
  `# ${sourceName} Cue Sheet`,
  "",
  `Source: \`${audioPath}\``,
  "",
  "## Segment Cues",
  "",
  "| Time | Dialogue |",
  "|---|---|",
  ...segments.map((segment) => {
    const start = formatTime(segment.start);
    const end = formatTime(segment.end);
    const text = String(segment.text ?? "").trim().replaceAll("|", "\\|");
    return `| ${start}-${end} | ${text} |`;
  }),
  "",
  "## Word Cues",
  "",
  "| Time | Word |",
  "|---|---|",
  ...words.map((word) => {
    const start = formatTime(word.start);
    const end = formatTime(word.end);
    const text = String(word.word ?? "").trim().replaceAll("|", "\\|");
    return `| ${start}-${end} | ${text} |`;
  }),
  "",
];

await writeFile(cuePath, cueLines.join("\n"));

const csvLines = [
  "start,end,word",
  ...words.map((word) =>
    [word.start, word.end, csvEscape(String(word.word ?? "").trim())].join(","),
  ),
];

await writeFile(wordsPath, `${csvLines.join("\n")}\n`);

const summary = [
  `Wrote ${rawPath}`,
  `Wrote ${cuePath}`,
  `Wrote ${wordsPath}`,
  `Segments: ${segments.length}`,
  `Words: ${words.length}`,
];

console.log(summary.join("\n"));

try {
  await readFile(cuePath, "utf8");
} catch {
  console.warn("Cue sheet was not readable after writing.");
}
