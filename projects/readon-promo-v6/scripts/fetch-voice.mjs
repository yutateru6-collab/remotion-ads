import fs from 'node:fs';
import path from 'node:path';

const files = {
  'vo-hook.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/12b4c12b-bcdb-4afe-b0eb-9ff086d66654.mp3',
  'vo-quiz.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/29945c72-a185-4d6b-852a-007b5ae15699.mp3',
  'vo-answer.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/aecabc99-8ef7-473d-addc-c2b5f49a853c.mp3',
  'vo-bridge.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/8bae224d-bbf6-4cea-976e-84391bd39c64.mp3',
  'vo-app.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/7801cf9e-dee6-4e58-a658-49fbcd8da120.mp3',
  'vo-read.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/5af00ece-b82c-4336-bd47-757bef17a2e1.mp3',
  'vo-translate.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/18f0414b-9b91-4463-af31-5521fab7e479.mp3',
  'vo-explain.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/f48d6359-a2ce-4da9-98bf-6ef58c70677a.mp3',
  'vo-payoff.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/e5fd3f19-7523-40ff-b569-b8858c751c5a.mp3',
  'vo-close.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/68a0edec-03a0-494d-9950-3ba5772aa558.mp3'
};

const out=path.resolve('public/audio');
fs.mkdirSync(out,{recursive:true});

for(const [name,url] of Object.entries(files)){
  const response=await fetch(url);
  if(!response.ok) throw new Error('Failed to fetch '+name+': '+response.status);
  const bytes=Buffer.from(await response.arrayBuffer());
  if(bytes.length<1000) throw new Error('Voice file too small: '+name);
  fs.writeFileSync(path.join(out,name),bytes);
  console.log(name+': '+bytes.length+' bytes');
}
