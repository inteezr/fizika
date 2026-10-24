/* Elektroliz: Faradey qonuni */
const EZ_M=[{n:'Mis (Cu²⁺)',s:'Cu²⁺',M:63.55,z:2,col:'#d08a4a',sol:'#5aa9e6',an:'SO₄²⁻'},{n:'Kumush (Ag⁺)',s:'Ag⁺',M:107.87,z:1,col:'#d9dee6',sol:'#c9d6e3',an:'NO₃⁻'},{n:'Rux (Zn²⁺)',s:'Zn²⁺',M:65.38,z:2,col:'#9aa6b8',sol:'#cfd8e0',an:'SO₄²⁻'}];
SIMS.push({id:'elektroliz',cat:'tok',title:'Elektroliz va Faradey qonuni',short:'m = kIt',
  sub:'Elektrolit eritmasidan tok o‘tganda musbat ionlar katodga borib, metall sifatida o‘tiradi. Ajralgan modda massasi o‘tgan zaryad miqdoriga proporsional.',
  formula:`<span><i>m</i> = <i>k I t</i></span><span class="alt"><i>k</i> = ${fr('<i>M</i>','<i>z F</i>')}, &nbsp;<i>F</i> = 96 485 C/mol</span>`,
  text:['Eritmada tuz musbat (kation) va manfiy (anion) ionlarga ajraladi. Kuchlanish berilganda kationlar katodga (−), anionlar anodga (+) harakatlanadi. Katodda har bir Cu²⁺ ioni ikki elektron olib, mis atomiga aylanadi.','Faradeyning birinchi qonuni: m = kQ = kIt. Ikkinchi qonun: elektrokimyoviy ekvivalent k = M/(zF), bu yerda z — ion valentligi, F — Faradey doimiysi. Bir mol bir valentli ionni ajratish uchun 96 485 C zaryad kerak.'],
  legend:[['m','ajralgan modda massasi, g'],['k','elektrokimyoviy ekvivalent, mg/C'],['I','tok kuchi, A'],['t','vaqt, s'],['z','ion valentligi']],
  tries:['Tok kuchini ikki marta oshiring: bir xil vaqtda ikki marta ko‘p metall ajraladi.','Kumushni tanlang: z = 1 va M katta bo‘lgani uchun k misnikidan 3,4 marta katta.','Hisoblagichdagi vaqt tezlashtirilgan: animatsiyaning 1 soniyasi 1 daqiqaga teng.'],
  params:[{id:'mt',label:'Elektrolit',choices:EZ_M.map((m,i)=>[i,m.s]),val:0,reset:1},{id:'I',label:'Tok kuchi',sym:'I',min:0.2,max:5,step:0.1,val:2,unit:'A',d:1}],
  init:()=>{const io=[];for(let i=0;i<46;i++)io.push({x:Math.random(),y:Math.random(),p:i%2===0,ph:Math.random()*TAU});return{t:0,m:0,io,dep:[]};},
  step(S,P,dt){const M=EZ_M[P.mt],k=M.M/(M.z*96485),ts=dt*60;S.t+=ts;S.m+=k*P.I*ts;const sp=0.05*P.I;
    S.io.forEach(o=>{o.ph+=dt*3;o.x+=(o.p?-1:1)*sp*dt*(o.p?1/M.z*2:1)*0.6+Math.sin(o.ph)*0.002;o.y+=Math.cos(o.ph*1.3)*0.002;o.y=clamp(o.y,0.02,0.98);
      if(o.p&&o.x<0.02){S.dep.push(o.y);if(S.dep.length>120)S.dep.shift();o.x=0.98;o.y=Math.random();}if(!o.p&&o.x>0.98){o.x=0.02;o.y=Math.random();}});
    if(S.t>3600)Object.assign(S,SIMS.find(s=>s.id==='elektroliz').init(P));},
  draw(c,W,H,S,P,tt){grid(c,W,H,28);const M=EZ_M[P.mt],bx=W*0.08,bw=W*0.56,bt=H*0.22,bb=H-24,lx=bx+30,rx=bx+bw-30,ew=14,et=bt-30,eb=bb-30,X=f=>lx+ew/2+6+f*(rx-lx-ew-12),Yf=f=>bt+20+f*(eb-bt-30);S.g={bx,bw,bt,bb,lx,rx};
    c.fillStyle=M.sol;c.globalAlpha=0.35;c.fillRect(bx,bt+10,bw,bb-bt-10);c.globalAlpha=1;c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(bx,bt-10);c.lineTo(bx,bb);c.lineTo(bx+bw,bb);c.lineTo(bx+bw,bt-10);c.stroke();
    const th=Math.min(10,S.m*3);c.fillStyle='#6b7486';c.fillRect(lx-ew/2,et,ew,eb-et);c.fillStyle=M.col;c.fillRect(lx+ew/2,et+30,th,eb-et-30);c.fillRect(lx-ew/2-th,et+30,th,eb-et-30);
    c.fillStyle='#4a5160';c.fillRect(rx-ew/2,et,ew,eb-et);
    txt(c,'katod −',lx+12,et-10,C.accent,{});txt(c,'anod +',rx-12,et-10,C.red,{align:'right'});
    const wy=H*0.07;line(c,lx,et,lx,wy,C.ink,2);line(c,rx,et,rx,wy,C.ink,2);line(c,lx,wy,bx+bw*0.42,wy,C.ink,2);line(c,bx+bw*0.58,wy,rx,wy,C.ink,2);line(c,bx+bw*0.42,wy-8,bx+bw*0.42,wy+8,C.ink,4);line(c,bx+bw*0.47,wy-14,bx+bw*0.47,wy+14,C.ink,2);txt(c,'−',bx+bw*0.42-10,wy-14,C.ink,{align:'center'});txt(c,'+',bx+bw*0.47+10,wy-14,C.ink,{align:'center'});line(c,bx+bw*0.47,wy,bx+bw*0.58,wy,C.ink,2);
    txt(c,'I = '+fmt(P.I,1)+' A',bx+bw*0.5,wy+24,C.ink,{align:'center',font:SMALL});
    const e=(tt*P.I*0.4)%1;for(let i=0;i<6;i++){const f=(i/6+e)%1;disk(c,rx-(rx-bx-bw*0.58)*f,wy,3,C.accent);disk(c,bx+bw*0.42-(bx+bw*0.42-lx)*f,wy,3,C.accent);}
    S.io.forEach(o=>{const x=X(o.x),y=Yf(o.y);if(o.p){disk(c,x,y,6,M.col,C.ink);txt(c,'+',x,y+1,C.ink,{align:'center',font:SMALL});}else{disk(c,x,y,7,'#7a5fd1');txt(c,'−',x,y+1,'#fff',{align:'center',font:SMALL});}});
    S.dep.slice(-40).forEach((y,i)=>disk(c,lx+ew/2+th+2,Yf(y),2.2,M.col));
    txt(c,M.s+' → katod',bx+8,bb-12,C.ink,{font:SMALL});txt(c,M.an+' → anod',bx+bw-8,bb-12,C.ink,{font:SMALL,align:'right'});
    const gx=W*0.7,gw=W-gx-20,gt=H*0.16,gb=H*0.8,mm=M.M/(M.z*96485)*5*3600,Xt=t=>gx+t/3600*gw,Ym=m=>gb-m/mm*(gb-gt);line(c,gx,gb,gx+gw,gb,C.ink,1.2);line(c,gx,gb,gx,gt,C.ink,1.2);txt(c,'m, g',gx+4,gt-8,C.muted,{font:SMALL});txt(c,'t, min',gx+gw,gb-12,C.muted,{font:SMALL,align:'right'});
    const k=M.M/(M.z*96485);c.strokeStyle=rgba('muted',0.6);c.lineWidth=1;c.setLineDash([4,3]);c.beginPath();c.moveTo(Xt(0),Ym(0));c.lineTo(Xt(3600),Ym(k*P.I*3600));c.stroke();c.setLineDash([]);
    line(c,Xt(0),Ym(0),Xt(S.t),Ym(S.m),C.accent,2.5);disk(c,Xt(S.t),Ym(S.m),5,C.red);[0,20,40,60].forEach(v=>txt(c,v+'',Xt(v*60),gb+14,C.muted,{align:'center',font:SMALL}));
  },
  read(S,P){const M=EZ_M[P.mt],k=M.M/(M.z*96485);return[['Vaqt',fmt(S.t/60,1)+' min'],['O‘tgan zaryad Q = It',fmt(P.I*S.t,0)+' C'],['k = M/(zF)',fmt(k*1e3,3)+' mg/C'],['Ajralgan massa',fmt(S.m,3)+' g'],['Atomlar soni',fmt(S.m/M.M*6.022e23,2)]];}
});
