/* Elektr maydon potensiali va ish */
SIMS.push({id:'potensial',cat:'est',title:'Potensial va ekvipotensial sirtlar',short:'A = q(φ₁ − φ₂)',
  sub:'Maydonning har bir nuqtasi o‘z potensialiga ega. Zaryadni ko‘chirishda maydon bajargan ish yo‘lga emas, faqat boshlang‘ich va oxirgi nuqtalar potensiallari farqiga bog‘liq.',
  formula:`<span><i>φ</i> = <i>k</i>${fr('<i>Q</i>','<i>r</i>')}</span><span class="alt"><i>A</i> = <i>q</i>(<i>φ</i><sub>1</sub> − <i>φ</i><sub>2</sub>), &nbsp;<i>E</i> = −${fr('Δ<i>φ</i>','Δ<i>d</i>')}</span>`,
  text:['Nuqtaviy zaryad maydonining potensiali φ = kQ/r. Bir nechta zaryad bo‘lsa, potensiallar algebraik qo‘shiladi. Rang — potensial qiymati: qizil — musbat, ko‘k — manfiy. Ingichka chiziqlar — ekvipotensial chiziqlar, ularda potensial bir xil.','Elektr maydon kuchlari konservativ: sinov zaryadi q ni istalgan yo‘l bilan ko‘chirsangiz ham ish A = q(φ₁ − φ₂). Ekvipotensial chiziq bo‘ylab harakatda ish nolga teng. Maydon kuchlanganligi ekvipotensial chiziqlarga tik va potensial kamayadigan tomonga yo‘nalgan.'],
  legend:[['φ','potensial, V'],['q','sinov zaryadi, nC'],['A','maydon bajargan ish, μJ'],['Q₁, Q₂','maydon hosil qiluvchi zaryadlar, nC']],
  tries:['Sinov zaryadini sudrab, bir ekvipotensial chiziq bo‘ylab yurgizing: ish deyarli o‘zgarmaydi.','Zaryadni boshlang‘ich nuqtaga qaytaring: qanday yo‘l bilan yurgizsangiz ham ish nolga qaytadi.','Q₂ ni musbat qiling: ekvipotensial chiziqlar shakli o‘zgaradi, o‘rtada potensial “egar” hosil bo‘ladi.'],
  hint:'Sinov zaryadini yoki katta zaryadlarni sudrang',
  params:[{id:'Q1',label:'1-zaryad',sym:'Q₁',min:-10,max:10,step:0.5,val:6,unit:'nC',d:1},{id:'Q2',label:'2-zaryad',sym:'Q₂',min:-10,max:10,step:0.5,val:-6,unit:'nC',d:1},{id:'q',label:'Sinov zaryadi',sym:'q',min:-5,max:5,step:0.5,val:2,unit:'nC',d:1}],
  init:()=>({c:[[-0.25,0],[0.25,0]],tq:[0,0.22],start:[0,0.22],auto:true,t:0,drag:null,key:''}),
  phi(S,P,x,y){const k=8.99e9;let v=0;[[P.Q1,S.c[0]],[P.Q2,S.c[1]]].forEach(([q,[cx,cy]])=>{const r=Math.max(0.025,Math.hypot(x-cx,y-cy));v+=k*q*1e-9/r;});return v;},
  step(S,P,dt){S.t+=dt;if(S.auto){const a=S.t*0.5;S.tq=[0.42*Math.cos(a+1.4)*1.1,0.22*Math.sin(a+1.4)+0.0];if(S.t<0.02)S.start=S.tq.slice();}},
  draw(c,W,H,S,P){const sim=SIMS.find(s=>s.id==='potensial'),sc=Math.min(W/1.3,H/0.8),cx=W/2,cy=H/2,X=x=>cx+x*sc,Y=y=>cy-y*sc;S.sc=sc;S.cx=cx;S.cy=cy;S.g={sc,cx,cy};
    const key=[W,H,P.Q1,P.Q2,S.c.flat().join()].join();if(S.key!==key||!S.img){const cs=6,nx=Math.ceil(W/cs),ny=Math.ceil(H/cs),cv=document.createElement('canvas');cv.width=nx;cv.height=ny;const g=cv.getContext('2d'),im=g.createImageData(nx,ny),F=[];
      for(let j=0;j<=ny;j++){F[j]=[];for(let i=0;i<=nx;i++)F[j][i]=sim.phi(S,P,(i*cs-cx)/sc,(cy-j*cs)/sc);}
      for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const v=F[j][i],t=Math.tanh(v/1500),o=(j*nx+i)*4;im.data[o]=t>0?255:Math.round(255*(1+t)*0.9);im.data[o+1]=Math.round(255*(1-Math.abs(t))*0.85+20);im.data[o+2]=t<0?255:Math.round(255*(1-t)*0.9);im.data[o+3]=Math.round(40+150*Math.abs(t));}
      g.putImageData(im,0,0);S.img=cv;S.F=F;S.cs=cs;S.key=key;}
    c.imageSmoothingEnabled=true;c.globalAlpha=0.9;c.drawImage(S.img,0,0,S.img.width*S.cs,S.img.height*S.cs);c.globalAlpha=1;grid(c,W,H,28);
    const F=S.F,cs=S.cs,levels=[-3000,-1500,-800,-400,-200,0,200,400,800,1500,3000];c.lineWidth=1.2;
    levels.forEach(L=>{c.strokeStyle=L===0?rgba('ink',0.7):rgba('ink',0.35);c.beginPath();for(let j=0;j<F.length-1;j++)for(let i=0;i<F[j].length-1;i++){const a=F[j][i]-L,b=F[j][i+1]-L,d=F[j+1][i]-L,e=F[j+1][i+1]-L,p=[];
      if(a*b<0)p.push([i+a/(a-b),j]);if(b*e<0)p.push([i+1,j+b/(b-e)]);if(d*e<0)p.push([i+d/(d-e),j+1]);if(a*d<0)p.push([i,j+a/(a-d)]);if(p.length>=2){c.moveTo(p[0][0]*cs,p[0][1]*cs);c.lineTo(p[1][0]*cs,p[1][1]*cs);}if(p.length===4){c.moveTo(p[2][0]*cs,p[2][1]*cs);c.lineTo(p[3][0]*cs,p[3][1]*cs);}}c.stroke();});
    [[P.Q1,S.c[0]],[P.Q2,S.c[1]]].forEach(([q,[x,y]])=>{const r=10+Math.abs(q)*1.4;disk(c,X(x),Y(y),r,q>0?C.red:q<0?C.accent:C.muted,C.ink);txt(c,q>0?'+':q<0?'−':'0',X(x),Y(y)+1,'#fff',{align:'center',font:'700 16px sans-serif'});});
    const[sx,sy]=S.start,[tx,ty]=S.tq;line(c,X(sx),Y(sy),X(tx),Y(ty),rgba('ink',0.4),1,[4,4]);disk(c,X(sx),Y(sy),5,null,C.ink);txt(c,'1',X(sx)-12,Y(sy)-10,C.ink,{font:SMALL});
    const k=8.99e9;let Ex=0,Ey=0;[[P.Q1,S.c[0]],[P.Q2,S.c[1]]].forEach(([q,[x,y]])=>{const dx=tx-x,dy=ty-y,r=Math.max(0.03,Math.hypot(dx,dy));Ex+=k*q*1e-9*dx/r**3;Ey+=k*q*1e-9*dy/r**3;});
    const Em=Math.hypot(Ex,Ey)||1,fl=Math.min(60,10+Math.log10(1+Em)*9)*Math.sign(P.q||1);if(P.q)arrow(c,X(tx),Y(ty),X(tx)+Ex/Em*fl,Y(ty)-Ey/Em*fl,C.green,2.5,'F');
    disk(c,X(tx),Y(ty),8,C.warm,C.ink);txt(c,'q',X(tx)+12,Y(ty)-12,C.warm,{font:MATH});
  },
  pointer(type,x,y,S,P){const wx=(x-S.cx)/S.sc,wy=(S.cy-y)/S.sc,d=(p)=>Math.hypot(p[0]-wx,p[1]-wy)*S.sc;
    if(type==='down'){if(d(S.tq)<18){S.drag='q';if(S.auto){S.auto=false;S.start=S.tq.slice();}return true;}const i=S.c.findIndex(p=>d(p)<22);if(i>=0){S.drag=i;return true;}if(S.auto){S.auto=false;}S.tq=[wx,wy];S.start=[wx,wy];S.drag='q';return true;}
    if(type==='move'&&S.drag!==null){if(S.drag==='q')S.tq=[wx,wy];else S.c[S.drag]=[wx,wy];}
    if(type==='up')S.drag=null;},
  read(S,P){const sim=SIMS.find(s=>s.id==='potensial'),p1=sim.phi(S,P,...S.start),p2=sim.phi(S,P,...S.tq);return[['φ₁ (boshlang‘ich nuqta)',fmt(p1,0)+' V'],['φ₂ (hozirgi nuqta)',fmt(p2,0)+' V'],['Maydon ishi A = q(φ₁−φ₂)',fmt(P.q*1e-9*(p1-p2)*1e6,3)+' μJ'],['Potensial energiya qφ',fmt(P.q*1e-9*p2*1e6,3)+' μJ']];}
});
