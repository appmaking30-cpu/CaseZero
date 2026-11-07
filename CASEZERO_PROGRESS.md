# Current development checkpoint — 7 November 2026

## Preservation and working source

- The existing Replit workspace `BothHauntingProjects` was not edited in this workflow; no Replit Agent usage was made.
- The original `BothHauntingProjects.zip` is present on `replit-original-backup-2026-10-31`. Its GitHub file entry was verified; the previously recorded archive size is 7,167,701 bytes.
- The extracted source remains under `original-projects/BothHauntingProjects/`; the canonical Expo app is `original-projects/BothHauntingProjects/artifacts/casezero/`.
- Active source branch: `casezero-development`. Do not develop on `main`, `casezero-original-work`, or the original backup branch.
- Checkpoints: `casezero-safety-checkpoint-2026-11-07` is the pre-smoke-fix snapshot; `casezero-verified-checkpoint-2026-11-07` contains the corrected browser test.
- `CASEZERO_ANDROID_WORKFLOW.md` now documents the no-Replit-Agent, Android-first workflow. GitHub remains the source of truth for current changes; nothing automatically syncs back into Replit.

## Exact implementation and playability boundary

- Stack: the existing Expo Router / React Native / TypeScript app with AsyncStorage. This was continued, not restarted. The app config is dark, landscape-first, with 16:9 layout checks.
- **Case 001 — The Last Train Home:** five inspectable records, three witnesses/six questions, at least one question per witness required (the other questions are optional), four-event timeline, retryable wrong timeline and suspect/motive attempts, evidence-gated conclusion, separate Truth / Proof / Outcome review, and local save/restore. The recorded browser walkthrough completes this case; it has not yet been played through on a physical Android device.
- **Cases 002–006:** connected evidence/interview/timeline/deduction cases; included in the recorded full browser walkthrough. Cases 002–003 are integrated into the Bureau flow; Cases 004–066 have dedicated React Native case screen components.
- **Cases 007–040:** case data/rules and dedicated screens exist. The recorded unit suite covers their rules, while browser smoke only checked screen navigation and one-clue save/restore. They have not all been completed as full browser mysteries.
- **Cases 041–066:** included in the recorded full browser walkthrough, including the finite Missing Detective endgame.
- Shared systems in source: investigation archive/carryover, seven date-rotating Daily Case Bulletin mysteries, and three Bureau specialists with saved assignments, XP/ranks and evidence-gated insights.
- The repository contains 67 case data modules, 63 dedicated case screen components (004–066), and 63 dedicated case test files (Case 001 plus Cases 005–066); Cases 002–004 are exercised by the opening-case integration tests and walkthrough.
- The 1,000+ number is the long-term content target, not the current playable case count. The present campaign set is 66 cases. Daily bulletin entries rotate in-app by device date; automatic push notifications are not implemented.
- No production backend, cloud sync, online case publishing, multiplayer, real-world case system, active monetization, production signing, Play Store AAB or store release is complete.
- The dark cinematic UI and bespoke illustrated SVG scene components are implemented. Browser screenshots/layout checks are not a substitute for testing the APK on a real phone.

## Validation and fixes on 7 November

- Browser checks run [42283938284](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42283938284) completed TypeScript, the full unit suite and Expo web export successfully. The Playwright smoke then failed at its first page assertion because it expected the Bureau to load immediately; the current new-install flow correctly starts at the cinematic title screen.
- Corrected the smoke script in commit [edb50b9](https://github.com/appmaking30-cpu/CaseZero/commit/edb50b9bb0a7727952036340c2f1da157e006b95). It now enters the Bureau from the title screen, checks that File 002 is locked in the campaign archive before Case 001 is closed, and then checks the 16:9 Bureau layout. A fresh green run for this correction has not yet been confirmed.
- Android workflow [42283938002](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42283938002) passed typecheck, unit tests, native prebuild, Gradle APK assembly, payload verification and artifact upload. Its artifact was built from commit `3e72cdd`, before the current title-screen/archive/progression changes. It is therefore a stale test build, not the latest app.
- No physical Android installation or full phone playthrough has been completed. A fresh APK for the current app source and a device test remain outstanding.
- No paid Replit Agent allowance, EAS build, paid API, paid hosting, analytics or monetization was used.

## Next work

1. Re-run the corrected browser smoke and resolve any new failure before unrelated features.
2. Generate a fresh APK from the current app-source commit and test it on a real Android phone in landscape.
3. Keep Case 001 the quality bar: polish its tutorial guidance, readability, accessibility and evidence presentation without weakening its deduction requirements.
4. Add deeper full-case walkthroughs for Cases 007–040; do not label shallow navigation checks as complete mysteries.
5. Continue connected story/case memory and Missing Detective continuity, then improve HQ/team and daily bulletin only where they add real gameplay choices.
6. Keep monetization and paid services deferred unless explicitly approved.

---

# Historical development checkpoint — 6 November 2026

## Preservation and sustainable workflow

- Existing Replit app: **BothHauntingProjects** — https://replit.com/@appmaking30/BothHauntingProjects. It remains unchanged; Replit Agent was not used.
- Original Replit archive: `BothHauntingProjects.zip`, 7,167,701 bytes, preserved unchanged on `replit-original-backup-2026-10-31`. The same archive is retained in the GitHub repository.
- Extracted source snapshot: `casezero-original-work`.
- Active source: `casezero-development`.
- Rollback branches: `casezero-safety-checkpoint-2026-11-06` (pre-fix snapshot) and `casezero-verified-checkpoint-2026-11-06` (current post-fix source checkpoint).
- GitHub is the working source of truth for small ChatGPT-assisted commits. GitHub changes do not automatically sync to Replit. Do not edit both copies independently.
- The workflow uses the existing public GitHub repository and its Actions checks. No Replit Agent allowance, paid build service, paid API, paid hosting, analytics, publishing or monetization was used.

## Current implementation inventory

- Canonical app: existing Expo Router / React Native / TypeScript app with AsyncStorage local persistence.
- Case 001 — **The Last Train Home**: five inspectable records, three witnesses/six questions, four-event chronology, suspect-plus-motive deduction, retryable wrong answers, distinct Truth / Proof / Outcome review, and local save/restore.
- Campaign Cases 001–066 have case data/rules. Cases 002–003 are integrated into the main Bureau screen; Cases 004–066 have dedicated React Native screen components.
- Repository inventory: 67 case data modules, 63 dedicated case screens (004–066), and 63 dedicated case test files (Case 001 plus Cases 005–066). The opening-case tests and browser walkthrough also exercise Cases 002–004.
- Shared systems in source: investigation archive/carryover, Missing Detective story through its finite Case 066 ending, seven rotating Daily Case Bulletin mysteries, and the three-specialist Bureau Team with saved assignments, XP/ranks and evidence-gated insights.
- The above inventory confirms implementation exists in source; it does not mean every screen has received a complete phone playthrough.

## 16:9 visual work

- Expo app orientation is now landscape.
- The Bureau home has a cinematic observatory image layer and a split hero / active-case layout on wide screens.
- The tutorial evidence records use a two-column board on wide screens.
- The first visual commit exposed a duplicate `width` style property (TypeScript TS1117). It was fixed in commit `33c1bca2`.
- Added separate 1280×720 (16:9) Playwright assertions for the Bureau split layout and two-column Case 001 evidence board in commit `e50a90ef`.
- The 16:9 screenshots were generated and visually inspected: `casezero-hq-landscape-16x9.png` and `casezero-evidence-landscape-16x9.png`.

## Latest verified automated checks

- GitHub Actions run [42221174813](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42221174813) passed on commit `e50a90efe5d17d3d05f55978b26217b53d7e90c7`:
  - Expo TypeScript check passed.
  - Full unit-test suite for Cases 001–066 and shared systems passed.
  - Expo web export passed.
  - Dark 390×844 browser walkthrough passed for Cases 001–006 and 041–066, including retry paths, archive persistence, Daily Case Bulletin and Bureau Team assignment.
  - Cases 007–040 passed navigation and one-clue save/restore smoke; this is not a full mystery playthrough for those cases.
  - 1280×720 landscape geometry checks passed for the Bureau and Case 001 evidence board.
  - Screenshot artifact [casezero-mobile-preview](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42221174813) uploaded; it contains 39 screenshots, including the two landscape previews.
- The 390×844 and 1280×720 tests are browser tests, not a physical Android installation or playthrough.
- Android standalone APK workflow [42220815135](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42220815135) has passed typecheck, unit tests and Expo native prebuild. Gradle APK assembly was still running at the time of this update; no APK artifact or installability claim is made yet.
- No signed Play Store bundle, production signing, store release, real-device compatibility pass, production backend, cloud sync or monetization is complete.

## Next priorities

1. Keep Case 001 as the release-quality tutorial; improve its interview, timeline, deduction and review presentation to match the new wide layout without weakening evidence requirements.
2. Finish and verify the standalone Android APK build, including signature/payload checks, then test it on a real Android device.
3. Add deeper full-case walkthrough coverage for Cases 007–040 in manageable groups; current checks there are navigation/save smoke plus unit tests.
4. Review continuity and fair deductions across the connected campaign and the Missing Detective ending.
5. Expand HQ/team systems only where they add meaningful player choices; keep daily cases optional.
6. Finish accessibility, save migration, performance, audio and notification behavior.
7. Consider optional hints, case packs or rewarded ads only after the free core story is complete, and only with explicit approval.


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
