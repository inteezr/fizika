/* Qiya tekislik */
SIMS.push({id:'qiya',cat:'din',title:'Qiya tekislikdagi harakat',short:'a = g(sinα − μcosα)',
  sub:'Qiya tekislikda og‘irlik kuchi ikki qismga ajraladi: biri jismni pastga tortadi, ikkinchisi tekislikka bosadi.',
  formula:`<span><i>a</i> = <i>g</i>(sin <i>α</i> − <i>μ</i> cos <i>α</i>)</span><span class="alt"><i>N</i> = <i>mg</i> cos <i>α</i> &nbsp; sirpanish sharti: tg <i>α</i> &gt; <i>μ</i></span>`,
  text:['Og‘irlik kuchi mg (qizil) ikki tashkil etuvchiga ajraladi: tekislik bo‘ylab pastga yo‘nalgan mg sin α va tekislikka perpendikulyar mg cos α. Ikkinchisini tayanch reaksiyasi N (yashil) muvozanatlaydi.','Ishqalanish kuchi μN harakatga qarshi yo‘naladi. Agar mg sin α ishqalanishni yengolmasa (tg α ≤ μ), jism joyida qoladi. Massa tezlanishga ta’sir qilmaydi.'],
  legend:[['α','qiyalik burchagi'],['μ','ishqalanish koeffitsienti'],['N','tayanch reaksiya kuchi, N'],['a','tezlanish, m/s²']],
  tries:['μ = 0,3 qiling va burchakni asta oshiring: jism taxminan 17° da sirpana boshlaydi (tg 17° ≈ 0,3).','Massani o‘zgartiring: tezlanish o‘zgarmaydi.','α = 90° ga yaqinlashtiring: harakat erkin tushishga yaqinlashadi.'],
  params:[{id:'ang',label:'Qiyalik burchagi',sym:'α',min:0,max:75,step:1,val:30,unit:'°',d:0,reset:1},{id:'mu',label:'Ishqalanish koeffitsienti',sym:'μ',min:0,max:1,step:0.01,val:0.2,unit:'',d:2,reset:1},{id:'m',label:'Massa',sym:'m',min:1,max:10,step:0.5,val:2,unit:'kg',d:1}],
  init:()=>({s:0,v:0,a:0,hold:0}),
  step(S,P,dt){const al=P.ang*D2R,a=9.8*(Math.sin(al)-P.mu*Math.cos(al));if(a<=0){S.a=0;S.v=0;return;}S.a=a;S.v+=a*dt;S.s+=S.v*dt;if(S.s>=6){S.s=6;S.hold+=dt;if(S.hold>1){S.s=0;S.v=0;S.hold=0;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const al=P.ang*D2R,gy=H-30,x0=40,Lp=Math.min((W-120)/Math.max(Math.cos(al),0.01),(H-90)/Math.max(Math.sin(al),0.01)),tx=x0,ty=gy-Lp*Math.sin(al),bx=x0+Lp*Math.cos(al);
    c.fillStyle=rgba('muted',0.18);c.beginPath();c.moveTo(tx,ty);c.lineTo(bx,gy);c.lineTo(tx,gy);c.closePath();c.fill();line(c,tx,ty,bx,gy,C.ink,2.5);line(c,0,gy,W,gy,C.ink,2);
    c.strokeStyle=C.warm;c.lineWidth=1.5;c.beginPath();c.arc(bx,gy,40,Math.PI,Math.PI+al);c.stroke();txt(c,'α',bx-54,gy-12,C.warm,{font:MATH});
    const d=[Math.cos(al),Math.sin(al)],nrm=[Math.sin(al),-Math.cos(al)],bs=30+P.m*2,pos=0.06+S.s/6*0.86,px=tx+d[0]*Lp*pos,py=ty+d[1]*Lp*pos,cx=px+nrm[0]*bs/2,cy=py+nrm[1]*bs/2;
    c.save();c.translate(cx,cy);c.rotate(al);c.fillStyle=C.accent;rrect(c,-bs/2,-bs/2,bs,bs,4);c.fill();c.restore();
    const mg=P.m*9.8,k=Math.min(2.4,(H*0.3)/mg),N=mg*Math.cos(al),fs=mg*Math.sin(al),fr=S.a>0?P.mu*N:fs;S.g={tx,ty,bx,gy,al,cx,cy,bs,px,py,k,mg,N,fr,d,nrm};
    arrow(c,cx,cy,cx,cy+mg*k,C.red,3,'mg');arrow(c,cx,cy,cx+nrm[0]*N*k,cy+nrm[1]*N*k,C.green,3,'N');
    line(c,cx,cy,cx+d[0]*fs*k,cy+d[1]*fs*k,rgba('red',0.6),1.5,[4,4]);line(c,cx,cy,cx-nrm[0]*N*k,cy-nrm[1]*N*k,rgba('red',0.6),1.5,[4,4]);
    if(fr>0.05){arrow(c,px,py,px-d[0]*fr*k,py-d[1]*fr*k,C.warm,3);txt(c,'F ishq',px-d[0]*fr*k-8,py-d[1]*fr*k-10,C.warm,{align:'right'});}
    if(S.a===0&&P.ang>0)txt(c,'tg α ≤ μ — jism sirpanmaydi',W-16,24,C.red,{align:'right'});
  },
  read:(S,P)=>{const al=P.ang*D2R,N=P.m*9.8*Math.cos(al);return[['Tezlanish a',fmt(S.a)+' m/s²'],['Tezlik v',fmt(S.v)+' m/s'],['Tayanch reaksiyasi N',fmt(N,1)+' N'],['tg α va μ',fmt(Math.tan(al))+' / '+fmt(P.mu)]];}
});
