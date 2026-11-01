import type { InvestigationArchive } from './investigationArchive';

export const MISSING_DETECTIVE_DOSSIER = {
  id: 'missing-detective',
  title: 'The Detective Who Disappeared',
  label: 'Bureau integrity review',
  detective: 'Detective Rowan Vale',
  briefing:
    'Two unrelated investigations are now closed. Both reports reached the Bureau, but an internal routing note was added to each file after submission. The note carries the same handwritten mark: a small black square.',
  recoveredNote:
    'If you are reading this, the case files made it back. That means someone is watching what the Bureau records. Do not search for me in the missing-person index. Search the files that were changed after they were closed. — R.V.',
  firstLead:
    'A sealed internal review has been opened. The next investigation will trace who altered the reports, when the changes were made, and why Rowan Vale left this warning.',
} as const;

export type MissingDetectiveArcStatus = {
  unlocked: boolean;
  completedCaseCount: number;
  requiredCaseCount: number;
  missingCaseIds: string[];
};

const REQUIRED_CASE_IDS = ['case001', 'case002'] as const;

/** The long-running detective mystery only appears after both opening files are closed. */
export function getMissingDetectiveArcStatus(
  archive: InvestigationArchive,
): MissingDetectiveArcStatus {
  const completedIds = new Set(archive.completedCases.map((record) => record.caseId));
  const missingCaseIds = REQUIRED_CASE_IDS.filter((caseId) => !completedIds.has(caseId));

  return {
    unlocked: missingCaseIds.length === 0,
    completedCaseCount: REQUIRED_CASE_IDS.length - missingCaseIds.length,
    requiredCaseCount: REQUIRED_CASE_IDS.length,
    missingCaseIds: [...missingCaseIds],
  };
}
