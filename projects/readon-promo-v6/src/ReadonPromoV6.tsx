import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {RetentionBar} from './components';
import {
  AnswerScene,
  AppScene,
  BridgeScene,
  CloseScene,
  HookScene,
  PayoffScene,
  QuizScene,
  ReaderScene,
} from './scenes';
import {Soundtrack} from './Soundtrack';
import {C, SHOTS} from './style';

export const ReadonPromoV6: React.FC = () => (
  <AbsoluteFill style={{backgroundColor:C.paper}}>
    <Soundtrack />

    <Sequence from={0} durationInFrames={54}>
      <HookScene />
    </Sequence>
    <Sequence from={54} durationInFrames={36}>
      <QuizScene />
    </Sequence>
    <Sequence from={90} durationInFrames={42}>
      <AnswerScene />
    </Sequence>
    <Sequence from={132} durationInFrames={66}>
      <BridgeScene />
    </Sequence>
    <Sequence from={198} durationInFrames={54}>
      <AppScene />
    </Sequence>
    <Sequence from={252} durationInFrames={27}>
      <ReaderScene src={SHOTS.english} mode="read" />
    </Sequence>
    <Sequence from={279} durationInFrames={48}>
      <ReaderScene src={SHOTS.translation} mode="translate" />
    </Sequence>
    <Sequence from={327} durationInFrames={54}>
      <ReaderScene src={SHOTS.explanation} mode="explain" />
    </Sequence>
    <Sequence from={381} durationInFrames={57}>
      <PayoffScene />
    </Sequence>
    <Sequence from={438} durationInFrames={63}>
      <CloseScene />
    </Sequence>

    <RetentionBar />
  </AbsoluteFill>
);
