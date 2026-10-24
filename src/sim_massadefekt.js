/* Massa defekti va bog‘lanish energiyasi */
const MD_N=[['²H',1,1,2.014102],['⁴He',2,2,4.002602],['⁷Li',3,4,7.016004],['¹²C',6,6,12],['¹⁶O',8,8,15.994915],['⁵⁶Fe',26,30,55.934936],['⁶²Ni',28,34,61.928345],['⁹²Kr',36,56,91.926156],['¹⁴¹Ba',56,85,140.914411],['²³⁵U',92,143,235.04393],['²³⁸U',92,146,238.050788]];
const MD_MP=1.007825,MD_MN=1.008665,MD_U=931.494;
function mdE(i){const[,Z,N,M]=MD_N[i],dm=Z*MD_MP+N*MD_MN-M;return{dm,E:dm*MD_U,A:Z+N};}
function mdInit(P){const[,Z,N]=MD_N[P.n],A=Z+N,pts=[],R=Math.cbrt(A);let k=0;const ga=Math.PI*(3-Math.sqrt(5));
  for(let i=0;i<A;i++){const r=Math.sqrt((i+0.5)/A)*R,a=i*ga;const p=k<Z&&(i*Z/A)>=k-0.001;if(p)k++;pts.push({p,hx:r*Math.cos(a),hy:r*Math.sin(a),sx:(Math.random()-0.5)*2,sy:(Math.random()-0.5)*2});}
  let zc=pts.filter(q=>q.p).length;for(let i=pts.length-1;zc<Z&&i>=0;i--)if(!pts[i].p){pts[i].p=true;zc++;}
  return{t:0,pts};}
SIMS.push({id:'massadefekt',cat:'yad',title:'Massa defekti va bog‘lanish energiyasi',short:'E_b = Δm·c²',
  sub:'Yadro massasi uni tashkil etgan proton va neytronlar massalari yig‘indisidan kichik. Bu “yo‘qolgan” massa yadroni birlashtirib turgan bog‘lanish energiyasiga teng.',
  formula:`<span>Δ<i>m</i> = <i>Z m</i><sub>p</sub> + <i>N m</i><sub>n</sub> − <i>M</i><sub>yadro</sub></span><span class="alt"><i>E</i><sub>b</sub> = Δ<i>m c</i>², &nbsp;1 u·c² = 931,5 MeV</span>`,
  text:['Nuklonlar birlashib yadro hosil qilganda bog‘lanish energiyasi gamma-nurlanish ko‘rinishida ajraladi, shu sababli yadroning massasi kamayadi (E = mc²). Yadroni qayta bo‘laklarga ajratish uchun xuddi shuncha energiya sarflash kerak.','Bir nuklonga to‘g‘ri keladigan bog‘lanish energiyasi temir va nikel atrofida eng katta (≈ 8,8 MeV). Shuning uchun yengil yadrolar qo‘shilganda (sintez) ham, og‘ir yadrolar bo‘linganda ham energiya ajraladi. Hisoblashda atom massalari ishlatilgan, shuning uchun protonga vodorod atomi massasi olingan.'],
  legend:[['Z, N','protonlar va neytronlar soni'],['mₚ, mₙ','1,007825 u (¹H atomi), 1,008665 u'],['M','atom massasi, u'],['E_b / A','bir nuklonga bog‘lanish energiyasi, MeV']],
  tries:['⁵⁶Fe ni tanlang: uning E_b/A qiymati eng kattalaridan biri.','²³⁵U va ⁹²Kr + ¹⁴¹Ba ni solishtiring: bo‘lingandan keyin nuklonlar kuchliroq bog‘langan bo‘ladi.','²H dan ⁴He ga o‘tishda E_b/A keskin oshadi — Quyosh energiyasining manbai shu.'],
  params:[{id:'n',label:'Yadro',choices:MD_N.map((q,i)=>[i,q[0]]),val:1,reset:1}],
  init:mdInit,
  step(S,P,dt){S.t+=dt;if(S.t>7)Object.assign(S,mdInit(P));},
  draw(c,W,H,S,P){grid(c,W,H,28);const[nm,Z,N,M]=MD_N[P.n],{dm,E,A}=mdE(P.n),cx=W*0.24,cy=H*0.42,R=Math.min(W*0.18,H*0.3),nr=Math.max(2.5,Math.min(13,R*0.8/Math.cbrt(A))),f=clamp((S.t-0.6)/2,0,1),e=f*f*(3-2*f);S.g={cx,cy,R,f:e};
    S.pts.forEach(q=>{const x=cx+(q.sx*R*1.5*(1-e)+q.hx*nr*1.9*e),y=cy+(q.sy*R*1.2*(1-e)+q.hy*nr*1.9*e);disk(c,x,y,nr,q.p?C.red:'#8a94a6',rgba('ink',0.5));});
    if(S.t>2.6&&S.t<4){const k=(S.t-2.6)/1.4;for(let i=0;i<8;i++){const a=i/8*TAU+0.3,r1=R*0.5+k*R*1.6;c.strokeStyle=`rgba(180,120,255,${1-k})`;c.lineWidth=2;c.beginPath();for(let j=0;j<20;j++){const rr=r1+j*3,x=cx+Math.cos(a)*rr+Math.sin(j*1.5)*4*-Math.sin(a),y=cy+Math.sin(a)*rr+Math.sin(j*1.5)*4*Math.cos(a);j?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}txt(c,'γ  E = '+fmt(E,1)+' MeV',cx,cy-R-14,C.violet,{align:'center'});}
    txt(c,nm+':  '+Z+' p + '+N+' n',cx,H*0.84,C.ink,{align:'center'});
    const bx=cx-70,by=H*0.92,mt=Z*MD_MP+N*MD_MN,bw=140;txt(c,'Σm = '+fmt(mt,4)+' u   M = '+fmt(M,4)+' u',cx,by,C.muted,{align:'center',font:SMALL});void bx;void bw;
    const gx=W*0.5,gw=W*0.46,gt=H*0.1,gb=H*0.82,Xa=a=>gx+a/250*gw,Ye=v=>gb-v/9.5*(gb-gt);line(c,gx,gb,gx+gw,gb,C.ink,1.2);line(c,gx,gb,gx,gt,C.ink,1.2);
    [0,50,100,150,200,250].forEach(a=>txt(c,a+'',Xa(a),gb+12,C.muted,{align:'center',font:SMALL}));[0,2,4,6,8].forEach(v=>{txt(c,v+'',gx-6,Ye(v),C.muted,{align:'right',font:SMALL});line(c,gx,Ye(v),gx+gw,Ye(v),rgba('muted',0.15),1);});
    txt(c,'E_b/A, MeV',gx+4,gt-8,C.muted,{font:SMALL});txt(c,'A',gx+gw,gb+26,C.muted,{font:MATH,align:'right'});
    c.strokeStyle=rgba('accent',0.7);c.lineWidth=2;c.beginPath();for(let a=4;a<=250;a+=1){const z=a/(1.98+0.0155*a**(2/3)),B=15.75*a-17.8*a**(2/3)-0.711*z*(z-1)/a**(1/3)-23.7*(a-2*z)**2/a;const y=Ye(Math.max(0,B/a));a>4?c.lineTo(Xa(a),y):c.moveTo(Xa(a),y);}c.stroke();
    MD_N.forEach((q,i)=>{const r=mdE(i);disk(c,Xa(r.A),Ye(r.E/r.A),i===P.n?7:4,i===P.n?C.red:C.ink);if(i===P.n||[1,5,10].includes(i))txt(c,q[0],Xa(r.A)+(r.A>200?-8:8),Ye(r.E/r.A)-12,i===P.n?C.red:C.muted,{font:SMALL,align:r.A>200?'right':'left'});});
  },
  read(S,P){const{dm,E,A}=mdE(P.n);return[['Massa defekti Δm',fmt(dm,6)+' u'],['Bog‘lanish energiyasi E_b',fmt(E,2)+' MeV'],['Bir nuklonga E_b/A',fmt(E/A,3)+' MeV'],['Massaning nisbiy kamayishi',fmt(dm/(A)*100,3)+' %']];}
});
