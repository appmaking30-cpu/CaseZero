import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_046_GAME = {
  id: 'case046',
  title: 'The Relief Roster',
  subtitle: 'The handover has a team. The records still do not identify the carrier.',
  location: 'CENTRAL DISPATCH · RELIEF ROSTER & CONSOLE BAY',
  briefing: 'Case 045 established that D-17 was placed in the RELIEF-2 tray at 08:54, but no individual recipient was named. Recover the signed incoming roster and compare it with the independently filed desk allocation, shared console audit and corridor observation. Establish who was assigned—and do not mistake a duty schedule for proof of who physically carried the badge.',
  clues: [
    { id: 'roster', title: 'Signed incoming relief roster', label: 'Shift controller copy · Signed 08:32', detail: 'The signed roster assigns RELIEF-2 to two people for 08:45–09:15: Leena Voss as relief lead and Omar Pell as relief support. Controller Ilya Norr countersigned the roster at 08:32. It authenticates the two-person team and their scheduled window; it contains no individual D-17 collection acknowledgement.' },
    { id: 'deskBoard', title: 'Independent dispatch desk board', label: 'Operations allocation · Filed 08:36', detail: 'A separately filed duty board assigns console DS-2 to Leena Voss from 09:00–09:15 and lists Omar Pell as floor support. The board was posted before the corridor reader event. It establishes scheduled responsibility for a workstation, not Leena’s physical presence there or possession of D-17.' },
    { id: 'consoleAudit', title: 'Shared R2 console session audit', label: 'DS-2 system extract · 09:04–09:11', detail: 'The DS-2 audit records a session under the shared R2 role credential from 09:04 to 09:11. No personal login, badge identifier or individual sign-in is attached. The record proves that the shared session was active; it cannot identify which member of RELIEF-2 operated the console.' },
    { id: 'corridorNote', title: 'Corridor observer timing note', label: 'Security desk statement · 09:05', detail: 'A security desk observer noted one person in a grey relief jacket moving from the corridor toward the console bay at about 09:05. The person’s face was blocked by stacked dispatch carts. Both RELIEF-2 staff were issued the same jacket, so the observation supports movement and timing but cannot distinguish Leena from Omar.' }
  ],
  witnesses: [
    { id: 'controller', name: 'Ilya Norr', role: 'Incoming shift roster controller', questions: [
      { id: 'team', prompt: 'Who was assigned to RELIEF-2 at 08:54?', reply: 'Leena Voss was the relief lead and Omar Pell the relief support. Both were assigned to RELIEF-2 for 08:45–09:15.' },
      { id: 'pickup', prompt: 'Does the signed roster identify who took D-17?', reply: 'No. It records the two-person duty team. There is no individual pickup initial or badge receipt on the roster.' }
    ]},
    { id: 'coordinator', name: 'Tamsin Reeve', role: 'Dispatch desk coordinator', questions: [
      { id: 'desk', prompt: 'Who was assigned to DS-2 from 09:00 to 09:15?', reply: 'The independent board assigns Leena Voss to DS-2. Omar Pell is listed as floor support for the same window.' },
      { id: 'attendance', prompt: 'Does the desk allocation prove Leena was at the console?', reply: 'No. It is a duty allocation, not an attendance check. The shared R2 session has no personal operator field.' }
    ]},
    { id: 'auditor', name: 'Daro Kelm', role: 'Security and console audit officer', questions: [
      { id: 'session', prompt: 'What does the shared R2 session prove?', reply: 'It proves that the shared role session was active at DS-2 from 09:04 to 09:11. It does not identify the person at the keyboard.' },
      { id: 'observation', prompt: 'Can the corridor note identify the person in the grey jacket?', reply: 'No. The observer could not see the face, and both RELIEF-2 members wore the same issued jacket.' }
    ]}
  ],
  timelineEvents: [
    { id: 'roster', time: '08:32', title: 'RELIEF-2 roster signed', detail: 'The controller signs the two-person incoming duty roster.' },
    { id: 'desk', time: '08:36', title: 'DS-2 duty allocation posted', detail: 'The independent board assigns Leena to the console and Omar to floor support.' },
    { id: 'reader', time: '09:02', title: 'D-17 passes corridor reader', detail: 'The authenticated reader event from Case 044 records the shared badge.' },
    { id: 'session', time: '09:04', title: 'Shared R2 console session begins', detail: 'The system records a role-level session, not a personal operator.' }
  ],
  correctOrder: ['roster', 'desk', 'reader', 'session'],
  suspects: [
    { id: 'unknown', name: 'Unidentified RELIEF-2 member', role: 'Two-person duty team · physical carrier unknown', note: 'The roster names Leena and Omar, but no record identifies which member collected or carried D-17.' },
    { id: 'leena', name: 'Leena Voss', role: 'RELIEF-2 lead · DS-2 scheduled operator', note: 'The desk board assigns her to DS-2, but a duty allocation does not prove physical presence or badge possession.' },
    { id: 'omar', name: 'Omar Pell', role: 'RELIEF-2 support · floor assignment', note: 'He is part of the rostered team, but the records do not place him in possession of D-17.' }
  ],
  motives: [
    { id: 'limits', label: 'The roster names Leena and Omar, and the desk board assigns Leena to DS-2, but neither record proves who collected D-17 or used it', note: 'The shared R2 session and indistinguishable corridor observation do not supply the missing personal link.' },
    { id: 'leena', label: 'Leena carried D-17 because DS-2 was assigned to her', note: 'A scheduled workstation assignment is not proof that she was physically present or carried the badge.' },
    { id: 'omar', label: 'Omar carried D-17 because he was the RELIEF-2 support member', note: 'The roster establishes his role, not possession of the shared badge during the reader event.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'limits',
  truth: 'The signed roster assigns Leena Voss and Omar Pell to the two-person RELIEF-2 team. A separate desk board schedules Leena at DS-2, while a shared R2 session and an obscured corridor observation overlap the access window. None of these records identifies who collected or carried D-17.',
  proof: 'The signed roster authenticates the team and shift window; the independent board authenticates scheduled desk duty; the console audit authenticates a shared role session. The corridor observer confirms movement but could not distinguish the two identically dressed staff members.',
  outcome: 'Do not accuse Leena Voss or Omar Pell. The roster and desk board establish assignments, not physical badge custody. The next useful evidence is an individual D-17 pickup acknowledgement, a unique credential tied to the reader event, or an independent witness who can identify a named carrier. Physical desk presence still needs separate proof.'
} as const;

export const CASE_046_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase046Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_046_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    badgeTrailFiles: priorFiles.filter((record) => ['case045', 'case044', 'case043'].includes(record.caseId)).length
  };
}

export function isCase046TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_046_GAME.correctOrder[index]);
}

export function isCase046DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'unknown' && motiveId === 'limits';
}
