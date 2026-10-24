/* Atmosfera bosimi va balandlik */
SIMS.push({id:'atmosfera',cat:'sta',title:'Atmosfera bosimi va balandlik',short:'p = p₀e^(−h/H)',
  sub:'Havo o‘z og‘irligi bilan Yer sirtiga bosadi. Yuqoriga ko‘tarilgan sari ustimizdagi havo qatlami yupqalashadi va bosim taxminan har 5,8 km da ikki marta kamayadi.',
  formula:`<span><i>p</i> = <i>p</i><sub>0</sub> e<sup>−<i>h</i>/<i>H</i></sup></span><span class="alt"><i>p</i><sub>0</sub> = <i>ρ</i><sub>Hg</sub><i>g</i>·760 mm ≈ 101,3 kPa, &nbsp;<i>H</i> ≈ 8,4 km</span>`,
  text:['Torrichelli tajribasida bir uchi berk naychadagi simob ustuni dengiz sathida 760 mm balandlikda to‘xtaydi: uning bosimi atmosfera bosimiga teng. Barometr shu tamoyilda ishlaydi.','Havo siqiluvchan, shuning uchun pastki qatlamlari zichroq. Harorat o‘zgarmas deb olsak, bosim balandlik bilan eksponensial kamayadi (barometrik formula). H ≈ 8,4 km — atmosferaning “xarakterli balandligi”. Haqiqiy atmosferada harorat ham o‘zgaradi, shuning uchun bu taqribiy model.'],
  legend:[['p₀','dengiz sathidagi bosim, kPa'],['h','balandlik, km'],['H','xarakterli balandlik, km'],['ρ','havo zichligi']],
  tries:['Balandlikni 5,8 km ga qo‘ying: bosim va simob ustuni taxminan ikki marta kamayadi.','Everest cho‘qqisida (8,85 km) bosim qancha ekanini toping.','Yuqorida havo molekulalari siyrakligiga e’tibor bering: zichlik ham shu qonun bo‘yicha kamayadi.'],
  params:[{id:'h',label:'Balandlik',sym:'h',min:0,max:16,step:0.1,val:3,unit:'km',d:1}],
  init:()=>{const pts=[];for(let i=0;i<420;i++){const y=-Math.log(1-Math.random()*0.86)*8.4;pts.push({x:Math.random(),y,vx:(Math.random()-0.5)*0.05});}return{h:0,pts};},
  step(S,P,dt){S.h+=(P.h-S.h)*Math.min(1,dt*2.2);S.pts.forEach(p=>{p.x+=p.vx*dt;if(p.x<0)p.x+=1;if(p.x>1)p.x-=1;});},
  draw(c,W,H,S,P){const top=16,bot=H-26,hm=16.5,Y=h=>bot-h/hm*(bot-top),aw=W*0.44;S.g={aw,top,bot,hm};
    const gr=c.createLinearGradient(0,top,0,bot);gr.addColorStop(0,rgba('accent',0.02));gr.addColorStop(1,rgba('accent',0.22));c.fillStyle=gr;c.fillRect(0,0,aw,H);
    S.pts.forEach(p=>{if(p.y<hm)disk(c,p.x*aw,Y(p.y),1.6,rgba('ink',0.45));});
    c.fillStyle=rgba('muted',0.45);c.beginPath();c.moveTo(0,bot);[[0,0],[0.18,0.3],[0.3,4],[0.42,2.5],[0.55,8.85],[0.68,3],[0.8,1],[1,0]].forEach(([x,h])=>c.lineTo(x*aw,Y(h)));c.closePath();c.fill();
    txt(c,'Everest 8,85 km',0.55*aw,Y(8.85)-10,C.muted,{align:'center',font:SMALL});
    for(let h=0;h<=16;h+=2){line(c,aw,Y(h),aw+6,Y(h),C.ink,1);txt(c,h+'',aw+9,Y(h),C.muted,{font:SMALL});}txt(c,'km',aw+9,top-4,C.muted,{font:SMALL});
    const by=Y(S.h),bx=aw*0.82;line(c,bx,by+18,bx,by+30,C.ink,1);c.fillStyle=C.warm;c.beginPath();c.ellipse(bx,by,13,17,0,0,TAU);c.fill();c.fillStyle=C.ink;c.fillRect(bx-5,by+30,10,7);
    line(c,0,by,aw,by,rgba('warm',0.6),1,[4,4]);
    const p=101.325*Math.exp(-S.h/8.4),mm=760*p/101.325;
    const gx=aw+44,gw=W*0.3,gb=bot,gt=top+8,X=pp=>gx+pp/105*gw;line(c,gx,gb,gx+gw,gb,C.ink,1.2);line(c,gx,gb,gx,gt,C.ink,1.2);txt(c,'p, kPa',gx+gw,gb-12,C.muted,{align:'right',font:SMALL});
    c.strokeStyle=C.accent;c.lineWidth=2.5;c.beginPath();for(let h=0;h<=hm;h+=0.2){const x=X(101.325*Math.exp(-h/8.4));h?c.lineTo(x,Y(h)):c.moveTo(x,Y(h));}c.stroke();disk(c,X(p),by,6,C.red);
    [0,50,100].forEach(v=>txt(c,v+'',X(v),gb+14,C.muted,{align:'center',font:SMALL}));
    const tx=W-46,tw=16,tb=bot-24,mmS=(tb-top-30)/800,tt=tb-800*mmS;
    c.fillStyle=rgba('muted',0.3);c.fillRect(tx-34,tb,68+0,16);c.fillStyle='#b9c2cf';c.fillRect(tx-30,tb-6,60,12);
    c.fillStyle='#b9c2cf';c.fillRect(tx-tw/2,tb-mm*mmS,tw,mm*mmS);c.strokeStyle=C.ink;c.lineWidth=2;c.strokeRect(tx-tw/2,tt,tw,tb-tt);
    txt(c,fmt(mm,0)+' mm',tx-14,tb-mm*mmS,C.ink,{align:'right',font:SMALL});txt(c,'vakuum',tx-14,tt+10,C.muted,{align:'right',font:SMALL});
  },
  read(S,P){const p=101.325*Math.exp(-S.h/8.4);return[['Bosim p',fmt(p,1)+' kPa'],['Simob ustuni',fmt(760*p/101.325,0)+' mm'],['p / p₀ (zichlik nisbati)',fmt(p/101.325,3)],['Bosim yarmiga tushadigan balandlik',fmt(8.4*Math.LN2,2)+' km']];}
});
