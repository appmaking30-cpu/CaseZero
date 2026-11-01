import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_034_GAME = {
  id: 'case034',
  title: 'The Revision in the Margin',
  subtitle: 'Trace what changed inside the export package without confusing a file revision with the person who opened the shared session.',
  location: 'CENTRAL DISPATCH · EXPORT CONTROL ROOM',
  briefing: 'Case 033 verified that Niko Vale acknowledged the export receipt at 07:24. It did not identify who opened the shared D-3 session at 07:22. A recovered revision ledger now shows that the queued package changed before acknowledgement. Determine which revision was substituted, when the change was recorded, and what the ledger can—and cannot—attribute.',
  clues: [
    { id: 'manifest', title: 'Original export manifest', label: 'Queue archive · 07:23', detail: 'Package D3-0724 entered the queue with revision R-14. The manifest records the package version at intake, but not the person who created the shared terminal session.' },
    { id: 'revision', title: 'Revision comparison sheet', label: 'Export control · 07:23:40', detail: 'The comparison sheet shows R-14 was superseded by R-15. One attachment reference changed; the package identifier remained the same.' },
    { id: 'ledger', title: 'Revision ledger entry', label: 'Audit store · 07:23:52', detail: 'The ledger records a service-side revision commit under the shared DISPATCH-OPS profile. It records the profile and timestamp, not a personal operator credential.' },
    { id: 'receipt', title: 'Receipt package checksum', label: 'Audit counter · 07:24', detail: 'The checksum on Niko Vale’s acknowledged receipt matches revision R-15. This links his acknowledgement to the revised package, not to the earlier login or the person who submitted the revision.' }
  ],
  witnesses: [
    { id: 'sana', name: 'Sana Vey', role: 'Records reconciliation auditor', questions: [
      { id: 'version', prompt: 'Which revision reached the receipt stage?', reply: 'The receipt checksum matches R-15. The original queue manifest began at R-14.' },
      { id: 'identity', prompt: 'Does the revision ledger name a person?', reply: 'No. It records the shared DISPATCH-OPS profile and a service-side commit. There is no personal operator token.' }
    ]},
    { id: 'niko', name: 'Niko Vale', role: 'Dispatch records clerk', questions: [
      { id: 'receipt', prompt: 'What did your badge acknowledgement cover?', reply: 'I acknowledged the package presented at the counter. The checksum shows that package was R-15.' },
      { id: 'edit', prompt: 'Did you submit the revision?', reply: 'The receipt does not show who prepared the revision. I cannot claim the edit from an acknowledgement made afterward.' }
    ]},
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch shift supervisor', questions: [
      { id: 'profile', prompt: 'What does the shared profile tell us?', reply: 'It identifies the account context used by the service. Several team members could access that shared profile.' },
      { id: 'scope', prompt: 'What is the strongest defensible finding?', reply: 'R-15 replaced R-14 before the receipt was acknowledged. The individual who submitted the revision remains unidentified.' }
    ]}
  ],
  timelineEvents: [
    { id: 'manifest', time: '07:23:00', title: 'R-14 enters export queue', detail: 'The original package manifest is recorded.' },
    { id: 'revision', time: '07:23:40', title: 'R-15 replaces R-14', detail: 'The comparison sheet records one changed attachment reference.' },
    { id: 'ledger', time: '07:23:52', title: 'Shared-profile revision commit', detail: 'The audit store records a service-side commit.' },
    { id: 'receipt', time: '07:24:00', title: 'R-15 receipt acknowledged', detail: 'Niko’s badge acknowledgement matches the revised package checksum.' }
  ],
  correctOrder: ['manifest', 'revision', 'ledger', 'receipt'],
  suspects: [
    { id: 'unknown', name: 'Unidentified shared-profile operator', role: 'Revision submitter unresolved', note: 'The ledger records a shared profile, not a named person.' },
    { id: 'niko', name: 'Niko Vale', role: 'Verified receipt acknowledger', note: 'His badge acknowledged R-15 after the revision was committed.' },
    { id: 'mara', name: 'Mara Venn', role: 'Shift supervisor', note: 'Her role does not establish that she submitted the revision.' }
  ],
  motives: [
    { id: 'revision', label: 'Establish that R-15 replaced R-14 before acknowledgement', note: 'The comparison sheet, ledger timestamp and receipt checksum support this sequence.' },
    { id: 'niko', label: 'Prove Niko submitted R-15', note: 'His receipt acknowledgement occurred after the revision commit.' },
    { id: 'mara', label: 'Prove Mara used the shared profile', note: 'The shared profile does not identify a specific team member.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'revision',
  truth: 'Revision R-15 replaced R-14 before the package was acknowledged. The service ledger records the shared DISPATCH-OPS profile, while Niko Vale’s personal badge confirms only the later receipt acknowledgement. The individual revision submitter remains unidentified.',
  proof: 'The original manifest records R-14, the comparison sheet records the change to R-15, the ledger timestamps the shared-profile commit, and the receipt checksum confirms that R-15 was the version Niko acknowledged.',
  outcome: 'The package revision is now traced, but the person behind the shared-profile commit remains unknown. The next file follows the changed attachment reference to its source record.'
} as const;

export const CASE_034_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase034Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_034_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case033', 'case032', 'case031', 'case030', 'case029'].includes(record.caseId)).length,
  };
}

export function isCase034TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_034_GAME.correctOrder[index]);
}

export function isCase034DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_034_GAME.correctSuspect && motiveId === CASE_034_GAME.correctMotive;
}
