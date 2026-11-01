import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_010_GAME = {
  id: 'case010',
  title: 'The Names Behind the Seal',
  subtitle: 'The index can reveal an authority channel. It cannot sign a name.',
  location: 'CENTRAL PERSONNEL REGISTRY · SEALED RECORDS FLOOR',
  briefing: 'Meridian’s D-4 schedule carries a marginal locator: P-1, a sealed personnel index. The Bureau has permission to inspect a certified extract, but not to break the seal on the original. The extract describes which office may renew M-2 when the normal route desk is unavailable. Your task is to establish which authority channel was active—not to turn a duty roster into proof of who held the key.',
  clues: [
    { id: 'locator', title: 'D-4 marginal locator', label: 'Index reference · 00:47', detail: 'The transferred schedule copy contains a marginal note reading P-1 / DELEGATION INDEX. The note identifies a record series. It does not name an approver.' },
    { id: 'checkout', title: 'P-1 certified-extract checkout', label: 'Registry access · 01:02', detail: 'The registry issued a certified extract using a pooled records credential. June Halden was the clerk assigned to the counter. The checkout records custody of the extract, not access to the restricted original or authority over M-2.' },
    { id: 'outage', title: 'Route Governance status notice', label: 'Desk status · 01:14', detail: 'The normal Route Governance desk entered an outage state at 01:14. The notice is system-generated and confirms the desk was unavailable; it does not identify who caused the outage.' },
    { id: 'delegation', title: 'M-2 conditional delegation entry', label: 'Authority window · 01:17', detail: 'The certified P-1 extract states that Emergency Continuity may renew M-2 while Route Governance is unavailable. The activation is recorded under pooled duty code C-4. The named holder field remains sealed.' },
  ],
  witnesses: [
    { id: 'june', name: 'June Halden', role: 'Personnel registry clerk', questions: [
      { id: 'extract', prompt: 'What did the registry issue?', reply: 'A certified extract from P-1. The original stays sealed. My counter credential can issue approved copies; it cannot renew a route token.' },
      { id: 'holder', prompt: 'Does the extract show who held C-4?', reply: 'No. The holder field is sealed under the same restriction. The copy records the duty channel, not a personal name.' },
    ] },
    { id: 'pavel', name: 'Pavel Orr', role: 'Route Governance analyst', questions: [
      { id: 'outage', prompt: 'What happened to Route Governance at 01:14?', reply: 'The desk entered a recorded outage state. During that interval it could not process a normal M-2 renewal. The status notice does not say who initiated the outage.' },
      { id: 'normal', prompt: 'Could your desk renew M-2 during that window?', reply: 'Not under the normal route process. P-1 describes a conditional delegation for an outage, but our desk does not see the sealed holder identity.' },
    ] },
    { id: 'sable', name: 'Sable Neri', role: 'Emergency Continuity duty coordinator', questions: [
      { id: 'window', prompt: 'When does Emergency Continuity gain renewal authority?', reply: 'Only while the Route Governance desk is unavailable and the conditional window is active. A duty roster tells you who was scheduled, not who used a pooled key.' },
      { id: 'key', prompt: 'Does C-4 identify the person who renewed M-2?', reply: 'No. C-4 is a shared duty channel. The holder record is sealed, and the surviving extract cannot attribute the action to one person.' },
    ] },
  ],
  timelineEvents: [
    { id: 'locator', time: '00:47', title: 'P-1 delegation index locator recorded', detail: 'The D-4 schedule points to the sealed personnel index.' },
    { id: 'checkout', time: '01:02', title: 'Certified P-1 extract issued', detail: 'The registry releases an approved copy under pooled counter access.' },
    { id: 'outage', time: '01:14', title: 'Route Governance enters outage state', detail: 'The normal route desk becomes unavailable.' },
    { id: 'delegation', time: '01:17', title: 'Emergency Continuity renewal window activates', detail: 'The M-2 renewal is logged under conditional duty code C-4.' },
  ],
  correctOrder: ['locator', 'checkout', 'outage', 'delegation'],
  suspects: [
    { id: 'route', name: 'Route Governance Desk', role: 'Normal M-2 authority', note: 'The standard route desk is unavailable during the recorded renewal window.' },
    { id: 'continuity', name: 'Emergency Continuity Desk', role: 'Conditional M-2 authority', note: 'P-1 grants this desk temporary renewal authority during a Route Governance outage.' },
    { id: 'registry', name: 'Personnel Registry', role: 'Restricted record custodian', note: 'The registry issues certified extracts but does not renew M-2 route tokens.' },
  ],
  motives: [
    { id: 'window', label: 'Confirm the conditional authority window was active', note: 'The outage notice and P-1 delegation entry align with the 01:17 renewal.' },
    { id: 'person', label: 'Prove Sable Neri personally used key C-4', note: 'A duty roster and pooled key do not identify the individual operator.' },
    { id: 'cause', label: 'Prove who caused the Route Governance outage', note: 'The status notice confirms an outage but does not identify its cause.' },
  ],
  correctSuspect: 'continuity',
  correctMotive: 'window',
  truth: 'The P-1 extract establishes that Emergency Continuity was the authorized channel for M-2 renewal while Route Governance was unavailable. The outage notice and 01:17 delegation entry confirm that this conditional window was active. The C-4 credential is pooled and its holder field remains sealed, so the evidence does not identify the individual who used it.',
  proof: 'The D-4 marginal locator points to P-1. The registry checkout proves that a certified extract was issued, while the 01:14 system notice places Route Governance in an outage state. Three minutes later, the M-2 entry appears under the conditional C-4 duty channel described by P-1. The sequence identifies the office with authority, not a person.',
  outcome: 'The Bureau records Emergency Continuity as the active M-2 authority channel and requests preservation of the sealed C-4 rotation ledger. No individual is accused. The ledger’s index number is the next lead—and may finally connect a duty code to a named holder.',
} as const;

export const CASE_010_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase010Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_010_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    relayFiles: priorFiles.filter((record) => ['case006', 'case007', 'case008', 'case009'].includes(record.caseId)).length,
  };
}

export function isCase010TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_010_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_010_GAME.correctOrder[index]);
}

export function isCase010DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_010_GAME.correctSuspect && motiveId === CASE_010_GAME.correctMotive;
}
