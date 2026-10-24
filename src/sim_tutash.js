/* Tutash idishlar */
const TT_B=[[1000,'Suv'],[13600,'Simob']],TT_A=[[1000,'Suv'],[900,'Yog‘'],[800,'Kerosin']];
SIMS.push({id:'tutash',cat:'sta',title:'Tutash idishlar',short:'ρ₁h₁ = ρ₂h₂',
  sub:'Bir xil suyuqlik tutash idishlarda bir sathda turadi. Har xil suyuqliklarda esa ustunlar balandligi zichliklarga teskari proporsional bo‘ladi.',
  formula:`<span><i>ρ</i><sub>1</sub><i>h</i><sub>1</sub> = <i>ρ</i><sub>2</sub><i>h</i><sub>2</sub></span><span class="alt">${fr('<i>h</i><sub>1</sub>','<i>h</i><sub>2</sub>')} = ${fr('<i>ρ</i><sub>2</sub>','<i>ρ</i><sub>1</sub>')}</span>`,
  text:['U shaklidagi naychaning chap tirsagiga boshqa suyuqlik quyamiz. Ikki suyuqlik chegarasidan o‘tgan gorizontal sathda ikkala tirsakdagi bosim teng bo‘lishi kerak, aks holda suyuqlik oqadi.','Shu sathdan yuqorida chapda h₂ balandlikdagi qo‘shilgan suyuqlik, o‘ngda h₁ balandlikdagi asosiy suyuqlik turadi: ρ₁gh₁ = ρ₂gh₂. Yengil suyuqlik ustuni balandroq bo‘ladi. Suyuqliklar bir xil bo‘lsa, sathlar tenglashadi.'],
  legend:[['ρ₁','asosiy suyuqlik zichligi, kg/m³'],['ρ₂','qo‘shilgan suyuqlik zichligi, kg/m³'],['h₁','asosiy suyuqlik ustuni (chegaradan yuqori), sm'],['h₂','qo‘shilgan suyuqlik ustuni, sm']],
  tries:['Asosiy suyuqlikni simob, qo‘shilganini suv qiling: 13,6 sm suv ustuni 1 sm simob ustunini muvozanatlaydi.','Ikkala suyuqlikni ham suv qiling: sathlar bir xil bo‘lib qoladi.','Qo‘shilgan suyuqlik miqdorini o‘zgartiring: suyuqlik bir oz tebranib, yangi muvozanatga keladi.'],
  params:[{id:'b',label:'Asosiy suyuqlik',choices:[[0,'Suv'],[1,'Simob']],val:0,reset:1},{id:'a',label:'Qo‘shilgan suyuqlik',choices:[[0,'Suv'],[1,'Yog‘'],[2,'Kerosin']],val:1},{id:'h2',label:'Qo‘shilgan ustun',sym:'h₂',min:0,max:30,step:0.5,val:18,unit:'sm',d:1}],
  init:()=>({d:0,v:0}),
  step(S,P,dt){const r1=TT_B[P.b][0],r2=TT_A[P.a][0],h2=P.h2/100,L=0.7,n=8,h=dt/n;for(let i=0;i<n;i++){const a=9.8*(r2*h2/r1-2*S.d)/L-2.2*S.v;S.v+=a*h;S.d+=S.v*h;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const r1=TT_B[P.b][0],r2=TT_A[P.a][0],cm=Math.min(9,(H-90)/48),xL=W*0.24,xR=W*0.5,w=38,bot=H-30,base=bot-22*cm,Y=z=>base-z*cm;S.g={xL,xR,w,bot,base,cm};
    const d=S.d*100,yi=Y(-d),yr=Y(d),ya=Y(-d+P.h2),colB=P.b?'#b9c2cf':C.water,colA=['#5aa9e6','#e0b84a','#d9905a'][P.a];
    c.fillStyle=colB;c.globalAlpha=P.b?0.95:0.7;c.fillRect(xL-w/2,yi,w,bot-yi);c.fillRect(xR-w/2,yr,w,bot-yr);c.fillRect(xL-w/2,bot-w,xR-xL+w,w);c.globalAlpha=1;
    if(P.h2>0){c.fillStyle=colA;c.globalAlpha=0.8;c.fillRect(xL-w/2,ya,w,yi-ya);c.globalAlpha=1;}
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(xL-w/2,H*0.08);c.lineTo(xL-w/2,bot);c.lineTo(xR+w/2,bot);c.lineTo(xR+w/2,H*0.08);c.moveTo(xL+w/2,H*0.08);c.lineTo(xL+w/2,bot-w);c.lineTo(xR-w/2,bot-w);c.lineTo(xR-w/2,H*0.08);c.stroke();
    line(c,xL-w/2-20,yi,xR+w/2+20,yi,rgba('red',0.8),1.5,[6,4]);txt(c,'teng bosim sathi',xR+w/2+24,yi,C.red,{font:SMALL});
    if(P.h2>0){arrow(c,xL-w/2-12,yi,xL-w/2-12,ya,C.warm,2);txt(c,'h₂',xL-w/2-30,(yi+ya)/2,C.warm,{font:MATH,align:'center'});}
    if(yi-yr>3){arrow(c,xR+w/2+12,yi,xR+w/2+12,yr,C.accent,2);txt(c,'h₁',xR+w/2+30,(yi+yr)/2,C.accent,{font:MATH,align:'center'});}
    line(c,xL-w/2,ya,xR+w/2+60,ya,rgba('muted',0.6),1,[2,3]);line(c,xR-w/2,yr,xR+w/2+60,yr,rgba('muted',0.6),1,[2,3]);
    txt(c,TT_A[P.a][1]+' '+r2,xL,ya-12,C.ink,{align:'center',font:SMALL});txt(c,TT_B[P.b][1]+' '+r1,(xL+xR)/2,bot-w/2,P.b?'#1d2633':C.ink,{align:'center',font:SMALL});
    const gx=W*0.7,gw=Math.min(54,(W-gx-30)/2),gb=H*0.8,gt=H*0.2,mx=Math.max(r2*0.3,1)*9.8,p1=r1*9.8*Math.max(0,2*S.d),p2=r2*9.8*P.h2/100;
    [['ρ₁gh₁',p1,C.accent],['ρ₂gh₂',p2,C.warm]].forEach(([l,v,col],i)=>{const x=gx+i*(gw+18);c.fillStyle=rgba('muted',0.15);c.fillRect(x,gt,gw,gb-gt);c.fillStyle=col;const hh=Math.min(1,v/mx)*(gb-gt);c.fillRect(x,gb-hh,gw,hh);txt(c,l,x+gw/2,gb+14,C.ink,{align:'center',font:MATH});txt(c,fmt(v,0)+' Pa',x+gw/2,gt-10,C.ink,{align:'center',font:SMALL});});
  },
  read(S,P){const r1=TT_B[P.b][0],r2=TT_A[P.a][0],h1=r2*P.h2/r1;return[['h₁ (muvozanatda)',fmt(h1,2)+' sm'],['h₁ (hozir)',fmt(2*S.d*100,2)+' sm'],['ρ₂gh₂',fmt(r2*9.8*P.h2/100,0)+' Pa'],['Ustunlar uchi farqi',fmt(P.h2-h1,2)+' sm']];}
});
