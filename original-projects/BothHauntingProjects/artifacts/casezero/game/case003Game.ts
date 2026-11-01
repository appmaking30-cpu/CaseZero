import type { InvestigationArchive } from './investigationArchive';
import { MISSING_DETECTIVE_DOSSIER } from './missingDetectiveArc';

export const CASE_003_GAME = {
  id: 'case003',
  title: 'The Black Square',
  subtitle: 'A Bureau file has been altered. The person who changed it left a mark.',
  briefing: 'The Bureau’s integrity review begins with the two closed files. Their original reports are intact, but a routing slip was inserted after each closure. Both slips carry a small black square and the same after-hours processing code. Rowan Vale’s note points to the records annex, where the paper trail begins.',
  suspects: [
    { id: 'arden', name: 'Silas Arden', role: 'Records supervisor', note: 'Approved overnight file routing and controlled the annex cabinet.' },
    { id: 'lyle', name: 'Nora Lyle', role: 'Dispatch officer', note: 'Delivered sealed reports between the Bureau and the annex.' },
    { id: 'pike', name: 'Owen Pike', role: 'Night custodian', note: 'Held building access during the overnight shift.' },
  ],
  clues: [
    { id: 'slip', title: 'The inserted routing slip', label: 'Paper evidence', detail: 'The slip was printed at 23:48, well after both case reports were closed. Its routing code is RA-4 and the approval box carries a small black square instead of a staff signature.' },
    { id: 'printer', title: 'The annex printer log', label: 'Machine record', detail: 'The printer log records one job at 23:48 from terminal RS-04. That terminal is assigned to the records supervisor desk. No other terminal submitted a routing-slip job that night.' },
    { id: 'seal', title: 'The broken file seal', label: 'Chain of custody', detail: 'The envelope seal was cut cleanly and replaced with a standard Bureau seal. The replacement seal batch was signed out to the records supervisor at 22:00.' },
    { id: 'ledger', title: 'The after-hours cabinet ledger', label: 'Access record', detail: 'The annex cabinet opened at 23:52 with supervisor credential S.A. It was closed at 23:57. The dispatch desk logged a sealed delivery at 00:06, after the cabinet was already closed.' },
  ],
  witnesses: [
    { id: 'lyle', name: 'Nora Lyle', role: 'Dispatch officer', questions: [
      { id: 'delivery', prompt: 'When did you deliver the closed reports?', reply: 'At 00:06. Both envelopes were sealed when I received them, and I logged the delivery at the annex desk.' },
      { id: 'slip', prompt: 'Did you create the black-square routing slip?', reply: 'No. I carry sealed files; I do not print or approve routing slips. The mark was already on the copy shown to me.' },
    ] },
    { id: 'pike', name: 'Owen Pike', role: 'Night custodian', questions: [
      { id: 'access', prompt: 'Who entered the records annex before midnight?', reply: 'The supervisor’s credential opened the cabinet shortly before midnight. I did not see anyone enter from the public corridor.' },
      { id: 'printer', prompt: 'Did you use the annex printer?', reply: 'No. The printer was already warm when I passed the desk. The job history should show which terminal sent the page.' },
    ] },
    { id: 'arden', name: 'Silas Arden', role: 'Records supervisor', questions: [
      { id: 'approval', prompt: 'Why is there no staff signature on the routing slip?', reply: 'The black square is an internal hold mark. It is used when a file needs review before circulation.' },
      { id: 'terminal', prompt: 'Was terminal RS-04 used during your shift?', reply: 'It is assigned to my desk, but several people can access the records room. The terminal log alone does not prove who typed the job.' },
    ] },
  ],
  timelineEvents: [
    { id: 'signout', time: '22:00', title: 'The replacement seal batch is signed out', detail: 'The records supervisor accepts the seal batch.' },
    { id: 'print', time: '23:48', title: 'The routing slip is printed', detail: 'Terminal RS-04 submits the only slip job.' },
    { id: 'cabinet', time: '23:52', title: 'The annex cabinet is opened', detail: 'Supervisor credential S.A. is recorded.' },
    { id: 'delivery', time: '00:06', title: 'Dispatch logs the sealed delivery', detail: 'The delivery happens after the cabinet is closed.' },
  ],
  correctTimelineOrder: ['signout', 'print', 'cabinet', 'delivery'],
  correctSuspect: 'arden',
  correctMotive: 'control',
  motives: [
    { id: 'profit', label: 'To sell confidential case information', note: 'A personal financial motive.' },
    { id: 'control', label: 'To control which evidence reaches investigators', note: 'The hold mark and altered routing would let someone quietly delay or redirect reports.' },
    { id: 'revenge', label: 'To retaliate against Rowan Vale', note: 'A personal grievance against the missing detective.' },
  ],
  truth: 'Silas Arden used the records supervisor terminal and seal access to insert an after-hours routing slip into the closed files. The black square was not a routine hold mark: it was his way to flag reports for private review before the rest of the Bureau could see them.',
  proof: 'The printer log ties the only slip job to terminal RS-04. The seal batch was signed out to Arden, and the cabinet access record shows his credential opening the annex minutes after the slip was printed. Dispatch’s 00:06 entry came later, so Nora Lyle could not have created the earlier alteration. The records point to Arden’s control of the files, not simply his explanation of the mark.',
  outcome: 'The Bureau suspends automatic routing for the affected files and preserves the original reports and printer logs. Arden is removed from records access pending an independent review. Rowan Vale’s warning is now treated as a credible lead, not an isolated note.',
} as const;

export type Case003Phase = 'case003Briefing' | 'case003Evidence' | 'case003Interviews' | 'case003Timeline' | 'case003Deduction' | 'case003Review';
export type Case003Progress = {
  cluesFound: string[];
  askedQuestions: string[];
  timelineOrder: string[];
  timelineSolved: boolean;
  selectedSuspect: string | null;
  selectedMotive: string | null;
  completed: boolean;
};
export const EMPTY_CASE003_PROGRESS: Case003Progress = {
  cluesFound: [], askedQuestions: [], timelineOrder: [], timelineSolved: false,
  selectedSuspect: null, selectedMotive: null, completed: false,
};

export function getCase003Carryover(archive: InvestigationArchive) {
  const first = archive.completedCases.find((record) => record.caseId === 'case001');
  const second = archive.completedCases.find((record) => record.caseId === 'case002');
  return {
    hasBothOpeningCases: Boolean(first && second),
    openingCasesInspected: [first, second].filter(Boolean).reduce((n, record) => n + record!.inspectedClues.length, 0),
    unansweredFromPrior: [first, second].flatMap((record) => record?.unansweredQuestions ?? []),
    selectedConclusions: [first, second].filter(Boolean).map((record) => record!.caseTitle + ': ' + record!.selectedSuspectId + ' / ' + record!.selectedMotiveId),
    lead: MISSING_DETECTIVE_DOSSIER.firstLead,
  };
}

export function getCase003QuestionReply(witnessId: string, questionId: string, archive: InvestigationArchive): string {
  const witness = CASE_003_GAME.witnesses.find((entry) => entry.id === witnessId);
  const question = witness?.questions.find((entry) => entry.id === questionId);
  if (!question) return '';
  const carryover = getCase003Carryover(archive);
  if (witnessId === 'arden' && questionId === 'terminal' && carryover.unansweredFromPrior.length > 0) {
    return 'The earlier files taught the Bureau not to accept a witness’s explanation without checking the record. The terminal log is the record that matters here. ' + question.reply;
  }
  if (witnessId === 'lyle' && questionId === 'delivery' && carryover.hasBothOpeningCases) {
    return 'Both opening files show why the order of events matters. ' + question.reply;
  }
  return question.reply;
}

export function isCase003TimelineCorrect(order: readonly string[]): boolean {
  return order.length === CASE_003_GAME.correctTimelineOrder.length &&
    order.every((id, index) => id === CASE_003_GAME.correctTimelineOrder[index]);
}
export function isCase003DeductionCorrect(suspectId: string | null, motiveId: string | null): boolean {
  return suspectId === CASE_003_GAME.correctSuspect && motiveId === CASE_003_GAME.correctMotive;
}
