import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_050_GAME = {
  id: 'case050',
  title: 'The Empty Source Tray',
  subtitle: 'A tray record lists the missing leaf. The physical page is still unaccounted for.',
  location: 'CENTRAL DISPATCH · SOURCE-TRAY BAY',
  briefing: 'Case 049 established that the authorization leaf was absent from the 09:18 scan batch, but the custody trail did not show when it disappeared. A source-tray search now finds a tray ledger entry, a staging transfer slip, a shelf-position audit and a later search report. Reconstruct the tray trail. Decide whether the ledger proves the page was physically present—and whether any individual can be identified as its last handler.',
  clues: [
    { id: 'ledger', title: 'Source-tray ledger extract', label: 'Tray ST-4 · Entry 09:04', detail: 'The ST-4 ledger lists one D-17 authorization leaf as allocated to the outbound packet slot at 09:04. The entry is stamped “dispatch coordination”; the operator initials field is blank. This proves that a ledger entry was made, not that an auditor independently saw the physical page placed in the tray.' },
    { id: 'transfer', title: 'Staging transfer slip', label: 'Dispatch staging · 09:11', detail: 'The slip records tray ST-4 moved to scan staging at 09:11. The origin and destination fields carry department stamps, while the individual handover fields are blank. It establishes a recorded tray movement, not the identity of a carrier or the contents of the tray at transfer.' },
    { id: 'shelf', title: 'Shelf-position audit', label: 'Bay ST-4 · 09:16', detail: 'A shelf audit records ST-4 as empty at 09:16 after the staging transfer. The audit lists a zone check but no page-by-page contents reconciliation. It establishes that the tray was not on its assigned shelf; it does not prove the authorization leaf was inside it or where the tray had gone.' },
    { id: 'search', title: 'Source-tray search report', label: 'Records response · 09:26', detail: 'At 09:26, staff searched the source-tray bay and scan-staging return shelf. The report found no authorization leaf and notes that ST-4 had not been returned to its assigned position. The search confirms the page was not recovered in those locations, but contains no named witness to the last physical sighting.' }
  ],
  witnesses: [
    { id: 'ledgerclerk', name: 'Niko Daran', role: 'Dispatch ledger clerk', questions: [
      { id: 'entry', prompt: 'What does the 09:04 ledger entry prove?', reply: 'It proves the system recorded an authorization leaf against ST-4. The operator field is blank, and the ledger is not an independent physical count.' },
      { id: 'initials', prompt: 'Can the department stamp identify the person who entered it?', reply: 'No. The stamp identifies the dispatch coordination desk, not the individual clerk at the ledger.' }
    ]},
    { id: 'staging', name: 'Rhea Venn', role: 'Scan-staging coordinator', questions: [
      { id: 'movement', prompt: 'Who signed the 09:11 tray transfer?', reply: 'The origin and destination department stamps are present, but the individual handover fields are blank.' },
      { id: 'contents', prompt: 'Was the tray contents checked during transfer?', reply: 'The surviving slip records the tray movement only. It has no itemized contents check or signed count.' }
    ]},
    { id: 'auditor', name: 'Oren Saye', role: 'Source-bay inventory auditor', questions: [
      { id: 'shelf', prompt: 'What did the 09:16 shelf audit actually inspect?', reply: 'It checked whether ST-4 was in its assigned shelf position. It did not reconcile every document that may have been inside.' },
      { id: 'search', prompt: 'Does the 09:26 search identify the last person to see the leaf?', reply: 'No. It records the locations searched and the result. There is no authenticated personal sighting or handover in that report.' }
    ]}
  ],
  timelineEvents: [
    { id: 'ledger', time: '09:04', title: 'Authorization leaf entered in tray ledger', detail: 'The role-stamped ledger lists the leaf against ST-4, without a named operator or physical count.' },
    { id: 'transfer', time: '09:11', title: 'ST-4 moved to scan staging', detail: 'The department-stamped slip records the tray movement without individual signatures.' },
    { id: 'shelf', time: '09:16', title: 'Assigned shelf position found empty', detail: 'The audit checks the shelf position, not the tray contents.' },
    { id: 'search', time: '09:26', title: 'Source-tray search reports no recovery', detail: 'The search finds no leaf in the listed locations and no last handler.' }
  ],
  correctOrder: ['ledger', 'transfer', 'shelf', 'search'],
  suspects: [
    { id: 'unknown', name: 'Unidentified tray handler', role: 'Department-level movement · individual unknown', note: 'The ledger and transfer slip use department stamps, and no individual signed a physical contents check or handover.' },
    { id: 'niko', name: 'Niko Daran', role: 'Dispatch ledger clerk · desk entry', note: 'The role-stamped ledger has no operator initials and does not prove Niko physically placed or handled the leaf.' },
    { id: 'rhea', name: 'Rhea Venn', role: 'Scan-staging coordinator · transfer oversight', note: 'The transfer slip records a department-level movement with blank personal handover fields; it does not identify Rhea as the carrier.' }
  ],
  motives: [
    { id: 'limits', label: 'The ledger records an allocation, but no independent contents check or signed handover identifies the last handler', note: 'The shelf audit and search establish missing locations, not physical possession by a named person.' },
    { id: 'niko', label: 'Niko entered the leaf in the ledger and must have removed it', note: 'A department-stamped entry with a blank operator field does not identify its author or prove removal.' },
    { id: 'rhea', label: 'Rhea carried the tray to staging and removed the page', note: 'The transfer records no individual carrier and no itemized contents check.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'limits',
  truth: 'The 09:04 ledger records an authorization leaf allocated to ST-4, but it is not an independent physical count. The tray movement, empty shelf audit and later search establish a missing-tray trail, not that the page was physically present in the tray or who last handled it.',
  proof: 'The matching ST-4 and D-17 references connect the ledger, transfer slip, shelf audit and search report. Their sequence is consistent, but every personal operator or handover field is blank and no record independently verifies the tray contents.',
  outcome: 'Do not accuse Niko Daran or Rhea Venn. Preserve the ledger as evidence of a recorded allocation, not proof of physical custody. The next lead is the dispatch authorization workflow itself: determine whether the approval leaf was ever signed and independently witnessed.',
} as const;

export const CASE_050_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase050Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_050_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    correctionTrailFiles: priorFiles.filter((record) => ['case049', 'case048', 'case047'].includes(record.caseId)).length
  };
}

export function isCase050TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_050_GAME.correctOrder[index]);
}

export function isCase050DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'unknown' && motiveId === 'limits';
}
