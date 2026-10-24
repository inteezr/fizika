/* Lissaju figuralari */
const LS_R=[[1,1],[1,2],[2,3],[3,4],[1,3],[3,5]];
SIMS.push({id:'lissaju',cat:'teb',title:'O‘zaro tik tebranishlarni qo‘shish',short:'Lissaju figuralari',
  sub:'Nuqta bir vaqtda ikki o‘zaro perpendikulyar yo‘nalishda garmonik tebransa, uning trayektoriyasi chastotalar nisbati va fazalar farqiga bog‘liq chiroyli egri chiziq — Lissaju figurasini chizadi.',
  formula:`<span><i>x</i> = <i>A</i> sin(<i>ω</i><sub>x</sub><i>t</i> + <i>φ</i>), &nbsp;<i>y</i> = <i>B</i> sin <i>ω</i><sub>y</sub><i>t</i></span><span class="alt"><i>ω</i><sub>x</sub> : <i>ω</i><sub>y</sub> = <i>n</i><sub>y</sub> : <i>n</i><sub>x</sub></span>`,
  text:['Chastotalar teng bo‘lsa, fazalar farqi 0 da nuqta to‘g‘ri chiziq, 90° da ellips (amplitudalar teng bo‘lsa aylana) chizadi. Chastotalar nisbati butun sonlar nisbati bo‘lsa, trayektoriya yopiq egri chiziq bo‘ladi.','Figuraning gorizontal chiziqqa tegish nuqtalari soni y bo‘yicha, vertikal chiziqqa tegishlari esa x bo‘yicha chastotaga proporsional. Bundan ostsillografda noma’lum chastotani ma’lum chastota bilan solishtirib o‘lchashda foydalaniladi.'],
  legend:[['ωₓ, ω_y','tebranishlarning burchak chastotalari'],['φ','fazalar farqi'],['A, B','amplitudalar']],
  tries:['1:1 nisbatda φ ni 0 dan 90° gacha o‘zgartiring: chiziq ellipsga, keyin aylanaga aylanadi.','1:2 nisbatda φ = 0 da “sakkiz” raqami, φ = 45° da esa parabola hosil bo‘ladi.','Figuraning yuqori chetiga tegishlar sonini sanab, chastotalar nisbatini aniqlang.'],
  params:[{id:'r',label:'Chastotalar nisbati ωₓ : ω_y',choices:LS_R.map((q,i)=>[i,q[0]+':'+q[1]]),val:2,reset:1},{id:'ph',label:'Fazalar farqi',sym:'φ',min:0,max:180,step:1,val:90,unit:'°',d:0},{id:'B',label:'Amplitudalar nisbati',sym:'B/A',min:0.3,max:1,step:0.05,val:1,d:2}],
  init:()=>({t:0,tr:[]}),
  step(S,P,dt){S.t+=dt*0.6;const[a,b]=LS_R[P.r],x=Math.sin(a*S.t+P.ph*D2R),y=P.B*Math.sin(b*S.t);S.tr.push([x,y]);if(S.tr.length>700)S.tr.shift();},
  draw(c,W,H,S,P){c.fillStyle=rgba('ink',0.03);c.fillRect(0,0,W,H);grid(c,W,H,28);const[a,b]=LS_R[P.r],R=Math.min(W*0.32,H*0.36),cx=W*0.42,cy=H*0.5;S.g={cx,cy,R};
    line(c,cx-R-20,cy,cx+R+20,cy,rgba('muted',0.5),1);line(c,cx,cy-R-20,cx,cy+R+20,rgba('muted',0.5),1);
    c.strokeStyle=rgba('green',0.25);c.lineWidth=1.2;c.beginPath();for(let i=0;i<=800;i++){const t=i/800*TAU,x=Math.sin(a*t+P.ph*D2R),y=P.B*Math.sin(b*t);i?c.lineTo(cx+x*R,cy-y*R):c.moveTo(cx+x*R,cy-y*R);}c.stroke();
    c.lineWidth=2.4;for(let i=1;i<S.tr.length;i++){const[x0,y0]=S.tr[i-1],[x1,y1]=S.tr[i];c.strokeStyle=rgba('green',i/S.tr.length);c.beginPath();c.moveTo(cx+x0*R,cy-y0*R);c.lineTo(cx+x1*R,cy-y1*R);c.stroke();}
    const x=Math.sin(a*S.t+P.ph*D2R),y=P.B*Math.sin(b*S.t);disk(c,cx+x*R,cy-y*R,6,C.green);
    line(c,cx+x*R,cy+R+26,cx+x*R,cy-y*R,rgba('accent',0.5),1,[3,3]);line(c,cx+R+26,cy-y*R,cx+x*R,cy-y*R,rgba('warm',0.5),1,[3,3]);
    disk(c,cx+x*R,cy+R+26,5,C.accent);disk(c,cx+R+26,cy-y*R,5,C.warm);txt(c,'x',cx-R-30,cy+R+26,C.accent,{font:MATH});txt(c,'y',cx+R+26,cy-R-30,C.warm,{font:MATH,align:'center'});
    const sx=W*0.82,sw=W*0.15;txt(c,'x(t)',sx,26,C.accent,{font:SMALL});txt(c,'y(t)',sx,H*0.55,C.warm,{font:SMALL});
    [[38,H*0.45,C.accent,t=>Math.sin(a*t+P.ph*D2R)],[H*0.55+12,H*0.95,C.warm,t=>P.B*Math.sin(b*t)]].forEach(([t0,t1,col,f])=>{const mid=(t0+t1)/2,am=(t1-t0)/2*0.85;c.strokeStyle=col;c.lineWidth=1.6;c.beginPath();for(let i=0;i<=120;i++){const tt=S.t-4+4*i/120,yy=mid-f(tt)*am;i?c.lineTo(sx+i/120*sw,yy):c.moveTo(sx,yy);}c.stroke();});
  },
  read(S,P){const[a,b]=LS_R[P.r];return[['ωₓ : ω_y',a+' : '+b],['Fazalar farqi',P.ph+'°'],['Yopiq figura davri',fmt(TAU/0.6,1)+' s'],['Figura turi',a===b?(P.ph%180===0?'to‘g‘ri chiziq':P.ph===90&&P.B===1?'aylana':'ellips'):'Lissaju figurasi']];}
});
