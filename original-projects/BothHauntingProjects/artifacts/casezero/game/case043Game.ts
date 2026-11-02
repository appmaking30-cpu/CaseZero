import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_043_GAME = {
 id:'case043', title:'The Specimen Register',
 subtitle:'The name on the carbon has a handwriting trail. The question is whether the trail points to its namesake.',
 location:'CENTRAL DISPATCH · DOCUMENT EXAMINATION ROOM',
 briefing:'The RA-17 duplicate has been secured. A sealed specimen register and an independent desk record from 09:03 are now available. Compare the questioned entry with verified samples without treating a similar name as proof. The examiner must distinguish an exclusion, a possible resemblance and a positive identification.',
 clues:[
 {id:'register',title:'Sealed specimen register',label:'Document control · 08:40',detail:'The register records verified routine-writing samples for Rowan Vale and two dispatch staff. Each sample was collected on a different date, witnessed by two records officers and sealed before the disputed 09:03 entry. The register documents provenance; it does not itself identify the writer.'},
 {id:'blindReview',title:'Blind handwriting comparison',label:'Independent examiner · 11:20',detail:'The examiner compared the questioned “R. Vale” entry with the sealed samples without being told the suspected author. Several letter formations and spacing patterns differ from Rowan Vale’s verified samples. The questioned entry is too short and inconsistent for a positive identification of another writer. The report supports exclusion of Rowan as the likely writer, not identification of a replacement suspect.'},
 {id:'deskRecord',title:'Dispatch switchboard call record',label:'Switchboard · 09:01–09:06',detail:'An authenticated internal call connected Rowan Vale’s extension to the control-office line from 09:01 to 09:06. The call log is independently time-stamped. It establishes a recorded call at the time written on the duplicate; it does not prove Rowan’s hands were continuously occupied or establish who could access the desk.'},
 {id:'handlingNote',title:'Document handling and custody note',label:'Records audit · 11:34',detail:'The duplicate was handled by dispatch and archive staff before being sealed in RA-17. The custody note has no continuous personal-access record for the writing surface at 09:03. No ink, pressure or paper-fibre test was authorized. The note prevents the examiner’s exclusion from being stretched into a claim about another named person.'}
 ],
 witnesses:[
 {id:'examiner',name:'Dr. Imani Saye',role:'Independent document examiner',questions:[
 {id:'exclude',prompt:'Does your report support Rowan Vale as the writer?',reply:'No. The questioned entry differs from Rowan’s verified routine samples. Because the entry is brief, I cannot positively identify another writer from this comparison alone.'},
 {id:'limits',prompt:'Can a short name identify someone by handwriting?',reply:'Not reliably here. A short entry gives limited material. A difference can support exclusion, but it does not automatically identify the person who wrote it.'}]},
 {id:'mara',name:'Mara Venn',role:'Dispatch supervisor',questions:[
 {id:'call',prompt:'What does Rowan’s 09:01–09:06 call record prove?',reply:'It proves the switchboard recorded a call on his extension. It does not prove who was physically at the desk or who could reach the packet.'},
 {id:'desk',prompt:'Was personal access to the writing surface logged?',reply:'No continuous access log survives for that minute. The handling note lists departments and later custody, not every person near the desk.'}]},
 {id:'sana',name:'Sana Vey',role:'Records reconciliation auditor',questions:[
 {id:'samples',prompt:'Were the comparison samples verified before the disputed entry?',reply:'Yes. The register records earlier collection dates, two witnesses and sealed storage. That gives the examiner a documented reference set.'},
 {id:'next',prompt:'What evidence would identify the actual writer?',reply:'We need an independent access record or witness tied to the writing surface at 09:03, plus a properly authenticated comparison sample. The current file does not name the writer.'}]}
 ],
 timelineEvents:[
 {id:'samples',time:'08:40',title:'Verified specimen register sealed',detail:'Routine-writing samples were already collected and witnessed.'},
 {id:'call',time:'09:01',title:'Rowan’s extension connects to control office',detail:'The independent switchboard log records a call through 09:06.'},
 {id:'entry',time:'09:03',title:'“R. Vale” appears on the duplicate',detail:'The time is written beside the acknowledgement on the retrieved carbon.'},
 {id:'exam',time:'11:20',title:'Blind comparison report issued',detail:'The examiner finds differences from Rowan’s samples but cannot identify another writer.'}
 ],
 correctOrder:['samples','call','entry','exam'],
 suspects:[
 {id:'unknown',name:'Unidentified writer',role:'Rowan comparison does not match · no positive alternative',note:'The short entry differs from Rowan’s verified samples, but the file does not establish who else wrote it.'},
 {id:'rowan',name:'Rowan Vale',role:'Named on the carbon · comparison weighs against attribution',note:'The blind comparison finds differences from Rowan’s verified routine samples. The call log is context, not proof of physical impossibility.'},
 {id:'mara',name:'Mara Venn',role:'Dispatch supervisor · access not established',note:'Her role gives her process knowledge, but there is no personal-access evidence or authenticated writing match.'}
 ],
 motives:[
 {id:'exclude',label:'The handwriting evidence weighs against Rowan, but does not identify another writer',note:'The examiner can exclude a likely match to Rowan’s verified samples while the limited entry prevents a positive identification.'},
 {id:'accuse',label:'Mara Venn wrote the name to frame Rowan',note:'No evidence ties Mara to the writing surface or authenticates her handwriting as the writer.'},
 {id:'clear',label:'Rowan is conclusively cleared because he was on a call',note:'The call record is not a physical alibi and cannot alone establish who wrote the entry.'}
 ],
 correctSuspect:'unknown',correctMotive:'exclude',
 truth:'The questioned “R. Vale” entry differs from Rowan Vale’s verified routine-writing samples. The independent call record places his extension on a recorded call during the same period, but does not prove who had access to the desk. The available evidence weighs against attributing the entry to Rowan and does not identify another writer.',
 proof:'The sealed specimen register establishes the provenance of the reference samples. The blind examiner’s report records differences from Rowan’s samples and explicitly declines to identify another writer. The switchboard record and handling note establish context and the limits of personal-access attribution.',
 outcome:'Rowan should not be named as the writer on the current evidence. Nor can Mara or another staff member be accused. The next lead is a personal-access record or independent witness for the dispatch writing surface at 09:03, followed by a properly authenticated sample if a person is identified.',
} as const;

export const CASE_043_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase043Carryover(archive:InvestigationArchive){
 const priorFiles=getPriorCaseMemory(archive,CASE_043_GAME.id);
 return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),specimenTrailFiles:priorFiles.filter(r=>['case042','case041','case040','case039'].includes(r.caseId)).length};
}
export function isCase043TimelineCorrect(order:readonly string[]){return order.length===4&&order.every((id,i)=>id===CASE_043_GAME.correctOrder[i]);}
export function isCase043DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId==='unknown'&&motiveId==='exclude';}
