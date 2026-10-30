'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
require('../game.js');
const E = globalThis.CaseZeroEngine;
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'};
(async () => {
  const server = http.createServer((req,res) => {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\//,'');
    const file = path.resolve(root,relative);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
    fs.readFile(file,(err,data) => {
      if (err) { res.writeHead(404); return res.end('Not found'); }
      res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream'});
      res.end(data);
    });
  });
  await new Promise(resolve => server.listen(4173,'127.0.0.1',resolve));
  const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
  try {
    const page = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
    await page.goto('http://127.0.0.1:4173');
    await page.locator('#caseGrid').waitFor();
    assert.equal(await page.locator('[data-open]:not([disabled])').count(),1,'only the tutorial file should be unlocked initially');
    assert.match(await page.locator('#bulletinText').innerText(),/./,'daily bulletin should render');
    assert.equal(await page.locator('.specialist').count(),3,'HQ specialist desk should show three specialists');
    await page.locator('[data-open="case001"]').click();
    await page.locator('[data-choice="clock_focus"]').click();
    await page.getByText('YOUR MOVE / RESPONSE').waitFor();
    await page.locator('#continueReply').click();
    assert.equal(await page.locator('[data-clue]').count(),5,'tutorial evidence room should show five clues');
    for (const clue of E.CASES[0].clues) await page.locator('[data-clue="'+clue[0]+'"]').click();
    await page.locator('#continueEvidence').click();
    await page.locator('[data-witness="asked_key"]').click();
    await page.locator('#continueReply').click();
    for (const id of E.CASES[0].sequence) await page.locator('[data-time="'+id+'"]').click();
    await page.locator('[data-ending="elias"]').waitFor();
    await page.locator('[data-ending="elias"]').click();
    await page.getByText('TRUTH',{exact:true}).waitFor();
    await page.locator('#finishHome').click();
    assert.equal(await page.locator('[data-open]:not([disabled])').count(),2,'closing case 001 should unlock case 002');
    await page.reload();
    assert.equal(await page.locator('[data-open]:not([disabled])').count(),2,'case unlock should persist after reload');
    await page.locator('[data-open="case002"]').click();
    assert.match(await page.locator('#caseContent').innerText(),/Central Records Annex/);
    assert.match(await page.locator('#caseContent').innerText(),/THE MEMORY/,'later case should reflect earlier choices');
    const columns = await page.locator('.case-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns);
    assert.ok(columns.split(' ').length <= 1,'mobile case cards should use a single column');
    for (const c of E.CASES.slice(1)) {
      await page.locator('[data-open="'+c.id+'"]').click();
      await page.locator('[data-choice="'+c.choices[0][1]+'"]').click();
      await page.locator('#continueReply').click();
      assert.equal(await page.locator('[data-clue]').count(),5,c.id+' should render five evidence records');
      for (const clue of c.clues) await page.locator('[data-clue="'+clue[0]+'"]').click();
      await page.locator('#continueEvidence').click();
      await page.locator('[data-witness="'+c.witnesses[0][0]+'"]').click();
      await page.locator('#continueReply').click();
      for (const id of c.sequence) await page.locator('[data-time="'+id+'"]').click();
      await page.locator('[data-ending="'+c.answer+'"]').waitFor();
      await page.locator('[data-ending="'+c.answer+'"]').click();
      await page.getByText('SUPPORTED',{exact:true}).first().waitFor();
      assert.match(await page.locator('#caseContent').innerText(),/COMPLETE/,c.id+' should recognize full evidence');
      await page.locator('#finishHome').click();
      assert.equal(await page.locator('[data-open]:not([disabled])').count(),E.CASES.indexOf(c)+2,c.id+' should unlock the next file');
      await page.reload();
      assert.equal(await page.locator('[data-open]:not([disabled])').count(),E.CASES.indexOf(c)+2,c.id+' unlock should persist');
    }
    assert.equal(await page.locator('[data-open]:not([disabled])').count(),4,'all four authored cases should be completed and unlocked');
    console.log('PASS: mobile HQ, all four complete case flows, all evidence, witness responses, timelines, supported deductions, full proof, save persistence, sequential unlocks, and memory carry-over');
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err => { console.error(err); process.exitCode=1; });
