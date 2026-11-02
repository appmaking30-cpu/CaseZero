import assert from 'node:assert/strict';
import {test} from 'node:test';
import {CASE_045_GAME,getCase045Carryover,isCase045DeductionCorrect,isCase045TimelineCorrect} from '../../artifacts/casezero/game/case045Game';
import {archiveCompletedCase,EMPTY_INVESTIGATION_ARCHIVE} from '../../artifacts/casezero/game/investigationArchive';

test('Case 045 has four unique records and three witnesses with two questions each',()=>{
 assert.equal(CASE_045_GAME.clues.length,4);assert.equal(new Set(CASE_045_GAME.clues.map(x=>x.id)).size,4);
 assert.equal(CASE_045_GAME.witnesses.length,3);assert.ok(CASE_045_GAME.witnesses.every(w=>w.questions.length===2));
});
test('Case 045 orders packet, role handover, reader event and return exception',()=>{
 assert.equal(isCase045TimelineCorrect(['packet','handover','reader','count']),true);
 assert.equal(isCase045TimelineCorrect(['handover','packet','reader','count']),false);
});
test('Case 045 does not turn a role handover into personal attribution',()=>{
 assert.equal(isCase045DeductionCorrect('unknown','role'),true);
 assert.equal(isCase045DeductionCorrect('elias','role'),false);
 assert.equal(isCase045DeductionCorrect('mina','role'),false);
 assert.equal(isCase045DeductionCorrect('unknown','elias'),false);
});
test('Case 045 carries prior access and handwriting files forward',()=>{
 let archive=EMPTY_INVESTIGATION_ARCHIVE;
 for(const [caseId,caseTitle] of [['case044','The Badge Without a Name'],['case043','The Specimen Register'],['case042','The Name on the Carbon']]){
  archive=archiveCompletedCase(archive,{caseId,caseTitle,closedAt:'2026-11-02T00:00:00.000Z',selectedSuspectId:'unknown',selectedMotiveId:'record',inspectedClues:['one','two'],askedQuestions:['audit:one'],unansweredQuestions:[]});
 }
 const memory=getCase045Carryover(archive);assert.equal(memory.priorFiles.length,3);assert.equal(memory.clueCount,6);assert.equal(memory.accessTrailFiles,3);
});
