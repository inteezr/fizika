/* ===== To‘lqin vannasi laboratoriyasi (teb) ===== */
const RT_PRE={
  ikki:()=>({src:[{x:0.4,y:0.42,ph:0},{x:0.4,y:0.58,ph:0}],walls:[],sh:[]}),
  yung:()=>({src:[{x:0.06,y:0,ph:0,plane:1}],walls:[[0.3,0,0.3,0.4],[0.3,0.45,0.3,0.55],[0.3,0.6,0.3,1]],sh:[]}),
  tirqish:()=>({src:[{x:0.06,y:0,ph:0,plane:1}],walls:[[0.3,0,0.3,0.44],[0.3,0.56,0.3,1]],sh:[]}),
  qaytish:()=>({src:[{x:0.25,y:0.3,ph:0}],walls:[[0.55,0.15,0.85,0.75]],sh:[]}),
  sinish:()=>({src:[{x:0.22,y:0.3,ph:0}],walls:[],sh:[[0.45,0.0,1,1]]}),
  bosh:()=>({src:[],walls:[],sh:[]})};
SIMS.push({id:'lab_teb',cat:'teb',lab:1,sandbox:1,title:'To‘lqin vannasi laboratoriyasi',short:'manba · to‘siq · tirqish',
  sub:'Suv yuzasidagi to‘lqinlarni hosil qiling: nuqtaviy va tekis manbalar qo‘ying, to‘siq va tirqishlar chizing, sayoz suv qismlarini qo‘shing. Interferensiya, difraksiya, qaytish va sinishni o‘zingiz kuzating.',
  formula:`<span><i>λ</i> = ${fr('<i>v</i>','<i>f</i>')}</span><span class="alt">∆<i>d</i> = <i>kλ</i> — maksimum, &nbsp;∆<i>d</i> = (<i>k</i> + ½)<i>λ</i> — minimum</span>`,
  text:[LABTXT,'Vanna to‘lqin tenglamasi bo‘yicha hisoblanadi: har bir nuqta qo‘shnilarining tebranishiga qarab harakatlanadi. To‘lqinlar to‘siqdan qaytadi, tirqishdan o‘tib yoyiladi (difraksiya), ikki manbadan kelgan to‘lqinlar qo‘shilib, kuchayish va so‘nish chiziqlarini hosil qiladi. Sayoz suvda to‘lqin sekinroq tarqaladi, shuning uchun chegarada yo‘nalishi o‘zgaradi (sinish).'],
  legend:[['λ','to‘lqin uzunligi, mm'],['v','to‘lqin tezligi'],['f','tebranish chastotasi'],['Δd','yo‘llar farqi']],
  tries:['Ikki manba orasini kattalashtiring: interferensiya chiziqlari zichlashadi.','Bitta tirqishni toraytiring: tirqishdan keyin to‘lqin kengroq yoyiladi.','Chastotani oshiring: to‘lqin uzunligi qisqaradi, difraksiya kuchsizlanadi.'],
  hint:'Manbalarni sudrang yoki yangi obyekt qo‘shing',
  tools:[{id:'move',label:'Surish'},{id:'src',label:'+ Nuqtaviy manba'},{id:'plane',label:'+ Tekis to‘lqin'},{id:'wall',label:'+ To‘siq'},{id:'shallow',label:'+ Sayoz suv'},{id:'del',label:'O‘chirish'},{id:'calm',label:'Suvni tinchlantirish',act:1},{id:'clear',label:'Bo‘sh vanna',act:1}],
  hints:{src:'Vannani bosing',plane:'Tekis to‘lqin chiqadigan joyni bosing',wall:'To‘siq chizish uchun sudrang',shallow:'Sayoz qismni to‘rtburchak qilib sudrang',del:'Manba, to‘siq yoki sayoz qismni bosing'},
  params:[{id:'pre',label:'Tajriba',choices:[[0,'Ikki manba'],[1,'Ikki tirqish'],[2,'Bitta tirqish'],[3,'Qaytish'],[4,'Sinish'],[5,'Bo‘sh']],val:0,reset:1},{id:'f',label:'Chastota',sym:'f',min:0.5,max:2,step:0.05,val:1,unit:'×',d:2},{id:'A',label:'Amplituda',sym:'A',min:0.2,max:1.5,step:0.05,val:1,d:2}],
  init:P=>Object.assign({t:0,sel:null,dw:null,dirty:1,cs:4},RT_PRE[['ikki','yung','tirqish','qaytish','sinish','bosh'][P.pre]]()),
  action(id,S){if(id==='clear'){S.src=[];S.walls=[];S.sh=[];S.dirty=1;}if(id==='calm'&&S.u){S.u.fill(0);S.up.fill(0);}},
  grid(S,W,H){const cs=S.cs,nx=Math.floor(W/cs),ny=Math.floor(H/cs);if(!S.u||S.nx!==nx||S.ny!==ny){S.nx=nx;S.ny=ny;S.u=new Float32Array(nx*ny);S.up=new Float32Array(nx*ny);S.dirty=1;S.img=null;}
    if(S.dirty){S.dirty=0;const m=new Uint8Array(nx*ny),c2=new Float32Array(nx*ny).fill(0.22),dp=new Float32Array(nx*ny);
      S.sh.forEach(([x1,y1,x2,y2])=>{for(let j=Math.floor(Math.min(y1,y2)*ny);j<Math.min(ny,Math.ceil(Math.max(y1,y2)*ny));j++)for(let i=Math.floor(Math.min(x1,x2)*nx);i<Math.min(nx,Math.ceil(Math.max(x1,x2)*nx));i++)if(i>=0&&j>=0)c2[j*nx+i]=0.07;});
      S.walls.forEach(([x1,y1,x2,y2])=>{const L=Math.hypot((x2-x1)*nx,(y2-y1)*ny),n=Math.ceil(L*2)+1;for(let k=0;k<=n;k++){const x=(x1+(x2-x1)*k/n)*nx,y=(y1+(y2-y1)*k/n)*ny;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const i=Math.round(x)+a,j=Math.round(y)+b;if(i>=0&&j>=0&&i<nx&&j<ny&&Math.abs(a)+Math.abs(b)<=1)m[j*nx+i]=1;}}});
      const B=14;for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const d=Math.min(i,j,nx-1-i,ny-1-j);dp[j*nx+i]=d<B?0.86+0.14*(d/B):0.9996;}S.m=m;S.c2=c2;S.dp=dp;}},
  step(S,P,dt){if(!S.u)return;const nx=S.nx,ny=S.ny,m=S.m,c2=S.c2,dp=S.dp,n=4,w=TAU/(22/P.f);
    for(let k=0;k<n;k++){const u=S.u,up=S.up;S.t+=1;S.src.forEach(s=>{const v=P.A*Math.sin(w*S.t+s.ph);if(s.plane){const i=Math.round(s.x*nx);for(let j=1;j<ny-1;j++)if(!m[j*nx+i])u[j*nx+i]=v*0.6;}else{const i=Math.round(s.x*nx),j=Math.round(s.y*ny);if(i>0&&j>0&&i<nx-1&&j<ny-1)u[j*nx+i]=v*2.2;}});
      for(let j=1;j<ny-1;j++){const r=j*nx;for(let i=1;i<nx-1;i++){const q=r+i;if(m[q]){up[q]=0;continue;}const lap=u[q-1]+u[q+1]+u[q-nx]+u[q+nx]-4*u[q];up[q]=(2*u[q]-up[q]+c2[q]*lap)*dp[q];}}
      S.u=up;S.up=u;}
    },
  draw(c,W,H,S,P){const sim=SIMS.find(s=>s.id==='lab_teb');sim.grid(S,W,H);const nx=S.nx,ny=S.ny,cs=S.cs;S.g={nx,ny,cs};
    if(!S.cv){S.cv=document.createElement('canvas');}if(S.cv.width!==nx){S.cv.width=nx;S.cv.height=ny;S.img=null;}const g=S.cv.getContext('2d');if(!S.img)S.img=g.createImageData(nx,ny);const d=S.img.data,u=S.u,m=S.m,c2=S.c2;
    for(let q=0;q<nx*ny;q++){const o=q*4;if(m[q]){d[o]=150;d[o+1]=160;d[o+2]=180;d[o+3]=255;continue;}const v=clamp(u[q]*0.9,-1,1),sh=c2[q]<0.1;d[o]=clamp(20+v*90+(sh?18:0),0,255);d[o+1]=clamp(70+v*120+(sh?30:0),0,255);d[o+2]=clamp(130+v*120,0,255);d[o+3]=255;}
    g.putImageData(S.img,0,0);c.imageSmoothingEnabled=true;c.drawImage(S.cv,0,0,nx*cs,ny*cs);
    S.sh.forEach(r=>{c.strokeStyle=r===S.sel?C.accent:'rgba(160,230,200,0.5)';c.setLineDash([5,4]);c.lineWidth=1.5;c.strokeRect(Math.min(r[0],r[2])*nx*cs,Math.min(r[1],r[3])*ny*cs,Math.abs(r[2]-r[0])*nx*cs,Math.abs(r[3]-r[1])*ny*cs);c.setLineDash([]);});
    S.walls.forEach(w=>{line(c,w[0]*nx*cs,w[1]*ny*cs,w[2]*nx*cs,w[3]*ny*cs,w===S.sel?C.accent:'#c8d0e0',w===S.sel?5:3);});
    if(S.dw){const r=S.dw;if(S.mode==='shallow'){c.strokeStyle=C.accent;c.setLineDash([5,4]);c.strokeRect(Math.min(r[0],r[2])*nx*cs,Math.min(r[1],r[3])*ny*cs,Math.abs(r[2]-r[0])*nx*cs,Math.abs(r[3]-r[1])*ny*cs);c.setLineDash([]);}else line(c,r[0]*nx*cs,r[1]*ny*cs,r[2]*nx*cs,r[3]*ny*cs,C.accent,3,[6,4]);}
    S.src.forEach(s=>{const x=s.x*nx*cs,y=s.y*ny*cs;if(s.plane){line(c,x,0,x,H,s===S.sel?C.accent:C.warm,4);txt(c,'tekis manba',x+8,14,C.warm,{font:SMALL});}else{disk(c,x,y,7,s===S.sel?C.accent:C.warm,'#fff');}});
    const lam=Math.sqrt(0.22)*22/P.f;txt(c,'λ ≈ '+fmt(lam,1)+' mm',W-12,H-12,'#dfe7ff',{align:'right',font:SMALL});},
  pointer(type,x,y,S,P){if(!S.g)return false;const{nx,ny,cs}=S.g,fx=x/(nx*cs),fy=y/(ny*cs),md=S.mode,hitS=()=>S.src.find(s=>s.plane?Math.abs(s.x*nx*cs-x)<10:Math.hypot(s.x*nx*cs-x,s.y*ny*cs-y)<14),hitW=()=>S.walls.find(w=>segDist(x,y,w[0]*nx*cs,w[1]*ny*cs,w[2]*nx*cs,w[3]*ny*cs)<9),hitR=()=>S.sh.find(r=>fx>Math.min(r[0],r[2])&&fx<Math.max(r[0],r[2])&&fy>Math.min(r[1],r[3])&&fy<Math.max(r[1],r[3]));
    if(type==='down'){if(md==='move'){const s=hitS();if(s){S.drag=s;S.sel=s;return true;}const w=hitW()||hitR();S.sel=w||null;return !!w;}
      if(md==='src'){const s={x:fx,y:fy,ph:0};S.src.push(s);S.sel=s;return true;}if(md==='plane'){const s={x:fx,y:0,ph:0,plane:1};S.src.push(s);S.sel=s;return true;}
      if(md==='wall'||md==='shallow'){S.dw=[fx,fy,fx,fy];return true;}
      if(md==='del'){const s=hitS();if(s){S.src.splice(S.src.indexOf(s),1);return true;}const w=hitW();if(w){S.walls.splice(S.walls.indexOf(w),1);S.dirty=1;return true;}const r=hitR();if(r){S.sh.splice(S.sh.indexOf(r),1);S.dirty=1;return true;}return false;}return false;}
    if(type==='move'){if(S.drag){S.drag.x=clamp(fx,0.03,0.97);if(!S.drag.plane)S.drag.y=clamp(fy,0.03,0.97);return true;}if(S.dw){S.dw[2]=clamp(fx,0,1);S.dw[3]=clamp(fy,0,1);return true;}return false;}
    if(type==='up'){S.drag=null;if(S.dw){const r=S.dw;S.dw=null;if(Math.hypot(r[2]-r[0],r[3]-r[1])>0.02){(S.mode==='shallow'?S.sh:S.walls).push(r);S.sel=r;S.dirty=1;}}}return false;},
  inspect(S){const s=S.sel;if(!s)return null;if(S.src.includes(s))return{title:s.plane?'Tekis to‘lqin manbai':'Nuqtaviy manba',props:[{label:'Boshlang‘ich faza',sym:'φ',min:0,max:360,step:5,unit:'°',d:0,get:()=>s.ph/D2R,set:v=>s.ph=v*D2R}],del:()=>S.src.splice(S.src.indexOf(s),1)};
    if(S.walls.includes(s))return{title:'To‘siq',note:'To‘lqinni to‘liq qaytaradi.',props:[],del:()=>{S.walls.splice(S.walls.indexOf(s),1);S.dirty=1;}};if(S.sh.includes(s))return{title:'Sayoz suv',note:'Bu yerda to‘lqin taxminan 1,8 marta sekin tarqaladi.',props:[],del:()=>{S.sh.splice(S.sh.indexOf(s),1);S.dirty=1;}};return null;},
  inspectHint:'Manba, to‘siq yoki sayoz qismni bosing.',
  read(S,P){const lam=Math.sqrt(0.22)*22/P.f;return[['Manbalar',String(S.src.length)],['To‘siqlar',String(S.walls.length)],['To‘lqin uzunligi (chuqur / sayoz)',fmt(lam,1)+' / '+fmt(lam*Math.sqrt(0.07/0.22),1)+' mm'],['Sinish ko‘rsatkichi n',fmt(Math.sqrt(0.22/0.07),2)]];}
});
