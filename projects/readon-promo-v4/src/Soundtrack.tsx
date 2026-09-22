import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence, staticFile} from 'remotion';

export const Soundtrack: React.FC = () => (
  <>
    <Audio src={staticFile('audio/bgm.wav')} volume={0.075} />

    <Sequence from={1}>
      <Audio src={staticFile('audio/vo-hook.mp3')} volume={1.12} />
    </Sequence>
    <Sequence from={60}>
      <Audio src={staticFile('audio/vo-custom.mp3')} volume={1.10} />
    </Sequence>
    <Sequence from={181}>
      <Audio src={staticFile('audio/vo-reader.mp3')} volume={1.14} />
    </Sequence>
    <Sequence from={361}>
      <Audio src={staticFile('audio/vo-close.mp3')} volume={1.14} />
    </Sequence>

    {[58, 118, 178, 238, 298, 358, 418].map((at) => (
      <Sequence key={'whoosh-' + at} from={at}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.24} />
      </Sequence>
    ))}

    {[24, 85, 132, 151, 170, 263, 323].map((at) => (
      <Sequence key={'click-' + at} from={at}>
        <Audio src={staticFile('audio/click.wav')} volume={0.24} />
      </Sequence>
    ))}

    <Sequence from={59}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.34} />
    </Sequence>
    <Sequence from={358}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.36} />
    </Sequence>
    <Sequence from={410}>
      <Audio src={staticFile('audio/riser.wav')} volume={0.24} />
    </Sequence>
    <Sequence from={420}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.42} />
    </Sequence>
  </>
);
