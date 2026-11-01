import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_024_GAME = {
 id:'case024', title:'The First Copy', subtitle:'Trace the earliest surviving H-9 transfer copy without mistaking a dispatch tally for a signed handover.',
 location:'CENTRAL DISPATCH · TRANSFER RECORDS',
 briefing:'The East Archive exception remains unresolved. The Bureau now traces H-9 back to the first surviving transfer packet: dispatch batch tally, archive-bound copy, transfer docket and duplicate-control sheet. Establish which document first carries the blank receiver field and whether any surviving copy contains a personal handover.',
 clues:[
 {id:'tally',title:'Dispatch batch tally',label:'Central dispatch · 07:05',detail:'The tally lists H-9 in outgoing batch 6B and gives East Archive as destination. Its carrier and receiving fields are both blank.'},
 {id:'copy',title:'Archive-bound transfer copy',label:'Dispatch copy desk · 07:12',detail:'The archive-bound copy repeats H-9 and destination East Archive. The receiving-person field is already blank on this earliest surviving copy.'},
 {id:'docket',title:'Transfer docket',label:'Transit records · 07:18',detail:'The docket records batch 6B leaving the central dispatch desk. It contains no named carrier and no individual archive recipient.'},
 {id:'duplicate',title:'Duplicate-control sheet',label:'Records control · 07:24',detail:'The duplicate-control sheet confirms the archive-bound copy was reproduced from the dispatch record set. It records copy control, not a personal transfer or later alteration.'}
 ],
 witnesses:[
 {id:'elena',name:'Elena Marr',role:'Dispatch tally clerk',questions:[
 {id:'batch',prompt:'What does the 07:05 tally establish?',reply:'H-9 was listed in outgoing batch 6B for East Archive. The carrier and receiving fields are blank.'},
 {id:'carrier',prompt:'Does the tally name a carrier?',reply:'No. There is no named carrier in the surviving tally.'}]},
 {id:'pavel',name:'Pavel Orin',role:'Transit docket registrar',questions:[
 {id:'departure',prompt:'What does the transfer docket prove?',reply:'It records batch 6B leaving the central dispatch desk at 07:18.'},
 {id:'custody',prompt:'Does it identify the individual carrying H-9?',reply:'No. The docket has no named carrier or archive recipient.'}]},
 {id:'sana',name:'Sana Vey',role:'Records reconciliation auditor',questions:[
 {id:'copy',prompt:'How early does the blank receiver field appear?',reply:'It is already blank on the 07:12 archive-bound copy, the earliest surviving copy in this packet.'},
 {id:'duplicate',prompt:'Does duplicate control prove a later edit?',reply:'No. It confirms the copy was reproduced from the record set; it does not show a later change or identify a person.'}]}
 ],
 timelineEvents:[
 {id:'tally',time:'07:05',title:'Dispatch batch tally created',detail:'H-9 is listed for East Archive; carrier and receiver are blank.'},
 {id:'copy',time:'07:12',title:'Archive-bound copy prepared',detail:'The receiver field is already blank on the earliest surviving copy.'},
 {id:'docket',time:'07:18',title:'Batch 6B departure recorded',detail:'The docket has no named carrier.'},
 {id:'duplicate',time:'07:24',title:'Duplicate control completed',detail:'Copy reproduction is confirmed, not personal custody.'}],
 correctOrder:['tally','copy','docket','duplicate'],
 suspects:[
 {id:'copy',name:'07:12 · Archive-bound copy',role:'Earliest surviving blank field',note:'The copy establishes when the blank is visible in surviving records, not who left it blank.'},
 {id:'elena',name:'Elena Marr',role:'Dispatch tally clerk',note:'Preparing a tally does not prove Elena personally handled or omitted H-9’s recipient.'},
 {id:'pavel',name:'Pavel Orin',role:'Transit docket registrar',note:'Registering batch departure does not prove Pavel carried the packet.'}],
 motives:[
 {id:'earliest',label:'Locate the blank receiver field in the earliest surviving copy without assigning a person',note:'The 07:12 copy already has the blank, but no personal handover is recorded.'},
 {id:'elena',label:'Prove Elena left the receiver field blank',note:'No named author or attributable edit is present.'},
 {id:'pavel',label:'Prove Pavel carried H-9 to East Archive',note:'The departure docket does not name a carrier.'}],
 correctSuspect:'copy',correctMotive:'earliest',
 truth:'H-9 appears in outgoing batch 6B for East Archive. The earliest surviving archive-bound copy, prepared at 07:12, already has a blank receiver field. The 07:18 docket records batch departure without naming a carrier, and duplicate control confirms reproduction only. The evidence locates the earliest surviving blank; it does not identify who created it.',
 proof:'The 07:05 tally and 07:12 copy establish the sequence. The blank is visible on the earliest surviving copy. Neither the docket nor duplicate-control sheet supplies an individual carrier or recipient.',
 outcome:'The blank receiver field predates the East Archive register entry in the surviving record chain. The next lead is the dispatch copy-room access and print queue, which may establish who prepared the archive-bound copy without assuming that preparation proves authorship of its contents.'
} as const;
export const CASE_024_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase024Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_024_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),dispatchTrailFiles:priorFiles.filter(r=>['case022','case023'].includes(r.caseId)).length};}
export function isCase024TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_024_GAME.correctOrder[i]);}
export function isCase024DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_024_GAME.correctSuspect&&motiveId===CASE_024_GAME.correctMotive;}
