import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_007_GAME = {
  id: 'case007',
  title: 'The Relay at Station Three',
  subtitle: 'A hidden destination is not a dead end. It is a place with a door, a log and a person on shift.',
  briefing: 'The recovered recorder points to a relay desk. A sealed pouch was routed through Station Three, a municipal communications exchange that no longer appears on the public directory. The Bureau arrives after the night shift has ended. Four records survived the handover. Establish who physically received the pouch, and keep that answer separate from the still-unknown authority that ordered the transfer.',
  location: 'STATION THREE · MUNICIPAL EXCHANGE',
  clues: [
    { id: 'routing', title: 'Relay routing slip', label: 'Carbon copy · logged 22:18', detail: 'A sealed pouch marked M-2 / R-3 was accepted at the Station Three counter at 22:18. The recipient field carries the initials A.M. The authorizing signature field is blank.' },
    { id: 'switchboard', title: 'Switchboard maintenance log', label: 'Circuit R-3 · logged 22:21', detail: 'Circuit R-3 was opened under a maintenance override. The operator code belongs to the Station Three night desk. The log records a connection, not the identity of the person who ordered it.' },
    { id: 'roster', title: 'Night shift roster', label: 'Three staff on duty', detail: 'Ada Mercer was assigned to the relay counter. Jon Bell was the maintenance runner. Pavel Orr was the shift supervisor. Only the counter assignment explains the A.M. initials on the receiving slip.' },
    { id: 'call-index', title: 'Duplicate call index', label: 'Public copy · corrected 22:29', detail: 'The public index lists the R-3 connection as a routine maintenance check. A duplicate carbon retains the M-2 routing reference, showing that the public description was incomplete.' },
  ],
  witnesses: [
    { id: 'ada', name: 'Ada Mercer', role: 'Relay counter operator', questions: [
      { id: 'receipt', prompt: 'Did you receive the sealed M-2 pouch?', reply: 'I signed the counter copy. I was told it was a maintenance transfer. No one gave me a sender name.' },
      { id: 'sender', prompt: 'Who authorized the handover?', reply: 'The authorization field was blank when it reached me. I handled the receipt, not the instruction.' },
    ] },
    { id: 'jon', name: 'Jon Bell', role: 'Maintenance runner', questions: [
      { id: 'circuit', prompt: 'Why was circuit R-3 opened?', reply: 'The desk requested a maintenance channel. I opened the circuit. The request carried an M-2 reference but no personal signature.' },
      { id: 'pouch', prompt: 'Did you handle the sealed pouch?', reply: 'No. I worked the switchboard only. The counter operator logged the physical receipt.' },
    ] },
    { id: 'pavel', name: 'Pavel Orr', role: 'Night shift supervisor', questions: [
      { id: 'approval', prompt: 'Did you authorize the M-2 transfer?', reply: 'I approved the routine circuit check, not the sealed transfer. The instruction arrived through a channel above this station.' },
      { id: 'index', prompt: 'Why does the public index omit M-2?', reply: 'The public index was corrected after the connection. I signed the correction as a routine classification, not as proof of who issued the instruction.' },
    ] },
  ],
  timelineEvents: [
    { id: 'receipt', time: '22:18', title: 'Pouch accepted at relay counter', detail: 'Routing slip records A.M. as recipient.' },
    { id: 'circuit', time: '22:21', title: 'R-3 maintenance circuit opened', detail: 'Switchboard log records the M-2 reference.' },
    { id: 'connection', time: '22:24', title: 'Sealed connection established', detail: 'Duplicate call index preserves the restricted routing code.' },
    { id: 'correction', time: '22:29', title: 'Public index corrected', detail: 'The public description is changed to routine maintenance.' },
  ],
  correctOrder: ['receipt', 'circuit', 'connection', 'correction'],
  suspects: [
    { id: 'ada', name: 'Ada Mercer', role: 'Relay counter operator', note: 'Her initials appear on the receiving slip.' },
    { id: 'jon', name: 'Jon Bell', role: 'Maintenance runner', note: 'He opened the R-3 circuit but did not receive the pouch.' },
    { id: 'pavel', name: 'Pavel Orr', role: 'Shift supervisor', note: 'He signed the later public-index correction.' },
  ],
  motives: [
    { id: 'receipt', label: 'Physically receive and log the sealed pouch', note: 'The question is who handled the handover, not who created the order.' },
    { id: 'authorize', label: 'Issue the upstream M-2 instruction', note: 'No record at Station Three identifies the upstream authorizer.' },
    { id: 'erase', label: 'Remove all trace of the transfer', note: 'The duplicate call index preserved the M-2 reference.' },
  ],
  correctSuspect: 'ada',
  correctMotive: 'receipt',
  truth: 'Ada Mercer physically received and logged the sealed pouch at Station Three. The switchboard records show that Jon Bell opened the R-3 circuit, while Pavel Orr signed the later public-index correction. None of those actions identifies the upstream M-2 authorizer.',
  proof: 'The routing slip carries A.M. in the recipient field, and the roster assigns Ada to the relay counter. Bell’s log concerns the circuit, while Orr’s signature appears only on the later index correction. The records distinguish receipt, connection and classification.',
  outcome: 'The Bureau confirms Station Three as a real relay point and secures its duplicate index. Ada’s receipt is entered as a verified handover, not as proof of conspiracy. The M-2 authorizer remains unidentified. A second relay address appears in the retained index.',
} as const;

export const CASE_007_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function isCase007TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_007_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_007_GAME.correctOrder[index]);
}

export function isCase007DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_007_GAME.correctSuspect && motiveId === CASE_007_GAME.correctMotive;
}

export function getCase007Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_007_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
  };
}
