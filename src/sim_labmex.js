/* Mexanika laboratoriyasi */
const mrad=m=>0.16+0.1*Math.cbrt(m);
function mlDemo(){const B=(x,y,m,o={})=>Object.assign({x,y,vx:0,vy:0,m,fixed:false,forces:[]},o);
  const a=B(2,5.4,1,{fixed:true}),b=B(2,3.6,1,{vx:2}),c1=B(7.4,0.6,2,{vx:-2.5}),c2=B(4.6,0.6,1),d=B(8.8,3.4,1.5);d.forces.push({F:14,ang:110});
  return{bodies:[a,b,c1,c2,d],springs:[{a,b,k:60,L0:1.2}],sel:null,drag:null,dragF:null,pend:null,mx:0,my:0,Hm:6.25,sc:90,H:560};}
SIMS.push({id:'labmex',cat:'din',title:'Mexanika laboratoriyasi',short:'jism · prujina · kuch',sandbox:1,
  sub:'Jismlar, prujinalar va kuchlarni o‘zingiz qo‘ying — simulyatsiya Nyuton qonunlari asosida hisoblaydi.',
  formula:`<span>Σ<b>F</b> = <i>m</i><b>a</b></span><span class="alt"><i>F</i><sub>el</sub> = <i>k</i>Δ<i>l</i> &nbsp; <i>F</i><sub>og‘</sub> = <i>mg</i> &nbsp; <i>E</i> = ${fr('<i>mv</i><sup>2</sup>','2')} + <i>mgh</i> + ${fr('<i>k</i>Δ<i>l</i><sup>2</sup>','2')}</span>`,
  text:['Bu erkin laboratoriya. Yuqoridagi asboblar bilan sahnaga jism qo‘ying, ikki jismni prujina bilan ulang, jismga doimiy kuch qo‘ying yoki uni mahkamlab tayanch nuqtaga aylantiring. Har bir obyektni bosib, o‘ngdagi panelda xossalarini o‘zgartirasiz.','Har bir jismga og‘irlik kuchi, prujinalarning elastiklik kuchi, siz qo‘ygan kuchlar va havo qarshiligi ta’sir qiladi. Jismlar bir-biri va devorlar bilan to‘qnashadi. Jismni sichqoncha bilan sudrab, otib yuborish mumkin.'],
  legend:[['m','jism massasi, kg'],['k','prujina bikrligi, N/m'],['l₀','prujinaning erkin uzunligi'],['g','erkin tushish tezlanishi'],['e','to‘qnashuvda tiklanish koeffitsienti']],
  tries:['g = 0 qiling (vaznsizlik): jismlar to‘g‘ri chiziq bo‘ylab uchadi.','Mahkamlangan nuqtaga ikki prujina va ikki jismni ketma-ket ulang: qo‘sh mayatnik hosil bo‘ladi.','Havo qarshiligini 0 va e = 1 qiling: «To‘liq energiya» deyarli o‘zgarmaydi.'],
  tools:[{id:'move',label:'Surish'},{id:'body',label:'+ Jism'},{id:'spring',label:'+ Prujina'},{id:'force',label:'+ Kuch'},{id:'fix',label:'Mahkamlash'},{id:'del',label:'O‘chirish'},{id:'clear',label:'Tozalash',act:1}],
  hints:{move:'Jismni sudrab, otib yuboring',body:'Bo‘sh joyni bosing',spring:'Ikki jismni ketma-ket bosing',force:'Jismdan boshlab sudrang',fix:'Jismni bosing',del:'O‘chiriladigan obyektni bosing'},
  params:[{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:0,max:20,step:0.1,val:9.8,unit:'m/s²',d:1},{id:'e',label:'Tiklanish koeffitsienti',sym:'e',min:0,max:1,step:0.05,val:0.8,unit:'',d:2},{id:'k',label:'Havo qarshiligi',sym:'',min:0,max:2,step:0.05,val:0.05,unit:'kg/s',d:2}],
  init:mlDemo,
  action(id,S){if(id==='clear'){S.bodies=[];S.springs=[];S.sel=null;S.pend=null;}},
  step(S,P,dt){const Hm=S.Hm,n=10,h=dt/n,bs=S.bodies;
    for(let it=0;it<n;it++){const f=bs.map(b=>[0,-P.g*b.m]);
      bs.forEach((b,i)=>{b.forces.forEach(F=>{f[i][0]+=F.F*Math.cos(F.ang*D2R);f[i][1]+=F.F*Math.sin(F.ang*D2R);});f[i][0]-=P.k*b.vx;f[i][1]-=P.k*b.vy;});
      S.springs.forEach(s=>{const dx=s.b.x-s.a.x,dy=s.b.y-s.a.y,L=Math.hypot(dx,dy)||1e-6,T=s.k*(L-s.L0),ux=dx/L,uy=dy/L,ia=bs.indexOf(s.a),ib=bs.indexOf(s.b);f[ia][0]+=T*ux;f[ia][1]+=T*uy;f[ib][0]-=T*ux;f[ib][1]-=T*uy;});
      bs.forEach((b,i)=>{if(b.fixed||b===S.drag)return;b.vx+=f[i][0]/b.m*h;b.vy+=f[i][1]/b.m*h;b.x+=b.vx*h;b.y+=b.vy*h;const r=mrad(b.m);
        if(b.y<r){b.y=r;if(b.vy<0)b.vy=-b.vy*P.e;if(Math.abs(b.vy)<0.05)b.vy=0;b.vx*=Math.exp(-0.4*h);}
        if(b.y>Hm-r){b.y=Hm-r;if(b.vy>0)b.vy=-b.vy*P.e;}if(b.x<r){b.x=r;if(b.vx<0)b.vx=-b.vx*P.e;}if(b.x>10-r){b.x=10-r;if(b.vx>0)b.vx=-b.vx*P.e;}});
      for(let i=0;i<bs.length;i++)for(let j=i+1;j<bs.length;j++){const A=bs[i],B=bs[j],dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy),rs=mrad(A.m)+mrad(B.m);
        if(d<rs&&d>1e-6){const nx=dx/d,ny=dy/d,ia=(A.fixed||A===S.drag)?0:1/A.m,ib=(B.fixed||B===S.drag)?0:1/B.m;if(ia+ib===0)continue;const ov=rs-d;
          A.x-=nx*ov*ia/(ia+ib);A.y-=ny*ov*ia/(ia+ib);B.x+=nx*ov*ib/(ia+ib);B.y+=ny*ov*ib/(ia+ib);const vr=(B.vx-A.vx)*nx+(B.vy-A.vy)*ny;
          if(vr<0){const J=-(1+P.e)*vr/(ia+ib);A.vx-=J*ia*nx;A.vy-=J*ia*ny;B.vx+=J*ib*nx;B.vy+=J*ib*ny;}}}}},
  draw(c,W,H,S,P){const sc=W/10;S.sc=sc;S.H=H;S.Hm=H/sc;const X=x=>x*sc,Y=y=>H-y*sc;
    grid(c,W,H,sc/2);for(let m=1;m<10;m++)txt(c,m+' m',X(m),H-9,C.muted,{align:'center',font:SMALL});line(c,0,H-1,W,H-1,C.ink,3);
    S.springs.forEach(s=>springLine(c,X(s.a.x),Y(s.a.y),X(s.b.x),Y(s.b.y),10,6,s===S.sel?C.accent:C.ink,2));
    if(S.pend)line(c,X(S.pend.x),Y(S.pend.y),S.mx,S.my,C.accent,1.5,[5,5]);
    S.bodies.forEach(b=>{const r=mrad(b.m)*sc,x=X(b.x),y=Y(b.y);
      if(b.fixed){c.fillStyle=C.ink;rrect(c,x-r*0.8,y-r*0.8,1.6*r,1.6*r,3);c.fill();line(c,x-r*0.5,y-r*0.5,x+r*0.5,y+r*0.5,C.canvas,1.5);line(c,x+r*0.5,y-r*0.5,x-r*0.5,y+r*0.5,C.canvas,1.5);}
      else{disk(c,x,y,r,C.accent);txt(c,fmt(b.m,1).replace(',0',''),x,y+1,C.onaccent,{align:'center',font:SMALL});}
      if(b===S.sel||b===S.pend)selRing(c,x,y,r+5);
      b.forces.forEach(F=>{const tx=x+Math.cos(F.ang*D2R)*F.F*3,ty=y-Math.sin(F.ang*D2R)*F.F*3,col=F===S.sel?C.accent:C.warm;arrow(c,x,y,tx,ty,col,3);disk(c,tx,ty,5,C.canvas,col);txt(c,fmt(F.F,0)+' N',tx+8,ty-10,col);});});
    if(!S.bodies.length)txt(c,'Sahna bo‘sh — «+ Jism» tugmasini bosib, jism qo‘ying',W/2,H/2,C.muted,{align:'center',font:'500 14px "IBM Plex Sans", sans-serif'});
  },
  pointer(type,x,y,S,P,api){const sc=S.sc,H=S.H,wx=x/sc,wy=(H-y)/sc,md=S.mode;S.mx=x;S.my=y;
    const hitB=()=>{for(let i=S.bodies.length-1;i>=0;i--){const b=S.bodies[i];if(Math.hypot(b.x-wx,b.y-wy)<mrad(b.m)+12/sc)return b;}return null;};
    const hitF=()=>{for(const b of S.bodies)for(const F of b.forces){const tx=b.x*sc+Math.cos(F.ang*D2R)*F.F*3,ty=H-b.y*sc-Math.sin(F.ang*D2R)*F.F*3;if(Math.hypot(tx-x,ty-y)<14)return[b,F];}return null;};
    const hitS=()=>S.springs.find(s=>segDist(x,y,s.a.x*sc,H-s.a.y*sc,s.b.x*sc,H-s.b.y*sc)<9);
    if(type==='down'){
      if(md==='move'){const f=hitF();if(f){S.dragF=f;S.sel=f[1];return true;}const b=hitB();if(b){S.drag=b;S.sel=b;S.lt=performance.now();b.vx=b.vy=0;return true;}const s=hitS();S.sel=s||null;return !!s;}
      if(md==='body'){if(hitB())return false;const b={x:clamp(wx,0.3,9.7),y:clamp(wy,0.3,S.Hm-0.3),vx:0,vy:0,m:1,fixed:false,forces:[]};S.bodies.push(b);S.sel=b;return true;}
      if(md==='spring'){const b=hitB();if(!b){S.pend=null;return false;}if(!S.pend){S.pend=b;return true;}if(b!==S.pend){const s={a:S.pend,b,k:50,L0:Math.max(0.2,Math.round(Math.hypot(b.x-S.pend.x,b.y-S.pend.y)*10)/10)};S.springs.push(s);S.sel=s;}S.pend=null;return true;}
      if(md==='force'){const b=hitB();if(!b)return false;const F={F:0,ang:0};b.forces.push(F);S.dragF=[b,F];S.sel=F;return true;}
      if(md==='fix'){const b=hitB();if(!b)return false;b.fixed=!b.fixed;b.vx=b.vy=0;S.sel=b;api.inspect();return true;}
      if(md==='del'){const f=hitF();if(f)f[0].forces.splice(f[0].forces.indexOf(f[1]),1);else{const b=hitB();if(b){S.bodies.splice(S.bodies.indexOf(b),1);S.springs=S.springs.filter(s=>s.a!==b&&s.b!==b);}else{const s=hitS();if(s)S.springs.splice(S.springs.indexOf(s),1);else return false;}}S.sel=null;return true;}
      return false;}
    if(type==='move'){if(S.drag){const b=S.drag,now=performance.now(),dt=Math.max(0.008,(now-S.lt)/1000),nx=clamp(wx,0.2,9.8),ny=clamp(wy,0.2,S.Hm-0.2);
        b.vx=0.5*b.vx+0.5*(nx-b.x)/dt;b.vy=0.5*b.vy+0.5*(ny-b.y)/dt;b.x=nx;b.y=ny;S.lt=now;return true;}
      if(S.dragF){const[b,F]=S.dragF,dx=x-b.x*sc,dy=H-b.y*sc-y;F.F=Math.round(clamp(Math.hypot(dx,dy)/3,0,100));F.ang=Math.round(Math.atan2(dy,dx)/D2R);api.refresh();return true;}return false;}
    if(type==='up'){if(S.drag){const b=S.drag;if(b.fixed||performance.now()-S.lt>90){b.vx=b.vy=0;}const sp=Math.hypot(b.vx,b.vy);if(sp>15){b.vx*=15/sp;b.vy*=15/sp;}S.drag=null;}
      if(S.dragF){const[b,F]=S.dragF;if(F.F<1){b.forces.splice(b.forces.indexOf(F),1);S.sel=null;}S.dragF=null;}}
    return false;},
  inspect(S){const s=S.sel;if(!s)return null;
    if(S.bodies.includes(s))return{title:s.fixed?'Mahkamlangan jism':'Jism',props:[{label:'Massa',sym:'m',min:0.1,max:10,step:0.1,unit:'kg',d:1,get:()=>s.m,set:v=>s.m=v},{label:'Mahkamlangan (qimirlamaydi)',toggle:1,get:()=>s.fixed,set:v=>{s.fixed=v;s.vx=s.vy=0;}}],del:()=>{S.bodies.splice(S.bodies.indexOf(s),1);S.springs=S.springs.filter(q=>q.a!==s&&q.b!==s);}};
    if(S.springs.includes(s))return{title:'Prujina',props:[{label:'Bikrlik',sym:'k',min:5,max:500,step:5,unit:'N/m',d:0,get:()=>s.k,set:v=>s.k=v},{label:'Erkin uzunligi',sym:'l₀',min:0.2,max:5,step:0.1,unit:'m',d:1,get:()=>s.L0,set:v=>s.L0=v}],del:()=>S.springs.splice(S.springs.indexOf(s),1)};
    const b=S.bodies.find(q=>q.forces.includes(s));if(b)return{title:'Kuch',props:forceProps(s),del:()=>b.forces.splice(b.forces.indexOf(s),1)};return null;},
  inspectHint:'Jism, prujina yoki kuch strelkasini bosing — xossalari shu yerda chiqadi.',
  read:(S,P)=>{let Ek=0,Ep=0;S.bodies.forEach(b=>{if(b.fixed)return;Ek+=b.m*(b.vx*b.vx+b.vy*b.vy)/2;Ep+=b.m*P.g*(b.y-mrad(b.m));});S.springs.forEach(s=>{const L=Math.hypot(s.b.x-s.a.x,s.b.y-s.a.y);Ep+=s.k*(L-s.L0)**2/2;});
    return[['Jismlar / prujinalar',S.bodies.length+' / '+S.springs.length],['Kinetik energiya',fmt(Ek,1)+' J'],['Potensial energiya',fmt(Ep,1)+' J'],['To‘liq energiya',fmt(Ek+Ep,1)+' J']];}
});
