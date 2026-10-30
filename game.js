(() => {
'use strict';
const KEY='casezero-memory-v1', $=id=>document.getElementById(id);
const blank=()=>({step:0,found:[],choices:[],timeline:[],reply:null,replyStep:-1,closed:false,ending:null,missed:[]});
const fresh=()=>({casesClosed:0,case001Attempts:0,completedCases:[],flags:{},current:blank()});
function load(){
 try{
  const x=JSON.parse(localStorage.getItem(KEY)||'null'); if(!x||typeof x!=='object')return fresh();
  if(!x.current)return {casesClosed:Number(x.casesClosed)||0,case001Attempts:0,completedCases:(Number(x.casesClosed)||0)>0?['case001']:[],flags:x.flags||{},current:{step:Math.min(3,Math.max(0,Number(x.step)||0)),found:Array.isArray(x.found)?x.found:[],choices:Array.isArray(x.choices)?x.choices:[],closed:!!x.closed,ending:x.ending||null,missed:[],timeline:[],reply:null,replyStep:-1}};
  const c=x.current;return {casesClosed:Math.max(0,Number(x.casesClosed)||0),case001Attempts:Math.max(0,Number(x.case001Attempts)||0),completedCases:Array.isArray(x.completedCases)?x.completedCases:((Number(x.casesClosed)||0)>0?['case001']:[]),flags:x.flags&&typeof x.flags==='object'?x.flags:{},current:{step:Math.min(3,Math.max(0,Number(c.step)||0)),found:Array.isArray(c.found)?c.found:[],choices:Array.isArray(c.choices)?c.choices:[],closed:!!c.closed,ending:c.ending||null,missed:Array.isArray(c.missed)?c.missed:[],timeline:Array.isArray(c.timeline)?c.timeline:[],reply:typeof c.reply==='string'?c.reply:null,replyStep:Number.isInteger(c.replyStep)?c.replyStep:-1}};
 }catch(e){return fresh()}
}
let save=load(), run=save.current;
function persist(){save.current=run;try{localStorage.setItem(KEY,JSON.stringify(save))}catch(e){console.warn('Local save unavailable',e)}stats()}
function remember(id,label,detail){if(!save.flags[id])save.flags[id]={label,detail,at:new Date().toISOString()};persist()}
function stats(){if($('casesStat'))$('casesStat').textContent=String(save.casesClosed||0).padStart(2,'0');if($('startCase'))$('startCase').innerHTML=run.closed?'REPLAY CASE <span>↻</span>':run.step>0?'RESUME CASE <span>↗</span>':'OPEN CASE <span>↗</span>';if($('cluesStat'))$('cluesStat').textContent=String(Object.keys(save.flags).filter(k=>k.startsWith('clue_')).length).padStart(2,'0');if($('memoryStat'))$('memoryStat').textContent=String(Object.keys(save.flags).length).padStart(2,'0')}
const screens=['home','case','memory'];
function show(id){screens.forEach(s=>$(s).classList.toggle('active',s===id));if(id==='memory')renderMemory();window.scrollTo(0,0)}
const steps=[
 {title:'9:17 PM',body:'Rain has turned the station windows into dark mirrors. You arrive at Northbridge Station after receiving an unsigned note: “Ask why the clock stopped.” The last train left at 9:20. The station clock is frozen at 9:17.',note:'CASE BRIEF • A silver ticket was found beneath platform bench 4. The station manager says the building was empty after 9:10.',choices:[['Inspect the station clock','clock_focus','You notice a fresh scratch around the minute hand. The clock was handled recently.'],['Question the station manager','manager_first','Elias answers quickly, then glances toward the staff corridor.'],['Go straight to platform 4','platform_first','The bench is damp except for a clean rectangle beneath its seat.']]},
 {title:'The Evidence Room',body:'Five records remain from the night. None tells the whole story alone. Inspect what you can, then decide which details deserve to stay in your case file.',note:'EVIDENCE PROTOCOL • A clue is not proof by itself. Compare the time, access, and people named in the records.',evidence:true},
 {title:'Three People, Three Stories',body:'Station manager Elias Vale says he locked the staff corridor at 9:10. Ticket inspector Mara Quinn says she checked platform 4 at 9:15. Cleaner Jonah Reed says he left before the clock stopped.',note:'Choose one witness to question. The other two questions will remain unanswered for now.',choices:[['Ask Elias who signed out the clock key','asked_key','Elias says the key never left his office. He avoids looking at the register.'],['Ask Mara about the dry ticket','asked_ticket','Mara says she saw the ticket before 9:15, but cannot explain why it was dry.'],['Ask Jonah about the maintenance log','asked_log','Jonah admits he wrote the maintenance note earlier; someone else added the time later.']]},
 {title:'The Missing Minute',body:'You have the records, the witnesses, and the gaps between their accounts. Build a theory that explains the clock, the ticket, and the altered log.',note:'FINAL REVIEW • A convincing theory should explain the evidence without asking you to ignore a contradiction.',deduction:true}
];
const clues=[
 {id:'scratch',title:'Fresh scratch',desc:'A narrow metal mark circles the clock’s minute hand. Dust around the casing is disturbed, consistent with someone opening it recently.',flag:'clue_clock'},
 {id:'ticket',title:'Dry silver ticket',desc:'The ticket is dry, but the bench and floor around it are wet. It was placed beneath the bench after the rain began.',flag:'clue_ticket'},
 {id:'log',title:'Altered maintenance log',desc:'The 9:15 maintenance entry uses different ink. The time was added after the rest of the page had been completed.',flag:'clue_log'},
 {id:'key',title:'Clock key register',desc:'The clock key was signed out at 9:12. The attached staff roster maps the initial E to station manager Elias Vale.',flag:'clue_key'},
 {id:'roster',title:'Night staff roster',desc:'Elias Vale is the only staff member matching the E on the key register. Mara and Jonah were assigned elsewhere.',flag:'clue_roster'}
];
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderStep(){
 const s=steps[run.step];$('progressBar').style.width=((run.step+1)/4*100)+'%';
 let h='<div class="story-card"><div class="eyebrow">FIELD NOTES / ENTRY '+String(run.step+1).padStart(2,'0')+'</div><h1>'+esc(s.title)+'</h1><p class="story-text">'+esc(s.body)+'</p>';
 if(s.note)h+='<div class="story-note">'+esc(s.note)+'</div>';
 if(s.evidence){h+='<div class="evidence-grid">'+clues.map(c=>'<article class="evidence '+(run.found.includes(c.id)?'found':'')+'"><h3>'+esc(c.title)+'</h3><p>'+esc(c.desc)+'</p><button data-clue="'+c.id+'">'+(run.found.includes(c.id)?'✓ RECORDED':'＋ ADD TO EVIDENCE')+'</button></article>').join('')+'</div><p class="muted">RECORDED: '+run.found.length+' / '+clues.length+'</p><button class="primary" id="continueStep">CONTINUE <span>→</span></button>'}
 else if(s.deduction){
 const events=[['claim','9:10 PM — Elias says the staff corridor was locked.'],['keyout','9:12 PM — The clock key is signed out.'],['logtime','9:15 PM — A maintenance time is added to the log.'],['clockstop','9:17 PM — The station clock is found stopped.']];
 const ordered=run.timeline.length===4&&run.timeline.every((v,i)=>v===['claim','keyout','logtime','clockstop'][i]);
 h+='<p class="story-text">Before naming a suspect, reconstruct the four-minute window. Add each event to your timeline in the order you believe it happened.</p><div class="timeline-board"><div class="case-kicker">YOUR TIMELINE</div><ol class="timeline-list">'+run.timeline.map((id,i)=>'<li><span>'+String(i+1).padStart(2,'0')+'</span>'+esc(events.find(e=>e[0]===id)?.[1]||id)+'</li>').join('')+'</ol>';
 if(run.timeline.length<4)h+='<div class="timeline-options">'+events.filter(e=>!run.timeline.includes(e[0])).map(e=>'<button class="choice" data-time="'+e[0]+'">'+esc(e[1])+' <small>ADD EVENT +</small></button>').join('')+'</div>';
 else h+='<p class="story-note">'+(ordered?'TIMELINE CONSISTENT • The key leaves before the altered log and the stopped clock.':'TIMELINE CONFLICT • One or more events are out of order. Review the records and try again.')+'</p><button class="quiet" id="retryTimeline">REBUILD TIMELINE ↻</button>';
 h+='</div>';
 if(ordered)h+='<p class="story-text">Who most likely altered the clock and staged the false timeline?</p><div class="choice-list"><button class="choice" data-ending="elias"><small>THEORY A</small>Elias Vale — the key register and staff roster connect him to the clock.</button><button class="choice" data-ending="mara"><small>THEORY B</small>Mara Quinn — she was assigned to platform 4 and could have placed the ticket.</button><button class="choice" data-ending="jonah"><small>THEORY C</small>Jonah Reed — he wrote the maintenance log.</button></div>';
 }
 else if(run.replyStep===run.step&&run.reply)h+='<div class="ending"><div class="case-kicker">YOUR MOVE / RESPONSE</div><p class="story-text">'+esc(run.reply)+'</p></div><button class="primary" id="continueReply">CONTINUE <span>→</span></button>';
 else h+='<div class="choice-list">'+s.choices.map(c=>'<button class="choice" data-choice="'+c[1]+'"><small>CHOOSE YOUR NEXT MOVE</small>'+esc(c[0])+'</button>').join('')+'</div>';
 $('caseContent').innerHTML=h+'</div>';
 document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{const c=s.choices.find(x=>x[1]===b.dataset.choice);if(!c||run.choices.includes(c[1]))return;run.choices.push(c[1]);run.reply=c[2];run.replyStep=run.step;remember(c[1],c[0],c[2]);persist();renderStep()});
 const reply=$('continueReply');if(reply)reply.onclick=()=>{run.step++;run.reply=null;run.replyStep=-1;persist();renderStep()};
 document.querySelectorAll('[data-clue]').forEach(b=>b.onclick=()=>{const c=clues.find(x=>x.id===b.dataset.clue);if(!c||run.found.includes(c.id))return;run.found.push(c.id);remember(c.flag,c.title,c.desc);renderStep()});
 const cont=$('continueStep');if(cont)cont.onclick=()=>{if(run.found.length<2){alert('Inspect at least two pieces of evidence before continuing. A good theory needs support.');return}run.step++;persist();renderStep()};
 document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{if(run.timeline.length<4&&!run.timeline.includes(b.dataset.time)){run.timeline.push(b.dataset.time);persist();renderStep()}});
 const retry=$('retryTimeline');if(retry)retry.onclick=()=>{run.timeline=[];persist();renderStep()};
 document.querySelectorAll('[data-ending]').forEach(b=>b.onclick=()=>finish(b.dataset.ending));
}
function finish(which){
 if(run.closed)return;
 const right=which==='elias', timelineCorrect=run.timeline.join('|')==='claim|keyout|logtime|clockstop', strong=['key','roster','log','scratch'].every(x=>run.found.includes(x)), identityProved=run.found.includes('key')&&run.found.includes('roster');
 run.closed=true;run.ending=which;save.case001Attempts=(Number(save.case001Attempts)||0)+1;if(!Array.isArray(save.completedCases))save.completedCases=[];if(!save.completedCases.includes('case001')){save.completedCases.push('case001');save.casesClosed=(Number(save.casesClosed)||0)+1;}save.flags['timeline_case001_'+save.case001Attempts]={label:'Timeline reconstruction',detail:timelineCorrect?'Correct sequence: 9:10 → 9:12 → 9:15 → 9:17.':'The timeline needed revision; the final review records the evidence sequence.',at:new Date().toISOString()};
 const missed=[['asked_key','You did not ask Elias directly about the clock key.'],['asked_ticket','You did not press Mara on why the ticket was dry.'],['asked_log','You did not ask Jonah who added the maintenance time.']].filter(x=>!run.choices.includes(x[0])).map(x=>x[1]);
 run.missed=missed;
 remember('theory_case001_'+save.case001Attempts,'Final theory: '+which.toUpperCase(),right?'You identified Elias Vale using the key register and staff roster.':'You selected '+which+'. The records point more strongly to Elias Vale.');
 missed.forEach((d,i)=>remember('unasked_'+save.case001Attempts+'_'+i,'Question left unasked',d));
 persist();$('progressBar').style.width='100%';
 const review=right?(identityProved?'Elias Vale is the supported conclusion. The key register records the clock key leaving at 9:12, and the roster maps E to Elias. The disturbed clock and altered 9:15 entry show how he tried to manufacture a false timeline.':'You chose Elias, the correct suspect, but you did not collect both records that identify him. Your conclusion is right; your proof is incomplete.'):'Your theory does not fit the full record. The key register and staff roster connect the clock key to Elias Vale. The altered maintenance time creates a false 9:15 explanation.';
 $('caseContent').innerHTML='<div class="story-card"><div class="eyebrow">CASE 001 / OUTCOME RECORDED</div><h1>'+(right?'A minute <em>recovered.</em>':'A theory, not the truth.')+'</h1><div class="ending"><div class="case-kicker">'+(right?'SUPPORTED CONCLUSION':'CASE REVIEW')+'</div><p class="story-text">'+review+'</p><p class="story-note">'+(strong?'CASE QUALITY: COMPLETE. You gathered the key register, roster, altered log, and clock evidence — a strong chain linking access to the staged timeline.':identityProved?'CASE QUALITY: SUPPORTED. You proved who had access, but some context is still missing.':'CASE QUALITY: INCOMPLETE. Important records were left uncollected. The bureau remembers the gaps as well as the clues.')+'</p></div><p class="story-text">As you close the file, a second envelope waits beneath it. No return address. Inside is a photograph of an empty desk — and a name written on the back: <strong>DETECTIVE ROWAN.</strong></p><p class="story-note">THE MEMORY HAS BEEN UPDATED. Future cases will remember which clues you trusted and which questions you left unasked.</p><button class="primary" id="finishHome">RETURN TO BUREAU <span>↗</span></button></div>';
 $('finishHome').onclick=()=>{show('home');stats()};
}
function renderMemory(){const a=Object.values(save.flags).sort((x,y)=>String(y.at||'').localeCompare(String(x.at||'')));$('memoryList').innerHTML=a.length?a.map(x=>'<article class="memory-item"><b>'+esc(x.label)+'</b><p>'+esc(x.detail)+'</p></article>').join(''):'<div class="memory-item"><b>No memories recorded yet.</b><p>Your decisions, discoveries and unanswered questions will appear here.</p></div>'}
function start(){if(run.closed)run=blank();persist();show('case');renderStep()}
$('startCase').onclick=start;$('backHome').onclick=()=>show('home');$('memoryOpen').onclick=()=>show('memory');$('memoryBack').onclick=()=>show('home');
$('resetSave').onclick=()=>{if(confirm('Erase all CaseZero progress and memory on this device?')){localStorage.removeItem(KEY);save=fresh();run=save.current;persist();renderMemory()}};
stats();
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();