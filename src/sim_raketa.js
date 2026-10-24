/* Reaktiv harakat */
SIMS.push({id:'raketa',cat:'saq',title:'Reaktiv harakat (raketa)',short:'Δv = u·ln(m₀/m)',
  sub:'Raketa gazni orqaga katta tezlikda otib chiqaradi va impulsning saqlanish qonuniga ko‘ra o‘zi oldinga harakatlanadi. Unga tayanch kerak emas.',
  formula:`<span><i>Mv</i> = <i>mu</i></span><span class="alt"><i>Δv</i> = <i>u</i> ln${fr('<i>m</i><sub>0</sub>','<i>m</i>')} (Siolkovskiy)</span>`,
  text:['Yoqilg‘i yonganda hosil bo‘lgan gaz soplodan u tezlik bilan otiladi. Gaz va raketa impulslarining yig‘indisi nolga teng qolishi uchun raketa teskari tomonga tezlik oladi.','Yoqilg‘i sarflangan sari raketa yengillashadi, shuning uchun bir xil tortish kuchi uni tobora tezroq tezlatadi. Yakuniy tezlik massalar nisbatining logarifmiga bog‘liq.'],
  legend:[['u','gazning chiqish tezligi'],['m₀','boshlang‘ich massa (yoqilg‘i bilan)'],['m','qolgan massa'],['Δv','tezlik ortishi']],
  tries:['m₀/m ni 2,72 (e) qiling: yakuniy tezlik aynan u ga teng.','u ni 2 marta oshiring: yakuniy tezlik ham 2 marta ortadi.','Birinchi kosmik tezlikka (7,9 km/s) yetish uchun qanday massalar nisbati kerakligini toping.'],
  params:[{id:'u',label:'Gaz chiqish tezligi',sym:'u',min:1,max:4.5,step:0.1,val:3,unit:'km/s',d:1,reset:1},{id:'R',label:'Massalar nisbati',sym:'m₀/m',min:1.2,max:12,step:0.1,val:5,unit:'',d:1,reset:1}],
  init:()=>({f:0,v:0,y:0,gas:[],hold:0,hist:[]}),
  step(S,P,dt){if(S.f<1){S.f=Math.min(1,S.f+dt*0.18);const m=1/(1+(P.R-1)*0) ;const mm=P.R-(P.R-1)*S.f;S.v=P.u*Math.log(P.R/mm);for(let i=0;i<4;i++)S.gas.push({x:(Math.random()-0.5)*10,y:0,vy:60+Math.random()*80,l:1});S.hist.push([S.f,S.v]);}else{S.hold+=dt;if(S.hold>2)Object.assign(S,{f:0,v:0,y:0,gas:[],hold:0,hist:[]});}
    S.y+=S.v*dt*20;S.gas.forEach(g=>{g.y+=g.vy*dt;g.x*=1.01;g.l-=dt*1.4;});S.gas=S.gas.filter(g=>g.l>0);},
  draw(c,W,H,S,P){c.fillStyle=C.canvas;c.fillRect(0,0,W,H);for(let i=0;i<60;i++){const x=(i*97)%W,y=((i*53+S.y)%H+H)%H;disk(c,x,y,1.2,rgba('muted',0.6));}
    const rx=W*0.3,ry=H*0.42,mm=P.R-(P.R-1)*S.f;S.g={rx,ry};c.fillStyle=C.ink;c.beginPath();c.moveTo(rx,ry-80);c.quadraticCurveTo(rx+22,ry-50,rx+20,ry+40);c.lineTo(rx-20,ry+40);c.quadraticCurveTo(rx-22,ry-50,rx,ry-80);c.fill();
    c.fillStyle=C.red;c.beginPath();c.moveTo(rx-20,ry+20);c.lineTo(rx-36,ry+52);c.lineTo(rx-20,ry+44);c.fill();c.beginPath();c.moveTo(rx+20,ry+20);c.lineTo(rx+36,ry+52);c.lineTo(rx+20,ry+44);c.fill();
    const fh=(1-S.f)*44;c.fillStyle=rgba('warm',0.7);c.fillRect(rx-12,ry+36-fh,24,fh);disk(c,rx,ry-36,8,C.water);
    if(S.f<1){S.gas.forEach(g=>disk(c,rx+g.x,ry+44+g.y,3+(1-g.l)*5,rgba('warm',g.l*0.8)));}
    if(S.f<1)arrow(c,rx+44,ry+60,rx+44,ry+60+P.u*20,C.warm,2.5,'u');if(S.v>0.05)arrow(c,rx+44,ry-20,rx+44,ry-20-Math.min(S.v,12)*8,C.green,3,'v');
    const gx=W*0.55,gr=W-20,gt=H*0.15,gb=H*0.85,vm=Math.max(P.u*Math.log(P.R),1),X=f=>gx+f*(gr-gx),Y=v=>gb-v/vm*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'v, km/s',gx+6,gt-8,C.muted);txt(c,'sarflangan yoqilg‘i',gr,gb+14,C.muted,{align:'right'});
    c.strokeStyle=rgba('green',0.3);c.lineWidth=1.5;c.beginPath();for(let i=0;i<=50;i++){const f=i/50;c.lineTo(X(f),Y(P.u*Math.log(P.R/(P.R-(P.R-1)*f))));}c.stroke();
    c.strokeStyle=C.green;c.lineWidth=2.5;c.beginPath();S.hist.forEach(([f,v],i)=>i?c.lineTo(X(f),Y(v)):c.moveTo(X(f),Y(v)));c.stroke();line(c,gx,Y(7.9),gr,Y(7.9),rgba('red',0.6),1,[4,4]);if(7.9<vm)txt(c,'7,9 km/s',gr,Y(7.9)-8,C.red,{align:'right',font:SMALL});
  },
  read:(S,P)=>[['Raketa tezligi v',fmt(S.v,2)+' km/s'],['Yakuniy tezlik',fmt(P.u*Math.log(P.R),2)+' km/s'],['Qolgan yoqilg‘i',fmt((1-S.f)*100,0)+' %'],['Yoqilg‘i ulushi',fmt((1-1/P.R)*100,0)+' %']]
});
