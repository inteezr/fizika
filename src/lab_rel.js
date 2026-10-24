/* ===== Nisbiylik laboratoriyasi (rel) ===== */
/* Birliklar: c = 1, masofa — yorug‘lik soniyasi (yo‘s), vaqt — s. Kuzatuvchi sanoq tizimida u′ = (u − V)/(1 − uV). */
const RL_N=['Yer','Kema 1','Kema 2','Kema 3','Kema 4'],RL_C=['#3ddc84','#5fb4ff','#ff9f43','#e66bff','#ff5a7a'];
function rlO(k,u,o={}){return Object.assign({k,u,x:1+k*1.3,tau:0,L0:2.4},o);}
const RL_PRE={ikki:()=>[rlO(0,0),rlO(1,0.6),rlO(2,0.8)],qoshish:()=>[rlO(0,0),rlO(1,0.6),rlO(2,(0.6+0.6)/(1+0.36))],uch:()=>[rlO(0,0),rlO(1,0.3),rlO(2,0.7),rlO(3,0.95)],qarshi:()=>[rlO(0,0),rlO(1,0.7,{x:1}),rlO(2,-0.7,{x:11})],bosh:()=>[rlO(0,0)]};
const rlG=u=>1/Math.sqrt(Math.max(1e-6,1-u*u)),rlU=(u,V)=>(u-V)/(1-u*V);
SIMS.push({id:'lab_rel',cat:'rel',lab:1,sandbox:1,title:'Nisbiylik laboratoriyasi',short:'kema · soat · sanoq tizimi',
  sub:'Turli tezlikdagi kosmik kemalar qo‘shing va istalgan kemaning sanoq tizimiga o‘ting. Uzunlik qisqarishi, vaqt sekinlashishi va tezliklarni relativistik qo‘shish har bir kuzatuvchi uchun alohida hisoblanadi.',
  formula:`<span><i>u</i>′ = ${fr('<i>u</i> − <i>V</i>','1 − <i>uV</i>/<i>c</i>²')}</span><span class="alt"><i>L</i> = ${fr('<i>L</i>₀','<i>γ</i>')}, &nbsp;∆<i>t</i> = <i>γ</i>∆<i>τ</i>, &nbsp;<i>γ</i> = ${fr('1','√(1 − <i>v</i>²/<i>c</i>²)')}</span>`,
  text:[LABTXT,'Har bir kemada yorug‘lik soati bor: foton ikki ko‘zgu orasida qatnaydi. Harakatlanayotgan soatda foton qiya yo‘l bosadi, yorug‘lik tezligi esa hamma uchun bir xil, shuning uchun bu soat sekin yuradi. Kema uzunligi harakat yo‘nalishida γ marta qisqa ko‘rinadi. Boshqa kemaga o‘tsangiz, endi u tinch turadi, qolganlar esa harakatlanadi — qaysi biri «haqiqatan» harakatlanayotgani yo‘q.'],
  legend:[['u','Yerga nisbatan tezlik (c ulushida)'],['V','kuzatuvchi tezligi'],['u′','kuzatuvchiga nisbatan tezlik'],['γ','Lorens omili'],['τ','kemaning xususiy vaqti'],['L₀','xususiy uzunlik']],
  tries:['«Tezliklarni qo‘shish» tajribasida Kema 1 tizimiga o‘ting: Kema 2 tezligi 0,6c bo‘ladi, Yerdan esa 0,88c — 1,2c emas.','Kema tezligini 0,99c ga yaqinlashtiring: kema deyarli tekis chiziqqa aylanadi, soati deyarli to‘xtaydi.','Qarama-qarshi kemalarda bir kemadan ikkinchisining tezligini o‘lchang: 0,94c, 1,4c emas.'],
  hint:'Kemani bosing yoki sudrang',
  tools:[{id:'move',label:'Tanlash / surish'},{id:'ship',label:'+ Kema'},{id:'del',label:'O‘chirish'},{id:'flash',label:'Yorug‘lik chaqnashi',act:1},{id:'reset',label:'Soatlarni nolga',act:1}],
  hints:{ship:'Bo‘sh yo‘lakni bosing',del:'Kemani bosing',move:'Kemani bosing — xossalari o‘ngda'},
  params:[{id:'pre',label:'Tajriba',choices:[[0,'Ikki kema'],[1,'Tezliklarni qo‘shish'],[2,'Uch tezlik'],[3,'Qarama-qarshi'],[4,'Bo‘sh']],val:0,reset:1},{id:'obs',label:'Kuzatuvchi',choices:RL_N.slice(0,4).map((n,i)=>[i,n]),val:0},{id:'ts',label:'Vaqt tezligi',sym:'',min:0.2,max:2,step:0.1,val:1,unit:'×',d:1}],
  init:P=>{const os=RL_PRE[['ikki','qoshish','uch','qarshi','bosh'][P.pre]]();return{os,t:0,sel:os[os.length-1],fl:[],Wl:14};},
  action(id,S,P){if(id==='reset'){S.t=0;S.os.forEach(o=>o.tau=0);}if(id==='flash'){const o=S.sel||S.os[0];if(o)S.fl.push({x:o.x,t0:S.t,k:o.k});if(S.fl.length>4)S.fl.shift();}},
  step(S,P,dt){dt*=P.ts;S.t+=dt;const ob=S.os.find(o=>o.k===P.obs)||S.os[0],V=ob?ob.u:0;S.V=V;S.ob=ob;
    S.os.forEach(o=>{const u=rlU(o.u,V);o.up=u;if(o!==S.drag)o.x=((o.x+u*dt)%S.Wl+S.Wl)%S.Wl;o.tau+=dt/rlG(u);});S.fl=S.fl.filter(f=>S.t-f.t0<S.Wl);},
  draw(c,W,H,S,P,tt){const n=5,lh=(H-40)/n,sc=W/S.Wl,X=x=>x*sc;S.g={lh,sc};c.fillStyle=GL.dark?'#04060c':rgba('ink',0.03);c.fillRect(0,0,W,H);
    if(GL.dark){c.fillStyle='rgba(255,255,255,0.5)';for(let i=0;i<70;i++){const sx=(i*137.5%W+W-((S.t*(S.V||0)*sc*0.15*(1+i%3))%W))%W,sy=(i*61.3)%H;c.fillRect(sx,sy,1.2,1.2);}}
    for(let i=0;i<n;i++){const y=20+i*lh;line(c,0,y+lh,W,y+lh,rgba('muted',0.2),1,[4,6]);}
    for(let x=0;x<=S.Wl;x++){txt(c,x+'',X(x),H-8,C.muted,{align:'center',font:SMALL});line(c,X(x),H-20,X(x),H-14,C.muted,1);}txt(c,'yo‘s',W-6,H-22,C.muted,{align:'right',font:SMALL});
    /* yorug‘lik chaqnashlari: kuzatuvchi tizimida ikki tomonga c tezlik bilan */
    S.fl.forEach(f=>{const r=(S.t-f.t0);[1,-1].forEach(s=>{let x=((f.x+s*r)%S.Wl+S.Wl)%S.Wl;c.strokeStyle='rgba(255,236,140,0.85)';c.lineWidth=2;c.shadowColor='#ffe98c';c.shadowBlur=10;c.beginPath();c.moveTo(X(x),12);c.lineTo(X(x),H-24);c.stroke();c.shadowBlur=0;});});
    S.os.forEach(o=>{const y0=20+o.k*lh,u=o.up||0,g=rlG(u),col=RL_C[o.k];rrect(c,4,y0+2,Math.min(232,W*0.56),34,6);c.fillStyle=rgba('panel',0.75);c.fill();txt(c,RL_N[o.k]+(o.k===P.obs?' (kuzatuvchi)':''),10,y0+12,col,{font:'600 12px system-ui'});
    S.os.forEach(o=>{const y0=20+o.k*lh,u=o.up||0,g=rlG(u),L=o.L0/g,cy=y0+lh*0.7,col=RL_C[o.k],x0=o.x;
      const drawAt=xx=>{const a=X(xx-L/2),b=X(xx+L/2),hh=Math.min(16,lh*0.2);c.fillStyle=col;c.globalAlpha=0.85;c.beginPath();c.moveTo(a,cy-hh);c.lineTo(b-hh*1.2*Math.sign(u||1),cy-hh);c.lineTo(b+(u>=0?hh*0.6:0),cy);c.lineTo(b-hh*1.2*Math.sign(u||1),cy+hh);c.lineTo(a,cy+hh);c.closePath();if(o.k===0){c.beginPath();rrect(c,a,cy-hh,b-a,hh*2,4);}c.fill();c.globalAlpha=1;
        if(o===S.sel){c.strokeStyle=C.accent;c.lineWidth=2.5;c.stroke();}
        for(let k=0;k<=Math.floor(o.L0*2);k++){const xx2=a+(b-a)*k/(o.L0*2);line(c,xx2,cy+hh,xx2,cy+hh+5,C.ink,1);}
        /* yorug‘lik soati */const ch=lh*0.36,mx=X(xx),T0=1,ph=(o.tau/T0)%1,fy=ph<0.5?ph*2:2-ph*2;line(c,mx-12,cy-hh-4,mx+12,cy-hh-4,'#c8d0e0',2);line(c,mx-12,cy-hh-4-ch,mx+12,cy-hh-4-ch,'#c8d0e0',2);
        c.strokeStyle='rgba(255,236,140,0.45)';c.lineWidth=1.3;c.beginPath();for(let j=0;j<=40;j++){const tj=o.tau-j*0.025,pj=((tj/T0)%1+1)%1,fj=pj<0.5?pj*2:2-pj*2,xj=mx-u*j*0.025*g*sc;j?c.lineTo(xj,cy-hh-4-fj*ch):c.moveTo(xj,cy-hh-4-fj*ch);}c.stroke();
        disk(c,mx,cy-hh-4-fy*ch,4,'#ffe98c');};
      drawAt(x0);if(x0+L/2>S.Wl)drawAt(x0-S.Wl);if(x0-L/2<0)drawAt(x0+S.Wl);
      });txt(c,"u′ = "+fmt(u,3)+'c   γ = '+fmt(g,2)+'   τ = '+fmt(o.tau,1)+' s',10,y0+27,C.ink,{font:W<500?'10px "IBM Plex Mono", monospace':SMALL});});
    txt(c,'Kuzatuvchi vaqti t = '+fmt(S.t,1)+' s',W-8,14,C.ink,{align:'right',font:SMALL});},
  pointer(type,x,y,S,P){if(!S.g)return false;const{lh,sc}=S.g,k=Math.floor((y-20)/lh),mx=x/sc,o=S.os.find(q=>q.k===k);
    if(type==='down'){if(S.mode==='move'){S.sel=o||null;if(o){S.drag=o;S.dx=mx-o.x;}return !!o;}
      if(S.mode==='ship'){if(k>0&&k<5&&!o){const s=rlO(k,0.5,{x:mx});S.os.push(s);S.sel=s;return true;}return false;}
      if(S.mode==='del'){if(o&&o.k>0){S.os.splice(S.os.indexOf(o),1);S.sel=null;return true;}return false;}return false;}
    if(type==='move'&&S.drag){S.drag.x=((mx-S.dx)%S.Wl+S.Wl)%S.Wl;return true;}if(type==='up')S.drag=null;return false;},
  inspect(S,P){const o=S.sel;if(!o||!S.os.includes(o))return null;return{title:RL_N[o.k],note:o.k?'Tezlik Yerga nisbatan beriladi.':'Yer stansiyasi Yer tizimida tinch turadi.',props:o.k?[{label:'Yerga nisbatan tezlik',sym:'u',min:-0.99,max:0.99,step:0.01,unit:'c',d:2,get:()=>o.u,set:v=>o.u=v},{label:'Xususiy uzunlik',sym:'L₀',min:0.5,max:4,step:0.1,unit:'yo‘s',d:1,get:()=>o.L0,set:v=>o.L0=v}]:[{label:'Xususiy uzunlik',sym:'L₀',min:0.5,max:4,step:0.1,unit:'yo‘s',d:1,get:()=>o.L0,set:v=>o.L0=v}],del:o.k?()=>S.os.splice(S.os.indexOf(o),1):null};},
  inspectHint:'Kemani bosing.',
  read(S,P){const ob=S.ob,r=[['Kuzatuvchi',ob?RL_N[ob.k]:'Yer'],['Kuzatuvchi tezligi V (Yerga nisbatan)',fmt(S.V||0,3)+'c']];const o=S.sel;
    if(o&&S.os.includes(o)){const u=o.up||0,g=rlG(u);r.push([RL_N[o.k]+': Yerga nisbatan u',fmt(o.u,3)+'c'],['Kuzatuvchiga nisbatan u′',fmt(u,3)+'c'],['Klassik ayirma u − V',fmt(o.u-(S.V||0),3)+'c'],['Lorens omili γ',fmt(g,3)],['Ko‘rinadigan uzunlik L₀/γ',fmt(o.L0/g,2)+' yo‘s'],['Soat yurishi dτ/dt',fmt(1/g,3)]);}
    else r.push(['Kemani tanlang','—']);return r;}
});
