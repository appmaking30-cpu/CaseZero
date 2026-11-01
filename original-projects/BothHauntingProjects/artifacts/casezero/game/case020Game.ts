import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_020_GAME = {
 id:'case020', title:'The Receiving End', subtitle:'A dispatch manifest points to a destination—but its acknowledgment does not name the person who accepted H-9.',
 location:'CONTINUITY OPERATIONS · DISPATCH RECORDS OFFICE',
 briefing:'The vault confirms H-9 was present, later absent, and never tied to a named collection receipt. The next review moves outside the vault: a dispatch manifest, a route docket, a receiving-station stamp and a reconciliation copy. Determine whether the records prove a destination, a delivery, or an individual recipient.',
 clues:[
 {id:'manifest',title:'Dispatch manifest copy',label:'Dispatch desk · 07:05',detail:'Manifest H-9 lists the East Archive intake as its destination and records a dispatch batch number. The copy has no named courier field completed.'},
 {id:'route',title:'Route docket',label:'Transit desk · 07:18',detail:'The route docket records the batch leaving the central dispatch desk for the East Archive route. It is a batch movement record, not a person-level handoff receipt.'},
 {id:'stamp',title:'Receiving-station stamp',label:'East Archive · 08:02',detail:'The destination stamp confirms that the batch was processed at East Archive at 08:02. The stamp is a station mark; the receiving clerk field is blank.'},
 {id:'reconcile',title:'Dispatch reconciliation copy',label:'Records office · 08:30',detail:'The reconciliation copy matches the manifest batch number to the East Archive station stamp. It corroborates destination processing but does not supply the missing courier or receiving clerk identity.'}
 ],
 witnesses:[
 {id:'elena',name:'Elena Marr',role:'Dispatch manifest clerk',questions:[
 {id:'destination',prompt:'What destination is listed for H-9?',reply:'The East Archive intake, under the dispatch batch number.'},
 {id:'courier',prompt:'Does the manifest name a courier?',reply:'No. The courier field on this copy is blank.'}]},
 {id:'pavel',name:'Pavel Orin',role:'Transit route registrar',questions:[
 {id:'movement',prompt:'What does the route docket confirm?',reply:'That the batch left the central dispatch desk on the East Archive route. It is not a signed personal handoff.'},
 {id:'identity',prompt:'Can the docket identify who carried H-9?',reply:'No. It records the batch movement, not the individual carrier.'}]},
 {id:'sana',name:'Sana Vey',role:'Records reconciliation auditor',questions:[
 {id:'stamp',prompt:'What does the East Archive stamp prove?',reply:'That the batch was processed at that station at 08:02. The receiving clerk field is blank.'},
 {id:'match',prompt:'Does the matching batch number close the identity gap?',reply:'It links the dispatch copy to destination processing. It does not identify a courier or the receiving clerk.'}]}
 ],
 timelineEvents:[
 {id:'manifest',time:'07:05',title:'H-9 listed on dispatch manifest',detail:'The destination is entered; courier field remains blank.'},
 {id:'route',time:'07:18',title:'Batch leaves central dispatch desk',detail:'The route docket records the East Archive route.'},
 {id:'stamp',time:'08:02',title:'East Archive processes the batch',detail:'The station stamp is present; receiving clerk is not named.'},
 {id:'reconcile',time:'08:30',title:'Reconciliation matches batch records',detail:'The manifest and station stamp are linked by batch number.'}],
 correctOrder:['manifest','route','stamp','reconcile'],
 suspects:[
 {id:'elena',name:'Elena Marr',role:'Manifest clerk',note:'Preparing the dispatch copy does not prove she carried or received the packet.'},
 {id:'pavel',name:'Pavel Orin',role:'Route registrar',note:'Recording a route does not prove he was the courier.'},
 {id:'station',name:'East Archive intake',role:'Recorded destination',note:'The station stamp identifies destination processing, not an individual recipient.'}],
 motives:[
 {id:'gap',label:'Confirm destination processing while preserving the missing identity link',note:'The batch is routed to and stamped at East Archive, but neither courier nor receiving clerk is named.'},
 {id:'elena',label:'Prove Elena carried H-9',note:'The manifest clerk is not listed as courier.'},
 {id:'pavel',label:'Prove Pavel received H-9',note:'The route docket does not name him as carrier or recipient.'}],
 correctSuspect:'station',correctMotive:'gap',
 truth:'The manifest lists East Archive as H-9’s destination. The route docket records the batch leaving central dispatch, and the East Archive station stamp confirms processing at 08:02. The reconciliation copy links the batch records, but neither the courier nor receiving clerk is identified.',
 proof:'The destination, route and station stamp share a batch reference. The station stamp is not an individual signature, and the courier and receiving-clerk fields are blank. The records support destination processing, not personal custody.',
 outcome:'The Bureau establishes that the dispatch batch reached East Archive processing. The next lead is the intake-room shift roster and sealed correspondence register, which may show who was assigned to receive the batch without assuming assignment equals collection.'
} as const;
export const CASE_020_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase020Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_020_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),dispatchTrailFiles:priorFiles.filter(r=>['case018','case019'].includes(r.caseId)).length};}
export function isCase020TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_020_GAME.correctOrder[i]);}
export function isCase020DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_020_GAME.correctSuspect&&motiveId===CASE_020_GAME.correctMotive;}
