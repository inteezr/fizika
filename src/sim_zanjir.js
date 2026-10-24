/* Ketma-ket va parallel ulash */
function zCalc(S,P){const Rs=S.ser.reduce((a,r)=>a+r.R,0),Rp=S.par.length?1/S.par.reduce((a,r)=>a+1/r.R,0):0,Rt=Rs+Rp,I=Rt>0?P.U/Rt:Infinity;return{Rs,Rp,Rt,I,Up:I*Rp};}
SIMS.push({id:'zanjir',cat:'tok',title:'Ketma-ket va parallel ulash',short:'R = R₁ + R₂ · 1/R = 1/R₁ + 1/R₂',sandbox:1,
  sub:'Rezistorlar ketma-ket ulansa qarshiliklar qo‘shiladi, parallel ulansa o‘tkazuvchanliklar qo‘shiladi.',
  formula:`<span><i>R</i> = <i>R</i><sub>1</sub> + <i>R</i><sub>2</sub> + …</span><span>${fr('1','<i>R</i>')} = ${fr('1','<i>R</i><sub>1</sub>')} + ${fr('1','<i>R</i><sub>2</sub>')} + …</span>`,
  text:['Ketma-ket ulangan rezistorlardan bir xil tok o‘tadi, kuchlanish esa ular orasida taqsimlanadi. Parallel ulangan rezistorlarda kuchlanish bir xil, tok esa tarmoqlar bo‘yicha taqsimlanadi: qarshiligi kichik tarmoqdan ko‘proq tok o‘tadi.','Zanjirni o‘zingiz yig‘ing: «+ Ketma-ket» yuqori simga rezistor qo‘shadi, «+ Parallel» pastda yangi tarmoq ochadi. Rezistorni bosib qarshiligini o‘zgartiring yoki olib tashlang. Nuqtalar tezligi har bir simdagi tokka mos.'],
  legend:[['R','qarshilik, Ω'],['U','manba kuchlanishi, V'],['I','tok kuchi, A']],
  tries:['Ikkita bir xil rezistorni parallel ulang: umumiy qarshilik 2 marta kamayadi.','Parallel tarmoqqa juda katta qarshilik qo‘shing: umumiy qarshilik deyarli o‘zgarmaydi.','Hamma rezistorlarni olib tashlang: qisqa tutashuv!'],
  tools:[{id:'move',label:'Tanlash'},{id:'addS',label:'+ Ketma-ket',act:1},{id:'addP',label:'+ Parallel',act:1}],
  params:[{id:'U',label:'Manba kuchlanishi',sym:'U',min:1,max:24,step:0.5,val:12,unit:'V',d:1}],
  init:()=>({ser:[{R:10}],par:[{R:20},{R:30}],sel:null,s:0,ph:[0,0,0,0,0,0],boxes:[]}),
  action(id,S){if(id==='addS'&&S.ser.length<5){const r={R:10};S.ser.push(r);S.sel=r;}if(id==='addP'&&S.par.length<5){const r={R:20};S.par.push(r);S.sel=r;}},
  step(S,P,dt){const z=zCalc(S,P),sp=I=>isFinite(I)?40*Math.pow(Math.min(I,30),0.6):300;S.s+=sp(z.I)*dt;S.par.forEach((r,i)=>{S.ph[i]+=sp(z.Up/r.R)*dt;});},
  draw(c,W,H,S,P){grid(c,W,H,28);const z=zCalc(S,P),hasP=S.par.length>0,L=50,R=W-40,T=H*0.16,B=hasP?H*0.48:H*0.72,xa=L+(R-L)*0.28,xb=R-(R-L)*0.28,gap=hasP&&S.par.length>1?Math.min(56,(H-26-B)/(S.par.length-1)):0;S.boxes=[];
    const res=(x,y,r,lab)=>{c.fillStyle=C.canvas;c.fillRect(x-32,y-12,64,24);c.strokeStyle=r===S.sel?C.accent:C.ink;c.lineWidth=r===S.sel?3:2.5;c.beginPath();c.moveTo(x-32,y);for(let i=0;i<8;i++)c.lineTo(x-28+i*8,y+(i%2?9:-9));c.lineTo(x+32,y);c.stroke();txt(c,lab,x,y-20,r===S.sel?C.accent:C.ink,{align:'center',font:SMALL});S.boxes.push([x,y,r]);};
    c.strokeStyle=C.ink;c.lineWidth=2.5;c.strokeRect(L,T,R-L,B-T);
    S.par.forEach((r,i)=>{if(i===0)return;const y=B+i*gap;line(c,xa,B,xa,y,C.ink,2.5);line(c,xb,B,xb,y,C.ink,2.5);line(c,xa,y,xb,y,C.ink,2.5);});
    if(hasP){disk(c,xa,B,4.5,C.ink);disk(c,xb,B,4.5,C.ink);}
    const my=(T+B)/2;c.fillStyle=C.canvas;c.fillRect(L-14,my-14,28,28);line(c,L-16,my-8,L+16,my-8,C.ink,2.5);line(c,L-8,my+8,L+8,my+8,C.ink,5);txt(c,'U = '+fmt(P.U,1)+' V',L+22,my,C.ink);
    const per=2*((R-L)+(B-T)),pt=s=>{s=((s%per)+per)%per;if(s<B-T)return[L,B-s];s-=B-T;if(s<R-L)return[L+s,T];s-=R-L;if(s<B-T)return[R,T+s];s-=B-T;return[R-s,B];};
    c.fillStyle=C.accent;for(let i=0;i<50;i++){const p=pt(per*i/50-S.s);if(hasP&&Math.abs(p[1]-B)<1&&p[0]>xa&&p[0]<xb)continue;c.beginPath();c.arc(p[0],p[1],3,0,TAU);c.fill();}
    S.par.forEach((r,i)=>{const y=B+i*gap,len=xb-xa;for(let j=0;j<10;j++){const u=((j/10*len+S.ph[i])%len+len)%len;c.beginPath();c.arc(xb-u,y,3,0,TAU);c.fill();}});
    S.ser.forEach((r,i)=>res(L+(R-L)*(i+1)/(S.ser.length+1),T,r,'R'+subn(i+1)+' = '+r.R+' Ω'));
    S.par.forEach((r,i)=>res((xa+xb)/2,B+i*gap,r,'R'+subn(S.ser.length+i+1)+' = '+r.R+' Ω  ·  '+fmt(z.Up/r.R,2)+' A'));
    if(!isFinite(z.I))txt(c,'Qisqa tutashuv! Zanjirga rezistor qo‘shing.',W/2,H*0.08,C.red,{align:'center',font:'600 15px "IBM Plex Sans", sans-serif'});
  },
  pointer(type,x,y,S,P,api){if(type!=='down')return false;const b=S.boxes.find(([bx,by])=>Math.abs(x-bx)<36&&Math.abs(y-by)<20);S.sel=b?b[2]:null;return!!b;},
  inspect(S){const r=S.sel;if(!r)return null;const inS=S.ser.includes(r),arr=inS?S.ser:S.par;if(!arr.includes(r))return null;return{title:inS?'Ketma-ket rezistor':'Parallel tarmoqdagi rezistor',props:[{label:'Qarshilik',sym:'R',min:1,max:100,step:1,unit:'Ω',d:0,get:()=>r.R,set:v=>r.R=v}],del:()=>arr.splice(arr.indexOf(r),1)};},
  inspectHint:'Rezistorni bosing — qarshiligini o‘zgartirasiz yoki olib tashlaysiz.',
  read:(S,P)=>{const z=zCalc(S,P);const out=[['Umumiy qarshilik R',z.Rt>0?fmt(z.Rt,2)+' Ω':'0 Ω'],['Umumiy tok I',isFinite(z.I)?fmt(z.I,3)+' A':'∞ (qisqa tutashuv)'],['Quvvat P = UI',isFinite(z.I)?fmt(P.U*z.I,2)+' W':'—']];
    const r=S.sel;if(r&&isFinite(z.I)){const I=S.ser.includes(r)?z.I:z.Up/r.R;if(S.ser.includes(r)||S.par.includes(r))out.push(['Tanlangan: U va I',fmt(I*r.R,2)+' V · '+fmt(I,3)+' A']);}return out;}
});
