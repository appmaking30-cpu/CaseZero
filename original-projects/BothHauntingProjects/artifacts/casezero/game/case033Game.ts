import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_033_GAME = {
  id: 'case033',
  title: 'The Receipt at 07:24',
  subtitle: 'Establish what a personally signed terminal receipt can identify — and where its proof ends.',
  location: 'CENTRAL DISPATCH · PRINT AND AUDIT COUNTER',
  briefing: 'Case 032 established Blue Team responsibility for D-3, but the operator field remained blank. A newly recovered print receipt carries a personal badge signature. Determine whether it identifies the person who acknowledged one terminal-side export, and keep that narrow finding separate from the earlier shared session.',
  clues: [
    { id: 'receipt', title: 'Terminal export receipt', label: 'Audit counter · 07:24', detail: 'A receipt records export package D3-0724. The acknowledgement field contains a personal badge signature rather than the shared DISPATCH-OPS profile.' },
    { id: 'signature', title: 'Personal signature validation', label: 'Credential services · 09:10', detail: 'The signature matches the registered badge credential of Niko Vale. Validation confirms the badge credential used to acknowledge the receipt; it does not prove who opened the earlier shared session.' },
    { id: 'queue', title: 'Export queue manifest', label: 'Print services · 07:23', detail: 'The queue manifest shows the export package was generated on D-3 one minute before the receipt was acknowledged. The manifest records the terminal source, not the person who initiated the session.' },
    { id: 'scope', title: 'Audit scope clarification', label: 'Records review · 10:05', detail: 'The audit office confirms the receipt signature applies only to acknowledgement of package D3-0724. No linked personal login or signed operator handover has been found for the 07:22 session.' }
  ],
  witnesses: [
    { id: 'niko', name: 'Niko Vale', role: 'Dispatch records clerk', questions: [
      { id: 'receipt', prompt: 'Did you acknowledge the export receipt?', reply: 'Yes. I used my own badge credential to acknowledge receipt of package D3-0724 at the audit counter.' },
      { id: 'session', prompt: 'Does that mean you opened the 07:22 terminal session?', reply: 'No. I acknowledged the package after it was generated. I cannot say who opened the shared session.' }
    ]},
    { id: 'sana', name: 'Sana Vey', role: 'Records reconciliation auditor', questions: [
      { id: 'signature', prompt: 'What does the signature validation establish?', reply: 'The registered badge credential acknowledged the receipt. It is a personal acknowledgement, not a retrospective terminal login.' },
      { id: 'limit', prompt: 'Can the receipt identify the earlier operator?', reply: 'No. It identifies the person who acknowledged this export only. The session operator remains unresolved.' }
    ]},
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch shift supervisor', questions: [
      { id: 'queue', prompt: 'Who generated the export package?', reply: 'The queue manifest names D-3 as its source. It does not record a personal operator.' },
      { id: 'scope', prompt: 'What should the report say?', reply: 'Record Niko’s receipt acknowledgement as a separate verified action. Do not extend it to the earlier shared session.' }
    ]}
  ],
  timelineEvents: [
    { id: 'session', time: '07:22', title: 'Shared D-3 session opens', detail: 'The earlier audit records the shared profile, with no personal operator token.' },
    { id: 'queue', time: '07:23', title: 'Export package enters queue', detail: 'The manifest records D-3 as the package source.' },
    { id: 'receipt', time: '07:24', title: 'Receipt acknowledged', detail: 'A personal badge signature acknowledges package D3-0724.' },
    { id: 'validation', time: '09:10', title: 'Signature validation completed', detail: 'Credential services matches the receipt signature to Niko Vale.' }
  ],
  correctOrder: ['session', 'queue', 'receipt', 'validation'],
  suspects: [
    { id: 'niko', name: 'Niko Vale', role: 'Verified receipt acknowledger', note: 'His personal badge credential acknowledged the export receipt, but this does not identify the earlier session operator.' },
    { id: 'mara', name: 'Mara Venn', role: 'Shift supervisor', note: 'Her supervisory role does not identify her as the receipt acknowledger or session operator.' },
    { id: 'unknown', name: 'Unidentified session operator', role: 'Earlier session remains unresolved', note: 'The shared 07:22 session has no personal operator token.' }
  ],
  motives: [
    { id: 'acknowledgement', label: 'Confirm Niko acknowledged the export receipt', note: 'The personal signature and validation record support this narrow conclusion.' },
    { id: 'session', label: 'Prove Niko opened the 07:22 session', note: 'The receipt was acknowledged later and does not identify the session operator.' },
    { id: 'mara', label: 'Prove Mara generated the export', note: 'The queue manifest identifies D-3, not a named operator.' }
  ],
  correctSuspect: 'niko',
  correctMotive: 'acknowledgement',
  truth: 'Niko Vale’s registered badge credential acknowledged export package D3-0724 at 07:24. The queue manifest places package generation on D-3 at 07:23, but neither it nor the receipt identifies who opened the 07:22 shared session. One action is attributed; the earlier operator remains unknown.',
  proof: 'The queue manifest establishes the package source and time. The receipt records a personal acknowledgement, and credential validation matches that signature to Niko Vale. The audit scope clarification prevents that finding from being extended to the earlier shared session.',
  outcome: 'A personal action is now independently attributed, but the central operator question remains open. The next file will examine whether the export package itself contains a traceable revision history.'
} as const;

export const CASE_033_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase033Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_033_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case032', 'case031', 'case030', 'case029', 'case028'].includes(record.caseId)).length,
  };
}

export function isCase033TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_033_GAME.correctOrder[index]);
}

export function isCase033DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_033_GAME.correctSuspect && motiveId === CASE_033_GAME.correctMotive;
}
