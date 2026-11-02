import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_042_GAME = {
 id:'case042', title:'The Name on the Carbon',
 subtitle:'RA-17 is finally open. The duplicate contains a name—but does that prove who accepted the handover?',
 location:'RECORDS ANNEX · CONTROLLED ARCHIVE BAY',
 briefing:'A two-person retrieval team has opened container RA-17 under a recorded seal check. Inside is the missing duplicate handover carbon. A recipient name is visible in the acknowledgement field, but the record alone cannot authenticate the handwriting. Establish the retrieval sequence, compare the two copies and determine exactly what the evidence supports.',
 clues:[
 {id:'authorization',title:'Controlled retrieval authorization',label:'Archive control · 10:02',detail:'The retrieval order names two authorized custodians and requires a witnessed seal inspection before opening RA-17. Both custodians signed. It establishes the approved procedure, not what was found inside.'},
 {id:'sealLog',title:'RA-17 seal inspection log',label:'Archive bay · 10:14',detail:'The seal number matches the archive index. Both custodians record it intact before opening. The log supports an unbroken recorded seal at inspection; it does not establish who originally placed the duplicate in the container.'},
 {id:'openingRecord',title:'Dual-custody opening record',label:'Archive bay · 10:18',detail:'Two custodians record the opening together. The packet inventory lists one handover duplicate and its sleeve. No additional page or loose insert is recorded.'},
 {id:'comparison',title:'Carbon comparison sheet',label:'Records audit · 10:31',detail:'The retrieved duplicate contains the handwritten name “R. Vale” in the recipient acknowledgement field at 09:03. The dispatch carbon retained from the same packet has a blank field. No authenticated signature specimen has yet been checked, so authorship remains unverified.'}
 ],
 witnesses:[
 {id:'mara',name:'Mara Venn',role:'Dispatch supervisor',questions:[
 {id:'name',prompt:'Does the name R. Vale prove Rowan Vale signed?',reply:'No. It proves only that those characters appear in the field. We need a reliable comparison or independent authentication before attributing the handwriting.'},
 {id:'carbon',prompt:'Why can the two carbon copies differ?',reply:'The retained dispatch copy may not capture every mark in the duplicate set. The comparison establishes a difference between copies, not who caused it.'}]},
 {id:'sana',name:'Sana Vey',role:'Records reconciliation auditor',questions:[
 {id:'specimen',prompt:'What would authenticate the handwriting?',reply:'A verified contemporaneous specimen or an independent signed acknowledgement tied to the same handover. A matching name alone is insufficient.'},
 {id:'time',prompt:'What does the 09:03 entry establish?',reply:'It is the time written beside the acknowledgement on the duplicate. The later retrieval records preserve when we found it, not when the name was actually written.'}]},
 {id:'elias',name:'Elias Rook',role:'Records Annex custodian',questions:[
 {id:'seal',prompt:'Was the archive seal recorded as intact?',reply:'Yes. Both custodians recorded the matching seal as intact before opening. That supports the retrieval chain from inspection onward.'},
 {id:'custody',prompt:'Does the opening record identify the original writer?',reply:'No. It identifies the two people who opened the container today. It says nothing about who wrote the acknowledgement earlier.'}]}
 ],
 timelineEvents:[
 {id:'authorization',time:'10:02',title:'Retrieval authorized for two custodians',detail:'The order requires a witnessed seal inspection.'},
 {id:'sealLog',time:'10:14',title:'RA-17 seal checked and recorded intact',detail:'Both custodians record the matching seal number.'},
 {id:'openingRecord',time:'10:18',title:'Container opened under dual custody',detail:'The inventory lists the handover duplicate and sleeve.'},
 {id:'comparison',time:'10:31',title:'Duplicate compared with dispatch carbon',detail:'The duplicate shows “R. Vale”; the retained carbon field is blank.'}
 ],
 correctOrder:['authorization','sealLog','openingRecord','comparison'],
 suspects:[
 {id:'unknown',name:'Unverified acknowledgement writer',role:'Name visible · authorship unproven',note:'The duplicate contains “R. Vale”, but the available evidence does not authenticate the handwriting or prove who made the entry.'},
 {id:'rowan',name:'Rowan Vale',role:'Name written on duplicate · not authenticated',note:'The name is present, but no verified specimen or independent confirmation ties Rowan to the handwriting.'},
 {id:'elias',name:'Elias Rook',role:'Present at archive retrieval',note:'His role in the later controlled opening does not connect him to the original 09:03 acknowledgement.'}
 ],
 motives:[
 {id:'identity',label:'The duplicate records “R. Vale” at 09:03, but the writer’s identity remains unverified',note:'The comparison establishes the name and time written on the duplicate, while the missing authenticated specimen prevents attribution.'},
 {id:'forgery',label:'Rowan Vale forged the acknowledgement',note:'No handwriting authentication or evidence of deliberate falsification is available.'},
 {id:'custody',label:'The archive custodians altered the duplicate during retrieval',note:'The seal was recorded intact before a dual-custody opening, and no evidence supports alteration during retrieval.'}
 ],
 correctSuspect:'unknown',correctMotive:'identity',
 truth:'The RA-17 duplicate contains the handwritten name “R. Vale” with a 09:03 time. The retained dispatch carbon has a blank acknowledgement field. The duplicate was retrieved under a recorded dual-custody procedure, but no authenticated specimen establishes who wrote the name.',
 proof:'The retrieval authorization, matching intact-seal log, dual-custody opening record and 10:31 comparison sheet establish the retrieval sequence and the difference between the two copies. The comparison sheet records “R. Vale” at 09:03 but explicitly notes that handwriting authentication remains outstanding.',
 outcome:'The duplicate changes the investigation: a recipient name was entered on one copy. It does not yet prove Rowan Vale wrote it or personally accepted the handover. The next lead is the authenticated handover specimen register and any independent 09:03 desk record.'
} as const;

export const CASE_042_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase042Carryover(archive:InvestigationArchive){
 const priorFiles=getPriorCaseMemory(archive,CASE_042_GAME.id);
 return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),retrievalTrailFiles:priorFiles.filter(r=>['case041','case040','case039','case038'].includes(r.caseId)).length};
}
export function isCase042TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_042_GAME.correctOrder[i]);}
export function isCase042DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId==='unknown'&&motiveId==='identity';}
