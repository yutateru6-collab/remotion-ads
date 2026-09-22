import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {C, DISPLAY_FONT, SAFE, UI_FONT} from './style';

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.74}) => (
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

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.018}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'screen', pointerEvents: 'none'}}>
      {Array.from({length: 36}, (_, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: (i * 173 + frame * 29) % 1080,
            top: (i * 283 + frame * 31) % 1920,
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

export const HeadlineLines: React.FC<{
  lines: string[];
  size?: number;
  align?: 'left' | 'center';
  color?: string;
}> = ({lines, size = 88, align = 'left', color = C.ink}) => (
  <div
    style={{
      fontFamily: DISPLAY_FONT,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.15,
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
      lineHeight: 1.35,
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

export const BrandBug: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: SAFE.left,
      top: SAFE.top,
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      color: C.ink,
      fontFamily: DISPLAY_FONT,
    }}
  >
    <span style={{fontSize: 24, fontWeight: 700, letterSpacing: '0.10em'}}>リードン</span>
    <span style={{fontSize: 39, fontWeight: 900, letterSpacing: '-0.045em'}}>READON</span>
  </div>
);

export const RetentionBar: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.10)',
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: interpolate(frame, [0, 467], [0, 1080], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          height: '100%',
          background:
            'linear-gradient(90deg, ' + C.cyan + ', ' + C.gold + ')',
        }}
      />
    </div>
  );
};

export const ScreenCrop: React.FC<{
  src: string;
  top: number;
  width?: number;
  height: number;
  imageTop?: number;
  imageLeft?: number;
  imageWidth?: number;
  zoom?: number;
  radius?: number;
}> = ({
  src,
  top,
  width = 820,
  height,
  imageTop = 0,
  imageLeft = 0,
  imageWidth = 820,
  zoom = 1,
  radius = 40,
}) => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, 55], [1, 1.022], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: SAFE.left,
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

export const Pop: React.FC<{children: React.ReactNode; delay?: number}> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: {damping: 17, stiffness: 180, mass: 0.62},
  });
  return (
    <div
      style={{
        opacity: p,
        translate: '0 ' + interpolate(p, [0, 1], [32, 0]) + 'px',
        scale: interpolate(p, [0, 1], [0.90, 1]),
      }}
    >
      {children}
    </div>
  );
};
