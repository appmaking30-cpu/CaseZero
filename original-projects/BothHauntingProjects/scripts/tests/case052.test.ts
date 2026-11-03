import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_052_GAME, getCase052Carryover, isCase052DeductionCorrect, isCase052TimelineCorrect } from '../../artifacts/casezero/game/case052Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 052 has four unique dispatch records and three witnesses with two questions each', () => {
  assert.equal(CASE_052_GAME.clues.length, 4);
  assert.equal(new Set(CASE_052_GAME.clues.map((clue) => clue.id)).size, 4);
  assert.equal(CASE_052_GAME.witnesses.length, 3);
  assert.ok(CASE_052_GAME.witnesses.every((witness) => witness.questions.length === 2));
});

test('Case 052 orders copy generation, release, receipt and reconciliation', () => {
  assert.equal(isCase052TimelineCorrect(['copy', 'release', 'receipt', 'variance']), true);
  assert.equal(isCase052TimelineCorrect(['release', 'copy', 'receipt', 'variance']), false);
  assert.equal(isCase052TimelineCorrect(['copy', 'receipt', 'release', 'variance']), false);
});

test('Case 052 distinguishes execution from valid authorization and individual identity', () => {
  const copy = CASE_052_GAME.clues.find((clue) => clue.id === 'copy')!;
  const release = CASE_052_GAME.clues.find((clue) => clue.id === 'release')!;
  const receipt = CASE_052_GAME.clues.find((clue) => clue.id === 'receipt')!;
  assert.match(copy.detail, /does not establish approval/);
  assert.match(release.detail, /No individual dispatcher is named/);
  assert.match(receipt.detail, /confirms that the packet reached D-4/);
  assert.equal(isCase052DeductionCorrect('unapproved', 'execution'), true);
  assert.equal(isCase052DeductionCorrect('talia', 'execution'), false);
  assert.equal(isCase052DeductionCorrect('bram', 'execution'), false);
  assert.equal(isCase052DeductionCorrect('unapproved', 'talia'), false);
});

test('Case 052 carries the prior authorization investigation into dispatch execution', () => {
  let archive = EMPTY_INVESTIGATION_ARCHIVE;
  for (const [caseId, caseTitle] of [
    ['case051', 'The Blank Approval Line'],
    ['case050', 'The Empty Source Tray'],
    ['case049', 'The Missing Authorization Page'],
    ['case048', 'The Original Request']
  ]) {
    archive = archiveCompletedCase(archive, {
      caseId, caseTitle, closedAt: '2026-11-03T00:00:00.000Z',
      selectedSuspectId: 'unknown', selectedMotiveId: 'limits',
      inspectedClues: ['one', 'two'], askedQuestions: ['audit:one'], unansweredQuestions: []
    });
  }
  const memory = getCase052Carryover(archive);
  assert.equal(memory.priorFiles.length, 4);
  assert.equal(memory.clueCount, 8);
  assert.equal(memory.approvalFiles, 4);
});
