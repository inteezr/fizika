/* 9. To‘lqin */
SIMS.push({id:'tolqin',cat:'teb',title:'To‘lqin tezligi va to‘lqin uzunligi',short:'v = λν',
  sub:'Bir tebranish davrida to‘lqin bir to‘lqin uzunligiga teng masofaga tarqaladi.',
  formula:`<span><i>v</i> = <i>λν</i></span><span class="alt"><i>y</i> = <i>A</i> sin(<i>ωt</i> − <i>kx</i>) &nbsp; <i>λ</i> = <i>vT</i></span>`,
  text:['To‘lqin — tebranishning fazoda tarqalishi. Har bir zarra faqat o‘z joyida yuqori-pastga tebranadi (qizil zarraga qarang), to‘lqin shakli esa o‘ngga yuguradi.','Ikki qo‘shni o‘rkach orasidagi masofa to‘lqin uzunligi λ. Chastota — bir sekundda nechta to‘lqin o‘tishi. To‘lqin tezligi muhitga bog‘liq, amplitudaga emas.'],
  legend:[['v','to‘lqin tezligi, m/s'],['λ','to‘lqin uzunligi, m'],['ν','chastota, Hz'],['A','amplituda'],['T','davr, s']],
  tries:['Chastotani 2 marta oshiring: to‘lqin uzunligi 2 marta qisqaradi.','Amplitudani o‘zgartiring: λ va v o‘zgarmaydi.','Tezlikni oshiring (tezlik o‘zgarmasa): to‘lqinlar cho‘ziladi.'],
  params:[{id:'A',label:'Amplituda',sym:'A',min:0.3,max:2.5,step:0.1,val:1.4,unit:'sm',d:1},{id:'f',label:'Chastota',sym:'ν',min:0.2,max:3,step:0.05,val:0.8,unit:'Hz',d:2},{id:'v',label:'To‘lqin tezligi',sym:'v',min:0.5,max:6,step:0.1,val:2,unit:'m/s',d:1}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const x0=24,Lm=8,sc=(W-48)/Lm,y0=H*0.55,amp=P.A*(H*0.11),lam=P.v/P.f,k=TAU/lam,w=TAU*P.f;
    const Y=x=>y0-amp*Math.sin(w*S.t-k*x);line(c,x0,y0,W-24,y0,C.line,1,[4,5]);
    line(c,x0,y0-amp,W-24,y0-amp,C.line,1,[2,6]);txt(c,'A',x0-4,y0-amp/2,C.muted,{align:'right',font:MATH});
    c.strokeStyle=C.accent;c.lineWidth=2;c.beginPath();for(let px=0;px<=W-48;px+=3){const x=px/sc;px?c.lineTo(x0+px,Y(x)):c.moveTo(x0,Y(x));}c.stroke();
    const n=Math.floor((W-48)/18);for(let i=0;i<=n;i++){const x=i*18/sc;disk(c,x0+i*18,Y(x),3.2,C.accent);}
    const hx=2;line(c,x0+hx*sc,y0-amp-8,x0+hx*sc,y0+amp+8,rgba('red',0.5),1,[2,3]);disk(c,x0+hx*sc,Y(hx),7,C.red);
    let xc=(w*S.t-Math.PI/2)/k;while(xc<0.15)xc+=lam;while(xc-lam>0.15)xc-=lam;
    if(xc+lam<Lm){const a=x0+xc*sc,b=x0+(xc+lam)*sc,yy=y0-amp-26;line(c,a,yy,b,yy,C.warm,1.5);line(c,a,yy-6,a,yy+6,C.warm,1.5);line(c,b,yy-6,b,yy+6,C.warm,1.5);txt(c,'λ = '+fmt(lam)+' m',(a+b)/2,yy-12,C.warm,{align:'center'});}
    arrow(c,W-130,30,W-40,30,C.green,2.5);txt(c,'v',W-145,30,C.green,{font:MATH,align:'center'});
    for(let m=0;m<=Lm;m++)txt(c,m+'',x0+m*sc,H-14,C.muted,{align:'center'});txt(c,'x, m',W-8,H-30,C.muted,{align:'right'});
  },
  read:(S,P)=>[['To‘lqin uzunligi λ',fmt(P.v/P.f)+' m'],['Davr T',fmt(1/P.f)+' s'],['Siklik chastota ω',fmt(TAU*P.f)+' rad/s'],['To‘lqin soni k',fmt(TAU*P.f/P.v)+' rad/m']]
});
