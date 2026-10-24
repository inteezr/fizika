/* So‘nuvchi tebranishlar */
SIMS.push({id:'sonuvchi',cat:'teb',title:'So‘nuvchi tebranishlar',short:'x = A₀e^(−βt)cos ωt',
  sub:'Ishqalanish yoki muhit qarshiligi tebranish energiyasini asta-sekin issiqlikka aylantiradi. Amplituda eksponensial kamayadi, chastota esa biroz pasayadi.',
  formula:`<span><i>x</i> = <i>A</i><sub>0</sub> e<sup>−<i>βt</i></sup> cos <i>ωt</i></span><span class="alt"><i>β</i> = ${fr('<i>b</i>','2<i>m</i>')}, &nbsp;<i>ω</i> = √(<i>ω</i><sub>0</sub>² − <i>β</i>²)</span>`,
  text:['Prujinali mayatnikka tezlikka proporsional qarshilik kuchi F = −bv ta’sir etsin. Harakat tenglamasi mx″ = −kx − bx′. Uning yechimi — amplitudasi A₀e^(−βt) qonun bo‘yicha kamayadigan tebranish, bunda so‘nish koeffitsienti β = b/2m.','So‘nish kuchaygan sari tebranish chastotasi ω = √(ω₀² − β²) kamayadi. β ≥ ω₀ bo‘lganda tebranish umuman bo‘lmaydi: yuk muvozanat holatiga asta-sekin qaytadi (aperiodik harakat). Avtomobil amortizatorlari aynan shunday sozlanadi.'],
  legend:[['A₀','boshlang‘ich amplituda, m'],['β','so‘nish koeffitsienti, 1/s'],['b','qarshilik koeffitsienti, kg/s'],['ω₀','xususiy chastota √(k/m), rad/s']],
  tries:['b = 0 qiling: tebranish so‘nmaydi, energiya saqlanadi.','b ni oshirib boring: β ≥ ω₀ bo‘lganda yuk tebranmasdan muvozanatga qaytadi.','Grafikdagi qizil punktir — e^(−βt) qobiq chizig‘i. Tebranish cho‘qqilari unga tegib o‘tadi.'],
  params:[{id:'m',label:'Massa',sym:'m',min:0.2,max:3,step:0.1,val:1,unit:'kg',d:1,reset:1},{id:'k',label:'Bikrlik',sym:'k',min:5,max:80,step:1,val:30,unit:'N/m',d:0,reset:1},{id:'b',label:'Qarshilik koeffitsienti',sym:'b',min:0,max:12,step:0.1,val:0.8,unit:'kg/s',d:1,reset:1}],
  init:()=>({x:0.2,v:0,t:0,tr:[]}),
  step(S,P,dt){const n=20,h=dt/n;for(let i=0;i<n;i++){const a=(-P.k*S.x-P.b*S.v)/P.m;S.v+=a*h;S.x+=S.v*h;}S.t+=dt;S.tr.push([S.t,S.x]);if(S.t>14)Object.assign(S,{x:0.2,v:0,t:0,tr:[]});},
  draw(c,W,H,S,P){grid(c,W,H,28);const cy=H*0.24,wx=26,cx=W/2,sc=Math.min(W*0.9,700)/0.6;S.g={cy,cx,wx,sc};
    c.fillStyle=rgba('muted',0.35);c.fillRect(wx-12,cy-40,12,80);line(c,wx,cy-40,wx,cy+40,C.ink,2);line(c,wx,cy+26,W-20,cy+26,C.ink,1.5);
    const bx=cx+S.x*sc;springLine(c,wx,cy,bx-26,cy,14,10,C.ink,2);c.fillStyle=C.accent;rrect(c,bx-26,cy-24,52,48,6);c.fill();
    c.fillStyle=rgba('water',0.25);c.fillRect(wx,cy-40,W-20-wx,66);
    line(c,cx,cy-46,cx,cy+34,C.muted,1,[3,3]);
    const fd=-P.b*S.v;if(Math.abs(fd)>0.05)arrow(c,bx,cy-34,bx+fd*30,cy-34,C.red,2.5,'F_q');
    const gx=40,gr=W-16,gt=H*0.5,gb=H-24,gm=(gt+gb)/2,amp=(gb-gt)/2*0.92,T=14,X=t=>gx+t/T*(gr-gx),Yv=x=>gm-x/0.2*amp,beta=P.b/(2*P.m);
    line(c,gx,gm,gr,gm,C.muted,1);line(c,gx,gt,gx,gb,C.muted,1);txt(c,'x',gx-14,gt+4,C.muted,{font:MATH});txt(c,'t',gr-6,gm+14,C.muted,{font:MATH});
    c.setLineDash([5,4]);c.strokeStyle=rgba('red',0.7);c.lineWidth=1.5;[1,-1].forEach(sg=>{c.beginPath();for(let t=0;t<=T;t+=0.1){const y=Yv(sg*0.2*Math.exp(-beta*t));t?c.lineTo(X(t),y):c.moveTo(X(t),y);}c.stroke();});c.setLineDash([]);
    c.strokeStyle=C.accent;c.lineWidth=2.2;c.beginPath();S.tr.forEach(([t,x],i)=>i?c.lineTo(X(t),Yv(x)):c.moveTo(X(t),Yv(x)));c.stroke();disk(c,X(S.t),Yv(S.x),4,C.accent);
  },
  read(S,P){const w0=Math.sqrt(P.k/P.m),b=P.b/(2*P.m),w=w0*w0-b*b,E=(P.k*S.x**2+P.m*S.v**2)/2;
    return[['So‘nish koeffitsienti β',fmt(b,2)+' 1/s'],['ω₀ / ω',fmt(w0,2)+' / '+(w>0?fmt(Math.sqrt(w),2):'—')+' rad/s'],['Tebranish turi',w>0?'so‘nuvchi tebranish':'aperiodik (tebranishsiz)'],['Energiya',fmt(E*1000,1)+' mJ ('+fmt(E/(P.k*0.02)*100,0)+' %)']];}
});
