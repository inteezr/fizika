/* 7. Prujinali mayatnik */
SIMS.push({id:'prujina',cat:'teb',title:'Prujinali mayatnik va Guk qonuni',short:'T = 2π√(m/k)',
  sub:'Prujinaning elastiklik kuchi jismni muvozanat holatiga qaytaradi va garmonik tebranish hosil bo‘ladi.',
  formula:`<span><i>T</i> = 2π${sq(fr('<i>m</i>','<i>k</i>'))}</span><span class="alt">Guk qonuni: <i>F</i> = −<i>kx</i></span>`,
  text:['Prujina cho‘zilganda yoki siqilganda deformatsiyaga proporsional elastiklik kuchi paydo bo‘ladi (to‘q sariq strelka). U doim muvozanat holatiga (x = 0) yo‘nalgan.','Jism muvozanat holatidan inersiya bilan o‘tib ketadi va tebrana boshlaydi. Pastdagi grafik siljishning vaqtga bog‘liqligini chizadi: bu sinusoida. Davr amplitudaga bog‘liq emas.'],
  legend:[['T','tebranish davri, s'],['m','yuk massasi, kg'],['k','prujina bikrligi, N/m'],['x','muvozanatdan siljish, m'],['A','amplituda, m']],
  tries:['Massani 4 marta oshiring: davr 2 marta ortadi.','Amplitudani o‘zgartiring: davr o‘zgarmaydi.','Bikrlikni oshiring: prujina «qattiqroq» bo‘lib, tebranish tezlashadi.'],
  params:[{id:'m',label:'Yuk massasi',sym:'m',min:0.2,max:5,step:0.1,val:1,unit:'kg',d:1},{id:'k',label:'Prujina bikrligi',sym:'k',min:5,max:200,step:1,val:40,unit:'N/m',d:0},{id:'A',label:'Amplituda',sym:'A',min:0.05,max:0.3,step:0.01,val:0.2,unit:'m',d:2,reset:1}],
  init:P=>({x:P.A,v:0,h:[]}),
  step(S,P,dt){const n=12,h=dt/n;for(let i=0;i<n;i++){S.v+=-P.k/P.m*S.x*h;S.x+=S.v*h;}S.h.push(S.x);if(S.h.length>600)S.h.shift();},
  draw(c,W,H,S,P){grid(c,W,H,28);const y=H*0.27,wx=26,eq=W*0.46,sc=W*0.8,bw=34+P.m*6,bx=eq+S.x*sc;
    c.fillStyle=rgba('muted',0.25);c.fillRect(0,y-46,wx,92);line(c,wx,y-46,wx,y+46,C.ink,3);line(c,wx,y+bw/2+2,W,y+bw/2+2,C.ink,1.5);
    [[-P.A,'−A'],[0,'x = 0'],[P.A,'+A']].forEach(([x,l])=>{line(c,eq+x*sc,y-50,eq+x*sc,y+bw/2,C.muted,1,[3,4]);txt(c,l,eq+x*sc,y-58,C.muted,{align:'center'});});
    springPath(c,wx,y,bx-bw/2,12,11,C.ink);c.fillStyle=C.accent;rrect(c,bx-bw/2,y-bw/2,bw,bw,5);c.fill();
    const F=-P.k*S.x;if(Math.abs(F)>0.3)arrow(c,bx,y,bx+clamp(F*1.8,-140,140),y,C.warm,3,'F');
    const gy0=H*0.72,gh=H*0.22,gs=gh/0.3,gx1=W-16;line(c,16,gy0,gx1,gy0,C.muted,1);txt(c,'x(t)',20,gy0-gh-2,C.muted);
    line(c,16,gy0-P.A*gs,gx1,gy0-P.A*gs,C.line,1,[3,4]);line(c,16,gy0+P.A*gs,gx1,gy0+P.A*gs,C.line,1,[3,4]);
    c.strokeStyle=C.accent;c.lineWidth=2;c.beginPath();const n=S.h.length,stp=1.5;for(let i=0;i<n;i++){const xx=gx1-(n-1-i)*stp;if(xx<16)continue;const yy=gy0-S.h[i]*gs;c.lineTo(xx,yy);}c.stroke();
    disk(c,gx1,gy0-S.x*gs,4,C.red);
  },
  read:(S,P)=>{const w=Math.sqrt(P.k/P.m);return[['Davr T',fmt(TAU/w)+' s'],['Chastota ν',fmt(w/TAU)+' Hz'],['Siljish x',fmt(S.x,3)+' m'],['To‘liq energiya',fmt(P.k*P.A*P.A/2,3)+' J']];}
});
