# CaseZero Android development workflow

This is the supported workflow for continuing the existing CaseZero project without Replit Agent, a rebuild, or paid build services.

## 1. Preserve the original project

- Original Replit workspace: [BothHauntingProjects](https://replit.com/@appmaking30/BothHauntingProjects). It is being kept as the untouched source reference; GitHub edits do not sync back to Replit.
- Original archive: [BothHauntingProjects.zip](https://github.com/appmaking30-cpu/CaseZero/blob/replit-original-backup-2026-10-31/BothHauntingProjects.zip) (7,167,701 bytes), preserved on the `replit-original-backup-2026-10-31` branch.
- Extracted source snapshot: `casezero-original-work`.
- Canonical app: `original-projects/BothHauntingProjects/artifacts/casezero/`.
- Active development branch: `casezero-development`.
- Do not develop on `main`, `casezero-original-work`, or the original ZIP/backup branch.
- Safety snapshots: `casezero-safety-checkpoint-2026-11-07`, `casezero-verified-checkpoint-2026-11-07`, and `casezero-safety-checkpoint-2026-11-10` (the pre-save-sanitizer source head).

The existing Replit project is not being replaced. Do not edit the Replit copy and GitHub copy independently.

## 2. Small ChatGPT-assisted changes

1. Work only on `casezero-development`.
2. Inspect the relevant screen, case data/rules, save logic and existing test before changing behavior.
3. Make one logical change per commit. Update or add a regression test in the same change.
4. Review the commit diff before moving to the next feature.
5. Never replace the project with a fresh template or regenerate the whole app to make a small change.

### Case 001 save validation

AsyncStorage is treated as untrusted input. Before restoring the tutorial, `sanitizeCase001SavedProgress` checks known IDs and the real investigation gates. Interview progress requires all five clues; timeline progress requires all three witnesses; a solved timeline requires the exact chronological order; completion requires the verified timeline plus Miles and the protective motive. The conclusion handler repeats the prerequisites, and regression tests live in `scripts/tests/case001.test.ts`. Keep this logic pure and unit-testable outside React Native.

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

## 6. Current verification notes — 10 November 2026

- The latest source work hardens Case 001 AsyncStorage restoration and the conclusion handler. The pre-change rollback branch is `casezero-safety-checkpoint-2026-11-10`.
- The first CI attempt exposed strict TypeScript inference on the case ID sets. This was fixed by explicitly typing them as `ReadonlySet<string>` in [f2c01e2](https://github.com/appmaking30-cpu/CaseZero/commit/f2c01e27bf737c0b89649dc681847110ddbeb29d).
- Final-source checks: [42814764720](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42814764720). Android standalone APK: [42814764581](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42814764581). Both run the corrected code at commit `f2c01e2). At the last inspection, TypeScript and the complete unit suite passed; web export/browser smoke and Gradle APK assembly/verification/upload were still running. Verify their final conclusions before treating this build as green.
- The previous successful standalone APK is [42621083166](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42621083166), artifact `casezero-standalone-apk` (47,696,824 bytes; ID `13677657518`). It was built from app-source commit `7e0d7c5` on 9 November and predates the 10 November save sanitizer. It is not the current build.
- The browser checks from [42621083377](https://github.com/appmaking30-cpu/CaseZero/actions/runs/42621083377) passed TypeScript, all unit tests, Expo web export, the dark mobile walkthrough, 16:9 checks and screenshot upload on commit `7e0d7c5`. These do not validate the new save sanitizer.
- The source archive remains on `replit-original-backup-2026-10-31`; the existing Replit workspace has not been edited by this GitHub workflow. The current development branch is based on the same imported history and contains all backup commits.
- Physical Android installation and a complete Case 001 phone playthrough remain outstanding. The APK workflow verifies the standalone package payload but cannot substitute for testing on the user's handset.
- No paid Replit Agent, EAS build, paid API, paid hosting or monetization was used.
