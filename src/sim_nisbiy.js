/* Harakatning nisbiyligi */
SIMS.push({id:'nisbiy',cat:'kin',title:'Harakatning nisbiyligi: tezliklarni qo‘shish',short:'v⃗ = v⃗₁ + v⃗₂',
  sub:'Bir xil harakat turli sanoq sistemalarida turlicha ko‘rinadi. Vagonda tik tushayotgan to‘p yerdagi kuzatuvchiga parabola bo‘ylab uchayotgandek ko‘rinadi.',
  formula:`<span><i>v⃗</i> = <i>v⃗</i><sub>1</sub> + <i>v⃗</i><sub>2</sub></span><span class="alt"><i>x</i> = <i>x′</i> + <i>v</i><sub>1</sub><i>t</i></span>`,
  text:['Jismning qo‘zg‘almas sanoq sistemasiga nisbatan tezligi uning harakatlanuvchi sistemaga nisbatan tezligi bilan shu sistemaning o‘z tezligi yig‘indisiga teng (Galiley qoidasi).','Vagon ichida qo‘yib yuborilgan to‘p vagondagi yo‘lovchi uchun tik pastga tushadi. Yerdagi kuzatuvchi uchun to‘p vagon bilan birga gorizontal tezlikka ham ega, shuning uchun u parabola chizadi. Ikkala kuzatuvchi ham to‘g‘ri: traektoriya sanoq sistemasiga bog‘liq.'],
  legend:[['v₁','vagon tezligi (Yerga nisbatan), m/s'],['v₂','yo‘lovchi tezligi (vagonga nisbatan), m/s'],['v','yo‘lovchining Yerga nisbatan tezligi, m/s']],
  tries:['Sanoq sistemasini almashtiring va to‘p traektoriyasini solishtiring.','Yo‘lovchi tezligini vagonga teskari va teng qiling: Yerga nisbatan u joyida turadi.','Vagon tezligini nolga tushiring: ikki sistemada hamma narsa bir xil ko‘rinadi.'],
  params:[{id:'v1',label:'Vagon tezligi',sym:'v₁',min:0,max:6,step:0.5,val:3,unit:'m/s',d:1},{id:'v2',label:'Yo‘lovchi tezligi (vagonda)',sym:'v₂',min:-3,max:3,step:0.5,val:1,unit:'m/s',d:1},{id:'fr',label:'Sanoq sistemasi',choices:[[0,'Yer'],[1,'Vagon']],val:0}],
  init:()=>({t:0,xw:0,pw:0,bt:0,b:[]}),
  step(S,P,dt){S.t+=dt;S.xw+=P.v1*dt;S.pw+=P.v2*dt;if(S.pw>3.2)S.pw=-3.2;if(S.pw<-3.2)S.pw=3.2;S.bt+=dt;const hd=2.2,T=Math.sqrt(2*hd/9.8);if(S.bt>T+0.6){S.bt=0;S.bx0=S.xw;}if(S.bx0===undefined)S.bx0=S.xw;},
  draw(c,W,H,S,P){const sc=W/16,gy=H*0.78,offs=P.fr?S.xw-8:Math.floor(S.xw/16)*16;
    const X=x=>(x-offs)*sc,Y=y=>gy-y*sc;S.g={sc,gy,offs};grid(c,W,H,28);c.fillStyle=rgba('green',0.12);c.fillRect(0,gy,W,H-gy);line(c,0,gy,W,gy,C.ink,2);
    for(let k=Math.floor(offs)-2;k<offs+18;k+=2){line(c,X(k),gy,X(k),gy+10,C.muted,1.5);c.fillStyle=rgba('green',0.5);c.beginPath();c.arc(X(k+1),gy-0.6*sc,0.35*sc,0,TAU);c.fill();line(c,X(k+1),gy,X(k+1),gy-0.4*sc,C.muted,2);}
    const L=7,wl=S.xw-L/2;c.fillStyle=rgba('accent',0.18);c.strokeStyle=C.accent;c.lineWidth=2.5;rrect(c,X(wl),Y(3.2),L*sc,3*sc,10);c.fill();c.stroke();disk(c,X(wl+1.2),gy-0.3*sc,0.3*sc,C.ink);disk(c,X(wl+L-1.2),gy-0.3*sc,0.3*sc,C.ink);
    const px=S.xw+S.pw*0.95,py=0.4;c.fillStyle=C.warm;disk(c,X(px),Y(py+1.75),0.22*sc,C.warm);rrect(c,X(px)-0.18*sc,Y(py+1.5),0.36*sc,0.9*sc,5);c.fill();line(c,X(px)-0.1*sc,Y(py+0.6),X(px)-0.1*sc,Y(py),C.warm,3);line(c,X(px)+0.1*sc,Y(py+0.6),X(px)+0.1*sc,Y(py),C.warm,3);
    const hd=2.2,T=Math.sqrt(2*hd/9.8),tb=Math.min(S.bt,T),bx=S.bx0+P.v1*tb,by=0.4+hd-9.8*tb*tb/2;
    c.strokeStyle=rgba('red',0.5);c.lineWidth=2;c.setLineDash([4,4]);c.beginPath();for(let i=0;i<=30;i++){const t=tb*i/30;const x=P.fr?S.bx0+P.v1*tb:S.bx0+P.v1*t,y=0.4+hd-9.8*t*t/2;i?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y));}c.stroke();c.setLineDash([]);disk(c,X(bx),Y(by),7,C.red);
    const k=sc*0.45,ay=Y(3.9);arrow(c,X(S.xw),ay,X(S.xw)+P.v1*k,ay,C.accent,2.5,'v₁');if(Math.abs(P.v2)>0.01)arrow(c,X(px),Y(2.5),X(px)+P.v2*k,Y(2.5),C.warm,2.5,'v₂');const vv=P.v1+P.v2;if(Math.abs(vv)>0.01)arrow(c,X(px),Y(2.9),X(px)+vv*k,Y(2.9),C.green,3,'v');
    txt(c,P.fr?'Kuzatuvchi vagonda: vagon tinch, Yer orqaga ketyapti':'Kuzatuvchi Yerda turibdi',14,22,C.muted);txt(c,P.fr?'to‘p tik tushadi':'to‘p parabola chizadi',X(bx)+12,Y(by)-12,C.red,{font:SMALL});
  },
  read:(S,P)=>[['Yo‘lovchi tezligi (Yerga nisbatan)',fmt(P.v1+P.v2,1)+' m/s'],['Yo‘lovchi tezligi (vagonga nisbatan)',fmt(P.v2,1)+' m/s'],['To‘pning gorizontal tezligi',P.fr?'0 (vagonda)':fmt(P.v1,1)+' m/s (Yerda)'],['Tushish vaqti',fmt(Math.sqrt(2*2.2/9.8),2)+' s (ikkalasida bir xil)']]
});
