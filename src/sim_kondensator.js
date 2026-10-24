/* Kondensator zaryadlanishi */
SIMS.push({id:'kondensator',cat:'est',title:'Kondensatorning zaryadlanishi',short:'q = CU · τ = RC',
  sub:'Kondensator rezistor orqali eksponensial qonun bo‘yicha zaryadlanadi va razryadlanadi.',
  formula:`<span><i>q</i> = <i>CU</i></span><span class="alt"><i>u</i><sub>C</sub> = <i>U</i>(1 − <i>e</i><sup>−<i>t</i>/<i>RC</i></sup>) &nbsp; <i>τ</i> = <i>RC</i> &nbsp; <i>W</i> = ${fr('<i>CU</i><sup>2</sup>','2')}</span>`,
  text:['Kalit ulanganda elektronlar manbadan bir qoplamaga oqib keladi va ikkinchisidan ketadi. Qoplamalarda zaryad yig‘ilgani sari ular orasidagi kuchlanish ortadi va tok kamayadi. Kondensator kuchlanishi manba kuchlanishiga yetganda tok to‘xtaydi.','τ = RC vaqt doimiysi: bir τ da kondensator 63 % gacha zaryadlanadi, 5τ dan keyin deyarli to‘liq. Razryadlash rejimida manba uziladi va kondensator yig‘ilgan energiyasini rezistorga beradi.'],
  legend:[['C','sig‘im, F (1 mkF = 10⁻⁶ F)'],['R','qarshilik, Ω'],['U','manba kuchlanishi, V'],['τ','vaqt doimiysi, s'],['q','zaryad, C']],
  tries:['R ni 2 marta oshiring: zaryadlanish 2 marta sekinlashadi.','Grafikda t = τ nuqtasida kuchlanish 63 % ekanini tekshiring.','Razryadlash rejimiga o‘ting: tok yo‘nalishi teskari bo‘ladi.'],
  params:[{id:'U',label:'Manba kuchlanishi',sym:'U',min:1,max:12,step:0.5,val:9,unit:'V',d:1,reset:1},{id:'R',label:'Qarshilik',sym:'R',min:1,max:100,step:1,val:20,unit:'kΩ',d:0,reset:1},{id:'C',label:'Sig‘im',sym:'C',min:10,max:1000,step:10,val:100,unit:'mkF',d:0,reset:1},{id:'mode',label:'Rejim',choices:[[1,'Zaryadlash'],[0,'Razryadlash']],val:1,reset:1}],
  init:()=>({t:0,hold:0,s:0}),
  step(S,P,dt){const tau=P.R*1e3*P.C*1e-6;if(S.t<6*tau)S.t+=dt*tau;else{S.hold+=dt;if(S.hold>1.5){S.t=0;S.hold=0;}}const I=Math.exp(-S.t/tau);S.s+=(P.mode?1:-1)*60*I*dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const tau=P.R*1e3*P.C*1e-6,e=Math.exp(-S.t/tau),u=P.mode?P.U*(1-e):P.U*e,frac=u/12,L=40,R=W*0.5,T=H*0.2,B=H*0.8;
    c.strokeStyle=C.ink;c.lineWidth=2.5;c.strokeRect(L,T,R-L,B-T);const my=(T+B)/2;
    c.fillStyle=C.canvas;c.fillRect(L-14,my-14,28,28);c.globalAlpha=P.mode?1:0.3;line(c,L-16,my-8,L+16,my-8,C.ink,2.5);line(c,L-8,my+8,L+8,my+8,C.ink,5);c.globalAlpha=1;
    if(!P.mode){line(c,L+40,T-6,L+40,B+6,C.ink,2.5);txt(c,'manba uzilgan',L+48,my,C.muted);}
    const rx=(L+R)/2;c.fillStyle=C.canvas;c.fillRect(rx-34,T-12,68,24);c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(rx-34,T);for(let i=0;i<8;i++)c.lineTo(rx-28+i*8,T+(i%2?9:-9));c.lineTo(rx+34,T);c.stroke();txt(c,'R = '+P.R+' kΩ',rx,T-22,C.ink,{align:'center'});
    const pg=16,ph=Math.min(120,(B-T)*0.6);c.fillStyle=C.canvas;c.fillRect(R-pg,my-ph/2-4,pg*2,ph+8);line(c,R-pg/2,my-ph/2,R-pg/2,my+ph/2,C.ink,4);line(c,R+pg/2,my-ph/2,R+pg/2,my+ph/2,C.ink,4);
    const nq=Math.round(frac*10);for(let i=0;i<nq;i++){const y=my-ph/2+(i+0.5)*ph/10;txt(c,'+',R-pg/2-10,y,C.red,{align:'center',font:'600 13px sans-serif'});txt(c,'−',R+pg/2+10,y,C.accent,{align:'center',font:'600 13px sans-serif'});line(c,R-pg/2+3,y,R+pg/2-3,y,rgba('warm',0.6),1);}
    txt(c,'C',R+pg+18,my+ph/2+8,C.ink,{font:MATH});
    const per=2*((R-L)+(B-T)),pt=s=>{s=((s%per)+per)%per;if(s<B-T)return[L,B-s];s-=B-T;if(s<R-L)return[L+s,T];s-=R-L;if(s<B-T)return[R,T+s];s-=B-T;return[R-s,B];};
    c.fillStyle=C.accent;for(let i=0;i<40;i++){const p=pt(per*i/40-S.s);if(Math.abs(p[0]-R)<2&&Math.abs(p[1]-my)<ph/2+6)continue;c.beginPath();c.arc(p[0],p[1],3,0,TAU);c.fill();}
    const gx=W*0.6,gr=W-20,gt=H*0.14,gb=H*0.86,X=t=>gx+t/6*(gr-gx),Y=v=>gb-v*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);
    for(let k=1;k<=6;k++){line(c,X(k),gb,X(k),gb+5,C.muted,1);txt(c,k+'τ',X(k),gb+14,C.muted,{align:'center',font:SMALL});}
    line(c,gx,Y(0.63),X(1),Y(0.63),C.line,1,[3,3]);line(c,X(1),Y(0.63),X(1),gb,C.line,1,[3,3]);txt(c,'63 %',gx+4,Y(0.63)-8,C.muted,{font:SMALL});
    const cu=t=>P.mode?1-Math.exp(-t):Math.exp(-t),ci=t=>Math.exp(-t),tn=S.t/tau;
    [[cu,'accent','u_C'],[ci,'warm','i']].forEach(([f,col,lab],j)=>{c.strokeStyle=rgba(col,0.3);c.lineWidth=1.5;c.beginPath();for(let i=0;i<=120;i++){const t=i/20;c.lineTo(X(t),Y(f(t)));}c.stroke();
      c.strokeStyle=C[col];c.lineWidth=2.5;c.beginPath();for(let i=0;i<=Math.min(120,tn*20);i++){const t=i/20;c.lineTo(X(t),Y(f(t)));}c.stroke();disk(c,X(Math.min(6,tn)),Y(f(Math.min(6,tn))),4,C[col]);txt(c,lab,gr-4,gt+10+j*18,C[col],{align:'right',font:MATH});});
  },
  read:(S,P)=>{const tau=P.R*1e3*P.C*1e-6,e=Math.exp(-S.t/tau),u=P.mode?P.U*(1-e):P.U*e,I=P.U/(P.R*1e3)*e*1000;return[['Vaqt doimiysi τ',fmt(tau,2)+' s'],['Kondensator kuchlanishi',fmt(u,2)+' V'],['Tok kuchi',fmt(I,3)+' mA'],['Zaryad q',fmt(P.C*u/1000,3)+' mC'],['Energiya W',fmt(P.C*1e-6*u*u/2*1000,2)+' mJ']];}
});
