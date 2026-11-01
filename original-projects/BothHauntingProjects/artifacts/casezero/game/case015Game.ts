import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_015_GAME = {
 id:'case015', title:'The Floor Between', subtitle:'A movement record can place a credential near a door. It cannot prove who carried it.',
 location:'CONTINUITY OPERATIONS VAULT · SECURE FLOOR',
 briefing:'Case 014 established that badge B-17 was accepted through S-04 local fallback at 01:27. The carrier remains unknown. A secure-floor movement ledger now places a staff credential near the C-4 inner door. Determine what the movement records establish—and where their limits remain.',
 clues:[
 {id:'map',title:'Secure-floor access map',label:'Facilities plan · 00:50',detail:'The map places S-04 beside the east service lift and the C-4 inner door. It establishes the layout, not who travelled through it.'},
 {id:'lift',title:'Lift controller export',label:'Controller event · 01:18',detail:'The east service lift records a maintenance trip under pass M-6. The controller stores the credential and trip, not the passenger’s identity.'},
 {id:'movement',title:'Secure-floor movement ledger',label:'Checkpoint entry · 01:26',detail:'A checkpoint entry beside the C-4 inner door is recorded under Ivo Dane’s staff pass. The checkpoint is adjacent to the inner door; it is not a terminal-room entry record.'},
 {id:'slip',title:'Service completion slip',label:'Facilities closeout · 01:44',detail:'Oren Pike signs the service task as complete. The signature closes the work order and does not identify the lift passenger or badge carrier.'}
 ],
 witnesses:[
 {id:'mira',name:'Mira Sol',role:'Movement registrar',questions:[
 {id:'checkpoint',prompt:'What does the 01:26 entry establish?',reply:'The checkpoint system recorded Ivo Dane’s staff pass at that location. It does not prove who physically carried or presented it.'},
 {id:'door',prompt:'Does the checkpoint mean someone entered C-4?',reply:'No. It is adjacent to the inner door. The ledger has no inner-room entry field.'}]},
 {id:'oren',name:'Oren Pike',role:'Facilities technician',questions:[
 {id:'slip',prompt:'What does your signed slip confirm?',reply:'I closed the maintenance task at 01:44. It is a work-order record, not a passenger manifest.'},
 {id:'lift',prompt:'Can the lift export name its passenger?',reply:'No. M-6 is the credential recorded for the maintenance trip. The controller does not record a passenger name.'}]},
 {id:'ivo',name:'Ivo Dane',role:'Relief coordinator',questions:[
 {id:'pass',prompt:'What does the movement entry say?',reply:'It lists my staff pass at the checkpoint. That is what the record says; it does not contain a visual identification.'},
 {id:'terminal',prompt:'Does that record place you at the terminal?',reply:'No. The checkpoint is outside the inner door. There is no terminal login or room-entry record in this packet.'}]}
 ],
 timelineEvents:[
 {id:'map',time:'00:50',title:'Secure-floor map issued',detail:'The access plan establishes the route and checkpoint locations.'},
 {id:'lift',time:'01:18',title:'East service lift records M-6 trip',detail:'The controller stores the maintenance credential event.'},
 {id:'movement',time:'01:26',title:'Checkpoint records Ivo Dane staff pass',detail:'The pass is logged beside the C-4 inner door.'},
 {id:'slip',time:'01:44',title:'Facilities service slip signed',detail:'The maintenance task is formally closed.'}],
 correctOrder:['map','lift','movement','slip'],
 suspects:[
 {id:'ivo',name:'Ivo Dane staff-pass record',role:'Recorded checkpoint credential',note:'The movement ledger records Ivo Dane’s staff pass at the adjacent checkpoint.'},
 {id:'oren',name:'Oren Pike service closeout',role:'Work-order signature',note:'The slip closes the task but does not identify a checkpoint user.'},
 {id:'m6',name:'M-6 lift credential',role:'Maintenance trip',note:'M-6 is recorded for the lift trip, not the 01:26 checkpoint.'}],
 motives:[
 {id:'checkpoint',label:'Identify the credential recorded at the adjacent checkpoint',note:'The ledger records Ivo Dane’s staff pass at 01:26 beside the C-4 inner door.'},
 {id:'carrier',label:'Prove Ivo personally carried the pass',note:'A credential record does not visually identify its carrier.'},
 {id:'operator',label:'Prove Ivo entered C-4 and operated the terminal',note:'The packet contains no inner-room entry or personal terminal login.'}],
 correctSuspect:'ivo',correctMotive:'checkpoint',
 truth:'At 01:26, the secure-floor movement ledger records Ivo Dane’s staff pass at the checkpoint beside the C-4 inner door. The lift export and service slip establish surrounding facilities activity, but neither names a passenger. The evidence does not prove who physically carried the pass, entered C-4, or operated the shared terminal.',
 proof:'The map establishes that the checkpoint is adjacent to—not inside—the C-4 room. The 01:18 lift export records M-6, while the 01:26 movement ledger records Ivo Dane’s staff pass at the checkpoint. The 01:44 slip closes the facilities task. These records support the sequence and credential attribution only.',
 outcome:'The Bureau confirms a checkpoint event under Ivo Dane’s staff pass, without treating that as proof of Ivo’s physical presence or terminal operation. The next lead is the C-4 inner-door latch and occupancy audit.'
} as const;
export const CASE_015_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase015Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_015_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),accessTrailFiles:priorFiles.filter(r=>['case012','case013','case014'].includes(r.caseId)).length};}
export function isCase015TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_015_GAME.correctOrder[i]);}
export function isCase015DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_015_GAME.correctSuspect&&motiveId===CASE_015_GAME.correctMotive;}
