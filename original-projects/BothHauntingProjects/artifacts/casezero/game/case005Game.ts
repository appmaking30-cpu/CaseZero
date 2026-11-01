import type { InvestigationArchive } from './investigationArchive';

export const CASE_005_GAME = {
  id: 'case005',
  title: 'The Empty Ledger',
  subtitle: 'The North Quay transfer ended on paper. The receiving desk says otherwise.',
  briefing: 'The M-2 docket proves Rowan Vale’s recorder left North Quay, but its destination field was replaced with a blank transit code. A carbon copy survived at East Freight Registry. The Bureau has one shift to reconstruct who received the case before the paper trail is overwritten.',
  suspects: [
    { id: 'quill', name: 'Sera Quill', role: 'Night registrar', note: 'Controlled the receiving ledger and issued duplicate transit receipts.' },
    { id: 'dane', name: 'Milo Dane', role: 'Dock courier', note: 'Carried sealed cases between the quay and registry desk.' },
    { id: 'vesper', name: 'Lena Vesper', role: 'Shift supervisor', note: 'Approved after-hours desk changes and signed the closing audit.' },
  ],
  clues: [
    { id: 'carbon', title: 'The carbon receipt', label: 'Duplicate record', detail: 'The surviving carbon copy records a 20:22 collection from North Quay under transfer code M-2. The receiving signature is S.Q. The destination line was blanked on the top copy, but remains legible on the carbon: Locker 14, East Freight Registry.' },
    { id: 'ledger', title: 'The receiving ledger', label: 'Desk register', detail: 'Locker 14 was opened at 20:31 using registrar credential SQ-7. The entry is marked “temporary hold” and countersigned with the same narrow diagonal stroke as the carbon receipt.' },
    { id: 'gate', title: 'The loading-bay gate sheet', label: 'Access record', detail: 'Milo Dane signed out of the loading bay at 20:25. The gate sheet records no courier return after that time. The registry locker was opened six minutes later, after the courier had left.' },
    { id: 'audit', title: 'The closing audit correction', label: 'Administrative record', detail: 'At 21:04, supervisor Lena Vesper corrected the day-end count from one sealed case to zero. The correction note says “cleared by registrar”; it does not name Vesper as the person who opened Locker 14.' },
  ],
  witnesses: [
    { id: 'dane', name: 'Milo Dane', role: 'Dock courier', questions: [
      { id: 'route', prompt: 'Where did you leave the sealed case?', reply: 'At the registry receiving hatch. The registrar signed the carbon receipt. I left the bay at 20:25; I did not have a locker key.' },
      { id: 'signature', prompt: 'Can you identify the receiving signature?', reply: 'The registrar signed while I was there. I remember the initials S.Q. because the top copy was taken away and I kept the carbon.' },
    ] },
    { id: 'quill', name: 'Sera Quill', role: 'Night registrar', questions: [
      { id: 'locker', prompt: 'Why was Locker 14 opened?', reply: 'It was a temporary hold. The ledger should show who used the registrar credential and when.' },
      { id: 'copy', prompt: 'Why was the destination missing from the top receipt?', reply: 'The top copy is the official copy. Carbon sheets are often incomplete, especially when a destination changes.' },
    ] },
    { id: 'vesper', name: 'Lena Vesper', role: 'Shift supervisor', questions: [
      { id: 'audit', prompt: 'Who authorized the closing-count correction?', reply: 'I signed the audit after the registrar reported the case cleared. My signature confirms the count, not the locker access.' },
      { id: 'access', prompt: 'Could the supervisor credential open Locker 14?', reply: 'Not that locker. It uses registrar credentials. The SQ-7 access record belongs to the receiving desk.' },
    ] },
  ],
  // Deliberately presented out of chronological order so the player must reconstruct the sequence.
  timelineEvents: [
    { id: 'audit', time: '21:04', title: 'The closing count is corrected', detail: 'The audit reports the sealed case as cleared.' },
    { id: 'locker', time: '20:31', title: 'Locker 14 is opened', detail: 'Registrar credential SQ-7 is recorded.' },
    { id: 'receipt', time: '20:22', title: 'The M-2 case is signed in', detail: 'The carbon receipt carries S.Q. and a destination entry.' },
    { id: 'courier', time: '20:25', title: 'The courier leaves the loading bay', detail: 'The gate sheet records Milo Dane’s exit.' },
  ],
  correctTimelineOrder: ['receipt', 'courier', 'locker', 'audit'],
  correctSuspect: 'quill',
  correctMotive: 'conceal',
  motives: [
    { id: 'profit', label: 'To sell the recorder', note: 'The registry was used to divert a valuable device.' },
    { id: 'conceal', label: 'To conceal the recorder’s destination from the Bureau', note: 'The blank top copy and temporary-hold entry hide where the case was placed.' },
    { id: 'revenge', label: 'To retaliate against the courier', note: 'The records were altered to frame the person who delivered the case.' },
  ],
  truth: 'Sera Quill received the case under the M-2 transfer and placed it in Locker 14 using registrar credential SQ-7. She removed the destination from the official receipt and recorded a temporary hold, concealing the recorder’s location from the Bureau.',
  proof: 'The carbon receipt carries S.Q. and names Locker 14. The ledger shows SQ-7 opening that locker six minutes after Milo Dane left the bay. The supervisor’s audit came later and only confirms the reported count; it does not establish locker access. The records identify the registrar, not the courier or supervisor, as the person who controlled the receiving entry.',
  outcome: 'The Bureau seals Locker 14 and preserves both receipt copies and the access ledger. The recorder is secured for forensic review, but its contents remain unknown. Sera Quill is suspended from registry access pending an independent inquiry. The trail now points to whoever issued the M-2 authority upstream.',
} as const;

export type Case005Progress = {
  cluesFound: string[];
  askedQuestions: string[];
  timelineOrder: string[];
  timelineSolved: boolean;
  selectedSuspect: string | null;
  selectedMotive: string | null;
  completed: boolean;
};

export const EMPTY_CASE005_PROGRESS: Case005Progress = {
  cluesFound: [], askedQuestions: [], timelineOrder: [], timelineSolved: false,
  selectedSuspect: null, selectedMotive: null, completed: false,
};

export function getCase005Carryover(archive: InvestigationArchive) {
  const completed = new Set(archive.completedCases.map((record) => record.caseId));
  return {
    hasCase004: completed.has('case004'),
    priorFiles: archive.completedCases.filter((record) => ['case003', 'case004'].includes(record.caseId)),
    clueCount: archive.completedCases.reduce((total, record) => total + record.inspectedClues.length, 0),
  };
}

export function isCase005TimelineCorrect(order: readonly string[]): boolean {
  return order.length === CASE_005_GAME.correctTimelineOrder.length &&
    order.every((id, index) => id === CASE_005_GAME.correctTimelineOrder[index]);
}

export function isCase005DeductionCorrect(suspectId: string | null, motiveId: string | null): boolean {
  return suspectId === CASE_005_GAME.correctSuspect && motiveId === CASE_005_GAME.correctMotive;
}
