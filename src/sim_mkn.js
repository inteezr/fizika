/* Molekulalar harakati: Maksvell taqsimoti va Broun harakati */
const GASM={4:'Geliy (He)',28:'Azot (N₂)',44:'Karbonat angidrid (CO₂)'};
function mknInit(P){const N=140,s=Math.sqrt(P.T/300)*Math.sqrt(28/P.M);const ps=[];for(let i=0;i<N;i++){const g=()=>{let u=0;for(let k=0;k<6;k++)u+=Math.random();return(u-3)/Math.sqrt(0.5);};ps.push({x:Math.random(),y:Math.random(),vx:g()*0.25*s,vy:g()*0.25*s});}return{ps,b:{x:0.5,y:0.5,vx:0,vy:0},tr:[[0.5,0.5]],hist:new Array(24).fill(0),hn:0};}
SIMS.push({id:'mkn',cat:'mol',title:'Molekulalar harakati va Broun harakati',short:'v̄ = √(3kT/m₀)',
  sub:'Gaz molekulalari tartibsiz harakatlanadi va turli tezliklarga ega. Ularning o‘rtacha kvadratik tezligi faqat harorat va molekula massasiga bog‘liq.',
  formula:`<span><i>v̄</i><sub>kv</sub> = ${sq(fr('3<i>kT</i>','<i>m</i><sub>0</sub>'))}</span><span class="alt"><i>Ē</i><sub>k</sub> = ${fr('3','2')}<i>kT</i></span>`,
  text:['Idishda yuzlab molekula bir-biriga va devorlarga urilib harakatlanadi. Pastdagi gistogramma ularning tezliklar bo‘yicha taqsimotini ko‘rsatadi — bu Maksvell taqsimoti. Harorat ortsa, egri chiziq o‘ngga suriladi va yoyiladi.','Katta sariq zarra — Broun zarrasi. U molekulalar zarbalaridan tartibsiz, siniq chiziq bo‘ylab siljiydi. Broun harakati molekulalar mavjudligining birinchi ko‘rgazmali isboti bo‘lgan.'],
  legend:[['T','mutlaq harorat, K'],['k','Bolsman doimiysi, 1,38·10⁻²³ J/K'],['m₀','molekula massasi'],['v̄','o‘rtacha kvadratik tezlik']],
  tries:['Haroratni 4 marta oshiring: o‘rtacha tezlik 2 marta ortadi.','Gazni geliyga almashtiring: yengil molekulalar ancha tez.','Broun zarrasi izining qanchalik tartibsizligini kuzating.'],
  params:[{id:'T',label:'Harorat',sym:'T',min:100,max:1200,step:10,val:300,unit:'K',d:0,reset:1},{id:'M',label:'Gaz',choices:[[4,'He'],[28,'N₂'],[44,'CO₂']],val:28,reset:1}],
  init:mknInit,
  step(S,P,dt){const B=S.b,rb=0.045,mb=40;S.ps.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<0){p.x=-p.x;p.vx*=-1;}if(p.x>1){p.x=2-p.x;p.vx*=-1;}if(p.y<0){p.y=-p.y;p.vy*=-1;}if(p.y>1){p.y=2-p.y;p.vy*=-1;}
      const dx=p.x-B.x,dy=p.y-B.y,d=Math.hypot(dx,dy);if(d<rb&&d>0){const nx=dx/d,ny=dy/d,rv=(p.vx-B.vx)*nx+(p.vy-B.vy)*ny;if(rv<0){const j=2*rv/(1+1/mb);p.vx-=j*nx;p.vy-=j*ny;B.vx+=j*nx/mb;B.vy+=j*ny/mb;}}});
    B.x+=B.vx*dt;B.y+=B.vy*dt;if(B.x<rb||B.x>1-rb)B.vx*=-1;if(B.y<rb||B.y>1-rb)B.vy*=-1;B.x=clamp(B.x,rb,1-rb);B.y=clamp(B.y,rb,1-rb);const l=S.tr[S.tr.length-1];if(Math.hypot(l[0]-B.x,l[1]-B.y)>0.006){S.tr.push([B.x,B.y]);if(S.tr.length>400)S.tr.shift();}
    const vm=1.2*Math.sqrt(1200/300)*Math.sqrt(28/4)*0.25*0.5;S.ps.forEach(p=>{const v=Math.hypot(p.vx,p.vy),i=Math.floor(v/(0.25*3.2*Math.sqrt(P.T/300)*Math.sqrt(28/P.M))*24);if(i<24)S.hist[i]+=1;});S.hn+=S.ps.length;if(S.hn>140*240){S.hist=S.hist.map(h=>h*0.5);S.hn*=0.5;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const bw=Math.min(W*0.5,H*0.8),bx=20,by=(H-bw)/2,X=x=>bx+x*bw,Y=y=>by+y*bw,vs=Math.sqrt(P.T/300)*Math.sqrt(28/P.M);S.g={bx,by,bw};
    c.strokeStyle=C.ink;c.lineWidth=2.5;c.strokeRect(bx,by,bw,bw);c.strokeStyle=rgba('warm',0.5);c.lineWidth=1.2;c.beginPath();S.tr.forEach(([x,y],i)=>i?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y)));c.stroke();
    S.ps.forEach(p=>{const v=Math.hypot(p.vx,p.vy)/(0.25*vs);disk(c,X(p.x),Y(p.y),2.8,v>1.6?C.red:v>0.8?C.accent:C.violet);});disk(c,X(S.b.x),Y(S.b.y),bw*0.045,C.warm);
    const gx=bx+bw+40,gr=W-16,gt=H*0.2,gb=H*0.8,mx=Math.max(...S.hist,1),bwid=(gr-gx)/24;line(c,gx,gb,gr,gb,C.ink,1.5);txt(c,'molekulalar soni',gx,gt-10,C.muted,{font:SMALL});txt(c,'tezlik',gr,gb+14,C.muted,{align:'right',font:SMALL});
    S.hist.forEach((h,i)=>{const hh=h/mx*(gb-gt);c.fillStyle=rgba('accent',0.55);c.fillRect(gx+i*bwid+1,gb-hh,bwid-2,hh);});
    c.strokeStyle=C.red;c.lineWidth=2.5;c.beginPath();let mxf=0;const f=u=>u*Math.exp(-u*u/2);for(let i=0;i<=60;i++)mxf=Math.max(mxf,f(i/60*3.2));for(let i=0;i<=60;i++){const u=i/60*3.2;c.lineTo(gx+i/60*(gr-gx),gb-f(u)/mxf*(gb-gt));}c.stroke();
  },
  read:(S,P)=>{const m0=P.M*1.66e-27,v=Math.sqrt(3*1.38e-23*P.T/m0);return[['O‘rtacha kvadratik tezlik',fmt(v,0)+' m/s'],['O‘rtacha kinetik energiya',fmt(1.5*1.38e-23*P.T*1e21,2)+'·10⁻²¹ J'],['Gaz',GASM[P.M]],['Harorat',fmt(P.T-273,0)+' °C']];}
});
