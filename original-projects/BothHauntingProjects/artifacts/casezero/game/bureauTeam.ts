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
  { id: 'case028', label: 'Case 028 · The Visitor Register' },
  { id: 'case029', label: 'Case 029 · The Escort Sheet' },
  { id: 'case030', label: 'Case 030 · The Room That Didn’t Register' },
  { id: 'case031', label: 'Case 031 · The Session Without a Name' },
  { id: 'case032', label: 'Case 032 · The Signed Handover' },
  { id: 'case033', label: 'Case 033 · The Receipt at 07:24' },
  { id: 'case034', label: 'Case 034 · The Revision in the Margin' },
  { id: 'case035', label: 'Case 035 · The Page from Annex K-17' },
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


  // The late dispatch arc deliberately separates presence, route intent, room occupancy,
  // and identity. Each specialist insight is gated by the records the player has inspected.
  if (specialistId === 'inez' && caseId === 'case035' && hasClues('scan', 'index', 'intake', 'routing')) {
    return {
      title: 'Inez Shaw · Source integrity review',
      detail: 'The scan checksum matches the Annex K-17 index. The intake register and countersigned routing slip establish the packet’s recorded custody path, but neither identifies the original courier or author of the routing mark.',
      rankPerk,
    };
  }

  if (specialistId === 'tomas' && caseId === 'case035' &&
      askedQuestions.includes('mara:packet') && askedQuestions.includes('elias:notation')) {
    return {
      title: 'Tomas Reed · Statement boundary review',
      detail: 'Mara confirms that the receiving register names a desk rather than a courier. Elias confirms that “R.V.” has no approved identity key. Neither witness can turn the initials or custody notation into a named handler.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case035' && hasClues('intake', 'routing', 'index')) {
    return {
      title: 'Rhea Voss · Archive route reconstruction',
      detail: 'The packet moved from receiving at 06:48 to the restricted shelf at 06:52, then entered the K-17 index at 07:02. The later R-15 scan matches that folio, completing the documented route without proving who carried it.',
      rankPerk,
    };
  }

  if (specialistId === 'inez' && caseId === 'case034' && hasClues('manifest', 'revision', 'ledger', 'receipt')) {
    return {
      title: 'Inez Shaw · Revision integrity review',
      detail: 'The manifest records R-14, the comparison sheet records R-15, and the receipt checksum matches R-15. The ledger identifies only the shared profile, so the revision sequence is verified while its individual submitter remains unknown.',
      rankPerk,
    };
  }

  if (specialistId === 'tomas' && caseId === 'case034' &&
      askedQuestions.includes('niko:edit') && askedQuestions.includes('mara:scope')) {
    return {
      title: 'Tomas Reed · Attribution boundary review',
      detail: 'Niko separates his later receipt acknowledgement from the earlier revision, and Mara confirms the profile was shared. Their statements align with the timestamps but do not identify the person who submitted R-15.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case034' && hasClues('manifest', 'revision', 'receipt')) {
    return {
      title: 'Rhea Voss · Export sequence reconstruction',
      detail: 'The package moved from R-14 to R-15 before the receipt was acknowledged. The checksum closes the version trail; no personal token links that change to a named operator.',
      rankPerk,
    };
  }

  if (specialistId === 'inez' && caseId === 'case028' && hasClues('visitor', 'badge', 'purpose', 'exit')) {
    return {
      title: 'Inez Shaw · Reception evidence review',
      detail: 'The signed visitor register and personal badge independently support Ivo’s presence in reception. The reader coverage map and purpose slip limit that finding: neither record connects him to terminal D-3, the shared credential, or the H-9 edit.',
      rankPerk,
    };
  }

  if (specialistId === 'tomas' && caseId === 'case028' &&
      askedQuestions.includes('pavel:limit') && askedQuestions.includes('sana:window')) {
    return {
      title: 'Tomas Reed · Visitor statement comparison',
      detail: 'The registrar confirms the badge reader covers reception only, while the auditor confirms the visit overlaps the team checkout window. Those facts explain why the times coincide without proving Ivo used the shared credential.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case028' && hasClues('visitor', 'badge', 'exit')) {
    return {
      title: 'Rhea Voss · Reception route reconstruction',
      detail: 'The entry and exit records keep Ivo inside the reception zone for a short visit. No inspected record traces a route from reception to the terminal desks, so do not extend the mapped path beyond the reader coverage.',
      rankPerk,
    };
  }

  if (specialistId === 'inez' && caseId === 'case029' && hasClues('request', 'assignment', 'checkpoint', 'room')) {
    return {
      title: 'Inez Shaw · Escort record audit',
      detail: 'The request proves intent and the stub proves assignment acceptance. The checkpoint records Mara’s staff badge only, while the reconciled room ledger contains no visitor entry for Ivo. The records do not prove the escort was completed.',
      rankPerk,
    };
  }

  if (specialistId === 'tomas' && caseId === 'case029' &&
      askedQuestions.includes('mara:assignment') && askedQuestions.includes('sana:limit')) {
    return {
      title: 'Tomas Reed · Escort statement comparison',
      detail: 'Mara confirms she accepted the assignment but not that she collected Ivo. Sana confirms the records cannot place him inside D-3. Read the acceptance and checkpoint as separate facts, not as a completed journey.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case029' && hasClues('assignment', 'checkpoint', 'room')) {
    return {
      title: 'Rhea Voss · Corridor route reconstruction',
      detail: 'The corridor checkpoint is a staff-badge event, not a visitor movement record. The separate D-3 ledger has no Ivo entry. The route has a documented checkpoint but no verified visitor arrival at the destination.',
      rankPerk,
    };
  }

  if (specialistId === 'inez' && caseId === 'case030' && hasClues('occupancy', 'door', 'clock')) {
    return {
      title: 'Inez Shaw · Independent record cross-check',
      detail: 'Clock correction aligns the door event with the short occupancy interval. The counter establishes one occupant and the door export establishes an accepted masked staff credential; neither record supplies a name. Timing agreement is not identity proof.',
      rankPerk,
    };
  }

  if (specialistId === 'tomas' && caseId === 'case030' &&
      askedQuestions.includes('pavel:door') && askedQuestions.includes('sana:limit')) {
    return {
      title: 'Tomas Reed · Identity-limit interview review',
      detail: 'Pavel confirms the credential export masks its holder, and Sana confirms the aligned records still cannot identify the occupant. The interviews agree on the key limit: the room event is supported, but the person is unresolved.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case030' && hasClues('radio', 'occupancy', 'door', 'clock')) {
    return {
      title: 'Rhea Voss · Room-event reconstruction',
      detail: 'The radio log places Mara at the approach, the corrected counter interval records brief occupancy, and the door event records a masked staff credential. These records support a room event but do not establish who crossed the threshold.',
      rankPerk,
    };
  }


  if (specialistId === 'inez' && caseId === 'case031' && hasClues('session', 'policy', 'export', 'request')) {
    return {
      title: 'Inez Shaw · Shared-profile evidence review',
      detail: 'The audit confirms DISPATCH-OPS was active, while policy confirms it is a team profile. The export has no personal token and the credential cross-reference is still pending. The records establish session activity, not a named operator.',
      rankPerk,
    };
  }

  if (specialistId === 'tomas' && caseId === 'case031' &&
      askedQuestions.includes('mara:handover') && askedQuestions.includes('sana:limit')) {
    return {
      title: 'Tomas Reed · Operator attribution review',
      detail: 'Mara confirms there is no signed operator handover in the file, and Sana confirms the shared profile does not identify a person. Their statements agree on the missing link: no contemporaneous record names the operator.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case031' && hasClues('occupancy', 'session', 'export')) {
    return {
      title: 'Rhea Voss · Terminal activity reconstruction',
      detail: 'The corrected occupancy interval and terminal audit place the shared profile on D-3 during the same short window. That establishes a session at the terminal, but the profile and export do not identify who was there.',
      rankPerk,
    };
  }

  if (specialistId === 'inez' && caseId === 'case032' && hasClues('roster', 'ledger', 'handover', 'variance')) {
    return {
      title: 'Inez Shaw · Handover document audit',
      detail: 'The roster and desk ledger establish Blue Team responsibility, while the signed handover confirms the transfer time. The blank operator field remains an explicit gap; none of these records names the person at D-3.',
      rankPerk,
    };
  }

  if (specialistId === 'tomas' && caseId === 'case032' &&
      askedQuestions.includes('eli:sign') && askedQuestions.includes('sana:limit')) {
    return {
      title: 'Tomas Reed · Responsibility statement comparison',
      detail: 'Eli describes the signature as a team-level transfer, and Sana confirms that the roster cannot identify an individual terminal user. Their accounts support responsibility for the desk, not personal operation of D-3.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case032' && hasClues('roster', 'handover', 'variance')) {
    return {
      title: 'Rhea Voss · Shift sequence reconstruction',
      detail: 'The roster precedes the signed transfer, which in turn precedes the D-3 session. The sequence establishes that Blue Team held desk responsibility when the session opened, but does not establish which team member used the terminal.',
      rankPerk,
    };
  }

  if (specialistId === 'inez' && caseId === 'case033' && hasClues('receipt', 'signature', 'queue', 'scope')) {
    return {
      title: 'Inez Shaw · Receipt validation review',
      detail: 'The receipt carries a personal badge signature and credential services validates it to Niko Vale. The queue manifest identifies D-3 as the package source, while the scope note limits the personal attribution to the 07:24 acknowledgement.',
      rankPerk,
    };
  }

  if (specialistId === 'tomas' && caseId === 'case033' &&
      askedQuestions.includes('niko:session') && askedQuestions.includes('sana:limit')) {
    return {
      title: 'Tomas Reed · Statement boundary review',
      detail: 'Niko distinguishes acknowledging the export from opening the earlier session, and Sana confirms the same boundary from the audit records. Their statements support one attributed action, not a retroactive operator identity.',
      rankPerk,
    };
  }

  if (specialistId === 'rhea' && caseId === 'case033' && hasClues('queue', 'receipt', 'signature')) {
    return {
      title: 'Rhea Voss · Terminal sequence reconstruction',
      detail: 'The queue entry precedes the receipt by one minute, and the later validation identifies the badge used for acknowledgement. The chronology links the package to D-3 and the receipt to Niko, but not Niko to the earlier session.',
      rankPerk,
    };
  }

  return null;
}

