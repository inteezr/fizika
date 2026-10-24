/* Turg‘un to‘lqin */
SIMS.push({id:'turgun',cat:'teb',title:'Turg‘un to‘lqinlar (tor tebranishi)',short:'ν = nv / 2L',
  sub:'Ikki uchi mahkamlangan torda faqat ma’lum chastotali to‘lqinlar turg‘un holda yashaydi.',
  formula:`<span><i>ν</i><sub><i>n</i></sub> = ${fr('<i>nv</i>','2<i>L</i>')}</span><span class="alt"><i>L</i> = <i>n</i>${fr('<i>λ</i>','2')} &nbsp; <i>v</i> = ${sq(fr('<i>T</i>','<i>μ</i>'))}</span>`,
  text:['Tor bo‘ylab yugurgan to‘lqin uchlaridan qaytadi va o‘ziga qarshi kelayotgan to‘lqin bilan qo‘shiladi. Natijada joyida turgan to‘lqin hosil bo‘ladi: ba’zi nuqtalar umuman tebranmaydi (tugunlar), ba’zilari eng katta amplituda bilan tebranadi (do‘ngliklar).','Torning uzunligiga yarim to‘lqin uzunliklarining butun soni joylashishi kerak. Shuning uchun gitara tori asosiy ton va uning garmonikalari (2, 3, 4… marta yuqori chastotalar) bilan tovush chiqaradi.'],
  legend:[['n','garmonika raqami'],['L','tor uzunligi, m'],['v','to‘lqin tezligi, m/s'],['λ','to‘lqin uzunligi'],['ν','chastota, Hz']],
  tries:['n ni oshiring: tugunlar soni n + 1 ta bo‘ladi.','Tor uzunligini 2 marta qisqartiring: chastota 2 marta ortadi (gitarada barmoq bosish).','v ni oshiring (torni taranglang): ovoz balandlashadi.'],
  params:[{id:'n',label:'Garmonika',sym:'n',min:1,max:8,step:1,val:3,unit:'',d:0},{id:'L',label:'Tor uzunligi',sym:'L',min:0.3,max:1.5,step:0.05,val:0.65,unit:'m',d:2},{id:'v',label:'To‘lqin tezligi',sym:'v',min:50,max:500,step:10,val:280,unit:'m/s',d:0}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const x0=40,x1=W-40,y0=H*0.45,A=H*0.22,k=Math.PI*P.n,w=TAU*0.3*P.n,Y=u=>y0-A*Math.sin(k*u)*Math.cos(w*S.t);
    c.strokeStyle=rgba('accent',0.18);c.lineWidth=1;for(const s of[1,-1]){c.beginPath();for(let i=0;i<=200;i++){const u=i/200;c.lineTo(x0+u*(x1-x0),y0-s*A*Math.sin(k*u));}c.stroke();}
    c.strokeStyle=C.accent;c.lineWidth=3;c.beginPath();for(let i=0;i<=300;i++){const u=i/300;c.lineTo(x0+u*(x1-x0),Y(u));}c.stroke();
    c.fillStyle=C.ink;c.fillRect(x0-14,y0-40,10,80);c.fillRect(x1+4,y0-40,10,80);
    for(let j=0;j<=P.n;j++){const x=x0+j/P.n*(x1-x0);disk(c,x,y0,5,C.red);if(P.n<=6||j%2===0)txt(c,'T',x,y0+22,C.red,{align:'center',font:SMALL});}
    for(let j=0;j<P.n;j++){const x=x0+(j+0.5)/P.n*(x1-x0);txt(c,'D',x,y0-A-14,C.green,{align:'center',font:SMALL});}
    const lam=2*P.L/P.n,lpx=lam/P.L*(x1-x0);if(lpx<x1-x0+1){const yy=H*0.86;line(c,x0,yy,x0+lpx,yy,C.warm,1.5);line(c,x0,yy-6,x0,yy+6,C.warm,1.5);line(c,x0+lpx,yy-6,x0+lpx,yy+6,C.warm,1.5);txt(c,'λ = '+fmt(lam,2)+' m',x0+lpx/2,yy-12,C.warm,{align:'center'});}
    txt(c,'T — tugun, D — do‘nglik',W-16,H-12,C.muted,{align:'right'});
  },
  read:(S,P)=>[['Chastota ν',fmt(P.n*P.v/(2*P.L),0)+' Hz'],['Asosiy ton ν₁',fmt(P.v/(2*P.L),0)+' Hz'],['To‘lqin uzunligi λ',fmt(2*P.L/P.n,3)+' m'],['Tugunlar soni',String(P.n+1)]]
});
