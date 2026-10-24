/* ===== v8: 3D sahnalar — kvant fizikasi ===== */
const _c8=()=>T3._c8||(T3._c8=new THREE.Color());
function pInst(n){return inst(n,T3.sph,new THREE.MeshBasicMaterial({color:0xffffff}));}
function pCol(im,i,css){_c8().set(css);im.setColorAt(i,_c8());}
function pDone(im,n){im.count=n;im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;}
function halo(r,col,op=0.22){const m=mesh(T3.sph,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,depthWrite:false,blending:THREE.AdditiveBlending}),false);m.scale.setScalar(r);return m;}
function helixPts(x0,x1,y,n,f){const o=[];for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,[re,im]=f(x,i/n);o.push([x,y-re,im]);}return o;}
function simOf(id){return SIMS.find(s=>s.id===id);}
function wlHex(l){return l<380?'#8b5cf6':l>750?'#7a2020':wl2rgb(l);}

/* Qora jism */
SC3.qora={build({W,H}){const U=T3.v8={};const g=S.g||{bx:W*0.2,by:H*0.47,R:Math.min(W,H)*0.12,gx:W*0.47,gw:W*0.5,gt:34,gh:H-90};
    U.b=mesh(T3.sph,dynMat(0xffffff,{glow:1.4,metal:0.1,rough:0.6}));U.h=halo(1,0xffffff,0.18);U.lt=new THREE.PointLight(0xffffff,1.5,0,2);T3.root.add(U.lt);
    U.ph=pInst(520);U.z=chart3(g.gx,g.gx+g.gw,g.gt,g.gt+g.gh);U.cv=curve3(NEON.accent,301);U.lm=rod(1.4,mat(NEON.warm,{glow:1.2}));
    U.sp=[];for(let i=0;i<30;i++){const l=380+i*11,m=cube(1,1,6,new THREE.Color(wlHex(l)).getHex(),{glow:1.4});U.sp.push([m,l]);}},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const[r,gg,b]=bbRGB(P.T);U.b.material.color.setRGB(r/255,gg/255,b/255);U.b.material.emissive.setRGB(r/255,gg/255,b/255);U.b.material.emissiveIntensity=clamp(Math.pow(P.T/5800,2)*1.4,0.15,2.4);
    U.b.scale.setScalar(g.R);U.b.position.set(g.bx,g.by,0);U.h.scale.setScalar(g.R*2.2);U.h.position.copy(U.b.position);U.h.material.color.setRGB(r/255,gg/255,b/255);U.lt.position.set(g.bx,g.by,60);U.lt.color.setRGB(r/255,gg/255,b/255);
    let n=0;S.ph.forEach(p=>{if(n>=520)return;const e=(((p.a*9301)%1)+1)%1*1.6-0.8,dx=Math.cos(p.a)*Math.cos(e),dy=Math.sin(p.a)*Math.cos(e),dz=Math.sin(e),rr=g.R+p.r;if(rr>480)return;setI(U.ph,n,g.bx+dx*rr,g.by+dy*rr,dz*rr,2.6);pCol(U.ph,n,wlHex(p.l));n++;});pDone(U.ph,n);
    const X=l=>g.gx+l/3000*g.gw,Y=v=>g.gt+g.gh-v/g.Bm*g.gh,pts=[];for(let i=0;i<=300;i++){const l=10+i*10;pts.push([X(l),Math.max(g.gt,Y(planck(l*1e-9,P.T))),U.z]);}setLine(U.cv,pts);
    const lm=2.898e6/P.T;setRod(U.lm,X(lm),g.gt,U.z,X(lm),g.gt+g.gh,U.z);U.sp.forEach(([m,l])=>{m.scale.set(g.gw/3000*11,8,4);m.position.set(X(l),g.gt+g.gh+8,U.z);});}};

/* Kompton */
SC3.kompton={build({W,H}){const U=T3.v8={};U.e=ball(9,NEON.accent,{glow:0.6,metal:0.4});U.e0=ball(5,0x5a6788,{metal:0.5});U.win=line3(0xb07cff,320);U.wout=line3(0xff8a5a,320);U.trk=line3(NEON.accent,2,{opacity:0.5});
    const gx=W*0.74,gw=W-gx-20,gt=40,gh=H*0.42;U.G={gx,gw,gt,gh};U.z=chart3(gx,gx+gw,gt,gt+gh);U.cv=curve3(NEON.accent,91);U.mk=ball(5,NEON.red,{glow:1.5});const pts=[];for(let i=0;i<=90;i++){const u=i/90;pts.push([gx+u*gw,gt+gh-2.4263*(1-Math.cos(u*Math.PI))/5*gh,U.z]);}setLine(U.cv,pts);
    U.ax=rod(0.8,mat(0x8e9cb2,{opacity:0.4}));},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const q=simOf('kompton').calc(P),t=S.t,tc=1.2,th=P.th*D2R,{ex,ey,L}=g;setRod(U.ax,ex-L*1.2,ey,0,ex+L*1.05,ey,0);U.e0.position.set(ex,ey,0);
    const hel=(x1,y1,x2,y2,lam,ph,l)=>{const dx=x2-x1,dy=y2-y1,d=Math.hypot(dx,dy);if(d<2){l.visible=false;return;}l.visible=true;const ux=dx/d,uy=dy/d,per=6+lam*1.5,o=[];for(let s=0;s<=d;s+=2){const a=(s-ph)/per*TAU;o.push([x1+ux*s-uy*Math.sin(a)*8,y1+uy*s+ux*Math.sin(a)*8,Math.cos(a)*8]);}setLine(l,o);};
    if(t<tc){const hx=ex-L*1.1+(L*1.1)*t/tc;hel(Math.max(ex-L*1.2,hx-140),ey,hx,ey,P.l0,t*300,U.win);U.wout.visible=false;U.e.position.set(ex,ey,0);U.trk.visible=false;}
    else{U.win.visible=false;const u=Math.min(1,(t-tc)/1.6),d1=L*u;hel(ex+Math.cos(th)*Math.max(0,d1-140),ey-Math.sin(th)*Math.max(0,d1-140),ex+Math.cos(th)*d1,ey-Math.sin(th)*d1,q.l1,t*300,U.wout);
      const de=L*0.9*u*Math.min(1,q.pe*1.4+0.1),x=ex+Math.cos(q.phi)*de,y=ey+Math.sin(q.phi)*de;U.e.position.set(x,y,0);U.trk.visible=true;setLine(U.trk,[[ex,ey,0],[x,y,0]]);}
    const G=U.G;U.mk.position.set(G.gx+P.th/180*G.gw,G.gt+G.gh-q.dl/5*G.gh,U.z+2);}};

/* De Broyl */
SC3.debroyl={build({W,H}){const U=T3.v8={};U.w=line3(NEON.accent,900);U.env=line3(0x5a6788,300,{opacity:0.5});U.p=ball(8,NEON.warm,{glow:1});U.big=ball(16,0xd8e86a,{metal:0.2});U.sb=rod(1.6,mat(NEON.ink,{glow:0.5}));U.tk=[0,1].map(()=>rod(1.6,mat(NEON.ink,{glow:0.5})));
    const ry=H-70,rx0=40,rx1=W-40;U.ruler=rod(1.4,mat(0xdfe6f5,{glow:0.3}));setRod(U.ruler,rx0,ry,0,rx1,ry,0);U.R=v=>rx0+(v+36)/34*(rx1-rx0);U.ry=ry;U.mk=mesh(T3.cone,mat(NEON.red,{glow:1.2}));U.mk.rotation.z=Math.PI;
    [[-15,'yadro'],[-10,'atom'],[-7,'virus'],[-5,'hujayra']].forEach(([k,n])=>{const c=cube(3,14,3,NEON.green,{glow:0.8});c.position.set(U.R(k),ry-7,0);const l=label3(n,'#3fe0a0',14);l.position.set(U.R(k),ry-24,0);});},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const q=simOf('debroyl').calc(P),{top,x0,x1}=g,lg=Math.log10(q.l),e=Math.floor(lg),scale=Math.pow(10,e+1)/(x1-x0)*6,lpx=q.l/scale,cx=x0+((S.t*90)%(x1-x0)),sig=Math.max(60,lpx*2.2),wave=DB_P[P.pt][2];
    U.w.visible=U.env.visible=!!wave;if(wave){const o=[],en=[];for(let x=x0;x<=x1;x+=1){const d=x-cx,A=Math.exp(-d*d/(2*sig*sig))*46,a=d/lpx*TAU;o.push([x,top-A*Math.cos(a),A*Math.sin(a)]);}setLine(U.w,o);for(let x=x0;x<=x1;x+=3){const d=x-cx;en.push([x,top-Math.exp(-d*d/(2*sig*sig))*46,0]);}setLine(U.env,en);}
    U.p.visible=!!wave;U.big.visible=!wave;U.p.position.set(cx,top,0);U.big.position.set(cx,top,0);const sb=Math.pow(10,e+1)/scale;setRod(U.sb,x0,top+80,0,x0+sb,top+80,0);setRod(U.tk[0],x0,top+72,0,x0,top+88,0);setRod(U.tk[1],x0+sb,top+72,0,x0+sb,top+88,0);
    U.mk.scale.set(7,14,7);U.mk.position.set(U.R(clamp(lg,-36,-2)),U.ry-12,0);}};

/* Ikki tirqish */
SC3.ikkitirqish={build({W,H}){const U=T3.v8={};const g=S.g||{gx:50,wx:W*0.36,sx:W*0.66,cy:H/2,sh:H*0.42};U.gun=cube(46,30,30,0x3a4252,{metal:0.8,rough:0.3});U.gun.position.set(g.gx-10,g.cy,0);U.tip=ball(6,NEON.accent,{glow:2});U.tip.position.set(g.gx+14,g.cy,0);
    U.wall=[0,1,2].map(()=>cube(1,1,90,0x8a96b0,{metal:0.8,rough:0.3}));U.scr=cube(6,g.sh*2.2,110,0x0b1226,{metal:0.2,rough:0.8});U.scr.position.set(g.sx+4,g.cy,0);U.hit=pInst(3000);U.fly=pInst(200);U.det=ball(7,NEON.red,{glow:1.6});
    U.hist=line3(NEON.warm,201);},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const XW=1e-3,Ys=x=>g.cy-x/XW*g.sh,sep=Math.max(8,P.d/400*80),sw=Math.max(3,P.a/100*14),cy=g.cy;
    const edges=[[cy-g.sh*1.2,cy-sep/2-sw/2],[cy-sep/2+sw/2,cy+sep/2-sw/2],[cy+sep/2+sw/2,cy+g.sh*1.2]];U.wall.forEach((m,i)=>{const[a,b]=edges[i];m.scale.set(8,Math.max(1,b-a),90);m.position.set(g.wx,(a+b)/2,0);});
    U.det.visible=!!P.det;U.det.position.set(g.wx+12,cy-sep/2,30);
    const hs=S.hits,n=Math.min(3000,hs.length),st=hs.length-n;for(let i=0;i<n;i++){const x=hs[st+i],z=((((st+i)*0.61803)%1)-0.5)*90;setI(U.hit,i,g.sx-1,Ys(x),z,2.2);pCol(U.hit,i,'#7fb0ff');}pDone(U.hit,n);
    let m=0;S.fly.forEach(f=>{if(m>=200)return;let x,y;if(f.t<0.5){x=g.gx+(g.wx-g.gx)*f.t/0.5;y=cy;}else{const u=(f.t-0.5)/0.5,ys=cy+f.sl*sep/2;x=g.wx+(g.sx-g.wx)*u;y=ys+(Ys(f.x)-ys)*u;}setI(U.fly,m,x,y,0,3.4);pCol(U.fly,m,'#9fd0ff');m++;});pDone(U.fly,m);
    const bins=new Array(200).fill(0);hs.forEach(x=>{const b=Math.floor((x/XW+1)/2*200);if(b>=0&&b<200)bins[b]++;});const mx=Math.max(1,...bins),pts=bins.map((v,i)=>{const x=((i+0.5)/200*2-1)*XW;return[g.sx+14+v/mx*(W-g.sx-30),Ys(x),0];});setLine(U.hist,pts);}};

/* Noaniqlik */
SC3.noaniqlik={cam:[2.6,2.4,14,0,0.4,0],build({W,H}){const U=T3.v8={};U.re=line3(0x6fa8ff,701);U.env=[line3(NEON.accent,351),line3(NEON.accent,351)];U.ax=rod(0.8,mat(0x8e9cb2,{opacity:0.5}));
    U.pz=chart3(30,W-30,H-40-H*0.26,H-40);U.pg=line3(NEON.warm,301);U.dx=rod(1.6,mat(NEON.red,{glow:1.2}));U.dp=rod(1.6,mat(NEON.red,{glow:1.2}));},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('noaniqlik'),{x0,x1,yt,A,xa,xb}=g,X=x=>x0+(x-xa)/(xb-xa)*(x1-x0);setRod(U.ax,x0,yt,0,x1,yt,0);
    const o=[],e1=[],e2=[];for(let i=0;i<=700;i++){const x=xa+i/700*(xb-xa),p=sim.psi(x,S,P);o.push([X(x),yt-p[0]*A,p[1]*A]);if(i%2===0){const m=Math.sqrt(cabs2(p))*A;e1.push([X(x),yt-m,0]);e2.push([X(x),yt+m,0]);}}setLine(U.re,o);setLine(U.env[0],e1);setLine(U.env[1],e2);
    const tau=QHB/(2*QME*(P.s0*1e-9)**2)*S.t*1e-15,sx=P.s0*Math.sqrt(1+tau*tau),v=QHB*TAU/P.l0*1e9/QME*1e-6,xc=-4+v*S.t;setRod(U.dx,X(xc-sx),yt+A+14,0,X(xc+sx),yt+A+14,0);
    const pb=H-40,ph=H*0.26,p0=TAU/P.l0,sp=1/(2*P.s0),pz=TAU/0.3*1.15,PX=p=>x0+p/pz*(x1-x0),pts=[];for(let i=0;i<=300;i++){const p=i/300*pz;pts.push([PX(p),pb-Math.exp(-((p-p0)**2)/(2*sp*sp))*ph*0.9,U.pz]);}setLine(U.pg,pts);setRod(U.dp,PX(p0-sp),pb-ph*0.9*Math.exp(-0.5),U.pz+1,PX(p0+sp),pb-ph*0.9*Math.exp(-0.5),U.pz+1);}};

/* Potensial o‘ra */
SC3.chuqur={build({W,H}){const U=T3.v8={};U.wl=[0,1].map(()=>cube(1,1,90,0x3a4252,{metal:0.8,rough:0.3}));U.fl=cube(1,6,90,0x2a3246,{metal:0.6});U.lv=[1,2,3,4,5,6].map(()=>rod(1.2,mat(0x8e9cb2,{opacity:0.6})));U.lsel=rod(2,mat(NEON.accent,{glow:1.2}));U.psi=line3(NEON.warm,301);U.den=line3(NEON.accent,301);U.ball=ball(6,NEON.red,{glow:1.4});},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const{wl,wr,bot,top}=g,w=wr-wl;U.wl[0].scale.set(16,bot-top+20,90);U.wl[0].position.set(wl-8,(top+bot)/2-10,0);U.wl[1].scale.set(16,bot-top+20,90);U.wl[1].position.set(wr+8,(top+bot)/2-10,0);U.fl.scale.set(w+32,6,90);U.fl.position.set((wl+wr)/2,bot+3,0);
    U.lv.forEach((r,i)=>setRod(r,wl,g.EY(i+1),-40,wr,g.EY(i+1),-40));const n=P.n,y0=g.EY(n);setRod(U.lsel,wl,y0,-38,wr,y0,-38);const ph=S.t*2*Math.min(n*n,9)*0.6,amp=Math.min(36,(g.EY(1)-g.EY(2))*0.9+18);
    const o=[],d=[];for(let i=0;i<=300;i++){const u=i/300,f=Math.sin(n*Math.PI*u);o.push([wl+u*w,y0-f*Math.cos(ph)*amp,f*Math.sin(ph)*amp]);d.push([wl+u*w,y0-f*f*amp,-20]);}setLine(U.psi,o);setLine(U.den,d);
    const xm=0.5+0.38*Math.sin(S.t*1.7)*0+((((S.t*0.37)%1)+1)%1-0.5)*0;U.ball.visible=false;}};

/* Tunnel effekti */
SC3.tunnel={build({W,H}){const U=T3.v8={};U.bar=mesh(T3.box,mat(0xb07cff,{opacity:0.35,glow:0.4}),false);U.edge=line3(0xb07cff,5);U.eline=rod(1,mat(NEON.warm,{glow:1}));U.psi=line3(0x6fa8ff,401);U.den=line3(NEON.accent,401);U.pi=pInst(120);U.flr=rod(1.2,mat(0x8e9cb2,{opacity:0.6}));},
  update({S,P,W}){const U=T3.v8,g=S.g;if(!g)return;const q=tunSolve(P.E,P.V,P.a),xa=-3,xb=P.a+3,X=x=>g.x0+(x-xa)/(xb-xa)*(g.x1-g.x0),h=g.bot-g.yV;U.bar.scale.set(g.Xa-g.X0,h,70);U.bar.position.set((g.X0+g.Xa)/2,g.yV+h/2,0);setRod(U.flr,g.x0,g.bot,0,g.x1,g.bot,0);setRod(U.eline,g.x0,g.yE,-36,g.x1,g.yE,-36);
    const A=30,ph=S.t*4,o=[],d=[];for(let i=0;i<=400;i++){const x=xa+i/400*(xb-xa),p=cmul(tunSolve(P.E,P.V,P.a).psi(x),[Math.cos(-ph),Math.sin(-ph)]);o.push([X(x),g.yE-p[0]*A,p[1]*A]);d.push([X(x),g.yE-cabs2(p)*A*0.5,-30]);}setLine(U.psi,o);setLine(U.den,d);
    let n=0;S.ps.forEach(p=>{if(n>=120)return;setI(U.pi,n,X(p.x),g.yE-60,0,5);pCol(U.pi,n,p.pass?'#3fe0a0':p.dir<0?'#ff5a5a':'#ffd23f');n++;});pDone(U.pi,n);}};

/* Kvant ossillyator */
SC3.ossillyator={build({W,H}){const U=T3.v8={};U.lv=[];for(let n=0;n<=8;n++)U.lv.push(rod(1.1,mat(0x8e9cb2,{opacity:0.5})));U.par=null;U.key='';U.psi=line3(NEON.warm,301);U.den=line3(NEON.accent,301);U.cl=line3(NEON.red,301,{opacity:0.7});U.sel=rod(2,mat(NEON.accent,{glow:1.2}));},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const{cx,sx,bot,top,EY}=g,X=x=>cx+x*sx;const key=[cx,sx,bot].join();if(U.key!==key){U.key=key;if(U.par)T3.root.remove(U.par);const pts=[];for(let i=0;i<=80;i++){const x=-5+i/80*10,E=x*x/2;if(EY(E)<top)continue;pts.push(new THREE.Vector3(X(x),EY(E),0));}
      const cur=new THREE.CatmullRomCurve3(pts),sh=new THREE.Shape();U.par=new THREE.Group();const tube=new THREE.Mesh(new THREE.TubeGeometry(cur,120,2.4,8,false),mat(0xdfe6f5,{glow:0.4,metal:0.6}));U.par.add(tube);
      const geo=new THREE.BufferGeometry(),vv=[];pts.forEach((p,i)=>{if(i===pts.length-1)return;const q=pts[i+1];[[p,-70],[q,-70],[p,70],[q,-70],[q,70],[p,70]].forEach(([r,z])=>vv.push(r.x,r.y,z));});geo.setAttribute('position',new THREE.Float32BufferAttribute(vv,3));geo.computeVertexNormals();U.par.add(new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:0xb07cff,transparent:true,opacity:0.18,side:THREE.DoubleSide,depthWrite:false})));T3.root.add(U.par);}
    U.lv.forEach((r,n)=>{const E=n+0.5,xt=Math.sqrt(2*E);setRod(r,X(-xt),EY(E),-60,X(xt),EY(E),-60);});const n=P.n,E=n+0.5,y0=EY(E),xt=Math.sqrt(2*E);setRod(U.sel,X(-xt),y0,-58,X(xt),y0,-58);
    const amp=(EY(0.5)-EY(1.5))*1.6,ph=S.t*1.5*(n+0.5),o=[],d=[],cl=[];for(let i=0;i<=300;i++){const x=-5+i/300*10,f=hermPsi(n,x);o.push([X(x),y0-f*Math.cos(ph)*amp,f*Math.sin(ph)*amp]);d.push([X(x),y0-f*f*amp*1.4,-30]);const cd=Math.abs(x)<xt*0.995?1/(Math.PI*Math.sqrt(xt*xt-x*x)):0;cl.push([X(x),y0-Math.min(cd,0.8)*amp*1.4,-32]);}setLine(U.psi,o);setLine(U.den,d);setLine(U.cl,cl);}};

/* Vodorod orbitallari */
SC3.vodorod={cam:[2,2.4,13,-2.6,0,0],build({W,H}){const U=T3.v8={};U.key='';U.pts=null;U.nuc=ball(5,NEON.red,{glow:2});U.lt=new THREE.PointLight(0xff8080,0.8,0,2);T3.root.add(U.lt);U.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.01,6,96),mat(0x8e9cb2,{opacity:0.35}));T3.root.add(U.ring);},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const o=HO[P.o],cx=g.ox+g.side/2,cy=g.oy+g.side/2,sc=g.side/2/g.Rm;U.nuc.position.set(cx,cy,0);U.lt.position.set(cx,cy,40);
    if(U.key!==P.o+'|'+g.side){U.key=P.o+'|'+g.side;if(U.pts){T3.root.remove(U.pts);U.pts.geometry.dispose();}let mx=0;for(let i=0;i<4000;i++){const x=(Math.random()*2-1)*g.Rm,y=(Math.random()*2-1)*g.Rm,z=(Math.random()*2-1)*g.Rm;mx=Math.max(mx,hPsi(o,x,y,z)**2);}
      const pos=[],col=[],N=9000;let k=0,tries=0;while(k<N&&tries<900000){tries++;const x=(Math.random()*2-1)*g.Rm,y=(Math.random()*2-1)*g.Rm,z=(Math.random()*2-1)*g.Rm,ps=hPsi(o,x,y,z);if(Math.random()*mx*1.05<ps*ps){pos.push(x*sc,-z*sc,y*sc);if(ps>=0)col.push(1,0.42,0.38);else col.push(0.37,0.6,1);k++;}}
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));U.pts=new THREE.Points(geo,new THREE.PointsMaterial({size:2.6,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:0.8,depthWrite:false,blending:THREE.AdditiveBlending}));T3.root.add(U.pts);}
    U.pts.position.set(cx,cy,0);U.pts.rotation.y=performance.now()*0.00025;U.ring.scale.setScalar(sc*o[1]*o[1]*0.53*1.0/0.53);U.ring.position.set(cx,cy,0);U.ring.rotation.x=Math.PI/2;}};

/* Shtern–Gerlax */
SC3.spin={build({W,H}){const U=T3.v8={};U.key='';U.mag=[];U.at=pInst(400);U.src=cube(40,36,40,0x4a5160,{metal:0.8,rough:0.3});U.scr=cube(10,1,90,0x11182a,{metal:0.3,rough:0.8});U.spots=pInst(800);U.cnt=[];},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const st=simOf('spin').stages(P),{x0,x1,cy,seg,dy,n}=g;U.src.position.set(x0-30,cy,0);U.scr.scale.set(10,dy*4.8,90);U.scr.position.set(x1+11,cy,0);
    const key=st.join()+'|'+seg;if(U.key!==key){U.key=key;U.mag.forEach(m=>T3.root.remove(m));U.mag=[];st.forEach((ang,k)=>{const gr=new THREE.Group(),mw=seg*0.36,N=new THREE.Mesh(T3.box,mat(0xd24b4b,{metal:0.5,rough:0.35})),Sm=new THREE.Mesh(T3.box,mat(0x3d78d8,{metal:0.5,rough:0.35})),tip=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),mat(0xd24b4b,{metal:0.5,rough:0.35}));
      N.scale.set(mw,dy*1.5,80);N.position.y=-dy*1.65;tip.scale.set(mw*0.5,dy*0.5,40);tip.rotation.z=Math.PI;tip.rotation.y=Math.PI/4;tip.position.y=-dy*0.65;Sm.scale.set(mw,dy*1.5,80);Sm.position.y=dy*1.65;[N,Sm,tip].forEach(o=>{o.castShadow=true;gr.add(o);});gr.position.set(x0+seg*k+seg*0.32+mw/2,cy,0);gr.rotation.x=-ang;T3.root.add(gr);U.mag.push(gr);});}
    let m=0;S.at.forEach(a=>{if(m>=400)return;const x=x0+(x1-x0)*Math.min(a.u,1),k=Math.min(n-1,Math.floor(a.u*n)),f=a.u*n-k;let y=cy,z=0;if(a.ys.length){const yv=a.ys[a.ys.length-1],ang=st[Math.min(k,n-1)],dd=(-yv)*dy*Math.min(1,f*2.2);y=cy+dd*Math.cos(ang);z=dd*Math.sin(ang);}setI(U.at,m,x,y,z,3.6);pCol(U.at,m,a.dead?'#ff5a5a':'#7fb0ff');m++;});pDone(U.at,m);}};

/* Lazer */
SC3.lazer={build({W,H}){const U=T3.v8={};const g=S.g||{cx0:60,cx1:W*0.62,cy:H*0.3,ch:H*0.26};U.rod=mesh(T3.cyl,mat(0xff9a9a,{glass:1,opacity:0.22}),false);U.m1=mesh(T3.cyl,mat(0xdfe6f5,{metal:1,rough:0.05}));U.m2=mesh(T3.cyl,mat(0xbfe0ff,{metal:0.6,rough:0.1,opacity:0.6}));U.at=pInst(60);U.ph=pInst(90);
    U.beam=mesh(T3.cyl,new THREE.MeshBasicMaterial({color:0xff3030,transparent:true,opacity:0.6,blending:THREE.AdditiveBlending,depthWrite:false}),false);U.beam.rotation.z=Math.PI/2;U.lamp=[0,1].map(()=>mesh(T3.cyl,mat(0xfff1c0,{glow:1.5,opacity:0.7}),false));
    U.z=chart3(g.cx0,W-30,H*0.56,H*0.9);U.c1=curve3(NEON.warm,321);U.c2=curve3(0xff4a4a,321);},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const{cx0,cx1,cy,ch}=g,L=cx1-cx0,r=ch*0.42;U.rod.rotation.z=Math.PI/2;U.rod.scale.set(r,L,r);U.rod.position.set((cx0+cx1)/2,cy,0);
    [U.m1,U.m2].forEach((m,i)=>{m.rotation.z=Math.PI/2;m.scale.set(r*1.25,8,r*1.25);m.position.set(i?cx1+6:cx0-8,cy,0);});U.lamp.forEach((m,i)=>{m.rotation.z=Math.PI/2;m.scale.set(5,L*0.9,5);m.position.set((cx0+cx1)/2,cy+(i?1:-1)*(r+12),0);m.material.emissiveIntensity=0.5+P.p*0.4;});
    const ne=Math.round(S.n2*S.at.length);let n=0;S.at.forEach((a,i)=>{const x=cx0+12+a.x*(L-24),y=cy+(a.y-0.5)*r*1.4,z=(a.s-0.5)*r*1.4;setI(U.at,n,x,y,z,4);pCol(U.at,n,i<ne?'#ffb347':'#5a6378');n++;});pDone(U.at,n);
    let m=0;S.fl.forEach((f,i)=>{if(m>=90)return;setI(U.ph,m,cx0+f.x*L,cy+(f.y-0.5)*r*1.2,(((i*0.618)%1)-0.5)*r*1.2,3);pCol(U.ph,m,'#ff4040');m++;});pDone(U.ph,m);
    const out=S.ph*(1-P.R)/0.05*0.25;U.beam.visible=out>0.01;U.beam.scale.set(3+Math.min(4,out),W-cx1,3+Math.min(4,out));U.beam.position.set((cx1+W)/2+8,cy,0);U.beam.material.opacity=Math.min(0.9,out*0.4+0.15);
    const gx=cx0,gw=W-30-gx,gt=H*0.56,gh=H*0.34,mx=Math.max(0.5,...S.hist.map(h=>h[1]));setLine(U.c1,S.hist.map((h,i)=>[gx+i/320*gw,gt+gh/2-h[0]*gh/2,U.z]));setLine(U.c2,S.hist.map((h,i)=>[gx+i/320*gw,gt+gh-h[1]/mx*gh*0.95,U.z]));}};

/* Frank–Gers */
SC3.frankgers={build({W,H}){const U=T3.v8={};const g=S.g||{tx0:60,tx1:W-60,ty:H*0.27,tr:H*0.11};const L=g.tx1-g.tx0+40;U.tube=mesh(T3.cyl,mat(0xbfe0ff,{glass:1,opacity:0.18}),false);U.tube.rotation.z=Math.PI/2;U.tube.scale.set(g.tr,L,g.tr);U.tube.position.set((g.tx0+g.tx1)/2,g.ty,0);
    U.cat=mesh(T3.cyl,mat(0xff7a3a,{glow:1.2,metal:0.6}));U.cat.rotation.z=Math.PI/2;U.cat.scale.set(g.tr*0.8,6,g.tr*0.8);U.cat.position.set(g.tx0,g.ty,0);U.grd=new THREE.Mesh(new THREE.TorusGeometry(g.tr*0.75,1.5,6,40),mat(0xdfe6f5,{metal:1}));U.grd.rotation.y=Math.PI/2;U.grd.position.set(g.tx1-20,g.ty,0);T3.root.add(U.grd);
    U.an=mesh(T3.cyl,mat(0xb8c0d0,{metal:1,rough:0.2}));U.an.rotation.z=Math.PI/2;U.an.scale.set(g.tr*0.8,6,g.tr*0.8);U.an.position.set(g.tx1,g.ty,0);U.e=pInst(300);U.glow=[];for(let k=0;k<7;k++){const m=mesh(T3.cyl,new THREE.MeshBasicMaterial({color:0xc080ff,transparent:true,opacity:0.35,blending:THREE.AdditiveBlending,depthWrite:false}),false);m.rotation.z=Math.PI/2;U.glow.push(m);}
    const gx=g.tx0,gw=g.tx1-g.tx0,gt=H*0.52,gh=H*0.38;U.G={gx,gw,gt,gh};U.z=chart3(gx,gx+gw,gt,gt+gh);U.cv=curve3(NEON.accent,151);U.mk=ball(6,NEON.red,{glow:1.6});},
  update({S,P}){const U=T3.v8,g=S.g;if(!g||!S.curve)return;const{tx0,tx1,ty,tr}=g,U0=S.U,nl=Math.floor(U0/4.9);
    U.glow.forEach((m,k)=>{m.visible=k<nl;if(k<nl){const x=tx0+(tx1-tx0)*((k+1)*4.9/Math.max(U0,0.01));m.scale.set(tr*0.95,10,tr*0.95);m.position.set(x,ty,0);}});
    let n=0;S.e.forEach((e,i)=>{if(n>=300)return;const a=e.y*TAU*1.7,rr=Math.abs(e.y)*tr*1.3;setI(U.e,n,tx0+e.x*(tx1-tx0),ty+Math.cos(a)*rr,Math.sin(a)*rr,2.6);pCol(U.e,n,e.E>=1.5||e.x<0.9?'#7fb0ff':'#ff5a5a');n++;});pDone(U.e,n);
    const G=U.G,mx=Math.max(...S.curve);setLine(U.cv,S.curve.map((v,i)=>[G.gx+i/150*G.gw,G.gt+G.gh-v/mx*G.gh*0.95,U.z]));const k=Math.min(150,Math.round(U0*5));U.mk.position.set(G.gx+k/150*G.gw,G.gt+G.gh-S.curve[k]/mx*G.gh*0.95,U.z+2);}};

/* Yorug‘lik bosimi */
SC3.yorbosim={cam:[1.5,2.5,14,0.5,0,0],build({W,H}){const U=T3.v8={};U.sun=ball(60,0xffd27a,{glow:2.2});U.sun.position.set(-40,H/2,0);U.h=halo(110,0xffb040,0.18);U.h.position.copy(U.sun.position);U.lt=new THREE.PointLight(0xffe0a0,1.6,0,2);U.lt.position.set(40,H/2,80);T3.root.add(U.lt);
    U.sail=cube(4,1,1,0xdfe6f5,{metal:1,rough:0.05});U.ph=pInst(300);U.rig=[0,1,2,3].map(()=>rod(0.8,mat(0xdfe6f5,{metal:0.6})));U.body=ball(10,0x9aa6b8,{metal:0.7});U.F=arrow3(NEON.red);
    const sg=new THREE.BufferGeometry(),pp=[];for(let i=0;i<300;i++)pp.push(Math.random()*W*1.4-W*0.2,Math.random()*H*1.4-H*0.2,-200-Math.random()*300);sg.setAttribute('position',new THREE.Float32BufferAttribute(pp,3));T3.root.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:1.4,sizeAttenuation:false})));},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const{sx,y0,y1}=g,wob=Math.sin(S.t*3)*3,h=y1-y0;U.sail.scale.set(4,h,h*0.9);U.sail.position.set(sx+wob,(y0+y1)/2,0);U.body.position.set(sx+70+wob,(y0+y1)/2,0);
    [[y0,-h*0.45],[y0,h*0.45],[y1,-h*0.45],[y1,h*0.45]].forEach(([y,z],i)=>setRod(U.rig[i],sx+wob,y,z,sx+70+wob,(y0+y1)/2,0));
    let n=0;S.ph.forEach((p,i)=>{if(n>=300)return;const x=40+p.x/0.62*(sx-40),z=(((i*0.618)%1)-0.5)*h*0.8;setI(U.ph,n,x,y0+p.y*h,z,2.6);pCol(U.ph,n,p.d>0?'#ffd27a':'#ffae5a');n++;});pDone(U.ph,n);
    setArrow(U.F,sx+90+wob,(y0+y1)/2,0,sx+90+wob+40+P.r*30,(y0+y1)/2,0,3);}};
