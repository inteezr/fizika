/* Radioaktiv yemirilish */
function yInit(){return{t:0,a:new Array(400).fill(1),h:[[0,400]],flash:new Array(400).fill(0)};}
SIMS.push({id:'yemirilish',cat:'yad',title:'Radioaktiv yemirilish qonuni',short:'N = N₀·2^(−t/T)',
  sub:'Har bir yarim yemirilish davri o‘tganda radioaktiv yadrolarning yarmi parchalanadi.',
  formula:`<span><i>N</i> = <i>N</i><sub>0</sub> · 2<sup>−<i>t</i>/<i>T</i></sup></span><span class="alt"><i>T</i> — yarim yemirilish davri</span>`,
  text:['Har bir yadro qachon parchalanishini oldindan aytib bo‘lmaydi — bu tasodifiy jarayon. Lekin yadrolar ko‘p bo‘lsa, umumiy qonuniyat aniq: T vaqt ichida taxminan yarmi, 2T da to‘rtdan uchi parchalanadi.','Kvadratchalar — 400 ta yadro. Parchalangan yadro kulrang tusga kiradi. Grafikda haqiqiy son (qizil) nazariy egri chiziq (punktir) atrofida tasodifiy tebranadi. Radiouglerod usuli bilan qadimiy buyumlar yoshi shu qonun asosida aniqlanadi.'],
  legend:[['N₀','boshlang‘ich yadrolar soni'],['N','t vaqtdan keyin qolgan yadrolar'],['T','yarim yemirilish davri'],['t','vaqt']],
  tries:['T ga teng vaqt o‘tganda yadrolar soni 200 ga yaqin ekanini tekshiring.','«Qaytadan» tugmasini bir necha marta bosing: har safar natija biroz farq qiladi.','T ni kichraytiring: yemirilish tezlashadi.'],
  params:[{id:'T',label:'Yarim yemirilish davri',sym:'T',min:1,max:10,step:0.5,val:3,unit:'s',d:1,reset:1}],
  init:yInit,
  step(S,P,dt){if(S.t>5.5*P.T){S.hold=(S.hold||0)+dt;if(S.hold>2)Object.assign(S,yInit(),{hold:0});return;}S.t+=dt;const p=1-Math.pow(2,-dt/P.T);for(let i=0;i<400;i++){if(S.a[i]&&Math.random()<p){S.a[i]=0;S.flash[i]=1;}S.flash[i]=Math.max(0,S.flash[i]-dt*2);}
    if(S.t-S.h[S.h.length-1][0]>0.05)S.h.push([S.t,S.a.reduce((x,y)=>x+y,0)]);},
  draw(c,W,H,S,P){grid(c,W,H,28);const sz=Math.min(H*0.86,W*0.44),cell=sz/20,ox=16,oy=(H-sz)/2;
    for(let i=0;i<400;i++){const x=ox+(i%20)*cell,y=oy+Math.floor(i/20)*cell;c.fillStyle=S.a[i]?C.green:rgba('muted',0.25);c.fillRect(x+1,y+1,cell-2,cell-2);if(S.flash[i]>0){c.fillStyle=rgba('warm',S.flash[i]);c.fillRect(x+1,y+1,cell-2,cell-2);}}
    const gx=ox+sz+44,gr=W-16,gt=H*0.1,gb=H*0.86,tm=5*P.T,X=t=>gx+t/tm*(gr-gx),Y=n=>gb-n/400*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'N',gx+6,gt-6,C.muted,{font:MATH});
    for(let k=1;k<=5;k++){line(c,X(k*P.T),gb,X(k*P.T),gb+5,C.muted,1);txt(c,k+'T',X(k*P.T),gb+14,C.muted,{align:'center',font:SMALL});line(c,gx,Y(400/2**k),X(k*P.T),Y(400/2**k),C.line,1,[2,4]);}
    [400,200,100].forEach(n=>txt(c,n+'',gx-6,Y(n),C.muted,{align:'right',font:SMALL}));
    c.strokeStyle=C.muted;c.lineWidth=1.5;c.setLineDash([5,5]);c.beginPath();for(let i=0;i<=100;i++){const t=tm*i/100;c.lineTo(X(t),Y(400*2**(-t/P.T)));}c.stroke();c.setLineDash([]);
    c.strokeStyle=C.red;c.lineWidth=2.5;c.beginPath();S.h.forEach(([t,n],i)=>{if(t>tm)return;i?c.lineTo(X(t),Y(n)):c.moveTo(X(t),Y(n));});c.stroke();
  },
  read:(S,P)=>{const N=S.a.reduce((x,y)=>x+y,0);return[['Vaqt t',fmt(S.t,1)+' s ('+fmt(S.t/P.T,2)+' T)'],['Qolgan yadrolar N',String(N)],['Nazariy N',fmt(400*2**(-S.t/P.T),0)],['Parchalangan',String(400-N)]];}
});
