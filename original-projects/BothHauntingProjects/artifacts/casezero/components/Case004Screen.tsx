import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { archiveCompletedCase, type InvestigationArchive } from '@/game/investigationArchive';
import {
  CASE_004_GAME,
  EMPTY_CASE004_PROGRESS,
  getCase004Carryover,
  getCase004QuestionReply,
  isCase004DeductionCorrect,
  isCase004TimelineCorrect,
  type Case004Progress,
} from '@/game/case004Game';

const SAVE_KEY = 'casezero.case004.progress.v1';

type Props = {
  archive: InvestigationArchive;
  onArchive: (record: Parameters<typeof archiveCompletedCase>[1]) => void;
  onReturn: () => void;
};

export default function Case004Screen({ archive, onArchive, onReturn }: Props) {
  const colors = useColors();
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<'briefing' | 'evidence' | 'interviews' | 'timeline' | 'deduction' | 'review'>('briefing');
  const [progress, setProgress] = useState<Case004Progress>(EMPTY_CASE004_PROGRESS);
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [timelineMessage, setTimelineMessage] = useState('');
  const [deductionMessage, setDeductionMessage] = useState('');
  const carryover = useMemo(() => getCase004Carryover(archive), [archive]);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(SAVE_KEY).then((raw) => {
      if (!active) return;
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Case004Progress>;
        setProgress({
          cluesFound: Array.isArray(saved.cluesFound) ? saved.cluesFound.filter((id): id is string => typeof id === 'string') : [],
          askedQuestions: Array.isArray(saved.askedQuestions) ? saved.askedQuestions.filter((key): key is string => typeof key === 'string') : [],
          timelineOrder: Array.isArray(saved.timelineOrder) ? saved.timelineOrder.filter((id): id is string => typeof id === 'string') : [],
          timelineSolved: typeof saved.timelineSolved === 'boolean' ? saved.timelineSolved : false,
          selectedSuspect: typeof saved.selectedSuspect === 'string' ? saved.selectedSuspect : null,
          selectedMotive: typeof saved.selectedMotive === 'string' ? saved.selectedMotive : null,
          completed: typeof saved.completed === 'boolean' ? saved.completed : false,
        });
        if (saved.completed) setPhase('review');
        else if (Array.isArray(saved.cluesFound) && saved.cluesFound.length > 0) setPhase('evidence');
      }
    }).catch(() => undefined).finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(SAVE_KEY, JSON.stringify(progress)).catch(() => undefined);
  }, [loaded, progress]);

  const allCluesFound = progress.cluesFound.length === CASE_004_GAME.clues.length;
  const witnessCount = CASE_004_GAME.witnesses.filter((witness) =>
    witness.questions.some((question) => progress.askedQuestions.includes(`${witness.id}:${question.id}`)),
  ).length;
  const allWitnessesHeard = witnessCount === CASE_004_GAME.witnesses.length;
  const unanswered = CASE_004_GAME.witnesses.flatMap((witness) =>
    witness.questions.filter((question) => !progress.askedQuestions.includes(`${witness.id}:${question.id}`))
      .map((question) => `${witness.name}: ${question.prompt}`),
  );

  const inspectClue = (id: string) => {
    setProgress((current) => ({ ...current, cluesFound: current.cluesFound.includes(id) ? current.cluesFound : [...current.cluesFound, id] }));
    setActiveClue((current) => current === id ? null : id);
  };
  const askQuestion = (witnessId: string, questionId: string) => {
    const key = `${witnessId}:${questionId}`;
    setProgress((current) => ({ ...current, askedQuestions: current.askedQuestions.includes(key) ? current.askedQuestions : [...current.askedQuestions, key] }));
    setActiveReply(key);
  };
  const selectTimeline = (id: string) => {
    if (progress.timelineSolved || progress.timelineOrder.includes(id) || progress.timelineOrder.length >= 4) return;
    const next = [...progress.timelineOrder, id];
    setProgress((current) => ({ ...current, timelineOrder: next, timelineSolved: next.length === 4 && isCase004TimelineCorrect(next) }));
    if (next.length === 4) {
      setTimelineMessage(isCase004TimelineCorrect(next)
        ? 'Timeline confirmed. The maintenance override came before the courier transfer.'
        : 'That sequence does not fit the key register and relay log. Reset and compare the times.');
    }
  };
  const resetTimeline = () => {
    setProgress((current) => ({ ...current, timelineOrder: [], timelineSolved: false }));
    setTimelineMessage('');
  };
  const submitDeduction = () => {
    if (!isCase004DeductionCorrect(progress.selectedSuspect, progress.selectedMotive)) {
      setDeductionMessage('That theory does not explain who controlled M-2 and approved the transfer. Recheck the key register and docket.');
      return;
    }
    onArchive({
      caseId: CASE_004_GAME.id,
      caseTitle: CASE_004_GAME.title,
      closedAt: new Date().toISOString(),
      selectedSuspectId: progress.selectedSuspect!,
      selectedMotiveId: progress.selectedMotive!,
      inspectedClues: CASE_004_GAME.clues.filter((clue) => progress.cluesFound.includes(clue.id)).map((clue) => clue.title),
      askedQuestions: CASE_004_GAME.witnesses.flatMap((witness) => witness.questions
        .filter((question) => progress.askedQuestions.includes(`${witness.id}:${question.id}`))
        .map((question) => `${witness.name}: ${question.prompt}`)),
      unansweredQuestions: unanswered,
    });
    setProgress((current) => ({ ...current, completed: true }));
    setDeductionMessage('');
    setPhase('review');
  };

  const card = { backgroundColor: colors.card, borderColor: colors.border };
  const text = { color: colors.foreground };
  const muted = { color: colors.mutedForeground };

  if (!loaded) return <View style={styles.loading}><Text style={[styles.brand, { color: colors.primary }]}>RESTORING CASE 004…</Text></View>;

  return (
    <>
      {phase === 'briefing' && (
        <>
          <Text style={[styles.label, { color: colors.primary }]}>CASE 004 · MISSING DETECTIVE TRAIL</Text>
          <Text style={[styles.hero, text]}>{CASE_004_GAME.title}</Text>
          <Text style={[styles.subtitle, muted]}>{CASE_004_GAME.subtitle}</Text>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>THE SIGNAL HOUSE</Text>
            <Text style={[styles.body, text]}>{CASE_004_GAME.briefing}</Text>
            <View style={styles.divider}>
              <Text style={[styles.label, { color: colors.primary }]}>THE MEMORY · EARLIER INVESTIGATIONS</Text>
              <Text style={[styles.body, muted]}>{carryover.lastFinding}</Text>
              <Text style={[styles.note, text]}>Evidence inspected across the campaign: {carryover.inspectedAcrossCampaign}</Text>
              <Text style={[styles.note, muted]}>Conclusions carried forward: {carryover.priorConclusions.join(' · ')}</Text>
              {carryover.unansweredLeads.length > 0 && <Text style={[styles.note, { color: colors.primary }]}>Questions left open in earlier files: {carryover.unansweredLeads.length}</Text>}
            </View>
          </View>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>PERSONS CONNECTED TO THE TRANSFER</Text>
            {CASE_004_GAME.suspects.map((suspect) => (
              <View key={suspect.id} style={styles.person}>
                <Text style={[styles.personName, text]}>{suspect.name}</Text>
                <Text style={[styles.note, { color: colors.primary }]}>{suspect.role}</Text>
                <Text style={[styles.note, muted]}>{suspect.note}</Text>
              </View>
            ))}
          </View>
          <Action title="Begin evidence review" colors={colors} onPress={() => setPhase('evidence')} />
          <Action title="Back to Bureau" colors={colors} onPress={onReturn} ghost />
        </>
      )}

      {phase === 'evidence' && (
        <>
          <Text style={[styles.label, { color: colors.primary }]}>CASE 004 · EVIDENCE</Text>
          <Text style={[styles.hero, text]}>Where did Rowan’s recorder go?</Text>
          <Text style={[styles.subtitle, muted]}>Inspect all four records. Separate the person who approved the transfer from the person who carried it.</Text>
          <View style={styles.track}><View style={[styles.fill, { width: `${progress.cluesFound.length / 4 * 100}%`, backgroundColor: colors.primary }]} /></View>
          <Text style={[styles.note, muted]}>{progress.cluesFound.length} of 4 records logged</Text>
          {CASE_004_GAME.clues.map((clue, index) => {
            const found = progress.cluesFound.includes(clue.id);
            return <Pressable key={clue.id} accessibilityRole="button" onPress={() => inspectClue(clue.id)} style={[styles.card, card, styles.tap, { borderColor: found ? colors.primary : colors.border }]}>
              <Text style={[styles.label, { color: colors.primary }]}>0{index + 1} · {found ? 'LOGGED' : 'INSPECT'}</Text>
              <Text style={[styles.cardTitle, text]}>{clue.title}</Text>
              <Text style={[styles.note, muted]}>{clue.label}</Text>
              {activeClue === clue.id && <Text style={[styles.body, muted, styles.divider]}>{clue.detail}</Text>}
            </Pressable>;
          })}
          <Action title="Question the witnesses" colors={colors} onPress={() => setPhase('interviews')} disabled={!allCluesFound} />
          <Action title="Back to briefing" colors={colors} onPress={() => setPhase('briefing')} ghost />
        </>
      )}

      {phase === 'interviews' && (
        <>
          <Text style={[styles.label, { color: colors.primary }]}>CASE 004 · INTERVIEWS</Text>
          <Text style={[styles.hero, text]}>Who authorized the removal?</Text>
          <Text style={[styles.subtitle, muted]}>The courier handled the case. The records must identify who ordered it moved.</Text>
          {CASE_004_GAME.witnesses.map((witness, index) => (
            <View key={witness.id} style={[styles.card, card]}>
              <Text style={[styles.cardTitle, text]}>{witness.name}</Text>
              <Text style={[styles.note, muted]}>{witness.role} · {witness.questions.some((q) => progress.askedQuestions.includes(`${witness.id}:${q.id}`)) ? 'HEARD' : `WITNESS 0${index + 1}`}</Text>
              {witness.questions.map((question) => {
                const key = `${witness.id}:${question.id}`;
                return <View key={key} style={styles.question}>
                  <Pressable accessibilityRole="button" onPress={() => askQuestion(witness.id, question.id)} style={[styles.questionButton, { borderColor: progress.askedQuestions.includes(key) ? colors.primary : colors.border }]}>
                    <Text style={[styles.body, text]}>{question.prompt}</Text>
                    <Text style={[styles.note, { color: colors.primary }]}>{progress.askedQuestions.includes(key) ? 'ASKED' : 'ASK QUESTION'}</Text>
                  </Pressable>
                  {activeReply === key && <Text style={[styles.reply, muted]}>{getCase004QuestionReply(witness.id, question.id, archive)}</Text>}
                </View>;
              })}
            </View>
          ))}
          <Text style={[styles.note, muted]}>{witnessCount}/3 witnesses heard · {unanswered.length} questions left unasked</Text>
          <Action title="Reconstruct the timeline" colors={colors} onPress={() => setPhase('timeline')} disabled={!allWitnessesHeard} />
          <Action title="Back to evidence" colors={colors} onPress={() => setPhase('evidence')} ghost />
        </>
      )}

      {phase === 'timeline' && (
        <>
          <Text style={[styles.label, { color: colors.primary }]}>CASE 004 · TIMELINE</Text>
          <Text style={[styles.hero, text]}>How did the recorder leave?</Text>
          <Text style={[styles.subtitle, muted]}>Put the key sign-out, locker seal, override and collection in chronological order.</Text>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>YOUR SEQUENCE</Text>
            {progress.timelineOrder.length === 0 ? <Text style={[styles.body, muted]}>No events selected yet.</Text> : progress.timelineOrder.map((id, index) => {
              const event = CASE_004_GAME.timelineEvents.find((item) => item.id === id);
              return <Text key={id} style={[styles.body, text]}>{index + 1}. {event?.time} — {event?.title}</Text>;
            })}
          </View>
          {CASE_004_GAME.timelineEvents.map((event) => {
            const selected = progress.timelineOrder.includes(event.id);
            return <Pressable key={event.id} accessibilityRole="button" disabled={selected || progress.timelineSolved} onPress={() => selectTimeline(event.id)} style={[styles.card, card, { opacity: selected ? 0.48 : 1 }]}>
              <Text style={[styles.label, { color: colors.primary }]}>{event.time}</Text>
              <Text style={[styles.cardTitle, text]}>{event.title}</Text>
              <Text style={[styles.note, muted]}>{event.detail}</Text>
            </Pressable>;
          })}
          {!!timelineMessage && <Text style={[styles.note, { color: progress.timelineSolved ? colors.primary : colors.destructive }]}>{timelineMessage}</Text>}
          {progress.timelineSolved
            ? <Action title="Make your deduction" colors={colors} onPress={() => setPhase('deduction')} />
            : progress.timelineOrder.length === 4
              ? <Action title="Reset sequence and retry" colors={colors} onPress={resetTimeline} />
              : <Text style={[styles.note, muted]}>{progress.timelineOrder.length}/4 events selected</Text>}
          <Action title="Back to interviews" colors={colors} onPress={() => setPhase('interviews')} ghost />
        </>
      )}

      {phase === 'deduction' && (
        <>
          <Text style={[styles.label, { color: colors.primary }]}>CASE 004 · FINAL DEDUCTION</Text>
          <Text style={[styles.hero, text]}>Who silenced Rowan’s recorder?</Text>
          <Text style={[styles.subtitle, muted]}>Choose the person who controlled the maintenance override and the motive supported by the transfer records.</Text>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>WHO AUTHORIZED THE REMOVAL?</Text>
            {CASE_004_GAME.suspects.map((suspect) => <Pressable key={suspect.id} accessibilityRole="button" onPress={() => setProgress((current) => ({ ...current, selectedSuspect: suspect.id }))} style={[styles.choice, { borderColor: progress.selectedSuspect === suspect.id ? colors.primary : colors.border, backgroundColor: progress.selectedSuspect === suspect.id ? colors.secondary : 'transparent' }]}>
              <Text style={[styles.cardTitle, text]}>{suspect.name}</Text><Text style={[styles.note, muted]}>{suspect.role}</Text>
            </Pressable>)}
          </View>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>WHY?</Text>
            {CASE_004_GAME.motives.map((motive) => <Pressable key={motive.id} accessibilityRole="button" onPress={() => setProgress((current) => ({ ...current, selectedMotive: motive.id }))} style={[styles.choice, { borderColor: progress.selectedMotive === motive.id ? colors.primary : colors.border, backgroundColor: progress.selectedMotive === motive.id ? colors.secondary : 'transparent' }]}>
              <Text style={[styles.cardTitle, text]}>{motive.label}</Text><Text style={[styles.note, muted]}>{motive.note}</Text>
            </Pressable>)}
          </View>
          {!!deductionMessage && <Text style={[styles.note, { color: colors.destructive }]}>{deductionMessage}</Text>}
          <Action title="Submit evidence-based conclusion" colors={colors} onPress={submitDeduction} disabled={!progress.selectedSuspect || !progress.selectedMotive || !allCluesFound || !allWitnessesHeard || !progress.timelineSolved} />
          <Action title="Back to timeline" colors={colors} onPress={() => setPhase('timeline')} ghost />
        </>
      )}

      {phase === 'review' && (
        <>
          <View style={[styles.stamp, { borderColor: colors.primary }]}><Text style={[styles.label, { color: colors.primary }]}>CASE CLOSED · 004</Text></View>
          <Text style={[styles.hero, text]}>The recording is still out there.</Text>
          <Text style={[styles.subtitle, muted]}>The Bureau has traced the missing recorder beyond the signal house. Rowan’s final message may still be recoverable.</Text>
          <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>TRUTH</Text><Text style={[styles.body, text]}>{CASE_004_GAME.truth}</Text></View>
          <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>PROOF</Text><Text style={[styles.body, text]}>{CASE_004_GAME.proof}</Text></View>
          <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>OUTCOME</Text><Text style={[styles.body, text]}>{CASE_004_GAME.outcome}</Text></View>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>THE MEMORY · CASE 004 ARCHIVED</Text>
            <Text style={[styles.body, text]}>Clues inspected: {progress.cluesFound.length}/4</Text>
            <Text style={[styles.body, text]}>Questions asked: {progress.askedQuestions.length}/6</Text>
            <Text style={[styles.body, text]}>Questions left unasked: {unanswered.length}</Text>
            <Text style={[styles.note, muted]}>The missing recorder’s transfer is now part of the campaign record.</Text>
          </View>
          <Action title="Return to Detective Bureau" colors={colors} onPress={onReturn} />
        </>
      )}
    </>
  );
}

function Action({ title, colors, onPress, disabled = false, ghost = false }: {
  title: string;
  colors: ReturnType<typeof useColors>;
  onPress: () => void;
  disabled?: boolean;
  ghost?: boolean;
}) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.action, { backgroundColor: ghost ? 'transparent' : colors.primary, borderColor: ghost ? colors.border : colors.primary, opacity: disabled ? 0.4 : pressed ? 0.75 : 1 }]}>
    <Text style={[styles.actionText, { color: ghost ? colors.foreground : colors.primaryForeground }]}>{title}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  loading: { padding: 28 },
  brand: { fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 1.8, marginBottom: 9 },
  hero: { fontSize: 29, lineHeight: 36, fontWeight: '800' },
  subtitle: { fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 13 },
  body: { fontSize: 14, lineHeight: 22 },
  note: { fontSize: 12, lineHeight: 19, marginTop: 8 },
  divider: { borderTopWidth: 1, borderTopColor: '#344052', marginTop: 13, paddingTop: 12 },
  person: { marginTop: 12 },
  personName: { fontSize: 16, fontWeight: '800' },
  cardTitle: { fontSize: 16, fontWeight: '800', lineHeight: 22 },
  tap: { padding: 15 },
  track: { height: 5, borderRadius: 4, overflow: 'hidden', marginTop: 12, backgroundColor: '#263244' },
  fill: { height: 5, borderRadius: 4 },
  question: { marginTop: 12 },
  questionButton: { borderWidth: 1, borderRadius: 12, padding: 12 },
  reply: { fontSize: 13, lineHeight: 20, paddingHorizontal: 9, paddingTop: 9 },
  choice: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 9 },
  stamp: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 7, padding: 9, marginBottom: 14 },
  action: { minHeight: 48, borderWidth: 1, borderRadius: 13, padding: 13, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  actionText: { fontSize: 13, fontWeight: '900', textAlign: 'center' },
});
