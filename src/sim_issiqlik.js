/* Issiqlik miqdori */
const MATS={4200:['Suv',100,true],2400:['Spirt',78,true],920:['Alyuminiy',300,false],460:['Temir',300,false]};
SIMS.push({id:'issiqlik',cat:'trm',title:'Isitishda olingan issiqlik miqdori',short:'Q = cmΔt',
  sub:'Jismni isitish uchun kerak bo‘lgan issiqlik uning massasi, solishtirma issiqlik sig‘imi va harorat o‘zgarishiga bog‘liq.',
  formula:`<span><i>Q</i> = <i>cm</i>Δ<i>t</i></span><span class="alt"><i>Q</i> = <i>Pτ</i> &nbsp; qaynashda: <i>Q</i> = <i>Lm</i></span>`,
  text:['Isitgich har sekundda P joul energiya beradi. Moddaning solishtirma issiqlik sig‘imi c qancha katta bo‘lsa, uni isitish shuncha qiyin: suvni isitish temirni isitishdan 9 marta ko‘p energiya talab qiladi.','Suyuqlik qaynash haroratiga yetganda harorat ko‘tarilmay qoladi: energiya bug‘lanishga sarflanadi. Grafikdagi gorizontal qism shuni ko‘rsatadi. Isitish tezlashtirib ko‘rsatiladi, haqiqiy vaqt pastda yozilgan.'],
  legend:[['Q','issiqlik miqdori, J'],['c','solishtirma issiqlik sig‘imi, J/(kg·°C)'],['m','massa, kg'],['Δt','harorat o‘zgarishi, °C'],['P','isitgich quvvati, W']],
  tries:['Bir xil massali suv va alyuminiyni solishtiring: qaysi biri tezroq isiydi?','Quvvatni 2 marta oshiring: isitish vaqti 2 marta qisqaradi.','Spirtni tanlang: u 78 °C da qaynay boshlaydi.'],
  params:[{id:'P',label:'Isitgich quvvati',sym:'P',min:200,max:3000,step:100,val:1500,unit:'W',d:0},{id:'m',label:'Massa',sym:'m',min:0.1,max:3,step:0.1,val:1,unit:'kg',d:1,reset:1},{id:'c',label:'Modda',choices:[[4200,'Suv'],[2400,'Spirt'],[920,'Alyuminiy'],[460,'Temir']],val:4200,reset:1}],
  init:()=>({T:20,tr:0,hold:0,h:[[0,20]],bub:[]}),
  step(S,P,dt){const[name,Tm,liq]=MATS[P.c],rate=P.P/(P.c*P.m),k=(Tm-20)/rate/7;if(S.T<Tm){S.tr+=dt*k;S.T=Math.min(Tm,S.T+rate*dt*k);}else{S.tr+=dt*k;S.hold+=dt;if(S.hold>3){Object.assign(S,{T:20,tr:0,hold:0,h:[[0,20]],bub:[]});return;}}
    if(!S.h.length||S.tr-S.h[S.h.length-1][0]>k*0.05)S.h.push([S.tr,S.T]);if(liq&&S.T>=Tm-0.01&&Math.random()<0.6)S.bub.push({x:Math.random(),y:1,v:0.4+Math.random()*0.6});S.bub.forEach(b=>b.y-=b.v*dt);S.bub=S.bub.filter(b=>b.y>0);},
  draw(c,W,H,S,P){grid(c,W,H,28);const[name,Tm,liq]=MATS[P.c],px=W*0.08,pw=Math.min(W*0.3,200),pb=H*0.74,ph=H*0.4,pt=pb-ph;
    c.fillStyle=C.ink;c.fillRect(px-10,pb+16,pw+20,12);const fl=P.P/3000;for(let i=0;i<7;i++){const x=px+pw*(i+0.5)/7,hh=10+fl*30*(0.7+0.3*Math.sin(performance.now()/90+i*2));c.fillStyle=`rgba(240,120,40,${0.5+fl*0.4})`;c.beginPath();c.moveTo(x-6,pb+16);c.quadraticCurveTo(x,pb+16-hh*1.4,x+6,pb+16);c.fill();}
    const heat=(S.T-20)/280;
    if(liq){c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(px,pt);c.lineTo(px,pb);c.lineTo(px+pw,pb);c.lineTo(px+pw,pt);c.stroke();const lh=ph*Math.min(0.85,0.35+P.m*0.17);c.fillStyle=rgba(P.c===4200?'water':'violet',0.4);c.fillRect(px+2,pb-lh,pw-4,lh-2);
      c.fillStyle=rgba('canvas',0.8);S.bub.forEach(b=>{disk(c,px+6+b.x*(pw-12),pb-lh*(1-b.y),3,rgba('canvas',0.9),C.water);});if(S.T>=Tm-0.01)txt(c,'qaynamoqda',px+pw/2,pt-12,C.red,{align:'center'});}
    else{const bs=Math.min(pw*0.7,40+P.m*30),bx=px+(pw-bs)/2;c.fillStyle=`rgb(${120+heat*135|0},${120-heat*60|0},${125-heat*90|0})`;rrect(c,bx,pb-bs,bs,bs,4);c.fill();txt(c,name,bx+bs/2,pb-bs-12,C.muted,{align:'center'});}
    const tx=px+pw+46,tb=pb,th=ph+40,tf=(S.T-0)/(Tm>100?320:110);c.strokeStyle=C.ink;c.lineWidth=1.5;rrect(c,tx-6,tb-th,12,th,6);c.stroke();disk(c,tx,tb+8,10,C.red);c.fillStyle=C.red;c.fillRect(tx-3,tb-th*tf,6,th*tf+2);
    txt(c,fmt(S.T,1)+' °C',tx+14,tb-th*tf,C.red,{font:'600 13px "IBM Plex Mono", monospace'});
    const gx=W*0.6,gr=W-20,gt=H*0.12,gb=H*0.82,tmax=Tm>100?320:110,trMax=(Tm-20)/(P.P/(P.c*P.m))*1.45;line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'t, °C',gx+4,gt-8,C.muted);txt(c,'vaqt, s',gr,gb+14,C.muted,{align:'right'});
    [0,50,100,200,300].filter(v=>v<=tmax).forEach(v=>txt(c,v+'',gx-6,gb-v/tmax*(gb-gt),C.muted,{align:'right',font:SMALL}));txt(c,fmt(trMax,0),gr,gb+28,C.muted,{align:'right',font:SMALL});
    c.strokeStyle=C.red;c.lineWidth=2.5;c.beginPath();S.h.forEach(([t,T],i)=>{const x=gx+t/trMax*(gr-gx),y=gb-T/tmax*(gb-gt);i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();
  },
  read:(S,P)=>{const[name,Tm]=MATS[P.c];return[['Harorat t',fmt(S.T,1)+' °C'],['Olingan issiqlik Q',fmt(P.c*P.m*(S.T-20)/1000,1)+' kJ'],['Haqiqiy vaqt',fmt(S.tr,0)+' s'],['Solishtirma issiqlik sig‘imi',P.c+' J/(kg·°C)']];}
});
