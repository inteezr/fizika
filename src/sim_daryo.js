/* Tezliklarni qo‘shish: daryodan suzib o‘tish */
SIMS.push({id:'daryo',cat:'kin',title:'Tezliklarni qo‘shish (daryodan o‘tish)',short:'v⃗ = v⃗₁ + u⃗',
  sub:'Qayiqning qirg‘oqqa nisbatan tezligi uning suvga nisbatan tezligi va oqim tezligining vektor yig‘indisiga teng.',
  formula:`<span><i><b>v</b></i> = <i><b>v</b></i><sub>q</sub> + <i><b>u</b></i></span><span class="alt"><i>t</i> = ${fr('<i>d</i>','<i>v</i><sub>q</sub> cos<i>β</i>')} &nbsp; <i>s</i> = (<i>u</i> − <i>v</i><sub>q</sub> sin<i>β</i>)<i>t</i></span>`,
  text:['Qayiq burnini to‘g‘ri qarama-qarshi qirg‘oqqa qaratsa ham, oqim uni pastga olib ketadi. Natijaviy tezlik vektorlar parallelogrammi qoidasi bo‘yicha topiladi.','Qayiq burnini oqimga qarshi biroz burilsa, u to‘g‘ri qarshi nuqtaga borishi mumkin, lekin buning uchun qayiq tezligi oqim tezligidan katta bo‘lishi kerak. Eng tez o‘tish esa burun to‘g‘ri qirg‘oqqa qaraganda bo‘ladi.'],
  legend:[['vₚ','qayiqning suvga nisbatan tezligi'],['u','oqim tezligi'],['β','burun burchagi (oqimga qarshi +)'],['d','daryo kengligi, 100 m'],['s','oqim bo‘ylab siljish']],
  tries:['β = 0 qiling va o‘tish vaqtini eslab qoling — bu eng qisqa vaqt.','sin β = u/vₚ bo‘ladigan burchakni toping: qayiq to‘g‘ri qarshi nuqtaga boradi.','Oqim tezligini qayiq tezligidan katta qiling: siljishni yo‘qotib bo‘lmaydi.'],
  params:[{id:'vq',label:'Qayiq tezligi (suvga nisbatan)',sym:'vₚ',min:0.5,max:6,step:0.1,val:3,unit:'m/s',d:1,reset:1},{id:'u',label:'Oqim tezligi',sym:'u',min:0,max:5,step:0.1,val:1.5,unit:'m/s',d:1,reset:1},{id:'b',label:'Burun burchagi',sym:'β',min:-60,max:80,step:1,val:0,unit:'°',d:0,reset:1}],
  init:()=>({t:0,tr:[],hold:0,ph:0}),
  step(S,P,dt){S.ph+=dt;const b=P.b*D2R,vy=P.vq*Math.cos(b);if(vy<=0.01)return;const T=100/vy;if(S.t<T){S.t=Math.min(T,S.t+dt*6);}else{S.hold+=dt;if(S.hold>1.2){S.t=0;S.tr=[];S.hold=0;}}},
  draw(c,W,H,S,P){const b=P.b*D2R,vx=P.u-P.vq*Math.sin(b),vy=P.vq*Math.cos(b),rt=H*0.16,rb=H*0.84,sc=(rb-rt)/100,x0=W*0.3,X=x=>x0+x*sc,Y=y=>rb-y*sc;S.g={rt,rb,sc,x0};
    c.fillStyle=rgba('green',0.18);c.fillRect(0,0,W,rt);c.fillRect(0,rb,W,H-rb);c.fillStyle=rgba('water',0.22);c.fillRect(0,rt,W,rb-rt);
    for(let i=0;i<14;i++){const y=rt+(i+0.5)*(rb-rt)/14,o=((S.ph*P.u*sc*6+i*53)%(W+80))-40;line(c,o,y,o+30,y,rgba('water',0.7),2);}
    line(c,X(0),rb,X(0),rt,C.muted,1,[4,4]);const x=vx*S.t,y=vy*S.t;if(!S.tr.length||Math.hypot(S.tr[S.tr.length-1][0]-x,S.tr[S.tr.length-1][1]-y)>1)S.tr.push([x,y]);
    c.strokeStyle=rgba('ink',0.5);c.lineWidth=2;c.setLineDash([6,5]);c.beginPath();S.tr.forEach(([a,b2],i)=>i?c.lineTo(X(a),Y(b2)):c.moveTo(X(a),Y(b2)));c.stroke();c.setLineDash([]);
    const bx=X(x),by=Y(y);c.save();c.translate(bx,by);c.rotate(-b);c.fillStyle=C.warm;c.beginPath();c.moveTo(0,-20);c.quadraticCurveTo(10,-6,9,14);c.lineTo(-9,14);c.quadraticCurveTo(-10,-6,0,-20);c.fill();c.restore();
    const k=22;arrow(c,bx,by,bx-P.vq*Math.sin(b)*k,by-P.vq*Math.cos(b)*k,C.warm,2.5,'vₚ');arrow(c,bx,by,bx+P.u*k,by,C.accent,2.5,'u');arrow(c,bx,by,bx+vx*k,by-vy*k,C.green,3,'v');
    if(vy<=0.01)txt(c,'Qayiq qarshi qirg‘oqqa yeta olmaydi',W/2,H/2,C.red,{align:'center'});
  },
  read:(S,P)=>{const b=P.b*D2R,vx=P.u-P.vq*Math.sin(b),vy=P.vq*Math.cos(b),T=vy>0.01?100/vy:Infinity;return[['Natijaviy tezlik v',fmt(Math.hypot(vx,vy),2)+' m/s'],['O‘tish vaqti',isFinite(T)?fmt(T,1)+' s':'—'],['Oqim bo‘ylab siljish',isFinite(T)?fmt(vx*T,1)+' m':'—'],['To‘g‘ri o‘tish burchagi',P.u<P.vq?fmt(Math.asin(P.u/P.vq)/D2R,1)+'°':'mumkin emas']];}
});
