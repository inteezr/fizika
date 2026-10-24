/* Vazn va vaznsizlik (lift) */
SIMS.push({id:'lift',cat:'din',title:'Jism vazni, ortiqcha yuk va vaznsizlik',short:'P = m(g + a)',
  sub:'Vazn — jismning tayanchga bosim kuchi. Lift yuqoriga tezlanish bilan harakatlansa vazn ortadi, pastga tezlansa kamayadi, erkin tushishda nolga teng bo‘ladi.',
  formula:`<span><i>P</i> = <i>m</i>(<i>g</i> + <i>a</i>)</span><span class="alt"><i>a</i> = −<i>g</i> ⇒ <i>P</i> = 0 (vaznsizlik)</span>`,
  text:['Tarozi aslida sizning massangizni emas, tayanchga bosim kuchingizni o‘lchaydi. Lift yuqoriga tezlanganda pol sizni qo‘shimcha itarishi kerak, shuning uchun tarozi ko‘proq ko‘rsatadi.','Agar lift pastga g tezlanish bilan tushsa, siz va tarozi birga erkin tushasiz: bosim yo‘qoladi. Kosmonavtlar orbitada aynan shu holatda — ular Yerga doimiy «tushib» turadi.'],
  legend:[['P','vazn, N'],['m','massa, kg'],['a','liftning tezlanishi (yuqoriga +), m/s²'],['g','9,8 m/s²']],
  tries:['a = +5 m/s² qiling: tarozi massangizdan ko‘proq ko‘rsatadi.','a = −9,8 m/s² qiling: vaznsizlik — odam polga bosmaydi.','Lift tekis harakatlanganda (a = 0) vazn tinch holatdagiga tengligini tekshiring.'],
  params:[{id:'m',label:'Odam massasi',sym:'m',min:20,max:120,step:1,val:60,unit:'kg',d:0},{id:'a',label:'Lift tezlanishi',sym:'a',min:-9.8,max:10,step:0.1,val:3,unit:'m/s²',d:1}],
  init:()=>({v:0,y:0,fl:0}),
  step(S,P,dt){S.v+=P.a*dt;if(Math.abs(S.v)>8)S.v=0;S.y+=S.v*dt;S.fl+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const Pw=P.m*(9.8+P.a),cx=W*0.33,eh=H*0.72,ew=Math.min(W*0.3,220),et=(H-eh)/2,eb=et+eh;S.g={cx,ew,eh,et,eb};
    const fh=90;c.fillStyle=rgba('muted',0.12);c.fillRect(cx-ew/2-30,0,ew+60,H);for(let i=-2;i<H/fh+2;i++){const y=((i*fh+S.y*30)%(fh*7)+fh*7)%(fh*7)-fh;line(c,cx-ew/2-30,y,cx-ew/2-4,y,C.line,2);line(c,cx+ew/2+4,y,cx+ew/2+30,y,C.line,2);}
    c.strokeStyle=C.ink;c.lineWidth=3;c.strokeRect(cx-ew/2,et,ew,eh);line(c,cx,0,cx,et,C.muted,2);
    const sy=eb-14,comp=clamp(Pw/1500,0,1)*8;c.fillStyle=C.ink;c.fillRect(cx-40,sy,80,12);txt(c,fmt(Math.max(0,Pw)/9.8,1)+' kg',cx,sy+6,C.bg,{align:'center',font:SMALL});
    const fy=sy-comp,float=Pw<=1?Math.sin(S.fl*2)*8+14:0,hy=fy-float;line(c,cx-10,hy,cx-6,hy-50,C.ink,4);line(c,cx+10,hy,cx+6,hy-50,C.ink,4);c.fillStyle=C.accent;rrect(c,cx-16,hy-100,32,54,10);c.fill();disk(c,cx,hy-114,13,C.ink);
    line(c,cx-16,hy-90,cx-30,hy-62+(Pw<=1?-30:0),C.ink,4);line(c,cx+16,hy-90,cx+30,hy-62+(Pw<=1?-30:0),C.ink,4);
    if(Math.abs(P.a)>0.05)arrow(c,cx+ew/2-26,et+eh/2,cx+ew/2-26,et+eh/2-P.a*6,C.warm,3,'a');if(Math.abs(S.v)>0.1)arrow(c,cx-ew/2+26,et+eh/2,cx-ew/2+26,et+eh/2-S.v*6,C.green,2.5,'v');
    const gx=W*0.62,gw=W*0.3,gy=H*0.2,gh=H*0.6,mx=P.m*2*9.8;c.fillStyle=rgba('muted',0.2);c.fillRect(gx,gy,gw,gh);const bh=clamp(Pw/mx,0,1)*gh,b0=P.m*9.8/mx*gh;c.fillStyle=Pw<=1?C.violet:Pw>P.m*9.8+1?C.red:C.green;c.fillRect(gx,gy+gh-bh,gw,bh);line(c,gx-6,gy+gh-b0,gx+gw+6,gy+gh-b0,C.ink,1.5,[5,4]);txt(c,'mg',gx+gw+10,gy+gh-b0,C.muted,{font:MATH});txt(c,'Vazn P',gx,gy-12,C.muted);
  },
  read:(S,P)=>{const Pw=P.m*(9.8+P.a);return[['Vazn P',fmt(Math.max(0,Pw),0)+' N'],['Tarozi ko‘rsatishi',fmt(Math.max(0,Pw)/9.8,1)+' kg'],['Og‘irlik kuchi mg',fmt(P.m*9.8,0)+' N'],['Holat',Pw<=1?'vaznsizlik':P.a>0.05?'ortiqcha yuk':P.a<-0.05?'vazn kamaygan':'odatiy vazn']];}
});
