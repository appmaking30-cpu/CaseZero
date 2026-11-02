import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  getMissingDetectiveArcStatus,
  getMissingDetectiveConvergence,
} from '../../artifacts/casezero/game/missingDetectiveArc';
import {
  archiveCompletedCase,
  EMPTY_INVESTIGATION_ARCHIVE,
  type InvestigationArchive,
} from '../../artifacts/casezero/game/investigationArchive';

function archiveCases(caseIds: string[]): InvestigationArchive {
  return caseIds.reduce((archive, caseId) => archiveCompletedCase(archive, {
    caseId,
    caseTitle: caseId,
    closedAt: '2026-11-02T00:00:00.000Z',
    selectedSuspectId: 'unknown',
    selectedMotiveId: 'evidence',
    inspectedClues: ['record'],
    askedQuestions: [],
    unansweredQuestions: [],
  }), EMPTY_INVESTIGATION_ARCHIVE);
}

test('Missing Detective dossier stays locked until both opening cases are closed', () => {
  assert.equal(getMissingDetectiveArcStatus(EMPTY_INVESTIGATION_ARCHIVE).unlocked, false);
  assert.deepEqual(getMissingDetectiveArcStatus(archiveCases(['case001'])).missingCaseIds, ['case002']);
  const status = getMissingDetectiveArcStatus(archiveCases(['case001', 'case002']));
  assert.equal(status.unlocked, true);
  assert.equal(status.completedCaseCount, 2);
});

test('convergence review requires all four opening campaign cases', () => {
  const partial = getMissingDetectiveConvergence(archiveCases(['case001', 'case002', 'case003']));
  assert.equal(partial.unlocked, false);
  assert.deepEqual(partial.missingCaseIds, ['case004']);
  assert.deepEqual(partial.evidenceLinks, []);

  const complete = getMissingDetectiveConvergence(archiveCases(['case001', 'case002', 'case003', 'case004']));
  assert.equal(complete.unlocked, true);
  assert.equal(complete.reportTitle, 'The Mark Was a Route');
  assert.equal(complete.evidenceLinks.length, 3);
});

test('convergence report does not claim Rowan or the recorder has been located', () => {
  const report = getMissingDetectiveConvergence(archiveCases(['case001', 'case002', 'case003', 'case004']));
  assert.match(report.reportSummary, /Rowan's recorder is still missing/i);
  assert.match(report.reportSummary, /transfer can now be traced/i);
  assert.doesNotMatch(report.reportSummary, /Rowan has been found/i);
});
