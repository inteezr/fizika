/* Majburiy tebranishlar va rezonans */
const rezA=(f,f0,b)=>{const w=TAU*f,w0=TAU*f0;return 1/Math.sqrt((w0*w0-w*w)**2+(2*b*w)**2);};
SIMS.push({id:'rezonans',cat:'teb',title:'Majburiy tebranishlar va rezonans',short:'ν = ν₀ ⇒ A → max',
  sub:'Tashqi davriy kuch chastotasi tizimning xususiy chastotasiga tenglashganda tebranish amplitudasi keskin ortadi. Bu hodisa rezonans deyiladi.',
  formula:`<span><i>A</i> = ${fr('<i>F</i><sub>0</sub>/<i>m</i>','√((<i>ω</i><sub>0</sub><sup>2</sup> − <i>ω</i><sup>2</sup>)<sup>2</sup> + 4<i>β</i><sup>2</sup><i>ω</i><sup>2</sup>)')}</span><span class="alt"><i>ν</i><sub>0</sub> = ${fr('1','2π')}${sq(fr('<i>k</i>','<i>m</i>'))}</span>`,
  text:['Prujinadagi yuk yuqoridagi tutqich orqali davriy tebratiladi. Tutqich chastotasi xususiy chastotadan uzoq bo‘lsa, yuk deyarli tebranmaydi. Chastotalar yaqinlashganda har bir turtki tebranishni kuchaytiradi.','So‘nish kichik bo‘lsa rezonans cho‘qqisi baland va tor bo‘ladi. Shuning uchun askarlar ko‘prikdan qadam tashlab o‘tmaydi, binolar esa zilzilaga qarshi so‘ndirgichlar bilan quriladi.'],
  legend:[['ν','majburlovchi kuch chastotasi'],['ν₀','xususiy chastota'],['β','so‘nish koeffitsienti'],['A','majburiy tebranish amplitudasi']],
  tries:['ν ni asta oshirib, amplituda eng katta bo‘ladigan joyni toping.','So‘nishni kamaytiring: cho‘qqi balandlashadi va torayadi.','ν ni ν₀ dan ikki marta katta qiling: yuk tutqichga teskari fazada tebranadi.'],
  params:[{id:'f',label:'Majburlovchi chastota',sym:'ν',min:0.2,max:2.5,step:0.01,val:0.7,unit:'Hz',d:2},{id:'f0',label:'Xususiy chastota',sym:'ν₀',min:0.5,max:1.5,step:0.01,val:1,unit:'Hz',d:2},{id:'b',label:'So‘nish',sym:'β',min:0.05,max:2,step:0.01,val:0.3,unit:'1/s',d:2}],
  init:()=>({x:0,v:0,t:0,ph:0,tr:[]}),
  step(S,P,dt){const n=20,h=dt/n,w0=TAU*P.f0;for(let i=0;i<n;i++){S.ph+=TAU*P.f*h;const d=Math.sin(S.ph)*0.3,a=-w0*w0*(S.x-d)-2*P.b*S.v;S.v+=a*h;S.x+=S.v*h;S.t+=h;}S.tr.push(S.x);if(S.tr.length>220)S.tr.shift();},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.22,top=40,d=Math.sin(S.ph)*0.3,sc=90,hy=top+d*sc*0.8,L=H*0.38,by=hy+L+S.x*sc*0.5;S.g={cx,top,hy,by};
    c.fillStyle=C.ink;c.fillRect(cx-60,hy-10,120,10);txt(c,'tutqich',cx+70,hy-5,C.muted,{font:SMALL});springLine(c,cx,hy,cx,by-22,14,14,C.ink);c.fillStyle=C.accent;rrect(c,cx-24,by-22,48,44,6);c.fill();
    const gx=W*0.42,gr=W-20,gt=H*0.12,gb=H*0.62,fm=2.5,Am=rezA(P.f0,P.f0,Math.min(P.b,2)),amax=Math.max(rezA(P.f0,P.f0,0.05),1e-9),X=f=>gx+f/fm*(gr-gx),Y=a=>gb-Math.min(1,a/amax*1)*(gb-gt);
    line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'A',gx+6,gt-6,C.muted,{font:MATH});txt(c,'ν, Hz',gr,gb+14,C.muted,{align:'right'});
    [0.05,0.3,1].forEach(bb=>{c.strokeStyle=rgba('muted',0.35);c.lineWidth=1;c.beginPath();for(let i=1;i<=200;i++){const f=fm*i/200;c.lineTo(X(f),Y(rezA(f,P.f0,bb)));}c.stroke();});
    c.strokeStyle=C.red;c.lineWidth=2.5;c.beginPath();for(let i=1;i<=200;i++){const f=fm*i/200;c.lineTo(X(f),Y(rezA(f,P.f0,P.b)));}c.stroke();line(c,X(P.f0),gb,X(P.f0),gt,C.line,1,[4,4]);txt(c,'ν₀',X(P.f0),gb+14,C.muted,{align:'center',font:MATH});disk(c,X(P.f),Y(rezA(P.f,P.f0,P.b)),6,C.green);
    const tx=gx,tw=gr-gx,ty=H*0.82;line(c,tx,ty,tx+tw,ty,C.line,1);c.strokeStyle=C.accent;c.lineWidth=2;c.beginPath();S.tr.forEach((x,i)=>{const X2=tx+i/220*tw,Y2=ty-x*40;i?c.lineTo(X2,Y2):c.moveTo(X2,Y2);});c.stroke();txt(c,'x(t)',tx,ty-50,C.muted,{font:SMALL});
  },
  read:(S,P)=>[['Chastotalar nisbati ν/ν₀',fmt(P.f/P.f0,2)],['Nisbiy amplituda',fmt(rezA(P.f,P.f0,P.b)/rezA(0.001,P.f0,P.b),1)+' marta'],['Rezonans cho‘qqisi',fmt(rezA(P.f0,P.f0,P.b)/rezA(0.001,P.f0,P.b),1)+' marta'],['Xususiy davr T₀',fmt(1/P.f0,2)+' s']]
});
