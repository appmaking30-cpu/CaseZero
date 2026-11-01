import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_018_GAME = {
 id:'case018', title:'The Key Cabinet', subtitle:'A key was available, a packet moved, but access records do not automatically identify its carrier.',
 location:'CONTINUITY OPERATIONS VAULT · KEY CONTROL ROOM',
 briefing:'Case 017 established that packet H-9 was transferred to a secure tray with no recipient recorded. The Bureau now has the cabinet issue log, duplicate-key seal check, return register and camera maintenance sheet. Determine what the key records establish—and keep key access separate from proof of who collected the packet.',
 clues:[
 {id:'issue',title:'Key cabinet issue log',label:'Key control · 01:46',detail:'Cabinet key K-4 is signed out under the overnight facilities pool at 01:46. The entry records a pool credential and does not name the person who physically took the key.'},
 {id:'seal',title:'Duplicate-key seal check',label:'Security desk · 01:49',detail:'The duplicate K-4 seal is recorded intact at 01:49. This rules out a logged duplicate-seal breach during the check, but it does not establish which person held the issued key.'},
 {id:'return',title:'Key return register',label:'Key control · 02:04',detail:'K-4 is returned under the same pool credential at 02:04. The return field has no individual countersignature and does not record the secure-tray recipient.'},
 {id:'camera',title:'Cabinet camera maintenance sheet',label:'Facilities notice · 01:40–02:10',detail:'The cabinet camera was in scheduled maintenance for this interval. The notice explains why no image is available; it is not evidence that a particular person used the key or removed the packet.'}
 ],
 witnesses:[
 {id:'nora',name:'Nora Pell',role:'Key-control records custodian',questions:[
 {id:'issue',prompt:'Who signed out K-4?',reply:'The overnight facilities pool credential. The register does not identify the individual who physically collected it.'},
 {id:'holder',prompt:'Can the pool entry identify the key holder?',reply:'No. It records the pool credential and time, not a named carrier.'}]},
 {id:'cal',name:'Cal Rook',role:'Secure-tray desk clerk',questions:[
 {id:'tray',prompt:'Does the key register name the H-9 recipient?',reply:'No. The key issue and return entries do not contain a packet recipient field.'},
 {id:'collection',prompt:'Can you confirm who opened the tray?',reply:'Not from these records. There is no signed collection receipt tied to an individual.'}]},
 {id:'sana',name:'Sana Vey',role:'Security records auditor',questions:[
 {id:'seal',prompt:'What does the duplicate seal check establish?',reply:'The duplicate seal was recorded intact at 01:49. It does not tell us who held the issued key.'},
 {id:'camera',prompt:'Can the camera maintenance notice identify anyone?',reply:'No. It explains the missing footage, but an unavailable recording cannot be treated as identification.'}]}
 ],
 timelineEvents:[
 {id:'maintenance',time:'01:40',title:'Cabinet camera enters maintenance window',detail:'The maintenance sheet records the camera outage window.'},
 {id:'issue',time:'01:46',title:'K-4 signed out to facilities pool',detail:'The pool credential is recorded, not an individual carrier.'},
 {id:'seal',time:'01:49',title:'Duplicate-key seal checked intact',detail:'The duplicate seal check is recorded.'},
 {id:'return',time:'02:04',title:'K-4 returned under pool credential',detail:'The return is recorded without an individual countersignature.'}],
 correctOrder:['maintenance','issue','seal','return'],
 suspects:[
 {id:'pool',name:'Overnight facilities pool',role:'Recorded key credential',note:'The log names the pool credential, not the individual key carrier.'},
 {id:'cal',name:'Cal Rook',role:'Secure-tray desk clerk',note:'Desk duties do not prove he collected the key or packet.'},
 {id:'nora',name:'Nora Pell',role:'Key-control custodian',note:'Custody of the register does not prove physical possession of K-4.'}],
 motives:[
 {id:'gap',label:'Identify the missing individual key-and-packet custody link',note:'The issue and return entries use a pool credential; no individual key carrier or H-9 recipient is recorded.'},
 {id:'cal',label:'Prove Cal collected H-9',note:'The tray register contains no individual collection receipt.'},
 {id:'nora',label:'Prove Nora carried K-4',note:'Maintaining the register is not proof of physical key possession.'}],
 correctSuspect:'pool',correctMotive:'gap',
 truth:'K-4 was issued and returned under an overnight facilities pool credential. The duplicate-key seal was recorded intact, while the cabinet camera was in scheduled maintenance. No individual key carrier or H-9 packet recipient is identified.',
 proof:'The issue and return entries use a pool credential without an individual countersignature. The duplicate seal check establishes only the recorded seal condition, and the camera notice explains missing footage without identifying a person. None of these records names the packet recipient.',
 outcome:'The Bureau confirms that key access was recorded at pool level, not personal level. The next lead is the secure-tray contents inventory and the missing collection receipt, which may establish what left the tray and when.'
} as const;
export const CASE_018_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase018Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_018_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),accessTrailFiles:priorFiles.filter(r=>['case014','case015','case016','case017'].includes(r.caseId)).length};}
export function isCase018TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_018_GAME.correctOrder[i]);}
export function isCase018DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_018_GAME.correctSuspect&&motiveId===CASE_018_GAME.correctMotive;}
