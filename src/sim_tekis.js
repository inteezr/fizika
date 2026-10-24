/* Tekis harakat va uchrashish */
function car2d(c,x,y,col,dir){c.save();c.translate(x,y);if(dir<0)c.scale(-1,1);c.fillStyle=col;rrect(c,-22,-22,44,16,5);c.fill();c.fillStyle=rgba('canvas',0.7);rrect(c,-8,-32,20,11,4);c.fill();c.fillStyle=col;rrect(c,-10,-33,24,12,5);c.globalAlpha=0.55;c.fill();c.globalAlpha=1;disk(c,-12,-5,6,C.ink);disk(c,12,-5,6,C.ink);disk(c,22,-15,2.5,C.warm);c.restore();}
SIMS.push({id:'tekis',cat:'kin',title:'Tekis harakat va uchrashish',short:'x = x₀ + vt',
  sub:'Tezligi o‘zgarmas jism teng vaqtlarda teng masofalarni bosib o‘tadi. Ikki jismning koordinatalari tenglashgan paytda ular uchrashadi.',
  formula:`<span><i>x</i> = <i>x</i><sub>0</sub> + <i>vt</i></span><span class="alt"><i>t</i><sub>uch</sub> = ${fr('<i>x</i><sub>02</sub> − <i>x</i><sub>01</sub>','<i>v</i><sub>1</sub> − <i>v</i><sub>2</sub>')}</span>`,
  text:['Tekis harakatda tezlik vaqt o‘tishi bilan o‘zgarmaydi, shuning uchun koordinataning vaqtga bog‘liqlik grafigi to‘g‘ri chiziq bo‘ladi. Chiziqning qiyaligi tezlikni bildiradi: qiyalik qancha katta bo‘lsa, jism shuncha tez.','Ikki avtomobil grafigi kesishgan nuqta uchrashuv vaqti va joyini ko‘rsatadi. Agar ular bir tomonga yursa, orqadagisi faqat tezroq bo‘lsagina oldingisiga yetib oladi.'],
  legend:[['x','koordinata, m'],['x₀','boshlang‘ich koordinata, m'],['v','tezlik (proyeksiyasi), m/s'],['t','vaqt, s']],
  tries:['Ikkala tezlikni bir xil ishorali qiling: avtomobillar quvlashadi.','v₁ = v₂ bo‘lsa grafiklar parallel — ular hech qachon uchrashmaydi.','Masofani ikki marta oshiring: uchrashuv vaqti ham ikki marta ortadi.'],
  params:[{id:'v1',label:'1-avtomobil tezligi',sym:'v₁',min:-10,max:25,step:0.5,val:12,unit:'m/s',d:1,reset:1},{id:'v2',label:'2-avtomobil tezligi',sym:'v₂',min:-25,max:10,step:0.5,val:-8,unit:'m/s',d:1,reset:1},{id:'L',label:'Boshlang‘ich masofa',sym:'x₀₂',min:20,max:300,step:5,val:200,unit:'m',d:0,reset:1}],
  init:()=>({t:0,hold:0}),
  step(S,P,dt){if(S.t<20)S.t=Math.min(20,S.t+dt*2);else{S.hold+=dt;if(S.hold>1.5){S.t=0;S.hold=0;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const lo=Math.min(0,P.L+P.v2*20,P.v1*20)-20,hi=Math.max(P.L,P.v1*20,P.L+P.v2*20)+20,sc=(W-60)/(hi-lo),PX=x=>30+(x-lo)*sc,ry=H*0.3;S.g={lo,sc,ry};
    c.fillStyle=rgba('muted',0.15);c.fillRect(0,ry,W,26);line(c,0,ry+13,W,ry+13,C.line,2,[12,10]);
    const x1=P.v1*S.t,x2=P.L+P.v2*S.t;car2d(c,PX(x1),ry,C.accent,P.v1>=0?1:-1);car2d(c,PX(x2),ry,C.warm,P.v2>=0?1:-1);
    txt(c,'1',PX(x1),ry-46,C.accent,{align:'center'});txt(c,'2',PX(x2),ry-46,C.warm,{align:'center'});
    const tm=P.v1!==P.v2?P.L/(P.v1-P.v2):-1;if(tm>0&&tm<=20){const xm=P.v1*tm;line(c,PX(xm),ry-60,PX(xm),ry+26,C.red,1.5,[4,4]);txt(c,'uchrashuv',PX(xm),ry-68,C.red,{align:'center',font:SMALL});}
    const gx=50,gr=W-20,gt=H*0.5,gb=H-30,X=t=>gx+t/20*(gr-gx),Y=x=>gb-(x-lo)/(hi-lo)*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'x, m',gx+6,gt-8,C.muted);txt(c,'t, s',gr,gb+14,C.muted,{align:'right'});
    if(lo<0)line(c,gx,Y(0),gr,Y(0),C.line,1,[3,3]);
    [[0,P.v1,'accent'],[P.L,P.v2,'warm']].forEach(([x0,v,k])=>{line(c,X(0),Y(x0),X(20),Y(x0+v*20),rgba(k,0.3),1.5);line(c,X(0),Y(x0),X(S.t),Y(x0+v*S.t),C[k],2.5);disk(c,X(S.t),Y(x0+v*S.t),4,C[k]);});
    if(tm>0&&tm<=20)disk(c,X(tm),Y(P.v1*tm),6,null,C.red);
  },
  read:(S,P)=>{const tm=P.v1!==P.v2?P.L/(P.v1-P.v2):-1;return[['Vaqt t',fmt(S.t,1)+' s'],['1-avtomobil x₁',fmt(P.v1*S.t,0)+' m'],['2-avtomobil x₂',fmt(P.L+P.v2*S.t,0)+' m'],['Uchrashuv',tm>0?fmt(tm,1)+' s da, x = '+fmt(P.v1*tm,0)+' m':'uchrashmaydi']];}
});
