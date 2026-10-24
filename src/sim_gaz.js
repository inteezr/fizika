/* 17. Ideal gaz */
function gasBox(W,H,P){const x0=24,y0=24,h=H-48,wm=W*0.6-x0;return{x0,y0,h,w:wm*(P.V/30)};}
function newMol(g,T){const sp=8.5*Math.sqrt(T)*(0.55+Math.random()*0.9),a=Math.random()*TAU;return{x:4+Math.random()*(g.w-8),y:4+Math.random()*(g.h-8),vx:sp*Math.cos(a),vy:sp*Math.sin(a)};}
SIMS.push({id:'gaz',cat:'mol',title:'Ideal gaz holat tenglamasi',short:'pV = νRT',
  sub:'Gaz bosimi, hajmi va harorati Mendeleyev–Klapeyron tenglamasi bilan bog‘langan.',
  formula:`<span><i>pV</i> = <i>νRT</i></span><span class="alt"><i>Ē</i><sub>k</sub> = ${fr('3','2')}<i>kT</i></span>`,
  text:['Gaz bosimi molekulalarning idish devorlariga urilishidan hosil bo‘ladi. Harorat ortsa, molekulalar tezroq harakatlanadi (rangi qizarib boradi) va devorga kuchliroq, tez-tez uriladi.','Porshenni surib hajmni kamaytirsangiz, molekulalar devorga tez-tez urila boshlaydi va bosim ortadi. Monometr strelkasi tenglamadan hisoblangan bosimni ko‘rsatadi.'],
  legend:[['p','bosim, Pa'],['V','hajm, m³ (1 L = 10⁻³ m³)'],['ν','modda miqdori, mol'],['R','universal gaz doimiysi, 8,31 J/(mol·K)'],['T','absolyut harorat, K']],
  tries:['Haroratni 2 marta oshiring: bosim ham 2 marta ortadi (Sharl qonuni).','Hajmni 2 marta kamaytiring: bosim 2 marta ortadi (Boyl–Mariott qonuni).','Modda miqdorini oshiring: molekulalar ko‘payib, bosim ortadi.'],
  params:[{id:'T',label:'Harorat',sym:'T',min:100,max:1000,step:10,val:300,unit:'K',d:0},{id:'V',label:'Hajm',sym:'V',min:5,max:30,step:1,val:20,unit:'L',d:0},{id:'n',label:'Modda miqdori',sym:'ν',min:0.5,max:3,step:0.1,val:1,unit:'mol',d:1}],
  init:P=>({ps:[],T:P.T,hits:0,rate:0,acc:0,sp:[]}),
  step(S,P,dt){if(!S.W)return;const g=gasBox(S.W,S.H,P),N=Math.round(P.n*30);while(S.ps.length<N)S.ps.push(newMol(g,P.T));if(S.ps.length>N)S.ps.length=N;
    if(S.T!==P.T){const f=Math.sqrt(P.T/S.T);S.ps.forEach(m=>{m.vx*=f;m.vy*=f;});S.T=P.T;}
    for(const m of S.ps){m.x+=m.vx*dt;m.y+=m.vy*dt;if(m.x<4){m.x=4;m.vx=Math.abs(m.vx);}if(m.x>g.w-4){m.x=g.w-4;m.vx=-Math.abs(m.vx);S.hits++;if(S.sp.length<40)S.sp.push([m.y,0.25]);}if(m.y<4){m.y=4;m.vy=Math.abs(m.vy);}if(m.y>g.h-4){m.y=g.h-4;m.vy=-Math.abs(m.vy);}}
    S.sp.forEach(s=>s[1]-=dt);S.sp=S.sp.filter(s=>s[1]>0);S.acc+=dt;if(S.acc>=1){S.rate=S.hits/S.acc;S.hits=0;S.acc=0;}},
  draw(c,W,H,S,P){S.W=W;S.H=H;grid(c,W,H,28);const g=gasBox(W,H,P),px=g.x0+g.w;
    c.fillStyle=rgba('accent',0.05);c.fillRect(g.x0,g.y0,g.w,g.h);c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(px+6,g.y0);c.lineTo(g.x0,g.y0);c.lineTo(g.x0,g.y0+g.h);c.lineTo(px+6,g.y0+g.h);c.stroke();
    c.fillStyle=C.warm;c.fillRect(px,g.y0-4,10,g.h+8);c.fillStyle=C.muted;c.fillRect(px+10,g.y0+g.h/2-4,W*0.62-px+10,8);
    S.sp.forEach(s=>line(c,px-1,g.y0+s[0]-6,px-1,g.y0+s[0]+6,rgba('red',s[1]*4),3));
    const hue=230-(P.T-100)/900*230;c.fillStyle=`hsl(${hue},75%,55%)`;S.ps.forEach(m=>{c.beginPath();c.arc(g.x0+m.x,g.y0+m.y,4,0,TAU);c.fill();});
    const p=P.n*8.314*P.T/(P.V/1000)/1000,gx=W*0.83,gy=H*0.45,gr=Math.min(W*0.13,H*0.3),a0=Math.PI*0.75,sw=Math.PI*1.5,ang=v=>a0+sw*Math.sqrt(Math.min(v,5000)/5000);
    c.strokeStyle=C.line;c.lineWidth=8;c.beginPath();c.arc(gx,gy,gr,a0,a0+sw);c.stroke();c.strokeStyle=C.accent;c.beginPath();c.arc(gx,gy,gr,a0,ang(p));c.stroke();
    [0,100,500,1000,2500,5000].forEach(v=>{const a=ang(v);txt(c,v>=1000?(v/1000)+'k':v+'',gx+Math.cos(a)*(gr+16),gy+Math.sin(a)*(gr+16),C.muted,{align:'center',font:'500 10px "IBM Plex Mono", monospace'});});
    line(c,gx,gy,gx+Math.cos(ang(p))*(gr-12),gy+Math.sin(ang(p))*(gr-12),C.red,2.5);disk(c,gx,gy,5,C.ink);
    txt(c,fmt(p,0)+' kPa',gx,gy+gr*0.55,C.ink,{align:'center',font:'600 14px "IBM Plex Mono", monospace'});txt(c,'bosim',gx,gy+gr*0.55+18,C.muted,{align:'center'});
  },
  read:(S,P)=>{const p=P.n*8.314*P.T/(P.V/1000);return[['Bosim p',fmt(p/1000,1)+' kPa'],['Molekulalar soni N',fmt(P.n*6.02e23)],['O‘rtacha kinetik energiya',fmt(1.5*1.38e-23*P.T)+' J'],['Porshenga urilish',fmt(S.rate,0)+' marta/s (modelda)']];}
});
