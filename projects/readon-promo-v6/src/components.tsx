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
import {C, DISPLAY_FONT, UI_FONT} from './style';

export const RetentionBar: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      position:'absolute', inset:'0 0 auto 0', height:8,
      backgroundColor:'rgba(23,32,40,0.08)', zIndex:100
    }}>
      <div style={{
        width: interpolate(frame,[0,515],[0,1080],{
          extrapolateLeft:'clamp', extrapolateRight:'clamp'
        }),
        height:'100%',
        background:'linear-gradient(90deg, ' + C.cyan + ', ' + C.gold + ')'
      }}/>
    </div>
  );
};

export const HeadlineLines: React.FC<{
  lines:string[]; size?:number; align?:'left'|'center'; color?:string;
}> = ({lines,size=88,align='left',color=C.ink}) => (
  <div style={{
    fontFamily:DISPLAY_FONT,fontWeight:900,fontSize:size,lineHeight:1.13,
    letterSpacing:'-0.035em',color,textAlign:align,wordBreak:'keep-all',
    lineBreak:'strict',fontFeatureSettings:'"palt" 1'
  }}>
    {lines.map((line)=><div key={line} style={{whiteSpace:'nowrap'}}>{line}</div>)}
  </div>
);

export const SmallText: React.FC<{
  children:React.ReactNode; size?:number; color?:string;
}> = ({children,size=42,color=C.ink}) => (
  <div style={{
    fontFamily:UI_FONT,fontWeight:700,fontSize:size,lineHeight:1.35,color,
    wordBreak:'keep-all'
  }}>{children}</div>
);

export const DeskBackdrop: React.FC<{darken?:number}> = ({darken=0}) => (
  <AbsoluteFill style={{
    background:'linear-gradient(145deg, #F7F2EC 0%, #EEE5DB 54%, #E3D7C8 100%)',
    overflow:'hidden'
  }}>
    <div style={{
      position:'absolute',top:74,left:-40,width:780,height:120,borderRadius:26,
      background:'linear-gradient(180deg,#D7DADF,#BFC5CB)',
      boxShadow:'0 16px 50px rgba(22,30,36,0.14)',rotate:'-3deg'
    }}>
      {Array.from({length:12},(_,i)=><span key={i} style={{
        position:'absolute',left:42+(i%6)*114,top:30+Math.floor(i/6)*38,
        width:80,height:22,borderRadius:6,backgroundColor:'rgba(255,255,255,0.55)'
      }}/>)}
    </div>

    <div style={{
      position:'absolute',left:46,bottom:88,width:360,height:460,borderRadius:24,
      backgroundColor:'#FFFDFC',boxShadow:'0 24px 70px rgba(71,55,38,0.16)',
      rotate:'-7deg'
    }}>
      {Array.from({length:9},(_,i)=><span key={i} style={{
        position:'absolute',left:36,right:36,top:60+i*40,height:2,
        backgroundColor:'rgba(76,91,101,0.10)'
      }}/>)}
      <div style={{
        position:'absolute',top:45,left:34,fontFamily:DISPLAY_FONT,fontSize:30,
        fontWeight:900,color:'#7E6C5A'
      }}>STUDY NOTES</div>
    </div>

    <div style={{
      position:'absolute',right:30,top:210,width:180,height:180,borderRadius:'50%',
      backgroundColor:'#F6F3EF',boxShadow:'0 20px 60px rgba(71,55,38,0.16)'
    }}>
      <div style={{
        position:'absolute',inset:28,borderRadius:'50%',
        background:'radial-gradient(circle at 42% 36%, #C38B61, #895A3C 62%, #6C432D)'
      }}/>
      <div style={{
        position:'absolute',right:-46,top:54,width:68,height:66,
        border:'18px solid #F6F3EF',borderLeft:0,borderRadius:'0 38px 38px 0'
      }}/>
    </div>

    {darken>0?<AbsoluteFill style={{backgroundColor:'rgba(7,19,27,'+darken+')'}}/>:null}
  </AbsoluteFill>
);

export const PhoneOnDesk: React.FC<{
  src:string; top?:number; left?:number; width?:number; rotate?:number;
  cropTop?:number; cropScale?:number; brightness?:number;
}> = ({
  src,top=440,left=270,width=630,rotate=3,cropTop=0,cropScale=1,brightness=1
}) => {
  const frame=useCurrentFrame();
  const push=interpolate(frame,[0,65],[1,1.022],{
    extrapolateLeft:'clamp',extrapolateRight:'clamp'
  });
  const height=width*(852/393);
  return (
    <div style={{
      position:'absolute',left,top,width,height,borderRadius:62,
      backgroundColor:'#111820',padding:14,
      boxShadow:'0 42px 80px rgba(43,34,26,0.28), 0 8px 24px rgba(43,34,26,0.18)',
      rotate:rotate+'deg',scale:push,overflow:'hidden'
    }}>
      <div style={{
        position:'absolute',left:'50%',top:15,width:144,height:34,borderRadius:999,
        backgroundColor:'#0A0F14',translate:'-50% 0',zIndex:4
      }}/>
      <div style={{
        width:'100%',height:'100%',borderRadius:50,overflow:'hidden',
        backgroundColor:'#0A1721',position:'relative'
      }}>
        <Img src={staticFile(src)} style={{
          position:'absolute',width:'100%',height:'auto',left:0,top:cropTop,
          scale:cropScale,transformOrigin:'50% 18%',
          filter:'brightness('+brightness+')'
        }}/>
      </div>
    </div>
  );
};

export const HandThumb: React.FC<{
  x?:number; y?:number; rotate?:number; tap?:boolean; delay?:number;
}> = ({x=720,y=1320,rotate=-18,tap=false,delay=0}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=spring({frame:frame-delay,fps,config:{damping:20,stiffness:150,mass:0.72}});
  const tapOffset=tap&&frame>delay+10&&frame<delay+22
    ? interpolate(frame,[delay+10,delay+16,delay+22],[0,-20,0]):0;
  const skin='linear-gradient(160deg,#F0C6A8 0%,#DFA47C 60%,#C9825E 100%)';

  return (
    <div style={{
      position:'absolute',left:x,top:y,width:330,height:520,rotate:rotate+'deg',
      opacity:p,
      translate:interpolate(p,[0,1],[115,0])+'px '+
        (interpolate(p,[0,1],[110,0])+tapOffset)+'px',
      zIndex:12,pointerEvents:'none',
      filter:'drop-shadow(0 18px 20px rgba(76,49,32,0.12))'
    }}>
      <div style={{
        position:'absolute',left:130,top:190,width:160,height:285,
        borderRadius:'46% 48% 52% 50%',background:skin
      }}/>
      <div style={{
        position:'absolute',left:34,top:58,width:82,height:260,borderRadius:999,
        background:skin,rotate:'-28deg',transformOrigin:'80% 92%'
      }}>
        <div style={{
          position:'absolute',left:18,top:18,width:46,height:28,borderRadius:'50%',
          backgroundColor:'#F8D9C6',opacity:0.92
        }}/>
      </div>
      <div style={{
        position:'absolute',left:115,top:94,width:76,height:224,borderRadius:999,
        background:skin,rotate:'-9deg',transformOrigin:'55% 94%'
      }}>
        <div style={{
          position:'absolute',left:16,top:16,width:43,height:25,borderRadius:'50%',
          backgroundColor:'#F7D7C4',opacity:0.90
        }}/>
      </div>
      <div style={{
        position:'absolute',left:184,top:126,width:68,height:185,borderRadius:999,
        background:skin,rotate:'8deg',transformOrigin:'45% 94%'
      }}/>
      <div style={{
        position:'absolute',left:82,top:245,width:158,height:76,borderRadius:999,
        background:skin,rotate:'-38deg',transformOrigin:'88% 50%'
      }}/>
      <div style={{
        position:'absolute',left:146,top:268,width:88,height:2,
        backgroundColor:'rgba(130,76,50,0.20)',rotate:'-4deg'
      }}/>
      <div style={{
        position:'absolute',left:152,top:310,width:78,height:2,
        backgroundColor:'rgba(130,76,50,0.16)',rotate:'5deg'
      }}/>
    </div>
  );
};

export const ChoiceCard: React.FC<{
  children:React.ReactNode; delay?:number; active?:boolean;
}> = ({children,delay=0,active=false}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=spring({frame:frame-delay,fps,config:{damping:18,stiffness:180,mass:0.62}});
  return (
    <div style={{
      padding:'26px 28px',borderRadius:26,
      border:active?'4px solid '+C.green:'2px solid rgba(23,32,40,0.10)',
      backgroundColor:active?'#E9F9EF':'rgba(255,255,255,0.88)',
      boxShadow:'0 16px 36px rgba(72,56,40,0.11)',
      fontFamily:UI_FONT,fontWeight:700,fontSize:48,
      color:active?'#176837':C.ink,opacity:p,
      translate:'0 '+interpolate(p,[0,1],[28,0])+'px',
      scale:interpolate(p,[0,1],[0.94,1])
    }}>{children}</div>
  );
};
