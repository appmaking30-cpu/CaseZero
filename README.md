# CaseZero

CaseZero is a mobile-first, memory-driven detective story. This rebuild branch is separate from the original project and its backup.

## Included in this build
- Four connected authored cases: The Last Train Home, The Missing Detective, The Black Ledger, and The Silent Hour
- Sequential case unlocks, replayable files, and per-case progress
- Five inspectable records per case, witness questioning, timeline reconstruction, and evidence-based suspect review
- Persistent THE MEMORY journal; clues, choices, final theories, and questions left unasked are retained across replays
- Bureau specialist desk, fictional daily city bulletin, and separate Truth / Proof / Outcome case reviews
- Local save migration from the earlier CaseZero prototype
- Save export/import, text-size controls, reduced-motion setting, keyboard focus states, and responsive mobile layout
- PWA manifest and versioned offline shell cache

## Run and install
Serve this folder over HTTPS (GitHub Pages is supported once repository Pages settings are enabled). On Android, open the hosted site in Chrome and use the browser install/add-to-home-screen option if offered.

## Save behaviour
Progress is stored locally in this browser. Export a save file before changing browsers or clearing site data. Import it on the other device to continue. This build does not claim cloud sync.

## Testing
The repository workflow runs a JavaScript syntax check before deployment. Pure game rules are exposed as CaseZeroEngine for automated tests. Browser/device QA still requires a live Pages deployment.

## Scope
This is a four-case narrative prototype, not a commercial release. It does not include live accounts, server-side sync, payment processing, or a native Android package.
