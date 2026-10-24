/* Elektromagnit induksiya */
const flux=(x,P)=>P.B*0.002/Math.pow(1+(x/0.05)**2,1.5);
SIMS.push({id:'induksiya',cat:'mag',title:'Elektromagnit induksiya',short:'ε = −N ΔΦ/Δt',
  sub:'G‘altak orqali o‘tayotgan magnit oqimi o‘zgarganda unda induksion EYuK hosil bo‘ladi.',
  formula:`<span><i>ε</i> = −<i>N</i>${fr('Δ<i>Φ</i>','Δ<i>t</i>')}</span><span class="alt"><i>Φ</i> = <i>BS</i> cos <i>α</i> &nbsp; (Faradey qonuni, Lens qoidasi)</span>`,
  text:['Magnitni g‘altakka yaqinlashtirsangiz, g‘altak ichidagi magnit oqimi ortadi va galvanometr strelkasi og‘adi. Magnit to‘xtasa — oqim o‘zgarmaydi va tok yo‘qoladi. Uzoqlashtirsangiz, strelka teskari tomonga og‘adi.','EYuK magnit qanchalik tez harakatlansa va g‘altakda o‘ramlar qancha ko‘p bo‘lsa, shuncha katta. Magnitni sichqoncha bilan o‘zingiz harakatlantiring yoki avtomatik tebranishni yoqing. Elektr generatorlari aynan shu hodisa asosida ishlaydi.'],
  legend:[['ε','induksion EYuK, V'],['N','g‘altakdagi o‘ramlar soni'],['Φ','magnit oqimi, Wb'],['B','magnit induksiyasi, T'],['S','o‘ram yuzasi, m²']],
  tries:['Avtomatik harakatni 0 qiling va magnitni qo‘lda sekin, keyin tez suring: EYuK tezlikka bog‘liq.','Magnitni g‘altak ichida to‘xtating: oqim katta, lekin EYuK nol.','O‘ramlar sonini 2 marta oshiring: EYuK 2 marta ortadi.'],
  params:[{id:'N',label:'O‘ramlar soni',sym:'N',min:50,max:1000,step:50,val:300,unit:'',d:0},{id:'B',label:'Magnit kuchi',sym:'B',min:0.1,max:1,step:0.05,val:0.5,unit:'T',d:2},{id:'sp',label:'Avtomatik harakat (0 — qo‘lda)',sym:'',min:0,max:1.5,step:0.05,val:0.5,unit:'Hz',d:2}],
  hint:'Magnitni sudrang',
  init:()=>({xm:-0.22,phi:null,emf:0,h:[],t:0,max:1,drag:false,g:{}}),
  step(S,P,dt){S.t+=dt;if(!S.drag&&P.sp>0)S.xm=-0.22*Math.cos(TAU*P.sp*S.t);const phi=flux(S.xm,P);if(S.phi===null)S.phi=phi;const emf=dt>0?-P.N*(phi-S.phi)/dt:0;S.phi=phi;S.emf=S.emf*0.5+emf*0.5;S.h.push(S.emf);if(S.h.length>400)S.h.shift();S.max=Math.max(S.max*0.998,Math.abs(S.emf),0.5);},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W/2,cy=H*0.32,sc=W*0.8,cw=0.08*sc,cr=Math.min(46,H*0.12),mx=cx+S.xm*sc,ml=0.12*sc,mh=26;S.g={cx,cy,sc,mx,ml};
    const turns=Math.round(6+P.N/100);c.strokeStyle=rgba('warm',0.45);c.lineWidth=2;for(let i=0;i<turns;i++){const x=cx-cw/2+cw*i/(turns-1);c.beginPath();c.ellipse(x,cy,6,cr,0,-Math.PI/2,Math.PI/2,true);c.stroke();}
    c.fillStyle=C.red;c.fillRect(mx,cy-mh/2,ml/2,mh);c.fillStyle=C.accent;c.fillRect(mx-ml/2,cy-mh/2,ml/2,mh);txt(c,'N',mx+ml/4,cy,C.onaccent,{align:'center',font:'600 13px sans-serif'});txt(c,'S',mx-ml/4,cy,C.onaccent,{align:'center',font:'600 13px sans-serif'});
    c.strokeStyle=C.warm;c.lineWidth=2.5;for(let i=0;i<turns;i++){const x=cx-cw/2+cw*i/(turns-1);c.beginPath();c.ellipse(x,cy,6,cr,0,-Math.PI/2,Math.PI/2);c.stroke();}
    const gx=W*0.22,gy=H*0.8,gr=Math.min(70,W*0.12);line(c,cx-cw/2,cy+cr,cx-cw/2,gy-gr-20,C.ink,1.5);line(c,cx+cw/2,cy+cr,cx+cw/2,gy-gr-30,C.ink,1.5);line(c,cx-cw/2,gy-gr-20,gx-20,gy-gr-20,C.ink,1.5);line(c,cx+cw/2,gy-gr-30,gx+20,gy-gr-30,C.ink,1.5);line(c,gx-20,gy-gr-20,gx-20,gy-8,C.ink,1.5);line(c,gx+20,gy-gr-30,gx+20,gy-8,C.ink,1.5);
    c.fillStyle=C.panel;c.beginPath();c.arc(gx,gy,gr,Math.PI,0);c.closePath();c.fill();c.strokeStyle=C.ink;c.lineWidth=1.5;c.stroke();for(let k=-4;k<=4;k++){const a=-Math.PI/2+k*0.3;line(c,gx+Math.cos(a)*gr*0.82,gy+Math.sin(a)*gr*0.82,gx+Math.cos(a)*gr*0.95,gy+Math.sin(a)*gr*0.95,C.muted,1);}
    const na=-Math.PI/2+clamp(S.emf/S.max,-1,1)*1.2;line(c,gx,gy,gx+Math.cos(na)*gr*0.85,gy+Math.sin(na)*gr*0.85,C.red,2.5);disk(c,gx,gy,4,C.ink);txt(c,'G',gx,gy-gr*0.4,C.muted,{align:'center',font:MATH});
    const px=W*0.45,pr=W-16,pt=H*0.62,pb=H-20,pm=(pt+pb)/2;line(c,px,pm,pr,pm,C.muted,1);line(c,px,pt,px,pb,C.muted,1);txt(c,'ε(t)',px+4,pt-6,C.muted);
    c.strokeStyle=C.red;c.lineWidth=2;c.beginPath();const n=S.h.length;for(let i=0;i<n;i++){const x=pr-(n-1-i)*(pr-px)/400,y=pm-clamp(S.h[i]/S.max,-1.1,1.1)*(pb-pt)/2*0.9;c.lineTo(x,y);}c.stroke();
    txt(c,fmt(S.emf,2)+' V',W-16,H*0.56,C.red,{align:'right',font:'600 14px "IBM Plex Mono", monospace'});
  },
  pointer(type,x,y,S,P,api){const g=S.g;if(type==='down'){if(Math.abs(x-g.mx)<g.ml/2+16&&Math.abs(y-g.cy)<30){S.drag=true;S.off=x-g.mx;return true;}return false;}
    if(type==='move'&&S.drag){S.xm=clamp((x-S.off-g.cx)/g.sc,-0.45,0.45);return true;}
    if(type==='up'&&S.drag){S.drag=false;if(P.sp>0)S.t=Math.acos(clamp(-S.xm/0.22,-1,1))/(TAU*P.sp);S.xm=-0.22*Math.cos(TAU*P.sp*S.t)||S.xm;}return false;},
  read:(S,P)=>[['Magnit oqimi (1 o‘ram)',fmt(flux(S.xm,P)*1000,3)+' mWb'],['Oqim ilashishi NΦ',fmt(P.N*flux(S.xm,P),3)+' Wb'],['Induksion EYuK ε',fmt(S.emf,2)+' V'],['Magnit holati',fmt(S.xm*100,0)+' sm']]
});
