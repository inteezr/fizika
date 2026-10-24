/* Zaryadli zarraning elektr maydonidagi harakati */
SIMS.push({id:'elmaydon',cat:'est',title:'Zaryadli zarra elektr maydonida',short:'y = qEl²/(2mv₀²)',
  sub:'Kondensator plastinkalari orasidagi bir jinsli maydonda elektronga doimiy kuch ta’sir qiladi. Natijada u gorizontal otilgan tosh kabi parabola bo‘ylab og‘adi.',
  formula:`<span><i>E</i> = ${fr('<i>U</i>','<i>d</i>')} &nbsp; <i>F</i> = <i>qE</i></span><span class="alt"><i>y</i> = ${fr('<i>qEl</i><sup>2</sup>','2<i>mv</i><sub>0</sub><sup>2</sup>')}</span>`,
  text:['Elektron plastinkalar orasiga gorizontal v₀ tezlik bilan kiradi. Maydon kuchi faqat vertikal yo‘nalgan, shuning uchun gorizontal tezlik o‘zgarmaydi, vertikal bo‘ylab esa tekis tezlanuvchan harakat boshlanadi.','Plastinkadan chiqqach, elektron to‘g‘ri chiziq bo‘ylab ekranga uchadi. Ostsillograf va eski televizorlar kineskoplari aynan shu tamoyilda ishlagan.'],
  legend:[['U','plastinkalar orasidagi kuchlanish'],['d','plastinkalar oralig‘i, 2 sm'],['l','plastinka uzunligi, 5 sm'],['v₀','boshlang‘ich tezlik'],['q, m','zarra zaryadi va massasi']],
  tries:['Kuchlanishni 2 marta oshiring: og‘ish ham 2 marta ortadi.','Tezlikni 2 marta oshiring: og‘ish 4 marta kamayadi.','Kuchlanish ishorasini almashtiring: elektron teskari tomonga og‘adi.'],
  params:[{id:'U',label:'Kuchlanish',sym:'U',min:-300,max:300,step:5,val:120,unit:'V',d:0},{id:'v0',label:'Boshlang‘ich tezlik',sym:'v₀',min:1,max:6,step:0.1,val:2.5,unit:'·10⁷ m/s',d:1}],
  init:()=>({ps:[],acc:0}),
  step(S,P,dt){S.acc+=dt*14;while(S.acc>=1){S.acc-=1;S.ps.push({s:0});}S.ps.forEach(p=>p.s+=dt*0.9);S.ps=S.ps.filter(p=>p.s<1);},
  draw(c,W,H,S,P){grid(c,W,H,28);const em=1.76e11,l=0.05,d=0.02,v=P.v0*1e7,a=em*P.U/d,X0=W*0.12,Lp=W*0.38,Ls=W*0.38,cy=H/2,sc=Lp/l,gap=d*sc,yo=a*l*l/(2*v*v),ang=Math.atan(a*l/(v*v)),hit=Math.abs(yo)<d/2;S.g={X0,Lp,Ls,cy,sc,gap,yo,ang,hit};
    const path=s=>{const xt=s*(Lp+Ls);if(xt<=Lp){const x=xt/sc;return[X0+xt,cy-a*x*x/(2*v*v)*sc];}const dy=yo*sc+(xt-Lp)*Math.tan(ang);return[X0+xt,cy-dy];};
    c.fillStyle=rgba('red',0.6);c.fillRect(X0,cy-gap/2-10,Lp,10);c.fillStyle=rgba('accent',0.6);c.fillRect(X0,cy+gap/2,Lp,10);txt(c,P.U>=0?'+':'−',X0-14,cy-gap/2-5,P.U>=0?C.red:C.accent,{align:'center',font:'600 16px sans-serif'});txt(c,P.U>=0?'−':'+',X0-14,cy+gap/2+5,P.U>=0?C.accent:C.red,{align:'center',font:'600 16px sans-serif'});
    for(let i=1;i<6;i++){const x=X0+i*Lp/6;arrow(c,x,cy-gap/2+4,x,cy+gap/2-4,rgba('warm',Math.min(0.8,Math.abs(P.U)/300+0.1)),1.2);}
    const sx=X0+Lp+Ls;c.fillStyle=rgba('green',0.25);c.fillRect(sx,cy-H*0.4,10,H*0.8);c.fillStyle=C.ink;c.fillRect(20,cy-14,X0-30,28);
    if(!hit)txt(c,'Elektron plastinkaga urildi',W/2,30,C.red,{align:'center'});
    c.strokeStyle=rgba('accent',0.35);c.lineWidth=1.5;c.beginPath();for(let i=0;i<=100;i++){const s=i/100;const[x,y]=path(s);if(!hit&&x>X0+Lp)break;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();
    S.ps.forEach(p=>{const[x,y]=path(p.s);if(!hit&&(x>X0+Lp||Math.abs(y-cy)>gap/2))return;disk(c,x,y,3.5,C.accent);});if(hit){const[x,y]=path(1);disk(c,sx+5,y,7,C.green);}
  },
  read:(S,P)=>{const em=1.76e11,l=0.05,d=0.02,v=P.v0*1e7,a=em*P.U/d,yo=a*l*l/(2*v*v);return[['Maydon kuchlanganligi E',fmt(Math.abs(P.U)/d/1000,1)+' kV/m'],['Tezlanish a',fmt(Math.abs(a)/1e15,2)+'·10¹⁵ m/s²'],['Plastinkadan chiqishdagi og‘ish',fmt(Math.abs(yo)*1000,2)+' mm'],['Og‘ish burchagi',fmt(Math.abs(Math.atan(a*l/(v*v)))/D2R,1)+'°']];}
});
