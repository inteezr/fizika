/* Tepkilar (to‘lqinlar urilishi) */
SIMS.push({id:'tepki',cat:'teb',title:'Tepkilar: yaqin chastotalarning qo‘shilishi',short:'f_t = |f₁ − f₂|',
  sub:'Chastotalari yaqin ikki tebranish qo‘shilganda natijaviy tovush davriy kuchayib-susayadi. Bir soniyadagi kuchayishlar soni chastotalar farqiga teng.',
  formula:`<span><i>f</i><sub>t</sub> = |<i>f</i><sub>1</sub> − <i>f</i><sub>2</sub>|</span><span class="alt"><i>y</i> = 2<i>A</i> cos(π Δ<i>f t</i>) · sin(π(<i>f</i><sub>1</sub>+<i>f</i><sub>2</sub>)<i>t</i>)</span>`,
  text:['Ikkita kamerton deyarli bir xil chastotada tebransin. Ba’zi onlarda ularning tebranishlari bir fazada bo‘lib, bir-birini kuchaytiradi, yarim tepki davridan keyin esa qarama-qarshi fazada bo‘lib, so‘ndiradi.','Natijada o‘rtacha (f₁ + f₂)/2 chastotali tebranish hosil bo‘ladi, uning amplitudasi esa |f₁ − f₂| chastota bilan “nafas oladi”. Sozandalar torli asboblarni sozlashda tepkilar yo‘qolguncha torni tortadi.'],
  legend:[['f₁, f₂','kamertonlar chastotalari, Hz'],['f_t','tepkilar chastotasi, Hz'],['A','har bir tebranish amplitudasi']],
  tries:['f₁ va f₂ ni tenglashtiring: tepkilar yo‘qoladi, tovush bir tekis bo‘ladi.','Farqni 1 Hz qiling: qobiq chizig‘i soniyasiga bir marta kuchayadi.','Farqni oshiring: tepkilar tezlashadi va alohida eshitilmay qoladi.'],
  params:[{id:'f1',label:'1-kamerton chastotasi',sym:'f₁',min:10,max:30,step:0.1,val:20,unit:'Hz',d:1},{id:'f2',label:'2-kamerton chastotasi',sym:'f₂',min:10,max:30,step:0.1,val:21.5,unit:'Hz',d:1}],
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt*0.5;},
  draw(c,W,H,S,P){grid(c,W,H,28);const gx=110,gr=W-16,T=2,X=t=>gx+(t-(S.t-T))/T*(gr-gx),rows=[[H*0.15,C.accent,P.f1,'f₁'],[H*0.36,C.warm,P.f2,'f₂']],sy=H*0.7,A=Math.min(22,H*0.07);S.g={sy,A};
    const y1=t=>Math.sin(TAU*P.f1*t),y2=t=>Math.sin(TAU*P.f2*t),N=Math.min(1600,(gr-gx)*2);
    rows.forEach(([cy,col,f,l],k)=>{line(c,gx,cy,gr,cy,rgba('muted',0.4),1);txt(c,l+' = '+fmt(f,1)+' Hz',14,cy,col,{});c.strokeStyle=col;c.lineWidth=1.6;c.beginPath();for(let i=0;i<=N;i++){const t=S.t-T+T*i/N,y=cy-(k?y2(t):y1(t))*A;i?c.lineTo(X(t),y):c.moveTo(X(t),y);}c.stroke();});
    line(c,gx,sy,gr,sy,rgba('muted',0.4),1);txt(c,'yig‘indi',14,sy,C.ink,{});const df=Math.abs(P.f1-P.f2);
    c.setLineDash([5,4]);c.strokeStyle=rgba('red',0.8);c.lineWidth=1.5;[1,-1].forEach(sg=>{c.beginPath();for(let i=0;i<=200;i++){const t=S.t-T+T*i/200,y=sy-sg*2*A*Math.abs(Math.cos(Math.PI*df*t));i?c.lineTo(X(t),y):c.moveTo(X(t),y);}c.stroke();});c.setLineDash([]);
    c.strokeStyle=C.ink;c.lineWidth=1.8;c.beginPath();for(let i=0;i<=N;i++){const t=S.t-T+T*i/N,y=sy-(y1(t)+y2(t))*A;i?c.lineTo(X(t),y):c.moveTo(X(t),y);}c.stroke();
    const amp=Math.abs(Math.cos(Math.PI*df*S.t));const lx=60,ly=H*0.9;for(let i=1;i<=3;i++){c.strokeStyle=rgba('accent',amp*(1-i*0.25));c.lineWidth=2.5;c.beginPath();c.arc(lx,ly,8+i*9*amp+2,-0.8,0.8);c.stroke();}disk(c,lx-6,ly,7,C.ink);
    txt(c,'tovush balandligi',lx+50,ly,C.muted,{font:SMALL});
  },
  read(S,P){const df=Math.abs(P.f1-P.f2);return[['Tepkilar chastotasi',fmt(df,1)+' Hz'],['Tepki davri',df>0.01?fmt(1/df,2)+' s':'∞'],['O‘rtacha chastota',fmt((P.f1+P.f2)/2,2)+' Hz'],['Hozirgi amplituda',fmt(2*Math.abs(Math.cos(Math.PI*df*S.t)),2)+' A']];}
});
