import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_012_GAME = {
  id: 'case012',
  title: 'The Door Beside the Terminal',
  subtitle: 'A badge log can map a route. It cannot name the person carrying the badge.',
  location: 'CONTINUITY OPERATIONS VAULT · C-4 ACCESS CORRIDOR',
  briefing: 'Case 011 established that Sable Neri was scheduled as primary C-4 coordinator, while the shared-terminal session did not identify its operator. The Bureau now has the access-control export for the corridor beside C-4-OPS-2. Reconstruct which door connected the logged badge event to the terminal window. Keep the badge assignment, door event and human identity separate.',
  clues: [
    { id: 'plan', title: 'C-4 corridor access plan', label: 'Facilities plan · 01:16', detail: 'The plan shows the south vestibule door opening directly onto the C-4 terminal corridor. The service passage leads to the equipment bay, while the records lift opens on the opposite side of the secure floor.' },
    { id: 'entry', title: 'South vestibule reader event', label: 'Badge event · 01:27', detail: 'Reader S-04 records badge B-17 entering the south vestibule. The assignment table lists B-17 under the primary C-4 duty coordinator, but the reader event does not establish who physically presented the badge.' },
    { id: 'session', title: 'C-4 terminal session window', label: 'Terminal event · 01:29', detail: 'The shared C-4 session begins two minutes after the S-04 entry. This overlap is consistent with access through the south vestibule, but timing alone cannot prove that the badge holder opened the session.' },
    { id: 'exit', title: 'South vestibule exit event', label: 'Badge event · 01:36', detail: 'Reader S-04 records badge B-17 exiting the vestibule seven minutes after the terminal session begins. The corridor camera was in a scheduled maintenance state, so the surviving access export contains no visual identification.' },
  ],
  witnesses: [
    { id: 'nadi', name: 'Nadi Venn', role: 'Access-control technician', questions: [
      { id: 'reader', prompt: 'What does reader S-04 record?', reply: 'It records the badge identifier, direction and time. It does not record a face or confirm that the badge owner was the person presenting it.' },
      { id: 'assignment', prompt: 'Who was B-17 assigned to?', reply: 'The assignment table lists B-17 under the primary C-4 duty coordinator for that shift. Assignment is an administrative record, not proof of who carried it at 01:27.' },
    ] },
    { id: 'oren', name: 'Oren Pike', role: 'Facilities route planner', questions: [
      { id: 'route', prompt: 'Which door leads directly to C-4-OPS-2?', reply: 'The south vestibule. The service passage reaches the equipment bay and the records lift opens across the secure floor.' },
      { id: 'camera', prompt: 'Why is there no camera image for the event?', reply: 'The corridor camera was listed for scheduled maintenance. The maintenance state explains the missing image, but it does not tell us who used the badge.' },
    ] },
    { id: 'lena', name: 'Lena Quill', role: 'Security desk auditor', questions: [
      { id: 'window', prompt: 'Does the badge event overlap the terminal session?', reply: 'Yes. The south vestibule entry is logged at 01:27 and the C-4 session begins at 01:29. The exit appears at 01:36.' },
      { id: 'identity', prompt: 'Can the export identify the person inside the corridor?', reply: 'No. It identifies badge B-17 and reader S-04. The camera was unavailable, and the badge assignment cannot substitute for a visual identification.' },
    ] },
  ],
  timelineEvents: [
    { id: 'plan', time: '01:16', title: 'C-4 corridor access plan filed', detail: 'The facilities plan establishes the door layout.' },
    { id: 'entry', time: '01:27', title: 'Badge B-17 enters at south vestibule', detail: 'Reader S-04 logs an inbound badge event.' },
    { id: 'session', time: '01:29', title: 'C-4 shared-terminal session begins', detail: 'The terminal session opens two minutes after the entry.' },
    { id: 'exit', time: '01:36', title: 'Badge B-17 exits at south vestibule', detail: 'Reader S-04 logs the outbound event.' },
  ],
  correctOrder: ['plan', 'entry', 'session', 'exit'],
  suspects: [
    { id: 'south', name: 'South vestibule', role: 'Direct terminal corridor', note: 'The floor plan connects this door directly to C-4-OPS-2, and its reader records the overlapping badge events.' },
    { id: 'service', name: 'Service passage', role: 'Equipment bay route', note: 'This passage leads to the equipment bay, not the C-4 terminal corridor.' },
    { id: 'lift', name: 'Records lift', role: 'Opposite secure-floor route', note: 'The lift opens on the opposite side of the secure floor and has no matching event in this export.' },
  ],
  motives: [
    { id: 'route', label: 'Confirm the south vestibule as the route matching the terminal window', note: 'The plan, entry, session and exit events form one consistent access sequence.' },
    { id: 'sable', label: 'Prove Sable personally carried badge B-17', note: 'The assignment table names the badge’s administrative owner, not its physical carrier.' },
    { id: 'operator', label: 'Prove the badge carrier opened the C-4 session', note: 'The time overlap supports a possible connection but does not prove who initiated the terminal session.' },
  ],
  correctSuspect: 'south',
  correctMotive: 'route',
  truth: 'The south vestibule is the only documented route that leads directly to C-4-OPS-2 and has badge events bracketing the terminal session: entry at 01:27, session start at 01:29 and exit at 01:36. Badge B-17 is administratively assigned to the primary C-4 coordinator, but the camera was unavailable and the export cannot identify the person carrying it.',
  proof: 'The facilities plan maps the south vestibule to the terminal corridor. Reader S-04 records B-17 entering two minutes before the C-4 session and leaving seven minutes after it begins. The other listed routes do not connect to the terminal in the plan. This establishes the route and timing, not the badge carrier’s identity or the session operator.',
  outcome: 'The Bureau records the south vestibule as the access route consistent with the C-4 session window. It does not identify Sable, Ivo or any other person as the badge carrier. The next request is the badge custody and temporary-loan register for B-17, which may explain whether the credential changed hands before 01:27.',
} as const;

export const CASE_012_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase012Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_012_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    accessTrailFiles: priorFiles.filter((record) => ['case010', 'case011'].includes(record.caseId)).length,
  };
}

export function isCase012TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_012_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_012_GAME.correctOrder[index]);
}

export function isCase012DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_012_GAME.correctSuspect && motiveId === CASE_012_GAME.correctMotive;
}
