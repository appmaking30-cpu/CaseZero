import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_048_GAME = {
  id: 'case048',
  title: 'The Original Request',
  subtitle: 'A correction was authorized by a request. The surviving copy does not identify its author.',
  location: 'CENTRAL DISPATCH · RECORDS INTAKE ANNEX',
  briefing: 'Case 047 established that the D-17 carbon destination was changed at 09:12, but the original request was missing. Records intake has recovered a request packet and its routing trail. Compare the request copy, intake docket, terminal activity summary and retention index. Determine what the packet authenticates—and whether it identifies the person who asked for the correction.',
  clues: [
    { id: 'request', title: 'Recovered correction request', label: 'Carbon form · Logged 09:08', detail: 'The recovered form requests that D-17 destination DS-2 be amended to relief desk. Its requester field contains the role label “dispatch coordination”; the personal-name line is blank. A handwritten “T.R.” appears beside the field, but there is no verified specimen, staff credential or witness attestation. The form supports that a correction was requested, not who authored it.' },
    { id: 'docket', title: 'Records intake docket', label: 'Annex receipt · 09:10', detail: 'The intake docket records one correction request received from dispatch coordination and routed to the counter controller. Its receipt number matches the recovered form. The docket authenticates receipt and routing, not the identity of the person who submitted it.' },
    { id: 'terminal', title: 'Dispatch terminal activity summary', label: 'Shared terminal · 09:07–09:09', detail: 'The terminal summary records a document session under the shared DC-1 role credential. It contains no personal login, device-owner field or signed action. The timing is consistent with preparation of the request, but a shared credential cannot identify the individual operator.' },
    { id: 'retention', title: 'Records retention index', label: 'Archive scan · 09:18', detail: 'The index records the request packet scanned into retention at 09:18 with the same receipt number. It confirms that this copy was archived after intake. It does not prove who completed the form or whether the archived copy contains every original attachment.' }
  ],
  witnesses: [
    { id: 'controller', name: 'Ilya Norr', role: 'Dispatch records controller', questions: [
      { id: 'receipt', prompt: 'What does the intake docket authenticate?', reply: 'It authenticates receipt of a correction request from the dispatch coordination role and its routing to the counter controller. It does not name the individual who delivered it.' },
      { id: 'original', prompt: 'Was the original requester line completed?', reply: 'The recovered copy has no personal name in that field. The request procedure calls for an individual identifier, but this copy does not supply one.' }
    ]},
    { id: 'coordinator', name: 'Tamsin Reeve', role: 'Dispatch coordination lead', questions: [
      { id: 'initials', prompt: 'Do the initials T.R. identify you as the author?', reply: 'No. The initials are not a verified signature. The form has no staff number or witness who saw me complete it.' },
      { id: 'role', prompt: 'Who could use the DC-1 role credential?', reply: 'It was a shared dispatch coordination credential. The activity summary does not record which team member was at the terminal.' }
    ]},
    { id: 'archivist', name: 'Sana Vey', role: 'Records retention archivist', questions: [
      { id: 'scan', prompt: 'What does the 09:18 retention scan prove?', reply: 'It proves that a packet with this receipt number was scanned into the archive at 09:18. It does not establish who prepared or submitted it.' },
      { id: 'attachments', prompt: 'Can the index confirm every original attachment survived?', reply: 'No. The index lists one form and one docket reference. It does not certify that no separate authorization page existed.' }
    ]}
  ],
  timelineEvents: [
    { id: 'terminal', time: '09:07', title: 'Shared DC-1 document session', detail: 'The shared role credential records document activity.' },
    { id: 'request', time: '09:08', title: 'Correction request completed', detail: 'The recovered form asks for the D-17 destination amendment.' },
    { id: 'docket', time: '09:10', title: 'Request received and routed', detail: 'The annex docket records receipt under a matching number.' },
    { id: 'retention', time: '09:18', title: 'Request packet archived', detail: 'The retention index records the later scan.' }
  ],
  correctOrder: ['terminal', 'request', 'docket', 'retention'],
  suspects: [
    { id: 'unknown', name: 'Unidentified dispatch coordination requester', role: 'Shared role credential · individual author unknown', note: 'The form has a role label and unverified initials. The terminal session is shared and the docket records only the submitting role.' },
    { id: 'tamsin', name: 'Tamsin Reeve', role: 'Dispatch coordination lead · matching initials', note: 'Matching initials and a leadership role do not authenticate authorship or prove who used the shared terminal.' },
    { id: 'ilya', name: 'Ilya Norr', role: 'Records controller · received the routed request', note: 'The docket places the controller in the receipt chain, not as the request author.' }
  ],
  motives: [
    { id: 'limits', label: 'The request and docket confirm a role-level correction request, but neither identifies its individual author', note: 'The shared terminal session, unverified initials and later archive scan do not provide a personal link.' },
    { id: 'tamsin', label: 'Tamsin authored the request because the initials are T.R.', note: 'Initials are not a verified signature and do not authenticate the writer.' },
    { id: 'ilya', label: 'Ilya authored the request because the docket was routed to him', note: 'Receiving or routing a request does not establish who prepared it.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'limits',
  truth: 'The recovered form requests the D-17 destination amendment under the dispatch coordination role. The intake docket confirms receipt and routing, and the shared DC-1 session is consistent with preparation. The copy does not identify an individual requester, and the initials T.R. are not authenticated.',
  proof: 'The request form, matching intake receipt, shared-terminal activity summary and later retention index establish a plausible records sequence. None contains a verified personal identifier or an independent witness to authorship.',
  outcome: 'Do not accuse Tamsin Reeve or Ilya Norr. Preserve the recovered form as evidence of a role-level request, not proof of its author. The next lead is the missing authorization page or an independently verified terminal access record tied to an individual.',
} as const;

export const CASE_048_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase048Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_048_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    correctionTrailFiles: priorFiles.filter((record) => ['case047', 'case046', 'case045'].includes(record.caseId)).length
  };
}

export function isCase048TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_048_GAME.correctOrder[index]);
}

export function isCase048DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'unknown' && motiveId === 'limits';
}
