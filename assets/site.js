/* Shared chart helpers. Plotly colours can't read light-dark(), so the palette lives here too. */
window.SITE=(()=>{
 const PAL={light:{ink:'#10131a',mute:'#566070',line:'#dde2e8',pru:'#0b4f8a',car:'#c1121f',grey:'#8a96a8',soft:'#eef0f3',org:'#2e7d4f'},dark:{ink:'#e7e9ee',mute:'#9aa3b2',line:'#2a303a',pru:'#6fa8dc',car:'#ef6b73',grey:'#7d8796',soft:'#3a3f48',org:'#6cc28f'}};
 const isDark=()=>{const t=document.documentElement.dataset.theme;return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches};
 const c=k=>PAL[isDark()?'dark':'light'][k];
 const base=o=>Object.assign({paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{family:'Literata, Georgia, serif',size:13,color:c('ink')},margin:{l:56,r:16,t:12,b:44},showlegend:false,hoverlabel:{font:{family:'Literata, Georgia, serif'}}},o||{},{showlegend:false});
 const ax=o=>Object.assign({gridcolor:c('line'),zeroline:false,linecolor:c('line'),fixedrange:true,automargin:true},o||{});
 const cfg={displayModeBar:false,responsive:true};
 const narrow=id=>document.getElementById(id).clientWidth<560;
 function tabs(names,draw){
  const show=n=>{names.forEach(t=>{document.getElementById('t-'+t).setAttribute('aria-selected',t===n);document.getElementById('p-'+t).classList.toggle('on',t===n)});requestAnimationFrame(()=>draw[n]&&draw[n]())};
  const cur=()=>names.find(t=>document.getElementById('p-'+t).classList.contains('on'));
  names.forEach(t=>document.getElementById('t-'+t).addEventListener('click',()=>{show(t);try{history.replaceState(null,'','#'+t)}catch(e){}}));
  document.querySelectorAll('.next[data-go]').forEach(b=>b.addEventListener('click',()=>{show(b.dataset.go);document.querySelector('nav.tabs').scrollIntoView({behavior:'smooth'})}));
  const redraw=()=>{const k=cur();draw[k]&&draw[k]()};
  let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(redraw,200)});
  new MutationObserver(redraw).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',redraw);
  addEventListener('hashchange',()=>{const k=location.hash.slice(1);if(names.includes(k))show(k)});
  const h=location.hash.slice(1);show(names.includes(h)?h:names[0]);
  return {show,redraw};
 }
 function pills(id,onPick){const el=document.getElementById(id);el.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{el.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));onPick(b.dataset.v)}));return ()=>el.querySelector('[aria-pressed=true]').dataset.v}
 const fmt=(v,d=0)=>v.toLocaleString('en',{minimumFractionDigits:d,maximumFractionDigits:d});
 const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 return {c,isDark,base,ax,cfg,tabs,pills,fmt,esc,narrow};
})();
