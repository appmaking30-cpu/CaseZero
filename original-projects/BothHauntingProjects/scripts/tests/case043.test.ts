import assert from 'node:assert/strict';
import {test} from 'node:test';
import {CASE_043_GAME,getCase043Carryover,isCase043DeductionCorrect,isCase043TimelineCorrect} from '../../artifacts/casezero/game/case043Game';
import {archiveCompletedCase,EMPTY_INVESTIGATION_ARCHIVE} from '../../artifacts/casezero/game/investigationArchive';

test('Case 043 has four unique records and three witnesses',()=>{
 assert.equal(CASE_043_GAME.clues.length,4);
 assert.equal(new Set(CASE_043_GAME.clues.map(x=>x.id)).size,4);
 assert.equal(CASE_043_GAME.witnesses.length,3);
 assert.ok(CASE_043_GAME.witnesses.every(w=>w.questions.length===2));
});
test('Case 043 orders sealed samples, call, questioned entry and blind review',()=>{
 assert.equal(isCase043TimelineCorrect(['samples','call','entry','exam']),true);
 assert.equal(isCase043TimelineCorrect(['call','samples','entry','exam']),false);
});
test('Case 043 excludes unsupported accusations and preserves unknown authorship',()=>{
 assert.equal(isCase043DeductionCorrect('unknown','exclude'),true);
 assert.equal(isCase043DeductionCorrect('rowan','exclude'),false);
 assert.equal(isCase043DeductionCorrect('mara','exclude'),false);
 assert.equal(isCase043DeductionCorrect('unknown','accuse'),false);
 assert.equal(isCase043DeductionCorrect('unknown','clear'),false);
});
test('Case 043 carries the carbon and retrieval investigations forward',()=>{
 let archive=EMPTY_INVESTIGATION_ARCHIVE;
 for(const [caseId,caseTitle] of [['case042','The Name on the Carbon'],['case041','The Missing Signature']]){
  archive=archiveCompletedCase(archive,{caseId,caseTitle,closedAt:'2026-11-02T00:00:00.000Z',selectedSuspectId:'unknown',selectedMotiveId:'record',inspectedClues:['one','two'],askedQuestions:['audit:one'],unansweredQuestions:[]});
 }
 const memory=getCase043Carryover(archive);
 assert.equal(memory.priorFiles.length,2);assert.equal(memory.clueCount,4);assert.equal(memory.specimenTrailFiles,2);
});
