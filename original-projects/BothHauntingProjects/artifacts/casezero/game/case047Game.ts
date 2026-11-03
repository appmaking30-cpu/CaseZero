import type { InvestigationArchive } from './investigationArchive';
import { getPriorCaseMemory } from './investigationArchive';

export const CASE_047_GAME = {
  id: 'case047',
  title: 'The Pickup Slip',
  subtitle: 'A carbon copy records initials. It does not yet identify a person.',
  location: 'CENTRAL DISPATCH · D-17 PICKUP COUNTER',
  briefing: 'Case 046 established the two-person relief team and the limits of the shared console records. A newly recovered pickup slip appears to acknowledge D-17 at 09:07. Compare the carbon, counter register, correction note and seal log. Determine what the slip proves—and whether its initials can fairly be attributed to a named person.',
  clues: [
    { id: 'carbon', title: 'D-17 pickup carbon', label: 'Counter copy · Marked 09:07', detail: 'The carbon copy has “M.P.” in the recipient-initials box beside D-17. The writing is legible, but the slip has no printed staff number, personal credential or witness signature. Initials alone are not unique and do not authenticate their author.' },
    { id: 'register', title: 'Counter issue register', label: 'Bound register · Entry 09:06', detail: 'The bound register records D-17 leaving the counter at 09:06 under batch code REL-2. Its recipient field says “relief desk” rather than a person. The entry independently supports an issue from the counter, but it does not name the collector.' },
    { id: 'correction', title: 'Carbon correction note', label: 'Reverse-side annotation · 09:12', detail: 'A later annotation changes the destination field from “DS-2” to “relief desk”. The correction is countersigned “T.R.” but has no explanation or attached original. It confirms that the destination field was amended; it does not establish who wrote the initials or who physically received the badge.' },
    { id: 'seal', title: 'Return-envelope seal log', label: 'Security intake · 11:40', detail: 'The return envelope was sealed at 11:40 with D-17 listed inside. The seal log identifies the intake clerk and seal number, but it does not document the earlier pickup or connect the 09:07 initials to the later return.' }
  ],
  witnesses: [
    { id: 'clerk', name: 'Mara Pell', role: 'Dispatch counter clerk', questions: [
      { id: 'mark', prompt: 'Who wrote “M.P.” on the carbon slip?', reply: 'I cannot identify the writer from the copy. The counter was busy and the initials box was completed before the carbon was separated.' },
      { id: 'issue', prompt: 'Does the bound register name the recipient?', reply: 'No. It records the relief desk batch, not an individual collector.' }
    ]},
    { id: 'controller', name: 'Ilya Norr', role: 'Shift roster controller', questions: [
      { id: 'initials', prompt: 'Do the initials uniquely identify a staff member?', reply: 'No. Several staff records contain those initials, and no staff number was entered on the slip.' },
      { id: 'correction', prompt: 'Who authorized the destination correction?', reply: 'The note carries T.R., but the correction procedure requires the original request. That request is not attached to this file.' }
    ]},
    { id: 'auditor', name: 'Daro Kelm', role: 'Security intake auditor', questions: [
      { id: 'seal', prompt: 'What does the return seal establish?', reply: 'It establishes that an envelope containing D-17 was sealed at 11:40. It does not reconstruct who collected the badge earlier.' },
      { id: 'chain', prompt: 'Can the seal log authenticate the pickup initials?', reply: 'No. It is a separate later custody record and contains no handwriting comparison or pickup witness.' }
    ]}
  ],
  timelineEvents: [
    { id: 'register', time: '09:06', title: 'Relief desk issue entered', detail: 'The bound counter register records D-17 under batch REL-2.' },
    { id: 'carbon', time: '09:07', title: 'Pickup carbon marked', detail: 'The recipient box contains the initials M.P.' },
    { id: 'correction', time: '09:12', title: 'Destination field corrected', detail: 'A later note changes DS-2 to relief desk.' },
    { id: 'seal', time: '11:40', title: 'Return envelope sealed', detail: 'Security intake logs the sealed return envelope.' }
  ],
  correctOrder: ['register', 'carbon', 'correction', 'seal'],
  suspects: [
    { id: 'unknown', name: 'Unidentified relief-desk recipient', role: 'Initials unverified · collector unknown', note: 'The slip records M.P., but no staff number, verified specimen or independent witness authenticates the writer.' },
    { id: 'mara', name: 'Mara Pell', role: 'Counter clerk · matching initials', note: 'Matching initials do not establish authorship or possession. Her counter role is not proof that she collected D-17.' },
    { id: 'omar', name: 'Omar Pell', role: 'RELIEF-2 support · matching initials', note: 'The initials could fit more than one person and the bound register names only a desk batch.' }
  ],
  motives: [
    { id: 'limits', label: 'The slip records M.P., but the initials are not authenticated and the register names only the relief desk', note: 'The later correction and return seal do not identify the pickup writer or collector.' },
    { id: 'mara', label: 'Mara Pell collected D-17 because her initials match the slip', note: 'The initials are not unique and the counter role does not prove collection.' },
    { id: 'omar', label: 'Omar Pell collected D-17 because he was assigned to RELIEF-2', note: 'A team assignment and matching initials do not establish individual custody.' }
  ],
  correctSuspect: 'unknown',
  correctMotive: 'limits',
  truth: 'The counter register records D-17 issued to the relief desk at 09:06. A carbon slip one minute later bears the initials M.P., and a later note changes the destination field. The initials are not authenticated and do not identify the collector.',
  proof: 'The bound register independently confirms a relief-desk issue; the carbon confirms that initials were written; the correction note confirms a destination amendment; the seal log confirms a later sealed return. None supplies a verified link between a named person and the pickup.',
  outcome: 'Do not accuse Mara Pell or Omar Pell. Preserve the carbon as evidence of an initialled pickup record, not proof of authorship. The next useful step is to recover the original correction request, obtain verified handwriting specimens, or find an independent counter witness who can identify the collector.'
} as const;

export const CASE_047_EMPTY_PROGRESS = {
  cluesFound: [] as string[],
  askedQuestions: [] as string[],
  timelineOrder: [] as string[],
  selectedSuspect: null as string | null,
  selectedMotive: null as string | null,
  completed: false
};

export function getCase047Carryover(archive: InvestigationArchive) {
  const priorFiles = getPriorCaseMemory(archive, CASE_047_GAME.id);
  return {
    priorFiles,
    clueCount: priorFiles.reduce((count, record) => count + record.inspectedClues.length, 0),
    pickupTrailFiles: priorFiles.filter((record) => ['case046', 'case045', 'case044'].includes(record.caseId)).length
  };
}

export function isCase047TimelineCorrect(order: readonly string[]) {
  return order.length === 4 && order.every((id, index) => id === CASE_047_GAME.correctOrder[index]);
}

export function isCase047DeductionCorrect(suspectId: string | null, motiveId: string | null) {
  return suspectId === 'unknown' && motiveId === 'limits';
}
