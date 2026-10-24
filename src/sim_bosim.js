/* Gidrostatik bosim va Torrichelli */
function bInit(){return{holes:[{d:0.25},{d:0.5},{d:0.8}],drops:[],probe:{xf:0.45,d:0.6},sel:null,drag:null,acc:0,g:{}};}
SIMS.push({id:'bosim',cat:'sta',title:'Suyuqlikning gidrostatik bosimi',short:'p = ρgh',sandbox:1,
  sub:'Suyuqlik bosimi chuqurlikka chiziqli bog‘liq; teshikdan otilib chiqqan oqim tezligi ham chuqurlikka bog‘liq.',
  formula:`<span><i>p</i> = <i>p</i><sub>0</sub> + <i>ρgh</i></span><span class="alt"><i>v</i> = ${sq('2<i>gh</i>')} &nbsp; (Torrichelli)</span>`,
  text:['Suyuqlikning har bir qatlami ustidagi qatlamlar og‘irligini ko‘taradi, shuning uchun chuqurlashgan sari bosim ortadi. Bosim o‘lchagichni sudrab, turli chuqurlikdagi bosimni ko‘ring.','Idish devoriga teshiklar qo‘ying («+ Teshik»): chuqurroqdagi teshikdan suv kattaroq tezlik bilan otiladi. Lekin eng uzoqqa ko‘pincha o‘rtadagi teshik otadi, chunki pastdagi oqim yerga tez yetib keladi.'],
  legend:[['p','bosim, Pa'],['p₀','atmosfera bosimi, 101,3 kPa'],['ρ','suyuqlik zichligi, kg/m³'],['h','chuqurlik, m'],['v','oqim tezligi, m/s']],
  tries:['Teshikni suyuqlik balandligining yarmiga qo‘ying: oqim eng uzoqqa boradi.','Suyuqlikni simobga almashtiring: bosim 13,6 marta ortadi, oqim tezligi esa o‘zgarmaydi!','Bosim o‘lchagichni yon tomonga suring: bir xil chuqurlikda bosim bir xil.'],
  tools:[{id:'move',label:'Surish / tanlash'},{id:'hole',label:'+ Teshik'},{id:'del',label:'Teshikni yopish'}],
  hints:{move:'Bosim o‘lchagich yoki teshikni sudrang',hole:'Idishning o‘ng devorini bosing',del:'Teshikni bosing'},
  params:[{id:'hw',label:'Suyuqlik balandligi',sym:'h',min:0.3,max:2,step:0.05,val:1.4,unit:'m',d:2},{id:'rho',label:'Suyuqlik',sym:'',choices:[[1000,'Suv'],[790,'Spirt'],[1030,'Dengiz suvi'],[13600,'Simob']],val:1000}],
  init:bInit,
  step(S,P,dt){const g=S.g;if(!g.sc)return;S.acc+=dt;const ts=0.6;while(S.acc>0.035){S.acc-=0.035;S.holes.forEach(hh=>{const h=hh.d*P.hw,v=Math.sqrt(2*9.8*h);S.drops.push({x:g.tr+2,y:g.surf+h*g.sc,vx:v*g.sc*ts,vy:0});});}
    S.drops.forEach(d=>{d.vy+=9.8*g.sc*ts*ts*dt;d.x+=d.vx*dt;d.y+=d.vy*dt;});S.drops=S.drops.filter(d=>d.y<g.gy&&d.x<g.W+10);if(S.drops.length>900)S.drops.splice(0,S.drops.length-900);},
  draw(c,W,H,S,P){grid(c,W,H,28);const gy=H-18,tt=H*0.06,sc=(gy-tt)/2.2,tl=W*0.06,tr=W*0.3,surf=gy-P.hw*sc,liq=P.rho===13600?'muted':'water';S.g={gy,tt,sc,tl,tr,surf,W};
    line(c,0,gy,W,gy,C.ink,2);c.fillStyle=rgba(liq,0.4);c.fillRect(tl,surf,tr-tl,gy-surf);line(c,tl,surf,tr,surf,C[liq],2);
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(tl,tt);c.lineTo(tl,gy);c.lineTo(tr,gy);c.lineTo(tr,tt);c.stroke();
    S.holes.forEach(hh=>{const h=hh.d*P.hw,y=surf+h*sc,v=Math.sqrt(2*9.8*h),hg=P.hw-h,R=2*Math.sqrt(h*hg);c.strokeStyle=rgba(liq,0.35);c.lineWidth=1.2;c.setLineDash([3,4]);c.beginPath();
      for(let i=0;i<=30;i++){const t=Math.sqrt(2*hg/9.8)*i/30;c.lineTo(tr+v*t*sc,y+9.8*t*t/2*sc);}c.stroke();c.setLineDash([]);
      disk(c,tr,y,5,C.canvas,hh===S.sel?C.accent:C.ink);txt(c,fmt(R,2)+' m',tr+v*Math.sqrt(2*hg/9.8)*sc,gy-10,C.muted,{align:'center',font:SMALL});});
    c.fillStyle=C[liq];S.drops.forEach(d=>{c.fillRect(d.x-1.5,d.y-1.5,3,3);});
    const pr=S.probe,px=tl+pr.xf*(tr-tl),py=surf+pr.d*P.hw*sc,ph=pr.d*P.hw;line(c,px,surf,px,py,C.red,1,[2,3]);disk(c,px,py,9,C.canvas,C.red);line(c,px-5,py,px+5,py,C.red,2);
    const p=101.3+P.rho*9.8*ph/1000;txt(c,'h = '+fmt(ph,2)+' m',px+14,py-8,C.red);txt(c,'p = '+fmt(p,1)+' kPa',px+14,py+8,C.red);
    const bx=W-150,bt=H*0.12,bh=H*0.6,pm=101.3+P.rho*9.8*2/1000;txt(c,'Bosim, kPa',bx,bt-14,C.muted);
    c.strokeStyle=C.line;c.lineWidth=1;c.strokeRect(bx,bt,28,bh);c.fillStyle=C.red;const hb=(p-0)/pm*bh;c.fillRect(bx,bt+bh-hb,28,hb);c.fillStyle=rgba('muted',0.5);const ha=101.3/pm*bh;c.fillRect(bx,bt+bh-ha,28,ha);
    txt(c,'p₀',bx+34,bt+bh-ha/2,C.muted,{font:MATH});txt(c,'ρgh',bx+34,bt+bh-ha-(hb-ha)/2,C.red,{font:MATH});
  },
  pointer(type,x,y,S,P,api){const g=S.g,pr=S.probe,px=g.tl+pr.xf*(g.tr-g.tl),py=g.surf+pr.d*P.hw*g.sc,hitH=()=>S.holes.find(hh=>Math.hypot(x-g.tr,y-(g.surf+hh.d*P.hw*g.sc))<12);
    if(type==='down'){const md=S.mode;if(md==='move'){if(Math.hypot(x-px,y-py)<16){S.drag='probe';S.sel=null;return true;}const h=hitH();S.sel=h||null;if(h){S.drag=h;return true;}return false;}
      if(md==='hole'){if(Math.abs(x-g.tr)>30||y<g.surf||y>g.gy||S.holes.length>=6)return false;const h={d:clamp((y-g.surf)/(P.hw*g.sc),0.02,0.98)};S.holes.push(h);S.sel=h;return true;}
      if(md==='del'){const h=hitH();if(h){S.holes.splice(S.holes.indexOf(h),1);S.sel=null;return true;}}return false;}
    if(type==='move'&&S.drag){if(S.drag==='probe'){pr.xf=clamp((x-g.tl)/(g.tr-g.tl),0.08,0.92);pr.d=clamp((y-g.surf)/(P.hw*g.sc),0,1);}else{S.drag.d=clamp((y-g.surf)/(P.hw*g.sc),0.02,0.98);api.refresh();}return true;}
    if(type==='up')S.drag=null;return false;},
  inspect(S,P){const h=S.sel;if(!h||!S.holes.includes(h))return null;return{title:'Teshik',props:[{label:'Chuqurligi (ulush)',sym:'h/H',min:0.02,max:0.98,step:0.01,unit:'',d:2,get:()=>h.d,set:v=>h.d=v}],del:()=>S.holes.splice(S.holes.indexOf(h),1)};},
  inspectHint:'Teshikni bosing — chuqurligini sozlaysiz.',
  read:(S,P)=>{const ph=S.probe.d*P.hw,h=S.sel&&S.holes.includes(S.sel)?S.sel:S.holes[0];const out=[['O‘lchagich chuqurligi',fmt(ph,2)+' m'],['Gidrostatik bosim ρgh',fmt(P.rho*9.8*ph/1000,2)+' kPa'],['To‘liq bosim p',fmt(101.3+P.rho*9.8*ph/1000,1)+' kPa']];
    if(h){const hh=h.d*P.hw;out.push(['Teshikdan oqim tezligi',fmt(Math.sqrt(2*9.8*hh),2)+' m/s']);}return out;}
});
