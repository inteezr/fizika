/* ===== v7: 15 ta yangi mavzu uchun 3D sahnalar ===== */
function fan3(col,n=1200){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*9),3));g.setDrawRange(0,0);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:0.32,side:THREE.DoubleSide,depthWrite:false}));m.frustumCulled=false;T3.root.add(m);return m;}
function setFan(m,cx,cy,z,pts){const a=m.geometry.attributes.position,n=Math.min(pts.length-1,a.count/3);for(let i=0;i<n;i++){const o=i*9;a.array[o]=cx;a.array[o+1]=cy;a.array[o+2]=z;a.array[o+3]=pts[i][0];a.array[o+4]=pts[i][1];a.array[o+5]=z;a.array[o+6]=pts[i+1][0];a.array[o+7]=pts[i+1][1];a.array[o+8]=z;}a.needsUpdate=true;m.geometry.setDrawRange(0,Math.max(0,n)*3);}
function colInst(n,col,gl=0.55){return inst(n,T3.sph,new THREE.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:gl,metalness:0.2,roughness:0.35}));}
function dynMat(col,o={}){return new THREE.MeshStandardMaterial({color:col,metalness:o.metal??0.3,roughness:o.rough??0.35,emissive:col,emissiveIntensity:o.glow??0.3,transparent:o.opacity!==undefined,opacity:o.opacity??1});}

/* Gorizontal otilish */
SC3.gorizontal={build({W,H}){const g=S.g;floorV(g.gy,W,H);T3.cliff=cube(1,1,140,0x3a4252,{metal:0.2,rough:0.8});T3.b=ball(11,NEON.accent,{glow:0.5,metal:0.3});T3.gh=ball(9,0x9aa6b8,{metal:0.6});T3.path=line3(0x6f7fa8,61,{opacity:0.6});T3.tr=line3(NEON.accent,1200);T3.av=[NEON.green,NEON.red,NEON.warm].map(c=>arrow3(c));T3.mk=cube(4,4,60,NEON.red,{glow:1});},
  update({S,P}){const g=S.g;if(!g)return;const T=Math.sqrt(2*P.h/P.g),X=x=>g.x0+x*g.sc,Y=y=>g.gy-y*g.sc,hp=P.h*g.sc;T3.cliff.scale.set(g.x0,hp,140);T3.cliff.position.set(g.x0/2,g.gy-hp/2,0);
    const pts=[];for(let i=0;i<=60;i++){const t=T*i/60;pts.push([X(P.v*t),Y(P.h-P.g*t*t/2),0]);}setLine(T3.path,pts);setLine(T3.tr,S.tr.map(([a,b])=>[X(a),Y(b),0]));
    const t=S.t,x=P.v*t,y=P.h-P.g*t*t/2,vy=P.g*t,k=80/Math.max(P.v,P.g*T);T3.b.position.set(X(x),Y(y),0);T3.gh.position.set(g.x0-10,Y(y),-30);
    setArrow(T3.av[0],X(x),Y(y),14,X(x)+P.v*k,Y(y),14,2.6);setArrow(T3.av[1],X(x),Y(y),14,X(x),Y(y)+vy*k,14,2.6);setArrow(T3.av[2],X(x),Y(y),14,X(x)+P.v*k,Y(y)+vy*k,14,2.6);[1,2].forEach(i=>T3.av[i].visible=t>0.05);T3.mk.position.set(X(P.v*T),g.gy-2,0);}};

/* Markazga intilma kuch (ustdan) */
SC3.markazga={floor:1,build({W,H}){floorH(W,H);T3.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.006,8,160),mat(NEON.accent,{glow:0.7,opacity:0.6}));T3.root.add(T3.ring);T3.post=cube(12,12,40,NEON.steel,{metal:0.9});T3.rope=rod(1.4,mat(0xdfe6f5,{metal:0.4}));T3.b=ball(12,NEON.accent,{glow:0.3,metal:0.4});T3.v=arrow3(NEON.green);T3.f=arrow3(NEON.red);T3.tr=line3(NEON.warm,2,{opacity:0.7});},
  update({S,P}){const g=S.g;if(!g)return;const sc=g.sc,X=x=>g.cx+x*sc,Y=y=>g.cy-y*sc;T3.ring.scale.setScalar(P.r*sc);T3.ring.position.set(g.cx,g.cy,12);T3.post.position.set(g.cx,g.cy,20);
    const bx=S.cut?S.x:P.r*Math.cos(S.ph),by=S.cut?S.y:P.r*Math.sin(S.ph),vx=S.cut?S.vx:-P.v*Math.sin(S.ph),vy=S.cut?S.vy:P.v*Math.cos(S.ph),r=10+P.m*4;T3.b.scale.setScalar(r);T3.b.position.set(X(bx),Y(by),r);
    T3.rope.visible=!S.cut;if(!S.cut)setRod(T3.rope,g.cx,g.cy,r,X(bx),Y(by),r);setArrow(T3.v,X(bx),Y(by),r+14,X(bx+vx*0.12),Y(by+vy*0.12),r+14,2.6);T3.f.visible=!S.cut;if(!S.cut){const F=P.m*P.v*P.v/P.r,u=Math.min(1.1,F/30+0.15)*0.6;setArrow(T3.f,X(bx),Y(by),r+14,X(bx-bx/P.r*u),Y(by-by/P.r*u),r+14,3);}
    T3.tr.visible=!!S.cut;if(S.cut){const a=S.ph;setLine(T3.tr,[[X(P.r*Math.cos(a)),Y(P.r*Math.sin(a)),r],[X(bx),Y(by),r]]);}}};

/* Kepler qonunlari (ustdan) */
SC3.kepler={floor:1,cam:[0,9,7.5,0,0,0.4],build({W,H}){floorH(W,H);const st=ball(26,0xffc23a,{glow:2.2});T3.st=st;T3.halo=mesh(T3.sph,new THREE.MeshBasicMaterial({color:0xffa030,transparent:true,opacity:0.18,depthWrite:false}),false);T3.halo.scale.setScalar(52);
    T3.pl=ball(10,0x5fb4ff,{glow:0.4,metal:0.3});T3.orb=line3(0x8a96b0,181,{opacity:0.7});T3.fans=['#5fb4ff','#ff9f43','#3ddc84','#e66bff','#ffd23f','#ff5a7a'].flatMap(c=>[fan3(c),fan3(c)]).slice(0,13);T3.v=arrow3(NEON.green);
    const sg=new THREE.BufferGeometry(),pp=[];for(let i=0;i<400;i++)pp.push((Math.random()-0.2)*W*1.4,(Math.random()-0.2)*H*1.4,-200-Math.random()*400);sg.setAttribute('position',new THREE.Float32BufferAttribute(pp,3));T3.root.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:1.6,sizeAttenuation:false})));},
  update({S,P}){const g=S.g;if(!g)return;const X=x=>g.cx+x*g.sc,Y=y=>g.cy-y*g.sc,b=P.a*Math.sqrt(1-P.e*P.e);T3.st.position.set(g.cx,g.cy,30);T3.halo.position.set(g.cx,g.cy,30);T3.pl.position.set(X(S.x),Y(S.y),30);
    const o=[];for(let i=0;i<=180;i++){const t=i/180*TAU;o.push([X(-P.a*P.e+P.a*Math.cos(t)),Y(b*Math.sin(t)),30]);}setLine(T3.orb,o);
    const all=[...S.sec,S.cur];T3.fans.forEach((f,i)=>{const sg=all[i];if(!sg||sg.length<2){f.visible=false;return;}f.visible=true;setFan(f,g.cx,g.cy,29,sg.map(([x,y])=>[X(x),Y(y)]));});setArrow(T3.v,X(S.x),Y(S.y),30,X(S.x+S.vx*0.05),Y(S.y+S.vy*0.05),30,2.4);}};

/* Bernulli */
SC3.bernulli={cam:(W,H)=>camAt(W*0.5,H*0.5,W,H,15,2,2),build({W,H}){const g=S.g;floorV(g.cy+g.R1+30,W,H);T3.pk=-1;T3.pipe=null;T3.pi=colInst(140,NEON.water);T3.tubes=[0,1,2].map(()=>{const t=mesh(T3.cyl,mat(0xbfe0ff,{glass:1,opacity:0.18}),false);const w=mesh(T3.cyl,LIQ(0x2a7fd0,0.85),false);return[t,w];});},
  update({S,P}){const g=S.g;if(!g)return;const X=u=>g.x0+u*(g.x1-g.x0),kof=s=>s>0.38&&s<0.62?P.k:s>0.3&&s<0.38?1-(1-P.k)*(s-0.3)/0.08:s>0.62&&s<0.7?P.k+(1-P.k)*(s-0.62)/0.08:1,Rr=s=>g.R1*Math.sqrt(kof(s));
    if(T3.pk!==P.k){T3.pk=P.k;if(T3.pipe)T3.pipe.forEach(m=>T3.root.remove(m));const pts=[];for(let i=0;i<=120;i++){const s=i/120;pts.push(new THREE.Vector2(Rr(s),X(s)-g.x0));}const geo=new THREE.LatheGeometry(pts,48),a=mesh(geo,mat(0xbfe0ff,{glass:1,opacity:0.2}),false),w=mesh(geo,LIQ(0x2a7fd0,0.28),false);
      [a,w].forEach((m,i)=>{m.rotation.z=-Math.PI/2;m.position.set(g.x0,g.cy,0);if(i)m.scale.set(0.96,1,0.96);});T3.pipe=[a,w];}
    const n=S.ps.length;T3.pi.count=n;S.ps.forEach((p,i)=>{const r=Rr(p.u)*0.85,a=(i*2.399)%TAU;setI(T3.pi,i,X(p.u),g.cy+p.w*r*Math.cos(a)*0.0+p.w*r,Math.sin(a)*r*0.8,2.6);});T3.pi.instanceMatrix.needsUpdate=true;
    const v2=P.v1/P.k,p2=P.p1*1000-1000*(v2*v2-P.v1*P.v1)/2,pa=101325,top=30,hsc=(g.cy-g.R1-top-10)/((P.p1*1000-pa)/9800*1.05);
    [[0.15,P.p1*1000],[0.5,p2],[0.85,P.p1*1000]].forEach(([s,p],i)=>{const x=X(s),yb=g.cy-Rr(s),hh=Math.max(0,(p-pa)/9800)*hsc,[t,w]=T3.tubes[i];cylY(t,x,top,yb,7);cylY(w,x,Math.max(top,yb-hh),yb,6);});}};

/* Ballistik mayatnik */
SC3.ballistik={build({W,H}){const g=S.g;floorV(H-10,W,H);T3.beam=cube(280,12,60,NEON.steel,{metal:0.9,rough:0.25});T3.ropes=[0,1,2,3].map(()=>rod(1.2,mat(0xdfe6f5,{metal:0.4})));T3.blk=cube(1,1,1,0xb07a45,{rough:0.7,metal:0.05});T3.bul=mesh(T3.cyl,mat(0xd9dee6,{metal:1,rough:0.15}));T3.bul.rotation.z=Math.PI/2;T3.gun=cube(46,28,28,0x3a4252,{metal:0.7});T3.hl=cube(1,2,2,NEON.red,{glow:1});},
  update({S,P,W,H}){const g=S.g;if(!g)return;const L=P.L*g.sc,bw=40+P.M*8,bh=30+P.M*4,ex=g.px+L*Math.sin(S.th),ey=g.py+L*Math.cos(S.th);T3.beam.position.set(g.px,g.py-6,0);
    T3.blk.scale.set(bw,bh,bw*0.8);T3.blk.position.set(ex,ey,0);T3.blk.rotation.z=S.th;let k=0;[-1,1].forEach(sx=>[-1,1].forEach(sz=>{const ox=sx*bw*0.35,oz=sz*bw*0.3,c=Math.cos(S.th),s=Math.sin(S.th),ax=ex+ox*c-(-bh/2)*s,ay=ey+ox*s+(-bh/2)*c;setRod(T3.ropes[k++],g.px+ox,g.py,oz,ax,ay,oz);}));
    T3.gun.position.set(53,g.py+L,0);T3.bul.visible=!S.hit;if(!S.hit){const x=g.px-bw/2-(-S.bx)*(g.px-60);T3.bul.scale.set(3,14,3);T3.bul.position.set(x-7,g.py+L,0);}
    const m=P.m/1000,V=m*P.v/(m+P.M),hm=V*V/19.6;T3.hl.visible=!!S.hit;T3.hl.scale.set(bw+140,2,2);T3.hl.position.set(g.px+70,g.py+L-hm*g.sc,0);}};

/* Garmonik tebranish */
SC3.garmonik={build({W,H}){const g=S.g;floorV(H*0.86+16,W,H);T3.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.012,8,120),mat(NEON.accent,{glow:0.6}));T3.root.add(T3.ring);T3.hub=ball(5,NEON.ink,{metal:0.8});T3.arm=rod(1.6,mat(0xdfe6f5,{metal:0.6}));T3.p=ball(9,NEON.accent,{glow:0.6});
    T3.rail=cube(1,4,30,NEON.steel,{metal:0.9});T3.blk=cube(28,28,28,NEON.red,{metal:0.4,glow:0.2});T3.pl=rod(0.8,mat(0x8a96b0,{opacity:0.5}));T3.v=arrow3(NEON.green);T3.a=arrow3(NEON.violet);
    const gx=W*0.42,gw=W-gx-20,gh=(H-40)/3;T3.GR={gx,gw,gh};[0,1,2].forEach(i=>chart3(gx,gx+gw,20+i*gh+10,20+(i+1)*gh-10,-30));T3.cv=[NEON.red,NEON.green,NEON.violet].map(c=>line3(c,700));},
  update({S,P,W,H}){const g=S.g;if(!g)return;const R=g.R,f=g.f,px=g.cx+R*Math.cos(f),py=g.cy-R*Math.sin(f),by=H*0.86;T3.ring.scale.setScalar(R);T3.ring.position.set(g.cx,g.cy,0);T3.hub.position.set(g.cx,g.cy,0);setRod(T3.arm,g.cx,g.cy,0,px,py,0);T3.p.position.set(px,py,0);
    T3.rail.scale.set(2*R+40,4,30);T3.rail.position.set(g.cx,by+16,0);T3.blk.position.set(px,by,0);setRod(T3.pl,px,py,0,px,by-14,0);const w=TAU*P.f,vx=-R*w*Math.sin(f),ax=-w*w*R*Math.cos(f);setArrow(T3.v,px,by-26,16,px+vx*0.35,by-26,16,2.4);setArrow(T3.a,px,by+30,16,px+ax*0.12,by+30,16,2.4);
    const{gx,gw,gh}=T3.GR,t0=S.t-8;[1,2,3].forEach((k,i)=>{const gm=20+i*gh+gh/2,amp=gh*0.38;setLine(T3.cv[i],S.tr.filter(q=>q[0]>t0).map(q=>[gx+(q[0]-t0)/8*gw,gm-q[k]*amp,-28]));});}};

/* Diffuziya */
SC3.diffuziya={build({W,H}){const g=S.g;floorV(g.by+g.bh+12,W,H);const D=g.bh*0.6;T3.D=D;const gl=cube(g.bw,g.bh,D,0x9fc6ff,{glass:1,opacity:0.1});gl.position.set(g.bx+g.bw/2,g.by+g.bh/2,0);gl.castShadow=false;const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(g.bw,g.bh,D)),new THREE.LineBasicMaterial({color:0x7aa8ff}));e.position.copy(gl.position);T3.root.add(e);
    T3.ia=colInst(500,0x5fb4ff);T3.ib=colInst(500,0xff9f43);T3.tag=ball(6,0xffffff,{glow:1.5});T3.tr=line3(0xdfe7ff,600,{opacity:0.6});const gx=g.bx+g.bw+40,gw=W-gx-20;T3.GR={gx,gw};chart3(gx,gx+gw,g.by,g.by+g.bh,-30);T3.cv=line3(0x5fb4ff,21);T3.th=line3(0x8a96b0,61,{opacity:0.7});},
  update({S,P}){const g=S.g;if(!g)return;const X=x=>g.bx+x*g.bw,Y=y=>g.by+y*g.bh,D=T3.D;let a=0,b=0;S.ps.forEach((p,i)=>{const z=(((i*0.6180339)%1)-0.5)*D*0.9;if(p.s){setI(T3.ib,b++,X(p.x),Y(p.y),z,3);}else setI(T3.ia,a++,X(p.x),Y(p.y),z,3);});T3.ia.count=a;T3.ib.count=b;T3.ia.instanceMatrix.needsUpdate=T3.ib.instanceMatrix.needsUpdate=true;
    const t=S.tag;T3.tag.position.set(X(t.x),Y(t.y),0);const tp=[];for(let i=Math.max(0,t.tr.length-1200);i<t.tr.length;i+=2)tp.push([X(t.tr[i]),Y(t.tr[i+1]),0]);setLine(T3.tr,tp.filter((_,i)=>i%2===0));
    const{gx,gw}=T3.GR,gt=g.by,gb=g.by+g.bh,nb=20,cnt=Array.from({length:nb},()=>[0,0]);S.ps.forEach(p=>{const k=Math.min(nb-1,Math.floor(p.x*nb));cnt[k][p.s]++;});setLine(T3.cv,cnt.map(([a,b],k)=>[gx+(k+0.5)/nb*gw,gb-(a+b?a/(a+b):0.5)*(gb-gt),-27]));
    const Dd=SIMS.find(s=>s.id==='diffuziya').D(P),th=[];for(let i=0;i<=60;i++){const x=i/60,v=S.t>0?0.5*(1-erf((x-0.5)/Math.sqrt(4*Dd*S.t))):x<0.5?1:0;th.push([gx+x*gw,gb-v*(gb-gt),-27]);}setLine(T3.th,th);}};

/* Havo namligi */
SC3.namlik={build({W,H}){const g=S.g;floorV(g.gb+6,W,H);const cx=g.gx0+g.gw/2,r=g.gw/2;T3.cx=cx;T3.r=r;const gl=mesh(new THREE.CylinderGeometry(r,r-6,g.gb-g.gt,48,1,true),mat(0xbfe0ff,{glass:1,opacity:0.2}),false);gl.position.set(cx,(g.gt+g.gb)/2,0);
    const w=mesh(new THREE.CylinderGeometry(r-4,r-7,(g.gb-g.gt)*0.72,48),LIQ(0x2a7fd0,0.5),false);w.position.set(cx,g.gb-(g.gb-g.gt)*0.36-2,0);for(let i=0;i<4;i++){const ic=cube(16,16,16,0xdff2ff,{opacity:0.7,metal:0.1,rough:0.05});ic.position.set(cx-18+i*12,g.gt+(g.gb-g.gt)*0.33+(i%2)*10,(i%2?8:-8));ic.rotation.set(i,i*0.7,0);}
    T3.dr=inst(200,T3.sph,mat(0xaad7ff,{glow:0.25,metal:0.1,rough:0.05,opacity:0.85}));T3.mol=colInst(120,0x3aa0ff);const cx2=W*0.55,cw=W-cx2-30;T3.GR={cx2,cw};chart3(cx2,cx2+cw,40,H-50,-30);T3.cv=line3(NEON.accent,91);T3.pt=ball(6,NEON.red,{glow:1});T3.pd=ball(5,NEON.warm,{glow:1});T3.dl=line3(NEON.warm,2);T3.gl=line3(NEON.water,2,{opacity:0.7});},
  update({S,P,W,H}){const g=S.g;if(!g)return;const cx=T3.cx,r=T3.r;let n=0;S.dr.forEach(d=>{const a=d.u*TAU,y=g.gt+d.v*(g.gb-g.gt),rr=r-6*d.v+1;setI(T3.dr,n++,cx+Math.cos(a)*rr,y,Math.sin(a)*rr,d.r*1.2);});T3.dr.count=n;T3.dr.instanceMatrix.needsUpdate=true;
    const nm=Math.round(Math.min(P.rho,rhos(P.T))/30*120);T3.mol.count=nm;S.mol.slice(0,nm).forEach((m,i)=>setI(T3.mol,i,10+m.x*(W*0.46-20),20+m.y*(H-60),((i*0.618)%1-0.5)*160,2.2));T3.mol.instanceMatrix.needsUpdate=true;
    const{cx2,cw}=T3.GR,ct=40,cb=H-50,Xc=T=>cx2+(T+5)/45*cw,Yc=q=>cb-q/52*(cb-ct),pts=[];for(let T=-5;T<=40;T+=0.5)pts.push([Xc(T),Yc(rhos(T)),-27]);setLine(T3.cv,pts);const td=SIMS.find(s=>s.id==='namlik').td(P),q=Math.min(P.rho,rhos(P.T));
    T3.pt.position.set(Xc(P.T),Yc(q),-25);T3.pd.position.set(Xc(td),Yc(q),-25);setLine(T3.dl,[[Xc(td),Yc(q),-26],[Xc(P.T),Yc(q),-26]]);setLine(T3.gl,[[Xc(P.Tg),cb,-26],[Xc(P.Tg),ct,-26]]);}};

/* Adiabatik jarayon */
SC3.adiabata={build({W,H}){const g=S.g;floorV(g.cb+6,W,H);cylVessel(g.cx,g.cw,g.ct-10,g.cb);T3.gas=mesh(T3.cyl,dynMat(0x3a6bff,{opacity:0.55,glow:0.6}),false);T3.pis=mesh(T3.cyl,mat(0x9aa6b8,{metal:0.9,rough:0.2}));T3.rod=mesh(T3.cyl,mat(0xcfd6e6,{metal:1,rough:0.15}));
    T3.mol=colInst(40,0xffffff);const gx=W*0.4,gw=W-gx-30;T3.GR={gx,gw,gt:30,gb:H-40};chart3(gx,gx+gw,30,H-40,-30);T3.ad=line3(NEON.red,81);T3.iso=line3(0x8a96b0,81,{opacity:0.7});T3.dot=ball(6,NEON.accent,{glow:1.4});},
  update({S,P}){const g=S.g;if(!g)return;const q=SIMS.find(s=>s.id==='adiabata').st(S,P),r=g.cw/2-3,h=clamp((q.T-250)/900,0,1);cylY(T3.gas,g.cx,g.yp,g.cb,r);T3.gas.material.color.copy(heatCol(h));T3.gas.material.emissive.copy(heatCol(h));
    cylY(T3.pis,g.cx,g.yp-16,g.yp,r+1);cylY(T3.rod,g.cx,g.ct-40,g.yp-16,6);T3.mol.count=40;for(let i=0;i<40;i++){const a=i*2.399,rr=(i%7)/7*r*0.9,y=g.yp+6+((i*53+S.ph*40*(1+h*3))%Math.max(1,g.cb-g.yp-12));setI(T3.mol,i,g.cx+Math.cos(a)*rr,y,Math.sin(a)*rr,2.6);}T3.mol.instanceMatrix.needsUpdate=true;
    const{gx,gw,gt,gb}=T3.GR,pm=100*Math.pow(P.r,P.gm)*1.05,XV=V=>gx+V*gw,Yp=p=>gb-Math.pow(p/pm,0.5)*(gb-gt),a=[],b=[];for(let i=0;i<=80;i++){const V=q.V2+(1-q.V2)*i/80;a.push([XV(V),Yp(100*Math.pow(1/V,P.gm)),-27]);b.push([XV(V),Yp(100/V),-27]);}setLine(T3.ad,a);setLine(T3.iso,b);T3.dot.position.set(XV(q.V),Yp(q.p),-24);}};

/* Diod */
SC3.diod={build({W,H}){const g=S.g;floorV(g.by+g.bh+90,W,H);const D=g.bh*0.7;T3.D=D;T3.p=cube(1,g.bh,D,0xff5a4e,{opacity:0.22,glow:0.3});T3.n=cube(1,g.bh,D,0x4ea8ff,{opacity:0.22,glow:0.3});T3.dep=cube(1,g.bh,D,0x0b1226,{opacity:0.8});
    const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(g.bw,g.bh,D)),new THREE.LineBasicMaterial({color:0x7aa8ff}));e.position.set(g.bx+g.bw/2,g.by+g.bh/2,0);T3.root.add(e);
    T3.h=colInst(70,0xff5a4e);T3.el=colInst(70,0x4ea8ff);T3.glow=ball(30,0xff3030,{glow:2.5,opacity:0.0});const gx=W*0.6,gw=W-gx-20;T3.GR={gx,gw,gt:40,gb:H-50};chart3(gx,gx+gw,40,H-50,-30);T3.cv=line3(0x8fa3c4,301);T3.ll=line3(0x8a96b0,2,{opacity:0.7});T3.dot=ball(6,NEON.red,{glow:1.4});},
  update({S,P}){const g=S.g;if(!g)return;const d=DI_T[P.d],r=diSolve(P.U,P.R,d),w=S.w||0.16,X=x=>g.bx+x*g.bw,D=T3.D;T3.p.scale.set(g.bw*(0.5-w/2),g.bh,D);T3.p.position.set(X((0.5-w/2)/2),g.by+g.bh/2,0);T3.n.scale.set(g.bw*(0.5-w/2),g.bh,D);T3.n.position.set(X(1-(0.5-w/2)/2),g.by+g.bh/2,0);T3.dep.scale.set(g.bw*w,g.bh,D);T3.dep.position.set(X(0.5),g.by+g.bh/2,0);
    let a=0,b=0;S.cs.forEach((q,i)=>{if(q.x>0.5-w/2&&q.x<0.5+w/2)return;const z=(((i*0.618)%1)-0.5)*D*0.85,y=g.by+(0.05+q.y*0.9)*g.bh;if(q.p)setI(T3.h,a++,X(q.x),y,z,4);else setI(T3.el,b++,X(q.x),y,z,3.4);});T3.h.count=a;T3.el.count=b;T3.h.instanceMatrix.needsUpdate=T3.el.instanceMatrix.needsUpdate=true;
    T3.glow.visible=P.d===2&&r.I>0.001;if(T3.glow.visible){T3.glow.position.set(X(0.5),g.by+g.bh/2,0);T3.glow.scale.setScalar(20+r.I*1500);}
    const{gx,gw,gt,gb}=T3.GR,Im=0.05,XV=v=>gx+(v+1)/3*gw,YI=i=>gb-(gb-gt)*0.15-(i/Im)*(gb-gt)*0.85,pts=[];for(let i=0;i<=300;i++){const v=-1+3*i/300,I=d.Is*(Math.exp(Math.min(v/(d.nf*0.02585),80))-1);if(I>Im*1.1)break;pts.push([XV(v),YI(I),-27]);}setLine(T3.cv,pts);T3.cv.material.color.set(d.col);
    setLine(T3.ll,[[XV(Math.min(2,P.U)),YI((P.U-Math.min(2,P.U))/P.R),-27],[XV(-1),YI((P.U+1)/P.R),-27]]);T3.dot.visible=r.I<Im*1.1;T3.dot.position.set(XV(r.V),YI(r.I),-24);}};

/* Manba quvvati */
SC3.quvvat={build({W,H}){const g=S.g;floorV(g.B+40,W,H);T3.bat=battery3(g.L,(g.T+g.B)/2);T3.bulb=bulb3((g.L+g.Rr)/2,g.T);T3.res=resistor3();T3.res.rotation.z=Math.PI/2;T3.res.position.set(g.Rr,(g.T+g.B)/2,0);T3.root.add(T3.res);wires([[g.L,g.T],[g.Rr,g.T],[g.Rr,g.B],[g.L,g.B]],true);
    T3.lt=new THREE.PointLight(0xffd27a,0,500);T3.lt.position.set((g.L+g.Rr)/2,g.T,40);T3.root.add(T3.lt);T3.halo=mesh(T3.sph,new THREE.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:0,depthWrite:false}),false);T3.e=colInst(24,NEON.accent);
    const gx=W*0.5,gw=W-gx-20;T3.GR={gx,gw,gt:30,gb:H-40};chart3(gx,gx+gw,30,H-40,-30);T3.pc=line3(NEON.red,201);T3.ec=line3(NEON.green,201);T3.d1=ball(6,NEON.red,{glow:1.4});T3.d2=ball(5,NEON.green,{glow:1.4});T3.rr=line3(0x8a96b0,2,{opacity:0.6});},
  update({S,P,t}){const g=S.g;if(!g)return;const I=P.E/(P.R+P.r),Pw=I*I*P.R,Pm=P.E*P.E/(4*P.r),br=clamp(Pw/Pm,0,1);T3.lt.intensity=br*3;if(T3.bulb.userData.lt)T3.bulb.userData.lt.intensity=br*2;T3.halo.position.set((g.L+g.Rr)/2,g.T,0);T3.halo.scale.setScalar(22+br*40);T3.halo.material.opacity=br*0.16;
    const e=(t*I*0.25)%1,per=2*((g.Rr-g.L)+(g.B-g.T));T3.e.count=24;for(let i=0;i<24;i++){let s=((i/24+e)%1)*per,x,y;if(s<g.Rr-g.L){x=g.L+s;y=g.T;}else if((s-=g.Rr-g.L)<g.B-g.T){x=g.Rr;y=g.T+s;}else if((s-=g.B-g.T)<g.Rr-g.L){x=g.Rr-s;y=g.B;}else{s-=g.Rr-g.L;x=g.L;y=g.B-s;}setI(T3.e,i,x,y,8,3);}T3.e.instanceMatrix.needsUpdate=true;
    const{gx,gw,gt,gb}=T3.GR,Rm=20,XR=R=>gx+R/Rm*gw,YP=p=>gb-p/(Pm*1.1)*(gb-gt),a=[],b=[];for(let i=0;i<=200;i++){const R=Rm*i/200;a.push([XR(R),YP(P.E*P.E*R/((R+P.r)**2)),-27]);b.push([XR(R),gb-R/(R+P.r)*(gb-gt),-27]);}setLine(T3.pc,a);setLine(T3.ec,b);
    T3.d1.position.set(XR(P.R),YP(Pw),-24);T3.d2.position.set(XR(P.R),gb-P.R/(P.R+P.r)*(gb-gt),-24);setLine(T3.rr,[[XR(P.r),gb,-27],[XR(P.r),gt,-27]]);}};

/* Solenoid / elektromagnit */
SC3.elektromagnit={build({W,H}){const g=S.g;floorV(H-24,W,H);T3.k='';T3.fl=[1,2,3,4].map(()=>line3(NEON.accent,97,{opacity:0.45}));T3.in=[-2,-1,0,1,2].map(()=>line3(NEON.accent,2,{opacity:0.9}));T3.core=mesh(T3.cyl,mat(0x6b7486,{metal:0.9,rough:0.35}));T3.core.rotation.z=Math.PI/2;
    T3.clips=Array.from({length:14},()=>cube(6,14,3,0xc8d0e0,{metal:1,rough:0.2}));T3.lN=label3('N','#ff5a4e',26);T3.lS=label3('S','#5f9bff',26);T3.coil=null;},
  update({S,P,t,W,H}){const g=S.g;if(!g)return;const key=[g.len,g.rad,P.N,P.core].join();if(key!==T3.k){T3.k=key;if(T3.coil)T3.root.remove(T3.coil);const gr=new THREE.Group(),cm=coil3(0,0,g.rad*0.75,g.len,Math.min(40,Math.round(P.N/12)),0xd08a3a,2.2);T3.root.remove(cm);gr.add(cm);gr.rotation.z=Math.PI/2;gr.position.set(g.cx,g.cy,0);T3.root.add(gr);T3.coil=gr;}
    T3.coil.children[0].material.emissiveIntensity=Math.min(0.8,Math.abs(P.I)*0.25);T3.core.visible=P.core>1;T3.core.scale.set(g.rad*0.5,g.len+12,g.rad*0.5);T3.core.position.set(g.cx,g.cy,0);
    [1,2,3,4].forEach((k,i)=>{const ry=g.rad*(0.4+k*0.55),rx=g.len/2+k*28,p=[];for(let j=0;j<=96;j++){const a=j/96*TAU;p.push([g.cx+Math.cos(a)*rx,g.cy+Math.sin(a)*ry,0]);}setLine(T3.fl[i],p);});
    [-2,-1,0,1,2].forEach((k,i)=>{const y=g.cy+k*g.rad*0.18,z=k*g.rad*0.12;setLine(T3.in[i],[[g.cx-g.len/2-10,y,z],[g.cx+g.len/2+10,y,z]]);});
    const sg=Math.sign(P.I)||1,by=H-30;T3.lN.position.set(g.cx+sg*(g.len/2+52),g.cy,0);T3.lS.position.set(g.cx-sg*(g.len/2+52),g.cy,0);
    S.clips.forEach((q,i)=>{const x0=g.cx+g.len/2+30+(i%7)*6,y0=by-6,x1=g.cx+g.len/2+12+(i%3)*8,y1=g.cy-g.rad*0.45+((i*11)%Math.max(1,g.rad*0.9)),z=((i%5)-2)*6;T3.clips[i].position.set(x0+(x1-x0)*q.on,y0+(y1-y0)*q.on,z);T3.clips[i].rotation.z=(1-q.on)*Math.PI/2;});}};

/* Optik tola */
SC3.tola={build({W,H}){const g=S.g;floorV(g.cy+g.cl+60,W,H);const L=g.x1-g.x0;const cl=mesh(T3.cyl,mat(0x9fc6ff,{glass:1,opacity:0.12}),false);cl.rotation.z=Math.PI/2;cl.scale.set(g.cl,L,g.cl);cl.position.set((g.x0+g.x1)/2,g.cy,0);
    const co=mesh(T3.cyl,mat(0x3aa0ff,{glass:1,opacity:0.3}),false);co.rotation.z=Math.PI/2;co.scale.set(g.a,L,g.a);co.position.copy(cl.position);T3.fray=line3(0x3ddc84,70);T3.lost=line3(0x3ddc84,2,{opacity:0.6});T3.ph=colInst(70,0xc8ffd9);T3.las=cube(60,26,26,0x3a4252,{metal:0.7});},
  update({S,P,t}){const g=S.g;if(!g)return;const n2=Math.min(P.n2,P.n1-0.001),th=P.th*D2R,b=Math.asin(Math.sin(th)/P.n1),ac=Math.asin(n2/P.n1),ok=Math.PI/2-b>ac,tb=Math.tan(b),pts=[[g.x0-Math.cos(th)*150,g.cy-Math.sin(th)*150],[g.x0,g.cy]];let x=g.x0,y=g.cy,dy=1,lost=null;
    for(let k=0;k<60&&x<g.x1;k++){const yt=dy<0?g.cy-g.a:g.cy+g.a,dx=Math.abs(yt-y)/Math.max(tb,1e-6);if(x+dx>g.x1){pts.push([g.x1,y+dy*(g.x1-x)*tb]);break;}x+=dx;y=yt;pts.push([x,y]);if(!ok){const ang=Math.asin(Math.min(1,P.n1/n2*Math.sin(Math.PI/2-b)));lost=[x,y,ang,dy];break;}dy=-dy;}
    setLine(T3.fray,pts.map(p=>[p[0],p[1],0]));T3.lost.visible=!!lost;if(lost)setLine(T3.lost,[[lost[0],lost[1],0],[lost[0]+Math.sin(lost[2])*120,lost[1]+lost[3]*Math.cos(lost[2])*120,0]]);
    const off=(t*0.6)%1;T3.ph.count=pts.length-1;for(let i=1;i<pts.length;i++){const[ax,ay]=pts[i-1],[bx,by]=pts[i];setI(T3.ph,i-1,ax+(bx-ax)*off,ay+(by-ay)*off,0,3.5);}T3.ph.instanceMatrix.needsUpdate=true;
    T3.las.position.set(g.x0-Math.cos(th)*180,g.cy-Math.sin(th)*180,0);T3.las.rotation.z=th;}};

/* Bir vaqtlilik */
SC3.birvaqt={build({W,H}){const g=S.g;floorV(g.cy+96,W,H);T3.plat=cube(W*1.4,26,160,0x3a4252,{rough:0.8,metal:0.2});T3.plat.position.set(W/2,g.cy+83,0);T3.car=cube(1,100,90,0x9fc6ff,{glass:1,opacity:0.16});T3.car.castShadow=false;T3.edge=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),new THREE.LineBasicMaterial({color:NEON.accent}));T3.root.add(T3.edge);
    T3.lamp=ball(8,0xffe98c,{glow:2.5});T3.fr=[0,1].map(()=>cube(4,92,84,0xffe98c,{glow:2,opacity:0.55}));T3.hit=[0,1].map(()=>ball(14,0xffe98c,{glow:2.5,opacity:0.8}));T3.pp=person3(NEON.warm);T3.pp.scale.setScalar(0.5);T3.ties=Array.from({length:24},()=>cube(4,4,150,0x8a96b0,{metal:0.5}));},
  update({S,P,W}){const g=S.g;if(!g)return;const gm=1/Math.sqrt(1-P.v*P.v),L0=8,sc=g.sc,cy=g.cy,t=S.t,fr=P.fr,vw=fr?0:P.v,vp=fr?-P.v:0,L=fr?L0:L0/gm,tmx=fr?L/2:(L/2)/(1-P.v),xc=W/2/sc+vw*(t-tmx/2),X=x=>x*sc,a=xc-L/2,b=xc+L/2;
    T3.car.scale.set((b-a)*sc,100,90);T3.car.position.set(X(xc),cy,0);T3.edge.scale.set((b-a)*sc,100,90);T3.edge.position.copy(T3.car.position);T3.lamp.position.set(X(xc),cy-50,0);
    const xs=fr?xc:(W/2/sc-P.v*tmx/2),hb=fr?t>=L/2:t>=(L/2)/(1+P.v),hf=fr?t>=L/2:t>=(L/2)/(1-P.v);[[-1,hb,a],[1,hf,b]].forEach(([s,hit,wx],i)=>{const x=hit?wx:xs+s*t;T3.fr[i].position.set(X(x),cy,0);T3.hit[i].visible=hit;T3.hit[i].position.set(X(wx),cy,0);});
    T3.ties.forEach((q,i)=>{const x=((i*2+vp*t)%48+48)%48-2;q.position.set(X(x),cy+68,0);});const ox=((W*0.12/sc+vp*t)%(W/sc)+W/sc)%(W/sc);T3.pp.position.set(X(ox),cy+70,70);}};

/* Termoyadro sintezi: tokamak (ustdan) */
SC3.termoyadro={floor:1,cam:[0,8.5,8.5,0,0,0.6],build({W,H}){floorH(W,H);const g=S.g,R=Math.min(g.bw,g.bh)*0.36,r=R*0.32;T3.tkR=R;T3.r=r;T3.c=[g.bx+g.bw/2,g.by+g.bh/2];
    const tor=mesh(new THREE.TorusGeometry(R,r,32,96),mat(0x9fc6ff,{glass:1,opacity:0.14}),false);tor.position.set(T3.c[0],T3.c[1],r+10);T3.pl=mesh(new THREE.TorusGeometry(R,r*0.55,24,96),new THREE.MeshBasicMaterial({color:0xb070ff,transparent:true,opacity:0.12,depthWrite:false}),false);T3.pl.position.copy(tor.position);
    for(let i=0;i<16;i++){const a=i/16*TAU,cl=mesh(new THREE.TorusGeometry(r*1.25,3.2,8,32),mat(0xd08a3a,{metal:0.9,rough:0.3}));cl.position.set(T3.c[0]+Math.cos(a)*R,T3.c[1]+Math.sin(a)*R,r+10);cl.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(-Math.sin(a),Math.cos(a),0));}
    T3.d=colInst(120,0x5fb4ff);T3.tt=colInst(120,0x3ddc84);T3.he=colInst(60,0xffd23f);T3.nn=colInst(60,0xe6e9ef);T3.fx=Array.from({length:10},()=>mesh(T3.sph,new THREE.MeshBasicMaterial({color:0xfff0b4,transparent:true,opacity:0,depthWrite:false}),false));},
  update({S,P}){const g=S.g;if(!g)return;const[cx,cy]=T3.c,R=T3.tkR,r=T3.r,z0=r+10,map=(x,y)=>{const a=x*TAU,u=(y-0.5)*1.4*r*0.6,w=Math.sin(x*37+y*11)*r*0.35;return[cx+Math.cos(a)*(R+u),cy+Math.sin(a)*(R+u),z0+w];};
    let d=0,tt=0;S.ps.forEach(p=>{const[x,y,z]=map(p.x,p.y);if(p.t)setI(T3.tt,tt++,x,y,z,5);else setI(T3.d,d++,x,y,z,4);});T3.d.count=d;T3.tt.count=tt;let h=0,n=0;S.pr.forEach(p=>{const[x,y,z]=map(((p.x%1)+1)%1,clamp(p.y,0,1));const off=p.l*60;if(p.t==='he')setI(T3.he,h++,x,y,z,6);else setI(T3.nn,n++,x,y,z+off,3.5);});T3.he.count=h;T3.nn.count=n;
    [T3.d,T3.tt,T3.he,T3.nn].forEach(m=>m.instanceMatrix.needsUpdate=true);T3.pl.material.opacity=0.06+clamp(P.T/200,0,1)*0.22;T3.fx.forEach((m,i)=>{const f=S.fx[i];if(!f){m.material.opacity=0;return;}const[x,y,z]=map(f.x,f.y);m.position.set(x,y,z);m.scale.setScalar(8+f.t*70);m.material.opacity=Math.max(0,1-f.t*1.6);});}};
