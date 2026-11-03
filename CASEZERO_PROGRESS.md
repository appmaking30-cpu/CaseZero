# CaseZero development checkpoint — 3 November 2026

## Preservation
- Canonical project: original Expo / React Native app under `original-projects/BothHauntingProjects/artifacts/casezero/`.
- Original Replit ZIP and extracted source snapshot remain on their preservation branches.
- Active branch: `casezero-development`.
- Do not develop on `main`, `casezero-original-work`, or `replit-original-backup-2026-10-31`.
- GitHub changes do not sync to the Replit workspace automatically.

## Case 047 — The Pickup Slip
Added to the active branch:
- `artifacts/casezero/game/case047Game.ts`: four evidence records, three witnesses/six questions, four-event chronology, evidence-limited deduction and archive carryover.
- `artifacts/casezero/components/Case047Screen.tsx`: React Native case flow, AsyncStorage progress, retryable timeline/deduction, review and Bureau specialist insight.
- `scripts/tests/case047.test.ts`: structure, chronology, conservative attribution and carryover tests.
- Bureau routing in `artifacts/casezero/app/(tabs)/index.tsx`: Case 047 unlocks after Case 046 and awards specialist experience on closure.

Fair conclusion: the counter register records a relief-desk issue; the carbon bears “M.P.”; the destination was later corrected; a return envelope was sealed later. The initials are not authenticated, so the collector remains unidentified. Do not accuse a named person.

## Validation status
**Pending — not release-ready.** The GitHub connector confirms the commits exist, but no successful TypeScript check, unit-test run, Expo export, dedicated mobile browser walkthrough or physical Android-device test has been confirmed for Case 047. Do not describe it as passed or fully playable until those checks are run.

## Next steps
1. Run the existing workspace typecheck and full test suite; fix all failures before adding another case.
2. Add a dedicated mobile browser walkthrough for Case 047 and capture a screenshot.
3. Verify the unlock, resume/save, retry paths, archive carryover and Bureau XP in the app.
4. Continue targeted walkthrough coverage for Cases 007–040; they currently have unit/type/export coverage but not individual browser walkthrough coverage.
5. Resume the Missing Detective endgame before extending the campaign indefinitely.
6. Keep paid builds, paid hosting, paid APIs, analytics, publishing and monetization off unless explicitly approved.
