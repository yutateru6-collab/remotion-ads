import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {C, DISPLAY_FONT, SAFE, UI_FONT} from './style';

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.74}) => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(circle at 48% 42%, rgba(0,0,0,0) 35%, rgba(0,0,0,' +
        strength +
        ') 100%)',
      pointerEvents: 'none',
    }}
  />
);

export const FilmGrain: React.FC<{opacity?: number}> = ({opacity = 0.028}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'screen', pointerEvents: 'none'}}>
      {Array.from({length: 58}, (_, i) => {
        const x = (i * 151 + frame * 19) % 1080;
        const y = (i * 277 + frame * 31) % 1920;
        const s = 1 + ((i * 7 + frame) % 2);
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
              opacity: 0.48,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const BrandBug: React.FC<{muted?: boolean}> = ({muted = false}) => (
  <div
    style={{
      position: 'absolute',
      left: SAFE.left,
      top: SAFE.top,
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      fontFamily: DISPLAY_FONT,
      color: muted ? C.soft : C.ink,
    }}
  >
    <span style={{fontSize: 24, fontWeight: 700, letterSpacing: '0.12em'}}>リードン</span>
    <span style={{fontSize: 38, fontWeight: 900, letterSpacing: '-0.04em'}}>READON</span>
  </div>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  align?: 'left' | 'center';
  color?: string;
  maxWidth?: number;
}> = ({
  children,
  size = 88,
  align = 'left',
  color = C.ink,
  maxWidth = 790,
}) => (
  <div
    style={{
      fontFamily: DISPLAY_FONT,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.17,
      letterSpacing: '-0.035em',
      color,
      textAlign: align,
      whiteSpace: 'pre-line',
      maxWidth,
      textWrap: 'balance',
      fontFeatureSettings: '"palt" 1',
    }}
  >
    {children}
  </div>
);

export const Supporting: React.FC<{
  children: React.ReactNode;
  size?: number;
  align?: 'left' | 'center';
  color?: string;
}> = ({children, size = 50, align = 'left', color = C.soft}) => (
  <div
    style={{
      fontFamily: UI_FONT,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.45,
      letterSpacing: '0.01em',
      color,
      textAlign: align,
    }}
  >
    {children}
  </div>
);

export const Device: React.FC<{
  src: string;
  width?: number;
  top?: number;
  x?: number;
  rotateZ?: number;
  zoom?: number;
  yOffset?: number;
  opacity?: number;
}> = ({
  src,
  width = 620,
  top = 430,
  x = 0,
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
        left: (1080 - width) / 2 + x,
        top,
        opacity,
        translate: '0 ' + yOffset + 'px',
        rotate: rotateZ + 'deg',
        scale: zoom,
        filter: 'drop-shadow(0 40px 70px rgba(0,0,0,0.45))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -70,
          borderRadius: 90,
          background:
            'radial-gradient(circle, rgba(102,227,241,0.20), rgba(102,227,241,0.03) 46%, transparent 72%)',
          filter: 'blur(24px)',
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 58,
          border: '1px solid rgba(255,255,255,0.20)',
          backgroundColor: C.bg2,
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

export const FocusPanel: React.FC<{
  src: string;
  top: number;
  height: number;
  objectPosition?: string;
  scale?: number;
}> = ({src, top, height, objectPosition = '50% 48%', scale = 1}) => (
  <div
    style={{
      position: 'absolute',
      left: SAFE.left,
      right: SAFE.right,
      top,
      height,
      overflow: 'hidden',
      borderRadius: 38,
      border: '1px solid rgba(255,255,255,0.18)',
      boxShadow: '0 34px 90px rgba(0,0,0,0.40)',
      backgroundColor: C.bg2,
    }}
  >
    <Img
      src={staticFile(src)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition,
        scale,
      }}
    />
  </div>
);

export const TapPulse: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => {
  const frame = useCurrentFrame();
  if (frame < at || frame > at + 22) return null;
  const p = (frame - at) / 22;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 78,
          height: 78,
          borderRadius: '50%',
          border: '5px solid ' + C.cyan,
          translate: '-50% -50%',
          scale: interpolate(p, [0, 1], [0.3, 1.55]),
          opacity: interpolate(p, [0, 0.72, 1], [0.95, 0.3, 0]),
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
          translate: '-50% -50%',
          opacity: interpolate(p, [0, 0.4, 1], [1, 1, 0]),
        }}
      />
    </>
  );
};
