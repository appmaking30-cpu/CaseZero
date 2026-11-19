import type { InvestigationArchive } from './investigationArchive';
import { getCase002Carryover, CASE_002 } from './case002';

export const CASE_002_GAME = {
  ...CASE_002,
  suspects: [
    { id: 'mara', name: 'Mara Venn', role: 'Night auditor', note: 'Held the archive-room desk and guest-record keys.' },
    { id: 'ellis', name: 'Ellis Ward', role: 'Hotel electrician', note: 'Worked the backup generator during the power dip.' },
    { id: 'june', name: 'June Bell', role: 'Housekeeper', note: 'Moved linen carts through the archive wing.' },
  ],
  clues: [
    { id: 'access', title: 'The access-panel printout', label: 'Entry record', detail: 'The archive door opened with June Bell’s master key at 02:09 and registered closed at 02:11. The lock then remained engaged. No second opening was recorded during the blackout.' },
    { id: 'shelf', title: 'The damp shelf', label: 'Scene evidence', detail: 'A thin line of water runs behind the ledger shelf. A clean, dry rectangle shows where the heavy guest ledger had rested. The pipe above the shelf has a fresh maintenance tag.' },
    { id: 'generator', title: 'The generator log', label: 'Power record', detail: 'A voltage dip began at 02:13 and lasted ninety seconds. Backup lights activated automatically. The archive door sensor shows no movement during the outage.' },
    { id: 'transfer', title: 'The linen transfer tag', label: 'Inventory record', detail: 'At 02:16, the guest ledger was logged in the dry linen alcove. The transfer is signed J.B. and notes: “Moved away from the leaking shelf; cover kept dry.”' },
  ],
  witnesses: [
    { id: 'tomas', name: 'Tomas Reed', role: 'Bellhop', questions: [
      { id: 'cart', prompt: 'What did you hear in the archive wing?', reply: 'A linen cart rolled past at about 02:10. It stopped briefly by the archive door, then continued toward the service alcove.' },
      { id: 'person', prompt: 'Did you see who was pushing it?', reply: 'Only the housekeeper’s green sleeve. I heard the cart wheel click twice over the threshold.' },
    ] },
    { id: 'mara', name: 'Mara Venn', role: 'Night auditor', questions: [
      { id: 'ledger', prompt: 'When did you last see the guest ledger?', reply: 'Just after two. It was on the archive shelf. I did not open the room again after June used the master key.' },
      { id: 'key', prompt: 'Who had access before the power dip?', reply: 'June signed out the master key at 02:08. The panel should show her entry and the door closing.' },
    ] },
    { id: 'ellis', name: 'Ellis Ward', role: 'Hotel electrician', questions: [
      { id: 'outage', prompt: 'What caused the ninety-second blackout?', reply: 'A voltage dip in the generator transfer circuit. It triggered the backup lights. It did not unlock or cycle the archive door.' },
      { id: 'water', prompt: 'Was there a leak near the archive shelf?', reply: 'Yes. Maintenance flagged the pipe earlier that night. I had not reached the shelf before the ledger was moved.' },
    ] },
  ],
  timelineEvents: [
    { id: 'access', time: '02:09', title: 'June’s master key opens the archive', detail: 'The access panel records the entry.' },
    { id: 'closed', time: '02:11', title: 'The archive door closes and locks', detail: 'No further opening is recorded.' },
    { id: 'outage', time: '02:13', title: 'The generator voltage dips', detail: 'Backup lights activate for ninety seconds.' },
    { id: 'transfer', time: '02:16', title: 'The ledger is logged in the dry alcove', detail: 'The transfer tag is signed J.B.' },
  ],
  correctTimelineOrder: ['access', 'closed', 'outage', 'transfer'],
  correctSuspect: 'june',
  correctMotive: 'protect',
  motives: [
    { id: 'steal', label: 'To sell private guest information', note: 'The ledger was taken for personal gain.' },
    { id: 'cover', label: 'To hide an accounting mistake', note: 'The ledger was removed to conceal a hotel error.' },
    { id: 'protect', label: 'To protect it from the leaking pipe', note: 'The ledger was moved to a dry place before it could be damaged.' },
  ],
  truth: 'June Bell moved the guest ledger before the power dip, after noticing water reaching the archive shelf. The locked-room mystery was a false assumption: the ledger had already been moved before the lights went out.',
  proof: 'The access panel places June inside at 02:09 and records the door closing at 02:11. Tomas heard the linen cart in that window. The generator log proves the outage began later, at 02:13, and the door never opened during it. The damp shelf explains the urgency, while the 02:16 transfer tag records the ledger in the dry alcove under June’s initials.',
  outcome: 'The guest ledger is recovered with its pages intact. The pipe is repaired, the access log is added to the night report, and the hotel changes its emergency document-storage procedure.',
} as const;

export type Case002Phase = 'case002Briefing' | 'case002Evidence' | 'case002Interviews' | 'case002Timeline' | 'case002Deduction' | 'case002Review';

export type Case002Progress = {
  cluesFound: string[];
  askedQuestions: string[];
  timelineOrder: string[];
  timelineSolved: boolean;
  selectedSuspect: string | null;
  selectedMotive: string | null;
  completed: boolean;
};

export const EMPTY_CASE002_PROGRESS: Case002Progress = {
  cluesFound: [],
  askedQuestions: [],
  timelineOrder: [],
  timelineSolved: false,
  selectedSuspect: null,
  selectedMotive: null,
  completed: false,
};


function uniqueKnownCase002Values(value: unknown, allowedValues: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(allowedValues);
  const seen = new Set<string>();
  const restored: string[] = [];
  for (const item of value) {
    if (typeof item === 'string' && allowed.has(item) && !seen.has(item)) {
      seen.add(item);
      restored.push(item);
    }
  }
  return restored;
}

function restoreCase002TimelineOrder(value: unknown): string[] {
  if (!Array.isArray(value) || value.length > CASE_002_GAME.timelineEvents.length) return [];
  const allowed = new Set(CASE_002_GAME.timelineEvents.map((event) => event.id));
  const seen = new Set<string>();
  const restored: string[] = [];
  for (const item of value) {
    if (typeof item !== 'string' || !allowed.has(item) || seen.has(item)) return [];
    seen.add(item);
    restored.push(item);
  }
  return restored;
}

/** Restore only known evidence and conclusions supported by the full investigation gates. */
export function sanitizeCase002SavedProgress(value: unknown): Case002Progress {
  const saved = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const cluesFound = uniqueKnownCase002Values(
    saved.cluesFound,
    CASE_002_GAME.clues.map((clue) => clue.id),
  );
  const askedQuestions = uniqueKnownCase002Values(
    saved.askedQuestions,
    CASE_002_GAME.witnesses.flatMap((witness) =>
      witness.questions.map((question) => `${witness.id}:${question.id}`),
    ),
  );
  const timelineOrder = restoreCase002TimelineOrder(saved.timelineOrder);
  const allCluesFound = cluesFound.length === CASE_002_GAME.clues.length;
  const allWitnessesHeard = CASE_002_GAME.witnesses.every((witness) =>
    witness.questions.some((question) => askedQuestions.includes(`${witness.id}:${question.id}`)),
  );
  const timelineSolved =
    saved.timelineSolved === true &&
    allCluesFound &&
    allWitnessesHeard &&
    isCase002TimelineCorrect(timelineOrder);
  const suspectCandidate = saved.selectedSuspect;
  const motiveCandidate = saved.selectedMotive;
  const selectedSuspect =
    timelineSolved &&
    typeof suspectCandidate === 'string' &&
    CASE_002_GAME.suspects.some((suspect) => suspect.id === suspectCandidate)
      ? suspectCandidate
      : null;
  const selectedMotive =
    timelineSolved &&
    typeof motiveCandidate === 'string' &&
    CASE_002_GAME.motives.some((motive) => motive.id === motiveCandidate)
      ? motiveCandidate
      : null;
  const completed =
    saved.completed === true &&
    timelineSolved &&
    isCase002DeductionCorrect(selectedSuspect, selectedMotive);

  return {
    cluesFound,
    askedQuestions,
    timelineOrder,
    timelineSolved,
    selectedSuspect,
    selectedMotive,
    completed,
  };
}

export function getCase002ResumePhase(progress: Case002Progress): Case002Phase {
  if (progress.completed) return 'case002Review';
  if (progress.timelineSolved) return 'case002Deduction';
  const allCluesFound = CASE_002_GAME.clues.every((clue) => progress.cluesFound.includes(clue.id));
  if (!allCluesFound) {
    const hasProgress =
      progress.cluesFound.length > 0 ||
      progress.askedQuestions.length > 0 ||
      progress.timelineOrder.length > 0;
    return hasProgress ? 'case002Evidence' : 'case002Briefing';
  }
  const allWitnessesHeard = CASE_002_GAME.witnesses.every((witness) =>
    witness.questions.some((question) =>
      progress.askedQuestions.includes(`${witness.id}:${question.id}`),
    ),
  );
  return allWitnessesHeard ? 'case002Timeline' : 'case002Interviews';
}

export function getCase002QuestionReply(
  witnessId: string,
  questionId: string,
  archive: InvestigationArchive,
): string {
  const question = CASE_002_GAME.witnesses
    .find((witness) => witness.id === witnessId)?.questions
    .find((entry) => entry.id === questionId);
  if (!question) return '';
  const carryover = getCase002Carryover(archive);
  if (witnessId === 'ellis' && questionId === 'water' && carryover.hasPriorCase) {
    return carryover.fieldLesson + ' ' + question.reply;
  }
  if (witnessId === 'mara' && questionId === 'key' && carryover.unansweredLead) {
    return 'You left a question unanswered in ' + (carryover.priorCaseTitle ?? 'your previous file') + '. This time, check the access record rather than relying on a witness’s memory. ' + question.reply;
  }
  return question.reply;
}

export function isCase002TimelineCorrect(order: readonly string[]): boolean {
  return order.length === CASE_002_GAME.correctTimelineOrder.length &&
    order.every((id, index) => id === CASE_002_GAME.correctTimelineOrder[index]);
}

export function isCase002DeductionCorrect(suspectId: string | null, motiveId: string | null): boolean {
  return suspectId === CASE_002_GAME.correctSuspect && motiveId === CASE_002_GAME.correctMotive;
}
