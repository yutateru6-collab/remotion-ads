import fs from 'node:fs';
import path from 'node:path';

const files = {
  'vo-hook.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/ac1697b9-29dc-428a-a0ce-9ebae8026d3f.mp3',
  'vo-custom.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/ed8d7fa8-5e63-482a-95ba-17bc396afebd.mp3',
  'vo-reader.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/55994d2b-b488-46f4-a03f-44a2d8ac15bd.mp3',
  'vo-close.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/00033d1b-f256-42ae-998b-ef368dc28ec1.mp3',
};

const out = path.resolve('public/audio');
fs.mkdirSync(out, {recursive: true});

for (const [name, url] of Object.entries(files)) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch ' + name + ': ' + response.status);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1000) throw new Error('Voice file too small: ' + name);
  fs.writeFileSync(path.join(out, name), bytes);
  console.log(name + ': ' + bytes.length + ' bytes');
}
