/* Interferensiya — manbalar qo‘shiladigan */
const off=document.createElement('canvas'),octx=off.getContext('2d');
SIMS.push({id:'interferensiya',cat:'teb',title:'To‘lqinlar interferensiyasi',short:'d sinφ = kλ',sandbox:1,
  sub:'Kogerent manbalar to‘lqinlari qo‘shilib, kuchayish va so‘nish sohalarini hosil qiladi.',
  formula:`<span><i>d</i> sin <i>φ</i> = <i>kλ</i></span><span class="alt">maksimum: Δ = <i>kλ</i> &nbsp; minimum: Δ = (2<i>k</i>+1)${fr('<i>λ</i>','2')}</span>`,
  text:['Manbalar bir xil chastotada tebranadi. Ulardan chiqqan to‘lqinlar fazoning har bir nuqtasida qo‘shiladi. Yo‘llar farqi Δ to‘lqin uzunligining butun soniga teng bo‘lsa, o‘rkach o‘rkachga tushib, to‘lqin kuchayadi.','Yo‘llar farqi yarim to‘lqin uzunligining toq soniga teng bo‘lsa, to‘lqinlar bir-birini so‘ndiradi. Manbalarni sudrang yoki «+ Manba» bilan yangisini qo‘shing (6 tagacha). Ikki manba bir vertikalda tursa, punktir chiziqlar maksimum yo‘nalishlarini ko‘rsatadi.'],
  legend:[['d','manbalar orasidagi masofa'],['φ','maksimum yo‘nalishi burchagi'],['k','maksimum tartibi (0, ±1, ±2…)'],['λ','to‘lqin uzunligi'],['Δ','yo‘llar farqi']],
  tries:['Manbalar orasini kattalashtiring: maksimumlar soni ortadi.','Uchinchi manba qo‘shing: manzara murakkablashadi — bu difraksion panjara g‘oyasi.','d < λ bo‘lsa, faqat bitta markaziy maksimum qoladi.'],
  tools:[{id:'move',label:'Surish'},{id:'add',label:'+ Manba'},{id:'del',label:'O‘chirish'}],
  hints:{move:'Manbalarni suring',add:'Manba qo‘yiladigan joyni bosing',del:'Manbani bosing'},
  params:[{id:'d',label:'Manbalar orasi (1 va 2)',sym:'d',min:0.5,max:8,step:0.1,val:3,unit:'sm',d:1,reset:1},{id:'lam',label:'To‘lqin uzunligi',sym:'λ',min:0.5,max:3,step:0.05,val:1,unit:'sm',d:2}],
  init:P=>({t:0,src:[{x:1.9,y:-P.d/2},{x:1.9,y:P.d/2}],sel:null,drag:null,sc:40,H:500}),step(S,P,dt){S.t+=dt;},
  draw(c,W,H,S,P){const res=4,gw=Math.ceil(W/res),gh=Math.ceil(H/res);if(off.width!==gw||off.height!==gh){off.width=gw;off.height=gh;}
    const sc=W/24;S.sc=sc;S.H=H;const sp=S.src.map(s=>[s.x*sc,H/2+s.y*sc]),n=sp.length||1,k=TAU/P.lam,w=TAU*0.9,im=octx.createImageData(gw,gh),D=im.data,bg=CR.canvas,a=CR.accent,b=CR.warm;
    for(let j=0;j<gh;j++){const py=(j+.5)*res;for(let i=0;i<gw;i++){const px=(i+.5)*res;let v=0;for(const[x,y]of sp)v+=Math.cos(k*Math.hypot(px-x,py-y)/sc-w*S.t);v/=n;
      const col=v>0?a:b;v=Math.min(1,Math.abs(v));const o=(j*gw+i)*4;D[o]=bg[0]+(col[0]-bg[0])*v;D[o+1]=bg[1]+(col[1]-bg[1])*v;D[o+2]=bg[2]+(col[2]-bg[2])*v;D[o+3]=255;}}
    octx.putImageData(im,0,0);c.imageSmoothingEnabled=true;c.drawImage(off,0,0,gw*res,gh*res);
    if(S.src.length===2&&Math.abs(S.src[0].x-S.src[1].x)<0.05){const d=Math.abs(S.src[1].y-S.src[0].y),mx=sp[0][0],my=(sp[0][1]+sp[1][1])/2,M=Math.floor(d/P.lam+1e-9);
      for(let m=-M;m<=M;m++){const s=m*P.lam/d;if(Math.abs(s)>0.999)continue;const th=Math.asin(s),L=Math.hypot(W,H);line(c,mx,my,mx+Math.cos(th)*L,my+Math.sin(th)*L,rgba('ink',0.45),1.2,[6,6]);
        const ex=Math.min(W-30,mx+Math.cos(th)*(W*0.8)),ey=my+Math.tan(th)*(ex-mx);if(ey>12&&ey<H-12)txt(c,'k='+m,ex,ey-10,C.ink,{align:'center'});}
      line(c,mx-14,sp[0][1],mx-14,sp[1][1],C.ink,1);txt(c,'d',mx-22,my,C.ink,{font:MATH,align:'right'});}
    S.src.forEach((s,i)=>{const[x,y]=sp[i];disk(c,x,y,7,C.ink);disk(c,x,y,3,C.canvas);if(s===S.sel)selRing(c,x,y,13);});
  },
  pointer(type,x,y,S,P,api){const wx=x/S.sc,wy=(y-S.H/2)/S.sc,hit=()=>S.src.find(s=>Math.hypot(s.x-wx,s.y-wy)*S.sc<14);
    if(type==='down'){const md=S.mode;if(md==='move'){const s=hit();S.sel=s||null;if(s){S.drag=s;return true;}return false;}
      if(md==='add'){if(S.src.length>=6)return false;const s={x:wx,y:wy};S.src.push(s);S.sel=s;return true;}
      if(md==='del'){const s=hit();if(s&&S.src.length>1){S.src.splice(S.src.indexOf(s),1);S.sel=null;return true;}}return false;}
    if(type==='move'&&S.drag){S.drag.x=clamp(wx,0.2,23.8);S.drag.y=clamp(wy,-S.H/2/S.sc+0.2,S.H/2/S.sc-0.2);return true;}if(type==='up')S.drag=null;return false;},
  inspect(S){const s=S.sel;if(!s||!S.src.includes(s))return null;return{title:'To‘lqin manbai',note:'Manbani sudrab joyini o‘zgartiring.',del:S.src.length>1?()=>S.src.splice(S.src.indexOf(s),1):null};},
  read:(S,P)=>{if(S.src.length===2&&Math.abs(S.src[0].x-S.src[1].x)<0.05){const d=Math.abs(S.src[1].y-S.src[0].y),M=Math.floor(d/P.lam+1e-9),n=2*M+1-(Math.abs(M*P.lam/d-1)<1e-9?2:0);
      return[['Manbalar orasi d',fmt(d,1)+' sm'],['Maksimumlar soni',String(n)],['1-maksimum burchagi',P.lam<d?fmt(Math.asin(P.lam/d)/D2R,1)+'°':'yo‘q']];}
    return[['Manbalar soni',String(S.src.length)],['To‘lqin uzunligi',fmt(P.lam)+' sm']];}
});
