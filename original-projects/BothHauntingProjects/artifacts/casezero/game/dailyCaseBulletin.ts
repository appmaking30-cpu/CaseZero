export type DailyBulletinCase = {
  id: string;
  title: string;
  location: string;
  briefing: string;
  clues: { id: string; title: string; detail: string }[];
  suspects: { id: string; name: string; role: string }[];
  motives: { id: string; label: string }[];
  correctSuspectId: string;
  correctMotiveId: string;
  truth: string;
  proof: string;
};

export const DAILY_BULLETIN_CASES: readonly DailyBulletinCase[] = [
  {
    id: 'blue-envelope',
    title: 'The Blue Envelope',
    location: 'Harbour Records Office',
    briefing: 'A sealed blue envelope containing the original harbour schedule vanished between the records counter and the dispatch desk. The office never closed, and three staff members had legitimate access.',
    clues: [
      { id: 'counter', title: 'The counter register', detail: 'The envelope was checked out at 09:12 by records clerk Mara. The receiving signature box is blank, so the handoff was never formally completed.' },
      { id: 'lift', title: 'The service-lift log', detail: 'The service lift stopped at the records floor at 09:16 using a supervisor access card. The dispatch desk is on the ground floor.' },
      { id: 'copy', title: 'The schedule copy', detail: 'A duplicate schedule was printed at 09:19 from the supervisor terminal. Its handwritten correction matches the missing original.' },
    ],
    suspects: [
      { id: 'mara', name: 'Mara Vale', role: 'Records clerk' },
      { id: 'ellis', name: 'Ellis Grant', role: 'Dispatch runner' },
      { id: 'noah', name: 'Noah Pike', role: 'Office supervisor' },
    ],
    motives: [
      { id: 'sale', label: 'To sell the harbour schedule' },
      { id: 'delay', label: 'To delay publication of a route change' },
      { id: 'mistake', label: 'To cover up a filing mistake' },
    ],
    correctSuspectId: 'noah',
    correctMotiveId: 'delay',
    truth: 'Noah Pike used supervisor access to retrieve the envelope and print a duplicate before the route change was announced.',
    proof: 'The supervisor card opened the service lift, and the supervisor terminal printed the matching schedule minutes later. The dispatch runner never received the envelope, as the counter register has no handoff signature.',
  },
  {
    id: 'silent-bell',
    title: 'The Silent Bell',
    location: 'Westbridge Museum',
    briefing: 'The museum’s closing bell failed to sound, but the alarm was armed on time. A display case was found open the next morning, with no damage to the lock.',
    clues: [
      { id: 'panel', title: 'The alarm panel history', detail: 'The closing bell circuit was muted manually at 18:42. The alarm itself was armed at 19:00 as scheduled.' },
      { id: 'work', title: 'The maintenance sheet', detail: 'The maintenance sheet lists no bell repairs that evening. A note about “quiet testing” was added in a different pen.' },
      { id: 'case', title: 'The display-case checklist', detail: 'The case was signed as locked at 18:50, eight minutes after the bell circuit was muted.' },
    ],
    suspects: [
      { id: 'lena', name: 'Lena Ward', role: 'Gallery guide' },
      { id: 'owen', name: 'Owen Hart', role: 'Maintenance technician' },
      { id: 'ruth', name: 'Ruth Bell', role: 'Evening curator' },
    ],
    motives: [
      { id: 'quiet', label: 'To create a quiet window for an unauthorized case opening' },
      { id: 'repair', label: 'To avoid disturbing visitors during a repair' },
      { id: 'alarm', label: 'To disable the entire museum alarm system' },
    ],
    correctSuspectId: 'ruth',
    correctMotiveId: 'quiet',
    truth: 'Ruth Bell muted the closing bell before signing the display case as secure, creating a quiet window to reopen it after staff had left.',
    proof: 'The bell was muted before the case checklist was signed. The maintenance sheet contains no repair order, and the main alarm remained armed, showing the change was limited to the bell circuit.',
  },
  {
    id: 'glasshouse-note',
    title: 'The Glasshouse Note',
    location: 'North Garden Conservatory',
    briefing: 'A rare seed packet was moved from a climate-controlled cabinet to an ordinary potting bench. The packet is safe, but the move was not recorded.',
    clues: [
      { id: 'humidity', title: 'The humidity strip', detail: 'The cabinet humidity rose above the safe range at 07:10. The strip was replaced at 07:18, confirming the cabinet sensor was working.' },
      { id: 'bench', title: 'The potting-bench tag', detail: 'A dry protective sleeve was placed under the seed packet. The sleeve is used only by the conservatory’s seed specialist.' },
      { id: 'rota', title: 'The morning rota', detail: 'The seed specialist was assigned to the cabinet room from 07:00 to 07:30. The other two staff members were scheduled in the public greenhouse.' },
    ],
    suspects: [
      { id: 'ada', name: 'Ada Moss', role: 'Seed specialist' },
      { id: 'finn', name: 'Finn Cole', role: 'Groundskeeper' },
      { id: 'ivy', name: 'Ivy Shaw', role: 'Visitor guide' },
    ],
    motives: [
      { id: 'protect', label: 'To protect the seeds from unsafe humidity' },
      { id: 'trade', label: 'To secretly trade the rare seeds' },
      { id: 'hide', label: 'To conceal a missing inventory entry' },
    ],
    correctSuspectId: 'ada',
    correctMotiveId: 'protect',
    truth: 'Ada Moss moved the seed packet to the dry bench sleeve when the cabinet humidity rose above the safe range.',
    proof: 'The humidity strip records the unsafe reading, the sleeve belongs to the seed specialist, and Ada was assigned to that room during the exact window.',
  },
  {
    id: 'empty-desk',
    title: 'The Empty Desk',
    location: 'Civic Building, Room 12',
    briefing: 'A signed resignation letter disappeared from a locked desk drawer before the morning meeting. The drawer shows no forced entry.',
    clues: [
      { id: 'keycard', title: 'The room access report', detail: 'Only the department head’s card opened Room 12 between the drawer check at 17:30 and the morning meeting.' },
      { id: 'ribbon', title: 'The typewriter ribbon', detail: 'A fresh line reading “withdrawn pending review” appears at the end of the secretary’s typewriter ribbon.' },
      { id: 'minutes', title: 'The meeting minutes', detail: 'The minutes were prepared before the meeting and already state that no resignation was received.' },
    ],
    suspects: [
      { id: 'nina', name: 'Nina Bell', role: 'Department secretary' },
      { id: 'paul', name: 'Paul Reed', role: 'Department head' },
      { id: 'sara', name: 'Sara Finch', role: 'Meeting clerk' },
    ],
    motives: [
      { id: 'withdraw', label: 'To make a resignation appear withdrawn' },
      { id: 'copy', label: 'To make a second copy for the archive' },
      { id: 'delay', label: 'To postpone the morning meeting' },
    ],
    correctSuspectId: 'paul',
    correctMotiveId: 'withdraw',
    truth: 'Paul Reed used his room access to remove the letter and prepare minutes that treated the resignation as withdrawn.',
    proof: 'The access report identifies the only entry, while the prewritten minutes and the new ribbon line show the withdrawal story was prepared before the meeting.',
  },
  {
    id: 'midnight-parcel',
    title: 'The Midnight Parcel',
    location: 'East Yard Depot',
    briefing: 'A parcel marked “empty packaging” was sent to the wrong loading bay. The parcel contained a sealed set of original inspection photographs.',
    clues: [
      { id: 'scale', title: 'The loading scale ticket', detail: 'The parcel weighed 1.8 kilograms, far above the depot’s empty-packaging range.' },
      { id: 'bay', title: 'The bay assignment board', detail: 'Bay 4 was changed to Bay 7 at 22:06 using a supervisor override. The driver’s route sheet still showed Bay 4.' },
      { id: 'seal', title: 'The inspection seal', detail: 'The seal was intact when the parcel left the depot. The content label was changed before the parcel reached the loading area.' },
    ],
    suspects: [
      { id: 'tess', name: 'Tess Rowan', role: 'Depot clerk' },
      { id: 'mark', name: 'Mark Dyer', role: 'Shift supervisor' },
      { id: 'lee', name: 'Lee Frost', role: 'Delivery driver' },
    ],
    motives: [
      { id: 'misroute', label: 'To redirect the inspection photographs away from the audit team' },
      { id: 'damage', label: 'To damage the photographs during delivery' },
      { id: 'fee', label: 'To avoid a late-delivery fee' },
    ],
    correctSuspectId: 'mark',
    correctMotiveId: 'misroute',
    truth: 'Mark Dyer changed the content label and overrode the loading bay so the inspection photographs would bypass the audit team.',
    proof: 'The parcel’s weight contradicts the empty-packaging label, and the supervisor override changed the bay while the driver’s route sheet remained unchanged.',
  },
  {
    id: 'clockmakers-receipt',
    title: 'The Clockmaker’s Receipt',
    location: 'Old Market Workshop',
    briefing: 'A customer’s antique watch stopped again after a repair. The workshop insists the original spring was returned, but the receipt and repair notes disagree.',
    clues: [
      { id: 'receipt', title: 'The customer receipt', detail: 'The receipt lists a replacement spring, not a cleaning service. The customer paid for a part to be returned with the watch.' },
      { id: 'tray', title: 'The parts tray', detail: 'The original spring is still in the workshop tray, labelled with the customer’s initials and the repair date.' },
      { id: 'ledger', title: 'The repair ledger', detail: 'The apprentice recorded fitting a new spring, but the workshop copy was overwritten to say “cleaned and returned.”' },
    ],
    suspects: [
      { id: 'milo', name: 'Milo Finch', role: 'Apprentice' },
      { id: 'vera', name: 'Vera Cole', role: 'Workshop owner' },
      { id: 'hugh', name: 'Hugh Lane', role: 'Front-desk clerk' },
    ],
    motives: [
      { id: 'part', label: 'To keep the original spring and charge for a replacement' },
      { id: 'gift', label: 'To give the customer a complimentary service' },
      { id: 'delay', label: 'To delay returning the watch' },
    ],
    correctSuspectId: 'vera',
    correctMotiveId: 'part',
    truth: 'Vera Cole kept the original spring and altered the workshop copy of the repair ledger after charging for a replacement.',
    proof: 'The original spring remains in the tray, the customer receipt records a replacement part, and the ledger was changed after the apprentice recorded the fitting.',
  },
  {
    id: 'red-umbrella',
    title: 'The Red Umbrella',
    location: 'Central Station Lost Property',
    briefing: 'A red umbrella was marked as destroyed after a lost-property check, but a passenger later saw it in the station office. The item is harmless; the false disposal record is the mystery.',
    clues: [
      { id: 'tag', title: 'The property tag', detail: 'The umbrella’s tag number appears in the station office sign-in book after the disposal time.' },
      { id: 'bin', title: 'The disposal register', detail: 'The destruction entry was added in blue ink, while the rest of that page was written in black ink during the morning check.' },
      { id: 'key', title: 'The office key log', detail: 'The lost-property office key was signed out by the shift lead after the disposal entry was recorded.' },
    ],
    suspects: [
      { id: 'ella', name: 'Ella Frost', role: 'Property attendant' },
      { id: 'jack', name: 'Jack Moore', role: 'Shift lead' },
      { id: 'rory', name: 'Rory Vale', role: 'Station cleaner' },
    ],
    motives: [
      { id: 'keep', label: 'To keep the umbrella after recording it as destroyed' },
      { id: 'protect', label: 'To protect the umbrella from being damaged' },
      { id: 'error', label: 'To correct a harmless counting error' },
    ],
    correctSuspectId: 'jack',
    correctMotiveId: 'keep',
    truth: 'Jack Moore added the false disposal entry and then used the office key to keep the umbrella aside.',
    proof: 'The tag was signed into the office after the disposal time, the entry uses a different ink, and the shift lead signed out the key after the false record was made.',
  },
] as const;

export function getDailyCaseForDate(dateKey: string): DailyBulletinCase {
  const normalized = dateKey.trim();
  const hash = [...normalized].reduce((total, character) => total + character.charCodeAt(0), 0);
  return DAILY_BULLETIN_CASES[hash % DAILY_BULLETIN_CASES.length];
}

export function isDailyCaseSolutionCorrect(
  dailyCase: DailyBulletinCase,
  suspectId: string | null,
  motiveId: string | null,
): boolean {
  return suspectId === dailyCase.correctSuspectId && motiveId === dailyCase.correctMotiveId;
}
