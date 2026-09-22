import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence, staticFile} from 'remotion';

const voices = [
  {from: 0, duration: 45, file: 'vo-hook.mp3'},
  {from: 45, duration: 45, file: 'vo-quiz.mp3'},
  {from: 90, duration: 36, file: 'vo-answer.mp3'},
  {from: 126, duration: 54, file: 'vo-interest.mp3'},
  {from: 180, duration: 60, file: 'vo-topic.mp3'},
  {from: 240, duration: 45, file: 'vo-read.mp3'},
  {from: 285, duration: 45, file: 'vo-translate.mp3'},
  {from: 330, duration: 45, file: 'vo-explain.mp3'},
  {from: 375, duration: 75, file: 'vo-close.mp3'},
] as const;

export const Soundtrack: React.FC = () => (
  <>
    <Audio src={staticFile('audio/bgm.wav')} volume={0.065} />

    {voices.map((voice) => (
      <Sequence
        key={voice.file}
        from={voice.from}
        durationInFrames={voice.duration}
      >
        <Audio src={staticFile('audio/' + voice.file)} volume={1.14} />
      </Sequence>
    ))}

    {[44, 89, 125, 179, 239, 284, 329, 374].map((at) => (
      <Sequence key={'whoosh-' + at} from={at}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.22} />
      </Sequence>
    ))}

    {[16, 63, 82, 101, 204, 260, 305, 350].map((at) => (
      <Sequence key={'click-' + at} from={at}>
        <Audio src={staticFile('audio/click.wav')} volume={0.22} />
      </Sequence>
    ))}

    <Sequence from={90}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.40} />
    </Sequence>
    <Sequence from={374}>
      <Audio src={staticFile('audio/riser.wav')} volume={0.24} />
    </Sequence>
    <Sequence from={375}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.42} />
    </Sequence>
  </>
);
