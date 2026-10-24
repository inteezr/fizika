/* Atvud mashinasi */
SIMS.push({id:'atvud',cat:'din',title:'Blok orqali bog‘langan jismlar (Atvud mashinasi)',short:'a = (m₁ − m₂)g/(m₁ + m₂)',
  sub:'Ip va blok vaznsiz bo‘lsa, ikkala yuk bir xil tezlanish bilan harakatlanadi. Og‘irroq yuk pastga tushadi, yengili yuqoriga ko‘tariladi.',
  formula:`<span><i>a</i> = ${fr('(<i>m</i><sub>1</sub> − <i>m</i><sub>2</sub>)<i>g</i>','<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>')}</span><span class="alt"><i>T</i> = ${fr('2<i>m</i><sub>1</sub><i>m</i><sub>2</sub><i>g</i>','<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>')}</span>`,
  text:['Har bir yukka og‘irlik kuchi va ipning taranglik kuchi ta’sir qiladi. Ikkala yuk uchun Nyutonning ikkinchi qonunini yozib, ularni qo‘shsak, tezlanish formulasi kelib chiqadi.','Massalar teng bo‘lsa, tizim muvozanatda: yuklar tinch turadi yoki tekis harakat qiladi. Massalar farqi qancha katta bo‘lsa, tezlanish g ga shuncha yaqinlashadi.'],
  legend:[['m₁, m₂','yuklar massalari, kg'],['a','tezlanish, m/s²'],['T','ipning taranglik kuchi, N'],['g','9,8 m/s²']],
  tries:['Massalarni tenglashtiring: yuklar to‘xtab qoladi.','m₁ ni m₂ dan juda katta qiling: tezlanish g ga yaqinlashadi.','Taranglik kuchi har doim og‘ir yukning og‘irligidan kichik ekanini tekshiring.'],
  params:[{id:'m1',label:'Chap yuk massasi',sym:'m₁',min:0.5,max:10,step:0.1,val:3,unit:'kg',d:1,reset:1},{id:'m2',label:'O‘ng yuk massasi',sym:'m₂',min:0.5,max:10,step:0.1,val:2,unit:'kg',d:1,reset:1}],
  init:()=>({s:0,v:0,hold:0}),
  step(S,P,dt){const a=(P.m1-P.m2)*9.8/(P.m1+P.m2);if(Math.abs(S.s)<1.2){S.v+=a*dt*0.5;S.s+=S.v*dt*0.5;}else{S.hold+=dt;if(S.hold>1){S.s=0;S.v=0;S.hold=0;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.4,py=60,R=50,L0=H*0.45,sc=(H*0.32),y1=py+L0+S.s*sc,y2=py+L0-S.s*sc,b1=26+P.m1*3,b2=26+P.m2*3,a=(P.m1-P.m2)*9.8/(P.m1+P.m2),T=2*P.m1*P.m2*9.8/(P.m1+P.m2);S.g={cx,py,R,y1,y2,b1,b2};
    c.fillStyle=rgba('muted',0.3);c.fillRect(cx-80,10,160,12);line(c,cx,22,cx,py,C.ink,3);disk(c,cx,py,R,rgba('muted',0.25),C.ink);disk(c,cx,py,6,C.ink);
    line(c,cx-R,py,cx-R,y1,C.ink,2);line(c,cx+R,py,cx+R,y2,C.ink,2);
    c.fillStyle=C.accent;rrect(c,cx-R-b1/2,y1,b1,b1,4);c.fill();c.fillStyle=C.warm;rrect(c,cx+R-b2/2,y2,b2,b2,4);c.fill();txt(c,'m₁',cx-R,y1+b1/2,C.onaccent,{align:'center',font:MATH});txt(c,'m₂',cx+R,y2+b2/2,C.onaccent,{align:'center',font:MATH});
    const k=1.6;arrow(c,cx-R-b1/2-14,y1+b1/2,cx-R-b1/2-14,y1+b1/2+P.m1*9.8*k,C.red,2.5,'m₁g');arrow(c,cx-R-b1/2-14,y1+b1/2,cx-R-b1/2-14,y1+b1/2-T*k,C.green,2.5,'T');
    arrow(c,cx+R+b2/2+14,y2+b2/2,cx+R+b2/2+14,y2+b2/2+P.m2*9.8*k,C.red,2.5,'m₂g');arrow(c,cx+R+b2/2+14,y2+b2/2,cx+R+b2/2+14,y2+b2/2-T*k,C.green,2.5,'T');
    if(Math.abs(a)>0.01){arrow(c,W*0.78,H/2,W*0.78,H/2+Math.sign(a)*40,C.accent,2.5,'a₁');arrow(c,W*0.86,H/2,W*0.86,H/2-Math.sign(a)*40,C.warm,2.5,'a₂');}
  },
  read:(S,P)=>{const a=(P.m1-P.m2)*9.8/(P.m1+P.m2),T=2*P.m1*P.m2*9.8/(P.m1+P.m2);return[['Tezlanish a',fmt(Math.abs(a),2)+' m/s²'],['Taranglik T',fmt(T,1)+' N'],['Tezlik v',fmt(Math.abs(S.v),2)+' m/s'],['Yo‘nalish',Math.abs(a)<0.01?'muvozanat':a>0?'chap yuk tushadi':'o‘ng yuk tushadi']];}
});
