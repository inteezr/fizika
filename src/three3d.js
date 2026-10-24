/* ================= 3D DVIGATEL ================= */
const T3={ready:false,loading:null,on:false,drag:false,maps:{}};
const NEON={accent:0x5b8cff,warm:0xffb347,red:0xff5a5a,green:0x3fe0a0,violet:0xb088ff,water:0x3aa0ff,ink:0xdfe7ff,steel:0x8a96b0};
const T3LIBS=['build/three.min.js','examples/js/shaders/CopyShader.js','examples/js/shaders/LuminosityHighPassShader.js','examples/js/postprocessing/EffectComposer.js','examples/js/postprocessing/RenderPass.js','examples/js/postprocessing/ShaderPass.js','examples/js/postprocessing/UnrealBloomPass.js','examples/js/controls/OrbitControls.js','examples/js/environments/RoomEnvironment.js'].map(p=>'https://cdn.jsdelivr.net/npm/three@0.147.0/'+p);
function loadScript(u){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=u;s.onload=res;s.onerror=()=>rej(new Error(u));document.head.appendChild(s);});}
function load3D(){if(T3.ready)return Promise.resolve();if(!T3.loading)T3.loading=(async()=>{for(const u of T3LIBS)await loadScript(u);init3D();T3.ready=true;})().catch(e=>{T3.loading=null;throw e;});return T3.loading;}

function init3D(){_up=new THREE.Vector3(0,1,0);_d=new THREE.Vector3();THREE.ColorManagement.legacyMode=false;const LOW=matchMedia('(pointer: coarse)').matches||innerWidth<760;T3.LOW=LOW;const R=new THREE.WebGLRenderer({antialias:!LOW,alpha:false,powerPreference:'high-performance'});R.setPixelRatio(Math.min(LOW?1.5:2,window.devicePixelRatio||1));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
  R.domElement.className='c3d';T3.R=R;const sc=new THREE.Scene();sc.background=new THREE.Color(0x05070d);sc.fog=new THREE.FogExp2(0x05070d,0.02);T3.scene=sc;try{const pm=new THREE.PMREMGenerator(R);sc.environment=pm.fromScene(new THREE.RoomEnvironment(),0.04).texture;pm.dispose();}catch(e){}
  const cam=new THREE.PerspectiveCamera(38,1.6,0.1,400);T3.cam=cam;
  sc.add(new THREE.HemisphereLight(0x8fb4ff,0x0a0d16,0.35));const key=new THREE.DirectionalLight(0xffffff,1.25);key.position.set(6,14,9);key.castShadow=true;key.shadow.mapSize.set(LOW?1024:2048,LOW?1024:2048);const sh=key.shadow.camera;sh.left=-14;sh.right=14;sh.top=14;sh.bottom=-14;sh.near=1;sh.far=50;key.shadow.bias=-0.0005;sc.add(key);
  const rim1=new THREE.PointLight(0x5b8cff,1.6,70);rim1.position.set(-12,12,-10);sc.add(rim1);const rim2=new THREE.PointLight(0xff8a4c,1.0,70);rim2.position.set(12,10,-8);sc.add(rim2);
  const sg=new THREE.BufferGeometry(),sp=[];for(let i=0;i<(LOW?900:2200);i++){const r=80+Math.random()*90,a=Math.random()*TAU,b=Math.acos(2*Math.random()-1);sp.push(r*Math.sin(b)*Math.cos(a),r*Math.cos(b),r*Math.sin(b)*Math.sin(a));}
  sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));sc.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0x9fb6ff,size:0.4,sizeAttenuation:true,fog:false,transparent:true,opacity:0.8})));
  T3.G=new THREE.Group();sc.add(T3.G);T3.root=new THREE.Group();T3.G.add(T3.root);
  T3.pick=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({visible:false,side:THREE.DoubleSide}));T3.G.add(T3.pick);
  const ctl=new THREE.OrbitControls(cam,R.domElement);ctl.enableDamping=true;ctl.dampingFactor=0.08;ctl.maxDistance=60;ctl.minDistance=3;T3.ctl=ctl;
  const rt=new THREE.WebGLRenderTarget(800,500,{type:THREE.HalfFloatType,samples:LOW?0:4});const comp=new THREE.EffectComposer(R,rt);comp.addPass(new THREE.RenderPass(sc,cam));T3.bloom=new THREE.UnrealBloomPass(new THREE.Vector2(400,250),0.95,0.55,0.55);comp.addPass(T3.bloom);
  T3.fin=new THREE.ShaderPass({uniforms:{tDiffuse:{value:null},uTime:{value:0},uExp:{value:1.05}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader:'uniform sampler2D tDiffuse;uniform float uTime;uniform float uExp;varying vec2 vUv;vec3 aces(vec3 x){return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.,1.);}float hs(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 srgb(vec3 c){return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(.0031308,c));}void main(){vec2 d=vUv-.5;float r2=dot(d,d);vec2 o=d*r2*.02;vec3 c=vec3(texture2D(tDiffuse,vUv+o).r,texture2D(tDiffuse,vUv).g,texture2D(tDiffuse,vUv-o).b);c=srgb(aces(c*uExp));c*=1.-r2*.9;c+=(hs(vUv*913.+fract(uTime))-.5)*.022;gl_FragColor=vec4(c,1.);}'});
  comp.addPass(T3.fin);T3.comp=comp;
  T3.ray=new THREE.Raycaster();T3.ndc=new THREE.Vector2();T3.helixGeo=helixGeometry();T3.cone=new THREE.ConeGeometry(1,1,18);T3.cyl=new THREE.CylinderGeometry(1,1,1,14);T3.sph=new THREE.SphereGeometry(1,32,20);T3.box=new THREE.BoxGeometry(1,1,1);T3.lo=new THREE.IcosahedronGeometry(1,1);
  wrap.appendChild(R.domElement);
  const ev=(t)=>e=>{if(!T3.on||!cur.pointer)return;const p=pick3(e);if(!p)return;
    if(t==='down'){if(cur.pointer('down',p.x,p.y,S,P,api)){T3.drag=true;e.stopPropagation();try{wrap.setPointerCapture(e.pointerId);}catch(_){}}renderInsp();}
    else if(t==='move'){cur.pointer('move',p.x,p.y,S,P,api);if(T3.drag)e.stopPropagation();}
    else{if(T3.drag){cur.pointer('up',p.x,p.y,S,P,api);T3.drag=false;e.stopPropagation();renderInsp();}else cur.pointer('up',p.x,p.y,S,P,api);}};
  wrap.addEventListener('pointerdown',ev('down'),true);wrap.addEventListener('pointermove',ev('move'),true);wrap.addEventListener('pointerup',ev('up'),true);wrap.addEventListener('pointercancel',ev('up'),true);
}
function pick3(e){const r=T3.R.domElement.getBoundingClientRect();T3.ndc.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);T3.ray.setFromCamera(T3.ndc,T3.cam);const h=T3.ray.intersectObject(T3.pick,false)[0];if(!h)return null;const v=T3.G.worldToLocal(h.point.clone());return{x:v.x,y:v.y};}
function helixGeometry(){class Hx extends THREE.Curve{getPoint(t,o=new THREE.Vector3()){const a=t*TAU*10;return o.set(Math.cos(a),t,Math.sin(a));}}return new THREE.TubeGeometry(new Hx(),320,0.09,8,false);}

/* materiallar va yordamchilar (px koordinatalarda) */
const M3={};function mat(col,o={}){const k=col+JSON.stringify(o);if(M3[k])return M3[k];const m=o.glass?new THREE.MeshPhysicalMaterial({color:col,metalness:0,roughness:0.05,transmission:0.92,thickness:20,transparent:true,opacity:o.opacity??0.55,ior:1.5,side:THREE.DoubleSide,depthWrite:false})
  :new THREE.MeshStandardMaterial({color:col,metalness:o.metal??0.25,roughness:o.rough??0.35,emissive:o.glow?col:0x000000,emissiveIntensity:(o.glow??0)*1.4,transparent:o.opacity!==undefined,envMapIntensity:o.env??0.45,opacity:o.opacity??1,side:o.side?THREE.DoubleSide:THREE.FrontSide,depthWrite:o.opacity===undefined});return M3[k]=m;}
function mesh(geo,m,cast=true){const x=new THREE.Mesh(geo,m);x.castShadow=cast;x.receiveShadow=true;T3.root.add(x);return x;}
function ball(r,col,o){const m=mesh(T3.sph,mat(col,o));m.scale.setScalar(r);return m;}
function cube(w,h,d,col,o){const m=mesh(T3.box,mat(col,o));m.scale.set(w,h,d);return m;}
let _up,_d;
function arrow3(col){const g=new THREE.Group(),m=mat(col,{glow:0.9,metal:0.1}),s=new THREE.Mesh(T3.cyl,m),h=new THREE.Mesh(T3.cone,m);g.add(s,h);g.userData={s,h};T3.root.add(g);return g;}
function setArrow(g,x1,y1,z1,x2,y2,z2,w=3){_d.set(x2-x1,y2-y1,z2-z1);const L=_d.length();g.visible=L>2;if(!g.visible)return;_d.normalize();g.position.set(x1,y1,z1);g.quaternion.setFromUnitVectors(_up,_d);const hl=Math.min(16,L*0.45);g.userData.s.scale.set(w,L-hl,w);g.userData.s.position.y=(L-hl)/2;g.userData.h.scale.set(w*2.6,hl,w*2.6);g.userData.h.position.y=L-hl/2;}
function spring3(col){const m=new THREE.Mesh(T3.helixGeo,mat(col,{metal:0.8,rough:0.25}));m.castShadow=true;T3.root.add(m);return m;}
function setSpring(m,x1,y1,z1,x2,y2,z2,r){_d.set(x2-x1,y2-y1,z2-z1);const L=_d.length()||1;_d.normalize();m.position.set(x1,y1,z1);m.quaternion.setFromUnitVectors(_up,_d);m.scale.set(r,L,r);}
function line3(col,n,o={}){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));g.setDrawRange(0,0);const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:col,transparent:true,opacity:o.opacity??1}));l.frustumCulled=false;T3.root.add(l);return l;}
function setLine(l,pts){const a=l.geometry.attributes.position,n=Math.min(pts.length,a.count);for(let i=0;i<n;i++){const p=pts[i];a.array[i*3]=p[0];a.array[i*3+1]=p[1];a.array[i*3+2]=p[2]||0;}a.needsUpdate=true;l.geometry.setDrawRange(0,n);}
function sync(key,items,make,upd){const map=T3.maps[key]||(T3.maps[key]=new Map());const seen=new Set();items.forEach((it,i)=>{let o=map.get(it);if(!o){o=make(it);map.set(it,o);}seen.add(it);upd(o,it,i);});map.forEach((o,it)=>{if(!seen.has(it)){(Array.isArray(o)?o:[o]).forEach(x=>{if(x&&x.parent)x.parent.remove(x);});map.delete(it);}});}
function floorV(y,W,H){const g=new THREE.Mesh(new THREE.PlaneGeometry(W*4,W*3),mat(0x080c18,{metal:0.2,rough:0.85}));g.rotation.x=Math.PI/2;g.position.set(W/2,y,0);g.receiveShadow=true;T3.root.add(g);
  const gr=new THREE.GridHelper(W*4,64,0x2a4cbb,0x152040);gr.position.set(W/2,y-0.5,0);gr.material.transparent=true;gr.material.opacity=0.55;T3.root.add(gr);return g;}
function floorH(W,H,z=0){const g=new THREE.Mesh(new THREE.PlaneGeometry(W*3,H*3),mat(0x080c18,{metal:0.2,rough:0.85,side:1}));g.position.set(W/2,H/2,z-1);g.receiveShadow=true;T3.root.add(g);
  const gr=new THREE.GridHelper(W*3,60,0x2a4cbb,0x152040);gr.rotation.x=Math.PI/2;gr.position.set(W/2,H/2,z-0.5);gr.material.transparent=true;gr.material.opacity=0.5;T3.root.add(gr);return g;}
const hsl=(h,s=0.75,l=0.6)=>new THREE.Color().setHSL(h,s,l);

function clear3(){T3.maps={};T3.bar=T3.cl=T3.tw=T3.wg=T3.lab=T3.area=null;T3.root.traverse(o=>{if(o.geometry&&![T3.helixGeo,T3.cone,T3.cyl,T3.sph,T3.box,T3.lo].includes(o.geometry))o.geometry.dispose();});T3.G.remove(T3.root);T3.root=new THREE.Group();T3.G.add(T3.root);T3.built=null;}
function layout3(){const d=SC3[cur.id],K=W/16;T3.K=K;const G=T3.G;G.scale.set(1/K,-1/K,1/K);if(d.floor){G.rotation.set(-Math.PI/2,0,0);G.position.set(-W/2/K,0,-H/2/K);}else{G.rotation.set(0,0,0);G.position.set(-W/2/K,H/2/K,0);}
  T3.pick.scale.set(W*3,H*3,1);T3.pick.position.set(W/2,H/2,d.pickZ||0);}
function camReset(fly){const d=SC3[cur.id],c=(typeof d.cam==='function'?d.cam(W,H):d.cam)||(d.floor?[0,10.5,9.5,0,0,0.6]:[3.2,2.2,15,0,-0.3,0]);T3.ctl.target.set(c[3],c[4],c[5]);const to=new THREE.Vector3(c[0],c[1],c[2]);
  if(fly&&!RM3){const tg=T3.ctl.target,v=to.clone().sub(tg),from=tg.clone().add(v.clone().applyAxisAngle(_up,-0.9).multiplyScalar(1.55)).add(new THREE.Vector3(0,3,0));T3.cam.position.copy(from);T3.fly={from,to,t:0};}else{T3.cam.position.copy(to);T3.fly=null;}T3.ctl.update();}
const RM3=matchMedia('(prefers-reduced-motion: reduce)').matches;
function size3(){if(!T3.ready)return;const r=wrap.getBoundingClientRect();T3.R.setSize(r.width,r.height,false);T3.comp.setSize(r.width,r.height);T3.bloom.setSize(r.width/2,r.height/2);T3.cam.aspect=r.width/r.height;T3.cam.updateProjectionMatrix();}
function render3(dt){const d=SC3[cur.id];if(!d)return;const key=cur.id+'|'+Math.round(W)+'x'+Math.round(H);if(T3.built!==key){clear3();layout3();d.build({S,P,W,H});T3.built=key;}
  try{d.update({S,P,W,H,t:simTime,dt});}catch(e){console.error(e);}
  if(T3.fly){const f=T3.fly;f.t=Math.min(1,f.t+dt/1.4);const e=1-Math.pow(1-f.t,3);T3.cam.position.lerpVectors(f.from,f.to,e);if(f.t>=1)T3.fly=null;}
  T3.fin.uniforms.uTime.value=performance.now()/1000;T3.ctl.update();T3.comp.render();}

/* ================= 3D SAHNALAR ================= */
const SC3={};
SC3.labmex={build({W,H}){floorV(H,W,H);const back=new THREE.GridHelper(W*2,40,0x1d3270,0x111a33);back.rotation.x=Math.PI/2;back.position.set(W/2,H/2,-120);back.material.transparent=true;back.material.opacity=0.4;T3.root.add(back);},
  update({S,W,H}){const sc=W/10;sync('b',S.bodies,b=>b.fixed?cube(1,1,1,NEON.steel,{metal:0.9,rough:0.2}):ball(1,NEON.accent,{metal:0.55,rough:0.2}),(m,b)=>{const r=mrad(b.m)*sc;
      if(b.fixed!==m.userData.fx){m.userData.fx=b.fixed;m.material=b.fixed?mat(NEON.steel,{metal:0.9,rough:0.2}):mat(0xffffff,{metal:0.55,rough:0.2});m.geometry=b.fixed?T3.box:T3.sph;}
      if(b.fixed)m.scale.setScalar(r*1.6);else{m.scale.setScalar(r);m.material=mat(hsl(0.62-Math.min(b.m,10)/10*0.6).getHex(),{metal:0.5,rough:0.2,glow:b===S.sel?0.6:0.08});}m.position.set(b.x*sc,H-b.y*sc,0);});
    sync('s',S.springs,()=>spring3(NEON.ink),(m,s)=>{setSpring(m,s.a.x*sc,H-s.a.y*sc,0,s.b.x*sc,H-s.b.y*sc,0,9);m.material=mat(s===S.sel?NEON.accent:0xc9d4ee,{metal:0.85,rough:0.2,glow:s===S.sel?0.5:0});});
    const fs=[];S.bodies.forEach(b=>b.forces.forEach(F=>fs.push([b,F])));sync('f',fs.map(x=>x[1]),()=>arrow3(NEON.warm),(g,F,i)=>{const b=fs[i][0],x=b.x*sc,y=H-b.y*sc;setArrow(g,x,y,0,x+Math.cos(F.ang*D2R)*F.F*3,y-Math.sin(F.ang*D2R)*F.F*3,0,2.6);});}};
SC3.nyuton={build({W,H}){floorV(H*0.7,W,H);T3.blk=cube(1,1,1,NEON.accent,{metal:0.4,rough:0.3});T3.mg=arrow3(NEON.red);T3.N=arrow3(NEON.green);T3.fr=arrow3(NEON.red);T3.net=arrow3(NEON.green);},
  update({S,P,W,H}){const s=S.s||40,bx=S.bx||100,by=S.by||H*0.6,k=S.k||2,gy=H*0.7;T3.blk.scale.set(s,s,s);T3.blk.position.set(bx,by,0);
    sync('f',S.forces,()=>arrow3(NEON.warm),(g,f)=>{setArrow(g,bx,by,0,bx+Math.cos(f.ang*D2R)*f.F*k,by-Math.sin(f.ang*D2R)*f.F*k,0,2.6);g.children.forEach(c=>c.material=mat(f===S.sel?NEON.accent:NEON.warm,{glow:0.9,metal:0.1}));});
    setArrow(T3.mg,bx,by,s/2+2,bx,by+P.m*9.8*k,s/2+2,2);setArrow(T3.N,bx,gy,s/2+2,bx,gy-S.N*k,s/2+2,2);setArrow(T3.fr,bx,gy-3,s/2+4,bx+S.fr*k,gy-3,s/2+4,2.4);const net=S.Fx+S.fr;setArrow(T3.net,bx,gy-s-30,0,bx+clamp(net*k,-W*0.4,W*0.4),gy-s-30,0,3);}};
SC3.otilish={build({W,H}){floorV(H-40,W,H);T3.b=ball(9,NEON.red,{glow:0.8});T3.path=line3(0x6f7fa8,90,{opacity:0.6});T3.tr=line3(NEON.accent,70);},
  update({S,P,W,H}){const k=projCalc(P),ox=52,oy=H-40,sc=Math.min((W-90)/k.R,(H-80)/k.Hm),X=t=>ox+k.vx*t*sc,Y=t=>oy-(k.vy*t-P.g*t*t/2)*sc,pts=[],tr=[];
    for(let i=0;i<=80;i++){const t=k.T*i/80;pts.push([X(t),Y(t),0]);}for(let i=0;i<=60;i++){const t=S.t*i/60;tr.push([X(t),Y(t),0]);}setLine(T3.path,pts);setLine(T3.tr,tr);T3.b.position.set(X(S.t),Y(S.t),0);}};
SC3.aylana={floor:1,build({W,H}){floorH(W,H);T3.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.012,8,120),mat(NEON.accent,{glow:0.7}));T3.root.add(T3.ring);T3.post=cube(6,6,30,NEON.steel,{metal:0.9});T3.rod=mesh(T3.cyl,mat(0xaab4cc,{metal:0.9}));T3.b=ball(10,NEON.warm,{glow:0.3,metal:0.4});T3.v=arrow3(NEON.green);T3.a=arrow3(NEON.warm);},
  update({S,P,W,H}){const cx=W/2,cy=H/2,sc=(Math.min(W,H)/2-34)/5,R=P.r*sc,bx=cx+R*Math.cos(S.phi),by=cy-R*Math.sin(S.phi),z=14;T3.ring.position.set(cx,cy,z);T3.ring.scale.set(R,R,R);T3.post.position.set(cx,cy,15);
    T3.b.scale.setScalar(7+P.m*2.2);T3.b.position.set(bx,by,z);_d.set(bx-cx,by-cy,0);const L=_d.length();T3.rod.position.set((cx+bx)/2,(cy+by)/2,z);T3.rod.quaternion.setFromUnitVectors(_up,_d.normalize());T3.rod.scale.set(1.2,L,1.2);
    const vl=14*P.v;setArrow(T3.v,bx,by,z,bx-Math.sin(S.phi)*vl,by-Math.cos(S.phi)*vl,z,2.5);const a=P.v*P.v/P.r,al=Math.min(R*0.8,8+Math.sqrt(a)*12);setArrow(T3.a,bx,by,z,bx-Math.cos(S.phi)*al,by+Math.sin(S.phi)*al,z,2.5);}};
SC3.tortishish={floor:1,cam:[0,12,8,0,0,0.5],build({W,H}){T3.lt=new THREE.PointLight(0x7aa8ff,2.2,80);T3.root.add(T3.lt);T3.prev=line3(0xffffff,900,{opacity:0.45});T3.vel=arrow3(NEON.green);},
  update({S,P,W,H}){const X=x=>S.cx+x*S.sc,Y=y=>S.cy-y*S.sc;
    sync('p',S.pl,p=>ball(1,p.main?NEON.water:NEON.warm,{glow:p.main?0.55:0.7,metal:0.2,rough:0.6}),(m,p)=>{m.scale.setScalar(plR(p,P));m.position.set(X(p.x),Y(p.y),0);m.material=mat(p.main?NEON.water:NEON.warm,{glow:p===S.sel?1.2:p.main?0.55:0.7,metal:0.2,rough:0.6});if(p.main)T3.lt.position.copy(m.position);});
    sync('s',S.sats,s=>{const c=new THREE.Color(C[SATC[s.c%5]]||'#ffb347').getHex();return[ball(5,c,{glow:1.4}),line3(c,700,{opacity:0.8})];},([m,l],s)=>{m.position.set(X(s.x),Y(s.y),0);m.scale.setScalar(s===S.sel?7:5);setLine(l,s.tr.map(p=>[X(p[0]),Y(p[1]),0]));});
    if(S.launch){const L=S.launch,pts=[];let x=L.x0,y=L.y0,ux=(L.x1-L.x0)*0.5,uy=(L.y1-L.y0)*0.5;for(let i=0;i<900;i++){const[a,b]=gAcc(S.pl,P,x,y);ux+=a*0.02;uy+=b*0.02;x+=ux*0.02;y+=uy*0.02;pts.push([X(x),Y(y),0]);if(S.pl.some(p=>Math.hypot(p.x-x,p.y-y)<plR(p,P)/S.sc))break;}setLine(T3.prev,pts);setArrow(T3.vel,X(L.x0),Y(L.y0),0,X(L.x1),Y(L.y1),0,2.5);}
    else{T3.prev.geometry.setDrawRange(0,0);T3.vel.visible=false;}}};
SC3.kulon={floor:1,pickZ:16,build({W,H}){floorH(W,H);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(200*3),3));T3.dots=new THREE.Points(g,new THREE.PointsMaterial({color:0x9fd0ff,size:0.13,sizeAttenuation:true,transparent:true,opacity:0.85}));T3.dots.frustumCulled=false;T3.root.add(T3.dots);},
  update({S,P,W,H}){const X=x=>S.cx+x*S.sc,Y=y=>S.cy-y*S.sc,a=T3.dots.geometry.attributes.position;S.dots.forEach((d,i)=>{if(i>=200)return;a.array[i*3]=d.x;a.array[i*3+1]=d.y;a.array[i*3+2]=16;});a.needsUpdate=true;T3.dots.geometry.setDrawRange(0,Math.min(200,S.dots.length));
    sync('q',S.qs,q=>[ball(1,NEON.red,{glow:0.6}),arrow3(NEON.warm)],([m,ar],q)=>{const r=14+Math.abs(q.q)*2,col=q.q>0?NEON.red:q.q<0?NEON.accent:NEON.steel;m.material=mat(col,{glow:q===S.sel?1.4:0.7,metal:0.3,rough:0.3});m.scale.setScalar(r);m.position.set(X(q.x),Y(q.y),16);
      const[fx,fy]=kForce(S.qs,q),F=Math.hypot(fx,fy);if(F>0.002){const L=Math.min(150,10+F*5)+r;setArrow(ar,X(q.x),Y(q.y),16,X(q.x)+fx/F*L,Y(q.y)-fy/F*L,16,2.6);}else ar.visible=false;});}};
SC3.arximed={build({W,H}){const g=S.g;floorV(g.tb,W,H);const tw=g.tr-g.tl,dp=tw*0.5,glass=cube(tw,g.tb-H*0.1,dp,0x9fc6ff,{glass:1,opacity:0.18});glass.position.set((g.tl+g.tr)/2,(H*0.1+g.tb)/2,0);glass.castShadow=false;
    T3.water=cube(tw-4,1,dp-4,NEON.water,{opacity:0.42,glow:0.15,metal:0.1,rough:0.1});T3.water.castShadow=false;T3.mg=arrow3(NEON.red);T3.fa=arrow3(NEON.green);},
  update({S,P,W,H}){const g=S.g;T3.water.scale.y=g.tb-g.sy;T3.water.position.set((g.tl+g.tr)/2,(g.sy+g.tb)/2,0);
    sync('o',S.objs,()=>cube(1,1,1,NEON.warm,{metal:0.2,rough:0.5}),(m,o)=>{const s=o.side||50;m.scale.set(s,s,s);m.position.set(o.cx||W/3,(o.top||H/3)+s/2,0);m.material=mat(o.ro<P.rf?NEON.warm:o.ro>3000?0xaab4cc:NEON.violet,{metal:o.ro>2000?0.9:0.15,rough:o.ro>2000?0.25:0.6,glow:o===S.sel?0.35:0});});
    const o=S.sel&&S.objs.includes(S.sel)?S.sel:null;T3.mg.visible=T3.fa.visible=!!o;if(o&&o.side){const f=clamp(o.y,0,1),Vm=o.V/1000,mg=o.ro*Vm*9.8,FA=P.rf*9.8*Vm*f,k=(H*0.28)/Math.max(mg,P.rf*9.8*Vm),my=o.top+o.side/2,z=o.side/2+4;setArrow(T3.mg,o.cx-8,my,z,o.cx-8,my+mg*k,z,2.5);setArrow(T3.fa,o.cx+8,my,z,o.cx+8,my-FA*k,z,2.5);}}};
SC3.richag={build({W,H}){const g=S.g;floorV(g.cy+60,W,H);T3.beam=cube(1,12,40,NEON.warm,{metal:0.5,rough:0.35});const f=mesh(new THREE.ConeGeometry(30,54,4),mat(NEON.steel,{metal:0.85,rough:0.25}));f.position.set(g.cx,g.cy+33,0);f.rotation.y=Math.PI/4;f.rotation.x=Math.PI;},
  update({S,W,H}){const g=S.g;T3.beam.scale.x=2.4*g.sc;T3.beam.position.set(g.cx,g.cy,0);T3.beam.rotation.z=S.th;
    sync('w',S.ws,()=>[cube(1,1,1,NEON.accent,{metal:0.7,rough:0.25}),line3(0xcfd8ee,2)],([m,l],o)=>{const s=o.bs||20;m.scale.set(s,s,s);m.position.set(o.bx||g.cx,o.by||g.cy+30,0);m.material=mat(NEON.accent,{metal:0.7,rough:0.25,glow:o===S.sel?0.6:0.05});setLine(l,[[o.bx,o.by-s/2-24,0],[o.bx,o.by-s/2,0]]);});}};
SC3.energiya={build({W,H}){floorV(H-14,W,H);T3.b=ball(1,NEON.red,{metal:0.5,rough:0.2,glow:0.25});T3.key='';},
  update({S,P,W,H}){const sc=W/12,X=x=>x*sc,Y=y=>H-14-y*sc,k=JSON.stringify(S.cp)+W;if(k!==T3.key){T3.key=k;if(T3.trk)T3.root.remove(T3.trk);const pts=S.T.pts.map(p=>new THREE.Vector3(X(p[0]),Y(p[1]),0));
      T3.trk=new THREE.Group();[-18,18].forEach(z=>{const m=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(v=>v.clone().setZ(z))),300,3,8,false),mat(NEON.accent,{metal:0.8,rough:0.2,glow:0.35}));m.castShadow=true;T3.trk.add(m);});
      for(let i=0;i<pts.length;i+=6){const p=pts[i];const t=new THREE.Mesh(T3.box,mat(0x2a3555,{metal:0.6}));t.scale.set(3,3,40);t.position.copy(p);T3.trk.add(t);const post=new THREE.Mesh(T3.cyl,mat(0x2a3555,{metal:0.6}));post.scale.set(1.5,H-14-p.y,1.5);post.position.set(p.x,(p.y+H-14)/2,-18);T3.trk.add(post);}T3.root.add(T3.trk);}
    sync('cp',S.cp,()=>ball(6,NEON.warm,{glow:0.9}),(m,p)=>{m.position.set(X(p[0]),Y(p[1]),0);m.visible=true;});
    const q=tAt(S.T,S.s),r=0.22*sc;T3.b.scale.setScalar(r);T3.b.position.set(X(q.x)-q.sin*r,Y(q.y)-q.cos*r,0);T3.b.rotation.z=-S.s/0.22;}};
SC3.mayatnik={build({W,H}){floorV(H,W,H);T3.bar=cube(120,10,40,NEON.steel,{metal:0.9,rough:0.2});T3.rod=mesh(T3.cyl,mat(0xdfe6f5,{metal:0.9,rough:0.15}));T3.bob=ball(16,NEON.accent,{metal:0.85,rough:0.15,glow:0.15});T3.tr=line3(NEON.accent,120,{opacity:0.5});T3.hist=[];},
  update({S,P,W,H}){const px=W*0.4,py=30,sc=(H-80)/3.1,L=P.L*sc,bx=px+L*Math.sin(S.th),by=py+L*Math.cos(S.th);T3.bar.position.set(px,py-5,0);T3.rod.position.set((px+bx)/2,(py+by)/2,0);_d.set(bx-px,by-py,0);T3.rod.quaternion.setFromUnitVectors(_up,_d.clone().normalize());T3.rod.scale.set(1.5,L,1.5);T3.bob.position.set(bx,by,0);
    T3.hist.push([bx,by,0]);if(T3.hist.length>120)T3.hist.shift();setLine(T3.tr,T3.hist);}};
SC3.prujina={build({W,H}){const y=H*0.27;floorV(y+60,W,H);T3.wall=cube(20,140,120,NEON.steel,{metal:0.8,rough:0.3});T3.wall.position.set(16,y,0);T3.sp=spring3(0xd6deef);T3.blk=cube(1,1,1,NEON.accent,{metal:0.5,rough:0.25});},
  update({S,P,W,H}){const y=H*0.27,eq=W*0.46,sc=W*0.8,bw=34+P.m*6,bx=eq+S.x*sc;T3.root.children[0].position.y=y+bw/2+2;T3.root.children[1].position.y=y+bw/2+2;setSpring(T3.sp,26,y,0,bx-bw/2,y,0,12);T3.sp.rotation.z=-Math.PI/2;T3.sp.position.set(26,y,0);T3.sp.scale.set(12,bx-bw/2-26,12);
    T3.blk.scale.set(bw,bw,bw);T3.blk.position.set(bx,y,0);}};
SC3.tolqin={cam:[2,4,15,0,-0.4,0],build({W,H}){const nx=120,nz=24;T3.sheet=new THREE.Mesh(new THREE.PlaneGeometry(W-48,260,nx,nz),mat(NEON.accent,{opacity:0.55,glow:0.25,metal:0.3,rough:0.25,side:1}));T3.sheet.castShadow=false;T3.root.add(T3.sheet);T3.beads=[];
    for(let i=0;i<=Math.floor((W-48)/18);i++)T3.beads.push(ball(4,NEON.accent,{glow:0.6}));T3.red=ball(8,NEON.red,{glow:1});},
  update({S,P,W,H}){const x0=24,sc=(W-48)/8,y0=H*0.55,amp=P.A*(H*0.11),k=TAU/(P.v/P.f),w=TAU*P.f,Y=x=>y0-amp*Math.sin(w*S.t-k*x),g=T3.sheet.geometry,a=g.attributes.position;
    T3.sheet.rotation.x=-Math.PI/2;T3.sheet.position.set(W/2,0,-130);
    for(let i=0;i<a.count;i++){const lx=a.getX(i)+(W-48)/2;a.setZ(i,-Y(lx/sc));}a.needsUpdate=true;g.computeVertexNormals();T3.sheet.position.y=0;
    T3.beads.forEach((b,i)=>{const px=i*18;b.position.set(x0+px,Y(px/sc),0);});T3.red.position.set(x0+2*sc,Y(2),0);}};
SC3.interferensiya={floor:1,cam:[0,9,10,0,0,0.8],build({W,H}){const g=new THREE.PlaneGeometry(W,H,140,Math.round(140*H/W));T3.water=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x0d4fc0,metalness:0.2,roughness:0.32,emissive:0x061a44,emissiveIntensity:0.5,side:THREE.DoubleSide}));T3.water.position.set(W/2,H/2,0);T3.water.receiveShadow=true;T3.root.add(T3.water);},
  update({S,P,W,H}){const sc=W/24,sp=S.src.map(s=>[s.x*sc,H/2+s.y*sc]),n=sp.length||1,k=TAU/P.lam,w=TAU*0.9,a=T3.water.geometry.attributes.position;
    for(let i=0;i<a.count;i++){const x=a.getX(i)+W/2,y=-a.getY(i)+H/2;let v=0;for(const[sx,sy]of sp)v+=Math.cos(k*Math.hypot(x-sx,y-sy)/sc-w*S.t);a.setZ(i,v/n*16);}a.needsUpdate=true;T3.water.geometry.computeVertexNormals();T3.water.scale.y=-1;
    sync('src',S.src,()=>ball(9,NEON.warm,{glow:1.4}),(m,s,i)=>{m.position.set(sp[i][0],sp[i][1],22+Math.sin(w*S.t)*6);m.scale.setScalar(s===S.sel?12:9);});}};
SC3.turgun={build({W,H}){floorV(H*0.92,W,H);T3.str=line3(NEON.accent,300);T3.str2=null;T3.tube=null;T3.nodes=[];T3.cl=[cube(12,90,40,NEON.steel,{metal:0.9}),cube(12,90,40,NEON.steel,{metal:0.9})];},
  update({S,P,W,H}){const x0=40,x1=W-40,y0=H*0.45,A=H*0.22,k=Math.PI*P.n,w=TAU*(0.5+0.18*P.n),pts=[];for(let i=0;i<=200;i++){const u=i/200;pts.push(new THREE.Vector3(x0+u*(x1-x0),y0-A*Math.sin(k*u)*Math.cos(w*S.t),0));}
    if(T3.tube){T3.root.remove(T3.tube);T3.tube.geometry.dispose();}T3.tube=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),200,3,8,false),mat(NEON.accent,{glow:0.9,metal:0.2}));T3.root.add(T3.tube);
    T3.cl[0].position.set(x0-8,y0,0);T3.cl[1].position.set(x1+8,y0,0);while(T3.nodes.length<P.n+1)T3.nodes.push(ball(6,NEON.red,{glow:1.2}));T3.nodes.forEach((b,j)=>{b.visible=j<=P.n;b.position.set(x0+j/P.n*(x1-x0),y0,0);});}};
SC3.gaz={build({W,H}){floorV(H-20,W,H);T3.glass=cube(1,1,1,0x9fc6ff,{glass:1,opacity:0.12});T3.glass.castShadow=false;T3.edges=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),new THREE.LineBasicMaterial({color:0x7aa8ff}));T3.root.add(T3.edges);
    T3.pis=cube(10,1,1,NEON.warm,{metal:0.6,glow:0.2});T3.rod=cube(1,8,8,NEON.steel,{metal:0.9});T3.inst=new THREE.InstancedMesh(T3.sph,mat(0xffffff,{glow:0.6,metal:0.2}),120);T3.inst.castShadow=true;T3.root.add(T3.inst);T3.m4=new THREE.Matrix4();},
  update({S,P,W,H,dt}){const g=gasBox(W,H,P),D=Math.min(220,g.h),hue=0.62-(P.T-100)/900*0.62;[T3.glass,T3.edges].forEach(o=>{o.scale.set(g.w,g.h,D);o.position.set(g.x0+g.w/2,g.y0+g.h/2,0);});
    T3.pis.scale.set(10,g.h+8,D+8);T3.pis.position.set(g.x0+g.w+5,g.y0+g.h/2,0);T3.rod.scale.x=W*0.62-(g.x0+g.w)+10;T3.rod.position.set((g.x0+g.w+W*0.62+10)/2+5,g.y0+g.h/2,0);
    T3.inst.material=mat(hsl(hue,0.85,0.55).getHex(),{glow:0.7,metal:0.2});const n=Math.min(120,S.ps.length);T3.inst.count=n;
    for(let i=0;i<n;i++){const m=S.ps[i];if(m.z===undefined){m.z=(Math.random()-0.5)*(D-10);m.vz=(Math.random()-0.5)*Math.hypot(m.vx,m.vy)*1.4;}m.z+=m.vz*dt;if(Math.abs(m.z)>D/2-5){m.z=Math.sign(m.z)*(D/2-5);m.vz=-m.vz;}
      T3.m4.makeScale(5,5,5).setPosition(g.x0+m.x,g.y0+m.y,m.z);T3.inst.setMatrixAt(i,T3.m4);}T3.inst.instanceMatrix.needsUpdate=true;}};
SC3.lorens={build({W,H}){T3.inst=new THREE.InstancedMesh(T3.cone,mat(0x4a5f99,{glow:0.4}),400);const m4=new THREE.Matrix4(),q=new THREE.Quaternion().setFromUnitVectors(_up,new THREE.Vector3(0,0,-1));let i=0;
    for(let x=20;x<W&&i<400;x+=48)for(let y=20;y<H&&i<400;y+=48){m4.compose(new THREE.Vector3(x,y,-10),q,new THREE.Vector3(3,14,3));T3.inst.setMatrixAt(i++,m4);}T3.inst.count=i;T3.root.add(T3.inst);
    T3.p=ball(9,NEON.red,{glow:1.3});T3.tr=line3(NEON.red,500);T3.v=arrow3(NEON.green);T3.F=arrow3(NEON.warm);},
  update({S,P}){if(S.x===null)return;const col=P.q>0?NEON.red:NEON.accent;T3.p.material=mat(col,{glow:1.3});T3.tr.material.color.setHex(col);T3.p.position.set(S.x,S.y,0);setLine(T3.tr,S.tr.map(p=>[p[0],p[1],0]));
    const v=Math.hypot(S.vx,S.vy),r=20*1.04*P.m*P.v/P.B,cx=S.x+(S.vy/v)*r*P.q,cy=S.y-(S.vx/v)*r*P.q;setArrow(T3.v,S.x,S.y,0,S.x+S.vx/v*50,S.y+S.vy/v*50,0,2.4);setArrow(T3.F,S.x,S.y,0,S.x+(cx-S.x)/r*40,S.y+(cy-S.y)/r*40,0,2.4);}};
SC3.induksiya={build({W,H}){T3.ckey='';T3.mN=cube(1,26,26,NEON.red,{metal:0.5,rough:0.3});T3.mS=cube(1,26,26,NEON.accent,{metal:0.5,rough:0.3});floorV(H*0.32+70,W,H);},
  update({S,P,W,H}){const g=S.g;if(!g.sc)return;const cw=0.08*g.sc,cr=Math.min(46,H*0.12),turns=Math.round(6+P.N/100),key=turns+'|'+cw+'|'+cr;
    if(key!==T3.ckey){T3.ckey=key;if(T3.coil)T3.root.remove(T3.coil);class Hx extends THREE.Curve{getPoint(t,o=new THREE.Vector3()){const a=t*TAU*turns;return o.set(g.cx-cw/2+t*cw,g.cy+Math.cos(a)*cr,Math.sin(a)*cr);}}
      T3.coil=new THREE.Mesh(new THREE.TubeGeometry(new Hx(),turns*40,2.6,8,false),new THREE.MeshStandardMaterial({color:0xd88a3a,metalness:0.9,roughness:0.25,emissive:0xff7a1a,emissiveIntensity:0}));T3.coil.castShadow=true;T3.root.add(T3.coil);}
    T3.coil.material.emissiveIntensity=Math.min(2.5,Math.abs(S.emf)/Math.max(0.5,S.max)*2.5);const ml=g.ml;T3.mN.scale.x=T3.mS.scale.x=ml/2;T3.mN.position.set(g.mx+ml/4,g.cy,0);T3.mS.position.set(g.mx-ml/4,g.cy,0);}};
SC3.bor={cam:[0,4,14,-1.5,0,0],build({W,H}){T3.nuc=new THREE.Group();for(let i=0;i<7;i++){const b=new THREE.Mesh(T3.sph,mat(i%2?NEON.red:0xdfe6f5,{glow:i%2?0.9:0.2}));b.scale.setScalar(8);b.position.set((Math.random()-0.5)*13,(Math.random()-0.5)*13,(Math.random()-0.5)*13);T3.nuc.add(b);}T3.root.add(T3.nuc);
    T3.rings=[];for(let n=1;n<=6;n++){const r=new THREE.Mesh(new THREE.TorusGeometry(1,0.006,6,160),mat(NEON.accent,{glow:0.3,opacity:0.6}));T3.root.add(r);T3.rings.push(r);}T3.e=ball(10,NEON.accent,{glow:2});},
  update({S}){const g=S.g;if(!g.r)return;T3.nuc.position.set(g.cx,g.cy,0);T3.nuc.rotation.y+=0.01;T3.rings.forEach((r,i)=>{const R=g.r(i+1);r.position.set(g.cx,g.cy,0);r.scale.set(R,R,R);r.material=mat(i+1===S.n?NEON.warm:NEON.accent,{glow:i+1===S.n?1.2:0.3,opacity:0.7});});
    T3.e.position.set(g.cx+Math.cos(S.ang)*g.r(S.n),g.cy-Math.sin(S.ang)*g.r(S.n),0);sync('ph',S.ph,p=>ball(8,new THREE.Color(wl2rgb(p.lam)).getHex(),{glow:3}),(m,p)=>m.position.set(p.x,p.y,0));}};
SC3.labopt={floor:1,pickZ:20,cam:[0,10,9.5,0,0,0.6],build({W,H}){floorH(W,H);},
  update({S,P,W,H}){const sc=S.sc,z=20,rays=[];S.objs.filter(o=>o.t==='src').forEach(s=>srcRays(s).forEach(r=>rays.push(trace(S.objs,...r))));
    while((T3.rays||(T3.rays=[])).length<rays.length)T3.rays.push(line3(0xffc070,48));T3.rays.forEach((l,i)=>{if(i<rays.length){l.visible=true;setLine(l,rays[i].map(p=>[p[0]*sc,p[1]*sc,z]));}else l.visible=false;});
    sync('o',S.objs,o=>{const g=new THREE.Group();g.userData.key='';T3.root.add(g);return g;},(g,o)=>{const key=o.t+[o.w,o.h,o.s,o.F,o.kind].join(',');if(g.userData.key!==key){g.userData.key=key;while(g.children.length)g.remove(g.children[0]);
        if(o.t==='src'){const b=new THREE.Mesh(T3.box,mat(0x2a3555,{metal:0.8}));b.scale.set(36,22,22);b.position.x=-6;const l=new THREE.Mesh(T3.box,mat(0xffc070,{glow:2.5}));l.scale.set(4,16,16);l.position.x=13;g.add(b,l);}
        else if(o.t==='lens'){const m=new THREE.Mesh(T3.sph,mat(0x9fd0ff,{glass:1,opacity:0.5}));m.scale.set(o.F>0?10:6,o.h,o.h*0.5);g.add(m);const rim=new THREE.Mesh(new THREE.TorusGeometry(1,0.04,8,40),mat(NEON.water,{glow:0.8}));rim.rotation.y=Math.PI/2;rim.scale.set(o.h,o.h,o.h);g.add(rim);}
        else if(o.t==='mirror'){const m=new THREE.Mesh(T3.box,mat(0xe8eefc,{metal:1,rough:0.05,glow:0.15}));m.scale.set(5,o.h*2,36);g.add(m);}
        else{const pts=o.t==='block'?[[-o.w/2,-o.h/2],[o.w/2,-o.h/2],[o.w/2,o.h/2],[-o.w/2,o.h/2]]:[-90,30,150].map(a=>[o.s/Math.sqrt(3)*Math.cos(a*D2R),o.s/Math.sqrt(3)*Math.sin(a*D2R)]);
          const sh=new THREE.Shape(pts.map(p=>new THREE.Vector2(p[0]*sc,p[1]*sc)));const m=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:40,bevelEnabled:false}),mat(0x9fd0ff,{glass:1,opacity:0.35}));m.position.z=0;g.add(m);const e=new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),new THREE.LineBasicMaterial({color:0x7ab8ff}));g.add(e);}
        g.children.forEach(c=>{if(o.t!=='block'&&o.t!=='prism')c.scale.multiplyScalar(sc);});}
      g.position.set(o.x*sc,o.y*sc,o.t==='block'||o.t==='prism'?0:z);g.rotation.z=o.t==='block'?0:o.ang;g.children.forEach(c=>{if(c.material&&c.material.emissive&&o.t!=='src')c.material.emissiveIntensity=o===S.sel?0.6:(c.material===mat(NEON.water,{glow:0.8})?0.8:c.material.emissiveIntensity);});});}};
SC3.dispersiya={cam:[1,1.5,14,0.4,0,0],build({W,H}){T3.key='';T3.white=line3(0xffffff,2);T3.cols=DWL.map(l=>line3(new THREE.Color(wl2rgb(l)).getHex(),10));},
  update({S,P,W,H}){const g=dGeo(W,H,P),sim=SIMS.find(s=>s.id==='dispersiya'),key=g.pts.flat().map(v=>v.toFixed(1)).join();if(key!==T3.key){T3.key=key;if(T3.pr)T3.root.remove(T3.pr);const sh=new THREE.Shape(g.pts.map(p=>new THREE.Vector2(p[0],p[1])));
      T3.pr=new THREE.Group();const m=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:120,bevelEnabled:false}),mat(0xbfe0ff,{glass:1,opacity:0.3}));m.position.z=-60;const e=new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry),new THREE.LineBasicMaterial({color:0x9fd0ff}));e.position.z=-60;T3.pr.add(m,e);T3.root.add(T3.pr);}
    const sx=g.mx-g.dx*W,sy=g.my-g.dy*W;setLine(T3.white,[[sx,sy,0],[g.mx,g.my,0]]);DWL.forEach((l,i)=>{const pts=trace([{t:'poly',pts:g.pts,cx:g.cx,cy:g.cy,n:sim.nOf(l,P)}],sx,sy,g.dx,g.dy);setLine(T3.cols[i],pts.slice(1).map(p=>[p[0],p[1],0]));});}};
SC3.bosim={build({W,H}){const g=S.g;floorV(H-18,W,H);T3.k='';T3.inst=new THREE.InstancedMesh(T3.sph,mat(NEON.water,{glow:0.5}),900);T3.inst.castShadow=false;T3.root.add(T3.inst);T3.m4=new THREE.Matrix4();T3.probe=ball(9,NEON.red,{glow:0.8});},
  update({S,P,W,H}){const g=S.g;if(!g.sc)return;const key=P.hw+'|'+P.rho+'|'+W;if(key!==T3.k){T3.k=key;if(T3.tank)T3.root.remove(T3.tank);T3.tank=new THREE.Group();const tw=g.tr-g.tl,dp=tw*0.6,liq=P.rho===13600?0xb8c0d0:NEON.water;
      const gl=new THREE.Mesh(T3.box,mat(0x9fc6ff,{glass:1,opacity:0.15}));gl.scale.set(tw,g.gy-g.tt,dp);gl.position.set((g.tl+g.tr)/2,(g.tt+g.gy)/2,0);const wa=new THREE.Mesh(T3.box,mat(liq,{opacity:0.45,glow:0.15,metal:P.rho===13600?0.9:0.1,rough:0.1}));wa.scale.set(tw-4,g.gy-g.surf,dp-4);wa.position.set((g.tl+g.tr)/2,(g.surf+g.gy)/2,0);T3.tank.add(gl,wa);T3.root.add(T3.tank);}
    const n=Math.min(900,S.drops.length);T3.inst.count=n;for(let i=0;i<n;i++){const d=S.drops[i];T3.m4.makeScale(2.6,2.6,2.6).setPosition(d.x,d.y,0);T3.inst.setMatrixAt(i,T3.m4);}T3.inst.instanceMatrix.needsUpdate=true;
    const pr=S.probe;T3.probe.position.set(g.tl+pr.xf*(g.tr-g.tl),g.surf+pr.d*P.hw*g.sc,0);sync('h',S.holes,()=>ball(6,0x111522,{metal:0.9}),(m,h)=>m.position.set(g.tr,g.surf+h.d*P.hw*g.sc,0));}};
