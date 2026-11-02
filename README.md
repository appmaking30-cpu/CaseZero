# CaseZero — Beyond the Evidence

A mobile-first detective mystery game. The visual target is a cinematic midnight-navy interface with warm evidence-gold accents and restrained red alerts. The canonical app is the original Expo/React Native project, not the earlier web-only rebuild.

## Preservation and canonical source

- Existing Replit app: **BothHauntingProjects** — https://replit.com/@appmaking30/BothHauntingProjects
- Original Replit ZIP: `BothHauntingProjects.zip`, preserved unchanged on `replit-original-backup-2026-10-31` (7,167,701 bytes).
- Extracted source snapshot: `casezero-original-work`, under `original-projects/BothHauntingProjects/`.
- Import report: `original-projects/SOURCE_IMPORT_REPORT.md` (387 archive entries; 136 source/config files extracted; machine-local, dependency, build, log and nested-Git entries excluded).
- Active development branch: `casezero-development`.
- `main`, `replit-original-backup-2026-10-31` and `casezero-original-work` are preservation/reference branches. Never develop directly on them.
- `casezero-rebuild` is an earlier web prototype, not the canonical Android-capable app.

The Replit workspace remains separate and preserved. GitHub changes do **not** sync back into Replit automatically. Do not edit both copies independently or overwrite the original Replit workspace with an unverified build.

## App structure

- Original workspace snapshot: `original-projects/BothHauntingProjects/`
- Expo app: `original-projects/BothHauntingProjects/artifacts/casezero/`
- Main Bureau/navigation screen: `artifacts/casezero/app/(tabs)/index.tsx`
- Case screens: `artifacts/casezero/components/`
- Case rules/data: `artifacts/casezero/game/`
- Automated tests: `scripts/tests/`

The app uses Expo Router, React Native, TypeScript and AsyncStorage for on-device progress. Its Expo configuration targets portrait Android and supports a static web export for automated mobile-viewport testing.

## Implementation audit — 2 November 2026

### Implemented in the canonical app

- Dark-first Detective Bureau home screen and sequential campaign file routing.
- **40 campaign investigations (001–040)** with case-specific data modules, integrated React Native screens and individual case-rule tests.
- **Case 001 — The Last Train Home:** the tutorial has five inspectable records, three witnesses/six questions, a four-event timeline, person-plus-motive deduction, retryable wrong answers, and separate Truth / Proof / Outcome review. Progress can be resumed locally.
- **Cases 002–004:** connected opening investigations; Case 002 receives Case 001 findings and unanswered questions, and the Missing Detective thread unlocks after the opening cases. Case 004 follows Rowan Vale’s missing recorder to North Quay.
- **Cases 005–006:** the M-2 transfer/recorder trail and transcript reconstruction. Case 006 deliberately attributes the recording to an upstream authority rather than inventing a speaker identity.
- **Cases 007–040:** each has a case-specific evidence/interview/timeline/deduction data module, integrated React Native screen, local progress, archive carryover and a dedicated unit-test file.
- **Cases 037–040** extend the dispatch/transfer investigation chain: the Missing Movement Ledger, The Queue Before Arrival, The Station Without an Operator, and a shift-handover investigation. Their tests check evidence structure, chronology, careful attribution where individual identity is not established, and carryover from earlier files.
- **Investigation memory:** completed conclusions, inspected clues, asked questions and unanswered questions are kept in a shared local archive and used by later cases.
- **Missing Detective arc:** the first dossier unlocks after Cases 001–002; a four-file convergence report unlocks after Cases 001–004. The connected investigation continues beyond Case 036, but the final revelation/ending is not implemented yet.
- **Daily Case Bulletin:** seven standalone cases rotate deterministically by the device’s local calendar date. Each has three inspectable records, a person-and-motive deduction, retryable choices and separate local progress; daily files do not change the campaign archive.
- **Bureau Team:** three specialists unlock at campaign milestones. The board supports one specialist per file and one file per specialist, saved assignments, case-closure/daily XP, two rank-up steps and evidence-gated insights. These insights support analysis; they do not reveal uninspected evidence or auto-solve cases.
- **Local persistence:** case progress, the investigation archive, daily progress and Bureau assignments/ranks use AsyncStorage on the device.

### Verification coverage — what the checks actually prove

- Unit tests cover the case rules for Cases 001–040, campaign/archive behavior, the Missing Detective unlock/convergence, daily rotation and Bureau assignment/progression.
- The Playwright mobile-viewport walkthrough runs at **390×844** and completes Cases 001–006, checks retry paths, then checks the Daily Case Bulletin and Bureau assignment flow.
- The 2 November 2026 GitHub Actions run passed dependency installation, Expo TypeScript checking, the full unit-test suite, Android-friendly Expo web export, Chromium installation, the browser walkthrough and screenshot upload.
- A passing browser walkthrough is **not** a physical Android-device test. Cases 007–040 have unit/type/export validation but are not yet individually completed in the browser walkthrough.
- No signed APK/AAB, Play Store release, real-device compatibility pass, crash/analytics service, or production backend has been completed.

### Case 041 development — 2 November 2026

- Added the Case 041 evidence/rules module, dedicated unit tests and a React Native investigation screen on `casezero-development`.
- Working title: **The Missing Signature**. The file traces the dispatch carbon, Records Annex duplicate manifest, control-office intake and Annex container index.
- The fair deduction is deliberately limited: a second copy is indexed in container RA-17, but its contents have not been retrieved. The case does not claim that a signature was erased, never written, or that a named person altered the record.
- The screen includes local save/restore, evidence inspection, witness interviews, four-event timeline reconstruction, evidence-based deduction, archived completion and Bureau specialist insight. It is connected after Case 040 in the campaign.
- **Validation status: automated typecheck, full test suite, Expo export and browser walkthrough are running; Case 041 is not counted as fully verified until these checks pass.** No physical Android-device test has been completed.
- Next step: add dedicated Case 041 mobile-browser walkthrough coverage and verify the full campaign unlock/close flow before starting Case 042.

### Not implemented yet

- The final Missing Detective reveal and campaign ending; the current campaign’s latest investigation is Case 041; the Missing Detective arc remains unresolved.
- Full detective HQ facilities/building upgrades and a deeper team-management layer beyond the current roster, assignments, XP/ranks and evidence insights.
- Cloud accounts, cross-device sync, multiplayer, online/community case publishing or a live backend.
- Monetization, paid features or ad integration.

## Sustainable Android-friendly workflow — no Replit Agent required

1. Keep the existing Replit app and original ZIP untouched as the recovery source.
2. Treat `casezero-development` as the only active coding branch. ChatGPT can make small, reviewable GitHub commits to this branch without using Replit Agent's monthly allowance.
3. For each change, update the relevant screen/data module and its tests together. Keep commits narrow; do not batch unrelated features.
4. GitHub Actions validates each push with the checks above. Fix a failing check before adding another feature.
5. Use the browser screenshots and test logs to review behavior. Then perform a real Android-device test before release.
6. Do not enable public deployment, paid hosting, paid APIs, paid builds, analytics or monetization without explicit approval.
7. If the Replit workspace must be refreshed later, do it as a deliberate, reviewed GitHub import/sync. Never overwrite the preserved original workspace.

## Master-plan priorities

1. Keep Case 001 as the fair, complete tutorial and protect its evidence-backed solution/retry behavior.
2. Review Cases 007–040 for continuity, fair deductions, accurate carryover and mobile usability; add targeted end-to-end walkthrough coverage in manageable groups.
3. Complete the Missing Detective investigation with a genuine, earned ending rather than adding endless cases without resolution.
4. Expand HQ/team systems only where they add meaningful investigation choices and progression.
5. Maintain the daily bulletin as optional replayable content.
6. Finish accessibility, art/audio, performance, save migration, Android device testing and release packaging.
7. Consider optional monetization only after the free core campaign is complete. It must not block core story or investigation mechanics.

## Quality bar

A case is not release-ready merely because a screen exists. Its clues must support the intended conclusion; timeline and deduction rules must reject incomplete/wrong solutions while allowing retries; local progress and archive carryover must be reliable; and the case must pass relevant unit, typecheck, export and browser/device checks. Keep Truth (what happened), Proof (what the evidence establishes) and Outcome (what follows) distinct.
