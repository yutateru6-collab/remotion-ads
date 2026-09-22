import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence, staticFile} from 'remotion';

export const Soundtrack: React.FC = () => (
  <>
    <Audio src={staticFile('audio/bgm.wav')} volume={0.10} />

    <Sequence from={2}>
      <Audio src={staticFile('audio/vo-hook.mp3')} volume={1} />
    </Sequence>
    <Sequence from={82}>
      <Audio src={staticFile('audio/vo-custom.mp3')} volume={1} />
    </Sequence>
    <Sequence from={303}>
      <Audio src={staticFile('audio/vo-reader.mp3')} volume={1} />
    </Sequence>
    <Sequence from={572}>
      <Audio src={staticFile('audio/vo-close.mp3')} volume={1} />
    </Sequence>

    {[72, 148, 238, 298, 388, 448, 508, 568].map((at) => (
      <Sequence key={'whoosh-' + at} from={at}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.22} />
      </Sequence>
    ))}

    {[44, 104, 183, 320, 410, 470].map((at) => (
      <Sequence key={'click-' + at} from={at}>
        <Audio src={staticFile('audio/click.wav')} volume={0.22} />
      </Sequence>
    ))}

    <Sequence from={74}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.35} />
    </Sequence>
    <Sequence from={240}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.28} />
    </Sequence>
    <Sequence from={568}>
      <Audio src={staticFile('audio/riser.wav')} volume={0.24} />
    </Sequence>
    <Sequence from={572}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.40} />
    </Sequence>
  </>
);
