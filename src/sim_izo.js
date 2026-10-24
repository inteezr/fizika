/* Izojarayonlar */
const IZO={1:'Izotermik (T = const)',2:'Izobarik (p = const)',3:'Izoxorik (V = const)'};
function izoState(P){const nR=100*10/300;let V,p,T;if(P.pr===1){T=300;V=P.X;p=nR*T/V;}else if(P.pr===2){p=100;T=P.X*30;V=nR*T/p;}else{V=10;T=P.X*30;p=nR*T/V;}return{p,V,T,nR};}
SIMS.push({id:'izo',cat:'mol',title:'Gaz qonunlari: izojarayonlar',short:'pV/T = const',
  sub:'Ideal gazning bosimi, hajmi va harorati Klapeyron–Mendeleyev tenglamasi bilan bog‘langan. Bitta kattalik o‘zgarmas saqlansa, qolgan ikkitasi oddiy qonun bo‘yicha o‘zgaradi.',
  formula:`<span><i>pV</i> = <i>νRT</i></span><span class="alt"><i>pV</i> = const &nbsp; ${fr('<i>V</i>','<i>T</i>')} = const &nbsp; ${fr('<i>p</i>','<i>T</i>')} = const</span>`,
  text:['Izotermik jarayonda (Boyl–Mariott) gaz siqilsa, molekulalar devorlarga tez-tez uriladi va bosim hajmga teskari proporsional ortadi. Izobarik jarayonda (Gey-Lyussak) qizdirilgan gaz porshenni itarib kengayadi.','Izoxorik jarayonda (Sharl) hajm qotirilgan: qizdirilganda molekulalar tezlashadi va bosim haroratga proporsional ortadi. p–V diagrammada har bir jarayon o‘z egri chizig‘iga ega.'],
  legend:[['p','bosim, kPa'],['V','hajm, L'],['T','mutlaq harorat, K'],['ν','modda miqdori'],['R','8,31 J/(mol·K)']],
  tries:['Izotermik jarayonda hajmni 2 marta kamaytiring: bosim 2 marta ortadi.','Izobarik jarayonda haroratni 600 K ga yetkazing: hajm ikki baravar ortadi.','Izoxorik jarayonda p/T nisbati o‘zgarmasligini tekshiring.'],
  params:[{id:'pr',label:'Jarayon',choices:[[1,'Izotermik'],[2,'Izobarik'],[3,'Izoxorik']],val:1,reset:1},{id:'X',label:'Boshqaruvchi kattalik (V yoki T)',sym:'',min:5,max:25,step:0.1,val:10,unit:'',d:1,show:v=>fmt(v,1)+' L  /  '+fmt(v*30,0)+' K'}],
  init:()=>({ps:Array.from({length:60},()=>({x:Math.random(),y:Math.random(),a:Math.random()*TAU})),path:[]}),
  step(S,P,dt){const st=izoState(P),sp=Math.sqrt(st.T/300)*0.6;S.ps.forEach(p=>{p.x+=Math.cos(p.a)*sp*dt;p.y+=Math.sin(p.a)*sp*dt;if(p.x<0||p.x>1){p.a=Math.PI-p.a;p.x=clamp(p.x,0,1);}if(p.y<0||p.y>1){p.a=-p.a;p.y=clamp(p.y,0,1);}});const l=S.path[S.path.length-1];if(!l||Math.abs(l[0]-st.V)>0.05||Math.abs(l[1]-st.p)>0.5){S.path.push([st.V,st.p]);if(S.path.length>300)S.path.shift();}},
  draw(c,W,H,S,P){grid(c,W,H,28);const st=izoState(P),cx=W*0.06,cw=Math.min(W*0.3,200),cb=H*0.88,hs=(H*0.7)/26,ch=st.V*hs,ctop=cb-ch;S.g={cx,cw,cb,ctop,hs};
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(cx,cb-26*hs-10);c.lineTo(cx,cb);c.lineTo(cx+cw,cb);c.lineTo(cx+cw,cb-26*hs-10);c.stroke();const heat=(st.T-150)/600;c.fillStyle=`rgba(${Math.round(80+heat*175)},${Math.round(140-heat*60)},${Math.round(230-heat*180)},0.18)`;c.fillRect(cx+2,ctop,cw-4,ch-2);
    c.fillStyle=C.ink;c.fillRect(cx+2,ctop-12,cw-4,12);c.fillRect(cx+cw/2-5,ctop-60,10,48);S.ps.forEach(p=>disk(c,cx+6+p.x*(cw-12),ctop+4+p.y*(ch-10),3.2,C.accent));
    if(P.pr===3){c.fillStyle=C.red;c.fillRect(cx-6,ctop-20,cw+12,6);}
    const gx=W*0.48,gr=W-20,gt=H*0.12,gb=H*0.86,X=v=>gx+(v-0)/26*(gr-gx),Y=p=>gb-p/220*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'p, kPa',gx+6,gt-8,C.muted);txt(c,'V, L',gr,gb+14,C.muted,{align:'right'});
    [100,200].forEach(p=>txt(c,p+'',gx-6,Y(p),C.muted,{align:'right',font:SMALL}));[10,20].forEach(v=>txt(c,v+'',X(v),gb+14,C.muted,{align:'center',font:SMALL}));
    c.strokeStyle=rgba('muted',0.4);c.lineWidth=1;[200,300,450,600].forEach(T=>{c.beginPath();for(let v=3;v<=26;v+=0.5){const p=st.nR*T/v;if(p<=220)c.lineTo(X(v),Y(p));}c.stroke();});
    c.strokeStyle=C.warm;c.lineWidth=2.5;c.beginPath();if(P.pr===1){for(let v=5;v<=25;v+=0.25)c.lineTo(X(v),Y(st.nR*300/v));}else if(P.pr===2){c.moveTo(X(st.nR*150/100),Y(100));c.lineTo(X(st.nR*750/100),Y(100));}else{c.moveTo(X(10),Y(st.nR*150/10));c.lineTo(X(10),Y(Math.min(220,st.nR*750/10)));}c.stroke();
    disk(c,X(st.V),Y(st.p),6,C.red);txt(c,IZO[P.pr],gx+10,gt+6,C.warm);
  },
  read:(S,P)=>{const s=izoState(P);return[['Bosim p',fmt(s.p,1)+' kPa'],['Hajm V',fmt(s.V,2)+' L'],['Harorat T',fmt(s.T,0)+' K'],['pV/T',fmt(s.p*s.V/s.T,3)]];}
});
