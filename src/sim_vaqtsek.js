/* Vaqtning sekinlashuvi va uzunlikning qisqarishi */
SIMS.push({id:'vaqtsek',cat:'rel',title:'Vaqtning sekinlashuvi va uzunlikning qisqarishi',short:'Δt = Δt₀/√(1 − v²/c²)',
  sub:'Yorug‘lik tezligi barcha sanoq sistemalarida bir xil. Shuning uchun harakatlanayotgan soat tinch soatga nisbatan sekin yuradi, harakatdagi jism esa qisqaroq ko‘rinadi.',
  formula:`<span><i>Δt</i> = ${fr('<i>Δt</i><sub>0</sub>','√(1 − <i>v</i><sup>2</sup>/<i>c</i><sup>2</sup>)')}</span><span class="alt"><i>l</i> = <i>l</i><sub>0</sub>${sq('1 − <i>v</i><sup>2</sup>/<i>c</i><sup>2</sup>')}</span>`,
  text:['Yorug‘lik soati — ikki ko‘zgu orasida qaytib turuvchi foton. Poyezddagi yo‘lovchi uchun foton tik yuradi. Yerdagi kuzatuvchi uchun esa foton qiya, uzunroq yo‘l bosadi, lekin tezligi baribir c. Demak, poyezd soatining bir «tiq»i Yerdagi kuzatuvchi uchun uzoqroq davom etadi.','Bu farq faqat yorug‘lik tezligiga yaqin tezliklarda sezilarli. Kosmik nurlardagi myuonlar Yer sirtiga yetib kelishi aynan vaqt sekinlashuvi bilan tushuntiriladi.'],
  legend:[['v','poyezd tezligi'],['c','yorug‘lik tezligi, 3·10⁸ m/s'],['Δt₀','xususiy vaqt (soat bilan birga harakatlanuvchi)'],['γ','Lorens omili 1/√(1 − v²/c²)']],
  tries:['v = 0,87c qiling: γ ≈ 2, poyezd soati 2 marta sekin yuradi.','v ni 0,99c ga yetkazing: poyezd 7 marta qisqa ko‘rinadi.','Kichik tezliklarda (0,1c) farq deyarli sezilmasligini tekshiring.'],
  params:[{id:'b',label:'Tezlik',sym:'v/c',min:0,max:0.99,step:0.01,val:0.6,unit:'c',d:2}],
  init:()=>({t:0,x:0}),step(S,P,dt){S.t+=dt;S.x+=P.b*dt*0.25;if(S.x>1.3)S.x=-0.3;},
  draw(c,W,H,S,P){grid(c,W,H,28);const g=1/Math.sqrt(1-P.b*P.b),h=H*0.26,y0=H*0.08,y1=H*0.55,l0=W*0.3,per=1.6,ph0=(S.t%per)/per,ph1=((S.t/g)%per)/per;S.g={g,h,y0,y1,l0};
    txt(c,'Poyezd ichidagi kuzatuvchi (tinch soat)',14,y0-2,C.muted,{font:SMALL});const cx=W*0.25;line(c,cx-30,y0+12,cx+30,y0+12,C.ink,3);line(c,cx-30,y0+12+h,cx+30,y0+12+h,C.ink,3);const fy=y0+12+(ph0<0.5?ph0*2:2-ph0*2)*h;disk(c,cx,fy,6,C.warm);line(c,cx,y0+12,cx,y0+12+h,rgba('warm',0.3),1.5,[3,4]);
    const tl=l0/g,tx=(S.x)*(W+tl)-tl,ty=y1;txt(c,'Yerdagi kuzatuvchi: v = '+fmt(P.b,2)+'c',14,ty-12,C.muted,{font:SMALL});c.fillStyle=rgba('accent',0.25);rrect(c,tx,ty,tl,h+30,8);c.fill();c.strokeStyle=C.accent;c.lineWidth=2;rrect(c,tx,ty,tl,h+30,8);c.stroke();
    const mx=tx+tl/2;line(c,mx-Math.min(30,tl/3),ty+12,mx+Math.min(30,tl/3),ty+12,C.ink,3);line(c,mx-Math.min(30,tl/3),ty+12+h,mx+Math.min(30,tl/3),ty+12+h,C.ink,3);const f2=ty+12+(ph1<0.5?ph1*2:2-ph1*2)*h;disk(c,mx,f2,6,C.warm);
    const sl=P.b*W*0.12;line(c,mx-sl,ty+12+h,mx,ty+12,rgba('warm',0.4),1.5,[3,4]);line(c,mx,ty+12,mx+sl,ty+12+h,rgba('warm',0.4),1.5,[3,4]);line(c,0,ty+h+40,W,ty+h+40,C.ink,2);
    const dx=W*0.62,dr=W*0.08;[[ph0,'xususiy vaqt',dx],[ph1,'harakatdagi soat',dx+dr*2.6]].forEach(([p,l,x],j)=>{disk(c,x,y0+h*0.6,dr,C.canvas,C.ink);const a=-Math.PI/2+((j?S.t/g:S.t)/per)*TAU/4;line(c,x,y0+h*0.6,x+Math.cos(a)*dr*0.8,y0+h*0.6+Math.sin(a)*dr*0.8,j?C.red:C.green,3);txt(c,l,x,y0+h*0.6+dr+14,C.muted,{align:'center',font:SMALL});});
  },
  read:(S,P)=>{const g=1/Math.sqrt(1-P.b*P.b);return[['Lorens omili γ',fmt(g,3)],['1 s xususiy vaqt Yerdan',fmt(g,3)+' s'],['10 m poyezd uzunligi',fmt(10/g,2)+' m'],['Tezlik',fmt(P.b*3e5,0)+' km/s']];}
});
