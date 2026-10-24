/* Elastiklik kuchi: Guk qonuni */
SIMS.push({id:'guk',cat:'din',title:'Elastiklik kuchi va Guk qonuni',short:'F = kx',
  sub:'Prujinaning cho‘zilishi unga ta’sir etayotgan kuchga to‘g‘ri proporsional. Ikki prujina ketma-ket ulansa yumshoqroq, parallel ulansa qattiqroq bo‘ladi.',
  formula:`<span><i>F</i><sub>el</sub> = <i>k</i>|<i>x</i>|</span><span class="alt"><i>k</i><sub>ket</sub> = ${fr('<i>k</i>','2')}, &nbsp;<i>k</i><sub>par</sub> = 2<i>k</i></span>`,
  text:['Yuk osilganda prujina cho‘ziladi va elastiklik kuchi og‘irlik kuchini muvozanatlagan joyda to‘xtaydi: kx = mg. Bundan cho‘zilish x = mg/k. Yukni ikki marta oshirsangiz, cho‘zilish ham ikki marta ortadi.','Bir xil ikki prujina ketma-ket ulansa, har biri butun kuchni sezadi va umumiy cho‘zilish ikki marta katta bo‘ladi (k/2). Parallel ulansa, kuch ikkiga bo‘linadi va cho‘zilish ikki marta kichik bo‘ladi (2k).'],
  legend:[['F','elastiklik kuchi, N'],['k','bikrlik, N/m'],['x','cho‘zilish (deformatsiya), m'],['m','yuk massasi, kg']],
  tries:['Massani ikki marta oshiring: grafikdagi nuqta to‘g‘ri chiziq bo‘ylab ikki marta uzoqlashadi.','Ulanish turini almashtirib, cho‘zilishni solishtiring.','Yuk avval tebranadi, keyin muvozanat holatida to‘xtaydi (havo qarshiligi).'],
  params:[{id:'m',label:'Yuk massasi',sym:'m',min:0.1,max:2,step:0.1,val:0.8,unit:'kg',d:1},{id:'k',label:'Bitta prujina bikrligi',sym:'k',min:20,max:200,step:5,val:60,unit:'N/m',d:0},{id:'mode',label:'Ulanish',choices:[[0,'Bitta'],[1,'Ketma-ket'],[2,'Parallel']],val:0}],
  init:()=>({x:0,v:0}),
  step(S,P,dt){const k=P.mode===1?P.k/2:P.mode===2?P.k*2:P.k,n=10,h=dt/n;for(let i=0;i<n;i++){const a=9.8-k/P.m*S.x-1.6*S.v;S.v+=a*h;S.x+=S.v*h;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const k=P.mode===1?P.k/2:P.mode===2?P.k*2:P.k,top=34,cx=W*0.26,sc=(H*0.6)/0.6,L0=H*0.2,ds=H*0.3/(39.2/P.k),L=L0+S.x*ds,bs=30+P.m*14;S.g={cx,top,L0,sc:ds};
    c.fillStyle=rgba('muted',0.35);c.fillRect(cx-90,top-12,180,12);line(c,cx-90,top,cx+90,top,C.ink,2);
    let bot;if(P.mode===2){[-24,24].forEach(d=>springLine(c,cx+d,top,cx+d,top+L,12,10,C.ink,2));line(c,cx-34,top+L,cx+34,top+L,C.ink,4);bot=top+L;}
    else if(P.mode===1){const jy=top+L0/2+S.x*ds/2;bot=top+L;springLine(c,cx,top,cx,jy,8,10,C.ink,2);disk(c,cx,jy,4,C.ink);springLine(c,cx,jy,cx,bot,8,10,C.ink,2);}
    else{springLine(c,cx,top,cx,top+L,14,11,C.ink,2);bot=top+L;}
    line(c,cx,bot,cx,bot+10,C.ink,2);c.fillStyle=C.accent;rrect(c,cx-bs/2,bot+10,bs,bs,5);c.fill();txt(c,fmt(P.m,1)+' kg',cx,bot+10+bs/2,C.onaccent,{align:'center',font:SMALL});
    const y0=top+L0;line(c,cx+60,y0,cx+110,y0,C.muted,1,[3,3]);line(c,cx+60,bot,cx+110,bot,C.muted,1,[3,3]);if(S.x>0.002){arrow(c,cx+100,y0,cx+100,bot,C.warm,2,'x');}
    const kf=Math.min(1.8,H*0.18/(P.m*9.8));arrow(c,cx-bs/2-14,bot+10+bs/2,cx-bs/2-14,bot+10+bs/2+P.m*9.8*kf*4,C.red,2.5,'mg');arrow(c,cx+bs/2+14,bot+10+bs/2,cx+bs/2+14,bot+10+bs/2-k*S.x*kf*4,C.green,2.5,'F el');
    const gx=W*0.55,gr=W-24,gt=H*0.14,gb=H*0.84,xm=39.2/P.k*1.05,Fm=20,X=x=>gx+x/xm*(gr-gx),Y=F=>gb-F/Fm*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'F, N',gx+6,gt-8,C.muted);txt(c,'x, m',gr,gb+14,C.muted,{align:'right'});
    [[P.k/2,'k/2'],[P.k,'k'],[P.k*2,'2k']].forEach(([kk,l])=>{const on=Math.abs(kk-k)<1e-9;const xe=Math.min(xm,Fm/kk);line(c,X(0),Y(0),X(xe),Y(kk*xe),on?C.accent:rgba('muted',0.5),on?2.5:1.2);txt(c,l,X(xe)+4,Y(kk*xe)-6,on?C.accent:C.muted,{font:SMALL});});
    disk(c,X(Math.min(xm,Math.max(0,S.x))),Y(k*Math.max(0,S.x)),6,C.red);
  },
  read:(S,P)=>{const k=P.mode===1?P.k/2:P.mode===2?P.k*2:P.k;return[['Umumiy bikrlik',fmt(k,1)+' N/m'],['Muvozanatdagi cho‘zilish',fmt(P.m*9.8/k*100,1)+' sm'],['Hozirgi cho‘zilish',fmt(S.x*100,1)+' sm'],['Elastiklik kuchi',fmt(k*S.x,2)+' N']];}
});
