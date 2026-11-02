import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_038_GAME = {
  id: 'case038',
  title: 'The Queue Before Arrival',
  subtitle: 'Find out who reserved an imaging slot before the sealed cart reached the building.',
  location: 'CENTRAL DISPATCH · IMAGING CONTROL ROOM',
  briefing: 'Case 037 traced cart M-4 from the restricted review office to imaging, but the carrier remained unidentified. Imaging has now recovered a queue ticket created six minutes before the cart was released. The ticket names folio K-17-12, reserves Bay 2, and uses a shared priority account. Determine what the early reservation proves, who had access to the queue, and whether the ticket identifies the person who requested the folio.',
  clues: [
    { id: 'ticket', title: 'Imaging queue ticket Q-19', label: 'Queue server · 09:12', detail: 'Ticket Q-19 reserves Bay 2 for folio K-17-12 at 09:12, six minutes before cart M-4 leaves the restricted office. The ticket was created under the shared priority account, not a personal staff credential.' },
    { id: 'permissions', title: 'Priority account permissions', label: 'Systems audit · 09:14', detail: 'The priority account is available to the dispatch supervisor desk and imaging control room. The permission list names authorized stations, not the staff member who used the account to create Q-19.' },
    { id: 'bay', title: 'Bay 2 preparation log', label: 'Imaging floor · 09:20', detail: 'Bay 2 is powered and prepared for a K-17 folio job. The log confirms the work area was ready after the queue ticket, but it does not identify who requested the reservation.' },
    { id: 'arrival', title: 'Cart arrival cross-reference', label: 'Imaging intake · 09:34', detail: 'The intake record links cart M-4 and its seal to ticket Q-19. The match confirms the reserved job was the one delivered, but the ticket still carries only the shared account name.' }
  ],
  witnesses: [
    { id: 'sana', name: 'Sana Vey', role: 'Imaging intake auditor', questions: [
      { id: 'match', prompt: 'Does Q-19 match the cart that arrived?', reply: 'Yes. The folio reference and cart seal cross-reference match. It confirms the reservation was for this delivery, not who created the ticket.' },
      { id: 'receipt', prompt: 'Did you create the queue ticket?', reply: 'No. I signed the intake receipt after the cart arrived. My receiving role does not grant me access to the shared priority account.' }
    ]},
    { id: 'niko', name: 'Niko Vale', role: 'Dispatch systems clerk', questions: [
      { id: 'account', prompt: 'Who could use the priority account?', reply: 'The supervisor desk and imaging control room stations had permission. The account is shared, so its audit entry does not identify the individual at the keyboard.' },
      { id: 'timing', prompt: 'Why was the ticket created before dispatch?', reply: 'The queue can reserve a bay based on a planned transfer. That proves someone expected the folio, but not who arranged the physical movement.' }
    ]},
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch supervisor', questions: [
      { id: 'approval', prompt: 'Did the reservation require supervisor approval?', reply: 'The shared priority account can create a reservation from either authorized station. There is no separate personal approval field on Q-19.' },
      { id: 'identity', prompt: 'Can the station log identify the requester?', reply: 'It can narrow the action to one of two authorized stations if the full terminal audit is recovered. This extract records only the shared account, so the person remains unknown.' }
    ]}
  ],
  timelineEvents: [
    { id: 'ticket', time: '09:12', title: 'Q-19 reserves Bay 2', detail: 'The shared priority account creates a reservation for folio K-17-12.' },
    { id: 'permissions', time: '09:14', title: 'Account permission audit recorded', detail: 'The systems audit lists two authorized workstations.' },
    { id: 'bay', time: '09:20', title: 'Bay 2 prepared', detail: 'Imaging prepares the reserved work area.' },
    { id: 'arrival', time: '09:34', title: 'Cart M-4 matched to Q-19', detail: 'The intake cross-reference links the arriving cart to the earlier ticket.' }
  ],
  correctOrder: ['ticket', 'permissions', 'bay', 'arrival'],
  suspects: [
    { id: 'unknown', name: 'Unidentified priority-account user', role: 'Requester identity unresolved', note: 'Q-19 was created under a shared account with two authorized stations and no personal approval field.' },
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch supervisor', note: 'Her desk had permission to use the account, but the ticket does not identify her as its user.' },
    { id: 'niko', name: 'Niko Vale', role: 'Dispatch systems clerk', note: 'His work area had permission to use the account, but permission is not proof that he created Q-19.' }
  ],
  motives: [
    { id: 'reservation', label: 'Someone reserved Bay 2 for K-17-12 before the cart was dispatched', note: 'The timestamp, account permissions, bay preparation and arrival cross-reference support a planned reservation.' },
    { id: 'mara', label: 'Mara personally requested the folio', note: 'Her station was authorized, but the shared account record does not identify her as the user.' },
    { id: 'niko', label: 'Niko personally requested the folio', note: 'His station was authorized, but the shared account record does not identify him as the user.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'reservation',
  truth: 'Queue ticket Q-19 reserved Bay 2 for folio K-17-12 at 09:12, before cart M-4 was released at 09:18. The priority account could be used from two authorized stations. Bay 2 was prepared, and the arriving cart was matched to Q-19. The records prove that someone anticipated the folio and reserved capacity, but they do not identify the individual requester.',
  proof: 'The queue timestamp predates dispatch, the permission audit lists two authorized stations, the bay log confirms preparation, and the intake cross-reference links the arriving cart to Q-19. The shared account has no personal user field, so station permission cannot be converted into a named identity.',
  outcome: 'Someone knew the folio was coming before the cart left the restricted office. The reservation narrows the next search to two workstations. The Bureau needs the full terminal audit to establish which station created Q-19—and whether the requester also arranged the transfer.',
} as const;

export const CASE_038_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase038Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_038_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case037', 'case036', 'case035', 'case034', 'case033', 'case032', 'case031'].includes(record.caseId)).length,
  };
}

export function isCase038TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_038_GAME.correctOrder[index]);
}

export function isCase038DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_038_GAME.correctSuspect && motiveId === CASE_038_GAME.correctMotive;
}
