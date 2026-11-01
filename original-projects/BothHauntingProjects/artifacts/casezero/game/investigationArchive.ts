export type CaseMemoryRecord = {
  caseId: string;
  caseTitle: string;
  closedAt: string;
  selectedSuspectId: string;
  selectedMotiveId: string;
  inspectedClues: string[];
  askedQuestions: string[];
  unansweredQuestions: string[];
};

export type InvestigationArchive = {
  version: 1;
  completedCases: CaseMemoryRecord[];
};

export const EMPTY_INVESTIGATION_ARCHIVE: InvestigationArchive = {
  version: 1,
  completedCases: [],
};

/**
 * Adds or replaces a completed case record without duplicating its case ID.
 * The caller owns persistence so this module remains platform-independent.
 */
export function archiveCompletedCase(
  archive: InvestigationArchive,
  record: CaseMemoryRecord,
): InvestigationArchive {
  const withoutExisting = archive.completedCases.filter(
    (entry) => entry.caseId !== record.caseId,
  );

  return {
    version: 1,
    completedCases: [...withoutExisting, record],
  };
}

/** Returns completed investigations in the order they were archived. */
export function getPriorCaseMemory(
  archive: InvestigationArchive,
  currentCaseId?: string,
): CaseMemoryRecord[] {
  return archive.completedCases.filter(
    (record) => record.caseId !== currentCaseId,
  );
}
