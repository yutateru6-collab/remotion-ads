import fs from 'node:fs';
import path from 'node:path';

const files = {
  'vo-hook.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/9e7ec2f5-2c81-4314-92c1-5372f9cf078a.mp3',
  'vo-custom.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/b0b202f4-a801-47cb-a056-c9f39d57d57f.mp3',
  'vo-reader.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/db5c6151-58b0-4fa4-8d17-89901170b78a.mp3',
  'vo-close.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/8f5b2eac-490f-4f51-8b49-61c957c5b488.mp3',
};

const out = path.resolve('public/audio');
fs.mkdirSync(out, {recursive: true});

for (const [name, url] of Object.entries(files)) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch ' + name + ': HTTP ' + response.status);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1000) {
    throw new Error('Voice file too small: ' + name + ' (' + bytes.length + ' bytes)');
  }
  fs.writeFileSync(path.join(out, name), bytes);
  console.log(name + ': ' + bytes.length + ' bytes');
}
