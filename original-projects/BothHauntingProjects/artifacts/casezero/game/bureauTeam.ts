import type { InvestigationArchive } from './investigationArchive';

export const BUREAU_SPECIALISTS = [
  {
    id: 'inez',
    name: 'Inez Shaw',
    role: 'Evidence Analyst',
    specialty: 'Evidence handling and chain-of-custody review',
    profile: 'Methodical, precise, and difficult to mislead. Inez checks whether each record can support the conclusion placed on it.',
    unlockAfterCaseId: 'case001',
    unlockLabel: 'Close Case 001',
  },
  {
    id: 'tomas',
    name: 'Tomas Reed',
    role: 'Interview Specialist',
    specialty: 'Witness statements and contradiction mapping',
    profile: 'Patient and observant. Tomas compares what people say with what the timeline allows them to know.',
    unlockAfterCaseId: 'case002',
    unlockLabel: 'Close Case 002',
  },
  {
    id: 'rhea',
    name: 'Rhea Voss',
    role: 'Field Investigator',
    specialty: 'Scene access and location reconstruction',
    profile: 'A careful field operator who documents routes, access points, and the details a desk review can miss.',
    unlockAfterCaseId: 'case003',
    unlockLabel: 'Close Case 003',
  },
] as const;

export const BUREAU_ASSIGNMENT_TARGETS = [
  { id: 'case002', label: 'Case 002 · The Unlit Room' },
  { id: 'case003', label: 'Case 003 · The Black Square' },
  { id: 'case004', label: 'Case 004 · The Last Signal' },
  { id: 'next-case', label: 'Next incoming case' },
  { id: 'daily', label: 'Daily Case Bulletin' },
] as const;

export type BureauAssignment = {
  specialistId: string;
  targetId: string;
  assignedAt: string;
};

export type BureauTeamBoard = {
  version: 1;
  assignments: BureauAssignment[];
};

export const EMPTY_BUREAU_TEAM_BOARD: BureauTeamBoard = {
  version: 1,
  assignments: [],
};

export function getUnlockedBureauSpecialists(archive: InvestigationArchive) {
  const completed = new Set(archive.completedCases.map((record) => record.caseId));
  return BUREAU_SPECIALISTS.filter((specialist) => completed.has(specialist.unlockAfterCaseId));
}

export function assignBureauSpecialist(
  board: BureauTeamBoard,
  specialistId: string,
  targetId: string,
  assignedAt: string,
): BureauTeamBoard {
  const specialistExists = BUREAU_SPECIALISTS.some((specialist) => specialist.id === specialistId);
  const targetExists = BUREAU_ASSIGNMENT_TARGETS.some((target) => target.id === targetId);
  if (!specialistExists || !targetExists) return board;
  const assignments = board.assignments.filter(
    (assignment) => assignment.specialistId !== specialistId && assignment.targetId !== targetId,
  );
  return {
    version: 1,
    assignments: [...assignments, { specialistId, targetId, assignedAt }],
  };
}

export function normalizeBureauTeamBoard(input: unknown, archive: InvestigationArchive): BureauTeamBoard {
  if (!input || typeof input !== 'object') return EMPTY_BUREAU_TEAM_BOARD;
  const saved = input as Partial<BureauTeamBoard>;
  if (!Array.isArray(saved.assignments)) return EMPTY_BUREAU_TEAM_BOARD;
  const unlocked = new Set<string>(getUnlockedBureauSpecialists(archive).map((member) => member.id));
  const completed = new Set(archive.completedCases.map((record) => record.caseId));
  let board = EMPTY_BUREAU_TEAM_BOARD;
  for (const value of saved.assignments) {
    if (!value || typeof value !== 'object') continue;
    const item = value as Partial<BureauAssignment>;
    if (
      typeof item.specialistId !== 'string' ||
      typeof item.targetId !== 'string' ||
      typeof item.assignedAt !== 'string' ||
      !Number.isFinite(Date.parse(item.assignedAt)) ||
      !unlocked.has(item.specialistId) ||
      !BUREAU_ASSIGNMENT_TARGETS.some((target) => target.id === item.targetId) ||
      completed.has(item.targetId)
    ) continue;
    board = assignBureauSpecialist(board, item.specialistId, item.targetId, item.assignedAt);
  }
  return board;
}

export function parseStoredJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function restoreBureauTeamBoard(raw: string | null, archive: InvestigationArchive): BureauTeamBoard {
  return normalizeBureauTeamBoard(parseStoredJson(raw), archive);
}

export function removeBureauAssignment(board: BureauTeamBoard, targetId: string): BureauTeamBoard {
  return {
    version: 1,
    assignments: board.assignments.filter((assignment) => assignment.targetId !== targetId),
  };
}

export const BUREAU_TEAM_SAVE_KEY = 'casezero.bureau-team.v1';

export type BureauSpecialistInsight = {
  title: string;
  detail: string;
};

/**
 * Returns an optional, evidence-gated specialist insight.
 * Specialists interpret only records the player has already inspected or heard.
 */
export function getBureauSpecialistInsight(
  specialistId: string | null,
  caseId: string,
  cluesFound: readonly string[],
  askedQuestions: readonly string[] = [],
): BureauSpecialistInsight | null {
  const hasClues = (...ids: string[]) => ids.every((id) => cluesFound.includes(id));

  if (specialistId === 'inez' && caseId === 'case002' && hasClues('access', 'shelf', 'generator', 'transfer')) {
    return {
      title: 'Inez Shaw · Evidence cross-check',
      detail: 'The access panel places the entry before the power dip, while the transfer tag places the ledger in the dry alcove afterward. The damp shelf gives a reason for the move; the records do not support a removal during the blackout.',
    };
  }

  if (
    specialistId === 'tomas' &&
    caseId === 'case003' &&
    hasClues('printer', 'ledger') &&
    askedQuestions.includes('arden:terminal')
  ) {
    return {
      title: 'Tomas Reed · Statement comparison',
      detail: 'Arden says the terminal log alone cannot identify who typed the job. Compare that statement with the printer record tying the only routing-slip job to the terminal assigned to his desk, then check the cabinet-access entry.',
    };
  }

  if (specialistId === 'rhea' && caseId === 'case004' && hasClues('seal', 'relay', 'docket')) {
    return {
      title: 'Rhea Voss · Transfer reconstruction',
      detail: 'The custody sequence is now visible in the records you inspected: the duplicate key was signed out, the locker was sealed, the maintenance override followed, and the courier collection came last. Separate the approving authority from the person who carried the case.',
    };
  }

  return null;
}

