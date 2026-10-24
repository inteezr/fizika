/* Arximed qonuni — jismlar qo‘shiladigan */
const RHO=[[600,'Qarag‘ay'],[300,'Po‘kak'],[900,'Muz'],[2700,'Alyuminiy'],[1100,'Plastmassa'],[7800,'Po‘lat']];
const rhoName=r=>{const m=RHO.find(x=>x[0]===r);return m?m[1]:fmt(r,0)+' kg/m³';};
function arInit(){const o={fx:0.5,y:-0.8,v:0,ro:600,V:8};return{objs:[o],sel:o,drag:null,n:0,g:{tl:80,tr:500,sy:200,tb:480}};}
SIMS.push({id:'arximed',cat:'sta',title:'Arximed qonuni',short:'Fₐ = ρgV',sandbox:1,
  sub:'Suyuqlikka botirilgan jismga u siqib chiqargan suyuqlik og‘irligiga teng itaruvchi kuch ta’sir qiladi.',
  formula:`<span><i>F</i><sub>A</sub> = <i>ρ</i><sub>s</sub><i>gV</i><sub>b</sub></span><span class="alt">suzish sharti: <i>ρ</i><sub>j</sub> &lt; <i>ρ</i><sub>s</sub></span>`,
  text:['Suyuqlik bosimi chuqurlik ortgani sari ortadi, shuning uchun jismning pastki yuziga yuqoridagidan kattaroq bosim ta’sir qiladi. Bu farq yuqoriga itaruvchi Arximed kuchini (yashil) hosil qiladi.','«+ Jism» bilan turli moddalardan (yog‘och, po‘kak, muz, alyuminiy, po‘lat…) jismlar qo‘shing, ularni sudrab suvga tashlang. Zichligi suyuqlikdan kichik jismlar suzadi, kattalari cho‘kadi.'],
  legend:[['F_A','Arximed kuchi, N'],['ρ_s','suyuqlik zichligi, kg/m³'],['ρ_j','jism zichligi, kg/m³'],['V_b','jismning botgan qismi hajmi, m³'],['g','9,8 m/s²']],
  tries:['Muz bo‘lagini qo‘shing: uning taxminan 90 % qismi suv ostida qoladi (aysberg).','Suyuqlik zichligini 1300 ga ko‘taring: qaysi jismlar endi suzadi?','Jismni tanlab, hajmini o‘zgartiring: botish ulushi o‘zgarmaydi, faqat kuchlar o‘zgaradi.'],
  tools:[{id:'move',label:'Surish / tanlash'},{id:'add',label:'+ Jism',act:1},{id:'del',label:'O‘chirish'}],
  hints:{move:'Jismni sudrab suvga tashlang',del:'Jismni bosing'},
  params:[{id:'rf',label:'Suyuqlik zichligi',sym:'ρ_s',min:700,max:1500,step:10,val:1000,unit:'kg/m³',d:0}],
  init:arInit,
  action(id,S){if(id==='add'){S.n++;const r=RHO[S.n%RHO.length][0],o={fx:0.12+Math.random()*0.76,y:-1.4,v:0,ro:r,V:4+Math.round(Math.random()*10)};S.objs.push(o);S.sel=o;}},
  step(S,P,dt){const n=4,h=dt/n;S.objs.forEach(o=>{if(o===S.drag)return;for(let i=0;i<n;i++){const f=clamp(o.y,0,1),a=7*(1-P.rf/o.ro*f)-(f>0?2.4:0.1)*o.v;o.v+=a*h;o.y+=o.v*h;const fl=o.floor||2.2;if(o.y>fl){o.y=fl;o.v=0;}}});},
  draw(c,W,H,S,P){grid(c,W,H,28);const tl=W*0.08,tr=W*0.64,tt=H*0.1,tb=H-22,sy=H*0.38;S.g={tl,tr,sy,tb};
    c.fillStyle=rgba('water',0.06);c.fillRect(tl,sy,tr-tl,tb-sy);
    S.objs.forEach(o=>{const side=40+o.V*2.6,cx=tl+o.fx*(tr-tl),top=sy+(o.y-1)*side;o.floor=(tb-2-sy)/side;o.side=side;o.cx=cx;o.top=top;
      c.fillStyle=o.ro<P.rf?C.warm:o.ro>3000?C.muted:C.violet;rrect(c,cx-side/2,top,side,side,3);c.fill();txt(c,fmt(o.ro,0),cx,top+side/2,C.onaccent,{align:'center',font:SMALL});});
    c.fillStyle=rgba('water',0.36);c.fillRect(tl,sy,tr-tl,tb-sy);line(c,tl,sy,tr,sy,C.water,2);
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(tl,tt);c.lineTo(tl,tb);c.lineTo(tr,tb);c.lineTo(tr,tt);c.stroke();
    const o=S.sel&&S.objs.includes(S.sel)?S.sel:null;
    if(o){selRing(c,o.cx,o.top+o.side/2,o.side*0.75);const f=clamp(o.y,0,1),Vm=o.V/1000,mg=o.ro*Vm*9.8,FA=P.rf*9.8*Vm*f,Fm=Math.max(mg,P.rf*9.8*Vm),k=(H*0.28)/Fm,my=o.top+o.side/2;
      arrow(c,o.cx-8,my,o.cx-8,my+mg*k,C.red,3,'mg');if(FA>0.01)arrow(c,o.cx+8,my,o.cx+8,my-FA*k,C.green,3,'Fₐ');
      const px=tr+22;txt(c,rhoName(o.ro),px,H*0.16,C.ink,{font:'600 14px "IBM Plex Sans", sans-serif'});
      const st=o.ro<P.rf?'suzadi':o.ro===P.rf?'muallaq':'cho‘kadi';txt(c,st,px,H*0.16+22,o.ro<P.rf?C.green:o.ro===P.rf?C.accent:C.red,{font:'600 15px "IBM Plex Sans", sans-serif'});
      txt(c,'Botgan qism:',px,H*0.16+50,C.muted);txt(c,fmt(f*100,0)+' %',px,H*0.16+70,C.ink,{font:'600 15px "IBM Plex Mono", monospace'});
      const bh=H*0.36,bt=H*0.16+88;c.strokeStyle=C.line;c.lineWidth=1;c.strokeRect(px,bt,22,bh);c.fillStyle=rgba('water',0.6);c.fillRect(px,bt+bh*(1-f),22,bh*f);}
  },
  pointer(type,x,y,S,P,api){const hit=()=>[...S.objs].reverse().find(o=>Math.abs(x-o.cx)<o.side/2+4&&y>o.top-4&&y<o.top+o.side+4);
    if(type==='down'){if(S.mode==='del'){const o=hit();if(o){S.objs.splice(S.objs.indexOf(o),1);S.sel=null;return true;}return false;}const o=hit();S.sel=o||null;if(o){S.drag=o;o.v=0;return true;}return false;}
    if(type==='move'&&S.drag){const o=S.drag,g=S.g;o.fx=clamp((x-g.tl)/(g.tr-g.tl),0.08,0.92);o.y=clamp((y-o.side/2-g.sy)/o.side+1,-2,o.floor||2.2);o.v=0;return true;}
    if(type==='up')S.drag=null;return false;},
  inspect(S){const o=S.sel;if(!o||!S.objs.includes(o))return null;return{title:'Jism: '+rhoName(o.ro),props:[{label:'Zichligi',sym:'ρ_j',min:100,max:8000,step:50,unit:'kg/m³',d:0,get:()=>o.ro,set:v=>o.ro=v},{label:'Hajmi',sym:'V',min:1,max:20,step:1,unit:'L',d:0,get:()=>o.V,set:v=>o.V=v}],del:()=>S.objs.splice(S.objs.indexOf(o),1)};},
  inspectHint:'Jismni bosing — zichligi va hajmini o‘zgartirasiz.',
  read:(S,P)=>{const o=S.sel&&S.objs.includes(S.sel)?S.sel:S.objs[0];if(!o)return[['Jismlar','yo‘q — «+ Jism» ni bosing']];const f=clamp(o.y,0,1),Vm=o.V/1000;
    return[['Og‘irlik kuchi mg',fmt(o.ro*Vm*9.8,1)+' N'],['Arximed kuchi Fₐ',fmt(P.rf*9.8*Vm*f,1)+' N'],['To‘liq botganda Fₐ',fmt(P.rf*9.8*Vm,1)+' N'],['Muvozanatda botish',o.ro<P.rf?fmt(o.ro/P.rf*100,0)+' %':'100 % (cho‘kadi)']];}
});
