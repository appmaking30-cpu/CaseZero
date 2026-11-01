import { getPriorCaseMemory, type InvestigationArchive } from './investigationArchive';

export const CASE_035_GAME = {
  id: 'case035',
  title: 'The Page from Annex K-17',
  subtitle: 'Identify the source and custody trail of the attachment changed in Case 034, while keeping an archive mark separate from a person’s identity.',
  location: 'CENTRAL DISPATCH · RESTRICTED ARCHIVE',
  briefing: 'Case 034 established that export package D3-0724 changed from R-14 to R-15 before Niko Vale acknowledged it. The changed attachment reference now resolves to a scanned page from Annex K-17. The scan carries a small black-square routing mark and a handwritten “R.V.” notation. Trace the page to its source and determine what the marks establish without assuming who handled it.',
  clues: [
    { id: 'scan', title: 'R-15 attachment scan', label: 'Export package · attachment 04', detail: 'The attachment is a scan of a numbered source page. Its lower margin carries a black-square routing mark and the handwritten notation “R.V.” The scan itself does not show who made either mark.' },
    { id: 'index', title: 'Annex K-17 page index', label: 'Restricted archive · folio 12', detail: 'The index maps the page number and checksum to Annex K-17, shelf K-17-B. The checksum matches the attachment scan, confirming the source folio rather than merely a similar-looking copy.' },
    { id: 'intake', title: 'Sealed intake register', label: 'Archive receiving · 06:48', detail: 'The intake register records a sealed K-17 packet received at 06:48. The packet was logged under a restricted review hold. The register lists the receiving desk, not the individual who transported the packet.' },
    { id: 'routing', title: 'Routing slip and custody note', label: 'Archive control · 06:52', detail: 'The routing slip repeats the black-square mark and records transfer from the receiving desk to the restricted review shelf. A second staff member countersigned the shelf placement, but neither signature identifies who created the original mark.' }
  ],
  witnesses: [
    { id: 'sana', name: 'Sana Vey', role: 'Records reconciliation auditor', questions: [
      { id: 'source', prompt: 'How do we know the attachment came from K-17?', reply: 'The page number and checksum match the Annex K-17 index. That is stronger than matching the layout alone.' },
      { id: 'mark', prompt: 'Does the black square identify a person?', reply: 'No. It is a routing mark repeated on the slip. The mark identifies a handling path, not the person who applied it.' }
    ]},
    { id: 'mara', name: 'Mara Venn', role: 'Dispatch shift supervisor', questions: [
      { id: 'packet', prompt: 'Who brought the sealed packet to the archive?', reply: 'The receiving register records the desk and time. It does not record a courier name or a personal badge scan.' },
      { id: 'custody', prompt: 'What does the countersignature confirm?', reply: 'It confirms that the packet was placed on the restricted shelf. It does not establish who transported it before intake.' }
    ]},
    { id: 'elias', name: 'Elias Rook', role: 'Restricted archive custodian', questions: [
      { id: 'notation', prompt: 'What does “R.V.” mean in this register?', reply: 'The archive has no approved key connecting those initials to a staff identity. I cannot expand them from the notation alone.' },
      { id: 'hold', prompt: 'What was the restricted review hold for?', reply: 'It limited access to the source packet while the page reference was checked. The hold code describes handling status, not a named reviewer.' }
    ]}
  ],
  timelineEvents: [
    { id: 'intake', time: '06:48', title: 'Sealed K-17 packet received', detail: 'The receiving desk logs a packet under restricted review hold.' },
    { id: 'routing', time: '06:52', title: 'Packet placed on restricted shelf', detail: 'The routing slip and countersignature record shelf placement.' },
    { id: 'index', time: '07:02', title: 'K-17 folio indexed', detail: 'The page number and checksum are entered in the annex index.' },
    { id: 'scan', time: '07:23', title: 'Folio appears in R-15 attachment', detail: 'The matching source page is included in the revised export package.' }
  ],
  correctOrder: ['intake', 'routing', 'index', 'scan'],
  suspects: [
    { id: 'unknown', name: 'Unidentified archive handler', role: 'Original mark author unresolved', note: 'The custody records establish a route, but do not identify who made the black-square mark or wrote the initials.' },
    { id: 'sana', name: 'Sana Vey', role: 'Records auditor', note: 'She verified the checksum after the source page was located; that does not make her the original handler.' },
    { id: 'mara', name: 'Mara Venn', role: 'Shift supervisor', note: 'Supervisory responsibility does not establish that she transported or marked the packet.' }
  ],
  motives: [
    { id: 'source', label: 'Confirm the attachment came from Annex K-17 and trace its recorded custody', note: 'The checksum, index, intake register and routing slip support the source and handling sequence.' },
    { id: 'sana', label: 'Prove Sana created the black-square mark', note: 'Her later checksum review does not identify the original author of the mark.' },
    { id: 'mara', label: 'Prove Mara transported the sealed packet', note: 'The intake register names the receiving desk, not the courier.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'source',
  truth: 'The R-15 attachment is a verified scan of a source folio from Annex K-17. The sealed packet was received at 06:48, placed on the restricted shelf at 06:52, indexed at 07:02, and later included in R-15. The black-square mark identifies a routing path, while “R.V.” remains an unverified notation. The original handler and mark author are not identified.',
  proof: 'The attachment checksum matches the K-17 page index. The intake register and countersigned routing slip establish the packet’s recorded custody path. Neither record names the courier or author of the black-square mark.',
  outcome: 'The attachment’s source is verified, and the black-square mark now has a documented archive route. The initials remain unresolved. The next file will compare this route with the restricted review notes connected to Rowan Vale.',
} as const;

export const CASE_035_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false,
};

export function getCase035Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_035_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((total, record) => total + record.inspectedClues.length, 0),
    dispatchTrailFiles: priorFiles.filter((record) => ['case034', 'case033', 'case032', 'case031', 'case030'].includes(record.caseId)).length,
  };
}

export function isCase035TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_035_GAME.correctOrder[index]);
}

export function isCase035DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_035_GAME.correctSuspect && motiveId === CASE_035_GAME.correctMotive;
}
