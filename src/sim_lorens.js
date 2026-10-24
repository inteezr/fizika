/* 14. Lorens kuchi */
SIMS.push({id:'lorens',cat:'mag',title:'Lorens kuchi',short:'F = qvB',
  sub:'Magnit maydonida harakatlanayotgan zaryadli zarra aylana bo‘ylab harakatlanadi.',
  formula:`<span><i>F</i> = <i>qvB</i> sin <i>α</i></span><span class="alt"><i>r</i> = ${fr('<i>mv</i>','<i>qB</i>')} &nbsp; <i>T</i> = ${fr('2π<i>m</i>','<i>qB</i>')}</span>`,
  text:['Lorens kuchi (to‘q sariq) har doim zarra tezligiga (yashil) perpendikulyar. U tezlik modulini o‘zgartirmaydi, faqat yo‘nalishini buradi. Natijada zarra aylana chizadi.','× belgisi magnit induksiya chiziqlari ekranga kirib ketayotganini bildiradi. Musbat va manfiy zarralar qarama-qarshi tomonlarga buriladi. Mass-spektrometr va siklotron shu hodisaga asoslangan.'],
  legend:[['q','zarra zaryadi (proton: 1,6·10⁻¹⁹ C)'],['v','tezlik, m/s'],['B','magnit induksiyasi, T'],['m','zarra massasi'],['r','aylana radiusi']],
  tries:['Zaryad ishorasini almashtiring: zarra teskari tomonga buriladi.','Tezlikni oshiring: radius ortadi, lekin aylanish davri o‘zgarmaydi.','B ni 2 marta oshiring: radius 2 marta kichrayadi.'],
  params:[{id:'B',label:'Magnit induksiyasi',sym:'B',min:0.5,max:3,step:0.1,val:1,unit:'T',d:1,reset:1},{id:'v',label:'Tezlik',sym:'v',min:1,max:3,step:0.1,val:2,unit:'·10⁵ m/s',d:1,reset:1},{id:'m',label:'Massa (proton massasida)',sym:'m',min:1,max:4,step:1,val:1,unit:'mₚ',d:0,reset:1},{id:'q',label:'Zaryad ishorasi',sym:'q',choices:[[1,'Musbat (+)'],[-1,'Manfiy (−)']],val:1,reset:1}],
  init:()=>({x:null,y:0,vx:0,vy:0,tr:[]}),
  step(S,P,dt){if(S.x===null)return;const w=6*P.B/(1.04*P.m)*P.q,a=w*dt,cs=Math.cos(a),sn=Math.sin(a),vx=S.vx*cs+S.vy*sn,vy=-S.vx*sn+S.vy*cs;S.vx=vx;S.vy=vy;S.x+=S.vx*dt;S.y+=S.vy*dt;
    S.tr.push([S.x,S.y]);if(S.tr.length>500)S.tr.shift();if(S.x<-20||S.x>S.W+20||S.y<-20||S.y>S.H+20)S.x=null;},
  draw(c,W,H,S,P){S.W=W;S.H=H;if(S.x===null){S.x=W*0.3;S.y=H/2;S.vx=120*P.v;S.vy=0;S.tr=[];}
    c.strokeStyle=rgba('muted',0.35);c.lineWidth=1.2;c.beginPath();for(let x=20;x<W;x+=36)for(let y=20;y<H;y+=36){c.moveTo(x-4,y-4);c.lineTo(x+4,y+4);c.moveTo(x+4,y-4);c.lineTo(x-4,y+4);}c.stroke();
    txt(c,'B ⊗',W-14,16,C.muted,{align:'right'});
    const v=Math.hypot(S.vx,S.vy),r=20*1.04*P.m*P.v/P.B,nx=-S.vy/v*P.q,ny=S.vx/v*P.q;
    const ccx=S.x+(-ny)*0+nx*0;const cx=S.x+ (S.vy/v)*r*P.q,cy=S.y-(S.vx/v)*r*P.q;
    c.strokeStyle=C.line;c.lineWidth=1.5;c.setLineDash([4,6]);c.beginPath();c.arc(cx,cy,r,0,TAU);c.stroke();c.setLineDash([]);
    c.strokeStyle=P.q>0?C.red:C.accent;c.lineWidth=2.5;c.beginPath();S.tr.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
    line(c,cx,cy,S.x,S.y,C.muted,1,[2,4]);txt(c,'r',(cx+S.x)/2+6,(cy+S.y)/2,C.muted,{font:MATH});
    arrow(c,S.x,S.y,S.x+S.vx/v*50,S.y+S.vy/v*50,C.green,2.5,'v');arrow(c,S.x,S.y,S.x+(cx-S.x)/r*40,S.y+(cy-S.y)/r*40,C.warm,2.5,'F');
    disk(c,S.x,S.y,9,P.q>0?C.red:C.accent);txt(c,P.q>0?'+':'−',S.x,S.y+1,C.onaccent,{align:'center',font:'600 14px sans-serif'});
  },
  read:(S,P)=>{const m=1.67e-27*P.m,q=1.6e-19,v=P.v*1e5;return[['Radius r',fmt(m*v/(q*P.B)*1000,2)+' mm'],['Davr T',fmt(TAU*m/(q*P.B)*1e9,1)+' ns'],['Lorens kuchi F',fmt(q*v*P.B)+' N']];}
});
