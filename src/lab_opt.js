/* ===== Optika laboratoriyasi (opt): rangli nurlar, dispersiya, botiq ko‘zgu, ekran ===== */
/* Dunyo kengligi 1000 birlik (10 birlik = 1 sm). Shisha: n(λ) = n + D·(1/λ² − 1/0,55²), λ — μm. */
const OL_W=[[0.41,'#9b6bff'],[0.46,'#4f7dff'],[0.49,'#34c3ff'],[0.53,'#3ddc84'],[0.575,'#f5e33b'],[0.61,'#ff9a2e'],[0.66,'#ff3b3b']];
const OL_COL={white:null,red:[[0.66,'#ff3b3b']],green:[[0.53,'#3ddc84']],blue:[[0.46,'#4f7dff']]};
function olN(o,lam){return o.n+0.004*(o.D||1)*(1/(lam*lam)-1/(0.55*0.55));}
function olTrace(objs,ox,oy,dx,dy,lam){const pts=[[ox,oy]];let scr=null;for(let k=0;k<50;k++){let best=Infinity,hit=null;
    for(const o of objs){if(o.t==='src')continue;
      if(o.t==='lens'||o.t==='mirror'||o.t==='cmir'||o.t==='screen'){const nx=Math.cos(o.ang),ny=Math.sin(o.ang),sx=-ny,sy=nx,r=raySeg(ox,oy,dx,dy,o.x-sx*o.h,o.y-sy*o.h,sx*2*o.h,sy*2*o.h);if(r&&r.t<best){best=r.t;hit={o,u:r.u};}}
      else{const Pp=poly(o);for(let i=0;i<Pp.length;i++){const a=Pp[i],b=Pp[(i+1)%Pp.length],r=raySeg(ox,oy,dx,dy,a[0],a[1],b[0]-a[0],b[1]-a[1]);if(r&&r.t<best){best=r.t;hit={o,a,b};}}}}
    if(!hit){pts.push([ox+dx*3000,oy+dy*3000]);break;}
    ox+=dx*best;oy+=dy*best;pts.push([ox,oy]);const o=hit.o;
    if(o.t==='screen'){scr={o,u:hit.u};break;}
    if(o.t==='mirror'||o.t==='cmir'){const nx=Math.cos(o.ang),ny=Math.sin(o.ang),sx=-ny,sy=nx,dn=dx*nx+dy*ny;dx-=2*dn*nx;dy-=2*dn*ny;
      if(o.t==='cmir'){/* sferik ko‘zgu (paraksial): qaytgan nur qiyaligi −y/F ga o‘zgaradi; F > 0 — botiq */const y=(hit.u-0.5)*2*o.h,dn2=dx*nx+dy*ny,sg=Math.sign(dn2)||1,ds=dx*sx+dy*sy,m2=ds/Math.abs(dn2)-y/o.F;dx=nx*sg+sx*m2;dy=ny*sg+sy*m2;const L=Math.hypot(dx,dy);dx/=L;dy/=L;}}
    else if(o.t==='lens'){const nx=Math.cos(o.ang),ny=Math.sin(o.ang),sx=-ny,sy=nx,dn=dx*nx+dy*ny,ds=dx*sx+dy*sy,sg=Math.sign(dn)||1,y=(hit.u-0.5)*2*o.h,m2=ds/Math.abs(dn)-y/o.F;dx=nx*sg+sx*m2;dy=ny*sg+sy*m2;const L=Math.hypot(dx,dy);dx/=L;dy/=L;}
    else{const a=hit.a,b=hit.b,ex=b[0]-a[0],ey=b[1]-a[1],el=Math.hypot(ex,ey);let nx=ey/el,ny=-ex/el;const cx=o.t==='poly'?o.cx:o.x,cy=o.t==='poly'?o.cy:o.y;if((a[0]+ex/2-cx)*nx+(a[1]+ey/2-cy)*ny<0){nx=-nx;ny=-ny;}
      const ng=olN(o,lam);let cosi=-(dx*nx+dy*ny),n1,n2,Nx=nx,Ny=ny;if(cosi>0){n1=1;n2=ng;}else{n1=ng;n2=1;Nx=-nx;Ny=-ny;cosi=-cosi;}
      const r=n1/n2,k2=1-r*r*(1-cosi*cosi);if(k2<0){const dn=dx*Nx+dy*Ny;dx-=2*dn*Nx;dy-=2*dn*Ny;}else{const c2=Math.sqrt(k2);dx=r*dx+(r*cosi-c2)*Nx;dy=r*dy+(r*cosi-c2)*Ny;}}
  }return{pts,scr};}
function olRays(o){const out=[],d=[Math.cos(o.ang),Math.sin(o.ang)],p=[-d[1],d[0]],n=o.nr||9;if(o.kind==='beam'){for(let k=0;k<n;k++){const f=n>1?k/(n-1)-0.5:0;out.push([o.x+p[0]*f*o.w+d[0]*20,o.y+p[1]*f*o.w+d[1]*20,d[0],d[1]]);}}
  else if(o.kind==='laser')out.push([o.x+d[0]*20,o.y+d[1]*20,d[0],d[1]]);
  else for(let k=0;k<n;k++){const a=o.ang+(k/(n-1)-0.5)*o.spr*D2R;out.push([o.x+Math.cos(a)*12,o.y+Math.sin(a)*12,Math.cos(a),Math.sin(a)]);}return out;}
const OL_PRE={
  linza:()=>[{t:'src',x:70,y:300,ang:0,kind:'point',col:'white',spr:24,nr:11,w:120},{t:'lens',x:380,y:300,ang:0,F:150,h:110},{t:'screen',x:671,y:300,ang:Math.PI,h:150}],
  prizma:()=>[{t:'src',x:90,y:420,ang:-0.36,kind:'laser',col:'white',w:20,nr:1},{t:'prism',x:450,y:290,s:210,n:1.52,D:4,ang:0},{t:'screen',x:850,y:330,ang:Math.PI*1.08,h:180}],
  ichki:()=>[{t:'src',x:90,y:290,ang:0.3,kind:'laser',col:'green',w:20,nr:1},{t:'block',x:500,y:300,w:640,h:80,n:1.5},{t:'src',x:330,y:110,ang:1.05,kind:'laser',col:'red',w:20,nr:1},{t:'screen',x:900,y:300,ang:Math.PI,h:120}],
  teleskop:()=>[{t:'src',x:60,y:300,ang:0,kind:'beam',col:'white',w:120,nr:7},{t:'lens',x:250,y:300,ang:0,F:300,h:110},{t:'lens',x:650,y:300,ang:0,F:100,h:70},{t:'screen',x:930,y:300,ang:Math.PI,h:120}],
  kozgu:()=>[{t:'src',x:80,y:300,ang:0,kind:'beam',col:'white',w:200,nr:9},{t:'cmir',x:820,y:300,ang:Math.PI,F:260,h:150}],
  bosh:()=>[]};
const OLN={src:'Yorug‘lik manbai',lens:'Linza',mirror:'Yassi ko‘zgu',cmir:'Sferik ko‘zgu',block:'Shisha plastinka',prism:'Prizma',screen:'Ekran'};
SIMS.push({id:'lab_opt',cat:'opt',lab:1,sandbox:1,title:'Optika laboratoriyasi',short:'nur · prizma · ekran',
  sub:'Oq yoki rangli nur manbalari, linzalar, yassi va sferik ko‘zgular, prizma va ekranlarni optik stolga qo‘ying. Oq nur prizmada spektrga ajraladi, ekran esa tushgan nurlarni ko‘rsatadi.',
  formula:`<span><i>n</i>₁ sin <i>α</i> = <i>n</i>₂ sin <i>β</i></span><span class="alt">${fr('1','<i>F</i>')} = ${fr('1','<i>d</i>')} + ${fr('1','<i>f</i>')}, &nbsp;<i>D</i> = ${fr('1','<i>F</i>')}</span>`,
  text:[LABTXT,'Shishaning sindirish ko‘rsatkichi to‘lqin uzunligiga bog‘liq: binafsha nur qizildan kuchliroq sinadi. Shuning uchun oq nur prizmadan o‘tib kamalak ranglariga ajraladi (dispersiya). Linza nurlarni fokusga yig‘adi, botiq ko‘zgu ham shunday qiladi. Zichroq muhitdan katta burchak ostida chiqayotgan nur to‘liq ichki qaytadi — optik tola shunga asoslangan.'],
  legend:[['n','sindirish ko‘rsatkichi'],['α, β','tushish va sinish burchaklari'],['F','fokus masofasi, sm'],['D','optik kuch, dptr'],['λ','to‘lqin uzunligi']],
  tries:['Linza tajribasida ekranni suring: nurlar bir nuqtaga yig‘ilganda (dog‘ eng kichik) tasvir aniq bo‘ladi. 1/d + 1/f = 1/F ni tekshiring.','Prizmani bosib dispersiyani oshiring: spektr kengayadi.','Optik tola tajribasida yashil nur burchagini kattalashtiring: qachon to‘liq ichki qaytish to‘xtaydi?'],
  hint:'Obyektni sudrang, doiracha bilan buring',
  tools:[{id:'move',label:'Surish / burish'},{id:'src',label:'+ Manba'},{id:'lens',label:'+ Linza'},{id:'mirror',label:'+ Yassi ko‘zgu'},{id:'cmir',label:'+ Botiq ko‘zgu'},{id:'block',label:'+ Plastinka'},{id:'prism',label:'+ Prizma'},{id:'screen',label:'+ Ekran'},{id:'del',label:'O‘chirish'},{id:'clear',label:'Bo‘sh stol',act:1}],
  hints:{move:'Obyektni sudrang; tanlanganini doiracha orqali buring',del:'Obyektni bosing',src:'Joyni bosing',lens:'Joyni bosing',mirror:'Joyni bosing',cmir:'Joyni bosing',block:'Joyni bosing',prism:'Joyni bosing',screen:'Joyni bosing'},
  params:[{id:'pre',label:'Tajriba',choices:[[0,'Linza va tasvir'],[1,'Prizma spektri'],[2,'Optik tola'],[3,'Teleskop'],[4,'Botiq ko‘zgu'],[5,'Bo‘sh stol']],val:0,reset:1}],
  init:P=>({objs:OL_PRE[['linza','prizma','ichki','teleskop','kozgu','bosh'][P.pre]](),sel:null,drag:null}),
  action(id,S){if(id==='clear'){S.objs=[];S.sel=null;}},
  draw(c,W,H,S,P,tt){c.fillStyle=GL.dark?'#05070d':rgba('ink',0.04);c.fillRect(0,0,W,H);grid(c,W,H,28);const sc=W/1000;S.sc=sc;const X=v=>v*sc;let nr=0;const hits=[];
    c.save();c.globalCompositeOperation=GL.dark?'lighter':'source-over';
    S.objs.filter(o=>o.t==='src').forEach(s=>{const ws=OL_COL[s.col]||OL_W;olRays(s).forEach(r=>ws.forEach(([lam,col])=>{const{pts,scr}=olTrace(S.objs,...r,lam);nr++;if(scr)hits.push([scr.o,scr.u,col]);
      c.strokeStyle=col;c.globalAlpha=ws.length>1?0.55:0.9;c.lineWidth=s.kind==='laser'?2.4:1.6;c.shadowColor=col;c.shadowBlur=s.kind==='laser'?8:0;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(X(p[0]),X(p[1])):c.moveTo(X(p[0]),X(p[1])));c.stroke();}));});
    c.restore();c.globalAlpha=1;c.shadowBlur=0;S.nr=nr;S.hits=hits;
    S.objs.forEach(o=>{const sel=o===S.sel,col=sel?C.accent:C.ink;
      if(o.t==='src'){c.save();c.translate(X(o.x),X(o.y));c.rotate(o.ang);c.fillStyle=sel?C.accent:'#3a4252';rrect(c,-26,-12,36,24,5);c.fill();c.fillStyle=OL_COL[o.col]?OL_COL[o.col][0][1]:'#fff';c.fillRect(8,-8,5,16);c.restore();}
      else if(o.t==='lens'||o.t==='mirror'||o.t==='cmir'||o.t==='screen'){const nx=Math.cos(o.ang),ny=Math.sin(o.ang),sx=-ny,sy=nx,ax=o.x-sx*o.h,ay=o.y-sy*o.h,bx=o.x+sx*o.h,by=o.y+sy*o.h;
        if(o.t==='mirror'||o.t==='cmir'){const b=o.t==='cmir'?(o.F>0?-14:14):0;c.strokeStyle=col;c.lineWidth=5;c.beginPath();c.moveTo(X(ax),X(ay));c.quadraticCurveTo(X(o.x+nx*b),X(o.y+ny*b),X(bx),X(by));c.stroke();for(let i=0;i<=8;i++){const u=i/8,px=ax+(bx-ax)*u,py=ay+(by-ay)*u;line(c,X(px-nx*3),X(py-ny*3),X(px-nx*11+sx*6),X(py-ny*11+sy*6),rgba('muted',0.7),1);}
          if(o.t==='cmir'){disk(c,X(o.x+nx*o.F),X(o.y+ny*o.F),3,C.muted);txt(c,'F',X(o.x+nx*o.F)+6,X(o.y+ny*o.F)-8,C.muted,{font:MATH});}}
        else if(o.t==='screen'){line(c,X(ax),X(ay),X(bx),X(by),sel?C.accent:'#d9dee6',7);}
        else{const b=o.F>0?14:-10;c.fillStyle=rgba('water',0.22);c.strokeStyle=sel?C.accent:C.water;c.lineWidth=2;c.beginPath();c.moveTo(X(ax),X(ay));c.quadraticCurveTo(X(o.x+nx*b),X(o.y+ny*b),X(bx),X(by));c.quadraticCurveTo(X(o.x-nx*b),X(o.y-ny*b),X(ax),X(ay));c.fill();c.stroke();[1,-1].forEach(s=>disk(c,X(o.x+nx*o.F*s),X(o.y+ny*o.F*s),3,C.muted));txt(c,'F',X(o.x+nx*o.F)+6,X(o.y+ny*o.F)-8,C.muted,{font:MATH});}}
      else{const Pp=poly(o);c.fillStyle=rgba('water',0.16);c.strokeStyle=sel?C.accent:C.water;c.lineWidth=2;c.beginPath();Pp.forEach((p,i)=>i?c.lineTo(X(p[0]),X(p[1])):c.moveTo(X(p[0]),X(p[1])));c.closePath();c.fill();c.stroke();txt(c,'n = '+fmt(o.n),X(o.x),X(o.y)+(o.t==='prism'?20:0),C.muted,{align:'center',font:SMALL});}
      if(sel&&o.t!=='block'){const[hx,hy]=opHandle(o);line(c,X(o.x),X(o.y),X(hx),X(hy),C.accent,1,[3,3]);disk(c,X(hx),X(hy),7,C.canvas,C.accent);}});
    /* ekrandagi dog‘lar */
    c.save();c.globalCompositeOperation=GL.dark?'lighter':'source-over';hits.forEach(([o,u,col])=>{const sx=-Math.sin(o.ang),sy=Math.cos(o.ang),px=o.x+sx*(u-0.5)*2*o.h,py=o.y+sy*(u-0.5)*2*o.h;const g=c.createRadialGradient(X(px),X(py),0,X(px),X(py),9);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(X(px),X(py),9,0,TAU);c.fill();});c.restore();
    if(!S.objs.length)txt(c,'Stol bo‘sh — avval «+ Manba» qo‘ying',W/2,H/2,C.muted,{align:'center',font:'500 14px "IBM Plex Sans", sans-serif'});},
  pointer(type,x,y,S,P,api){const sc=S.sc,vx=x/sc,vy=y/sc,tol=10/sc,hitO=(q)=>q.t==='cmir'||q.t==='screen'?opHit(Object.assign({},q,{t:'mirror'}),vx,vy,tol):opHit(q,vx,vy,tol);
    if(type==='down'){const md=S.mode;
      if(md==='move'||md==='del'){const o=S.sel;if(md==='move'&&o&&o.t!=='block'&&S.objs.includes(o)){const[hx,hy]=opHandle(o);if(Math.hypot(hx-vx,hy-vy)<10+tol){S.drag={o,rot:true};return true;}}
        const hit=[...S.objs].reverse().find(hitO);if(md==='del'){if(hit){S.objs.splice(S.objs.indexOf(hit),1);S.sel=null;return true;}return false;}
        S.sel=hit||null;if(hit){S.drag={o:hit,ox:vx-hit.x,oy:vy-hit.y};return true;}return false;}
      const add={src:{t:'src',ang:0,kind:'beam',col:'white',w:100,nr:7,spr:24},lens:{t:'lens',ang:0,F:150,h:90},mirror:{t:'mirror',ang:Math.PI,h:70},cmir:{t:'cmir',ang:Math.PI,F:200,h:100},block:{t:'block',w:150,h:90,n:1.5},prism:{t:'prism',s:160,n:1.52,D:3,ang:0},screen:{t:'screen',ang:Math.PI,h:110}}[md];
      if(add){const o=Object.assign({x:vx,y:vy},add);S.objs.push(o);S.sel=o;S.drag={o,ox:0,oy:0};return true;}return false;}
    if(type==='move'&&S.drag){const o=S.drag.o;if(S.drag.rot){o.ang=Math.atan2(vy-o.y,vx-o.x)+(o.t==='prism'?Math.PI/2:0);api.refresh();}else{o.x=vx-S.drag.ox;o.y=vy-S.drag.oy;}return true;}
    if(type==='up')S.drag=null;return false;},
  inspect(S){const o=S.sel;if(!o||!S.objs.includes(o))return null;const angP={label:'Yo‘nalishi',sym:'φ',min:-180,max:180,step:1,unit:'°',d:0,get:()=>Math.round(((o.ang/D2R+540)%360)-180),set:v=>o.ang=v*D2R};let props=[];
    if(o.t==='src')props=[{label:'Turi',choices:[['beam','Dasta'],['point','Nuqtaviy'],['laser','Lazer']],get:()=>o.kind,set:v=>o.kind=v},{label:'Rangi',choices:[['white','Oq'],['red','Qizil'],['green','Yashil'],['blue','Ko‘k']],get:()=>o.col,set:v=>o.col=v},{label:'Nurlar soni',sym:'',min:2,max:15,step:1,d:0,get:()=>o.nr,set:v=>o.nr=v},angP];
    if(o.t==='lens')props=[{label:'Fokus masofasi (manfiy — sochuvchi)',sym:'F',min:-30,max:30,step:1,unit:'sm',d:0,get:()=>Math.round(o.F/10),set:v=>o.F=(Math.abs(v)<1?1:v)*10},{label:'Balandligi',sym:'',min:4,max:24,step:1,unit:'sm',d:0,get:()=>Math.round(o.h/5),set:v=>o.h=v*5},angP];
    if(o.t==='cmir')props=[{label:'Fokus masofasi (manfiy — qavariq)',sym:'F',min:-40,max:40,step:1,unit:'sm',d:0,get:()=>Math.round(o.F/10),set:v=>o.F=(Math.abs(v)<1?1:v)*10},angP];
    if(o.t==='mirror'||o.t==='screen')props=[{label:'Uzunligi',sym:'',min:4,max:40,step:1,unit:'sm',d:0,get:()=>Math.round(o.h/5),set:v=>o.h=v*5},angP];
    if(o.t==='block')props=[{label:'Sindirish ko‘rsatkichi',sym:'n',min:1,max:2.42,step:0.01,d:2,get:()=>o.n,set:v=>o.n=v},{label:'Eni',sym:'',min:3,max:80,step:1,unit:'sm',d:0,get:()=>Math.round(o.w/10),set:v=>o.w=v*10},{label:'Bo‘yi',sym:'',min:3,max:30,step:1,unit:'sm',d:0,get:()=>Math.round(o.h/10),set:v=>o.h=v*10}];
    if(o.t==='prism')props=[{label:'Sindirish ko‘rsatkichi',sym:'n',min:1,max:2.42,step:0.01,d:2,get:()=>o.n,set:v=>o.n=v},{label:'Dispersiya (kuchaytirilgan)',sym:'',min:0,max:8,step:0.5,unit:'×',d:1,get:()=>o.D||1,set:v=>o.D=v},{label:'O‘lchami',sym:'',min:5,max:30,step:1,unit:'sm',d:0,get:()=>Math.round(o.s/10),set:v=>o.s=v*10},angP];
    return{title:OLN[o.t],props,del:()=>S.objs.splice(S.objs.indexOf(o),1)};},
  inspectHint:'Obyektni bosing — xossalari shu yerda chiqadi.',
  read(S){const r=[['Obyektlar',String(S.objs.length)],['Hisoblangan nurlar',String(S.nr||0)]];const o=S.sel;
    if(o&&(o.t==='lens'||o.t==='cmir'))r.push(['Optik kuch D = 1/F',fmt(100/o.F,1)+' dptr']);
    if(o&&(o.t==='prism'||o.t==='block'))r.push(['n (qizil / binafsha)',fmt(olN(o,0.66),3)+' / '+fmt(olN(o,0.41),3)],['To‘liq qaytish chegarasi',fmt(Math.asin(1/o.n)/D2R,1)+'°']);
    const scr=S.objs.find(q=>q.t==='screen');if(scr&&S.hits){const us=S.hits.filter(h=>h[0]===scr).map(h=>h[1]);if(us.length)r.push(['Ekrandagi dog‘ kengligi',fmt((Math.max(...us)-Math.min(...us))*2*scr.h/10,1)+' sm']);}
    const L=S.objs.filter(q=>q.t==='lens'),sr=S.objs.find(q=>q.t==='src'&&q.kind==='point');if(L.length===1&&sr){const d=Math.abs(L[0].x-sr.x)/10,F=L[0].F/10;if(Math.abs(d-F)>0.3){const f=1/(1/F-1/d);r.push(['Tasvirgacha masofa f',fmt(f,1)+' sm'],['Kattalashtirish Γ = f/d',fmt(f/d,2)]);}}return r;}
});
