/* Sirt taranglik va kapillyarlik */
const SR_L=[{n:'Suv',s:0.0728,th:0,r:1000,col:'#5aa9e6'},{n:'Spirt',s:0.0223,th:0,r:789,col:'#9ad1c8'},{n:'Simob',s:0.485,th:140,r:13534,col:'#b9c2cf'}];
SIMS.push({id:'sirt',cat:'mol',title:'Sirt taranglik va kapillyar hodisalar',short:'h = 2σcosθ / ρgr',
  sub:'Ingichka naychada ho‘llovchi suyuqlik ko‘tariladi, ho‘llamaydigan suyuqlik esa pasayadi. Naycha qancha ingichka bo‘lsa, sath farqi shuncha katta.',
  formula:`<span><i>h</i> = ${fr('2<i>σ</i> cos <i>θ</i>','<i>ρ g r</i>')}</span><span class="alt"><i>F</i> = <i>σ</i>·<i>l</i></span>`,
  text:['Suyuqlik sirtidagi molekulalar ichkariga tortiladi, shuning uchun sirt taranglashgan parda kabi qisqarishga intiladi. Sirt taranglik koeffitsienti σ — sirt chegarasining birlik uzunligiga ta’sir etuvchi kuch.','Naycha devorini ho‘llovchi suyuqlikda (suv, spirt) menisk botiq bo‘ladi va sirt taranglik kuchi 2πrσcosθ ustunni yuqoriga tortadi. U ustun og‘irligi ρgπr²h ga tenglashganda ko‘tarilish to‘xtaydi. Simob shishani ho‘llamaydi (θ ≈ 140°): menisk qavariq, sath esa pastga tushadi.'],
  legend:[['σ','sirt taranglik koeffitsienti, N/m'],['θ','chegaraviy (ho‘llash) burchagi'],['r','naycha radiusi, mm'],['h','ko‘tarilish balandligi, mm']],
  tries:['Radiusni ikki marta kamaytiring: ko‘tarilish balandligi ikki marta ortadi.','Simobni tanlang: menisk qavariq bo‘lib, sath tashqi sathdan pastga tushadi.','Spirtda σ suvnikidan uch marta kichik — ustun ham pastroq.'],
  params:[{id:'L',label:'Suyuqlik',choices:SR_L.map((l,i)=>[i,l.n]),val:0,reset:1},{id:'r',label:'Ingichka naycha radiusi',sym:'r',min:0.1,max:1.5,step:0.05,val:0.3,unit:'mm',d:2,reset:1}],
  init:()=>({f:0}),
  step(S,P,dt){S.f+=(1-S.f)*Math.min(1,dt*1.2);},
  draw(c,W,H,S,P){grid(c,W,H,28);const L=SR_L[P.L],hh=r=>2*L.s*Math.cos(L.th*D2R)/(L.r*9.8*r*1e-3)*1000,rs=[P.r,P.r*2,P.r*4],hs=rs.map(hh),mx=Math.max(...hs.map(Math.abs)),surf=L.th>90?H*0.42:H*0.78,sc=Math.min(4,(L.th>90?H*0.42:H*0.66)/mx);S.g={surf,sc};
    const bx=W*0.08,bw=W*0.58,bb=H-14;c.fillStyle=L.col;c.globalAlpha=0.75;c.fillRect(bx,surf,bw,bb-surf);c.globalAlpha=1;c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(bx,surf-40);c.lineTo(bx,bb);c.lineTo(bx+bw,bb);c.lineTo(bx+bw,surf-40);c.stroke();
    rs.forEach((r,i)=>{const x=bx+bw*(0.22+i*0.28),w=Math.max(6,Math.min(46,r*16)),h=hs[i]*S.f,top=Math.min(surf-h*sc,surf)-10,t0=H*0.06,ly=surf-h*sc,conc=L.th<90;
      c.fillStyle=C.canvas;c.fillRect(x-w/2,t0,w,surf-t0);c.fillStyle=L.col;c.globalAlpha=0.85;c.fillRect(x-w/2,ly,w,bb-ly-6);c.globalAlpha=1;
      c.fillStyle=conc?C.canvas:L.col;c.beginPath();c.moveTo(x-w/2,ly);c.quadraticCurveTo(x,ly+(conc?w*0.45:-w*0.45),x+w/2,ly);c.closePath();c.fill();
      c.strokeStyle=rgba('ink',0.7);c.lineWidth=1.5;c.strokeRect(x-w/2,t0,w,bb-t0-6);
      if(Math.abs(h*sc)>8){const ax=x+w/2+10;arrow(c,ax,surf,ax,ly,conc?C.green:C.red,2);txt(c,fmt(h,1)+' mm',ax+6,(surf+ly)/2,conc?C.green:C.red,{font:SMALL});}
      txt(c,'r = '+fmt(r,2)+' mm',x,t0-8,C.muted,{align:'center',font:SMALL});void top;});
    line(c,bx,surf,bx+bw,surf,rgba('ink',0.4),1,[4,3]);
    const zx=W*0.72,zy=H*0.2,zr=Math.min(W*0.13,H*0.2);c.strokeStyle=C.ink;c.lineWidth=1.5;c.beginPath();c.arc(zx+zr,zy+zr,zr,0,TAU);c.stroke();c.save();c.beginPath();c.arc(zx+zr,zy+zr,zr,0,TAU);c.clip();
    const conc=L.th<90,mcy=zy+zr*1.1;c.fillStyle=L.col;c.beginPath();c.moveTo(zx,mcy);c.quadraticCurveTo(zx+zr,mcy+(conc?zr*0.7:-zr*0.7),zx+2*zr,mcy);c.lineTo(zx+2*zr,zy+2*zr);c.lineTo(zx,zy+2*zr);c.closePath();c.fill();
    c.fillStyle=rgba('muted',0.45);c.fillRect(zx,zy,zr*0.28,2*zr);c.fillRect(zx+2*zr-zr*0.28,zy,zr*0.28,2*zr);c.restore();
    const ex=zx+zr*0.28,ey=mcy+(conc?zr*0.12:-zr*0.12),a=L.th*D2R;arrow(c,ex,ey,ex+Math.sin(Math.PI/2-a)*0+Math.cos(Math.PI/2)*0+zr*0.5*Math.sin(a)+0,ey-zr*0.5*Math.cos(a),C.accent,2,'σ');
    txt(c,'θ = '+L.th+'°',zx+zr,zy+2*zr+14,C.ink,{align:'center',font:SMALL});txt(c,conc?'botiq menisk (ho‘llaydi)':'qavariq menisk (ho‘llamaydi)',zx+zr,zy+2*zr+30,C.muted,{align:'center',font:SMALL});
  },
  read(S,P){const L=SR_L[P.L],h=2*L.s*Math.cos(L.th*D2R)/(L.r*9.8*P.r*1e-3);return[['Sath farqi h',fmt(h*1000,1)+' mm'],['σ',fmt(L.s,4)+' N/m'],['Ho‘llash burchagi θ',L.th+'°'],['Laplas bosimi 2σ/r',fmt(2*L.s/(P.r*1e-3),0)+' Pa']];}
});
