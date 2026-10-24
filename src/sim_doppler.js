/* 11. Doppler effekti */
SIMS.push({id:'doppler',cat:'teb',title:'Doppler effekti',short:'ν = ν₀·v/(v ∓ u)',
  sub:'Manba yaqinlashganda tovush chastotasi ortadi, uzoqlashganda kamayadi.',
  formula:`<span><i>ν</i> = <i>ν</i><sub>0</sub>${fr('<i>v</i>','<i>v</i> ∓ <i>u</i>')}</span><span class="alt">«−» yaqinlashganda, «+» uzoqlashganda</span>`,
  text:['Manba har bir to‘lqin frontini yangi joydan chiqaradi. Shuning uchun harakat yo‘nalishida frontlar zichlashadi (to‘lqin uzunligi qisqaradi, chastota ortadi), orqada esa siyraklashadi.','Shu sababli yaqinlashayotgan tez yordam mashinasi sirenasi baland, uzoqlashayotgani esa past eshitiladi. Manba tovushdan tez harakatlansa (u > v), frontlar konus shaklida to‘planadi — bu zarba to‘lqini, samolyot «tovush to‘sig‘i»ni yorib o‘tganda eshitiladigan gumburlash.'],
  legend:[['ν₀','manba chastotasi, Hz'],['ν','kuzatuvchi eshitadigan chastota'],['v','tovush tezligi (havoda 340 m/s)'],['u','manba tezligi']],
  tries:['Tezlikni 0 qiling: frontlar konsentrik aylanalar.','Tezlikni 0,9 Max qiling: oldindagi kuzatuvchi 10 marta yuqori chastota eshitadi.','1 Max dan oshiring: Max konusi paydo bo‘ladi.'],
  params:[{id:'u',label:'Manba tezligi',sym:'u',min:0,max:1.6,step:0.01,val:0.5,unit:'',d:2,show:v=>fmt(v,2)+' Max · '+fmt(v*340,0)+' m/s'},{id:'f0',label:'Manba chastotasi',sym:'ν₀',min:200,max:1000,step:10,val:440,unit:'Hz',d:0}],
  init:()=>({fr:[],sx:null,acc:0,t:0}),
  step(S,P,dt){if(S.sx===null)return;const cp=110;S.t+=dt;S.sx+=P.u*cp*dt;const W=S.W;if(S.sx>W+30){S.sx=-30;}S.acc+=dt*P.f0/220;while(S.acc>=1){S.fr.push([S.sx,S.t]);S.acc-=1;}const D=Math.hypot(W,S.H)*1.2;S.fr=S.fr.filter(f=>(S.t-f[1])*cp<D);},
  draw(c,W,H,S,P){grid(c,W,H,28);S.W=W;S.H=H;if(S.sx===null)S.sx=P.u<0.02?W/2:W*0.2;const cp=110,cy=H/2;
    S.fr.forEach(f=>{const r=(S.t-f[1])*cp;c.strokeStyle=rgba('accent',Math.max(0.12,0.9-r/(W*0.9)));c.lineWidth=1.6;c.beginPath();c.arc(f[0],cy,r,0,TAU);c.stroke();});
    if(P.u>1){const al=Math.asin(1/P.u),L=W;line(c,S.sx,cy,S.sx-Math.cos(al)*L,cy-Math.sin(al)*L,C.red,2);line(c,S.sx,cy,S.sx-Math.cos(al)*L,cy+Math.sin(al)*L,C.red,2);txt(c,'Max konusi',S.sx-60,cy-Math.tan(al)*60-14,C.red,{align:'center'});}
    disk(c,S.sx,cy,9,C.red);if(P.u>0.02)arrow(c,S.sx+12,cy,S.sx+12+P.u*40,cy,C.red,2.5,'u');
    disk(c,14,cy,7,C.green);disk(c,W-14,cy,7,C.green);
    const fa=P.u<1?P.f0/(1-P.u):Infinity,fb=P.f0/(1+P.u);
    txt(c,'Orqada: '+fmt(fb,0)+' Hz',14,22,C.green);txt(c,'Oldinda: '+(P.u<1?fmt(fa,0)+' Hz':'zarba to‘lqini'),W-14,22,C.green,{align:'right'});
  },
  read:(S,P)=>[['Oldinda ν',P.u<1?fmt(P.f0/(1-P.u),0)+' Hz':'— (u ≥ v)'],['Orqada ν',fmt(P.f0/(1+P.u),0)+' Hz'],['Oldinda λ',P.u<1?fmt(340*(1-P.u)/P.f0,3)+' m':'—'],['Orqada λ',fmt(340*(1+P.u)/P.f0,3)+' m']]
});
