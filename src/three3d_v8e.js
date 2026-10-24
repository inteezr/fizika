/* ===== v8: 3D sahnalar — issiqlik va elektr ===== */
function wireG(gr,pts){wires(pts,false).forEach(o=>gr.add(o));}
function dotsOn(im,n0,pts,ph,I,col,gap=26){if(Math.abs(I)<1e-4)return n0;const L=polyLen(pts),o=((ph%gap)+gap)%gap;let n=n0;for(let s=o;s<L&&n<im.instanceMatrix.count;s+=gap){const p=polyAt(pts,I>0?s:L-s);setI(im,n,p[0],p[1],0,3.6);pCol(im,n,col);n++;}return n;}
function hash1(i){return((Math.sin(i*127.1+11.7)*43758.5453)%1+1)%1;}

/* Van-der-Vaals */
SC3.vandervaals={build({W,H}){const U=T3.v8={};const g=S.g||{cx:36,cw:W*0.2,cb:H-40};floorV(g.cb+6,W,H);cylVessel(g.cx+g.cw/2,g.cw,50,g.cb);U.pis=mesh(T3.cyl,mat(0x5a6378,{metal:0.9,rough:0.25}));U.prod=rod(4,mat(0xdfe6f5,{metal:1}));U.liq=mesh(T3.cyl,LIQ(0x3a8cff,0.7));U.mol=gasInst(70,NEON.warm);U.mol.count=70;
    const gx=g.cx+g.cw+60,gw=W-gx-24,gt=30,gh=H-80;U.G={gx,gw,gt,gh,z:chart3(gx,gx+gw,gt,gt+gh)};U.iso=[0,1,2,3,4,5].map(()=>line3(0x8e9cb2,221,{opacity:0.35}));U.cur=curve3(NEON.accent,221);U.id=line3(NEON.green,221,{opacity:0.6});U.mk=ball(5,NEON.warm,{glow:1.5});U.K=ball(4,NEON.red,{glow:1.5});U.dome=line3(NEON.violet,200,{opacity:0.5});},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('vandervaals'),st=g.st,{cx,cw,cb,top}=g,x=cx+cw/2,r=cw/2-3;U.pis.scale.set(r,12,r);U.pis.position.set(x,top-6,0);setRod(U.prod,x,top-12,0,x,30,0);
    const lf=st.two?(1-st.xg)*st.co.vl/(P.V*1e-6):st.liq?1:0,lh=(cb-top)*Math.min(1,lf);U.liq.visible=lh>0.5;cylY(U.liq,x,cb-lh,cb,r);
    const gh=cb-lh-top;let n=0;if(!st.liq&&S.mol)S.mol.forEach((m,i)=>{const dx=(m.x-0.5)*2*(r-5),zz=(hash1(i)-0.5)*2*Math.sqrt(Math.max(0,(r-5)**2-dx*dx));setI(U.mol,n++,x+dx,top+3+m.y*Math.max(0,gh-6),zz,2.8);});U.mol.count=n;U.mol.instanceMatrix.needsUpdate=true;
    const G=U.G,X=v=>G.gx+(v-50)/750*G.gw,Y=p=>G.gt+G.gh-clamp(p,0,12)/12*G.gh,iso=T=>{const o=[];for(let i=0;i<=220;i++){const V=(55+i*745/220)*1e-6;o.push([V*1e6,sim.p(V,T)/1e6]);}return o;},M=(a,z)=>a.map(([v,p])=>[X(v),Y(p),z]);
    [260,280,300,304.2,320,340].forEach((T,i)=>setLine(U.iso[i],M(iso(T),G.z)));const cur=iso(P.T),co=st.co;setLine(U.cur,M(co?cur.map(([v,p])=>v>co.vl*1e6&&v<co.vg*1e6?[v,co.ps/1e6]:[v,p]):cur,G.z+1));setLine(U.id,M(cur.map(([v])=>[v,sim.R*P.T/(v*1e-6)/1e6]),G.z+0.5));
    U.mk.position.set(X(P.V),Y(st.p/1e6),G.z+3);U.K.position.set(X(3*sim.B*1e6),Y(sim.A/(27*sim.B*sim.B)/1e6),G.z+2);
    if(!U.domeOK){U.domeOK=1;const L=[],R=[];for(let T=250;T<304;T+=1.5){const c=sim.coex(T);if(c){L.push([c.vl*1e6,c.ps/1e6]);R.unshift([c.vg*1e6,c.ps/1e6]);}}setLine(U.dome,M(L.concat(R),G.z+0.6));}}};

/* Qaynash va bosim */
SC3.qaynashbosim={build({W,H}){const U=T3.v8={};const g=S.g||{px:40,pw:W*0.3,pb:H-60,pt:H*0.4};floorV(g.pb+30,W,H);const x=g.px+g.pw/2,r=g.pw/2;
    const pot=mesh(new THREE.CylinderGeometry(r,r*0.96,g.pb-g.pt,48,1,true),mat(0xb8c0d0,{metal:0.95,rough:0.25,side:2}));pot.position.set(x,(g.pt+g.pb)/2,0);const bt=cube(1,1,1,0x8e9cb2,{metal:0.9});bt.geometry=new THREE.CylinderGeometry(r*0.96,r*0.96,4,48);bt.scale.set(1,1,1);bt.position.set(x,g.pb,0);
    U.w=mesh(new THREE.CylinderGeometry(r-2,r*0.96-2,1,48),LIQ(0x3a8cff,0.62));U.lid=mesh(new THREE.CylinderGeometry(r+6,r+6,10,48),mat(0x5a6378,{metal:0.8}));U.val=ball(6,NEON.red,{glow:1});U.st=rod(2,mat(0xdfe6f5,{metal:1}));
    U.bub=inst(300,T3.sph,new THREE.MeshStandardMaterial({color:0xe8f4ff,transparent:true,opacity:0.55,metalness:0.1,roughness:0.05,emissive:0x6fb0ff,emissiveIntensity:0.25}));
    U.fl=[];for(let k=0;k<7;k++){const f=mesh(T3.cone,new THREE.MeshBasicMaterial({color:0xff8a2a,transparent:true,opacity:0.85,blending:THREE.AdditiveBlending,depthWrite:false}),false);U.fl.push(f);}const bn=mesh(new THREE.TorusGeometry(r*0.6,4,8,40),mat(0x3a4252,{metal:0.8}));bn.rotation.x=Math.PI/2;bn.position.set(x,g.pb+22,0);
    U.tg=mesh(T3.cyl,mat(0xbfe0ff,{glass:1,opacity:0.25}),false);U.tc=mesh(T3.cyl,mat(NEON.red,{glow:1}));U.tb=ball(9,NEON.red,{glow:1});
    const gx=W*0.56,gw=W*0.4,gt=30,gh=H-90;U.G={gx,gw,gt,gh,z:chart3(gx,gx+gw,gt,gt+gh)};U.cv=curve3(NEON.accent,80);U.pl=line3(NEON.warm,2,{opacity:0.7});U.mk=ball(5,NEON.warm,{glow:1.5});},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const{px,pw,pb,pt,Tb}=g,x=px+pw/2,r=pw/2,wt=pt+20;U.w.scale.set(1,pb-wt,1);U.w.position.set(x,(wt+pb)/2,0);U.lid.visible=U.val.visible=U.st.visible=!!P.qz;U.lid.position.set(x,pt-5,0);U.val.position.set(x,pt-22,0);setRod(U.st,x,pt-10,0,x,pt-18,0);
    let n=0;S.bub.forEach((b,i)=>{if(n>=300)return;const a=hash1(i*3.1)*TAU,rr=Math.sqrt(b.x)*(r-8);setI(U.bub,n++,x+Math.cos(a)*rr,wt+b.y*(pb-wt-6),Math.sin(a)*rr,b.r*0.8);});U.bub.count=n;U.bub.instanceMatrix.needsUpdate=true;
    U.fl.forEach((f,k)=>{const a=k/7*TAU,h=14+6*Math.sin(S.t*12+k*1.7);f.scale.set(6,h,6);f.rotation.z=Math.PI;f.position.set(x+Math.cos(a)*r*0.55,pb+20-h/2,Math.sin(a)*r*0.55);});
    const tx=px+pw+30,th=(clamp(S.T,0,130)/130)*(pb-pt+20);U.tg.scale.set(6,pb-pt+30,6);U.tg.position.set(tx,(pt-40+pb-10)/2,0);cylY(U.tc,tx,pb-10-th,pb-4,3);U.tb.position.set(tx,pb-4,0);
    const G=U.G,p=simOf('qaynashbosim').pr(P),pts=[];for(let T=60;T<=130;T+=1)pts.push([T,101.325*Math.exp(-40700/8.314*(1/(T+273.15)-1/373.15))]);setLine(U.cv,chartLine(G.z,pts,G.gx,G.gt,G.gw,G.gh,60,130,0,280));setLine(U.pl,chartLine(G.z+0.5,[[60,p],[130,p]],G.gx,G.gt,G.gw,G.gh,60,130,0,280));U.mk.position.set(...chartLine(G.z+2,[[Tb,p]],G.gx,G.gt,G.gw,G.gh,60,130,0,280)[0]);}};

/* Issiqlik o‘tkazuvchanlik */
SC3.issiqlikotk={cam:[3.5,2.2,15,0,-0.3,0],build({W,H}){const U=T3.v8={};U.w1=mesh(T3.box,dynMat(0xa0523d,{rough:0.85,metal:0,glow:0}));U.w2=cube(1,1,1,0xe8eef5,{rough:0.7});U.br=[];for(let k=0;k<40;k++){const b=cube(1,1.2,1,0x000000,{opacity:0.3});U.br.push(b);}
    U.hot=cube(1,1,1,0xffa060,{opacity:0.1,glow:0.6});U.cold=cube(1,1,1,0x7ab4ff,{opacity:0.1,glow:0.6});U.prof=curve3(NEON.red,8);U.pk=[0,1,2].map(()=>ball(4,NEON.red,{glow:1.5}));U.d=pInst(500);U.q=arrow3(NEON.warm);U.rad=mesh(T3.box,mat(0xdfe6f5,{metal:0.8,rough:0.3}));U.lt=new THREE.PointLight(0xff9a50,0.6,0,2);T3.root.add(U.lt);},
  update({S,P,W}){const U=T3.v8,g=S.g;if(!g)return;const k=simOf('issiqlikotk').calc(P),{top,bot,wl,w1,w2}=g,D=200,TY=T=>bot-(T+35)/70*(bot-top),h=bot-top,wr=wl+w1+w2;
    U.w1.scale.set(w1,h,D);U.w1.position.set(wl+w1/2,(top+bot)/2,0);U.w1.material.color.set(['#a0523d','#7d8592','#9c6b3c','#c9c3b5'][P.mat|0]);U.w2.visible=w2>0.5;U.w2.scale.set(Math.max(w2,0.1),h,D);U.w2.position.set(wl+w1+w2/2,(top+bot)/2,0);
    U.br.forEach((b,i)=>{b.visible=(P.mat|0)===0&&top+i*14<bot;b.scale.set(w1+0.4,1.2,D+0.4);b.position.set(wl+w1/2,top+i*14,0);});
    U.hot.scale.set(wl,h,D);U.hot.position.set(wl/2,(top+bot)/2,0);U.cold.scale.set(W-wr,h,D);U.cold.position.set((W+wr)/2,(top+bot)/2,0);U.rad.scale.set(10,h*0.4,60);U.rad.position.set(wl*0.4,bot-h*0.25,0);U.lt.position.set(wl*0.4,bot-h*0.3,30);
    const z=D/2+4;setLine(U.prof,[[0,TY(P.Ti),z],[wl-26,TY(P.Ti),z],[wl,TY(k.Tw),z],[wl+w1,TY(k.Tm),z],[wr,TY(k.To2),z],[wr+14,TY(P.To),z],[W,TY(P.To),z]]);[[wl,k.Tw],[wl+w1,k.Tm],[wr,k.To2]].forEach(([x,T],i)=>U.pk[i].position.set(x,TY(T),z));
    let n=0;S.dots.forEach((d,i)=>{if(n>=500)return;setI(U.d,n,d.x*W,top+d.y*h,(hash1(i)-0.5)*D*0.9,2.6);pCol(U.d,n,`rgb(255,${Math.round(180-d.x*120)},80)`);n++;});pDone(U.d,n);setArrow(U.q,wl-80,bot+30,0,wr+80,bot+30,0,Math.min(8,1.5+k.q/10));}};

/* Sovitgich */
SC3.sovitgich={build({W,H}){const U=T3.v8={};U.key='';U.dot=pInst(200);U.cold=cube(1,1,1,0x5aa0ff,{opacity:0.08,glow:0.5});U.hot=cube(1,1,1,0xff8a50,{opacity:0.08,glow:0.5});U.comp=mesh(T3.cyl,mat(0x3a4252,{metal:0.8,rough:0.3}));U.cf=mesh(T3.cyl,mat(0x5a6378,{metal:0.9}));U.vl=cube(1,1,1,0x5a6378,{metal:0.8});
    U.fin=[];for(let i=0;i<12;i++)U.fin.push(rod(1.6,mat(i<6?0x5aa0ff:0xff8a50,{glow:0.6,metal:0.8})));U.Qs=arrow3(NEON.accent);U.Qi=arrow3(NEON.warm);U.A=arrow3(NEON.green);U.snow=pInst(60);},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const k=simOf('sovitgich').calc(P),{L,R,T,B}=g,M=(L+R)/2,D=150,key=[L,R,T,B].join();
    if(U.key!==key){U.key=key;if(U.tube){T3.root.remove(U.tube);U.tube.geometry.dispose();}const pts=[[L,T],[R,T],[R,B],[L,B]].map(p=>new THREE.Vector3(p[0],p[1],0)),cp=new THREE.CurvePath();for(let i=0;i<4;i++)cp.add(new THREE.LineCurve3(pts[i],pts[(i+1)%4]));U.tube=new THREE.Mesh(new THREE.TubeGeometry(cp,200,4,8,true),mat(0x9fc6ff,{glass:1,opacity:0.3}));T3.root.add(U.tube);}
    U.cold.scale.set((R-L)/2+40,B-T+60,D);U.cold.position.set(L-60+((R-L)/2+40)/2,(T+B)/2,0);U.hot.scale.set(R-M+60,B-T+60,D);U.hot.position.set(M+(R-M+60)/2,(T+B)/2,0);
    U.comp.scale.set(30,48,30);U.comp.position.set(M,T,0);U.comp.rotation.x=Math.PI/2;U.cf.scale.set(8,40,8);U.cf.position.set(M,T,0);U.cf.rotation.y=S.ph*0.2;U.cf.rotation.x=Math.PI/2;U.vl.scale.set(18,18,18);U.vl.position.set(M,B,0);U.vl.rotation.z=Math.PI/4;
    U.fin.forEach((f,i)=>{const s=i<6?L:R,y=T+20+(i%6)*(B-T-40)/5;setRod(f,s,y,-24,s,y,24);});
    const loop=[[L,T],[R,T],[R,B],[L,B],[L,T]],L2=polyLen(loop),s1=(R-L)/2,s2=(R-L)*1.5+(B-T);let n=0;for(let s=(S.ph%30);s<L2&&n<200;s+=30){const p=polyAt(loop,s),hot=s>s1&&s<s2;setI(U.dot,n,p[0],p[1],0,4.4);pCol(U.dot,n,hot?'#ff5a5a':'#5b8cff');n++;}pDone(U.dot,n);
    const sc=60/Math.max(k.Qh,1);setArrow(U.Qs,L-70,(T+B)/2,0,L-20,(T+B)/2,0,Math.max(1.5,k.Qc*sc*0.06));setArrow(U.Qi,R+20,(T+B)/2,0,R+80,(T+B)/2,0,Math.max(1.5,k.Qh*sc*0.06));setArrow(U.A,M,T-80,0,M,T-28,0,Math.max(1.5,P.A*sc*0.06));
    let m=0;if(P.Tc<0)for(let i=0;i<60;i++){const y=T+((hash1(i)*(B-T)+S.ph*0.4*(0.5+hash1(i+7)))%(B-T));setI(U.snow,m,L-55+hash1(i+3)*((R-L)/2+20),y,(hash1(i+5)-0.5)*D*0.8,1.8);pCol(U.snow,m,'#e8f4ff');m++;}pDone(U.snow,m);}};

/* Entropiya */
SC3.entropiya={build({W,H}){const U=T3.v8={};const g=S.g||{bx:30,by:30,bw:W*0.42,bh:H*0.55};const D=g.bh*0.7;U.D=D;const gl=cube(g.bw,g.bh,D,0x9fc6ff,{glass:1,opacity:0.1});gl.position.set(g.bx+g.bw/2,g.by+g.bh/2,0);const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(g.bw,g.bh,D)),new THREE.LineBasicMaterial({color:0x7aa8ff}));e.position.copy(gl.position);T3.root.add(e);
    U.wall=mesh(T3.box,dynMat(NEON.warm,{glow:0.5,opacity:0.7}));U.m=pInst(200);const gx=g.bx+g.bw+50,gw=W-gx-24;U.G={gx,gw,gt:g.by+10,gh:g.bh*0.5,z:chart3(gx,gx+gw,g.by+10,g.by+10+g.bh*0.5)};U.dist=curve3(NEON.accent,201);U.mk=ball(5,NEON.warm,{glow:1.5});
    const t2=g.by+g.bh+40,h2=H-t2-24;U.G2={gx:40,gw:W-80,gt:t2,gh:h2,z:chart3(40,W-40,t2,t2+h2)};U.nt=curve3(NEON.accent,320);U.half=line3(0x8e9cb2,2,{opacity:0.6});U.sb=[cube(1,1,1,NEON.warm,{glow:0.6}),cube(1,1,1,0x8e9cb2,{opacity:0.5})];},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('entropiya'),{bx,by,bw,bh}=g,D=U.D;U.wall.scale.set(4,bh,D);U.wall.position.set(bx+bw/2,by+bh/2,0);U.wall.material.opacity=P.dv?0.08:0.7;
    let n=0;S.m.forEach((p,i)=>{if(n>=200)return;setI(U.m,n,bx+p.x*bw,by+p.y*bh,(((hash1(i)+S.t*0.05*(hash1(i+3)-0.5))%1+1)%1-0.5)*D*0.9,4);pCol(U.m,n,p.x<0.5?'#5b8cff':'#3fe0a0');n++;});pDone(U.m,n);
    const N=P.N,nn=S.n??N,lmax=sim.lnC(N,Math.floor(N/2)),lw=sim.lnC(N,nn),G=U.G,dist=[];for(let k=0;k<=N;k++)dist.push([k,Math.exp(sim.lnC(N,k)-lmax)]);setLine(U.dist,chartLine(G.z,dist,G.gx,G.gt,G.gw,G.gh,0,N,0,1.1));U.mk.position.set(...chartLine(G.z+2,[[nn,Math.exp(lw-lmax)]],G.gx,G.gt,G.gw,G.gh,0,N,0,1.1)[0]);
    const sy=by+bh*0.5+70;[lw,lmax].forEach((v,i)=>{const w=Math.max(0.5,v/Math.max(lmax,1)*G.gw);U.sb[i].scale.set(w,12,12);U.sb[i].position.set(G.gx+w/2,sy+i*30,0);});
    const G2=U.G2,t0=Math.max(0,S.t-30);setLine(U.nt,chartLine(G2.z,S.hist,G2.gx,G2.gt,G2.gw,G2.gh,t0,t0+30,0,N));setLine(U.half,chartLine(G2.z,[[t0,N/2],[t0+30,N/2]],G2.gx,G2.gt,G2.gw,G2.gh,t0,t0+30,0,N));}};

/* Elektr dipol */
SC3.dipol={build({W,H}){const U=T3.v8={};U.pos=ball(10,NEON.red,{glow:0.6,metal:0.3});U.neg=ball(10,NEON.accent,{glow:0.6,metal:0.3});U.bar=rod(2.4,mat(0xdfe6f5,{metal:0.9}));U.p=arrow3(NEON.warm);U.F=[arrow3(NEON.red),arrow3(NEON.accent)];
    U.fc=inst(1600,T3.cone,new THREE.MeshStandardMaterial({color:0x96aaff,emissive:0x6070ff,emissiveIntensity:0.6,transparent:true,opacity:0.85}));U.ext=[];for(let k=0;k<8;k++)U.ext.push(arrow3(NEON.green));U.arc=line3(NEON.warm,40,{opacity:0.8});},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const{cx,cy,sc,pp,pn}=g,k=8.99e9,q=P.q*1e-9,E0=P.E*1e3;U.pos.position.set(pp[0],pp[1],0);U.neg.position.set(pn[0],pn[1],0);setRod(U.bar,pn[0],pn[1],0,pp[0],pp[1],0);
    const ax=Math.cos(-S.al),ay=Math.sin(-S.al),dd=Math.hypot(pp[0]-pn[0],pp[1]-pn[1]);setArrow(U.p,cx,cy,14,cx+ax*Math.max(30,dd*0.8),cy+ay*Math.max(30,dd*0.8),14,2.6);
    const F=24*Math.min(1,P.E/20);U.F.forEach((a,i)=>{a.visible=P.E>0;const s=i?pn:pp;if(P.E>0)setArrow(a,s[0],s[1],0,s[0]+(i?-1:1)*F*1.6,s[1],0,2);});
    const field=(x,y,z)=>{let ex=E0,ey=0,ez=0;[[pp,q],[pn,-q]].forEach(([s,qq])=>{const dx=(x-s[0])/sc*0.01,dy=-(y-s[1])/sc*0.01,dz=z/sc*0.01,r2=dx*dx+dy*dy+dz*dz+1e-6,r=Math.sqrt(r2),e=k*qq/r2;ex+=e*dx/r;ey+=e*dy/r;ez+=e*dz/r;});return[ex,ey,ez];};
    let n=0;const _v=T3._v8||(T3._v8=new THREE.Vector3()),_u=T3._u8||(T3._u8=new THREE.Vector3(0,1,0)),_q=T3._q8||(T3._q8=new THREE.Quaternion()),_m=T3._m8||(T3._m8=new THREE.Matrix4()),_s=T3._s8||(T3._s8=new THREE.Vector3()),_p=T3._p8||(T3._p8=new THREE.Vector3());
    for(const z of [-60,0,60])for(let y=24;y<H;y+=34)for(let x=20;x<W*0.8;x+=34){const[ex,ey,ez]=field(x,y,z),m=Math.hypot(ex,ey,ez);if(m<1||n>=1600)continue;const l=Math.min(12,3+Math.log10(m)*1.8);_v.set(ex/m,-ey/m,ez/m);_q.setFromUnitVectors(_u,_v);_p.set(x,y,z);_s.set(l*0.28,l,l*0.28);_m.compose(_p,_q,_s);U.fc.setMatrixAt(n,_m);n++;}
    U.fc.count=n;U.fc.instanceMatrix.needsUpdate=true;U.ext.forEach((a,i)=>{a.visible=P.E>0;if(P.E>0){const y=40+(i%4)*((H-80)/3),z=i<4?-40:40;setArrow(a,W*0.82,y,z,W*0.97,y,z,2);}});
    const pts=[],a1=Math.min(0,-S.al),a2=Math.max(0,-S.al);for(let i=0;i<40;i++){const a=a1+(a2-a1)*i/39;pts.push([cx+Math.cos(a)*30,cy+Math.sin(a)*30,14]);}setLine(U.arc,pts);}};

/* Kondensatorlarni ulash */
SC3.kondulash={build({W,H}){const U=T3.v8={};U.key='';U.gr=null;U.dot=pInst(120);U.pm=[0,1,2].map(()=>[dynMat(0xcfd6e6,{metal:0.9,rough:0.25,glow:0}),dynMat(0xcfd6e6,{metal:0.9,rough:0.25,glow:0})]);U.pm.forEach(([a,b])=>{a.emissive.set(0xff4040);b.emissive.set(0x4070ff);});},
  update({S,P,W,H}){const U=T3.v8,g=S.g;if(!g)return;const r=simOf('kondulash').calc(P),{L,R,T,B,md}=g,my=(T+B)/2,key=[md,W,H].join();
    if(U.key!==key){U.key=key;if(U.gr)T3.root.remove(U.gr);const gr=U.gr=new THREE.Group();T3.root.add(gr);const bt=battery3(L,my);gr.add(bt);
      const cap=(x,y,i,vert)=>{[0,1].forEach(j=>{const p=new THREE.Mesh(T3.box,U.pm[i][j]);p.castShadow=true;const o=j?6:-6;if(vert){p.scale.set(60,4,50);p.position.set(x,y+o,0);}else{p.scale.set(4,60,50);p.position.set(x+o,y,0);}gr.add(p);});};
      if(md===0){const xs=[W*0.38,W*0.58,W*0.78];wireG(gr,[[L,my-34],[L,T],[xs[2],T]]);wireG(gr,[[L,my+34],[L,B],[xs[2],B]]);xs.forEach((x,i)=>{wireG(gr,[[x,T],[x,my-8]]);wireG(gr,[[x,B],[x,my+8]]);cap(x,my,i,1);});}
      else if(md===1){const xs=[W*0.32,W*0.52,W*0.72];wireG(gr,[[L,my-34],[L,T],[xs[0]-8,T]]);wireG(gr,[[xs[0]+8,T],[xs[1]-8,T]]);wireG(gr,[[xs[1]+8,T],[xs[2]-8,T]]);wireG(gr,[[xs[2]+8,T],[R,T],[R,B],[L,B],[L,my+34]]);xs.forEach((x,i)=>cap(x,T,i,0));}
      else{const x1=W*0.26,x2=W*0.6;wireG(gr,[[L,my-34],[L,T],[x1-8,T]]);wireG(gr,[[x1+8,T],[x2,T],[x2,T+10]]);wireG(gr,[[x2,B-10],[x2,B],[L,B],[L,my+34]]);wireG(gr,[[x2,T+10],[x2-90,T+10],[x2-90,my-8]]);wireG(gr,[[x2,T+10],[x2+90,T+10],[x2+90,my-8]]);wireG(gr,[[x2-90,my+8],[x2-90,B-10],[x2+90,B-10],[x2+90,my+8]]);cap(x1,T,0,0);cap(x2-90,my,1,1);cap(x2+90,my,2,1);}}
    const qm=Math.max(...r.q);U.pm.forEach(([a,b],i)=>{const v=r.q[i]/qm*S.k*1.6;a.emissiveIntensity=v;b.emissiveIntensity=v;});
    let n=0;if(S.k<0.98){const path=md===0?[[L,my-34],[L,T],[W*0.78,T]]:md===1?[[L,my-34],[L,T],[W*0.32-10,T]]:[[L,my-34],[L,T],[W*0.26-10,T]];n=dotsOn(U.dot,0,path,S.ph,1,'#ffb347');}pDone(U.dot,Math.min(n,120));}};

/* Dielektrik */
SC3.dielektrik={build({W,H}){const U=T3.v8={};const g=S.g||{pl:W*0.1,pr:W*0.55,pt:H*0.3,pb:H*0.7};U.D=140;U.pm=[dynMat(0xd04848,{metal:0.8,rough:0.3,glow:0.2}),dynMat(0x4870d0,{metal:0.8,rough:0.3,glow:0.2})];U.p=U.pm.map(m=>mesh(T3.box,m));
    U.sl=mesh(T3.box,dynMat(0xa0dcff,{opacity:0.45,metal:0.1,rough:0.1,glow:0.1}));U.se=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),new THREE.LineBasicMaterial({color:0xdfe7ff,transparent:true,opacity:0.6}));T3.root.add(U.se);
    U.f=[];for(let i=0;i<42;i++)U.f.push(rod(1.4,mat(NEON.warm,{glow:1,opacity:0.75})));U.bat=battery3(W*0.93,(g.pt+g.pb)/2);U.w=[line3(0x9fc6ff,4),line3(0x9fc6ff,4)];U.pol=pInst(80);},
  update({S,P,W}){const U=T3.v8,g=S.g;if(!g)return;const r=simOf('dielektrik').calc(P),{pl,pr,pt,pb,xi}=g,pw=pr-pl,D=U.D,e=r.e;U.p[0].scale.set(pw,10,D);U.p[0].position.set(pl+pw/2,pt-5,0);U.p[1].scale.set(pw,10,D);U.p[1].position.set(pl+pw/2,pb+5,0);
    const qi=r.q/(simOf('dielektrik').calc({...P,x:0,md:1}).q||1);U.pm.forEach(m=>m.emissiveIntensity=clamp(0.15+qi*0.15,0.15,1.4));
    U.sl.visible=U.se.visible=P.x>0;const sw=pr-xi,sh=pb-pt-16;U.sl.scale.set(Math.max(sw,0.1),sh,D*0.9);U.sl.position.set(xi+sw/2,(pt+pb)/2,0);U.se.scale.copy(U.sl.scale);U.se.position.copy(U.sl.position);U.sl.material.color.set(['#f0e6c8','#a0dcff','#c8b48c','#468cff'][P.e|0]);
    const nl=Math.round(clamp(r.U/P.U*9,1,14));U.f.forEach((f,i)=>{const col=i%nl,row=Math.floor(i/nl);f.visible=i<nl*3;if(!f.visible)return;const x=pl+12+col*(pw-24)/Math.max(nl-1,1),z=(row-1)*D*0.32;setRod(f,x,pt+2,z,x,pb-2,z);});
    U.bat.visible=P.md==0;const bx=W*0.93,my=(pt+pb)/2;U.w.forEach((l,i)=>{l.visible=P.md==0;const y=i?pb:pt,s=i?1:-1;setLine(l,[[pl+pw/2,y+s*10,0],[pl+pw/2,y+s*40,0],[bx,y+s*40,0],[bx,my+s*32,0]]);});
    let n=0;if(P.x>0&&e>1)for(let x=Math.max(pl+10,xi+6);x<pr&&n<80;x+=18){for(const z of[-D*0.3,D*0.3]){setI(U.pol,n,x,pt+12,z,3);pCol(U.pol,n,'#5b8cff');n++;setI(U.pol,n,x,pb-12,z,3);pCol(U.pol,n,'#ff5a5a');n++;}}pDone(U.pol,Math.min(n,80));}};

/* Kirxgof */
SC3.kirxgof={build({W,H}){const U=T3.v8={};const g=S.g||{L:W*0.14,M:W*0.48,R:W*0.82,T:H*0.18,B:H*0.78};const{L,M,R,T,B}=g;wires([[M,B],[L,B],[L,T],[M,T]],false);wires([[M,B],[R,B],[R,T],[M,T]],false);wires([[M,T],[M,B]],false);
    battery3(L,(T+B)/2);battery3(R,(T+B)/2);const r1=resistor3();r1.position.set((L+M)/2,T,0);const r2=resistor3();r2.position.set((M+R)/2,T,0);const r3=resistor3();r3.position.set(M,(T+B)/2,0);r3.rotation.z=Math.PI/2;
    [[M,T],[M,B]].forEach(([x,y])=>{const n=ball(10,0xdfe6f5,{metal:1,glow:0.2});n.position.set(x,y,0);});U.dot=pInst(400);U.lb={};},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const r=simOf('kirxgof').calc(P),{L,M,R,T,B}=g,v=40;let n=0;
    n=dotsOn(U.dot,n,[[L,B],[L,T],[M,T]],S.ph*v*Math.abs(r.I1)*0.6,Math.sign(r.I1),'#ffb347');n=dotsOn(U.dot,n,[[M,B],[L,B]],S.ph*v*Math.abs(r.I1)*0.6,Math.sign(r.I1),'#ffb347');
    n=dotsOn(U.dot,n,[[R,B],[R,T],[M,T]],S.ph*v*Math.abs(r.I2)*0.6,Math.sign(r.I2),'#3fe0a0');n=dotsOn(U.dot,n,[[M,B],[R,B]],S.ph*v*Math.abs(r.I2)*0.6,Math.sign(r.I2),'#3fe0a0');n=dotsOn(U.dot,n,[[M,T],[M,B]],S.ph*v*Math.abs(r.I3)*0.6,Math.sign(r.I3),'#b088ff');pDone(U.dot,Math.min(n,400));
    relabel(U,'1','I₁ = '+fmt(r.I1,2)+' A','#ffb347',20,(L+M)/2,T+40,10);relabel(U,'2','I₂ = '+fmt(r.I2,2)+' A','#3fe0a0',20,(M+R)/2,T+40,10);relabel(U,'3','I₃ = '+fmt(r.I3,2)+' A','#b088ff',20,M+70,(T+B)/2+50,10);}};

/* Uitston ko‘prigi */
SC3.uitston={build({W,H}){const U=T3.v8={};const g=S.g||{cx:W*0.42,cy:H*0.48,a:Math.min(W*0.26,H*0.36)};const{cx,cy,a}=g,top=[cx,cy-a],bot=[cx,cy+a],A=[cx-a,cy],B=[cx+a,cy],bx=W*0.88;
    wires([top,A,bot],false);wires([top,B,bot],false);wires([A,[cx-40,cy]],false);wires([[cx+40,cy],B],false);wires([top,[cx,cy-a-30],[bx,cy-a-30],[bx,cy-34]],false);wires([bot,[cx,cy+a+30],[bx,cy+a+30],[bx,cy+34]],false);battery3(bx,cy);
    const rr=(p,q)=>{const m=resistor3();m.position.set((p[0]+q[0])/2,(p[1]+q[1])/2,0);m.rotation.z=Math.atan2(q[1]-p[1],q[0]-p[0]);m.scale.setScalar(0.8);return m;};rr(top,A);rr(A,bot);U.r3=rr(top,B);U.rx=rr(B,bot);U.rx.userData.body.material=dynMat(0xcdb68a,{rough:0.5,metal:0.1,glow:0});
    U.d=dial3(36);U.d.position.set(cx,cy,0);U.ok=new THREE.Mesh(new THREE.TorusGeometry(40,2.4,8,48),dynMat(NEON.green,{glow:1.2}));T3.root.add(U.ok);U.ok.position.set(cx,cy,0);U.dot=pInst(200);},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('uitston'),r=sim.calc(S,P),bal=Math.abs(r.Ig)<2e-5,{cx,cy,a}=g;U.d.userData.hd.rotation.z=-S.ndl*0.9;U.ok.material.color.set(bal?NEON.green:NEON.red);U.ok.material.emissive.set(bal?NEON.green:NEON.red);U.ok.material.emissiveIntensity=bal?1.4:0.3;
    const hot=(P.x|0)===3?clamp((220-r.Rx)/60,0,1):0;U.rx.userData.body.material.emissive.setRGB(1,0.3,0.1);U.rx.userData.body.material.emissiveIntensity=hot*1.2;
    const top=[cx,cy-a],bot=[cx,cy+a],A=[cx-a,cy],B=[cx+a,cy],I1=(P.E-r.Va)/P.R1,I3=(P.E-r.Vb)/P.R3,t=S.t*60;let n=0;n=dotsOn(U.dot,n,[top,A,bot],t*I1*20,1,'#ffb347',30);n=dotsOn(U.dot,n,[top,B,bot],t*I3*20,1,'#ffb347',30);if(!bal)n=dotsOn(U.dot,n,[A,B],t*Math.abs(r.Ig)*4e4,Math.sign(r.Ig),'#ff5a5a',22);pDone(U.dot,Math.min(n,200));}};

/* Qarshilik va harorat */
SC3.qarshiliktemp={cam:[3,2.4,14,0,-0.2,0],build({W,H}){const U=T3.v8={};const g=S.g||{bx:30,by:40,bw:W*0.42,bh:H*0.5};U.D=g.bh*0.6;U.box=mesh(T3.box,new THREE.MeshStandardMaterial({color:0x9fc6ff,transparent:true,opacity:0.1,emissive:0xff7030,emissiveIntensity:0,depthWrite:false}),false);
    U.ed=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),new THREE.LineBasicMaterial({color:0x7aa8ff}));T3.root.add(U.ed);U.ion=inst(135,T3.sph,new THREE.MeshStandardMaterial({color:0x8a96b0,metalness:0.7,roughness:0.3,emissive:0xff6020,emissiveIntensity:0}));U.e=pInst(120);
    const gx=g.bx+g.bw+60,gw=W-gx-24,gt=40,gh=H-100;U.G={gx,gw,gt,gh,z:chart3(gx,gx+gw,gt,gt+gh)};U.cv=curve3(NEON.accent,121);U.mk=ball(5,NEON.warm,{glow:1.5});U.lt=new THREE.PointLight(0xff8040,0,0,2);T3.root.add(U.lt);},
  update({S,P}){const U=T3.v8,g=S.g;if(!g)return;const sim=simOf('qarshiliktemp'),m=sim.M[P.mt|0],{bx,by,bw,bh,T}=g,D=U.D,glow=clamp((T-500)/2000,0,1);U.box.scale.set(bw,bh,D);U.box.position.set(bx+bw/2,by+bh/2,0);U.ed.scale.copy(U.box.scale);U.ed.position.copy(U.box.position);
    U.box.material.emissiveIntensity=glow*1.2;U.box.material.opacity=0.08+glow*0.25;U.ion.material.emissiveIntensity=glow*1.5;U.lt.intensity=glow*2;U.lt.position.set(bx+bw/2,by+bh/2,D);
    const amp=Math.sqrt((T+273)/293)*2.4;let n=0;for(let i=0;i<9;i++)for(let j=0;j<5;j++)for(let k=0;k<3;k++){const x=bx+(i+0.5)*bw/9+Math.sin(S.t*23+i*7+j*3+k*5)*amp,y=by+(j+0.5)*bh/5+Math.cos(S.t*19+i*5+j*11+k)*amp,z=(k-1)*D/3+Math.sin(S.t*21+i*3+k*13)*amp;setI(U.ion,n++,x,y,z,7);}U.ion.count=n;U.ion.instanceMatrix.needsUpdate=true;
    const ne=m.B?Math.round(clamp(40*Math.exp(m.B*(1/298.15-1/(T+273.15)))/4,2,40)):40;let q=0;S.e.slice(0,ne).forEach((e,i)=>{for(let r=0;r<3&&q<120;r++){setI(U.e,q,bx+((e.x+r*0.33)%1)*bw,by+e.y*bh,(hash1(i*3+r)-0.5)*D*0.9,2.8);pCol(U.e,q,'#5b8cff');q++;}});pDone(U.e,q);
    const G=U.G,T0=-50,T1=m.max,pts=[];for(let i=0;i<=120;i++){const t=T0+(T1-T0)*i/120;pts.push([t,sim.R(P,t)]);}const ym=Math.max(...pts.map(p=>p[1]))*1.08;setLine(U.cv,chartLine(G.z,pts,G.gx,G.gt,G.gw,G.gh,T0,T1,0,ym));U.mk.position.set(...chartLine(G.z+2,[[T,sim.R(P,T)]],G.gx,G.gt,G.gw,G.gh,T0,T1,0,ym)[0]);}};
