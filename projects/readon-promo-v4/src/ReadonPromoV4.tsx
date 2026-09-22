import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {
  HookScene,
  OutroScene,
  PayoffScene,
  ReaderScene,
  SettingsScene,
  TopicScene,
} from './scenes';
import {Soundtrack} from './Soundtrack';
import {C, SHOTS} from './style';

export type ReadonPromoV4Props = {
  topic: string;
};

export const ReadonPromoV4: React.FC<ReadonPromoV4Props> = ({topic}) => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <Soundtrack />

    <Sequence from={0} durationInFrames={60}>
      <HookScene />
    </Sequence>

    <Sequence from={60} durationInFrames={60}>
      <TopicScene topic={topic} />
    </Sequence>

    <Sequence from={120} durationInFrames={60}>
      <SettingsScene />
    </Sequence>

    <Sequence from={180} durationInFrames={60}>
      <ReaderScene
        src={SHOTS.english}
        lines={['まずは、', '自分で読む。']}
        mode="read"
      />
    </Sequence>

    <Sequence from={240} durationInFrames={60}>
      <ReaderScene
        src={SHOTS.translation}
        lines={['分からない瞬間だけ、', '訳を見る。']}
        mode="translate"
      />
    </Sequence>

    <Sequence from={300} durationInFrames={60}>
      <ReaderScene
        src={SHOTS.explanation}
        lines={['もっと知りたいところは、', '解説へ。']}
        mode="explain"
      />
    </Sequence>

    <Sequence from={360} durationInFrames={60}>
      <PayoffScene />
    </Sequence>

    <Sequence from={420} durationInFrames={75}>
      <OutroScene />
    </Sequence>
  </AbsoluteFill>
);
