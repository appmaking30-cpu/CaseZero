import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_056_GAME = {
  id: 'case056',
  title: 'The Relay Window',
  subtitle: 'A verified presence is not proof of who held the recorder.',
  location: 'NORTH ANNEX · FIELD CONTROL',
  briefing: 'Case 055 established Rowan Vale’s last independently verified assignment: North Annex task RS-14, scheduled 19:00–19:45. The next lead is the field log and independent relay-control recording. Reconcile their clocks before deciding what they prove. This file can establish whether Rowan was independently present during the assignment window, but do not turn a verified call or badge event into proof of recorder custody.',
  clues: [
    { id: 'fieldlog', title: 'North Annex field log', label: 'Field station R-2 · 19:11', detail: 'The original field log records an east-gate badge event for Rowan Vale at 19:11, followed by an R-2 relay check under task RS-14. The badge event is tied to Rowan’s assigned credential. It corroborates presence at the Annex, but does not record a recorder serial or equipment handover.' },
    { id: 'recording', title: 'Independent relay-control recording', label: 'Relay archive · 19:16', detail: 'A separately retained control-room recording captures the RS-14 call sign and Rowan’s registered voice confirming the R-2 signal check. The archive hash and recording index pre-date this review. It independently corroborates Rowan’s participation in the relay window, not possession of a particular recorder.' },
    { id: 'clock', title: 'Clock synchronization certificate', label: 'Control engineering · 20:20', detail: 'The North Annex field logger ran four minutes fast. The relay archive clock matched the central time standard within one second. Applying the documented offset places the field-log badge event at 19:07 central time; the recording remains at 19:16. Both fall within the RS-14 window.' },
    { id: 'channel', title: 'Channel assignment sheet', label: 'Radio control · 18:58', detail: 'Channel 6 was assigned to RS-14 for the 19:00–19:45 survey. The sheet identifies a task channel and control desk, not a unique handset or recorder. No device serial appears beside Rowan’s call sign.' },
    { id: 'audit', title: 'Independent media and equipment audit', label: 'Evidence review · 21:05', detail: 'The audit verifies that the relay recording is complete and that its archive hash matches the pre-review copy. The equipment register still has no serial-level issue or return linked to RS-14. Presence and task participation are corroborated; the recorder’s physical identity and last handler remain unknown.' }
  ],
  witnesses: [
    { id: 'tessa', name: 'Tessa Rill', role: 'North Annex field-log custodian', questions: [
      { id: 'badge', prompt: 'What does the east-gate event establish?', reply: 'The assigned Rowan Vale credential registered at the Annex gate. It is independent evidence of presence at the site, but it does not identify equipment carried through the gate.' },
      { id: 'offset', prompt: 'Why does the field-log time need correction?', reply: 'The logger was four minutes fast. The certificate supplies the exact offset, so the gate event converts to 19:07 central time.' }
    ]},
    { id: 'malik', name: 'Malik Oran', role: 'Relay-control archive operator', questions: [
      { id: 'voice', prompt: 'Can the recording be linked to Rowan?', reply: 'The indexed RS-14 call sign and registered voice match Rowan’s control profile. The independently retained copy and archive hash pre-date this review.' },
      { id: 'device', prompt: 'Does the recording identify Rowan’s recorder?', reply: 'No. It confirms a relay call and signal check. There is no device serial, handset identifier or equipment handover in the recording index.' }
    ]},
    { id: 'iven', name: 'Iven Cross', role: 'Independent time and equipment auditor', questions: [
      { id: 'sequence', prompt: 'Do the corrected times fit the RS-14 window?', reply: 'Yes. The gate event is 19:07 central time and the relay recording is 19:16. Both fall within the scheduled 19:00–19:45 window.' },
      { id: 'custody', prompt: 'Can this file identify the recorder’s last handler?', reply: 'No. It independently corroborates Rowan’s presence and participation, but no serial-level issue, return or physical handover survives.' }
    ]}
  ],
  timelineEvents: [
    { id: 'channel', time: '18:58', title: 'Channel 6 assigned to RS-14', detail: 'Radio control reserves the task channel before the survey window.' },
    { id: 'badge', time: '19:07', title: 'Rowan’s corrected east-gate event', detail: 'The field logger’s four-minute offset places the badge event at 19:07 central time.' },
    { id: 'recording', time: '19:16', title: 'Independent RS-14 relay call recorded', detail: 'The retained recording corroborates Rowan’s participation in the signal check.' },
    { id: 'window', time: '19:45', title: 'RS-14 survey window closes', detail: 'The scheduled task window ends; this is not an equipment return receipt.' },
    { id: 'audit', time: '21:05', title: 'Independent audit confirms custody gap', detail: 'Recording integrity is verified, but no recorder serial or physical handover is found.' }
  ],
  correctOrder: ['channel', 'badge', 'recording', 'window', 'audit'],
  suspects: [
    { id: 'presence', name: 'Rowan’s presence independently corroborated', role: 'Records finding', note: 'The corrected gate event and independent relay recording place Rowan at North Annex and corroborate RS-14 participation. They do not establish recorder possession.' },
    { id: 'tessa', name: 'Tessa Rill', role: 'Field-log custodian', note: 'Custody of the field log does not make Tessa the recorder handler.' },
    { id: 'malik', name: 'Malik Oran', role: 'Relay-control archive operator', note: 'Preserving a recording does not establish that Malik handled Rowan’s equipment.' }
  ],
  motives: [
    { id: 'corroborated', label: 'Rowan’s presence and RS-14 participation are independently corroborated; recorder custody remains unresolved', note: 'The corrected badge event and independently retained relay recording support presence and task participation, while the equipment register still lacks a serial-level handover.' },
    { id: 'tessa', label: 'Tessa took the recorder at the east gate', note: 'The gate event identifies Rowan’s credential, not Tessa or any equipment.' },
    { id: 'malik', label: 'Malik kept Rowan’s recorder after the relay call', note: 'The recording archive contains no equipment serial, return or physical custody record.' }
  ],
  correctSuspect: 'presence',
  correctMotive: 'corroborated',
  truth: 'The North Annex field log, corrected using its documented four-minute clock offset, records Rowan Vale’s assigned credential at the east gate at 19:07 central time. An independently retained 19:16 relay-control recording corroborates Rowan’s RS-14 signal-check participation. Rowan’s presence and participation are now independently supported; no record identifies the recorder’s serial or last physical handler.',
  proof: 'The channel sheet assigns Channel 6 to RS-14 at 18:58; the clock certificate corrects the field logger; the east-gate credential event resolves to 19:07 central time; the independent 19:16 recording matches Rowan’s registered voice; and the 21:05 audit verifies recording integrity while confirming the equipment custody gap.',
  outcome: 'Update Rowan’s timeline: presence at North Annex and participation in the RS-14 relay check are independently corroborated. Keep the recorder’s identity and last physical handler unresolved. The next lead is the west-corridor relay response logged during Rowan’s call and the corresponding channel-side equipment inventory.',
} as const;

export const CASE_056_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase056Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_056_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    recorderTrailFiles: priorFiles.filter((record) => ['case055', 'case054', 'case053', 'case052', 'case051', 'case050', 'case049', 'case048'].includes(record.caseId)).length
  };
}

export function isCase056TimelineCorrect(order: readonly string[]) {
  return order.length === CASE_056_GAME.correctOrder.length && order.every((id, index) => id === CASE_056_GAME.correctOrder[index]);
}

export function isCase056DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'presence' && motiveId === 'corroborated';
}
