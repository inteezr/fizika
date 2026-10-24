/* ===== v8: Kvant fizikasi bo‘limi (kva) ===== */
const SUPN=n=>String(n).replace(/[-0-9]/g,ch=>'⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(ch)]);
CATS.push(['kva','Kvant fizikasi']);
const QH=6.62607e-34,QHB=1.054572e-34,QME=9.10938e-31,QE=1.602177e-19,QC=2.99792e8,QKB=1.380649e-23;
/* umumiy chizish yordamchilari */
function axes2(c,x0,y0,w,h,xl,yl){line(c,x0,y0+h,x0+w,y0+h,C.ink,1.2);line(c,x0,y0,x0,y0+h,C.ink,1.2);if(xl)txt(c,xl,x0+w,y0+h-8,C.muted,{align:'right',font:SMALL});if(yl)txt(c,yl,x0+4,y0-8,C.muted,{font:SMALL});}
function curve2(c,n,f,col,lw=2,dash){c.strokeStyle=col;c.lineWidth=lw;c.setLineDash(dash||[]);c.beginPath();let st=0;for(let i=0;i<=n;i++){const p=f(i/n);if(!p||!isFinite(p[1])){st=0;continue;}st?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);st=1;}c.stroke();c.setLineDash([]);}
function bbRGB(T){const t=T/100;let r,g,b;r=t<=66?255:329.7*Math.pow(t-60,-0.1332);g=t<=66?99.47*Math.log(t)-161.12:288.12*Math.pow(t-60,-0.0755);b=t>=66?255:t<=19?0:138.52*Math.log(t-10)-305.04;return[r,g,b].map(v=>Math.round(clamp(v,0,255)));}
const wlCol=l=>l<380?'rgba(160,110,255,0.75)':l>750?'rgba(150,40,40,0.7)':wl2rgb(l);
/* kompleks sonlar */
const cx_=(a,b)=>[a,b],cmul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],cdiv=(a,b)=>{const d=b[0]*b[0]+b[1]*b[1];return[(a[0]*b[0]+a[1]*b[1])/d,(a[1]*b[0]-a[0]*b[1])/d];},cadd=(a,b)=>[a[0]+b[0],a[1]+b[1]],csub=(a,b)=>[a[0]-b[0],a[1]-b[1]],cexp=z=>{const e=Math.exp(z[0]);return[e*Math.cos(z[1]),e*Math.sin(z[1])];},cabs2=a=>a[0]*a[0]+a[1]*a[1];

/* 1. Qora jism nurlanishi */
const planck=(l,T)=>{const x=QH*QC/(l*QKB*T);return x>700?0:2*QH*QC*QC/Math.pow(l,5)/(Math.exp(x)-1);};
SIMS.push({id:'qora',cat:'kva',title:'Absolyut qora jism nurlanishi',short:'λₘₐₓT = b',
  sub:'Qizdirilgan jism hamma to‘lqin uzunliklarida nur sochadi. Harorat ortsa, nurlanish keskin kuchayadi va spektr cho‘qqisi qisqa to‘lqinlar tomon suriladi.',
  formula:`<span><i>λ</i><sub>max</sub><i>T</i> = <i>b</i>, &nbsp;<i>M</i> = <i>σT</i>⁴</span><span class="alt"><i>B</i><sub>λ</sub> = ${fr('2<i>hc</i>²','<i>λ</i>⁵')}·${fr('1','<i>e</i><sup><i>hc</i>/<i>λkT</i></sup> − 1')}</span>`,
  text:['Absolyut qora jism unga tushgan hamma nurni yutadi va faqat o‘z haroratiga qarab nur sochadi. Klassik fizika (Reley–Jins formulasi) qisqa to‘lqinlarda cheksiz energiya bashorat qilgan — buni «ultrabinafsha halokat» deb atashgan.','1900-yilda Plank energiya faqat E = hν porsiyalar (kvantlar) bilan chiqariladi deb faraz qildi va tajribaga to‘liq mos formulani topdi. Shu bilan kvant fizikasi boshlandi. Vin qonuni: cho‘qqi λₘₐₓ = b/T, Stefan–Bolsman qonuni: to‘liq nurlanish quvvati T⁴ ga proporsional.'],
  legend:[['T','mutlaq harorat, K'],['λₘₐₓ','spektr cho‘qqisidagi to‘lqin uzunligi'],['b','Vin doimiysi, 2,898·10⁻³ m·K'],['σ','Stefan–Bolsman doimiysi, 5,67·10⁻⁸ W/(m²·K⁴)'],['M','1 m² sirtdan chiqadigan quvvat'],['h','Plank doimiysi, 6,63·10⁻³⁴ J·s']],
  tries:['Haroratni 2 marta oshiring: cho‘qqi 2 marta qisqa to‘lqinga suriladi, quvvat esa 16 marta ortadi.','T = 5800 K (Quyosh sirti) qiling: cho‘qqi ko‘rinadigan yorug‘lik o‘rtasida.','Reley–Jins egri chizig‘ini yoqing: qisqa to‘lqinlarda u cheksizlikka ketadi.'],
  params:[{id:'T',label:'Harorat',sym:'T',min:1000,max:10000,step:100,val:5800,unit:'K',d:0},{id:'rj',label:'Reley–Jins (klassik) egri chizig‘i',choices:[[0,'Yo‘q'],[1,'Ko‘rsatish']],val:0}],
  init:()=>({ph:[],acc:0,T:0,cdf:null,t:0}),
  step(S,P,dt){S.t+=dt;if(S.T!==P.T){S.T=P.T;const a=[];let s=0;for(let i=0;i<=300;i++){const l=(100+i*13)*1e-9;s+=planck(l,P.T)*l;a.push(s);}S.cdf=a.map(v=>v/s);}
    S.acc+=dt*Math.min(140,45*Math.pow(P.T/5800,3));while(S.acc>=1){S.acc--;const u=Math.random();let i=0;while(i<300&&S.cdf[i]<u)i++;S.ph.push({a:Math.random()*TAU,r:0,l:100+i*13});}
    S.ph.forEach(p=>p.r+=dt*240);S.ph=S.ph.filter(p=>p.r<700);},
  draw(c,W,H,S,P){grid(c,W,H,28);const bx=W*0.2,by=H*0.47,R=Math.min(W,H)*0.12,[r,g,b]=bbRGB(P.T),gl=c.createRadialGradient(bx,by,R*0.3,bx,by,R*2.6);gl.addColorStop(0,`rgba(${r},${g},${b},0.55)`);gl.addColorStop(1,`rgba(${r},${g},${b},0)`);c.fillStyle=gl;c.beginPath();c.arc(bx,by,R*2.6,0,TAU);c.fill();
    S.ph.forEach(p=>{const x=bx+Math.cos(p.a)*(R+p.r),y=by+Math.sin(p.a)*(R+p.r);if(x>W*0.42)return;c.fillStyle=wlCol(p.l);c.beginPath();c.arc(x,y,2.4,0,TAU);c.fill();});
    disk(c,bx,by,R,`rgb(${r},${g},${b})`);txt(c,fmt(P.T,0)+' K',bx,by+R+22,C.ink,{align:'center'});
    const gx=W*0.47,gw=W-gx-26,gt=34,gh=H-90,lmax=3000,Bm=planck(2.898e-3/P.T,P.T)*1.18,X=l=>gx+l/lmax*gw,Y=v=>gt+gh-v/Bm*gh;S.g={bx,by,R,gx,gw,gt,gh,Bm};
    for(let l=380;l<750;l+=4){c.fillStyle=wl2rgb(l);c.globalAlpha=0.55;c.fillRect(X(l),gt+gh+3,X(l+4)-X(l)+0.5,8);}c.globalAlpha=1;
    axes2(c,gx,gt,gw,gh,'λ, nm','B_λ');for(let l=0;l<=lmax;l+=500){line(c,X(l),gt+gh,X(l),gt+gh+5,C.muted,1);txt(c,String(l),X(l),gt+gh+22,C.muted,{align:'center',font:SMALL});}
    [0.6,0.8].forEach(k=>{const T2=P.T*k;curve2(c,200,u=>{const l=40+u*(lmax-40);return[X(l),Y(planck(l*1e-9,T2))];},rgba('muted',0.6),1.3,[5,4]);});
    c.fillStyle=rgba('accent',0.14);c.beginPath();c.moveTo(X(40),Y(0));for(let i=0;i<=240;i++){const l=40+i/240*(lmax-40);c.lineTo(X(l),Y(planck(l*1e-9,P.T)));}c.lineTo(X(lmax),Y(0));c.fill();
    curve2(c,240,u=>{const l=40+u*(lmax-40);return[X(l),Y(planck(l*1e-9,P.T))];},C.accent,2.5);
    if(P.rj)curve2(c,200,u=>{const l=150+u*(lmax-150),v=2*QC*QKB*P.T/Math.pow(l*1e-9,4);return v>Bm*1.2?null:[X(l),Y(v)];},C.red,2,[6,4]);
    const lm=2.898e-3/P.T*1e9;line(c,X(lm),gt,X(lm),gt+gh,C.warm,1.3,[4,4]);txt(c,'λₘₐₓ = '+fmt(lm,0)+' nm',Math.min(X(lm)+6,gx+gw-120),gt+12,C.warm,{font:SMALL});
    txt(c,fmt(P.T*0.8,0)+' K',X(2.898e-3/(P.T*0.8)*1e9)+4,Y(planck(2.898e-3/(P.T*0.8),P.T*0.8))-8,C.muted,{font:SMALL});},
  read(S,P){const lm=2.898e-3/P.T*1e9,M=5.670e-8*Math.pow(P.T,4);return[['Spektr cho‘qqisi λₘₐₓ',fmt(lm,0)+' nm'],['Cho‘qqi sohasi',lm<380?'ultrabinafsha':lm<750?'ko‘rinadigan':'infraqizil'],['Nurlanish quvvati M',fmt(M/1e6,2)+' MW/m²'],['Quyoshga nisbatan',fmt(Math.pow(P.T/5800,4),3)+' marta'],['Rangi',P.T<1800?'to‘q qizil':P.T<3200?'qizil-to‘q sariq':P.T<4800?'sariq':P.T<6800?'oq-sariq':'havorang-oq']];}
});

/* 2. Kompton effekti */
SIMS.push({id:'kompton',cat:'kva',title:'Kompton effekti',short:'Δλ = λc(1 − cosθ)',
  sub:'Rentgen fotoni erkin elektrondan sochilganda uning to‘lqin uzunligi ortadi. Bu fotonning impulsi borligini va u zarra kabi to‘qnashishini isbotlaydi.',
  formula:`<span>Δ<i>λ</i> = ${fr('<i>h</i>','<i>m</i><sub>e</sub><i>c</i>')}(1 − cos<i>θ</i>)</span><span class="alt"><i>λ</i><sub>c</sub> = 2,426 pm, &nbsp;<i>p</i> = ${fr('<i>h</i>','<i>λ</i>')}</span>`,
  text:['Foton E = hc/λ energiya va p = h/λ impulsga ega. U tinch turgan elektronga urilganda bilyard sharlari kabi to‘qnashadi: energiya va impuls saqlanadi. Elektron energiyaning bir qismini olib, θ burchakka sochilgan fotonning energiyasi kamayadi, to‘lqin uzunligi esa ortadi.','To‘lqin uzunligining ortishi faqat sochilish burchagiga bog‘liq va boshlang‘ich λ ga bog‘liq emas. Eng katta o‘zgarish orqaga sochilishda (θ = 180°): Δλ = 2λc ≈ 4,85 pm. Shuning uchun effekt faqat qisqa to‘lqinli rentgen va gamma nurlarda sezilarli. Kompton 1923-yilda shu kashfiyot uchun Nobel mukofotini olgan.'],
  legend:[['λ, λ′','tushgan va sochilgan foton to‘lqin uzunligi'],['θ','fotonning sochilish burchagi'],['λc','elektronning Kompton to‘lqin uzunligi, 2,426 pm'],['φ','elektronning uchish burchagi'],['mₑ','elektron massasi']],
  tries:['θ = 180° qiling: Δλ = 4,85 pm — eng katta qiymat.','λ ni 2 pm ga kamaytiring: endi foton energiyasining katta qismi elektronga o‘tadi.','θ = 0° da foton o‘zgarmaydi va elektron tinch qoladi.'],
  params:[{id:'l0',label:'Tushgan foton to‘lqin uzunligi',sym:'λ',min:1,max:80,step:0.5,val:10,unit:'pm',d:1},{id:'th',label:'Sochilish burchagi',sym:'θ',min:0,max:180,step:1,val:90,unit:'°',d:0}],
  init:()=>({t:0}),
  step(S,P,dt){S.t=(S.t+dt)%3.6;},
  calc(P){const lc=2.4263,th=P.th*D2R,l1=P.l0+lc*(1-Math.cos(th)),p0=1/P.l0,p1=1/l1,px=p0-p1*Math.cos(th),py=-p1*Math.sin(th);return{l1,dl:l1-P.l0,E0:1239.84/P.l0,E1:1239.84/l1,phi:Math.atan2(-py,px),pe:Math.hypot(px,py)/p0};},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),ex=W*0.42,ey=H*0.48,t=S.t,tc=1.2,th=P.th*D2R,L=Math.min(W*0.36,H*0.4);S.g={ex,ey,L};
    const wave=(x1,y1,x2,y2,lam,col,ph)=>{const dx=x2-x1,dy=y2-y1,d=Math.hypot(dx,dy);if(d<2)return;const ux=dx/d,uy=dy/d,per=6+lam*1.5;c.strokeStyle=col;c.lineWidth=2.2;c.beginPath();for(let s=0;s<=d;s+=2){const a=Math.sin((s-ph)/per*TAU)*7;const x=x1+ux*s-uy*a,y=y1+uy*s+ux*a;s?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();};
    line(c,ex-L*1.2,ey,ex+L*1.05,ey,rgba('muted',0.35),1,[4,4]);
    if(t<tc){const hx=ex-L*1.1+(L*1.1)*t/tc;wave(Math.max(ex-L*1.2,hx-140),ey,hx,ey,P.l0,'#b07cff',t*300);disk(c,ex,ey,9,C.accent);}
    else{const u=Math.min(1,(t-tc)/1.6),d1=L*u,sx=ex+Math.cos(th)*d1,sy=ey-Math.sin(th)*d1;wave(ex+Math.cos(th)*Math.max(0,d1-140),ey-Math.sin(th)*Math.max(0,d1-140),sx,sy,q.l1,'#ff8a5a',t*300);
      const de=L*0.9*u*Math.min(1,q.pe*1.4+0.1),el=[ex+Math.cos(q.phi)*de,ey+Math.sin(q.phi)*de];line(c,ex,ey,el[0],el[1],rgba('accent',0.4),1.5,[3,3]);disk(c,el[0],el[1],9,C.accent);txt(c,'e⁻',el[0]+12,el[1]+4,C.accent,{font:MATH});}
    c.strokeStyle=C.warm;c.lineWidth=1.3;c.beginPath();c.arc(ex,ey,40,-th,0);c.stroke();txt(c,'θ',ex+46*Math.cos(th/2),ey-46*Math.sin(th/2),C.warm,{font:MATH,align:'center'});
    if(q.pe>1e-6){c.strokeStyle=C.accent;c.beginPath();c.arc(ex,ey,30,0,q.phi);c.stroke();txt(c,'φ',ex+40*Math.cos(q.phi/2),ey+40*Math.sin(q.phi/2),C.accent,{font:MATH,align:'center'});}
    txt(c,'λ = '+fmt(P.l0,1)+' pm',ex-L*1.15,ey-24,'#b07cff',{font:SMALL});txt(c,'λ′ = '+fmt(q.l1,2)+' pm',ex+Math.cos(th)*L*0.62+8,ey-Math.sin(th)*L*0.62-12,'#ff8a5a',{font:SMALL});
    const gx=W*0.74,gw=W-gx-20,gt=40,gh=H*0.42,X=a=>gx+a/180*gw,Y=v=>gt+gh-v/5*gh;axes2(c,gx,gt,gw,gh,'θ, °','Δλ, pm');curve2(c,90,u=>[X(u*180),Y(2.4263*(1-Math.cos(u*Math.PI)))],C.accent,2);disk(c,X(P.th),Y(q.dl),5,C.red);
    [0,90,180].forEach(a=>txt(c,String(a),X(a),gt+gh+12,C.muted,{align:'center',font:SMALL}));
    const bx=gx,bw=gw,by=gt+gh+50,bh=14;txt(c,'Energiya ulushi',bx,by-8,C.muted,{font:SMALL});c.fillStyle='#ff8a5a';c.fillRect(bx,by,bw*q.E1/q.E0,bh);c.fillStyle=C.accent;c.fillRect(bx+bw*q.E1/q.E0,by,bw*(1-q.E1/q.E0),bh);txt(c,'foton',bx,by+bh+12,'#ff8a5a',{font:SMALL});txt(c,'elektron',bx+bw,by+bh+12,C.accent,{font:SMALL,align:'right'});},
  read(S,P){const q=this.calc(P);return[['Sochilgan λ′',fmt(q.l1,3)+' pm'],['Δλ',fmt(q.dl,3)+' pm'],['Foton energiyasi oldin / keyin',fmt(q.E0,1)+' / '+fmt(q.E1,1)+' keV'],['Elektron kinetik energiyasi',fmt(q.E0-q.E1,2)+' keV'],['Elektron uchish burchagi φ',fmt(q.phi/D2R,1)+'°']];}
});

/* 3. De Broyl to‘lqinlari */
const DB_P=[['Elektron',9.109e-31,1],['Proton',1.6726e-27,1],['Neytron',1.6749e-27,1],['Alfa zarra',6.644e-27,1],['Chang zarrasi (1 μg)',1e-9,0],['Tennis to‘pi (58 g)',0.058,0]];
SIMS.push({id:'debroyl',cat:'kva',title:'De Broyl to‘lqinlari',short:'λ = h/p',
  sub:'Har qanday harakatlanayotgan zarra to‘lqin xossasiga ega. Uning to‘lqin uzunligi impulsga teskari proporsional: yengil va sekin zarralarda u katta, og‘ir jismlarda esa juda kichik.',
  formula:`<span><i>λ</i> = ${fr('<i>h</i>','<i>p</i>')} = ${fr('<i>h</i>','<i>mv</i>')}</span><span class="alt">elektron uchun: <i>λ</i> = ${fr('1,226 nm','√<i>U</i>')}</span>`,
  text:['1924-yilda Lui de Broyl yorug‘lik to‘lqin va zarra bo‘lgani kabi, elektron ham to‘lqin bo‘lishi kerak deb taklif qildi. 1927-yilda elektronlar kristalldan o‘tganda difraksiya manzarasi kuzatilib, bu gipoteza tasdiqlandi.','Elektron mikroskop shu xossaga asoslangan: elektronning to‘lqin uzunligi yorug‘liknikidan minglab marta qisqa, shuning uchun u atomlarni ham ko‘rsata oladi. Tennis to‘pining to‘lqin uzunligi esa atom yadrosidan ham trillionlab marta kichik — shuning uchun kundalik hayotda to‘lqin xossalari sezilmaydi.'],
  legend:[['λ','de Broyl to‘lqin uzunligi'],['h','Plank doimiysi'],['p','zarra impulsi'],['m','zarra massasi'],['v','zarra tezligi']],
  tries:['Elektronni protonga almashtiring: bir xil tezlikda λ 1836 marta kichrayadi.','Elektron tezligini 2 marta oshiring: λ 2 marta qisqaradi.','Tennis to‘pini tanlang: λ shkalaning eng chetiga tushadi.'],
  params:[{id:'pt',label:'Zarra',choices:DB_P.map((p,i)=>[i,p[0]]),val:0},{id:'v',label:'Tezlik',sym:'v',min:1,max:3000,step:1,val:1000,unit:'km/s',d:0}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  calc(P){const m=DB_P[P.pt][1],v=P.v*1e3,g=1/Math.sqrt(1-Math.min(0.999999,(v/QC)**2)),p=g*m*v;return{m,v,p,l:QH/p,K:(g-1)*m*QC*QC};},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),top=H*0.36,x0=40,x1=W-40;S.g={top,x0,x1};
    const lg=Math.log10(q.l),e=Math.floor(lg),scale=Math.pow(10,e+1)/(x1-x0)*6,lpx=q.l/scale,cx=x0+((S.t*90)%(x1-x0)),sig=Math.max(60,lpx*2.2);
    if(DB_P[P.pt][2]){c.strokeStyle=C.accent;c.lineWidth=2.2;c.beginPath();for(let x=x0;x<=x1;x+=1.5){const d=x-cx,y=top-Math.exp(-d*d/(2*sig*sig))*Math.cos(d/lpx*TAU)*46;x===x0?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();}
    else txt(c,'to‘lqin xossasi sezilmaydi: λ juda kichik',W/2,top-50,C.muted,{align:'center'});
    disk(c,cx,top,DB_P[P.pt][2]?7:16,DB_P[P.pt][2]?C.warm:'#d8e86a');
    const sb=Math.pow(10,e+1)/scale;line(c,x0,top+70,x0+sb,top+70,C.ink,2);line(c,x0,top+64,x0,top+76,C.ink,2);line(c,x0+sb,top+64,x0+sb,top+76,C.ink,2);txt(c,'10'+SUPN(e+1)+' m',x0+sb+10,top+70,C.ink,{font:SMALL});
    const ry=H-70,rx0=40,rx1=W-40,L0=-36,L1=-2,R=v=>rx0+(v-L0)/(L1-L0)*(rx1-rx0);line(c,rx0,ry,rx1,ry,C.ink,1.5);
    for(let k=L0;k<=L1;k+=2){line(c,R(k),ry-4,R(k),ry+4,C.muted,1);if(k%4===0)txt(c,'10'+SUPN(k),R(k),ry+16,C.muted,{align:'center',font:SMALL});}
    [[-15,'yadro',0],[-10,'atom',0],[-7,'virus',0],[-6.3,'yorug‘lik',1],[-5,'hujayra',2]].forEach(([k,n,lv])=>{line(c,R(k),ry-10-lv*14,R(k),ry,C.green,1.5);txt(c,n,R(k),ry-18-lv*14,C.green,{align:'center',font:SMALL});});
    const pl=clamp(lg,L0,L1);c.fillStyle=C.red;c.beginPath();c.moveTo(R(pl),ry-2);c.lineTo(R(pl)-7,ry-16);c.lineTo(R(pl)+7,ry-16);c.fill();txt(c,'λ',R(pl),ry-26,C.red,{align:'center',font:MATH});},
  read(S,P){const q=this.calc(P),u=q.l>=1e-9?[q.l*1e9,'nm']:q.l>=1e-12?[q.l*1e12,'pm']:[q.l,'m'];return[['Impuls p',fmt(q.p,3)+' kg·m/s'],['To‘lqin uzunligi λ',(u[1]==='m'?fmt(u[0],2):fmt(u[0],3))+' '+u[1]],['Atom o‘lchamiga nisbati',fmt(q.l/1e-10,3)],['Kinetik energiya',q.K/QE<1e6?fmt(q.K/QE,3)+' eV':fmt(q.K,3)+' J']];}
});

/* 4. Elektronlarning ikki tirqishdan o‘tishi */
SIMS.push({id:'ikkitirqish',cat:'kva',title:'Elektronlar bilan ikki tirqish tajribasi',short:'Δx = λL/d',
  sub:'Elektronlar ekranga bittadan, nuqta-nuqta bo‘lib tushadi, lekin ko‘p elektron yig‘ilganda interferensiya manzarasi paydo bo‘ladi. Elektron qaysi tirqishdan o‘tganini o‘lchasangiz, manzara yo‘qoladi.',
  formula:`<span><i>I</i>(<i>x</i>) ∝ cos²(${fr('π<i>dx</i>','<i>λL</i>')})·sinc²(${fr('π<i>ax</i>','<i>λL</i>')})</span><span class="alt">Δ<i>x</i> = ${fr('<i>λL</i>','<i>d</i>')}, &nbsp;<i>λ</i> = ${fr('<i>h</i>','√(2<i>meU</i>)')}</span>`,
  text:['Har bir elektron ekranning bitta nuqtasiga uriladi — u zarra kabi. Lekin qaysi nuqtaga tushishi ehtimoliy: ehtimollik to‘lqin funksiyasi kvadrati |ψ|² ga teng. Elektron to‘lqini ikkala tirqishdan bir vaqtda o‘tib, o‘zi bilan interferensiyalashadi.','Agar tirqishlar yoniga detektor qo‘yib, elektron qaysi tirqishdan o‘tganini aniqlasak, to‘lqin funksiyasi bitta tirqishga «yig‘iladi» va interferensiya yo‘qoladi — ekranda ikki tirqishning oddiy yig‘indisi qoladi. Kvant mexanikasida o‘lchash tizimga ta’sir qiladi.'],
  legend:[['λ','elektronning de Broyl to‘lqin uzunligi'],['U','tezlatuvchi kuchlanish'],['d','tirqishlar orasidagi masofa'],['a','tirqish kengligi'],['L','tirqishdan ekrangacha masofa, 1 m'],['Δx','qo‘shni yo‘llar orasi']],
  tries:['Bir necha yuz elektron yig‘ilishini kuting: yo‘llar asta-sekin paydo bo‘ladi.','Detektorni yoqing va ekranni tozalang: interferensiya yo‘llari yo‘qoladi.','Kuchlanishni 4 marta oshiring: λ 2 marta qisqarib, yo‘llar zichlashadi.'],
  tools:[{id:'clr',label:'Ekranni tozalash',act:1}],
  params:[{id:'U',label:'Tezlatuvchi kuchlanish',sym:'U',min:50,max:5000,step:50,val:600,unit:'V',d:0},{id:'d',label:'Tirqishlar orasi',sym:'d',min:100,max:800,step:10,val:300,unit:'nm',d:0},{id:'a',label:'Tirqish kengligi',sym:'a',min:20,max:120,step:5,val:60,unit:'nm',d:0},{id:'det',label:'Qaysi tirqish detektori',choices:[[0,'O‘chiq'],[1,'Yoqilgan']],val:0},{id:'rate',label:'Elektronlar oqimi',sym:'',min:5,max:400,step:5,val:80,unit:'e/s',d:0}],
  init:()=>({hits:[],fly:[],acc:0}),
  action(id,S){if(id==='clr'){S.hits=[];}},
  I(x,P){const lam=1.2264/Math.sqrt(P.U)*1e-9,L=1,b=Math.PI*P.a*1e-9*x/(lam*L),s=Math.abs(b)<1e-9?1:Math.sin(b)/b,cc=P.det?0.5:Math.cos(Math.PI*P.d*1e-9*x/(lam*L))**2;return s*s*cc;},
  step(S,P,dt){const XW=1e-3;S.acc+=P.rate*dt;while(S.acc>=1){S.acc--;let x,k=0;do{x=(Math.random()*2-1)*XW;k++;}while(Math.random()>this.I(x,P)/(P.det?0.5:1)&&k<400);S.fly.push({x,t:0,sl:Math.random()<0.5?-1:1});}
    S.fly.forEach(f=>{f.t+=dt*1.6;if(f.t>=1&&!f.done){f.done=1;S.hits.push(f.x);}});S.fly=S.fly.filter(f=>!f.done);if(S.hits.length>6000)S.hits.splice(0,S.hits.length-6000);},
  draw(c,W,H,S,P){grid(c,W,H,28);const gx=50,wx=W*0.36,sx=W*0.66,cy=H/2,sh=H*0.42,XW=1e-3,Ys=x=>cy-x/XW*sh;S.g={gx,wx,sx,cy,sh};
    c.fillStyle='#4a5160';rrect(c,gx-30,cy-16,40,32,5);c.fill();txt(c,'e⁻',gx-10,cy,'#fff',{align:'center'});
    const gap=Math.min(sh*0.4,10+P.d/800*sh*0.6),sw=4+P.a/120*8;c.fillStyle=C.ink;c.fillRect(wx-4,cy-sh-10,8,sh+10-gap-sw/2);c.fillRect(wx-4,cy-gap+sw/2,8,2*gap-sw);c.fillRect(wx-4,cy+gap+sw/2,8,sh+10-gap-sw/2);
    if(P.det){[-1,1].forEach(s=>{disk(c,wx+18,cy+s*gap,6,C.red);});txt(c,'detektor',wx+28,cy-gap-16,C.red,{font:SMALL});}
    S.fly.forEach(f=>{let x,y;if(f.t<0.45){const u=f.t/0.45;x=gx+(wx-gx)*u;y=cy;}else{const u=(f.t-0.45)/0.55,y0=P.det?cy+f.sl*gap:cy;x=wx+(sx-wx)*u;y=y0+(Ys(f.x)-y0)*u;}c.fillStyle=rgba('accent',0.8);c.beginPath();c.arc(x,y,P.det||f.t<0.45?3:5,0,TAU);c.fill();});
    c.fillStyle=GL.dark?'#05070d':'#1b2233';c.fillRect(sx,cy-sh,16,2*sh);c.fillStyle='#7fe7ff';S.hits.forEach((x,i)=>{const y=Ys(x),jx=((i*7919)%97)/97*14;c.fillRect(sx+1+jx,y,1.6,1.6);});
    const nb=120,hb=new Array(nb).fill(0);S.hits.forEach(x=>{const b=Math.floor((x/XW+1)/2*nb);if(b>=0&&b<nb)hb[b]++;});const hm=Math.max(5,...hb),hx=sx+28,hw=W-hx-16;
    hb.forEach((v,b)=>{const y=cy+sh-(b+1)/nb*2*sh;c.fillStyle=rgba('accent',0.6);c.fillRect(hx,y,v/hm*hw*0.9,2*sh/nb-0.5);});
    const th=[];let mx=0;for(let i=0;i<=200;i++){const x=(i/100-1)*XW,v=this.I(x,P);th.push([x,v]);mx=Math.max(mx,v);}const sum=th.reduce((s,a)=>s+a[1],0)/201*nb,scl=S.hits.length/sum;
    if(S.hits.length>30)curve2(c,200,u=>{const [x,v]=th[Math.round(u*200)];return[hx+v*scl/hm*hw*0.9,Ys(x)];},C.red,1.5,[4,3]);
    txt(c,'N = '+S.hits.length,hx,cy-sh-12,C.ink,{font:SMALL});},
  read(S,P){const lam=1.2264/Math.sqrt(P.U);return[['Elektron to‘lqin uzunligi λ',fmt(lam*1000,2)+' pm'],['Yo‘llar orasi Δx = λL/d',fmt(lam*1e-9/(P.d*1e-9)*1e6,1)+' μm'],['Ekranga tushgan elektronlar',String(S.hits.length)],['Manzara',P.det?'interferensiyasiz (o‘lchandi)':'interferensiya']];}
});

/* 5. Noaniqlik munosabati */
SIMS.push({id:'noaniqlik',cat:'kva',title:'Geyzenberg noaniqlik munosabati',short:'Δx·Δp ≥ ħ/2',
  sub:'Zarraning koordinatasi va impulsini bir vaqtda istalgancha aniq bilib bo‘lmaydi. To‘lqin paketi qancha tor bo‘lsa, uning impulslar taqsimoti shuncha keng bo‘ladi.',
  formula:`<span>Δ<i>x</i>·Δ<i>p</i> ≥ ${fr('ħ','2')}</span><span class="alt">Δ<i>x</i>(<i>t</i>) = Δ<i>x</i>₀√(1 + (${fr('ħ<i>t</i>','2<i>m</i>Δ<i>x</i>₀²')})²)</span>`,
  text:['Elektron to‘lqin paketi bilan tasvirlanadi. Paketning kengligi Δx — koordinata noaniqligi. Bunday paket turli to‘lqin uzunliklaridagi to‘lqinlar yig‘indisidan iborat, ularning impulslari tarqoqligi Δp. Gauss paketi uchun Δx·Δp = ħ/2 — eng kichik mumkin bo‘lgan qiymat.','Erkin paket harakatlanganda yoyiladi: tez komponentalar oldinga, sekinlari orqaga ketadi. Δp o‘zgarmaydi, Δx esa ortadi, shuning uchun ko‘paytma ham ortadi. Paket qancha tor bo‘lsa, shuncha tez yoyiladi. Bu o‘lchov asboblarining kamchiligi emas — tabiatning asosiy xossasi.'],
  legend:[['Δx','koordinata noaniqligi (paket kengligi)'],['Δp','impuls noaniqligi'],['ħ','h/2π = 1,055·10⁻³⁴ J·s'],['λ₀','paket markaziy to‘lqin uzunligi'],['ψ','to‘lqin funksiyasi']],
  tries:['Δx₀ ni 2 marta kamaytiring: pastdagi impuls taqsimoti 2 marta kengayadi.','Tor paketni (0,1 nm) kuzating: u juda tez yoyiladi.','Ko‘paytma Δx·Δp boshida aniq 0,5ħ ekanini, keyin ortishini tekshiring.'],
  params:[{id:'s0',label:'Boshlang‘ich kenglik',sym:'Δx₀',min:0.1,max:1.5,step:0.05,val:0.4,unit:'nm',d:2,reset:1},{id:'l0',label:'Markaziy to‘lqin uzunligi',sym:'λ₀',min:0.3,max:2,step:0.05,val:0.8,unit:'nm',d:2,reset:1}],
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt*1.2;const k0=TAU/P.l0,v=QHB*k0*1e9/QME*1e-6,tau=QHB/(2*QME*(P.s0*1e-9)**2)*S.t*1e-15,sx=P.s0*Math.sqrt(1+tau*tau);if(-4+v*S.t>26||sx>7)S.t=0;},
  psi(x,S,P){const s0=P.s0,k0=TAU/P.l0,tf=S.t*1e-15,tau=QHB/(2*QME*(s0*1e-9)**2)*tf,v=QHB*k0*1e9/QME*1e-6,xc=-4+v*S.t,om=QHB*(k0*1e9)**2/(2*QME)*tf,d=x-xc,den=[1,tau],z=cdiv([-d*d/(4*s0*s0),0],den),ph=k0*(x+4)-om,pre=cdiv([1,0],[Math.sqrt(Math.hypot(1,tau))*Math.cos(Math.atan(tau)/2),Math.sqrt(Math.hypot(1,tau))*Math.sin(Math.atan(tau)/2)]),e=cexp([z[0],z[1]+ph]);return cmul(pre,e);},
  draw(c,W,H,S,P){grid(c,W,H,28);const x0=30,x1=W-30,xa=-5,xb=26,X=x=>x0+(x-xa)/(xb-xa)*(x1-x0),yt=H*0.32,A=H*0.2;S.g={x0,x1,yt,A,xa,xb};
    line(c,x0,yt,x1,yt,rgba('muted',0.5),1);const pts=[];for(let i=0;i<=700;i++){const x=xa+i/700*(xb-xa);pts.push([x,this.psi(x,S,P)]);}
    c.fillStyle=rgba('accent',0.18);c.beginPath();c.moveTo(X(xa),yt);pts.forEach(([x,p])=>c.lineTo(X(x),yt-cabs2(p)*A));c.lineTo(X(xb),yt);c.fill();
    curve2(c,700,u=>{const[x,p]=pts[Math.round(u*700)];return[X(x),yt-p[0]*A];},'#6fa8ff',1.3);curve2(c,700,u=>{const[x,p]=pts[Math.round(u*700)];return[X(x),yt-Math.sqrt(cabs2(p))*A];},C.accent,2);
    const tau=QHB/(2*QME*(P.s0*1e-9)**2)*S.t*1e-15,sx=P.s0*Math.sqrt(1+tau*tau),v=QHB*TAU/P.l0*1e9/QME*1e-6,xc=-4+v*S.t;
    line(c,X(xc-sx),yt+18,X(xc+sx),yt+18,C.red,2);txt(c,'2Δx',X(xc),yt+30,C.red,{align:'center',font:SMALL});txt(c,'|ψ|²',X(xa)+4,yt-A-6,C.accent,{font:SMALL});
    for(let k=0;k<=25;k+=5)txt(c,k+' nm',X(k),yt+46,C.muted,{align:'center',font:SMALL});
    const pb=H-40,ph=H*0.26,p0=TAU/P.l0,sp=1/(2*P.s0),pa=0,pz=TAU/0.3*1.15,PX=p=>x0+(p-pa)/(pz-pa)*(x1-x0);axes2(c,x0,pb-ph,x1-x0,ph,'p (ħk), nm⁻¹','|φ(p)|²');
    c.fillStyle=rgba('warm',0.25);c.beginPath();c.moveTo(PX(pa),pb);for(let i=0;i<=300;i++){const p=pa+i/300*(pz-pa);c.lineTo(PX(p),pb-Math.exp(-((p-p0)**2)/(2*sp*sp))*ph*0.9);}c.lineTo(PX(pz),pb);c.fill();
    line(c,PX(p0-sp),pb-ph*0.9*Math.exp(-0.5)-0,PX(p0+sp),pb-ph*0.9*Math.exp(-0.5),C.red,2);txt(c,'2Δp',PX(p0),pb-ph*0.9*Math.exp(-0.5)-10,C.red,{align:'center',font:SMALL});
    txt(c,'t = '+fmt(S.t,2)+' fs',x1,30,C.ink,{align:'right',font:SMALL});},
  read(S,P){const tau=QHB/(2*QME*(P.s0*1e-9)**2)*S.t*1e-15,sx=P.s0*Math.sqrt(1+tau*tau),dp=QHB/(2*P.s0*1e-9);return[['Δx(t)',fmt(sx,3)+' nm'],['Δp',fmt(dp,3)+' kg·m/s'],['Δx·Δp',fmt(sx/P.s0*0.5,3)+' ħ'],['Tezlik noaniqligi Δv',fmt(dp/QME/1000,0)+' km/s']];}
});

/* 6. Cheksiz chuqur potensial o‘ra */
SIMS.push({id:'chuqur',cat:'kva',title:'Potensial o‘radagi zarra',short:'Eₙ = n²h²/(8mL²)',
  sub:'Devorlari o‘tib bo‘lmaydigan o‘rada elektron faqat aniq energiyalarga ega bo‘la oladi. To‘lqin funksiyalari torning turg‘un to‘lqinlariga o‘xshaydi.',
  formula:`<span><i>E</i><sub><i>n</i></sub> = ${fr('<i>n</i>²<i>h</i>²','8<i>mL</i>²')}</span><span class="alt"><i>ψ</i><sub><i>n</i></sub> = √(${fr('2','<i>L</i>')})·sin(${fr('<i>nπx</i>','<i>L</i>')})</span>`,
  text:['O‘ra ichida to‘lqin funksiyasi devorlarda nolga teng bo‘lishi kerak, xuddi ikki uchi mahkamlangan tor kabi. Shuning uchun o‘ra eniga yarim to‘lqinlarning butun soni joylashadi: λₙ = 2L/n. De Broyl formulasidan impuls, so‘ng energiya kvantlanadi: Eₙ ∝ n².','Eng past energiya E₁ nolga teng emas — zarra hech qachon tinch turmaydi (noaniqlik munosabati natijasi). O‘ra torayishi bilan sathlar orasi kattalashadi. Bo‘yoq molekulalari va kvant nuqtalarning rangi aynan shunday aniqlanadi: kichik kvant nuqta ko‘k, kattasi qizil nur chiqaradi.'],
  legend:[['n','kvant soni (1, 2, 3, …)'],['L','o‘ra kengligi'],['m','elektron massasi'],['Eₙ','n-sath energiyasi'],['ψₙ','to‘lqin funksiyasi']],
  tries:['Sathni bosib tanlang: n-sathda n − 1 ta tugun bor.','L ni 2 marta kamaytiring: barcha energiyalar 4 marta ortadi.','«Superpozitsiya» rejimini yoqing: ehtimollik o‘ra ichida chayqaladi.'],
  params:[{id:'L',label:'O‘ra kengligi',sym:'L',min:0.3,max:2,step:0.05,val:1,unit:'nm',d:2},{id:'n',label:'Kvant soni',sym:'n',min:1,max:6,step:1,val:2,d:0},{id:'sup',label:'Holat',choices:[[0,'Statsionar ψₙ'],[1,'Superpozitsiya ψₙ + ψₙ₊₁']],val:0}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  pointer(type,x,y,S,P,api){if(type!=='down'||!S.g)return false;const g=S.g;for(let n=1;n<=6;n++){if(Math.abs(y-g.EY(n))<12&&x>g.wl-30&&x<g.wr+60){P.n=n;if(api&&api.set)api.set('n',n);return true;}}return false;},
  draw(c,W,H,S,P){grid(c,W,H,28);const E1=0.376/(P.L*P.L),Emax=36*E1*1.08,wl=W*0.1,wr=W*0.52,bot=H-40,top=34,EY=E=>bot-E/Emax*(bot-top);S.g={wl,wr,bot,top,EY:n=>EY(n*n*E1),E1,Emax};
    c.fillStyle=rgba('muted',0.35);c.fillRect(wl-18,top,18,bot-top);c.fillRect(wr,top,18,bot-top);line(c,wl,bot,wr,bot,C.ink,2);
    for(let n=1;n<=6;n++){const E=n*n*E1,y=EY(E),on=n===P.n||(P.sup&&n===P.n+1&&n<=6);line(c,wl,y,wr,y,on?C.accent:rgba('muted',0.6),on?2:1);txt(c,'n = '+n+'  '+fmt(E,2)+' eV',wr+24,y,on?C.accent:C.muted,{font:SMALL});
      if(on||n===P.n){const A=Math.min(26,(EY(E1)-EY(4*E1))*0.45);curve2(c,120,u=>[wl+u*(wr-wl),y-Math.sin(n*Math.PI*u)*A],on?C.warm:rgba('warm',0.4),1.6);}}
    const gx=W*0.66,gw=W-gx-20,gt=50,gh=H*0.5,u=S.t*0.6,n=P.n,m=Math.min(6,n+1),dE=(m*m-n*n),ph=u*dE;axes2(c,gx,gt,gw,gh,'x','|ψ|²');
    const dens=x=>{const a=Math.sin(n*Math.PI*x),b=Math.sin(m*Math.PI*x);return P.sup?(a*a+b*b+2*a*b*Math.cos(ph))/2:a*a;};
    c.fillStyle=rgba('accent',0.25);c.beginPath();c.moveTo(gx,gt+gh);for(let i=0;i<=150;i++){const x=i/150;c.lineTo(gx+x*gw,gt+gh-dens(x)*gh*0.48);}c.lineTo(gx+gw,gt+gh);c.fill();curve2(c,150,x=>[gx+x*gw,gt+gh-dens(x)*gh*0.48],C.accent,2);
    txt(c,'0',gx,gt+gh+12,C.muted,{font:SMALL});txt(c,'L',gx+gw,gt+gh+12,C.muted,{font:SMALL,align:'right'});
    let mean=0,s=0;for(let i=0;i<=100;i++){const x=i/100,d=dens(x);mean+=x*d;s+=d;}mean/=s;disk(c,gx+mean*gw,gt+gh+24,6,C.red);txt(c,'⟨x⟩',gx+mean*gw,gt+gh+40,C.red,{align:'center',font:SMALL});
    txt(c,'Sathni bosib tanlang',wl,top-12,C.muted,{font:SMALL});},
  read(S,P){const E1=0.376/(P.L*P.L),En=P.n*P.n*E1;const r=[['Eₙ',fmt(En,3)+' eV'],['E₁ (eng past)',fmt(E1,3)+' eV'],['Tugunlar soni',String(P.n-1)]];if(P.n>1)r.push(['n → 1 o‘tish foton λ',fmt(1239.84/(En-E1),0)+' nm']);if(P.sup&&P.n<6){const dE=((P.n+1)**2-P.n**2)*E1;r.push(['Chayqalish davri h/ΔE',fmt(4.1357/dE,2)+' fs']);}return r;}
});

/* 7. Tunnel effekti */
function tunSolve(E,V,a){const k=5.1232*Math.sqrt(E),dd=E-V;let q;if(Math.abs(dd)<1e-6)dd<0?q=[1e-4,0]:q=[0,1e-4];else q=dd<0?[5.1232*Math.sqrt(-dd),0]:[0,5.1232*Math.sqrt(dd)];
  const ik=[0,k],al=cmul([0.5,0],cadd([1,0],cdiv(ik,q))),be=cmul([0.5,0],csub([1,0],cdiv(ik,q))),eqa=cexp([q[0]*a,q[1]*a]),emqa=cexp([-q[0]*a,-q[1]*a]),eika=cexp([0,k*a]),qik=cdiv(q,ik);
  const br=cadd(cmul(cmul(emqa,al),cadd([1,0],qik)),cmul(cmul(eqa,be),csub([1,0],qik))),t=cdiv([2,0],cmul(eika,br)),A=cmul(cmul(t,eika),cmul(emqa,al)),B=cmul(cmul(t,eika),cmul(eqa,be)),r=csub(cadd(A,B),[1,0]);
  return{k,q,t,r,A,B,T:cabs2(t),R:cabs2(r),psi(x){if(x<0)return cadd(cexp([0,k*x]),cmul(r,cexp([0,-k*x])));if(x<=a)return cadd(cmul(A,cexp([q[0]*x,q[1]*x])),cmul(B,cexp([-q[0]*x,-q[1]*x])));return cmul(t,cexp([0,k*x]));}};}
SIMS.push({id:'tunnel',cat:'kva',title:'Tunnel effekti',short:'T ≈ e^(−2κa)',
  sub:'Klassik zarra energiyasi yetmasa to‘siqdan o‘ta olmaydi. Kvant zarra esa ma’lum ehtimollik bilan to‘siq orqali «sizib» o‘tadi.',
  formula:`<span><i>T</i> ≈ <i>e</i><sup>−2<i>κa</i></sup>, &nbsp;<i>κ</i> = ${fr('√(2<i>m</i>(<i>V</i>₀ − <i>E</i>))','ħ')}</span><span class="alt"><i>T</i> + <i>R</i> = 1</span>`,
  text:['To‘siq ichida to‘lqin funksiyasi nolga tushmaydi, balki eksponensial kamayadi. To‘siq yupqa bo‘lsa, uning orqasida to‘lqin qoladi — demak zarrani to‘siq ortida topish ehtimoli bor. O‘tish ehtimoli T to‘siq kengligi va balandligiga eksponensial bog‘liq.','Tunnel effekti tufayli Quyoshda vodorod yadrolari qo‘shiladi, alfa yemirilish ro‘y beradi, tunnel diodlar va skanerlovchi tunnel mikroskopi ishlaydi. Elektronlar har biri bittadan keladi: bir qismi o‘tadi, bir qismi qaytadi, nisbati T ga mos.'],
  legend:[['E','elektron energiyasi'],['V₀','to‘siq balandligi'],['a','to‘siq kengligi'],['T','o‘tish ehtimoli'],['R','qaytish ehtimoli'],['κ','to‘siq ichida so‘nish koeffitsienti']],
  tries:['To‘siq kengligini 2 marta oshiring: T taxminan kvadrati qadar kamayadi.','E ni V₀ dan katta qiling: zarra to‘siq ustidan o‘tsa ham, ba’zan qaytadi!','O‘tgan va qaytgan elektronlar nisbatini T bilan solishtiring.'],
  params:[{id:'E',label:'Elektron energiyasi',sym:'E',min:0.5,max:10,step:0.1,val:3,unit:'eV',d:1},{id:'V',label:'To‘siq balandligi',sym:'V₀',min:0.5,max:10,step:0.1,val:5,unit:'eV',d:1},{id:'a',label:'To‘siq kengligi',sym:'a',min:0.05,max:1,step:0.01,val:0.3,unit:'nm',d:2}],
  init:()=>({t:0,ps:[],acc:0,nT:0,nR:0}),
  step(S,P,dt){S.t+=dt;const q=tunSolve(P.E,P.V,P.a);S.acc+=dt*5;while(S.acc>=1){S.acc--;S.ps.push({x:-3,dir:1,go:Math.random()<q.T});}
    S.ps.forEach(p=>{p.x+=p.dir*dt*2.2;if(p.dir>0&&p.x>=0&&!p.dec){p.dec=1;if(p.go){p.x+=P.a;p.pass=1;}else p.dir=-1;}});
    S.ps=S.ps.filter(p=>{if(p.x>P.a+3.2){S.nT++;return false;}if(p.x<-3.2&&p.dir<0){S.nR++;return false;}return true;});},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=tunSolve(P.E,P.V,P.a),xa=-3,xb=P.a+3,x0=30,x1=W-30,X=x=>x0+(x-xa)/(xb-xa)*(x1-x0),bot=H-50,Vm=10.5,EY=e=>bot-e/Vm*(H*0.55),yE=EY(P.E);S.g={x0,x1,X0:X(0),Xa:X(P.a),bot,yV:EY(P.V),yE};
    c.fillStyle=rgba('violet',0.25);c.fillRect(X(0),EY(P.V),X(P.a)-X(0),bot-EY(P.V));c.strokeStyle=C.violet;c.lineWidth=2;c.strokeRect(X(0),EY(P.V),X(P.a)-X(0),bot-EY(P.V));txt(c,'V₀',X(P.a)+6,EY(P.V)+10,C.violet,{font:MATH});
    line(c,x0,bot,x1,bot,C.ink,1.5);line(c,x0,yE,x1,yE,C.warm,1.2,[6,4]);txt(c,'E',x0+4,yE-10,C.warm,{font:MATH});
    const A=Math.min(46,(H*0.55)*0.18),ph=-S.t*3;const pts=[];for(let i=0;i<=800;i++){const x=xa+i/800*(xb-xa);pts.push([x,q.psi(x)]);}
    c.fillStyle=rgba('accent',0.16);c.beginPath();c.moveTo(X(xa),yE);pts.forEach(([x,p])=>c.lineTo(X(x),yE-cabs2(p)/4*A*1.4));c.lineTo(X(xb),yE);c.fill();
    curve2(c,800,u=>{const[x,p]=pts[Math.round(u*800)],w=cmul(p,cexp([0,ph]));return[X(x),yE-w[0]*A/2];},C.accent,1.8);
    S.ps.forEach(p=>{if(p.dec&&p.pass&&p.x<P.a)return;disk(c,X(p.x),yE-A-24,4.5,p.pass?C.green:p.dir<0?C.red:'#7fe7ff');});
    txt(c,'o‘tdi: '+S.nT,x1,40,C.green,{align:'right',font:SMALL});txt(c,'qaytdi: '+S.nR,x0,40,C.red,{font:SMALL});},
  read(S,P){const q=tunSolve(P.E,P.V,P.a),n=S.nT+S.nR;const r=[['O‘tish ehtimoli T',fmt(q.T*100,q.T<0.01?4:2)+' %'],['Qaytish ehtimoli R',fmt(q.R*100,2)+' %'],['Tajribada o‘tganlar ulushi',n?fmt(S.nT/n*100,1)+' % ('+n+')':'—']];if(P.E<P.V)r.push(['Kirish chuqurligi 1/κ',fmt(1/q.q[0],3)+' nm']);return r;}
});

/* 8. Kvant garmonik ossillyator */
function hermPsi(n,x){let h0=1,h1=2*x;if(n===0)h1=h0;else for(let k=1;k<n;k++){const h2=2*x*h1-2*k*h0;h0=h1;h1=h2;}let f=1;for(let k=2;k<=n;k++)f*=k;return h1/Math.sqrt(Math.pow(2,n)*f*Math.sqrt(Math.PI))*Math.exp(-x*x/2);}
SIMS.push({id:'ossillyator',cat:'kva',title:'Kvant garmonik ossillyator',short:'Eₙ = (n + ½)ħω',
  sub:'Prujinadagi yuk yoki molekuladagi atomlar tebranishi kvant olamida faqat teng oraliqli energiyalarga ega. Eng pastki holatda ham tebranish energiyasi nolga teng emas.',
  formula:`<span><i>E</i><sub><i>n</i></sub> = (<i>n</i> + ½)ħ<i>ω</i></span><span class="alt"><i>E</i>₀ = ${fr('ħ<i>ω</i>','2')} — nol tebranishlar energiyasi</span>`,
  text:['Potensial energiya parabolik: V = mω²x²/2. Shryodinger tenglamasining yechimlari Ermit funksiyalari bo‘lib, sathlar orasi bir xil — ħω. Shuning uchun molekulalar infraqizil nurni faqat ma’lum chastotalarda yutadi.','Klassik zarra burilish nuqtalari orasida qoladi va chetlarda ko‘proq vaqt bo‘ladi (punktir chiziq). Kvant zarraning ehtimollik taqsimoti esa past sathlarda markazda to‘plangan va hatto klassik taqiqlangan sohaga ham chiqadi. Katta n da kvant taqsimot klassikka yaqinlashadi (moslik prinsipi).'],
  legend:[['n','tebranish kvant soni'],['ω','tebranish chastotasi'],['ħω','sathlar orasidagi energiya'],['ξ','o‘lchamsiz koordinata'],['ψₙ','to‘lqin funksiyasi']],
  tries:['n = 0 holatda zarra markazda to‘plangan, klassik zarra esa chetlarda ko‘p bo‘ladi.','n ni 8 ga oshiring: kvant taqsimot klassik punktirga yaqinlashadi.','ħω = 0,266 eV (CO molekulasi) qiling va yutilish to‘lqin uzunligini o‘qing.'],
  params:[{id:'n',label:'Kvant soni',sym:'n',min:0,max:8,step:1,val:0,d:0},{id:'hw',label:'Kvant energiyasi',sym:'ħω',min:0.05,max:1,step:0.005,val:0.266,unit:'eV',d:3}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  pointer(type,x,y,S,P,api){if(type!=='down'||!S.g)return false;for(let n=0;n<=8;n++)if(Math.abs(y-S.g.EY(n+0.5))<9){P.n=n;if(api&&api.set)api.set('n',n);return true;}return false;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.42,sx=Math.min(W*0.08,(W*0.38)/5),bot=H-34,top=30,Em=10,EY=E=>bot-E/Em*(bot-top),X=x=>cx+x*sx;S.g={cx,sx,bot,top,EY};
    curve2(c,200,u=>{const x=-5+u*10;return[X(x),EY(x*x/2)];},C.ink,2);
    for(let n=0;n<=8;n++){const E=n+0.5,xt=Math.sqrt(2*E),y=EY(E),on=n===P.n;line(c,X(-xt),y,X(xt),y,on?C.accent:rgba('muted',0.55),on?2:1);txt(c,'n = '+n,X(4.6),y,on?C.accent:C.muted,{font:SMALL});
      if(on){const A=(EY(0.5)-EY(1.5))*1.6;c.fillStyle=rgba('accent',0.22);c.beginPath();c.moveTo(X(-5),y);for(let i=0;i<=240;i++){const x=-5+i/240*10;c.lineTo(X(x),y-hermPsi(n,x)**2*A*1.6);}c.lineTo(X(5),y);c.fill();
        curve2(c,240,u=>{const x=-5+u*10;return[X(x),y-hermPsi(n,x)*A];},C.warm,1.6);
        curve2(c,240,u=>{const x=-xt*0.995+u*2*xt*0.995;return[X(x),y-1/(Math.PI*Math.sqrt(2*E-x*x))*A*1.6];},C.red,1.4,[5,4]);
        const xc=xt*Math.cos(S.t*2);disk(c,X(xc),EY(xc*xc/2)-8,7,C.red);line(c,X(-xt),y-6,X(-xt),y+6,C.red,1.5);line(c,X(xt),y-6,X(xt),y+6,C.red,1.5);}}
    txt(c,'Sathni bosib tanlang',X(-5),top,C.muted,{font:SMALL});txt(c,'V = ξ²/2',X(-4.6),EY(11.5)+0,C.ink,{font:SMALL});
    txt(c,'— |ψ|² kvant',W-20,top,C.accent,{align:'right',font:SMALL});txt(c,'- - klassik',W-20,top+16,C.red,{align:'right',font:SMALL});},
  read(S,P){const E=P.n+0.5,xt=Math.sqrt(2*E);let out=0,tot=0;for(let i=0;i<=2000;i++){const x=-8+i*0.008,d=hermPsi(P.n,x)**2;tot+=d;if(Math.abs(x)>xt)out+=d;}return[['Eₙ',fmt(E*P.hw,3)+' eV'],['Nol tebranish E₀',fmt(0.5*P.hw,3)+' eV'],['Yutiladigan foton λ = hc/ħω',fmt(1.23984/P.hw,2)+' μm'],['Klassik taqiqlangan sohada',fmt(out/tot*100,1)+' %'],['Tugunlar soni',String(P.n)]];}
});

/* 9. Vodorod atomi orbitallari */
const HO=[['1s',1,0,'s'],['2s',2,0,'s'],['2p',2,1,'z'],['3s',3,0,'s'],['3p',3,1,'z'],['3d (z²)',3,2,'z2'],['3d (xz)',3,2,'xz']];
function hR(n,l,r){if(n===1)return 2*Math.exp(-r);if(n===2)return l?r*Math.exp(-r/2)/(2*Math.sqrt(6)):(2-r)*Math.exp(-r/2)/(2*Math.SQRT2);if(l===0)return 2/(81*Math.sqrt(3))*(27-18*r+2*r*r)*Math.exp(-r/3);if(l===1)return 8/(27*Math.sqrt(6))*r*(1-r/6)*Math.exp(-r/3);return 4/(81*Math.sqrt(30))*r*r*Math.exp(-r/3);}
function hPsi(o,x,y,z){const r=Math.hypot(x,y,z)||1e-9,[,n,l,t]=o,R=hR(n,l,r),ang=t==='s'?0.2821:t==='z'?0.4886*z/r:t==='z2'?0.3154*(3*z*z/(r*r)-1):1.0925*x*z/(r*r);return R*ang;}
SIMS.push({id:'vodorod',cat:'kva',title:'Vodorod atomi orbitallari',short:'Eₙ = −13,6 eV/n²',
  sub:'Kvant mexanikasida elektron aniq orbita bo‘ylab aylanmaydi — u «elektron buluti» ko‘rinishida bo‘ladi. Bulutning zichligi elektronni o‘sha joyda topish ehtimolini bildiradi.',
  formula:`<span><i>E</i><sub><i>n</i></sub> = −${fr('13,6 eV','<i>n</i>²')}</span><span class="alt"><i>ψ</i><sub><i>nlm</i></sub> = <i>R</i><sub><i>nl</i></sub>(<i>r</i>)·<i>Y</i><sub><i>lm</i></sub>(<i>θ</i>, <i>φ</i>)</span>`,
  text:['Elektron holati uchta kvant soni bilan aniqlanadi: bosh kvant soni n energiyani, orbital kvant soni l (s, p, d…) bulut shaklini, magnit kvant soni m esa uning fazodagi yo‘nalishini belgilaydi. Rasmda bulutning x–z tekisligidagi kesimi ko‘rsatilgan.','Rang to‘lqin funksiyasi ishorasini bildiradi (qizil +, ko‘k −). Ishora o‘zgaradigan joylar — tugun sirtlari, u yerda elektronni topib bo‘lmaydi. Pastdagi grafik elektronni yadrodan r masofada topish ehtimoli: 1s uchun eng ehtimolli masofa Bor radiusi a₀ = 0,053 nm ga teng.'],
  legend:[['n','bosh kvant soni'],['l','orbital kvant soni (s = 0, p = 1, d = 2)'],['a₀','Bor radiusi, 0,0529 nm'],['P(r)','radial ehtimollik zichligi r²R²'],['|ψ|²','ehtimollik zichligi']],
  tries:['2s va 2p ni solishtiring: energiyasi bir xil, shakli turlicha.','3s orbitalda ikkita sferik tugun borligini toping.','3d (xz) da to‘rt bo‘lakli «beda bargi» shaklini ko‘ring.'],
  params:[{id:'o',label:'Orbital',choices:HO.map((o,i)=>[i,o[0]]),val:0},{id:'ph',label:'Rang',choices:[[0,'Zichlik |ψ|²'],[1,'Ishora (faza)']],val:1}],
  init:()=>({key:'',img:null}),step(){},
  draw(c,W,H,S,P){grid(c,W,H,28);const o=HO[P.o],n=o[1],Rm=[0,6,14,24][n],side=Math.min(H-40,W*0.55),ox=24,oy=(H-side)/2;S.g={ox,oy,side,Rm};
    const key=P.o+'|'+P.ph+'|'+(GL.dark?1:0);if(S.key!==key){S.key=key;const N=180,cv=document.createElement('canvas');cv.width=cv.height=N;const cx=cv.getContext('2d'),im=cx.createImageData(N,N);let mx=0;const vals=new Float32Array(N*N);
      for(let j=0;j<N;j++)for(let i=0;i<N;i++){const x=(i/(N-1)*2-1)*Rm,z=(1-j/(N-1)*2)*Rm,v=hPsi(o,x,0,z);vals[j*N+i]=v;mx=Math.max(mx,v*v);}
      for(let k=0;k<N*N;k++){const v=vals[k],d=Math.pow(v*v/mx,0.45),bg=GL.dark?[6,9,18]:[244,246,252];let col=P.ph?(v>=0?[255,90,90]:[80,150,255]):[120,170,255];const a=Math.min(1,d*1.2);im.data[k*4]=bg[0]+(col[0]-bg[0])*a;im.data[k*4+1]=bg[1]+(col[1]-bg[1])*a;im.data[k*4+2]=bg[2]+(col[2]-bg[2])*a;im.data[k*4+3]=255;}
      cx.putImageData(im,0,0);S.img=cv;}
    c.imageSmoothingEnabled=true;c.drawImage(S.img,ox,oy,side,side);c.strokeStyle=rgba('muted',0.6);c.strokeRect(ox,oy,side,side);disk(c,ox+side/2,oy+side/2,3,C.warm);
    txt(c,'z',ox+side/2+6,oy+12,C.muted,{font:SMALL});txt(c,'x',ox+side-12,oy+side/2-8,C.muted,{font:SMALL});const ab=side/(2*Rm);line(c,ox+10,oy+side-14,ox+10+ab*2,oy+side-14,C.ink,2);txt(c,'2a₀',ox+14+ab*2,oy+side-14,C.ink,{font:SMALL});
    txt(c,o[0],ox+12,oy+18,C.ink,{font:'700 18px system-ui'});
    const gx=ox+side+40,gw=W-gx-20,gt=60,gh=H*0.45;if(gw>80){axes2(c,gx,gt,gw,gh,'r / a₀','P(r) = r²R²');let mx=0;const f=r=>r*r*hR(n,o[2],r)**2;for(let i=0;i<=200;i++)mx=Math.max(mx,f(i/200*Rm*1.4));
      curve2(c,200,u=>[gx+u*gw,gt+gh-f(u*Rm*1.4)/mx*gh*0.92],C.accent,2);let best=0,bv=0;for(let i=1;i<=400;i++){const r=i/400*Rm*1.4,v=f(r);if(v>bv){bv=v;best=r;}}line(c,gx+best/(Rm*1.4)*gw,gt,gx+best/(Rm*1.4)*gw,gt+gh,C.warm,1,[4,4]);
      for(let k=0;k<=Rm*1.4;k+=Math.max(1,Math.round(Rm/3)))txt(c,String(k),gx+k/(Rm*1.4)*gw,gt+gh+12,C.muted,{align:'center',font:SMALL});
      const lv=gt+gh+50;txt(c,'Energiya sathlari',gx,lv,C.muted,{font:SMALL});let ly=-1e9;for(let k=1;k<=4;k++){const y=lv+16+(1-1/(k*k))*90,yl=Math.max(y,ly+12);ly=yl;line(c,gx,y,gx+gw*0.5,y,k===n?C.accent:rgba('muted',0.5),k===n?2:1);txt(c,'n='+k+'  '+fmt(-13.6/(k*k),2)+' eV',gx+gw*0.5+8,yl,k===n?C.accent:C.muted,{font:SMALL});}}},
  read(S,P){const o=HO[P.o],n=o[1],l=o[2],f=r=>r*r*hR(n,l,r)**2;let best=0,bv=0;for(let i=1;i<=2000;i++){const r=i/2000*40,v=f(r);if(v>bv){bv=v;best=r;}}return[['Kvant sonlari n, l',n+', '+l],['Energiya Eₙ',fmt(-13.6/(n*n),2)+' eV'],['Eng ehtimolli r',fmt(best*0.0529,3)+' nm'],['O‘rtacha ⟨r⟩',fmt((3*n*n-l*(l+1))/2*0.0529,3)+' nm'],['Radial / burchak tugunlar',(n-l-1)+' / '+l]];}
});

/* 10. Shtern–Gerlax tajribasi */
SIMS.push({id:'spin',cat:'kva',title:'Shtern–Gerlax tajribasi va spin',short:'P = cos²(θ/2)',
  sub:'Kumush atomlari bir jinsli bo‘lmagan magnit maydondan o‘tib, ikki dastaga ajraladi. Elektron spini o‘lchanganda faqat ikki qiymatdan birini oladi: «yuqori» yoki «past».',
  formula:`<span><i>P</i>(↑<sub><i>n</i></sub>) = cos²${fr('<i>θ</i>','2')}</span><span class="alt"><i>S</i><sub><i>z</i></sub> = ±${fr('ħ','2')}</span>`,
  text:['Klassik fizikaga ko‘ra kichik magnitchalar har xil yo‘nalgan bo‘lib, ekranda uzluksiz chiziq hosil qilishi kerak edi. 1922-yilda esa faqat ikkita dog‘ kuzatildi: spin proyeksiyasi kvantlangan va faqat +ħ/2 yoki −ħ/2 bo‘ladi.','Birinchi magnitdan «yuqori» dastani olib, ikkinchi magnitni θ burchakka bursak, atomlar cos²(θ/2) ehtimollik bilan yana yuqoriga og‘adi. «z → x → z» tajribasida x o‘lchovi z haqidagi ma’lumotni o‘chirib yuboradi: oxirgi magnitda yana 50/50 chiqadi.'],
  legend:[['θ','ikkinchi magnit o‘qining burilish burchagi'],['P','yuqori dastaga tushish ehtimoli'],['Sz','spinning z o‘qiga proyeksiyasi'],['ħ','keltirilgan Plank doimiysi']],
  tries:['θ = 90° qiling: atomlar teng ikkiga bo‘linadi.','θ = 180° da hammasi pastga ketadi.','«z → x → z» rejimida oxirgi magnitda ham pastki dog‘ paydo bo‘lishini kuzating.'],
  tools:[{id:'clr',label:'Hisoblagichlarni nolga',act:1}],
  params:[{id:'md',label:'Tajriba',choices:[[0,'Bitta magnit'],[1,'Ikki magnit (θ)'],[2,'z → x → z']],val:1,reset:1},{id:'th',label:'Ikkinchi magnit burchagi',sym:'θ',min:0,max:180,step:5,val:60,unit:'°',d:0,reset:1},{id:'rate',label:'Atomlar oqimi',sym:'',min:2,max:60,step:1,val:20,unit:'1/s',d:0}],
  init:P=>({at:[],acc:0,cnt:[[0,0],[0,0],[0,0]]}),
  action(id,S){if(id==='clr')S.cnt=[[0,0],[0,0],[0,0]];},
  stages(P){return P.md===0?[0]:P.md===1?[0,P.th*D2R]:[0,Math.PI/2,0];},
  step(S,P,dt){const st=this.stages(P);S.acc+=P.rate*dt;while(S.acc>=1){S.acc--;S.at.push({u:0,k:-1,ys:[],s:null,dead:0});}
    S.at.forEach(a=>{a.u+=dt*0.42;const k=Math.floor(a.u*st.length);if(k>a.k&&k<st.length){a.k=k;const ang=st[k];let pu;if(a.s===null)pu=0.5;else{const d=ang-a.s;pu=Math.cos(d/2)**2;}const up=Math.random()<pu;S.cnt[k][up?0:1]++;a.ys.push(up?1:-1);a.s=up?ang:ang+Math.PI;if(!up&&k<st.length-1){a.dead=1;a.du=a.u;}}});
    S.at=S.at.filter(a=>a.u<1.05&&!(a.dead&&a.u>a.du+0.08));},
  draw(c,W,H,S,P){grid(c,W,H,28);const st=this.stages(P),n=st.length,x0=60,x1=W-60,cy=H*0.46,seg=(x1-x0)/n,dy=Math.min(40,H*0.08);S.g={x0,x1,cy,seg,dy,n};
    c.fillStyle='#4a5160';rrect(c,x0-50,cy-18,40,36,6);c.fill();txt(c,'Ag',x0-30,cy,'#fff',{align:'center'});
    for(let k=0;k<n;k++){const mx=x0+seg*k+seg*0.32,mw=seg*0.36,ang=st[k];c.save();c.translate(mx+mw/2,cy);c.rotate(-ang);c.fillStyle='#d24b4b';c.beginPath();c.moveTo(-mw/2,-dy*2.4);c.lineTo(mw/2,-dy*2.4);c.lineTo(mw/2,-dy*0.9);c.lineTo(0,-dy*0.45);c.lineTo(-mw/2,-dy*0.9);c.closePath();c.fill();c.fillStyle='#3d78d8';c.fillRect(-mw/2,dy*0.9,mw,dy*1.5);c.fillStyle='#fff';c.font='700 13px system-ui';c.textAlign='center';c.fillText('N',0,-dy*1.6);c.fillText('S',0,dy*1.75);c.restore();
      const lab=['z','x','z'][k]&&(P.md===1&&k===1?'θ = '+P.th+'°':['z',P.md===2?'x':'z','z'][k]);txt(c,lab,mx+mw/2,cy+dy*2.9,C.muted,{align:'center',font:SMALL});
      if(k<n-1){c.fillStyle=C.ink;c.fillRect(x0+seg*(k+1)-4,cy+dy-6,8,16);txt(c,'to‘siq',x0+seg*(k+1),cy+dy+22,C.muted,{align:'center',font:SMALL});}
      const t=S.cnt[k],tot=t[0]+t[1]||1;txt(c,'↑ '+t[0]+'  ↓ '+t[1],x0+seg*(k+1)-8,cy-dy-28,C.ink,{align:'right',font:SMALL});txt(c,fmt(t[0]/tot*100,0)+'% / '+fmt(t[1]/tot*100,0)+'%',x0+seg*(k+1)-8,cy-dy-14,C.muted,{align:'right',font:SMALL});}
    c.fillStyle=GL.dark?'#11182a':'#cfd6e4';c.fillRect(x1+6,cy-dy*2.4,10,dy*4.8);
    S.at.forEach(a=>{const x=x0+(x1-x0)*Math.min(a.u,1);let y=cy;const k=Math.min(n-1,Math.floor(a.u*n)),f=a.u*n-k;if(a.ys.length){const yv=a.ys[a.ys.length-1];y=cy+(-yv)*dy*Math.min(1,f*2.2);}c.fillStyle=a.dead?C.red:C.accent;c.beginPath();c.arc(x,y,3.4,0,TAU);c.fill();});
    const t=S.cnt[n-1];txt(c,'↑',x1+11,cy-dy-12,C.green,{align:'center'});txt(c,'↓',x1+11,cy+dy+12,C.green,{align:'center'});},
  read(S,P){const st=this.stages(P),k=st.length-1,t=S.cnt[k],tot=t[0]+t[1];const th=P.md===0?0.5:P.md===1?Math.cos(P.th*D2R/2)**2:0.5;return[['Oxirgi magnit: yuqoriga',tot?fmt(t[0]/tot*100,1)+' %':'—'],['Nazariya',fmt(th*100,1)+' %'],['Qayd etilgan atomlar',String(tot)]];}
});

/* 11. Lazer */
SIMS.push({id:'lazer',cat:'kva',title:'Lazer: majburiy nurlanish',short:'populyatsiya inversiyasi',
  sub:'Lazerda uyg‘ongan atomlar fotonlar ta’sirida aynan bir xil fotonlar chiqaradi. Ko‘zgular orasida fotonlar ko‘chki kabi ko‘payadi va kogerent nur hosil bo‘ladi.',
  formula:`<span><i>N</i>₂ > <i>N</i>₁ — inversiya</span><span class="alt">generatsiya sharti: <i>g</i>(<i>N</i>₂ − <i>N</i>₁) ≥ ${fr('1','<i>τ</i><sub>r</sub>')}</span>`,
  text:['Uyg‘ongan atom o‘z-o‘zidan (spontan) yoki yonidan o‘tayotgan foton ta’sirida (majburiy) nur chiqaradi. Majburiy nurlanishda yangi foton chastotasi, yo‘nalishi va fazasi bo‘yicha birinchisining aynan nusxasi bo‘ladi. Eynshteyn buni 1917-yilda bashorat qilgan.','Odatda pastki sathdagi atomlar ko‘p, ular fotonlarni yutadi. Nasos (chiroq yoki boshqa lazer) atomlarning yarmidan ko‘pini yuqori sathga ko‘tarsa — populyatsiya inversiyasi — kuchayish yutilishdan ortadi. Ko‘zgular fotonlarni qaytarib turadi, yarim shaffof ko‘zgudan esa lazer nuri chiqadi. Nasos chegaraviy qiymatdan oshgandagina generatsiya boshlanadi.'],
  legend:[['N₂, N₁','yuqori va pastki sathdagi atomlar ulushi'],['g','kuchayish koeffitsienti'],['τr','fotonning rezonatorda yashash vaqti'],['R','chiqish ko‘zgusining qaytarish koeffitsienti']],
  tries:['Nasosni asta oshiring: chegaradan keyin nur keskin paydo bo‘ladi.','Nasosni birdan katta qiling: boshida nur «tepkilar» bilan tebranadi.','R ni kamaytiring: chegaraviy nasos ortadi.'],
  params:[{id:'p',label:'Nasos kuchi',sym:'W',min:0,max:6,step:0.05,val:2.5,d:2},{id:'R',label:'Chiqish ko‘zgusi qaytarishi',sym:'R',min:0.6,max:0.99,step:0.01,val:0.9,d:2}],
  init:()=>({n2:0,ph:1e-6,t:0,hist:[],at:Array.from({length:48},(_,i)=>({x:Math.random(),y:Math.random(),s:Math.random()})),fl:[]}),
  step(S,P,dt){const g=20,tc=0.05/(1-P.R),h=0.0025,m=Math.round(dt*1.2/h);for(let i=0;i<m;i++){const D=2*S.n2-1,st=g*S.ph*D;S.n2+=h*(P.p*(1-S.n2)-S.n2-st);S.ph+=h*(st-S.ph/tc+0.002*S.n2);S.n2=clamp(S.n2,0,1);S.ph=Math.max(S.ph,0);}
    S.t+=dt;S.hist.push([2*S.n2-1,S.ph]);if(S.hist.length>320)S.hist.shift();const np=Math.min(80,Math.round(S.ph*60));while(S.fl.length<np)S.fl.push({x:Math.random(),y:0.15+Math.random()*0.7,d:Math.random()<0.5?1:-1});S.fl.length=np;S.fl.forEach(f=>{f.x+=f.d*dt*1.3;if(f.x>1){f.x=1;f.d=-1;}if(f.x<0){f.x=0;f.d=1;}});},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx0=60,cx1=W*0.62,cy=H*0.3,ch=H*0.26,y0=cy-ch/2;S.g={cx0,cx1,cy,ch};
    c.fillStyle=rgba('accent',0.06);c.fillRect(cx0,y0,cx1-cx0,ch);c.fillStyle='#c9d3e4';c.fillRect(cx0-12,y0-6,10,ch+12);c.fillStyle=rgba('muted',0.6);c.fillRect(cx1+2,y0-6,8,ch+12);txt(c,'R = 100%',cx0-7,y0-16,C.muted,{align:'center',font:SMALL});txt(c,'R = '+fmt(P.R*100,0)+'%',cx1+6,y0-16,C.muted,{align:'center',font:SMALL});
    const ne=Math.round(S.n2*S.at.length);S.at.forEach((a,i)=>{const ex=i<ne;disk(c,cx0+12+a.x*(cx1-cx0-24),y0+10+a.y*(ch-20),5,ex?C.warm:rgba('muted',0.7));});
    S.fl.forEach(f=>{c.fillStyle='#ff4040';c.fillRect(cx0+f.x*(cx1-cx0)-4,y0+f.y*ch-1,8,2.5);});
    const out=S.ph*(1-P.R)/(0.05)*0.25;if(out>0.01){c.fillStyle=`rgba(255,40,40,${Math.min(0.9,out*0.4+0.1)})`;c.fillRect(cx1+10,cy-3-Math.min(4,out),W-cx1-20,6+2*Math.min(4,out));}
    const gx=cx0,gw=W-gx-30,gt=H*0.56,gh=H*0.34;axes2(c,gx,gt,gw,gh,'t','');line(c,gx,gt+gh/2,gx+gw,gt+gh/2,rgba('muted',0.4),1,[3,3]);
    const tc=0.05/(1-P.R),Dth=1/(20*tc);line(c,gx,gt+gh/2-Dth*gh/2,gx+gw,gt+gh/2-Dth*gh/2,rgba('warm',0.6),1,[6,4]);
    const mx=Math.max(0.5,...S.hist.map(h=>h[1]));curve2(c,S.hist.length-1,u=>{const h=S.hist[Math.round(u*(S.hist.length-1))];return h?[gx+u*gw*(S.hist.length/320),gt+gh/2-h[0]*gh/2]:null;},C.warm,2);curve2(c,S.hist.length-1,u=>{const h=S.hist[Math.round(u*(S.hist.length-1))];return h?[gx+u*gw*(S.hist.length/320),gt+gh-h[1]/mx*gh*0.95]:null;},'#ff4a4a',2);
    txt(c,'N₂ − N₁',gx+6,gt+8,C.warm,{font:SMALL});txt(c,'fotonlar',gx+80,gt+8,'#ff4a4a',{font:SMALL});txt(c,'chegara',gx+gw,gt+gh/2-Dth*gh/2-8,C.warm,{align:'right',font:SMALL});},
  read(S,P){const tc=0.05/(1-P.R),Dth=1/(20*tc),pth=(1+Dth)/2/(1-(1+Dth)/2);return[['Inversiya N₂ − N₁',fmt(2*S.n2-1,3)],['Chegaraviy inversiya',fmt(Dth,3)],['Chegaraviy nasos',fmt(pth,2)],['Chiqish quvvati (nisbiy)',fmt(S.ph*(1-P.R)*100,2)],['Holat',S.ph>0.02?'generatsiya bor':'generatsiya yo‘q']];}
});

/* 12. Frank–Gers tajribasi */
SIMS.push({id:'frankgers',cat:'kva',title:'Frank–Gers tajribasi',short:'ΔE = 4,9 eV',
  sub:'Simob bug‘i bilan to‘ldirilgan lampada elektronlar tezlatiladi. Anod toki kuchlanish har 4,9 V ga ortganda keskin kamayadi — atom energiyani faqat aniq porsiyalarda yutadi.',
  formula:`<span>Δ<i>E</i> = <i>eU</i><sub>1</sub> = 4,9 eV</span><span class="alt"><i>λ</i> = ${fr('<i>hc</i>','Δ<i>E</i>')} = 253 nm</span>`,
  text:['Elektron simob atomiga urilganda energiyasi 4,9 eV dan kam bo‘lsa, to‘qnashuv elastik — u energiyasini deyarli yo‘qotmaydi. Energiya 4,9 eV ga yetganda elektron atomni uyg‘otadi va barcha shu energiyani beradi. Endi u to‘xtatuvchi to‘rdan o‘ta olmaydi va tok kamayadi.','Kuchlanish ortgan sari elektron yo‘lda bir necha marta 4,9 eV to‘plab, ketma-ket bir nechta atomni uyg‘otadi — lampada bir nechta yorug‘ qatlam paydo bo‘ladi. Uyg‘ongan atomlar 253 nm li ultrabinafsha nur chiqaradi. 1914-yildagi bu tajriba atom energiya sathlarining birinchi bevosita isboti bo‘ldi.'],
  legend:[['U','tezlatuvchi kuchlanish'],['I','anod toki'],['ΔE','simobning birinchi uyg‘onish energiyasi, 4,9 eV'],['Ur','to‘xtatuvchi kuchlanish, 1,5 V']],
  tries:['Kuchlanishni avtomatik oshirib, tok grafigidagi cho‘qqilar orasini o‘lchang.','U = 15 V da lampada uchta yorug‘ qatlam bor.','Cho‘qqilar orasidagi farqdan foton to‘lqin uzunligini hisoblang.'],
  params:[{id:'U',label:'Tezlatuvchi kuchlanish',sym:'U',min:0,max:30,step:0.1,val:12,unit:'V',d:1},{id:'auto',label:'Kuchlanishni avtomatik oshirish',choices:[[0,'Yo‘q'],[1,'Ha']],val:1}],
  init:()=>({curve:null,e:[],acc:0,fx:[],U:0}),
  mc(U){const N=500,dE=4.9,Ur=1.5;let pass=0;for(let i=0;i<N;i++){let E=0,ok=true;const st=80;for(let s=0;s<st;s++){E+=U/st;if(E>=dE&&Math.random()<0.35)E-=dE;}if(E>=Ur)pass++;}return pass/N;},
  step(S,P,dt){if(!S.curve){S.curve=[];for(let i=0;i<=150;i++){const U=i/5;S.curve.push(this.mc(U)*Math.pow(U/30,1.5));}}
    if(P.auto){S.U+=dt*2.5;if(S.U>30)S.U=0;}else S.U=P.U;
    S.acc+=dt*30;while(S.acc>=1){S.acc--;S.e.push({x:0,E:0,y:Math.random()-0.5});}
    S.e.forEach(e=>{e.x+=dt*0.45;e.E=S.U*e.x-(e.lost||0);if(e.E>=4.9&&Math.random()<0.35*dt*60/5){e.lost=(e.lost||0)+4.9;e.E-=4.9;S.fx.push({x:e.x,t:0});}});S.e=S.e.filter(e=>e.x<1);S.fx.forEach(f=>f.t+=dt);S.fx=S.fx.filter(f=>f.t<0.35);},
  draw(c,W,H,S,P){if(!S.curve)this.step(S,P,0);grid(c,W,H,28);const U=S.U,tx0=60,tx1=W-60,ty=H*0.27,tr=H*0.11;S.g={tx0,tx1,ty,tr};
    c.fillStyle=rgba('accent',0.06);rrect(c,tx0-20,ty-tr,tx1-tx0+40,2*tr,tr);c.fill();c.strokeStyle=rgba('muted',0.6);c.lineWidth=1.5;rrect(c,tx0-20,ty-tr,tx1-tx0+40,2*tr,tr);c.stroke();
    const nl=Math.floor(U/4.9);for(let k=1;k<=nl;k++){const x=tx0+(tx1-tx0)*(k*4.9/Math.max(U,0.01));const g=c.createRadialGradient(x,ty,0,x,ty,tr*1.2);g.addColorStop(0,'rgba(190,120,255,0.55)');g.addColorStop(1,'rgba(190,120,255,0)');c.fillStyle=g;c.fillRect(x-tr*1.2,ty-tr,tr*2.4,2*tr);}
    S.fx.forEach(f=>disk(c,tx0+f.x*(tx1-tx0),ty+((f.x*997)%1-0.5)*tr,3+f.t*12,`rgba(200,140,255,${0.8-f.t*2})`));
    S.e.forEach((e,i)=>{c.fillStyle=e.E>=1.5||e.x<0.9?C.accent:C.red;c.beginPath();c.arc(tx0+e.x*(tx1-tx0),ty+e.y*tr*1.2,2.5,0,TAU);c.fill();});
    line(c,tx0,ty-tr*0.8,tx0,ty+tr*0.8,C.ink,4);c.setLineDash([3,3]);line(c,tx1-20,ty-tr*0.8,tx1-20,ty+tr*0.8,C.ink,2);c.setLineDash([]);line(c,tx1,ty-tr*0.8,tx1,ty+tr*0.8,C.ink,4);
    txt(c,'katod',tx0,ty+tr+14,C.muted,{align:'center',font:SMALL});txt(c,'to‘r',tx1-20,ty+tr+14,C.muted,{align:'center',font:SMALL});txt(c,'anod',tx1+8,ty+tr+14,C.muted,{align:'center',font:SMALL});txt(c,'Hg',tx0+10,ty-tr-10,C.violet,{font:SMALL});
    const gx=tx0,gw=tx1-tx0,gt=H*0.52,gh=H*0.38,mx=Math.max(...S.curve);axes2(c,gx,gt,gw,gh,'U, V','I');for(let v=0;v<=30;v+=5){line(c,gx+v/30*gw,gt+gh,gx+v/30*gw,gt+gh+5,C.muted,1);txt(c,String(v),gx+v/30*gw,gt+gh+16,C.muted,{align:'center',font:SMALL});}
    const sm=S.curve.map((v,i,a)=>{let s=0,n=0;for(let k=-2;k<=2;k++){if(a[i+k]!==undefined){s+=a[i+k];n++;}}return s/n;});const k=Math.min(150,Math.round(U*5));
    curve2(c,150,u=>[gx+u*gw,gt+gh-sm[Math.round(u*150)]/mx*gh*0.92],rgba('muted',0.4),1.2);curve2(c,k,u=>{const i=Math.round(u*k);return[gx+i/150*gw,gt+gh-sm[i]/mx*gh*0.92];},C.accent,2.2);disk(c,gx+k/150*gw,gt+gh-sm[k]/mx*gh*0.92,5,C.red);
    for(let m=1;m<=5;m++){const x=gx+(m*4.9+1.5)/30*gw;if(x<gx+gw)line(c,x,gt,x,gt+gh,rgba('violet',0.35),1,[3,4]);}},
  read(S,P){const U=S.U;return[['Kuchlanish U',fmt(U,1)+' V'],['Yorug‘ qatlamlar soni',String(Math.floor(U/4.9))],['Uyg‘onish energiyasi',fmt(4.9,1)+' eV'],['UB foton λ = hc/ΔE',fmt(1239.84/4.9,0)+' nm']];}
});

/* 13. Yorug‘lik bosimi */
SIMS.push({id:'yorbosim',cat:'kva',title:'Foton impulsi va yorug‘lik bosimi',short:'p = I/c',
  sub:'Fotonlar impuls olib yuradi, shuning uchun yorug‘lik sirtga bosim beradi. Ko‘zgu sirt yutuvchi sirtdan ikki marta katta bosim oladi — quyosh yelkani shu kuch bilan harakatlanadi.',
  formula:`<span><i>p</i><sub>foton</sub> = ${fr('<i>h</i>','<i>λ</i>')} = ${fr('<i>E</i>','<i>c</i>')}</span><span class="alt"><i>F</i> = (1 + <i>ρ</i>)${fr('<i>IS</i>','<i>c</i>')}</span>`,
  text:['Har bir foton p = E/c impulsga ega. Sirt fotonni yutsa, uning impulsi sirtga o‘tadi. Ko‘zgudan qaytgan foton yo‘nalishini teskari o‘zgartiradi, shuning uchun sirtga ikki barobar impuls beradi. Bosim p = (1 + ρ)I/c, bu yerda ρ — qaytarish koeffitsienti.','Yer orbitasida Quyosh nuri intensivligi 1361 W/m², bosimi esa atigi 9 mikropaskal. Lekin kosmosda ishqalanish yo‘q: katta va yengil yelkan oylar davomida tezlanib, katta tezlikka erishadi. 2010-yilda yapon IKAROS zondi shu usulda harakatlangan. Bu kuchni 1900-yilda Lebedev tajribada o‘lchagan.'],
  legend:[['I','nur intensivligi, W/m²'],['S','yelkan yuzasi, m²'],['c','yorug‘lik tezligi'],['ρ','qaytarish koeffitsienti (0 — yutadi, 1 — ko‘zgu)'],['m','kosmik apparat massasi']],
  tries:['Sirtni ko‘zguga almashtiring: kuch 2 marta ortadi.','Yelkan yuzasini 10 000 m² qiling: bir sutkada qancha tezlik olinishini o‘qing.','Intensivlikni Yer orbitasidagi 1361 W/m² ga qo‘ying.'],
  params:[{id:'I',label:'Nur intensivligi',sym:'I',min:100,max:10000,step:10,val:1361,unit:'W/m²',d:0},{id:'S',label:'Yelkan yuzasi',sym:'S',min:10,max:20000,step:10,val:2000,unit:'m²',d:0},{id:'m',label:'Apparat massasi',sym:'m',min:1,max:1000,step:1,val:50,unit:'kg',d:0},{id:'r',label:'Sirt',choices:[[0,'Qora (yutadi)'],[1,'Ko‘zgu (qaytaradi)']],val:1}],
  init:()=>({ph:[],acc:0,x:0,v:0,t:0}),
  step(S,P,dt){S.acc+=dt*Math.min(80,P.I/60);while(S.acc>=1){S.acc--;S.ph.push({x:0,y:Math.random(),d:1});}const F=(1+P.r)*P.I*P.S/QC,a=F/P.m;S.v+=a*dt*86400/30;S.x+=S.v*dt*0.0;S.t+=dt;
    S.ph.forEach(p=>{p.x+=p.d*dt*0.9;if(p.d>0&&p.x>=0.62){if(P.r){p.d=-1;}else p.dead=1;}});S.ph=S.ph.filter(p=>!p.dead&&p.x>-0.02);if(S.v>1e6)S.v=0;},
  draw(c,W,H,S,P){c.fillStyle=GL.dark?'#03050b':rgba('ink',0.03);c.fillRect(0,0,W,H);const sx=W*0.62,y0=H*0.2,y1=H*0.8,wob=Math.sin(S.t*3)*3;S.g={sx,y0,y1};
    const sun=c.createRadialGradient(30,H/2,0,30,H/2,120);sun.addColorStop(0,'rgba(255,220,120,0.95)');sun.addColorStop(1,'rgba(255,180,60,0)');c.fillStyle=sun;c.fillRect(0,H/2-130,160,260);
    S.ph.forEach(p=>{const x=p.x*W,y=y0+p.y*(y1-y0);c.fillStyle=p.d>0?'#ffd84a':'#ffb347';c.fillRect(x-5,y-1,10,2.5);});
    c.fillStyle=P.r?'#d8e0ee':'#20242c';c.fillRect(sx+wob,y0-10,6,y1-y0+20);line(c,sx+wob+3,H/2,sx+90+wob,H/2,C.steel||C.muted,2);disk(c,sx+100+wob,H/2,14,'#9aa6b8');
    const F=(1+P.r)*P.I*P.S/QC,L=Math.min(160,30+Math.log10(1+F*1e3)*40);arrow(c,sx+120,H/2,sx+120+L,H/2,C.red,3,'F');
    txt(c,'p = '+fmt((1+P.r)*P.I/QC*1e6,2)+' μPa',sx,y0-24,C.ink,{align:'center',font:SMALL});},
  read(S,P){const F=(1+P.r)*P.I*P.S/QC,a=F/P.m,day=a*86400;return[['Yorug‘lik bosimi',fmt((1+P.r)*P.I/QC*1e6,2)+' μPa'],['Kuch F',fmt(F*1000,3)+' mN'],['Tezlanish a',fmt(a*1000,4)+' mm/s²'],['1 sutkadan keyin tezlik',fmt(day,1)+' m/s'],['1 yildan keyin tezlik',fmt(day*365/1000,2)+' km/s']];}
});
