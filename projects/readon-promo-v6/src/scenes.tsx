import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  ChoiceCard,
  DeskBackdrop,
  HandThumb,
  HeadlineLines,
  PhoneOnDesk,
  SmallText,
} from './components';
import {C, DISPLAY_FONT, SHOTS, UI_FONT} from './style';

export const HookScene: React.FC = () => (
  <AbsoluteFill>
    <DeskBackdrop />
    <div style={{position:'absolute',left:64,top:200,zIndex:20}}>
      <div style={{
        display:'inline-flex',padding:'10px 16px',borderRadius:999,
        backgroundColor:C.cyan,color:C.dark,fontFamily:UI_FONT,
        fontWeight:700,fontSize:29
      }}>恐竜好き？</div>
      <div style={{height:28}}/>
      <HeadlineLines lines={['これ、意味','わかる？']} size={92}/>
    </div>
    <PhoneOnDesk src={SHOTS.english} top={590} left={320} width={650} rotate={5} cropTop={-6}/>
    <HandThumb x={735} y={1250} rotate={-18} delay={6}/>
  </AbsoluteFill>
);

export const QuizScene: React.FC = () => {
  const frame=useCurrentFrame();
  const active=frame>26;
  return (
    <AbsoluteFill>
      <DeskBackdrop />
      <div style={{position:'absolute',left:58,top:150,zIndex:20}}>
        <HeadlineLines lines={['survived は','どれ？']} size={90}/>
      </div>
      <div style={{
        position:'absolute',left:58,right:180,top:560,display:'flex',
        flexDirection:'column',gap:24,zIndex:20
      }}>
        <ChoiceCard delay={0}>① 絶滅した</ChoiceCard>
        <ChoiceCard delay={5} active={active}>② 生き残った</ChoiceCard>
        <ChoiceCard delay={10}>③ 進化した</ChoiceCard>
      </div>
      <HandThumb x={710} y={1020} rotate={-28} tap delay={12}/>
      <div style={{
        position:'absolute',right:115,top:265,width:110,height:110,borderRadius:'50%',
        backgroundColor:C.white,border:'5px solid '+C.cyan,display:'grid',
        placeItems:'center',fontFamily:DISPLAY_FONT,fontWeight:900,fontSize:58,
        color:C.dark,boxShadow:'0 12px 28px rgba(72,56,40,0.12)'
      }}>{frame<18?'2':'1'}</div>
    </AbsoluteFill>
  );
};

export const AnswerScene: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=spring({frame,fps,config:{damping:15,stiffness:190,mass:0.58}});
  return (
    <AbsoluteFill>
      <DeskBackdrop />
      <div style={{position:'absolute',left:64,top:230,zIndex:20}}>
        <SmallText size={36} color="#176837">正解</SmallText>
        <div style={{height:14}}/>
        <div style={{
          fontFamily:DISPLAY_FONT,fontSize:105,fontWeight:900,color:'#176837',
          letterSpacing:'-0.04em',opacity:p,scale:interpolate(p,[0,1],[0.84,1])
        }}>生き残った</div>
      </div>
      <div style={{
        position:'absolute',left:64,right:180,top:620,padding:'36px 38px',
        borderRadius:32,backgroundColor:'rgba(255,255,255,0.90)',
        boxShadow:'0 20px 50px rgba(72,56,40,0.13)'
      }}>
        <div style={{
          fontFamily:DISPLAY_FONT,fontWeight:700,fontSize:52,lineHeight:1.35,color:C.ink
        }}>
          dinosaurs <span style={{fontWeight:900,color:'#176837'}}>survived</span>
        </div>
        <div style={{height:18}}/>
        <SmallText size={42} color={C.muted}>恐竜の一部は「生き残った」</SmallText>
      </div>
      <div style={{
        position:'absolute',left:135,top:1140,fontSize:150,rotate:'-8deg',
        filter:'drop-shadow(0 18px 20px rgba(50,40,32,0.12))'
      }}>🦖</div>
      <div style={{
        position:'absolute',left:390,top:1200,fontFamily:DISPLAY_FONT,
        fontWeight:900,fontSize:76,color:C.muted
      }}>→</div>
      <div style={{
        position:'absolute',left:530,top:1120,fontSize:130,rotate:'8deg',
        filter:'drop-shadow(0 18px 20px rgba(50,40,32,0.12))'
      }}>🐦</div>
    </AbsoluteFill>
  );
};

export const BridgeScene: React.FC = () => (
  <AbsoluteFill>
    <DeskBackdrop />
    <div style={{position:'absolute',left:60,top:330,zIndex:20}}>
      <HeadlineLines lines={['好きな話なら、','続きが気になる。']} size={90}/>
      <div style={{height:28}}/>
      <SmallText size={46} color={C.ink}>その「好き」を、そのまま英語長文に。</SmallText>
    </div>
    <PhoneOnDesk src={SHOTS.home} top={900} left={330} width={620} rotate={4}/>
    <HandThumb x={720} y={1280} rotate={-18} delay={5}/>
  </AbsoluteFill>
);

export const AppScene: React.FC = () => {
  const frame=useCurrentFrame();
  const chips=[
    {label:'英検2級',color:C.cyan,at:18},
    {label:'400語',color:C.gold,at:25},
    {label:'ギャル解説',color:C.coral,at:32},
  ];
  return (
    <AbsoluteFill>
      <DeskBackdrop />
      <div style={{position:'absolute',left:58,top:160,zIndex:20}}>
        <div style={{
          fontFamily:UI_FONT,fontSize:27,fontWeight:700,color:C.muted,marginBottom:10
        }}>READON</div>
        <HeadlineLines lines={['好きなテーマを','自分用に設定。']} size={84}/>
      </div>
      <PhoneOnDesk src={SHOTS.topic} top={535} left={290} width={660} rotate={3} cropTop={-2}/>
      <HandThumb x={730} y={1240} rotate={-20} tap delay={18}/>
      <div style={{
        position:'absolute',left:68,right:155,bottom:95,display:'flex',
        gap:14,flexWrap:'wrap',zIndex:30
      }}>
        {chips.map((chip)=>(
          <div key={chip.label} style={{
            opacity:interpolate(frame,[chip.at,chip.at+7],[0,1],{
              extrapolateLeft:'clamp',extrapolateRight:'clamp'
            }),
            translate:'0 '+interpolate(frame,[chip.at,chip.at+7],[16,0],{
              extrapolateLeft:'clamp',extrapolateRight:'clamp'
            })+'px',
            padding:'12px 18px',borderRadius:999,backgroundColor:chip.color,
            color:C.dark,fontFamily:UI_FONT,fontSize:33,fontWeight:700,
            boxShadow:'0 10px 26px rgba(72,56,40,0.10)'
          }}>{chip.label}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const ReaderScene: React.FC<{
  src:string; mode:'read'|'translate'|'explain';
}> = ({src,mode}) => {
  const labels={
    read:['まず、読む。'],
    translate:['分からなければ、','訳。'],
    explain:['もっと知りたければ、','解説。'],
  } as const;
  const accent=mode==='translate'?C.cyan:mode==='explain'?C.gold:C.coral;
  return (
    <AbsoluteFill>
      <DeskBackdrop />
      <div style={{position:'absolute',left:58,top:165,zIndex:20}}>
        <HeadlineLines lines={[...labels[mode]]} size={86}/>
        <div style={{
          marginTop:18,display:'inline-flex',padding:'9px 15px',borderRadius:999,
          backgroundColor:accent,color:C.dark,fontFamily:UI_FONT,fontSize:28,fontWeight:700
        }}>
          {mode==='read'?'READ':mode==='translate'?'訳 ON':'解説 ON'}
        </div>
      </div>
      <PhoneOnDesk src={src} top={500} left={278} width={675} rotate={2.5} cropTop={-3}/>
      <HandThumb
        x={720}
        y={1180}
        rotate={-22}
        tap={mode!=='read'}
        delay={mode==='read'?5:14}
      />
    </AbsoluteFill>
  );
};

export const PayoffScene: React.FC = () => (
  <AbsoluteFill>
    <DeskBackdrop />
    <div style={{position:'absolute',left:60,top:420,zIndex:20}}>
      <HeadlineLines lines={['好きな話だから、','読みたくなる。']} size={92}/>
      <div style={{height:26}}/>
      <SmallText size={46} color={C.ink}>英語を「興味ある話」に変える。</SmallText>
    </div>
    <PhoneOnDesk src={SHOTS.explanation} top={930} left={340} width={600} rotate={4}/>
  </AbsoluteFill>
);

export const CloseScene: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=spring({frame,fps,config:{damping:18,stiffness:130,mass:0.72}});
  return (
    <AbsoluteFill>
      <DeskBackdrop />
      <div style={{
        position:'absolute',left:70,top:300,opacity:p,
        translate:'0 '+interpolate(p,[0,1],[44,0])+'px',zIndex:20
      }}>
        <div style={{
          fontFamily:UI_FONT,color:C.muted,fontSize:29,fontWeight:700,letterSpacing:'0.10em'
        }}>リードン</div>
        <div style={{
          marginTop:4,fontFamily:'Arial, sans-serif',color:C.dark,fontSize:148,
          fontWeight:900,lineHeight:0.96,letterSpacing:'-0.055em'
        }}>READON</div>
        <div style={{height:55}}/>
        <HeadlineLines lines={['好きからつくる、','英語長文。']} size={88}/>
      </div>
      <PhoneOnDesk src={SHOTS.home} top={1040} left={450} width={500} rotate={8}/>
      <HandThumb x={760} y={1320} rotate={-18} delay={8}/>
    </AbsoluteFill>
  );
};
