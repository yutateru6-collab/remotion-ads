import React from 'react';
import {Composition} from 'remotion';
import {ReadonPromoV6} from './ReadonPromoV6';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ReadonPromoV6"
    component={ReadonPromoV6}
    durationInFrames={516}
    fps={30}
    width={1080}
    height={1920}
  />
);
