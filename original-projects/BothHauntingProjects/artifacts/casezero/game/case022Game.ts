import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_022_GAME = {
 id:'case022', title:'The Sealed Register', subtitle:'A sealed correspondence register may connect H-9 to archive custody—but a seal is not a person’s signature.',
 location:'EAST ARCHIVE · SEALED CORRESPONDENCE ROOM',
 briefing:'The intake roster establishes Desk C was assigned and staffed, but no clerk signed for H-9. The next file examines the sealed correspondence register, its opening-control sheet, a page-index copy and the seal inspection report. Determine whether the packet was entered into controlled archive records and whether the documents identify who handled it.',
 clues:[
 {id:'register',title:'Sealed correspondence register',label:'Archive vault · 08:50',detail:'The register lists batch H-9 in the East Archive intake sequence under entry E-44. The entry records the batch reference and compartment, but the receiving-person field is blank.'},
 {id:'control',title:'Register opening-control sheet',label:'Archive control · 08:42',detail:'The control sheet records the register being released to the records room under the archive control group. It is a group-level release, not an individual sign-out for H-9.'},
 {id:'index',title:'Page-index carbon copy',label:'Records desk · 09:05',detail:'The carbon index repeats entry E-44 and the H-9 batch reference. It corroborates that the register entry was copied, but it does not add a named receiver or a separate packet receipt.'},
 {id:'seal',title:'Seal inspection report',label:'Archive security · 09:12',detail:'The inspection report records the register seal intact at the start of review. It supports the integrity of the register at inspection, but cannot establish who entered the earlier record or handled the packet.'}
 ],
 witnesses:[
 {id:'nora',name:'Nora Pell',role:'Archive register custodian',questions:[
 {id:'entry',prompt:'What does entry E-44 record?',reply:'It lists batch H-9 in the East Archive intake sequence. The receiving-person field is blank.'},
 {id:'receipt',prompt:'Is E-44 a personal receipt?',reply:'No. It is a register entry. It does not carry a named recipient signature.'}]},
 {id:'elias',name:'Elias Marr',role:'Archive control officer',questions:[
 {id:'release',prompt:'Who is named on the opening-control sheet?',reply:'The archive control group is recorded. The sheet does not name an individual H-9 handler.'},
 {id:'seal',prompt:'Does the intact seal identify who made the entry?',reply:'No. It confirms the register seal condition at inspection, not the identity of an earlier handler.'}]},
 {id:'sana',name:'Sana Vey',role:'Records reconciliation auditor',questions:[
 {id:'copy',prompt:'What does the carbon index corroborate?',reply:'It repeats entry E-44 and the H-9 batch reference.'},
 {id:'identity',prompt:'Does the copied entry close the receiver gap?',reply:'No. The same blank receiving-person field is carried forward. A copied record is not a personal receipt.'}]}
 ],
 timelineEvents:[
 {id:'control',time:'08:42',title:'Register released under archive control',detail:'The control group is recorded, not an individual handler.'},
 {id:'register',time:'08:50',title:'H-9 entered as E-44',detail:'The receiving-person field remains blank.'},
 {id:'index',time:'09:05',title:'Page-index carbon prepared',detail:'The carbon repeats the same entry reference.'},
 {id:'seal',time:'09:12',title:'Register seal inspected',detail:'The seal is intact at inspection.'}],
 correctOrder:['control','register','index','seal'],
 suspects:[
 {id:'entry',name:'Register entry E-44',role:'Recorded archive entry',note:'The entry links H-9 to the register but does not name an individual receiver.'},
 {id:'nora',name:'Nora Pell',role:'Register custodian',note:'Custody of the register does not prove personal handling of H-9.'},
 {id:'elias',name:'Elias Marr',role:'Archive control officer',note:'Group-level register release does not prove Elias personally received the packet.'}],
 motives:[
 {id:'record',label:'Confirm H-9 was entered into the controlled register while preserving the identity gap',note:'Entry E-44 and its carbon copy link H-9 to the register, but the receiving-person field is blank.'},
 {id:'nora',label:'Prove Nora personally received H-9',note:'The register custodian role is not a signed packet receipt.'},
 {id:'elias',label:'Prove Elias personally handled H-9',note:'The control sheet records a group release, not Elias as packet handler.'}],
 correctSuspect:'entry',correctMotive:'record',
 truth:'The sealed correspondence register records H-9 as entry E-44. The opening-control sheet records a group-level release, the carbon index repeats the entry, and the seal inspection finds the register intact. No record names the individual who received or entered the packet.',
 proof:'The register and carbon index share the E-44/H-9 reference. The receiving-person field is blank, and the control sheet names only the archive control group. The seal report verifies the register condition at inspection, not personal custody.',
 outcome:'The Bureau confirms H-9 appears in the controlled correspondence register, but the receiver remains unidentified. The next lead is the intake-room exception log and its page amendment history, which may reveal whether E-44 was changed after the initial entry.'
} as const;
export const CASE_022_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase022Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_022_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),archiveTrailFiles:priorFiles.filter(r=>['case020','case021'].includes(r.caseId)).length};}
export function isCase022TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_022_GAME.correctOrder[i]);}
export function isCase022DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_022_GAME.correctSuspect&&motiveId===CASE_022_GAME.correctMotive;}
