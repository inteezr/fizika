/* ===== v9: yangi mavzular (2-qism): est, tok, mag, opt ===== */
function polyDots(c,pts,ph,col,gap=24,r=3){let L=0;const seg=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);L+=d;}if(L<1)return;const o=((ph%gap)+gap)%gap;
  for(let s=o;s<L;s+=gap){let k=0,a=s;while(k<seg.length&&a>seg[k]){a-=seg[k];k++;}if(k>=seg.length)break;const f=seg[k]?a/seg[k]:0,p=pts[k],q=pts[k+1];disk(c,p[0]+(q[0]-p[0])*f,p[1]+(q[1]-p[1])*f,r,col);}}

/* 12. Bir nechta zaryad maydonining kuch chiziqlari */
SIMS.push({id:'kuchchiziq',cat:'est',title:'Elektr maydon kuch chiziqlari (bir nechta zaryad)',short:'E = Σ kqᵢ/rᵢ²',
  sub:'Uchta zaryadni sichqoncha bilan suring va kattaligini o‘zgartiring. Kuch chiziqlari musbat zaryaddan chiqib, manfiy zaryadga kiradi, fon rangi esa potensialni ko‘rsatadi.',
  formula:`<span><b>E</b> = Σ ${fr('<i>k q<sub>i</sub></i>','<i>r<sub>i</sub></i>²')} <b>r̂</b><sub><i>i</i></sub></span><span class="alt"><i>φ</i> = Σ ${fr('<i>k q<sub>i</sub></i>','<i>r<sub>i</sub></i>')}</span>`,
  text:['Bir nechta zaryad maydoni superpozitsiya prinsipiga bo‘ysunadi: har bir nuqtadagi kuchlanganlik har bir zaryad hosil qilgan kuchlanganliklarning vektor yig‘indisiga teng. Kuch chiziqlari har bir nuqtada E vektoriga urinma bo‘lib o‘tkaziladi va hech qachon kesishmaydi.','Chiziqlar zich joyda maydon kuchli. Zaryaddan chiqadigan chiziqlar soni zaryad kattaligiga proporsional. Ikki bir xil ishorali zaryad orasida maydon nolga teng nuqta bo‘ladi, qarama-qarshi zaryadlar esa dipol maydonini hosil qiladi.'],
  legend:[['q₁, q₂, q₃','zaryadlar, nC'],['E','elektr maydon kuchlanganligi, N/C'],['φ','potensial, V'],['k','9·10⁹ N·m²/C²'],['zond','oq nuqta — maydon o‘lchanadigan joy']],
  tries:['q₁ = q₂ = +3 nC qiling: o‘rtada maydon nolga teng nuqtani zond bilan toping.','q₃ ni 0 qiling va q₁ = −q₂: klassik dipol maydoni hosil bo‘ladi.','Zaryadlarni bir-biriga yaqinlashtiring va kuch chiziqlarining qayta taqsimlanishini kuzating.'],
  params:[{id:'q1',label:'1-zaryad',sym:'q₁',min:-5,max:5,step:0.5,val:3,unit:'nC',d:1},{id:'q2',label:'2-zaryad',sym:'q₂',min:-5,max:5,step:0.5,val:-3,unit:'nC',d:1},{id:'q3',label:'3-zaryad',sym:'q₃',min:-5,max:5,step:0.5,val:0,unit:'nC',d:1}],
  init(P){return{ch:[{x:0.3,y:0.5},{x:0.7,y:0.5},{x:0.5,y:0.22}],pr:{x:0.5,y:0.78},drag:-1,ph:0,key:''};},
  step(S,P,dt){S.ph+=dt*40;},
  qs(P){return[P.q1,P.q2,P.q3];},
  field(S,P,x,y){const W=S.W,H=S.H,m=0.00025,k=8.99e9;let ex=0,ey=0,ph=0;this.qs(P).forEach((q,i)=>{if(!q)return;const dx=(x-S.ch[i].x*W)*m,dy=(y-S.ch[i].y*H)*m,r2=dx*dx+dy*dy+1e-8,r=Math.sqrt(r2),e=k*q*1e-9/r2;ex+=e*dx/r;ey+=e*dy/r;ph+=k*q*1e-9/r;});return[ex,ey,ph];},
  pointer(type,x,y,S,P){if(!S.W)return false;if(type==='down'){const qs=this.qs(P);let best=-1,bd=26;S.ch.forEach((o,i)=>{const d=Math.hypot(x-o.x*S.W,y-o.y*S.H);if(d<bd){bd=d;best=i;}});if(Math.hypot(x-S.pr.x*S.W,y-S.pr.y*S.H)<20)best=3;S.drag=best;return best>=0;}
    if(type==='move'&&S.drag>=0){const o=S.drag===3?S.pr:S.ch[S.drag];o.x=clamp(x/S.W,0.04,0.96);o.y=clamp(y/S.H,0.06,0.94);return true;}if(type==='up')S.drag=-1;return false;},
  lines(S,P){const qs=this.qs(P),W=S.W,H=S.H,key=JSON.stringify([S.ch,qs,W,H]);if(S.key===key)return S.ls;const out=[],anyPos=qs.some(q=>q>0),sgn=anyPos?1:-1;
    qs.forEach((q,i)=>{if(!q||Math.sign(q)!==sgn)return;const n=Math.round(Math.abs(q)*4),cx=S.ch[i].x*W,cy=S.ch[i].y*H;for(let j=0;j<n;j++){const a=(j+0.5)/n*TAU;let x=cx+Math.cos(a)*13,y=cy+Math.sin(a)*13;const pts=[[x,y]];
      for(let s=0;s<700;s++){const [ex,ey]=this.field(S,P,x,y),e=Math.hypot(ex,ey);if(e<1e-6)break;x+=sgn*ex/e*4;y+=sgn*ey/e*4;pts.push([x,y]);if(x<-20||x>W+20||y<-20||y>H+20)break;if(S.ch.some((o,k)=>k!==i&&qs[k]&&Math.hypot(x-o.x*W,y-o.y*H)<11))break;}out.push(pts);}});
    const img=document.createElement('canvas');img.width=Math.ceil(W/12);img.height=Math.ceil(H/12);const g=img.getContext('2d'),id=g.createImageData(img.width,img.height);
    for(let j=0;j<img.height;j++)for(let i=0;i<img.width;i++){const ph=this.field(S,P,i*12+6,j*12+6)[2],a=clamp(Math.abs(ph)/2000,0,1)*0.42,o=(j*img.width+i)*4;if(ph>0){id.data[o]=255;id.data[o+1]=90;id.data[o+2]=90;}else{id.data[o]=70;id.data[o+1]=130;id.data[o+2]=255;}id.data[o+3]=Math.round(a*255);}
    g.putImageData(id,0,0);S.img=img;S.key=key;S.ls=out;return out;},
  draw(c,W,H,S,P){S.W=W;S.H=H;c.fillStyle=C.canvas;c.fillRect(0,0,W,H);const ls=this.lines(S,P);c.save();c.imageSmoothingEnabled=true;c.drawImage(S.img,0,0,W,H);c.restore();grid(c,W,H,28);S.g={W,H};
    ls.forEach(pts=>{c.strokeStyle=rgba('ink',0.55);c.lineWidth=1.4;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();const m=Math.floor(pts.length/2);if(m>2){const a=pts[m-1],b=pts[m+1],an=Math.atan2(b[1]-a[1],b[0]-a[0]),sg=P.q1>0||P.q2>0||P.q3>0?1:-1,an2=sg>0?an:an+Math.PI;c.fillStyle=rgba('ink',0.75);c.beginPath();c.moveTo(pts[m][0]+Math.cos(an2)*6,pts[m][1]+Math.sin(an2)*6);c.lineTo(pts[m][0]+Math.cos(an2+2.5)*6,pts[m][1]+Math.sin(an2+2.5)*6);c.lineTo(pts[m][0]+Math.cos(an2-2.5)*6,pts[m][1]+Math.sin(an2-2.5)*6);c.fill();}
      polyDots(c,pts,S.ph*(P.q1>0||P.q2>0||P.q3>0?1:-1),rgba('warm',0.85),46,2);});
    this.qs(P).forEach((q,i)=>{const x=S.ch[i].x*W,y=S.ch[i].y*H;if(!q){c.strokeStyle=rgba('muted',0.7);c.setLineDash([4,3]);c.beginPath();c.arc(x,y,11,0,TAU);c.stroke();c.setLineDash([]);return;}disk(c,x,y,11+Math.abs(q)*1.2,q>0?C.red:C.accent);txt(c,(q>0?'+':'−')+fmt(Math.abs(q),1),x,y,'#fff',{align:'center',font:SMALL});if(S.drag===i)selRing(c,x,y,22);});
    const px=S.pr.x*W,py=S.pr.y*H,[ex,ey]=this.field(S,P,px,py),e=Math.hypot(ex,ey);disk(c,px,py,6,'#fff',C.ink);if(e>1){const L=clamp(Math.log10(e)*22-40,12,90);arrow(c,px,py,px+ex/e*L,py+ey/e*L,C.green,2.6,'E');}txt(c,fmt(e/1000,1)+' kN/C',px+10,py+18,C.ink,{font:SMALL});},
  read(S,P){if(!S.W)return[];const [ex,ey,ph]=this.field(S,P,S.pr.x*S.W,S.pr.y*S.H);return[['Zonddagi kuchlanganlik E',fmt(Math.hypot(ex,ey)/1000,2)+' kN/C'],['Zonddagi potensial φ',fmt(Math.abs(ph)<0.5?0:ph,0)+' V'],['1 nC zaryadga kuch',fmt(Math.hypot(ex,ey)*1e-9*1e6,2)+' mkN'],['Zaryadlar yig‘indisi',fmt(P.q1+P.q2+P.q3,1)+' nC'],['Masshtab','40 px = 1 sm']];}
});

/* 13. Milliken tajribasi */
SIMS.push({id:'milliken',cat:'est',title:'Milliken tajribasi: elementar zaryadni o‘lchash',short:'qU/d = mg',
  sub:'Mayda moy tomchisi kondensator plastinalari orasida. Kuchlanishni shunday tanlangki, tomchi osilib tursin — shunda uning zaryadini hisoblash mumkin. Zaryad doim e = 1,6·10⁻¹⁹ C ga karrali chiqadi.',
  formula:`<span>${fr('<i>qU</i>','<i>d</i>')} = <i>mg</i> &nbsp;⇒&nbsp; <i>q</i> = ${fr('<i>mgd</i>','<i>U</i>')}</span><span class="alt"><i>F</i><sub>q</sub> = 6π<i>ηrv</i> (Stoks)</span>`,
  text:['1909-yilda R. Milliken atomizatordan purkalgan moy tomchilarini mikroskopda kuzatdi. Tomchilar ishqalanishdan bir necha elektron oladi. Plastinalar orasidagi elektr kuch og‘irlik kuchiga teng bo‘lganda tomchi to‘xtaydi; tomchi radiusini esa havodagi qarshilik bilan bir tekis tushish tezligidan aniqladi.','O‘lchangan barcha zaryadlar bitta eng kichik qiymatga karrali chiqdi — bu elektron zaryadi e. Shu tajriba elektr zaryadining diskretligini isbotladi. Kichik tomchilarda Broun harakati sezilarli — tomchi biroz titraydi.'],
  legend:[['U','plastinalar orasidagi kuchlanish, V'],['d','plastinalar orasidagi masofa, 1 sm'],['r','tomchi radiusi, mkm'],['n','tomchidagi ortiqcha elektronlar soni'],['η','havoning qovushqoqligi, 1,8·10⁻⁵ Pa·s']],
  tries:['Kuchlanishni o‘zgartirib, tomchini to‘xtating: bu muvozanat kuchlanishi.','n ni 2 marta oshiring: muvozanat kuchlanishi 2 marta kamayadi.','U = 0 qiling: tomchi bir tekis tushadi — Stoks qonuni bo‘yicha tezlik r² ga proporsional.'],
  params:[{id:'U',label:'Kuchlanish',sym:'U',min:0,max:6000,step:10,val:2000,unit:'V',d:0},{id:'r',label:'Tomchi radiusi',sym:'r',min:0.5,max:2,step:0.05,val:1,unit:'mkm',d:2,reset:1},{id:'n',label:'Elektronlar soni',sym:'n',min:1,max:8,step:1,val:2,unit:'',d:0,reset:1}],
  calc(P){const r=P.r*1e-6,m=900*4/3*Math.PI*r**3,g=9.8,d=0.01,e=1.602e-19,q=P.n*e,Fe=q*P.U/d,mg=m*g,k=6*Math.PI*1.82e-5*r;return{m,mg,Fe,v:(Fe-mg)/k,Ueq:mg*d/q,q,D:1.380649e-23*295/k,k};},
  init(P){return{y:0,x:0,tr:[]};},
  step(S,P,dt){const q=this.calc(P),sd=Math.sqrt(2*q.D*dt)*1000;S.y+=q.v*1000*dt+gaussR()*sd;S.x+=gaussR()*sd;S.x=clamp(S.x,-0.2,0.2);if(S.y>0.25)S.y-=0.5;if(S.y<-0.25)S.y+=0.5;S.tr.push([S.x,S.y]);if(S.tr.length>90)S.tr.shift();},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),narrow=W<640,lw=narrow?W:W*0.48,cx=lw*0.5,pt=H*0.2,pb=narrow?H*0.5:H*0.78,pw=lw*0.7;S.g={cx,pt,pb};
    c.fillStyle='#c94a4a';c.fillRect(cx-pw/2,pt-10,pw,10);c.fillStyle='#3a6fd0';c.fillRect(cx-pw/2,pb,pw,10);txt(c,'+',cx-pw/2-14,pt-5,C.red,{font:'700 18px sans-serif'});txt(c,'−',cx-pw/2-14,pb+5,C.accent,{font:'700 18px sans-serif'});
    for(let i=1;i<6;i++){const x=cx-pw/2+pw*i/6;arrow(c,x,pt+8,x,pb-8,rgba('violet',0.25+0.5*clamp(P.U/6000,0,1)),1.4);}txt(c,'U = '+fmt(P.U,0)+' V',cx+pw/2+8,(pt+pb)/2,C.ink);txt(c,'d = 1 sm',cx+pw/2+8,(pt+pb)/2+18,C.muted,{font:SMALL});
    const dy=(pt+pb)/2;disk(c,cx,dy,14,'#e8b84a');txt(c,P.n+'e⁻',cx,dy,'#3a2a00',{align:'center',font:SMALL});const kk=70/Math.max(q.mg,q.Fe);arrow(c,cx+22,dy,cx+22,dy-q.Fe*kk,C.accent,2.6,'qE');arrow(c,cx-22,dy,cx-22,dy+q.mg*kk,C.violet,2.6,'mg');
    if(Math.abs(q.v)>1e-6){const F=Math.abs(q.Fe-q.mg)*kk;arrow(c,cx+48,dy,cx+48,dy+Math.sign(q.v)*F,C.red,2.2,'Fq');}
    const vx=narrow?W*0.5:W*0.76,vy=narrow?H*0.76:H*0.48,R=narrow?Math.min(W*0.3,H*0.2):Math.min(W*0.2,H*0.38),k=2*R/0.5;
    c.save();c.beginPath();c.arc(vx,vy,R,0,TAU);c.fillStyle='#0b1020';c.fill();c.clip();for(let i=-5;i<=5;i++){line(c,vx-R,vy+i*R/5,vx+R,vy+i*R/5,'rgba(120,160,255,0.25)',1);}
    c.strokeStyle='rgba(255,210,120,0.4)';c.lineWidth=1.5;c.beginPath();S.tr.forEach((p,i)=>{const X=vx+p[0]*k,Y=vy-p[1]*k;i&&Math.abs(p[1]-S.tr[i-1][1])<0.2?c.lineTo(X,Y):c.moveTo(X,Y);});c.stroke();disk(c,vx+S.x*k,vy-S.y*k,5,'#ffd27a');c.restore();
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.arc(vx,vy,R,0,TAU);c.stroke();txt(c,'mikroskop: 0,5 mm',vx,vy+R+16,C.muted,{align:'center',font:SMALL});
    const st=Math.abs(q.v)<2e-6?'Tomchi osilib turibdi!':q.v>0?'Tomchi ko‘tarilmoqda':'Tomchi tushmoqda';txt(c,st,vx,vy-R-14,Math.abs(q.v)<2e-6?C.green:C.ink,{align:'center',font:'600 14px "IBM Plex Sans", sans-serif'});},
  read(S,P){const q=this.calc(P);return[['Tomchi massasi m',fmt(q.m,2)+' kg'],['Og‘irlik kuchi mg',fmt(q.mg,2)+' N'],['Elektr kuch qE',fmt(q.Fe,2)+' N'],['Tezlik v',fmt(q.v*1000,3)+' mm/s'],['Muvozanat kuchlanishi',fmt(q.Ueq,0)+' V'],['Tomchi zaryadi q = ne',fmt(q.q,2)+' C']];}
});

/* 14. Faradey qafasi */
SIMS.push({id:'faradey',cat:'est',title:'Elektrostatik himoya: Faradey qafasi',short:'E_ichki = 0',
  sub:'Bir jinsli elektr maydonga o‘tkazgich silindr kiritilgan. Sirtida induksion zaryadlar paydo bo‘lib, ichkaridagi maydonni butunlay yo‘qotadi. Silindr va zondni sichqoncha bilan suring.',
  formula:`<span><i>E</i><sub>ichki</sub> = 0, &nbsp;<i>φ</i> = const</span><span class="alt"><i>σ</i> = 2<i>ε</i>₀<i>E</i>₀ cos <i>θ</i></span>`,
  text:['O‘tkazgichdagi erkin elektronlar tashqi maydon ta’sirida siljiydi: bir tomonda manfiy, ikkinchi tomonda musbat zaryad yig‘iladi. Bu zaryadlar o‘z maydoni bilan tashqi maydonni o‘tkazgich ichida aynan kompensatsiyalaydi, shuning uchun muvozanatda ichkarida E = 0 bo‘ladi.','Kuch chiziqlari o‘tkazgich sirtiga tik kiradi va chiqadi. Bo‘shliqli o‘tkazgich ichida ham maydon yo‘q — bu Faradey qafasi. Mikroto‘lqinli pech devori, kabelning metall to‘ri, chaqmoq paytida avtomobil kuzovi shu tarzda himoya qiladi.'],
  legend:[['E₀','tashqi maydon kuchlanganligi, kV/m'],['a','silindr radiusi, sm'],['σ','sirt zaryad zichligi, nC/m²'],['θ','maydon yo‘nalishidan o‘lchangan burchak'],['ε₀','8,85·10⁻¹² F/m']],
  tries:['Zondni silindr ichiga olib kiring: maydon nolga teng.','Zondni silindrning o‘ng va chap qutbiga yaqinlashtiring: maydon tashqi maydondan 2 marta kuchli.','E₀ ni oshiring: induksion zaryadlar ko‘payadi, lekin ichkarida baribir E = 0.'],
  params:[{id:'E0',label:'Tashqi maydon',sym:'E₀',min:1,max:20,step:0.5,val:5,unit:'kV/m',d:1},{id:'a',label:'Silindr radiusi',sym:'a',min:2,max:7,step:0.1,val:4,unit:'sm',d:1}],
  init(P){return{cg:{x:0.5,y:0.5},pr:{x:0.8,y:0.3},drag:0,ph:0,key:''};},
  step(S,P,dt){S.ph+=dt*30*Math.sqrt(P.E0/5);},
  geo(S,P,W,H){const pc=Math.min(W,H)/22;return{pc,cx:S.cg.x*W,cy:S.cg.y*H,a:P.a*pc};},
  E(S,P,W,H,x,y){const g=this.geo(S,P,W,H),dx=x-g.cx,dy=y-g.cy,r2=dx*dx+dy*dy;if(r2<g.a*g.a)return[0,0];const r=Math.sqrt(r2),ct=dx/r,st=dy/r,q=g.a*g.a/r2,Er=(1+q)*ct,Et=-(1-q)*st;return[Er*ct-Et*st,Er*st+Et*ct];},
  pointer(type,x,y,S,P){if(!S.W)return false;const g=this.geo(S,P,S.W,S.H);if(type==='down'){if(Math.hypot(x-S.pr.x*S.W,y-S.pr.y*S.H)<20){S.drag=2;return true;}if(Math.hypot(x-g.cx,y-g.cy)<g.a+6){S.drag=1;S.ox=x-g.cx;S.oy=y-g.cy;return true;}return false;}
    if(type==='move'){if(S.drag===2){S.pr.x=clamp(x/S.W,0.08,0.92);S.pr.y=clamp(y/S.H,0.04,0.96);return true;}if(S.drag===1){S.cg.x=clamp((x-S.ox)/S.W,0.25,0.75);S.cg.y=clamp((y-S.oy)/S.H,0.25,0.75);return true;}}if(type==='up')S.drag=0;return false;},
  lines(S,P,W,H){const key=JSON.stringify([S.cg,P.a,W,H]);if(S.key===key)return S.ls;const g=this.geo(S,P,W,H),out=[],x0=W*0.08,x1=W*0.92,n=Math.max(9,Math.round(H/26));
    for(let j=0;j<n;j++){let x=x0+2,y=(j+0.5)*H/n,pts=[[x,y]],jumped=false;for(let s=0;s<900;s++){const [ex,ey]=this.E(S,P,W,H,x,y),e=Math.hypot(ex,ey);if(e<1e-9)break;x+=ex/e*3;y+=ey/e*3;
      if(Math.hypot(x-g.cx,y-g.cy)<g.a){pts.push([x,y]);out.push(pts);if(jumped)break;jumped=true;x=2*g.cx-x;y=y;const dx=x-g.cx,dy=y-g.cy,r=Math.hypot(dx,dy);x=g.cx+dx/r*(g.a+1);y=g.cy+dy/r*(g.a+1);pts=[[x,y]];continue;}pts.push([x,y]);if(x>x1||y<0||y>H)break;}out.push(pts);}
    S.key=key;S.ls=out;return out;},
  draw(c,W,H,S,P){S.W=W;S.H=H;grid(c,W,H,28);const g=this.geo(S,P,W,H),ls=this.lines(S,P,W,H);S.g={cx:g.cx,cy:g.cy,a:g.a};
    c.fillStyle='#c94a4a';c.fillRect(W*0.08-14,8,10,H-16);c.fillStyle='#3a6fd0';c.fillRect(W*0.92+4,8,10,H-16);for(let y=24;y<H;y+=36){txt(c,'+',W*0.08-26,y,C.red,{font:'700 14px sans-serif'});txt(c,'−',W*0.92+18,y,C.accent,{font:'700 14px sans-serif'});}
    ls.forEach(pts=>{c.strokeStyle=rgba('violet',0.6);c.lineWidth=1.5;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();polyDots(c,pts,S.ph,rgba('warm',0.9),40,2.2);});
    c.fillStyle=rgba('panel',0.95);c.beginPath();c.arc(g.cx,g.cy,g.a,0,TAU);c.fill();c.strokeStyle='#9aa4b6';c.lineWidth=6;c.stroke();txt(c,'E = 0',g.cx,g.cy,C.green,{align:'center',font:'700 15px "IBM Plex Mono", monospace'});
    for(let k=0;k<28;k++){const t=k/28*TAU,cs=Math.cos(t);if(Math.abs(cs)<0.18)continue;const n=Math.round(Math.abs(cs)*Math.sqrt(P.E0/5)*2.2);if(!n)continue;txt(c,cs>0?'+':'−',g.cx+Math.cos(t)*(g.a-11),g.cy+Math.sin(t)*(g.a-11),cs>0?C.red:C.accent,{align:'center',font:`700 ${10+Math.min(n,4)*1.5}px sans-serif`});}
    const px=S.pr.x*W,py=S.pr.y*H,[ex,ey]=this.E(S,P,W,H,px,py),e=Math.hypot(ex,ey);disk(c,px,py,6,'#fff',C.ink);if(e>0.02)arrow(c,px,py,px+ex*40,py+ey*40,C.green,2.6,'E');txt(c,fmt(e*P.E0,2)+' kV/m',px+10,py+18,C.ink,{font:SMALL});},
  read(S,P){if(!S.W)return[];const [ex,ey]=this.E(S,P,S.W,S.H,S.pr.x*S.W,S.pr.y*S.H),e=Math.hypot(ex,ey);return[['Tashqi maydon E₀',fmt(P.E0,1)+' kV/m'],['Zonddagi maydon',fmt(e*P.E0,2)+' kV/m'],['E / E₀',fmt(e,2)],['Silindr ichida','E = 0'],['Eng katta sirt zichligi σ',fmt(2*8.85e-12*P.E0*1000*1e9,1)+' nC/m²']];}
});

/* 15. Ampermetr shunti va voltmetr qo‘shimcha qarshiligi */
SIMS.push({id:'shunt',cat:'tok',title:'Ampermetr shunti va voltmetrning qo‘shimcha qarshiligi',short:'R_sh = I_gR_g / (I − I_g)',
  sub:'Sezgir galvanometr faqat 1 mA tokka chidaydi. Unga parallel shunt ulasak katta toklarni o‘lchaydigan ampermetr, ketma-ket katta qarshilik ulasak voltmetr hosil bo‘ladi.',
  formula:`<span><i>R</i><sub>sh</sub> = ${fr('<i>I</i><sub>g</sub><i>R</i><sub>g</sub>','<i>I</i> − <i>I</i><sub>g</sub>')}</span><span class="alt"><i>R</i><sub>q</sub> = ${fr('<i>U</i>','<i>I</i><sub>g</sub>')} − <i>R</i><sub>g</sub></span>`,
  text:['Galvanometr strelkasi o‘zidan o‘tgan tokka proporsional buriladi. Uning o‘lchash chegarasini n marta kengaytirish uchun ampermetrga R_g/(n − 1) qarshilikli shunt parallel ulanadi: tokning asosiy qismi shuntdan, juda kichik qismi galvanometrdan o‘tadi.','Voltmetr yasash uchun galvanometrga katta qo‘shimcha qarshilik ketma-ket ulanadi. Yaxshi ampermetrning qarshiligi juda kichik bo‘lishi kerak (zanjirga ketma-ket ulanadi), yaxshi voltmetrniki esa juda katta (zanjirga parallel ulanadi).'],
  legend:[['I_g','galvanometrning to‘la og‘ish toki, 1 mA'],['R_g','galvanometr qarshiligi, 100 Ω'],['R_sh','shunt qarshiligi, Ω'],['R_q','qo‘shimcha qarshilik, Ω'],['n','o‘lchash chegarasini kengaytirish soni']],
  tries:['Ampermetr chegarasini 10 A qiling: shunt qarshiligi atigi 0,01 Ω ga tushadi.','O‘lchanayotgan tokni chegaradan oshiring: strelka chetga urilib qoladi.','Voltmetr rejimida chegarani 100 V qiling: qo‘shimcha qarshilik ≈ 100 kΩ bo‘ladi.'],
  params:[{id:'mo',label:'Rejim (0 — ampermetr, 1 — voltmetr)',sym:'',min:0,max:1,step:1,val:0,unit:'',d:0},{id:'Im',label:'Ampermetr chegarasi',sym:'I',min:0.01,max:10,step:0.01,val:1,unit:'A',d:2},{id:'I',label:'O‘lchanayotgan tok',sym:'I_x',min:0,max:12,step:0.01,val:0.6,unit:'A',d:2},{id:'Um',label:'Voltmetr chegarasi',sym:'U',min:1,max:250,step:1,val:10,unit:'V',d:0},{id:'U',label:'O‘lchanayotgan kuchlanish',sym:'U_x',min:0,max:300,step:0.5,val:6,unit:'V',d:1}],
  Ig:1e-3,Rg:100,
  calc(P){if(!P.mo){const Rsh=this.Ig*this.Rg/Math.max(P.Im-this.Ig,1e-9),ig=P.I*Rsh/(Rsh+this.Rg);return{R:Rsh,ig,fr:ig/this.Ig,n:P.Im/this.Ig,meas:P.I,max:P.Im,unit:'A'};}
    const Rq=P.Um/this.Ig-this.Rg,ig=P.U/(Rq+this.Rg);return{R:Rq,ig,fr:ig/this.Ig,n:P.Um/(this.Ig*this.Rg),meas:P.U,max:P.Um,unit:'V'};},
  init(P){return{ph:0,ang:-0.9};},
  step(S,P,dt){S.ph+=dt;const q=this.calc(P),tgt=-0.9+1.8*clamp(q.fr,0,1.06);S.ang+=(tgt-S.ang)*Math.min(1,dt*5);},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),narrow=W<640,L=30,T=narrow?36:60,R=narrow?W-30:W*0.56,B=narrow?H*0.5:H-50,my=(T+B)/2;S.g={L,T,R,B};
    line(c,L,T,R,T,C.ink,2.5);line(c,L,B,R,B,C.ink,2.5);line(c,L,T,L,my-14,C.ink,2.5);line(c,L,my+14,L,B,C.ink,2.5);line(c,L-14,my-14,L+14,my-14,C.ink,3);line(c,L-8,my+2,L+8,my+2,C.ink,6);txt(c,'+',L+18,my-20,C.red);
    const bx=(L+R)/2,G=(x,y)=>{disk(c,x,y,17,C.panel,C.ink);txt(c,'G',x,y,C.ink,{align:'center',font:'700 14px "IBM Plex Sans", sans-serif'});},res=(x,y,w,lab,col)=>{c.fillStyle=col;rrect(c,x-w/2,y-10,w,20,4);c.fill();c.strokeStyle=C.ink;c.lineWidth=1.5;c.stroke();txt(c,lab,x,y-18,C.ink,{align:'center',font:SMALL});};
    const sp=60;if(!P.mo){const lx=L+(R-L)*0.3;res(lx,T,60,'iste’molchi',rgba('warm',0.7));c.fillStyle=C.canvas;c.fillRect(R-6,T+8,12,B-T-16);
      const ax=R,y1=my-34,y2=my+34;line(c,ax,T,ax,my-60,C.ink,2.5);line(c,ax,my+60,ax,B,C.ink,2.5);line(c,ax-60,my-60,ax+60,my-60,C.ink,2.5);line(c,ax-60,my+60,ax+60,my+60,C.ink,2.5);line(c,ax-60,my-60,ax-60,my+60,C.ink,2.5);line(c,ax+60,my-60,ax+60,my+60,C.ink,2.5);
      c.fillStyle=C.canvas;c.fillRect(ax-70,my-24,20,48);c.fillRect(ax+50,my-24,20,48);G(ax-60,my);res(ax+60,my,22,'',rgba('accent',0.6));txt(c,'R_sh',ax+78,my,C.accent,{font:SMALL});
      const ph=S.ph*sp*Math.min(1,P.I*0.8+0.1);polyDots(c,[[L,my-14],[L,T],[R,T],[R,my-60]],ph,C.warm,22);polyDots(c,[[R,my+60],[R,B],[L,B],[L,my+2]],ph,C.warm,22);
      polyDots(c,[[ax,my-60],[ax+60,my-60],[ax+60,my+60],[ax,my+60]],ph*1.6,C.warm,14);if(q.ig>1e-6)polyDots(c,[[ax,my-60],[ax-60,my-60],[ax-60,my+60],[ax,my+60]],S.ph*sp*0.25*clamp(q.fr,0,1),C.green,22);}
    else{const lx=L+(R-L)*0.55;res(lx,T,60,'lampa',rgba('warm',0.7));const vy=T+70;line(c,lx-50,T,lx-50,vy,C.ink,2);line(c,lx+50,T,lx+50,vy,C.ink,2);line(c,lx-50,vy,lx-26,vy,C.ink,2);line(c,lx-8,vy,lx+16,vy,C.ink,2);line(c,lx+44,vy,lx+50,vy,C.ink,2);G(lx-26+9,vy);res(lx+30,vy,28,'R_q',rgba('accent',0.6));
      const ph=S.ph*sp*0.6;polyDots(c,[[L,my-14],[L,T],[R,T],[R,B],[L,B],[L,my+2]],ph,C.warm,22);polyDots(c,[[lx-50,T],[lx-50,vy],[lx+50,vy],[lx+50,T]],S.ph*sp*0.25*clamp(q.fr,0,1),C.green,22);}
    const dx=narrow?W*0.5:W*0.79,dy=narrow?H*0.8:H*0.55,dr=narrow?Math.min(W*0.32,H*0.17):Math.min(W*0.18,H*0.34);c.fillStyle=C.panel;rrect(c,dx-dr*1.15,dy-dr*1.05,dr*2.3,dr*1.5,12);c.fill();c.strokeStyle=C.ink;c.lineWidth=2;c.stroke();
    c.strokeStyle=C.ink;c.lineWidth=1.5;c.beginPath();c.arc(dx,dy+dr*0.25,dr*0.85,-Math.PI/2-0.9,-Math.PI/2+0.9);c.stroke();for(let i=0;i<=10;i++){const a=-Math.PI/2-0.9+1.8*i/10,r1=dr*0.85,r2=r1-(i%2?6:12);line(c,dx+Math.cos(a)*r1,dy+dr*0.25+Math.sin(a)*r1,dx+Math.cos(a)*r2,dy+dr*0.25+Math.sin(a)*r2,C.ink,1.4);if(i%2===0)txt(c,fmt(q.max*i/10,q.max<1?3:q.max<10?1:0),dx+Math.cos(a)*(r1+12),dy+dr*0.25+Math.sin(a)*(r1+12),C.muted,{align:'center',font:SMALL});}
    const na=-Math.PI/2+S.ang;line(c,dx,dy+dr*0.25,dx+Math.cos(na)*dr*0.8,dy+dr*0.25+Math.sin(na)*dr*0.8,q.fr>1.02?C.red:C.red,2.4);disk(c,dx,dy+dr*0.25,5,C.ink);txt(c,P.mo?'V':'A',dx,dy+dr*0.05,C.ink,{align:'center',font:'700 16px "IBM Plex Sans", sans-serif'});
    txt(c,q.fr>1.02?'Ortiqcha yuk!':fmt(q.meas,2)+' '+q.unit,dx,dy-dr*1.2,q.fr>1.02?C.red:C.ink,{align:'center',font:'700 15px "IBM Plex Mono", monospace'});},
  read(S,P){const q=this.calc(P);return[[P.mo?'Qo‘shimcha qarshilik R_q':'Shunt qarshiligi R_sh',fmt(q.R,q.R<1?4:q.R<100?2:0)+' Ω'],['Kengaytirish soni n',fmt(q.n,0)],['Galvanometr toki',fmt(q.ig*1000,3)+' mA'],['Asbob qarshiligi',fmt(P.mo?q.R+this.Rg:q.R*this.Rg/(q.R+this.Rg),P.mo?0:4)+' Ω'],['Ko‘rsatish',q.fr>1.02?'chegaradan oshdi':fmt(q.meas,2)+' '+q.unit]];}
});

/* 16. Siklotron */
const CYP=[['proton',1.6726e-27,1],['deytron',3.3436e-27,1],['alfa-zarra',6.6447e-27,2]];
SIMS.push({id:'siklotron',cat:'mag',title:'Siklotron: zarralarni tezlatgich',short:'f = qB / 2πm',
  sub:'Zarra magnit maydonda yarim aylana chizadi, ikki «D» orasidagi tirqishda esa o‘zgaruvchan kuchlanish uni har safar tezlatadi. Aylanish davri tezlikka bog‘liq emas, shuning uchun generator chastotasi o‘zgarmas.',
  formula:`<span><i>r</i> = ${fr('<i>mv</i>','<i>qB</i>')}, &nbsp;<i>f</i> = ${fr('<i>qB</i>','2π<i>m</i>')}</span><span class="alt"><i>E</i><sub>max</sub> = ${fr('<i>q</i>²<i>B</i>²<i>R</i>²','2<i>m</i>')}</span>`,
  text:['Lorens kuchi zarrani aylanaga buradi: qvB = mv²/r. Bundan r = mv/(qB) va aylanish davri T = 2πm/(qB) — tezlikka bog‘liq emas. Tezroq zarra kattaroq aylana chizadi, lekin uni xuddi shuncha vaqtda o‘tadi. Shuning uchun tirqishdagi kuchlanish yo‘nalishini o‘zgarmas chastota bilan almashtirib turish kifoya.','Har aylanishda zarra ikki marta qU energiya oladi va spiral bo‘ylab tashqariga chiqadi. Eng katta energiya D larning radiusi R va maydon B bilan chegaralanadi. Juda katta tezliklarda massa relyativistik ortadi va zarra generatordan orqada qola boshlaydi — bu siklotron chegarasi.'],
  legend:[['B','magnit induksiya, T'],['U','tirqishdagi kuchlanish amplitudasi, kV'],['R','D larning radiusi, m'],['f','siklotron chastotasi, MHz'],['E_max','chiqishdagi energiya, MeV']],
  tries:['B ni oshiring: chastota va chiqish energiyasi ortadi (E ∝ B²).','U ni oshiring: zarra kamroq aylanishda tezlashadi, lekin oxirgi energiya o‘zgarmaydi.','Alfa-zarrani tanlang: q/m protonnikidan 2 marta kichik — chastota ham 2 marta kichik.'],
  params:[{id:'B',label:'Magnit induksiya',sym:'B',min:0.5,max:2,step:0.05,val:1.5,unit:'T',d:2,reset:1},{id:'U',label:'Tezlatuvchi kuchlanish',sym:'U',min:10,max:200,step:5,val:50,unit:'kV',d:0,reset:1},{id:'R',label:'D lar radiusi',sym:'R',min:0.3,max:1,step:0.05,val:0.5,unit:'m',d:2,reset:1},{id:'pt',label:'Zarra (0 — proton, 1 — deytron, 2 — alfa)',sym:'',min:0,max:2,step:1,val:0,unit:'',d:0,reset:1}],
  calc(P){const [nm,m,z]=CYP[P.pt],q=z*1.602e-19,f=q*P.B/(TAU*m),Em=(q*P.B*P.R)**2/(2*m),N=Em/(2*q*P.U*1e3),vm=q*P.B*P.R/m;return{nm,m,q,f,T:1/f,Em,N,vm,kk:Math.max(1,Math.ceil(N/14))};},
  init(P){const q=this.calc(P),hs=[];let k=0,yc=null,prevEnd=null;while(k<400){const E=(k+1)*q.kk*q.q*P.U*1e3,r=Math.sqrt(2*q.m*E)/(q.q*P.B);if(r>P.R*0.97)break;const side=k%2===0?1:-1;if(k===0)yc=r;else yc=side>0?prevEnd+r:prevEnd-r;hs.push({r,yc,side,E});prevEnd=side>0?yc+r:yc-r;k++;}return{hs,t:0,done:0};},
  step(S,P,dt){S.t+=dt;const n=S.hs.length;if(S.t>n*0.32+1.8)S.t=0;},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),narrow=W<640,cx=narrow?W*0.5:W*0.36,cy=narrow?H*0.4:H*0.5,Rp=narrow?Math.min(W*0.42,H*0.34):Math.min(W*0.3,H*0.44),sc=Rp/P.R,gap=10;S.g={cx,cy,Rp};
    c.fillStyle=rgba('accent',0.12);c.strokeStyle=rgba('accent',0.8);c.lineWidth=3;c.beginPath();c.arc(cx+gap/2,cy,Rp,-Math.PI/2,Math.PI/2);c.closePath();c.fill();c.stroke();c.beginPath();c.arc(cx-gap/2,cy,Rp,Math.PI/2,3*Math.PI/2);c.closePath();c.fill();c.stroke();
    txt(c,'D₁',cx+Rp*0.7,cy-Rp*0.75,C.accent,{font:'700 14px sans-serif'});txt(c,'D₂',cx-Rp*0.8,cy-Rp*0.75,C.accent,{font:'700 14px sans-serif'});for(let i=0;i<6;i++)for(let j=0;j<6;j++){const x=cx-Rp+(i+0.5)*Rp/3,y=cy-Rp+(j+0.5)*Rp/3;if(Math.hypot(x-cx,y-cy)<Rp-8)txt(c,'⊙',x,y,rgba('violet',0.5),{align:'center',font:'12px sans-serif'});}
    const k=Math.floor(S.t/0.32),f=(S.t%0.32)/0.32,n=S.hs.length,pt=(h,u)=>{const a=h.side>0?-Math.PI/2+Math.PI*u:Math.PI/2+Math.PI*u;return[cx+h.side*gap/2+h.r*sc*Math.cos(a),cy-Rp*0+((h.yc-S.hs[0].r)*sc)+h.r*sc*Math.sin(a)];};
    c.strokeStyle=rgba('warm',0.55);c.lineWidth=1.6;for(let i=0;i<Math.min(k,n);i++){c.beginPath();for(let u=0;u<=1.0001;u+=0.05){const p=pt(S.hs[i],u);u?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);}c.stroke();}
    let pos,E=0;if(k<n){const h=S.hs[k];c.strokeStyle=C.warm;c.lineWidth=2.4;c.beginPath();for(let u=0;u<=f;u+=0.03){const p=pt(h,u);u?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);}c.stroke();pos=pt(h,f);E=h.E;
      const dir=h.side;arrow(c,cx-dir*gap*1.6,cy+Rp*0.88,cx+dir*gap*1.6,cy+Rp*0.88,C.green,2,'E');}
    else if(n){const h=S.hs[n-1],p0=pt(h,1),ex=(S.t-n*0.32)*Rp*1.4;pos=[p0[0]+(h.side>0?-1:1)*ex,p0[1]];E=h.E;line(c,p0[0],p0[1],pos[0],pos[1],C.warm,2.4);txt(c,'chiqish',pos[0],pos[1]-14,C.warm,{align:'center',font:SMALL});}
    if(pos)disk(c,pos[0],pos[1],6,'#fff',C.warm);txt(c,'E = '+fmt(E/1.602e-13,2)+' MeV',narrow?20:W*0.72,narrow?H*0.84:60,C.ink,{font:'700 16px "IBM Plex Mono", monospace'});
    txt(c,q.kk>1?'tasvirda har yarim aylanish ≈ '+q.kk+' ta haqiqiy':'',narrow?20:W*0.72,narrow?H*0.84+22:84,C.muted,{font:SMALL});txt(c,'B ⊙ (bizga qarab)',narrow?20:W*0.72,narrow?H*0.84+40:104,C.violet,{font:SMALL});},
  read(S,P){const q=this.calc(P);return[['Zarra',q.nm],['Siklotron chastotasi f',fmt(q.f/1e6,2)+' MHz'],['Aylanish davri T',fmt(q.T*1e9,1)+' ns'],['Chiqish energiyasi',fmt(q.Em/1.602e-13,1)+' MeV'],['Chiqish tezligi',fmt(q.vm/3e8,3)+' c'],['Aylanishlar soni',fmt(q.N,0)],['Tezlatish vaqti',fmt(q.N*q.T*1e6,1)+' mks']];}
});

/* 17. O‘zgarmas tok elektr dvigateli */
SIMS.push({id:'motor',cat:'mag',title:'O‘zgarmas tok elektr dvigateli',short:'M = NBIS·sin α',
  sub:'Magnit maydondagi tokli ramkaga Amper kuchlari juft kuch momentini beradi. Kollektor har yarim aylanishda tok yo‘nalishini almashtiradi, shuning uchun ramka doim bir tomonga aylanadi.',
  formula:`<span><i>M</i> = <i>NBIS</i> |sin <i>α</i>|</span><span class="alt"><i>I</i> = ${fr('<i>U</i> − ℰ<sub>t</sub>','<i>R</i>')}, &nbsp;ℰ<sub>t</sub> = <i>NBSω</i> |sin <i>α</i>|</span>`,
  text:['Ramkaning maydonga tik tomonlariga F = NBIL kuchlar qarama-qarshi yo‘nalishda ta’sir qiladi va kuch momenti hosil qiladi. Ramka tekisligi maydonga tik bo‘lganda (α = 0) moment nolga teng — bu «o‘lik nuqta»; shu payt kollektor tokni teskari tomonga o‘zgartiradi.','Aylanayotgan ramkada induksiya EYK — teskari EYK hosil bo‘ladi va tokni kamaytiradi. Yuksiz dvigatel tez aylanib, kam tok oladi. Yuk qo‘shilsa, aylanish sekinlashadi, teskari EYK kamayadi va tok ortadi — dvigatel kerakli momentni o‘zi «topadi».'],
  legend:[['U','manba kuchlanishi, V'],['B','magnit induksiya, T'],['N, S','o‘ramlar soni (100) va ramka yuzi (30 sm²)'],['M_yuk','yuk momenti, N·m'],['ℰ_t','teskari EYK, V']],
  tries:['Yuk momentini oshiring: aylanish sekinlashadi, tok va iste’mol qilinadigan quvvat ortadi.','Kuchlanishni ikki marta oshiring: yuksiz aylanish tezligi ham taxminan ikki marta ortadi.','B ni kamaytiring: dvigatel tezroq aylanadi, lekin kichikroq momentni ko‘taradi.'],
  params:[{id:'U',label:'Kuchlanish',sym:'U',min:0,max:12,step:0.1,val:6,unit:'V',d:1},{id:'B',label:'Magnit induksiya',sym:'B',min:0.05,max:0.5,step:0.01,val:0.2,unit:'T',d:2},{id:'Ml',label:'Yuk momenti',sym:'M_yuk',min:0,max:0.05,step:0.001,val:0.005,unit:'N·m',d:3}],
  N:100,A:0.003,R:1.5,J:4e-4,b:2e-5,
  init(P){return{th:0.5,w:0,td:0,I:0,Ia:0,emf:0,tau:0,hist:[],t:0};},
  step(S,P,dt){const K=this.N*P.B*this.A,n=60,h=dt/n;let Is=0,es=0;for(let i=0;i<n;i++){const s=Math.abs(Math.sin(S.th)),emf=K*S.w*s,I=(P.U-emf)/this.R,td=K*I*s;let tq=td-this.b*S.w;if(Math.abs(S.w)<0.3&&Math.abs(tq)<=P.Ml){S.w=0;}else{tq-=P.Ml*Math.sign(S.w||tq);S.w+=tq/this.J*h;}S.th+=S.w*h;Is+=I;es+=emf;}
    S.I=Is/n;S.emf=es/n;S.Ia+=(S.I-S.Ia)*Math.min(1,dt*3);const sl=Math.max(1,Math.abs(S.w)/(TAU*1.2));S.sl=sl;S.td+=S.w*dt/sl;S.t+=dt;if(S.t>0.1){S.t=0;S.hist.push(S.w*60/TAU);if(S.hist.length>120)S.hist.shift();}},
  draw(c,W,H,S,P){grid(c,W,H,28);const narrow=W<640,cx=narrow?W*0.5:W*0.36,cy=narrow?H*0.36:H*0.48,rc=narrow?Math.min(W*0.2,H*0.18):Math.min(W*0.16,H*0.27);S.g={cx,cy,rc};
    c.fillStyle='#d64545';rrect(c,cx-rc*2.2,cy-rc*1.1,rc*0.7,rc*2.2,8);c.fill();c.fillStyle='#3a6fd0';rrect(c,cx+rc*1.5,cy-rc*1.1,rc*0.7,rc*2.2,8);c.fill();txt(c,'N',cx-rc*1.85,cy,'#fff',{align:'center',font:'700 20px sans-serif'});txt(c,'S',cx+rc*1.85,cy,'#fff',{align:'center',font:'700 20px sans-serif'});
    for(let i=-2;i<=2;i++)arrow(c,cx-rc*1.45,cy+i*rc*0.42,cx+rc*1.45,cy+i*rc*0.42,rgba('violet',0.28),1.4);txt(c,'B',cx+rc*1.3,cy-rc*0.95,C.violet);
    const a=S.td-Math.PI/2,ux=Math.cos(a),uy=Math.sin(a),p1=[cx+ux*rc,cy+uy*rc],p2=[cx-ux*rc,cy-uy*rc];line(c,p1[0],p1[1],p2[0],p2[1],'#d88a3a',7);disk(c,cx,cy,6,C.ink);
    const right=p1[0]>=p2[0]?p1:p2,left=p1[0]>=p2[0]?p2:p1,I=S.I;[[right,1],[left,-1]].forEach(([p,s])=>{disk(c,p[0],p[1],12,C.panel,C.ink);const out=(s>0)===(I>=0);txt(c,out?'⊙':'⊗',p[0],p[1],C.warm,{align:'center',font:'700 18px sans-serif'});const F=this.N*P.B*Math.abs(I)*0.06,L=clamp(F*5,0,rc*0.9);if(L>3)arrow(c,p[0],p[1],p[0],p[1]-s*Math.sign(I||1)*L,C.green,2.6,'F');});
    const kx=narrow?W*0.2:W*0.12,ky=narrow?H*0.7:H*0.86,kr=Math.min(28,H*0.06);c.strokeStyle='#d88a3a';c.lineWidth=7;c.beginPath();c.arc(kx,ky,kr,a+0.25,a+Math.PI-0.25);c.stroke();c.beginPath();c.arc(kx,ky,kr,a+Math.PI+0.25,a+TAU-0.25);c.stroke();
    c.fillStyle='#5b6475';c.fillRect(kx-kr-16,ky-6,12,12);c.fillRect(kx+kr+4,ky-6,12,12);txt(c,'+',kx-kr-24,ky,C.red,{align:'center'});txt(c,'−',kx+kr+24,ky,C.accent,{align:'center'});txt(c,'kollektor',kx,ky+kr+14,C.muted,{align:'center',font:SMALL});
    const gx=narrow?W*0.42:W*0.64,gw=narrow?W*0.52:W*0.32,gy=narrow?H*0.62:H*0.12,gh=narrow?H*0.26:H*0.36,ym=Math.max(500,...S.hist.map(Math.abs))*1.1;gplot(c,gx,gy,gw,gh,{x0:0,x1:12,y0:0,y1:ym,xt:3,yt:niceStep(ym,4),xl:'t, s',yl:'ayl/min',lines:[[S.hist.map((v,i)=>[i*0.1,v]),C.accent,2.2]]});
    if(S.sl>1.05)txt(c,'tasvir '+fmt(S.sl,0)+' marta sekinlashtirilgan',14,20,C.muted,{font:SMALL});},
  read(S,P){const rpm=S.w*60/TAU,Pin=P.U*S.Ia,Pm=P.Ml*S.w;return[['Aylanish tezligi',fmt(rpm,0)+' ayl/min'],['Tok kuchi I',fmt(S.Ia,2)+' A'],['Teskari EYK',fmt(S.emf,2)+' V'],['Iste’mol quvvati UI',fmt(Pin,1)+' W'],['Foydali quvvat',fmt(Pm,2)+' W'],['FIK',Pin>0.01?fmt(100*Pm/Pin,0)+' %':'—']];}
});

/* 18. Burchak ostidagi ikki yassi ko‘zgu */
SIMS.push({id:'yassikozgu',cat:'opt',title:'Burchak ostidagi ikki yassi ko‘zgu: tasvirlar soni',short:'n = 360°/α − 1',
  sub:'Ikki yassi ko‘zgu orasidagi buyumning tasvirlari ko‘zgularda qayta-qayta aks etadi. Barcha tasvirlar uchidan o‘tgan aylanada yotadi. Buyumni sichqoncha bilan suring.',
  formula:`<span><i>n</i> = ${fr('360°','<i>α</i>')} − 1</span><span class="alt">qaytish qonuni: <i>β</i> = <i>α</i>′</span>`,
  text:['Yassi ko‘zgu buyumning simmetrik, mavhum va teng kattalikdagi tasvirini beradi. Ikkinchi ko‘zgu birinchi ko‘zgudagi tasvirni «buyum» deb qabul qilib, uning ham tasvirini hosil qiladi va hokazo. Tasvir ikkala ko‘zguning orqasiga tushganda zanjir to‘xtaydi.','Agar 360°/α butun son bo‘lsa, tasvirlar soni 360°/α − 1 ga teng va buyumning joylashuviga bog‘liq emas. Kaleydoskop shu hodisaga asoslangan (α = 60° da 5 ta tasvir). Juft sondagi aks etishdan hosil bo‘lgan tasvirlar buyum bilan bir xil yo‘nalgan, toq sondagilari esa ko‘zgudagidek teskari.'],
  legend:[['α','ko‘zgular orasidagi burchak'],['n','tasvirlar soni'],['1, 2, 3…','tasvir nechta aks etishdan hosil bo‘lgani'],['strelka','buyum yo‘nalishi (toq aks etishda teskari)'],['punktir aylana','barcha tasvirlar yotadigan aylana']],
  tries:['α = 90° qiling: 3 ta tasvir.','α = 60° (kaleydoskop): 5 ta tasvir; α = 45°: 7 ta tasvir.','α = 180° qiling: ko‘zgular bitta tekislikka aylanadi — faqat 1 ta tasvir.'],
  params:[{id:'al',label:'Ko‘zgular orasidagi burchak',sym:'α',min:20,max:180,step:1,val:72,unit:'°',d:0}],
  init(P){return{r:0.6,th:0.4,t:0,drag:false};},
  step(S,P,dt){S.t+=dt;},
  imgs(S,P){const al=P.al*D2R,th=clamp(S.th,0.02,0.98)*al,ps=th+0.6,out=[];[0,1].forEach(st=>{let a=th,o=ps,m=st;for(let k=0;k<40;k++){const front=m===0?Math.sin(a)>1e-9:Math.sin(al-a)>1e-9;if(!front)break;if(m===0){a=-a;o=-o;}else{a=2*al-a;o=2*al-o;}out.push({a,o,k:k+1});m=1-m;}});
    const u=[];out.forEach(p=>{const n=((p.a%TAU)+TAU)%TAU;if(!u.some(q=>{const d=Math.abs((((q.a%TAU)+TAU)%TAU)-n);return Math.min(d,TAU-d)<1e-6;}))u.push(p);});return{th,ps,list:u};},
  pointer(type,x,y,S,P){const g=S.g;if(!g)return false;const dx=x-g.vx,dy=g.vy-y,r=Math.hypot(dx,dy),a=Math.atan2(dy,dx),al=P.al*D2R;if(type==='down'){const ox=g.vx+Math.cos(g.th)*g.R*S.r,oy=g.vy-Math.sin(g.th)*g.R*S.r;if(Math.hypot(x-ox,y-oy)<26){S.drag=true;return true;}return false;}
    if(type==='move'&&S.drag){S.r=clamp(r/g.R,0.2,0.95);let aa=a;if(aa<0)aa+=TAU;S.th=clamp(aa/al,0.03,0.97);return true;}if(type==='up')S.drag=false;return false;},
  draw(c,W,H,S,P){grid(c,W,H,28);const al=P.al*D2R,vx=W*0.5,vy=P.al>120?H*0.62:H*0.55,R=Math.min(W*0.4,H*0.42),q=this.imgs(S,P),or=R*S.r;S.g={vx,vy,R,th:q.th};
    const mir=a=>{const x2=vx+Math.cos(a)*R,y2=vy-Math.sin(a)*R;line(c,vx,vy,x2,y2,'#8fc7ff',5);const nx=Math.sin(a),ny=Math.cos(a);for(let s=0.08;s<1;s+=0.07){const x=vx+Math.cos(a)*R*s,y=vy-Math.sin(a)*R*s;line(c,x,y,x+ (a===0?-1:1)*0,y,C.muted,1);}};
    c.strokeStyle=rgba('muted',0.5);c.setLineDash([4,5]);c.beginPath();c.arc(vx,vy,or,0,TAU);c.stroke();c.setLineDash([]);
    c.fillStyle=rgba('accent',0.08);c.beginPath();c.moveTo(vx,vy);c.arc(vx,vy,R,-al,0);c.closePath();c.fill();
    const hatch=(a,sg)=>{for(let s=0.05;s<1;s+=0.06){const x=vx+Math.cos(a)*R*s,y=vy-Math.sin(a)*R*s,nx=Math.cos(a+sg*Math.PI/2)*8,ny=-Math.sin(a+sg*Math.PI/2)*8;line(c,x,y,x+nx+Math.cos(a)*5,y+ny-Math.sin(a)*5,rgba('muted',0.6),1);}};hatch(0,-1);hatch(al,1);
    line(c,vx,vy,vx+R,vy,'#8fc7ff',5);line(c,vx,vy,vx+Math.cos(al)*R,vy-Math.sin(al)*R,'#8fc7ff',5);
    const show=Math.floor(S.t*1.4)%(Math.max(...q.list.map(p=>p.k),0)+3);
    const obj=(a,o,col,alp,lab)=>{const x=vx+Math.cos(a)*or,y=vy-Math.sin(a)*or;c.globalAlpha=alp;disk(c,x,y,11,col);arrow(c,x,y,x+Math.cos(o)*30,y-Math.sin(o)*30,col,2.6);if(lab)txt(c,lab,x,y+22,C.ink,{align:'center',font:SMALL});c.globalAlpha=1;};
    q.list.forEach(p=>{if(p.k<=show){const x=vx+Math.cos(p.a)*or,y=vy-Math.sin(p.a)*or;obj(p.a,p.o,p.k%2?C.violet:C.warm,0.85-p.k*0.08,String(p.k));}});obj(q.th,q.ps,C.red,1,'buyum');if(S.drag)selRing(c,vx+Math.cos(q.th)*or,vy-Math.sin(q.th)*or,22);
    txt(c,'α = '+P.al+'°',vx+40*Math.cos(al/2),vy-40*Math.sin(al/2),C.ink,{align:'center',font:'600 13px "IBM Plex Mono", monospace'});txt(c,'tasvirlar: '+q.list.length,20,26,C.ink,{font:'700 16px "IBM Plex Sans", sans-serif'});},
  read(S,P){const q=this.imgs(S,P),n=360/P.al;return[['Burchak α',P.al+'°'],['360° / α',fmt(n,2)],['Tasvirlar soni',String(q.list.length)],['Formula bo‘yicha',Math.abs(n-Math.round(n))<1e-9?String(Math.round(n)-1):'butun emas'],['Eng ko‘p aks etish',String(Math.max(0,...q.list.map(p=>p.k)))]];}
});

/* 19. Mikroskop */
SIMS.push({id:'mikroskop',cat:'opt',title:'Mikroskop: obyektiv va okulyar',short:'Γ = (Δ/F₁)·(25 sm/F₂)',
  sub:'Obyektiv buyumning kattalashgan haqiqiy teskari tasvirini beradi, okulyar esa lupa kabi bu tasvirni yana kattalashtiradi. Ko‘z yakuniy mavhum tasvirni ko‘radi.',
  formula:`<span><i>Γ</i> = <i>Γ</i><sub>ob</sub>·<i>Γ</i><sub>ok</sub> = ${fr('<i>f</i>₁','<i>d</i>₁')}·${fr('25 sm','<i>d</i>₂')}</span><span class="alt">${fr('1','<i>F</i>')} = ${fr('1','<i>d</i>')} + ${fr('1','<i>f</i>')}</span>`,
  text:['Buyum obyektivning fokusidan sal nariroqqa qo‘yiladi (F₁ < d₁ < 2F₁), shuning uchun obyektiv uning tubusda katta haqiqiy teskari tasvirini hosil qiladi. Bu oraliq tasvir okulyarning fokusi ichida bo‘lsa, okulyar lupa vazifasini bajaradi va mavhum, yana kattalashgan tasvir beradi.','Umumiy kattalashtirish ikki kattalashtirish ko‘paytmasiga teng. Shuning uchun obyektivning fokus masofasi juda kichik (bir necha mm) qilinadi. Optik mikroskopda foydali kattalashtirish ≈ 1500 marta bilan chegaralangan — undan kichik detallarni yorug‘lik difraksiyasi xiralashtiradi.'],
  legend:[['F₁, F₂','obyektiv va okulyar fokus masofalari, sm'],['d₁','buyumdan obyektivgacha masofa'],['f₁','obyektivdan oraliq tasvirgacha masofa'],['d₂','oraliq tasvirdan okulyargacha masofa'],['Γ','umumiy kattalashtirish']],
  tries:['d₁ − F₁ ni kamaytiring: oraliq tasvir uzoqlashadi va kattalashadi.','F₂ ni kichraytiring: okulyar kattaroq kattalashtiradi.','Oraliq tasvirni okulyar fokusidan tashqariga chiqaring: yakuniy tasvir haqiqiy bo‘lib qoladi — ko‘z uni ko‘ra olmaydi.'],
  params:[{id:'f1',label:'Obyektiv fokusi',sym:'F₁',min:0.4,max:1.5,step:0.05,val:0.8,unit:'sm',d:2},{id:'dd',label:'Buyum fokusdan nariroqda',sym:'d₁ − F₁',min:0.03,max:0.5,step:0.01,val:0.08,unit:'sm',d:2},{id:'f2',label:'Okulyar fokusi',sym:'F₂',min:1.5,max:5,step:0.1,val:2.5,unit:'sm',d:1},{id:'L',label:'Linzalar orasidagi masofa',sym:'L',min:6,max:20,step:0.2,val:11,unit:'sm',d:1}],
  calc(P){const d1=P.f1+P.dd,fi=d1*P.f1/P.dd,G1=fi/d1,d2=P.L-fi;let fv=null,G2=null,virt=false;if(d2>0&&d2<P.f2){fv=d2*P.f2/(P.f2-d2);virt=true;G2=25/d2;}else if(d2>P.f2){fv=d2*P.f2/(d2-P.f2);G2=fv/d2;}return{d1,fi,G1,d2,fv,G2,virt,G:G2!=null?G1*G2:null};},
  init(P){return{t:0};},
  step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),x0=-q.d1-1.2,x1=P.L+5,sx=(W-40)/(x1-x0),X=x=>20+(x-x0)*sx,ay=H*0.5,h1=0.32*H,h0p=h1/q.G1,sy=h0p/0.1,Y=y=>ay-y*sy,h0=0.1;S.g={X0:X(0),XL:X(P.L),ay};
    line(c,0,ay,W,ay,rgba('muted',0.7),1.2,[6,4]);const lens=(x,lab,f)=>{const xp=X(x);line(c,xp,ay-H*0.42,xp,ay+H*0.42,'#8fc7ff',4);arrow(c,xp,ay-H*0.36,xp,ay-H*0.43,'#8fc7ff',3);arrow(c,xp,ay+H*0.36,xp,ay+H*0.43,'#8fc7ff',3);txt(c,lab,xp,ay-H*0.45-8,C.accent,{align:'center',font:SMALL});[-f,f].forEach(d=>{disk(c,X(x+d),ay,3.5,C.violet);});};
    lens(0,'obyektiv',P.f1);lens(P.L,'okulyar',P.f2);txt(c,'F₁',X(P.f1),ay+14,C.violet,{align:'center',font:SMALL});txt(c,'F₂',X(P.L-P.f2),ay+14,C.violet,{align:'center',font:SMALL});
    arrow(c,X(-q.d1),ay,X(-q.d1),Y(h0),C.red,3);txt(c,'buyum',X(-q.d1),Y(h0)-12,C.red,{align:'center',font:SMALL});
    const hi=-h0*q.G1;arrow(c,X(q.fi),ay,X(q.fi),Y(hi),C.green,3);txt(c,'oraliq tasvir',X(q.fi),Y(hi)+14,C.green,{align:'center',font:SMALL});
    const rays=[[h0,-h0/P.f1,C.warm],[0,-h0/q.d1,C.accent]];c.save();c.beginPath();c.rect(0,0,W,H);c.clip();
    rays.forEach(([y0,m,col])=>{const yL=y0===0?0:y0;const yEp=yL+m*P.L;line(c,X(-q.d1),Y(h0),X(0),Y(yL),col,2);line(c,X(0),Y(yL),X(P.L),Y(yEp),col,2);const mo=m-yEp/P.f2;line(c,X(P.L),Y(yEp),X(x1),Y(yEp+mo*(x1-P.L)),col,2);
      if(q.virt){line(c,X(P.L),Y(yEp),X(P.L-q.fv),Y(yEp-mo*q.fv),rgba('muted',0.8),1.3,[5,4]);}});
    if(q.virt){const hf=hi*q.fv/q.d2;line(c,X(P.L-q.fv),ay,X(P.L-q.fv),Y(hf),rgba('violet',0.8),3,[6,4]);txt(c,'yakuniy mavhum tasvir',X(P.L-q.fv),Y(hf)+(hf<0?16:-12),C.violet,{align:'center',font:SMALL});}c.restore();
    const ex=X(P.L+3),ey=ay;c.fillStyle='#f3e6cf';c.beginPath();c.ellipse(ex,ey,14,9,0,0,TAU);c.fill();disk(c,ex-3,ey,5,'#3a2a1a');txt(c,'ko‘z',ex,ey+22,C.muted,{align:'center',font:SMALL});
    txt(c,q.G?'Γ ≈ '+fmt(q.G,0)+' marta':'tasvir yo‘q',W-20,24,C.ink,{align:'right',font:'700 17px "IBM Plex Mono", monospace'});if(!q.virt)txt(c,'Oraliq tasvir okulyar fokusidan tashqarida',W-20,46,C.red,{align:'right',font:SMALL});},
  read(S,P){const q=this.calc(P);return[['Buyum masofasi d₁',fmt(q.d1,2)+' sm'],['Oraliq tasvir masofasi f₁',fmt(q.fi,2)+' sm'],['Obyektiv kattalashtirishi',fmt(q.G1,1)+' marta'],['Oraliq tasvirdan okulyargacha d₂',fmt(q.d2,2)+' sm'],['Okulyar kattalashtirishi',q.G2?fmt(q.G2,1)+' marta':'—'],['Umumiy kattalashtirish Γ',q.G?fmt(q.G,0)+' marta':'—']];}
});
