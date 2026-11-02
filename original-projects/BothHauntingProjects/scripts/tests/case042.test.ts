import assert from 'node:assert/strict';
import {test} from 'node:test';
import {CASE_042_GAME,getCase042Carryover,isCase042DeductionCorrect,isCase042TimelineCorrect} from '../../artifacts/casezero/game/case042Game';
import {archiveCompletedCase,EMPTY_INVESTIGATION_ARCHIVE} from '../../artifacts/casezero/game/investigationArchive';

test('Case 042 has four unique retrieval records and three witnesses',()=>{
 assert.equal(CASE_042_GAME.clues.length,4);
 assert.equal(new Set(CASE_042_GAME.clues.map(x=>x.id)).size,4);
 assert.equal(CASE_042_GAME.witnesses.length,3);
 assert.ok(CASE_042_GAME.witnesses.every(w=>w.questions.length===2));
});
test('Case 042 orders authorization, seal check, opening and comparison',()=>{
 assert.equal(isCase042TimelineCorrect(['authorization','sealLog','openingRecord','comparison']),true);
 assert.equal(isCase042TimelineCorrect(['sealLog','authorization','openingRecord','comparison']),false);
});
test('Case 042 separates a written name from authenticated authorship',()=>{
 assert.equal(isCase042DeductionCorrect('unknown','identity'),true);
 assert.equal(isCase042DeductionCorrect('rowan','identity'),false);
 assert.equal(isCase042DeductionCorrect('unknown','forgery'),false);
 assert.equal(isCase042DeductionCorrect('unknown','custody'),false);
});
test('Case 042 carries Case 041 and prior dispatch files forward',()=>{
 let archive=EMPTY_INVESTIGATION_ARCHIVE;
 for(const [caseId,caseTitle] of [['case041','The Missing Signature'],['case040','The Shift-Change Gap']]){
  archive=archiveCompletedCase(archive,{caseId,caseTitle,closedAt:'2026-11-02T00:00:00.000Z',selectedSuspectId:'unknown',selectedMotiveId:'record',inspectedClues:['one','two'],askedQuestions:['audit:one'],unansweredQuestions:[]});
 }
 const memory=getCase042Carryover(archive);
 assert.equal(memory.priorFiles.length,2);assert.equal(memory.clueCount,4);assert.equal(memory.retrievalTrailFiles,2);
});
