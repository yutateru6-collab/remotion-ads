import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence, staticFile} from 'remotion';

const voices = [
  {from: 0, duration: 48, file: 'vo-hook.mp3'},
  {from: 48, duration: 36, file: 'vo-quiz.mp3'},
  {from: 84, duration: 48, file: 'vo-answer.mp3'},
  {from: 132, duration: 60, file: 'vo-interest.mp3'},
  {from: 192, duration: 60, file: 'vo-topic.mp3'},
  {from: 252, duration: 30, file: 'vo-read.mp3'},
  {from: 282, duration: 48, file: 'vo-translate.mp3'},
  {from: 330, duration: 54, file: 'vo-explain.mp3'},
  {from: 384, duration: 84, file: 'vo-close.mp3'},
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

    {[47, 83, 131, 191, 251, 281, 329, 383].map((at) => (
      <Sequence key={'whoosh-' + at} from={at}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.22} />
      </Sequence>
    ))}

    {[16, 62, 80, 101, 216, 265, 305, 350].map((at) => (
      <Sequence key={'click-' + at} from={at}>
        <Audio src={staticFile('audio/click.wav')} volume={0.22} />
      </Sequence>
    ))}

    <Sequence from={84}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.40} />
    </Sequence>
    <Sequence from={383}>
      <Audio src={staticFile('audio/riser.wav')} volume={0.24} />
    </Sequence>
    <Sequence from={384}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.42} />
    </Sequence>
  </>
);
