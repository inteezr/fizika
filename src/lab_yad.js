/* ===== Yadro fizikasi laboratoriyasi (yad) ===== */
/* Dunyo 1000×600 birlik. Material ichida zarra har birlik yo‘lda mu ehtimol bilan yutiladi (eksponensial susayish). */
const YD_T={a:{n:'α',col:'#ff6b5a',v:260,qm:0.15,r:3.4},b:{n:'β',col:'#4ea8ff',v:420,qm:-4,r:2.4},g:{n:'γ',col:'#c58bff',v:620,qm:0,r:2.2},n:{n:'n',col:'#e6e9ef',v:380,qm:0,r:2.6},f:{n:'bo‘lak',col:'#ffb347',v:300,qm:0,r:3.6}};
const YD_M={paper:{n:'Qog‘oz',col:'#e9e1cf',mu:{a:0.25,b:0.002,g:0.0001,n:0,f:0.3}},al:{n:'Alyuminiy',col:'#aab4c3',mu:{a:1,b:0.11,g:0.006,n:0.0005,f:1}},pb:{n:'Qo‘rg‘oshin',col:'#5d6676',mu:{a:1,b:0.3,g:0.045,n:0.001,f:1}},
  h2o:{n:'Suv (sekinlatkich)',col:'#2f7fd1',mu:{a:1,b:0.08,g:0.002,n:0.0004,f:1},mod:1},cd:{n:'Kadmiy (boshqaruv sterjeni)',col:'#3a3f4b',mu:{a:1,b:0.2,g:0.02,n:0.25,f:1}}};
function ydS(x,y,type,o={}){return Object.assign({x,y,type,ang:0,spr:6,rate:12,acc:0},o);}
function ydU(x,y,n,r){const a=[];for(let i=0;i<n;i++)a.push({x:x+(Math.random()-0.5)*r*2,y:y+(Math.random()-0.5)*r*2});return a;}
const YD_PRE={
  nurlar:()=>({srcs:[ydS(60,130,'a',{spr:2}),ydS(60,300,'b',{spr:2}),ydS(60,470,'g',{spr:1.5})],sh:[{x:300,y:40,w:14,h:520,mat:'paper'},{x:520,y:40,w:30,h:520,mat:'al'},{x:740,y:40,w:45,h:520,mat:'pb'}],dets:[{x:930,y:130},{x:930,y:300},{x:930,y:470}]}),
  magnit:()=>({srcs:[ydS(70,300,'mix',{spr:2,rate:24})],rg:[{x:260,y:40,w:560,h:520,B:1}],dets:[{x:880,y:300}]}),
  reaktor:()=>{const U=[];for(let i=0;i<4;i++)for(let j=0;j<3;j++)U.push(...ydU(330+i*130,170+j*130,6,22));return{srcs:[ydS(50,300,'n',{rate:3,spr:10})],sh:[{x:270,y:90,w:540,h:420,mat:'h2o'},{x:390,y:90,w:16,h:180,mat:'cd',rod:1},{x:520,y:90,w:16,h:180,mat:'cd',rod:1},{x:650,y:90,w:16,h:180,mat:'cd',rod:1}],U,dets:[{x:930,y:300}]};},
  bosh:()=>({})};
SIMS.push({id:'lab_yad',cat:'yad',lab:1,sandbox:1,title:'Yadro fizikasi laboratoriyasi',short:'nurlanish · himoya · reaktor',
  sub:'α, β, γ va neytron manbalarini qo‘ying, qog‘oz, alyuminiy, qo‘rg‘oshin, suv va kadmiydan to‘siqlar quring, Geyger hisoblagichlari bilan o‘lchang. Uran yadrolari va boshqaruv sterjenlari bilan zanjir reaksiyasini boshqaring.',
  formula:`<span><i>N</i> = <i>N</i>₀<i>e</i><sup>−<i>μx</i></sup></span><span class="alt">n + ²³⁵U → bo‘laklar + 2–3 n + ≈200 MeV</span>`,
  text:[LABTXT,'Alfa zarralar qog‘ozda, beta zarralar bir necha millimetr alyuminiyda to‘xtaydi, gamma nurlar esa qo‘rg‘oshinda ham faqat qisman susayadi. Magnit maydonda α va β qarama-qarshi tomonga og‘adi, γ to‘g‘ri o‘tadi. Uran-235 sekin neytronni yutib bo‘linadi va 2–3 ta tez neytron chiqaradi. Suv neytronlarni sekinlatadi, kadmiy esa yutadi — reaktor quvvati shu bilan boshqariladi.'],
  legend:[['α','geliy yadrosi, +2e'],['β','elektron, −e'],['γ','yuqori energiyali foton'],['n','neytron'],['μ','susayish koeffitsienti'],['x','to‘siq qalinligi']],
  tries:['Nurlar tajribasida qo‘rg‘oshinni qalinlashtiring: γ hisoblagichdagi son kamayadi, lekin nolga tushmaydi.','Reaktorda boshqaruv sterjenlarini pastga suring: bo‘linishlar soni kamayadi, reaksiya so‘nadi.','Suvni olib tashlang: tez neytronlar uranni deyarli bo‘lmaydi.'],
  hint:'Manba, to‘siq yoki detektorni sudrang',
  tools:[{id:'move',label:'Surish'},{id:'src',label:'+ Manba'},{id:'shield',label:'+ To‘siq'},{id:'det',label:'+ Detektor'},{id:'fuel',label:'+ Uran-235'},{id:'field',label:'+ B maydon'},{id:'del',label:'O‘chirish'},{id:'clear',label:'Bo‘sh stol',act:1}],
  hints:{src:'Joyni bosing (turi pastdagi tanlovda)',shield:'To‘siqni to‘rtburchak qilib sudrang',det:'Joyni bosing',fuel:'Joyni bosing: 6 ta uran yadrosi',field:'Maydon sohasini sudrang',del:'Obyektni bosing'},
  params:[{id:'pre',label:'Tajriba',choices:[[0,'Nurlar va himoya'],[1,'Magnit maydonda'],[2,'Yadro reaktori'],[3,'Bo‘sh stol']],val:0,reset:1},{id:'st',label:'Yangi manba turi',choices:[['a','α'],['b','β'],['g','γ'],['n','n'],['mix','α+β+γ']],val:'a'},{id:'mat',label:'Yangi to‘siq materiali',choices:[['paper','Qog‘oz'],['al','Al'],['pb','Pb'],['h2o','Suv'],['cd','Cd']],val:'al'}],
  init:P=>Object.assign({srcs:[],sh:[],dets:[],U:[],rg:[],ps:[],fx:[],sel:null,drag:null,t:0,fis:0,fisR:0,E:0},YD_PRE[['nurlar','magnit','reaktor','bosh'][P.pre]]()),
  action(id,S){if(id==='clear'){Object.assign(S,{srcs:[],sh:[],dets:[],U:[],rg:[],ps:[],sel:null,fis:0,E:0});}},
  step(S,P,dt){dt=Math.min(dt,0.04);S.t+=dt;const ps=S.ps,inR=(r,x,y)=>x>r.x&&x<r.x+r.w&&y>r.y&&y<r.y+r.h;
    S.srcs.forEach(s=>{s.acc+=s.rate*dt;while(s.acc>=1){s.acc--;if(ps.length>900)break;const ty=s.type==='mix'?['a','b','g'][Math.floor(Math.random()*3)]:s.type,T=YD_T[ty],a=s.ang+(Math.random()-0.5)*2*s.spr*D2R;ps.push({x:s.x+Math.cos(a)*16,y:s.y+Math.sin(a)*16,vx:Math.cos(a)*T.v,vy:Math.sin(a)*T.v,ty,tr:[]});}});
    const n=3,h=dt/n;let fis=0;
    for(let it=0;it<n;it++)for(const p of ps){if(p.dead)continue;const T=YD_T[p.ty];
      if(T.qm)S.rg.forEach(r=>{if(inR(r,p.x,p.y)){const k=-T.qm*r.B*h,c=Math.cos(k),s=Math.sin(k),vx=p.vx*c-p.vy*s,vy=p.vx*s+p.vy*c;p.vx=vx;p.vy=vy;}});
      p.x+=p.vx*h;p.y+=p.vy*h;const sp=Math.hypot(p.vx,p.vy),dl=sp*h;
      if(p.ty==='f'){p.vx*=1-4*h;p.vy*=1-4*h;if(sp<30)p.dead=1;}
      for(const r of S.sh){if(!inR(r,p.x,p.y))continue;const M=YD_M[r.mat];if(Math.random()<1-Math.exp(-M.mu[p.ty]*dl)){p.dead=1;break;}
        if(M.mod&&p.ty==='n'&&Math.random()<1-Math.exp(-0.05*dl)){/* elastik sochilish: tezlik kamayadi, yo‘nalish tasodifiy */const v=Math.max(80,sp*0.72),a=Math.random()*TAU;p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v;}}
      if(p.dead)continue;
      S.dets.forEach(d=>{if(Math.hypot(p.x-d.x,p.y-d.y)<26&&p.ty!=='f'){p.dead=1;d.c=(d.c||0)+1;d.cnt=(d.cnt||0)+1;}});
      if(p.ty==='n'&&S.U.length){for(let i=0;i<S.U.length;i++){const u=S.U[i];if(Math.abs(u.x-p.x)<9&&Math.abs(u.y-p.y)<9){const pr=sp<140?0.85:0.04;if(Math.random()<pr){p.dead=1;S.U.splice(i,1);fis++;S.fx.push({x:u.x,y:u.y,t:0});
            const nn=Math.random()<0.5?2:3;for(let k=0;k<nn;k++){const a=Math.random()*TAU;ps.push({x:u.x,y:u.y,vx:Math.cos(a)*380,vy:Math.sin(a)*380,ty:'n',tr:[]});}const a=Math.random()*TAU;[1,-1].forEach(sg=>ps.push({x:u.x,y:u.y,vx:sg*Math.cos(a)*300,vy:sg*Math.sin(a)*300,ty:'f',tr:[]}));}break;}}}
      if(p.x<-20||p.y<-20||p.x>1020||p.y>620)p.dead=1;}
    S.ps=ps.filter(p=>!p.dead);if(S.ps.length>900)S.ps.splice(0,S.ps.length-900);S.ps.forEach(p=>{p.tr.push(p.x,p.y);if(p.tr.length>16)p.tr.splice(0,2);});
    S.fis+=fis;S.E+=fis*200;S.fisR+=(fis/dt-S.fisR)*Math.min(1,dt/1.5);S.dets.forEach(d=>{d.r=(d.r||0)+((d.c||0)/dt-(d.r||0))*Math.min(1,dt/2);d.c=0;});S.fx.forEach(f=>f.t+=dt);S.fx=S.fx.filter(f=>f.t<0.5);},
  draw(c,W,H,S,P){const sc=Math.min(W/1000,H/600),ox=(W-1000*sc)/2,oy=(H-600*sc)/2,X=x=>ox+x*sc,Y=y=>oy+y*sc;S.geo={sc,ox,oy};grid(c,W,H,28);
    S.rg.forEach(r=>{c.fillStyle=rgba('violet',0.08);c.fillRect(X(r.x),Y(r.y),r.w*sc,r.h*sc);c.strokeStyle=r===S.sel?C.accent:rgba('violet',0.6);c.setLineDash([6,4]);c.lineWidth=1.5;c.strokeRect(X(r.x),Y(r.y),r.w*sc,r.h*sc);c.setLineDash([]);
      for(let yy=r.y+25;yy<r.y+r.h;yy+=50)for(let xx=r.x+25;xx<r.x+r.w;xx+=50){line(c,X(xx)-4,Y(yy)-4,X(xx)+4,Y(yy)+4,rgba('violet',0.5),1.3);line(c,X(xx)-4,Y(yy)+4,X(xx)+4,Y(yy)-4,rgba('violet',0.5),1.3);}txt(c,'B ⊗ '+fmt(r.B,1),X(r.x)+6,Y(r.y)+12,C.violet,{font:SMALL});});
    S.sh.forEach(r=>{const M=YD_M[r.mat];c.fillStyle=M.col;c.globalAlpha=r.mat==='h2o'?0.22:0.85;c.fillRect(X(r.x),Y(r.y),r.w*sc,r.h*sc);c.globalAlpha=1;if(r===S.sel){c.strokeStyle=C.accent;c.lineWidth=2.5;c.strokeRect(X(r.x),Y(r.y),r.w*sc,r.h*sc);}
      if(r.w*sc>40||r.mat!=='h2o')txt(c,M.n.split(' ')[0],X(r.x+r.w/2),r.mat==='h2o'?Y(r.y+r.h)+12:Y(r.y)-8,C.muted,{align:'center',font:SMALL});});
    S.U.forEach(u=>disk(c,X(u.x),Y(u.y),4.5*sc+1.5,'#7ee06a'));
    S.fx.forEach(f=>{const g=c.createRadialGradient(X(f.x),Y(f.y),0,X(f.x),Y(f.y),(10+f.t*90)*sc);g.addColorStop(0,'rgba(255,240,180,'+(1-f.t*2)+')');g.addColorStop(1,'rgba(255,140,40,0)');c.fillStyle=g;c.beginPath();c.arc(X(f.x),Y(f.y),(10+f.t*90)*sc,0,TAU);c.fill();});
    S.ps.forEach(p=>{const T=YD_T[p.ty];c.strokeStyle=T.col;c.globalAlpha=0.45;c.lineWidth=p.ty==='g'?1:1.6;c.beginPath();for(let i=0;i<p.tr.length;i+=2)i?c.lineTo(X(p.tr[i]),Y(p.tr[i+1])):c.moveTo(X(p.tr[i]),Y(p.tr[i+1]));c.stroke();c.globalAlpha=1;
      if(p.ty==='g'){c.fillStyle=T.col;c.fillRect(X(p.x)-2,Y(p.y)-2,4,4);}else{const sl=p.ty==='n'&&Math.hypot(p.vx,p.vy)<140;c.fillStyle=sl?'#7fd6ff':T.col;c.beginPath();c.arc(X(p.x),Y(p.y),T.r*sc+1,0,TAU);c.fill();}});
    S.srcs.forEach(s=>{const x=X(s.x),y=Y(s.y);c.save();c.translate(x,y);c.rotate(s.ang);c.fillStyle=s===S.sel?C.accent:'#4a5160';rrect(c,-20,-14,32,28,5);c.fill();c.fillStyle='#ffd23f';c.fillRect(10,-6,5,12);c.restore();txt(c,s.type==='mix'?'α β γ':YD_T[s.type].n,x-4,y+1,'#fff',{align:'center',font:'700 12px system-ui'});});
    S.dets.forEach(d=>{const x=X(d.x),y=Y(d.y);disk(c,x,y,24*sc+4,rgba('panel',0.95),d===S.sel?C.accent:C.green);txt(c,fmt(d.r||0,0),x,y-3,C.green,{align:'center',font:'700 13px "IBM Plex Mono", monospace'});txt(c,'/s',x,y+11,C.muted,{align:'center',font:SMALL});});
    if(S.dw){const r=S.dw;c.strokeStyle=C.accent;c.setLineDash([6,4]);c.strokeRect(X(Math.min(r[0],r[2])),Y(Math.min(r[1],r[3])),Math.abs(r[2]-r[0])*sc,Math.abs(r[3]-r[1])*sc);c.setLineDash([]);}
    if(S.U.length||S.fis)txt(c,'U-235: '+S.U.length+'   bo‘linishlar: '+S.fis,X(10),Y(590),C.ink,{font:SMALL});},
  pointer(type,x,y,S,P){if(!S.geo)return false;const{sc,ox,oy}=S.geo,mx=(x-ox)/sc,my=(y-oy)/sc,md=S.mode,inR=r=>mx>r.x-4&&mx<r.x+r.w+4&&my>r.y-4&&my<r.y+r.h+4;
    const hit=()=>S.srcs.find(s=>Math.hypot(s.x-mx,s.y-my)<24)||S.dets.find(d=>Math.hypot(d.x-mx,d.y-my)<28)||[...S.sh].reverse().find(inR)||S.rg.find(inR);
    if(type==='down'){
      if(md==='move'){const o=hit();S.sel=o||null;if(o){S.drag=o;S.dox=mx-o.x;S.doy=my-o.y;return true;}return false;}
      if(md==='src'){const s=ydS(mx,my,P.st);S.srcs.push(s);S.sel=s;return true;}
      if(md==='det'){const d={x:mx,y:my};S.dets.push(d);S.sel=d;return true;}
      if(md==='fuel'){if(S.U.length<160)S.U.push(...ydU(mx,my,6,20));return true;}
      if(md==='shield'||md==='field'){S.dw=[mx,my,mx,my];return true;}
      if(md==='del'){const o=hit();if(o){[S.srcs,S.dets,S.sh,S.rg].forEach(a=>{const i=a.indexOf(o);if(i>=0)a.splice(i,1);});S.sel=null;return true;}const k=S.U.length;S.U=S.U.filter(u=>Math.hypot(u.x-mx,u.y-my)>30);return k!==S.U.length;}return false;}
    if(type==='move'){const d=S.drag;if(d){d.x=mx-S.dox;d.y=my-S.doy;return true;}if(S.dw){S.dw[2]=mx;S.dw[3]=my;return true;}return false;}
    if(type==='up'){S.drag=null;if(S.dw){const r=S.dw;S.dw=null;const o={x:Math.min(r[0],r[2]),y:Math.min(r[1],r[3]),w:Math.abs(r[2]-r[0]),h:Math.abs(r[3]-r[1])};if(o.w>6&&o.h>6){if(S.mode==='field'){o.B=1;S.rg.push(o);}else{o.mat=P.mat;S.sh.push(o);}S.sel=o;}}}return false;},
  inspect(S){const s=S.sel;if(!s)return null;
    if(S.srcs.includes(s))return{title:'Radioaktiv manba',props:[{label:'Turi',choices:[['a','α'],['b','β'],['g','γ'],['n','n'],['mix','α+β+γ']],get:()=>s.type,set:v=>s.type=v},{label:'Faollik',sym:'',min:1,max:40,step:1,unit:'zarra/s',d:0,get:()=>s.rate,set:v=>s.rate=v},{label:'Yo‘nalishi',sym:'φ',min:-180,max:180,step:5,unit:'°',d:0,get:()=>Math.round(s.ang/D2R),set:v=>s.ang=v*D2R},{label:'Dasta kengligi',sym:'',min:0,max:60,step:1,unit:'°',d:0,get:()=>s.spr,set:v=>s.spr=v}],del:()=>S.srcs.splice(S.srcs.indexOf(s),1)};
    if(S.sh.includes(s))return{title:'To‘siq: '+YD_M[s.mat].n,props:[{label:'Material',choices:[['paper','Qog‘oz'],['al','Al'],['pb','Pb'],['h2o','Suv'],['cd','Cd']],get:()=>s.mat,set:v=>s.mat=v},{label:'Qalinligi',sym:'x',min:4,max:200,step:2,unit:'',d:0,get:()=>Math.round(s.w),set:v=>s.w=v},{label:'Balandligi',sym:'',min:20,max:560,step:10,unit:'',d:0,get:()=>Math.round(s.h),set:v=>s.h=v}],del:()=>S.sh.splice(S.sh.indexOf(s),1)};
    if(S.dets.includes(s))return{title:'Geyger hisoblagichi',note:'Jami qayd etilgan: '+(s.cnt||0),props:[],del:()=>S.dets.splice(S.dets.indexOf(s),1)};
    if(S.rg.includes(s))return{title:'Magnit maydon (⊗)',props:[{label:'Induksiya',sym:'B',min:-3,max:3,step:0.1,d:1,unit:'×',get:()=>s.B,set:v=>s.B=v}],del:()=>S.rg.splice(S.rg.indexOf(s),1)};return null;},
  inspectHint:'Manba, to‘siq, detektor yoki maydonni bosing.',
  read(S){const cnt={};S.ps.forEach(p=>cnt[p.ty]=(cnt[p.ty]||0)+1);const r=[['Uchayotgan zarralar','α '+(cnt.a||0)+' · β '+(cnt.b||0)+' · γ '+(cnt.g||0)+' · n '+(cnt.n||0)]];
    S.dets.slice(0,3).forEach((d,i)=>r.push([(i+1)+'-detektor',fmt(d.r||0,1)+' /s']));
    if(S.U.length||S.fis)r.push(['Bo‘linishlar (jami)',String(S.fis)],['Bo‘linish tezligi',fmt(S.fisR,1)+' /s'],['Ajralgan energiya',fmt(S.E,0)+' MeV']);return r;}
});
