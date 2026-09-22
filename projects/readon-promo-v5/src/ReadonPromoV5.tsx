import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {RetentionBar} from './components';
import {
  AnswerScene,
  AppScene,
  CloseScene,
  HookScene,
  InterestScene,
  QuizScene,
  ReaderScene,
} from './scenes';
import {Soundtrack} from './Soundtrack';
import {C, SHOTS} from './style';

export const ReadonPromoV5: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
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
      <InterestScene />
    </Sequence>
    <Sequence from={192} durationInFrames={60}>
      <AppScene />
    </Sequence>
    <Sequence from={252} durationInFrames={30}>
      <ReaderScene src={SHOTS.english} mode="read" />
    </Sequence>
    <Sequence from={282} durationInFrames={48}>
      <ReaderScene src={SHOTS.translation} mode="translate" />
    </Sequence>
    <Sequence from={330} durationInFrames={54}>
      <ReaderScene src={SHOTS.explanation} mode="explain" />
    </Sequence>
    <Sequence from={384} durationInFrames={84}>
      <CloseScene />
    </Sequence>

    <RetentionBar />
  </AbsoluteFill>
);
