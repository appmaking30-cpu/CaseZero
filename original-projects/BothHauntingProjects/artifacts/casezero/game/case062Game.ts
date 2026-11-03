import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';
export const CASE_062_GAME = {
 id:'case062', title:'The Cylinder Service Report', subtitle:'A maintenance request exists. The records do not establish that the lock cylinder was changed.',
 location:'NORTH ANNEX · FACILITIES RECORDS',
 briefing:'Case 061 established that K-2B was registered as a sealed reserve, but no incident-time checkout or C-2 opening was proven. Now examine the lock-cylinder service history and independent post-incident condition report. Determine whether a request became completed work, whether the cylinder changed, and what the records establish about handling.',
 clues:[
 {id:'baseline',title:'C-2 cylinder installation register',label:'Facilities archive · 06:50',detail:'The signed installation register identifies cylinder CY-8841 as fitted to the C-2 lock profile four months before the incident. The entry is reconciled to the door schedule.'},
 {id:'request',title:'Facilities service request C2-441',label:'Service desk · 07:15',detail:'Opened six days before the incident, the request describes a stiff latch and asks for an inspection. Its status is “awaiting scheduling”; it has no assigned technician, completion time or signed work note. A request is not proof that work took place.'},
 {id:'schedule',title:'Preventive maintenance rota',label:'Scheduling archive · 07:40',detail:'The published rota contains no C-2 cylinder service slot during the incident window. The rota records planned work only and cannot rule out an unplanned visit or undocumented activity.'},
 {id:'inspection',title:'Independent post-incident cylinder inspection',label:'External locksmith · 08:20',detail:'Two days after the incident, an independent locksmith records the visible cylinder identifier as CY-8841, matching the installation register. The report notes ordinary surface wear. This later observation supports continuity but cannot reconstruct every handling event during the earlier night.'},
 {id:'completion',title:'Work-order and removed-parts reconciliation',label:'Facilities assurance · 09:25',detail:'The searched completion register contains no signed C-2 cylinder replacement or completed service entry, and the parts archive contains no retained CY-8841 cylinder or signed disposal record. The search cannot rule out undocumented activity or records held elsewhere.'}
 ],
 witnesses:[
 {id:'niko',name:'Niko Pell',role:'Facilities service scheduler',questions:[
 {id:'request',prompt:'Did request C2-441 authorize a cylinder replacement?',reply:'No. It asked for an inspection of a stiff latch and remained awaiting scheduling. It has no technician assignment or completion record.'},
 {id:'rota',prompt:'Does the maintenance rota show a C-2 service during the incident window?',reply:'No planned slot appears. The rota is a schedule, not a complete log of every possible unplanned visit.'}]},
 {id:'edda',name:'Edda Venn',role:'Independent locksmith inspector',questions:[
 {id:'serial',prompt:'What cylinder identifier did the later inspection record?',reply:'CY-8841, matching the earlier installation register. The inspection was two days after the incident, so it supports later continuity but cannot prove every moment of the previous night.'},
 {id:'wear',prompt:'Does the inspection prove the cylinder was never handled or adjusted?',reply:'No. It records the visible identifier and ordinary surface wear. It does not establish who handled the lock or rule out undocumented work.'}]},
 {id:'orrin',name:'Orrin Hale',role:'Parts-retention archivist',questions:[
 {id:'removed',prompt:'Was a removed CY-8841 cylinder retained in the parts archive?',reply:'No matching retained part or signed disposal entry appears in the searched archive for the relevant period.'},
 {id:'limit',prompt:'Can the missing retained part prove that no cylinder work occurred?',reply:'No. The archive describes what was retained and logged. It cannot rule out undocumented handling or records outside this system.'}]}
 ],
 timelineEvents:[
 {id:'install',time:'FOUR MONTHS EARLIER',title:'CY-8841 recorded at C-2 installation',detail:'The signed installation register establishes the baseline cylinder identifier.'},
 {id:'request',time:'SIX DAYS BEFORE',title:'C2-441 inspection request opened',detail:'The request remains awaiting scheduling with no assigned technician.'},
 {id:'rota',time:'MON 16:00',title:'Preventive maintenance rota published',detail:'No planned C-2 cylinder service appears in the incident window.'},
 {id:'incident',time:'MON 19:16',title:'MT-4 credential enters maintenance zone',detail:'The previously authenticated shared-credential event occurs.'},
 {id:'inspection',time:'WED 10:15',title:'Independent inspection records CY-8841',detail:'The later inspection matches the cylinder identifier to the installation register.'},
 {id:'audit',time:'THU 09:25',title:'Completion and removed-parts records reconciled',detail:'The independent review finds no signed completed service or retained CY-8841 part.'}],
 correctOrder:['install','request','rota','incident','inspection','audit'],
 suspects:[
 {id:'continuity',name:'CY-8841 remains the documented cylinder identifier',role:'Records finding',note:'The installation register and later independent inspection match. No completed replacement is verified in the searched records.'},
 {id:'niko',name:'Niko Pell completed the replacement because a request existed',role:'Facilities service scheduler',note:'A pending request and scheduling role do not establish a technician visit, completed work or personal handling.'},
 {id:'edda',name:'Edda Venn changed the cylinder during the incident',role:'Independent locksmith inspector',note:'Edda inspected the lock two days later. The report does not place her at C-2 during the incident.'}],
 motives:[
 {id:'scope',label:'CY-8841 is the matching documented cylinder, but no completed service, replacement or individual handling is established',note:'The baseline register and later inspection match; the pending request, rota, completion search and parts archive do not establish a change.'},
 {id:'niko',label:'Niko replaced the cylinder because he controlled the service schedule',note:'Administrative access to a schedule is not evidence of a completed visit or physical handling.'},
 {id:'edda',label:'Edda replaced the cylinder and recorded the old serial afterward',note:'The later inspection is not evidence of an incident-time replacement, and no record supports this claim.'}],
 correctSuspect:'continuity',correctMotive:'scope',
 truth:'The installation register identifies CY-8841 as the C-2 cylinder, and an independent inspection two days after the incident records the same identifier. A service request for a stiff latch remained awaiting scheduling; the published rota contains no planned C-2 cylinder service, and the searched completion and parts-retention records contain no signed replacement or retained CY-8841 part. The evidence supports the same documented cylinder identifier before and after the incident, but it cannot rule out undocumented handling, establish every condition during the incident night or identify anyone who may have touched the lock.',
 proof:'The signed installation register records CY-8841 at C-2; request C2-441 remains awaiting scheduling; the maintenance rota shows no planned service in the incident window; the independent later inspection records CY-8841 again; and the searched completion and removed-parts archives contain no signed replacement trail.',
 outcome:'The cylinder lead is narrowed: no completed service or replacement is verified in the searched records, and the later inspection matches the original CY-8841 identifier. This does not prove that no undocumented handling occurred or identify a person at the lock. The next lead is an independent cross-index of North Annex hardware identifiers and access-control maintenance exceptions.'
} as const;
export const CASE_062_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase062Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_062_GAME.id);return{priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),hardwareTrailFiles:priorFiles.filter(r=>/^case0(5[7-9]|60|61)$/.test(r.caseId)).length};}
export function isCase062TimelineCorrect(order:readonly string[]){return order.length===6&&order.every((id,index)=>id===CASE_062_GAME.correctOrder[index]);}
export function isCase062DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_062_GAME.correctSuspect&&motiveId===CASE_062_GAME.correctMotive;}
