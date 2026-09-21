import React from 'react';
import {Composition} from 'remotion';
import {ReadonPromo, type ReadonPromoProps} from './ReadonPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ReadonPromo"
      component={ReadonPromo}
      durationInFrames={600}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        hook: '英語の長文、\n興味ない話だとキツくない？',
        topic: '恐竜の絶滅と生き残り',
        cta: '好きなテーマで、自分だけの英語教材を。',
      }}
    />
  );
};
