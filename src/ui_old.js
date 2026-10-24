/* ================= INTERFEYS ================= */
const $=id=>document.getElementById(id);
const cv=$('cv'),ctx=cv.getContext('2d'),wrap=$('cwrap');
let W=800,H=500,dpr=1,cur=null,S=null,P={},playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,speed=1,simTime=0,frame=0,roEls=[];
$('count').textContent=SIMS.length+' ta mavzu · '+CATS.length+' bo‘lim';

const nav=$('nav'),btns={};
CATS.forEach(([cid,cname])=>{const box=document.createElement('div');box.className='cat';box.dataset.cat=cid;box.innerHTML=`<h3>${cname}</h3>`;
  SIMS.filter(s=>s.cat===cid).forEach(s=>{const b=document.createElement('button');b.type='button';b.className='tbtn';b.innerHTML=`<b>${s.title}</b><small>${s.short}</small>`;b.onclick=()=>select(s.id,true);btns[s.id]=b;box.appendChild(b);});nav.appendChild(box);});
$('search').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();document.querySelectorAll('.cat').forEach(box=>{let any=false;SIMS.filter(s=>s.cat===box.dataset.cat).forEach(s=>{const ok=!q||(s.title+' '+s.short+' '+s.sub).toLowerCase().includes(q);btns[s.id].hidden=!ok;any=any||ok;});box.hidden=!any;});});

const api={set(id,v){P[id]=v;const inp=$('p-'+id);if(inp)inp.value=v;showOut(id);}};
function showOut(id){const p=cur.params.find(x=>x.id===id),o=$('o-'+id);if(!o||!p||p.choices)return;const v=P[id];o.textContent=p.show?p.show(v):fmt(v,p.d??(p.step<1?(p.step<0.1?2:1):0))+(p.unit?' '+p.unit:'');}
function reset(){S=cur.init(P);}

function select(id,user){const s=SIMS.find(x=>x.id===id)||SIMS[0];cur=s;P={};s.params.forEach(p=>P[p.id]=p.val);
  Object.values(btns).forEach(b=>b.removeAttribute('aria-current'));btns[s.id].setAttribute('aria-current','true');if(user&&innerWidth<860)btns[s.id].scrollIntoView({inline:'center',block:'nearest'});
  $('eyebrow').textContent=CATS.find(c=>c[0]===s.cat)[1];$('title').textContent=s.title;$('sub').textContent=s.sub;$('formula').innerHTML=s.formula;
  $('text').innerHTML=s.text.map(t=>`<p>${t}</p>`).join('');$('legend').innerHTML=s.legend.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('');$('tries').innerHTML=s.tries.map(t=>`<li>${t}</li>`).join('');
  $('hint').textContent=s.hint||'';cv.style.touchAction=s.pointer?'none':'auto';cv.style.cursor=s.pointer?'grab':'default';
  const box=$('params');box.innerHTML='';
  s.params.forEach(p=>{const d=document.createElement('div');d.className='ctl';
    if(p.choices){d.innerHTML=`<div class="ctl-top"><label>${p.label}</label></div><div class="choices" role="group" aria-label="${p.label}">${p.choices.map(([v,l])=>`<button type="button" data-v="${v}" aria-pressed="${v===p.val}">${l}</button>`).join('')}</div>`;
      d.querySelectorAll('button').forEach(b=>b.onclick=()=>{P[p.id]=parseFloat(b.dataset.v);d.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));if(p.reset)reset();});}
    else{d.innerHTML=`<div class="ctl-top"><label for="p-${p.id}">${p.label}${p.sym?`<span class="sym">${p.sym}</span>`:''}</label><output id="o-${p.id}"></output></div><input type="range" id="p-${p.id}" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.val}">`;
      d.querySelector('input').addEventListener('input',e=>{P[p.id]=parseFloat(e.target.value);showOut(p.id);if(p.reset)reset();});}
    box.appendChild(d);if(!p.choices)showOut(p.id);});
  const ro=$('readouts');ro.innerHTML='';roEls=[];reset();
  const i=SIMS.indexOf(s),pv=SIMS[(i-1+SIMS.length)%SIMS.length],nx=SIMS[(i+1)%SIMS.length];$('prev').textContent='← '+pv.title;$('next').textContent=nx.title+' →';$('prev').onclick=()=>select(pv.id,true);$('next').onclick=()=>select(nx.id,true);
  try{history.replaceState(null,'','#'+s.id);}catch(e){}
  if(user)window.scrollTo({top:Math.min(window.scrollY,$('title').getBoundingClientRect().top+window.scrollY-12)});
  draw();updRead();}

function updRead(){const rows=cur.read?cur.read(S,P):[],ro=$('readouts');if(roEls.length!==rows.length){ro.innerHTML='';roEls=rows.map(()=>{const d=document.createElement('div');d.className='ro';d.innerHTML='<span></span><strong></strong>';ro.appendChild(d);return d;});}
  rows.forEach((r,i)=>{const e=roEls[i];if(e.firstChild.textContent!==r[0])e.firstChild.textContent=r[0];if(e.lastChild.textContent!==r[1])e.lastChild.textContent=r[1];});}

function resize(){const r=wrap.getBoundingClientRect();W=Math.max(200,r.width);H=Math.max(150,r.height);dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);draw();}
new ResizeObserver(resize).observe(wrap);

function draw(){if(!cur)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=C.canvas;ctx.fillRect(0,0,W,H);ctx.save();try{cur.draw(ctx,W,H,S,P,simTime);}catch(e){console.error(e);}ctx.restore();}
let last=performance.now();
function loop(now){const dt=Math.min(0.05,(now-last)/1000);last=now;if(frame%30===0)readColors();
  if(playing&&cur){const d=dt*speed;simTime+=d;if(cur.step)cur.step(S,P,d);}draw();if(frame%6===0)updRead();frame++;requestAnimationFrame(loop);}

function setPlay(v){playing=v;$('play').textContent=v?'⏸ Pauza':'▶ Davom';}
$('play').onclick=()=>setPlay(!playing);$('restart').onclick=()=>{reset();simTime=0;};
$('speed').querySelectorAll('button').forEach(b=>b.onclick=()=>{speed=parseFloat(b.dataset.s);$('speed').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));});

const pos=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];};
cv.addEventListener('pointerdown',e=>{if(!cur.pointer)return;const[x,y]=pos(e);if(cur.pointer('down',x,y,S,P,api)){cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing';}});
cv.addEventListener('pointermove',e=>{if(!cur.pointer)return;const[x,y]=pos(e);cur.pointer('move',x,y,S,P,api);});
const up=e=>{if(!cur.pointer)return;const[x,y]=pos(e);cur.pointer('up',x,y,S,P,api);cv.style.cursor='grab';};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);

readColors();setPlay(playing);
const h=(location.hash||'').slice(1);select(SIMS.some(s=>s.id===h)?h:SIMS[0].id,false);resize();
requestAnimationFrame(loop);
window.__sims=SIMS;window.__select=id=>select(id,false);
})();
