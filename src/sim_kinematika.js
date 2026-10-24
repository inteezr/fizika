/* Tekis tezlanuvchan harakat */
SIMS.push({id:'kinematika',cat:'kin',title:'Tekis tezlanuvchan harakat',short:'x = v₀t + at²/2',
  sub:'Tezlanish o‘zgarmas bo‘lsa, tezlik vaqtga chiziqli, ko‘chish esa kvadratik bog‘liq bo‘ladi.',
  formula:`<span><i>x</i> = <i>v</i><sub>0</sub><i>t</i> + ${fr('<i>at</i><sup>2</sup>','2')}</span><span class="alt"><i>v</i> = <i>v</i><sub>0</sub> + <i>at</i> &nbsp; <i>v</i><sup>2</sup> − <i>v</i><sub>0</sub><sup>2</sup> = 2<i>as</i></span>`,
  text:['Avtomobil har sekundda tezligini bir xil miqdorga o‘zgartiradi. Yo‘ldagi belgilar har 1 sekunddagi vaziyatni ko‘rsatadi: tezlanish musbat bo‘lsa, belgilar orasidagi masofa ortib boradi.','Pastdagi grafiklar: v(t) — to‘g‘ri chiziq, uning qiyaligi tezlanishga teng; x(t) — parabola. Tezlanish manfiy bo‘lsa, avtomobil sekinlashadi, to‘xtaydi va orqaga yura boshlaydi.'],
  legend:[['x','ko‘chish, m'],['v₀','boshlang‘ich tezlik, m/s'],['a','tezlanish, m/s²'],['t','vaqt, s']],
  tries:['a = 0 qiling: harakat tekis bo‘ladi, belgilar orasi teng.','v₀ = 10, a = −2,5 qiling: avtomobil 4 sekundda to‘xtaydi va orqaga qaytadi.','v(t) grafigi ostidagi yuza ko‘chishga teng ekanini tekshiring.'],
  params:[{id:'v0',label:'Boshlang‘ich tezlik',sym:'v₀',min:-10,max:20,step:0.5,val:4,unit:'m/s',d:1,reset:1},{id:'a',label:'Tezlanish',sym:'a',min:-5,max:5,step:0.1,val:1.5,unit:'m/s²',d:1,reset:1}],
  init:()=>({t:0,hold:0}),
  step(S,P,dt){if(S.t<8)S.t=Math.min(8,S.t+dt);else{S.hold+=dt;if(S.hold>1.2){S.t=0;S.hold=0;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const X=t=>P.v0*t+P.a*t*t/2,V=t=>P.v0+P.a*t;let mn=0,mx=0,vmn=0,vmx=0;for(let i=0;i<=80;i++){const t=i/10,x=X(t),v=V(t);mn=Math.min(mn,x);mx=Math.max(mx,x);vmn=Math.min(vmn,v);vmx=Math.max(vmx,v);}
    if(mx-mn<1){mx+=0.5;mn-=0.5;}const x0=40,sc=(W-80)/(mx-mn),PX=x=>x0+(x-mn)*sc,ry=H*0.3;S.g={x0,mn,sc,ry};
    c.fillStyle=rgba('muted',0.15);c.fillRect(0,ry,W,30);line(c,0,ry+15,W,ry+15,C.line,2,[12,10]);
    for(let t=0;t<=8;t++){const x=PX(X(t));line(c,x,ry+30,x,ry+38,t<=S.t?C.accent:C.line,2);if(t<=S.t)txt(c,t+'s',x,ry+48,C.muted,{align:'center',font:SMALL});}
    txt(c,'0 m',PX(0),ry-34,C.muted,{align:'center'});line(c,PX(0),ry-26,PX(0),ry,C.muted,1,[3,3]);
    const cx=PX(X(S.t)),v=V(S.t);c.fillStyle=C.red;rrect(c,cx-22,ry-20,44,20,6);c.fill();c.fillStyle=C.ink;disk(c,cx-12,ry,6,C.ink);disk(c,cx+12,ry,6,C.ink);
    if(Math.abs(v)>0.05)arrow(c,cx,ry-32,cx+clamp(v*6,-W*0.3,W*0.3),ry-32,C.green,2.5,'v');if(Math.abs(P.a)>0.05)arrow(c,cx,ry-50,cx+P.a*12,ry-50,C.warm,2,'a');
    const gt=H*0.56,gb=H-26,gw=(W-60)/2,plot=(gx,lo,hi,f,lab,col)=>{if(hi-lo<1e-6){hi+=1;lo-=1;}const sy=v=>gb-(v-lo)/(hi-lo)*(gb-gt);line(c,gx,gb,gx+gw,gb,C.muted,1);line(c,gx,gt,gx,gb,C.muted,1);if(lo<0&&hi>0)line(c,gx,sy(0),gx+gw,sy(0),C.line,1,[3,3]);
      txt(c,lab,gx+4,gt-8,C.muted);txt(c,'t, s',gx+gw,gb+14,C.muted,{align:'right'});c.strokeStyle=rgba(col,0.35);c.lineWidth=1.5;c.beginPath();for(let i=0;i<=80;i++){const t=i/10;c.lineTo(gx+t/8*gw,sy(f(t)));}c.stroke();
      c.strokeStyle=C[col];c.lineWidth=2.5;c.beginPath();for(let i=0;i<=S.t*10;i++){const t=i/10;c.lineTo(gx+t/8*gw,sy(f(t)));}c.stroke();disk(c,gx+S.t/8*gw,sy(f(S.t)),4,C.red);};
    plot(20,vmn,vmx,V,'v, m/s','green');plot(40+gw,mn,mx,X,'x, m','accent');
  },
  read:(S,P)=>[['Vaqt t',fmt(S.t,1)+' s'],['Tezlik v',fmt(P.v0+P.a*S.t,1)+' m/s'],['Ko‘chish x',fmt(P.v0*S.t+P.a*S.t*S.t/2,1)+' m'],['8 s dagi ko‘chish',fmt(P.v0*8+P.a*32,1)+' m']]
});
