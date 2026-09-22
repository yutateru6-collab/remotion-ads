import React from 'react';
import {Composition} from 'remotion';
import {ReadonPromoV3, type ReadonPromoV3Props} from './ReadonPromoV3';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ReadonPromoV3"
    component={ReadonPromoV3}
    durationInFrames={660}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      topic: '恐竜の絶滅と生き残り',
      cta: '好きなことから、英語長文を自分の教材に。',
    } satisfies ReadonPromoV3Props}
  />
);
