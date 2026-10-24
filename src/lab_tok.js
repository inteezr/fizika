/* ===== Elektr zanjiri laboratoriyasi: istalgan elementni simlar bilan ulash ===== */
const EC_T={wire:{n:'Sim'},bat:{n:'Batareya',E:6,r:0.5},res:{n:'Rezistor',R:10},bulb:{n:'Lampa',R:12,Pn:6},sw:{n:'Kalit',on:1},amm:{n:'Ampermetr'},vlt:{n:'Voltmetr'},cap:{n:'Kondensator',C:0.5},fuse:{n:'Saqlagich',Imax:1},led:{n:'Diod'}};
const ecF=v=>Math.abs(v)<5e-5?0:v;
function ecC(type,a,b,o={}){return Object.assign({type,a,b,I:0,V:0,ph:0,vp:0,dead:0},JSON.parse(JSON.stringify(EC_T[type])),o);}
const EC_PRE={
  oddiy:()=>[ecC('bat',[2,5],[2,2]),ecC('wire',[2,2],[5,2]),ecC('sw',[5,2],[7,2]),ecC('wire',[7,2],[9,2]),ecC('bulb',[9,2],[9,5]),ecC('amm',[9,5],[5,5]),ecC('wire',[5,5],[2,5]),ecC('vlt',[11,2],[11,5]),ecC('wire',[9,2],[11,2]),ecC('wire',[9,5],[11,5])],
  aralash:()=>[ecC('bat',[1,6],[1,1],{E:9}),ecC('wire',[1,1],[3,1]),ecC('bulb',[3,1],[6,1]),ecC('wire',[6,1],[8,1]),ecC('bulb',[8,1],[8,3]),ecC('wire',[8,1],[11,1]),ecC('bulb',[11,1],[11,3]),ecC('wire',[8,3],[11,3]),ecC('amm',[8,3],[8,6]),ecC('wire',[8,6],[1,6]),ecC('sw',[11,3],[11,6],{on:0}),ecC('res',[11,6],[8,6],{R:4})],
  rc:()=>[ecC('bat',[2,5],[2,2]),ecC('sw',[2,2],[5,2],{on:0}),ecC('res',[5,2],[8,2],{R:10}),ecC('cap',[8,2],[8,5],{C:0.5}),ecC('amm',[8,5],[5,5]),ecC('wire',[5,5],[2,5]),ecC('vlt',[10,2],[10,5]),ecC('wire',[8,2],[10,2]),ecC('wire',[8,5],[10,5])],
  saqlagich:()=>[ecC('bat',[2,5],[2,2],{E:12,r:0.2}),ecC('fuse',[2,2],[5,2],{Imax:2}),ecC('wire',[5,2],[8,2]),ecC('bulb',[8,2],[8,5]),ecC('wire',[8,5],[2,5]),ecC('sw',[5,2],[5,5],{on:0}),ecC('wire',[5,5],[8,5])],
  bosh:()=>[]};
function ecSolve(S,dt){const cs=S.cs.filter(c=>!c.dead&&!(c.type==='sw'&&!c.on)),key=p=>p[0]+','+p[1],idx=new Map();S.cs.forEach(c=>{[c.a,c.b].forEach(p=>{if(!idx.has(key(p)))idx.set(key(p),idx.size);});});
  const n=idx.size;if(!n)return;const A=Array.from({length:n},()=>new Float64Array(n)),z=new Float64Array(n);for(let i=0;i<n;i++)A[i][i]=1e-7;
  const G=(c)=>c.type==='wire'||c.type==='sw'?1e4:c.type==='amm'?1e3:c.type==='fuse'?1e3:c.type==='vlt'?1e-7:c.type==='res'?1/Math.max(0.01,c.R):c.type==='bulb'?1/c.R:c.type==='bat'?1/Math.max(0.01,c.r):c.type==='cap'?c.C/dt:c.type==='led'?(c.vp>0.6?1/2:1e-7):0;
  cs.forEach(c=>{const a=idx.get(key(c.a)),b=idx.get(key(c.b)),g=G(c);c.g=g;A[a][a]+=g;A[b][b]+=g;A[a][b]-=g;A[b][a]-=g;
    if(c.type==='bat'){const j=c.E*g;z[b]+=j;z[a]-=j;}if(c.type==='cap'){const j=g*c.vp;z[a]+=j;z[b]-=j;}if(c.type==='led'&&c.vp>0.6){const j=0.6/2;z[a]+=j;z[b]-=j;}});
  for(let i=0;i<n;i++){let p=i;for(let r=i+1;r<n;r++)if(Math.abs(A[r][i])>Math.abs(A[p][i]))p=r;[A[i],A[p]]=[A[p],A[i]];[z[i],z[p]]=[z[p],z[i]];const d=A[i][i]||1e-12;for(let r=i+1;r<n;r++){const f=A[r][i]/d;if(!f)continue;for(let k=i;k<n;k++)A[r][k]-=f*A[i][k];z[r]-=f*z[i];}}
  const v=new Float64Array(n);for(let i=n-1;i>=0;i--){let s=z[i];for(let k=i+1;k<n;k++)s-=A[i][k]*v[k];v[i]=s/(A[i][i]||1e-12);}
  S.cs.forEach(c=>{const va=v[idx.get(key(c.a))],vb=v[idx.get(key(c.b))];c.V=va-vb;if(c.dead||(c.type==='sw'&&!c.on)){c.I=0;return;}const g=c.g;
    c.I=c.type==='bat'?c.E*g-(vb-va)*g:c.type==='cap'?g*(c.V-c.vp):c.type==='led'?(c.vp>0.6?(c.V-0.6)/2:0):g*c.V;
    if(c.type==='cap')c.vp=c.V;if(c.type==='led'){c.vp=c.V;}
    if(c.type==='fuse'&&Math.abs(c.I)>c.Imax){c.dead=1;S.msg='Saqlagich kuyib qoldi! (I > '+fmt(c.Imax,1)+' A)';}
    if(c.type==='bulb'&&c.I*c.I*c.R>c.Pn*4){c.dead=1;S.msg='Lampa kuyib qoldi! Kuchlanish juda katta.';}});}
SIMS.push({id:'lab_tok',cat:'tok',lab:1,sandbox:1,title:'Elektr zanjiri laboratoriyasi',short:'istalgan zanjirni yig‘ing',
  sub:'Batareya, rezistor, lampa, kalit, kondensator, saqlagich, diod va o‘lchov asboblarini simlar bilan xohlagancha ulang. Zanjir Kirxgof qonunlari bo‘yicha hisoblanadi.',
  formula:`<span><i>I</i> = ${fr('<i>U</i>','<i>R</i>')}, &nbsp;Σ<i>I</i><sub>tugun</sub> = 0</span><span class="alt">Σ<i>ℰ</i> = Σ<i>IR</i> &nbsp;(berk kontur), &nbsp;<i>P</i> = <i>UI</i></span>`,
  text:[LABTXT,'Element qo‘shish uchun asbobni tanlab, panjara nuqtasidan boshqa nuqtagacha sudrang. Bir nuqtaga tutashgan elementlar ulangan hisoblanadi. «Surish» rejimida kalitni bosib yoqing yoki o‘chiring, elementni tanlab qiymatlarini o‘zgartiring, nuqtani sudrab simlarni ko‘chiring. Tok yo‘nalishi musbat zaryadlar harakati bilan ko‘rsatilgan.'],
  legend:[['ℰ','batareya EYuK, V'],['r','ichki qarshilik, Ω'],['R','qarshilik, Ω'],['C','sig‘im, F'],['I','tok kuchi, A'],['U','kuchlanish, V']],
  tries:['Ikki lampani ketma-ket, keyin parallel ulang: qaysi holatda yorug‘roq yonadi?','Ampermetrni lampaga parallel ulab ko‘ring: u qisqa tutashuv hosil qiladi va boshqa lampa o‘chadi.','«Saqlagich» tajribasida kalitni yoping: qisqa tutashuvda saqlagich kuyadi va zanjirni himoya qiladi.'],
  hint:'Asbobni tanlang va bir nuqtadan ikkinchisiga sudrang',
  tools:[{id:'move',label:'Surish / kalit'},{id:'wire',label:'Sim'},{id:'bat',label:'Batareya'},{id:'res',label:'Rezistor'},{id:'bulb',label:'Lampa'},{id:'sw',label:'Kalit'},{id:'amm',label:'Ampermetr'},{id:'vlt',label:'Voltmetr'},{id:'cap',label:'Kondensator'},{id:'fuse',label:'Saqlagich'},{id:'led',label:'Diod'},{id:'del',label:'O‘chirish'},{id:'fix',label:'Tiklash',act:1},{id:'clear',label:'Bo‘sh stol',act:1}],
  hints:{move:'Kalitni bosing, elementni tanlang yoki nuqtani sudrang',del:'O‘chiriladigan elementni bosing'},
  params:[{id:'pre',label:'Tajriba',choices:[[0,'Oddiy zanjir'],[1,'Ketma-ket va parallel'],[2,'Kondensator (RC)'],[3,'Saqlagich'],[4,'Bo‘sh stol']],val:0,reset:1}],
  init:P=>({cs:EC_PRE[['oddiy','aralash','rc','saqlagich','bosh'][P.pre]](),sel:null,pl:null,dn:null,msg:'',t:0}),
  action(id,S){if(id==='clear'){S.cs=[];S.sel=null;}if(id==='fix'){S.cs.forEach(c=>c.dead=0);S.msg='';}},
  step(S,P,dt){S.t+=dt;const n=4;for(let i=0;i<n;i++)ecSolve(S,dt/n);S.cs.forEach(c=>{c.ph+=c.I*dt*1.4;});},
  draw(c,W,H,S,P){const Gp=Math.max(40,Math.min(64,W/13)),ox=Math.round((W-Math.floor((W-30)/Gp)*Gp)/2),oy=24,X=i=>ox+i*Gp,Y=j=>oy+j*Gp,nc=Math.floor((W-30)/Gp),nr=Math.floor((H-40)/Gp);S.G={Gp,ox,oy,nc,nr};S.g=S.G;
    c.fillStyle=rgba('muted',0.45);for(let i=0;i<=nc;i++)for(let j=0;j<=nr;j++){c.beginPath();c.arc(X(i),Y(j),1.8,0,TAU);c.fill();}
    const pl=S.pl?[S.pl]:[];[...S.cs,...pl].forEach(e=>{const x1=X(e.a[0]),y1=Y(e.a[1]),x2=X(e.b[0]),y2=Y(e.b[1]),L=Math.hypot(x2-x1,y2-y1);if(L<2)return;const ang=Math.atan2(y2-y1,x2-x1),sel=e===S.sel,col=sel?C.accent:e.dead?C.muted:C.ink,hs=Math.min(20,L/2-2);
      c.save();c.translate((x1+x2)/2,(y1+y2)/2);c.rotate(ang);c.globalAlpha=e===S.pl?0.5:1;c.strokeStyle=col;c.fillStyle=col;c.lineWidth=2.4;c.lineCap='round';
      const lead=()=>{c.beginPath();c.moveTo(-L/2,0);c.lineTo(-hs,0);c.moveTo(hs,0);c.lineTo(L/2,0);c.stroke();};
      if(e.type==='wire'){c.beginPath();c.moveTo(-L/2,0);c.lineTo(L/2,0);c.stroke();}
      else if(e.type==='bat'){lead();c.lineWidth=2.5;c.beginPath();c.moveTo(-5,-15);c.lineTo(-5,15);c.stroke();c.lineWidth=5;c.beginPath();c.moveTo(5,-8);c.lineTo(5,8);c.stroke();c.lineWidth=2.4;c.beginPath();c.moveTo(-hs,0);c.lineTo(-5,0);c.moveTo(5,0);c.lineTo(hs,0);c.stroke();}
      else if(e.type==='res'){lead();c.beginPath();c.rect(-hs,-7,2*hs,14);c.stroke();}
      else if(e.type==='bulb'){lead();const P2=e.I*e.I*e.R,br=e.dead?0:Math.min(1,P2/e.Pn);if(br>0.02){const gr=c.createRadialGradient(0,0,2,0,0,40);gr.addColorStop(0,`rgba(255,226,120,${0.9*br})`);gr.addColorStop(1,'rgba(255,200,80,0)');c.fillStyle=gr;c.beginPath();c.arc(0,0,40,0,TAU);c.fill();}
        c.fillStyle=br>0.02?`rgba(255,${200+40*br},${80+60*br},${0.4+0.6*br})`:C.canvas;c.beginPath();c.arc(0,0,hs*0.75,0,TAU);c.fill();c.stroke();const q=hs*0.5;c.beginPath();c.moveTo(-q,-q);c.lineTo(q,q);c.moveTo(q,-q);c.lineTo(-q,q);c.stroke();}
      else if(e.type==='sw'){c.beginPath();c.moveTo(-L/2,0);c.lineTo(-hs,0);c.moveTo(hs,0);c.lineTo(L/2,0);c.stroke();disk(c,-hs,0,3.5,col);disk(c,hs,0,3.5,col);c.beginPath();c.moveTo(-hs,0);e.on?c.lineTo(hs,-2):c.lineTo(hs*0.6,-hs*0.9);c.stroke();}
      else if(e.type==='amm'||e.type==='vlt'){lead();c.fillStyle=C.canvas;c.beginPath();c.arc(0,0,hs*0.8,0,TAU);c.fill();c.stroke();}
      else if(e.type==='cap'){c.beginPath();c.moveTo(-L/2,0);c.lineTo(-4,0);c.moveTo(4,0);c.lineTo(L/2,0);c.stroke();c.lineWidth=3;c.beginPath();c.moveTo(-4,-13);c.lineTo(-4,13);c.moveTo(4,-13);c.lineTo(4,13);c.stroke();}
      else if(e.type==='fuse'){lead();c.beginPath();c.rect(-hs,-6,2*hs,12);c.stroke();if(!e.dead){c.beginPath();c.moveTo(-hs,0);c.lineTo(hs,0);c.stroke();}else{c.beginPath();c.moveTo(-hs,0);c.lineTo(-3,2);c.moveTo(3,-2);c.lineTo(hs,0);c.stroke();}}
      else if(e.type==='led'){lead();const on=e.I>0.005;if(on){c.fillStyle='rgba(255,90,90,0.35)';c.beginPath();c.arc(0,0,22,0,TAU);c.fill();}c.fillStyle=on?C.red:col;c.beginPath();c.moveTo(-8,-10);c.lineTo(-8,10);c.lineTo(8,0);c.closePath();c.fill();c.lineWidth=3;c.beginPath();c.moveTo(8,-10);c.lineTo(8,10);c.stroke();}
      c.globalAlpha=1;
      if(e!==S.pl&&Math.abs(e.I)>1e-4&&e.type!=='vlt'){const sp=22,off=((e.ph*30)%sp+sp)%sp;c.fillStyle=C.warm;for(let s=-L/2+off;s<L/2;s+=sp){if(e.type!=='wire'&&Math.abs(s)<hs+2)continue;c.beginPath();c.arc(s,0,2.6,0,TAU);c.fill();}}
      c.restore();
      if(e===S.pl)return;const mx=(x1+x2)/2,my=(y1+y2)/2,nx=-Math.sin(ang),ny=Math.cos(ang),lx=mx+nx*30,ly=my+ny*30;
      if(e.type==='amm'){txt(c,'A',mx,my+1,col,{align:'center',font:'700 13px sans-serif'});txt(c,fmt(ecF(Math.abs(e.I)),2)+' A',lx,ly,C.green,{align:'center',font:'600 12px "IBM Plex Mono",monospace'});}
      else if(e.type==='vlt'){txt(c,'V',mx,my+1,col,{align:'center',font:'700 13px sans-serif'});txt(c,fmt(ecF(Math.abs(e.V)),2)+' V',lx,ly,C.violet,{align:'center',font:'600 12px "IBM Plex Mono",monospace'});}
      else if(e.type==='bat')txt(c,fmt(e.E,1)+' V',lx,ly,C.muted,{align:'center',font:SMALL});
      else if(e.type==='res'||e.type==='bulb')txt(c,fmt(e.R,0)+' Ω',lx,ly,C.muted,{align:'center',font:SMALL});
      else if(e.type==='cap')txt(c,fmt(e.C,2)+' F',lx,ly,C.muted,{align:'center',font:SMALL});
      if(e.type==='bat'){const px=x2-(x2-x1)/L*14,py=y2-(y2-y1)/L*14;txt(c,'+',px+nx*12,py+ny*12,C.red,{align:'center',font:'700 13px sans-serif'});}});
    const ends=new Map();S.cs.forEach(e=>[e.a,e.b].forEach(p=>{const k=p+'';ends.set(k,(ends.get(k)||0)+1);}));ends.forEach((n,k)=>{const[i,j]=k.split(',').map(Number);disk(c,X(i),Y(j),n>2?5:3.5,n>2?C.ink:rgba('ink',0.7));});
    if(S.msg)txt(c,S.msg,14,H-14,C.red,{});if(!S.cs.length)txt(c,'Stol bo‘sh — asbobni tanlab, nuqtadan nuqtaga sudrang',W/2,H/2,C.muted,{align:'center',font:'500 14px "IBM Plex Sans", sans-serif'});},
  pointer(type,x,y,S,P,api){const G=S.G;if(!G)return false;const sn=()=>[clamp(Math.round((x-G.ox)/G.Gp),0,G.nc),clamp(Math.round((y-G.oy)/G.Gp),0,G.nr)],near=()=>{const[i,j]=sn();return Math.hypot(G.ox+i*G.Gp-x,G.oy+j*G.Gp-y)<G.Gp*0.42?[i,j]:null;},
      hit=()=>{let best=null,bd=12;S.cs.forEach(e=>{const d=segDist(x,y,G.ox+e.a[0]*G.Gp,G.oy+e.a[1]*G.Gp,G.ox+e.b[0]*G.Gp,G.oy+e.b[1]*G.Gp);if(d<bd){bd=d;best=e;}});return best;},md=S.mode,eq=(p,q)=>p[0]===q[0]&&p[1]===q[1];
    if(type==='down'){if(md==='move'){const p=near(),used=p&&S.cs.some(q=>eq(q.a,p)||eq(q.b,p));if(used&&Math.hypot(G.ox+p[0]*G.Gp-x,G.oy+p[1]*G.Gp-y)<11){S.dn=p;return true;}const e=hit();if(e&&e.type==='sw')e.on=e.on?0:1;S.sel=e||null;return !!e;}
      if(md==='del'){const e=hit();if(!e)return false;S.cs.splice(S.cs.indexOf(e),1);S.sel=null;return true;}
      if(EC_T[md]){const p=near();if(!p)return false;S.pl=ecC(md,p,p);return true;}return false;}
    if(type==='move'){if(S.pl){S.pl.b=sn();return true;}if(S.dn){const p=sn();if(!eq(p,S.dn)){S.cs.forEach(q=>{if(eq(q.a,S.dn))q.a=p;if(eq(q.b,S.dn))q.b=p;});S.dn=p;}return true;}return false;}
    if(type==='up'){if(S.pl){const e=S.pl;S.pl=null;if(!eq(e.a,e.b)){S.cs.push(e);S.sel=e;}}S.dn=null;S.cs=S.cs.filter(q=>!eq(q.a,q.b));}return false;},
  inspect(S){const e=S.sel;if(!e||!S.cs.includes(e))return null;const pr=[];
    if(e.type==='bat')pr.push({label:'EYuK',sym:'ℰ',min:0,max:24,step:0.5,unit:'V',d:1,get:()=>e.E,set:v=>e.E=v},{label:'Ichki qarshilik',sym:'r',min:0.01,max:5,step:0.01,unit:'Ω',d:2,get:()=>e.r,set:v=>e.r=v},{label:'Qutblarini almashtirish',toggle:1,get:()=>false,set:()=>{[e.a,e.b]=[e.b,e.a];}});
    if(e.type==='res')pr.push({label:'Qarshilik',sym:'R',min:1,max:200,step:1,unit:'Ω',d:0,get:()=>e.R,set:v=>e.R=v});
    if(e.type==='bulb')pr.push({label:'Qarshilik',sym:'R',min:2,max:60,step:1,unit:'Ω',d:0,get:()=>e.R,set:v=>e.R=v},{label:'Nominal quvvat',sym:'P',min:0.5,max:20,step:0.5,unit:'W',d:1,get:()=>e.Pn,set:v=>e.Pn=v});
    if(e.type==='sw')pr.push({label:'Yoqilgan',toggle:1,get:()=>!!e.on,set:v=>e.on=v?1:0});
    if(e.type==='cap')pr.push({label:'Sig‘im',sym:'C',min:0.05,max:5,step:0.05,unit:'F',d:2,get:()=>e.C,set:v=>e.C=v});
    if(e.type==='fuse')pr.push({label:'Ruxsat etilgan tok',sym:'I',min:0.1,max:10,step:0.1,unit:'A',d:1,get:()=>e.Imax,set:v=>e.Imax=v});
    if(e.type==='led')pr.push({label:'Yo‘nalishini almashtirish',toggle:1,get:()=>false,set:()=>{[e.a,e.b]=[e.b,e.a];}});
    return{title:EC_T[e.type].n+(e.dead?' (kuygan)':''),note:'U = '+fmt(ecF(Math.abs(e.V)),2)+' V, I = '+fmt(ecF(Math.abs(e.I)),3)+' A, P = '+fmt(ecF(Math.abs(e.V*e.I)),2)+' W',props:pr,del:()=>S.cs.splice(S.cs.indexOf(e),1)};},
  inspectHint:'Elementni bosing — kuchlanish, tok va qiymatlari shu yerda chiqadi.',
  read(S){const bs=S.cs.filter(e=>e.type==='bat'),Pb=bs.reduce((s,e)=>s+e.E*e.I,0),Pl=S.cs.filter(e=>e.type==='bulb'||e.type==='res').reduce((s,e)=>s+e.I*e.I*e.R,0),e=S.sel&&S.cs.includes(S.sel)?S.sel:null;
    return[['Elementlar soni',String(S.cs.length)],e?['Tanlangan: U / I',fmt(ecF(Math.abs(e.V)),2)+' V / '+fmt(ecF(Math.abs(e.I)),3)+' A']:['Batareyadan tok',bs.length?fmt(ecF(Math.abs(bs[0].I)),3)+' A':'—'],['Manba quvvati',fmt(ecF(Math.abs(Pb)),2)+' W'],['Iste’molchilar quvvati',fmt(ecF(Pl),2)+' W']];}
});
