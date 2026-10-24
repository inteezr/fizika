/* Botiq sferik ko‘zgu */
function kzGeo(W,H){const Mx=W*0.8,ay=H*0.56,sc=(Mx-24)/32;return{Mx,ay,sc};}
SIMS.push({id:'kozgu',cat:'opt',title:'Botiq sferik ko‘zgu',short:'1/F = 1/d + 1/f · F = R/2',
  sub:'Botiq ko‘zgu nurlarni qaytarib fokusga yig‘adi va linza kabi tasvir hosil qiladi.',
  formula:`<span>${fr('1','<i>F</i>')} = ${fr('1','<i>d</i>')} + ${fr('1','<i>f</i>')}</span><span class="alt"><i>F</i> = ${fr('<i>R</i>','2')} &nbsp; <i>Γ</i> = ${fr('<i>f</i>','<i>d</i>')}</span>`,
  text:['Botiq ko‘zguga optik o‘qqa parallel tushgan nur qaytgach fokusdan o‘tadi, markaz (C) orqali o‘tgan nur esa o‘z yo‘liga qaytadi. Ko‘zgu oldida haqiqiy, teskari tasvir hosil bo‘ladi.','Buyum fokus ichida bo‘lsa, qaytgan nurlar tarqaladi, ularning davomi ko‘zgu orqasida kesishadi: mavhum, to‘g‘ri, kattalashgan tasvir (soqol olish ko‘zgusi). Avtomobil faralari va teleskoplar botiq ko‘zgudan foydalanadi.'],
  legend:[['F','fokus masofasi, sm'],['R','ko‘zgu egrilik radiusi, R = 2F'],['d','buyumgacha masofa'],['f','tasvirgacha masofa (manfiy — ko‘zgu orqasida, mavhum)'],['Γ','kattalashtirish']],
  tries:['Buyumni sudrab C nuqtaga qo‘ying: tasvir ham shu yerda, kattaligi teng.','Buyumni F va C orasiga qo‘ying: tasvir kattalashgan va C dan uzoqda.','Buyumni fokus ichiga olib kiring: tasvir ko‘zgu orqasida, mavhum.'],
  params:[{id:'f',label:'Fokus masofasi',sym:'F',min:3,max:12,step:0.5,val:6,unit:'sm',d:1},{id:'d',label:'Buyumgacha masofa',sym:'d',min:2,max:30,step:0.5,val:16,unit:'sm',d:1},{id:'h',label:'Buyum balandligi',sym:'h',min:1,max:5,step:0.5,val:3,unit:'sm',d:1}],
  hint:'Buyumni suring',
  init:()=>({drag:false}),
  draw(c,W,H,S,P,tt){S.W=W;S.H=H;const{Mx,ay,sc}=kzGeo(W,H),F=P.f,d=P.d,h=P.h,X=u=>Mx-u*sc,Y=y=>ay-y*sc;grid(c,W,H,28);line(c,0,ay,W,ay,C.ink,1.2);
    [[F,'F'],[2*F,'C']].forEach(([u,l])=>{line(c,X(u),ay-5,X(u),ay+5,C.ink,1.5);txt(c,l,X(u),ay+16,C.muted,{align:'center',font:MATH});});
    const mh=Math.min(H*0.42,ay-12);c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();for(let i=-20;i<=20;i++){const yy=i/20*mh,dx=(yy/sc)**2/(8*F)*sc;c.lineTo(Mx-dx,ay+yy);}c.stroke();
    for(let i=-9;i<=9;i++){const yy=i/10*mh,dx=(yy/sc)**2/(8*F)*sc;line(c,Mx-dx,ay+yy,Mx-dx+8,ay+yy+6,rgba('muted',0.7),1);}
    const di=Math.abs(d-F)<1e-9?Infinity:F*d/(d-F),xr=Mx/sc+2;const yls=[h,0];if(Math.abs(F-d)>0.05){const y3=h*F/(F-d);if(Math.abs(y3*sc)<H)yls.push(y3);}
    const seg=(x1,y1,x2,y2,dash)=>{line(c,x1,y1,x2,y2,rgba('warm',dash?0.55:0.4),dash?1.2:2,dash?[4,5]:null);if(!dash){c.strokeStyle=C.warm;c.lineWidth=2;c.setLineDash([8,16]);c.lineDashOffset=-tt*70;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.setLineDash([]);c.lineDashOffset=0;}};
    yls.forEach(yl=>{const mi=(yl-h)/d,mo=mi-yl/F;seg(X(d),Y(h),X(0),Y(yl));seg(X(0),Y(yl),X(xr),Y(yl+mo*xr));if(isFinite(di)&&di<0){const xe=Math.max(di,-(W-Mx)/sc);seg(X(0),Y(yl),X(xe),Y(yl+mo*xe),true);}});
    arrow(c,X(d),ay,X(d),Y(h),C.accent,3.5);if(isFinite(di)){c.globalAlpha=di<0?0.75:1;arrow(c,X(di),ay,X(di),Y(-h*di/d),C.red,3);c.globalAlpha=1;}else txt(c,'Buyum fokusda: tasvir cheksizlikda',14,20,C.red);
  },
  pointer(type,x,y,S,P,api){const{Mx,ay,sc}=kzGeo(S.W,S.H);if(type==='down'){const ox=Mx-P.d*sc;if(Math.abs(x-ox)<26&&y<ay+20&&y>ay-P.h*sc-30)S.drag=true;else return false;}
    if((type==='down'||type==='move')&&S.drag){api.set('d',Math.round(clamp((Mx-x)/sc,2,30)*2)/2);api.set('h',Math.round(clamp((ay-y)/sc,1,5)*2)/2);return true;}if(type==='up')S.drag=false;return false;},
  read:(S,P)=>{const F=P.f,d=P.d;if(Math.abs(d-F)<1e-9)return[['Tasvirgacha f','∞'],['Tasvir','hosil bo‘lmaydi']];const f=F*d/(d-F),G=Math.abs(f/d);
    return[['Tasvirgacha f',fmt(f,1)+' sm'],['Kattalashtirish Γ',fmt(G)],['Tasvir',(f>0?'haqiqiy, teskari':'mavhum, to‘g‘ri')+', '+(G>1.005?'kattalashgan':G<0.995?'kichraygan':'teng')],['Egrilik radiusi R',fmt(2*F,1)+' sm']];}
});
