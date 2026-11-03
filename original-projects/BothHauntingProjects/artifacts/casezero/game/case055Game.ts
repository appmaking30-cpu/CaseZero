import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_055_GAME = {
  id: 'case055',
  title: 'The Last Verified Assignment',
  subtitle: 'A final assignment can be verified. A final physical handler cannot.',
  location: 'NORTH ANNEX · ASSIGNMENT CONTROL',
  briefing: 'Case 054 recovered the independent archive packet but could not prove Rowan Vale’s recorder was inside it. The next lead is the original item-level transfer schedule and Rowan’s last independently verified assignment. Compare the original work schedule, duty roster, route acknowledgment and independent control copy. Establish the last assignment the records can verify, while keeping assignment, presence and physical possession separate.',
  clues: [
    { id: 'schedule', title: 'Original item-level transfer schedule', label: 'Assignment control · 18:52', detail: 'The original schedule lists Rowan Vale for a recorder-assisted relay survey at North Annex, task RS-14. The item field describes the recorder as “issued for field reference” but contains no device serial or signed equipment handover.' },
    { id: 'roster', title: 'Duty roster extract', label: 'Operations roster · 19:00', detail: 'The signed duty roster assigns Rowan to the North Annex survey window from 19:00 to 19:45. It establishes the scheduled duty and reporting unit, not continuous presence at the site or possession of a particular device.' },
    { id: 'route', title: 'Route acknowledgment copy', label: 'North Annex control · 19:18', detail: 'A route acknowledgment records that task RS-14 was accepted by the North Annex control desk. The acknowledgment is signed by the desk role, not Rowan, and confirms task receipt rather than Rowan’s arrival or recorder custody.' },
    { id: 'closeout', title: 'Independent task closeout', label: 'Survey control · 19:42', detail: 'An independently retained control copy marks RS-14 “survey window closed” at 19:42. The status closes the assignment window; it does not say Rowan personally returned, that the recorder was checked in, or that the equipment was recovered.' },
    { id: 'variance', title: 'Equipment reconciliation variance', label: 'Equipment audit · 20:06', detail: 'The equipment reconciliation lists the recorder field as “serial not reconciled” and points to the missing item-level transfer schedule. No signed return, serial scan or named receiving custodian appears. The records support Rowan’s last independently verified assignment, not the last person to hold the recorder.' }
  ],
  witnesses: [
    { id: 'elara', name: 'Elara Finch', role: 'Assignment control archivist', questions: [
      { id: 'original', prompt: 'What does the original RS-14 schedule establish?', reply: 'It assigns Rowan to the North Annex relay survey and lists a recorder as field reference. It has no serial or signed equipment handover, so it is not proof that a particular device was issued.' },
      { id: 'revision', prompt: 'Was the schedule reconstructed after Rowan disappeared?', reply: 'No. The control copy was retained before the later review. Its timestamp and archive seal are independently recorded.' }
    ]},
    { id: 'davin', name: 'Davin Holt', role: 'North Annex duty coordinator', questions: [
      { id: 'receipt', prompt: 'Does the route acknowledgment prove Rowan arrived?', reply: 'No. It is a desk-role acknowledgment that task RS-14 reached North Annex control. It does not carry Rowan’s personal signature or an arrival badge record.' },
      { id: 'close', prompt: 'What does the 19:42 closeout mean?', reply: 'It closes the scheduled survey window in the control system. It is not an equipment return receipt and does not certify who was physically present at the close.' }
    ]},
    { id: 'sorin', name: 'Sorin Vale', role: 'Independent equipment auditor', questions: [
      { id: 'serial', prompt: 'Can the equipment record identify the recorder?', reply: 'Not from this file. The serial field was never reconciled against an item-level issue or return scan.' },
      { id: 'custody', prompt: 'Can the last assignment identify the recorder’s last handler?', reply: 'No. It identifies Rowan’s last independently verified assignment in the surviving records. Assignment is not possession, and the missing handover leaves physical custody unresolved.' }
    ]}
  ],
  timelineEvents: [
    { id: 'schedule', time: '18:52', title: 'Original RS-14 assignment is retained', detail: 'The original control copy assigns Rowan to the North Annex survey.' },
    { id: 'roster', time: '19:00', title: 'Rowan’s duty window begins', detail: 'The signed roster records the scheduled 19:00–19:45 assignment.' },
    { id: 'route', time: '19:18', title: 'North Annex desk acknowledges RS-14', detail: 'The desk role confirms task receipt, not Rowan’s personal arrival.' },
    { id: 'closeout', time: '19:42', title: 'Independent control copy closes survey window', detail: 'The assignment window is marked closed.' },
    { id: 'variance', time: '20:06', title: 'Equipment audit records unreconciled serial', detail: 'No item-level issue or return scan closes the recorder trail.' }
  ],
  correctOrder: ['schedule', 'roster', 'route', 'closeout', 'variance'],
  suspects: [
    { id: 'gap', name: 'Last verified assignment · RS-14', role: 'Records finding', note: 'Rowan’s final independently verified assignment is the North Annex relay survey. The records do not establish personal arrival, a device handover or a last physical custodian.' },
    { id: 'elara', name: 'Elara Finch', role: 'Assignment control archivist', note: 'The original schedule was retained by control. Its missing serial does not make Elara the equipment handler.' },
    { id: 'davin', name: 'Davin Holt', role: 'North Annex duty coordinator', note: 'The desk acknowledgment and closeout are office-level task records, not proof that Davin handled the recorder.' }
  ],
  motives: [
    { id: 'assignment', label: 'RS-14 at North Annex was Rowan’s last independently verified assignment; physical custody remains unresolved', note: 'The original schedule, signed roster, desk acknowledgment and independent closeout corroborate the assignment window, while the serial reconciliation remains open.' },
    { id: 'elara', label: 'Elara issued and retained Rowan’s recorder', note: 'No serial-level issue receipt or personal handover links Elara to the device.' },
    { id: 'davin', label: 'Davin received the recorder when the survey closed', note: 'The desk-role closeout is not a return receipt and contains no device serial or named recipient.' }
  ],
  correctSuspect: 'gap',
  correctMotive: 'assignment',
  truth: 'The strongest independent records place Rowan Vale’s last verified assignment at North Annex on task RS-14, a recorder-assisted relay survey scheduled from 19:00 to 19:45. The original schedule, duty roster, desk acknowledgment and independent closeout corroborate the assignment and its closure. They do not prove Rowan’s personal arrival, identify a device serial, or establish who last physically held the recorder.',
  proof: 'The 18:52 original schedule names Rowan on RS-14; the 19:00 signed roster confirms the duty window; the 19:18 North Annex desk acknowledgment confirms task receipt; the 19:42 independent control copy closes the survey window; and the 20:06 equipment audit records an unreconciled serial with no signed return.',
  outcome: 'Record RS-14 at North Annex as Rowan’s last independently verified assignment. Do not convert a roster, desk acknowledgment or task closeout into proof of personal presence or recorder custody. The next lead is the North Annex field log and the independent relay-control recording for the 19:00–19:45 window.',
} as const;

export const CASE_055_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase055Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_055_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    recorderTrailFiles: priorFiles.filter((record) => ['case054', 'case053', 'case052', 'case051', 'case050', 'case049', 'case048'].includes(record.caseId)).length
  };
}

export function isCase055TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_055_GAME.correctOrder.length && order.every((id, index) => id === CASE_055_GAME.correctOrder[index]);
}

export function isCase055DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'gap' && motiveId === 'assignment';
}
