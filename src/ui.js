/* ================= INTERFEYS ================= */
const $=id=>document.getElementById(id);
const cv=$('cv'),ctx=cv.getContext('2d'),wrap=$('cwrap');
let W=800,H=500,dpr=1,cur=null,S=null,P={},playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,speed=1,simTime=0,frame=0,roEls=[],curMode='move',inspObj=null,lastSel;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('count').innerHTML=[[SIMS.filter(s=>!s.lab).length,'mavzu'],[SIMS.filter(s=>s.lab).length,'laboratoriya'],[Object.keys(SC3).length,'3D model','c3'],[CATS.length,'bo‘lim']].map(([n,l,c])=>`<div class="chip ${c||''}"><b data-n="${n}">${RM?n:0}</b><span>${l}</span></div>`).join('');
if(!RM){const t0=performance.now();const cnt=now=>{const k=Math.min(1,(now-t0)/1200),e=1-Math.pow(1-k,3);document.querySelectorAll('.chip b').forEach(b=>b.textContent=Math.round(b.dataset.n*e));if(k<1)requestAnimationFrame(cnt);};requestAnimationFrame(cnt);}

const nav=$('nav'),btns={};
CATS.forEach(([cid,cname])=>{const box=document.createElement('div');box.className='cat';box.dataset.cat=cid;box.innerHTML=`<h3>${cname}</h3>`;
  SIMS.filter(s=>s.cat===cid).forEach(s=>{const b=document.createElement('button');b.type='button';b.className='tbtn';if(s.lab)b.classList.add('labbtn');b.innerHTML=`<b>${s.lab?'🔬 ':''}${s.title}${s.sandbox&&!s.lab?' <em class="sb" title="Obyekt qo‘shish mumkin">✚</em>':''}</b><small>${s.short}</small>`;b.onclick=()=>select(s.id,true);btns[s.id]=b;box.appendChild(b);});nav.appendChild(box);});
$('search').addEventListener('input',()=>filterNav());

const api={set(id,v){P[id]=v;const inp=$('p-'+id);if(inp)inp.value=v;showOut(id);},inspect(){renderInsp();},refresh(){refreshInsp();}};
function showOut(id){const p=cur.params.find(x=>x.id===id),o=$('o-'+id);if(!o||!p||p.choices)return;const v=P[id];o.textContent=p.show?p.show(v):fmt(v,p.d??(p.step<1?(p.step<0.1?2:1):0))+(p.unit?' '+p.unit:'');}
function reset(){S=cur.init(P);S.mode=curMode;renderInsp();}
function setHint(){const h=(cur.hints&&cur.hints[curMode])||cur.hint||'';$('hint').textContent=T3.on?(h?h+' · ':'')+'sudrab aylantiring, g‘ildirak bilan yaqinlashtiring':h;}
function setMode(m){curMode=m;if(S){S.mode=m;S.pend=null;}$('toolbar').querySelectorAll('button[data-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===m));setHint();cv.style.cursor=m==='move'?'grab':m==='del'?'not-allowed':'crosshair';if(m==='del')cv.style.cursor='pointer';}

function renderInsp(){const box=$('insp');lastSel=S&&S.sel;if(!cur.inspect){box.hidden=true;box.innerHTML='';inspObj=null;return;}box.hidden=false;const ins=cur.inspect(S,P);inspObj=ins;
  if(!ins){box.innerHTML=`<p class="ptitle">Tanlangan obyekt</p><p class="small">${cur.inspectHint||'Animatsiyadagi obyektni bosing — xossalari shu yerda chiqadi.'}</p>`;return;}
  let h=`<p class="ptitle">Tanlangan obyekt</p><div class="itl">${ins.title}</div>`;if(ins.note)h+=`<p class="small">${ins.note}</p>`;
  (ins.props||[]).forEach((p,i)=>{if(p.toggle)h+=`<label class="tog"><input type="checkbox" id="ip-${i}" ${p.get()?'checked':''}> ${p.label}</label>`;
    else if(p.choices)h+=`<div class="ctl"><div class="ctl-top"><label>${p.label}</label></div><div class="choices" id="ip-${i}">${p.choices.map(([v,l])=>`<button type="button" data-v="${v}" aria-pressed="${p.get()==v}">${l}</button>`).join('')}</div></div>`;
    else h+=`<div class="ctl"><div class="ctl-top"><label for="ip-${i}">${p.label}${p.sym?`<span class="sym">${p.sym}</span>`:''}</label><output id="io-${i}"></output></div><input type="range" id="ip-${i}" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.get()}"></div>`;});
  if(ins.del)h+=`<button type="button" class="btn danger" id="idel">O‘chirish</button>`;box.innerHTML=h;
  (ins.props||[]).forEach((p,i)=>{const el=$('ip-'+i);if(p.toggle)el.onchange=()=>p.set(el.checked);
    else if(p.choices)el.querySelectorAll('button').forEach(b=>b.onclick=()=>{const v=isNaN(+b.dataset.v)?b.dataset.v:+b.dataset.v;p.set(v);el.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
    else{el.oninput=()=>{p.set(parseFloat(el.value));inOut(p,i);};inOut(p,i);}});
  if(ins.del)$('idel').onclick=()=>{ins.del();S.sel=null;renderInsp();};}
function inOut(p,i){const o=$('io-'+i);if(o)o.textContent=fmt(p.get(),p.d??0)+(p.unit?' '+p.unit:'');}
function refreshInsp(){if(!inspObj)return;(inspObj.props||[]).forEach((p,i)=>{if(p.toggle||p.choices)return;const el=$('ip-'+i);if(el&&document.activeElement!==el)el.value=p.get();inOut(p,i);});}

function select(id,user){const s=SIMS.find(x=>x.id===id)||SIMS[0];cur=s;P={};s.params.forEach(p=>P[p.id]=p.val);curMode='move';
  Object.values(btns).forEach(b=>b.removeAttribute('aria-current'));btns[s.id].setAttribute('aria-current','true');if(user&&innerWidth<860)btns[s.id].scrollIntoView({inline:'center',block:'nearest'});
  $('eyebrow').textContent=CATS.find(c=>c[0]===s.cat)[1]+(s.lab?' · erkin laboratoriya':s.sandbox?' · obyekt qo‘shish mumkin':'');{const lb=$('labgo'),L=SIMS.find(q=>q.lab&&q.cat===s.cat);if(lb){if(s.lab){lb.innerHTML='← Bo‘lim mavzulari';lb.onclick=()=>openSec(s.cat,true);}else if(L){lb.innerHTML='🔬 Laboratoriyani ochish';lb.onclick=()=>openLab(L.id,true);}lb.hidden=!s.lab&&!L;}}$('title').textContent=s.title;$('sub').textContent=s.sub;$('formula').innerHTML=s.formula;
  $('text').innerHTML=s.text.map(t=>`<p>${t}</p>`).join('');$('legend').innerHTML=s.legend.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('');$('tries').innerHTML=s.tries.map(t=>`<li>${t}</li>`).join('');
  cv.style.touchAction=s.pointer?'none':'auto';
  const tb=$('toolbar');tb.innerHTML='';tb.hidden=!s.tools;
  (s.tools||[]).forEach(t=>{const b=document.createElement('button');b.type='button';b.className='tool'+(t.act?' act':'');b.textContent=t.label;
    if(t.act)b.onclick=()=>{s.action(t.id,S,P,api);renderInsp();};else{b.dataset.mode=t.id;b.onclick=()=>setMode(t.id);}tb.appendChild(b);});
  const box=$('params');box.innerHTML='';$('ptitle').hidden=!s.params.length;
  s.params.forEach(p=>{const d=document.createElement('div');d.className='ctl';
    if(p.choices){d.innerHTML=`<div class="ctl-top"><label>${p.label}</label></div><div class="choices" role="group" aria-label="${p.label}">${p.choices.map(([v,l])=>`<button type="button" data-v="${v}" aria-pressed="${v===p.val}">${l}</button>`).join('')}</div>`;
      d.querySelectorAll('button').forEach(b=>b.onclick=()=>{P[p.id]=parseFloat(b.dataset.v);d.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));if(p.reset)reset();});}
    else{d.innerHTML=`<div class="ctl-top"><label for="p-${p.id}">${p.label}${p.sym?`<span class="sym">${p.sym}</span>`:''}</label><output id="o-${p.id}"></output></div><input type="range" id="p-${p.id}" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.val}">`;
      d.querySelector('input').addEventListener('input',e=>{P[p.id]=parseFloat(e.target.value);showOut(p.id);if(p.reset)reset();});}
    box.appendChild(d);if(!p.choices)showOut(p.id);});
  const ro=$('readouts');ro.innerHTML='';roEls=[];reset();setMode('move');if(!s.tools)cv.style.cursor=s.pointer?'grab':'default';
  const SQ=SIMS.filter(q=>!!q.lab===!!s.lab),i=SQ.indexOf(s),pv=SQ[(i-1+SQ.length)%SQ.length],nx=SQ[(i+1)%SQ.length];$('prev').textContent='← '+pv.title;$('next').textContent=nx.title+' →';$('prev').onclick=()=>select(pv.id,true);$('next').onclick=()=>select(nx.id,true);
  afterSelect();
  if(user)window.scrollTo({top:Math.min(window.scrollY,$('title').getBoundingClientRect().top+window.scrollY-12)});
  apply3();if(user&&!RM){['headbox','formula','cwrap'].forEach((id,i)=>{const e=$(id);e.classList.remove('fadein','fadein2');void e.offsetWidth;e.classList.add(i?'fadein2':'fadein');});}
  draw();updRead();}

function updRead(){let rows=[];try{rows=cur.read?cur.read(S,P):[];}catch(e){console.error(e);}const ro=$('readouts');if(roEls.length!==rows.length){ro.innerHTML='';roEls=rows.map(()=>{const d=document.createElement('div');d.className='ro';d.innerHTML='<span></span><strong></strong>';ro.appendChild(d);return d;});}
  rows.forEach((r,i)=>{const e=roEls[i];if(e.firstChild.textContent!==r[0])e.firstChild.textContent=r[0];if(e.lastChild.textContent!==r[1])e.lastChild.textContent=r[1];});}

function resize(){setTimeout(size3,0);const r=wrap.getBoundingClientRect();W=Math.max(200,r.width);H=Math.max(150,r.height);dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);draw();}
new ResizeObserver(resize).observe(wrap);

function draw(){if(!cur)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=C.canvas;ctx.fillRect(0,0,W,H);ctx.save();try{cur.draw(ctx,W,H,S,P,simTime);}catch(e){console.error(e);}ctx.restore();}
let last=performance.now(),wrapVis=true;new IntersectionObserver(es=>{wrapVis=es[0].isIntersecting;}).observe(wrap);
function loop(now){GL.n=0;const dt=Math.min(0.05,(now-last)/1000);last=now;if(frame%30===0)readColors();
  if(playing&&cur){const d=dt*speed;simTime+=d;try{if(cur.step)cur.step(S,P,d);}catch(e){console.error(e);}}draw();if(T3.on&&wrapVis){try{render3(dt);}catch(e){console.error(e);}}
  if(frame%6===0){updRead();if(cur.inspect){if(S.sel!==lastSel)renderInsp();else refreshInsp();}}frame++;requestAnimationFrame(loop);}

function setPlay(v){playing=v;$('play').textContent=v?'⏸ Pauza':'▶ Davom';}
$('play').onclick=()=>setPlay(!playing);$('restart').onclick=()=>{reset();simTime=0;};
$('speed').querySelectorAll('button').forEach(b=>b.onclick=()=>{speed=parseFloat(b.dataset.s);$('speed').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));});

const pos=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
cv.addEventListener('pointerdown',e=>{if(!cur.pointer)return;const[x,y]=pos(e);const ok=cur.pointer('down',x,y,S,P,api);renderInsp();if(ok){cv.setPointerCapture(e.pointerId);if(curMode==='move')cv.style.cursor='grabbing';}});
cv.addEventListener('pointermove',e=>{if(!cur.pointer)return;const[x,y]=pos(e);cur.pointer('move',x,y,S,P,api);});
const up=e=>{if(!cur.pointer)return;const[x,y]=pos(e);cur.pointer('up',x,y,S,P,api);renderInsp();if(curMode==='move')cv.style.cursor='grab';};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
document.addEventListener('keydown',e=>{if((e.key==='Delete'||e.key==='Backspace')&&inspObj&&inspObj.del&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();inspObj.del();S.sel=null;renderInsp();}});

/* 2D / 3D ko‘rinish */
let want3=(()=>{try{const v=localStorage.getItem('jf-view');if(v)return v==='3';}catch(e){}try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'));}catch(e){return false;}})();
function viewBtns(){$('view').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',(b.dataset.v==='3')===want3));}
function apply3(){const has=!!SC3[cur.id];$('view').hidden=!has;const on=want3&&has&&T3.ready;const was=T3.on;T3.on=on;wrap.classList.toggle('is3d',on);if(on){size3();if(!was||T3.cid!==cur.id)camReset(true);T3.cid=cur.id;}setHint();viewBtns();
  if(want3&&has&&!T3.ready&&!T3.loading)go3(true);}
async function go3(v){want3=v;try{localStorage.setItem('jf-view',v?'3':'2');}catch(e){}viewBtns();const ov=$('ov');
  if(v&&!T3.ready){ov.hidden=false;ov.innerHTML='<div><div class="spin"></div>3D sahna yuklanmoqda…</div>';
    try{await load3D();ov.hidden=true;}catch(e){console.error(e);want3=false;viewBtns();ov.innerHTML='<div>3D kutubxonasini yuklab bo‘lmadi.<br>Internet aloqasini tekshirib, qayta urinib ko‘ring.</div>';setTimeout(()=>ov.hidden=true,3500);}}
  apply3();}
$('view').querySelectorAll('button').forEach(b=>b.onclick=()=>go3(b.dataset.v==='3'));
$('camb').onclick=()=>{if(T3.ready)camReset();};
/* bosh sahifa: shakl o‘zgartiruvchi 3D nuqtalar buluti */
(()=>{const hc=$('herocv'),hx=hc.getContext('2d'),LOWH=matchMedia('(pointer: coarse)').matches||innerWidth<760,N=LOWH?650:1500;let hw=0,hh=0,dpr=1,vis=true;
  const SH=[['Atom',i=>{if(i<N*0.12){const r=Math.cbrt(Math.random())*0.16,a=Math.random()*TAU,b=Math.acos(2*Math.random()-1);return[r*Math.sin(b)*Math.cos(a),r*Math.cos(b),r*Math.sin(b)*Math.sin(a),2];}const k=i%3,t=Math.random()*TAU,R=0.95,x=Math.cos(t)*R,y=Math.sin(t)*R*0.36,til=k*Math.PI/3;return[x*Math.cos(til)-y*Math.sin(til),x*Math.sin(til)+y*Math.cos(til),Math.sin(t)*R*0.36*0.5,k];}],
    ['To‘lqin',i=>{const u=(i%40)/39*2-1,v=Math.floor(i/40)/(N/40)*2-1,r=Math.hypot(u,v);return[u*1.1,Math.cos(r*9)*0.18*(1-r*0.35),v*1.1,i%3];}],
    ['Galaktika',i=>{const arm=i%2,t=Math.pow(Math.random(),0.7)*3.2,a=t*1.9+arm*Math.PI,r=t/3.2*1.1+0.05,j=(1-t/3.2)*0.08+0.03;return[Math.cos(a)*r+(Math.random()-0.5)*j*2,(Math.random()-0.5)*0.08,Math.sin(a)*r+(Math.random()-0.5)*j*2,t<0.6?2:arm];}],
    ['Magnit maydoni',i=>{const L=i%9,k=Math.floor(i/9),ph=(k%12)/12*TAU,th=Math.random()*Math.PI,Ls=0.35+L*0.09,r=Ls*Math.sin(th)**2;return[r*Math.sin(th)*Math.cos(ph)*1.5,r*Math.cos(th)*1.5,r*Math.sin(th)*Math.sin(ph)*1.5,L%3];}],
    ['Spiral prujina',i=>{const t=i/N,a=t*TAU*9;return[Math.cos(a)*0.38+(Math.random()-0.5)*0.03,(t*2-1)*1.05,Math.sin(a)*0.38+(Math.random()-0.5)*0.03,i%3];}]];
  const tg=SH.map(([n,f])=>Array.from({length:N},(_,i)=>f(i))),P3=tg[0].map(p=>p.slice());let si=0,since=0,from=null,mt=1,rx=-0.35,ry=0,mx=0,my=0;
  const spr=[];const mk=()=>{spr.length=0;['accent','violet','warm'].forEach(k=>{const c=document.createElement('canvas');c.width=c.height=32;const g=c.getContext('2d'),gr=g.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(0.18,rgba(k,1));gr.addColorStop(0.5,rgba(k,0.25));gr.addColorStop(1,rgba(k,0));g.fillStyle=gr;g.fillRect(0,0,32,32);spr.push(c);});};
  const fit=()=>{const r=hc.getBoundingClientRect();dpr=Math.min(LOWH?1.5:2,devicePixelRatio||1);hw=r.width;hh=r.height;hc.width=hw*dpr;hc.height=hh*dpr;hx.setTransform(dpr,0,0,dpr,0,0);};new ResizeObserver(fit).observe(hc);
  addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-0.5;my=e.clientY/innerHeight-0.5;},{passive:true});
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;},{threshold:0}).observe(hc);
  const nm=$('shapename');const setName=()=>{nm.style.opacity=0;setTimeout(()=>{nm.textContent='◦ '+SH[si][0];nm.style.opacity=1;},300);};
  let lt=performance.now(),tdark=-1;const tick=now=>{const dt=Math.min(0.05,(now-lt)/1000);lt=now;if(!RM)requestAnimationFrame(tick);if(!vis&&!RM)return;if(tdark!==C.canvas){tdark=C.canvas;mk();}
    since+=dt;if(since>6.5&&!RM){since=0;from=P3.map(p=>p.slice());si=(si+1)%SH.length;mt=0;setName();}
    if(mt<1&&from){mt=Math.min(1,mt+dt/1.6);const e=mt<.5?4*mt*mt*mt:1-Math.pow(-2*mt+2,3)/2,T=tg[si];for(let i=0;i<N;i++){const a=from[i],b=T[i],d=Math.sin(i*12.9898)*0.35*Math.sin(Math.PI*e);P3[i][0]=a[0]+(b[0]-a[0])*e+d*0.4;P3[i][1]=a[1]+(b[1]-a[1])*e+d*0.25;P3[i][2]=a[2]+(b[2]-a[2])*e;P3[i][3]=b[3];}}
    ry+=dt*0.22;const trx=-0.32+my*0.6,cx=hw*(hw>860?0.7:0.5),cy=hh*(hw>860?0.5:0.42),S=Math.min(hw*(hw>860?0.3:0.46),hh*0.42),cr=Math.cos(ry+mx*0.8),sr=Math.sin(ry+mx*0.8),cX=Math.cos(trx),sX=Math.sin(trx),dark=GL.dark;rx=trx;
    hx.clearRect(0,0,hw,hh);hx.globalCompositeOperation=dark?'lighter':'source-over';const al=hw>860?1:0.3;
    for(let i=0;i<N;i++){const p=P3[i],x=p[0]*cr+p[2]*sr,z0=-p[0]*sr+p[2]*cr,y=p[1]*cX-z0*sX,z=p[1]*sX+z0*cX,f=2.6/(2.6+z),px=cx+x*S*f,py=cy+y*S*f,s=(dark?7:5.5)*f*(p[3]===2?1.25:1);
      hx.globalAlpha=al*Math.max(0.12,Math.min(1,(1.4-z)*0.6));hx.drawImage(spr[p[3]%3],px-s,py-s,s*2,s*2);}
    hx.globalAlpha=1;hx.globalCompositeOperation='source-over';};
  setTimeout(()=>{fit();setName();requestAnimationFrame(tick);},30);})();
/* bo‘limlar va navigatsiya */
const CSYM={kin:['v','#6f95ff','#3fc4e0','Tekis va tekis o‘zgaruvchan harakat, erkin tushish, otilgan jism, aylana bo‘ylab harakat'],din:['F','#a483f0','#6f95ff','Nyuton qonunlari, ishqalanish, og‘irlik va vazn, butun olam tortishishi'],sta:['M','#3fc48e','#4a95e0','Kuchlar muvozanati, richag, massa markazi, bosim va Arximed kuchi'],saq:['p','#f0a042','#f0645c','Ish va quvvat, energiya va impulsning saqlanishi, reaktiv harakat'],
  teb:['λ','#3fc48e','#6f95ff','Prujina va mayatnik, rezonans, to‘lqinlar, tovush va Doppler effekti'],mol:['N','#3fc4c0','#6f95ff','Molekulalar harakati, gaz qonunlari va izojarayonlar'],trm:['Q','#f0645c','#f0a042','Issiqlik miqdori, issiqlik balansi, erish va qaynash, issiqlik dvigateli'],est:['q','#f0645c','#a483f0','Kulon qonuni, elektr maydon va kondensator'],
  tok:['I','#f0a042','#e0c040','Om qonuni, EYuK va ichki qarshilik, zanjirlar, Joul–Lens qonuni'],mag:['B','#a483f0','#4a95e0','Amper va Lorens kuchi, induksiya, generator, transformator, tebranish konturi'],opt:['n','#4a95e0','#a483f0','Qaytish va sinish, linzalar, dispersiya, interferensiya va difraksiya'],rel:['c','#8aa0ff','#b083f0','Vaqtning sekinlashuvi, uzunlikning qisqarishi va E = mc²'],kva:['ψ','#b07cff','#5fd4ff','Plank nurlanishi, Kompton effekti, de Broyl to‘lqinlari, noaniqlik, tunnel effekti, atom orbitallari, spin, lazer'],yad:['hν','#a483f0','#f0645c','Fotoeffekt, Rezerford va Bor modellari, radioaktivlik, yadro bo‘linishi']};
const csym=id=>CSYM[id]||['∑','#6f95ff','#a483f0',''],catName=id=>(CATS.find(c=>c[0]===id)||['',''])[1],simsOf=id=>SIMS.filter(s=>s.cat===id),topicsOf=id=>SIMS.filter(s=>s.cat===id&&!s.lab),labOf=id=>SIMS.find(s=>s.cat===id&&s.lab);
const NT=SIMS.filter(s=>!s.lab).length,NL=SIMS.filter(s=>s.lab).length;$('maph').textContent=CATS.length+' bo‘lim, '+NT+' mavzu, '+NL+' laboratoriya';$('foottxt').textContent=NT+' mavzu · '+NL+' laboratoriya · '+CATS.length+' bo‘lim · '+Object.keys(SC3).length+' ta 3D sahna · formulalarni ko‘rib, ushlab o‘rganing';
$('cards').innerHTML=CATS.map(([id,name],k)=>{const c=csym(id),n=topicsOf(id).length;return`<button type="button" class="card spot" data-cat="${id}" style="--c1:${c[1]};--c2:${c[2]}"><span class="n">${String(k+1).padStart(2,'0')} · ${n} mavzu${labOf(id)?' + 🔬':''}</span><span class="sym">${c[0]}</span><b>${name}</b><small>${c[3]}</small><span class="go" aria-hidden="true">→</span></button>`;}).join('');
let view='home';
const go=(h)=>{try{history.pushState(null,'',h||(location.pathname+location.search));}catch(e){}};
function showView(v){view=v;$('hero').hidden=$('map').hidden=v!=='home';$('topbar').hidden=v==='home';$('bolim').hidden=v!=='sec';$('app').hidden=v!=='lab';document.body.dataset.view=v;}
function crumbs(){const c=$('crumbs');let h='<button type="button" data-h="">Bo‘limlar</button>';if(view==='sec'||view==='lab'){const cat=view==='sec'?curSec:cur.cat;h+=`<span class="sep">/</span>${view==='sec'?`<span class="now">${catName(cat)}</span>`:`<button type="button" data-c="${cat}">${catName(cat)}</button>`}`;}if(view==='lab')h+=`<span class="sep">/</span><span class="now">${cur.title}</span>`;c.innerHTML=h;
  c.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.c)openSec(b.dataset.c,true);else goHome(true,true);});}
let curSec='kin';
function openSec(cat,push){curSec=cat;const c=csym(cat),list=topicsOf(cat),lab=labOf(cat),k=CATS.findIndex(x=>x[0]===cat);const bs=$('bolim');bs.style.setProperty('--c1',c[1]);bs.style.setProperty('--c2',c[2]);
  $('bhead').innerHTML=`<div class="bsym">${c[0]}</div><div class="btxt"><div class="eyebrow2">${String(k+1).padStart(2,'0')}-bo‘lim · ${CATS.length} tadan</div><h2>${catName(cat)}</h2><p>${c[3]}</p><div class="b-meta"><span>${list.length} mavzu</span><span>${list.filter(s=>SC3[s.id]).length} ta 3D</span>${lab?'<span>🔬 erkin laboratoriya</span>':''}</div></div>`;
  $('tiles').innerHTML=(lab?`<button type="button" class="tile spot labtile" data-id="${lab.id}" style="--i:0"><span class="no">🔬 LABORATORIYA</span><b>${lab.title}</b><span class="fx">${lab.short}</span><small>${lab.sub}</small><span class="tags"><span>✚ ISTALGAN OBYEKT</span><span>TAYYOR TAJRIBALAR</span></span><span class="go" aria-hidden="true">→</span></button>`:'')+list.map((s,i)=>`<button type="button" class="tile spot" data-id="${s.id}" style="--i:${i+1}"><span class="no">${String(i+1).padStart(2,'0')}</span><b>${s.title}</b><span class="fx">${s.short}</span><small>${s.sub}</small><span class="tags">${SC3[s.id]?'<span>3D</span>':''}${s.sandbox?'<span>✚ LAB</span>':''}</span><span class="go" aria-hidden="true">→</span></button>`).join('');
  $('tiles').querySelectorAll('.tile').forEach(b=>b.onclick=()=>openLab(b.dataset.id,true));
  $('pills').innerHTML=CATS.map(([id,n])=>`<button type="button" data-c="${id}" aria-current="${id===cat}"><i>${csym(id)[0]}</i>${n}</button>`).join('');$('pills').querySelectorAll('button').forEach(b=>b.onclick=()=>openSec(b.dataset.c,true));
  showView('sec');crumbs();if(push)go('#/b/'+cat);window.scrollTo({top:0});}
function filterNav(){const q=$('search').value.toLowerCase().trim();document.querySelectorAll('nav.topics .cat').forEach(box=>{let any=false;simsOf(box.dataset.cat).forEach(s=>{const ok=q?(s.title+' '+s.short+' '+s.sub).toLowerCase().includes(q):s.cat===cur.cat;btns[s.id].hidden=!ok;any=any||ok;});box.hidden=!any;box.querySelector('h3').hidden=!q;});
  const c=csym(cur.cat),sw=$('secsw');sw.style.setProperty('--c1',c[1]);sw.style.setProperty('--c2',c[2]);sw.querySelector('.s').textContent=c[0];sw.querySelector('b').textContent=catName(cur.cat);sw.querySelector('select').value=cur.cat;}
function openLab(id,push){const was=view;select(id,false);showView('lab');filterNav();crumbs();resize();if(push)go('#'+id);if(was!=='lab')window.scrollTo({top:0});}
function afterSelect(){if(view==='lab'){filterNav();crumbs();try{history.replaceState(null,'','#'+cur.id);}catch(e){}}}
function goHome(push,toMap){showView('home');if(push)go('');requestAnimationFrame(()=>{if(toMap)$('map').scrollIntoView({behavior:'auto'});else window.scrollTo({top:0});});}
function route(){const h=decodeURIComponent((location.hash||'').slice(1));if(h.startsWith('/b/')&&CATS.some(c=>c[0]===h.slice(3)))openSec(h.slice(3));else if(SIMS.some(s=>s.id===h))openLab(h);else goHome(false);}
addEventListener('popstate',route);
{const sw=document.createElement('div');sw.className='secsw';sw.id='secsw';sw.innerHTML=`<div class="row"><span class="s"></span><b></b></div><select aria-label="Bo‘limni almashtirish">${CATS.map(([id,n])=>`<option value="${id}">${n}</option>`).join('')}</select><button type="button" class="all">← Bo‘lim mavzulari</button>`;
  nav.insertBefore(sw,nav.firstChild);sw.querySelector('select').onchange=e=>openSec(e.target.value,true);sw.querySelector('.all').onclick=()=>openSec(cur.cat,true);}
$('cards').querySelectorAll('.card').forEach(b=>b.onclick=()=>openSec(b.dataset.cat,true));
$('homeb').onclick=()=>goHome(true);
$('go').onclick=()=>openLab(SIMS[0].id,true);$('tomap').onclick=()=>$('map').scrollIntoView({behavior:RM?'auto':'smooth'});$('cue').onclick=()=>$('map').scrollIntoView({behavior:RM?'auto':'smooth'});
/* mikro-animatsiyalar */
document.querySelectorAll('.panel,.ro').forEach(e=>e.classList.add('spot'));
document.addEventListener('pointermove',e=>{const el=e.target.closest&&e.target.closest('.spot');if(!el)return;const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px');},{passive:true});
document.addEventListener('pointerdown',e=>{if(RM)return;const b=e.target.closest&&e.target.closest('.btn,.tool,.choices button,.tbtn,.view button,.card');if(!b)return;const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2.2,sp=document.createElement('span');sp.className='rip';sp.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(sp);setTimeout(()=>sp.remove(),650);});
const rngFill=el=>{const p=(el.value-el.min)/(el.max-el.min)*100;el.style.setProperty('--p',p+'%');};document.addEventListener('input',e=>{if(e.target.type==='range')rngFill(e.target);});setInterval(()=>document.querySelectorAll('input[type=range]').forEach(rngFill),400);
if('IntersectionObserver' in window&&!RM){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}}),{threshold:0.06});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));}else document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'));
readColors();setPlay(playing);
select(SIMS[0].id,false);route();resize();
requestAnimationFrame(loop);
window.__sims=SIMS;window.__select=id=>openLab(id,false);window.__sec=c=>openSec(c,false);window.__home=()=>goHome(false);window.__state=()=>S;window.__mode=m=>setMode(m);window.__action=id=>{cur.action(id,S,P,api);renderInsp();};
})();
