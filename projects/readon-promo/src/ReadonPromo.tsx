import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type ReadonPromoProps = {
  hook: string;
  topic: string;
  cta: string;
};

const COLORS = {
  ink: '#F7FAFC',
  muted: '#CBD5E1',
  navy: '#07131D',
  cyan: '#67E8F9',
  gold: '#FDE68A',
  line: 'rgba(255,255,255,0.16)',
};

const SHOTS = {
  home: 'screens/01-home.png',
  create: 'screens/02-create-filled.png',
  english: 'screens/03-reader-english.png',
  translation: 'screens/04-reader-translation.png',
  explanation: 'screens/05-reader-explanation.png',
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const Backdrop: React.FC<{src: string; dim?: number}> = ({src, dim = 0.72}) => (
  <AbsoluteFill style={{backgroundColor: COLORS.navy, overflow: 'hidden'}}>
    <Img
      src={staticFile(src)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'blur(34px) saturate(0.85)',
        scale: 1.13,
        opacity: 0.38,
      }}
    />
    <AbsoluteFill style={{backgroundColor: 'rgba(7,19,29,' + dim + ')'}} />
  </AbsoluteFill>
);

const Kicker: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      fontFamily: '"Noto Sans JP", "Hiragino Sans", sans-serif',
      fontWeight: 800,
      fontSize: 28,
      letterSpacing: '0.16em',
      color: COLORS.cyan,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  align?: 'left' | 'center';
}> = ({children, size = 82, align = 'left'}) => (
  <div
    style={{
      fontFamily: '"Noto Sans JP", "Hiragino Sans", sans-serif',
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.16,
      letterSpacing: '-0.035em',
      color: COLORS.ink,
      whiteSpace: 'pre-line',
      textAlign: align,
      textWrap: 'balance',
    }}
  >
    {children}
  </div>
);

const PhoneShot: React.FC<{
  src: string;
  width?: number;
  top?: number;
  panY?: number;
  scaleTo?: number;
}> = ({src, width = 612, top = 454, panY = 0, scaleTo = 1.025}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = clamp(frame / (0.55 * fps));
  const settled = Easing.bezier(0.16, 1, 0.3, 1)(enter);
  const opacity = interpolate(settled, [0, 1], [0, 1]);
  const translateY = interpolate(settled, [0, 1], [72, 0]);
  const scale = interpolate(frame, [0, 4 * fps], [1, scaleTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const height = width * (852 / 393);

  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        left: (1080 - width) / 2,
        top,
        borderRadius: 58,
        overflow: 'hidden',
        border: '1px solid ' + COLORS.line,
        boxShadow: '0 30px 80px rgba(0,0,0,0.36)',
        backgroundColor: '#0B1420',
        opacity,
        translate: '0 ' + (translateY + panY) + 'px',
        scale,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
};

const HookScene: React.FC<{hook: string}> = ({hook}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const textIn = clamp(frame / (0.45 * fps));
  const y = interpolate(Easing.bezier(0.16, 1, 0.3, 1)(textIn), [0, 1], [38, 0]);
  const opacity = interpolate(textIn, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <Backdrop src={SHOTS.home} dim={0.58} />
      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          top: 142,
          opacity,
          translate: '0 ' + y + 'px',
        }}
      >
        <Kicker>READON</Kicker>
        <div style={{height: 24}} />
        <Headline size={88}>{hook}</Headline>
      </div>
      <PhoneShot src={SHOTS.home} width={550} top={520} scaleTo={1.018} />
    </AbsoluteFill>
  );
};

const CreateScene: React.FC<{topic: string}> = ({topic}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = clamp(frame / (0.5 * fps));
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{opacity}}>
      <Backdrop src={SHOTS.create} dim={0.76} />
      <div style={{position: 'absolute', left: 72, right: 72, top: 126}}>
        <Kicker>01 / MAKE IT YOURS</Kicker>
        <div style={{height: 20}} />
        <Headline size={72}>だったら、好きなテーマで作る。</Headline>
        <div
          style={{
            marginTop: 26,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 20px',
            borderRadius: 999,
            border: '1px solid ' + COLORS.line,
            color: COLORS.gold,
            fontFamily: '"Noto Sans JP", sans-serif',
            fontSize: 27,
            fontWeight: 800,
            backgroundColor: 'rgba(7,19,29,0.68)',
          }}
        >
          <span>テーマ</span>
          <span style={{color: COLORS.ink}}>「{topic}」</span>
        </div>
      </div>

      <PhoneShot src={SHOTS.create} width={560} top={500} scaleTo={1.02} />

      <div
        style={{
          position: 'absolute',
          left: 74,
          right: 74,
          bottom: 92,
          fontFamily: '"Noto Sans JP", sans-serif',
          color: COLORS.ink,
          fontSize: 32,
          fontWeight: 800,
          display: 'flex',
          justifyContent: 'center',
          gap: 18,
          flexWrap: 'wrap',
        }}
      >
        {['英語レベル', '長さ', '解説キャラ'].map((label) => (
          <span
            key={label}
            style={{
              padding: '12px 18px',
              borderRadius: 999,
              border: '1px solid ' + COLORS.line,
              backgroundColor: 'rgba(7,19,29,0.76)',
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const TapPulse: React.FC<{x: number; y: number; start: number}> = ({x, y, start}) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  if (local < 0 || local > 22) return null;
  const p = clamp(local / 22);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: '5px solid rgba(103,232,249,0.88)',
        opacity: interpolate(p, [0, 0.75, 1], [0.9, 0.35, 0]),
        scale: interpolate(p, [0, 1], [0.35, 1.35]),
        translate: '-50% -50%',
      }}
    />
  );
};

const ReaderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const current =
    frame < 75 ? SHOTS.english : frame < 135 ? SHOTS.translation : SHOTS.explanation;
  const label =
    frame < 75 ? 'まず英文だけ。' : frame < 135 ? '「訳」で確認。' : '「解説」で理解。';

  const textOpacity = interpolate(frame % 60, [0, 8, 50, 59], [0, 1, 1, 0.84], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Backdrop src={current} dim={0.78} />
      <div style={{position: 'absolute', left: 72, right: 72, top: 118}}>
        <Kicker>02 / READ & UNDERSTAND</Kicker>
        <div style={{height: 20}} />
        <Headline size={70}>読むときも、欲しい助けをその場で。</Headline>
      </div>

      <div style={{position: 'absolute', left: 0, right: 0, top: 445}}>
        <PhoneShot src={current} width={584} top={0} scaleTo={1.012} />
        <TapPulse x={630} y={48} start={72} />
        <TapPulse x={714} y={48} start={132} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 108,
          right: 108,
          bottom: 104,
          textAlign: 'center',
          color: COLORS.ink,
          fontFamily: '"Noto Sans JP", sans-serif',
          fontWeight: 900,
          fontSize: 44,
          opacity: textOpacity,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC<{cta: string}> = ({cta}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = clamp(frame / (0.6 * fps));
  const eased = Easing.bezier(0.16, 1, 0.3, 1)(p);
  return (
    <AbsoluteFill>
      <Backdrop src={SHOTS.home} dim={0.82} />
      <div
        style={{
          position: 'absolute',
          left: 82,
          right: 82,
          top: 330,
          opacity: eased,
          translate: '0 ' + interpolate(eased, [0, 1], [42, 0]) + 'px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: '"Noto Sans JP", sans-serif',
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: '0.22em',
            color: COLORS.cyan,
          }}
        >
          リードン
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: 'Arial, sans-serif',
            fontSize: 116,
            fontWeight: 900,
            letterSpacing: '-0.045em',
            color: COLORS.ink,
          }}
        >
          READON
        </div>
        <div style={{height: 56}} />
        <Headline size={72} align="center">{cta}</Headline>
        <div
          style={{
            margin: '64px auto 0',
            width: 360,
            height: 2,
            backgroundColor: 'rgba(255,255,255,0.26)',
          }}
        />
        <div
          style={{
            marginTop: 42,
            fontFamily: '"Noto Sans JP", sans-serif',
            fontSize: 28,
            fontWeight: 800,
            color: COLORS.muted,
          }}
        >
          memora-sentences.itisnowornever271.workers.dev
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ReadonPromo: React.FC<ReadonPromoProps> = ({hook, topic, cta}) => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.navy}}>
      <Sequence from={0} durationInFrames={90}>
        <HookScene hook={hook} />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <CreateScene topic={topic} />
      </Sequence>
      <Sequence from={240} durationInFrames={270}>
        <ReaderScene />
      </Sequence>
      <Sequence from={510} durationInFrames={90}>
        <OutroScene cta={cta} />
      </Sequence>
    </AbsoluteFill>
  );
};
