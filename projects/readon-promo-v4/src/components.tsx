import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {C, DISPLAY_FONT, SAFE, UI_FONT} from './style';

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.72}) => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(circle at 47% 42%, rgba(0,0,0,0) 36%, rgba(0,0,0,' +
        strength +
        ') 100%)',
      pointerEvents: 'none',
    }}
  />
);

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.022}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'screen', pointerEvents: 'none'}}>
      {Array.from({length: 42}, (_, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: (i * 167 + frame * 23) % 1080,
            top: (i * 281 + frame * 37) % 1920,
            width: 1 + ((i + frame) % 2),
            height: 1 + ((i + frame) % 2),
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: 0.42,
          }}
        />
      ))}
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
      gap: 13,
      color: muted ? C.soft : C.ink,
      fontFamily: DISPLAY_FONT,
    }}
  >
    <span style={{fontSize: 25, fontWeight: 700, letterSpacing: '0.10em'}}>リードン</span>
    <span style={{fontSize: 40, fontWeight: 900, letterSpacing: '-0.045em'}}>READON</span>
  </div>
);

export const HeadlineLines: React.FC<{
  lines: string[];
  size?: number;
  align?: 'left' | 'center';
  color?: string;
}> = ({lines, size = 84, align = 'left', color = C.ink}) => (
  <div
    style={{
      fontFamily: DISPLAY_FONT,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.16,
      letterSpacing: '-0.035em',
      color,
      textAlign: align,
      fontFeatureSettings: '"palt" 1',
      wordBreak: 'keep-all',
      overflowWrap: 'normal',
      lineBreak: 'strict',
    }}
  >
    {lines.map((line) => (
      <div key={line} style={{whiteSpace: 'nowrap'}}>
        {line}
      </div>
    ))}
  </div>
);

export const Supporting: React.FC<{
  children: React.ReactNode;
  size?: number;
  align?: 'left' | 'center';
  color?: string;
}> = ({children, size = 48, align = 'left', color = C.soft}) => (
  <div
    style={{
      fontFamily: UI_FONT,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.38,
      letterSpacing: '0.005em',
      color,
      textAlign: align,
      wordBreak: 'keep-all',
      overflowWrap: 'normal',
    }}
  >
    {children}
  </div>
);

export const ScreenCrop: React.FC<{
  src: string;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  imageTop?: number;
  imageLeft?: number;
  imageWidth?: number;
  zoom?: number;
  radius?: number;
}> = ({
  src,
  top = 470,
  left = SAFE.left,
  width = 820,
  height = 920,
  imageTop = -30,
  imageLeft = 0,
  imageWidth = 820,
  zoom = 1,
  radius = 42,
}) => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, 70], [1, 1.025], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        overflow: 'hidden',
        borderRadius: radius,
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 34px 90px rgba(0,0,0,0.42)',
        backgroundColor: C.bg2,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute',
          width: imageWidth,
          height: 'auto',
          left: imageLeft,
          top: imageTop,
          scale: zoom * push,
          transformOrigin: '50% 30%',
        }}
      />
    </div>
  );
};

export const TapPulse: React.FC<{x: number; y: number; at: number; accent?: string}> = ({
  x,
  y,
  at,
  accent = C.cyan,
}) => {
  const frame = useCurrentFrame();
  if (frame < at || frame > at + 18) return null;
  const p = (frame - at) / 18;
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
          border: '5px solid ' + accent,
          translate: '-50% -50%',
          scale: interpolate(p, [0, 1], [0.30, 1.55]),
          opacity: interpolate(p, [0, 0.72, 1], [0.96, 0.28, 0]),
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: accent,
          translate: '-50% -50%',
          opacity: interpolate(p, [0, 0.45, 1], [1, 1, 0]),
        }}
      />
    </>
  );
};
