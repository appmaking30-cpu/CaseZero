import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_009_GAME = {
  id: 'case009',
  title: 'The Third Reference',
  subtitle: 'A code can point to an authority record without naming the authority.',
  location: 'MERIDIAN DISPATCH ANNEX · RECORDS QUARTER',
  briefing: 'Bellweather’s sealed inventory code contains a third reference: D-4. The code leads to a dispatch schedule held at Meridian Annex. The Bureau must establish who accessed that schedule, what the schedule controls, and whether the surviving records identify the person who authorized the M-2 route. Do not turn an access record into an accusation.',
  clues: [
    { id: 'inventory', title: 'Bellweather sealed inventory copy', label: 'Third reference · 00:12', detail: 'The envelope inventory ends with D-4 / DISPATCH SCHEDULE. The code is a cross-reference to a restricted record series. It contains no person’s name and does not establish who issued the original instruction.' },
    { id: 'drawer', title: 'Meridian schedule-drawer access log', label: 'Drawer access · 00:18', detail: 'Drawer D-4 was opened with a pooled records credential. The access roster places Oren Pike on the dispatch desk that shift. The log identifies the desk responsible for access, not the individual who approved the M-2 route.' },
    { id: 'renewal', title: 'M-2 route renewal register', label: 'Token renewal · 00:26', detail: 'The M-2 route token was renewed against schedule reference D-4. The approver field is restricted in the surviving copy. The register proves a renewal occurred, but does not disclose the authorizing person.' },
    { id: 'transfer', title: 'Sealed schedule transfer receipt', label: 'Bureau copy · 00:41', detail: 'A sealed duplicate of the D-4 schedule was transferred to Bureau custody. The receipt is signed by the records auditor after the renewal entry. It confirms preservation of the document, not approval of the route.' },
  ],
  witnesses: [
    { id: 'nell', name: 'Nell Armitage', role: 'Bellweather inventory cataloguer', questions: [
      { id: 'code', prompt: 'What does D-4 refer to?', reply: 'It is a dispatch schedule series held at Meridian. I copied the reference from the sealed inventory. I did not create the schedule or issue the route.' },
      { id: 'sender', prompt: 'Does the inventory identify who sent the envelope?', reply: 'No. It carries a route code and a record reference. There is no sender name on the inventory copy.' },
    ] },
    { id: 'oren', name: 'Oren Pike', role: 'Meridian dispatch schedule clerk', questions: [
      { id: 'drawer', prompt: 'Did you access drawer D-4?', reply: 'The dispatch desk was assigned the drawer at 00:18. I was on that shift and logged the access. The credential is pooled, so the register is a desk record rather than a personal approval.' },
      { id: 'authority', prompt: 'Did you authorize the M-2 renewal?', reply: 'No approval field is visible on my copy. My role was to retrieve the schedule when requested, not to approve route renewals.' },
    ] },
    { id: 'talia', name: 'Talia Wren', role: 'Records auditor', questions: [
      { id: 'renewal', prompt: 'What does the renewal register establish?', reply: 'It shows that the M-2 token was renewed against D-4 at 00:26. The restricted approver field is not present in the copy we recovered.' },
      { id: 'copy', prompt: 'Who signed the Bureau transfer receipt?', reply: 'I signed the custody receipt at 00:41 after the schedule copy was sealed. That signature records preservation and transfer, not the earlier authorization.' },
    ] },
  ],
  timelineEvents: [
    { id: 'inventory', time: '00:12', title: 'D-4 reference copied from sealed inventory', detail: 'Bellweather inventory points to the Meridian dispatch schedule.' },
    { id: 'drawer', time: '00:18', title: 'Meridian schedule drawer accessed', detail: 'The dispatch desk logs access to drawer D-4.' },
    { id: 'renewal', time: '00:26', title: 'M-2 route token renewed', detail: 'The renewal register cites schedule D-4.' },
    { id: 'transfer', time: '00:41', title: 'Sealed schedule copy transferred to Bureau', detail: 'The auditor signs the custody receipt after the renewal.' },
  ],
  correctOrder: ['inventory', 'drawer', 'renewal', 'transfer'],
  suspects: [
    { id: 'nell', name: 'Nell Armitage', role: 'Inventory cataloguer', note: 'She copied the D-4 reference from the sealed inventory.' },
    { id: 'oren', name: 'Oren Pike', role: 'Dispatch schedule clerk', note: 'He was assigned to the desk that accessed drawer D-4.' },
    { id: 'talia', name: 'Talia Wren', role: 'Records auditor', note: 'She signed the later transfer receipt for the sealed copy.' },
  ],
  motives: [
    { id: 'access', label: 'Confirm who logged access to schedule D-4', note: 'The shift roster and drawer log identify the dispatch desk responsible for retrieval.' },
    { id: 'approve', label: 'Identify who authorized the M-2 route renewal', note: 'The approver field is restricted and absent from the recovered copy.' },
    { id: 'transfer', label: 'Prove who approved the Bureau transfer', note: 'The custody receipt records preservation after the renewal, not route authorization.' },
  ],
  correctSuspect: 'oren',
  correctMotive: 'access',
  truth: 'Oren Pike was assigned to the dispatch desk that accessed schedule drawer D-4. Nell Armitage copied the reference into the inventory, and Talia Wren later signed the Bureau custody receipt. The schedule connects the third reference to the M-2 renewal, but the recovered copy still withholds the approving identity.',
  proof: 'The inventory copy names D-4. The drawer log and shift roster place the access at the dispatch desk during Oren Pike’s shift. The renewal register follows eight minutes later and cites D-4, while the auditor’s transfer receipt comes after that. The sequence identifies retrieval and custody, not the person who authorized the renewal.',
  outcome: 'The Bureau secures the D-4 schedule and requests an independent authorization audit. The restricted approver field remains unresolved, so no individual is named as the M-2 controller. A marginal note on the schedule references a sealed personnel index—the next lead.',
} as const;

export const CASE_009_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase009Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_009_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    relayFiles: priorFiles.filter((record) => ['case006', 'case007', 'case008'].includes(record.caseId)).length,
  };
}

export function isCase009TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_009_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_009_GAME.correctOrder[index]);
}

export function isCase009DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_009_GAME.correctSuspect && motiveId === CASE_009_GAME.correctMotive;
}
