/* Vertikal halqa (“o‘lik sirtmoq”) */
function vlGeo(P){const xA=0.2,xB=xA+Math.max(1.1,P.h*0.8),xL=xB+0.5,Li=Math.hypot(xB-xA,P.h),F1=xL-xB,Lp=TAU*P.R;return{xA,xB,xL,Li,F1,Lp,s1:Li,s2:Li+F1,s3:Li+F1+Lp,s4:Li+F1+Lp+1.6};}
function vlPos(G,P,s){if(s<G.s1){const f=s/G.Li;return{x:G.xA+(G.xB-G.xA)*f,y:P.h*(1-f),dy:-P.h/G.Li,ph:null};}
  if(s<G.s2)return{x:G.xB+(s-G.s1),y:0,dy:0,ph:null};
  if(s<G.s3){const ph=(s-G.s2)/P.R;return{x:G.xL+P.R*Math.sin(ph),y:P.R*(1-Math.cos(ph)),dy:Math.sin(ph),ph};}
  return{x:G.xL+(s-G.s3),y:0,dy:0,ph:null};}
function vlInit(P){return{s:0,u:0,fly:false,bx:0,by:0,vx:0,vy:0,end:0,tr:[],Nmin:1e9,top:null,msg:''};}
SIMS.push({id:'vertaylana',cat:'din',title:'Vertikal halqa bo‘ylab harakat',short:'h ≥ 2,5R',
  sub:'Sharcha qiyalikdan sirpanib tushib vertikal halqaga kiradi. Halqaning eng yuqori nuqtasidan uzilmasdan o‘tishi uchun uni kamida 2,5R balandlikdan qo‘yib yuborish kerak.',
  formula:`<span><i>N</i> = ${fr('<i>mv</i>²','<i>R</i>')} + <i>mg</i> cos <i>φ</i></span><span class="alt"><i>v</i>² = 2<i>g</i>(<i>h</i> − <i>y</i>), &nbsp;<i>h</i><sub>min</sub> = 2,5<i>R</i></span>`,
  text:['Ishqalanish bo‘lmasa, mexanik energiya saqlanadi: istalgan balandlikdagi tezlik v² = 2g(h − y). Halqa ichida tayanchning reaksiya kuchi N va og‘irlik kuchining radial tashkil etuvchisi birgalikda markazga intilma tezlanish beradi.','Eng yuqori nuqtada N = mv²/R − mg. Sharcha uzilmasligi uchun N ≥ 0, ya’ni v² ≥ gR bo‘lishi kerak. Energiyadan 2g(h − 2R) ≥ gR, demak h ≥ 2,5R. Balandlik kam bo‘lsa, N nolga tushgan joyda sharcha halqadan ajralib, parabola bo‘ylab tushadi.'],
  legend:[['h','boshlang‘ich balandlik, m'],['R','halqa radiusi, m'],['N','tayanch reaksiya kuchi, N'],['φ','halqaning pastki nuqtasidan hisoblangan burchak']],
  tries:['h ni 2,5R dan sal kamroq qiling: sharcha yuqoriga yetmay halqadan uziladi.','h < R bo‘lsa, sharcha halqaning chorak qismigacha chiqib, orqaga qaytadi va tebranadi.','Yuqori nuqtadagi N/mg qiymatini kuzating: h = 2,5R da u nolga teng.'],
  params:[{id:'h',label:'Boshlang‘ich balandlik',sym:'h',min:0.4,max:3,step:0.05,val:1.7,unit:'m',d:2,reset:1},{id:'R',label:'Halqa radiusi',sym:'R',min:0.3,max:1,step:0.05,val:0.6,unit:'m',d:2,reset:1}],
  init:vlInit,
  step(S,P,dt){const g=9.8,G=vlGeo(P);if(S.end>0){S.end-=dt;if(S.end<=0)Object.assign(S,vlInit(P));return;}
    const n=40,h=dt/n;for(let i=0;i<n;i++){
      if(S.fly){S.vy-=g*h;S.bx+=S.vx*h;S.by+=S.vy*h;const r=Math.hypot(S.bx-G.xL,S.by-P.R);if(S.by<=0||r>P.R+0.001&&S.flyT>0.05){S.by=Math.max(0,S.by);S.end=1.6;S.msg='Sharcha halqadan uzilib tushdi';break;}S.flyT+=h;continue;}
      const p=vlPos(G,P,S.s);S.u+=-g*p.dy*h;S.s+=S.u*h;if(S.s<0){S.s=0;S.u=Math.abs(S.u)*0;}
      const q=vlPos(G,P,S.s),E=2*g*(P.h-q.y);if(E>1e-4)S.u=Math.sign(S.u||1)*Math.sqrt(E);
      if(q.ph!==null){const N=S.u*S.u/P.R+g*Math.cos(q.ph);S.Nmin=Math.min(S.Nmin,N/g);if(Math.abs(q.ph-Math.PI)<0.05)S.top=N/g;
        if(N<0){S.fly=true;S.flyT=0;S.bx=q.x;S.by=q.y;S.vx=S.u*Math.cos(q.ph);S.vy=S.u*Math.sin(q.ph);S.msg='N = 0: uzilish nuqtasi';break;}}
      if(S.s>G.s4){S.end=1.2;S.msg='Halqadan muvaffaqiyatli o‘tdi';break;}}
    const b=S.fly?{x:S.bx,y:S.by}:vlPos(G,P,S.s);S.tr.push([b.x,b.y]);if(S.tr.length>500)S.tr.shift();},
  draw(c,W,H,S,P){grid(c,W,H,28);const G=vlGeo(P),sc=Math.min((W-30)/(G.s4-G.s3+G.xL+0.2),(H-70)/Math.max(P.h,2*P.R,1)*0.92),ox=15,gy=H-34,X=x=>ox+x*sc,Y=y=>gy-y*sc;S.g={ox,gy,sc,G};
    line(c,0,gy,W,gy,rgba('muted',0.4),1);
    c.strokeStyle=C.ink;c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(X(G.xA),Y(P.h));c.lineTo(X(G.xB),Y(0));c.lineTo(X(G.xL),Y(0));c.stroke();
    c.beginPath();c.arc(X(G.xL),Y(P.R),P.R*sc,0,TAU);c.stroke();c.beginPath();c.moveTo(X(G.xL),Y(0));c.lineTo(X(G.s4-G.s3+G.xL),Y(0));c.stroke();
    line(c,X(G.xA)-6,Y(P.h),W-10,Y(P.h),rgba('accent',0.6),1,[5,4]);txt(c,'h',X(G.xA)-2,Y(P.h)-10,C.accent,{font:MATH});
    const hm=2.5*P.R;line(c,0,Y(hm),W,Y(hm),rgba('green',0.7),1,[2,4]);txt(c,'2,5R',W-8,Y(hm)-9,C.green,{align:'right',font:SMALL});
    c.strokeStyle=rgba('warm',0.55);c.lineWidth=2;c.beginPath();S.tr.forEach(([x,y],i)=>i?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y)));c.stroke();
    const b=S.fly?{x:S.bx,y:S.by,ph:null}:vlPos(G,P,S.s),bx=X(b.x),by=Y(b.y),rr=Math.max(7,0.07*sc);
    const nx=b.ph!==null?-Math.sin(b.ph):0,ny=b.ph!==null?Math.cos(b.ph):1;const by0=by-(b.ph!==null?-ny*rr:rr),bx0=bx+(b.ph!==null?nx*rr:0);
    const k=9;arrow(c,bx0,by0,bx0,by0+k*4,C.red,2.5,'mg');
    if(!S.fly){const vx=b.ph!==null?Math.cos(b.ph):b.dy?(G.xB-G.xA)/G.Li:1,vy=b.ph!==null?Math.sin(b.ph):b.dy?-P.h/G.Li:0;if(Math.abs(S.u)>0.05)arrow(c,bx0,by0,bx0+vx*S.u*k*1.4,by0-vy*S.u*k*1.4,C.green,2.5,'v');
      if(b.ph!==null){const N=S.u*S.u/P.R+9.8*Math.cos(b.ph);if(N>0)arrow(c,bx0,by0,bx0+nx*N/9.8*k*4,by0-ny*N/9.8*k*4,C.accent,2.5,'N');}}
    else arrow(c,bx0,by0,bx0+S.vx*k*1.4,by0-S.vy*k*1.4,C.green,2.5,'v');
    disk(c,bx0,by0,rr,C.warm,C.ink);
    if(S.msg)txt(c,S.msg,14,20,S.msg.includes('muvaffaq')?C.green:C.red,{});
  },
  read(S,P){const G=vlGeo(P),b=S.fly?{y:S.by}:vlPos(G,P,S.s),v=S.fly?Math.hypot(S.vx,S.vy):Math.abs(S.u);
    return[['Kerakli minimal balandlik',fmt(2.5*P.R,2)+' m'],['Hozirgi tezlik',fmt(v,2)+' m/s'],['Yuqori nuqtada N/mg',P.h>=2*P.R?fmt(2*(P.h-2*P.R)/P.R-1,2):'—'],['Holat',P.h>=2.5*P.R?'uzilmasdan o‘tadi':P.h>P.R?'halqadan uziladi':'orqaga qaytadi']];}
});
