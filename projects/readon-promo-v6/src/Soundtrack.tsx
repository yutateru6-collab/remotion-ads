import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence, staticFile} from 'remotion';

const voices = [
  {from:0,duration:54,file:'vo-hook.mp3'},
  {from:54,duration:36,file:'vo-quiz.mp3'},
  {from:90,duration:42,file:'vo-answer.mp3'},
  {from:132,duration:66,file:'vo-bridge.mp3'},
  {from:198,duration:54,file:'vo-app.mp3'},
  {from:252,duration:27,file:'vo-read.mp3'},
  {from:279,duration:48,file:'vo-translate.mp3'},
  {from:327,duration:54,file:'vo-explain.mp3'},
  {from:381,duration:57,file:'vo-payoff.mp3'},
  {from:438,duration:63,file:'vo-close.mp3'},
] as const;

export const Soundtrack: React.FC = () => (
  <>
    <Audio src={staticFile('audio/bgm.wav')} volume={0.055}/>

    {voices.map((voice)=>(
      <Sequence key={voice.file} from={voice.from} durationInFrames={voice.duration}>
        <Audio src={staticFile('audio/'+voice.file)} volume={1.12}/>
      </Sequence>
    ))}

    {[53,89,131,197,251,278,326,380,437].map((at)=>(
      <Sequence key={'whoosh-'+at} from={at}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.16}/>
      </Sequence>
    ))}

    {[18,72,105,222,264,301,349].map((at)=>(
      <Sequence key={'click-'+at} from={at}>
        <Audio src={staticFile('audio/click.wav')} volume={0.22}/>
      </Sequence>
    ))}

    <Sequence from={90}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.34}/>
    </Sequence>
    <Sequence from={437}>
      <Audio src={staticFile('audio/riser.wav')} volume={0.20}/>
    </Sequence>
    <Sequence from={438}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.36}/>
    </Sequence>
  </>
);
