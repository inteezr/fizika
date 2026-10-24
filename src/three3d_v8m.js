/* ===== v8: 3D sahnalar — mexanika va tebranishlar ===== */
function grp(){const g=new THREE.Group();T3.root.add(g);return g;}
function adopt(g,...o){o.forEach(x=>g.add(x));return o[0];}
function rods(n,r,col,o){const a=[];for(let i=0;i<n;i++)a.push(rod(r,mat(col,o)));return a;}
function relabel(U,key,txt,col,h,x,y,z){if(U['_lk'+key]!==txt){U['_lk'+key]=txt;if(U['_lb'+key])T3.root.remove(U['_lb'+key]);U['_lb'+key]=label3(txt,col,h);}U['_lb'+key].position.set(x,y,z);}
function chartLine(z,pts,gx,gy,gw,gh,x0,x1,y0,y1){const X=x=>gx+(x-x0)/(x1-x0)*gw,Y=y=>gy+gh-(clamp(y,y0,y1)-y0)/(y1-y0)*gh;return pts.map(p=>[X(p[0]),Y(p[1]),z]);}

/* Havo qarshiligi */
SC3.qarshilik={build({W,H}){const U=T3.v8={};const g=S.g||{gy:H-36};floorV(g.gy,W,H);U.tr=curve3(NEON.accent,1200);U.vac=line3(0x8e9cb2,90,{opacity:0.5});U.b=ball(9,NEON.warm,{glow:0.5,metal:0.4});U.v=arrow3(NEON.green);U.F=arrow3(NEON.red);U.mg=arrow3(NEON.violet);
    U.gun=new THREE.Group();const br=new THREE.Mesh(T3.cyl,mat(0x5a6378,{metal:0.9,rough:0.25}));br.scale.set(7,40,7);br.position.y=-20;br.castShadow=true;U.gun.add(br);T3.root.add(U.gun);U.base=cube(30,14,30,0x3a4252,{metal:0.7});U.mL=rod(2,mat(NEON.accent,{glow:1}));U.m0=rod(2,mat(0x8e9cb2,{glow:0.4}));},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const q=S.q,X=x=>g.x0+x*g.sc,Y=y=>g.gy-y*g.sc,a=P.a*D2R;setLine(U.tr,q.pts.map(p=>[X(p[0]),Y(p[1]),0]));
    const vp=[];for(let i=0;i<=80;i++){const t=q.T0*i/80;vp.push([X(P.v*Math.cos(a)*t),Y(P.v*Math.sin(a)*t-4.9*t*t),0]);}setLine(U.vac,vp);
    U.gun.position.set(g.x0,g.gy-8,0);U.gun.rotation.z=-(Math.PI/2-a);U.base.position.set(g.x0,g.gy-7,0);
    let k=q.pts.findIndex(p=>p[3]>=S.t);if(k<0)k=q.pts.length-1;const p=q.pts[k],pn=q.pts[Math.min(k+1,q.pts.length-1)],pp=q.pts[Math.max(k-1,0)],dx=pn[0]-pp[0],dy=pn[1]-pp[1],dl=Math.hypot(dx,dy)||1,ux=dx/dl,uy=dy/dl,bx=X(p[0]),by=Y(p[1]);
    U.b.position.set(bx,by,0);setArrow(U.v,bx,by,0,bx+ux*p[2]*2.5,by-uy*p[2]*2.5,0,2.4);const F=P.k*p[2]*p[2];U.F.visible=F>0.05;if(F>0.05)setArrow(U.F,bx,by,0,bx-ux*F*5,by+uy*F*5,0,2.4);setArrow(U.mg,bx,by,0,bx,by+49,0,2.2);
    setRod(U.mL,X(q.L),g.gy-1,-40,X(q.L),g.gy-1,40);setRod(U.m0,X(q.L0),g.gy-1,-30,X(q.L0),g.gy-1,30);}};

/* Harakat grafiklari */
SC3.grafik={cam:[0,3,16,0,0.6,0],build({W,H}){const U=T3.v8={};const g=S.g||{ry:58};road3(W,g.ry+2,90);U.car=car3(NEON.accent);U.v=arrow3(NEON.green);U.a=arrow3(NEON.red);
    const gw=(W-90)/3,gh=H-g.ry-110,gt=g.ry+70;U.G=[0,1,2].map(i=>{const gx=40+i*(gw+15);return{gx,gw:gw-10,gt,gh,z:chart3(gx,gx+gw-10,gt,gt+gh)};});U.c=[NEON.accent,NEON.green,NEON.red].map(c=>curve3(c,90));U.m=[NEON.accent,NEON.green,NEON.red].map(c=>ball(5,c,{glow:1.4}));U.z0=[0,1,2].map(()=>rod(0.8,mat(0x8e9cb2,{opacity:0.5})));U.stop=rod(1,mat(NEON.warm,{glow:1}));
    U.mk=[];for(let u=-40;u<=40;u+=10){const m=cube(2,1,90,0xdfe6f5,{glow:0.4});U.mk.push([m,u]);}},
  update({S,P,W}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('grafik'),t=S.t,x=sim.xs(P,t),v=P.v0+P.a*t,cx=g.XR(clamp(x,-40,40)),ry=g.ry;U.car.position.set(cx,ry+3,0);U.car.rotation.y=v<-0.01?Math.PI:0;U.car.userData.wh.forEach(w=>w.rotation.z=-x*2);
    U.mk.forEach(([m,u])=>m.position.set(g.XR(u),ry+4,0));U.v.visible=Math.abs(v)>0.05;if(U.v.visible)setArrow(U.v,cx,ry-44,0,cx+v*8,ry-44,0,2.4);U.a.visible=Math.abs(P.a)>0.05;if(U.a.visible)setArrow(U.a,cx,ry-60,0,cx+P.a*14,ry-60,0,2.2);
    const xa=[];for(let i=0;i<=40;i++)xa.push(Math.abs(sim.xs(P,i/5)));const xm=Math.max(10,...xa)*1.1,vm=Math.max(2,Math.abs(P.v0),Math.abs(P.v0+P.a*8))*1.15,am=Math.max(1,Math.abs(P.a)*1.3),R=[xm,vm,am],F=[u=>sim.xs(P,u),u=>P.v0+P.a*u,()=>P.a];
    U.G.forEach((G,i)=>{const pts=[];for(let k=0;k<=80;k++){const tt=t*k/80;pts.push([tt,F[i](tt)]);}setLine(U.c[i],chartLine(G.z,pts,G.gx,G.gt,G.gw,G.gh,0,8,-R[i],R[i]));const e=chartLine(G.z+1,[[t,F[i](t)]],G.gx,G.gt,G.gw,G.gh,0,8,-R[i],R[i])[0];U.m[i].position.set(...e);setRod(U.z0[i],G.gx,G.gt+G.gh/2,G.z,G.gx+G.gw,G.gt+G.gh/2,G.z);});
    const ts=-P.v0/P.a,G=U.G[1];U.stop.visible=P.a!==0&&ts>0&&ts<8;if(U.stop.visible){const xs=G.gx+ts/8*G.gw;setRod(U.stop,xs,G.gt,G.z+1,xs,G.gt+G.gh,G.z+1);}}};

/* Inersiya kuchi */
SC3.inersiya={build({W,H}){const U=T3.v8={};const g=S.g||{gy:H-50,vw:200,vh:120};floorV(g.gy,W,H);U.posts=[];const n=Math.ceil((W+240)/120);for(let k=0;k<n;k++){const p=mesh(T3.cyl,mat(0x5a6378,{metal:0.6}));const l=ball(6,NEON.warm,{glow:1.2});U.posts.push([p,l]);}
    U.box=cube(1,1,1,0x9fc6ff,{glass:1,opacity:0.14});U.fr=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),new THREE.LineBasicMaterial({color:0x5b8cff}));T3.root.add(U.fr);U.floor=cube(1,6,1,0x2a3246,{metal:0.6});
    U.wh=[0,1,2,3].map(()=>{const w=mesh(T3.cyl,mat(0x11151f,{metal:0.4,rough:0.6}));w.rotation.x=Math.PI/2;return w;});U.bar=cube(40,5,10,0xdfe6f5,{metal:0.9});U.str=rod(0.9,mat(0xdfe6f5));U.bob=ball(10,NEON.warm,{metal:0.5,glow:0.2});U.mg=arrow3(NEON.violet);U.T=arrow3(NEON.green);U.Fi=arrow3(NEON.red);U.ma=arrow3(NEON.green);U.acc=arrow3(NEON.accent);},
  update({S,P,W}){const U=T3.v8,g=S.g;if(!g)return;const{gy,cx,cy,vw,vh}=g,fr=P.fr|0,off=fr?-S.x*40:0,PP=120*Math.ceil((W+240)/120),D=150;
    U.posts.forEach(([p,l],k)=>{const px=((k*120+off)%PP+PP)%PP-120+3;p.scale.set(3,90,3);p.position.set(px,gy-45,-D*0.6);l.position.set(px,gy-94,-D*0.6);});
    U.box.scale.set(vw,vh,D);U.box.position.set(cx,cy,0);U.fr.scale.set(vw,vh,D);U.fr.position.set(cx,cy,0);U.floor.scale.set(vw,6,D);U.floor.position.set(cx,cy+vh/2,0);
    U.wh.forEach((w,i)=>{w.scale.set(10,8,10);w.position.set(cx+(i&1?1:-1)*vw*0.32,gy-10,(i<2?1:-1)*D/2);w.rotation.y=0;});
    const px=cx,py=cy-vh/2+6,L=86,bx=px+L*Math.sin(S.th),by=py+L*Math.cos(S.th),ae=S.aeff??P.a,k=3.6;U.bar.position.set(px,py-2,0);setRod(U.str,px,py,0,bx,by,0);U.bob.scale.setScalar(8+P.m*2);U.bob.position.set(bx,by,0);
    setArrow(U.mg,bx,by,0,bx,by+9.8*k,0,2.2);const T=Math.hypot(9.8,ae);setArrow(U.T,bx,by,0,bx+(px-bx)/L*T*k,by+(py-by)/L*T*k,0,2.2);
    U.Fi.visible=fr&&Math.abs(ae)>0.1;if(U.Fi.visible)setArrow(U.Fi,bx,by,0,bx-ae*k,by,0,2.2);U.ma.visible=!fr&&Math.abs(ae)>0.1;if(U.ma.visible)setArrow(U.ma,bx,by+26,0,bx+ae*k,by+26,0,1.8);
    U.acc.visible=Math.abs(ae)>0.05;if(U.acc.visible)setArrow(U.acc,cx-vw/2+20,cy+vh/2-16,D/2,cx-vw/2+20+Math.sign(ae)*40,cy+vh/2-16,D/2,2.4);}};

/* Parashyut */
SC3.parashyut={cam:[1.5,0.8,15,0.6,0,0],build({W,H}){const U=T3.v8={};const g=S.g||{sx:W*0.2,bot:H-30};const gr=cube(W*0.5,8,300,0x163a2c,{rough:0.95,metal:0});gr.position.set(W*0.2,g.bot+4,0);
    U.man=person3(0x3a6fd8);U.man.scale.setScalar(0.26);U.can=mesh(new THREE.SphereGeometry(1,28,12,0,TAU,0,Math.PI/2),mat(0xff785a,{rough:0.5,side:1}));U.lines=rods(6,0.5,0xdfe6f5);U.mg=arrow3(NEON.violet);U.F=arrow3(NEON.red);U.ho=new THREE.Mesh(new THREE.TorusGeometry(40,1,6,48),mat(NEON.warm,{glow:1,opacity:0.6}));U.ho.rotation.x=Math.PI/2;T3.root.add(U.ho);
    U.tk=[];for(let h=0;h<=3000;h+=500){const m=cube(14,1.5,1.5,0x8e9cb2,{glow:0.4});U.tk.push([m,h]);}
    const gx=W*0.48,gw=W*0.48,gt=40,gh=H-90;U.G={gx,gw,gt,gh,z:chart3(gx,gx+gw,gt,gt+gh)};U.cv=curve3(NEON.accent,900);U.l1=rod(0.8,mat(0x8e9cb2,{opacity:0.6}));U.l2=rod(0.8,mat(NEON.green,{glow:0.6}));U.mk=ball(5,NEON.warm,{glow:1.5});},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const{sx,Y}=g,y=Y(S.h);U.man.position.set(sx,y+10,0);U.man.userData.arms.forEach((a,i)=>{a.rotation.z=(i?-1:1)*(S.op>0?2.6:1.2);});
    U.tk.forEach(([m,h])=>m.position.set(15,Y(h),0));U.ho.position.set(sx,Y(P.ho),0);
    const op=S.op,r=14+op*30,cy=y-40-op*12;U.can.visible=op>0;U.can.scale.set(r,(8+op*12),r);U.can.position.set(sx,cy,0);U.can.rotation.x=Math.PI;
    U.lines.forEach((l,i)=>{l.visible=op>0;if(op>0){const a=i/6*TAU;setRod(l,sx+Math.cos(a)*r,cy,Math.sin(a)*r,sx,y-6,0);}});
    const Fq=P.m*(9.8-S.a);setArrow(U.mg,sx+26,y,0,sx+26,y+P.m*9.8*0.04,0,2);U.F.visible=Fq>1;if(U.F.visible)setArrow(U.F,sx-26,y,0,sx-26,y-Math.min(Fq,P.m*9.8*4)*0.04,0,2);
    const G=U.G,vt1=Math.sqrt(2*P.m*9.8/(P.rho*0.7)),vt2=Math.sqrt(2*P.m*9.8/(P.rho*1.5*P.S)),tm=Math.max(60,S.t*1.15),ym=Math.max(60,vt1*1.15),pts=S.hist.map(p=>[p[0],p[1]]).concat([[S.t,S.v]]);
    setLine(U.cv,chartLine(G.z,pts,G.gx,G.gt,G.gw,G.gh,0,tm,0,ym));const L=v=>G.gt+G.gh-v/ym*G.gh;setRod(U.l1,G.gx,L(vt1),G.z,G.gx+G.gw,L(vt1),G.z);setRod(U.l2,G.gx,L(vt2),G.z,G.gx+G.gw,L(vt2),G.z);U.mk.position.set(G.gx+S.t/tm*G.gw,L(S.v),G.z+2);}};

/* Burilish */
SC3.burilish={cam:[0,7.5,11.5,0,-0.6,0],build({W,H}){const U=T3.v8={};U.key='';U.car=car3(NEON.accent);U.hold=new THREE.Group();T3.root.add(U.hold);U.hold.add(U.car);U.hold.rotation.order='YXZ';
    U.mg=arrow3(NEON.violet);U.N=arrow3(NEON.green);U.f=arrow3(NEON.red);U.ma=arrow3(NEON.warm);U.post=cube(4,40,4,0x8e9cb2,{metal:0.8});U.trk=line3(NEON.accent,200,{opacity:0.5});},
  update({S,P,W,H}){const U=T3.v8,q=simOf('burilish').calc(P),a=P.al*D2R,cx=W/2,cy=H*0.62,R=Math.min(W,H)*0.36,w=110,Rin=R-w/2,Rout=R+w/2;
    const key=P.al+'|'+W+'|'+H;if(U.key!==key){U.key=key;if(U.road){T3.root.remove(U.road);U.road.geometry.dispose();}const pr=[new THREE.Vector2(Rin-30,22),new THREE.Vector2(Rin,0),new THREE.Vector2(Rout,-w*Math.tan(a)),new THREE.Vector2(Rout+10,-w*Math.tan(a)),new THREE.Vector2(Rout+10,22)];
      U.road=new THREE.Mesh(new THREE.LatheGeometry(pr,96),mat(0x2b3242,{rough:0.85,metal:0.1,side:1}));U.road.receiveShadow=true;U.road.position.set(cx,cy,0);T3.root.add(U.road);}
    const hY=r=>cy-(r-Rin)*Math.tan(a),rr=R*(1+S.dr*(q.out?0.42:-0.42)),cr=clamp(rr,Rin+20,Rout+40),ph=S.ph,x=cx+cr*Math.cos(ph),z=cr*Math.sin(ph),y=Math.min(hY(Math.min(cr,Rout)),cy+0)-1;
    U.hold.position.set(x,y,z);U.hold.rotation.set(-a,-(ph+Math.PI/2),0);U.car.scale.setScalar(1.3);U.car.userData.wh.forEach(wh=>wh.rotation.z=-ph*12);U.post.position.set(cx,cy-20,0);
    const pts=[];for(let i=0;i<=120;i++){const t=ph-i*0.02;pts.push([cx+R*Math.cos(t),hY(R)-2,R*Math.sin(t)]);}setLine(U.trk,pts);
    const ux=Math.cos(ph),uz=Math.sin(ph),k=5,mx=x,my=y-26,mz=z;setArrow(U.mg,mx,my,mz,mx,my+9.8*k,mz,2.4);
    const nx=-ux*Math.sin(a),ny=-Math.cos(a),nz=-uz*Math.sin(a);setArrow(U.N,mx,my,mz,mx+nx*q.N*k,my+ny*q.N*k,mz+nz*q.N*k,2.4);
    const ac=Math.min(P.v*P.v/P.R,25);setArrow(U.ma,mx,my-8,mz,mx-ux*ac*k,my-8,mz-uz*ac*k,2.6);
    const fv=clamp(q.f,-P.mu*q.N,P.mu*q.N),dx=-ux*Math.cos(a),dy=Math.sin(a),dz=-uz*Math.cos(a);U.f.visible=Math.abs(fv)>0.05;if(U.f.visible)setArrow(U.f,x,y,z,x+dx*fv*k,y+dy*fv*k,z+dz*fv*k,2.4);}};

/* Ag‘darilish */
SC3.agdarilish={build({W,H}){const U=T3.v8={};U.key='';U.box=new THREE.Group();T3.root.add(U.box);U.bm=new THREE.Mesh(T3.box,dynMat(NEON.accent,{metal:0.4,rough:0.4,glow:0.15}));U.bm.castShadow=true;U.box.add(U.bm);
    U.be=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),new THREE.LineBasicMaterial({color:0xdfe7ff}));U.box.add(U.be);U.cm=ball(5,NEON.warm,{glow:1.5});U.vl=line3(NEON.warm,2,{opacity:0.7});U.mg=arrow3(NEON.violet);U.pv=ball(4,NEON.red,{glow:1.5});},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g||g.qx==null)return;const a=P.al*D2R,{px,py,sc}=g,D=130,key=[P.al,px,py,sc].join();
    if(U.key!==key){U.key=key;if(U.w){T3.root.remove(U.w);U.w.geometry.dispose();T3.root.remove(U.f);}const sh=new THREE.Shape(),t=[px+Math.cos(a)*sc*0.8,py-Math.sin(a)*sc*0.8],b=[px-Math.cos(a)*sc*3,py+Math.sin(a)*sc*3];sh.moveTo(t[0],t[1]);sh.lineTo(b[0],b[1]);sh.lineTo(t[0],b[1]);sh.closePath();
      U.w=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:D,bevelEnabled:false}),mat(0x3a4252,{metal:0.5,rough:0.5}));U.w.position.z=-D/2;U.w.receiveShadow=true;T3.root.add(U.w);U.f=floorV(b[1],W,H);}
    const md=simOf('agdarilish').mode(P),b=P.b*sc,h=P.h*sc;U.box.position.set(g.qx,g.qy,0);U.box.rotation.z=g.th;U.bm.scale.set(b,h,D*0.55);U.bm.position.set(b/2,-h/2,0);U.be.scale.copy(U.bm.scale);U.be.position.copy(U.bm.position);
    U.bm.material.color.set(md==='tip'?NEON.red:md==='slide'?NEON.warm:NEON.accent);U.bm.material.emissive.copy(U.bm.material.color);
    const c=Math.cos(g.th),s=Math.sin(g.th),gx=g.qx+(b/2)*c-(-h/2)*s,gyy=g.qy+(b/2)*s+(-h/2)*c;U.cm.position.set(gx,gyy,D*0.3);setLine(U.vl,[[gx,gyy,D*0.3],[gx,gyy+h*1.2,D*0.3]]);setArrow(U.mg,gx,gyy,D*0.3,gx,gyy+50,D*0.3,2.2);U.pv.position.set(g.qx,g.qy,D*0.3);}};

/* Minorali kran */
SC3.kran={cam:[1,1,16,0,0,0],build({W,H}){const U=T3.v8={};const g=S.g||{gy:H-40};floorV(g.gy,W,H);U.o=grp();U.i=new THREE.Group();U.o.add(U.i);const A=(...x)=>adopt(U.i,...x);
    U.base=A(cube(1,1,1,0x5a6378,{metal:0.6}));U.tw=[];for(let k=0;k<4;k++)U.tw.push(A(rod(2.2,mat(NEON.warm,{metal:0.6}))));U.lat=[];for(let k=0;k<24;k++)U.lat.push(A(rod(0.9,mat(NEON.warm,{metal:0.6}))));
    U.jib=[0,1].map(()=>A(rod(2.4,mat(NEON.warm,{metal:0.6}))));U.tie=[0,1].map(()=>A(rod(0.8,mat(0xdfe6f5,{metal:0.8}))));U.mast=A(rod(2.4,mat(NEON.warm,{metal:0.6})));U.cab=A(cube(1,1,1,0x9fc6ff,{metal:0.3,opacity:0.8}));
    U.cw=A(cube(1,1,1,0x5a6378,{metal:0.5,rough:0.5}));U.tr=A(cube(1,1,1,0xdfe6f5,{metal:0.9}));U.cab2=A(rod(0.6,mat(0xdfe6f5)));U.load=A(cube(1,1,1,NEON.accent,{metal:0.4,rough:0.4}));U.N=[arrow3(NEON.green),arrow3(NEON.green)];U.Nx=[0,1].map(()=>ball(5,NEON.red,{glow:1.5}));},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const q=simOf('kran').calc(P),{gy,sc,bx}=g,X=x=>x*sc,Y=y=>-y*sc,pv=q.tip>0?q.w:q.tip<0?-q.w:0,D=X(1.4),th=24;
    U.o.position.set(bx+X(pv),gy,0);U.o.rotation.z=S.ang;U.i.position.set(-X(pv),0,0);U.base.scale.set(X(2*q.w),10,X(2*q.w));U.base.position.set(0,-5,0);
    const cs=[[-1,-1],[1,-1],[1,1],[-1,1]];cs.forEach(([a,b],k)=>setRod(U.tw[k],X(0.6)*a,-10,X(0.6)*b,X(0.6)*a,Y(th),X(0.6)*b));
    let n=0;for(let k=0;k<th-1&&n<24;k+=4){for(let f=0;f<4&&n<24;f++){const[a1,b1]=cs[f],[a2,b2]=cs[(f+1)%4];setRod(U.lat[n++],X(0.6)*a1,Y(k),X(0.6)*b1,X(0.6)*a2,Y(k+4),X(0.6)*b2);}}
    setRod(U.jib[0],X(-P.d-1.2),Y(th),-D/3,X(30.5),Y(th),-D/3);setRod(U.jib[1],X(-P.d-1.2),Y(th),D/3,X(30.5),Y(th),D/3);setRod(U.mast,0,Y(th),0,0,Y(th+4),0);setRod(U.tie[0],0,Y(th+4),0,X(30.5),Y(th),0);setRod(U.tie[1],0,Y(th+4),0,X(-P.d),Y(th),0);
    U.cab.scale.set(X(1.6),X(1.4),X(1.4));U.cab.position.set(X(1.2),Y(th-1),X(1));const cw=Math.max(0.6,Math.sqrt(P.M)*0.7)*sc;U.cw.visible=P.M>0;U.cw.scale.set(cw,cw*1.3,D);U.cw.position.set(X(-P.d),Y(th)+cw*0.65-2,0);
    const tx=X(S.tx),ly=Y(th-11);U.tr.scale.set(16,6,D*0.8);U.tr.position.set(tx,Y(th),0);setRod(U.cab2,tx,Y(th),0,tx,ly,0);const s=Math.max(0.6,Math.sqrt(P.m)*0.8)*sc;U.load.visible=P.m>0;U.load.scale.set(s,s,s);U.load.position.set(tx,ly+s/2,0);
    [[-q.w,q.N1],[q.w,q.N2]].forEach(([x,N],i)=>{const px=bx+X(x);U.N[i].visible=N>0;U.Nx[i].visible=N<=0;if(N>0)setArrow(U.N[i],px,gy-2,X(1.6)+14,px,gy-2-N*0.25,X(1.6)+14,2.6);else U.Nx[i].position.set(px,gy-4,X(1.6));});}};

/* Impuls momenti */
SC3.impulsmoment={floor:1,cam:[0,8,10,0,0,1],build({W,H}){const U=T3.v8={};floorH(W,H);const g=S.g||{cx:W*0.36,cy:H/2,sc:Math.min(W,H)*0.42};
    U.seat=mesh(T3.cyl,mat(0x3a4c78,{metal:0.6,rough:0.3}));U.seat.rotation.x=Math.PI/2;U.leg=mesh(T3.cyl,mat(0x8e9cb2,{metal:0.9}));U.leg.rotation.x=Math.PI/2;U.ft=mesh(T3.cyl,mat(0x5a6378,{metal:0.8}));U.ft.rotation.x=Math.PI/2;
    U.sp=rods(6,1,0xdfe6f5,{metal:0.9});U.body=mesh(T3.cyl,mat(0xd9c7a8,{rough:0.5}));U.body.rotation.x=Math.PI/2;U.head=ball(12,0xe6d2b5,{rough:0.5});U.arm=[rod(5,mat(0xd9c7a8,{rough:0.5})),rod(5,mat(0xd9c7a8,{rough:0.5}))];U.db=[ball(8,NEON.warm,{metal:0.6}),ball(8,NEON.warm,{metal:0.6})];
    U.L=arrow3(NEON.violet);U.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.02,6,64,Math.PI*1.6),mat(NEON.green,{glow:1}));T3.root.add(U.ring);U.bars=[NEON.accent,NEON.green,NEON.violet,NEON.warm].map(c=>cube(1,1,1,c,{glow:0.5,metal:0.3}));},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('impulsmoment'),{cx,cy,sc}=g,w=S.L/sim.I(P,S.r),zs=60;U.seat.scale.set(sc*0.32,8,sc*0.32);U.seat.position.set(cx,cy,zs);U.leg.scale.set(5,zs,5);U.leg.position.set(cx,cy,zs/2);U.ft.scale.set(sc*0.2,4,sc*0.2);U.ft.position.set(cx,cy,2);
    U.sp.forEach((r,k)=>{const a=S.ph+k*TAU/6;setRod(r,cx+Math.cos(a)*sc*0.08,cy+Math.sin(a)*sc*0.08,zs+4.5,cx+Math.cos(a)*sc*0.3,cy+Math.sin(a)*sc*0.3,zs+4.5);});
    U.body.scale.set(sc*0.08,70,sc*0.06);U.body.position.set(cx,cy,zs+40);U.body.rotation.set(Math.PI/2,S.ph,0,'ZXY');U.head.position.set(cx,cy,zs+90);
    const ax=Math.cos(S.ph),ay=Math.sin(S.ph),r=S.r*sc;U.arm.forEach((a,i)=>{const s=i?1:-1,ex=cx+s*ax*r,ey=cy+s*ay*r;setRod(a,cx+s*ax*sc*0.06,cy+s*ay*sc*0.06,zs+64,ex,ey,zs+60);U.db[i].scale.setScalar(6+P.m*1.4);U.db[i].position.set(ex,ey,zs+60);});
    setArrow(U.L,cx,cy,zs+105,cx,cy,zs+105+S.L*3,4);U.ring.scale.setScalar(26);U.ring.position.set(cx,cy,zs+120);U.ring.rotation.z=S.ph;
    const gx=W*0.66,gw=W*0.3,bh=Math.min(W,H)*0.5,vals=[[sim.I(P,S.r),sim.I(P,0.9)],[w,S.L/sim.I(P,0.15)],[S.L,S.L*1.2],[S.L*w/2,S.L*S.L/(2*sim.I(P,0.15))]];
    vals.forEach(([v,mx],i)=>{const h=Math.max(1,Math.min(1,v/mx)*bh),x=gx+i*gw/4+gw/8;U.bars[i].scale.set(gw/4-18,gw/4-18,h);U.bars[i].position.set(x,cy,h/2);});}};

/* Tormozlanish yo‘li */
SC3.tormoz={cam:[0,3,16,0,0.4,0],build({W,H}){const U=T3.v8={};const g=S.g||{ry:H*0.42};U.road=mesh(T3.box,dynMat(0x2b3242,{rough:0.9,metal:0.1,glow:0}));U.road.scale.set(W*2.2,3,110);U.road.position.set(W/2,g.ry+6.5,0);
    for(let x=-W*0.5;x<W*1.6;x+=46){const d=cube(22,1,4,0xffe9a8,{glow:0.6});d.position.set(x,g.ry+4.8,0);d.castShadow=false;}U.car=car3(NEON.accent);U.zr=cube(1,1.2,100,NEON.warm,{glow:0.6,opacity:0.35});U.zb=cube(1,1.2,100,NEON.red,{glow:0.6,opacity:0.35});
    U.sk=[cube(1,0.8,5,0x05070c,{rough:1}),cube(1,0.8,5,0x05070c,{rough:1})];U.cone=mesh(T3.cone,mat(0xff7a1a,{glow:0.6}));U.br=ball(4,NEON.red,{glow:2.5});
    const gx=40,gy=g.ry+110,gw=W-90,gh=H-gy-26;U.G={gx,gy,gw,gh,z:gh>40?chart3(gx,gx+gw,gy,gy+gh):0};U.c0=line3(0x8e9cb2,4,{opacity:0.6});U.c1=curve3(NEON.accent,400);U.mk=ball(5,NEON.warm,{glow:1.5});},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('tormoz'),v0=P.v/3.6,mu=sim.MU[P.yo|0],sr=v0*P.tr,sb=v0*v0/(2*mu*9.8),x0=v0*0.8,X=x=>40+x*g.sc,ry=g.ry;
    U.road.material.color.set(['#2b3242','#26364a','#d9e2ee','#bfe3ff'][P.yo|0]);U.road.material.metalness=P.yo===3?0.9:P.yo===1?0.6:0.1;U.road.material.roughness=P.yo===3?0.08:P.yo===1?0.25:0.9;
    const cx=X(S.x);U.car.position.set(cx-23,ry+3,0);U.car.userData.wh.forEach(w=>w.rotation.z=S.ph>=2&&S.v>0?w.rotation.z:-S.x*1.5);U.br.visible=S.ph===2;U.br.position.set(cx-46,ry-18,0);
    U.zr.scale.set(Math.max(1,sr*g.sc),1.2,100);U.zr.position.set(X(x0)+sr*g.sc/2,ry+4,0);U.zb.scale.set(Math.max(1,sb*g.sc),1.2,100);U.zb.position.set(X(x0+sr)+sb*g.sc/2,ry+4,0);
    const xb=X(x0+sr),sl=S.ph>=2?Math.max(0,cx-14-xb):0;U.sk.forEach((m,i)=>{m.visible=sl>1;m.scale.set(sl,0.8,5);m.position.set(xb+sl/2,ry+4.2,i?10:-10);});
    U.cone.scale.set(9,22,9);U.cone.rotation.z=Math.PI;U.cone.position.set(X(x0),ry-6,40);
    const G=U.G;if(!G.z)return;const tmax=0.8+P.tr+v0/(mu*9.8),xm=tmax*1.05,ym=P.v*1.1;setLine(U.c0,chartLine(G.z,[[0,P.v],[0.8+P.tr,P.v],[tmax,0]],G.gx,G.gy,G.gw,G.gh,0,xm,0,ym));
    const pts=[[0,P.v],[Math.min(S.t,0.8+P.tr),P.v]].concat(S.t>0.8+P.tr?[[S.t,S.v*3.6]]:[]);setLine(U.c1,chartLine(G.z+0.5,pts,G.gx,G.gy,G.gw,G.gh,0,xm,0,ym));U.mk.position.set(...chartLine(G.z+2,[[S.t,S.v*3.6]],G.gx,G.gy,G.gw,G.gh,0,xm,0,ym)[0]);}};

/* Fizik mayatnik */
SC3.fizmayatnik={build({W,H}){const U=T3.v8={};const g=S.g||{px:W*0.32,py:34};U.ceil=cube(W*0.55,10,90,0x5a6378,{metal:0.7});U.ceil.position.set(g.px-60+W*0.25,g.py-7,0);U.pend=grp();U.bar=adopt(U.pend,cube(1,1,1,NEON.accent,{metal:0.5,rough:0.3,glow:0.15}));U.holes=[];for(let k=0;k<9;k++){const h=new THREE.Mesh(T3.cyl,mat(0x0b1226));h.rotation.x=Math.PI/2;U.pend.add(h);U.holes.push(h);}
    U.pin=mesh(T3.cyl,mat(0xdfe6f5,{metal:1}));U.pin.rotation.x=Math.PI/2;U.cm=adopt(U.pend,ball(5,NEON.warm,{glow:1.6}));U.str=rod(0.8,mat(0xdfe6f5));U.bob=ball(10,NEON.green,{metal:0.4});U.ax=line3(0x8e9cb2,2,{opacity:0.5});
    const gx=W-150,gy=40;U.G={gx,gy,gw:120,gh:90,z:chart3(gx,gx+120,gy,gy+90)};U.cv=curve3(NEON.accent,51);U.mk=ball(4,NEON.warm,{glow:1.5});},
  update({S,P,W}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('fizmayatnik'),d=sim.dd(P),I=P.L*P.L/12+d*d,lk=I/d,{px,py,sc}=g,top=-(P.L/2-d)*sc,bot=(P.L/2+d)*sc;
    U.pend.position.set(px,py,0);U.pend.rotation.z=-S.th;U.bar.scale.set(14,bot-top,14);U.bar.position.set(0,(top+bot)/2,0);U.cm.position.set(0,d*sc,9);U.holes.forEach((h,k)=>{const y=top+(k+0.5)/9*(bot-top);h.scale.set(2.2,15,2.2);h.position.set(0,y,0);h.visible=Math.abs(y)>6;});
    U.pin.scale.set(3,40,3);U.pin.position.set(px,py,0);setLine(U.ax,[[px,py,-10],[px,py+bot+10,-10]]);const qx=px+W*0.3,bx=qx+lk*sc*Math.sin(S.th2),by=py+lk*sc*Math.cos(S.th2);setRod(U.str,qx,py,0,bx,by,0);U.bob.position.set(bx,by,0);
    const G=U.G,L=P.L,ds=[];for(let i=1;i<=50;i++){const x=i/50*L/2;ds.push([x,TAU*Math.sqrt((L*L/12+x*x)/(9.8*x))]);}const ym=Math.min(6,Math.max(...ds.map(p=>p[1])));setLine(U.cv,chartLine(G.z,ds,G.gx,G.gy,G.gw,G.gh,0,L/2,0,ym));U.mk.position.set(...chartLine(G.z+2,[[d,TAU*Math.sqrt(I/(9.8*d))]],G.gx,G.gy,G.gw,G.gh,0,L/2,0,ym)[0]);}};

/* Bog‘langan mayatniklar */
SC3.boglanganmay={build({W,H}){const U=T3.v8={};const g=S.g||{py:30,p1:W*0.3,p2:W*0.55};U.ceil=cube(g.p2-g.p1+120,10,80,0x5a6378,{metal:0.7});U.ceil.position.set((g.p1+g.p2)/2,g.py-7,0);U.s=[rod(0.8,mat(0xdfe6f5)),rod(0.8,mat(0xdfe6f5))];U.b=[ball(12,NEON.accent,{metal:0.5,glow:0.2}),ball(12,NEON.warm,{metal:0.5,glow:0.2})];U.sp=spring3(NEON.green);
    U.eb=[cube(1,1,1,NEON.accent,{glow:0.6}),cube(1,1,1,NEON.warm,{glow:0.6})];U.ef=[0,1].map(()=>cube(1,1,1,0x9fc6ff,{glass:1,opacity:0.12}));const gy=H*0.62,gh=H-gy-24;U.G={gx:40,gy,gw:W-80,gh,z:chart3(40,W-40,gy,gy+gh)};U.c=[curve3(NEON.accent,2400),curve3(NEON.warm,2400)];},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const{py,sc,p1,p2}=g,L=P.l*sc,b=[[p1+L*Math.sin(S.x1),py+L*Math.cos(S.x1)],[p2+L*Math.sin(S.x2),py+L*Math.cos(S.x2)]];
    [p1,p2].forEach((p,i)=>{setRod(U.s[i],p,py,0,b[i][0],b[i][1],0);U.b[i].position.set(b[i][0],b[i][1],0);});setSpring(U.sp,b[0][0]+12,b[0][1],0,b[1][0]-12,b[1][1],0,6);
    const gg=9.8,E=(x,v)=>0.5*v*v*P.l*P.l+0.5*gg*P.l*x*x,e=[E(S.x1,S.v1),E(S.x2,S.v2)],et=e[0]+e[1]||1,bx=W*0.78,bw=26,bh=H*0.45;
    e.forEach((v,i)=>{const h=Math.max(0.5,v/et*bh),x=bx+i*(bw+18)+bw/2;U.eb[i].scale.set(bw,h,bw);U.eb[i].position.set(x,py+10+bh-h/2,0);U.ef[i].scale.set(bw+4,bh,bw+4);U.ef[i].position.set(x,py+10+bh/2,0);});
    const G=U.G,t0=Math.max(0,S.t-20);setLine(U.c[0],chartLine(G.z,S.h1,G.gx,G.gy,G.gw,G.gh,t0,t0+20,-0.17,0.17));setLine(U.c[1],chartLine(G.z+0.5,S.h2,G.gx,G.gy,G.gw,G.gh,t0,t0+20,-0.17,0.17));}};

/* Detsibel */
SC3.detsibel={build({W,H}){const U=T3.v8={};U.spk=[];for(let k=0;k<10;k++){const gr=grp(),b=new THREE.Mesh(T3.box,mat(0x1b2233,{metal:0.5,rough:0.4})),c=new THREE.Mesh(new THREE.ConeGeometry(1,1,28,1,true),mat(0x9aa6b8,{metal:0.3,rough:0.6,side:1}));b.scale.set(26,56,44);c.rotation.z=Math.PI/2;c.scale.set(18,10,18);c.position.x=13;gr.add(b,c);gr.userData.c=c;U.spk.push(gr);}
    U.rings=[];for(let k=0;k<6;k++){const m=mesh(new THREE.SphereGeometry(1,40,20,-0.9,1.8,Math.PI/2-0.9,1.8),new THREE.MeshBasicMaterial({color:0x5b8cff,transparent:true,opacity:0.2,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}),false);m.rotation.y=Math.PI/2;U.rings.push(m);}
    U.mic=new THREE.Group();const st=new THREE.Mesh(T3.cyl,mat(0x8e9cb2,{metal:0.9}));st.scale.set(2,60,2);st.position.y=30;const hd=new THREE.Mesh(T3.sph,mat(0x3a4252,{metal:0.6,rough:0.3}));hd.scale.setScalar(8);U.mic.add(st,hd);T3.root.add(U.mic);
    U.col=cube(1,1,1,NEON.green,{glow:0.6});U.colf=cube(1,1,1,0x9fc6ff,{glass:1,opacity:0.1});U.th=[0,85,120].map(l=>[rod(1,mat(NEON.red,{glow:1})),l]);U.dist=arrow3(0x8e9cb2);},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const{sx,sy,mx,L}=g,n=P.n|0,dist=mx-sx;U.spk.forEach((s,k)=>{s.visible=k<n;const row=k%5,col=Math.floor(k/5);s.position.set(sx-15-col*30,sy+(row-(Math.min(n,5)-1)/2)*24*(n>1?1:0),(row-2)*0+col*0-(n>1?(row-(Math.min(n,5)-1)/2)*20:0));s.scale.setScalar(n>1?0.55:1);s.userData.c.position.x=13+Math.sin(S.t*40)*1.2;});
    U.rings.forEach((m,i)=>{const r=S.rings[S.rings.length-1-i];m.visible=r!=null;if(r==null)return;const R=Math.max(1,r*dist*1.3);m.scale.setScalar(R);m.position.set(sx,sy,0);m.material.opacity=0.14*(1-r);});
    U.mic.position.set(mx,sy,0);setArrow(U.dist,sx,sy+60,0,mx,sy+60,0,1.4);const bx=W-70,bt=30,bb=H-30,Y=l=>bb-(clamp(l,0,140)/140)*(bb-bt),hl=bb-Y(Math.max(L,0));U.col.scale.set(18,Math.max(1,hl),18);U.col.position.set(bx+19,bb-hl/2,0);U.col.material.color.set(L>120?NEON.red:L>85?0xff8a3a:L>60?NEON.warm:NEON.green);U.colf.scale.set(22,bb-bt,22);U.colf.position.set(bx+19,(bb+bt)/2,0);
    U.th.forEach(([r,l])=>setRod(r,bx+4,Y(l),12,bx+34,Y(l),12));relabel(U,'d',fmt(L,0)+' dB',L>85?'#ff5a5a':'#3fe0a0',26,mx,sy-48,0);}};
