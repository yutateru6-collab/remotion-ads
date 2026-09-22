import React from 'react';
import {Composition} from 'remotion';
import {ReadonPromoV5} from './ReadonPromoV5';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ReadonPromoV5"
    component={ReadonPromoV5}
    durationInFrames={468}
    fps={30}
    width={1080}
    height={1920}
  />
);
