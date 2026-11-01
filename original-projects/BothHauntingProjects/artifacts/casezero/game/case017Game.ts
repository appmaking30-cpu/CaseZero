import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_017_GAME = {
 id:'case017', title:'The Shared Account', subtitle:'A team credential has a custody trail. The operator still needs individual evidence.',
 location:'CONTINUITY OPERATIONS VAULT · SYSTEMS DESK',
 briefing:'Case 016 established that a shared C-4 service account opened a session at 01:33, but the operator was not identified. The Bureau now has the account assignment sheet, token issue log, handoff register and sign-out receipt. Trace the account custody record without mistaking a team assignment for proof of who used the terminal.',
 clues:[
 {id:'assignment',title:'Service account assignment sheet',label:'Continuity roster · 18:00',detail:'The C-4 service account is assigned to the overnight systems team as a shared resource. The sheet lists a team custodian, not a single authorized operator for each session.'},
 {id:'token',title:'Session token issue log',label:'Credential service · 01:31',detail:'A session token is issued to the shared C-4 service account at 01:31. The issue log records the account and token time, not the person who requested it.'},
 {id:'handoff',title:'Systems desk handoff register',label:'Shift desk · 01:32',detail:'The handoff register records token packet H-9 collected by the desk runner and transferred to the secure systems tray. The recipient field is blank.'},
 {id:'signout',title:'Session sign-out receipt',label:'Terminal audit · 01:41',detail:'The shared account session closes at 01:41. The receipt confirms sign-out but contains no individual operator ID or typed signature.'}
 ],
 witnesses:[
 {id:'nora',name:'Nora Pell',role:'Systems account custodian',questions:[
 {id:'assignment',prompt:'Who is assigned the service account?',reply:'The overnight systems team. It is shared, and the assignment sheet does not nominate one person for every session.'},
 {id:'operator',prompt:'Can the assignment sheet identify the 01:33 operator?',reply:'No. Team-level responsibility is not a personal session record.'}]},
 {id:'cal',name:'Cal Rook',role:'Shift desk runner',questions:[
 {id:'handoff',prompt:'What happened to packet H-9?',reply:'The register says I collected it and moved it to the secure systems tray. The recipient field was left blank.'},
 {id:'recipient',prompt:'Can you name who received it?',reply:'Not from this register. There is no recipient entry or countersignature.'}]},
 {id:'sana',name:'Sana Vey',role:'Access-control auditor',questions:[
 {id:'signout',prompt:'What does the sign-out receipt prove?',reply:'The shared account session closed at 01:41. It does not say who ended it.'},
 {id:'link',prompt:'Do these records link a named person to the session?',reply:'No. They show assignment, token issue, an incomplete handoff and sign-out. The personal custody link is missing.'}]}
 ],
 timelineEvents:[
 {id:'assignment',time:'18:00',title:'Shared account assigned to overnight team',detail:'The roster establishes team-level custody.'},
 {id:'token',time:'01:31',title:'C-4 session token issued',detail:'The credential service issues a token to the shared account.'},
 {id:'handoff',time:'01:32',title:'H-9 packet transferred to secure tray',detail:'The desk register leaves the recipient field blank.'},
 {id:'signout',time:'01:41',title:'Shared session signs out',detail:'The terminal audit confirms the session close.'}],
 correctOrder:['assignment','token','handoff','signout'],
 suspects:[
 {id:'team',name:'Overnight systems team',role:'Shared account assignment',note:'The account is assigned to a team, not an individual operator.'},
 {id:'cal',name:'Cal Rook',role:'Recorded packet runner',note:'The register records collection and transfer to a tray, not receipt by Cal or a named user.'},
 {id:'nora',name:'Nora Pell',role:'Account custodian',note:'Custodianship does not establish who requested the token or used the session.'}],
 motives:[
 {id:'gap',label:'Identify the missing personal custody link',note:'The handoff register has no recipient or countersignature, and the sign-out receipt has no operator ID.'},
 {id:'cal',label:'Prove Cal operated the terminal',note:'The runner entry records packet movement only; it does not establish terminal use.'},
 {id:'nora',label:'Prove Nora opened the session',note:'Account custody is a team function and does not identify the session operator.'}],
 correctSuspect:'team',correctMotive:'gap',
 truth:'The C-4 service account is assigned to the overnight systems team. A token is issued at 01:31, packet H-9 is moved to the secure systems tray at 01:32, and the shared session signs out at 01:41. The handoff recipient and session operator are not recorded.',
 proof:'The assignment sheet is team-level. The token log identifies the shared account, the handoff register has a blank recipient field, and the sign-out receipt has no individual operator ID. Together, these records establish an incomplete custody chain rather than a named operator.',
 outcome:'The Bureau confirms the missing personal custody link in the shared-account trail. The next lead is the physical key cabinet and secure-tray collection log, which may establish who could access the token packet.'
} as const;
export const CASE_017_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase017Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_017_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),accessTrailFiles:priorFiles.filter(r=>['case014','case015','case016'].includes(r.caseId)).length};}
export function isCase017TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_017_GAME.correctOrder[i]);}
export function isCase017DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_017_GAME.correctSuspect&&motiveId===CASE_017_GAME.correctMotive;}
