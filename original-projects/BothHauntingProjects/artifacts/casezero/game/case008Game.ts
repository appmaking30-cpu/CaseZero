import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_008_GAME = {
  id: 'case008',
  title: 'The Second Address',
  subtitle: 'Two relay points share a code. That does not mean they share a controller.',
  location: 'BELLWEATHER ARCHIVE EXCHANGE · COASTAL DISTRICT',
  briefing: 'Station Three’s retained index points to a second relay address: Bellweather Archive Exchange. The building is now a records depot, but its night intake ledger and maintenance register survived. Compare the handover, the circuit activity and the staff roster. The Bureau needs to establish what connects the two sites—and what the evidence still cannot prove.',
  clues: [
    { id: 'index', title: 'Station Three duplicate index', label: 'Cross-reference · 23:06', detail: 'A retained line reads BELLWEATHER / R-8 / M-2. The entry was copied from the restricted relay column, not the public directory. It establishes the second address and the route code, but carries no operator name.' },
    { id: 'gate', title: 'Bellweather vehicle gate log', label: 'Entry · 23:19', detail: 'A sealed records van entered the service yard. The driver signed the vehicle line as E.C. The gate log records the vehicle arrival only; it does not identify who accepted the parcel inside.' },
    { id: 'intake', title: 'Night intake receipt', label: 'Counter copy · 23:24', detail: 'A sealed envelope marked M-2 / R-8 was received by M.V. The intake roster assigns the counter to Mara Venn. The receipt proves who logged the envelope, not who sent it.' },
    { id: 'maintenance', title: 'Maintenance channel register', label: 'Override · 23:31', detail: 'The R-8 circuit was opened using override key M2-17, the same key reference recorded in the Station Three maintenance copy. The register identifies a shared credential, not the individual who controlled it.' },
  ],
  witnesses: [
    { id: 'mara', name: 'Mara Venn', role: 'Night intake clerk', questions: [
      { id: 'receipt', prompt: 'Did you receive the M-2 envelope?', reply: 'I signed the intake copy at 23:24. It was sealed when it reached the counter. I did not open it.' },
      { id: 'sender', prompt: 'Who sent the envelope?', reply: 'There was no sender name on the outer sleeve. Only the route code and the intake instruction.' },
    ] },
    { id: 'eli', name: 'Eli Cross', role: 'Service-van driver', questions: [
      { id: 'arrival', prompt: 'What did you deliver to Bellweather?', reply: 'A sealed records pouch. I signed the gate line and left it at the intake counter. I was not given an authorizing name.' },
      { id: 'station', prompt: 'Did you visit Station Three as well?', reply: 'My route sheet shows Bellweather only. I cannot confirm what happened at the other relay.' },
    ] },
    { id: 'niko', name: 'Niko Hale', role: 'Maintenance engineer', questions: [
      { id: 'override', prompt: 'Who used override key M2-17?', reply: 'The register records the key reference, not a personal login. I checked the R-8 circuit after the intake was complete.' },
      { id: 'control', prompt: 'Does the shared key prove one person controls both sites?', reply: 'No. A shared credential can be issued to a process or desk. The register does not identify who requested its use.' },
    ] },
  ],
  timelineEvents: [
    { id: 'index', time: '23:06', title: 'Second relay address copied into index', detail: 'Station Three duplicate identifies Bellweather and R-8.' },
    { id: 'gate', time: '23:19', title: 'Sealed records van enters Bellweather', detail: 'Gate log records E.C. at the service entrance.' },
    { id: 'intake', time: '23:24', title: 'M-2 envelope accepted at intake', detail: 'Counter receipt carries M.V. and the R-8 route code.' },
    { id: 'maintenance', time: '23:31', title: 'R-8 circuit opened with M2-17', detail: 'Maintenance register repeats the shared override reference.' },
  ],
  correctOrder: ['index', 'gate', 'intake', 'maintenance'],
  suspects: [
    { id: 'mara', name: 'Mara Venn', role: 'Night intake clerk', note: 'Her initials appear on the receipt for the sealed envelope.' },
    { id: 'eli', name: 'Eli Cross', role: 'Service-van driver', note: 'He signed the vehicle gate log and delivered the pouch.' },
    { id: 'niko', name: 'Niko Hale', role: 'Maintenance engineer', note: 'He checked the R-8 circuit after the intake.' },
  ],
  motives: [
    { id: 'receipt', label: 'Confirm who logged the physical handover', note: 'The counter receipt and roster identify the intake clerk.' },
    { id: 'controller', label: 'Identify the person controlling both relay sites', note: 'A shared key reference alone cannot identify its user or controller.' },
    { id: 'sender', label: 'Prove who sent the sealed envelope', note: 'The outer sleeve contains no sender name or personal authorization.' },
  ],
  correctSuspect: 'mara',
  correctMotive: 'receipt',
  truth: 'Mara Venn logged the physical receipt of the M-2 envelope at Bellweather. Eli Cross delivered the sealed pouch to the building, while Niko Hale checked the R-8 circuit afterward. The records connect Station Three and Bellweather through the same M-2 route and override reference, but they do not identify the person who directed either site.',
  proof: 'The duplicate index names Bellweather and R-8. The gate log places the van arrival before the intake receipt, and the roster matches M.V. to the counter. The later maintenance entry repeats M2-17, the same credential reference seen at Station Three. Each record supports a different action; none names the upstream controller.',
  outcome: 'The Bureau secures the Bellweather intake copy and links both relay sites under the M-2 route. The shared override reference is flagged for a separate authorization audit. No individual is accused on the basis of a shared credential alone. A third reference appears in the sealed envelope’s inventory code.',
} as const;

export const CASE_008_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase008Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_008_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    linkedRelayFiles: priorFiles.filter((record) => ['case007', 'case006'].includes(record.caseId)).length,
  };
}

export function isCase008TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_008_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_008_GAME.correctOrder[index]);
}

export function isCase008DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_008_GAME.correctSuspect && motiveId === CASE_008_GAME.correctMotive;
}
