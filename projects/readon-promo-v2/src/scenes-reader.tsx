import React from 'react';
import {Audio} from '@remotion/media';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Device, FilmGrain, Headline, Kicker, LightSweep, Tap, Vignette} from './components';
import {C, FONT, SHOTS} from './style';

export const ReaderStage: React.FC<{
  src: string;
  kicker: string;
  headline: string;
  accent: string;
  mode: 'read' | 'translate' | 'explain';
  tapX?: number;
  tapAt?: number;
}> = ({src, kicker, headline, accent, mode, tapX, tapAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 125, mass: 0.7},
  });

  const pill =
    mode === 'translate' ? '訳' : mode === 'explain' ? '解説' : 'READ';
  const body =
    mode === 'translate'
      ? '分からない瞬間だけ助ける。'
      : mode === 'explain'
        ? '知りたいところまで深く。'
        : 'まずは自分で読む。';

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 52%, rgba(32,185,213,0.16), transparent 38%), ' +
          C.bg,
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', left: 72, right: 72, top: 108, opacity: p}}>
        <Kicker>{kicker}</Kicker>
        <div style={{height: 14}} />
        <Headline size={68}>{headline}</Headline>
      </div>

      <Device
        src={src}
        width={610}
        top={455}
        tilt={interpolate(p, [0, 1], [6, -2])}
        rotateZ={interpolate(p, [0, 1], [2, 0])}
        zoom={interpolate(p, [0, 1], [0.92, 1])}
        yOffset={interpolate(p, [0, 1], [65, 0])}
      />

      {tapX !== undefined && tapAt !== undefined ? (
        <Tap x={tapX} y={545} at={tapAt} />
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          bottom: 106,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          color: C.ink,
          fontFamily: FONT,
          fontSize: 37,
          fontWeight: 900,
        }}
      >
        <span
          style={{
            padding: '12px 18px',
            borderRadius: 999,
            color: C.bg,
            backgroundColor: accent,
          }}
        >
          {pill}
        </span>
        <span>{body}</span>
      </div>

      <FilmGrain />
      <Vignette />
      <LightSweep from={36} duration={34} />
    </AbsoluteFill>
  );
};

export const MontageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = [
    {src: SHOTS.topic, x: -180, y: 480, r: -12},
    {src: SHOTS.controls, x: 350, y: 300, r: 8},
    {src: SHOTS.explanation, x: 120, y: 850, r: -3},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      {items.map((item, i) => {
        const p = spring({
          frame: frame - i * 8,
          fps,
          config: {damping: 18, stiffness: 130},
        });
        return (
          <div
            key={item.src}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: 620,
              height: 1344,
              borderRadius: 54,
              overflow: 'hidden',
              border: '1px solid ' + C.line,
              boxShadow: '0 30px 80px rgba(0,0,0,0.38)',
              rotate: item.r + 'deg',
              opacity: p,
              scale: interpolate(p, [0, 1], [0.78, 1]),
              translate: '0 ' + interpolate(p, [0, 1], [130, 0]) + 'px',
            }}
          >
            <Img
              src={staticFile(item.src)}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          </div>
        );
      })}

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(6,16,24,0.22), rgba(6,16,24,0.84))',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 90,
          right: 90,
          top: 190,
          textAlign: 'center',
        }}
      >
        <Kicker>FROM INTEREST TO READING</Kicker>
        <div style={{height: 20}} />
        <Headline size={78} align="center">
          好きが、読む理由になる。
        </Headline>
      </div>

      <LightSweep from={14} duration={30} />
      <FilmGrain />
      <Vignette strength={0.78} />
    </AbsoluteFill>
  );
};

export const OutroScene: React.FC<{cta: string}> = ({cta}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 120, mass: 0.75},
  });
  const line = interpolate(frame, [12, 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 45%, rgba(98,229,245,0.17), transparent 31%), ' +
          C.bg,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 90,
          right: 90,
          top: 380,
          textAlign: 'center',
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [55, 0]) + 'px',
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 34,
            letterSpacing: '0.20em',
            color: C.cyan,
          }}
        >
          リードン
        </div>

        <div
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: 132,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: '-0.055em',
            color: C.ink,
            marginTop: 6,
          }}
        >
          READON
        </div>

        <div
          style={{
            width: 420 * line,
            height: 3,
            margin: '46px auto 52px',
            background:
              'linear-gradient(90deg, transparent, ' +
              C.cyan +
              ', transparent)',
          }}
        />

        <Headline size={72} align="center">
          {cta}
        </Headline>

        <div
          style={{
            marginTop: 54,
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 800,
            color: C.soft,
          }}
        >
          好きからつくる、英語長文。
        </div>

        <div
          style={{
            marginTop: 28,
            display: 'inline-flex',
            padding: '14px 22px',
            borderRadius: 999,
            border: '1px solid ' + C.line,
            fontFamily: FONT,
            color: C.muted,
            fontSize: 23,
            fontWeight: 800,
          }}
        >
          memora-sentences.itisnowornever271.workers.dev
        </div>
      </div>

      <LightSweep from={42} duration={38} />
      <FilmGrain opacity={0.05} />
      <Vignette />
    </AbsoluteFill>
  );
};

export const Soundtrack: React.FC = () => (
  <>
    <Audio src={staticFile('audio/bgm.wav')} volume={0.18} />

    <Sequence from={4}>
      <Audio src={staticFile('audio/vo-hook.mp3')} volume={0.98} />
    </Sequence>
    <Sequence from={150}>
      <Audio src={staticFile('audio/vo-custom.mp3')} volume={0.96} />
    </Sequence>
    <Sequence from={425}>
      <Audio src={staticFile('audio/vo-reader.mp3')} volume={0.98} />
    </Sequence>
    <Sequence from={780}>
      <Audio src={staticFile('audio/vo-close.mp3')} volume={0.98} />
    </Sequence>

    {[102, 176, 268, 386, 448, 538, 628, 718, 780].map((at) => (
      <Sequence key={'whoosh-' + at} from={at}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.34} />
      </Sequence>
    ))}

    {[31, 206, 305, 470, 560, 650].map((at) => (
      <Sequence key={'click-' + at} from={at}>
        <Audio src={staticFile('audio/click.wav')} volume={0.30} />
      </Sequence>
    ))}

    <Sequence from={105}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.48} />
    </Sequence>
    <Sequence from={389}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.38} />
    </Sequence>
    <Sequence from={780}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.48} />
    </Sequence>
    <Sequence from={748}>
      <Audio src={staticFile('audio/riser.wav')} volume={0.32} />
    </Sequence>
  </>
);
