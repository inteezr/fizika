/* Yung tajribasi va difraksion panjara */
function yungI(th,P){const lam=P.lam*1e-9,d=P.d*1e-6,a=d*0.3,ph=Math.PI*d*Math.sin(th)/lam,b=Math.PI*a*Math.sin(th)/lam,N=P.N,num=Math.sin(N*ph),den=Math.sin(ph),grat=Math.abs(den)<1e-6?N*N:(num/den)**2,sing=Math.abs(b)<1e-6?1:(Math.sin(b)/b)**2;return grat*sing/(N*N);}
SIMS.push({id:'yung',cat:'opt',title:'Yorug‘lik interferensiyasi va difraksion panjara',short:'d·sinφ = kλ',
  sub:'Bir nechta tirqishdan o‘tgan yorug‘lik to‘lqinlari qo‘shilib, ekranda yorug‘ va qorong‘i yo‘llar hosil qiladi. Tirqishlar ko‘paygan sari yorug‘ chiziqlar ingichka va yorqin bo‘ladi.',
  formula:`<span><i>d</i> sin<i>φ</i> = <i>kλ</i></span><span class="alt"><i>k</i> = 0, ±1, ±2, … &nbsp; <i>Δx</i> = ${fr('<i>λL</i>','<i>d</i>')}</span>`,
  text:['Yung tajribasida (N = 2) ikki tirqishdan chiqqan kogerent to‘lqinlar yo‘l farqi λ ning butun soniga teng bo‘lgan joylarda bir-birini kuchaytiradi. Yarim butun songa teng bo‘lgan joylarda esa so‘ndiradi.','Difraksion panjarada tirqishlar juda ko‘p. Maksimumlar o‘sha joylarda qoladi, lekin ancha ingichka va yorqin bo‘ladi. Shuning uchun panjara yorug‘likni ranglarga ajratishda (spektroskopda) ishlatiladi.'],
  legend:[['d','panjara davri (tirqishlar orasi)'],['φ','maksimum yo‘nalishi burchagi'],['k','maksimum tartibi'],['λ','to‘lqin uzunligi'],['L','ekrangacha masofa, 1 m']],
  tries:['N = 2 dan N = 20 ga o‘ting: chiziqlar torayadi, joylashuvi o‘zgarmaydi.','Qizil (650 nm) va binafsha (420 nm) nurlarni solishtiring: qizil ko‘proq og‘adi.','d ni kamaytiring: maksimumlar bir-biridan uzoqlashadi.'],
  params:[{id:'lam',label:'To‘lqin uzunligi',sym:'λ',min:400,max:700,step:5,val:550,unit:'nm',d:0},{id:'d',label:'Tirqishlar orasi',sym:'d',min:2,max:20,step:0.5,val:6,unit:'mkm',d:1},{id:'N',label:'Tirqishlar soni',choices:[[2,'2 (Yung)'],[5,'5'],[20,'20 (panjara)']],val:2}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){c.fillStyle=C.canvas;c.fillRect(0,0,W,H);grid(c,W,H,28);const col=wl2rgb(P.lam),sx=W*0.2,scx=W*0.62,cy=H/2,thm=0.35;S.g={sx,scx,cy,thm};
    c.fillStyle=rgba('ink',0.08);c.fillRect(0,cy-14,sx,28);const bm=c.createLinearGradient(0,0,sx,0);bm.addColorStop(0,'rgba(0,0,0,0)');bm.addColorStop(1,col);c.globalAlpha=0.5;c.fillStyle=bm;c.fillRect(0,cy-10,sx,20);c.globalAlpha=1;
    c.fillStyle=C.ink;const sp=Math.min(14,120/P.N),n=P.N;c.fillRect(sx-3,10,6,H-20);c.fillStyle=C.canvas;for(let i=0;i<n;i++){const y=cy+(i-(n-1)/2)*sp;c.fillRect(sx-3,y-1.5,6,3);}
    const lam=24,k=TAU/lam;c.globalAlpha=0.3;c.strokeStyle=col;c.lineWidth=1.2;for(let i=0;i<Math.min(n,5);i++){const y=cy+(i-(Math.min(n,5)-1)/2)*sp*(n>5?n/5:1);for(let r=((S.t*40)%lam);r<scx-sx;r+=lam){c.beginPath();c.arc(sx,y,r,-1.2,1.2);c.stroke();}}c.globalAlpha=1;
    const gx=scx+20,gr=W-16;for(let y=10;y<H-10;y+=2){const th=(y-cy)/(H/2)*thm,I=yungI(th,P);c.fillStyle=col;c.globalAlpha=Math.min(1,I*1.2);c.fillRect(scx-6,y,12,2);c.globalAlpha=1;}
    c.strokeStyle=col;c.lineWidth=2;c.beginPath();for(let y=10;y<H-10;y+=1){const th=(y-cy)/(H/2)*thm,I=yungI(th,P),x=gx+I*(gr-gx);y===10?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();line(c,gx,10,gx,H-10,C.line,1);
    const kmax=Math.floor(P.d*1e-6/(P.lam*1e-9));for(let kk=-3;kk<=3;kk++){const s=kk*P.lam*1e-9/(P.d*1e-6);if(Math.abs(s)>=1)continue;const th=Math.asin(s);if(Math.abs(th)>thm)continue;const y=cy+th/thm*(H/2);txt(c,'k='+kk,gr,y-8,C.muted,{align:'right',font:SMALL});}
  },
  read:(S,P)=>{const s1=P.lam*1e-9/(P.d*1e-6);return[['1-tartib maksimum burchagi',s1<1?fmt(Math.asin(s1)/D2R,2)+'°':'—'],['Ekranda Δx (L = 1 m)',fmt(P.lam*1e-9/(P.d*1e-6)*100,2)+' sm'],['Eng katta tartib k',String(Math.floor(P.d*1e3/P.lam))],['Rang',P.lam<450?'binafsha':P.lam<495?'ko‘k':P.lam<570?'yashil':P.lam<590?'sariq':P.lam<620?'to‘q sariq':'qizil']];}
});
