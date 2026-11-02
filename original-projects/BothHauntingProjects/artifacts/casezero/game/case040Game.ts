import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_040_GAME = {
  id: 'case040',
  title: 'The Shift-Change Gap',
  subtitle: 'A recovered handover sheet assigns desk responsibility—but does it identify who used the shared terminal?',
  location: 'CENTRAL DISPATCH · SHIFT RECORDS ARCHIVE',
  briefing: 'Case 039 established that Q-19 was created and printed at DS-1 during a shared priority session. The missing desk handover has now surfaced in a carbon-copy packet. It assigns responsibility for DS-1 across the 09:00 shift change, but one signature is incomplete and the acknowledgement box is blank. Reconstruct the handover and decide what it proves about the desk—and what it cannot prove about the person at the keyboard.',
  clues: [
    { id: 'roster', title: 'Dispatch shift roster', label: 'Staffing office · 08:45', detail: 'The roster assigns the Blue Shift to DS-1 through 09:00 and the Silver Shift from 09:00 onward. It defines scheduled responsibility, not the exact moment a staff member took control.' },
    { id: 'carbon', title: 'DS-1 handover carbon', label: 'Desk records · 09:02', detail: 'The carbon copy records a transfer of desk responsibility from Blue Shift to Silver Shift at 09:02. The outgoing initials are legible; the incoming signature is incomplete.' },
    { id: 'checklist', title: 'Console condition checklist', label: 'Dispatch operations · 09:03', detail: 'The checklist records the printer queue, open ticket Q-18 and shared priority session as items present at handover. It does not list Q-19, which was created later at 09:12.' },
    { id: 'acknowledgement', title: 'Supervisor acknowledgement register', label: 'Control office · 09:05', detail: 'The register shows the handover packet was received by the control office, but the DS-1 recipient acknowledgement field is blank. Receipt by the office does not prove a particular operator accepted the desk.' }
  ],
  witnesses: [
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch supervisor', questions: [
      { id: 'shift', prompt: 'Which shift was assigned DS-1 at 09:12?', reply: 'The roster assigns Silver Shift after 09:00, and the carbon records the desk transfer at 09:02. That establishes shift-level responsibility on paper, not the person who sat down.' },
      { id: 'signature', prompt: 'Does the incomplete signature name the incoming operator?', reply: 'No. The incoming field is incomplete and the recipient acknowledgement is blank. We cannot turn a shift assignment into a personal sign-in.' }
    ]},
    { id: 'talia', name: 'Talia Renn', role: 'Console access auditor', questions: [
      { id: 'checklist', prompt: 'What does the console checklist establish?', reply: 'It records the desk state at handover. Q-19 is not listed because it did not yet exist; the later terminal audit places its creation at 09:12.' },
      { id: 'credential', prompt: 'Can the shared session be assigned to the incoming shift?', reply: 'The session began at 09:09, after the recorded desk transfer. That is consistent with Silver Shift responsibility, but the shared credential still does not identify an individual.' }
    ]},
    { id: 'niko', name: 'Niko Vale', role: 'Dispatch systems clerk', questions: [
      { id: 'receipt', prompt: 'Does control-office receipt prove the desk recipient accepted the handover?', reply: 'No. It proves the packet reached the control office. The desk recipient acknowledgement is blank, so personal acceptance is not documented.' },
      { id: 'operator', prompt: 'Can we name the person who created Q-19?', reply: 'Not from these records. We can place the event during the Silver Shift and establish desk responsibility, but we still need a personal authentication or a complete signed operator record.' }
    ]}
  ],
  timelineEvents: [
    { id: 'roster', time: '08:45', title: 'Shift roster assigns DS-1', detail: 'Blue Shift is scheduled through 09:00; Silver Shift follows.' },
    { id: 'handover', time: '09:02', title: 'Desk responsibility transfers', detail: 'The carbon records the transfer, but the incoming signature is incomplete.' },
    { id: 'checklist', time: '09:03', title: 'Console condition is recorded', detail: 'The checklist records the desk state before Q-19 exists.' },
    { id: 'session', time: '09:09', title: 'Shared priority session opens', detail: 'The shared session opens after the shift-level transfer.' },
    { id: 'ticket', time: '09:12', title: 'Q-19 is created at DS-1', detail: 'The terminal audit from Case 039 places creation during Silver Shift.' }
  ],
  correctOrder: ['roster', 'handover', 'checklist', 'session', 'ticket'],
  suspects: [
    { id: 'unknown', name: 'Unidentified Silver Shift operator', role: 'Shift responsibility established · person unknown', note: 'The roster and handover place desk responsibility with Silver Shift, but the incomplete signature and shared credential do not identify an individual.' },
    { id: 'mara', name: 'Mara Venn', role: 'Outgoing shift supervisor', note: 'Her supervisory role and outgoing shift connection do not place her at the keyboard after the handover.' },
    { id: 'niko', name: 'Niko Vale', role: 'Dispatch systems clerk', note: 'His access authorization does not prove he accepted DS-1 or created Q-19.' }
  ],
  motives: [
    { id: 'shift', label: 'Q-19 was created during Silver Shift, after desk responsibility transferred', note: 'The roster, handover carbon and terminal timestamps establish shift-level responsibility, not personal identity.' },
    { id: 'mara', label: 'Mara personally created Q-19 before leaving DS-1', note: 'The 09:12 event follows the recorded 09:02 transfer; the evidence does not place Mara at the terminal.' },
    { id: 'niko', label: 'Niko personally created Q-19 after accepting the desk', note: 'No complete recipient acknowledgement or personal authentication ties Niko to the desk.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'shift',
  truth: 'The roster and handover carbon assign DS-1 to Silver Shift from 09:02, and the Q-19 session begins at 09:09 before the ticket is created at 09:12. The shift-level responsibility is established. The incoming signature is incomplete, the recipient acknowledgement is blank, and the shared session remains non-personal. The individual operator is still unidentified.',
  proof: 'The 08:45 roster sets the scheduled shift, the 09:02 carbon records the desk transfer, the 09:03 checklist captures the pre-ticket desk state, and the Case 039 terminal audit places Q-19 at 09:12. The chronology supports Silver Shift responsibility but contains no personal operator authentication.',
  outcome: 'The missing handover is no longer entirely missing: its carbon establishes a desk transfer to Silver Shift. But the blank recipient acknowledgement leaves a narrower question. The Bureau must compare the control-office packet register with the original dispatch copy to learn whether the missing signature was never made—or was removed from the record.',
} as const;

export const CASE_040_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase040Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_040_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case039', 'case038', 'case037', 'case036', 'case035', 'case034', 'case033', 'case032'].includes(record.caseId)).length,
  };
}

export function isCase040TimelineCorrect(order: readonly string[]) {
  return order.length === 5 && order.every((id, index) => id === CASE_040_GAME.correctOrder[index]);
}

export function isCase040DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_040_GAME.correctSuspect && motiveId === CASE_040_GAME.correctMotive;
}
