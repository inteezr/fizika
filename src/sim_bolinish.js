/* Yadro bo‘linishi va zanjir reaksiyasi */
function bolInit(P){const n=[],cols=18,rows=11;for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const r=Math.random();n.push({x:(i+0.5)/cols+(Math.random()-0.5)*0.02,y:(j+0.5)/rows+(Math.random()-0.5)*0.03,t:r<P.U/100?'U':r<P.U/100+P.B/100?'B':'X',f:0});}return{n,neu:[0,1,2].map(i=>({x:0.02,y:0.35+i*0.15,vx:0.5,vy:(Math.random()-0.5)*0.2})),fr:[],fis:0,t:0,hold:0,peak:1};}
SIMS.push({id:'bolinish',cat:'yad',title:'Yadro bo‘linishi va zanjir reaksiyasi',short:'²³⁵U + n → 2 parcha + 2–3n',
  sub:'Uran-235 yadrosi neytronni yutib, ikki bo‘lakka bo‘linadi va 2–3 ta yangi neytron chiqaradi. Bu neytronlar boshqa yadrolarni bo‘lishi mumkin — zanjir reaksiyasi.',
  formula:`<span><sup>235</sup>U + <i>n</i> → <sup>141</sup>Ba + <sup>92</sup>Kr + 3<i>n</i></span><span class="alt">Har bir bo‘linishda ≈ 200 MeV ajraladi &nbsp; <i>k</i> = ${fr('<i>N</i><sub><i>i</i>+1</sub>','<i>N</i><sub><i>i</i></sub>')}</span>`,
  text:['Neytron zaryadsiz bo‘lgani uchun yadroga osonlik bilan yaqinlashadi. Bo‘linishda ajralgan energiya asosan bo‘laklarning kinetik energiyasiga aylanadi. Neytronlar ko‘payish koeffitsienti k > 1 bo‘lsa, reaksiya ko‘chkiga aylanadi.','Atom elektr stansiyasida neytronlarni yutuvchi sterjenlar (bor, kadmiy) yordamida k ≈ 1 ushlab turiladi. Uran kam yoki yutuvchi ko‘p bo‘lsa, reaksiya so‘nadi.'],
  legend:[['²³⁵U','bo‘linuvchi uran (sariq)'],['B','neytron yutuvchi (ko‘k)'],['n','neytron'],['k','neytronlar ko‘payish koeffitsienti']],
  tries:['Uran ulushini 80% qiling: reaksiya ko‘chkiga aylanadi.','Yutuvchi sterjenlarni ko‘paytiring: reaksiya o‘chadi.','Bo‘linishlar soniga qarab ajralgan energiyani hisoblang.'],
  params:[{id:'U',label:'Uran-235 ulushi',sym:'',min:10,max:90,step:5,val:60,unit:'%',d:0,reset:1},{id:'B',label:'Yutuvchi sterjenlar',sym:'',min:0,max:40,step:5,val:5,unit:'%',d:0,reset:1}],
  init:bolInit,
  step(S,P,dt){S.t+=dt;const rr=0.034;S.neu.forEach(n=>{n.x+=n.vx*dt;n.y+=n.vy*dt;for(const u of S.n){if(u.f)continue;if(Math.abs(u.x-n.x)<rr&&Math.abs(u.y-n.y)<rr*1.6){if(u.t==='U'){u.f=1;n.dead=1;S.fis++;for(let k=0;k<2+(Math.random()<0.5?1:0);k++){const a=Math.random()*TAU;S.neu.push({x:u.x,y:u.y,vx:Math.cos(a)*0.45,vy:Math.sin(a)*0.45*1.6});}S.fr.push({x:u.x,y:u.y,a:Math.random()*TAU,l:1});break;}else if(u.t==='B'){n.dead=1;break;}}}if(n.x<0||n.x>1||n.y<0||n.y>1)n.dead=1;});
    S.neu=S.neu.filter(n=>!n.dead);if(S.neu.length>400)S.neu.length=400;S.peak=Math.max(S.peak,S.neu.length);S.fr.forEach(f=>f.l-=dt*0.8);S.fr=S.fr.filter(f=>f.l>0);if(!S.neu.length){S.hold+=dt;if(S.hold>2.5)Object.assign(S,bolInit(P));}},
  draw(c,W,H,S,P){c.fillStyle=C.canvas;c.fillRect(0,0,W,H);grid(c,W,H,28);const ox=10,oy=10,w=W-20,h=H-20,X=x=>ox+x*w,Y=y=>oy+y*h;S.g={ox,oy,w,h};
    S.n.forEach(u=>{if(u.f){disk(c,X(u.x),Y(u.y),3,rgba('muted',0.3));return;}disk(c,X(u.x),Y(u.y),u.t==='U'?8:u.t==='B'?6:5,u.t==='U'?C.warm:u.t==='B'?C.accent:rgba('muted',0.45));});
    S.fr.forEach(f=>{const d=(1-f.l)*30;disk(c,X(f.x)+Math.cos(f.a)*d,Y(f.y)+Math.sin(f.a)*d,5,rgba('red',f.l));disk(c,X(f.x)-Math.cos(f.a)*d,Y(f.y)-Math.sin(f.a)*d,5,rgba('green',f.l));const gg=c.createRadialGradient(X(f.x),Y(f.y),1,X(f.x),Y(f.y),30*f.l+4);gg.addColorStop(0,`rgba(255,230,140,${f.l*0.8})`);gg.addColorStop(1,'rgba(255,230,140,0)');c.fillStyle=gg;c.beginPath();c.arc(X(f.x),Y(f.y),34,0,TAU);c.fill();});
    S.neu.forEach(n=>disk(c,X(n.x),Y(n.y),2.6,C.ink));
  },
  read:(S,P)=>[['Bo‘linishlar soni',String(S.fis)],['Ajralgan energiya',fmt(S.fis*200,0)+' MeV'],['Hozirgi neytronlar',String(S.neu.length)],['Holat',S.neu.length>40?'zanjir reaksiyasi!':S.neu.length?'davom etmoqda':'reaksiya so‘ndi']]
});
