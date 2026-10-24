/* Transformator */
SIMS.push({id:'transformator',cat:'mag',title:'Transformator',short:'U₂/U₁ = N₂/N₁',
  sub:'Transformator o‘zgaruvchan tok kuchlanishini oshiradi yoki pasaytiradi. Birlamchi chulg‘amdagi tok o‘zak orqali o‘zgaruvchan magnit oqim hosil qiladi va u ikkilamchi chulg‘amda EYuK uyg‘otadi.',
  formula:`<span>${fr('<i>U</i><sub>2</sub>','<i>U</i><sub>1</sub>')} = ${fr('<i>N</i><sub>2</sub>','<i>N</i><sub>1</sub>')} = <i>k</i></span><span class="alt"><i>U</i><sub>1</sub><i>I</i><sub>1</sub> ≈ <i>U</i><sub>2</sub><i>I</i><sub>2</sub></span>`,
  text:['Ikkala chulg‘am umumiy po‘lat o‘zakka o‘ralgan, shuning uchun har bir o‘ramdan bir xil oqim o‘tadi. Demak, o‘ramlarda induksiyalangan kuchlanish o‘ramlar soniga proporsional.','Kuchlanish oshirilsa, tok shuncha marta kamayadi — quvvat deyarli saqlanadi. Shuning uchun elektr energiyasi uzoqqa yuqori kuchlanishda uzatiladi: kichik tokda simlar kam qiziydi.'],
  legend:[['N₁, N₂','birlamchi va ikkilamchi chulg‘am o‘ramlari'],['U₁, U₂','kuchlanishlar, V'],['k','transformatsiya koeffitsienti'],['I₁, I₂','toklar, A']],
  tries:['N₂ ni N₁ dan katta qiling: kuchaytiruvchi transformator.','Yuklama qarshiligini kamaytiring: ikkala tok ham ortadi.','U₁I₁ va U₂I₂ ni solishtiring — ideal transformatorda ular teng.'],
  params:[{id:'U1',label:'Kirish kuchlanishi',sym:'U₁',min:12,max:380,step:2,val:220,unit:'V',d:0},{id:'N1',label:'Birlamchi o‘ramlar',sym:'N₁',min:50,max:2000,step:10,val:1000,unit:'',d:0},{id:'N2',label:'Ikkilamchi o‘ramlar',sym:'N₂',min:10,max:4000,step:10,val:100,unit:'',d:0},{id:'R',label:'Yuklama qarshiligi',sym:'R',min:2,max:500,step:1,val:20,unit:'Ω',d:0}],
  init:()=>({t:0}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const U2=P.U1*P.N2/P.N1,I2=U2/P.R,I1=I2*P.N2/P.N1,ox=W*0.12,ow=W*0.4,oy=H*0.12,oh=H*0.52,t=S.t*TAU*0.8;S.g={ox,ow,oy,oh};
    c.fillStyle=rgba('muted',0.45);c.fillRect(ox,oy,ow,oh);c.fillStyle=C.canvas;c.fillRect(ox+30,oy+30,ow-60,oh-60);
    const fl=Math.sin(t);for(let i=0;i<10;i++){const u=((i/10+S.t*0.25*Math.sign(fl||1))%1+1)%1,per=2*(ow-30+oh-30),s=u*per,w2=ow-30,h2=oh-30;let x,y;if(s<w2){x=ox+15+s;y=oy+15;}else if(s<w2+h2){x=ox+15+w2;y=oy+15+s-w2;}else if(s<2*w2+h2){x=ox+15+w2-(s-w2-h2);y=oy+15+h2;}else{x=ox+15;y=oy+15+h2-(s-2*w2-h2);}disk(c,x,y,3,rgba('violet',Math.abs(fl)));}
    const coil=(x,n,col)=>{const k=clamp(Math.round(Math.log2(n)*2),3,22),h=oh-80;for(let i=0;i<k;i++){const y=oy+40+i*h/k;c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.ellipse(x,y,22,5,0,0,TAU);c.stroke();}};coil(ox+15,P.N1,C.warm);coil(ox+ow-15,P.N2,C.accent);
    line(c,ox-40,oy+40,ox-7,oy+40,C.ink,2);line(c,ox-40,oy+oh-40,ox-7,oy+oh-40,C.ink,2);disk(c,ox-40,oy+oh/2,16,C.canvas,C.ink);txt(c,'~',ox-40,oy+oh/2,C.ink,{align:'center',font:'600 18px sans-serif'});line(c,ox-40,oy+40,ox-40,oy+oh/2-16,C.ink,2);line(c,ox-40,oy+oh-40,ox-40,oy+oh/2+16,C.ink,2);
    const lx=ox+ow+50,ly=oy+oh/2,b=clamp(U2*I2/100,0,1);line(c,ox+ow+7,oy+40,lx,oy+40,C.ink,2);line(c,ox+ow+7,oy+oh-40,lx,oy+oh-40,C.ink,2);line(c,lx,oy+40,lx,ly-14,C.ink,2);line(c,lx,ly+14,lx,oy+oh-40,C.ink,2);
    const gg=c.createRadialGradient(lx,ly,2,lx,ly,50);gg.addColorStop(0,`rgba(255,210,90,${0.15+b*0.85*Math.abs(Math.sin(t))})`);gg.addColorStop(1,'rgba(255,210,90,0)');c.fillStyle=gg;c.beginPath();c.arc(lx,ly,50,0,TAU);c.fill();disk(c,lx,ly,14,null,C.ink);
    txt(c,'N₁ = '+P.N1,ox+15,oy+oh+16,C.warm,{align:'center'});txt(c,'N₂ = '+P.N2,ox+ow-15,oy+oh+16,C.accent,{align:'center'});
    const gx=W*0.68,gr=W-16,gy=H*0.82,ga=H*0.1,um=Math.max(P.U1,U2);line(c,ox,gy,gr,gy,C.line,1);[[P.U1,'warm','u₁'],[U2,'accent','u₂']].forEach(([U,k,l])=>{c.strokeStyle=C[k];c.lineWidth=2.5;c.beginPath();for(let x=ox;x<=gr;x+=3){const y=gy-Math.sin((x-ox)/50-t)*U/um*ga;x===ox?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();});
  },
  read:(S,P)=>{const U2=P.U1*P.N2/P.N1,I2=U2/P.R,I1=I2*P.N2/P.N1;return[['Chiqish kuchlanishi U₂',fmt(U2,1)+' V'],['Koeffitsient k',fmt(P.N2/P.N1,3)+(P.N2>P.N1?' (oshiruvchi)':' (pasaytiruvchi)')],['Toklar I₁ / I₂',fmt(I1,2)+' / '+fmt(I2,2)+' A'],['Quvvat',fmt(U2*I2,0)+' W']];}
});
