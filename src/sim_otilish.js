/* 2. Burchak ostida otilgan jism */
function projCalc(P){const th=P.ang*D2R,vx=P.v0*Math.cos(th),vy=P.v0*Math.sin(th),T=2*vy/P.g;return{th,vx,vy,T,R:vx*T,Hm:vy*vy/(2*P.g)};}
SIMS.push({id:'otilish',cat:'kin',title:'Gorizontga burchak ostida otilgan jism',short:'L = v₀² sin2α / g',
  sub:'Uchish uzoqligi boshlang‘ich tezlik, otish burchagi va erkin tushish tezlanishiga bog‘liq.',
  formula:`<span><i>L</i> = ${fr('<i>v</i><sub>0</sub><sup>2</sup> sin 2<i>α</i>','<i>g</i>')}</span><span class="alt"><i>h</i><sub>max</sub> = ${fr('<i>v</i><sub>0</sub><sup>2</sup> sin<sup>2</sup><i>α</i>','2<i>g</i>')} &nbsp; <i>t</i> = ${fr('2<i>v</i><sub>0</sub> sin <i>α</i>','<i>g</i>')}</span>`,
  text:['Jism gorizontal yo‘nalishda o‘zgarmas tezlik bilan, vertikal yo‘nalishda esa g tezlanish bilan harakatlanadi. Bu ikki harakat qo‘shilib, traektoriya parabola shaklini oladi.','Strelkalar tezlikning tashkil etuvchilarini ko‘rsatadi: gorizontal qismi (vₓ) o‘zgarmaydi, vertikal qismi (vᵧ) eng yuqori nuqtada nolga teng bo‘ladi. Uzoq parvozlar ekranda tezlashtirib ko‘rsatiladi.'],
  legend:[['v₀','boshlang‘ich tezlik, m/s'],['α','otish burchagi'],['g','erkin tushish tezlanishi, m/s²'],['L','uchish uzoqligi, m'],['h','ko‘tarilish balandligi, m']],
  tries:['45° da uchish uzoqligi eng katta bo‘ladi — tekshiring.','30° va 60° burchaklarda L bir xil chiqadi, lekin balandlik va vaqt har xil.','g ni 1,6 m/s² qiling (Oy): jism 6 marta uzoqroqqa uchadi.'],
  params:[{id:'v0',label:'Boshlang‘ich tezlik',sym:'v₀',min:5,max:40,step:1,val:20,unit:'m/s',reset:1},{id:'ang',label:'Otish burchagi',sym:'α',min:5,max:85,step:1,val:50,unit:'°',reset:1},{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:1.6,max:25,step:0.1,val:9.8,unit:'m/s²',d:1,reset:1}],
  init:()=>({t:0,hold:0}),
  step(S,P,dt){const k=projCalc(P);if(S.t<k.T)S.t=Math.min(k.T,S.t+dt*Math.max(1,k.T/4));else{S.hold+=dt;if(S.hold>1.2){S.t=0;S.hold=0;}}},
  draw(c,W,H,S,P){const k=projCalc(P),ox=52,oy=H-40,sc=Math.min((W-90)/k.R,(H-80)/k.Hm);
    const st=niceStep((W-90)/sc,7);c.strokeStyle=C.grid;c.lineWidth=1;c.beginPath();
    for(let m=0;ox+m*sc<W;m+=st){c.moveTo(ox+m*sc,0);c.lineTo(ox+m*sc,oy);}for(let m=0;oy-m*sc>0;m+=st){c.moveTo(ox,oy-m*sc);c.lineTo(W,oy-m*sc);}c.stroke();
    for(let m=st;ox+m*sc<W-20;m+=st) txt(c,fmt(m,st<1?1:0),ox+m*sc,oy+16,C.muted,{align:'center'});
    for(let m=st;oy-m*sc>14;m+=st) txt(c,fmt(m,st<1?1:0),ox-8,oy-m*sc,C.muted,{align:'right'});
    txt(c,'x, m',W-10,oy+16,C.muted,{align:'right'});txt(c,'y, m',ox-8,10,C.muted,{align:'right'});
    line(c,0,oy,W,oy,C.ink,2);
    const X=t=>ox+k.vx*t*sc,Y=t=>oy-(k.vy*t-P.g*t*t/2)*sc;
    c.strokeStyle=C.muted;c.lineWidth=1.5;c.setLineDash([5,6]);c.beginPath();for(let i=0;i<=80;i++){const t=k.T*i/80;i?c.lineTo(X(t),Y(t)):c.moveTo(X(t),Y(t));}c.stroke();c.setLineDash([]);
    c.strokeStyle=C.accent;c.lineWidth=2.5;c.beginPath();for(let i=0;i<=60;i++){const t=S.t*i/60;i?c.lineTo(X(t),Y(t)):c.moveTo(X(t),Y(t));}c.stroke();
    const ay=Y(k.T/2);line(c,X(k.T/2),ay,X(k.T/2),oy,C.green,1,[3,4]);txt(c,'h = '+fmt(k.Hm,1)+' m',X(k.T/2)+8,ay-12,C.green);
    txt(c,'L = '+fmt(k.R,1)+' m',X(k.T),oy-14,C.ink,{align:'right'});
    c.strokeStyle=C.warm;c.lineWidth=1.5;c.beginPath();c.arc(ox,oy,26,-k.th,0);c.stroke();txt(c,'α',ox+32,oy-9,C.warm,{font:MATH});
    const bx=X(S.t),by=Y(S.t),vs=70/P.v0,vyt=k.vy-P.g*S.t;
    if(S.t<k.T){arrow(c,bx,by,bx+k.vx*vs,by,C.warm,2,'vₓ');arrow(c,bx,by,bx,by-vyt*vs,C.green,2,'vᵧ');arrow(c,bx,by,bx+k.vx*vs,by-vyt*vs,C.accent,2.5,'v');}
    disk(c,bx,by,8,C.red);
  },
  read:(S,P)=>{const k=projCalc(P);return[['Uchish uzoqligi L',fmt(k.R,1)+' m'],['Maks. balandlik h',fmt(k.Hm,1)+' m'],['Parvoz vaqti',fmt(k.T)+' s'],['Hozirgi vaqt t',fmt(S.t)+' s']];}
});
