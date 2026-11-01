import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_023_GAME = {
 id:'case023', title:'The Empty Amendment', subtitle:'An exception log records a blank amendment slot—but a missing entry is not proof of who changed the register.',
 location:'EAST ARCHIVE · RECORDS CONTROL OFFICE',
 briefing:'Case 022 confirmed H-9 appears in the sealed correspondence register as E-44, but the receiving-person field was blank. The new file contains the exception log, amendment request index, page-image comparison and audit closure note. Establish whether an amendment was formally opened, whether the register page changed, and what remains unknown about the person responsible.',
 clues:[
 {id:'exception',title:'Register exception log',label:'Records control · 09:20',detail:'The exception log lists E-44 for a missing receiving-person field. The status is REVIEW-OPEN, with no named requester or handler in the personal attribution field.'},
 {id:'request',title:'Amendment request index',label:'Records control · 09:28',detail:'The request index contains a reserved amendment slot A-12 linked to E-44. The requester field is blank and the slot is marked NOT SUBMITTED. A reserved slot is not proof that an amendment was made.'},
 {id:'image',title:'Register page-image comparison',label:'Archive imaging · 09:40',detail:'The 08:50 page image and the 09:35 comparison show the same E-44 text and the same blank receiving-person field. No visible amendment appears between those captures.'},
 {id:'closure',title:'Audit closure note',label:'Internal audit · 10:05',detail:'The audit closes the exception as UNRESOLVED because no signed amendment request or attributable page change was found. The note does not establish why the original receiver field was blank.'}
 ],
 witnesses:[
 {id:'nora',name:'Nora Pell',role:'Archive register custodian',questions:[
 {id:'exception',prompt:'Why was E-44 listed in the exception log?',reply:'The receiving-person field was blank, so the entry was flagged for review.'},
 {id:'change',prompt:'Does the exception log prove the register was altered?',reply:'No. It records a review issue, not a completed amendment.'}]},
 {id:'elias',name:'Elias Marr',role:'Records control officer',questions:[
 {id:'slot',prompt:'What does reserved slot A-12 mean?',reply:'It is a place held for a possible amendment. It is marked not submitted.'},
 {id:'requester',prompt:'Is there a named requester for A-12?',reply:'No. The requester field is blank.'}]},
 {id:'sana',name:'Sana Vey',role:'Internal audit reviewer',questions:[
 {id:'compare',prompt:'What changed between the two page images?',reply:'The E-44 text and blank receiver field are the same in both captures.'},
 {id:'close',prompt:'Why was the exception closed?',reply:'It was closed unresolved because no signed request or attributable page change was found.'}]}
 ],
 timelineEvents:[
 {id:'exception',time:'09:20',title:'E-44 exception opened',detail:'The blank receiver field is flagged for review.'},
 {id:'request',time:'09:28',title:'Amendment slot A-12 reserved',detail:'The slot is not submitted and has no named requester.'},
 {id:'image',time:'09:40',title:'Page images compared',detail:'The E-44 entry remains unchanged between captures.'},
 {id:'closure',time:'10:05',title:'Audit closes exception unresolved',detail:'No signed amendment or attributable change is found.'}],
 correctOrder:['exception','request','image','closure'],
 suspects:[
 {id:'unchanged',name:'E-44 · Unchanged entry',role:'Register record state',note:'The available images show the same entry and blank field at both capture times.'},
 {id:'nora',name:'Nora Pell',role:'Register custodian',note:'Custodian status does not prove that Nora requested or made an amendment.'},
 {id:'elias',name:'Elias Marr',role:'Records control officer',note:'A reserved slot does not identify Elias as requester or editor.'}],
 motives:[
 {id:'unresolved',label:'Confirm the exception remained unresolved with no evidenced page amendment',note:'The log flags a blank field, the request was not submitted, and the page images match.'},
 {id:'nora',label:'Prove Nora altered the register',note:'No attributable amendment or signed request links Nora to a change.'},
 {id:'elias',label:'Prove Elias submitted amendment A-12',note:'The slot is marked not submitted and has no named requester.'}],
 correctSuspect:'unchanged',correctMotive:'unresolved',
 truth:'E-44 was flagged because its receiving-person field was blank. A-12 was reserved but never submitted, and the compared page images show no visible change. Audit therefore closed the exception unresolved. The available evidence does not identify who originally left the field blank or whether the omission was deliberate.',
 proof:'The exception log establishes a review flag, the request index shows A-12 was not submitted, and both page images preserve the same E-44 text. The audit note confirms no signed amendment or attributable change.',
 outcome:'The register amendment theory is not supported by the available records. The next lead is the original intake-room exception packet and its dispatch-to-archive transfer reference, which may reveal where the blank receiver field first entered the record chain.'
} as const;
export const CASE_023_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase023Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_023_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),registerTrailFiles:priorFiles.filter(r=>['case021','case022'].includes(r.caseId)).length};}
export function isCase023TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_023_GAME.correctOrder[i]);}
export function isCase023DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_023_GAME.correctSuspect&&motiveId===CASE_023_GAME.correctMotive;}
