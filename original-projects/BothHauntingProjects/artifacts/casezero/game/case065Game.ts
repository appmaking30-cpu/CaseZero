import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_065_GAME = {
 id:'case065', title:'The Recorder Packet', subtitle:'A sealed recorder has arrived. Its metadata tells a narrower story than its label.',
 location:'CENTRAL RECORDS · SECURE REVIEW ROOM',
 briefing:'After Case 064, the packet is retrieved from tray TR-6 under dual-witness custody. Examine the sealed intake photograph, recorder inventory, read-only metadata export, independent checksum receipt and review log. Determine what the recorder can reliably establish—and what it cannot say about the missing detective.',
 clues:[
 {id:'photo',title:'Dual-witness intake photograph',label:'Secure review · 10:42',detail:'The photograph shows packet AR-2048 with seal S-118 intact at witnessed retrieval from tray TR-6. Both witness IDs are recorded in the intake log. The image documents packet condition and location, not the recorder contents.'},
 {id:'inventory',title:'Recorder inventory card',label:'Evidence desk · 10:48',detail:'The inventory card lists recorder R-17, storage module M-4 and a factory serial. The card was created before the missing detective disappeared and contains no personal ownership declaration.'},
 {id:'metadata',title:'Read-only metadata export',label:'Forensic review · 11:06',detail:'The export lists three audio segments with device-local timestamps and a timezone field marked unset. It contains no verified wall-clock conversion and no speaker identification.'},
 {id:'checksum',title:'Independent checksum receipt',label:'Integrity service · 11:12',detail:'A separately generated checksum matches the read-only image received by the review station. This supports file integrity from imaging onward; it does not prove the original recording was complete or unedited before intake.'},
 {id:'log',title:'Review and limitation log',label:'Independent audit · 11:30',detail:'The audit records the image hash, reviewer IDs and handling steps. It explicitly flags the unset timezone and absence of speaker attribution. No voice identity, location or exact real-world event time is established.'}
 ],
 witnesses:[
 {id:'mara',name:'Mara Venn',role:'Evidence intake officer',questions:[
 {id:'seal',prompt:'What does the intake photograph establish?',reply:'It documents the packet and seal condition at witnessed retrieval. It cannot show what is inside the recorder.'},
 {id:'custody',prompt:'Does the dual-witness log identify who recorded the audio?',reply:'No. It documents our retrieval and intake, not the original recording session.'}]},
 {id:'eli',name:'Eli Dast',role:'Digital evidence examiner',questions:[
 {id:'hash',prompt:'What does the checksum verify?',reply:'It verifies that the read-only image matches the image received at the review station. It cannot certify the recording history before imaging.'},
 {id:'time',prompt:'Can the timestamps be converted to local time?',reply:'Not reliably from this export. The timezone is unset, so a conversion would be speculation.'}]},
 {id:'sana',name:'Sana Or',role:'Independent audit reviewer',questions:[
 {id:'speaker',prompt:'Does metadata identify the speaker?',reply:'No. There is no validated speaker attribution in the supplied records.'},
 {id:'limit',prompt:'What is the strongest defensible conclusion?',reply:'The image is intact from receipt onward and contains three segments with device-local timestamps. The original recording context remains unverified.'}]}
 ],
 timelineEvents:[
 {id:'inventory',time:'Before disappearance',title:'Recorder inventory card created',detail:'Recorder R-17 and module M-4 are listed.'},
 {id:'retrieval',time:'10:42',title:'Packet retrieved under dual witness',detail:'Seal S-118 is photographed intact at tray TR-6.'},
 {id:'intake',time:'10:48',title:'Recorder inventoried',detail:'R-17 and M-4 are recorded at the evidence desk.'},
 {id:'image',time:'11:06',title:'Read-only image exported',detail:'Three segments and an unset timezone are recorded.'},
 {id:'checksum',time:'11:12',title:'Independent checksum generated',detail:'The received image hash is independently matched.'},
 {id:'audit',time:'11:30',title:'Limitations entered in review log',detail:'Timezone and speaker attribution remain unverified.'}
 ],
 correctOrder:['inventory','retrieval','intake','image','checksum','audit'],
 suspects:[
 {id:'integrity',name:'The received digital image is consistent from imaging onward',role:'Evidence finding',note:'The independent checksum supports integrity after receipt, not before it.'},
 {id:'speaker',name:'The missing detective is proven to be the speaker',role:'Identity claim',note:'No validated speaker attribution exists.'},
 {id:'timestamp',name:'The audio timestamps prove an exact local time',role:'Timeline claim',note:'The timezone field is unset; local conversion is not supported.'}
 ],
 motives:[
 {id:'limits',label:'Three device-local segments exist; speaker, timezone and original context remain unverified',note:'This conclusion respects the checksum and the explicit limitations.'},
 {id:'identity',label:'The missing detective recorded all three segments',note:'No speaker attribution supports this.'},
 {id:'tamper',label:'The checksum proves the original audio was never altered',note:'It only verifies the received image from imaging onward.'}
 ],
 correctSuspect:'integrity',correctMotive:'limits',
 truth:'The retrieved packet contains recorder R-17 and module M-4. A read-only image contains three audio segments. The independent checksum supports image integrity from receipt onward, but the timezone is unset and no speaker attribution is validated. The evidence does not establish who recorded the audio, when it occurred in local time, or what happened to the missing detective.',
 proof:'The dual-witness photograph records seal S-118 intact at retrieval. The inventory card identifies R-17 and M-4. The metadata export lists three device-local segments with no timezone. The checksum receipt matches the received image. The audit log records these limitations.',
 outcome:'Preserve the original device and read-only image separately. Request a properly documented clock reference and independent speaker-attribution review before drawing identity or chronology conclusions. Keep the Missing Detective lead open.',
} as const;
export const CASE_065_EMPTY_PROGRESS={cluesFound:[] as string[],askedQuestions:[] as string[],timelineOrder:[] as string[],selectedSuspect:null as string|null,selectedMotive:null as string|null,completed:false};
export function getCase065Carryover(archive:InvestigationArchive){const priorFiles=getPriorCaseMemory(archive,CASE_065_GAME.id);return {priorFiles,clueCount:priorFiles.reduce((n,r)=>n+r.inspectedClues.length,0),packetTrailFiles:priorFiles.filter(r=>/^case0(6[0-4])$/.test(r.caseId)).length};}
export function isCase065TimelineCorrect(order:readonly string[]){return order.length===6&&order.every((id,i)=>id===CASE_065_GAME.correctOrder[i]);}
export function isCase065DeductionCorrect(suspectId:string|null,motiveId:string|null){return suspectId===CASE_065_GAME.correctSuspect&&motiveId===CASE_065_GAME.correctMotive;}
