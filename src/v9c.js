/* ===== v9: yangi mavzular (3-qism): rel, yad, kva ===== */


/* 20. Relyativistik Doppler effekti */
SIMS.push({id:'reldoppler',cat:'rel',title:'Relyativistik Doppler effekti',short:'λ = λ₀√((1+β)/(1−β))',
  sub:'Yorug‘lik manbai katta tezlikda harakatlanadi. Oldindagi kuzatuvchi ko‘k tomonga siljigan, orqadagisi esa qizil tomonga siljigan rangni ko‘radi. Vaqt sekinlashuvi tufayli to‘lqinlar oralig‘i γ marta uzayadi.',
  formula:`<span><i>λ</i> = <i>λ</i><sub>0</sub>${sq(fr('1 ± <i>β</i>','1 ∓ <i>β</i>'))}</span><span class="alt"><i>β</i> = <i>v</i>/<i>c</i>, &nbsp;<i>λ</i><sub>⊥</sub> = <i>γλ</i><sub>0</sub></span>`,
  text:['Tovushdagi Doppler effektidan farqli o‘laroq, yorug‘lik uchun muhit yo‘q: natija faqat manba va kuzatuvchining nisbiy tezligiga bog‘liq. Manba yaqinlashganda to‘lqin uzunligi qisqaradi (ko‘k siljish), uzoqlashganda uzayadi (qizil siljish).','Relyativistik formulada qo‘shimcha γ ko‘paytuvchi bor: harakatdagi manbaning soati sekin yuradi. Shuning uchun manba yonidan perpendikulyar kuzatilganda ham to‘lqin uzunligi γ marta uzayadi — bu ko‘ndalang Doppler effekti, klassik fizikada u yo‘q. Astronomlar galaktikalarning qizil siljishidan ularning tezligini aniqlaydi.'],
  legend:[['λ₀','manba sistemasidagi to‘lqin uzunligi'],['β','v/c — tezlikning yorug‘lik tezligiga nisbati'],['γ','1/√(1−β²) — Lorents ko‘paytuvchisi'],['λ₊, λ₋','oldindagi va orqadagi kuzatuvchi o‘lchagan to‘lqin uzunligi']],
  tries:['β = 0,1 qiling: siljish deyarli klassik v/c ga teng.','λ₀ = 550 nm, β ni oshiring: oldindagi kuzatuvchi uchun rang qachon ko‘rinmas ultrabinafshaga o‘tadi?','β = 0,6 da λ₊·λ₋ = λ₀² ekanini tekshiring.'],
  params:[{id:'b',label:'Manba tezligi',sym:'β',min:0,max:0.9,step:0.01,val:0.4,unit:'c',d:2},{id:'l0',label:'Manba to‘lqin uzunligi',sym:'λ₀',min:400,max:700,step:5,val:550,unit:'nm',d:0}],
  lam(P){const b=P.b,g=1/Math.sqrt(1-b*b);return{g,f:P.l0*Math.sqrt((1-b)/(1+b)),r:P.l0*Math.sqrt((1+b)/(1-b)),t:P.l0*g};},
  init(P){return{t:0,xs:0.2,ph:0,fr:[],W:0};},
  step(S,P,dt){const cpx=0.16,T0=0.3,g=1/Math.sqrt(1-P.b*P.b);S.t+=dt;S.xs+=P.b*cpx*dt;if(S.xs>0.8)S.xs=0.2;S.ph+=dt;if(S.ph>=g*T0){S.ph-=g*T0;S.fr.push({x:S.xs,t:S.t});}S.fr=S.fr.filter(f=>(S.t-f.t)*cpx<1.5);},
  draw(c,W,H,S,P){S.W=W;grid(c,W,H,28);const L=this.lam(P),cy=H*0.42,cpx=0.16*W,col=wl2rgb(P.l0);S.g={cy,xs:S.xs*W};
    c.save();c.beginPath();c.rect(0,0,W,H*0.76);c.clip();S.fr.forEach(f=>{const r=(S.t-f.t)*cpx;c.strokeStyle=rgba('accent',Math.max(0.12,0.75-r/W*0.5));c.lineWidth=1.8;c.beginPath();c.arc(f.x*W,cy,r,0,TAU);c.stroke();});c.restore();
    const xs=S.xs*W;disk(c,xs,cy,13,col,C.ink);arrow(c,xs+16,cy,xs+16+P.b*90,cy,C.warm,3,'v');
    const obs=(x,l,lab,al)=>{disk(c,x,cy,17,wl2rgb(l),C.ink);txt(c,lab,x,cy-30,C.ink,{align:'center',font:SMALL});txt(c,'λ = '+fmt(l,0)+' nm',x,cy+32,C.ink,{align:'center',font:'700 13px "IBM Plex Mono", monospace'});txt(c,l<380?'ultrabinafsha':l>750?'infraqizil':'ko‘rinadi',x,cy+48,C.muted,{align:'center',font:SMALL});};
    obs(W*0.93,L.f,'oldinda',1);obs(W*0.07,L.r,'orqada',0);
    const by=H*0.84,bx0=W*0.08,bw=W*0.84,X=l=>bx0+(l-300)/(1100-300)*bw;for(let l=300;l<1100;l+=2){c.fillStyle=l<380?'#3b2a5a':l>750?'#4a1f1f':wl2rgb(l);c.fillRect(X(l),by,Math.ceil(bw/400)+1,14);}
    [[P.l0,'λ₀',C.ink],[L.f,'λ₊',C.accent],[L.r,'λ₋',C.red],[L.t,'λ⊥',C.violet]].forEach(([l,s,cc],i)=>{if(l<300||l>1100)return;const x=X(l);line(c,x,by-6,x,by+20,cc,2.5);txt(c,s,x,i%2?by+32:by-14,cc,{align:'center',font:SMALL});});
    txt(c,'300 nm',bx0,by+32,C.muted,{font:SMALL});txt(c,'1100 nm',bx0+bw,by+32,C.muted,{align:'right',font:SMALL});txt(c,'γ = '+fmt(L.g,3),16,24,C.ink,{font:'700 15px "IBM Plex Mono", monospace'});},
  read(S,P){const L=this.lam(P);return[['Lorents ko‘paytuvchisi γ',fmt(L.g,3)],['Oldinda λ₊',fmt(L.f,0)+' nm'],['Orqada λ₋',fmt(L.r,0)+' nm'],['Ko‘ndalang (90°) λ⊥',fmt(L.t,0)+' nm'],['Klassik formula (oldinda)',fmt(P.l0*(1-P.b),0)+' nm'],['Chastota nisbati f₊/f₀',fmt(P.l0/L.f,2)]];}
});

/* 21. Minkovskiy diagrammasi */
SIMS.push({id:'minkovskiy',cat:'rel',title:'Minkovskiy diagrammasi: bir vaqtlilikning nisbiyligi',short:'ct′ = γ(ct − βx)',
  sub:'A va B hodisalarni sichqoncha bilan suring. Binafsha o‘qlar harakatdagi S′ sistemasi. Yuguruvchi chiziq S′ dagi «hozir» — u hodisalarni qaysi tartibda kesib o‘tishini kuzating.',
  formula:`<span><i>x</i>′ = <i>γ</i>(<i>x</i> − <i>βct</i>), &nbsp;<i>ct</i>′ = <i>γ</i>(<i>ct</i> − <i>βx</i>)</span><span class="alt"><i>s</i>² = (<i>c</i>Δ<i>t</i>)² − Δ<i>x</i>² = inv</span>`,
  text:['Minkovskiy diagrammasida gorizontal o‘q — koordinata x, vertikal o‘q — ct. Yorug‘lik nuri 45° li chiziq bo‘ylab tarqaladi. Tezligi v bo‘lgan sistemaning ct′ o‘qi vertikaldan, x′ o‘qi esa gorizontaldan bir xil burchakka og‘adi va ikkalasi yorug‘lik chizig‘iga yaqinlashadi.','Bir sistemada bir vaqtda ro‘y bergan hodisalar boshqa sistemada bir vaqtda bo‘lmasligi mumkin. Lekin interval s² barcha sistemalarda bir xil. Agar s² > 0 (vaqtsimon) bo‘lsa, hodisalar tartibi hech qachon o‘zgarmaydi va ular sabab–oqibat bilan bog‘lanishi mumkin; s² < 0 (fazosimon) bo‘lsa, tartib kuzatuvchiga bog‘liq.'],
  legend:[['A, B','hodisalar: (x, ct)'],['β','S′ sistemaning tezligi, c ulushida'],['s²','interval — invariant'],['y.y.','yorug‘lik yili']],
  tries:['A va B ni bir gorizontal chiziqqa qo‘ying (S da bir vaqtda), keyin β ni o‘zgartiring.','B ni A ning yorug‘lik konusi ichiga qo‘ying: β qanchalik katta bo‘lmasin tartib o‘zgarmaydi.','β = −0,5 va β = +0,5 da S′ dagi tartibni solishtiring.'],
  params:[{id:'b',label:'S′ sistema tezligi',sym:'β',min:-0.9,max:0.9,step:0.01,val:0.5,unit:'c',d:2}],
  init(P){return{t:0,ev:[[-1.5,1],[2,1.5]],drag:-1,fl:[0,0]};},
  step(S,P,dt){S.t+=dt;S.fl=S.fl.map(v=>Math.max(0,v-dt));const g=1/Math.sqrt(1-P.b*P.b),tp=this.tau(S.t),tp0=this.tau(S.t-dt);if(tp>tp0)S.ev.forEach((e,i)=>{const ct=g*(e[1]-P.b*e[0]);if(ct>tp0&&ct<=tp)S.fl[i]=0.6;});},
  tau(t){return ((t*1.3)%14)-7;},
  geo(W,H){const u=Math.min(W*0.9,H*0.9)/10.5;return{ox:W*0.5,oy:H*0.52,u};},
  pointer(type,x,y,S,P){const g=S.g;if(!g)return false;const X=v=>g.ox+v*g.u,Y=v=>g.oy-v*g.u;if(type==='down'){S.drag=-1;S.ev.forEach((e,i)=>{if(Math.hypot(x-X(e[0]),y-Y(e[1]))<20)S.drag=i;});return S.drag>=0;}
    if(type==='move'&&S.drag>=0){S.ev[S.drag]=[clamp(Math.round((x-g.ox)/g.u*10)/10,-4.8,4.8),clamp(Math.round((g.oy-y)/g.u*10)/10,-4.8,4.8)];return true;}if(type==='up')S.drag=-1;return false;},
  draw(c,W,H,S,P){c.fillStyle=C.canvas;c.fillRect(0,0,W,H);const g=this.geo(W,H),{ox,oy,u}=g,b=P.b,ga=1/Math.sqrt(1-b*b),X=v=>ox+v*u,Y=v=>oy-v*u,E=(xp,tp)=>[ga*(xp+b*tp),ga*(tp+b*xp)];S.g={ox,oy,u};
    for(let k=-5;k<=5;k++){line(c,X(k),Y(-5),X(k),Y(5),rgba('muted',0.12),1);line(c,X(-5),Y(k),X(5),Y(k),rgba('muted',0.12),1);}
    c.save();c.beginPath();c.rect(X(-5),Y(5),10*u,10*u);c.clip();
    for(let k=-6;k<=6;k++){if(!k)continue;let a=E(k,-9),z=E(k,9);line(c,X(a[0]),Y(a[1]),X(z[0]),Y(z[1]),rgba('violet',0.16),1);a=E(-9,k);z=E(9,k);line(c,X(a[0]),Y(a[1]),X(z[0]),Y(z[1]),rgba('violet',0.16),1);}
    line(c,X(-5),Y(-5),X(5),Y(5),C.warm,1.8,[6,5]);line(c,X(-5),Y(5),X(5),Y(-5),C.warm,1.8,[6,5]);
    const A=S.ev[0];c.fillStyle=rgba('warm',0.08);c.beginPath();c.moveTo(X(A[0]),Y(A[1]));c.lineTo(X(A[0]+6),Y(A[1]+6));c.lineTo(X(A[0]-6),Y(A[1]+6));c.closePath();c.fill();c.beginPath();c.moveTo(X(A[0]),Y(A[1]));c.lineTo(X(A[0]+6),Y(A[1]-6));c.lineTo(X(A[0]-6),Y(A[1]-6));c.closePath();c.fill();
    let a=E(0,-9),z=E(0,9);line(c,X(a[0]),Y(a[1]),X(z[0]),Y(z[1]),C.violet,2.5);a=E(-9,0);z=E(9,0);line(c,X(a[0]),Y(a[1]),X(z[0]),Y(z[1]),C.violet,2.5);
    const tp=this.tau(S.t);a=E(-9,tp);z=E(9,tp);line(c,X(a[0]),Y(a[1]),X(z[0]),Y(z[1]),rgba('violet',0.9),3);
    a=E(-9,A[1]*ga-b*ga*A[0]);c.restore();
    line(c,X(-5),oy,X(5),oy,C.ink,2);line(c,ox,Y(-5),ox,Y(5),C.ink,2);txt(c,'x',X(5)-8,oy-10,C.ink,{font:'700 14px "IBM Plex Sans", sans-serif'});txt(c,'ct',ox+8,Y(5)+12,C.ink,{font:'700 14px "IBM Plex Sans", sans-serif'});
    const ta=E(0,4.3),xa=E(4.3,0);if(Math.abs(ta[0])<5&&ta[1]<5)txt(c,'ct′',X(ta[0])+8,Y(ta[1]),C.violet,{font:'700 14px "IBM Plex Sans", sans-serif'});if(xa[0]<5&&Math.abs(xa[1])<5)txt(c,'x′',X(xa[0]),Y(xa[1])-12,C.violet,{font:'700 14px "IBM Plex Sans", sans-serif'});
    txt(c,'S′ dagi «hozir»: ct′ = '+fmt(tp,1),12,22,C.violet,{font:SMALL});txt(c,'yorug‘lik chizig‘i',X(-3.3),Y(4.3),C.warm,{align:'center',font:SMALL});
    S.ev.forEach((e,i)=>{const cc=i?C.green:C.red,x=X(e[0]),y=Y(e[1]);if(S.fl[i]>0)disk(c,x,y,12+S.fl[i]*30,rgba(i?'green':'red',S.fl[i]*0.6));line(c,x,y,x,oy,rgba(i?'green':'red',0.5),1,[3,3]);disk(c,x,y,9,cc,C.ink);txt(c,i?'B':'A',x+12,y-12,cc,{font:'700 15px "IBM Plex Sans", sans-serif'});});},
  read(S,P){const b=P.b,g=1/Math.sqrt(1-b*b),tr=e=>[g*(e[0]-b*e[1]),g*(e[1]-b*e[0])],[A,B]=S.ev,a=tr(A),bb=tr(B),dx=B[0]-A[0],dt=B[1]-A[1],s2=dt*dt-dx*dx,dtp=bb[1]-a[1];
    return[['Lorents ko‘paytuvchisi γ',fmt(g,3)],['A′ (x′; ct′)',fmt(a[0],2)+'; '+fmt(a[1],2)],['B′ (x′; ct′)',fmt(bb[0],2)+'; '+fmt(bb[1],2)],['cΔt (S da)',fmt(dt,2)+' y.y.'],['cΔt′ (S′ da)',fmt(dtp,2)+' y.y.'],['Interval s²',fmt(s2,2)],['Interval turi',s2>0.02?'vaqtsimon':s2<-0.02?'fazosimon':'yorug‘liksimon'],['S′ dagi tartib',Math.abs(dtp)<0.02?'bir vaqtda':dtp>0?'avval A, keyin B':'avval B, keyin A']];}
});

/* 22. Radiouglerod usuli */
SIMS.push({id:'radiouglerod',cat:'yad',title:'Radiouglerod usuli: yoshni aniqlash',short:'t = T½·log₂(N₀/N)',
  sub:'400 ta C-14 yadrosi tasodifiy yemiriladi. Grafikda qolgan ulush nazariy egri chiziq bilan solishtiriladi. Pastdagi slayder — namunada o‘lchangan C-14 ulushi, undan namunaning yoshi topiladi.',
  formula:`<span><i>N</i> = <i>N</i><sub>0</sub>·2<sup>−<i>t</i>/<i>T</i><sub>½</sub></sup> &nbsp;⇒&nbsp; <i>t</i> = <i>T</i><sub>½</sub>·log<sub>2</sub>${fr('<i>N</i><sub>0</sub>','<i>N</i>')}</span><span class="alt"><i>T</i><sub>½</sub> = 5730 yil</span>`,
  text:['Atmosferada kosmik nurlar ta’sirida azotdan doimiy ravishda radioaktiv uglerod-14 hosil bo‘ladi. Tirik organizmlar nafas olish va oziqlanish orqali uni atmosferadagidek ulushda saqlaydi. Organizm o‘lgach yangi C-14 kelmaydi va mavjudi β-yemirilib azot-14 ga aylanadi.','Har bir yadroning yemirilishi tasodifiy, lekin ko‘p yadrolar uchun qonuniyat aniq: har 5730 yilda C-14 miqdori ikki marta kamayadi. Namunadagi C-14 ulushini tirik organizmdagi bilan solishtirib, taxminan 50 000 yilgacha bo‘lgan yog‘och, suyak va matolarning yoshini aniqlash mumkin.'],
  legend:[['N₀','boshlang‘ich yadrolar soni'],['N','qolgan C-14 yadrolari'],['T½','yarim yemirilish davri'],['λ','ln2/T½ — yemirilish doimiysi']],
  tries:['5730 yil o‘tganda grafikda yarmi qolganini tekshiring.','Namunadagi ulushni 0,25 ga qo‘ying: yosh qancha chiqadi?','Bir necha marta qaytadan boshlang: tasodifiy egri chiziqlar nazariyadan qancha chetlanadi?'],
  params:[{id:'sp',label:'Vaqt tezligi',sym:'',min:500,max:5000,step:100,val:2000,unit:'yil/s',d:0},{id:'fr',label:'Namunadagi C-14 ulushi',sym:'N/N₀',min:0.02,max:1,step:0.01,val:0.3,unit:'',d:2}],
  init(P){return{t:0,at:Array.from({length:400},()=>({d:0,tf:0})),h:[[0,1]],acc:0};},
  step(S,P,dt){if(S.t>=40000)return;const dy=dt*P.sp,p=1-Math.exp(-Math.LN2/5730*dy);S.t=Math.min(40000,S.t+dy);S.at.forEach(a=>{if(!a.d&&Math.random()<p){a.d=1;a.tf=S.t;}});S.acc+=dt;if(S.acc>0.08){S.acc=0;S.h.push([S.t,this.left(S)/400]);}},
  left(S){return S.at.reduce((s,a)=>s+(a.d?0:1),0);},
  draw(c,W,H,S,P){grid(c,W,H,28);const nar=W<640,sz=nar?Math.min(W*0.8,H*0.42):Math.min(W*0.4,H*0.8),ax=nar?(W-sz)/2:W*0.04,ay=nar?H*0.04:(H-sz)/2,cs=sz/20;S.g={ax,ay,sz};
    c.fillStyle=rgba('panel',0.6);c.fillRect(ax-6,ay-6,sz+12,sz+12);
    S.at.forEach((a,i)=>{const x=ax+(i%20+0.5)*cs,y=ay+((i/20|0)+0.5)*cs,age=S.t-a.tf;if(!a.d)disk(c,x,y,cs*0.36,C.green);else{disk(c,x,y,cs*0.3,rgba('muted',0.55));if(age<P.sp*0.35)disk(c,x,y,cs*0.36+age/(P.sp*0.35)*cs*0.4,rgba('warm',0.6*(1-age/(P.sp*0.35))));}});
    txt(c,'● C-14',ax,ay+sz+18,C.green,{font:SMALL});txt(c,'● N-14',ax+70,ay+sz+18,C.muted,{font:SMALL});
    const gx=nar?W*0.12:W*0.53,gy=nar?H*0.58:H*0.1,gw=nar?W*0.82:W*0.42,gh=nar?H*0.32:H*0.72,age=-5730*Math.log2(P.fr),th=[];for(let t=0;t<=40000;t+=400)th.push([t,Math.pow(2,-t/5730)]);
    const G=gplot(c,gx,gy,gw,gh,{x0:0,x1:40000,y0:0,y1:1.05,xt:10000,yt:0.25,xd:0,yd:2,xl:'t, yil',yl:'N/N₀',lines:[[th,C.muted,1.6,[5,4]],[S.h,C.accent,2.4]],marks:[[S.t,this.left(S)/400,C.accent]]});
    if(age<=40000){line(c,gx,G.Y(P.fr),G.X(age),G.Y(P.fr),C.warm,1.5,[4,3]);line(c,G.X(age),G.Y(P.fr),G.X(age),G.Y(0),C.warm,1.5,[4,3]);disk(c,G.X(age),G.Y(P.fr),5,C.warm);txt(c,'namuna: '+fmt(age,0)+' yil',G.X(age)+6,G.Y(P.fr)-10,C.warm,{font:SMALL});}
    [1,2,3].forEach(k=>{const x=G.X(5730*k);if(x<gx+gw)txt(c,k+'T½',x,gy+4,C.muted,{align:'center',font:SMALL});});},
  read(S,P){const n=this.left(S),age=-5730*Math.log2(P.fr);return[['O‘tgan vaqt',fmt(S.t,0)+' yil'],['Qolgan C-14 yadrolari',n+' / 400'],['Tajribadagi ulush',fmt(n/400,3)],['Nazariy ulush',fmt(Math.pow(2,-S.t/5730),3)],['Yarim yemirilishlar soni',fmt(S.t/5730,2)],['Namunaning yoshi',fmt(age,0)+' yil']];}
});

/* 23. Gamma nurlarining yutilishi */
const ABS_M=[['qo‘rg‘oshin',1.23,'#7d8597'],['temir',0.58,'#a3664a'],['beton',0.18,'#b8b2a3'],['alyuminiy',0.2,'#c9d3dc'],['suv',0.086,'#5aa9e6']];
SIMS.push({id:'yutilish',cat:'yad',title:'Gamma nurlanishning moddada yutilishi',short:'I = I₀·e^(−μx)',
  sub:'Gamma kvantlar to‘siqdan o‘tadi yoki yutiladi. Material va qalinlikni tanlang: hisoblagich o‘tgan kvantlar ulushini o‘lchaydi va u eksponensial qonunga mos keladi.',
  formula:`<span><i>I</i> = <i>I</i><sub>0</sub><i>e</i><sup>−<i>μx</i></sup></span><span class="alt"><i>x</i><sub>½</sub> = ${fr('ln 2','<i>μ</i>')}</span>`,
  text:['Gamma kvant moddadan o‘tayotganda atomlar bilan tasodifiy to‘qnashadi: fotoeffekt, Kompton sochilishi yoki juft hosil bo‘lishi orqali dastadan chiqib ketadi. Har bir yupqa qatlam kvantlarning bir xil ulushini yutadi, shuning uchun intensivlik qalinlik bo‘yicha eksponensial kamayadi.','μ — chiziqli yutilish koeffitsiyenti; u material zichligi va kvant energiyasiga bog‘liq. Intensivlikni ikki marta kamaytiradigan qalinlik yarim susaytirish qatlami deyiladi. Shuning uchun radiatsiyadan himoya uchun zich materiallar — qo‘rg‘oshin va beton ishlatiladi. Bu yerda E ≈ 0,66 MeV (Cs-137) uchun qiymatlar olingan.'],
  legend:[['I₀','to‘siqqa tushgan kvantlar oqimi'],['I','o‘tgan kvantlar oqimi'],['μ','chiziqli yutilish koeffitsiyenti, 1/sm'],['x½','yarim susaytirish qatlami']],
  tries:['Qo‘rg‘oshin uchun x = x½ qiling: hisoblagich taxminan yarmini ko‘rsatadimi?','Qo‘rg‘oshin va suvni solishtiring: bir xil himoya uchun suv qancha qalin bo‘lishi kerak?','Qalinlikni ikki marta oshiring: o‘tgan ulush qanday o‘zgaradi?'],
  params:[{id:'m',label:'Material (0 — qo‘rg‘oshin, 1 — temir, 2 — beton, 3 — alyuminiy, 4 — suv)',sym:'',min:0,max:4,step:1,val:0,unit:'',d:0,reset:1},{id:'x',label:'Qalinlik',sym:'x',min:0,max:20,step:0.1,val:1,unit:'sm',d:1,reset:1}],
  init(P){return{ph:[],res:[],acc:0,fl:[],n:0,pass:0};},
  step(S,P,dt){const g=S.g;if(!g)return;const mu=ABS_M[P.m][1];S.acc+=dt*45;while(S.acc>=1){S.acc--;S.ph.push({x:g.sx,y:g.y0+Math.random()*(g.y1-g.y0),a:1});}
    const v=g.W*0.45*dt;S.ph.forEach(p=>{const nx=p.x+v;if(p.a===1&&nx>g.s0&&p.x<g.s1){const d=(Math.min(nx,g.s1)-Math.max(p.x,g.s0))/g.ppc;if(Math.random()<1-Math.exp(-mu*d)){p.a=2;S.fl.push({x:Math.max(p.x,g.s0)+Math.random()*(Math.min(nx,g.s1)-Math.max(p.x,g.s0)),y:p.y,t:0.4});}}p.x=nx;if(p.a&&p.x>=g.dx){S.res.push(p.a===1?1:0);S.n++;if(p.a===1)S.pass++;p.a=0;}});
    S.ph=S.ph.filter(p=>p.a);if(S.res.length>600)S.res.splice(0,S.res.length-600);S.fl.forEach(f=>f.t-=dt);S.fl=S.fl.filter(f=>f.t>0);},
  draw(c,W,H,S,P){grid(c,W,H,28);const M=ABS_M[P.m],mu=M[1],ppc=W*0.3/20,s0=W*0.36,s1=s0+P.x*ppc,y0=H*0.16,y1=H*0.5,sx=W*0.1,dx=W*0.84;S.g={W,sx,s0,s1,y0,y1,dx,ppc};
    rrect(c,sx-44,(y0+y1)/2-26,44,52,8,rgba('warm',0.25),C.warm);txt(c,'Cs-137',sx-22,(y0+y1)/2+40,C.warm,{align:'center',font:SMALL});txt(c,'☢',sx-22,(y0+y1)/2+1,C.warm,{align:'center',font:'22px sans-serif',base:'middle'});
    if(P.x>0){c.fillStyle=M[2];c.globalAlpha=0.75;c.fillRect(s0,y0-24,Math.max(2,s1-s0),y1-y0+48);c.globalAlpha=1;c.strokeStyle=C.ink;c.lineWidth=1.2;c.strokeRect(s0,y0-24,Math.max(2,s1-s0),y1-y0+48);txt(c,M[0],(s0+s1)/2,y0-32,C.ink,{align:'center',font:SMALL});txt(c,'x = '+fmt(P.x,1)+' sm',(s0+s1)/2,y1+40,C.muted,{align:'center',font:SMALL});}
    rrect(c,dx,y0-10,W*0.07,y1-y0+20,8,rgba('accent',0.18),C.accent);txt(c,'hisoblagich',dx+W*0.035,y1+28,C.accent,{align:'center',font:SMALL});txt(c,String(S.pass),dx+W*0.035,(y0+y1)/2,C.ink,{align:'center',font:'700 14px "IBM Plex Mono", monospace',base:'middle'});
    S.ph.forEach(p=>{if(p.a!==1)return;c.strokeStyle=C.violet;c.lineWidth=2;c.beginPath();for(let i=0;i<=14;i+=2)c.lineTo(p.x-i,p.y+Math.sin((p.x-i)*0.5)*3);c.stroke();});
    S.fl.forEach(f=>disk(c,f.x,f.y,3+(0.4-f.t)*20,rgba('warm',f.t*1.6)));
    const gx=W*0.1,gy=H*0.66,gw=W*0.8,gh=H*0.26,th=[];for(let x=0;x<=20;x+=0.1)th.push([x,Math.exp(-mu*x)]);const meas=S.res.length?S.res.reduce((a,b)=>a+b,0)/S.res.length:null;
    const G=gplot(c,gx,gy,gw,gh,{x0:0,x1:20,y0:0,y1:1.05,xt:5,yt:0.5,yd:1,xl:'x, sm',yl:'I/I₀',lines:[[th,C.accent,2.2]],marks:meas!=null&&S.res.length>30?[[P.x,meas,C.warm]]:[]});
    const xh=Math.LN2/mu;if(xh<20){line(c,G.X(xh),G.Y(0),G.X(xh),G.Y(0.5),C.violet,1.3,[4,3]);line(c,gx,G.Y(0.5),G.X(xh),G.Y(0.5),C.violet,1.3,[4,3]);txt(c,'x½',G.X(xh)+4,G.Y(0.5)-8,C.violet,{font:SMALL});}},
  read(S,P){const M=ABS_M[P.m],mu=M[1],meas=S.res.length?S.res.reduce((a,b)=>a+b,0)/S.res.length:0;return[['Material',M[0]],['Yutilish koeffitsiyenti μ',fmt(mu,3)+' 1/sm'],['Yarim susaytirish qatlami x½',fmt(Math.LN2/mu,2)+' sm'],['Nazariy I/I₀',fmt(Math.exp(-mu*P.x),3)],['Hisoblagich bo‘yicha I/I₀',S.res.length>30?fmt(meas,3):'—'],['Qayd etilgan kvantlar',S.n+' ta']];}
});

/* 24. Rentgen nurlanishi spektri */
const XR_A=[{n:'mis (Cu)',Z:29,k:[[0.1542,1],[0.1392,0.2]],e:8.98,l:[]},{n:'molibden (Mo)',Z:42,k:[[0.0711,1],[0.0632,0.22]],e:20,l:[]},{n:'volfram (W)',Z:74,k:[[0.0211,1],[0.0184,0.25]],e:69.5,l:[[0.1476,0.5],[0.1282,0.3]],le:12.1}];
SIMS.push({id:'rentgen',cat:'kva',title:'Rentgen trubkasi va rentgen spektri',short:'λ_min = hc/(eU)',
  sub:'Kuchlanish bilan tezlatilgan elektronlar anodga uriladi va tormozlanish nurlanishi hosil bo‘ladi. Spektrning qisqa to‘lqinli chegarasi faqat kuchlanishga bog‘liq; keskin cho‘qqilar esa anod moddasiga xos.',
  formula:`<span><i>λ</i><sub>min</sub> = ${fr('<i>hc</i>','<i>eU</i>')} ≈ ${fr('1,24','<i>U</i> [kV]')} nm</span><span class="alt"><i>η</i> ≈ 1,1·10⁻⁹ <i>ZU</i></span>`,
  text:['Elektron anodda tormozlanganda energiyasining bir qismini rentgen fotoni sifatida chiqaradi. Eng katta foton energiyasi elektronning butun kinetik energiyasi eU ga teng — bu λmin chegarasini beradi (Duan–Xant qonuni). Spektrning shu uzluksiz qismi tormozlanish nurlanishi deyiladi.','Kuchlanish yetarlicha katta bo‘lsa, elektron atomning ichki K-qobig‘idan elektronni urib chiqaradi va bo‘sh joyga yuqoridagi elektron o‘tib, aniq energiyali Kα, Kβ chiziqlarini chiqaradi — xarakteristik nurlanish. Trubkaning FIK juda kichik: energiyaning 99 % dan ortig‘i anodni qizdiradi.'],
  legend:[['U','tezlatuvchi kuchlanish, kV'],['λmin','spektrning qisqa to‘lqinli chegarasi'],['Kα, Kβ','anod moddasining xarakteristik chiziqlari'],['Z','anod moddasining tartib raqami'],['η','trubkaning foydali ish koeffitsiyenti']],
  tries:['Molibden anodda U ni 15 dan 25 kV ga oshiring: Kα chizig‘i qachon paydo bo‘ladi?','U ni ikki marta oshiring: λmin qanday o‘zgaradi, Kα joyi-chi?','Volframda 60 va 80 kV ni solishtiring.'],
  params:[{id:'U',label:'Kuchlanish',sym:'U',min:10,max:100,step:1,val:30,unit:'kV',d:0},{id:'a',label:'Anod (0 — mis, 1 — molibden, 2 — volfram)',sym:'',min:0,max:2,step:1,val:1,unit:'',d:0}],
  spec(P){const A=XR_A[P.a],lm=1.24/P.U,pk=A.Z/(4*lm*lm),pts=[];const lines=[];if(P.U>A.e)A.k.forEach(([l,r])=>lines.push([l,r*pk*Math.min(6,4*Math.pow(P.U/A.e-1,0.9))]));if(A.le&&P.U>A.le)A.l.forEach(([l,r])=>lines.push([l,r*pk*Math.min(2.5,0.9*Math.pow(P.U/A.le-1,1.1))]));
    for(let i=0;i<=400;i++){const l=0.25*i/400;let v=l>lm?A.Z*(l/lm-1)/(l*l):0;lines.forEach(([L,h])=>{v+=h*Math.exp(-Math.pow((l-L)/0.0012,2));});pts.push([l,v]);}const mx=Math.max(...pts.map(p=>p[1]));return{A,lm,pts,mx,lines};},
  init(P){return{e:[],x:[],acc:0,ax:0};},
  step(S,P,dt){const g=S.g;if(!g)return;const v=Math.sqrt(1-1/Math.pow(1+P.U/511,2));S.acc+=dt*(20+P.U*0.6);while(S.acc>=1){S.acc--;S.e.push({x:g.cx,y:g.cy+(Math.random()-0.5)*8});}
    const sp=(g.ax-g.cx)*v*3.2*dt;S.e.forEach(e=>{e.x+=sp;if(e.x>=g.ax){e.d=1;if(Math.random()<0.35){const an=Math.PI*(0.35+Math.random()*0.3);S.x.push({x:g.ax,y:e.y,vx:Math.cos(an),vy:Math.sin(an),t:0});}}});S.e=S.e.filter(e=>!e.d);
    S.x.forEach(p=>{p.t+=dt;p.x+=p.vx*g.s*dt;p.y+=p.vy*g.s*dt;});S.x=S.x.filter(p=>p.t<1.6);},
  draw(c,W,H,S,P){grid(c,W,H,28);const nar=W<H*0.95,q=this.spec(P),tw=nar?W*0.9:W*0.42,th=nar?H*0.3:H*0.42,tx=nar?W*0.05:W*0.03,ty=nar?H*0.04:H*0.18,cx=tx+tw*0.16,cy=ty+th*0.45,ax=tx+tw*0.78;S.g={cx,cy,ax,s:th*0.9,tx,ty,tw,th};
    c.fillStyle=rgba('accent',0.07);c.strokeStyle=rgba('accent',0.6);c.lineWidth=2;c.beginPath();c.ellipse(tx+tw/2,cy,tw/2,th*0.38,0,0,TAU);c.fill();c.stroke();
    rrect(c,cx-18,cy-14,14,28,3,'#555c66',C.ink);for(let i=0;i<4;i++)line(c,cx-4,cy-9+i*6,cx+4,cy-9+i*6,'#ff9a3d',2);txt(c,'katod',cx-10,cy+30,C.muted,{align:'center',font:SMALL});
    c.fillStyle='#b87333';c.beginPath();c.moveTo(ax,cy-th*0.2);c.lineTo(ax+tw*0.14,cy-th*0.2);c.lineTo(ax+tw*0.14,cy+th*0.14);c.lineTo(ax+16,cy+th*0.14);c.closePath();c.fill();txt(c,'anod',ax+tw*0.08,cy-th*0.2-10,C.muted,{align:'center',font:SMALL});
    txt(c,'U = '+fmt(P.U,0)+' kV',tx+tw/2,ty+6,C.ink,{align:'center',font:'700 14px "IBM Plex Mono", monospace'});
    S.e.forEach(e=>disk(c,e.x,e.y,2.4,C.accent));S.x.forEach(p=>{c.strokeStyle=rgba('violet',Math.max(0,1-p.t/1.6));c.lineWidth=1.8;c.beginPath();for(let i=0;i<16;i+=2){const s=Math.sin((p.t*300+i)*0.9)*2.5;c.lineTo(p.x-p.vx*i-p.vy*s,p.y-p.vy*i+p.vx*s);}c.stroke();});
    txt(c,'rentgen nurlari',ax-10,cy+th*0.55,C.violet,{align:'center',font:SMALL});
    const gx=nar?W*0.12:W*0.53,gy=nar?H*0.46:H*0.1,gw=nar?W*0.82:W*0.43,gh=nar?H*0.42:H*0.72,y1=q.mx*1.12;
    const G=gplot(c,gx,gy,gw,gh,{x0:0,x1:0.25,y0:0,y1,xt:0.05,xd:2,yl:'I (nisbiy)',xl:'λ, nm',fill:[[q.pts,rgba('accent',0.15)]],lines:[[q.pts,C.accent,2.2]]});
    if(q.lm<0.25){line(c,G.X(q.lm),gy,G.X(q.lm),gy+gh,C.red,1.5,[4,3]);txt(c,'λmin',G.X(q.lm)+4,gy+10,C.red,{font:SMALL});}
    q.lines.forEach(([l,h],i)=>{if(l>=0.25)return;const pv=q.pts[Math.round(l/0.25*400)][1];txt(c,i===0?'Kα':i===1?'Kβ':i===2?'Lα':'Lβ',G.X(l)+(i%2?-10:10),G.Y(pv)-4,C.warm,{align:'center',font:SMALL});});},
  read(S,P){const q=this.spec(P),v=Math.sqrt(1-1/Math.pow(1+P.U/511,2)),eta=1.1e-9*q.A.Z*P.U*1000;return[['Anod',q.A.n],['λmin',fmt(q.lm*1000,1)+' pm'],['Eng katta foton energiyasi',fmt(P.U,0)+' keV'],['Elektron tezligi',fmt(v,3)+' c'],['K-seriya',P.U>q.A.e?'bor':'yo‘q (U < '+fmt(q.A.e,1)+' kV)'],['Trubka FIK η',fmt(eta*100,2)+' %'],['Issiqlikka',fmt(100-eta*100,1)+' %']];}
});

/* 25. Atom elektron qobiqlari */
const QB_SYM='H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr'.split(' ');
const QB_NAME=['vodorod','geliy','litiy','berilliy','bor','uglerod','azot','kislorod','ftor','neon','natriy','magniy','alyuminiy','kremniy','fosfor','oltingugurt','xlor','argon','kaliy','kalsiy','skandiy','titan','vanadiy','xrom','marganes','temir','kobalt','nikel','mis','rux','galliy','germaniy','mishyak','selen','brom','kripton'];
const QB_SUB=[[1,0],[2,0],[2,1],[3,0],[3,1],[4,0],[3,2],[4,1]];
SIMS.push({id:'qobiq',cat:'kva',title:'Atomning elektron qobiqlari va orbitallari',short:'2n² · Pauli · Xund',
  sub:'Tartib raqamini o‘zgartiring: elektronlar energiyasi eng kichik orbitallardan boshlab joylashadi. Har bir katakda ko‘pi bilan ikkita qarama-qarshi spinli elektron bo‘ladi.',
  formula:`<span><i>N</i><sub>max</sub> = 2<i>n</i>²</span><span class="alt">1s 2s 2p 3s 3p 4s 3d 4p</span>`,
  text:['Atomdagi elektron holati to‘rtta kvant soni bilan beriladi: bosh n, orbital l, magnit m va spin s. Pauli prinsipiga ko‘ra ikki elektron bir xil holatda bo‘la olmaydi, shuning uchun har bir orbitalda ko‘pi bilan ikki elektron — biri spini yuqoriga, biri pastga. n-qobiqqa jami 2n² elektron sig‘adi.','Orbitallar energiyasi ortib borish tartibida to‘ladi (Klechkovskiy qoidasi): 4s orbital 3d dan oldin to‘ladi. Bir xil energiyali orbitallarga elektronlar avval bittadan joylashadi (Xund qoidasi). Xrom va mis istisno: yarim yoki to‘liq to‘lgan d-qobiq barqarorroq, shuning uchun bitta 4s elektron 3d ga o‘tadi. Tashqi qobiqdagi elektronlar elementning kimyoviy xossalarini belgilaydi.'],
  legend:[['n','bosh kvant soni (qobiq: K, L, M, N)'],['s, p, d','orbital turlari (l = 0, 1, 2)'],['↑↓','spini qarama-qarshi elektronlar juftligi'],['Z','tartib raqami — elektronlar soni']],
  tries:['Z = 6 (uglerod): 2p da nechta juftlashmagan elektron bor?','Z = 19 va Z = 21: 4s va 3d qaysi tartibda to‘ladi?','Z = 24 (xrom) va Z = 29 (mis) istisnolarini toping.'],
  params:[{id:'Z',label:'Tartib raqami',sym:'Z',min:1,max:36,step:1,val:8,unit:'',d:0}],
  cfg(Z){const e=QB_SUB.map(()=>0);let r=Z;QB_SUB.forEach(([n,l],i)=>{const m=2*(2*l+1),k=Math.min(m,r);e[i]=k;r-=k;});if(Z===24){e[5]=1;e[6]=5;}if(Z===29){e[5]=1;e[6]=10;}return e;},
  info(Z){const e=this.cfg(Z),sh=[0,0,0,0];QB_SUB.forEach(([n],i)=>sh[n-1]+=e[i]);const per=sh.filter(v=>v>0).length;let grp;if(per===1)grp=Z===1?1:18;else if(per<4){const p=Z-(per===2?3:11);grp=p<2?p+1:p+11;}else grp=Z-18;
    const str=QB_SUB.map(([n,l],i)=>e[i]?n+'spd'[l]+SUPN(e[i]):'').filter(Boolean).join(' '),unp=QB_SUB.reduce((s,[n,l],i)=>{const m=2*l+1;return s+(e[i]<=m?e[i]:2*m-e[i]);},0);return{e,sh:sh.filter(v=>v>0),per,grp,str,unp};},
  init(P){return{t:0};},step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const Z=P.Z,I=this.info(Z),nar=W<H*0.95,bx=nar?W*0.5:W*0.27,by=nar?H*0.25:H*0.5,R=nar?Math.min(W*0.42,H*0.22):Math.min(W*0.24,H*0.42);S.g={bx,by,R};
    const rn=n=>R*(0.18+0.82*n/4);disk(c,bx,by,R*0.12,rgba('red',0.85),C.ink);txt(c,'+'+Z,bx,by,'#fff',{align:'center',font:'700 13px "IBM Plex Mono", monospace',base:'middle'});
    I.sh.forEach((k,j)=>{const r=rn(j+1);c.strokeStyle=rgba('accent',0.45);c.lineWidth=1.3;c.beginPath();c.arc(bx,by,r,0,TAU);c.stroke();const la=-0.25-j*0.45;txt(c,'KLMN'[j]+' ('+k+')',bx+Math.cos(la)*r+6,by+Math.sin(la)*r,C.muted,{font:SMALL});for(let i=0;i<k;i++){const a=S.t*(1.4/(j+1))+i*TAU/k+j*0.4;disk(c,bx+Math.cos(a)*r,by+Math.sin(a)*r,4,C.accent);}});
    txt(c,QB_SYM[Z-1],nar?W*0.06:W*0.04,30,C.ink,{font:'800 30px "IBM Plex Sans", sans-serif'});txt(c,QB_NAME[Z-1],nar?W*0.06:W*0.04,54,C.muted,{font:SMALL});
    const ox=nar?W*0.08:W*0.54,oy=nar?H*0.95:H*0.9,dy=nar?H*0.052:H*0.1,bw=Math.min(28,(W-ox-44)/12,dy-4),cols={0:0,1:2.4,2:6.8};
    QB_SUB.forEach(([n,l],i)=>{const y=oy-i*dy,m=2*l+1,x0=ox+30+cols[l]*bw,ee=I.e[i];txt(c,n+'spd'[l],ox,y-bw/2,ee?C.ink:C.muted,{font:'700 13px "IBM Plex Mono", monospace',base:'middle'});
      for(let k=0;k<m;k++){const x=x0+k*bw;c.strokeStyle=ee?C.ink:rgba('muted',0.5);c.lineWidth=1.3;c.strokeRect(x,y-bw,bw,bw);const up=ee>k,dn=ee>m+k;if(up)arrow(c,x+bw*0.32,y-bw*0.15,x+bw*0.32,y-bw*0.85,C.accent,2);if(dn)arrow(c,x+bw*0.68,y-bw*0.85,x+bw*0.68,y-bw*0.15,C.red,2);}});
    arrow(c,ox-12,oy,ox-12,oy-7.6*dy,rgba('muted',0.7),1.5);txt(c,'E',ox-12,oy-7.6*dy-10,C.muted,{align:'center',font:SMALL});
    txt(c,I.str,nar?W-14:W*0.73,nar?28:H*0.07,C.ink,{align:nar?'right':'center',font:'700 15px "IBM Plex Mono", monospace'});if(Z===24||Z===29)txt(c,'istisno: 4s → 3d',nar?W-14:W*0.73,nar?48:H*0.07+20,C.warm,{align:nar?'right':'center',font:SMALL});},
  read(S,P){const I=this.info(P.Z);return[['Element',QB_NAME[P.Z-1]+' ('+QB_SYM[P.Z-1]+')'],['Elektron konfiguratsiya',I.str],['Qobiqlar bo‘yicha',I.sh.join(', ')],['Davr',String(I.per)],['Guruh',String(I.grp)],['Juftlashmagan elektronlar',String(I.unp)]];}
});
