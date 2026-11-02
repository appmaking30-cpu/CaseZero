import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_045_GAME = {
 id:'case045', title:'The Handover Copy', subtitle:'The missing initials were not the only copy. The original packet tells a narrower story.',
 location:'CENTRAL DISPATCH · SHIFT HANDOVER DESK',
 briefing:'Case 044 authenticated D-17 at the corridor door but could not identify its carrier. The original shift-handover packet has now been recovered under seal. Compare its issue and return entries with two independent witness accounts. The packet may narrow the handover window, but do not turn a role assignment into proof of who carried the badge at 09:02.',
 clues:[
  {id:'originalPacket',title:'Original D-17 handover packet',label:'Sealed archive recovery · 08:00–10:00',detail:'The recovered original packet records D-17 transferred from the outgoing relief tray to the incoming dispatch pair at 08:54. The recipient field contains the role code RELIEF-2, not a personal name. The packet is signed by the outgoing desk officer and sealed before archive recovery. It establishes a controlled role-to-role handover, not the identity of the person who picked up the token.'},
  {id:'duplicateCopy',title:'Independent shift carbon copy',label:'Dispatch duplicate · Same handover',detail:'A carbon copy stored in the daily dispatch bundle matches the original packet’s 08:54 transfer and RELIEF-2 role code. Its ink sequence and page number match the bundle index. It is an independent contemporaneous copy, but it repeats the same role assignment and does not supply missing recipient initials.'},
  {id:'witnessNote',title:'Two-staff handover observation',label:'Witness statements · 08:50–09:00',detail:'Two staff members independently recall the D-17 token placed in the RELIEF-2 tray before the shift briefing ended. Neither saw a named person take it from the tray. Their statements agree on the tray and approximate time, not on the later carrier.'},
  {id:'returnRegister',title:'Return and exception register',label:'Security desk · End-of-shift review',detail:'The return register has no individual return signature for D-17. An exception note records that the token was still outstanding at the 10:00 count and was recovered later from the shared dispatch key cabinet. This closes the custody window only at the pool level; it does not identify who carried the token during the corridor event.'}
 ],
 witnesses:[
  {id:'outgoing',name:'Elias Dorn',role:'Outgoing dispatch desk officer',questions:[
   {id:'transfer',prompt:'Who received D-17 at 08:54?',reply:'The packet records RELIEF-2, the incoming role. It does not name the person who removed the token from the tray.'},
   {id:'signature',prompt:'What does your signature authenticate?',reply:'I signed that I placed D-17 into the incoming relief tray and completed the role handover. I did not witness a named recipient taking it.'}]},
  {id:'observer',name:'Mina Sol',role:'Dispatch handover witness',questions:[
   {id:'tray',prompt:'What did you personally observe?',reply:'I saw the token placed in the RELIEF-2 tray before briefing ended. I cannot say who collected it afterward.'},
   {id:'identity',prompt:'Can you identify the carrier at 09:02?',reply:'No. I did not follow the token after the handover, and I did not see anyone carry it through the corridor reader.'}]},
  {id:'auditor',name:'Sana Vey',role:'Records reconciliation auditor',questions:[
   {id:'copies',prompt:'Do the original and carbon copy agree?',reply:'Yes. They agree on the 08:54 role-to-role transfer. Both leave the personal recipient field blank.'},
   {id:'return',prompt:'Does the return exception identify the carrier?',reply:'No. It confirms the token remained outstanding at the 10:00 count and was later recovered from the shared cabinet. It does not fill the five-minute access window.'}]}
 ],
 timelineEvents:[
  {id:'packet',time:'08:40',title:'Outgoing packet prepared and sealed',detail:'The original handover packet is indexed before the shift transfer.'},
  {id:'handover',time:'08:54',title:'D-17 placed in RELIEF-2 tray',detail:'Original and carbon copy agree on the role-level handover.'},
  {id:'reader',time:'09:02',title:'D-17 passes corridor reader',detail:'The authenticated access event from Case 044 records the token.'},
  {id:'count',time:'10:00',title:'D-17 listed as outstanding',detail:'The return register records a pool-level exception.'}
 ],
 correctOrder:['packet','handover','reader','count'],
 suspects:[
  {id:'unknown',name:'Unidentified RELIEF-2 recipient',role:'Role-level handover · personal recipient unknown',note:'The original and duplicate packets identify the incoming role, not the person who took D-17.'},
  {id:'elias',name:'Elias Dorn',role:'Outgoing officer · placed token in tray',note:'His signature authenticates the handover into the tray, not later collection or corridor entry.'},
  {id:'mina',name:'Mina Sol',role:'Witness · saw tray placement only',note:'Her statement confirms the tray handover, not collection by a named person.'}
 ],
 motives:[
  {id:'role',label:'The original packet narrows custody to the RELIEF-2 role, but does not identify its recipient',note:'The two contemporaneous copies agree on the role code. Neither contains a personal recipient or proves who carried the badge.'},
  {id:'elias',label:'Elias kept D-17 and used it after signing the handover',note:'The evidence places the token in the incoming tray after his signed handover, not in his possession at 09:02.'},
  {id:'mina',label:'Mina collected D-17 because she saw the tray',note:'Seeing the token placed in the tray does not establish collection or corridor access.'}
 ],
 correctSuspect:'unknown',correctMotive:'role',
 truth:'The original packet and its independent carbon copy establish that D-17 was handed from the outgoing desk to the RELIEF-2 role at 08:54. They do not identify the individual recipient. Two witnesses confirm the tray placement but did not see who collected the token. The 10:00 exception closes only the pool-level return record.',
 proof:'The sealed original packet, matching carbon copy, two independent witness statements and end-of-shift exception register agree on a role-level handover. None contains a personal recipient or a witnessed transfer to a named carrier.',
 outcome:'Do not accuse Elias or Mina and do not treat RELIEF-2 as a person. The next lead is the incoming RELIEF-2 roster and a separately authenticated desk assignment or witness who can place a named staff member with D-17 during 09:02–09:07. Desk access still requires its own proof.',
} as const;

export const CASE_045_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase045Carryover(archive:InvestigationArchive){
 const priorFiles=getPriorCaseMemory(archive,CASE_045_GAME.id);
 return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),accessTrailFiles:priorFiles.filter(r=>['case044','case043','case042'].includes(r.caseId)).length};
}
export function isCase045TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_045_GAME.correctOrder[i]);}
export function isCase045DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId==='unknown'&&motiveId==='role';}
