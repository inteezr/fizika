/* Relyativistik tezliklarni qo‘shish */
SIMS.push({id:'tezqoshish',cat:'rel',title:'Tezliklarni relyativistik qo‘shish',short:'w = (u+v′)/(1+uv′/c²)',
  sub:'Kemadan oldinga otilgan snaryadning Yerga nisbatan tezligi oddiy yig‘indi u + v′ ga teng emas. Natija hech qachon yorug‘lik tezligidan oshmaydi.',
  formula:`<span><i>w</i> = ${fr('<i>u</i> + <i>v</i>′','1 + <i>uv</i>′/<i>c</i>²')}</span><span class="alt">klassik: <i>w</i> = <i>u</i> + <i>v</i>′</span>`,
  text:['Galiley qoidasi bo‘yicha tezliklar oddiy qo‘shiladi. Lekin Eynshteynning ikkinchi postulatiga ko‘ra yorug‘lik tezligi barcha sanoq sistemalarida bir xil. Bu bilan oddiy qo‘shish qoidasi mos kelmaydi.','Lorens almashtirishlaridan tezliklarni qo‘shishning relyativistik formulasi kelib chiqadi. Kichik tezliklarda uv′/c² ≈ 0 bo‘lib, u klassik formulaga aylanadi. v′ = c bo‘lsa, w = c chiqadi: kemadan chiqarilgan yorug‘lik Yerga nisbatan ham c tezlikda tarqaladi.'],
  legend:[['u','kemaning Yerga nisbatan tezligi (c ulushida)'],['v′','snaryadning kemaga nisbatan tezligi'],['w','snaryadning Yerga nisbatan tezligi'],['c','yorug‘lik tezligi, 3·10⁸ m/s']],
  tries:['u = 0,9c va v′ = 0,9c qiling: klassik javob 1,8c, haqiqiysi esa 0,994c.','v′ = 1 (yorug‘lik) qiling: w = c, u qanday bo‘lmasin.','Kichik tezliklarda (0,1c) ikki natija deyarli bir xil ekanini tekshiring.'],
  params:[{id:'u',label:'Kema tezligi',sym:'u',min:0,max:0.99,step:0.01,val:0.6,unit:'c',d:2,reset:1},{id:'v',label:'Snaryadning kemaga nisbatan tezligi',sym:'v′',min:0,max:1,step:0.01,val:0.7,unit:'c',d:2,reset:1}],
  init:()=>({t:0}),
  step(S,P,dt){S.t+=dt*0.35;if(S.t>2.3)S.t=0;},
  draw(c,W,H,S,P){grid(c,W,H,28);const w=(P.u+P.v)/(1+P.u*P.v),wc=P.u+P.v,x0=40,L=(W-80)/2.2,X=d=>x0+d*L,ty=[H*0.14,H*0.3,H*0.46];S.g={x0,L,ty};const t=S.t;
    line(c,x0,ty[2]+30,W-20,ty[2]+30,C.ink,1.5);for(let i=0;i<=2;i++){line(c,X(i),ty[2]+24,X(i),ty[2]+36,C.ink,1.5);txt(c,String(i),X(i),ty[2]+48,C.muted,{align:'center',font:SMALL});}txt(c,'masofa, yorug‘lik soniyasi',W-20,ty[2]+14,C.muted,{align:'right',font:SMALL});
    const sx=X(P.u*t);c.fillStyle=C.accent;c.beginPath();c.moveTo(sx+22,ty[1]);c.lineTo(sx-14,ty[1]-11);c.lineTo(sx-14,ty[1]+11);c.closePath();c.fill();txt(c,'kema  u = '+fmt(P.u,2)+'c',sx-14,ty[1]-22,C.accent,{font:SMALL});
    line(c,x0,ty[0],X(t),ty[0],rgba('warm',0.5),1,[2,3]);disk(c,X(t),ty[0],6,'#ffd166');txt(c,'yorug‘lik c',X(t)+10,ty[0]-12,C.warm,{font:SMALL});
    const xr=X(w*t),xc=X(wc*t);if(xc<W){disk(c,xc,ty[1]+40,6,null,C.red);line(c,x0,ty[1]+40,xc,ty[1]+40,rgba('red',0.4),1,[4,4]);txt(c,'klassik: '+fmt(wc,2)+'c',Math.min(xc,W-110)+10,ty[1]+56,C.red,{font:SMALL});}
    disk(c,xr,ty[1]+40,6,C.green);line(c,x0,ty[1]+40,xr,ty[1]+40,rgba('green',0.6),2);txt(c,'haqiqiy: '+fmt(w,3)+'c',xr+10,ty[1]+26,C.green,{font:SMALL});
    const gx=W*0.12,gw=W*0.76,gb=H-26,gt=H*0.62,Xv=v=>gx+v*gw,Yw=q=>gb-q/2*(gb-gt);line(c,gx,gb,gx+gw,gb,C.ink,1.2);line(c,gx,gb,gx,gt-6,C.ink,1.2);line(c,gx,Yw(1),gx+gw,Yw(1),rgba('warm',0.8),1.2,[5,4]);txt(c,'c',gx-10,Yw(1),C.warm,{font:MATH,align:'right'});
    c.strokeStyle=rgba('red',0.7);c.lineWidth=1.5;c.setLineDash([5,4]);c.beginPath();c.moveTo(Xv(0),Yw(P.u));c.lineTo(Xv(1),Yw(P.u+1));c.stroke();c.setLineDash([]);
    c.strokeStyle=C.green;c.lineWidth=2.5;c.beginPath();for(let i=0;i<=50;i++){const v=i/50,q=(P.u+v)/(1+P.u*v);i?c.lineTo(Xv(v),Yw(q)):c.moveTo(Xv(v),Yw(q));}c.stroke();disk(c,Xv(P.v),Yw(w),5,C.green);disk(c,Xv(P.v),Yw(wc),4,C.red);
    txt(c,'v′/c',gx+gw+6,gb,C.muted,{font:SMALL});txt(c,'w/c',gx+4,gt-10,C.muted,{font:SMALL});[0,0.5,1].forEach(v=>txt(c,String(v).replace('.',','),Xv(v),gb+12,C.muted,{align:'center',font:SMALL}));
  },
  read(S,P){const w=(P.u+P.v)/(1+P.u*P.v);return[['Relyativistik w',fmt(w,4)+' c'],['Klassik u + v′',fmt(P.u+P.v,2)+' c'],['Farq',fmt((P.u+P.v-w),3)+' c'],['w (km/s)',fmt(w*299792,0)+' km/s']];}
});
