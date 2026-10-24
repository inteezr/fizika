/* To‘la zanjir uchun Om qonuni */
SIMS.push({id:'tolazanjir',cat:'tok',title:'To‘la zanjir uchun Om qonuni',short:'I = ε/(R + r)',
  sub:'Tok manbaining o‘z ichki qarshiligi bor. Tashqi qarshilik kamaygan sari tok ortadi, lekin qisqichlardagi kuchlanish kamayadi.',
  formula:`<span><i>I</i> = ${fr('<i>ε</i>','<i>R</i> + <i>r</i>')}</span><span class="alt"><i>U</i> = <i>ε</i> − <i>Ir</i> &nbsp; <i>P</i><sub>max</sub> da <i>R</i> = <i>r</i></span>`,
  text:['EYuK — manba zaryadlarni zanjir bo‘ylab haydashda bajaradigan ish. Uning bir qismi manbaning ichki qarshiligida «yo‘qoladi», shuning uchun voltmetr qisqichlarda ε dan kichik kuchlanish ko‘rsatadi.','Tashqi zanjirdagi foydali quvvat R = r bo‘lganda eng katta bo‘ladi (pastdagi grafik). R = 0 bo‘lsa qisqa tutashuv yuz beradi: tok eng katta, foydali quvvat esa nol.'],
  legend:[['ε','manbaning EYuK, V'],['r','ichki qarshilik, Ω'],['R','tashqi qarshilik, Ω'],['U','qisqichlardagi kuchlanish'],['η','FIK = R/(R + r)']],
  tries:['R ni r ga tenglashtiring: quvvat grafigi cho‘qqisiga yetadi.','R ni 0 ga yaqinlashtiring: tok keskin ortadi, kuchlanish nolga tushadi.','R juda katta bo‘lganda voltmetr deyarli ε ni ko‘rsatishini tekshiring.'],
  params:[{id:'E',label:'EYuK',sym:'ε',min:1.5,max:24,step:0.5,val:12,unit:'V',d:1},{id:'r',label:'Ichki qarshilik',sym:'r',min:0.1,max:10,step:0.1,val:2,unit:'Ω',d:1},{id:'R',label:'Tashqi qarshilik',sym:'R',min:0,max:30,step:0.1,val:6,unit:'Ω',d:1}],
  init:()=>({s:0}),step(S,P,dt){const I=P.E/(P.R+P.r);S.s+=30*Math.pow(I,0.6)*dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const I=P.E/(P.R+P.r),U=I*P.R,L=40,R=W*0.55,T=H*0.15,B=H*0.6,my=(T+B)/2;S.g={L,R,T,B,my};
    c.strokeStyle=C.ink;c.lineWidth=2.5;c.strokeRect(L,T,R-L,B-T);c.setLineDash([5,4]);c.strokeStyle=C.muted;c.strokeRect(L-26,my-46,52,92);c.setLineDash([]);txt(c,'manba',L,my-56,C.muted,{align:'center',font:SMALL});
    c.fillStyle=C.canvas;c.fillRect(L-14,my-30,28,26);line(c,L-16,my-24,L+16,my-24,C.ink,2.5);line(c,L-8,my-10,L+8,my-10,C.ink,5);txt(c,'ε',L+22,my-17,C.ink,{font:MATH});
    c.fillStyle=C.canvas;c.fillRect(L-8,my+4,16,30);c.strokeStyle=C.ink;c.lineWidth=2;c.strokeRect(L-6,my+6,12,26);txt(c,'r',L+16,my+19,C.ink,{font:MATH});
    const rx=(L+R)/2;c.fillStyle=C.canvas;c.fillRect(rx-34,T-12,68,24);c.strokeStyle=C.ink;c.lineWidth=2.5;c.strokeRect(rx-30,T-9,60,18);txt(c,'R = '+fmt(P.R,1)+' Ω',rx,T-24,C.ink,{align:'center'});
    disk(c,R,my,18,C.canvas,C.ink);txt(c,'A',R,my,C.ink,{align:'center',font:'600 15px sans-serif'});txt(c,fmt(I,2)+' A',R+26,my,C.accent);
    line(c,rx-30,T,rx-30,T+50,C.muted,1.5);line(c,rx+30,T,rx+30,T+50,C.muted,1.5);line(c,rx-30,T+50,rx-18,T+50,C.muted,1.5);line(c,rx+18,T+50,rx+30,T+50,C.muted,1.5);disk(c,rx,T+50,18,C.canvas,C.muted);txt(c,'V',rx,T+50,C.ink,{align:'center',font:'600 15px sans-serif'});txt(c,fmt(U,2)+' V',rx,T+82,C.green,{align:'center'});
    const per=2*((R-L)+(B-T)),pt=s=>{s=((s%per)+per)%per;if(s<B-T)return[L,B-s];s-=B-T;if(s<R-L)return[L+s,T];s-=R-L;if(s<B-T)return[R,T+s];s-=B-T;return[R-s,B];};c.fillStyle=C.accent;for(let i=0;i<40;i++){const p=pt(per*i/40-S.s);c.beginPath();c.arc(p[0],p[1],3,0,TAU);c.fill();}
    const gx=W*0.62,gr=W-20,gt=H*0.12,gb=H*0.88,Pm=P.E*P.E/(4*P.r),X=r=>gx+r/30*(gr-gx),Y=p=>gb-p/Pm*(gb-gt)*0.9;line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'P, W',gx+6,gt-6,C.muted);txt(c,'R, Ω',gr,gb+14,C.muted,{align:'right'});
    c.strokeStyle=C.warm;c.lineWidth=2.5;c.beginPath();for(let i=0;i<=150;i++){const r=i/150*30,p=P.E*P.E*r/((r+P.r)**2);i?c.lineTo(X(r),Y(p)):c.moveTo(X(r),Y(p));}c.stroke();line(c,X(P.r),gb,X(P.r),gt,C.line,1,[4,4]);txt(c,'R = r',X(P.r),gt-6,C.muted,{align:'center',font:SMALL});disk(c,X(P.R),Y(I*I*P.R),6,C.red);
  },
  read:(S,P)=>{const I=P.E/(P.R+P.r);return[['Tok kuchi I',fmt(I,2)+' A'],['Qisqichlardagi kuchlanish U',fmt(I*P.R,2)+' V'],['Foydali quvvat',fmt(I*I*P.R,2)+' W'],['FIK η',fmt(P.R/(P.R+P.r)*100,0)+' %'],['Qisqa tutashuv toki',fmt(P.E/P.r,1)+' A']];}
});
