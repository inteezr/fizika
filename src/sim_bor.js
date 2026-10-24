/* Bor atomi modeli */
const En=n=>-13.6/(n*n),SER={1:'Layman (ultrabinafsha)',2:'Balmer (ko‘zga ko‘rinadigan)',3:'Pashen (infraqizil)',4:'Brekett (infraqizil)',5:'Pfund (infraqizil)'};
SIMS.push({id:'bor',cat:'yad',title:'Bor atomi va spektr chiziqlari',short:'hν = Eₖ − Eₙ',
  sub:'Atomdagi elektron faqat ruxsat etilgan orbitalarda bo‘ladi; orbitadan orbitaga o‘tganda foton chiqaradi yoki yutadi.',
  formula:`<span><i>hν</i> = <i>E</i><sub><i>k</i></sub> − <i>E</i><sub><i>n</i></sub></span><span class="alt"><i>E</i><sub><i>n</i></sub> = −${fr('13,6 eV','<i>n</i><sup>2</sup>')} &nbsp; ${fr('1','<i>λ</i>')} = <i>R</i>(${fr('1','<i>n</i><sup>2</sup>')} − ${fr('1','<i>k</i><sup>2</sup>')})</span>`,
  text:['Vodorod atomida elektron energiyasi faqat ma’lum qiymatlarni oladi. Elektronni yuqori orbitaga ko‘tarish uchun atom aniq energiyali fotonni yutishi kerak. Pastga tushganda esa xuddi shu energiyali foton chiqaradi.','Istalgan orbitani bosing: elektron o‘sha sathga o‘tadi. Fotonning rangi uning to‘lqin uzunligini bildiradi. 2-sathga tushishda (Balmer seriyasi) ko‘zga ko‘rinadigan qizil, ko‘k va binafsha chiziqlar hosil bo‘ladi.'],
  legend:[['n, k','orbitalar (energetik sathlar) raqami'],['Eₙ','n-sath energiyasi, eV'],['h','Plank doimiysi'],['ν','foton chastotasi'],['R','Ridberg doimiysi, 1,097·10⁷ m⁻¹']],
  tries:['Elektronni 3-sathga ko‘taring va 2-sathga tushiring: 656 nm qizil chiziq (Hα).','1-sathga tushadigan o‘tishlar ultrabinafsha foton beradi — ko‘zga ko‘rinmaydi.','Avtomatik qaytishni yoqing va spektrda qanday chiziqlar yig‘ilishini kuzating.'],
  params:[{id:'auto',label:'Avtomatik pastga qaytish',choices:[[1,'Yoqilgan'],[0,'O‘chirilgan']],val:1}],
  hint:'Orbitani bosing',
  init:()=>({n:1,ang:0,ph:[],tr:[],wait:0,last:null,lines:[],g:{}}),
  step(S,P,dt){S.ang+=dt*3/(S.n*S.n)**0.7;S.ph.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.inc&&Math.hypot(p.x-S.g.cx,p.y-S.g.cy)<p.r){p.dead=1;S.n=p.to;S.wait=0;}});S.ph=S.ph.filter(p=>!p.dead&&p.x>-40&&p.x<(S.g.W||900)+40&&p.y>-40&&p.y<(S.g.H||600)+40);
    S.wait+=dt;if(P.auto&&S.n>1&&S.wait>1.4&&!S.ph.some(p=>p.inc)){const to=1+Math.floor(Math.random()*(S.n-1));this.jump(S,to);}},
  jump(S,to){if(to===S.n)return;const g=S.g,lam=1240/Math.abs(En(S.n)-En(to)),a=S.ang;
    if(to<S.n){const r=g.r(S.n),x=g.cx+Math.cos(a)*r,y=g.cy-Math.sin(a)*r;S.ph.push({x,y,vx:Math.cos(a)*220,vy:-Math.sin(a)*220,lam});S.tr.unshift([S.n,to,lam]);S.last=[S.n,to,lam];S.lines.push(lam);if(S.lines.length>40)S.lines.shift();S.n=to;S.wait=0;}
    else{S.ph.push({x:6,y:g.cy,vx:220,vy:0,lam,inc:1,to,r:g.r(to)});S.tr.unshift([S.n,to,lam]);S.last=[S.n,to,lam];}if(S.tr.length>5)S.tr.pop();},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W*0.33,cy=H*0.5,Rm=Math.min(W*0.3,H*0.46),r=n=>Rm*(n/6)**1.3;S.g={cx,cy,r,W,H};
    for(let n=1;n<=6;n++){c.strokeStyle=n===S.n?C.accent:C.line;c.lineWidth=n===S.n?2:1.2;c.setLineDash(n===S.n?[]:[4,5]);c.beginPath();c.arc(cx,cy,r(n),0,TAU);c.stroke();c.setLineDash([]);txt(c,'n='+n,cx+r(n)*0.71+4,cy-r(n)*0.71-4,C.muted,{font:SMALL});}
    txt(c,'orbitalar masshtabi siqib ko‘rsatilgan (aslida rₙ ∝ n²)',12,H-12,C.muted,{font:SMALL});disk(c,cx,cy,7,C.red);const ex=cx+Math.cos(S.ang)*r(S.n),ey=cy-Math.sin(S.ang)*r(S.n);disk(c,ex,ey,5.5,C.accent);
    S.ph.forEach(p=>{const L=22,sp=Math.hypot(p.vx,p.vy),ux=p.vx/sp,uy=p.vy/sp,k=TAU*(5-Math.min(p.lam,1000)/250)/L;c.strokeStyle=wl2rgb(p.lam);c.lineWidth=2.2;c.beginPath();for(let i=0;i<=L;i+=1.5){const o=Math.sin(i*k)*4;c.lineTo(p.x-ux*i-uy*o,p.y-uy*i+ux*o);}c.stroke();});
    const lx=W*0.66,lr=W-20,lt=H*0.1,lb=H*0.7,Y=E=>lb-(E+13.6)/13.6*(lb-lt);txt(c,'Energiya, eV',lx,lt-14,C.muted);
    for(let n=1;n<=6;n++){const y=Y(En(n));line(c,lx,y,lr,y,n===S.n?C.accent:C.ink,n===S.n?2.5:1.2);txt(c,fmt(En(n),2),lr,y-8,C.muted,{align:'right',font:SMALL});txt(c,'n='+n,lx-4,y,C.muted,{align:'right',font:SMALL});}
    S.tr.forEach(([a,b,lam],i)=>{const x=lx+20+i*((lr-lx-60)/5);arrow(c,x,Y(En(a)),x,Y(En(b)),wl2rgb(lam),2.5);});
    const sx=lx,sw=lr-lx,sy=H*0.8,sh=22;const gr=c.createLinearGradient(sx,0,sx+sw,0);[380,450,500,560,600,650,700].forEach(l=>gr.addColorStop((l-380)/320,wl2rgb(l)));c.globalAlpha=0.18;c.fillStyle=gr;c.fillRect(sx,sy,sw,sh);c.globalAlpha=1;
    S.lines.forEach(l=>{if(l>=380&&l<=700){const x=sx+(l-380)/320*sw;line(c,x,sy,x,sy+sh,wl2rgb(l),3);}});c.strokeStyle=C.line;c.lineWidth=1;c.strokeRect(sx,sy,sw,sh);txt(c,'380 nm',sx,sy+sh+12,C.muted,{font:SMALL});txt(c,'700 nm',sx+sw,sy+sh+12,C.muted,{align:'right',font:SMALL});txt(c,'Ko‘rinadigan spektr',sx,sy-8,C.muted,{font:SMALL});
  },
  pointer(type,x,y,S,P,api){if(type!=='down')return false;const g=S.g,d=Math.hypot(x-g.cx,y-g.cy);let best=0,bd=1e9;for(let n=1;n<=6;n++){const e=Math.abs(d-g.r(n));if(e<bd){bd=e;best=n;}}if(bd>18)return false;SIMS.find(s=>s.id==='bor').jump(S,best);return true;},
  read:(S,P)=>{const out=[['Elektron sathi n',String(S.n)],['Sath energiyasi Eₙ',fmt(En(S.n),2)+' eV']];if(S.last){const[a,b,l]=S.last;out.push(['Oxirgi foton λ',fmt(l,0)+' nm'],['O‘tish',a+' → '+b+(b<a?' · '+(SER[b]||''):' (yutilish)')]);}return out;}
});
