/* ===== v8: yangi mavzular (2-qism): mol, trm, est, tok ===== */

/* zanjir chizish yordamchilari */
function polyLen(pts){let L=0;for(let i=1;i<pts.length;i++)L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);return L;}
function polyAt(pts,s){for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);if(s<=l||i===pts.length-1){const u=l?clamp(s/l,0,1):0;return[pts[i-1][0]+(pts[i][0]-pts[i-1][0])*u,pts[i-1][1]+(pts[i][1]-pts[i-1][1])*u];}s-=l;}return pts[pts.length-1];}
function wireP(c,pts,col,lw=2.2){c.strokeStyle=col||C.ink;c.lineWidth=lw;c.setLineDash([]);c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();}
function flowDots(c,pts,ph,I,col,gap=26){if(Math.abs(I)<1e-4)return;const L=polyLen(pts),o=((ph%gap)+gap)%gap;for(let s=o;s<L;s+=gap){const p=polyAt(pts,I>0?s:L-s);disk(c,p[0],p[1],3,col||C.warm);}}
function resH(c,x,y,w,lab,col){c.fillStyle=rgba('panel',1);c.fillRect(x-w/2,y-9,w,18);c.strokeStyle=col||C.ink;c.lineWidth=2;c.strokeRect(x-w/2,y-9,w,18);if(lab)txt(c,lab,x,y-18,col||C.ink,{align:'center',font:SMALL});}
function resV(c,x,y,h,lab,col){c.fillStyle=rgba('panel',1);c.fillRect(x-9,y-h/2,18,h);c.strokeStyle=col||C.ink;c.lineWidth=2;c.strokeRect(x-9,y-h/2,18,h);if(lab)txt(c,lab,x+16,y,col||C.ink,{font:SMALL});}
function cellV(c,x,y,lab,up=1){c.fillStyle=rgba('panel',1);c.fillRect(x-16,y-10,32,20);line(c,x-16,y-5*up,x+16,y-5*up,C.ink,2.5);line(c,x-8,y+5*up,x+8,y+5*up,C.ink,5);txt(c,'+',x+20,y-6*up,C.red,{font:SMALL});if(lab)txt(c,lab,x+26,y+6,C.ink,{font:SMALL});}

/* 13. Van-der-Vaals tenglamasi */
SIMS.push({id:'vandervaals',cat:'mol',title:'Real gaz: Van-der-Vaals tenglamasi',short:'(p + a/V²)(V − b) = RT',
  sub:'Real gaz molekulalari o‘zaro tortishadi va o‘z hajmiga ega. Shuning uchun past haroratda siqilgan gaz suyuqlikka aylanadi. Kritik haroratdan yuqorida esa hech qanday bosim gazni suyultira olmaydi.',
  formula:`<span>(<i>p</i> + ${fr('<i>a</i>','<i>V</i>²')})(<i>V</i> − <i>b</i>) = <i>RT</i></span><span class="alt"><i>T</i><sub>k</sub> = ${fr('8<i>a</i>','27<i>Rb</i>')}, &nbsp;<i>p</i><sub>k</sub> = ${fr('<i>a</i>','27<i>b</i>²')}</span>`,
  text:['Ideal gaz tenglamasiga ikki tuzatish kiritiladi: a/V² — molekulalarning o‘zaro tortishishi tufayli devorga bosim kamayishi, b — molekulalarning o‘z hajmi. Grafikda karbonat angidrid (CO₂) uchun izotermalar ko‘rsatilgan.','Kritik haroratdan (31 °C) past haroratda izotermada gorizontal qism paydo bo‘ladi: bu yerda gaz va suyuqlik birga mavjud, siqish bosimni oshirmaydi — gaz suyuqlikka aylanadi. Gorizontal chiziq Maksvell qoidasi bo‘yicha, ikkala «to‘lqin» yuzasi teng bo‘ladigan qilib o‘tkaziladi.'],
  legend:[['p','bosim, MPa'],['V','1 mol hajmi, sm³'],['a','tortishish tuzatmasi, Pa·m⁶/mol²'],['b','molekulalar hajmi tuzatmasi, m³/mol'],['T_k','kritik harorat, K']],
  tries:['T = 280 K da hajmni kamaytiring: gorizontal qismda idishda suyuqlik paydo bo‘ladi.','T = 320 K (kritikdan yuqori) qiling: endi gaz siqilganda suyuqlik hosil bo‘lmaydi.','Katta hajmlarda real va ideal gaz izotermalari ustma-ust tushishini ko‘ring.'],
  params:[{id:'T',label:'Harorat',sym:'T',min:250,max:340,step:1,val:285,unit:'K',d:0},{id:'V',label:'Hajm (1 mol)',sym:'V',min:60,max:800,step:2,val:300,unit:'sm³',d:0}],
  A:0.364,B:4.27e-5,R:8.314,
  p(V,T){return this.R*T/(V-this.B)-this.A/(V*V);},
  coex(T){const Tc=8*this.A/(27*this.R*this.B);if(T>=Tc-0.05)return null;const k=this.R*T,a=this.A,b=this.B;
    let lo=-1e9,hi=-1e9;/* lokal minimum va maksimum */const vs=[];for(let i=0;i<=600;i++){vs.push(b*1.05*Math.pow(200,i/600));}let pmin=Infinity,pmax=-Infinity,state=0;for(let i=1;i<vs.length-1;i++){const p0=this.p(vs[i-1],T),p1=this.p(vs[i],T),p2=this.p(vs[i+1],T);if(p1<p0&&p1<p2)pmin=p1;if(p1>p0&&p1>p2)pmax=p1;}
    if(!isFinite(pmin)||!isFinite(pmax))return null;const roots=ps=>{const r=[];for(let i=1;i<vs.length;i++){const f0=this.p(vs[i-1],T)-ps,f1=this.p(vs[i],T)-ps;if(f0*f1<=0){let x0=vs[i-1],x1=vs[i];for(let k2=0;k2<50;k2++){const m=(x0+x1)/2;((this.p(x0,T)-ps)*(this.p(m,T)-ps)<=0)?x1=m:x0=m;}r.push((x0+x1)/2);}}return r;};
    let a1=Math.max(pmin,1),a2=pmax,ps=0,vl=0,vg=0;for(let it=0;it<60;it++){ps=(a1+a2)/2;const r=roots(ps);if(r.length<2)break;vl=r[0];vg=r[r.length-1];const area=k*Math.log((vg-b)/(vl-b))+a*(1/vg-1/vl)-ps*(vg-vl);area>0?a1=ps:a2=ps;}
    return{ps,vl,vg};},
  init:()=>({t:0,mol:null}),
  step(S,P,dt){S.t+=dt;if(!S.mol){S.mol=[];for(let i=0;i<70;i++)S.mol.push({x:Math.random(),y:Math.random(),vx:Math.random()-0.5,vy:Math.random()-0.5});}const sp=Math.sqrt(P.T/280)*0.6;S.mol.forEach(m=>{m.x+=m.vx*sp*dt;m.y+=m.vy*sp*dt;if(m.x<0||m.x>1){m.vx*=-1;m.x=clamp(m.x,0,1);}if(m.y<0||m.y>1){m.vy*=-1;m.y=clamp(m.y,0,1);}});},
  state(P){const V=P.V*1e-6,co=this.coex(P.T);if(co&&V>co.vl&&V<co.vg){const xg=(V-co.vl)/(co.vg-co.vl);return{p:co.ps,two:1,xg,co};}if(co&&V<=co.vl)return{p:this.p(V,P.T),liq:1,co};return{p:this.p(V,P.T),co};},
  draw(c,W,H,S,P){grid(c,W,H,28);const st=this.state(P),Tc=8*this.A/(27*this.R*this.B);
    /* idish */const cx=36,cw=W*0.2,cb=H-40,ct=60,top=cb-(cb-ct)*(P.V/800);S.g={cx,cw,cb,top,st};
    c.strokeStyle=C.ink;c.lineWidth=2;c.beginPath();c.moveTo(cx,ct-10);c.lineTo(cx,cb);c.lineTo(cx+cw,cb);c.lineTo(cx+cw,ct-10);c.stroke();c.fillStyle='#5a6378';c.fillRect(cx+2,top-12,cw-4,12);line(c,cx+cw/2,top-12,cx+cw/2,ct-30,C.ink,4);
    const lf=st.two?(1-st.xg)*st.co.vl/(P.V*1e-6):st.liq?1:0;const lh=(cb-top)*Math.min(1,lf*(st.two?1:1));
    if(lf>0){c.fillStyle='rgba(90,160,255,0.55)';c.fillRect(cx+2,cb-lh,cw-4,lh);}
    if(!st.liq&&S.mol){const gh=cb-lh-top;S.mol.forEach(m=>disk(c,cx+4+m.x*(cw-8),top+3+m.y*Math.max(0,gh-6),2.6,C.warm));}
    txt(c,st.two?'gaz + suyuqlik':st.liq?'suyuqlik':P.T>Tc?'gaz (kritikdan yuqori)':'gaz',cx+cw/2,cb+16,C.ink,{align:'center',font:SMALL});
    /* grafik */const gx=cx+cw+60,gw=W-gx-24,gt=30,gh=H-80,pm=12;const isoP=(T)=>{const o=[];for(let i=0;i<=220;i++){const V=(55+i*745/220)*1e-6;o.push([V*1e6,this.p(V,T)/1e6]);}return o;};
    const lines=[];[260,280,300,304.2,320,340].forEach(T=>lines.push([isoP(T),rgba('muted',0.35),1]));
    const cur=isoP(P.T),co=st.co;let curL=cur;if(co){curL=cur.map(([v,p])=>v>co.vl*1e6&&v<co.vg*1e6?[v,co.ps/1e6]:[v,p]);lines.push([cur,rgba('accent',0.45),1.2,[4,4]]);}
    lines.push([cur.map(([v])=>[v,this.R*P.T/(v*1e-6)/1e6]),rgba('green',0.6),1.2,[6,4]]);lines.push([curL,C.accent,2.6]);
    const G=gplot(c,gx,gt,gw,gh,{x0:50,x1:800,y0:0,y1:pm,xt:100,yt:2,xl:'V, sm³',yl:'p, MPa',lines,marks:[[P.V,st.p/1e6,C.warm]]});
    disk(c,G.X(3*this.B*1e6),G.Y(this.A/(27*this.B*this.B)/1e6),4,C.red);txt(c,'K',G.X(3*this.B*1e6)+8,G.Y(this.A/(27*this.B*this.B)/1e6)-8,C.red,{font:SMALL});txt(c,'— ideal gaz',gx+gw-6,gt+10,C.green,{align:'right',font:SMALL});},
  read(S,P){const st=this.state(P),Tc=8*this.A/(27*this.R*this.B),pid=this.R*P.T/(P.V*1e-6);return[['Bosim p',fmt(st.p/1e6,2)+' MPa'],['Ideal gaz bosimi',fmt(pid/1e6,2)+' MPa'],['Kritik harorat T_k',fmt(Tc,1)+' K'],['Kritik bosim p_k',fmt(this.A/(27*this.B*this.B)/1e6,2)+' MPa'],['Holat',st.two?'gaz + suyuqlik ('+fmt(st.xg*100,0)+' % gaz)':st.liq?'suyuqlik':'gaz']];}
});

/* 14. Qaynash harorati va bosim */
SIMS.push({id:'qaynashbosim',cat:'mol',title:'Qaynash harorati bosimga bog‘liq',short:'ln(p₂/p₁) = −(L/R)(1/T₂ − 1/T₁)',
  sub:'Suv to‘yingan bug‘ bosimi tashqi bosimga tenglashganda qaynaydi. Tog‘da havo bosimi past, shuning uchun suv 100 °C dan ancha past haroratda qaynaydi. Bosimli qozonda esa aksincha — 120 °C gacha.',
  formula:`<span>ln${fr('<i>p</i>','<i>p</i>₀')} = −${fr('<i>L</i>','<i>R</i>')}(${fr('1','<i>T</i>')} − ${fr('1','<i>T</i>₀')})</span><span class="alt"><i>p</i> = <i>p</i>₀<i>e</i><sup>−<i>Mgh</i>/<i>RT</i></sup></span>`,
  text:['Suyuqlik ichida pufakchalar hosil bo‘lishi uchun ulardagi to‘yingan bug‘ bosimi tashqi bosimdan kichik bo‘lmasligi kerak. To‘yingan bug‘ bosimi harorat bilan tez ortadi (Klauzius–Klapeyron tenglamasi), shuning uchun tashqi bosim kamaysa, qaynash harorati ham pasayadi.','Atmosfera bosimi balandlik ortishi bilan taxminan har 8 km da e marta kamayadi. Everest cho‘qqisida suv taxminan 70 °C da qaynaydi — bunday suvda go‘sht pishmaydi. Bosimli qozonda qopqoq ostidagi bosim taxminan 2 atm, suv 120 °C da qaynaydi va ovqat tez pishadi.'],
  legend:[['p','tashqi bosim, kPa'],['T','qaynash harorati'],['L','molyar bug‘lanish issiqligi, 40,7 kJ/mol'],['h','dengiz sathidan balandlik, m']],
  tries:['Balandlikni 8848 m (Everest) qiling: suv necha gradusda qaynaydi?','Bosimli qozonni yoqing: dengiz sathida qaynash harorati 120 °C ga yaqinlashadi.','Toshkent (455 m) va Chimyon (1600 m) dagi qaynash haroratlarini solishtiring.'],
  params:[{id:'h',label:'Dengiz sathidan balandlik',sym:'h',min:0,max:8848,step:50,val:0,unit:'m',d:0},{id:'qz',label:'Idish',choices:[[0,'Ochiq qozon'],[1,'Bosimli qozon (+1 atm)']],val:0}],
  pr(P){return 101.325*Math.exp(-0.02896*9.81*P.h/(8.314*288))+(P.qz?101.3:0);},
  Tb(p){const L=40700,R=8.314;return 1/(1/373.15-R/L*Math.log(p/101.325));},
  init:()=>({t:0,bub:[],T:20}),
  step(S,P,dt){const Tb=this.Tb(this.pr(P))-273.15;S.t+=dt;S.T+=(Tb+0.0001-S.T)*Math.min(1,dt*0.6);if(S.T>Tb-0.6&&Math.random()<dt*40)S.bub.push({x:Math.random(),y:1,r:2+Math.random()*4});S.bub.forEach(b=>{b.y-=dt*0.6*(1+b.r/4);b.r+=dt*2;});S.bub=S.bub.filter(b=>b.y>0);},
  draw(c,W,H,S,P){grid(c,W,H,28);const p=this.pr(P),Tb=this.Tb(p)-273.15;const px=40,pw=W*0.3,pb=H-60,pt=H*0.4;S.g={px,pw,pb,pt,Tb};
    /* tog‘ */c.fillStyle=rgba('muted',0.14);c.beginPath();c.moveTo(0,H*0.42);c.lineTo(W*0.18,H*0.12);c.lineTo(W*0.3,H*0.3);c.lineTo(W*0.42,H*0.06);c.lineTo(W*0.56,H*0.42);c.closePath();c.fill();
    c.fillStyle='rgba(60,140,255,0.45)';c.fillRect(px,pt+20,pw,pb-pt-20);c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(px,pt);c.lineTo(px,pb);c.lineTo(px+pw,pb);c.lineTo(px+pw,pt);c.stroke();
    if(P.qz){c.fillStyle='#5a6378';c.fillRect(px-6,pt-12,pw+12,12);disk(c,px+pw/2,pt-18,6,C.red);}
    S.bub.forEach(b=>{c.strokeStyle='rgba(220,240,255,0.85)';c.lineWidth=1.2;c.beginPath();c.arc(px+6+b.x*(pw-12),pt+20+b.y*(pb-pt-26),b.r,0,TAU);c.stroke();});
    for(let k=0;k<5;k++){const x=px+pw*0.12+k*pw*0.19,fl=6+4*Math.sin(S.t*12+k);c.fillStyle='rgba(255,140,40,0.85)';c.beginPath();c.moveTo(x-7,pb+18);c.lineTo(x,pb+4-fl);c.lineTo(x+7,pb+18);c.fill();}
    const tx=px+pw+30;c.strokeStyle=C.ink;c.lineWidth=1.5;rrect(c,tx-6,pt-40,12,pb-pt+30,6);c.stroke();const th=(clamp(S.T,0,130)/130)*(pb-pt+20);c.fillStyle=C.red;c.fillRect(tx-3,pb-10-th,6,th);disk(c,tx,pb-4,9,C.red);txt(c,fmt(S.T,1)+' °C',tx+14,pb-10-th,C.red,{font:SMALL});
    const gx=W*0.56,gw=W*0.4,gt=30,gh=H-90,pts=[];for(let T=60;T<=130;T+=1){pts.push([T,101.325*Math.exp(-40700/8.314*(1/(T+273.15)-1/373.15))]);}
    const G=gplot(c,gx,gt,gw,gh,{x0:60,x1:130,y0:0,y1:280,xt:10,yt:50,xl:'T, °C',yl:'p, kPa',lines:[[pts,C.accent,2.4],[[[60,p],[130,p]],rgba('warm',0.7),1.2,[4,4]]],marks:[[Tb,p,C.warm]]});txt(c,'to‘yingan bug‘ bosimi',G.X(64),G.Y(pts[0][1])-12,C.accent,{font:SMALL});},
  read(S,P){const p=this.pr(P),Tb=this.Tb(p)-273.15;return[['Tashqi bosim',fmt(p,1)+' kPa'],['Qaynash harorati',fmt(Tb,1)+' °C'],['Dengiz sathiga nisbatan',fmt(Tb-100,1)+' °C'],['Suv harorati hozir',fmt(S.T,1)+' °C']];}
});

/* 15. Issiqlik o‘tkazuvchanlik */
SIMS.push({id:'issiqlikotk',cat:'trm',title:'Issiqlik o‘tkazuvchanlik va devor izolyatsiyasi',short:'q = λΔT/d',
  sub:'Uy devoridan issiqlik issiq tomondan sovuq tomonga o‘tadi. Issiqlik oqimi harorat farqiga to‘g‘ri, devor qalinligiga teskari proporsional. Bir necha santimetr penoplast issiqlik yo‘qotishini bir necha marta kamaytiradi.',
  formula:`<span><i>q</i> = ${fr('Δ<i>T</i>','<i>R</i>')}, &nbsp;<i>R</i> = ${fr('<i>d</i>₁','<i>λ</i>₁')} + ${fr('<i>d</i>₂','<i>λ</i>₂')}</span><span class="alt"><i>P</i> = <i>qS</i></span>`,
  text:['Fure qonuniga ko‘ra issiqlik oqimining zichligi q = λ·ΔT/d, bu yerda λ — moddaning issiqlik o‘tkazuvchanligi. Metallar issiqlikni yaxshi o‘tkazadi (misda λ ≈ 400 W/(m·K)), havo va g‘ovak moddalar yomon (penoplastda 0,035 W/(m·K)).','Ko‘p qatlamli devorda qatlamlarning issiqlik qarshiliklari R = d/λ qo‘shiladi, xuddi ketma-ket ulangan rezistorlar kabi. Har bir qatlamda harorat chiziqli o‘zgaradi; λ kichik bo‘lgan qatlamda harorat keskin tushadi.'],
  legend:[['λ','issiqlik o‘tkazuvchanlik koeffitsiyenti, W/(m·K)'],['d','qatlam qalinligi'],['R','issiqlik qarshiligi, m²·K/W'],['q','issiqlik oqimi zichligi, W/m²'],['S','devor yuzasi, 20 m²']],
  tries:['Izolyatsiyasiz g‘isht devor uchun quvvatni yozing, so‘ng 10 sm penoplast qo‘shing.','Devor materialini betonga almashtiring: yo‘qotish ortadi.','Qatlamlar chegarasidagi harorat 0 °C dan past bo‘lsa, devor ichida namlik muzlaydi.'],
  params:[{id:'mat',label:'Devor materiali',choices:[[0,'G‘isht'],[1,'Beton'],[2,'Yog‘och'],[3,'Gazoblok']],val:0},{id:'d1',label:'Devor qalinligi',sym:'d₁',min:5,max:60,step:1,val:38,unit:'sm',d:0},{id:'d2',label:'Penoplast qalinligi',sym:'d₂',min:0,max:20,step:0.5,val:0,unit:'sm',d:1},{id:'Ti',label:'Xona harorati',sym:'T_ich',min:15,max:28,step:1,val:22,unit:'°C',d:0},{id:'To',label:'Tashqi harorat',sym:'T_tash',min:-30,max:10,step:1,val:-10,unit:'°C',d:0}],
  LAM:[0.7,1.7,0.15,0.12],
  calc(P){const l1=this.LAM[P.mat|0],R1=P.d1/100/l1,R2=P.d2/100/0.035,Rs=0.16,R=R1+R2+Rs,q=(P.Ti-P.To)/R,Tw=P.Ti-q*0.12,Tm=Tw-q*R1;return{l1,R1,R2,R,q,Tw,Tm,To2:Tm-q*R2};},
  init:()=>({ph:0,dots:[]}),
  step(S,P,dt){const q=this.calc(P).q;S.ph+=dt;if(Math.random()<dt*q*0.6)S.dots.push({x:0,y:Math.random()});S.dots.forEach(d=>d.x+=dt*0.25);S.dots=S.dots.filter(d=>d.x<1);},
  draw(c,W,H,S,P){grid(c,W,H,28);const k=this.calc(P),top=40,bot=H-90,wl=W*0.3,tot=(P.d1+P.d2),sc=Math.min(6,(W*0.4)/Math.max(tot,30)),w1=P.d1*sc,w2=P.d2*sc,wr=wl+w1+w2,TY=T=>bot-(T+35)/70*(bot-top);S.g={top,bot,wl,w1,w2};
    c.fillStyle='rgba(255,170,90,0.12)';c.fillRect(0,top,wl,bot-top);c.fillStyle='rgba(120,180,255,0.12)';c.fillRect(wr,top,W-wr,bot-top);
    c.fillStyle=['#a0523d','#7d8592','#9c6b3c','#c9c3b5'][P.mat|0];c.fillRect(wl,top,w1,bot-top);if(P.mat==0){c.strokeStyle='rgba(0,0,0,0.25)';c.lineWidth=1;for(let y=top;y<bot;y+=14){line(c,wl,y,wl+w1,y,'rgba(0,0,0,0.25)',1);}}
    if(w2>0){c.fillStyle='#e8eef5';c.fillRect(wl+w1,top,w2,bot-top);}
    S.dots.forEach(d=>{const x=d.x*W;disk(c,x,top+d.y*(bot-top),2.5,`rgba(255,${180-d.x*120},80,${1-d.x})`);});
    c.strokeStyle=C.red;c.lineWidth=3;c.beginPath();c.moveTo(0,TY(P.Ti));c.lineTo(wl-26,TY(P.Ti));c.lineTo(wl,TY(k.Tw));c.lineTo(wl+w1,TY(k.Tm));c.lineTo(wr,TY(k.To2));c.lineTo(wr+14,TY(P.To));c.lineTo(W,TY(P.To));c.stroke();
    [[wl,k.Tw],[wl+w1,k.Tm],[wr,k.To2]].forEach(([x,T])=>{disk(c,x,TY(T),4,C.red);});txt(c,fmt(k.Tm,1)+' °C',wl+w1+4,TY(k.Tm)-12,C.red,{font:SMALL});
    txt(c,'xona '+P.Ti+' °C',12,top+14,C.warm,{font:SMALL});txt(c,'tashqari '+P.To+' °C',W-12,top+14,C.accent,{align:'right',font:SMALL});
    const P20=k.q*20;arrow(c,wl-80,bot+30,wr+80,bot+30,C.warm,Math.min(10,1.5+k.q/8),'');txt(c,'q = '+fmt(k.q,1)+' W/m²  ·  20 m² devor: '+fmt(P20,0)+' W',W/2,bot+56,C.ink,{align:'center',font:SMALL});},
  read(S,P){const k=this.calc(P);return[['Devor λ',fmt(k.l1,2)+' W/(m·K)'],['Issiqlik qarshiligi R',fmt(k.R,2)+' m²·K/W'],['Issiqlik oqimi q',fmt(k.q,1)+' W/m²'],['20 m² devordan yo‘qotish',fmt(k.q*20,0)+' W'],['Devor va penoplast chegarasida',fmt(k.Tm,1)+' °C']];}
});

/* 16. Sovitgich va issiqlik nasosi */
SIMS.push({id:'sovitgich',cat:'trm',title:'Sovitgich va issiqlik nasosi',short:'ε = Q_s/A ≤ T_s/(T_i − T_s)',
  sub:'Sovitgich ish bajarib, issiqlikni sovuq kameradan issiq xonaga «haydaydi». Kompressor sarflagan ishdan bir necha marta ko‘p issiqlik ko‘chiriladi. Issiqlik nasosi xuddi shu sikl bilan uyni isitadi.',
  formula:`<span><i>Q</i><sub>i</sub> = <i>Q</i><sub>s</sub> + <i>A</i></span><span class="alt"><i>ε</i><sub>max</sub> = ${fr('<i>T</i><sub>s</sub>','<i>T</i><sub>i</sub> − <i>T</i><sub>s</sub>')}</span>`,
  text:['Sovituvchi modda (freon) bug‘lantirgichda past bosimda bug‘lanib, kameradan Q_s issiqlik oladi. Kompressor bug‘ni siqadi (ish A), u qiziydi va kondensatorda (orqadagi panjara) xonaga Q_i = Q_s + A issiqlik beradi, so‘ng drossel orqali yana bug‘lantirgichga qaytadi.','Termodinamikaning ikkinchi qonuniga ko‘ra issiqlik o‘z-o‘zidan sovuqdan issiqqa o‘tmaydi — buning uchun ish kerak. Sovutish koeffitsiyentining eng katta (Karno) qiymati T_s/(T_i − T_s). Harorat farqi qancha kichik bo‘lsa, sovitgich shuncha samarali. Haqiqiy qurilmalar Karno qiymatining taxminan yarmiga erishadi.'],
  legend:[['Q_s','sovuq tomondan olingan issiqlik'],['Q_i','issiq tomonga berilgan issiqlik'],['A','kompressor ishi'],['ε','sovutish koeffitsiyenti (COP)'],['T_s, T_i','sovuq va issiq tomon haroratlari']],
  tries:['Muzlatgich haroratini −18 °C dan −30 °C ga tushiring: COP qanday o‘zgaradi?','Issiqlik nasosi rejimida 1 kW elektrdan uyga necha kW issiqlik kiradi?','Tashqi harorat −20 °C bo‘lganda issiqlik nasosining samaradorligini tekshiring.'],
  params:[{id:'md',label:'Qurilma',choices:[[0,'Sovitgich'],[1,'Issiqlik nasosi']],val:0},{id:'Tc',label:'Sovuq tomon harorati',sym:'T_s',min:-30,max:15,step:1,val:-18,unit:'°C',d:0},{id:'Th',label:'Issiq tomon harorati',sym:'T_i',min:20,max:60,step:1,val:35,unit:'°C',d:0},{id:'A',label:'Kompressor quvvati',sym:'N',min:50,max:2000,step:10,val:150,unit:'W',d:0}],
  calc(P){const Tc=P.Tc+273.15,Th=P.Th+273.15,ec=Tc/(Th-Tc),e=0.5*ec,Qc=e*P.A,Qh=Qc+P.A;return{ec,e,Qc,Qh,hp:Qh/P.A,hpc:Th/(Th-Tc)};},
  init:()=>({ph:0}),
  step(S,P,dt){S.ph+=dt*40;},
  draw(c,W,H,S,P){grid(c,W,H,28);const k=this.calc(P),hp=P.md==1,L=W*0.18,R=W*0.62,T=60,B=H-70;S.g={L,R,T,B};
    c.fillStyle='rgba(90,160,255,0.12)';c.fillRect(L-60,T-30,(R-L)/2+40,B-T+60);c.fillStyle='rgba(255,140,80,0.12)';c.fillRect((L+R)/2,T-30,R-(L+R)/2+60,B-T+60);
    txt(c,hp?'ko‘cha (sovuq)':'muzlatgich kamerasi',L-50,T-16,C.accent,{font:SMALL});txt(c,hp?'uy (issiq)':'xona (issiq)',R+50,T-16,C.warm,{align:'right',font:SMALL});
    const loop=[[L,T],[R,T],[R,B],[L,B],[L,T]];wireP(c,loop,rgba('muted',0.8),5);
    for(let i=0;i<6;i++){const y=T+20+i*(B-T-40)/5;c.strokeStyle=C.accent;c.lineWidth=3;c.beginPath();c.moveTo(L-14,y);c.lineTo(L+14,y);c.stroke();c.strokeStyle=C.warm;c.beginPath();c.moveTo(R-14,y);c.lineTo(R+14,y);c.stroke();}
    const L2=polyLen(loop),s1=(R-L)/2,s2=(R-L)*1.5+(B-T);for(let s=(S.ph%30);s<L2;s+=30){const p=polyAt(loop,s),hot=s>s1&&s<s2;disk(c,p[0],p[1],4,hot?C.red:C.accent);}
    c.fillStyle='#3a4252';rrect(c,(L+R)/2-34,T-24,68,48,8);c.fill();c.strokeStyle=C.ink;c.lineWidth=1.5;c.stroke();txt(c,'kompressor',(L+R)/2,T+38,C.ink,{align:'center',font:SMALL});
    c.fillStyle='#3a4252';c.beginPath();c.moveTo((L+R)/2-12,B-12);c.lineTo((L+R)/2+12,B+12);c.lineTo((L+R)/2+12,B-12);c.lineTo((L+R)/2-12,B+12);c.closePath();c.fill();txt(c,'drossel',(L+R)/2,B+26,C.ink,{align:'center',font:SMALL});
    const sc=60/Math.max(k.Qh,1);arrow(c,L-60,(T+B)/2,L-18,(T+B)/2,C.accent,Math.max(2,k.Qc*sc*0.12),'Q_s');arrow(c,R+18,(T+B)/2,R+70,(T+B)/2,C.warm,Math.max(2,k.Qh*sc*0.12),'Q_i');arrow(c,(L+R)/2,T-70,(L+R)/2,T-26,C.green,Math.max(2,P.A*sc*0.12),'A');
    txt(c,'Q_s = '+fmt(k.Qc,0)+' W',L-50,B+40,C.accent,{font:SMALL});txt(c,'Q_i = '+fmt(k.Qh,0)+' W',R+50,B+40,C.warm,{align:'right',font:SMALL});
    txt(c,hp?'Isitish koeffitsiyenti: '+fmt(k.hp,2):'Sovutish koeffitsiyenti: '+fmt(k.e,2),W/2,H-14,C.ink,{align:'center',font:MONO});},
  read(S,P){const k=this.calc(P);return P.md==1?[['Karno chegarasi T_i/(T_i − T_s)',fmt(k.hpc,2)],['Real isitish koeffitsiyenti',fmt(k.hp,2)],['Uyga beriladigan issiqlik',fmt(k.Qh,0)+' W'],['Ko‘chadan olinadigan issiqlik',fmt(k.Qc,0)+' W']]:[['Karno chegarasi T_s/(T_i − T_s)',fmt(k.ec,2)],['Real sovutish koeffitsiyenti',fmt(k.e,2)],['Kameradan olinadigan issiqlik',fmt(k.Qc,0)+' W'],['Xonaga beriladigan issiqlik',fmt(k.Qh,0)+' W']];}
});

/* 17. Entropiya */
SIMS.push({id:'entropiya',cat:'trm',title:'Entropiya va qaytmas jarayonlar',short:'S = k·lnW',
  sub:'Idishning chap yarmidagi gaz to‘siq olinganda butun idishga tarqaladi va hech qachon o‘z-o‘zidan yana bir tomonga to‘planmaydi. Sababi: tekis taqsimlanishga mos mikroholatlar soni beqiyos ko‘p.',
  formula:`<span><i>S</i> = <i>k</i> ln <i>W</i></span><span class="alt"><i>W</i> = ${fr('<i>N</i>!','<i>n</i>!(<i>N</i> − <i>n</i>)!')}, &nbsp;Δ<i>S</i> = <i>Nk</i> ln 2</span>`,
  text:['Makroholat (chapda n ta, o‘ngda N − n ta molekula) ko‘p mikroholatlar bilan amalga oshadi: qaysi molekula qayerda ekanini almashtirish mumkin. Ularning soni W = N!/(n!(N − n)!). Boltsman ta’rifi bo‘yicha entropiya S = k·lnW.','Molekulalar tasodifiy harakat qilgani uchun tizim eng ko‘p mikroholatli makroholatga — tekis taqsimotga intiladi va entropiya ortadi. Hammasining yana chap tomonga to‘planish ehtimoli 2⁻ᴺ: 100 molekula uchun bu 10⁻³⁰ — Olam yoshi davomida ham kuzatilmaydi. Termodinamikaning ikkinchi qonuni shu statistik ma’noga ega.'],
  legend:[['N','molekulalar soni'],['n','chap yarmidagi molekulalar'],['W','mikroholatlar soni (statistik vazn)'],['S','entropiya, k birligida'],['k','Boltsman doimiysi']],
  tries:['To‘siqni oling va n(t) grafigini kuzating: u N/2 atrofida tebranadi.','N = 10 qiling: ba’zan barcha molekulalar bir tomonga to‘planib qoladi. N = 200 da esa hech qachon.','To‘siqni qaytaring: entropiya kamaymaydi, molekulalar ikki tomonda qamalib qoladi.'],
  params:[{id:'N',label:'Molekulalar soni',sym:'N',min:4,max:200,step:2,val:60,unit:'',d:0,reset:1},{id:'dv',label:'To‘siq',choices:[[0,'Bor'],[1,'Olingan']],val:0}],
  lnC(N,n){const lf=x=>{let s=0;for(let i=2;i<=x;i++)s+=Math.log(i);return s;};return lf(N)-lf(n)-lf(N-n);},
  init(P){const m=[];for(let i=0;i<P.N;i++){const a=Math.random()*TAU,v=0.35;m.push({x:Math.random()*0.48+0.01,y:Math.random()*0.98+0.01,vx:Math.cos(a)*v,vy:Math.sin(a)*v});}return{m,t:0,hist:[],lnf:[0]};},
  step(S,P,dt){const wall=!P.dv;S.m.forEach(p=>{const ox=p.x;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<0.005||p.x>0.995){p.vx*=-1;p.x=clamp(p.x,0.005,0.995);}if(p.y<0.005||p.y>0.995){p.vy*=-1;p.y=clamp(p.y,0.005,0.995);}
      if(wall&&((ox<0.5)!==(p.x<0.5))){p.vx*=-1;p.x=ox;}if(Math.random()<dt*0.8){const a=Math.atan2(p.vy,p.vx)+(Math.random()-0.5)*1.2,v=Math.hypot(p.vx,p.vy);p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v;}});
    S.t+=dt;const n=S.m.filter(p=>p.x<0.5).length;if(!S.hist.length||S.t-S.hist[S.hist.length-1][0]>0.1)S.hist.push([S.t,n]);while(S.hist.length&&S.hist[0][0]<S.t-30)S.hist.shift();S.n=n;},
  draw(c,W,H,S,P){grid(c,W,H,28);const bx=30,by=30,bw=W*0.42,bh=H*0.55;S.g={bx,by,bw,bh};c.strokeStyle=C.ink;c.lineWidth=2;c.strokeRect(bx,by,bw,bh);if(!P.dv)line(c,bx+bw/2,by,bx+bw/2,by+bh,C.warm,4);else line(c,bx+bw/2,by,bx+bw/2,by+bh,rgba('muted',0.4),1,[4,4]);
    S.m.forEach(p=>disk(c,bx+p.x*bw,by+p.y*bh,3.2,p.x<0.5?C.accent:C.green));
    const n=S.n??P.N,N=P.N,lw=this.lnC(N,n),lmax=this.lnC(N,Math.floor(N/2));txt(c,'chapda: '+n,bx+bw*0.25,by+bh+16,C.accent,{align:'center',font:SMALL});txt(c,'o‘ngda: '+(N-n),bx+bw*0.75,by+bh+16,C.green,{align:'center',font:SMALL});
    const gx=bx+bw+50,gw=W-gx-24;const dist=[];for(let k=0;k<=N;k++)dist.push([k,Math.exp(this.lnC(N,k)-lmax)]);gplot(c,gx,by+10,gw,bh*0.5,{x1:N,y1:1.1,xt:niceStep(N,4),xl:'n',yl:'W/W_max',fill:[[dist,rgba('accent',0.25)]],lines:[[dist,C.accent,1.6]],marks:[[n,Math.exp(lw-lmax),C.warm]]});
    const bars=[[lw,'S/k = lnW'],[lmax,'eng katta']];const sy=by+bh*0.5+70;bars.forEach(([v,l],i)=>{const w=(v/Math.max(lmax,1))*gw;c.fillStyle=i?rgba('muted',0.4):C.warm;c.fillRect(gx,sy+i*30,w,12);txt(c,l+': '+fmt(v,1),gx,sy+i*30-7,C.ink,{font:SMALL});});
    const t0=Math.max(0,S.t-30);gplot(c,40,by+bh+40,W-80,H-(by+bh+40)-24,{x0:t0,x1:t0+30,y1:N,xt:5,yt:niceStep(N,2),xl:'t',yl:'n(t)',lines:[[[[t0,N/2],[t0+30,N/2]],rgba('muted',0.6),1,[4,4]],[S.hist,C.accent,1.8]]});},
  read(S,P){const N=P.N,n=S.n??N,lw=this.lnC(N,n);return[['Chap yarmida n',String(n)+' / '+N],['Mikroholatlar soni W',fmt(Math.exp(lw),3)],['Entropiya S/k = lnW',fmt(lw,2)],['Eng katta S/k',fmt(this.lnC(N,Math.floor(N/2)),2)],['Hammasi chapda bo‘lish ehtimoli',fmt(Math.pow(2,-N),2)]];}
});

/* 18. Elektr dipol */
SIMS.push({id:'dipol',cat:'est',title:'Elektr dipol va uning maydoni',short:'M = pE sinα',
  sub:'Teng va qarama-qarshi ishorali ikki zaryad dipol hosil qiladi. Bir jinsli tashqi maydonda dipolga aylantiruvchi moment ta’sir qiladi va u maydon bo‘ylab joylashishga intiladi — xuddi kompas strelkasi kabi.',
  formula:`<span><b>p</b> = <i>q</i><b>d</b>, &nbsp;<i>M</i> = <i>pE</i> sin<i>α</i></span><span class="alt"><i>W</i> = −<i>pE</i> cos<i>α</i>, &nbsp;<i>E</i><sub>o‘q</sub> = ${fr('2<i>kp</i>','<i>r</i>³')}</span>`,
  text:['Dipol momenti p = qd manfiy zaryaddan musbat zaryadga yo‘nalgan. Bir jinsli maydonda zaryadlarga ta’sir qiluvchi kuchlar teng va qarama-qarshi, shuning uchun dipol ilgarilanma harakat qilmaydi, lekin juft kuch uni aylantiradi: M = pE·sinα.','Dipol maydoni masofa kubiga teskari kamayadi (nuqtaviy zaryadniki — kvadratiga). Suv molekulasi doimiy dipol: shu sababli suv mikroto‘lqinli pechda isiydi — o‘zgaruvchan maydon dipollarni tinmay aylantiradi. Rasmda strelkalar natijaviy maydon yo‘nalishini ko‘rsatadi.'],
  legend:[['p','dipol momenti, Kl·m'],['q','zaryad, nKl'],['d','zaryadlar orasidagi masofa'],['E','tashqi maydon kuchlanganligi'],['α','p va E orasidagi burchak']],
  tries:['Tashqi maydonni nolga tushiring: faqat dipol maydoni qoladi.','α₀ = 170° qiling: dipol beqaror muvozanatdan ag‘darilib, maydon bo‘ylab tebranadi.','d ni ikki marta oshiring: dipol momenti va aylantiruvchi moment ikki marta ortadi.'],
  params:[{id:'q',label:'Zaryad',sym:'q',min:1,max:20,step:1,val:8,unit:'nKl',d:0,reset:1},{id:'d',label:'Zaryadlar orasidagi masofa',sym:'d',min:1,max:6,step:0.5,val:3,unit:'sm',d:1,reset:1},{id:'E',label:'Tashqi maydon',sym:'E',min:0,max:40,step:1,val:12,unit:'kV/m',d:0,reset:1},{id:'a0',label:'Boshlang‘ich burchak',sym:'α₀',min:0,max:179,step:1,val:60,unit:'°',d:0,reset:1}],
  init:P=>({al:P.a0*D2R,w:0,t:0}),
  step(S,P,dt){const p=P.q*1e-9*P.d*1e-2,E=P.E*1e3,m=2e-4,I=2*m*(P.d*1e-2/2)**2,n=10,h=dt/n;for(let i=0;i<n;i++){S.w+=(-p*E*Math.sin(S.al)/I-0.6*S.w)*h;S.al+=S.w*h;}S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.42,cy=H*0.5,sc=18,dd=P.d*sc/2*2,ax=Math.cos(-S.al),ay=Math.sin(-S.al),pp=[cx+ax*dd/2,cy+ay*dd/2],pn=[cx-ax*dd/2,cy-ay*dd/2],k=8.99e9,q=P.q*1e-9,E0=P.E*1e3;S.g={cx,cy,sc,pp,pn};
    const field=(x,y)=>{let ex=E0,ey=0;[[pp,q],[pn,-q]].forEach(([s,qq])=>{const dx=(x-s[0])/sc*0.01,dy=-(y-s[1])/sc*0.01,r2=dx*dx+dy*dy+1e-6,r=Math.sqrt(r2),e=k*qq/r2;ex+=e*dx/r;ey+=e*dy/r;});return[ex,ey];};
    for(let y=24;y<H;y+=30)for(let x=20;x<W*0.8;x+=30){const[ex,ey]=field(x,y),m=Math.hypot(ex,ey);if(m<1)continue;const l=Math.min(13,4+Math.log10(m)*2),ux=ex/m,uy=-ey/m,al=clamp(Math.log10(m)/6,0.15,0.9);line(c,x-ux*l/2,y-uy*l/2,x+ux*l/2,y+uy*l/2,`rgba(150,170,255,${al})`,1.4);disk(c,x+ux*l/2,y+uy*l/2,1.6,`rgba(150,170,255,${al})`);}
    if(P.E>0){for(let y=40;y<H;y+=60)arrow(c,W*0.82,y,W*0.97,y,rgba('green',0.8),1.6);txt(c,'E',W*0.9,22,C.green,{align:'center',font:MATH});}
    line(c,pn[0],pn[1],pp[0],pp[1],C.ink,3);disk(c,pp[0],pp[1],10,C.red,C.ink);disk(c,pn[0],pn[1],10,C.accent,C.ink);txt(c,'+',pp[0],pp[1]+1,'#fff',{align:'center',font:MONO});txt(c,'−',pn[0],pn[1]+1,'#fff',{align:'center',font:MONO});
    const F=24*Math.min(1,P.E/20);if(P.E>0){arrow(c,pp[0],pp[1],pp[0]+F*1.6,pp[1],C.red,2,'F');arrow(c,pn[0],pn[1],pn[0]-F*1.6,pn[1],C.accent,2,'F');}
    arrow(c,cx,cy,cx+ax*Math.max(30,dd*0.8),cy+ay*Math.max(30,dd*0.8),C.warm,2.6,'p');
    c.strokeStyle=C.warm;c.lineWidth=1;c.beginPath();c.arc(cx,cy,24,Math.min(0,-S.al),Math.max(0,-S.al));c.stroke();txt(c,'α',cx+32,cy-10,C.warm,{font:MATH});},
  read(S,P){const p=P.q*1e-9*P.d*1e-2,E=P.E*1e3,a=((S.al%TAU)+TAU)%TAU;return[['Dipol momenti p',fmt(p,3)+' Kl·m'],['Burchak α',fmt((a>Math.PI?a-TAU:a)/D2R,1)+'°'],['Aylantiruvchi moment M',fmt(p*E*Math.sin(S.al),3)+' N·m'],['Potensial energiya W',fmt(-p*E*Math.cos(S.al),3)+' J'],['O‘qda 10 sm da dipol maydoni',fmt(2*8.99e9*p/0.001,0)+' V/m']];}
});

/* 19. Kondensatorlarni ulash */
SIMS.push({id:'kondulash',cat:'est',title:'Kondensatorlarni ketma-ket va parallel ulash',short:'1/C = 1/C₁ + 1/C₂; C = C₁ + C₂',
  sub:'Parallel ulanganda kondensatorlar kuchlanishi bir xil, zaryadlari qo‘shiladi. Ketma-ket ulanganda zaryadlari bir xil, kuchlanishlari qo‘shiladi va umumiy sig‘im eng kichigidan ham kichik bo‘ladi.',
  formula:`<span>parallel: <i>C</i> = <i>C</i>₁ + <i>C</i>₂ + <i>C</i>₃</span><span class="alt">ketma-ket: ${fr('1','<i>C</i>')} = ${fr('1','<i>C</i>₁')} + ${fr('1','<i>C</i>₂')} + ${fr('1','<i>C</i>₃')}</span>`,
  text:['Parallel ulashda har bir kondensator manba kuchlanishiga ulangan: U₁ = U₂ = U₃ = U. Umumiy zaryad q = q₁ + q₂ + q₃, shuning uchun sig‘imlar qo‘shiladi — bu qoplamalar yuzasini oshirishga teng.','Ketma-ket ulashda o‘rtadagi qoplamalar faqat bir-biridan zaryad oladi, shuning uchun barcha kondensatorlarning zaryadi bir xil. Kuchlanish sig‘imga teskari taqsimlanadi: kichik sig‘imli kondensatorga katta kuchlanish tushadi. Aralash ulashda C₁ ga parallel C₂ va C₃ guruhi ketma-ket ulangan.'],
  legend:[['C','sig‘im, μF'],['q','zaryad, μKl'],['U','kuchlanish, V'],['W','energiya, mJ']],
  tries:['Ketma-ket ulashda C₁ ni kichraytiring: unga tushadigan kuchlanish ortadi.','Uchala sig‘im teng bo‘lsa, parallel ulashdagi sig‘im ketma-ketdagidan 9 marta katta.','Qaysi ulashda batareyadan ko‘proq energiya olinadi?'],
  params:[{id:'md',label:'Ulanish',choices:[[0,'Parallel'],[1,'Ketma-ket'],[2,'Aralash']],val:0,reset:1},{id:'c1',label:'C₁',sym:'C₁',min:1,max:20,step:1,val:4,unit:'μF',d:0,reset:1},{id:'c2',label:'C₂',sym:'C₂',min:1,max:20,step:1,val:8,unit:'μF',d:0,reset:1},{id:'c3',label:'C₃',sym:'C₃',min:1,max:20,step:1,val:12,unit:'μF',d:0,reset:1},{id:'U',label:'Manba kuchlanishi',sym:'U',min:1,max:24,step:1,val:12,unit:'V',d:0,reset:1}],
  calc(P){const md=P.md|0,c=[P.c1,P.c2,P.c3],U=P.U;let Ct,u;if(md===0){Ct=c[0]+c[1]+c[2];u=[U,U,U];}else if(md===1){Ct=1/(1/c[0]+1/c[1]+1/c[2]);const q=Ct*U;u=c.map(x=>q/x);}else{const c23=c[1]+c[2];Ct=1/(1/c[0]+1/c23);const q=Ct*U;u=[q/c[0],q/c23,q/c23];}const q=c.map((x,i)=>x*u[i]);return{Ct,u,q,Q:Ct*U,Wt:Ct*U*U/2*1e-3};},
  init:()=>({k:0,ph:0,tt:0}),
  step(S,P,dt){S.tt+=dt;S.k=1-Math.exp(-S.tt/0.7);S.ph+=dt*60*(1-S.k);},
  draw(c,W,H,S,P){grid(c,W,H,28);const r=this.calc(P),md=P.md|0,L=60,R=W-60,T=50,B=H-60,k=S.k;S.g={L,R,T,B,md};
    const cap=(x,y,i,vert)=>{const q=r.q[i]*k,n=Math.round(clamp(q/12,1,10));c.save();c.translate(x,y);if(vert)c.rotate(Math.PI/2);c.fillStyle=rgba('panel',1);c.fillRect(-14,-34,28,68);line(c,-6,-30,-6,30,C.red,4);line(c,6,-30,6,30,C.accent,4);
      for(let j=0;j<n;j++){const yy=-26+j*52/Math.max(n-1,1);txt(c,'+',-14,yy,C.red,{align:'center',font:SMALL});txt(c,'−',14,yy,C.accent,{align:'center',font:SMALL});}const ex=Math.round(clamp(r.u[i]/3,1,6));for(let j=0;j<ex;j++){const yy=-22+j*44/Math.max(ex-1,1);line(c,-3,yy,3,yy,rgba('warm',0.6*k),1);}c.restore();
      if(vert){txt(c,'C'+subn(i+1)+' '+[P.c1,P.c2,P.c3][i]+' μF',x+38,y-8,C.ink,{font:SMALL});txt(c,fmt(r.u[i]*k,1)+' V',x+40,y+6,C.warm,{font:SMALL});txt(c,fmt(q,0)+' μKl',x+40,y+20,C.warm,{font:SMALL});}else{txt(c,'C'+subn(i+1)+' = '+[P.c1,P.c2,P.c3][i]+' μF',x,y+46,C.ink,{align:'center',font:SMALL});txt(c,fmt(r.u[i]*k,1)+' V · '+fmt(q,0)+' μKl',x,y+60,C.warm,{align:'center',font:SMALL});}};
    cellV(c,L,(T+B)/2,'U = '+P.U+' V');const ph=S.ph;
    if(md===0){const xs=[W*0.38,W*0.58,W*0.78];wireP(c,[[L,(T+B)/2-10],[L,T],[xs[2],T]]);wireP(c,[[L,(T+B)/2+10],[L,B],[xs[2],B]]);xs.forEach((x,i)=>{wireP(c,[[x,T],[x,(T+B)/2-6]]);wireP(c,[[x,B],[x,(T+B)/2+6]]);cap(x,(T+B)/2,i,1);});
      if(k<1)flowDots(c,[[L,(T+B)/2-10],[L,T],[xs[2],T]],ph,1,C.warm);}
    else if(md===1){const xs=[W*0.32,W*0.52,W*0.72];wireP(c,[[L,(T+B)/2-10],[L,T],[xs[0]-6,T]]);wireP(c,[[xs[0]+6,T],[xs[1]-6,T]]);wireP(c,[[xs[1]+6,T],[xs[2]-6,T]]);wireP(c,[[xs[2]+6,T],[R,T],[R,B],[L,B],[L,(T+B)/2+10]]);xs.forEach((x,i)=>cap(x,T,i,0));
      if(k<1)flowDots(c,[[L,(T+B)/2-10],[L,T],[xs[0]-8,T]],ph,1,C.warm);}
    else{const x1=W*0.26,x2=W*0.6;wireP(c,[[L,(T+B)/2-10],[L,T],[x1-6,T]]);wireP(c,[[x1+6,T],[x2,T],[x2,T+10]]);wireP(c,[[x2,B-10],[x2,B],[L,B],[L,(T+B)/2+10]]);wireP(c,[[x2,T+10],[x2-90,T+10],[x2-90,(T+B)/2-6]]);wireP(c,[[x2,T+10],[x2+90,T+10],[x2+90,(T+B)/2-6]]);wireP(c,[[x2-90,(T+B)/2+6],[x2-90,B-10],[x2+90,B-10],[x2+90,(T+B)/2+6]]);
      cap(x1,T,0,0);cap(x2-90,(T+B)/2,1,1);cap(x2+90,(T+B)/2,2,1);}
    txt(c,'C_umumiy = '+fmt(r.Ct,2)+' μF',W-16,H-20,C.ink,{align:'right',font:MONO});},
  read(S,P){const r=this.calc(P);return[['Umumiy sig‘im',fmt(r.Ct,2)+' μF'],['Umumiy zaryad',fmt(r.Q,1)+' μKl'],['U₁ / U₂ / U₃',r.u.map(x=>fmt(x,2)).join(' / ')+' V'],['q₁ / q₂ / q₃',r.q.map(x=>fmt(x,1)).join(' / ')+' μKl'],['Energiya W = CU²/2',fmt(r.Wt,3)+' mJ']];}
});

/* 20. Dielektrik kondensatorda */
SIMS.push({id:'dielektrik',cat:'est',title:'Dielektrik kondensator ichida',short:'C = εε₀S/d',
  sub:'Kondensator qoplamalari orasiga dielektrik plastinka kiritilsa, uning molekulalari qutblanadi va maydonni susaytiradi. Natijada sig‘im ε marta ortadi. Manbaga ulangan va uzilgan kondensator o‘zini turlicha tutadi.',
  formula:`<span><i>C</i> = ${fr('<i>ε</i>₀<i>S</i>','<i>d</i>')}[(1 − <i>x</i>) + <i>εx</i>]</span><span class="alt"><i>E</i> = ${fr('<i>E</i>₀','<i>ε</i>')}, &nbsp;<i>W</i> = ${fr('<i>q</i>²','2<i>C</i>')} = ${fr('<i>CU</i>²','2')}</span>`,
  text:['Tashqi maydonda dielektrik molekulalari qutblanadi: musbat zaryadlar maydon bo‘ylab, manfiylari qarshi siljiydi. Dielektrik sirtlarida bog‘langan zaryadlar paydo bo‘lib, ular ichkarida maydonni ε marta susaytiradi.','Kondensator manbaga ulangan bo‘lsa, kuchlanish o‘zgarmaydi, dielektrik kiritilganda qoplamalarga manbadan qo‘shimcha zaryad keladi va energiya ortadi. Kondensator uzilgan bo‘lsa, zaryad o‘zgarmaydi, kuchlanish va energiya kamayadi — plastinka ichkariga tortiladi.'],
  legend:[['ε','dielektrik singdiruvchanlik'],['x','kiritilgan qism ulushi'],['S','qoplama yuzasi, 100 sm²'],['d','qoplamalar orasidagi masofa, 2 mm'],['q','zaryad, nKl']],
  tries:['Manbaga ulangan holda shishani to‘liq kiriting: zaryad 7 marta ortadi.','«Manbadan uzilgan» rejimida plastinkani kiriting: kuchlanish kamayadi.','Ikkala rejimda energiya qanday o‘zgarishini solishtiring.'],
  params:[{id:'x',label:'Kiritilgan qism',sym:'x',min:0,max:1,step:0.01,val:0.5,unit:'',d:2},{id:'e',label:'Dielektrik',choices:[[0,'Qog‘oz (ε = 3,5)'],[1,'Shisha (ε = 7)'],[2,'Slyuda (ε = 6)'],[3,'Suv (ε = 81)']],val:1},{id:'md',label:'Rejim',choices:[[0,'Manbaga ulangan'],[1,'Manbadan uzilgan']],val:0},{id:'U',label:'Manba kuchlanishi',sym:'U₀',min:10,max:200,step:5,val:100,unit:'V',d:0}],
  EPS:[3.5,7,6,81],
  calc(P){const e=this.EPS[P.e|0],C0=8.854e-12*0.01/0.002,C=C0*((1-P.x)+e*P.x),q0=C0*P.U;let U,q;if(P.md==1){q=q0;U=q/C;}else{U=P.U;q=C*U;}return{e,C0,C,U,q,W:q*U/2,E:U/0.002};},
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const r=this.calc(P),pl=W*0.1,pr=W*0.55,pt=H*0.3,pb=H*0.7,pw=pr-pl,xi=pl+pw*(1-P.x);S.g={pl,pr,pt,pb,xi};
    c.fillStyle=C.red;c.fillRect(pl,pt-10,pw,10);c.fillStyle=C.accent;c.fillRect(pl,pb,pw,10);
    if(P.x>0){c.fillStyle=['rgba(240,230,200,0.5)','rgba(160,220,255,0.35)','rgba(200,180,140,0.45)','rgba(70,140,255,0.35)'][P.e|0];c.fillRect(xi,pt+8,pw,pb-pt-16);c.strokeStyle=C.ink;c.lineWidth=1;c.strokeRect(xi,pt+8,pw,pb-pt-16);}
    const sig=x=>x>xi?r.e:1,nq=x=>r.q/r.C*sig(x);/* sirt zaryadlari zichligi ∝ E·ε */
    for(let x=pl+10;x<pr;x+=18){const s=x>xi?r.e:1,dens=r.U/P.U*s;const n=dens>1.5?2:1;txt(c,'+',x,pt-18,C.red,{align:'center',font:SMALL});if(x>xi&&r.e>1){txt(c,'−',x,pt+16,C.accent,{align:'center',font:SMALL});txt(c,'+',x,pb-16,C.red,{align:'center',font:SMALL});}txt(c,'−',x,pb+20,C.accent,{align:'center',font:SMALL});}
    const Ein=r.U/0.002,Emax=P.U/0.002;const nl=Math.round(clamp(Ein/Emax*9,1,14));for(let i=0;i<nl;i++){const x=pl+12+i*(pw-24)/Math.max(nl-1,1);arrow(c,x,pt+2,x,pb-2,rgba('warm',0.75),1.4);}
    if(P.md==0){wireP(c,[[pl+pw/2,pt-10],[pl+pw/2,pt-40],[W*0.93,pt-40],[W*0.93,(pt+pb)/2-10]]);wireP(c,[[pl+pw/2,pb+10],[pl+pw/2,pb+40],[W*0.93,pb+40],[W*0.93,(pt+pb)/2+10]]);cellV(c,W*0.93,(pt+pb)/2,'');}
    else{txt(c,'manbadan uzilgan',W*0.86,(pt+pb)/2,C.muted,{align:'center',font:SMALL});}
    txt(c,'ε = '+fmt(r.e,1),xi+8,(pt+pb)/2,C.ink,{font:SMALL});txt(c,'maydon chiziqlari ichkarida bir xil: E = U/d',pl,pb+46,C.muted,{font:SMALL});},
  read(S,P){const r=this.calc(P);return[['Sig‘im C',fmt(r.C*1e12,1)+' pF'],['Sig‘im ortishi C/C₀',fmt(r.C/r.C0,2)],['Kuchlanish U',fmt(r.U,1)+' V'],['Zaryad q',fmt(r.q*1e9,2)+' nKl'],['Maydon E',fmt(r.E/1000,1)+' kV/m'],['Energiya W',fmt(r.W*1e6,2)+' μJ']];}
});

/* 21. Kirxgof qoidalari */
SIMS.push({id:'kirxgof',cat:'tok',title:'Kirxgof qoidalari: tarmoqlangan zanjir',short:'ΣI = 0, ΣE = ΣIR',
  sub:'Ikki manbali tarmoqlangan zanjirda tok kuchlarini Kirxgof qoidalari bilan topamiz. Har bir tugunda kiruvchi va chiquvchi toklar teng, har bir yopiq konturda EYuKlar yig‘indisi kuchlanish tushishlari yig‘indisiga teng.',
  formula:`<span><i>I</i>₁ + <i>I</i>₂ = <i>I</i>₃</span><span class="alt"><i>E</i>₁ = <i>I</i>₁<i>R</i>₁ + <i>I</i>₃<i>R</i>₃, &nbsp;<i>E</i>₂ = <i>I</i>₂<i>R</i>₂ + <i>I</i>₃<i>R</i>₃</span>`,
  text:['Birinchi qoida (tugunlar qoidasi) zaryadning saqlanishidan kelib chiqadi: tugunda zaryad to‘planmaydi, shuning uchun kiruvchi toklar yig‘indisi chiquvchilar yig‘indisiga teng.','Ikkinchi qoida (konturlar qoidasi) energiyaning saqlanishi: zaryad yopiq kontur bo‘ylab aylanib chiqqanda manbalar bergan energiya rezistorlarda ajralgan energiyaga teng. Tok yo‘nalishi oldindan noma’lum bo‘lsa, ixtiyoriy tanlanadi; javob manfiy chiqsa, tok aslida teskari oqadi.'],
  legend:[['E₁, E₂','manbalar EYuK, V'],['R₁, R₂, R₃','rezistorlar qarshiligi, Om'],['I₁, I₂, I₃','tarmoqlardagi toklar, A'],['φ','tugun potensiali']],
  tries:['E₂ ni E₁ dan ancha katta qiling: I₁ manfiy bo‘ladi — tok birinchi manba orqali teskari oqadi (zaryadlanadi).','R₃ ni juda katta qiling: toklar asosan ikki manba orasida aylanadi.','Tugundagi toklar yig‘indisi har doim nolga tengligini tekshiring.'],
  params:[{id:'E1',label:'EYuK E₁',sym:'E₁',min:0,max:24,step:0.5,val:12,unit:'V',d:1},{id:'E2',label:'EYuK E₂',sym:'E₂',min:0,max:24,step:0.5,val:6,unit:'V',d:1},{id:'R1',label:'R₁',sym:'R₁',min:1,max:50,step:1,val:4,unit:'Om',d:0},{id:'R2',label:'R₂',sym:'R₂',min:1,max:50,step:1,val:6,unit:'Om',d:0},{id:'R3',label:'R₃',sym:'R₃',min:1,max:50,step:1,val:10,unit:'Om',d:0}],
  calc(P){const V=(P.E1/P.R1+P.E2/P.R2)/(1/P.R1+1/P.R2+1/P.R3);return{V,I1:(P.E1-V)/P.R1,I2:(P.E2-V)/P.R2,I3:V/P.R3};},
  init:()=>({ph:0}),
  step(S,P,dt){S.ph+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const r=this.calc(P),L=W*0.14,M=W*0.48,R=W*0.82,T=H*0.18,B=H*0.78;S.g={L,M,R,T,B};
    const b1=[[M,B],[L,B],[L,T],[M,T]],b3=[[M,T],[M,B]],b2=[[M,B],[R,B],[R,T],[M,T]];[b1,b2,b3].forEach(b=>wireP(c,b));
    const v=40;flowDots(c,[[L,B],[L,T],[M,T]],S.ph*v*Math.abs(r.I1)*0.6,Math.sign(r.I1),C.warm);flowDots(c,[[R,B],[R,T],[M,T]],S.ph*v*Math.abs(r.I2)*0.6,Math.sign(r.I2),C.green);flowDots(c,[[M,T],[M,B]],S.ph*v*Math.abs(r.I3)*0.6,Math.sign(r.I3),C.violet);
    flowDots(c,[[M,B],[L,B]],S.ph*v*Math.abs(r.I1)*0.6,Math.sign(r.I1),C.warm);flowDots(c,[[M,B],[R,B]],S.ph*v*Math.abs(r.I2)*0.6,Math.sign(r.I2),C.green);
    cellV(c,L,(T+B)/2,'E₁ = '+fmt(P.E1,1)+' V');cellV(c,R,(T+B)/2,'E₂ = '+fmt(P.E2,1)+' V');
    resH(c,(L+M)/2,T,60,'R₁ = '+P.R1+' Om');resH(c,(M+R)/2,T,60,'R₂ = '+P.R2+' Om');resV(c,M,(T+B)/2,60,'R₃ = '+P.R3+' Om');
    disk(c,M,T,6,C.ink);disk(c,M,B,6,C.ink);txt(c,'tugun',M+10,T-14,C.muted,{font:SMALL});
    txt(c,'I₁ = '+fmt(r.I1,3)+' A',(L+M)/2,T+28,C.warm,{align:'center',font:SMALL});txt(c,'I₂ = '+fmt(r.I2,3)+' A',(M+R)/2,T+28,C.green,{align:'center',font:SMALL});txt(c,'I₃ = '+fmt(r.I3,3)+' A',M+16,(T+B)/2+44,C.violet,{font:SMALL});
    txt(c,'I₁ + I₂ = '+fmt(r.I1+r.I2,3)+' A = I₃',W/2,H-18,C.ink,{align:'center',font:MONO});},
  read(S,P){const r=this.calc(P);return[['I₁',fmt(r.I1,3)+' A'],['I₂',fmt(r.I2,3)+' A'],['I₃',fmt(r.I3,3)+' A'],['Tugun potensiali φ',fmt(r.V,2)+' V'],['1-kontur: E₁ − I₁R₁ − I₃R₃',fmt(P.E1-r.I1*P.R1-r.I3*P.R3,3)+' V']];}
});

/* 22. Uitston ko‘prigi */
SIMS.push({id:'uitston',cat:'tok',title:'Uitston ko‘prigi: qarshilikni o‘lchash',short:'R₁/R₂ = R₃/Rₓ',
  sub:'To‘rtta rezistor ko‘prik hosil qiladi, uning diagonaliga galvanometr ulangan. Reostatni burab galvanometr toki nolga keltiriladi — shunda noma’lum qarshilik juda aniq topiladi.',
  formula:`<span><i>R</i><sub>x</sub> = <i>R</i>₃${fr('<i>R</i>₂','<i>R</i>₁')}</span><span class="alt"><i>I</i><sub>G</sub> = 0 ⇔ <i>φ</i><sub>A</sub> = <i>φ</i><sub>B</sub></span>`,
  text:['Ko‘prikning ikki yelkasi kuchlanish bo‘luvchisi: A nuqtaning potensiali R₁ va R₂ nisbatiga, B nuqtaniki R₃ va Rₓ nisbatiga bog‘liq. Bu potensiallar teng bo‘lganda galvanometr orqali tok o‘tmaydi — ko‘prik muvozanatda.','Muvozanat sharti manba kuchlanishiga va galvanometr qarshiligiga bog‘liq emas, shuning uchun bu usul juda aniq. Termometrlar, tenzodatchiklar va tarozilardagi sezgir elementlar shu ko‘prik bilan o‘lchanadi.'],
  legend:[['R₁, R₂','ma’lum rezistorlar, Om'],['R₃','reostat (sozlanadigan), Om'],['Rₓ','noma’lum qarshilik'],['I_G','galvanometr toki, mA']],
  tries:['Reostatni burab galvanometr strelkasini nolga keltiring va Rₓ ni hisoblang.','Noma’lum rezistorni almashtiring va yana muvozanatlang.','Manba kuchlanishini o‘zgartiring: muvozanat buzilmaydi.'],
  params:[{id:'R3',label:'Reostat R₃',sym:'R₃',min:1,max:500,step:1,val:150,unit:'Om',d:0},{id:'x',label:'Noma’lum rezistor',choices:[[0,'1-namuna'],[1,'2-namuna'],[2,'3-namuna'],[3,'Termistor (qiziydi)']],val:0},{id:'R1',label:'R₁',sym:'R₁',min:10,max:200,step:10,val:100,unit:'Om',d:0},{id:'R2',label:'R₂',sym:'R₂',min:10,max:200,step:10,val:50,unit:'Om',d:0},{id:'E',label:'Manba',sym:'E',min:1.5,max:12,step:0.5,val:6,unit:'V',d:1}],
  RX:[120,47,330],
  init:()=>({t:0,ndl:0}),
  rx(S,P){return(P.x|0)===3?220*Math.exp(-0.15*Math.sin(S.t*0.3)):this.RX[P.x|0];},
  calc(S,P){const Rx=this.rx(S,P),Rg=50,Va=P.E*P.R2/(P.R1+P.R2),Vb=P.E*Rx/(P.R3+Rx),Rth=P.R1*P.R2/(P.R1+P.R2)+P.R3*Rx/(P.R3+Rx),Ig=(Va-Vb)/(Rth+Rg);return{Rx,Va,Vb,Ig};},
  step(S,P,dt){S.t+=dt;const r=this.calc(S,P),tg=clamp(r.Ig*1000/2,-1,1);S.ndl+=(tg-S.ndl)*Math.min(1,dt*5);},
  draw(c,W,H,S,P){grid(c,W,H,28);const r=this.calc(S,P),cx=W*0.42,cy=H*0.48,a=Math.min(W*0.26,H*0.36),top=[cx,cy-a],bot=[cx,cy+a],A=[cx-a,cy],B=[cx+a,cy];S.g={cx,cy,a};
    wireP(c,[top,A,bot]);wireP(c,[top,B,bot]);wireP(c,[A,B],rgba('muted',0.8),1.6);wireP(c,[top,[top[0],top[1]-30],[W*0.88,top[1]-30],[W*0.88,cy-12]]);wireP(c,[bot,[bot[0],bot[1]+30],[W*0.88,bot[1]+30],[W*0.88,cy+12]]);cellV(c,W*0.88,cy,'E');
    const mid=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2],rr=(p,q,l,col)=>{const m=mid(p,q),ang=Math.atan2(q[1]-p[1],q[0]-p[0]);c.save();c.translate(m[0],m[1]);c.rotate(ang);c.fillStyle=rgba('panel',1);c.fillRect(-28,-9,56,18);c.strokeStyle=col||C.ink;c.lineWidth=2;c.strokeRect(-28,-9,56,18);c.restore();txt(c,l,m[0]+(m[0]<cx?-36:36),m[1]+(m[1]<cy?-10:10),col||C.ink,{align:m[0]<cx?'right':'left',font:SMALL});};
    rr(top,A,'R₁ = '+P.R1+' Om');rr(A,bot,'R₂ = '+P.R2+' Om');rr(top,B,'R₃ = '+P.R3+' Om',C.warm);rr(B,bot,'Rₓ = ?',C.accent);
    disk(c,A[0],A[1],5,C.ink);disk(c,B[0],B[1],5,C.ink);txt(c,'A',A[0]-14,A[1],C.ink,{font:MATH,align:'right'});txt(c,'B',B[0]+14,B[1],C.ink,{font:MATH});
    c.fillStyle=rgba('panel',1);c.beginPath();c.arc(cx,cy,30,0,TAU);c.fill();c.strokeStyle=C.ink;c.lineWidth=2;c.stroke();c.strokeStyle=rgba('muted',0.6);c.beginPath();c.arc(cx,cy+16,32,-Math.PI*0.8,-Math.PI*0.2);c.stroke();
    const na=-Math.PI/2+S.ndl*0.9;line(c,cx,cy+16,cx+Math.cos(na)*34,cy+16+Math.sin(na)*34,Math.abs(r.Ig)<2e-5?C.green:C.red,2);txt(c,'G',cx,cy+6,C.ink,{align:'center',font:MATH});
    txt(c,Math.abs(r.Ig)<2e-5?'Ko‘prik muvozanatda!':'I_G = '+fmt(r.Ig*1000,3)+' mA',cx,cy+a+56,Math.abs(r.Ig)<2e-5?C.green:C.ink,{align:'center',font:MONO});},
  read(S,P){const r=this.calc(S,P);return[['φ_A',fmt(r.Va,3)+' V'],['φ_B',fmt(r.Vb,3)+' V'],['Galvanometr toki',fmt(r.Ig*1000,3)+' mA'],['Hisoblangan Rₓ = R₃R₂/R₁',fmt(P.R3*P.R2/P.R1,1)+' Om']];}
});

/* 23. Qarshilikning haroratga bog‘liqligi */
SIMS.push({id:'qarshiliktemp',cat:'tok',title:'Qarshilikning haroratga bog‘liqligi',short:'R = R₀(1 + αΔt)',
  sub:'Metallar qizdirilganda ularning qarshiligi ortadi: kristall panjara ionlari kuchliroq tebranib, elektronlar harakatiga ko‘proq xalaqit beradi. Yarimo‘tkazgichlarda esa aksincha — qizdirilganda erkin zaryad tashuvchilar ko‘payadi va qarshilik keskin kamayadi.',
  formula:`<span>metall: <i>R</i> = <i>R</i>₀(1 + <i>α</i>Δ<i>t</i>)</span><span class="alt">termistor: <i>R</i> = <i>R</i>₀<i>e</i><sup><i>B</i>(1/<i>T</i> − 1/<i>T</i>₀)</sup></span>`,
  text:['Metallarda erkin elektronlar soni haroratga deyarli bog‘liq emas, lekin ionlarning issiqlik tebranishi ortadi va elektronlar ko‘proq sochiladi. Natijada qarshilik deyarli chiziqli ortadi, α — qarshilikning harorat koeffitsiyenti. Nixromda α juda kichik, shuning uchun undan aniq rezistorlar va isitgichlar yasaladi.','Yarimo‘tkazgichda qizdirish elektronlarni bog‘lanishdan ozod qiladi: zaryad tashuvchilar soni eksponensial ortadi, qarshilik esa kamayadi. Termistorlar termometr va himoya qurilmalarida ishlatiladi. Cho‘g‘lanma lampa tolasining qarshiligi yonganda sovuq holatdagidan 10 marta katta.'],
  legend:[['R₀','0 °C (termistorda 25 °C) dagi qarshilik'],['α','harorat koeffitsiyenti, 1/K'],['Δt','harorat o‘zgarishi'],['B','termistor doimiysi, K']],
  tries:['Volfram tolani 2500 °C gacha qizdiring: qarshilik necha marta ortadi?','Termistorni 25 °C dan 100 °C gacha qizdiring: qarshilik 15 martadan ko‘proq kamayadi.','Nixromda harorat qarshilikka deyarli ta’sir qilmasligini ko‘ring.'],
  params:[{id:'mt',label:'Material',choices:[[0,'Mis'],[1,'Volfram'],[2,'Nixrom'],[3,'Termistor (yarimo‘tkazgich)']],val:0},{id:'T',label:'Harorat',sym:'t',min:-50,max:2500,step:5,val:20,unit:'°C',d:0}],
  M:[{R0:10,al:0.0043,max:1000},{R0:10,al:0.0048,max:2500},{R0:10,al:0.0002,max:1100},{R0:1000,B:3950,max:150}],
  R(P,T){const m=this.M[P.mt|0];return m.B?m.R0*Math.exp(m.B*(1/(T+273.15)-1/298.15)):m.R0*(1+m.al*T);},
  init:()=>({t:0,e:[]}),
  step(S,P,dt){S.t+=dt;const m=this.M[P.mt|0],T=Math.min(P.T,m.max);if(!S.e.length||S.mt!==P.mt){S.mt=P.mt;S.e=[];for(let i=0;i<40;i++)S.e.push({x:Math.random(),y:Math.random()});}const R=this.R(P,T),v=0.25*(m.B?1000:10)/R;S.e.forEach(e=>{e.x+=v*dt*(0.7+Math.random()*0.6);e.y+=(Math.random()-0.5)*dt*0.4;if(e.x>1)e.x-=1;e.y=clamp(e.y,0.02,0.98);});},
  draw(c,W,H,S,P){grid(c,W,H,28);const m=this.M[P.mt|0],T=Math.min(P.T,m.max),R=this.R(P,T);const bx=30,by=40,bw=W*0.42,bh=H*0.5;S.g={bx,by,bw,bh,T};
    const glow=clamp((T-500)/2000,0,1);c.fillStyle=glow>0?`rgba(255,${120+glow*100},60,${0.15+glow*0.5})`:rgba('muted',0.15);c.fillRect(bx,by,bw,bh);c.strokeStyle=C.ink;c.lineWidth=1.5;c.strokeRect(bx,by,bw,bh);
    const amp=Math.sqrt((T+273)/293)*2.4;for(let i=0;i<9;i++)for(let j=0;j<5;j++){const x=bx+(i+0.5)*bw/9+Math.sin(S.t*23+i*7+j*3)*amp,y=by+(j+0.5)*bh/5+Math.cos(S.t*19+i*5+j*11)*amp;disk(c,x,y,7,'#8a96b0');txt(c,'+',x,y+1,'#11151f',{align:'center',font:SMALL});}
    const ne=m.B?Math.round(clamp(40*Math.exp(m.B*(1/298.15-1/(T+273.15)))/4,2,40)):40;S.e.slice(0,ne).forEach(e=>disk(c,bx+e.x*bw,by+e.y*bh,2.6,C.accent));
    txt(c,m.B?'erkin elektronlar soni ortadi':'ionlar kuchliroq tebranadi',bx,by+bh+16,C.muted,{font:SMALL});
    const gx=bx+bw+60,gw=W-gx-24,gt=40,gh=H-100,pts=[];const T0=-50,T1=m.max;for(let i=0;i<=120;i++){const t=T0+(T1-T0)*i/120;pts.push([t,this.R(P,t)]);}const ym=Math.max(...pts.map(p=>p[1]))*1.08;
    gplot(c,gx,gt,gw,gh,{x0:T0,x1:T1,y0:0,y1:ym,xt:niceStep(T1-T0,5),yt:niceStep(ym,4),xl:'t, °C',yl:'R, Om',lines:[[pts,C.accent,2.4]],marks:[[T,R,C.warm]]});
    if(P.T>m.max)txt(c,'Bu material '+m.max+' °C dan yuqorida ishlamaydi',W/2,H-16,C.red,{align:'center',font:SMALL});},
  read(S,P){const m=this.M[P.mt|0],T=Math.min(P.T,m.max),R=this.R(P,T),R20=this.R(P,m.B?25:20);return[['Qarshilik R',fmt(R,R<10?3:1)+' Om'],[m.B?'25 °C dagiga nisbati':'20 °C dagiga nisbati',fmt(R/R20,3)],['1 V da tok',fmt(1/R*1000,2)+' mA'],[m.B?'Termistor doimiysi B':'Harorat koeffitsiyenti α',m.B?m.B+' K':fmt(m.al,4)+' 1/K']];}
});
