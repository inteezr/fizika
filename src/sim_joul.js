/* Joul–Lens qonuni */
SIMS.push({id:'joul',cat:'tok',title:'Tokning issiqlik ta’siri (Joul–Lens qonuni)',short:'Q = I²Rt',
  sub:'Tok o‘tkazgichdan o‘tganda elektronlar kristall panjara ionlariga urilib, ularga energiya beradi va o‘tkazgich qiziydi.',
  formula:`<span><i>Q</i> = <i>I</i><sup>2</sup><i>Rt</i></span><span class="alt"><i>P</i> = <i>UI</i> = ${fr('<i>U</i><sup>2</sup>','<i>R</i>')}</span>`,
  text:['Kalorimetrdagi suvga spiral tushirilgan. Spiraldan tok o‘tganda ajralgan issiqlik suvni isitadi. Ajralgan issiqlik tok kuchining kvadratiga proporsional: tokni 2 marta oshirsak, issiqlik 4 marta ortadi.','Kuchli qizigan spiral avval qizil, keyin sariq-oq rangda nurlanadi. Elektr choynak, dazmol, cho‘g‘lanma lampa va saqlagichlar shu qonun asosida ishlaydi.'],
  legend:[['Q','ajralgan issiqlik, J'],['I','tok kuchi, A'],['R','qarshilik, Ω'],['t','vaqt, s'],['P','quvvat, W']],
  tries:['Kuchlanishni 2 marta oshiring: quvvat 4 marta ortadi.','Qarshilikni kamaytiring (U o‘zgarmas): spiral kuchliroq qiziydi.','1 litr suvni 80 °C ga isitish uchun qancha vaqt kerakligini aniqlang.'],
  params:[{id:'U',label:'Kuchlanish',sym:'U',min:2,max:220,step:2,val:120,unit:'V',d:0},{id:'R',label:'Spiral qarshiligi',sym:'R',min:5,max:200,step:1,val:30,unit:'Ω',d:0},{id:'m',label:'Suv massasi',sym:'m',min:0.2,max:2,step:0.1,val:1,unit:'kg',d:1,reset:1}],
  init:()=>({t:0,T:20,hold:0,h:[[0,20]]}),
  step(S,P,dt){const Pw=P.U*P.U/P.R,k=20;if(S.T<100){S.t+=dt*k;S.T=Math.min(100,S.T+Pw*dt*k/(4200*P.m));if(S.t-S.h[S.h.length-1][0]>2)S.h.push([S.t,S.T]);}else{S.hold+=dt;if(S.hold>2)Object.assign(S,{t:0,T:20,hold:0,h:[[0,20]]});}},
  draw(c,W,H,S,P){grid(c,W,H,28);const Pw=P.U*P.U/P.R,gl=clamp(Math.log10(Pw+1)/3.6,0,1),px=W*0.08,pw=Math.min(W*0.3,200),pb=H*0.82,ph=H*0.55;S.g={px,pw,pb,ph,gl};
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(px,pb-ph);c.lineTo(px,pb);c.lineTo(px+pw,pb);c.lineTo(px+pw,pb-ph);c.stroke();const lh=ph*(0.35+P.m*0.25);c.fillStyle=rgba('water',0.3+(S.T-20)/400);c.fillRect(px+2,pb-lh,pw-4,lh-2);
    const col=`rgb(${Math.round(60+gl*195)},${Math.round(40+Math.max(0,gl-0.4)*300)},${Math.round(30+Math.max(0,gl-0.75)*800)})`;c.strokeStyle=col;c.lineWidth=4;if(gl>0.3){c.shadowColor=col;c.shadowBlur=20*gl;}c.beginPath();for(let i=0;i<=80;i++){const t=i/80,x=px+pw/2+Math.sin(t*TAU*7)*pw*0.22,y=pb-20-t*lh*0.6;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();c.shadowBlur=0;
    line(c,px+pw/2-pw*0.22,pb-20-lh*0.6,px+pw/2-pw*0.22,pb-ph-30,C.ink,2.5);line(c,px+pw/2+pw*0.22,pb-20,px+pw*0.9,pb-ph-30,C.ink,2.5);
    const tx=px+pw+40,th=ph,tf=S.T/110;c.strokeStyle=C.ink;c.lineWidth=1.5;rrect(c,tx-6,pb-th,12,th,6);c.stroke();disk(c,tx,pb+8,10,C.red);c.fillStyle=C.red;c.fillRect(tx-3,pb-th*tf,6,th*tf+2);txt(c,fmt(S.T,1)+' °C',tx+14,pb-th*tf,C.red);
    const gx=W*0.58,gr=W-20,gt=H*0.14,gb=H*0.86,tm=Math.max(4200*P.m*80/Pw,10),X=t=>gx+t/tm*(gr-gx),Y=T=>gb-(T-0)/110*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'t, °C',gx+6,gt-8,C.muted);txt(c,'vaqt, s',gr,gb+14,C.muted,{align:'right'});txt(c,fmt(tm,0),gr,gb+28,C.muted,{align:'right',font:SMALL});
    c.strokeStyle=C.red;c.lineWidth=2.5;c.beginPath();S.h.concat([[S.t,S.T]]).forEach(([t,T],i)=>i?c.lineTo(X(t),Y(T)):c.moveTo(X(t),Y(T)));c.stroke();
  },
  read:(S,P)=>{const I=P.U/P.R,Pw=P.U*I;return[['Tok kuchi I',fmt(I,2)+' A'],['Quvvat P',fmt(Pw,0)+' W'],['Ajralgan issiqlik Q',fmt(Pw*S.t/1000,1)+' kJ'],['Suv harorati',fmt(S.T,1)+' °C'],['Vaqt',fmt(S.t,0)+' s']];}
});
