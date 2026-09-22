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
import {BrandBug, Device, FilmGrain, FocusPanel, Headline, Supporting, Vignette} from './components';
import {C, DISPLAY_FONT, SAFE, SHOTS, UI_FONT} from './style';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - 10, fps, config: {damping: 18, stiffness: 145, mass: 0.7}});
  const phone = spring({frame: frame - 38, fps, config: {damping: 18, stiffness: 120, mass: 0.72}});
  const rows = [
    'The relationship between technological change and human attention...',
    'While contemporary educational systems increasingly emphasize...',
    'Historical evidence suggests that individual motivation...',
    'An examination of the economic structures surrounding media...',
    'The following passage explores a number of factors...',
  ];

  return (
    <AbsoluteFill style={{backgroundColor: '#02070B', overflow: 'hidden'}}>
      {rows.map((text, i) => (
        <div
          key={text}
          style={{
            position: 'absolute',
            left: -110 + (i % 2) * 54,
            top: 250 + i * 270 - frame * (2.4 + i * 0.16),
            width: 1450,
            whiteSpace: 'nowrap',
            fontFamily: 'Georgia, serif',
            fontSize: 68 + (i % 2) * 9,
            fontWeight: 700,
            color: 'rgba(255,255,255,' + (0.07 + i * 0.012) + ')',
            rotate: (i % 2 === 0 ? -2 : 2) + 'deg',
          }}
        >
          {text}
        </div>
      ))}

      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(2,7,11,0.18), rgba(2,7,11,0.82))'}} />
      <BrandBug />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 360,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [54, 0]) + 'px',
          scale: interpolate(p, [0, 1], [0.94, 1]),
        }}
      >
        <Headline size={106} maxWidth={800}>
          興味のない英語長文、
          {'\n'}読むの、しんどくない？
        </Headline>
      </div>

      <Device
        src={SHOTS.home}
        width={520}
        top={930}
        x={130}
        rotateZ={interpolate(phone, [0, 1], [7, 1])}
        zoom={interpolate(phone, [0, 1], [0.78, 1])}
        yOffset={interpolate(phone, [0, 1], [180, 0])}
        opacity={phone}
      />

      <FilmGrain opacity={0.035} />
      <Vignette strength={0.86} />
    </AbsoluteFill>
  );
};

export const TopicScene: React.FC<{topic: string}> = ({topic}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 18, stiffness: 125, mass: 0.7}});
  const chars = Math.floor(interpolate(frame, [10, 54], [0, topic.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <BrandBug muted />
      <div style={{position: 'absolute', left: SAFE.left, right: SAFE.right, top: 210, opacity: p}}>
        <Headline size={88}>まず、好きなテーマを入れる。</Headline>
      </div>

      <FocusPanel src={SHOTS.topic} top={520} height={760} objectPosition="50% 30%" scale={1.08} />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 1340,
          padding: '22px 28px',
          borderRadius: 28,
          backgroundColor: 'rgba(6,16,24,0.90)',
          border: '1px solid ' + C.line,
          fontFamily: UI_FONT,
          fontSize: 52,
          fontWeight: 700,
          color: C.ink,
          boxShadow: '0 22px 70px rgba(0,0,0,0.34)',
        }}
      >
        <span style={{color: C.cyan, marginRight: 16}}>テーマ</span>
        {topic.slice(0, chars)}
        <span style={{color: C.cyan, opacity: frame % 18 < 9 ? 1 : 0}}>｜</span>
      </div>

      <FilmGrain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const ControlsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cards = [
    {label: '英語レベル', value: '英検2級', src: SHOTS.controls, top: 560, left: 82, rot: -5},
    {label: '長さ', value: '400語', src: SHOTS.controls, top: 720, left: 260, rot: 2},
    {label: '解説キャラ', value: 'ギャル × 世話好き', src: SHOTS.persona, top: 880, left: 438, rot: 6},
  ];

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 48% 48%, rgba(102,227,241,0.12), transparent 38%), ' + C.bg, overflow: 'hidden'}}>
      <BrandBug muted />
      <div style={{position: 'absolute', left: SAFE.left, right: SAFE.right, top: 205}}>
        <Headline size={84}>難しさも、長さも、解説のノリも。</Headline>
      </div>

      {cards.map((card, i) => {
        const p = spring({frame: frame - i * 11, fps, config: {damping: 18, stiffness: 140, mass: 0.65}});
        return (
          <div
            key={card.label}
            style={{
              position: 'absolute',
              left: card.left,
              top: card.top,
              width: 555,
              height: 450,
              borderRadius: 34,
              overflow: 'hidden',
              backgroundColor: C.bg2,
              border: '1px solid ' + C.line,
              boxShadow: '0 28px 80px rgba(0,0,0,0.38)',
              opacity: p,
              translate: interpolate(p, [0, 1], [120, 0]) + 'px ' + interpolate(p, [0, 1], [100, 0]) + 'px',
              rotate: interpolate(p, [0, 1], [card.rot + 5, card.rot]) + 'deg',
              scale: interpolate(p, [0, 1], [0.86, 1]),
            }}
          >
            <Img src={staticFile(card.src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 46%', opacity: 0.76}} />
            <div
              style={{
                position: 'absolute',
                inset: 'auto 20px 20px 20px',
                padding: '16px 20px',
                borderRadius: 22,
                backgroundColor: 'rgba(4,10,15,0.88)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div style={{fontFamily: UI_FONT, fontSize: 38, fontWeight: 700, color: C.cyan}}>{card.label}</div>
              <div style={{fontFamily: DISPLAY_FONT, fontSize: 52, fontWeight: 900, color: C.ink, marginTop: 4}}>{card.value}</div>
            </div>
          </div>
        );
      })}

      <div style={{position: 'absolute', left: SAFE.left, right: SAFE.right, top: 1510}}>
        <Supporting size={50}>「自分にちょうどいい」を、読む前に作る。</Supporting>
      </div>

      <FilmGrain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const MaterialScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 19, stiffness: 145, mass: 0.7}});
  const chips = [
    {t: '恐竜', x: -240, y: 60, c: C.cyan},
    {t: '英検2級', x: -70, y: -30, c: 'rgba(255,255,255,0.11)'},
    {t: '400語', x: 110, y: -72, c: 'rgba(255,255,255,0.11)'},
    {t: 'ギャル解説', x: 270, y: 40, c: 'rgba(255,255,255,0.11)'},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: '#030A0F', overflow: 'hidden'}}>
      <BrandBug muted />
      <div style={{position: 'absolute', left: SAFE.left, right: SAFE.right, top: 350, textAlign: 'center', opacity: p}}>
        <Headline size={104} align="center" maxWidth={820}>
          自分だけの
          {'\n'}英語教材になる。
        </Headline>
      </div>

      {chips.map((chip, i) => {
        const q = spring({frame: frame - i * 5, fps, config: {damping: 18, stiffness: 165}});
        return (
          <div
            key={chip.t}
            style={{
              position: 'absolute',
              left: 540,
              top: 1100,
              padding: '18px 26px',
              borderRadius: 999,
              fontFamily: UI_FONT,
              fontWeight: 700,
              fontSize: 44,
              color: chip.c === C.cyan ? C.bg : C.ink,
              backgroundColor: chip.c,
              border: '1px solid ' + C.line,
              translate: interpolate(q, [0, 1], [0, chip.x]) + 'px ' + interpolate(q, [0, 1], [0, chip.y]) + 'px',
              scale: interpolate(q, [0, 1], [0.45, 1]),
              opacity: q,
            }}
          >
            {chip.t}
          </div>
        );
      })}

      <FilmGrain opacity={0.04} />
      <Vignette strength={0.88} />
    </AbsoluteFill>
  );
};
