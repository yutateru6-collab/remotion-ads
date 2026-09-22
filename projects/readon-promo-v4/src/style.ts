import {Easing} from 'remotion';

export const C = {
  ink: '#F8FBFC',
  soft: '#DDE8EC',
  muted: '#9FB2BC',
  bg: '#061018',
  bg2: '#0A1822',
  cyan: '#66E3F1',
  gold: '#F6D76F',
  coral: '#FF857A',
  line: 'rgba(255,255,255,0.16)',
};

export const DISPLAY_FONT = '"Zen Kaku Gothic New", sans-serif';
export const UI_FONT = '"BIZ UDPGothic", sans-serif';

export const SAFE = {
  left: 82,
  right: 178,
  top: 88,
  bottom: 270,
};

export const SHOTS = {
  home: 'screens/01-home.png',
  topic: 'screens/02-topic.png',
  controls: 'screens/03-controls.png',
  persona: 'screens/04-persona.png',
  english: 'screens/05-reader-english.png',
  translation: 'screens/06-reader-translation.png',
  explanation: 'screens/07-reader-explanation.png',
};

export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const ease = (v: number) =>
  Easing.bezier(0.16, 1, 0.3, 1)(clamp(v));
