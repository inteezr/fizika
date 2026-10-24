/* ===== Kvant laboratoriyasi: bir o‘lchamli Shryodinger tenglamasi (kva) =====
   Birliklar: ħ = m = 1, x birligi 0,1 nm (elektron uchun energiya birligi 7,62 eV, vaqt birligi 0,0864 fs).
   Krank–Nikolson usuli (Tomas algoritmi), chetlarda yutuvchi kompleks potensial. */
const QL={N:800,L:200,EU:7.62,TU:0.0864,CAP:30};
QL.dx=QL.L/QL.N;
const QL_PRE=[
  ()=>({obj:[{t:'bar',x:110,w:5,V:1.3}],pk:{x:50,E:1,s:10,dir:1}}),
  ()=>({obj:[{t:'bar',x:96,w:3,V:2.5},{t:'bar',x:124,w:3,V:2.5}],pk:{x:45,E:0.5,s:22,dir:1}}),
  ()=>({obj:[{t:'ho',x:100,w:70,hw:0.15}],pk:{x:72,E:0,s:Math.sqrt(1/(2*0.15/QL.EU)),dir:1,coh:1}}),
  ()=>({obj:[{t:'bar',x:135,w:65,V:0.8}],pk:{x:55,E:1,s:12,dir:1}}),
  ()=>({obj:[{t:'well',x:100,w:20,V:-1.5},{t:'det',x:160,w:20}],pk:{x:45,E:0.6,s:10,dir:1}}),
  ()=>({obj:[],pk:null})];
function qlPot(S){const N=QL.N,dx=QL.dx,V=new Float64Array(N),G=new Float64Array(N);
  for(let j=0;j<N;j++){const x=(j+0.5)*dx;let v=0;
    for(const o of S.obj){if(o.t==='bar'||o.t==='well'){if(Math.abs(x-o.x)<=o.w/2)v+=o.V/QL.EU;}
      else if(o.t==='ho'){const w=o.hw/QL.EU,d=clamp(x-o.x,-o.w,o.w);v+=0.5*w*w*d*d;}}
    V[j]=v;const e=Math.min(x,QL.L-x);G[j]=e<QL.CAP?0.035*Math.pow(1-e/QL.CAP,2):0;}
  S.V=V;S.G=G;S.vdirty=0;qlTE(S);}
function qlTE(S){const V=S.V,N=QL.N,dx=QL.dx,out=[];let em=0.5;S.obj.forEach(o=>{if(o.t==='bar')em=Math.max(em,o.V*1.6);});em=Math.min(Math.max(em,2),6);
  if(S.obj.some(o=>o.t==='ho')||!S.obj.some(o=>o.t==='bar'||o.t==='well')){S.te=null;return;}
  const vL=V[0],vR=V[N-1];
  for(let i=1;i<=140;i++){const E=i/140*em/QL.EU;if(E<=vR||E<=vL){out.push([E*QL.EU,0]);continue;}
    const kR=Math.sqrt(2*(E-vR)),kL=Math.sqrt(2*(E-vL));let pr=1,pi=0,dr=0,di=kR;
    for(let j=N-1;j>=0;j--){const q2=2*(E-V[j]);let a,b,cc;
      if(q2>1e-12){const k=Math.sqrt(q2),cs=Math.cos(k*dx),sn=Math.sin(k*dx);a=cs;b=-sn/k;cc=k*sn;}
      else if(q2<-1e-12){const k=Math.sqrt(-q2),ch=Math.cosh(k*dx),sh=Math.sinh(k*dx);a=ch;b=-sh/k;cc=-k*sh;}
      else{a=1;b=-dx;cc=0;}
      const npr=a*pr+b*dr,npi=a*pi+b*di,ndr=cc*pr+a*dr,ndi=cc*pi+a*di;pr=npr;pi=npi;dr=ndr;di=ndi;}
    /* A = (ψ − iψ′/k)/2 */
    const Ar=(pr+di/kL)/2,Ai=(pi-dr/kL)/2;out.push([E*QL.EU,Math.min(1,(kR/kL)/(Ar*Ar+Ai*Ai))]);}
  S.te={pts:out,em};}
function qlPacket(S,x0,E,s,dir,coh){const N=QL.N,dx=QL.dx,re=new Float64Array(N),im=new Float64Array(N),k=dir*Math.sqrt(2*Math.max(E,0)/QL.EU);let n=0;
  for(let j=0;j<N;j++){const x=(j+0.5)*dx,a=Math.exp(-((x-x0)**2)/(4*s*s));re[j]=a*Math.cos(k*x);im[j]=a*Math.sin(k*x);n+=a*a*dx;}
  n=1/Math.sqrt(n);for(let j=0;j<N;j++){re[j]*=n;im[j]*=n;}S.re=re;S.im=im;S.absL=0;S.absR=0;S.tt=0;S.coh=coh?x0:0;}
function qlStep(S,dt){const N=QL.N,dx=QL.dx,V=S.V,G=S.G,re=S.re,im=S.im,a=dt/(4*dx*dx);
  /* (1 + i dt/2 H) ψ' = (1 − i dt/2 H) ψ;  H = −½∂² + V − iΓ */
  const cr=S._cr||(S._cr=new Float64Array(N)),ci=S._ci||(S._ci=new Float64Array(N)),dr=S._dr||(S._dr=new Float64Array(N)),di=S._di||(S._di=new Float64Array(N));
  let aL=0,aR=0;
  for(let j=0;j<N;j++){const g=G[j];if(g){const p=(re[j]*re[j]+im[j]*im[j])*2*g*dt*dx;if(j<N/2)aL+=p;else aR+=p;}}
  S.absL+=aL;S.absR+=aR;
  /* o‘ng taraf: b = (1 − i dt/2 (2a·… )) */
  for(let j=0;j<N;j++){const h=dt/2*(V[j]),g=dt/2*G[j],dd=2*a;
    const lr=j>0?re[j-1]:0,li=j>0?im[j-1]:0,rr=j<N-1?re[j+1]:0,ri=j<N-1?im[j+1]:0;
    /* (1 − g − i(dd+h))ψ + i a (ψ₋ + ψ₊) */
    const pr=re[j],pi=im[j],sr=lr+rr,si=li+ri;
    dr[j]=(1-g)*pr+(dd+h)*pi-a*si;
    di[j]=(1-g)*pi-(dd+h)*pr+a*sr;}
  /* chap taraf: diag = 1 + g + i(dd+h), yon = −i a. Tomas algoritmi */
  let pr=0,pi=0;
  for(let j=0;j<N;j++){const g=dt/2*G[j],dg=2*a+dt/2*V[j];
    let br=1+g,bi=dg;
    if(j>0){/* b − (−ia)·c'_{j−1} = b + ia c' */ br-= a*ci[j-1];bi+= a*cr[j-1];}
    const den=br*br+bi*bi,ir=br/den,ii=-bi/den;
    /* c' = (−ia)/b */
    cr[j]=a*ii;ci[j]=-a*ir;
    /* d' = (d − (−ia) d'_{j−1}) / b */
    let xr=dr[j],xi=di[j];if(j>0){xr+=-a*pi;xi+=a*pr;}
    pr=xr*ir-xi*ii;pi=xr*ii+xi*ir;dr[j]=pr;di[j]=pi;}
  re[N-1]=dr[N-1];im[N-1]=di[N-1];
  for(let j=N-2;j>=0;j--){const xr=dr[j]-(cr[j]*re[j+1]-ci[j]*im[j+1]),xi=di[j]-(cr[j]*im[j+1]+ci[j]*re[j+1]);re[j]=xr;im[j]=xi;}
}
function qlStats(S){const N=QL.N,dx=QL.dx,re=S.re,im=S.im,V=S.V;let n=0,xm=0,E=0,lo=1e9,hi=-1e9;
  for(const o of S.obj){if(o.t==='det'||o.t==='ho')continue;const w=o.w/2;lo=Math.min(lo,o.x-w);hi=Math.max(hi,o.x+w);}
  let pl=0,pr=0,pin=0;const det=S.obj.filter(o=>o.t==='det').map(()=>0);
  for(let j=0;j<N;j++){const x=(j+0.5)*dx,p=(re[j]*re[j]+im[j]*im[j])*dx;n+=p;xm+=x*p;
    const l=j>0?j-1:j,r=j<N-1?j+1:j,lr=(re[l]-2*re[j]+re[r])/(dx*dx),li=(im[l]-2*im[j]+im[r])/(dx*dx);
    E+=(-0.5*(re[j]*lr+im[j]*li)+V[j]*(re[j]*re[j]+im[j]*im[j]))*dx;
    if(x<lo)pl+=p;else if(x>hi)pr+=p;else pin+=p;
    let k=0;for(const o of S.obj){if(o.t!=='det')continue;if(Math.abs(x-o.x)<=o.w/2)det[k]+=p;k++;}}
  return{n,xm:n>1e-9?xm/n:0,E:n>1e-9?E/n*QL.EU:0,pl,pr,pin,det,lo,hi};}
SIMS.push({id:'lab_kva',cat:'kva',lab:1,sandbox:1,title:'Kvant laboratoriyasi',short:'Shryodinger tenglamasi · to‘siq · o‘lchash',
  sub:'Elektronning to‘lqin paketini o‘zingiz yaratgan potensial ichida harakatlantiring: to‘siqlar, o‘ralar va prujinali (garmonik) o‘ra qo‘ying, detektor qo‘ying va zarra holatini o‘lchang. Hisob Shryodinger tenglamasini aniq yechadi.',
  formula:`<span><i>iħ</i>${fr('∂<i>ψ</i>','∂<i>t</i>')} = −${fr('<i>ħ</i>²','2<i>m</i>')}${fr('∂²<i>ψ</i>','∂<i>x</i>²')} + <i>V</i>(<i>x</i>)<i>ψ</i></span><span class="alt"><i>P</i> = ∫|<i>ψ</i>|² d<i>x</i></span>`,
  text:[LABTXT,'Bu yerda vaqtga bog‘liq Shryodinger tenglamasi Krank–Nikolson usulida yechiladi: har bir qadamda ehtimollik saqlanadi, chetlarda esa to‘lqin yutiladi (qaytib kelmaydi). Rang to‘lqin funksiyasining fazasini bildiradi, balandlik esa |ψ|² — zarrani shu joyda topish ehtimoli zichligi. «O‘lchash» tugmasi zarra o‘rnini |ψ|² bo‘yicha tasodifiy tanlaydi va to‘lqin funksiyasini shu nuqtaga «yig‘adi» (kollaps).'],
  legend:[['ψ','to‘lqin funksiyasi (rang — faza)'],['|ψ|²','ehtimollik zichligi'],['V(x)','potensial energiya, eV'],['⟨E⟩','paketning o‘rtacha energiyasi'],['T, R','o‘tish va qaytish ehtimoli']],
  tries:['«Tunnel» tajribasida paket energiyasini 1,3 eV dan kichik qiling: baribir bir qismi to‘siqdan o‘tadi.','«Ikki to‘siq» tajribasida energiyani o‘zgartiring: ma’lum energiyalarda o‘tish keskin kuchayadi (rezonans tunnel).','Paket yarmi o‘tganda «O‘lchash»ni bosing: zarra yo o‘tgan, yo qaytgan bo‘lib chiqadi — hech qachon ikkalasi emas.'],
  hint:'Obyektni sudrang yoki asbob tanlang',
  tools:[{id:'move',label:'Surish'},{id:'packet',label:'+ To‘lqin paketi'},{id:'bar',label:'+ To‘siq'},{id:'well',label:'+ O‘ra'},{id:'ho',label:'+ Garmonik o‘ra'},{id:'det',label:'+ Detektor'},{id:'del',label:'O‘chirish'},{id:'measure',label:'📍 O‘lchash',act:1},{id:'again',label:'Paketni qayta yuborish',act:1},{id:'clear',label:'Bo‘sh maydon',act:1}],
  hints:{packet:'Paket boshlanadigan joyni bosing',bar:'To‘siq qo‘yiladigan joyni bosing',well:'O‘ra qo‘yiladigan joyni bosing',ho:'Garmonik o‘ra markazini bosing',det:'Detektor joyini bosing',del:'Obyektni bosing'},
  params:[{id:'pre',label:'Tajriba',choices:[[0,'Tunnel effekti'],[1,'Ikki to‘siq (rezonans)'],[2,'Garmonik o‘ra'],[3,'Potensial pog‘ona'],[4,'O‘ra va detektor'],[5,'Bo‘sh']],val:0,reset:1},
    {id:'E',label:'Paket energiyasi',sym:'E',min:0.05,max:4,step:0.05,val:1,unit:'eV',d:2},
    {id:'s',label:'Paket kengligi',sym:'Δx',min:0.3,max:3,step:0.1,val:1,unit:'nm',d:1},
    {id:'dir',label:'Yo‘nalish',choices:[[1,'O‘ngga'],[-1,'Chapga']],val:1},
    {id:'spd',label:'Tezlik',min:0.2,max:3,step:0.1,val:1,unit:'×',d:1}],
  init(P){const p=QL_PRE[P.pre|0]();const S={obj:p.obj,vdirty:1,sel:null,drag:null,t:0,flash:null,clicks:[],cnt:{T:0,R:0,n:0},peak:0.05};
    qlPot(S);if(p.pk){S.last=p.pk;if(!p.pk.coh){S.last={...p.pk,E:P.E,s:P.s*10,dir:P.dir};}qlPacket(S,S.last.x,S.last.E,S.last.s,S.last.dir,S.last.coh);}else{S.last=null;qlPacket(S,50,P.E,P.s*10,P.dir);const N=QL.N;S.re.fill(0);S.im.fill(0);}
    S.pkE=S.last?S.last.E:P.E;return S;},
  action(id,S,P){if(id==='clear'){S.obj=[];S.vdirty=1;S.re.fill(0);S.im.fill(0);S.last=null;S.sel=null;}
    if(id==='again'){const l=S.last||{x:40,E:P.E,s:P.s*10,dir:P.dir};const pk=l.coh?l:{...l,E:P.E,s:P.s*10,dir:P.dir};S.last=pk;qlPacket(S,pk.x,pk.E,pk.s,pk.dir,pk.coh);S.pkE=pk.E;}
    if(id==='measure'){const st=qlStats(S);if(st.n<0.02){S.flash={x:-1,t:0,msg:'Zarra maydondan chiqib ketgan'};return;}
      let r=Math.random()*st.n,j=0;const re=S.re,im=S.im,dx=QL.dx;for(;j<QL.N-1;j++){r-=(re[j]*re[j]+im[j]*im[j])*dx;if(r<=0)break;}
      const x=(j+0.5)*dx;qlPacket(S,x,0,1.5,1);let hit=null;S.obj.forEach(o=>{if(o.t==='det'&&Math.abs(x-o.x)<=o.w/2)hit=o;});if(hit)hit.n=(hit.n||0)+1;
      S.cnt.n++;if(st.hi>st.lo){if(x>st.hi)S.cnt.T++;else if(x<st.lo)S.cnt.R++;}
      S.flash={x,t:0,msg:hit?'Detektor qayd etdi!':'Zarra x = '+fmt(x/10,2)+' nm da topildi'};S.clicks.push(x);if(S.clicks.length>60)S.clicks.shift();}},
  step(S,P,dt){if(S.vdirty)qlPot(S);const l=S.last;if(l&&!l.coh&&(l.E!==P.E||l.s!==P.s*10||l.dir!==P.dir))this.action('again',S,P);const n=Math.round(clamp(dt*60,0.5,3)*12*P.spd)||1;for(let k=0;k<n;k++)qlStep(S,0.12);S.t+=n*0.12;if(S.flash)S.flash.t+=dt;},
  X(x,W){return 24+x/QL.L*(W-48);},
  draw(c,W,H,S,P){grid(c,W,H,28);if(S.vdirty)qlPot(S);const X=x=>24+x/QL.L*(W-48),base=H-46,top=56,hp=base-top,N=QL.N,dx=QL.dx,re=S.re,im=S.im,V=S.V;
    let vmax=1.5;S.obj.forEach(o=>{if(o.t==='bar')vmax=Math.max(vmax,o.V*1.15);});vmax=Math.max(vmax,(S.pkE||P.E)*1.4);
    let vmin=0;S.obj.forEach(o=>{if(o.t==='well')vmin=Math.min(vmin,o.V);});
    const zero=base-(-vmin)/(vmax-vmin)*hp*0.85,EY=e=>zero-e/(vmax-vmin)*hp*0.85;S.g={base,top,zero,EY,X};
    /* yutuvchi chetlar */
    c.fillStyle=rgba('muted',0.07);c.fillRect(X(0),top-14,X(QL.CAP)-X(0),base-top+14);c.fillRect(X(QL.L-QL.CAP),top-14,X(QL.L)-X(QL.L-QL.CAP),base-top+14);
    txt(c,'yutuvchi chet',X(QL.CAP/2),top-2,C.muted,{align:'center',font:SMALL});txt(c,'yutuvchi chet',X(QL.L-QL.CAP/2),top-2,C.muted,{align:'center',font:SMALL});
    /* potensial */
    c.fillStyle='rgba(176,124,255,0.16)';c.beginPath();c.moveTo(X(0),zero);for(let j=0;j<N;j+=2){c.lineTo(X((j+0.5)*dx),EY(Math.min(V[j]*QL.EU,vmax*1.2)));}c.lineTo(X(QL.L),zero);c.closePath();c.fill();
    c.strokeStyle='#b07cff';c.lineWidth=2;c.beginPath();for(let j=0;j<N;j+=2){const y=EY(Math.min(V[j]*QL.EU,vmax*1.2));j?c.lineTo(X((j+0.5)*dx),y):c.moveTo(X(0.5*dx),y);}c.stroke();
    line(c,X(0),zero,X(QL.L),zero,rgba('muted',0.5),1);
    /* |ψ|² rang = faza */
    let pk=0;for(let j=0;j<N;j++)pk=Math.max(pk,re[j]*re[j]+im[j]*im[j]);S.peak=Math.max(pk,S.peak*0.985,0.004);const A=hp*0.62/S.peak;
    const cw=(X(QL.L)-X(0))/N;for(let j=0;j<N;j++){const p=re[j]*re[j]+im[j]*im[j];if(p*A<0.4)continue;const h=(Math.atan2(im[j],re[j])/TAU*360+360)%360;c.fillStyle=`hsla(${h|0},85%,62%,0.85)`;c.fillRect(X(j*dx),zero-p*A,cw+0.6,p*A);}
    c.strokeStyle='#e8eeff';c.lineWidth=1.4;c.beginPath();for(let j=0;j<N;j++){const y=zero-(re[j]*re[j]+im[j]*im[j])*A;j?c.lineTo(X((j+0.5)*dx),y):c.moveTo(X(0.5*dx),y);}c.stroke();
    const sa=Math.sqrt(A*hp*0.18);c.strokeStyle=rgba('accent',0.35);c.lineWidth=1;c.beginPath();for(let j=0;j<N;j++){const y=zero-re[j]*sa;j?c.lineTo(X((j+0.5)*dx),y):c.moveTo(X(0.5*dx),y);}c.stroke();
    /* o‘rtacha energiya */
    const st=qlStats(S);S.st=st;if(st.n>0.02){const y=EY(st.E);line(c,X(0),y,X(QL.L),y,C.warm,1.2,[6,5]);txt(c,'⟨E⟩ = '+fmt(st.E,2)+' eV',X(QL.L)-4,y-6,C.warm,{align:'right',font:SMALL});}
    /* obyektlar */
    S.obj.forEach(o=>{const sel=o===S.sel;
      if(o.t==='det'){const x1=X(o.x-o.w/2),x2=X(o.x+o.w/2);c.fillStyle=rgba('green',sel?0.22:0.12);c.fillRect(x1,top,x2-x1,base-top);c.strokeStyle=sel?C.accent:C.green;c.lineWidth=sel?2.5:1.5;c.strokeRect(x1,top,x2-x1,base-top);
        const p=st.det[S.obj.filter(q=>q.t==='det').indexOf(o)]||0;txt(c,'detektor '+fmt(p*100,1)+' %',(x1+x2)/2,top+14,C.green,{align:'center',font:SMALL});if(o.n)txt(c,'qayd: '+o.n,(x1+x2)/2,top+28,C.green,{align:'center',font:SMALL});}
      else if(o.t==='ho'){txt(c,'ħω = '+fmt(o.hw,2)+' eV',X(o.x),EY(0)+16,sel?C.accent:'#b07cff',{align:'center',font:SMALL});disk(c,X(o.x),zero,sel?6:4,sel?C.accent:'#b07cff');}
      else{const x1=X(o.x-o.w/2),x2=X(o.x+o.w/2),y=EY(o.V);if(sel){c.strokeStyle=C.accent;c.lineWidth=2.5;c.strokeRect(x1,Math.min(y,zero),x2-x1,Math.abs(zero-y));}
        txt(c,(o.t==='bar'?'V = ':'V = ')+fmt(o.V,2)+' eV',(x1+x2)/2,o.V>0?y-8:y+16,sel?C.accent:'#b07cff',{align:'center',font:SMALL});}});
    /* o‘lchash belgisi */
    S.clicks.forEach(x=>line(c,X(x),base+6,X(x),base+14,rgba('red',0.6),2));
    if(S.flash&&S.flash.t<2.2){const f=S.flash,al=Math.max(0,1-f.t/2.2);if(f.x>=0){c.strokeStyle=`rgba(255,90,90,${al})`;c.lineWidth=2;c.beginPath();c.arc(X(f.x),zero,8+f.t*40,0,TAU);c.stroke();}txt(c,f.msg,W/2,top+4,`rgba(255,140,120,${al})`,{align:'center',font:SMALL});}
    for(let k=0;k<=20;k+=5)txt(c,k+' nm',X(k*10),base+28,C.muted,{align:'center',font:SMALL});
    if(S.te){const bw=Math.min(190,W*0.3),bh=70,bx=W-bw-30,by=top+22;c.fillStyle='rgba(8,12,24,0.72)';c.fillRect(bx-8,by-16,bw+16,bh+30);
      axes2(c,bx,by,bw,bh,'E, eV','T(E)');c.strokeStyle=C.green;c.lineWidth=1.6;c.beginPath();S.te.pts.forEach(([e,t],i)=>{const x=bx+e/S.te.em*bw,y=by+bh-t*bh;i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();
      const ex=bx+clamp(P.E/S.te.em,0,1)*bw;line(c,ex,by,ex,by+bh,C.warm,1.2,[3,3]);txt(c,fmt(S.te.em,1),bx+bw,by+bh+11,C.muted,{align:'right',font:SMALL});txt(c,'0',bx,by+bh+11,C.muted,{align:'center',font:SMALL});}
    txt(c,'t = '+fmt(S.t*QL.TU,1)+' fs',W-24,18,C.ink,{align:'right',font:SMALL});txt(c,'rang — ψ fazasi',24,18,C.muted,{font:SMALL});},
  pointer(type,x,y,S,P){if(!S.g)return false;const g=S.g,fx=clamp((x-24)/(g.X(QL.L)-24)*QL.L,0,QL.L),md=S.mode;
    const hit=()=>{let best=null,bd=1e9;S.obj.forEach(o=>{const w=o.t==='ho'?6:Math.max(o.w/2,3);const d=Math.abs(fx-o.x);if(d<w+2&&d<bd){bd=d;best=o;}});return best;};
    if(type==='down'){
      if(md==='move'){const o=hit();S.sel=o;if(o){S.drag={o,dx:fx-o.x};return true;}return false;}
      if(md==='packet'){const pk={x:fx,E:P.E,s:P.s*10,dir:P.dir};S.last=pk;qlPacket(S,pk.x,pk.E,pk.s,pk.dir);S.pkE=P.E;return true;}
      if(md==='bar'){const o={t:'bar',x:fx,w:5,V:Math.max(0.3,Math.round(P.E*1.3*10)/10)};S.obj.push(o);S.sel=o;S.vdirty=1;return true;}
      if(md==='well'){const o={t:'well',x:fx,w:20,V:-1};S.obj.push(o);S.sel=o;S.vdirty=1;return true;}
      if(md==='ho'){const o={t:'ho',x:fx,w:60,hw:0.15};S.obj.push(o);S.sel=o;S.vdirty=1;return true;}
      if(md==='det'){const o={t:'det',x:fx,w:20};S.obj.push(o);S.sel=o;return true;}
      if(md==='del'){const o=hit();if(o){S.obj.splice(S.obj.indexOf(o),1);if(S.sel===o)S.sel=null;S.vdirty=1;return true;}return false;}
      return false;}
    if(type==='move'&&S.drag){S.drag.o.x=clamp(fx-S.drag.dx,QL.CAP*0.5,QL.L-QL.CAP*0.5);S.vdirty=1;return true;}
    if(type==='up'){S.drag=null;}return false;},
  inspect(S){const o=S.sel;if(!o||!S.obj.includes(o))return null;const dv=()=>{S.vdirty=1;},del=()=>{S.obj.splice(S.obj.indexOf(o),1);S.sel=null;S.vdirty=1;};
    if(o.t==='bar')return{title:'Potensial to‘siq',note:'Klassik zarra E < V bo‘lsa o‘ta olmaydi, kvant zarra esa tunnel orqali o‘tadi.',props:[{label:'Balandlik',sym:'V',min:0.1,max:6,step:0.05,unit:'eV',d:2,get:()=>o.V,set:v=>{o.V=v;dv();}},{label:'Kenglik',sym:'a',min:0.1,max:8,step:0.1,unit:'nm',d:1,get:()=>o.w/10,set:v=>{o.w=v*10;dv();}}],del};
    if(o.t==='well')return{title:'Potensial o‘ra',note:'O‘ra ustidan uchib o‘tayotgan to‘lqin ham qisman qaytadi.',props:[{label:'Chuqurlik',sym:'V',min:-6,max:-0.1,step:0.05,unit:'eV',d:2,get:()=>o.V,set:v=>{o.V=v;dv();}},{label:'Kenglik',sym:'a',min:0.3,max:8,step:0.1,unit:'nm',d:1,get:()=>o.w/10,set:v=>{o.w=v*10;dv();}}],del};
    if(o.t==='ho')return{title:'Garmonik o‘ra',note:'Sathlar orasidagi masofa ħω. Siljigan paket klassik mayatnik kabi tebranadi.',props:[{label:'Kvant energiyasi',sym:'ħω',min:0.03,max:0.6,step:0.01,unit:'eV',d:2,get:()=>o.hw,set:v=>{o.hw=v;dv();}},{label:'Yarim kenglik',sym:'w',min:1,max:9,step:0.5,unit:'nm',d:1,get:()=>o.w/10,set:v=>{o.w=v*10;dv();}}],del};
    if(o.t==='det')return{title:'Detektor',note:'Ichidagi ehtimollikni ko‘rsatadi. «O‘lchash»da zarra shu yerda topilsa, qayd soni ortadi.',props:[{label:'Kenglik',sym:'a',min:0.5,max:8,step:0.1,unit:'nm',d:1,get:()=>o.w/10,set:v=>{o.w=v*10;}}],del};return null;},
  inspectHint:'To‘siq, o‘ra yoki detektorni bosing.',
  read(S,P){const st=S.st||qlStats(S),lo=st.lo<st.hi;const T=st.pr+S.absR,R=st.pl+S.absL;
    const r=[['Umumiy ehtimollik (maydonda)',fmt(st.n*100,1)+' %'],['⟨x⟩',st.n>0.02?fmt(st.xm/10,2)+' nm':'—'],['⟨E⟩',st.n>0.02?fmt(st.E,3)+' eV':'—']];
    if(lo)r.push(['O‘tdi T / qaytdi R',fmt(T*100,1)+' % / '+fmt(R*100,1)+' %']);
    if(S.cnt.n)r.push(['O‘lchashlar: o‘tgan / qaytgan',S.cnt.T+' / '+S.cnt.R+' ('+S.cnt.n+')']);
    const k=Math.sqrt(2*Math.max(P.E,0.001)/QL.EU);r.push(['de Broyl λ = h/p',fmt(TAU/k/10,3)+' nm']);return r;}
});
