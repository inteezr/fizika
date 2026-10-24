/* 4. Impulsning saqlanishi */
function colInit(P){return{x1:4.5,x2:15.5,v1:P.v1,v2:P.v2,hit:false,t:0,flash:0,fx:0};}
SIMS.push({id:'impuls',cat:'saq',title:'Impulsning saqlanish qonuni',short:'m₁v₁ + m₂v₂ = const',
  sub:'Yopiq sistemada to‘qnashuvdan oldingi va keyingi umumiy impuls bir xil.',
  formula:`<span><i>m</i><sub>1</sub><i>v</i><sub>1</sub> + <i>m</i><sub>2</sub><i>v</i><sub>2</sub> = <i>m</i><sub>1</sub><i>v</i><sub>1</sub>′ + <i>m</i><sub>2</sub><i>v</i><sub>2</sub>′</span><span class="alt"><i>p</i> = <i>mv</i></span>`,
  text:['Ikki aravacha to‘qnashganda bir-biriga teng va qarama-qarshi kuch bilan ta’sir qiladi (Nyutonning uchinchi qonuni). Shuning uchun biri yo‘qotgan impulsni ikkinchisi oladi va umumiy impuls o‘zgarmaydi.','Tiklanish koeffitsienti e = 1 bo‘lsa, to‘qnashuv elastik: kinetik energiya ham saqlanadi. e = 0 bo‘lsa, aravachalar yopishib, birga harakatlanadi va energiyaning bir qismi issiqlikka aylanadi. Pastdagi ustunlar impulslarni ko‘rsatadi.'],
  legend:[['m₁, m₂','aravachalar massasi, kg'],['v₁, v₂','to‘qnashuvdan oldingi tezliklar, m/s (minus — chapga)'],['v′','to‘qnashuvdan keyingi tezlik'],['e','tiklanish koeffitsienti']],
  tries:['m₁ = m₂ va e = 1 qiling: aravachalar tezliklarini almashtiradi.','e = 0 qiling: umumiy impuls saqlanadi, kinetik energiya esa kamayadi.','Og‘ir aravachani yengiliga uring: yengil aravacha katta tezlik bilan uchib ketadi.'],
  params:[{id:'m1',label:'1-aravacha massasi',sym:'m₁',min:1,max:10,step:0.5,val:4,unit:'kg',d:1,reset:1},{id:'m2',label:'2-aravacha massasi',sym:'m₂',min:1,max:10,step:0.5,val:2,unit:'kg',d:1,reset:1},{id:'v1',label:'1-aravacha tezligi',sym:'v₁',min:0,max:6,step:0.1,val:3,unit:'m/s',d:1,reset:1},{id:'v2',label:'2-aravacha tezligi',sym:'v₂',min:-6,max:0,step:0.1,val:-1.5,unit:'m/s',d:1,reset:1},{id:'e',label:'Tiklanish koeffitsienti',sym:'e',min:0,max:1,step:0.05,val:1,unit:'',d:2,reset:1}],
  init:colInit,
  step(S,P,dt){S.t+=dt;S.flash=Math.max(0,S.flash-dt);const sc=S.sc||30,h1=(30+P.m1*4)/2/sc,h2=(30+P.m2*4)/2/sc;
    S.x1+=S.v1*dt;S.x2+=S.v2*dt;
    if(!S.hit&&S.x2-S.x1<=h1+h2&&S.v1>S.v2){const p=P.m1*S.v1+P.m2*S.v2,M=P.m1+P.m2,u1=(p+P.m2*P.e*(S.v2-S.v1))/M,u2=(p+P.m1*P.e*(S.v1-S.v2))/M;
      const ov=h1+h2-(S.x2-S.x1);S.x1-=ov/2;S.x2+=ov/2;S.v1=u1;S.v2=u2;S.hit=true;S.flash=0.35;S.fx=S.x1+h1;}
    const out=x=>x<-3||x>23;if((S.t>2&&out(S.x1)&&out(S.x2))||S.t>16)Object.assign(S,colInit(P));},
  draw(c,W,H,S,P){grid(c,W,H,28);const sc=(W-40)/20;S.sc=sc;const x0=20,ty=H*0.5;
    line(c,0,ty,W,ty,C.ink,2);
    const cart=(x,m,col,lab,v)=>{const w=30+m*4,h=34,cx=x0+x*sc;c.fillStyle=col;rrect(c,cx-w/2,ty-h-8,w,h,5);c.fill();disk(c,cx-w/3,ty-5,5,C.ink);disk(c,cx+w/3,ty-5,5,C.ink);
      txt(c,lab,cx,ty-h/2-8,C.onaccent,{align:'center'});if(Math.abs(v)>0.02)arrow(c,cx,ty-h-22,cx+v*16,ty-h-22,col,2.5);txt(c,fmt(v,1)+' m/s',cx,ty-h-40,col,{align:'center'});};
    cart(S.x1,P.m1,C.accent,fmt(P.m1,1).replace(',0','')+' kg',S.v1);cart(S.x2,P.m2,C.warm,fmt(P.m2,1).replace(',0','')+' kg',S.v2);
    if(S.flash>0){c.strokeStyle=rgba('red',S.flash*2.5);c.lineWidth=3;c.beginPath();c.arc(x0+S.fx*sc,ty-25,(0.35-S.flash)*120+8,0,TAU);c.stroke();}
    const p1=P.m1*S.v1,p2=P.m2*S.v2,pmax=Math.max(Math.abs(P.m1*P.v1),Math.abs(P.m2*P.v2),Math.abs(p1),Math.abs(p2),1),bs=(W*0.36)/pmax,zx=W/2;
    const rows=[['p₁',p1,C.accent],['p₂',p2,C.warm],['Σp',p1+p2,C.ink]],by=H*0.66;
    line(c,zx,by-6,zx,by+rows.length*24,C.muted,1);
    rows.forEach((r,i)=>{const y=by+i*24;c.fillStyle=r[2];c.fillRect(Math.min(zx,zx+r[1]*bs),y,Math.abs(r[1]*bs),14);txt(c,r[0],zx-W*0.38-10,y+7,r[2],{align:'right',font:MATH});txt(c,fmt(r[1],1)+' kg·m/s',W-14,y+7,r[2],{align:'right'});});
  },
  read:(S,P)=>{const p0=P.m1*P.v1+P.m2*P.v2,p=P.m1*S.v1+P.m2*S.v2,E0=(P.m1*P.v1**2+P.m2*P.v2**2)/2,E=(P.m1*S.v1**2+P.m2*S.v2**2)/2;
    return[['Impuls (oldin)',fmt(p0)+' kg·m/s'],['Impuls (hozir)',fmt(p)+' kg·m/s'],['Kinetik energiya (oldin)',fmt(E0)+' J'],['Kinetik energiya (hozir)',fmt(E)+' J']];}
});
