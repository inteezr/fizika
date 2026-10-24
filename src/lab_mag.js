/* ===== Magnetizm laboratoriyasi (mag) ===== */
/* Birliklar: masofa — m, B — mT. Magnit qutbi: B = 0,25·p/r² mT; to‘g‘ri tok: B = μ₀I/(2πr) = 2·10⁻⁴·I/r mT; Yer maydoni 0,05 mT (yuqoriga — shimol). */
function mgM(x,y,ang,o={}){return Object.assign({x,y,ang,L:1.3,p:1,fixed:true,vx:0,vy:0,w:0},o);}
function mgC(x,y){return{x,y,ang:-Math.PI/2+Math.random()-0.5,w:0};}
const MG_PRE={
  magnit:()=>{const cs=[];for(let k=0;k<10;k++){const a=k/10*TAU;cs.push(mgC(5+Math.cos(a)*2.1,3+Math.sin(a)*1.6));}return{ms:[mgM(5,3,0)],cs,fil:1,lines:0};},
  ikki:()=>({ms:[mgM(3.3,3,0),mgM(6.9,3.25,0.25,{fixed:false})],cs:[],fil:0,lines:1}),
  tok:()=>{const cs=[];[[3.5,3],[6.5,3]].forEach(([x,y])=>{for(let k=0;k<6;k++){const a=k/6*TAU;cs.push(mgC(x+Math.cos(a)*0.75,y+Math.sin(a)*0.75));}});return{ws:[{x:3.5,y:3,I:300},{x:6.5,y:3,I:-300}],cs,fil:1,lines:1};},
  lorens:()=>({rg:[{x1:3.2,y1:0.5,x2:9.6,y2:5.5,B:1}],pt:[{x:1,y:2.2,vx:2.4,vy:0,q:1,tr:[]},{x:1,y:3.8,vx:2.4,vy:0,q:-1,tr:[]},{x:1,y:3,vx:1.4,vy:0,q:1,tr:[]}],fil:0,lines:0}),
  bosh:()=>({fil:1,lines:0})};
SIMS.push({id:'lab_mag',cat:'mag',lab:1,sandbox:1,title:'Magnetizm laboratoriyasi',short:'magnit · tok · kompas',
  sub:'Doimiy magnitlar, tokli o‘tkazgichlar va kompaslar qo‘ying. Temir qipiqlari va kuch chiziqlari maydon shaklini ko‘rsatadi. Bir jinsli maydon sohasiga zaryadli zarralarni otib, Lorens kuchini kuzating.',
  formula:`<span><i>B</i> = ${fr('<i>μ</i>₀<i>I</i>','2π<i>r</i>')}</span><span class="alt"><i>F</i><sub>L</sub> = <i>qvB</i>, &nbsp;<i>r</i> = ${fr('<i>mv</i>','|<i>q</i>|<i>B</i>')}</span>`,
  text:[LABTXT,'Magnit maydon chiziqlari magnitning shimoliy (N) qutbidan chiqib janubiy (S) qutbiga kiradi va hech qachon uzilmaydi. Kompas strelkasi maydon chizig‘i bo‘ylab buriladi. To‘g‘ri tok atrofidagi chiziqlar aylanalar bo‘lib, yo‘nalishi parma qoidasi bilan topiladi. Tekislikka tik maydonda zaryadli zarra aylana bo‘ylab harakatlanadi: musbat va manfiy zarralar qarama-qarshi tomonga buriladi.'],
  legend:[['B','magnit induksiya, mT'],['I','tok kuchi, A'],['μ₀','4π·10⁻⁷ H/m'],['q, m, v','zarra zaryadi, massasi, tezligi'],['r','aylana radiusi']],
  tries:['Ikki magnit tajribasida o‘ng magnitni burib, bir xil qutblarni yaqinlashtiring: endi ular itarishadi.','Tokli o‘tkazgichda tokni teskari qiling: barcha kompaslar 180° buriladi.','Lorens tajribasida maydon sohasini bosib B ni ikki marta oshiring: aylana radiusi ikki marta kichrayadi.'],
  hint:'Magnit, o‘tkazgich yoki kompasni sudrang',
  tools:[{id:'move',label:'Surish'},{id:'mag',label:'+ Magnit'},{id:'wire',label:'+ Tokli o‘tkazgich'},{id:'comp',label:'+ Kompas'},{id:'region',label:'+ B sohasi'},{id:'launch',label:'Zarra otish'},{id:'rot',label:'Burish'},{id:'del',label:'O‘chirish'},{id:'fil',label:'Temir qipiqlari',act:1},{id:'lines',label:'Kuch chiziqlari',act:1},{id:'earth',label:'Yer maydoni',act:1},{id:'cgrid',label:'Kompaslar to‘ri',act:1},{id:'clear',label:'Bo‘sh stol',act:1}],
  hints:{mag:'Bo‘sh joyni bosing',wire:'Bo‘sh joyni bosing: tok bizga qarab ⊙',comp:'Bo‘sh joyni bosing',region:'Sohani to‘rtburchak qilib sudrang',launch:'Zarra chiqadigan joydan tezlik yo‘nalishiga sudrang',rot:'Magnitni bosib aylantiring',del:'Obyektni bosing'},
  params:[{id:'pre',label:'Tajriba',choices:[[0,'Doimiy magnit'],[1,'Ikki magnit'],[2,'Tokli o‘tkazgichlar'],[3,'Lorens kuchi'],[4,'Bo‘sh']],val:0,reset:1},{id:'qs',label:'Otiladigan zarra',choices:[[1,'Musbat +'],[-1,'Manfiy −']],val:1},{id:'qm',label:'Zarraning q/m nisbati',sym:'q/m',min:0.5,max:4,step:0.1,val:2,d:1}],
  init:P=>Object.assign({ms:[],ws:[],cs:[],rg:[],pt:[],sel:null,drag:null,earth:0,t:0},MG_PRE[['magnit','ikki','tok','lorens','bosh'][P.pre]]()),
  action(id,S){if(id==='clear'){S.ms=[];S.ws=[];S.cs=[];S.rg=[];S.pt=[];S.sel=null;}if(id==='fil')S.fil=!S.fil;if(id==='lines')S.lines=!S.lines;if(id==='earth')S.earth=!S.earth;
    if(id==='cgrid'&&S.Wm){if(S.cs.length>40)S.cs=[];else for(let j=1;j<5;j++)for(let i=1;i<9;i++)S.cs.push(mgC(i*S.Wm/9,j*S.Hm/5));}},
  poles(m){const c=Math.cos(m.ang),s=Math.sin(m.ang),h=m.L*0.42;return[[m.x+c*h,m.y+s*h,m.p],[m.x-c*h,m.y-s*h,-m.p]];},
  B(S,x,y,skip){let bx=0,by=0;const sim=this;S.ms.forEach(m=>{if(m===skip)return;sim.poles(m).forEach(([px,py,p])=>{const dx=x-px,dy=y-py,r2=dx*dx+dy*dy+0.006,r=Math.sqrt(r2),k=0.25*p/(r2*r);bx+=k*dx;by+=k*dy;});});
    S.ws.forEach(w=>{const dx=x-w.x,dy=y-w.y,r2=dx*dx+dy*dy+0.004,k=2e-4*w.I/r2;bx+=k*dy;by+=-k*dx;});/* ⊙ (I>0): ekranda soat miliga teskari (y pastga) */
    if(S.earth)by-=0.05;return[bx,by];},
  step(S,P,dt){const sim=SIMS.find(s=>s.id==='lab_mag');dt=Math.min(dt,0.04);S.t+=dt;
    S.cs.forEach(c=>{if(c===S.drag)return;const[bx,by]=sim.B(S,c.x,c.y),b=Math.hypot(bx,by);if(b<1e-7){c.w*=0.95;c.ang+=c.w*dt;return;}const tq=Math.sin(Math.atan2(by,bx)-c.ang)*Math.min(1,b/0.01+0.15);c.w+=(60*tq-7*c.w)*dt;c.ang+=c.w*dt;});
    const n=6,h=dt/n;for(let it=0;it<n;it++){S.ms.forEach(m=>{if(m.fixed||m===S.drag)return;let fx=0,fy=0,tq=0;sim.poles(m).forEach(([px,py,p])=>{const[bx,by]=sim.B(S,px,py,m),Fx=2*p*bx,Fy=2*p*by;fx+=Fx;fy+=Fy;tq+=(px-m.x)*Fy-(py-m.y)*Fx;});
        const I=m.L*m.L/12;m.vx+=(fx-1.5*m.vx)*h;m.vy+=(fy-1.5*m.vy)*h;m.w+=(tq/I-3*m.w)*h;});
      S.ms.forEach(m=>{if(m.fixed||m===S.drag){m.vx=m.vy=m.w=0;return;}m.x+=m.vx*h;m.y+=m.vy*h;m.ang+=m.w*h;m.x=clamp(m.x,0.5,(S.Wm||10)-0.5);m.y=clamp(m.y,0.3,(S.Hm||6)-0.3);});
      /* magnitlar bir-biriga kirib ketmasin: har biri 3 ta doira */
      for(let i=0;i<S.ms.length;i++)for(let j=i+1;j<S.ms.length;j++){const a=S.ms[i],b=S.ms[j],pa=[-1,0,1].map(k=>[a.x+Math.cos(a.ang)*k*a.L*0.33,a.y+Math.sin(a.ang)*k*a.L*0.33]),pb=[-1,0,1].map(k=>[b.x+Math.cos(b.ang)*k*b.L*0.33,b.y+Math.sin(b.ang)*k*b.L*0.33]);
        pa.forEach(([ax,ay])=>pb.forEach(([bx,by])=>{const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy),R=0.3;if(d<R&&d>1e-6){const nx=dx/d,ny=dy/d,ia=a.fixed||a===S.drag?0:1,ib=b.fixed||b===S.drag?0:1;if(!ia&&!ib)return;const ov=(R-d)/(ia+ib);a.x-=ov*ia*nx;a.y-=ov*ia*ny;b.x+=ov*ib*nx;b.y+=ov*ib*ny;
          const vr=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(vr<0){const J=vr/(ia+ib);a.vx+=J*ia*nx;a.vy+=J*ia*ny;b.vx-=J*ib*nx;b.vy-=J*ib*ny;}}}));}
      /* zaryadli zarralar: faqat tekislikka tik B (sohalar) ularni buradi; F = q v × B */
      S.pt.forEach(p=>{let bz=0;S.rg.forEach(r=>{if(p.x>Math.min(r.x1,r.x2)&&p.x<Math.max(r.x1,r.x2)&&p.y>Math.min(r.y1,r.y2)&&p.y<Math.max(r.y1,r.y2))bz+=r.B;});const k=p.q*P.qm*bz*h,c=Math.cos(k),s=Math.sin(k);/* aniq aylanish: |v| saqlanadi */const vx=p.vx*c-p.vy*s,vy=p.vx*s+p.vy*c;p.vx=vx;p.vy=vy;p.x+=p.vx*h;p.y+=p.vy*h;});}
    S.pt.forEach(p=>{p.tr.push(p.x,p.y);if(p.tr.length>1400)p.tr.splice(0,2);});S.pt=S.pt.filter(p=>p.x>-1&&p.y>-1&&p.x<(S.Wm||10)+1&&p.y<(S.Hm||6)+1);},
  draw(c,W,H,S,P){const sim=SIMS.find(s=>s.id==='lab_mag'),sc=Math.min(W/10,H/6),X=x=>x*sc,Y=y=>y*sc;S.Wm=W/sc;S.Hm=H/sc;S.sc=sc;grid(c,W,H,sc/2);
    S.rg.forEach(r=>{const x=X(Math.min(r.x1,r.x2)),y=Y(Math.min(r.y1,r.y2)),w=Math.abs(r.x2-r.x1)*sc,hh=Math.abs(r.y2-r.y1)*sc;c.fillStyle=rgba('violet',0.1);c.fillRect(x,y,w,hh);c.strokeStyle=r===S.sel?C.accent:rgba('violet',0.7);c.lineWidth=2;c.setLineDash([6,4]);c.strokeRect(x,y,w,hh);c.setLineDash([]);
      for(let yy=y+22;yy<y+hh;yy+=40)for(let xx=x+22;xx<x+w;xx+=40){if(r.B>0){c.strokeStyle=rgba('violet',0.55);c.lineWidth=1.3;c.beginPath();c.arc(xx,yy,5,0,TAU);c.stroke();disk(c,xx,yy,1.6,rgba('violet',0.8));}else{line(c,xx-4,yy-4,xx+4,yy+4,rgba('violet',0.6),1.4);line(c,xx-4,yy+4,xx+4,yy-4,rgba('violet',0.6),1.4);}}
      txt(c,'B = '+fmt(Math.abs(r.B),1)+' mT '+(r.B>0?'⊙':'⊗'),x+8,y+12,C.violet,{font:SMALL});});
    if(S.rd){const r=S.rd;c.strokeStyle=C.accent;c.setLineDash([6,4]);c.strokeRect(X(Math.min(r[0],r[2])),Y(Math.min(r[1],r[3])),Math.abs(r[2]-r[0])*sc,Math.abs(r[3]-r[1])*sc);c.setLineDash([]);}
    const any=S.ms.length||S.ws.length||S.earth;
    if(S.fil&&any){if(!S.fp||S.fpW!==W){S.fpW=W;S.fp=[];for(let y=7;y<H;y+=13)for(let x=7;x<W;x+=13)S.fp.push([x+(Math.random()-0.5)*8,y+(Math.random()-0.5)*8]);}
      c.lineWidth=1.6;c.strokeStyle=GL.dark?'#c9d2e3':'#3a4252';S.fp.forEach(([x,y])=>{const[bx,by]=sim.B(S,x/sc,y/sc),b=Math.hypot(bx,by);if(b<1e-6)return;const a=clamp(0.2+0.28*Math.log10(b/0.01),0.08,0.95);c.globalAlpha=a;const ux=bx/b*4.5,uy=by/b*4.5;c.beginPath();c.moveTo(x-ux,y-uy);c.lineTo(x+ux,y+uy);c.stroke();});c.globalAlpha=1;}
    if(S.lines&&any){c.strokeStyle=rgba('accent',0.6);c.lineWidth=1.4;const trace=(x,y,closed)=>{const pts=[x,y],x0=x,y0=y;for(let k=0;k<700;k++){const[bx,by]=sim.B(S,x,y),b=Math.hypot(bx,by)||1,mx=x+bx/b*0.02,my=y+by/b*0.02,[bx2,by2]=sim.B(S,mx,my),b2=Math.hypot(bx2,by2)||1;x+=bx2/b2*0.04;y+=by2/b2*0.04;pts.push(x,y);
          if(x<-0.5||y<-0.5||x>S.Wm+0.5||y>S.Hm+0.5)break;if(closed&&k>20&&Math.hypot(x-x0,y-y0)<0.04)break;if(S.ms.some(m=>{const q=sim.poles(m)[1];return Math.hypot(q[0]-x,q[1]-y)<0.07;}))break;}
        c.beginPath();for(let i=0;i<pts.length;i+=2)i?c.lineTo(X(pts[i]),Y(pts[i+1])):c.moveTo(X(pts[i]),Y(pts[i+1]));c.stroke();const m=Math.floor(pts.length/4)*2;if(pts.length>10){const an=Math.atan2(pts[m+3]-pts[m+1],pts[m+2]-pts[m]);c.save();c.translate(X(pts[m]),Y(pts[m+1]));c.rotate(an);c.fillStyle=rgba('accent',0.85);c.beginPath();c.moveTo(5,0);c.lineTo(-4,-4);c.lineTo(-4,4);c.fill();c.restore();}};
      S.ms.forEach(m=>{const[N]=sim.poles(m);for(let k=0;k<14;k++){const a=k/14*TAU+0.11;trace(N[0]+Math.cos(a)*0.08,N[1]+Math.sin(a)*0.08,0);}});
      S.ws.forEach(w=>[0.35,0.7,1.1,1.6].forEach(r=>trace(w.x+r,w.y,1)));}
    S.ws.forEach(w=>{const x=X(w.x),y=Y(w.y);disk(c,x,y,13,'#d08a4a',w===S.sel?C.accent:'#fff');if(w.I>0)disk(c,x,y,3.5,'#fff');else{line(c,x-6,y-6,x+6,y+6,'#fff',2.2);line(c,x-6,y+6,x+6,y-6,'#fff',2.2);}txt(c,fmt(Math.abs(w.I),0)+' A',x,y+24,C.ink,{align:'center',font:SMALL});});
    S.ms.forEach(m=>{c.save();c.translate(X(m.x),Y(m.y));c.rotate(m.ang);const L=m.L*sc,h=0.34*sc;c.shadowColor='rgba(0,0,0,0.4)';c.shadowBlur=10;c.fillStyle='#e0473c';c.fillRect(0,-h/2,L/2,h);c.fillStyle='#3d7be0';c.fillRect(-L/2,-h/2,L/2,h);c.shadowBlur=0;c.strokeStyle=m===S.sel?C.accent:'rgba(255,255,255,0.7)';c.lineWidth=m===S.sel?3:1.2;c.strokeRect(-L/2,-h/2,L,h);
      c.fillStyle='#fff';c.font='700 15px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('N',L/2-14,1);c.fillText('S',-L/2+14,1);if(!m.fixed){c.font=SMALL;c.fillText('erkin',0,1);}c.restore();});
    S.cs.forEach(k=>{const x=X(k.x),y=Y(k.y),r=13;c.fillStyle=rgba('panel',0.9);c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.strokeStyle=k===S.sel?C.accent:C.muted;c.lineWidth=1.3;c.stroke();const ux=Math.cos(k.ang)*r*0.85,uy=Math.sin(k.ang)*r*0.85,px=-uy*0.22,py=ux*0.22;
      c.fillStyle='#e0473c';c.beginPath();c.moveTo(x+ux,y+uy);c.lineTo(x+px,y+py);c.lineTo(x-px,y-py);c.fill();c.fillStyle='#c9d2e3';c.beginPath();c.moveTo(x-ux,y-uy);c.lineTo(x+px,y+py);c.lineTo(x-px,y-py);c.fill();});
    S.pt.forEach(p=>{const col=p.q>0?'#ff5a4e':'#4ea8ff';c.strokeStyle=col;c.globalAlpha=0.75;c.lineWidth=2;c.beginPath();for(let i=0;i<p.tr.length;i+=2)i?c.lineTo(X(p.tr[i]),Y(p.tr[i+1])):c.moveTo(X(p.tr[i]),Y(p.tr[i+1]));c.stroke();c.globalAlpha=1;disk(c,X(p.x),Y(p.y),6,col,'#fff');txt(c,p.q>0?'+':'−',X(p.x),Y(p.y)+1,'#fff',{align:'center',font:SMALL});});
    if(S.launch){const l=S.launch;arrow(c,X(l.x),Y(l.y),X(l.x2),Y(l.y2),P.qs>0?'#ff5a4e':'#4ea8ff',2.5,'v');}
    if(S.earth)txt(c,'Yer maydoni ↑ N',W-12,16,C.muted,{align:'right',font:SMALL});},
  pointer(type,x,y,S,P){if(!S.sc)return false;const sc=S.sc,mx=x/sc,my=y/sc,md=S.mode,sim=SIMS.find(s=>s.id==='lab_mag');
    const hm=()=>S.ms.find(m=>{const c=Math.cos(m.ang),s=Math.sin(m.ang),lx=(mx-m.x)*c+(my-m.y)*s,ly=-(mx-m.x)*s+(my-m.y)*c;return Math.abs(lx)<m.L/2+0.05&&Math.abs(ly)<0.22;}),hw=()=>S.ws.find(w=>Math.hypot(w.x-mx,w.y-my)<0.2),hc=()=>S.cs.find(k=>Math.hypot(k.x-mx,k.y-my)<0.16),hr=()=>S.rg.find(r=>mx>Math.min(r.x1,r.x2)&&mx<Math.max(r.x1,r.x2)&&my>Math.min(r.y1,r.y2)&&my<Math.max(r.y1,r.y2));
    if(type==='down'){
      if(md==='move'){const o=hm()||hw()||hc();if(o){S.drag=o;S.sel=o;S.dox=mx-o.x;S.doy=my-o.y;return true;}const r=hr();if(r){S.drag=r;S.sel=r;S.dox=mx;S.doy=my;return true;}S.sel=null;return false;}
      if(md==='rot'){const m=hm()||hc();if(m){S.rot=m;S.sel=m;S.ra=Math.atan2(my-m.y,mx-m.x)-m.ang;return true;}return false;}
      if(md==='mag'){const m=mgM(mx,my,0);S.ms.push(m);S.sel=m;return true;}
      if(md==='wire'){const w={x:mx,y:my,I:200};S.ws.push(w);S.sel=w;return true;}
      if(md==='comp'){S.cs.push(mgC(mx,my));return true;}
      if(md==='region'){S.rd=[mx,my,mx,my];return true;}
      if(md==='launch'){S.launch={x:mx,y:my,x2:mx,y2:my};return true;}
      if(md==='del'){for(const[a,f]of[[S.ms,hm],[S.ws,hw],[S.cs,hc]]){const o=f();if(o){a.splice(a.indexOf(o),1);S.sel=null;return true;}}const k=S.pt.length;S.pt=S.pt.filter(p=>Math.hypot(p.x-mx,p.y-my)>0.2);if(k!==S.pt.length)return true;const r=hr();if(r){S.rg.splice(S.rg.indexOf(r),1);return true;}return false;}return false;}
    if(type==='move'){if(S.rot){S.rot.ang=Math.atan2(my-S.rot.y,mx-S.rot.x)-S.ra;S.rot.w=0;return true;}const d=S.drag;if(d){if(d.x1!==undefined){const dx=mx-S.dox,dy=my-S.doy;d.x1+=dx;d.x2+=dx;d.y1+=dy;d.y2+=dy;S.dox=mx;S.doy=my;}else{d.x=mx-S.dox;d.y=my-S.doy;}return true;}
      if(S.rd){S.rd[2]=mx;S.rd[3]=my;return true;}if(S.launch){S.launch.x2=mx;S.launch.y2=my;return true;}return false;}
    if(type==='up'){S.drag=null;S.rot=null;if(S.rd){const r=S.rd;S.rd=null;if(Math.abs(r[2]-r[0])>0.3&&Math.abs(r[3]-r[1])>0.3){const g={x1:r[0],y1:r[1],x2:r[2],y2:r[3],B:2};S.rg.push(g);S.sel=g;}}
      if(S.launch){const l=S.launch;S.launch=null;if(S.pt.length>=10)S.pt.shift();S.pt.push({x:l.x,y:l.y,vx:(l.x2-l.x)*1.6,vy:(l.y2-l.y)*1.6,q:P.qs,tr:[]});}}return false;},
  inspect(S,P){const s=S.sel;if(!s)return null;
    if(S.ms.includes(s))return{title:'Doimiy magnit',note:'Qizil uchi — shimoliy qutb N.',props:[{label:'Kuchi',sym:'p',min:0.2,max:4,step:0.1,d:1,unit:'×',get:()=>s.p,set:v=>s.p=v},{label:'Burchagi',sym:'α',min:-180,max:180,step:5,unit:'°',d:0,get:()=>Math.round(s.ang/D2R),set:v=>{s.ang=v*D2R;s.w=0;}},{label:'Erkin harakatlanadi',toggle:1,get:()=>!s.fixed,set:v=>{s.fixed=!v;s.vx=s.vy=s.w=0;}}],del:()=>S.ms.splice(S.ms.indexOf(s),1)};
    if(S.ws.includes(s))return{title:'Tokli o‘tkazgich',note:'⊙ — tok bizga qarab, ⊗ — bizdan uzoqqa.',props:[{label:'Tok kuchi',sym:'I',min:-500,max:500,step:10,unit:'A',d:0,get:()=>s.I,set:v=>s.I=v||10}],del:()=>S.ws.splice(S.ws.indexOf(s),1)};
    if(S.cs.includes(s))return{title:'Kompas',note:'Qizil uchi maydon yo‘nalishini ko‘rsatadi.',props:[],del:()=>S.cs.splice(S.cs.indexOf(s),1)};
    if(S.rg.includes(s))return{title:'Bir jinsli maydon sohasi',note:'Maydon tekislikka tik. Unda zaryadli zarra aylana chizadi.',props:[{label:'Induksiya',sym:'B',min:-6,max:6,step:0.2,unit:'mT',d:1,get:()=>s.B,set:v=>s.B=Math.abs(v)<0.1?0.2:v}],del:()=>S.rg.splice(S.rg.indexOf(s),1)};return null;},
  inspectHint:'Magnit, o‘tkazgich, kompas yoki maydon sohasini bosing.',
  read(S,P){const sim=SIMS.find(s=>s.id==='lab_mag'),r=[['Magnitlar / o‘tkazgichlar',S.ms.length+' / '+S.ws.length],['Kompaslar',String(S.cs.length)]];const s=S.sel;
    if(s&&S.cs.includes(s)){const[bx,by]=sim.B(S,s.x,s.y);r.push(['Kompas joyida B',fmt(Math.hypot(bx,by)*1000,1)+' μT']);}
    if(S.ws.length){const w=S.ws[0];r.push(['1-o‘tkazgichdan 0,5 m da B',fmt(2e-4*Math.abs(w.I)/0.5*1000,1)+' μT']);}
    if(S.rg.length){const B=Math.abs(S.rg[0].B),v=S.pt.length?Math.hypot(S.pt[S.pt.length-1].vx,S.pt[S.pt.length-1].vy):0;r.push(['Sohadagi B',fmt(B,1)+' mT']);if(v)r.push(['Kutilgan radius r = v/((q/m)B)',fmt(v/(P.qm*B),2)+' m'],['Aylanish davri T = 2π/((q/m)B)',fmt(TAU/(P.qm*B),2)+' s']);}return r;}
});
