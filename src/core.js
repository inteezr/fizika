
(()=>{
const TAU=Math.PI*2, D2R=Math.PI/180;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const SUP={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
function fmt(v,d=2){
  if(v===Infinity||v===-Infinity) return '∞';
  if(!isFinite(v)) return '—';
  const a=Math.abs(v);
  if(a!==0 && (a>=1e6 || a<10**-d/2*0.999 && a<1e-3)){
    const e=Math.floor(Math.log10(a)); const m=v/10**e;
    return m.toFixed(2).replace('.',',')+'·10'+String(e).split('').map(c=>SUP[c]).join('');
  }
  if(a<0.5*10**-d) v=0;
  return v.toFixed(d).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,' ').replace(/,(\d*) (\d)/,',$1$2');
}
const fr=(a,b)=>`<span class="frac"><span>${a}</span><span>${b}</span></span>`;
const sq=a=>`<span class="sqrt">√<span>${a}</span></span>`;

/* ---------- ranglar ---------- */
const TOK=['bg','panel','ink','muted','line','grid','accent','warm','red','green','violet','canvas','water','onaccent'];
const C={}, CR={};
function hexRgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255];}
const GL={dark:false,n:0};
function readColors(){const cs=getComputedStyle(document.documentElement);TOK.forEach(k=>{C[k]=cs.getPropertyValue('--'+k).trim()||'#888';CR[k]=hexRgb(C[k]);});const b=CR.canvas||[255,255,255];GL.dark=(b[0]+b[1]+b[2])/3<80;}
function glow(c,col,b){if(GL.dark&&GL.n++<70){c.shadowColor=col;c.shadowBlur=b;}}
function noglow(c){c.shadowBlur=0;}
const rgba=(k,a)=>`rgba(${CR[k][0]},${CR[k][1]},${CR[k][2]},${a})`;

/* ---------- chizish yordamchilari ---------- */
const MONO='500 12px "IBM Plex Mono", ui-monospace, monospace';
const MATH='italic 600 17px "STIX Two Text", "Times New Roman", serif';
function txt(c,s,x,y,col,o={}){c.font=o.font||MONO;c.fillStyle=col;c.textAlign=o.align||'left';c.textBaseline=o.base||'middle';c.fillText(s,x,y);}
function arrow(c,x1,y1,x2,y2,col,lw=2.5,lab){
  const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy); if(L<3) return;
  const ux=dx/L,uy=dy/L,hs=Math.min(11,L*0.5);
  c.strokeStyle=col;c.fillStyle=col;c.lineWidth=lw;c.lineCap='round';c.setLineDash([]);glow(c,col,9);
  c.beginPath();c.moveTo(x1,y1);c.lineTo(x2-ux*hs*0.7,y2-uy*hs*0.7);c.stroke();
  c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-ux*hs-uy*hs*0.5,y2-uy*hs+ux*hs*0.5);c.lineTo(x2-ux*hs+uy*hs*0.5,y2-uy*hs-ux*hs*0.5);c.closePath();c.fill();noglow(c);
  if(lab) txt(c,lab,x2+ux*13,y2+uy*13,col,{font:MATH,align:'center'});
}
function grid(c,W,H,s){c.strokeStyle=C.grid;c.lineWidth=1;c.setLineDash([]);c.beginPath();for(let x=s;x<W;x+=s){c.moveTo(Math.round(x)+.5,0);c.lineTo(Math.round(x)+.5,H);}for(let y=s;y<H;y+=s){c.moveTo(0,Math.round(y)+.5);c.lineTo(W,Math.round(y)+.5);}c.stroke();}
function line(c,x1,y1,x2,y2,col,lw=1.5,dash){c.strokeStyle=col;c.lineWidth=lw;c.setLineDash(dash||[]);c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.setLineDash([]);}
function disk(c,x,y,r,fill,stroke){c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=fill;if(r>=4.5)glow(c,fill,12);c.fill();noglow(c);}if(stroke){c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke();}}
function rrect(c,x,y,w,h,r){c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h);}
function springPath(c,x1,y,x2,coils,amp,col){const lead=10,L=x2-x1-2*lead,n=coils*2;c.strokeStyle=col;c.lineWidth=2;c.setLineDash([]);c.beginPath();c.moveTo(x1,y);c.lineTo(x1+lead,y);for(let i=1;i<=n;i++)c.lineTo(x1+lead+L*(i-0.5)/n,y+(i%2?-amp:amp));c.lineTo(x2-lead,y);c.lineTo(x2,y);c.stroke();}
function niceStep(range,target){const raw=range/target,p=10**Math.floor(Math.log10(raw)),m=raw/p;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*p;}
function wl2rgb(l){let r=0,g=0,b=0;if(l<380)return'#8b5cf6';if(l>700)return'#9b2c2c';if(l<440){r=-(l-440)/60;b=1}else if(l<490){g=(l-440)/50;b=1}else if(l<510){g=1;b=-(l-510)/20}else if(l<580){r=(l-510)/70;g=1}else if(l<645){r=1;g=-(l-645)/65}else r=1;const f=l>580?0.95:0.85;return`rgb(${r*255*f|0},${g*255*f|0},${b*255*f|0})`;}


const SUBD='₀₁₂₃₄₅₆₇₈₉',subn=n=>String(n).split('').map(d=>SUBD[d]).join('');
function springLine(c,x1,y1,x2,y2,coils,amp,col,lw=2){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);if(L<1)return;const ux=dx/L,uy=dy/L,nx=-uy,ny=ux,lead=Math.min(10,L*0.15),Ls=L-2*lead,n=coils*2;c.strokeStyle=col;c.lineWidth=lw;c.setLineDash([]);c.beginPath();c.moveTo(x1,y1);c.lineTo(x1+ux*lead,y1+uy*lead);for(let i=1;i<=n;i++){const t=lead+Ls*(i-0.5)/n,o=(i%2?-amp:amp);c.lineTo(x1+ux*t+nx*o,y1+uy*t+ny*o);}c.lineTo(x2-ux*lead,y2-uy*lead);c.lineTo(x2,y2);c.stroke();}
function segDist(px,py,x1,y1,x2,y2){const dx=x2-x1,dy=y2-y1,l2=dx*dx+dy*dy||1;const t=clamp(((px-x1)*dx+(py-y1)*dy)/l2,0,1);return Math.hypot(px-x1-t*dx,py-y1-t*dy);}
function selRing(c,x,y,r){c.strokeStyle=C.accent;c.lineWidth=2;c.setLineDash([4,3]);c.beginPath();c.arc(x,y,r,0,TAU);c.stroke();c.setLineDash([]);}
function forceProps(f){return[{label:'Kattaligi',sym:'F',min:0,max:100,step:1,unit:'N',d:0,get:()=>f.F,set:v=>f.F=v},{label:'Yo‘nalishi',sym:'φ',min:-180,max:180,step:1,unit:'°',d:0,get:()=>f.ang,set:v=>f.ang=v}];}
const SMALL='500 10px "IBM Plex Mono", ui-monospace, monospace';

/* ================= MAVZULAR ================= */
const CATS=[['kin','Kinematika'],['din','Dinamika'],['sta','Statika va gidrostatika'],['saq','Saqlanish qonunlari'],['teb','Tebranishlar va to‘lqinlar'],['mol','Molekulyar fizika'],['trm','Termodinamika'],['est','Elektrostatika'],['tok','O‘zgarmas tok qonunlari'],['mag','Magnetizm va elektromagnit tebranishlar'],['opt','Optika'],['rel','Nisbiylik nazariyasi'],['yad','Atom va yadro fizikasi']];
const SIMS=[];
