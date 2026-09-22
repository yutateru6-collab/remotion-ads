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
import {
  BrandBug,
  Grain,
  HeadlineLines,
  ScreenCrop,
  Supporting,
  Vignette,
} from './components';
import {C, DISPLAY_FONT, SAFE, SHOTS, UI_FONT} from './style';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const copy = spring({
    frame: frame - 5,
    fps,
    config: {damping: 18, stiffness: 150, mass: 0.65},
  });
  const product = spring({
    frame: frame - 20,
    fps,
    config: {damping: 18, stiffness: 120, mass: 0.72},
  });
  const rows = [
    'The relationship between technological change and human attention...',
    'While contemporary educational systems increasingly emphasize...',
    'Historical evidence suggests that individual motivation...',
    'An examination of the economic structures surrounding media...',
  ];

  return (
    <AbsoluteFill style={{backgroundColor: '#02070B', overflow: 'hidden'}}>
      {rows.map((text, i) => (
        <div
          key={text}
          style={{
            position: 'absolute',
            left: -130 + (i % 2) * 80,
            top: 320 + i * 300 - frame * (3.1 + i * 0.18),
            width: 1500,
            whiteSpace: 'nowrap',
            fontFamily: 'Georgia, serif',
            fontSize: 70 + (i % 2) * 8,
            fontWeight: 700,
            color: 'rgba(255,255,255,' + (0.065 + i * 0.015) + ')',
            rotate: (i % 2 === 0 ? -2 : 2) + 'deg',
          }}
        >
          {text}
        </div>
      ))}

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(2,7,11,0.18), rgba(2,7,11,0.82))',
        }}
      />

      <BrandBug />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 315,
          opacity: copy,
          translate: '0 ' + interpolate(copy, [0, 1], [48, 0]) + 'px',
        }}
      >
        <HeadlineLines
          lines={['興味のない', '英語長文。', '読むの、しんどくない？']}
          size={80}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 448,
          top: 940,
          width: 500,
          height: 760,
          overflow: 'hidden',
          borderRadius: 48,
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 36px 100px rgba(0,0,0,0.48)',
          opacity: product,
          translate: interpolate(product, [0, 1], [90, 0]) + 'px ' + interpolate(product, [0, 1], [120, 0]) + 'px',
          rotate: interpolate(product, [0, 1], [6, 1]) + 'deg',
          scale: interpolate(product, [0, 1], [0.88, 1]),
        }}
      >
        <Img
          src={staticFile(SHOTS.home)}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      <Grain />
      <Vignette strength={0.86} />
    </AbsoluteFill>
  );
};

export const TopicScene: React.FC<{topic: string}> = ({topic}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 135, mass: 0.66},
  });
  const chars = Math.floor(
    interpolate(frame, [6, 48], [0, topic.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <BrandBug muted />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 210,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [38, 0]) + 'px',
        }}
      >
        <HeadlineLines lines={['好きなテーマを', '読む理由に。']} size={88} />
      </div>

      <ScreenCrop
        src={SHOTS.topic}
        top={540}
        width={820}
        height={730}
        imageWidth={820}
        imageTop={-285}
        zoom={1.03}
      />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 1350,
          padding: '22px 26px',
          borderRadius: 28,
          border: '1px solid ' + C.line,
          backgroundColor: 'rgba(6,16,24,0.91)',
          boxShadow: '0 22px 70px rgba(0,0,0,0.34)',
          fontFamily: UI_FONT,
          fontSize: 48,
          fontWeight: 700,
          color: C.ink,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{color: C.cyan, marginRight: 16}}>テーマ</span>
        {topic.slice(0, chars)}
        <span style={{color: C.cyan, opacity: frame % 18 < 9 ? 1 : 0}}>｜</span>
      </div>

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

const settings = [
  {
    src: SHOTS.controls,
    imageTop: -415,
    label: '英語レベル',
    value: '英検2級',
    accent: C.cyan,
  },
  {
    src: SHOTS.controls,
    imageTop: -415,
    label: '長文の長さ',
    value: '400語',
    accent: C.gold,
  },
  {
    src: SHOTS.persona,
    imageTop: -615,
    label: '解説キャラ',
    value: 'ギャル × 世話好き',
    accent: C.coral,
  },
] as const;

export const SettingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const index = Math.min(2, Math.floor(frame / 20));
  const item = settings[index];
  const local = frame - index * 20;
  const p = spring({
    frame: local,
    fps,
    config: {damping: 18, stiffness: 170, mass: 0.62},
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 45% 47%, rgba(102,227,241,0.11), transparent 40%), ' +
          C.bg,
        overflow: 'hidden',
      }}
    >
      <BrandBug muted />

      <div style={{position: 'absolute', left: SAFE.left, top: 205}}>
        <HeadlineLines lines={['自分に合う条件を', '1つずつ決める。']} size={80} />
      </div>

      <ScreenCrop
        src={item.src}
        top={570}
        width={820}
        height={700}
        imageWidth={820}
        imageTop={item.imageTop}
        zoom={1.03}
      />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 1355,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [36, 0]) + 'px',
        }}
      >
        <div
          style={{
            fontFamily: UI_FONT,
            fontWeight: 700,
            fontSize: 38,
            color: item.accent,
            marginBottom: 8,
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontFamily: DISPLAY_FONT,
            fontWeight: 900,
            fontSize: index === 2 ? 60 : 74,
            color: C.ink,
            whiteSpace: 'nowrap',
          }}
        >
          {item.value}
        </div>
      </div>

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const ReaderScene: React.FC<{
  src: string;
  lines: string[];
  mode: 'read' | 'translate' | 'explain';
}> = ({src, lines, mode}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 140, mass: 0.66},
  });
  const accent =
    mode === 'translate' ? C.cyan : mode === 'explain' ? C.gold : C.coral;

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <BrandBug muted />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 190,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [34, 0]) + 'px',
        }}
      >
        <HeadlineLines lines={lines} size={76} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 495,
          padding: '10px 17px',
          borderRadius: 999,
          backgroundColor: accent,
          color: C.bg,
          fontFamily: UI_FONT,
          fontSize: 32,
          fontWeight: 700,
          zIndex: 4,
        }}
      >
        {mode === 'translate' ? '訳 ON' : mode === 'explain' ? '解説 ON' : 'READ'}
      </div>

      <ScreenCrop
        src={src}
        top={555}
        width={830}
        height={1010}
        imageWidth={830}
        imageTop={-10}
        zoom={1.015}
      />

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const PayoffScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 19, stiffness: 130, mass: 0.7},
  });

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <Img
        src={staticFile(SHOTS.explanation)}
        style={{
          position: 'absolute',
          width: 1080,
          height: 'auto',
          left: 0,
          top: -60,
          opacity: 0.24,
          filter: 'blur(5px) saturate(0.85)',
          scale: interpolate(frame, [0, 60], [1.04, 1.10], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <AbsoluteFill style={{backgroundColor: 'rgba(6,16,24,0.72)'}} />

      <BrandBug />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 590,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [44, 0]) + 'px',
        }}
      >
        <HeadlineLines lines={['好きが、', '読む理由になる。']} size={94} />
      </div>

      <div style={{position: 'absolute', left: SAFE.left, top: 905}}>
        <Supporting size={50}>好きな題材だから、続きが気になる。</Supporting>
      </div>

      <Grain />
      <Vignette strength={0.80} />
    </AbsoluteFill>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 120, mass: 0.74},
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 42% 42%, rgba(102,227,241,0.17), transparent 30%), ' +
          C.bg,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 410,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [52, 0]) + 'px',
        }}
      >
        <div
          style={{
            fontFamily: UI_FONT,
            color: C.cyan,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '0.14em',
          }}
        >
          リードン
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: 'Arial, sans-serif',
            color: C.ink,
            fontSize: 146,
            fontWeight: 900,
            lineHeight: 0.96,
            letterSpacing: '-0.055em',
          }}
        >
          READON
        </div>

        <div
          style={{
            marginTop: 56,
            width: 455,
            height: 3,
            background: 'linear-gradient(90deg, ' + C.cyan + ', transparent)',
          }}
        />

        <div style={{marginTop: 58}}>
          <HeadlineLines lines={['好きからつくる、', '英語長文。']} size={86} />
        </div>
      </div>

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
