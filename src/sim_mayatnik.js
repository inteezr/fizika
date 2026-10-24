/* 8. Matematik mayatnik */
SIMS.push({id:'mayatnik',cat:'teb',title:'Matematik mayatnik',short:'T = 2π√(l/g)',
  sub:'Kichik burchaklarda mayatnik davri faqat ip uzunligi va erkin tushish tezlanishiga bog‘liq.',
  formula:`<span><i>T</i> = 2π${sq(fr('<i>l</i>','<i>g</i>'))}</span><span class="alt"><i>mgh</i> = ${fr('<i>mv</i><sup>2</sup>','2')}</span>`,
  text:['Ipga osilgan yuk og‘irlik kuchi ta’sirida tebranadi. Yukning massasi davrga ta’sir qilmaydi: og‘irroq yukni kuchliroq tortishadi, lekin uni harakatga keltirish ham qiyinroq.','Tebranish davomida potensial energiya kinetik energiyaga aylanadi va aksincha (o‘ngdagi ustunlar). Formula kichik burchaklar uchun aniq; katta burchakda o‘lchangan davr biroz uzunroq chiqadi.'],
  legend:[['T','tebranish davri, s'],['l','ip uzunligi, m'],['g','erkin tushish tezlanishi, m/s²'],['θ','og‘ish burchagi']],
  tries:['Ip uzunligini 4 marta oshiring: davr 2 marta ortadi.','Burchakni 70° ga yetkazing va «o‘lchangan davr»ni formula bilan solishtiring.','g = 1,6 m/s² qiling: Oyda mayatnik 2,5 marta sekin tebranadi.'],
  params:[{id:'L',label:'Ip uzunligi',sym:'l',min:0.2,max:3,step:0.05,val:1.5,unit:'m',d:2,reset:1},{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:1.6,max:25,step:0.1,val:9.8,unit:'m/s²',d:1,reset:1},{id:'th0',label:'Boshlang‘ich burchak',sym:'θ₀',min:5,max:80,step:1,val:25,unit:'°',d:0,reset:1}],
  init:P=>({th:P.th0*D2R,w:0,t:0,lc:null,Tm:null}),
  step(S,P,dt){const n=16,h=dt/n;for(let i=0;i<n;i++){const pw=S.w;S.w+=-(P.g/P.L)*Math.sin(S.th)*h;S.th+=S.w*h;S.t+=h;if(pw>0&&S.w<=0){if(S.lc!==null)S.Tm=S.t-S.lc;S.lc=S.t;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const px=W*0.4,py=30,sc=(H-80)/3.1,L=P.L*sc,bx=px+L*Math.sin(S.th),by=py+L*Math.cos(S.th),a0=P.th0*D2R;
    c.fillStyle=rgba('muted',0.3);c.fillRect(px-50,py-10,100,10);line(c,px-50,py,px+50,py,C.ink,2);
    line(c,px,py,px,py+L+20,C.muted,1,[3,4]);
    c.strokeStyle=C.line;c.lineWidth=2;c.setLineDash([2,5]);c.beginPath();c.arc(px,py,L,Math.PI/2-a0,Math.PI/2+a0);c.stroke();c.setLineDash([]);
    line(c,px,py,bx,by,C.ink,2);disk(c,px,py,3.5,C.ink);
    c.strokeStyle=C.warm;c.lineWidth=1.5;c.beginPath();const ar=Math.min(40,L*0.5);if(S.th>0)c.arc(px,py,ar,Math.PI/2-S.th,Math.PI/2);else c.arc(px,py,ar,Math.PI/2,Math.PI/2-S.th);c.stroke();
    txt(c,'θ',px+(S.th>0?1:-1)*(ar*0.45)+ (S.th>0?2:-10),py+ar+12,C.warm,{font:MATH});
    arrow(c,bx,by,bx,by+40,C.red,2,'mg');disk(c,bx,by,14,C.accent);
    const E=P.g*P.L*(1-Math.cos(a0)),Ep=P.g*P.L*(1-Math.cos(S.th)),Ek=Math.max(0,E-Ep),bx0=W-120,bh=H*0.55,bb=H*0.82;
    [['Eₖ',Ek,C.warm],['Eₚ',Ep,C.green]].forEach((b,i)=>{const x=bx0+i*50,h=E>0?b[1]/E*bh:0;c.strokeStyle=C.line;c.lineWidth=1;c.strokeRect(x,bb-bh,34,bh);c.fillStyle=b[2];c.fillRect(x,bb-h,34,h);txt(c,b[0],x+17,bb+16,b[2],{align:'center',font:MATH});});
    txt(c,'Energiya',bx0-4,bb-bh-14,C.muted);
  },
  read:(S,P)=>[['Davr (formula)',fmt(TAU*Math.sqrt(P.L/P.g))+' s'],['Davr (o‘lchangan)',S.Tm?fmt(S.Tm)+' s':'o‘lchanmoqda…'],['Burchak θ',fmt(S.th/D2R,1)+'°'],['Tezlik v',fmt(Math.abs(S.w)*P.L)+' m/s']]
});
