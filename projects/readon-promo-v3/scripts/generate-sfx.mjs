import fs from 'node:fs';
import path from 'node:path';

const SR = 44100;
const out = path.resolve('public/audio');
fs.mkdirSync(out, {recursive: true});

const clamp = (v) => Math.max(-1, Math.min(1, v));

const writeWav = (name, channels, sampleRate = SR) => {
  const frames = channels[0].length;
  const channelCount = channels.length;
  const dataBytes = frames * channelCount * 2;
  const buf = Buffer.alloc(44 + dataBytes);

  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataBytes, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(channelCount, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * channelCount * 2, 28);
  buf.writeUInt16LE(channelCount * 2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataBytes, 40);

  let offset = 44;
  for (let i = 0; i < frames; i++) {
    for (let c = 0; c < channelCount; c++) {
      buf.writeInt16LE(Math.round(clamp(channels[c][i]) * 32767), offset);
      offset += 2;
    }
  }

  fs.writeFileSync(path.join(out, name), buf);
};

const noise = (i) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

const mono = (seconds, fn) => {
  const n = Math.floor(seconds * SR);
  const data = new Float32Array(n);
  for (let i = 0; i < n; i++) data[i] = fn(i / SR, i);
  return data;
};

const stereoFromMono = (m, spread = 0.015) => {
  const left = new Float32Array(m.length);
  const right = new Float32Array(m.length);
  const delay = Math.floor(spread * SR);

  for (let i = 0; i < m.length; i++) {
    left[i] = m[i];
    right[i] = m[Math.max(0, i - delay)] * 0.96;
  }

  return [left, right];
};

const click = mono(0.18, (t) => {
  const env = Math.exp(-t * 28);
  return (
    (Math.sin(2 * Math.PI * 1450 * t) * 0.55 +
      noise(Math.floor(t * SR)) * 0.18) *
    env
  );
});
writeWav('click.wav', stereoFromMono(click, 0.002));

const whoosh = mono(0.72, (t, i) => {
  const p = t / 0.72;
  const env = Math.sin(Math.PI * p) ** 1.8;
  const tone =
    Math.sin(2 * Math.PI * (160 + 600 * p * p) * t) * 0.16;
  return (noise(i) * 0.26 + tone) * env;
});
writeWav('whoosh.wav', stereoFromMono(whoosh, 0.008));

const impact = mono(0.95, (t, i) => {
  const env = Math.exp(-t * 5.2);
  const sub =
    Math.sin(2 * Math.PI * (58 - 14 * Math.min(1, t)) * t) * 0.6;
  const crack = noise(i) * Math.exp(-t * 18) * 0.34;
  return (sub + crack) * env;
});
writeWav('impact.wav', stereoFromMono(impact, 0.01));

const riser = mono(1.35, (t, i) => {
  const p = t / 1.35;
  const env = p ** 1.6;
  const tone =
    Math.sin(2 * Math.PI * (180 + 1300 * p * p) * t) * 0.12;
  return (noise(i) * 0.18 + tone) * env;
});
writeWav('riser.wav', stereoFromMono(riser, 0.012));

const DURATION = 30;
const n = Math.floor(DURATION * SR);
const left = new Float32Array(n);
const right = new Float32Array(n);
const roots = [55, 65.406, 73.416, 82.407];
const chord = [1, 1.5, 2];

for (let i = 0; i < n; i++) {
  const t = i / SR;
  const section = Math.floor(t / 7.5) % roots.length;
  const root = roots[section];

  let pad = 0;
  for (const mul of chord) {
    pad +=
      Math.sin(2 * Math.PI * root * mul * t + mul * 0.2) * 0.045;
    pad +=
      Math.sin(2 * Math.PI * root * mul * 2 * t + mul * 0.7) *
      0.012;
  }

  const beat = t % 0.5;
  const kick =
    Math.sin(
      2 *
        Math.PI *
        (52 - 24 * Math.min(1, beat * 6)) *
        t,
    ) *
    Math.exp(-beat * 20) *
    0.09;

  const pulse =
    Math.sin(2 * Math.PI * root * 2 * t) *
    (0.018 + 0.012 * Math.sin(2 * Math.PI * 0.5 * t));

  const fadeIn = Math.min(1, t / 1.5);
  const fadeOut = Math.min(1, (DURATION - t) / 2);
  const env = Math.max(0, Math.min(fadeIn, fadeOut));

  left[i] = (pad + kick + pulse + noise(i) * 0.006) * env;
  right[i] =
    (pad * 0.98 +
      kick +
      pulse * 0.85 +
      noise(i + 101) * 0.006) *
    env;
}

writeWav('bgm.wav', [left, right]);
console.log('Generated synthetic BGM and SFX in public/audio');
