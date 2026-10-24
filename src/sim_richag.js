/* Richag — kuch momenti */
function rInit(){return{th:0,w:0,ws:[{p:-0.6,m:2},{p:0.4,m:3}],sel:null,drag:null,g:{cx:400,cy:300,sc:300}};}
SIMS.push({id:'richag',cat:'sta',title:'Richag va kuch momenti',short:'F₁l₁ = F₂l₂',sandbox:1,
  sub:'Richag muvozanatda bo‘lishi uchun uni soat strelkasi bo‘yicha va unga qarshi aylantiruvchi momentlar teng bo‘lishi kerak.',
  formula:`<span><i>F</i><sub>1</sub><i>l</i><sub>1</sub> = <i>F</i><sub>2</sub><i>l</i><sub>2</sub></span><span class="alt"><i>M</i> = <i>Fl</i> &nbsp; Σ<i>M</i> = 0</span>`,
  text:['Kuch momenti — kuchning yelkasiga (tayanchdan kuch qo‘yilgan nuqtagacha masofa) ko‘paytmasi. Kichik kuch uzun yelkada katta kuchni qisqa yelkada muvozanatlay oladi: «Menga tayanch nuqtasini bering, Yerni ko‘taraman» (Arximed).','Richagga istagancha yuk osing: «+ Yuk» ni tanlab, richag ustini bosing. Yuklarni sudrab yelkasini o‘zgartiring, bosib massasini sozlang. Chap va o‘ng tomondagi momentlar teng bo‘lganda richag gorizontal holatda turadi.'],
  legend:[['F','yukning og‘irlik kuchi, F = mg'],['l','yelka — tayanchdan yukgacha masofa, m'],['M','kuch momenti, N·m']],
  tries:['Chapga 0,6 m da 2 kg, o‘ngga 0,4 m da 3 kg — muvozanat (2·0,6 = 3·0,4).','Bitta og‘ir yukni kichik yuk bilan muvozanatlang: yelkalar massalarga teskari proporsional bo‘ladi.','Bir tomonga ikki yuk osing: ularning momentlari qo‘shiladi.'],
  tools:[{id:'move',label:'Surish / tanlash'},{id:'add',label:'+ Yuk'},{id:'del',label:'O‘chirish'},{id:'clear',label:'Tozalash',act:1}],
  hints:{move:'Yukni richag bo‘ylab suring',add:'Richag ustini bosing',del:'Yukni bosing'},
  params:[],
  init:rInit,
  action(id,S){if(id==='clear'){S.ws=[];S.sel=null;}},
  step(S,P,dt){let tau=0,I=0.4;S.ws.forEach(o=>{tau+=o.m*9.8*o.p*Math.cos(S.th);I+=o.m*o.p*o.p;});S.w+=(tau/I-3*S.w)*dt;S.th+=S.w*dt;const lim=0.28;if(S.th>lim){S.th=lim;S.w=0;}if(S.th<-lim){S.th=-lim;S.w=0;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const cx=W/2,cy=H*0.5,sc=Math.min(W*0.42,H*1.2)/1.2;S.g={cx,cy,sc};const ct=Math.cos(S.th),st=Math.sin(S.th),B=p=>[cx+p*sc*ct,cy+p*sc*st];
    c.fillStyle=C.muted;c.beginPath();c.moveTo(cx,cy+6);c.lineTo(cx-26,cy+60);c.lineTo(cx+26,cy+60);c.closePath();c.fill();line(c,cx-60,cy+60,cx+60,cy+60,C.ink,2);
    c.save();c.translate(cx,cy);c.rotate(S.th);c.fillStyle=C.warm;rrect(c,-1.2*sc,-6,2.4*sc,12,4);c.fill();for(let p=-1.2;p<=1.201;p+=0.2){line(c,p*sc,-6,p*sc,6,rgba('ink',0.5),1);}c.restore();
    for(let p=-1.2;p<=1.201;p+=0.4){const[x,y]=B(p);txt(c,fmt(Math.abs(p),1),x,y-16,C.muted,{align:'center',font:SMALL});}
    disk(c,cx,cy,5,C.ink);
    S.ws.forEach(o=>{const[x,y]=B(o.p),s=16+o.m*3;line(c,x,y,x,y+24,C.ink,1.5);c.fillStyle=C.accent;rrect(c,x-s/2,y+24,s,s,3);c.fill();txt(c,fmt(o.m,1).replace(',0','')+' kg',x,y+24+s/2,C.onaccent,{align:'center',font:SMALL});
      o.bx=x;o.by=y+24+s/2;o.bs=s;arrow(c,x,y+24+s,x,y+24+s+o.m*6,C.red,2);if(o===S.sel)selRing(c,x,y+24+s/2,s*0.8);});
    let Ml=0,Mr=0;S.ws.forEach(o=>{if(o.p<0)Ml+=o.m*9.8*-o.p;else Mr+=o.m*9.8*o.p;});
    txt(c,'M chap = '+fmt(Ml,1)+' N·m',16,22,C.ink);txt(c,'M o‘ng = '+fmt(Mr,1)+' N·m',W-16,22,C.ink,{align:'right'});
    txt(c,Math.abs(Ml-Mr)<0.05?'Muvozanat':Ml>Mr?'Chap tomon og‘ir':'O‘ng tomon og‘ir',W/2,22,Math.abs(Ml-Mr)<0.05?C.green:C.red,{align:'center',font:'600 15px "IBM Plex Sans", sans-serif'});
  },
  pointer(type,x,y,S,P,api){const g=S.g,hit=()=>S.ws.find(o=>Math.abs(x-o.bx)<o.bs/2+6&&Math.abs(y-o.by)<o.bs/2+30),pAt=()=>Math.round(clamp((x-g.cx)/(g.sc*Math.cos(S.th)),-1.2,1.2)/0.05)*0.05;
    if(type==='down'){const md=S.mode;if(md==='move'){const o=hit();S.sel=o||null;if(o){S.drag=o;return true;}return false;}
      if(md==='add'){if(Math.abs(y-(g.cy+(x-g.cx)*Math.tan(S.th)))>60)return false;const o={p:pAt(),m:1};S.ws.push(o);S.sel=o;return true;}
      if(md==='del'){const o=hit();if(o){S.ws.splice(S.ws.indexOf(o),1);S.sel=null;return true;}}return false;}
    if(type==='move'&&S.drag){S.drag.p=pAt();api.refresh();return true;}if(type==='up')S.drag=null;return false;},
  inspect(S){const o=S.sel;if(!o||!S.ws.includes(o))return null;return{title:'Yuk',props:[{label:'Massa',sym:'m',min:0.5,max:10,step:0.5,unit:'kg',d:1,get:()=>o.m,set:v=>o.m=v},{label:'Yelka (manfiy — chapda)',sym:'l',min:-1.2,max:1.2,step:0.05,unit:'m',d:2,get:()=>o.p,set:v=>o.p=v}],del:()=>S.ws.splice(S.ws.indexOf(o),1)};},
  inspectHint:'Yukni bosing — massasi va yelkasini aniq sozlaysiz.',
  read:(S,P)=>{let Ml=0,Mr=0;S.ws.forEach(o=>{if(o.p<0)Ml+=o.m*9.8*-o.p;else Mr+=o.m*9.8*o.p;});return[['Chap moment',fmt(Ml,2)+' N·m'],['O‘ng moment',fmt(Mr,2)+' N·m'],['Farq',fmt(Mr-Ml,2)+' N·m'],['Yuklar soni',String(S.ws.length)]];}
});
