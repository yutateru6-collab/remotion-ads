import {Easing} from 'remotion';

export const C = {
  ink: '#F8FAFC',
  soft: '#D9E7EE',
  muted: '#98AAB7',
  bg: '#061018',
  bg2: '#0B1B26',
  cyan: '#62E5F5',
  cyan2: '#20B9D5',
  gold: '#FFD98A',
  red: '#FF6B6B',
  line: 'rgba(255,255,255,0.16)',
};

export const FONT = '"Noto Sans JP", "Hiragino Sans", system-ui, sans-serif';

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
export const ease = (v: number) => Easing.bezier(0.16, 1, 0.3, 1)(clamp(v));
