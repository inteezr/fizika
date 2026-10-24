/* O‘zgaruvchan tok generatori */
SIMS.push({id:'generator',cat:'mag',title:'O‘zgaruvchan tok generatori',short:'e = BSω·sin ωt',
  sub:'Magnit maydonida aylanayotgan ramka orqali o‘tuvchi magnit oqimi davriy o‘zgaradi va unda sinusoidal EYuK induksiyalanadi.',
  formula:`<span><i>e</i> = <i>NBSω</i> sin<i>ωt</i></span><span class="alt"><i>ℰ</i><sub>ef</sub> = ${fr('<i>ℰ</i><sub>max</sub>','√2')} &nbsp; <i>ν</i> = ${fr('<i>ω</i>','2π')}</span>`,
  text:['Ramka magnitlar orasida aylanganda u orqali o‘tuvchi magnit oqimi Φ = BS cos ωt bo‘yicha o‘zgaradi. Faradey qonuniga ko‘ra EYuK oqimning o‘zgarish tezligiga teng, shuning uchun u sinus qonuni bo‘yicha o‘zgaradi.','Ramka tekisligi maydon chiziqlariga parallel bo‘lgan paytda oqim nol, lekin u eng tez o‘zgaradi — EYuK maksimal. Elektr stansiyalardagi generatorlar 50 Hz chastotada aylanadi.'],
  legend:[['N','o‘ramlar soni'],['B','magnit induksiyasi, T'],['S','ramka yuzasi, 0,01 m²'],['ω','burchak tezlik, rad/s'],['ν','chastota, Hz']],
  tries:['Aylanish chastotasini 2 marta oshiring: EYuK amplitudasi ham, chastotasi ham ortadi.','Oqim nol bo‘lgan paytda EYuK maksimal ekanini grafikda toping.','Lampaning yorug‘ligi davriy o‘zgarishini kuzating.'],
  params:[{id:'f',label:'Aylanish chastotasi',sym:'ν',min:0.1,max:2,step:0.05,val:0.5,unit:'Hz',d:2},{id:'B',label:'Magnit induksiyasi',sym:'B',min:0.1,max:1,step:0.05,val:0.5,unit:'T',d:2},{id:'N',label:'O‘ramlar soni',sym:'N',min:10,max:500,step:10,val:200,unit:'',d:0}],
  init:()=>({th:0,h:[]}),
  step(S,P,dt){S.th+=TAU*P.f*dt;const w=TAU*P.f,e=P.N*P.B*0.01*w*Math.sin(S.th);S.h.push([Math.cos(S.th),e]);if(S.h.length>260)S.h.shift();},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.27,cy=H*0.42,mw=Math.min(W*0.18,120),w=TAU*P.f,em=P.N*P.B*0.01*w,e=em*Math.sin(S.th);S.g={cx,cy,mw};
    c.fillStyle=C.red;rrect(c,cx-mw*1.8,cy-mw*0.7,mw*0.6,mw*1.4,6);c.fill();c.fillStyle=C.accent;rrect(c,cx+mw*1.2,cy-mw*0.7,mw*0.6,mw*1.4,6);c.fill();txt(c,'N',cx-mw*1.5,cy,C.onaccent,{align:'center',font:'700 18px sans-serif'});txt(c,'S',cx+mw*1.5,cy,C.onaccent,{align:'center',font:'700 18px sans-serif'});
    for(let i=-2;i<=2;i++)line(c,cx-mw*1.2,cy+i*mw*0.25,cx+mw*1.2,cy+i*mw*0.25,rgba('violet',0.35),1);
    const hw=mw*Math.sin(S.th);c.strokeStyle=C.warm;c.lineWidth=4;c.strokeRect(cx-Math.abs(hw),cy-mw*0.55,Math.abs(hw)*2||1,mw*1.1);c.fillStyle=rgba('warm',0.12);c.fillRect(cx-Math.abs(hw),cy-mw*0.55,Math.abs(hw)*2,mw*1.1);
    line(c,cx,cy+mw*0.55,cx,cy+mw*1.1,C.ink,3);const lx=cx,ly=cy+mw*1.6,b=Math.abs(e)/Math.max(em,1e-6);const gg=c.createRadialGradient(lx,ly,2,lx,ly,40);gg.addColorStop(0,`rgba(255,210,90,${0.2+b*0.8})`);gg.addColorStop(1,'rgba(255,210,90,0)');c.fillStyle=gg;c.beginPath();c.arc(lx,ly,40,0,TAU);c.fill();disk(c,lx,ly,12,null,C.ink);
    const gx=Math.max(W*0.55,cx+mw*2.1),gr=W-20,gm=H*0.32,ga=H*0.18,g2=H*0.75;[[gm,'e, V','red',1],[g2,'Φ','violet',0]].forEach(([y0,l,k,j])=>{line(c,gx,y0,gr,y0,C.line,1);txt(c,l,gx,y0-ga-8,C[k],{font:SMALL});c.strokeStyle=C[k];c.lineWidth=2.5;c.beginPath();S.h.forEach((r,i)=>{const x=gx+i/260*(gr-gx),y=y0-(j?r[1]/Math.max(em,1e-6):r[0])*ga*0.9;i?c.lineTo(x,y):c.moveTo(x,y);});c.stroke();});
  },
  read:(S,P)=>{const w=TAU*P.f,em=P.N*P.B*0.01*w;return[['EYuK amplitudasi',fmt(em,2)+' V'],['Hozirgi EYuK',fmt(em*Math.sin(S.th),2)+' V'],['Ta’sir etuvchi qiymat',fmt(em/Math.SQRT2,2)+' V'],['Davr T',fmt(1/P.f,2)+' s']];}
});
