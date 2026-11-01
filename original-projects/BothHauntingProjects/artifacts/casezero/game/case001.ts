export const CASE_001 = {
  id: "case001",
  number: "001",
  title: "The Last Train Home",
  subtitle: "Ashford Station · 21:20 departure",
  briefing:
    "The sealed blue dispatch envelope vanished from the station records room minutes before the last train left. There was no forced entry. Three people were nearby, and the envelope was later logged in the luggage office.",
  suspects: [
    {
      id: "ada",
      name: "Ada Voss",
      role: "Night station clerk",
      note: "Had access to the ticket desk and records-room register.",
    },
    {
      id: "miles",
      name: "Miles Renn",
      role: "Station porter",
      note: "Had the service key and a cart used in both corridors.",
    },
    {
      id: "nia",
      name: "Nia Vale",
      role: "Passenger",
      note: "Waited in the concourse before boarding the last train.",
    },
  ],
  clues: [
    {
      id: "leak",
      title: "The ceiling stain",
      label: "Physical evidence",
      detail:
        "A fresh water trail runs down the shelf behind the records cabinet. A maintenance ticket at 21:05 records the leak. A porter addendum at 21:11 reads, 'Moved the sealed blue envelope to the luggage-office shelf to keep it dry' and is signed M.R. The cabinet lock shows no damage.",
    },
    {
      id: "wheel",
      title: "The chipped cart wheel",
      label: "Trace evidence",
      detail:
        "A crescent-shaped nick repeats in the dust from the records-room door to the luggage office. The left wheel of Miles Renn's porter cart has the same crescent-shaped chip.",
    },
    {
      id: "key",
      title: "The service-key register",
      label: "Access record",
      detail:
        "Miles signs out the service key at 21:09 and returns it at 21:22. The records-room lock and luggage-office door both use this key.",
    },
    {
      id: "receipt",
      title: "The refund receipt",
      label: "Time-stamped record",
      detail:
        "A ticket refund is printed at 21:16. The counter log and the ticket inspector place Ada at the desk when it printed.",
    },
    {
      id: "inventory",
      title: "The luggage-office slip",
      label: "Inventory record",
      detail:
        "At 21:18, the blue envelope is logged in the luggage office. The initials M.R. match Miles Renn. The seal is intact.",
    },
  ],
  witnesses: [
    {
      id: "jo",
      name: "Jo Bell",
      role: "Night cleaner",
      questions: [
        {
          id: "sound",
          prompt: "What did you hear near the records room?",
          reply:
            "A cart stopped outside the records room at 21:12. The wheels squeaked twice, then rolled toward the luggage office.",
        },
        {
          id: "person",
          prompt: "Did you see who pushed it?",
          reply:
            "I only saw a porter sleeve and a brass badge. I remember the left wheel scraping the tile.",
        },
      ],
    },
    {
      id: "ada",
      name: "Ada Voss",
      role: "Night station clerk",
      questions: [
        {
          id: "desk",
          prompt: "Where were you at 21:16?",
          reply:
            "At the ticket desk. The refund receipt is mine, and the inspector was beside me when it printed.",
        },
        {
          id: "key",
          prompt: "Who signed out the service key?",
          reply:
            "Miles did. He said he needed to check the luggage shelves before the train left.",
        },
      ],
    },
    {
      id: "nia",
      name: "Nia Vale",
      role: "Passenger",
      questions: [
        {
          id: "route",
          prompt: "What did you see after the departure announcement?",
          reply:
            "Miles pushed an empty cart toward the records room, then returned with a damp blue parcel and took it to the luggage office.",
        },
        {
          id: "condition",
          prompt: "Was the parcel damaged?",
          reply:
            "No. One corner looked damp, but the envelope seal was still closed.",
        },
      ],
    },
  ],
  timelineEvents: [
    {
      id: "inventory",
      time: "21:18",
      title: "Envelope logged in the luggage office",
      detail: "The inventory slip is initialed M.R.",
    },
    {
      id: "receipt",
      time: "21:16",
      title: "Ada prints a ticket refund",
      detail: "The ticket-desk record fixes her location.",
    },
    {
      id: "key",
      time: "21:09",
      title: "Miles signs out the service key",
      detail: "The key opens the records room and luggage office.",
    },
    {
      id: "cart",
      time: "21:12",
      title: "Jo hears a cart at the records-room door",
      detail: "The sound and wheel mark match the porter's cart.",
    },
  ],
  correctTimelineOrder: ["key", "cart", "receipt", "inventory"],
  motives: [
    {
      id: "steal",
      label: "To take the overnight roster",
      note: "The envelope was removed for personal gain.",
    },
    {
      id: "hide",
      label: "To conceal a station mistake",
      note: "The envelope was hidden to cover an error.",
    },
    {
      id: "protect",
      label: "To protect it from the leaking shelf",
      note: "The envelope was moved to keep it dry.",
    },
  ],
  correctSuspect: "miles",
  correctMotive: "protect",
  truth:
    "Miles Renn moved the envelope from the records shelf to the luggage office after noticing the leak. He was protecting the roster, not stealing it.",
  proof:
    "The service-key register gives Miles access at the right time. The 21:05 maintenance ticket and 21:11 porter addendum, signed M.R., show that he moved the sealed envelope to protect it from the leak. The chipped cart-wheel mark leads from the records room to the luggage office. Jo heard the cart at 21:12, Nia saw Miles carry the damp parcel, and the 21:18 inventory slip records the envelope under his initials. Ada's 21:16 receipt independently places her at the ticket desk.",
  outcome:
    "The envelope is returned with its seal intact. The leak is repaired, and the station adds a dry-storage check to the night-shift handover. Miles is cleared of theft but reminded to log emergency moves.",
} as const;

export type CasePhase =
  | "hq"
  | "briefing"
  | "evidence"
  | "interviews"
  | "timeline"
  | "deduction"
  | "review";

export type InvestigationMemory = {
  inspectedClues: string[];
  askedQuestions: string[];
  unansweredQuestions: string[];
};

export function getInvestigationMemory(
  clueIds: readonly string[],
  questionKeys: readonly string[],
): InvestigationMemory {
  const inspectedClues = CASE_001.clues
    .filter((clue) => clueIds.includes(clue.id))
    .map((clue) => clue.title);

  const askedQuestions: string[] = [];
  const unansweredQuestions: string[] = [];

  for (const witness of CASE_001.witnesses) {
    for (const question of witness.questions) {
      const note = `${witness.name}: ${question.prompt}`;
      if (questionKeys.includes(`${witness.id}:${question.id}`)) {
        askedQuestions.push(note);
      } else {
        unansweredQuestions.push(note);
      }
    }
  }

  return { inspectedClues, askedQuestions, unansweredQuestions };
}

export function isTimelineCorrect(order: readonly string[]): boolean {
  return (
    order.length === CASE_001.correctTimelineOrder.length &&
    order.every((id, index) => id === CASE_001.correctTimelineOrder[index])
  );
}

export function isDeductionCorrect(
  suspectId: string | null,
  motiveId: string | null,
): boolean {
  return (
    suspectId === CASE_001.correctSuspect &&
    motiveId === CASE_001.correctMotive
  );
}
