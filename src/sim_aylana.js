/* 3. Aylana bo‘ylab harakat */
SIMS.push({id:'aylana',cat:'kin',title:'Aylana bo‘ylab tekis harakat',short:'a = v² / R',
  sub:'Tezlik moduli o‘zgarmasa ham, yo‘nalishi doim o‘zgaradi — bu markazga intilma tezlanish beradi.',
  formula:`<span><i>a</i> = ${fr('<i>v</i><sup>2</sup>','<i>R</i>')}</span><span class="alt"><i>F</i> = ${fr('<i>mv</i><sup>2</sup>','<i>R</i>')} &nbsp; <i>T</i> = ${fr('2π<i>R</i>','<i>v</i>')}</span>`,
  text:['Aylana bo‘ylab harakatlanayotgan jismning tezligi har doim aylanaga urinma bo‘ylab yo‘naladi (yashil strelka). Yo‘nalish uzluksiz o‘zgargani uchun jism markazga yo‘nalgan tezlanish oladi (to‘q sariq strelka).','Bu tezlanishni markazga intilma kuch hosil qiladi. Ipdagi tosh uchun bu ipning taranglik kuchi, Oy uchun esa Yerning tortishish kuchi.'],
  legend:[['v','chiziqli tezlik, m/s'],['R','aylana radiusi, m'],['a','markazga intilma tezlanish, m/s²'],['T','aylanish davri, s'],['ω','burchak tezlik, rad/s']],
  tries:['Tezlikni 2 marta oshiring: tezlanish 4 marta ortadi.','Radiusni 2 marta oshiring (tezlik o‘zgarmasin): tezlanish 2 marta kamayadi.','Massani o‘zgartiring: tezlanish o‘zgarmaydi, lekin kerakli kuch ortadi.'],
  params:[{id:'r',label:'Radius',sym:'R',min:0.5,max:5,step:0.1,val:3,unit:'m',d:1},{id:'v',label:'Tezlik',sym:'v',min:0.5,max:10,step:0.1,val:3,unit:'m/s',d:1},{id:'m',label:'Massa',sym:'m',min:0.1,max:5,step:0.1,val:1,unit:'kg',d:1}],
  init:()=>({phi:0}),
  step(S,P,dt){S.phi=(S.phi+P.v/P.r*dt)%TAU;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W/2,cy=H/2,sc=(Math.min(W,H)/2-34)/5,R=P.r*sc;
    c.strokeStyle=C.line;c.lineWidth=2;c.setLineDash([4,6]);c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke();c.setLineDash([]);
    c.strokeStyle=rgba('accent',0.45);c.lineWidth=5;c.beginPath();c.arc(cx,cy,R,-S.phi,-S.phi+1.1);c.stroke();
    const bx=cx+R*Math.cos(S.phi),by=cy-R*Math.sin(S.phi);line(c,cx,cy,bx,by,C.muted,1.5);disk(c,cx,cy,3.5,C.ink);
    txt(c,'R',(cx+bx)/2+8,(cy+by)/2-8,C.muted,{font:MATH});
    const vl=14*P.v;arrow(c,bx,by,bx-Math.sin(S.phi)*vl,by-Math.cos(S.phi)*vl,C.green,3,'v');
    const a=P.v*P.v/P.r,al=Math.min(R*0.8,8+Math.sqrt(a)*12);arrow(c,bx,by,bx-Math.cos(S.phi)*al,by+Math.sin(S.phi)*al,C.warm,3,'a');
    disk(c,bx,by,7+P.m*2.2,C.accent);
  },
  read:(S,P)=>{const a=P.v*P.v/P.r;return[['Tezlanish a',fmt(a)+' m/s²'],['Kuch F',fmt(P.m*a)+' N'],['Davr T',fmt(TAU*P.r/P.v)+' s'],['Burchak tezlik ω',fmt(P.v/P.r)+' rad/s']];}
});
