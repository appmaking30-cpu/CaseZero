import assert from 'node:assert/strict';
import {test} from 'node:test';
import {CASE_044_GAME,getCase044Carryover,isCase044DeductionCorrect,isCase044TimelineCorrect} from '../../artifacts/casezero/game/case044Game';
import {archiveCompletedCase,EMPTY_INVESTIGATION_ARCHIVE} from '../../artifacts/casezero/game/investigationArchive';

test('Case 044 has four unique records and three witnesses',()=>{
 assert.equal(CASE_044_GAME.clues.length,4);
 assert.equal(new Set(CASE_044_GAME.clues.map(x=>x.id)).size,4);
 assert.equal(CASE_044_GAME.witnesses.length,3);
 assert.ok(CASE_044_GAME.witnesses.every(w=>w.questions.length===2));
});
test('Case 044 orders pool assignment, corridor entry, exit and audit',()=>{
 assert.equal(isCase044TimelineCorrect(['issue','enter','exit','audit']),true);
 assert.equal(isCase044TimelineCorrect(['enter','issue','exit','audit']),false);
});
test('Case 044 distinguishes a shared credential from a named carrier',()=>{
 assert.equal(isCase044DeductionCorrect('unknown','token'),true);
 assert.equal(isCase044DeductionCorrect('runner','token'),false);
 assert.equal(isCase044DeductionCorrect('mara','token'),false);
 assert.equal(isCase044DeductionCorrect('unknown','runner'),false);
 assert.equal(isCase044DeductionCorrect('unknown','mara'),false);
});
test('Case 044 carries the handwriting and carbon investigations forward',()=>{
 let archive=EMPTY_INVESTIGATION_ARCHIVE;
 for(const [caseId,caseTitle] of [['case043','The Specimen Register'],['case042','The Name on the Carbon'],['case041','The Missing Signature']]){
  archive=archiveCompletedCase(archive,{caseId,caseTitle,closedAt:'2026-11-02T00:00:00.000Z',selectedSuspectId:'unknown',selectedMotiveId:'record',inspectedClues:['one','two'],askedQuestions:['audit:one'],unansweredQuestions:[]});
 }
 const memory=getCase044Carryover(archive);
 assert.equal(memory.priorFiles.length,3);assert.equal(memory.clueCount,6);assert.equal(memory.accessTrailFiles,3);
});
