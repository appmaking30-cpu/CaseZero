import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_013_GAME = {
  id: 'case013',
  title: 'The Borrowed Badge',
  subtitle: 'A custody receipt can name a borrower. It cannot prove who used the credential.',
  location: 'CONTINUITY OPERATIONS VAULT · SECURITY DESK',
  briefing: 'Case 012 established that badge B-17 passed through the south vestibule during the C-4 terminal window. The badge assignment points to the primary coordinator, but the corridor record cannot identify its carrier. The Bureau has recovered the temporary-loan register and its paired counterfoils. Reconstruct the documented custody of B-17 at 01:27, while keeping the recorded borrower separate from the person who may have presented the badge or opened the terminal session.',
  clues: [
    { id: 'assignment', title: 'B-17 assignment card', label: 'Credential register · 00:40', detail: 'Badge B-17 is assigned to Sable Neri for the shift. The card records the normal custodian, not continuous possession. It does not rule out an authorized temporary loan.' },
    { id: 'release', title: 'Temporary release counterfoil', label: 'Loan register · 01:22', detail: 'The desk copy records B-17 released by Sable Neri at 01:22. The release field is signed S.N. and identifies the credential, not the reason it was requested.' },
    { id: 'receipt', title: 'Borrower receipt', label: 'Paired counterfoil · 01:23', detail: 'The matching receipt records Ivo Dane accepting B-17 at 01:23. Its receipt number matches the release counterfoil. This establishes the register’s recorded borrower, but a paper receipt alone cannot prove who physically carried the badge later.' },
    { id: 'return', title: 'Security desk return entry', label: 'Return register · 01:38', detail: 'The return entry lists B-17 returned under Ivo Dane’s name at 01:38, matching the loan number. The record supports a continuous documented loan interval across the 01:27 reader event; it does not prove who presented the badge or operated C-4-OPS-2.' },
  ],
  witnesses: [
    { id: 'mira', name: 'Mira Sol', role: 'Security desk registrar', questions: [
      { id: 'paired', prompt: 'How do the release and receipt records connect?', reply: 'They share loan number L-204. The release is logged at 01:22 and the borrower receipt at 01:23. Together they record a transfer from Sable Neri to Ivo Dane.' },
      { id: 'limit', prompt: 'Does the register prove who physically carried B-17?', reply: 'No. It records who released and accepted the credential. It is a custody record, not a live location tracker or visual identification.' },
    ] },
    { id: 'ivo', name: 'Ivo Dane', role: 'Continuity relief coordinator', questions: [
      { id: 'receipt', prompt: 'What does your signature on L-204 acknowledge?', reply: 'It acknowledges receipt of badge B-17 at the security desk. The matching return entry is also under my name. The register does not say who presented the badge at S-04.' },
      { id: 'session', prompt: 'Can you confirm who opened the C-4 terminal session?', reply: 'The badge record cannot establish that. C-4-OPS-2 used a pooled session, and the access export does not identify a person.' },
    ] },
    { id: 'sable', name: 'Sable Neri', role: 'Primary duty coordinator', questions: [
      { id: 'release', prompt: 'What does the release counterfoil establish?', reply: 'It records that B-17 was released under my name at 01:22. The paired receipt identifies Ivo as the recorded borrower.' },
      { id: 'assignment', prompt: 'Does the shift assignment mean you kept the badge all night?', reply: 'No. The assignment card lists the normal custodian. The loan register records a temporary transfer during the shift.' },
    ] },
  ],
  timelineEvents: [
    { id: 'assignment', time: '00:40', title: 'B-17 assigned to Sable for the shift', detail: 'The assignment card records normal custody.' },
    { id: 'release', time: '01:22', title: 'Sable releases B-17 under loan L-204', detail: 'The desk copy records the release.' },
    { id: 'receipt', time: '01:23', title: 'Ivo accepts B-17 under loan L-204', detail: 'The paired counterfoil records the borrower.' },
    { id: 'return', time: '01:38', title: 'B-17 returned under Ivo’s name', detail: 'The return entry closes the documented loan interval.' },
  ],
  correctOrder: ['assignment', 'release', 'receipt', 'return'],
  suspects: [
    { id: 'sable', name: 'Sable Neri', role: 'Recorded releasing custodian', note: 'The assignment card and release counterfoil list Sable as normal custodian and releasing party.' },
    { id: 'ivo', name: 'Ivo Dane', role: 'Recorded temporary borrower', note: 'The paired receipt and return entry list Ivo under the same loan number L-204.' },
    { id: 'mira', name: 'Mira Sol', role: 'Security desk registrar', note: 'Mira maintains the register. Her role as registrar does not make her the borrower.' },
  ],
  motives: [
    { id: 'custody', label: 'Identify Ivo as the recorded borrower during the access window', note: 'The paired receipt and return entry place the documented loan under Ivo’s name across 01:27.' },
    { id: 'carrier', label: 'Prove Ivo personally presented B-17 at S-04', note: 'The custody register does not identify who physically carried or presented the credential.' },
    { id: 'operator', label: 'Prove Ivo opened the C-4 terminal session', note: 'A badge loan and nearby terminal event do not identify the person who initiated a pooled session.' },
  ],
  correctSuspect: 'ivo',
  correctMotive: 'custody',
  truth: 'The paired L-204 counterfoils and return entry identify Ivo Dane as the recorded borrower of badge B-17 from 01:23 until its logged return at 01:38. That interval includes the 01:27 south vestibule entry. Sable remains the shift’s assigned custodian and recorded releasing party. The register does not prove who physically presented B-17 at S-04 or who opened the pooled C-4 terminal session.',
  proof: 'The 01:22 release counterfoil and 01:23 borrower receipt share loan number L-204. The 01:38 return entry closes the same loan under Ivo’s name. These independent entries establish the documented custody interval across the 01:27 reader event. They do not provide visual identification or a personal terminal login.',
  outcome: 'The Bureau records Ivo Dane as the temporary borrower named in the L-204 custody register during the C-4 access window. It does not label him the badge carrier at the reader or the terminal operator. The next lead is the S-04 reader maintenance and exception packet, which may show whether the reader accepted a normal presentation or an override.',
} as const;

export const CASE_013_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase013Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_013_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    custodyTrailFiles: priorFiles.filter((record) => ['case011', 'case012'].includes(record.caseId)).length,
  };
}

export function isCase013TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_013_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_013_GAME.correctOrder[index]);
}

export function isCase013DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_013_GAME.correctSuspect && motiveId === CASE_013_GAME.correctMotive;
}
