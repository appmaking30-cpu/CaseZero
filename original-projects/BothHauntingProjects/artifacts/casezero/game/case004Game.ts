import type { InvestigationArchive } from './investigationArchive';

export const CASE_004_GAME = {
  id: 'case004',
  title: 'The Last Signal',
  subtitle: 'Rowan Vale left one final recording. Someone made sure it never reached the Bureau.',
  briefing: 'The Black Square exposed the person altering the Bureau’s files, but Arden’s routing marks point beyond the records annex. A sealed field recorder belonging to Rowan Vale was logged at North Quay Signal House on the night he disappeared. The locker was sealed, the signal system briefly failed, and a maintenance transfer removed an item before the Bureau could collect it. The recorder is gone. The records are not.',
  suspects: [
    { id: 'marr', name: 'Celia Marr', role: 'Signal operator', note: 'Monitored the relay panel and logged the short signal interruption.' },
    { id: 'holt', name: 'Bram Holt', role: 'Maintenance chief', note: 'Controlled the maintenance key set and approved overnight relay work.' },
    { id: 'senn', name: 'Ivo Senn', role: 'Night courier', note: 'Collected sealed maintenance transfers after the signal house closed.' },
  ],
  clues: [
    { id: 'seal', title: 'The recorder locker seal', label: 'Chain of custody', detail: 'The locker was sealed at 20:10 with tag NQ-18. The seal itself is intact, but the register shows a duplicate maintenance key was signed out at 19:55. The recorder’s inventory line is crossed out at 20:22, after the signal interruption.' },
    { id: 'relay', title: 'The relay diagnostic printout', label: 'System record', detail: 'A local override was issued at 20:14 using maintenance key M-2. The command bypassed the normal Bureau collection alert and placed the recorder locker on a maintenance-transfer list. The operator console did not initiate it.' },
    { id: 'lamp', title: 'The signal lamp log', label: 'Timing record', detail: 'The red signal lamp failed at 20:16 and returned to service at 20:18. The failure followed the M-2 override. No incoming train was scheduled during the interruption.' },
    { id: 'docket', title: 'The courier transfer docket', label: 'Delivery record', detail: 'At 20:22, Ivo Senn collected one item under the generic label “relay test unit.” The authorization field contains the same black-square review mark found in the altered Bureau files. The docket names maintenance authority M-2, not the courier, as the approving party.' },
  ],
  witnesses: [
    { id: 'marr', name: 'Celia Marr', role: 'Signal operator', questions: [
      { id: 'override', prompt: 'Who initiated the relay override?', reply: 'The console recorded M-2 at 20:14. That is a maintenance credential, not an operator login. My shift log records the lamp failure two minutes later.' },
      { id: 'train', prompt: 'Was a train due during the signal interruption?', reply: 'No. The timetable shows no arrival or departure between 20:00 and 20:30. The interruption was not needed for traffic safety.' },
    ] },
    { id: 'holt', name: 'Bram Holt', role: 'Maintenance chief', questions: [
      { id: 'key', prompt: 'Who signed out the duplicate M-2 key?', reply: 'The maintenance register should show the person responsible. Duplicate keys are not meant to leave the signal house without a named authorization.' },
      { id: 'transfer', prompt: 'Why was the recorder listed as a relay test unit?', reply: 'That label is used for routine equipment. It keeps the transfer docket short. The approval still has to come from the maintenance authority.' },
    ] },
    { id: 'senn', name: 'Ivo Senn', role: 'Night courier', questions: [
      { id: 'pickup', prompt: 'What did you collect at 20:22?', reply: 'A sealed equipment case. I was told it was a relay test unit. I did not open it, and the docket was already approved when I arrived.' },
      { id: 'approval', prompt: 'Who authorized the collection?', reply: 'The docket carried the M-2 authority code and a black-square mark. I only signed the collection time.' },
    ] },
  ],
  timelineEvents: [
    { id: 'key', time: '19:55', title: 'The duplicate M-2 key is signed out', detail: 'The maintenance register records the key leaving the control desk.' },
    { id: 'seal', time: '20:10', title: 'Rowan’s recorder locker is sealed', detail: 'Tag NQ-18 is entered in the custody register.' },
    { id: 'override', time: '20:14', title: 'The relay receives a local override', detail: 'Maintenance credential M-2 bypasses the collection alert.' },
    { id: 'pickup', time: '20:22', title: 'The courier collects the relabelled case', detail: 'The docket records a relay test unit under M-2 authority.' },
  ],
  correctTimelineOrder: ['key', 'seal', 'override', 'pickup'],
  correctSuspect: 'holt',
  correctMotive: 'silence',
  motives: [
    { id: 'profit', label: 'To sell the recorder for personal gain', note: 'The device was taken as a valuable item.' },
    { id: 'silence', label: 'To suppress Rowan’s recording of the relay network', note: 'The recording could expose who was moving evidence outside normal Bureau channels.' },
    { id: 'revenge', label: 'To punish the signal operator', note: 'The removal was a personal retaliation against Celia Marr.' },
  ],
  truth: 'Bram Holt used the duplicate M-2 maintenance key to place Rowan Vale’s sealed recorder on an unauthorized transfer list. He then arranged for it to be relabelled as routine relay equipment and collected by the courier. The signal interruption was cover for the transfer, not its cause.',
  proof: 'The key register places the duplicate M-2 key with maintenance before the locker was sealed. The diagnostic printout records the override under that credential, and the lamp failure follows it rather than preceding it. The courier docket is later still and identifies M-2 as the approving authority. Ivo Senn collected the case, but the records show he did not authorize the removal.',
  outcome: 'The Bureau suspends all duplicate-key transfers at North Quay and secures the relay logs for an independent audit. Ivo Senn is cleared as the courier who followed an approved-looking docket. Bram Holt is removed from maintenance access pending review. Rowan’s recorder remains missing, but its route is now traceable beyond the signal house.',
} as const;

export type Case004Phase = 'case004Briefing' | 'case004Evidence' | 'case004Interviews' | 'case004Timeline' | 'case004Deduction' | 'case004Review';
export type Case004Progress = {
  cluesFound: string[];
  askedQuestions: string[];
  timelineOrder: string[];
  timelineSolved: boolean;
  selectedSuspect: string | null;
  selectedMotive: string | null;
  completed: boolean;
};
export const EMPTY_CASE004_PROGRESS: Case004Progress = {
  cluesFound: [], askedQuestions: [], timelineOrder: [], timelineSolved: false,
  selectedSuspect: null, selectedMotive: null, completed: false,
};

export function getCase004Carryover(archive: InvestigationArchive) {
  const firstThree = ['case001', 'case002', 'case003'].map((id) =>
    archive.completedCases.find((record) => record.caseId === id),
  );
  const last = firstThree[2];
  return {
    hasCase003: Boolean(last),
    inspectedAcrossCampaign: firstThree.reduce((total, record) => total + (record?.inspectedClues.length ?? 0), 0),
    priorConclusions: firstThree.filter(Boolean).map((record) => record!.caseTitle + ': ' + record!.selectedSuspectId + ' / ' + record!.selectedMotiveId),
    unansweredLeads: firstThree.flatMap((record) => record?.unansweredQuestions ?? []),
    lastFinding: last ? 'The Black Square was tied to Silas Arden and the records supervisor terminal.' : 'The altered routing files remain the starting point.',
  };
}

export function getCase004QuestionReply(witnessId: string, questionId: string, archive: InvestigationArchive): string {
  const witness = CASE_004_GAME.witnesses.find((entry) => entry.id === witnessId);
  const question = witness?.questions.find((entry) => entry.id === questionId);
  if (!question) return '';
  const carryover = getCase004Carryover(archive);
  if (witnessId === 'marr' && questionId === 'override' && carryover.hasCase003) {
    return 'After the Black Square file, the Bureau checks the authority behind every mark. ' + question.reply;
  }
  if (witnessId === 'holt' && questionId === 'key' && carryover.unansweredLeads.length > 0) {
    return 'The earlier files left questions open. This time, follow the key register all the way to the person who signed it out. ' + question.reply;
  }
  return question.reply;
}

export function isCase004TimelineCorrect(order: readonly string[]): boolean {
  return order.length === CASE_004_GAME.correctTimelineOrder.length &&
    order.every((id, index) => id === CASE_004_GAME.correctTimelineOrder[index]);
}
export function isCase004DeductionCorrect(suspectId: string | null, motiveId: string | null): boolean {
  return suspectId === CASE_004_GAME.correctSuspect && motiveId === CASE_004_GAME.correctMotive;
}
