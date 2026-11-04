# CaseZero development checkpoint — 4 November 2026

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
- The repository currently contains campaign case data for **Cases 001–062**, dedicated screen components for Cases 004–062, and dedicated case-rule tests for Case 001 and Cases 005–062. Additional system tests cover connected progression and the shared systems.

### Connected campaign and systems

- Completed-case archive stores selected conclusions, inspected clues, asked questions and unanswered questions; later investigations can use this memory.
- Cases 002–062 continue the campaign through linked evidence, interviews, chronology and deduction. Their conclusions deliberately distinguish a record/role/credential from proof of a named person’s physical action.
- Missing Detective arc:
  - Initial dossier unlocks after Cases 001–002.
  - Four-file convergence report unlocks after Cases 001–004.
  - Recorder-transfer index unlocks after Cases 048–053.
  - Cases 054–062 continue the assignment, relay, buffer, access, key and cylinder trail.
  - **Not finished:** final recorder recovery, Rowan Vale’s fate, the final explanation and the campaign ending.
- Daily Case Bulletin: seven standalone cases rotate deterministically by device-local calendar date; daily progress is separate from the main campaign archive.
- Bureau Team: three specialists, one-specialist-per-file assignments, saved assignments, case/daily XP, rank progression and evidence-gated insights.
- Local persistence covers case progress, investigation archive, daily progress and Bureau assignments/ranks.

### Case 062 — The Cylinder Service Report

- Five evidence records, three witnesses/six questions, six timeline events, a person/records-finding plus motive-style deduction, local save/restore, archive carryover and Bureau specialist insight.
- Finding: the installation register and later independent inspection both identify CY-8841; the pending service request and searched completion/parts archives do not verify a replacement. The case does not claim that undocumented handling was impossible or identify a person at the lock.
- A mobile browser selector mismatch and a transparent-choice styling typo were fixed.

## 3. What has actually passed

GitHub Actions run [41828287084](https://github.com/appmaking30-cpu/CaseZero/actions/runs/41828287084) passed:

- Dependency installation.
- Expo TypeScript check.
- Full unit-test suite through Case 062 and system tests.
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
5. The current GitHub Actions workflow exports the app, runs a 390×844 Playwright walkthrough and uploads screenshots; it does not publish an interactive preview URL. An interactive Expo Go session still requires the Expo dev server on a development machine. A manual unsigned Android debug-APK workflow has been added; its first Gradle build is still being verified, so no APK is claimed ready yet.
6. Do not trigger paid cloud builds, paid APIs, paid hosting, analytics, public publishing or monetization without explicit approval.
7. Before release, build an Android package with a verified free/local path and test it on an actual Android device. Do not call the browser export an APK.

## 5. Next work, in priority order

1. **Finish the Missing Detective arc.** Case 062’s next lead is the independent cross-index of North Annex hardware identifiers and access-control maintenance exceptions. Map the remaining evidence to a finite endgame and earned conclusion before creating an endless new chain.
2. Add targeted mobile-browser walkthroughs for Cases 007–040 in manageable groups.
3. Review connected-case continuity, evidence fairness, archive carryover and small-screen navigation.
4. Improve HQ/team depth only where it creates meaningful investigation choices; preserve the existing roster/assignment/XP system.
5. Polish accessibility, save migration, performance, audio and notification behavior.
6. Complete real Android package/device testing.
7. Consider optional hints, case packs or rewarded ads only after the free core story is complete. Keep the main campaign fair and playable without payment.

## Quality bar

A case is not release-ready just because its screen exists or its unit tests pass. Its evidence must support the conclusion, wrong deductions must be retryable, timeline rules must be fair, local progress and archive carryover must work, and the case must pass the relevant automated mobile walkthrough and later real-device testing. Keep Truth, Proof and Outcome distinct.
