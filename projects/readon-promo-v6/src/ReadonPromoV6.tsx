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

    <Sequence from={0} durationInFrames={48}>
      <HookScene />
    </Sequence>
    <Sequence from={48} durationInFrames={36}>
      <QuizScene />
    </Sequence>
    <Sequence from={84} durationInFrames={48}>
      <AnswerScene />
    </Sequence>
    <Sequence from={132} durationInFrames={60}>
      <BridgeScene />
    </Sequence>
    <Sequence from={192} durationInFrames={54}>
      <AppScene />
    </Sequence>
    <Sequence from={246} durationInFrames={27}>
      <ReaderScene src={SHOTS.english} mode="read" />
    </Sequence>
    <Sequence from={273} durationInFrames={48}>
      <ReaderScene src={SHOTS.translation} mode="translate" />
    </Sequence>
    <Sequence from={321} durationInFrames={66}>
      <ReaderScene src={SHOTS.explanation} mode="explain" />
    </Sequence>
    <Sequence from={387} durationInFrames={45}>
      <PayoffScene />
    </Sequence>
    <Sequence from={432} durationInFrames={84}>
      <CloseScene />
    </Sequence>

    <RetentionBar />
  </AbsoluteFill>
);
