
(()=>{
const TAU=Math.PI*2, D2R=Math.PI/180;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const SUP={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
function fmt(v,d=2){
  if(v===Infinity||v===-Infinity) return '∞';
  if(!isFinite(v)) return '—';
  const a=Math.abs(v);
  if(a!==0 && (a>=1e6 || a<10**-d/2*0.999 && a<1e-3)){
    const e=Math.floor(Math.log10(a)); const m=v/10**e;
    return m.toFixed(2).replace('.',',')+'·10'+String(e).split('').map(c=>SUP[c]).join('');
  }
  if(a<0.5*10**-d) v=0;
  return v.toFixed(d).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,' ').replace(/,(\d*) (\d)/,',$1$2');
}
const fr=(a,b)=>`<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const sq=a=>`<span class="sqrt">√<span>${a}</span></span>`;

/* ---------- ranglar ---------- */
const TOK=['bg','panel','ink','muted','line','grid','accent','warm','red','green','violet','canvas','water','onaccent'];
const C={}, CR={};
function hexRgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255];}
function readColors(){const cs=getComputedStyle(document.documentElement);TOK.forEach(k=>{C[k]=cs.getPropertyValue('--'+k).trim()||'#888';CR[k]=hexRgb(C[k]);});}
const rgba=(k,a)=>`rgba(${CR[k][0]},${CR[k][1]},${CR[k][2]},${a})`;

/* ---------- chizish yordamchilari ---------- */
const MONO='500 12px "IBM Plex Mono", ui-monospace, monospace';
const MATH='italic 600 17px "STIX Two Text", "Times New Roman", serif';
function txt(c,s,x,y,col,o={}){c.font=o.font||MONO;c.fillStyle=col;c.textAlign=o.align||'left';c.textBaseline=o.base||'middle';c.fillText(s,x,y);}
function arrow(c,x1,y1,x2,y2,col,lw=2.5,lab){
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy); if(L<3) return;
  const ux=dx/L,uy=dy/L,hs=Math.min(11,L*0.5);
  c.strokeStyle=col;c.fillStyle=col;c.lineWidth=lw;c.lineCap='round';c.setLineDash([]);
  c.beginPath();c.moveTo(x1,y1);c.lineTo(x2-ux*hs*0.7,y2-uy*hs*0.7);c.stroke();
  c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-ux*hs-uy*hs*0.5,y2-uy*hs+ux*hs*0.5);c.lineTo(x2-ux*hs+uy*hs*0.5,y2-uy*hs-ux*hs*0.5);c.closePath();c.fill();
  if(lab) txt(c,lab,x2+ux*13,y2+uy*13,col,{font:MATH,align:'center'});
}
function grid(c,W,H,s){c.strokeStyle=C.grid;c.lineWidth=1;c.setLineDash([]);c.beginPath();for(let x=s;x<W;x+=s){c.moveTo(Math.round(x)+.5,0);c.lineTo(Math.round(x)+.5,H);}for(let y=s;y<H;y+=s){c.moveTo(0,Math.round(y)+.5);c.lineTo(W,Math.round(y)+.5);}c.stroke();}
function line(c,x1,y1,x2,y2,col,lw=1.5,dash){c.strokeStyle=col;c.lineWidth=lw;c.setLineDash(dash||[]);c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.setLineDash([]);}
function disk(c,x,y,r,fill,stroke){c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke();}}
function rrect(c,x,y,w,h,r){c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h);}
function springPath(c,x1,y,x2,coils,amp,col){const lead=10,L=x2-x1-2*lead,n=coils*2;c.strokeStyle=col;c.lineWidth=2;c.setLineDash([]);c.beginPath();c.moveTo(x1,y);c.lineTo(x1+lead,y);for(let i=1;i<=n;i++)c.lineTo(x1+lead+L*(i-0.5)/n,y+(i%2?-amp:amp));c.lineTo(x2-lead,y);c.lineTo(x2,y);c.stroke();}
function niceStep(range,target){const raw=range/target,p=10**Math.floor(Math.log10(raw)),m=raw/p;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*p;}
function wl2rgb(l){let r=0,g=0,b=0;if(l<380)return'#8b5cf6';if(l<440){r=-(l-440)/60;b=1}else if(l<490){g=(l-440)/50;b=1}else if(l<510){g=1;b=-(l-510)/20}else if(l<580){r=(l-510)/70;g=1}else if(l<645){r=1;g=-(l-645)/65}else r=1;const f=l>580?0.95:0.85;return`rgb(${r*255*f|0},${g*255*f|0},${b*255*f|0})`;}

/* ================= MAVZULAR ================= */
const CATS=[['mex','Mexanika'],['teb','Tebranish va to‘lqinlar'],['ele','Elektr va magnetizm'],['opt','Optika'],['mol','Molekulyar fizika'],['kva','Kvant fizikasi']];
const SIMS=[];

/* 1. Nyutonning ikkinchi qonuni */
SIMS.push({id:'nyuton',cat:'mex',title:'Nyutonning ikkinchi qonuni',short:'a = F / m',
  sub:'Jismning tezlanishi unga ta’sir qilayotgan natijaviy kuchga to‘g‘ri, massasiga teskari proporsional.',
  formula:`<span><i>a</i> = ${fr('<i>F</i><sub>nat</sub>','<i>m</i>')}</span><span class="alt"><i>F</i><sub>nat</sub> = <i>F</i> − <i>μmg</i></span>`,
  text:['Jismga kuch ta’sir qilsa, u tezlanish oladi. Kuch qancha katta bo‘lsa, tezlanish shuncha katta. Massa qancha katta bo‘lsa, jismni tezlatish shuncha qiyin.','Sirtdagi ishqalanish kuchi harakatga qarshi yo‘naladi. Shuning uchun tezlanishni tortish kuchi emas, natijaviy kuch beradi: F − μmg. Jism 30 m yo‘l bosgach, tajriba boshidan takrorlanadi.'],
  legend:[['F','tortish kuchi, N (to‘q sariq strelka)'],['m','massa, kg'],['μ','ishqalanish koeffitsienti (qizil strelka — ishqalanish kuchi)'],['a','tezlanish, m/s² (yashil strelka)'],['g','erkin tushish tezlanishi, 9,8 m/s²']],
  tries:['Massani 2 marta oshiring: tezlanish 2 marta kamayadi (μ = 0 bo‘lganda aniq ko‘rinadi).','F ni μmg dan kichik qiling: jism joyidan qo‘zg‘almaydi, chunki tinch holatdagi ishqalanish kuchni muvozanatlaydi.','Jism harakatlanayotganda F ni 0 ga tushiring: ishqalanish uni sekinlashtirib to‘xtatadi.'],
  params:[{id:'F',label:'Tortish kuchi',sym:'F',min:0,max:60,step:1,val:25,unit:'N'},{id:'m',label:'Massa',sym:'m',min:1,max:20,step:0.5,val:5,unit:'kg'},{id:'mu',label:'Ishqalanish koeffitsienti',sym:'μ',min:0,max:0.6,step:0.01,val:0.1,unit:'',d:2}],
  init:()=>({x:0,v:0,a:0,fr:0}),
  step(S,P,dt){const g=9.8,fm=P.mu*P.m*g;if(S.v<=1e-9&&P.F<=fm){S.v=0;S.a=0;S.fr=P.F;}else{S.fr=fm;S.a=(P.F-fm)/P.m;S.v=Math.max(0,S.v+S.a*dt);}S.x+=S.v*dt;if(S.x>30){S.x=0;S.v=0;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const gy=H*0.66,x0=46,sc=(W-110)/30;
    c.fillStyle=rgba('muted',0.1);c.fillRect(0,gy,W,H-gy);line(c,0,gy,W,gy,C.ink,2);
    for(let m=0;m<=30;m+=5){const x=x0+m*sc;line(c,x,gy,x,gy+8,C.muted,1);txt(c,m+' m',x,gy+20,C.muted,{align:'center'});}
    const s=34+P.m*2.6,bx=x0+S.x*sc;
    c.fillStyle=C.accent;rrect(c,bx-s/2,gy-s,s,s,5);c.fill();
    txt(c,fmt(P.m,1).replace(',0','')+' kg',bx,gy-s/2,C.onaccent,{align:'center'});
    const k=2.6;
    if(P.F>0) arrow(c,bx+s/2,gy-s/2,bx+s/2+P.F*k,gy-s/2,C.warm,3,'F');
    if(S.fr>0.05) {arrow(c,bx-s/2,gy-6,bx-s/2-S.fr*k,gy-6,C.red,3);txt(c,'F ishq',bx-s/2-S.fr*k-6,gy-18,C.red,{align:'right'});}
    if(Math.abs(S.a)>0.01){const L=clamp(S.a*10,-W*0.35,W*0.35);arrow(c,bx,gy-s-24,bx+L,gy-s-24,C.green,3,'a');}
    if(S.v===0&&P.F<=P.mu*P.m*9.8&&P.F>0) txt(c,'F ≤ μmg — kuch ishqalanishni yengolmaydi',16,22,C.red);
  },
  read:(S,P)=>[['Tezlanish a',fmt(S.a)+' m/s²'],['Tezlik v',fmt(S.v)+' m/s'],['Bosib o‘tilgan yo‘l',fmt(S.x,1)+' m'],['Ishqalanish kuchi',fmt(S.fr,1)+' N']]
});

/* 2. Burchak ostida otilgan jism */
function projCalc(P){const th=P.ang*D2R,vx=P.v0*Math.cos(th),vy=P.v0*Math.sin(th),T=2*vy/P.g;return{th,vx,vy,T,R:vx*T,Hm:vy*vy/(2*P.g)};}
SIMS.push({id:'otilish',cat:'mex',title:'Gorizontga burchak ostida otilgan jism',short:'L = v₀² sin2α / g',
  sub:'Uchish uzoqligi boshlang‘ich tezlik, otish burchagi va erkin tushish tezlanishiga bog‘liq.',
  formula:`<span><i>L</i> = ${fr('<i>v</i><sub>0</sub><sup>2</sup> sin 2<i>α</i>','<i>g</i>')}</span><span class="alt"><i>h</i><sub>max</sub> = ${fr('<i>v</i><sub>0</sub><sup>2</sup> sin<sup>2</sup><i>α</i>','2<i>g</i>')} &nbsp; <i>t</i> = ${fr('2<i>v</i><sub>0</sub> sin <i>α</i>','<i>g</i>')}</span>`,
  text:['Jism gorizontal yo‘nalishda o‘zgarmas tezlik bilan, vertikal yo‘nalishda esa g tezlanish bilan harakatlanadi. Bu ikki harakat qo‘shilib, traektoriya parabola shaklini oladi.','Strelkalar tezlikning tashkil etuvchilarini ko‘rsatadi: gorizontal qismi (vₓ) o‘zgarmaydi, vertikal qismi (vᵧ) eng yuqori nuqtada nolga teng bo‘ladi. Uzoq parvozlar ekranda tezlashtirib ko‘rsatiladi.'],
  legend:[['v₀','boshlang‘ich tezlik, m/s'],['α','otish burchagi'],['g','erkin tushish tezlanishi, m/s²'],['L','uchish uzoqligi, m'],['h','ko‘tarilish balandligi, m']],
  tries:['45° da uchish uzoqligi eng katta bo‘ladi — tekshiring.','30° va 60° burchaklarda L bir xil chiqadi, lekin balandlik va vaqt har xil.','g ni 1,6 m/s² qiling (Oy): jism 6 marta uzoqroqqa uchadi.'],
  params:[{id:'v0',label:'Boshlang‘ich tezlik',sym:'v₀',min:5,max:40,step:1,val:20,unit:'m/s',reset:1},{id:'ang',label:'Otish burchagi',sym:'α',min:5,max:85,step:1,val:50,unit:'°',reset:1},{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:1.6,max:25,step:0.1,val:9.8,unit:'m/s²',d:1,reset:1}],
  init:()=>({t:0,hold:0}),
  step(S,P,dt){const k=projCalc(P);if(S.t<k.T)S.t=Math.min(k.T,S.t+dt*Math.max(1,k.T/4));else{S.hold+=dt;if(S.hold>1.2){S.t=0;S.hold=0;}}},
  draw(c,W,H,S,P){const k=projCalc(P),ox=52,oy=H-40,sc=Math.min((W-90)/k.R,(H-80)/k.Hm);
    const st=niceStep((W-90)/sc,7);c.strokeStyle=C.grid;c.lineWidth=1;c.beginPath();
    for(let m=0;ox+m*sc<W;m+=st){c.moveTo(ox+m*sc,0);c.lineTo(ox+m*sc,oy);}for(let m=0;oy-m*sc>0;m+=st){c.moveTo(ox,oy-m*sc);c.lineTo(W,oy-m*sc);}c.stroke();
    for(let m=st;ox+m*sc<W-20;m+=st) txt(c,fmt(m,st<1?1:0),ox+m*sc,oy+16,C.muted,{align:'center'});
    for(let m=st;oy-m*sc>14;m+=st) txt(c,fmt(m,st<1?1:0),ox-8,oy-m*sc,C.muted,{align:'right'});
    txt(c,'x, m',W-10,oy+16,C.muted,{align:'right'});txt(c,'y, m',ox-8,10,C.muted,{align:'right'});
    line(c,0,oy,W,oy,C.ink,2);
    const X=t=>ox+k.vx*t*sc,Y=t=>oy-(k.vy*t-P.g*t*t/2)*sc;
    c.strokeStyle=C.muted;c.lineWidth=1.5;c.setLineDash([5,6]);c.beginPath();for(let i=0;i<=80;i++){const t=k.T*i/80;i?c.lineTo(X(t),Y(t)):c.moveTo(X(t),Y(t));}c.stroke();c.setLineDash([]);
    c.strokeStyle=C.accent;c.lineWidth=2.5;c.beginPath();for(let i=0;i<=60;i++){const t=S.t*i/60;i?c.lineTo(X(t),Y(t)):c.moveTo(X(t),Y(t));}c.stroke();
    const ay=Y(k.T/2);line(c,X(k.T/2),ay,X(k.T/2),oy,C.green,1,[3,4]);txt(c,'h = '+fmt(k.Hm,1)+' m',X(k.T/2)+8,ay-12,C.green);
    txt(c,'L = '+fmt(k.R,1)+' m',X(k.T),oy-14,C.ink,{align:'right'});
    c.strokeStyle=C.warm;c.lineWidth=1.5;c.beginPath();c.arc(ox,oy,26,-k.th,0);c.stroke();txt(c,'α',ox+32,oy-9,C.warm,{font:MATH});
    const bx=X(S.t),by=Y(S.t),vs=70/P.v0,vyt=k.vy-P.g*S.t;
    if(S.t<k.T){arrow(c,bx,by,bx+k.vx*vs,by,C.warm,2,'vₓ');arrow(c,bx,by,bx,by-vyt*vs,C.green,2,'vᵧ');arrow(c,bx,by,bx+k.vx*vs,by-vyt*vs,C.accent,2.5,'v');}
    disk(c,bx,by,8,C.red);
  },
  read:(S,P)=>{const k=projCalc(P);return[['Uchish uzoqligi L',fmt(k.R,1)+' m'],['Maks. balandlik h',fmt(k.Hm,1)+' m'],['Parvoz vaqti',fmt(k.T)+' s'],['Hozirgi vaqt t',fmt(S.t)+' s']];}
});

/* 3. Aylana bo‘ylab harakat */
SIMS.push({id:'aylana',cat:'mex',title:'Aylana bo‘ylab tekis harakat',short:'a = v² / R',
  sub:'Tezlik moduli o‘zgarmasa ham, yo‘nalishi doim o‘zgaradi — bu markazga intilma tezlanish beradi.',
  formula:`<span><i>a</i> = ${fr('<i>v</i><sup>2</sup>','<i>R</i>')}</span><span class="alt"><i>F</i> = ${fr('<i>mv</i><sup>2</sup>','<i>R</i>')} &nbsp; <i>T</i> = ${fr('2π<i>R</i>','<i>v</i>')}</span>`,
  text:['Aylana bo‘ylab harakatlanayotgan jismning tezligi har doim aylanaga urinma bo‘ylab yo‘naladi (yashil strelka). Yo‘nalish uzluksiz o‘zgargani uchun jism markazga yo‘nalgan tezlanish oladi (to‘q sariq strelka).','Bu tezlanishni markazga intilma kuch hosil qiladi. Ipdagi tosh uchun bu ipning taranglik kuchi, Oy uchun esa Yerning tortishish kuchi.'],
  legend:[['v','chiziqli tezlik, m/s'],['R','aylana radiusi, m'],['a','markazga intilma tezlanish, m/s²'],['T','aylanish davri, s'],['ω','burchak tezlik, rad/s']],
  tries:['Tezlikni 2 marta oshiring: tezlanish 4 marta ortadi.','Radiusni 2 marta oshiring (tezlik o‘zgarmasin): tezlanish 2 marta kamayadi.','Massani o‘zgartiring: tezlanish o‘zgarmaydi, lekin kerakli kuch ortadi.'],
  params:[{id:'r',label:'Radius',sym:'R',min:0.5,max:5,step:0.1,val:3,unit:'m',d:1},{id:'v',label:'Tezlik',sym:'v',min:0.5,max:10,step:0.1,val:3,unit:'m/s',d:1},{id:'m',label:'Massa',sym:'m',min:0.1,max:5,step:0.1,val:1,unit:'kg',d:1}],
  init:()=>({phi:0}),
  step(S,P,dt){S.phi=(S.phi+P.v/P.r*dt)%TAU;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W/2,cy=H/2,sc=(Math.min(W,H)/2-34)/5,R=P.r*sc;
    c.strokeStyle=C.line;c.lineWidth=2;c.setLineDash([4,6]);c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke();c.setLineDash([]);
    c.strokeStyle=rgba('accent',0.45);c.lineWidth=5;c.beginPath();c.arc(cx,cy,R,-S.phi,-S.phi+1.1);c.stroke();
    const bx=cx+R*Math.cos(S.phi),by=cy-R*Math.sin(S.phi);line(c,cx,cy,bx,by,C.muted,1.5);disk(c,cx,cy,3.5,C.ink);
    txt(c,'R',(cx+bx)/2+8,(cy+by)/2-8,C.muted,{font:MATH});
    const vl=14*P.v;arrow(c,bx,by,bx-Math.sin(S.phi)*vl,by-Math.cos(S.phi)*vl,C.green,3,'v');
    const a=P.v*P.v/P.r,al=Math.min(R*0.8,8+Math.sqrt(a)*12);arrow(c,bx,by,bx-Math.cos(S.phi)*al,by+Math.sin(S.phi)*al,C.warm,3,'a');
    disk(c,bx,by,7+P.m*2.2,C.accent);
  },
  read:(S,P)=>{const a=P.v*P.v/P.r;return[['Tezlanish a',fmt(a)+' m/s²'],['Kuch F',fmt(P.m*a)+' N'],['Davr T',fmt(TAU*P.r/P.v)+' s'],['Burchak tezlik ω',fmt(P.v/P.r)+' rad/s']];}
});

/* 4. Impulsning saqlanishi */
function colInit(P){return{x1:4.5,x2:15.5,v1:P.v1,v2:P.v2,hit:false,t:0,flash:0,fx:0};}
SIMS.push({id:'impuls',cat:'mex',title:'Impulsning saqlanish qonuni',short:'m₁v₁ + m₂v₂ = const',
  sub:'Yopiq sistemada to‘qnashuvdan oldingi va keyingi umumiy impuls bir xil.',
  formula:`<span><i>m</i><sub>1</sub><i>v</i><sub>1</sub> + <i>m</i><sub>2</sub><i>v</i><sub>2</sub> = <i>m</i><sub>1</sub><i>v</i><sub>1</sub>′ + <i>m</i><sub>2</sub><i>v</i><sub>2</sub>′</span><span class="alt"><i>p</i> = <i>mv</i></span>`,
  text:['Ikki aravacha to‘qnashganda bir-biriga teng va qarama-qarshi kuch bilan ta’sir qiladi (Nyutonning uchinchi qonuni). Shuning uchun biri yo‘qotgan impulsni ikkinchisi oladi va umumiy impuls o‘zgarmaydi.','Tiklanish koeffitsienti e = 1 bo‘lsa, to‘qnashuv elastik: kinetik energiya ham saqlanadi. e = 0 bo‘lsa, aravachalar yopishib, birga harakatlanadi va energiyaning bir qismi issiqlikka aylanadi. Pastdagi ustunlar impulslarni ko‘rsatadi.'],
  legend:[['m₁, m₂','aravachalar massasi, kg'],['v₁, v₂','to‘qnashuvdan oldingi tezliklar, m/s (minus — chapga)'],['v′','to‘qnashuvdan keyingi tezlik'],['e','tiklanish koeffitsienti']],
  tries:['m₁ = m₂ va e = 1 qiling: aravachalar tezliklarini almashtiradi.','e = 0 qiling: umumiy impuls saqlanadi, kinetik energiya esa kamayadi.','Og‘ir aravachani yengiliga uring: yengil aravacha katta tezlik bilan uchib ketadi.'],
  params:[{id:'m1',label:'1-aravacha massasi',sym:'m₁',min:1,max:10,step:0.5,val:4,unit:'kg',d:1,reset:1},{id:'m2',label:'2-aravacha massasi',sym:'m₂',min:1,max:10,step:0.5,val:2,unit:'kg',d:1,reset:1},{id:'v1',label:'1-aravacha tezligi',sym:'v₁',min:0,max:6,step:0.1,val:3,unit:'m/s',d:1,reset:1},{id:'v2',label:'2-aravacha tezligi',sym:'v₂',min:-6,max:0,step:0.1,val:-1.5,unit:'m/s',d:1,reset:1},{id:'e',label:'Tiklanish koeffitsienti',sym:'e',min:0,max:1,step:0.05,val:1,unit:'',d:2,reset:1}],
  init:colInit,
  step(S,P,dt){S.t+=dt;S.flash=Math.max(0,S.flash-dt);const sc=S.sc||30,h1=(30+P.m1*4)/2/sc,h2=(30+P.m2*4)/2/sc;
    S.x1+=S.v1*dt;S.x2+=S.v2*dt;
    if(!S.hit&&S.x2-S.x1<=h1+h2&&S.v1>S.v2){const p=P.m1*S.v1+P.m2*S.v2,M=P.m1+P.m2,u1=(p+P.m2*P.e*(S.v2-S.v1))/M,u2=(p+P.m1*P.e*(S.v1-S.v2))/M;
      const ov=h1+h2-(S.x2-S.x1);S.x1-=ov/2;S.x2+=ov/2;S.v1=u1;S.v2=u2;S.hit=true;S.flash=0.35;S.fx=S.x1+h1;}
    const out=x=>x<-3||x>23;if((S.t>2&&out(S.x1)&&out(S.x2))||S.t>16)Object.assign(S,colInit(P));},
  draw(c,W,H,S,P){grid(c,W,H,28);const sc=(W-40)/20;S.sc=sc;const x0=20,ty=H*0.5;
    line(c,0,ty,W,ty,C.ink,2);
    const cart=(x,m,col,lab,v)=>{const w=30+m*4,h=34,cx=x0+x*sc;c.fillStyle=col;rrect(c,cx-w/2,ty-h-8,w,h,5);c.fill();disk(c,cx-w/3,ty-5,5,C.ink);disk(c,cx+w/3,ty-5,5,C.ink);
      txt(c,lab,cx,ty-h/2-8,C.onaccent,{align:'center'});if(Math.abs(v)>0.02)arrow(c,cx,ty-h-22,cx+v*16,ty-h-22,col,2.5);txt(c,fmt(v,1)+' m/s',cx,ty-h-40,col,{align:'center'});};
    cart(S.x1,P.m1,C.accent,fmt(P.m1,1).replace(',0','')+' kg',S.v1);cart(S.x2,P.m2,C.warm,fmt(P.m2,1).replace(',0','')+' kg',S.v2);
    if(S.flash>0){c.strokeStyle=rgba('red',S.flash*2.5);c.lineWidth=3;c.beginPath();c.arc(x0+S.fx*sc,ty-25,(0.35-S.flash)*120+8,0,TAU);c.stroke();}
    const p1=P.m1*S.v1,p2=P.m2*S.v2,pmax=Math.max(Math.abs(P.m1*P.v1),Math.abs(P.m2*P.v2),Math.abs(p1),Math.abs(p2),1),bs=(W*0.36)/pmax,zx=W/2;
    const rows=[['p₁',p1,C.accent],['p₂',p2,C.warm],['Σp',p1+p2,C.ink]],by=H*0.66;
    line(c,zx,by-6,zx,by+rows.length*24,C.muted,1);
    rows.forEach((r,i)=>{const y=by+i*24;c.fillStyle=r[2];c.fillRect(Math.min(zx,zx+r[1]*bs),y,Math.abs(r[1]*bs),14);txt(c,r[0],zx-W*0.38-10,y+7,r[2],{align:'right',font:MATH});txt(c,fmt(r[1],1)+' kg·m/s',W-14,y+7,r[2],{align:'right'});});
  },
  read:(S,P)=>{const p0=P.m1*P.v1+P.m2*P.v2,p=P.m1*S.v1+P.m2*S.v2,E0=(P.m1*P.v1**2+P.m2*P.v2**2)/2,E=(P.m1*S.v1**2+P.m2*S.v2**2)/2;
    return[['Impuls (oldin)',fmt(p0)+' kg·m/s'],['Impuls (hozir)',fmt(p)+' kg·m/s'],['Kinetik energiya (oldin)',fmt(E0)+' J'],['Kinetik energiya (hozir)',fmt(E)+' J']];}
});

/* 5. Butun olam tortishish qonuni */
const STARS=Array.from({length:70},()=>[Math.random(),Math.random(),Math.random()]);
function orbInit(P){const vc=Math.sqrt(P.M/P.r0);return{x:P.r0,y:0,vx:0,vy:P.vf*vc,tr:[]};}
SIMS.push({id:'tortishish',cat:'mex',title:'Butun olam tortishish qonuni',short:'F = G m₁m₂ / r²',
  sub:'Ikki jism massalari ko‘paytmasiga to‘g‘ri, masofa kvadratiga teskari proporsional kuch bilan tortishadi.',
  formula:`<span><i>F</i> = <i>G</i> ${fr('<i>m</i><sub>1</sub><i>m</i><sub>2</sub>','<i>r</i><sup>2</sup>')}</span><span class="alt"><i>v</i><sub>1</sub> = ${sq(fr('<i>GM</i>','<i>r</i>'))} &nbsp; <i>v</i><sub>2</sub> = <i>v</i><sub>1</sub>√2</span>`,
  text:['Tortishish kuchi (to‘q sariq strelka) yo‘ldoshni har doim sayyora markaziga tortadi. Agar yo‘ldosh tezligi birinchi kosmik tezlikka (v₁) teng bo‘lsa, u aylana orbita bo‘ylab uchadi.','Tezlik kichikroq bo‘lsa, orbita ellipsga aylanadi: yo‘ldosh sayyoraga yaqinlashganda tezlashadi, uzoqlashganda sekinlashadi (Kepler qonunlari). Tezlik v₁√2 dan katta bo‘lsa, yo‘ldosh tortishishdan qutulib, uchib ketadi.'],
  legend:[['G','gravitatsiya doimiysi, 6,67·10⁻¹¹ N·m²/kg²'],['m₁, m₂','jismlar massasi'],['r','markazlar orasidagi masofa'],['v₁','birinchi kosmik tezlik'],['v₂','ikkinchi kosmik tezlik']],
  tries:['Tezlikni 0,7 ga tushiring: orbita cho‘ziq ellips bo‘ladi.','Tezlikni 1,42 dan oshiring: yo‘ldosh qochib ketadi.','Sayyora massasini oshiring: aylanish tezlashadi, chunki tortishish kuchi ortadi.'],
  params:[{id:'M',label:'Sayyora massasi (nisbiy)',sym:'M',min:0.5,max:3,step:0.1,val:1,unit:'',d:1,reset:1},{id:'r0',label:'Boshlang‘ich masofa (nisbiy)',sym:'r',min:1,max:4,step:0.1,val:2.6,unit:'',d:1,reset:1},{id:'vf',label:'Tezlik (v₁ ga nisbatan)',sym:'v/v₁',min:0.3,max:1.6,step:0.01,val:0.8,unit:'',d:2,reset:1}],
  init:orbInit,
  step(S,P,dt){const n=40,h=dt*4/n;for(let i=0;i<n;i++){const r=Math.hypot(S.x,S.y),a=-P.M/(r*r*r);S.vx+=a*S.x*h;S.vy+=a*S.y*h;S.x+=S.vx*h;S.y+=S.vy*h;}
    S.tr.push([S.x,S.y]);if(S.tr.length>700)S.tr.shift();const r=Math.hypot(S.x,S.y);if(r<0.32||r>16)Object.assign(S,orbInit(P));},
  draw(c,W,H,S,P){const cx=W/2,cy=H/2,sc=Math.min(W,H)/2/5;
    STARS.forEach(s=>disk(c,s[0]*W,s[1]*H,s[2]*1.3+0.3,rgba('muted',0.5)));
    c.strokeStyle=rgba('accent',0.6);c.lineWidth=1.8;c.beginPath();S.tr.forEach((p,i)=>{const x=cx+p[0]*sc,y=cy-p[1]*sc;i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();
    const pr=10+P.M*5;const g=c.createRadialGradient(cx-pr/3,cy-pr/3,2,cx,cy,pr);g.addColorStop(0,C.water);g.addColorStop(1,C.accent);disk(c,cx,cy,pr,g);
    const sx=cx+S.x*sc,sy=cy-S.y*sc,r=Math.hypot(S.x,S.y),F=P.M/(r*r),fl=clamp(110*F,8,95);
    arrow(c,sx,sy,sx-S.x/r*fl,sy+S.y/r*fl,C.warm,2.5,'F');const v=Math.hypot(S.vx,S.vy);arrow(c,sx,sy,sx+S.vx*45,sy-S.vy*45,C.green,2.5,'v');
    disk(c,sx,sy,5,C.ink);
  },
  read:(S,P)=>{const r=Math.hypot(S.x,S.y),v=Math.hypot(S.vx,S.vy),F0=P.M/(P.r0*P.r0),F=P.M/(r*r);const t=Math.abs(P.vf-1)<0.015?'aylana':P.vf>=Math.SQRT2?'giperbola — qochib ketadi':'ellips';
    return[['Masofa r',fmt(r)],['Tezlik v',fmt(v)],['Kuch F / F₀',fmt(F/F0)],['Orbita shakli',t]];}
});

/* 6. Arximed qonuni */
SIMS.push({id:'arximed',cat:'mex',title:'Arximed qonuni',short:'Fₐ = ρgV',
  sub:'Suyuqlikka botirilgan jismga u siqib chiqargan suyuqlik og‘irligiga teng itaruvchi kuch ta’sir qiladi.',
  formula:`<span><i>F</i><sub>A</sub> = <i>ρ</i><sub>s</sub><i>gV</i><sub>b</sub></span><span class="alt">suzish sharti: <i>ρ</i><sub>j</sub> &lt; <i>ρ</i><sub>s</sub></span>`,
  text:['Suyuqlik bosimi chuqurlik ortgani sari ortadi, shuning uchun jismning pastki yuziga yuqoridagidan kattaroq bosim ta’sir qiladi. Bu farq yuqoriga itaruvchi Arximed kuchini (yashil) hosil qiladi.','Agar jism zichligi suyuqlik zichligidan kichik bo‘lsa, Arximed kuchi og‘irlik kuchini (qizil) jism to‘liq botmasdan muvozanatlaydi va jism suzadi. Aks holda jism cho‘kadi.'],
  legend:[['F_A','Arximed kuchi, N'],['ρ_s','suyuqlik zichligi, kg/m³'],['ρ_j','jism zichligi, kg/m³'],['V_b','jismning botgan qismi hajmi, m³'],['g','9,8 m/s²']],
  tries:['Jism zichligini 1000 kg/m³ dan oshiring: u cho‘kadi.','Suyuqlik zichligini oshiring (sho‘r suv): jism yuqoriroq suzadi.','Suzayotgan jismning botgan qismi ρ_j / ρ_s ga teng: 600 / 1000 = 60 %.'],
  params:[{id:'ro',label:'Jism zichligi',sym:'ρ_j',min:100,max:3000,step:50,val:600,unit:'kg/m³',d:0},{id:'rf',label:'Suyuqlik zichligi',sym:'ρ_s',min:700,max:1500,step:10,val:1000,unit:'kg/m³',d:0},{id:'V',label:'Jism hajmi',sym:'V',min:1,max:20,step:1,val:8,unit:'L',d:0}],
  init:()=>({y:-0.8,v:0,floor:2.2}),
  step(S,P,dt){const n=4,h=dt/n;for(let i=0;i<n;i++){const f=clamp(S.y,0,1),a=7*(1-P.rf/P.ro*f)-(f>0?2.4:0.1)*S.v;S.v+=a*h;S.y+=S.v*h;if(S.y>S.floor){S.y=S.floor;S.v=0;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const tl=W*0.14,tr=W*0.6,tt=H*0.1,tb=H-22,sy=H*0.38,side=46+P.V*2.6;S.floor=(tb-2-sy)/side;
    const cx=(tl+tr)/2,top=sy+(S.y-1)*side;
    c.fillStyle=C.warm;rrect(c,cx-side/2,top,side,side,3);c.fill();
    c.fillStyle=rgba('water',0.38);c.fillRect(tl,sy,tr-tl,tb-sy);line(c,tl,sy,tr,sy,C.water,2);
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(tl,tt);c.lineTo(tl,tb);c.lineTo(tr,tb);c.lineTo(tr,tt);c.stroke();
    const f=clamp(S.y,0,1),Vm=P.V/1000,mg=P.ro*Vm*9.8,FA=P.rf*9.8*Vm*f,Fmax=Math.max(mg,P.rf*9.8*Vm),k=(H*0.3)/Fmax,my=top+side/2;
    arrow(c,cx-8,my,cx-8,my+mg*k,C.red,3,'mg');if(FA>0.01)arrow(c,cx+8,my,cx+8,my-FA*k,C.green,3,'Fₐ');
    const px=tr+24;txt(c,'Holati:',px,H*0.2,C.muted);
    const st=P.ro<P.rf?'suzadi':P.ro===P.rf?'muallaq':'cho‘kadi';txt(c,st,px,H*0.2+20,P.ro<P.rf?C.green:P.ro===P.rf?C.accent:C.red,{font:'600 16px "IBM Plex Sans", sans-serif'});
    txt(c,'Botgan qism:',px,H*0.2+52,C.muted);txt(c,fmt(f*100,0)+' %',px,H*0.2+72,C.ink,{font:'600 16px "IBM Plex Mono", monospace'});
    const bh=H*0.36,bt=H*0.2+92;c.strokeStyle=C.line;c.lineWidth=1;c.strokeRect(px,bt,22,bh);c.fillStyle=rgba('water',0.6);c.fillRect(px,bt+bh*(1-f),22,bh*f);
  },
  read:(S,P)=>{const f=clamp(S.y,0,1),Vm=P.V/1000;return[['Og‘irlik kuchi mg',fmt(P.ro*Vm*9.8,1)+' N'],['Arximed kuchi Fₐ',fmt(P.rf*9.8*Vm*f,1)+' N'],['To‘liq botganda Fₐ',fmt(P.rf*9.8*Vm,1)+' N'],['Muvozanatda botish',P.ro<P.rf?fmt(P.ro/P.rf*100,0)+' %':'100 % (cho‘kadi)']];}
});

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

/* 8. Matematik mayatnik */
SIMS.push({id:'mayatnik',cat:'teb',title:'Matematik mayatnik',short:'T = 2π√(l/g)',
  sub:'Kichik burchaklarda mayatnik davri faqat ip uzunligi va erkin tushish tezlanishiga bog‘liq.',
  formula:`<span><i>T</i> = 2π${sq(fr('<i>l</i>','<i>g</i>'))}</span><span class="alt"><i>mgh</i> = ${fr('<i>mv</i><sup>2</sup>','2')}</span>`,
  text:['Ipga osilgan yuk og‘irlik kuchi ta’sirida tebranadi. Yukning massasi davrga ta’sir qilmaydi: og‘irroq yukni kuchliroq tortishadi, lekin uni harakatga keltirish ham qiyinroq.','Tebranish davomida potensial energiya kinetik energiyaga aylanadi va aksincha (o‘ngdagi ustunlar). Formula kichik burchaklar uchun aniq; katta burchakda o‘lchangan davr biroz uzunroq chiqadi.'],
  legend:[['T','tebranish davri, s'],['l','ip uzunligi, m'],['g','erkin tushish tezlanishi, m/s²'],['θ','og‘ish burchagi']],
  tries:['Ip uzunligini 4 marta oshiring: davr 2 marta ortadi.','Burchakni 70° ga yetkazing va «o‘lchangan davr»ni formula bilan solishtiring.','g = 1,6 m/s² qiling: Oyda mayatnik 2,5 marta sekin tebranadi.'],
  params:[{id:'L',label:'Ip uzunligi',sym:'l',min:0.2,max:3,step:0.05,val:1.5,unit:'m',d:2,reset:1},{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:1.6,max:25,step:0.1,val:9.8,unit:'m/s²',d:1,reset:1},{id:'th0',label:'Boshlang‘ich burchak',sym:'θ₀',min:5,max:80,step:1,val:25,unit:'°',d:0,reset:1}],
  init:P=>({th:P.th0*D2R,w:0,t:0,lc:null,Tm:null}),
  step(S,P,dt){const n=16,h=dt/n;for(let i=0;i<n;i++){const pw=S.w;S.w+=-(P.g/P.L)*Math.sin(S.th)*h;S.th+=S.w*h;S.t+=h;if(pw>0&&S.w<=0){if(S.lc!==null)S.Tm=S.t-S.lc;S.lc=S.t;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const px=W*0.4,py=30,sc=(H-80)/3.1,L=P.L*sc,bx=px+L*Math.sin(S.th),by=py+L*Math.cos(S.th),a0=P.th0*D2R;
    c.fillStyle=rgba('muted',0.3);c.fillRect(px-50,py-10,100,10);line(c,px-50,py,px+50,py,C.ink,2);
    line(c,px,py,px,py+L+20,C.muted,1,[3,4]);
    c.strokeStyle=C.line;c.lineWidth=2;c.setLineDash([2,5]);c.beginPath();c.arc(px,py,L,Math.PI/2-a0,Math.PI/2+a0);c.stroke();c.setLineDash([]);
    line(c,px,py,bx,by,C.ink,2);disk(c,px,py,3.5,C.ink);
    c.strokeStyle=C.warm;c.lineWidth=1.5;c.beginPath();const ar=Math.min(40,L*0.5);if(S.th>0)c.arc(px,py,ar,Math.PI/2-S.th,Math.PI/2);else c.arc(px,py,ar,Math.PI/2,Math.PI/2-S.th);c.stroke();
    txt(c,'θ',px+(S.th>0?1:-1)*(ar*0.45)+ (S.th>0?2:-10),py+ar+12,C.warm,{font:MATH});
    arrow(c,bx,by,bx,by+40,C.red,2,'mg');disk(c,bx,by,14,C.accent);
    const E=P.g*P.L*(1-Math.cos(a0)),Ep=P.g*P.L*(1-Math.cos(S.th)),Ek=Math.max(0,E-Ep),bx0=W-120,bh=H*0.55,bb=H*0.82;
    [['Eₖ',Ek,C.warm],['Eₚ',Ep,C.green]].forEach((b,i)=>{const x=bx0+i*50,h=E>0?b[1]/E*bh:0;c.strokeStyle=C.line;c.lineWidth=1;c.strokeRect(x,bb-bh,34,bh);c.fillStyle=b[2];c.fillRect(x,bb-h,34,h);txt(c,b[0],x+17,bb+16,b[2],{align:'center',font:MATH});});
    txt(c,'Energiya',bx0-4,bb-bh-14,C.muted);
  },
  read:(S,P)=>[['Davr (formula)',fmt(TAU*Math.sqrt(P.L/P.g))+' s'],['Davr (o‘lchangan)',S.Tm?fmt(S.Tm)+' s':'o‘lchanmoqda…'],['Burchak θ',fmt(S.th/D2R,1)+'°'],['Tezlik v',fmt(Math.abs(S.w)*P.L)+' m/s']]
});

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

/* 10. Interferensiya */
const off=document.createElement('canvas'),octx=off.getContext('2d');
SIMS.push({id:'interferensiya',cat:'teb',title:'To‘lqinlar interferensiyasi',short:'d sinφ = kλ',
  sub:'Ikki kogerent manba to‘lqinlari qo‘shilib, kuchayish va so‘nish sohalarini hosil qiladi.',
  formula:`<span><i>d</i> sin <i>φ</i> = <i>kλ</i></span><span class="alt">maksimum: Δ = <i>kλ</i> &nbsp; minimum: Δ = (2<i>k</i>+1)${fr('<i>λ</i>','2')}</span>`,
  text:['Ikki manba bir xil chastotada tebranadi. Ulardan chiqqan to‘lqinlar fazoning har bir nuqtasida qo‘shiladi. Yo‘llar farqi Δ to‘lqin uzunligining butun soniga teng bo‘lsa, o‘rkach o‘rkachga tushib, to‘lqin kuchayadi.','Yo‘llar farqi yarim to‘lqin uzunligining toq soniga teng bo‘lsa, o‘rkach chuqurlikka tushib, to‘lqinlar bir-birini so‘ndiradi. Punktir chiziqlar maksimum yo‘nalishlarini ko‘rsatadi.'],
  legend:[['d','manbalar orasidagi masofa'],['φ','maksimum yo‘nalishi burchagi'],['k','maksimum tartibi (0, ±1, ±2…)'],['λ','to‘lqin uzunligi'],['Δ','yo‘llar farqi']],
  tries:['Manbalar orasini kattalashtiring: maksimumlar soni ortadi.','λ ni kattalashtiring: interferensiya chiziqlari siyraklashadi.','d < λ bo‘lsa, faqat bitta markaziy maksimum qoladi.'],
  params:[{id:'d',label:'Manbalar orasi',sym:'d',min:0.5,max:8,step:0.1,val:3,unit:'sm',d:1},{id:'lam',label:'To‘lqin uzunligi',sym:'λ',min:0.5,max:3,step:0.05,val:1,unit:'sm',d:2}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){const res=4,gw=Math.ceil(W/res),gh=Math.ceil(H/res);if(off.width!==gw||off.height!==gh){off.width=gw;off.height=gh;}
    const sc=W/24,sx=W*0.08,s1=H/2-P.d*sc/2,s2=H/2+P.d*sc/2,k=TAU/P.lam,w=TAU*0.9,im=octx.createImageData(gw,gh),D=im.data,bg=CR.canvas,a=CR.accent,b=CR.warm;
    for(let j=0;j<gh;j++){const py=(j+.5)*res;for(let i=0;i<gw;i++){const px=(i+.5)*res;const r1=Math.hypot(px-sx,py-s1)/sc,r2=Math.hypot(px-sx,py-s2)/sc;
      let v=(Math.cos(k*r1-w*S.t)+Math.cos(k*r2-w*S.t))/2;const col=v>0?a:b;v=Math.abs(v);v=v*(0.35+0.65*Math.min(1,(px-sx)/(W*0.25)+0.3));const o=(j*gw+i)*4;
      D[o]=bg[0]+(col[0]-bg[0])*v;D[o+1]=bg[1]+(col[1]-bg[1])*v;D[o+2]=bg[2]+(col[2]-bg[2])*v;D[o+3]=255;}}
    octx.putImageData(im,0,0);c.imageSmoothingEnabled=true;c.drawImage(off,0,0,gw*res,gh*res);
    const M=Math.floor(P.d/P.lam+1e-9);for(let m=-M;m<=M;m++){const s=m*P.lam/P.d;if(Math.abs(s)>0.999)continue;const th=Math.asin(s),L=Math.hypot(W,H);
      line(c,sx,H/2,sx+Math.cos(th)*L,H/2+Math.sin(th)*L,rgba('ink',0.45),1.2,[6,6]);const ex=Math.min(W-30,sx+Math.cos(th)*(W*0.82)),ey=H/2+Math.tan(th)*(ex-sx);if(ey>12&&ey<H-12)txt(c,'k='+m,ex,ey-10,C.ink,{align:'center'});}
    disk(c,sx,s1,6,C.ink);disk(c,sx,s2,6,C.ink);line(c,sx-14,s1,sx-14,s2,C.ink,1);txt(c,'d',sx-22,H/2,C.ink,{font:MATH,align:'right'});
  },
  read:(S,P)=>{const M=Math.floor(P.d/P.lam+1e-9),n=2*M+1-(Math.abs(M*P.lam/P.d-1)<1e-9?2:0);return[['Maksimumlar soni',String(n)],['1-maksimum burchagi',P.lam<P.d?fmt(Math.asin(P.lam/P.d)/D2R,1)+'°':'yo‘q'],['d / λ',fmt(P.d/P.lam)]];}
});

/* 11. Doppler effekti */
SIMS.push({id:'doppler',cat:'teb',title:'Doppler effekti',short:'ν = ν₀·v/(v ∓ u)',
  sub:'Manba yaqinlashganda tovush chastotasi ortadi, uzoqlashganda kamayadi.',
  formula:`<span><i>ν</i> = <i>ν</i><sub>0</sub>${fr('<i>v</i>','<i>v</i> ∓ <i>u</i>')}</span><span class="alt">«−» yaqinlashganda, «+» uzoqlashganda</span>`,
  text:['Manba har bir to‘lqin frontini yangi joydan chiqaradi. Shuning uchun harakat yo‘nalishida frontlar zichlashadi (to‘lqin uzunligi qisqaradi, chastota ortadi), orqada esa siyraklashadi.','Shu sababli yaqinlashayotgan tez yordam mashinasi sirenasi baland, uzoqlashayotgani esa past eshitiladi. Manba tovushdan tez harakatlansa (u > v), frontlar konus shaklida to‘planadi — bu zarba to‘lqini, samolyot «tovush to‘sig‘i»ni yorib o‘tganda eshitiladigan gumburlash.'],
  legend:[['ν₀','manba chastotasi, Hz'],['ν','kuzatuvchi eshitadigan chastota'],['v','tovush tezligi (havoda 340 m/s)'],['u','manba tezligi']],
  tries:['Tezlikni 0 qiling: frontlar konsentrik aylanalar.','Tezlikni 0,9 Max qiling: oldindagi kuzatuvchi 10 marta yuqori chastota eshitadi.','1 Max dan oshiring: Max konusi paydo bo‘ladi.'],
  params:[{id:'u',label:'Manba tezligi',sym:'u',min:0,max:1.6,step:0.01,val:0.5,unit:'',d:2,show:v=>fmt(v,2)+' Max · '+fmt(v*340,0)+' m/s'},{id:'f0',label:'Manba chastotasi',sym:'ν₀',min:200,max:1000,step:10,val:440,unit:'Hz',d:0}],
  init:()=>({fr:[],sx:null,acc:0,t:0}),
  step(S,P,dt){if(S.sx===null)return;const cp=110;S.t+=dt;S.sx+=P.u*cp*dt;const W=S.W;if(S.sx>W+30){S.sx=-30;}S.acc+=dt*P.f0/220;while(S.acc>=1){S.fr.push([S.sx,S.t]);S.acc-=1;}const D=Math.hypot(W,S.H)*1.2;S.fr=S.fr.filter(f=>(S.t-f[1])*cp<D);},
  draw(c,W,H,S,P){grid(c,W,H,28);S.W=W;S.H=H;if(S.sx===null)S.sx=P.u<0.02?W/2:W*0.2;const cp=110,cy=H/2;
    S.fr.forEach(f=>{const r=(S.t-f[1])*cp;c.strokeStyle=rgba('accent',Math.max(0.12,0.9-r/(W*0.9)));c.lineWidth=1.6;c.beginPath();c.arc(f[0],cy,r,0,TAU);c.stroke();});
    if(P.u>1){const al=Math.asin(1/P.u),L=W;line(c,S.sx,cy,S.sx-Math.cos(al)*L,cy-Math.sin(al)*L,C.red,2);line(c,S.sx,cy,S.sx-Math.cos(al)*L,cy+Math.sin(al)*L,C.red,2);txt(c,'Max konusi',S.sx-60,cy-Math.tan(al)*60-14,C.red,{align:'center'});}
    disk(c,S.sx,cy,9,C.red);if(P.u>0.02)arrow(c,S.sx+12,cy,S.sx+12+P.u*40,cy,C.red,2.5,'u');
    disk(c,14,cy,7,C.green);disk(c,W-14,cy,7,C.green);
    const fa=P.u<1?P.f0/(1-P.u):Infinity,fb=P.f0/(1+P.u);
    txt(c,'Orqada: '+fmt(fb,0)+' Hz',14,22,C.green);txt(c,'Oldinda: '+(P.u<1?fmt(fa,0)+' Hz':'zarba to‘lqini'),W-14,22,C.green,{align:'right'});
  },
  read:(S,P)=>[['Oldinda ν',P.u<1?fmt(P.f0/(1-P.u),0)+' Hz':'— (u ≥ v)'],['Orqada ν',fmt(P.f0/(1+P.u),0)+' Hz'],['Oldinda λ',P.u<1?fmt(340*(1-P.u)/P.f0,3)+' m':'—'],['Orqada λ',fmt(340*(1+P.u)/P.f0,3)+' m']]
});

/* 12. Kulon qonuni */
function coulPos(W,H,P){const sc=W*0.7,cx=W/2;return{sc,cx,x1:cx-P.r*sc/2,x2:cx+P.r*sc/2,y:H/2};}
function newDot(W,H){return{x:Math.random()*W,y:Math.random()*H,px:0,py:0,l:1+Math.random()*2.5};}
SIMS.push({id:'kulon',cat:'ele',title:'Kulon qonuni',short:'F = k|q₁||q₂| / r²',
  sub:'Ikki nuqtaviy zaryadning o‘zaro ta’sir kuchi zaryadlarga to‘g‘ri, masofa kvadratiga teskari proporsional.',
  formula:`<span><i>F</i> = <i>k</i>${fr('|<i>q</i><sub>1</sub>| · |<i>q</i><sub>2</sub>|','<i>r</i><sup>2</sup>')}</span><span class="alt"><i>k</i> = 9·10<sup>9</sup> N·m²/C²</span>`,
  text:['Bir xil ishorali zaryadlar itariladi, har xil ishorali zaryadlar tortishadi. Ikkala zaryadga teng, lekin qarama-qarshi yo‘nalgan kuch ta’sir qiladi.','Kulrang chiziqchalar musbat sinov zaryadi qaysi tomonga harakatlanishini, ya’ni elektr maydon kuchlanganligi yo‘nalishini ko‘rsatadi. Ular musbat zaryaddan chiqib, manfiy zaryadga kiradi.'],
  legend:[['q₁, q₂','zaryadlar, mkC (1 mkC = 10⁻⁶ C)'],['r','zaryadlar orasidagi masofa, m'],['k','Kulon doimiysi'],['F','o‘zaro ta’sir kuchi, N']],
  tries:['Zaryadni sichqoncha yoki barmoq bilan suring: masofa 2 marta kamaysa, kuch 4 marta ortadi.','Ikkala zaryadni musbat qiling: maydon chiziqlari bir-biridan qochadi.','Bitta zaryadni 0 qiling: kuch yo‘qoladi.'],
  params:[{id:'q1',label:'1-zaryad',sym:'q₁',min:-5,max:5,step:0.5,val:3,unit:'mkC',d:1},{id:'q2',label:'2-zaryad',sym:'q₂',min:-5,max:5,step:0.5,val:-2,unit:'mkC',d:1},{id:'r',label:'Masofa',sym:'r',min:0.1,max:1,step:0.01,val:0.5,unit:'m',d:2}],
  hint:'Zaryadlarni suring',
  init:()=>({dots:[],drag:false}),
  step(S,P,dt){if(!S.W)return;const W=S.W,H=S.H,g=coulPos(W,H,P);while(S.dots.length<150)S.dots.push(newDot(W,H));
    for(const d of S.dots){d.px=d.x;d.py=d.y;let ex=0,ey=0;[[g.x1,P.q1],[g.x2,P.q2]].forEach(([x,q])=>{const dx=d.x-x,dy=d.y-g.y,r2=dx*dx+dy*dy+1,r=Math.sqrt(r2);ex+=q*dx/(r2*r);ey+=q*dy/(r2*r);});
      const e=Math.hypot(ex,ey);d.l-=dt;if(e>1e-12){d.x+=ex/e*70*dt;d.y+=ey/e*70*dt;}
      const near=Math.hypot(d.x-g.x1,d.y-g.y)<14||Math.hypot(d.x-g.x2,d.y-g.y)<14;if(d.l<0||near||d.x<0||d.x>W||d.y<0||d.y>H)Object.assign(d,newDot(W,H),{px:NaN});}},
  draw(c,W,H,S,P){grid(c,W,H,28);S.W=W;S.H=H;const g=coulPos(W,H,P);
    c.strokeStyle=rgba('muted',0.75);c.lineWidth=1.6;c.beginPath();S.dots.forEach(d=>{if(isNaN(d.px))return;const dx=d.x-d.px,dy=d.y-d.py,L=Math.hypot(dx,dy)||1;c.moveTo(d.x-dx/L*7,d.y-dy/L*7);c.lineTo(d.x,d.y);});c.stroke();
    const F=8.99e9*Math.abs(P.q1*P.q2)*1e-12/(P.r*P.r),fl=F>0?Math.min(150,10+F*5):0,rep=P.q1*P.q2>0;
    if(fl){const d1=rep?-1:1;arrow(c,g.x1,g.y,g.x1+d1*fl,g.y,C.warm,3);txt(c,'F₁',g.x1+d1*fl,g.y-16,C.warm,{align:'center',font:MATH});arrow(c,g.x2,g.y,g.x2-d1*fl,g.y,C.warm,3);txt(c,'F₂',g.x2-d1*fl,g.y-16,C.warm,{align:'center',font:MATH});}
    [[g.x1,P.q1],[g.x2,P.q2]].forEach(([x,q])=>{const r=14+Math.abs(q)*2;disk(c,x,g.y,r,q>0?C.red:q<0?C.accent:C.muted);txt(c,q>0?'+':q<0?'−':'0',x,g.y+1,C.onaccent,{align:'center',font:'600 18px "IBM Plex Sans", sans-serif'});});
    const by=g.y+48;line(c,g.x1,by,g.x2,by,C.ink,1.2);line(c,g.x1,by-5,g.x1,by+5,C.ink,1.2);line(c,g.x2,by-5,g.x2,by+5,C.ink,1.2);txt(c,'r = '+fmt(P.r)+' m',(g.x1+g.x2)/2,by+16,C.ink,{align:'center'});
  },
  pointer(type,x,y,S,P,api){const g=coulPos(S.W,S.H,P);if(type==='down'){if((Math.hypot(x-g.x1,y-g.y)<30)||(Math.hypot(x-g.x2,y-g.y)<30)){S.drag=true;return true;}return false;}
    if(type==='move'&&S.drag){api.set('r',Math.round(clamp(Math.abs(x-g.cx)*2/g.sc,0.1,1)*100)/100);return true;}if(type==='up')S.drag=false;return false;},
  read:(S,P)=>{const F=8.99e9*Math.abs(P.q1*P.q2)*1e-12/(P.r*P.r);return[['Kuch F',fmt(F,3)+' N'],['Ta’sir turi',P.q1*P.q2>0?'itarish':P.q1*P.q2<0?'tortishish':'ta’sir yo‘q'],['Masofa r',fmt(P.r)+' m']];}
});

/* 13. Om qonuni */
SIMS.push({id:'om',cat:'ele',title:'Zanjir qismi uchun Om qonuni',short:'I = U / R',
  sub:'Tok kuchi kuchlanishga to‘g‘ri, qarshilikka teskari proporsional.',
  formula:`<span><i>I</i> = ${fr('<i>U</i>','<i>R</i>')}</span><span class="alt"><i>P</i> = <i>UI</i> = <i>I</i><sup>2</sup><i>R</i></span>`,
  text:['Manba kuchlanishi elektronlarni zanjir bo‘ylab harakatga keltiradi, qarshilik esa bu harakatga to‘sqinlik qiladi. Ko‘k nuqtalar elektronlar: ular tokning shartli yo‘nalishiga (to‘q sariq strelkalar) teskari harakatlanadi.','Lampa yorug‘ligi ajralayotgan quvvatni ko‘rsatadi. O‘ngdagi grafikda tok kuchining kuchlanishga bog‘liqligi to‘g‘ri chiziq, uning qiyaligi 1/R ga teng.'],
  legend:[['I','tok kuchi, A'],['U','kuchlanish, V'],['R','qarshilik, Ω'],['P','quvvat, W']],
  tries:['Qarshilikni oshiring: elektronlar sekinlashadi, lampa xiralashadi.','Kuchlanishni 2 marta oshiring: tok ham 2 marta ortadi, quvvat esa 4 marta.','Grafikdagi chiziq qiyaligini R bilan solishtiring.'],
  params:[{id:'U',label:'Kuchlanish',sym:'U',min:1,max:24,step:0.5,val:12,unit:'V',d:1},{id:'R',label:'Qarshilik',sym:'R',min:2,max:100,step:1,val:20,unit:'Ω',d:0}],
  init:()=>({s:0}),step(S,P,dt){const I=P.U/P.R;S.s+=40*Math.pow(I,0.6)*dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const I=P.U/P.R,Pw=P.U*I,L=30,R=W*0.58,T=H*0.18,B=H*0.82,w=R-L,h=B-T,per=2*(w+h);
    const pt=s=>{s=((s%per)+per)%per;if(s<h)return[L,B-s];s-=h;if(s<w)return[L+s,T];s-=w;if(s<h)return[R,T+s];s-=h;return[R-s,B];};
    c.strokeStyle=C.ink;c.lineWidth=2.5;c.strokeRect(L,T,w,h);
    const my=(T+B)/2;c.fillStyle=C.canvas;c.fillRect(L-14,my-14,28,28);line(c,L-16,my-8,L+16,my-8,C.ink,2.5);line(c,L-8,my+8,L+8,my+8,C.ink,5);txt(c,'+',L-26,my-8,C.red,{align:'center',font:'600 16px sans-serif'});txt(c,'−',L-26,my+9,C.accent,{align:'center',font:'600 16px sans-serif'});txt(c,'U',L+24,my,C.ink,{font:MATH});
    const rx=L+w/2;c.fillStyle=C.canvas;c.fillRect(rx-40,T-14,80,28);c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(rx-40,T);for(let i=0;i<8;i++)c.lineTo(rx-35+i*10,T+(i%2?10:-10));c.lineTo(rx+40,T);c.stroke();txt(c,'R = '+P.R+' Ω',rx,T-24,C.ink,{align:'center'});
    const glow=Math.sqrt(Pw/288);const gg=c.createRadialGradient(R,my,4,R,my,30+glow*40);gg.addColorStop(0,`rgba(255,200,60,${0.25+glow*0.7})`);gg.addColorStop(1,'rgba(255,200,60,0)');c.fillStyle=gg;c.beginPath();c.arc(R,my,30+glow*40,0,TAU);c.fill();
    disk(c,R,my,16,C.canvas,C.ink);line(c,R-10,my-10,R+10,my+10,C.ink,2);line(c,R-10,my+10,R+10,my-10,C.ink,2);
    const N=44;c.fillStyle=C.accent;for(let i=0;i<N;i++){const p=pt(per*i/N-S.s);c.beginPath();c.arc(p[0],p[1],3.2,0,TAU);c.fill();}
    arrow(c,L+w*0.2,T+18,L+w*0.3,T+18,C.warm,2,'I');arrow(c,R-18,T+h*0.2,R-18,T+h*0.3,C.warm,2);arrow(c,L+w*0.8,B-18,L+w*0.7,B-18,C.warm,2);
    const gx=W*0.67,gr=W-22,gt=H*0.18,gb=H*0.82,Im=3,ux=(gr-gx)/24,iy=(gb-gt)/Im;line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'U, V',gr,gb+16,C.muted,{align:'right'});txt(c,'I, A',gx+4,gt-10,C.muted);
    [0,12,24].forEach(u=>txt(c,u+'',gx+u*ux,gb+16,C.muted,{align:'center'}));[1,2,3].forEach(i=>txt(c,i+'',gx-6,gb-i*iy,C.muted,{align:'right'}));
    c.save();c.beginPath();c.rect(gx,gt,gr-gx,gb-gt);c.clip();line(c,gx,gb,gx+24*ux,gb-24/P.R*iy,C.accent,2.5);c.restore();
    if(I<=Im)disk(c,gx+P.U*ux,gb-I*iy,5,C.red);else arrow(c,gx+P.U*ux,gt+20,gx+P.U*ux,gt+2,C.red,2);
  },
  read:(S,P)=>{const I=P.U/P.R;return[['Tok kuchi I',fmt(I,3)+' A'],['Quvvat P',fmt(P.U*I,1)+' W'],['1 s da o‘tgan elektronlar',fmt(I/1.6e-19)]];}
});

/* 14. Lorens kuchi */
SIMS.push({id:'lorens',cat:'ele',title:'Lorens kuchi',short:'F = qvB',
  sub:'Magnit maydonida harakatlanayotgan zaryadli zarra aylana bo‘ylab harakatlanadi.',
  formula:`<span><i>F</i> = <i>qvB</i> sin <i>α</i></span><span class="alt"><i>r</i> = ${fr('<i>mv</i>','<i>qB</i>')} &nbsp; <i>T</i> = ${fr('2π<i>m</i>','<i>qB</i>')}</span>`,
  text:['Lorens kuchi (to‘q sariq) har doim zarra tezligiga (yashil) perpendikulyar. U tezlik modulini o‘zgartirmaydi, faqat yo‘nalishini buradi. Natijada zarra aylana chizadi.','× belgisi magnit induksiya chiziqlari ekranga kirib ketayotganini bildiradi. Musbat va manfiy zarralar qarama-qarshi tomonlarga buriladi. Mass-spektrometr va siklotron shu hodisaga asoslangan.'],
  legend:[['q','zarra zaryadi (proton: 1,6·10⁻¹⁹ C)'],['v','tezlik, m/s'],['B','magnit induksiyasi, T'],['m','zarra massasi'],['r','aylana radiusi']],
  tries:['Zaryad ishorasini almashtiring: zarra teskari tomonga buriladi.','Tezlikni oshiring: radius ortadi, lekin aylanish davri o‘zgarmaydi.','B ni 2 marta oshiring: radius 2 marta kichrayadi.'],
  params:[{id:'B',label:'Magnit induksiyasi',sym:'B',min:0.5,max:3,step:0.1,val:1,unit:'T',d:1,reset:1},{id:'v',label:'Tezlik',sym:'v',min:1,max:3,step:0.1,val:2,unit:'·10⁵ m/s',d:1,reset:1},{id:'m',label:'Massa (proton massasida)',sym:'m',min:1,max:4,step:1,val:1,unit:'mₚ',d:0,reset:1},{id:'q',label:'Zaryad ishorasi',sym:'q',choices:[[1,'Musbat (+)'],[-1,'Manfiy (−)']],val:1,reset:1}],
  init:()=>({x:null,y:0,vx:0,vy:0,tr:[]}),
  step(S,P,dt){if(S.x===null)return;const w=6*P.B/(1.04*P.m)*P.q,a=w*dt,cs=Math.cos(a),sn=Math.sin(a),vx=S.vx*cs+S.vy*sn,vy=-S.vx*sn+S.vy*cs;S.vx=vx;S.vy=vy;S.x+=S.vx*dt;S.y+=S.vy*dt;
    S.tr.push([S.x,S.y]);if(S.tr.length>500)S.tr.shift();if(S.x<-20||S.x>S.W+20||S.y<-20||S.y>S.H+20)S.x=null;},
  draw(c,W,H,S,P){S.W=W;S.H=H;if(S.x===null){S.x=W*0.3;S.y=H/2;S.vx=120*P.v;S.vy=0;S.tr=[];}
    c.strokeStyle=rgba('muted',0.35);c.lineWidth=1.2;c.beginPath();for(let x=20;x<W;x+=36)for(let y=20;y<H;y+=36){c.moveTo(x-4,y-4);c.lineTo(x+4,y+4);c.moveTo(x+4,y-4);c.lineTo(x-4,y+4);}c.stroke();
    txt(c,'B ⊗',W-14,16,C.muted,{align:'right'});
    const v=Math.hypot(S.vx,S.vy),r=20*1.04*P.m*P.v/P.B,nx=-S.vy/v*P.q,ny=S.vx/v*P.q;
    const ccx=S.x+(-ny)*0+nx*0;const cx=S.x+ (S.vy/v)*r*P.q,cy=S.y-(S.vx/v)*r*P.q;
    c.strokeStyle=C.line;c.lineWidth=1.5;c.setLineDash([4,6]);c.beginPath();c.arc(cx,cy,r,0,TAU);c.stroke();c.setLineDash([]);
    c.strokeStyle=P.q>0?C.red:C.accent;c.lineWidth=2.5;c.beginPath();S.tr.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
    line(c,cx,cy,S.x,S.y,C.muted,1,[2,4]);txt(c,'r',(cx+S.x)/2+6,(cy+S.y)/2,C.muted,{font:MATH});
    arrow(c,S.x,S.y,S.x+S.vx/v*50,S.y+S.vy/v*50,C.green,2.5,'v');arrow(c,S.x,S.y,S.x+(cx-S.x)/r*40,S.y+(cy-S.y)/r*40,C.warm,2.5,'F');
    disk(c,S.x,S.y,9,P.q>0?C.red:C.accent);txt(c,P.q>0?'+':'−',S.x,S.y+1,C.onaccent,{align:'center',font:'600 14px sans-serif'});
  },
  read:(S,P)=>{const m=1.67e-27*P.m,q=1.6e-19,v=P.v*1e5;return[['Radius r',fmt(m*v/(q*P.B)*1000,2)+' mm'],['Davr T',fmt(TAU*m/(q*P.B)*1e9,1)+' ns'],['Lorens kuchi F',fmt(q*v*P.B)+' N']];}
});

/* 15. Sinish qonuni */
function snellGeo(W,H,P){const hx=W/2,hy=H/2,a=P.a*D2R,R0=Math.min(W,H)*0.44;return{hx,hy,a,R0,sx:hx-Math.sin(a)*R0,sy:hy-Math.cos(a)*R0};}
SIMS.push({id:'sinish',cat:'opt',title:'Yorug‘likning sinish qonuni',short:'n₁ sinα = n₂ sinβ',
  sub:'Yorug‘lik bir muhitdan ikkinchisiga o‘tganda yo‘nalishini o‘zgartiradi.',
  formula:`<span><i>n</i><sub>1</sub> sin <i>α</i> = <i>n</i><sub>2</sub> sin <i>β</i></span><span class="alt"><i>v</i> = ${fr('<i>c</i>','<i>n</i>')} &nbsp; sin <i>α</i><sub>0</sub> = ${fr('<i>n</i><sub>2</sub>','<i>n</i><sub>1</sub>')}</span>`,
  text:['Muhitlarda yorug‘lik tezligi har xil: v = c/n. Nur optik zichroq muhitga o‘tganda sekinlashadi va normalga yaqinlashadi. Harakatlanayotgan chiziqchalar tezligiga qarang: zich muhitda ular sekinroq.','Nur zichroq muhitdan siyrakroq muhitga o‘tganda sinish burchagi kattaroq bo‘ladi. Tushish burchagi chegaraviy burchak α₀ dan oshsa, nur ikkinchi muhitga umuman chiqmaydi: to‘liq ichki qaytish yuz beradi. Optik tola shu hodisa asosida ishlaydi.'],
  legend:[['n₁, n₂','muhitlarning sindirish ko‘rsatkichlari (havo 1,00, suv 1,33, shisha 1,5, olmos 2,42)'],['α','tushish burchagi'],['β','sinish burchagi'],['α₀','to‘liq ichki qaytishning chegaraviy burchagi']],
  tries:['Lazerni sudrab tushish burchagini o‘zgartiring.','n₁ = 1,5 va n₂ = 1,00 qiling, keyin burchakni 42° dan oshiring.','n₁ = n₂ bo‘lsa, nur sinmaydi.'],
  params:[{id:'n1',label:'1-muhit (yuqori)',sym:'n₁',min:1,max:2.42,step:0.01,val:1,unit:'',d:2},{id:'n2',label:'2-muhit (pastki)',sym:'n₂',min:1,max:2.42,step:0.01,val:1.5,unit:'',d:2},{id:'a',label:'Tushish burchagi',sym:'α',min:0,max:89,step:1,val:45,unit:'°',d:0}],
  hint:'Lazerni suring',
  init:()=>({drag:false}),
  draw(c,W,H,S,P,tt){S.W=W;S.H=H;const g=snellGeo(W,H,P);
    c.fillStyle=rgba('water',0.04+(P.n1-1)*0.22);c.fillRect(0,0,W,g.hy);c.fillStyle=rgba('water',0.04+(P.n2-1)*0.22);c.fillRect(0,g.hy,W,H-g.hy);
    line(c,0,g.hy,W,g.hy,C.ink,1.5);line(c,g.hx,10,g.hx,H-10,C.muted,1,[5,5]);
    txt(c,'n₁ = '+fmt(P.n1),14,20,C.ink);txt(c,'n₂ = '+fmt(P.n2),14,g.hy+20,C.ink);
    const sb=P.n1/P.n2*Math.sin(g.a),tir=sb>1,Lr=Math.hypot(W,H);
    const ray=(x1,y1,x2,y2,n,alpha)=>{line(c,x1,y1,x2,y2,rgba('warm',alpha*0.35),3);c.strokeStyle=rgba('warm',alpha);c.lineWidth=3;c.setLineDash([12,12]);c.lineDashOffset=-tt*160/n;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.setLineDash([]);c.lineDashOffset=0;};
    ray(g.sx,g.sy,g.hx,g.hy,P.n1,1);
    ray(g.hx,g.hy,g.hx+Math.sin(g.a)*Lr,g.hy-Math.cos(g.a)*Lr,P.n1,tir?1:0.3);
    if(!tir){const b=Math.asin(sb);ray(g.hx,g.hy,g.hx+Math.sin(b)*Lr,g.hy+Math.cos(b)*Lr,P.n2,1);
      c.strokeStyle=C.green;c.lineWidth=1.5;c.beginPath();c.arc(g.hx,g.hy,46,Math.PI/2-b,Math.PI/2);c.stroke();txt(c,'β',g.hx+Math.sin(b/2)*60,g.hy+Math.cos(b/2)*60,C.green,{font:MATH,align:'center'});}
    else txt(c,'To‘liq ichki qaytish',W-14,g.hy+22,C.red,{align:'right',font:'600 15px "IBM Plex Sans", sans-serif'});
    c.strokeStyle=C.accent;c.lineWidth=1.5;c.beginPath();c.arc(g.hx,g.hy,40,-Math.PI/2-g.a,-Math.PI/2);c.stroke();txt(c,'α',g.hx-Math.sin(g.a/2)*54,g.hy-Math.cos(g.a/2)*54,C.accent,{font:MATH,align:'center'});
    c.save();c.translate(g.sx,g.sy);c.rotate(Math.atan2(g.hy-g.sy,g.hx-g.sx));c.fillStyle=C.ink;rrect(c,-26,-8,32,16,4);c.fill();c.restore();disk(c,g.sx,g.sy,4,C.warm);
  },
  pointer(type,x,y,S,P,api){const g=snellGeo(S.W,S.H,P);if(type==='down'){if(y<g.hy){S.drag=true;}else return false;}
    if((type==='down'||type==='move')&&S.drag){const a=Math.atan2(Math.abs(x-g.hx),Math.max(1,g.hy-y))/D2R;api.set('a',Math.round(clamp(a,0,89)));return true;}if(type==='up')S.drag=false;return false;},
  read:(S,P)=>{const sb=P.n1/P.n2*Math.sin(P.a*D2R);return[['Sinish burchagi β',sb>1?'nur sinmaydi':fmt(Math.asin(sb)/D2R,1)+'°'],['Chegaraviy burchak α₀',P.n1>P.n2?fmt(Math.asin(P.n2/P.n1)/D2R,1)+'°':'yo‘q (n₁ ≤ n₂)'],['1-muhitda v',fmt(3/P.n1)+'·10⁸ m/s'],['2-muhitda v',fmt(3/P.n2)+'·10⁸ m/s']];}
});

/* 16. Yupqa linza */
function lensGeo(W,H){const Lx=W/2,ay=H*0.56,sc=(W/2-20)/32;return{Lx,ay,sc};}
SIMS.push({id:'linza',cat:'opt',title:'Yupqa linza formulasi',short:'1/F = 1/d + 1/f',
  sub:'Linza buyumdan chiqqan nurlarni sindirib, uning tasvirini hosil qiladi.',
  formula:`<span>${fr('1','<i>F</i>')} = ${fr('1','<i>d</i>')} + ${fr('1','<i>f</i>')}</span><span class="alt"><i>Γ</i> = ${fr('<i>f</i>','<i>d</i>')} &nbsp; <i>D</i> = ${fr('1','<i>F</i>')}</span>`,
  text:['Tasvirni topish uchun buyum uchidan uchta qulay nur chiqariladi: optik o‘qqa parallel nur sinib, fokusdan o‘tadi; markazdan o‘tgan nur sinmaydi; fokusdan o‘tgan nur sinib, o‘qqa parallel ketadi. Ular kesishgan joyda tasvir hosil bo‘ladi.','Yig‘uvchi linzada buyum fokusdan uzoqda bo‘lsa haqiqiy, teskari tasvir olinadi (fotoapparat, ko‘z). Fokus ichida bo‘lsa, mavhum, to‘g‘ri va kattalashgan tasvir hosil bo‘ladi (lupa). Sochuvchi linza uchun F manfiy olinadi va tasvir doim mavhum, kichraygan bo‘ladi.'],
  legend:[['F','fokus masofasi, sm'],['d','linzadan buyumgacha masofa, sm'],['f','linzadan tasvirgacha masofa, sm (manfiy — mavhum tasvir)'],['Γ','kattalashtirish'],['D','optik kuch, dioptriya']],
  tries:['Ko‘k strelkani (buyumni) sudrab fokusga yaqinlashtiring: tasvir kattalashib, uzoqlashadi.','d = 2F qiling: tasvir buyum bilan bir xil kattalikda bo‘ladi.','Buyumni fokus ichiga olib kiring: lupa tasviri hosil bo‘ladi.'],
  params:[{id:'f',label:'Fokus masofasi',sym:'|F|',min:3,max:12,step:0.5,val:6,unit:'sm',d:1},{id:'type',label:'Linza turi',sym:'',choices:[[1,'Yig‘uvchi'],[-1,'Sochuvchi']],val:1},{id:'d',label:'Buyumgacha masofa',sym:'d',min:2,max:30,step:0.5,val:15,unit:'sm',d:1},{id:'h',label:'Buyum balandligi',sym:'h',min:1,max:5,step:0.5,val:3,unit:'sm',d:1}],
  hint:'Buyumni suring',
  init:()=>({drag:false}),
  draw(c,W,H,S,P,tt){S.W=W;S.H=H;const{Lx,ay,sc}=lensGeo(W,H),F=P.f*P.type,d=P.d,h=P.h,X=x=>Lx+x*sc,Y=y=>ay-y*sc;grid(c,W,H,28);
    line(c,0,ay,W,ay,C.ink,1.2);
    [-2,-1,1,2].forEach(k=>{const x=X(k*P.f);line(c,x,ay-5,x,ay+5,C.ink,1.5);txt(c,(Math.abs(k)===2?'2F':'F'),x,ay+16,C.muted,{align:'center',font:MATH});});
    const lh=Math.min(H*0.42,ay-12);c.fillStyle=rgba('water',0.18);c.strokeStyle=C.water;c.lineWidth=1.5;c.beginPath();
    if(P.type>0){c.moveTo(Lx,ay-lh);c.quadraticCurveTo(Lx+18,ay,Lx,ay+lh);c.quadraticCurveTo(Lx-18,ay,Lx,ay-lh);}
    else{c.moveTo(Lx-12,ay-lh);c.lineTo(Lx+12,ay-lh);c.quadraticCurveTo(Lx+2,ay,Lx+12,ay+lh);c.lineTo(Lx-12,ay+lh);c.quadraticCurveTo(Lx-2,ay,Lx-12,ay-lh);}
    c.fill();c.stroke();
    const di=Math.abs(d-F)<1e-9?Infinity:F*d/(d-F),hi=isFinite(di)?-h*di/d:0,xr=(W-Lx)/sc+2;
    const yls=[h,0];if(Math.abs(F-d)>0.05){const y3=h*F/(F-d);if(Math.abs(y3*sc)<H)yls.push(y3);}
    yls.forEach(yl=>{const mi=(yl-h)/d,mo=mi-yl/F;
      const seg=(x1,y1,x2,y2,dash)=>{line(c,X(x1),Y(y1),X(x2),Y(y2),rgba('warm',dash?0.55:0.4),dash?1.2:2,dash?[4,5]:null);if(!dash){c.strokeStyle=C.warm;c.lineWidth=2;c.setLineDash([8,16]);c.lineDashOffset=-tt*70;c.beginPath();c.moveTo(X(x1),Y(y1));c.lineTo(X(x2),Y(y2));c.stroke();c.setLineDash([]);c.lineDashOffset=0;}};
      seg(-d,h,0,yl);seg(0,yl,xr,yl+mo*xr);if(isFinite(di)&&di<0){const xe=Math.max(di,-Lx/sc);seg(0,yl,xe,yl+mo*xe,true);}});
    arrow(c,X(-d),ay,X(-d),Y(h),C.accent,3.5);
    if(isFinite(di)&&Math.abs(X(di))<W*3){if(di<0){c.globalAlpha=0.75;}arrow(c,X(di),ay,X(di),Y(hi),C.red,3);c.globalAlpha=1;}
    if(!isFinite(di))txt(c,'Buyum fokusda: tasvir cheksizlikda',14,20,C.red);
  },
  pointer(type,x,y,S,P,api){const{Lx,ay,sc}=lensGeo(S.W,S.H);if(type==='down'){const ox=Lx-P.d*sc;if(Math.abs(x-ox)<26&&y<ay+20&&y>ay-P.h*sc-30)S.drag=true;else return false;}
    if((type==='down'||type==='move')&&S.drag){api.set('d',Math.round(clamp((Lx-x)/sc,2,30)*2)/2);api.set('h',Math.round(clamp((ay-y)/sc,1,5)*2)/2);return true;}if(type==='up')S.drag=false;return false;},
  read:(S,P)=>{const F=P.f*P.type,d=P.d;if(Math.abs(d-F)<1e-9)return[['Tasvirgacha f','∞'],['Tasvir','hosil bo‘lmaydi'],['Optik kuch D',fmt(100/F,1)+' dptr']];const f=F*d/(d-F),G=Math.abs(f/d);
    return[['Tasvirgacha f',fmt(f,1)+' sm'],['Kattalashtirish Γ',fmt(G)],['Tasvir',(f>0?'haqiqiy, teskari':'mavhum, to‘g‘ri')+', '+(G>1.005?'kattalashgan':G<0.995?'kichraygan':'teng')],['Optik kuch D',fmt(100/F,1)+' dptr']];}
});

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

/* 18. Fotoeffekt */
SIMS.push({id:'fotoeffekt',cat:'kva',title:'Fotoeffekt uchun Eynshteyn tenglamasi',short:'hν = A + mv²/2',
  sub:'Foton energiyasi chiqish ishidan katta bo‘lsa, metalldan elektron uchib chiqadi.',
  formula:`<span><i>hν</i> = <i>A</i> + ${fr('<i>mv</i><sup>2</sup>','2')}</span><span class="alt"><i>λ</i><sub>max</sub> = ${fr('<i>hc</i>','<i>A</i>')} &nbsp; <i>h</i> = 6,63·10<sup>−34</sup> J·s</span>`,
  text:['Yorug‘lik fotonlar oqimi, har bir foton hν energiya olib keladi. Foton metallga urilib, energiyasini bitta elektronga beradi. Agar bu energiya chiqish ishi A dan katta bo‘lsa, elektron metalldan uchib chiqadi va ortiqcha energiya uning kinetik energiyasiga aylanadi.','Muhim tomoni: intensivlik fotonlar sonini, demak elektronlar sonini oshiradi, lekin elektronlar tezligini oshirmaydi. To‘lqin uzunligi qizil chegaradan katta bo‘lsa, yorug‘lik qanchalik kuchli bo‘lmasin, fotoeffekt bo‘lmaydi.'],
  legend:[['h','Plank doimiysi'],['ν','yorug‘lik chastotasi, ν = c/λ'],['A','metallning chiqish ishi, eV'],['mv²/2','elektronning maksimal kinetik energiyasi'],['λ_max','fotoeffektning qizil chegarasi']],
  tries:['To‘lqin uzunligini qizil chegaradan oshiring: elektronlar chiqmay qoladi.','Intensivlikni oshiring: elektronlar ko‘payadi, lekin tezligi o‘zgarmaydi.','Metallni misga almashtiring: faqat ultrabinafsha nur ishlaydi.'],
  params:[{id:'lam',label:'To‘lqin uzunligi',sym:'λ',min:150,max:700,step:5,val:400,unit:'nm',d:0},{id:'I',label:'Intensivlik',sym:'',min:1,max:10,step:1,val:5,unit:'',d:0},{id:'A',label:'Metall',sym:'',choices:[[2.14,'Seziy · 2,14 eV'],[2.28,'Natriy · 2,28 eV'],[4.3,'Rux · 4,3 eV'],[4.7,'Mis · 4,7 eV']],val:2.28}],
  init:()=>({ph:[],el:[],acc:0}),
  step(S,P,dt){if(!S.W)return;const W=S.W,H=S.H,lx=W*0.1,ly=H*0.16,py=H*0.8,E=1240/P.lam,Ek=E-P.A;S.acc+=dt*P.I*2.2;
    while(S.acc>=1){S.acc-=1;const tx=W*(0.22+Math.random()*0.38);S.ph.push({x:lx,y:ly,tx,ty:py,d:Math.hypot(tx-lx,py-ly),s:0});}
    S.ph.forEach(p=>{p.s+=260*dt;if(p.s>=p.d){p.dead=1;if(Ek>0){const sp=55+110*Math.sqrt(Ek),a=-Math.PI/2+(Math.random()-0.5)*1.3;S.el.push({x:p.tx,y:py,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp});}}});
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

/* ================= INTERFEYS ================= */
const $=id=>document.getElementById(id);
const cv=$('cv'),ctx=cv.getContext('2d'),wrap=$('cwrap');
let W=800,H=500,dpr=1,cur=null,S=null,P={},playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,speed=1,simTime=0,frame=0,roEls=[];
$('count').textContent=SIMS.length+' ta mavzu · '+CATS.length+' bo‘lim';

const nav=$('nav'),btns={};
CATS.forEach(([cid,cname])=>{const box=document.createElement('div');box.className='cat';box.dataset.cat=cid;box.innerHTML=`<h3>${cname}</h3>`;
  SIMS.filter(s=>s.cat===cid).forEach(s=>{const b=document.createElement('button');b.type='button';b.className='tbtn';b.innerHTML=`<b>${s.title}</b><small>${s.short}</small>`;b.onclick=()=>select(s.id,true);btns[s.id]=b;box.appendChild(b);});nav.appendChild(box);});
$('search').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();document.querySelectorAll('.cat').forEach(box=>{let any=false;SIMS.filter(s=>s.cat===box.dataset.cat).forEach(s=>{const ok=!q||(s.title+' '+s.short+' '+s.sub).toLowerCase().includes(q);btns[s.id].hidden=!ok;any=any||ok;});box.hidden=!any;});});

const api={set(id,v){P[id]=v;const inp=$('p-'+id);if(inp)inp.value=v;showOut(id);}};
function showOut(id){const p=cur.params.find(x=>x.id===id),o=$('o-'+id);if(!o||!p||p.choices)return;const v=P[id];o.textContent=p.show?p.show(v):fmt(v,p.d??(p.step<1?(p.step<0.1?2:1):0))+(p.unit?' '+p.unit:'');}
function reset(){S=cur.init(P);}

function select(id,user){const s=SIMS.find(x=>x.id===id)||SIMS[0];cur=s;P={};s.params.forEach(p=>P[p.id]=p.val);
  Object.values(btns).forEach(b=>b.removeAttribute('aria-current'));btns[s.id].setAttribute('aria-current','true');if(user&&innerWidth<860)btns[s.id].scrollIntoView({inline:'center',block:'nearest'});
  $('eyebrow').textContent=CATS.find(c=>c[0]===s.cat)[1];$('title').textContent=s.title;$('sub').textContent=s.sub;$('formula').innerHTML=s.formula;
  $('text').innerHTML=s.text.map(t=>`<p>${t}</p>`).join('');$('legend').innerHTML=s.legend.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('');$('tries').innerHTML=s.tries.map(t=>`<li>${t}</li>`).join('');
  $('hint').textContent=s.hint||'';cv.style.touchAction=s.pointer?'none':'auto';cv.style.cursor=s.pointer?'grab':'default';
  const box=$('params');box.innerHTML='';
  s.params.forEach(p=>{const d=document.createElement('div');d.className='ctl';
    if(p.choices){d.innerHTML=`<div class="ctl-top"><label>${p.label}</label></div><div class="choices" role="group" aria-label="${p.label}">${p.choices.map(([v,l])=>`<button type="button" data-v="${v}" aria-pressed="${v===p.val}">${l}</button>`).join('')}</div>`;
      d.querySelectorAll('button').forEach(b=>b.onclick=()=>{P[p.id]=parseFloat(b.dataset.v);d.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));if(p.reset)reset();});}
    else{d.innerHTML=`<div class="ctl-top"><label for="p-${p.id}">${p.label}${p.sym?`<span class="sym">${p.sym}</span>`:''}</label><output id="o-${p.id}"></output></div><input type="range" id="p-${p.id}" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.val}">`;
      d.querySelector('input').addEventListener('input',e=>{P[p.id]=parseFloat(e.target.value);showOut(p.id);if(p.reset)reset();});}
    box.appendChild(d);if(!p.choices)showOut(p.id);});
  const ro=$('readouts');ro.innerHTML='';roEls=[];reset();
  const i=SIMS.indexOf(s),pv=SIMS[(i-1+SIMS.length)%SIMS.length],nx=SIMS[(i+1)%SIMS.length];$('prev').textContent='← '+pv.title;$('next').textContent=nx.title+' →';$('prev').onclick=()=>select(pv.id,true);$('next').onclick=()=>select(nx.id,true);
  try{history.replaceState(null,'','#'+s.id);}catch(e){}
  if(user)window.scrollTo({top:Math.min(window.scrollY,$('title').getBoundingClientRect().top+window.scrollY-12)});
  draw();updRead();}

function updRead(){const rows=cur.read?cur.read(S,P):[],ro=$('readouts');if(roEls.length!==rows.length){ro.innerHTML='';roEls=rows.map(()=>{const d=document.createElement('div');d.className='ro';d.innerHTML='<span></span><strong></strong>';ro.appendChild(d);return d;});}
  rows.forEach((r,i)=>{const e=roEls[i];if(e.firstChild.textContent!==r[0])e.firstChild.textContent=r[0];if(e.lastChild.textContent!==r[1])e.lastChild.textContent=r[1];});}

function resize(){const r=wrap.getBoundingClientRect();W=Math.max(200,r.width);H=Math.max(150,r.height);dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);draw();}
new ResizeObserver(resize).observe(wrap);

function draw(){if(!cur)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=C.canvas;ctx.fillRect(0,0,W,H);ctx.save();try{cur.draw(ctx,W,H,S,P,simTime);}catch(e){console.error(e);}ctx.restore();}
let last=performance.now();
function loop(now){const dt=Math.min(0.05,(now-last)/1000);last=now;if(frame%30===0)readColors();
  if(playing&&cur){const d=dt*speed;simTime+=d;if(cur.step)cur.step(S,P,d);}draw();if(frame%6===0)updRead();frame++;requestAnimationFrame(loop);}

function setPlay(v){playing=v;$('play').textContent=v?'⏸ Pauza':'▶ Davom';}
$('play').onclick=()=>setPlay(!playing);$('restart').onclick=()=>{reset();simTime=0;};
$('speed').querySelectorAll('button').forEach(b=>b.onclick=()=>{speed=parseFloat(b.dataset.s);$('speed').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));});

const pos=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
cv.addEventListener('pointerdown',e=>{if(!cur.pointer)return;const[x,y]=pos(e);if(cur.pointer('down',x,y,S,P,api)){cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing';}});
cv.addEventListener('pointermove',e=>{if(!cur.pointer)return;const[x,y]=pos(e);cur.pointer('move',x,y,S,P,api);});
const up=e=>{if(!cur.pointer)return;const[x,y]=pos(e);cur.pointer('up',x,y,S,P,api);cv.style.cursor='grab';};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);

readColors();setPlay(playing);
const h=(location.hash||'').slice(1);select(SIMS.some(s=>s.id===h)?h:SIMS[0].id,false);resize();
requestAnimationFrame(loop);
window.__sims=SIMS;window.__select=id=>select(id,false);
})();
