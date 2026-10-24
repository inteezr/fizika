/* Issiqlik dvigateli: Karno sikli */
function karno(P){const g=1.4,V1=1,V2=2.2,r=Math.pow(P.T1/P.T2,1/(g-1)),V3=V2*r,V4=V1*r;return{g,V1,V2,V3,V4};}
function karnoPt(P,u){const k=karno(P),T1=P.T1,T2=P.T2;u=((u%4)+4)%4;let V,p,seg=Math.floor(u),f=u-seg;
  if(seg===0){V=k.V1+(k.V2-k.V1)*f;p=T1/V;}else if(seg===1){V=k.V2+(k.V3-k.V2)*f;p=(T1/k.V2)*Math.pow(k.V2/V,k.g);}else if(seg===2){V=k.V3+(k.V4-k.V3)*f;p=T2/V;}else{V=k.V4+(k.V1-k.V4)*f;p=(T2/k.V4)*Math.pow(k.V4/V,k.g);}return{V,p,seg};}
SIMS.push({id:'karno',cat:'trm',title:'Issiqlik dvigateli va Karno sikli',short:'η = 1 − T₂/T₁',
  sub:'Issiqlik dvigateli isitgichdan Q₁ issiqlik olib, uning bir qismini ishga aylantiradi, qolganini sovitgichga beradi. Eng yuqori FIK Karno sikliga tegishli.',
  formula:`<span><i>η</i> = ${fr('<i>Q</i><sub>1</sub> − <i>Q</i><sub>2</sub>','<i>Q</i><sub>1</sub>')}</span><span class="alt"><i>η</i><sub>max</sub> = 1 − ${fr('<i>T</i><sub>2</sub>','<i>T</i><sub>1</sub>')}</span>`,
  text:['Karno sikli to‘rt bosqichdan iborat: isitgichdan issiqlik olib izotermik kengayish, adiabatik kengayish, sovitgichga issiqlik berib izotermik siqilish va adiabatik siqilish. p–V diagrammadagi yopiq egri chiziq ichidagi yuza bitta siklda bajarilgan ishga teng.','FIK faqat isitgich va sovitgich haroratlariga bog‘liq. Hech qanday dvigatel Karno siklidan yuqori FIKga ega bo‘la olmaydi — bu termodinamikaning ikkinchi qonuni natijasi.'],
  legend:[['T₁','isitgich harorati, K'],['T₂','sovitgich harorati, K'],['Q₁','isitgichdan olingan issiqlik'],['Q₂','sovitgichga berilgan issiqlik'],['η','foydali ish koeffitsienti']],
  tries:['T₂ ni T₁ ga yaqinlashtiring: sikl torayadi va FIK nolga intiladi.','T₁ = 600 K, T₂ = 300 K da FIK 50% ekanini tekshiring.','Diagrammada qaysi bosqichda gaz issiqlik olishini toping (qizil).'],
  params:[{id:'T1',label:'Isitgich harorati',sym:'T₁',min:400,max:1200,step:10,val:800,unit:'K',d:0},{id:'T2',label:'Sovitgich harorati',sym:'T₂',min:250,max:390,step:5,val:300,unit:'K',d:0}],
  init:()=>({u:0}),step(S,P,dt){S.u=(S.u+dt*0.35)%4;},
  draw(c,W,H,S,P){grid(c,W,H,28);const k=karno(P),pt=karnoPt(P,S.u),cx=W*0.06,cw=Math.min(W*0.26,170),cb=H*0.8,hs=(H*0.5)/k.V3,vf=V=>0.15+0.85*Math.log(V/k.V1)/Math.log(k.V3/k.V1),ct=cb-vf(pt.V)*H*0.5;S.g={cx,cw,cb,ct,seg:pt.seg};
    c.fillStyle=pt.seg===0?rgba('red',0.25):pt.seg===2?rgba('accent',0.25):rgba('muted',0.15);c.fillRect(cx,cb+4,cw,18);txt(c,pt.seg===0?'isitgich':pt.seg===2?'sovitgich':'issiqlik izolyatsiyasi',cx+cw/2,cb+13,C.ink,{align:'center',font:SMALL});
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(cx,cb-H*0.5-30);c.lineTo(cx,cb);c.lineTo(cx+cw,cb);c.lineTo(cx+cw,cb-H*0.5-30);c.stroke();c.fillStyle=pt.seg<2?rgba('red',0.18):rgba('accent',0.18);c.fillRect(cx+2,ct,cw-4,cb-ct);c.fillStyle=C.ink;c.fillRect(cx+2,ct-12,cw-4,12);c.fillRect(cx+cw/2-5,ct-50,10,40);
    const gx=W*0.42,gr=W-20,gt=H*0.1,gb=H*0.86,lv0=Math.log(k.V1)-0.15,lv1=Math.log(k.V3)+0.15,lp1=Math.log(P.T1/k.V1)+0.2,lp0=Math.log(P.T2/k.V3)-0.2,X=v=>gx+(Math.log(v)-lv0)/(lv1-lv0)*(gr-gx),Y=p=>gb-(Math.log(p)-lp0)/(lp1-lp0)*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'p (log)',gx+6,gt-6,C.muted,{font:SMALL});txt(c,'V (log)',gr,gb+14,C.muted,{align:'right',font:SMALL});
    c.fillStyle=rgba('violet',0.18);c.beginPath();for(let i=0;i<=200;i++){const q=karnoPt(P,i/50);i?c.lineTo(X(q.V),Y(q.p)):c.moveTo(X(q.V),Y(q.p));}c.fill();
    const cols=['red','muted','accent','muted'];for(let s=0;s<4;s++){c.strokeStyle=C[cols[s]];c.lineWidth=2.5;c.beginPath();for(let i=0;i<=50;i++){const q=karnoPt(P,s+i/50);i?c.lineTo(X(q.V),Y(q.p)):c.moveTo(X(q.V),Y(q.p));}c.stroke();}
    disk(c,X(pt.V),Y(pt.p),6,C.ink);txt(c,'A = yuza',X((k.V2+k.V4)/2),Y((P.T1/k.V2+P.T2/k.V4)/2),C.violet,{align:'center',font:SMALL});txt(c,'T₁',X(k.V1+ (k.V2-k.V1)/2)+6,Y(P.T1/((k.V1+k.V2)/2))-12,C.red,{font:MATH});
  },
  read:(S,P)=>{const k=karno(P),Q1=P.T1*Math.log(k.V2/k.V1)*8.31,Q2=P.T2*Math.log(k.V3/k.V4)*8.31;return[['FIK η',fmt((1-P.T2/P.T1)*100,1)+' %'],['Olingan Q₁ (1 mol)',fmt(Q1/1000,2)+' kJ'],['Berilgan Q₂',fmt(Q2/1000,2)+' kJ'],['Ish A',fmt((Q1-Q2)/1000,2)+' kJ']];}
});
