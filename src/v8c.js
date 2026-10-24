/* ===== v8: yangi mavzular (3-qism): mag, opt, rel, yad ===== */

/* 24. Mass-spektrometr */
SIMS.push({id:'massspektr',cat:'mag',title:'Mass-spektrometr: izotoplarni ajratish',short:'r = √(2mU/q) / B',
  sub:'Ionlar elektr maydonda tezlatiladi, so‘ng magnit maydonda yarim aylana chizadi. Og‘irroq ionning radiusi kattaroq, shuning uchun bir elementning izotoplari plastinkaning turli joylariga tushadi.',
  formula:`<span><i>qU</i> = ${fr('<i>mv</i>²','2')}, &nbsp;<i>qvB</i> = ${fr('<i>mv</i>²','<i>r</i>')}</span><span class="alt"><i>r</i> = ${fr('1','<i>B</i>')}${sq(fr('2<i>mU</i>','<i>q</i>'))}</span>`,
  text:['Ion manbasidan chiqqan musbat ionlar U kuchlanish bilan tezlatiladi va bir xil kinetik energiya qU oladi. Magnit maydonda Lorens kuchi ularni aylana bo‘ylab buradi: r = mv/(qB). Ikki tenglamadan r = √(2mU/q)/B — radius massaning kvadrat ildiziga proporsional.','Fotoplastinka yoki detektorda har bir izotop alohida chiziq beradi, chiziq yorqinligi izotopning tabiatdagi ulushini ko‘rsatadi. Shu usul bilan neonning ikki izotopi (1913-yil) kashf qilingan, uran-235 boyitiladi va dorilar tarkibi tahlil qilinadi.'],
  legend:[['U','tezlatuvchi kuchlanish, kV'],['B','magnit induksiya, T'],['m','ion massasi, u (1 u = 1,66·10⁻²⁷ kg)'],['q','ion zaryadi, +e'],['r','traektoriya radiusi, sm']],
  tries:['Neon izotoplari chiziqlari orasidagi masofani o‘lchang.','B ni ikki marta oshiring: barcha radiuslar ikki marta kichrayadi.','Uran izotoplari juda yaqin tushadi: ularni ajratish nega qiyinligini tushuntiring.'],
  params:[{id:'el',label:'Namuna',choices:[[0,'Neon'],[1,'Xlor'],[2,'Uglerod'],[3,'Uran']],val:0,reset:1},{id:'U',label:'Tezlatuvchi kuchlanish',sym:'U',min:0.5,max:5,step:0.1,val:1,unit:'kV',d:1},{id:'B',label:'Magnit induksiya',sym:'B',min:0.05,max:1,step:0.01,val:0.2,unit:'T',d:2}],
  ISO:[[[20,0.905,'²⁰Ne'],[21,0.003,'²¹Ne'],[22,0.092,'²²Ne']],[[35,0.758,'³⁵Cl'],[37,0.242,'³⁷Cl']],[[12,0.989,'¹²C'],[13,0.011,'¹³C']],[[235,0.0072,'²³⁵U'],[238,0.9928,'²³⁸U']]],
  r(m,P){return Math.sqrt(2*m*1.6605e-27*P.U*1e3/1.602e-19)/P.B;},
  init:()=>({ions:[],hits:[],acc:0}),
  step(S,P,dt){const iso=this.ISO[P.el|0];S.acc+=dt*14;while(S.acc>=1){S.acc--;let u=Math.random(),k=0;while(k<iso.length-1&&u>iso[k][1]){u-=iso[k][1];k++;}if(Math.random()<0.5&&iso[k][1]<0.05)continue;S.ions.push({k,ph:0});}
    S.ions.forEach(o=>o.ph+=dt*1.6);S.ions=S.ions.filter(o=>{if(o.ph>=1){S.hits.push(o.k);return false;}return true;});if(S.hits.length>400)S.hits.splice(0,S.hits.length-400);},
  draw(c,W,H,S,P){grid(c,W,H,28);const iso=this.ISO[P.el|0],ex=W*0.22,ey=H*0.2,rm=Math.max(...iso.map(i=>this.r(i[0],P))),sc=Math.min((W-ex-40)/(2*rm),(H-ey-40)/rm),cols=['#ff6b6b','#ffd23f','#5fd4ff','#b07cff'];S.g={ex,ey,sc};
    c.fillStyle='rgba(120,140,255,0.08)';c.fillRect(ex,ey,W-ex-10,H-ey-10);for(let x=ex+18;x<W-10;x+=36)for(let y=ey+18;y<H-10;y+=36){disk(c,x,y,1.6,rgba('violet',0.5));}txt(c,'B ⊙',W-24,ey+16,C.violet,{align:'right',font:MATH});
    c.fillStyle='#3a4252';c.fillRect(ex-18,4,36,22);txt(c,'ion manbai',ex-26,15,C.muted,{align:'right',font:SMALL});line(c,ex-20,32,ex+20,32,C.red,3);line(c,ex-20,ey-14,ex-5,ey-14,C.accent,3);line(c,ex+5,ey-14,ex+20,ey-14,C.accent,3);txt(c,'U',ex-28,(32+ey-14)/2,C.ink,{align:'right',font:MATH});
    line(c,ex+10,ey-2,W-10,ey-2,C.ink,4);txt(c,'detektor (fotoplastinka)',W-12,ey-14,C.muted,{align:'right',font:SMALL});
    iso.forEach(([m,ab,n],k)=>{const r=this.r(m,P)*sc;c.strokeStyle=cols[k]+'55';c.lineWidth=1;c.beginPath();c.arc(ex+r,ey,r,Math.PI,0,true);c.stroke();
      const cnt=S.hits.filter(h=>h===k).length,hx=ex+2*r;c.fillStyle=cols[k];c.globalAlpha=clamp(cnt/40,0.15,1);c.fillRect(hx-1.5,ey-12,3,10);c.globalAlpha=1;});
    /* detektor kattalashtirilgan */const d0=Math.min(...iso.map(i=>2*this.r(i[0],P))),d1=Math.max(...iso.map(i=>2*this.r(i[0],P))),pad=(d1-d0)*0.25+1e-4,bx=W*0.48,bw=W*0.48,by=H-58,DX=d=>bx+(d-(d0-pad))/((d1+pad)-(d0-pad))*bw;c.fillStyle=rgba('panel',0.85);c.fillRect(bx-8,by-34,bw+16,64);txt(c,'detektor (kattalashtirilgan)',bx,by-24,C.muted,{font:SMALL});line(c,bx,by,bx+bw,by,C.ink,2);
    iso.forEach(([m,ab,n],k)=>{const d=2*this.r(m,P),cnt=S.hits.filter(h=>h===k).length,x=DX(d);c.fillStyle=cols[k];c.globalAlpha=clamp(cnt/30,0.12,1);c.fillRect(x-2.5,by-14,5,14);c.globalAlpha=1;txt(c,n,x,by+12,cols[k],{align:'center',font:SMALL});txt(c,fmt(d*100,2)+' sm',x,by+24,cols[k],{align:'center',font:SMALL});});
    S.ions.forEach(o=>{const r=this.r(iso[o.k][0],P)*sc;let x,y;if(o.ph<0.15){x=ex;y=26+(ey-26)*o.ph/0.15;}else{const a=Math.PI*(o.ph-0.15)/0.85;x=ex+r-r*Math.cos(a);y=ey+r*Math.sin(a);}disk(c,x,y,3,cols[o.k]);});},
  read(S,P){const iso=this.ISO[P.el|0],r=iso.map(i=>this.r(i[0],P)),v=Math.sqrt(2*1.602e-19*P.U*1e3/(iso[0][0]*1.6605e-27));return[['Ion tezligi ('+iso[0][2]+')',fmt(v/1000,1)+' km/s']].concat(iso.map((x,i)=>['Radius '+x[2],fmt(r[i]*100,2)+' sm'])).concat([['Chiziqlar orasi (birinchi ikkitasi)',fmt(2*(r[1]-r[0])*1000,2)+' mm']]);}
});

/* 25. O‘zinduksiya: RL zanjir */
SIMS.push({id:'rl',cat:'mag',title:'O‘zinduksiya: RL zanjirda tok o‘sishi',short:'I = (E/R)(1 − e^(−t/τ)), τ = L/R',
  sub:'G‘altakli zanjirni ulaganda tok bir zumda o‘rnatilmaydi: tok o‘zgarishi g‘altakda o‘zinduksiya EYuK hosil qiladi va u tokning o‘sishiga qarshilik qiladi. Uzganda esa g‘altak tokni bir muddat ushlab turadi.',
  formula:`<span><i>E</i><sub>s</sub> = −<i>L</i>${fr('Δ<i>I</i>','Δ<i>t</i>')}</span><span class="alt"><i>I</i> = ${fr('<i>E</i>','<i>R</i>')}(1 − <i>e</i><sup>−<i>t</i>/<i>τ</i></sup>), &nbsp;<i>τ</i> = ${fr('<i>L</i>','<i>R</i>')}, &nbsp;<i>W</i> = ${fr('<i>LI</i>²','2')}</span>`,
  text:['Kalit ulanganda tok nol qiymatdan o‘sa boshlaydi. G‘altakda E_s = −L·dI/dt o‘zinduksiya EYuK paydo bo‘ladi (Lens qoidasi) va manba EYuKiga qarshi yo‘naladi. Natijada tok eksponensial o‘sadi: τ = L/R vaqtda u oxirgi qiymatining 63 % iga yetadi.','Kalit uzilganda g‘altak magnit maydonida to‘plangan energiya LI²/2 zanjirga qaytadi va tok parallel ulangan diod orqali asta-sekin so‘nadi. Diod bo‘lmasa, uzilish joyida juda katta kuchlanish hosil bo‘lib, uchqun chiqadi.'],
  legend:[['L','induktivlik, Gn'],['R','qarshilik, Om'],['E','manba EYuK, V'],['τ','vaqt doimiysi, s'],['E_s','o‘zinduksiya EYuK, V']],
  tries:['Kalitni ulang va τ vaqtda tok oxirgi qiymatining 63 % ga yetishini tekshiring.','L ni 4 marta oshiring: tok 4 marta sekin o‘sadi, oxirgi qiymat o‘zgarmaydi.','Kalitni uzing: lampa yana bir muddat yonib turadi.'],
  tools:[{id:'sw',label:'Kalit: ulash / uzish',act:1}],
  params:[{id:'E',label:'Manba EYuK',sym:'E',min:1,max:24,step:1,val:12,unit:'V',d:0},{id:'R',label:'Qarshilik',sym:'R',min:1,max:50,step:1,val:10,unit:'Om',d:0},{id:'L',label:'Induktivlik',sym:'L',min:0.5,max:20,step:0.5,val:5,unit:'Gn',d:1}],
  init:()=>({on:1,I:0,t:0,ts:0,hist:[],ph:0}),
  action(id,S){if(id==='sw'){S.on=S.on?0:1;S.ts=S.t;}},
  step(S,P,dt){const n=20,h=dt/n;for(let i=0;i<n;i++){const dI=S.on?(P.E-P.R*S.I)/P.L:(-P.R*S.I)/P.L;S.I+=dI*h;S.eL=-P.L*dI;}S.t+=dt;S.ph+=dt*S.I*30;S.hist.push([S.t,S.I]);while(S.hist.length&&S.hist[0][0]<S.t-12)S.hist.shift();
    if(S.on&&S.t-S.ts>Math.max(6,6*P.L/P.R)){S.on=0;S.ts=S.t;}else if(!S.on&&S.t-S.ts>Math.max(4,6*P.L/P.R)){S.on=1;S.ts=S.t;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const L=50,R=W*0.5,T=40,B=H*0.5,Imax=P.E/P.R;S.g={L,R,T,B};
    wireP(c,[[L,(T+B)/2-10],[L,T],[L+60,T]]);const kx=L+60;line(c,kx,T,kx+40,S.on?T:T-22,C.ink,3);disk(c,kx,T,4,C.ink);disk(c,kx+40,T,4,C.ink);wireP(c,[[kx+40,T],[R,T],[R,T+20]]);
    for(let k=0;k<5;k++){c.strokeStyle=C.warm;c.lineWidth=3;c.beginPath();c.arc(R,T+32+k*16,8,-Math.PI/2,Math.PI/2);c.stroke();}txt(c,'L',R+18,T+64,C.warm,{font:MATH});wireP(c,[[R,T+108],[R,B],[L+180,B]]);resH(c,(L+180+L+100)/2,B,60,'R');wireP(c,[[L+100,B],[L,B],[L,(T+B)/2+10]]);cellV(c,L,(T+B)/2,'E');
    const gl=S.on?0:clamp(S.I/Imax,0,1);c.fillStyle=`rgba(255,210,90,${gl*0.85})`;c.beginPath();c.arc(R+50,(T+B)/2,14,0,TAU);c.fill();c.strokeStyle=C.ink;c.lineWidth=1.5;c.stroke();wireP(c,[[R,T+10],[R+50,T+10],[R+50,(T+B)/2-14]]);wireP(c,[[R+50,(T+B)/2+14],[R+50,B-10],[R,B-10]]);txt(c,'lampa + diod',R+70,(T+B)/2,C.muted,{font:SMALL});
    if(S.on)flowDots(c,[[L,T],[R,T],[R,B],[L,B]],S.ph,1,C.warm);else flowDots(c,[[R,T+10],[R+50,T+10],[R+50,B-10],[R,B-10]],S.ph,-1,C.warm);
    const gx=40,gy=B+40,gw=W-80,gh=H-gy-24,t0=Math.max(0,S.t-12);gplot(c,gx,gy,gw,gh,{x0:t0,x1:t0+12,y0:0,y1:Imax*1.15,xt:2,yt:niceStep(Imax,3),xl:'t, s',yl:'I, A',lines:[[[[t0,Imax],[t0+12,Imax]],rgba('muted',0.6),1,[4,4]],[S.hist,C.accent,2.4]],marks:[[S.t,S.I,C.warm]]});
    txt(c,S.on?'kalit ulangan':'kalit uzilgan',W-16,24,S.on?C.green:C.red,{align:'right',font:MONO});},
  read(S,P){return[['Tok I',fmt(S.I,3)+' A'],['Oxirgi tok E/R',fmt(P.E/P.R,2)+' A'],['Vaqt doimiysi τ = L/R',fmt(P.L/P.R,2)+' s'],['O‘zinduksiya EYuK',fmt(S.eL??0,2)+' V'],['Magnit maydon energiyasi',fmt(P.L*S.I*S.I/2,2)+' J']];}
});

/* 26. O‘zgaruvchan tok zanjirida rezonans (RLC) */
SIMS.push({id:'rlc',cat:'mag',title:'RLC zanjir va kuchlanish rezonansi',short:'Z = √(R² + (ωL − 1/ωC)²)',
  sub:'Rezistor, g‘altak va kondensator ketma-ket ulangan. G‘altak kuchlanishi tokdan chorak davr oldinda, kondensatorniki orqada. Chastota ω₀ = 1/√(LC) da ular bir-birini yo‘qotadi, impedans eng kichik, tok esa eng katta bo‘ladi.',
  formula:`<span><i>Z</i> = ${sq('<i>R</i>² + (<i>ωL</i> − '+fr('1','<i>ωC</i>')+')²')}</span><span class="alt"><i>f</i>₀ = ${fr('1','2π√(<i>LC</i>)')}, &nbsp;tg<i>φ</i> = ${fr('<i>ωL</i> − 1/<i>ωC</i>','<i>R</i>')}</span>`,
  text:['O‘zgaruvchan tokda g‘altakning induktiv qarshiligi X_L = ωL chastota bilan ortadi, kondensatorning sig‘im qarshiligi X_C = 1/(ωC) esa kamayadi. Vektor diagrammada U_R tok bilan bir fazada, U_L 90° oldinda, U_C 90° orqada; umumiy kuchlanish ularning vektor yig‘indisi.','Rezonansda X_L = X_C, umumiy kuchlanish faqat rezistorga tushadi, tok va kuchlanish bir fazada. Bunda g‘altak va kondensatordagi kuchlanishlar manba kuchlanishidan Q marta katta bo‘lishi mumkin. Radio qabul qilgichda kontur shu yo‘l bilan kerakli stansiya chastotasiga sozlanadi.'],
  legend:[['R','aktiv qarshilik, Om'],['L','induktivlik, mGn'],['C','sig‘im, μF'],['f','manba chastotasi, Gs'],['Z','to‘la qarshilik (impedans), Om'],['φ','kuchlanish va tok fazalar farqi']],
  tries:['Chastotani rezonans chastotaga tenglang: tok eng katta va φ = 0 bo‘ladi.','R ni kamaytiring: rezonans egri chizig‘i ingichka va baland bo‘ladi.','Rezonansda U_L manba kuchlanishidan necha marta katta?'],
  params:[{id:'f',label:'Chastota',sym:'f',min:10,max:500,step:1,val:120,unit:'Gs',d:0},{id:'R',label:'Qarshilik',sym:'R',min:2,max:100,step:1,val:20,unit:'Om',d:0},{id:'L',label:'Induktivlik',sym:'L',min:10,max:500,step:5,val:100,unit:'mGn',d:0},{id:'C',label:'Sig‘im',sym:'C',min:1,max:100,step:1,val:20,unit:'μF',d:0},{id:'U',label:'Kuchlanish amplitudasi',sym:'U₀',min:1,max:20,step:1,val:10,unit:'V',d:0}],
  calc(P,f){f=f??P.f;const w=TAU*f,L=P.L*1e-3,C=P.C*1e-6,XL=w*L,XC=1/(w*C),Z=Math.hypot(P.R,XL-XC),I=P.U/Z,phi=Math.atan2(XL-XC,P.R);return{w,XL,XC,Z,I,phi,f0:1/(TAU*Math.sqrt(L*C))};},
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const k=this.calc(P),ph=S.t*TAU*0.5;const cx=W*0.2,cy=H*0.3,sc=Math.min(W,H)*0.2/Math.max(P.U,k.I*Math.max(k.XL,k.XC,P.R));S.g={cx,cy};
    const rot=(a,m)=>[cx+Math.cos(ph+a)*m*sc,cy-Math.sin(ph+a)*m*sc];const UR=k.I*P.R,UL=k.I*k.XL,UC=k.I*k.XC;
    c.strokeStyle=rgba('muted',0.4);c.lineWidth=1;c.beginPath();c.arc(cx,cy,P.U*sc,0,TAU);c.stroke();
    const pr=rot(0,UR);arrow(c,cx,cy,pr[0],pr[1],C.green,2.4,'U_R');const pl=rot(Math.PI/2,UL);arrow(c,cx,cy,pl[0],pl[1],C.warm,2.4,'U_L');const pc=rot(-Math.PI/2,UC);arrow(c,cx,cy,pc[0],pc[1],C.accent,2.4,'U_C');const pu=rot(k.phi,P.U);arrow(c,cx,cy,pu[0],pu[1],C.red,2.8,'U');
    const pi=rot(0,P.U*0.5);line(c,cx,cy,pi[0],pi[1],rgba('violet',0.8),1.5,[4,3]);txt(c,'I',pi[0]+6,pi[1]-6,C.violet,{font:MATH});
    const gx=W*0.42,gw=W*0.54,gt=24,gh=H*0.36,tw=[];const ui=[],ii=[];for(let i=0;i<=200;i++){const x=i/200*2*TAU;ui.push([i/200*2,P.U*Math.sin(x+ph+k.phi)]);ii.push([i/200*2,0.7*P.U*Math.sin(x+ph)]);}
    gplot(c,gx,gt,gw,gh,{x1:2,y0:-P.U*1.1,y1:P.U*1.1,xl:'t/T',yl:'u (qizil), i (binafsha)',lines:[[ui,C.red,2],[ii,C.violet,2]]});
    const fx=[];let Im=0;for(let i=0;i<=200;i++){const f=10+i*490/200,q=this.calc(P,f);fx.push([f,q.I]);Im=Math.max(Im,q.I);}const G=gplot(c,40,gt+gh+50,W-80,H-(gt+gh+50)-24,{x0:10,x1:500,y1:Im*1.12,xt:50,yt:niceStep(Im,3),xl:'f, Gs',yl:'I₀, A',lines:[[fx,C.accent,2.2]],marks:[[P.f,k.I,C.warm]]});
    line(c,G.X(k.f0),G.Y(0),G.X(k.f0),G.Y(Im*1.1),rgba('green',0.6),1,[4,4]);txt(c,'f₀ = '+fmt(k.f0,1)+' Gs',G.X(k.f0)+4,G.Y(Im*1.05),C.green,{font:SMALL});},
  read(S,P){const k=this.calc(P);return[['X_L = ωL',fmt(k.XL,1)+' Om'],['X_C = 1/ωC',fmt(k.XC,1)+' Om'],['Impedans Z',fmt(k.Z,1)+' Om'],['Tok amplitudasi',fmt(k.I,3)+' A'],['Fazalar farqi φ',fmt(k.phi/D2R,1)+'°'],['Rezonans chastotasi f₀',fmt(k.f0,1)+' Gs'],['U_L / U_C',fmt(k.I*k.XL,1)+' / '+fmt(k.I*k.XC,1)+' V']];}
});

/* 27. Ko‘z va ko‘zoynak */
SIMS.push({id:'koz',cat:'opt',title:'Ko‘z optikasi va ko‘zoynak',short:'D = 1/d + 1/f_ko‘z',
  sub:'Ko‘z gavhari linza kabi tasvirni to‘r pardaga tushiradi. Yaqin va uzoqni ko‘rish uchun gavhar egriligini o‘zgartiradi (akkomodatsiya). Yaqinni ko‘rarlik va uzoqni ko‘rarlik ko‘zoynak bilan tuzatiladi.',
  formula:`<span><i>D</i><sub>ko‘z</sub> = ${fr('1','<i>d</i>')} + ${fr('1','<i>f</i>')}</span><span class="alt"><i>D</i><sub>ko‘zoynak</sub> = −${fr('1','<i>d</i><sub>uzoq</sub>')} (yaqinni ko‘rarlik)</span>`,
  text:['Soddalashtirilgan ko‘zda gavhardan to‘r pardagacha masofa taxminan 17 mm. Uzoqdagi narsani aniq ko‘rish uchun optik kuch 59 dioptriya bo‘lishi kerak, 25 sm dagi narsa uchun esa 4 dioptriya ko‘proq. Ko‘z muskullari gavharni bo‘rttirib, kuchni oshiradi — buni akkomodatsiya deyiladi. Yosh o‘tgan sari akkomodatsiya kamayadi.','Yaqinni ko‘rarlikda ko‘z juda kuchli sindiradi: uzoqdagi narsaning tasviri to‘r parda oldida hosil bo‘ladi. Uni sochuvchi (manfiy) linza tuzatadi. Uzoqni ko‘rarlikda ko‘z kuchsiz — yaqindagi narsalar tasviri to‘r parda orqasida, uni yig‘uvchi (musbat) linza tuzatadi.'],
  legend:[['d','narsagacha masofa, m'],['D','optik kuch, dioptriya (1/m)'],['A','akkomodatsiya zaxirasi, dptr'],['d_uzoq, d_yaqin','aniq ko‘rishning uzoq va yaqin nuqtalari']],
  tries:['«Yaqinni ko‘rarlik» ni tanlang va narsani 3 m ga qo‘ying: tasvir to‘r parda oldida, xira.','Ko‘zoynak taqing: −2 dptr linza tasvirni to‘r pardaga qaytaradi.','Akkomodatsiyani 1 dptr ga kamaytiring (keksa yosh): 25 sm dagi kitob xira bo‘ladi.'],
  params:[{id:'df',label:'Ko‘z',choices:[[0,'Sog‘lom'],[1,'Yaqinni ko‘rar (−2 dptr)'],[2,'Uzoqni ko‘rar (+2 dptr)']],val:1},{id:'gl',label:'Ko‘zoynak',choices:[[0,'Yo‘q'],[1,'Bor']],val:0},{id:'d',label:'Narsagacha masofa',sym:'d',min:0.1,max:6,step:0.05,val:3,unit:'m',d:2},{id:'A',label:'Akkomodatsiya',sym:'A',min:0.5,max:10,step:0.5,val:4,unit:'dptr',d:1}],
  calc(P){const R0=1/0.017,err=[0,2,-2][P.df|0],Pf=R0+err,G=P.gl?-err:0,need=1/P.d+R0,Pe=clamp(need-G,Pf,Pf+P.A),tot=Pe+G,v=1/(tot-1/P.d),far=Pf+G-R0>1e-6?1/(Pf+G-R0):Infinity,near=1/(Pf+P.A+G-R0);return{R0,Pf,G,need,Pe,tot,v,far,near,blur:Math.abs(v-0.017)/v*4/1000};},
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const k=this.calc(P),ex=W*0.62,ey=H*0.42,er=Math.min(W*0.2,H*0.3),lx=ex-er*0.85,ret=ex+er*0.95,mm=(ret-lx)/17;S.g={ex,ey,er,lx};
    c.fillStyle='rgba(240,240,250,0.08)';c.beginPath();c.arc(ex,ey,er,0,TAU);c.fill();c.strokeStyle=rgba('ink',0.5);c.lineWidth=2;c.stroke();c.strokeStyle=C.red;c.lineWidth=4;c.beginPath();c.arc(ex,ey,er-3,-0.7,0.7);c.stroke();txt(c,'to‘r parda',ex+er+8,ey+er*0.6,C.red,{font:SMALL});
    const bul=(k.Pe-k.Pf)/10;c.fillStyle='rgba(160,200,255,0.5)';c.beginPath();c.ellipse(lx,ey,6+bul*8,er*0.38,0,0,TAU);c.fill();txt(c,'gavhar',lx,ey-er*0.45,C.muted,{align:'center',font:SMALL});
    if(P.gl){const gx=lx-40,gc=k.G<0;c.strokeStyle=C.accent;c.lineWidth=3;c.beginPath();if(gc){c.moveTo(gx-6,ey-er*0.5);c.quadraticCurveTo(gx+4,ey,gx-6,ey+er*0.5);c.moveTo(gx+6,ey-er*0.5);c.quadraticCurveTo(gx-4,ey,gx+6,ey+er*0.5);}else{c.moveTo(gx,ey-er*0.5);c.quadraticCurveTo(gx-10,ey,gx,ey+er*0.5);c.moveTo(gx,ey-er*0.5);c.quadraticCurveTo(gx+10,ey,gx,ey+er*0.5);}c.stroke();txt(c,(k.G>0?'+':'')+fmt(k.G,1)+' dptr',gx,ey+er*0.62,C.accent,{align:'center',font:SMALL});}
    /* nurlar: o‘qdagi nuqtadan */const ox=24,dpx=lx-ox,ys=[-er*0.3,-er*0.15,er*0.15,er*0.3],vpx=k.v*1000*mm,fx=lx+vpx;
    txt(c,'d = '+fmt(P.d,2)+' m',ox,ey+er*0.75,C.ink,{font:SMALL});
    const Dpx=P.d*1000*mm,gx=P.gl?lx-40:lx;if(Dpx<gx-ox)disk(c,gx-Dpx,ey,5,C.warm);
    ys.forEach(h=>{const xs=Math.max(ox,gx-Dpx),hs=h*(1-(gx-xs)/Dpx);line(c,xs,ey+hs,gx,ey+h,rgba('warm',0.8),1.2);if(P.gl)line(c,gx,ey+h,lx,ey+h,rgba('warm',0.8),1.2);
      const hl=ey+h,yAtRet=hl+(ey-hl)*(ret-lx)/vpx;line(c,lx,hl,ret,yAtRet,rgba('warm',0.85),1.2);});
    if(fx<ret+40&&fx>lx)disk(c,fx,ey,3,C.green);const sharp=Math.abs(fx-ret)<3;txt(c,sharp?'Tasvir aniq':fx<ret?'Tasvir to‘r parda oldida — xira':'Tasvir to‘r parda orqasida — xira',W/2,H-18,sharp?C.green:C.red,{align:'center',font:MONO});},
  read(S,P){const k=this.calc(P);return[['Kerakli optik kuch',fmt(k.need,1)+' dptr'],['Ko‘z optik kuchi (akkomodatsiya bilan)',fmt(k.Pe,1)+' dptr'],['Ko‘zoynak',fmt(k.G,1)+' dptr'],['Aniq ko‘rishning uzoq nuqtasi',isFinite(k.far)?fmt(k.far,2)+' m':'cheksiz'],['Yaqin nuqta',k.near>0?fmt(k.near*100,0)+' sm':'—'],['Tasvirning to‘r pardadan siljishi',fmt((k.v-0.017)*1000,2)+' mm']];}
});

/* 28. Bitta tirqishdagi difraksiya */
SIMS.push({id:'tirqish',cat:'opt',title:'Bitta tirqishda difraksiya',short:'a·sinθ = kλ (minimum)',
  sub:'Yorug‘lik tor tirqishdan o‘tganda to‘g‘ri chiziq bo‘ylab emas, yon tomonlarga ham tarqaladi. Ekranda markazda keng yorug‘ chiziq va uning ikki yonida xiraroq chiziqlar hosil bo‘ladi. Tirqish qancha tor bo‘lsa, manzara shuncha keng.',
  formula:`<span><i>a</i> sin<i>θ</i> = <i>kλ</i> — qorong‘i chiziqlar</span><span class="alt"><i>I</i> = <i>I</i>₀${fr('sin²<i>β</i>','<i>β</i>²')}, &nbsp;<i>β</i> = ${fr('π<i>a</i> sin<i>θ</i>','<i>λ</i>')}</span>`,
  text:['Gyuygens–Frenel prinsipiga ko‘ra tirqishning har bir nuqtasi yangi to‘lqin manbai. Biror θ yo‘nalishda tirqish chetlaridan kelgan to‘lqinlar yo‘li farqi a·sinθ. Bu farq λ ga teng bo‘lsa, tirqishni ikki yarmiga bo‘lib, har bir nuqtaga qarama-qarshi fazadagi juft topiladi — to‘lqinlar butunlay so‘nadi.','Markaziy maksimum kengligi 2λL/a. Tirqish to‘lqin uzunligiga yaqin bo‘lganda difraksiya kuchli, tirqish keng bo‘lsa manzara deyarli tirqish soyasiga aylanadi. Shu sababli har qanday optik asbobning ajrata olish qobiliyati cheklangan.'],
  legend:[['a','tirqish kengligi, μm'],['λ','to‘lqin uzunligi, nm'],['L','tirqishdan ekrangacha masofa, m'],['θ','difraksiya burchagi'],['k','minimum tartibi']],
  tries:['Tirqishni 2 marta toraytiring: markaziy chiziq 2 marta kengayadi.','Qizil va binafsha nurni solishtiring: qizil ko‘proq og‘adi.','Yon maksimumlar markaziydan necha marta xira? (taxminan 4,5 %)'],
  params:[{id:'a',label:'Tirqish kengligi',sym:'a',min:5,max:100,step:1,val:30,unit:'μm',d:0},{id:'l',label:'To‘lqin uzunligi',sym:'λ',min:400,max:700,step:5,val:633,unit:'nm',d:0},{id:'L',label:'Ekrangacha masofa',sym:'L',min:0.5,max:3,step:0.1,val:1.5,unit:'m',d:1}],
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt;},
  I(P,y){const th=Math.atan(y/P.L),b=Math.PI*P.a*1e-6*Math.sin(th)/(P.l*1e-9);return b===0?1:(Math.sin(b)/b)**2;},
  draw(c,W,H,S,P){grid(c,W,H,28);const col=wl2rgb(P.l),sx=W*0.3,cy=H*0.45,scrX=W*0.62,half=Math.max(0.02,3*P.l*1e-9*P.L/(P.a*1e-6))*1.1,Y=y=>cy-y/half*(H*0.4);S.g={sx,cy,scrX,half};
    const lamPx=14;for(let x=20;x<sx;x+=lamPx){const ph=(x-S.t*40)%lamPx;line(c,x+(lamPx-((S.t*40)%lamPx)),cy-H*0.3,x+(lamPx-((S.t*40)%lamPx)),cy+H*0.3,col,1.2);}
    const gap=clamp(P.a/100*60,4,60);c.fillStyle=C.ink;c.fillRect(sx-4,20,8,cy-gap/2-20);c.fillRect(sx-4,cy+gap/2,8,H-20-cy-gap/2);
    for(let r=((S.t*40)%lamPx);r<scrX-sx;r+=lamPx){const al=0.5*(1-r/(scrX-sx));c.strokeStyle=col;c.globalAlpha=al;c.lineWidth=1.2;c.beginPath();c.arc(sx,cy,r,-1.2,1.2);c.stroke();}c.globalAlpha=1;
    for(let k=1;k<=3;k++){const yk=P.L*Math.tan(Math.asin(Math.min(1,k*P.l*1e-9/(P.a*1e-6))));[1,-1].forEach(s=>{line(c,sx,cy,scrX,Y(s*yk),rgba('muted',0.25),1,[3,4]);});}
    for(let py=10;py<H-10;py+=2){const y=(cy-py)/(H*0.4)*half,I=this.I(P,y);c.fillStyle=col;c.globalAlpha=Math.pow(I,0.5);c.fillRect(scrX,py,22,2);}c.globalAlpha=1;c.strokeStyle=C.ink;c.strokeRect(scrX,10,22,H-20);
    c.strokeStyle=col;c.lineWidth=2;c.beginPath();for(let py=10;py<H-10;py+=2){const y=(cy-py)/(H*0.4)*half,I=this.I(P,y),x=scrX+30+I*(W-scrX-60);py===10?c.moveTo(x,py):c.lineTo(x,py);}c.stroke();
    const w=2*P.l*1e-9*P.L/(P.a*1e-6);line(c,scrX+26,Y(w/2),scrX+26,Y(-w/2),C.warm,2);txt(c,fmt(w*1000,1)+' mm',scrX+30,Y(w/2)-10,C.warm,{font:SMALL});txt(c,'a',sx+10,cy,C.ink,{font:MATH});},
  read(S,P){const s1=P.l*1e-9/(P.a*1e-6);return[['1-minimum burchagi',fmt(Math.asin(Math.min(1,s1))/D2R,2)+'°'],['Markaziy maksimum kengligi',fmt(2*s1*P.L*1000,1)+' mm'],['Minimumlar soni (bir tomonda)',String(Math.floor(P.a*1e-6/(P.l*1e-9)))],['1-yon maksimum intensivligi',fmt(4.72,1)+' %']];}
});

/* 29. Teleskop */
SIMS.push({id:'teleskop',cat:'opt',title:'Teleskop: burchak kattalashtirish',short:'Γ = F₁/F₂',
  sub:'Teleskop uzoqdagi jismni kattalashtirmaydi, balki uni ko‘rish burchagini kattalashtiradi. Obyektiv yulduzning tasvirini fokal tekisligida hosil qiladi, okulyar esa shu tasvirni lupa kabi kattalashtirib ko‘rsatadi.',
  formula:`<span>Γ = ${fr('tg<i>β</i>','tg<i>α</i>')} = ${fr('<i>F</i>₁','<i>F</i>₂')}</span><span class="alt"><i>ℓ</i> = <i>F</i>₁ + <i>F</i>₂ (Kepler), &nbsp;<i>ℓ</i> = <i>F</i>₁ − |<i>F</i>₂| (Galiley)</span>`,
  text:['Kepler teleskopida ikkala linza yig‘uvchi. Ularning fokuslari ustma-ust tushadi: obyektivdan kelgan parallel nurlar fokal tekislikda yig‘iladi, okulyardan yana parallel bo‘lib chiqadi, lekin endi Γ = F₁/F₂ marta katta burchak ostida. Tasvir teskari bo‘ladi — astronomiya uchun bu muhim emas.','Galiley teleskopida (dala durbini) okulyar sochuvchi linza, u obyektiv fokusidan oldin turadi. Tasvir to‘g‘ri, quvur qisqa, lekin ko‘rish maydoni tor. Teleskop diametri qancha katta bo‘lsa, u shuncha ko‘p yorug‘lik yig‘adi va mayda detallarni ajratadi.'],
  legend:[['F₁','obyektiv fokus masofasi, sm'],['F₂','okulyar fokus masofasi, sm'],['α','yulduzdan keluvchi nurlar burchagi'],['β','ko‘zga kiruvchi nurlar burchagi'],['Γ','burchak kattalashtirish']],
  tries:['F₁ = 100 sm, F₂ = 2 sm: Γ = 50. Oy diskining burchagi 0,5° dan 25° ga oshadi.','Galiley turini tanlang: tasvir to‘g‘ri, quvur qisqaroq.','Okulyarni qisqa fokuslisiga almashtiring: kattalashtirish ortadi.'],
  params:[{id:'tp',label:'Turi',choices:[[0,'Kepler'],[1,'Galiley']],val:0},{id:'F1',label:'Obyektiv fokusi',sym:'F₁',min:30,max:150,step:5,val:90,unit:'sm',d:0},{id:'F2',label:'Okulyar fokusi',sym:'F₂',min:2,max:15,step:0.5,val:6,unit:'sm',d:1},{id:'al',label:'Nurlar burchagi',sym:'α',min:0.2,max:2,step:0.05,val:0.8,unit:'°',d:2}],
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const gal=P.tp==1,len=gal?P.F1-P.F2:P.F1+P.F2,x0=60,sc=(W*0.62-x0)/Math.max(len,40),cy=H*0.42,ox=x0,ex=x0+len*sc,fp=x0+P.F1*sc,a=P.al*D2R,G=P.F1/P.F2,lh=H*0.16,va=6;S.g={x0,sc,cy,ex,fp};
    c.fillStyle=rgba('muted',0.1);c.fillRect(ox,cy-lh-6,ex-ox,2*lh+12);
    const lens=(x,h,conv,col)=>{c.strokeStyle=col;c.lineWidth=3;c.beginPath();if(conv){c.moveTo(x,cy-h);c.quadraticCurveTo(x-10,cy,x,cy+h);c.moveTo(x,cy-h);c.quadraticCurveTo(x+10,cy,x,cy+h);}else{c.moveTo(x-6,cy-h);c.quadraticCurveTo(x+4,cy,x-6,cy+h);c.moveTo(x+6,cy-h);c.quadraticCurveTo(x-4,cy,x+6,cy+h);}c.stroke();};
    lens(ox,lh,1,C.accent);lens(ex,lh*0.5,!gal,C.warm);line(c,10,cy,W*0.7,cy,rgba('muted',0.4),1,[4,4]);disk(c,fp,cy,3,C.ink);txt(c,'F₁',fp,cy+14,C.ink,{align:'center',font:SMALL});
    const ta=Math.tan(a*va),yimg=cy+P.F1*sc*ta,bt=Math.tan(Math.min(Math.atan(G*ta),1.2));
    [-0.8,0,0.8].forEach(u=>{const y0=cy+u*lh,xs=10,ys=y0-(ox-xs)*ta;line(c,xs,ys,ox,y0,C.warm,1.4);
      const x1=ex,y1=y0+(yimg-y0)*(x1-ox)/(fp-ox);line(c,ox,y0,x1,y1,C.warm,1.4);if(!gal)disk(c,fp,yimg,3,C.red);
      const x2=W*0.72;line(c,x1,y1,x2,y1+(gal?1:-1)*bt*(x2-x1),C.warm,1.4);});
    txt(c,'obyektiv',ox,cy-lh-16,C.accent,{align:'center',font:SMALL});txt(c,'okulyar',ex,cy-lh*0.5-16,C.warm,{align:'center',font:SMALL});txt(c,'ℓ = '+fmt(len,1)+' sm',(ox+ex)/2,cy+lh+24,C.ink,{align:'center',font:SMALL});txt(c,'burchaklar '+va+' marta kattalashtirib chizilgan',10,H-14,C.muted,{font:SMALL});
    const vx=W*0.86,vy1=H*0.25,vy2=H*0.68,mr=Math.min(W*0.1,H*0.17);c.strokeStyle=rgba('ink',0.4);c.lineWidth=1;c.beginPath();c.arc(vx,vy1,mr,0,TAU);c.stroke();c.beginPath();c.arc(vx,vy2,mr,0,TAU);c.stroke();
    const m0=mr*0.09,m1=Math.min(mr*0.95,m0*G);disk(c,vx,vy1,m0,'#e8e4d8');c.save();c.beginPath();c.arc(vx,vy2,mr,0,TAU);c.clip();c.fillStyle='#e8e4d8';c.beginPath();c.arc(vx,vy2,m0*G,0,TAU);c.fill();c.fillStyle='rgba(120,120,110,0.5)';[[0.3,-0.2,0.18],[-0.25,0.15,0.12],[0.05,0.35,0.1]].forEach(([dx,dy,r])=>{c.beginPath();c.arc(vx+dx*m0*G*(gal?1:-1),vy2+dy*m0*G*(gal?1:-1),r*m0*G,0,TAU);c.fill();});c.restore();
    txt(c,'ko‘z bilan',vx,vy1+mr+12,C.muted,{align:'center',font:SMALL});txt(c,'teleskopda (×'+fmt(G,1)+')',vx,vy2+mr+12,C.muted,{align:'center',font:SMALL});},
  read(S,P){const G=P.F1/P.F2,gal=P.tp==1;return[['Kattalashtirish Γ',fmt(G,1)+' marta'],['Quvur uzunligi',fmt(gal?P.F1-P.F2:P.F1+P.F2,1)+' sm'],['Chiquvchi nurlar burchagi',fmt(Math.atan(G*Math.tan(P.al*D2R))/D2R,1)+'°'],['Tasvir',gal?'to‘g‘ri':'teskari']];}
});

/* 30. Egizaklar paradoksi */
SIMS.push({id:'egizak',cat:'rel',title:'Egizaklar paradoksi',short:'τ = T√(1 − v²/c²)',
  sub:'Egizaklardan biri yaqin tezlikda yulduzga uchib borib qaytadi. Qaytganda u Yerda qolgan egizagidan yoshroq bo‘lib chiqadi. Paradoks emas: faqat sayohatchi burilishda sanoq sistemasini almashtiradi.',
  formula:`<span><i>T</i> = ${fr('2<i>D</i>','<i>v</i>')}, &nbsp;<i>τ</i> = ${fr('<i>T</i>','<i>γ</i>')}</span><span class="alt"><i>γ</i> = ${fr('1','√(1 − <i>v</i>²/<i>c</i>²)')}</span>`,
  text:['Yerdagi egizak uchun sayohat T = 2D/v davom etadi. Harakatlanayotgan soatlar sekin yurgani uchun sayohatchining soatida τ = T/γ vaqt o‘tadi. Simmetriya buziladi: sayohatchi yo‘l o‘rtasida tormozlanib, orqaga burilgan — u bitta inersial sistemada qolmagan.','O‘ngdagi fazo-vaqt diagrammasida Yer har yili sayohatchiga yorug‘lik signali (tabrik) yuboradi — 45° li chiziqlar. Ketishda sayohatchi ularni siyrak, qaytishda esa tez-tez qabul qiladi (Doppler effekti). Natijada u barcha T signalni oladi, lekin o‘zi atigi τ yil qariydi.'],
  legend:[['D','yulduzgacha masofa, yorug‘lik yili'],['v','kema tezligi'],['T','Yer bo‘yicha sayohat vaqti, yil'],['τ','kemadagi soat bo‘yicha vaqt, yil'],['γ','Lorens omili']],
  tries:['v = 0,6c, D = 6 y.y.: Yerda 20 yil, kemada 16 yil o‘tadi.','v = 0,99c qiling: sayohatchi 7 marta kam qariydi.','Ketish va qaytishda qabul qilingan signallar sonini sanang.'],
  params:[{id:'D',label:'Yulduzgacha masofa',sym:'D',min:1,max:20,step:0.5,val:6,unit:'y.y.',d:1,reset:1},{id:'b',label:'Kema tezligi',sym:'v/c',min:0.1,max:0.99,step:0.01,val:0.6,unit:'c',d:2,reset:1}],
  init:()=>({t:0,wait:0}),
  step(S,P,dt){const T=2*P.D/P.b;if(S.t>=T){S.wait+=dt;if(S.wait>2.5){S.t=0;S.wait=0;}return;}S.t=Math.min(T,S.t+dt*T/9);},
  draw(c,W,H,S,P){grid(c,W,H,28);const T=2*P.D/P.b,g=1/Math.sqrt(1-P.b*P.b),t=S.t,xs=t<T/2?P.b*t:P.b*(T-t),tau=t/g;
    const ax=24,aw=W*0.38,ay=H*0.22,X=x=>ax+x/P.D*aw;S.g={ax,aw,ay,xs};
    disk(c,X(0),ay,14,'#3a7bd5',C.ink);txt(c,'Yer',X(0),ay+26,C.ink,{align:'center',font:SMALL});disk(c,X(P.D),ay,9,'#ffd23f');txt(c,'yulduz',X(P.D),ay+26,C.ink,{align:'center',font:SMALL});
    c.save();c.translate(X(xs),ay-30);if(t>=T/2)c.scale(-1,1);c.fillStyle=C.warm;c.beginPath();c.moveTo(14,0);c.lineTo(-10,-7);c.lineTo(-10,7);c.closePath();c.fill();c.restore();
    const age=(x,y,a,l,col)=>{txt(c,l,x,y,col,{font:SMALL});txt(c,fmt(a,1)+' yil',x,y+18,col,{font:'700 18px "IBM Plex Mono", monospace'});};age(ax,H*0.48,t,'Yerdagi egizak',C.accent);age(ax,H*0.48+52,tau,'Sayohatchi',C.warm);
    const gx=W*0.5,gw=W*0.46,gt=24,gh=H-56,TX=x=>gx+x/P.D*gw*0.9,TY=tt=>gt+gh-tt/T*gh;
    c.fillStyle=rgba('panel',0.55);c.fillRect(gx-6,gt-14,gw+14,gh+30);line(c,gx,gt,gx,gt+gh,C.accent,2.4);line(c,TX(P.D),gt,TX(P.D),gt+gh,rgba('muted',0.4),1,[3,4]);txt(c,'x',gx+gw,gt+gh+10,C.muted,{align:'right',font:SMALL});txt(c,'ct',gx+6,gt-4,C.muted,{font:SMALL});
    line(c,TX(0),TY(0),TX(P.D),TY(T/2),rgba('warm',0.5),1.5);line(c,TX(P.D),TY(T/2),TX(0),TY(T),rgba('warm',0.5),1.5);
    const tt=Math.min(t,T);if(tt<=T/2)line(c,TX(0),TY(0),TX(P.b*tt),TY(tt),C.warm,3);else{line(c,TX(0),TY(0),TX(P.D),TY(T/2),C.warm,3);line(c,TX(P.D),TY(T/2),TX(P.b*(T-tt)),TY(tt),C.warm,3);}
    let recv=0;const ny=Math.floor(T);for(let k=1;k<=ny;k++){/* k-yil signal: x = t - k; uchrashuv */const te=k/(1-P.b)<=T/2?k/(1-P.b):(k+P.b*T)/(1+P.b);const xe=te<=T/2?P.b*te:P.b*(T-te);if(k>tt)continue;const xend=Math.min(xe,tt-k),tend=k+xend;line(c,TX(0),TY(k),TX(xend),TY(tend),rgba('green',0.55),1);if(te<=tt){recv++;disk(c,TX(xe),TY(te),2.5,C.green);}}
    disk(c,TX(xs),TY(tt),5,C.warm);disk(c,TX(0),TY(tt),5,C.accent);txt(c,'qabul qilingan tabriklar: '+recv,gx+gw,gt+6,C.green,{align:'right',font:SMALL});},
  read(S,P){const T=2*P.D/P.b,g=1/Math.sqrt(1-P.b*P.b);return[['Lorens omili γ',fmt(g,3)],['Yerda o‘tgan vaqt T',fmt(T,2)+' yil'],['Kemada o‘tgan vaqt τ',fmt(T/g,2)+' yil'],['Yosh farqi',fmt(T-T/g,2)+' yil'],['Kema uchun masofa (qisqargan)',fmt(P.D/g,2)+' y.y.']];}
});

/* 31. Vilson kamerasi */
SIMS.push({id:'vilson',cat:'yad',title:'Vilson kamerasi: zarralar izlari',short:'r = p/(qB)',
  sub:'O‘ta to‘yingan bug‘ bilan to‘ldirilgan kamerada zaryadli zarra o‘z yo‘lidagi molekulalarni ionlashtiradi va ionlar atrofida tuman tomchilari hosil bo‘ladi. Iz qalinligi, uzunligi va magnit maydonda egilishi zarra turini aytib beradi.',
  formula:`<span><i>r</i> = ${fr('<i>p</i>','|<i>q</i>|<i>B</i>')}</span><span class="alt"><b>F</b> = <i>q</i>[<b>v</b> × <b>B</b>]</span>`,
  text:['Alfa zarra og‘ir va ikki karra zaryadli: u gazni kuchli ionlashtirib, qalin, to‘g‘ri va qisqa (havoda 3–7 sm) iz qoldiradi. Beta zarra (elektron) yengil: izi ingichka, uzun, magnit maydonda kuchli egiladi va energiya yo‘qotgan sari spiral bo‘lib buraladi.','Kosmik nurlardagi myuonlar juda katta impulsga ega, ularning izi kamerani deyarli to‘g‘ri kesib o‘tadi. Musbat va manfiy zarralar magnit maydonda qarama-qarshi tomonga buriladi — 1932-yilda pozitron xuddi shunday kashf qilingan.'],
  legend:[['B','magnit induksiya (kameraga tik, bizga qarab), T'],['p','zarra impulsi'],['q','zarra zaryadi'],['r','iz egrilik radiusi']],
  tries:['B = 0 qiling: barcha izlar to‘g‘ri chiziq.','Faqat beta manbani tanlang va B ni oshiring: izlar spiralga aylanadi.','Elektron va pozitron izlarini egilish yo‘nalishidan ajrating.'],
  params:[{id:'src',label:'Manba',choices:[[0,'Aralash'],[1,'Alfa (²¹⁰Po)'],[2,'Beta (⁹⁰Sr)'],[3,'Kosmik nurlar']],val:0,reset:1},{id:'B',label:'Magnit maydon',sym:'B',min:0,max:0.5,step:0.01,val:0.15,unit:'T',d:2}],
  init:()=>({tr:[],acc:0,t:0}),
  spawn(S,P,W,H){const src=P.src|0;let types=src===0?['a','b','b','m','p']:src===1?['a']:src===2?['b']:['m','m','p','b'];const ty=types[Math.floor(Math.random()*types.length)];const sx=ty==='m'?Math.random()*W:W*0.12,sy=ty==='m'?4:H*0.55;
    const ang=ty==='m'?Math.PI/2+(Math.random()-0.5)*0.4:(Math.random()-0.5)*1.6;/* kinetik energiya va impuls (MeV/c) */const mc={a:3727,b:0.511,m:105.7,p:0.511}[ty],q={a:2,b:-1,m:-1,p:1}[ty],Ek={a:5.3,b:0.3+Math.random()*1.5,m:2000,p:0.5+Math.random()*2}[ty];
    S.tr.push({ty,x:sx,y:sy,ang,Ek,mc,q,pts:[[sx,sy]],age:0,done:0,rng:ty==='a'?(50+Math.random()*20):1e9});},
  step(S,P,dt){S.t+=dt;S.acc+=dt*1.6;const g=S.g;if(!g)return;const W=g.W,H=g.H,cmpx=g.cmpx;while(S.acc>=1){S.acc--;this.spawn(S,P,W,H);}
    S.tr.forEach(tk=>{tk.age+=dt;if(tk.done)return;for(let k=0;k<30;k++){const p=Math.sqrt(tk.Ek*tk.Ek+2*tk.Ek*tk.mc),r=p/(299.79*Math.abs(tk.q)*Math.max(P.B,1e-6))*100*cmpx;/* r: sm → px */const ds=2;if(P.B>0)tk.ang+=(tk.q>0?-1:1)*ds/r;if(tk.ty==='b'||tk.ty==='p')tk.ang+=(Math.random()-0.5)*0.05/Math.max(tk.Ek,0.05);tk.x+=Math.cos(tk.ang)*ds;tk.y+=Math.sin(tk.ang)*ds;
        const loss=tk.ty==='a'||tk.ty==='m'?0:0.003*(1+0.3/(tk.Ek*tk.Ek));tk.Ek-=loss*ds/cmpx;if(tk.ty==='a'&&tk.pts.length*ds/cmpx>tk.rng/10){tk.done=1;}if(tk.Ek<=0.01){tk.done=1;}tk.pts.push([tk.x,tk.y]);if(tk.x<0||tk.x>W||tk.y<0||tk.y>H||tk.pts.length>1500){tk.done=1;break;}}});
    S.tr=S.tr.filter(t=>t.age<3.2);},
  draw(c,W,H,S,P){c.fillStyle='#05070d';c.fillRect(0,0,W,H);const cmpx=W/20;S.g={W,H,cmpx};
    S.tr.forEach(tk=>{const al=clamp(1-(tk.age-1.6)/1.6,0,1);const w={a:4.5,b:1.4,m:1.1,p:1.4}[tk.ty];c.strokeStyle=`rgba(230,236,245,${al*0.85})`;c.lineWidth=w;c.lineCap='round';c.beginPath();tk.pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
      if(tk.pts.length>4&&tk.age<1.2){const p=tk.pts[Math.min(tk.pts.length-1,8)];txt(c,{a:'α',b:'β⁻',m:'μ',p:'β⁺'}[tk.ty],p[0]+8,p[1]-8,{a:C.red,b:C.accent,m:C.green,p:C.warm}[tk.ty],{font:SMALL});}});
    c.lineCap='butt';if((P.src|0)!==3){c.fillStyle='#5a6378';c.fillRect(W*0.12-14,H*0.55-6,14,12);}
    for(let x=0;x<=W;x+=cmpx*2)line(c,x,H-8,x,H,C.muted,1);txt(c,'2 sm',cmpx*1+2,H-16,C.muted,{font:SMALL});if(P.B>0)txt(c,'B ⊙ '+fmt(P.B,2)+' T',W-12,18,C.violet,{align:'right',font:MATH});},
  read(S,P){const rb=Math.sqrt(1*1+2*1*0.511)/(299.79*Math.max(P.B,1e-6))*100,ra=Math.sqrt(5.3*5.3+2*5.3*3727)/(299.79*2*Math.max(P.B,1e-6))*100;return[['β (1 MeV) iz radiusi',P.B>0?fmt(rb,1)+' sm':'∞'],['α (5,3 MeV) iz radiusi',P.B>0?fmt(ra/100,2)+' m':'∞'],['α havodagi yo‘li','≈ 4 sm'],['Kameradagi izlar',String(S.tr.length)]];}
});

/* 32. Yadro reaksiyalari */
SIMS.push({id:'reaksiya',cat:'yad',title:'Yadro reaksiyalari va energiya chiqishi',short:'Q = (Σm₁ − Σm₂)c²',
  sub:'Yadro reaksiyasida massa soni va zaryad saqlanadi, lekin mahsulotlar massasi boshlang‘ich zarralarnikidan farq qiladi. Bu farq Eynshteyn formulasi bo‘yicha energiyaga aylanadi: 1 u = 931,5 MeV.',
  formula:`<span><i>Q</i> = (<i>m</i><sub>a</sub> + <i>m</i><sub>A</sub> − <i>m</i><sub>b</sub> − <i>m</i><sub>B</sub>)<i>c</i>²</span><span class="alt">Σ<i>A</i> = const, &nbsp;Σ<i>Z</i> = const</span>`,
  text:['Reaksiya energiyasi Q musbat bo‘lsa, energiya ajraladi (ekzotermik reaksiya) va mahsulotlar kinetik energiya oladi. Q manfiy bo‘lsa, reaksiya faqat zarra yetarli kinetik energiyaga ega bo‘lganda boradi. Rezerford 1919-yilda azotni alfa zarralar bilan bombardimon qilib, birinchi sun’iy yadro reaksiyasini amalga oshirgan.','Mahsulotlar impulslari teng va qarama-qarshi (massa markazi sistemasida), shuning uchun yengil zarra energiyaning katta qismini oladi: D + T sintezida neytron 17,6 MeV dan 14,1 MeV ni olib ketadi. Uran bo‘linishida bir reaksiyada taxminan 200 MeV ajraladi — kimyoviy reaksiyadan millionlab marta ko‘p.'],
  legend:[['Q','reaksiya energiyasi, MeV'],['A','massa soni'],['Z','zaryad soni'],['u','atom massa birligi = 931,5 MeV/c²'],['E_k','tushayotgan zarra kinetik energiyasi']],
  tries:['Rezerford reaksiyasida alfa energiyasini 1 MeV ga tushiring: reaksiya bormaydi (Q < 0).','D + T sintezida neytron va alfa energiyalarini solishtiring.','Uran bo‘linishida massa necha foizga kamayadi?'],
  params:[{id:'r',label:'Reaksiya',choices:[[0,'¹⁴N + α → ¹⁷O + p'],[1,'⁹Be + α → ¹²C + n'],[2,'²H + ³H → ⁴He + n'],[3,'⁶Li + n → ⁴He + ³H'],[4,'²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n']],val:0,reset:1},{id:'E',label:'Tushayotgan zarra energiyasi',sym:'E_k',min:0,max:10,step:0.1,val:7.7,unit:'MeV',d:1,reset:1}],
  R:[{a:['α',4.002603,2,4],A:['¹⁴N',14.003074,7,14],p:[['¹⁷O',16.999132,8,17],['p',1.007825,1,1]]},{a:['α',4.002603,2,4],A:['⁹Be',9.012183,4,9],p:[['¹²C',12,6,12],['n',1.008665,0,1]]},{a:['²H',2.014102,1,2],A:['³H',3.016049,1,3],p:[['⁴He',4.002603,2,4],['n',1.008665,0,1]]},{a:['n',1.008665,0,1],A:['⁶Li',6.015123,3,6],p:[['⁴He',4.002603,2,4],['³H',3.016049,1,3]]},{a:['n',1.008665,0,1],A:['²³⁵U',235.04393,92,235],p:[['¹⁴¹Ba',140.914411,56,141],['⁹²Kr',91.926156,36,92],['n',1.008665,0,1],['n',1.008665,0,1],['n',1.008665,0,1]]}],
  calc(P){const r=this.R[P.r|0],mi=r.a[1]+r.A[1],mf=r.p.reduce((s,x)=>s+x[1],0),Q=(mi-mf)*931.494,Eth=Q<0?-Q*(1+r.a[1]/r.A[1]):0,ok=P.E>=Eth;return{r,mi,mf,Q,Eth,ok,Kout:P.E*r.A[1]/(r.a[1]+r.A[1])+Q};},
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt;if(S.t>4.2)S.t=0;},
  draw(c,W,H,S,P){grid(c,W,H,28);const k=this.calc(P),r=k.r,cx=W*0.45,cy=H*0.4,t=S.t,rad=m=>5+Math.cbrt(m)*4.2,col=n=>n==='n'?'#9aa6b8':n==='p'?C.red:n==='α'||n==='⁴He'?C.warm:C.accent;S.g={cx,cy,k};
    const nuc=(x,y,n,m)=>{disk(c,x,y,rad(m),col(n),C.ink);txt(c,n,x,y-rad(m)-9,C.ink,{align:'center',font:SMALL});};
    if(t<1.4){const u=t/1.4;nuc(cx-W*0.38*(1-u),cy,r.a[0],r.a[1]);nuc(cx,cy,r.A[0],r.A[1]);}
    else if(t<1.7){const fl=1-(t-1.4)/0.3;c.fillStyle=`rgba(255,240,180,${fl})`;c.beginPath();c.arc(cx,cy,30+40*(1-fl),0,TAU);c.fill();nuc(cx,cy,'',r.a[1]+r.A[1]);}
    else if(k.ok){const u=(t-1.7),n=r.p.length,Kt=Math.max(k.Kout,0.05);/* impulslar: 2 jismda teng va qarama-qarshi */const pm=r.p.map(x=>x[1]);
      r.p.forEach((pp,i)=>{let ang=n===2?(i?Math.PI+0.5:0.5):(-Math.PI/2+i*TAU/n),v;if(n===2){const m1=pm[0],m2=pm[1],E1=Kt*m2/(m1+m2),E2=Kt*m1/(m1+m2);v=Math.sqrt(2*(i?E2:E1)/pp[1]);}else v=Math.sqrt(2*Kt/n/pp[1]);const vv=Math.min(v*40,220)*u;nuc(cx+Math.cos(ang)*vv,cy-Math.sin(ang)*vv,pp[0],pp[1]);});}
    else{txt(c,'Energiya yetarli emas: reaksiya bormadi',cx,cy+60,C.red,{align:'center',font:MONO});nuc(cx,cy,r.A[0],r.A[1]);nuc(cx-40-(t-1.7)*60,cy,r.a[0],r.a[1]);}
    /* balans jadvali */const tx=24,ty=H*0.72;const fs=[[...[r.a,r.A]],r.p];const rowA=['ΣA',r.a[3]+r.A[3],r.p.reduce((s,x)=>s+x[3],0)],rowZ=['ΣZ',r.a[2]+r.A[2],r.p.reduce((s,x)=>s+x[2],0)],rowM=['Σm, u',fmt(k.mi,5),fmt(k.mf,5)];
    txt(c,'oldin',tx+120,ty,C.muted,{align:'center',font:SMALL});txt(c,'keyin',tx+230,ty,C.muted,{align:'center',font:SMALL});[rowA,rowZ,rowM].forEach((rw,i)=>{txt(c,rw[0],tx,ty+20+i*18,C.ink,{font:SMALL});txt(c,String(rw[1]),tx+120,ty+20+i*18,C.ink,{align:'center',font:SMALL});txt(c,String(rw[2]),tx+230,ty+20+i*18,i<2&&rw[1]===rw[2]?C.green:C.ink,{align:'center',font:SMALL});});
    txt(c,'Q = '+(k.Q>0?'+':'')+fmt(k.Q,2)+' MeV',W-24,ty+20,k.Q>0?C.green:C.red,{align:'right',font:'700 18px "IBM Plex Mono", monospace'});txt(c,k.Q>0?'energiya ajraladi':'energiya yutiladi',W-24,ty+42,C.muted,{align:'right',font:SMALL});},
  read(S,P){const k=this.calc(P);const out=[['Reaksiya energiyasi Q',fmt(k.Q,3)+' MeV'],['Massa farqi',fmt((k.mi-k.mf)*1000,3)+' mu ('+fmt((k.mi-k.mf)/k.mi*100,3)+' %)'],['Bo‘sag‘a energiyasi',k.Q<0?fmt(k.Eth,2)+' MeV':'yo‘q'],['Mahsulotlar kinetik energiyasi',k.ok?fmt(k.Kout,2)+' MeV':'—']];const r=k.r;if(r.p.length===2&&k.ok){const m1=r.p[0][1],m2=r.p[1][1];out.push([r.p[0][0]+' / '+r.p[1][0]+' energiyasi',fmt(k.Kout*m2/(m1+m2),2)+' / '+fmt(k.Kout*m1/(m1+m2),2)+' MeV']);}return out;}
});
