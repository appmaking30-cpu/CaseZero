import type { InvestigationArchive, CaseMemoryRecord } from './investigationArchive';

export const CASE_002 = {
  id: 'case002',
  number: '002',
  title: 'The Unlit Room',
  subtitle: 'Bellweather Hotel · Archive wing · 02:13',
  briefing:
    'During a brief power failure at the Bellweather Hotel, a sealed guest ledger vanished from a locked archive room. The backup lights came on after ninety seconds. No alarm was triggered, and the night auditor insists nobody entered.',
} as const;

export type Case002Carryover = {
  hasPriorCase: boolean;
  priorCaseTitle: string | null;
  priorConclusion: string | null;
  fieldLesson: string;
  unansweredLead: string | null;
  inspectedEvidence: string[];
};

function describeConclusion(record: CaseMemoryRecord): string {
  if (record.caseId === 'case001' && record.selectedSuspectId === 'miles' && record.selectedMotiveId === 'protect') {
    return 'In The Last Train Home, you concluded that Miles Renn moved the envelope to protect it from the leak — movement did not automatically mean theft.';
  }

  return `Your recorded conclusion in ${record.caseTitle} is preserved in the Bureau archive.`;
}

/**
 * Turns the previous investigation into a practical lead for Case 002.
 * The new case receives only facts the player actually recorded.
 */
export function getCase002Carryover(
  archive: InvestigationArchive,
): Case002Carryover {
  const prior = archive.completedCases.find((record) => record.caseId === 'case001');

  if (!prior) {
    return {
      hasPriorCase: false,
      priorCaseTitle: null,
      priorConclusion: null,
      fieldLesson: 'No earlier case is on file. This investigation begins with a clean notebook.',
      unansweredLead: null,
      inspectedEvidence: [],
    };
  }

  const noticedEnvironmentalClue = prior.inspectedClues.some((clue) =>
    /ceiling stain|leak/i.test(clue),
  );

  return {
    hasPriorCase: true,
    priorCaseTitle: prior.caseTitle,
    priorConclusion: describeConclusion(prior),
    fieldLesson: noticedEnvironmentalClue
      ? 'Your last file taught the Bureau to check the room itself: environmental conditions can explain why evidence was moved.'
      : 'Your last file is a reminder to test the scene conditions before deciding that a missing object was stolen.',
    unansweredLead: prior.unansweredQuestions[0] ?? null,
    inspectedEvidence: [...prior.inspectedClues],
  };
}
