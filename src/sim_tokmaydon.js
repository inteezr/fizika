/* To‘g‘ri tokning magnit maydoni va o‘tkazgichlar o‘zaro ta’siri */
SIMS.push({id:'tokmaydon',cat:'mag',title:'To‘g‘ri tokning magnit maydoni',short:'B = μ₀I / 2πr',
  sub:'Tok o‘tayotgan to‘g‘ri o‘tkazgich atrofida halqasimon magnit maydon hosil bo‘ladi: kompas strelkalari aylana bo‘ylab joylashadi. Bir tomonga oqayotgan parallel toklar tortishadi.',
  formula:`<span><i>B</i> = ${fr('<i>μ</i><sub>0</sub><i>I</i>','2π<i>r</i>')}</span><span class="alt">${fr('<i>F</i>','<i>l</i>')} = ${fr('<i>μ</i><sub>0</sub><i>I</i><sub>1</sub><i>I</i><sub>2</sub>','2π<i>d</i>')}</span>`,
  text:['Ersted tajribasida tokli sim yonidagi kompas strelkasi buriladi. Magnit induksiya chiziqlari o‘tkazgichni o‘rab olgan konsentrik aylanalardir, yo‘nalishi parma (o‘ng vint) qoidasi bilan aniqlanadi: ⊙ — tok bizga qarab, ⊗ — bizdan.','Maydon masofaga teskari proporsional kamayadi. Ikkinchi o‘tkazgich birinchisining maydonida Amper kuchini sezadi. Toklar bir yo‘nalishda bo‘lsa tortishadi, qarama-qarshi bo‘lsa itarishadi. Amperning SI dagi ta’rifi aynan shu hodisaga asoslangan edi.'],
  legend:[['B','magnit induksiya, μT'],['I','tok kuchi, A'],['r','o‘tkazgichgacha masofa, m'],['μ₀','4π·10⁻⁷ H/m — magnit doimiysi'],['F/l','birlik uzunlikka ta’sir kuchi, N/m']],
  tries:['Tok yo‘nalishini teskari qiling: barcha kompas strelkalari 180° buriladi.','Ikkinchi tokni yoqing va yo‘nalishlarni bir xil qiling: kuch strelkalari bir-biriga qaraydi (tortishish).','Zondni sudrab, masofa ikki marta ortganda B ikki marta kamayishini tekshiring.'],
  hint:'Zondni sudrang',
  params:[{id:'I1',label:'1-o‘tkazgichdagi tok',sym:'I₁',min:-30,max:30,step:1,val:20,unit:'A',d:0},{id:'I2',label:'2-o‘tkazgichdagi tok',sym:'I₂',min:-30,max:30,step:1,val:0,unit:'A',d:0},{id:'d',label:'O‘tkazgichlar orasidagi masofa',sym:'d',min:4,max:30,step:1,val:16,unit:'sm',d:0}],
  init:()=>({nd:null,pr:[0.07,0.05],drag:false}),
  B(P,x,y){const ws=[[-P.d/200,0,P.I1],[P.d/200,0,P.I2]];let bx=0,by=0;ws.forEach(([wx,wy,I])=>{if(!I)return;const dx=x-wx,dy=y-wy,r2=Math.max(1e-5,dx*dx+dy*dy),k=2e-7*I/r2;bx+=-dy*k;by+=dx*k;});return[bx,by];},
  step(S,P,dt){const sim=SIMS.find(s=>s.id==='tokmaydon');if(!S.nd)return;S.nd.forEach(n=>{const[bx,by]=sim.B(P,n.x,n.y),Bm=Math.hypot(bx,by);if(Bm<1e-9)return;const tg=Math.atan2(by,bx);let da=tg-n.a;da=Math.atan2(Math.sin(da),Math.cos(da));n.w+=(da*60*Math.min(1,0.3+Bm*1e5)-n.w*6)*dt;n.a+=n.w*dt;});},
  draw(c,W,H,S,P){grid(c,W,H,28);const sim=SIMS.find(s=>s.id==='tokmaydon'),sc=Math.min(W/0.5,H/0.32),cx=W/2,cy=H/2,X=x=>cx+x*sc,Y=y=>cy-y*sc;S.sc=sc;S.cx=cx;S.cy=cy;S.g={sc,cx,cy};
    if(!S.nd){S.nd=[];const st=0.03;for(let x=-0.24;x<=0.24;x+=st)for(let y=-0.15;y<=0.15;y+=st){const[bx,by]=sim.B(P,x,y);S.nd.push({x,y,a:(bx||by)?Math.atan2(by,bx):Math.PI/2,w:0});}}
    const ws=[[-P.d/200,P.I1],[P.d/200,P.I2]];
    ws.forEach(([wx,I])=>{if(!I)return;for(let r=0.02;r<0.3;r+=0.02){c.strokeStyle=rgba(I>0?'accent':'warm',Math.min(0.5,0.012/r));c.lineWidth=1;c.beginPath();c.arc(X(wx),Y(0),r*sc,0,TAU);c.stroke();}});
    S.nd.forEach(n=>{if(ws.some(([wx,I])=>I&&Math.hypot(n.x-wx,n.y)<0.018))return;const L=9,x=X(n.x),y=Y(n.y),ux=Math.cos(n.a),uy=-Math.sin(n.a);
      c.lineWidth=3;c.strokeStyle=C.red;c.beginPath();c.moveTo(x,y);c.lineTo(x+ux*L,y+uy*L);c.stroke();c.strokeStyle=rgba('muted',0.9);c.beginPath();c.moveTo(x,y);c.lineTo(x-ux*L,y-uy*L);c.stroke();disk(c,x,y,1.8,C.ink);});
    ws.forEach(([wx,I],i)=>{const x=X(wx),y=Y(0);if(!I&&i){disk(c,x,y,10,rgba('muted',0.25),rgba('muted',0.7));return;}disk(c,x,y,13,I>0?C.accent:C.warm,C.ink);
      if(I>0)disk(c,x,y,3.5,'#fff');else{line(c,x-6,y-6,x+6,y+6,'#fff',2.5);line(c,x-6,y+6,x+6,y-6,'#fff',2.5);}txt(c,'I'+(i?'₂':'₁')+' = '+Math.abs(I)+' A',x,y+28,C.ink,{align:'center',font:SMALL});});
    if(P.I1&&P.I2){const F=2e-7*P.I1*P.I2/(P.d/100),dir=F>0?1:-1,L=Math.min(70,12+Math.abs(F)*4e4);arrow(c,X(-P.d/200),Y(0)-30,X(-P.d/200)+dir*L,Y(0)-30,C.green,3,'F');arrow(c,X(P.d/200),Y(0)-30,X(P.d/200)-dir*L,Y(0)-30,C.green,3,'F');}
    const[px,py]=S.pr,[bx,by]=sim.B(P,px,py),Bm=Math.hypot(bx,by);disk(c,X(px),Y(py),7,null,C.ink);disk(c,X(px),Y(py),3,C.ink);if(Bm>1e-8){const L=Math.min(60,10+Bm*1e6*0.4);arrow(c,X(px),Y(py),X(px)+bx/Bm*L,Y(py)-by/Bm*L,C.violet,2.5,'B');}
    txt(c,'B = '+fmt(Bm*1e6,1)+' μT',X(px)+12,Y(py)+16,C.violet,{font:SMALL});
  },
  pointer(type,x,y,S,P){const wx=(x-S.cx)/S.sc,wy=(S.cy-y)/S.sc;if(type==='down'){if(Math.hypot(wx-S.pr[0],wy-S.pr[1])*S.sc<24){S.drag=true;return true;}return false;}if(type==='move'&&S.drag)S.pr=[clamp(wx,-0.25,0.25),clamp(wy,-0.16,0.16)];if(type==='up')S.drag=false;},
  read(S,P){const sim=SIMS.find(s=>s.id==='tokmaydon'),[bx,by]=sim.B(P,...S.pr),r=Math.hypot(S.pr[0]+P.d/200,S.pr[1]),F=2e-7*P.I1*P.I2/(P.d/100);
    return[['Zonddagi B',fmt(Math.hypot(bx,by)*1e6,2)+' μT'],['1-o‘tkazgichgacha r',fmt(r*100,1)+' sm'],['F/l (o‘zaro ta’sir)',P.I2&&P.I1?fmt(Math.abs(F)*1e3,3)+' mN/m':'—'],['Ta’sir turi',P.I2&&P.I1?(F>0?'tortishish':'itarish'):'—']];}
});
