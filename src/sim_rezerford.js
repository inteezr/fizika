/* Rezerford tajribasi */
SIMS.push({id:'rezerford',cat:'yad',title:'Rezerford tajribasi: atom yadrosining kashf etilishi',short:'r_min = kZ·2e²/E',
  sub:'Alfa zarralar yupqa oltin folgadan otilganda ularning aksariyati deyarli og‘masdan o‘tadi, lekin juda ozi katta burchakka, hatto orqaga qaytadi. Demak, atomning musbat zaryadi mitti yadroda to‘plangan.',
  formula:`<span><i>F</i> = <i>k</i>${fr('2<i>e</i> · <i>Ze</i>','<i>r</i><sup>2</sup>')}</span><span class="alt"><i>r</i><sub>min</sub> = ${fr('<i>k</i> · 2<i>Ze</i><sup>2</sup>','<i>E</i><sub>k</sub>')}</span>`,
  text:['Alfa zarra (ikki proton va ikki neytron) yadroga yaqinlashganda kuchli Kulon itarishiga uchraydi. Yadrodan uzoqdan o‘tganlar sezilarsiz og‘adi, to‘g‘ri yo‘nalganlar esa orqaga qaytadi.','Rezerford: «Bu xuddi qog‘ozga 15 dyuymli snaryad otib, uning qaytib kelib sizga urilishiga o‘xshardi». Shu tajriba asosida atomning yadro modeli yaratildi.'],
  legend:[['Z','yadro zaryad soni'],['E_k','alfa zarra energiyasi, MeV'],['r_min','eng yaqin kelish masofasi'],['k','9·10⁹ N·m²/C²']],
  tries:['Energiyani oshiring: zarralar kamroq og‘adi.','Oltinni alyuminiyga almashtiring: orqaga qaytish deyarli yo‘qoladi.','90° dan katta og‘gan zarralar ulushini kuzating.'],
  params:[{id:'E',label:'Alfa zarra energiyasi',sym:'E',min:1,max:10,step:0.5,val:5,unit:'MeV',d:1,reset:1},{id:'Z',label:'Folga moddasi',choices:[[79,'Oltin (79)'],[47,'Kumush (47)'],[13,'Alyuminiy (13)']],val:79,reset:1}],
  init:()=>({ps:[],n:0,d10:0,d90:0,acc:0}),
  step(S,P,dt){if(!S.W)return;S.acc+=dt*7;while(S.acc>=1){S.acc-=1;const b=(Math.random()-0.5)*S.H*0.7;S.ps.push({x:0,y:S.H/2+b,vx:260,vy:0,tr:[],done:false});S.n++;}const v0=260,d0=40*(P.Z/79)*(5/P.E),K=d0*v0*v0/2,cx=S.W*0.5,cy=S.H/2;
    S.ps.forEach(p=>{if(p.done)return;const n=40,h=dt/n;for(let i=0;i<n;i++){const dx=p.x-cx,dy=p.y-cy,r2=Math.max(dx*dx+dy*dy,4),r=Math.sqrt(r2),f=K/(r2*r);p.vx+=f*dx*h;p.vy+=f*dy*h;p.x+=p.vx*h;p.y+=p.vy*h;}
      if(p.tr.length===0||Math.hypot(p.tr[p.tr.length-1][0]-p.x,p.tr[p.tr.length-1][1]-p.y)>4)p.tr.push([p.x,p.y]);if(p.x<-10||p.x>S.W+10||p.y<-10||p.y>S.H+10){p.done=true;p.life=1;const a=Math.abs(Math.atan2(p.vy,p.vx))/D2R;if(a>10)S.d10++;if(a>90)S.d90++;}});
    S.ps.forEach(p=>{if(p.done)p.life-=dt*0.7;});S.ps=S.ps.filter(p=>!p.done||p.life>0);},
  draw(c,W,H,S,P){c.fillStyle=C.canvas;c.fillRect(0,0,W,H);S.W=W;S.H=H;const cx=W*0.5,cy=H/2;S.g={cx,cy};
    for(let i=-6;i<=6;i++)for(let j=-8;j<=8;j++){const x=cx+i*W*0.08,y=cy+j*H*0.06;if(i===0&&j===0)continue;disk(c,x,y,1.5,rgba('muted',0.35));}
    const gg=c.createRadialGradient(cx,cy,1,cx,cy,22);gg.addColorStop(0,'rgba(255,200,80,0.9)');gg.addColorStop(1,'rgba(255,200,80,0)');c.fillStyle=gg;c.beginPath();c.arc(cx,cy,22,0,TAU);c.fill();disk(c,cx,cy,5+P.Z/30,C.warm);
    S.ps.forEach(p=>{const a=p.done?Math.max(0,p.life):1;c.strokeStyle=rgba('red',0.5*a);c.lineWidth=1.3;c.beginPath();p.tr.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.lineTo(p.x,p.y);c.stroke();if(!p.done)disk(c,p.x,p.y,3,C.red);});
    txt(c,'α',14,20,C.red,{font:MATH});
  },
  read:(S,P)=>{const rmin=1.44*2*P.Z/P.E;return[['Otilgan zarralar',String(S.n)],['10° dan ko‘p og‘gan',S.n?fmt(S.d10/S.n*100,1)+' %':'—'],['90° dan ko‘p (qaytgan)',String(S.d90)],['Eng yaqin kelish r_min',fmt(rmin,1)+' fm']];}
});
