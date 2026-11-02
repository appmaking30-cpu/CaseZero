import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_041_GAME = {
  id: 'case041',
  title: 'The Missing Signature',
  subtitle: 'Two departments received the handover packet. Only one copy appears to have lost its acknowledgement.',
  location: 'CENTRAL DISPATCH · RECORDS INTAKE',
  briefing: 'Case 040 established that desk responsibility transferred to Silver Shift, but the recipient acknowledgement on the dispatch copy is blank. The control office insists the packet arrived that way. A records-intake manifest now shows that a second copy was routed to the Records Annex minutes earlier. Compare the copies, their intake sequence and the archive index. Do not assume that a blank field proves erasure—or that a delivery receipt proves the desk operator signed.',
  clues: [
    { id: 'dispatchCopy', title: 'Dispatch carbon copy', label: 'Desk records · 09:02', detail: 'The retained dispatch carbon records the Blue-to-Silver desk transfer. The recipient acknowledgement box is blank. The copy has no attached correction slip or notation explaining the empty field.' },
    { id: 'controlIntake', title: 'Control-office packet intake', label: 'Control office · 09:05', detail: 'The intake clerk records receipt of a sealed handover packet at 09:05. The receipt identifies the packet and receiving office, not the individual who accepted DS-1. It does not describe the acknowledgement field.' },
    { id: 'annexManifest', title: 'Records Annex duplicate manifest', label: 'Records routing · 09:04', detail: 'A duplicate of the handover packet was registered for the Records Annex at 09:04, one minute before the control-office receipt. The manifest lists the packet as a two-copy set but does not describe the signature field on either copy.' },
    { id: 'archiveIndex', title: 'Annex container index', label: 'Archive catalogue · 09:06', detail: 'The index places the duplicate packet in sealed container RA-17 under shift-handover records. It records a storage location, not the contents of the acknowledgement box. The original duplicate has not yet been retrieved.' }
  ],
  witnesses: [
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch supervisor', questions: [
      { id: 'original', prompt: 'Does the blank dispatch copy prove the signature was erased?', reply: 'No. It proves only that this retained copy has a blank field. We need to compare it with the duplicate before describing how the gap occurred.' },
      { id: 'handover', prompt: 'Did the control office accept the desk on behalf of Silver Shift?', reply: 'The office receipt confirms packet delivery. It is not the incoming operator acknowledgement and cannot substitute for it.' }
    ]},
    { id: 'sana', name: 'Sana Vey', role: 'Records reconciliation auditor', questions: [
      { id: 'manifest', prompt: 'What does the two-copy manifest establish?', reply: 'It establishes that a duplicate was routed to the Records Annex. It does not tell us whether that copy contains a completed acknowledgement.' },
      { id: 'sequence', prompt: 'Which record came first: Annex routing or control intake?', reply: 'The Annex manifest is timestamped 09:04. Control-office intake is 09:05. That is the recorded order, though neither timestamp identifies the desk recipient.' }
    ]},
    { id: 'elias', name: 'Elias Rook', role: 'Records Annex custodian', questions: [
      { id: 'container', prompt: 'Can the archive index tell us what is written on the duplicate?', reply: 'No. RA-17 is a location reference. The container must be retrieved and its contents examined before we can compare the acknowledgement fields.' },
      { id: 'alteration', prompt: 'Does a missing field in one copy establish tampering?', reply: 'No. A blank field can be blank at creation, incomplete during handover, or different across copies. We need the physical duplicate and its custody history.' }
    ]}
  ],
  timelineEvents: [
    { id: 'dispatchCopy', time: '09:02', title: 'Dispatch carbon records desk transfer', detail: 'The retained copy has a blank recipient acknowledgement.' },
    { id: 'annexManifest', time: '09:04', title: 'Duplicate routed to Records Annex', detail: 'The two-copy packet is entered for archive storage.' },
    { id: 'controlIntake', time: '09:05', title: 'Control office receives sealed packet', detail: 'The office receipt confirms delivery, not desk acceptance.' },
    { id: 'archiveIndex', time: '09:06', title: 'Duplicate assigned to container RA-17', detail: 'The catalogue records the duplicate’s storage location.' }
  ],
  correctOrder: ['dispatchCopy', 'annexManifest', 'controlIntake', 'archiveIndex'],
  suspects: [
    { id: 'unknown', name: 'Unresolved records custodian', role: 'Copy discrepancy established · cause unknown', note: 'The records identify two copies and two destinations, but neither copy has yet been compared. No person is established as having removed or altered a signature.' },
    { id: 'mara', name: 'Mara Venn', role: 'Outgoing shift supervisor', note: 'Her role connects her to the handover process, not to an alteration of either copy.' },
    { id: 'elias', name: 'Elias Rook', role: 'Records Annex custodian', note: 'The archive index identifies the container under his department, not personal handling or alteration.' }
  ],
  motives: [
    { id: 'archive', label: 'A second handover copy exists in Records Annex container RA-17, but its contents remain unverified', note: 'The manifest and archive index establish the duplicate’s route and location. They do not establish whether its acknowledgement is complete.' },
    { id: 'erased', label: 'Someone erased the recipient signature from the dispatch copy', note: 'A blank field alone cannot establish that writing was present and later removed.' },
    { id: 'never', label: 'The incoming recipient never signed either copy', note: 'The duplicate has not been retrieved, so this conclusion is premature.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'archive',
  truth: 'The dispatch carbon contains a blank acknowledgement field. A two-copy packet was routed to the Records Annex at 09:04, followed by control-office intake at 09:05. The duplicate is indexed in sealed container RA-17. The available records establish where the second copy went, but not what it says.',
  proof: 'The 09:02 carbon establishes the blank field on the retained dispatch copy. The 09:04 manifest establishes a duplicate and its destination; the 09:05 receipt establishes control-office delivery; and the 09:06 index identifies container RA-17. No retrieved duplicate or alteration record is present.',
  outcome: 'The signature has not been proven erased, forged or never written. The next step is a controlled retrieval of RA-17 and a side-by-side comparison of the original duplicate, its seal and its custody record.',
} as const;

export const CASE_041_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase041Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_041_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case040', 'case039', 'case038', 'case037', 'case036'].includes(record.caseId)).length,
  };
}

export function isCase041TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_041_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_041_GAME.correctOrder[index]);
}

export function isCase041DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_041_GAME.correctSuspect && motiveId === CASE_041_GAME.correctMotive;
}
