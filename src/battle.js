/* ⚔️ Bellashuv: sun’iy intellekt yoki do‘st bilan fizika o‘yinlari */
(()=>{
const LG=window.LANG||'uz';const SIMS=window.__sims||[],CATS=window.__cats||[];
const X=(u,r,e)=>LG==='ru'?(r??u):LG==='en'?(e??u):u;
const TR=s=>{try{return window.tr?window.tr(String(s)):String(s);}catch(e){return String(s);}};
const XA=a=>Array.isArray(a)?X(a[0],a[1],a[2]):TR(a);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rnd=(a,b)=>a+Math.random()*(b-a),shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const RMO=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k,d){try{const v=localStorage.getItem('jf-bt-'+k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem('jf-bt-'+k,JSON.stringify(v));}catch(e){}}};

/* ---------- o‘yin turlari ---------- */
const TYPES=[
 {id:'quiz',ic:'❓',n:['Viktorina','Викторина','Quiz'],d:['Fizika savollariga to‘g‘ri javobni toping','Найдите верный ответ на вопросы по физике','Pick the right answer to physics questions'],mcq:1},
 {id:'formula',ic:'∑',n:['Formulani top','Найди формулу','Find the formula'],d:['Yashirilgan belgini yoki mavzu formulasini toping','Найдите скрытый символ или формулу темы','Find the hidden symbol or a topic’s formula'],mcq:1},
 {id:'drag',ic:'🧩',n:['Joyiga qo‘y','Расставь по местам','Put it in place'],d:['Kartochkalarni sudrab, juftini toping','Перетащите карточки к их парам','Drag the cards onto their matches'],mcq:0},
 {id:'build',ic:'🛠️',n:['Modelni yig‘','Собери модель','Build the model'],d:['Zanjir, richag, linza, ko‘zgu… shunday yig‘ingki, shart bajarilsin','Цепь, рычаг, линза, зеркала… соберите так, чтобы выполнилось условие','Circuits, levers, lenses, mirrors… assemble them to meet the goal'],mcq:0},
 {id:'calc',ic:'⚡',n:['Tez hisob','Быстрый расчёт','Quick maths'],d:['Masalani tez yeching','Быстро решите задачу','Solve the problem fast'],mcq:1},
 {id:'tf',ic:'✔︎',n:['To‘g‘ri yoki noto‘g‘ri','Верно или нет','True or false'],d:['Gapni tez baholang','Быстро оцените утверждение','Judge the statement quickly'],mcq:1},
 {id:'topic',ic:'🔭',n:['Mavzuni top','Угадай тему','Guess the topic'],d:['Tavsif qaysi mavzuga tegishli?','К какой теме относится описание?','Which topic does the description belong to?'],mcq:1},
 {id:'memory',ic:'🃏',n:['Xotira juftliklari','Пары на память','Memory pairs'],d:['Kartalarni ochib, juftlarni toping','Открывайте карты и находите пары','Flip cards and find the pairs'],mcq:0},
 {id:'mix',ic:'🎲',n:['Aralash','Микс','Mix'],d:['Har raundda boshqa o‘yin','В каждом раунде новая игра','A different game each round'],mcq:1}
];
const tname=id=>XA((TYPES.find(t=>t.id===id)||TYPES[0]).n);
const AIN=[['Atom','Атом','Atom'],['Kvark','Кварк','Quark'],['Eynshteyn-9000','Эйнштейн-9000','Einstein-9000']];
const DIFF=[['Oson','Легко','Easy'],['O‘rta','Средне','Medium'],['Qiyin','Сложно','Hard']];
const AIACC=[0.55,0.75,0.92],AIT=[[7,13],[4.5,10],[2.5,6.5]],AIMEM=[0.3,0.6,0.92];
const KEYS=[['1','2','3','4'],['7','8','9','0']],PWK=[['q','w','e'],['i','o','p']];
const TAUNT={win:[['Bip-bop! Bu oson edi 😎','Бип-боп! Это было легко 😎','Beep-boop! Too easy 😎'],['Hisob-kitob tugadi ✓','Расчёт завершён ✓','Calculation complete ✓'],['Protsessorim qizib ketdi 🔥','Мой процессор раскалился 🔥','My processor is on fire 🔥'],['Fizika — mening ona tilim 🤖','Физика — мой родной язык 🤖','Physics is my mother tongue 🤖']],
 miss:[['Xato... qayta yuklanmoqda 🔄','Ошибка... перезагрузка 🔄','Error... rebooting 🔄'],['Bu savol buzilgan bo‘lsa kerak 🤔','Наверное, вопрос сломан 🤔','That question must be broken 🤔'],['Datchiklarim aldadi 😵','Датчики меня подвели 😵','My sensors lied to me 😵']],
 lose:[['Voy! Siz tez ekansiz ⚡','Ого! Вы быстрый ⚡','Whoa, you’re fast ⚡'],['Keyingisini men olaman 😤','Следующий мой 😤','The next one is mine 😤'],['Yaxshi zarba! 👏','Хороший удар! 👏','Nice hit! 👏']],
 freeze:[['Muzlang! ❄️ Hi-hi','Замри! ❄️ Хи-хи','Freeze! ❄️ Hee-hee'],['Mutlaq nolga xush kelibsiz 🥶','Добро пожаловать в абсолютный ноль 🥶','Welcome to absolute zero 🥶']],
 frozen:[['Brrr... tizim muzladi 🥶','Бррр... система замёрзла 🥶','Brrr... system frozen 🥶'],['Sovuq! Kristall panjaram qotdi ❄️','Холодно! Моя решётка застыла ❄️','Cold! My crystal lattice froze ❄️']]};
const PWN={h:['50/50','50/50','50/50'],f:['❄️ Muzlat','❄️ Заморозка','❄️ Freeze'],d:['×2 Ochko','×2 Очки','×2 Points']};

/* ---------- sozlamalar ---------- */
const st=Object.assign({opp:'ai',diff:1,type:'quiz',cat:'',rounds:10,snd:true,n1:'',n2:''},store.get('cfg',{}));
const saveCfg=()=>store.set('cfg',st);
const pname=i=>(i===0?st.n1:st.n2).trim()||X(`${i+1}-o‘yinchi`,`Игрок ${i+1}`,`Player ${i+1}`);

/* ---------- ovoz ---------- */
let AC=null;
function beep(seq){if(!st.snd)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t0=AC.currentTime;seq.forEach(([f,d,w,v],i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=w||'sine';o.frequency.value=f;const s=t0+seq.slice(0,i).reduce((a,b)=>a+b[1],0);g.gain.setValueAtTime(0.0001,s);g.gain.exponentialRampToValueAtTime(v||0.12,s+0.015);g.gain.exponentialRampToValueAtTime(0.0001,s+d);o.connect(g).connect(AC.destination);o.start(s);o.stop(s+d+0.02);});}catch(e){}}
const SND={ok:(k=0)=>{const m=1+Math.min(k,8)*0.06;beep([[523*m,.08],[659*m,.08],[784*m,.09],[1047*m,.16]]);},go:()=>beep([[392,.08],[523,.08],[784,.22,'triangle',.14]]),pw:()=>beep([[300,.05,'triangle'],[600,.05,'triangle'],[1200,.12,'triangle',.08]]),frz:()=>beep([[1800,.06,'sine',.05],[1500,.06,'sine',.05],[1200,.06,'sine',.05],[900,.15,'sine',.05]]),whoosh:()=>beep([[120,.25,'sawtooth',.04],[90,.3,'triangle',.06]]),bad:()=>beep([[180,.22,'sawtooth',.07]]),tick:()=>beep([[880,.05,'square',.03]]),win:()=>beep([[523,.12],[659,.12],[784,.12],[1047,.32]]),flip:()=>beep([[660,.04,'triangle',.05]])};

/* ---------- uslub ---------- */
const css=`
.bt{position:fixed;inset:0;z-index:60;overflow:auto;background:var(--bg);color:var(--ink);font-family:var(--f-body,"IBM Plex Sans",system-ui,sans-serif);-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
.bt::before{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(60% 50% at 12% 0%,var(--aur1),transparent 70%),radial-gradient(50% 45% at 95% 10%,var(--aur2),transparent 70%),radial-gradient(60% 50% at 50% 110%,var(--aur3),transparent 70%)}
.bt-in{position:relative;max-width:1080px;margin:0 auto;padding:18px 16px 48px}
.bt-top{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.bt-x{border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:999px;padding:8px 14px;font:600 14px/1 "IBM Plex Sans",system-ui,sans-serif;cursor:pointer;min-height:38px}
.bt-x:hover{border-color:var(--accent)}
.bt-top .sp{flex:1}
.bt-h{font-family:"Bricolage Grotesque",var(--f-body,sans-serif);font-weight:700;font-size:clamp(34px,6vw,58px);line-height:1;margin:6px 0 8px;letter-spacing:-.02em}
.bt-h span{background:linear-gradient(120deg,var(--accent),var(--violet),var(--warm));-webkit-background-clip:text;background-clip:text;color:transparent}
.bt-sub{color:var(--muted);font-size:16px;max-width:640px;margin:0 0 22px}
.bt-rules{display:flex;flex-wrap:wrap;gap:8px;margin:-6px 0 6px}.bt-rules span{display:inline-flex;gap:8px;align-items:center;font-size:13px;color:var(--muted);background:var(--glass);border:1px solid var(--edge);border-radius:999px;padding:6px 12px 6px 6px}.bt-rules b{display:grid;place-items:center;min-width:26px;height:26px;border-radius:50%;background:var(--panel);color:var(--ink);font-size:13px}
.bt-sec{margin:22px 0 10px;font:600 12px/1 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.bt-opp{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.bt-card{position:relative;text-align:left;border:1.5px solid var(--line);background:var(--panel);color:var(--ink);border-radius:18px;padding:16px;cursor:pointer;display:flex;flex-direction:column;gap:6px;transition:border-color .2s,transform .2s,box-shadow .2s;font:inherit}
.bt-card:hover{transform:translateY(-2px);border-color:var(--edge)}
.bt-card[aria-pressed="true"]{border-color:var(--accent);box-shadow:0 0 0 3px var(--glowc),0 14px 30px -18px var(--glowc)}
.bt-card .ic{font-size:30px;line-height:1}
.bt-card b{font-size:17px}
.bt-card small{color:var(--muted);font-size:13px;line-height:1.35}
.bt-seg{display:inline-flex;flex-wrap:wrap;gap:4px;padding:4px;border:1px solid var(--line);border-radius:12px;background:var(--panel)}
.bt-seg button{border:0;background:none;color:var(--muted);font:600 14px/1 "IBM Plex Sans",system-ui,sans-serif;padding:9px 14px;border-radius:9px;cursor:pointer;min-height:36px}
.bt-seg button[aria-pressed="true"]{background:var(--accent);color:var(--onaccent)}
.bt-names{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.bt-names input,.bt-sel{border:1px solid var(--line);background:var(--bg);color:var(--ink);border-radius:10px;padding:9px 11px;font:15px "IBM Plex Sans",system-ui,sans-serif;min-width:0;flex:1}
.bt-types{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.bt-row{display:flex;flex-wrap:wrap;gap:16px 26px;align-items:flex-end}
.bt-row>div{display:flex;flex-direction:column;gap:8px}
.bt-row label{font-size:13px;color:var(--muted)}
.bt-go{margin-top:26px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.bt-big{border:0;border-radius:16px;padding:16px 30px;font:700 19px/1 "Bricolage Grotesque","IBM Plex Sans",system-ui,sans-serif;color:#fff;background:linear-gradient(135deg,var(--accent),var(--violet));cursor:pointer;box-shadow:0 14px 34px -14px var(--glowc);transition:transform .15s}
.bt-big:hover{transform:translateY(-2px)}
.bt-stat{color:var(--muted);font-size:14px}
.bt-sb{position:sticky;top:0;z-index:3;display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;padding:10px;margin:-6px -6px 14px;border-radius:20px;background:var(--glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--edge)}
.bt-pl{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:14px;border:1.5px solid transparent;min-width:0;transition:border-color .25s,background .25s}
.bt-pl.p1{flex-direction:row-reverse;text-align:right}
.bt-pl .av{font-size:28px;line-height:1}
.bt-pl .nm{display:flex;flex-direction:column;min-width:0}
.bt-pl b{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bt-pl small{font-size:12px;color:var(--muted);min-height:15px}
.bt-pl strong{margin-left:auto;font:700 28px/1 "IBM Plex Mono",ui-monospace,monospace;font-variant-numeric:tabular-nums}
.bt-pl.p1 strong{margin-left:0;margin-right:auto}
.bt-pl.p0 strong{color:var(--accent)}.bt-pl.p1 strong{color:var(--warm)}
.bt-pl.turn{border-color:currentColor;background:var(--panel)}
.bt-pl.p0.turn{color:var(--accent)}.bt-pl.p1.turn{color:var(--warm)}
.bt-pl.turn b{color:var(--ink)}
.bt-mid{display:flex;flex-direction:column;align-items:center;gap:4px}
.bt-ring{--p:1;width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--accent) calc(var(--p)*360deg),var(--line) 0);transition:background .1s}
.bt-ring.low{background:conic-gradient(var(--red) calc(var(--p)*360deg),var(--line) 0)}
.bt-ring span{width:44px;height:44px;border-radius:50%;background:var(--panel);display:grid;place-items:center;font:700 17px/1 "IBM Plex Mono",monospace}
.bt-mid small{font:500 12px/1 "IBM Plex Mono",monospace;color:var(--muted);white-space:nowrap}
.bt-stage{display:grid;gap:14px;grid-template-columns:minmax(0,1fr);grid-template-areas:"q" "a"}
.bt-stage.two{grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-areas:"q q" "a b"}
.bt-q{grid-area:q;background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:20px 22px;animation:btIn .35s ease both}
.bt-tag{display:inline-flex;gap:6px;align-items:center;font:600 12px/1 "IBM Plex Mono",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--violet);background:color-mix(in srgb,var(--violet) 12%,transparent);padding:6px 10px;border-radius:999px;margin-bottom:12px}
.bt-qt{font-size:clamp(18px,2.6vw,23px);line-height:1.4;font-weight:500}
.bt-qt .pr{display:block;font-size:14px;color:var(--muted);margin-top:8px;font-weight:400}
.bt-qt .desc{font-size:17px;line-height:1.5}
.bt-f{font-family:"STIX Two Text","Times New Roman",serif;font-style:italic;font-size:clamp(30px,5vw,44px);margin:6px 0;letter-spacing:.01em}
.bt-f .blank{display:inline-block;min-width:1.2em;text-align:center;border-bottom:3px solid var(--accent);color:var(--accent);font-style:normal;animation:btPulse 1.2s ease-in-out infinite}
.bt-pane{grid-area:a;display:flex;flex-direction:column;gap:10px;min-width:0}
.bt-pane.p1{grid-area:b}
.bt-pn{display:none;font:600 13px/1 "IBM Plex Mono",monospace;color:var(--muted)}
.two .bt-pn{display:block}
.two .p0 .bt-pn{color:var(--accent)}.two .p1 .bt-pn{color:var(--warm)}
.bt-pq{display:none}
.bt-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.two .bt-opts{grid-template-columns:1fr}
.bt-opt{position:relative;display:flex;align-items:center;gap:12px;text-align:left;border:1.5px solid var(--line);background:var(--panel);color:var(--ink);border-radius:14px;padding:14px 16px;min-height:58px;font:500 16px/1.35 "IBM Plex Sans",system-ui,sans-serif;cursor:pointer;transition:transform .12s,border-color .2s,background .2s,opacity .2s;animation:btIn .35s ease both}
.bt-opt:hover:not(:disabled){border-color:var(--accent);transform:translateY(-1px)}
.p1 .bt-opt:hover:not(:disabled){border-color:var(--warm)}
.bt-opt kbd{flex:none;display:grid;place-items:center;width:26px;height:26px;border-radius:8px;border:1px solid var(--line);font:600 12px/1 "IBM Plex Mono",monospace;color:var(--muted);background:var(--bg)}
.bt-opt.fx span{font-family:"STIX Two Text","Times New Roman",serif;font-style:italic;font-size:21px}
.bt-opt:disabled{cursor:default}
.bt-opt.ok{border-color:var(--green);background:color-mix(in srgb,var(--green) 16%,var(--panel))}
.bt-opt.ok kbd{background:var(--green);border-color:var(--green);color:#fff}
.bt-opt.no{border-color:var(--red);background:color-mix(in srgb,var(--red) 13%,var(--panel));animation:btShake .35s}
.bt-opt.dim{opacity:.45}
.bt-opt .bot{position:absolute;right:10px;top:-9px;font-size:12px;background:var(--warm);color:#fff;border-radius:999px;padding:3px 8px;font-weight:600}
.bt-pane.locked .bt-opt:not(.no){opacity:.5}
.bt-toast{position:fixed;left:50%;bottom:9%;max-width:min(92vw,460px);transform:translate(-50%,0);z-index:70;padding:14px 22px;border-radius:16px;background:var(--panel);border:1.5px solid var(--green);font:700 20px/1.2 "Bricolage Grotesque","IBM Plex Sans",system-ui,sans-serif;box-shadow:0 20px 50px -20px rgba(0,0,0,.4);animation:btPop .5s cubic-bezier(.2,1.4,.4,1) both;pointer-events:none;text-align:center}
.bt-toast.miss{border-color:var(--line)}
.bt-dd{grid-area:a;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px;align-items:start}
.bt-rows{display:flex;flex-direction:column;gap:10px}
.bt-rowi{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:10px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:10px 10px 10px 14px;font-weight:500}
.bt-slot{min-height:46px;border:2px dashed var(--line);border-radius:12px;display:flex;align-items:center;justify-content:center;padding:4px;transition:border-color .2s,background .2s;cursor:pointer}
.bt-slot.hot{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,transparent)}
.bt-slot.ok{border-style:solid;border-color:var(--green)}
.bt-slot.no{border-style:solid;border-color:var(--red)}
.bt-tray{display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start;min-height:120px;padding:12px;border:1px solid var(--line);border-radius:16px;background:var(--glass)}
.bt-chip{touch-action:none;user-select:none;-webkit-user-select:none;border:1.5px solid var(--edge);background:var(--panel);color:var(--ink);border-radius:11px;padding:10px 13px;font:600 15px/1.25 "IBM Plex Sans",system-ui,sans-serif;cursor:grab;box-shadow:0 6px 16px -12px rgba(0,0,0,.4);transition:transform .12s,border-color .2s;max-width:100%}
.bt-chip.fx{font-family:"STIX Two Text","Times New Roman",serif;font-style:italic;font-size:19px}
.bt-chip.sel{border-color:var(--accent);box-shadow:0 0 0 3px var(--glowc)}
.bt-slot .bt-chip{width:100%;text-align:center}
.bt-ghost{position:fixed;z-index:80;pointer-events:none;transform:translate(-50%,-50%) rotate(-3deg) scale(1.06);opacity:.95}
.bt-ddbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:12px}
.bt-btn{border:1.5px solid var(--line);background:var(--panel);color:var(--ink);border-radius:12px;padding:11px 18px;font:600 15px/1 "IBM Plex Sans",system-ui,sans-serif;cursor:pointer;min-height:44px}
.bt-btn.pri{background:linear-gradient(135deg,var(--accent),var(--violet));border-color:transparent;color:#fff}
.bt-btn:disabled{opacity:.45;cursor:default}
.bt-note{color:var(--muted);font-size:14px}
.bt-mem{grid-area:a;display:grid;gap:10px;width:100%;max-width:760px;justify-self:center;grid-template-columns:repeat(var(--cols,4),minmax(0,1fr));perspective:900px}
.bt-mc{position:relative;aspect-ratio:4/3;border:0;padding:0;background:none;cursor:pointer;font:inherit;color:var(--ink)}
.bt-mc .in{position:absolute;inset:0;transition:transform .45s cubic-bezier(.3,.7,.3,1);transform-style:preserve-3d}
.bt-mc.up .in,.bt-mc.done .in{transform:rotateY(180deg)}
.bt-mc .fc,.bt-mc .bk{position:absolute;inset:0;border-radius:14px;display:grid;place-items:center;padding:6px;backface-visibility:hidden;-webkit-backface-visibility:hidden;text-align:center}
.bt-mc .bk{background:linear-gradient(135deg,var(--accent),var(--violet));color:#fff;font:700 26px/1 "STIX Two Text",serif;box-shadow:inset 0 0 0 2px rgba(255,255,255,.18)}
.bt-mc .fc{transform:rotateY(180deg);background:var(--panel);border:1.5px solid var(--line);font-weight:600;font-size:clamp(12px,1.7vw,16px);line-height:1.2}
.bt-mc .fc.u{font:700 clamp(17px,2.6vw,24px)/1 "IBM Plex Mono",monospace;color:var(--violet)}
.bt-mc.done .fc{border-color:var(--green);background:color-mix(in srgb,var(--green) 14%,var(--panel))}
.bt-mc.done.w1 .fc{border-color:var(--warm);background:color-mix(in srgb,var(--warm) 14%,var(--panel))}
.bt-mc.done.w0 .fc{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,var(--panel))}
.bt-turn{grid-area:q;text-align:center;font:700 20px/1.2 "Bricolage Grotesque","IBM Plex Sans",system-ui,sans-serif}
.bt-inter{text-align:center;padding:50px 16px;display:flex;flex-direction:column;align-items:center;gap:16px;animation:btIn .35s ease both}
.bt-inter .av{font-size:64px}
.bt-inter h3{margin:0;font:700 30px/1.2 "Bricolage Grotesque","IBM Plex Sans",system-ui,sans-serif}
.bt-res{text-align:center;padding:24px 0;display:flex;flex-direction:column;align-items:center;gap:14px}
.bt-res .cup{font-size:84px;animation:btPop .7s cubic-bezier(.2,1.4,.4,1) both}
.bt-res h3{margin:0;font:700 clamp(28px,5vw,44px)/1.1 "Bricolage Grotesque","IBM Plex Sans",system-ui,sans-serif}
.bt-final{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin:8px 0}
.bt-final>div{min-width:170px;background:var(--panel);border:1.5px solid var(--line);border-radius:18px;padding:16px 18px;display:flex;flex-direction:column;gap:6px;align-items:center}
.bt-final>div.win{border-color:var(--green);box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 25%,transparent)}
.bt-final strong{font:700 40px/1 "IBM Plex Mono",monospace}
.bt-final small{color:var(--muted)}
.bt-conf{position:fixed;inset:0;pointer-events:none;z-index:75}
.bt-entry{display:inline-flex;align-items:center;gap:8px}
.topbar .bt-tb{margin-left:auto;border:1px solid var(--edge);background:var(--glass);color:var(--ink);border-radius:999px;padding:7px 13px;font:600 13px/1 "IBM Plex Sans",system-ui,sans-serif;cursor:pointer;min-height:32px;white-space:nowrap}
.topbar .bt-tb:hover{border-color:var(--accent)}
.topbar .bt-tb+.langsw{margin-left:8px}
.card.btcard{grid-column:1/-1;min-height:0;flex-direction:row;align-items:center;gap:18px;background:linear-gradient(120deg,color-mix(in srgb,var(--accent) 16%,var(--glass)),color-mix(in srgb,var(--warm) 14%,var(--glass)))}
.card.btcard .sym{font-size:46px;line-height:1;background:none!important;-webkit-text-fill-color:initial!important;color:inherit!important;filter:none!important}
.card.btcard .tx{display:flex;flex-direction:column;gap:4px;flex:1}
.card.btcard .tx small{display:block!important;color:var(--muted)}
.bt-tug{position:relative;height:8px;border-radius:99px;background:var(--line);margin:-4px 6px 18px}
.bt-tug i,.bt-tug b{position:absolute;top:0;bottom:0;transition:width .7s cubic-bezier(.2,.8,.2,1)}
.bt-tug i{left:0;width:50%;border-radius:99px 0 0 99px;background:linear-gradient(90deg,var(--accent),var(--violet))}
.bt-tug b{right:0;width:50%;border-radius:0 99px 99px 0;background:linear-gradient(90deg,var(--warm),var(--red))}
.bt-tug em{position:absolute;top:50%;left:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px var(--violet),0 0 18px 5px var(--glowc);transition:left .7s cubic-bezier(.2,.8,.2,1)}
.bt-pl{position:relative}
.bt-sk{display:inline-flex;align-items:center;gap:2px;margin-left:6px;font:700 11px/1 "IBM Plex Mono",monospace;color:#fff;background:linear-gradient(135deg,#ff9a3c,#ff3d5a);padding:3px 7px;border-radius:99px;vertical-align:2px;animation:btPopS .35s cubic-bezier(.2,1.6,.4,1)}
.bt-sk:empty{display:none}
.bt-pl strong.bump{animation:btBump .5s cubic-bezier(.2,1.4,.4,1)}
.bt-pl.frozen::after{content:"❄️";position:absolute;inset:0;display:grid;place-items:center;font-size:26px;border-radius:14px;background:rgba(150,205,255,.35);border:2px solid #9fd3ff;backdrop-filter:blur(2px);animation:btIn .3s}
.bt-ring.beat{animation:btBeat .9s ease-in-out infinite}
.bt-pw{display:flex;gap:8px}
.bt-pw button{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1.5px dashed var(--edge);background:var(--glass);color:var(--ink);border-radius:12px;padding:8px 6px;font:600 13px/1 "IBM Plex Sans",system-ui,sans-serif;cursor:pointer;min-height:38px;transition:transform .15s,border-color .2s,opacity .2s}
.bt-pw button:hover:not(:disabled){transform:translateY(-1px);border-color:var(--accent);border-style:solid}
.bt-pw button:disabled{opacity:.3;cursor:default;text-decoration:line-through}
.bt-pw button.on{border-style:solid;border-color:var(--warm);background:color-mix(in srgb,var(--warm) 16%,var(--panel))}
.bt-pw kbd{font:500 10px/1 "IBM Plex Mono",monospace;color:var(--muted);border:1px solid var(--line);border-radius:5px;padding:2px 4px}
.bt-opt.gone{opacity:.12;pointer-events:none;transform:scale(.97)}
.bt-pane{position:relative}
.bt-pane.frozen .bt-opts{filter:blur(2px) saturate(.4);pointer-events:none}
.bt-pane.frozen::after{content:"❄️";position:absolute;inset:-6px;display:grid;place-items:center;font-size:48px;border-radius:18px;background:rgba(150,205,255,.28);border:2px solid #9fd3ff;animation:btIn .3s;pointer-events:none}
.bt-fly{position:fixed;z-index:85;font:800 24px/1 "Bricolage Grotesque","IBM Plex Sans",sans-serif;pointer-events:none;transition:transform .8s cubic-bezier(.55,-0.35,.6,1),opacity .8s;text-shadow:0 2px 14px rgba(0,0,0,.25);white-space:nowrap}
.bt-spark{position:fixed;z-index:84;width:9px;height:9px;margin:-4px 0 0 -4px;border-radius:50%;pointer-events:none;transition:transform .65s cubic-bezier(.1,.7,.3,1),opacity .65s}
.bt-flash{position:fixed;inset:0;z-index:62;pointer-events:none;animation:btFlash .55s ease-out forwards}
.bt-flash.g{background:radial-gradient(ellipse at center,transparent 50%,color-mix(in srgb,var(--green) 40%,transparent))}
.bt-flash.r{background:radial-gradient(ellipse at center,transparent 50%,color-mix(in srgb,var(--red) 40%,transparent))}
.bt-in.shake{animation:btShake .38s}
.bt-stage.out>*{animation:btOut .23s ease forwards!important}
.bt-bub{position:absolute;top:calc(100% + 8px);right:6px;z-index:6;max-width:230px;background:var(--panel);color:var(--ink);border:1.5px solid var(--warm);border-radius:14px 4px 14px 14px;padding:8px 11px;font:500 13px/1.3 "IBM Plex Sans",system-ui,sans-serif;text-align:left;box-shadow:0 14px 30px -14px rgba(0,0,0,.45);animation:btBub .35s cubic-bezier(.2,1.4,.4,1);white-space:normal}
.bt-vs{position:fixed;inset:0;z-index:70;display:grid;place-items:center;text-align:center;background:color-mix(in srgb,var(--bg) 80%,transparent);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);cursor:pointer;overflow:hidden}
.bt-vs::before{content:"";position:absolute;inset:-50%;background:conic-gradient(from 0deg,transparent,color-mix(in srgb,var(--accent) 22%,transparent),transparent 30%,color-mix(in srgb,var(--warm) 22%,transparent),transparent 60%);animation:btSpin 6s linear infinite}
.bt-vs>div{position:relative}
.bt-vs .row{display:flex;align-items:center;justify-content:center;gap:clamp(14px,6vw,70px)}
.bt-vs .pp{display:flex;flex-direction:column;align-items:center;gap:10px;font:700 clamp(17px,2.6vw,24px)/1.1 "Bricolage Grotesque","IBM Plex Sans",sans-serif;max-width:34vw;overflow-wrap:anywhere}
.bt-vs .ava{display:grid;place-items:center;width:clamp(76px,14vw,120px);height:clamp(76px,14vw,120px);border-radius:50%;font-size:clamp(40px,7vw,64px);background:var(--panel);box-shadow:0 0 0 4px var(--accent),0 0 50px -6px var(--accent)}
.bt-vs .ava.p1{box-shadow:0 0 0 4px var(--warm),0 0 50px -6px var(--warm)}
.bt-vs .l{animation:btL .65s cubic-bezier(.2,1.25,.3,1) both}.bt-vs .r{animation:btR .65s cubic-bezier(.2,1.25,.3,1) both}
.bt-vs .v{font:800 clamp(52px,11vw,110px)/1 "Bricolage Grotesque","IBM Plex Sans",sans-serif;background:linear-gradient(135deg,var(--accent),var(--violet),var(--warm));-webkit-background-clip:text;background-clip:text;color:transparent;animation:btVs .75s .3s cubic-bezier(.2,1.6,.4,1) both;filter:drop-shadow(0 6px 26px var(--glowc))}
.bt-vs .meta{margin-top:18px;font:600 13px/1 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);animation:btIn .5s .6s both}
.bt-vs .cdw{height:96px;display:grid;place-items:center;margin-top:16px}
.bt-vs .cd{font:800 clamp(56px,10vw,88px)/1 "Bricolage Grotesque","IBM Plex Sans",sans-serif;color:var(--ink);animation:btCd .7s cubic-bezier(.2,1.2,.4,1) both}
.bt-vs .cd.go{background:linear-gradient(135deg,var(--green),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent}
.bt-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px 8px;width:100%;margin-top:4px;font-size:11px;color:var(--muted);text-align:center}
.bt-stats b{display:block;font:700 16px/1.2 "IBM Plex Mono",monospace;color:var(--ink)}
.bt-xp{width:min(460px,100%);background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;text-align:left}
.bt-xp .top{display:flex;justify-content:space-between;gap:10px;font-weight:600}
.bt-xp .bar{height:10px;border-radius:99px;background:var(--line);overflow:hidden}
.bt-xp .bar i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,var(--accent),var(--violet),var(--warm));transition:width 1.2s cubic-bezier(.2,.8,.2,1)}
.bt-mc.done .in{animation:btMatch .5s ease}
@keyframes btFlash{from{opacity:1}to{opacity:0}}
@keyframes btBump{40%{transform:scale(1.4)}}
@keyframes btBeat{0%,100%{transform:scale(1)}20%{transform:scale(1.13)}}
@keyframes btOut{to{opacity:0;transform:translateY(-12px) scale(.98)}}
@keyframes btL{from{opacity:0;transform:translateX(-55vw) rotate(-10deg)}}
@keyframes btR{from{opacity:0;transform:translateX(55vw) rotate(10deg)}}
@keyframes btVs{from{opacity:0;transform:scale(3.2) rotate(-25deg)}}
@keyframes btCd{0%{opacity:0;transform:scale(2.2)}60%{opacity:1;transform:scale(.95)}100%{opacity:1;transform:scale(1)}}
@keyframes btSpin{to{transform:rotate(360deg)}}
@keyframes btPopS{from{transform:scale(0)}}
@keyframes btBub{from{opacity:0;transform:translateY(-6px) scale(.8)}}
@keyframes btMatch{0%{transform:rotateY(180deg) scale(1)}50%{transform:rotateY(180deg) scale(1.08)}100%{transform:rotateY(180deg) scale(1)}}
@keyframes btIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes btPop{from{opacity:0;transform:translate(-50%,10px) scale(.7)}to{opacity:1;transform:translate(-50%,0) scale(1)}}
.bt-res .cup{animation-name:btCup}
@keyframes btCup{from{opacity:0;transform:scale(.4) rotate(-12deg)}to{opacity:1;transform:none}}
@keyframes btShake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
@keyframes btPulse{50%{opacity:.45}}
.bb{grid-area:a;display:grid;grid-template-columns:minmax(0,1.75fr) minmax(220px,1fr);gap:14px;align-items:start;animation:btIn .35s ease both}
.bb-q .bt-qt{font-size:clamp(17px,2.3vw,21px)}
.bb-hint{font:600 14px/1.3 "STIX Two Text","Times New Roman",serif;font-style:italic;color:var(--violet)}
.bb-sc{position:relative;aspect-ratio:2/1;border:1px solid var(--line);border-radius:18px;background:radial-gradient(120% 110% at 50% 0%,color-mix(in srgb,var(--accent) 8%,var(--panel)),var(--panel));overflow:hidden;transition:box-shadow .4s,border-color .4s}
.bb-sc::before{content:"";position:absolute;inset:0;background-image:radial-gradient(color-mix(in srgb,var(--ink) 9%,transparent) 1px,transparent 1.2px);background-size:20px 20px;pointer-events:none}
.bb-sc.win{border-color:var(--green);box-shadow:0 0 0 2px var(--green),0 18px 50px -18px var(--green)}
.bb-sc.sol{border-color:var(--warm)}
.bb-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.bb-ov{position:absolute;inset:0;transform-origin:50% 66.667%;transition:transform .7s cubic-bezier(.3,1.4,.5,1)}
.bb-rot{transform-origin:300px 200px;transition:transform .7s cubic-bezier(.3,1.4,.5,1)}
.bt-slot.bb-slot{position:absolute;min-height:0;padding:2px;border-radius:10px;background:color-mix(in srgb,var(--panel) 72%,transparent);border-width:2px}
.bb-slot.lens{border-radius:50%/22%;padding:1px}
.bb-slot.q{border-radius:50%}
.bb-slot.mirsl{border-radius:12px}
.bb-slot:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.bb-slot .bb-chip{width:100%;height:100%;padding:0 2px;display:grid;place-items:center;font-size:clamp(9px,1.45vw,14px);line-height:1.05;border-radius:8px;box-shadow:none;animation:bbDrop .35s cubic-bezier(.2,1.5,.4,1)}
@keyframes bbDrop{from{transform:scale(.6)}to{transform:none}}
.bb-side{display:flex;flex-direction:column;gap:10px;min-width:0}
.bb-goal{font:700 15px/1.3 "IBM Plex Mono",monospace;padding:10px 14px;border-radius:12px;background:color-mix(in srgb,var(--accent) 10%,var(--panel));border:1px solid color-mix(in srgb,var(--accent) 35%,var(--line))}
.bb-tray{min-height:70px;padding:10px;gap:8px}
.bb-read{display:grid;gap:4px;padding:10px 14px;border-radius:12px;background:var(--panel);border:1px solid var(--line);font:500 13.5px/1.35 "IBM Plex Mono",monospace;min-height:48px}
.bb-r{display:flex;justify-content:space-between;gap:10px}.bb-r span{color:var(--muted)}.bb-r b{font-weight:700;white-space:nowrap}.bb-r b.g{color:var(--green)}.bb-r b.r{color:var(--red)}
.bb-ok{position:absolute;right:12px;top:10px;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:var(--green);color:#fff;font:800 24px/1 sans-serif;transform:scale(0);transition:transform .45s cubic-bezier(.2,1.6,.4,1);box-shadow:0 8px 24px -8px var(--green)}
.bb-sc.win .bb-ok{transform:scale(1)}
.bb-chip.res{font-family:"IBM Plex Mono",monospace;font-weight:700;background:repeating-linear-gradient(90deg,transparent 0 14%,color-mix(in srgb,var(--warm) 22%,transparent) 14% 20%),var(--panel)}
.bb-chip.wt{color:#fff;border-color:#4b5363;background:linear-gradient(180deg,#9aa4b6,#5b6475);text-shadow:0 1px 1px rgba(0,0,0,.35)}
.bb-chip.lns{border-color:#6cb6ff;background:linear-gradient(90deg,rgba(108,182,255,.14),rgba(108,182,255,.38),rgba(108,182,255,.14)),var(--panel)}
.bb-chip .ls{display:none}.bb-slot .bb-chip .ls{display:inline}.bb-slot .bb-chip .lf{display:none}
.bb-slot.lens .bb-chip{border-radius:50%/22%;font-weight:700}
.bb-chip.mir{font:700 26px/1 system-ui,sans-serif;min-width:52px;color:#9fd4ff;background:linear-gradient(135deg,color-mix(in srgb,#9fd4ff 18%,var(--panel)),var(--panel))}
.bb-slot .bb-chip.mir{font-size:clamp(20px,4vw,40px)}
.bb-chip.qp,.bb-chip.qn{color:#fff;border-radius:50%;min-width:52px;min-height:52px;padding:6px;font:700 15px/1 "IBM Plex Mono",monospace}
.bb-chip.qp{background:radial-gradient(circle at 35% 30%,#ff9a9a,#e5484d 70%);border-color:#c83a3f}
.bb-chip.qn{background:radial-gradient(circle at 35% 30%,#9cc8ff,#3a7be0 70%);border-color:#2f63b8}
.bb-slot.q .bb-chip{border-radius:50%;min-width:0;min-height:0}
.bb-chip.cup{border-left:6px solid var(--cc);background:linear-gradient(90deg,color-mix(in srgb,var(--cc) 22%,var(--panel)),var(--panel))}
.bb-ghost{transform:translate(-50%,-50%) rotate(-4deg) scale(1.1)!important}
.bb-svg .t{fill:var(--muted);font:600 13px "IBM Plex Mono",monospace}
.bb-svg .w{stroke:var(--ink);stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round;opacity:.72}
.bb-svg .bat{stroke-width:3}.bb-svg .bat2{stroke-width:8;stroke-linecap:butt}
.bb-svg .nd{fill:var(--ink);opacity:.8}
.bb-svg .cur{stroke:var(--warm);stroke-width:4;fill:none;stroke-dasharray:2 14;stroke-linecap:round;animation:bbFlow var(--d,1s) linear infinite;filter:drop-shadow(0 0 3px var(--warm))}
@keyframes bbFlow{to{stroke-dashoffset:-32}}
.bb-svg .tk{stroke:var(--muted);stroke-width:1.5}
.bb-svg .fl{fill:color-mix(in srgb,var(--ink) 30%,var(--panel));stroke:var(--ink);stroke-width:1.5;opacity:.85}
.bb-svg .bm{fill:color-mix(in srgb,var(--warm) 55%,#8a5a2b);stroke:color-mix(in srgb,var(--ink) 50%,transparent);stroke-width:1}
.bb-svg .fx{fill:#5b6475;stroke:#3e4552}.bb-svg .fxt{fill:#fff}
.bb-svg .ax{stroke:var(--muted);stroke-width:1.5;stroke-dasharray:6 6}
.bb-svg .obj{stroke:var(--accent);stroke-width:4;fill:none;stroke-linecap:round;stroke-linejoin:round}
.bb-svg .scr{fill:color-mix(in srgb,var(--ink) 18%,var(--panel));stroke:var(--ink);stroke-width:1;opacity:.85}
.bb-svg .fp{fill:var(--violet)}
.bb-svg .ray{fill:none;stroke-width:2.2;stroke-linejoin:round;opacity:.9}
.bb-svg .r1{stroke:var(--warm)}.bb-svg .r2{stroke:var(--accent)}.bb-svg .r3{stroke:var(--violet)}
.bb-svg .img{stroke:var(--green);stroke-width:5;fill:none;stroke-linecap:round;filter:drop-shadow(0 0 6px var(--green))}
.bb-svg .blur{fill:var(--warm);opacity:.45}
.bb-svg .cell{fill:color-mix(in srgb,var(--ink) 4%,transparent);stroke:color-mix(in srgb,var(--ink) 12%,transparent);stroke-dasharray:4 5}
.bb-svg .las{fill:#2b2f3a;stroke:#ff3b5c;stroke-width:2}
.bb-svg .tgt circle{fill:none;stroke:#ff3b5c;stroke-width:3}.bb-svg .tgt circle:last-child{fill:#ff3b5c}
.bb-svg .tgt-on{fill:none;stroke:var(--green);stroke-width:4;animation:bbPing 1s ease-out infinite;transform-origin:center;transform-box:fill-box}
@keyframes bbPing{from{opacity:1;transform:scale(.6)}to{opacity:0;transform:scale(1.5)}}
.bb-svg .beam{stroke:#ff3b5c;stroke-width:4;fill:none;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 5px #ff3b5c);stroke-dasharray:1400;animation:bbBeam .6s ease-out both}
@keyframes bbBeam{from{stroke-dashoffset:1400}to{stroke-dashoffset:0}}
.bb-svg .pp{stroke:var(--ink);stroke-width:3}
.bb-svg .dim{stroke:var(--muted);stroke-width:1.5;fill:none}
.bb-svg .fln{stroke-width:2;opacity:.55}.bb-svg .fln.p{stroke:#e5484d}.bb-svg .fln.n{stroke:#3a7be0}
.bb-svg .ea,.bb-svg .eb,.bb-svg .en{fill:none;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round}
.bb-svg .ea{stroke:#e5484d}.bb-svg .eb{stroke:#3a7be0}.bb-svg .en{stroke:var(--violet);stroke-width:5}
.bb-svg .zero{fill:color-mix(in srgb,var(--green) 25%,transparent);stroke:var(--green);stroke-width:3}
.bb-svg .bk{fill:color-mix(in srgb,#9fd4ff 8%,transparent);stroke:var(--ink);stroke-width:3;opacity:.8}
.bb-svg .liq{transition:fill .5s}
.bb-svg .th{fill:var(--panel);stroke:var(--ink);stroke-width:1.5;opacity:.85}.bb-svg .thb{fill:#e5484d}
.bb-svg .hg{fill:#e5484d;transition:y .5s,height .5s}
.bb-svg .tline{stroke:var(--green);stroke-width:3;stroke-dasharray:4 3}
.bb-svg .stm{fill:none;stroke:var(--muted);stroke-width:2;opacity:0;animation:bbSteam 1.6s ease-in infinite}
@keyframes bbSteam{0%{opacity:0;transform:translateY(6px)}40%{opacity:.6}100%{opacity:0;transform:translateY(-14px)}}
.bb-svg .spr{fill:none;stroke:var(--ink);stroke-width:2.2;stroke-linejoin:round;opacity:.8}
.bb-svg .lvl{stroke:var(--green);stroke-width:2.5;stroke-dasharray:8 5}
@media (max-width:640px){.bb-svg .t{font-size:16px}.bb-svg .w{stroke-width:3.5}}
@media (max-width:760px){.bb{grid-template-columns:minmax(0,1fr)}.bb-side{display:grid;grid-template-columns:minmax(0,1fr);}.bb-goal{font-size:14px}}
@media (prefers-reduced-motion: reduce){.bt *{animation:none!important;transition:none!important}}
@media (max-width:860px){.bt-types{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:640px){
 .bt-in{padding:12px 12px 40px}
 .bt-opp{grid-template-columns:1fr}
 .bt-opts{grid-template-columns:1fr}
 .bt-sb{gap:4px;padding:6px}
 .bt-pl{padding:6px;gap:6px}.bt-pl .av{font-size:22px}.bt-pl strong{font-size:21px}.bt-pl b{font-size:13px}.bt-pl small{display:none}
 .bt-ring{width:46px;height:46px}.bt-ring span{width:37px;height:37px;font-size:15px}
 .bt-stage.two{grid-template-columns:minmax(0,1fr);grid-template-areas:"b" "q" "a"}
 .two .bt-pane.p1{transform:rotate(180deg)}
 .two .bt-pane.p1 .bt-pq{display:block;font-size:15px;line-height:1.35;padding:10px 12px;border-radius:12px;background:var(--panel);border:1px dashed var(--line)}
 .two .bt-pane.p1 .bt-pq .bt-f{font-size:24px}
 .two .bt-opt{min-height:48px;padding:10px 12px}
 .bt-dd{grid-template-columns:1fr}
 .bt-toast{font-size:16px;padding:10px 16px}
 .bt-pw button{font-size:12px;padding:7px 4px}.bt-pw kbd{display:none}
 .bt-stats{font-size:10px}.bt-stats b{font-size:14px}
 .bt-bub{max-width:170px;font-size:12px}
 .bt-rowi{grid-template-columns:1fr;gap:6px}
 .card.btcard{flex-direction:row}
 .topbar .bt-tb{padding:6px 9px}
}`;
const stEl=document.createElement('style');stEl.textContent=css;document.head.appendChild(stEl);

/* ---------- ildiz ---------- */
const root=document.createElement('section');root.className='bt';root.id='battle';root.hidden=true;root.dataset.notr='1';root.setAttribute('aria-label',X('Bellashuv','Битва','Battle'));
root.innerHTML='<div class="bt-in" id="bt-in"></div>';document.body.appendChild(root);
const IN=root.querySelector('#bt-in');
const $$=s=>IN.querySelector(s);

/* ---------- savol tuzuvchilar ---------- */
const topics=()=>SIMS.filter(s=>!s.lab);
const used={};
function pickFrom(key,arr){if(!arr.length)return null;const u=used[key]||(used[key]=new Set());let free=arr.map((_,i)=>i).filter(i=>!u.has(i));if(!free.length){u.clear();free=arr.map((_,i)=>i);}const i=free[Math.floor(Math.random()*free.length)];u.add(i);return arr[i];}
const byCat=(arr,f)=>{const c=st.cat;if(!c)return arr;const a=arr.filter(x=>f(x)===c);return a.length>=3?a:arr;};
function mk(type,q,correct,wrongs,fx){const opts=shuf([correct,...wrongs].map((h,i)=>({h,ok:i===0})));return{type,q,opts:opts.map(o=>o.h),ok:opts.findIndex(o=>o.ok),fx};}
const B={
 quiz(){const it=pickFrom('quiz'+st.cat,byCat(BTD.quiz,x=>x[0]));const o=it[2].map(XA);const fx=o.every(s=>/=|²|√/.test(s)&&s.length<22);return mk('quiz',`<div>${esc(XA(it[1]))}</div>`,o[0],o.slice(1),fx);},
 tf(){const it=pickFrom('tf'+st.cat,byCat(BTD.tf,x=>x[0]));const q={type:'tf',q:`<div>${esc(XA(it[1]))}</div><span class="pr">${X('To‘g‘rimi?','Это верно?','Is it true?')}</span>`,opts:[X('✔ To‘g‘ri','✔ Верно','✔ True'),X('✘ Noto‘g‘ri','✘ Неверно','✘ False')],ok:it[2]?0:1};return q;},
 formula(){
  if(Math.random()<0.55){const it=pickFrom('fm'+st.cat,byCat(BTD.fm,x=>x[0]));const f=it[1];const toks=[...f.matchAll(/\{([^}]+)\}/g)].map(m=>m[1]);const k=Math.floor(Math.random()*toks.length);let n=0;
   const html=esc(f).replace(/\{([^}]+)\}/g,(a,t)=>n++===k?'<span class="blank">?</span>':t);const cor=toks[k];const pool=shuf(BTD.fsym.filter(s=>s!==cor&&!toks.includes(s)));
   return mk('formula',`<div class="bt-f">${html}</div><span class="pr">${X('Bo‘sh joyga qaysi belgi tushadi?','Какой символ пропущен?','Which symbol fills the gap?')}</span>`,cor,pool.slice(0,3),1);}
  const all=topics().filter(s=>/=/.test(s.short||'')&&!/[⇒_^]/.test(s.short)&&(s.short||'').length<34);const s=pickFrom('ft'+st.cat,byCat(all,x=>x.cat));
  let pool=all.filter(x=>x.cat===s.cat&&x.short!==s.short);if(pool.length<3)pool=all.filter(x=>x.short!==s.short);const w=[...new Set(shuf(pool).map(x=>x.short))].slice(0,3);
  return mk('formula',`<div>${X('«','«','“')}${esc(TR(s.title))}${X('» mavzusining formulasi qaysi?','»: какая формула у этой темы?','”: which formula belongs to this topic?')}</div>`,TR(s.short),w.map(TR),1);},
 calc(){const g=pickFrom('calc'+st.cat,byCat(BTD.calc,x=>x[0]));const [q,ans,u]=g[1]();const un=XA(BTD.units[u]);
  const cand=shuf([ans*2,ans/2,ans*10,ans/10,ans*1.5,ans*0.75,ans*4,ans+ (ans>=10?Math.round(ans*0.2):1),ans*3]);const seen=new Set([bnf(ans)]);const w=[];for(const c of cand){const s=bnf(c);if(c>0&&!seen.has(s)){seen.add(s);w.push(s+' '+un);}if(w.length===3)break;}
  return mk('calc',`<div>${esc(XA(q))}</div>`,bnf(ans)+' '+un,w,0);},
 topic(){const all=topics().filter(s=>s.sub&&s.sub.length>40);const s=pickFrom('tp'+st.cat,byCat(all,x=>x.cat));let pool=all.filter(x=>x.cat===s.cat&&x!==s);if(pool.length<3)pool=all.filter(x=>x!==s);
  const w=shuf(pool).slice(0,3).map(x=>TR(x.title));let d=TR(s.sub);const tt=TR(s.title).split(/[\s:,]+/).filter(x=>x.length>4);tt.forEach(x=>{d=d.split(x).join('…');});
  return mk('topic',`<div class="desc">${esc(d)}</div><span class="pr">${X('Bu qaysi mavzu haqida?','О какой теме идёт речь?','Which topic is this about?')}</span>`,TR(s.title),w,0);}
};
const MIXT=['quiz','tf','formula','calc','topic'];

/* ---------- holat ---------- */
let G=null,qid=0,timers=[];
const later=(f,ms)=>{const id=setTimeout(f,ms);timers.push(id);return id;};
function clearAll(){timers.forEach(clearTimeout);timers=[];qid++;if(raf)cancelAnimationFrame(raf);raf=0;root.querySelectorAll('.bt-vs,.bt-fly,.bt-spark,.bt-flash,.bt-toast').forEach(e=>e.remove());}
let raf=0;

/* ---------- lobbi ---------- */
function lobby(){clearAll();G=null;const wins=store.get('wins',[0,0,0]);
 IN.innerHTML=`<div class="bt-top"><button type="button" class="bt-x" id="bt-close">← ${X('Saytga qaytish','Назад на сайт','Back to the site')}</button><span class="sp"></span></div>
 <h2 class="bt-h">⚔️ <span>${X('Bellashuv','Битва знаний','Physics Battle')}</span></h2>
 <p class="bt-sub">${X('Sun’iy intellekt yoki do‘stingiz bilan bellashing: savollarga javob bering, formulalarni toping, narsalarni joyiga qo‘ying. Tez va to‘g‘ri javob ko‘proq ochko beradi.','Сразитесь с искусственным интеллектом или с другом: отвечайте на вопросы, находите формулы, расставляйте всё по местам. Быстрый и верный ответ приносит больше очков.','Take on the AI or a friend: answer questions, find formulas and put things in their place. Fast, correct answers score more points.')}</p>
 <div class="bt-rules">${[['🔥',X('Seriya: 3 ta ketma-ket g‘alaba — ×1,5, 5 ta — ×2 ochko','Серия: 3 победы подряд — ×1,5, 5 — ×2 очков','Streak: 3 wins in a row ×1.5, 5 in a row ×2')],['½',X('50/50: ikki noto‘g‘ri javobni o‘chiradi','50/50: убирает два неверных ответа','50/50 removes two wrong answers')],['❄️',X('Muzlatish: raqib 4 soniya javob bera olmaydi','Заморозка: соперник 4 секунды не может ответить','Freeze: your rival can’t answer for 4 seconds')],['×2',X('Shu savol uchun ikki barobar ochko','Двойные очки за этот вопрос','Double points for this question')]].map(r=>`<span><b>${r[0]}</b>${r[1]}</span>`).join('')}</div>
 <div class="bt-sec">1 · ${X('Raqib','Соперник','Opponent')}</div>
 <div class="bt-opp">
  <div role="button" tabindex="0" class="bt-card" data-opp="ai" aria-pressed="${st.opp==='ai'}"><span class="ic">🤖</span><b>${X('Sun’iy intellekt bilan','С искусственным интеллектом','Against the AI')}</b><small>${X('Robot raqib siz bilan bir vaqtda javob beradi. Darajani tanlang.','Робот отвечает одновременно с вами. Выберите уровень.','A robot answers at the same time as you. Pick a level.')}</small>
   <div class="bt-seg" id="bt-diff" style="margin-top:6px">${DIFF.map((d,i)=>`<button type="button" data-d="${i}" aria-pressed="${st.diff===i}">${XA(d)}</button>`).join('')}</div></div>
  <div role="button" tabindex="0" class="bt-card" data-opp="pp" aria-pressed="${st.opp==='pp'}"><span class="ic">👥</span><b>${X('Do‘st bilan (bir qurilmada)','С другом (на одном устройстве)','With a friend (same device)')}</b><small>${X('Kompyuterda: 1–4 va 7–0 tugmalari. Telefonda: telefonni o‘rtaga qo‘ying, har biringiz o‘z tomoningizdan bosasiz.','На компьютере: клавиши 1–4 и 7–0. На телефоне: положите его между вами, каждый жмёт со своей стороны.','On a computer: keys 1–4 and 7–0. On a phone: lay it between you, each taps on their own side.')}</small>
   <div class="bt-names"><input id="bt-n1" maxlength="16" placeholder="${esc(X('1-o‘yinchi','Игрок 1','Player 1'))}" value="${esc(st.n1)}"><input id="bt-n2" maxlength="16" placeholder="${esc(X('2-o‘yinchi','Игрок 2','Player 2'))}" value="${esc(st.n2)}"></div></div>
 </div>
 <div class="bt-sec">2 · ${X('O‘yin turi','Тип игры','Game type')}</div>
 <div class="bt-types">${TYPES.map(t=>`<button type="button" class="bt-card" data-type="${t.id}" aria-pressed="${st.type===t.id}"><span class="ic">${t.ic}</span><b>${XA(t.n)}</b><small>${XA(t.d)}</small></button>`).join('')}</div>
 <div class="bt-sec">3 · ${X('Sozlamalar','Настройки','Settings')}</div>
 <div class="bt-row">
  <div><label for="bt-cat">${X('Bo‘lim','Раздел','Section')}</label><select class="bt-sel" id="bt-cat"><option value="">${X('Barcha bo‘limlar','Все разделы','All sections')}</option>${CATS.map(([id,n])=>`<option value="${id}"${st.cat===id?' selected':''}>${esc(TR(n))}</option>`).join('')}</select></div>
  <div><label>${X('Raundlar','Раунды','Rounds')}</label><div class="bt-seg" id="bt-rounds">${[5,10,15].map(n=>`<button type="button" data-r="${n}" aria-pressed="${st.rounds===n}">${n}</button>`).join('')}</div></div>
  <div><label>${X('Ovoz','Звук','Sound')}</label><div class="bt-seg" id="bt-snd"><button type="button" data-s="1" aria-pressed="${st.snd}">🔊</button><button type="button" data-s="0" aria-pressed="${!st.snd}">🔇</button></div></div>
 </div>
 <div class="bt-go"><button type="button" class="bt-big" id="bt-start">${X('Boshlash','Начать','Start')} ⚔️</button>
  <span class="bt-stat">${X('Robotlar ustidan g‘alabalar','Победы над роботами','Wins against the robots')}: ${DIFF.map((d,i)=>XA(d)+' '+wins[i]).join(' · ')}</span></div>`;
 $$('#bt-close').onclick=close;
 IN.querySelectorAll('[data-opp]').forEach(b=>b.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target===b){e.preventDefault();b.click();}});
 IN.querySelectorAll('[data-opp]').forEach(b=>b.onclick=e=>{if(e.target.closest('input,#bt-diff button'))return;st.opp=b.dataset.opp;saveCfg();IN.querySelectorAll('[data-opp]').forEach(x=>x.setAttribute('aria-pressed',x===b));});
 IN.querySelectorAll('#bt-diff button').forEach(b=>b.onclick=()=>{st.diff=+b.dataset.d;st.opp='ai';saveCfg();lobby();});
 IN.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{st.type=b.dataset.type;saveCfg();IN.querySelectorAll('[data-type]').forEach(x=>x.setAttribute('aria-pressed',x===b));});
 IN.querySelectorAll('#bt-rounds button').forEach(b=>b.onclick=()=>{st.rounds=+b.dataset.r;saveCfg();IN.querySelectorAll('#bt-rounds button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
 IN.querySelectorAll('#bt-snd button').forEach(b=>b.onclick=()=>{st.snd=b.dataset.s==='1';saveCfg();IN.querySelectorAll('#bt-snd button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
 ['n1','n2'].forEach(k=>{const el=$$('#bt-'+k);el.oninput=()=>{st[k]=el.value;saveCfg();};el.onclick=e=>e.stopPropagation();el.onkeydown=e=>e.stopPropagation();});
 $$('#bt-cat').onchange=e=>{st.cat=e.target.value;saveCfg();};
 $$('#bt-start').onclick=start;
 root.scrollTop=0;}

/* ---------- o‘yin ---------- */
function start(){clearAll();for(const k in used)delete used[k];
 const ai=st.opp==='ai';
 const mkp=(name,av,isai)=>({name,av,score:0,ok:0,ai:!!isai,streak:0,best:0,tsum:0,tn:0});
 G={ai,type:st.type,rounds:st.rounds,r:0,pl:[mkp(pname(0),'🧑‍🔬'),mkp(ai?XA(AIN[st.diff]):pname(1),ai?'🤖':'👩‍🔬',ai)],pw:[{h:1,f:1,d:1},{h:1,f:1,d:1}],times:[]};shown[0]=shown[1]=0;
 IN.innerHTML=`<div class="bt-top"><button type="button" class="bt-x" id="bt-quit">✕ ${X('Chiqish','Выйти','Quit')}</button><span class="sp"></span><span class="bt-note">${TYPES.find(t=>t.id===G.type).ic} ${esc(tname(G.type))}${st.cat?' · '+esc(TR((CATS.find(c=>c[0]===st.cat)||['',''])[1])):''}</span></div>
 <div class="bt-sb">${[0,1].map(i=>`<div class="bt-pl p${i}" id="bt-pl${i}"><span class="av">${G.pl[i].av}</span><span class="nm"><b>${esc(G.pl[i].name)}<span class="bt-sk" id="bt-sk${i}"></span></b><small id="bt-st${i}"></small></span><strong id="bt-sc${i}">0</strong></div>`).join('')}</div><div class="bt-tug" id="bt-tug" aria-hidden="true"><i></i><b></b><em></em></div><div id="bt-stage" class="bt-stage"></div>`;
 // markaz (taymer) ni o‘yinchilar orasiga qo‘yish
 const sb=$$('.bt-sb'),mid=document.createElement('div');mid.className='bt-mid';mid.innerHTML='<div class="bt-ring" id="bt-ring"><span id="bt-tn">–</span></div><small id="bt-rn"></small>';sb.insertBefore(mid,sb.children[1]);
 $$('#bt-quit').onclick=lobby;
 intro(()=>{if(G.type==='memory')memStart();else if(G.type==='drag')ddStart();else if(G.type==='build')bbStart();else mcqNext();});}
function intro(cb){const my=qid;const v=document.createElement('div');v.className='bt-vs';const ty=TYPES.find(t=>t.id===G.type);
 v.innerHTML=`<div><div class="row"><div class="pp l"><span class="ava">${G.pl[0].av}</span>${esc(G.pl[0].name)}</div><div class="v">VS</div><div class="pp r"><span class="ava p1">${G.pl[1].av}</span>${esc(G.pl[1].name)}${G.ai?`<small style="font:600 12px/1 'IBM Plex Mono',monospace;color:var(--muted)">${XA(DIFF[st.diff])}</small>`:''}</div></div><div class="meta">${ty.ic} ${esc(XA(ty.n))}${G.type==='memory'?'':' · '+(G.type==='drag'?({5:2,10:4,15:5}[G.rounds]||3):G.type==='build'?(BBN[G.rounds]||4):G.rounds)+' '+X('raund','раундов','rounds')}</div><div class="cdw"></div></div>`;
 root.appendChild(v);SND.whoosh();let n=3,fin=false;const done=()=>{if(fin)return;fin=true;v.remove();if(my===qid)cb();};v.onclick=done;
 if(RMO){later(done,500);return;}
 const step=()=>{if(fin||my!==qid)return;const w=v.querySelector('.cdw');w.innerHTML=n>0?`<div class="cd">${n}</div>`:`<div class="cd go">${X('Boshla!','Старт!','Go!')}</div>`;if(n>0){SND.tick();n--;later(step,650);}else{SND.go();later(done,520);}};later(step,950);}
const stage=()=>$$('#bt-stage');
const shown=[0,0];
function setScore(){if(!G)return;[0,1].forEach(i=>{const e=$$('#bt-sc'+i);if(!e)return;const from=shown[i],to=G.pl[i].score;if(from===to){e.textContent=to;return;}shown[i]=to;e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump');if(RMO){e.textContent=to;return;}const t0=performance.now();const f=now=>{const k=Math.min(1,(now-t0)/650);e.textContent=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f);};requestAnimationFrame(f);});
 const a=G.pl[0].score,b=G.pl[1].score,fr=a+b?a/(a+b):0.5,t=$$('#bt-tug');if(t){t.querySelector('i').style.width=(fr*100)+'%';t.querySelector('b').style.width=((1-fr)*100)+'%';t.querySelector('em').style.left=(fr*100)+'%';}}
function streakUi(){[0,1].forEach(i=>{const e=$$('#bt-sk'+i);if(!e)return;const k=G.pl[i].streak;const t=k>=2?`🔥${k}${k>=5?' ×2':k>=3?' ×1.5':''}`:'';if(e.textContent!==t)e.textContent=t;});}
const mult=k=>k>=5?2:k>=3?1.5:1;
function fly(fromEl,i,txt){if(RMO||!fromEl)return;const bEl=$$('#bt-sc'+i);if(!bEl)return;const a=fromEl.getBoundingClientRect(),b=bEl.getBoundingClientRect();const d=document.createElement('div');d.className='bt-fly';d.textContent=txt;d.style.color=i?'var(--warm)':'var(--green)';const x0=a.left+a.width/2,y0=a.top+a.height/2;d.style.left=(x0-24)+'px';d.style.top=(y0-12)+'px';root.appendChild(d);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{d.style.transform=`translate(${b.left+b.width/2-x0}px,${b.top+b.height/2-y0}px) scale(.55)`;d.style.opacity='0.15';}));setTimeout(()=>d.remove(),850);}
function burst(el,cols){if(RMO||!el)return;const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const C=cols||['var(--green)','var(--accent)','var(--warm)','var(--violet)'];for(let k=0;k<16;k++){const sp=document.createElement('i');sp.className='bt-spark';sp.style.left=cx+'px';sp.style.top=cy+'px';sp.style.background=C[k%C.length];root.appendChild(sp);const an=k/16*Math.PI*2+rnd(-.2,.2),dd=rnd(50,130);requestAnimationFrame(()=>requestAnimationFrame(()=>{sp.style.transform=`translate(${Math.cos(an)*dd}px,${Math.sin(an)*dd}px) scale(.2)`;sp.style.opacity='0';}));setTimeout(()=>sp.remove(),700);}}
function flash(ok){if(RMO)return;const f=document.createElement('div');f.className='bt-flash '+(ok?'g':'r');root.appendChild(f);setTimeout(()=>f.remove(),560);}
function shake(){if(RMO)return;IN.classList.remove('shake');void IN.offsetWidth;IN.classList.add('shake');}
function say(kind){if(!G||!G.ai)return;const arr=TAUNT[kind];const pl=$$('#bt-pl1');if(!pl||!arr)return;pl.querySelectorAll('.bt-bub').forEach(e=>e.remove());const b=document.createElement('div');b.className='bt-bub';b.textContent=XA(arr[Math.floor(Math.random()*arr.length)]);pl.appendChild(b);setTimeout(()=>b.remove(),2300);}
function stat(i,t){const e=$$('#bt-st'+i);if(e)e.textContent=t||'';}
function turnHi(i){[0,1].forEach(k=>{const e=$$('#bt-pl'+k);if(e)e.classList.toggle('turn',k===i);});}
function roundLbl(t){const e=$$('#bt-rn');if(e)e.textContent=t;}
function timer(dur,onEnd,my){const t0=performance.now();let lastS=-1;const ring=$$('#bt-ring'),tn=$$('#bt-tn');
 const f=now=>{if(my!==qid)return;const left=Math.max(0,dur-(now-t0));const p=left/dur;if(ring){ring.style.setProperty('--p',p.toFixed(3));ring.classList.toggle('low',p<0.25);ring.classList.toggle('beat',p<0.25&&left>0&&!RMO);}const s=Math.ceil(left/1000);if(tn&&s!==lastS){tn.textContent=s;if(s<=3&&s>0&&lastS!==-1)SND.tick();lastS=s;}
  if(left<=0){raf=0;if(ring)ring.classList.remove('beat');onEnd();return;}raf=requestAnimationFrame(f);};raf=requestAnimationFrame(f);return()=>Math.max(0,dur-(performance.now()-t0));}
function toast(html,miss){const t=document.createElement('div');t.className='bt-toast'+(miss?' miss':'');t.innerHTML=html;root.appendChild(t);setTimeout(()=>t.remove(),1500);}

/* ----- savol-javob (viktorina, formula, hisob, to‘g‘ri/noto‘g‘ri, mavzu) ----- */
function mcqNext(){if(!G)return;if(G.r>=G.rounds)return finish();const sg=stage();if(sg&&sg.children.length&&!RMO){sg.classList.add('out');later(mcqRender,240);}else mcqRender();}
function pwBar(i){const k=PWK[i];return `<div class="bt-pw">${['h','f','d'].map((t,j)=>`<button type="button" data-pw="${t}" data-p="${i}" ${G.pw[i][t]?'':'disabled'} title="${esc(XA(PWN[t]))}">${esc(XA(PWN[t]))}<kbd>${k[j].toUpperCase()}</kbd></button>`).join('')}</div>`;}
function mcqRender(){if(!G)return;G.r++;const my=++qid;
 const t=G.type==='mix'?MIXT[Math.floor(Math.random()*MIXT.length)]:G.type;let Q;try{Q=B[t]();}catch(e){console.error(e);Q=B.quiz();}
 const dur=(t==='calc'?28:t==='tf'?12:t==='topic'?24:20)*1000;
 G.q={...Q,t,lock:[false,false],done:false,dur,my,aiPick:-1,frz:[0,0],dbl:[false,false],aiFrz:0};
 roundLbl(`${G.r} / ${G.rounds}`);turnHi(-1);stat(0,'');stat(1,G.ai?X('o‘ylamoqda…','думает…','thinking…'):'');[0,1].forEach(i=>{const e=$$('#bt-pl'+i);if(e)e.classList.remove('frozen');});
 const two=!G.ai,ty=TYPES.find(x=>x.id===t);
 const pane=i=>`<div class="bt-pane p${i}" data-p="${i}"><div class="bt-pq">${Q.q}</div><div class="bt-pn">${esc(G.pl[i].name)}</div><div class="bt-opts">${Q.opts.map((o,k)=>`<button type="button" class="bt-opt${Q.fx?' fx':''}" data-p="${i}" data-k="${k}" style="animation-delay:${k*55}ms"><kbd>${KEYS[i][k]}</kbd><span>${esc(o)}</span></button>`).join('')}</div>${pwBar(i)}</div>`;
 const sg=stage();sg.className='bt-stage'+(two?' two':'');
 sg.innerHTML=(two?pane(1):'')+`<div class="bt-q"><span class="bt-tag">${ty.ic} ${esc(XA(ty.n))}</span><div class="bt-qt">${Q.q}</div></div>`+pane(0);
 sg.querySelectorAll('.bt-opt').forEach(b=>b.onclick=()=>answer(+b.dataset.p,+b.dataset.k,b));
 sg.querySelectorAll('.bt-pw button').forEach(b=>b.onclick=()=>usePw(+b.dataset.p,b.dataset.pw));
 if(Q.opts.length<4)sg.querySelectorAll('.bt-pw [data-pw="h"]').forEach(b=>b.disabled=true);
 G.left=timer(dur,()=>reveal(-1),my);
 if(G.ai){const acc=AIACC[st.diff]*(t==='calc'?0.92:1),r=AIT[st.diff],f=t==='tf'?0.55:t==='calc'?1.35:t==='topic'?1.15:1;const ms=Math.min(dur-600,rnd(r[0],r[1])*1000*f);
  const fire=()=>{if(my!==qid||G.q.done)return;const w=G.q.aiFrz-performance.now();if(w>0){later(fire,w+80);return;}const good=Math.random()<acc;const wr=Q.opts.map((_,k)=>k).filter(k=>k!==Q.ok);G.q.aiPick=good?Q.ok:wr[Math.floor(Math.random()*wr.length)];answer(1,G.q.aiPick);};
  later(fire,ms);
  if(st.diff>=1&&G.pw[1].f&&G.r>=2&&Math.random()<0.22)later(()=>{if(my===qid&&!G.q.done&&!G.q.lock[0])usePw(1,'f');},rnd(900,2200));}}
function paneOf(i){return stage().querySelector('.bt-pane.p'+(G.ai?0:i));}
function usePw(i,t){const q=G.q;if(!q||q.done||q.lock[i]||!G.pw[i][t])return;if(G.ai&&i===1&&t!=='f')return;
 G.pw[i][t]=0;SND.pw();const btn=stage().querySelector(`.bt-pw [data-p="${i}"][data-pw="${t}"]`);if(btn){btn.disabled=true;burst(btn,['var(--warm)','var(--violet)','#ffd84d']);}
 if(t==='h'){const pane=paneOf(i);const wr=shuf(q.opts.map((_,k)=>k).filter(k=>k!==q.ok&&!pane.querySelector(`.bt-opt[data-k="${k}"]`).classList.contains('no'))).slice(0,2);wr.forEach(k=>{const b=pane.querySelector(`.bt-opt[data-k="${k}"]`);b.classList.add('gone');b.disabled=true;});}
 else if(t==='d'){q.dbl[i]=true;if(btn){btn.classList.add('on');btn.disabled=true;btn.style.textDecoration='none';btn.style.opacity='1';}stat(i,X('×2 faol','×2 активно','×2 active'));}
 else if(t==='f'){const o=1-i,until=performance.now()+4000;SND.frz();
  if(G.ai&&o===1){q.aiFrz=until;const pl=$$('#bt-pl1');if(pl)pl.classList.add('frozen');say('frozen');later(()=>{const p2=$$('#bt-pl1');if(p2)p2.classList.remove('frozen');},4000);}
  else{q.frz[o]=until;const pane=paneOf(o);if(pane)pane.classList.add('frozen');if(G.ai&&i===1)say('freeze');const my=q.my;later(()=>{const pn=paneOf(o);if(pn)pn.classList.remove('frozen');},4000);}}}
function answer(i,k,el){const q=G&&G.q;if(!q||q.done||q.lock[i])return;if(G.ai&&i===1&&q.aiPick<0)return;if(q.frz[i]>performance.now())return;
 const pane=paneOf(i);const btn=el||(pane&&pane.querySelector(`.bt-opt[data-k="${k}"]`));if(btn&&btn.disabled&&!(G.ai&&i===1))return;
 if(k===q.ok){q.done=true;const left=G.left(),P=G.pl[i];P.streak++;P.best=Math.max(P.best,P.streak);const m=mult(P.streak)*(q.dbl[i]?2:1);const pts=Math.round((100+50*left/q.dur)*m);P.score+=pts;P.ok++;P.tsum+=q.dur-left;P.tn++;G.times.push([i,q.dur-left]);
  G.pl[1-i].streak=0;SND.ok(P.streak);flash(true);
  const src=G.ai&&i===1?$$('#bt-pl1'):btn;burst(src);fly(src,i,'+'+pts+(m>1?` ×${m}`:''));setTimeout(setScore,G.ai&&i===1?0:520);streakUi();reveal(i,pts);}
 else{q.lock[i]=true;G.pl[i].streak=0;streakUi();SND.bad();
  if(G.ai&&i===1){stat(1,X('xato qildi ✗','ошибся ✗','missed ✗'));say('miss');const b=stage().querySelector(`.bt-pane.p0 .bt-opt[data-k="${k}"]`);if(b&&!b.querySelector('.bot'))b.insertAdjacentHTML('beforeend','<span class="bot">🤖</span>');}
  else if(pane){shake();flash(false);pane.classList.add('locked');if(btn)btn.classList.add('no');pane.querySelectorAll('.bt-opt,.bt-pw button').forEach(x=>x.disabled=true);if(G.ai)stat(0,X('xato ✗','ошибка ✗','wrong ✗'));}
  if(q.lock[0]&&q.lock[1])reveal(-1);
  else if(G.ai&&i===0&&q.lock[1])reveal(-1);}}
function reveal(w,pts){const q=G.q;if(!q)return;q.done=true;qid++;if(raf)cancelAnimationFrame(raf);raf=0;const ring=$$('#bt-ring');if(ring)ring.classList.remove('beat');
 stage().querySelectorAll('.bt-opt,.bt-pw button').forEach(b=>{b.disabled=true;if(!b.classList.contains('bt-opt'))return;const k=+b.dataset.k;if(k===q.ok)b.classList.add('ok');else if(!b.classList.contains('no'))b.classList.add('dim');});
 stage().querySelectorAll('.bt-pane.frozen').forEach(p=>p.classList.remove('frozen'));
 if(G.ai&&q.aiPick===q.ok&&w===1){const b=stage().querySelector(`.bt-pane.p0 .bt-opt[data-k="${q.ok}"]`);if(b)b.insertAdjacentHTML('beforeend','<span class="bot">🤖</span>');stat(1,X('to‘g‘ri ✓','верно ✓','correct ✓'));say('win');}
 if(w===0&&G.ai&&Math.random()<0.55)say('lose');
 if(w<0){[0,1].forEach(i=>G.pl[i].streak=0);streakUi();}
 if(w>=0){toast(`${G.pl[w].av} ${esc(G.pl[w].name)} <span style="color:var(--green)">+${pts}</span>${G.pl[w].streak>=3?` <span style="color:var(--warm)">🔥${G.pl[w].streak}</span>`:''}`);if(w===1&&G.ai)stat(0,'');}
 else{toast(X('Hech kim topmadi','Никто не угадал','Nobody got it'),1);if(G.ai&&q.aiPick<0)stat(1,'');}
 later(mcqNext,1900);}

/* ----- joyiga qo‘yish ----- */
function ddStart(){G.dRounds={5:2,10:4,15:5}[G.rounds]||3;G.dr=0;G.dp=0;ddTurn();}
function ddSet(){const sets=BTD.dd.map((s,i)=>i);const auto=Math.random()<0.25;
 if(auto){const cats=shuf(CATS.map(c=>c[0])).slice(0,4);const items=cats.map(c=>{const s=shuf(topics().filter(x=>x.cat===c))[0];return[TR(s.title),TR(c&&CATS.find(x=>x[0]===c)[1])];});return{t:X('Mavzuni bo‘limiga joylang','Отнесите тему к её разделу','Put each topic in its section'),items,fx:0};}
 const s=BTD.dd[pickFrom('dd',sets)];const ps=[];const seenR=new Set();for(const p of shuf(s.p)){const r=XA(p[1]);if(seenR.has(r))continue;seenR.add(r);ps.push([XA(p[0]),r]);if(ps.length===4)break;}
 return{t:XA(s.t),items:ps,fx:ps.every(p=>/[²/·]|^[a-zA-Zν]+$/.test(p[1])&&p[1].length<8)};}
function ddTurn(){if(G.dr>=G.dRounds)return finish();const p=G.dp,my=++qid;
 roundLbl(`${G.dr+1} / ${G.dRounds}`);turnHi(p);stat(0,'');stat(1,'');
 if(!G.ai){stage().className='bt-stage';stage().innerHTML=`<div class="bt-inter" style="grid-area:a"><span class="av">${G.pl[p].av}</span><h3>${X('Navbat','Ход','Turn')}: ${esc(G.pl[p].name)}</h3><p class="bt-note">${X('Qurilmani shu o‘yinchiga bering.','Передайте устройство этому игроку.','Pass the device to this player.')}</p><button type="button" class="bt-btn pri" id="bt-ready">${X('Tayyorman','Я готов','I’m ready')} →</button></div>`;
  $$('#bt-ready').onclick=()=>ddPlay(p,my);}else ddPlay(0,my);}
function ddPlay(p,my){const S=ddSet();const n=S.items.length;const rights=shuf(S.items.map((it,i)=>({t:it[1],i})));const place=new Array(n).fill(-1);
 stage().className='bt-stage';
 stage().innerHTML=`<div class="bt-q"><span class="bt-tag">🧩 ${esc(tname('drag'))}</span><div class="bt-qt">${esc(S.t)}<span class="pr">${X('Kartochkani sudrang yoki bosib, keyin joyni bosing.','Перетащите карточку или нажмите на неё, затем на место.','Drag a card, or tap it and then tap a slot.')}</span></div></div>
 <div class="bt-dd"><div><div class="bt-rows">${S.items.map((it,i)=>`<div class="bt-rowi"><span>${esc(it[0])}</span><div class="bt-slot" data-s="${i}"></div></div>`).join('')}</div>
 <div class="bt-ddbar"><button type="button" class="bt-btn pri" id="bt-chk" disabled>${X('Tekshirish','Проверить','Check')} ✓</button><span class="bt-note" id="bt-ddn"></span></div></div>
 <div class="bt-tray" id="bt-tray">${rights.map((r,k)=>`<button type="button" class="bt-chip${S.fx?' fx':''}" data-c="${k}">${esc(r.t)}</button>`).join('')}</div></div>`;
 const tray=$$('#bt-tray'),chk=$$('#bt-chk');let sel=null,done=false;
 const chip=k=>stage().querySelector(`.bt-chip[data-c="${k}"]`);
 const upd=()=>{chk.disabled=place.some(x=>x<0)||done;};
 const put=(k,s)=>{if(done)return;const prev=place.indexOf(k);if(prev>=0)place[prev]=-1;const slot=stage().querySelector(`.bt-slot[data-s="${s}"]`);if(place[s]>=0)tray.appendChild(chip(place[s]));place[s]=k;slot.appendChild(chip(k));chip(k).classList.remove('sel');sel=null;SND.flip();upd();};
 const back=k=>{const prev=place.indexOf(k);if(prev>=0)place[prev]=-1;tray.appendChild(chip(k));upd();};
 stage().querySelectorAll('.bt-chip').forEach(c=>{const k=+c.dataset.c;let sx=0,sy=0,drag=null,moved=false;
  c.onpointerdown=e=>{if(done)return;e.preventDefault();sx=e.clientX;sy=e.clientY;moved=false;c.setPointerCapture(e.pointerId);};
  c.onpointermove=e=>{if(done||!c.hasPointerCapture(e.pointerId))return;if(!moved&&Math.hypot(e.clientX-sx,e.clientY-sy)>6){moved=true;drag=c.cloneNode(true);drag.classList.add('bt-ghost');drag.style.width=c.offsetWidth+'px';root.appendChild(drag);c.style.opacity='.35';}
   if(drag){drag.style.left=e.clientX+'px';drag.style.top=e.clientY+'px';stage().querySelectorAll('.bt-slot').forEach(s=>s.classList.remove('hot'));const el=document.elementFromPoint(e.clientX,e.clientY);const s=el&&el.closest('.bt-slot');if(s)s.classList.add('hot');}};
  const end=e=>{if(drag){drag.remove();drag=null;c.style.opacity='';stage().querySelectorAll('.bt-slot').forEach(s=>s.classList.remove('hot'));const el=document.elementFromPoint(e.clientX,e.clientY);const s=el&&el.closest('.bt-slot');const t=el&&el.closest('#bt-tray');if(s)put(k,+s.dataset.s);else if(t)back(k);}
   else if(!moved&&!done){if(c.closest('.bt-slot')){back(k);return;}if(sel===k){c.classList.remove('sel');sel=null;}else{stage().querySelectorAll('.bt-chip.sel').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');sel=k;}}};
  c.onpointerup=end;c.onpointercancel=e=>{if(drag){drag.remove();drag=null;c.style.opacity='';}};
  c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(sel===k){c.classList.remove('sel');sel=null;}else{stage().querySelectorAll('.bt-chip.sel').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');sel=k;}}};});
 stage().querySelectorAll('.bt-slot').forEach(s=>s.onclick=e=>{if(e.target.closest('.bt-chip'))return;if(sel!=null)put(sel,+s.dataset.s);});
 const dur=60000;
 const check=()=>{if(done)return;done=true;qid++;if(raf)cancelAnimationFrame(raf);raf=0;const left=G.left();let good=0;
  place.forEach((k,s)=>{const sl=stage().querySelector(`.bt-slot[data-s="${s}"]`);const ok=k>=0&&rights[k].i===s;if(ok){good++;later(()=>burst(sl),s*90);}sl.classList.add(ok?'ok':'no');});flash(good===n);if(good<n)shake();
  stage().querySelectorAll('.bt-chip').forEach(x=>x.disabled=true);
  const pts=good*25+(good===n?Math.round(50*left/dur):0);G.pl[p].score+=pts;G.pl[p].ok+=good;G.pl[p].tsum+=dur-left;G.pl[p].tn++;if(good===n){G.pl[p].streak++;G.pl[p].best=Math.max(G.pl[p].best,G.pl[p].streak);}else G.pl[p].streak=0;streakUi();fly(chk,p,'+'+pts);setTimeout(setScore,520);(good===n?SND.ok:SND.bad)();
  let msg=`${G.pl[p].av} ${esc(G.pl[p].name)}: ${good}/${n} · +${pts}`;
  if(!good||good<n){const fix=S.items.map((it,i)=>`${esc(it[0])} → <b>${esc(it[1])}</b>`).join('<br>');$$('#bt-ddn').innerHTML='';const box=document.createElement('div');box.className='bt-note';box.style.marginTop='8px';box.innerHTML=fix;$$('#bt-ddn').parentElement.after(box);}
  if(G.ai){const acc=AIACC[st.diff];let ag=0;for(let i=0;i<n;i++)if(Math.random()<acc)ag++;const at=rnd(AIT[st.diff][0],AIT[st.diff][1])*3.2;const apts=ag*25+(ag===n?Math.round(50*Math.max(0,dur/1000-at)/(dur/1000)):0);G.pl[1].score+=apts;G.pl[1].ok+=ag;G.pl[1].tsum+=at*1000;G.pl[1].tn++;say(ag===n?'win':ag<n/2?'miss':'lose');
   stat(1,`${ag}/${n} · ${Math.round(at)} s`);msg+=`<br>${G.pl[1].av} ${esc(G.pl[1].name)}: ${ag}/${n} · +${apts}`;setTimeout(setScore,700);}
  toast(msg,good<n);
  chk.textContent=X('Davom etish','Дальше','Continue')+' →';chk.disabled=false;chk.onclick=next;};
 const next=()=>{if(G.ai){G.dr++;}else{if(G.dp===0){G.dp=1;}else{G.dp=0;G.dr++;}}ddTurn();};
 chk.onclick=check;G.left=timer(dur,check,my);}

/* ----- xotira juftliklari ----- */
function memStart(){const np={5:8,10:10,15:12}[G.rounds]||8;const s=BTD.dd[Math.random()<0.5?0:2];const ps=[];const seen=new Set();for(const p of shuf(s.p)){const a=XA(p[0]),b=XA(p[1]);if(seen.has(a)||seen.has(b))continue;seen.add(a);seen.add(b);ps.push([a,b]);if(ps.length===np)break;}
 G.cards=shuf(ps.flatMap((p,i)=>[{p:i,t:p[0],u:0},{p:i,t:p[1],u:1}]));G.open=[];G.turn=0;G.mem=new Map();G.busy=false;G.pairs=ps.length;G.found=0;
 const cols=np<=8?4:np===10?5:6;
 stage().className='bt-stage';
 stage().innerHTML=`<div class="bt-turn" id="bt-turn"></div><div class="bt-mem" style="--cols:${cols}">${G.cards.map((c,i)=>`<button type="button" class="bt-mc" data-i="${i}" aria-label="${X('Karta','Карта','Card')} ${i+1}"><span class="in"><span class="bk">?</span><span class="fc${c.u?' u':''}">${esc(c.t)}</span></span></button>`).join('')}</div>`;
 stage().querySelectorAll('.bt-mc').forEach(b=>b.onclick=()=>{if(G.busy||G.pl[G.turn].ai)return;flip(+b.dataset.i);});
 $$('#bt-ring').style.setProperty('--p',1);$$('#bt-tn').textContent='🃏';memTurn();}
function memTurn(){roundLbl(`${G.found} / ${G.pairs}`);turnHi(G.turn);const p=G.pl[G.turn];$$('#bt-turn').innerHTML=`${p.av} ${X('Navbat','Ход','Turn')}: <span style="color:${G.turn?'var(--warm)':'var(--accent)'}">${esc(p.name)}</span>`;
 if(p.ai)later(aiMove,800);}
const cardEl=i=>stage().querySelector(`.bt-mc[data-i="${i}"]`);
function remember(i){if(Math.random()<AIMEM[st.diff])G.mem.set(i,G.cards[i].p);}
function flip(i){const c=G.cards[i];if(c.done||G.open.includes(i)||G.open.length>=2)return;G.open.push(i);cardEl(i).classList.add('up');SND.flip();remember(i);
 if(G.open.length===2){G.busy=true;const [a,b]=G.open;const ok=G.cards[a].p===G.cards[b].p;
  later(()=>{if(ok){const P=G.pl[G.turn];P.streak++;P.best=Math.max(P.best,P.streak);const pts=P.streak>=3?150:100;[a,b].forEach(k=>{G.cards[k].done=true;G.mem.delete(k);const e=cardEl(k);e.classList.add('done','w'+G.turn);burst(e);});fly(cardEl(b),G.turn,'+'+pts);P.score+=pts;P.ok++;G.found++;setTimeout(setScore,500);streakUi();SND.ok(P.streak);if(G.ai&&G.turn===1&&Math.random()<0.5)say('win');}
   else{G.pl[G.turn].streak=0;streakUi();[a,b].forEach(k=>cardEl(k).classList.remove('up'));G.turn=1-G.turn;}
   G.open=[];G.busy=false;if(G.found===G.pairs)return later(finish,600);memTurn();},ok?650:1100);}}
function aiMove(){if(!G||G.found===G.pairs)return;const live=G.cards.map((c,i)=>i).filter(i=>!G.cards[i].done);
 const known=[...G.mem.entries()].filter(([i])=>!G.cards[i].done);let pair=null;for(let x=0;x<known.length&&!pair;x++)for(let y=x+1;y<known.length;y++)if(known[x][1]===known[y][1]){pair=[known[x][0],known[y][0]];break;}
 const unknown=live.filter(i=>!G.mem.has(i));
 if(pair){flip(pair[0]);later(()=>flip(pair[1]),650);return;}
 const a=unknown.length?unknown[Math.floor(Math.random()*unknown.length)]:live[0];flip(a);
 later(()=>{const pa=G.cards[a].p;const mate=[...G.mem.entries()].find(([i,p])=>p===pa&&i!==a&&!G.cards[i].done);let b;if(mate)b=mate[0];else{const u2=live.filter(i=>i!==a&&!G.mem.has(i));const pool=u2.length?u2:live.filter(i=>i!==a);b=pool[Math.floor(Math.random()*pool.length)];}flip(b);},700);}

/* ----- yakun ----- */
/* ----- modelni yig‘ (2D jumboqlar: zanjir, richag, linza, lazer, zaryad, issiqlik, prujina) ----- */
const rI=n=>Math.floor(Math.random()*n);
const nf=(v,d=2)=>{let s=String(Math.round(v*10**d)/10**d);return LG==='en'?s:s.replace('.',',');};
const U_={kg:X('kg','кг','kg'),g:X('g','г','g'),sm:X('sm','см','cm'),A:X('A','А','A'),V:X('V','В','V'),Nm:X('N·m','Н·м','N·m'),Nsm:X('N/sm','Н/см','N/cm')};
const bbRows=a=>a.map(r=>`<div class="bb-r"><span>${r[0]}</span><b class="${r[2]===true?'g':r[2]===false?'r':''}">${r[1]}</b></div>`).join('');
const bbCur=(d,I)=>I>1e-9?`<path class="cur" d="${d}" style="--d:${Math.max(.22,Math.min(3.5,1.1/I)).toFixed(2)}s"/>`:'';
const bbAss=(chips,pairs)=>{const usedC=new Set(),sol=[];pairs.forEach(([s,v])=>{const k=chips.findIndex((c,i)=>!usedC.has(i)&&c.v===v);usedC.add(k);sol[s]=k;});return sol;};
const bbTxt=(x,y,t,a)=>`<text x="${x}" y="${y}" class="t"${a?` text-anchor="${a}"`:''}>${t}</text>`;

/* 1) aralash ulanish: R1 + (R2 || R3) = maqsad */
function pzCircA(){const V=[1,2,3,4,6,8,12],U=12;let p,k,T;
 for(let t=0;t<400;t++){p=shuf(V).slice(0,3);const tots=[0,1,2].map(i=>{const o=p.filter((_,j)=>j!==i);return p[i]+o[0]*o[1]/(o[0]+o[1]);});if(new Set(tots.map(x=>x.toFixed(3))).size<3)continue;k=rI(3);T=tots[k];if(Math.abs(T*100-Math.round(T*100))<1e-6)break;}
 const o=p.filter((_,j)=>j!==k);const chips=shuf(p).map(v=>({v,l:`${v} Ω`,c:'res'}));
 const sol=bbAss(chips,[[0,p[k]],[1,o[0]],[2,o[1]]]);
 const base=`<path class="w" d="M60 140V60H300V110H520V190H300V110M520 190V240H60V158"/><line x1="38" y1="140" x2="82" y2="140" class="w bat"/><line x1="49" y1="158" x2="71" y2="158" class="w bat2"/>${bbTxt(90,146,'+')}${bbTxt(90,166,`U = ${U} ${U_.V}`)}${bbTxt(180,30,'R₁','middle')}${bbTxt(410,82,'R₂','middle')}${bbTxt(410,162,'R₃','middle')}<circle cx="300" cy="110" r="4" class="nd"/><circle cx="520" cy="190" r="4" class="nd"/><circle cx="300" cy="190" r="4" class="nd"/><circle cx="520" cy="110" r="4" class="nd"/>`;
 return{cat:'tok',ic:'⚡',tag:['Elektr zanjiri','Электрическая цепь','Electric circuit'],
  task:X(`Zanjirni yig‘ing: umumiy qarshilik <b>R = ${nf(T)} Ω</b> bo‘lsin`,`Соберите цепь: общее сопротивление <b>R = ${nf(T)} Ω</b>`,`Build the circuit so the total resistance is <b>R = ${nf(T)} Ω</b>`),
  hint:'R = R₁ + R₂R₃ / (R₂ + R₃)',goal:`R = ${nf(T)} Ω`,chips,sol,base,
  slots:[{x:180,y:60,w:84,h:38},{x:410,y:110,w:84,h:38},{x:410,y:190,w:84,h:38}],
  view(pl){const r=pl.map(c=>c<0?0:chips[c].v);const g2=r[1]?1/r[1]:0,g3=r[2]?1/r[2]:0;
   if(!r[0]||!(g2+g3))return{read:bbRows([[X('Zanjir uzilgan','Цепь разомкнута','Open circuit'),'I = 0']])};
   const R=r[0]+1/(g2+g3),I=U/R,I2=I*g2/(g2+g3),I3=I-I2,ok=pl.every(c=>c>=0)&&Math.abs(R-T)<1e-6;
   return{ok,dyn:bbCur('M60 140V60H300V110',I)+bbCur('M300 110H520',I2)+bbCur('M300 110V190H520',I3)+bbCur('M520 110V190',I2)+bbCur('M520 190V240H60V158',I),
    read:bbRows([['R',`${nf(R)} Ω`,pl.every(c=>c>=0)?ok:null],['I = U / R',`${nf(I)} ${U_.A}`],['I₂ · I₃',`${nf(I2)} · ${nf(I3)} ${U_.A}`]])};}};}
pzCircA.cat='tok';

/* 2) ikki parallel tarmoq: I1 = I2 */
function pzCircB(){const U=12;let a,b,c,d;
 for(;;){const v=shuf([1,2,3,4,5,6,7,8,9]);[a,b]=v;const s=a+b;const rest=v.slice(2).filter(x=>x<s&&x!==s-x&&v.slice(2).includes(s-x));if(rest.length){c=rest[0];d=s-c;break;}}
 const chips=shuf([a,b,c,d]).map(v=>({v,l:`${v} Ω`,c:'res'}));const sol=bbAss(chips,[[0,a],[1,b],[2,c],[3,d]]);
 const base=`<path class="w" d="M40 195V150H130V90H530V210H130V150M530 150H570V270H40V213"/><line x1="18" y1="195" x2="62" y2="195" class="w bat"/><line x1="29" y1="213" x2="51" y2="213" class="w bat2"/>${bbTxt(70,201,'+')}${bbTxt(70,236,`${U} ${U_.V}`)}${bbTxt(170,80,'I₁','middle')}${bbTxt(170,200,'I₂','middle')}<circle cx="130" cy="150" r="4" class="nd"/><circle cx="530" cy="150" r="4" class="nd"/>`;
 return{cat:'tok',ic:'⚡',tag:['Elektr zanjiri','Электрическая цепь','Electric circuit'],
  task:X('Qarshiliklarni joylang: ikkala tarmoqdagi tok kuchi <b>teng</b> bo‘lsin','Расставьте резисторы: токи в обеих ветвях должны быть <b>равны</b>','Place the resistors so both branch currents are <b>equal</b>'),
  hint:'I = U / R,  R = R₁ + R₂',goal:'I₁ = I₂',chips,sol,base,
  slots:[{x:265,y:90,w:84,h:38},{x:405,y:90,w:84,h:38},{x:265,y:210,w:84,h:38},{x:405,y:210,w:84,h:38}],
  view(pl){const r=pl.map(c=>c<0?0:chips[c].v);const I1=r[0]&&r[1]?U/(r[0]+r[1]):0,I2=r[2]&&r[3]?U/(r[2]+r[3]):0,I=I1+I2;const full=pl.every(c=>c>=0),ok=full&&Math.abs(I1-I2)<1e-9;
   return{ok,dyn:bbCur('M40 195V150H130',I)+bbCur('M130 150V90H530V150',I1)+bbCur('M130 150V210H530V150',I2)+bbCur('M530 150H570V270H40V213',I),
    read:bbRows([['I₁',I1?`${nf(I1)} ${U_.A}`:'0',full?ok:null],['I₂',I2?`${nf(I2)} ${U_.A}`:'0',full?ok:null],['I = I₁ + I₂',`${nf(I)} ${U_.A}`]])};}};}
pzCircB.cat='tok';

/* 3) richag muvozanati: ΣM = 0 */
function pzLever(){let m0,p0,w,x;
 for(let t=0;t<800;t++){w=[1+rI(5),1+rI(5)];x=shuf([1,2,3,4]).slice(0,2);const S=w[0]*x[0]+w[1]*x[1];const o=[];for(let q=1;q<=4;q++)if(S%q===0&&S/q>=2&&S/q<=12)o.push(q);if(!o.length)continue;p0=o[rI(o.length)];m0=S/p0;
  const dec=1+rI(5);const vals=[w[0],w[1],dec];if(vals.some(v=>S%v===0&&S/v<=4))continue;w.push(dec);break;}
 const chips=shuf(w).map(v=>({v,l:`${v} ${U_.kg}`,c:'wt'}));
 const pos=[-4,-3,-2,-1,1,2,3,4].filter(q=>q!==-p0);const XP=q=>300+62*q;
 const sol=bbAss(chips,[[pos.indexOf(x[0]),w[0]],[pos.indexOf(x[1]),w[1]]]);
 let ticks='';for(let q=-4;q<=4;q++)ticks+=`<line x1="${XP(q)}" y1="190" x2="${XP(q)}" y2="200" class="tk"/>${bbTxt(XP(q),216,Math.abs(q)*10,'middle')}`;
 const base=`<line x1="40" y1="262" x2="560" y2="262" class="w" style="opacity:.35"/><polygon points="300,200 274,262 326,262" class="fl"/><g class="bb-rot"><rect x="40" y="188" width="520" height="12" rx="5" class="bm"/>${ticks}<rect x="${XP(-p0)-25}" y="146" width="50" height="42" rx="7" class="fx"/><text x="${XP(-p0)}" y="173" class="t fxt" text-anchor="middle">${m0} ${U_.kg}</text></g>${bbTxt(300,285,X('masofa, sm','расстояние, см','distance, cm'),'middle')}`;
 return{cat:'sta',ic:'⚖️',tag:['Richag','Рычаг','Lever'],
  task:X('Yuklarni qo‘yib, richagni <b>muvozanatga</b> keltiring','Подвесьте грузы и <b>уравновесьте</b> рычаг','Place weights to <b>balance</b> the lever'),
  hint:'M = F·d,  M₁ = M₂',goal:'ΣM = 0',chips,sol,base,
  slots:pos.map(q=>({x:XP(q),y:166,w:50,h:42,c:'wtsl'})),
  view(pl){let L=m0*p0,R=0,n=0;pl.forEach((c,s)=>{if(c<0)return;n++;const q=pos[s],m=chips[c].v;if(q<0)L+=m*-q;else R+=m*q;});const tq=R-L,ok=n>0&&tq===0;
   return{ok,rot:Math.max(-10,Math.min(10,tq*1.4)),read:bbRows([['M₁ ↺',`${nf(L)} ${U_.Nm}`,n?ok:null],['M₂ ↻',`${nf(R)} ${U_.Nm}`,n?ok:null],[X('g = 10 m/s², 10 sm = 0,1 m','g = 10 м/с², 10 см = 0,1 м','g = 10 m/s², 10 cm = 0.1 m'),'']])};}};}
pzLever.cat='sta';

/* 4) yupqa linza: 1/F = 1/d + 1/f, ekran 100 sm da */
function pzLens(){const L=100,ach={10:9,20:16,30:21,40:24,50:25};const xs=[10,20,30,40,50];const x0=xs[rI(5)],F=ach[x0];
 const dec=shuf([12,14,18,28,30,35].filter(v=>!Object.values(ach).includes(v))).slice(0,2);
 const chips=shuf([F,...dec]).map(v=>({v,l:`<span class="lf">F = ${v} ${U_.sm}</span><span class="ls">${v}</span>`,c:'lns'}));
 const cms=[10,20,30,40,50,60,70,80,90],XC=c=>60+4.8*c,Y=h=>170-5*h;const sol=[];sol[cms.indexOf(x0)]=chips.findIndex(c=>c.v===F);
 let rul='';for(let c=0;c<=100;c+=10)rul+=`<line x1="${XC(c)}" y1="252" x2="${XC(c)}" y2="260" class="tk"/>${bbTxt(XC(c),276,c,'middle')}`;
 const base=`<line x1="40" y1="170" x2="560" y2="170" class="ax"/><line x1="56" y1="256" x2="544" y2="256" class="w" style="opacity:.4"/>${rul}<path d="M60 170V120M52 130L60 118L68 130" class="obj"/>${bbTxt(60,108,X('jism','предмет','object'),'middle')}<rect x="536" y="70" width="10" height="190" rx="3" class="scr"/>${bbTxt(541,62,X('ekran','экран','screen'),'middle')}${bbTxt(300,296,U_.sm,'middle')}`;
 return{cat:'opt',ic:'🔍',tag:['Yupqa linza','Тонкая линза','Thin lens'],
  task:X('Linzani tanlab relsga qo‘ying: ekranda <b>aniq tasvir</b> hosil bo‘lsin','Выберите линзу и поставьте её на скамью: на экране должно получиться <b>чёткое изображение</b>','Pick a lens and put it on the rail so the screen shows a <b>sharp image</b>'),
  hint:'1/F = 1/d + 1/f',goal:X('aniq tasvir','чёткое изображение','sharp image'),chips,sol,base,
  slots:cms.map(c=>({x:XC(c),y:170,w:30,h:116,c:'lens'})),
  view(pl){const on=pl.map((c,s)=>[c,s]).filter(a=>a[0]>=0);
   if(!on.length)return{read:bbRows([[X('Linzani relsga qo‘ying','Поставьте линзу на скамью','Put a lens on the rail'),'—']])};
   if(on.length>1)return{read:bbRows([[X('Faqat bitta linza kerak','Нужна только одна линза','Use only one lens'),'✗',false]])};
   const x=cms[on[0][1]],f=chips[on[0][0]].v,h=10;const toS=L-x;
   const r1=h-h*toS/f,r2=h-h*L/x;const cl=v=>Math.max(-40,Math.min(40,v));
   let dyn=`<circle cx="${XC(x-f)}" cy="170" r="3.5" class="fp"/><circle cx="${XC(x+f)}" cy="170" r="3.5" class="fp"/>${bbTxt(XC(x-f),190,'F','middle')}${bbTxt(XC(x+f),190,'F','middle')}`;
   dyn+=`<polyline class="ray r1" points="${XC(0)},${Y(h)} ${XC(x)},${Y(h)} ${XC(L)},${Y(cl(r1))}"/><polyline class="ray r2" points="${XC(0)},${Y(h)} ${XC(L)},${Y(cl(r2))}"/>`;
   const hits=[r1,r2];if(x>f){const y3=-h*f/(x-f);hits.push(y3);dyn+=`<polyline class="ray r3" points="${XC(0)},${Y(h)} ${XC(x)},${Y(cl(y3))} ${XC(L)},${Y(cl(y3))}"/>`;}
   const ok=Math.abs(1/x+1/toS-1/f)<1e-9;let fd='∞';
   if(x>f){const fi=x*f/(x-f),hi=Math.max(-17,-h*fi/x);fd=`${nf(fi,1)} ${U_.sm}`;if(ok)dyn+=`<path class="img" d="M541 170V${Y(hi)}M533 ${Y(hi)-10}L541 ${Y(hi)+2}L549 ${Y(hi)-10}"/>`;}
   else if(x<f){fd=X('mavhum','мнимое','virtual');}
   if(!ok){const lo=Math.min(...hits.map(cl)),hi2=Math.max(...hits.map(cl));dyn+=`<rect x="533" y="${Y(hi2)}" width="16" height="${Math.max(3,(hi2-lo)*5)}" rx="4" class="blur"/>`;}
   return{ok,dyn,read:bbRows([['d',`${x} ${U_.sm}`],['F',`${f} ${U_.sm}`],['f',fd,ok],[X('linzadan ekrangacha','от линзы до экрана','lens to screen'),`${toS} ${U_.sm}`,ok]])};}};}
pzLens.cat='opt';

/* 5) lazer va ko‘zgular: tushish burchagi = qaytish burchagi */
function pzLaser(){const CX=c=>100+80*c,CY=r=>70+80*r;const r0=rI(3);let cells=[],rt;
 if(Math.random()<.45){const r1=shuf([0,1,2].filter(r=>r!==r0))[0],c1=rI(5),t=r1<r0?'/':'\\';cells=[[c1,r0,t],[c1,r1,t]];rt=r1;}
 else{const r1=shuf([0,1,2].filter(r=>r!==r0))[0],r2=[0,1,2].find(r=>r!==r0&&r!==r1),c1=rI(3),c2=c1+1+rI(5-c1);const t1=r1<r0?'/':'\\',t2=r2<r1?'/':'\\';cells=[[c1,r0,t1],[c1,r1,t1],[c2,r1,t2],[c2,r2,t2]];rt=r2;}
 const key=(c,r)=>c+','+r,onPath=new Set(cells.map(a=>key(a[0],a[1])));const free=[];for(let c=0;c<6;c++)for(let r=0;r<3;r++)if(!onPath.has(key(c,r)))free.push([c,r]);
 const slotsC=shuf([...cells.map(a=>[a[0],a[1]]),...shuf(free).slice(0,3)]);
 const need=cells.map(a=>a[2]);const chips=shuf([...need,'/','\\']).map(v=>({v,l:v==='/'?'╱':'╲',c:'mir'}));
 const sol=bbAss(chips,cells.map(a=>[slotsC.findIndex(s=>s[0]===a[0]&&s[1]===a[1]),a[2]]));
 let grid='';for(let c=0;c<6;c++)for(let r=0;r<3;r++)grid+=`<rect x="${CX(c)-38}" y="${CY(r)-38}" width="76" height="76" rx="8" class="cell"/>`;
 const base=`${grid}<rect x="8" y="${CY(r0)-14}" width="40" height="28" rx="6" class="las"/><circle cx="48" cy="${CY(r0)}" r="4" fill="#ff3b5c"/><g class="tgt"><circle cx="572" cy="${CY(rt)}" r="18"/><circle cx="572" cy="${CY(rt)}" r="11"/><circle cx="572" cy="${CY(rt)}" r="4"/></g>`;
 return{cat:'opt',ic:'🔦',tag:['Lazer va ko‘zgular','Лазер и зеркала','Laser & mirrors'],
  task:X('Ko‘zgularni qo‘yib, lazer nurini <b>nishonga</b> yo‘naltiring','Расставьте зеркала и направьте луч лазера в <b>мишень</b>','Place mirrors to steer the laser into the <b>target</b>'),
  hint:X('tushish burchagi = qaytish burchagi','угол падения = углу отражения','angle of incidence = angle of reflection'),goal:X('nur nishonga tegsin','луч попадает в мишень','beam hits the target'),chips,sol,base,
  slots:slotsC.map(([c,r])=>({x:CX(c),y:CY(r),w:64,h:64,c:'mirsl'})),
  view(pl){const M={};pl.forEach((k,s)=>{if(k>=0)M[key(slotsC[s][0],slotsC[s][1])]=chips[k].v;});
   let c=0,r=r0,dx=1,dy=0,n=0;const pts=[[48,CY(r0)]];
   for(let s=0;s<60;s++){if(c<0||c>5||r<0||r>2)break;const t=M[key(c,r)];if(t){n++;pts.push([CX(c),CY(r)]);if(t==='/')[dx,dy]=[-dy,-dx];else[dx,dy]=[dy,dx];}c+=dx;r+=dy;}
   const lc=c-dx,lr=r-dy;const ok=dx===1&&r===rt&&r>=0&&r<=2;const end=ok?[560,CY(rt)]:[CX(lc)+dx*70,CY(lr)+dy*70];pts.push(end);
   return{ok,dyn:`<polyline class="beam" points="${pts.map(p=>p.join(',')).join(' ')}"/>${ok?`<circle cx="572" cy="${CY(rt)}" r="24" class="tgt-on"/>`:''}`,
    read:bbRows([[X('ko‘zgular yo‘lida','зеркал на пути','mirrors hit'),String(n)],[X('nishon','мишень','target'),ok?'✓':'✗',ok]])};}};}
pzLaser.cat='opt';

/* 6) zaryadlar: P nuqtada E = 0 */
function pzCharge(){const V=[[1,2],[2,1],[1,3],[3,1]][rI(4)],a=V[0],b=V[1];const qa=b>a?1:(a/b)**2,qb=b>a?(b/a)**2:1;
 const pool=[1,2,4,9,-1];const chips=shuf(pool).map(v=>({v,l:`${v>0?'+':'−'}${Math.abs(v)===1?'':Math.abs(v)}q`,c:v>0?'qp':'qn'}));
 const XA_=110,XB=490,XPp=XA_+(XB-XA_)*a/(a+b);const sol=bbAss(chips,[[0,qa],[1,qb]]);
 const base=`<line x1="40" y1="160" x2="560" y2="160" class="ax"/><path d="M${XPp-9} 151L${XPp+9} 169M${XPp+9} 151L${XPp-9} 169" class="pp"/>${bbTxt(XPp,140,'P','middle')}
 <path d="M${XA_} 222V234M${XPp} 222V234M${XB} 222V234M${XA_} 228H${XB}" class="dim"/>${bbTxt((XA_+XPp)/2,250,a===1?'r':a+'r','middle')}${bbTxt((XPp+XB)/2,250,b===1?'r':b+'r','middle')}${bbTxt(XA_,122,'A','middle')}${bbTxt(XB,122,'B','middle')}`;
 const arrow=(x0,len,cls)=>{if(Math.abs(len)<1)return'';const x1=x0+len,s=Math.sign(len);return`<path class="${cls}" d="M${x0} 160H${x1}M${x1-s*10} 153L${x1} 160L${x1-s*10} 167"/>`;};
 return{cat:'est',ic:'➕',tag:['Elektr maydon','Электрическое поле','Electric field'],
  task:X('Zaryadlarni A va B ga qo‘ying: P nuqtada maydon kuchlanganligi <b>nolga</b> teng bo‘lsin','Поставьте заряды в A и B так, чтобы напряжённость поля в точке P была <b>равна нулю</b>','Put charges at A and B so the electric field at P is <b>zero</b>'),
  hint:'E = k·q / r²',goal:'E(P) = 0',chips,sol,base,
  slots:[{x:XA_,y:160,w:54,h:54,c:'q'},{x:XB,y:160,w:54,h:54,c:'q'}],
  view(pl){const A=pl[0]>=0?chips[pl[0]].v:0,B=pl[1]>=0?chips[pl[1]].v:0;const EA=A/(a*a),EB=-B/(b*b),E=EA+EB;const L=v=>Math.sign(v)*Math.min(150,48*Math.sqrt(Math.abs(v)));
   const full=A&&B,ok=!!full&&Math.abs(E)<1e-9;let dyn='';
   [[XA_,A],[XB,B]].forEach(([x,q])=>{if(!q)return;for(let k=0;k<12;k++){const an=k/12*Math.PI*2,c=Math.cos(an),s=Math.sin(an),r1=34,r2=56;dyn+=`<line x1="${x+c*r1}" y1="${160+s*r1}" x2="${x+c*r2}" y2="${160+s*r2}" class="fln ${q>0?'p':'n'}"/>`;}});
   dyn+=`<g transform="translate(0,-34)">${arrow(XPp,L(EA),'ea')}</g><g transform="translate(0,34)">${arrow(XPp,L(EB),'eb')}</g>`;
   dyn+=ok?`<circle cx="${XPp}" cy="160" r="22" class="zero"/>`:arrow(XPp,L(E),'en');
   const fe=v=>`${nf(Math.abs(v))} kq/r²`;
   return{ok,dyn,read:bbRows([['E_A',fe(EA)],['E_B',fe(EB)],['E(P)',fe(E),full?ok:null]])};}};}
pzCharge.cat='est';

/* 7) issiqlik balansi: T = (m1t1 + m2t2)/(m1 + m2) */
function pzMix(){let cups,T,pair;
 for(let t=0;t<500;t++){const ts=shuf([10,20,30,40,50,60,70,80,90]).slice(0,4);cups=ts.map(tt=>({m:1+rI(3),t:tt}));const prs=[];for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){const v=(cups[i].m*cups[i].t+cups[j].m*cups[j].t)/(cups[i].m+cups[j].m);prs.push([i,j,v]);}
  const cand=shuf(prs.filter(p=>Number.isInteger(Math.round(p[2]*1e6)/1e6)&&prs.every(q=>q===p||Math.abs(q[2]-p[2])>=1)));if(cand.length){pair=cand[0];T=pair[2];break;}}
 const tcol=(t,a=1)=>{const k=Math.max(0,Math.min(1,t/100)),A=[60,140,255],B=[240,64,52];return`rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join(' ')} / ${a})`;};const chips=cups.map((c,i)=>({v:i,l:`${c.m} ${U_.kg} · ${c.t} °C`,c:'cup',st:`--cc:${tcol(c.t)}`}));
 const sol=[pair[0],pair[1]];const YT=t=>250-2*t;let tk='';for(let t=0;t<=100;t+=20)tk+=`<line x1="480" y1="${YT(t)}" x2="490" y2="${YT(t)}" class="tk"/>${bbTxt(496,YT(t)+4,t)}`;
 const base=`<path d="M150 104V262Q150 272 160 272H360Q370 272 370 262V104" class="bk"/><path d="M205 88V112M197 104L205 114L213 104M315 88V112M307 104L315 114L323 104" class="dim"/><rect x="462" y="44" width="16" height="210" rx="8" class="th"/><circle cx="470" cy="262" r="14" class="thb"/>${tk}<path d="M440 ${YT(T)}H462" class="tline"/>${bbTxt(436,YT(T)+4,`🎯 ${T}°`,'end')}`;
 return{cat:'trm',ic:'🌡️',tag:['Issiqlik balansi','Тепловой баланс','Heat balance'],
  task:X(`Ikki idishdagi suvni aralashtiring: harorat <b>${T} °C</b> bo‘lsin`,`Смешайте воду из двух сосудов, чтобы получилось <b>${T} °C</b>`,`Mix water from two cups to get exactly <b>${T} °C</b>`),
  hint:'T = (m₁t₁ + m₂t₂) / (m₁ + m₂)',goal:`${T} °C`,chips,sol,base,
  slots:[{x:205,y:58,w:104,h:44,c:'cupsl'},{x:315,y:58,w:104,h:44,c:'cupsl'}],
  view(pl){const on=pl.filter(c=>c>=0).map(c=>cups[c]);if(!on.length)return{read:bbRows([[X('Idishga suv quying','Налейте воду в сосуд','Pour water into the beaker'),'—']]),dyn:''};
   const M=on.reduce((s,c)=>s+c.m,0),Tm=on.reduce((s,c)=>s+c.m*c.t,0)/M,ok=on.length===2&&Math.abs(Tm-T)<1e-6;const h=Math.min(150,M*25);
   let dyn=`<path d="M152 ${270-h}Q205 ${262-h} 260 ${270-h}T368 ${270-h}V262Q368 270 360 270H160Q152 270 152 262Z" class="liq" style="fill:${tcol(Tm,.6)}"/><rect x="465" y="${YT(Tm)}" width="10" height="${254-YT(Tm)}" rx="5" class="hg"/>`;
   if(Tm>=55)for(let k=0;k<3;k++)dyn+=`<path class="stm" style="animation-delay:${k*.5}s" d="M${200+k*55} ${258-h}q-8 -12 0 -24t0 -24"/>`;
   return{ok,dyn,read:bbRows([['m',`${M} ${U_.kg}`],['T',`${nf(Tm,1)} °C`,on.length===2?ok:null]])};}};}
pzMix.cat='trm';

/* 8) Guk qonuni: x = mg/k, uchala prujina bir xil cho‘zilsin */
function pzSpring(){let ks,c,ms;
 for(let t=0;t<500;t++){ks=shuf([1,2,3,4]).slice(0,3);c=1+rI(2);const need=ks.map(k=>k*c);if(need.some(v=>v>8))continue;const dec=shuf([1,2,3,4,5,6,7,8].filter(v=>!need.includes(v))).slice(0,2);ms=[...need,...dec];
  let cnt=0;for(let i=0;i<5;i++)for(let j=0;j<5;j++)for(let k=0;k<5;k++){if(i===j||j===k||i===k)continue;const x=[ms[i]/ks[0],ms[j]/ks[1],ms[k]/ks[2]];if(Math.abs(x[0]-x[1])<1e-9&&Math.abs(x[1]-x[2])<1e-9)cnt++;}if(cnt===1)break;}
 const chips=shuf(ms).map(v=>({v,l:`${v*100} ${U_.g}`,c:'wt'}));const XS=[165,305,445],PX=22,Y0=72;
 const sol=bbAss(chips,ks.map((k,i)=>[i,k*c]));
 let rul='';for(let s=0;s<=8;s++)rul+=`<line x1="70" y1="${Y0+PX*s}" x2="${s%2?78:84}" y2="${Y0+PX*s}" class="tk"/>${s%2?'':bbTxt(90,Y0+PX*s+4,s)}`;
 const base=`<rect x="110" y="18" width="430" height="12" rx="4" class="bm"/><line x1="70" y1="${Y0}" x2="70" y2="${Y0+PX*8}" class="w" style="opacity:.4"/>${rul}${bbTxt(70,Y0-10,U_.sm,'middle')}${XS.map((x,i)=>bbTxt(x+22,50,`k = ${ks[i]} ${U_.Nsm}`)).join('')}`;
 const spring=(x,y1)=>{const n=12,y0=30,dy=(y1-y0-16)/n;let d=`M${x} ${y0}V${y0+8}`;for(let i=0;i<n;i++)d+=`L${x+(i%2?-12:12)} ${y0+8+dy*(i+.5)}`;d+=`L${x} ${y1-8}V${y1}`;return`<path class="spr" d="${d}"/>`;};
 return{cat:'din',ic:'🪝',tag:['Guk qonuni','Закон Гука','Hooke’s law'],
  task:X('Yuklarni iling: uchala prujina <b>bir xil</b> cho‘zilsin','Подвесьте грузы так, чтобы все три пружины растянулись <b>одинаково</b>','Hang weights so all three springs stretch <b>equally</b>'),
  hint:'F = k·x  →  x = mg / k',goal:'x₁ = x₂ = x₃',chips,sol,base,
  slots:XS.map(x=>({x,y:Y0+22,w:66,h:40,c:'wtsl'})),
  view(pl){const xs=pl.map((k,i)=>k<0?0:chips[k].v/ks[i]);const full=pl.every(k=>k>=0),ok=full&&Math.abs(xs[0]-xs[1])<1e-9&&Math.abs(xs[1]-xs[2])<1e-9;
   let dyn=XS.map((x,i)=>spring(x,Y0+PX*xs[i])).join('');if(ok)dyn+=`<line x1="96" y1="${Y0+PX*xs[0]}" x2="540" y2="${Y0+PX*xs[0]}" class="lvl"/>`;
   return{ok,dyn,sy:xs.map(x=>Y0+PX*x+22),read:bbRows(xs.map((x,i)=>[`x${'₁₂₃'[i]}`,`${nf(x)} ${U_.sm}`,full?ok:null]))};}};}
pzSpring.cat='din';

const BB_PZ=[pzCircA,pzCircB,pzLever,pzLens,pzLaser,pzCharge,pzMix,pzSpring];
const BBN={5:3,10:5,15:7};
let bbForce=-1;
function bbGen(){if(bbForce>=0)return BB_PZ[bbForce]();let g=BB_PZ;if(st.cat){const f=g.filter(x=>x.cat===st.cat);if(f.length)g=f;}return pickFrom('bb'+(st.cat||''),g)();}
function bbStart(){G.bRounds=BBN[G.rounds]||4;G.br=0;G.bp=0;bbTurn();}
function bbTurn(){if(G.br>=G.bRounds)return finish();const p=G.bp,my=++qid;if(p===0)G.bpz=bbGen();
 roundLbl(`${G.br+1} / ${G.bRounds}`);turnHi(G.ai?-1:p);stat(0,'');stat(1,'');
 if(!G.ai){stage().className='bt-stage';stage().innerHTML=`<div class="bt-inter" style="grid-area:a"><span class="av">${G.pl[p].av}</span><h3>${X('Navbat','Ход','Turn')}: ${esc(G.pl[p].name)}</h3><p class="bt-note">${G.bpz.ic} ${esc(XA(G.bpz.tag))} · ${X('Qurilmani shu o‘yinchiga bering.','Передайте устройство этому игроку.','Pass the device to this player.')}</p><button type="button" class="bt-btn pri" id="bt-ready">${X('Tayyorman','Я готов','I’m ready')} →</button></div>`;
  $$('#bt-ready').onclick=()=>bbPlay(p,my);}else bbPlay(0,my);}
function bbPlay(p,my){const P=G.bpz,n=P.slots.length,pl=new Array(n).fill(-1);let sel=null,done=false;
 const sg=stage();sg.className='bt-stage';
 sg.innerHTML=`<div class="bt-q bb-q"><span class="bt-tag">${P.ic} ${esc(XA(P.tag))}</span><div class="bt-qt">${P.task}<span class="pr"><span class="bb-hint">${P.hint}</span> · ${X('Detallarni sxemaga sudrang yoki bosib, keyin joyni bosing.','Перетащите детали на схему или нажмите деталь, затем место.','Drag parts onto the scene, or tap a part and then a spot.')}</span></div></div>
 <div class="bb"><div class="bb-sc" id="bb-sc"><svg viewBox="0 0 600 300" class="bb-svg" aria-hidden="true">${P.base}<g class="bb-dyn"></g></svg><div class="bb-ov">${P.slots.map((s,i)=>`<div class="bt-slot bb-slot ${s.c||''}" data-s="${i}" role="button" tabindex="0" aria-label="${i+1}" style="left:${(s.x-s.w/2)/6}%;top:${(s.y-s.h/2)/3}%;width:${s.w/6}%;height:${s.h/3}%"></div>`).join('')}</div><div class="bb-ok" aria-hidden="true">✓</div></div>
 <div class="bb-side"><div class="bb-goal">🎯 ${P.goal}</div><div class="bt-tray bb-tray" id="bt-tray">${P.chips.map((c,k)=>`<button type="button" class="bt-chip bb-chip ${c.c||''}" data-c="${k}"${c.st?` style="${c.st}"`:''}>${c.l}</button>`).join('')}</div><div class="bb-read" id="bb-read" aria-live="polite"></div><div class="bt-ddbar"><button type="button" class="bt-btn" id="bb-reset">↺ ${X('Qaytadan','Сначала','Reset')}</button><span class="bt-note" id="bt-ddn"></span></div></div></div>`;
 const sc=$$('#bb-sc'),dyn=sc.querySelector('.bb-dyn'),rot=sc.querySelector('.bb-rot'),ov=sc.querySelector('.bb-ov'),tray=$$('#bt-tray'),read=$$('#bb-read');
 const chip=k=>sg.querySelector(`.bb-chip[data-c="${k}"]`),slotEl=s=>sg.querySelector(`.bb-slot[data-s="${s}"]`);
 const upd=()=>{const v=P.view(pl);dyn.innerHTML=v.dyn||'';read.innerHTML=v.read||'';
  if(v.rot!=null){const t=`rotate(${v.rot.toFixed(2)}deg)`;if(rot)rot.style.transform=t;ov.style.transform=t;}
  if(v.sy)v.sy.forEach((y,i)=>{slotEl(i).style.top=((y-P.slots[i].h/2)/3)+'%';});
  if(v.ok&&!done)later(()=>{if(my===qid&&!done&&P.view(pl).ok)win();},380);};
 const put=(k,s)=>{if(done)return;const prev=pl.indexOf(k);if(prev>=0)pl[prev]=-1;if(pl[s]>=0)tray.appendChild(chip(pl[s]));pl[s]=k;slotEl(s).appendChild(chip(k));chip(k).classList.remove('sel');sel=null;SND.flip();upd();};
 const back=k=>{const prev=pl.indexOf(k);if(prev>=0)pl[prev]=-1;tray.appendChild(chip(k));chip(k).classList.remove('sel');sel=null;upd();};
 const pick=(k,c)=>{if(sel===k){c.classList.remove('sel');sel=null;}else{sg.querySelectorAll('.bb-chip.sel').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');sel=k;}};
 sg.querySelectorAll('.bb-chip').forEach(c=>{const k=+c.dataset.c;let sx=0,sy=0,drag=null,moved=false;
  const hot=e=>{sg.querySelectorAll('.bb-slot.hot').forEach(s=>s.classList.remove('hot'));const el=document.elementFromPoint(e.clientX,e.clientY);return el;};
  c.onpointerdown=e=>{if(done)return;e.preventDefault();sx=e.clientX;sy=e.clientY;moved=false;c.setPointerCapture(e.pointerId);};
  c.onpointermove=e=>{if(done||!c.hasPointerCapture(e.pointerId))return;if(!moved&&Math.hypot(e.clientX-sx,e.clientY-sy)>6){moved=true;drag=c.cloneNode(true);drag.classList.add('bt-ghost','bb-ghost');drag.style.width=Math.max(56,Math.min(150,c.offsetWidth))+'px';root.appendChild(drag);c.style.opacity='.3';}
   if(drag){drag.style.left=e.clientX+'px';drag.style.top=e.clientY+'px';const el=hot(e);const s=el&&el.closest('.bb-slot');if(s)s.classList.add('hot');}};
  const end=e=>{if(drag){drag.remove();drag=null;c.style.opacity='';const el=hot(e);const s=el&&el.closest('.bb-slot');if(s)put(k,+s.dataset.s);else if(el&&el.closest('.bb-side,.bb-q'))back(k);}
   else if(!moved&&!done){if(c.closest('.bb-slot')){back(k);return;}pick(k,c);}};
  c.onpointerup=end;c.onpointercancel=()=>{if(drag){drag.remove();drag=null;c.style.opacity='';}};
  c.onclick=e=>{if(e.detail===0&&!done){if(c.closest('.bb-slot'))back(k);else pick(k,c);}};});
 sg.querySelectorAll('.bb-slot').forEach(s=>{const go=()=>{if(sel!=null&&!done)put(sel,+s.dataset.s);};s.onclick=e=>{if(e.target.closest('.bb-chip'))return;go();};s.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){if(e.target!==s)return;e.preventDefault();go();}};});
 $$('#bb-reset').onclick=()=>{if(done)return;pl.forEach((k,s)=>{if(k>=0)back(k);});};
 const dur=75000,t0=performance.now();
 const showSol=()=>{pl.forEach((k,s)=>{if(k>=0){pl[s]=-1;tray.appendChild(chip(k));}});P.sol.forEach((k,s)=>{if(k!=null&&k>=0){pl[s]=k;slotEl(s).appendChild(chip(k));}});upd();};
 const stop=()=>{done=true;qid++;if(raf)cancelAnimationFrame(raf);raf=0;sg.querySelectorAll('.bb-chip').forEach(x=>x.disabled=true);sg.querySelectorAll('.bb-slot').forEach(x=>x.tabIndex=-1);const rs=$$('#bb-reset');if(rs)rs.remove();};
 const nextBtn=(auto)=>{const bar=sg.querySelector('.bb-side .bt-ddbar');const b=document.createElement('button');b.type='button';b.className='bt-btn pri';b.id='bt-next';b.textContent=X('Davom etish','Дальше','Continue')+' →';bar.prepend(b);b.focus({preventScroll:true});let gone=false;const go=()=>{if(gone)return;gone=true;if(G.ai){G.br++;}else{if(G.bp===0)G.bp=1;else{G.bp=0;G.br++;}}bbTurn();};b.onclick=go;if(auto){const m=qid;later(()=>{if(m===qid)go();},auto);}};
 const win=()=>{if(done)return;const left=G.left();stop();const pp=G.pl[p];pp.streak++;pp.best=Math.max(pp.best,pp.streak);pp.ok++;pp.tsum+=dur-left;pp.tn++;
  const pts=Math.round((100+150*left/dur)*mult(pp.streak));pp.score+=pts;streakUi();sc.classList.add('win');burst(sc);flash(true);SND.ok(pp.streak);fly(sc,p,'+'+pts);setTimeout(setScore,520);
  stat(p,X('yig‘di ✓','собрал ✓','built ✓')+` ${((dur-left)/1000).toFixed(1)} s`);if(G.ai){stat(1,X('to‘xtadi','остановлен','stopped'));say('lose');}
  toast(`${pp.av} ${X('Model ishladi!','Модель работает!','It works!')} +${pts}`);nextBtn(G.ai?2600:0);};
 const lose=(aiWon)=>{if(done)return;stop();const pp=G.pl[p];pp.streak=0;streakUi();shake();SND.bad();
  if(aiWon){const ai=G.pl[1],left=G.left();ai.streak++;ai.best=Math.max(ai.best,ai.streak);ai.ok++;ai.tsum+=dur-left;ai.tn++;const pts=Math.round((100+150*left/dur)*mult(ai.streak));ai.score+=pts;streakUi();fly($$('#bt-pl1'),1,'+'+pts);setTimeout(setScore,520);say('win');toast(`🤖 ${X('Robot birinchi yig‘di','Робот собрал первым','The robot built it first')} +${pts}`,true);}
  else toast(`⏱ ${X('Vaqt tugadi','Время вышло','Time’s up')}`,true);
  if(G.ai&&!aiWon)G.pl[1].streak=0;
  $$('#bt-ddn').textContent=X('To‘g‘ri yechim ko‘rsatildi','Показано верное решение','Here is a correct solution');setTimeout(()=>{if(G&&my+1===qid){showSol();sc.classList.add('sol');}},500);nextBtn(0);};
 // robot poygasi
 if(G.ai){const fail=Math.random()<[0.3,0.15,0.05][st.diff];const T=rnd(...[[30,50],[18,32],[10,20]][st.diff])*1000;const stopAt=fail?rnd(.55,.9):1;
  const tick=()=>{if(my!==qid||done)return;const k=Math.min(1,(performance.now()-t0)/T);const pc=Math.min(stopAt,k);stat(1,`🛠️ ${Math.round(pc*100)}%${fail&&k>=stopAt?' 🤔':''}`);if(!fail&&k>=1){lose(true);return;}later(tick,400);};later(tick,400);}
 upd();G.left=timer(dur,()=>lose(false),my);}

function finish(){clearAll();stat(0,'');stat(1,'');[0,1].forEach(i=>{const e=$$('#bt-pl'+i);if(e)e.classList.remove('frozen');});const [a,b]=G.pl;const w=a.score===b.score?-1:a.score>b.score?0:1;
 if(G.ai){const wins=store.get('wins',[0,0,0]);if(w===0){wins[st.diff]++;store.set('wins',wins);}}
 const human=w===0||(!G.ai&&w===1);
 const title=w<0?X('Durang!','Ничья!','It’s a draw!'):`${G.pl[w].av} ${esc(G.pl[w].name)} ${X('g‘alaba qozondi!','побеждает!','wins!')}`;
 const sub=w<0?X('Kuchlar teng. Yana bir bor?','Силы равны. Ещё раз?','Evenly matched. Again?'):w===0&&G.ai?X('Robotni yengdingiz! Endi qiyinroq darajani sinab ko‘ring.','Вы победили робота! Попробуйте уровень посложнее.','You beat the robot! Try a harder level next.'):w===1&&G.ai?X('Robot bu safar kuchliroq chiqdi. Qayta urinib ko‘ring!','В этот раз робот оказался сильнее. Попробуйте ещё!','The robot won this time. Have another go!'):X('Ajoyib bellashuv bo‘ldi!','Отличная была битва!','What a battle!');
 turnHi(-1);roundLbl(X('yakun','финиш','final'));const ring=$$('#bt-ring');if(ring){ring.style.setProperty('--p',1);ring.classList.remove('low','beat');}const tn=$$('#bt-tn');if(tn)tn.textContent='🏁';
 const avg=p=>p.tn?(p.tsum/p.tn/1000).toFixed(1).replace('.',LG==='en'?'.':','):'–';
 const okLbl=G.type==='memory'?X('juftlik','пар','pairs'):G.type==='drag'?X('to‘g‘ri joy','верных мест','correct slots'):G.type==='build'?X('yig‘ilgan model','собрано моделей','models built'):X('yutgan savol','выиграно вопросов','questions won');
 // XP va yutuqlar
 let xpHtml='';const JF=window.JF;
 if(JF){const best=Math.max(a.score,G.ai?0:b.score);const gain=Math.round(best/10)+(human?50:10);const r0=JF.rank();const info=JF.addXP(gain,true);
  JF.count('battles');if(G.ai&&w===0){JF.ach('win');if(st.diff===2)JF.ach('hard');}if(Math.max(a.best,G.ai?0:b.best)>=5)JF.ach('streak5');if(JF.get('battles')>=10)JF.ach('battle10');
  const r=JF.rank();const pc=r.next?Math.round((JF.xp()-r.cur)/(r.next-r.cur)*100):100;
  xpHtml=`<div class="bt-xp"><div class="top"><span>${r.ic} ${esc(r.name)}${r.k>r0.k?` <span style="color:var(--green)">▲ ${X('yangi unvon!','новое звание!','new rank!')}</span>`:''}</span><span style="color:var(--green)">+${gain} XP</span></div><div class="bar"><i data-w="${pc}"></i></div><small class="bt-note">${JF.xp()} XP${r.next?` · ${X('keyingi unvongacha','до следующего звания','to next rank')}: ${r.next-JF.xp()} XP`:''}</small></div>`;}
 stage().className='bt-stage';
 stage().innerHTML=`<div class="bt-res" style="grid-area:a"><div class="cup">${w<0?'🤝':human?'🏆':'🤖'}</div><h3>${title}</h3><p class="bt-note">${sub}</p>
 <div class="bt-final">${G.pl.map((p,i)=>`<div class="${i===w?'win':''}"><span style="font-size:34px">${p.av}</span><b>${esc(p.name)}</b><strong style="color:${i?'var(--warm)':'var(--accent)'}">${p.score}</strong>
  <div class="bt-stats"><span><b>${p.ok}</b>${okLbl}</span><span><b>🔥${p.best}</b>${X('eng uzun seriya','лучшая серия','best streak')}</span><span><b>${avg(p)} s</b>${X('o‘rtacha vaqt','среднее время','avg time')}</span></div></div>`).join('')}</div>
 ${xpHtml}
 <div class="bt-ddbar" style="justify-content:center"><button type="button" class="bt-btn pri" id="bt-again">↻ ${X('Qayta o‘ynash','Сыграть ещё','Play again')}</button><button type="button" class="bt-btn" id="bt-lob">${X('Boshqa o‘yin tanlash','Выбрать другую игру','Choose another game')}</button><button type="button" class="bt-btn" id="bt-share">📋 ${X('Natijani nusxalash','Скопировать результат','Copy result')}</button></div></div>`;
 $$('#bt-again').onclick=start;$$('#bt-lob').onclick=lobby;
 $$('#bt-share').onclick=()=>{const txt=`⚔️ ${X('Jonli Fizika bellashuvi','Битва «Живая физика»','Live Physics battle')} · ${tname(G.type)}\n${a.av} ${a.name}: ${a.score}  —  ${b.av} ${b.name}: ${b.score}\n${w<0?'🤝':'🏆 '+G.pl[w].name}`;
  const ok=()=>toast('✓ '+X('Nusxa olindi','Скопировано','Copied'));try{navigator.clipboard.writeText(txt).then(ok,()=>{});}catch(e){}};
 requestAnimationFrame(()=>requestAnimationFrame(()=>{const bi=stage().querySelector('.bt-xp .bar i');if(bi)bi.style.width=bi.dataset.w+'%';}));
 if(w>=0||!G.ai){SND.win();if(human||!G.ai)confetti();}}
function confetti(){if(RMO)return;const cv=document.createElement('canvas');cv.className='bt-conf';root.appendChild(cv);const dpr=Math.min(2,devicePixelRatio||1);const W=innerWidth,H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;const c=cv.getContext('2d');c.scale(dpr,dpr);
 const cols=['#2456e0','#7a4fd6','#dd7a12','#1d9566','#d2403a','#3fc4e0'];const ps=Array.from({length:160},()=>({x:W/2+rnd(-60,60),y:H*0.35,vx:rnd(-7,7),vy:rnd(-13,-4),r:rnd(4,8),a:rnd(0,6),va:rnd(-0.3,0.3),col:cols[Math.floor(Math.random()*cols.length)]}));
 let t=0;const f=()=>{t++;c.clearRect(0,0,W,H);ps.forEach(p=>{p.vy+=0.28;p.vx*=0.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;c.save();c.translate(p.x,p.y);c.rotate(p.a);c.fillStyle=p.col;c.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);c.restore();});if(t<200)requestAnimationFrame(f);else cv.remove();};requestAnimationFrame(f);}

/* ---------- klaviatura ---------- */
addEventListener('keydown',e=>{if(root.hidden)return;if(e.key==='Escape'){if(G)lobby();else close();return;}
 if(!G||!G.q||G.q.done||G.type==='drag'||G.type==='memory'||G.type==='build')return;if(e.target.closest&&e.target.closest('input,select'))return;
 const key=e.key.toLowerCase();for(let i=0;i<2;i++){if(i===1&&G.ai)break;const k=KEYS[i].indexOf(e.key);if(k>=0&&k<G.q.opts.length){answer(i,k);e.preventDefault();}const pk=PWK[i].indexOf(key);if(pk>=0){usePw(i,'hfd'[pk]);e.preventDefault();}}});

/* ---------- ochish / yopish ---------- */
let pushed=false,prevOv='';
function open(push){if(!root.hidden)return;root.hidden=false;prevOv=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';lobby();if(push){try{history.pushState(null,'','#/jang');pushed=true;}catch(e){}}}
function hide(){clearAll();G=null;root.hidden=true;document.documentElement.style.overflow=prevOv;}
function close(){if(pushed){pushed=false;history.back();}else{hide();try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}if(window.__home)window.__home();}}
addEventListener('popstate',()=>{if(location.hash==='#/jang')open(false);else{pushed=false;if(!root.hidden)hide();}});
window.__battle=()=>open(true);

/* ---------- kirish tugmalari ---------- */
const label=X('Bellashuv','Битва','Battle');
const cta=document.querySelector('.hero .cta');if(cta){const b=document.createElement('button');b.type='button';b.className='btn ghost big bt-entry';b.dataset.notr='1';b.innerHTML=`⚔️ ${label}`;b.onclick=()=>open(true);cta.appendChild(b);}
const tb=document.getElementById('topbar');if(tb){const b=document.createElement('button');b.type='button';b.className='bt-tb';b.dataset.notr='1';b.innerHTML=`⚔️ ${label}`;b.onclick=()=>open(true);const sw=tb.querySelector('.langsw');tb.insertBefore(b,sw||null);
 if(!sw){const mo=new MutationObserver(()=>{const s=tb.querySelector('.langsw');if(s&&s.previousElementSibling!==b){tb.insertBefore(b,s);}});mo.observe(tb,{childList:true});}}
const cards=document.getElementById('cards');if(cards){const b=document.createElement('button');b.type='button';b.className='card spot btcard';b.dataset.notr='1';
 b.innerHTML=`<span class="sym">⚔️</span><span class="tx"><b>${X('Bellashuv: sun’iy intellekt yoki do‘st bilan','Битва: с ИИ или с другом','Battle: against the AI or a friend')}</b><small>${X('Viktorina, formulani top, joyiga qo‘y, tez hisob, xotira juftliklari va boshqa o‘yinlar','Викторина, найди формулу, расставь по местам, быстрый расчёт, пары на память и другие игры','Quiz, find the formula, put it in place, quick maths, memory pairs and more')}</small></span><span class="go" aria-hidden="true">→</span>`;b.onclick=()=>open(true);cards.insertBefore(b,cards.firstChild);}
if(location.hash==='#/jang')open(false);
window.__bt={state:()=>G,answer,start,lobby,st,force:i=>{bbForce=i;}};
})();
