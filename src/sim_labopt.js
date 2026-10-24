/* Optika laboratoriyasi — nurlar yo‘lini hisoblash */
function poly(o){if(o.t==='poly')return o.pts;if(o.t==='block'){const w=o.w/2,h=o.h/2;return[[o.x-w,o.y-h],[o.x+w,o.y-h],[o.x+w,o.y+h],[o.x-w,o.y+h]];}const R=o.s/Math.sqrt(3);return[-90,30,150].map(a=>[o.x+R*Math.cos(a*D2R+o.ang),o.y+R*Math.sin(a*D2R+o.ang)]);}
function raySeg(ox,oy,dx,dy,ax,ay,ex,ey){const den=dx*ey-dy*ex;if(Math.abs(den)<1e-9)return null;const t=((ax-ox)*ey-(ay-oy)*ex)/den,u=((ax-ox)*dy-(ay-oy)*dx)/den;return t>1e-4&&u>=0&&u<=1?{t,u}:null;}
function ptIn(Pp,x,y){let c=false;for(let i=0,j=Pp.length-1;i<Pp.length;j=i++){const[xi,yi]=Pp[i],[xj,yj]=Pp[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c;}return c;}
function trace(objs,ox,oy,dx,dy){const pts=[[ox,oy]];for(let k=0;k<40;k++){let best=Infinity,hit=null;
    for(const o of objs){if(o.t==='src')continue;
      if(o.t==='lens'||o.t==='mirror'){const nx=Math.cos(o.ang),ny=Math.sin(o.ang),sx=-ny,sy=nx,r=raySeg(ox,oy,dx,dy,o.x-sx*o.h,o.y-sy*o.h,sx*2*o.h,sy*2*o.h);if(r&&r.t<best){best=r.t;hit={o,u:r.u};}}
      else{const Pp=poly(o);for(let i=0;i<Pp.length;i++){const a=Pp[i],b=Pp[(i+1)%Pp.length],r=raySeg(ox,oy,dx,dy,a[0],a[1],b[0]-a[0],b[1]-a[1]);if(r&&r.t<best){best=r.t;hit={o,a,b};}}}}
    if(!hit){pts.push([ox+dx*4000,oy+dy*4000]);break;}
    ox+=dx*best;oy+=dy*best;pts.push([ox,oy]);const o=hit.o;
    if(o.t==='mirror'){const nx=Math.cos(o.ang),ny=Math.sin(o.ang),dn=dx*nx+dy*ny;dx-=2*dn*nx;dy-=2*dn*ny;}
    else if(o.t==='lens'){const nx=Math.cos(o.ang),ny=Math.sin(o.ang),sx=-ny,sy=nx,dn=dx*nx+dy*ny,ds=dx*sx+dy*sy,sg=Math.sign(dn)||1,y=(hit.u-0.5)*2*o.h,m2=ds/Math.abs(dn)-y/o.F;dx=nx*sg+sx*m2;dy=ny*sg+sy*m2;const L=Math.hypot(dx,dy);dx/=L;dy/=L;}
    else{const a=hit.a,b=hit.b,ex=b[0]-a[0],ey=b[1]-a[1],el=Math.hypot(ex,ey);let nx=ey/el,ny=-ex/el;const cx=o.t==='poly'?o.cx:o.x,cy=o.t==='poly'?o.cy:o.y;if((a[0]+ex/2-cx)*nx+(a[1]+ey/2-cy)*ny<0){nx=-nx;ny=-ny;}
      let cosi=-(dx*nx+dy*ny),n1,n2,Nx=nx,Ny=ny;if(cosi>0){n1=1;n2=o.n;}else{n1=o.n;n2=1;Nx=-nx;Ny=-ny;cosi=-cosi;}
      const r=n1/n2,k2=1-r*r*(1-cosi*cosi);if(k2<0){const dn=dx*Nx+dy*Ny;dx-=2*dn*Nx;dy-=2*dn*Ny;}else{const c2=Math.sqrt(k2);dx=r*dx+(r*cosi-c2)*Nx;dy=r*dy+(r*cosi-c2)*Ny;}}
  }return pts;}
function srcRays(o){const out=[],d=[Math.cos(o.ang),Math.sin(o.ang)],p=[-d[1],d[0]];if(o.kind==='beam')for(let k=-4;k<=4;k++)out.push([o.x+p[0]*k*10+d[0]*20,o.y+p[1]*k*10+d[1]*20,d[0],d[1]]);
  else for(let k=-6;k<=6;k++){const a=o.ang+k*5*D2R;out.push([o.x+Math.cos(a)*12,o.y+Math.sin(a)*12,Math.cos(a),Math.sin(a)]);}return out;}
function opHandle(o){if(o.t==='prism'){const a=o.ang-Math.PI/2,d=o.s/Math.sqrt(3)+24;return[o.x+Math.cos(a)*d,o.y+Math.sin(a)*d];}const d=o.t==='src'?46:34;return[o.x+Math.cos(o.ang)*d,o.y+Math.sin(o.ang)*d];}
function opHit(o,x,y,tol){if(o.t==='src')return Math.hypot(o.x-x,o.y-y)<22+tol;if(o.t==='lens'||o.t==='mirror'){const sx=-Math.sin(o.ang),sy=Math.cos(o.ang);return segDist(x,y,o.x-sx*o.h,o.y-sy*o.h,o.x+sx*o.h,o.y+sy*o.h)<10+tol;}return ptIn(poly(o),x,y);}
const OPN={src:'Nur manbai',lens:'Linza',mirror:'Yassi ko‘zgu',block:'Shisha plastinka',prism:'Prizma'};
SIMS.push({id:'labopt',cat:'opt',title:'Optika laboratoriyasi',short:'linza · ko‘zgu · prizma',sandbox:1,
  sub:'Nur manbalari, linzalar, ko‘zgular va shisha jismlarni sahnaga qo‘ying — nurlar yo‘li darhol hisoblanadi.',
  formula:`<span><i>n</i><sub>1</sub> sin <i>α</i> = <i>n</i><sub>2</sub> sin <i>β</i></span><span class="alt"><i>α</i> = <i>γ</i> (qaytish) &nbsp; ${fr('1','<i>F</i>')} = ${fr('1','<i>d</i>')} + ${fr('1','<i>f</i>')}</span>`,
  text:['Bu erkin optik stol. Yuqoridagi tugmalar bilan nur manbai, yig‘uvchi yoki sochuvchi linza, yassi ko‘zgu, shisha plastinka va prizma qo‘shing. Obyektni sudrab joyini, tanlanganda paydo bo‘ladigan doirachani sudrab yo‘nalishini o‘zgartiring.','Ko‘zguda nur qaytish qonuniga ko‘ra qaytadi, shishada sinish qonuniga ko‘ra sinadi, linza esa nurlarni fokusga yig‘adi yoki sochadi. Shishadan havoga katta burchak ostida chiqayotgan nur to‘liq ichki qaytishga uchraydi.'],
  legend:[['n','sindirish ko‘rsatkichi (shisha ≈ 1,5)'],['F','linza fokus masofasi (manfiy — sochuvchi)'],['α, β','tushish va sinish burchaklari'],['γ','qaytish burchagi']],
  tries:['Parallel dastani yig‘uvchi linzaga yo‘llang: nurlar fokusda kesishadi. Linzani sochuvchiga almashtiring (F < 0).','Ikki linzadan teleskop yasang: ularni fokus masofalari yig‘indisiga teng masofada qo‘ying.','Prizmani buring va nur to‘liq ichki qaytgan holatni toping.'],
  tools:[{id:'move',label:'Surish / burish'},{id:'src',label:'+ Nur manbai'},{id:'lens',label:'+ Linza'},{id:'mirror',label:'+ Ko‘zgu'},{id:'block',label:'+ Plastinka'},{id:'prism',label:'+ Prizma'},{id:'del',label:'O‘chirish'},{id:'clear',label:'Tozalash',act:1}],
  hints:{move:'Obyektni sudrang; tanlanganini doiracha orqali buring',del:'Obyektni bosing',src:'Joyni bosing',lens:'Joyni bosing',mirror:'Joyni bosing',block:'Joyni bosing',prism:'Joyni bosing'},
  params:[],
  init:()=>({objs:[{t:'src',x:80,y:300,ang:0,kind:'beam'},{t:'lens',x:300,y:300,ang:0,F:150,h:110},{t:'prism',x:620,y:250,s:170,n:1.5,ang:0},{t:'mirror',x:870,y:470,ang:-2.4,h:80},{t:'block',x:560,y:500,w:170,h:80,n:1.5}],sel:null,drag:null,sc:0.8}),
  action(id,S){if(id==='clear'){S.objs=[];S.sel=null;}},
  draw(c,W,H,S,P,tt){grid(c,W,H,28);const sc=W/1000;S.sc=sc;const X=v=>v*sc;let nr=0;
    S.objs.filter(o=>o.t==='src').forEach(s=>srcRays(s).forEach(r=>{const pts=trace(S.objs,...r);nr++;c.strokeStyle=rgba('warm',0.35);c.lineWidth=1.5;c.setLineDash([]);c.beginPath();pts.forEach((p,i)=>i?c.lineTo(X(p[0]),X(p[1])):c.moveTo(X(p[0]),X(p[1])));c.stroke();
      c.strokeStyle=rgba('warm',0.95);c.lineWidth=2;c.setLineDash([6,14]);c.lineDashOffset=-tt*120;c.stroke();c.setLineDash([]);c.lineDashOffset=0;}));S.nr=nr;
    S.objs.forEach(o=>{const sel=o===S.sel,col=sel?C.accent:C.ink;
      if(o.t==='src'){c.save();c.translate(X(o.x),X(o.y));c.rotate(o.ang);c.fillStyle=col;rrect(c,-24,-11,34,22,5);c.fill();c.fillStyle=C.warm;c.fillRect(8,-8,5,16);c.restore();}
      else if(o.t==='lens'||o.t==='mirror'){const nx=Math.cos(o.ang),ny=Math.sin(o.ang),sx=-ny,sy=nx,ax=o.x-sx*o.h,ay=o.y-sy*o.h,bx=o.x+sx*o.h,by=o.y+sy*o.h;
        if(o.t==='mirror'){line(c,X(ax),X(ay),X(bx),X(by),col,5);for(let i=0;i<=8;i++){const u=i/8,px=ax+(bx-ax)*u,py=ay+(by-ay)*u;line(c,X(px),X(py),X(px-nx*8+sx*6),X(py-ny*8+sy*6),rgba('muted',0.7),1);}}
        else{const b=o.F>0?14:-10;c.fillStyle=rgba('water',0.22);c.strokeStyle=sel?C.accent:C.water;c.lineWidth=2;c.beginPath();c.moveTo(X(ax),X(ay));c.quadraticCurveTo(X(o.x+nx*b),X(o.y+ny*b),X(bx),X(by));c.quadraticCurveTo(X(o.x-nx*b),X(o.y-ny*b),X(ax),X(ay));c.fill();c.stroke();
          [1,-1].forEach(s=>{disk(c,X(o.x+nx*o.F*s),X(o.y+ny*o.F*s),3,C.muted);});txt(c,'F',X(o.x+nx*o.F)+6,X(o.y+ny*o.F)-8,C.muted,{font:MATH});}}
      else{const Pp=poly(o);c.fillStyle=rgba('water',0.2);c.strokeStyle=sel?C.accent:C.water;c.lineWidth=2;c.beginPath();Pp.forEach((p,i)=>i?c.lineTo(X(p[0]),X(p[1])):c.moveTo(X(p[0]),X(p[1])));c.closePath();c.fill();c.stroke();txt(c,'n = '+fmt(o.n),X(o.x),X(o.y),C.muted,{align:'center',font:SMALL});}
      if(sel&&o.t!=='block'){const[hx,hy]=opHandle(o);line(c,X(o.x),X(o.y),X(hx),X(hy),C.accent,1,[3,3]);disk(c,X(hx),X(hy),7,C.canvas,C.accent);}});
    if(!S.objs.length)txt(c,'Stol bo‘sh — avval «+ Nur manbai» qo‘ying',W/2,H/2,C.muted,{align:'center',font:'500 14px "IBM Plex Sans", sans-serif'});
  },
  pointer(type,x,y,S,P,api){const sc=S.sc,vx=x/sc,vy=y/sc,tol=10/sc;
    if(type==='down'){const md=S.mode;
      if(md==='move'||md==='del'){const o=S.sel;if(md==='move'&&o&&o.t!=='block'&&S.objs.includes(o)){const[hx,hy]=opHandle(o);if(Math.hypot(hx-vx,hy-vy)<10+tol){S.drag={o,rot:true};return true;}}
        const hit=[...S.objs].reverse().find(q=>opHit(q,vx,vy,tol));if(md==='del'){if(hit){S.objs.splice(S.objs.indexOf(hit),1);S.sel=null;return true;}return false;}
        S.sel=hit||null;if(hit){S.drag={o:hit,ox:vx-hit.x,oy:vy-hit.y};return true;}return false;}
      const add={src:{t:'src',ang:0,kind:'beam'},lens:{t:'lens',ang:0,F:150,h:90},mirror:{t:'mirror',ang:Math.PI,h:70},block:{t:'block',w:150,h:90,n:1.5},prism:{t:'prism',s:150,n:1.5,ang:0}}[md];
      if(add){const o=Object.assign({x:vx,y:vy},add);S.objs.push(o);S.sel=o;S.drag={o,ox:0,oy:0};return true;}return false;}
    if(type==='move'&&S.drag){const o=S.drag.o;if(S.drag.rot){o.ang=Math.atan2(vy-o.y,vx-o.x)+(o.t==='prism'?Math.PI/2:0);api.refresh();}else{o.x=vx-S.drag.ox;o.y=vy-S.drag.oy;}return true;}
    if(type==='up')S.drag=null;return false;},
  inspect(S){const o=S.sel;if(!o||!S.objs.includes(o))return null;const angP={label:'Yo‘nalishi',sym:'φ',min:-180,max:180,step:1,unit:'°',d:0,get:()=>Math.round(((o.ang/D2R+540)%360)-180),set:v=>o.ang=v*D2R};let props=[];
    if(o.t==='src')props=[{label:'Turi',choices:[['beam','Parallel dasta'],['point','Nuqtaviy']],get:()=>o.kind,set:v=>o.kind=v},angP];
    if(o.t==='lens')props=[{label:'Fokus masofasi (manfiy — sochuvchi)',sym:'F',min:-30,max:30,step:1,unit:'sm',d:0,get:()=>Math.round(o.F/10),set:v=>o.F=(Math.abs(v)<1?1:v)*10},{label:'Balandligi',sym:'',min:4,max:24,step:1,unit:'sm',d:0,get:()=>Math.round(o.h/5),set:v=>o.h=v*5},angP];
    if(o.t==='mirror')props=[{label:'Uzunligi',sym:'',min:4,max:30,step:1,unit:'sm',d:0,get:()=>Math.round(o.h/5),set:v=>o.h=v*5},angP];
    if(o.t==='block')props=[{label:'Sindirish ko‘rsatkichi',sym:'n',min:1,max:2.42,step:0.01,unit:'',d:2,get:()=>o.n,set:v=>o.n=v},{label:'Eni',sym:'',min:3,max:40,step:1,unit:'sm',d:0,get:()=>Math.round(o.w/10),set:v=>o.w=v*10},{label:'Bo‘yi',sym:'',min:3,max:30,step:1,unit:'sm',d:0,get:()=>Math.round(o.h/10),set:v=>o.h=v*10}];
    if(o.t==='prism')props=[{label:'Sindirish ko‘rsatkichi',sym:'n',min:1,max:2.42,step:0.01,unit:'',d:2,get:()=>o.n,set:v=>o.n=v},{label:'O‘lchami',sym:'',min:5,max:30,step:1,unit:'sm',d:0,get:()=>Math.round(o.s/10),set:v=>o.s=v*10},angP];
    return{title:OPN[o.t],props,del:()=>S.objs.splice(S.objs.indexOf(o),1)};},
  inspectHint:'Obyektni bosing — xossalari shu yerda chiqadi.',
  read:(S,P)=>{const cnt={};S.objs.forEach(o=>cnt[o.t]=(cnt[o.t]||0)+1);return[['Nur manbalari',String(cnt.src||0)],['Linza / ko‘zgu',(cnt.lens||0)+' / '+(cnt.mirror||0)],['Shisha jismlar',String((cnt.block||0)+(cnt.prism||0))],['Hisoblangan nurlar',String(S.nr||0)]];}
});
