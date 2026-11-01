# CaseZero — Beyond the Evidence

A mobile-first detective mystery game. The visual target is a polished, cinematic midnight-navy interface with warm evidence-gold accents and restrained red alerts. The first priority is a fair, fully playable tutorial mystery; connected investigations follow only after that foundation is solid.

## Canonical source and preservation

- The existing Replit app is **BothHauntingProjects**: https://replit.com/@appmaking30/BothHauntingProjects
- The original Replit source archive, `BothHauntingProjects.zip`, is preserved unchanged on the `replit-original-backup-2026-10-31` branch (7,167,701 bytes).
- The `casezero-original-work` branch contains the extracted source snapshot under `original-projects/BothHauntingProjects/`. `original-projects/SOURCE_IMPORT_REPORT.md` records 387 archive entries, 136 extracted source/config files, and 251 excluded machine-local, dependency, build, log, and nested-Git entries. The original ZIP remains separately preserved.
- The active working branch is `casezero-development`, based on that extracted Expo project.
- `main`, `replit-original-backup-2026-10-31`, and `casezero-original-work` are preservation/reference branches. Do not develop directly on them.
- `casezero-rebuild` is a separate earlier web prototype; it is not the canonical Android-capable app.

The original Replit workspace is preserved separately from GitHub. Changes committed to `casezero-development` do **not** automatically sync back into the Replit workspace. Treat this branch as the current development source; do not make independent edits in both places or overwrite the original workspace.

## Where the app lives

- Replit workspace root: `BothHauntingProjects/`
- GitHub workspace snapshot: `original-projects/BothHauntingProjects/`
- Expo app: `original-projects/BothHauntingProjects/artifacts/casezero/`
- Case data and deduction rules: `artifacts/casezero/game/`
- Main mobile screen: `artifacts/casezero/app/(tabs)/index.tsx`
- Tests: `scripts/tests/`

The canonical app uses Expo Router, React Native, TypeScript, and AsyncStorage for local progress. Its Expo configuration targets portrait Android and static web export.

## Current implementation status

**Playable in the active Expo app**

- Dark-first Detective Bureau home screen and case-file navigation.
- **Case 001 — The Last Train Home:** complete tutorial flow with five inspectable records, three witnesses (two questions each), a four-event chronological timeline, suspect-plus-motive deduction, and separate Truth / Proof / Outcome review.
- Case 001 fairness gates: all five records must be inspected, at least one question must be asked of each witness, the timeline must be solved, and an unsupported deduction can be retried.
- Case 001 local save/resume and an investigation archive recording inspected clues, asked questions, unanswered questions, and the player's conclusion.
- **Case 002 — The Unlit Room:** a connected follow-on investigation with four records, three witnesses, a four-event timeline, suspect-plus-motive deduction, and its own Truth / Proof / Outcome review. It unlocks after Case 001 is closed and can use the previous case's actual recorded findings and unanswered lead.
- Case 002 local progress save/resume and cross-case archive memory.
- A basic Bureau archive that displays completed investigations.
- **The Missing Detective:** an unlockable dossier/story teaser after both opening cases close. It is a hook for the next investigation, not yet a playable case.

**Not yet implemented**

- Playable Missing Detective investigation, its evidence, witnesses, timeline, and deduction.
- Specialist/team recruitment, assignments, or upgrade systems.
- Daily case bulletin and rotating case content.
- Cloud accounts or cross-device saves.
- Multiplayer or online services.
- Monetization or paid features.

The Bureau screen and case archive are a foundation, not a finished team-management HQ. Optional monetization remains a late-stage choice and must never block the core game.

## Sustainable, no-Agent development workflow

1. Preserve the existing Replit workspace and the original ZIP branch; do not use Replit Agent for routine coding.
2. Make small, reviewable commits directly to `casezero-development`. ChatGPT can read and update the GitHub source without consuming Replit Agent allowance.
3. Each app/test/workflow change runs GitHub Actions: frozen pnpm install, Expo TypeScript check, unit tests, Expo web export, and a Playwright mobile-viewport walkthrough (390×844).
4. Fix a failing check before adding the next feature. Keep the original ZIP and `casezero-original-work` snapshot unchanged.
5. The browser walkthrough is an automated mobile-size check, not proof of behavior on a physical Android phone. Do a real-device check before release. No public preview/deployment, paid build, paid hosting, paid API, or other paid service should be enabled without explicit approval.
6. If the Replit workspace needs to be updated later, do it as a deliberate GitHub sync/import step; never overwrite the preserved original with an unverified build.

## Quality bar

The tutorial must be fair: the decisive person, timeline, and motive must be supported by inspectable evidence. Wrong answers must allow a retry. Keep Truth (what happened), Proof (what the evidence establishes), and Outcome (what follows) distinct. Do not label a feature complete until it exists in the canonical Expo app and its relevant unit and browser tests pass.
