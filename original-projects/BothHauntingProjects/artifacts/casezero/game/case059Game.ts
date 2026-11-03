import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';
export const CASE_059_GAME = {
 id:'case059',title:'The Cache Access Roster',subtitle:'Permission to enter a cabinet is not proof that someone opened it.',location:'NORTH ANNEX · MAINTENANCE CABINET C-2',
 briefing:'Case 058 authenticated B-17 as an unchanged, correctly timed network fragment, but did not identify its creator or export operator. Examine the C-2 access roster, seal checks, independent retention copy and maintenance handover. Determine what the records establish—and what they cannot establish about who created B-17.',
 clues:[
 {id:'roster',title:'Signed C-2 access roster',label:'Facilities office · 06:50',detail:'The signed quarterly roster lists four staff members authorized to access cabinet C-2 during the relevant week. It defines permission only. It contains no event timestamps and does not record whether any listed person actually opened the cabinet.'},
 {id:'seal',title:'Cabinet seal and inspection log',label:'North Annex · 07:05',detail:'The independently witnessed log records seal C2-118 intact Monday at 18:00 and the next inspection Tuesday at 06:40. No inspection occurred during the overnight interval. The gap cannot establish whether the cabinet was opened and resealed between checks.'},
 {id:'retention',title:'Independent retention copy',label:'Records vault · 08:10',detail:'A separately administered vault contains a copy of B-17 with the same checksum as the local-cache file. Its signed intake receipt dates the copy to Monday 19:31. This confirms B-17 existed by then, but does not identify its creator or prove the cabinet was opened.'},
 {id:'handover',title:'Maintenance shift handover',label:'Operations desk · 08:35',detail:'The overnight handover records MT-4 maintenance coverage across the C-2 service area. The account was shared by the duty team and has no named badge session or individual acknowledgement. It establishes team coverage, not individual action.'},
 {id:'audit',title:'Independent access-log audit',label:'Security systems unit · 09:15',detail:'The audit finds that C-2 has no electronic door sensor. The nearby corridor badge reader records entry to the maintenance zone, not the cabinet itself. Its records cannot prove a cabinet opening or identify who handled B-17.'}],
 witnesses:[
 {id:'sana',name:'Sana Mire',role:'Facilities records custodian',questions:[{id:'permission',prompt:'What does the signed access roster establish?',reply:'It establishes who was authorized to access C-2. It does not record an actual opening or identify who created B-17.'},{id:'seal',prompt:'Can the seal log rule out an overnight opening?',reply:'No. The seal was checked at 18:00 and again at 06:40. There is no witnessed check between those times.'}]},
 {id:'dev',name:'Dev Arlen',role:'Independent retention archivist',questions:[{id:'copy',prompt:'What does the matching retention copy prove?',reply:'It independently confirms B-17 existed by the signed 19:31 intake. The matching checksum supports an unchanged copy, not a named creator.'},{id:'time',prompt:'Does the retention receipt identify who made B-17?',reply:'No. It records receipt by the vault, not who created the original file or placed it on C-2.'}]},
 {id:'maren',name:'Maren Sol',role:'Security systems auditor',questions:[{id:'reader',prompt:'Does the nearby badge reader record a cabinet opening?',reply:'No. It records entry to the maintenance zone. C-2 has no electronic door sensor.'},{id:'operator',prompt:'Can the shared MT-4 handover identify an individual?',reply:'No. MT-4 represents the duty team. There is no individual badge session tied to the B-17 interval.'}]}],
 timelineEvents:[
 {id:'roster',time:'MON 06:50',title:'Quarterly C-2 access roster signed',detail:'The roster defines four authorized staff members but records no cabinet opening.'},
 {id:'seal',time:'MON 18:00',title:'C-2 seal C2-118 inspected intact',detail:'The witnessed seal check begins an overnight interval with no further inspection.'},
 {id:'buffer',time:'MON 19:23',title:'WC-4 fragment later copied as B-17',detail:'The local repeater journal records the network fragment.'},
 {id:'retention',time:'MON 19:31',title:'Independent vault receives B-17 copy',detail:'A signed receipt establishes that the file existed by 19:31.'},
 {id:'handover',time:'TUE 06:40',title:'C-2 seal inspection and shift handover',detail:'The next witnessed inspection finds the seal intact; MT-4 coverage remains shared.'},
 {id:'audit',time:'TUE 09:15',title:'Security audit confirms no cabinet door sensor',detail:'The nearby badge reader records zone entry only.'}],
 correctOrder:['roster','seal','buffer','retention','handover','audit'],
 suspects:[
 {id:'authorized',name:'Authorized access only established',role:'Records finding',note:'The roster defines permission, while the unobserved seal interval and shared account do not identify an actual cabinet user.'},
 {id:'sana',name:'Sana Mire',role:'Facilities records custodian',note:'Maintaining the roster does not establish that Sana opened C-2 or handled B-17.'},
 {id:'dev',name:'Dev Arlen',role:'Retention archivist',note:'The vault receipt documents retention, not creation of the buffer or cabinet access.'}],
 motives:[
 {id:'limits',label:'Four people were authorized, but actual cabinet access and B-17’s creator remain unidentified',note:'The seal-check gap, retention receipt, shared handover and zone-only badge reader do not establish a named cabinet opening.'},
 {id:'sana',label:'Sana opened C-2 because she maintained the roster',note:'Administrative responsibility is not evidence of physical access.'},
 {id:'dev',label:'Dev created B-17 when the vault received its copy',note:'The vault receipt records intake, not creation.'}],
 correctSuspect:'authorized',correctMotive:'limits',
 truth:'Four staff members were authorized to access C-2, but the records do not show who actually opened the cabinet. The seal was checked at 18:00 and 06:40, leaving the overnight interval unobserved. An independent retention copy confirms B-17 existed by 19:31, but does not identify its creator. The shared MT-4 handover and nearby zone badge reader cannot identify an individual cabinet user.',
 proof:'The signed roster establishes permission only; the seal log has no overnight inspection; the independent vault receipt confirms B-17 existed by 19:31; MT-4 is a shared duty-team account; and the badge reader records zone entry rather than a cabinet opening.',
 outcome:'The access roster narrows the authorized group but does not identify who opened C-2 or created B-17. Do not accuse an authorized staff member based on permission alone. The next lead is the independent badge-controller event archive and physical key-control reconciliation for cabinet C-2.'
} as const;
export const CASE_059_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase059Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_059_GAME.id);return{priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),recorderTrailFiles:priorFiles.filter(r=>['case058','case057','case056','case055','case054','case053','case052','case051','case050','case049','case048'].includes(r.caseId)).length};}
export function isCase059TimelineCorrect(order:readonly string[]){return order.length===6&&order.every((id,i)=>id===CASE_059_GAME.correctOrder[i]);}
export function isCase059DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_059_GAME.correctSuspect&&motiveId===CASE_059_GAME.correctMotive;}
