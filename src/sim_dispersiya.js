/* Yorug‘lik dispersiyasi */
const DWL=[410,450,490,530,570,610,660];
function dGeo(W,H,P){const A=P.A*D2R,h=H*0.62,hw=h*Math.tan(A/2),ax=W*0.46,ay=H*0.16,pts=[[ax,ay],[ax+hw,ay+h],[ax-hw,ay+h]];
  const ex=-hw,ey=h,L=Math.hypot(ex,ey),inx=ey/L,iny=-ex/L,mx=ax+ex*0.5,my=ay+ey*0.5,i=P.inc*D2R,dx=inx*Math.cos(i)+iny*Math.sin(i),dy=-inx*Math.sin(i)+iny*Math.cos(i);
  return{pts,cx:ax,cy:ay+h*2/3,mx,my,dx,dy};}
SIMS.push({id:'dispersiya',cat:'opt',title:'Yorug‘lik dispersiyasi',short:'n = n(λ)',
  sub:'Shishaning sindirish ko‘rsatkichi to‘lqin uzunligiga bog‘liq, shuning uchun prizma oq nurni ranglarga ajratadi.',
  formula:`<span><i>n</i> = ${fr('<i>c</i>','<i>v</i>')} = <i>n</i>(<i>λ</i>)</span><span class="alt"><i>n</i><sub>binafsha</sub> &gt; <i>n</i><sub>qizil</sub> &nbsp; <i>δ</i> = <i>i</i><sub>1</sub> + <i>i</i><sub>2</sub> − <i>A</i></span>`,
  text:['Oq yorug‘lik turli ranglar aralashmasi. Shishada binafsha nur qizildan sekinroq tarqaladi, ya’ni uning sindirish ko‘rsatkichi kattaroq. Shuning uchun prizmadan o‘tganda binafsha nur kuchliroq og‘adi va ranglar ajraladi.','Nyuton 1666-yilda shu tajriba bilan oq nur murakkab ekanini isbotlagan. Kamalak ham yomg‘ir tomchilaridagi dispersiya tufayli paydo bo‘ladi.'],
  legend:[['n','sindirish ko‘rsatkichi'],['λ','to‘lqin uzunligi, nm'],['A','prizmaning sindiruvchi burchagi'],['i₁','tushish burchagi'],['δ','og‘ish burchagi']],
  tries:['Dispersiya kuchini oshiring: spektr kengayadi (olmos kuchli dispersiya beradi).','Tushish burchagini kamaytiring: ma’lum burchakdan keyin nur prizmadan chiqmay, to‘liq ichki qaytadi.','Prizma burchagini o‘zgartiring va og‘ish burchaklarini solishtiring.'],
  params:[{id:'A',label:'Prizma burchagi',sym:'A',min:30,max:70,step:1,val:60,unit:'°',d:0},{id:'inc',label:'Tushish burchagi',sym:'i₁',min:10,max:85,step:1,val:50,unit:'°',d:0},{id:'k',label:'Dispersiya kuchi',sym:'',min:1,max:6,step:0.5,val:3,unit:'×',d:1}],
  init:()=>({}),
  nOf:(l,P)=>{const B=0.0042*P.k;return 1.5+B*(1/(l/1000)**2-1/0.55**2);},
  draw(c,W,H,S,P,tt){grid(c,W,H,28);const g=dGeo(W,H,P),sim=SIMS.find(s=>s.id==='dispersiya');S.dev=[];
    c.fillStyle=rgba('water',0.18);c.strokeStyle=C.water;c.lineWidth=2;c.beginPath();g.pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.stroke();
    const sx=g.mx-g.dx*W,sy=g.my-g.dy*W;line(c,sx,sy,g.mx,g.my,C.ink,3.5);c.strokeStyle=C.canvas;c.lineWidth=1.5;c.setLineDash([6,14]);c.lineDashOffset=-tt*120;c.beginPath();c.moveTo(sx,sy);c.lineTo(g.mx,g.my);c.stroke();c.setLineDash([]);c.lineDashOffset=0;
    DWL.forEach(l=>{const o={t:'poly',pts:g.pts,cx:g.cx,cy:g.cy,n:sim.nOf(l,P)},pts=trace([o],sx,sy,g.dx,g.dy);c.strokeStyle=wl2rgb(l);c.lineWidth=2.2;c.beginPath();pts.slice(1).forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
      if(pts.length>=4){const a=pts[pts.length-2],b=pts[pts.length-1],dd=Math.atan2(b[1]-a[1],b[0]-a[0])-Math.atan2(g.dy,g.dx);S.dev.push([l,dd/D2R]);}});
    txt(c,'A',g.pts[0][0],g.pts[0][1]+28,C.muted,{align:'center',font:MATH});txt(c,'oq nur',sx+ (g.mx-sx)*0.55,sy+(g.my-sy)*0.55-14,C.ink,{align:'center'});
  },
  read:(S,P)=>{const sim=SIMS.find(s=>s.id==='dispersiya'),dv=S.dev||[],r=dv.find(x=>x[0]===660),v=dv.find(x=>x[0]===410);return[['n (qizil, 660 nm)',fmt(sim.nOf(660,P),3)],['n (binafsha, 410 nm)',fmt(sim.nOf(410,P),3)],['Og‘ish δ (qizil)',r?fmt(Math.abs(r[1]),1)+'°':'to‘liq qaytish'],['Og‘ish δ (binafsha)',v?fmt(Math.abs(v[1]),1)+'°':'to‘liq qaytish']];}
});
