/* Yorug‘likning qutblanishi: Malyus qonuni */
SIMS.push({id:'qutblanish',cat:'opt',title:'Yorug‘likning qutblanishi',short:'I = I₀cos²φ',
  sub:'Yorug‘lik — ko‘ndalang to‘lqin. Polyaroid faqat bitta yo‘nalishda tebranayotgan elektr maydonni o‘tkazadi. Ikkinchi polyaroid (analizator) burilganda o‘tgan yorug‘lik kuchsizlanadi.',
  formula:`<span><i>I</i> = <i>I</i><sub>1</sub> cos² <i>φ</i></span><span class="alt"><i>I</i><sub>1</sub> = ${fr('<i>I</i><sub>0</sub>','2')} &nbsp;(tabiiy yorug‘lik uchun)</span>`,
  text:['Tabiiy yorug‘likda elektr maydon vektori barcha ko‘ndalang yo‘nalishlarda tartibsiz tebranadi. Birinchi polyaroid (polyarizator) undan bitta yo‘nalishni ajratadi va intensivlik ikki marta kamayadi.','Analizator o‘qi polyarizator o‘qiga φ burchak ostida bo‘lsa, maydon amplitudasining faqat E·cosφ qismi o‘tadi, intensivlik esa amplituda kvadratiga proporsional: I = I₁cos²φ (Malyus qonuni). φ = 90° da yorug‘lik butunlay so‘nadi. Ammo ular orasiga 45° li uchinchi polyaroid qo‘yilsa, yorug‘lik yana o‘tadi!'],
  legend:[['I₀','tabiiy yorug‘lik intensivligi'],['I₁','polyarizatordan keyingi intensivlik'],['φ','analizator va polyarizator o‘qlari orasidagi burchak'],['θ','o‘rta polyaroid burchagi']],
  tries:['Analizatorni 90° ga buring: ekran qorong‘ilashadi.','90° holatda o‘rtadagi polyaroidni yoqing va θ = 45° qiling: ekranga I₀/8 yorug‘lik tushadi.','Grafikda cos² egri chizig‘i bo‘ylab nuqta harakatini kuzating.'],
  params:[{id:'phi',label:'Analizator burchagi',sym:'φ',min:0,max:180,step:1,val:60,unit:'°',d:0},{id:'mid',label:'O‘rta polyaroid',choices:[[0,'Yo‘q'],[1,'Bor']],val:0},{id:'th',label:'O‘rta polyaroid burchagi',sym:'θ',min:0,max:180,step:1,val:45,unit:'°',d:0}],
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const cy=H*0.42,x0=30,x1=W-30,A=Math.min(34,H*0.11),k=0.09,ph=S.t*6,pos=P.mid?[0.28,0.5,0.72]:[0.33,0.67],angs=P.mid?[0,P.th,P.phi]:[0,P.phi];S.g={cy,A,pos};
    const pX=pos.map(f=>x0+(x1-x0)*f);let amp=[1],I=[1],cur=0.5;I.push(0.5);let a0=0;
    for(let i=1;i<angs.length;i++){const c2=Math.cos((angs[i]-angs[i-1])*D2R)**2;cur*=c2;I.push(cur);}
    const proj=(e,ang)=>{const a=ang*D2R;return[e*Math.sin(a)*0.45,-e*Math.cos(a)];};
    for(let x=x0;x<pX[0];x+=7){const s=Math.sin(ph-x*k);for(let j=0;j<3;j++){const a=(j*60+((x*13)%180))*1,[dx,dy]=proj(s*A,a);line(c,x,cy,x+dx,cy+dy,rgba('warm',0.45),1.5);}}
    for(let i=0;i<pX.length;i++){const xa=pX[i],xb=i+1<pX.length?pX[i+1]:x1-60,e=Math.sqrt(I[i+1]*2),ang=angs[i];if(e>0.01)for(let x=xa+10;x<xb;x+=7){const s=Math.sin(ph-x*k),[dx,dy]=proj(s*A*e,ang);line(c,x,cy,x+dx,cy+dy,rgba('warm',0.85),2);}}
    line(c,x0,cy,x1-60,cy,rgba('ink',0.25),1,[4,4]);
    pX.forEach((x,i)=>{const ang=angs[i];c.fillStyle=rgba('accent',0.18);c.strokeStyle=C.accent;c.lineWidth=2;c.beginPath();c.ellipse(x,cy,A*0.55,A*1.6,0,0,TAU);c.fill();c.stroke();const[dx,dy]=proj(A*1.4,ang);line(c,x-dx,cy-dy,x+dx,cy+dy,C.accent,3);
      txt(c,i===0?'polyarizator':i===pX.length-1?'analizator':'o‘rta',x,cy+A*1.6+16,C.muted,{align:'center',font:SMALL});txt(c,fmt(ang,0)+'°',x,cy-A*1.6-12,C.accent,{align:'center',font:SMALL});});
    const sx=x1-30,If=I[I.length-1];c.fillStyle=`rgba(255,226,120,${0.08+0.9*If*2})`;c.fillRect(sx-12,cy-A*1.8,24,A*3.6);c.strokeStyle=C.ink;c.lineWidth=1.5;c.strokeRect(sx-12,cy-A*1.8,24,A*3.6);txt(c,'ekran',sx,cy+A*1.8+14,C.muted,{align:'center',font:SMALL});
    disk(c,x0,cy,8,'#ffd166');
    const gx=W*0.18,gw=W*0.64,gb=H-22,gt=H*0.74,Xp=f=>gx+f/180*gw,Yi=i=>gb-i/0.5*(gb-gt);line(c,gx,gb,gx+gw,gb,C.ink,1.2);line(c,gx,gb,gx,gt-4,C.ink,1.2);
    c.strokeStyle=C.accent;c.lineWidth=2;c.beginPath();for(let f=0;f<=180;f+=2){const ii=P.mid?0.5*Math.cos(P.th*D2R)**2*Math.cos((f-P.th)*D2R)**2:0.5*Math.cos(f*D2R)**2;f?c.lineTo(Xp(f),Yi(ii)):c.moveTo(Xp(f),Yi(ii));}c.stroke();disk(c,Xp(P.phi),Yi(If),5,C.red);
    txt(c,'I/I₀',gx-8,gt,C.muted,{align:'right',font:SMALL});txt(c,'φ',gx+gw+8,gb,C.muted,{font:MATH});[0,90,180].forEach(v=>txt(c,v+'°',Xp(v),gb+12,C.muted,{align:'center',font:SMALL}));
  },
  read(S,P){const I=P.mid?0.5*Math.cos(P.th*D2R)**2*Math.cos((P.phi-P.th)*D2R)**2:0.5*Math.cos(P.phi*D2R)**2;return[['Polyarizatordan keyin',fmt(0.5,2)+' I₀'],['Ekranga tushgan intensivlik',fmt(I,3)+' I₀'],['cos²φ',fmt(Math.cos(P.phi*D2R)**2,3)],['Amplituda nisbati E/E₀',fmt(Math.sqrt(I),3)]];}
});
