import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_016_GAME = {
 id:'case016', title:'The Inner-Door Record', subtitle:'A door event can establish access. Occupancy and terminal activity require their own records.',
 location:'CONTINUITY OPERATIONS VAULT · C-4 INNER DOOR',
 briefing:'Case 015 found Ivo Dane’s staff pass recorded at the checkpoint beside the C-4 inner door at 01:26. That is not an entry record. The Bureau has obtained the inner-door latch export, occupancy counter report and terminal session index. Determine whether the records establish entry, presence, or terminal use—and keep those findings separate.',
 clues:[
 {id:'latch',title:'Inner-door latch export',label:'Access controller · 01:29',detail:'The C-4 inner-door controller records one accepted open event at 01:29 under the shared access group. It does not identify a named person or badge carrier.'},
 {id:'counter',title:'Occupancy counter report',label:'Room sensor · 01:30–01:42',detail:'The room counter changes from zero to one at 01:30 and returns to zero at 01:42. It counts movement across the sensor, not identity or purpose.'},
 {id:'session',title:'C-4 terminal session index',label:'Terminal audit · 01:33',detail:'A shared C-4 service account opens a session at 01:33. The account is assigned to a team pool; this index does not name the operator.'},
 {id:'reconcile',title:'Door-to-session reconciliation',label:'Audit comparison · 02:05',detail:'The audit places the latch event, occupancy interval and shared-account session within the same window. The systems are time-aligned, but none links a named individual to the session.'}
 ],
 witnesses:[
 {id:'sana',name:'Sana Vey',role:'Access-control auditor',questions:[
 {id:'latch',prompt:'What does the latch export identify?',reply:'It records an accepted open event under a shared access group. It does not name the person at the door.'},
 {id:'badge',prompt:'Does the latch event identify Ivo?',reply:'No. The earlier checkpoint entry and this door event are separate records. There is no shared personal identifier connecting them.'}]},
 {id:'elias',name:'Elias Marr',role:'Occupancy systems technician',questions:[
 {id:'count',prompt:'What does the counter measure?',reply:'A change in occupancy count. It does not identify who crossed the sensor or why.'},
 {id:'duration',prompt:'Can the counter prove who stayed in the room?',reply:'No. It gives an interval with a count of one, not a person’s name.'}]},
 {id:'nora',name:'Nora Pell',role:'Terminal systems custodian',questions:[
 {id:'account',prompt:'Who owns the C-4 service account?',reply:'It is a shared team-pool account. The session index has no individual operator field.'},
 {id:'session',prompt:'Does the session prove who used the terminal?',reply:'No. It establishes that the shared account opened a session at 01:33, not who was at the keyboard.'}]}
 ],
 timelineEvents:[
 {id:'latch',time:'01:29',title:'C-4 inner door records accepted open',detail:'The access controller records a shared-group event.'},
 {id:'counter',time:'01:30',title:'Occupancy count changes to one',detail:'The room sensor records an occupancy change.'},
 {id:'session',time:'01:33',title:'Shared C-4 service session opens',detail:'The terminal index records the pooled account session.'},
 {id:'reconcile',time:'02:05',title:'Audit reconciliation completed',detail:'The auditor compares the three system records.'}],
 correctOrder:['latch','counter','session','reconcile'],
 suspects:[
 {id:'shared',name:'Shared access group',role:'Door credential group',note:'The latch export identifies a shared group, not an individual.'},
 {id:'ivo',name:'Ivo Dane',role:'Earlier checkpoint credential',note:'The prior ledger records Ivo’s pass at an adjacent checkpoint, not at the inner door.'},
 {id:'nora',name:'Nora Pell',role:'Terminal systems custodian',note:'Custodianship of the shared account does not identify the operator.'}],
 motives:[
 {id:'separate',label:'Establish the door, occupancy and session events separately',note:'The records establish an accepted door event, an occupancy interval and a shared-account session.'},
 {id:'entry',label:'Prove Ivo entered the room',note:'No named person is identified by the latch or occupancy systems.'},
 {id:'operator',label:'Identify the person who operated the terminal',note:'The shared account has no individual operator field.'}],
 correctSuspect:'shared',correctMotive:'separate',
 truth:'The C-4 inner-door controller records an accepted open event at 01:29 under a shared access group. The occupancy counter records one occupant from 01:30 to 01:42, and a shared service-account session opens at 01:33. The records are time-aligned, but they do not identify the person who entered or operated the terminal.',
 proof:'The latch export, occupancy counter and terminal session index each record a different system event. The reconciliation confirms their timing, not a personal identity link. Ivo’s earlier checkpoint record does not bridge that gap.',
 outcome:'The Bureau confirms that the C-4 room was accessed, occupied and used by a shared service session during the same window. The individual inside and the terminal operator remain unidentified. The next lead is the shared-account handoff and sign-out register.'
} as const;
export const CASE_016_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase016Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_016_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),accessTrailFiles:priorFiles.filter(r=>['case012','case013','case014','case015'].includes(r.caseId)).length};}
export function isCase016TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_016_GAME.correctOrder[i]);}
export function isCase016DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_016_GAME.correctSuspect&&motiveId===CASE_016_GAME.correctMotive;}
