import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_011_GAME = {
  id: 'case011',
  title: 'The Rotation Ledger',
  subtitle: 'A roster can identify who was on duty. It cannot prove who used a shared terminal.',
  location: 'CONTINUITY OPERATIONS VAULT · NIGHT ROSTER ARCHIVE',
  briefing: 'Case 010 established that Emergency Continuity held conditional M-2 authority during the Route Governance outage. Its C-4 holder field remains sealed. The Bureau receives a certified extract of the rotation ledger. Compare the duty roster with the shared-terminal session and the later audit export. The question is who was scheduled—not who you wish the records would accuse.',
  clues: [
    { id: 'warrant', title: 'C-4 ledger release warrant', label: 'Release order · 01:20', detail: 'The sealed rotation ledger was released for a certified review copy under Bureau warrant. The warrant records the document release and does not grant access to the live C-4 credential.' },
    { id: 'roster', title: 'C-4 duty rotation snapshot', label: 'Roster locked · 01:24', detail: 'The snapshot lists Sable Neri as primary duty coordinator and Ivo Dane as relief coordinator for the 01:00–01:30 window. A roster records assignment, not proof that the scheduled person operated a terminal.' },
    { id: 'session', title: 'C-4 shared-terminal session record', label: 'Session opened · 01:29', detail: 'Terminal C-4-OPS-2 opened a pooled C-4 session. No personal account or biometric confirmation appears in the surviving log. The device and credential are identified; the operator is not.' },
    { id: 'export', title: 'Session audit export receipt', label: 'Audit copy · 01:41', detail: 'Mara Ell generated the audit export after the session closed. Her signature confirms who preserved the log, not who initiated the C-4 session.' },
  ],
  witnesses: [
    { id: 'sable', name: 'Sable Neri', role: 'Primary duty coordinator', questions: [
      { id: 'roster', prompt: 'What does the rotation snapshot establish?', reply: 'It lists me as primary coordinator and Ivo as relief for that window. It is an assignment record. It does not prove which person used the shared terminal.' },
      { id: 'session', prompt: 'Did you personally open the C-4 session?', reply: 'The surviving session log has no personal sign-in. I cannot use a pooled credential record to prove who was at the terminal.' },
    ] },
    { id: 'ivo', name: 'Ivo Dane', role: 'Relief duty coordinator', questions: [
      { id: 'relief', prompt: 'Were you assigned as primary or relief?', reply: 'Relief. The locked snapshot shows Sable as primary for the 01:00–01:30 window. I was available if the primary coordinator was unavailable.' },
      { id: 'operator', prompt: 'Can the log identify who used C-4-OPS-2?', reply: 'No personal login appears. The session identifies the shared device and credential, not the person operating it.' },
    ] },
    { id: 'mara', name: 'Mara Ell', role: 'Systems audit clerk', questions: [
      { id: 'export', prompt: 'What did your signature certify?', reply: 'That I generated and preserved the audit export at 01:41. I did not certify the identity of the earlier terminal operator.' },
      { id: 'identity', prompt: 'Is there a personal operator field in the export?', reply: 'Not in this copy. The session is attached to C-4-OPS-2 and the pooled C-4 credential. The operator field is blank.' },
    ] },
  ],
  timelineEvents: [
    { id: 'warrant', time: '01:20', title: 'C-4 ledger release warrant filed', detail: 'The Bureau authorizes a certified review copy.' },
    { id: 'roster', time: '01:24', title: 'Duty rotation snapshot sealed', detail: 'The primary and relief assignments are locked for the window.' },
    { id: 'session', time: '01:29', title: 'Shared C-4 terminal session opens', detail: 'Terminal C-4-OPS-2 records a pooled credential session.' },
    { id: 'export', time: '01:41', title: 'Session audit export generated', detail: 'The systems clerk preserves the log after the session.' },
  ],
  correctOrder: ['warrant', 'roster', 'session', 'export'],
  suspects: [
    { id: 'sable', name: 'Sable Neri', role: 'Primary duty coordinator', note: 'The locked roster assigns Sable as primary for the relevant window.' },
    { id: 'ivo', name: 'Ivo Dane', role: 'Relief duty coordinator', note: 'The roster lists Ivo as relief, not primary.' },
    { id: 'mara', name: 'Mara Ell', role: 'Systems audit clerk', note: 'Mara generated the later audit export; that does not make her the session operator.' },
  ],
  motives: [
    { id: 'scheduled', label: 'Confirm who was scheduled as primary C-4 coordinator', note: 'The sealed rotation snapshot identifies the primary and relief assignments.' },
    { id: 'operated', label: 'Prove Sable personally operated the shared terminal', note: 'The pooled session contains no personal operator field.' },
    { id: 'exported', label: 'Prove Mara initiated the C-4 session', note: 'Her signature belongs to the later audit export, not the earlier session.' },
  ],
  correctSuspect: 'sable',
  correctMotive: 'scheduled',
  truth: 'Sable Neri was scheduled as the primary C-4 duty coordinator for the 01:00–01:30 window, with Ivo Dane assigned as relief. Mara Ell generated the later audit export. The shared-terminal session identifies C-4-OPS-2 and the pooled credential but contains no personal operator field. The records establish the duty assignment, not who physically used the terminal.',
  proof: 'The release warrant precedes the locked rotation snapshot. That snapshot places Sable in the primary role and Ivo in relief. The C-4 session opens five minutes later, but it records only a pooled credential on a shared terminal. Mara’s 01:41 signature belongs to the later audit export. These records cannot bridge the missing personal-operator field.',
  outcome: 'The Bureau records Sable as the scheduled primary coordinator but does not name her as the C-4 operator. The next request targets the access-control log for terminal C-4-OPS-2. A physical entry record may narrow who could have reached the device during the session.',
} as const;

export const CASE_011_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase011Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_011_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    authorityFiles: priorFiles.filter((record) => ['case009', 'case010'].includes(record.caseId)).length,
  };
}

export function isCase011TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_011_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_011_GAME.correctOrder[index]);
}

export function isCase011DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_011_GAME.correctSuspect && motiveId === CASE_011_GAME.correctMotive;
}
