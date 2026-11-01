export const CASE_006_GAME = {
  id: 'case006',
  title: 'The Voice Between Stations',
  subtitle: 'The recorder is recovered. The voice on it was never meant for the Bureau.',
  briefing: 'The recovered recorder is brought into the Bureau’s sealed review room. Its file index is damaged, but three short transcript segments can be reconstructed. No voice is identified by name. Your task is to establish the sequence and determine what the recording actually proves.',
  fragments: [
    { id: 'destination', time: '22:16:08', title: 'Fragment C · Destination', text: '“...not the quay office. Send the sealed copy to the relay desk. The receiving code is not to appear in the public ledger.”', note: 'A destination instruction, clipped at both ends.' },
    { id: 'arrival', time: '22:14:32', title: 'Fragment A · Arrival', text: '“North Quay transfer is complete. The recorder is in registry custody. Confirm the M-2 docket before the next handoff.”', note: 'The first intact reference to the recorder after collection.' },
    { id: 'authorization', time: '22:15:11', title: 'Fragment B · Authorization', text: '“M-2 remains active. Use the maintenance channel. No individual signature on the receiving copy.”', note: 'An instruction about the authority and the paperwork.' },
  ],
  correctOrder: ['arrival', 'authorization', 'destination'],
  sources: [
    { id: 'quill', label: 'Sera Quill acting alone', note: 'The registrar concealed the destination, but the recording describes a wider authorization.' },
    { id: 'dispatch', label: 'An upstream dispatch authority', note: 'The voice refers to an active M-2 authority, a maintenance channel and an unsigned receiving copy.' },
    { id: 'vesper', label: 'Lena Vesper approving the audit', note: 'The audit correction happened later and does not establish who issued the transfer instruction.' },
  ],
  correctSource: 'dispatch',
  truth: 'The recorder contains a partial instruction chain. It confirms that M-2 was an active authority and that the destination was deliberately kept off the public ledger. It does not identify the speaker or prove who controlled the relay desk.',
  proof: 'The three fragments form a consistent sequence: the recorder reaches registry custody, an M-2 instruction is confirmed, and the destination is redirected to a relay desk without a public ledger entry. The evidence points upstream, but the speaker remains unidentified.',
  outcome: 'The Bureau preserves the original recording and its recovered transcript. The relay desk becomes the next lead. The speaker’s identity remains unconfirmed, and no suspect is named from the voice alone.',
} as const;

export const CASE_006_EMPTY_PROGRESS = {
  heardFragments: [] as string[],
  order: [] as string[],
  selectedSource: null as string | null,
  completed: false,
};

export function isCase006OrderCorrect(order: readonly string[]) {
  return order.length === CASE_006_GAME.correctOrder.length &&
    order.every((id, index) => id === CASE_006_GAME.correctOrder[index]);
}
