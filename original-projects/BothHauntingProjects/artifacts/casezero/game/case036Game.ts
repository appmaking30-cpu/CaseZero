import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_036_GAME = {
  id: 'case036',
  title: 'The Restricted Review',
  subtitle: 'Compare the Annex K-17 custody trail with restricted review notes, and separate a documented review from an unproven transfer.',
  location: 'CENTRAL DISPATCH · RESTRICTED REVIEW OFFICE',
  briefing: 'Case 035 verified that the R-15 attachment came from Annex K-17, but did not identify who handled or marked the source page. A restricted review packet now shows that the folio was examined before the revised export. Trace who was authorized to review it, what was actually checked, and whether the notes prove who moved the page.',
  clues: [
    { id: 'register', title: 'Restricted review register', label: 'Review office · 08:10', detail: 'The register records a review slot against file K-17-12. Rowan Vale is listed as the assigned reviewer. The entry confirms authorization for a review, not physical custody of the source page.' },
    { id: 'access', title: 'Review-room access log', label: 'Access control · 08:16', detail: 'A personal credential assigned to Rowan Vale opens the review-room door at 08:16. The log records access to the room, not which documents Rowan handled or whether the Annex page left its folder.' },
    { id: 'note', title: 'Reviewer note · folio 12', label: 'Restricted notes · 08:31', detail: 'The note references the page checksum and asks for the R-15 attachment to be checked against the original. Its author field is populated by the review system, but the note does not describe who transported the folio.' },
    { id: 'comparison', title: 'Page comparison and sign-off', label: 'Records audit · 09:05', detail: 'The comparison records matching page content and checksum, then a separate sign-off closes the review. The sign-off validates the comparison result; it does not establish who applied the earlier access stamp or moved the page.' }
  ],
  witnesses: [
    { id: 'rowan', name: 'Rowan Vale', role: 'Assigned restricted reviewer', questions: [
      { id: 'scope', prompt: 'What were you assigned to review?', reply: 'File K-17-12, specifically the page reference later attached to R-15. The assignment was a document review, not a transfer request.' },
      { id: 'handling', prompt: 'Does your review prove you moved the source page?', reply: 'No. The access log shows I entered the review room. The register and note show my review assignment and work, but no transfer record names me as the person who moved the folio.' }
    ]},
    { id: 'sana', name: 'Sana Vey', role: 'Records reconciliation auditor', questions: [
      { id: 'validation', prompt: 'What does the page comparison establish?', reply: 'The checksum and page content match the Annex K-17 index. It validates the source page used in R-15, not the identity of whoever transported it.' },
      { id: 'signoff', prompt: 'What does the sign-off mean?', reply: 'It closes the comparison task. It is not a custody receipt and does not backfill a missing transfer record.' }
    ]},
    { id: 'elias', name: 'Elias Rook', role: 'Restricted archive custodian', questions: [
      { id: 'access', prompt: 'Does room access equal document custody?', reply: 'No. The room log records entry. A document movement requires a separate custody event or a signed transfer.' },
      { id: 'stamp', prompt: 'Can the access stamp identify who moved the page?', reply: 'It identifies a restricted workflow. There is no approved identity key tying that stamp to a particular staff member.' }
    ]}
  ],
  timelineEvents: [
    { id: 'register', time: '08:10', title: 'Review slot assigned', detail: 'The register assigns K-17-12 to Rowan Vale.' },
    { id: 'access', time: '08:16', title: 'Review-room door opened', detail: 'A personal credential assigned to Rowan records entry.' },
    { id: 'note', time: '08:31', title: 'Folio 12 review note saved', detail: 'The note requests comparison with the R-15 attachment.' },
    { id: 'comparison', time: '09:05', title: 'Page comparison signed off', detail: 'The matching page and checksum are confirmed.' }
  ],
  correctOrder: ['register', 'access', 'note', 'comparison'],
  suspects: [
    { id: 'rowan', name: 'Rowan Vale', role: 'Authorized reviewer · not proven handler', note: 'The review register and access log place Rowan in the review process, but do not prove a physical transfer.' },
    { id: 'unknown', name: 'Unidentified records handler', role: 'Transfer attribution unresolved', note: 'No signed custody event identifies who moved the folio or applied the restricted access stamp.' },
    { id: 'sana', name: 'Sana Vey', role: 'Records auditor', note: 'She validated the page comparison after the review; that does not make her the earlier handler.' }
  ],
  motives: [
    { id: 'review', label: 'Rowan was authorized to review folio 12 and the page comparison was verified', note: 'The register, access log, reviewer note and sign-off support the review sequence.' },
    { id: 'transfer', label: 'Rowan personally moved the folio and applied the access stamp', note: 'Room access and review authorization do not prove a physical transfer or stamp authorship.' },
    { id: 'sana', label: 'Sana moved the folio during the comparison', note: 'Her audit sign-off validates the comparison, not the earlier movement.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'review',
  truth: 'The restricted register assigned K-17-12 to Rowan Vale. A personal credential assigned to Rowan opened the review room, and a reviewer note requested comparison with R-15. The page comparison was then signed off. These records establish an authorized review and its sequence, but no custody event identifies who moved the source folio or applied the access stamp.',
  proof: 'The review register establishes assignment, the access log establishes room entry, the note records the review task, and the sign-off confirms the page comparison. A separate transfer record is absent, so reviewer identity must not be treated as handler identity.',
  outcome: 'Rowan Vale is now connected to the restricted review by named records, not by the unexplained “R.V.” notation. The missing transfer record remains the next gap. The Bureau must locate the movement ledger before attributing the folio’s route to any individual.',
} as const;

export const CASE_036_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase036Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_036_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case035', 'case034', 'case033', 'case032', 'case031', 'case030'].includes(record.caseId)).length,
  };
}

export function isCase036TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_036_GAME.correctOrder[index]);
}

export function isCase036DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_036_GAME.correctSuspect && motiveId === CASE_036_GAME.correctMotive;
}
