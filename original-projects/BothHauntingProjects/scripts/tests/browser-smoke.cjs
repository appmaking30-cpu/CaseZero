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
    await page.screenshot({ path: '/tmp/casezero-hq-before.png', fullPage: true });

    await page.getByRole('button', { name: 'Open case file' }).click();
    await page.getByText('Case 001 · Briefing').waitFor();
    await page.getByRole('button', { name: 'Begin evidence review' }).click();

    await page.getByText('The ceiling stain', { exact: true }).click();
    await page.getByText(/maintenance ticket at 21:05.*porter addendum at 21:11.*M\\.R\\./).waitFor();

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

    assert.deepEqual(pageErrors, [], 'the mobile browser should not report runtime errors');
    console.log('PASS: mobile Case 001 briefing, five clues, witness questions, wrong-order retry, correct timeline, deduction retry, truth/proof/outcome review, unanswered-question memory, and persisted completion');
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
