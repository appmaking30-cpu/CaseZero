import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_060_GAME = {
  id: 'case060',
  title: 'The Missing Key Record',
  subtitle: 'A recorded credential and a team key issue still do not prove who held the key.',
  location: 'NORTH ANNEX · C-2 KEY CONTROL',
  briefing: 'Case 059 established that four staff were authorized to access C-2, but no record proved an actual cabinet opening. The next lead is the independent badge-controller archive and the physical key-control ledger. Reconcile the event times, credential assignment, key issue and return records. Decide exactly what the combined records prove—and where human identity remains unverified.',
  clues: [
    { id: 'controller', title: 'Independent badge-controller archive', label: 'Security archive · 07:20', detail: 'A signed export records one maintenance-zone entry at 19:16 under credential MT-4. The controller confirms the credential and event, but MT-4 is a shared team credential and the reader is outside the cabinet room. It proves a zone entry, not who carried the badge or whether C-2 was opened.' },
    { id: 'assignment', title: 'Credential assignment register', label: 'Access office · 07:45', detail: 'The register assigns MT-4 to the evening maintenance team for the full shift. Four staff were rostered to that team. No individual checkout, personal PIN or named acknowledgement is attached to the credential.' },
    { id: 'keyissue', title: 'Physical key issue ledger', label: 'Key-control desk · 08:05', detail: 'Key K-2, listed for cabinet C-2, was issued at 18:55 against the MT-4 team entry. The recipient field contains the team code, not a person’s name or signature. A return was logged at 06:32, again against the team code.' },
    { id: 'reconcile', title: 'Independent key-ring reconciliation', label: 'Facilities audit · 08:40', detail: 'The independently witnessed audit matches the K-2 stamp and ring serial to the C-2 key schedule. It confirms the ledger refers to the correct physical key. It does not identify who carried it or prove which lock it opened during the shift.' },
    { id: 'clock', title: 'Controller clock and retention certificate', label: 'Records assurance · 09:10', detail: 'A separately retained controller copy matches the 19:16 event and confirms the controller clock was within two seconds. The event is authentic and correctly timed, but the record still describes a shared credential at the maintenance-zone reader.' },
  ],
  witnesses: [
    { id: 'maren', name: 'Maren Sol', role: 'Security systems auditor', questions: [
      { id: 'event', prompt: 'What does the independent controller archive prove?', reply: 'It proves the MT-4 credential entered the maintenance zone at 19:16. The reader is not on C-2, and MT-4 is shared by the shift team.' },
      { id: 'person', prompt: 'Can the credential identify the person carrying it?', reply: 'No. The assignment register has no personal checkout or named acknowledgement. A credential event is not a verified human identity.' },
    ]},
    { id: 'sana', name: 'Sana Mire', role: 'Facilities records custodian', questions: [
      { id: 'key', prompt: 'Who received physical key K-2 at 18:55?', reply: 'The ledger records the MT-4 team, not an individual recipient. The return is also recorded against the team code.' },
      { id: 'serial', prompt: 'Does the key-ring audit prove the key opened C-2?', reply: 'It confirms the correct key was listed and reconciled. It does not record a lock operation or identify who carried the key.' },
    ]},
    { id: 'dev', name: 'Dev Arlen', role: 'Independent retention archivist', questions: [
      { id: 'time', prompt: 'Is the 19:16 controller event authentic and correctly timed?', reply: 'Yes. The separately retained copy matches, and the clock certificate places the event within two seconds.' },
      { id: 'limits', prompt: 'Can the combined records name the person who opened C-2?', reply: 'No. They link a shared credential to a zone entry and a team key issue. Neither record has an individual acknowledgement or cabinet-level opening event.' },
    ]},
  ],
  timelineEvents: [
    { id: 'register', time: 'MON 06:50', title: 'MT-4 evening team roster confirmed', detail: 'Four staff are listed under the shared maintenance team.' },
    { id: 'keyissue', time: 'MON 18:55', title: 'Physical key K-2 issued to MT-4', detail: 'The key ledger records the team code, not an individual recipient.' },
    { id: 'entry', time: 'MON 19:16', title: 'MT-4 credential enters maintenance zone', detail: 'The independent controller records a shared credential at the zone reader.' },
    { id: 'copy', time: 'TUE 07:20', title: 'Independent controller archive exported', detail: 'The signed copy preserves the same event and timestamp.' },
    { id: 'return', time: 'TUE 06:32', title: 'K-2 return logged against MT-4', detail: 'The ledger records a team return with no named recipient.' },
    { id: 'audit', time: 'TUE 08:40', title: 'Key-ring serial reconciled to C-2 schedule', detail: 'The physical key is matched to the correct schedule, not to a person or lock operation.' },
  ],
  correctOrder: ['register', 'keyissue', 'entry', 'return', 'copy', 'audit'],
  suspects: [
    { id: 'shared', name: 'Shared MT-4 credential and team key issue established', role: 'Records finding', note: 'The records corroborate a zone entry and K-2 team issue, but do not identify a person or prove a C-2 opening.' },
    { id: 'maren', name: 'Maren Sol', role: 'Security systems auditor', note: 'Auditing the controller archive does not establish that Maren carried MT-4 or K-2.' },
    { id: 'sana', name: 'Sana Mire', role: 'Facilities records custodian', note: 'Maintaining the key ledger does not establish that Sana received or used K-2.' },
  ],
  motives: [
    { id: 'boundary', label: 'MT-4 entered the maintenance zone and K-2 was issued to the team, but no individual keyholder or C-2 opening is proven', note: 'The controller and key ledger corroborate team-level events only; the reader is not at the cabinet and the ledger has no personal signature.' },
    { id: 'maren', label: 'Maren used the audit to conceal her own cabinet entry', note: 'The audit record contains no evidence that Maren carried the credential or key.' },
    { id: 'sana', label: 'Sana took K-2 because she maintained the key ledger', note: 'Administrative responsibility is not proof of physical receipt or use.' },
  ],
  correctSuspect: 'shared',
  correctMotive: 'boundary',
  truth: 'The independent controller confirms that shared credential MT-4 entered the maintenance zone at 19:16. The physical key ledger records K-2 issued to the MT-4 team at 18:55 and returned at 06:32. A separate audit matches the physical key serial to the C-2 schedule. Together, these records corroborate a team-level credential event and key issue, but they do not identify an individual keyholder or prove that C-2 was opened.',
  proof: 'The signed controller export and retained copy agree on the 19:16 event; the assignment register shows MT-4 was shared by four staff; the key ledger records team-level issue and return; and the independent key-ring audit matches K-2 to the C-2 schedule without recording a lock operation.',
  outcome: 'The badge event and physical key record are now independently reconciled at team level. The person who carried K-2 and whether it opened C-2 remain unproven. The next lead is the separately administered key-duplicate register and the maintenance-room retention archive, which may show whether another physical copy existed or whether a named handover was recorded.',
} as const;

export const CASE_060_EMPTY_PROGRESS = { cluesFound: [] as string[], askedQuestions: [] as string[], timelineOrder: [] as string[], selectedSuspect: null as string | null, selectedMotive: null as string | null, completed: false };
export function getCase060Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_060_GAME.id);
  return { priorFiles, clueCount: priorFiles.reduce((n, record) => n + record.inspectedClues.length, 0), recorderTrailFiles: priorFiles.filter((record) => /^case0(4[8-9]|5[0-9])$/.test(record.caseId)).length };
}
export function isCase060TimelineCorrect(order: readonly string[]) { return order.length === 6 && order.every((id, index) => id === CASE_060_GAME.correctOrder[index]); }
export function isCase060DeductionCorrect(suspectId: string | null, motiveId: string | null) { return suspectId === CASE_060_GAME.correctSuspect && motiveId === CASE_060_GAME.correctMotive; }
