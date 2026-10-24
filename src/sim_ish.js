/* Mexanik ish va quvvat */
SIMS.push({id:'ish',cat:'saq',title:'Mexanik ish va quvvat',short:'A = Fs·cosα',
  sub:'Kuch jismni o‘z yo‘nalishida siljitganda ish bajaradi. Harakatga perpendikulyar kuch ish bajarmaydi.',
  formula:`<span><i>A</i> = <i>Fs</i> cos<i>α</i></span><span class="alt"><i>N</i> = ${fr('<i>A</i>','<i>t</i>')} = <i>Fv</i> cos<i>α</i></span>`,
  text:['Ishni faqat kuchning harakat yo‘nalishidagi tashkil etuvchisi bajaradi: F cos α. Grafikda bu tashkil etuvchining yo‘l bo‘yicha yuzasi ishga teng.','Quvvat — ish qanchalik tez bajarilishini ko‘rsatadi. Bir xil ishni tezroq bajargan mashina quvvatliroq hisoblanadi.'],
  legend:[['A','ish, J'],['F','kuch, N'],['s','ko‘chish, m'],['α','kuch va ko‘chish orasidagi burchak'],['N','quvvat, W']],
  tries:['α = 90° qiling: kuch bor, lekin ish nolga teng.','α = 60° da ish α = 0° dagining yarmiga tengligini tekshiring.','Tezlikni 2 marta oshiring: ish o‘zgarmaydi, quvvat 2 marta ortadi.'],
  params:[{id:'F',label:'Kuch',sym:'F',min:5,max:100,step:1,val:50,unit:'N',d:0,reset:1},{id:'al',label:'Burchak',sym:'α',min:0,max:90,step:1,val:30,unit:'°',d:0,reset:1},{id:'v',label:'Tezlik',sym:'v',min:0.5,max:5,step:0.1,val:2,unit:'m/s',d:1,reset:1}],
  init:()=>({s:0,t:0,hold:0}),
  step(S,P,dt){if(S.s<10){S.t+=dt;S.s=Math.min(10,S.s+P.v*dt);}else{S.hold+=dt;if(S.hold>1.2){S.s=0;S.t=0;S.hold=0;}}},
  draw(c,W,H,S,P){grid(c,W,H,28);const al=P.al*D2R,ty=H*0.42,sc=(W-120)/12,bx=40+S.s*sc,bs=50;S.g={ty,sc,bx,bs};
    line(c,0,ty,W,ty,C.ink,2);c.fillStyle=C.accent;rrect(c,bx,ty-bs,bs,bs,5);c.fill();const k=1.3,fx=bx+bs/2,fy=ty-bs/2;
    arrow(c,fx,fy,fx+P.F*Math.cos(al)*k*1.4,fy-P.F*Math.sin(al)*k*1.4,C.green,3,'F');line(c,fx,fy,fx+P.F*Math.cos(al)*k*1.4,fy,rgba('green',0.6),2,[4,4]);txt(c,'F cosα',fx+P.F*Math.cos(al)*k*1.4+6,fy+12,C.green,{font:SMALL});
    line(c,40+bs/2,ty+18,bx+bs/2,ty+18,C.warm,2);txt(c,'s = '+fmt(S.s,1)+' m',(40+bx+bs)/2,ty+32,C.warm,{align:'center'});
    const gx=60,gr=W-30,gt=H*0.6,gb=H-30,X=s=>gx+s/10*(gr-gx),Y=f=>gb-f/100*(gb-gt),fc=P.F*Math.cos(al);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt-6,C.ink,1.5);txt(c,'F cosα, N',gx+6,gt-12,C.muted);txt(c,'s, m',gr,gb+14,C.muted,{align:'right'});
    c.fillStyle=rgba('accent',0.3);c.fillRect(X(0),Y(fc),X(S.s)-X(0),gb-Y(fc));line(c,X(0),Y(fc),X(10),Y(fc),C.accent,2);txt(c,'A = yuza',X(S.s/2),(Y(fc)+gb)/2,C.ink,{align:'center',font:SMALL});
  },
  read:(S,P)=>{const fc=P.F*Math.cos(P.al*D2R);return[['Bajarilgan ish A',fmt(fc*S.s,0)+' J'],['Quvvat N',fmt(fc*P.v,1)+' W'],['Yo‘l s',fmt(S.s,1)+' m'],['Vaqt t',fmt(S.t,1)+' s']];}
});
