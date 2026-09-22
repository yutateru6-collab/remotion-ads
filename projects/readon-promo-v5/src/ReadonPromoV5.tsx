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

    <Sequence from={0} durationInFrames={45}>
      <HookScene />
    </Sequence>
    <Sequence from={45} durationInFrames={45}>
      <QuizScene />
    </Sequence>
    <Sequence from={90} durationInFrames={36}>
      <AnswerScene />
    </Sequence>
    <Sequence from={126} durationInFrames={54}>
      <InterestScene />
    </Sequence>
    <Sequence from={180} durationInFrames={60}>
      <AppScene />
    </Sequence>
    <Sequence from={240} durationInFrames={45}>
      <ReaderScene src={SHOTS.english} mode="read" />
    </Sequence>
    <Sequence from={285} durationInFrames={45}>
      <ReaderScene src={SHOTS.translation} mode="translate" />
    </Sequence>
    <Sequence from={330} durationInFrames={45}>
      <ReaderScene src={SHOTS.explanation} mode="explain" />
    </Sequence>
    <Sequence from={375} durationInFrames={75}>
      <CloseScene />
    </Sequence>

    <RetentionBar />
  </AbsoluteFill>
);
