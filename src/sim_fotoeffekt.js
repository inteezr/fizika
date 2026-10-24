/* 18. Fotoeffekt */
SIMS.push({id:'fotoeffekt',cat:'yad',title:'Fotoeffekt uchun Eynshteyn tenglamasi',short:'hν = A + mv²/2',
  sub:'Foton energiyasi chiqish ishidan katta bo‘lsa, metalldan elektron uchib chiqadi.',
  formula:`<span><i>hν</i> = <i>A</i> + ${fr('<i>mv</i><sup>2</sup>','2')}</span><span class="alt"><i>λ</i><sub>max</sub> = ${fr('<i>hc</i>','<i>A</i>')} &nbsp; <i>h</i> = 6,63·10<sup>−34</sup> J·s</span>`,
  text:['Yorug‘lik fotonlar oqimi, har bir foton hν energiya olib keladi. Foton metallga urilib, energiyasini bitta elektronga beradi. Agar bu energiya chiqish ishi A dan katta bo‘lsa, elektron metalldan uchib chiqadi va ortiqcha energiya uning kinetik energiyasiga aylanadi.','Muhim tomoni: intensivlik fotonlar sonini, demak elektronlar sonini oshiradi, lekin elektronlar tezligini oshirmaydi. To‘lqin uzunligi qizil chegaradan katta bo‘lsa, yorug‘lik qanchalik kuchli bo‘lmasin, fotoeffekt bo‘lmaydi.'],
  legend:[['h','Plank doimiysi'],['ν','yorug‘lik chastotasi, ν = c/λ'],['A','metallning chiqish ishi, eV'],['mv²/2','elektronning maksimal kinetik energiyasi'],['λ_max','fotoeffektning qizil chegarasi']],
  tries:['To‘lqin uzunligini qizil chegaradan oshiring: elektronlar chiqmay qoladi.','Intensivlikni oshiring: elektronlar ko‘payadi, lekin tezligi o‘zgarmaydi.','Metallni misga almashtiring: faqat ultrabinafsha nur ishlaydi.'],
  params:[{id:'lam',label:'To‘lqin uzunligi',sym:'λ',min:150,max:700,step:5,val:400,unit:'nm',d:0},{id:'I',label:'Intensivlik',sym:'',min:1,max:10,step:1,val:5,unit:'',d:0},{id:'A',label:'Metall',sym:'',choices:[[2.14,'Seziy · 2,14 eV'],[2.28,'Natriy · 2,28 eV'],[4.3,'Rux · 4,3 eV'],[4.7,'Mis · 4,7 eV']],val:2.28}],
  init:()=>({ph:[],el:[],acc:0}),
  step(S,P,dt){if(!S.W)return;const W=S.W,H=S.H,lx=W*0.1,ly=H*0.16,py=H*0.8,E=1240/P.lam,Ek=E-P.A;S.acc+=dt*P.I*2.2;
    while(S.acc>=1){S.acc-=1;const tx=W*(0.22+Math.random()*0.38);S.ph.push({x:lx,y:ly,tx,ty:py,d:Math.hypot(tx-lx,py-ly),s:0});}
    S.ph.forEach(p=>{p.s+=260*dt;if(p.s>=p.d){p.dead=1;if(Ek>0){const sp=150*Math.sqrt(Ek),a=-Math.PI/2+(Math.random()-0.5)*1.3;S.el.push({x:p.tx,y:py,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp});}}});
    S.ph=S.ph.filter(p=>!p.dead);S.el.forEach(e=>{e.x+=e.vx*dt;e.y+=e.vy*dt;});S.el=S.el.filter(e=>e.y>-10&&e.x>-10&&e.x<W*0.7);},
  draw(c,W,H,S,P){S.W=W;S.H=H;grid(c,W,H,28);const lx=W*0.1,ly=H*0.16,py=H*0.8,col=wl2rgb(P.lam),E=1240/P.lam,Ek=E-P.A;
    c.fillStyle=rgba('muted',0.35);c.fillRect(W*0.2,py,W*0.42,16);line(c,W*0.2,py,W*0.62,py,C.ink,2);
    const mname={2.14:'Seziy',2.28:'Natriy',4.3:'Rux',4.7:'Mis'}[P.A];txt(c,mname,W*0.41,py+30,C.muted,{align:'center'});
    disk(c,lx,ly,16,col);disk(c,lx,ly,16,null,C.ink);txt(c,P.lam<380?'UB':'',lx,ly+30,C.muted,{align:'center'});
    S.ph.forEach(p=>{const ux=(p.tx-lx)/p.d,uy=(p.ty-ly)/p.d,cx=lx+ux*p.s,cy=ly+uy*p.s,L=22,k=TAU*(5-P.lam/200)/L;c.strokeStyle=col;c.lineWidth=2;c.beginPath();
      for(let i=0;i<=L;i+=1.5){const o=Math.sin(i*k)*4,x=cx-ux*i-uy*o,y=cy-uy*i+ux*o;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();});
    S.el.forEach(e=>{disk(c,e.x,e.y,4,C.accent);});
    if(Ek<=0)txt(c,'Foton energiyasi yetarli emas — elektron chiqmaydi',W*0.2,py-18,C.red);
    const bx=W*0.73,bw=Math.min(46,W*0.08),bb=H*0.85,bt=H*0.12,es=(bb-bt)/9;
    line(c,bx-10,bb,bx-10,bt,C.muted,1);for(let e=0;e<=9;e+=3)txt(c,e+' eV',bx-14,bb-e*es,C.muted,{align:'right'});
    c.fillStyle=col;c.fillRect(bx,bb-Math.min(E,9)*es,bw,Math.min(E,9)*es);txt(c,'hν',bx+bw/2,bb+14,C.ink,{align:'center',font:MATH});
    const x2=bx+bw+14;c.fillStyle=rgba('muted',0.45);c.fillRect(x2,bb-P.A*es,bw,P.A*es);txt(c,'A',x2+bw/2,bb+14,C.ink,{align:'center',font:MATH});
    if(Ek>0){c.fillStyle=C.green;c.fillRect(x2,bb-Math.min(E,9)*es,bw,Math.min(Ek,9-P.A)*es);txt(c,'Eₖ',x2+bw+6,bb-(P.A+Math.min(Ek,9-P.A)/2)*es,C.green,{font:MATH});}
  },
  read:(S,P)=>{const E=1240/P.lam,Ek=E-P.A;return[['Foton energiyasi hν',fmt(E)+' eV'],['Maks. kinetik energiya',Ek>0?fmt(Ek)+' eV':'0 (chiqmaydi)'],['Elektron tezligi',Ek>0?fmt(Math.sqrt(2*Ek*1.6e-19/9.11e-31)/1000,0)+' km/s':'—'],['Qizil chegara λₘₐₓ',fmt(1240/P.A,0)+' nm']];}
});
