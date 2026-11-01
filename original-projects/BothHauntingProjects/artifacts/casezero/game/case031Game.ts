import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_031_GAME = {
  id: 'case031',
  title: 'The Session Without a Name',
  subtitle: 'Separate a terminal session record from the person who may have operated it.',
  location: 'CENTRAL DISPATCH · TERMINAL AUDIT DESK',
  briefing: 'Case 030 established a short room-occupancy event and a masked staff credential at D-3. The terminal session audit, service-account policy, export reconciliation and credential cross-reference request now test whether the activity can be tied to a named operator. A session identity is not automatically a human identity.',
  clues: [
    { id: 'session', title: 'D-3 terminal session audit', label: 'Terminal audit · 07:22', detail: 'The audit records a session opened on terminal D-3 at 07:22 under the shared DISPATCH-OPS profile. The log records the profile name and session time, but not the person at the keyboard.' },
    { id: 'policy', title: 'Shared-profile operating policy', label: 'IT governance · Current revision', detail: 'The policy permits the DISPATCH-OPS profile to be used by the on-duty dispatch team when individual credentials are unavailable. The policy requires a separate duty record for attribution; it does not identify who used this session.' },
    { id: 'export', title: 'Terminal export reconciliation', label: 'Audit systems · 08:34', detail: 'The session export and terminal clock reconciliation agree that the profile was active during the room-occupancy interval. The export contains no unique user token, personal badge ID or signed operator handover.' },
    { id: 'request', title: 'Masked credential cross-reference request', label: 'Access control · Pending', detail: 'A request has been filed to resolve the masked staff credential event from Case 030. The request is still pending approval; no identity result is attached to the current file.' }
  ],
  witnesses: [
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch shift supervisor', questions: [
      { id: 'profile', prompt: 'Who is allowed to use DISPATCH-OPS?', reply: 'The on-duty dispatch team may use it when individual credentials are unavailable. The profile name is not a personal sign-in.' },
      { id: 'handover', prompt: 'Is there a signed operator handover for 07:22?', reply: 'Not in the records attached to this file. Without that handover, I cannot identify who operated the session.' }
    ]},
    { id: 'pavel', name: 'Pavel Orin', role: 'Access-control registrar', questions: [
      { id: 'request', prompt: 'Has the masked credential been identified?', reply: 'No. The cross-reference request is pending approval and has not returned a named credential holder.' },
      { id: 'scope', prompt: 'Can the session profile identify the badge holder?', reply: 'No. The terminal session uses a shared profile and is not joined to the door credential export.' }
    ]},
    { id: 'sana', name: 'Sana Vey', role: 'Records reconciliation auditor', questions: [
      { id: 'clock', prompt: 'Do the terminal and room records align?', reply: 'Yes. After clock reconciliation, the session falls within the short room-occupancy interval.' },
      { id: 'limit', prompt: 'What is the strongest supported conclusion?', reply: 'The shared profile was active on D-3 during the occupancy interval. The available records do not identify the operator.' }
    ]}
  ],
  timelineEvents: [
    { id: 'occupancy', time: '07:21:20*', title: 'D-3 room occupancy begins', detail: 'The corrected room counter changes from zero to one.' },
    { id: 'session', time: '07:22:00*', title: 'DISPATCH-OPS session opens', detail: 'The shared profile becomes active on terminal D-3.' },
    { id: 'export', time: '08:34', title: 'Audit export reconciled', detail: 'The terminal and room clocks are aligned; no personal operator token appears.' },
    { id: 'request', time: 'Pending', title: 'Credential cross-reference requested', detail: 'The masked door credential remains unresolved.' }
  ],
  correctOrder: ['occupancy', 'session', 'export', 'request'],
  suspects: [
    { id: 'mara', name: 'Mara Venn', role: 'Shift supervisor', note: 'Her role and presence in the wider access trail do not identify her as the session operator.' },
    { id: 'ivo', name: 'Ivo Dane', role: 'Requested visitor', note: 'The records do not link Ivo to the shared profile or terminal session.' },
    { id: 'unknown', name: 'Unidentified operator', role: 'Identity unresolved', note: 'The shared profile is recorded, but the human operator is not identified.' }
  ],
  motives: [
    { id: 'session', label: 'Confirm the shared profile was active on D-3', note: 'The session audit and clock reconciliation support this conclusion.' },
    { id: 'mara', label: 'Prove Mara operated the session', note: 'No signed handover or personal user token identifies Mara.' },
    { id: 'ivo', label: 'Prove Ivo operated the session', note: 'No record connects the visitor to the terminal profile.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'session',
  truth: 'The DISPATCH-OPS shared profile was active on terminal D-3 during the corrected room-occupancy interval. The profile policy allows team use, the export contains no personal user token, and the masked credential cross-reference remains pending. The operator cannot yet be identified.',
  proof: 'The terminal session audit establishes the shared profile and time; policy explains why that profile is not a personal identity; export reconciliation aligns the session with the room interval; and the pending cross-reference request confirms that the masked credential has not been resolved.',
  outcome: 'The terminal activity is now confirmed, but the operator remains unknown. The next lead is the dispatch duty roster and signed shift handover: can a contemporaneous record narrow who had responsibility for the shared profile?'
} as const;

export const CASE_031_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase031Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_031_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    roomTrailFiles: priorFiles.filter((record) => ['case030', 'case029', 'case028'].includes(record.caseId)).length,
  };
}

export function isCase031TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_031_GAME.correctOrder[index]);
}

export function isCase031DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_031_GAME.correctSuspect && motiveId === CASE_031_GAME.correctMotive;
}
