/* ===== v7: yangi mavzular (1-qism): kin, din, sta, saq, teb, mol ===== */

/* Gorizontal otilgan jism */
SIMS.push({id:'gorizontal',cat:'kin',title:'Gorizontal otilgan jism',short:'L = v₀√(2h/g)',
  sub:'Balandlikdan gorizontal otilgan jism gorizontal bo‘ylab tekis, vertikal bo‘ylab erkin tushish kabi harakatlanadi. Ikkala harakat bir-biriga bog‘liq emas.',
  formula:`<span><i>x</i> = <i>v</i>₀<i>t</i>, &nbsp;<i>y</i> = <i>h</i> − ${fr('<i>gt</i>²','2')}</span><span class="alt"><i>t</i> = √(${fr('2<i>h</i>','<i>g</i>')}), &nbsp;<i>L</i> = <i>v</i>₀<i>t</i></span>`,
  text:['Jism h balandlikdan v₀ tezlik bilan gorizontal otilsa, havo qarshiligi bo‘lmaganda gorizontal tezlik o‘zgarmaydi: x = v₀t. Vertikal yo‘nalishda esa jism erkin tushadi: y = h − gt²/2. Shuning uchun traektoriya parabola bo‘ladi.','Tushish vaqti faqat balandlikka bog‘liq: t = √(2h/g). Bir vaqtda gorizontal otilgan va shunchaki tashlab yuborilgan jismlar yerga bir vaqtda tushadi. Uchish uzoqligi L = v₀√(2h/g), yerga tegish tezligi v = √(v₀² + 2gh).'],
  legend:[['v₀','boshlang‘ich gorizontal tezlik, m/s'],['h','otish balandligi, m'],['g','erkin tushish tezlanishi, m/s²'],['L','uchish uzoqligi, m'],['t','uchish vaqti, s']],
  tries:['v₀ ni ikki marta oshiring: uzoqlik ikki marta ortadi, uchish vaqti esa o‘zgarmaydi.','Kulrang shar shunchaki tashlab yuborilgan: ikkala shar yerga bir vaqtda tegadi.','h ni 4 marta oshiring: uchish vaqti 2 marta ortadi.'],
  params:[{id:'v',label:'Boshlang‘ich tezlik',sym:'v₀',min:1,max:20,step:0.5,val:8,unit:'m/s',d:1,reset:1},{id:'h',label:'Balandlik',sym:'h',min:2,max:40,step:1,val:20,unit:'m',d:0,reset:1},{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:1.6,max:20,step:0.1,val:9.8,unit:'m/s²',d:1,reset:1}],
  init:()=>({t:0,done:0,wait:0,tr:[]}),
  step(S,P,dt){if(S.done){S.wait+=dt;if(S.wait>1.6)Object.assign(S,{t:0,done:0,wait:0,tr:[]});return;}S.t+=dt;const T=Math.sqrt(2*P.h/P.g);if(S.t>=T){S.t=T;S.done=1;}S.tr.push([P.v*S.t,P.h-P.g*S.t*S.t/2]);},
  draw(c,W,H,S,P){grid(c,W,H,28);const T=Math.sqrt(2*P.h/P.g),L=P.v*T,x0=70,gy=H-40,sc=Math.min((W-x0-60)/Math.max(L,12),(gy-50)/P.h),X=x=>x0+x*sc,Y=y=>gy-y*sc;S.g={x0,gy,sc};
    c.fillStyle=rgba('muted',0.25);c.fillRect(0,Y(P.h),x0,gy-Y(P.h));line(c,0,Y(P.h),x0,Y(P.h),C.ink,2);line(c,0,gy,W,gy,C.ink,2);
    for(let k=0;k<=Math.floor(L/2)+2;k++){const x=X(k*2);if(x>W-10)break;line(c,x,gy,x,gy+6,C.muted,1);if(k%2===0)txt(c,k*2+' m',x,gy+16,C.muted,{align:'center',font:SMALL});}
    c.setLineDash([5,4]);c.strokeStyle=rgba('muted',0.6);c.lineWidth=1.2;c.beginPath();for(let i=0;i<=60;i++){const t=T*i/60;i?c.lineTo(X(P.v*t),Y(P.h-P.g*t*t/2)):c.moveTo(X(0),Y(P.h));}c.stroke();c.setLineDash([]);
    const t=S.t,x=P.v*t,y=P.h-P.g*t*t/2,vy=-P.g*t,k=80/Math.max(P.v,P.g*T)/8;
    S.tr.forEach(([a,b],i)=>{if(i%6===0)disk(c,X(a),Y(b),2.5,rgba('accent',0.5));});
    disk(c,x0-8,Y(y),9,'#9aa6b8');line(c,x0-8,Y(P.h),x0-8,Y(y),rgba('muted',0.4),1,[3,3]);
    disk(c,X(x),Y(y),11,C.accent);arrow(c,X(x),Y(y),X(x)+P.v*k*8,Y(y),C.green,2.5,'vₓ');if(t>0.05)arrow(c,X(x),Y(y),X(x),Y(y)-vy*k*8,C.red,2.5,'v_y');if(t>0.05)arrow(c,X(x),Y(y),X(x)+P.v*k*8,Y(y)-vy*k*8,C.warm,2.5,'v');
    line(c,X(L),gy-8,X(L),gy+8,C.red,2);txt(c,'L = '+fmt(L,1)+' m',X(L),gy-16,C.red,{align:'center',font:SMALL});txt(c,'h = '+fmt(P.h,0)+' m',8,Y(P.h)-12,C.ink,{font:SMALL});},
  read(S,P){const T=Math.sqrt(2*P.h/P.g),vy=P.g*S.t;return[['Vaqt t',fmt(S.t,2)+' s'],['Uchish vaqti √(2h/g)',fmt(T,2)+' s'],['Uchish uzoqligi L',fmt(P.v*T,2)+' m'],['Tezlik v',fmt(Math.hypot(P.v,vy),2)+' m/s'],['Tegish burchagi',fmt(Math.atan2(P.g*T,P.v)/D2R,1)+'°']];}
});

/* Markazga intilma kuch */
SIMS.push({id:'markazga',cat:'din',title:'Markazga intilma kuch',short:'F = mv²/r',
  sub:'Jismni aylana bo‘ylab harakatlantirish uchun unga doim markazga yo‘nalgan kuch ta’sir etishi kerak. Ip kesilsa, jism aylanaga urinma bo‘ylab to‘g‘ri chiziq bo‘ylab uchib ketadi.',
  formula:`<span><i>F</i> = ${fr('<i>mv</i>²','<i>r</i>')} = <i>mω</i>²<i>r</i></span><span class="alt"><i>a</i><sub>m</sub> = ${fr('<i>v</i>²','<i>r</i>')}, &nbsp;<i>T</i> = ${fr('2π<i>r</i>','<i>v</i>')}</span>`,
  text:['Aylana bo‘ylab tekis harakatda tezlik moduli o‘zgarmaydi, lekin yo‘nalishi doim o‘zgaradi. Bu o‘zgarishni markazga intilma tezlanish a = v²/r beradi. Nyutonning ikkinchi qonuniga ko‘ra, unga kuch F = ma = mv²/r kerak — bu yerda uni ipning taranglik kuchi beradi.','Markazga intilma kuch yangi turdagi kuch emas: uni ip tarangligi, ishqalanish, tortishish yoki tayanch reaksiyasi hosil qiladi. Ip kesilganda kuch yo‘qoladi va jism inersiya bo‘yicha urinma yo‘nalishda to‘g‘ri chiziqli harakat qiladi.'],
  legend:[['F','markazga intilma kuch, N'],['m','massa, kg'],['v','chiziqli tezlik, m/s'],['r','aylana radiusi, m'],['ω','burchak tezlik, rad/s']],
  tries:['Tezlikni ikki marta oshiring: kerakli kuch to‘rt marta ortadi.','«Ipni kesish» tugmasini bosing: jism urinma bo‘ylab uchib ketadi, markazdan qochmaydi.','Radiusni kamaytiring, tezlikni o‘zgartirmang: kuch ortadi.'],
  tools:[{id:'cut',label:'Ipni kesish',act:1}],
  params:[{id:'m',label:'Massa',sym:'m',min:0.1,max:3,step:0.1,val:0.5,unit:'kg',d:1},{id:'r',label:'Radius',sym:'r',min:0.3,max:1.5,step:0.05,val:1,unit:'m',d:2},{id:'v',label:'Tezlik',sym:'v',min:0.5,max:6,step:0.1,val:3,unit:'m/s',d:1}],
  init:()=>({ph:0,cut:0,x:0,y:0,vx:0,vy:0,t:0}),
  action(id,S,P){if(id==='cut'&&!S.cut){S.cut=1;S.x=P.r*Math.cos(S.ph);S.y=P.r*Math.sin(S.ph);S.vx=-P.v*Math.sin(S.ph);S.vy=P.v*Math.cos(S.ph);S.t=0;}},
  step(S,P,dt){if(S.cut){S.x+=S.vx*dt;S.y+=S.vy*dt;S.t+=dt;if(S.t>2.5)Object.assign(S,{cut:0,t:0});return;}S.ph+=P.v/P.r*dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.4,cy=H/2,sc=Math.min(W*0.32,H*0.42)/1.5,X=x=>cx+x*sc,Y=y=>cy-y*sc;S.g={cx,cy,sc};
    c.setLineDash([5,5]);c.strokeStyle=rgba('muted',0.5);c.lineWidth=1.3;c.beginPath();c.arc(cx,cy,P.r*sc,0,TAU);c.stroke();c.setLineDash([]);disk(c,cx,cy,7,C.ink);
    const bx=S.cut?S.x:P.r*Math.cos(S.ph),by=S.cut?S.y:P.r*Math.sin(S.ph),vx=S.cut?S.vx:-P.v*Math.sin(S.ph),vy=S.cut?S.vy:P.v*Math.cos(S.ph),F=P.m*P.v*P.v/P.r;
    if(!S.cut)line(c,cx,cy,X(bx),Y(by),C.ink,2);else{const a=S.ph;line(c,cx,cy,cx+Math.cos(a)*sc*0.35,cy-Math.sin(a)*sc*0.35,C.ink,2);c.setLineDash([4,4]);line(c,X(P.r*Math.cos(a)),Y(P.r*Math.sin(a)),X(bx),Y(by),rgba('warm',0.7),1.5);c.setLineDash([]);}
    const r=10+P.m*4;disk(c,X(bx),Y(by),r,C.accent);arrow(c,X(bx),Y(by),X(bx+vx*0.12),Y(by+vy*0.12),C.green,2.5,'v');
    if(!S.cut){const u=Math.min(1.1,F/30+0.15);arrow(c,X(bx),Y(by),X(bx-bx/P.r*u*0.6),Y(by-by/P.r*u*0.6),C.red,3,'F');}
    const gx=W*0.72,gw=W-gx-24,gt=40,gb=H-50;line(c,gx,gb,gx+gw,gb,C.ink,1);line(c,gx,gb,gx,gt,C.ink,1);txt(c,'F(v)',gx+6,gt,C.muted,{font:SMALL});txt(c,'v',gx+gw,gb+14,C.muted,{font:SMALL,align:'right'});
    const Fm=P.m*36/P.r;c.strokeStyle=C.accent;c.lineWidth=2;c.beginPath();for(let i=0;i<=50;i++){const v=6*i/50,y=gb-(P.m*v*v/P.r)/Fm*(gb-gt);i?c.lineTo(gx+v/6*gw,y):c.moveTo(gx,y);}c.stroke();disk(c,gx+P.v/6*gw,gb-F/Fm*(gb-gt),5,C.red);},
  read(S,P){const F=P.m*P.v*P.v/P.r;return[['Markazga intilma tezlanish',fmt(P.v*P.v/P.r,2)+' m/s²'],['Kerakli kuch F',fmt(F,2)+' N'],['Burchak tezlik ω',fmt(P.v/P.r,2)+' rad/s'],['Aylanish davri T',fmt(TAU*P.r/P.v,2)+' s'],['Holat',S.cut?'ip kesildi — urinma bo‘ylab':'aylanma harakat']];}
});

/* Kepler qonunlari */
SIMS.push({id:'kepler',cat:'din',title:'Kepler qonunlari',short:'T²/a³ = const',
  sub:'Sayyoralar Quyosh atrofida ellips bo‘ylab aylanadi. Teng vaqtlarda Quyosh–sayyora kesmasi teng yuzalar chizadi, aylanish davrining kvadrati esa katta yarim o‘q kubiga proporsional.',
  formula:`<span>${fr('<i>T</i>²','<i>a</i>³')} = ${fr('4π²','<i>GM</i>')}</span><span class="alt">${fr('∆<i>S</i>','∆<i>t</i>')} = const, &nbsp;<i>r</i><sub>min</sub> = <i>a</i>(1 − <i>e</i>)</span>`,
  text:['Birinchi qonun: orbita — ellips, Quyosh uning fokuslaridan birida. Ikkinchi qonun: sayyora Quyoshga yaqin joyda tezroq, uzoqda sekinroq harakatlanadi, shuning uchun bir xil vaqtda chizilgan sektorlar yuzasi teng. Bu impuls momentining saqlanishidan kelib chiqadi.','Uchinchi qonun: T² = a³ (T yillarda, a astronomik birliklarda). Animatsiyada sayyora Nyutonning butun olam tortishish qonuni bo‘yicha hisoblanadi — Kepler qonunlari undan avtomatik kelib chiqadi.'],
  legend:[['T','aylanish davri, yil'],['a','katta yarim o‘q, a.b.'],['e','ekssentrisitet'],['∆S','sektor yuzasi'],['GM','Quyoshning gravitatsion parametri']],
  tries:['e ni 0,7 ga oshiring: rangli sektorlar shakli har xil, lekin yuzalari teng.','a ni 2 marta oshiring: davr 2√2 ≈ 2,83 marta ortadi.','Perigeliy va afeliydagi tezliklar nisbati (1+e)/(1−e) ga teng ekanini tekshiring.'],
  params:[{id:'a',label:'Katta yarim o‘q',sym:'a',min:0.5,max:2,step:0.05,val:1,unit:'a.b.',d:2,reset:1},{id:'e',label:'Ekssentrisitet',sym:'e',min:0,max:0.85,step:0.01,val:0.5,d:2,reset:1}],
  init:P=>{const GM=4*Math.PI*Math.PI,rp=P.a*(1-P.e);return{x:rp,y:0,vx:0,vy:Math.sqrt(GM*(1+P.e)/rp),t:0,sec:[],cur:[[rp,0]],tr:[]};},
  step(S,P,dt){const GM=4*Math.PI*Math.PI,T=Math.pow(P.a,1.5),ts=dt/3.2*Math.max(1,T*0.6),n=60,h=ts/n,dT=T/12;
    for(let i=0;i<n;i++){let r=Math.hypot(S.x,S.y),a=-GM/(r*r*r);S.vx+=a*S.x*h/2;S.vy+=a*S.y*h/2;S.x+=S.vx*h;S.y+=S.vy*h;r=Math.hypot(S.x,S.y);a=-GM/(r*r*r);S.vx+=a*S.x*h/2;S.vy+=a*S.y*h/2;S.t+=h;
      if(i%3===0)S.cur.push([S.x,S.y]);if(S.t>=dT*(S.sec.length+1)){S.sec.push(S.cur);S.cur=[[S.x,S.y]];if(S.sec.length>=12){S.sec=[];S.t-=T;}}}},
  draw(c,W,H,S,P){c.fillStyle=GL.dark?'#03050b':rgba('ink',0.03);c.fillRect(0,0,W,H);const pw=W*0.28,sc=Math.min((W-pw-60)/(2*P.a*1.08),(H-50)/(2*P.a*Math.sqrt(1-P.e*P.e)*1.2)),cx=(W-pw)/2+P.a*P.e*sc,cy=H/2,X=x=>cx+x*sc,Y=y=>cy-y*sc;S.g={cx,cy,sc};
    if(GL.dark){c.fillStyle='rgba(255,255,255,0.45)';for(let i=0;i<90;i++)c.fillRect((i*197.3)%W,(i*71.7)%H,1.2,1.2);}
    const b=P.a*Math.sqrt(1-P.e*P.e);c.strokeStyle=rgba('muted',0.6);c.lineWidth=1.2;c.beginPath();c.ellipse(X(-P.a*P.e),cy,P.a*sc,b*sc,0,0,TAU);c.stroke();
    const cols=['#5fb4ff','#ff9f43','#3ddc84','#e66bff','#ffd23f','#ff5a7a'];[...S.sec,S.cur].forEach((sg,i)=>{c.fillStyle=cols[i%6];c.globalAlpha=0.32;c.beginPath();c.moveTo(cx,cy);sg.forEach(([x,y])=>c.lineTo(X(x),Y(y)));c.closePath();c.fill();c.globalAlpha=1;});
    const g=c.createRadialGradient(cx,cy,0,cx,cy,30);g.addColorStop(0,'#fff6c8');g.addColorStop(0.35,'#ffc23a');g.addColorStop(1,'rgba(255,140,30,0)');c.fillStyle=g;c.beginPath();c.arc(cx,cy,30,0,TAU);c.fill();
    disk(c,X(-2*P.a*P.e),cy,2.5,C.muted);txt(c,'F₂',X(-2*P.a*P.e),cy+14,C.muted,{align:'center',font:SMALL});
    disk(c,X(S.x),Y(S.y),8,'#5fb4ff','#fff');arrow(c,X(S.x),Y(S.y),X(S.x+S.vx*0.05),Y(S.y+S.vy*0.05),C.green,2.2,'v');
    const gx=W-pw+10,gw=pw-30,gt=50,gb=H*0.55;txt(c,'Bir xil vaqtdagi yuzalar',gx,gt-20,C.muted,{font:SMALL});const ar=S.sec.map(sg=>{let A=0;for(let i=1;i<sg.length;i++)A+=Math.abs(sg[i-1][0]*sg[i][1]-sg[i][0]*sg[i-1][1])/2;return A;});const Am=Math.PI*P.a*b/12;
    ar.forEach((A,i)=>{const bw=gw/12;c.fillStyle=cols[i%6];c.fillRect(gx+i*bw+1,gb-A/Am*(gb-gt)*0.8,bw-2,A/Am*(gb-gt)*0.8);});line(c,gx,gb-(gb-gt)*0.8,gx+gw,gb-(gb-gt)*0.8,rgba('muted',0.6),1,[4,3]);line(c,gx,gb,gx+gw,gb,C.ink,1);txt(c,'πab/12',gx+gw,gb-(gb-gt)*0.8-10,C.muted,{align:'right',font:SMALL});},
  read(S,P){const r=Math.hypot(S.x,S.y),v=Math.hypot(S.vx,S.vy),T=Math.pow(P.a,1.5),k=4.74;return[['Davr T',fmt(T,2)+' yil'],['T² / a³',fmt(T*T/(P.a**3),3)],['Masofa r',fmt(r,2)+' a.b.'],['Tezlik',fmt(v*k,1)+' km/s'],['v_max / v_min',fmt((1+P.e)/(1-P.e),2)]];}
});

/* Bernulli tenglamasi */
SIMS.push({id:'bernulli',cat:'sta',title:'Bernulli tenglamasi',short:'p + ρv²/2 = const',
  sub:'Quvurning tor joyida suyuqlik tezroq oqadi, bosimi esa kamayadi. Manometr naychalaridagi suv balandligi bosimni ko‘rsatadi.',
  formula:`<span><i>p</i> + ${fr('<i>ρv</i>²','2')} = const</span><span class="alt"><i>S</i>₁<i>v</i>₁ = <i>S</i>₂<i>v</i>₂</span>`,
  text:['Siqilmaydigan suyuqlik uchun uzluksizlik tenglamasi: bir vaqtda har bir kesimdan bir xil hajm o‘tadi, S₁v₁ = S₂v₂. Demak quvur torayganda tezlik ortadi.','Energiya saqlanishidan Bernulli tenglamasi kelib chiqadi: p + ρv²/2 = const. Tezlik ortgan joyda statik bosim kamayadi. Samolyot qanoti, purkagich va Venturi suv o‘lchagichi shu prinsipda ishlaydi.'],
  legend:[['p','statik bosim, Pa'],['ρ','suyuqlik zichligi, kg/m³'],['v','oqim tezligi, m/s'],['S','quvur kesim yuzasi, m²']],
  tries:['Tor qismni yanada toraytiring: o‘rtadagi naychadagi suv pasayadi.','Tezlikni oshiring: bosimlar farqi tezlik kvadratiga proporsional o‘sadi.','S₂/S₁ = 1 qiling: bosim hamma joyda bir xil.'],
  params:[{id:'v1',label:'Kirishdagi tezlik',sym:'v₁',min:0.2,max:3,step:0.05,val:1.2,unit:'m/s',d:2},{id:'k',label:'Kesimlar nisbati S₂/S₁',sym:'',min:0.25,max:1,step:0.01,val:0.45,d:2},{id:'p1',label:'Kirishdagi bosim',sym:'p₁',min:105,max:140,step:1,val:120,unit:'kPa',d:0}],
  init:()=>({ps:Array.from({length:140},()=>({u:Math.random(),w:Math.random()*2-1}))}),
  step(S,P,dt){const L=1;S.ps.forEach(p=>{const s=p.u,k=s>0.38&&s<0.62?P.k:s>0.3&&s<0.38?1-(1-P.k)*(s-0.3)/0.08:s>0.62&&s<0.7?P.k+(1-P.k)*(s-0.62)/0.08:1;p.u+=P.v1/k*dt*0.12;if(p.u>1){p.u-=1;p.w=Math.random()*2-1;}});},
  draw(c,W,H,S,P){grid(c,W,H,28);const x0=40,x1=W-40,cy=H*0.68,R1=Math.min(70,H*0.13),X=u=>x0+u*(x1-x0),kof=s=>s>0.38&&s<0.62?P.k:s>0.3&&s<0.38?1-(1-P.k)*(s-0.3)/0.08:s>0.62&&s<0.7?P.k+(1-P.k)*(s-0.62)/0.08:1,Rr=s=>R1*Math.sqrt(kof(s));S.g={x0,x1,cy,R1};
    c.fillStyle=rgba('water',0.28);c.beginPath();for(let i=0;i<=100;i++){const s=i/100;c.lineTo(X(s),cy-Rr(s));}for(let i=100;i>=0;i--){const s=i/100;c.lineTo(X(s),cy+Rr(s));}c.closePath();c.fill();c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();for(let i=0;i<=100;i++){const s=i/100;i?c.lineTo(X(s),cy-Rr(s)):c.moveTo(X(s),cy-Rr(s));}c.stroke();c.beginPath();for(let i=0;i<=100;i++){const s=i/100;i?c.lineTo(X(s),cy+Rr(s)):c.moveTo(X(s),cy+Rr(s));}c.stroke();
    S.ps.forEach(p=>disk(c,X(p.u),cy+p.w*Rr(p.u)*0.85,2.6,C.water));
    const rho=1000,v2=P.v1/P.k,p2=P.p1*1000-rho*(v2*v2-P.v1*P.v1)/2,pa=101325,hs=[[0.15,P.p1*1000,P.v1],[0.5,p2,v2],[0.85,P.p1*1000,P.v1]],top=30,hsc=(cy-R1-top-10)/((P.p1*1000-pa)/(rho*9.8)*1.05);
    hs.forEach(([s,p,v])=>{const x=X(s),yb=cy-Rr(s),hh=Math.max(0,(p-pa)/(rho*9.8)),yt=yb-hh*hsc;c.fillStyle=rgba('panel',0.6);c.fillRect(x-7,top,14,yb-top);c.fillStyle=rgba('water',0.7);c.fillRect(x-7,Math.max(top,yt),14,yb-Math.max(top,yt));c.strokeStyle=C.ink;c.lineWidth=1.5;c.strokeRect(x-7,top,14,yb-top);
      txt(c,fmt(p/1000,1)+' kPa',x+12,Math.max(top+8,yt),C.ink,{font:SMALL});txt(c,'v = '+fmt(v,2)+' m/s',x,cy+Rr(s)+16,C.accent,{align:'center',font:SMALL});});
    if(p2<pa)txt(c,'Bosim atmosferadan past — naychaga havo so‘riladi',X(0.5),top-12,C.red,{align:'center',font:SMALL});},
  read(S,P){const v2=P.v1/P.k,dp=1000*(v2*v2-P.v1*P.v1)/2;return[['Tor joydagi tezlik v₂',fmt(v2,2)+' m/s'],['Bosim farqi p₁ − p₂',fmt(dp/1000,2)+' kPa'],['Tor joydagi bosim p₂',fmt(P.p1-dp/1000,2)+' kPa'],['Dinamik bosim ρv₂²/2',fmt(500*v2*v2/1000,2)+' kPa']];}
});

/* Ballistik mayatnik */
SIMS.push({id:'ballistik',cat:'saq',title:'Ballistik mayatnik',short:'mv = (m + M)V',
  sub:'O‘q osilgan yog‘och bo‘lakka kirib qoladi va u bilan birga ko‘tariladi. Impuls saqlanishi va energiya saqlanishini ketma-ket qo‘llab, o‘q tezligini o‘lchash mumkin.',
  formula:`<span><i>mv</i> = (<i>m</i> + <i>M</i>)<i>V</i></span><span class="alt">${fr('(<i>m</i> + <i>M</i>)<i>V</i>²','2')} = (<i>m</i> + <i>M</i>)<i>gh</i></span>`,
  text:['To‘qnashuv juda qisqa vaqtda bo‘ladi, shuning uchun bu vaqtda tashqi kuchlar impulsi hisobga olinmaydi: mv = (m + M)V. To‘qnashuv noelastik — o‘q kinetik energiyasining katta qismi issiqlik va deformatsiyaga aylanadi.','To‘qnashuvdan keyin mayatnik harakatida mexanik energiya saqlanadi: V²/2 = gh. Ko‘tarilish balandligini o‘lchab, o‘q tezligi topiladi: v = (m + M)/m · √(2gh).'],
  legend:[['m','o‘q massasi, g'],['v','o‘q tezligi, m/s'],['M','brusok massasi, kg'],['V','to‘qnashuvdan keyingi tezlik'],['h','ko‘tarilish balandligi']],
  tries:['Brusok massasini oshiring: ko‘tarilish kamayadi, lekin hisoblangan o‘q tezligi o‘zgarmaydi.','Issiqlikka aylangan energiya ulushi M/(m + M) ga teng ekanini tekshiring.','O‘q tezligini ikki marta oshiring: h to‘rt marta ortadi.'],
  params:[{id:'m',label:'O‘q massasi',sym:'m',min:2,max:30,step:1,val:10,unit:'g',d:0,reset:1},{id:'v',label:'O‘q tezligi',sym:'v',min:50,max:600,step:10,val:300,unit:'m/s',d:0,reset:1},{id:'M',label:'Brusok massasi',sym:'M',min:0.5,max:5,step:0.1,val:2,unit:'kg',d:1,reset:1},{id:'L',label:'Ip uzunligi',sym:'L',min:0.5,max:2,step:0.1,val:1.2,unit:'m',d:1,reset:1}],
  init:()=>({bx:-1,hit:0,th:0,w:0,t:0,thm:0}),
  step(S,P,dt){const m=P.m/1000,V=m*P.v/(m+P.M);S.t+=dt;if(!S.hit){S.bx+=dt*1.6;if(S.bx>=0){S.hit=1;S.w=V/P.L;}return;}const n=20,h=dt/n;for(let i=0;i<n;i++){S.w+=-9.8/P.L*Math.sin(S.th)*h;S.th+=S.w*h;}S.thm=Math.max(S.thm,S.th);if(S.t>9)Object.assign(S,{bx:-1,hit:0,th:0,w:0,t:0,thm:0});},
  draw(c,W,H,S,P){grid(c,W,H,28);const px=W*0.55,py=40,sc=Math.min((H-150)/2.1,W*0.25),L=P.L*sc,bw=40+P.M*8,bh=30+P.M*4,ex=px+L*Math.sin(S.th),ey=py+L*Math.cos(S.th);S.g={px,py,sc};
    c.fillStyle=rgba('muted',0.4);c.fillRect(px-140,py-12,280,12);[-bw*0.35,bw*0.35].forEach(o=>line(c,px+o,py,ex+o,ey-bh/2,C.ink,1.5));
    c.save();c.translate(ex,ey);c.rotate(-S.th);c.fillStyle='#b07a45';rrect(c,-bw/2,-bh/2,bw,bh,4);c.fill();c.strokeStyle='#6d4524';c.lineWidth=1.5;c.stroke();if(S.hit){c.fillStyle='#d9dee6';c.fillRect(-bw/2+4,-2,8,4);}c.restore();
    if(!S.hit){const x=px-bw/2-(-S.bx)*(px-60);c.fillStyle='#d9dee6';rrect(c,x-14,py+L-3,14,6,3);c.fill();for(let i=1;i<5;i++)line(c,x-14-i*12,py+L,x-20-i*12,py+L,rgba('muted',0.5),1);txt(c,'v = '+fmt(P.v,0)+' m/s',x-14,py+L-16,C.ink,{font:SMALL,align:'center'});}
    c.fillStyle='#3a4252';rrect(c,30,py+L-14,46,28,4);c.fill();
    const m=P.m/1000,V=m*P.v/(m+P.M),hmax=V*V/19.6,yh=py+L-hmax*sc;line(c,px-bw,py+L,px+bw+120,py+L,rgba('muted',0.5),1,[4,4]);if(S.hit){line(c,px+bw*0.6,yh,px+bw+120,yh,C.red,1.2,[4,4]);txt(c,'h = '+fmt(hmax*100,1)+' sm',px+bw+122,yh-2,C.red,{font:SMALL});}},
  read(S,P){const m=P.m/1000,V=m*P.v/(m+P.M),h=V*V/19.6,E0=m*P.v*P.v/2,E1=(m+P.M)*V*V/2;return[['To‘qnashuvdan keyingi tezlik V',fmt(V,2)+' m/s'],['Ko‘tarilish balandligi h',fmt(h*100,1)+' sm'],['Og‘ish burchagi',fmt(Math.acos(Math.max(-1,1-h/P.L))/D2R,1)+'°'],['O‘q energiyasi',fmt(E0,0)+' J'],['Issiqlikka aylangan',fmt((E0-E1)/E0*100,1)+' %']];}
});

/* Garmonik tebranish va aylanma harakat */
SIMS.push({id:'garmonik',cat:'teb',title:'Garmonik tebranish va aylanma harakat',short:'x = A cos(ωt + φ₀)',
  sub:'Aylana bo‘ylab tekis harakatlanayotgan nuqtaning diametrga proyeksiyasi garmonik tebranadi. Koordinata, tezlik va tezlanish grafiklari bir-biridan chorak davrga siljigan.',
  formula:`<span><i>x</i> = <i>A</i> cos(<i>ωt</i> + <i>φ</i>₀)</span><span class="alt"><i>v</i> = −<i>Aω</i> sin(<i>ωt</i> + <i>φ</i>₀), &nbsp;<i>a</i> = −<i>ω</i>²<i>x</i></span>`,
  text:['Radiusi A bo‘lgan aylanada ω burchak tezlik bilan harakatlanayotgan nuqtaning gorizontal o‘qqa proyeksiyasi x = A cos(ωt + φ₀) qonun bo‘yicha tebranadi. Aylanadagi burchak — tebranish fazasi.','Tezlik koordinatadan chorak davr oldinda, tezlanish esa koordinataga qarama-qarshi: a = −ω²x. Aynan shu shart garmonik tebranishni belgilaydi: qaytaruvchi kuch siljishga proporsional.'],
  legend:[['A','amplituda, sm'],['ω','siklik chastota, rad/s'],['φ₀','boshlang‘ich faza'],['T','davr, s'],['ν','chastota, Hz']],
  tries:['Uchta grafikni solishtiring: x eng katta bo‘lganda v = 0, a esa eng katta va manfiy.','Chastotani ikki marta oshiring: maksimal tezlanish 4 marta ortadi.','φ₀ = 90° qiling: tebranish muvozanat holatidan boshlanadi.'],
  params:[{id:'A',label:'Amplituda',sym:'A',min:2,max:10,step:0.5,val:8,unit:'sm',d:1},{id:'f',label:'Chastota',sym:'ν',min:0.1,max:1.2,step:0.05,val:0.4,unit:'Hz',d:2},{id:'ph',label:'Boshlang‘ich faza',sym:'φ₀',min:0,max:360,step:15,val:0,unit:'°',d:0,reset:1}],
  init:()=>({t:0,tr:[]}),
  step(S,P,dt){S.t+=dt;const w=TAU*P.f,f=w*S.t+P.ph*D2R;S.tr.push([S.t,Math.cos(f),-Math.sin(f),-Math.cos(f)]);if(S.tr.length>700)S.tr.shift();},
  draw(c,W,H,S,P){grid(c,W,H,28);const R=Math.min(H*0.3,W*0.17)*P.A/10,cx=W*0.2,cy=H*0.42,f=TAU*P.f*S.t+P.ph*D2R,px=cx+R*Math.cos(f),py=cy-R*Math.sin(f);S.g={cx,cy,R,f};
    c.strokeStyle=rgba('muted',0.6);c.lineWidth=1.3;c.beginPath();c.arc(cx,cy,R,0,TAU);c.stroke();line(c,cx-R-20,cy,cx+R+20,cy,C.muted,1);line(c,cx,cy,px,py,C.ink,1.5);
    c.strokeStyle=C.warm;c.lineWidth=2;c.beginPath();c.arc(cx,cy,22,0,-((f%TAU)+TAU)%TAU,true);c.stroke();txt(c,'φ',cx+26,cy-14,C.warm,{font:MATH});
    disk(c,px,py,8,C.accent);line(c,px,py,px,cy,rgba('muted',0.6),1,[3,3]);const by=H*0.86;line(c,cx-R-20,by,cx+R+20,by,C.ink,2);line(c,px,cy,px,by-14,rgba('muted',0.4),1,[3,3]);c.fillStyle=C.red;rrect(c,px-14,by-14,28,28,5);c.fill();
    const w=TAU*P.f,vx=-R*w*Math.sin(f),ax=-w*w*R*Math.cos(f);arrow(c,px,by-24,px+vx*0.35,by-24,C.green,2.2,'v');arrow(c,px,by+22,px+ax*0.12,by+22,C.violet,2.2,'a');
    const gx=W*0.42,gw=W-gx-20,rows=[['x',1,C.red],['v',2,C.green],['a',3,C.violet]],gh=(H-40)/3;
    rows.forEach(([lb,k,col],i)=>{const g0=20+i*gh,gm=g0+gh/2,amp=gh*0.38;line(c,gx,gm,gx+gw,gm,rgba('muted',0.5),1);txt(c,lb,gx-14,gm,col,{font:MATH});const t0=S.t-8;c.strokeStyle=col;c.lineWidth=2;c.beginPath();S.tr.forEach((q,j)=>{const x=gx+(q[0]-t0)/8*gw;if(x<gx)return;const y=gm-q[k]*amp;j?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();});},
  read(S,P){const w=TAU*P.f,f=w*S.t+P.ph*D2R,A=P.A/100;return[['Davr T',fmt(1/P.f,2)+' s'],['Faza',fmt(((f/D2R)%360+360)%360,0)+'°'],['x',fmt(A*Math.cos(f)*100,2)+' sm'],['v (maks Aω)',fmt(-A*w*Math.sin(f),3)+' ('+fmt(A*w,3)+') m/s'],['a (maks Aω²)',fmt(-A*w*w*Math.cos(f),3)+' ('+fmt(A*w*w,3)+') m/s²']];}
});

/* Diffuziya */
SIMS.push({id:'diffuziya',cat:'mol',title:'Diffuziya',short:'⟨x²⟩ = 2Dt',
  sub:'To‘siq olib tashlangach, ikki gaz molekulalari bir-biriga aralashadi. Har bir molekula tartibsiz yo‘l bosadi, aralashish masofasi esa vaqtning kvadrat ildiziga proporsional o‘sadi.',
  formula:`<span>⟨<i>x</i>²⟩ = 2<i>Dt</i></span><span class="alt"><i>D</i> ~ ${fr('1','3')}<i>λv̄</i>, &nbsp;<i>v̄</i> ~ √(${fr('<i>T</i>','<i>m</i>')})</span>`,
  text:['Diffuziya — moddalarning molekulalar issiqlik harakati tufayli o‘z-o‘zidan aralashishi. Har bir molekula boshqalari bilan to‘qnashib, yo‘nalishini tasodifiy o‘zgartiradi (tasodifiy sayr). Shuning uchun molekula t vaqtda vt emas, faqat √(2Dt) masofaga siljiydi.','Diffuziya koeffitsienti D harorat oshganda ortadi (molekulalar tezroq), molekulalar og‘irroq bo‘lsa yoki gaz zichroq bo‘lsa kamayadi. Suyuqlikda diffuziya gazdagidan minglab marta sekin, qattiq jismlarda yanada sekin.'],
  legend:[['D','diffuziya koeffitsienti, sm²/s'],['⟨x²⟩','o‘rtacha kvadratik siljish'],['λ','erkin yugurish yo‘li'],['v̄','molekulalarning o‘rtacha tezligi'],['T','harorat, K']],
  tries:['Haroratni oshiring: konsentratsiya profili tezroq tekislanadi.','Og‘irroq molekulani tanlang: aralashish sekinlashadi.','√(2Dt) ni o‘lchab, haqiqiy sayr qilgan yo‘l bilan solishtiring — yo‘l ancha uzun.'],
  params:[{id:'T',label:'Harorat',sym:'T',min:200,max:900,step:10,val:300,unit:'K',d:0},{id:'M',label:'Molekula massasi',sym:'M',min:2,max:100,step:1,val:28,unit:'g/mol',d:0,reset:1}],
  tools:[{id:'reset',label:'Qaytadan boshlash',act:1}],action(id,S,P){if(id==='reset')Object.assign(S,SIMS.find(s=>s.id==='diffuziya').init(P));},
  init:()=>{const ps=[];for(let i=0;i<500;i++){const L=i<250;ps.push({x:L?Math.random()*0.5:0.5+Math.random()*0.5,y:Math.random(),s:L?0:1});}return{ps,t:0,hist:[],tag:{x:0.25,y:0.5,x0:0.25,tr:[]}};},
  D:P=>0.004*Math.pow(P.T/300,1.5)/Math.sqrt(P.M/28),
  step(S,P,dt){const D=SIMS.find(s=>s.id==='diffuziya').D(P),sg=Math.sqrt(2*D*dt);S.t+=dt;const mv=p=>{p.x+=sg*gzGauss();p.y+=sg*gzGauss();if(p.x<0)p.x=-p.x;if(p.x>1)p.x=2-p.x;if(p.y<0)p.y=-p.y;if(p.y>1)p.y=2-p.y;};S.ps.forEach(mv);const g=S.tag;mv(g);g.tr.push(g.x,g.y);if(g.tr.length>1200)g.tr.splice(0,2);},
  draw(c,W,H,S,P){grid(c,W,H,28);const bx=30,bw=W*0.6,by=40,bh=H*0.6,X=x=>bx+x*bw,Y=y=>by+y*bh;S.g={bx,bw,by,bh};c.strokeStyle=C.ink;c.lineWidth=2.5;c.strokeRect(bx,by,bw,bh);
    S.ps.forEach(p=>{c.fillStyle=p.s?'#ff9f43':'#5fb4ff';c.fillRect(X(p.x)-2.2,Y(p.y)-2.2,4.4,4.4);});const g=S.tag;c.strokeStyle=rgba('ink',0.6);c.lineWidth=1;c.beginPath();for(let i=0;i<g.tr.length;i+=2)i?c.lineTo(X(g.tr[i]),Y(g.tr[i+1])):c.moveTo(X(g.tr[i]),Y(g.tr[i+1]));c.stroke();disk(c,X(g.x),Y(g.y),5,'#fff');
    const D=SIMS.find(s=>s.id==='diffuziya').D(P),ld=Math.sqrt(2*D*S.t);line(c,X(0.5-ld),Y(1)+14,X(0.5+ld),Y(1)+14,C.red,2.5);txt(c,'2√(2Dt)',X(0.5),Y(1)+28,C.red,{align:'center',font:SMALL});
    const gx=bx+bw+40,gw=W-gx-20,gt=by,gb=by+bh,nb=20,cnt=Array.from({length:nb},()=>[0,0]);S.ps.forEach(p=>{const k=Math.min(nb-1,Math.floor(p.x*nb));cnt[k][p.s]++;});txt(c,'A gaz ulushi c(x)',gx,gt-14,C.muted,{font:SMALL});line(c,gx,gb,gx+gw,gb,C.ink,1);line(c,gx,gb,gx,gt,C.ink,1);
    c.strokeStyle='#5fb4ff';c.lineWidth=2.4;c.beginPath();cnt.forEach(([a,b],k)=>{const v=a+b?a/(a+b):0.5,x=gx+(k+0.5)/nb*gw,y=gb-v*(gb-gt);k?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();
    c.strokeStyle=rgba('muted',0.7);c.lineWidth=1.2;c.setLineDash([4,3]);c.beginPath();for(let i=0;i<=60;i++){const x=i/60,v=S.t>0?0.5*(1-erf((x-0.5)/Math.sqrt(4*D*S.t))):x<0.5?1:0,xx=gx+x*gw;i?c.lineTo(xx,gb-v*(gb-gt)):c.moveTo(xx,gb-v*(gb-gt));}c.stroke();c.setLineDash([]);
    txt(c,'nazariya',gx+gw,gt+10,C.muted,{align:'right',font:SMALL});txt(c,'chap',gx,gb+14,C.muted,{font:SMALL});txt(c,'o‘ng',gx+gw,gb+14,C.muted,{font:SMALL,align:'right'});},
  read(S,P){const D=SIMS.find(s=>s.id==='diffuziya').D(P),L=S.ps.filter(p=>p.s===0&&p.x>0.5).length;return[['Vaqt (model)',fmt(S.t,1)+' s'],['Diffuziya koeffitsienti D (nisbiy)',fmt(D/0.004,2)],['√(2Dt) / idish eni',fmt(Math.sqrt(2*D*S.t),3)],['O‘ng yarmiga o‘tgan A molekulalar',fmt(L/250*100,0)+' %']];}
});
function erf(x){const t=1/(1+0.3275911*Math.abs(x)),y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return x>=0?y:-y;}

/* Havo namligi */
function esat(T){return 6.112*Math.exp(17.62*T/(243.12+T));}/* hPa, Magnus */
function rhos(T){return 216.7*esat(T)/(T+273.15);}/* g/m³ */
SIMS.push({id:'namlik',cat:'mol',title:'Havo namligi va shudring nuqtasi',short:'φ = ρ/ρ₀ · 100%',
  sub:'Havodagi suv bug‘i miqdori to‘yingan bug‘ zichligi bilan solishtiriladi. Sovuq stakan sirti shudring nuqtasidan sovuq bo‘lsa, unga tomchilar o‘tiradi.',
  formula:`<span><i>φ</i> = ${fr('<i>ρ</i>','<i>ρ</i>₀(<i>T</i>)')} · 100%</span><span class="alt"><i>ρ</i>₀(<i>T</i><sub>sh</sub>) = <i>ρ</i> — shudring nuqtasi</span>`,
  text:['Absolyut namlik ρ — 1 m³ havodagi suv bug‘i massasi. Muayyan haroratda havo faqat ma’lum miqdordagi bug‘ni ushlab tura oladi — bu to‘yingan bug‘ zichligi ρ₀(T), u harorat bilan tez o‘sadi. Nisbiy namlik φ = ρ/ρ₀ · 100%.','Havo soviganda ρ₀ kamayadi va qandaydir haroratda ρ ga tenglashadi — bu shudring nuqtasi. Undan sovuqroq sirtlarda bug‘ kondensatsiyalanadi: deraza terlaydi, ertalab o‘tlarda shudring paydo bo‘ladi.'],
  legend:[['φ','nisbiy namlik, %'],['ρ','absolyut namlik, g/m³'],['ρ₀','to‘yingan bug‘ zichligi, g/m³'],['T_sh','shudring nuqtasi, °C']],
  tries:['Stakan haroratini shudring nuqtasidan pastga tushiring: sirtda tomchilar paydo bo‘ladi.','Havo haroratini oshiring, ρ ni o‘zgartirmang: nisbiy namlik kamayadi.','φ = 100% bo‘lganda shudring nuqtasi havo harorati bilan teng.'],
  params:[{id:'T',label:'Havo harorati',sym:'T',min:0,max:40,step:0.5,val:25,unit:'°C',d:1},{id:'rho',label:'Absolyut namlik',sym:'ρ',min:2,max:30,step:0.5,val:12,unit:'g/m³',d:1},{id:'Tg',label:'Stakan harorati',sym:'',min:-5,max:35,step:0.5,val:8,unit:'°C',d:1}],
  init:()=>({dr:[],t:0,mol:Array.from({length:120},()=>({x:Math.random(),y:Math.random(),a:Math.random()*TAU}))}),
  td(P){const r=Math.min(P.rho,rhos(P.T));let lo=-40,hi=P.T;for(let i=0;i<40;i++){const m=(lo+hi)/2;if(rhos(m)>r)hi=m;else lo=m;}return(lo+hi)/2;},
  step(S,P,dt){S.t+=dt;const td=SIMS.find(s=>s.id==='namlik').td(P);if(P.Tg<td){if(S.dr.length<160&&Math.random()<(td-P.Tg)*dt*2)S.dr.push({u:Math.random(),v:Math.random(),r:1+Math.random()*1.5});S.dr.forEach(d=>d.r=Math.min(4.5,d.r+dt*0.08*(td-P.Tg)));}else{S.dr.forEach(d=>d.r-=dt*0.6);S.dr=S.dr.filter(d=>d.r>0.3);}
    S.mol.forEach(m=>{m.a+=(Math.random()-0.5)*dt*8;m.x=(m.x+Math.cos(m.a)*dt*0.08+1)%1;m.y=(m.y+Math.sin(m.a)*dt*0.08+1)%1;});},
  draw(c,W,H,S,P){grid(c,W,H,28);const sim=SIMS.find(s=>s.id==='namlik'),td=sim.td(P),phi=Math.min(100,P.rho/rhos(P.T)*100),aw=W*0.46,gx0=W*0.1,gw=W*0.16,gt=H*0.3,gb=H-40;S.g={gx0,gw,gt,gb};
    const nm=Math.round(Math.min(P.rho,rhos(P.T))/30*120);S.mol.slice(0,nm).forEach(m=>disk(c,10+m.x*(aw-20),20+m.y*(H-60),2.2,rgba('water',0.7)));
    c.fillStyle=rgba('water',0.25);c.fillRect(gx0+4,gt+(gb-gt)*0.25,gw-8,(gb-gt)*0.75-4);c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(gx0,gt);c.lineTo(gx0+6,gb);c.lineTo(gx0+gw-6,gb);c.lineTo(gx0+gw,gt);c.stroke();
    for(let i=0;i<5;i++){c.fillStyle='rgba(220,240,255,0.7)';c.fillRect(gx0+12+i*12,gt+(gb-gt)*0.32+((i*37)%30),8,8);}
    S.dr.forEach(d=>{const y=gt+d.v*(gb-gt),x=d.u<0.5?gx0+6*d.v-2:gx0+gw-6*d.v+2;disk(c,x,y,d.r,'rgba(170,215,255,0.85)');});
    txt(c,'stakan '+fmt(P.Tg,1)+' °C',gx0+gw/2,gt-14,C.ink,{align:'center',font:SMALL});if(P.Tg<td)txt(c,'tomchilar!',gx0+gw/2,gt-30,C.accent,{align:'center',font:SMALL});
    const cx=W*0.55,cw=W-cx-30,ct=40,cb=H-50,Xc=T=>cx+(T+5)/45*cw,Yc=r=>cb-r/52*(cb-ct);line(c,cx,cb,cx+cw,cb,C.ink,1);line(c,cx,cb,cx,ct,C.ink,1);txt(c,'ρ₀(T), g/m³',cx+6,ct-10,C.muted,{font:SMALL});txt(c,'T, °C',cx+cw,cb+14,C.muted,{font:SMALL,align:'right'});
    [0,10,20,30,40].forEach(T=>txt(c,T+'',Xc(T),cb+14,C.muted,{align:'center',font:SMALL}));c.strokeStyle=C.accent;c.lineWidth=2.4;c.beginPath();for(let T=-5;T<=40;T+=0.5){const y=Yc(rhos(T));T>-5?c.lineTo(Xc(T),y):c.moveTo(Xc(T),y);}c.stroke();
    const r=Math.min(P.rho,rhos(P.T));line(c,Xc(td),Yc(r),Xc(P.T),Yc(r),C.warm,1.5,[4,3]);disk(c,Xc(P.T),Yc(r),6,C.red);disk(c,Xc(td),Yc(r),5,C.warm);txt(c,'T_sh',Xc(td),Yc(r)-12,C.warm,{align:'center',font:SMALL});line(c,Xc(P.Tg),cb,Xc(P.Tg),ct,rgba('water',0.7),1.5,[3,3]);txt(c,'stakan',Xc(P.Tg)+4,ct+10,C.water,{font:SMALL});},
  read(S,P){const sim=SIMS.find(s=>s.id==='namlik'),td=sim.td(P),r0=rhos(P.T);return[['To‘yingan bug‘ zichligi ρ₀',fmt(r0,1)+' g/m³'],['Nisbiy namlik φ',fmt(Math.min(100,P.rho/r0*100),0)+' %'+(P.rho>r0?' (ortiqcha bug‘ — tuman)':'')],['Shudring nuqtasi',fmt(td,1)+' °C'],['Stakan sirti',P.Tg<td?'terlaydi':'quruq']];}
});
