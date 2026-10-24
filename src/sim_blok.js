/* Bloklar va polispast */
SIMS.push({id:'blok',cat:'sta',title:'Bloklar va mexanikaning oltin qoidasi',short:'F = mg / n',
  sub:'Qo‘zg‘almas blok kuchdan yutuq bermaydi, faqat yo‘nalishini o‘zgartiradi. Qo‘zg‘aluvchan blok kuchdan ikki marta yutuq beradi, lekin arqonni ikki marta ko‘p tortish kerak.',
  formula:`<span><i>F</i> = ${fr('<i>mg</i>','<i>n</i>')}</span><span class="alt"><i>F</i>·<i>s</i> = <i>mg</i>·<i>h</i> &nbsp;(<i>s</i> = <i>n h</i>)</span>`,
  text:['Yukni n ta arqon tarmog‘i ushlab tursa, har bir tarmoqdagi taranglik mg/n ga teng, shuning uchun tortish kuchi ham n marta kam. Qo‘zg‘almas blokda n = 1, bitta qo‘zg‘aluvchan blokda n = 2, ikki juft blokli polispastda n = 4.','Yuk h ga ko‘tarilsa, har bir tarmoq h ga qisqaradi, demak arqon uchini s = n·h ga tortish kerak. Bajarilgan ish F·s = (mg/n)·(nh) = mgh o‘zgarmaydi: kuchdan qancha yutsak, yo‘ldan shuncha yutqazamiz. Bu mexanikaning oltin qoidasi.'],
  legend:[['F','tortish kuchi, N'],['n','yukni ushlab turgan arqon tarmoqlari soni'],['s','arqon uchining siljishi, m'],['h','yukning ko‘tarilish balandligi, m']],
  tries:['Uchala sxemada ham F·s va mgh ustunlari tengligini tekshiring.','Polispastda yuk sekin ko‘tariladi: qo‘l 4 marta ko‘p yo‘l bosadi.','Massani oshiring: kuch ortadi, ammo F/mg nisbati o‘zgarmaydi.'],
  params:[{id:'m',label:'Yuk massasi',sym:'m',min:5,max:100,step:1,val:40,unit:'kg',d:0},{id:'mode',label:'Sxema',choices:[[0,'Qo‘zg‘almas'],[1,'Qo‘zg‘aluvchan'],[2,'Polispast']],val:1,reset:1}],
  init:()=>({s:0,dir:1,hold:0}),
  step(S,P,dt){const n=[1,2,4][P.mode],sm=1.6;if(S.hold>0){S.hold-=dt;if(S.hold<=0){S.dir=-S.dir;}return;}S.s+=S.dir*0.45*dt;if(S.s>=sm){S.s=sm;S.hold=0.8;}if(S.s<=0){S.s=0;S.hold=0.5;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const n=[1,2,4][P.mode],hgt=S.s/n,top=26,cx=W*0.3,pxm=Math.min(110,(H-120)/2.2),r=P.mode===2?12:22,py=top+44,ly0=H-70,ly=ly0-hgt*pxm,hy0=H*0.42,hy=hy0+S.s*pxm*0.32,bs=26+P.m*0.28;
    S.g={cx,top,py,ly,r,hy,pxm,n};
    c.fillStyle=rgba('muted',0.35);c.fillRect(cx-110,top-12,280,12);line(c,cx-110,top,cx+170,top,C.ink,2);
    const rope=(x1,y1,x2,y2)=>line(c,x1,y1,x2,y2,C.warm,2.5),pul=(x,y,rr,fixed)=>{if(fixed)line(c,x,top,x,y,C.ink,3);disk(c,x,y,rr,rgba('muted',0.35),C.ink);disk(c,x,y,3,C.ink);c.strokeStyle=C.ink;c.lineWidth=1;c.beginPath();c.arc(x,y,rr-4,0,TAU);c.stroke();};
    const arcR=(x,y,rr,a0,a1)=>{c.strokeStyle=C.warm;c.lineWidth=2.5;c.beginPath();c.arc(x,y,rr,a0,a1);c.stroke();};
    let hx,loadTop,lx=cx;
    if(P.mode===0){lx=cx-r;rope(cx-r,py,cx-r,ly-bs);arcR(cx,py,r,Math.PI,0);hx=cx+r;rope(hx,py,hx,hy);pul(cx,py,r,1);loadTop=ly-bs;}
    else if(P.mode===1){const my=ly-bs-r-6,fx=cx+r*2;rope(cx-r,top,cx-r,my);arcR(cx,my,r,0,Math.PI);rope(cx+r,my,cx+r,py);arcR(fx,py,r,Math.PI,0);hx=fx+r;rope(hx,py,hx,hy);pul(fx,py,r,1);pul(cx,my,r,0);line(c,cx,my,cx,ly-bs,C.ink,3);}
    else{const my=ly-bs-r-14,xs=[cx-36,cx-12,cx+12,cx+36];xs.forEach(x=>rope(x,x===cx-36?py:py,x,my));
      line(c,cx-36,top,cx-36,py,C.ink,2);arcR(cx-24,my,r,0,Math.PI);arcR(cx,py,r,Math.PI,0);arcR(cx+24,my,r,0,Math.PI);arcR(cx+48,py,r,Math.PI,0);hx=cx+60;rope(hx,py,hx,hy);
      pul(cx,py,r,1);pul(cx+48,py,r,1);pul(cx-24,my,r,0);pul(cx+24,my,r,0);line(c,cx-24,my,cx+24,my,C.ink,4);line(c,cx,my,cx,ly-bs,C.ink,3);}
    c.fillStyle=C.accent;rrect(c,lx-bs/2,ly-bs,bs,bs,5);c.fill();txt(c,P.m+' kg',lx,ly-bs/2,C.onaccent,{align:'center',font:SMALL});
    line(c,lx+bs/2+8,ly0,lx+bs/2+40,ly0,C.muted,1,[3,3]);if(hgt>0.01){arrow(c,lx+bs/2+30,ly0,lx+bs/2+30,ly,C.green,2,'h');}
    disk(c,hx,hy+8,9,rgba('warm',0.4),C.warm);const F=P.m*9.8/n,kf=Math.min(1,90/(P.m*9.8));arrow(c,hx,hy+18,hx,hy+18+F*kf,C.red,2.5,'F');
    line(c,hx+14,hy0,hx+44,hy0,C.muted,1,[3,3]);txt(c,'s = '+fmt(S.s,2)+' m',hx+18,hy0-10,C.muted,{font:SMALL});
    const gx=W*0.66,gw=W-gx-20,bt=H*0.2,bb=H*0.82,E=P.m*9.8*1.6/n,bw=Math.min(54,gw/3);
    [['F·s',F*S.s,C.red],['mgh',P.m*9.8*hgt,C.green]].forEach(([l,v],i)=>{const x=gx+i*(bw+24);c.fillStyle=rgba('muted',0.15);c.fillRect(x,bt,bw,bb-bt);c.fillStyle=l==='F·s'?C.red:C.green;c.fillRect(x,bb-v/E*(bb-bt),bw,v/E*(bb-bt));txt(c,l,x+bw/2,bb+14,C.ink,{align:'center',font:MATH});txt(c,fmt(v,0)+' J',x+bw/2,bt-10,C.ink,{align:'center',font:SMALL});});
  },
  read(S,P){const n=[1,2,4][P.mode],F=P.m*9.8/n;return[['Tarmoqlar soni n',String(n)],['Tortish kuchi F',fmt(F,1)+' N'],['Yuk og‘irligi mg',fmt(P.m*9.8,1)+' N'],['Ko‘tarilish h',fmt(S.s/n,2)+' m'],['Ish F·s = mgh',fmt(F*S.s,0)+' J']];}
});
