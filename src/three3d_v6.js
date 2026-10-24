/* ===== v6: 20 ta yangi mavzu uchun 3D sahnalar ===== */
function setIR(im,i,x,y,z,rz,sx,sy,sz,rx=0){const m=T3._m2||(T3._m2=new THREE.Matrix4()),q=T3._q2||(T3._q2=new THREE.Quaternion()),e=T3._e2||(T3._e2=new THREE.Euler()),p=T3._p2||(T3._p2=new THREE.Vector3()),s=T3._s2||(T3._s2=new THREE.Vector3());e.set(rx,0,rz);q.setFromEuler(e);p.set(x,y,z);s.set(sx,sy,sz);m.compose(p,q,s);im.setMatrixAt(i,m);}
function pul3(r){const g=new THREE.Group(),d=new THREE.Mesh(new THREE.CylinderGeometry(r,r,10,36),mat(0x9aa6c0,{metal:0.9,rough:0.25})),gr=new THREE.Mesh(new THREE.TorusGeometry(r,2.2,8,36),mat(0x2a3246,{metal:0.6,rough:0.4})),h=new THREE.Mesh(new THREE.CylinderGeometry(3.5,3.5,14,16),mat(NEON.ink,{metal:1,rough:0.2}));
  d.rotation.x=h.rotation.x=Math.PI/2;[d,gr,h].forEach(o=>{o.castShadow=true;g.add(o);});const sp=cube(r*1.6,2,11,0x4a5570,{metal:0.8});g.remove(sp);T3.root.remove(sp);g.add(sp);T3.root.add(g);return g;}
function cylY(o,x,y1,y2,r,z=0){const h=Math.abs(y2-y1);o.visible=h>0.5;o.position.set(x,(y1+y2)/2,z);o.scale.set(r,Math.max(0.01,h),r);}
const LIQ=(col,o=0.78)=>new THREE.MeshStandardMaterial({color:col,metalness:0.15,roughness:0.15,transparent:true,opacity:o,emissive:col,emissiveIntensity:0.18,envMapIntensity:0.8});

/* --- Kinematika --- */
SC3.gildirak={build({W,H}){const g=S.g;floorV(g.gy,W,H);const wh=new THREE.Group();const tire=new THREE.Mesh(new THREE.TorusGeometry(1,0.09,16,64),mat(0x1a1f2c,{metal:0.3,rough:0.6}));const rim=new THREE.Mesh(new THREE.TorusGeometry(0.88,0.035,10,64),mat(0xcfd6e6,{metal:1,rough:0.15}));
    wh.add(tire,rim);for(let i=0;i<8;i++){const s=new THREE.Mesh(T3.box,mat(0xcfd6e6,{metal:1,rough:0.2}));s.scale.set(0.035,0.88,0.035);s.position.set(Math.cos(i*Math.PI/4)*0.44,Math.sin(i*Math.PI/4)*0.44,0);s.rotation.z=i*Math.PI/4-Math.PI/2;wh.add(s);}
    const hub=new THREE.Mesh(T3.cyl,mat(NEON.accent,{metal:0.8,glow:0.4}));hub.rotation.x=Math.PI/2;hub.scale.set(0.12,0.25,0.12);wh.add(hub);wh.traverse(o=>{if(o.isMesh)o.castShadow=true;});T3.root.add(wh);T3.wh=wh;
    T3.mk=ball(7,NEON.red,{glow:1.5});T3.tr=line3(NEON.warm,900);T3.va=[0,1,2,3].map(()=>arrow3(NEON.green));T3.vc=arrow3(NEON.accent);T3.cp=ball(5,NEON.green,{glow:1.2});},
  update({S,P}){const g=S.g;if(!g)return;const sc=g.sc,X=x=>20+x*sc,r=P.R*sc,cx=X(S.x),cy=g.gy-r;T3.wh.position.set(cx,cy,0);T3.wh.scale.set(r,r,r*0.9);T3.wh.rotation.z=S.ph;
    T3.mk.position.set(cx-Math.sin(S.ph)*r,cy+Math.cos(S.ph)*r,0);setLine(T3.tr,S.tr.map(([x,y])=>[X(x),g.gy-y*sc,0]));const k=34/P.v*0.9;
    [0,Math.PI/2,Math.PI,3*Math.PI/2].forEach((a,i)=>{const px=cx+Math.sin(a)*r,py=cy+Math.cos(a)*r,dx=px-cx,dy=py-(cy+r),vx=-(dy/r)*P.v,vy=(dx/r)*P.v;setArrow(T3.va[i],px,py,r*0.15+6,px+vx*k,py+vy*k,r*0.15+6,2.4);});
    setArrow(T3.vc,cx,cy,r*0.3+8,cx+P.v*k,cy,r*0.3+8,3);T3.cp.position.set(cx,g.gy,8);}};

SC3.nisbiy={cam:[0,3.4,15.5,0,0.6,0],build({W,H}){const g=S.g;floorV(g.gy,W,H);const sc=g.sc;
    const wg=new THREE.Group(),body=new THREE.Mesh(T3.box,mat(0x9fc6ff,{glass:1,opacity:0.16}));body.scale.set(7*sc,3*sc,2.6*sc);const fr=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(7*sc,3*sc,2.6*sc)),new THREE.LineBasicMaterial({color:NEON.accent}));
    const fl=new THREE.Mesh(T3.box,mat(0x1b2233,{metal:0.6,rough:0.4}));fl.scale.set(7*sc,0.12*sc,2.6*sc);fl.position.y=1.44*sc;wg.add(body,fr,fl);
    T3.wl=[-2.3,2.3].flatMap(x=>[-1,1].map(z=>{const w=new THREE.Mesh(T3.cyl,mat(0x0e1018,{metal:0.4,rough:0.5}));w.rotation.x=Math.PI/2;w.scale.set(0.3*sc,0.2*sc,0.3*sc);w.position.set(x*sc,1.2*sc,z*1.2*sc);wg.add(w);return w;}));
    wg.traverse(o=>{if(o.isMesh)o.castShadow=true;});T3.root.add(wg);T3.wg=wg;T3.ps=person3(NEON.warm);T3.ps.scale.setScalar(1.75*sc/128);
    T3.trees=[];for(let i=0;i<14;i++){const t=new THREE.Group(),c=new THREE.Mesh(new THREE.ConeGeometry(0.42*sc,1.1*sc,10),mat(0x1d7a4c,{rough:0.8}));c.rotation.x=Math.PI;c.position.y=-0.85*sc;const tr=new THREE.Mesh(T3.cyl,mat(0x5a4030,{rough:0.9}));tr.scale.set(0.07*sc,0.4*sc,0.07*sc);tr.position.y=-0.2*sc;t.add(c,tr);t.traverse(o=>{if(o.isMesh)o.castShadow=true;});T3.root.add(t);T3.trees.push(t);}
    T3.ball=ball(0.13*sc,NEON.red,{glow:0.8});T3.trl=line3(NEON.red,31);T3.a1=arrow3(NEON.accent);T3.a2=arrow3(NEON.warm);T3.a3=arrow3(NEON.green);},
  update({S,P}){const g=S.g;if(!g)return;const sc=g.sc,X=x=>(x-g.offs)*sc,Y=y=>g.gy-y*sc;T3.wg.position.set(X(S.xw),Y(1.7),0);T3.wl.forEach(w=>w.rotation.y=S.xw/0.3);
    const px=S.xw+S.pw*0.95;T3.ps.position.set(X(px),Y(0.4),-0.4*sc);T3.ps.rotation.y=P.v2<0?Math.PI:0;
    const k0=Math.floor(g.offs)-2;T3.trees.forEach((t,i)=>{const k=k0+2*i-((k0%2)+2)%2;t.position.set(X(k+1),g.gy,-2.6*sc);});
    const hd=2.2,T=Math.sqrt(2*hd/9.8),tb=Math.min(S.bt,T),bx=S.bx0+P.v1*tb,by=0.4+hd-9.8*tb*tb/2;T3.ball.position.set(X(bx),Y(by),0.5*sc);
    const pts=[];for(let i=0;i<=30;i++){const t=tb*i/30,x=P.fr?S.bx0+P.v1*tb:S.bx0+P.v1*t;pts.push([X(x),Y(0.4+hd-9.8*t*t/2),0.5*sc]);}setLine(T3.trl,pts);
    const k=sc*0.45;setArrow(T3.a1,X(S.xw),Y(3.9),0,X(S.xw)+P.v1*k,Y(3.9),0,3);setArrow(T3.a2,X(px),Y(2.5),0.2*sc,X(px)+P.v2*k,Y(2.5),0.2*sc,2.4);setArrow(T3.a3,X(px),Y(2.9),0.2*sc,X(px)+(P.v1+P.v2)*k,Y(2.9),0.2*sc,2.8);}};

/* --- Dinamika --- */
SC3.guk={build({W,H}){const g=S.g;const ce=cube(200,12,120,NEON.steel,{metal:0.85,rough:0.25});ce.position.set(g.cx,g.top-6,0);T3.sp=[spring3(0xd6deef),spring3(0xd6deef)];T3.bar=cube(80,5,30,0xcfd6e6,{metal:1,rough:0.2});T3.hk=rod(2,mat(0xcfd6e6,{metal:1}));
    T3.blk=cube(1,1,1,NEON.accent,{metal:0.5,rough:0.25});T3.j=ball(5,NEON.ink,{metal:1});T3.mg=arrow3(NEON.red);T3.fe=arrow3(NEON.green);floorV(H-8,W,H);
    const gx=W*0.55,gr=W-24,gt=H*0.14,gb=H*0.84;T3.z=chart3(gx,gr,gt,gb);T3.GR={gx,gr,gt,gb};T3.kl=[0,1,2].map(()=>line3(0x5a6788,2,{opacity:0.7}));T3.dot=ball(7,NEON.red,{glow:1.6});},
  update({S,P}){const g=S.g;if(!g)return;const k=P.mode===1?P.k/2:P.mode===2?P.k*2:P.k,bot=g.top+g.L0+S.x*g.sc,bs=30+P.m*14,cx=g.cx;
    if(P.mode===2){[-24,24].forEach((d,i)=>setSpring(T3.sp[i],cx+d,g.top,0,cx+d,bot,0,9));T3.sp[1].visible=true;T3.bar.visible=true;T3.bar.position.set(cx,bot,0);T3.j.visible=false;}
    else if(P.mode===1){const jy=g.top+g.L0/2+S.x*g.sc/2;setSpring(T3.sp[0],cx,g.top,0,cx,jy,0,10);setSpring(T3.sp[1],cx,jy,0,cx,bot,0,10);T3.sp[1].visible=true;T3.bar.visible=false;T3.j.visible=true;T3.j.position.set(cx,jy,0);}
    else{setSpring(T3.sp[0],cx,g.top,0,cx,bot,0,11);T3.sp[1].visible=false;T3.bar.visible=false;T3.j.visible=false;}
    setRod(T3.hk,cx,bot,0,cx,bot+10,0);T3.blk.scale.set(bs,bs,bs);T3.blk.position.set(cx,bot+10+bs/2,0);const kf=Math.min(1.8,H*0.18/(P.m*9.8))*4,yc=bot+10+bs/2;
    setArrow(T3.mg,cx-bs/2-16,yc,bs/2,cx-bs/2-16,yc+P.m*9.8*kf,bs/2,3);setArrow(T3.fe,cx+bs/2+16,yc,bs/2,cx+bs/2+16,yc-k*S.x*kf,bs/2,3);
    const{gx,gr,gt,gb}=T3.GR,xm=39.2/P.k*1.05,Fm=20,X=x=>gx+x/xm*(gr-gx),Y=F=>gb-F/Fm*(gb-gt);[P.k/2,P.k,P.k*2].forEach((kk,i)=>{const xe=Math.min(xm,Fm/kk);setLine(T3.kl[i],[[X(0),Y(0),T3.z],[X(xe),Y(kk*xe),T3.z]]);T3.kl[i].material.color.setHex(Math.abs(kk-k)<1e-9?NEON.accent:0x5a6788);});
    T3.dot.position.set(X(Math.min(xm,Math.max(0,S.x))),Y(k*Math.max(0,S.x)),T3.z+4);}};

SC3.vertaylana={build({W,H}){const g=S.g;floorV(g.gy+2,W,H);T3.k='';T3.ball=ball(1,NEON.warm,{metal:0.7,rough:0.15});T3.tr=line3(NEON.warm,500);T3.v=arrow3(NEON.green);T3.N=arrow3(NEON.accent);T3.mg=arrow3(NEON.red);T3.hl=cube(1,1.5,1.5,NEON.green,{glow:1,opacity:0.5});T3.hh=cube(1,1.5,1.5,NEON.accent,{glow:1,opacity:0.5});},
  update({S,P,W}){const g=S.g;if(!g)return;const G=g.G,sc=g.sc,X=x=>g.ox+x*sc,Y=y=>g.gy-y*sc,key=[P.h,P.R,sc,W].join('|');
    if(key!==T3.k){T3.k=key;(T3.tw||[]).forEach(o=>o.parent&&o.parent.remove(o));const rm=mat(0xcfd6e6,{metal:1,rough:0.15}),out=[];
      [-8,8].forEach(z=>{[[X(G.xA),Y(P.h),X(G.xB),Y(0)],[X(G.xB),Y(0),X(G.xL),Y(0)],[X(G.xL),Y(0),X(G.s4-G.s3+G.xL),Y(0)]].forEach(([a,b,c2,d])=>{const r=rod(3,rm);setRod(r,a,b,z,c2,d,z);out.push(r);});
        const t=mesh(new THREE.TorusGeometry(P.R*sc,3,10,96),rm);t.position.set(X(G.xL),Y(P.R),z);out.push(t);});
      for(let i=0;i<4;i++){const f=(i+0.5)/4,x=G.xA+(G.xB-G.xA)*f,y=P.h*(1-f);const p=rod(2.5,mat(0x4a5570,{metal:0.7}));setRod(p,X(x),Y(y),-12,X(x),g.gy,-12);out.push(p);}
      const st=cube(10,Y(0)-Y(P.h)+6,30,0x2a3246,{metal:0.6});st.position.set(X(G.xA)-6,(Y(0)+Y(P.h))/2,0);out.push(st);T3.tw=out;}
    const rr=Math.max(7,0.07*sc);T3.ball.scale.setScalar(rr);let b,nx=0,ny=1,ph=null;if(S.fly)b={x:S.bx,y:S.by};else{b=vlPos(G,P,S.s);ph=b.ph;if(ph!==null){nx=-Math.sin(ph);ny=Math.cos(ph);}}
    const bx=X(b.x)+nx*rr*(ph!==null?1:0),by=Y(b.y)-ny*rr;T3.ball.position.set(bx,by,0);setLine(T3.tr,S.tr.map(([x,y])=>[X(x),Y(y)-rr,0]));const k=9*1.4;
    setArrow(T3.mg,bx,by,rr+4,bx,by+36,rr+4,2.6);
    if(S.fly)setArrow(T3.v,bx,by,rr+4,bx+S.vx*k,by-S.vy*k,rr+4,2.6);else{const vx=ph!==null?Math.cos(ph):b.dy?(G.xB-G.xA)/G.Li:1,vy=ph!==null?Math.sin(ph):b.dy?-P.h/G.Li:0;setArrow(T3.v,bx,by,rr+4,bx+vx*S.u*k,by-vy*S.u*k,rr+4,2.6);}
    const N=(!S.fly&&ph!==null)?S.u*S.u/P.R+9.8*Math.cos(ph):0;T3.N.visible=N>0;if(N>0)setArrow(T3.N,bx,by,rr+4,bx+nx*N/9.8*36,by-ny*N/9.8*36,rr+4,2.6);
    T3.hl.scale.x=W*1.2;T3.hl.position.set(W/2,Y(2.5*P.R),-20);T3.hh.scale.x=W*1.2;T3.hh.position.set(W/2,Y(P.h),-20);}};

/* --- Statika --- */
SC3.blok={build({W,H}){const g=S.g;const ce=cube(300,14,110,NEON.steel,{metal:0.85,rough:0.25});ce.position.set(g.cx+30,g.top-7,0);floorV(H-30,W,H);T3.k='';T3.rp=[];T3.pl=[];
    T3.load=cube(1,1,1,NEON.accent,{metal:0.5,rough:0.25});T3.hand=ball(9,NEON.warm,{metal:0.3});T3.F=arrow3(NEON.red);
    const gx=W*0.66,bt=H*0.2,bb=H*0.82;T3.bars=[NEON.red,NEON.green].map((c,i)=>{const b=cube(1,1,1,c,{glow:0.5,metal:0.4});const f=mesh(T3.box,mat(0x9fc6ff,{glass:1,opacity:0.12}),false);f.scale.set(44,bb-bt,44);f.position.set(gx+30+i*70,(bt+bb)/2,-10);return b;});T3.BB={gx,bt,bb};},
  update({S,P}){const g=S.g;if(!g)return;const key=P.mode;if(T3.k!==key){T3.k=key;[...T3.rp,...T3.pl].forEach(o=>o.parent&&o.parent.remove(o));const rm=mat(0xc89a52,{metal:0.2,rough:0.7}),n=[3,5,8][P.mode],np=[1,2,4][P.mode];T3.rp=[];for(let i=0;i<n;i++)T3.rp.push(rod(1.8,rm));T3.pl=[];for(let i=0;i<np;i++)T3.pl.push(pul3(g.r));}
    const n=g.n,r=g.r,cx=g.cx,top=g.top,py=g.py,ly=g.ly,hy=g.hy,bs=26+P.m*0.28,R=(i,a,b,c2,d)=>setRod(T3.rp[i],a,b,0,c2,d,0),spin=S.s/(r/g.pxm)*0.3;let lx=cx,hx;
    if(P.mode===0){lx=cx-r;R(0,cx-r,py,cx-r,ly-bs);hx=cx+r;R(1,hx,py,hx,hy);R(2,cx,top,cx,py);T3.pl[0].position.set(cx,py,0);T3.pl[0].rotation.z=-spin;}
    else if(P.mode===1){const my=ly-bs-r-6,fx=cx+r*2;R(0,cx-r,top,cx-r,my);R(1,cx+r,my,cx+r,py);hx=fx+r;R(2,hx,py,hx,hy);R(3,fx,top,fx,py);R(4,cx,my,cx,ly-bs);T3.pl[0].position.set(fx,py,0);T3.pl[1].position.set(cx,my,0);T3.pl[0].rotation.z=-spin;T3.pl[1].rotation.z=spin/2;}
    else{const my=ly-bs-r-14;[cx-36,cx-12,cx+12,cx+36].forEach((x,i)=>R(i,x,py,x,my));R(4,cx-36,top,cx-36,py);hx=cx+60;R(5,hx,py,hx,hy);R(6,cx+24,top,cx+24,py);R(7,cx,my,cx,ly-bs);
      [[cx,py],[cx+48,py],[cx-24,my],[cx+24,my]].forEach(([x,y],i)=>{T3.pl[i].position.set(x,y,0);T3.pl[i].rotation.z=(i<2?-1:1)*spin;});}
    T3.load.scale.set(bs,bs,bs);T3.load.position.set(lx,ly-bs/2,0);T3.hand.position.set(hx,hy+8,0);const F=P.m*9.8/n,kf=Math.min(1,90/(P.m*9.8));setArrow(T3.F,hx,hy+18,0,hx,hy+18+F*kf,0,3);
    const{gx,bt,bb}=T3.BB,E=P.m*9.8*1.6/n,vals=[F*S.s,P.m*9.8*S.s/n];T3.bars.forEach((b,i)=>{const h=Math.max(0.5,vals[i]/E*(bb-bt));b.scale.set(40,h,40);b.position.set(gx+30+i*70,bb-h/2,-10);});}};

SC3.tutash={build({W,H}){const g=S.g,gm=mat(0xbfe0ff,{glass:1,opacity:0.16}),tt=H*0.08,r=g.w/2;floorV(g.bot+6,W,H);
    [g.xL,g.xR].forEach(x=>{const c=mesh(new THREE.CylinderGeometry(r+2,r+2,g.bot-r-tt,32,1,true),gm,false);c.position.set(x,(tt+g.bot-r)/2,0);});const hb=mesh(new THREE.CylinderGeometry(r+2,r+2,g.xR-g.xL,32,1,true),gm,false);hb.rotation.z=Math.PI/2;hb.position.set((g.xL+g.xR)/2,g.bot-r,0);
    [g.xL,g.xR].forEach(x=>{const e=ball(r+2,0xbfe0ff,{glass:1,opacity:0.16});e.position.set(x,g.bot-r,0);});
    T3.k='';T3.lb=[0,1].map(()=>mesh(T3.cyl,LIQ(0x3a8fe0)));T3.hb=mesh(T3.cyl,LIQ(0x3a8fe0));T3.hb.rotation.z=Math.PI/2;T3.cn=[0,1].map(()=>ball(r,0x3a8fe0));T3.la=mesh(T3.cyl,LIQ(0xe0b84a));
    T3.ring=[0,1].map(()=>{const t=mesh(new THREE.TorusGeometry(r+6,1.6,8,40),mat(NEON.red,{glow:1.4}),false);t.rotation.x=Math.PI/2;return t;});
    const gx=W*0.7;T3.bars=[NEON.accent,NEON.warm].map(c=>cube(1,1,1,c,{glow:0.5,metal:0.4}));T3.BB={gx,gw:Math.min(54,(W-gx-30)/2),gb:H*0.8,gt:H*0.2};},
  update({S,P}){const g=S.g;if(!g)return;const r=g.w/2-1,Y=z=>g.base-z*g.cm,d=S.d*100,yi=Y(-d),yr=Y(d),ya=Y(-d+P.h2),r1=TT_B[P.b][0],r2=TT_A[P.a][0],key=P.b+'|'+P.a;
    if(T3.k!==key){T3.k=key;const bc=P.b?0xc9d1db:0x3a8fe0,mb=P.b?new THREE.MeshStandardMaterial({color:bc,metalness:1,roughness:0.12,envMapIntensity:1.2}):LIQ(bc);[...T3.lb,T3.hb,...T3.cn].forEach(o=>o.material=mb);T3.la.material=LIQ([0x5aa9e6,0xe0b84a,0xd9905a][P.a],0.8);}
    cylY(T3.lb[0],g.xL,yi,g.bot-g.w/2,r);cylY(T3.lb[1],g.xR,yr,g.bot-g.w/2,r);T3.hb.position.set((g.xL+g.xR)/2,g.bot-g.w/2,0);T3.hb.scale.set(r,g.xR-g.xL,r);T3.cn.forEach((c,i)=>c.position.set(i?g.xR:g.xL,g.bot-g.w/2,0));
    cylY(T3.la,g.xL,ya,yi,r);T3.la.visible=P.h2>0;T3.ring[0].position.set(g.xL,yi,0);T3.ring[1].position.set(g.xR,yi,0);
    const{gx,gw,gb,gt}=T3.BB,mx=Math.max(r2*0.3,1)*9.8,p1=r1*9.8*Math.max(0,2*S.d),p2=r2*9.8*P.h2/100;[p1,p2].forEach((v,i)=>{const h=Math.max(0.5,Math.min(1,v/mx)*(gb-gt));T3.bars[i].scale.set(gw,h,gw);T3.bars[i].position.set(gx+i*(gw+18)+gw/2,gb-h/2,0);});}};

SC3.atmosfera={cam:(W,H)=>camAt(W*0.42,H*0.5,W,H,15,2.6,1.2),build({W,H}){const g=S.g,Y=h=>g.bot-h/g.hm*(g.bot-g.top);floorV(g.bot,W,H);
    [[0.55,8.85,0.3],[0.3,4,0.2],[0.75,3,0.22],[0.15,2.2,0.16]].forEach(([x,h,rw],i)=>{const ht=g.bot-Y(h),m=mesh(new THREE.ConeGeometry(g.aw*rw,ht,7),mat(0x4a5570,{rough:0.85,metal:0.1}));m.rotation.x=Math.PI;m.position.set(x*g.aw,g.bot-ht/2,-30-i*12);
      if(h>5){const sn=mesh(new THREE.ConeGeometry(g.aw*rw*0.28,ht*0.28,7),mat(0xeef3ff,{rough:0.6,glow:0.15}));sn.rotation.x=Math.PI;sn.position.set(x*g.aw,Y(h)+ht*0.14,-30-i*12);}});
    T3.pz=S.pts.map(()=>(Math.random()-0.5)*160);T3.pt=inst(S.pts.length,T3.lo,new THREE.MeshBasicMaterial({color:0x9fc6ff,transparent:true,opacity:0.75}));
    const bl=new THREE.Group(),env=new THREE.Mesh(T3.sph,mat(NEON.warm,{metal:0.2,rough:0.4,glow:0.2}));env.scale.set(15,19,15);const bk=new THREE.Mesh(T3.box,mat(0x6b4a2a,{rough:0.8}));bk.scale.set(10,7,10);bk.position.y=31;bl.add(env,bk);[-5,5].forEach(x=>{const r=new THREE.Mesh(T3.cyl,mat(0x2a2a2a));r.scale.set(0.6,12,0.6);r.position.set(x,23,0);bl.add(r);});bl.traverse(o=>{if(o.isMesh)o.castShadow=true;});T3.root.add(bl);T3.bl=bl;
    const gx=g.aw+44,gw=W*0.3;T3.z=chart3(gx,gx+gw,g.top+8,g.bot);const cv=line3(NEON.accent,90),pts=[];for(let i=0;i<=82;i++){const h=i*0.2;pts.push([gx+101.325*Math.exp(-h/8.4)/105*gw,Y(h),T3.z]);}setLine(cv,pts);T3.dot=ball(7,NEON.red,{glow:1.6});T3.CG={gx,gw};
    const tx=W-46,tb=g.bot-24,mmS=(tb-g.top-30)/800,tt=tb-800*mmS;const tube=mesh(new THREE.CylinderGeometry(9,9,tb-tt,24,1,true),mat(0xbfe0ff,{glass:1,opacity:0.18}),false);tube.position.set(tx,(tt+tb)/2,0);
    const dish=mesh(new THREE.CylinderGeometry(36,30,16,32),mat(0x2a3246,{metal:0.7,rough:0.3}));dish.position.set(tx,tb+6,0);T3.hg=mesh(T3.cyl,new THREE.MeshStandardMaterial({color:0xc9d1db,metalness:1,roughness:0.1,envMapIntensity:1.3}));T3.BR={tx,tb,mmS};},
  update({S,P}){const g=S.g;if(!g)return;const Y=h=>g.bot-h/g.hm*(g.bot-g.top);S.pts.forEach((p,i)=>setI(T3.pt,i,p.x*g.aw,Y(Math.min(p.y,g.hm)),T3.pz[i],p.y<g.hm?1.8:0));T3.pt.count=S.pts.length;T3.pt.instanceMatrix.needsUpdate=true;
    T3.bl.position.set(g.aw*0.82,Y(S.h)-14,20);const p=101.325*Math.exp(-S.h/8.4),mm=760*p/101.325;T3.dot.position.set(T3.CG.gx+p/105*T3.CG.gw,Y(S.h),T3.z+4);const{tx,tb,mmS}=T3.BR;cylY(T3.hg,tx,tb-mm*mmS,tb,7);}};

/* --- Saqlanish qonunlari --- */
SC3.billiard={floor:1,cam:[0,11.5,8.2,0,0,0.4],build({W,H}){const g=S.g,sc=g.sc,tw=BL.Lx*sc,th=BL.Ly*sc,cx=g.ox+tw/2,cy=g.oy+th/2;
    const wood=cube(tw+40,th+40,26,0x6b3d1e,{rough:0.55,metal:0.15});wood.position.set(cx,cy,-14);const felt=cube(tw,th,4,0x1f6b45,{rough:0.95,metal:0});felt.position.set(cx,cy,0);
    [[cx,g.oy-6,tw,12],[cx,g.oy+th+6,tw,12],[g.ox-6,cy,12,th],[g.ox+tw+6,cy,12,th]].forEach(([x,y,w,h])=>{const c=cube(w,h,12,0x17573a,{rough:0.8});c.position.set(x,y,6);});
    
    const cols=[0xf2c94c,0x3d6fd6,0xd64545,0x7a3fbf,0xf08a2a,0x2a9d5c];T3.bs=S.b.map((o,i)=>ball(BL.r*sc,o.cue?0xf5f5f0:cols[(o.n-1)%6],{metal:0.1,rough:0.12,env:1.2}));T3.va=S.b.map(()=>arrow3(0xffffff));
    T3.cue=rod(3.2,mat(0xc8a26a,{rough:0.5}));T3.fl=[];},
  update({S}){const g=S.g;if(!g)return;const sc=g.sc,X=x=>g.ox+x*sc,Y=y=>g.oy+y*sc,r=BL.r*sc;S.b.forEach((o,i)=>{const b=T3.bs[i];if(!b)return;b.position.set(X(o.x),Y(o.y),r+2);b.rotation.x+=o.vy*0.3;b.rotation.y+=o.vx*0.3;const sp=Math.hypot(o.vx,o.vy);T3.va[i].visible=sp>0.05;if(sp>0.05)setArrow(T3.va[i],X(o.x),Y(o.y),2*r+6,X(o.x+o.vx*0.12),Y(o.y+o.vy*0.12),2*r+6,1.6);});
    if(S.aim){const q=S.b[0],ax=X(q.x),ay=Y(q.y),dx=S.aim.x-ax,dy=S.aim.y-ay,L=Math.hypot(dx,dy)||1;T3.cue.visible=true;setRod(T3.cue,ax+dx/L*(r+6+L*0.3),ay+dy/L*(r+6+L*0.3),r+8,ax+dx/L*(r+260),ay+dy/L*(r+260),r+30);}else T3.cue.visible=false;
    sync('fl',S.flash,()=>ball(1,0xfff0b4,{glow:3,opacity:0.6}),(o,f)=>{o.position.set(X(f.x),Y(f.y),r+2);o.scale.setScalar(4+(0.3-f.t)*50);});}};

/* --- Tebranishlar --- */
SC3.sonuvchi={build({W,H}){const g=S.g;const wall=cube(16,100,90,NEON.steel,{metal:0.8,rough:0.3});wall.position.set(g.wx-8,g.cy,0);const rail=cube(W-20-g.wx,5,70,0x2a3246,{metal:0.7});rail.position.set((g.wx+W-20)/2,g.cy+28,0);
    const tank=mesh(T3.box,mat(0xbfe0ff,{glass:1,opacity:0.12}),false);tank.scale.set(W-20-g.wx,66,80);tank.position.set((g.wx+W-20)/2,g.cy-7,0);const wat=mesh(T3.box,LIQ(0x2a7fd0,0.22),false);wat.scale.set(W-22-g.wx,60,76);wat.position.set((g.wx+W-20)/2,g.cy-5,0);
    T3.sp=spring3(0xd6deef);T3.blk=cube(52,48,48,NEON.accent,{metal:0.5,rough:0.25});T3.fq=arrow3(NEON.red);
    const gx=40,gr=W-16,gt=H*0.5,gb=H-24;T3.z=chart3(gx,gr,gt,gb,-40);T3.GR={gx,gr,gt,gb};T3.cv=line3(NEON.accent,1000);T3.env=[0,1].map(()=>line3(NEON.red,141,{opacity:0.6}));T3.dot=ball(5,NEON.accent,{glow:1.6});},
  update({S,P}){const g=S.g;if(!g)return;const bx=g.cx+S.x*g.sc;setSpring(T3.sp,g.wx,g.cy,0,bx-26,g.cy,0,12);T3.blk.position.set(bx,g.cy,0);
    const fd=-P.b*S.v;setArrow(T3.fq,bx,g.cy-34,26,bx+fd*30,g.cy-34,26,2.6);const{gx,gr,gt,gb}=T3.GR,gm=(gt+gb)/2,amp=(gb-gt)/2*0.92,T=14,X=t=>gx+t/T*(gr-gx),Yv=x=>gm-x/0.2*amp,beta=P.b/(2*P.m);
    setLine(T3.cv,S.tr.slice(-1000).map(([t,x])=>[X(t),Yv(x),T3.z]));[1,-1].forEach((sg,i)=>{const pts=[];for(let k=0;k<=140;k++){const t=k/10;pts.push([X(t),Yv(sg*0.2*Math.exp(-beta*t)),T3.z]);}setLine(T3.env[i],pts);});T3.dot.position.set(X(S.t),Yv(S.x),T3.z+3);}};

SC3.tepki={cam:(W,H)=>camAt(W*0.5,H*0.48,W,H,15,2.4,1.6),build({W,H}){const g=S.g;T3.fk=[[H*0.15,NEON.accent],[H*0.36,NEON.warm]].map(([cy,col])=>{const fg=new THREE.Group(),m=mat(0xcfd6e6,{metal:1,rough:0.15});const hd=new THREE.Mesh(T3.cyl,m);hd.rotation.z=Math.PI/2;hd.scale.set(3,30,3);hd.position.x=-32;const bs=new THREE.Mesh(T3.box,m);bs.scale.set(6,26,6);bs.position.x=-14;
      const pr=[-1,1].map(s=>{const p=new THREE.Mesh(T3.box,mat(col,{metal:0.9,rough:0.2,glow:0.25}));p.scale.set(46,4,5);p.position.set(12,s*11,0);fg.add(p);return p;});fg.add(hd,bs);fg.position.set(56,cy,0);fg.userData.pr=pr;T3.root.add(fg);return fg;});
    T3.cv=[NEON.accent,NEON.warm,NEON.ink].map(c=>line3(c,1601));T3.env=[0,1].map(()=>line3(NEON.red,201,{opacity:0.7}));const sp=new THREE.Group(),cone=new THREE.Mesh(new THREE.CylinderGeometry(26,10,22,32,1,true),mat(0x2a3350,{metal:0.4,rough:0.5,side:1}));cone.rotation.z=-Math.PI/2;sp.add(cone);sp.position.set(56,H*0.7,0);T3.root.add(sp);
    T3.rg=[0,1,2].map(i=>{const t=mesh(new THREE.TorusGeometry(30+i*16,1.6,8,48,Math.PI*0.7),mat(NEON.accent,{glow:1.4,opacity:0.7}),false);t.rotation.z=-Math.PI*0.35;t.position.set(64,H*0.7,0);return t;});},
  update({S,P,W,H}){const gx=110,gr=W-16,T=2,X=t=>gx+(t-(S.t-T))/T*(gr-gx),A=Math.min(22,H*0.07),sy=H*0.7,N=Math.min(1600,(gr-gx)*2),f=[P.f1,P.f2],ys=[H*0.15,H*0.36];
    T3.fk.forEach((fk,i)=>{const d=Math.sin(TAU*f[i]*S.t)*2.5;fk.userData.pr[0].position.y=-11-d;fk.userData.pr[1].position.y=11+d;});
    [0,1,2].forEach(k=>{const pts=[];for(let i=0;i<=N;i++){const t=S.t-T+T*i/N,y=k<2?ys[k]-Math.sin(TAU*f[k]*t)*A:sy-(Math.sin(TAU*f[0]*t)+Math.sin(TAU*f[1]*t))*A;pts.push([X(t),y,0]);}setLine(T3.cv[k],pts);});
    const df=Math.abs(P.f1-P.f2);[1,-1].forEach((sg,i)=>{const pts=[];for(let j=0;j<=200;j++){const t=S.t-T+T*j/200;pts.push([X(t),sy-sg*2*A*Math.abs(Math.cos(Math.PI*df*t)),2]);}setLine(T3.env[i],pts);});
    const amp=Math.abs(Math.cos(Math.PI*df*S.t));T3.rg.forEach((r,i)=>{r.scale.setScalar(0.6+0.5*amp+i*0.05);r.material.opacity=0.15+0.8*amp*(1-i*0.25);});}};

SC3.lissaju={cam:(W,H)=>camAt(W*0.48,H*0.5,W,H,14,2.2,1.4),build({W,H}){const g=S.g,R=g.R;const bez=cube(2.7*R+60,2.6*R+40,70,0x1b2233,{metal:0.6,rough:0.35});bez.position.set(g.cx,g.cy,-40);const scr=cube(2.5*R,2.4*R,2,0x04140c,{rough:0.4,metal:0.2,glow:0.1});scr.position.set(g.cx,g.cy,-4);
    for(let i=-4;i<=4;i++){const a=cube(0.8,2.4*R,0.5,0x1f6b45,{glow:0.4,opacity:0.5});a.position.set(g.cx+i*R*0.25,g.cy,-2.5);const b=cube(2.5*R,0.8,0.5,0x1f6b45,{glow:0.4,opacity:0.5});b.position.set(g.cx,g.cy+i*R*0.25,-2.5);}
    [0,1,2].forEach(i=>{const k=mesh(T3.cyl,mat(0x9aa6c0,{metal:0.9,rough:0.25}));k.rotation.x=Math.PI/2;k.scale.set(12,14,12);k.position.set(g.cx+1.35*R+20,g.cy-R*0.6+i*R*0.6,0);});
    T3.full=line3(0x3fe0a0,801,{opacity:0.25});T3.tr=line3(0x7dffc4,700);T3.dot=ball(6,0xb8ffe0,{glow:3});T3.k='';},
  update({S,P}){const g=S.g;if(!g)return;const[a,b]=LS_R[P.r],R=g.R,key=[P.r,P.ph,P.B].join();if(key!==T3.k){T3.k=key;const pts=[];for(let i=0;i<=800;i++){const t=i/800*TAU;pts.push([g.cx+Math.sin(a*t+P.ph*D2R)*R,g.cy-P.B*Math.sin(b*t)*R,-1]);}setLine(T3.full,pts);}
    setLine(T3.tr,S.tr.map(([x,y])=>[g.cx+x*R,g.cy-y*R,0]));T3.dot.position.set(g.cx+Math.sin(a*S.t+P.ph*D2R)*R,g.cy-P.B*Math.sin(b*S.t)*R,1);}};

/* --- Molekulyar fizika --- */
SC3.sirt={build({W,H}){const g=S.g,bx=W*0.08,bw=W*0.58,bb=H-14,gm=mat(0xbfe0ff,{glass:1,opacity:0.14});const bas=mesh(T3.box,gm,false);bas.scale.set(bw,bb-g.surf+40,90);bas.position.set(bx+bw/2,(g.surf-40+bb)/2,0);
    T3.liq=mesh(T3.box,LIQ(0x3a8fe0,0.6),false);T3.liq.scale.set(bw-4,bb-g.surf,86);T3.liq.position.set(bx+bw/2,(g.surf+bb)/2,0);floorV(bb+1,W,H);T3.k='';T3.tb=[];T3.col=[];T3.men=[];T3.BX={bx,bw,bb};},
  update({S,P,W,H}){const g=S.g;if(!g)return;const L=SR_L[P.L],{bx,bw,bb}=T3.BX,rs=[P.r,P.r*2,P.r*4],hh=r=>2*L.s*Math.cos(L.th*D2R)/(L.r*9.8*r*1e-3)*1000,key=P.L+'|'+P.r+'|'+g.surf;
    if(key!==T3.k){T3.k=key;[...T3.tb,...T3.col,...T3.men].forEach(o=>o.parent&&o.parent.remove(o));const lm=P.L===2?new THREE.MeshStandardMaterial({color:0xc9d1db,metalness:1,roughness:0.1,envMapIntensity:1.3}):LIQ(P.L?0x9ad1c8:0x3a8fe0,0.75);T3.liq.material=lm;T3.liq.position.y=(g.surf+bb)/2;T3.liq.scale.y=bb-g.surf;
      T3.tb=[];T3.col=[];T3.men=[];rs.forEach((r,i)=>{const x=bx+bw*(0.22+i*0.28),w=Math.max(6,Math.min(46,r*16)),t0=H*0.06;const t=mesh(new THREE.CylinderGeometry(w/2+1.5,w/2+1.5,bb-6-t0,24,1,true),mat(0xbfe0ff,{glass:1,opacity:0.22}),false);t.position.set(x,(t0+bb-6)/2,0);T3.tb.push(t);
        const c=mesh(T3.cyl,lm,false);c.userData={x,w};T3.col.push(c);const m=mesh(new THREE.SphereGeometry(1,24,12,0,TAU,0,Math.PI/2),L.th<90?mat(0x0b0f1a,{rough:0.6}):lm,false);T3.men.push(m);});}
    rs.forEach((r,i)=>{const{x,w}=T3.col[i].userData,h=hh(r)*S.f,ly=g.surf-h*g.sc;cylY(T3.col[i],x,ly,bb-6,w/2);const m=T3.men[i];m.position.set(x,ly,0);m.scale.set(w/2,(L.th<90?1:-1)*w*0.45,w/2);});}};

SC3.kengayish={build({W,H}){const g=S.g;const cl=cube(24,72,60,NEON.steel,{metal:0.85});cl.position.set(g.rx-12,g.ry,0);T3.rm=new THREE.MeshStandardMaterial({color:0xd08a4a,metalness:0.9,roughness:0.25,emissive:0xff4a10,emissiveIntensity:0,envMapIntensity:1});T3.rod=mesh(T3.box,T3.rm);
    T3.fl=[];for(let i=0;i<7;i++){const f=mesh(new THREE.ConeGeometry(7,26,12),new THREE.MeshBasicMaterial({color:0xff8a2a,transparent:true,opacity:0.8}),false);f.rotation.x=Math.PI;T3.fl.push(f);}
    T3.dl=dial3(34);T3.pin=rod(2,mat(0xcfd6e6,{metal:1}));const bl=Math.min(W*0.5,300),by=H*0.62;const cb=cube(20,80,60,NEON.steel,{metal:0.85});cb.position.set(g.rx-10,by,0);T3.la=[0,1].map(i=>{const m=mat(i?0x8a94a6:0xc9d1db,{metal:0.95,rough:0.2});return Array.from({length:40},()=>rod(3.6,m));});T3.BM={bl,by};
    const tx=W-50,tt=H*0.12,tb=H*0.86;const tu=mesh(new THREE.CylinderGeometry(9,9,tb-tt,20,1,true),mat(0xbfe0ff,{glass:1,opacity:0.2}),false);tu.position.set(tx,(tt+tb)/2,0);const bu=ball(14,NEON.red,{glow:0.8});bu.position.set(tx,tb+8,0);T3.th=mesh(T3.cyl,mat(NEON.red,{glow:0.9}));T3.TH={tx,tt,tb};T3.k='';},
  update({S,P,t:tt}){const g=S.g;if(!g)return;const M=KG_M[P.mat],dL=M.a*P.L0*S.T,ext=dL/(23e-6*P.L0*400)*55,hot=clamp(S.T/400,-0.25,1);if(T3.k!==P.mat){T3.k=P.mat;T3.rm.color.setHex([0x8a94a6,0xd08a4a,0xc9d1db][P.mat]);}
    T3.rod.scale.set(g.rw+ext,24,24);T3.rod.position.set(g.rx+(g.rw+ext)/2,g.ry,0);T3.rm.emissiveIntensity=Math.max(0,hot)*0.9;T3.rm.emissive.setHex(hot<0?0x2050ff:0xff4a10);if(hot<0)T3.rm.emissiveIntensity=-hot*1.2;
    T3.fl.forEach((f,i)=>{f.visible=hot>0.02;const s=0.6+hot+0.25*Math.sin((tt||0)*13+i*2);f.scale.set(1,s,1);f.position.set(g.rx+g.rw*(0.15+i*0.12),g.ry+30+13*s,0);});
    const dx=g.rx+g.rw+70,dy=g.ry;T3.dl.position.set(dx,dy,0);T3.dl.userData.hd.rotation.z=dL*1000/10*TAU;setRod(T3.pin,g.rx+g.rw+ext,g.ry,0,dx-34,g.ry,0);
    const{bl,by}=T3.BM,t=0.001,kap=1.5*11e-6*S.T/t,Lb=0.1,pxm=bl/Lb,pts=[];for(let i=0;i<=40;i++){const s=i/40*Lb;let x,y;if(Math.abs(kap)<1e-6){x=s;y=0;}else{const R=1/kap;x=R*Math.sin(s/R);y=R*(1-Math.cos(s/R));}pts.push([g.rx+x*pxm,by-y*pxm]);}
    [-4,4].forEach((o,l)=>{for(let i=0;i<40;i++){const a=pts[i],b=pts[i+1],dx2=b[0]-a[0],dy2=b[1]-a[1],L=Math.hypot(dx2,dy2)||1,nx=dy2/L,ny=-dx2/L;setRod(T3.la[l][i],a[0]+nx*o,a[1]+ny*o,0,b[0]+nx*o,b[1]+ny*o,0,3.6);}});
    const{tx,tt:t0,tb}=T3.TH,f=clamp((S.T+100)/500,0,1);cylY(T3.th,tx,tb-(tb-t0-10)*f,tb,4.5);}};

/* --- Termodinamika --- */
SC3.birinchiqonun={cam:(W,H)=>camAt(W*0.45,H*0.5,W,H,15,2.4,1.6),build({W,H}){const g=S.g,ch=H*0.62,cw=g.cw;const gl=mesh(new THREE.CylinderGeometry(cw/2,cw/2,ch,40,1,true),mat(0xbfe0ff,{glass:1,opacity:0.16}),false);gl.position.set(g.cx,g.cb-ch/2,0);
    const base=mesh(new THREE.CylinderGeometry(cw/2+4,cw/2+4,8,40),mat(NEON.steel,{metal:0.9}));base.position.set(g.cx,g.cb+4,0);floorV(g.cb+30,W,H);
    T3.ps=mesh(new THREE.CylinderGeometry(cw/2-1,cw/2-1,12,40),mat(0x9aa6c0,{metal:0.9,rough:0.2}));T3.pr=rod(3,mat(0xcfd6e6,{metal:1}));T3.wt=cube(44,20,44,NEON.accent,{metal:0.5});T3.stop=[-1,1].map(s=>cube(8,16,16,0x2a3246,{metal:0.7}));
    T3.gas=inst(70,T3.lo,new THREE.MeshBasicMaterial({color:0x5b8cff}));T3.gp=Array.from({length:70},()=>({x:Math.random()*2-1,y:Math.random(),z:Math.random()*2-1,vx:Math.random()*2-1,vy:Math.random()*2-1,vz:Math.random()*2-1}));
    T3.fl=[];for(let i=0;i<5;i++){const f=mesh(new THREE.ConeGeometry(6,22,12),new THREE.MeshBasicMaterial({color:0xff8a2a,transparent:true,opacity:0.85}),false);f.rotation.x=Math.PI;T3.fl.push(f);}
    const gx=W*0.36,gw=W*0.32,gt=H*0.12,gb=H*0.78;T3.z=chart3(gx,gx+gw,gt,gb);T3.cv=line3(NEON.accent,61);T3.dot=ball(6,NEON.red,{glow:1.6});T3.GR={gx,gw,gt,gb};
    const bx=W*0.74,bw=Math.min(40,(W-bx-20)/3-8);T3.bars=[NEON.red,NEON.warm,NEON.accent].map(c=>cube(1,1,1,c,{glow:0.5,metal:0.4}));T3.BB={bx,bw,bt:gt,bb:gb};},
  update({S,P,dt,t:tt}){const g=S.g;if(!g)return;const sim=SIMS.find(s=>s.id==='birinchiqonun'),st=sim.state(P,S.q),V0=0.0249,cw=g.cw,py=g.py;
    T3.ps.position.set(g.cx,py-6,0);setRod(T3.pr,g.cx,py-12,0,g.cx,py-40,0);T3.wt.position.set(g.cx,py-50,0);T3.stop.forEach((o,i)=>{o.visible=P.pr===0;o.position.set(g.cx+(i?1:-1)*(cw/2+4),py,0);});
    const sp=Math.sqrt(st.T/300)*0.9*(dt||0.016),hgt=g.cb-py,rr=cw/2-5;T3.gp.forEach((p,i)=>{p.x+=p.vx*sp;p.y+=p.vy*sp*0.6;p.z+=p.vz*sp;if(Math.hypot(p.x,p.z)>1){p.vx=-p.vx;p.vz=-p.vz;p.x*=0.98;p.z*=0.98;}if(p.y<0||p.y>1){p.vy=-p.vy;p.y=clamp(p.y,0,1);}setI(T3.gas,i,g.cx+p.x*rr,g.cb-4-p.y*(hgt-8),p.z*rr,3.2);});T3.gas.count=70;T3.gas.instanceMatrix.needsUpdate=true;T3.gas.material.color.copy(heatCol((st.T-300)/500));
    T3.fl.forEach((f,i)=>{f.visible=S.q<1;const s=0.8+0.3*Math.sin((tt||0)*12+i*2);f.scale.set(1,s,1);f.position.set(g.cx-cw/2+cw*(0.1+i*0.2),g.cb+18+11*s,0);});
    const{gx,gw,gt,gb}=T3.GR,Vm=Math.max(V0*1.6,sim.state(P,1).V*1.1),pm=8.314*800/V0,X=V=>gx+(V-V0*0.8)/(Vm-V0*0.8)*gw,Y=p=>gb-p/pm*(gb-gt),pts=[];for(let i=0;i<=60;i++){const s2=sim.state(P,S.q*i/60);pts.push([X(s2.V),Y(s2.p),T3.z]);}setLine(T3.cv,pts);T3.dot.position.set(X(st.V),Y(st.p),T3.z+4);
    const{bx,bw,bt,bb}=T3.BB;[P.Q*S.q,st.dU,st.A].forEach((v,i)=>{const h=Math.max(0.5,v/P.Q*(bb-bt));T3.bars[i].scale.set(bw,h,bw);T3.bars[i].position.set(bx+i*(bw+12)+bw/2,bb-h/2,0);});}};

/* --- Elektrostatika --- */
SC3.potensial={floor:1,cam:[0,9.5,10.5,0,0,0.8],build({W,H}){floorH(W,H,-H*0.3);const nx=120,ny=Math.round(120*H/W),geo=new THREE.PlaneGeometry(W*1.04,H*1.04,nx,ny);geo.setAttribute('color',new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count*3),3));
    T3.sf=mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,metalness:0,roughness:0.95,side:THREE.DoubleSide,envMapIntensity:0.05}),false);T3.sf.position.set(W/2,H/2,0);T3.sf.receiveShadow=true;
    T3.wf=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0x9fc6ff,wireframe:true,transparent:true,opacity:0.02}));T3.wf.position.copy(T3.sf.position);T3.root.add(T3.wf);
    T3.q=[0,1].map(()=>ball(12,NEON.red,{glow:0.9,metal:0.3}));T3.tq=ball(9,NEON.warm,{glow:0.8,metal:0.3});T3.st=mesh(new THREE.TorusGeometry(9,1.6,8,30),mat(NEON.ink,{glow:1}),false);T3.F=arrow3(NEON.green);T3.k='';T3.Hs=Math.min(W,H)*0.32;},
  update({S,P,W,H}){const g=S.g;if(!g)return;const sim=SIMS.find(s=>s.id==='potensial'),Hs=T3.Hs,hz=v=>Math.tanh(v/1500)*Hs,wx=px=>(px-g.cx)/g.sc,wy=py=>(g.cy-py)/g.sc,key=[P.Q1,P.Q2,S.c.flat().join(),W,H].join();
    if(key!==T3.k){T3.k=key;const pa=T3.sf.geometry.attributes.position,ca=T3.sf.geometry.attributes.color,c=new THREE.Color();for(let i=0;i<pa.count;i++){const px=W/2+pa.getX(i),py=H/2+pa.getY(i),v=sim.phi(S,P,wx(px),wy(py)),t=Math.tanh(v/1500);pa.setZ(i,t*Hs);c.setHSL(t>0?0.02+0.06*(1-t):0.6-0.04*(1+t),0.55+0.45*Math.abs(t),0.012+0.2*Math.abs(t));ca.setXYZ(i,c.r,c.g,c.b);}
      pa.needsUpdate=true;ca.needsUpdate=true;T3.sf.geometry.computeVertexNormals();}
    const PX=([x,y])=>[g.cx+x*g.sc,g.cy-y*g.sc];[[P.Q1,S.c[0]],[P.Q2,S.c[1]]].forEach(([q,p],i)=>{const[x,y]=PX(p),b=T3.q[i];b.position.set(x,y,hz(sim.phi(S,P,p[0]+0.03,p[1]))+(q>=0?14:-14));b.scale.setScalar(8+Math.abs(q)*1.2);b.material=mat(q>0?NEON.red:q<0?NEON.accent:NEON.steel,{glow:0.9,metal:0.3});});
    const[tx,ty]=PX(S.tq),ph=sim.phi(S,P,...S.tq);T3.tq.position.set(tx,ty,hz(ph)+10);const[sx,sy]=PX(S.start);T3.st.position.set(sx,sy,hz(sim.phi(S,P,...S.start))+2);
    const k=8.99e9;let Ex=0,Ey=0;[[P.Q1,S.c[0]],[P.Q2,S.c[1]]].forEach(([q,[x,y]])=>{const dx=S.tq[0]-x,dy=S.tq[1]-y,r=Math.max(0.03,Math.hypot(dx,dy));Ex+=k*q*1e-9*dx/r**3;Ey+=k*q*1e-9*dy/r**3;});const Em=Math.hypot(Ex,Ey)||1,fl=Math.min(60,10+Math.log10(1+Em)*9)*Math.sign(P.q||1);
    T3.F.visible=!!P.q;if(P.q)setArrow(T3.F,tx,ty,hz(ph)+24,tx+Ex/Em*fl,ty-Ey/Em*fl,hz(ph)+24,2.6);}};

/* --- O‘zgarmas tok --- */
SC3.elektroliz={cam:(W,H)=>camAt(W*0.42,H*0.5,W,H,15,2.6,2),build({W,H}){const g=S.g,ew=14,et=g.bt-30,eb=g.bb-30;floorV(g.bb+2,W,H);const tk=mesh(T3.box,mat(0xbfe0ff,{glass:1,opacity:0.14}),false);tk.scale.set(g.bw,g.bb-g.bt+10,130);tk.position.set(g.bx+g.bw/2,(g.bt-10+g.bb)/2,0);
    T3.sol=mesh(T3.box,LIQ(0x3a8fe0,0.28),false);T3.sol.scale.set(g.bw-4,g.bb-g.bt-12,126);T3.sol.position.set(g.bx+g.bw/2,(g.bt+10+g.bb)/2,0);
    const ca=cube(ew,eb-et,90,0x6b7486,{metal:0.9,rough:0.3});ca.position.set(g.lx,(et+eb)/2,0);const an=cube(ew,eb-et,90,0x4a5160,{metal:0.8,rough:0.4});an.position.set(g.rx,(et+eb)/2,0);
    T3.dep=new THREE.MeshStandardMaterial({color:0xd08a4a,metalness:1,roughness:0.3,envMapIntensity:1.1});T3.dp=[-1,1].map(()=>mesh(T3.box,T3.dep));
    const wy=H*0.07,cm=mat(0xd88a3a,{metal:1,rough:0.25});[[g.lx,et,g.lx,wy],[g.rx,et,g.rx,wy],[g.lx,wy,g.bx+g.bw*0.42,wy],[g.bx+g.bw*0.47,wy,g.rx,wy]].forEach(([a,b,c2,d])=>{const r=rod(2.4,cm);setRod(r,a,b,0,c2,d,0);});
    const bat=mesh(T3.cyl,mat(0x1b2233,{metal:0.6}));bat.rotation.z=Math.PI/2;bat.scale.set(14,g.bw*0.05+4,14);bat.position.set(g.bx+g.bw*0.445,wy,0);const tp=mesh(T3.cyl,mat(NEON.red,{glow:0.6}));tp.rotation.z=Math.PI/2;tp.scale.set(5,4,5);tp.position.set(g.bx+g.bw*0.47+2,wy,0);
    T3.ci=inst(60,T3.lo,new THREE.MeshBasicMaterial({color:0xd08a4a}));T3.ai=inst(60,T3.lo,new THREE.MeshBasicMaterial({color:0x8a6cff}));T3.iz=Array.from({length:60},()=>(Math.random()-0.5)*100);T3.el=inst(12,T3.lo,new THREE.MeshBasicMaterial({color:0x7fb0ff}));T3.k='';T3.wy=wy;},
  update({S,P,t}){const g=S.g;if(!g)return;const M=EZ_M[P.mt],ew=14,et=g.bt-30,eb=g.bb-30,X=f=>g.lx+ew/2+6+f*(g.rx-g.lx-ew-12),Yf=f=>g.bt+20+f*(eb-g.bt-30);if(T3.k!==P.mt){T3.k=P.mt;T3.dep.color.setHex(parseInt(M.col.slice(1),16));T3.ci.material.color.setHex(parseInt(M.col.slice(1),16));T3.sol.material.color.setHex(parseInt(M.sol.slice(1),16));}
    let a=0,b=0;S.io.forEach((o,i)=>{const z=T3.iz[i%60];if(o.p)setI(T3.ci,a++,X(o.x),Yf(o.y),z,6);else setI(T3.ai,b++,X(o.x),Yf(o.y),z,7);});T3.ci.count=a;T3.ai.count=b;T3.ci.instanceMatrix.needsUpdate=T3.ai.instanceMatrix.needsUpdate=true;
    const th=Math.min(10,S.m*3);T3.dp.forEach((d,i)=>{d.visible=th>0.2;d.scale.set(Math.max(0.1,th),eb-et-30,92);d.position.set(g.lx+(i?1:-1)*(ew/2+th/2),(et+30+eb)/2,0);});
    const e=((t||0)*P.I*0.4)%1,wy=T3.wy,x1=g.bx+g.bw*0.58,x2=g.bx+g.bw*0.42;for(let i=0;i<6;i++){const f=(i/6+e)%1;setI(T3.el,i,g.rx-(g.rx-x1)*f,wy,4,3.2);setI(T3.el,6+i,x2-(x2-g.lx)*f,wy,4,3.2);}T3.el.count=12;T3.el.instanceMatrix.needsUpdate=true;}};

/* --- Magnetizm --- */
SC3.tokmaydon={floor:1,cam:[0,9.8,9.6,0,0,0.8],build({W,H}){floorH(W,H);const g=S.g;T3.wr=[0,1].map(()=>rod(7,mat(0xd88a3a,{metal:1,rough:0.2})));T3.cur=[0,1].map(()=>inst(14,T3.lo,new THREE.MeshBasicMaterial({color:0xffe08a})));
    const n=(S.nd||[]).length||200;T3.nr=inst(n,T3.box,mat(NEON.red,{glow:0.6,metal:0.3}));T3.ng=inst(n,T3.box,mat(0xc8d0e0,{metal:0.6}));T3.hub=inst(n,T3.cyl,mat(0x2a3246,{metal:0.8}));
    T3.rings=[0,1].map(()=>[0.02,0.04,0.07,0.11,0.16].map(r=>{const t=mesh(new THREE.TorusGeometry(r*g.sc,1.3,6,96),new THREE.MeshBasicMaterial({color:0x5b8cff,transparent:true,opacity:0.5}),false);return t;}));
    T3.fd=[0,1].map(()=>inst(40,T3.lo,new THREE.MeshBasicMaterial({color:0x9fc6ff})));T3.pb=ball(7,NEON.violet,{glow:1.4});T3.B=arrow3(NEON.violet);T3.F=[0,1].map(()=>arrow3(NEON.green));},
  update({S,P,t,H}){const g=S.g;if(!g||!S.nd)return;const sim=SIMS.find(s=>s.id==='tokmaydon'),X=x=>g.cx+x*g.sc,Y=y=>g.cy-y*g.sc,ws=[[-P.d/200,P.I1],[P.d/200,P.I2]],top=H*0.7,tt=t||0;
    ws.forEach(([wx,I],i)=>{const on=!!I;T3.wr[i].visible=on;T3.cur[i].visible=on;T3.fd[i].visible=on;T3.rings[i].forEach(r=>r.visible=on);if(!on)return;const x=X(wx),y=Y(0);setRod(T3.wr[i],x,y,-20,x,y,top);
      for(let k=0;k<14;k++){const z=((k/14+tt*0.25*Math.sign(I)*Math.min(1,Math.abs(I)/10))%1+1)%1*top;setI(T3.cur[i],k,x,y,z,3);}T3.cur[i].count=14;T3.cur[i].instanceMatrix.needsUpdate=true;
      T3.rings[i].forEach((r,j)=>{r.position.set(x,y,4);r.material.color.setHex(I>0?0x5b8cff:0xffb347);r.material.opacity=Math.min(0.7,0.25+Math.abs(I)/40);});
      let n=0;[0.03,0.06,0.1,0.15].forEach((r,j)=>{for(let k=0;k<10;k++){const th=k/10*TAU+tt*Math.sign(I)*0.006/r*Math.min(1,Math.abs(I)/10);setI(T3.fd[i],n++,X(wx+r*Math.cos(th)),Y(r*Math.sin(th)),5,2.4);}});T3.fd[i].count=n;T3.fd[i].instanceMatrix.needsUpdate=true;});
    let n=0;S.nd.forEach(o=>{if(ws.some(([wx,I])=>I&&Math.hypot(o.x-wx,o.y)<0.018))return;const x=X(o.x),y=Y(o.y),a=-o.a,L=9,c=Math.cos(a),s=Math.sin(a);setIR(T3.nr,n,x+c*L/2,y+s*L/2,6,a,L,3.2,2);setIR(T3.ng,n,x-c*L/2,y-s*L/2,6,a,L,3.2,2);setIR(T3.hub,n,x,y,3,0,3,6,3,Math.PI/2);n++;});
    [T3.nr,T3.ng,T3.hub].forEach(m=>{m.count=n;m.instanceMatrix.needsUpdate=true;});
    const[px,py]=S.pr,[bx,by]=sim.B(P,px,py),Bm=Math.hypot(bx,by);T3.pb.position.set(X(px),Y(py),8);T3.B.visible=Bm>1e-8;if(Bm>1e-8){const L=Math.min(60,10+Bm*1e6*0.4);setArrow(T3.B,X(px),Y(py),10,X(px)+bx/Bm*L,Y(py)-by/Bm*L,10,2.6);}
    const both=P.I1&&P.I2;T3.F.forEach(f=>f.visible=!!both);if(both){const F=2e-7*P.I1*P.I2/(P.d/100),dir=F>0?1:-1,L=Math.min(70,12+Math.abs(F)*4e4);setArrow(T3.F[0],X(ws[0][0]),Y(0),top*0.6,X(ws[0][0])+dir*L,Y(0),top*0.6,3);setArrow(T3.F[1],X(ws[1][0]),Y(0),top*0.6,X(ws[1][0])-dir*L,Y(0),top*0.6,3);}}};

/* --- Optika --- */
SC3.qutblanish={cam:(W,H)=>camAt(W*0.5,H*0.42,W,H,13.5,3.2,2.2),build({W,H}){const g=S.g;T3.k='';T3.src=ball(10,0xffd166,{glow:3});T3.ei=inst(700,T3.cyl,new THREE.MeshBasicMaterial({color:0xffb347}));T3.pol=[];
    T3.scr=new THREE.MeshStandardMaterial({color:0x2a2a20,emissive:0xffe27a,emissiveIntensity:0.5,metalness:0.1,roughness:0.6});T3.sm=mesh(T3.box,T3.scr);T3.ax=rod(1,mat(0x5a6788,{opacity:0.5}));
    const gx=W*0.18,gw=W*0.64,gb=H-22,gt=H*0.74;T3.z=chart3(gx,gx+gw,gt,gb,-30);T3.cv=line3(NEON.accent,91);T3.dot=ball(6,NEON.red,{glow:1.6});T3.GR={gx,gw,gb,gt};},
  update({S,P,W,H}){const g=S.g;if(!g)return;const cy=g.cy,A=g.A,x0=30,x1=W-30,pos=g.pos,angs=P.mid?[0,P.th,P.phi]:[0,P.phi],pX=pos.map(f=>x0+(x1-x0)*f),key=P.mid+'|'+W;
    if(T3.k!==key){T3.k=key;T3.pol.forEach(o=>o.parent&&o.parent.remove(o));T3.pol=pX.map(()=>{const gp=new THREE.Group(),d=new THREE.Mesh(new THREE.CylinderGeometry(A*1.6,A*1.6,3,48),mat(0x5b8cff,{glass:1,opacity:0.3}));d.rotation.z=Math.PI/2;const rimg=new THREE.Mesh(new THREE.TorusGeometry(A*1.6,2.2,8,48),mat(0x9aa6c0,{metal:0.9,rough:0.25}));rimg.rotation.y=Math.PI/2;
      const sl=new THREE.Group();for(let k=-3;k<=3;k++){const l=new THREE.Mesh(T3.box,mat(NEON.accent,{glow:1.2}));l.scale.set(4,A*3*Math.sqrt(1-(k/3.6)**2),1.2);l.position.z=k*A*0.4;sl.add(l);}gp.add(d,rimg,sl);gp.userData.sl=sl;T3.root.add(gp);return gp;});}
    pX.forEach((x,i)=>{T3.pol[i].position.set(x,cy,0);T3.pol[i].userData.sl.rotation.x=-angs[i]*D2R;});
    let I=[1,0.5],cur=0.5;for(let i=1;i<angs.length;i++){cur*=Math.cos((angs[i]-angs[i-1])*D2R)**2;I.push(cur);}
    const k=0.09,ph=S.t*6;let n=0;const put=(x,s,a)=>{if(n>=700||Math.abs(s)<0.02)return;const ar=a*D2R;setIR(T3.ei,n++,x,cy-Math.cos(ar)*s/2,Math.sin(ar)*s/2,0,1.3,Math.abs(s),1.3,Math.PI-ar);};
    for(let x=x0+12;x<pX[0];x+=7){const s=Math.sin(ph-x*k)*A;for(let j=0;j<3;j++)put(x,s,(j*60+((x*13)%180)));}
    for(let i=0;i<pX.length;i++){const xa=pX[i],xb=i+1<pX.length?pX[i+1]:x1-60,e=Math.sqrt(I[i+1]*2);if(e>0.01)for(let x=xa+10;x<xb;x+=7)put(x,Math.sin(ph-x*k)*A*e,angs[i]);}
    T3.ei.count=n;T3.ei.instanceMatrix.needsUpdate=true;T3.src.position.set(x0,cy,0);setRod(T3.ax,x0,cy,0,x1-30,cy,0,1);const If=I[I.length-1];T3.sm.scale.set(6,A*3.6,A*3.6);T3.sm.position.set(x1-30,cy,0);T3.scr.emissiveIntensity=0.05+If*3;
    const{gx,gw,gb,gt}=T3.GR,Xp=f=>gx+f/180*gw,Yi=i=>gb-i/0.5*(gb-gt),pts=[];for(let f=0;f<=180;f+=2){const ii=P.mid?0.5*Math.cos(P.th*D2R)**2*Math.cos((f-P.th)*D2R)**2:0.5*Math.cos(f*D2R)**2;pts.push([Xp(f),Yi(ii),T3.z]);}setLine(T3.cv,pts);T3.dot.position.set(Xp(P.phi),Yi(If),T3.z+4);}};

/* --- Nisbiylik --- */
SC3.tezqoshish={build({W,H}){const g=S.g;const ax=cube(W-60,2,2,NEON.ink,{glow:0.4});ax.position.set((g.x0+W-20)/2,g.ty[2]+30,0);for(let i=0;i<=2;i++){const t=cube(2,14,2,NEON.ink,{glow:0.4});t.position.set(g.x0+i*g.L,g.ty[2]+30,0);}
    [g.ty[0],g.ty[1],g.ty[1]+40].forEach(y=>{const r=cube(W*1.6,1.5,30,0x1b2440,{metal:0.5,opacity:0.6});r.position.set(W/2,y+16,-10);});
    T3.lt=ball(8,0xffe27a,{glow:3});T3.ltr=rod(2,new THREE.MeshBasicMaterial({color:0xffd166,transparent:true,opacity:0.5}));
    const rk=new THREE.Group(),bd=new THREE.Mesh(T3.cyl,mat(0xdfe6f5,{metal:0.8,rough:0.2}));bd.rotation.z=Math.PI/2;bd.scale.set(9,40,9);const nose=new THREE.Mesh(T3.cone,mat(NEON.accent,{metal:0.6,glow:0.3}));nose.rotation.z=-Math.PI/2;nose.scale.set(9,18,9);nose.position.x=29;
    const fl=new THREE.Mesh(T3.cone,new THREE.MeshBasicMaterial({color:0xff8a2a,transparent:true,opacity:0.85}));fl.rotation.z=Math.PI/2;fl.scale.set(6,22,6);fl.position.x=-31;rk.add(bd,nose,fl);[-1,1].forEach(s=>{const f=new THREE.Mesh(T3.box,mat(NEON.accent,{metal:0.5}));f.scale.set(12,2,10);f.position.set(-14,s*10,0);rk.add(f);});rk.traverse(o=>{if(o.isMesh)o.castShadow=true;});T3.root.add(rk);T3.rk=rk;T3.fl=fl;
    T3.pr=ball(7,NEON.green,{glow:1.5});T3.cl=ball(7,NEON.red,{glow:0.6,opacity:0.35});T3.ptr=rod(1.8,new THREE.MeshBasicMaterial({color:0x3fe0a0,transparent:true,opacity:0.6}));T3.ctr=rod(1.2,new THREE.MeshBasicMaterial({color:0xff5a5a,transparent:true,opacity:0.35}));},
  update({S,P,W}){const g=S.g;if(!g)return;const w=(P.u+P.v)/(1+P.u*P.v),wc=P.u+P.v,X=d=>g.x0+d*g.L,t=S.t;T3.lt.position.set(X(t),g.ty[0],0);setRod(T3.ltr,g.x0,g.ty[0],0,X(t),g.ty[0],0,2);
    T3.rk.position.set(X(P.u*t),g.ty[1],0);T3.fl.scale.y=16+8*Math.sin(t*40);const y2=g.ty[1]+40;T3.pr.position.set(X(w*t),y2,0);setRod(T3.ptr,g.x0,y2,0,X(w*t),y2,0,1.8);const xc=X(wc*t);T3.cl.visible=xc<W;T3.cl.position.set(xc,y2,0);setRod(T3.ctr,g.x0,y2,-4,Math.min(xc,W),y2,-4,1.2);}};

/* --- Yadro fizikasi --- */
SC3.massadefekt={cam:(W,H)=>camAt(W*0.48,H*0.48,W,H,15,2.2,1.6),build({W,H}){const g=S.g;T3.k='';T3.pp=inst(100,T3.sph,mat(NEON.red,{metal:0.3,rough:0.3,glow:0.25}));T3.nn=inst(150,T3.sph,mat(0x9aa6c0,{metal:0.5,rough:0.3}));
    T3.gm=mesh(T3.sph,new THREE.MeshBasicMaterial({color:0xb088ff,transparent:true,opacity:0.4,wireframe:true}),false);T3.gl=ball(1,0xb088ff,{glow:3,opacity:0.5});
    const gx=W*0.5,gw=W*0.46,gt=H*0.1,gb=H*0.82,Xa=a=>gx+a/250*gw,Ye=v=>gb-v/9.5*(gb-gt);T3.z=chart3(gx,gx+gw,gt,gb);const cv=line3(NEON.accent,250),pts=[];
    for(let a=4;a<=250;a++){const z=a/(1.98+0.0155*a**(2/3)),B=15.75*a-17.8*a**(2/3)-0.711*z*(z-1)/a**(1/3)-23.7*(a-2*z)**2/a;pts.push([Xa(a),Ye(Math.max(0,B/a)),T3.z]);}setLine(cv,pts);
    T3.pts=MD_N.map((q,i)=>{const r=mdE(i),b=ball(4,NEON.ink,{glow:0.8});b.position.set(Xa(r.A),Ye(r.E/r.A),T3.z+3);return b;});T3.Xa=Xa;T3.Ye=Ye;},
  update({S,P}){const g=S.g;if(!g)return;const[,Z,N]=MD_N[P.n],A=Z+N,nr=Math.max(2.5,Math.min(13,g.R*0.8/Math.cbrt(A))),e=g.f;
    if(T3.k!==P.n){T3.k=P.n;const ga=Math.PI*(3-Math.sqrt(5)),R0=nr*1.25*Math.cbrt(A);T3.np=[];for(let i=0;i<A;i++){const rr=R0*Math.cbrt((i+0.5)/A),y=1-2*(i+0.5)/A,rh=Math.sqrt(1-y*y),th=i*ga*7.3;T3.np.push({h:[rr*rh*Math.cos(th),rr*y,rr*rh*Math.sin(th)],s:[(Math.random()-0.5)*g.R*3,(Math.random()-0.5)*g.R*2.4,(Math.random()-0.5)*g.R*2],p:false});}
      const idx=[...T3.np.keys()].sort(()=>Math.random()-0.5);idx.slice(0,Z).forEach(i=>T3.np[i].p=true);T3.pts.forEach((b,i)=>{b.material=mat(i===P.n?NEON.red:NEON.ink,{glow:i===P.n?1.6:0.8});b.scale.setScalar(i===P.n?7:4);});}
    let a=0,b=0;T3.np.forEach(q=>{const x=g.cx+q.s[0]*(1-e)+q.h[0]*e,y=g.cy+q.s[1]*(1-e)+q.h[1]*e,z=q.s[2]*(1-e)+q.h[2]*e;if(q.p)setI(T3.pp,a++,x,y,z,nr);else setI(T3.nn,b++,x,y,z,nr);});T3.pp.count=a;T3.nn.count=b;T3.pp.instanceMatrix.needsUpdate=T3.nn.instanceMatrix.needsUpdate=true;
    const fl=S.t>2.6&&S.t<4,k=(S.t-2.6)/1.4;T3.gm.visible=T3.gl.visible=fl;if(fl){T3.gm.position.set(g.cx,g.cy,0);T3.gm.scale.setScalar(g.R*(0.5+k*2));T3.gm.material.opacity=0.5*(1-k);T3.gl.position.set(g.cx,g.cy,0);T3.gl.scale.setScalar(g.R*0.6*(1-k)+2);}}};
