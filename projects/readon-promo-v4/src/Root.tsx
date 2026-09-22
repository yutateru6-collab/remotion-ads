import React from 'react';
import {Composition} from 'remotion';
import {ReadonPromoV4, type ReadonPromoV4Props} from './ReadonPromoV4';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ReadonPromoV4"
    component={ReadonPromoV4}
    durationInFrames={495}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      topic: '恐竜の絶滅と生き残り',
    } satisfies ReadonPromoV4Props}
  />
);
