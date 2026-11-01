import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_021_GAME = {
 id:'case021', title:'The Intake Roster', subtitle:'A shift roster names the desk assigned to H-9—but assignment is not a signed receipt.',
 location:'EAST ARCHIVE · INTAKE ROOM',
 briefing:'Case 020 established that dispatch batch H-9 reached East Archive processing, but the receiving-clerk field was blank. The next file contains the intake-room shift roster, desk allocation sheet, relief-change note and a staffing reconciliation. Determine what the roster establishes—and what it cannot establish about who physically accepted the packet.',
 clues:[
 {id:'roster',title:'Intake-room shift roster',label:'East Archive · 07:45',detail:'The roster assigns the morning intake window to Desk C, staffed by the East Archive intake team. It lists a team assignment, not a named person accepting batch H-9.'},
 {id:'allocation',title:'Desk allocation sheet',label:'Intake supervisor · 07:52',detail:'The allocation sheet places correspondence batch processing at Desk C for the 08:00 intake window. It confirms where the work was assigned, not which clerk handled a specific packet.'},
 {id:'relief',title:'Relief-change note',label:'Staff office · 08:10',detail:'A relief note records a shift overlap between the opening clerk and the incoming clerk. The handover is recorded at team level and contains no H-9 packet number or personal receipt.'},
 {id:'reconcile',title:'Staffing reconciliation',label:'Archive administration · 08:35',detail:'The reconciliation matches Desk C to the morning intake roster and confirms the desk was staffed. It does not link H-9 to a named clerk or prove that a particular person collected it.'}
 ],
 witnesses:[
 {id:'mira',name:'Mira Sol',role:'East Archive shift coordinator',questions:[
 {id:'desk',prompt:'Which desk was assigned the morning intake?',reply:'Desk C was assigned the 08:00 correspondence intake window.'},
 {id:'person',prompt:'Does the roster name the person who accepted H-9?',reply:'No. It assigns a desk and team, not an individual packet recipient.'}]},
 {id:'talen',name:'Talen Voss',role:'Intake desk clerk',questions:[
 {id:'allocation',prompt:'What does the allocation sheet establish?',reply:'That correspondence processing was assigned to Desk C. It is not a receipt for a particular packet.'},
 {id:'handover',prompt:'Does the relief note document an H-9 handover?',reply:'It documents a shift overlap, but it has no H-9 reference and no personal packet signature.'}]},
 {id:'sana',name:'Sana Vey',role:'Records reconciliation auditor',questions:[
 {id:'staffed',prompt:'Was Desk C staffed during the intake window?',reply:'The staffing reconciliation confirms the desk assignment and coverage.'},
 {id:'limit',prompt:'Can staffing records identify H-9’s receiver?',reply:'No. They establish assignment and coverage, not a named collection or personal custody.'}]}
 ],
 timelineEvents:[
 {id:'roster',time:'07:45',title:'Morning intake roster issued',detail:'Desk C and the intake team are assigned.'},
 {id:'allocation',time:'07:52',title:'Desk C allocation recorded',detail:'Correspondence processing is assigned to the desk.'},
 {id:'relief',time:'08:10',title:'Shift relief overlap recorded',detail:'The team-level handover has no H-9 receipt.'},
 {id:'reconcile',time:'08:35',title:'Staffing reconciliation completed',detail:'Desk coverage is confirmed without naming a packet recipient.'}],
 correctOrder:['roster','allocation','relief','reconcile'],
 suspects:[
 {id:'desk',name:'East Archive · Desk C',role:'Assigned intake desk',note:'The roster identifies the desk assigned to intake, not the person who accepted H-9.'},
 {id:'mira',name:'Mira Sol',role:'Shift coordinator',note:'Coordinating the roster does not prove personal receipt of the packet.'},
 {id:'talen',name:'Talen Voss',role:'Intake clerk',note:'Being listed among intake staff does not establish a signed H-9 handover.'}],
 motives:[
 {id:'assignment',label:'Establish the assigned intake desk while preserving the identity gap',note:'Desk C was assigned and staffed, but no record ties H-9 to a named clerk.'},
 {id:'mira',label:'Prove Mira personally accepted H-9',note:'The roster does not record personal packet custody.'},
 {id:'talen',label:'Prove Talen personally accepted H-9',note:'The allocation and relief records do not contain a signed H-9 receipt.'}],
 correctSuspect:'desk',correctMotive:'assignment',
 truth:'The East Archive roster and allocation sheet assign the morning correspondence intake to Desk C. The relief note records a team-level overlap, and staffing reconciliation confirms coverage. None of these records names the person who accepted H-9.',
 proof:'The roster, allocation and reconciliation agree on Desk C. The relief note has no H-9 reference, and no document contains a personal receipt. These records establish assignment and staffing—not individual collection.',
 outcome:'The Bureau can identify the assigned intake desk, but not H-9’s receiver. The next lead is the sealed correspondence register and its packet-level entry, which may show whether H-9 was logged into archive custody.'
} as const;
export const CASE_021_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase021Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_021_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),intakeTrailFiles:priorFiles.filter(r=>['case019','case020'].includes(r.caseId)).length};}
export function isCase021TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_021_GAME.correctOrder[i]);}
export function isCase021DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_021_GAME.correctSuspect&&motiveId===CASE_021_GAME.correctMotive;}
