# CaseZero — Beyond the Evidence

A mobile-first detective mystery game. The intended visual direction is cinematic midnight navy, warm evidence gold, and restrained red alerts. The first milestone is one fair, fully playable tutorial case; connected stories come only after that foundation is solid.

## Canonical source and preservation

- The original Replit app is **BothHauntingProjects**: https://replit.com/@appmaking30/BothHauntingProjects
- The original source archive, `BothHauntingProjects.zip`, is preserved on the `replit-original-backup-2026-10-31` branch. The archived ZIP is 7,167,701 bytes.
- The `casezero-original-work` branch contains the extracted source snapshot under `original-projects/BothHauntingProjects/`. Its `original-projects/SOURCE_IMPORT_REPORT.md` records 387 archive entries, 136 extracted source/config files, and 251 excluded machine-local, dependency, build, log, and nested-Git entries. The original ZIP remains separately preserved.
- The active development branch is `casezero-development`, based on that extracted Expo project.
- `main`, `replit-original-backup-2026-10-31`, and `casezero-original-work` are preservation/reference branches. Do not develop directly on them.
- `casezero-rebuild` is a separate web prototype from an earlier experiment; it is not the canonical native-app source.

## Where the app lives

- Workspace root: `original-projects/BothHauntingProjects/`
- Expo app: `original-projects/BothHauntingProjects/artifacts/casezero/`
- Case 001 data and deduction rules: `artifacts/casezero/game/case001.ts`
- Main mobile screen: `artifacts/casezero/app/(tabs)/index.tsx`
- Tests: `scripts/tests/`

The original app uses Expo Router, React Native, TypeScript, and AsyncStorage for local progress. The Expo project is Android-capable; its current configuration uses the standard Expo Android target.

## Current implementation status

**Implemented in the preserved Expo app**
- Dark-first Detective Bureau home screen and Case 001 entry.
- Case 001: *The Last Train Home*.
- Five inspectable evidence records.
- Three witnesses, each with two questions; at least one question per witness is required.
- Four-event timeline puzzle with a retry after an incorrect order.
- Suspect plus motive deduction, with retry after an unsupported theory.
- Separate Truth, Proof, and Outcome review.
- Local save/resume for the tutorial investigation.

**Not yet implemented in this Expo app**
- Additional connected cases and cross-case memory.
- The Missing Detective story arc.
- Specialist/team systems and a daily case bulletin.
- Cloud accounts/saves, multiplayer, or monetization.

These are planned, not completed features. Optional monetization remains later and must not block core gameplay.

## Sustainable development workflow

1. Keep the Replit project and original ZIP untouched as preservation sources.
2. Make all new changes as small commits on `casezero-development`; ChatGPT can edit the GitHub source directly without using Replit Agent.
3. Every app/test/workflow change runs the GitHub Actions checks: frozen dependency install, Expo TypeScript check, unit tests, Expo web export, and a Playwright smoke test at a 390×844 mobile viewport.
4. Fix a failing check before building the next feature. Keep the source snapshot and backup branches unchanged.
5. Use the exported web build for an Android-browser preview when a free static preview is configured. The automated phone viewport is not a substitute for testing on a physical Android device.
6. Do not enable paid builds, paid hosting, paid APIs, or paid services without the user's explicit approval.

## Quality bar

The tutorial must be fair: the decisive suspect, timeline, and motive all need evidence the player can inspect. Wrong answers must allow a retry. Keep Truth (what happened), Proof (what the evidence establishes), and Outcome (what follows) distinct. Do not label a feature complete until it exists in the canonical Expo app and its relevant tests pass.
