import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_065_GAME, getCase065Carryover, isCase065DeductionCorrect, isCase065TimelineCorrect } from '../../artifacts/casezero/game/case065Game';
import { archiveCompletedCase, EMPTY_INVESTIGATION_ARCHIVE } from '../../artifacts/casezero/game/investigationArchive';

test('Case 065 has five distinct evidence records and three two-question witnesses',()=>{
 assert.equal(CASE_065_GAME.clues.length,5);
 assert.equal(new Set(CASE_065_GAME.clues.map(x=>x.id)).size,5);
 assert.equal(CASE_065_GAME.witnesses.length,3);
 assert.ok(CASE_065_GAME.witnesses.every(w=>w.questions.length===2));
});
test('Case 065 chronology orders inventory, retrieval, imaging and audit',()=>{
 assert.equal(CASE_065_GAME.timelineEvents.length,6);
 assert.equal(isCase065TimelineCorrect(CASE_065_GAME.correctOrder),true);
 assert.equal(isCase065TimelineCorrect([...CASE_065_GAME.correctOrder].reverse()),false);
});
test('Case 065 deduction respects checksum and metadata limits',()=>{
 assert.equal(isCase065DeductionCorrect('integrity','limits'),true);
 assert.equal(isCase065DeductionCorrect('speaker','limits'),false);
 assert.equal(isCase065DeductionCorrect('integrity','identity'),false);
 assert.equal(isCase065DeductionCorrect('integrity','tamper'),false);
});
test('Case 065 carries forward the packet custody trail',()=>{
 const archive=archiveCompletedCase(EMPTY_INVESTIGATION_ARCHIVE,{caseId:'case064',caseTitle:'The Exception Window',closedAt:'2026-11-04T10:00:00.000Z',selectedSuspectId:'tray',selectedMotiveId:'gap',inspectedClues:['Neutral receiving scan'],askedQuestions:[],unansweredQuestions:[]});
 const memory=getCase065Carryover(archive);
 assert.equal(memory.priorFiles.length,1);
 assert.equal(memory.clueCount,1);
 assert.equal(memory.packetTrailFiles,1);
});
