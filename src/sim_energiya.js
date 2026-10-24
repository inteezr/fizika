/* Energiyaning saqlanishi — trassani o‘zingiz chizasiz */
function track(cp){const p=[...cp].sort((a,b)=>a[0]-b[0]),out=[];for(let i=0;i<p.length-1;i++){const p0=p[Math.max(0,i-1)],p1=p[i],p2=p[i+1],p3=p[Math.min(p.length-1,i+2)];
    for(let k=0;k<20;k++){const t=k/20,t2=t*t,t3=t2*t,f=(a,b,c,d)=>0.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);out.push([f(p0[0],p1[0],p2[0],p3[0]),Math.max(0.05,f(p0[1],p1[1],p2[1],p3[1]))]);}}
  out.push(p[p.length-1]);const s=[0];for(let i=1;i<out.length;i++)s.push(s[i-1]+Math.hypot(out[i][0]-out[i-1][0],out[i][1]-out[i-1][1]));return{pts:out,s,L:s[s.length-1]};}
function tAt(T,s){s=clamp(s,0,T.L);let lo=0,hi=T.s.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(T.s[m]<=s)lo=m;else hi=m;}const a=T.pts[lo],b=T.pts[hi],ds=(T.s[hi]-T.s[lo])||1e-9,u=(s-T.s[lo])/ds;return{x:a[0]+(b[0]-a[0])*u,y:a[1]+(b[1]-a[1])*u,sin:(b[1]-a[1])/ds,cos:(b[0]-a[0])/ds};}
function enInit(){const cp=[[0.3,5.2],[2.6,1],[5,3.2],[7.4,0.6],[9.8,2.4],[11.7,4.4]];return{cp,T:track(cp),s:0.05,v:0,Q:0,sel:null,drag:null,sc:75,H:560};}
SIMS.push({id:'energiya',cat:'saq',title:'Mexanik energiyaning saqlanishi',short:'mgh + mv²/2 = const',sandbox:1,
  sub:'Ishqalanish bo‘lmasa, potensial va kinetik energiyalar yig‘indisi o‘zgarmaydi.',
  formula:`<span><i>mgh</i><sub>1</sub> + ${fr('<i>mv</i><sub>1</sub><sup>2</sup>','2')} = <i>mgh</i><sub>2</sub> + ${fr('<i>mv</i><sub>2</sub><sup>2</sup>','2')}</span><span class="alt">ishqalanish bilan: + <i>Q</i></span>`,
  text:['Sharcha trassa bo‘ylab dumalaydi: pastga tushganda potensial energiya kinetik energiyaga aylanadi, yuqoriga chiqqanda aksincha. O‘ngdagi ustunlar har bir energiya turini ko‘rsatadi.','Trassani o‘zingiz yasang: nuqtalarni sudrang, «+ Nuqta» bilan yangisini qo‘shing. Sharchani sudrab istalgan joyga qo‘yish mumkin. Ishqalanish bo‘lsa, energiyaning bir qismi issiqlikka (Q) aylanadi va sharcha boshlang‘ich balandlikka chiqa olmaydi.'],
  legend:[['m','sharcha massasi, kg'],['h','balandlik, m'],['v','tezlik, m/s'],['Q','issiqlikka aylangan energiya, J'],['μ','ishqalanish koeffitsienti']],
  tries:['μ = 0 da sharcha hech qachon boshlang‘ich balandligidan yuqori chiqmaydi — tekshiring.','O‘rtadagi tepalikni boshlang‘ich nuqtadan baland qiling: sharcha uni oshib o‘ta olmaydi.','Ishqalanishni oshiring va Q ustunining o‘sishini kuzating.'],
  tools:[{id:'move',label:'Surish'},{id:'add',label:'+ Nuqta'},{id:'del',label:'Nuqtani o‘chirish'}],
  hints:{move:'Nuqtalarni yoki sharchani sudrang',add:'Trassa nuqtasi qo‘yiladigan joyni bosing',del:'Nuqtani bosing'},
  params:[{id:'m',label:'Sharcha massasi',sym:'m',min:0.5,max:5,step:0.1,val:1,unit:'kg',d:1},{id:'mu',label:'Ishqalanish koeffitsienti',sym:'μ',min:0,max:0.3,step:0.01,val:0.02,unit:'',d:2},{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:1.6,max:20,step:0.1,val:9.8,unit:'m/s²',d:1}],
  init:enInit,
  step(S,P,dt){if(S.drag)return;const T=S.T,n=8,h=dt/n;for(let i=0;i<n;i++){const q=tAt(T,S.s),acc=-P.g*q.sin,fr=P.mu*P.g*Math.abs(q.cos);
      if(Math.abs(S.v)<0.03&&Math.abs(acc)<=fr){S.v=0;break;}const dir=S.v!==0?Math.sign(S.v):Math.sign(acc);S.v+=(acc-fr*dir)*h;S.Q+=P.mu*P.m*P.g*Math.abs(q.cos)*Math.abs(S.v)*h;S.s+=S.v*h;
      if(S.s<0||S.s>T.L){S.s=clamp(S.s,0,T.L);S.Q+=P.m*S.v*S.v*(1-0.16)/2;S.v=-S.v*0.4;}}},
  draw(c,W,H,S,P){const sc=W/12;S.sc=sc;S.H=H;S.Hm=H/sc;const X=x=>x*sc,Y=y=>H-14-y*sc,T=S.T;grid(c,W,H,sc/2);line(c,0,H-14,W,H-14,C.ink,2);
    c.fillStyle=rgba('muted',0.13);c.beginPath();c.moveTo(X(T.pts[0][0]),H-14);T.pts.forEach(p=>c.lineTo(X(p[0]),Y(p[1])));c.lineTo(X(T.pts[T.pts.length-1][0]),H-14);c.closePath();c.fill();
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();T.pts.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(p[1])):c.moveTo(X(p[0]),Y(p[1])));c.stroke();
    S.cp.forEach(p=>{disk(c,X(p[0]),Y(p[1]),6,C.canvas,p===S.sel?C.accent:C.muted);});
    const q=tAt(T,S.s),r=0.22*sc,bx=X(q.x)-q.sin*r,by=Y(q.y)-q.cos*r;line(c,bx,by,bx,H-14,rgba('green',0.6),1,[3,4]);txt(c,'h = '+fmt(q.y,1)+' m',bx+8,(by+H-14)/2,C.green);
    disk(c,bx,by,r,C.red);const ang=S.s/0.22;line(c,bx,by,bx+Math.cos(ang)*r,by+Math.sin(ang)*r,C.onaccent,2);
    if(Math.abs(S.v)>0.05){const L=clamp(S.v*10,-120,120);arrow(c,bx,by,bx+q.cos*L,by-q.sin*L,C.accent,2.5,'v');}
    const Ek=P.m*S.v*S.v/2,Ep=P.m*P.g*q.y,E=Ek+Ep+S.Q,bh=H*0.36,bb=H*0.08+bh,bw=26,x0=W-4*(bw+10)-6;c.fillStyle=rgba('canvas',0.85);c.fillRect(x0-8,H*0.08-24,4*(bw+10)+10,bh+48);
    [['Eₖ',Ek,C.warm],['Eₚ',Ep,C.green],['Q',S.Q,C.red],['E',E,C.ink]].forEach((b,i)=>{const x=x0+i*(bw+10),hh=E>0?b[1]/E*bh:0;c.strokeStyle=C.line;c.lineWidth=1;c.strokeRect(x,bb-bh,bw,bh);c.fillStyle=b[2];c.fillRect(x,bb-hh,bw,hh);txt(c,b[0],x+bw/2,bb+12,b[2],{align:'center',font:MATH});});
  },
  pointer(type,x,y,S,P,api){const sc=S.sc,wx=x/sc,wy=(S.H-14-y)/sc,hitP=()=>S.cp.find(p=>Math.hypot(p[0]-wx,p[1]-wy)*sc<14);
    if(type==='down'){const md=S.mode;if(md==='move'){const p=hitP();if(p){S.drag=p;S.sel=p;return true;}const q=tAt(S.T,S.s),r=0.22;if(Math.hypot(q.x-q.sin*r-wx,q.y+q.cos*r-wy)*sc<22){S.drag='ball';return true;}return false;}
      if(md==='add'){if(S.cp.length>=12)return false;const p=[clamp(wx,0.1,11.9),clamp(wy,0.2,S.Hm-0.6)];S.cp.push(p);S.T=track(S.cp);S.sel=p;S.drag=p;return true;}
      if(md==='del'){const p=hitP();if(p&&S.cp.length>2){S.cp.splice(S.cp.indexOf(p),1);S.T=track(S.cp);S.s=Math.min(S.s,S.T.L);return true;}}return false;}
    if(type==='move'&&S.drag){if(S.drag==='ball'){let best=0,bd=1e9;S.T.pts.forEach((p,i)=>{const d=Math.hypot(p[0]-wx,p[1]-wy);if(d<bd){bd=d;best=i;}});S.s=S.T.s[best];S.v=0;S.Q=0;}
      else{S.drag[0]=clamp(wx,0.1,11.9);S.drag[1]=clamp(wy,0.2,S.Hm-0.6);S.T=track(S.cp);S.s=Math.min(S.s,S.T.L);}return true;}
    if(type==='up'){if(S.drag==='ball'){S.Q=0;}S.drag=null;}return false;},
  read:(S,P)=>{const q=tAt(S.T,S.s),Ek=P.m*S.v*S.v/2,Ep=P.m*P.g*q.y;return[['Balandlik h',fmt(q.y,2)+' m'],['Tezlik v',fmt(Math.abs(S.v),2)+' m/s'],['Kinetik + potensial',fmt(Ek+Ep,1)+' J'],['Issiqlik Q',fmt(S.Q,1)+' J']];}
});
