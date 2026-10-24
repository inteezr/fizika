/* Tovush to‘lqini (bo‘ylama to‘lqin) */
SIMS.push({id:'tovush',cat:'teb',title:'Tovush — bo‘ylama mexanik to‘lqin',short:'λ = v/ν',
  sub:'Tovush havoda zichlashish va siyraklashishlar ketma-ketligi sifatida tarqaladi. Zarralar to‘lqin bilan birga ketmaydi, faqat o‘z o‘rnida oldinga-orqaga tebranadi.',
  formula:`<span><i>λ</i> = ${fr('<i>v</i>','<i>ν</i>')}</span><span class="alt"><i>v</i><sub>havo</sub> ≈ 340 m/s &nbsp; <i>v</i><sub>suv</sub> ≈ 1480 m/s</span>`,
  text:['Karnay membranasi tebranib, yonidagi havo qatlamlarini navbatma-navbat siqadi va siyraklashtiradi. Bu siqilishlar havo bo‘ylab tovush tezligida tarqaladi. Bitta qizil zarrani kuzating: u faqat joyida tebranadi.','Chastota qancha baland bo‘lsa, to‘lqin uzunligi shuncha qisqa va tovush shuncha ingichka eshitiladi. Amplituda tovush balandligini (qattiqligini) belgilaydi.'],
  legend:[['ν','chastota, Hz (inson qulog‘i 20–20 000 Hz)'],['λ','to‘lqin uzunligi, m'],['v','tovush tezligi muhitda'],['A','tebranish amplitudasi']],
  tries:['Chastotani oshiring: zichlashishlar bir-biriga yaqinlashadi.','Muhitni suvga almashtiring: to‘lqin uzunligi 4 marta ortadi.','Qizil zarra to‘lqin bilan birga ketmasligiga ishonch hosil qiling.'],
  params:[{id:'f',label:'Chastota',sym:'ν',min:100,max:1000,step:10,val:340,unit:'Hz',d:0},{id:'A',label:'Amplituda (balandlik)',sym:'A',min:0.1,max:1,step:0.05,val:0.6,unit:'',d:2},{id:'v',label:'Muhit',choices:[[340,'Havo'],[1480,'Suv'],[5000,'Po‘lat']],val:340}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const lam=P.v/P.f,x0=80,lpx=clamp(lam*130,26,W*0.8),k=TAU/lpx,w=TAU*0.8,A=P.A*Math.min(22,lpx*0.22);S.g={x0,lpx,A,k,w};
    const sp=12+Math.sin(w*S.t)*A*0.5;c.fillStyle=C.ink;c.fillRect(20,H*0.2,24,H*0.5);c.beginPath();c.moveTo(44,H*0.3);c.lineTo(44+sp,H*0.16);c.lineTo(44+sp,H*0.74);c.lineTo(44,H*0.6);c.fill();
    const rows=14,cols=Math.floor((W-x0)/9),yt=H*0.14,yb=H*0.66;for(let j=0;j<rows;j++){const y=yt+(j+0.5)*(yb-yt)/rows;for(let i=0;i<cols;i++){const xe=x0+i*9+((j*37)%9)*0.5,dx=A*Math.sin(k*(xe-x0)-w*S.t);disk(c,xe+dx,y,1.8,(i===Math.floor(cols*0.45)&&j===7)?C.red:rgba('accent',0.75));}}
    const gy=H*0.85,ga=H*0.1;line(c,x0,gy,W-10,gy,C.line,1);c.strokeStyle=C.warm;c.lineWidth=2.5;c.beginPath();for(let x=x0;x<W-10;x+=3){const y=gy+Math.cos(k*(x-x0)-w*S.t)*ga*P.A;x===x0?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();txt(c,'bosim o‘zgarishi Δp',x0,gy-ga-12,C.muted,{font:SMALL});
    const lx=x0+ (Math.PI/2+w*S.t)/k%lpx;line(c,x0+20,H*0.7,x0+20+lpx,H*0.7,C.green,2);line(c,x0+20,H*0.68,x0+20,H*0.72,C.green,2);line(c,x0+20+lpx,H*0.68,x0+20+lpx,H*0.72,C.green,2);txt(c,'λ',x0+20+lpx/2,H*0.7-10,C.green,{align:'center',font:MATH});
  },
  read:(S,P)=>[['To‘lqin uzunligi λ',fmt(P.v/P.f,3)+' m'],['Davr T',fmt(1000/P.f,2)+' ms'],['Tovush tezligi v',P.v+' m/s'],['Inson eshitadimi?',P.f>=20&&P.f<=20000?'ha':'yo‘q']]
});
