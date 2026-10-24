/* 15. Sinish qonuni */
function snellGeo(W,H,P){const hx=W/2,hy=H/2,a=P.a*D2R,R0=Math.min(W,H)*0.44;return{hx,hy,a,R0,sx:hx-Math.sin(a)*R0,sy:hy-Math.cos(a)*R0};}
SIMS.push({id:'sinish',cat:'opt',title:'Yorug‘likning sinish qonuni',short:'n₁ sinα = n₂ sinβ',
  sub:'Yorug‘lik bir muhitdan ikkinchisiga o‘tganda yo‘nalishini o‘zgartiradi.',
  formula:`<span><i>n</i><sub>1</sub> sin <i>α</i> = <i>n</i><sub>2</sub> sin <i>β</i></span><span class="alt"><i>v</i> = ${fr('<i>c</i>','<i>n</i>')} &nbsp; sin <i>α</i><sub>0</sub> = ${fr('<i>n</i><sub>2</sub>','<i>n</i><sub>1</sub>')}</span>`,
  text:['Muhitlarda yorug‘lik tezligi har xil: v = c/n. Nur optik zichroq muhitga o‘tganda sekinlashadi va normalga yaqinlashadi. Harakatlanayotgan chiziqchalar tezligiga qarang: zich muhitda ular sekinroq.','Nur zichroq muhitdan siyrakroq muhitga o‘tganda sinish burchagi kattaroq bo‘ladi. Tushish burchagi chegaraviy burchak α₀ dan oshsa, nur ikkinchi muhitga umuman chiqmaydi: to‘liq ichki qaytish yuz beradi. Optik tola shu hodisa asosida ishlaydi.'],
  legend:[['n₁, n₂','muhitlarning sindirish ko‘rsatkichlari (havo 1,00, suv 1,33, shisha 1,5, olmos 2,42)'],['α','tushish burchagi'],['β','sinish burchagi'],['α₀','to‘liq ichki qaytishning chegaraviy burchagi']],
  tries:['Lazerni sudrab tushish burchagini o‘zgartiring.','n₁ = 1,5 va n₂ = 1,00 qiling, keyin burchakni 42° dan oshiring.','n₁ = n₂ bo‘lsa, nur sinmaydi.'],
  params:[{id:'n1',label:'1-muhit (yuqori)',sym:'n₁',min:1,max:2.42,step:0.01,val:1,unit:'',d:2},{id:'n2',label:'2-muhit (pastki)',sym:'n₂',min:1,max:2.42,step:0.01,val:1.5,unit:'',d:2},{id:'a',label:'Tushish burchagi',sym:'α',min:0,max:89,step:1,val:45,unit:'°',d:0}],
  hint:'Lazerni suring',
  init:()=>({drag:false}),
  draw(c,W,H,S,P,tt){S.W=W;S.H=H;const g=snellGeo(W,H,P);
    c.fillStyle=rgba('water',0.04+(P.n1-1)*0.22);c.fillRect(0,0,W,g.hy);c.fillStyle=rgba('water',0.04+(P.n2-1)*0.22);c.fillRect(0,g.hy,W,H-g.hy);
    line(c,0,g.hy,W,g.hy,C.ink,1.5);line(c,g.hx,10,g.hx,H-10,C.muted,1,[5,5]);
    txt(c,'n₁ = '+fmt(P.n1),14,20,C.ink);txt(c,'n₂ = '+fmt(P.n2),14,g.hy+20,C.ink);
    const sb=P.n1/P.n2*Math.sin(g.a),tir=sb>1,Lr=Math.hypot(W,H);
    const ray=(x1,y1,x2,y2,n,alpha)=>{line(c,x1,y1,x2,y2,rgba('warm',alpha*0.35),3);c.strokeStyle=rgba('warm',alpha);c.lineWidth=3;c.setLineDash([12,12]);c.lineDashOffset=-tt*160/n;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.setLineDash([]);c.lineDashOffset=0;};
    ray(g.sx,g.sy,g.hx,g.hy,P.n1,1);
    ray(g.hx,g.hy,g.hx+Math.sin(g.a)*Lr,g.hy-Math.cos(g.a)*Lr,P.n1,tir?1:0.3);
    if(!tir){const b=Math.asin(sb);ray(g.hx,g.hy,g.hx+Math.sin(b)*Lr,g.hy+Math.cos(b)*Lr,P.n2,1);
      c.strokeStyle=C.green;c.lineWidth=1.5;c.beginPath();c.arc(g.hx,g.hy,46,Math.PI/2-b,Math.PI/2);c.stroke();txt(c,'β',g.hx+Math.sin(b/2)*60,g.hy+Math.cos(b/2)*60,C.green,{font:MATH,align:'center'});}
    else txt(c,'To‘liq ichki qaytish',W-14,g.hy+22,C.red,{align:'right',font:'600 15px "IBM Plex Sans", sans-serif'});
    c.strokeStyle=C.accent;c.lineWidth=1.5;c.beginPath();c.arc(g.hx,g.hy,40,-Math.PI/2-g.a,-Math.PI/2);c.stroke();txt(c,'α',g.hx-Math.sin(g.a/2)*54,g.hy-Math.cos(g.a/2)*54,C.accent,{font:MATH,align:'center'});
    c.save();c.translate(g.sx,g.sy);c.rotate(Math.atan2(g.hy-g.sy,g.hx-g.sx));c.fillStyle=C.ink;rrect(c,-26,-8,32,16,4);c.fill();c.restore();disk(c,g.sx,g.sy,4,C.warm);
  },
  pointer(type,x,y,S,P,api){const g=snellGeo(S.W,S.H,P);if(type==='down'){if(y<g.hy){S.drag=true;}else return false;}
    if((type==='down'||type==='move')&&S.drag){const a=Math.atan2(Math.abs(x-g.hx),Math.max(1,g.hy-y))/D2R;api.set('a',Math.round(clamp(a,0,89)));return true;}if(type==='up')S.drag=false;return false;},
  read:(S,P)=>{const sb=P.n1/P.n2*Math.sin(P.a*D2R);return[['Sinish burchagi β',sb>1?'nur sinmaydi':fmt(Math.asin(sb)/D2R,1)+'°'],['Chegaraviy burchak α₀',P.n1>P.n2?fmt(Math.asin(P.n2/P.n1)/D2R,1)+'°':'yo‘q (n₁ ≤ n₂)'],['1-muhitda v',fmt(3/P.n1)+'·10⁸ m/s'],['2-muhitda v',fmt(3/P.n2)+'·10⁸ m/s']];}
});
