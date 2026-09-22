import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {C, FONT} from './style';

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.72}) => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 34%, rgba(0,0,0,' +
        strength +
        ') 100%)',
      pointerEvents: 'none',
    }}
  />
);

export const FilmGrain: React.FC<{opacity?: number}> = ({opacity = 0.045}) => {
  const frame = useCurrentFrame();
  const dots = Array.from({length: 80}, (_, i) => {
    const x = (i * 137 + frame * 17) % 1080;
    const y = (i * 263 + frame * 29) % 1920;
    const s = 1 + ((i * 11 + frame) % 3);
    return (
      <span
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: s,
          height: s,
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: 0.55,
        }}
      />
    );
  });
  return <AbsoluteFill style={{opacity, mixBlendMode: 'screen'}}>{dots}</AbsoluteFill>;
};

export const LightSweep: React.FC<{from?: number; duration?: number}> = ({
  from = 0,
  duration = 28,
}) => {
  const frame = useCurrentFrame();
  const p = Math.max(0, Math.min(1, (frame - from) / duration));
  const x = interpolate(p, [0, 1], [-480, 1280]);
  return (
    <div
      style={{
        position: 'absolute',
        top: -200,
        left: x,
        width: 250,
        height: 2300,
        rotate: '14deg',
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)',
        filter: 'blur(18px)',
        opacity: p > 0 && p < 1 ? 1 : 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export const Kicker: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      fontFamily: FONT,
      color: C.cyan,
      fontSize: 25,
      fontWeight: 900,
      letterSpacing: '0.16em',
    }}
  >
    {children}
  </div>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  align?: 'left' | 'center';
  color?: string;
}> = ({children, size = 78, align = 'left', color = C.ink}) => (
  <div
    style={{
      fontFamily: FONT,
      color,
      fontSize: size,
      fontWeight: 900,
      letterSpacing: '-0.035em',
      lineHeight: 1.14,
      textAlign: align,
      whiteSpace: 'pre-line',
      textWrap: 'balance',
    }}
  >
    {children}
  </div>
);

const ScreenGlow: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: -60,
      borderRadius: 90,
      background:
        'radial-gradient(circle, rgba(98,229,245,0.24) 0%, rgba(98,229,245,0.04) 45%, transparent 72%)',
      filter: 'blur(22px)',
      pointerEvents: 'none',
    }}
  />
);

export const Device: React.FC<{
  src: string;
  width?: number;
  top?: number;
  tilt?: number;
  rotateZ?: number;
  zoom?: number;
  yOffset?: number;
  opacity?: number;
}> = ({
  src,
  width = 600,
  top = 420,
  tilt = 0,
  rotateZ = 0,
  zoom = 1,
  yOffset = 0,
  opacity = 1,
}) => {
  const height = width * (852 / 393);
  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        left: (1080 - width) / 2,
        top,
        opacity,
        perspective: 1400,
        filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.45))',
        translate: '0 ' + yOffset + 'px',
        rotate: rotateZ + 'deg',
        scale: zoom,
      }}
    >
      <ScreenGlow />
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 58,
          border: '1px solid rgba(255,255,255,0.22)',
          backgroundColor: C.bg2,
          transform: 'rotateX(2deg) rotateY(' + tilt + 'deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <Img
          src={staticFile(src)}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>
    </div>
  );
};

export const Tap: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => {
  const frame = useCurrentFrame();
  const p = Math.max(0, Math.min(1, (frame - at) / 24));
  if (frame < at || frame > at + 24) return null;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 72,
          height: 72,
          borderRadius: '50%',
          border: '4px solid ' + C.cyan,
          opacity: interpolate(p, [0, 0.72, 1], [0.9, 0.28, 0]),
          scale: interpolate(p, [0, 1], [0.25, 1.55]),
          translate: '-50% -50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: C.cyan,
          opacity: interpolate(p, [0, 0.35, 1], [1, 1, 0]),
          translate: '-50% -50%',
        }}
      />
    </>
  );
};
