/* Nyutonning ikkinchi qonuni — kuchlar qo‘shiladigan */
function nyInit(){return{x:6,v:0,a:0,fr:0,N:0,Fx:0,forces:[{F:30,ang:0},{F:12,ang:140}],sel:null,drag:null};}
SIMS.push({id:'nyuton',cat:'din',title:'Nyutonning ikkinchi qonuni',short:'ma = ΣF',sandbox:1,
  sub:'Jismga bir nechta kuch ta’sir qilsa, tezlanishni ularning vektor yig‘indisi — natijaviy kuch beradi.',
  formula:`<span><i>m</i><b>a</b> = Σ<b>F</b></span><span class="alt"><i>a</i> = ${fr('Σ<i>F</i><sub>x</sub> − <i>F</i><sub>ishq</sub>','<i>m</i>')} &nbsp; <i>F</i><sub>ishq</sub> = <i>μN</i></span>`,
  text:['Jismga istagancha kuch qo‘yishingiz mumkin: «+ Kuch» tugmasini bosing, so‘ng strelka uchidagi doirachani sudrab kuchning kattaligi va yo‘nalishini o‘zgartiring. Jismni ham sudrab boshqa joyga qo‘yish mumkin.','Jism faqat gorizontal harakatlanadi, shuning uchun tezlanishni kuchlarning gorizontal tashkil etuvchilari yig‘indisi beradi. Yuqoriga yo‘nalgan kuch tayanch reaksiyasi N ni kamaytiradi, shuning uchun ishqalanish ham kamayadi. Yashil strelka natijaviy kuchni ko‘rsatadi.'],
  legend:[['F₁, F₂…','qo‘yilgan kuchlar, N (to‘q sariq)'],['mg','og‘irlik kuchi (qizil)'],['N','tayanch reaksiya kuchi (yashil)'],['μ','ishqalanish koeffitsienti'],['a','tezlanish, m/s²']],
  tries:['Ikki kuchni teng va qarama-qarshi qiling: jism tezlanishsiz harakatlanadi yoki tinch turadi (Nyutonning birinchi qonuni).','Kuchni 45° yuqoriga burang: gorizontal tashkil etuvchi kamayadi, lekin ishqalanish ham kamayadi.','Massani 2 marta oshiring: bir xil kuchda tezlanish 2 marta kamayadi.'],
  tools:[{id:'move',label:'Surish / tanlash'},{id:'addF',label:'+ Kuch',act:1},{id:'clearF',label:'Kuchlarni o‘chirish',act:1}],
  hints:{move:'Strelka uchini yoki jismni sudrang'},
  params:[{id:'m',label:'Massa',sym:'m',min:1,max:20,step:0.5,val:5,unit:'kg',d:1},{id:'mu',label:'Ishqalanish koeffitsienti',sym:'μ',min:0,max:0.6,step:0.01,val:0.1,unit:'',d:2}],
  init:nyInit,
  action(id,S){if(id==='addF'){const f={F:15,ang:Math.round(Math.random()*300-150)};S.forces.push(f);S.sel=f;}if(id==='clearF'){S.forces=[];S.sel=null;}},
  step(S,P,dt){const g=9.8;let Fx=0,Fy=0;S.forces.forEach(f=>{Fx+=f.F*Math.cos(f.ang*D2R);Fy+=f.F*Math.sin(f.ang*D2R);});S.Fx=Fx;S.N=Math.max(0,P.m*g-Fy);const fm=P.mu*S.N;
    if(S.drag==='block'){S.v=0;S.a=0;S.fr=0;return;}
    if(Math.abs(S.v)<1e-6&&Math.abs(Fx)<=fm){S.v=0;S.a=0;S.fr=-Fx;}
    else{const dir=Math.abs(S.v)>1e-6?Math.sign(S.v):Math.sign(Fx);S.fr=-dir*fm;S.a=(Fx+S.fr)/P.m;const nv=S.v+S.a*dt;if(Math.abs(S.v)>1e-6&&Math.sign(nv)!==Math.sign(S.v)&&Math.abs(Fx)<=fm)S.v=0;else S.v=clamp(nv,-40,40);}
    S.x+=S.v*dt;if(S.x>30)S.x-=30;if(S.x<0)S.x+=30;},
  draw(c,W,H,S,P){grid(c,W,H,28);const gy=H*0.7,x0=46,sc=(W-92)/30;S.x0=x0;S.sc=sc;
    c.fillStyle=rgba('muted',0.1);c.fillRect(0,gy,W,H-gy);line(c,0,gy,W,gy,C.ink,2);
    for(let m=0;m<=30;m+=5){const x=x0+m*sc;line(c,x,gy,x,gy+8,C.muted,1);txt(c,m+' m',x,gy+20,C.muted,{align:'center'});}
    const s=34+P.m*2.4,bx=x0+S.x*sc,by=gy-s/2;S.bx=bx;S.by=by;S.s=s;
    const mg=P.m*9.8,Fm=Math.max(mg,...S.forces.map(f=>f.F),20),k=Math.min(2.6,(H*0.42)/Fm);S.k=k;
    c.fillStyle=C.accent;rrect(c,bx-s/2,gy-s,s,s,5);c.fill();
    txt(c,fmt(P.m,1).replace(',0','')+' kg',bx,by,C.onaccent,{align:'center'});
    arrow(c,bx,by,bx,by+mg*k,rgba('red',0.85),2);txt(c,'mg',bx+8,by+mg*k-4,C.red,{font:MATH});
    if(S.N>0.1){arrow(c,bx+s*0.3,gy,bx+s*0.3,gy-S.N*k,rgba('green',0.8),2);txt(c,'N',bx+s*0.3+10,gy-S.N*k+6,C.green,{font:MATH});}
    if(Math.abs(S.fr)>0.05){arrow(c,bx,gy-3,bx+S.fr*k,gy-3,C.red,3);txt(c,'F ishq',bx+S.fr*k+(S.fr<0?-6:6),gy-16,C.red,{align:S.fr<0?'right':'left'});}
    S.forces.forEach((f,i)=>{const tx=bx+Math.cos(f.ang*D2R)*f.F*k,ty=by-Math.sin(f.ang*D2R)*f.F*k,col=f===S.sel?C.accent:C.warm;arrow(c,bx,by,tx,ty,col,3);disk(c,tx,ty,6,C.canvas,col);
      txt(c,'F'+subn(i+1),tx+Math.cos(f.ang*D2R)*16,ty-Math.sin(f.ang*D2R)*16,col,{font:MATH,align:'center'});});
    const net=S.Fx+S.fr;if(Math.abs(net)>0.05){const yy=gy-s-30;arrow(c,bx,yy,bx+clamp(net*k,-W*0.4,W*0.4),yy,C.green,3);txt(c,'F nat = '+fmt(net,1)+' N',bx,yy-16,C.green,{align:'center'});}
    if(S.v===0&&S.forces.length&&Math.abs(S.Fx)>0.01&&Math.abs(S.Fx)<=P.mu*S.N)txt(c,'|ΣFₓ| ≤ μN — ishqalanish kuchni muvozanatlaydi',16,22,C.red);
    if(P.m*9.8-S.forces.reduce((a,f)=>a+f.F*Math.sin(f.ang*D2R),0)<0)txt(c,'Yuqoriga kuch mg dan katta — jism yerdan uzilardi',16,42,C.red);
  },
  pointer(type,x,y,S,P,api){
    if(type==='down'){for(const f of [...S.forces].reverse()){const tx=S.bx+Math.cos(f.ang*D2R)*f.F*S.k,ty=S.by-Math.sin(f.ang*D2R)*f.F*S.k;if(Math.hypot(tx-x,ty-y)<16){S.drag=f;S.sel=f;return true;}}
      if(Math.abs(x-S.bx)<S.s/2+6&&Math.abs(y-S.by)<S.s/2+6){S.drag='block';S.dx=x-S.bx;S.sel=null;return true;}S.sel=null;return false;}
    if(type==='move'&&S.drag){if(S.drag==='block'){S.x=clamp((x-S.dx-S.x0)/S.sc,0,30);}else{const f=S.drag,dx=x-S.bx,dy=S.by-y;f.F=Math.round(clamp(Math.hypot(dx,dy)/S.k,0,100));f.ang=Math.round(Math.atan2(dy,dx)/D2R);api.refresh();}return true;}
    if(type==='up')S.drag=null;return false;},
  inspect(S){const f=S.sel;if(!f||!S.forces.includes(f))return null;return{title:'Kuch F'+subn(S.forces.indexOf(f)+1),props:forceProps(f),del:()=>S.forces.splice(S.forces.indexOf(f),1)};},
  inspectHint:'Kuch strelkasining uchini bosing — kattaligi va yo‘nalishini shu yerda aniq sozlaysiz.',
  read:(S,P)=>[['ΣFₓ (gorizontal)',fmt(S.Fx,1)+' N'],['Tayanch reaksiyasi N',fmt(S.N,1)+' N'],['Ishqalanish kuchi',fmt(Math.abs(S.fr),1)+' N'],['Tezlanish a',fmt(S.a)+' m/s²'],['Tezlik v',fmt(S.v)+' m/s']]
});
