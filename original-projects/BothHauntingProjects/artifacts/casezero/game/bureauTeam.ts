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
  { id: 'case005', label: 'Case 005 · The Empty Ledger' },
  { id: 'case006', label: 'Case 006 · The Voice Between Stations' },
  { id: 'case007', label: 'Case 007 · The Relay at Station Three' },
  { id: 'case008', label: 'Case 008 · The Second Address' },
  { id: 'case009', label: 'Case 009 · The Third Reference' },
  { id: 'case010', label: 'Case 010 · The Names Behind the Seal' },
  { id: 'case011', label: 'Case 011 · The Rotation Ledger' },
  { id: 'case012', label: 'Case 012 · The Door Beside the Terminal' },
  { id: 'case013', label: 'Case 013 · The Borrowed Badge' },
  { id: 'case014', label: "Case 014 · The Reader's Exception" },
  { id: 'case015', label: 'Case 015 · The Floor Between' },
  { id: 'case016', label: 'Case 016 · The Inner-Door Record' },
  { id: 'case017', label: 'Case 017 · The Shared Account' },
  { id: 'case018', label: 'Case 018 · The Key Cabinet' },
  { id: 'case019', label: 'Case 019 · The Missing Receipt' },
  { id: 'case020', label: 'Case 020 · The Receiving End' },
  { id: 'case021', label: 'Case 021 · The Intake Roster' },
  { id: 'case022', label: 'Case 022 · The Sealed Register' },
  { id: 'case023', label: 'Case 023 · The Empty Amendment' },
  { id: 'case024', label: 'Case 024 · The First Copy' },
  { id: 'case025', label: 'Case 025 · The Print Queue' },
  { id: 'case026', label: 'Case 026 · The Source File' },
  { id: 'case027', label: 'Case 027 · The Handover Note' },
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
  experienceBySpecialist?: Record<string, number>;
  rewardedCaseIds?: string[];
};

export const EMPTY_BUREAU_TEAM_BOARD: BureauTeamBoard = {
  version: 1,
  assignments: [],
  experienceBySpecialist: {},
  rewardedCaseIds: [],
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
    ...board,
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
  return {
    ...board,
    experienceBySpecialist: normalizeExperience(saved.experienceBySpecialist),
    rewardedCaseIds: Array.isArray(saved.rewardedCaseIds)
      ? [...new Set(saved.rewardedCaseIds.filter((id): id is string => typeof id === 'string'))]
      : [],
  };
}

function normalizeExperience(input: unknown): Record<string, number> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};
  const result: Record<string, number> = {};
  for (const specialist of BUREAU_SPECIALISTS) {
    const value = (input as Record<string, unknown>)[specialist.id];
    if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
      result[specialist.id] = Math.floor(value);
    }
  }
  return result;
}

export function getBureauSpecialistProgress(board: BureauTeamBoard, specialistId: string) {
  const experience = board.experienceBySpecialist?.[specialistId] ?? 0;
  const rank = Math.min(2, Math.floor(experience / 2));
  return {
    experience,
    rank,
    rankLabel: rank === 0 ? 'FIELD TRAINEE' : rank === 1 ? 'CASE SPECIALIST' : 'SENIOR SPECIALIST',
    progressToNextRank: rank >= 2 ? 2 : experience % 2,
    experienceForNextRank: rank >= 2 ? 0 : 2 - (experience % 2),
  };
}

/** Awards one experience point when the specialist assigned to a file sees it closed. */
export function awardBureauCaseExperience(board: BureauTeamBoard, caseId: string): BureauTeamBoard {
  if (board.rewardedCaseIds?.includes(caseId)) return board;
  const assignment = board.assignments.find((item) => item.targetId === caseId);
  if (!assignment) return board;
  const experienceBySpecialist = { ...(board.experienceBySpecialist ?? {}) };
  experienceBySpecialist[assignment.specialistId] = (experienceBySpecialist[assignment.specialistId] ?? 0) + 1;
  return {
    ...board,
    assignments: board.assignments.filter((item) => item.targetId !== caseId),
    experienceBySpecialist,
    rewardedCaseIds: [...(board.rewardedCaseIds ?? []), caseId],
  };
}

/** Awards one daily-file XP per local date to the specialist assigned to the bulletin. */
export function awardBureauDailyExperience(board: BureauTeamBoard, dateKey: string): BureauTeamBoard {
  const rewardId = `daily:${dateKey}`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey) || board.rewardedCaseIds?.includes(rewardId)) return board;
  const assignment = board.assignments.find((item) => item.targetId === 'daily');
  if (!assignment) return board;
  const experienceBySpecialist = { ...(board.experienceBySpecialist ?? {}) };
  experienceBySpecialist[assignment.specialistId] = (experienceBySpecialist[assignment.specialistId] ?? 0) + 1;
  return {
    ...board,
    experienceBySpecialist,
    rewardedCaseIds: [...(board.rewardedCaseIds ?? []), rewardId],
  };
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
    ...board,
    version: 1,
    assignments: board.assignments.filter((assignment) => assignment.targetId !== targetId),
  };
}

export const BUREAU_TEAM_SAVE_KEY = 'casezero.bureau-team.v1';

export type BureauSpecialistInsight = {
  title: string;
  detail: string;
  rankPerk: string | null;
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
  rank = 0,
): BureauSpecialistInsight | null {
  const hasClues = (...ids: string[]) => ids.every((id) => cluesFound.includes(id));
  const rankPerk = rank >= 2
    ? 'Senior review: Before filing your conclusion, identify one record that independently confirms the sequence and one that only provides context. Keep those roles separate.'
    : rank >= 1
      ? 'Specialist review: Recheck the timestamps against the physical evidence. A matching sequence supports an explanation; it does not automatically prove who performed every action.'
      : null;

  if (specialistId === 'inez' && caseId === 'case002' && hasClues('access', 'shelf', 'generator', 'transfer')) {
    return {
      title: 'Inez Shaw · Evidence cross-check',
      detail: 'The access panel places the entry before the power dip, while the transfer tag places the ledger in the dry alcove afterward. The damp shelf gives a reason for the move; the records do not support a removal during the blackout.',
      rankPerk,
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
      rankPerk,
    };
  }

  if (specialistId === 'inez' && caseId === 'case005' && hasClues('carbon', 'ledger')) {
    return {
      title: 'Inez Shaw · Chain-of-custody review',
      detail: 'The carbon receipt names Locker 14, while the receiving ledger records SQ-7 opening it. Treat the signature and credential as two separate records that corroborate the same receiving desk; neither alone explains the later audit correction.',
      rankPerk,
    };
  }

  if (
    specialistId === 'tomas' &&
    caseId === 'case005' &&
    askedQuestions.includes('dane:signature') &&
    askedQuestions.includes('quill:copy')
  ) {
    return {
      title: 'Tomas Reed · Interview comparison',
      detail: 'Dane places S.Q. at the receiving hatch and says the courier left before the locker opened. Quill’s explanation about an incomplete carbon does not account for the matching SQ-7 access record. Compare each statement with the time-stamped documents.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case005' && hasClues('ledger', 'gate', 'audit')) {
    return {
      title: 'Rhea Voss · Transfer sequence review',
      detail: 'The gate sheet places Dane away from the registry before SQ-7 opens Locker 14. The later audit only reports the count as cleared. The sequence distinguishes the courier’s delivery from the registrar’s control of the locker.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case004' && hasClues('seal', 'relay', 'docket')) {
    return {
      title: 'Rhea Voss · Transfer reconstruction',
      detail: 'The custody sequence is now visible in the records you inspected: the duplicate key was signed out, the locker was sealed, the maintenance override followed, and the courier collection came last. Separate the approving authority from the person who carried the case.',
      rankPerk,
    };
  }

  return null;
}

