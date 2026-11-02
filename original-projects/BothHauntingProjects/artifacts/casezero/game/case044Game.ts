import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_044_GAME = {
 id:'case044', title:'The Badge Without a Name',
 subtitle:'The door opened at 09:02. The log records a credential, not the person who carried it.',
 location:'CENTRAL DISPATCH · ACCESS CONTROL OFFICE',
 briefing:'The handwriting comparison left one question: who could reach the dispatch writing surface at 09:03? A newly recovered access-control extract records a badge entering the dispatch corridor one minute earlier. The badge was issued through a shared shift pool. Establish what the access record proves without turning a credential into a person.',
 clues:[
  {id:'readerExtract',title:'Dispatch corridor reader extract',label:'Access control · 09:02–09:07',detail:'The authenticated reader log records badge token D-17 entering the dispatch corridor at 09:02 and leaving at 09:07. The reader clock was synchronized and its audit hash matches the daily control copy. It establishes that the token passed the door; it does not identify the person carrying it or prove that the carrier approached the writing desk.'},
  {id:'poolRegister',title:'Shared badge pool register',label:'Security desk · Shift issue',detail:'D-17 belongs to a shared dispatch relief pool. The register assigns the token to the shift desk, not a named employee. A daily checkout line is incomplete where the receiving initials should appear. The pool register proves the credential was available to the shift, not who held it at 09:02.'},
  {id:'doorDiagram',title:'Corridor access boundary plan',label:'Facilities · Current floor plan',detail:'The reader controls the corridor entrance and two storage alcoves. The dispatch writing surface is inside the corridor but is not visible from the reader. A person could enter the corridor without approaching the desk; the plan cannot place the badge carrier at the questioned document.'},
  {id:'maintenanceCopy',title:'Reader maintenance and audit copy',label:'Systems audit · 12:10',detail:'The controller was not in maintenance mode during the event. Its signed daily copy matches the live event sequence, with no deletion or clock-reset marker. This supports the reliability of the token timestamps, but the system has no biometric or named-user confirmation for D-17.'}
 ],
 witnesses:[
  {id:'security',name:'Niko Aram',role:'Access-control technician',questions:[
   {id:'token',prompt:'What does the D-17 reader event establish?',reply:'It establishes that the credential passed the corridor reader at 09:02 and left at 09:07. It does not tell us who carried it or where inside the corridor they went.'},
   {id:'tamper',prompt:'Was the reader log altered or in maintenance mode?',reply:'No. The signed daily copy matches the controller record, and there is no maintenance or clock-reset marker for that interval.'}]},
  {id:'mara',name:'Mara Venn',role:'Dispatch supervisor',questions:[
   {id:'pool',prompt:'Who was assigned badge D-17?',reply:'It was assigned to the shared relief pool at the shift desk, not to one named employee. The checkout initials are missing from the copy we recovered.'},
   {id:'desk',prompt:'Does corridor entry prove someone reached the writing surface?',reply:'No. The corridor includes storage alcoves. The door reader cannot show which room or desk the carrier visited.'}]},
  {id:'sana',name:'Sana Vey',role:'Records reconciliation auditor',questions:[
   {id:'checkout',prompt:'Can the incomplete checkout line identify the carrier?',reply:'Not from this copy. The receiving initials are absent, and no independent handover record is attached.'},
   {id:'next',prompt:'What would connect the badge to a person?',reply:'A separately authenticated handover record or a witness who can place a named person with D-17 during the five-minute window. We would still need evidence that the person reached the document.'}]}
 ],
 timelineEvents:[
  {id:'issue',time:'07:50',title:'D-17 assigned to shared relief pool',detail:'The shift register assigns the token to the desk, not a person.'},
  {id:'enter',time:'09:02',title:'D-17 enters dispatch corridor',detail:'The synchronized reader records the token at the corridor door.'},
  {id:'exit',time:'09:07',title:'D-17 leaves dispatch corridor',detail:'The signed daily copy confirms the exit event.'},
  {id:'audit',time:'12:10',title:'Signed controller copy reconciled',detail:'The audit confirms the reader sequence and its limitations.'}
 ],
 correctOrder:['issue','enter','exit','audit'],
 suspects:[
  {id:'unknown',name:'Unidentified badge carrier',role:'Credential recorded · person not established',note:'D-17 passed the reader, but the shared pool and missing checkout initials prevent personal attribution.'},
  {id:'runner',name:'Dispatch relief runner',role:'Pool access possible · individual handover missing',note:'The runner role may use shared credentials, but no record places a named runner with D-17.'},
  {id:'mara',name:'Mara Venn',role:'Shift supervisor · no personal token match',note:'Her supervisory role does not establish that she carried D-17 or approached the document.'}
 ],
 motives:[
  {id:'token',label:'The log verifies a shared badge entered the corridor, not who carried it or reached the desk',note:'The reader timestamps are reliable, but the credential is shared and the controlled area contains more than the writing surface.'},
  {id:'runner',label:'The relief runner wrote the name because the shared badge entered',note:'A shared-pool assignment is not a personal handover or proof of desk access.'},
  {id:'mara',label:'Mara used D-17 to alter the acknowledgement',note:'No personal badge handover, desk access record or handwriting evidence connects Mara to the entry.'}
 ],
 correctSuspect:'unknown',correctMotive:'token',
 truth:'Badge D-17 entered the dispatch corridor at 09:02 and left at 09:07. The credential belonged to a shared shift pool, and the recovered checkout copy has no receiving initials. The reader event is reliable, but it cannot identify the carrier or show that the carrier reached the writing surface.',
 proof:'The synchronized controller extract and signed daily copy establish the token’s corridor entry and exit. The pool register establishes shared assignment. The floor plan shows that corridor entry is not equivalent to desk access. No authenticated personal handover is present.',
 outcome:'Do not identify the badge carrier or accuse a named employee. The next lead is the original shift handover packet and independent witnesses who can authenticate who received D-17. Even then, desk access at 09:03 must be established separately.',
} as const;

export const CASE_044_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase044Carryover(archive:InvestigationArchive){
 const priorFiles=getPriorCaseMemory(archive,CASE_044_GAME.id);
 return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),accessTrailFiles:priorFiles.filter(r=>['case043','case042','case041'].includes(r.caseId)).length};
}
export function isCase044TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_044_GAME.correctOrder[i]);}
export function isCase044DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId==='unknown'&&motiveId==='token';}
