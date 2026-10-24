/* Termodinamikaning birinchi qonuni */
SIMS.push({id:'birinchiqonun',cat:'trm',title:'Termodinamikaning birinchi qonuni',short:'Q = ΔU + A',
  sub:'Gazga berilgan issiqlik uning ichki energiyasini oshirishga va tashqi kuchlarga qarshi ish bajarishga sarflanadi. Taqsimot jarayon turiga bog‘liq.',
  formula:`<span><i>Q</i> = Δ<i>U</i> + <i>A</i></span><span class="alt">Δ<i>U</i> = ${fr('3','2')}<i>νR</i>Δ<i>T</i>, &nbsp;<i>A</i> = <i>p</i>Δ<i>V</i></span>`,
  text:['Bir atomli ideal gazning ichki energiyasi faqat haroratga bog‘liq: U = (3/2)νRT. Izoxorik jarayonda hajm o‘zgarmaydi, ish nolga teng va barcha issiqlik ichki energiyaga o‘tadi: Q = ΔU.','Izobarik jarayonda porshen ko‘tariladi: issiqlikning 3/5 qismi ichki energiyaga, 2/5 qismi ishga ketadi (Q = (5/2)νRΔT). Izotermik jarayonda harorat o‘zgarmaydi, ΔU = 0, barcha issiqlik ishga aylanadi: Q = A = νRT·ln(V₂/V₁).'],
  legend:[['Q','gazga berilgan issiqlik miqdori, J'],['ΔU','ichki energiya o‘zgarishi, J'],['A','gaz bajargan ish, J'],['ν','modda miqdori (1 mol)']],
  tries:['Uchala jarayonda bir xil Q berib, ΔU va A ustunlarini solishtiring.','Izobarik jarayonda A/Q = 0,4 ekanini tekshiring.','pV diagrammadagi chiziq ostidagi yuza gaz bajargan ishga teng.'],
  params:[{id:'pr',label:'Jarayon',choices:[[0,'Izoxorik'],[1,'Izobarik'],[2,'Izotermik']],val:1,reset:1},{id:'Q',label:'Beriladigan issiqlik',sym:'Q',min:100,max:3000,step:50,val:1500,unit:'J',d:0,reset:1}],
  init:()=>({q:0,hold:0}),
  step(S,P,dt){if(S.q<1){S.q=Math.min(1,S.q+dt/3.5);}else{S.hold+=dt;if(S.hold>2)Object.assign(S,{q:0,hold:0});}},
  state(P,f){const R=8.314,T0=300,V0=0.0249,p0=R*T0/V0,Q=P.Q*f;if(P.pr===0){const dT=Q/(1.5*R);return{T:T0+dT,V:V0,p:R*(T0+dT)/V0,dU:Q,A:0};}
    if(P.pr===1){const dT=Q/(2.5*R);return{T:T0+dT,V:R*(T0+dT)/p0,p:p0,dU:1.5*R*dT,A:R*dT};}
    const V=V0*Math.exp(Q/(R*T0));return{T:T0,V,p:R*T0/V,dU:0,A:Q};},
  draw(c,W,H,S,P,tt){grid(c,W,H,28);const sim=SIMS.find(s=>s.id==='birinchiqonun'),st=sim.state(P,S.q),V0=0.0249,cx=W*0.17,cw=Math.min(110,W*0.17),cb=H-40,ch=H*0.62,hV=ch*0.88/sim.state(P,1).V,py=cb-st.V*hV;S.g={cx,cw,cb,py};
    c.fillStyle=`rgba(255,${Math.round(200-120*(st.T-300)/500)},80,${0.12+0.3*clamp((st.T-300)/500,0,1)})`;c.fillRect(cx-cw/2,py,cw,cb-py);
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(cx-cw/2,cb-ch);c.lineTo(cx-cw/2,cb);c.lineTo(cx+cw/2,cb);c.lineTo(cx+cw/2,cb-ch);c.stroke();
    if(P.pr===0){c.fillStyle=C.ink;c.fillRect(cx-cw/2-6,py-10,6,20);c.fillRect(cx+cw/2,py-10,6,20);}
    c.fillStyle=C.muted;c.fillRect(cx-cw/2+2,py-12,cw-4,12);line(c,cx,py-12,cx,py-40,C.ink,3);c.fillStyle=C.accent;c.fillRect(cx-22,py-60,44,20);
    for(let i=0;i<5;i++){const fx=cx-cw/2+cw*(0.1+i*0.2);if(S.q<1){c.fillStyle=`rgba(255,${130+60*Math.sin(tt*10+i)},40,0.7)`;c.beginPath();c.ellipse(fx,cb+14,6,9+3*Math.sin(tt*14+i),0,0,TAU);c.fill();}}
    if(S.q<1)arrow(c,cx-cw/2-30,cb+4,cx-cw/2-30,cb-40,C.red,2.5,'Q');
    const gx=W*0.36,gw=W*0.32,gt=H*0.12,gb=H*0.78,Vm=Math.max(V0*1.6,sim.state(P,1).V*1.1),pm=8.314*800/V0,X=V=>gx+(V-V0*0.8)/(Vm-V0*0.8)*gw,Y=p=>gb-p/pm*(gb-gt);
    line(c,gx,gb,gx+gw,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'p',gx-12,gt+4,C.muted,{font:MATH});txt(c,'V',gx+gw,gb+14,C.muted,{font:MATH});
    c.fillStyle=rgba('accent',0.18);c.beginPath();c.moveTo(X(V0),gb);const N=60;for(let i=0;i<=N;i++){const s2=sim.state(P,S.q*i/N);c.lineTo(X(s2.V),Y(s2.p));}c.lineTo(X(st.V),gb);c.closePath();c.fill();
    c.strokeStyle=C.accent;c.lineWidth=2.5;c.beginPath();for(let i=0;i<=N;i++){const s2=sim.state(P,S.q*i/N);i?c.lineTo(X(s2.V),Y(s2.p)):c.moveTo(X(s2.V),Y(s2.p));}c.stroke();disk(c,X(st.V),Y(st.p),5,C.red);
    if(st.A>1)txt(c,'A',X((V0+st.V)/2),gb-14,C.accent,{font:MATH,align:'center'});
    const bx=W*0.74,bw=Math.min(40,(W-bx-20)/3-8),bb=gb,bt=gt,Qs=P.Q;[['Q',P.Q*S.q,C.red],['ΔU',st.dU,C.warm],['A',st.A,C.accent]].forEach(([l,v,col],i)=>{const x=bx+i*(bw+12),hh=v/Qs*(bb-bt);c.fillStyle=rgba('muted',0.15);c.fillRect(x,bt,bw,bb-bt);c.fillStyle=col;c.fillRect(x,bb-hh,bw,hh);txt(c,l,x+bw/2,bb+14,C.ink,{align:'center',font:MATH});txt(c,fmt(v,0),x+bw/2,bt-10,C.ink,{align:'center',font:SMALL});});
    txt(c,'J',bx+3*(bw+12),bt-10,C.muted,{font:SMALL});
  },
  read(S,P){const st=SIMS.find(s=>s.id==='birinchiqonun').state(P,S.q);return[['Harorat T',fmt(st.T,1)+' K'],['Hajm V',fmt(st.V*1000,2)+' L'],['Bosim p',fmt(st.p/1000,1)+' kPa'],['ΔU + A',fmt(st.dU+st.A,0)+' J (= Q)']];}
});
