/* ---------- tillar: o‘zbek (asl), rus, ingliz ---------- */
(()=>{
const LANGS=[['uz','O‘zbek','UZ'],['ru','Русский','RU'],['en','English','EN']];
let L='uz';
try{const q=new URLSearchParams(location.search).get('lang');if(q&&LANGS.some(x=>x[0]===q))L=q;else{const v=localStorage.getItem('jf-lang');if(v&&LANGS.some(x=>x[0]===v))L=v;}}catch(e){}
window.LANG=L;
document.documentElement.lang=L;
const setLang=l=>{try{localStorage.setItem('jf-lang',l);}catch(e){}let u=null;try{u=new URL(location.href);}catch(e){}if(u&&u.searchParams.has('lang')){u.searchParams.set('lang',l);location.href=u.toString();}else location.reload();};
window.setLang=setLang;
const id=s=>s;
window.tr=id;

/* til almashtirgich */
const CSS=`.langsw{display:inline-flex;gap:2px;padding:3px;border:1px solid var(--edge);border-radius:999px;background:var(--glass);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.langsw button{font:600 12px/1 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.04em;color:var(--muted);background:none;border:0;border-radius:999px;padding:7px 10px;min-height:30px;cursor:pointer}
.langsw button:hover{color:var(--ink)}
.langsw button[aria-pressed="true"]{background:var(--accent);color:var(--onaccent)}
.langsw.hero-l{position:absolute;top:16px;right:16px;z-index:5}
.topbar .langsw{margin-left:auto}
@media (max-width:560px){.langsw button{padding:6px 8px}.langsw.hero-l{top:8px;right:8px}.hero .kicker{margin-top:30px}}`;
function mkSw(cls){const d=document.createElement('div');d.className='langsw '+(cls||'');d.setAttribute('role','group');d.setAttribute('aria-label','Til / Язык / Language');d.dataset.notr='1';
  LANGS.forEach(([k,name,ab])=>{const b=document.createElement('button');b.type='button';b.textContent=ab;b.title=name;b.lang=k;b.setAttribute('aria-pressed',k===L?'true':'false');b.onclick=()=>{if(k!==L)setLang(k);};d.appendChild(b);});return d;}
function mountSw(){const st=document.createElement('style');st.textContent=CSS;document.head?document.head.appendChild(st):document.body.prepend(st);
  const h=document.getElementById('hero');if(h)h.appendChild(mkSw('hero-l'));
  const t=document.getElementById('topbar');if(t)t.appendChild(mkSw());}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountSw);else mountSw();

if(L==='uz'||typeof I18N==='undefined'||!I18N[L])return;

/* ---------- tarjima mexanizmi ---------- */
const D=I18N[L];
const NUM=/\d+(?:[.,]\d+)*/g;
const mask=s=>s.replace(NUM,'#');
const MD=new Map();               // niqoblangan kalit -> qiymat
for(const k in D){const m=mask(k);if(!MD.has(m))MD.set(m,{v:D[k],n:(k.match(NUM)||[]).length,raw:k});}
const LET=/[A-Za-zÀ-ɏЀ-ӿ‘’]/;
const keys=[...MD.keys()].filter(k=>k.replace(/[^A-Za-z‘’]/g,'').length>=3&&LET.test(k)).sort((a,b)=>b.length-a.length);
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
let BIG=null;
try{BIG=new RegExp('(?<![\\p{L}‘’\'#])(?:'+keys.map(esc).join('|')+')(?![\\p{L}‘’\'])','gu');}catch(e){BIG=null;}

const UNITS_RU={'m/s²':'м/с²','m/s':'м/с','km/s':'км/с','km/h':'км/ч','km':'км','cm':'см','sm':'см','mm':'мм','nm':'нм','m':'м','kg':'кг','g':'г','s':'с','ms':'мс','N':'Н','kN':'кН','J':'Дж','kJ':'кДж','MJ':'МДж','W':'Вт','kW':'кВт','V':'В','kV':'кВ','A':'А','mA':'мА','Hz':'Гц','kHz':'кГц','Pa':'Па','kPa':'кПа','MPa':'МПа','K':'К','mol':'моль','C':'Кл','nC':'нКл','μC':'мкКл','T':'Тл','mT':'мТл','eV':'эВ','MeV':'МэВ','keV':'кэВ','Ω':'Ом','kΩ':'кОм','F':'Ф','μF':'мкФ','Gn':'Гн','m²':'м²','m³':'м³','sm²':'см²','sm³':'см³','g/m³':'г/м³','kg/m³':'кг/м³','N/m':'Н/м','N·m':'Н·м','J/K':'Дж/К','kg·m/s':'кг·м/с','yil':'лет','soat':'ч','min':'мин','daq':'мин','mln':'млн','mlrd':'млрд','marta':'раз','a.b.':'а.е.','kN/C':'кН/Кл','rad/s':'рад/с','l':'л','mkF':'мкФ','mkA':'мкА','μA':'мкА','μJ':'мкДж','mkJ':'мкДж'};
const UNITS_EN={'sm':'cm','sm²':'cm²','sm³':'cm³','Gn':'H','yil':'yr','soat':'h','daq':'min','mlrd':'bn','marta':'times','a.b.':'AU','mkF':'μF','mkA':'μA','mkJ':'μJ'};
const UN=L==='ru'?UNITS_RU:UNITS_EN;
const ukeys=Object.keys(UN).sort((a,b)=>b.length-a.length).map(esc).join('|');
const UNIT_AFTER=new RegExp('(\\d|[⁰¹²³⁴⁵⁶⁷⁸⁹]|∞)(\\s+|\\u00a0)('+ukeys+')(?![\\p{L}\\d²³])','gu');
const UNIT_ALONE=new RegExp('^(\\s*)('+ukeys+')(\\s*)$','u');

/* ko‘plik: «5 ‹тема|темы|тем›» */
const PL=/(\d+(?:[.,]\d+)?)(\s*[^\d‹]{0,3})‹([^›]+)›/g;
function plur(a,n,sp,f){const F=f.split('|');const x=parseFloat(n.replace(',','.'));let k;
  if(L==='ru'){if(!Number.isInteger(x))k=1;else{const m10=x%10,m100=x%100;k=(m10===1&&m100!==11)?0:(m10>=2&&m10<=4&&(m100<12||m100>14))?1:2;}}
  else k=(x===1)?0:1;
  return n+sp+(F[Math.min(k,F.length-1)]);}
function fillNums(t,nums){let i=0;return t.replace(/#/g,()=>i<nums.length?nums[i++]:'#');}
function fixNum(n){return L==='en'?n.replace(/(\d),(\d)/g,'$1.$2'):n;}

const CACHE=new Map();
function core(m){
  let hit=CACHE.get(m);if(hit!==undefined)return hit;
  let out=null;
  const e=MD.get(m);
  if(e)out=e;
  else{
    const lead=m.match(/^\s*/)[0],tail=m.match(/\s*$/)[0],mid=m.slice(lead.length,m.length-tail.length);
    const e2=mid!==m&&MD.get(mid);
    if(e2)out={v:lead+e2.v+tail,n:e2.n,raw:e2.raw};
    else{
      const u=UNIT_ALONE.exec(m);
      if(u&&UN[u[2]]!==undefined)out={str:u[1]+UN[u[2]]+u[3]};
      else if(BIG&&LET.test(m)){
        let any=false;
        const s2=m.replace(BIG,k=>{const x=MD.get(k);if(!x)return k;any=true;return x.n?mask(x.v):x.v;});
        if(any)out={str:s2};
      }
    }
  }
  if(CACHE.size>6000)CACHE.clear();
  CACHE.set(m,out);return out;
}
function tr(s){
  if(typeof s!=='string'||!s)return s;
  if(!/[^\s\d.,:+\-−=·/%()°×]/.test(s))return L==='en'?fixNum(s):s;
  const nums=(s.match(NUM)||[]).map(fixNum);
  const m=mask(s);
  const r=core(m);
  let o;
  if(!r)o=L==='en'?fixNum(s):s;
  else if(r.str!==undefined)o=fillNums(r.str,nums);
  else{
    const vm=mask(r.v),vn=(r.v.match(NUM)||[]).length;
    o=(vn===nums.length)?fillNums(vm,nums):(L==='en'?fixNum(r.v):r.v);
  }
  o=o.replace(UNIT_AFTER,(a,d,sp,u)=>d+sp+UN[u]).replace(PL,plur);
  if(window.__trmiss&&/[A-Za-z‘’]{3,}/.test(L==='ru'?o:'')&&LET.test(s))window.__trmiss.add(s);
  return o;
}
window.tr=tr;

/* ---------- canvas matnlari (2D va 3D yorliqlar) ---------- */
const P=CanvasRenderingContext2D.prototype;
const fT=P.fillText,sT=P.strokeText,mT=P.measureText;
P.fillText=function(s,...a){return fT.call(this,tr(String(s)),...a);};
P.strokeText=function(s,...a){return sT.call(this,tr(String(s)),...a);};
P.measureText=function(s){return mT.call(this,tr(String(s)));};
if(typeof OffscreenCanvasRenderingContext2D!=='undefined'){const Q=OffscreenCanvasRenderingContext2D.prototype,f2=Q.fillText,m2=Q.measureText;Q.fillText=function(s,...a){return f2.call(this,tr(String(s)),...a);};Q.measureText=function(s){return m2.call(this,tr(String(s)));};}

/* ---------- DOM matnlari ---------- */
const SET=new WeakMap();
const SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,CODE:1};
const ATTR=['placeholder','title','aria-label','alt'];
function skipEl(el){for(let e=el;e;e=e.parentElement){if(SKIP[e.tagName])return true;if(e.dataset&&e.dataset.notr)return true;if(e.tagName==='INPUT'&&e.type!=='button'&&e.type!=='submit')return false;}return false;}
function doText(n){const v=n.data;if(SET.get(n)===v)return;if(!v.trim()){return;}if(n.parentElement&&skipEl(n.parentElement))return;const t=tr(v);SET.set(n,t);if(t!==v)n.data=t;}
const ASET=new WeakMap();
function doAttrs(el){if(el.dataset&&el.dataset.notr)return;let m=ASET.get(el);for(const a of ATTR){const v=el.getAttribute(a);if(v==null||!v.trim())continue;if(m&&m[a]===v)continue;const t=tr(v);if(!m){m={};ASET.set(el,m);}m[a]=t;if(t!==v)el.setAttribute(a,t);}
  if(el.tagName==='INPUT'&&(el.type==='button'||el.type==='submit')&&el.value){const t=tr(el.value);if(t!==el.value)el.value=t;}
  if(el.tagName==='OPTION'){}}
function walk(root){
  if(root.nodeType===3){doText(root);return;}
  if(root.nodeType!==1&&root.nodeType!==11)return;
  if(root.nodeType===1){if(SKIP[root.tagName]||(root.dataset&&root.dataset.notr))return;doAttrs(root);}
  const w=document.createTreeWalker(root,5,null);let n;
  while((n=w.nextNode())){if(n.nodeType===3)doText(n);else{if(SKIP[n.tagName]||(n.dataset&&n.dataset.notr)){continue;}doAttrs(n);}}
}
let busy=false;
const mo=new MutationObserver(list=>{if(busy)return;busy=true;try{for(const r of list){if(r.type==='characterData')doText(r.target);else if(r.type==='attributes')doAttrs(r.target);else r.addedNodes.forEach(walk);}}finally{busy=false;}mo.takeRecords();});
function start(){walk(document.body);document.title=tr(document.title);mo.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTR});}
if(document.body)start();else document.addEventListener('DOMContentLoaded',start);
const tt=document.querySelector('title');if(tt)tt.textContent=tr(tt.textContent);
})();
