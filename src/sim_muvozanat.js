/* Kuchlar muvozanati: ikki ipga osilgan yuk */
function muvGeo(W,H,P){const Ax=W*0.12,Bx=W*0.62,Ay=40,a1=P.a1*D2R,a2=P.a2*D2R,D=Bx-Ax,h=D/(Math.tan(a1)+Math.tan(a2)),kx=Ax+h*Math.tan(a1),ky=Ay+h;return{Ax,Bx,Ay,kx,ky,a1,a2};}
SIMS.push({id:'muvozanat',cat:'sta',title:'Kuchlar muvozanati (ikki ipga osilgan yuk)',short:'ΣF⃗ = 0',
  sub:'Jism tinch turishi uchun unga ta’sir etayotgan barcha kuchlarning vektor yig‘indisi nolga teng bo‘lishi kerak. Kuchlar vektorlari yopiq uchburchak hosil qiladi.',
  formula:`<span><i><b>T</b></i><sub>1</sub> + <i><b>T</b></i><sub>2</sub> + <i>m<b>g</b></i> = 0</span><span class="alt"><i>T</i><sub>1</sub> = ${fr('<i>mg</i> sin<i>β</i>','sin(<i>α</i> + <i>β</i>)')} &nbsp; <i>T</i><sub>2</sub> = ${fr('<i>mg</i> sin<i>α</i>','sin(<i>α</i> + <i>β</i>)')}</span>`,
  text:['Tugunga uchta kuch ta’sir qiladi: ikki ipning taranglik kuchlari va yukning og‘irligi. Ularni ketma-ket qo‘ysak, uchburchak yopiladi — bu muvozanat sharti.','Iplar gorizontalga yaqinlashgani sari taranglik keskin ortadi. Shuning uchun dor yoki osma simlarni butunlay tarang tortib bo‘lmaydi: kuch cheksiz katta bo‘lib ketadi.'],
  legend:[['T₁, T₂','iplarning taranglik kuchlari, N'],['α, β','iplarning vertikal bilan burchaklari'],['mg','yukning og‘irligi, N']],
  tries:['Tugunni sudrab, iplar burchagini o‘zgartiring.','Ikkala burchakni 80° ga yaqinlashtiring: tarangliklar og‘irlikdan ko‘p marta katta bo‘ladi.','α = β bo‘lsa tarangliklar tengligini tekshiring.'],
  params:[{id:'m',label:'Yuk massasi',sym:'m',min:1,max:20,step:0.5,val:5,unit:'kg',d:1},{id:'a1',label:'Chap ip burchagi',sym:'α',min:5,max:80,step:1,val:35,unit:'°',d:0},{id:'a2',label:'O‘ng ip burchagi',sym:'β',min:5,max:80,step:1,val:50,unit:'°',d:0}],
  hint:'Tugunni sudrang',
  init:()=>({drag:false}),
  draw(c,W,H,S,P){grid(c,W,H,28);S.W=W;S.H=H;const g=muvGeo(W,H,P),mg=P.m*9.8,s=Math.sin(g.a1+g.a2),T1=mg*Math.sin(g.a2)/s,T2=mg*Math.sin(g.a1)/s;S.g=Object.assign(g,{T1,T2,mg});
    c.fillStyle=rgba('muted',0.3);c.fillRect(0,g.Ay-14,W*0.7,14);line(c,0,g.Ay,W*0.7,g.Ay,C.ink,2);
    line(c,g.Ax,g.Ay,g.kx,g.ky,C.ink,2.5);line(c,g.Bx,g.Ay,g.kx,g.ky,C.ink,2.5);line(c,g.kx,g.ky,g.kx,g.ky+40,C.ink,2.5);const bs=30+P.m*1.5;c.fillStyle=C.accent;rrect(c,g.kx-bs/2,g.ky+40,bs,bs,4);c.fill();
    const k=Math.min(1.6,(H*0.3)/Math.max(T1,T2,mg));arrow(c,g.kx,g.ky,g.kx+(g.Ax-g.kx)/Math.hypot(g.Ax-g.kx,g.Ay-g.ky)*T1*k,g.ky+(g.Ay-g.ky)/Math.hypot(g.Ax-g.kx,g.Ay-g.ky)*T1*k,C.green,3,'T₁');
    arrow(c,g.kx,g.ky,g.kx+(g.Bx-g.kx)/Math.hypot(g.Bx-g.kx,g.Ay-g.ky)*T2*k,g.ky+(g.Ay-g.ky)/Math.hypot(g.Bx-g.kx,g.Ay-g.ky)*T2*k,C.warm,3,'T₂');arrow(c,g.kx,g.ky,g.kx,g.ky+mg*k,C.red,3);
    disk(c,g.kx,g.ky,7,S.drag?C.accent:C.ink);
    const ox=W*0.8,oy=H*0.25,kk=Math.min(1.2,(H*0.5)/mg);let x=ox,y=oy;const seg=(dx,dy,col,l)=>{arrow(c,x,y,x+dx,y+dy,col,2.5,l);x+=dx;y+=dy;};
    seg(0,mg*kk,C.red,'mg');seg(-Math.sin(g.a1)*T1*kk,-Math.cos(g.a1)*T1*kk,C.green,'T₁');seg(Math.sin(g.a2)*T2*kk,-Math.cos(g.a2)*T2*kk,C.warm,'T₂');txt(c,'Kuchlar uchburchagi',ox,oy-20,C.muted,{align:'center',font:SMALL});
  },
  pointer(type,x,y,S,P,api){const g=muvGeo(S.W,S.H,P);if(type==='down'){if(Math.hypot(x-g.kx,y-g.ky)<24)S.drag=true;else return false;}
    if(type==='move'&&S.drag){const yy=Math.max(g.Ay+20,y),xx=clamp(x,g.Ax+5,g.Bx-5),h=yy-g.Ay;api.set('a1',Math.round(clamp(Math.atan2(xx-g.Ax,h)/D2R,5,80)));api.set('a2',Math.round(clamp(Math.atan2(g.Bx-xx,h)/D2R,5,80)));return true;}if(type==='up')S.drag=false;return S.drag;},
  read:(S,P)=>{const g=S.g||{};return[['Chap ip taranglik T₁',fmt(g.T1||0,1)+' N'],['O‘ng ip taranglik T₂',fmt(g.T2||0,1)+' N'],['Og‘irlik mg',fmt(P.m*9.8,1)+' N'],['Vertikal tashkil etuvchilar yig‘indisi',fmt((g.T1||0)*Math.cos(P.a1*D2R)+(g.T2||0)*Math.cos(P.a2*D2R),1)+' N = mg'],['Gorizontal: T₁sinα₁ va T₂sinα₂',fmt((g.T1||0)*Math.sin(P.a1*D2R),1)+' = '+fmt((g.T2||0)*Math.sin(P.a2*D2R),1)+' N']];}
});
