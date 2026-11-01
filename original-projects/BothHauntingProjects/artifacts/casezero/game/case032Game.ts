import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_032_GAME = {
  id: 'case032',
  title: 'The Signed Handover',
  subtitle: 'Determine what the duty roster and shift handover establish about responsibility for a shared terminal.',
  location: 'CENTRAL DISPATCH · DUTY RECORDS OFFICE',
  briefing: 'Case 031 confirmed that the shared DISPATCH-OPS profile was active on D-3, but no personal operator token was present. The next file examines the duty roster, the signed shift handover and the terminal responsibility ledger. A person assigned to a shift may be accountable for the desk without being proven to have operated the terminal.',
  clues: [
    { id: 'roster', title: 'Dispatch duty roster', label: 'Operations · 06:00 shift', detail: 'The roster assigns the early dispatch desk to the Blue Team. Mara Venn is listed as shift supervisor; two operators are listed on the same duty block. The roster records scheduled responsibility, not individual terminal activity.' },
    { id: 'ledger', title: 'Desk responsibility ledger', label: 'Dispatch control · 07:00', detail: 'The desk ledger records the Blue Team as responsible for D-3 during the relevant interval. It does not list a named operator or record which team member was physically at the terminal.' },
    { id: 'handover', title: 'Signed shift handover', label: 'Dispatch records · 07:05', detail: 'The outgoing supervisor and incoming supervisor signed the shift transfer. The document confirms the Blue Team accepted responsibility for the desk before the 07:22 session, but contains no terminal-specific operator assignment.' },
    { id: 'variance', title: 'Handover variance note', label: 'Records review · 08:50', detail: 'A later review notes that the individual operator field was left blank. The blank field was not corrected or countersigned. The signed handover is valid for team responsibility but cannot fill the missing personal attribution.' }
  ],
  witnesses: [
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch shift supervisor', questions: [
      { id: 'roster', prompt: 'Who was assigned to the early dispatch desk?', reply: 'The Blue Team was assigned. I supervised the shift, but the roster lists more than one operator.' },
      { id: 'handover', prompt: 'Does the signed handover name the terminal operator?', reply: 'No. It transfers responsibility to the incoming team. The individual operator field is blank.' }
    ]},
    { id: 'eli', name: 'Eli Soren', role: 'Outgoing shift supervisor', questions: [
      { id: 'sign', prompt: 'What did your signature confirm?', reply: 'That the desk and its open duties were handed over to the Blue Team. It was not a certification of who would use each terminal.' },
      { id: 'blank', prompt: 'Was the operator field completed later?', reply: 'No. The variance note records that it remained blank and was not countersigned.' }
    ]},
    { id: 'sana', name: 'Sana Vey', role: 'Records reconciliation auditor', questions: [
      { id: 'scope', prompt: 'What does the roster establish?', reply: 'Scheduled team responsibility and the supervisor for the shift. It does not establish which individual used D-3.' },
      { id: 'limit', prompt: 'What is the strongest supported conclusion?', reply: 'The Blue Team had responsibility for the desk when the session occurred. The individual operator remains unidentified.' }
    ]}
  ],
  timelineEvents: [
    { id: 'roster', time: '06:00', title: 'Blue Team duty block begins', detail: 'The roster assigns the early dispatch desk.' },
    { id: 'handover', time: '07:05', title: 'Shift handover signed', detail: 'The outgoing and incoming supervisors transfer desk responsibility.' },
    { id: 'session', time: '07:22', title: 'Shared terminal session opens', detail: 'Case 031 established the DISPATCH-OPS profile was active on D-3.' },
    { id: 'variance', time: '08:50', title: 'Blank operator field flagged', detail: 'The later review records that no individual operator was named.' }
  ],
  correctOrder: ['roster', 'handover', 'session', 'variance'],
  suspects: [
    { id: 'mara', name: 'Mara Venn', role: 'Shift supervisor', note: 'Supervisory responsibility does not establish that Mara personally operated D-3.' },
    { id: 'eli', name: 'Eli Soren', role: 'Outgoing supervisor', note: 'His signature confirms the handover, not the later terminal operator.' },
    { id: 'unknown', name: 'Unidentified Blue Team operator', role: 'Individual attribution unresolved', note: 'The team had desk responsibility, but the individual operator field is blank.' }
  ],
  motives: [
    { id: 'responsibility', label: 'Confirm Blue Team responsibility for the desk', note: 'The roster and signed handover support team-level responsibility.' },
    { id: 'mara', label: 'Prove Mara operated D-3', note: 'No personal terminal assignment or operator token identifies Mara.' },
    { id: 'eli', label: 'Prove Eli operated D-3', note: 'The outgoing supervisor signed the transfer before the terminal session.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'responsibility',
  truth: 'The Blue Team was assigned to the dispatch desk and accepted responsibility through a signed shift handover before the D-3 session. The individual operator field remained blank. These records establish team-level responsibility, not the identity of the person who used the shared terminal.',
  proof: 'The duty roster establishes the scheduled team; the desk ledger confirms responsibility for D-3; the signed handover confirms when that responsibility transferred; and the variance note documents that the individual operator field was never completed.',
  outcome: 'The duty trail is now established at team level, but the operator remains unidentified. The next lead is the terminal-side activity record: look for an independently logged action that can be matched to a named person without relying on the shared profile.'
} as const;

export const CASE_032_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase032Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_032_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case031', 'case030', 'case029', 'case028'].includes(record.caseId)).length,
  };
}

export function isCase032TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_032_GAME.correctOrder[index]);
}

export function isCase032DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_032_GAME.correctSuspect && motiveId === CASE_032_GAME.correctMotive;
}
