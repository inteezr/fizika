/* Massa markazi (sandbox) */
SIMS.push({id:'massam',cat:'sta',title:'Massa markazi va og‘irlik markazi',short:'x_c = Σmᵢxᵢ / Σmᵢ',sandbox:1,
  sub:'Massa markazi — jismlar tizimining «o‘rtacha» nuqtasi, uni har bir massa o‘z massasi bilan tortadi. Tizimni shu nuqtadan tiralsa, u muvozanatda turadi.',
  formula:`<span><i>x</i><sub>c</sub> = ${fr('Σ<i>m</i><sub><i>i</i></sub><i>x</i><sub><i>i</i></sub>','Σ<i>m</i><sub><i>i</i></sub>')}</span><span class="alt"><i>y</i><sub>c</sub> = ${fr('Σ<i>m</i><sub><i>i</i></sub><i>y</i><sub><i>i</i></sub>','Σ<i>m</i><sub><i>i</i></sub>')}</span>`,
  text:['Yengil tayoqchaga bir nechta yuk mahkamlangan. Massa markazi og‘irroq yuklarga yaqinroq joylashadi. Tayanchni massa markazi ostiga qo‘ysangiz, tayoqcha muvozanatda qoladi, aks holda og‘ib ketadi.','Yuklarni sudrang, qo‘shing yoki massasini o‘zgartiring: qizil nishon (massa markazi) va tayanch o‘rni darhol yangilanadi.'],
  legend:[['mᵢ','i-yukning massasi'],['xᵢ, yᵢ','yukning koordinatalari'],['x_c, y_c','massa markazi koordinatalari']],
  tries:['Bitta yukning massasini 5 marta oshiring: markaz unga qarab siljiydi.','Ikkita teng yukni qoldiring: markaz aynan o‘rtada bo‘ladi.','Tayanchni sudrab, tayoqcha qaysi tomonga og‘ishini kuzating.'],
  tools:[{id:'move',label:'Surish / tanlash'},{id:'add',label:'+ Yuk'},{id:'del',label:'O‘chirish'}],
  params:[],
  hints:{move:'Yuk yoki tayanchni sudrang',add:'Tayoqcha ustini bosing — yuk qo‘shiladi',del:'O‘chirish uchun yukni bosing'},
  init:()=>({ms:[{x:-3,m:2},{x:1,m:5},{x:4,m:1}],sel:null,drag:null,piv:0,tilt:0,w:0}),
  step(S,P,dt){const M=S.ms.reduce((a,o)=>a+o.m,0),xc=M?S.ms.reduce((a,o)=>a+o.m*o.x,0)/M:0,tq=(xc-S.piv)*M*0.6;S.w+=(tq-S.w*3-S.tilt*2)*dt;S.tilt=clamp(S.tilt+S.w*dt,-0.35,0.35);if(Math.abs(S.tilt)>=0.35)S.w=0;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W/2,cy=H*0.5,sc=(W-80)/12;S.W=W;S.H=H;S.g={cx,cy,sc};const M=S.ms.reduce((a,o)=>a+o.m,0),xc=M?S.ms.reduce((a,o)=>a+o.m*o.x,0)/M:0;S.xc=xc;
    const px=cx+S.piv*sc;c.fillStyle=C.ink;c.beginPath();c.moveTo(px,cy+6);c.lineTo(px-22,cy+50);c.lineTo(px+22,cy+50);c.fill();line(c,0,cy+50,W,cy+50,C.ink,2);
    c.save();c.translate(px,cy);c.rotate(S.tilt);c.translate(-px,-cy);c.fillStyle=C.warm;rrect(c,cx-6*sc,cy-5,12*sc,10,4);c.fill();
    for(let i=-6;i<=6;i++)line(c,cx+i*sc,cy-5,cx+i*sc,cy+5,rgba('ink',0.4),1);
    S.ms.forEach(o=>{const x=cx+o.x*sc,r=10+Math.sqrt(o.m)*7;line(c,x,cy,x,cy-24,C.ink,2);disk(c,x,cy-24-r,r,C.accent);txt(c,fmt(o.m,1).replace(',0','')+' kg',x,cy-24-r,C.onaccent,{align:'center',font:SMALL});if(o===S.sel)selRing(c,x,cy-24-r,r+5);});
    const xx=cx+xc*sc;c.strokeStyle=C.red;c.lineWidth=2.5;c.beginPath();c.arc(xx,cy,9,0,TAU);c.stroke();line(c,xx-14,cy,xx+14,cy,C.red,2);line(c,xx,cy-14,xx,cy+14,C.red,2);c.restore();
    txt(c,'massa markazi',xx,cy+70,C.red,{align:'center',font:SMALL});txt(c,Math.abs(xc-S.piv)<0.05?'Muvozanat!':'Tayanchni massa markazi ostiga suring',W/2,24,Math.abs(xc-S.piv)<0.05?C.green:C.muted,{align:'center'});
  },
  pointer(type,x,y,S,P,api){const{cx,cy,sc}=S.g,X=(x-cx)/sc;if(type==='down'){if(S.mode==='add'){if(Math.abs(y-cy)<90&&Math.abs(X)<=6){const o={x:Math.round(X*2)/2,m:2};S.ms.push(o);S.sel=o;}return true;}
      const hit=S.ms.find(o=>{const r=10+Math.sqrt(o.m)*7;return Math.hypot(x-(cx+o.x*sc),y-(cy-24-r))<r+6;});
      if(S.mode==='del'){if(hit){S.ms.splice(S.ms.indexOf(hit),1);S.sel=null;}return!!hit;}
      if(hit){S.sel=hit;S.drag=hit;return true;}if(Math.abs(x-(cx+S.piv*sc))<26&&y>cy&&y<cy+56){S.drag='piv';return true;}S.sel=null;return false;}
    if(type==='move'&&S.drag){const v=clamp(Math.round(X*4)/4,-6,6);if(S.drag==='piv')S.piv=v;else S.drag.x=v;return true;}if(type==='up')S.drag=null;return false;},
  inspect(S){const o=S.sel;if(!o||!S.ms.includes(o))return null;return{title:'Yuk',props:[{label:'Massa',sym:'m',min:0.5,max:20,step:0.5,unit:'kg',d:1,get:()=>o.m,set:v=>o.m=v},{label:'Joylashuv',sym:'x',min:-6,max:6,step:0.25,unit:'m',d:2,get:()=>o.x,set:v=>o.x=v}],del:()=>S.ms.splice(S.ms.indexOf(o),1)};},
  inspectHint:'Yukni bosing — massasi va joyini o‘zgartirasiz.',
  read:(S,P)=>{const M=S.ms.reduce((a,o)=>a+o.m,0);return[['Umumiy massa',fmt(M,1)+' kg'],['Massa markazi x_c',fmt(S.xc||0,2)+' m'],['Tayanch o‘rni',fmt(S.piv,2)+' m'],['Holat',Math.abs((S.xc||0)-S.piv)<0.05?'muvozanatda':'og‘adi']];}
});
