# CaseZero — Beyond the Evidence

A dark, cinematic detective mystery built on the existing Expo / React Native / TypeScript project. This is a continuation of the original Replit workspace, not a replacement project.

## Preservation and source of truth

- Original Replit app: **BothHauntingProjects** — https://replit.com/@appmaking30/BothHauntingProjects
- Original Replit ZIP: `BothHauntingProjects.zip`, preserved unchanged on `replit-original-backup-2026-10-31` (7,167,701 bytes).
- Extracted source snapshot: `casezero-original-work`, under `original-projects/BothHauntingProjects/`.
- Active development branch: `casezero-development`.
- Rollback/reference branches: `main`, `casezero-original-work`, `replit-original-backup-2026-10-31`, and dated safety checkpoints. Never develop directly on those branches.
- `casezero-rebuild` is an earlier web prototype, not the canonical app.

The Replit workspace remains separate and untouched. GitHub changes do **not** sync back to Replit automatically. Replit Agent is not part of the development workflow.

## Canonical app

- Expo app: `original-projects/BothHauntingProjects/artifacts/casezero/`
- Bureau, navigation and opening cases: `app/(tabs)/index.tsx`
- Dedicated investigation screens: `components/`
- Case rules and evidence: `game/`
- Automated tests: `original-projects/BothHauntingProjects/scripts/tests/`
- CI workflows: `.github/workflows/`

Stack: Expo Router, React Native, TypeScript, AsyncStorage and Playwright. The Expo configuration is now landscape-first, with a 16:9 Bureau hero and a two-column tutorial evidence board on wide screens. Portrait browser coverage remains for narrow/touch layouts.

## Implemented in the current source

- Case 001 — **The Last Train Home**: five inspectable records, three witnesses/six questions, four-event timeline, suspect-plus-motive deduction, retryable wrong answers, separate Truth / Proof / Outcome review, and local save/restore.
- Connected campaign Cases 002–066, including a finite Missing Detective endgame. Cases 002–003 are integrated into the Bureau flow; Cases 004–066 have dedicated React Native screen components.
- Investigation archive carrying completed conclusions, inspected evidence, interview choices and unanswered questions into later cases.
- Daily Case Bulletin with seven date-rotating standalone mysteries and separate local progress.
- Bureau Team with three specialists, milestone unlocks, saved assignments, XP/ranks and evidence-gated insights.
- Local device persistence for campaign progress, archive, daily cases and team assignments.

The repository contains 67 case data modules, 63 dedicated case screen components (004–066), and 63 case test files (Case 001 plus Cases 005–066). Cases 002–004 are covered by the opening-case integration tests and walkthrough.

## Sustainable workflow — no Replit Agent allowance

1. Keep the original Replit app and original ZIP untouched.
2. Make small, reviewable commits only on `casezero-development`.
3. Change the relevant screen and case rules together with their tests.
4. Let GitHub Actions run TypeScript, the full unit suite, Expo web export and Playwright mobile-viewport checks. Fix failures before adding unrelated work.
5. Use GitHub Actions artifacts for preview screenshots and, when its payload checks pass, the standalone Android test APK.
6. Review the APK on an actual Android phone before calling it device-tested or release-ready.
7. Do not enable paid builds, paid APIs, paid hosting, public deployment, analytics, subscriptions, ads or other monetization without explicit approval.
8. Never assume GitHub commits sync back to Replit. A Replit refresh would be a separate, deliberate import after review.

## Verification limits

- Automated browser tests are not a physical Android installation or playthrough.
- The unsigned test APK is not a Play Store release.
- No production backend, cloud account sync, multiplayer or online case publishing is implemented.
- Monetization is intentionally deferred until the free core campaign is complete.

See [CASEZERO_ANDROID_WORKFLOW.md](CASEZERO_ANDROID_WORKFLOW.md) for the no-Replit-Agent Android testing workflow, exact playability boundaries and free build route. See [CASEZERO_PROGRESS.md](CASEZERO_PROGRESS.md) for the detailed feature audit, validation history and next-work priorities.
