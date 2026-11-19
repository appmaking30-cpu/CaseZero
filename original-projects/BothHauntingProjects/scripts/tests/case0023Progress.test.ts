import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CASE_002_GAME,
  getCase002ResumePhase,
  sanitizeCase002SavedProgress,
} from '../../artifacts/casezero/game/case002Game';
import {
  CASE_003_GAME,
  getCase003ResumePhase,
  sanitizeCase003SavedProgress,
} from '../../artifacts/casezero/game/case003Game';

test('Case 002 save sanitizer keeps known IDs and rejects forged progress', () => {
  const restored = sanitizeCase002SavedProgress({
    cluesFound: ['access', 'unknown-clue', 'access'],
    askedQuestions: ['tomas:cart', 'unknown:question', 'tomas:cart', 'mara:key'],
    timelineOrder: ['access', 'closed', 'access'],
    timelineSolved: true,
    selectedSuspect: 'june',
    selectedMotive: 'protect',
    completed: true,
  });

  assert.deepEqual(restored.cluesFound, ['access']);
  assert.deepEqual(restored.askedQuestions, ['tomas:cart', 'mara:key']);
  assert.deepEqual(restored.timelineOrder, []);
  assert.equal(restored.timelineSolved, false);
  assert.equal(restored.selectedSuspect, null);
  assert.equal(restored.selectedMotive, null);
  assert.equal(restored.completed, false);
  assert.equal(getCase002ResumePhase(restored), 'case002Evidence');
});

test('Case 002 resume phase follows verified progress and preserves a valid conclusion', () => {
  const allClues = CASE_002_GAME.clues.map((clue) => clue.id);
  const oneQuestionPerWitness = CASE_002_GAME.witnesses.map(
    (witness) => `${witness.id}:${witness.questions[0].id}`,
  );

  assert.equal(getCase002ResumePhase(sanitizeCase002SavedProgress(null)), 'case002Briefing');
  assert.equal(
    getCase002ResumePhase(sanitizeCase002SavedProgress({ cluesFound: [allClues[0]] })),
    'case002Evidence',
  );
  assert.equal(
    getCase002ResumePhase(sanitizeCase002SavedProgress({ cluesFound: allClues })),
    'case002Interviews',
  );
  assert.equal(
    getCase002ResumePhase(sanitizeCase002SavedProgress({
      cluesFound: allClues,
      askedQuestions: oneQuestionPerWitness,
    })),
    'case002Timeline',
  );

  const solved = sanitizeCase002SavedProgress({
    cluesFound: allClues,
    askedQuestions: oneQuestionPerWitness,
    timelineOrder: [...CASE_002_GAME.correctTimelineOrder],
    timelineSolved: true,
  });
  assert.equal(getCase002ResumePhase(solved), 'case002Deduction');

  const completed = sanitizeCase002SavedProgress({
    cluesFound: allClues,
    askedQuestions: oneQuestionPerWitness,
    timelineOrder: [...CASE_002_GAME.correctTimelineOrder],
    timelineSolved: true,
    selectedSuspect: CASE_002_GAME.correctSuspect,
    selectedMotive: CASE_002_GAME.correctMotive,
    completed: true,
  });
  assert.equal(completed.completed, true);
  assert.equal(getCase002ResumePhase(completed), 'case002Review');

  const forged = sanitizeCase002SavedProgress({
    cluesFound: allClues,
    askedQuestions: oneQuestionPerWitness.slice(0, 2),
    timelineOrder: [...CASE_002_GAME.correctTimelineOrder],
    timelineSolved: true,
    selectedSuspect: CASE_002_GAME.correctSuspect,
    selectedMotive: CASE_002_GAME.correctMotive,
    completed: true,
  });
  assert.equal(forged.timelineSolved, false);
  assert.equal(forged.selectedSuspect, null);
  assert.equal(forged.completed, false);
  assert.equal(getCase002ResumePhase(forged), 'case002Interviews');
});

test('Case 003 save sanitizer keeps known IDs and rejects forged progress', () => {
  const restored = sanitizeCase003SavedProgress({
    cluesFound: ['slip', 'unknown-clue', 'slip'],
    askedQuestions: ['lyle:delivery', 'unknown:question', 'lyle:delivery', 'pike:access'],
    timelineOrder: ['signout', 'print', 'signout'],
    timelineSolved: true,
    selectedSuspect: 'arden',
    selectedMotive: 'control',
    completed: true,
  });

  assert.deepEqual(restored.cluesFound, ['slip']);
  assert.deepEqual(restored.askedQuestions, ['lyle:delivery', 'pike:access']);
  assert.deepEqual(restored.timelineOrder, []);
  assert.equal(restored.timelineSolved, false);
  assert.equal(restored.selectedSuspect, null);
  assert.equal(restored.selectedMotive, null);
  assert.equal(restored.completed, false);
  assert.equal(getCase003ResumePhase(restored), 'case003Evidence');
});

test('Case 003 resume phase follows verified progress and preserves a valid conclusion', () => {
  const allClues = CASE_003_GAME.clues.map((clue) => clue.id);
  const oneQuestionPerWitness = CASE_003_GAME.witnesses.map(
    (witness) => `${witness.id}:${witness.questions[0].id}`,
  );

  assert.equal(getCase003ResumePhase(sanitizeCase003SavedProgress(null)), 'case003Briefing');
  assert.equal(
    getCase003ResumePhase(sanitizeCase003SavedProgress({ cluesFound: [allClues[0]] })),
    'case003Evidence',
  );
  assert.equal(
    getCase003ResumePhase(sanitizeCase003SavedProgress({ cluesFound: allClues })),
    'case003Interviews',
  );
  assert.equal(
    getCase003ResumePhase(sanitizeCase003SavedProgress({
      cluesFound: allClues,
      askedQuestions: oneQuestionPerWitness,
    })),
    'case003Timeline',
  );

  const solved = sanitizeCase003SavedProgress({
    cluesFound: allClues,
    askedQuestions: oneQuestionPerWitness,
    timelineOrder: [...CASE_003_GAME.correctTimelineOrder],
    timelineSolved: true,
  });
  assert.equal(getCase003ResumePhase(solved), 'case003Deduction');

  const completed = sanitizeCase003SavedProgress({
    cluesFound: allClues,
    askedQuestions: oneQuestionPerWitness,
    timelineOrder: [...CASE_003_GAME.correctTimelineOrder],
    timelineSolved: true,
    selectedSuspect: CASE_003_GAME.correctSuspect,
    selectedMotive: CASE_003_GAME.correctMotive,
    completed: true,
  });
  assert.equal(completed.completed, true);
  assert.equal(getCase003ResumePhase(completed), 'case003Review');

  const forged = sanitizeCase003SavedProgress({
    cluesFound: allClues,
    askedQuestions: oneQuestionPerWitness.slice(0, 2),
    timelineOrder: [...CASE_003_GAME.correctTimelineOrder],
    timelineSolved: true,
    selectedSuspect: CASE_003_GAME.correctSuspect,
    selectedMotive: CASE_003_GAME.correctMotive,
    completed: true,
  });
  assert.equal(forged.timelineSolved, false);
  assert.equal(forged.selectedSuspect, null);
  assert.equal(forged.completed, false);
  assert.equal(getCase003ResumePhase(forged), 'case003Interviews');
});
