import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_061_GAME = {
  id: 'case061',
  title: 'The Duplicate Key Ledger',
  subtitle: 'A registered spare key exists. The records still do not show it was used.',
  location: 'NORTH ANNEX · KEY CONTROL ARCHIVE',
  briefing: 'Case 060 reconciled the MT-4 badge event with the K-2 team key issue, but no named keyholder or cabinet opening was established. The next lead is the separately administered duplicate-key register and maintenance-room retention archive. Determine whether a spare for C-2 existed, where it was stored, and whether any record connects it to the overnight event. Do not treat the existence of a duplicate as proof it was used.',
  clues: [
    { id: 'register', title: 'Duplicate-key master register', label: 'Key Control · 07:10', detail: 'The signed register lists one spare, K-2B, for the C-2 lock profile. Its status is marked “sealed reserve” and its storage location is the central Key Control safe. The register does not record any issue during the relevant shift.' },
    { id: 'cutting', title: 'Locksmith work-order archive', label: 'Facilities archive · 07:35', detail: 'A completed work order confirms K-2B was cut and tested six weeks before the North Annex event. The requester field contains a department code, not a person. The work order proves the spare was made, not that it left Key Control or was used at C-2.' },
    { id: 'safe', title: 'Independent reserve-safe inspection', label: 'Internal audit · 08:00', detail: 'A signed inspection two days after the event records the K-2B envelope in the reserve safe with its numbered seal intact. The inspection is after the relevant shift, so it supports later custody but cannot by itself prove the envelope remained untouched throughout the earlier night.' },
    { id: 'retention', title: 'Maintenance-room retention index', label: 'Records assurance · 08:30', detail: 'The separately administered retention index lists a sealed key-control handover packet for the shift. Its inventory description includes K-2 issue paperwork but no K-2B checkout slip. The packet inventory is complete for the listed pages, but it cannot prove that no unrecorded movement occurred.' },
    { id: 'audit', title: 'Independent register reconciliation', label: 'External review · 09:05', detail: 'A second reviewer matches K-2B’s stamped identifier to the C-2 lock profile and confirms the reserve-safe location recorded in the master register. No individual checkout, cabinet-level event or matching key impression from the incident is present.' },
  ],
  witnesses: [
    { id: 'sana', name: 'Sana Mire', role: 'Key-control records custodian', questions: [
      { id: 'spare', prompt: 'Did a duplicate for the C-2 lock profile exist?', reply: 'Yes. The master register lists K-2B as a sealed reserve, and the locksmith work order confirms it was made six weeks before the incident.' },
      { id: 'issue', prompt: 'Does the register show K-2B issued during the relevant shift?', reply: 'No issue is recorded. The reserve-safe inspection two days later found its numbered envelope intact, but that later check cannot reconstruct every moment of the earlier shift.' },
    ]},
    { id: 'dev', name: 'Dev Arlen', role: 'Independent retention archivist', questions: [
      { id: 'packet', prompt: 'What does the maintenance-room packet inventory contain?', reply: 'It lists K-2 issue paperwork and no K-2B checkout slip. That is evidence about the retained packet, not proof that no undocumented movement happened.' },
      { id: 'complete', prompt: 'Can the packet inventory prove the duplicate was never used?', reply: 'No. It confirms no checkout slip is in that packet. It cannot rule out an unrecorded movement or a record kept elsewhere.' },
    ]},
    { id: 'maren', name: 'Maren Sol', role: 'Independent access auditor', questions: [
      { id: 'identity', prompt: 'Does the independent review identify who held K-2B?', reply: 'No. The register and work order contain no personal checkout or signed recipient.' },
      { id: 'lock', prompt: 'Does any evidence connect K-2B to an actual C-2 opening?', reply: 'No. The records establish that a matching spare existed and was listed as sealed reserve. There is no cabinet event or physical comparison tying it to the incident.' },
    ]},
  ],
  timelineEvents: [
    { id: 'cut', time: 'SIX WEEKS EARLIER', title: 'K-2B duplicate cut and tested', detail: 'The locksmith work order records creation of the spare.' },
    { id: 'register', time: 'MON 07:10', title: 'Duplicate-key master register verified', detail: 'K-2B is listed as a sealed reserve in the central safe.' },
    { id: 'packet', time: 'MON 18:40', title: 'Shift handover packet sealed', detail: 'The retained packet inventory lists K-2 issue paperwork.' },
    { id: 'event', time: 'MON 19:16', title: 'MT-4 credential enters maintenance zone', detail: 'The previously authenticated shared-credential event occurs.' },
    { id: 'inspection', time: 'WED 10:15', title: 'Reserve-safe inspection records K-2B envelope intact', detail: 'The later inspection documents the numbered envelope after the incident.' },
    { id: 'review', time: 'THU 09:05', title: 'Independent register reconciliation completed', detail: 'The reviewer matches K-2B to the C-2 profile and reserve location.' },
  ],
  correctOrder: ['cut', 'register', 'packet', 'event', 'inspection', 'review'],
  suspects: [
    { id: 'reserve', name: 'K-2B existed as a registered sealed reserve', role: 'Records finding', note: 'The duplicate was made and listed for C-2, but no record connects it to an incident-time checkout or opening.' },
    { id: 'sana', name: 'Sana Mire', role: 'Key-control records custodian', note: 'Maintaining the register does not establish that Sana checked out or used K-2B.' },
    { id: 'dev', name: 'Dev Arlen', role: 'Independent retention archivist', note: 'Preserving the handover packet does not establish that Dev moved or used the duplicate.' },
  ],
  motives: [
    { id: 'limit', label: 'A matching duplicate existed as sealed reserve, but incident-time use and individual custody are not established', note: 'The register, work order and later inspection establish existence and recorded storage; no checkout or cabinet event links K-2B to the incident.' },
    { id: 'sana', label: 'Sana used the duplicate because she maintained the key register', note: 'Administrative responsibility is not evidence of physical possession or use.' },
    { id: 'dev', label: 'Dev removed the duplicate when sealing the retention packet', note: 'The packet inventory lists paperwork and contains no evidence of Dev handling K-2B.' },
  ],
  correctSuspect: 'reserve',
  correctMotive: 'limit',
  truth: 'A duplicate key, K-2B, was made six weeks before the incident and listed as a sealed reserve for the C-2 lock profile. A later reserve-safe inspection found its numbered envelope intact, and the retained shift packet contains no K-2B checkout slip. These records establish the spare existed and its documented reserve status, but they do not prove its condition throughout the incident night, rule out undocumented movement, identify a keyholder or connect K-2B to a C-2 opening.',
  proof: 'The signed master register identifies K-2B and its reserve location; the locksmith work order confirms its creation; the later safe inspection records the numbered envelope intact; the independent packet inventory contains no K-2B checkout slip; and the reviewer matches its stamp to the C-2 lock profile.',
  outcome: 'The duplicate-key lead is narrowed: K-2B existed as a registered reserve, but there is no supported evidence it was checked out or used during the incident. The next lead is the lock-cylinder service history and the independent post-incident condition report, which may establish whether C-2’s cylinder was changed, inspected or physically disturbed.',
} as const;

export const CASE_061_EMPTY_PROGRESS = { cluesFound: [] as string[], askedQuestions: [] as string[], timelineOrder: [] as string[], selectedSuspect: null as string | null, selectedMotive: null as string | null, completed: false };
export function getCase061Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_061_GAME.id);
  return { priorFiles, clueCount: priorFiles.reduce((n, record) => n + record.inspectedClues.length, 0), keyTrailFiles: priorFiles.filter((record) => /^case0(5[4-9]|60|61)$/.test(record.caseId)).length };
}
export function isCase061TimelineCorrect(order: readonly string[]) { return order.length === 6 && order.every((id, index) => id === CASE_061_GAME.correctOrder[index]); }
export function isCase061DeductionCorrect(suspectId: string | null, motiveId: string | null) { return suspectId === CASE_061_GAME.correctSuspect && motiveId === CASE_061_GAME.correctMotive; }
