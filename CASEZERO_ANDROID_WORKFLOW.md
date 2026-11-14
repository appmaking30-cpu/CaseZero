# CaseZero Android development workflow

This is the supported workflow for continuing the existing CaseZero project without Replit Agent, a rebuild, or paid build services.

## 1. Preserve the original project

- Original Replit workspace: [BothHauntingProjects](https://replit.com/@appmaking30/BothHauntingProjects). It is being kept as the untouched source reference; GitHub edits do not sync back to Replit.
- Original archive: [BothHauntingProjects.zip](https://github.com/appmaking30-cpu/CaseZero/blob/replit-original-backup-2026-10-31/BothHauntingProjects.zip) (7,167,701 bytes), preserved on the `replit-original-backup-2026-10-31` branch.
- Extracted source snapshot: `casezero-original-work`.
- Canonical app: `original-projects/BothHauntingProjects/artifacts/casezero/`.
- Active development branch: `casezero-development`.
- Do not develop on `main`, `casezero-original-work`, or the original ZIP/backup branch.
- Safety snapshots: `casezero-safety-checkpoint-2026-11-07`, `casezero-verified-checkpoint-2026-11-07`, and `casezero-safety-checkpoint-2026-11-10` (the pre-save-sanitizer source head), and `casezero-safety-checkpoint-2026-11-11` (the pre-field-notebook source head).

The existing Replit project is not being replaced. Do not edit the Replit copy and GitHub copy independently.

## 2. Small ChatGPT-assisted changes

1. Work only on `casezero-development`.
2. Inspect the relevant screen, case data/rules, save logic and existing test before changing behavior.
3. Make one logical change per commit. Update or add a regression test in the same change.
4. Review the commit diff before moving to the next feature.
5. Never replace the project with a fresh template or regenerate the whole app to make a small change.

### Case 001 save validation

AsyncStorage is treated as untrusted input. Before restoring the tutorial, `sanitizeCase001SavedProgress` checks known IDs and the real investigation gates. Interview progress requires all five clues; timeline progress requires all three witnesses; a solved timeline requires the exact chronological order; completion requires the verified timeline plus Miles and the protective motive. The conclusion handler repeats the prerequisites, and regression tests live in `scripts/tests/case001.test.ts`. Keep this logic pure and unit-testable outside React Native.

The Case 001 timeline screen now gives each selected event an accessible **REMOVE** control. This lets the player correct one selection without discarding the rest of the sequence; the solved timeline remains locked. The pure helper and browser walkthrough are covered by regression tests.

Case 001 evidence records, witness questions and timeline choices also expose explicit screen-reader labels, contextual hints and selected/expanded/disabled state. The remove control explains that it removes only one event and preserves the rest. Browser smoke checks the accessible names; a real Android TalkBack pass is still required.

The Case 001 deduction screen also has a collapsible field notebook. It derives full evidence details from inspected clue IDs and exact witness replies from asked-question IDs, while leaving unasked replies hidden. The notebook is review-only and does not mutate the investigation save.

The existing stack is Expo Router, React Native, TypeScript and AsyncStorage. Keep the current stack and lockfile.

## 3. Free automated checks

Workflow: [Original CaseZero workspace checks](https://github.com/appmaking30-cpu/CaseZero/actions/workflows/original-project-checks.yml)

It runs the locked pnpm install, Expo TypeScript check, the full case/system unit-test suite, Expo web export, and Playwright checks for the dark mobile layout and 16:9 Bureau/evidence layout.

The repository is public. GitHub documents that standard GitHub-hosted runners are free for public repositories. Keep the workflow on the standard `ubuntu-24.04` runner; do not select larger paid runners. See [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

After a code change, check the repository's Actions tab. If a run did not start automatically, open the workflow and use **Run workflow** with branch `casezero-development`. Do not treat a commit as tested until its run is green.

## 4. Build an Android test APK when needed

Workflow: [CaseZero Android standalone APK](https://github.com/appmaking30-cpu/CaseZero/actions/workflows/android-debug-apk.yml)

- It uses the standard GitHub-hosted Ubuntu runner, installs the locked dependencies and Android SDK, runs typecheck and unit tests, generates the native Android project, builds a standalone APK with the JavaScript bundle embedded, verifies the APK payload, and uploads `casezero-standalone-apk`.
- It can be started manually from the Actions tab using **Run workflow** on `casezero-development`. Push triggers cover app-source changes, workspace lockfile changes, the Android workflow itself, and `scripts/tests/**` changes because the APK workflow runs the unit suite before building.
- Download the artifact ZIP from the completed run, extract `app-release.apk`, and test that APK on the Android phone in landscape.
- The workflow artifact is retained for 30 days. Keep the commit SHA beside any test notes so a device result is tied to the exact build.
- This is a test APK, not a Play Store release. The project has not selected a permanent Android application ID or completed production signing/store preparation.

The project currently uses Expo SDK 58. We are not depending on the Play Store version of Expo Go as the test path; Expo's SDK-transition guidance can make the Play Store Expo Go version mismatch a moving target. The standalone APK workflow is the more reliable phone test for this project. See [Expo's SDK/Expo Go guidance](https://docs.expo.dev/get-started/create-a-project/) and [version-mismatch troubleshooting](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/).

## 5. Exact implementation and playability boundary

### Implemented and exercised in browser walkthroughs

- **Case 001 — The Last Train Home:** five inspectable records; three witnesses and six questions; at least one question from each witness is required while the remaining questions are optional; four-event timeline with retry; suspect-plus-motive deduction; wrong theories can be retried; Truth / Proof / Outcome review; local save/restore.
- **Cases 002–006:** connected investigations with evidence, witness interviews, timeline and deduction flows, exercised in the browser campaign walkthrough.
- **Cases 041–066:** exercised in the browser campaign walkthrough, including the Missing Detective endgame.
- **Cases 007–040:** their data/rules and dedicated screens exist; unit tests pass in the recorded check, and the browser smoke only verified navigation plus one-clue save/restore. Do not describe these 34 cases as individually completed full playthroughs.
- **Shared systems:** local investigation archive/carryover, seven date-rotating Daily Case Bulletin mysteries, and a three-specialist Bureau Team with saved assignments, XP/ranks and evidence-gated insights.

### Implemented in source, but not yet verified on a physical Android phone

- The cinematic title screen, Bureau, campaign archive and 16:9 landscape layout.
- The investigation screens and local persistence.
- The browser checks at 390×844 and 1280×720 are browser simulations, not Android-device tests.

### Not implemented or not release-ready

- The 1,000+ case count is a long-term content target, not 1,000 finished playable cases. The current campaign set is 66 cases.
- Daily cases rotate in-app using the device date; automatic push notifications are not implemented.
- No production backend, cloud save/sync, online case publishing, multiplayer or real-world case system.
- No monetization is active. Hints, case packs, optional ads and Bureau upgrades remain future decisions requiring explicit approval.
- No physical Android installation/playthrough, Play Store AAB, production signing, store listing or publishing has been completed.

## 6. Current verification notes — 14 November 2026

- The 14 November source adds screen-reader labels, hints and state to Case 001 evidence, witness and timeline controls. The browser test now checks those accessible names.
- The earlier timeline-correction browser smoke failed at a faulty Playwright assertion (over-escaped regex and a test sequence that repeated the wrong final event). The corrected walkthrough now preserves the first three correct selections, replaces the misplaced last event and expects the timeline to solve without a reset. A new green run has not yet been confirmed.
- [Previous Android build run 43422450809](https://github.com/appmaking30-cpu/CaseZero/actions/runs/43422450809) succeeded and produced artifact ID `14036082241` (47,700,828 bytes), built from commit `271a385929303763518346936ef234bcb22d4cba`. It contains individual timeline removal but predates the latest accessibility changes. It expires 13 December 2026.
- [Previous browser run 43422450831](https://github.com/appmaking30-cpu/CaseZero/actions/runs/43422450831) passed TypeScript, unit tests and Expo web export but failed only at the timeline-correction browser assertion. The fresh corrected browser run and fresh APK have not yet been verified.
- The development branch remains 768 commits ahead of the original backup branch and zero behind. The original Replit workspace remains untouched, and the 7,167,701-byte ZIP remains preserved.
- Physical Android installation, a complete Case 001 phone playthrough, and TalkBack testing remain outstanding.

## 7. Historical verification notes — 11 November 2026

- Code/test revision used by the 11 November workflows: `d15a2385619a858b5ff2d515da71a05fdc32458e` (subsequent branch commits in this run only update documentation). A safety branch, `casezero-safety-checkpoint-2026-11-11`, preserves the pre-notebook head `eca33208744ab58f6b6bd3e96bddc32564859f3b`.
- The 11 November change adds a collapsible Case 001 field notebook on the deduction screen. It shows only inspected evidence details and witness replies for questions actually asked, plus optional questions still available. It does not reveal answers to unasked questions.
- Source/test commits: [memory helper](https://github.com/appmaking30-cpu/CaseZero/commit/b73a19eab20448e9cd3b3c472f387ef6e0876e8a), [unit tests](https://github.com/appmaking30-cpu/CaseZero/commit/19f28b223140d54adc1c6eb24272d707a6116eed), [app integration](https://github.com/appmaking30-cpu/CaseZero/commit/07a4a137b35d8a6397ba650dd7889265cda600bb), [browser test](https://github.com/appmaking30-cpu/CaseZero/commit/d15a2385619a858b5ff2d515da71a05fdc32458e).
- Workspace checks [43025576531](https://github.com/appmaking30-cpu/CaseZero/actions/runs/43025576531) completed successfully: TypeScript, the full unit suite, Expo web export, the dark mobile/browser campaign smoke (including notebook hide/reopen), and screenshot upload all passed. Preview artifact ID `13857321599` (3,200,531 bytes) is available from the run.
- Android build [43025576454](https://github.com/appmaking30-cpu/CaseZero/actions/runs/43025576454): TypeScript, unit tests and Android native prebuild passed; Gradle APK assembly remained in progress at the last inspection. No new APK artifact was available yet.
- The previous successful APK is [42814764581](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42814764581), artifact `casezero-standalone-apk` (47,698,704 bytes; ID `13765622041`; expires 10 December 2026). It predates the field-notebook changes and is not the current build.
- Replit's existing `BothHauntingProjects` entry was re-resolved on 11 November and still reported last updated `2026-10-30T08:28:03.800Z`. No Replit Agent or Replit project write was made. The original ZIP remains on `replit-original-backup-2026-10-31`.
- Physical Android installation and a full Case 001 phone playthrough remain outstanding. A passing browser walkthrough and APK payload verification do not substitute for device testing.
- No paid Replit Agent, EAS build, paid API, paid hosting or monetization was used.
