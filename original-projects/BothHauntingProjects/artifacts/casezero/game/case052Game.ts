import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_052_GAME = {
  id: 'case052',
  title: 'The Dispatch Copy',
  subtitle: 'The destination change reached the dispatch floor—but did it have valid authority?',
  location: 'CENTRAL DISPATCH · ROUTE CONTROL',
  briefing: 'Case 051 established that D-17 never received an authenticated primary approval or independent countersignature. Yet a downstream dispatch copy may show what happened next. Compare the copy, release ledger, route receipt and reconciliation report. Distinguish proof that a change was executed from proof that a person had authority to order it.',
  clues: [
    { id: 'copy', title: 'Dispatch copy carbon', label: 'D-17 · Generated 09:22', detail: 'The dispatch carbon carries the revised destination D-4 and references the pending D-17 request. Its generation stamp proves a copy was prepared with the changed route; it does not establish approval or identify who prepared it.' },
    { id: 'release', title: 'Dispatch release ledger', label: 'Route control · 09:31', detail: 'The ledger records D-17 released to the dispatch corridor under shared DS-3 role credentials. No individual dispatcher is named, and the entry contains no approval reference beyond the pending request number.' },
    { id: 'receipt', title: 'Destination receipt', label: 'D-4 receiving desk · 09:47', detail: 'A receiving stamp confirms that the packet reached D-4. The receipt authenticates delivery to the destination desk, not the identity of the carrier or the authority behind the route change.' },
    { id: 'variance', title: 'Route reconciliation variance', label: 'Control review · 10:05', detail: 'The reconciliation report compares D-17 against the approved baseline route D-2 and flags the D-4 delivery as a variance. It confirms the changed route was acted upon despite the incomplete approval record; it does not name the person who initiated or released it.' }
  ],
  witnesses: [
    { id: 'clerk', name: 'Talia Wren', role: 'Dispatch copy clerk', questions: [
      { id: 'carbon', prompt: 'What does the 09:22 dispatch carbon establish?', reply: 'It shows the copy was prepared with D-4 as the destination and references the D-17 request. It does not carry a completed approval.' },
      { id: 'author', prompt: 'Can the copy identify who prepared the changed route?', reply: 'No. The generation stamp identifies the dispatch station and time, not the individual at the terminal.' }
    ]},
    { id: 'release', name: 'Bram Ives', role: 'Route release coordinator', questions: [
      { id: 'ledger', prompt: 'What does the 09:31 release entry prove?', reply: 'It records release under the shared DS-3 role. It does not identify the individual dispatcher or supply a valid sign-off.' },
      { id: 'credential', prompt: 'Does DS-3 identify a single employee?', reply: 'No. It is a shared role credential used by the dispatch team during the shift.' }
    ]},
    { id: 'receipt', name: 'Nessa Vale', role: 'Destination reconciliation auditor', questions: [
      { id: 'delivery', prompt: 'What does the D-4 receiving stamp authenticate?', reply: 'It confirms the packet reached the D-4 receiving desk. It is not a record of who carried it or who authorized the route.' },
      { id: 'variance', prompt: 'Why did reconciliation flag D-17?', reply: 'The approved baseline remained D-2, while the delivered copy went to D-4. The route was executed, but the approval workflow in the prior file was incomplete.' }
    ]}
  ],
  timelineEvents: [
    { id: 'copy', time: '09:22', title: 'Changed dispatch copy generated', detail: 'The carbon carries destination D-4 and references the pending request.' },
    { id: 'release', time: '09:31', title: 'D-17 released under DS-3 role', detail: 'The shared dispatch credential records a release without naming an individual.' },
    { id: 'receipt', time: '09:47', title: 'D-4 receipt stamped', detail: 'The receiving desk confirms delivery to the changed destination.' },
    { id: 'variance', time: '10:05', title: 'Route variance recorded', detail: 'Reconciliation flags the executed D-4 route against the approved D-2 baseline.' }
  ],
  correctOrder: ['copy', 'release', 'receipt', 'variance'],
  suspects: [
    { id: 'unapproved', name: 'Unapproved destination change executed', role: 'Verified process finding', note: 'The changed copy was released and received at D-4 even though the required approval remained incomplete.' },
    { id: 'talia', name: 'Talia Wren', role: 'Dispatch copy clerk', note: 'The station stamp does not identify Talia as the person who prepared the copy or authorized the change.' },
    { id: 'bram', name: 'Bram Ives', role: 'Route release coordinator', note: 'The shared DS-3 release entry does not identify Bram as the operator or approver.' }
  ],
  motives: [
    { id: 'execution', label: 'The D-4 route was executed, but the approval chain remained incomplete and the individual responsible is not identified', note: 'The dispatch copy, release ledger, destination receipt and variance report establish execution without valid approval.' },
    { id: 'talia', label: 'Talia prepared the copy and knowingly changed the route', note: 'A station generation stamp does not identify its individual operator or establish intent.' },
    { id: 'bram', label: 'Bram released the packet and personally approved the change', note: 'The shared DS-3 role proves a release entry, not the identity or authority of its operator.' }
  ],
  correctSuspect: 'unapproved',
  correctMotive: 'execution',
  truth: 'The revised D-4 dispatch copy was generated, released under the shared DS-3 role and received at D-4. Reconciliation then flagged the delivery against the approved D-2 baseline. The route change was executed, but Case 051 established that the required primary approval and independent countersignature were never authenticated.',
  proof: 'The 09:22 carbon shows D-4; the 09:31 ledger records release; the 09:47 receipt confirms arrival; and the 10:05 variance compares that delivery with the approved D-2 baseline. Together these records prove the changed route was acted upon, not that it was authorized.',
  outcome: 'Record D-17 as an executed but unapproved destination change. Do not accuse Talia Wren or Bram Ives: the station and shared-role entries do not identify an individual operator. The next lead is the independent route-control audit and the Missing Detective file’s reference to a duplicated dispatch seal.',
} as const;

export const CASE_052_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase052Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_052_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    approvalFiles: priorFiles.filter((record) => ['case051', 'case050', 'case049', 'case048'].includes(record.caseId)).length
  };
}

export function isCase052TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_052_GAME.correctOrder[index]);
}

export function isCase052DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'unapproved' && motiveId === 'execution';
}
