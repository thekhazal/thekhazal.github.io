(function(){
var CELIA='<svg viewBox="0 0 100 100" width="1em" height="1em" style="vertical-align:-0.15em" aria-hidden="true"><path d="M26 44c0-22 12-32 24-32s24 10 24 32v34H26z" fill="#6b3f26"/><path d="M22 100c2-16 13-24 28-24s26 8 28 24z" fill="#8e6bd8"/><rect x="43" y="60" width="14" height="18" rx="6" fill="#f6c9a0"/><ellipse cx="50" cy="42" rx="19" ry="21" fill="#fbd7b3"/><path d="M31 40c2-17 12-22 20-22s17 5 19 22c-8-3-14-9-17-14-3 7-12 13-22 14z" fill="#6b3f26"/><rect x="29" y="30" width="42" height="5" rx="2.5" fill="#ff7aa8" transform="rotate(-6 50 32)"/><circle cx="43" cy="45" r="2.3" fill="#2b2b2b"/><circle cx="57" cy="45" r="2.3" fill="#2b2b2b"/><path d="M44 53q6 5 12 0" stroke="#c0504d" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="38" cy="51" r="3" fill="#ffadb0" opacity=".6"/><circle cx="62" cy="51" r="3" fill="#ffadb0" opacity=".6"/></svg>';
var SELMA='<svg viewBox="0 0 100 100" width="1em" height="1em" style="vertical-align:-0.15em" aria-hidden="true"><circle cx="20" cy="40" r="10" fill="#d9a066"/><circle cx="80" cy="40" r="10" fill="#d9a066"/><circle cx="20" cy="31" r="4.5" fill="#ff7aa8"/><circle cx="80" cy="31" r="4.5" fill="#ff7aa8"/><path d="M28 100c1-12 9-18 22-18s21 6 22 18z" fill="#ffd44d"/><circle cx="50" cy="52" r="27" fill="#ffdcbc"/><path d="M24 46c1-18 13-25 26-25s25 7 26 25c-9-2-17-8-21-15-5 8-15 14-31 15z" fill="#d9a066"/><path d="M50 22c-4-6 2-11 6-7" stroke="#d9a066" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="40" cy="56" r="4" fill="#2b2b2b"/><circle cx="60" cy="56" r="4" fill="#2b2b2b"/><circle cx="41.3" cy="54.7" r="1.3" fill="#fff"/><circle cx="61.3" cy="54.7" r="1.3" fill="#fff"/><path d="M45 66q5 4 10 0" stroke="#c0504d" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="33" cy="64" r="4" fill="#ffadb0" opacity=".7"/><circle cx="67" cy="64" r="4" fill="#ffadb0" opacity=".7"/></svg>';
var S={celia:CELIA,selma:SELMA};
function fix(){
 ['celia','selma'].forEach(function(k){
  document.querySelectorAll('.profile-card.'+k+' .profile-icon').forEach(function(e){if(!e.querySelector('svg'))e.innerHTML=S[k];});
 });
 document.querySelectorAll('.profile-switch').forEach(function(b){
  if(b.querySelector('svg')||typeof activeProfile==='undefined'||!S[activeProfile])return;
  var t=b.textContent.replace(/^\S+\s/,'');
  b.innerHTML=S[activeProfile]+' ';b.appendChild(document.createTextNode(t));
 });
}
try{PROFILES.celia.icon='\u{1F467}';PROFILES.selma.icon='\u{1F476}';}catch(e){}
new MutationObserver(fix).observe(document.getElementById('app'),{childList:true,subtree:true});
fix();
})();
