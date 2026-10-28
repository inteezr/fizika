/* ===== v9: yangi mavzular (1-qism): kin, sta, saq, teb, mol, trm ===== */

/* 1. Tekis tezlanuvchan aylanma harakat */
SIMS.push({id:'burchaktez',cat:'kin',title:'Tekis tezlanuvchan aylanma harakat',short:'ω = ω₀ + εt',
  sub:'G‘ildirak burchak tezlanish bilan aylanadi. Gardishdagi nuqtaning chiziqli tezligi, urinma va normal tezlanishlari bir vaqtda ko‘rsatiladi.',
  formula:`<span><i>ω</i> = <i>ω</i>₀ + <i>εt</i>, &nbsp;<i>φ</i> = <i>ω</i>₀<i>t</i> + ${fr('<i>εt</i>²','2')}</span><span class="alt"><i>a</i><sub>τ</sub> = <i>εR</i>, &nbsp;<i>a</i><sub>n</sub> = <i>ω</i>²<i>R</i></span>`,
  text:['Aylanma harakatda burchak tezlik ω vaqt o‘tishi bilan o‘zgarsa, uning o‘zgarish tezligi burchak tezlanish ε deyiladi. Tekis tezlanuvchan aylanishda ε o‘zgarmas, shuning uchun formulalar to‘g‘ri chiziqli tekis tezlanuvchan harakatnikiga o‘xshaydi: x o‘rniga φ, v o‘rniga ω, a o‘rniga ε.','Gardishdagi nuqtaning tezlanishi ikki qismdan iborat: urinma tezlanish a_τ = εR tezlik kattaligini o‘zgartiradi, normal tezlanish a_n = ω²R esa markazga yo‘nalgan va tezlik yo‘nalishini buradi. ω ortgani sari normal tezlanish tez o‘sadi.'],
  legend:[['ω','burchak tezlik, rad/s'],['ε','burchak tezlanish, rad/s²'],['φ','burilish burchagi, rad'],['R','g‘ildirak radiusi, m'],['a_τ, a_n','urinma va normal tezlanish, m/s²']],
  tries:['ε = 0 qiling: harakat tekis aylanma bo‘ladi, urinma tezlanish yo‘qoladi.','ε ni manfiy qiling: g‘ildirak sekinlashadi, to‘xtaydi va teskari tomonga aylana boshlaydi.','R ni oshiring: bir xil ω da chiziqli tezlik va ikkala tezlanish ham ortadi.'],
  params:[{id:'w0',label:'Boshlang‘ich burchak tezlik',sym:'ω₀',min:0,max:6,step:0.1,val:1,unit:'rad/s',d:1,reset:1},{id:'e',label:'Burchak tezlanish',sym:'ε',min:-1.5,max:1.5,step:0.05,val:0.5,unit:'rad/s²',d:2,reset:1},{id:'R',label:'G‘ildirak radiusi',sym:'R',min:0.2,max:1.5,step:0.05,val:1,unit:'m',d:2}],
  init(P){return{t:0,trail:[]};},
  step(S,P,dt){S.t+=dt;const w=P.w0+P.e*S.t;if(S.t>12||Math.abs(w)>14){S.t=0;S.trail=[];}},
  phi(S,P){return P.w0*S.t+P.e*S.t*S.t/2;},
  draw(c,W,H,S,P){grid(c,W,H,28);const narrow=W<640,cx=narrow?W*0.5:W*0.27,cy=narrow?H*0.3:H*0.5,Rp=narrow?Math.min(W*0.3,H*0.24):Math.min(W*0.2,H*0.36);const phi=this.phi(S,P),w=P.w0+P.e*S.t;S.g={cx,cy,Rp,phi};
    c.fillStyle=rgba('panel',0.9);c.beginPath();c.arc(cx,cy,Rp,0,TAU);c.fill();c.strokeStyle=C.ink;c.lineWidth=3;c.stroke();
    for(let k=0;k<6;k++){const a=phi+k*TAU/6;line(c,cx,cy,cx+Math.cos(a)*Rp,cy-Math.sin(a)*Rp,rgba('muted',0.6),2);}disk(c,cx,cy,7,C.ink);
    const px=cx+Math.cos(phi)*Rp,py=cy-Math.sin(phi)*Rp;S.trail.push([px,py]);if(S.trail.length>40)S.trail.shift();S.trail.forEach((p,i)=>disk(c,p[0],p[1],2,rgba('warm',i/40)));
    const tx=-Math.sin(phi),ty=-Math.cos(phi),v=w*P.R,at=P.e*P.R,an=w*w*P.R,k=24,cl=x=>clamp(x,-170,170);
    if(Math.abs(v)>0.02)arrow(c,px,py,px+tx*cl(v*k),py+ty*cl(v*k),C.green,2.6,'v');
    if(Math.abs(at)>0.02)arrow(c,px,py,px+tx*cl(at*k*2),py+ty*cl(at*k*2),C.violet,2.4,'aτ');
    if(an>0.02){const L=Math.min(an*k*2,Rp-8);arrow(c,px,py,px-Math.cos(phi)*L,py+Math.sin(phi)*L,C.red,2.4,'aₙ');}
    disk(c,px,py,8,C.warm);txt(c,'φ = '+fmt(phi,1)+' rad',cx,cy+Rp+22,C.muted,{align:'center'});
    const gx=narrow?44:W*0.56,gw=narrow?W-70:W*0.4,gh=narrow?H*0.16:H*0.3,g1=narrow?H*0.6:H*0.1,g2=narrow?g1+gh+40:g1+gh+56;
    let lo=0,hi=1;for(let t=0;t<=12;t+=0.2){const x=P.w0+P.e*t;if(Math.abs(x)<=14){lo=Math.min(lo,x);hi=Math.max(hi,x);}}
    const ws=[],ps=[];let plo=0,phh=1;for(let t=0;t<=S.t+1e-9;t+=0.05){const ww=P.w0+P.e*t,pp=P.w0*t+P.e*t*t/2;ws.push([t,ww]);ps.push([t,pp]);plo=Math.min(plo,pp);phh=Math.max(phh,pp);}
    gplot(c,gx,g1,gw,gh,{x0:0,x1:12,y0:lo,y1:hi*1.05,xt:2,yt:niceStep(hi-lo,4),xl:'t, s',yl:'ω, rad/s',lines:[[ws,C.accent,2.4]],marks:[[S.t,w,C.warm]]});
    gplot(c,gx,g2,gw,gh,{x0:0,x1:12,y0:plo,y1:Math.max(phh*1.1,1),xt:2,yt:niceStep(Math.max(phh-plo,1),4),xl:'t, s',yl:'φ, rad',lines:[[ps,C.violet,2.4]],marks:[[S.t,this.phi(S,P),C.warm]]});},
  read(S,P){const w=P.w0+P.e*S.t,phi=this.phi(S,P),v=w*P.R,at=P.e*P.R,an=w*w*P.R;return[['Vaqt t',fmt(S.t,1)+' s'],['Burchak tezlik ω',fmt(w,2)+' rad/s'],['Burilish burchagi φ',fmt(phi,1)+' rad'],['Aylanishlar soni N',fmt(Math.abs(phi)/TAU,2)],['Chiziqli tezlik v = ωR',fmt(Math.abs(v),2)+' m/s'],['Urinma tezlanish a_τ',fmt(Math.abs(at),2)+' m/s²'],['Normal tezlanish a_n',fmt(an,2)+' m/s²'],['To‘la tezlanish a',fmt(Math.hypot(at,an),2)+' m/s²']];}
});

/* 2. Devorga suyangan narvon */
SIMS.push({id:'narvon',cat:'sta',title:'Devorga suyangan narvon: muvozanat sharti',short:'ΣF = 0, ΣM = 0',
  sub:'Narvon silliq devorga suyangan, pol esa ishqalanishli. Odam narvon bo‘ylab ko‘tarilgan sari polda kerakli ishqalanish kuchi ortadi va narvon sirpanib ketishi mumkin.',
  formula:`<span><i>N</i>₂ = ${fr('<i>g</i> cos <i>α</i> (<i>m</i>/2 + <i>M x</i>)','sin <i>α</i>')}</span><span class="alt"><i>F</i><sub>ishq</sub> = <i>N</i>₂ ≤ <i>μ</i>(<i>m</i> + <i>M</i>)<i>g</i></span>`,
  text:['Narvon muvozanatda turishi uchun ikki shart bajarilishi kerak: kuchlar yig‘indisi nolga teng (ΣF = 0) va istalgan nuqtaga nisbatan kuch momentlari yig‘indisi nolga teng (ΣM = 0). Momentlarni narvonning poldagi uchiga nisbatan olsak, pol reaksiyasi va ishqalanish kuchi tenglamadan chiqib ketadi.','Devorning reaksiya kuchi N₂ gorizontal, uni faqat poldagi ishqalanish muvozanatlaydi. Odam qanchalik yuqori chiqsa va narvon qanchalik yotiq bo‘lsa, N₂ shunchalik katta bo‘ladi. Agar u μ(m + M)g dan oshsa, narvon sirpanib ketadi.'],
  legend:[['α','narvon va pol orasidagi burchak'],['μ','poldagi ishqalanish koeffitsiyenti'],['m, M','narvon va odam massasi, kg'],['x','odamning narvondagi o‘rni (pastdan, ulushda)'],['N₁, N₂','pol va devor reaksiya kuchlari']],
  tries:['Odamni narvon bo‘ylab yuqoriga suring (sichqoncha bilan): qaysi balandlikda sirpanish boshlanadi?','α ni kattaroq qiling: tikroq narvon xavfsizroq — kerakli ishqalanish kamayadi.','μ = 0 bo‘lsa, narvon hech qanday burchakda turmaydi (α = 90° dan tashqari).'],
  params:[{id:'a',label:'Narvon burchagi',sym:'α',min:30,max:85,step:1,val:60,unit:'°',d:0,reset:1},{id:'mu',label:'Ishqalanish koeffitsiyenti',sym:'μ',min:0,max:1,step:0.01,val:0.35,unit:'',d:2,reset:1},{id:'m',label:'Narvon massasi',sym:'m',min:5,max:40,step:1,val:15,unit:'kg',d:0,reset:1},{id:'M',label:'Odam massasi',sym:'M',min:0,max:100,step:1,val:70,unit:'kg',d:0,reset:1},{id:'x',label:'Odamning o‘rni',sym:'x',min:0,max:1,step:0.01,val:0.3,unit:'',d:2,reset:1}],
  pointer(type,x,y,S,P,api){const g=S.g;if(!g)return false;if(type==='down'){const mx=g.bx+(g.tx-g.bx)*P.x,my=g.by+(g.ty-g.by)*P.x;if(Math.hypot(x-mx,y-my)<40){S.drag=true;return true;}return false;}
    if(type==='move'&&S.drag){const dx=g.tx-g.bx,dy=g.ty-g.by;const u=clamp(((x-g.bx)*dx+(y-g.by)*dy)/(dx*dx+dy*dy),0,1);P.x=Math.round(u*100)/100;api&&api.set('x',P.x);S.slip=false;S.a=P.a*D2R;S.xb=null;return true;}if(type==='up')S.drag=false;return false;},
  forces(P,a){const g=9.8,L=4,N1=(P.m+P.M)*g,N2=g*Math.cos(a)*(P.m/2+P.M*P.x)/Math.sin(a);return{N1,N2,fmax:P.mu*N1,ok:N2<=P.mu*N1+1e-9,mumin:N2/N1,L};},
  init(P){return{a:P.a*D2R,slip:false,v:0,wait:0,xb:null};},
  step(S,P,dt){const f=this.forces(P,S.a);if(!S.slip&&!f.ok&&!S.drag){S.slip=true;S.v=0;S.xb=f.L*Math.cos(S.a);}
    if(S.slip){if(S.a<0.14){S.wait+=dt;if(S.wait>1.5){S.a=P.a*D2R;S.slip=false;S.wait=0;}return;}const ff=this.forces(P,S.a),acc=Math.max(0.3,(ff.N2-ff.fmax)/(P.m+P.M));S.v+=acc*dt;S.xb+=S.v*dt;S.a=Math.acos(clamp(S.xb/ff.L,-1,1));}},
  draw(c,W,H,S,P){grid(c,W,H,28);const f=this.forces(P,S.a),fy=H-46,wx=W*0.66,sc=Math.min((fy-50)/4.2,W*0.55/4.2),a=S.a;
    c.fillStyle=rgba('muted',0.18);c.fillRect(wx,20,W-wx,fy-20);line(c,wx,20,wx,fy,C.ink,3);line(c,0,fy,W,fy,C.ink,3);for(let x=8;x<W;x+=16)line(c,x,fy,x-8,fy+8,rgba('muted',0.5),1);
    const bx=wx-f.L*Math.cos(a)*sc,by=fy,tx=wx,ty=fy-f.L*Math.sin(a)*sc;S.g={bx,by,tx,ty,sc,fy,wx};
    const nx=-(ty-by),ny=tx-bx,nl=Math.hypot(nx,ny),ox=nx/nl*9,oy=ny/nl*9;line(c,bx+ox,by+oy,tx+ox,ty+oy,'#b07a3a',5);line(c,bx-ox,by-oy,tx-ox,ty-oy,'#b07a3a',5);
    for(let i=1;i<10;i++){const u=i/10,x=bx+(tx-bx)*u,y=by+(ty-by)*u;line(c,x+ox,y+oy,x-ox,y-oy,'#c8935a',3);}
    const mx=bx+(tx-bx)*P.x,my=by+(ty-by)*P.x;if(P.M>0){c.strokeStyle=C.accent;c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(mx,my-6);c.lineTo(mx+2,my-36);c.stroke();disk(c,mx+3,my-46,9,C.accent);c.lineCap='butt';if(S.drag)selRing(c,mx,my-26,30);}
    const k=95/((P.m+P.M)*9.8),cx=(bx+tx)/2,cy=(by+ty)/2;
    arrow(c,cx,cy,cx,cy+P.m*9.8*k,C.violet,2.4,'mg');if(P.M>0)arrow(c,mx+2,my-20,mx+2,my-20+P.M*9.8*k,C.violet,2.4,'Mg');
    arrow(c,bx,by,bx,by-f.N1*k,C.green,2.6,'N₁');arrow(c,tx,ty,tx-f.N2*k,ty,C.green,2.6,'N₂');
    const fr2=Math.min(f.N2,f.fmax);if(fr2>0.5)arrow(c,bx,by+12,bx+fr2*k,by+12,f.ok?C.warm:C.red,2.6,'Fishq');
    c.strokeStyle=C.muted;c.lineWidth=1.5;c.beginPath();c.arc(bx,by,34,-a,0);c.stroke();txt(c,'α = '+fmt(a/D2R,0)+'°',bx+40,by-14,C.muted);
    txt(c,S.slip?'Narvon sirpanib ketyapti!':'Narvon muvozanatda',20,26,S.slip?C.red:C.green,{font:'600 15px "IBM Plex Sans", sans-serif'});
    txt(c,'kerakli ishqalanish: '+fmt(f.N2,0)+' N  /  eng ko‘pi: '+fmt(f.fmax,0)+' N',20,48,C.muted);},
  read(S,P){const f=this.forces(P,P.a*D2R);return[['Pol reaksiyasi N₁',fmt(f.N1,0)+' N'],['Devor reaksiyasi N₂',fmt(f.N2,0)+' N'],['Kerakli ishqalanish',fmt(f.N2,0)+' N'],['Eng katta ishqalanish μN₁',fmt(f.fmax,0)+' N'],['Kerakli eng kichik μ',fmt(f.mumin,2)],['Holat',f.ok?'turadi':'sirpanadi']];}
});

/* 3. Areometr */
const AREO_LIQ=[[790,'spirt'],[800,'kerosin'],[900,'o‘simlik yog‘i'],[1000,'toza suv'],[1030,'sut'],[1100,'sho‘r suv'],[1260,'glitserin'],[1400,'asal eritmasi'],[1840,'sulfat kislota']];
SIMS.push({id:'areometr',cat:'sta',title:'Areometr: suyuqlik zichligini o‘lchash',short:'ρgV = mg',
  sub:'Areometr — pastiga yuk joylangan shisha naycha. U suyuqlikda suzib yuradi va qancha chuqur botishiga qarab suyuqlik zichligini ko‘rsatadi.',
  formula:`<span><i>ρ</i><i>g</i>(<i>V</i>₀ + <i>S h</i>) = <i>mg</i></span><span class="alt"><i>h</i> = ${fr('<i>m</i>/<i>ρ</i> − <i>V</i>₀','<i>S</i>')}</span>`,
  text:['Suzib yurgan jism uchun Arximed kuchi og‘irlik kuchiga teng: suyuqlikka botgan qismning hajmi siqib chiqarilgan suyuqlik og‘irligini jism og‘irligiga tenglaydi. Zichroq suyuqlikda areometr kamroq botadi, siyrakroq suyuqlikda esa chuqurroq botadi.','Shuning uchun areometr shkalasida katta zichliklar pastda, kichiklari yuqorida yoziladi va bo‘linmalar notekis joylashadi. Agar suyuqlik juda siyrak bo‘lsa, areometr butunlay botib ketadi — har bir areometr faqat ma’lum zichlik oralig‘i uchun yaraydi.'],
  legend:[['ρ','suyuqlik zichligi, kg/m³'],['m','areometr massasi, g'],['V₀','pastki kolbaning hajmi, 24 sm³'],['S','naycha kesim yuzi, 0,4 sm²'],['h','naychaning botgan qismi, sm']],
  tries:['Zichlikni 1000 dan 1260 ga oshiring: areometr yuqoriga ko‘tariladi va biroz tebranadi.','Zichlikni 790 kg/m³ ga tushiring (spirt): areometr cho‘kib ketadi — massasi kichikroq areometr kerak.','Massani o‘zgartirib, shkala qaysi zichliklar oralig‘ini qamrashini kuzating.'],
  params:[{id:'rho',label:'Suyuqlik zichligi',sym:'ρ',min:700,max:1900,step:10,val:1000,unit:'kg/m³',d:0},{id:'m',label:'Areometr massasi',sym:'m',min:20,max:45,step:0.5,val:30,unit:'g',d:1}],
  V0:24,A:0.4,Ls:25,rb:1.2,Dl:36,
  vsub(z){const hb=this.V0/(Math.PI*this.rb*this.rb);return Math.PI*this.rb*this.rb*clamp(z,0,hb)+this.A*clamp(z-hb,0,this.Ls);},
  eq(P){const hb=this.V0/(Math.PI*this.rb*this.rb),Vn=P.m/(P.rho/1000);if(Vn>=this.V0+this.A*this.Ls)return{z:this.Dl,sink:true,h:null};if(Vn<this.V0)return{z:Vn/(Math.PI*this.rb*this.rb),h:0,sink:false,low:true};return{z:hb+(Vn-this.V0)/this.A,h:(Vn-this.V0)/this.A,sink:false};},
  init(P){return{z:4,v:0};},
  step(S,P,dt){const n=8,h=dt/n;for(let i=0;i<n;i++){const zm=S.z/100,Vs=this.vsub(S.z)*1e-6,a=9.8*(1-(P.rho*Vs)/(P.m*1e-3))-2.5*S.v;S.v+=a*h;S.z+=S.v*100*h;const top=this.V0/(Math.PI*this.rb*this.rb)+this.Ls+3;if(S.z>this.Dl){S.z=this.Dl;S.v=Math.min(0,S.v);}if(S.z<0.2){S.z=0.2;S.v=Math.max(0,S.v);}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const hb=this.V0/(Math.PI*this.rb*this.rb),tot=hb+this.Ls+1.6,sc=Math.min((H-60)/(this.Dl+12),W*0.012+3.2),cx=W<640?W*0.5:W*0.36,surf=34+tot*sc*0.35+20,bot=surf+this.Dl*sc,cw=Math.max(80,this.rb*sc*6);
    S.g={cx,surf,sc,bot,cw,hb};
    c.fillStyle=rgba('water',0.28);c.fillRect(cx-cw/2,surf,cw,bot-surf);line(c,cx-cw/2,surf,cx+cw/2,surf,rgba('water',0.9),2);
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(cx-cw/2-4,surf-60);c.lineTo(cx-cw/2-4,bot+4);c.lineTo(cx+cw/2+4,bot+4);c.lineTo(cx+cw/2+4,surf-60);c.stroke();
    const yb=surf+S.z*sc,rbp=this.rb*sc,ytop=yb-hb*sc,sw=Math.max(5,Math.sqrt(this.A/Math.PI)*sc*2),ys=ytop-this.Ls*sc;
    c.fillStyle='rgba(200,220,255,0.35)';rrect(c,cx-rbp,ytop,2*rbp,hb*sc,rbp*0.9);c.fill();c.strokeStyle=C.ink;c.lineWidth=1.6;c.stroke();
    c.fillStyle='#5b6475';rrect(c,cx-rbp+3,yb-hb*sc*0.35,2*rbp-6,hb*sc*0.35-3,rbp*0.6);c.fill();
    c.fillStyle='rgba(235,240,255,0.55)';c.fillRect(cx-sw/2,ys,sw,this.Ls*sc);c.strokeRect(cx-sw/2,ys,sw,this.Ls*sc);
    for(let r=700;r<=1900;r+=50){const Vn=P.m/(r/1000),hh=(Vn-this.V0)/this.A;if(hh<0||hh>this.Ls)continue;const y=ytop-hh*sc,big=r%100===0;line(c,cx+sw/2,y,cx+sw/2+(big?14:7),y,C.ink,1.2);if(big)txt(c,String(r),cx+sw/2+17,y,C.ink,{font:SMALL});}
    const e=this.eq(P);const nm=AREO_LIQ.reduce((b,x)=>Math.abs(x[0]-P.rho)<Math.abs(b[0]-P.rho)?x:b);
    txt(c,Math.abs(nm[0]-P.rho)<=30?nm[1]:'suyuqlik',cx,bot-14,C.ink,{align:'center',font:'600 14px "IBM Plex Sans", sans-serif'});
    const fa=P.rho*9.8*this.vsub(S.z)*1e-6,k=60/(P.m*1e-3*9.8);arrow(c,cx-rbp-26,yb-10,cx-rbp-26,yb-10-fa*k,C.green,2.6,'Fa');arrow(c,cx+rbp+26,yb-hb*sc/2,cx+rbp+26,yb-hb*sc/2+P.m*1e-3*9.8*k,C.violet,2.6,'mg');
    txt(c,e.sink?'Areometr cho‘kib ketdi: zichlik shkaladan kichik':e.low?'Areometr juda yuqorida: zichlik shkaladan katta':'Ko‘rsatish: '+fmt(P.rho,0)+' kg/m³',20,24,e.sink||e.low?C.red:C.green,{font:'600 14px "IBM Plex Sans", sans-serif'});},
  read(S,P){const e=this.eq(P),fa=P.rho*9.8*this.vsub(S.z)*1e-6;return[['Suyuqlik zichligi',fmt(P.rho,0)+' kg/m³'],['Areometr og‘irligi mg',fmt(P.m*1e-3*9.8,3)+' N'],['Arximed kuchi',fmt(fa,3)+' N'],['Botgan hajm',fmt(this.vsub(S.z),1)+' sm³'],['Naychaning botgan qismi h',e.h==null?'—':fmt(e.h,1)+' sm'],['Holat',e.sink?'cho‘kdi':e.low?'shkaladan tashqarida':'suzib yuribdi']];}
});

/* 4. Bir o‘lchamli to‘qnashuvlar */
SIMS.push({id:'toqnash1d',cat:'saq',title:'Elastik va noelastik to‘qnashuv (aravachalar)',short:'m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′',
  sub:'Ikki aravacha to‘g‘ri yo‘lda to‘qnashadi. Tiklanish koeffitsiyenti e to‘qnashuv qanchalik «sakrovchan» ekanini belgilaydi: e = 1 elastik, e = 0 to‘liq noelastik (yopishib qoladi).',
  formula:`<span><i>v</i>₁′ = ${fr('<i>m</i>₁<i>v</i>₁ + <i>m</i>₂<i>v</i>₂ − <i>m</i>₂<i>e</i>(<i>v</i>₁ − <i>v</i>₂)','<i>m</i>₁ + <i>m</i>₂')}</span><span class="alt"><i>e</i> = ${fr('<i>v</i>₂′ − <i>v</i>₁′','<i>v</i>₁ − <i>v</i>₂')}</span>`,
  text:['Har qanday to‘qnashuvda tashqi kuchlar bo‘lmasa, tizimning to‘la impulsi saqlanadi. Kinetik energiya esa faqat mutlaq elastik to‘qnashuvda (e = 1) saqlanadi; e < 1 bo‘lsa, uning bir qismi issiqlikka va deformatsiyaga aylanadi.','Teng massali aravachalar elastik to‘qnashganda tezliklarini almashadi. To‘liq noelastik to‘qnashuvda (e = 0) ular birga harakatlanadi va eng ko‘p energiya yo‘qoladi. Pastdagi ustunlar to‘qnashuvgacha va keyingi impuls hamda energiyani taqqoslaydi.'],
  legend:[['m₁, m₂','aravachalar massasi, kg'],['v₁, v₂','to‘qnashuvgacha tezliklar, m/s'],['v₁′, v₂′','to‘qnashuvdan keyingi tezliklar'],['e','tiklanish koeffitsiyenti'],['p, E_k','impuls va kinetik energiya']],
  tries:['m₁ = m₂, v₂ = 0, e = 1 qiling: birinchi aravacha to‘xtaydi, ikkinchisi xuddi shu tezlikda ketadi.','e = 0 qiling: aravachalar yopishib qoladi, yo‘qolgan energiya eng katta bo‘ladi.','Yengil aravachani og‘ir, tinch turganiga uring: u orqaga qaytadi.'],
  params:[{id:'m1',label:'1-aravacha massasi',sym:'m₁',min:0.2,max:5,step:0.1,val:1,unit:'kg',d:1,reset:1},{id:'m2',label:'2-aravacha massasi',sym:'m₂',min:0.2,max:5,step:0.1,val:2,unit:'kg',d:1,reset:1},{id:'v1',label:'1-aravacha tezligi',sym:'v₁',min:-3,max:3,step:0.1,val:2,unit:'m/s',d:1,reset:1},{id:'v2',label:'2-aravacha tezligi',sym:'v₂',min:-3,max:3,step:0.1,val:-0.5,unit:'m/s',d:1,reset:1},{id:'e',label:'Tiklanish koeffitsiyenti',sym:'e',min:0,max:1,step:0.05,val:1,unit:'',d:2,reset:1}],
  after(P){const M=P.m1+P.m2,p=P.m1*P.v1+P.m2*P.v2,u1=(p-P.m2*P.e*(P.v1-P.v2))/M,u2=(p+P.m1*P.e*(P.v1-P.v2))/M;return{u1,u2};},
  init(P){return{t:0,x1:1.6,x2:4.4,u1:P.v1,u2:P.v2,hit:false,flash:0};},
  step(S,P,dt){S.t+=dt;S.flash=Math.max(0,S.flash-dt);const w=0.5;S.x1+=S.u1*dt;S.x2+=S.u2*dt;if(!S.hit&&S.x2-S.x1<=w&&S.u1>S.u2){const a=this.after(P);S.u1=a.u1;S.u2=a.u2;S.hit=true;S.flash=0.3;const mid=(S.x1+S.x2)/2;S.x1=mid-w/2;S.x2=mid+w/2;}
    if(S.hit&&S.x2-S.x1<w){S.x1=Math.min(S.x1,S.x2-w);}if(S.t>7||(S.x1<-1&&S.x2<-1)||(S.x1>7&&S.x2>7)){Object.assign(S,this.init(P));}},
  draw(c,W,H,S,P){grid(c,W,H,28);const L=6,x0=30,sc=(W-60)/L,ty=H*0.42,X=x=>x0+x*sc;S.g={x0,sc,ty};line(c,10,ty+24,W-10,ty+24,C.ink,3);
    const cart=(x,m,col,lab,u)=>{const w=0.5*sc,h=22+m*7;c.fillStyle=col;rrect(c,X(x)-w/2,ty+18-h,w,h,7);c.fill();disk(c,X(x)-w/3,ty+20,5,C.ink);disk(c,X(x)+w/3,ty+20,5,C.ink);txt(c,lab+' = '+fmt(m,1)+' kg',X(x),ty+8-h/2,'#fff',{align:'center',font:SMALL});
      if(Math.abs(u)>0.02)arrow(c,X(x),ty-h-6,X(x)+u*45,ty-h-6,C.green,2.4,fmt(u,2)+' m/s');};
    cart(S.x1,P.m1,C.accent,'m₁',S.u1);cart(S.x2,P.m2,C.warm,'m₂',S.u2);if(S.flash>0)disk(c,X((S.x1+S.x2)/2),ty-10,26*S.flash/0.3+6,rgba('warm',0.5));
    const a=this.after(P),p0=P.m1*P.v1+P.m2*P.v2,p1=P.m1*a.u1+P.m2*a.u2,E0=0.5*P.m1*P.v1**2+0.5*P.m2*P.v2**2,E1=0.5*P.m1*a.u1**2+0.5*P.m2*a.u2**2;
    const by=H*0.62,bh=H*0.3,bw=Math.min(46,W/14),gx=W*0.12;const pm=Math.max(Math.abs(P.m1*P.v1),Math.abs(P.m2*P.v2),Math.abs(P.m1*a.u1),Math.abs(P.m2*a.u2),Math.abs(p0),0.5),Em=Math.max(E0,0.3);
    const bar=(x,v,mx,col,lab)=>{const h=v/mx*bh*0.5,y0=by+bh*0.5;c.fillStyle=col;c.fillRect(x,Math.min(y0,y0-h),bw,Math.abs(h));txt(c,lab,x+bw/2,by+bh+12,C.muted,{align:'center',font:SMALL});};
    line(c,gx-10,by+bh*0.5,gx+bw*7.6,by+bh*0.5,C.muted,1);txt(c,'impuls, kg·m/s',gx,by-8,C.muted,{font:SMALL});
    bar(gx,P.m1*P.v1,pm,C.accent,'p₁');bar(gx+bw*1.2,P.m2*P.v2,pm,C.warm,'p₂');bar(gx+bw*2.4,p0,pm,C.violet,'p');bar(gx+bw*4,P.m1*a.u1,pm,C.accent,'p₁′');bar(gx+bw*5.2,P.m2*a.u2,pm,C.warm,'p₂′');bar(gx+bw*6.4,p1,pm,C.violet,'p′');
    const ex=W*0.62;txt(c,'kinetik energiya, J',ex,by-8,C.muted,{font:SMALL});const eh=v=>v/Em*bh;c.fillStyle=C.green;c.fillRect(ex,by+bh-eh(E0),bw,eh(E0));c.fillRect(ex+bw*1.6,by+bh-eh(E1),bw,eh(E1));c.fillStyle=C.red;c.fillRect(ex+bw*1.6,by+bh-eh(E0),bw,eh(E0)-eh(E1));
    txt(c,'oldin',ex+bw/2,by+bh+12,C.muted,{align:'center',font:SMALL});txt(c,'keyin',ex+bw*2.1,by+bh+12,C.muted,{align:'center',font:SMALL});if(E0-E1>0.005)txt(c,'issiqlik: '+fmt(E0-E1,2)+' J',ex+bw*2.9,by+bh-eh(E0)+10,C.red,{font:SMALL});},
  read(S,P){const a=this.after(P),p0=P.m1*P.v1+P.m2*P.v2,E0=0.5*P.m1*P.v1**2+0.5*P.m2*P.v2**2,E1=0.5*P.m1*a.u1**2+0.5*P.m2*a.u2**2;return[['v₁′',fmt(a.u1,2)+' m/s'],['v₂′',fmt(a.u2,2)+' m/s'],['Impuls oldin / keyin',fmt(p0,2)+' / '+fmt(P.m1*a.u1+P.m2*a.u2,2)+' kg·m/s'],['Kinetik energiya oldin',fmt(E0,2)+' J'],['Kinetik energiya keyin',fmt(E1,2)+' J'],['Issiqlikka aylangan',fmt(E0-E1,2)+' J']];}
});

/* 5. Potensial energiya grafigi */
const POTF=[x=>x*x,x=>2*(x*x-1)**2,x=>3*(1-Math.exp(-1.5*(x+0.8)))**2];
SIMS.push({id:'potgrafik',cat:'saq',title:'Potensial energiya grafigi va burilish nuqtalari',short:'E = E_k + U(x)',
  sub:'Zarra potensial «chuqurlik»da harakatlanadi. To‘la energiya E o‘zgarmaydi, shuning uchun zarra faqat U(x) ≤ E bo‘lgan sohada bo‘la oladi va U(x) = E nuqtalarda orqaga qaytadi.',
  formula:`<span><i>E</i> = ${fr('<i>mv</i>²','2')} + <i>U</i>(<i>x</i>) = const</span><span class="alt"><i>F</i> = −${fr('d<i>U</i>','d<i>x</i>')}</span>`,
  text:['Kuch potensial energiyaning koordinata bo‘yicha hosilasiga teskari ishorali: F = −dU/dx. Grafik qayerda tikroq bo‘lsa, kuch shunchalik katta; minimum nuqtada kuch nolga teng — bu turg‘un muvozanat holati, maksimum esa noturg‘un muvozanat.','To‘la energiya chizig‘i bilan U(x) egri chizig‘i orasidagi masofa kinetik energiyani bildiradi. Ular kesishgan nuqtalarda tezlik nolga teng — bu burilish nuqtalari. Agar E to‘siqdan baland bo‘lsa, zarra qo‘shni chuqurlikka o‘tadi yoki butunlay uchib ketadi.'],
  legend:[['U(x)','potensial energiya, J'],['E','to‘la mexanik energiya, J'],['E_k','kinetik energiya, J'],['x','koordinata, m'],['m','zarra massasi, 1 kg']],
  tries:['«Ikki chuqurlik» shaklida E ni 2 J dan kichik qiling: zarra bitta chuqurlikda qoladi. Keyin 2 J dan oshiring.','Morze potensialida E ni 3 J dan oshiring: zarra «molekuladan» uzilib uchib ketadi.','Parabola shaklida zarra garmonik tebranadi: davr energiyaga bog‘liq emas.'],
  params:[{id:'sh',label:'Potensial shakli (0 — parabola, 1 — ikki chuqurlik, 2 — Morze)',sym:'',min:0,max:2,step:1,val:1,unit:'',d:0,reset:1},{id:'E',label:'To‘la energiya',sym:'E',min:0.2,max:6,step:0.05,val:1.5,unit:'J',d:2,reset:1}],
  xmin:[0,-1,-0.8],
  init(P){const U=POTF[P.sh],x=this.xmin[P.sh];return{x,v:Math.sqrt(Math.max(0,2*(P.E-U(x)))),t:0,esc:0};},
  step(S,P,dt){const U=POTF[P.sh],F=x=>-(U(x+1e-4)-U(x-1e-4))/2e-4;if(S.esc>0){S.esc+=dt;if(S.esc>1.6)Object.assign(S,this.init(P));return;}const n=30,h=dt/n;for(let i=0;i<n;i++){const a=F(S.x);S.x+=S.v*h+0.5*a*h*h;const a2=F(S.x);S.v+=0.5*(a+a2)*h;}
    const Ek=P.E-U(S.x);if(Ek>=0)S.v=Math.sign(S.v||1)*Math.sqrt(2*Ek);if(Math.abs(S.x)>2.1)S.esc=0.01;},
  turns(P){const U=POTF[P.sh],r=[];let prev=U(-2)-P.E;for(let i=1;i<=800;i++){const x=-2+4*i/800,v=U(x)-P.E;if(prev*v<0)r.push(x);prev=v;}return r;},
  draw(c,W,H,S,P){grid(c,W,H,28);const U=POTF[P.sh],gx=56,gy=40,gw=W-90,gh=H-110,pts=[];for(let i=0;i<=200;i++){const x=-2+4*i/200;pts.push([x,Math.min(U(x),8)]);}
    const ok=[];for(let i=0;i<=200;i++){const x=-2+4*i/200;if(U(x)<=P.E)ok.push([x,P.E]);}
    const pl=gplot(c,gx,gy,gw,gh,{x0:-2,x1:2,y0:0,y1:7,xt:0.5,yt:1,xd:1,xl:'x, m',yl:'U, J',lines:[[pts,C.accent,3],[[[-2,P.E],[2,P.E]],C.warm,2,[6,4]]]});
    S.g={gx,gy,gw,gh};const X=pl.X,Y=pl.Y;ok.forEach(p=>line(c,X(p[0])-1,gy+gh+26,X(p[0])+1,gy+gh+26,rgba('green',0.8),6));txt(c,'ruxsat etilgan soha',gx,gy+gh+42,C.green,{font:SMALL});
    this.turns(P).forEach(x=>{line(c,X(x),Y(P.E),X(x),gy+gh,rgba('red',0.7),1.5,[3,3]);disk(c,X(x),Y(P.E),5,C.red);});
    const xs=clamp(S.x,-2,2),u=U(xs);if(Math.abs(S.x)<=2.05){line(c,X(xs),Y(Math.min(u,7)),X(xs),Y(Math.min(P.E,7)),C.green,5);disk(c,X(xs),Y(Math.min(u,7))-11,10,C.warm);txt(c,'E = '+fmt(P.E,2)+' J',gx+gw-6,Y(Math.min(P.E,7))-10,C.warm,{align:'right'});}
    else txt(c,'Zarra uchib ketdi!',gx+gw/2,gy+20,C.red,{align:'center',font:'600 15px "IBM Plex Sans", sans-serif'});},
  read(S,P){const U=POTF[P.sh],u=U(clamp(S.x,-2.5,2.5)),t=this.turns(P);return[['Koordinata x',fmt(S.x,2)+' m'],['Tezlik v',fmt(S.v,2)+' m/s'],['Potensial energiya U',fmt(u,2)+' J'],['Kinetik energiya E_k',fmt(Math.max(0,P.E-u),2)+' J'],['To‘la energiya E',fmt(P.E,2)+' J'],['Burilish nuqtalari',t.length?t.map(x=>fmt(x,2)).join('; ')+' m':'yo‘q']];}
});

/* 6. Kuch impulsi: tuxum tajribasi */
SIMS.push({id:'kuchimpuls',cat:'saq',title:'Kuch impulsi: tuxum nega yumshoq yostiqda sinmaydi',short:'FΔt = Δp',
  sub:'Tuxum bir xil balandlikdan tushadi. Impuls o‘zgarishi har doim bir xil, lekin to‘xtash vaqti uzaysa, zarba kuchi kamayadi. F(t) grafigi ostidagi yuza — kuch impulsi.',
  formula:`<span><i>F</i><sub>o‘rt</sub>Δ<i>t</i> = Δ<i>p</i> = <i>mv</i></span><span class="alt"><i>v</i> = ${sq('2<i>gh</i>')}</span>`,
  text:['Nyutonning ikkinchi qonunini impuls orqali yozish mumkin: FΔt = Δp. Tuxumni to‘xtatish uchun uning impulsini mv dan nolga tushirish kerak. Bu qiymat sirt qattiq yoki yumshoqligiga bog‘liq emas — faqat tezlik va massaga bog‘liq.','Qattiq polda to‘xtash bir necha millisekundda ro‘y beradi, shuning uchun o‘rtacha kuch juda katta bo‘ladi. Yumshoq yostiq to‘xtash vaqtini o‘nlab marta uzaytiradi va kuch shuncha marta kamayadi. Avtomobil xavfsizlik yostig‘i, sport to‘shaklari shu prinsipda ishlaydi.'],
  legend:[['m','tuxum massasi, g'],['h','tushish balandligi, m'],['Δt','to‘xtash vaqti, s'],['F_o‘rt, F_max','o‘rtacha va eng katta zarba kuchi, N'],['Δp','impuls o‘zgarishi, kg·m/s']],
  tries:['Δt ni eng kichik qiling (beton pol): tuxum sinadi.','Δt ni oshirib, tuxum sinmaydigan eng kichik to‘xtash vaqtini toping.','Balandlikni ikki marta oshiring: impuls √2 marta ortadi, kerakli Δt ham shuncha ortadi.'],
  params:[{id:'h',label:'Tushish balandligi',sym:'h',min:0.1,max:2,step:0.05,val:1,unit:'m',d:2,reset:1},{id:'tau',label:'To‘xtash vaqti',sym:'Δt',min:0.002,max:0.2,step:0.002,val:0.004,unit:'s',d:3,reset:1},{id:'m',label:'Tuxum massasi',sym:'m',min:40,max:80,step:1,val:60,unit:'g',d:0,reset:1}],
  Fb:30,
  calc(P){const v=Math.sqrt(2*9.8*P.h),p=P.m*1e-3*v,Fm=Math.PI*p/(2*P.tau);return{v,p,Fm,Fa:p/P.tau,brk:Fm>this.Fb};},
  init(P){return{ph:0,t:0};},
  step(S,P,dt){S.t+=dt;const tf=Math.sqrt(2*P.h/9.8);if(S.ph===0&&S.t>=tf){S.ph=1;S.t=0;}else if(S.ph===1&&S.t>=1.6){S.ph=2;S.t=0;}else if(S.ph===2&&S.t>=1.6){S.ph=0;S.t=0;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),narrow=W<640,sx=narrow?W*0.5:W*0.24,fy=narrow?H*0.42:H-60,top=40,sc=(fy-top-40)/2.1;
    const soft=clamp((P.tau-0.002)/0.198,0,1),cush=8+soft*40;c.fillStyle=soft>0.05?rgba('violet',0.35+soft*0.3):rgba('muted',0.6);
    let comp=0,frac=0;if(S.ph===1){frac=clamp(S.t/1.6,0,1);comp=Math.sin(Math.PI*Math.min(frac,0.5))*(cush*0.6);}else if(S.ph===2)comp=cush*0.6*(q.brk?0.3:1)*0;
    rrect(c,sx-90,fy-cush+comp,180,cush-comp,8);c.fill();line(c,sx-120,fy,sx+120,fy,C.ink,3);
    let ey;if(S.ph===0){const tt=S.t;ey=fy-cush-P.h*sc+0.5*9.8*tt*tt*sc;}else ey=fy-cush+comp;const ey2=Math.min(ey,fy-cush+comp);S.g={sx,ey:ey2,fy,cush,ph:S.ph};
    const crack=q.brk&&(S.ph===2||(S.ph===1&&Math.sin(Math.PI*frac)*q.Fm>this.Fb));
    c.save();c.translate(sx,ey2-26);c.scale(1,S.ph===1?1-0.12*Math.sin(Math.PI*frac):1);c.fillStyle='#f3e6cf';c.beginPath();c.ellipse(0,0,19,26,0,0,TAU);c.fill();c.strokeStyle='#b89f7a';c.lineWidth=1.5;c.stroke();
    if(crack){c.strokeStyle='#7a5a32';c.lineWidth=2;c.beginPath();c.moveTo(-17,-2);c.lineTo(-8,4);c.lineTo(-2,-5);c.lineTo(6,5);c.lineTo(13,-3);c.lineTo(18,2);c.stroke();if(S.ph===2){c.fillStyle='rgba(255,200,40,0.85)';c.beginPath();c.ellipse(0,30,28,6,0,0,TAU);c.fill();}}c.restore();
    line(c,sx+110,fy-cush,sx+110,fy-cush-P.h*sc,C.muted,1.2,[4,3]);txt(c,'h = '+fmt(P.h,2)+' m',sx+116,fy-cush-P.h*sc/2,C.muted);
    const gx=narrow?50:W*0.5,gw=narrow?W-80:W*0.44,gy=narrow?H*0.58:H*0.14,gh=narrow?H*0.3:H*0.56,Fmax=Math.max(q.Fm*1.15,this.Fb*1.3),tm=P.tau*1000;
    const pts=[],sh=[];for(let i=0;i<=80;i++){const t=tm*i/80;pts.push([t,q.Fm*Math.sin(Math.PI*i/80)]);}const lim=S.ph===1?frac:S.ph===2?1:0;for(let i=0;i<=80*lim;i++)sh.push(pts[i]);
    gplot(c,gx,gy,gw,gh,{x0:0,x1:tm,y0:0,y1:Fmax,xt:niceStep(tm,5),yt:niceStep(Fmax,5),xd:tm<10?1:0,xl:'t, ms',yl:'F, N',fill:[[sh,rgba('accent',0.35)]],lines:[[pts,C.accent,2.6],[[[0,this.Fb],[tm,this.Fb]],C.red,1.6,[6,4]]]});
    txt(c,'po‘choq chidaydigan kuch ≈ '+this.Fb+' N',gx+gw-4,gy+gh-(this.Fb/Fmax)*gh-10,C.red,{align:'right',font:SMALL});txt(c,'yuza = Δp = '+fmt(q.p,3)+' kg·m/s',gx+8,gy+8,C.accent,{font:SMALL});
    if(S.ph===2)txt(c,q.brk?'Tuxum sindi!':'Tuxum butun qoldi',sx,top,q.brk?C.red:C.green,{align:'center',font:'700 17px "IBM Plex Sans", sans-serif'});},
  read(S,P){const q=this.calc(P);return[['Urilish tezligi v',fmt(q.v,2)+' m/s'],['Impuls o‘zgarishi Δp',fmt(q.p,3)+' kg·m/s'],['To‘xtash vaqti Δt',fmt(P.tau*1000,0)+' ms'],['O‘rtacha kuch',fmt(q.Fa,1)+' N'],['Eng katta kuch',fmt(q.Fm,1)+' N'],['Natija',q.brk?'sinadi':'sinmaydi']];}
});

/* 7. Havo ustunidagi turg‘un to‘lqinlar */
SIMS.push({id:'truba',cat:'teb',title:'Havo ustunining rezonansi (truba va nay)',short:'f = nv / 2L',
  sub:'Trubadagi havo ustunida turg‘un tovush to‘lqini hosil bo‘ladi. Ochiq uchda havo zarralari eng ko‘p tebranadi (do‘nglik), yopiq uchda esa qimirlamaydi (tugun).',
  formula:`<span>ikki uchi ochiq: <i>f<sub>n</sub></i> = ${fr('<i>nv</i>','2<i>L</i>')}</span><span class="alt">bir uchi yopiq: <i>f<sub>n</sub></i> = ${fr('(2<i>n</i> − 1)<i>v</i>','4<i>L</i>')}</span>`,
  text:['Puflama cholg‘ular — nay, surnay, organ trubalari — ichidagi havo ustuni rezonansga keladi. Trubaga sig‘adigan turg‘un to‘lqinlar shartini chegaralar belgilaydi: ochiq uchda siljish do‘ngligi, yopiq uchda siljish tuguni bo‘ladi. Bosim tebranishlarida esa aksincha.','Ikki uchi ochiq trubada barcha garmonikalar (f, 2f, 3f, …) bor. Bir uchi yopiq trubada faqat toq garmonikalar (f, 3f, 5f, …) eshitiladi va asosiy ton xuddi shu uzunlikdagi ochiq trubanikidan bir oktava past bo‘ladi.'],
  legend:[['L','truba uzunligi, m'],['n','garmonika tartib raqami'],['v','tovush tezligi, 343 m/s (20 °C)'],['λ','to‘lqin uzunligi, m'],['f','rezonans chastotasi, Hz']],
  tries:['L ni ikki marta oshiring: chastota ikki marta kamayadi — uzun trubalar past ovoz chiqaradi.','Trubani yoping (turi = 1): asosiy chastota yarmiga tushadi.','Yopiq trubada n ni oshiring: chastotalar 1 : 3 : 5 nisbatda o‘sadi.'],
  params:[{id:'ty',label:'Truba turi (0 — ikki uchi ochiq, 1 — bir uchi yopiq)',sym:'',min:0,max:1,step:1,val:0,unit:'',d:0},{id:'L',label:'Truba uzunligi',sym:'L',min:0.2,max:1.5,step:0.01,val:0.6,unit:'m',d:2},{id:'n',label:'Garmonika',sym:'n',min:1,max:5,step:1,val:1,unit:'',d:0}],
  v:343,
  calc(P){const f=P.ty?(2*P.n-1)*this.v/(4*P.L):P.n*this.v/(2*P.L);return{f,lam:this.v/f};},
  prof(P,u){return P.ty?Math.cos((2*P.n-1)*Math.PI*u/2):Math.cos(P.n*Math.PI*u);},
  init(P){return{t:0};},
  step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.calc(P),x0=50,tw=(W-110)*(0.45+0.55*P.L/1.5),x1=x0+tw,ty=H*0.32,th=Math.min(110,H*0.24),A=Math.min(22,tw/(P.n*4+2)),ph=Math.sin(TAU*1.2*S.t);S.g={x0,x1,ty,th,ph};
    c.fillStyle=rgba('panel',0.8);c.fillRect(x0,ty-th/2,tw,th);line(c,x0,ty-th/2,x1,ty-th/2,C.ink,4);line(c,x0,ty+th/2,x1,ty+th/2,C.ink,4);if(P.ty)line(c,x1,ty-th/2-2,x1,ty+th/2+2,C.ink,7);
    const cols=Math.round(tw/9),rows=Math.max(5,Math.round(th/12));for(let i=0;i<=cols;i++){const u=i/cols,dx=A*this.prof(P,u)*ph;for(let j=0;j<rows;j++){const y=ty-th/2+(j+0.5)*th/rows;disk(c,clamp(x0+u*tw+dx,x0+2,x1-2),y,2.2,rgba('accent',0.55+0.4*Math.abs(this.prof(P,u))));}}
    const gy=ty+th/2+50,gh=Math.min(70,H*0.16);txt(c,'siljish amplitudasi',x0,gy-gh/2-12,C.accent,{font:SMALL});line(c,x0,gy,x1,gy,C.muted,1);
    [1,-1].forEach(s=>{c.strokeStyle=rgba('accent',0.9);c.lineWidth=2;c.beginPath();for(let i=0;i<=200;i++){const u=i/200,y=gy-s*gh/2*this.prof(P,u);i?c.lineTo(x0+u*tw,y):c.moveTo(x0+u*tw,y);}c.stroke();});
    const py=gy+gh+30;txt(c,'bosim amplitudasi',x0,py-gh/2-12,C.warm,{font:SMALL});line(c,x0,py,x1,py,C.muted,1);
    [1,-1].forEach(s=>{c.strokeStyle=rgba('warm',0.9);c.lineWidth=2;c.beginPath();for(let i=0;i<=200;i++){const u=i/200,k=P.ty?(2*P.n-1)*Math.PI/2:P.n*Math.PI,y=py-s*gh/2*Math.sin(k*u);i?c.lineTo(x0+u*tw,y):c.moveTo(x0+u*tw,y);}c.stroke();});
    const kk=P.ty?(2*P.n-1)/2:P.n;for(let m=0;m<=2*kk+1e-9;m++){const u=m/(2*kk);if(u>1+1e-9)break;const isNode=P.ty?(m%2===1):(m%2===1);txt(c,isNode?'T':'D',x0+u*tw,ty-th/2-14,isNode?C.red:C.green,{align:'center',font:'700 13px "IBM Plex Mono", monospace'});}
    txt(c,'D — do‘nglik, T — tugun (siljish)',x1-4,ty+th/2+16,C.muted,{align:'right',font:SMALL});txt(c,'f = '+fmt(q.f,0)+' Hz',W-20,30,C.warm,{align:'right',font:'700 18px "IBM Plex Mono", monospace'});},
  read(S,P){const q=this.calc(P),f1=P.ty?this.v/(4*P.L):this.v/(2*P.L);return[['Rezonans chastotasi f',fmt(q.f,0)+' Hz'],['Asosiy chastota f₁',fmt(f1,0)+' Hz'],['To‘lqin uzunligi λ',fmt(q.lam,3)+' m'],['L / λ',fmt(P.L/q.lam,2)],['Garmonika raqami',P.ty?String(2*P.n-1):String(P.n)],['Tovush tezligi v',this.v+' m/s']];}
});

/* 8. Maksvell taqsimoti */
const MXG=[['Geliy He',4],['Azot N₂',28],['Kislorod O₂',32],['Karbonat angidrid CO₂',44]];
function gaussR(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(TAU*v);}
SIMS.push({id:'maksvell',cat:'mol',title:'Maksvell taqsimoti: molekulalar tezliklari',short:'v_kv = √(3RT/M)',
  sub:'Gaz molekulalari turli tezliklarda harakatlanadi. Tezliklar histogrammasi Maksvell egri chizig‘iga mos keladi: harorat ortganda egri chiziq pasayadi, kengayadi va o‘ngga suriladi.',
  formula:`<span><i>f</i>(<i>v</i>) = 4π<i>v</i>²(${fr('<i>M</i>','2π<i>RT</i>')})<sup>3/2</sup> e<sup>−<i>Mv</i>²/2<i>RT</i></sup></span><span class="alt"><i>v</i><sub>e</sub> = ${sq(fr('2<i>RT</i>','<i>M</i>'))}, &nbsp;<i>v</i><sub>kv</sub> = ${sq(fr('3<i>RT</i>','<i>M</i>'))}</span>`,
  text:['Molekulalar bir-biri bilan to‘qnashib, doimo tezliklarini almashtiradi, lekin muvozanatda tezliklar taqsimoti o‘zgarmay qoladi. Juda sekin va juda tez molekulalar kam, ko‘pchiligi eng ehtimolli tezlik v_e atrofida bo‘ladi.','Uchta xarakterli tezlik bor: eng ehtimolli v_e, o‘rtacha v_o‘rt va o‘rtacha kvadratik v_kv; ular 1 : 1,13 : 1,22 nisbatda. Yengil gazlarda (geliy) tezliklar ancha katta — shuning uchun vodorod va geliy Yer atmosferasidan sekin-asta uchib ketadi.'],
  legend:[['T','absolyut harorat, K'],['M','molyar massa, g/mol'],['R','universal gaz doimiysi, 8,31 J/(mol·K)'],['v_e, v_o‘rt, v_kv','eng ehtimolli, o‘rtacha va o‘rtacha kvadratik tezlik'],['f(v)','tezliklar taqsimot funksiyasi']],
  tries:['Haroratni 4 marta oshiring: barcha xarakterli tezliklar 2 marta ortadi.','Gazni geliydan karbonat angidridga almashtiring: bir xil haroratda molekulalar ancha sekin.','Histogramma va egri chiziqni taqqoslang: ular mos tushadi.'],
  params:[{id:'T',label:'Harorat',sym:'T',min:100,max:1500,step:10,val:300,unit:'K',d:0,reset:1},{id:'g',label:'Gaz (0 — He, 1 — N₂, 2 — O₂, 3 — CO₂)',sym:'',min:0,max:3,step:1,val:1,unit:'',d:0,reset:1}],
  N:280,
  sp(P){const M=MXG[P.g][1]/1000,R=8.314;return{M,vp:Math.sqrt(2*R*P.T/M),va:Math.sqrt(8*R*P.T/(Math.PI*M)),vr:Math.sqrt(3*R*P.T/M),s:Math.sqrt(R*P.T/M)};},
  init(P){const q=this.sp(P),m=[];for(let i=0;i<this.N;i++){const v=q.s*Math.hypot(gaussR(),gaussR(),gaussR()),a=Math.random()*TAU;m.push({x:Math.random(),y:Math.random(),v,a});}return{m};},
  step(S,P,dt){const g=S.g;if(!g)return;S.m.forEach(o=>{const px=o.v*0.1*dt;o.x+=Math.cos(o.a)*px/g.bw;o.y+=Math.sin(o.a)*px/g.bh;if(o.x<0){o.x=-o.x;o.a=Math.PI-o.a;}if(o.x>1){o.x=2-o.x;o.a=Math.PI-o.a;}if(o.y<0){o.y=-o.y;o.a=-o.a;}if(o.y>1){o.y=2-o.y;o.a=-o.a;}});},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.sp(P),narrow=W<640,bx=20,by=20,bw=narrow?W-40:W*0.38,bh=narrow?H*0.36:H-60;S.g={bx,by,bw,bh};
    c.strokeStyle=C.ink;c.lineWidth=2;c.strokeRect(bx,by,bw,bh);const vmaxAx=2.6*Math.sqrt(2*8.314*1500/q.M);
    S.m.forEach(o=>{const k=clamp(o.v/(2*q.vp),0,1);disk(c,bx+o.x*bw,by+o.y*bh,3,`hsl(${Math.round(220-220*k)},85%,58%)`);});
    const gx=narrow?50:W*0.48,gy=narrow?H*0.48:40,gw=narrow?W-80:W*0.48,gh=narrow?H*0.42:H-110,nb=24,dv=vmaxAx/nb,cnt=new Array(nb).fill(0);S.m.forEach(o=>{const i=Math.floor(o.v/dv);if(i<nb)cnt[i]++;});
    const f=v=>4*Math.PI*v*v*Math.pow(q.M/(2*Math.PI*8.314*P.T),1.5)*Math.exp(-q.M*v*v/(2*8.314*P.T)),fmax=Math.max(f(q.vp),1e-12)*this.N*dv,ytop=Math.max(fmax*1.25,Math.max(...cnt)*1.1);
    const curve=[];for(let i=0;i<=200;i++){const v=vmaxAx*i/200;curve.push([v,f(v)*this.N*dv]);}
    const pl=gplot(c,gx,gy,gw,gh,{x0:0,x1:vmaxAx,y0:0,y1:ytop,xt:niceStep(vmaxAx,5),yt:niceStep(ytop,4),xl:'v, m/s',yl:'molekulalar soni'});
    cnt.forEach((n,i)=>{c.fillStyle=rgba('accent',0.45);const x=pl.X(i*dv),w=pl.X((i+1)*dv)-x-1;c.fillRect(x,pl.Y(n),w,pl.Y(0)-pl.Y(n));});
    c.strokeStyle=C.warm;c.lineWidth=2.6;c.beginPath();curve.forEach((p,i)=>i?c.lineTo(pl.X(p[0]),pl.Y(p[1])):c.moveTo(pl.X(p[0]),pl.Y(p[1])));c.stroke();
    [[q.vp,'vₑ',C.green],[q.va,'v_o‘rt',C.violet],[q.vr,'v_kv',C.red]].forEach(([v,l,col],i)=>{if(v>vmaxAx)return;line(c,pl.X(v),gy+6,pl.X(v),gy+gh,col,1.6,[5,4]);txt(c,l,pl.X(v)+3,gy+14+i*14,col,{font:SMALL});});},
  read(S,P){const q=this.sp(P);return[['Gaz',MXG[P.g][0]],['Molyar massa M',MXG[P.g][1]+' g/mol'],['Eng ehtimolli tezlik vₑ',fmt(q.vp,0)+' m/s'],['O‘rtacha tezlik',fmt(q.va,0)+' m/s'],['O‘rtacha kvadratik tezlik',fmt(q.vr,0)+' m/s'],['Molekula o‘rtacha kinetik energiyasi',fmt(1.5*1.380649e-23*P.T,2)+' J']];}
});

/* 9. Erkin yugurish yo‘li */
SIMS.push({id:'erkinyol',cat:'mol',title:'Molekulaning erkin yugurish yo‘li',short:'λ = kT / (√2·πd²p)',
  sub:'Qizil molekula boshqa molekulalar bilan to‘qnashib, siniq chiziq bo‘ylab harakatlanadi. Ikki to‘qnashuv orasidagi o‘rtacha masofa — erkin yugurish yo‘li. Bosim ortsa, u qisqaradi.',
  formula:`<span><i>λ</i> = ${fr('1','√2 π<i>d</i>²<i>n</i>')} = ${fr('<i>kT</i>','√2 π<i>d</i>²<i>p</i>')}</span><span class="alt"><i>z</i> = ${fr('<i>v</i><sub>o‘rt</sub>','<i>λ</i>')}</span>`,
  text:['Molekula boshqa molekulaga uning markazidan d masofagacha yaqinlashsa, to‘qnashadi. Shuning uchun λ molekulalar konsentratsiyasi n ga va diametr kvadratiga teskari proporsional. Normal sharoitda havoda λ ≈ 70 nm — molekula diametridan 200 marta katta.','Havo molekulasi sekundiga milliardlab marta to‘qnashadi, shuning uchun hid xona bo‘ylab tovush tezligida emas, sekin diffuziya bilan tarqaladi. Kosmosga yaqin siyrak havoda esa λ metrlar va kilometrlarga yetadi.'],
  legend:[['λ','erkin yugurish yo‘li'],['d','molekula diametri, havo uchun ≈ 0,37 nm'],['p','bosim, atm'],['T','harorat, K'],['z','sekundiga to‘qnashuvlar soni']],
  tries:['Bosimni 2 marta kamaytiring: molekulalar siyraklashadi va qizil molekulaning yo‘llari uzayadi.','Haroratni oshiring (bosim o‘zgarmas): konsentratsiya kamayadi, λ ortadi.','Simulyatsiyadagi λ ni nazariy qiymat bilan solishtiring.'],
  params:[{id:'p',label:'Bosim',sym:'p',min:0.2,max:2,step:0.05,val:1,unit:'atm',d:2,reset:1},{id:'T',label:'Harorat',sym:'T',min:200,max:1000,step:10,val:300,unit:'K',d:0,reset:1}],
  r:5,
  init(P){return{m:null,path:0,col:0,trail:[],N:clamp(Math.round(80*P.p*300/P.T),6,220)};},
  setup(S,P,bw,bh){const m=[],sp=95*Math.sqrt(P.T/300);let tries=0;while(m.length<S.N&&tries<20000){tries++;const x=this.r+Math.random()*(bw-2*this.r),y=this.r+Math.random()*(bh-2*this.r);if(m.every(o=>Math.hypot(o.x-x,o.y-y)>2*this.r+1)){const a=Math.random()*TAU;m.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp});}}S.m=m;S.bw=bw;S.bh=bh;S.trail=[[m[0].x,m[0].y]];},
  step(S,P,dt){if(!S.m)return;const m=S.m,r=this.r,n=3,h=dt/n;for(let s=0;s<n;s++){m.forEach(o=>{o.x+=o.vx*h;o.y+=o.vy*h;if(o.x<r){o.x=r;o.vx=Math.abs(o.vx);}if(o.x>S.bw-r){o.x=S.bw-r;o.vx=-Math.abs(o.vx);}if(o.y<r){o.y=r;o.vy=Math.abs(o.vy);}if(o.y>S.bh-r){o.y=S.bh-r;o.vy=-Math.abs(o.vy);}});
    for(let i=0;i<m.length;i++)for(let j=i+1;j<m.length;j++){const a=m[i],b=m[j],dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy;if(d2<4*r*r&&d2>1e-6){const d=Math.sqrt(d2),nx=dx/d,ny=dy/d,rv=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(rv>0){a.vx-=rv*nx;a.vy-=rv*ny;b.vx+=rv*nx;b.vy+=rv*ny;if(i===0){S.col++;S.trail.push([a.x,a.y]);if(S.trail.length>60)S.trail.shift();}}const ov=2*r-d;a.x-=nx*ov/2;a.y-=ny*ov/2;b.x+=nx*ov/2;b.y+=ny*ov/2;}}
    S.path+=Math.hypot(m[0].vx,m[0].vy)*h;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const narrow=W<640,bx=20,by=20,bw=narrow?W-40:W*0.6,bh=narrow?H*0.55:H-40;if(!S.m||Math.abs(S.bw-bw)>2||Math.abs(S.bh-bh)>2)this.setup(S,P,bw,bh);S.g={bx,by,bw,bh};
    c.strokeStyle=C.ink;c.lineWidth=2;c.strokeRect(bx,by,bw,bh);S.m.forEach((o,i)=>{if(i)disk(c,bx+o.x,by+o.y,this.r,rgba('accent',0.7));});
    const o=S.m[0];c.strokeStyle=rgba('red',0.8);c.lineWidth=1.6;c.beginPath();S.trail.forEach((p,i)=>i?c.lineTo(bx+p[0],by+p[1]):c.moveTo(bx+p[0],by+p[1]));c.lineTo(bx+o.x,by+o.y);c.stroke();S.trail.forEach(p=>disk(c,bx+p[0],by+p[1],2.5,C.red));disk(c,bx+o.x,by+o.y,this.r+1,C.red);
    const lsim=S.col?S.path/S.col:NaN,lth=bw*bh/(Math.SQRT2*S.m.length*2*this.r),tx=narrow?24:bx+bw+24,ty=narrow?by+bh+24:60;
    txt(c,'Simulyatsiyada:',tx,ty,C.ink,{font:'600 14px "IBM Plex Sans", sans-serif'});txt(c,'molekulalar: '+S.m.length,tx,ty+22,C.muted);txt(c,'to‘qnashuvlar: '+S.col,tx,ty+40,C.muted);txt(c,'λ (o‘lchangan) ≈ '+(isFinite(lsim)?fmt(lsim,0):'—')+' px',tx,ty+58,C.red);txt(c,'λ (nazariy) = '+fmt(lth,0)+' px',tx,ty+76,C.green);},
  real(P){const k=1.380649e-23,d=3.7e-10,p=P.p*101325,lam=k*P.T/(Math.SQRT2*Math.PI*d*d*p),va=Math.sqrt(8*8.314*P.T/(Math.PI*0.029));return{lam,va,z:va/lam,n:p/(k*P.T)};},
  read(S,P){const q=this.real(P);return[['Erkin yugurish yo‘li λ',fmt(q.lam*1e9,0)+' nm'],['O‘rtacha tezlik',fmt(q.va,0)+' m/s'],['Sekundiga to‘qnashuvlar z',fmt(q.z,2)],['Konsentratsiya n',fmt(q.n,2)+' 1/m³'],['λ / d',fmt(q.lam/3.7e-10,0)]];}
});

/* 10. Otto sikli */
SIMS.push({id:'otto',cat:'trm',title:'Ichki yonuv dvigateli: Otto sikli',short:'η = 1 − 1/r^(γ−1)',
  sub:'To‘rt taktli benzin dvigateli: so‘rish, siqish, ish yo‘li va chiqarish. Porshen harakati p–V diagrammasida sikl sifatida chiziladi, sikl ichidagi yuza bir siklda bajarilgan foydali ishga teng.',
  formula:`<span><i>η</i> = 1 − ${fr('1','<i>r</i><sup><i>γ</i>−1</sup>')}, &nbsp;<i>r</i> = ${fr('<i>V</i>₁','<i>V</i>₂')}</span><span class="alt"><i>pV</i><sup><i>γ</i></sup> = const (adiabata)</span>`,
  text:['Otto siklida ikkita adiabata va ikkita izoxora bor: yonilg‘i aralashmasi tez siqiladi (1→2), uchqun bilan yonib, hajm deyarli o‘zgarmasdan bosim keskin ortadi (2→3), so‘ng gaz kengayib porshenni itaradi (3→4) va nihoyat chiqarish klapani ochilib, bosim tushadi (4→1).','Ideal Otto siklining FIK faqat siqish darajasi r ga bog‘liq: r qancha katta bo‘lsa, FIK shuncha yuqori. Lekin juda katta r da aralashma o‘z-o‘zidan alangalanib ketadi (detonatsiya), shuning uchun benzin dvigatellarida r ≈ 8–12.'],
  legend:[['r','siqish darajasi V₁/V₂'],['γ','adiabata ko‘rsatkichi, havo uchun 1,4'],['Q','bir siklda yonilg‘idan olingan issiqlik, J'],['A','bir sikldagi foydali ish, J'],['η','foydali ish koeffitsiyenti']],
  tries:['r ni 4 dan 12 ga oshiring: FIK 43% dan 63% gacha ortadi.','Q ni oshiring: sikl yuzasi kattalashadi, lekin FIK o‘zgarmaydi.','p–V diagrammadagi nuqta qaysi taktda qaysi chiziq bo‘ylab yurishini kuzating.'],
  params:[{id:'r',label:'Siqish darajasi',sym:'r',min:4,max:12,step:0.5,val:8,unit:'',d:1},{id:'Q',label:'Yonilg‘i issiqligi (bir siklda)',sym:'Q',min:100,max:800,step:10,val:400,unit:'J',d:0}],
  st(P){const g=1.4,p1=1e5,V1=5e-4,T1=300,R=8.314,n=p1*V1/(R*T1),Cv=2.5*R,V2=V1/P.r,T2=T1*Math.pow(P.r,g-1),p2=p1*Math.pow(P.r,g),T3=T2+P.Q/(n*Cv),p3=p2*T3/T2,T4=T3/Math.pow(P.r,g-1),p4=p3/Math.pow(P.r,g),eta=1-1/Math.pow(P.r,g-1);return{g,p1,V1,V2,T1,T2,T3,T4,p2,p3,p4,n,eta,A:eta*P.Q};},
  init(P){return{th:0};},
  step(S,P,dt){S.th=(S.th+dt*TAU/4.4)%(4*Math.PI);},
  state(P,th){const q=this.st(P),V=q.V2+(q.V1-q.V2)*(1-Math.cos(th))/2,k=Math.floor(th/Math.PI);let p;if(k===0||k===3)p=q.p1;else if(k===1)p=q.p1*Math.pow(q.V1/V,q.g);else p=q.p3*Math.pow(q.V2/V,q.g);return{V,p,k,T:p*V/(q.n*8.314)};},
  draw(c,W,H,S,P){grid(c,W,H,28);const q=this.st(P),s=this.state(P,S.th),narrow=W<640,cx=narrow?W*0.25:W*0.2,cw=Math.min(110,W*0.16),ctop=50,stroke=Math.min(H*0.32,160),hTDC=stroke/(P.r-1),pis=ctop+hTDC+stroke*(s.V-q.V2)/(q.V1-q.V2);S.g={cx,cw,ctop,pis,k:s.k};
    const hc=clamp((s.T-300)/1700,0,1);c.fillStyle=s.k===2&&S.th<2*Math.PI+0.25?'rgba(255,220,120,0.9)':`rgba(${Math.round(90+165*hc)},${Math.round(140-60*hc)},${Math.round(255-200*hc)},0.45)`;c.fillRect(cx-cw/2,ctop,cw,pis-ctop);
    c.strokeStyle=C.ink;c.lineWidth=4;c.beginPath();c.moveTo(cx-cw/2,ctop+hTDC+stroke+40);c.lineTo(cx-cw/2,ctop);c.lineTo(cx+cw/2,ctop);c.lineTo(cx+cw/2,ctop+hTDC+stroke+40);c.stroke();
    c.fillStyle='#8a94a6';rrect(c,cx-cw/2+3,pis,cw-6,30,4);c.fill();const cr=stroke/2,ccx=cx,ccy=ctop+hTDC+stroke+30+cr+20,ang=S.th+Math.PI/2;const kx=ccx+cr*Math.cos(S.th-Math.PI/2)*0+cr*Math.sin(S.th),ky=ccy-cr*Math.cos(S.th);
    c.strokeStyle=rgba('muted',0.7);c.lineWidth=2;c.beginPath();c.arc(ccx,ccy,cr,0,TAU);c.stroke();line(c,cx,pis+30,kx,ky,C.ink,5);disk(c,kx,ky,6,C.warm);disk(c,ccx,ccy,5,C.ink);
    const vo=s.k===0,ve=s.k===3;line(c,cx-cw/4,ctop-(vo?2:12),cx-cw/4,ctop-34,C.ink,3);line(c,cx+cw/4,ctop-(ve?2:12),cx+cw/4,ctop-34,C.ink,3);txt(c,vo?'kirish ochiq':'',cx-cw/2-6,ctop-24,C.green,{align:'right',font:SMALL});txt(c,ve?'chiqish ochiq':'',cx+cw/2+6,ctop-24,C.red,{font:SMALL});
    if(s.k===2&&S.th<2*Math.PI+0.3)disk(c,cx,ctop+6,10,'#ffe27a');
    const names=['1. So‘rish','2. Siqish','3. Ish yo‘li','4. Chiqarish'];txt(c,names[s.k],cx,22,C.ink,{align:'center',font:'700 15px "IBM Plex Sans", sans-serif'});
    const gx=narrow?W*0.5:W*0.42,gw=narrow?W*0.46:W*0.52,gy=40,gh=H-110,pm=q.p3*1.08/1e5,Vm=q.V1*1.1*1e6;const ad=(pA,VA,V)=>pA*Math.pow(VA/V,q.g);
    const L12=[],L34=[];for(let i=0;i<=60;i++){const V=q.V1+(q.V2-q.V1)*i/60;L12.push([V*1e6,ad(q.p1,q.V1,V)/1e5]);L34.push([(q.V2+(q.V1-q.V2)*i/60)*1e6,ad(q.p3,q.V2,q.V2+(q.V1-q.V2)*i/60)/1e5]);}
    const loop=[...L12,[q.V2*1e6,q.p3/1e5],...L34,[q.V1*1e6,q.p1/1e5]];
    const pl=gplot(c,gx,gy,gw,gh,{x0:0,x1:Vm,y0:0,y1:pm,xt:niceStep(Vm,5),yt:niceStep(pm,5),xl:'V, sm³',yl:'p, atm',lines:[[[[q.V2*1e6,q.p1/1e5],[q.V1*1e6,q.p1/1e5]],C.muted,1.5,[5,4]],[loop,C.accent,2.4]]});
    c.fillStyle=rgba('accent',0.18);c.beginPath();loop.forEach((p,i)=>i?c.lineTo(pl.X(p[0]),pl.Y(p[1])):c.moveTo(pl.X(p[0]),pl.Y(p[1])));c.closePath();c.fill();
    [[q.V1,q.p1,'1'],[q.V2,q.p2,'2'],[q.V2,q.p3,'3'],[q.V1,q.p4,'4']].forEach(([V,p,l])=>{disk(c,pl.X(V*1e6),pl.Y(p/1e5),4,C.ink);txt(c,l,pl.X(V*1e6)+8,pl.Y(p/1e5)-8,C.ink,{font:SMALL});});
    disk(c,pl.X(s.V*1e6),pl.Y(s.p/1e5),8,C.warm);txt(c,'A = '+fmt(q.A,0)+' J',pl.X((q.V1+q.V2)/2*1e6),pl.Y((q.p2+q.p4)/2e5),C.accent,{align:'center',font:'600 13px "IBM Plex Mono", monospace'});},
  read(S,P){const q=this.st(P),s=this.state(P,S.th);return[['FIK η',fmt(q.eta*100,1)+' %'],['Bir sikldagi ish A',fmt(q.A,0)+' J'],['Siqishdan keyin T₂',fmt(q.T2,0)+' K'],['Yonishdan keyin T₃',fmt(q.T3,0)+' K'],['Eng katta bosim p₃',fmt(q.p3/101325,1)+' atm'],['Hozirgi harorat',fmt(s.T,0)+' K']];}
});

/* 11. Gazning ishi: p–V yuzasi */
const PVPATH=['avval izobarik, keyin izoxorik','avval izoxorik, keyin izobarik','to‘g‘ri chiziq bo‘ylab'];
SIMS.push({id:'pvish',cat:'trm',title:'Gaz bajargan ish p–V diagramma yuzasi sifatida',short:'A = ∫p dV',
  sub:'Gaz bir holatdan ikkinchisiga turli yo‘llar bilan o‘tishi mumkin. Ichki energiya o‘zgarishi yo‘lga bog‘liq emas, lekin bajarilgan ish va olingan issiqlik yo‘lga bog‘liq.',
  formula:`<span><i>A</i> = ∫<i>p</i> d<i>V</i> (grafik ostidagi yuza)</span><span class="alt"><i>Q</i> = Δ<i>U</i> + <i>A</i>, &nbsp;Δ<i>U</i> = ${fr('3','2')}(<i>p</i>₂<i>V</i>₂ − <i>p</i>₁<i>V</i>₁)</span>`,
  text:['Porshen kichik dV masofaga surilganda gaz p·dV ish bajaradi. Butun jarayon uchun ish p(V) grafigi ostidagi yuzaga teng. Gaz kengaysa ish musbat, siqilsa manfiy; hajm o‘zgarmasa (izoxorik jarayon), ish nolga teng.','Ichki energiya faqat holatga bog‘liq: bir atomli ideal gaz uchun U = 3/2·pV. Shuning uchun ikki holat orasidagi ΔU barcha yo‘llar uchun bir xil, lekin ish har xil. Termodinamikaning birinchi qonuniga ko‘ra issiqlik ham yo‘lga bog‘liq bo‘ladi.'],
  legend:[['p','bosim, kPa'],['V','hajm, l'],['A','gaz bajargan ish, J (kPa·l = J)'],['ΔU','ichki energiya o‘zgarishi, J'],['Q','gazga berilgan issiqlik, J']],
  tries:['Uchala yo‘lni almashtirib ko‘ring: ΔU bir xil, A va Q esa har xil.','V₂ ni V₁ dan kichik qiling: gaz siqiladi va ish manfiy bo‘ladi.','V₁ = V₂ qiling: har qanday yo‘lda ish nolga teng.'],
  params:[{id:'V1',label:'Boshlang‘ich hajm',sym:'V₁',min:1,max:5,step:0.1,val:1,unit:'l',d:1,reset:1},{id:'p1',label:'Boshlang‘ich bosim',sym:'p₁',min:100,max:500,step:10,val:300,unit:'kPa',d:0,reset:1},{id:'V2',label:'Oxirgi hajm',sym:'V₂',min:1,max:5,step:0.1,val:4,unit:'l',d:1,reset:1},{id:'p2',label:'Oxirgi bosim',sym:'p₂',min:100,max:500,step:10,val:100,unit:'kPa',d:0,reset:1},{id:'pa',label:'Yo‘l (0, 1 yoki 2)',sym:'',min:0,max:2,step:1,val:0,unit:'',d:0,reset:1}],
  path(P,i){const A=[P.V1,P.p1],B=[P.V2,P.p2];return i===0?[A,[P.V2,P.p1],B]:i===1?[A,[P.V1,P.p2],B]:[A,B];},
  work(P,i){return i===0?P.p1*(P.V2-P.V1):i===1?P.p2*(P.V2-P.V1):(P.p1+P.p2)/2*(P.V2-P.V1);},
  init(P){return{u:0,t:0};},
  step(S,P,dt){S.t+=dt;S.u=clamp(S.t/3,0,1);if(S.t>4.4)S.t=0;},
  at(pts,u){const seg=[];let L=0;for(let i=1;i<pts.length;i++){const d=Math.hypot((pts[i][0]-pts[i-1][0])/5,(pts[i][1]-pts[i-1][1])/500);seg.push(d);L+=d;}if(L<1e-9)return{p:pts[0],k:0};let s=u*L;for(let i=0;i<seg.length;i++){if(s<=seg[i]||i===seg.length-1){const f=seg[i]?clamp(s/seg[i],0,1):1;return{p:[pts[i][0]+(pts[i+1][0]-pts[i][0])*f,pts[i][1]+(pts[i+1][1]-pts[i][1])*f],k:i};}s-=seg[i];}return{p:pts[pts.length-1],k:0};},
  draw(c,W,H,S,P){grid(c,W,H,28);const narrow=W<640,gx=narrow?50:W*0.4,gw=narrow?W-80:W*0.55,gy=narrow?H*0.42:40,gh=narrow?H*0.48:H-110;
    const pl=gplot(c,gx,gy,gw,gh,{x0:0,x1:5.5,y0:0,y1:550,xt:1,yt:100,xl:'V, l',yl:'p, kPa'});
    [0,1,2].forEach(i=>{if(i===P.pa)return;const pts=this.path(P,i);c.setLineDash([5,5]);c.strokeStyle=rgba('muted',0.6);c.lineWidth=1.5;c.beginPath();pts.forEach((p,j)=>j?c.lineTo(pl.X(p[0]),pl.Y(p[1])):c.moveTo(pl.X(p[0]),pl.Y(p[1])));c.stroke();c.setLineDash([]);});
    const pts=this.path(P,P.pa),cur=this.at(pts,S.u),done=pts.slice(0,cur.k+1).concat([cur.p]);
    c.fillStyle=P.V2>=P.V1?rgba('green',0.28):rgba('red',0.28);c.beginPath();c.moveTo(pl.X(done[0][0]),pl.Y(0));done.forEach(p=>c.lineTo(pl.X(p[0]),pl.Y(p[1])));c.lineTo(pl.X(cur.p[0]),pl.Y(0));c.closePath();c.fill();
    c.strokeStyle=C.accent;c.lineWidth=3;c.beginPath();pts.forEach((p,j)=>j?c.lineTo(pl.X(p[0]),pl.Y(p[1])):c.moveTo(pl.X(p[0]),pl.Y(p[1])));c.stroke();
    disk(c,pl.X(P.V1),pl.Y(P.p1),6,C.ink);txt(c,'1',pl.X(P.V1)-12,pl.Y(P.p1)-10,C.ink);disk(c,pl.X(P.V2),pl.Y(P.p2),6,C.ink);txt(c,'2',pl.X(P.V2)+8,pl.Y(P.p2)-10,C.ink);disk(c,pl.X(cur.p[0]),pl.Y(cur.p[1]),8,C.warm);
    const cx=narrow?W*0.5:W*0.17,cw=Math.min(110,W*0.18),cb=narrow?H*0.36:H-60,ch=narrow?H*0.28:H*0.62,V=cur.p[0],py=cb-ch*V/5.5,T=cur.p[0]*cur.p[1];S.g={cx,cw,cb,ch,py,V,p:cur.p[1]};
    const hc=clamp((T-100)/2000,0,1);c.fillStyle=`rgba(${Math.round(90+165*hc)},${Math.round(150-70*hc)},${Math.round(255-200*hc)},0.45)`;c.fillRect(cx-cw/2,py,cw,cb-py);c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(cx-cw/2,cb-ch-10);c.lineTo(cx-cw/2,cb);c.lineTo(cx+cw/2,cb);c.lineTo(cx+cw/2,cb-ch-10);c.stroke();
    c.fillStyle='#8a94a6';c.fillRect(cx-cw/2+2,py-12,cw-4,12);const nw=Math.round(cur.p[1]/100);for(let i=0;i<nw;i++){c.fillStyle='#5b6475';rrect(c,cx-cw/4,py-12-(i+1)*10,cw/2,9,2);c.fill();}
    txt(c,'yo‘l: '+PVPATH[P.pa],gx+gw,gy-14,C.accent,{align:'right',font:SMALL});},
  read(S,P){const A=this.work(P,P.pa),dU=1.5*(P.p2*P.V2-P.p1*P.V1);return[['Bajarilgan ish A',fmt(A,0)+' J'],['Ichki energiya o‘zgarishi ΔU',fmt(dU,0)+' J'],['Olingan issiqlik Q',fmt(dU+A,0)+' J'],['Boshqa yo‘llarda A',[0,1,2].filter(i=>i!==P.pa).map(i=>fmt(this.work(P,i),0)).join(' va ')+' J'],['T₂ / T₁',fmt(P.p2*P.V2/(P.p1*P.V1),2)]];}
});
