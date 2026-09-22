import fs from 'node:fs';
import path from 'node:path';

const files = {
  'vo-hook.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/ab33cec8-e7bf-40cb-aed5-cf2291550a20.mp3',
  'vo-quiz.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/f6c0bdae-3dde-4679-b486-202d7d812424.mp3',
  'vo-answer.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/57f87a87-bae0-4bca-a42b-bfea0c046959.mp3',
  'vo-interest.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/4d6721a1-5a87-4507-8954-7c1647ac24f4.mp3',
  'vo-topic.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/0c52214b-0754-4d9f-991d-3e6d0f8de272.mp3',
  'vo-read.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/34b3b5bb-c254-4c84-877e-7bf1ad445457.mp3',
  'vo-translate.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/fe2977d5-5599-4fce-b069-38c6abf50fac.mp3',
  'vo-explain.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/c67ef271-b1cf-4c93-b551-1f222a1c0686.mp3',
  'vo-close.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/5e05f21d-54b0-4d1f-b9c5-54b343555ee0.mp3'
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
