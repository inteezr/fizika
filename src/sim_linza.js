/* 16. Yupqa linza */
function lensGeo(W,H){const Lx=W/2,ay=H*0.56,sc=(W/2-20)/32;return{Lx,ay,sc};}
SIMS.push({id:'linza',cat:'opt',title:'Yupqa linza formulasi',short:'1/F = 1/d + 1/f',
  sub:'Linza buyumdan chiqqan nurlarni sindirib, uning tasvirini hosil qiladi.',
  formula:`<span>${fr('1','<i>F</i>')} = ${fr('1','<i>d</i>')} + ${fr('1','<i>f</i>')}</span><span class="alt"><i>Γ</i> = ${fr('<i>f</i>','<i>d</i>')} &nbsp; <i>D</i> = ${fr('1','<i>F</i>')}</span>`,
  text:['Tasvirni topish uchun buyum uchidan uchta qulay nur chiqariladi: optik o‘qqa parallel nur sinib, fokusdan o‘tadi; markazdan o‘tgan nur sinmaydi; fokusdan o‘tgan nur sinib, o‘qqa parallel ketadi. Ular kesishgan joyda tasvir hosil bo‘ladi.','Yig‘uvchi linzada buyum fokusdan uzoqda bo‘lsa haqiqiy, teskari tasvir olinadi (fotoapparat, ko‘z). Fokus ichida bo‘lsa, mavhum, to‘g‘ri va kattalashgan tasvir hosil bo‘ladi (lupa). Sochuvchi linza uchun F manfiy olinadi va tasvir doim mavhum, kichraygan bo‘ladi.'],
  legend:[['F','fokus masofasi, sm'],['d','linzadan buyumgacha masofa, sm'],['f','linzadan tasvirgacha masofa, sm (manfiy — mavhum tasvir)'],['Γ','kattalashtirish'],['D','optik kuch, dioptriya']],
  tries:['Ko‘k strelkani (buyumni) sudrab fokusga yaqinlashtiring: tasvir kattalashib, uzoqlashadi.','d = 2F qiling: tasvir buyum bilan bir xil kattalikda bo‘ladi.','Buyumni fokus ichiga olib kiring: lupa tasviri hosil bo‘ladi.'],
  params:[{id:'f',label:'Fokus masofasi',sym:'|F|',min:3,max:12,step:0.5,val:6,unit:'sm',d:1},{id:'type',label:'Linza turi',sym:'',choices:[[1,'Yig‘uvchi'],[-1,'Sochuvchi']],val:1},{id:'d',label:'Buyumgacha masofa',sym:'d',min:2,max:30,step:0.5,val:15,unit:'sm',d:1},{id:'h',label:'Buyum balandligi',sym:'h',min:1,max:5,step:0.5,val:3,unit:'sm',d:1}],
  hint:'Buyumni suring',
  init:()=>({drag:false}),
  draw(c,W,H,S,P,tt){S.W=W;S.H=H;const{Lx,ay,sc}=lensGeo(W,H),F=P.f*P.type,d=P.d,h=P.h,X=x=>Lx+x*sc,Y=y=>ay-y*sc;grid(c,W,H,28);
    line(c,0,ay,W,ay,C.ink,1.2);
    [-2,-1,1,2].forEach(k=>{const x=X(k*P.f);line(c,x,ay-5,x,ay+5,C.ink,1.5);txt(c,(Math.abs(k)===2?'2F':'F'),x,ay+16,C.muted,{align:'center',font:MATH});});
    const lh=Math.min(H*0.42,ay-12);c.fillStyle=rgba('water',0.18);c.strokeStyle=C.water;c.lineWidth=1.5;c.beginPath();
    if(P.type>0){c.moveTo(Lx,ay-lh);c.quadraticCurveTo(Lx+18,ay,Lx,ay+lh);c.quadraticCurveTo(Lx-18,ay,Lx,ay-lh);}
    else{c.moveTo(Lx-12,ay-lh);c.lineTo(Lx+12,ay-lh);c.quadraticCurveTo(Lx+2,ay,Lx+12,ay+lh);c.lineTo(Lx-12,ay+lh);c.quadraticCurveTo(Lx-2,ay,Lx-12,ay-lh);}
    c.fill();c.stroke();
    const di=Math.abs(d-F)<1e-9?Infinity:F*d/(d-F),hi=isFinite(di)?-h*di/d:0,xr=(W-Lx)/sc+2;
    const yls=[h,0];if(Math.abs(F-d)>0.05){const y3=h*F/(F-d);if(Math.abs(y3*sc)<H)yls.push(y3);}
    yls.forEach(yl=>{const mi=(yl-h)/d,mo=mi-yl/F;
      const seg=(x1,y1,x2,y2,dash)=>{line(c,X(x1),Y(y1),X(x2),Y(y2),rgba('warm',dash?0.55:0.4),dash?1.2:2,dash?[4,5]:null);if(!dash){c.strokeStyle=C.warm;c.lineWidth=2;c.setLineDash([8,16]);c.lineDashOffset=-tt*70;c.beginPath();c.moveTo(X(x1),Y(y1));c.lineTo(X(x2),Y(y2));c.stroke();c.setLineDash([]);c.lineDashOffset=0;}};
      seg(-d,h,0,yl);seg(0,yl,xr,yl+mo*xr);if(isFinite(di)&&di<0){const xe=Math.max(di,-Lx/sc);seg(0,yl,xe,yl+mo*xe,true);}});
    arrow(c,X(-d),ay,X(-d),Y(h),C.accent,3.5);
    if(isFinite(di)&&Math.abs(X(di))<W*3){if(di<0){c.globalAlpha=0.75;}arrow(c,X(di),ay,X(di),Y(hi),C.red,3);c.globalAlpha=1;}
    if(!isFinite(di))txt(c,'Buyum fokusda: tasvir cheksizlikda',14,20,C.red);
  },
  pointer(type,x,y,S,P,api){const{Lx,ay,sc}=lensGeo(S.W,S.H);if(type==='down'){const ox=Lx-P.d*sc;if(Math.abs(x-ox)<26&&y<ay+20&&y>ay-P.h*sc-30)S.drag=true;else return false;}
    if((type==='down'||type==='move')&&S.drag){api.set('d',Math.round(clamp((Lx-x)/sc,2,30)*2)/2);api.set('h',Math.round(clamp((ay-y)/sc,1,5)*2)/2);return true;}if(type==='up')S.drag=false;return false;},
  read:(S,P)=>{const F=P.f*P.type,d=P.d;if(Math.abs(d-F)<1e-9)return[['Tasvirgacha f','∞'],['Tasvir','hosil bo‘lmaydi'],['Optik kuch D',fmt(100/F,1)+' dptr']];const f=F*d/(d-F),G=Math.abs(f/d);
    return[['Tasvirgacha f',fmt(f,1)+' sm'],['Kattalashtirish Γ',fmt(G)],['Tasvir',(f>0?'haqiqiy, teskari':'mavhum, to‘g‘ri')+', '+(G>1.005?'kattalashgan':G<0.995?'kichraygan':'teng')],['Optik kuch D',fmt(100/F,1)+' dptr']];}
});
