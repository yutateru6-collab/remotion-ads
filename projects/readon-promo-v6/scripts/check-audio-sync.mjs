import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const fps=30;
const toleranceFrames=3;
const slots=[
  ['vo-hook.mp3',0,48],
  ['vo-quiz.mp3',48,84],
  ['vo-answer.mp3',84,132],
  ['vo-bridge.mp3',132,192],
  ['vo-app.mp3',192,246],
  ['vo-read.mp3',246,273],
  ['vo-translate.mp3',273,321],
  ['vo-explain.mp3',321,387],
  ['vo-payoff.mp3',387,432],
  ['vo-close.mp3',432,516],
];

const results=[];
let failed=false;

for(const [file,start,end] of slots){
  const raw=execFileSync('ffprobe',[
    '-v','error','-show_entries','format=duration',
    '-of','default=noprint_wrappers=1:nokey=1',
    path.resolve('public/audio',file)
  ],{encoding:'utf8'}).trim();

  const durationSeconds=Number(raw);
  const durationFrames=Math.ceil(durationSeconds*fps);
  const slotFrames=end-start;
  const overflowFrames=durationFrames-slotFrames;
  const ok=overflowFrames<=toleranceFrames;
  if(!ok) failed=true;

  results.push({
    file,startFrame:start,endFrame:end,slotFrames,durationSeconds,
    durationFrames,overflowFrames,toleranceFrames,ok
  });
}

fs.mkdirSync(path.resolve('out'),{recursive:true});
fs.writeFileSync(
  path.resolve('out/audio-sync-report.json'),
  JSON.stringify({fps,toleranceFrames,results},null,2)
);
console.table(results.map((r)=>({
  file:r.file,slotFrames:r.slotFrames,durationFrames:r.durationFrames,
  overflowFrames:r.overflowFrames,ok:r.ok
})));

if(failed){
  throw new Error('Voiceover exceeds assigned shot by more than '+toleranceFrames+' frames.');
}
