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

export type MissingDetectiveConvergence = {
  unlocked: boolean;
  completedCaseCount: number;
  requiredCaseCount: number;
  missingCaseIds: string[];
  reportTitle: string;
  reportSummary: string;
  evidenceLinks: string[];
};

const CONVERGENCE_CASE_IDS = ['case001', 'case002', 'case003', 'case004'] as const;

/**
 * The second classified review becomes available only after all four campaign
 * files are archived. It connects the repeated black-square authorization mark
 * to the maintenance transfer route without claiming the missing recorder has
 * been recovered.
 */
export function getMissingDetectiveConvergence(
  archive: InvestigationArchive,
): MissingDetectiveConvergence {
  const completedIds = new Set(archive.completedCases.map((record) => record.caseId));
  const missingCaseIds = CONVERGENCE_CASE_IDS.filter((caseId) => !completedIds.has(caseId));
  const unlocked = missingCaseIds.length === 0;

  return {
    unlocked,
    completedCaseCount: CONVERGENCE_CASE_IDS.length - missingCaseIds.length,
    requiredCaseCount: CONVERGENCE_CASE_IDS.length,
    missingCaseIds: [...missingCaseIds],
    reportTitle: 'The Mark Was a Route',
    reportSummary: unlocked
      ? 'The black square first appeared on the after-hours routing slips inserted into the two opening case files. In the North Quay docket, the same mark appears beside the M-2 maintenance authorization. The mark was not simply a review stamp: it identified files and objects moved through the same off-book approval path. Rowan’s recorder is still missing, but its transfer can now be traced to the maintenance network.'
      : 'Close all four campaign files to compare the original routing slips with the North Quay transfer docket.',
    evidenceLinks: unlocked
      ? [
          'Cases 001 and 002: closed reports later received matching black-square routing slips.',
          'Case 003: the annex printer, replacement seal batch, and supervisor cabinet log establish how the slips were inserted.',
          'Case 004: the North Quay docket repeats the black-square mark beside maintenance authority M-2.',
        ]
      : [],
  };
}
