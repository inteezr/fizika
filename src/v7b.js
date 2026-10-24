/* ===== v7: yangi mavzular (2-qism): trm, tok, mag, opt, rel, yad ===== */

/* Adiabatik jarayon */
SIMS.push({id:'adiabata',cat:'trm',title:'Adiabatik jarayon',short:'pV^γ = const',
  sub:'Gaz issiqlik almashmasdan tez siqilsa qiziydi, kengaysa soviydi. p–V diagrammada adiabata izotermadan tikroq o‘tadi. Dizel dvigatelida yoqilg‘i shu qizish hisobiga o‘z-o‘zidan alangalanadi.',
  formula:`<span><i>pV</i><sup><i>γ</i></sup> = const</span><span class="alt"><i>TV</i><sup><i>γ</i>−1</sup> = const, &nbsp;<i>A</i> = −∆<i>U</i></span>`,
  text:['Adiabatik jarayonda Q = 0, shuning uchun birinchi qonundan A = −∆U: gaz bajargan ish uning ichki energiyasi hisobiga. Siqilishda tashqi kuch ishi butunlay ichki energiyaga o‘tadi va harorat ko‘tariladi.','Adiabata ko‘rsatkichi γ = Cp/Cv: bir atomli gaz uchun 5/3, havo (ikki atomli) uchun 1,4. Hajm 16 marta kamaysa, havo harorati 300 K dan taxminan 900 K gacha ko‘tariladi — dizel yoqilg‘isi uchun yetarli.'],
  legend:[['γ','adiabata ko‘rsatkichi Cp/Cv'],['p, V, T','bosim, hajm, harorat'],['A','gazning ishi, J'],['∆U','ichki energiya o‘zgarishi']],
  tries:['Siqish darajasini 16 ga qo‘ying: oxirgi harorat 900 K atrofida.','Bir atomli gazni tanlang: qizish yanada kuchli, chunki γ katta.','p–V diagrammada adiabata va izoterma orasidagi farqni kuzating.'],
  params:[{id:'r',label:'Siqish darajasi V₁/V₂',sym:'ε',min:1.5,max:20,step:0.5,val:10,d:1},{id:'gm',label:'Gaz',choices:[[1.4,'Havo (γ = 1,4)'],[1.667,'Geliy (γ = 5/3)']],val:1.4},{id:'T1',label:'Boshlang‘ich harorat',sym:'T₁',min:250,max:400,step:5,val:300,unit:'K',d:0},{id:'sp',label:'Porshen tezligi',sym:'',min:0.1,max:1,step:0.05,val:0.35,unit:'Hz',d:2}],
  init:()=>({ph:0}),
  step(S,P,dt){S.ph+=dt*P.sp*TAU;},
  st(S,P){const V1=1,V2=1/P.r,s=(1-Math.cos(S.ph))/2,V=V1-(V1-V2)*s,p1=100,p=p1*Math.pow(V1/V,P.gm),T=P.T1*Math.pow(V1/V,P.gm-1);return{V,p,T,V1,V2,p1};},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=SIMS.find(s=>s.id==='adiabata').st(S,P),cx=W*0.2,cw=Math.min(150,W*0.16),ct=50,cb=H-50,yp=ct+(cb-ct)*(1-q.V)*0.92;S.g={cx,cw,ct,cb,yp};
    const h=clamp((q.T-250)/900,0,1),col=`hsl(${220-h*220},80%,55%)`;c.fillStyle=col;c.globalAlpha=0.45;c.fillRect(cx-cw/2,yp,cw,cb-yp);c.globalAlpha=1;
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(cx-cw/2,ct-10);c.lineTo(cx-cw/2,cb);c.lineTo(cx+cw/2,cb);c.lineTo(cx+cw/2,ct-10);c.stroke();c.fillStyle='#9aa6b8';c.fillRect(cx-cw/2+2,yp-16,cw-4,16);c.fillRect(cx-6,ct-40,12,yp-16-ct+40);
    for(let i=0;i<40;i++){const x=cx-cw/2+8+((i*37)%(cw-16)),y=yp+6+((i*53+S.ph*40*(1+h*3))%(cb-yp-12||1));disk(c,x,y,2.4,rgba('ink',0.8));}
    txt(c,fmt(q.T,0)+' K',cx,cb+18,col,{align:'center',font:'700 14px "IBM Plex Mono", monospace'});if(q.T>620&&P.gm<1.5)txt(c,'dizel yoqilg‘isi alangalanadi',cx,cb+36,C.red,{align:'center',font:SMALL});
    const gx=W*0.4,gw=W-gx-30,gt=30,gb=H-40,pm=100*Math.pow(P.r,P.gm)*1.05,XV=V=>gx+V*gw,Yp=p=>gb-Math.pow(p/pm,0.5)*(gb-gt);line(c,gx,gb,gx+gw,gb,C.ink,1);line(c,gx,gb,gx,gt,C.ink,1);txt(c,'V',gx+gw,gb+14,C.muted,{font:MATH,align:'right'});txt(c,'p (√ shkala)',gx+6,gt,C.muted,{font:SMALL});
    c.strokeStyle=rgba('muted',0.8);c.lineWidth=1.5;c.setLineDash([5,4]);c.beginPath();for(let i=0;i<=80;i++){const V=q.V2+(1-q.V2)*i/80,p=100/V;i?c.lineTo(XV(V),Yp(p)):c.moveTo(XV(V),Yp(p));}c.stroke();c.setLineDash([]);txt(c,'izoterma',XV(q.V2)+30,Yp(100/q.V2)+14,C.muted,{font:SMALL});
    c.strokeStyle=C.red;c.lineWidth=2.6;c.beginPath();for(let i=0;i<=80;i++){const V=q.V2+(1-q.V2)*i/80,p=100*Math.pow(1/V,P.gm);i?c.lineTo(XV(V),Yp(p)):c.moveTo(XV(V),Yp(p));}c.stroke();txt(c,'adiabata',XV(q.V2)+6,Yp(100*Math.pow(1/q.V2,P.gm))-10,C.red,{font:SMALL});disk(c,XV(q.V),Yp(q.p),6,C.accent);},
  read(S,P){const q=SIMS.find(s=>s.id==='adiabata').st(S,P),n=0.04,Cv=8.314/(P.gm-1);return[['Hajm V/V₁',fmt(q.V,3)],['Bosim p',fmt(q.p,0)+' kPa'],['Harorat T',fmt(q.T,0)+' K ('+fmt(q.T-273,0)+' °C)'],['Siqilgandagi T₂ = T₁ε^(γ−1)',fmt(P.T1*Math.pow(P.r,P.gm-1),0)+' K'],['Ichki energiya o‘zgarishi (0,04 mol)',fmt(n*Cv*(q.T-P.T1),1)+' J']];}
});

/* Yarimo‘tkazgichli diod */
const DI_T=[{n:'Kremniy',Is:1e-14,nf:1,col:'#8fa3c4'},{n:'Germaniy',Is:1e-6,nf:1,col:'#a6a08a'},{n:'Qizil LED',Is:1e-18,nf:2,col:'#ff4d4d'}];
function diSolve(U,R,d){const Vt=0.02585,a=d.nf*Vt;let V=U>0?Math.min(U,0.6):U;for(let i=0;i<80;i++){const I=d.Is*(Math.exp(Math.min(V/a,80))-1),f=U-V-I*R,fp=-1-d.Is/a*Math.exp(Math.min(V/a,80))*R;const dv=-f/fp;V+=clamp(dv,-0.2,0.2);if(Math.abs(dv)<1e-10)break;}return{V,I:d.Is*(Math.exp(Math.min(V/a,80))-1)};}
SIMS.push({id:'diod',cat:'tok',title:'Yarimo‘tkazgichli diod',short:'p–n o‘tish',
  sub:'p–n o‘tish tokni faqat bir yo‘nalishda yaxshi o‘tkazadi. To‘g‘ri ulanganda to‘siq qatlam torayadi va tok keskin o‘sadi, teskari ulanganda qatlam kengayadi va tok deyarli nol.',
  formula:`<span><i>I</i> = <i>I</i><sub>s</sub>(e<sup><i>U</i>/<i>nU</i><sub>T</sub></sup> − 1)</span><span class="alt"><i>U</i><sub>T</sub> = ${fr('<i>kT</i>','<i>e</i>')} ≈ 26 mV</span>`,
  text:['p-sohada asosiy tashuvchilar — kovaklar (+), n-sohada — elektronlar (−). Ular chegarada uchrashib rekombinatsiyalanadi va tashuvchisiz to‘siq qatlam hosil bo‘ladi. Uning ichki maydoni tashuvchilarning keyingi o‘tishiga qarshilik qiladi.','To‘g‘ri ulanishda (p ga +) tashqi maydon ichki maydonni kamaytiradi, qatlam torayadi va tok eksponensial o‘sadi. Kremniy diod taxminan 0,6–0,7 V da ochiladi. Teskari ulanishda qatlam kengayadi va faqat juda kichik teskari tok o‘tadi. Diod to‘g‘rilagichlar asosida yotadi.'],
  legend:[['I','diod toki, mA'],['I_s','to‘yinish toki'],['U','dioddagi kuchlanish, V'],['n','ideallik koeffitsienti'],['U_T','issiqlik kuchlanishi']],
  tries:['Kuchlanishni manfiy qiling: qatlam kengayadi, tok mikroamperlarda ham emas.','Kremniy va germaniyni solishtiring: germaniy pastroq kuchlanishda ochiladi.','LED ni tanlang: u taxminan 1,8 V da yorisha boshlaydi.'],
  params:[{id:'U',label:'Manba kuchlanishi',sym:'U',min:-5,max:5,step:0.05,val:2,unit:'V',d:2},{id:'R',label:'Rezistor',sym:'R',min:20,max:1000,step:10,val:100,unit:'Ω',d:0},{id:'d',label:'Diod',choices:DI_T.map((d,i)=>[i,d.n]),val:0}],
  init:()=>({cs:Array.from({length:70},(_,i)=>({x:Math.random(),y:Math.random(),p:i%2===0}))}),
  step(S,P,dt){const r=diSolve(P.U,P.R,DI_T[P.d]),w=clamp(0.16*Math.sqrt(Math.max(0.05,(0.75-Math.min(r.V,0.74)))/0.75),0.02,0.4),sp=clamp(r.I*20,0,3);S.w=w;S.cs.forEach(q=>{q.y=(q.y+(Math.random()-0.5)*dt*0.3+1)%1;if(q.p){q.x+=(sp*0.25)*dt+(Math.random()-0.5)*dt*0.1;if(q.x>0.5-w/2&&sp<0.02)q.x=0.5-w/2-Math.random()*0.02;if(q.x>1){q.x=0;}if(q.x<0)q.x=0;}else{q.x-=(sp*0.25)*dt+(Math.random()-0.5)*dt*0.1;if(q.x<0.5+w/2&&sp<0.02)q.x=0.5+w/2+Math.random()*0.02;if(q.x<0)q.x=1;if(q.x>1)q.x=1;}});},
  draw(c,W,H,S,P){grid(c,W,H,28);const d=DI_T[P.d],r=diSolve(P.U,P.R,d),bx=40,bw=W*0.48,by=60,bh=H*0.36,X=x=>bx+x*bw,Y=y=>by+y*bh,w=S.w||0.16;S.g={bx,bw,by,bh};
    c.fillStyle='rgba(255,90,78,0.12)';c.fillRect(X(0),by,bw/2,bh);c.fillStyle='rgba(78,168,255,0.12)';c.fillRect(X(0.5),by,bw/2,bh);c.fillStyle=rgba('panel',0.9);c.fillRect(X(0.5-w/2),by,w*bw,bh);c.strokeStyle=C.ink;c.lineWidth=2;c.strokeRect(bx,by,bw,bh);
    txt(c,'p',X(0.05),by-12,C.red,{font:'700 15px system-ui'});txt(c,'n',X(0.95),by-12,C.accent,{font:'700 15px system-ui',align:'right'});txt(c,'to‘siq qatlam',X(0.5),by+bh+14,C.muted,{align:'center',font:SMALL});
    S.cs.forEach(q=>{if(q.x>0.5-w/2&&q.x<0.5+w/2)return;const x=X(q.x),y=Y(0.05+q.y*0.9);if(q.p){c.strokeStyle='#ff5a4e';c.lineWidth=1.6;c.beginPath();c.arc(x,y,4,0,TAU);c.stroke();}else disk(c,x,y,3.4,'#4ea8ff');});
    const cy=by+bh+70,L=bx,Rx=bx+bw;line(c,L,cy,L,by+bh/2,C.ink,2);line(c,Rx,cy,Rx,by+bh/2,C.ink,2);line(c,L,cy,L+bw*0.3,cy,C.ink,2);line(c,L+bw*0.7,cy,Rx,cy,C.ink,2);
    const bxm=L+bw*0.3;line(c,bxm,cy-12,bxm,cy+12,C.ink,P.U>=0?4:2);line(c,bxm+10,cy-20,bxm+10,cy+20,C.ink,P.U>=0?2:4);line(c,bxm+10,cy,bxm+30,cy,C.ink,2);txt(c,fmt(P.U,2)+' V',bxm+5,cy+30,C.ink,{align:'center',font:SMALL});
    c.strokeStyle=C.ink;c.lineWidth=2;c.strokeRect(bxm+30,cy-8,bw*0.4-30,16);txt(c,P.R+' Ω',bxm+15+bw*0.2,cy+26,C.ink,{align:'center',font:SMALL});
    if(P.d===2&&r.I>0.001){const g=c.createRadialGradient(X(0.5),by+bh/2,0,X(0.5),by+bh/2,40+r.I*2000);g.addColorStop(0,'rgba(255,70,70,0.7)');g.addColorStop(1,'rgba(255,70,70,0)');c.fillStyle=g;c.fillRect(bx,by-40,bw,bh+80);}
    const gx=W*0.6,gw=W-gx-20,gt=40,gb=H-50,Im=0.05,XV=v=>gx+(v+1)/3*gw,YI=i=>gb-(gb-gt)*0.15-(i/Im)*(gb-gt)*0.85;line(c,gx,YI(0),gx+gw,YI(0),C.ink,1);line(c,XV(0),gb,XV(0),gt,C.ink,1);txt(c,'I',XV(0)+6,gt,C.muted,{font:MATH});txt(c,'U_d, V',gx+gw,YI(0)+14,C.muted,{font:SMALL,align:'right'});[-1,0,1,2].forEach(v=>txt(c,v+'',XV(v),YI(0)+14,C.muted,{font:SMALL,align:'center'}));
    c.strokeStyle=d.col;c.lineWidth=2.4;c.beginPath();let st=0;for(let i=0;i<=300;i++){const v=-1+3*i/300,I=d.Is*(Math.exp(Math.min(v/(d.nf*0.02585),80))-1);if(I>Im*1.1)break;st?c.lineTo(XV(v),YI(I)):c.moveTo(XV(v),YI(I));st=1;}c.stroke();
    if(P.R)c.strokeStyle=rgba('muted',0.7),c.lineWidth=1.2,c.setLineDash([4,3]),c.beginPath(),c.moveTo(XV(Math.min(2,P.U)),YI((P.U-Math.min(2,P.U))/P.R)),c.lineTo(XV(-1),YI((P.U+1)/P.R)),c.stroke(),c.setLineDash([]);
    if(r.I<Im*1.1)disk(c,XV(r.V),YI(r.I),6,C.red);txt(c,'yuklama chizig‘i',gx+gw-4,gt+12,C.muted,{align:'right',font:SMALL});},
  read(S,P){const r=diSolve(P.U,P.R,DI_T[P.d]);return[['Ulanish',P.U>=0?'to‘g‘ri (p ga +)':'teskari (p ga −)'],['Dioddagi kuchlanish',fmt(r.V,3)+' V'],['Tok I',Math.abs(r.I)<1e-6?fmt(r.I*1e9,2)+' nA':fmt(r.I*1000,2)+' mA'],['Rezistordagi kuchlanish',fmt(r.I*P.R,2)+' V'],['Diod quvvati',fmt(r.V*r.I*1000,1)+' mW']];}
});

/* Manbaning foydali quvvati */
SIMS.push({id:'quvvat',cat:'tok',title:'Manba quvvati va FIK',short:'P_max: R = r',
  sub:'Manbadan olinadigan foydali quvvat tashqi qarshilikka bog‘liq: u R = r bo‘lganda eng katta bo‘ladi. Lekin bunda manbaning foydali ish koeffitsienti atigi 50%.',
  formula:`<span><i>P</i> = <i>I</i>²<i>R</i> = ${fr('ℰ²<i>R</i>','(<i>R</i> + <i>r</i>)²')}</span><span class="alt"><i>η</i> = ${fr('<i>R</i>','<i>R</i> + <i>r</i>')}, &nbsp;<i>P</i><sub>max</sub> = ${fr('ℰ²','4<i>r</i>')}</span>`,
  text:['To‘liq zanjir uchun Om qonuni: I = ℰ/(R + r). Tashqi qarshilikdagi foydali quvvat P = I²R. R juda kichik bo‘lsa tok katta, lekin kuchlanish deyarli nol; R juda katta bo‘lsa kuchlanish katta, lekin tok kichik. Oraliqda R = r da quvvat maksimum: P_max = ℰ²/4r.','Foydali ish koeffitsienti η = R/(R + r) — manba ichida isrof bo‘ladigan energiya qanchalik kam ekanini ko‘rsatadi. Elektr tarmoqlarida yuqori FIK muhim, shuning uchun yuklama qarshiligi manba ichki qarshiligidan ancha katta qilinadi.'],
  legend:[['ℰ','EYuK, V'],['r','ichki qarshilik, Ω'],['R','tashqi qarshilik, Ω'],['P','foydali quvvat, W'],['η','FIK']],
  tries:['R ni sekin o‘zgartirib, lampochka eng yorug‘ bo‘lgan joyni toping: u R = r da.','R = r da FIK aniq 50% ekanini tekshiring.','Ichki qarshilikni kamaytiring: maksimal quvvat ortadi.'],
  params:[{id:'E',label:'EYuK',sym:'ℰ',min:1.5,max:24,step:0.5,val:12,unit:'V',d:1},{id:'r',label:'Ichki qarshilik',sym:'r',min:0.2,max:10,step:0.1,val:2,unit:'Ω',d:1},{id:'R',label:'Tashqi qarshilik',sym:'R',min:0.1,max:20,step:0.1,val:4,unit:'Ω',d:1}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P,tt){grid(c,W,H,28);const I=P.E/(P.R+P.r),Pw=I*I*P.R,Pm=P.E*P.E/(4*P.r),L=40,Rr=W*0.42,T=70,B=H*0.62;S.g={L,Rr,T,B};
    c.strokeStyle=C.ink;c.lineWidth=2.4;c.strokeRect(L,T,Rr-L,B-T);c.fillStyle=C.canvas;c.fillRect(L-14,(T+B)/2-46,28,92);
    c.fillStyle=rgba('panel',0.95);rrect(c,L-24,(T+B)/2-50,48,100,8);c.fill();c.strokeStyle=C.ink;c.stroke();line(c,L-12,(T+B)/2-14,L+12,(T+B)/2-14,C.ink,4);line(c,L-6,(T+B)/2-4,L+6,(T+B)/2-4,C.ink,2);txt(c,'ℰ, r',L,(T+B)/2+24,C.ink,{align:'center',font:SMALL});
    const lx=(L+Rr)/2,ly=T,br=clamp(Pw/Pm,0,1);const g=c.createRadialGradient(lx,ly,0,lx,ly,30+br*70);g.addColorStop(0,`rgba(255,220,120,${0.15+br*0.75})`);g.addColorStop(1,'rgba(255,200,80,0)');c.fillStyle=g;c.beginPath();c.arc(lx,ly,30+br*70,0,TAU);c.fill();disk(c,lx,ly,16,`rgba(255,${200+br*55},${120+br*80},${0.4+br*0.6})`,C.ink);
    c.fillStyle=rgba('panel',0.95);rrect(c,Rr-12,(T+B)/2-40,24,80,4);c.fill();c.strokeStyle=C.ink;c.stroke();arrow(c,Rr-26,(T+B)/2+30,Rr+26,(T+B)/2-30,C.warm,2);txt(c,'R',Rr+18,(T+B)/2+38,C.warm,{font:MATH});
    const e=(tt*I*0.25)%1,per=2*((Rr-L)+(B-T));for(let i=0;i<24;i++){let s=((i/24+e)%1)*per;let x,y;if(s<Rr-L){x=L+s;y=T;}else if((s-=Rr-L)<B-T){x=Rr;y=T+s;}else if((s-=B-T)<Rr-L){x=Rr-s;y=B;}else{s-=Rr-L;x=L;y=B-s;}disk(c,x,y,2.6,C.accent);}
    const gx=W*0.5,gw=W-gx-20,gt=30,gb=H-40,Rm=20,XR=R=>gx+R/Rm*gw,YP=p=>gb-p/(Pm*1.1)*(gb-gt);line(c,gx,gb,gx+gw,gb,C.ink,1);line(c,gx,gb,gx,gt,C.ink,1);txt(c,'R, Ω',gx+gw,gb+14,C.muted,{font:SMALL,align:'right'});
    c.strokeStyle=C.red;c.lineWidth=2.4;c.beginPath();for(let i=0;i<=200;i++){const R=Rm*i/200,p=P.E*P.E*R/((R+P.r)**2);i?c.lineTo(XR(R),YP(p)):c.moveTo(XR(R),YP(p));}c.stroke();txt(c,'P(R)',XR(Rm)-4,YP(P.E*P.E*Rm/((Rm+P.r)**2))-12,C.red,{align:'right',font:SMALL});
    c.strokeStyle=C.green;c.lineWidth=2;c.beginPath();for(let i=0;i<=200;i++){const R=Rm*i/200,et=R/(R+P.r);i?c.lineTo(XR(R),gb-et*(gb-gt)):c.moveTo(XR(R),gb);}c.stroke();txt(c,'η(R)',XR(Rm)-4,gt+(gb-gt)*(1-Rm/(Rm+P.r))+14,C.green,{align:'right',font:SMALL});
    line(c,XR(P.r),gb,XR(P.r),gt,rgba('muted',0.6),1,[4,3]);txt(c,'R = r',XR(P.r)+4,gt+8,C.muted,{font:SMALL});disk(c,XR(P.R),YP(Pw),6,C.red);disk(c,XR(P.R),gb-P.R/(P.R+P.r)*(gb-gt),5,C.green);},
  read(S,P){const I=P.E/(P.R+P.r);return[['Tok I',fmt(I,2)+' A'],['Qisqichlardagi kuchlanish U',fmt(I*P.R,2)+' V'],['Foydali quvvat P',fmt(I*I*P.R,2)+' W'],['Maksimal quvvat ℰ²/4r',fmt(P.E*P.E/(4*P.r),2)+' W'],['FIK η',fmt(P.R/(P.R+P.r)*100,0)+' %']];}
});

/* Elektromagnit */
SIMS.push({id:'elektromagnit',cat:'mag',title:'Solenoid va elektromagnit',short:'B = μμ₀NI/l',
  sub:'Tokli g‘altak ichida magnit maydon deyarli bir jinsli, tashqarisida esa doimiy magnitnikiga o‘xshaydi. Temir o‘zak maydonni yuzlab marta kuchaytiradi.',
  formula:`<span><i>B</i> = <i>μμ</i>₀${fr('<i>N</i>','<i>l</i>')}<i>I</i></span><span class="alt"><i>μ</i>₀ = 4π·10⁻⁷ H/m</span>`,
  text:['Solenoidning har bir o‘rami halqa tok kabi maydon hosil qiladi. O‘ramlar zich bo‘lsa, ularning maydonlari ichkarida qo‘shilib bir jinsli maydon beradi: B = μ₀NI/l, bu yerda N/l — uzunlik birligidagi o‘ramlar soni.','Temir o‘zak ichidagi atom magnitchalar maydon bo‘ylab tartiblanadi va maydonni μ marta kuchaytiradi. Tok o‘chirilsa, yumshoq temir magnitlanishini yo‘qotadi. Elektromagnitlar kranlarda, rele va qo‘ng‘iroqlarda ishlatiladi.'],
  legend:[['B','magnit induksiya, mT'],['N','o‘ramlar soni'],['l','g‘altak uzunligi, sm'],['I','tok kuchi, A'],['μ','o‘zakning magnit singdiruvchanligi']],
  tries:['Temir o‘zakni qo‘shing: ko‘tarilgan to‘g‘nog‘ichlar soni keskin ortadi.','Tok yo‘nalishini o‘zgartiring: qutblar N va S joy almashadi.','O‘ramlar sonini ikki marta oshiring: B ikki marta ortadi.'],
  params:[{id:'I',label:'Tok kuchi',sym:'I',min:-3,max:3,step:0.1,val:1.5,unit:'A',d:1},{id:'N',label:'O‘ramlar soni',sym:'N',min:50,max:600,step:10,val:300,d:0},{id:'l',label:'Uzunlik',sym:'l',min:5,max:20,step:0.5,val:10,unit:'sm',d:1},{id:'core',label:'O‘zak',choices:[[1,'Havo'],[200,'Temir (μ ≈ 200)']],val:200}],
  init:()=>({clips:Array.from({length:14},(_,i)=>({x:(i%7)/6,y:0,vy:0,on:0}))}),
  B(P){return 4*Math.PI*1e-7*P.core*P.N/(P.l/100)*P.I;},
  step(S,P,dt){const B=Math.abs(SIMS.find(s=>s.id==='elektromagnit').B(P)),nOn=clamp(Math.floor(B/0.05*1),0,14);S.clips.forEach((q,i)=>{const tgt=i<nOn?1:0;q.on+=(tgt-q.on)*Math.min(1,dt*4);});},
  draw(c,W,H,S,P,tt){grid(c,W,H,28);const sim=SIMS.find(s=>s.id==='elektromagnit'),B=sim.B(P),cx=W*0.38,cy=H*0.38,len=Math.min(W*0.45,60+P.l*22),rad=Math.min(H*0.14,60);S.g={cx,cy,len,rad};const sg=Math.sign(P.I)||1;
    /* tashqi maydon chiziqlari */for(let k=1;k<=4;k++){const ry=rad*(0.4+k*0.55),rx=len/2+k*28;c.strokeStyle=rgba('accent',0.35);c.lineWidth=1.3;c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,TAU);c.stroke();}
    for(let k=-2;k<=2;k++){const y=cy+k*rad*0.32;line(c,cx-len/2-10,y,cx+len/2+10,y,rgba('accent',0.8),1.6);const ax=cx+((tt*40*sg)%len+len)%len-len/2;c.fillStyle=C.accent;c.save();c.translate(ax,y);if(sg<0)c.rotate(Math.PI);c.beginPath();c.moveTo(6,0);c.lineTo(-4,-4);c.lineTo(-4,4);c.fill();c.restore();}
    if(P.core>1){c.fillStyle='#6b7486';c.fillRect(cx-len/2-6,cy-rad*0.5,len+12,rad);}
    const nt=Math.min(40,Math.round(P.N/12));for(let i=0;i<nt;i++){const x=cx-len/2+(i+0.5)/nt*len;c.strokeStyle='#d08a3a';c.lineWidth=3;c.beginPath();c.ellipse(x,cy,4,rad*0.75,0,0,TAU);c.stroke();}
    const Nl=sg>0?'N':'S',Sl=sg>0?'S':'N';txt(c,Nl,cx+len/2+52,cy,Nl==='N'?'#e0473c':'#3d7be0',{font:'700 20px system-ui',align:'center'});txt(c,Sl,cx-len/2-52,cy,Sl==='N'?'#e0473c':'#3d7be0',{font:'700 20px system-ui',align:'center'});
    const by=H-30;line(c,cx-len/2-60,by,cx+len/2+60,by,C.ink,2);S.clips.forEach((q,i)=>{const x0=cx+len/2+30,y0=by-6,x1=cx+len/2+12+(i%3)*8,y1=cy-rad*0.45+((i*11)%Math.max(1,rad*0.9)),x=x0+(x1-x0)*q.on+(i%7)*6*(1-q.on),y=y0+(y1-y0)*q.on;c.strokeStyle='#c8d0e0';c.lineWidth=1.6;c.strokeRect(x-3,y-7,6,14);});
    txt(c,'B = '+fmt(Math.abs(B)*1000,1)+' mT',cx,cy-rad-50,C.ink,{align:'center',font:'600 14px system-ui'});},
  read(S,P){const B=SIMS.find(s=>s.id==='elektromagnit').B(P),n=S.clips.filter(q=>q.on>0.5).length;return[['Induksiya B',fmt(Math.abs(B)*1000,2)+' mT'],['O‘ramlar zichligi N/l',fmt(P.N/(P.l/100),0)+' 1/m'],['O‘zak kuchaytirishi',fmt(P.core,0)+' marta'],['Ko‘tarilgan to‘g‘nog‘ichlar',String(n)]];}
});

/* Optik tola */
SIMS.push({id:'tola',cat:'opt',title:'Optik tola',short:'sin α_ch = n₂/n₁',
  sub:'Yorug‘lik tola o‘zagida to‘liq ichki qaytish tufayli ko‘p marta qaytib, deyarli yo‘qotishsiz kilometrlab uzatiladi. Tolaga faqat ma’lum burchakdan kichik burchak bilan kirgan nur ushlab qolinadi.',
  formula:`<span>sin <i>α</i><sub>ch</sub> = ${fr('<i>n</i>₂','<i>n</i>₁')}</span><span class="alt">NA = sin <i>θ</i><sub>max</sub> = √(<i>n</i>₁² − <i>n</i>₂²)</span>`,
  text:['Optik tola ikki qatlamli: sindirish ko‘rsatkichi katta bo‘lgan o‘zak (n₁) va kichikroq qobiq (n₂). O‘zak–qobiq chegarasiga tushish burchagi chegaraviy burchakdan katta bo‘lsa, nur butunlay qaytadi.','Tolaga kirish burchagi θ qancha katta bo‘lsa, ichkaridagi tushish burchagi shuncha kichik bo‘ladi. Shuning uchun kirish burchagi sin θ_max = √(n₁² − n₂²) dan oshmasligi kerak — bu tolaning raqamli aperturasi (NA). Internet ma’lumotlari ana shunday tolalar orqali uzatiladi.'],
  legend:[['n₁','o‘zak sindirish ko‘rsatkichi'],['n₂','qobiq sindirish ko‘rsatkichi'],['α_ch','chegaraviy burchak'],['θ','tolaga kirish burchagi'],['NA','raqamli apertura']],
  tries:['Kirish burchagini θ_max dan oshiring: nur qobiqqa chiqib yo‘qoladi.','n₂ ni n₁ ga yaqinlashtiring: qabul burchagi torayadi.','n₂ = 1 (qobiqsiz shisha) qiling: deyarli istalgan burchak bilan kirgan nur ushlanadi.'],
  params:[{id:'th',label:'Kirish burchagi',sym:'θ',min:0,max:60,step:0.5,val:15,unit:'°',d:1},{id:'n1',label:'O‘zak',sym:'n₁',min:1.4,max:1.7,step:0.005,val:1.5,d:3},{id:'n2',label:'Qobiq',sym:'n₂',min:1,max:1.68,step:0.005,val:1.46,d:3}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P,tt){c.fillStyle=GL.dark?'#05070d':rgba('ink',0.03);c.fillRect(0,0,W,H);grid(c,W,H,28);const n2=Math.min(P.n2,P.n1-0.001),x0=W*0.16,x1=W-30,cy=H*0.45,a=Math.min(70,H*0.13),cl=a+26;S.g={x0,x1,cy,a,cl};
    c.fillStyle=rgba('water',0.1);c.fillRect(x0,cy-cl,x1-x0,2*cl);c.fillStyle=rgba('water',0.25);c.fillRect(x0,cy-a,x1-x0,2*a);line(c,x0,cy-a,x1,cy-a,rgba('water',0.9),1.5);line(c,x0,cy+a,x1,cy+a,rgba('water',0.9),1.5);
    txt(c,'qobiq n₂ = '+fmt(n2,3),x0+8,cy-cl+12,C.muted,{font:SMALL});txt(c,'o‘zak n₁ = '+fmt(P.n1,3),x0+8,cy-a+14,C.water,{font:SMALL});
    const th=P.th*D2R,b=Math.asin(Math.sin(th)/P.n1),ac=Math.asin(n2/P.n1),inc=Math.PI/2-b,ok=inc>ac,sx=x0-160*Math.cos(th),sy=cy-160*Math.sin(th)*0+(-160*Math.sin(th));
    const pts=[[x0-Math.cos(th)*150,cy-Math.sin(th)*150+a*0.0],[x0,cy]];let x=x0,y=cy,dy=1;const tb=Math.tan(b);let lost=null;
    for(let k=0;k<60&&x<x1;k++){const yt=dy<0?cy-a:cy+a,dx=Math.abs(yt-y)/Math.max(tb,1e-6);if(x+dx>x1){pts.push([x1,y+dy*(x1-x)*tb]);x=x1;break;}x+=dx;y=yt;pts.push([x,y]);if(!ok){const ang=Math.asin(Math.min(1,P.n1/n2*Math.sin(Math.PI/2-b)));lost=[x,y,ang,dy];break;}dy=-dy;}
    c.strokeStyle='#3ddc84';c.lineWidth=2.5;c.shadowColor='#3ddc84';c.shadowBlur=10;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
    if(lost){const[lx,ly,ang,dyy]=lost;c.strokeStyle='rgba(61,220,132,0.6)';c.beginPath();c.moveTo(lx,ly);c.lineTo(lx+Math.sin(ang)*120,ly+dyy*Math.cos(ang)*120);c.stroke();}c.shadowBlur=0;
    const off=(tt*0.6)%1,L=pts.length;for(let i=1;i<L;i++){const [ax,ay]=pts[i-1],[bx,by]=pts[i];disk(c,ax+(bx-ax)*off,ay+(by-ay)*off,3,'#c8ffd9');}
    c.strokeStyle=C.warm;c.lineWidth=1.5;c.beginPath();c.arc(x0,cy,40,Math.PI,Math.PI+th);c.stroke();txt(c,'θ',x0-50,cy-14,C.warm,{font:MATH});
    const tm=Math.asin(Math.min(1,Math.sqrt(Math.max(0,P.n1*P.n1-n2*n2))));c.fillStyle='rgba(255,179,71,0.12)';c.beginPath();c.moveTo(x0,cy);c.arc(x0,cy,120,Math.PI-tm,Math.PI+tm);c.closePath();c.fill();txt(c,'qabul konusi',Math.max(4,x0-118),cy+a+20,C.warm,{font:SMALL});
    txt(c,ok?'To‘liq ichki qaytish ✓':'Nur qobiqqa chiqib ketdi',W/2,H-24,ok?C.green:C.red,{align:'center',font:'600 14px system-ui'});},
  read(S,P){const n2=Math.min(P.n2,P.n1-0.001),ac=Math.asin(n2/P.n1),NA=Math.sqrt(Math.max(0,P.n1*P.n1-n2*n2)),b=Math.asin(Math.sin(P.th*D2R)/P.n1);return[['Chegaraviy burchak α_ch',fmt(ac/D2R,1)+'°'],['Ichki tushish burchagi',fmt(90-b/D2R,1)+'°'],['Raqamli apertura NA',fmt(Math.min(1,NA),3)],['Maksimal kirish burchagi',NA>=1?'90° (hammasi)':fmt(Math.asin(NA)/D2R,1)+'°']];}
});

/* Bir vaqtlilikning nisbiyligi */
SIMS.push({id:'birvaqt',cat:'rel',title:'Bir vaqtlilikning nisbiyligi',short:'∆t = γLv/c²',
  sub:'Vagon o‘rtasidagi chiroq chaqnaydi. Vagondagi kuzatuvchi uchun yorug‘lik ikkala devorga bir vaqtda yetadi. Perrondagi kuzatuvchi uchun esa orqa devorga oldinroq yetadi — chunki u yorug‘likka qarab harakatlanmoqda.',
  formula:`<span>∆<i>t</i> = ${fr('<i>γL</i>₀<i>v</i>','<i>c</i>²')}</span><span class="alt"><i>c</i> = const barcha sanoq tizimlarida</span>`,
  text:['Eynshteynning ikkinchi postulati: yorug‘lik tezligi barcha inersial sanoq tizimlarida bir xil. Vagon tizimida chiroq o‘rtada, devorlar tinch — yorug‘lik ikkala devorga bir xil vaqtda yetadi.','Perron tizimida esa vagon harakatlanmoqda: orqa devor yorug‘likka qarab keladi, old devor undan qochadi. Yorug‘lik tezligi baribir c bo‘lgani uchun orqa devorga oldinroq yetadi. Bir tizimda bir vaqtda bo‘lgan voqealar boshqa tizimda bir vaqtda bo‘lmasligi mumkin.'],
  legend:[['v','vagon tezligi (c ulushida)'],['L₀','vagonning xususiy uzunligi'],['γ','Lorens omili'],['∆t','perronda voqealar orasidagi vaqt']],
  tries:['Kuzatuvchini almashtiring: bir xil voqealar boshqacha tartibda ko‘rinadi.','v ni 0 ga yaqinlashtiring: ikkala kuzatuvchi uchun voqealar bir vaqtda.','v = 0,9c da perronda vagon qisqargan ko‘rinishini ham kuzating.'],
  params:[{id:'v',label:'Vagon tezligi',sym:'v',min:0,max:0.9,step:0.01,val:0.6,unit:'c',d:2,reset:1},{id:'fr',label:'Kuzatuvchi',choices:[[0,'Perron'],[1,'Vagon']],val:0,reset:1}],
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt*0.9;const g=1/Math.sqrt(1-P.v*P.v),L=8/(P.fr?1:g),tmax=P.fr?L/2:(L/2)/(1-P.v);if(S.t>tmax+2.2)S.t=0;},
  draw(c,W,H,S,P){c.fillStyle=GL.dark?'#05070d':rgba('ink',0.03);c.fillRect(0,0,W,H);grid(c,W,H,28);const g=1/Math.sqrt(1-P.v*P.v),L0=8,sc=W/22,cy=H*0.5,t=S.t,fr=P.fr;S.g={sc,cy};
    const vw=fr?0:P.v,vp=fr?-P.v:0,L=fr?L0:L0/g,tmx=fr?L/2:(L/2)/(1-P.v),xc=W/2/sc+vw*(t-tmx/2),X=x=>x*sc;
    c.fillStyle=rgba('muted',0.25);c.fillRect(0,cy+70,W,26);for(let k=-2;k<30;k++){const x=((k*2+vp*t)%44+44)%44-2;line(c,X(x),cy+70,X(x),cy+96,rgba('muted',0.5),1);}
    const ox=((W*0.12/sc+vp*t)%(W/sc)+W/sc)%(W/sc);c.fillStyle=C.warm;c.beginPath();c.arc(X(ox),cy+52,9,0,TAU);c.fill();c.fillRect(X(ox)-5,cy+60,10,10);txt(c,'perron',X(ox),cy+108,C.muted,{align:'center',font:SMALL});
    const a=xc-L/2,b=xc+L/2;c.fillStyle=rgba('accent',0.15);c.fillRect(X(a),cy-50,X(b)-X(a),100);c.strokeStyle=C.accent;c.lineWidth=2.5;c.strokeRect(X(a),cy-50,X(b)-X(a),100);
    const xl=fr?0:0,ts=fr?0:0,r=t,xs=fr?xc:(W/2/sc-P.v*tmx/2),hb=fr?r>=L/2:r>=(L/2)/(1+P.v),hf=fr?r>=L/2:r>=(L/2)/(1-P.v);
    [[-1,hb],[1,hf]].forEach(([s,hit])=>{const wx=s<0?a:b,lx=xs+s*r,x=hit?wx:lx;c.strokeStyle='rgba(255,236,140,0.9)';c.lineWidth=3;c.shadowColor='#ffe98c';c.shadowBlur=12;c.beginPath();c.moveTo(X(x),cy-46);c.lineTo(X(x),cy+46);c.stroke();c.shadowBlur=0;if(hit){disk(c,X(wx),cy,14,'rgba(255,236,140,0.9)');}});
    disk(c,X(xc),cy-50,7,'#ffe98c');if(!fr){line(c,X(xs),cy-60,X(xs),cy+60,rgba('warm',0.5),1,[3,3]);txt(c,'chaqnash joyi',X(xs),cy-68,C.warm,{align:'center',font:SMALL});}
    const tb=fr?L/2:(L/2)/(1+P.v),tf=fr?L/2:(L/2)/(1-P.v);txt(c,'orqa devor: t = '+fmt(tb,2)+' s'+(r>=tb?' ✓':''),20,30,C.ink,{font:SMALL});txt(c,'old devor: t = '+fmt(tf,2)+' s'+(r>=tf?' ✓':''),20,48,C.ink,{font:SMALL});txt(c,(fr?'Vagon':'Perron')+' tizimi',W-20,30,C.accent,{align:'right',font:'600 13px system-ui'});},
  read(S,P){const g=1/Math.sqrt(1-P.v*P.v),L0=8;return[['Lorens omili γ',fmt(g,3)],['Vagon tizimida farq',fmt(0,2)+' s'],['Perron tizimida farq ∆t',fmt(g*L0*P.v,2)+' s'],['Perronda vagon uzunligi',fmt(L0/g,2)+' yo‘s']];}
});

/* Termoyadro sintezi */
SIMS.push({id:'termoyadro',cat:'yad',title:'Termoyadro sintezi',short:'²H + ³H → ⁴He + n',
  sub:'Juda yuqori haroratda deyteriy va tritiy yadrolari Kulon itarishini yengib, qo‘shiladi va geliy hosil qiladi. Bunda massa defekti hisobiga 17,6 MeV energiya ajraladi — Quyosh va yulduzlar shunday nur sochadi.',
  formula:`<span>²H + ³H → ⁴He + n + 17,6 MeV</span><span class="alt"><i>E</i> = ∆<i>mc</i>², &nbsp;∆<i>m</i> = 0,0189 u</span>`,
  text:['Yadrolar musbat zaryadli, shuning uchun bir-biriga yaqinlashganda kuchli itariladi (Kulon to‘sig‘i). Yadro kuchlari ta’sir qila boshlashi uchun ular 10⁻¹⁵ m gacha yaqinlashishi kerak. Buning uchun yuz millionlab gradus harorat zarur — modda plazma holatida bo‘ladi.','Hatto bunday haroratda ham to‘siqni faqat eng tez yadrolar (va kvant tunnellash) yengadi, shuning uchun reaksiya tezligi harorat bilan juda keskin o‘sadi. Mahsulotlar massasi boshlang‘ich massadan 0,0189 u kam — shu farq E = mc² bo‘yicha energiyaga aylanadi.'],
  legend:[['²H (D)','deyteriy'],['³H (T)','tritiy'],['⁴He','alfa zarra (3,5 MeV)'],['n','neytron (14,1 MeV)'],['∆m','massa defekti']],
  tries:['Haroratni 10 mln K ga tushiring: reaksiyalar deyarli to‘xtaydi.','Haroratni 150 mln K ga ko‘taring: chaqnashlar ko‘payadi.','Bitta reaksiyada ajralgan energiyani massa defektidan hisoblang: 0,0189 u × 931,5 MeV/u.'],
  params:[{id:'T',label:'Plazma harorati',sym:'T',min:5,max:200,step:5,val:100,unit:'mln K',d:0},{id:'n',label:'Zichlik',sym:'n',min:20,max:120,step:5,val:70,unit:'zarra',d:0,reset:1}],
  init:P=>{const ps=[];for(let i=0;i<P.n;i++)ps.push({x:Math.random(),y:Math.random(),a:Math.random()*TAU,t:i%2});return{ps,pr:[],fx:[],cnt:0,E:0,rate:0};},
  step(S,P,dt){const v=0.12*Math.sqrt(P.T/100);let k=0;S.ps.forEach(p=>{const s=v*(0.5+Math.random());p.x+=Math.cos(p.a)*s*dt;p.y+=Math.sin(p.a)*s*dt;if(p.x<0||p.x>1){p.a=Math.PI-p.a;p.x=clamp(p.x,0,1);}if(p.y<0||p.y>1){p.a=-p.a;p.y=clamp(p.y,0,1);}if(Math.random()<dt*2)p.a+=(Math.random()-0.5);});
    /* Gamov omili: ehtimollik ~ exp(−(T_G/T)^(1/3)) */const pr=Math.exp(-Math.pow(1000/P.T,1/3)*3+3)*dt*0.9;
    for(let i=0;i<S.ps.length;i++){const a=S.ps[i];if(a.t!==0)continue;for(let j=0;j<S.ps.length;j++){const b=S.ps[j];if(b.t!==1)continue;if(Math.abs(a.x-b.x)<0.035&&Math.abs(a.y-b.y)<0.035&&Math.random()<pr*8){S.fx.push({x:(a.x+b.x)/2,y:(a.y+b.y)/2,t:0});const q=Math.random()*TAU;S.pr.push({x:a.x,y:a.y,vx:Math.cos(q)*0.25,vy:Math.sin(q)*0.25,t:'he',l:0},{x:a.x,y:a.y,vx:-Math.cos(q)*0.55,vy:-Math.sin(q)*0.55,t:'n',l:0});
        [a,b].forEach(p=>{p.x=Math.random();p.y=Math.random();});k++;break;}}}
    S.cnt+=k;S.E+=k*17.6;S.rate+=(k/dt-S.rate)*Math.min(1,dt/2);S.pr.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.l+=dt;});S.pr=S.pr.filter(p=>p.l<3&&p.x>-0.2&&p.x<1.2&&p.y>-0.2&&p.y<1.2);S.fx.forEach(f=>f.t+=dt);S.fx=S.fx.filter(f=>f.t<0.6);},
  draw(c,W,H,S,P){c.fillStyle=GL.dark?'#04050b':rgba('ink',0.03);c.fillRect(0,0,W,H);const bx=30,bw=W*0.6,by=30,bh=H-60,X=x=>bx+x*bw,Y=y=>by+y*bh,h=clamp(P.T/200,0,1);S.g={bx,bw,by,bh};
    const g=c.createRadialGradient(X(0.5),Y(0.5),10,X(0.5),Y(0.5),bw*0.7);g.addColorStop(0,`rgba(${150+h*105},${80+h*60},${255-h*80},${0.15+h*0.25})`);g.addColorStop(1,'rgba(40,20,80,0)');c.fillStyle=g;c.fillRect(bx,by,bw,bh);c.strokeStyle=rgba('violet',0.8);c.lineWidth=2;rrect(c,bx,by,bw,bh,18);c.stroke();
    S.ps.forEach(p=>disk(c,X(p.x),Y(p.y),p.t?5:4,p.t?'#3ddc84':'#5fb4ff'));S.pr.forEach(p=>{if(p.t==='he')disk(c,X(p.x),Y(p.y),6,'#ffd23f');else disk(c,X(p.x),Y(p.y),3.5,'#e6e9ef');});
    S.fx.forEach(f=>{const r=8+f.t*70,gg=c.createRadialGradient(X(f.x),Y(f.y),0,X(f.x),Y(f.y),r);gg.addColorStop(0,`rgba(255,250,210,${1-f.t*1.6})`);gg.addColorStop(1,'rgba(255,160,60,0)');c.fillStyle=gg;c.beginPath();c.arc(X(f.x),Y(f.y),r,0,TAU);c.fill();});
    const lx=bx+bw+24;[['#5fb4ff','D — deyteriy (p + n)'],['#3ddc84','T — tritiy (p + 2n)'],['#ffd23f','⁴He — 3,5 MeV'],['#e6e9ef','n — 14,1 MeV']].forEach(([col,t],i)=>{disk(c,lx+6,by+14+i*22,5,col);txt(c,t,lx+18,by+14+i*22,C.ink,{font:SMALL});});
    const gx=lx,gw=W-gx-20,gt=by+120,gb=H-40;txt(c,'Reaksiya tezligi (log)',gx,gt-12,C.muted,{font:SMALL});line(c,gx,gb,gx+gw,gb,C.ink,1);line(c,gx,gb,gx,gt,C.ink,1);const f=T=>Math.exp(-Math.pow(1000/T,1/3)*3+3),fm=Math.log10(f(200)),f0=Math.log10(f(5));
    c.strokeStyle=C.red;c.lineWidth=2;c.beginPath();for(let i=0;i<=60;i++){const T=5+195*i/60,y=gb-(Math.log10(f(T))-f0)/(fm-f0)*(gb-gt);i?c.lineTo(gx+i/60*gw,y):c.moveTo(gx,y);}c.stroke();disk(c,gx+(P.T-5)/195*gw,gb-(Math.log10(f(P.T))-f0)/(fm-f0)*(gb-gt),5,C.accent);txt(c,'T',gx+gw,gb+14,C.muted,{align:'right',font:MATH});},
  read(S,P){return[['Plazma harorati',fmt(P.T,0)+' mln K'],['Yadrolarning o‘rtacha energiyasi',fmt(P.T*1e6*1.5*8.617e-5/1000,1)+' keV'],['Sintez reaksiyalari',String(S.cnt)],['Reaksiyalar tezligi',fmt(S.rate,2)+' /s'],['Ajralgan energiya',fmt(S.E,1)+' MeV']];}
});
