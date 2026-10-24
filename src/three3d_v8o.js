/* ===== v8: 3D sahnalar — magnetizm, optika, nisbiylik, yadro ===== */
const ISO_COL=['#ff6b6b','#ffd23f','#5fd4ff','#b07cff'];
function lineSeg(col,o){return line3(col,2,o);}

/* Mass-spektrometr */
SC3.massspektr={build({W,H}){const U=T3.v8={};const g=S.g||{ex:W*0.22,ey:H*0.2};const{ex,ey}=g,D=120;const ch=cube(W-ex-10,H-ey-10,D,0x2a3060,{opacity:0.12,glow:0.05});ch.position.set(ex+(W-ex-10)/2,ey+(H-ey-10)/2,0);ch.castShadow=false;
    U.Bf=inst(400,T3.cone,mat(NEON.violet,{glow:0.8,opacity:0.6}));let n=0;for(let x=ex+24;x<W-14;x+=48)for(let y=ey+24;y<H-14;y+=48){if(n<400){setIR(U.Bf,n,x,y,D/2+2,0,2.2,7,2.2,Math.PI/2);n++;}}U.Bf.count=n;U.Bf.instanceMatrix.needsUpdate=true;
    const src=cube(36,22,36,0x3a4252,{metal:0.8});src.position.set(ex,15,0);const p1=cube(40,3,40,NEON.red,{glow:0.6,metal:0.6});p1.position.set(ex,32,0);[-1,1].forEach(s=>{const p=cube(15,3,40,NEON.accent,{glow:0.6,metal:0.6});p.position.set(ex+s*12.5,ey-14,0);});
    const det=cube(W-ex-20,4,D*0.8,0x1b2233,{metal:0.6});det.position.set(ex+10+(W-ex-20)/2,ey-2,0);U.arc=[0,1,2,3].map(i=>line3(new THREE.Color(ISO_COL[i]).getHex(),61,{opacity:0.35}));U.ion=pInst(200);U.hit=[0,1,2,3].map(i=>cube(1,1,1,new THREE.Color(ISO_COL[i]).getHex(),{glow:1.4}));},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('massspektr'),iso=sim.ISO[P.el|0],{ex,ey,sc}=g;
    U.arc.forEach((l,k)=>{l.visible=k<iso.length;if(!l.visible)return;const r=sim.r(iso[k][0],P)*sc,pts=[];for(let i=0;i<=60;i++){const a=Math.PI*i/60;pts.push([ex+r-r*Math.cos(a),ey+r*Math.sin(a),0]);}setLine(l,pts);});
    let n=0;S.ions.forEach(o=>{if(n>=200)return;const r=sim.r(iso[o.k][0],P)*sc;let x,y;if(o.ph<0.15){x=ex;y=26+(ey-26)*o.ph/0.15;}else{const a=Math.PI*(o.ph-0.15)/0.85;x=ex+r-r*Math.cos(a);y=ey+r*Math.sin(a);}setI(U.ion,n,x,y,0,3.6);pCol(U.ion,n,ISO_COL[o.k]);n++;});pDone(U.ion,n);
    U.hit.forEach((m,k)=>{m.visible=k<iso.length;if(!m.visible)return;const cnt=S.hits.filter(h=>h===k).length,hx=ex+2*sim.r(iso[k][0],P)*sc,h=Math.max(1,Math.min(60,cnt*0.4));m.scale.set(4,h,10);m.position.set(hx,ey-4-h/2,0);});}};

/* RL zanjir */
SC3.rl={build({W,H}){const U=T3.v8={};const g=S.g||{L:50,R:W*0.5,T:40,B:H*0.5};const{L,R,T,B}=g,my=(T+B)/2,kx=L+60;U.my=my;wires([[L,my-34],[L,T],[kx,T]],false);wires([[kx+40,T],[R,T],[R,T+20]],false);wires([[R,T+108],[R,B],[L+160,B]],false);wires([[L+120,B],[L,B],[L,my+34]],false);
    wires([[R,T+10],[R+50,T+10],[R+50,my-26]],false);wires([[R+50,my+26],[R+50,B-10],[R,B-10]],false);battery3(L,my);const rs=resistor3();rs.position.set(L+140,B,0);rs.scale.setScalar(0.62);
    U.coil=coil3(R,T+64,14,88,9);U.core=mesh(T3.cyl,mat(0x5a6378,{metal:0.9}));U.core.scale.set(6,96,6);U.core.position.set(R,T+64,0);U.bulb=bulb3(R+50,my);U.bulb.rotation.z=Math.PI/2;U.sw=rod(2.4,mat(0xdfe6f5,{metal:1}));[kx,kx+40].forEach(x=>{const b=ball(5,0xdfe6f5,{metal:1});b.position.set(x,T,0);});
    U.dot=pInst(160);const gx=40,gy=B+40,gw=W-80,gh=H-gy-24;U.G={gx,gy,gw,gh,z:chart3(gx,gx+gw,gy,gy+gh)};U.cv=curve3(NEON.accent,1000);U.im=line3(0x8e9cb2,2,{opacity:0.6});U.mk=ball(5,NEON.warm,{glow:1.5});U.lines=[];},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const{L,R,T,B}=g,my=U.my,kx=L+60,Imax=P.E/P.R,lv=clamp(S.I/Imax,0,1);setRod(U.sw,kx,T,0,kx+40,S.on?T:T-22,0);
    const gl=S.on?0:lv;U.bulb.userData.fm.emissiveIntensity=0.1+gl*3;U.bulb.userData.lt.intensity=gl*2;U.coil.material.emissiveIntensity=lv*0.6;
    let n=0;n=S.on?dotsOn(U.dot,0,[[L,T],[R,T],[R,B],[L,B],[L,T]],S.ph,1,'#ffb347'):dotsOn(U.dot,0,[[R,T+10],[R+50,T+10],[R+50,B-10],[R,B-10]],S.ph,-1,'#ffb347');pDone(U.dot,Math.min(n,160));
    const G=U.G,t0=Math.max(0,S.t-12);setLine(U.cv,chartLine(G.z,S.hist,G.gx,G.gy,G.gw,G.gh,t0,t0+12,0,Imax*1.15));setLine(U.im,chartLine(G.z,[[t0,Imax],[t0+12,Imax]],G.gx,G.gy,G.gw,G.gh,t0,t0+12,0,Imax*1.15));U.mk.position.set(...chartLine(G.z+2,[[S.t,S.I]],G.gx,G.gy,G.gw,G.gh,t0,t0+12,0,Imax*1.15)[0]);}};

/* RLC */
SC3.rlc={cam:[3.5,2.6,14.5,0,-0.2,0],build({W,H}){const U=T3.v8={};const g=S.g||{cx:W*0.2,cy:H*0.3};U.ar={R:arrow3(NEON.green),L:arrow3(NEON.warm),C:arrow3(NEON.accent),U:arrow3(NEON.red)};U.I=rod(1,mat(NEON.violet,{glow:1}));U.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.01,6,80),mat(0x8e9cb2,{opacity:0.5}));T3.root.add(U.ring);
    U.hx=line3(NEON.red,240,{opacity:0.8});U.hi=line3(NEON.violet,240,{opacity:0.6});U.hist=[];const gx=W*0.42,gw=W*0.54,gt=24,gh=H*0.36;U.G1={gx,gw,gt,gh,z:chart3(gx,gx+gw,gt,gt+gh)};U.u=curve3(NEON.red,201);U.i=curve3(NEON.violet,201);
    const t2=gt+gh+50,h2=H-t2-24;U.G2={gx:40,gw:W-80,gt:t2,gh:h2,z:chart3(40,W-40,t2,t2+h2)};U.res=curve3(NEON.accent,201);U.f0=rod(1,mat(NEON.green,{glow:0.8}));U.mk=ball(5,NEON.warm,{glow:1.5});},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('rlc'),k=sim.calc(P),ph=S.t*TAU*0.5,{cx,cy}=g,sc=Math.min(W,H)*0.2/Math.max(P.U,k.I*Math.max(k.XL,k.XC,P.R)),rot=(a,m)=>[cx+Math.cos(ph+a)*m*sc,cy-Math.sin(ph+a)*m*sc];
    [['R',0,k.I*P.R],['L',Math.PI/2,k.I*k.XL],['C',-Math.PI/2,k.I*k.XC],['U',k.phi,P.U]].forEach(([n,a,m])=>{const p=rot(a,m);setArrow(U.ar[n],cx,cy,n==='U'?3:0,p[0],p[1],n==='U'?3:0,n==='U'?3:2.4);});const pi=rot(0,P.U*0.5);setRod(U.I,cx,cy,-2,pi[0],pi[1],-2);U.ring.scale.setScalar(P.U*sc);U.ring.position.set(cx,cy,0);
    const hu=[],hi=[];for(let i=0;i<240;i++){const tt=ph-i*0.04,z=-i*1.6;hu.push([cx+Math.cos(tt+k.phi)*P.U*sc,cy-Math.sin(tt+k.phi)*P.U*sc,z]);hi.push([cx+Math.cos(tt)*P.U*0.5*sc,cy-Math.sin(tt)*P.U*0.5*sc,z]);}setLine(U.hx,hu);setLine(U.hi,hi);
    const G=U.G1,ui=[],ii=[];for(let i=0;i<=200;i++){const x=i/200*2*TAU;ui.push([i/200*2,P.U*Math.sin(x+ph+k.phi)]);ii.push([i/200*2,0.7*P.U*Math.sin(x+ph)]);}setLine(U.u,chartLine(G.z,ui,G.gx,G.gt,G.gw,G.gh,0,2,-P.U*1.1,P.U*1.1));setLine(U.i,chartLine(G.z+0.5,ii,G.gx,G.gt,G.gw,G.gh,0,2,-P.U*1.1,P.U*1.1));
    const G2=U.G2,fx=[];let Im=0;for(let i=0;i<=200;i++){const f=10+i*490/200,q=sim.calc(P,f);fx.push([f,q.I]);Im=Math.max(Im,q.I);}setLine(U.res,chartLine(G2.z,fx,G2.gx,G2.gt,G2.gw,G2.gh,10,500,0,Im*1.12));const x0=G2.gx+(k.f0-10)/490*G2.gw;U.f0.visible=k.f0>10&&k.f0<500;setRod(U.f0,x0,G2.gt,G2.z+1,x0,G2.gt+G2.gh,G2.z+1);U.mk.position.set(...chartLine(G2.z+2,[[P.f,k.I]],G2.gx,G2.gt,G2.gw,G2.gh,10,500,0,Im*1.12)[0]);}};

/* Ko‘z */
SC3.koz={build({W,H}){const U=T3.v8={};const g=S.g||{ex:W*0.62,ey:H*0.42,er:Math.min(W*0.2,H*0.3)};const{ex,ey,er}=g;const eye=mesh(new THREE.SphereGeometry(er,48,32),mat(0xf0f4ff,{glass:1,opacity:0.16}),false);eye.position.set(ex,ey,0);
    const ret=mesh(new THREE.SphereGeometry(er-3,48,32,-0.75,1.5,Math.PI/2-0.75,1.5),mat(0xd04848,{glow:0.5,side:1,rough:0.6}),false);ret.position.set(ex,ey,0);ret.rotation.y=Math.PI;
    const ir=new THREE.Mesh(new THREE.TorusGeometry(er*0.3,er*0.07,10,48),mat(0x3a7bd5,{metal:0.2,rough:0.5}));ir.rotation.y=Math.PI/2;ir.position.set(ex-er*0.93,ey,0);T3.root.add(ir);const nv=rod(er*0.12,mat(0xe8c87a,{rough:0.6}));setRod(nv,ex+er,ey,0,ex+er*1.5,ey+er*0.2,0);
    U.lens=ball(1,0xa0c8ff,{opacity:0.55,metal:0.1,rough:0.05,glow:0.2});U.gl=lensMesh(-1,er*0.5);U.gl2=lensMesh(1,er*0.5);U.rays=[];for(let i=0;i<8;i++)U.rays.push(line3(NEON.warm,5,{opacity:0.85}));U.obj=ball(6,NEON.warm,{glow:1.5});U.spot=ball(1,NEON.green,{glow:2});U.fp=ball(3,NEON.green,{glow:2});},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const k=simOf('koz').calc(P),{ex,ey,er,lx}=g,ret=ex+er*0.95,mm=(ret-lx)/17,bul=(k.Pe-k.Pf)/10;U.lens.scale.set(6+bul*8,er*0.38,er*0.38);U.lens.position.set(lx,ey,0);
    const gx=P.gl?lx-40:lx,conc=k.G<0;U.gl.forEach(o=>{o.visible=!!P.gl&&conc;o.position.set(lx-40,ey,0);});U.gl2.forEach(o=>{o.visible=!!P.gl&&!conc;o.position.set(lx-40,ey,0);});
    const vpx=k.v*1000*mm,fx=lx+vpx,Dpx=P.d*1000*mm,ox=24;U.obj.visible=Dpx<gx-ox;U.obj.position.set(gx-Dpx,ey,0);
    U.rays.forEach((l,i)=>{const a=i/8*TAU,h=(i%2?0.3:0.18)*er,c=Math.cos(a),s=Math.sin(a),xs=Math.max(ox,gx-Dpx),f=1-(gx-xs)/Dpx,u=(ret-lx)/vpx,hr=h*(1-u);setLine(l,[[xs,ey+h*f*c,h*f*s],[gx,ey+h*c,h*s],[lx,ey+h*c,h*s],[ret,ey+hr*c,hr*s]]);});
    const sharp=Math.abs(fx-ret)<3,blur=Math.abs(1-(ret-lx)/vpx)*0.3*er;U.spot.scale.set(2,Math.max(3,blur),Math.max(3,blur));U.spot.position.set(ret-1,ey,0);U.spot.material=mat(sharp?NEON.green:NEON.red,{glow:2,opacity:0.8});U.fp.visible=fx<ret+40&&fx>lx;U.fp.position.set(fx,ey,0);}};

/* Bitta tirqish */
SC3.tirqish={cam:[3.2,2.4,14.5,0,-0.2,0],build({W,H}){const U=T3.v8={};U.D=160;U.w=[cube(1,1,1,0x3a4252,{metal:0.8,rough:0.3}),cube(1,1,1,0x3a4252,{metal:0.8,rough:0.3})];U.pl=[];for(let i=0;i<16;i++)U.pl.push(mesh(T3.box,new THREE.MeshBasicMaterial({color:0xff3030,transparent:true,opacity:0.035,blending:THREE.AdditiveBlending,depthWrite:false}),false));
    U.arcs=[];for(let i=0;i<24;i++)U.arcs.push(mesh(new THREE.CylinderGeometry(1,1,1,48,1,true,0.37,2.4),new THREE.MeshBasicMaterial({color:0xff3030,transparent:true,opacity:0.2,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false}),false));
    U.cv=document.createElement('canvas');U.cv.width=8;U.cv.height=256;U.tx=new THREE.CanvasTexture(U.cv);U.scr=mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:U.tx,side:THREE.DoubleSide}),false);U.scr.rotation.y=-Math.PI/2;U.frame=cube(1,1,1,0x1b2233,{metal:0.6});U.Ic=line3(0xffffff,200);U.key='';U.mins=[];for(let i=0;i<6;i++)U.mins.push(line3(0x8e9cb2,2,{opacity:0.3}));},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('tirqish'),{sx,cy,scrX,half}=g,D=U.D,col=wl2rgb(P.l),gap=clamp(P.a/100*60,4,60),Y=y=>cy-y/half*(H*0.4);
    U.w[0].scale.set(8,cy-gap/2-20,D);U.w[0].position.set(sx,(20+cy-gap/2)/2,0);U.w[1].scale.set(8,H-20-cy-gap/2,D);U.w[1].position.set(sx,(cy+gap/2+H-20)/2,0);
    const lam=14,off=(S.t*40)%lam;U.pl.forEach((m,i)=>{const x=20+i*lam+off;m.visible=x<sx-4;m.scale.set(1.2,H*0.6,D*0.9);m.position.set(x,cy,0);m.material.color.set(col);});
    U.arcs.forEach((m,i)=>{const r=off+i*lam;m.visible=r>1&&r<scrX-sx;m.scale.set(r,D*0.9,r);m.rotation.x=Math.PI/2;m.rotation.y=0;m.position.set(sx,cy,0);m.rotation.set(Math.PI/2,0,-Math.PI/2);m.material.color.set(col);m.material.opacity=0.1*(1-r/(scrX-sx));});
    const key=[P.a,P.l,P.L,H].join();if(U.key!==key){U.key=key;const x=U.cv.getContext('2d'),c=new THREE.Color(col);for(let py=0;py<256;py++){const yy=10+py/256*(H-20),y=(cy-yy)/(H*0.4)*half,I=Math.pow(sim.I(P,y),0.5);x.fillStyle=`rgb(${Math.round(c.r*255*I)},${Math.round(c.g*255*I)},${Math.round(c.b*255*I)})`;x.fillRect(0,py,8,1);}U.tx.needsUpdate=true;}
    U.scr.scale.set(D,H-20,1);U.scr.position.set(scrX,H/2,0);U.frame.scale.set(4,H-16,D+6);U.frame.position.set(scrX+3,H/2,0);U.Ic.material.color.set(col);
    const pts=[];for(let i=0;i<200;i++){const py=10+i/199*(H-20),y=(cy-py)/(H*0.4)*half;pts.push([scrX+30+sim.I(P,y)*(W-scrX-60),py,0]);}setLine(U.Ic,pts);
    let m=0;for(let k=1;k<=3;k++){const yk=P.L*Math.tan(Math.asin(Math.min(1,k*P.l*1e-9/(P.a*1e-6))));[1,-1].forEach(s=>{setLine(U.mins[m++],[[sx,cy,0],[scrX,Y(s*yk),0]]);});}}};

/* Teleskop */
SC3.teleskop={build({W,H}){const U=T3.v8={};U.key='';U.tube=mesh(T3.cyl,mat(0x2a3246,{metal:0.6,rough:0.4,opacity:0.35}),false);U.rays=[];for(let i=0;i<9;i++)U.rays.push(line3(NEON.warm,4,{opacity:0.9}));U.fp=ball(3,NEON.red,{glow:2});
    const g=S.g||{};const vx=W*0.86,mr=Math.min(W*0.1,H*0.17);U.m1=ball(1,0xe8e4d8,{rough:0.9});U.m2=ball(1,0xe8e4d8,{rough:0.9});U.cr=[];for(let i=0;i<3;i++)U.cr.push(ball(1,0x8a877c,{rough:0.9}));U.fr=[0,1].map(()=>{const r=new THREE.Mesh(new THREE.TorusGeometry(mr,1.2,6,60),mat(0x8e9cb2,{opacity:0.6}));T3.root.add(r);return r;});U.vx=vx;U.mr=mr;},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const gal=P.tp==1,{x0,sc,cy,ex,fp}=g,lh=H*0.16,ox=x0,a=P.al*D2R,G=P.F1/P.F2,va=6,key=[P.tp,ex,lh].join();
    if(U.key!==key){U.key=key;(U.L||[]).forEach(o=>T3.root.remove(o));U.L=[...lensMesh(1,lh),...lensMesh(gal?-1:1,lh*0.5)];U.L.slice(0,2).forEach(o=>o.position.set(ox,cy,0));U.L.slice(2).forEach(o=>o.position.set(ex,cy,0));}
    U.tube.rotation.z=Math.PI/2;U.tube.scale.set(lh+6,ex-ox,lh+6);U.tube.position.set((ox+ex)/2,cy,0);
    const ta=Math.tan(a*va),yimg=cy+P.F1*sc*ta,bt=Math.tan(Math.min(Math.atan(G*ta),1.2));let n=0;[-0.8,0,0.8].forEach(u=>[0,1,2].forEach(j=>{const ang=j*Math.PI/3,c=Math.cos(ang),s=Math.sin(ang),h=u*lh,y0=cy+h*c,z0=h*s,xs=10,ys=y0-(ox-xs)*ta,f=(ex-ox)/(fp-ox),y1=y0+(yimg-y0)*f,z1=z0*(1-f),x2=W*0.72;
      setLine(U.rays[n++],[[xs,ys,z0],[ox,y0,z0],[ex,y1,z1],[x2,y1+(gal?1:-1)*bt*(x2-ex),z1*(gal?1:-1)*0+z1]]);}));U.fp.visible=!gal;U.fp.position.set(fp,yimg,0);
    const vx=U.vx,mr=U.mr,vy1=H*0.25,vy2=H*0.68,m0=mr*0.09,m1=Math.min(mr*0.95,m0*G);U.fr[0].position.set(vx,vy1,0);U.fr[1].position.set(vx,vy2,0);U.m1.scale.setScalar(m0);U.m1.position.set(vx,vy1,0);U.m2.scale.setScalar(m1);U.m2.position.set(vx,vy2,0);U.m2.rotation.z=gal?0:Math.PI;
    [[0.3,-0.2,0.18],[-0.25,0.15,0.12],[0.05,0.35,0.1]].forEach(([dx,dy,r],i)=>{const s=gal?1:-1;U.cr[i].scale.setScalar(r*m1);U.cr[i].position.set(vx+dx*m1*s,vy2+dy*m1*s,m1*0.82);});}};

/* Egizaklar paradoksi */
SC3.egizak={build({W,H}){const U=T3.v8={};U.earth=mesh(T3.sph,new THREE.MeshStandardMaterial({map:earthTex(),roughness:0.7,metalness:0.1}));U.earth.scale.setScalar(16);U.star=ball(10,0xffd23f,{glow:2.4});U.sh=halo(26,0xffb040,0.25);U.lt=new THREE.PointLight(0xffe0a0,1.2,0,2);T3.root.add(U.lt);
    U.ship=new THREE.Group();const b=new THREE.Mesh(T3.cyl,mat(0xdfe6f5,{metal:0.8,rough:0.25}));b.rotation.z=Math.PI/2;b.scale.set(5,26,5);const n=new THREE.Mesh(T3.cone,mat(NEON.warm,{metal:0.5,glow:0.4}));n.rotation.z=-Math.PI/2;n.scale.set(5,10,5);n.position.x=18;const fl=new THREE.Mesh(T3.cone,new THREE.MeshBasicMaterial({color:0x5fd4ff,transparent:true,opacity:0.8,blending:THREE.AdditiveBlending}));fl.rotation.z=Math.PI/2;fl.scale.set(4,14,4);fl.position.x=-20;U.ship.add(b,n,fl);U.ship.userData.fl=fl;T3.root.add(U.ship);
    const gx=W*0.5,gw=W*0.46,gt=24,gh=H-56;U.G={gx,gw,gt,gh,z:chart3(gx,gx+gw,gt,gt+gh)};U.wl=line3(NEON.warm,3);U.wl0=line3(NEON.warm,3,{opacity:0.3});U.sg=[];for(let i=0;i<40;i++)U.sg.push(line3(NEON.green,2,{opacity:0.55}));U.dS=ball(5,NEON.warm,{glow:1.5});U.dE=ball(5,NEON.accent,{glow:1.5});U.ax=rod(1.4,mat(NEON.accent,{glow:1}));U.rc=pInst(40);
    const sg=new THREE.BufferGeometry(),pp=[];for(let i=0;i<400;i++)pp.push(Math.random()*W*1.6-W*0.3,Math.random()*H*1.6-H*0.3,-300-Math.random()*300);sg.setAttribute('position',new THREE.Float32BufferAttribute(pp,3));T3.root.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:1.3,sizeAttenuation:false})));},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const T=2*P.D/P.b,gm=1/Math.sqrt(1-P.b*P.b),t=S.t,{ax,aw,ay,xs}=g,X=x=>ax+x/P.D*aw,tau=t/gm;U.earth.position.set(X(0),ay,0);U.earth.rotation.y=t*2;U.star.position.set(X(P.D),ay,0);U.sh.position.copy(U.star.position);U.lt.position.set(X(P.D),ay,40);
    U.ship.position.set(X(xs),ay-34,0);U.ship.rotation.y=t>=T/2?Math.PI:0;U.ship.userData.fl.visible=S.t<T;
    relabel(U,'e','Yer: '+fmt(t,1)+' yil','#5b8cff',22,ax+60,H*0.5,0);relabel(U,'s','Kemada: '+fmt(tau,1)+' yil','#ffb347',22,ax+60,H*0.5+40,0);
    const G=U.G,TX=x=>G.gx+x/P.D*G.gw*0.9,TY=tt=>G.gt+G.gh-tt/T*G.gh,z=G.z,tt=Math.min(t,T);setRod(U.ax,G.gx,G.gt,z,G.gx,G.gt+G.gh,z);setLine(U.wl0,[[TX(0),TY(0),z],[TX(P.D),TY(T/2),z],[TX(0),TY(T),z]]);
    setLine(U.wl,tt<=T/2?[[TX(0),TY(0),z+0.5],[TX(P.b*tt),TY(tt),z+0.5]]:[[TX(0),TY(0),z+0.5],[TX(P.D),TY(T/2),z+0.5],[TX(P.b*(T-tt)),TY(tt),z+0.5]]);
    let rc=0;U.sg.forEach((l,i)=>{const k=i+1;l.visible=k<=Math.floor(T)&&k<=tt;if(!l.visible)return;const te=k/(1-P.b)<=T/2?k/(1-P.b):(k+P.b*T)/(1+P.b),xe=te<=T/2?P.b*te:P.b*(T-te),xend=Math.min(xe,tt-k),tend=k+xend;setLine(l,[[TX(0),TY(k),z+0.3],[TX(xend),TY(tend),z+0.3]]);if(te<=tt&&rc<40){setI(U.rc,rc,TX(xe),TY(te),z+1,2.6);pCol(U.rc,rc,'#3fe0a0');rc++;}});pDone(U.rc,rc);
    U.dS.position.set(TX(xs),TY(tt),z+2);U.dE.position.set(TX(0),TY(tt),z+2);}};

/* Vilson kamerasi */
SC3.vilson={build({W,H}){const U=T3.v8={};U.D=140;const gl=cube(W,H,U.D,0x9fc6ff,{glass:1,opacity:0.06});gl.position.set(W/2,H/2,0);const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(W,H,U.D)),new THREE.LineBasicMaterial({color:0x2a4cbb}));e.position.set(W/2,H/2,0);T3.root.add(e);
    const bk=cube(W,H,2,0x05070d,{rough:1});bk.position.set(W/2,H/2,-U.D/2);U.L=[];for(let i=0;i<60;i++)U.L.push(line3(0xe6ecf5,1500,{opacity:0.85}));U.src=cube(16,14,16,0x5a6378,{metal:0.8});U.fog=pInst(300);U.lt=new THREE.PointLight(0xbfe0ff,0.6,0,2);U.lt.position.set(W/2,-40,80);T3.root.add(U.lt);},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const cols={a:'#ff8a8a',b:'#9fc6ff',m:'#9ff0c8',p:'#ffd27a'};U.L.forEach((l,i)=>{const tk=S.tr[i];l.visible=!!tk;if(!tk)return;const z=((hash1(tk.x*7+tk.ang*13)-0.5)*U.D*0.7);setLine(l,tk.pts.map(p=>[p[0],p[1],z]));l.material.opacity=clamp(1-(tk.age-1.6)/1.6,0,1)*(tk.ty==='a'?1:0.75);l.material.color.set(cols[tk.ty]);});
    U.src.visible=(P.src|0)!==3;U.src.position.set(W*0.12-7,H*0.55,0);let n=0;for(let i=0;i<300;i++){const x=(hash1(i)*W+S.t*6*(hash1(i+1)-0.5)*20+W)%W,y=(hash1(i+2)*H+S.t*3)%H,z=(hash1(i+3)-0.5)*U.D;setI(U.fog,n,x,y,z,1.2);pCol(U.fog,n,'#6a7a99');n++;}pDone(U.fog,n);}};

/* Yadro reaksiyalari */
function nucPts(A){const R=Math.cbrt(A),o=[],ga=Math.PI*(3-Math.sqrt(5));for(let i=0;i<A;i++){const r=R*Math.cbrt((i+0.5)/A),y=1-2*((i*0.618+0.5)%1),rr=Math.sqrt(1-y*y),a=i*ga;o.push([Math.cos(a)*rr*r,y*r,Math.sin(a)*rr*r]);}return o;}
SC3.reaksiya={cam:[2,2,14,0,-0.4,0],build({W,H}){const U=T3.v8={};U.n=inst(900,T3.sph,new THREE.MeshStandardMaterial({color:0xffffff,metalness:0.3,roughness:0.35}));U.fl=halo(1,0xfff0b4,0.6);U.cache={};U.lt=new THREE.PointLight(0xfff0c0,0,0,2);T3.root.add(U.lt);},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const{cx,cy,k}=g,r=k.r,t=S.t,rad=m=>5+Math.cbrt(m)*4.2;let n=0;const C=new THREE.Color();
    const nuc=(x,y,name,m,Z,A,spin)=>{if(!A)return;const pts=U.cache[A]||(U.cache[A]=nucPts(A)),R=rad(m)*0.92/Math.max(1,Math.cbrt(A)),s=A===1?rad(m)*0.9:R*0.98,cs=Math.cos(spin),sn=Math.sin(spin);pts.forEach((p,i)=>{if(n>=900)return;const px=p[0]*cs-p[2]*sn,pz=p[0]*sn+p[2]*cs;setI(U.n,n,x+px*R,y+p[1]*R,pz*R,s);const isP=hash1(i*1.37+A)<Z/A;C.set(isP?0xff5a5a:0x9aa6b8);U.n.setColorAt(n,C);n++;});};
    const sp=t*0.8;U.fl.visible=false;U.lt.intensity=0;
    if(t<1.4){const u=t/1.4;nuc(cx-W*0.38*(1-u),cy,r.a[0],r.a[1],r.a[2],r.a[3],sp);nuc(cx,cy,r.A[0],r.A[1],r.A[2],r.A[3],sp*0.5);}
    else if(t<1.7){const fl=1-(t-1.4)/0.3;U.fl.visible=true;U.fl.scale.setScalar(30+40*(1-fl));U.fl.position.set(cx,cy,0);U.fl.material.opacity=fl*0.7;U.lt.intensity=fl*3;U.lt.position.set(cx,cy,60);nuc(cx,cy,'',r.a[1]+r.A[1],r.a[2]+r.A[2],r.a[3]+r.A[3],sp);}
    else if(k.ok){const u=t-1.7,m=r.p.length,Kt=Math.max(k.Kout,0.05),pm=r.p.map(x=>x[1]);r.p.forEach((pp,i)=>{let ang=m===2?(i?Math.PI+0.5:0.5):(-Math.PI/2+i*TAU/m),v;if(m===2){const E=Kt*(i?pm[0]:pm[1])/(pm[0]+pm[1]);v=Math.sqrt(2*E/pp[1]);}else v=Math.sqrt(2*Kt/m/pp[1]);const vv=Math.min(v*40,220)*u;nuc(cx+Math.cos(ang)*vv,cy-Math.sin(ang)*vv,pp[0],pp[1],pp[2],pp[3],sp+i);});}
    else{nuc(cx,cy,r.A[0],r.A[1],r.A[2],r.A[3],sp*0.5);nuc(cx-40-(t-1.7)*60,cy,r.a[0],r.a[1],r.a[2],r.a[3],sp);}
    U.n.count=n;U.n.instanceMatrix.needsUpdate=true;if(U.n.instanceColor)U.n.instanceColor.needsUpdate=true;relabel(U,'q','Q = '+(k.Q>0?'+':'')+fmt(k.Q,2)+' MeV',k.Q>0?'#3fe0a0':'#ff5a5a',30,W*0.78,H*0.8,0);}};
