/* ===== v8: yangi mavzular (1-qism): kin, din, sta, saq, teb ===== */

/* umumiy grafik chizgich */
function gplot(c,gx,gy,gw,gh,o){const x0=o.x0??0,x1=o.x1,y0=o.y0??0,y1=o.y1,X=x=>gx+(x-x0)/(x1-x0)*gw,Y=y=>gy+gh-(y-y0)/(y1-y0)*gh;
  c.fillStyle=rgba('panel',0.55);c.fillRect(gx-6,gy-14,gw+14,gh+30);
  if(o.xt){for(let v=Math.ceil(x0/o.xt)*o.xt;v<=x1+1e-9;v+=o.xt){line(c,X(v),gy,X(v),gy+gh,rgba('muted',0.14),1);txt(c,fmt(v,o.xd??(o.xt<1?1:0)),X(v),gy+gh+9,C.muted,{align:'center',font:SMALL});}}
  if(o.yt){for(let v=Math.ceil(y0/o.yt)*o.yt;v<=y1+1e-9;v+=o.yt){line(c,gx,Y(v),gx+gw,Y(v),rgba('muted',0.14),1);txt(c,fmt(v,o.yd??(o.yt<1?(o.yt<0.1?2:1):0)),gx-4,Y(v),C.muted,{align:'right',font:SMALL});}}
  const zy=y0<0&&y1>0?Y(0):gy+gh;line(c,gx,zy,gx+gw,zy,C.ink,1.2);line(c,gx,gy,gx,gy+gh,C.ink,1.2);
  if(o.xl)txt(c,o.xl,gx+gw,zy-8,C.muted,{align:'right',font:SMALL});if(o.yl)txt(c,o.yl,gx+5,gy-6,C.muted,{font:SMALL});
  c.save();c.beginPath();c.rect(gx,gy-2,gw+2,gh+4);c.clip();
  (o.fill||[]).forEach(([pts,col])=>{if(pts.length<2)return;c.fillStyle=col;c.beginPath();c.moveTo(X(pts[0][0]),zy);pts.forEach(p=>c.lineTo(X(p[0]),Y(p[1])));c.lineTo(X(pts[pts.length-1][0]),zy);c.closePath();c.fill();});
  (o.lines||[]).forEach(([pts,col,lw,dash])=>{if(pts.length<2)return;c.strokeStyle=col;c.lineWidth=lw||2;c.setLineDash(dash||[]);c.beginPath();pts.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(p[1])):c.moveTo(X(p[0]),Y(p[1])));c.stroke();c.setLineDash([]);});
  c.restore();(o.marks||[]).forEach(([x,y,col])=>disk(c,X(x),Y(y),4.5,col));return{X,Y};}

/* 1. Havo qarshiligida otilgan jism */
SIMS.push({id:'qarshilik',cat:'kin',title:'Havo qarshiligida otilgan jism',short:'F = kv²',
  sub:'Haqiqiy havoda otilgan jism parabola bo‘ylab uchmaydi: qarshilik kuchi tezlikka qarshi yo‘naladi, shuning uchun uchish uzoqligi va balandligi kamayadi, traektoriya esa nosimmetrik bo‘ladi.',
  formula:`<span><i>m</i>${fr('d<b>v</b>','d<i>t</i>')} = <i>m</i><b>g</b> − <i>k</i>|<b>v</b>|<b>v</b></span><span class="alt"><i>v</i><sub>chegara</sub> = ${sq(fr('<i>mg</i>','<i>k</i>'))}</span>`,
  text:['Havoda harakatlanayotgan jismga tezlik kvadratiga proporsional qarshilik kuchi ta’sir qiladi: F = kv². U har doim tezlikka qarama-qarshi yo‘nalgan, shuning uchun jism ko‘tarilishda ham, tushishda ham sekinlashtiriladi. Natijada eng katta uzoqlik 45° da emas, kichikroq burchakda olinadi.','Traektoriyaning tushish qismi ko‘tarilish qismidan tikroq bo‘ladi. Agar jism uzoq tushsa, uning tezligi chegaraviy tezlikka yaqinlashadi — og‘irlik va qarshilik kuchlari tenglashadi. Kulrang punktir — havosiz holatdagi parabola.'],
  legend:[['v₀','boshlang‘ich tezlik, m/s'],['α','otish burchagi'],['k/m','qarshilik koeffitsiyentining massaga nisbati, 1/m'],['v_ch','chegaraviy tezlik, m/s']],
  tries:['k/m = 0 qiling: traektoriya punktir parabola bilan ustma-ust tushadi.','k/m ni oshiring va burchakni o‘zgartirib, eng katta uzoqlik beradigan burchakni toping (45° dan kichik).','Burchakni 90° ga yaqin qiling: jism qaytib tushishda chegaraviy tezlikdan oshmaydi.'],
  params:[{id:'v',label:'Boshlang‘ich tezlik',sym:'v₀',min:5,max:60,step:1,val:35,unit:'m/s',d:0,reset:1},{id:'a',label:'Otish burchagi',sym:'α',min:5,max:85,step:1,val:45,unit:'°',d:0,reset:1},{id:'k',label:'Qarshilik koeffitsiyenti k/m',sym:'k/m',min:0,max:0.05,step:0.001,val:0.012,unit:'1/m',d:3,reset:1}],
  calc(P){const g=9.8,a=P.a*D2R;let x=0,y=0,vx=P.v*Math.cos(a),vy=P.v*Math.sin(a),t=0;const pts=[[0,0,P.v,0]];let hmax=0;const h=0.004;
    while(y>=0&&t<40){const v=Math.hypot(vx,vy),ax=-P.k*v*vx,ay=-g-P.k*v*vy;vx+=ax*h;vy+=ay*h;x+=vx*h;y+=vy*h;t+=h;hmax=Math.max(hmax,y);if(Math.round(t/h)%10===0)pts.push([x,Math.max(y,0),Math.hypot(vx,vy),t]);}
    const T0=2*P.v*Math.sin(a)/g,L0=P.v*P.v*Math.sin(2*a)/g,H0=(P.v*Math.sin(a))**2/(2*g);return{pts,L:x,T:t,H:hmax,L0,T0,H0,vend:Math.hypot(vx,vy)};},
  init(P){return{t:0,wait:0,q:this.calc(P)};},
  step(S,P,dt){const q=S.q;if(S.t>=q.T){S.wait+=dt;if(S.wait>1.4){S.t=0;S.wait=0;}return;}S.t=Math.min(q.T,S.t+dt*Math.max(1,q.T/5));},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=S.q,x0=50,gy=H-36,Lm=Math.max(q.L0,q.L,10),Hm=Math.max(q.H0,q.H,5),sc=Math.min((W-x0-40)/Lm,(gy-50)/Hm),X=x=>x0+x*sc,Y=y=>gy-y*sc;S.g={x0,gy,sc};
    line(c,0,gy,W,gy,C.ink,2);const st=niceStep(Lm,6);for(let v=0;v<=Lm+1e-9;v+=st){line(c,X(v),gy,X(v),gy+6,C.muted,1);txt(c,fmt(v,0)+' m',X(v),gy+16,C.muted,{align:'center',font:SMALL});}
    const a=P.a*D2R;c.setLineDash([5,4]);c.strokeStyle=rgba('muted',0.7);c.lineWidth=1.3;c.beginPath();for(let i=0;i<=80;i++){const t=q.T0*i/80,x=P.v*Math.cos(a)*t,y=P.v*Math.sin(a)*t-4.9*t*t;i?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y));}c.stroke();c.setLineDash([]);
    c.strokeStyle=C.accent;c.lineWidth=2.4;c.beginPath();q.pts.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(p[1])):c.moveTo(X(p[0]),Y(p[1])));c.stroke();
    let k=q.pts.findIndex(p=>p[3]>=S.t);if(k<0)k=q.pts.length-1;const p=q.pts[k],pn=q.pts[Math.min(k+1,q.pts.length-1)],pp=q.pts[Math.max(k-1,0)];const dx=pn[0]-pp[0],dy=pn[1]-pp[1],dl=Math.hypot(dx,dy)||1;
    disk(c,X(p[0]),Y(p[1]),9,C.warm);const ux=dx/dl,uy=dy/dl,vs=2.5;arrow(c,X(p[0]),Y(p[1]),X(p[0])+ux*p[2]*vs,Y(p[1])-uy*p[2]*vs,C.green,2.4,'v');
    const F=P.k*p[2]*p[2];if(F>0.05)arrow(c,X(p[0]),Y(p[1]),X(p[0])-ux*F*5,Y(p[1])+uy*F*5,C.red,2.4,'F');arrow(c,X(p[0]),Y(p[1]),X(p[0]),Y(p[1])+9.8*5,C.violet,2.2,'mg');
    line(c,X(q.L),gy-8,X(q.L),gy+8,C.accent,2.5);line(c,X(q.L0),gy-8,X(q.L0),gy+8,C.muted,2);txt(c,'havosiz',X(q.L0),gy-14,C.muted,{align:'center',font:SMALL});},
  read(S,P){const q=S.q,vt=P.k>0?Math.sqrt(9.8/P.k):Infinity;return[['Uchish uzoqligi L',fmt(q.L,1)+' m'],['Havosiz uzoqlik',fmt(q.L0,1)+' m'],['Eng katta balandlik',fmt(q.H,1)+' m / '+fmt(q.H0,1)+' m'],['Uchish vaqti',fmt(q.T,2)+' s'],['Tushishdagi tezlik',fmt(q.vend,1)+' m/s'],['Chegaraviy tezlik',isFinite(vt)?fmt(vt,1)+' m/s':'∞']];}
});

/* 2. Harakat grafiklari */
SIMS.push({id:'grafik',cat:'kin',title:'Harakat grafiklari: x(t), v(t), a(t)',short:'S = v-t grafik ostidagi yuza',
  sub:'Aravacha yo‘l bo‘ylab harakatlanadi, uning koordinatasi, tezligi va tezlanishi bir vaqtda grafikka chiziladi. v(t) grafigi ostidagi yuza ko‘chishga, x(t) grafigining qiyaligi esa tezlikka teng.',
  formula:`<span><i>x</i> = <i>x</i>₀ + <i>v</i>₀<i>t</i> + ${fr('<i>at</i>²','2')}</span><span class="alt"><i>v</i> = <i>v</i>₀ + <i>at</i>, &nbsp;<i>v</i> = ${fr('Δ<i>x</i>','Δ<i>t</i>')}</span>`,
  text:['Tekis tezlanuvchan harakatda a(t) grafigi gorizontal chiziq, v(t) grafigi og‘ma to‘g‘ri chiziq, x(t) grafigi esa parabola bo‘ladi. Har bir grafik keyingisining «qiyaligi»: x(t) ga urinmaning qiyaligi — tezlik, v(t) ning qiyaligi — tezlanish.','v(t) grafigi ostidagi yuza ko‘chishni beradi (o‘q ostidagi yuza manfiy hisoblanadi). Tezlanish tezlikka qarama-qarshi bo‘lsa, jism to‘xtaydi va orqaga qaytadi: shu paytda x(t) parabolaning cho‘qqisi bo‘ladi.'],
  legend:[['x₀','boshlang‘ich koordinata, m'],['v₀','boshlang‘ich tezlik, m/s'],['a','tezlanish, m/s²'],['S','yo‘l, m'],['Δx','ko‘chish, m']],
  tries:['v₀ = 6 m/s, a = −1,5 m/s² qiling: 4 s da aravacha to‘xtab, orqaga qaytadi.','a = 0 qiling: v(t) gorizontal, x(t) to‘g‘ri chiziq bo‘ladi.','Ko‘chish va bosib o‘tilgan yo‘lni solishtiring: qaytish bo‘lsa, ular farq qiladi.'],
  params:[{id:'x0',label:'Boshlang‘ich koordinata',sym:'x₀',min:-10,max:10,step:0.5,val:-8,unit:'m',d:1,reset:1},{id:'v0',label:'Boshlang‘ich tezlik',sym:'v₀',min:-6,max:8,step:0.5,val:6,unit:'m/s',d:1,reset:1},{id:'a',label:'Tezlanish',sym:'a',min:-3,max:3,step:0.1,val:-1.5,unit:'m/s²',d:1,reset:1}],
  init:()=>({t:0,wait:0}),
  step(S,P,dt){if(S.t>=8){S.wait+=dt;if(S.wait>1.5){S.t=0;S.wait=0;}return;}S.t=Math.min(8,S.t+dt);},
  xs(P,t){return P.x0+P.v0*t+P.a*t*t/2;},
  path(P,t){const ts=-P.v0/P.a;let s=0;if(P.a!==0&&ts>0&&ts<t){s=Math.abs(this.xs(P,ts)-P.x0)+Math.abs(this.xs(P,t)-this.xs(P,ts));}else s=Math.abs(this.xs(P,t)-P.x0);return s;},
  draw(c,W,H,S,P){grid(c,W,H,28);const t=S.t,x=this.xs(P,t),v=P.v0+P.a*t,ry=58,rx0=40,rx1=W-40,XR=u=>rx0+(u+40)/80*(rx1-rx0);S.g={ry,XR};
    c.fillStyle=rgba('muted',0.18);c.fillRect(rx0,ry+12,rx1-rx0,8);for(let u=-40;u<=40;u+=10){line(c,XR(u),ry+20,XR(u),ry+26,C.muted,1);txt(c,u+' m',XR(u),ry+34,C.muted,{align:'center',font:SMALL});}
    const cx=XR(clamp(x,-40,40));c.fillStyle=C.accent;rrect(c,cx-18,ry-8,36,18,4);c.fill();disk(c,cx-10,ry+11,4.5,C.ink);disk(c,cx+10,ry+11,4.5,C.ink);
    if(Math.abs(v)>0.05)arrow(c,cx,ry-16,cx+v*8,ry-16,C.green,2.2,'v');if(Math.abs(P.a)>0.05)arrow(c,cx,ry-30,cx+P.a*14,ry-30,C.red,2,'a');
    const gw=(W-90)/3,gh=H-ry-110,gt=ry+70,N=80,pts=k=>{const o=[];for(let i=0;i<=N;i++){const tt=t*i/N;o.push([tt,k(tt)]);}return o;};
    const xa=[];for(let i=0;i<=40;i++){xa.push(Math.abs(this.xs(P,i/5)));}const xm=Math.max(10,...xa)*1.1,vm=Math.max(2,Math.abs(P.v0),Math.abs(P.v0+P.a*8))*1.15,am=Math.max(1,Math.abs(P.a)*1.3);
    const G1=gplot(c,40,gt,gw-10,gh,{x1:8,y0:-xm,y1:xm,xt:2,yt:niceStep(2*xm,4),xl:'t, s',yl:'x, m',lines:[[pts(u=>this.xs(P,u)),C.accent,2.4]],marks:[[t,x,C.accent]]});
    const vpts=pts(u=>P.v0+P.a*u);const G2=gplot(c,40+gw+15,gt,gw-10,gh,{x1:8,y0:-vm,y1:vm,xt:2,yt:niceStep(2*vm,4),xl:'t, s',yl:'v, m/s',fill:[[vpts,rgba('green',0.22)]],lines:[[vpts,C.green,2.4]],marks:[[t,v,C.green]]});
    gplot(c,40+2*(gw+15),gt,gw-10,gh,{x1:8,y0:-am,y1:am,xt:2,yt:niceStep(2*am,4),xl:'t, s',yl:'a, m/s²',lines:[[[[0,P.a],[t,P.a]],C.red,2.4]],marks:[[t,P.a,C.red]]});
    const ts=-P.v0/P.a;if(P.a!==0&&ts>0&&ts<8){line(c,G1.X(ts),gt,G1.X(ts),gt+gh,rgba('warm',0.6),1,[3,3]);line(c,G2.X(ts),gt,G2.X(ts),gt+gh,rgba('warm',0.6),1,[3,3]);txt(c,'to‘xtash',G2.X(ts)+4,gt+8,C.warm,{font:SMALL});}},
  read(S,P){const t=S.t,x=this.xs(P,t);return[['Vaqt t',fmt(t,2)+' s'],['Koordinata x',fmt(x,2)+' m'],['Tezlik v',fmt(P.v0+P.a*t,2)+' m/s'],['Ko‘chish Δx',fmt(x-P.x0,2)+' m'],['Bosib o‘tilgan yo‘l S',fmt(this.path(P,t),2)+' m']];}
});

/* 3. Inersiya kuchi (tezlanuvchi vagon) */
SIMS.push({id:'inersiya',cat:'din',title:'Noinersial sanoq sistemasi: inersiya kuchi',short:'F_in = −ma',
  sub:'Tezlanish bilan harakatlanayotgan vagonda ipga osilgan yuk orqaga og‘adi. Vagondagi kuzatuvchi buni «inersiya kuchi» bilan tushuntiradi, yerdagi kuzatuvchi esa ip yukka tezlanish berayotganini ko‘radi.',
  formula:`<span>tg<i>α</i> = ${fr('<i>a</i>','<i>g</i>')}</span><span class="alt"><b>F</b><sub>in</sub> = −<i>m</i><b>a</b>, &nbsp;<i>T</i> = <i>m</i>√(<i>g</i>² + <i>a</i>²)</span>`,
  text:['Yer bilan bog‘langan (inersial) sanoq sistemasida yukka faqat ikki kuch ta’sir qiladi: og‘irlik va ip tarangligi. Ularning teng ta’sir etuvchisi yukka vagon bilan bir xil tezlanish beradi, shuning uchun ip og‘ma turadi: tgα = a/g.','Vagon bilan bog‘langan (noinersial) sistemada yuk tinch turibdi, lekin unga og‘irlik va taranglikdan tashqari −ma inersiya kuchi ham «ta’sir qiladi». Inersiya kuchi haqiqiy jismlarning ta’siri emas, u faqat sanoq sistemasi tezlanayotgani uchun paydo bo‘ladi.'],
  legend:[['a','vagon tezlanishi, m/s²'],['α','ipning vertikaldan og‘ish burchagi'],['T','ip tarangligi, N'],['F_in','inersiya kuchi, N']],
  tries:['a = 9,8 m/s² qiling: ip 45° ga og‘adi.','Tezlanishni manfiy qiling (tormozlash): yuk oldinga og‘adi.','«Vagon bilan» ko‘rinishiga o‘ting: endi vagon tinch, atrofdagi ustunlar harakatlanadi.'],
  params:[{id:'a',label:'Vagon tezlanishi',sym:'a',min:-8,max:8,step:0.1,val:4,unit:'m/s²',d:1},{id:'m',label:'Yuk massasi',sym:'m',min:0.2,max:3,step:0.1,val:1,unit:'kg',d:1},{id:'fr',label:'Kuzatuvchi',choices:[[0,'Yerda'],[1,'Vagonda']],val:0}],
  init:()=>({x:0,v:0,th:0,w:0,t:0}),
  step(S,P,dt){const g=9.8,L=0.6,n=10,h=dt/n;for(let i=0;i<n;i++){S.v+=P.a*h;if(Math.abs(S.v)>14)S.v=Math.sign(S.v)*14;const aa=Math.abs(S.v)>=14?0:P.a;S.x+=S.v*h;S.w+=(-(g*Math.sin(S.th)+aa*Math.cos(S.th))/L-1.6*S.w)*h;S.th+=S.w*h;}S.t+=dt;S.aeff=Math.abs(S.v)>=14?0:P.a;if(Math.abs(S.v)>=14&&Math.abs(S.w)<0.01&&Math.abs(S.th)<0.01){S.v=0;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const gy=H-50,sc=40,vw=200,vh=120,fr=P.fr|0,span=W+200,cx=fr?W/2:((S.x*sc%span)+span)%span-100,cy=gy-vh/2-14;S.g={gy,cx,cy,vw,vh};
    line(c,0,gy,W,gy,C.ink,2);const off=fr?-S.x*sc:0,PP=120*Math.ceil((W+240)/120);for(let k=0;k<PP/120;k++){const px=((k*120+off)%PP+PP)%PP-120;c.fillStyle=rgba('muted',0.45);c.fillRect(px,gy-90,6,90);disk(c,px+3,gy-94,6,rgba('warm',0.7));}
    c.fillStyle=rgba('accent',0.16);rrect(c,cx-vw/2,cy-vh/2,vw,vh,10);c.fill();c.strokeStyle=C.accent;c.lineWidth=2;rrect(c,cx-vw/2,cy-vh/2,vw,vh,10);c.stroke();[-1,1].forEach(s=>disk(c,cx+s*vw*0.32,gy-8,10,'#3a4252',C.ink));
    const px=cx,py=cy-vh/2+6,L=86,bx=px+L*Math.sin(S.th),by=py+L*Math.cos(S.th),ae=S.aeff??P.a;line(c,px-20,py,px+20,py,C.ink,3);line(c,px,py,bx,by,C.ink,1.6);line(c,px,py,px,py+L+12,rgba('muted',0.5),1,[3,3]);
    disk(c,bx,by,8+P.m*2,C.warm);const k=6;arrow(c,bx,by,bx,by+9.8*k*0.6,C.violet,2.2,'mg');const T=Math.hypot(9.8,ae);arrow(c,bx,by,bx+(px-bx)/L*T*k*0.6,by+(py-by)/L*T*k*0.6,C.green,2.2,'T');
    if(fr&&Math.abs(ae)>0.1)arrow(c,bx,by,bx-ae*k*0.6,by,C.red,2.2,'F_in');if(!fr&&Math.abs(ae)>0.1)arrow(c,bx,by+28,bx+ae*k*0.6,by+28,rgba('green',0.8),1.6,'ma');
    if(Math.abs(ae)>0.05)arrow(c,cx-vw/2+20,cy+vh/2-16,cx-vw/2+20+Math.sign(ae)*40,cy+vh/2-16,C.accent,2.2,'a');
    txt(c,fr?'Sanoq sistemasi: vagon (noinersial)':'Sanoq sistemasi: Yer (inersial)',16,18,C.ink,{font:SMALL});txt(c,'α = '+fmt(-S.th/D2R,1)+'°',px+24,py+16,C.warm,{font:SMALL});},
  read(S,P){const a=S.aeff??P.a,al=Math.atan(a/9.8)/D2R;return[['Muvozanat burchagi α = arctg(a/g)',fmt(al,1)+'°'],['Ipning hozirgi og‘ishi',fmt(-S.th/D2R,1)+'°'],['Ip tarangligi T',fmt(P.m*Math.hypot(9.8,a),2)+' N'],['Inersiya kuchi |F_in|',fmt(P.m*Math.abs(a),2)+' N'],['Vagon tezligi',fmt(Math.abs(S.v),1)+' m/s']];}
});

/* 4. Parashyut */
SIMS.push({id:'parashyut',cat:'din',title:'Parashyut bilan tushish va chegaraviy tezlik',short:'v_ch = √(2mg / ρCS)',
  sub:'Parashyutchi avval erkin tushib, tezligi taxminan 50 m/s ga yetadi. Parashyut ochilgach, qarshilik kuchi keskin ortadi va tezlik bir necha soniyada 5 m/s atrofigacha kamayadi.',
  formula:`<span><i>F</i><sub>q</sub> = ½<i>ρ</i><i>C</i><i>S</i><i>v</i>²</span><span class="alt"><i>v</i><sub>ch</sub> = ${sq(fr('2<i>mg</i>','<i>ρCS</i>'))}</span>`,
  text:['Tushayotgan jismga og‘irlik kuchi mg va havoning qarshilik kuchi ½ρCSv² ta’sir qiladi. Tezlik ortgan sari qarshilik ham ortadi va bir paytda og‘irlikka tenglashadi. Shundan keyin tezlanish nolga teng — jism o‘zgarmas chegaraviy tezlik bilan tushadi.','Parashyut yuzasi S ni o‘nlab marta oshiradi, shuning uchun chegaraviy tezlik bir necha marta kamayadi. Parashyut ochilgan paytda qarshilik og‘irlikdan ancha katta bo‘ladi — parashyutchi bir necha g ga teng tormozlanishni sezadi.'],
  legend:[['m','parashyutchi massasi, kg'],['S','qarshilik yuzasi, m²'],['C','shakl koeffitsiyenti'],['ρ','havo zichligi, kg/m³'],['v_ch','chegaraviy tezlik, m/s']],
  tries:['Massani ikki marta oshiring: chegaraviy tezlik √2 marta ortadi.','Parashyutni pastroqda oching va tormozlanish g ning necha barobari ekanini kuzating.','Parashyut yuzasini 4 marta kamaytiring: qo‘nish tezligi 2 marta ortadi.'],
  params:[{id:'m',label:'Massa (jihozlar bilan)',sym:'m',min:50,max:130,step:1,val:85,unit:'kg',d:0,reset:1},{id:'S',label:'Parashyut yuzasi',sym:'S',min:10,max:60,step:1,val:30,unit:'m²',d:0,reset:1},{id:'ho',label:'Ochilish balandligi',sym:'h',min:300,max:2500,step:50,val:1200,unit:'m',d:0,reset:1},{id:'rho',label:'Havo zichligi',sym:'ρ',min:0.6,max:1.3,step:0.01,val:1.2,unit:'kg/m³',d:2,reset:1}],
  init:()=>({t:0,h:3000,v:0,a:9.8,open:0,op:0,hist:[],gmax:0,done:0,wait:0}),
  step(S,P,dt){if(S.done){S.wait+=dt;if(S.wait>2){Object.assign(S,this.init(P));}return;}const n=40,h=dt*6/n;for(let i=0;i<n;i++){if(!S.open&&S.h<=P.ho)S.open=1;S.op=S.open?Math.min(1,S.op+h/3):0;const A=0.7+(P.S*1.5/1.0-0.7)*S.op,Cd=1.0,F=0.5*P.rho*Cd*A*S.v*S.v,a=9.8-F/P.m;S.v+=a*h;S.h-=S.v*h;S.t+=h;S.a=a;if(S.op>0)S.gmax=Math.max(S.gmax,-a/9.8);if(S.h<=0){S.h=0;S.done=1;break;}}
    if(!S.hist.length||S.t-S.hist[S.hist.length-1][0]>0.5)S.hist.push([S.t,S.v,S.h]);},
  draw(c,W,H,S,P){grid(c,W,H,28);const sx=W*0.2,top=30,bot=H-30,Y=h=>bot-(h/3000)*(bot-top);S.g={sx,top,bot,Y};
    c.fillStyle=rgba('green',0.18);c.fillRect(0,bot,W*0.4,H-bot);line(c,0,bot,W*0.4,bot,C.green,2);for(let h=0;h<=3000;h+=500){line(c,8,Y(h),18,Y(h),C.muted,1);txt(c,h+' m',22,Y(h),C.muted,{font:SMALL});}
    line(c,sx-40,Y(P.ho),sx+40,Y(P.ho),rgba('warm',0.6),1,[4,4]);txt(c,'ochilish',sx+44,Y(P.ho),C.warm,{font:SMALL});
    const y=Y(S.h);if(S.op>0){const r=14+S.op*30;c.fillStyle='rgba(255,120,90,0.85)';c.beginPath();c.ellipse(sx,y-40-S.op*12,r,8+S.op*12,0,Math.PI,0);c.fill();line(c,sx-r,y-40-S.op*12,sx,y-6,C.ink,1);line(c,sx+r,y-40-S.op*12,sx,y-6,C.ink,1);}
    disk(c,sx,y-8,5,C.ink);line(c,sx,y-4,sx,y+8,C.ink,3);line(c,sx-7,y+2,sx+7,y+2,C.ink,2);
    const F=P.m*(9.8-S.a);arrow(c,sx+26,y,sx+26,y+P.m*9.8*0.04,C.violet,2,'mg');arrow(c,sx-26,y,sx-26,y-Math.min(F,P.m*9.8*4)*0.04,C.red,2,'F');
    const gx=W*0.48,gw=W*0.48,gt=40,gh=H-90,vt1=Math.sqrt(2*P.m*9.8/(P.rho*1.0*0.7)),vt2=Math.sqrt(2*P.m*9.8/(P.rho*1.5*P.S)),tm=Math.max(60,S.t*1.15);
    const G=gplot(c,gx,gt,gw,gh,{x1:tm,y1:Math.max(60,vt1*1.15),xt:niceStep(tm,5),yt:10,xl:'t, s',yl:'v, m/s',lines:[[[[0,vt1],[tm,vt1]],rgba('muted',0.7),1,[4,4]],[[[0,vt2],[tm,vt2]],rgba('green',0.8),1,[4,4]],[S.hist.map(p=>[p[0],p[1]]).concat([[S.t,S.v]]),C.accent,2.4]],marks:[[S.t,S.v,C.warm]]});
    txt(c,'v_ch = '+fmt(vt1,0)+' m/s',G.X(tm)-4,G.Y(vt1)-8,C.muted,{align:'right',font:SMALL});txt(c,'v_ch = '+fmt(vt2,1)+' m/s',G.X(tm)-4,G.Y(vt2)-8,C.green,{align:'right',font:SMALL});},
  read(S,P){const vt2=Math.sqrt(2*P.m*9.8/(P.rho*1.5*P.S));return[['Balandlik',fmt(S.h,0)+' m'],['Tezlik',fmt(S.v,1)+' m/s'],['Tezlanish',fmt(S.a,1)+' m/s²'],['Chegaraviy tezlik (parashyut bilan)',fmt(vt2,2)+' m/s'],['Eng katta tormozlanish',fmt(S.gmax,1)+' g'],['Vaqt',fmt(S.t,0)+' s']];}
});

/* 5. Qiya yo‘ldagi burilish */
SIMS.push({id:'burilish',cat:'din',title:'Burilishda avtomobil: qiyalatilgan yo‘l',short:'tgα = v²/(gR)',
  sub:'Burilishda yo‘l ichkariga qiyalatiladi: shunda tayanch reaksiyasining gorizontal tashkil etuvchisi markazga intilma kuchni beradi va avtomobil ishqalanishsiz ham burila oladi.',
  formula:`<span><i>v</i><sub>ideal</sub> = ${sq('<i>gR</i> tg<i>α</i>')}</span><span class="alt"><i>v</i><sub>max</sub> = ${sq('<i>gR</i>'+fr('sin<i>α</i> + <i>μ</i>cos<i>α</i>','cos<i>α</i> − <i>μ</i>sin<i>α</i>'))}</span>`,
  text:['Avtomobil R radiusli aylana bo‘ylab harakatlanishi uchun unga markazga yo‘nalgan mv²/R kuch kerak. Tekis yo‘lda bu kuchni faqat g‘ildiraklarning ishqalanishi beradi. Yo‘l α burchakka qiyalatilsa, tayanch reaksiya kuchi N ham markaz tomon og‘adi.','Agar v = √(gR·tgα) bo‘lsa, ishqalanish umuman kerak emas. Tezroq yurilsa, ishqalanish pastga (ichkariga), sekinroq yurilsa yuqoriga yo‘naladi. Ishqalanish yetmay qolganda avtomobil tashqariga sirpanib chiqadi yoki ichkariga sirg‘alib tushadi.'],
  legend:[['α','yo‘l qiyaligi'],['R','burilish radiusi, m'],['μ','ishqalanish koeffitsiyenti'],['N','tayanch reaksiya kuchi'],['F_ishq','ishqalanish kuchi']],
  tries:['μ = 0 qiling va tezlikni ideal tezlikka tenglang: avtomobil baribir buriladi.','Muzli yo‘l (μ = 0,1) da tezlikni oshiring: avtomobil qaysi tezlikda sirpanib chiqadi?','α = 0 qiling: endi burilish faqat ishqalanish hisobiga.'],
  params:[{id:'v',label:'Tezlik',sym:'v',min:0,max:50,step:0.5,val:20,unit:'m/s',d:1},{id:'al',label:'Yo‘l qiyaligi',sym:'α',min:0,max:40,step:1,val:15,unit:'°',d:0},{id:'R',label:'Burilish radiusi',sym:'R',min:20,max:200,step:5,val:100,unit:'m',d:0},{id:'mu',label:'Ishqalanish koeffitsiyenti',sym:'μ',min:0,max:1,step:0.05,val:0.5,unit:'',d:2}],
  calc(P){const g=9.8,a=P.al*D2R,ac=P.v*P.v/P.R,N=g*Math.cos(a)+ac*Math.sin(a),f=ac*Math.cos(a)-g*Math.sin(a),vid=Math.sqrt(g*P.R*Math.tan(a)),den=Math.cos(a)-P.mu*Math.sin(a),vmax=den>0?Math.sqrt(g*P.R*(Math.sin(a)+P.mu*Math.cos(a))/den):Infinity,vmn=(Math.sin(a)-P.mu*Math.cos(a))/(Math.cos(a)+P.mu*Math.sin(a)),vmin=vmn>0?Math.sqrt(g*P.R*vmn):0;
    return{N,f,vid,vmax,vmin,ok:Math.abs(f)<=P.mu*N+1e-9,out:f>P.mu*N};},
  init:()=>({ph:0,dr:0}),
  step(S,P,dt){const q=this.calc(P);S.ph+=P.v/P.R*dt;if(!q.ok)S.dr=Math.min(1,S.dr+dt*0.6);else S.dr=Math.max(0,S.dr-dt*0.8);},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),a=P.al*D2R,cx=W*0.3,cy=H*0.62,L=W*0.24;S.g={cx,cy,L};
    /* kesim */
    const x1=cx-L,y1=cy+Math.tan(a)*0+L*Math.sin(a)*0,ux=Math.cos(a),uy=-Math.sin(a);c.fillStyle=rgba('muted',0.25);c.beginPath();c.moveTo(cx-L*ux,cy-L*uy);c.lineTo(cx+L*ux,cy+L*uy);c.lineTo(cx+L*ux,cy+60);c.lineTo(cx-L*ux,cy+60);c.closePath();c.fill();line(c,cx-L*ux,cy-L*uy,cx+L*ux,cy+L*uy,C.ink,2.5);
    const sl=S.dr*(q.out?1:-1)*L*0.5,bx=cx+ux*sl,by=cy+uy*sl;c.save();c.translate(bx,by);c.rotate(-a);c.fillStyle=C.accent;rrect(c,-34,-40,68,30,6);c.fill();c.fillStyle='#1d2433';c.fillRect(-30,-12,14,12);c.fillRect(16,-12,14,12);c.restore();
    const mx=bx-Math.sin(a)*26,my=by-Math.cos(a)*26,k=7;arrow(c,mx,my,mx,my+9.8*k,C.violet,2.2,'mg');arrow(c,mx,my,mx-Math.sin(a)*q.N*k,my-Math.cos(a)*q.N*k,C.green,2.2,'N');
    const fv=clamp(q.f,-P.mu*q.N,P.mu*q.N);if(Math.abs(fv)>0.05)arrow(c,bx,by,bx-ux*fv*k,by-uy*fv*k,C.red,2.2,'F_ishq');
    const ac=Math.min(P.v*P.v/P.R,25);arrow(c,mx,my,mx-ac*k,my,C.warm,2.4,'ma');txt(c,'← markaz',cx-L-10,cy+80,C.muted,{font:SMALL});
    /* ustdan ko‘rinish */
    const tx=W*0.76,ty=H*0.38,tr=Math.min(W*0.18,H*0.28);c.strokeStyle=rgba('muted',0.6);c.lineWidth=18;c.beginPath();c.arc(tx,ty,tr,0,TAU);c.stroke();disk(c,tx,ty,3,C.muted);
    const rr=tr*(1+S.dr*(q.out?0.35:-0.35)),px=tx+rr*Math.cos(S.ph),py=ty+rr*Math.sin(S.ph);c.save();c.translate(px,py);c.rotate(S.ph+Math.PI/2);c.fillStyle=C.accent;rrect(c,-6,-10,12,20,3);c.fill();c.restore();
    txt(c,q.ok?'Avtomobil xavfsiz buriladi':q.out?'Sirpanib tashqariga chiqadi!':'Ichkariga sirg‘alib tushadi!',tx,ty+tr+34,q.ok?C.green:C.red,{align:'center',font:MONO});},
  read(S,P){const q=this.calc(P);return[['Ideal tezlik √(gR·tgα)',fmt(q.vid,1)+' m/s'],['Ruxsat etilgan oraliq',fmt(q.vmin,1)+' … '+(isFinite(q.vmax)?fmt(q.vmax,1):'∞')+' m/s'],['Kerakli ishqalanish (1 kg ga)',fmt(q.f,2)+' N'],['Ishqalanish chegarasi μN',fmt(P.mu*q.N,2)+' N'],['Holat',q.ok?'xavfsiz':'sirpanish']];}
});

/* 6. Ag‘darilish yoki sirpanish */
SIMS.push({id:'agdarilish',cat:'sta',title:'Qiya tekislikda: sirpanadimi yoki ag‘dariladimi?',short:'tgα > b/h — ag‘dariladi',
  sub:'Qiya tekislikdagi quti ikki xil yo‘l bilan muvozanatni yo‘qotadi: ishqalanish yetmasa sirpanadi, og‘irlik markazidan o‘tgan vertikal tayanch qirradan chiqib ketsa ag‘dariladi.',
  formula:`<span>sirpanish: tg<i>α</i> > <i>μ</i></span><span class="alt">ag‘darilish: tg<i>α</i> > ${fr('<i>b</i>','<i>h</i>')}</span>`,
  text:['Jism ag‘darilmasligi uchun og‘irlik kuchining ta’sir chizig‘i (og‘irlik markazidan tushirilgan vertikal) tayanch yuzasidan o‘tishi kerak. Qiyalik ortganda bu chiziq pastki qirraga yaqinlashadi va tgα = b/h bo‘lganda undan chiqib ketadi.','Sirpanish esa og‘irlikning qiyalik bo‘ylab tashkil etuvchisi mg·sinα eng katta tinchlikdagi ishqalanish μmg·cosα dan oshganda boshlanadi: tgα > μ. Qaysi shart oldin bajarilsa, shu hodisa ro‘y beradi. Baland va tor jismlar ag‘darilishga moyil.'],
  legend:[['α','qiyalik burchagi'],['b','quti asosining eni, m'],['h','quti balandligi, m'],['μ','ishqalanish koeffitsiyenti']],
  tries:['b = 0,3, h = 1 qiling: quti 17° da ag‘dariladi.','μ = 0,2 qiling: endi quti 11° da sirpana boshlaydi.','Burchakni sekin oshiring va qaysi hodisa birinchi bo‘lishini oldindan ayting.'],
  params:[{id:'al',label:'Qiyalik burchagi',sym:'α',min:0,max:60,step:0.5,val:20,unit:'°',d:1,reset:1},{id:'b',label:'Asos eni',sym:'b',min:0.2,max:1.2,step:0.05,val:0.4,unit:'m',d:2,reset:1},{id:'h',label:'Balandlik',sym:'h',min:0.2,max:1.4,step:0.05,val:1,unit:'m',d:2,reset:1},{id:'mu',label:'Ishqalanish koeffitsiyenti',sym:'μ',min:0.05,max:1.2,step:0.05,val:0.6,unit:'',d:2,reset:1}],
  init:()=>({phi:0,w:0,s:0,v:0,t:0,wait:0}),
  mode(P){const a=P.al*D2R,tip=Math.tan(a)>P.b/P.h,sl=Math.tan(a)>P.mu;return tip?'tip':sl?'slide':'rest';},
  geo(P,phi,sc){const a=P.al*D2R,th=-a-phi,R=(lx,ly)=>[lx*Math.cos(th)-ly*Math.sin(th),lx*Math.sin(th)+ly*Math.cos(th)];return{th,R};},
  step(S,P,dt){const md=this.mode(P),a=P.al*D2R,g=9.8;S.t+=dt;
    if(md==='tip'){const I=(P.b*P.b+P.h*P.h)/3;if(S.phi<Math.PI/2){const n=10,h=dt/n;for(let i=0;i<n;i++){const G=this.geo(P,S.phi).R(P.b/2,-P.h/2);S.w+=g*(-G[0])/I*h;S.phi+=S.w*h;}if(S.phi>=Math.PI/2){S.phi=Math.PI/2;S.w=0;}}else S.wait+=dt;}
    else if(md==='slide'){S.v+=g*(Math.sin(a)-P.mu*Math.cos(a))*dt;S.s+=S.v*dt;if(S.s>2.2)S.wait+=dt;}
    if(S.wait>1.2)Object.assign(S,this.init(P));},
  draw(c,W,H,S,P){grid(c,W,H,28);const a=P.al*D2R,sc=Math.min(W,H)*0.26,px=W*0.66,py=H*0.42,ux=-Math.cos(a),uy=Math.sin(a);S.g={px,py,sc};
    c.fillStyle=rgba('muted',0.25);c.beginPath();c.moveTo(px+Math.cos(a)*sc*0.8,py-Math.sin(a)*sc*0.8);c.lineTo(px+ux*sc*3,py+uy*sc*3);c.lineTo(px+Math.cos(a)*sc*0.8,py+uy*sc*3);c.closePath();c.fill();line(c,px+Math.cos(a)*sc*0.8,py-Math.sin(a)*sc*0.8,px+ux*sc*3,py+uy*sc*3,C.ink,2.5);
    const qx=px+ux*S.s*sc,qy=py+uy*S.s*sc,b=P.b*sc,h=P.h*sc,md=this.mode(P),gm=this.geo(P,S.phi);S.g.qx=qx;S.g.qy=qy;S.g.th=gm.th;
    c.save();c.translate(qx,qy);c.rotate(gm.th);
    c.fillStyle=md==='tip'?rgba('red',0.35):md==='slide'?rgba('warm',0.35):rgba('accent',0.35);c.strokeStyle=C.ink;c.lineWidth=2;c.fillRect(0,-h,b,h);c.strokeRect(0,-h,b,h);c.restore();
    const G=gm.R(b/2,-h/2),gx=qx+G[0],gyy=qy+G[1];
    disk(c,gx,gyy,5,C.warm);line(c,gx,gyy,gx,gyy+h*1.2,rgba('warm',0.8),1.4,[5,4]);arrow(c,gx,gyy,gx,gyy+50,C.violet,2.2,'mg');disk(c,qx,qy,4,C.red);txt(c,'tayanch qirra',qx-8,qy+16,C.red,{align:'right',font:SMALL});
    const tA=Math.atan(P.b/P.h)/D2R,sA=Math.atan(P.mu)/D2R;txt(c,'Ag‘darilish burchagi: '+fmt(tA,1)+'°',16,20,md==='tip'?C.red:C.muted,{font:SMALL});txt(c,'Sirpanish burchagi: '+fmt(sA,1)+'°',16,36,md==='slide'?C.warm:C.muted,{font:SMALL});
    txt(c,md==='tip'?'Quti ag‘darilmoqda':md==='slide'?'Quti sirpanmoqda':'Quti muvozanatda',16,58,md==='rest'?C.green:C.ink,{font:MONO});},
  read(S,P){const md=this.mode(P);return[['Ag‘darilish sharti arctg(b/h)',fmt(Math.atan(P.b/P.h)/D2R,1)+'°'],['Sirpanish sharti arctg μ',fmt(Math.atan(P.mu)/D2R,1)+'°'],['tg α',fmt(Math.tan(P.al*D2R),3)],['Holat',md==='tip'?'ag‘dariladi':md==='slide'?'sirpanadi':'muvozanat']];}
});

/* 7. Minorali kran muvozanati */
SIMS.push({id:'kran',cat:'sta',title:'Minorali kranning turg‘unligi',short:'ΣM = 0',
  sub:'Kran yukni uzoqroqqa olib borgani sari old tayanchga bosim ortadi, orqa tayanchga bosim kamayadi. Orqa tayanch reaksiyasi nolga tushsa, kran ag‘dariladi. Qarshi yuk shuni oldini oladi.',
  formula:`<span>Σ<i>M</i> = 0: &nbsp;<i>N</i>₂<i>w</i> − <i>N</i>₁<i>w</i> = (<i>mx</i> − <i>Md</i>)<i>g</i></span><span class="alt"><i>N</i>₁ + <i>N</i>₂ = (<i>m</i> + <i>M</i> + <i>m</i><sub>k</sub>)<i>g</i></span>`,
  text:['Kran muvozanatda turishi uchun barcha kuchlar yig‘indisi va istalgan nuqtaga nisbatan kuch momentlari yig‘indisi nolga teng bo‘lishi kerak. Yuk va qarshi yuk momentlari minoraga nisbatan qarama-qarshi yo‘nalgan.','Ikkala tayanch reaksiyasi N₁ va N₂ ham musbat bo‘lishi kerak — tayanch faqat itaradi, tortmaydi. Yuk juda uzoqda bo‘lsa, orqa tayanch reaksiyasi manfiy chiqadi, ya’ni kran old qirra atrofida ag‘dariladi. Yuksiz kranda esa qarshi yuk uni orqaga ag‘darmasligi kerak.'],
  legend:[['m','yuk massasi, t'],['x','yukning minoradan uzoqligi, m'],['M','qarshi yuk massasi, t'],['d','qarshi yukning uzoqligi, m'],['N₁, N₂','orqa va old tayanch reaksiyalari']],
  tries:['Yukni eng uchiga olib boring: qaysi massada kran ag‘dariladi?','Yuk massasini nolga tushiring va qarshi yukni oshiring: kran orqaga ag‘darilishi mumkin.','Kran turg‘un ishlashi uchun qarshi yukning eng yaxshi qiymatini toping.'],
  params:[{id:'m',label:'Yuk massasi',sym:'m',min:0,max:8,step:0.1,val:3,unit:'t',d:1},{id:'x',label:'Yuk uzoqligi',sym:'x',min:4,max:30,step:0.5,val:18,unit:'m',d:1},{id:'M',label:'Qarshi yuk',sym:'M',min:0,max:20,step:0.5,val:10,unit:'t',d:1},{id:'d',label:'Qarshi yuk uzoqligi',sym:'d',min:3,max:8,step:0.5,val:6,unit:'m',d:1}],
  calc(P){const mk=12,w=2.5,tot=(P.m+P.M+mk)*9.8,mom=(P.m*P.x-P.M*P.d)*9.8,N2=tot/2+mom/(2*w),N1=tot/2-mom/(2*w);return{N1,N2,mk,w,tip:N1<0?1:N2<0?-1:0};},
  init:()=>({ang:0,tx:18}),
  step(S,P,dt){const q=this.calc(P);const tgt=q.tip*14*D2R;S.ang+=(tgt-S.ang)*Math.min(1,dt*2.5);S.tx+=(P.x-S.tx)*Math.min(1,dt*3);},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),gy=H-40,sc=Math.min((W-80)/42,(gy-40)/30),bx=40+sc*12,X=x=>x*sc,Y=y=>-y*sc;S.g={gy,sc,bx};
    line(c,0,gy,W,gy,C.ink,2);const pv=q.tip>0?q.w:q.tip<0?-q.w:0;c.save();c.translate(bx+X(pv),gy);c.rotate(S.ang);c.translate(-X(pv),0);
    c.fillStyle=rgba('muted',0.5);c.fillRect(X(-q.w),-10,X(2*q.w),10);c.strokeStyle=C.ink;c.lineWidth=2;
    const th=24;for(let k=0;k<th;k+=2){line(c,X(-0.6),Y(k),X(0.6),Y(k+2),C.warm,1.2);line(c,X(0.6),Y(k),X(-0.6),Y(k+2),C.warm,1.2);}line(c,X(-0.6),0,X(-0.6),Y(th),C.warm,2.5);line(c,X(0.6),0,X(0.6),Y(th),C.warm,2.5);
    line(c,X(-P.d-1.2),Y(th),X(30.5),Y(th),C.warm,4);line(c,X(0),Y(th+4),X(30.5),Y(th),C.warm,1.2);line(c,X(0),Y(th+4),X(-P.d),Y(th),C.warm,1.2);line(c,X(0),Y(th),X(0),Y(th+4),C.warm,3);
    const cw=Math.max(0.6,Math.sqrt(P.M)*0.7);c.fillStyle='#5a6378';c.fillRect(X(-P.d)-cw*sc/2,Y(th)-2,cw*sc,cw*sc*1.3);txt(c,fmt(P.M,1)+' t',X(-P.d),Y(th)+cw*sc*0.65+4,C.ink,{align:'center',font:SMALL});
    const tx=X(S.tx);c.fillStyle=C.ink;c.fillRect(tx-8,Y(th)-3,16,6);const ly=Y(th-11);line(c,tx,Y(th),tx,ly,C.ink,1);if(P.m>0){const s=Math.max(0.6,Math.sqrt(P.m)*0.8)*sc;c.fillStyle=C.accent;c.fillRect(tx-s/2,ly,s,s);txt(c,fmt(P.m,1)+' t',tx,ly+s+10,C.accent,{align:'center',font:SMALL});}
    c.restore();
    const k=0.25;[[-q.w,q.N1,'N₁'],[q.w,q.N2,'N₂']].forEach(([x,N,l])=>{const px=bx+X(x);if(N>0)arrow(c,px,gy+28,px,gy+28-N*k,C.green,2.4,l);else txt(c,l+' = 0',px,gy+16,C.red,{align:'center',font:SMALL});});
    txt(c,q.tip>0?'Kran oldinga ag‘darilmoqda!':q.tip<0?'Kran orqaga ag‘darilmoqda!':'Kran turg‘un',W-16,20,q.tip?C.red:C.green,{align:'right',font:MONO});},
  read(S,P){const q=this.calc(P);return[['Yuk momenti mgx',fmt(P.m*9.8*P.x,0)+' kN·m'],['Qarshi yuk momenti Mgd',fmt(P.M*9.8*P.d,0)+' kN·m'],['Orqa tayanch N₁',fmt(q.N1,0)+' kN'],['Old tayanch N₂',fmt(q.N2,0)+' kN'],['Holat',q.tip?'ag‘dariladi':'turg‘un']];}
});

/* 8. Impuls momentining saqlanishi */
SIMS.push({id:'impulsmoment',cat:'saq',title:'Impuls momentining saqlanishi',short:'L = Iω = const',
  sub:'Aylanayotgan kursida o‘tirgan odam qo‘llaridagi gantellarni o‘ziga yaqinlashtirsa, tezroq aylana boshlaydi. Tashqi kuch momenti bo‘lmaganda impuls momenti L = Iω saqlanadi.',
  formula:`<span><i>L</i> = <i>Iω</i> = const</span><span class="alt"><i>I</i> = <i>I</i>₀ + 2<i>mr</i>², &nbsp;<i>E</i> = ${fr('<i>L</i>²','2<i>I</i>')}</span>`,
  text:['Inersiya momenti I massaning aylanish o‘qiga nisbatan qanday taqsimlanganini bildiradi: massa o‘qdan uzoqlashsa, I ortadi. Tashqi kuch momenti nolga teng bo‘lsa, impuls momenti L = Iω o‘zgarmaydi, shuning uchun I kamaysa ω ortadi.','Figurachi uchuvchilar, sakrovchilar va yulduzlarning qisqarishi shu qonunga bo‘ysunadi. Qiziq tomoni: qo‘llarni yaqinlashtirganda aylanish energiyasi L²/2I ortadi — bu energiyani odam muskullari gantellarni markazga tortib bajargan ish beradi.'],
  legend:[['L','impuls momenti, kg·m²/s'],['I','inersiya momenti, kg·m²'],['ω','burchak tezlik, rad/s'],['m','har bir gantel massasi, kg'],['r','gantelning o‘qdan uzoqligi, m']],
  tries:['r ni 0,8 m dan 0,2 m ga kamaytiring: burchak tezlik necha marta ortadi?','Gantel massasini oshiring va qayta sinang: effekt kuchayadi.','Aylanish energiyasining o‘zgarishini kuzating: u saqlanmaydi, impuls momenti esa saqlanadi.'],
  params:[{id:'r',label:'Gantellar uzoqligi',sym:'r',min:0.15,max:0.9,step:0.01,val:0.8,unit:'m',d:2},{id:'m',label:'Gantel massasi',sym:'m',min:0.5,max:6,step:0.5,val:3,unit:'kg',d:1,reset:1},{id:'w0',label:'Boshlang‘ich burchak tezlik',sym:'ω₀',min:0.5,max:4,step:0.1,val:1.5,unit:'rad/s',d:1,reset:1}],
  I(P,r){return 1.6+2*P.m*r*r;},
  init(P){return{ph:0,L:this.I(P,0.8)*P.w0,r:P.r,hist:[]};},
  step(S,P,dt){S.r+=(P.r-S.r)*Math.min(1,dt*4);const w=S.L/this.I(P,S.r);S.ph+=w*dt;S.w=w;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.36,cy=H*0.5,sc=Math.min(W,H)*0.42,w=S.L/this.I(P,S.r);S.g={cx,cy,sc};
    c.fillStyle=rgba('muted',0.18);c.beginPath();c.arc(cx,cy,sc*0.32,0,TAU);c.fill();c.strokeStyle=rgba('muted',0.5);c.lineWidth=1.5;c.stroke();
    for(let k=0;k<6;k++){const a=S.ph+k*TAU/6;line(c,cx+Math.cos(a)*sc*0.1,cy+Math.sin(a)*sc*0.1,cx+Math.cos(a)*sc*0.3,cy+Math.sin(a)*sc*0.3,rgba('muted',0.4),1);}
    disk(c,cx,cy,sc*0.11,'#3a4c78',C.ink);const ax=Math.cos(S.ph),ay=Math.sin(S.ph),r=S.r*sc;
    [-1,1].forEach(s=>{const ex=cx+s*ax*r,ey=cy+s*ay*r;line(c,cx+s*ax*sc*0.08,cy+s*ay*sc*0.08,ex,ey,'#d9c7a8',6);disk(c,ex,ey,6+P.m*1.4,C.warm,C.ink);});
    disk(c,cx,cy,sc*0.06,'#e6d2b5');
    const gx=W*0.66,gw=W*0.3,bh=H*0.55,gy=H*0.78,vals=[['I',this.I(P,S.r),this.I(P,0.9),C.accent],['ω',w,S.L/this.I(P,0.15),C.green],['L',S.L,S.L*1.2,C.violet],['E',S.L*w/2,S.L*S.L/(2*this.I(P,0.15)),C.warm]];
    vals.forEach(([n,v,mx,col],i)=>{const x=gx+i*gw/4+8,h=Math.min(1,v/mx)*bh;c.fillStyle=col;c.fillRect(x,gy-h,gw/4-18,h);txt(c,n,x+(gw/4-18)/2,gy+14,C.ink,{align:'center',font:MATH});txt(c,fmt(v,1),x+(gw/4-18)/2,gy-h-10,col,{align:'center',font:SMALL});});
    line(c,gx,gy,gx+gw,gy,C.ink,1.5);},
  read(S,P){const I=this.I(P,S.r),w=S.L/I;return[['Inersiya momenti I',fmt(I,2)+' kg·m²'],['Burchak tezlik ω',fmt(w,2)+' rad/s'],['Aylanish chastotasi',fmt(w/TAU*60,1)+' ayl/min'],['Impuls momenti L',fmt(S.L,2)+' kg·m²/s'],['Aylanish energiyasi',fmt(S.L*w/2,1)+' J']];}
});

/* 9. Tormozlanish yo‘li */
SIMS.push({id:'tormoz',cat:'saq',title:'Avtomobilning to‘xtash yo‘li',short:'s = vt_r + v²/(2μg)',
  sub:'Haydovchi xavfni ko‘rgach, avval reaksiya vaqti davomida avtomobil tezligini o‘zgartirmay yuradi, keyin tormozlanadi. Tormozlanish yo‘li tezlik kvadratiga proporsional: tezlik 2 marta ortsa, u 4 marta uzayadi.',
  formula:`<span><i>s</i> = <i>vt</i><sub>r</sub> + ${fr('<i>v</i>²','2<i>μg</i>')}</span><span class="alt"><i>μmgs</i><sub>t</sub> = ${fr('<i>mv</i>²','2')}</span>`,
  text:['Tormozlanishda avtomobilning kinetik energiyasi ishqalanish kuchining ishi hisobiga issiqlikka aylanadi: μmg·s = mv²/2. Bundan tormozlanish yo‘li s = v²/(2μg) — u massaga bog‘liq emas, lekin yo‘l qoplamasiga (μ) kuchli bog‘liq.','To‘liq to‘xtash yo‘li reaksiya yo‘lini ham o‘z ichiga oladi: haydovchi xavfni ko‘rib tormozni bosguncha (odatda 0,7–1,5 s) avtomobil o‘zgarmas tezlikda yuradi. Charchoq, telefon va alkogol reaksiya vaqtini bir necha marta oshiradi.'],
  legend:[['v','boshlang‘ich tezlik, km/soat'],['t_r','reaksiya vaqti, s'],['μ','g‘ildirak va yo‘l orasidagi ishqalanish koeffitsiyenti'],['s','to‘xtash yo‘li, m']],
  tries:['Tezlikni 60 dan 120 km/soat ga oshiring: tormozlanish yo‘li 4 marta uzayadi.','Muzli yo‘lni tanlang: 60 km/soat da ham to‘xtash yo‘li 100 m dan oshadi.','Reaksiya vaqtini 2,5 s qiling (telefonga qarash): yo‘l qanchaga uzayadi?'],
  params:[{id:'v',label:'Tezlik',sym:'v',min:20,max:150,step:5,val:60,unit:'km/soat',d:0,reset:1},{id:'tr',label:'Reaksiya vaqti',sym:'t_r',min:0.3,max:3,step:0.1,val:1,unit:'s',d:1,reset:1},{id:'yo',label:'Yo‘l qoplamasi',choices:[[0,'Quruq asfalt'],[1,'Ho‘l asfalt'],[2,'Qor'],[3,'Muz']],val:0,reset:1}],
  MU:[0.7,0.4,0.2,0.08],
  init:()=>({t:0,x:0,v:0,ph:0,wait:0,started:0}),
  step(S,P,dt){const v0=P.v/3.6,mu=this.MU[P.yo|0];if(!S.started){S.started=1;S.v=v0;}S.t+=dt;
    if(S.t<0.8){S.x+=S.v*dt;return;}const tt=S.t-0.8;if(tt<P.tr){S.x+=S.v*dt;S.ph=1;}else if(S.v>0){S.ph=2;S.v=Math.max(0,S.v-mu*9.8*dt);S.x+=S.v*dt;}else{S.ph=3;S.wait+=dt;if(S.wait>2)Object.assign(S,this.init(P));}},
  draw(c,W,H,S,P){grid(c,W,H,28);const v0=P.v/3.6,mu=this.MU[P.yo|0],sr=v0*P.tr,sb=v0*v0/(2*mu*9.8),x0=v0*0.8,tot=x0+sr+sb,ry=H*0.42,sc=(W-90)/Math.max(tot*1.08,40),X=x=>40+x*sc;S.g={ry,sc};
    c.fillStyle=['#2b3242','#26364a','#d9e2ee','#bfe3ff'][P.yo|0];c.globalAlpha=P.yo>=2?0.35:1;c.fillRect(0,ry,W,46);c.globalAlpha=1;for(let x=0;x<W;x+=40)line(c,x,ry+23,x+20,ry+23,rgba('ink',0.5),2);
    c.fillStyle=rgba('warm',0.25);c.fillRect(X(x0),ry+48,sr*sc,10);c.fillStyle=rgba('red',0.3);c.fillRect(X(x0+sr),ry+48,sb*sc,10);
    txt(c,'reaksiya: '+fmt(sr,1)+' m',X(x0)+sr*sc/2,ry+72,C.warm,{align:'center',font:SMALL});txt(c,'tormozlanish: '+fmt(sb,1)+' m',X(x0+sr)+sb*sc/2,ry+88,C.red,{align:'center',font:SMALL});
    line(c,X(x0),ry-60,X(x0),ry+60,rgba('warm',0.8),1.5,[4,4]);txt(c,'xavf!',X(x0),ry-68,C.warm,{align:'center',font:SMALL});
    const cx=X(S.x);c.fillStyle=C.accent;rrect(c,cx-46,ry-24,46,18,5);c.fill();c.fillStyle='rgba(160,200,255,0.7)';c.fillRect(cx-36,ry-34,22,11);disk(c,cx-36,ry-4,6,'#11151f',C.ink);disk(c,cx-10,ry-4,6,'#11151f',C.ink);
    if(S.ph===2)disk(c,cx+2,ry-18,4,C.red);if(S.ph>=2&&S.ph<3){for(let k=0;k<3;k++)line(c,cx-50-k*6,ry-2,cx-60-k*14,ry-2,rgba('muted',0.5),1);}
    const gx=40,gy=ry+110,gw=W-90,gh=H-gy-26;if(gh>40){const tmax=0.8+P.tr+v0/(mu*9.8);gplot(c,gx,gy,gw,gh,{x1:tmax*1.05,y1:P.v*1.1,xt:niceStep(tmax,6),yt:niceStep(P.v,3),xl:'t, s',yl:'v, km/soat',lines:[[[[0,P.v],[0.8+P.tr,P.v],[tmax,0]],rgba('muted',0.8),1.5,[4,4]],[[[0,P.v],[Math.min(S.t,0.8+P.tr),P.v]].concat(S.t>0.8+P.tr?[[S.t,S.v*3.6]]:[]),C.accent,2.4]],marks:[[S.t,S.v*3.6,C.warm]]});}},
  read(S,P){const v0=P.v/3.6,mu=this.MU[P.yo|0],sr=v0*P.tr,sb=v0*v0/(2*mu*9.8);return[['Ishqalanish koeffitsiyenti μ',fmt(mu,2)],['Reaksiya yo‘li',fmt(sr,1)+' m'],['Tormozlanish yo‘li',fmt(sb,1)+' m'],['To‘xtash yo‘li',fmt(sr+sb,1)+' m'],['Tormozlanish',fmt(mu*9.8,1)+' m/s²'],['Hozirgi tezlik',fmt(S.v*3.6,0)+' km/soat']];}
});

/* 10. Fizik mayatnik */
SIMS.push({id:'fizmayatnik',cat:'teb',title:'Fizik mayatnik',short:'T = 2π√(I/(mgd))',
  sub:'O‘qqa osilgan har qanday qattiq jism fizik mayatnik bo‘ladi. Uning davri inersiya momenti va osilish nuqtasidan og‘irlik markazigacha masofaga bog‘liq. Yonida bir xil davrli matematik mayatnik tebranadi.',
  formula:`<span><i>T</i> = 2π${sq(fr('<i>I</i>','<i>mgd</i>'))}</span><span class="alt"><i>I</i> = ${fr('<i>mL</i>²','12')} + <i>md</i>², &nbsp;<i>l</i><sub>kel</sub> = ${fr('<i>I</i>','<i>md</i>')}</span>`,
  text:['Sterjen osilish nuqtasi atrofida aylanadi. Og‘irlik kuchi momenti −mgd·sinθ uni muvozanatga qaytaradi, inersiya momenti esa harakatga «qarshilik» qiladi. Kichik burchaklarda davr T = 2π√(I/(mgd)).','Shteyner teoremasi: I = I₀ + md², bu yerda I₀ = mL²/12 — markazga nisbatan inersiya momenti. Keltirilgan uzunlik l = I/(md) — xuddi shu davrli matematik mayatnik uzunligi. d = L/√12 bo‘lganda davr eng kichik bo‘ladi.'],
  legend:[['L','sterjen uzunligi, m'],['d','osilish nuqtasidan og‘irlik markazigacha masofa, m'],['I','osilish o‘qiga nisbatan inersiya momenti'],['l_kel','keltirilgan uzunlik, m']],
  tries:['d ni L/2 qiling (uchidan osilgan): l_kel = 2L/3.','d ni kamaytirib boring: davr avval kamayadi, keyin keskin ortadi. Eng kichik davr d ≈ 0,29L da.','Ikkala mayatnik bir xil tebranishini tekshiring.'],
  params:[{id:'L',label:'Sterjen uzunligi',sym:'L',min:0.3,max:1.5,step:0.05,val:1,unit:'m',d:2,reset:1},{id:'d',label:'Osilish nuqtasi masofasi',sym:'d',min:0.02,max:0.75,step:0.01,val:0.5,unit:'m',d:2,reset:1},{id:'th0',label:'Boshlang‘ich burchak',sym:'θ₀',min:5,max:60,step:1,val:20,unit:'°',d:0,reset:1}],
  dd(P){return Math.min(P.d,P.L/2);},
  init(P){return{th:P.th0*D2R,w:0,th2:P.th0*D2R,w2:0,t:0};},
  step(S,P,dt){const g=9.8,d=this.dd(P),I=P.L*P.L/12+d*d,lk=I/d,n=12,h=dt/n;for(let i=0;i<n;i++){S.w+=-(g*d/I)*Math.sin(S.th)*h;S.th+=S.w*h;S.w2+=-(g/lk)*Math.sin(S.th2)*h;S.th2+=S.w2*h;}S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const d=this.dd(P),I=P.L*P.L/12+d*d,lk=I/d,sc=(H-70)/Math.max(P.L/2+d,lk,0.6)/1.05,px=W*0.32,py=34;S.g={px,py,sc};
    c.fillStyle=rgba('muted',0.3);c.fillRect(px-60,py-12,W*0.5,10);line(c,px-60,py-2,px+W*0.5-60,py-2,C.ink,2);
    c.save();c.translate(px,py);c.rotate(-S.th);const top=-(P.L/2-d)*sc,bot=(P.L/2+d)*sc;c.fillStyle=C.accent;rrect(c,-7,top,14,bot-top,6);c.fill();c.strokeStyle=C.ink;c.lineWidth=1;c.stroke();disk(c,0,0,5,C.ink);disk(c,0,d*sc,5,C.warm);c.restore();
    line(c,px,py,px,py+bot+10,rgba('muted',0.4),1,[3,4]);
    const qx=px+W*0.3,bx=qx+lk*sc*Math.sin(S.th2),by=py+lk*sc*Math.cos(S.th2);line(c,qx,py,bx,by,C.ink,1.4);disk(c,bx,by,9,C.green);disk(c,qx,py,3,C.ink);
    txt(c,'fizik',px,H-14,C.accent,{align:'center',font:SMALL});txt(c,'matematik, l = '+fmt(lk,2)+' m',qx,H-14,C.green,{align:'center',font:SMALL});
    const gx=W-150,gy=40,gw=120,gh=90,ds=[],L=P.L;for(let i=1;i<=50;i++){const x=i/50*L/2;ds.push([x,TAU*Math.sqrt((L*L/12+x*x)/(9.8*x))]);}
    gplot(c,gx,gy,gw,gh,{x1:L/2,y1:Math.min(6,Math.max(...ds.map(p=>p[1]))),xl:'d',yl:'T, s',lines:[[ds,C.accent,2]],marks:[[d,TAU*Math.sqrt(I/(9.8*d)),C.warm]]});},
  read(S,P){const d=this.dd(P),I=P.L*P.L/12+d*d;return[['Inersiya momenti I/m',fmt(I,4)+' m²'],['Davr T',fmt(TAU*Math.sqrt(I/(9.8*d)),3)+' s'],['Keltirilgan uzunlik',fmt(I/d,3)+' m'],['Eng kichik davr (d = L/√12)',fmt(TAU*Math.sqrt((P.L/Math.sqrt(3))/9.8),3)+' s']];}
});

/* 11. Bog‘langan mayatniklar */
SIMS.push({id:'boglanganmay',cat:'teb',title:'Bog‘langan mayatniklar va energiya almashinuvi',short:'T_t = 2π/(ω₂ − ω₁)',
  sub:'Ikki bir xil mayatnik kuchsiz prujina bilan bog‘langan. Birini tebratsak, uning energiyasi asta-sekin ikkinchisiga o‘tadi, keyin qaytib keladi. Bu ikki normal tebranishning qo‘shilishidan hosil bo‘lgan tepki.',
  formula:`<span><i>ω</i>₁ = ${sq(fr('<i>g</i>','<i>l</i>'))}, &nbsp;<i>ω</i>₂ = ${sq(fr('<i>g</i>','<i>l</i>')+' + '+fr('2<i>k</i>','<i>m</i>'))}</span><span class="alt"><i>T</i><sub>alm</sub> = ${fr('2π','<i>ω</i>₂ − <i>ω</i>₁')}</span>`,
  text:['Bog‘langan tizimning ikki normal tebranishi bor: mayatniklar bir fazada tebranganda prujina cho‘zilmaydi va chastota ω₁ = √(g/l); qarama-qarshi fazada prujina ishlaydi va chastota kattaroq: ω₂ = √(g/l + 2k/m).','Faqat bitta mayatnik og‘dirilsa, harakat ikkala normal tebranishning yig‘indisi bo‘ladi. Chastotalar yaqin bo‘lgani uchun tepki hosil bo‘ladi: energiya to‘liq ikkinchi mayatnikka o‘tadi va qaytadi. Bu molekulalardagi tebranishlar va bog‘langan konturlar uchun ham xos.'],
  legend:[['l','mayatnik uzunligi, m'],['k','bog‘lovchi prujina bikrligi, N/m'],['m','yuk massasi, kg'],['ω₁, ω₂','normal tebranishlar chastotalari'],['T_alm','energiya almashinish davri']],
  tries:['«Bir fazada» rejimini tanlang: mayatniklar bir xil tebranadi, energiya almashmaydi.','k ni oshiring: energiya tezroq o‘tadi.','«Qarama-qarshi fazada» rejimida davrni o‘lchang va ω₂ bilan solishtiring.'],
  params:[{id:'k',label:'Prujina bikrligi',sym:'k',min:0.05,max:3,step:0.05,val:0.6,unit:'N/m',d:2,reset:1},{id:'l',label:'Mayatnik uzunligi',sym:'l',min:0.3,max:1.5,step:0.05,val:1,unit:'m',d:2,reset:1},{id:'md',label:'Boshlanish',choices:[[0,'Bittasi og‘dirilgan'],[1,'Bir fazada'],[2,'Qarama-qarshi fazada']],val:0,reset:1}],
  init(P){const a=0.15,md=P.md|0;return{x1:a,x2:md===0?0:md===1?a:-a,v1:0,v2:0,t:0,h1:[],h2:[]};},
  step(S,P,dt){const m=1,g=9.8,n=20,h=dt/n;for(let i=0;i<n;i++){const a1=-g/P.l*S.x1-P.k/m*(S.x1-S.x2),a2=-g/P.l*S.x2-P.k/m*(S.x2-S.x1);S.v1+=a1*h;S.v2+=a2*h;S.x1+=S.v1*h;S.x2+=S.v2*h;}S.t+=dt;S.h1.push([S.t,S.x1]);S.h2.push([S.t,S.x2]);const tw=20;while(S.h1.length&&S.h1[0][0]<S.t-tw){S.h1.shift();S.h2.shift();}},
  draw(c,W,H,S,P){grid(c,W,H,28);const py=30,sc=(H*0.48)/1.5,L=P.l*sc,p1=W*0.3,p2=W*0.55,b1=[p1+L*Math.sin(S.x1),py+L*Math.cos(S.x1)],b2=[p2+L*Math.sin(S.x2),py+L*Math.cos(S.x2)];S.g={py,sc,p1,p2};
    c.fillStyle=rgba('muted',0.3);c.fillRect(p1-60,py-12,p2-p1+120,10);line(c,p1-60,py-2,p2+60,py-2,C.ink,2);
    line(c,p1,py,b1[0],b1[1],C.ink,1.5);line(c,p2,py,b2[0],b2[1],C.ink,1.5);springLine(c,b1[0]+12,b1[1],b2[0]-12,b2[1],9,6,C.green,1.6);
    disk(c,b1[0],b1[1],12,C.accent);disk(c,b2[0],b2[1],12,C.warm);
    const g=9.8,E=(x,v)=>0.5*v*v*P.l*P.l+0.5*g*P.l*x*x,e1=E(S.x1,S.v1),e2=E(S.x2,S.v2),et=e1+e2||1;const bx=W*0.78,bw=26,bh=H*0.45;
    [[e1,C.accent,'E₁'],[e2,C.warm,'E₂']].forEach(([e,col,l],i)=>{const h=e/et*bh,x=bx+i*(bw+18);c.fillStyle=rgba('muted',0.2);c.fillRect(x,py+10,bw,bh);c.fillStyle=col;c.fillRect(x,py+10+bh-h,bw,h);txt(c,l,x+bw/2,py+bh+24,C.ink,{align:'center',font:MATH});});
    const gy=H*0.62,gh=H-gy-24,t0=Math.max(0,S.t-20);gplot(c,40,gy,W-80,gh,{x0:t0,x1:t0+20,y0:-0.17,y1:0.17,xt:5,xl:'t, s',yl:'θ',lines:[[S.h1,C.accent,1.8],[S.h2,C.warm,1.8]]});},
  read(S,P){const w1=Math.sqrt(9.8/P.l),w2=Math.sqrt(9.8/P.l+2*P.k);return[['ω₁ (bir fazada)',fmt(w1,3)+' rad/s'],['ω₂ (qarama-qarshi)',fmt(w2,3)+' rad/s'],['Tebranish davri',fmt(2*TAU/(w1+w2),2)+' s'],['Energiya to‘liq o‘tish vaqti',fmt(Math.PI/(w2-w1),1)+' s']];}
});

/* 12. Tovush balandligi darajasi (detsibel) */
SIMS.push({id:'detsibel',cat:'teb',title:'Tovush intensivligi va detsibel',short:'L = 10·lg(I/I₀)',
  sub:'Tovush intensivligi manbadan uzoqlashgan sari masofa kvadratiga teskari proporsional kamayadi. Quloq juda katta oraliqni sezgani uchun tovush darajasi logarifmik birlik — detsibelda o‘lchanadi.',
  formula:`<span><i>L</i> = 10·lg${fr('<i>I</i>','<i>I</i>₀')} dB</span><span class="alt"><i>I</i> = ${fr('<i>P</i>','4π<i>r</i>²')}, &nbsp;<i>I</i>₀ = 10⁻¹² W/m²</span>`,
  text:['Nuqtaviy manba tovush quvvatini hamma tomonga bir xil tarqatadi, shuning uchun r masofada intensivlik I = P/(4πr²). Masofa ikki marta ortsa, intensivlik to‘rt marta kamayadi, tovush darajasi esa 6 dB ga pasayadi.','Eshitish chegarasi I₀ = 10⁻¹² W/m² (0 dB), og‘riq chegarasi taxminan 1 W/m² (120 dB). Intensivlik 10 marta ortsa, daraja 10 dB ga ortadi. Ikki bir xil manba birga ishlasa, daraja atigi 3 dB ga ortadi. 85 dB dan yuqori shovqin uzoq vaqt eshitishga zarar yetkazadi.'],
  legend:[['L','tovush darajasi, dB'],['I','intensivlik, W/m²'],['P','manbaning akustik quvvati, W'],['r','masofa, m'],['n','bir xil manbalar soni']],
  tries:['Masofani 2 marta oshiring: daraja 6 dB ga kamayadi.','Manbalar sonini 1 dan 2 ga oshiring: atigi +3 dB. 10 ta manba esa +10 dB beradi.','Reaktiv dvigatel 30 m masofada og‘riq chegarasiga qanchalik yaqin?'],
  params:[{id:'src',label:'Tovush manbai',choices:[[0,'Shivirlash'],[1,'Suhbat'],[2,'Avtomobil signali'],[3,'Konsert karnayi'],[4,'Reaktiv dvigatel']],val:1},{id:'r',label:'Masofa',sym:'r',min:0.5,max:100,step:0.5,val:2,unit:'m',d:1},{id:'n',label:'Manbalar soni',sym:'n',min:1,max:10,step:1,val:1,unit:'',d:0}],
  PW:[1e-9,1e-5,0.1,10,1e4],
  init:()=>({t:0,rings:[]}),
  step(S,P,dt){S.t+=dt;if(!S.last||S.t-S.last>0.25){S.last=S.t;S.rings.push(0);}S.rings=S.rings.map(r=>r+dt*0.5).filter(r=>r<1);},
  draw(c,W,H,S,P){grid(c,W,H,28);const Pw=this.PW[P.src|0]*P.n,I=Pw/(4*Math.PI*P.r*P.r),L=10*Math.log10(I/1e-12),sx=70,sy=H*0.42,mx=W*0.6,dist=mx-sx;S.g={sx,sy,mx,L};
    S.rings.forEach(r=>{c.strokeStyle=rgba('accent',0.7*(1-r));c.lineWidth=2;c.beginPath();c.arc(sx,sy,r*dist*1.3,-0.9,0.9);c.stroke();});
    c.fillStyle=C.warm;c.fillRect(sx-24,sy-24,18,48);if(P.n>1)txt(c,'× '+P.n,sx-15,sy+38,C.warm,{align:'center',font:SMALL});
    line(c,sx,sy+60,mx,sy+60,C.muted,1);arrow(c,(sx+mx)/2,sy+60,mx,sy+60,C.muted,1.2);txt(c,'r = '+fmt(P.r,1)+' m',(sx+mx)/2,sy+74,C.ink,{align:'center',font:SMALL});
    c.fillStyle='#1d2433';rrect(c,mx-10,sy-28,60,56,8);c.fill();c.strokeStyle=C.ink;c.lineWidth=1.5;c.stroke();txt(c,fmt(L,0),mx+20,sy-4,L>85?C.red:C.green,{align:'center',font:'700 20px "IBM Plex Mono", monospace'});txt(c,'dB',mx+20,sy+16,C.muted,{align:'center',font:SMALL});
    const bx=W-70,bt=30,bb=H-30,Y=l=>bb-(clamp(l,0,140)/140)*(bb-bt);for(let l=0;l<=140;l+=20){line(c,bx,Y(l),bx+8,Y(l),C.muted,1);txt(c,l+'',bx-6,Y(l),C.muted,{align:'right',font:SMALL});}
    const gr=c.createLinearGradient(0,bb,0,bt);gr.addColorStop(0,'#3fe0a0');gr.addColorStop(0.6,'#ffd23f');gr.addColorStop(0.86,'#ff5a5a');c.fillStyle=gr;c.fillRect(bx+10,Y(Math.max(L,0)),18,bb-Y(Math.max(L,0)));c.strokeStyle=C.ink;c.strokeRect(bx+10,bt,18,bb-bt);
    [[0,'eshitish chegarasi'],[85,'xavfli'],[120,'og‘riq chegarasi']].forEach(([l,n])=>{line(c,bx+6,Y(l),bx+32,Y(l),C.red,1);txt(c,n,bx-30,Y(l)-9,C.muted,{align:'right',font:SMALL});});},
  read(S,P){const Pw=this.PW[P.src|0]*P.n,I=Pw/(4*Math.PI*P.r*P.r),L=10*Math.log10(I/1e-12);return[['Akustik quvvat P',fmt(Pw,3)+' W'],['Intensivlik I',fmt(I,3)+' W/m²'],['Tovush darajasi L',fmt(L,1)+' dB'],['Ikki marta uzoqda',fmt(L-20*Math.log10(2),1)+' dB'],['Baho',L<30?'juda past':L<60?'odatiy':L<85?'baland':L<120?'xavfli':'og‘riq chegarasi']];}
});
