import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_054_GAME = {
  id: 'case054',
  title: 'The Recorder Transfer',
  subtitle: 'A transfer packet exists in the index. Its custody trail does not tell the whole story.',
  location: 'INDEPENDENT RECORDS ARCHIVE · TRANSFER CONTROL',
  briefing: 'The Recorder Transfer Index points to an independent archive reference connected to Rowan Vale. Recover the transfer trail: establish whether the recorder was formally received, which office recorded its movement, and where the surviving custody evidence stops. Earlier cases proved that shared accounts, incomplete approvals and duplicate record identifiers cannot identify an individual. Apply the same standard here.',
  clues: [
    { id: 'index', title: 'Independent archive index', label: 'Archive catalogue · 08:12', detail: 'The index lists a sealed “RV-Recorder Transfer” packet under reference IA-6. The entry is a catalogue description only; it does not prove the packet contents or that the recorder itself was physically present.' },
    { id: 'request', title: 'Transfer retrieval request', label: 'Records desk · 08:26', detail: 'A request asks the independent archive to retrieve IA-6 for a custody review. The requester field contains the shared records-desk role AR-2, not a named person or personal authentication.' },
    { id: 'receipt', title: 'Archive receipt extract', label: 'Receipt ledger · 08:41', detail: 'The receipt extract records one sealed packet under IA-6 accepted by the archive intake office. The contents field says “recorder transfer documentation”; no device serial, physical inspection or item-level checklist is attached.' },
    { id: 'routing', title: 'Internal routing slip', label: 'Archive routing · 09:05', detail: 'The packet was routed from intake to restricted shelf R-3 for review. The slip is stamped by the archive unit account. It confirms an office-level route, not a named handler or continuous personal custody.' },
    { id: 'exception', title: 'Custody exception note', label: 'Archive review · 09:38', detail: 'A reviewer notes that IA-6 contains transfer paperwork but no signed item-level handover confirming the recorder’s physical receipt or onward release. The packet is now located as a records file; the recorder itself remains unlocated.' }
  ],
  witnesses: [
    { id: 'sela', name: 'Sela Marr', role: 'Independent archive intake clerk', questions: [
      { id: 'catalogue', prompt: 'What does the IA-6 catalogue entry establish?', reply: 'It establishes that a packet with the recorder-transfer description was indexed. A catalogue title is not a physical inventory of the packet’s contents.' },
      { id: 'receipt', prompt: 'Was a packet formally received by the archive?', reply: 'The receipt extract records a sealed packet under IA-6. It does not list a device serial or confirm the recorder itself was inside.' }
    ]},
    { id: 'corin', name: 'Corin Vale', role: 'Archive routing coordinator', questions: [
      { id: 'route', prompt: 'Where was the IA-6 packet routed?', reply: 'The routing slip sends it from intake to restricted shelf R-3. The unit stamp identifies the office account, not the person who carried or placed it.' },
      { id: 'account', prompt: 'Can the AR-2 or archive unit account identify an individual?', reply: 'No. Those are shared office credentials. There is no personal sign-in or signed handover attached to the route.' }
    ]},
    { id: 'mira', name: 'Mira Sen', role: 'Independent custody reviewer', questions: [
      { id: 'exception', prompt: 'What is missing from the transfer documentation?', reply: 'There is no item-level serial check, signed receipt for the recorder, or authenticated release to a named recipient.' },
      { id: 'limits', prompt: 'Can this file establish the recorder’s last physical custodian?', reply: 'No. It establishes an archive packet and an office-level route. It does not prove the device was inside the packet or identify a person who last held it.' }
    ]}
  ],
  timelineEvents: [
    { id: 'index', time: '08:12', title: 'IA-6 packet appears in archive index', detail: 'The catalogue describes a recorder-transfer file.' },
    { id: 'request', time: '08:26', title: 'Shared AR-2 account requests retrieval', detail: 'The request is logged under an office role.' },
    { id: 'receipt', time: '08:41', title: 'Sealed IA-6 packet accepted at intake', detail: 'The receipt confirms a packet, not the device contents.' },
    { id: 'routing', time: '09:05', title: 'Packet routed to restricted shelf R-3', detail: 'The unit stamp records an office-level route.' },
    { id: 'exception', time: '09:38', title: 'Custody reviewer records item-level gap', detail: 'No signed device handover or serial check survives.' }
  ],
  correctOrder: ['index', 'request', 'receipt', 'routing', 'exception'],
  suspects: [
    { id: 'gap', name: 'Unverified recorder custody', role: 'Verified records finding', note: 'The archive records a packet and an office-level route, but no item-level proof that the recorder was received or released.' },
    { id: 'sela', name: 'Sela Marr', role: 'Archive intake clerk', note: 'The receipt records a packet, not Sela’s personal possession of the recorder.' },
    { id: 'corin', name: 'Corin Vale', role: 'Archive routing coordinator', note: 'The shared unit stamp does not identify Corin as the packet handler or device custodian.' }
  ],
  motives: [
    { id: 'custody', label: 'The archive received a transfer packet, but the recorder’s physical custody remains unverified', note: 'The index, receipt, routing slip and exception note establish a records trail with an item-level gap.' },
    { id: 'sela', label: 'Sela accepted and kept the recorder', note: 'The receipt is packet-level and contains no device serial or personal handover.' },
    { id: 'corin', label: 'Corin moved the recorder to restricted shelf R-3', note: 'The routing slip identifies a unit account and a packet route, not a device or named carrier.' }
  ],
  correctSuspect: 'gap',
  correctMotive: 'custody',
  truth: 'The independent archive indexed and received a sealed packet under IA-6, then routed it to restricted shelf R-3. The packet is described as recorder-transfer documentation, but no item-level serial check or signed handover confirms that Rowan Vale’s recorder was inside. The surviving records do not establish the recorder’s last physical custodian or its current location.',
  proof: 'The 08:12 index identifies IA-6; the 08:26 retrieval request uses shared role AR-2; the 08:41 receipt confirms a sealed packet but no device serial; the 09:05 slip routes the packet to R-3 under a unit stamp; and the 09:38 review records the missing item-level handover.',
  outcome: 'Record an archive packet and office-level route, with the recorder’s physical custody still unverified. Do not accuse Sela Marr or Corin Vale. The next lead is the original item-level transfer schedule and Rowan Vale’s last independently verified assignment.',
} as const;

export const CASE_054_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase054Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_054_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    dispatchFiles: priorFiles.filter((record) => ['case053', 'case052', 'case051', 'case050', 'case049', 'case048'].includes(record.caseId)).length
  };
}

export function isCase054TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_054_GAME.correctOrder.length && order.every((id, index) => id === CASE_054_GAME.correctOrder[index]);
}

export function isCase054DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'gap' && motiveId === 'custody';
}
