import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_064_GAME = {
  id: 'case064',
  title: 'The Exception Window',
  subtitle: 'A packet was scanned into a tray. The record does not say who carried it there.',
  location: 'CENTRAL RECORDS · DISPATCH AND RECEIVING',
  briefing: 'Case 063 identified one independently corroborated North Annex exception window. Use that bounded window to examine the recorder-transfer packet route. Compare the original archive accession and custody label, the dispatch manifest, the neutral receiving-desk scan and the separately retained seal report. Establish the last independently corroborated repository and state exactly where custody becomes unresolved.',
  clues: [
    { id: 'accession', title: 'Original archive accession and custody label', label: 'Central archive · 08:15', detail: 'The recorder-transfer packet is listed under accession AR-2048. Its original custody label names the North Annex records repository as the dispatch origin and records seal S-118 as intact at accession. The label identifies the packet and its starting repository, not a later carrier.' },
    { id: 'manifest', title: 'Dispatch manifest — exception window', label: 'Dispatch control · 09:02', detail: 'The manifest records AR-2048 leaving the North Annex repository during the bounded exception window. The destination field is populated as Central Records, but the recipient field is incomplete. The dispatch entry proves a logged dispatch instruction, not that a named person accepted the packet.' },
    { id: 'scan', title: 'Neutral receiving-desk scan', label: 'Receiving desk · 09:19', detail: 'A neutral desk scanner records accession AR-2048 in intake tray TR-6 at 09:19. The scan contains the accession number and tray ID only. It does not contain a staff identity, signature or image of a person carrying the packet.' },
    { id: 'seal', title: 'Independent seal and condition report', label: 'Records integrity · 09:24', detail: 'A separately retained condition report records seal S-118 intact when the packet was indexed in tray TR-6. The report is signed by the records-integrity process and independently confirms packet condition at indexing. It does not identify who placed the packet in the tray.' },
    { id: 'gap', title: 'Custody reconciliation worksheet', label: 'Independent review · 10:05', detail: 'The reconciliation matches accession AR-2048, seal S-118 and tray TR-6 across the accession label, dispatch manifest, receiving scan and condition report. The last independently corroborated repository is Central Records intake tray TR-6. Custody after that scan remains unresolved because no named recipient acceptance is present.' }
  ],
  witnesses: [
    { id: 'iva', name: 'Iva Renn', role: 'Archive accession registrar', questions: [
      { id: 'origin', prompt: 'What does accession AR-2048 establish?', reply: 'It identifies the packet and its original repository, with seal S-118 recorded at accession. It does not identify later carriers.' },
      { id: 'label', prompt: 'Does a custody label prove every later handoff?', reply: 'No. Each later handoff needs its own reliable receipt or independently corroborated record.' }
    ]},
    { id: 'tomas', name: 'Tomas Ede', role: 'Dispatch manifest clerk', questions: [
      { id: 'dispatch', prompt: 'What does the manifest prove?', reply: 'It records a dispatch entry from the North Annex repository to Central Records during the exception window. The recipient field is incomplete, so it does not prove named acceptance.' },
      { id: 'recipient', prompt: 'Can the incomplete recipient field identify a carrier?', reply: 'No. It is missing the information needed to identify an accepting person. A dispatch instruction is not a signed receipt.' }
    ]},
    { id: 'nadi', name: 'Nadi Sol', role: 'Records-integrity auditor', questions: [
      { id: 'scan', prompt: 'What does the receiving-desk scan establish?', reply: 'It establishes that accession AR-2048 was scanned into tray TR-6 at 09:19. It does not identify who physically placed it there.' },
      { id: 'seal', prompt: 'What does the independent seal report add?', reply: 'It independently confirms seal S-118 was intact when the packet was indexed. It confirms condition, not identity or later custody.' }
    ]}
  ],
  timelineEvents: [
    { id: 'accession', time: '08:15', title: 'Packet accessioned at North Annex', detail: 'Accession AR-2048 and seal S-118 are recorded at the origin repository.' },
    { id: 'dispatch', time: '09:02', title: 'Dispatch manifest records transfer', detail: 'The manifest logs dispatch to Central Records, with an incomplete recipient field.' },
    { id: 'scan', time: '09:19', title: 'Neutral desk scan records tray TR-6', detail: 'The accession is scanned into the Central Records intake tray.' },
    { id: 'seal', time: '09:24', title: 'Independent condition report filed', detail: 'Seal S-118 is recorded intact at the indexed tray.' },
    { id: 'reconcile', time: '10:05', title: 'Custody records reconciled', detail: 'The accession, seal and tray references match across independent records.' },
    { id: 'authorization', time: '10:20', title: 'Witnessed retrieval authorized', detail: 'A logged dual-witness retrieval is authorized; no individual is named as the carrier.' }
  ],
  correctOrder: ['accession', 'dispatch', 'scan', 'seal', 'reconcile', 'authorization'],
  suspects: [
    { id: 'tray', name: 'AR-2048 was last independently corroborated in Central Records tray TR-6', role: 'Custody finding', note: 'The scan and independent seal report agree on the accession, tray and packet condition. They do not identify a carrier.' },
    { id: 'tomas', name: 'Tomas Ede personally carried and accepted the packet', role: 'Dispatch manifest clerk', note: 'The incomplete recipient field and dispatch role do not prove Tomas accepted or carried the packet.' },
    { id: 'nadi', name: 'Nadi Sol took the packet after the scan', role: 'Records-integrity auditor', note: 'The condition report confirms the seal at indexing, not Nadi’s physical presence or later custody.' }
  ],
  motives: [
    { id: 'gap', label: 'The packet is corroborated in tray TR-6; custody after the scan is unresolved', note: 'Accession AR-2048, seal S-118 and tray TR-6 match across independent records. There is no named recipient acceptance.' },
    { id: 'carrier', label: 'The dispatch clerk is proven to have carried the packet', note: 'A dispatch manifest is not a signed receipt or proof of physical carriage.' },
    { id: 'breach', label: 'The packet seal was broken during transfer', note: 'The independent condition report records seal S-118 intact when indexed.' }
  ],
  correctSuspect: 'tray',
  correctMotive: 'gap',
  truth: 'The packet identified as accession AR-2048 was dispatched from the North Annex repository to Central Records. A neutral receiving-desk scan records it in intake tray TR-6 at 09:19, and an independently retained condition report records seal S-118 intact at indexing. The last independently corroborated repository is Central Records tray TR-6. The incomplete recipient field leaves custody after that scan unresolved; no named carrier or recipient is established.',
  proof: 'The original accession label identifies AR-2048 and seal S-118. The dispatch manifest records the route but has no complete recipient. The neutral scan records AR-2048 in tray TR-6. The independent condition report confirms seal S-118 intact. The reconciliation worksheet matches the accession, seal and tray references.',
  outcome: 'The records justify a witnessed, logged retrieval from Central Records tray TR-6, with two witnesses and a continuous custody log. The Bureau must not name a carrier or assume a custody breach before the packet is retrieved and examined.',
} as const;

export const CASE_064_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase064Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_064_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    routeFiles: priorFiles.filter((record) => /^case0(6[0-3])$/.test(record.caseId)).length,
  };
}

export function isCase064TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_064_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_064_GAME.correctOrder[index]);
}

export function isCase064DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_064_GAME.correctSuspect && motiveId === CASE_064_GAME.correctMotive;
}
