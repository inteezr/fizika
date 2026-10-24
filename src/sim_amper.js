/* Amper kuchi: relslardagi o‘tkazgich */
SIMS.push({id:'amper',cat:'mag',title:'Magnit maydonning tokli o‘tkazgichga ta’siri (Amper kuchi)',short:'F = BIl·sinα',
  sub:'Magnit maydonidagi tokli o‘tkazgichga kuch ta’sir qiladi. Uning yo‘nalishi chap qo‘l qoidasi bilan aniqlanadi.',
  formula:`<span><i>F</i><sub>A</sub> = <i>BIl</i> sin<i>α</i></span><span class="alt"><i>a</i> = ${fr('<i>F</i><sub>A</sub>','<i>m</i>')}</span>`,
  text:['Ikki metall rels ustida yengil o‘tkazgich (sterjen) yotibdi. Relslar orqali tok berilganda sterjendan tok o‘tadi va vertikal magnit maydon uni rels bo‘ylab itaradi.','Chap qo‘l qoidasi: magnit induksiya chiziqlari kaftga kirsin, to‘rt barmoq tok yo‘nalishini ko‘rsatsin — shunda ochilgan bosh barmoq kuch yo‘nalishini ko‘rsatadi. Elektr dvigatellar shu kuch hisobiga aylanadi.'],
  legend:[['B','magnit induksiyasi, T'],['I','tok kuchi, A'],['l','o‘tkazgichning maydondagi uzunligi, m'],['α','tok va B orasidagi burchak']],
  tries:['Tok yo‘nalishini almashtiring: sterjen teskari tomonga harakatlanadi.','Magnit maydon yo‘nalishini almashtiring — natija qanday?','B va I ni 2 martadan oshiring: kuch 4 marta ortadi.'],
  params:[{id:'B',label:'Magnit induksiyasi',sym:'B',min:-1,max:1,step:0.05,val:0.5,unit:'T',d:2},{id:'I',label:'Tok kuchi',sym:'I',min:-10,max:10,step:0.5,val:5,unit:'A',d:1},{id:'l',label:'Sterjen uzunligi',sym:'l',min:0.1,max:0.5,step:0.01,val:0.3,unit:'m',d:2}],
  init:()=>({x:0,v:0,s:0}),
  step(S,P,dt){const F=-P.B*P.I*P.l,a=F/0.2;S.v+=a*dt*0.4;S.x+=S.v*dt;if(Math.abs(S.x)>1){S.x=F>0?-0.9:F<0?0.9:0;S.v=0;}S.s+=P.I*dt*10;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.5,cy=H*0.5,rw=W*0.42,gap=P.l/0.5*H*0.5,y1=cy-gap/2,y2=cy+gap/2,rx=cx+S.x*rw*0.85,F=-P.B*P.I*P.l;S.g={cx,cy,rw,gap,rx};
    for(let x=30;x<W-10;x+=36)for(let y=24;y<H-10;y+=36){if(Math.abs(P.B)<0.02)continue;const a=Math.min(0.8,Math.abs(P.B));if(P.B>0)disk(c,x,y,2.5,rgba('violet',a));else{line(c,x-4,y-4,x+4,y+4,rgba('violet',a),1.5);line(c,x-4,y+4,x+4,y-4,rgba('violet',a),1.5);}}
    txt(c,P.B>0?'B — bizga qarab (⊙)':P.B<0?'B — bizdan uzoqqa (⊗)':'B = 0',16,16,C.violet);
    [y1,y2].forEach(y=>{c.fillStyle=rgba('muted',0.5);c.fillRect(cx-rw,y-4,rw*2,8);});c.fillStyle=C.ink;c.fillRect(cx-rw-26,y1-4,8,gap+8);line(c,cx-rw-22,y1,cx-rw,y1,C.ink,2.5);line(c,cx-rw-22,y2,cx-rw,y2,C.ink,2.5);txt(c,P.I>=0?'+':'−',cx-rw-36,y1,C.red,{align:'center',font:'600 15px sans-serif'});
    c.fillStyle=C.warm;rrect(c,rx-7,y1-12,14,gap+24,4);c.fill();for(let i=0;i<5;i++){const t=((i/5+S.s*0.02)%1+1)%1;disk(c,rx,P.I>=0?y2-t*gap:y1+t*gap,3,C.accent);}
    if(Math.abs(P.I)>0.1)arrow(c,rx+22,cy-30,rx+22,cy-30+(P.I>0?60:-60),C.accent,2,'I');if(Math.abs(F)>0.005)arrow(c,rx,cy,rx+clamp(F*120,-W*0.3,W*0.3),cy,C.green,3.5,'F');
  },
  read:(S,P)=>{const F=-P.B*P.I*P.l;return[['Amper kuchi F',fmt(Math.abs(F),3)+' N'],['Sterjen tezlanishi (m = 0,2 kg)',fmt(Math.abs(F)/0.2,2)+' m/s²'],['Kuch yo‘nalishi',Math.abs(F)<1e-4?'—':F>0?'o‘ngga':'chapga'],['Sterjen tezligi',fmt(Math.abs(S.v),2)+' m/s']];}
});
