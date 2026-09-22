import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const fps = 30;
const toleranceFrames = 3;

const slots = [
  ['vo-hook.mp3', 0, 48],
  ['vo-quiz.mp3', 48, 84],
  ['vo-answer.mp3', 84, 132],
  ['vo-interest.mp3', 132, 192],
  ['vo-topic.mp3', 192, 252],
  ['vo-read.mp3', 252, 282],
  ['vo-translate.mp3', 282, 330],
  ['vo-explain.mp3', 330, 384],
  ['vo-close.mp3', 384, 468],
];

const results = [];
let failed = false;

for (const [file, start, end] of slots) {
  const filePath = path.resolve('public/audio', file);
  const raw = execFileSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', filePath],
    {encoding: 'utf8'},
  ).trim();
  const durationSeconds = Number(raw);
  const durationFrames = Math.ceil(durationSeconds * fps);
  const slotFrames = end - start;
  const overflowFrames = durationFrames - slotFrames;
  const ok = overflowFrames <= toleranceFrames;
  if (!ok) failed = true;

  results.push({
    file,
    startFrame: start,
    endFrame: end,
    slotFrames,
    durationSeconds,
    durationFrames,
    overflowFrames,
    toleranceFrames,
    ok,
  });
}

fs.mkdirSync(path.resolve('out'), {recursive: true});
fs.writeFileSync(
  path.resolve('out/audio-sync-report.json'),
  JSON.stringify({fps, toleranceFrames, results}, null, 2),
);

console.table(results.map((r) => ({
  file: r.file,
  slotFrames: r.slotFrames,
  durationFrames: r.durationFrames,
  overflowFrames: r.overflowFrames,
  ok: r.ok,
})));

if (failed) {
  throw new Error('Voiceover exceeds its assigned shot by more than ' + toleranceFrames + ' frames.');
}
