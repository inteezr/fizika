/* Erish va qaynash */
function fazQ(m){const c1=2100,c2=4200,L=330000,r=2300000;const q1=c1*m*20,q2=q1+L*m,q3=q2+c2*m*100,q4=q3+r*m;return{q1,q2,q3,q4,c1,c2,L,r};}
function fazT(Q,m){const z=fazQ(m);if(Q<z.q1)return[-20+Q/(z.c1*m),'muz isimoqda'];if(Q<z.q2)return[0,'muz erimoqda'];if(Q<z.q3)return[(Q-z.q2)/(z.c2*m),'suv isimoqda'];if(Q<z.q4)return[100,'suv qaynamoqda'];return[100,'hammasi bug‘ga aylandi'];}
SIMS.push({id:'fazaviy',cat:'trm',title:'Erish, qaynash va bug‘lanish',short:'Q = λm · Q = rm',
  sub:'Modda bir agregat holatdan boshqasiga o‘tayotganda olingan issiqlik haroratni oshirmaydi: u molekulalar orasidagi bog‘lanishlarni uzishga sarflanadi.',
  formula:`<span><i>Q</i> = <i>λm</i> &nbsp; <i>Q</i> = <i>rm</i></span><span class="alt"><i>λ</i><sub>muz</sub> = 330 kJ/kg &nbsp; <i>r</i><sub>suv</sub> = 2,3 MJ/kg</span>`,
  text:['−20 °C dagi muzni qizdiramiz. Avval harorat 0 °C gacha ko‘tariladi, keyin muz erib bo‘lguncha harorat o‘zgarmaydi — grafikda gorizontal «zinapoya» hosil bo‘ladi.','Suv 100 °C da qaynaydi va bug‘ga aylanayotganda yana harorat o‘zgarmaydi. Bug‘lanish uchun erishdan qariyb 7 marta ko‘p issiqlik kerak, shuning uchun eng uzun zinapoya aynan qaynash.'],
  legend:[['λ','solishtirma erish issiqligi'],['r','solishtirma bug‘lanish issiqligi'],['c','solishtirma issiqlik sig‘imi'],['m','massa, kg']],
  tries:['Grafikdagi ikki gorizontal qismni toping va ularning uzunligini solishtiring.','Quvvatni oshiring: jarayon tezlashadi, lekin grafik shakli o‘zgarmaydi.','1 kg suvni to‘liq bug‘lantirish uchun qancha issiqlik kerakligini o‘qing.'],
  params:[{id:'P',label:'Isitgich quvvati',sym:'P',min:500,max:5000,step:100,val:2000,unit:'W',d:0},{id:'m',label:'Muz massasi',sym:'m',min:0.2,max:2,step:0.1,val:0.5,unit:'kg',d:1,reset:1}],
  init:()=>({Q:0,hold:0,bub:[]}),
  step(S,P,dt){const z=fazQ(P.m);if(S.Q<z.q4){S.Q=Math.min(z.q4,S.Q+P.P*dt*z.q4/P.P/14*(P.P/2000));}else{S.hold+=dt;if(S.hold>2){S.Q=0;S.hold=0;S.bub=[];}}const ph=fazT(S.Q,P.m)[1];if(ph==='suv qaynamoqda'&&Math.random()<0.7)S.bub.push({x:Math.random(),y:1,v:0.5+Math.random()});S.bub.forEach(b=>b.y-=b.v*dt);S.bub=S.bub.filter(b=>b.y>0);},
  draw(c,W,H,S,P){grid(c,W,H,28);const z=fazQ(P.m),[T,ph]=fazT(S.Q,P.m),px=W*0.06,pw=Math.min(W*0.3,200),pb=H*0.78,ph2=H*0.45,melt=clamp((S.Q-z.q1)/(z.q2-z.q1),0,1),vap=clamp((S.Q-z.q3)/(z.q4-z.q3),0,1);S.g={px,pw,pb,ph:ph2,melt,vap,T};
    c.strokeStyle=C.ink;c.lineWidth=3;c.beginPath();c.moveTo(px,pb-ph2);c.lineTo(px,pb);c.lineTo(px+pw,pb);c.lineTo(px+pw,pb-ph2);c.stroke();
    const lh=ph2*0.45*melt*(1-vap);if(lh>1){c.fillStyle=rgba('water',0.45);c.fillRect(px+2,pb-lh,pw-4,lh-2);}
    const ic=(1-melt);for(let i=0;i<5;i++){const s=26*Math.sqrt(ic)*(1-i*0.08);if(s>2){c.fillStyle='rgba(200,230,255,0.85)';c.strokeStyle=C.water;c.lineWidth=1;rrect(c,px+12+i*(pw-30)/5,pb-6-s-(i%2)*10,s,s,3);c.fill();c.stroke();}}
    S.bub.forEach(b=>disk(c,px+6+b.x*(pw-12),pb-lh*(1-b.y),3,rgba('canvas',0.9),C.water));if(ph==='suv qaynamoqda'||vap>0){for(let i=0;i<6;i++){const y=pb-ph2-10-((S.Q/5000+i*17)%60);disk(c,px+20+i*(pw-40)/5,y,8,rgba('muted',0.25));}}
    c.fillStyle=C.ink;c.fillRect(px-10,pb+10,pw+20,10);for(let i=0;i<6;i++){const x=px+pw*(i+0.5)/6;c.fillStyle=`rgba(240,120,40,${0.4+P.P/5000*0.5})`;c.beginPath();c.moveTo(x-6,pb+10);c.quadraticCurveTo(x,pb-6-P.P/200,x+6,pb+10);c.fill();}
    const gx=W*0.45,gr=W-20,gt=H*0.12,gb=H*0.82,X=q=>gx+q/z.q4*(gr-gx),Y=t=>gb-(t+20)/130*(gb-gt);line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'t, °C',gx+6,gt-8,C.muted);txt(c,'Q, kJ',gr,gb+14,C.muted,{align:'right'});
    [0,100].forEach(t=>{line(c,gx,Y(t),gr,Y(t),C.line,1,[3,4]);txt(c,t+'',gx-6,Y(t),C.muted,{align:'right',font:SMALL});});
    const pts=[[0,-20],[z.q1,0],[z.q2,0],[z.q3,100],[z.q4,100]];c.strokeStyle=rgba('red',0.3);c.lineWidth=1.5;c.beginPath();pts.forEach(([q,t],i)=>i?c.lineTo(X(q),Y(t)):c.moveTo(X(q),Y(t)));c.stroke();
    c.strokeStyle=C.red;c.lineWidth=3;c.beginPath();c.moveTo(X(0),Y(-20));for(let i=1;i<pts.length;i++){if(S.Q>=pts[i][0])c.lineTo(X(pts[i][0]),Y(pts[i][1]));else{c.lineTo(X(S.Q),Y(T));break;}}c.stroke();disk(c,X(S.Q),Y(T),5,C.red);
    txt(c,'erish',X((z.q1+z.q2)/2),Y(0)-10,C.muted,{align:'center',font:SMALL});txt(c,'qaynash',X((z.q3+z.q4)/2),Y(100)-10,C.muted,{align:'center',font:SMALL});
  },
  read:(S,P)=>{const[T,ph]=fazT(S.Q,P.m);return[['Harorat',fmt(T,1)+' °C'],['Holat',ph],['Berilgan issiqlik Q',fmt(S.Q/1000,0)+' kJ'],['Jami kerak',fmt(fazQ(P.m).q4/1e6,2)+' MJ']];}
});
