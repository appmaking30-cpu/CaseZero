import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_014_GAME = {
 id:'case014', title:"The Reader's Exception", subtitle:'A system exception explains an event. It does not identify the person behind it.',
 location:'CONTINUITY OPERATIONS VAULT · SOUTH VESTIBULE S-04',
 briefing:'Case 013 established Ivo Dane as the recorded borrower of badge B-17 during the C-4 access window. The reader accepted B-17 at 01:27, but the corridor camera was unavailable. The Bureau has the reader maintenance and exception packet. Determine whether S-04 recorded an ordinary badge presentation or a local fallback decision, without confusing the system path with the person who used it.',
 clues:[
 {id:'config',title:'Reader configuration snapshot',label:'Configuration audit · 00:55',detail:'S-04 was configured to accept a valid badge read when the controller was online. The snapshot shows ordinary mode as the default; it does not establish which path was used at 01:27.'},
 {id:'health',title:'Controller health report',label:'System status · 01:18',detail:'The controller reports intermittent communication with the central access service. Local decisions were permitted under the approved fallback policy while the connection was unstable.'},
 {id:'exception',title:'Fallback decision entry',label:'Controller event · 01:27',detail:'The event packet records a local fallback decision for badge B-17 at S-04. The controller accepted the credential while central verification was unavailable. This establishes the system path, not the identity of the person presenting the badge.'},
 {id:'reconcile',title:'Central reconciliation receipt',label:'Audit receipt · 01:44',detail:'When the connection recovered, the central service imported the local event and marked it reconciled. Reconciliation confirms that the controller event was preserved, not that a person was visually identified or the terminal session attributed.'}
 ],
 witnesses:[
 {id:'talia',name:'Talia Moss',role:'Access systems engineer',questions:[
 {id:'fallback',prompt:'What did the fallback decision do?',reply:'It let S-04 make a local access decision while the central service was unavailable. The entry records the fallback path and badge ID, not a person’s identity.'},
 {id:'normal',prompt:'Does the configuration snapshot prove a normal read occurred?',reply:'No. It describes the default configuration at 00:55. The 01:27 event packet is the record that says which path was used for that event.'}]},
 {id:'dev',name:'Dev Arlen',role:'Central access auditor',questions:[
 {id:'reconcile',prompt:'What does reconciliation confirm?',reply:'It confirms the locally stored event reached the central audit service after connectivity returned. It does not turn a badge event into a visual identification.'},
 {id:'identity',prompt:'Can central reconciliation identify the badge carrier?',reply:'No. It preserves the controller’s event fields. There is no face match or individual terminal login in this packet.'}]},
 {id:'sana',name:'Sana Rell',role:'Security shift technician',questions:[
 {id:'health',prompt:'Why was local fallback available?',reply:'The controller health report shows intermittent communication. The approved fallback policy allowed a local decision during the outage window.'},
 {id:'session',prompt:'Does this prove who opened C-4-OPS-2?',reply:'No. It explains how the door reader accepted the badge. The shared terminal session remains a separate event with no personal login.'}]}
 ],
 timelineEvents:[
 {id:'config',time:'00:55',title:'S-04 configuration snapshot captured',detail:'The reader is configured for ordinary badge validation by default.'},
 {id:'health',time:'01:18',title:'Controller reports unstable central link',detail:'The approved fallback policy becomes relevant.'},
 {id:'exception',time:'01:27',title:'S-04 records a local fallback decision',detail:'Badge B-17 is accepted while central verification is unavailable.'},
 {id:'reconcile',time:'01:44',title:'Central service reconciles local event',detail:'The stored controller event is imported into the central audit.'}],
 correctOrder:['config','health','exception','reconcile'],
 suspects:[
 {id:'fallback',name:'Local fallback path',role:'Recorded reader decision',note:'The event packet explicitly records local fallback for B-17 at 01:27.'},
 {id:'normal',name:'Ordinary central validation',role:'Default configuration',note:'Ordinary validation is the default configuration, but central verification was unavailable at the event time.'},
 {id:'override',name:'Manual security override',role:'Not supported by this packet',note:'The records show an automatic local fallback decision, not a manually entered override.'}],
 motives:[
 {id:'system',label:'Confirm S-04 accepted B-17 through local fallback',note:'The event packet records the fallback decision during the central-link disruption.'},
 {id:'ivo',label:'Prove Ivo personally presented B-17',note:'The system packet records a badge ID and decision path, not a person.'},
 {id:'terminal',label:'Prove the badge carrier opened the terminal session',note:'The door event and pooled terminal session are separate records and do not identify a shared operator.'}],
 correctSuspect:'fallback',correctMotive:'system',
 truth:'S-04 accepted badge B-17 through a local fallback decision at 01:27 while central verification was unavailable. The event was reconciled into the central audit at 01:44. This explains the reader’s system path. It does not identify the person who presented B-17 or who opened C-4-OPS-2.',
 proof:'The controller health report establishes intermittent central connectivity before the entry. The event packet explicitly records a local fallback decision at 01:27, and the reconciliation receipt shows that event was imported later. The configuration snapshot describes the default mode but cannot override the event-specific record.',
 outcome:'The Bureau records a confirmed local fallback decision at S-04, not a manual override or ordinary central validation. The identity of the badge carrier and C-4 terminal operator remains unresolved. The next lead is the controller’s signed maintenance work order and technician handoff log, to establish who was authorized to configure fallback during the outage.'
} as const;
export const CASE_014_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase014Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_014_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),accessTrailFiles:priorFiles.filter(r=>['case012','case013'].includes(r.caseId)).length};}
export function isCase014TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_014_GAME.correctOrder[i]);}
export function isCase014DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_014_GAME.correctSuspect&&motiveId===CASE_014_GAME.correctMotive;}
