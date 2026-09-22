import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {ControlsScene, MaterializeScene, PainScene, RevealScene, TopicScene} from './scenes-primary';
import {MontageScene, OutroScene, ReaderStage, Soundtrack} from './scenes-reader';
import {C, SHOTS} from './style';

export type ReadonPromoV2Props = {
  topic: string;
  cta: string;
};

export const ReadonPromoV2: React.FC<ReadonPromoV2Props> = ({topic, cta}) => {
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <Soundtrack />

      <Sequence from={0} durationInFrames={105}>
        <PainScene />
      </Sequence>

      <Sequence from={105} durationInFrames={75}>
        <RevealScene />
      </Sequence>

      <Sequence from={180} durationInFrames={90}>
        <TopicScene topic={topic} />
      </Sequence>

      <Sequence from={270} durationInFrames={120}>
        <ControlsScene />
      </Sequence>

      <Sequence from={390} durationInFrames={60}>
        <MaterializeScene />
      </Sequence>

      <Sequence from={450} durationInFrames={90}>
        <ReaderStage
          src={SHOTS.english}
          kicker="03 / READ"
          headline="作った教材を、そのまま読む。"
          accent={C.red}
          mode="read"
        />
      </Sequence>

      <Sequence from={540} durationInFrames={90}>
        <ReaderStage
          src={SHOTS.translation}
          kicker="04 / TRANSLATE"
          headline="分からない瞬間だけ、訳を見る。"
          accent={C.cyan}
          mode="translate"
          tapX={677}
          tapAt={18}
        />
      </Sequence>

      <Sequence from={630} durationInFrames={90}>
        <ReaderStage
          src={SHOTS.explanation}
          kicker="05 / EXPLAIN"
          headline="もっと知りたいところは、解説へ。"
          accent={C.gold}
          mode="explain"
          tapX={760}
          tapAt={18}
        />
      </Sequence>

      <Sequence from={720} durationInFrames={60}>
        <MontageScene />
      </Sequence>

      <Sequence from={780} durationInFrames={120}>
        <OutroScene cta={cta} />
      </Sequence>
    </AbsoluteFill>
  );
};
