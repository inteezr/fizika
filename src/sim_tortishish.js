/* Butun olam tortishish qonuni — sayyora va yo‘ldosh qo‘shiladigan */
const STARS=Array.from({length:70},()=>[Math.random(),Math.random(),Math.random()]);
const SATC=['warm','green','red','violet','water'];
function gInit(P){const vc=Math.sqrt(P.M/P.r0);return{pl:[{x:0,y:0,M:1,main:true}],sats:[{x:P.r0,y:0,vx:0,vy:P.vf*vc,tr:[],c:0}],sel:null,drag:null,launch:null,nc:1,sc:56,cx:400,cy:250};}
const plM=(p,P)=>p.main?P.M:p.M,plR=(p,P)=>10+plM(p,P)*5;
function gAcc(pl,P,x,y){let ax=0,ay=0;for(const p of pl){const dx=p.x-x,dy=p.y-y,r2=dx*dx+dy*dy+1e-4,r=Math.sqrt(r2),M=plM(p,P);ax+=M*dx/(r2*r);ay+=M*dy/(r2*r);}return[ax,ay];}
SIMS.push({id:'tortishish',cat:'din',title:'Butun olam tortishish qonuni',short:'F = G m₁m₂ / r²',sandbox:1,
  sub:'Ikki jism massalari ko‘paytmasiga to‘g‘ri, masofa kvadratiga teskari proporsional kuch bilan tortishadi.',
  formula:`<span><i>F</i> = <i>G</i> ${fr('<i>m</i><sub>1</sub><i>m</i><sub>2</sub>','<i>r</i><sup>2</sup>')}</span><span class="alt"><i>v</i><sub>1</sub> = ${sq(fr('<i>GM</i>','<i>r</i>'))} &nbsp; <i>v</i><sub>2</sub> = <i>v</i><sub>1</sub>√2</span>`,
  text:['Tortishish kuchi (to‘q sariq strelka) yo‘ldoshni sayyora tomon tortadi. Yo‘ldosh tezligi birinchi kosmik tezlikka (v₁) teng bo‘lsa, u aylana orbita bo‘ylab uchadi; kichikroq bo‘lsa orbita ellipsga aylanadi; v₁√2 dan katta bo‘lsa, tortishishdan qutulib ketadi.','O‘zingiz yo‘ldosh uchiring: «+ Yo‘ldosh» tugmasini tanlang, boshlang‘ich nuqtani bosing va sichqonchani sudrab tezlik yo‘nalishini bering — punktir chiziq kelajakdagi yo‘lni ko‘rsatadi. «+ Sayyora» bilan qo‘shimcha tortuvchi jism qo‘ying va uni sudrang.'],
  legend:[['G','gravitatsiya doimiysi, 6,67·10⁻¹¹ N·m²/kg²'],['m₁, m₂','jismlar massasi'],['r','markazlar orasidagi masofa'],['v₁','birinchi kosmik tezlik'],['v₂','ikkinchi kosmik tezlik']],
  tries:['Ikki sayyora qo‘ying va ular orasidan yo‘ldosh uchiring: «sakkizlik» orbita yoki gravitatsion manyovr hosil bo‘ladi.','Tezlikni 0,7 ga tushiring (parametrlar): orbita cho‘ziq ellips bo‘ladi va sayyoraga yaqinlashganda yo‘ldosh tezlashadi.','Bir nechta yo‘ldoshni turli masofaga uchiring: uzoqdagilari sekinroq aylanadi (Keplerning 3-qonuni).'],
  tools:[{id:'move',label:'Surish / tanlash'},{id:'sat',label:'+ Yo‘ldosh'},{id:'planet',label:'+ Sayyora'},{id:'del',label:'O‘chirish'},{id:'clear',label:'Yo‘ldoshlarni tozalash',act:1}],
  hints:{move:'Sayyorani sudrang',sat:'Bosing va tezlik tomon sudrang',planet:'Sayyora qo‘yiladigan joyni bosing',del:'Yo‘ldosh yoki sayyorani bosing'},
  params:[{id:'M',label:'Asosiy sayyora massasi (nisbiy)',sym:'M',min:0.5,max:3,step:0.1,val:1,unit:'',d:1},{id:'r0',label:'Boshlang‘ich masofa (nisbiy)',sym:'r',min:1,max:4,step:0.1,val:2.6,unit:'',d:1,reset:1},{id:'vf',label:'Tezlik (v₁ ga nisbatan)',sym:'v/v₁',min:0.3,max:1.6,step:0.01,val:0.8,unit:'',d:2,reset:1}],
  init:gInit,
  action(id,S){if(id==='clear'){S.sats=[];S.sel=null;}},
  step(S,P,dt){const n=40,h=dt*4/n,sc=S.sc;for(const s of S.sats){for(let i=0;i<n;i++){const[a,b]=gAcc(S.pl,P,s.x,s.y);s.vx+=a*h;s.vy+=b*h;s.x+=s.vx*h;s.y+=s.vy*h;}
      s.tr.push([s.x,s.y]);if(s.tr.length>700)s.tr.shift();if(S.pl.some(p=>Math.hypot(p.x-s.x,p.y-s.y)<plR(p,P)/sc)||Math.hypot(s.x,s.y)>25)s.dead=1;}
    S.sats=S.sats.filter(s=>{if(s.dead&&S.sel===s)S.sel=null;return!s.dead;});},
  draw(c,W,H,S,P){const cx=W/2,cy=H/2,sc=Math.min(W,H)/2/5;S.sc=sc;S.cx=cx;S.cy=cy;const X=x=>cx+x*sc,Y=y=>cy-y*sc;
    STARS.forEach(s=>disk(c,s[0]*W,s[1]*H,s[2]*1.3+0.3,rgba('muted',0.5)));
    S.sats.forEach(s=>{c.strokeStyle=rgba(SATC[s.c%5],0.55);c.lineWidth=1.8;c.beginPath();s.tr.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(p[1])):c.moveTo(X(p[0]),Y(p[1])));c.stroke();});
    S.pl.forEach(p=>{const r=plR(p,P),x=X(p.x),y=Y(p.y),g=c.createRadialGradient(x-r/3,y-r/3,2,x,y,r);g.addColorStop(0,p.main?C.water:C.warm);g.addColorStop(1,p.main?C.accent:C.red);disk(c,x,y,r,g);if(p===S.sel)selRing(c,x,y,r+6);});
    const tr=S.sel&&S.sats.includes(S.sel)?S.sel:S.sats[0];
    S.sats.forEach(s=>{const x=X(s.x),y=Y(s.y);if(s===tr){const[ax,ay]=gAcc(S.pl,P,s.x,s.y),a=Math.hypot(ax,ay),fl=clamp(110*a,8,95);arrow(c,x,y,x+ax/a*fl,y-ay/a*fl,C.warm,2.5,'F');arrow(c,x,y,x+s.vx*45,y-s.vy*45,C.green,2.5,'v');}
      disk(c,x,y,5,C[SATC[s.c%5]]);disk(c,x,y,5,null,C.ink);if(s===S.sel)selRing(c,x,y,10);});
    if(S.launch){const L=S.launch,vx=(L.x1-L.x0)*0.5,vy=(L.y1-L.y0)*0.5;let x=L.x0,y=L.y0,ux=vx,uy=vy;c.strokeStyle=rgba('ink',0.5);c.lineWidth=1.3;c.setLineDash([4,5]);c.beginPath();c.moveTo(X(x),Y(y));
      for(let i=0;i<900;i++){const[a,b]=gAcc(S.pl,P,x,y);ux+=a*0.02;uy+=b*0.02;x+=ux*0.02;y+=uy*0.02;c.lineTo(X(x),Y(y));if(S.pl.some(p=>Math.hypot(p.x-x,p.y-y)<plR(p,P)/sc))break;}c.stroke();c.setLineDash([]);
      arrow(c,X(L.x0),Y(L.y0),X(L.x1),Y(L.y1),C.green,2.5,'v');disk(c,X(L.x0),Y(L.y0),5,C.ink);}
  },
  pointer(type,x,y,S,P,api){const wx=(x-S.cx)/S.sc,wy=(S.cy-y)/S.sc;
    const hitP=()=>S.pl.find(p=>Math.hypot(p.x-wx,p.y-wy)*S.sc<plR(p,P)+8),hitS=()=>S.sats.find(s=>Math.hypot(s.x-wx,s.y-wy)*S.sc<12);
    if(type==='down'){const md=S.mode;
      if(md==='move'){const s=hitS();if(s){S.sel=s;return true;}const p=hitP();S.sel=p||null;if(p){S.drag=p;return true;}return false;}
      if(md==='sat'){S.launch={x0:wx,y0:wy,x1:wx,y1:wy};return true;}
      if(md==='planet'){const p={x:wx,y:wy,M:1};S.pl.push(p);S.sel=p;return true;}
      if(md==='del'){const s=hitS();if(s){S.sats.splice(S.sats.indexOf(s),1);S.sel=null;return true;}const p=hitP();if(p&&!p.main){S.pl.splice(S.pl.indexOf(p),1);S.sel=null;return true;}return false;}return false;}
    if(type==='move'){if(S.launch){S.launch.x1=wx;S.launch.y1=wy;return true;}if(S.drag){S.drag.x=wx;S.drag.y=wy;return true;}return false;}
    if(type==='up'){if(S.launch){const L=S.launch,s={x:L.x0,y:L.y0,vx:(L.x1-L.x0)*0.5,vy:(L.y1-L.y0)*0.5,tr:[],c:S.nc++};S.sats.push(s);S.sel=s;S.launch=null;}S.drag=null;}return false;},
  inspect(S,P){const s=S.sel;if(!s)return null;
    if(S.pl.includes(s)){if(s.main)return{title:'Asosiy sayyora',note:'Massasini «Parametrlar» bo‘limida o‘zgartiring. Sayyorani sudrab joyini o‘zgartirish mumkin.'};return{title:'Sayyora',props:[{label:'Massasi (nisbiy)',sym:'M',min:0.2,max:3,step:0.1,unit:'',d:1,get:()=>s.M,set:v=>s.M=v}],del:()=>S.pl.splice(S.pl.indexOf(s),1)};}
    if(S.sats.includes(s))return{title:'Yo‘ldosh',note:'Yo‘ldosh tezligi va yo‘nalishi uni uchirganingizda beriladi.',del:()=>S.sats.splice(S.sats.indexOf(s),1)};return null;},
  inspectHint:'Sayyora yoki yo‘ldoshni bosing.',
  read:(S,P)=>{const s=S.sel&&S.sats.includes(S.sel)?S.sel:S.sats[0],m=S.pl[0];const base=[['Sayyoralar / yo‘ldoshlar',S.pl.length+' / '+S.sats.length]];if(!s)return base.concat([['Yo‘ldosh','yo‘q — «+ Yo‘ldosh» bilan uchiring']]);
    const r=Math.hypot(s.x-m.x,s.y-m.y),v=Math.hypot(s.vx,s.vy),vc=Math.sqrt(P.M/r);return base.concat([['Masofa r',fmt(r)],['Tezlik v',fmt(v)],['v / v₁ (shu masofada)',fmt(v/vc)]]);}
});
