/* Issiqlikdan kengayish */
const KG_M=[{n:'Po‘lat',a:12e-6,col:'#8a94a6'},{n:'Mis',a:17e-6,col:'#d08a4a'},{n:'Alyuminiy',a:23e-6,col:'#c9d1db'}];
SIMS.push({id:'kengayish',cat:'mol',title:'Jismlarning issiqlikdan kengayishi',short:'ΔL = αL₀ΔT',
  sub:'Qizdirilgan jism molekulalari kuchliroq tebranib, bir-biridan biroz uzoqlashadi. Shuning uchun sterjen uzayadi, ikki xil metalldan yasalgan plastinka esa egiladi.',
  formula:`<span>Δ<i>L</i> = <i>α L</i><sub>0</sub> Δ<i>T</i></span><span class="alt">Δ<i>V</i> = <i>β V</i><sub>0</sub> Δ<i>T</i>, &nbsp;<i>β</i> ≈ 3<i>α</i></span>`,
  text:['Uzunlikning nisbiy o‘zgarishi harorat o‘zgarishiga proporsional: ΔL/L₀ = αΔT. Chiziqli kengayish koeffitsienti α metallar uchun 10⁻⁵ 1/K tartibida, ya’ni 1 m sterjen 100 K qizdirilganda taxminan 1–2 mm uzayadi. Rels va ko‘priklarda shu sababli oraliq qoldiriladi.','Bimetall plastinka ikki xil metalldan yopishtirilgan. Qizdirilganda α si katta qatlam ko‘proq uzayadi va plastinka shu qatlam tashqi tomonda qoladigan qilib egiladi. Egrilik κ ≈ 3Δα·ΔT/(2t). Termostat va dazmollar shu tamoyilda ishlaydi.'],
  legend:[['α','chiziqli kengayish koeffitsienti, 1/K'],['L₀','boshlang‘ich uzunlik, m'],['ΔT','harorat o‘zgarishi, K'],['t','bimetall qalinligi, mm']],
  tries:['Alyuminiyni tanlang: u po‘latdan deyarli ikki marta ko‘p uzayadi.','ΔT ni ikki marta oshiring: uzayish ham ikki marta ortadi (indikator strelkasi).','Bimetallni sovuting (ΔT < 0): plastinka teskari tomonga egiladi.'],
  params:[{id:'mat',label:'Sterjen materiali',choices:KG_M.map((m,i)=>[i,m.n]),val:1},{id:'L0',label:'Boshlang‘ich uzunlik',sym:'L₀',min:0.5,max:5,step:0.1,val:2,unit:'m',d:1},{id:'dT',label:'Harorat o‘zgarishi',sym:'ΔT',min:-100,max:400,step:5,val:250,unit:'K',d:0}],
  init:()=>({T:0,ph:0}),
  step(S,P,dt){S.T+=(P.dT-S.T)*Math.min(1,dt*0.9);S.ph+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const M=KG_M[P.mat],dL=M.a*P.L0*S.T,ry=H*0.26,rx=40,rw=W*0.5,mag=rw/(P.L0*1000)*1000*0.004;S.g={ry,rx,rw};
    c.fillStyle=rgba('muted',0.4);c.fillRect(rx-24,ry-36,24,72);line(c,rx,ry-36,rx,ry+36,C.ink,2);
    const ext=dL/(23e-6*P.L0*400)*55,hot=clamp(S.T/400,-0.25,1);c.fillStyle=M.col;rrect(c,rx,ry-12,rw+ext,24,4);c.fill();
    if(hot>0){const g=c.createLinearGradient(rx,0,rx+rw,0);g.addColorStop(0,`rgba(255,90,40,${hot*0.15})`);g.addColorStop(1,`rgba(255,90,40,${hot*0.6})`);c.fillStyle=g;rrect(c,rx,ry-12,rw+ext,24,4);c.fill();}
    for(let i=0;i<7;i++){const fx=rx+rw*(0.15+i*0.12),f=hot>0?hot:0;if(f>0.02){c.fillStyle=`rgba(255,${120+60*Math.sin(S.ph*9+i)},40,${0.55*f})`;c.beginPath();c.ellipse(fx,ry+30,7,10+5*f+3*Math.sin(S.ph*13+i*2),0,0,TAU);c.fill();}}
    if(hot<0){c.fillStyle=rgba('accent',0.25);rrect(c,rx,ry-12,rw+ext,24,4);c.fill();}
    const gx=rx+rw+ext,dx=rx+rw+70,dy=ry-40,dr=34;line(c,rx+rw,ry-30,rx+rw,ry+30,rgba('ink',0.5),1,[3,3]);line(c,gx,ry,dx-dr,ry,C.ink,2);
    disk(c,dx,dy+40,dr,C.canvas,C.ink);for(let i=0;i<20;i++){const a=i/20*TAU;line(c,dx+Math.cos(a)*(dr-6),dy+40+Math.sin(a)*(dr-6),dx+Math.cos(a)*dr,dy+40+Math.sin(a)*dr,C.ink,1);}
    const na=-Math.PI/2+dL*1000/10*TAU;line(c,dx,dy+40,dx+Math.cos(na)*(dr-8),dy+40+Math.sin(na)*(dr-8),C.red,2.5);disk(c,dx,dy+40,3,C.ink);txt(c,'1 ayl. = 10 mm',dx,dy+40+dr+14,C.muted,{align:'center',font:SMALL});
    txt(c,'ΔL = '+fmt(dL*1000,2)+' mm  (uzayish kattalashtirib ko‘rsatilgan)',rx,ry-52,C.ink,{});
    const by=H*0.62,bx=rx,bl=Math.min(W*0.5,300),t=0.001,da=23e-6-12e-6,kap=1.5*da*S.T/t,Lb=0.1,pxm=bl/Lb,vis=kap*1;
    c.fillStyle=rgba('muted',0.4);c.fillRect(bx-20,by-40,20,80);
    const pts=[];for(let i=0;i<=40;i++){const s=i/40*Lb;let x,y;if(Math.abs(vis)<1e-6){x=s;y=0;}else{const R=1/vis;x=R*Math.sin(s/R);y=R*(1-Math.cos(s/R));}pts.push([bx+x*pxm,by-y*pxm]);}
    [[-4,KG_M[2].col,'Al'],[4,KG_M[0].col,'Po‘lat']].forEach(([o,col])=>{c.strokeStyle=col;c.lineWidth=7;c.beginPath();pts.forEach(([x,y],i)=>{const j=Math.min(i,39),q=pts[j+1]||pts[j],p0=pts[j],dx2=q[0]-p0[0],dy2=q[1]-p0[1],l=Math.hypot(dx2,dy2)||1,nx=dy2/l,ny=-dx2/l;i?c.lineTo(x+nx*o,y+ny*o):c.moveTo(x+nx*o,y+ny*o);});c.stroke();});
    line(c,bx,by,bx+bl,by,rgba('ink',0.3),1,[4,4]);const tip=pts[40];txt(c,'Bimetall (Al + po‘lat): uchining siljishi '+fmt((by-tip[1])/pxm*1000,1)+' mm',bx,by+56,C.ink,{font:SMALL});
    txt(c,'Po‘lat',bx+bl+14,tip[1]-8,C.muted,{font:SMALL});txt(c,'Al',bx+bl+14,tip[1]+10,C.muted,{font:SMALL});
    const tx=W-50,tt=H*0.12,tb=H*0.86,f=clamp((S.T+100)/500,0,1);c.strokeStyle=C.ink;c.lineWidth=2;rrect(c,tx-8,tt,16,tb-tt,8);c.stroke();disk(c,tx,tb+8,13,C.red,C.ink);c.fillStyle=C.red;c.fillRect(tx-4,tb-(tb-tt-10)*f,8,(tb-tt-10)*f+4);txt(c,'ΔT = '+fmt(S.T,0)+' K',tx,tt-10,C.ink,{align:'center',font:SMALL});void mag;
  },
  read(S,P){const M=KG_M[P.mat],dL=M.a*P.L0*S.T;return[['α ('+M.n+')',fmt(M.a*1e6,0)+'·10⁻⁶ 1/K'],['Uzayish ΔL',fmt(dL*1000,2)+' mm'],['Yangi uzunlik',fmt(P.L0+dL,5)+' m'],['Hajm nisbiy o‘zgarishi',fmt(3*M.a*S.T*100,3)+' %']];}
});
