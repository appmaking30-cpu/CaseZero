import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_058_GAME = {
  id: 'case058',
  title: 'The Unindexed Buffer',
  subtitle: 'A preserved signal fragment can be authentic without identifying the device that sent it.',
  location: 'NORTH ANNEX · LOCAL MAINTENANCE CACHE',
  briefing: 'Case 057 established that the west-corridor response was an automatic WC-4 acknowledgement, not proof Rowan travelled there. A maintenance technician now reports an unindexed buffer copy retained outside the central network archive. Authenticate the copy, reconstruct its clock and export history, and determine whether it can be matched to Rowan’s recorder. Do not confuse a genuine signal fragment with proof of a specific device or person.',
  clues: [
    { id: 'cache', title: 'Local cache inventory card', label: 'Maintenance cabinet C-2 · 07:10', detail: 'The signed cabinet inventory lists buffer segment B-17 on a removable maintenance cache. The entry was added during the routine weekly sweep, but the index field is blank. The card identifies the storage segment and cabinet slot, not the original recording device or the person who created it.' },
    { id: 'hash', title: 'Independent checksum comparison', label: 'Integrity bench · 07:42', detail: 'An independent integrity bench calculates a checksum for B-17 and matches it to the fragment hash recorded in the repeater’s local maintenance journal. The match supports that the buffer copy is unchanged from the fragment logged at WC-4. A checksum confirms data integrity, not the identity or serial number of the recording device.' },
    { id: 'clock', title: 'Cache clock calibration note', label: 'Service bench · 08:05', detail: 'The cache clock ran six minutes slow during the relevant period. The signed calibration note gives the correction interval and confirms that the buffer’s displayed 19:18 time corresponds to 19:24 on the central control clock. The correction establishes timing, not a person’s location or device ownership.' },
    { id: 'export', title: 'Maintenance export journal', label: 'Local service terminal · 08:26', detail: 'The export journal records B-17 copied from cache C-2 to an isolated review drive. The source and destination storage IDs are present, but the operator field contains only the shared MT-4 maintenance role. No individual badge, workstation session or witness signature identifies who performed the export.' },
    { id: 'fingerprint', title: 'Recorder fingerprint comparison', label: 'Independent media lab · 09:00', detail: 'The lab compares B-17 with the available reference profile for Rowan Vale’s recorder. The buffer contains a network carrier fragment but no device serial, hardware signature or recorder-specific watermark. The reference profile itself has no verified serial from Rowan’s last assignment. The fragment is authentic and correctly timed, but it cannot be attributed to Rowan’s recorder.' }
  ],
  witnesses: [
    { id: 'mira', name: 'Mira Dalen', role: 'Independent cache integrity examiner', questions: [
      { id: 'hash', prompt: 'What does the matching checksum establish?', reply: 'It supports that B-17 is an unchanged copy of the fragment logged in the local repeater journal. It does not tell us which device originated the carrier.' },
      { id: 'source', prompt: 'Does the cabinet card identify who created the buffer?', reply: 'No. It identifies the storage segment and its cabinet slot. The original device and the person who created the segment are not named.' }
    ]},
    { id: 'oren', name: 'Oren Vey', role: 'North Annex maintenance technician', questions: [
      { id: 'clock', prompt: 'How should the buffer timestamp be read?', reply: 'The cache clock was six minutes slow. Add six minutes to the displayed 19:18 time to compare it with the central 19:23 record.' },
      { id: 'operator', prompt: 'Can the export journal identify the maintenance operator?', reply: 'No. MT-4 is a shared role. The journal records the copy operation and storage IDs, not a named person or badge session.' }
    ]},
    { id: 'talia', name: 'Talia Ren', role: 'Independent media-lab analyst', questions: [
      { id: 'fingerprint', prompt: 'Does B-17 carry Rowan’s recorder fingerprint?', reply: 'No. It has no serial, hardware signature or recorder-specific watermark that can be compared to a verified Rowan device profile.' },
      { id: 'attribution', prompt: 'Can the authentic fragment still be attributed to Rowan?', reply: 'Not from this evidence. The checksum and corrected time authenticate the fragment as a network record, but there is no device-level link to Rowan or his recorder.' }
    ]}
  ],
  timelineEvents: [
    { id: 'fragment', time: '19:23', title: 'WC-4 local journal records the RS-14 fragment', detail: 'The repeater maintenance journal records the fragment later copied as B-17.' },
    { id: 'cache', time: '19:18', title: 'B-17 retained on local cache C-2', detail: 'The cache clock is six minutes slow; the displayed time corresponds to 19:23 centrally.' },
    { id: 'inventory', time: '07:10', title: 'Weekly cabinet inventory lists B-17', detail: 'The segment is listed in cabinet C-2, but its index field is blank.' },
    { id: 'integrity', time: '07:42', title: 'Independent checksum confirms an unchanged copy', detail: 'The checksum matches the fragment hash in the local repeater journal.' },
    { id: 'export', time: '08:26', title: 'B-17 exported to an isolated review drive', detail: 'The shared MT-4 role appears in the journal; no individual operator is identified.' },
    { id: 'lab', time: '09:00', title: 'Media lab finds no recorder-specific fingerprint', detail: 'The fragment has no verified device serial or hardware signature.' }
  ],
  correctOrder: ['fragment', 'cache', 'inventory', 'integrity', 'export', 'lab'],
  suspects: [
    { id: 'authentic', name: 'Authentic WC-4 network fragment', role: 'Records finding', note: 'The checksum and corrected clock authenticate the buffer as a copy of the repeater fragment, but do not identify the source device.' },
    { id: 'oren', name: 'Oren Vey', role: 'Maintenance technician', note: 'The shared MT-4 export role does not identify Oren as the operator or recorder handler.' },
    { id: 'talia', name: 'Talia Ren', role: 'Media-lab analyst', note: 'The lab comparison documents the limits of attribution; it does not make Talia the source of the fragment.' }
  ],
  motives: [
    { id: 'integrity', label: 'B-17 is an authentic, correctly timed network fragment, but it has no recorder-specific fingerprint', note: 'The checksum and clock correction establish integrity and timing. The missing serial and hardware signature prevent attribution to Rowan’s recorder.' },
    { id: 'rowan', label: 'The matching checksum proves Rowan’s recorder sent the fragment', note: 'A checksum links two copies of the same data; it does not identify the device that generated the original fragment.' },
    { id: 'oren', label: 'Oren exported the fragment and removed the recorder identity', note: 'The export journal contains a shared role and no evidence of alteration or a named operator.' }
  ],
  correctSuspect: 'authentic',
  correctMotive: 'integrity',
  truth: 'B-17 is an unchanged copy of the WC-4 network fragment. The six-minute cache clock offset places it at 19:23 centrally, and the export journal documents its later transfer to an isolated review drive. The fragment contains no device serial, hardware signature or recorder-specific watermark. It therefore cannot be attributed to Rowan’s recorder, and the shared MT-4 role does not identify the person who exported it.',
  proof: 'The local journal records the original fragment at 19:23; the cache clock note corrects B-17’s displayed 19:18 time by six minutes; the independent checksum matches the fragment hash; the export journal records only shared role MT-4; and the media lab finds no serial or hardware signature linking the fragment to Rowan’s recorder.',
  outcome: 'The unindexed buffer is authentic and correctly timed, but it does not identify Rowan’s recorder or its handler. Keep the device attribution unresolved. The next lead is the maintenance cache access roster and the independent retention copy that may establish who had authorized access to C-2 when B-17 was created.',
} as const;

export const CASE_058_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase058Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_058_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    recorderTrailFiles: priorFiles.filter((record) => ['case057', 'case056', 'case055', 'case054', 'case053', 'case052', 'case051', 'case050', 'case049', 'case048'].includes(record.caseId)).length
  };
}

export function isCase058TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_058_GAME.correctOrder.length && order.every((id, index) => id === CASE_058_GAME.correctOrder[index]);
}

export function isCase058DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === CASE_058_GAME.correctSuspect && motiveId === CASE_058_GAME.correctMotive;
}
