import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { archiveCompletedCase, type InvestigationArchive } from '@/game/investigationArchive';
import { getBureauSpecialistInsight, getBureauSpecialistProgress, type BureauTeamBoard } from '@/game/bureauTeam';
import { CASE_059_GAME, CASE_059_EMPTY_PROGRESS, getCase059Carryover, isCase059DeductionCorrect, isCase059TimelineCorrect } from '@/game/case059Game';

const SAVE_KEY = 'casezero.case059.progress.v1';
type Progress = typeof CASE_059_EMPTY_PROGRESS;
type Phase = 'briefing' | 'evidence' | 'interviews' | 'timeline' | 'deduction' | 'review';
type Props = {
  archive: InvestigationArchive;
  bureauTeamBoard: BureauTeamBoard;
  onArchive: (record: Parameters<typeof archiveCompletedCase>[1]) => void;
  onReturn: () => void;
};

export default function Case059Screen({ archive, bureauTeamBoard, onArchive, onReturn }: Props) {
  const colors = useColors();
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<Phase>('briefing');
  const [progress, setProgress] = useState<Progress>(CASE_059_EMPTY_PROGRESS);
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const archiveLock = useRef(false);
  const carryover = getCase059Carryover(archive);
  const caseAssignment = bureauTeamBoard.assignments.find((item) => item.targetId === CASE_059_GAME.id);
  const specialistRank = caseAssignment ? getBureauSpecialistProgress(bureauTeamBoard, caseAssignment.specialistId).rank : 0;
  const specialistInsight = getBureauSpecialistInsight(
    caseAssignment?.specialistId ?? null,
    CASE_059_GAME.id,
    progress.cluesFound,
    progress.askedQuestions,
    specialistRank,
  );

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(SAVE_KEY).then((raw) => {
      if (!active || !raw) return;
      const saved = JSON.parse(raw) as Partial<Progress>;
      const clueIds = new Set<string>(CASE_059_GAME.clues.map((item) => item.id));
      const questionIds = new Set<string>(CASE_059_GAME.witnesses.flatMap((witness) => witness.questions.map((question) => witness.id + ':' + question.id)));
      const eventIds = new Set<string>(CASE_059_GAME.timelineEvents.map((item) => item.id));
      const suspectIds = new Set<string>(CASE_059_GAME.suspects.map((item) => item.id));
      const motiveIds = new Set<string>(CASE_059_GAME.motives.map((item) => item.id));
      const clean = (items: unknown, allowed: Set<string>) => Array.isArray(items)
        ? [...new Set(items.filter((item): item is string => typeof item === 'string' && allowed.has(item)))]
        : [];
      const timeline = clean(saved.timelineOrder, eventIds).slice(0, 6);
      const heard = clean(saved.askedQuestions, questionIds);
      const clues = clean(saved.cluesFound, clueIds);
      const completed = saved.completed === true &&
        clues.length === CASE_059_GAME.clues.length &&
        CASE_059_GAME.witnesses.every((witness) => witness.questions.some((question) => heard.includes(witness.id + ':' + question.id))) &&
        isCase059TimelineCorrect(timeline) &&
        isCase059DeductionCorrect(
          typeof saved.selectedSuspect === 'string' ? saved.selectedSuspect : null,
          typeof saved.selectedMotive === 'string' ? saved.selectedMotive : null,
        );
      const restored: Progress = {
        cluesFound: clues,
        askedQuestions: heard,
        timelineOrder: timeline,
        selectedSuspect: typeof saved.selectedSuspect === 'string' && suspectIds.has(saved.selectedSuspect) ? saved.selectedSuspect : null,
        selectedMotive: typeof saved.selectedMotive === 'string' && motiveIds.has(saved.selectedMotive) ? saved.selectedMotive : null,
        completed,
      };
      setProgress(restored);
      if (completed) { archiveLock.current = true; setPhase('review'); }
      else if (clues.length) setPhase('evidence');
    }).catch(() => undefined).finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(SAVE_KEY, JSON.stringify(progress)).catch(() => undefined);
  }, [loaded, progress]);

  const allClues = progress.cluesFound.length === CASE_059_GAME.clues.length;
  const heardWitnesses = CASE_059_GAME.witnesses.filter((witness) =>
    witness.questions.some((question) => progress.askedQuestions.includes(witness.id + ':' + question.id)),
  ).length;
  const allWitnessesHeard = heardWitnesses === CASE_059_GAME.witnesses.length;
  const unanswered = CASE_059_GAME.witnesses.flatMap((witness) =>
    witness.questions.filter((question) => !progress.askedQuestions.includes(witness.id + ':' + question.id))
      .map((question) => witness.name + ': ' + question.prompt),
  );
  const timelineSolved = isCase059TimelineCorrect(progress.timelineOrder);
  const card = { backgroundColor: colors.card, borderColor: colors.border };
  const text = { color: colors.foreground };
  const muted = { color: colors.mutedForeground };

  const inspect = (id: string) => {
    setProgress((current) => ({ ...current, cluesFound: current.cluesFound.includes(id) ? current.cluesFound : [...current.cluesFound, id] }));
    setActiveClue((current) => current === id ? null : id);
  };
  const ask = (witnessId: string, questionId: string) => {
    const key = witnessId + ':' + questionId;
    setProgress((current) => ({ ...current, askedQuestions: current.askedQuestions.includes(key) ? current.askedQuestions : [...current.askedQuestions, key] }));
    setActiveReply(key);
  };
  const chooseEvent = (id: string) => {
    if (progress.timelineOrder.includes(id) || progress.timelineOrder.length >= 6) return;
    const next = [...progress.timelineOrder, id];
    setProgress((current) => ({ ...current, timelineOrder: next }));
    setMessage(next.length === 6 && !isCase059TimelineCorrect(next)
      ? 'That sequence conflicts with the event records. Check the cache inventory, retention-copy comparison, seal inspection, shift handover and media-lab comparison.'
      : '');
  };
  const submit = () => {
    if (archiveLock.current || progress.completed) return;
    if (!allClues || !allWitnessesHeard || !timelineSolved) return;
    if (!isCase059DeductionCorrect(progress.selectedSuspect, progress.selectedMotive)) {
      setMessage(`The records authenticate C-2 as a network fragment, but they do not identify the cabinet user. Recheck the checksum, corrected clock, shared export role and missing individual access record.`);
      return;
    }
    archiveLock.current = true;
    onArchive({
      caseId: CASE_059_GAME.id,
      caseTitle: CASE_059_GAME.title,
      closedAt: new Date().toISOString(),
      selectedSuspectId: progress.selectedSuspect!,
      selectedMotiveId: progress.selectedMotive!,
      inspectedClues: CASE_059_GAME.clues.filter((item) => progress.cluesFound.includes(item.id)).map((item) => item.title),
      askedQuestions: CASE_059_GAME.witnesses.flatMap((witness) => witness.questions.filter((question) => progress.askedQuestions.includes(witness.id + ':' + question.id)).map((question) => witness.name + ': ' + question.prompt)),
      unansweredQuestions: unanswered,
    });
    setProgress((current) => ({ ...current, completed: true }));
    setMessage('');
    setPhase('review');
  };

  if (!loaded) return <View style={styles.loading}><Text style={[styles.label, { color: colors.primary }]}>RESTORING THE UNINDEXED BUFFER FILE…</Text></View>;

  return <>
    {phase === 'briefing' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 059 · THE UNINDEXED BUFFER</Text>
      <Text style={[styles.hero, text]}>{CASE_059_GAME.title}</Text>
      <Text style={[styles.subtitle, muted]}>{CASE_059_GAME.subtitle}</Text>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>{CASE_059_GAME.location}</Text>
        <Text style={[styles.body, text]}>{CASE_059_GAME.briefing}</Text>
        <Text style={[styles.note, muted]}>Prior investigations remembered: {carryover.priorFiles.map((record) => record.caseTitle).join(' · ')} · {carryover.clueCount} clues preserved. Cases 048–056 traced the authorization gap, dispatch records, recorder-transfer packet, Rowan’s assignment and independently corroborated relay participation. This file tests whether the C-2 access roster is a human location record or an authentic network fragment.</Text>
      </View>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>THE UNINDEXED BUFFER REVIEW</Text>
        {CASE_059_GAME.suspects.map((person) => <View key={person.id} style={styles.person}><Text style={[styles.cardTitle, text]}>{person.name}</Text><Text style={[styles.note, { color: colors.primary }]}>{person.role}</Text><Text style={[styles.note, muted]}>{person.note}</Text></View>)}
      </View>
      <Action title="Open the C-2 access roster file" colors={colors} onPress={() => setPhase('evidence')} />
      <Action title="Back to Bureau" colors={colors} onPress={onReturn} ghost />
    </>}

    {phase === 'evidence' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 059 · THE UNINDEXED BUFFER REVIEW</Text>
      <Text style={[styles.hero, text]}>Authenticate C-2 against the local repeater journal, correct its cache-clock offset, and test whether the fragment contains a individual access match to the cabinet.</Text>
      <Text style={[styles.subtitle, muted]}>Inspect all five records: the cache inventory, retention-copy comparison, seal inspection, shift handover and recorder fingerprint analysis.</Text>
      <View style={styles.track}><View style={[styles.fill, { width: (progress.cluesFound.length / 5 * 100) + '%', backgroundColor: colors.primary }]} /></View>
      <Text style={[styles.note, muted]}>{progress.cluesFound.length}/5 records logged</Text>
      {CASE_059_GAME.clues.map((clue, index) => <Pressable key={clue.id} onPress={() => inspect(clue.id)} style={[styles.card, card, { borderColor: progress.cluesFound.includes(clue.id) ? colors.primary : colors.border }]}>
        <Text style={[styles.label, { color: colors.primary }]}>0{index + 1} · {progress.cluesFound.includes(clue.id) ? 'LOGGED' : 'INSPECT'}</Text>
        <Text style={[styles.cardTitle, text]}>{clue.title}</Text>
        <Text style={[styles.note, muted]}>{clue.label}</Text>
        {activeClue === clue.id && <Text style={[styles.body, text, styles.divider]}>{clue.detail}</Text>}
      </Pressable>)}
      <Action title="Interview the facilities and security witnesses" colors={colors} onPress={() => setPhase('interviews')} disabled={!allClues} />
      <Action title="Back to briefing" colors={colors} onPress={() => setPhase('briefing')} ghost />
    </>}

    {phase === 'interviews' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 059 · THE UNINDEXED BUFFER INTERVIEWS</Text>
      <Text style={[styles.hero, text]}>What does the C-2 access roster actually prove?</Text>
      <Text style={[styles.subtitle, muted]}>Ask at least one question to each staff member to unlock the timeline. Follow-ups are optional and preserved in the archived report.</Text>
      {CASE_059_GAME.witnesses.map((witness, index) => <View key={witness.id} style={[styles.card, card]}>
        <Text style={[styles.cardTitle, text]}>{witness.name}</Text>
        <Text style={[styles.note, muted]}>{witness.role} · {witness.questions.some((question) => progress.askedQuestions.includes(witness.id + ':' + question.id)) ? 'HEARD' : 'WITNESS 0' + (index + 1)}</Text>
        {witness.questions.map((question) => {
          const key = witness.id + ':' + question.id;
          return <View key={key} style={styles.question}>
            <Pressable onPress={() => ask(witness.id, question.id)} style={[styles.questionButton, { borderColor: progress.askedQuestions.includes(key) ? colors.primary : colors.border }]}>
              <Text style={[styles.body, text]}>{question.prompt}</Text>
              <Text style={[styles.note, { color: colors.primary }]}>{progress.askedQuestions.includes(key) ? 'ASKED · VIEW ANSWER' : 'ASK QUESTION'}</Text>
            </Pressable>
            {activeReply === key && <Text style={[styles.reply, muted]}>{question.reply}</Text>}
          </View>;
        })}
      </View>)}
      <Text style={[styles.note, muted]}>{heardWitnesses}/3 witnesses heard · {unanswered.length} optional follow-ups remaining</Text>
      <Action title="Reconstruct the C-2 access roster timeline" colors={colors} onPress={() => setPhase('timeline')} disabled={!allWitnessesHeard} />
      <Action title="Back to evidence" colors={colors} onPress={() => setPhase('evidence')} ghost />
    </>}

    {phase === 'timeline' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 059 · THE UNINDEXED BUFFER TIMELINE</Text>
      <Text style={[styles.hero, text]}>Put the roster, seal inspection, WC-4 fragment, retention receipt, handover and access audit in chronological order.</Text>
      <Text style={[styles.subtitle, muted]}>Select the six events from earliest to latest. The options are deliberately shuffled.</Text>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>YOUR TIMELINE</Text>
        {progress.timelineOrder.length === 0 ? <Text style={[styles.note, muted]}>No events placed yet.</Text> : progress.timelineOrder.map((id, index) => {
          const event = CASE_059_GAME.timelineEvents.find((item) => item.id === id);
          return <Text key={id} style={[styles.body, text]}>{index + 1}. {event?.time} — {event?.title}</Text>;
        })}
      </View>
      {[...CASE_059_GAME.timelineEvents].reverse().map((event) => <Pressable key={event.id} disabled={progress.timelineOrder.includes(event.id) || progress.timelineOrder.length >= 6} onPress={() => chooseEvent(event.id)} style={[styles.card, card, { opacity: progress.timelineOrder.includes(event.id) ? 0.4 : 1 }]}>
        <Text style={[styles.label, { color: colors.primary }]}>{event.time}</Text>
        <Text style={[styles.cardTitle, text]}>{event.title}</Text>
        <Text style={[styles.note, muted]}>{event.detail}</Text>
      </Pressable>)}
      {!!message && <Text style={[styles.note, { color: colors.destructive }]}>{message}</Text>}
      {progress.timelineOrder.length === 6 ? timelineSolved
        ? <Action title="Timeline confirmed · Make deduction" colors={colors} onPress={() => { setMessage(''); setPhase('deduction'); }} />
        : <Action title="Reset timeline and retry" colors={colors} onPress={() => { setProgress((current) => ({ ...current, timelineOrder: [] })); setMessage(''); }} />
        : <Text style={[styles.note, muted]}>{progress.timelineOrder.length}/6 events selected</Text>}
      <Action title="Back to interviews" colors={colors} onPress={() => setPhase('interviews')} ghost />
    </>}

    {phase === 'deduction' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 059 · FINAL DEDUCTION</Text>
      <Text style={[styles.hero, text]}>Who was authorized to access C-2, and can the evidence identify who actually opened it?</Text>
      <Text style={[styles.subtitle, muted]}>Separate authorized access from proof of an actual opening or the identity of B-17’s creator.</Text>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>RESPONSE TYPE REVIEW</Text>
        {CASE_059_GAME.suspects.map((person) => <Choice key={person.id} title={person.name} note={person.role} selected={progress.selectedSuspect === person.id} colors={colors} onPress={() => setProgress((current) => ({ ...current, selectedSuspect: person.id }))} />)}
      </View>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>WHAT DOES THE RESPONSE PROVE?</Text>
        {CASE_059_GAME.motives.map((motive) => <Choice key={motive.id} title={motive.label} note={motive.note} selected={progress.selectedMotive === motive.id} colors={colors} onPress={() => setProgress((current) => ({ ...current, selectedMotive: motive.id }))} />)}
      </View>
      {!!message && <Text style={[styles.note, { color: colors.destructive }]}>{message}</Text>}
      <Action title="Submit evidence-based conclusion" colors={colors} onPress={submit} disabled={!allClues || !allWitnessesHeard || !timelineSolved || !progress.selectedSuspect || !progress.selectedMotive} />
      <Action title="Back to timeline" colors={colors} onPress={() => setPhase('timeline')} ghost />
    </>}

    {phase === 'review' && <>
      <View style={[styles.stamp, { borderColor: colors.primary }]}><Text style={[styles.label, { color: colors.primary }]}>CASE CLOSED · 059</Text></View>
      <Text style={[styles.hero, text]}>Four staff were authorized to access C-2, but no record identifies who actually opened it or created B-17.</Text>
      <Text style={[styles.subtitle, muted]}>The roster establishes permission only; the seal gap is unobserved; the vault receipt confirms B-17 existed by 19:31; and the badge reader records zone entry only.</Text>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>FINDING</Text><Text style={[styles.body, text]}>{CASE_059_GAME.truth}</Text></View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>PROOF</Text><Text style={[styles.body, text]}>{CASE_059_GAME.proof}</Text></View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>OUTCOME</Text><Text style={[styles.body, text]}>{CASE_059_GAME.outcome}</Text></View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>ARCHIVED INTERVIEW MEMORY</Text><Text style={[styles.body, text]}>Records inspected: {progress.cluesFound.length}/5</Text><Text style={[styles.body, text]}>Questions asked: {progress.askedQuestions.length}/6</Text><Text style={[styles.body, text]}>Optional questions left unasked: {unanswered.length}</Text></View>
      <Action title="Return to Detective Bureau" colors={colors} onPress={onReturn} />
    </>}
    {specialistInsight && (
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>BUREAU SPECIALIST REVIEW</Text>
        <Text style={[styles.cardTitle, text]}>{specialistInsight.title}</Text>
        <Text style={[styles.body, text]}>{specialistInsight.detail}</Text>
        {!!specialistInsight.rankPerk && <Text style={[styles.note, { color: colors.primary }]}>{specialistInsight.rankPerk}</Text>}
      </View>
    )}
  </>;
}

function Choice({ title, note, selected, colors, onPress }: { title: string; note: string; selected: boolean; colors: ReturnType<typeof useColors>; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
    <Text style={[styles.cardTitle, { color: colors.foreground }]}>{title}</Text>
    <Text style={[styles.note, { color: colors.mutedForeground }]}>{note}</Text>
  </Pressable>;
}

function Action({ title, colors, onPress, disabled = false, ghost = false }: { title: string; colors: ReturnType<typeof useColors>; onPress: () => void; disabled?: boolean; ghost?: boolean }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.action, { backgroundColor: ghost ? 'transparent' : colors.primary, borderColor: ghost ? colors.border : colors.primary, opacity: disabled ? 0.4 : pressed ? 0.75 : 1 }]}>
    <Text style={[styles.actionText, { color: ghost ? colors.foreground : colors.primaryForeground }]}>{title}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  loading: { padding: 28 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 1.8, marginBottom: 9 },
  hero: { fontSize: 29, lineHeight: 36, fontWeight: '800' },
  subtitle: { fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 13 },
  body: { fontSize: 14, lineHeight: 22 },
  note: { fontSize: 12, lineHeight: 19, marginTop: 8 },
  divider: { borderTopWidth: 1, borderTopColor: '#344053', marginTop: 13, paddingTop: 12 },
  person: { marginTop: 12 },
  cardTitle: { fontSize: 16, fontWeight: '800', lineHeight: 22 },
  question: { marginTop: 10 },
  questionButton: { borderWidth: 1, borderRadius: 11, padding: 12 },
  reply: { fontSize: 13, lineHeight: 21, marginTop: 9, paddingHorizontal: 4 },
  track: { height: 5, borderRadius: 4, overflow: 'hidden', marginTop: 12, backgroundColor: '#263244' },
  fill: { height: 5, borderRadius: 4 },
  choice: { borderWidth: 1, borderRadius: 11, padding: 12, marginTop: 10 },
  stamp: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 7, padding: 9, marginBottom: 14 },
  action: { minHeight: 48, borderWidth: 1, borderRadius: 13, padding: 13, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  actionText: { fontSize: 13, fontWeight: '900', textAlign: 'center' },
});
