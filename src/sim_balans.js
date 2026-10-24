/* Issiqlik balansi */
const BAL={4200:'Suv',920:'Alyuminiy',460:'Temir',380:'Mis'};
SIMS.push({id:'balans',cat:'trm',title:'Issiqlik balansi tenglamasi',short:'Q_ber = Q_ol',
  sub:'Issiq va sovuq jismlar tegib tursa, issiqlik issig‘idan sovug‘iga o‘tadi va harorat tenglashadi. Bergan va olgan issiqlik miqdorlari teng.',
  formula:`<span><i>c</i><sub>1</sub><i>m</i><sub>1</sub>(<i>t</i><sub>1</sub> − <i>θ</i>) = <i>c</i><sub>2</sub><i>m</i><sub>2</sub>(<i>θ</i> − <i>t</i><sub>2</sub>)</span><span class="alt"><i>θ</i> = ${fr('<i>c</i><sub>1</sub><i>m</i><sub>1</sub><i>t</i><sub>1</sub> + <i>c</i><sub>2</sub><i>m</i><sub>2</sub><i>t</i><sub>2</sub>','<i>c</i><sub>1</sub><i>m</i><sub>1</sub> + <i>c</i><sub>2</sub><i>m</i><sub>2</sub>')}</span>`,
  text:['Kalorimetrdagi suvga qizdirilgan jism tushiriladi. Jism soviydi, suv isiydi va ma’lum vaqtdan keyin ikkalasi bir xil θ haroratga keladi. Issiqlik isrof bo‘lmasa, jism bergan issiqlik suv olgan issiqlikka teng.','Solishtirma issiqlik sig‘imi katta bo‘lgan modda (suv) haroratini o‘zgartirish qiyin. Shuning uchun temir bo‘lagi suvni unchalik isita olmaydi, o‘zi esa tez soviydi.'],
  legend:[['c','solishtirma issiqlik sig‘imi, J/(kg·°C)'],['m','massa, kg'],['t₁, t₂','boshlang‘ich haroratlar'],['θ','umumiy harorat']],
  tries:['Bir xil massadagi temirni suv bilan solishtiring.','Jism massasini oshirib, θ issiq jism haroratiga yaqinlashishini kuzating.','Grafikdagi ikki egri chiziq bitta haroratda uchrashishini tekshiring.'],
  params:[{id:'c1',label:'Issiq jism moddasi',choices:[[4200,'Suv'],[920,'Al'],[460,'Fe'],[380,'Cu']],val:460,reset:1},{id:'m1',label:'Issiq jism massasi',sym:'m₁',min:0.1,max:3,step:0.1,val:1,unit:'kg',d:1,reset:1},{id:'t1',label:'Issiq jism harorati',sym:'t₁',min:40,max:300,step:5,val:200,unit:'°C',d:0,reset:1},{id:'m2',label:'Suv massasi',sym:'m₂',min:0.1,max:3,step:0.1,val:1,unit:'kg',d:1,reset:1},{id:'t2',label:'Suv harorati',sym:'t₂',min:0,max:40,step:1,val:20,unit:'°C',d:0,reset:1}],
  init:P=>({T1:P.t1,T2:P.t2,t:0,h:[[0,P.t1,P.t2]],hold:0}),
  step(S,P,dt){const C1=P.c1*P.m1,C2=4200*P.m2,k=900;if(S.t<10){S.t+=dt;const q=k*(S.T1-S.T2)*dt;S.T1-=q/C1;S.T2+=q/C2;S.h.push([S.t,S.T1,S.T2]);}else{S.hold+=dt;if(S.hold>2)Object.assign(S,{T1:P.t1,T2:P.t2,t:0,h:[[0,P.t1,P.t2]],hold:0});}},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.06,cw=Math.min(W*0.32,220),cb=H*0.85,ch=H*0.55,ct=cb-ch,lh=ch*(0.4+P.m2*0.15);S.g={cx,cw,cb,ct,lh};
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(cx,ct);c.lineTo(cx,cb);c.lineTo(cx+cw,cb);c.lineTo(cx+cw,ct);c.stroke();const h2=(S.T2-0)/100;c.fillStyle=`rgba(${Math.round(60+h2*190)},${Math.round(140-h2*40)},${Math.round(230-h2*150)},0.45)`;c.fillRect(cx+2,cb-lh,cw-4,lh-2);
    const bs=24+Math.sqrt(P.m1/(P.c1===4200?1:7.8/1))*24,hh=(S.T1-20)/280;c.fillStyle=`rgb(${Math.round(110+hh*145)},${Math.round(110-hh*40)},${Math.round(120-hh*90)})`;rrect(c,cx+cw/2-bs/2,cb-lh*0.55-bs/2,bs,bs,5);c.fill();
    const gx=W*0.48,gr=W-20,gt=H*0.12,gb=H*0.86,X=t=>gx+t/10*(gr-gx),Y=T=>gb-T/Math.max(P.t1,60)*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'t, °C',gx+6,gt-8,C.muted);txt(c,'vaqt',gr,gb+14,C.muted,{align:'right'});
    [[1,'red'],[2,'accent']].forEach(([j,k])=>{c.strokeStyle=C[k];c.lineWidth=2.5;c.beginPath();S.h.forEach((r,i)=>i?c.lineTo(X(r[0]),Y(r[j])):c.moveTo(X(r[0]),Y(r[j])));c.stroke();});
    const th=(P.c1*P.m1*P.t1+4200*P.m2*P.t2)/(P.c1*P.m1+4200*P.m2);line(c,gx,Y(th),gr,Y(th),C.green,1.2,[5,4]);txt(c,'θ = '+fmt(th,1)+' °C',gr,Y(th)-10,C.green,{align:'right'});
  },
  read:(S,P)=>{const th=(P.c1*P.m1*P.t1+4200*P.m2*P.t2)/(P.c1*P.m1+4200*P.m2);return[['Jism harorati',fmt(S.T1,1)+' °C'],['Suv harorati',fmt(S.T2,1)+' °C'],['Umumiy harorat θ',fmt(th,1)+' °C'],['Berilgan issiqlik',fmt(P.c1*P.m1*(P.t1-S.T1)/1000,1)+' kJ']];}
});
