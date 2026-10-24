/* ===== Bo‘lim laboratoriyalari: mexanika ishchi stoli (kin, din, sta, saq) ===== */
const LABTXT='Bu bo‘limning erkin laboratoriyasi. Yuqoridagi asboblar bilan sahnaga obyekt qo‘shing, ularni bir-biriga ulang, sudrang va xossalarini o‘ngdagi panelda o‘zgartiring. «Tajriba» tugmalari tayyor tajribalarni yuklaydi, «Bo‘sh stol» esa hammasini tozalaydi.';
function mxB(x,y,m,o={}){return Object.assign({x,y,vx:0,vy:0,m,fixed:false,forces:[],shape:'ball',hist:[],tr:[],ca:0},o);}
function mxLink(type,a,b,o={}){return Object.assign({type,a,b,k:80,L0:Math.hypot(b.x-a.x,b.y-a.y),T:0},o);}
const MX_PRE={
  bosh:()=>({bodies:[],links:[],ramps:[]}),
  otish:()=>{const bs=[30,45,60].map((a,i)=>mxB(0.5,0.35,1,{vx:8.2*Math.cos(a*D2R),vy:8.2*Math.sin(a*D2R),col:i}));return{bodies:bs,links:[],ramps:[],tr:1,vec:1};},
  tushish:()=>({bodies:[mxB(1.5,5,0.5),mxB(3,5,3),mxB(4.5,5,1,{vx:3,col:1})],links:[],ramps:[],tr:1,vec:1}),
  aylana:()=>{const c=mxB(5,3.2,1,{fixed:true}),b=mxB(6.6,3.2,1,{vy:5,col:1});return{bodies:[c,b],links:[mxLink('rope',c,b)],ramps:[],tr:1,vec:1,gr:0};},
  qiya:()=>{const r={x1:0.6,y1:3.6,x2:6.2,y2:0.02,mu:0.25},sl=(r.y2-r.y1)/(r.x2-r.x1),ca=Math.cos(Math.atan(-sl)),on=(x,m)=>mxB(x,r.y1+(x-r.x1)*sl+mrad(m)/ca+0.01,m,{shape:'box'});const b1=on(1.6,2),b2=on(3.4,1);b2.col=1;
    const s=mxB(8.4,5.4,1,{fixed:true}),h=mxB(8.4,3.6,1.5,{col:2});return{bodies:[b1,b2,s,h],links:[mxLink('spring',s,h,{k:40,L0:1.2})],ramps:[r],vec:1};},
  prujina:()=>{const a=mxB(3,5.6,1,{fixed:true}),b=mxB(3,4.2,1),c=mxB(3,2.8,1,{col:1}),d=mxB(7,5.6,1,{fixed:true}),e=mxB(8.4,4.6,1,{col:2}),f=mxB(9.2,3.2,1,{col:3});
    return{bodies:[a,b,c,d,e,f],links:[mxLink('spring',a,b,{k:60,L0:1}),mxLink('spring',b,c,{k:60,L0:1}),mxLink('rod',d,e),mxLink('rod',e,f)],ramps:[],tr:1};},
  iplar:()=>{const a=mxB(2,5.6,1,{fixed:true}),b=mxB(8,5.6,1,{fixed:true}),m=mxB(4.2,3.4,4,{col:2});return{bodies:[a,b,m],links:[mxLink('rope',a,m),mxLink('rope',b,m)],ramps:[],vec:1,showT:1};},
  kopri:()=>{const top=[],bot=[];for(let i=0;i<5;i++){bot.push(mxB(1+i*2,1.4,0.5,{fixed:i===0||i===4}));}for(let i=0;i<4;i++)top.push(mxB(2+i*2,3,0.5));const L=[];
    for(let i=0;i<4;i++){L.push(mxLink('rod',bot[i],bot[i+1]),mxLink('rod',bot[i],top[i]),mxLink('rod',top[i],bot[i+1]));if(i<3)L.push(mxLink('rod',top[i],top[i+1]));}
    const load=mxB(5,0.55,3,{col:2,shape:'box'});L.push(mxLink('rope',bot[2],load));return{bodies:[...bot,...top,load],links:L,ramps:[],showT:1};},
  toqnash:()=>({bodies:[mxB(1,1,2,{vx:5,col:0}),mxB(5,1,1,{col:1}),mxB(8.5,1,3,{vx:-2,col:2}),mxB(2,3.5,1,{vx:4,vy:1,col:3}),mxB(7,4,2,{vx:-3,col:1})],links:[],ramps:[],vec:1,gr:0}),
  beshik:()=>{const bs=[],L=[],r=mrad(1);for(let i=0;i<5;i++){const p=mxB(3.2+i*2*r,5.4,1,{fixed:true}),x=3.2+i*2*r,b=mxB(i===0?x-2.2*Math.sin(0.9):x,i===0?5.4-2.2*Math.cos(0.9):3.2,1,{col:i%4});bs.push(p,b);L.push(mxLink('rod',p,b,{L0:2.2}));}return{bodies:bs,links:L,ramps:[]};},
  mayatnik:()=>{const p=mxB(5,5.5,1,{fixed:true}),b=mxB(7.4,4.2,2,{col:2}),q=mxB(1.5,5.5,1,{fixed:true}),c=mxB(1.5,3.4,1,{vx:3,col:1});return{bodies:[p,b,q,c],links:[mxLink('rod',p,b),mxLink('spring',q,c,{k:30,L0:1.6})],ramps:[],tr:1};}
};
function mkMexLab(cfg){
  const init=P=>{const pr=MX_PRE[cfg.presets[P.pre][0]]();return Object.assign({bodies:[],links:[],ramps:[],sel:null,drag:null,dragF:null,pend:null,mx:0,my:0,Hm:6.25,sc:90,H:560,t:0,tr:0,vec:0,showT:cfg.showT||0,rampD:null,launch:null},pr);};
  return{id:cfg.id,cat:cfg.cat,lab:1,sandbox:1,title:cfg.title,short:cfg.short,sub:cfg.sub,formula:cfg.formula,text:[LABTXT,cfg.text],legend:cfg.legend,tries:cfg.tries,
    tools:[{id:'move',label:'Surish'},...(cfg.launch?[{id:'launch',label:'+ Otish'}]:[]),{id:'body',label:'+ Jism'},{id:'spring',label:'+ Prujina'},{id:'rod',label:'+ Sterjen'},{id:'rope',label:'+ Ip'},{id:'force',label:'+ Kuch'},{id:'ramp',label:'+ Tekislik'},{id:'fix',label:'Mahkamlash'},{id:'del',label:'O‘chirish'},{id:'trail',label:'Izlar',act:1},{id:'vec',label:'Vektorlar',act:1},{id:'clear',label:'Bo‘sh stol',act:1}],
    hints:{move:'Jismni sudrab, otib yuboring',launch:'Bo‘sh joydan otish yo‘nalishiga sudrang',body:'Bo‘sh joyni bosing',spring:'Ikki jismni ketma-ket bosing',rod:'Ikki jismni ketma-ket bosing',rope:'Ikki jismni ketma-ket bosing',force:'Jismdan boshlab sudrang',ramp:'Tekislikni chizish uchun sudrang',fix:'Jismni bosing',del:'O‘chiriladigan obyektni bosing'},
    params:[{id:'pre',label:'Tajriba',choices:cfg.presets.map(([k,l],i)=>[i,l]),val:0,reset:1},{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:0,max:20,step:0.1,val:9.8,unit:'m/s²',d:1},{id:'mu',label:'Pol ishqalanishi',sym:'μ',min:0,max:1,step:0.05,val:0.3,d:2},{id:'e',label:'Tiklanish koeffitsienti',sym:'e',min:0,max:1,step:0.05,val:cfg.e??0.8,d:2},{id:'k',label:'Havo qarshiligi',sym:'',min:0,max:2,step:0.05,val:0,unit:'kg/s',d:2}],
    init,
    action(id,S,P){if(id==='clear'){S.bodies=[];S.links=[];S.ramps=[];S.sel=null;S.pend=null;}if(id==='trail'){S.tr=!S.tr;S.bodies.forEach(b=>b.tr=[]);}if(id==='vec')S.vec=!S.vec;},
    step(S,P,dt){const g=S.gr!==undefined?S.gr:P.g,n=12,h=dt/n,bs=S.bodies,Hm=S.Hm;S.t+=dt;const free=b=>!b.fixed&&b!==S.drag&&!(S.launch&&S.launch.b===b),im=b=>free(b)?1/b.m:0;S.links.forEach(l=>l.J=0);
      for(let it=0;it<n;it++){
        bs.forEach(b=>{b.ax=0;b.ay=-g;if(!free(b))return;let fx=0,fy=-g*b.m;b.forces.forEach(F=>{fx+=F.F*Math.cos(F.ang*D2R);fy+=F.F*Math.sin(F.ang*D2R);});fx-=P.k*b.vx;fy-=P.k*b.vy;b.fx=fx;b.fy=fy;});
        S.links.forEach(l=>{if(l.type!=='spring')return;const dx=l.b.x-l.a.x,dy=l.b.y-l.a.y,L=Math.hypot(dx,dy)||1e-6,T=l.k*(L-l.L0);l.T=T;const ux=dx/L,uy=dy/L;if(free(l.a)){l.a.fx+=T*ux;l.a.fy+=T*uy;}if(free(l.b)){l.b.fx-=T*ux;l.b.fy-=T*uy;}});
        bs.forEach(b=>{if(!free(b))return;b.vx+=b.fx/b.m*h;b.vy+=b.fy/b.m*h;b.x+=b.vx*h;b.y+=b.vy*h;});
        for(let k=0;k<6;k++){
          S.links.forEach(l=>{if(l.type==='spring')return;const a=l.a,b=l.b,ia=im(a),ib=im(b);if(ia+ib===0)return;const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1e-6,nx=dx/d,ny=dy/d,err=d-l.L0;if(l.type==='rope'&&err<=0)return;
            a.x+=nx*err*ia/(ia+ib);a.y+=ny*err*ia/(ia+ib);b.x-=nx*err*ib/(ia+ib);b.y-=ny*err*ib/(ia+ib);const vr=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(l.type==='rope'&&vr<=0)return;const J=-vr/(ia+ib);
            a.vx-=J*ia*nx;a.vy-=J*ia*ny;b.vx+=J*ib*nx;b.vy+=J*ib*ny;l.J+=J;});
          bs.forEach(b=>{if(!free(b))return;const r=mrad(b.m),hit=(nx,ny,pen,mu)=>{b.x+=nx*pen;b.y+=ny*pen;if(k)return;const vn=b.vx*nx+b.vy*ny;if(vn>=0)return;const ee=vn<-0.6?P.e:0,jn=-(1+ee)*vn;b.vx+=nx*jn;b.vy+=ny*jn;const tx=-ny,ty=nx,vt=b.vx*tx+b.vy*ty,fr=Math.min(Math.abs(vt),mu*jn)*Math.sign(vt);b.vx-=tx*fr;b.vy-=ty*fr;if(ny>0.3)b.ca=Math.atan2(nx,ny);};
            if(b.y<r)hit(0,1,r-b.y,P.mu);if(b.y>Hm-r)hit(0,-1,b.y-(Hm-r),0);if(b.x<r)hit(1,0,r-b.x,0);if(b.x>10-r)hit(-1,0,b.x-(10-r),0);
            S.ramps.forEach(q=>{const dx=q.x2-q.x1,dy=q.y2-q.y1,l2=dx*dx+dy*dy||1,t=clamp(((b.x-q.x1)*dx+(b.y-q.y1)*dy)/l2,0,1),px=q.x1+t*dx,py=q.y1+t*dy,ex=b.x-px,ey=b.y-py,d=Math.hypot(ex,ey);if(d<r&&d>1e-6)hit(ex/d,ey/d,r-d,q.mu);});});
          for(let i=0;i<bs.length;i++)for(let j=i+1;j<bs.length;j++){const A=bs[i],B=bs[j];if(S.links.some(l=>(l.a===A&&l.b===B)||(l.a===B&&l.b===A)))continue;const dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy),rs=mrad(A.m)+mrad(B.m);
            if(d<rs&&d>1e-6){const nx=dx/d,ny=dy/d,ia=im(A),ib=im(B);if(ia+ib===0)continue;const ov=rs-d;A.x-=nx*ov*ia/(ia+ib);A.y-=ny*ov*ia/(ia+ib);B.x+=nx*ov*ib/(ia+ib);B.y+=ny*ov*ib/(ia+ib);
              if(k===0){const vr=(B.vx-A.vx)*nx+(B.vy-A.vy)*ny;if(vr<0){const J=-(1+P.e)*vr/(ia+ib);A.vx-=J*ia*nx;A.vy-=J*ia*ny;B.vx+=J*ib*nx;B.vy+=J*ib*ny;}}}}}}
      S.links.forEach(l=>{if(l.type!=='spring')l.T=-l.J/dt;});
      if((S.hk=(S.hk||0)+dt)>0.05){S.hk=0;bs.forEach(b=>{if(b.fixed)return;b.hist.push([S.t,Math.hypot(b.vx,b.vy),b.y]);if(b.hist.length>160)b.hist.shift();if(S.tr){b.tr.push([b.x,b.y]);if(b.tr.length>400)b.tr.shift();}});}},
    draw(c,W,H,S,P){const sc=W/10;S.sc=sc;S.H=H;S.Hm=H/sc;const X=x=>x*sc,Y=y=>H-y*sc,cols=[C.accent,C.warm,C.green,C.violet];S.g={sc,H};
      grid(c,W,H,sc/2);for(let m=1;m<10;m++)txt(c,m+' m',X(m),H-9,C.muted,{align:'center',font:SMALL});line(c,0,H-1,W,H-1,C.ink,3);
      S.ramps.forEach(q=>{c.fillStyle=rgba('muted',0.22);c.beginPath();c.moveTo(X(q.x1),Y(q.y1));c.lineTo(X(q.x2),Y(q.y2));c.lineTo(X(q.x2),H);c.lineTo(X(q.x1),H);c.closePath();if(Math.abs(q.y1-q.y2)>0.05&&Math.min(q.y1,q.y2)<0.2)c.fill();line(c,X(q.x1),Y(q.y1),X(q.x2),Y(q.y2),q===S.sel?C.accent:C.ink,4);
        if(q===S.sel||S.vec)txt(c,'μ = '+fmt(q.mu,2)+'  α = '+fmt(Math.abs(Math.atan2(q.y2-q.y1,q.x2-q.x1))/D2R,0)+'°',X((q.x1+q.x2)/2)+8,Y((q.y1+q.y2)/2)-14,C.muted,{font:SMALL});});
      if(S.rampD)line(c,X(S.rampD.x1),Y(S.rampD.y1),X(S.rampD.x2),Y(S.rampD.y2),C.accent,3,[6,4]);
      if(S.tr)S.bodies.forEach((b,i)=>{if(b.tr.length<2)return;c.strokeStyle=rgba(['accent','warm','green','violet'][(b.col||0)%4],0.6);c.lineWidth=2;c.beginPath();b.tr.forEach(([x,y],j)=>j?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y)));c.stroke();b.tr.forEach(([x,y],j)=>{if(j%4===0)disk(c,X(x),Y(y),2.2,rgba(['accent','warm','green','violet'][(b.col||0)%4],0.8));});});
      S.links.forEach(l=>{const x1=X(l.a.x),y1=Y(l.a.y),x2=X(l.b.x),y2=Y(l.b.y),sel=l===S.sel;
        if(l.type==='spring')springLine(c,x1,y1,x2,y2,10,6,sel?C.accent:C.ink,2);
        else if(l.type==='rod'){const T=l.T,col=S.showT?(T>0.5?C.red:T<-0.5?C.accent:C.muted):(sel?C.accent:C.ink);line(c,x1,y1,x2,y2,col,sel?6:5);}
        else{const d=Math.hypot(l.b.x-l.a.x,l.b.y-l.a.y),taut=d>=l.L0*0.995;line(c,x1,y1,x2,y2,sel?C.accent:taut?C.warm:rgba('warm',0.5),2,taut?null:[4,4]);}
        if(S.showT||sel)txt(c,(l.type==='rod'&&l.T<0?'siq ':'')+fmt(Math.abs(l.T),1)+' N',(x1+x2)/2+6,(y1+y2)/2-8,l.type==='rod'&&S.showT?(l.T>0.5?C.red:C.accent):C.ink,{font:SMALL});});
      if(S.pend){line(c,X(S.pend.x),Y(S.pend.y),S.mx,S.my,C.accent,1.5,[5,5]);}
      S.bodies.forEach(b=>{const r=mrad(b.m)*sc,x=X(b.x),y=Y(b.y),col=cols[(b.col||0)%4];
        if(b.fixed){c.fillStyle=C.ink;rrect(c,x-r*0.6,y-r*0.6,1.2*r,1.2*r,3);c.fill();line(c,x-r*0.4,y-r*0.4,x+r*0.4,y+r*0.4,C.canvas,1.5);line(c,x+r*0.4,y-r*0.4,x-r*0.4,y+r*0.4,C.canvas,1.5);}
        else if(b.shape==='box'){c.save();c.translate(x,y);c.rotate(b.ca||0);c.fillStyle=col;rrect(c,-r,-r,2*r,2*r,4);c.fill();c.restore();txt(c,fmt(b.m,1).replace(',0','')+' kg',x,y+1,C.onaccent,{align:'center',font:SMALL});}
        else{disk(c,x,y,r,col);txt(c,fmt(b.m,1).replace(',0',''),x,y+1,C.onaccent,{align:'center',font:SMALL});}
        if(b===S.sel||b===S.pend)selRing(c,x,y,r+5);
        if(S.vec&&!b.fixed){const sp=Math.hypot(b.vx,b.vy);if(sp>0.05)arrow(c,x,y,x+b.vx*sc*0.18,y-b.vy*sc*0.18,C.green,2.5);}
        b.forces.forEach(F=>{const tx=x+Math.cos(F.ang*D2R)*F.F*3,ty=y-Math.sin(F.ang*D2R)*F.F*3,col2=F===S.sel?C.accent:C.red;arrow(c,x,y,tx,ty,col2,3);disk(c,tx,ty,5,C.canvas,col2);txt(c,fmt(F.F,0)+' N',tx+8,ty-10,col2);});});
      if(S.launch){const b=S.launch.b,x=X(b.x),y=Y(b.y);arrow(c,x,y,S.mx,S.my,C.green,3);const v=Math.min(15,Math.hypot(S.mx-x,S.my-y)/sc*3);txt(c,fmt(v,1)+' m/s',S.mx+10,S.my-12,C.green,{});}
      const sb=S.bodies.includes(S.sel)&&!S.sel.fixed?S.sel:null;
      if(sb&&sb.hist.length>2){const gw=Math.min(220,W*0.34),gh=86,gx=W-gw-12,gy=12;c.fillStyle=rgba('canvas',0.85);c.fillRect(gx,gy,gw,gh);c.strokeStyle=C.line;c.lineWidth=1;c.strokeRect(gx,gy,gw,gh);
        const t0=sb.hist[0][0],t1=sb.hist[sb.hist.length-1][0]||1,vm=Math.max(1,...sb.hist.map(q=>q[1])),ym=Math.max(1,...sb.hist.map(q=>q[2]));
        [[1,vm,C.green,'v'],[2,ym,C.warm,'y']].forEach(([k,mx,col,l],j)=>{c.strokeStyle=col;c.lineWidth=1.6;c.beginPath();sb.hist.forEach((q,i)=>{const px=gx+6+(q[0]-t0)/Math.max(0.1,t1-t0)*(gw-12),py=gy+gh-8-q[k]/mx*(gh-22);i?c.lineTo(px,py):c.moveTo(px,py);});c.stroke();txt(c,l+(j?' (m)':' (m/s)'),gx+8+j*70,gy+10,col,{font:SMALL});});}
      if(!S.bodies.length)txt(c,'Stol bo‘sh — yuqoridagi asboblar bilan obyekt qo‘shing',W/2,H/2,C.muted,{align:'center',font:'500 14px "IBM Plex Sans", sans-serif'});
      if(cfg.extra)cfg.extra(c,W,H,S,P,X,Y);},
    pointer(type,x,y,S,P,api){const sc=S.sc,H=S.H,wx=x/sc,wy=(H-y)/sc,md=S.mode;S.mx=x;S.my=y;
      const hitB=()=>{for(let i=S.bodies.length-1;i>=0;i--){const b=S.bodies[i];if(Math.hypot(b.x-wx,b.y-wy)<mrad(b.m)+12/sc)return b;}return null;};
      const hitF=()=>{for(const b of S.bodies)for(const F of b.forces){const tx=b.x*sc+Math.cos(F.ang*D2R)*F.F*3,ty=H-b.y*sc-Math.sin(F.ang*D2R)*F.F*3;if(Math.hypot(tx-x,ty-y)<14)return[b,F];}return null;};
      const hitL=()=>S.links.find(l=>segDist(x,y,l.a.x*sc,H-l.a.y*sc,l.b.x*sc,H-l.b.y*sc)<9),hitR=()=>S.ramps.find(q=>segDist(x,y,q.x1*sc,H-q.y1*sc,q.x2*sc,H-q.y2*sc)<10);
      if(type==='down'){
        if(md==='move'){const f=hitF();if(f){S.dragF=f;S.sel=f[1];return true;}const b=hitB();if(b){S.drag=b;S.sel=b;S.lt=performance.now();b.vx=b.vy=0;b.tr=[];return true;}const l=hitL()||hitR();S.sel=l||null;return !!l;}
        if(md==='launch'){if(hitB())return false;const b=mxB(clamp(wx,0.3,9.7),clamp(wy,0.3,S.Hm-0.3),1,{col:S.bodies.length%4});S.bodies.push(b);S.launch={b};S.sel=b;return true;}
        if(md==='body'){if(hitB())return false;const b=mxB(clamp(wx,0.3,9.7),clamp(wy,0.3,S.Hm-0.3),1,{col:S.bodies.length%4});S.bodies.push(b);S.sel=b;return true;}
        if(md==='spring'||md==='rod'||md==='rope'){const b=hitB();if(!b){S.pend=null;return false;}if(!S.pend){S.pend=b;return true;}if(b!==S.pend){const l=mxLink(md,S.pend,b,{L0:Math.max(0.2,Math.round(Math.hypot(b.x-S.pend.x,b.y-S.pend.y)*10)/10),k:50});S.links.push(l);S.sel=l;}S.pend=null;return true;}
        if(md==='force'){const b=hitB();if(!b)return false;const F={F:0,ang:0};b.forces.push(F);S.dragF=[b,F];S.sel=F;return true;}
        if(md==='ramp'){S.rampD={x1:wx,y1:Math.max(0,wy),x2:wx,y2:Math.max(0,wy)};return true;}
        if(md==='fix'){const b=hitB();if(!b)return false;b.fixed=!b.fixed;b.vx=b.vy=0;S.sel=b;api.inspect();return true;}
        if(md==='del'){const f=hitF();if(f)f[0].forces.splice(f[0].forces.indexOf(f[1]),1);else{const b=hitB();if(b){S.bodies.splice(S.bodies.indexOf(b),1);S.links=S.links.filter(l=>l.a!==b&&l.b!==b);}else{const l=hitL();if(l)S.links.splice(S.links.indexOf(l),1);else{const q=hitR();if(q)S.ramps.splice(S.ramps.indexOf(q),1);else return false;}}}S.sel=null;return true;}
        return false;}
      if(type==='move'){if(S.drag){const b=S.drag,now=performance.now(),dt=Math.max(0.008,(now-S.lt)/1000),nx=clamp(wx,0.2,9.8),ny=clamp(wy,0.2,S.Hm-0.2);b.vx=0.5*b.vx+0.5*(nx-b.x)/dt;b.vy=0.5*b.vy+0.5*(ny-b.y)/dt;b.x=nx;b.y=ny;S.lt=now;return true;}
        if(S.dragF){const[b,F]=S.dragF,dx=x-b.x*sc,dy=H-b.y*sc-y;F.F=Math.round(clamp(Math.hypot(dx,dy)/3,0,100));F.ang=Math.round(Math.atan2(dy,dx)/D2R);api.refresh();return true;}
        if(S.rampD){S.rampD.x2=wx;S.rampD.y2=Math.max(0,wy);return true;}return false;}
      if(type==='up'){if(S.drag){const b=S.drag;if(b.fixed||performance.now()-S.lt>90){b.vx=b.vy=0;}const sp=Math.hypot(b.vx,b.vy);if(sp>15){b.vx*=15/sp;b.vy*=15/sp;}S.drag=null;}
        if(S.dragF){const[b,F]=S.dragF;if(F.F<1){b.forces.splice(b.forces.indexOf(F),1);S.sel=null;}S.dragF=null;}
        if(S.launch){const b=S.launch.b,dx=wx-b.x,dy=wy-b.y,L=Math.hypot(dx,dy);if(L>0.05){const v=Math.min(15,L*3);b.vx=dx/L*v;b.vy=dy/L*v;}S.launch=null;b.tr=[];}
        if(S.rampD){const q=S.rampD;if(Math.hypot(q.x2-q.x1,q.y2-q.y1)>0.3){const r={...q,mu:0.3};S.ramps.push(r);S.sel=r;}S.rampD=null;}}
      return false;},
    inspect(S){const s=S.sel;if(!s)return null;
      if(S.bodies.includes(s))return{title:s.fixed?'Mahkamlangan nuqta':'Jism',props:[{label:'Massa',sym:'m',min:0.1,max:10,step:0.1,unit:'kg',d:1,get:()=>s.m,set:v=>s.m=v},{label:'Ko‘rinishi',choices:[['ball','Shar'],['box','Brusok']],get:()=>s.shape,set:v=>s.shape=v},{label:'Tezlik vₓ',sym:'vₓ',min:-15,max:15,step:0.1,unit:'m/s',d:1,get:()=>s.vx,set:v=>s.vx=v},{label:'Tezlik v_y',sym:'v_y',min:-15,max:15,step:0.1,unit:'m/s',d:1,get:()=>s.vy,set:v=>s.vy=v},{label:'Mahkamlangan (qimirlamaydi)',toggle:1,get:()=>s.fixed,set:v=>{s.fixed=v;s.vx=s.vy=0;}}],del:()=>{S.bodies.splice(S.bodies.indexOf(s),1);S.links=S.links.filter(q=>q.a!==s&&q.b!==s);}};
      if(S.links.includes(s)){const nm={spring:'Prujina',rod:'Qattiq sterjen',rope:'Ip (cho‘zilmaydi)'}[s.type],pr=[{label:'Uzunligi',sym:'l₀',min:0.2,max:6,step:0.1,unit:'m',d:1,get:()=>s.L0,set:v=>s.L0=v}];if(s.type==='spring')pr.unshift({label:'Bikrlik',sym:'k',min:5,max:500,step:5,unit:'N/m',d:0,get:()=>s.k,set:v=>s.k=v});
        return{title:nm,note:(s.type==='spring'?'Elastiklik kuchi: ':s.T<0?'Siqilish kuchi: ':'Taranglik kuchi: ')+fmt(Math.abs(s.T),1)+' N',props:pr,del:()=>S.links.splice(S.links.indexOf(s),1)};}
      if(S.ramps.includes(s))return{title:'Qiya tekislik',note:'Qiyalik burchagi: '+fmt(Math.abs(Math.atan2(s.y2-s.y1,s.x2-s.x1))/D2R,0)+'°',props:[{label:'Ishqalanish koeffitsienti',sym:'μ',min:0,max:1,step:0.05,d:2,get:()=>s.mu,set:v=>s.mu=v}],del:()=>S.ramps.splice(S.ramps.indexOf(s),1)};
      const b=S.bodies.find(q=>q.forces.includes(s));if(b)return{title:'Kuch',props:forceProps(s),del:()=>b.forces.splice(b.forces.indexOf(s),1)};return null;},
    inspectHint:'Jism, ulagich, tekislik yoki kuch strelkasini bosing — xossalari shu yerda chiqadi.',
    read:cfg.read||((S,P)=>{const g=S.gr!==undefined?S.gr:P.g;let Ek=0,Ep=0,px=0,py=0;S.bodies.forEach(b=>{if(b.fixed)return;Ek+=b.m*(b.vx*b.vx+b.vy*b.vy)/2;Ep+=b.m*g*(b.y-mrad(b.m));px+=b.m*b.vx;py+=b.m*b.vy;});S.links.forEach(l=>{if(l.type==='spring'){const L=Math.hypot(l.b.x-l.a.x,l.b.y-l.a.y);Ep+=l.k*(L-l.L0)**2/2;}});
      const sb=S.bodies.includes(S.sel)&&!S.sel.fixed?S.sel:null;return[['Obyektlar',S.bodies.length+' jism, '+S.links.length+' ulagich, '+S.ramps.length+' tekislik'],sb?['Tanlangan jism tezligi',fmt(Math.hypot(sb.vx,sb.vy),2)+' m/s']:['Vaqt',fmt(S.t,1)+' s'],['Kinetik / potensial energiya',fmt(Ek<1e-6?0:Ek,1)+' / '+fmt(Math.abs(Ep)<1e-6?0:Ep,1)+' J'],['Umumiy impuls',fmt(Math.hypot(px,py)<1e-6?0:Math.hypot(px,py),2)+' kg·m/s']];})};}

SIMS.push(mkMexLab({id:'lab_kin',cat:'kin',title:'Kinematika laboratoriyasi',short:'otish · izlar · tezlik vektori',launch:1,presets:[['otish','Turli burchakda otish'],['tushish','Erkin tushish'],['aylana','Aylana bo‘ylab'],['bosh','Bo‘sh stol']],
  sub:'Jismlarni istalgan yo‘nalish va tezlikda oting, izlarini va tezlik vektorlarini kuzating, trayektoriyalarni solishtiring.',
  formula:`<span><b>r</b> = <b>r</b><sub>0</sub> + <b>v</b><sub>0</sub><i>t</i> + ${fr('<b>g</b><i>t</i>²','2')}</span><span class="alt"><i>L</i> = ${fr('<i>v</i><sub>0</sub>² sin 2<i>α</i>','<i>g</i>')}</span>`,
  text:'«+ Otish» asbobi bilan bo‘sh joydan sudrang: strelka yo‘nalishi va uzunligi boshlang‘ich tezlikni beradi. Izlardagi nuqtalar har 0,2 soniyada qo‘yiladi, shuning uchun nuqtalar orasidagi masofa tezlikni ko‘rsatadi. O‘ng yuqoridagi grafik tanlangan jismning tezligi va balandligini chizadi.',
  legend:[['v₀','boshlang‘ich tezlik, m/s'],['α','otish burchagi'],['g','erkin tushish tezlanishi'],['L','uchish uzoqligi']],
  tries:['Bir xil tezlikda 30° va 60° ostida oting: uchish uzoqligi bir xil chiqadi.','«Erkin tushish» tajribasida gorizontal otilgan jism ham boshqalar bilan bir vaqtda yerga tushadi.','g ni 1,6 m/s² (Oy) qilib, trayektoriyalarni solishtiring.']}));
SIMS.push(mkMexLab({id:'lab_din',cat:'din',title:'Dinamika laboratoriyasi',short:'kuch · prujina · qiya tekislik',presets:[['qiya','Qiya tekislik va prujina'],['prujina','Prujinalar va sterjenlar'],['bosh','Bo‘sh stol']],
  sub:'Jismlarga kuch qo‘ying, prujina, ip va sterjen bilan ulang, qiya tekisliklar chizing va ishqalanishni o‘zgartiring.',
  formula:`<span>Σ<b>F</b> = <i>m</i><b>a</b></span><span class="alt"><i>F</i><sub>el</sub> = <i>k</i>Δ<i>l</i>, &nbsp;<i>F</i><sub>ishq</sub> ≤ <i>μN</i></span>`,
  text:'Qiya tekislikdagi brusok tan α > μ bo‘lganda sirpanadi, aks holda tinchlikdagi ishqalanish uni ushlab turadi. Tekislikni bosib, μ ni o‘zgartiring. Prujina, ip va sterjen jismlarni turli usulda bog‘laydi: ip faqat tortadi, sterjen esa tortadi ham, itaradi ham.',
  legend:[['F','kuch, N'],['m','massa, kg'],['μ','ishqalanish koeffitsienti'],['k','prujina bikrligi, N/m']],
  tries:['Tekislikni bosib μ ni 0,8 qiling: brusoklar to‘xtab qoladi.','Jismga qiyalik bo‘ylab yuqoriga kuch qo‘yib, uni muvozanatda ushlang.','Ikki sterjen bilan qo‘sh mayatnik yasang va uning tartibsiz harakatini kuzating.']}));
SIMS.push(mkMexLab({id:'lab_sta',cat:'sta',title:'Statika laboratoriyasi',short:'iplar · ko‘prik · taranglik',showT:1,e:0.3,presets:[['iplar','Ikki ipga osilgan yuk'],['kopri','Ferma ko‘prik'],['bosh','Bo‘sh stol']],
  sub:'Sterjen va iplardan konstruksiya yig‘ing: har bir element qanchalik cho‘zilayotgani yoki siqilayotgani ko‘rinadi.',
  formula:`<span>Σ<b>F</b> = 0, &nbsp;Σ<i>M</i> = 0</span><span class="alt"><i>T</i><sub>1</sub> sin <i>α</i><sub>1</sub> + <i>T</i><sub>2</sub> sin <i>α</i><sub>2</sub> = <i>mg</i></span>`,
  text:'Muvozanatdagi jismga ta’sir etuvchi kuchlarning vektor yig‘indisi nolga teng. Har bir sterjen yonida undagi kuch yozilgan: qizil — cho‘zilish, ko‘k — siqilish. Iplar faqat cho‘zilishga ishlaydi. Yuk massasini yoki tayanchlar joyini o‘zgartirib, kuchlar qanday taqsimlanishini kuzating.',
  legend:[['T','ip yoki sterjendagi kuch, N'],['α','ipning gorizont bilan burchagi'],['mg','yuk og‘irligi, N']],
  tries:['Iplar orasidagi burchakni kattalashtiring: taranglik keskin ortadi.','Ko‘prikdagi yukni og‘irlashtiring: pastki sterjenlar cho‘ziladi, yuqoridagilar siqiladi.','Ko‘prikdan bitta diagonal sterjenni o‘chirib, konstruksiya qanday buzilishini ko‘ring.']}));
SIMS.push(mkMexLab({id:'lab_saq',cat:'saq',title:'Saqlanish qonunlari laboratoriyasi',short:'to‘qnashuv · impuls · energiya',e:1,presets:[['toqnash','To‘qnashuvlar'],['beshik','Nyuton beshigi'],['mayatnik','Mayatnik va prujina'],['bosh','Bo‘sh stol']],
  sub:'Sharlarni to‘qnashtiring, Nyuton beshigini tebrating va umumiy impuls hamda energiya qanday saqlanishini kuzating.',
  formula:`<span>Σ<i>m</i><b>v</b> = const</span><span class="alt"><i>E</i><sub>k</sub> + <i>E</i><sub>p</sub> = const &nbsp;(ishqalanishsiz)</span>`,
  text:'To‘qnashuvlar tajribasida g = 0, shuning uchun tashqi kuch yo‘q va umumiy impuls o‘zgarmaydi. Tiklanish koeffitsienti e = 1 bo‘lsa, kinetik energiya ham saqlanadi. Nyuton beshigida bir shar urilsa, narigi chetdagi bitta shar uchib chiqadi: faqat shunda impuls ham, energiya ham saqlanadi.',
  legend:[['p','impuls, kg·m/s'],['Eₖ','kinetik energiya, J'],['Eₚ','potensial energiya, J'],['e','tiklanish koeffitsienti']],
  tries:['e ni 0,5 ga tushiring: impuls saqlanadi, kinetik energiya esa kamayadi.','Nyuton beshigida ikkita sharni birga qo‘yib yuboring: narigi tomondan ham ikkitasi chiqadi.','Havo qarshiligini oshiring: mayatnik energiyasi asta kamayadi.'],
  extra(c,W,H,S,P){const g=S.gr!==undefined?S.gr:P.g;let Ek=0,Ep=0;S.bodies.forEach(b=>{if(b.fixed)return;Ek+=b.m*(b.vx*b.vx+b.vy*b.vy)/2;Ep+=b.m*g*(b.y-mrad(b.m));});S.links.forEach(l=>{if(l.type==='spring'){const L=Math.hypot(l.b.x-l.a.x,l.b.y-l.a.y);Ep+=l.k*(L-l.L0)**2/2;}});
    S.Emax=Math.max(S.Emax||1,Ek+Ep);const x=14,y=14,w=150;[['Eₖ',Ek,C.green],['Eₚ',Ep,C.warm],['E',Ek+Ep,C.accent]].forEach(([l,v,col],i)=>{c.fillStyle=rgba('muted',0.15);c.fillRect(x+30,y+i*20,w,13);c.fillStyle=col;c.fillRect(x+30,y+i*20,w*Math.min(1,v/S.Emax),13);txt(c,l,x,y+i*20+7,col,{font:SMALL});txt(c,fmt(v,1)+' J',x+w+38,y+i*20+7,col,{font:SMALL});});}}));
