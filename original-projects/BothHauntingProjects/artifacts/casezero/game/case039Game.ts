import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_039_GAME = {
  id: 'case039',
  title: 'The Station Without an Operator',
  subtitle: 'The queue audit identifies the workstation that made the reservation—but not the person at its keyboard.',
  location: 'CENTRAL DISPATCH · SYSTEMS AUDIT ROOM',
  briefing: 'Case 038 established that Q-19 was created before cart M-4 left the restricted office, using a shared priority account available at two stations. A deeper terminal audit has now recovered the station identifier: DS-1, the dispatch supervisor desk. But the session used a shared login, and the badge-proximity extract contains no personal match. Determine what the terminal evidence establishes and what remains unproven about the operator.',
  clues: [
    { id: 'terminal', title: 'Q-19 terminal audit extract', label: 'Systems audit · 09:12', detail: 'The recovered audit ties creation of Q-19 to workstation DS-1, the dispatch supervisor desk. The event records a shared priority session, not a personal account.' },
    { id: 'session', title: 'Shared-session sign-in record', label: 'Identity service · 09:09', detail: 'The workstation opened a shared priority session at 09:09. The credential is assigned to the desk function and may be used by authorized shift staff. It does not name the person who signed in.' },
    { id: 'proximity', title: 'Badge-proximity extract', label: 'Door and console audit · 09:08–09:14', detail: 'The console zone recorded no personal badge association during the session window. The extract cannot establish who was physically at the keyboard, and absence of a badge event is not proof that a particular person was absent.' },
    { id: 'print', title: 'Queue confirmation print slip', label: 'Dispatch printer · 09:13', detail: 'A confirmation slip for Q-19 printed at DS-1 one minute after the ticket was created. It corroborates the workstation activity, but the printer records the station rather than the staff member who requested the job.' }
  ],
  witnesses: [
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch supervisor', questions: [
      { id: 'station', prompt: 'What does DS-1 identify?', reply: 'It is the dispatch supervisor desk. The terminal audit can identify that workstation, but the shared session means it cannot identify the individual operator.' },
      { id: 'staff', prompt: 'Who was authorized to use the desk?', reply: 'The shift supervisor and assigned dispatch systems staff could use it. The audit extract does not contain a signed desk handover for that exact minute.' }
    ]},
    { id: 'niko', name: 'Niko Vale', role: 'Dispatch systems clerk', questions: [
      { id: 'login', prompt: 'Does the shared sign-in belong to one person?', reply: 'No. It is a desk-level session credential. A personal sign-in or a signed operator handover would be needed to attribute the action.' },
      { id: 'print', prompt: 'Does the print slip identify the operator?', reply: 'No. It confirms that DS-1 printed the Q-19 slip after creating the ticket. The printer queue does not store a personal name.' }
    ]},
    { id: 'talia', name: 'Talia Renn', role: 'Console access auditor', questions: [
      { id: 'badge', prompt: 'What does the missing badge association mean?', reply: 'Only that the console extract has no personal badge match in that window. It cannot tell us who used the desk, and it does not prove a named person was absent.' },
      { id: 'handover', prompt: 'What record would identify the operator?', reply: 'A signed desk handover or a personal authentication event tied to the session. Neither appears in this recovered extract.' }
    ]}
  ],
  timelineEvents: [
    { id: 'session', time: '09:09', title: 'Shared priority session opens at DS-1', detail: 'The desk-level credential starts a shared session.' },
    { id: 'terminal', time: '09:12', title: 'Q-19 created at DS-1', detail: 'The audit identifies the workstation that created the queue ticket.' },
    { id: 'print', time: '09:13', title: 'Queue confirmation prints', detail: 'The DS-1 printer produces the ticket confirmation.' },
    { id: 'proximity', time: '09:14', title: 'Console badge extract closes', detail: 'The window ends without a personal badge association.' }
  ],
  correctOrder: ['session', 'terminal', 'print', 'proximity'],
  suspects: [
    { id: 'unknown', name: 'Unidentified DS-1 operator', role: 'Workstation known · person unknown', note: 'The terminal audit identifies DS-1, but the shared session and missing personal handover leave the operator unidentified.' },
    { id: 'mara', name: 'Mara Venn', role: 'Authorized desk user', note: 'Her role allowed desk access, but no record places her at the keyboard for this session.' },
    { id: 'niko', name: 'Niko Vale', role: 'Authorized systems clerk', note: 'His role allowed desk access, but no personal authentication or handover ties him to Q-19.' }
  ],
  motives: [
    { id: 'station', label: 'Q-19 was created and printed at DS-1 using a shared desk session', note: 'The terminal audit and print slip identify the workstation; the sign-in and badge extract do not identify a person.' },
    { id: 'mara', label: 'Mara personally created Q-19 at DS-1', note: 'Her authorization is not proof that she operated the shared session.' },
    { id: 'niko', label: 'Niko personally created Q-19 at DS-1', note: 'His authorization is not proof that he operated the shared session.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'station',
  truth: 'The deeper audit identifies DS-1 as the workstation that created Q-19, and the printer slip corroborates the activity. A shared desk credential opened the session. The badge-proximity extract contains no personal association, and no signed desk handover survives. The workstation is established; the operator is not.',
  proof: 'The terminal audit names DS-1, the sign-in record establishes a shared session, the print slip corroborates the ticket action, and the badge extract lacks a personal match. None of these records names the individual at the keyboard.',
  outcome: 'The request came from the dispatch supervisor desk, not the imaging control room. The remaining gap is the desk handover: who had responsibility for DS-1 when the shared session opened? The Bureau must recover the shift-change record before attributing Q-19 to a person.',
} as const;

export const CASE_039_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase039Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_039_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case038', 'case037', 'case036', 'case035', 'case034', 'case033', 'case032'].includes(record.caseId)).length,
  };
}

export function isCase039TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_039_GAME.correctOrder[index]);
}

export function isCase039DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_039_GAME.correctSuspect && motiveId === CASE_039_GAME.correctMotive;
}
