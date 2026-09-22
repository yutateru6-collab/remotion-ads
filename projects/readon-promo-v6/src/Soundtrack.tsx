import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence, staticFile} from 'remotion';

const voices = [
  {from:0,duration:48,file:'vo-hook.mp3'},
  {from:48,duration:36,file:'vo-quiz.mp3'},
  {from:84,duration:48,file:'vo-answer.mp3'},
  {from:132,duration:60,file:'vo-bridge.mp3'},
  {from:192,duration:54,file:'vo-app.mp3'},
  {from:246,duration:27,file:'vo-read.mp3'},
  {from:273,duration:48,file:'vo-translate.mp3'},
  {from:321,duration:66,file:'vo-explain.mp3'},
  {from:387,duration:45,file:'vo-payoff.mp3'},
  {from:432,duration:84,file:'vo-close.mp3'},
] as const;

export const Soundtrack: React.FC = () => (
  <>
    <Audio src={staticFile('audio/bgm.wav')} volume={0.055}/>

    {voices.map((voice)=>(
      <Sequence key={voice.file} from={voice.from} durationInFrames={voice.duration}>
        <Audio src={staticFile('audio/'+voice.file)} volume={1.12}/>
      </Sequence>
    ))}

    {[47,83,131,191,245,272,320,386,431].map((at)=>(
      <Sequence key={'whoosh-'+at} from={at}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.16}/>
      </Sequence>
    ))}

    {[16,66,101,214,258,297,346].map((at)=>(
      <Sequence key={'click-'+at} from={at}>
        <Audio src={staticFile('audio/click.wav')} volume={0.22}/>
      </Sequence>
    ))}

    <Sequence from={84}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.34}/>
    </Sequence>
    <Sequence from={431}>
      <Audio src={staticFile('audio/riser.wav')} volume={0.20}/>
    </Sequence>
    <Sequence from={432}>
      <Audio src={staticFile('audio/impact.wav')} volume={0.36}/>
    </Sequence>
  </>
);
