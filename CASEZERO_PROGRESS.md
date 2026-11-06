# Current development checkpoint — 6 November 2026

## Preservation and workflow

- Existing Replit app: **BothHauntingProjects** — https://replit.com/@appmaking30/BothHauntingProjects. It remains unchanged; Replit Agent was not used.
- Original Replit archive: `BothHauntingProjects.zip`, 7,167,701 bytes, preserved on `replit-original-backup-2026-10-31`.
- Extracted source snapshot: `casezero-original-work`.
- Active source: `casezero-development`. The separate rollback/reference branches remain untouched.
- A dated safety checkpoint branch, `casezero-safety-checkpoint-2026-11-06`, preserves the pre-fix state at commit `09e57b36`.
- GitHub is the working source of truth for small ChatGPT-assisted changes. GitHub commits do not automatically sync to the Replit workspace.

## Current implementation audit

- Canonical stack: Expo Router, React Native, TypeScript and AsyncStorage.
- Case 001 remains the first fully structured tutorial: five inspectable records, three witnesses/six questions, four-event chronology, suspect-plus-motive deduction, retryable wrong answers, separate Truth / Proof / Outcome review and local save/restore.
- Cases 002–066 exist in the campaign data. Cases 002–003 are integrated into the main Bureau screen; Cases 004–066 have dedicated React Native screen components.
- Repository inventory: 67 case data modules, 63 dedicated case screens (004–066), and 63 dedicated case test files (Case 001 plus Cases 005–066). The opening-case integration tests also cover Cases 002–004.
- Investigation archive, Missing Detective arc through Case 066, Daily Case Bulletin and Bureau Team are implemented in the source. Their individual validation coverage is described below and must not be confused with a full physical-device playthrough.
- Local save data is stored with AsyncStorage. Cross-device/cloud sync is not implemented.

## 16:9 presentation and current fixes

- Expo orientation changed to landscape.
- Detective Bureau home now uses a full-bleed observatory image and side-by-side hero / active-case panels on wide screens.
- The tutorial evidence list uses a two-column board on wide screens.
- The first landscape UI commit introduced a duplicate `width` style key. GitHub Actions caught it with TypeScript error TS1117; the duplicate was removed in commit `33c1bca2`.
- A separate 1280×720 (16:9) browser smoke was added for the Bureau panel geometry and tutorial evidence grid in commit `e50a90ef`. That new landscape smoke is pending CI verification at this checkpoint.

## Latest validation

- Commit `33c1bca2`: GitHub Actions run [42220815160](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42220815160) has passed TypeScript, the full Cases 001–066/system unit suite, Expo web export and the dark mobile browser smoke through Cases 001–006 and 041–066, with Cases 007–040 receiving navigation/save-restore smoke. Screenshot upload was still finishing when this checkpoint was written.
- Android standalone APK workflow [42220815135](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42220815135) passed TypeScript, unit tests and Expo native prebuild; Gradle APK assembly was still running. No APK artifact is claimed until payload verification and upload succeed.
- Commit `e50a90ef` adds the 16:9-specific browser assertions. Its workflow [42221174813](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42221174813) is queued/pending at this checkpoint.
- The 390×844 browser run and 1280×720 landscape smoke are browser checks, not a real Android phone test.
- No signed Play Store bundle, production signing, Play Store release, public deployment, paid service, monetization or production backend is enabled.

## Next priorities

1. Finish the 16:9 CI run and inspect the landscape screenshots; correct any layout regressions before adding more UI.
2. Confirm the standalone APK payload checks and then test installation and the tutorial on a real Android device.
3. Review Case 001 end-to-end for fair evidence presentation and make it the polished, stable tutorial.
4. Review connected-case continuity and targeted full walkthrough coverage for Cases 007–040.
5. Keep the finite Missing Detective ending intact; do not add endless cases in place of validating the ending.
6. Improve HQ/team, accessibility, save migration, performance, sound and notification behavior only after core playability is stable.
7. Consider optional hints, cases or rewarded ads only after the free core story is complete, and only with explicit approval.

---

# Historical development status — 5 November 2026

This section supersedes older pending-status notes further below wherever they conflict.

## Latest verified build and checks

- Active branch: `casezero-development`.
- Latest code-and-test checkpoint: `8135e514714d55cce52fa6a4827fdd304c2e94e6` — “Record dark-mode campaign smoke validation”.
- Project checks run [42028048150](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42028048150) completed successfully on `8135e51`:
  - Expo TypeScript check passed.
  - Full CaseZero unit-test suite for Cases 001–066 and shared systems passed.
  - Expo web export passed.
  - Playwright 390×844 dark mobile-viewport smoke passed for full Cases 001–006 and 041–066 walkthroughs, plus Cases 007–040 screen navigation and save/restore smoke.
  - Daily Case Bulletin and Bureau Team assignment flow passed.
  - Actual dark-mode screenshot artifact [13415216178](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42028048150) uploaded, including the Bureau, Case 007 and Case 040.
- The prior Android standalone APK run [41925948379](https://github.com/appmaking30-cpu/CaseZero/actions/runs/41925948379) completed successfully. A fresh APK build for the same app-source snapshot (`afb121d`; no app files changed in the later documentation/workflow-label commit) is running as [42027241306](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42027241306), now with an explicit payload-verification step.
- Artifact: `casezero-standalone-apk`, 47,448,404-byte ZIP; extracted `app-release.apk` is 115,050,688 bytes.
- APK inspection confirms `assets/index.android.bundle` is embedded (5,662,804 bytes), AndroidManifest.xml is present, and arm64-v8a native libraries are included. This is a standalone Android test-build candidate, not a Play Store release.
- The APK's embedded Expo config reports the generated default package ID `com.anonymous.casezero`. Source `app.json` still has an empty `android` object, so a permanent application ID has deliberately not been chosen.
- No physical Android installation or playthrough has been completed. Automated browser testing is not a substitute for the user's Samsung/Tecno device test.
- No Play Store AAB, production signing, privacy-policy review, store listing, Data Safety submission or publishing action has been completed.

## Test coverage boundary

- Cases 001–006: end-to-end browser campaign smoke, including Case 001 wrong-answer retry, timeline retry, archive carryover, reload persistence, Missing Detective unlock and Cases 002–006.
- Cases 041–066: end-to-end browser campaign walkthrough, including final archive persistence for Cases 063–066.
- Cases 007–040: all case-rule unit tests pass; every screen also passed a shallow browser navigation and one-clue save/restore check. They have NOT all been individually completed as full mysteries in the browser. This smoke must not be described as a full case playthrough.
- All current browser screenshots are captured at 390×844 with `colorScheme: 'dark'`, matching the app's `userInterfaceStyle: "dark"`. The new HQ and case screenshots were visually checked and show the midnight-navy palette.
- Daily Case Bulletin is in-app and device-date based; automatic push notifications are not implemented.
- Monetization and a production backend remain out of the MVP; no paid usage is authorized.

---

# Historical CaseZero development checkpoint — 4 November 2026

## 1. Preservation and source of truth

- Existing Replit app: **BothHauntingProjects** — https://replit.com/@appmaking30/BothHauntingProjects
- The Replit app was found in the account and has not been edited by this workflow. Its last reported update was 30 October 2026.
- Replit Agent was not used for this work.
- Original Replit archive: `BothHauntingProjects.zip`, preserved unchanged on `replit-original-backup-2026-10-31` (7,167,701 bytes).
- Extracted source snapshot: `casezero-original-work`, under `original-projects/BothHauntingProjects/`.
- Import report: 387 archive entries; 136 source/config files extracted; 251 machine-local, dependency, build, log, nested-Git and other excluded entries. A basic high-confidence credential scan found no matches, but that is not a guarantee that the archive contains no secrets.
- Active development branch: `casezero-development`.
- Safety checkpoint branch: `casezero-safety-checkpoint-2026-11-04`.
- Never develop directly on `main`, `casezero-original-work`, or `replit-original-backup-2026-10-31`.
- GitHub changes do not sync to the Replit workspace automatically. Keep the original Replit project and original ZIP untouched; only perform a deliberate, reviewed import if a later Replit refresh is needed.

## 2. What is implemented

### App and tutorial

- Canonical app is the existing **Expo / React Native / TypeScript** project, not a new rebuild. It uses Expo Router and AsyncStorage for on-device progress.
- Dark cinematic direction: midnight-navy surfaces, evidence-gold accents and restrained red alerts.
- **Case 001 — The Last Train Home** is the tutorial mystery. It has five inspectable records, three witnesses/six questions, a four-event timeline, person-plus-motive deduction, retryable incorrect answers, separate Truth / Proof / Outcome review, and local progress.
- Cases 002–003 are integrated into the main Bureau flow; Case 004 onward use dedicated React Native case screens.
- The repository currently contains campaign case data for **Cases 001–066**, dedicated screen components for Cases 004–066, and dedicated case-rule tests for Case 001 and Cases 005–066. Cases 063–066 are integrated sequentially into Bureau routing after Cases 062–065 respectively; Case 066 validation is pending. Additional system tests cover connected progression and the shared systems.

### Connected campaign and systems

- Completed-case archive stores selected conclusions, inspected clues, asked questions and unanswered questions; later investigations can use this memory.
- Cases 002–062 continue the campaign through linked evidence, interviews, chronology and deduction. Their conclusions deliberately distinguish a record/role/credential from proof of a named person’s physical action.
- Missing Detective arc:
  - Initial dossier unlocks after Cases 001–002.
  - Four-file convergence report unlocks after Cases 001–004.
  - Recorder-transfer index unlocks after Cases 048–053.
  - Cases 054–062 continue the assignment, relay, buffer, access, key and cylinder trail.
  - Cases 063–066 form the finite endgame. Case 066 now provides the final evidence-led status finding and closes the arc without inventing Rowan’s location or future.
- Daily Case Bulletin: seven standalone cases rotate deterministically by device-local calendar date; daily progress is separate from the main campaign archive.
- Bureau Team: three specialists, one-specialist-per-file assignments, saved assignments, case/daily XP, rank progression and evidence-gated insights.
- Local persistence covers case progress, investigation archive, daily progress and Bureau assignments/ranks.

### Case 066 — The Detective Who Left a Record (automated validation passed 5 November; physical-device validation pending)

- Added a five-record final investigation, three witnesses/six questions, six-event chronology, retryable deduction, local progress, archive carryover and Bureau specialist insight.
- The recovered recorder identity and dual-witness custody log connect the signed statement to the packet. A separately administered confidential-review register independently matches its reference and digest and confirms a voluntary protected separation from active duty.
- The evidence does not establish Rowan’s current location, future plans or a return date. The Bureau’s report is deliberately limited and protects private details.
- Case 066 unlocks after Case 065 is archived. Dedicated unit tests and CI scope have been added; validation is pending.

### Case 065 — The Recorder Packet (new; validated on 4 November 2026)

- Added a dedicated five-record evidence investigation, three witnesses/six questions, six chronology events, retryable deduction, local progress persistence, archive carryover and Bureau specialist insight.
- The packet is retrieved under dual-witness custody. The read-only image contains three segments; an independent checksum matches the received image. The timezone is unset and no speaker attribution is validated, so the case does not claim to identify the missing detective's voice or establish local time.
- Case 065 unlocks after Case 064 is archived. Unit tests are included in the newest CI run. A final copy review corrected prompts that had retained Case 064's custody language.

### Case 064 — The Exception Window (automated validation passed 5 November; physical-device validation pending)

- Added five case-specific custody records, three witnesses/six questions, six chronological events, a retryable deduction, local save/restore, archive carryover and Bureau specialist insight.
- Finding: accession AR-2048 is independently corroborated in Central Records intake tray TR-6; seal S-118 is recorded intact at indexing. The dispatch manifest has an incomplete recipient field, so no named carrier or later recipient is established.
- Case 064 unlocks from the Bureau after Case 063 is archived. Its unit tests and the app typecheck/export/browser walkthrough are awaiting the newest CI run.

### Case 063 — The North Annex Cross-Index (automated validation passed 5 November; physical-device validation pending)\n\n- Added a five-record cross-index investigation, three witnesses/six questions, six chronology events, a retryable evidence-based deduction, local save/restore, archive carryover and Bureau specialist insight.\n- The intended finding is limited to one machine-generated event ID and hardware profile corroborated by two independent indexes. It does not identify a person or prove physical handling.\n- Integrated into the Bureau as the next classified file after Case 062. Typecheck, unit tests and browser walkthrough have not yet completed for this addition.\n\n### Case 062 — The Cylinder Service Report

- Five evidence records, three witnesses/six questions, six timeline events, a person/records-finding plus motive-style deduction, local save/restore, archive carryover and Bureau specialist insight.
- Finding: the installation register and later independent inspection both identify CY-8841; the pending service request and searched completion/parts archives do not verify a replacement. The case does not claim that undocumented handling was impossible or identify a person at the lock.
- A mobile browser selector mismatch and a transparent-choice styling typo were fixed.

## 3. Historical validation snapshot — 4 November 2026

GitHub Actions run [41910194292](https://github.com/appmaking30-cpu/CaseZero/actions/runs/41910194292) passed on commit `523b6a2ff67e642caa1a28c7632816770da300c3`:

- Dependency installation.
- Expo TypeScript check.
- Full unit-test suite through Cases 001–065 and systems passed.
- Expo web export.
- Playwright mobile-viewport walkthrough at 390×844 for Cases 001–006 and 041–062, including retry paths, Daily Case Bulletin and Bureau Team assignment flow.
- Screenshot artifact upload.

Important limits:

- Cases 007–040 have unit/type/export validation but are not yet individually completed in the browser walkthrough.
- A browser walkthrough is not a physical Android-device test.
- No signed APK/AAB, Play Store release, real-device compatibility pass, production backend, analytics/crash service or monetization has been completed.
- The Expo web export is a browser preview, not an installable Android app.

## 4. Sustainable Android-friendly workflow — no Replit Agent allowance

1. Preserve the existing Replit app and original archive; do not restart or overwrite them.
2. Treat `casezero-development` as the only active source branch.
3. Make small, reviewable GitHub commits: update the relevant screen/data module and tests together.
4. Let GitHub Actions run typecheck, unit tests, Expo web export and the mobile browser walkthrough. Fix a failing check before moving on.
5. GitHub Actions exports the app, runs a 390×844 dark Playwright walkthrough and uploads screenshots; it does not publish an interactive preview URL. The Android workflow builds a standalone APK with the JavaScript bundle embedded and now checks that the manifest, bundle and arm64-v8a native libraries exist before upload. An interactive Expo Go session still requires the Expo dev server on a development machine. The earlier debug APK was missing its JS bundle and is not usable.
6. Do not trigger paid cloud builds, paid APIs, paid hosting, analytics, public publishing or monetization without explicit approval.
7. Before release, build an Android package with a verified free/local path and test it on an actual Android device. Do not call the browser export an APK.

## 5. Historical next-work list — 4 November 2026

1. **Validate and polish the Missing Detective finale.** Cases 063–066 now have first-pass playable screen/data integrations and sequential Bureau routing. Case 065 passed the latest CI run. Case 066 has dedicated tests and expanded workflow scope; its CI and finale browser walkthrough are pending.
2. Add targeted mobile-browser walkthroughs for Cases 007–040 in manageable groups.
3. Review connected-case continuity, evidence fairness, archive carryover and small-screen navigation.
4. Improve HQ/team depth only where it creates meaningful investigation choices; preserve the existing roster/assignment/XP system.
5. Polish accessibility, save migration, performance, audio and notification behavior.
6. Complete real Android package/device testing. The first unsigned debug APK workflow completed, but that APK failed on-device because its JavaScript bundle was not packaged. A corrected standalone release APK workflow is still running; no replacement artifact has been uploaded or tested yet.
7. Consider optional hints, case packs or rewarded ads only after the free core story is complete. Keep the main campaign fair and playable without payment.

## Quality bar

A case is not release-ready just because its screen exists or its unit tests pass. Its evidence must support the conclusion, wrong deductions must be retryable, timeline rules must be fair, local progress and archive carryover must work, and the case must pass the relevant automated mobile walkthrough and later real-device testing. Keep Truth, Proof and Outcome distinct.
