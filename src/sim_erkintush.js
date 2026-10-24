/* Erkin tushish va vertikal otish */
SIMS.push({id:'erkintush',cat:'kin',title:'Erkin tushish va vertikal otilgan jism',short:'h = v₀t − gt²/2',
  sub:'Havo qarshiligi bo‘lmasa, barcha jismlar bir xil g tezlanish bilan tushadi. Yuqoriga otilgan jism avval sekinlashadi, keyin tezlashib qaytadi.',
  formula:`<span><i>h</i> = <i>h</i><sub>0</sub> + <i>v</i><sub>0</sub><i>t</i> − ${fr('<i>gt</i><sup>2</sup>','2')}</span><span class="alt"><i>v</i> = <i>v</i><sub>0</sub> − <i>gt</i> &nbsp; <i>H</i><sub>max</sub> = ${fr('<i>v</i><sub>0</sub><sup>2</sup>','2<i>g</i>')}</span>`,
  text:['Erkin tushishda jism tezligi har soniyada g ga (Yerda taxminan 9,8 m/s ga) ortadi. Stroboskop izlari orasidagi masofa tobora kattalashadi: bu tekis tezlanuvchan harakat belgisi.','Yuqoriga otilgan jism eng yuqori nuqtada bir lahzaga to‘xtaydi, lekin tezlanishi baribir g ga teng va pastga yo‘nalgan. Ko‘tarilish va tushish vaqtlari teng.'],
  legend:[['h','balandlik, m'],['h₀','boshlang‘ich balandlik, m'],['v₀','boshlang‘ich tezlik (yuqoriga), m/s'],['g','erkin tushish tezlanishi, m/s²']],
  tries:['v₀ = 0 qiling: jism shunchaki tushadi, izlar orasi 1 : 3 : 5 : 7 nisbatda ortadi.','g = 1,6 m/s² (Oy) tanlang: tushish vaqti qariyb 2,5 marta uzayadi.','v₀ ni 2 marta oshiring: ko‘tarilish balandligi 4 marta ortadi.'],
  params:[{id:'h0',label:'Boshlang‘ich balandlik',sym:'h₀',min:0,max:80,step:1,val:40,unit:'m',d:0,reset:1},{id:'v0',label:'Yuqoriga tezlik',sym:'v₀',min:0,max:25,step:0.5,val:10,unit:'m/s',d:1,reset:1},{id:'g',label:'Erkin tushish tezlanishi',sym:'g',min:1.6,max:25,step:0.1,val:9.8,unit:'m/s²',d:1,reset:1}],
  init:()=>({t:0,hold:0,done:false,marks:[]}),
  step(S,P,dt){if(S.done){S.hold+=dt;if(S.hold>1.5)Object.assign(S,{t:0,hold:0,done:false,marks:[]});return;}const T=(P.v0+Math.sqrt(P.v0*P.v0+2*P.g*P.h0))/P.g;S.t=Math.min(T,S.t+dt);while(S.marks.length*0.4<=S.t)S.marks.push(S.marks.length*0.4);if(S.t>=T)S.done=true;},
  draw(c,W,H,S,P){grid(c,W,H,28);const Hm=P.h0+P.v0*P.v0/(2*P.g),top=Math.max(Hm,10)*1.1,gy=H-30,sc=(gy-30)/top,bx=W*0.32,Y=h=>gy-h*sc,h=t=>P.h0+P.v0*t-P.g*t*t/2;S.g={gy,sc,bx};
    line(c,0,gy,W,gy,C.ink,2);c.fillStyle=rgba('muted',0.2);c.fillRect(bx-70,Y(P.h0),40,gy-Y(P.h0));line(c,bx-70,Y(P.h0),bx-14,Y(P.h0),C.ink,2);
    for(let k=0;k<=top;k+=niceStep(top,6)){line(c,bx+40,Y(k),bx+46,Y(k),C.muted,1);txt(c,k+' m',bx+50,Y(k),C.muted,{font:SMALL});}
    if(P.v0>0)line(c,bx-40,Y(Hm),bx+30,Y(Hm),C.green,1,[4,4]);
    S.marks.forEach(t=>{if(t<=S.t)disk(c,bx,Y(h(t)),6,rgba('accent',0.25));});const hc=h(S.t),v=P.v0-P.g*S.t;disk(c,bx,Y(hc),9,C.red);
    if(Math.abs(v)>0.1)arrow(c,bx+16,Y(hc),bx+16,Y(hc)-v*3,C.green,2.5,'v');arrow(c,bx-16,Y(hc),bx-16,Y(hc)+P.g*3,C.warm,2,'g');
    const T=(P.v0+Math.sqrt(P.v0*P.v0+2*P.g*P.h0))/P.g,vm=Math.max(P.v0,P.g*T-P.v0),gx=W*0.58,gr=W-20,gt=H*0.15,gb=H*0.85,X=t=>gx+t/T*(gr-gx),V=u=>(gt+gb)/2-u/vm*(gb-gt)/2;
    line(c,gx,gt,gx,gb,C.ink,1.5);line(c,gx,V(0),gr,V(0),C.ink,1.5);txt(c,'v, m/s',gx+6,gt-8,C.muted);txt(c,'t, s',gr,V(0)+14,C.muted,{align:'right'});
    line(c,X(0),V(P.v0),X(T),V(P.v0-P.g*T),rgba('green',0.3),1.5);line(c,X(0),V(P.v0),X(S.t),V(v),C.green,2.5);disk(c,X(S.t),V(v),4,C.green);
  },
  read:(S,P)=>{const h=P.h0+P.v0*S.t-P.g*S.t*S.t/2,T=(P.v0+Math.sqrt(P.v0*P.v0+2*P.g*P.h0))/P.g;return[['Vaqt t',fmt(S.t,2)+' s'],['Balandlik h',fmt(Math.max(0,h),1)+' m'],['Tezlik v',fmt(P.v0-P.g*S.t,1)+' m/s'],['Maks. balandlik',fmt(P.h0+P.v0*P.v0/(2*P.g),1)+' m'],['Uchish vaqti',fmt(T,2)+' s']];}
});
