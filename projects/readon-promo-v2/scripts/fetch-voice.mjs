import fs from 'node:fs';
import path from 'node:path';

const files = {
  'vo-hook.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/44fef79c-5393-4f45-bdba-0e9b2be3b4cd.mp3',
  'vo-custom.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/839b1d23-bfc3-4328-bc0a-ddc6f9ad82d2.mp3',
  'vo-reader.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/66eeef88-67b8-47e5-8b1b-09c158b99f06.mp3',
  'vo-close.mp3': 'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/e166e041-d6bb-46ac-8132-1bdcb46ee274.mp3',
};

const out = path.resolve('public/audio');
fs.mkdirSync(out, {recursive: true});

for (const [name, url] of Object.entries(files)) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch ' + name + ': HTTP ' + response.status);
  }
  const type = response.headers.get('content-type') || '';
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1000) {
    throw new Error('Voice file too small: ' + name + ' (' + bytes.length + ' bytes)');
  }
  fs.writeFileSync(path.join(out, name), bytes);
  console.log(name + ': ' + bytes.length + ' bytes, ' + type);
}
