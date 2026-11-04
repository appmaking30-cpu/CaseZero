# Missing Detective endgame — finite campaign plan

Status: design checkpoint, not playable implementation yet.
Target branch: `casezero-development`.

## Design goal

Resolve the existing Case 062 lead in a short, evidence-led finale. Do not extend the trail indefinitely. Preserve the project's core fairness rule: distinguish a system record, an assigned role, a credential event, a physical action, and a named person's identity. A conclusion must never claim more than the evidence proves.

## Existing facts carried forward

- The original C-2 installation register and later inspection both identify cylinder CY-8841.
- The service request remained awaiting scheduling; no searched completion or removed-parts record verifies a replacement.
- Cases 048–053 unlock the recorder-transfer index, but the transfer packet itself is not yet recovered.
- Cases 054–062 narrow the relay, buffer, access, key and cylinder trail without identifying a person who physically handled the recorder.
- Rowan Vale's fate and the final explanation remain unresolved.

## Final four investigations

### Case 063 — The North Annex Cross-Index

**Question:** Do hardware identifiers in the North Annex maintenance ledger correspond to access-control maintenance exceptions?

Evidence to build:
1. A signed baseline hardware inventory with stable device identifiers.
2. A maintenance exception export with timestamps and system-generated event IDs.
3. A separately held access-control digest showing matching event IDs, but not a person's identity.
4. An audit note explaining which fields are machine-generated and which are manually entered.

Fair deduction: identify the one exception whose hardware ID and event ID are corroborated across both independent indexes. Do not infer who was physically present.

Unlock/output: a narrow, time-bounded exception window and a retrieval reference for the recorder-transfer packet.

### Case 064 — The Exception Window

**Question:** What does the exception window establish about the recorder packet's route?

Evidence to build:
1. The packet's archive accession number and original custody label.
2. A dispatch manifest with an incomplete recipient field.
3. A neutral receiving-desk scan with a timestamp and tray identifier.
4. A separately retained seal/condition report showing the packet remained closed when indexed.

Fair deduction: establish the last independently corroborated repository and the unresolved custody gap. Do not treat a scan, tray number or shared credential as proof of a named person's possession.

Unlock/output: authorization for a witnessed, logged retrieval.

### Case 065 — The Recorder Packet

**Question:** What can the recovered packet prove about Rowan's last verified assignment?

Evidence to build:
1. The packet opened under dual-witness procedure with a continuous custody log.
2. A recorder inventory sheet containing device serial and seal references.
3. A verified audio-device service record that authenticates the device, not the speaker.
4. Rowan's signed assignment closeout, cross-checked against an independent duty ledger.

Fair deduction: match the recovered recorder to its inventory record and establish the last verified assignment entry. Do not identify an audio speaker from an unauthenticated voice or assume the device's location proves Rowan's location.

Unlock/output: a sealed message reference and one final lead for the Bureau.

### Case 066 — The Detective Who Left a Record

**Question:** What happened to Rowan Vale, and what can the Bureau responsibly publish?

The finale must use an authenticated, first-person statement or independently verified institutional record to establish Rowan's status. If the available source does not prove a specific outcome, the story must say so plainly rather than inventing a death, rescue, culprit or confession.

Required finale beats:
1. Reconcile the recorder's serial and custody history with the prior 65 cases.
2. Authenticate the final statement through a second independent record.
3. Give the player a final deduction separating confirmed facts, strong inference and unresolved facts.
4. Produce three report sections: Truth (the best-supported account), Proof (the exact corroborating records), and Outcome (what the Bureau can now do).
5. Close the Missing Detective arc and unlock a post-campaign case board without making optional monetization necessary.

## Acceptance criteria

- Every new case has case-specific evidence, witness questions, a fair chronology, retryable deduction and Truth / Proof / Outcome review.
- The correct answer is inferable from evidence available in that case and the carried-forward archive; no hidden fact is required.
- Wrong options are plausible but contradicted by a specific record or exceed what the record proves.
- Shared credentials, role assignments, archive scans and missing records never become proof of an individual's physical action.
- The four cases are connected and finite. Case 066 closes the arc; further content belongs to optional side investigations, not another mandatory clue chain.
- Each case receives a dedicated unit test and mobile-viewport walkthrough before it is described as playable.
- Existing save data remains compatible; new unlock flags must be derived safely from the archive or added with a tested migration.

## Implementation order

1. Implement and test Case 063 data/rules, screen, campaign routing and archive carryover.
2. Run the existing typecheck, unit suite, Expo export and mobile browser walkthrough. Fix failures before Case 064.
3. Repeat for Cases 064 and 065.
4. Implement Case 066 and the arc-completion state only after the earlier three cases pass.
5. Extend the browser walkthrough to the finale and then test a debug APK on a physical Android device.

No paid build service, paid API, publishing, analytics or monetization is part of this work.
