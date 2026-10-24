/* 13. Om qonuni */
SIMS.push({id:'om',cat:'tok',title:'Zanjir qismi uchun Om qonuni',short:'I = U / R',
  sub:'Tok kuchi kuchlanishga to‘g‘ri, qarshilikka teskari proporsional.',
  formula:`<span><i>I</i> = ${fr('<i>U</i>','<i>R</i>')}</span><span class="alt"><i>P</i> = <i>UI</i> = <i>I</i><sup>2</sup><i>R</i></span>`,
  text:['Manba kuchlanishi elektronlarni zanjir bo‘ylab harakatga keltiradi, qarshilik esa bu harakatga to‘sqinlik qiladi. Ko‘k nuqtalar elektronlar: ular tokning shartli yo‘nalishiga (to‘q sariq strelkalar) teskari harakatlanadi.','Lampa yorug‘ligi ajralayotgan quvvatni ko‘rsatadi. O‘ngdagi grafikda tok kuchining kuchlanishga bog‘liqligi to‘g‘ri chiziq, uning qiyaligi 1/R ga teng.'],
  legend:[['I','tok kuchi, A'],['U','kuchlanish, V'],['R','qarshilik, Ω'],['P','quvvat, W']],
  tries:['Qarshilikni oshiring: elektronlar sekinlashadi, lampa xiralashadi.','Kuchlanishni 2 marta oshiring: tok ham 2 marta ortadi, quvvat esa 4 marta.','Grafikdagi chiziq qiyaligini R bilan solishtiring.'],
  params:[{id:'U',label:'Kuchlanish',sym:'U',min:1,max:24,step:0.5,val:12,unit:'V',d:1},{id:'R',label:'Qarshilik',sym:'R',min:2,max:100,step:1,val:20,unit:'Ω',d:0}],
  init:()=>({s:0}),step(S,P,dt){const I=P.U/P.R;S.s+=40*Math.pow(I,0.6)*dt;},
  draw(c,W,H,S,P){grid(c,W,H,28);const I=P.U/P.R,Pw=P.U*I,L=30,R=W*0.58,T=H*0.18,B=H*0.82,w=R-L,h=B-T,per=2*(w+h);
    const pt=s=>{s=((s%per)+per)%per;if(s<h)return[L,B-s];s-=h;if(s<w)return[L+s,T];s-=w;if(s<h)return[R,T+s];s-=h;return[R-s,B];};
    c.strokeStyle=C.ink;c.lineWidth=2.5;c.strokeRect(L,T,w,h);
    const my=(T+B)/2;c.fillStyle=C.canvas;c.fillRect(L-14,my-14,28,28);line(c,L-16,my-8,L+16,my-8,C.ink,2.5);line(c,L-8,my+8,L+8,my+8,C.ink,5);txt(c,'+',L-26,my-8,C.red,{align:'center',font:'600 16px sans-serif'});txt(c,'−',L-26,my+9,C.accent,{align:'center',font:'600 16px sans-serif'});txt(c,'U',L+24,my,C.ink,{font:MATH});
    const rx=L+w/2;c.fillStyle=C.canvas;c.fillRect(rx-40,T-14,80,28);c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(rx-40,T);for(let i=0;i<8;i++)c.lineTo(rx-35+i*10,T+(i%2?10:-10));c.lineTo(rx+40,T);c.stroke();txt(c,'R = '+P.R+' Ω',rx,T-24,C.ink,{align:'center'});
    const glow=Math.sqrt(Pw/288);const gg=c.createRadialGradient(R,my,4,R,my,30+glow*40);gg.addColorStop(0,`rgba(255,200,60,${0.25+glow*0.7})`);gg.addColorStop(1,'rgba(255,200,60,0)');c.fillStyle=gg;c.beginPath();c.arc(R,my,30+glow*40,0,TAU);c.fill();
    disk(c,R,my,16,C.canvas,C.ink);line(c,R-10,my-10,R+10,my+10,C.ink,2);line(c,R-10,my+10,R+10,my-10,C.ink,2);
    const N=44;c.fillStyle=C.accent;for(let i=0;i<N;i++){const p=pt(per*i/N-S.s);c.beginPath();c.arc(p[0],p[1],3.2,0,TAU);c.fill();}
    arrow(c,L+w*0.2,T+18,L+w*0.3,T+18,C.warm,2,'I');arrow(c,R-18,T+h*0.2,R-18,T+h*0.3,C.warm,2);arrow(c,L+w*0.8,B-18,L+w*0.7,B-18,C.warm,2);
    const gx=W*0.67,gr=W-22,gt=H*0.18,gb=H*0.82,Im=3,ux=(gr-gx)/24,iy=(gb-gt)/Im;line(c,gx,gb,gr,gb,C.ink,1.5);line(c,gx,gb,gx,gt,C.ink,1.5);txt(c,'U, V',gr,gb+16,C.muted,{align:'right'});txt(c,'I, A',gx+4,gt-10,C.muted);
    [0,12,24].forEach(u=>txt(c,u+'',gx+u*ux,gb+16,C.muted,{align:'center'}));[1,2,3].forEach(i=>txt(c,i+'',gx-6,gb-i*iy,C.muted,{align:'right'}));
    c.save();c.beginPath();c.rect(gx,gt,gr-gx,gb-gt);c.clip();line(c,gx,gb,gx+24*ux,gb-24/P.R*iy,C.accent,2.5);c.restore();
    if(I<=Im)disk(c,gx+P.U*ux,gb-I*iy,5,C.red);else arrow(c,gx+P.U*ux,gt+20,gx+P.U*ux,gt+2,C.red,2);
  },
  read:(S,P)=>{const I=P.U/P.R;return[['Tok kuchi I',fmt(I,3)+' A'],['Quvvat P',fmt(P.U*I,1)+' W'],['1 s da o‘tgan elektronlar',fmt(I/1.6e-19)]];}
});
