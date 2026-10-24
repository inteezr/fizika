/* Kosmik tezliklar (Nyuton to‘pi) */
const GM_E=398600,R_E=6371;
SIMS.push({id:'kosmik',cat:'din',title:'Birinchi va ikkinchi kosmik tezlik',short:'v₁ = √(gR)',
  sub:'Jism gorizontal yetarlicha tez otilsa, u Yerga tushishga ulgurmaydi: Yer sirti uning ostidan «qochib» ketadi va jism orbitaga chiqadi.',
  formula:`<span><i>v</i><sub>1</sub> = ${sq(fr('<i>GM</i>','<i>R</i>'))} ≈ 7,9 km/s</span><span class="alt"><i>v</i><sub>2</sub> = ${sq(fr('2<i>GM</i>','<i>R</i>'))} ≈ 11,2 km/s</span>`,
  text:['Nyuton tog‘ cho‘qqisidagi to‘pni tasavvur qilgan: snaryad tezligi oshgan sari u uzoqroqqa tushadi. Tezlik birinchi kosmik tezlikka yetganda snaryad Yer atrofida aylana bo‘ylab uchadi.','Tezlik bundan katta bo‘lsa orbita ellipsga aylanadi. Ikkinchi kosmik tezlikka yetgan jism Yer tortishishini butunlay yengib, qaytib kelmaydi.'],
  legend:[['v₁','birinchi kosmik tezlik'],['v₂','ikkinchi kosmik tezlik'],['G','gravitatsiya doimiysi'],['M, R','Yer massasi va radiusi (6371 km)']],
  tries:['Tezlikni 7,9 km/s ga yaqinlashtiring: orbita deyarli aylana bo‘ladi.','9–10 km/s tanlang: orbita cho‘zilgan ellips bo‘ladi.','11,2 km/s dan oshiring: snaryad qaytib kelmaydi.'],
  params:[{id:'v',label:'Otish tezligi',sym:'v',min:2,max:12,step:0.1,val:7,unit:'km/s',d:1,reset:1},{id:'h',label:'Otish balandligi',sym:'h',min:100,max:3000,step:50,val:500,unit:'km',d:0,reset:1}],
  init:P=>({x:0,y:R_E+P.h,vx:P.v,vy:0,tr:[],old:[],st:'uchmoqda',t:0}),
  step(S,P,dt){if(S.st!=='uchmoqda'){S.hold=(S.hold||0)+dt;if(S.hold>2.5)Object.assign(S,{x:0,y:R_E+P.h,vx:P.v,vy:0,tr:[],st:'uchmoqda',t:0,hold:0});return;}const n=40,h=dt*900/n;for(let i=0;i<n;i++){const r=Math.hypot(S.x,S.y),a=-GM_E/(r*r*r);S.vx+=a*S.x*h;S.vy+=a*S.y*h;S.x+=S.vx*h;S.y+=S.vy*h;S.t+=h;if(r<R_E){S.st='Yerga tushdi';break;}if(r>R_E*9){S.st='Yerdan uzoqlashdi';break;}}
    S.tr.push([S.x,S.y]);if(S.tr.length>1500)S.tr.shift();},
  draw(c,W,H,S,P){const cx=W/2,cy=H/2,sc=Math.min(W,H)*0.2/R_E,X=x=>cx+x*sc,Y=y=>cy-y*sc;S.g={cx,cy,sc};
    c.fillStyle=C.canvas;c.fillRect(0,0,W,H);const ga=c.createRadialGradient(cx,cy,R_E*sc*0.95,cx,cy,R_E*sc*1.25);ga.addColorStop(0,rgba('water',0.35));ga.addColorStop(1,rgba('water',0));c.fillStyle=ga;c.beginPath();c.arc(cx,cy,R_E*sc*1.25,0,TAU);c.fill();
    const ge=c.createRadialGradient(cx-R_E*sc*0.3,cy-R_E*sc*0.3,4,cx,cy,R_E*sc);ge.addColorStop(0,'#5fb4ff');ge.addColorStop(0.6,'#2a6fc9');ge.addColorStop(1,'#123a75');c.fillStyle=ge;c.beginPath();c.arc(cx,cy,R_E*sc,0,TAU);c.fill();
    c.fillStyle=rgba('green',0.6);[[0.2,0.3,0.35],[-0.4,-0.1,0.25],[0.3,-0.45,0.2]].forEach(([a,b,r])=>{c.beginPath();c.arc(cx+a*R_E*sc,cy+b*R_E*sc,r*R_E*sc,0,TAU);c.fill();});
    c.fillStyle=C.ink;c.beginPath();c.moveTo(X(-400),Y(R_E-50));c.lineTo(X(0),Y(R_E+P.h));c.lineTo(X(400),Y(R_E-50));c.fill();
    c.strokeStyle=C.warm;c.lineWidth=2;c.beginPath();S.tr.forEach(([x,y],i)=>i?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y)));c.stroke();disk(c,X(S.x),Y(S.y),5,C.red);
    const r0=R_E+P.h;line(c,X(0),Y(r0),X(0)+P.v*8,Y(r0),C.green,1);txt(c,S.st,14,20,S.st==='Yerga tushdi'?C.red:C.green);
  },
  read:(S,P)=>{const r0=R_E+P.h;return[['1-kosmik tezlik (shu balandlikda)',fmt(Math.sqrt(GM_E/r0),2)+' km/s'],['2-kosmik tezlik',fmt(Math.sqrt(2*GM_E/r0),2)+' km/s'],['Balandlik',fmt(Math.max(0,Math.hypot(S.x,S.y)-R_E),0)+' km'],['Tezlik',fmt(Math.hypot(S.vx,S.vy),2)+' km/s'],['Holat',S.st]];}
});
