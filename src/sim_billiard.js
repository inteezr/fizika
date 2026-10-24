/* Bilyard: ikki o‘lchamli to‘qnashuvlar */
const BL={Lx:2.54,Ly:1.27,r:0.03};
function blInit(){const b=[{x:0.64,y:BL.Ly/2,vx:2.6,vy:0.03,cue:1}],d=BL.r*2.02;let k=0;for(let row=0;row<3;row++)for(let j=0;j<=row;j++){b.push({x:1.8+row*d*0.866,y:BL.Ly/2+(j-row/2)*d,vx:0,vy:0,n:++k});}return{b,idle:0,user:false,aim:null,hits:0,last:null,flash:[]};}
SIMS.push({id:'billiard',cat:'saq',title:'Bilyard: tekislikdagi to‘qnashuvlar',short:'Σp⃗ = const',
  sub:'Sharlar urilganda impuls vektori saqlanadi. Teng massali sharlar elastik urilib, to‘g‘ri chiziqda bo‘lmasa, to‘qnashuvdan keyin taxminan to‘g‘ri burchak ostida tarqaladi.',
  formula:`<span><i>m</i><b>v</b><sub>1</sub> + <i>m</i><b>v</b><sub>2</sub> = <i>m</i><b>v</b><sub>1</sub>′ + <i>m</i><b>v</b><sub>2</sub>′</span><span class="alt"><i>e</i> = ${fr('<i>v</i>′<sub>nisbiy</sub>','<i>v</i><sub>nisbiy</sub>')}</span>`,
  text:['To‘qnashuv onida sharlar markazlarini tutashtiruvchi chiziq bo‘ylab bir-biriga teng va qarama-qarshi zarba beradi. Shu chiziqqa tik yo‘nalishdagi tezliklar o‘zgarmaydi, chiziq bo‘ylab esa impuls almashinadi. Natijada ikkala sharning umumiy impuls vektori saqlanadi.','Tiklanish koeffitsienti e = 1 bo‘lsa, kinetik energiya ham saqlanadi va teng massali sharlar 90° burchak ostida tarqaladi. e < 1 da energiyaning bir qismi issiqlik va tovushga aylanadi. Stol bilan ishqalanish sharlarni asta-sekin to‘xtatadi.'],
  legend:[['p⃗','impuls vektori, kg·m/s'],['e','tiklanish koeffitsienti'],['μ','dumalashdagi ishqalanish koeffitsienti']],
  tries:['Oq sharni bosib, orqaga torting va qo‘yib yuboring: zarba yo‘nalishi va kuchi shunday tanlanadi.','Pastdagi jadvalda oxirgi to‘qnashuvdan oldingi va keyingi impuls tengligini kuzating.','e ni 0,6 ga tushiring: to‘qnashuvda kinetik energiya kamayadi, impuls esa saqlanadi.'],
  hint:'Oq sharni torting va qo‘yib yuboring',
  params:[{id:'e',label:'Tiklanish koeffitsienti',sym:'e',min:0.5,max:1,step:0.01,val:0.96,d:2},{id:'mu',label:'Ishqalanish',sym:'μ',min:0,max:0.05,step:0.002,val:0.018,d:3}],
  init:blInit,
  step(S,P,dt){const n=8,h=dt/n,r=BL.r,m=0.17;for(let it=0;it<n;it++){
      S.b.forEach(o=>{const sp=Math.hypot(o.vx,o.vy);if(sp>0){const dv=P.mu*9.8*h;if(sp<=dv){o.vx=o.vy=0;}else{o.vx-=o.vx/sp*dv;o.vy-=o.vy/sp*dv;}}o.x+=o.vx*h;o.y+=o.vy*h;
        if(o.x<r){o.x=r;o.vx=Math.abs(o.vx)*P.e;}if(o.x>BL.Lx-r){o.x=BL.Lx-r;o.vx=-Math.abs(o.vx)*P.e;}if(o.y<r){o.y=r;o.vy=Math.abs(o.vy)*P.e;}if(o.y>BL.Ly-r){o.y=BL.Ly-r;o.vy=-Math.abs(o.vy)*P.e;}});
      for(let i=0;i<S.b.length;i++)for(let j=i+1;j<S.b.length;j++){const a=S.b[i],b=S.b[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d<2*r&&d>0){const nx=dx/d,ny=dy/d,vn=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny,ov=2*r-d;a.x-=nx*ov/2;a.y-=ny*ov/2;b.x+=nx*ov/2;b.y+=ny*ov/2;
        if(vn>0){const pb=[m*(a.vx+b.vx),m*(a.vy+b.vy)],Eb=m*(a.vx**2+a.vy**2+b.vx**2+b.vy**2)/2,J=(1+P.e)/2*vn;a.vx-=J*nx;a.vy-=J*ny;b.vx+=J*nx;b.vy+=J*ny;
          const pa=[m*(a.vx+b.vx),m*(a.vy+b.vy)],Ea=m*(a.vx**2+a.vy**2+b.vx**2+b.vy**2)/2;S.hits++;if(vn>0.05)S.last={pb:Math.hypot(...pb),pa:Math.hypot(...pa),Eb,Ea};S.flash.push({x:a.x+nx*r,y:a.y+ny*r,t:0.3});}}}}
    S.flash.forEach(f=>f.t-=dt);S.flash=S.flash.filter(f=>f.t>0);
    const moving=S.b.some(o=>o.vx||o.vy);if(!moving&&!S.aim){S.idle+=dt;if(S.idle>2.5&&!S.user)Object.assign(S,blInit());}else S.idle=0;},
  draw(c,W,H,S,P){const pad=22,sc=Math.min((W-2*pad)/BL.Lx,(H*0.78-2*pad)/BL.Ly),ox=(W-BL.Lx*sc)/2,oy=pad,X=x=>ox+x*sc,Y=y=>oy+y*sc;S.g={ox,oy,sc};S.sc=sc;
    c.fillStyle='#7a4a24';rrect(c,ox-14,oy-14,BL.Lx*sc+28,BL.Ly*sc+28,10);c.fill();c.fillStyle='#1f6b45';c.fillRect(ox,oy,BL.Lx*sc,BL.Ly*sc);
    line(c,X(0.64),oy,X(0.64),oy+BL.Ly*sc,'rgba(255,255,255,0.25)',1);
    const cols=['#f2c94c','#3d6fd6','#d64545','#7a3fbf','#f08a2a','#2a9d5c'];
    S.b.forEach(o=>{disk(c,X(o.x),Y(o.y),BL.r*sc,o.cue?'#f5f5f0':cols[(o.n-1)%6],'rgba(0,0,0,0.5)');if(Math.hypot(o.vx,o.vy)>0.05)arrow(c,X(o.x),Y(o.y),X(o.x+o.vx*0.12),Y(o.y+o.vy*0.12),'#ffffff',1.5);});
    S.flash.forEach(f=>{c.strokeStyle=`rgba(255,240,180,${f.t*3})`;c.lineWidth=2;c.beginPath();c.arc(X(f.x),Y(f.y),(0.3-f.t)*60+4,0,TAU);c.stroke();});
    if(S.aim){const q=S.b[0],ax=X(q.x),ay=Y(q.y);line(c,ax,ay,S.aim.x,S.aim.y,'rgba(255,255,255,0.5)',2,[4,4]);arrow(c,ax,ay,ax+(ax-S.aim.x),ay+(ay-S.aim.y),C.warm,3);}
    const m=0.17,px=S.b.reduce((s,o)=>s+m*o.vx,0),py=S.b.reduce((s,o)=>s+m*o.vy,0),E=S.b.reduce((s,o)=>s+m*(o.vx**2+o.vy**2)/2,0);
    const ty=oy+BL.Ly*sc+30;txt(c,'Σp = '+fmt(Math.hypot(px,py),3)+' kg·m/s   ΣE = '+fmt(E,3)+' J',ox,ty,C.ink,{});
    if(S.last)txt(c,'Oxirgi to‘qnashuv: p '+fmt(S.last.pb,3)+' → '+fmt(S.last.pa,3)+' ,  E '+fmt(S.last.Eb,3)+' → '+fmt(S.last.Ea,3)+' J',ox,ty+20,C.muted,{font:SMALL});
  },
  pointer(type,x,y,S,P){const sc=S.sc||100,q=S.b[0],ox=S.g.ox,oy=S.g.oy;
    if(type==='down'){if(Math.hypot(x-(ox+q.x*sc),y-(oy+q.y*sc))<30&&Math.hypot(q.vx,q.vy)<0.3){q.vx=q.vy=0;S.aim={x,y};S.user=true;return true;}return false;}
    if(!S.aim)return;if(type==='move'){S.aim={x,y};return;}
    if(type==='up'){const dx=(ox+q.x*sc)-x,dy=(oy+q.y*sc)-y,L=Math.hypot(dx,dy);if(L>6){const v=Math.min(4,L/sc*4);q.vx=dx/L*v;q.vy=dy/L*v;}S.aim=null;}},
  read(S,P){const m=0.17,px=S.b.reduce((s,o)=>s+m*o.vx,0),py=S.b.reduce((s,o)=>s+m*o.vy,0);const L=S.last;
    return[['To‘qnashuvlar soni',String(S.hits)],['Oxirgi zarbada p oldin → keyin',L?fmt(L.pb,3)+' → '+fmt(L.pa,3):'—'],['Oxirgi zarbada E saqlanishi',L&&L.Eb>0?fmt(L.Ea/L.Eb*100,1)+' %':'—'],['Hozirgi umumiy impuls',fmt(Math.hypot(px,py),3)+' kg·m/s']];}
});
