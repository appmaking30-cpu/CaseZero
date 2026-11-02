import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_037_GAME = {
  id: 'case037',
  title: 'The Missing Movement Ledger',
  subtitle: 'Follow the sealed transfer from the restricted review office to imaging—and find where the named handler disappears.',
  location: 'CENTRAL DISPATCH · RECORDS TRANSFER CORRIDOR',
  briefing: 'Case 036 established that Rowan Vale was authorized to review folio K-17-12, but no record proved who moved it. A newly recovered movement ledger shows that a sealed records cart left the restricted review office and reached the imaging corridor. The handler field is incomplete. Reconstruct the route, distinguish a cart scan from a person’s identity, and determine what the surviving records can actually establish.',
  clues: [
    { id: 'dispatch', title: 'Movement ledger carbon', label: 'Transfer desk · 09:18', detail: 'The carbon copy records sealed cart M-4 leaving the restricted review office for imaging intake. The handler box is torn across its lower half. The route and cart number are legible; no person is named.' },
    { id: 'seal', title: 'Cart seal inspection', label: 'Security desk · 09:22', detail: 'A seal check records cart M-4 as intact at the corridor checkpoint. The seal number matches the dispatch carbon. This confirms continuity of the sealed cart, not who pushed it.' },
    { id: 'lift', title: 'Service lift access extract', label: 'Facilities · 09:27', detail: 'The lift controller records a service-mode journey from the restricted floor to imaging level. Service mode is shared by authorized transfer staff; the extract contains no personal credential or operator field.' },
    { id: 'intake', title: 'Imaging intake receipt', label: 'Imaging desk · 09:34', detail: 'Imaging intake signs for cart M-4 and confirms the same seal number. The receiving clerk records the cart, not the delivering handler. The receipt closes the route at intake but leaves the carrier unidentified.' }
  ],
  witnesses: [
    { id: 'elias', name: 'Elias Rook', role: 'Restricted archive custodian', questions: [
      { id: 'dispatch', prompt: 'What does the carbon copy prove?', reply: 'The cart was released from the restricted office on the recorded route. The torn handler field means the copy cannot identify the person who moved it.' },
      { id: 'seal', prompt: 'Can the seal number identify the carrier?', reply: 'No. It follows the container, not the staff member. A matching seal confirms the cart remained closed between checks.' }
    ]},
    { id: 'rowan', name: 'Rowan Vale', role: 'Assigned restricted reviewer', questions: [
      { id: 'handoff', prompt: 'Did your review assignment include transport?', reply: 'No. My assignment ended with the review and comparison. The transfer desk arranged movement separately, and I did not sign the handler field.' },
      { id: 'staff', prompt: 'Can the service lift log name the carrier?', reply: 'Not in this extract. Service mode is shared. Without a personal access event or signed handoff, it cannot be tied to one person.' }
    ]},
    { id: 'sana', name: 'Sana Vey', role: 'Imaging intake auditor', questions: [
      { id: 'receipt', prompt: 'Who signed for cart M-4 at imaging?', reply: 'I signed as the receiving clerk. The receipt confirms the cart and seal arrived. It does not record who delivered it.' },
      { id: 'gap', prompt: 'What record would close the identity gap?', reply: 'The original movement ledger or a signed transfer handoff naming the carrier. Neither is present in this file.' }
    ]}
  ],
  timelineEvents: [
    { id: 'dispatch', time: '09:18', title: 'Cart M-4 released', detail: 'The transfer carbon records departure from the restricted review office.' },
    { id: 'seal', time: '09:22', title: 'Cart seal checked', detail: 'The checkpoint confirms the cart remained sealed.' },
    { id: 'lift', time: '09:27', title: 'Service lift reaches imaging level', detail: 'The lift extract records a shared service-mode journey.' },
    { id: 'intake', time: '09:34', title: 'Imaging intake receives cart M-4', detail: 'The receiving clerk signs for the cart and matching seal.' }
  ],
  correctOrder: ['dispatch', 'seal', 'lift', 'intake'],
  suspects: [
    { id: 'unknown', name: 'Unidentified transfer handler', role: 'Carrier identity unresolved', note: 'The cart route is documented, but the handler field is torn and no personal handoff survives.' },
    { id: 'rowan', name: 'Rowan Vale', role: 'Restricted reviewer', note: 'The review assignment did not include transport, and no transfer record names Rowan.' },
    { id: 'sana', name: 'Sana Vey', role: 'Receiving clerk', note: 'Sana signed for the cart at imaging; that establishes receipt, not delivery.' }
  ],
  motives: [
    { id: 'route', label: 'A sealed cart moved from restricted review to imaging, but the carrier is not identified', note: 'The dispatch carbon, matching seal, service lift extract and intake receipt establish the route.' },
    { id: 'rowan', label: 'Rowan transported the folio after completing the review', note: 'The review assignment and room access do not establish a transport duty or handoff.' },
    { id: 'sana', label: 'Sana delivered the cart because she signed the intake receipt', note: 'The receipt identifies the receiving clerk, not the person who delivered the cart.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'route',
  truth: 'Cart M-4 left the restricted review office at 09:18, passed a seal check, used the service lift, and was received at imaging at 09:34. The matching seal confirms the cart’s continuity. The handler field is torn, the lift extract uses shared service mode, and the intake receipt names only the receiving clerk. The route is established; the carrier is not.',
  proof: 'The dispatch carbon establishes departure, the seal check links the same cart through the corridor, the lift extract places it on the imaging level, and the intake receipt closes the route. None of those records names the carrier. A signed movement handoff or intact original ledger is still missing.',
  outcome: 'The Bureau can now trace the folio’s sealed journey to imaging, but the person who carried it remains unknown. The next lead is the imaging work queue: someone requested the folio before the cart arrived, and that request may reveal who was waiting for it.',
} as const;

export const CASE_037_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase037Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_037_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case036', 'case035', 'case034', 'case033', 'case032', 'case031', 'case030'].includes(record.caseId)).length,
  };
}

export function isCase037TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_037_GAME.correctOrder[index]);
}

export function isCase037DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_037_GAME.correctSuspect && motiveId === CASE_037_GAME.correctMotive;
}
