/* ===== v9: 3D sahnalar — 25 ta yangi mavzu ===== */
function tor9(r,tube,col,o){return mesh(new THREE.TorusGeometry(r,tube,10,Math.max(48,r|0)),mat(col,o),false);}
function cyl9(col,o){return mesh(T3.cyl,mat(col,o));}
function hash9(i){const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s);}
function css9(m,css){m.color.set(css);m.emissive.set(css);}

/* Tekis tezlanuvchan aylanma harakat */
SC3.burchaktez={build({W,H}){const U=T3.v9={};const g=S.g||{cx:W*0.27,cy:H*0.5,Rp:H*0.36};U.ring=tor9(g.Rp,4,NEON.steel,{metal:0.9,rough:0.2});U.ring.position.set(g.cx,g.cy,0);
    U.sp=[0,1,2,3,4,5].map(()=>rod(2.2,mat(0xc6cfe0,{metal:0.9,rough:0.25})));const hub=cyl9(0x39425a,{metal:0.8});hub.rotation.x=Math.PI/2;hub.scale.set(12,24,12);hub.position.set(g.cx,g.cy,0);
    U.pt=ball(9,NEON.red,{glow:1});U.v=arrow3(NEON.green);U.at=arrow3(NEON.warm);U.an=arrow3(NEON.violet);U.w=arrow3(NEON.accent);U.tr=line3(NEON.red,120,{opacity:0.6});},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const{cx,cy,Rp,phi}=g,w=P.w0+P.e*S.t;U.ring.position.set(cx,cy,0);
    U.sp.forEach((o,k)=>{const a=phi+k*Math.PI/3;setRod(o,cx,cy,0,cx+Math.cos(a)*Rp,cy-Math.sin(a)*Rp,0,2.2);});
    const px=cx+Math.cos(phi)*Rp,py=cy-Math.sin(phi)*Rp,tx=-Math.sin(phi),ty=-Math.cos(phi),sg=Math.sign(w)||1;U.pt.position.set(px,py,0);
    const lv=clamp(Math.abs(w)*14,0,130);setArrow(U.v,px,py,6,px+tx*sg*lv,py+ty*sg*lv,6,3);const la=clamp(Math.abs(P.e)*45,0,90);setArrow(U.at,px,py,-6,px+tx*Math.sign(P.e)*la,py+ty*Math.sign(P.e)*la,-6,2.6);
    const ln=clamp(w*w*5,0,Rp*0.9);setArrow(U.an,px,py,0,px-Math.cos(phi)*ln,py+Math.sin(phi)*ln,0,2.6);setArrow(U.w,cx,cy,0,cx,cy,clamp(w*14,-160,160),4);
    const tr=[];for(let i=0;i<60;i++){const a=phi-sg*i*0.03;tr.push([cx+Math.cos(a)*Rp,cy-Math.sin(a)*Rp,0]);}setLine(U.tr,tr);
    relabel(U,'w','ω = '+fmt(w,2)+' rad/s',NEON_CSS(NEON.accent),18,cx,cy-Rp-34,0);}};
function NEON_CSS(h){return '#'+h.toString(16).padStart(6,'0');}

/* Narvon */
SC3.narvon={build({W,H}){const U=T3.v9={};const g=S.g||{fy:H-46,wx:W*0.66};floorV(g.fy,W,H);const wl=cube(14,g.fy-20,180,0x6d5a4a,{rough:0.9});wl.position.set(g.wx+7,(g.fy+20)/2,0);
    U.r1=rod(4,mat(0xd9a45a,{rough:0.6}));U.r2=rod(4,mat(0xd9a45a,{rough:0.6}));U.rg=Array.from({length:9},()=>rod(2.4,mat(0xc08a44,{rough:0.6})));
    U.body=cyl9(NEON.accent,{rough:0.5});U.head=ball(11,0xf1c9a0,{rough:0.6});U.N1=arrow3(NEON.green);U.N2=arrow3(NEON.green);U.fr=arrow3(NEON.red);U.mg=arrow3(NEON.violet);U.Mg=arrow3(NEON.violet);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const{bx,by,tx,ty}=g,f=simOf('narvon').forces(P,S.a);
    setRod(U.r1,bx,by,-22,tx,ty,-22,4);setRod(U.r2,bx,by,22,tx,ty,22,4);U.rg.forEach((o,i)=>{const u=(i+1)/10,x=bx+(tx-bx)*u,y=by+(ty-by)*u;setRod(o,x,y,-22,x,y,22,2.4);});
    const mx=bx+(tx-bx)*P.x,my=by+(ty-by)*P.x;U.body.scale.set(9,40,9);U.body.position.set(mx,my-26,0);U.head.position.set(mx,my-54,0);
    const k=110/Math.max(f.N1,1),fr=Math.min(f.N2,f.fmax);setArrow(U.N1,bx,by,30,bx,by-f.N1*k,30,3);setArrow(U.N2,tx,ty,0,tx-f.N2*k,ty,0,3);setArrow(U.fr,bx,by+4,0,bx+fr*k,by+4,0,3);
    setArrow(U.mg,(bx+tx)/2,(by+ty)/2,30,(bx+tx)/2,(by+ty)/2+P.m*9.8*k,30,2.6);setArrow(U.Mg,mx,my-26,14,mx,my-26+P.M*9.8*k,14,2.6);
    relabel(U,'s',f.ok&&!S.slip?'turadi':'sirpanadi',f.ok&&!S.slip?'#3fe0a0':'#ff5a5a',22,(bx+tx)/2-60,ty-10,0);}};

/* Areometr */
SC3.areometr={build({W,H}){const U=T3.v9={};const g=S.g||{cx:W*0.36,surf:120,bot:H-40,cw:80,sc:6};U.gl=cyl9(0xffffff,{glass:1,opacity:0.25});U.liq=[];U.lq=mesh(T3.cyl,new THREE.MeshStandardMaterial({color:0x3aa0ff,transparent:true,opacity:0.55,emissive:0x3aa0ff,emissiveIntensity:0.15,metalness:0.1,roughness:0.2}),false);
    U.bulb=ball(1,0xe8eef8,{glass:1,opacity:0.6});U.shot=ball(1,0x444b58,{metal:0.9});U.stem=cyl9(0xf3f6fb,{glass:1,opacity:0.7});U.scale=cyl9(0xfff3c4,{rough:0.6});U.fa=arrow3(NEON.green);U.mg=arrow3(NEON.violet);floorV(g.bot+6,W,H);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('areometr'),{cx,surf,sc,bot,cw,hb}=g,r=cw/2;cylY(U.gl,cx,surf-60,bot,r+3);cylY(U.lq,cx,surf,bot,r);
    const t=clamp((P.rho-790)/1050,0,1);U.lq.material.color.setHSL(0.58-t*0.5,0.65,0.5);U.lq.material.emissive.setHSL(0.58-t*0.5,0.65,0.25);
    const yb=surf+S.z*sc,rb=sim.rb*sc,hbp=hb*sc;U.bulb.scale.set(rb,hbp/2,rb);U.bulb.position.set(cx,yb-hbp/2,0);U.shot.scale.setScalar(rb*0.7);U.shot.position.set(cx,yb-rb*0.7,0);
    const rs=Math.sqrt(sim.A/Math.PI)*sc;cylY(U.stem,cx,yb-hbp-sim.Ls*sc,yb-hbp,rs);cylY(U.scale,cx,yb-hbp-sim.Ls*sc+4,yb-hbp-4,rs*0.7,rs*0.4);
    const fa=P.rho*9.8*sim.vsub(S.z)*1e-6,mg=P.m*1e-3*9.8,k=70/Math.max(fa,mg,1e-6);setArrow(U.fa,cx+rb+14,yb-hbp/2,0,cx+rb+14,yb-hbp/2-fa*k,0,3);setArrow(U.mg,cx-rb-14,yb-hbp/2,0,cx-rb-14,yb-hbp/2+mg*k,0,3);
    relabel(U,'r','ρ = '+fmt(P.rho,0)+' kg/m³','#dfe7ff',18,cx+r+70,surf,0);}};

/* To'qnashuv */
SC3.toqnash1d={build({W,H}){const U=T3.v9={};const g=S.g||{ty:H*0.42};const tr=cube(W-20,8,60,0x2a3246,{metal:0.6});tr.position.set(W/2,g.ty+28,0);floorV(g.ty+32,W,H);
    U.c=[NEON.red,NEON.accent].map(c=>cube(1,1,1,c,{metal:0.4,rough:0.35}));U.wh=Array.from({length:8},()=>ball(6,0x1b2233,{metal:0.8}));U.v=[arrow3(NEON.red),arrow3(NEON.accent)];U.fl=halo(1,0xffd27a,0.5);
    U.p=[cube(1,1,1,NEON.red,{glow:0.6}),cube(1,1,1,NEON.accent,{glow:0.6})];},
  update({S,P,W}){const U=T3.v9,g=S.g;if(!g)return;const{x0,sc,ty}=g,X=x=>x0+x*sc,w=0.5*sc;[[S.x1,P.m1,S.u1],[S.x2,P.m2,S.u2]].forEach(([x,m,u],i)=>{const h=18+m*6,c=U.c[i];c.scale.set(w*0.94,h,44);c.position.set(X(x),ty+18-h/2,0);
      [-1,1].forEach((s,j)=>[-1,1].forEach((z,k)=>U.wh[i*4+j*2+k].position.set(X(x)+s*w*0.3,ty+20,z*24)));setArrow(U.v[i],X(x),ty-h-6,0,X(x)+u*30,ty-h-6,0,3);
      const p=m*u,bh=Math.abs(p)*14;U.p[i].scale.set(26,Math.max(0.5,bh),10);U.p[i].position.set(W-90+i*36,60-Math.sign(p)*bh/2,-30);});
    U.fl.visible=S.flash>0;U.fl.scale.setScalar(10+S.flash*120);U.fl.position.set((X(S.x1)+X(S.x2))/2,ty,0);relabel(U,'p','p₁, p₂','#dfe7ff',14,W-72,92,-30);}};

/* Potensial energiya grafigi */
SC3.potgrafik={build({W,H}){const U=T3.v9={};U.tr=[-40,-20,0,20,40].map(z=>line3(z?0x5b8cff:0x9ab8ff,201,{opacity:z?0.35:1}));U.b=ball(10,NEON.warm,{glow:0.6,metal:0.4});U.E=cube(1,1,1,NEON.warm,{opacity:0.18,glow:0.6});U.tp=[ball(5,NEON.red,{glow:1}),ball(5,NEON.red,{glow:1})];U.ke=rod(4,mat(NEON.green,{glow:0.9}));},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const{gx,gy,gw,gh}=g,Uf=POTF[P.sh],X=x=>gx+(x+2)/4*gw,Y=u=>gy+gh-clamp(u,0,7)/7*gh;
    U.tr.forEach((l,k)=>{const z=(k-2)*20,pts=[];for(let i=0;i<=200;i++){const x=-2+4*i/200;pts.push([X(x),Y(Uf(x)),z]);}setLine(l,pts);});
    U.E.scale.set(gw,1.5,90);U.E.position.set(gx+gw/2,Y(P.E),0);const xs=clamp(S.x,-2,2);U.b.position.set(X(xs),Y(Uf(xs))-10,0);setRod(U.ke,X(xs),Y(Uf(xs)),0,X(xs),Y(Math.min(P.E,7)),0,3);
    const t=simOf('potgrafik').turns(P);U.tp.forEach((m,i)=>{m.visible=i<t.length;if(m.visible)m.position.set(X(t[i]),Y(P.E),0);});}};

/* Kuch impulsi (tuxum) */
SC3.kuchimpuls={build({W,H}){const U=T3.v9={};const g=S.g||{fy:H-60};floorV(g.fy,W,H);U.egg=ball(1,0xfff1d6,{rough:0.45});U.cu=cube(1,1,1,0x8e7cc3,{rough:0.9});U.sh=Array.from({length:10},()=>ball(4,0xfff1d6,{rough:0.5}));U.yo=ball(1,0xffb000,{glow:0.4});U.F=arrow3(NEON.red);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('kuchimpuls'),q=sim.calc(P),{sx,ey,fy,cush}=g,brk=q.brk&&S.ph>0;U.cu.scale.set(120,Math.max(1,cush),90);U.cu.position.set(sx,fy-cush/2,0);
    U.egg.visible=!brk;U.egg.scale.set(14,19,14);U.egg.position.set(sx,ey,0);U.sh.forEach((m,i)=>{m.visible=brk;const a=i/10*TAU,d=S.ph===1?S.t*40:64;m.position.set(sx+Math.cos(a)*Math.min(d,40),fy-cush-4,Math.sin(a)*Math.min(d,40));});
    U.yo.visible=brk;U.yo.scale.set(Math.min(30,8+S.t*30),3,Math.min(30,8+S.t*30));U.yo.position.set(sx,fy-cush-2,0);const show=S.ph===1&&S.t<0.6;U.F.visible=show;if(show)setArrow(U.F,sx+40,fy-cush,0,sx+40,fy-cush-clamp(q.Fm,0,120)*1.2,0,4);
    relabel(U,'F','F_max = '+fmt(q.Fm,1)+' N',brk?'#ff5a5a':'#3fe0a0',18,sx+60,fy-150,0);}};

/* Truba */
SC3.truba={build({W,H}){const U=T3.v9={};U.tube=mesh(T3.cyl,mat(0xbfe0ff,{glass:1,opacity:0.22}),false);U.cap=cyl9(0x8a96b0,{metal:0.8});U.spk=cyl9(0x2a3246,{metal:0.6});U.cone=mesh(T3.cone,mat(0x39425a,{metal:0.5}));U.air=pInst(400);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('truba'),{x0,x1,ty,th,ph}=g,r=th/2;U.tube.rotation.z=Math.PI/2;U.tube.scale.set(r,x1-x0,r);U.tube.position.set((x0+x1)/2,ty,0);
    U.cap.visible=!!P.ty;U.cap.rotation.z=Math.PI/2;U.cap.scale.set(r+3,6,r+3);U.cap.position.set(x1+3,ty,0);U.spk.rotation.z=Math.PI/2;U.spk.scale.set(r*0.9,14,r*0.9);U.spk.position.set(x0-18,ty,0);
    const A=Math.min(16,(x1-x0)/(P.n*5+2));let n=0;const nx=40;for(let i=0;i<nx;i++){const u=(i+0.5)/nx,d=sim.prof(P,u)*A*ph,x=x0+u*(x1-x0)+d,dd=Math.abs(sim.prof(P,u));for(let j=0;j<10&&n<400;j++){const a=j/10*TAU+i*0.7,rr=r*0.75*Math.sqrt(hash9(i*10+j));setI(U.air,n,x,ty+Math.cos(a)*rr,Math.sin(a)*rr,2.6);const c=new THREE.Color().setHSL(0.6-0.6*dd*Math.abs(ph),0.8,0.6);U.air.setColorAt(n,c);n++;}}pDone(U.air,n);
    relabel(U,'f','f = '+fmt(sim.calc(P).f,0)+' Hz','#ffb347',20,(x0+x1)/2,ty-r-30,0);}};

/* Maksvell */
SC3.maksvell={build({W,H}){const U=T3.v9={};const g=S.g||{bx:20,by:20,bw:W*0.38,bh:H-60};const bx=cube(g.bw,g.bh,90,0x5b8cff,{opacity:0.07});bx.position.set(g.bx+g.bw/2,g.by+g.bh/2,0);
    U.m=pInst(300);const nar=g.bw>W*0.5,hx=nar?40:g.bx+g.bw+50,hy=nar?g.by+g.bh+40:40,hw=nar?W-80:W-hx-30,hh=nar?H-hy-30:H-90;U.G={hx,hy,hw,hh};U.bars=Array.from({length:24},()=>cube(1,1,1,NEON.accent,{glow:0.5,metal:0.3}));U.cv=line3(NEON.warm,121);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('maksvell'),q=sim.sp(P),vm=3.2*q.vp,cnt=new Array(24).fill(0);let n=0;
    S.m.forEach((o,i)=>{if(n>=300)return;setI(U.m,n,g.bx+o.x*g.bw,g.by+o.y*g.bh,(hash9(i)-0.5)*80,4);const c=new THREE.Color().setHSL(0.66-0.66*clamp(o.v/(2*q.vp),0,1),0.9,0.6);U.m.setColorAt(n,c);n++;const b=Math.floor(o.v/vm*24);if(b<24)cnt[b]++;});pDone(U.m,n);
    const{hx,hy,hw,hh}=U.G,bw=hw/24,N=S.m.length,ys=hh/Math.max(...cnt,N*0.12);U.bars.forEach((b,i)=>{const h=Math.max(0.5,cnt[i]*ys);b.scale.set(bw*0.85,h,20);b.position.set(hx+(i+0.5)*bw,hy+hh-h/2,0);});
    const pts=[];for(let i=0;i<=120;i++){const v=i/120*vm,f=4*Math.PI*v*v*Math.pow(1/(2*Math.PI*q.s*q.s),1.5)*Math.exp(-v*v/(2*q.s*q.s));pts.push([hx+v/vm*hw,hy+hh-f*N*(vm/24)*ys,12]);}setLine(U.cv,pts);
    relabel(U,'T','T = '+fmt(P.T,0)+' K','#ffb347',18,hx+hw-50,hy+10,0);}};

/* Erkin yugurish yo'li */
SC3.erkinyol={build({W,H}){const U=T3.v9={};U.box=cube(1,1,1,0x5b8cff,{opacity:0.07});U.m=pInst(240);U.hl=halo(14,0xffb347,0.35);U.tr=line3(NEON.warm,400);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g||!S.m)return;const sim=simOf('erkinyol');U.box.scale.set(g.bw,g.bh,60);U.box.position.set(g.bx+g.bw/2,g.by+g.bh/2,0);let n=0;
    S.m.forEach((o,i)=>{if(n>=240)return;setI(U.m,n,g.bx+o.x,g.by+o.y,0,sim.r);pCol(U.m,n,i?'#7aa8ff':'#ffb347');n++;});pDone(U.m,n);const m0=S.m[0];U.hl.position.set(g.bx+m0.x,g.by+m0.y,0);
    setLine(U.tr,S.trail.slice(-400).map(p=>[g.bx+p[0],g.by+p[1],0]));}};

/* Otto sikli */
SC3.otto={cam:[3,2,18,0,-0.2,0],build({W,H}){const U=T3.v9={};U.cyl=cyl9(0xffffff,{glass:1,opacity:0.2});U.gas=mesh(T3.cyl,dynMat(0x5b8cff,{opacity:0.55,glow:0.5}),false);U.pis=cyl9(0x9aa4b8,{metal:0.9,rough:0.25});U.rod=rod(5,mat(0xc6cfe0,{metal:0.9}));U.cr=rod(7,mat(0x6a748a,{metal:0.9}));U.hub=ball(12,0x39425a,{metal:0.8});U.pin=ball(7,0xdfe6f5,{metal:1});
    U.sp=halo(10,0xffe080,0.8);U.v1=rod(3,mat(0x8a96b0,{metal:0.9}));U.v2=rod(3,mat(0x8a96b0,{metal:0.9}));const gx=W*0.5,gw=W*0.44,gt=50,gh=H*0.55;U.G={gx,gw,gt,gh,z:chart3(gx,gx+gw,gt,gt+gh)};U.loop=curve3(NEON.accent,201);U.mk=ball(6,NEON.warm,{glow:1.5});},
  update({S,P,H}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('otto'),q=sim.st(P),st=sim.state(P,S.th),{cx,cw,ctop,pis,k}=g,stroke=Math.min(H*0.32,160),tdc=ctop+stroke/(P.r-1),rc=stroke/2,Lr=stroke*1.1,yc=tdc+rc+Lr+20,r=cw/2;
    cylY(U.cyl,cx,ctop,tdc+stroke+30,r+4);cylY(U.gas,cx,ctop,pis,r);const col=[0x5b8cff,0x8e7cff,0xff7a1a,0x8a96b0][k];U.gas.material.color.setHex(col);U.gas.material.emissive.setHex(col);U.gas.material.emissiveIntensity=k===2?1.2*(1-(S.th%Math.PI)/Math.PI)+0.2:0.35;
    cylY(U.pis,cx,pis,pis+24,r-1);const th=S.th,px=cx+rc*Math.sin(th),py=yc-rc*Math.cos(th);setRod(U.rod,cx,pis+24,0,px,py,0,5);setRod(U.cr,cx,yc,-8,px,py,-8,7);U.hub.position.set(cx,yc,-8);U.pin.position.set(px,py,0);
    U.sp.visible=k===2&&(S.th%Math.PI)<0.25;U.sp.position.set(cx,ctop+6,0);setRod(U.v1,cx-r*0.5,ctop-30,0,cx-r*0.5,ctop-(k===0?2:12),0,3);setRod(U.v2,cx+r*0.5,ctop-30,0,cx+r*0.5,ctop-(k===3?2:12),0,3);
    const G=U.G,pts=[];for(let i=0;i<=200;i++){const s=sim.state(P,i/200*4*Math.PI);pts.push([s.V*1e6,s.p/1e5]);}const pm=q.p3/1e5*1.1;setLine(U.loop,chartLine(G.z,pts,G.gx,G.gt,G.gw,G.gh,0,q.V1*1e6*1.1,0,pm));U.mk.position.set(...chartLine(G.z+2,[[st.V*1e6,st.p/1e5]],G.gx,G.gt,G.gw,G.gh,0,q.V1*1e6*1.1,0,pm)[0]);
    relabel(U,'k',['so‘rish','siqish','ishchi yo‘l','chiqarish'][k],'#ffb347',18,cx,ctop-50,0);}};

/* p–V ish */
SC3.pvish={cam:[3,2,18,0,-0.2,0],build({W,H}){const U=T3.v9={};U.cyl=cyl9(0xffffff,{glass:1,opacity:0.2});U.gas=mesh(T3.cyl,dynMat(0xff7a1a,{opacity:0.5,glow:0.4}),false);U.pis=cyl9(0x9aa4b8,{metal:0.9});U.w=Array.from({length:8},()=>cyl9(0x39425a,{metal:0.8}));
    const gx=W*0.42,gw=W*0.52,gt=40,gh=H*0.6;U.G={gx,gw,gt,gh,z:chart3(gx,gx+gw,gt,gt+gh)};U.p=[0,1,2].map(i=>curve3([NEON.accent,NEON.green,NEON.violet][i],4));U.area=line3(NEON.warm,4,{opacity:0.5});U.mk=ball(6,NEON.warm,{glow:1.5});},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('pvish'),{cx,cw,cb,ch,py}=g,r=cw/2,cur=sim.at(sim.path(P,P.pa),S.u);cylY(U.cyl,cx,cb-ch-20,cb,r+4);cylY(U.gas,cx,py,cb,r);const T=cur.p[0]*cur.p[1];U.gas.material.emissiveIntensity=0.2+clamp(T/2500,0,1);
    cylY(U.pis,cx,py-14,py,r-1);const nw=clamp(Math.round(cur.p[1]/60),1,8);U.w.forEach((m,i)=>{m.visible=i<nw;cylY(m,cx,py-14-(i+1)*9,py-14-i*9-1,r*0.6);});
    const G=U.G,vm=Math.max(P.V1,P.V2)*1.25,pm=Math.max(P.p1,P.p2)*1.25;U.p.forEach((l,i)=>{setLine(l,chartLine(G.z+(i===P.pa?2:0),sim.path(P,i),G.gx,G.gt,G.gw,G.gh,0,vm,0,pm));l.material.opacity=i===P.pa?1:0.3;l.material.transparent=true;});
    U.mk.position.set(...chartLine(G.z+3,[cur.p],G.gx,G.gt,G.gw,G.gh,0,vm,0,pm)[0]);relabel(U,'A','A = '+fmt(sim.work(P,P.pa),0)+' J','#ffb347',18,G.gx+G.gw-60,G.gt+14,G.z+4);}};

/* Kuch chiziqlari */
SC3.kuchchiziq={build({W,H}){const U=T3.v9={};U.q=[0,1,2].map(()=>ball(1,0xffffff,{glow:0.8}));U.qm=[0,1,2].map(()=>dynMat(0xff5a5a,{glow:0.9}));U.q.forEach((m,i)=>m.material=U.qm[i]);U.ls=Array.from({length:40},()=>line3(0xdfe7ff,400,{opacity:0.7}));U.dots=pInst(400);
    U.pr=ball(6,0xffffff,{glow:1});U.E=arrow3(NEON.green);const nx=40,ny=26;U.surf=mesh(new THREE.PlaneGeometry(1,1,nx,ny),new THREE.MeshStandardMaterial({color:0x5b8cff,wireframe:true,transparent:true,opacity:0.35,emissive:0x2a4cbb,emissiveIntensity:0.5}),false);U.nx=nx;U.ny=ny;U.key='';},
  update({S,P}){const U=T3.v9;if(!S.W||!S.ls)return;const sim=simOf('kuchchiziq'),W=S.W,H=S.H,qs=[P.q1,P.q2,P.q3];
    S.ch.forEach((o,i)=>{const m=U.q[i],q=qs[i];m.visible=Math.abs(q)>0.01;m.scale.setScalar(8+Math.abs(q)*2.4);m.position.set(o.x*W,o.y*H,0);U.qm[i].color.setHex(q>0?0xff5a5a:0x5b8cff);U.qm[i].emissive.setHex(q>0?0xff5a5a:0x5b8cff);});
    let n=0;U.ls.forEach((l,i)=>{const L=S.ls[i];l.visible=!!L;if(!L)return;setLine(l,L.map(p=>[p[0],p[1],0]));for(let s=(S.ph*1.2)%30;s<L.length&&n<400;s+=30){const p=L[s|0];setI(U.dots,n,p[0],p[1],0,2.6);pCol(U.dots,n,'#ffb347');n++;}});pDone(U.dots,n);
    const key=S.ch.map(o=>o.x.toFixed(3)+o.y.toFixed(3)).join()+qs.join()+W;if(key!==U.key){U.key=key;const a=U.surf.geometry.attributes.position;for(let j=0;j<=U.ny;j++)for(let i=0;i<=U.nx;i++){const k=j*(U.nx+1)+i,x=i/U.nx*W,y=j/U.ny*H,ph=sim.field(S,P,x,y)[2];a.setXYZ(k,x,y,-50-45*Math.tanh(ph/1500));}a.needsUpdate=true;U.surf.geometry.computeVertexNormals();}
    U.surf.scale.set(1,1,1);U.surf.position.set(0,0,0);const px=S.pr.x*W,py=S.pr.y*H,[ex,ey]=sim.field(S,P,px,py),e=Math.hypot(ex,ey),l=clamp(Math.log10(1+e/500)*40,0,90);U.pr.position.set(px,py,0);if(e>0)setArrow(U.E,px,py,0,px+ex/e*l,py+ey/e*l,0,3);}};

/* Milliken */
SC3.milliken={build({W,H}){const U=T3.v9={};const g=S.g||{cx:W*0.24,pt:H*0.2,pb:H*0.78};const pw=(W<640?W:W*0.48)*0.7;U.pw=pw;const a=cube(pw,10,pw*0.6,NEON.red,{metal:0.7,glow:0.2});a.position.set(g.cx,g.pt-5,0);const b=cube(pw,10,pw*0.6,NEON.accent,{metal:0.7,glow:0.2});b.position.set(g.cx,g.pb+5,0);
    U.f=Array.from({length:9},()=>arrow3(NEON.violet));U.d=ball(12,0xe8b84a,{metal:0.3,rough:0.2});U.qE=arrow3(NEON.accent);U.mg=arrow3(NEON.violet);U.tr=line3(NEON.warm,90,{opacity:0.6});U.mic=cyl9(0x2a3246,{metal:0.8});U.lamp=halo(30,0xfff3c4,0.25);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const q=simOf('milliken').calc(P),{cx,pt,pb}=g,pw=U.pw,k=(pb-pt)*1.6,dy=(pt+pb)/2;
    U.f.forEach((a,i)=>{const x=cx-pw/2+pw*((i%3)+0.5)/3,z=((i/3|0)-1)*pw*0.18;a.visible=P.U>20;setArrow(a,x,pt+8,z,x,pb-8,z,1.6);});
    const x=cx+S.x*k,y=dy+S.y*k;U.d.position.set(x,y,0);const kk=60/Math.max(q.mg,q.Fe);setArrow(U.qE,x+18,y,0,x+18,y-q.Fe*kk,0,2.6);setArrow(U.mg,x-18,y,0,x-18,y+q.mg*kk,0,2.6);setLine(U.tr,S.tr.map(p=>[cx+p[0]*k,dy+p[1]*k,0]));
    U.mic.rotation.x=Math.PI/2;U.mic.scale.set(14,80,14);U.mic.position.set(cx,dy,150);U.lamp.position.set(cx-pw/2-30,dy,0);relabel(U,'q','q = '+P.n+'e','#ffd27a',18,x+46,y-20,0);}};

/* Faradey qafasi */
SC3.faradey={build({W,H}){const U=T3.v9={};U.pl=[cube(10,H*0.84,140,NEON.red,{metal:0.6,glow:0.2}),cube(10,H*0.84,140,NEON.accent,{metal:0.6,glow:0.2})];U.pl[0].position.set(18,H/2,0);U.pl[1].position.set(W-18,H/2,0);
    U.rings=[-60,-30,0,30,60].map(()=>tor9(1,0.03,0xc6cfe0,{metal:1,rough:0.2}));U.bars=Array.from({length:16},()=>rod(1.6,mat(0xc6cfe0,{metal:1})));U.ls=Array.from({length:40},()=>line3(0xb088ff,600,{opacity:0.75}));U.qs=pInst(40);U.pr=ball(6,0xffffff,{glow:1});U.E=arrow3(NEON.green);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g||!S.ls)return;const{cx,cy,a}=g;U.rings.forEach((r,i)=>{r.scale.setScalar(a);r.position.set(cx,cy,(i-2)*30);});U.bars.forEach((b,i)=>{const t=i/16*TAU;setRod(b,cx+Math.cos(t)*a,cy+Math.sin(t)*a,-60,cx+Math.cos(t)*a,cy+Math.sin(t)*a,60,1.6);});
    U.ls.forEach((l,i)=>{const L=S.ls[i];l.visible=!!L&&L.length>1;if(l.visible)setLine(l,L.map(p=>[p[0],p[1],0]));});let n=0;for(let i=0;i<40;i++){const t=i/40*TAU,c=Math.cos(t);if(Math.abs(c)<0.15)continue;setI(U.qs,n,cx+Math.cos(t)*(a+5),cy+Math.sin(t)*(a+5),0,2+Math.abs(c)*2.5);pCol(U.qs,n,c>0?'#ff5a5a':'#5b8cff');n++;}pDone(U.qs,n);
    const sim=simOf('faradey');if(sim.E){const px=S.pr.x*S.W,py=S.pr.y*S.H,e=sim.E(S,P,S.W,S.H,px,py);U.pr.position.set(px,py,0);setArrow(U.E,px,py,0,px+e[0]*40,py+e[1]*40,0,3);}else{U.pr.position.set(S.pr.x*S.W,S.pr.y*S.H,0);U.E.visible=false;}
    relabel(U,'e','E = 0','#3fe0a0',22,cx,cy,0);}};

/* Shunt */
SC3.shunt={build({W,H}){const U=T3.v9={};const g=S.g||{L:30,T:60,R:W*0.56,B:H-50};const{L,T,R,B}=g,my=(T+B)/2;U.my=my;
    wires([[L,T],[R,T],[R,my-40]],false);wires([[R,my+40],[R,B],[L,B],[L,T]],false);battery3(L,my);const rl=resistor3();rl.position.set((L+R)/2,T,0);rl.scale.setScalar(0.8);U.m=meter3(R,my,'G',0xff5a5a);
    U.wA=wires([[R,my-40],[R,my-22]],false).concat(wires([[R,my+22],[R,my+40]],false),wires([[R,my-40],[R+70,my-40],[R+70,my+40],[R,my+40]],false));U.rA=resistor3();U.rA.rotation.z=Math.PI/2;U.rA.scale.setScalar(0.6);U.rA.position.set(R+70,my,0);
    U.wV=wires([[R,my-40],[R,my-22]],false).concat(wires([[R,my+22],[R,my+40]],false));U.rV=resistor3();U.rV.rotation.z=Math.PI/2;U.rV.scale.setScalar(0.55);U.rV.position.set(R,my-56,0);U.dot=pInst(200);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const{L,T,R,B}=g,my=U.my,am=!P.mo;U.wA.forEach(o=>o.visible=am);U.rA.visible=am;U.rV.visible=!am;U.m.userData.np.rotation.z=1.1-2.2*clamp(S.ang,0,1);
    let n=dotsOn(U.dot,0,[[L,B],[L,T],[R,T],[R,B],[L,B]],S.ph*40,1,'#ffb347');if(am)n=dotsOn(U.dot,n,[[R,my-40],[R+70,my-40],[R+70,my+40],[R,my+40]],S.ph*40,1,'#ff5a5a');pDone(U.dot,Math.min(n,200));
    relabel(U,'m',am?'ampermetr':'voltmetr','#dfe7ff',18,R,my+64,0);}};

/* Siklotron */
SC3.siklotron={build({W,H}){const U=T3.v9={};const g=S.g||{cx:W*0.36,cy:H*0.5,Rp:H*0.44};const mk=s=>{const m=mesh(new THREE.CylinderGeometry(g.Rp,g.Rp,22,48,1,false,0,Math.PI),mat(0x5b8cff,{opacity:0.4,metal:0.7,glow:0.15,side:2}),false);m.rotation.set(Math.PI/2,0,s>0?0:Math.PI);m.position.set(g.cx+s*6,g.cy,0);return m;};U.D=[mk(1),mk(-1)];
    const mg=cyl9(0x4a3036,{metal:0.6,rough:0.5});mg.rotation.x=Math.PI/2;mg.scale.set(g.Rp*1.12,16,g.Rp*1.12);mg.position.set(g.cx,g.cy,-40);const ml=label3('S','#ff8a8a',26);ml.position.set(g.cx+g.Rp*1.05,g.cy-g.Rp*0.9,-30);T3.root.add(ml);
    U.path=line3(NEON.warm,4000,{opacity:0.75});U.p=ball(6,NEON.warm,{glow:2});U.h=halo(14,0xffb347,0.35);U.gE=arrow3(NEON.green);U.Bs=Array.from({length:6},()=>arrow3(NEON.violet));},
  update({S,P}){const U=T3.v9,g=S.g;if(!g||!S.hs.length)return;const{cx,cy,Rp}=g,sc=Rp/P.R,gap=10,h0=S.hs[0].r,pt=(h,u)=>{const a=h.side>0?-Math.PI/2+Math.PI*u:Math.PI/2+Math.PI*u;return[cx+h.side*gap/2+h.r*sc*Math.cos(a),cy+(h.yc-h0)*sc+h.r*sc*Math.sin(a),0];};
    const k=Math.floor(S.t/0.32),f=(S.t%0.32)/0.32,n=S.hs.length,pts=[];for(let i=0;i<Math.min(k,n);i++)for(let u=0;u<=1.0001;u+=0.05)pts.push(pt(S.hs[i],u));let cur;if(k<n){cur=pt(S.hs[k],f);pts.push(cur);}else{const l=pt(S.hs[n-1],1);cur=[l[0]+(k-n+f)*0.32*500,l[1],0];}
    setLine(U.path,pts.slice(-4000));U.p.position.set(...cur);U.h.position.set(...cur);const side=k<n?S.hs[k].side:1;setArrow(U.gE,cx-14*side,cy-Rp*0.6,0,cx+14*side,cy-Rp*0.6,0,2.4);U.Bs.forEach((a,i)=>{const x=cx+(i%3-1)*Rp*0.55,y=cy+((i/3|0)-0.5)*Rp*0.9;setArrow(a,x,y,-50,x,y,50,2);});}};

/* Motor */
SC3.motor={build({W,H}){const U=T3.v9={};const g=S.g||{cx:W*0.36,cy:H*0.48,rc:H*0.27};const{cx,cy,rc}=g;const n=cube(rc*0.6,rc*2.2,rc*2.4,NEON.red,{metal:0.4,rough:0.4});n.position.set(cx-rc*1.75,cy,0);const s=cube(rc*0.6,rc*2.2,rc*2.4,NEON.accent,{metal:0.4,rough:0.4});s.position.set(cx+rc*1.75,cy,0);
    U.lab=[label3('N','#ffffff',30),label3('S','#ffffff',30)];U.lab[0].position.set(cx-rc*1.75,cy,rc*1.25);U.lab[1].position.set(cx+rc*1.75,cy,rc*1.25);U.lab.forEach(l=>T3.root.add(l));
    U.Bl=Array.from({length:9},(_,i)=>{const l=line3(0xb088ff,2,{opacity:0.35});const y=cy+((i%3)-1)*rc*0.6,z=((i/3|0)-1)*rc*0.7;setLine(l,[[cx-rc*1.45,y,z],[cx+rc*1.45,y,z]]);return l;});
    U.sd=Array.from({length:4},()=>rod(3.4,mat(0xd88a3a,{metal:0.9,rough:0.25})));U.ax=cyl9(0xc6cfe0,{metal:1});U.cm=[0,1].map(()=>mesh(new THREE.CylinderGeometry(rc*0.16,rc*0.16,rc*0.25,24,1,false,0,Math.PI*0.9),mat(0xc98a2a,{metal:1,rough:0.2})));U.br=[cube(8,10,14,0x39425a,{metal:0.5}),cube(8,10,14,0x39425a,{metal:0.5})];U.F=[arrow3(NEON.green),arrow3(NEON.green)];U.dot=pInst(60);},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const{cx,cy,rc}=g,th=S.th,zl=rc*0.9,c=Math.cos(th),s=Math.sin(th),A=[cx+c*rc,cy-s*rc],B=[cx-c*rc,cy+s*rc];
    setRod(U.sd[0],A[0],A[1],-zl,A[0],A[1],zl,3.4);setRod(U.sd[1],B[0],B[1],-zl,B[0],B[1],zl,3.4);setRod(U.sd[2],A[0],A[1],zl,B[0],B[1],zl,3.4);setRod(U.sd[3],A[0],A[1],-zl,B[0],B[1],-zl,3.4);
    U.ax.rotation.x=Math.PI/2;U.ax.scale.set(4,zl*2+rc*0.9,4);U.ax.position.set(cx,cy,zl*0.4);U.cm.forEach((m,i)=>{m.rotation.set(Math.PI/2,0,0);m.rotateY(-th+i*Math.PI);m.position.set(cx,cy,zl+rc*0.25);});U.br[0].position.set(cx-rc*0.22,cy,zl+rc*0.25);U.br[1].position.set(cx+rc*0.22,cy,zl+rc*0.25);
    const sg=Math.sign(c)||1,F=clamp(Math.abs(S.I)*45,0,rc*0.9);setArrow(U.F[0],A[0],A[1],0,A[0],A[1]-sg*F,0,3);setArrow(U.F[1],B[0],B[1],0,B[0],B[1]+sg*F,0,3);
    let n=0;const ph=(S.t*3)%1;for(let i=0;i<10;i++){const u=((i/10+ph*sg)%1+1)%1;setI(U.dot,n,A[0],A[1],-zl+2*zl*u,3);pCol(U.dot,n,'#ffb347');n++;setI(U.dot,n,B[0],B[1],zl-2*zl*u,3);pCol(U.dot,n,'#ffb347');n++;}pDone(U.dot,n);
    relabel(U,'n',fmt(Math.abs(S.w)*60/TAU,0)+' ayl/min','#ffb347',18,cx,cy-rc*1.35,0);}};

/* Ikki yassi ko'zgu */
SC3.yassikozgu={build({W,H}){const U=T3.v9={};U.m=[cube(1,1,1,0xbfe0ff,{metal:1,rough:0.05,opacity:0.8}),cube(1,1,1,0xbfe0ff,{metal:1,rough:0.05,opacity:0.8})];U.o=[cyl9(NEON.red,{glow:0.4}),mesh(T3.cone,mat(NEON.red,{glow:0.4}))];U.im=Array.from({length:40},()=>[mesh(T3.cyl,mat(NEON.violet,{opacity:0.55,glow:0.5})),mesh(T3.cone,mat(NEON.violet,{opacity:0.55,glow:0.5}))]);U.c=line3(0x8e9cb2,121,{opacity:0.5});},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('yassikozgu'),{vx,vy,R}=g,al=P.al*D2R,q=sim.imgs(S,P),r=R*S.r;
    [0,al].forEach((a,i)=>{const m=U.m[i];m.scale.set(R,3,90);m.rotation.set(0,0,-a);m.position.set(vx+Math.cos(a)*R/2,vy-Math.sin(a)*R/2,0);});
    const put=(pair,a,o,s)=>{const x=vx+Math.cos(a)*r,y=vy-Math.sin(a)*r,dx=Math.cos(o),dy=-Math.sin(o);pair[0].visible=pair[1].visible=true;setRod(pair[0],x-dx*12,y-dy*12,0,x+dx*6,y+dy*6,0,4*s);pair[1].position.set(x+dx*12,y+dy*12,0);pair[1].scale.set(9*s,14,9*s);pair[1].quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx,dy,0));};
    put(U.o,q.th,q.ps,1);U.im.forEach((p,i)=>{if(i<q.list.length){const it=q.list[i];put(p,it.a,it.o,0.85);}else p[0].visible=p[1].visible=false;});
    const c=[];for(let i=0;i<=120;i++){const a=i/120*TAU;c.push([vx+Math.cos(a)*r,vy-Math.sin(a)*r,0]);}setLine(U.c,c);relabel(U,'n','tasvirlar: '+q.list.length,'#dfe7ff',20,vx,vy+40,0);}};

/* Mikroskop */
SC3.mikroskop={build({W,H}){const U=T3.v9={};U.ax=rod(1,mat(0x8e9cb2,{opacity:0.5}));U.l1=lensMesh(1,H*0.3);U.l2=lensMesh(1,H*0.36);U.tube=cyl9(0x2a3246,{opacity:0.12,metal:0.5});U.ob=arrow3(NEON.red);U.ii=arrow3(NEON.green);U.r=[line3(NEON.warm,4),line3(NEON.accent,4)];U.eye=ball(12,0xf3e6cf,{rough:0.6});U.pu=ball(6,0x3a2a1a,{rough:0.4});},
  update({S,P,W,H}){const U=T3.v9,g=S.g;if(!g)return;const q=simOf('mikroskop').calc(P),x0=-q.d1-1.2,x1=P.L+5,sx=(W-40)/(x1-x0),X=x=>20+(x-x0)*sx,ay=g.ay,h1=0.32*H,sy=h1/q.G1/0.1,Y=y=>ay-y*sy,h0=0.1;
    setRod(U.ax,0,ay,0,W,ay,0,1);U.l1.forEach(o=>o.position.set(X(0),ay,0));U.l2.forEach(o=>o.position.set(X(P.L),ay,0));U.tube.rotation.z=Math.PI/2;U.tube.scale.set(H*0.4,X(P.L)-X(0),H*0.4);U.tube.position.set((X(0)+X(P.L))/2,ay,-1);
    setArrow(U.ob,X(-q.d1),ay,0,X(-q.d1),Y(h0),0,3);const hi=-h0*q.G1;setArrow(U.ii,X(q.fi),ay,0,X(q.fi),Y(hi),0,3);
    [[h0,-h0/P.f1],[0,-h0/q.d1]].forEach(([y0,m],i)=>{const yEp=y0+m*P.L,mo=m-yEp/P.f2;setLine(U.r[i],[[X(-q.d1),Y(h0),0],[X(0),Y(y0),0],[X(P.L),Y(yEp),0],[X(x1),Y(yEp+mo*(x1-P.L)),0]]);});
    U.eye.scale.set(14,9,9);U.eye.position.set(X(P.L+3),ay,0);U.pu.position.set(X(P.L+3)-10,ay,0);relabel(U,'G',q.G?'Γ ≈ '+fmt(q.G,0)+'×':'—','#dfe7ff',22,W-90,40,0);}};

/* Relyativistik Doppler */
SC3.reldoppler={build({W,H}){const U=T3.v9={};U.fr=Array.from({length:30},()=>{const m=mesh(new THREE.TorusGeometry(1,0.012,6,96),new THREE.MeshBasicMaterial({color:0x7aa8ff,transparent:true,opacity:0.8}),false);return m;});U.fz=Array.from({length:30},()=>{const m=mesh(new THREE.TorusGeometry(1,0.006,6,96),new THREE.MeshBasicMaterial({color:0x5b8cff,transparent:true,opacity:0.25}),false);m.rotation.x=Math.PI/2;return m;});
    U.src=mesh(T3.sph,dynMat(0x88ff88,{glow:1.2}));U.o=[mesh(T3.sph,dynMat(0xffffff,{glow:1})),mesh(T3.sph,dynMat(0xffffff,{glow:1}))];U.v=arrow3(NEON.warm);},
  update({S,P,W,H}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('reldoppler'),L=sim.lam(P),cy=g.cy,cp=0.16*W;U.fr.forEach((m,i)=>{const f=S.fr[S.fr.length-1-i];m.visible=!!f;U.fz[i].visible=!!f;if(!f)return;const r=Math.max(1,(S.t-f.t)*cp);m.scale.setScalar(r);m.position.set(f.x*W,cy,0);U.fz[i].scale.setScalar(r);U.fz[i].position.set(f.x*W,cy,0);m.material.opacity=Math.max(0.1,0.7-r/W*0.5);});
    U.src.scale.setScalar(13);U.src.position.set(S.xs*W,cy,0);css9(U.src.material,wl2rgb(P.l0));setArrow(U.v,S.xs*W+16,cy,0,S.xs*W+16+P.b*90,cy,0,3);
    [[W*0.93,L.f],[W*0.07,L.r]].forEach(([x,l],i)=>{const m=U.o[i];m.scale.setScalar(17);m.position.set(x,cy,0);css9(m.material,wl2rgb(l));relabel(U,'l'+i,fmt(l,0)+' nm','#dfe7ff',16,x,cy+36,0);});
    relabel(U,'g','γ = '+fmt(L.g,3),'#dfe7ff',18,70,30,0);}};

/* Minkovskiy */
SC3.minkovskiy={build({W,H}){const U=T3.v9={};U.ax=[rod(2,mat(0xdfe7ff,{glow:0.3})),rod(2,mat(0xdfe7ff,{glow:0.3}))];U.ax2=[rod(2.4,mat(NEON.violet,{glow:0.8})),rod(2.4,mat(NEON.violet,{glow:0.8}))];
    U.cu=mesh(new THREE.CylinderGeometry(0,1,1,48,1,true),mat(NEON.warm,{opacity:0.16,glow:0.4,side:2}),false);U.cd=mesh(new THREE.CylinderGeometry(1,0,1,48,1,true),mat(NEON.warm,{opacity:0.1,glow:0.4,side:2}),false);
    U.pl=cube(1,1,1,NEON.violet,{opacity:0.18,glow:0.6});U.e=[ball(9,NEON.red,{glow:1}),ball(9,NEON.green,{glow:1})];U.h=[halo(16,0xff5a5a,0.4),halo(16,0x3fe0a0,0.4)];U.wl=[line3(0xff5a5a,2,{opacity:0.5}),line3(0x3fe0a0,2,{opacity:0.5})];},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('minkovskiy'),{ox,oy,u}=g,b=P.b,ga=1/Math.sqrt(1-b*b),X=v=>ox+v*u,Y=v=>oy-v*u,E=(xp,tp)=>[ga*(xp+b*tp),ga*(tp+b*xp)];
    setRod(U.ax[0],X(-5),oy,0,X(5),oy,0,2);setRod(U.ax[1],ox,Y(-5),0,ox,Y(5),0,2);const k=5/ga/(1+Math.abs(b));let a=E(0,-k),z=E(0,k);setRod(U.ax2[0],X(a[0]),Y(a[1]),0,X(z[0]),Y(z[1]),0,2.4);a=E(-k,0);z=E(k,0);setRod(U.ax2[1],X(a[0]),Y(a[1]),0,X(z[0]),Y(z[1]),0,2.4);
    const A=S.ev[0],h=3*u;U.cu.scale.set(h,h,h);U.cu.position.set(X(A[0]),Y(A[1])-h/2,0);U.cd.scale.set(h,h,h);U.cd.position.set(X(A[0]),Y(A[1])+h/2,0);
    const tp=sim.tau(S.t),c0=E(0,tp),ang=Math.atan(b);U.pl.scale.set(10*u/Math.cos(ang),1.5,6*u);U.pl.rotation.set(0,0,-ang);U.pl.position.set(X(c0[0]),Y(c0[1]),0);
    S.ev.forEach((e,i)=>{U.e[i].position.set(X(e[0]),Y(e[1]),0);U.h[i].visible=S.fl[i]>0;U.h[i].scale.setScalar(12+S.fl[i]*40);U.h[i].position.set(X(e[0]),Y(e[1]),0);setLine(U.wl[i],[[X(e[0]),Y(e[1]),0],[X(e[0]),oy,0]]);});
    relabel(U,'x','x','#dfe7ff',18,X(5)+10,oy,0);relabel(U,'t','ct','#dfe7ff',18,ox,Y(5)-14,0);relabel(U,'tp','ct′','#b088ff',18,X(E(0,k)[0]),Y(E(0,k)[1])-14,0);}};

/* Radiouglerod */
SC3.radiouglerod={build({W,H}){const U=T3.v9={};U.a=pInst(400);U.bt=pInst(80);const nar=W<640,gx=nar?W*0.12:W*0.53,gy=nar?H*0.58:H*0.1,gw=nar?W*0.8:W*0.42,gh=nar?H*0.32:H*0.72;U.G={gx,gy,gw,gh,z:chart3(gx,gx+gw,gy,gy+gh)};U.th=curve3(0x8e9cb2,101);U.ex=curve3(NEON.green,1000);U.mk=ball(5,NEON.green,{glow:1.5});},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const{ax,ay,sz}=g,cs=sz/10;let n=0,nb=0;S.at.forEach((a,i)=>{const ix=i%10,iy=(i/10|0)%10,iz=(i/100|0),x=ax+(ix+0.5)*cs,y=ay+(iy+0.5)*cs,z=(iz-1.5)*cs;setI(U.a,n,x,y,z,a.d?cs*0.18:cs*0.3);pCol(U.a,n,a.d?'#5d6680':'#3fe0a0');n++;
      const age=S.t-a.tf;if(a.d&&age<P.sp*0.6&&nb<80){const d=age/(P.sp*0.6)*sz*0.9,dx=hash9(i)-0.5,dy=hash9(i+7)-0.5,dz=hash9(i+13)-0.5,l=Math.hypot(dx,dy,dz)||1;setI(U.bt,nb,x+dx/l*d,y+dy/l*d,z+dz/l*d,2.5);pCol(U.bt,nb,'#ffb347');nb++;}});pDone(U.a,n);pDone(U.bt,nb);
    const G=U.G,th=[];for(let t=0;t<=40000;t+=400)th.push([t,Math.pow(2,-t/5730)]);setLine(U.th,chartLine(G.z,th,G.gx,G.gy,G.gw,G.gh,0,40000,0,1.05));setLine(U.ex,chartLine(G.z+1,S.h,G.gx,G.gy,G.gw,G.gh,0,40000,0,1.05));const l=S.h[S.h.length-1];U.mk.position.set(...chartLine(G.z+2,[l],G.gx,G.gy,G.gw,G.gh,0,40000,0,1.05)[0]);
    relabel(U,'t',fmt(S.t,0)+' yil','#dfe7ff',18,G.gx+G.gw-60,G.gy+14,G.z+3);}};

/* Gamma yutilish */
SC3.yutilish={build({W,H}){const U=T3.v9={};U.src=cube(40,48,48,0xffb347,{metal:0.5,glow:0.2});U.slab=mesh(T3.box,dynMat(0x7d8597,{metal:0.6,rough:0.5}));U.det=cube(1,1,1,0x5b8cff,{glow:0.4,metal:0.4,opacity:0.8});U.ph=pInst(200);U.fl=pInst(60);
    const gx=W*0.1,gy=H*0.66,gw=W*0.8,gh=H*0.26;U.G={gx,gy,gw,gh,z:chart3(gx,gx+gw,gy,gy+gh)};U.cv=curve3(NEON.accent,201);U.mk=ball(5,NEON.warm,{glow:1.5});},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const M=ABS_M[P.m],{sx,s0,s1,y0,y1,dx,W}=g,ym=(y0+y1)/2;U.src.position.set(sx-22,ym,0);U.slab.visible=P.x>0;U.slab.scale.set(Math.max(2,s1-s0),y1-y0+48,140);U.slab.position.set((s0+s1)/2,ym,0);css9(U.slab.material,M[2]);U.slab.material.emissiveIntensity=0.1;
    U.det.scale.set(W*0.07,y1-y0+20,120);U.det.position.set(dx+W*0.035,ym,0);let n=0;S.ph.forEach((p,i)=>{if(p.a!==1||n>=200)return;if(p.z3===undefined)p.z3=(Math.random()-0.5)*110;setI(U.ph,n,p.x,p.y,p.z3,2.6);pCol(U.ph,n,'#b088ff');n++;});pDone(U.ph,n);
    let m=0;S.fl.forEach(f=>{if(m>=60)return;if(f.z3===undefined)f.z3=(Math.random()-0.5)*110;setI(U.fl,m,f.x,f.y,f.z3,3+(0.4-f.t)*18);pCol(U.fl,m,'#ffb347');m++;});pDone(U.fl,m);
    const G=U.G,mu=M[1],th=[];for(let x=0;x<=20;x+=0.1)th.push([x,Math.exp(-mu*x)]);setLine(U.cv,chartLine(G.z,th,G.gx,G.gy,G.gw,G.gh,0,20,0,1.05));const meas=S.res.length?S.res.reduce((a,b)=>a+b,0)/S.res.length:Math.exp(-mu*P.x);U.mk.position.set(...chartLine(G.z+2,[[P.x,meas]],G.gx,G.gy,G.gw,G.gh,0,20,0,1.05)[0]);
    relabel(U,'m',M[0],'#dfe7ff',18,(s0+s1)/2,y0-46,0);relabel(U,'n',String(S.pass),'#dfe7ff',18,dx+W*0.035,y0-30,0);}};

/* Rentgen */
SC3.rentgen={build({W,H}){const U=T3.v9={};U.tube=ball(1,0xffffff,{glass:1,opacity:0.22});U.cat=cyl9(0x555c66,{metal:0.8});U.fil=halo(9,0xff9a3d,0.7);U.an=cyl9(0xb87333,{metal:0.9,rough:0.25});U.e=pInst(200);U.x=pInst(120);
    U.cv=curve3(NEON.accent,401);U.G=null;U.lm=rod(1.4,mat(NEON.red,{glow:1}));},
  update({S,P,W,H}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('rentgen'),q=sim.spec(P),{cx,cy,ax,tx,ty,tw,th}=g;U.tube.scale.set(tw/2,th*0.38,th*0.38);U.tube.position.set(tx+tw/2,cy,0);
    U.cat.rotation.z=Math.PI/2;U.cat.scale.set(10,20,10);U.cat.position.set(cx-12,cy,0);U.fil.position.set(cx,cy,0);U.an.rotation.z=Math.PI/2+0.5;U.an.scale.set(th*0.14,tw*0.18,th*0.14);U.an.position.set(ax+tw*0.08,cy,0);
    let n=0;S.e.forEach((e,i)=>{if(n<200){setI(U.e,n,e.x,e.y,(hash9(i)-0.5)*8,2.4);pCol(U.e,n,'#5b8cff');n++;}});pDone(U.e,n);let m=0;S.x.forEach((p,i)=>{if(m<120){if(p.z3===undefined)p.z3=(Math.random()-0.5)*1.2;setI(U.x,m,p.x,p.y,p.z3*p.t*g.s,2.6);pCol(U.x,m,'#b088ff');m++;}});pDone(U.x,m);
    if(!U.G){const nar=W<H*0.95,gx=nar?W*0.12:W*0.53,gy=nar?H*0.46:H*0.1,gw=nar?W*0.82:W*0.43,gh=nar?H*0.42:H*0.72;U.G={gx,gy,gw,gh,z:chart3(gx,gx+gw,gy,gy+gh)};}
    const G=U.G;setLine(U.cv,chartLine(G.z,q.pts,G.gx,G.gy,G.gw,G.gh,0,0.25,0,q.mx*1.12));U.lm.visible=q.lm<0.25;if(U.lm.visible){const x=G.gx+q.lm/0.25*G.gw;setRod(U.lm,x,G.gy,G.z+1,x,G.gy+G.gh,G.z+1,1.4);}
    relabel(U,'U','U = '+fmt(P.U,0)+' kV','#dfe7ff',18,tx+tw/2,ty-6,0);}};

/* Atom qobiqlari */
SC3.qobiq={build({W,H}){const U=T3.v9={};U.nuc=pInst(80);U.sh=[0,1,2,3].map(()=>tor9(1,0.008,0x5b8cff,{glow:0.6,opacity:0.6}));U.el=pInst(40);U.Z=-1;},
  update({S,P}){const U=T3.v9,g=S.g;if(!g)return;const sim=simOf('qobiq'),I=sim.info(P.Z),{bx,by,R}=g,rn=n=>R*(0.25+0.75*n/4),tilt=[[0.3,0],[1.1,0.4],[0.6,1.2],[1.4,2.1]];
    if(U.Z!==P.Z){U.Z=P.Z;const N=Math.min(80,P.Z+Math.round(P.Z*1.1)),rr=R*0.035*Math.cbrt(N);let k=0;for(let i=0;i<N;i++){const y=1-2*(i+0.5)/N,r=Math.sqrt(1-y*y),a=i*2.39996,d=rr*Math.cbrt(hash9(i)*0.7+0.3);setI(U.nuc,k,bx+Math.cos(a)*r*d,by+y*d,Math.sin(a)*r*d,R*0.03);pCol(U.nuc,k,i%2&&i/2<P.Z?'#ff5a5a':i<P.Z*2?'#ff5a5a':'#b8c0d0');k++;}
      for(let i=0;i<N;i++)pCol(U.nuc,i,i<P.Z?'#ff5a5a':'#b8c0d0');pDone(U.nuc,N);}
    let n=0;U.sh.forEach((t,j)=>{const k=I.sh[j]||0;t.visible=k>0;if(!k)return;const r=rn(j+1),[tx,ty]=tilt[j];t.scale.setScalar(r);t.position.set(bx,by,0);t.rotation.set(tx,ty,0);const e=new THREE.Euler(tx,ty,0);
      for(let i=0;i<k;i++){const a=S.t*(1.4/(j+1))+i*TAU/k,v=new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r,0).applyEuler(e);setI(U.el,n,bx+v.x,by+v.y,v.z,R*0.035);pCol(U.el,n,'#5fd4ff');n++;}});pDone(U.el,n);
    relabel(U,'s',QB_SYM[P.Z-1]+' · '+I.str,'#dfe7ff',20,bx,by-R-24,0);}};
