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

    assert.deepEqual(pageErrors, [], 'the mobile browser should not report runtime errors');
    console.log('PASS: mobile Case 001–006 campaign investigations, retries, evidence memory, timelines, deductions, daily bulletin and Bureau assignment');
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
