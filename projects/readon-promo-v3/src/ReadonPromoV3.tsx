import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {ControlsScene, HookScene, MaterialScene, TopicScene} from './scenes-a';
import {MontageScene, OutroScene, ReaderScene} from './scenes-b';
import {Soundtrack} from './Soundtrack';
import {C, SHOTS} from './style';

export type ReadonPromoV3Props = {
  topic: string;
  cta: string;
};

export const ReadonPromoV3: React.FC<ReadonPromoV3Props> = ({topic, cta}) => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <Soundtrack />

    <Sequence from={0} durationInFrames={75}>
      <HookScene />
    </Sequence>

    <Sequence from={75} durationInFrames={75}>
      <TopicScene topic={topic} />
    </Sequence>

    <Sequence from={150} durationInFrames={90}>
      <ControlsScene />
    </Sequence>

    <Sequence from={240} durationInFrames={60}>
      <MaterialScene />
    </Sequence>

    <Sequence from={300} durationInFrames={90}>
      <ReaderScene
        src={SHOTS.english}
        title="作った教材を、そのまま読む。"
        mode="read"
      />
    </Sequence>

    <Sequence from={390} durationInFrames={60}>
      <ReaderScene
        src={SHOTS.translation}
        title="分からない瞬間だけ、訳を見る。"
        mode="translate"
        tap={{x: 686, y: 548, at: 14}}
      />
    </Sequence>

    <Sequence from={450} durationInFrames={60}>
      <ReaderScene
        src={SHOTS.explanation}
        title="もっと知りたいところは、解説へ。"
        mode="explain"
        tap={{x: 760, y: 548, at: 14}}
      />
    </Sequence>

    <Sequence from={510} durationInFrames={60}>
      <MontageScene />
    </Sequence>

    <Sequence from={570} durationInFrames={90}>
      <OutroScene cta={cta} />
    </Sequence>
  </AbsoluteFill>
);
