import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_019_GAME = {
 id:'case019', title:'The Missing Receipt', subtitle:'The tray inventory accounts for the packet seal—but not the person who collected it.',
 location:'CONTINUITY OPERATIONS VAULT · SECURE TRAY ROOM',
 briefing:'The key cabinet trail ends with a pool credential and no named carrier. The Bureau now has the secure-tray inventory, a seal condition sheet, a stock reconciliation and a delayed discrepancy notice. Determine what the records establish about H-9, and do not turn an inventory gap into an accusation.',
 clues:[
 {id:'inventory',title:'Pre-opening tray inventory',label:'Vault control · 02:08',detail:'The tray inventory lists packet H-9 in compartment 3 before the scheduled review. The inventory is signed by the control desk as a count, not as proof of who placed or later collected the packet.'},
 {id:'seal',title:'Compartment seal condition',label:'Vault control · 02:16',detail:'The compartment seal is recorded intact at the 02:16 check. The form contains no individual collection signature and does not establish whether the packet was removed before or after this check.'},
 {id:'recount',title:'Morning stock reconciliation',label:'Records office · 06:10',detail:'The morning count marks H-9 as not present in compartment 3. The entry confirms a discrepancy between the earlier inventory and the later count, but gives no removal time or named collector.'},
 {id:'notice',title:'Delayed discrepancy notice',label:'Audit queue · 06:42',detail:'The discrepancy notice was created after the morning count and routed to audit review. It records when the absence was reported, not when H-9 left the tray.'}
 ],
 witnesses:[
 {id:'mara',name:'Mara Venn',role:'Vault inventory clerk',questions:[
 {id:'count',prompt:'What did the 02:08 inventory establish?',reply:'H-9 was listed in compartment 3 at that count. It does not identify who placed it there.'},
 {id:'signature',prompt:'Does the inventory signature identify a collector?',reply:'No. It is the control desk count signature, not a collection receipt.'}]},
 {id:'oren',name:'Oren Pike',role:'Facilities and seal technician',questions:[
 {id:'seal',prompt:'What does the 02:16 seal check prove?',reply:'Only that the seal was recorded intact at that check. It does not name anyone or give us a removal time.'},
 {id:'access',prompt:'Can the seal sheet tell us who opened the tray?',reply:'No. There is no individual opening or collection field on this sheet.'}]},
 {id:'sana',name:'Sana Vey',role:'Audit records reviewer',questions:[
 {id:'recount',prompt:'When was H-9 first recorded as missing?',reply:'The morning reconciliation at 06:10 records it absent from compartment 3.'},
 {id:'notice',prompt:'Does the 06:42 notice timestamp the removal?',reply:'No. It timestamps the report after the count, not the event that caused the discrepancy.'}]}
 ],
 timelineEvents:[
 {id:'inventory',time:'02:08',title:'H-9 listed in compartment 3',detail:'The pre-opening inventory records the packet present.'},
 {id:'seal',time:'02:16',title:'Compartment seal recorded intact',detail:'The seal condition is checked and logged.'},
 {id:'recount',time:'06:10',title:'Morning count records H-9 absent',detail:'The later stock reconciliation identifies the discrepancy.'},
 {id:'notice',time:'06:42',title:'Discrepancy notice enters audit queue',detail:'The absence is reported for review.'}],
 correctOrder:['inventory','seal','recount','notice'],
 suspects:[
 {id:'mara',name:'Mara Venn',role:'Inventory clerk',note:'The count signature confirms a record was made, not that Mara collected the packet.'},
 {id:'oren',name:'Oren Pike',role:'Seal technician',note:'The seal check documents condition, not who handled H-9.'},
 {id:'audit',name:'Audit control desk',role:'Discrepancy recipient',note:'The desk received the report after the morning count; receipt is not removal.'}],
 motives:[
 {id:'gap',label:'Confirm the inventory discrepancy without inventing a collector',note:'H-9 is present in the earlier count and absent in the later count. The collection event and individual remain undocumented.'},
 {id:'mara',label:'Prove Mara removed H-9',note:'The inventory signature is not a collection receipt.'},
 {id:'oren',label:'Prove Oren removed H-9',note:'A seal-condition check does not identify a packet carrier.'}],
 correctSuspect:'audit',correctMotive:'gap',
 truth:'H-9 was recorded in compartment 3 at 02:08 and its seal was recorded intact at 02:16. The 06:10 reconciliation later found it absent, and the 06:42 notice reported the discrepancy. These records establish a gap between two counts, not who removed the packet or when.',
 proof:'The pre-opening inventory and morning reconciliation are separate time-stamped counts. The seal sheet records condition only, while the audit notice follows the later count. No individual collection receipt or removal timestamp appears in the packet.',
 outcome:'The Bureau confirms the missing H-9 inventory trail but cannot identify a collector. The next lead is the dispatch manifest and destination acknowledgment: if the packet moved through an authorized channel, a receiving record may survive outside the vault.'
} as const;
export const CASE_019_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase019Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_019_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),vaultTrailFiles:priorFiles.filter(r=>['case017','case018'].includes(r.caseId)).length};}
export function isCase019TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_019_GAME.correctOrder[i]);}
export function isCase019DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_019_GAME.correctSuspect&&motiveId===CASE_019_GAME.correctMotive;}
