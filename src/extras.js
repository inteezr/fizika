/* ✨ Qo‘shimchalar: tezkor qidiruv, XP va unvonlar, yutuqlar, o‘rganish progressi, kun formulasi, tasodifiy tajriba, taqdimot rejimi */
(()=>{
const LG=window.LANG||'uz';
const X=(u,r,e)=>LG==='ru'?(r??u):LG==='en'?(e??u):u;
const XA=a=>Array.isArray(a)?X(a[0],a[1],a[2]):a;
const TR=s=>{try{return window.tr?window.tr(String(s)):String(s);}catch(e){return String(s);}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SIMS=window.__sims||[],CATS=window.__cats||[];
const TOP=SIMS.filter(s=>!s.lab),LABS=SIMS.filter(s=>s.lab);
const RMO=matchMedia('(prefers-reduced-motion: reduce)').matches;
const catName=c=>TR((CATS.find(x=>x[0]===c)||['',c])[1]);

/* ---------- saqlash ---------- */
const KEY='jf-prog';
const P=(()=>{let o={};try{o=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){}return Object.assign({xp:0,seen:{},ach:{},n:{}},o);})();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P));}catch(e){}};

/* ---------- unvonlar ---------- */
const RANKS=[[0,['Yangi boshlovchi','Новичок','Newcomer'],'🌱'],[150,['Laborant','Лаборант','Lab assistant'],'🧪'],[500,['Tadqiqotchi','Исследователь','Researcher'],'🔬'],[1200,['Muhandis','Инженер','Engineer'],'⚙️'],[2500,['Professor','Профессор','Professor'],'🎓'],[5000,['Akademik','Академик','Academician'],'🏛️'],[10000,['Nobel laureati','Нобелевский лауреат','Nobel laureate'],'🏅']];
function rank(){let k=0;RANKS.forEach((r,i)=>{if(P.xp>=r[0])k=i;});const nx=RANKS[k+1];return{k,name:XA(RANKS[k][1]),ic:RANKS[k][2],cur:RANKS[k][0],next:nx?nx[0]:null};}

/* ---------- yutuqlar ---------- */
const ACH=[
 ['first','🔭',['Birinchi qadam','Первый шаг','First step'],['Birinchi mavzuni oching','Откройте первую тему','Open your first topic']],
 ['t10','📚',['Bilimdon','Знаток','Know-it-all'],['10 ta mavzuni o‘rganing','Изучите 10 тем','Explore 10 topics']],
 ['t50','🧠',['Fizika ustasi','Мастер физики','Physics master'],['50 ta mavzuni o‘rganing','Изучите 50 тем','Explore 50 topics']],
 ['tall','🌌',['Hammasi ko‘rildi','Всё изучено','Seen it all'],[`Barcha ${TOP.length} mavzuni o‘rganing`,`Изучите все ${TOP.length} тем`,`Explore all ${TOP.length} topics`]],
 ['allsec','🗺️',['Sayyoh','Путешественник','Explorer'],['Har bir bo‘limdan kamida bitta mavzu','Хотя бы одна тема из каждого раздела','At least one topic in every section']],
 ['kva','ψ',['Kvant sayohatchisi','Квантовый путешественник','Quantum traveller'],['Kvant fizikasidan 5 ta mavzu','5 тем по квантовой физике','5 quantum physics topics']],
 ['labs','🧪',['Tajribachi','Экспериментатор','Experimenter'],['5 ta laboratoriyani oching','Откройте 5 лабораторий','Open 5 labs']],
 ['win','⚔️',['Birinchi g‘alaba','Первая победа','First victory'],['Bellashuvda robotni yenging','Победите робота в битве','Beat the robot in a battle']],
 ['hard','🤖',['Robot ovchisi','Охотник на роботов','Robot hunter'],['Qiyin darajadagi robotni yenging','Победите робота на сложном уровне','Beat the robot on Hard']],
 ['streak5','🔥',['Olovli seriya','Огненная серия','On fire'],['Bellashuvda ketma-ket 5 ta g‘alaba','5 побед подряд в битве','5 wins in a row in a battle']],
 ['battle10','🏟️',['Gladiator','Гладиатор','Gladiator'],['10 ta bellashuv o‘ynang','Сыграйте 10 битв','Play 10 battles']],
 ['night','🦉',['Tungi olim','Ночной учёный','Night owl'],['Soat 22:00 dan keyin o‘rganing','Учитесь после 22:00','Study after 10 pm']],
 ['fast','⌨️',['Tezkor','Скоростной','Speedy'],['Tezkor qidiruvdan foydalaning (Ctrl+K)','Воспользуйтесь быстрым поиском (Ctrl+K)','Use quick search (Ctrl+K)']],
 ['present','🎬',['Ustoz','Наставник','Teacher'],['Taqdimot rejimini yoqing','Включите режим презентации','Turn on presentation mode']],
 ['lucky','🎲',['Omadli','Везунчик','Lucky'],['Tasodifiy tajribani bosing','Нажмите «Случайный опыт»','Try a random experiment']]
];

/* ---------- uslub ---------- */
const css=`
.jf-chip{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--edge);background:var(--glass);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:var(--ink);border-radius:999px;padding:5px 12px 5px 6px;font:600 13px/1 "IBM Plex Sans",system-ui,sans-serif;cursor:pointer;min-height:32px;white-space:nowrap;transition:border-color .2s,transform .2s}
.jf-chip:hover{border-color:var(--accent);transform:translateY(-1px)}
.jf-chip .ic{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--panel);font-size:14px}
.jf-chip .mb{width:46px;height:5px;border-radius:9px;background:var(--line);overflow:hidden}.jf-chip .mb i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--violet))}
.jf-chip kbd{font:500 10px/1 "IBM Plex Mono",monospace;color:var(--muted);border:1px solid var(--line);border-radius:5px;padding:3px 5px}
.hero .jf-hp{position:absolute;top:16px;left:16px;z-index:5;display:flex;gap:8px}
.topbar{flex-wrap:nowrap!important}.topbar .crumbs{min-width:0;flex:1 1 auto;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.topbar .jf-tbx .jf-chip .nm{display:none}.topbar .jf-tbx{flex:0 0 auto;display:flex;gap:6px;align-items:center;margin-left:auto}
.topbar .jf-tbx+.bt-tb{margin-left:6px}
.jf-fod{display:flex;align-items:center;gap:14px;align-self:flex-start;max-width:100%;text-align:left;border:1px solid var(--edge);background:var(--glass);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:16px;padding:10px 16px 10px 12px;color:var(--ink);cursor:pointer;transition:transform .2s,border-color .2s;font:inherit}
.jf-fod:hover{transform:translateY(-2px);border-color:var(--accent)}
.jf-fod .st{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--violet));color:#fff;font-size:18px;flex:none}
.jf-fod .tx{display:flex;flex-direction:column;gap:3px;min-width:0}
.jf-fod small{font:500 11px/1 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.jf-fod .f{font:italic 600 20px/1.15 "STIX Two Text","Times New Roman",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.jf-fod .t{font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.card .jf-pg{display:flex;align-items:center;gap:8px;margin-top:2px;font:500 11px/1 "IBM Plex Mono",monospace;color:var(--muted)}
.card .jf-pg .b{flex:1;max-width:120px;height:5px;border-radius:9px;background:var(--line);overflow:hidden}.card .jf-pg .b i{display:block;height:100%;border-radius:9px;background:linear-gradient(90deg,var(--c1,var(--accent)),var(--c2,var(--violet)));transition:width .8s}
.tile .jf-ck{position:absolute;z-index:3;top:12px;right:14px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font:700 12px/1 sans-serif;color:#fff;background:var(--green);box-shadow:0 4px 12px -4px var(--green)}
.tbtn.jf-seen b::after{content:" ✓";color:var(--green);font-weight:700}
.jf-ov{position:fixed;inset:0;z-index:90;display:flex;align-items:flex-start;justify-content:center;padding:10vh 16px 16px;background:color-mix(in srgb,var(--bg) 55%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:jfIn .18s ease}
.jf-pal{width:min(640px,100%);max-height:72vh;display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--edge);border-radius:20px;box-shadow:0 40px 90px -30px rgba(0,0,0,.55),0 0 0 1px var(--edge);overflow:hidden;animation:jfPop .22s cubic-bezier(.2,1.3,.4,1)}
.jf-pal .in{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line)}
.jf-pal input{flex:1;border:0;background:none;outline:0;color:var(--ink);font:500 18px/1.3 "IBM Plex Sans",system-ui,sans-serif;min-width:0}
.jf-pal .in kbd,.jf-pal .ft kbd{font:500 11px/1 "IBM Plex Mono",monospace;color:var(--muted);border:1px solid var(--line);border-radius:6px;padding:3px 6px}
.jf-pal .ls{overflow:auto;padding:6px;overscroll-behavior:contain}
.jf-pal .gh{font:600 11px/1 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);padding:12px 10px 6px}
.jf-pal .it{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:0;background:none;color:var(--ink);border-radius:12px;padding:9px 10px;cursor:pointer;font:inherit}
.jf-pal .it[aria-selected="true"]{background:color-mix(in srgb,var(--accent) 14%,transparent)}
.jf-pal .it .ic{display:grid;place-items:center;flex:none;width:34px;height:34px;border-radius:10px;background:var(--bg);border:1px solid var(--line);font:italic 600 16px/1 "STIX Two Text",serif}
.jf-pal .it .tx{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
.jf-pal .it b{font-weight:600;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.jf-pal .it small{color:var(--muted);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.jf-pal .it .ok{color:var(--green);font-weight:700}
.jf-pal .it mark{background:color-mix(in srgb,var(--warm) 30%,transparent);color:inherit;border-radius:3px}
.jf-pal .ft{display:flex;gap:14px;flex-wrap:wrap;padding:10px 16px;border-top:1px solid var(--line);font-size:12px;color:var(--muted)}
.jf-pal .em{padding:28px;text-align:center;color:var(--muted)}
.jf-prof{width:min(760px,100%);max-height:84vh;overflow:auto;background:var(--panel);border:1px solid var(--edge);border-radius:22px;padding:22px;box-shadow:0 40px 90px -30px rgba(0,0,0,.55);animation:jfPop .22s cubic-bezier(.2,1.3,.4,1);position:relative}
.jf-prof h3{margin:0;font:700 28px/1.1 "Bricolage Grotesque","IBM Plex Sans",sans-serif}
.jf-prof .x{position:absolute;top:14px;right:14px;border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:999px;width:36px;height:36px;cursor:pointer;font-size:16px}
.jf-prof .hd{display:flex;gap:16px;align-items:center;margin-bottom:16px}
.jf-prof .big{display:grid;place-items:center;width:72px;height:72px;border-radius:22px;font-size:38px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 25%,var(--panel)),color-mix(in srgb,var(--violet) 25%,var(--panel)));box-shadow:0 0 0 1px var(--edge)}
.jf-prof .xb{height:12px;border-radius:99px;background:var(--line);overflow:hidden;margin:6px 0 4px}.jf-prof .xb i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--accent),var(--violet),var(--warm))}
.jf-prof .mu{color:var(--muted);font-size:13px}
.jf-prof h4{margin:20px 0 10px;font:600 12px/1 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.jf-secs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 18px}
.jf-secs div{display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:8px;align-items:center;font-size:13px}
.jf-secs .s{font:italic 600 16px/1 "STIX Two Text",serif;text-align:center}
.jf-secs .b{grid-column:2/4;height:5px;border-radius:9px;background:var(--line);overflow:hidden;margin-top:-4px}.jf-secs .b i{display:block;height:100%;background:linear-gradient(90deg,var(--c1),var(--c2))}
.jf-achs{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.jf-ach{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;padding:14px 10px;border-radius:16px;border:1px solid var(--line);background:var(--bg)}
.jf-ach .i{font-size:30px;line-height:1;font-family:"STIX Two Text",serif}
.jf-ach b{font-size:13px}.jf-ach small{font-size:11px;color:var(--muted);line-height:1.3}
.jf-ach.off{opacity:.42;filter:grayscale(1)}
.jf-ach.on{border-color:color-mix(in srgb,var(--warm) 55%,var(--line));background:linear-gradient(160deg,color-mix(in srgb,var(--warm) 12%,var(--bg)),var(--bg))}
.jf-rst{margin-top:18px;border:0;background:none;color:var(--muted);font-size:12px;text-decoration:underline;cursor:pointer}
.jf-toasts{position:fixed;right:16px;bottom:16px;z-index:95;display:flex;flex-direction:column;gap:10px;align-items:flex-end;pointer-events:none}
.jf-toast{display:flex;align-items:center;gap:12px;max-width:min(360px,calc(100vw - 32px));background:var(--panel);color:var(--ink);border:1px solid var(--edge);border-radius:16px;padding:12px 16px 12px 12px;box-shadow:0 24px 50px -20px rgba(0,0,0,.5);animation:jfToast .5s cubic-bezier(.2,1.3,.4,1) both;pointer-events:auto}
.jf-toast.out{animation:jfOut .35s ease forwards}
.jf-toast .i{display:grid;place-items:center;flex:none;width:44px;height:44px;border-radius:14px;font-size:24px;background:linear-gradient(135deg,color-mix(in srgb,var(--warm) 30%,var(--panel)),color-mix(in srgb,var(--violet) 25%,var(--panel)));font-family:"STIX Two Text",serif}
.jf-toast small{display:block;font:600 10px/1.2 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--warm);margin-bottom:3px}
.jf-toast b{font-size:15px}
.jf-toast .d{display:block;font-size:12px;color:var(--muted);margin-top:2px}
.jf-lab{display:inline-flex;gap:6px}
.jf-lab button{border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:999px;padding:6px 11px;font:600 12px/1 "IBM Plex Sans",system-ui,sans-serif;cursor:pointer;min-height:30px}
.jf-lab button:hover{border-color:var(--accent)}
body.jf-present nav.topics,body.jf-present .topbar,body.jf-present .explain,body.jf-present .pager,body.jf-present .foot,body.jf-present #sub,body.jf-present .labgo{display:none!important}
body.jf-present .app{max-width:none;grid-template-columns:minmax(0,1fr);margin-top:12px;padding:0 18px}
body.jf-present .stage{grid-template-columns:minmax(0,1fr) 300px}
body.jf-present .cwrap{aspect-ratio:auto;height:calc(100vh - 210px);min-height:320px}
body.jf-present #title{font-size:clamp(26px,3vw,40px)}
.jf-exitp{position:fixed;top:12px;right:12px;z-index:92;display:none}
body.jf-present .jf-exitp{display:inline-flex}
@keyframes jfIn{from{opacity:0}}
@keyframes jfPop{from{opacity:0;transform:translateY(10px) scale(.97)}}
@keyframes jfToast{from{opacity:0;transform:translateX(40px) scale(.9)}}
@keyframes jfOut{to{opacity:0;transform:translateX(40px)}}
@media (prefers-reduced-motion: reduce){.jf-ov,.jf-pal,.jf-prof,.jf-toast{animation:none!important}}
@media (max-width:640px){
 .hero .jf-hp{top:8px;left:8px}.hero .jf-hp .jf-chip .mb,.hero .jf-hp .jf-chip .nm,.jf-chip kbd{display:none}
 .topbar .jf-tbx .jf-chip .mb,.topbar .jf-tbx .jf-chip .nm{display:none}
 .jf-secs{grid-template-columns:minmax(0,1fr)}
 .jf-ov{padding-top:6vh}
 .jf-fod .f{font-size:17px}
 body.jf-present .stage{grid-template-columns:minmax(0,1fr)}
 body.jf-present .cwrap{height:62vh}
 .jf-lab button span{display:none}
}`;
const stEl=document.createElement('style');stEl.textContent=css;document.head.appendChild(stEl);

/* ---------- bildirishnomalar ---------- */
const tbox=document.createElement('div');tbox.className='jf-toasts';tbox.dataset.notr='1';tbox.setAttribute('aria-live','polite');document.body.appendChild(tbox);
function toast(ic,kicker,title,desc){const t=document.createElement('div');t.className='jf-toast';t.innerHTML=`<span class="i">${ic}</span><span><small>${esc(kicker)}</small><b>${esc(title)}</b>${desc?`<span class="d">${esc(desc)}</span>`:''}</span>`;tbox.appendChild(t);
 while(tbox.children.length>3)tbox.firstChild.remove();setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),360);},4200);t.onclick=()=>openProfile();}
let AC=null;function chime(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t0=AC.currentTime;[784,988,1319].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f;const s=t0+i*0.09;g.gain.setValueAtTime(0.0001,s);g.gain.exponentialRampToValueAtTime(0.07,s+0.02);g.gain.exponentialRampToValueAtTime(0.0001,s+0.35);o.connect(g).connect(AC.destination);o.start(s);o.stop(s+0.4);});}catch(e){}}

/* ---------- XP / yutuq API ---------- */
function addXP(n,quiet){const r0=rank();P.xp=Math.max(0,P.xp+Math.round(n));save();const r=rank();if(r.k>r0.k&&!quiet){chime();toast(r.ic,X('Yangi unvon','Новое звание','New rank'),r.name,`${P.xp} XP`);}refreshChips();return r;}
function ach(id){if(P.ach[id])return false;const a=ACH.find(x=>x[0]===id);if(!a)return false;P.ach[id]=Date.now();save();addXP(30,true);chime();toast(a[1],X('Yutuq ochildi','Достижение','Achievement unlocked'),XA(a[2]),XA(a[3])+' · +30 XP');refreshChips();return true;}
const count=k=>{P.n[k]=(P.n[k]||0)+1;save();return P.n[k];};
window.JF={addXP,ach,rank,xp:()=>P.xp,count,get:k=>P.n[k]||0,P};

/* ---------- o‘rganish progressi ---------- */
function seenIn(cat){return TOP.filter(s=>s.cat===cat&&P.seen[s.id]).length;}
function checkAch(){const n=TOP.filter(s=>P.seen[s.id]).length;if(n>=1)ach('first');if(n>=10)ach('t10');if(n>=50)ach('t50');if(n>=TOP.length)ach('tall');
 if(CATS.every(c=>seenIn(c[0])>0))ach('allsec');if(seenIn('kva')>=5)ach('kva');if(LABS.filter(s=>P.seen[s.id]).length>=5)ach('labs');
 const h=new Date().getHours();if(h>=22||h<5)ach('night');}
function visit(id){const s=SIMS.find(x=>x.id===id);if(!s)return;if(!P.seen[s.id]){P.seen[s.id]=Date.now();save();addXP(s.lab?15:10);}checkAch();decorate();}
function decorate(){
 document.querySelectorAll('#cards .card[data-cat]').forEach(c=>{const cat=c.dataset.cat,tot=TOP.filter(s=>s.cat===cat).length,n=seenIn(cat);let pg=c.querySelector('.jf-pg');if(!pg){pg=document.createElement('span');pg.className='jf-pg';pg.dataset.notr='1';pg.innerHTML='<span class="b"><i></i></span><span class="t"></span>';const b=c.querySelector('b');(b||c).after(pg);}
  pg.querySelector('i').style.width=(tot?n/tot*100:0)+'%';pg.querySelector('.t').textContent=n?`${n}/${tot} ${X('o‘rganildi','изучено','explored')}`:X('hali boshlanmagan','ещё не начато','not started yet');});
 document.querySelectorAll('#tiles .tile[data-id]').forEach(t=>{const on=!!P.seen[t.dataset.id];t.classList.toggle('jf-seen',on);let c=t.querySelector('.jf-ck');if(on&&!c){c=document.createElement('span');c.className='jf-ck';c.textContent='✓';t.appendChild(c);}else if(!on&&c)c.remove();});
 document.querySelectorAll('nav.topics .tbtn').forEach(b=>{const id=b.dataset.jfid;if(id)b.classList.toggle('jf-seen',!!P.seen[id]);});}
// mavzular ro‘yxatidagi tugmalarga id belgilash (tartib SIMS bo‘yicha)
(()=>{const boxes=document.querySelectorAll('nav.topics .cat');boxes.forEach(box=>{const cat=box.dataset.cat;const list=SIMS.filter(s=>s.cat===cat);box.querySelectorAll('.tbtn').forEach((b,i)=>{if(list[i])b.dataset.jfid=list[i].id;});});})();
const tiles=document.getElementById('tiles');if(tiles)new MutationObserver(()=>decorate()).observe(tiles,{childList:true});

/* ---------- navigatsiyani kuzatish ---------- */
let lastH='';
function onNav(){const h=decodeURIComponent((location.hash||'').slice(1));if(h===lastH)return;lastH=h;if(h&&!h.startsWith('/'))setTimeout(()=>{if(decodeURIComponent((location.hash||'').slice(1))===h)visit(h);},1200);labBar();}
['pushState','replaceState'].forEach(m=>{const o=history[m];history[m]=function(...a){const r=o.apply(this,a);setTimeout(onNav,0);return r;};});
addEventListener('popstate',()=>setTimeout(onNav,0));addEventListener('hashchange',()=>setTimeout(onNav,0));

/* ---------- unvon chipi ---------- */
const chips=[];
function chipHtml(){const r=rank();const pc=r.next?(P.xp-r.cur)/(r.next-r.cur)*100:100;return `<span class="ic">${r.ic}</span><span class="nm">${esc(r.name)}</span><span class="mb"><i style="width:${pc.toFixed(0)}%"></i></span><span>${P.xp} XP</span>`;}
function mkChip(){const b=document.createElement('button');b.type='button';b.className='jf-chip';b.dataset.notr='1';b.title=X('Profil va yutuqlar','Профиль и достижения','Profile and achievements');b.onclick=openProfile;chips.push(b);b.innerHTML=chipHtml();return b;}
function refreshChips(){chips.forEach(c=>c.innerHTML=chipHtml());}
function mkSearch(){const b=document.createElement('button');b.type='button';b.className='jf-chip';b.dataset.notr='1';b.innerHTML=`<span class="ic">🔍</span><span class="nm">${X('Qidiruv','Поиск','Search')}</span><kbd>${/Mac|iPhone|iPad/.test(navigator.platform)?'⌘':'Ctrl'} K</kbd>`;b.onclick=()=>openPal();return b;}
const hero=document.getElementById('hero');if(hero){const d=document.createElement('div');d.className='jf-hp';d.dataset.notr='1';d.appendChild(mkChip());d.appendChild(mkSearch());hero.appendChild(d);}
const tb=document.getElementById('topbar');if(tb){const d=document.createElement('div');d.className='jf-tbx';d.dataset.notr='1';d.appendChild(mkSearch());d.appendChild(mkChip());const ref=tb.querySelector('.bt-tb')||tb.querySelector('.langsw');tb.insertBefore(d,ref||null);}

/* ---------- kun formulasi ---------- */
const cta=document.querySelector('.hero .cta');
if(cta){const pool=TOP.filter(s=>/=/.test(s.short||'')&&(s.short||'').length<30);const day=Math.floor(Date.now()/864e5);const s=pool[day%pool.length];
 if(s){const b=document.createElement('button');b.type='button';b.className='jf-fod';b.dataset.notr='1';b.innerHTML=`<span class="st">✦</span><span class="tx"><small>${X('Kun formulasi','Формула дня','Formula of the day')}</small><span class="f">${esc(TR(s.short))}</span><span class="t">${esc(TR(s.title))} · ${esc(catName(s.cat))}</span></span><span aria-hidden="true">→</span>`;b.onclick=()=>{location.hash='#'+s.id;};cta.after(b);}
 const r=document.createElement('button');r.type='button';r.className='btn ghost big';r.dataset.notr='1';r.innerHTML='🎲 '+X('Tasodifiy tajriba','Случайный опыт','Random experiment');r.onclick=randomTopic;cta.appendChild(r);}
function randomTopic(){const un=TOP.filter(s=>!P.seen[s.id]);const pool=un.length?un:TOP;const s=pool[Math.floor(Math.random()*pool.length)];ach('lucky');location.hash='#'+s.id;}

/* ---------- laboratoriya paneli: taqdimot rejimi va tasodifiy ---------- */
let labEl=null;
function labBar(){const row=document.querySelector('#headbox .eyerow');if(!row)return;if(!labEl){labEl=document.createElement('span');labEl.className='jf-lab';labEl.dataset.notr='1';labEl.innerHTML=`<button type="button" data-a="p" title="${esc(X('Taqdimot rejimi (P)','Режим презентации (P)','Presentation mode (P)'))}">🎬 <span>${X('Taqdimot','Презентация','Present')}</span></button><button type="button" data-a="r" title="${esc(X('Tasodifiy tajriba','Случайный опыт','Random experiment'))}">🎲 <span>${X('Tasodifiy','Случайно','Random')}</span></button>`;
  labEl.querySelector('[data-a="p"]').onclick=togglePresent;labEl.querySelector('[data-a="r"]').onclick=randomTopic;row.appendChild(labEl);}}
labBar();
const exitB=document.createElement('button');exitB.type='button';exitB.className='jf-chip jf-exitp';exitB.dataset.notr='1';exitB.innerHTML='✕ '+X('Taqdimotdan chiqish','Выйти из презентации','Exit presentation')+' <kbd>Esc</kbd>';exitB.onclick=()=>togglePresent(false);document.body.appendChild(exitB);
function togglePresent(on){const want=typeof on==='boolean'?on:!document.body.classList.contains('jf-present');if(want&&document.body.dataset.view!=='lab')return;document.body.classList.toggle('jf-present',want);
 try{if(want&&document.documentElement.requestFullscreen&&!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});else if(!want&&document.fullscreenElement)document.exitFullscreen().catch(()=>{});}catch(e){}
 if(want){ach('present');window.scrollTo({top:0});}setTimeout(()=>dispatchEvent(new Event('resize')),60);setTimeout(()=>dispatchEvent(new Event('resize')),400);}
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&document.body.classList.contains('jf-present'))togglePresent(false);});

/* ---------- tezkor qidiruv (Ctrl+K) ---------- */
const norm=s=>String(s||'').toLowerCase().replace(/[‘’ʻʼ'`]/g,'').normalize('NFD').replace(/[̀-ͯ]/g,'');
const IDX=SIMS.map(s=>({s,h:norm([s.title,TR(s.title),s.short,TR(s.short),catName(s.cat),s.id].join(' ')),t:norm(TR(s.title)+' '+s.title)}));
const ACTS=[
 {ic:'⚔️',n:()=>X('Bellashuv','Битва','Battle'),d:()=>X('Sun’iy intellekt yoki do‘st bilan o‘ynash','Играть с ИИ или с другом','Play against the AI or a friend'),k:'bellashuv battle битва jang oyin game',go:()=>window.__battle&&window.__battle()},
 {ic:'🎲',n:()=>X('Tasodifiy tajriba','Случайный опыт','Random experiment'),d:()=>X('Hali ko‘rmagan mavzulardan biri','Одна из ещё не изученных тем','One of the topics you haven’t seen'),k:'tasodifiy random случайный',go:randomTopic},
 {ic:'🏅',n:()=>X('Profil va yutuqlar','Профиль и достижения','Profile and achievements'),d:()=>`${rank().ic} ${rank().name} · ${P.xp} XP`,k:'profil yutuq profile achievement профиль достижения xp unvon',go:()=>openProfile()},
 {ic:'🎬',n:()=>X('Taqdimot rejimi','Режим презентации','Presentation mode'),d:()=>X('Katta ekranda tushuntirish uchun','Для объяснения на большом экране','For explaining on a big screen'),k:'taqdimot present презентация fullscreen',go:()=>togglePresent(true),lab:1},
 {ic:'⌂',n:()=>X('Bosh sahifa','Главная','Home'),d:()=>X('Bo‘limlar xaritasi','Карта разделов','Section map'),k:'bosh home главная xarita',go:()=>{try{history.pushState(null,'',location.pathname+location.search);}catch(e){}window.__home&&window.__home();}},
 ...[['uz','O‘zbekcha'],['ru','Русский'],['en','English']].filter(l=>l[0]!==LG).map(l=>({ic:'🌐',n:()=>l[1],d:()=>X('Tilni almashtirish','Сменить язык','Switch language'),k:'til language язык '+l[0]+' '+l[1],go:()=>window.setLang&&window.setLang(l[0])}))
];
let pal=null,items=[],sel=0;
function openPal(){if(pal)return;ach('fast');pal=document.createElement('div');pal.className='jf-ov';pal.dataset.notr='1';
 pal.innerHTML=`<div class="jf-pal" role="dialog" aria-modal="true" aria-label="${esc(X('Tezkor qidiruv','Быстрый поиск','Quick search'))}"><div class="in"><span style="font-size:17px">🔍</span><input id="jf-q" autocomplete="off" spellcheck="false" placeholder="${esc(X('Mavzu, formula yoki buyruq… masalan «tunnel» yoki «F = ma»','Тема, формула или команда… например «туннель» или «F = ma»','Topic, formula or command… e.g. “tunnel” or “F = ma”'))}"><kbd>Esc</kbd></div><div class="ls" id="jf-ls" role="listbox"></div><div class="ft"><span><kbd>↑</kbd> <kbd>↓</kbd> ${X('tanlash','выбор','select')}</span><span><kbd>Enter</kbd> ${X('ochish','открыть','open')}</span><span><kbd>/</kbd> ${X('yoki','или','or')} <kbd>Ctrl K</kbd> ${X('qidiruvni ochadi','открывает поиск','opens search')}</span></div></div>`;
 document.body.appendChild(pal);const q=pal.querySelector('#jf-q');q.oninput=()=>{sel=0;render(q.value);};q.onkeydown=e=>{if(e.key==='ArrowDown'){sel=Math.min(items.length-1,sel+1);hi(true);e.preventDefault();}else if(e.key==='ArrowUp'){sel=Math.max(0,sel-1);hi(true);e.preventDefault();}else if(e.key==='Enter'){run(items[sel]);e.preventDefault();}else if(e.key==='Escape'){closePal();e.preventDefault();e.stopPropagation();}};
 pal.onclick=e=>{if(e.target===pal)closePal();};render('');setTimeout(()=>q.focus(),20);}
function closePal(){if(pal){pal.remove();pal=null;}}
function mark(text,q){const t=esc(text);if(!q)return t;const w=q.split(/\s+/).filter(x=>x.length>1);let out=t;w.forEach(x=>{const i=norm(out).indexOf(x);if(i>=0&&norm(out).length===out.length)out=out.slice(0,i)+'<mark>'+out.slice(i,i+x.length)+'</mark>'+out.slice(i+x.length);});return out;}
function render(raw){const q=norm(raw).trim(),ws=q.split(/\s+/).filter(Boolean);const ls=pal.querySelector('#jf-ls');const inLab=document.body.dataset.view==='lab';
 const acts=ACTS.filter(a=>(!a.lab||inLab)&&(!q||ws.every(w=>norm(a.n()+' '+a.k).includes(w))));
 let tops;if(!q){const rec=Object.entries(P.seen).sort((a,b)=>b[1]-a[1]).slice(0,5).map(e=>SIMS.find(s=>s.id===e[0])).filter(Boolean);tops=rec.length?rec:TOP.slice(0,6);}
 else tops=IDX.filter(o=>ws.every(w=>o.h.includes(w))).map(o=>({s:o.s,sc:(o.t.startsWith(ws[0])?3:0)+(o.t.includes(q)?2:0)+(o.s.lab?-1:0)})).sort((a,b)=>b.sc-a.sc).slice(0,30).map(o=>o.s);
 const secs=q?CATS.filter(c=>ws.every(w=>norm(c[1]+' '+catName(c[0])).includes(w))):[];
 items=[];let h='';
 if(acts.length){h+=`<div class="gh">${X('Buyruqlar','Команды','Commands')}</div>`;acts.forEach(a=>{items.push({go:a.go});h+=row(a.ic,a.n(),a.d(),'',raw);});}
 if(secs.length){h+=`<div class="gh">${X('Bo‘limlar','Разделы','Sections')}</div>`;secs.forEach(c=>{items.push({go:()=>{location.hash='#/b/'+c[0];}});h+=row('§',catName(c[0]),`${TOP.filter(s=>s.cat===c[0]).length} ${X('mavzu','тем','topics')}`,'',raw);});}
 if(tops.length){h+=`<div class="gh">${q?X('Mavzular','Темы','Topics'):(Object.keys(P.seen).length?X('Yaqinda ko‘rilgan','Недавние','Recent'):X('Mavzular','Темы','Topics'))}</div>`;tops.forEach(s=>{items.push({go:()=>{location.hash='#'+s.id;}});h+=row(s.lab?'🔬':(window.__cats&&(CATS.find(c=>c[0]===s.cat)||[''])[0]?symOf(s.cat):'•'),TR(s.title),`${TR(s.short)} · ${catName(s.cat)}`,P.seen[s.id]?'<span class="ok">✓</span>':'',raw);});}
 if(!items.length)h=`<div class="em">${X('Hech narsa topilmadi. Boshqa so‘z bilan urinib ko‘ring.','Ничего не найдено. Попробуйте другое слово.','Nothing found. Try another word.')}</div>`;
 ls.innerHTML=h;ls.querySelectorAll('.it').forEach((b,i)=>{b.onclick=()=>run(items[i]);b.onmousemove=()=>{if(sel!==i){sel=i;hi(false);}};});hi(false);}
const SYM={kin:'v',din:'F',sta:'M',saq:'p',teb:'λ',mol:'N',trm:'Q',est:'q',tok:'I',mag:'B',opt:'n',rel:'c',kva:'ψ',yad:'hν'};
const symOf=c=>SYM[c]||'•';
function row(ic,t,d,extra,raw){return `<button type="button" class="it" role="option"><span class="ic">${esc(ic)}</span><span class="tx"><b>${mark(t,norm(raw).trim())}</b><small>${esc(d)}</small></span>${extra}</button>`;}
function hi(scroll){const bs=pal.querySelectorAll('.it');bs.forEach((b,i)=>b.setAttribute('aria-selected',i===sel));if(scroll&&bs[sel])bs[sel].scrollIntoView({block:'nearest'});}
function run(it){if(!it)return;closePal();const bt=document.getElementById('battle');if(bt&&!bt.hidden&&it.go!==ACTS[0].go){try{history.back();}catch(e){}setTimeout(it.go,60);}else it.go();}
addEventListener('keydown',e=>{const tag=(e.target&&e.target.tagName)||'';const typing=/INPUT|TEXTAREA|SELECT/.test(tag)||(e.target&&e.target.isContentEditable);
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal?closePal():openPal();return;}
 if(pal)return;const bt=document.getElementById('battle');if(bt&&!bt.hidden)return;
 if(e.key==='/'&&!typing){e.preventDefault();openPal();return;}
 if(e.key==='Escape'&&document.body.classList.contains('jf-present')){togglePresent(false);return;}
 if(!typing&&(e.key==='p'||e.key==='P')&&!e.ctrlKey&&!e.metaKey&&document.body.dataset.view==='lab'){togglePresent();}
},true);

/* ---------- profil ---------- */
let prof=null;
function openProfile(){if(prof)return;const r=rank();const pc=r.next?(P.xp-r.cur)/(r.next-r.cur)*100:100;const n=TOP.filter(s=>P.seen[s.id]).length,na=Object.keys(P.ach).length;
 prof=document.createElement('div');prof.className='jf-ov';prof.dataset.notr='1';
 prof.innerHTML=`<div class="jf-prof" role="dialog" aria-modal="true"><button type="button" class="x" aria-label="${esc(X('Yopish','Закрыть','Close'))}">✕</button>
 <div class="hd"><span class="big">${r.ic}</span><div style="flex:1;min-width:0"><div class="mu">${X('Sizning unvoningiz','Ваше звание','Your rank')}</div><h3>${esc(r.name)}</h3><div class="xb"><i style="width:${pc.toFixed(1)}%"></i></div><div class="mu">${P.xp} XP${r.next?` · ${X('keyingi unvon','следующее звание','next rank')}: ${RANKS[r.k+1][2]} ${esc(XA(RANKS[r.k+1][1]))} (${r.next} XP)`:''}</div></div></div>
 <div class="mu">${X('Mavzu ochilganda +10 XP, laboratoriya +15 XP, yutuq +30 XP, bellashuvda ochkolaringizning o‘ndan biri va g‘alaba uchun +50 XP.','За новую тему +10 XP, лабораторию +15 XP, достижение +30 XP, в битве десятая часть очков и +50 XP за победу.','New topic +10 XP, lab +15 XP, achievement +30 XP; in battles a tenth of your points plus 50 XP for a win.')}</div>
 <h4>${X('O‘rganilgan mavzular','Изученные темы','Topics explored')}: ${n} / ${TOP.length}</h4>
 <div class="jf-secs">${CATS.map(([id])=>{const t=TOP.filter(s=>s.cat===id).length,k=seenIn(id);const c=(document.querySelector(`#cards .card[data-cat="${id}"]`)||{style:{getPropertyValue:()=>''}}).style;return `<div style="--c1:${c.getPropertyValue('--c1')||'var(--accent)'};--c2:${c.getPropertyValue('--c2')||'var(--violet)'}"><span class="s">${symOf(id)}</span><span>${esc(catName(id))}</span><span class="mu">${k}/${t}</span><span class="b"><i style="width:${t?k/t*100:0}%"></i></span></div>`;}).join('')}</div>
 <h4>${X('Yutuqlar','Достижения','Achievements')}: ${na} / ${ACH.length}</h4>
 <div class="jf-achs">${ACH.map(a=>`<div class="jf-ach ${P.ach[a[0]]?'on':'off'}"><span class="i">${a[1]}</span><b>${esc(XA(a[2]))}</b><small>${esc(XA(a[3]))}</small></div>`).join('')}</div>
 <button type="button" class="jf-rst">${X('Progressni tozalash','Сбросить прогресс','Reset progress')}</button></div>`;
 document.body.appendChild(prof);const cl=()=>{if(prof){prof.remove();prof=null;}};prof.querySelector('.x').onclick=cl;prof.onclick=e=>{if(e.target===prof)cl();};
 prof.querySelector('.jf-rst').onclick=()=>{if(confirm(X('Barcha XP, yutuqlar va progress o‘chiriladi. Davom etasizmi?','Все XP, достижения и прогресс будут удалены. Продолжить?','All XP, achievements and progress will be erased. Continue?'))){P.xp=0;P.seen={};P.ach={};P.n={};save();refreshChips();decorate();cl();}};
 const onK=e=>{if(e.key==='Escape'&&prof){cl();removeEventListener('keydown',onK,true);e.stopPropagation();}};addEventListener('keydown',onK,true);}

/* ---------- boshlash ---------- */
decorate();onNav();
window.__jf={openPal,openProfile,togglePresent,P,visit};
})();
