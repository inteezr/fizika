/* Gidravlik press (Paskal qonuni) */
SIMS.push({id:'gidropress',cat:'sta',title:'Gidravlik press (Paskal qonuni)',short:'F₂/F₁ = S₂/S₁',
  sub:'Suyuqlikka berilgan bosim uning hamma nuqtasiga o‘zgarishsiz uzatiladi. Shuning uchun kichik porshenga qo‘yilgan kichik kuch katta porshenda katta kuch hosil qiladi.',
  formula:`<span>${fr('<i>F</i><sub>2</sub>','<i>F</i><sub>1</sub>')} = ${fr('<i>S</i><sub>2</sub>','<i>S</i><sub>1</sub>')}</span><span class="alt"><i>p</i> = ${fr('<i>F</i>','<i>S</i>')} &nbsp; <i>S</i><sub>1</sub><i>h</i><sub>1</sub> = <i>S</i><sub>2</sub><i>h</i><sub>2</sub></span>`,
  text:['Kichik porshen pastga bosilganda suyuqlik katta silindrga o‘tadi va katta porshenni ko‘taradi. Bosim ikkala porshen ostida bir xil, lekin katta porshen yuzasi katta bo‘lgani uchun unga ko‘p marta katta kuch ta’sir qiladi.','Kuchdan yutilsa, masofadan yutqaziladi: kichik porshen ko‘p yo‘l bosadi, katta porshen esa oz ko‘tariladi. Bajarilgan ish ikkala tomonda teng — oltin qoida.'],
  legend:[['F₁, F₂','porshenlarga ta’sir kuchlari, N'],['S₁, S₂','porshenlar yuzalari'],['p','suyuqlik bosimi, Pa'],['h₁, h₂','porshenlarning siljishlari']],
  tries:['F₁ ni oshirib, avtomobil ko‘tarila boshlaydigan kuchni toping.','S₂/S₁ ni 100 qiling: 100 N kuch bilan 1 tonnani ko‘tarish mumkin.','Kichik porshen qancha yurganda katta porshen 1 sm ko‘tarilishini hisoblang.'],
  params:[{id:'F1',label:'Kichik porshenga kuch',sym:'F₁',min:10,max:500,step:5,val:150,unit:'N',d:0},{id:'S1',label:'Kichik porshen yuzasi',sym:'S₁',min:2,max:40,step:1,val:10,unit:'sm²',d:0},{id:'S2',label:'Katta porshen yuzasi',sym:'S₂',min:50,max:1000,step:10,val:800,unit:'sm²',d:0},{id:'M',label:'Yuk massasi',sym:'M',min:100,max:2000,step:50,val:1000,unit:'kg',d:0}],
  init:()=>({ph:0,lift:0}),
  step(S,P,dt){const F2=P.F1*P.S2/P.S1,ok=F2>=P.M*9.8;S.ph+=dt*2.2;if(ok){const d=Math.max(0,Math.sin(S.ph))*dt*2.2;S.lift=Math.min(1,S.lift+d*0.25*P.S1/P.S2*8);}else S.lift=Math.max(0,S.lift-dt*0.2);},
  draw(c,W,H,S,P){grid(c,W,H,28);const F2=P.F1*P.S2/P.S1,ok=F2>=P.M*9.8,by=H*0.82,w1=14+Math.sqrt(P.S1)*5,w2=40+Math.sqrt(P.S2)*5.5,x1=W*0.2,x2=W*0.58,top=H*0.3,stroke=ok?Math.max(0,Math.sin(S.ph))*30:Math.max(0,Math.sin(S.ph))*6,l2=S.lift*H*0.18;S.g={x1,x2,w1,w2,by,top,p1:top+30+stroke,p2:top+30-l2};
    c.fillStyle=rgba('water',0.45);c.fillRect(x1-w1/2,top+30+stroke,w1,by-(top+30+stroke));c.fillRect(x2-w2/2,top+30-l2,w2,by-(top+30-l2));c.fillRect(x1-w1/2,by-24,x2-x1,24);
    c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(x1-w1/2,top);c.lineTo(x1-w1/2,by);c.lineTo(x2+w2/2,by);c.lineTo(x2+w2/2,top-40);c.moveTo(x1+w1/2,top);c.lineTo(x1+w1/2,by-24);c.lineTo(x2-w2/2,by-24);c.lineTo(x2-w2/2,top-40);c.stroke();
    c.fillStyle=C.ink;c.fillRect(x1-w1/2,top+22+stroke,w1,8);c.fillRect(x2-w2/2,top+22-l2,w2,8);arrow(c,x1,top-40+stroke,x1,top+18+stroke,C.green,3,'F₁');
    const cy=top+22-l2;c.fillStyle=C.red;rrect(c,x2-w2*0.42,cy-34,w2*0.84,22,6);c.fill();rrect(c,x2-w2*0.25,cy-50,w2*0.45,18,6);c.fill();disk(c,x2-w2*0.25,cy-10,9,C.ink);disk(c,x2+w2*0.25,cy-10,9,C.ink);
    arrow(c,x2+w2/2+20,cy+40,x2+w2/2+20,cy+40-Math.min(F2/100,120),C.warm,3,'F₂');txt(c,ok?'Yuk ko‘tarilmoqda':'Kuch yetarli emas',W*0.82,30,ok?C.green:C.red,{align:'center'});
  },
  read:(S,P)=>{const F2=P.F1*P.S2/P.S1;return[['Bosim p',fmt(P.F1/(P.S1*1e-4)/1000,1)+' kPa'],['Katta porshenga kuch F₂',fmt(F2,0)+' N'],['Yuk og‘irligi Mg',fmt(P.M*9.8,0)+' N'],['Kuchdan yutuq',fmt(P.S2/P.S1,1)+' marta']];}
});
