/* Kulon qonuni — zaryadlar qo‘shiladigan */
const KC=8.99e9*1e-12;
function kInit(){const Q=(x,y,q)=>({x,y,q,free:false,vx:0,vy:0});return{qs:[Q(-0.25,0,3),Q(0.25,0,-2)],dots:[],sel:null,drag:null,sc:600,cx:400,cy:250,W:800,H:500};}
function kForce(qs,a){let fx=0,fy=0;qs.forEach(b=>{if(b===a)return;const dx=a.x-b.x,dy=a.y-b.y,r2=dx*dx+dy*dy+1e-6,r=Math.sqrt(r2),F=KC*a.q*b.q/r2;fx+=F*dx/r;fy+=F*dy/r;});return[fx,fy];}
function newDot(W,H){return{x:Math.random()*W,y:Math.random()*H,px:NaN,py:0,l:1+Math.random()*2.5};}
SIMS.push({id:'kulon',cat:'est',title:'Kulon qonuni',short:'F = k|q₁||q₂| / r²',sandbox:1,
  sub:'Ikki nuqtaviy zaryadning o‘zaro ta’sir kuchi zaryadlarga to‘g‘ri, masofa kvadratiga teskari proporsional.',
  formula:`<span><i>F</i> = <i>k</i>${fr('|<i>q</i><sub>1</sub>| · |<i>q</i><sub>2</sub>|','<i>r</i><sup>2</sup>')}</span><span class="alt"><i>k</i> = 9·10<sup>9</sup> N·m²/C² &nbsp; <b>F</b> = Σ<b>F</b><sub><i>i</i></sub></span>`,
  text:['Bir xil ishorali zaryadlar itariladi, har xil ishoralilar tortishadi. Sahnaga istagancha musbat yoki manfiy zaryad qo‘ying va sudrang. Har bir zaryadga qolgan barcha zaryadlarning kuchlari ta’sir qiladi; to‘q sariq strelka ularning vektor yig‘indisini ko‘rsatadi (superpozitsiya prinsipi).','Kulrang chiziqchalar musbat sinov zaryadi qaysi tomonga harakatlanishini, ya’ni elektr maydon yo‘nalishini ko‘rsatadi. Zaryadni tanlab «Erkin harakatlansin» belgisini qo‘ysangiz, u kuch ta’sirida harakatlana boshlaydi.'],
  legend:[['q','zaryad, mkC (1 mkC = 10⁻⁶ C)'],['r','zaryadlar orasidagi masofa, m'],['k','Kulon doimiysi'],['F','o‘zaro ta’sir kuchi, N']],
  tries:['Ikki zaryad orasidagi masofani 2 marta kamaytiring: kuch 4 marta ortadi.','Musbat va manfiy zaryadlar orasiga uchinchi zaryad qo‘ying va uni erkin qiling: u qayerga ketadi?','To‘rtta zaryadni kvadrat shaklida qo‘ying va maydon chiziqlarini kuzating.'],
  tools:[{id:'move',label:'Surish / tanlash'},{id:'addP',label:'+ Musbat zaryad'},{id:'addN',label:'+ Manfiy zaryad'},{id:'del',label:'O‘chirish'},{id:'clear',label:'Hammasini o‘chirish',act:1}],
  hints:{move:'Zaryadlarni suring',addP:'Zaryad qo‘yiladigan joyni bosing',addN:'Zaryad qo‘yiladigan joyni bosing',del:'Zaryadni bosing'},
  params:[],
  init:kInit,
  action(id,S){if(id==='clear'){S.qs=[];S.sel=null;}},
  step(S,P,dt){const W=S.W,H=S.H,sc=S.sc,mx=W/2/sc-0.03,my=H/2/sc-0.03;
    S.qs.forEach(a=>{if(!a.free||a===S.drag){a.vx=a.vy=0;return;}const[fx,fy]=kForce(S.qs,a);a.vx=(a.vx+fx*0.05*dt)*(1-0.3*dt);a.vy=(a.vy+fy*0.05*dt)*(1-0.3*dt);const v=Math.hypot(a.vx,a.vy);if(v>0.6){a.vx*=0.6/v;a.vy*=0.6/v;}
      a.x+=a.vx*dt;a.y+=a.vy*dt;S.qs.forEach(b=>{if(b===a)return;const dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy)||1e-6;if(d<0.06){a.x=b.x+dx/d*0.06;a.y=b.y+dy/d*0.06;a.vx=a.vy=0;}});
      if(Math.abs(a.x)>mx){a.x=Math.sign(a.x)*mx;a.vx=0;}if(Math.abs(a.y)>my){a.y=Math.sign(a.y)*my;a.vy=0;}});
    while(S.dots.length<160)S.dots.push(newDot(W,H));const pq=S.qs.map(q=>[S.cx+q.x*sc,S.cy-q.y*sc,q.q]);
    for(const d of S.dots){d.px=d.x;d.py=d.y;let ex=0,ey=0;pq.forEach(([x,y,q])=>{const dx=d.x-x,dy=d.y-y,r2=dx*dx+dy*dy+1,r=Math.sqrt(r2);ex+=q*dx/(r2*r);ey+=q*dy/(r2*r);});
      const e=Math.hypot(ex,ey);d.l-=dt;if(e>1e-12){d.x+=ex/e*70*dt;d.y+=ey/e*70*dt;}
      if(d.l<0||pq.some(([x,y])=>Math.hypot(d.x-x,d.y-y)<14)||d.x<0||d.x>W||d.y<0||d.y>H)Object.assign(d,newDot(W,H));}},
  draw(c,W,H,S,P){grid(c,W,H,28);S.W=W;S.H=H;S.sc=W*0.7;S.cx=W/2;S.cy=H/2;const X=x=>S.cx+x*S.sc,Y=y=>S.cy-y*S.sc;
    c.strokeStyle=rgba('muted',0.75);c.lineWidth=1.6;c.beginPath();S.dots.forEach(d=>{if(isNaN(d.px))return;const dx=d.x-d.px,dy=d.y-d.py,L=Math.hypot(dx,dy)||1;c.moveTo(d.x-dx/L*7,d.y-dy/L*7);c.lineTo(d.x,d.y);});c.stroke();
    if(S.qs.length===2){const[a,b]=S.qs,by=Math.max(Y(a.y),Y(b.y))+44;line(c,X(a.x),by,X(b.x),by,C.ink,1.2);line(c,X(a.x),by-5,X(a.x),by+5,C.ink,1.2);line(c,X(b.x),by-5,X(b.x),by+5,C.ink,1.2);txt(c,'r = '+fmt(Math.hypot(a.x-b.x,a.y-b.y))+' m',(X(a.x)+X(b.x))/2,by+16,C.ink,{align:'center'});}
    S.qs.forEach((q,i)=>{const[fx,fy]=kForce(S.qs,q),F=Math.hypot(fx,fy);if(F>0.002){const L=Math.min(150,10+F*5);arrow(c,X(q.x),Y(q.y),X(q.x)+fx/F*L,Y(q.y)-fy/F*L,C.warm,3);txt(c,'F'+subn(i+1),X(q.x)+fx/F*(L+14),Y(q.y)-fy/F*(L+14),C.warm,{align:'center',font:MATH});}});
    S.qs.forEach(q=>{const r=14+Math.abs(q.q)*2,x=X(q.x),y=Y(q.y);disk(c,x,y,r,q.q>0?C.red:q.q<0?C.accent:C.muted);txt(c,q.q>0?'+':q.q<0?'−':'0',x,y+1,C.onaccent,{align:'center',font:'600 18px "IBM Plex Sans", sans-serif'});
      if(q.free)disk(c,x,y,r+3,null,C.green);if(q===S.sel)selRing(c,x,y,r+7);});
    if(!S.qs.length)txt(c,'Zaryad qo‘shish uchun yuqoridagi tugmalardan foydalaning',W/2,H/2,C.muted,{align:'center',font:'500 14px "IBM Plex Sans", sans-serif'});
  },
  pointer(type,x,y,S,P,api){const wx=(x-S.cx)/S.sc,wy=(S.cy-y)/S.sc,hit=()=>[...S.qs].reverse().find(q=>Math.hypot(q.x-wx,q.y-wy)*S.sc<16+Math.abs(q.q)*2+6);
    if(type==='down'){const md=S.mode;if(md==='move'){const q=hit();S.sel=q||null;if(q){S.drag=q;return true;}return false;}
      if(md==='addP'||md==='addN'){const q={x:wx,y:wy,q:md==='addP'?2:-2,free:false,vx:0,vy:0};S.qs.push(q);S.sel=q;return true;}
      if(md==='del'){const q=hit();if(q){S.qs.splice(S.qs.indexOf(q),1);S.sel=null;return true;}}return false;}
    if(type==='move'&&S.drag){S.drag.x=clamp(wx,-S.W/2/S.sc+0.03,S.W/2/S.sc-0.03);S.drag.y=clamp(wy,-S.H/2/S.sc+0.03,S.H/2/S.sc-0.03);return true;}
    if(type==='up')S.drag=null;return false;},
  inspect(S){const q=S.sel;if(!q||!S.qs.includes(q))return null;return{title:'Zaryad q'+subn(S.qs.indexOf(q)+1),props:[{label:'Zaryad',sym:'q',min:-5,max:5,step:0.5,unit:'mkC',d:1,get:()=>q.q,set:v=>q.q=v},{label:'Erkin harakatlansin',toggle:1,get:()=>q.free,set:v=>q.free=v}],del:()=>S.qs.splice(S.qs.indexOf(q),1)};},
  inspectHint:'Zaryadni bosing — uning kattaligini o‘zgartirasiz yoki erkin qo‘yib yuborasiz.',
  read:(S,P)=>{const out=[['Zaryadlar soni',String(S.qs.length)]];if(S.qs.length===2){const[a,b]=S.qs,r=Math.hypot(a.x-b.x,a.y-b.y);out.push(['q₁ va q₂ orasidagi kuch',fmt(KC*Math.abs(a.q*b.q)/(r*r),3)+' N'],['Ta’sir turi',a.q*b.q>0?'itarish':a.q*b.q<0?'tortishish':'ta’sir yo‘q']);}
    const s=S.sel&&S.qs.includes(S.sel)?S.sel:null;if(s){const[fx,fy]=kForce(S.qs,s);out.push(['Tanlangan zaryadga natijaviy kuch',fmt(Math.hypot(fx,fy),3)+' N']);}return out;}
});
