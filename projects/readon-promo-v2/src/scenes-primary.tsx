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
import {Device, FilmGrain, Headline, Kicker, LightSweep, Vignette} from './components';
import {C, FONT, SHOTS, ease} from './style';

export const PainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const slam = spring({
    frame: frame - 32,
    fps,
    config: {damping: 18, mass: 0.7, stiffness: 160},
  });
  const rows = [
    'The relationship between technological change and human attention...',
    'While contemporary educational systems increasingly emphasize...',
    'An examination of the economic structures surrounding media...',
    'The consequences of institutional complexity are difficult to...',
    'Historical evidence suggests that individual motivation...',
    'In contrast, researchers have also proposed that...',
    'The following passage explores a number of factors...',
  ];

  return (
    <AbsoluteFill style={{backgroundColor: '#03070B', overflow: 'hidden'}}>
      {rows.map((text, i) => {
        const y = ((i * 245 - frame * (2.8 + i * 0.14)) % 2150) - 180;
        const x = i % 2 === 0 ? -130 : -40;
        return (
          <div
            key={text}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 1400,
              fontFamily: 'Georgia, serif',
              fontSize: 64 + (i % 3) * 8,
              fontWeight: 700,
              color: i === 3 ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.09)',
              whiteSpace: 'nowrap',
              rotate: (i % 2 === 0 ? -2 : 2) + 'deg',
              filter: 'blur(' + (i % 3) + 'px)',
            }}
          >
            {text}
          </div>
        );
      })}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(3,7,11,0.20), rgba(3,7,11,0.72))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          top: 480,
          opacity: slam,
          translate: '0 ' + interpolate(slam, [0, 1], [50, 0]) + 'px',
          scale: interpolate(slam, [0, 1], [0.92, 1]),
        }}
      >
        <Headline size={94}>
          興味のない英語長文、
          {'\n'}読むの、しんどくない？
        </Headline>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 72,
          bottom: 180,
          color: C.muted,
          fontFamily: FONT,
          fontSize: 26,
          fontWeight: 700,
          opacity: interpolate(frame, [58, 76], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        「英語が嫌い」より、題材が遠すぎるだけかもしれない。
      </div>
      <Vignette strength={0.86} />
      <FilmGrain opacity={0.07} />
      <LightSweep from={70} duration={26} />
    </AbsoluteFill>
  );
};

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 16, stiffness: 120, mass: 0.65},
  });
  const halo = interpolate(frame, [0, 70], [0.7, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 48%, rgba(22,160,190,0.26), transparent 34%), ' +
          C.bg,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 110,
          right: 110,
          top: 160,
          textAlign: 'center',
          opacity: p,
        }}
      >
        <Kicker>CHANGE THE MATERIAL</Kicker>
        <div style={{height: 18}} />
        <Headline size={74} align="center">
          長文を、
          {'\n'}自分の「好き」に変える。
        </Headline>
      </div>
      <div style={{scale: halo}}>
        <Device
          src={SHOTS.home}
          width={560}
          top={560}
          tilt={interpolate(p, [0, 1], [16, -4])}
          rotateZ={interpolate(p, [0, 1], [-4, 0])}
          zoom={interpolate(p, [0, 1], [0.72, 1])}
          yOffset={interpolate(p, [0, 1], [140, 0])}
        />
      </div>
      <FilmGrain />
      <Vignette />
      <LightSweep from={26} duration={34} />
    </AbsoluteFill>
  );
};

export const TopicScene: React.FC<{topic: string}> = ({topic}) => {
  const frame = useCurrentFrame();
  const enter = ease(frame / 24);
  const chars = Math.floor(
    interpolate(frame, [22, 70], [0, topic.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const visible = topic.slice(0, chars);

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <Img
        src={staticFile(SHOTS.topic)}
        style={{
          position: 'absolute',
          width: 1180,
          height: 'auto',
          left: -50,
          top: 270,
          opacity: 0.24,
          filter: 'blur(16px) saturate(0.7)',
          scale: 1.12,
        }}
      />
      <div style={{position: 'absolute', left: 72, right: 72, top: 126}}>
        <Kicker>01 / YOUR TOPIC</Kicker>
        <div style={{height: 14}} />
        <Headline size={72}>まず、好きなテーマを入れる。</Headline>
      </div>
      <Device
        src={SHOTS.topic}
        width={590}
        top={470}
        tilt={-5}
        rotateZ={1.4}
        zoom={interpolate(enter, [0, 1], [0.9, 1])}
        yOffset={interpolate(enter, [0, 1], [80, 0])}
      />
      <div
        style={{
          position: 'absolute',
          left: 124,
          right: 124,
          bottom: 158,
          padding: '20px 26px',
          borderRadius: 24,
          border: '1px solid ' + C.line,
          backgroundColor: 'rgba(6,16,24,0.82)',
          backdropFilter: 'blur(12px)',
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 900,
          color: C.ink,
          boxShadow: '0 18px 60px rgba(0,0,0,0.28)',
        }}
      >
        <span style={{color: C.cyan, marginRight: 14}}>テーマ</span>
        {visible}
        <span style={{opacity: frame % 18 < 9 ? 1 : 0, color: C.cyan}}>｜</span>
      </div>
      <FilmGrain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const ControlsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const deck = [
    {src: SHOTS.controls, label: '英語レベル', value: '英検2級'},
    {src: SHOTS.controls, label: '長さ', value: '400語'},
    {src: SHOTS.persona, label: '解説キャラ', value: 'ギャル × 世話好き'},
  ];

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 43%, rgba(98,229,245,0.13), transparent 38%), ' +
          C.bg,
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', left: 72, right: 72, top: 108}}>
        <Kicker>02 / MAKE IT FIT YOU</Kicker>
        <div style={{height: 16}} />
        <Headline size={68}>難しさも、長さも、解説のノリも。</Headline>
      </div>

      {deck.map((item, i) => {
        const local = frame - i * 20;
        const p = spring({
          frame: local,
          fps,
          config: {damping: 18, stiffness: 135, mass: 0.68},
        });
        const baseX = [80, 272, 464][i];
        const top = [570, 700, 830][i];
        return (
          <div
            key={item.label}
            style={{
              position: 'absolute',
              left: baseX,
              top,
              width: 540,
              height: 630,
              borderRadius: 42,
              overflow: 'hidden',
              border: '1px solid ' + C.line,
              backgroundColor: '#0A1721',
              boxShadow: '0 36px 80px rgba(0,0,0,0.36)',
              opacity: p,
              translate:
                interpolate(p, [0, 1], [150, 0]) +
                'px ' +
                interpolate(p, [0, 1], [100, 0]) +
                'px',
              rotate: interpolate(p, [0, 1], [10 - i * 5, -5 + i * 5]) + 'deg',
              scale: interpolate(p, [0, 1], [0.82, 1]),
            }}
          >
            <Img
              src={staticFile(item.src)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 48%',
                opacity: 0.82,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 24,
                right: 24,
                bottom: 24,
                padding: '18px 20px',
                borderRadius: 22,
                backgroundColor: 'rgba(4,11,16,0.84)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: FONT,
              }}
            >
              <div style={{color: C.cyan, fontSize: 22, fontWeight: 900}}>
                {item.label}
              </div>
              <div
                style={{
                  color: C.ink,
                  fontSize: 32,
                  fontWeight: 900,
                  marginTop: 4,
                }}
              >
                {item.value}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 86,
          bottom: 118,
          color: C.soft,
          fontFamily: FONT,
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        「自分にちょうどいい」を先に作れる。
      </div>
      <FilmGrain />
      <Vignette />
      <LightSweep from={82} duration={30} />
    </AbsoluteFill>
  );
};

export const MaterializeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 150, mass: 0.65},
  });
  const chips = ['恐竜', '英検2級', '400語', 'ギャル解説'];

  return (
    <AbsoluteFill style={{backgroundColor: '#030A0F', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 300,
          textAlign: 'center',
          opacity: p,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 31,
            fontWeight: 900,
            color: C.muted,
          }}
        >
          YOUR SETTINGS BECOME
        </div>
        <div style={{height: 16}} />
        <Headline size={98} align="center">
          自分だけの
          {'\n'}英語教材。
        </Headline>
      </div>

      {chips.map((chip, i) => {
        const lp = spring({
          frame: frame - i * 7,
          fps,
          config: {damping: 20, stiffness: 180},
        });
        const dx = [-260, -86, 100, 276][i];
        const dy = [70, -30, -88, 18][i];
        const angle = [-14, -5, 7, 14][i];
        return (
          <div
            key={chip}
            style={{
              position: 'absolute',
              left: 540,
              top: 1160,
              padding: '16px 24px',
              borderRadius: 999,
              backgroundColor: i === 0 ? C.cyan : 'rgba(255,255,255,0.10)',
              color: i === 0 ? C.bg : C.ink,
              border: '1px solid ' + C.line,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 30,
              opacity: lp,
              translate:
                interpolate(lp, [0, 1], [0, dx]) +
                'px ' +
                interpolate(lp, [0, 1], [0, dy]) +
                'px',
              rotate: angle + 'deg',
              scale: interpolate(lp, [0, 1], [0.4, 1]),
            }}
          >
            {chip}
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 260,
          top: 1020,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(98,229,245,0.28), rgba(98,229,245,0.04) 46%, transparent 72%)',
          scale: interpolate(p, [0, 1], [0.4, 1.2]),
          opacity: interpolate(p, [0, 1], [0, 1]),
        }}
      />
      <LightSweep from={34} duration={24} />
      <FilmGrain opacity={0.06} />
      <Vignette strength={0.88} />
    </AbsoluteFill>
  );
};
