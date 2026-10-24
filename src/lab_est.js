/* ===== Elektrostatika laboratoriyasi (est) ===== */
/* Birliklar: masofa — m, zaryad — μC, massa — g. k = 9·10⁹ → kuch k·q₁q₂·10⁻¹²/r² N, tezlanish = F/(m·10⁻³). */
const ES_K=9e9*1e-12;
function esQ(x,y,q,o={}){return Object.assign({x,y,vx:0,vy:0,q,m:2,fixed:false,r:0.13},o);}
function esPl(x1,y1,x2,y2,Q){return{x1,y1,x2,y2,Q};}
const ES_PRE={
  dipol:()=>({qs:[esQ(3.6,3,2,{fixed:true}),esQ(6.4,3,-2,{fixed:true})],pls:[],probe:{x:5,y:1.6},lines:1,pot:0}),
  kond:()=>({qs:[],pls:[esPl(3.4,1.4,3.4,4.6,12),esPl(6.6,1.4,6.6,4.6,-12)],probe:{x:5,y:3},lines:1,pot:0,tps:[]}),
  erkin:()=>({qs:[esQ(3,2,2),esQ(7,4,-2),esQ(5,1.2,1.5),esQ(4.5,4.8,-1),esQ(7.5,1.6,1)],pls:[],probe:null,lines:1,pot:1}),
  uch:()=>({qs:[esQ(5,1.6,2,{fixed:true}),esQ(3.6,4,2,{fixed:true}),esQ(6.4,4,-3,{fixed:true})],pls:[],probe:{x:5,y:3.2},lines:0,pot:1}),
  bosh:()=>({qs:[],pls:[],probe:null,lines:1,pot:0})};
SIMS.push({id:'lab_est',cat:'est',lab:1,sandbox:1,title:'Elektrostatika laboratoriyasi',short:'zaryad · maydon · potensial',
  sub:'Musbat va manfiy zaryadlar, zaryadlangan plastinalar qo‘ying. Kuch chiziqlari va potensial xaritasi zudlik bilan qayta chiziladi. Erkin zaryadlar Kulon kuchi bilan harakatlanadi, sinov zarrasini maydonga otib yuborish mumkin.',
  formula:`<span><i>F</i> = <i>k</i>${fr('|<i>q</i>₁<i>q</i>₂|','<i>εr</i>²')}</span><span class="alt"><i>E</i> = ${fr('<i>F</i>','<i>q</i>')}, &nbsp;<i>φ</i> = <i>k</i>${fr('<i>q</i>','<i>εr</i>')}</span>`,
  text:[LABTXT,'Har bir nuqtadagi maydon barcha zaryadlar maydonlarining vektor yig‘indisi (superpozitsiya). Kuch chiziqlari musbat zaryaddan chiqib manfiyga kiradi, zich joyda maydon kuchli. Ekvipotensial chiziqlar kuch chiziqlariga perpendikulyar. Ikki qarama-qarshi plastina orasida maydon deyarli bir jinsli — bu kondensator.'],
  legend:[['q','zaryad, μC'],['E','maydon kuchlanganligi, kN/C'],['φ','potensial, kV'],['ε','muhitning dielektrik singdiruvchanligi'],['k','9·10⁹ N·m²/C²']],
  tries:['Kondensator tajribasida zondni plastinalar orasida suring: E deyarli o‘zgarmaydi.','Erkin zaryadlarda ishqalanishni 0 qiling: kinetik va potensial energiya yig‘indisi saqlanadi.','Sinov zarrasini dipol yonidan otib yuboring: traektoriya kuch chizig‘i bo‘ylab egriladi.'],
  hint:'Zaryadlarni sudrang yoki yangisini qo‘shing',
  tools:[{id:'move',label:'Surish'},{id:'pos',label:'+ Musbat'},{id:'neg',label:'− Manfiy'},{id:'plate',label:'+ Plastina'},{id:'launch',label:'Sinov zarrasi'},{id:'probe',label:'Zond'},{id:'fix',label:'Mahkamlash'},{id:'del',label:'O‘chirish'},{id:'lines',label:'Kuch chiziqlari',act:1},{id:'pot',label:'Potensial',act:1},{id:'vec',label:'Vektorlar',act:1},{id:'clear',label:'Bo‘sh stol',act:1}],
  hints:{pos:'Bo‘sh joyni bosing',neg:'Bo‘sh joyni bosing',plate:'Plastinani chizish uchun sudrang',launch:'Zarra chiqadigan joydan otish yo‘nalishiga sudrang',probe:'O‘lchanadigan nuqtani bosing',fix:'Zaryadni bosing',del:'Zaryad, plastina yoki zondni bosing'},
  params:[{id:'pre',label:'Tajriba',choices:[[0,'Dipol'],[1,'Kondensator'],[2,'Erkin zaryadlar'],[3,'Uch zaryad'],[4,'Bo‘sh']],val:0,reset:1},{id:'eps',label:'Dielektrik singdiruvchanlik',sym:'ε',min:1,max:10,step:0.5,val:1,d:1},{id:'fr',label:'Ishqalanish',sym:'',min:0,max:2,step:0.05,val:0.3,unit:'1/s',d:2}],
  init:P=>Object.assign({sel:null,drag:null,tps:[],vec:0,key:'',t:0},ES_PRE[['dipol','kond','erkin','uch','bosh'][P.pre]]()),
  action(id,S){if(id==='clear'){S.qs=[];S.pls=[];S.tps=[];S.probe=null;S.sel=null;}if(id==='lines')S.lines=!S.lines;if(id==='pot')S.pot=!S.pot;if(id==='vec')S.vec=!S.vec;S.key='';},
  src(S){/* barcha nuqtaviy manbalar: zaryadlar + plastina bo‘laklari */const a=S.qs.map(q=>[q.x,q.y,q.q]);S.pls.forEach(p=>{const n=18;for(let i=0;i<n;i++){const f=(i+0.5)/n;a.push([p.x1+(p.x2-p.x1)*f,p.y1+(p.y2-p.y1)*f,p.Q/n]);}});return a;},
  E(src,x,y,eps,skip){let ex=0,ey=0,ph=0;for(const s of src){if(s===skip)continue;const dx=x-s[0],dy=y-s[1],r2=dx*dx+dy*dy+0.004,r=Math.sqrt(r2),k=ES_K*1e6*s[2]/eps;ex+=k*dx/(r2*r);ey+=k*dy/(r2*r);ph+=k/r;}return[ex,ey,ph];},/* E — N/C, φ — V (q μC) */
  step(S,P,dt){const sim=SIMS.find(s=>s.id==='lab_est'),n=8,h=Math.min(dt,0.04)/n;S.t+=dt;
    for(let it=0;it<n;it++){const src=sim.src(S);
      S.qs.forEach((q,i)=>{if(q.fixed||q===S.drag)return;const[ex,ey]=sim.E(src,q.x,q.y,P.eps,src[i]);const a=q.q*1e-6/(q.m*1e-3);q.vx+=(ex*a-P.fr*q.vx)*h;q.vy+=(ey*a-P.fr*q.vy)*h;});
      S.qs.forEach(q=>{if(q.fixed||q===S.drag){q.vx=q.vy=0;return;}const v=Math.hypot(q.vx,q.vy);if(v>12){q.vx*=12/v;q.vy*=12/v;}q.x+=q.vx*h;q.y+=q.vy*h;
        if(q.x<q.r){q.x=q.r;q.vx=Math.abs(q.vx)*0.6;}if(q.x>S.Wm-q.r){q.x=S.Wm-q.r;q.vx=-Math.abs(q.vx)*0.6;}if(q.y<q.r){q.y=q.r;q.vy=Math.abs(q.vy)*0.6;}if(q.y>S.Hm-q.r){q.y=S.Hm-q.r;q.vy=-Math.abs(q.vy)*0.6;}
        S.pls.forEach(p=>{const d=segDist(q.x,q.y,p.x1,p.y1,p.x2,p.y2);if(d<q.r+0.04){const L=Math.hypot(p.x2-p.x1,p.y2-p.y1)||1,tx=(p.x2-p.x1)/L,ty=(p.y2-p.y1)/L,f=clamp(((q.x-p.x1)*tx+(q.y-p.y1)*ty)/L,0,1),cx=p.x1+f*L*tx,cy=p.y1+f*L*ty;let nx=q.x-cx,ny=q.y-cy;const dn=Math.hypot(nx,ny)||1;nx/=dn;ny/=dn;q.x=cx+nx*(q.r+0.04);q.y=cy+ny*(q.r+0.04);const vn=q.vx*nx+q.vy*ny;if(vn<0){q.vx-=1.6*vn*nx;q.vy-=1.6*vn*ny;}}});});
      for(let i=0;i<S.qs.length;i++)for(let j=i+1;j<S.qs.length;j++){const a=S.qs[i],b=S.qs[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),R=a.r+b.r;if(d<R&&d>1e-6){const nx=dx/d,ny=dy/d,ia=a.fixed||a===S.drag?0:1/a.m,ib=b.fixed||b===S.drag?0:1/b.m;if(ia+ib===0)continue;const ov=(R-d)/(ia+ib);a.x-=ov*ia*nx;a.y-=ov*ia*ny;b.x+=ov*ib*nx;b.y+=ov*ib*ny;const vr=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(vr<0){const J=1.6*vr/(ia+ib);a.vx+=J*ia*nx;a.vy+=J*ia*ny;b.vx-=J*ib*nx;b.vy-=J*ib*ny;}}}
      S.tps.forEach(t=>{const[ex,ey]=sim.E(src,t.x,t.y,P.eps);const a=t.q*1e-6/(t.m*1e-3);t.vx+=ex*a*h;t.vy+=ey*a*h;t.x+=t.vx*h;t.y+=t.vy*h;if(src.some(s=>Math.hypot(s[0]-t.x,s[1]-t.y)<0.1))t.dead=1;});}
    S.tps.forEach(t=>{t.tr.push(t.x,t.y);if(t.tr.length>900)t.tr.splice(0,2);});S.tps=S.tps.filter(t=>!t.dead&&t.x>-1&&t.x<S.Wm+1&&t.y>-1&&t.y<S.Hm+1||t.stay);},
  draw(c,W,H,S,P){const sim=SIMS.find(s=>s.id==='lab_est'),sc=Math.min(W/10,H/6),X=x=>x*sc,Y=y=>y*sc;S.Wm=W/sc;S.Hm=H/sc;S.sc=sc;const src=sim.src(S);
    grid(c,W,H,sc/2);
    const key=src.map(s=>s.map(v=>v.toFixed(3)).join(',')).join(';')+P.eps+S.lines+S.pot+W+H;
    if(key!==S.key){S.key=key;
      /* potensial xaritasi + ekvipotensiallar */
      if(S.pot&&src.length){const cs=4,nx=Math.ceil(W/cs),ny=Math.ceil(H/cs);if(!S.cv)S.cv=document.createElement('canvas');S.cv.width=nx;S.cv.height=ny;const g=S.cv.getContext('2d'),im=g.createImageData(nx,ny),d=im.data,st=3000/P.eps;
        const pg=new Float32Array(nx*ny);for(let j=0;j<ny;j++)for(let i=0;i<nx;i++)pg[j*nx+i]=sim.E(src,(i+0.5)*cs/sc,(j+0.5)*cs/sc,P.eps)[2];
        for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const q=j*nx+i,ph=pg[q],v=Math.tanh(ph/15000),o=q*4,L=Math.floor(ph/st),eq=Math.abs(v)<0.96&&((i<nx-1&&Math.floor(pg[q+1]/st)!==L)||(j<ny-1&&Math.floor(pg[q+nx]/st)!==L));
          if(eq){d[o]=225;d[o+1]=232;d[o+2]=255;d[o+3]=140;}else{d[o]=v>0?255:78;d[o+1]=v>0?90:168;d[o+2]=v>0?78:255;d[o+3]=Math.abs(v)*130;}}
        g.putImageData(im,0,0);}
      /* kuch chiziqlari */
      S.fl=[];if(S.lines&&src.length){const tot=src.reduce((a,s)=>a+Math.max(0,s[2]),0),seeds=[],neg=tot===0;
        S.qs.forEach(q=>{if(neg?q.q<0:q.q>0){const nl=Math.min(24,Math.round(Math.abs(q.q)*6));for(let k=0;k<nl;k++){const a=k/nl*TAU+0.1;seeds.push([q.x+Math.cos(a)*0.16,q.y+Math.sin(a)*0.16]);}}});
        S.pls.forEach(p=>{if(neg?p.Q<0:p.Q>0){const L=Math.hypot(p.x2-p.x1,p.y2-p.y1),nx=-(p.y2-p.y1)/L,ny=(p.x2-p.x1)/L,nl=Math.min(16,Math.round(Math.abs(p.Q)));for(let k=0;k<nl;k++){const f=(k+0.5)/nl;[1,-1].forEach(sg=>seeds.push([p.x1+(p.x2-p.x1)*f+sg*nx*0.07,p.y1+(p.y2-p.y1)*f+sg*ny*0.07]));}}});
        const ds=0.05*(neg?-1:1);seeds.forEach(([x,y])=>{const pts=[x,y];for(let k=0;k<500;k++){const[ex,ey]=sim.E(src,x,y,P.eps),e=Math.hypot(ex,ey)||1;const mx=x+ex/e*ds/2,my=y+ey/e*ds/2,[ex2,ey2]=sim.E(src,mx,my,P.eps),e2=Math.hypot(ex2,ey2)||1;x+=ex2/e2*ds;y+=ey2/e2*ds;pts.push(x,y);
          if(x<-0.5||y<-0.5||x>S.Wm+0.5||y>S.Hm+0.5)break;if(src.some(s=>(neg?s[2]>0:s[2]<0)&&Math.hypot(s[0]-x,s[1]-y)<0.09))break;}S.fl.push(pts);});}}
    if(S.pot&&S.cv&&src.length){c.imageSmoothingEnabled=true;c.drawImage(S.cv,0,0,S.cv.width*4,S.cv.height*4);}
    c.strokeStyle=rgba('accent',0.55);c.lineWidth=1.3;(S.fl||[]).forEach(p=>{c.beginPath();for(let i=0;i<p.length;i+=2)i?c.lineTo(X(p[i]),Y(p[i+1])):c.moveTo(X(p[i]),Y(p[i+1]));c.stroke();const m=Math.floor(p.length/4)*2;if(p.length>8){const ang=Math.atan2(p[m+3]-p[m+1],p[m+2]-p[m]);c.save();c.translate(X(p[m]),Y(p[m+1]));c.rotate(ang);c.fillStyle=rgba('accent',0.8);c.beginPath();c.moveTo(5,0);c.lineTo(-4,-4);c.lineTo(-4,4);c.fill();c.restore();}});
    if(S.vec&&src.length){for(let y=0.5;y<S.Hm;y+=0.6)for(let x=0.5;x<S.Wm;x+=0.6){const[ex,ey]=sim.E(src,x,y,P.eps),e=Math.hypot(ex,ey);if(e<1)continue;const L=Math.min(0.26,0.06+Math.log10(1+e/2000)*0.12);arrow(c,X(x),Y(y),X(x+ex/e*L),Y(y+ey/e*L),rgba('warm',0.75),1.4);}}
    S.pls.forEach(p=>{const col=p.Q>0?'#ff5a4e':p.Q<0?'#4ea8ff':'#9aa6b8';line(c,X(p.x1),Y(p.y1),X(p.x2),Y(p.y2),p===S.sel?C.accent:col,8);const L=Math.hypot(p.x2-p.x1,p.y2-p.y1);for(let i=0;i<6;i++){const f=(i+0.5)/6;txt(c,p.Q>0?'+':p.Q<0?'−':'',X(p.x1+(p.x2-p.x1)*f),Y(p.y1+(p.y2-p.y1)*f),'#fff',{align:'center',font:SMALL});}});
    if(S.dw)line(c,X(S.dw[0]),Y(S.dw[1]),X(S.dw[2]),Y(S.dw[3]),C.accent,4,[6,4]);
    S.tps.forEach(t=>{c.strokeStyle=rgba('green',0.8);c.lineWidth=1.8;c.beginPath();for(let i=0;i<t.tr.length;i+=2)i?c.lineTo(X(t.tr[i]),Y(t.tr[i+1])):c.moveTo(X(t.tr[i]),Y(t.tr[i+1]));c.stroke();disk(c,X(t.x),Y(t.y),4,C.green);});
    if(S.launch){const l=S.launch;arrow(c,X(l.x),Y(l.y),X(l.x2),Y(l.y2),C.green,2.5,'v');}
    S.qs.forEach(q=>{const r=Math.max(9,q.r*sc*Math.min(1.3,0.7+Math.abs(q.q)*0.15)),col=q.q>0?'#ff5a4e':'#4ea8ff';disk(c,X(q.x),Y(q.y),r,col,q.fixed?'#fff':null);txt(c,q.q>0?'+':'−',X(q.x),Y(q.y)+1,'#fff',{align:'center',font:'700 15px system-ui'});if(q.fixed){c.strokeStyle='#fff';c.lineWidth=1;c.setLineDash([2,2]);c.beginPath();c.arc(X(q.x),Y(q.y),r+4,0,TAU);c.stroke();c.setLineDash([]);}if(q===S.sel)selRing(c,X(q.x),Y(q.y),r+8);txt(c,fmt(q.q,1)+' μC',X(q.x),Y(q.y)+r+11,C.ink,{align:'center',font:SMALL});});
    if(S.probe){const pr=S.probe,[ex,ey,ph]=sim.E(src,pr.x,pr.y,P.eps),e=Math.hypot(ex,ey);S.pE=[e,ph];const x=X(pr.x),y=Y(pr.y);c.strokeStyle=pr===S.sel?C.accent:C.ink;c.lineWidth=2;c.beginPath();c.arc(x,y,7,0,TAU);c.moveTo(x-11,y);c.lineTo(x+11,y);c.moveTo(x,y-11);c.lineTo(x,y+11);c.stroke();
      if(e>1){const L=Math.min(70,18+Math.log10(1+e/500)*22);arrow(c,x,y,x+ex/e*L,y+ey/e*L,C.warm,2.5,'E');}rrect(c,x+14,y+10,128,38,6);c.fillStyle=rgba('panel',0.9);c.fill();txt(c,'E = '+fmt(e/1000,2)+' kN/C',x+20,y+21,C.ink,{font:SMALL});txt(c,'φ = '+fmt(Math.abs(ph)<1e-3?0:ph/1000,2)+' kV',x+20,y+37,C.ink,{font:SMALL});}else S.pE=null;},
  pointer(type,x,y,S,P){if(!S.sc)return false;const sc=S.sc,mx=x/sc,my=y/sc,md=S.mode,hq=()=>S.qs.find(q=>Math.hypot(q.x-mx,q.y-my)<Math.max(q.r,0.16)),hp=()=>S.pls.find(p=>segDist(mx,my,p.x1,p.y1,p.x2,p.y2)<0.12),hpr=()=>S.probe&&Math.hypot(S.probe.x-mx,S.probe.y-my)<0.18?S.probe:null;
    if(type==='down'){
      if(md==='move'){const q=hq();if(q){S.drag=q;S.sel=q;S.dox=mx-q.x;S.doy=my-q.y;return true;}const pr=hpr();if(pr){S.drag=pr;S.sel=pr;S.dox=mx-pr.x;S.doy=my-pr.y;return true;}const p=hp();if(p){S.drag=p;S.sel=p;S.dox=mx;S.doy=my;return true;}S.sel=null;return false;}
      if(md==='pos'||md==='neg'){if(S.qs.length>=30)return true;const q=esQ(mx,my,md==='pos'?1:-1);S.qs.push(q);S.sel=q;return true;}
      if(md==='plate'){S.dw=[mx,my,mx,my];return true;}
      if(md==='probe'){S.probe={x:mx,y:my};S.sel=S.probe;return true;}
      if(md==='launch'){S.launch={x:mx,y:my,x2:mx,y2:my};return true;}
      if(md==='fix'){const q=hq();if(q){q.fixed=!q.fixed;q.vx=q.vy=0;S.sel=q;return true;}return false;}
      if(md==='del'){const q=hq();if(q){S.qs.splice(S.qs.indexOf(q),1);S.sel=null;return true;}const p=hp();if(p){S.pls.splice(S.pls.indexOf(p),1);S.sel=null;return true;}if(hpr()){S.probe=null;S.sel=null;return true;}const k=S.tps.length;S.tps=S.tps.filter(t=>Math.hypot(t.x-mx,t.y-my)>0.2);return k!==S.tps.length;}return false;}
    if(type==='move'){const d=S.drag;if(d){if(d.x1!==undefined){const dx=mx-S.dox,dy=my-S.doy;d.x1+=dx;d.x2+=dx;d.y1+=dy;d.y2+=dy;S.dox=mx;S.doy=my;}else{d.x=clamp(mx-S.dox,0.1,S.Wm-0.1);d.y=clamp(my-S.doy,0.1,S.Hm-0.1);}return true;}
      if(S.dw){S.dw[2]=mx;S.dw[3]=my;return true;}if(S.launch){S.launch.x2=mx;S.launch.y2=my;return true;}return false;}
    if(type==='up'){S.drag=null;if(S.dw){const r=S.dw;S.dw=null;if(Math.hypot(r[2]-r[0],r[3]-r[1])>0.3){const p=esPl(r[0],r[1],r[2],r[3],6);S.pls.push(p);S.sel=p;}}
      if(S.launch){const l=S.launch;S.launch=null;if(S.tps.length>=12)S.tps.shift();S.tps.push({x:l.x,y:l.y,vx:(l.x2-l.x)*2.2,vy:(l.y2-l.y)*2.2,q:0.05,m:0.2,tr:[]});}}return false;},
  inspect(S){const s=S.sel;if(!s)return null;
    if(S.qs.includes(s))return{title:s.q>0?'Musbat zaryad':'Manfiy zaryad',props:[{label:'Zaryad',sym:'q',min:-5,max:5,step:0.1,unit:'μC',d:1,get:()=>s.q,set:v=>{s.q=Math.abs(v)<0.05?0.1:v;S.key='';}},{label:'Massa',sym:'m',min:0.5,max:20,step:0.5,unit:'g',d:1,get:()=>s.m,set:v=>s.m=v},{label:'Mahkamlangan',toggle:1,get:()=>s.fixed,set:v=>{s.fixed=v;s.vx=s.vy=0;}}],del:()=>S.qs.splice(S.qs.indexOf(s),1)};
    if(S.pls.includes(s))return{title:'Zaryadlangan plastina',note:'Zaryad plastina bo‘ylab tekis taqsimlangan.',props:[{label:'Plastina zaryadi',sym:'Q',min:-20,max:20,step:0.5,unit:'μC',d:1,get:()=>s.Q,set:v=>{s.Q=v;S.key='';}}],del:()=>S.pls.splice(S.pls.indexOf(s),1)};
    if(s===S.probe)return{title:'Zond',note:'Shu nuqtadagi maydon kuchlanganligi va potensialni o‘lchaydi.',props:[],del:()=>{S.probe=null;}};return null;},
  inspectHint:'Zaryad, plastina yoki zondni bosing.',
  read(S,P){const qs=S.qs;let W=0,K=0;for(let i=0;i<qs.length;i++){K+=0.5*qs[i].m*1e-3*(qs[i].vx**2+qs[i].vy**2);for(let j=i+1;j<qs.length;j++){const r=Math.hypot(qs[i].x-qs[j].x,qs[i].y-qs[j].y);W+=ES_K*qs[i].q*qs[j].q/(P.eps*Math.sqrt(r*r+0.004));}}
    const z=v=>Math.abs(v)<1e-6?0:v;const tot=qs.reduce((a,q)=>a+q.q,0)+S.pls.reduce((a,p)=>a+p.Q,0);const r=[['Zaryadlar soni',String(qs.length+S.pls.length)],['Umumiy zaryad',fmt(Math.abs(tot)<1e-9?0:tot,1)+' μC']];
    if(S.pE)r.push(['Zondda E',fmt(S.pE[0]/1000,2)+' kN/C'],['Zondda φ',fmt(z(S.pE[1]/1000),2)+' kV']);r.push(['Zaryadlar o‘zaro energiyasi',fmt(W*1000,1)+' mJ'],['Kinetik energiya',fmt(K*1000<1e-6?0:K*1000,2)+' mJ']);return r;}
});
