import React from 'react';
import {Composition} from 'remotion';
import {ReadonPromoV2, type ReadonPromoV2Props} from './ReadonPromoV2';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ReadonPromoV2"
      component={ReadonPromoV2}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        topic: '恐竜の絶滅と生き残り',
        cta: '好きなことから、英語長文を自分の教材に。',
      } satisfies ReadonPromoV2Props}
    />
  );
};
