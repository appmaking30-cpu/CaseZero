import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_051_GAME = {
  id: 'case051',
  title: 'The Blank Approval Line',
  subtitle: 'The authorization workflow records a request—but no authenticated approval.',
  location: 'CENTRAL DISPATCH · AUTHORIZATION CONTROL',
  briefing: 'Case 050 traced the missing authorization leaf to a source-tray allocation, but could not prove the page was physically present or who handled it. The next file examines the approval workflow itself: a signatory roster, an approval register, a countersignature record and a workflow exception notice. Separate a recorded request from an actual approval, and determine whether the surviving records establish a valid sign-off.',
  clues: [
    { id: 'roster', title: 'Authorization signatory roster', label: 'Control desk · Effective 08:00', detail: 'The roster lists three staff members permitted to approve D-17 packet changes during the shift. It defines who was authorized to sign; it does not show that any listed person reviewed or approved this request.' },
    { id: 'register', title: 'Approval workflow register', label: 'Request D-17 · 09:02', detail: 'The workflow register records an approval request opened at 09:02 under the shared AC-2 control role. The status field remains “awaiting signatory”. The role entry proves a request entered the system, not that a named approver accepted it.' },
    { id: 'counter', title: 'Countersignature control sheet', label: 'D-17 approval check · 09:05', detail: 'The control sheet requires a named primary signature and a separate witness countersignature. Both signature fields are blank; the verification box is marked “not completed”. No signature image or independently witnessed mark is attached.' },
    { id: 'exception', title: 'Workflow exception notice', label: 'Control audit · 09:14', detail: 'At 09:14, an automated exception notice flags D-17 as incomplete because the primary approval and witness countersignature are missing. The notice preserves the workflow state; it does not identify who opened the request or why the approval was not completed.' }
  ],
  witnesses: [
    { id: 'controller', name: 'Elian Voss', role: 'Authorization control officer', questions: [
      { id: 'roster', prompt: 'What does the signatory roster establish?', reply: 'It lists who was permitted to approve the packet change during the shift. It does not prove that anyone exercised that authority on this request.' },
      { id: 'authority', prompt: 'Does being on the roster prove someone approved D-17?', reply: 'No. Eligibility and an actual signed decision are separate records. The roster contains no case-specific approval.' }
    ]},
    { id: 'register', name: 'Mara Quill', role: 'Workflow register administrator', questions: [
      { id: 'request', prompt: 'What does the 09:02 workflow entry record?', reply: 'It records a request opened under the shared AC-2 control role. Its status remains awaiting signatory; it is not an approval event.' },
      { id: 'operator', prompt: 'Can the shared AC-2 role identify the person who opened it?', reply: 'No. AC-2 is a shared control credential. The entry contains no individual operator identity.' }
    ]},
    { id: 'witness', name: 'Soren Hale', role: 'Countersignature auditor', questions: [
      { id: 'fields', prompt: 'What is missing from the countersignature sheet?', reply: 'Both the primary signatory and independent witness fields are blank. The verification step is marked not completed.' },
      { id: 'exception', prompt: 'What does the 09:14 exception notice prove?', reply: 'It proves the workflow was flagged as incomplete at that time. It does not tell us who should have signed or why the step was left unfinished.' }
    ]}
  ],
  timelineEvents: [
    { id: 'roster', time: '08:00', title: 'Signatory roster takes effect', detail: 'The roster defines eligible approvers for the shift, without recording a D-17 decision.' },
    { id: 'request', time: '09:02', title: 'D-17 approval request opened', detail: 'The shared AC-2 role records a request that remains awaiting signatory.' },
    { id: 'counter', time: '09:05', title: 'Countersignature check remains blank', detail: 'The primary and witness signature fields are empty and verification is incomplete.' },
    { id: 'exception', time: '09:14', title: 'Incomplete workflow exception issued', detail: 'The control system flags the missing approval and countersignature.' }
  ],
  correctOrder: ['roster', 'request', 'counter', 'exception'],
  suspects: [
    { id: 'unknown', name: 'No authenticated approver', role: 'Approval status · not completed', note: 'The records show eligibility and a pending request, but contain no named primary signature or witness countersignature.' },
    { id: 'elian', name: 'Elian Voss', role: 'Authorization control officer', note: 'The signatory roster lists eligible staff; it does not show Elian approved or handled this request.' },
    { id: 'mara', name: 'Mara Quill', role: 'Workflow register administrator', note: 'The shared AC-2 entry does not identify Mara as its operator or as an approver.' }
  ],
  motives: [
    { id: 'limits', label: 'A permitted signatory and an opened request are not proof of approval; both required signatures are absent', note: 'The control sheet and exception notice establish that the approval workflow remained incomplete.' },
    { id: 'elian', label: 'Elian was eligible to sign and must have approved the request', note: 'Eligibility is not a case-specific signed approval.' },
    { id: 'mara', label: 'Mara opened the shared workflow and withheld the approval', note: 'The shared role does not identify its individual operator or establish intent.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'limits',
  truth: 'The roster establishes who could approve D-17, and the workflow register records a request opened under a shared role. The primary approval and independent witness countersignature are blank, and the system later flags the request as incomplete. The surviving record does not establish that D-17 was ever validly approved.',
  proof: 'The roster is a permission list, not an approval. The 09:02 entry remains awaiting signatory; the 09:05 control sheet has both signature fields blank; and the 09:14 exception records the incomplete state. No authenticated sign-off survives.',
  outcome: 'Do not accuse Elian Voss or Mara Quill. Treat D-17 as lacking a verified approval, not as an approved change. The next lead is to compare the dispatch copy against the authorization policy and determine whether the change was acted on despite the missing approval.',
} as const;

export const CASE_051_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase051Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_051_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    authorizationTrailFiles: priorFiles.filter((record) => ['case050', 'case049', 'case048'].includes(record.caseId)).length
  };
}

export function isCase051TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_051_GAME.correctOrder[index]);
}

export function isCase051DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'unknown' && motiveId === 'limits';
}
