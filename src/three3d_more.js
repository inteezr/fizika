/* ===== qo‘shimcha 3D sahnalar ===== */
function rod(r,m){const o=new THREE.Mesh(T3.cyl,m);o.castShadow=true;o.receiveShadow=true;T3.root.add(o);o.userData.r=r;return o;}
function setRod(o,x1,y1,z1,x2,y2,z2,r){_d.set(x2-x1,y2-y1,z2-z1);const L=_d.length();o.visible=L>0.3;if(!o.visible)return;o.position.set((x1+x2)/2,(y1+y2)/2,(z1+z2)/2);o.quaternion.setFromUnitVectors(_up,_d.normalize());const rr=r??o.userData.r;o.scale.set(rr,L,rr);}
function inst(n,geo,m){const im=new THREE.InstancedMesh(geo,m,n);im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);im.frustumCulled=false;im.count=0;T3.root.add(im);return im;}
function setI(im,i,x,y,z,s){const m=T3._m||(T3._m=new THREE.Matrix4());m.makeScale(s,s,s);m.setPosition(x,y,z);im.setMatrixAt(i,m);}
function wires(pts,closed){const m=mat(0x7aa8ff,{opacity:0.22,metal:0.2,rough:0.1});const out=[];const n=closed?pts.length:pts.length-1;for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%pts.length],o=rod(6,m);o.castShadow=false;setRod(o,a[0],a[1],0,b[0],b[1],0);out.push(o);}
  const cm=mat(0x9fc6ff,{metal:0.9,rough:0.2});pts.forEach(p=>{const j=mesh(T3.sph,cm);j.scale.setScalar(7);j.position.set(p[0],p[1],0);out.push(j);});return out;}
function resistor3(){const g=new THREE.Group(),b=new THREE.Mesh(T3.cyl,mat(0xcdb68a,{rough:0.5,metal:0.1}));b.rotation.z=Math.PI/2;b.scale.set(12,64,12);b.castShadow=true;g.add(b);g.userData.body=b;
  [[-20,0xa0522d],[-10,0x111111],[0,0xff3b30],[18,0xd4af37]].forEach(([x,c])=>{const r=new THREE.Mesh(T3.cyl,mat(c,{metal:c===0xd4af37?0.9:0.2,rough:0.4}));r.rotation.z=Math.PI/2;r.scale.set(12.8,4,12.8);r.position.x=x;g.add(r);});T3.root.add(g);return g;}
function battery3(x,y){const g=new THREE.Group(),a=new THREE.Mesh(T3.cyl,mat(0x161c2a,{metal:0.6,rough:0.3}));a.scale.set(17,34,17);a.position.y=10;const b=new THREE.Mesh(T3.cyl,mat(0xd08a3a,{metal:0.9,rough:0.25}));b.scale.set(17.2,20,17.2);b.position.y=-16;
  const n=new THREE.Mesh(T3.cyl,mat(0xdfe6f5,{metal:1,rough:0.15}));n.scale.set(6,8,6);n.position.y=-30;[a,b,n].forEach(o=>{o.castShadow=true;g.add(o);});g.position.set(x,y,0);T3.root.add(g);return g;}
function bulb3(x,y){const g=new THREE.Group(),gl=new THREE.Mesh(T3.sph,mat(0xffffff,{glass:1,opacity:0.3}));gl.scale.setScalar(26);const base=new THREE.Mesh(T3.cyl,mat(0xb8c0d0,{metal:1,rough:0.3}));base.scale.set(12,18,12);base.position.x=30;base.rotation.z=Math.PI/2;
  const fm=new THREE.MeshStandardMaterial({color:0xffd27a,emissive:0xffb347,emissiveIntensity:1});const fil=new THREE.Mesh(new THREE.TorusGeometry(8,1.4,8,24),fm);const lt=new THREE.PointLight(0xffc070,1,0,2);g.add(gl,base,fil,lt);g.position.set(x,y,0);T3.root.add(g);g.userData={fm,lt,fil};return g;}
const loopPt=(L,T,R,B)=>{const w=R-L,h=B-T,per=2*(w+h);return{per,pt:s=>{s=((s%per)+per)%per;if(s<h)return[L,B-s];s-=h;if(s<w)return[L+s,T];s-=w;if(s<h)return[R,T+s];s-=h;return[R-s,B];}};};
function rays3(n){const k={real:[],virt:[],pul:inst(80,T3.sph,mat(0xfff1c0,{glow:3}))};for(let i=0;i<n;i++){const o=rod(1.8,mat(NEON.warm,{glow:1.6,metal:0}));o.castShadow=false;k.real.push(o);const v=rod(1.2,mat(NEON.warm,{glow:0.5,opacity:0.3}));v.castShadow=false;k.virt.push(v);}return k;}
function setRays(k,lines,virt,t){k.real.forEach((o,i)=>{const s=lines[i];if(!s){o.visible=false;return;}setRod(o,s[0],s[1],0,s[2],s[3],0);});k.virt.forEach((o,i)=>{const s=virt[i];if(!s){o.visible=false;return;}setRod(o,s[0],s[1],0,s[2],s[3],0);});
  let c=0;lines.forEach(s=>{const L=Math.hypot(s[2]-s[0],s[3]-s[1]);if(L<1)return;for(let u=((t*90)%70);u<L&&c<80;u+=70){const f=u/L;setI(k.pul,c++,s[0]+(s[2]-s[0])*f,s[1]+(s[3]-s[1])*f,0,3.2);}});k.pul.count=c;k.pul.instanceMatrix.needsUpdate=true;}
function arrowPair(){return{a:arrow3(NEON.accent),b:arrow3(NEON.red),bv:(()=>{const g=new THREE.Group(),m=mat(NEON.red,{glow:0.6,opacity:0.45}),s=new THREE.Mesh(T3.cyl,m),h=new THREE.Mesh(T3.cone,m);g.add(s,h);g.userData={s,h};T3.root.add(g);return g;})()};}
function focusDots(xs,y){return xs.map(x=>{const b=ball(4.5,NEON.violet,{glow:1.5});b.position.set(x,y,0);return b;});}

SC3.kinematika={cam:[0,5,16.5,0,1.4,0],build({S,W,H}){const ry=H*0.3;floorV(ry+8,W,H);const road=cube(W*2.2,3,110,0x161b28,{rough:0.9,metal:0.1});road.position.set(W/2,ry+6.5,0);
    for(let x=-W*0.5;x<W*1.6;x+=46){const d=cube(22,1,4,0xffe9a8,{glow:0.6});d.position.set(x,ry+4.8,0);d.castShadow=false;}
    const car=new THREE.Group(),body=new THREE.Mesh(T3.box,mat(NEON.red,{metal:0.6,rough:0.25,env:1}));body.scale.set(46,15,30);body.position.y=-14;const cab=new THREE.Mesh(T3.box,mat(0x9fc6ff,{metal:0.2,rough:0.05,opacity:0.6,env:1.2}));cab.scale.set(24,12,26);cab.position.set(-3,-27,0);
    [body,cab].forEach(o=>{o.castShadow=true;car.add(o);});[[22,-15,9],[22,-15,-9]].forEach(([x,y,z])=>{const l=new THREE.Mesh(T3.sph,mat(0xfff4d0,{glow:3}));l.scale.setScalar(3);l.position.set(x,y,z);car.add(l);});
    T3.wh=[];[[-14,10],[14,10],[-14,-10],[14,-10]].forEach(([x,z])=>{const p=new THREE.Group(),w=new THREE.Mesh(T3.cyl,mat(0x0e1018,{metal:0.3,rough:0.7})),hub=new THREE.Mesh(T3.box,mat(0xdfe6f5,{metal:1,rough:0.2}));w.rotation.x=Math.PI/2;w.scale.set(7,6,7);hub.scale.set(9,2,6.2);w.castShadow=true;p.add(w,hub);p.position.set(x,-6,z+(z>0?6:-6));car.add(p);T3.wh.push(p);});
    car.scale.setScalar(1.7);T3.root.add(car);T3.car=car;T3.v=arrow3(NEON.green);T3.a=arrow3(NEON.warm);T3.posts=[];for(let i=0;i<=8;i++){const p=cube(3,40,3,NEON.accent,{glow:0.2});T3.posts.push(p);}T3.ghost=[];},
  update({S,P,W,H}){const g=S.g;if(!g)return;const X=t=>P.v0*t+P.a*t*t/2,PX=x=>g.x0+(x-g.mn)*g.sc,ry=g.ry,cx=PX(X(S.t)),v=P.v0+P.a*S.t;T3.car.position.set(cx,ry,0);T3.car.rotation.y=v<-0.05?Math.PI:0;
    const dist=X(S.t)*g.sc;T3.wh.forEach(w=>w.rotation.z=-dist/7*(v<-0.05?-1:1));
    T3.posts.forEach((p,i)=>{p.position.set(PX(X(i)),ry-14,-48);p.material=mat(i<=S.t?NEON.accent:0x2a3350,{glow:i<=S.t?1.2:0});});
    setArrow(T3.v,cx,ry-75,0,cx+clamp(v*6,-W*0.3,W*0.3),ry-50,0,3);setArrow(T3.a,cx,ry-98,0,cx+P.a*12,ry-98,0,2.6);}};

SC3.qiya={build({S,W,H}){const gy=H-30;floorV(gy,W,H);T3.k='';T3.blk=cube(1,1,1,NEON.accent,{metal:0.5,rough:0.2,env:1});T3.mg=arrow3(NEON.red);T3.N=arrow3(NEON.green);T3.fr=arrow3(NEON.warm);T3.wg=null;},
  update({S,P}){const g=S.g;if(!g)return;const key=g.al.toFixed(3)+'|'+Math.round(g.tx)+'|'+Math.round(g.bx);
    if(T3.k!==key){T3.k=key;(T3.wg||[]).forEach(o=>o.parent&&o.parent.remove(o));const sh=new THREE.Shape([new THREE.Vector2(g.tx,g.ty),new THREE.Vector2(g.bx,g.gy),new THREE.Vector2(g.tx,g.gy)]);const geo=new THREE.ExtrudeGeometry(sh,{depth:170,bevelEnabled:false});geo.translate(0,0,-85);
      const w=mesh(geo,mat(0x22305a,{metal:0.35,rough:0.45}));const e=new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x7aa8ff}));T3.root.add(e);
      const arc=mesh(new THREE.TorusGeometry(46,1.6,8,40,Math.max(0.01,g.al)),mat(NEON.warm,{glow:1.5}),false);arc.position.set(g.bx,g.gy,86);arc.rotation.z=Math.PI;T3.wg=[w,e,arc];}
    T3.blk.scale.set(g.bs,g.bs,g.bs*1.3);T3.blk.position.set(g.cx,g.cy,0);T3.blk.rotation.z=g.al;const k=g.k,z=g.bs*0.65+6;
    setArrow(T3.mg,g.cx,g.cy,z,g.cx,g.cy+g.mg*k,z,3);setArrow(T3.N,g.cx,g.cy,z,g.cx+g.nrm[0]*g.N*k,g.cy+g.nrm[1]*g.N*k,z,3);
    if(g.fr>0.05)setArrow(T3.fr,g.px,g.py,z,g.px-g.d[0]*g.fr*k,g.py-g.d[1]*g.fr*k,z,3);else T3.fr.visible=false;}};

SC3.impuls={cam:[2,3.5,14,0,0.6,0],build({W,H}){const ty=H*0.5;floorV(ty,W,H);[-22,22].forEach(z=>{const r=rod(2.5,mat(0xb8c0d0,{metal:1,rough:0.2}));setRod(r,-W*0.3,ty-2,z,W*1.3,ty-2,z);});
    const cart=col=>{const g=new THREE.Group(),b=new THREE.Mesh(T3.box,mat(col,{metal:0.55,rough:0.25,env:1}));b.castShadow=true;g.add(b);g.userData.b=b;g.userData.w=[];[-1,1].forEach(sx=>[-1,1].forEach(sz=>{const w=new THREE.Mesh(T3.cyl,mat(0x0e1018,{metal:0.3,rough:0.6}));w.rotation.x=Math.PI/2;w.scale.set(6,5,6);w.castShadow=true;g.add(w);g.userData.w.push([w,sx,sz]);}));T3.root.add(g);return g;};
    T3.c1=cart(NEON.accent);T3.c2=cart(NEON.warm);T3.v1=arrow3(NEON.accent);T3.v2=arrow3(NEON.warm);T3.fm=new THREE.MeshBasicMaterial({color:0xff7a5a,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false});T3.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.06,8,48),T3.fm);T3.root.add(T3.ring);T3.fl=new THREE.PointLight(0xff8a5a,0,0,2);T3.root.add(T3.fl);},
  update({S,P,W,H}){const sc=S.sc||(W-40)/20,x0=20,ty=H*0.5;[[T3.c1,S.x1,P.m1,T3.v1,S.v1],[T3.c2,S.x2,P.m2,T3.v2,S.v2]].forEach(([c,x,m,ar,v])=>{const w=30+m*4,cx=x0+x*sc;c.position.set(cx,ty,0);c.userData.b.scale.set(w,34,40);c.userData.b.position.y=-25;
      c.userData.w.forEach(([o,sx,sz])=>{o.position.set(sx*w/3,-5,sz*22);o.rotation.y=0;});setArrow(ar,cx,ty-62,0,cx+v*16,ty-62,0,3);});
    const f=S.flash;T3.fm.opacity=f*2.6;const r=(0.35-f)*120+8;T3.ring.scale.setScalar(r);T3.ring.position.set(x0+S.fx*sc,ty-25,0);T3.ring.rotation.y=Math.PI/2*0.5;T3.fl.position.copy(T3.ring.position);T3.fl.intensity=f*6;}};

SC3.doppler={cam:[0,3.5,15,0,0,0],build({W,H}){const cy=H/2;T3.src=ball(10,NEON.red,{glow:1.4});T3.sl=new THREE.PointLight(0xff6a5a,1.2,0,2);T3.root.add(T3.sl);T3.u=arrow3(NEON.red);
    [14,W-14].forEach(x=>{const m=ball(8,NEON.green,{glow:1.2,metal:0.4});m.position.set(x,cy,0);const st=rod(2,mat(0xb8c0d0,{metal:1,rough:0.3}));setRod(st,x,cy+8,0,x,cy+140,0);});
    T3.ringG=new THREE.TorusGeometry(1,0.014,6,120);T3.mach=new THREE.Mesh(new THREE.ConeGeometry(1,1,48,1,true),new THREE.MeshBasicMaterial({color:0xff5a5a,transparent:true,opacity:0.12,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,depthWrite:false}));T3.root.add(T3.mach);},
  update({S,P,W,H}){if(S.sx===null)return;const cy=H/2,cp=110;T3.src.position.set(S.sx,cy,0);T3.sl.position.set(S.sx,cy,30);if(P.u>0.02)setArrow(T3.u,S.sx+12,cy,0,S.sx+12+P.u*40,cy,0,2.6);else T3.u.visible=false;
    sync('fr',S.fr,()=>{const m=new THREE.MeshBasicMaterial({color:0x7aa8ff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false});const a=new THREE.Mesh(T3.ringG,m),b=new THREE.Mesh(T3.ringG,m);b.rotation.y=Math.PI/2;const c=new THREE.Mesh(T3.ringG,m);c.rotation.x=Math.PI/2;const g=new THREE.Group();g.add(a,b,c);g.userData.m=m;T3.root.add(g);return g;},
      (g,f)=>{const r=Math.max(0.1,(S.t-f[1])*cp);g.position.set(f[0],cy,0);g.scale.setScalar(r);g.userData.m.opacity=Math.max(0.08,0.95-r/(W*0.9));});
    if(P.u>1){const al=Math.asin(1/P.u),L=W;T3.mach.visible=true;T3.mach.scale.set(L*Math.tan(al),L,L*Math.tan(al));T3.mach.rotation.z=-Math.PI/2;T3.mach.position.set(S.sx-L/2,cy,0);}else T3.mach.visible=false;}};

function circuitCam(Lx,Rx,W){const c=((Lx+Rx)/2-W/2)/(W/16);return[c+2.2,2.2,12.5,c,0,0];}
SC3.om={cam:(W)=>circuitCam(30,W*0.58,W),build({W,H}){const L=30,R=W*0.58,T=H*0.18,B=H*0.82,my=(T+B)/2;wires([[L,B],[L,T],[R,T],[R,B]],true);battery3(L,my);const r=resistor3();r.position.set(L+(R-L)/2,T,0);T3.bulb=bulb3(R,my);T3.bulb.rotation.z=-Math.PI/2;
    T3.el=inst(60,T3.sph,mat(NEON.accent,{glow:2.2}));T3.lp=loopPt(L,T,R,B);},
  update({S,P}){const I=P.U/P.R,Pw=P.U*I,g=Math.sqrt(Pw/288),b=T3.bulb.userData;b.fm.emissiveIntensity=0.3+g*9;b.lt.intensity=g*5;b.fil.rotation.y+=0.02;
    const N=44;for(let i=0;i<N;i++){const p=T3.lp.pt(T3.lp.per*i/N-S.s);setI(T3.el,i,p[0],p[1],0,3.6);}T3.el.count=N;T3.el.instanceMatrix.needsUpdate=true;}};

SC3.zanjir={cam:[2.2,2.2,13.5,0,0.6,0],build({W,H}){T3.k='';T3.wr=[];T3.el=inst(120,T3.sph,mat(NEON.accent,{glow:2.2}));T3.bat=null;},
  update({S,P,W,H}){const hasP=S.par.length>0,L=50,R=W-40,T=H*0.16,B=hasP?H*0.48:H*0.72,xa=L+(R-L)*0.28,xb=R-(R-L)*0.28,gap=hasP&&S.par.length>1?Math.min(56,(H-26-B)/(S.par.length-1)):0,my=(T+B)/2,key=S.ser.length+'|'+S.par.length+'|'+W;
    if(T3.k!==key){T3.k=key;T3.wr.forEach(o=>o.parent&&o.parent.remove(o));T3.wr=wires([[L,B],[L,T],[R,T],[R,B]],true);S.par.forEach((r,i)=>{if(i===0)return;const y=B+i*gap;T3.wr.push(...wires([[xa,B],[xa,y],[xb,y],[xb,B]],false));});T3.wr.push(battery3(L,my));}
    sync('res',S.boxes.map(b=>b[2]),()=>resistor3(),(g,r)=>{const b=S.boxes.find(x=>x[2]===r);g.position.set(b[0],b[1],0);g.userData.body.material=mat(r===S.sel?NEON.accent:0xcdb68a,{rough:0.5,metal:0.1,glow:r===S.sel?0.8:0});g.scale.setScalar(r===S.sel?1.12:1);});
    const z=zCalc(S,P),{pt,per}=loopPt(L,T,R,B);let c=0;for(let i=0;i<50;i++){const p=pt(per*i/50-S.s);if(hasP&&Math.abs(p[1]-B)<1&&p[0]>xa&&p[0]<xb)continue;setI(T3.el,c++,p[0],p[1],0,3.4);}
    S.par.forEach((r,i)=>{const y=B+i*gap,len=xb-xa;for(let j=0;j<10;j++){const u=((j/10*len+S.ph[i])%len+len)%len;setI(T3.el,c++,xb-u,y,0,3.4);}});T3.el.count=c;T3.el.instanceMatrix.needsUpdate=true;}};

SC3.kondensator={cam:(W)=>circuitCam(40,W*0.5,W),build({W,H}){const L=40,R=W*0.5,T=H*0.2,B=H*0.8,my=(T+B)/2,ph=Math.min(120,(B-T)*0.6);
    wires([[R,my-ph/2-2],[R,T],[L,T],[L,B],[R,B],[R,my+ph/2+2]],false);T3.bat=battery3(L,my);const r=resistor3();r.position.set((L+R)/2,T,0);
    T3.pm=[new THREE.MeshStandardMaterial({color:0xcfd6e6,metalness:0.9,roughness:0.25,emissive:0xff4040,emissiveIntensity:0}),new THREE.MeshStandardMaterial({color:0xcfd6e6,metalness:0.9,roughness:0.25,emissive:0x4070ff,emissiveIntensity:0})];
    [-1,1].forEach((s,i)=>{const p=mesh(T3.box,T3.pm[i]);p.scale.set(6,ph,ph);p.position.set(R+s*12,my,0);});
    T3.fl=[];const fm=new THREE.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false});T3.fm=fm;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const o=new THREE.Mesh(T3.cyl,fm);o.rotation.z=Math.PI/2;o.scale.set(1.2,18,1.2);o.position.set(R,my+a*ph/3.2,b*ph/3.2);T3.root.add(o);}
    T3.qp=inst(40,T3.sph,mat(NEON.red,{glow:2}));T3.qn=inst(40,T3.sph,mat(NEON.accent,{glow:2}));T3.el=inst(50,T3.sph,mat(NEON.accent,{glow:2.2}));T3.geo={L,R,T,B,my,ph};},
  update({S,P}){const{L,R,T,B,my,ph}=T3.geo,tau=P.R*1e3*P.C*1e-6,e=Math.exp(-S.t/tau),u=P.mode?P.U*(1-e):P.U*e,frac=u/12;T3.pm[0].emissiveIntensity=frac*2.2;T3.pm[1].emissiveIntensity=frac*2.2;T3.fm.opacity=frac*0.9;T3.bat.visible=!!P.mode;
    const nq=Math.round(frac*10);let c=0;for(let i=0;i<nq;i++)for(let j=-1;j<=1;j++){const y=my-ph/2+(i+0.5)*ph/10;setI(T3.qp,c,R-17,y,j*ph/3,3);setI(T3.qn,c,R+17,y,j*ph/3,3);c++;}T3.qp.count=T3.qn.count=c;T3.qp.instanceMatrix.needsUpdate=T3.qn.instanceMatrix.needsUpdate=true;
    const{pt,per}=loopPt(L,T,R,B);let k=0;for(let i=0;i<40;i++){const p=pt(per*i/40-S.s);if(Math.abs(p[0]-R)<2&&Math.abs(p[1]-my)<ph/2+6)continue;setI(T3.el,k++,p[0],p[1],0,3.4);}T3.el.count=k;T3.el.instanceMatrix.needsUpdate=true;}};

SC3.sinish={cam:[3,1.5,15,0,-0.2,0],build({W,H}){const hy=H/2;T3.m1=new THREE.MeshStandardMaterial({color:0x3aa0ff,transparent:true,opacity:0.1,metalness:0.1,roughness:0.05,depthWrite:false});T3.m2=T3.m1.clone();
    const a=new THREE.Mesh(T3.box,T3.m1);a.scale.set(W*1.3,hy,260);a.position.set(W/2,hy/2,0);const b=new THREE.Mesh(T3.box,T3.m2);b.scale.set(W*1.3,H-hy,260);b.position.set(W/2,hy+(H-hy)/2,0);T3.root.add(a,b);
    const sf=cube(W*1.3,1.5,260,NEON.accent,{glow:0.5,opacity:0.6});sf.position.set(W/2,hy,0);sf.castShadow=false;const nr=rod(1,mat(0x8e9cb2,{opacity:0.5}));setRod(nr,W/2,10,0,W/2,H-10,0);
    T3.las=new THREE.Group();const lb=new THREE.Mesh(T3.cyl,mat(0x1b2233,{metal:0.8,rough:0.25,env:1}));lb.scale.set(9,40,9);lb.position.y=-14;const tip=new THREE.Mesh(T3.cyl,mat(NEON.warm,{glow:2.5}));tip.scale.set(5,4,5);tip.position.y=8;T3.las.add(lb,tip);T3.root.add(T3.las);
    T3.r=[rod(2.6,mat(NEON.warm,{glow:2.2})),rod(2.6,mat(NEON.warm,{glow:0.6,opacity:0.4})),rod(2.6,mat(NEON.warm,{glow:2.2}))];T3.r.forEach(o=>o.castShadow=false);T3.hit=new THREE.PointLight(0xffb347,2,0,2);T3.root.add(T3.hit);T3.hb=ball(5,0xffe0a0,{glow:3});T3.ak='';T3.arcs=[];},
  update({S,P,W,H}){const g=snellGeo(W,H,P),sb=P.n1/P.n2*Math.sin(g.a),tir=sb>1,Lr=Math.hypot(W,H)*0.55;T3.m1.opacity=0.05+(P.n1-1)*0.28;T3.m2.opacity=0.05+(P.n2-1)*0.28;
    setRod(T3.r[0],g.sx,g.sy,0,g.hx,g.hy,0);setRod(T3.r[1],g.hx,g.hy,0,g.hx+Math.sin(g.a)*Lr,g.hy-Math.cos(g.a)*Lr,0);T3.r[1].material=mat(NEON.warm,{glow:tir?2.2:0.6,opacity:tir?undefined:0.4});
    if(!tir){const b=Math.asin(sb);setRod(T3.r[2],g.hx,g.hy,0,g.hx+Math.sin(b)*Lr,g.hy+Math.cos(b)*Lr,0);}else T3.r[2].visible=false;
    T3.las.position.set(g.sx,g.sy,0);T3.las.quaternion.setFromUnitVectors(_up,_d.set(g.hx-g.sx,g.hy-g.sy,0).normalize());T3.hit.position.set(g.hx,g.hy,20);T3.hb.position.set(g.hx,g.hy,0);
    const key=P.a+'|'+(tir?'t':Math.asin(sb).toFixed(3));if(T3.ak!==key){T3.ak=key;T3.arcs.forEach(o=>o.parent&&o.parent.remove(o));T3.arcs=[];const A=mesh(new THREE.TorusGeometry(40,1.3,6,40,Math.max(0.01,g.a)),mat(NEON.accent,{glow:1.5}),false);A.position.set(g.hx,g.hy,0);A.rotation.z=-Math.PI/2-g.a;T3.arcs.push(A);
      if(!tir){const b=Math.asin(sb),Bm=mesh(new THREE.TorusGeometry(46,1.3,6,40,Math.max(0.01,b)),mat(NEON.green,{glow:1.5}),false);Bm.position.set(g.hx,g.hy,0);Bm.rotation.z=Math.PI/2-b;T3.arcs.push(Bm);}}}};

function lensMesh(type,lh){const pts=[];if(type>0){for(let i=0;i<=24;i++){const r=lh*i/24;pts.push(new THREE.Vector2(r,9*(1-(r/lh)**2)+0.5));}for(let i=24;i>=0;i--){const r=lh*i/24;pts.push(new THREE.Vector2(r,-9*(1-(r/lh)**2)-0.5));}}
  else{for(let i=0;i<=24;i++){const r=lh*i/24;pts.push(new THREE.Vector2(r,2+10*(r/lh)**2));}for(let i=24;i>=0;i--){const r=lh*i/24;pts.push(new THREE.Vector2(r,-2-10*(r/lh)**2));}}
  const m=mesh(new THREE.LatheGeometry(pts,64),mat(0xbfe0ff,{glass:1,opacity:0.5}),false);m.rotation.z=Math.PI/2;const rim=mesh(new THREE.TorusGeometry(lh,1.2,8,80),mat(NEON.water,{glow:1.2}),false);rim.rotation.y=Math.PI/2;return[m,rim];}
SC3.linza={cam:[2.5,2,14.5,0,-0.6,0],build({W,H}){const{Lx,ay}=lensGeo(W,H);const ax=rod(0.8,mat(0x8e9cb2,{opacity:0.5}));setRod(ax,-W*0.2,ay,0,W*1.2,ay,0);T3.k='';T3.lens=[];T3.fd=[];T3.ar=arrowPair();T3.rk=rays3(6);
    const bench=cube(W*1.1,10,60,0x161c2a,{metal:0.7,rough:0.35});bench.position.set(W/2,H*0.95,0);const st=rod(4,mat(0xb8c0d0,{metal:1,rough:0.25}));setRod(st,Lx,ay+Math.min(H*0.42,ay-12),0,Lx,H*0.95,0);},
  update({S,P,W,H,t}){const{Lx,ay,sc}=lensGeo(W,H),F=P.f*P.type,d=P.d,h=P.h,X=x=>Lx+x*sc,Y=y=>ay-y*sc,lh=Math.min(H*0.42,ay-12),key=P.type+'|'+P.f;
    if(T3.k!==key){T3.k=key;[...T3.lens,...T3.fd].forEach(o=>o.parent&&o.parent.remove(o));T3.lens=lensMesh(P.type,lh);T3.lens.forEach(o=>o.position.set(Lx,ay,0));T3.fd=focusDots([-2,-1,1,2].map(k=>X(k*P.f)),ay);}
    const di=Math.abs(d-F)<1e-9?Infinity:F*d/(d-F),hi=isFinite(di)?-h*di/d:0,xr=(W-Lx)/sc+2,yls=[h,0];if(Math.abs(F-d)>0.05){const y3=h*F/(F-d);if(Math.abs(y3*sc)<H)yls.push(y3);}
    const real=[],virt=[];yls.forEach(yl=>{const mo=(yl-h)/d-yl/F;real.push([X(-d),Y(h),X(0),Y(yl)],[X(0),Y(yl),X(xr),Y(yl+mo*xr)]);if(isFinite(di)&&di<0){const xe=Math.max(di,-Lx/sc);virt.push([X(0),Y(yl),X(xe),Y(yl+mo*xe)]);}});setRays(T3.rk,real.slice(0,6),virt,t);
    setArrow(T3.ar.a,X(-d),ay,0,X(-d),Y(h),0,4);const ok=isFinite(di)&&Math.abs(X(di))<W*3;T3.ar.b.visible=false;T3.ar.bv.visible=false;if(ok)setArrow(di<0?T3.ar.bv:T3.ar.b,X(di),ay,0,X(di),Y(hi),0,3.6);}};

SC3.kozgu={cam:[-2,2,14.5,0,-0.6,0],build({W,H}){const{Mx,ay}=kzGeo(W,H);const ax=rod(0.8,mat(0x8e9cb2,{opacity:0.5}));setRod(ax,-W*0.2,ay,0,W*1.1,ay,0);T3.k='';T3.mir=[];T3.fd=[];T3.ar=arrowPair();T3.rk=rays3(6);
    const st=rod(5,mat(0xb8c0d0,{metal:1,rough:0.25}));setRod(st,Mx+14,ay,0,Mx+14,H*0.97,0);const base=cube(80,10,80,0x161c2a,{metal:0.7,rough:0.35});base.position.set(Mx+14,H*0.97,0);},
  update({S,P,W,H,t}){const{Mx,ay,sc}=kzGeo(W,H),F=P.f,d=P.d,h=P.h,X=u=>Mx-u*sc,Y=y=>ay-y*sc,mh=Math.min(H*0.42,ay-12),key=String(P.f);
    if(T3.k!==key){T3.k=key;[...T3.mir,...T3.fd].forEach(o=>o.parent&&o.parent.remove(o));const pts=[];for(let i=0;i<=30;i++){const yy=mh*i/30;pts.push(new THREE.Vector2(yy,(yy/sc)**2/(8*F)*sc));}
      const m=mesh(new THREE.LatheGeometry(pts,72),mat(0x9aa6bd,{metal:1,rough:0.12,env:0.9,side:1}));m.rotation.z=Math.PI/2;m.position.set(Mx,ay,0);const back=mesh(new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p.x,p.y-5)),72),mat(0x1b2233,{metal:0.6,rough:0.4,side:1}));back.rotation.z=Math.PI/2;back.position.set(Mx+0.1,ay,0);
      const rim=mesh(new THREE.TorusGeometry(mh,2.5,8,90),mat(NEON.accent,{glow:1}),false);rim.rotation.y=Math.PI/2;rim.position.set(Mx-(mh/sc)**2/(8*F)*sc,ay,0);T3.mir=[m,back,rim];T3.fd=focusDots([X(F),X(2*F)],ay);}
    const di=Math.abs(d-F)<1e-9?Infinity:F*d/(d-F),xr=Mx/sc+2,yls=[h,0];if(Math.abs(F-d)>0.05){const y3=h*F/(F-d);if(Math.abs(y3*sc)<H)yls.push(y3);}
    const real=[],virt=[];yls.forEach(yl=>{const mo=(yl-h)/d-yl/F;real.push([X(d),Y(h),X(0),Y(yl)],[X(0),Y(yl),X(xr),Y(yl+mo*xr)]);if(isFinite(di)&&di<0){const xe=Math.max(di,-(W-Mx)/sc);virt.push([X(0),Y(yl),X(xe),Y(yl+mo*xe)]);}});setRays(T3.rk,real.slice(0,6),virt,t);
    setArrow(T3.ar.a,X(d),ay,0,X(d),Y(h),0,4);T3.ar.b.visible=T3.ar.bv.visible=false;if(isFinite(di))setArrow(di<0?T3.ar.bv:T3.ar.b,X(di),ay,0,X(di),Y(-h*di/d),0,3.6);}};

SC3.issiqlik={cam:(W)=>{const px=W*0.08,pw=Math.min(W*0.3,200),c=((px+pw/2+px+pw+46)/2-W/2)/(W/16);return[c+2,1.8,11.5,c,-0.6,0];},build({W,H}){const px=W*0.08,pw=Math.min(W*0.3,200),pb=H*0.74,ph=H*0.4,cx=px+pw/2,tx=px+pw+46;floorV(pb+28,W,H);
    const bur=cube(pw+30,12,pw+30,0x1b2233,{metal:0.8,rough:0.3});bur.position.set(cx,pb+22,0);T3.fl=[];for(let i=0;i<9;i++){const a=i/9*TAU,f=mesh(T3.cone,new THREE.MeshBasicMaterial({color:0xff8a30,transparent:true,opacity:0.8,blending:THREE.AdditiveBlending,depthWrite:false}),false);f.rotation.x=Math.PI;f.userData={x:cx+Math.cos(a)*pw*0.3,z:Math.sin(a)*pw*0.3};T3.fl.push(f);}
    T3.fire=new THREE.PointLight(0xff7a30,2,0,2);T3.fire.position.set(cx,pb+5,0);T3.root.add(T3.fire);
    const pot=mesh(new THREE.CylinderGeometry(pw/2,pw/2,ph,48,1,true),mat(0xdfefff,{glass:1,opacity:0.22}),false);pot.position.set(cx,pb-ph/2,0);const pb2=mesh(new THREE.CylinderGeometry(pw/2,pw/2,4,48),mat(0x8a96b0,{metal:1,rough:0.3}));pb2.position.set(cx,pb-2,0);
    T3.lm=new THREE.MeshStandardMaterial({color:0x3aa0ff,transparent:true,opacity:0.75,roughness:0.05,metalness:0.1,emissive:0x000000});T3.liq=mesh(new THREE.CylinderGeometry(pw/2-4,pw/2-4,1,48),T3.lm,false);T3.pot=[pot,pb2];
    T3.sm=new THREE.MeshStandardMaterial({color:0x8a8f99,metalness:0.8,roughness:0.35,emissive:0xff3a10,emissiveIntensity:0});T3.solid=mesh(T3.box,T3.sm);
    const th=ph+40,tg=mesh(T3.cyl,mat(0xffffff,{glass:1,opacity:0.3}),false);tg.scale.set(8,th,8);tg.position.set(tx,pb-th/2,0);const tb=ball(12,NEON.red,{glow:1.5});tb.position.set(tx,pb+8,0);T3.col=mesh(T3.cyl,mat(NEON.red,{glow:1.8}),false);
    T3.g={px,pw,pb,ph,cx,tx,th};T3.bb=new Map();},
  update({S,P,t}){const g=T3.g,[name,Tm,liq]=MATS[P.c],heat=(S.T-20)/280,fl=P.P/3000,now=performance.now()/1000;T3.fl.forEach((f,i)=>{const hh=14+fl*40*(0.75+0.25*Math.sin(now*11+i*2.3));f.scale.set(7,hh,7);f.position.set(f.userData.x,g.pb+16-hh/2,f.userData.z);});T3.fire.intensity=1+fl*4+Math.sin(now*20)*0.3;
    T3.pot.forEach(o=>o.visible=liq);T3.liq.visible=liq;T3.solid.visible=!liq;
    if(liq){const lh=g.ph*Math.min(0.85,0.35+P.m*0.17);T3.liq.scale.y=lh;T3.liq.position.set(g.cx,g.pb-lh/2-3,0);T3.lm.color.set(P.c===4200?0x3aa0ff:0xa070ff);T3.lm.emissive.setRGB(heat*0.9,heat*0.25,0);
      sync('bub',S.bub,()=>{const b=ball(1,0xe8f4ff,{glass:1,opacity:0.5});b.userData.z=(Math.random()-0.5)*g.pw*0.6;return b;},(m,b)=>{m.scale.setScalar(3.5);m.position.set(g.px+6+b.x*(g.pw-12),g.pb-lh*(1-b.y),m.userData.z);});}
    else{sync('bub',[],()=>null,()=>{});const bs=Math.min(g.pw*0.7,40+P.m*30);T3.solid.scale.set(bs,bs,bs);T3.solid.position.set(g.cx,g.pb-bs/2,0);T3.sm.emissiveIntensity=Math.max(0,heat-0.2)*4;T3.sm.color.setRGB(0.45+heat*0.5,0.45,0.48-heat*0.3);}
    const tf=S.T/(Tm>100?320:110),hc=Math.max(2,g.th*tf);T3.col.scale.set(4,hc,4);T3.col.position.set(g.tx,g.pb-hc/2+2,0);}};

const METC={2.14:0xe8c66a,2.28:0xc9ced8,4.3:0x9aa6b4,4.7:0xd8875a};
SC3.fotoeffekt={cam:[1.5,2.5,15,-0.6,0,0],build({W,H}){const lx=W*0.1,ly=H*0.16,py=H*0.8;floorV(py+40,W,H);T3.plate=cube(W*0.42,16,170,0xc9ced8,{metal:1,rough:0.3,env:0.6});T3.plate.position.set(W*0.41,py+8,0);
    T3.lamp=new THREE.Mesh(T3.sph,new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:2}));T3.lamp.scale.setScalar(18);T3.lamp.position.set(lx,ly,0);T3.root.add(T3.lamp);T3.ll=new THREE.PointLight(0xffffff,3,0,2);T3.ll.position.set(lx,ly,30);T3.root.add(T3.ll);
    const hs=cube(46,30,46,0x1b2233,{metal:0.8,rough:0.3});hs.position.set(lx-22,ly-10,0);
    T3.beamM=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.07,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,depthWrite:false});const tx=W*0.41,L=Math.hypot(tx-lx,py-ly);const bm=new THREE.Mesh(new THREE.ConeGeometry(W*0.2,L,40,1,true),T3.beamM);bm.position.set((lx+tx)/2,(ly+py)/2,0);bm.quaternion.setFromUnitVectors(_up,_d.set(lx-tx,ly-py,0).normalize());T3.root.add(bm);
    T3.bars=[0,1,2].map(i=>cube(1,1,40,[0xffffff,0x6a7590,NEON.green][i],{glow:i===1?0:0.9,metal:0.2,rough:0.3}));T3.pm=new Map();},
  update({S,P,W,H}){const col=new THREE.Color(wl2rgb(P.lam)),E=1240/P.lam,Ek=E-P.A,py=H*0.8;T3.lamp.material.emissive.copy(col);T3.lamp.material.color.copy(col);T3.ll.color.copy(col);T3.beamM.color.copy(col);T3.plate.material=mat(METC[P.A],{metal:1,rough:0.3,env:0.6});
    const pm=mat(col.getHex(),{glow:3});sync('ph',S.ph,()=>ball(6,col.getHex(),{glow:3}),(m,p)=>{const ux=(p.tx-W*0.1)/p.d,uy=(p.ty-H*0.16)/p.d;m.material=pm;m.position.set(W*0.1+ux*p.s,H*0.16+uy*p.s,(m.userData.z??(m.userData.z=(Math.random()-0.5)*120))*(p.s/p.d));});
    sync('el',S.el,()=>{const b=ball(7,NEON.accent,{glow:2.5});b.userData.z=(Math.random()-0.5)*120;return b;},(m,e)=>m.position.set(e.x,e.y,m.userData.z));
    const bx=W*0.73,bw=Math.min(46,W*0.08),bb=H*0.85,bt=H*0.12,es=(bb-bt)/9,bar=(o,x,y0,h,c)=>{o.visible=h>0.5;o.scale.set(bw,Math.max(0.5,h),40);o.position.set(x+bw/2,y0-h/2,0);if(c!==undefined)o.material=mat(c,{glow:0.9,metal:0.2,rough:0.3});};
    bar(T3.bars[0],bx,bb,Math.min(E,9)*es,col.getHex());bar(T3.bars[1],bx+bw+14,bb,P.A*es);bar(T3.bars[2],bx+bw+14,bb-P.A*es,Ek>0?Math.min(Ek,9-P.A)*es:0);}};

SC3.yemirilish={cam:[1.5,2.8,14,0,-0.2,0],build({W,H}){T3.nu=new THREE.InstancedMesh(T3.sph,new THREE.MeshStandardMaterial({color:0x9a9a9a,metalness:0.3,roughness:0.4,envMapIntensity:0.25}),400);T3.nu.castShadow=true;T3.root.add(T3.nu);T3.cA=new THREE.Color(NEON.green);T3.cD=new THREE.Color(0x232a3a);
    T3.fx=inst(400,T3.sph,new THREE.MeshBasicMaterial({color:0xffb347,transparent:true,opacity:0.85,blending:THREE.AdditiveBlending,depthWrite:false}));
    const sz=Math.min(H*0.86,W*0.44),cell=sz/20,ox=16,oy=(H-sz)/2,back=cube(sz+16,sz+16,6,0x101626,{metal:0.6,rough:0.4});back.position.set(ox+sz/2,oy+sz/2,-cell);
    const gx=ox+sz+44,gr=W-16,gt=H*0.1,gb=H*0.86;const ax=mat(0x8e9cb2,{metal:0.6});[[gx,gb,gr,gb],[gx,gb,gx,gt]].forEach(([a,b,c,d])=>{const r=rod(1.5,ax);setRod(r,a,b,0,c,d,0);});
    T3.th=line3(0x8e9cb2,101,{opacity:0.6});T3.cv=new THREE.Mesh(new THREE.BufferGeometry(),mat(NEON.red,{glow:1.6}));T3.root.add(T3.cv);T3.g={sz,cell,ox,oy,gx,gr,gt,gb};T3.hk=-1;},
  update({S,P}){const{cell,ox,oy,gx,gr,gt,gb}=T3.g,m=T3._m||(T3._m=new THREE.Matrix4());let f=0;for(let i=0;i<400;i++){const x=ox+(i%20+0.5)*cell,y=oy+(Math.floor(i/20)+0.5)*cell,a=S.a[i],s=a?cell*0.42:cell*0.22;m.makeScale(s,s,s);m.setPosition(x,y,a?Math.sin(i*1.7+performance.now()/400)*1.5:-cell*0.3);T3.nu.setMatrixAt(i,m);T3.nu.setColorAt(i,a?T3.cA:T3.cD);
      if(S.flash[i]>0){const k=S.flash[i];setI(T3.fx,f++,x,y,cell*(1-k)*3,cell*(0.15+(1-k)*0.45));}}T3.nu.instanceMatrix.needsUpdate=true;T3.nu.instanceColor.needsUpdate=true;T3.fx.count=f;T3.fx.instanceMatrix.needsUpdate=true;
    const tm=5*P.T,X=t=>gx+t/tm*(gr-gx),Y=n=>gb-n/400*(gb-gt),pts=[];for(let i=0;i<=100;i++){const t=tm*i/100;pts.push([X(t),Y(400*2**(-t/P.T)),0]);}setLine(T3.th,pts);
    if(T3.hk!==S.h.length){T3.hk=S.h.length;const cp=S.h.filter(h=>h[0]<=tm).map(([t,n])=>new THREE.Vector3(X(t),Y(n),0));if(cp.length>1){T3.cv.geometry.dispose();T3.cv.geometry=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cp),Math.min(300,cp.length*2),2.2,6,false);}}}};
