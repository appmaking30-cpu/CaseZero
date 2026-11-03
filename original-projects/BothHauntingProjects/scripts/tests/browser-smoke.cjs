const assert = require('node:assert/strict');
const { chromium } = require('/tmp/casezero-browser/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  try {
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await page.getByText('Detective Bureau', { exact: true }).waitFor();
    await page.getByText('The Last Train Home', { exact: true }).first().waitFor();
    const lockedCaseButton = page.getByRole('button', { name: 'Complete Case 001 to unlock' });
    await lockedCaseButton.waitFor();
    assert.equal(await lockedCaseButton.isDisabled(), true, 'Case 002 must remain locked until the tutorial is closed');
    await page.screenshot({ path: '/tmp/casezero-hq-before.png', fullPage: true });

    await page.getByRole('button', { name: 'Open case file' }).click();
    await page.getByText('Case 001 · Briefing').waitFor();
    await page.getByRole('button', { name: 'Begin evidence review' }).click();

    await page.getByText('The ceiling stain', { exact: true }).click();
    await page.getByText(/maintenance ticket at 21:05.*porter addendum at 21:11/).waitFor();

    for (const clue of [
      'The ceiling stain',
      'The chipped cart wheel',
      'The service-key register',
      'The refund receipt',
      'The luggage-office slip',
    ]) {
      await page.getByText(clue, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Question the witnesses' }).click();

    for (const question of [
      'What did you hear near the records room?',
      'Where were you at 21:16?',
      'What did you see after the departure announcement?',
    ]) {
      await page.getByText(question, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Reconstruct the timeline' }).click();

    // Deliberately try a wrong order first to verify the puzzle gives a fair retry.
    for (const event of [
      'Envelope logged in the luggage office',
      'Ada prints a ticket refund',
      'Miles signs out the service key',
      'Jo hears a cart at the records-room door',
    ]) {
      await page.getByText(event, { exact: true }).click();
    }
    await page.getByText(/Not quite\. Recheck the timestamps/).waitFor();
    await page.getByRole('button', { name: 'Reset sequence and retry' }).click();

    for (const event of [
      'Miles signs out the service key',
      'Jo hears a cart at the records-room door',
      'Ada prints a ticket refund',
      'Envelope logged in the luggage office',
    ]) {
      await page.getByText(event, { exact: true }).click();
    }
    await page.getByText('Timeline confirmed. The records now agree.').waitFor();
    await page.getByRole('button', { name: 'Make your deduction' }).click();

    // A wrong suspect must not lock the player out; the evidence supports a retry.
    await page.getByText('Ada Voss', { exact: true }).click();
    await page.getByText('To protect it from the leaking shelf', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/That theory does not fit every record/).waitFor();

    await page.getByText('Miles Renn', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The truth is in the details.', { exact: true }).waitFor();
    await page.getByText('Timeline attempts: 2', { exact: true }).waitFor();
    await page.getByText('Questions left unasked: 3', { exact: true }).waitFor();
    await page.screenshot({ path: '/tmp/casezero-review.png', fullPage: true });

    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByRole('button', { name: 'Review closed file' }).waitFor();
    await page.screenshot({ path: '/tmp/casezero-hq-closed.png', fullPage: true });

    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Review closed file' }).waitFor();

    // Case 002 must use the archived Case 001 memory in its actual dialogue.
    const openCase002Button = page.getByRole('button', { name: 'Open Case 002' });
    await openCase002Button.waitFor();
    await openCase002Button.click();
    await page.getByText('Case 002 · Incoming file').waitFor();
    await page.getByRole('button', { name: 'Begin evidence review' }).click();
    await page.getByText('Case 002 · Evidence').waitFor();

    // Verify Case 002 investigation progress survives a browser reload.
    await page.getByText('The access-panel printout', { exact: true }).click();
    await page.getByText('1 of 4 records logged', { exact: true }).waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByText('Case 002 · Evidence').waitFor();
    await page.getByText('1 of 4 records logged', { exact: true }).waitFor();

    for (const clue of [
      'The damp shelf',
      'The generator log',
      'The linen transfer tag',
    ]) {
      await page.getByText(clue, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Question the witnesses' }).click();

    await page.getByText('What did you hear in the archive wing?', { exact: true }).click();
    await page.getByText('When did you last see the guest ledger?', { exact: true }).click();
    await page.getByText('Was there a leak near the archive shelf?', { exact: true }).click();
    await page.getByText(/Your last file taught the Bureau to check the room itself/).waitFor();
    await page.getByText('Who had access before the power dip?', { exact: true }).click();
    await page.getByText(/You left a question unanswered in The Last Train Home/).waitFor();

    await page.getByRole('button', { name: 'Reconstruct the timeline' }).click();
    for (const event of [
      'June’s master key opens the archive',
      'The archive door closes and locks',
      'The generator voltage dips',
      'The ledger is logged in the dry alcove',
    ]) {
      await page.getByText(event, { exact: true }).click();
    }
    await page.getByText(/Timeline confirmed. The outage happened after the ledger was moved/).waitFor();
    await page.getByRole('button', { name: 'Make your deduction' }).click();
    await page.getByText('June Bell', { exact: true }).click();
    await page.getByText('To protect it from the leaking pipe', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The blackout was a distraction.', { exact: true }).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case002-review.png', fullPage: true });

    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByRole('button', { name: 'Review Case 002' }).waitFor();
    await page.getByText(/CASE002 · The Unlit Room/).waitFor();
    await page.getByText(/Conclusion: June Bell · To protect it from the leaking pipe/).waitFor();

    // The Missing Detective campaign hook appears only after both opening cases close.
    await page.getByText('The Detective Who Disappeared', { exact: true }).waitFor();
    await page.getByText(/same handwritten mark: a small black square/).waitFor();
    await page.getByText(/Campaign arc unlocked · 2\/2 opening cases closed/).waitFor();
    await page.getByRole('button', { name: 'Open Missing Detective investigation' }).click();
    await page.getByText('The Black Square', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Begin evidence review' }).click();
    for (const clue of [
      'The inserted routing slip',
      'The annex printer log',
      'The broken file seal',
      'The after-hours cabinet ledger',
    ]) {
      await page.getByText(clue, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Question the witnesses' }).click();
    await page.getByText('When did you deliver the closed reports?', { exact: true }).click();
    await page.getByText(/Both opening files show why the order of events matters/).waitFor();
    await page.getByText('Did you create the black-square routing slip?', { exact: true }).click();
    await page.getByText('Who entered the records annex before midnight?', { exact: true }).click();
    await page.getByText('Did you use the annex printer?', { exact: true }).click();
    await page.getByText('Why is there no staff signature on the routing slip?', { exact: true }).click();
    await page.getByText('Was terminal RS-04 used during your shift?', { exact: true }).click();
    await page.getByText(/earlier files taught the Bureau not to accept a witness’s explanation/).waitFor();
    await page.getByRole('button', { name: 'Reconstruct the timeline' }).click();
    for (const event of [
      'The replacement seal batch is signed out',
      'The routing slip is printed',
      'The annex cabinet is opened',
      'Dispatch logs the sealed delivery',
    ]) {
      await page.getByText(event, { exact: true }).click();
    }
    await page.getByText(/Timeline confirmed. The altered routing slip predates the cabinet access/).waitFor();
    await page.getByRole('button', { name: 'Make your deduction' }).click();
    await page.getByText('Silas Arden', { exact: true }).click();
    await page.getByText('To control which evidence reaches investigators', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The mark was never routine.', { exact: true }).waitFor();
    await page.getByText(/Silas Arden used the records supervisor terminal/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case003-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByText(/CASE003 · The Black Square/).waitFor();
    await page.getByText(/Conclusion: Silas Arden · To control which evidence reaches investigators/).waitFor();

    await page.screenshot({ path: '/tmp/casezero-missing-detective-unlocked.png', fullPage: true });

    await page.reload({ waitUntil: 'networkidle' });
    await page.getByText('The Detective Who Disappeared', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Review Case 002' }).waitFor();


    // Case 004 follows the completed Black Square investigation.
    await page.getByRole('button', { name: 'Open Case 004' }).click();
    await page.getByText('The Last Signal', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Begin evidence review' }).click();
    for (const clue of [
      'The recorder locker seal',
      'The relay diagnostic printout',
      'The signal lamp log',
      'The courier transfer docket',
    ]) {
      await page.getByText(clue, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Question the witnesses' }).click();
    await page.getByText('Who initiated the relay override?', { exact: true }).click();
    await page.getByText(/After the Black Square file, the Bureau checks the authority/).waitFor();
    await page.getByText('Was a train due during the signal interruption?', { exact: true }).click();
    await page.getByText('Who signed out the duplicate M-2 key?', { exact: true }).click();
    await page.getByText(/The earlier files left questions open/).waitFor();
    await page.getByText('Why was the recorder listed as a relay test unit?', { exact: true }).click();
    await page.getByText('What did you collect at 20:22?', { exact: true }).click();
    await page.getByText('Who authorized the collection?', { exact: true }).click();
    await page.getByRole('button', { name: 'Reconstruct the timeline' }).click();
    for (const event of [
      'The duplicate M-2 key is signed out',
      'Rowan’s recorder locker is sealed',
      'The relay receives a local override',
      'The courier collects the relabelled case',
    ]) {
      await page.getByText(event, { exact: true }).click();
    }
    await page.getByText(/Timeline confirmed. The maintenance override came before the courier transfer/).waitFor();
    await page.getByRole('button', { name: 'Make your deduction' }).click();
    await page.getByText('Bram Holt', { exact: true }).click();
    await page.getByText('To suppress Rowan’s recording of the relay network', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The recording is still out there.', { exact: true }).waitFor();
    await page.getByText(/Bram Holt used the duplicate M-2 maintenance key/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case004-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByText(/CASE004 · The Last Signal/).waitFor();
    await page.getByText(/Conclusion: Bram Holt · To suppress Rowan’s recording of the relay network/).waitFor();


    // Case 005 follows the four-file convergence and tests the next connected investigation.
    await page.getByRole('button', { name: 'Open Case 005' }).click();
    await page.getByText('The Empty Ledger', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Begin evidence review' }).click();
    for (const clue of [
      'The carbon receipt',
      'The receiving ledger',
      'The loading-bay gate sheet',
      'The closing audit correction',
    ]) {
      await page.getByText(clue, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Question the witnesses' }).click();
    for (const question of [
      'Where did you leave the sealed case?',
      'Why was Locker 14 opened?',
      'Who authorized the closing-count correction?',
    ]) {
      await page.getByText(question, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Reconstruct the timeline' }).click();

    // A wrong order can be reset without losing the investigation.
    for (const event of [
      'The closing count is corrected',
      'Locker 14 is opened',
      'The M-2 case is signed in',
      'The courier leaves the loading bay',
    ]) {
      await page.getByText(event, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Reset sequence and retry' }).click();
    for (const event of [
      'The M-2 case is signed in',
      'The courier leaves the loading bay',
      'Locker 14 is opened',
      'The closing count is corrected',
    ]) {
      await page.getByText(event, { exact: true }).click();
    }
    await page.getByText('Timeline confirmed. The courier left before the locker was opened.').waitFor();
    await page.getByRole('button', { name: 'Make your deduction' }).click();
    await page.getByText('Lena Vesper', { exact: true }).click();
    await page.getByText('To sell the recorder', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/That conclusion does not explain the signed carbon/).waitFor();
    await page.getByText('Sera Quill', { exact: true }).click();
    await page.getByText('To conceal the recorder’s destination from the Bureau', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The recorder has a location again.', { exact: true }).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case005-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();

    // Case 006 reconstructs a transcript without inventing the speaker's identity.
    await page.getByRole('button', { name: 'Open recorder review' }).click();
    await page.getByText('The Voice Between Stations', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Begin transcript review' }).click();
    for (const fragment of [
      'Fragment C · Destination',
      'Fragment A · Arrival',
      'Fragment B · Authorization',
    ]) {
      await page.getByText(fragment, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Reconstruct the instruction' }).click();

    // The shuffled fragment order is retryable.
    for (const fragment of [
      'Fragment C · Destination',
      'Fragment A · Arrival',
      'Fragment B · Authorization',
    ]) {
      await page.getByText(fragment, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Reset sequence and retry' }).click();
    for (const fragment of [
      'Fragment A · Arrival',
      'Fragment B · Authorization',
      'Fragment C · Destination',
    ]) {
      await page.getByText(fragment, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Sequence confirmed' }).click();
    await page.getByText('Sera Quill acting alone', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit conclusion' }).click();
    await page.getByText(/The recording proves an active transfer authority/).waitFor();
    await page.getByText('An upstream dispatch authority', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit conclusion' }).click();
    await page.getByText('The voice has no name. The order does.', { exact: true }).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case006-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();


    // The Daily Case Bulletin is a separate short investigation and does not change the campaign archive.
    await page.getByRole('button', { name: 'Open Daily Case Bulletin' }).click();
    await page.getByText(/DAILY CASE BULLETIN · \d{4}-\d{2}-\d{2}/).waitFor();
    const dailyClues = page.getByRole('button', { name: /Evidence clue:/ });
    await dailyClues.first().waitFor();
    assert.equal(await dailyClues.count(), 3, 'the daily case should contain three inspectable records');
    for (let i = 0; i < 3; i += 1) {
      await dailyClues.nth(i).click();
    }
    await page.getByText('3 of 3 clues logged', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Make your deduction' }).click();
    await page.getByText('WHO IS RESPONSIBLE?', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Review evidence again' }).click();
    await page.getByRole('button', { name: 'Back to Detective Bureau' }).click();


    // The Bureau roster unlocks from campaign milestones and saves specialist assignments.
    await page.getByRole('button', { name: 'Open Bureau Team' }).click();
    await page.getByText('Specialist Team', { exact: true }).waitFor();
    await page.getByRole('button', { name: /Inez Shaw/ }).click();
    await page.getByRole('button', { name: 'Next incoming case' }).click();
    await page.getByRole('button', { name: 'Assign specialist' }).click();
    await page.getByText(/Inez Shaw assigned to Next incoming case/).waitFor();
    await page.getByText(/Currently assigned: Next incoming case/).waitFor();
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();

    // Seed the archive at the Case 040 campaign boundary so the new Case 041
    // screen can be exercised without replaying the entire 40-case campaign.
    await page.evaluate(() => {
      localStorage.setItem('casezero.investigation.archive.v1', JSON.stringify({
        version: 1,
        completedCases: [{
          caseId: 'case040',
          caseTitle: 'The Shift-Change Gap',
          closedAt: '2026-11-02T00:00:00.000Z',
          selectedSuspectId: 'unknown',
          selectedMotiveId: 'shift',
          inspectedClues: ['Dispatch shift roster', 'DS-1 handover carbon'],
          askedQuestions: ['Mara Venn: Does the incomplete signature name the incoming operator?'],
          unansweredQuestions: [],
        }],
      }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    const openCase041 = page.getByRole('button', { name: 'Open Case 041' });
    await openCase041.waitFor();
    await openCase041.click();
    await page.getByText('The Missing Signature', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Review the duplicate packet' }).click();

    for (const clue of [
      'Dispatch carbon copy',
      'Records Annex duplicate manifest',
      'Control-office packet intake',
      'Annex container index',
    ]) {
      await page.getByText(clue, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Interview the records and archive staff' }).click();

    for (const question of [
      'Does the blank dispatch copy prove the signature was erased?',
      'What does the two-copy manifest establish?',
      'Can the archive index tell us what is written on the duplicate?',
    ]) {
      await page.getByText(question, { exact: true }).click();
    }
    await page.getByRole('button', { name: "Reconstruct the packet's records trail" }).click();

    for (const event of [
      'Dispatch carbon records desk transfer',
      'Duplicate routed to Records Annex',
      'Control office receives sealed packet',
      'Duplicate assigned to container RA-17',
    ]) {
      await page.getByText(event, { exact: true }).click();
    }
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();
    await page.getByText('Unresolved records custodian', { exact: true }).click();
    await page.getByText('A second handover copy exists in Records Annex container RA-17, but its contents remain unverified', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The duplicate is located; its contents remain unknown.', { exact: true }).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case041-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();

    // Continue the campaign into Case 042 after Case 041 has been archived.
    await page.evaluate(() => {
      const raw = localStorage.getItem('casezero.investigation.archive.v1');
      const archive = raw ? JSON.parse(raw) : { version: 1, completedCases: [] };
      archive.completedCases = archive.completedCases.filter((record) => record.caseId !== 'case041');
      archive.completedCases.push({
        caseId: 'case041', caseTitle: 'The Missing Signature',
        closedAt: '2026-11-02T00:00:00.000Z', selectedSuspectId: 'unknown',
        selectedMotiveId: 'archive', inspectedClues: ['Dispatch carbon copy'],
        askedQuestions: [], unansweredQuestions: [],
      });
      localStorage.setItem('casezero.investigation.archive.v1', JSON.stringify(archive));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open Case 042' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 042' }).click();
    await page.getByText('The Name on the Carbon', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the sealed archive' }).click();
    for (const clue of [
      'Controlled retrieval authorization',
      'RA-17 seal inspection log',
      'Dual-custody opening record',
      'Carbon comparison sheet',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the retrieval and audit staff' }).click();
    for (const question of [
      'Does the name R. Vale prove Rowan Vale signed?',
      'What would authenticate the handwriting?',
      'Does the opening record identify the original writer?',
    ]) await page.getByText(question, { exact: true }).click();
    await page.getByRole('button', { name: 'Reconstruct the retrieval sequence' }).click();
    for (const event of [
      'Retrieval authorized for two custodians',
      'RA-17 seal checked and recorded intact',
      'Container opened under dual custody',
      'Duplicate compared with dispatch carbon',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();
    await page.getByText('Unverified acknowledgement writer', { exact: true }).click();
    await page.getByText('The duplicate records “R. Vale” at 09:03, but the writer’s identity remains unverified', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The duplicate changes the investigation: a recipient name was entered on one copy.', { exact: false }).waitFor({ timeout: 10000 }).catch(() => undefined);
    await page.screenshot({ path: '/tmp/casezero-case042-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();

    // Continue from the archived Case 042 result into the handwriting examination.
    await page.evaluate(() => {
      const raw = localStorage.getItem('casezero.investigation.archive.v1');
      const archive = raw ? JSON.parse(raw) : { version: 1, completedCases: [] };
      archive.completedCases = archive.completedCases.filter((record) => record.caseId !== 'case042');
      archive.completedCases.push({
        caseId: 'case042', caseTitle: 'The Name on the Carbon',
        closedAt: '2026-11-02T00:00:00.000Z', selectedSuspectId: 'unknown',
        selectedMotiveId: 'identity', inspectedClues: ['Carbon comparison sheet'],
        askedQuestions: [], unansweredQuestions: [],
      });
      localStorage.setItem('casezero.investigation.archive.v1', JSON.stringify(archive));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open Case 043' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 043' }).click();
    await page.getByText('The Specimen Register', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the specimen file' }).click();
    for (const clue of [
      'Sealed specimen register',
      'Blind handwriting comparison',
      'Dispatch switchboard call record',
      'Document handling and custody note',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the examiner and dispatch staff' }).click();
    for (const question of [
      'Does your report support Rowan Vale as the writer?',
      'What does Rowan’s 09:01–09:06 call record prove?',
      'What evidence would identify the actual writer?',
    ]) await page.getByText(question, { exact: true }).click();
    await page.getByRole('button', { name: 'Reconstruct the specimen and entry timeline' }).click();
    for (const event of [
      'Verified specimen register sealed',
      'Rowan’s extension connects to control office',
      '“R. Vale” appears on the duplicate',
      'Blind comparison report issued',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();
    await page.getByText('Unidentified writer', { exact: true }).click();
    await page.getByText('The handwriting evidence weighs against Rowan, but does not identify another writer', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('Rowan should not be named as the writer on the current evidence.', { exact: false }).waitFor({ timeout: 10000 });
    await page.screenshot({ path: '/tmp/casezero-case043-review.png', fullPage: true });

    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByRole('button', { name: 'Open Case 044' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 044' }).click();
    await page.getByText('The Badge Without a Name', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the access file' }).click();
    for (const clue of [
      'Dispatch corridor reader extract',
      'Shared badge pool register',
      'Corridor access boundary plan',
      'Reader maintenance and audit copy',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the access and dispatch staff' }).click();
    for (const question of [
      'What does the D-17 reader event establish?',
      'Who was assigned badge D-17?',
      'What would connect the badge to a person?',
    ]) await page.getByText(question, { exact: true }).click();
    await page.getByRole('button', { name: 'Reconstruct the access window timeline' }).click();
    for (const event of [
      'D-17 assigned to shared relief pool',
      'D-17 enters dispatch corridor',
      'D-17 leaves dispatch corridor',
      'Signed controller copy reconciled',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();
    await page.getByText('Unidentified badge carrier', { exact: true }).click();
    await page.getByText('The log verifies a shared badge entered the corridor, not who carried it or reached the desk', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('Do not identify the badge carrier or accuse a named employee.', { exact: false }).waitFor({ timeout: 10000 });
    await page.screenshot({ path: '/tmp/casezero-case044-review.png', fullPage: true });

    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByRole('button', { name: 'Open Case 045' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 045' }).click();
    await page.getByText('The Handover Copy', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the handover file' }).click();
    for (const clue of [
      'Original D-17 handover packet',
      'Independent shift carbon copy',
      'Two-staff handover observation',
      'Return and exception register',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the outgoing officer and handover witnesses' }).click();
    for (const question of [
      'Who received D-17 at 08:54?',
      'What did you personally observe?',
      'Does the return exception identify the carrier?',
    ]) await page.getByText(question, { exact: true }).click();
    await page.getByRole('button', { name: 'Reconstruct the shift handover timeline' }).click();
    for (const event of [
      'Outgoing packet prepared and sealed',
      'D-17 placed in RELIEF-2 tray',
      'D-17 passes corridor reader',
      'D-17 listed as outstanding',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();
    await page.getByText('Unidentified RELIEF-2 recipient', { exact: true }).click();
    await page.getByText('The original packet narrows custody to the RELIEF-2 role, but does not identify its recipient', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('Do not accuse Elias or Mina', { exact: false }).waitFor({ timeout: 10000 });
    await page.screenshot({ path: '/tmp/casezero-case045-review.png', fullPage: true });

    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByRole('button', { name: 'Open Case 046' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 046' }).click();
    await page.getByText('The Relief Roster', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the roster file' }).click();
    for (const clue of [
      'Signed incoming relief roster',
      'Independent dispatch desk board',
      'Shared R2 console session audit',
      'Corridor observer timing note',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the roster and dispatch witnesses' }).click();
    for (const question of [
      'Who was assigned to RELIEF-2 at 08:54?',
      'Who was assigned to DS-2 from 09:00 to 09:15?',
      'What does the shared R2 session prove?',
    ]) await page.getByText(question, { exact: true }).click();
    await page.getByRole('button', { name: 'Reconstruct the roster-to-access timeline' }).click();
    for (const event of [
      'RELIEF-2 roster signed',
      'DS-2 duty allocation posted',
      'D-17 passes corridor reader',
      'Shared R2 console session begins',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();
    await page.getByText('Leena Voss', { exact: true }).click();
    await page.getByText('The roster names Leena and Omar, and the desk board assigns Leena to DS-2, but neither record proves who collected D-17 or used it', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/scheduled duties, but neither proves who collected or carried D-17/).waitFor();
    await page.getByText('Unidentified RELIEF-2 member', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('Do not accuse Leena Voss or Omar Pell', { exact: false }).waitFor({ timeout: 10000 });
    await page.screenshot({ path: '/tmp/casezero-case046-review.png', fullPage: true });

    // Case 047 checks the new pickup-slip investigation end to end, including save recovery and a fair deduction retry.
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByRole('button', { name: 'Open Case 047' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 047' }).click();
    await page.getByText('The Pickup Slip', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the pickup record file' }).click();

    await page.getByText('D-17 pickup carbon', { exact: true }).click();
    await page.getByText(/Initials alone are not unique/).waitFor();
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByText('CASE 047 · EVIDENCE REVIEW').waitFor();
    await page.getByText('1/4 records logged', { exact: true }).waitFor();

    for (const clue of [
      'D-17 pickup carbon',
      'Counter issue register',
      'Carbon correction note',
      'Return-envelope seal log',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the pickup record and dispatch witnesses' }).click();

    for (const question of [
      'Who wrote “M.P.” on the carbon slip?',
      'Does the bound register name the recipient?',
      'Do the initials uniquely identify a staff member?',
      'Who authorized the destination correction?',
      'What does the return seal establish?',
      'Can the seal log authenticate the pickup initials?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the pickup record-to-access timeline' }).click();
    for (const event of [
      'Relief desk issue entered',
      'Pickup carbon marked',
      'Destination field corrected',
      'Return envelope sealed',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Mara Pell', { exact: true }).click();
    await page.getByText(/The slip records M\.P\., but the initials are not authenticated/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/no verified specimen or witness identifies the writer/).waitFor();

    await page.getByText('Unidentified relief-desk recipient', { exact: true }).click();
    await page.getByText(/The slip records M\.P\., but the initials are not authenticated/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The carbon slip records M.P., but the author and physical collector remain unidentified.', { exact: true }).waitFor();
    await page.getByText(/Do not accuse Mara Pell or Omar Pell/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case047-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();
    await page.getByRole('button', { name: 'Review closed file' }).waitFor();

    // Case 048 follows the recovered correction request through intake and retention.
    await page.getByRole('button', { name: 'Open Case 048' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 048' }).click();
    await page.getByText('The Original Request', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the request packet file' }).click();

    for (const clue of [
      'Recovered correction request',
      'Records intake docket',
      'Dispatch terminal activity summary',
      'Records retention index',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the records intake and dispatch witnesses' }).click();

    for (const question of [
      'What does the intake docket authenticate?',
      'Was the original requester line completed?',
      'Do the initials T.R. identify you as the author?',
      'Who could use the DC-1 role credential?',
      'What does the 09:18 retention scan prove?',
      'Can the index confirm every original attachment survived?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the request-to-archive timeline' }).click();
    for (const event of [
      'Shared DC-1 document session',
      'Correction request completed',
      'Request received and routed',
      'Request packet archived',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Tamsin Reeve', { exact: true }).click();
    await page.getByText(/The request and docket confirm a role-level correction request/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/no verified specimen or witness identifies the author/).waitFor();

    await page.getByText('Unidentified dispatch coordination requester', { exact: true }).click();
    await page.getByText(/The request and docket confirm a role-level correction request/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The recovered form confirms a role-level request, but its individual author remains unidentified.', { exact: true }).waitFor();
    await page.getByText(/Do not accuse Tamsin Reeve or Ilya Norr/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case048-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();

    // Case 049 follows the authorization leaf's missing-page custody trail.
    await page.getByRole('button', { name: 'Open Case 049' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 049' }).click();
    await page.getByText('The Missing Authorization Page', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the document-control file' }).click();

    for (const clue of [
      'Original packet sleeve',
      'Batch scan manifest',
      'Document transfer register',
      'Packet discrepancy note',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the document-control witnesses' }).click();

    for (const question of [
      'What does the sleeve checklist establish?',
      'Can the 09:24 note identify when the leaf went missing?',
      'What was included in the 09:18 scan batch?',
      'Does the scanner field identify the operator?',
      'Who signed the 09:20 packet transfer?',
      'Was the authorization leaf checked before dispatch?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the packet custody timeline' }).click();
    for (const event of [
      'Request packet scan batch',
      'Departmental packet transfer',
      'Sleeve received with broken seal',
      'Missing-leaf discrepancy recorded',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Jonas Pell', { exact: true }).click();
    await page.getByText(/The records establish a missing page by 09:18/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/no individual handover or contents check identifies who last handled it/).waitFor();

    await page.getByText('Unidentified packet handler', { exact: true }).click();
    await page.getByText(/The records establish a missing page by 09:18/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The packet checklist expected an authorization leaf, but the surviving custody trail cannot identify who last handled it.', { exact: true }).waitFor();
    await page.getByText(/Do not accuse Jonas Pell or Asha Neri/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case049-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();


    // Case 050 follows the missing authorization leaf into the source-tray records.
    await page.getByRole('button', { name: 'Open Case 050' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 050' }).click();
    await page.getByText('The Empty Source Tray', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the source-tray file' }).click();

    for (const clue of [
      'Source-tray ledger extract',
      'Staging transfer slip',
      'Shelf-position audit',
      'Source-tray search report',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the source-tray witnesses' }).click();

    for (const question of [
      'What does the 09:04 ledger entry prove?',
      'Can the department stamp identify the person who entered it?',
      'Who signed the 09:11 tray transfer?',
      'Was the tray contents checked during transfer?',
      'What did the 09:16 shelf audit actually inspect?',
      'Does the 09:26 search identify the last person to see the leaf?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the source-tray timeline' }).click();
    for (const event of [
      'Authorization leaf entered in tray ledger',
      'ST-4 moved to scan staging',
      'Assigned shelf position found empty',
      'Source-tray search reports no recovery',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Niko Daran', { exact: true }).click();
    await page.getByText(/The ledger records an allocation, but no independent contents check or signed handover identifies the last handler/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/no individual handover or independent contents check identifies the last handler/).waitFor();

    await page.getByText('Unidentified tray handler', { exact: true }).click();
    await page.getByText(/The ledger records an allocation, but no independent contents check or signed handover identifies the last handler/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The source-tray ledger records an allocation, but the surviving custody trail cannot establish physical possession or identify who last handled the leaf.', { exact: true }).waitFor();
    await page.getByText(/Do not accuse Niko Daran or Rhea Venn/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case050-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();


    // Case 051 checks whether the missing authorization leaf ever received valid approval.
    await page.getByRole('button', { name: 'Open Case 051' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 051' }).click();
    await page.getByText('The Blank Approval Line', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the approval file' }).click();

    for (const clue of [
      'Authorization signatory roster',
      'Approval workflow register',
      'Countersignature control sheet',
      'Workflow exception notice',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the authorization witnesses' }).click();

    for (const question of [
      'What does the signatory roster establish?',
      'Does being on the roster prove someone approved D-17?',
      'What does the 09:02 workflow entry record?',
      'Can the shared AC-2 role identify the person who opened it?',
      'What is missing from the countersignature sheet?',
      'What does the 09:14 exception notice prove?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the approval workflow timeline' }).click();
    for (const event of [
      'Signatory roster takes effect',
      'D-17 approval request opened',
      'Countersignature check remains blank',
      'Incomplete workflow exception issued',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Elian Voss', { exact: true }).click();
    await page.getByText(/A permitted signatory and an opened request are not proof of approval; both required signatures are absent/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/no individual handover or independent witness signature identifies the approver/).waitFor();

    await page.getByText('No authenticated approver', { exact: true }).click();
    await page.getByText(/A permitted signatory and an opened request are not proof of approval; both required signatures are absent/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The workflow records a request, but no authenticated primary approval or independent witness countersignature survives.', { exact: true }).waitFor();
    await page.getByText(/Do not accuse Elian Voss or Mara Quill/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case051-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();


    // Case 052 verifies that the changed destination was executed despite the missing approval.
    await page.getByRole('button', { name: 'Open Case 052' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 052' }).click();
    await page.getByText('The Dispatch Copy', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the dispatch file' }).click();

    for (const clue of [
      'Dispatch copy carbon',
      'Dispatch release ledger',
      'Destination receipt',
      'Route reconciliation variance',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the dispatch witnesses' }).click();

    for (const question of [
      'What does the 09:22 dispatch carbon establish?',
      'Can the copy identify who prepared the changed route?',
      'What does the 09:31 release entry prove?',
      'Does DS-3 identify a single employee?',
      'What does the D-4 receiving stamp authenticate?',
      'Why did reconciliation flag D-17?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the dispatch execution timeline' }).click();
    for (const event of [
      'Changed dispatch copy generated',
      'D-17 released under DS-3 role',
      'D-4 receipt stamped',
      'Route variance recorded',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Talia Wren', { exact: true }).click();
    await page.getByText(/The D-4 route was executed, but the approval chain remained incomplete/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/shared DS-3 role does not identify an individual operator/).waitFor();

    await page.getByText('Unapproved destination change executed', { exact: true }).click();
    await page.getByText(/The D-4 route was executed, but the approval chain remained incomplete/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText('The revised D-4 dispatch copy was generated, released under the shared DS-3 role and received at D-4.', { exact: false }).waitFor();
    await page.getByText(/Do not accuse Talia Wren or Bram Ives/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case052-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();


    // Case 053 audits the repeated seal identifier without assuming two physical seals.
    await page.getByRole('button', { name: 'Open Case 053' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 053' }).click();
    await page.getByText('The Duplicate Dispatch Seal', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the seal audit file' }).click();

    for (const clue of [
      'Seal master register',
      'Issue counterfoil',
      'D-17 packet seal entry',
      'F-09 packet seal entry',
      'Independent seal variance review',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the seal control witnesses' }).click();

    for (const question of [
      'How many DS-44-19 units were officially issued?',
      'Does the register authorize a second DS-44-19 seal?',
      'What is unusual about the two packet entries?',
      'Can the ledger identify who entered the F-09 seal number?',
      'What did the independent review actually confirm?',
      'What evidence would be needed to identify the physical seal or its handler?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the seal record timeline' }).click();
    for (const event of [
      'Single seal entered in master register',
      'Seal issued to dispatch department',
      'D-17 packet lists DS-44-19',
      'F-09 packet repeats DS-44-19',
      'Independent review flags serial collision',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Yara Noll', { exact: true }).click();
    await page.getByText(/The same seal identifier was recorded on two packets/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/The records establish a repeated seal identifier, not a second physical seal/).waitFor();

    await page.getByText('Duplicate seal identifier in dispatch records', { exact: true }).click();
    await page.getByText(/The same seal identifier was recorded on two packets/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/DS-44-19 appears in the D-17 and F-09 packet records/).waitFor();
    await page.getByText(/Do not label a physical seal counterfeit or accuse Yara Noll or Dev Arlen/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case053-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();


    // Case 054 traces Rowan Vale's recorder-transfer packet without treating a packet receipt as proof of device custody.
    await page.getByRole('button', { name: 'Open Case 054' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 054' }).click();
    await page.getByText('The Recorder Transfer', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the recorder transfer file' }).click();

    for (const clue of [
      'Independent archive index',
      'Transfer retrieval request',
      'Archive receipt extract',
      'Internal routing slip',
      'Custody exception note',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the archive custody witnesses' }).click();

    for (const question of [
      'What does the IA-6 catalogue entry establish?',
      'Was a packet formally received by the archive?',
      'Where was the IA-6 packet routed?',
      'Can the AR-2 or archive unit account identify an individual?',
      'What is missing from the transfer documentation?',
      'Can this file establish the recorder’s last physical custodian?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the recorder transfer timeline' }).click();
    for (const event of [
      'IA-6 packet appears in archive index',
      'Shared AR-2 account requests retrieval',
      'Sealed IA-6 packet accepted at intake',
      'Packet routed to restricted shelf R-3',
      'Custody reviewer records item-level gap',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Sela Marr', { exact: true }).click();
    await page.getByText(/The archive received a transfer packet, but the recorder’s physical custody remains unverified/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/The archive records establish a packet route, not the recorder’s physical custody/).waitFor();

    await page.getByText('Unverified recorder custody', { exact: true }).click();
    await page.getByText(/The archive received a transfer packet, but the recorder’s physical custody remains unverified/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/The independent archive indexed and received a sealed packet under IA-6/).waitFor();
    await page.getByText(/Do not accuse Sela Marr or Corin Vale/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case054-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();

    
    // Case 055 verifies Rowan's last independently documented assignment without equating assignment with possession.
    await page.getByRole('button', { name: 'Open Case 055' }).waitFor();
    await page.getByRole('button', { name: 'Open Case 055' }).click();
    await page.getByText('The Last Verified Assignment', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Open the last verified assignment file' }).click();

    for (const clue of [
      'Original item-level transfer schedule',
      'Duty roster extract',
      'Route acknowledgment copy',
      'Independent task closeout',
      'Equipment reconciliation variance',
    ]) await page.getByText(clue, { exact: true }).click();
    await page.getByRole('button', { name: 'Interview the assignment record witnesses' }).click();

    for (const question of [
      'What does the original RS-14 schedule establish?',
      'Was the schedule reconstructed after Rowan disappeared?',
      'Does the route acknowledgment prove Rowan arrived?',
      'What does the 19:42 closeout mean?',
      'Can the equipment record identify the recorder?',
      'Can the last assignment identify the recorder’s last handler?',
    ]) await page.getByText(question, { exact: true }).click();

    await page.getByRole('button', { name: 'Reconstruct the last verified assignment timeline' }).click();
    for (const event of [
      'Original RS-14 assignment is retained',
      'Rowan’s duty window begins',
      'North Annex desk acknowledges RS-14',
      'Independent control copy closes survey window',
      'Equipment audit records unreconciled serial',
    ]) await page.getByText(event, { exact: true }).click();
    await page.getByRole('button', { name: 'Timeline confirmed · Make deduction' }).click();

    await page.getByText('Elara Finch', { exact: true }).click();
    await page.getByText(/RS-14 at North Annex was Rowan’s last independently verified assignment/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/The records establish Rowan’s assignment, not the recorder’s physical custody/).waitFor();

    await page.getByText('Last verified assignment · RS-14', { exact: true }).click();
    await page.getByText(/RS-14 at North Annex was Rowan’s last independently verified assignment/).click();
    await page.getByRole('button', { name: 'Submit evidence-based conclusion' }).click();
    await page.getByText(/The strongest independent records place Rowan Vale’s last verified assignment at North Annex/).waitFor();
    await page.getByText(/Do not convert a roster, desk acknowledgment or task closeout into proof/).waitFor();
    await page.screenshot({ path: '/tmp/casezero-case055-review.png', fullPage: true });
    await page.getByRole('button', { name: 'Return to Detective Bureau' }).click();

    assert.deepEqual(pageErrors, [], 'the mobile browser should not report runtime errors');
    console.log('PASS: mobile Case 001–006 campaign investigations, retries, evidence memory, timelines, deductions, daily bulletin and Bureau assignment');
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
