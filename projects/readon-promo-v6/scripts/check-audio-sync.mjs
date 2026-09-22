import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const fps=30;
const toleranceFrames=3;
const slots=[
  ['vo-hook.mp3',0,54],
  ['vo-quiz.mp3',54,90],
  ['vo-answer.mp3',90,132],
  ['vo-bridge.mp3',132,198],
  ['vo-app.mp3',198,252],
  ['vo-read.mp3',252,279],
  ['vo-translate.mp3',279,327],
  ['vo-explain.mp3',327,381],
  ['vo-payoff.mp3',381,438],
  ['vo-close.mp3',438,501],
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
