import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_053_GAME = {
  id: 'case053',
  title: 'The Duplicate Dispatch Seal',
  subtitle: 'One seal number appears on two packets. The register says there was only one.',
  location: 'CENTRAL DISPATCH · SEAL CONTROL',
  briefing: 'Case 052 proved that the D-4 route was executed without authenticated approval. Its closing note referenced a duplicated dispatch seal. Audit the seal register, issue counterfoil, two packet records and the independent exception review. Determine what is duplicated in the records—and what the evidence cannot establish about the physical seal or the person who used it.',
  clues: [
    { id: 'register', title: 'Seal master register', label: 'Inventory control · 08:50', detail: 'The master register lists one active seal with identifier DS-44-19 in the dispatch batch. It records a single issued unit and no authorized duplicate. The register describes the official inventory entry; it cannot prove the physical seal remained under continuous custody.' },
    { id: 'counterfoil', title: 'Issue counterfoil', label: 'Seal desk · 09:02', detail: 'The counterfoil records DS-44-19 issued to the Central Dispatch unit. The receiving field carries a department stamp but no named recipient signature. It supports a unit-level issue, not personal possession.' },
    { id: 'd17', title: 'D-17 packet seal entry', label: 'Dispatch ledger · 09:31', detail: 'The D-17 release record lists DS-44-19 as its seal identifier. This matches the single registered issue and the route already traced in Case 052.' },
    { id: 'f09', title: 'F-09 packet seal entry', label: 'Dispatch ledger · 09:34', detail: 'A separate F-09 packet record lists the same DS-44-19 identifier three minutes later. The record creates an identifier collision, but it does not establish whether a second physical seal existed, whether a number was copied, or who entered it.' },
    { id: 'audit', title: 'Independent seal variance review', label: 'Control audit · 10:12', detail: 'The reviewer flags the same serial on two packet records despite a single registered issue. No physical seal comparison, image capture or named operator record was retained. The audit confirms a record discrepancy, not the existence of a counterfeit object or an individual culprit.' }
  ],
  witnesses: [
    { id: 'yara', name: 'Yara Noll', role: 'Seal inventory custodian', questions: [
      { id: 'stock', prompt: 'How many DS-44-19 units were officially issued?', reply: 'The master register and counterfoil show one unit issued to the dispatch department. I cannot confirm who physically received it because the named recipient field is blank.' },
      { id: 'duplicate', prompt: 'Does the register authorize a second DS-44-19 seal?', reply: 'No. There is one active serial and no authorized duplicate entry. That does not tell us whether the second packet record copied the number or referred to another physical item.' }
    ]},
    { id: 'dev', name: 'Dev Arlen', role: 'Dispatch ledger auditor', questions: [
      { id: 'collision', prompt: 'What is unusual about the two packet entries?', reply: 'D-17 and F-09 both list DS-44-19. They are separate packet records, but the ledger does not retain a photograph or physical inspection for either seal.' },
      { id: 'operator', prompt: 'Can the ledger identify who entered the F-09 seal number?', reply: 'No. The entry is stamped by the dispatch station account. There is no named operator or personal authentication attached.' }
    ]},
    { id: 'olin', name: 'Olin Crest', role: 'Independent control reviewer', questions: [
      { id: 'finding', prompt: 'What did the independent review actually confirm?', reply: 'It confirmed a duplicate serial reference across two packet records against a single official issue. It did not confirm two physical seals.' },
      { id: 'limits', prompt: 'What evidence would be needed to identify the physical seal or its handler?', reply: 'A retained physical comparison, authenticated image, or signed personal custody record. None is present in this file.' }
    ]}
  ],
  timelineEvents: [
    { id: 'register', time: '08:50', title: 'Single seal entered in master register', detail: 'DS-44-19 appears as one active unit.' },
    { id: 'counterfoil', time: '09:02', title: 'Seal issued to dispatch department', detail: 'The department stamp records issue without a named recipient.' },
    { id: 'd17', time: '09:31', title: 'D-17 packet lists DS-44-19', detail: 'The first packet record uses the registered identifier.' },
    { id: 'f09', time: '09:34', title: 'F-09 packet repeats DS-44-19', detail: 'A second packet record carries the same identifier.' },
    { id: 'audit', time: '10:12', title: 'Independent review flags serial collision', detail: 'The control audit identifies the duplicate reference.' }
  ],
  correctOrder: ['register', 'counterfoil', 'd17', 'f09', 'audit'],
  suspects: [
    { id: 'collision', name: 'Duplicate seal identifier in dispatch records', role: 'Verified records finding', note: 'Two packet records repeat one officially issued serial. The physical object and individual operator remain unverified.' },
    { id: 'yara', name: 'Yara Noll', role: 'Seal inventory custodian', note: 'The register establishes one official issue but does not show Yara created the second packet entry or handled either seal.' },
    { id: 'dev', name: 'Dev Arlen', role: 'Dispatch ledger auditor', note: 'The station account and audit role do not identify Dev as the person who entered the F-09 record.' }
  ],
  motives: [
    { id: 'record', label: 'The same seal identifier was recorded on two packets, but the physical seal and operator cannot be established', note: 'The register, counterfoil, two packet entries and independent review establish a duplicate record reference—not a proven counterfeit seal.' },
    { id: 'yara', label: 'Yara issued a second unauthorized seal', note: 'The official register shows one issue and no named personal receipt; it does not prove Yara issued another physical seal.' },
    { id: 'dev', label: 'Dev copied the seal number into the F-09 ledger', note: 'The dispatch station account does not identify the individual operator.' }
  ],
  correctSuspect: 'collision',
  correctMotive: 'record',
  truth: 'DS-44-19 appears in the D-17 and F-09 packet records even though the master register and issue counterfoil show one official unit. The independent review confirms the serial collision. The file cannot establish whether there were two physical seals, whether the identifier was copied, or who entered the second record.',
  proof: 'The 08:50 master register lists one DS-44-19 unit; the 09:02 counterfoil records one department-level issue; the 09:31 D-17 and 09:34 F-09 entries repeat the identifier; and the 10:12 review flags the collision. No physical comparison or named operator record survives.',
  outcome: 'Record a duplicate seal identifier across two dispatch records. Do not label a physical seal counterfeit or accuse Yara Noll or Dev Arlen. The next lead is the independent archive of dispatch images and the Missing Detective’s recorder transfer reference.',
} as const;

export const CASE_053_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase053Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_053_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    dispatchFiles: priorFiles.filter((record) => ['case052', 'case051', 'case050', 'case049', 'case048'].includes(record.caseId)).length
  };
}

export function isCase053TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_053_GAME.correctOrder.length && order.every((id, index) => id === CASE_053_GAME.correctOrder[index]);
}

export function isCase053DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'collision' && motiveId === 'record';
}
