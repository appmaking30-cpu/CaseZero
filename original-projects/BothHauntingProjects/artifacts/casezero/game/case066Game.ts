import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_066_GAME = {
 id:'case066',
 title:'The Detective Who Left a Record',
 subtitle:'The last file is not a confession. It is a record that must be authenticated.',
 location:'BUREAU ARCHIVE · FINAL REVIEW ROOM',
 briefing:'The recovered recorder packet points to one final sealed message. Reconcile its device identity and custody trail with the prior investigations, then authenticate the message against an independently held institutional record. The Bureau must distinguish what Rowan Vale says, what the second record confirms, and what remains outside the evidence.',
 clues:[
  {id:'serial',title:'Recorder identity reconciliation',label:'Evidence registry · 08:10',detail:'The recorder casing serial R-17 and module M-4 match the witnessed intake inventory from Case 065. The serial match links this device to the recovered packet; it does not authenticate every file ever stored on it.'},
  {id:'custody',title:'Continuous dual-witness custody log',label:'Evidence control · 08:22',detail:'The log records the sealed packet opening, read-only extraction and transfer to the final review room under two witness signatures. No unexplained custody interval appears between those recorded steps.'},
  {id:'statement',title:'Rowan Vale’s signed final statement',label:'Recorder export · 08:31',detail:'The authenticated statement says Rowan voluntarily left the Bureau assignment and entered a protected, confidential review process. Rowan asks the Bureau not to publish a location or contact details. The statement does not describe a crime, name a perpetrator or establish Rowan’s present location.'},
  {id:'register',title:'Independent confidential-review register',label:'Institutional records · 08:36',detail:'A separately administered register contains a matching case reference, statement digest and authorized status entry: voluntary protected separation from active duty. It independently corroborates the status recorded in Rowan’s statement, but contains no public location or future-contact schedule.'},
  {id:'limits',title:'Final evidence limitation memo',label:'Bureau integrity · 08:50',detail:'The memo confirms that the statement digest and register entry match, while the recorder serial and custody log connect the statement to the recovered device. Neither source establishes Rowan’s current whereabouts, whether Rowan will return, or any allegation against another person.'}
 ],
 witnesses:[
  {id:'mara',name:'Mara Venn',role:'Evidence custodian',questions:[
   {id:'serial',prompt:'Does the matching serial prove the statement is genuine?',reply:'It connects the recovered device to the inventory. Authenticity of the statement requires the independent digest and status register as well.'},
   {id:'custody',prompt:'Was there an unexplained gap during final extraction?',reply:'The dual-witness log records each transfer from sealed opening through read-only extraction. No gap appears in that documented interval.'}
  ]},
  {id:'elias',name:'Elias North',role:'Independent register auditor',questions:[
   {id:'digest',prompt:'What does the separate register confirm?',reply:'It independently matches the statement reference and digest and records a voluntary protected separation from active duty.'},
   {id:'where',prompt:'Does the register disclose Rowan’s current location?',reply:'No. It deliberately contains no public location or contact schedule. The Bureau cannot infer either.'}
  ]},
  {id:'sana',name:'Sana Rell',role:'Bureau integrity reviewer',questions:[
   {id:'publish',prompt:'What can the Bureau responsibly publish?',reply:'That Rowan’s authenticated statement and the independent register agree on a voluntary protected separation from active duty. No location or accusation is supported.'},
   {id:'unknown',prompt:'Can we say Rowan is safe forever or will return?',reply:'No. The records establish the reviewed status at the recorded time, not an unlimited guarantee about the future or a return date.'}
  ]}
 ],
 timelineEvents:[
  {id:'inventory',time:'08:10',title:'Recorder serial reconciled',detail:'R-17 and M-4 match the Case 065 inventory.'},
  {id:'custody',time:'08:22',title:'Dual-witness custody verified',detail:'The sealed packet opening and extraction are logged.'},
  {id:'statement',time:'08:31',title:'Signed statement authenticated',detail:'The statement digest is prepared for independent comparison.'},
  {id:'register',time:'08:36',title:'Separate status register matched',detail:'The independently held digest and status entry agree.'},
  {id:'memo',time:'08:50',title:'Evidence limitation review completed',detail:'The Bureau records what the evidence does and does not establish.'},
  {id:'report',time:'09:05',title:'Final Bureau report authorized',detail:'A limited public finding is approved; private details remain protected.'}
 ],
 correctOrder:['inventory','custody','statement','register','memo','report'],
 suspects:[
  {id:'status',name:'Rowan voluntarily entered a protected separation from active duty',role:'Authenticated status finding',note:'The signed statement and independent register agree on this limited status.'},
  {id:'abduction',name:'The evidence proves Rowan was abducted by a named employee',role:'Unsupported accusation',note:'No record identifies an abductor or establishes an offence.'},
  {id:'return',name:'The evidence proves Rowan will return to the Bureau',role:'Unsupported prediction',note:'The records contain no return date or promise.'}
 ],
 motives:[
  {id:'bounded',label:'Publish the verified status while withholding location and future claims',note:'The statement and separate register corroborate protected separation; location and future status remain unknown.'},
  {id:'location',label:'Publish Rowan’s current location and contact details',note:'Neither source contains public location or contact information.'},
  {id:'certainty',label:'Declare Rowan permanently safe and guarantee a return',note:'The records establish a status at a recorded time, not a permanent guarantee.'}
 ],
 correctSuspect:'status',correctMotive:'bounded',
 truth:'The recovered recorder is R-17 with module M-4, matching the witnessed Case 065 inventory. Its dual-witness custody log records the final extraction. Rowan Vale’s signed statement and a separately administered confidential-review register carry matching references and digests and agree that Rowan voluntarily entered a protected separation from active duty. The evidence does not establish Rowan’s current location, future plans or a return date.',
 proof:'The Case 065 recorder inventory matches serial R-17 and module M-4. The continuous dual-witness log records the sealed opening and read-only extraction. Rowan’s signed statement carries a digest independently matched by the confidential-review register. The register records voluntary protected separation from active duty. The final limitation memo records the absence of a public location or future-contact schedule.',
 outcome:'Close the Missing Detective investigation with a bounded, evidence-backed finding. Publish only that Rowan’s authenticated records establish a voluntary protected separation from active duty at the recorded time. Keep location and contact details private, make no accusation unsupported by evidence, and leave any future contact to Rowan’s stated process. Unlock the post-campaign case board.',
} as const;

export const CASE_066_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase066Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_066_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),endgameFiles:priorFiles.filter(r=>/^case0(6[3-5])$/.test(r.caseId)).length};}
export function isCase066TimelineCorrect(order:readonly string[]){return order.length===6&&order.every((id,i)=>id===CASE_066_GAME.correctOrder[i]);}
export function isCase066DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_066_GAME.correctSuspect&&motiveId===CASE_066_GAME.correctMotive;}
