/* ===== Gaz laboratoriyalari: molekulyar fizika (mol) va termodinamika (trm) ===== */
/* Model birliklari: masofa — px, vaqt — s. kT0 = 11250 px²/s² ≡ 300 K. 120 zarra, 480×380 px idish ≡ 100 kPa · 1 L ≡ 100 J. */
const GZ={BH:380,BW0:480,BWmax:560,kT0:11250,A0:480*380,N0:120};
GZ.ps=100*GZ.A0/(GZ.N0*GZ.kT0);GZ.es=100/(GZ.N0*GZ.kT0);
const GZ_SP=[{m:1,r:4,col:'#5fb4ff',n:'A gaz (m₀)'},{m:4,r:5,col:'#ff9f43',n:'B gaz (4m₀)'}];
function gzGauss(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(TAU*v);}
function gzP(x,y,sp,kT){const m=GZ_SP[sp].m,s=Math.sqrt(kT/m);return{x,y,vx:s*gzGauss(),vy:s*gzGauss(),sp,m,r:GZ_SP[sp].r};}
function gzFill(arr,n,sp,kT,x0,x1){const a=[];for(let i=0;i<n;i++)a.push(gzP(x0+8+Math.random()*(x1-x0-16),8+Math.random()*(GZ.BH-16),sp,kT));let e=0;a.forEach(p=>e+=0.5*p.m*(p.vx*p.vx+p.vy*p.vy));const f=n?Math.sqrt(n*kT/e):1;a.forEach(p=>{p.vx*=f;p.vy*=f;arr.push(p);});return arr;}
const GZ_PRE={
  bosim:()=>({ps:gzFill([],120,0,GZ.kT0,0,480)}),
  diffuziya:()=>{const a=gzFill([],90,0,GZ.kT0,0,240);gzFill(a,90,1,GZ.kT0,240,480);return{ps:a,part:{gap:70,cond:0}};},
  broun:()=>({ps:gzFill([],230,0,GZ.kT0,0,480),hv:[{x:240,y:190,vx:0,vy:0,m:60,r:20,tr:[]}]}),
  aralash:()=>{const a=gzFill([],80,0,GZ.kT0,0,480);gzFill(a,80,1,GZ.kT0,0,480);return{ps:a};},
  izoterma:()=>({ps:gzFill([],120,0,GZ.kT0,0,480),wm:1,Tw:300}),
  adiabata:()=>({ps:gzFill([],120,0,GZ.kT0,0,480),wm:0}),
  izobara:()=>({ps:gzFill([],120,0,GZ.kT0,0,320),px:320,pm:1,pex:150,wm:1,Tw:480}),
  almashinuv:()=>{const a=gzFill([],80,0,GZ.kT0*2,0,240);gzFill(a,80,0,GZ.kT0*0.5,240,480);return{ps:a,part:{gap:0,cond:1}};},
  bosh:()=>({ps:[]})};
function mkGasLab(cfg){
  const init=P=>{const pr=GZ_PRE[cfg.presets[P.pre][0]]();const S=Object.assign({ps:[],hv:[],part:null,px:GZ.BW0,vp:0,pm:0,pex:100,Mp:80,wm:0,Tw:300,Tp:0,sel:null,t:0,imp:0,pA:0,pS:null,kTs:null,Q:0,W:0,pv:[],hist:[new Float32Array(24),new Float32Array(24)],pt:null,drag:null},pr);
    S.U0=gzU(S);S.kTs=gzKT(S);S.pS=S.ps.length*S.kTs/(S.px*GZ.BH);if(S.part&&S.part.cond)S.Tp=gzKT(S);return S;};
  const gzKT=S=>{let e=0;S.ps.forEach(p=>e+=0.5*p.m*(p.vx*p.vx+p.vy*p.vy));return S.ps.length?e/S.ps.length:0;};
  function gzU(S){let e=0;S.ps.forEach(p=>e+=0.5*p.m*(p.vx*p.vx+p.vy*p.vy));return e;}
  const therm=(p,kT,nx,ny)=>{/* devordan termal qaytish: normal — oqim taqsimoti, urinma — Gauss */const s=Math.sqrt(kT/p.m),vn=s*Math.sqrt(-2*Math.log(Math.random()||1e-9)),vt=s*gzGauss();p.vx=nx*vn-ny*vt;p.vy=ny*vn+nx*vt;};
  return{id:cfg.id,cat:cfg.cat,lab:1,sandbox:1,title:cfg.title,short:cfg.short,sub:cfg.sub,formula:cfg.formula,text:[LABTXT,cfg.text],legend:cfg.legend,tries:cfg.tries,
    hint:'Porshenni sudrang yoki zarralar qo‘shing',
    tools:[{id:'move',label:'Surish'},{id:'addA',label:'+ A gaz'},{id:'addB',label:'+ B gaz'},{id:'heavy',label:'+ Broun zarrasi'},{id:'del',label:'O‘chirish'},{id:'wall',label:'To‘siq',act:1},{id:'heat',label:'Isitish 🔥',act:1},{id:'cool',label:'Sovutish ❄',act:1},{id:'clear',label:'Bo‘sh idish',act:1}],
    hints:{move:'Porshenni sudrang; devor yoki to‘siqni bosib sozlang',addA:'Idish ichini bosing: 10 ta yengil molekula',addB:'Idish ichini bosing: 10 ta og‘ir molekula',heavy:'Idish ichini bosing',del:'Molekulalar to‘dasini yoki katta zarrani bosing'},
    params:[{id:'pre',label:'Tajriba',choices:cfg.presets.map(([k,l],i)=>[i,l]),val:0,reset:1},{id:'sp',label:'Vaqt tezligi',sym:'',min:0.2,max:2,step:0.1,val:1,unit:'×',d:1}],
    init,
    action(id,S){const kT=gzKT(S)||GZ.kT0;
      if(id==='clear'){S.ps=[];S.hv=[];S.sel=null;S.Q=0;S.W=0;S.U0=0;S.pv=[];}
      if(id==='wall'){S.part=S.part?null:{gap:0,cond:0};S.sel=S.part?'part':null;}
      if(id==='heat'||id==='cool'){const f=Math.sqrt(id==='heat'?1.2:0.8);const e0=gzU(S);S.ps.forEach(p=>{p.vx*=f;p.vy*=f;});S.Q+=(gzU(S)-e0);}},
    step(S,P,dt){dt=Math.min(dt,0.04)*P.sp;S.t+=dt;const n=5,h=dt/n,BH=GZ.BH,ps=S.ps,wx=GZ.BW0/2;let imp=0;const kTw=S.Tw/300*GZ.kT0;
      for(let it=0;it<n;it++){
        /* porshen */
        if(S.pt!=null){S.vp=clamp((S.pt-S.px)/h,-60,60);}else if(S.pm){S.vp+=(-(S.pex/GZ.ps)*BH)*h/S.Mp;S.vp*=1-0.6*h;}else S.vp=0;
        S.px+=S.vp*h;const lo=(S.part?wx:0)+40;if(S.px<lo){S.px=lo;if(S.vp<0)S.vp=0;}if(S.px>GZ.BWmax){S.px=GZ.BWmax;if(S.vp>0)S.vp=0;}
        const all=ps.concat(S.hv);
        all.forEach(p=>{const ox=p.x;if(p===S.drag){p.vx=p.vy=0;return;}p.x+=p.vx*h;p.y+=p.vy*h;const r=p.r,m=p.m;
          if(p.y<r){const v0=Math.abs(p.vy);if(S.wm&&!p.tr){const k0=0.5*m*(p.vx*p.vx+p.vy*p.vy);therm(p,kTw,0,1);S.Q+=0.5*m*(p.vx*p.vx+p.vy*p.vy)-k0;}else p.vy=Math.abs(p.vy);p.y=r;imp+=m*(Math.abs(p.vy)+v0);}
          if(p.y>BH-r){const v0=Math.abs(p.vy);if(S.wm&&!p.tr){const k0=0.5*m*(p.vx*p.vx+p.vy*p.vy);therm(p,kTw,0,-1);S.Q+=0.5*m*(p.vx*p.vx+p.vy*p.vy)-k0;}else p.vy=-Math.abs(p.vy);p.y=BH-r;imp+=m*(Math.abs(p.vy)+v0);}
          if(p.x<r){const v0=Math.abs(p.vx);if(S.wm&&!p.tr){const k0=0.5*m*(p.vx*p.vx+p.vy*p.vy);therm(p,kTw,1,0);S.Q+=0.5*m*(p.vx*p.vx+p.vy*p.vy)-k0;}else p.vx=v0;p.x=r;imp+=m*(Math.abs(p.vx)+v0);}
          if(p.x>S.px-r&&p.vx>S.vp){const k0=0.5*m*p.vx*p.vx,v0=p.vx;p.vx=2*S.vp-p.vx;p.x=S.px-r;const J=m*(v0-p.vx);imp+=J;S.W-=0.5*m*p.vx*p.vx-k0;if(S.pm&&S.pt==null)S.vp+=J/S.Mp;}
          if(S.part){const g=S.part,ing=g.gap>0&&Math.abs(p.y-BH/2)<g.gap/2-r*0.3;
            if(!ing){if(ox<=wx-3-r+1e-6&&p.x>wx-3-r){const k0=0.5*m*(p.vx*p.vx+p.vy*p.vy);if(g.cond&&!p.tr){therm(p,S.Tp,-1,0);S.Tp-=(0.5*m*(p.vx*p.vx+p.vy*p.vy)-k0)/12;S.Tp=Math.max(S.Tp,50);}else p.vx=-Math.abs(p.vx);p.x=wx-3-r;}
              else if(ox>=wx+3+r-1e-6&&p.x<wx+3+r){const k0=0.5*m*(p.vx*p.vx+p.vy*p.vy);if(g.cond&&!p.tr){therm(p,S.Tp,1,0);S.Tp-=(0.5*m*(p.vx*p.vx+p.vy*p.vy)-k0)/12;S.Tp=Math.max(S.Tp,50);}else p.vx=Math.abs(p.vx);p.x=wx+3+r;}}}});
        /* elastik to‘qnashuvlar */
        for(let i=0;i<all.length;i++){const a=all[i];for(let j=i+1;j<all.length;j++){const b=all[j],dx=b.x-a.x;const R=a.r+b.r;if(dx>R||dx<-R)continue;const dy=b.y-a.y;if(dy>R||dy<-R)continue;const d2=dx*dx+dy*dy;if(d2>=R*R||d2<1e-9)continue;
          const d=Math.sqrt(d2),nx=dx/d,ny=dy/d,ma=a===S.drag?1e9:a.m,mb=b===S.drag?1e9:b.m,vr=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
          if(vr<0){const J=2*vr/(1/ma+1/mb);a.vx+=J/ma*nx;a.vy+=J/ma*ny;b.vx-=J/mb*nx;b.vy-=J/mb*ny;}const ov=(R-d)/(1/ma+1/mb);a.x-=ov/ma*nx;a.y-=ov/ma*ny;b.x+=ov/mb*nx;b.y+=ov/mb*ny;}}
      }
      S.hv.forEach(b=>{b.tr.push(b.x,b.y);if(b.tr.length>1600)b.tr.splice(0,2);});
      /* bosim: devorlarga berilgan impuls / (perimetr · vaqt) */
      const per=2*(S.px+BH),pi=imp/(dt*per);S.pS=S.pS==null?pi:S.pS+(pi-S.pS)*Math.min(1,dt/1.2);
      const kT=gzKT(S);S.kTs=S.kTs==null?kT:S.kTs+(kT-S.kTs)*Math.min(1,dt/0.5);
      const vm=520;ps.forEach(p=>{const k=Math.floor(Math.hypot(p.vx,p.vy)/vm*24);if(k<24)S.hist[p.sp][k]+=1;});S.hist.forEach(hh=>{for(let k=0;k<24;k++)hh[k]*=0.97;});
      if(cfg.cat==='trm'&&ps.length){S.pvT=(S.pvT||0)+dt;if(S.pvT>0.15){S.pvT=0;S.pv.push([S.px*BH/GZ.A0,S.pS*GZ.ps]);if(S.pv.length>500)S.pv.shift();}}
    },
    draw(c,W,H,S,P){const pw=Math.min(W*0.34,330),bw=W-pw-36,sc=Math.min(bw/(GZ.BWmax+34),(H-56)/GZ.BH),ox=18,oy=(H-GZ.BH*sc)/2+8,BH=GZ.BH,X=x=>ox+x*sc,Y=y=>oy+y*sc;S.geo={ox,oy,sc};
      grid(c,W,H,28);const hot=S.Tw>300,wc=S.wm?(hot?'#ff5a4e':'#4ea8ff'):C.ink;
      c.fillStyle=rgba('water',0.06);c.fillRect(X(0),Y(0),(S.px)*sc,BH*sc);
      c.strokeStyle=wc;c.lineWidth=S.sel==='walls'?6:4;if(S.wm){c.shadowColor=wc;c.shadowBlur=12;}c.beginPath();c.moveTo(X(GZ.BWmax+10),Y(0)-2);c.lineTo(X(0)-2,Y(0)-2);c.lineTo(X(0)-2,Y(BH)+2);c.lineTo(X(GZ.BWmax+10),Y(BH)+2);c.stroke();c.shadowBlur=0;
      if(S.wm)txt(c,'termostat '+fmt(S.Tw,0)+' K',X(6),Y(0)-12,wc,{font:SMALL});
      if(S.part){const wx=GZ.BW0/2,g=S.part.gap,col=S.part.cond?'#ffb347':'#c8d0e0';c.fillStyle=S.sel==='part'?C.accent:col;const y1=BH/2-g/2,y2=BH/2+g/2;c.fillRect(X(wx-3),Y(0),6*sc,(y1)*sc);c.fillRect(X(wx-3),Y(y2),6*sc,(BH-y2)*sc);if(S.part.cond)txt(c,fmt(S.Tp/GZ.kT0*300,0)+' K',X(wx),Y(BH)+14,col,{align:'center',font:SMALL});}
      /* zarralar */
      GZ_SP.forEach((sp,k)=>{c.fillStyle=sp.col;c.beginPath();S.ps.forEach(p=>{if(p.sp!==k)return;c.moveTo(X(p.x)+p.r*sc,Y(p.y));c.arc(X(p.x),Y(p.y),p.r*sc,0,TAU);});c.fill();});
      S.hv.forEach(b=>{c.strokeStyle=rgba('warm',0.7);c.lineWidth=1.5;c.beginPath();for(let i=0;i<b.tr.length;i+=2){i?c.lineTo(X(b.tr[i]),Y(b.tr[i+1])):c.moveTo(X(b.tr[i]),Y(b.tr[i+1]));}c.stroke();disk(c,X(b.x),Y(b.y),b.r*sc,'#e8c547','#fff');if(S.sel===b)selRing(c,X(b.x),Y(b.y),b.r*sc+6);});
      /* porshen */
      const pxs=X(S.px);c.fillStyle=S.sel==='piston'?C.accent:'#9aa6b8';rrect(c,pxs,Y(0)-2,12,BH*sc+4,3);c.fill();c.fillStyle='#6b7486';c.fillRect(pxs+12,Y(BH/2)-5,X(GZ.BWmax+16)-pxs-12,10);
      if(S.pm){arrow(c,pxs+60,Y(BH/2)-30,pxs+24,Y(BH/2)-30,C.red,2.5);txt(c,'p tashq = '+fmt(S.pex,0)+' kPa',pxs+16,Y(BH/2)-48,C.red,{font:SMALL});}
      /* o‘ng panel */
      const gx=W-pw-6,gw=pw-8,g1t=26,g1b=H*0.47,g2t=H*0.55,g2b=H-30;rrect(c,gx-8,10,pw+2,H-20,10);c.fillStyle=rgba('panel',0.85);c.fill();
      txt(c,'Tezliklar taqsimoti',gx,g1t-8,C.muted,{font:SMALL});line(c,gx,g1b,gx+gw,g1b,C.ink,1);const kT=S.kTs||GZ.kT0,cnt=[0,0];S.ps.forEach(p=>cnt[p.sp]++);
      let mx=1e-9;S.hist.forEach(hh=>hh.forEach(v=>mx=Math.max(mx,v)));const bwid=gw/24;
      S.hist.forEach((hh,k)=>{if(!cnt[k])return;c.fillStyle=k?'rgba(255,159,67,0.55)':'rgba(95,180,255,0.55)';for(let i=0;i<24;i++){const hgt=hh[i]/mx*(g1b-g1t-10);c.fillRect(gx+i*bwid+1,g1b-hgt,bwid-2,hgt);}
        /* nazariy Maksvell (2D): f(v) = (m v/kT)·exp(−m v²/2kT) */
        const m=GZ_SP[k].m,tot=hh.reduce((a,b)=>a+b,0),dv=520/24;c.strokeStyle=k?'#ff9f43':'#5fb4ff';c.lineWidth=2;c.beginPath();for(let i=0;i<=60;i++){const v=i/60*520,f=m*v/kT*Math.exp(-m*v*v/(2*kT))*dv*tot;const yy=g1b-f/mx*(g1b-g1t-10);i?c.lineTo(gx+v/520*gw,yy):c.moveTo(gx+v/520*gw,yy);}c.stroke();});
      txt(c,'v →',gx+gw,g1b+12,C.muted,{align:'right',font:SMALL});
      if(cfg.cat==='trm'){txt(c,'p–V diagramma',gx,g2t-8,C.muted,{font:SMALL});const Vm=1.25,pm=Math.max(260,...S.pv.map(q=>q[1]))*1.05,XV=v=>gx+v/Vm*gw,Yp=p=>g2b-p/pm*(g2b-g2t);line(c,gx,g2b,gx+gw,g2b,C.ink,1);line(c,gx,g2b,gx,g2t,C.ink,1);
        txt(c,'V, L',gx+gw,g2b+12,C.muted,{align:'right',font:SMALL});txt(c,'p',gx+4,g2t+6,C.muted,{font:SMALL});
        if(S.ps.length){const C0=S.ps.length*kT*GZ.es;c.strokeStyle=rgba('muted',0.5);c.setLineDash([4,3]);c.lineWidth=1;c.beginPath();for(let i=0;i<=40;i++){const v=0.15+i/40*(Vm-0.15),p=C0/v;i?c.lineTo(XV(v),Yp(Math.min(p,pm))):c.moveTo(XV(v),Yp(Math.min(p,pm)));}c.stroke();c.setLineDash([]);txt(c,'izoterma',XV(1.05),Yp(C0/1.05)-10,C.muted,{font:SMALL,align:'center'});}
        c.strokeStyle=C.accent;c.lineWidth=2;c.beginPath();S.pv.forEach((q,i)=>i?c.lineTo(XV(q[0]),Yp(q[1])):c.moveTo(XV(q[0]),Yp(q[1])));c.stroke();const l=S.pv[S.pv.length-1];if(l)disk(c,XV(l[0]),Yp(l[1]),5,C.red);}
      else{txt(c,'Idish yarmlarida ulush',gx,g2t-8,C.muted,{font:SMALL});const half=S.px/2;[0,1].forEach(k=>{const L=S.ps.filter(p=>p.sp===k&&p.x<half).length,n=cnt[k];if(!n)return;const y=g2t+20+k*58;txt(c,GZ_SP[k].n,gx,y-12,GZ_SP[k].col,{font:SMALL});
          c.fillStyle=GZ_SP[k].col;c.fillRect(gx,y,gw*L/n,20);c.fillStyle=rgba('muted',0.3);c.fillRect(gx+gw*L/n,y,gw*(1-L/n),20);txt(c,'chap '+fmt(100*L/n,0)+'%',gx+4,y+30,C.ink,{font:SMALL});txt(c,'o‘ng '+fmt(100*(1-L/n),0)+'%',gx+gw,y+30,C.ink,{font:SMALL,align:'right'});});
        if(S.hv.length){const b=S.hv[0],n=b.tr.length/2;txt(c,'Broun zarrasi izi: '+n+' nuqta',gx,g2b-10,C.warm,{font:SMALL});}}},
    pointer(type,x,y,S,P){if(!S.geo)return false;const{ox,oy,sc}=S.geo,mx=(x-ox)/sc,my=(y-oy)/sc,BH=GZ.BH,md=S.mode,inB=mx>0&&mx<S.px&&my>0&&my<BH;
      const hitH=()=>S.hv.find(b=>Math.hypot(b.x-mx,b.y-my)<b.r+8),hitP=()=>Math.abs(mx-S.px-6)<14&&my>-10&&my<BH+10,hitPart=()=>S.part&&Math.abs(mx-GZ.BW0/2)<8&&my>0&&my<BH,hitW=()=>(mx>-14&&mx<6&&my>0&&my<BH)||((my>-14&&my<6||my>BH-6&&my<BH+14)&&mx>0&&mx<S.px);
      if(type==='down'){
        if(md==='move'){const b=hitH();if(b){S.drag=b;S.sel=b;return true;}if(hitP()){S.sel='piston';S.pt=S.px;S.poff=S.px-mx;return true;}if(hitPart()){S.sel='part';return true;}if(hitW()){S.sel='walls';return true;}S.sel=null;return false;}
        if((md==='addA'||md==='addB')&&inB){const kT=S.ps.length?S.kTs||GZ.kT0:GZ.kT0,sp=md==='addB'?1:0;if(S.ps.length>=380)return true;for(let i=0;i<10;i++){const a=Math.random()*TAU,r=Math.random()*18;S.ps.push(gzP(clamp(mx+r*Math.cos(a),6,S.px-6),clamp(my+r*Math.sin(a),6,BH-6),sp,kT));}S.U0+=0;return true;}
        if(md==='heavy'&&inB){const b={x:mx,y:my,vx:0,vy:0,m:60,r:20,tr:[]};S.hv.push(b);S.sel=b;return true;}
        if(md==='del'){const b=hitH();if(b){S.hv.splice(S.hv.indexOf(b),1);if(S.sel===b)S.sel=null;return true;}const k=S.ps.length;S.ps=S.ps.filter(p=>Math.hypot(p.x-mx,p.y-my)>26);return S.ps.length!==k;}
        return false;}
      if(type==='move'){if(S.drag){S.drag.x=clamp(mx,S.drag.r,S.px-S.drag.r);S.drag.y=clamp(my,S.drag.r,BH-S.drag.r);return true;}if(S.pt!=null){S.pt=clamp(mx+S.poff,40,GZ.BWmax);return true;}return false;}
      if(type==='up'){S.drag=null;S.pt=null;}return false;},
    inspect(S){const s=S.sel;
      if(s==='piston')return{title:'Porshen',note:'Sudrab gazni siqing yoki kengaytiring. Erkin porshen tashqi bosim va gaz bosimi tenglashguncha siljiydi.',props:[{label:'Porshen',choices:[[0,'Mahkam'],[1,'Erkin']],get:()=>S.pm,set:v=>{S.pm=v;S.vp=0;}},{label:'Tashqi bosim',sym:'p',min:20,max:300,step:5,unit:'kPa',d:0,get:()=>S.pex,set:v=>S.pex=v},{label:'Porshen massasi',sym:'M',min:20,max:400,step:10,unit:'m₀',d:0,get:()=>S.Mp,set:v=>S.Mp=v}]};
      if(s==='walls')return{title:'Idish devorlari',note:'Issiqlik o‘tkazmaydigan devor molekulani elastik qaytaradi. Termostat devor esa molekulaga o‘z haroratiga mos tezlik beradi.',props:[{label:'Devor',choices:[[0,'Issiqlik o‘tkazmaydi'],[1,'Termostat']],get:()=>S.wm,set:v=>S.wm=v},{label:'Termostat harorati',sym:'T',min:60,max:900,step:10,unit:'K',d:0,get:()=>S.Tw,set:v=>S.Tw=v}]};
      if(s==='part'&&S.part)return{title:'To‘siq',note:'Teshik ochilsa, gazlar aralashadi. Issiqlik o‘tkazuvchi to‘siq ikki tomon haroratini tenglashtiradi.',props:[{label:'Teshik kengligi',sym:'',min:0,max:200,step:5,unit:'px',d:0,get:()=>S.part.gap,set:v=>S.part.gap=v},{label:'Issiqlik o‘tkazadi',toggle:1,get:()=>!!S.part.cond,set:v=>{S.part.cond=v?1:0;S.Tp=S.kTs||GZ.kT0;}}],del:()=>{S.part=null;}};
      if(s&&S.hv.includes(s))return{title:'Broun zarrasi',note:'Katta zarra ko‘rinmas molekulalar zarbalaridan tartibsiz harakatlanadi.',props:[{label:'Massasi',sym:'M',min:10,max:300,step:5,unit:'m₀',d:0,get:()=>s.m,set:v=>s.m=v},{label:'Radiusi',sym:'R',min:8,max:40,step:1,unit:'px',d:0,get:()=>s.r,set:v=>s.r=v},{label:'Izni tozalash',toggle:1,get:()=>false,set:()=>{s.tr=[];}}],del:()=>S.hv.splice(S.hv.indexOf(s),1)};
      return null;},
    inspectHint:'Porshen, devor, to‘siq yoki katta zarrani bosing.',
    read(S,P){const N=S.ps.length,kT=S.kTs||0,T=kT/GZ.kT0*300,V=S.px*GZ.BH/GZ.A0,p=(S.pS||0)*GZ.ps,U=gzU(S)*GZ.es,r=N?p*V/(N*kT*GZ.es):0;
      const base=[['Molekulalar soni N',String(N)],['Harorat T',fmt(T,0)+' K'],['Bosim p',fmt(p,1)+' kPa'],['Hajm V',fmt(V,2)+' L'],['pV / (NkT)',N?fmt(r,2):'—']];
      const half=GZ.BW0/2,side=f=>{const q=S.ps.filter(f);return q.length?q.reduce((a,p)=>a+0.5*p.m*(p.vx*p.vx+p.vy*p.vy),0)/q.length/GZ.kT0*300:0;};if(S.part&&!S.part.gap)base.push(['Chap / o‘ng harorat',fmt(side(p=>p.x<half),0)+' / '+fmt(side(p=>p.x>half),0)+' K']);
      if(cfg.cat==='trm')return base.concat([['Ichki energiya U',fmt(U,1)+' J'],['Olingan issiqlik Q',fmt(S.Q*GZ.es,1)+' J'],['Gaz ishi A',fmt(S.W*GZ.es,1)+' J'],['Q − A = ΔU',fmt((S.Q-S.W)*GZ.es,1)+' / '+fmt(Math.abs(U-S.U0*GZ.es)<1e-6?0:U-S.U0*GZ.es,1)+' J']]);
      const vr=N?Math.sqrt(S.ps.reduce((a,p)=>a+p.vx*p.vx+p.vy*p.vy,0)/N)*3.4:0;return base.concat([['O‘rtacha kvadratik tezlik',fmt(vr,0)+' m/s']]);}
  };}
SIMS.push(mkGasLab({id:'lab_mol',cat:'mol',title:'Molekulalar laboratoriyasi',short:'gaz · diffuziya · Broun',
  sub:'Idishga yengil va og‘ir molekulalar soling, to‘siq qo‘ying va teshigini oching, katta Broun zarrasini kuzating. Har bir molekula boshqalari va devorlar bilan haqiqiy elastik to‘qnashadi.',
  formula:`<span><i>p</i> = <i>nkT</i></span><span class="alt">${fr('<i>m</i>₀<i>v</i>²','2')} = <i>kT</i> &nbsp;(tekislikda)</span>`,
  text:'Molekulalar to‘xtovsiz tartibsiz harakatda. Ular devorga urilib bosim hosil qiladi, bir-biri bilan to‘qnashib energiya almashadi va oxiri Maksvell tezliklar taqsimotiga keladi. Og‘ir molekulalar shu haroratda sekinroq harakatlanadi, chunki o‘rtacha kinetik energiya massaga bog‘liq emas. Bu model ikki o‘lchovli, shuning uchun bir molekulaga kT energiya to‘g‘ri keladi.',
  legend:[['p','bosim, Pa'],['n','molekulalar konsentratsiyasi'],['k','Bolsman doimiysi'],['T','harorat, K'],['m₀','molekula massasi']],
  tries:['«Isitish» tugmasini bosing: taqsimot o‘ngga siljiydi va bosim ortadi.','Diffuziya tajribasida to‘siq teshigini kattalashtiring: aralashish tezlashadi.','Aralash gazda A va B tezliklarini solishtiring: og‘ir B ikki marta sekin, lekin energiyasi bir xil.'],
  presets:[['bosim','Gaz bosimi'],['diffuziya','Diffuziya'],['broun','Broun harakati'],['aralash','Ikki gaz aralashmasi'],['bosh','Bo‘sh idish']]}));
SIMS.push(mkGasLab({id:'lab_trm',cat:'trm',title:'Termodinamika laboratoriyasi',short:'porshen · issiqlik · ish',
  sub:'Porshenli idishdagi gazni siqing, kengaytiring, isiting va sovuting. Devorlarni termostatga aylantiring yoki porshenni erkin qo‘ying. p–V diagramma va birinchi qonun balansi jonli hisoblanadi.',
  formula:`<span><i>Q</i> = ∆<i>U</i> + <i>A</i></span><span class="alt"><i>pV</i> = <i>NkT</i></span>`,
  text:'Porshen molekulaga urilganda harakatlanayotgan bo‘lsa, molekula tezligi o‘zgaradi: siqilishda gaz energiya oladi (qiziydi), kengayishda beradi (soviydi). Termostat devor gazga issiqlik beradi yoki oladi. Laboratoriya har bir zarbadagi energiyani hisoblaydi, shuning uchun Q = ∆U + A tengligini o‘zingiz tekshirishingiz mumkin.',
  legend:[['Q','gazga berilgan issiqlik, J'],['∆U','ichki energiya o‘zgarishi, J'],['A','gazning ishi, J'],['p, V, T','bosim, hajm, harorat']],
  tries:['Adiabata tajribasida porshenni tez itaring: harorat ko‘tariladi, p–V egri chizig‘i izotermadan tikroq.','Izoterma tajribasida porshenni sekin siljiting: harorat o‘zgarmaydi, pV ≈ const.','Issiqlik almashinuvida to‘siqning issiqlik o‘tkazishini o‘chirib ko‘ring.'],
  presets:[['izoterma','Izotermik jarayon'],['adiabata','Adiabatik jarayon'],['izobara','Izobarik kengayish'],['almashinuv','Issiqlik almashinuvi'],['bosh','Bo‘sh idish']]}));
