/* G‘ildirakning dumalashi */
SIMS.push({id:'gildirak',cat:'kin',title:'G‘ildirakning sirpanmasdan dumalashi',short:'v = ωR',
  sub:'Sirpanmasdan dumalayotgan g‘ildirakning yerga tegib turgan nuqtasi shu onda tinch turadi, eng yuqori nuqtasi esa markazdan ikki marta tez harakatlanadi.',
  formula:`<span><i>v</i> = <i>ωR</i></span><span class="alt"><i>v</i><sub>yuqori</sub> = 2<i>v</i>, &nbsp;<i>v</i><sub>pastki</sub> = 0</span>`,
  text:['G‘ildirak bir vaqtda ikki harakatda qatnashadi: markazi bilan birga ilgarilanma siljiydi va markaz atrofida aylanadi. Sirpanish bo‘lmasa, gardishdagi nuqtaning aylanma tezligi ωR markaz tezligi v ga teng bo‘ladi.','Shuning uchun har bir onda g‘ildirak yerga tekkan nuqta atrofida aylanayotgandek bo‘ladi: nuqtaning tezligi shu nuqtagacha bo‘lgan masofaga proporsional va unga perpendikulyar. Gardishdagi belgi sikloida chizadi.'],
  legend:[['v','markaz tezligi, m/s'],['ω','burchak tezlik, rad/s'],['R','g‘ildirak radiusi, m']],
  tries:['Eng yuqori nuqtadagi strelka markaznikidan ikki marta uzun ekaniga e’tibor bering.','Radiusni kattalashtiring: shu tezlikda burchak tezlik kamayadi.','Sikloidaning har bir “yoyi” bir to‘liq aylanishga, ya’ni 2πR yo‘lga mos keladi.'],
  params:[{id:'v',label:'Markaz tezligi',sym:'v',min:0.5,max:4,step:0.1,val:2,unit:'m/s',d:1},{id:'R',label:'Radius',sym:'R',min:0.3,max:1,step:0.05,val:0.6,unit:'m',d:2,reset:1}],
  init:()=>({x:0.8,ph:0,tr:[]}),
  step(S,P,dt){S.x+=P.v*dt;S.ph+=P.v/P.R*dt;if(S.x>S.Lm-P.R){S.x=P.R+0.2;S.tr=[];}const px=S.x-P.R*Math.sin(S.ph),py=P.R-P.R*Math.cos(S.ph);S.tr.push([px,py]);if(S.tr.length>900)S.tr.shift();},
  draw(c,W,H,S,P){grid(c,W,H,28);const gy=H*0.78,sc=Math.min((H*0.62)/(2*P.R+0.4),W/7),X=x=>20+x*sc,Y=y=>gy-y*sc;S.Lm=(W-40)/sc;S.g={gy,sc};
    line(c,0,gy,W,gy,C.ink,2);for(let x=0;x<W;x+=14)line(c,x,gy,x-8,gy+8,rgba('muted',0.5),1);
    c.strokeStyle=rgba('warm',0.6);c.lineWidth=2;c.beginPath();S.tr.forEach(([x,y],i)=>i?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y)));c.stroke();
    const cx=X(S.x),cy=Y(P.R),r=P.R*sc;disk(c,cx,cy,r,rgba('muted',0.18),C.ink);c.lineWidth=1;for(let i=0;i<8;i++){const a=S.ph+i*Math.PI/4;line(c,cx,cy,cx-Math.sin(a)*r,cy+Math.cos(a)*r,rgba('ink',0.35),1.5);}
    const k=34/P.v;const pts=[0,Math.PI/2,Math.PI,3*Math.PI/2].map(a=>a);
    pts.forEach(a=>{const px=cx+Math.sin(a)*r,py=cy+Math.cos(a)*r,dx=px-cx,dy=py-(cy+r);const vx=-(dy/r)*P.v,vy=(dx/r)*P.v;if(Math.hypot(vx,vy)>0.05)arrow(c,px,py,px+vx*k*0.9,py+vy*k*0.9,C.green,2.5);disk(c,px,py,4,C.green);});
    const mx=cx-Math.sin(S.ph)*r,my=cy+Math.cos(S.ph)*r;disk(c,mx,my,7,C.red);disk(c,cx,cy,5,C.ink);arrow(c,cx,cy,cx+P.v*k*0.9,cy,C.accent,3,'v');
    line(c,cx,cy+r,cx,cy-r,rgba('ink',0.25),1,[3,4]);txt(c,'tegish nuqtasi: v = 0',cx,gy+20,C.muted,{align:'center',font:SMALL});txt(c,'2v',cx,cy-r-14,C.green,{align:'center',font:MATH});
  },
  read:(S,P)=>[['Burchak tezlik ω',fmt(P.v/P.R,2)+' rad/s'],['Aylanish chastotasi',fmt(P.v/(TAU*P.R),2)+' ayl/s'],['Eng yuqori nuqta tezligi',fmt(2*P.v,1)+' m/s'],['Bir aylanishdagi yo‘l',fmt(TAU*P.R,2)+' m']]
});
