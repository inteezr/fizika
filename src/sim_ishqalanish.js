/* Ishqalanish kuchi */
SIMS.push({id:'ishqalanish',cat:'din',title:'Tinchlikdagi va sirpanish ishqalanishi',short:'F = μN',
  sub:'Jism qo‘zg‘almaguncha ishqalanish kuchi tortish kuchiga teng bo‘ladi. U maksimal qiymatga yetgach, jism sirpana boshlaydi va ishqalanish biroz kamayadi.',
  formula:`<span><i>F</i><sub>ishq</sub> = <i>μN</i></span><span class="alt"><i>F</i><sub>tinch</sub> ≤ <i>μ</i><sub>0</sub><i>mg</i> &nbsp; <i>a</i> = ${fr('<i>F</i> − <i>μmg</i>','<i>m</i>')}</span>`,
  text:['Stolda yotgan qutini sekin tortsangiz, u qimirlamaydi: tinchlikdagi ishqalanish kuchi tortish kuchini aynan muvozanatlaydi. Bu kuch faqat ma’lum chegaragacha, μ₀N gacha o‘sishi mumkin.','Quti sirpana boshlagach, sirpanish ishqalanishi μN amal qiladi va odatda u chegaraviy qiymatdan kichik. Shuning uchun qo‘zg‘atish qiyin, harakatni davom ettirish esa osonroq. O‘ngdagi grafik aynan shuni ko‘rsatadi.'],
  legend:[['μ₀','tinchlikdagi ishqalanish koeffitsienti'],['μ','sirpanish ishqalanish koeffitsienti'],['N','tayanch reaksiya kuchi, N = mg'],['F','tortish kuchi, N']],
  tries:['Kuchni asta oshiring va quti qaysi paytda qo‘zg‘alishini toping.','μ va μ₀ ni tenglashtiring: grafikdagi «sakrash» yo‘qoladi.','Massani 2 marta oshiring: qo‘zg‘atish uchun kerakli kuch ham 2 marta ortadi.'],
  params:[{id:'F',label:'Tortish kuchi',sym:'F',min:0,max:80,step:0.5,val:15,unit:'N',d:1},{id:'m',label:'Massa',sym:'m',min:1,max:10,step:0.5,val:4,unit:'kg',d:1},{id:'mu0',label:'Tinchlikdagi koeffitsient',sym:'μ₀',min:0.1,max:0.9,step:0.01,val:0.5,unit:'',d:2},{id:'mu',label:'Sirpanish koeffitsienti',sym:'μ',min:0.05,max:0.9,step:0.01,val:0.35,unit:'',d:2}],
  init:()=>({x:0,v:0,mv:false}),
  step(S,P,dt){const N=P.m*9.8,mu=Math.min(P.mu,P.mu0);if(!S.mv&&P.F>P.mu0*N)S.mv=true;if(S.mv){const a=(P.F-mu*N)/P.m;S.v+=a*dt;if(S.v<=0){S.v=0;S.mv=P.F>P.mu0*N;}S.x+=S.v*dt;if(S.x>14)S.x-=18;}},
  draw(c,W,H,S,P){grid(c,W,H,28);const N=P.m*9.8,mu=Math.min(P.mu,P.mu0),ty=H*0.42,sc=(W*0.62)/18,bs=40+P.m*3,bx=30+((S.x+2)*sc),fr=S.mv?mu*N:Math.min(P.F,P.mu0*N),k=Math.min(2.2,(W*0.22)/Math.max(P.F,P.mu0*N,1));S.g={ty,bs,bx,fr,k};
    c.fillStyle=rgba('muted',0.25);c.fillRect(0,ty,W*0.66,14);for(let x=4;x<W*0.66;x+=10)line(c,x,ty+14,x-6,ty+22,C.muted,1);
    c.fillStyle=S.mv?C.accent:rgba('accent',0.8);rrect(c,bx,ty-bs,bs,bs,5);c.fill();txt(c,P.m+' kg',bx+bs/2,ty-bs/2,C.onaccent,{align:'center'});
    if(P.F>0.1)arrow(c,bx+bs,ty-bs/2,bx+bs+P.F*k,ty-bs/2,C.green,3,'F');if(fr>0.1)arrow(c,bx,ty-4,bx-fr*k,ty-4,C.red,3);txt(c,'F ishq',bx-fr*k-6,ty-16,C.red,{align:'right',font:SMALL});
    txt(c,S.mv?'sirpanmoqda':'tinch turibdi',bx+bs/2,ty-bs-14,S.mv?C.green:C.muted,{align:'center'});
    const gx=W*0.7,gr=W-16,gt=H*0.15,gb=H*0.8,Fm=80,X=f=>gx+f/Fm*(gr-gx),Y=f=>gb-f/Fm*(gb-gt)*1.6;line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'F ishq',gx+4,gt-8,C.muted);txt(c,'F',gr,gb+14,C.muted,{align:'right',font:MATH});
    const fs=P.mu0*N;c.strokeStyle=C.red;c.lineWidth=2.5;c.beginPath();c.moveTo(X(0),Y(0));c.lineTo(X(Math.min(fs,Fm)),Y(Math.min(fs,Fm)));if(fs<Fm){c.lineTo(X(fs),Y(mu*N));c.lineTo(X(Fm),Y(mu*N));}c.stroke();
    disk(c,X(Math.min(P.F,Fm)),Y(fr),5,C.green);txt(c,'μ₀mg',X(Math.min(fs,Fm))+4,Y(Math.min(fs,Fm))-8,C.muted,{font:SMALL});
  },
  read:(S,P)=>{const N=P.m*9.8,mu=Math.min(P.mu,P.mu0),fr=S.mv?mu*N:Math.min(P.F,P.mu0*N);return[['Ishqalanish kuchi',fmt(fr,1)+' N'],['Qo‘zg‘atish chegarasi μ₀mg',fmt(P.mu0*N,1)+' N'],['Tezlanish a',S.mv?fmt((P.F-mu*N)/P.m,2)+' m/s²':'0'],['Holat',S.mv?'sirpanmoqda':'tinch']];}
});
