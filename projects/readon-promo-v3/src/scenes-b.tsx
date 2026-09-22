import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandBug, Device, FilmGrain, Headline, Supporting, TapPulse, Vignette} from './components';
import {C, DISPLAY_FONT, SAFE, SHOTS, UI_FONT} from './style';

export const ReaderScene: React.FC<{
  src: string;
  title: string;
  mode: 'read' | 'translate' | 'explain';
  tap?: {x: number; y: number; at: number};
}> = ({src, title, mode, tap}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 18, stiffness: 128, mass: 0.7}});
  const accent = mode === 'translate' ? C.cyan : mode === 'explain' ? C.gold : C.coral;
  const label = mode === 'translate' ? '訳' : mode === 'explain' ? '解説' : 'READ';
  const sub = mode === 'translate'
    ? '分からない瞬間だけ、見る。'
    : mode === 'explain'
      ? 'もっと知りたいところだけ、深く。'
      : 'まずは、自分で読む。';

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 46% 50%, rgba(102,227,241,0.12), transparent 38%), ' + C.bg, overflow: 'hidden'}}>
      <BrandBug muted />

      <div style={{position: 'absolute', left: SAFE.left, right: SAFE.right, top: 200, opacity: p}}>
        <Headline size={82}>{title}</Headline>
      </div>

      <Device
        src={src}
        width={640}
        top={500}
        x={-55}
        rotateZ={interpolate(p, [0, 1], [3.5, 0])}
        zoom={interpolate(p, [0, 1], [0.92, 1])}
        yOffset={interpolate(p, [0, 1], [80, 0])}
        opacity={p}
      />

      {tap ? <TapPulse x={tap.x} y={tap.y} at={tap.at} /> : null}

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 1500,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div
          style={{
            flex: '0 0 auto',
            padding: '13px 20px',
            borderRadius: 999,
            backgroundColor: accent,
            color: C.bg,
            fontFamily: UI_FONT,
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          {label}
        </div>
        <Supporting size={50}>{sub}</Supporting>
      </div>

      <FilmGrain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const MontageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = [
    {src: SHOTS.topic, x: -140, y: 470, r: -10},
    {src: SHOTS.controls, x: 390, y: 370, r: 7},
    {src: SHOTS.explanation, x: 100, y: 910, r: -2},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      {items.map((item, i) => {
        const p = spring({frame: frame - i * 7, fps, config: {damping: 18, stiffness: 135}});
        return (
          <div
            key={item.src}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: 590,
              height: 1278,
              borderRadius: 50,
              overflow: 'hidden',
              border: '1px solid ' + C.line,
              boxShadow: '0 30px 80px rgba(0,0,0,0.40)',
              rotate: item.r + 'deg',
              opacity: p,
              scale: interpolate(p, [0, 1], [0.80, 1]),
              translate: '0 ' + interpolate(p, [0, 1], [120, 0]) + 'px',
            }}
          >
            <Img src={staticFile(item.src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
        );
      })}

      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(6,16,24,0.18), rgba(6,16,24,0.86))'}} />

      <div style={{position: 'absolute', left: SAFE.left, right: SAFE.right, top: 280, textAlign: 'center'}}>
        <Headline size={94} align="center" maxWidth={820}>好きが、読む理由になる。</Headline>
      </div>

      <div style={{position: 'absolute', left: SAFE.left, right: SAFE.right, top: 1460}}>
        <Supporting size={52} align="center">テーマを選ぶ。自分用に作る。ちゃんと読む。</Supporting>
      </div>

      <FilmGrain />
      <Vignette strength={0.82} />
    </AbsoluteFill>
  );
};

export const OutroScene: React.FC<{cta: string}> = ({cta}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 18, stiffness: 118, mass: 0.75}});
  const rule = interpolate(frame, [10, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 45% 42%, rgba(102,227,241,0.16), transparent 31%), ' + C.bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 330,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [50, 0]) + 'px',
        }}
      >
        <div style={{fontFamily: UI_FONT, fontWeight: 700, fontSize: 30, letterSpacing: '0.14em', color: C.cyan}}>リードン</div>
        <div style={{fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 142, letterSpacing: '-0.055em', lineHeight: 0.95, color: C.ink, marginTop: 10}}>READON</div>

        <div style={{width: 470 * rule, height: 3, margin: '44px 0 54px', background: 'linear-gradient(90deg, ' + C.cyan + ', transparent)'}} />

        <Headline size={86} maxWidth={790}>{cta}</Headline>

        <div style={{marginTop: 48}}>
          <Supporting size={52}>好きからつくる、英語長文。</Supporting>
        </div>

        <div
          style={{
            marginTop: 46,
            display: 'inline-flex',
            padding: '16px 24px',
            borderRadius: 999,
            backgroundColor: C.cyan,
            color: C.bg,
            fontFamily: UI_FONT,
            fontWeight: 700,
            fontSize: 42,
          }}
        >
          READONを開く
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          bottom: 160,
          fontFamily: UI_FONT,
          fontSize: 28,
          fontWeight: 700,
          color: C.muted,
        }}
      >
        memora-sentences.itisnowornever271.workers.dev
      </div>

      <FilmGrain opacity={0.025} />
      <Vignette />
    </AbsoluteFill>
  );
};
