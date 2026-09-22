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
  Pop,
  ScreenCrop,
  Supporting,
  Vignette,
} from './components';
import {C, DISPLAY_FONT, SAFE, SHOTS, UI_FONT} from './style';

const SENTENCE = 'some small feathered dinosaurs survived';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame: frame - 2,
    fps,
    config: {damping: 18, stiffness: 170, mass: 0.62},
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#030A0F', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 180,
          padding: '12px 18px',
          borderRadius: 999,
          backgroundColor: C.cyan,
          color: C.bg,
          fontFamily: UI_FONT,
          fontSize: 31,
          fontWeight: 700,
        }}
      >
        2秒クイズ
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 310,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [46, 0]) + 'px',
        }}
      >
        <HeadlineLines lines={['これ、2秒で', '意味わかる？']} size={102} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 760,
          padding: '42px 42px',
          borderRadius: 38,
          backgroundColor: 'rgba(255,255,255,0.075)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 28px 80px rgba(0,0,0,0.34)',
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY_FONT,
            fontWeight: 700,
            fontSize: 58,
            lineHeight: 1.4,
            color: C.ink,
          }}
        >
          some small feathered dinosaurs{' '}
          <span
            style={{
              color: C.gold,
              fontWeight: 900,
              textDecoration: 'underline',
              textUnderlineOffset: 10,
            }}
          >
            survived
          </span>
        </div>
      </div>

      <div style={{position: 'absolute', left: SAFE.left, top: 1375}}>
        <Supporting size={48}>survived = ?</Supporting>
      </div>

      <Grain />
      <Vignette strength={0.84} />
    </AbsoluteFill>
  );
};

export const QuizScene: React.FC = () => {
  const frame = useCurrentFrame();
  const options = ['① 絶滅した', '② 生き残った', '③ 進化した'];
  const remaining = frame < 20 ? '2' : '1';

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: SAFE.left, top: 170}}>
        <HeadlineLines lines={['survived は', 'どれ？']} size={98} />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 205,
          top: 210,
          width: 122,
          height: 122,
          borderRadius: '50%',
          border: '5px solid ' + C.cyan,
          display: 'grid',
          placeItems: 'center',
          color: C.cyan,
          fontFamily: DISPLAY_FONT,
          fontWeight: 900,
          fontSize: 64,
        }}
      >
        {remaining}
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 640,
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        {options.map((option, i) => (
          <Pop key={option} delay={i * 5}>
            <div
              style={{
                padding: '29px 34px',
                borderRadius: 28,
                backgroundColor: 'rgba(255,255,255,0.075)',
                border: '1px solid rgba(255,255,255,0.16)',
                color: C.ink,
                fontFamily: UI_FONT,
                fontSize: 54,
                fontWeight: 700,
              }}
            >
              {option}
            </div>
          </Pop>
        ))}
      </div>

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const AnswerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 15, stiffness: 200, mass: 0.55},
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 48% 48%, rgba(126,230,166,0.22), transparent 38%), ' +
          C.bg,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 250,
          color: C.green,
          fontFamily: UI_FONT,
          fontSize: 39,
          fontWeight: 700,
        }}
      >
        正解
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 390,
          opacity: p,
          translate: '0 ' + interpolate(p, [0, 1], [46, 0]) + 'px',
          scale: interpolate(p, [0, 1], [0.88, 1]),
        }}
      >
        <HeadlineLines lines={['② 生き残った']} size={110} color={C.green} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 800,
          padding: '38px 40px',
          borderRadius: 34,
          backgroundColor: 'rgba(255,255,255,0.075)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY_FONT,
            fontWeight: 700,
            fontSize: 50,
            lineHeight: 1.45,
            color: C.ink,
          }}
        >
          dinosaurs <span style={{color: C.green, fontWeight: 900}}>survived</span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: UI_FONT,
            fontWeight: 700,
            fontSize: 46,
            color: C.soft,
          }}
        >
          恐竜の一部は「生き残った」
        </div>
      </div>

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const InterestScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <Img
        src={staticFile(SHOTS.home)}
        style={{
          position: 'absolute',
          width: 1120,
          height: 'auto',
          left: -20,
          top: -60,
          opacity: 0.42,
          filter: 'blur(2px) saturate(0.90)',
          scale: interpolate(frame, [0, 54], [1.02, 1.08], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
      <AbsoluteFill style={{backgroundColor: 'rgba(6,16,24,0.64)'}} />

      <div style={{position: 'absolute', left: SAFE.left, top: 420}}>
        <HeadlineLines lines={['恐竜なら、', '続きが気になる。']} size={98} />
      </div>

      <div style={{position: 'absolute', left: SAFE.left, top: 790}}>
        <Supporting size={52}>その「好き」を、英語長文に。</Supporting>
      </div>

      <Grain />
      <Vignette strength={0.80} />
    </AbsoluteFill>
  );
};

export const AppScene: React.FC = () => {
  const frame = useCurrentFrame();
  const chips = [
    {label: '英検2級', color: C.cyan, at: 20},
    {label: '400語', color: C.gold, at: 28},
    {label: 'ギャル解説', color: C.coral, at: 36},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <BrandBug />

      <div style={{position: 'absolute', left: SAFE.left, top: 200}}>
        <HeadlineLines lines={['好きなテーマを', '自分用に設定。']} size={84} />
      </div>

      <ScreenCrop
        src={SHOTS.topic}
        top={535}
        height={720}
        imageTop={-275}
        imageWidth={820}
        zoom={1.03}
      />

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          right: SAFE.right,
          top: 1325,
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {chips.map((chip) => {
          const opacity = interpolate(frame, [chip.at, chip.at + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(frame, [chip.at, chip.at + 8], [22, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={chip.label}
              style={{
                opacity,
                translate: '0 ' + y + 'px',
                padding: '13px 20px',
                borderRadius: 999,
                backgroundColor: chip.color,
                color: C.bg,
                fontFamily: UI_FONT,
                fontSize: 37,
                fontWeight: 700,
              }}
            >
              {chip.label}
            </div>
          );
        })}
      </div>

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const ReaderScene: React.FC<{
  src: string;
  mode: 'read' | 'translate' | 'explain';
}> = ({src, mode}) => {
  const labels = {
    read: ['まず、読む。'],
    translate: ['分からなければ、', '訳を見る。'],
    explain: ['もっと知りたければ、', '解説へ。'],
  } as const;
  const accent =
    mode === 'translate' ? C.cyan : mode === 'explain' ? C.gold : C.coral;

  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <BrandBug />

      <div style={{position: 'absolute', left: SAFE.left, top: 185}}>
        <HeadlineLines lines={[...labels[mode]]} size={82} />
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
          zIndex: 3,
        }}
      >
        {mode === 'translate' ? '訳 ON' : mode === 'explain' ? '解説 ON' : 'READ'}
      </div>

      <ScreenCrop
        src={src}
        top={555}
        height={1020}
        imageTop={-6}
        imageWidth={830}
        zoom={1.02}
      />

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

export const CloseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 125, mass: 0.72},
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 42% 42%, rgba(101,228,242,0.18), transparent 31%), ' +
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
          translate: '0 ' + interpolate(p, [0, 1], [50, 0]) + 'px',
        }}
      >
        <div
          style={{
            fontFamily: UI_FONT,
            color: C.cyan,
            fontSize: 31,
            fontWeight: 700,
            letterSpacing: '0.14em',
          }}
        >
          リードン
        </div>
        <div
          style={{
            marginTop: 7,
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

        <div style={{marginTop: 62}}>
          <HeadlineLines lines={['好きからつくる、', '英語長文。']} size={88} />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: SAFE.left,
          top: 1120,
          width: 520,
          height: 3,
          background:
            'linear-gradient(90deg, ' + C.cyan + ', transparent)',
          scale: interpolate(p, [0, 1], [0.2, 1]),
          transformOrigin: 'left center',
        }}
      />

      <div style={{position: 'absolute', left: SAFE.left, top: 1205}}>
        <Supporting size={48}>英語を「興味ある話」に変える。</Supporting>
      </div>

      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
