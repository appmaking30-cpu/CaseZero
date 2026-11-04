import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_066_GAME, getCase066Carryover, isCase066DeductionCorrect, isCase066TimelineCorrect } from '../../artifacts/casezero/game/case066Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 066 has five distinct records and three two-question witnesses',()=>{
 assert.equal(CASE_066_GAME.clues.length,5);
 assert.equal(new Set(CASE_066_GAME.clues.map(x=>x.id)).size,5);
 assert.equal(CASE_066_GAME.witnesses.length,3);
 assert.ok(CASE_066_GAME.witnesses.every(w=>w.questions.length===2));
});
test('Case 066 chronology reconciles identity, custody, statement and independent status',()=>{
 assert.equal(CASE_066_GAME.timelineEvents.length,6);
 assert.equal(isCase066TimelineCorrect(CASE_066_GAME.correctOrder),true);
 assert.equal(isCase066TimelineCorrect([...CASE_066_GAME.correctOrder].reverse()),false);
});
test('Case 066 deduction publishes only the independently corroborated bounded status',()=>{
 assert.equal(isCase066DeductionCorrect('status','bounded'),true);
 assert.equal(isCase066DeductionCorrect('abduction','bounded'),false);
 assert.equal(isCase066DeductionCorrect('status','location'),false);
 assert.equal(isCase066DeductionCorrect('status','certainty'),false);
});
test('Case 066 carries Cases 063–065 forward into the final archive',()=>{
 let archive=EMPTY_INVESTIGATION_ARCHIVE;
 for(const n of [63,64,65]) archive=archiveCompletedCase(archive,{caseId:'case0'+n,caseTitle:'Case '+n,closedAt:'2026-11-04T10:00:00.000Z',selectedSuspectId:'verified',selectedMotiveId:'limited',inspectedClues:['Record'],askedQuestions:[],unansweredQuestions:[]});
 const memory=getCase066Carryover(archive);
 assert.equal(memory.priorFiles.length,3);
 assert.equal(memory.endgameFiles,3);
 assert.equal(memory.clueCount,3);
});
test('Case 066 reports uncertainty rather than inventing Rowan’s location or future',()=>{
 assert.match(CASE_066_GAME.truth,/does not establish Rowan’s current location/);
 assert.match(CASE_066_GAME.outcome,/make no accusation unsupported by evidence/);
});
