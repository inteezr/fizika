/* Massa va energiya: E = mc² */
SIMS.push({id:'emc2',cat:'rel',title:'Relyativistik dinamika va E = mc²',short:'E = mc²',
  sub:'Jismni qanchalik ko‘p tezlatsak ham, uning tezligi yorug‘lik tezligiga yetmaydi: energiya ortadi, tezlik esa c ga asimptotik yaqinlashadi. Har qanday massa ulkan energiyaga ekvivalent.',
  formula:`<span><i>E</i><sub>0</sub> = <i>mc</i><sup>2</sup></span><span class="alt"><i>E</i> = ${fr('<i>mc</i><sup>2</sup>','√(1 − <i>v</i><sup>2</sup>/<i>c</i><sup>2</sup>)')} &nbsp; <i>p</i> = <i>γmv</i></span>`,
  text:['Zarraga doimiy kuch ta’sir qilmoqda. Nyuton mexanikasi bo‘yicha (kulrang chiziq) tezlik cheksiz o‘sishi kerak edi. Aslida (qizil chiziq) impuls o‘sadi, tezlik esa c ga yaqinlashib, undan oshmaydi.','Tinch turgan jism ham energiyaga ega: E₀ = mc². Atigi 1 gramm massaga mos energiya 90 trillion joulga — kichik bir shaharning bir kunlik elektr iste’moliga teng.'],
  legend:[['m','tinchlikdagi massa'],['c','yorug‘lik tezligi'],['E₀','tinchlikdagi energiya'],['γ','Lorens omili']],
  tries:['Grafikda tezlik c ga yetmasligini kuzating.','Massani 1 g qiling va unga mos energiyani o‘qing.','Tezlik 0,5c bo‘lganda klassik va relyativistik grafiklar farqini toping.'],
  params:[{id:'m',label:'Massa (E = mc² uchun)',sym:'m',min:0.001,max:1,step:0.001,val:0.001,unit:'kg',d:3},{id:'F',label:'Tezlatish jadalligi',sym:'',min:0.1,max:1,step:0.05,val:0.4,unit:'',d:2,reset:1}],
  init:()=>({t:0,hold:0}),step(S,P,dt){if(S.t<10)S.t+=dt;else{S.hold+=dt;if(S.hold>1.5){S.t=0;S.hold=0;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const u=P.F*S.t,v=u/Math.sqrt(1+u*u),vc=u,ty=H*0.2,tl=30,tr=W-30;S.g={v,ty,tl,tr};
    line(c,tl,ty,tr,ty,C.line,6);line(c,tr,ty-20,tr,ty+20,C.red,2,[4,3]);txt(c,'c',tr,ty-28,C.red,{align:'center',font:MATH});const px=tl+v*(tr-tl);disk(c,px,ty,8,C.accent);
    if(vc<1.2)disk(c,tl+Math.min(vc,1.2)*(tr-tl),ty,5,rgba('muted',0.6));txt(c,'klassik',tl+Math.min(vc,1.15)*(tr-tl),ty+20,C.muted,{align:'center',font:SMALL});
    const gx=50,gr=W*0.62,gt=H*0.38,gb=H-30,X=t=>gx+t/10*(gr-gx),Y=b=>gb-b/1.5*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);line(c,gx,Y(1),gr,Y(1),C.red,1.2,[5,4]);txt(c,'v = c',gr,Y(1)-8,C.red,{align:'right',font:SMALL});txt(c,'v/c',gx+6,gt-8,C.muted);txt(c,'t',gr,gb+14,C.muted,{align:'right',font:MATH});
    c.strokeStyle=rgba('muted',0.7);c.lineWidth=2;c.beginPath();c.moveTo(X(0),Y(0));c.lineTo(X(Math.min(10,1.5/P.F)),Y(Math.min(1.5,P.F*10)));c.stroke();
    c.strokeStyle=C.red;c.lineWidth=2.5;c.beginPath();for(let i=0;i<=100;i++){const t=S.t*i/100,uu=P.F*t;i?c.lineTo(X(t),Y(uu/Math.sqrt(1+uu*uu))):c.moveTo(X(t),Y(0));}c.stroke();
    const E=P.m*9e16,bx=W*0.7,bw=W*0.25,by=H*0.45;txt(c,'E₀ = mc²',bx,by,C.warm,{font:'600 18px "STIX Two Text", serif'});txt(c,fmt(E/1e12,1)+' TJ',bx,by+30,C.ink,{font:'600 22px "IBM Plex Mono", monospace'});txt(c,'≈ '+fmt(E/4.184e12,1)+' kt trotil',bx,by+58,C.muted);txt(c,'≈ '+fmt(E/3.6e6/1e6,1)+' mln kWh',bx,by+80,C.muted);
  },
  read:(S,P)=>{const u=P.F*S.t,v=u/Math.sqrt(1+u*u),g=Math.sqrt(1+u*u);return[['Tezlik v/c',fmt(v,4)],['Lorens omili γ',fmt(g,2)],['Kinetik energiya / mc²',fmt(g-1,2)],['E₀ = mc²',fmt(P.m*9e16,3)+' J']];}
});
