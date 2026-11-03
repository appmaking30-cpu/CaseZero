import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_049_GAME = {
  id: 'case049',
  title: 'The Missing Authorization Page',
  subtitle: 'The request survived. The page that should authorize it did not.',
  location: 'CENTRAL DISPATCH · DOCUMENT CONTROL ROOM',
  briefing: 'Case 048 recovered the D-17 correction request but found no individual author and no authorization page. A document-control audit now confirms that the request packet was expected to contain a separate approval leaf. Compare the packet sleeve, scan manifest, transfer register and exception note. Establish when the page went missing—and what the records can actually say about who handled it.',
  clues: [
    { id: 'sleeve', title: 'Original packet sleeve', label: 'Document control · Seal check 09:22', detail: 'The sleeve bears the same receipt number as the correction request. Its contents checklist lists a request form and an authorization leaf. The sleeve seal was already broken when document control received it at 09:22. The checklist establishes what the packet was meant to contain, not when or by whom the leaf was removed.' },
    { id: 'manifest', title: 'Batch scan manifest', label: 'Scanner batch · 09:18', detail: 'The scan manifest lists the request form and intake docket under the matching receipt number. No authorization leaf appears in the batch. The scanner operator field contains the shared DC-1 role label, not an individual login. This shows the leaf was absent from the scanned batch, but does not establish whether it was missing before scanning or removed during handling.' },
    { id: 'transfer', title: 'Document transfer register', label: 'Control-room receipt · 09:20', detail: 'The register records the packet transferred from dispatch coordination to document control at 09:20. The sender and receiver fields contain department stamps; the individual handover signatures are blank. It establishes a departmental transfer, not the identity of either handler or the packet contents at the moment of transfer.' },
    { id: 'exception', title: 'Packet discrepancy note', label: 'Control-room audit · 09:24', detail: 'At 09:24, an auditor noted that the sleeve checklist called for an authorization leaf that was not present. The note requests a hold and a search of the source tray. It does not say when the leaf disappeared, who last saw it, or whether the page was ever completed.' }
  ],
  witnesses: [
    { id: 'auditor', name: 'Mira Sol', role: 'Document control auditor', questions: [
      { id: 'checklist', prompt: 'What does the sleeve checklist establish?', reply: 'It establishes that an authorization leaf was expected in this packet. It does not prove the leaf was ever completed or who last handled it.' },
      { id: 'absence', prompt: 'Can the 09:24 note identify when the leaf went missing?', reply: 'No. It records the discrepancy when we checked the sleeve. We have no earlier contents check between dispatch preparation and our receipt.' }
    ]},
    { id: 'scanner', name: 'Jonas Pell', role: 'Records scanning supervisor', questions: [
      { id: 'batch', prompt: 'What was included in the 09:18 scan batch?', reply: 'The request form and intake docket. The authorization leaf is not listed. The scanner account was the shared DC-1 role, so the manifest does not identify a person.' },
      { id: 'operator', prompt: 'Does the scanner field identify the operator?', reply: 'No. DC-1 is a shared role credential. The batch record has no individual badge, login or signed operator line.' }
    ]},
    { id: 'clerk', name: 'Asha Neri', role: 'Dispatch document clerk', questions: [
      { id: 'handover', prompt: 'Who signed the 09:20 packet transfer?', reply: 'The departmental stamps are present, but the individual signature fields are blank. I cannot identify a sender or receiver from this register.' },
      { id: 'source', prompt: 'Was the authorization leaf checked before dispatch?', reply: 'The packet checklist was prepared, but I cannot confirm a separate page-by-page check. The surviving record does not show that the leaf was physically present at handover.' }
    ]}
  ],
  timelineEvents: [
    { id: 'scan', time: '09:18', title: 'Request packet scan batch', detail: 'The manifest lists the request form and docket, but not the authorization leaf.' },
    { id: 'transfer', time: '09:20', title: 'Departmental packet transfer', detail: 'Dispatch coordination transfers the packet to document control.' },
    { id: 'sleeve', time: '09:22', title: 'Sleeve received with broken seal', detail: 'Document control checks the packet sleeve and its contents checklist.' },
    { id: 'exception', time: '09:24', title: 'Missing-leaf discrepancy recorded', detail: 'The auditor places the packet on hold and requests a source-tray search.' }
  ],
  correctOrder: ['scan', 'transfer', 'sleeve', 'exception'],
  suspects: [
    { id: 'unknown', name: 'Unidentified packet handler', role: 'Departmental custody only · individual unknown', note: 'The surviving records show department-level transfer and a shared scanner credential. No individual is authenticated as the last person to handle the authorization leaf.' },
    { id: 'jonas', name: 'Jonas Pell', role: 'Scanning supervisor · batch oversight', note: 'The manifest uses a shared role credential and does not establish that Jonas personally scanned or removed any page.' },
    { id: 'asha', name: 'Asha Neri', role: 'Dispatch document clerk · packet preparation', note: 'The checklist and departmental transfer do not prove Asha physically held the leaf at handover or removed it.' }
  ],
  motives: [
    { id: 'limits', label: 'The records establish a missing page by 09:18, but do not identify when it disappeared or who last handled it', note: 'The scan manifest is the earliest surviving contents record. Department stamps, blank signatures and a shared credential cannot identify an individual.' },
    { id: 'jonas', label: 'Jonas removed the page because the scanner manifest omits it', note: 'The omission establishes absence from the scan batch, not who caused it.' },
    { id: 'asha', label: 'Asha removed the page while preparing the packet', note: 'The checklist does not prove the page was present at dispatch or identify who handled the sleeve.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'limits',
  truth: 'The packet checklist expected an authorization leaf, but the 09:18 scan manifest lists only the request form and intake docket. The page was therefore absent from the earliest surviving contents record. The transfer and audit records do not establish when it disappeared or identify an individual handler.',
  proof: 'The matching receipt number links the sleeve, scan manifest, transfer register and discrepancy note. Their sequence establishes the missing-page discovery, but none contains an authenticated personal handover or contents check.',
  outcome: 'Do not accuse Jonas Pell or Asha Neri. Preserve the discrepancy as a documented chain-of-custody gap. The next lead is the source tray search and any independent record showing whether an authorization leaf was ever signed.',
} as const;

export const CASE_049_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase049Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_049_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    correctionTrailFiles: priorFiles.filter((record) => ['case048', 'case047', 'case046'].includes(record.caseId)).length
  };
}

export function isCase049TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_049_GAME.correctOrder[index]);
}

export function isCase049DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'unknown' && motiveId === 'limits';
}
