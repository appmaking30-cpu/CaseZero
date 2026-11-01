import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { archiveCompletedCase, type InvestigationArchive } from '@/game/investigationArchive';
import { CASE_005_GAME, EMPTY_CASE005_PROGRESS, getCase005Carryover, isCase005DeductionCorrect, isCase005TimelineCorrect, type Case005Progress } from '@/game/case005Game';

const SAVE_KEY = 'casezero.case005.progress.v1';
type Props = { archive: InvestigationArchive; onArchive: (record: Parameters<typeof archiveCompletedCase>[1]) => void; onReturn: () => void };

export default function Case005Screen({ archive, onArchive, onReturn }: Props) {
  const colors = useColors();
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<'briefing' | 'evidence' | 'interviews' | 'timeline' | 'deduction' | 'review'>('briefing');
  const [progress, setProgress] = useState<Case005Progress>(EMPTY_CASE005_PROGRESS);
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const carryover = useMemo(() => getCase005Carryover(archive), [archive]);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(SAVE_KEY).then((raw) => {
      if (!active) return;
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Case005Progress>;
        setProgress({
          cluesFound: Array.isArray(saved.cluesFound) ? saved.cluesFound.filter((x): x is string => typeof x === 'string') : [],
          askedQuestions: Array.isArray(saved.askedQuestions) ? saved.askedQuestions.filter((x): x is string => typeof x === 'string') : [],
          timelineOrder: Array.isArray(saved.timelineOrder) ? saved.timelineOrder.filter((x): x is string => typeof x === 'string') : [],
          timelineSolved: saved.timelineSolved === true,
          selectedSuspect: typeof saved.selectedSuspect === 'string' ? saved.selectedSuspect : null,
          selectedMotive: typeof saved.selectedMotive === 'string' ? saved.selectedMotive : null,
          completed: saved.completed === true,
        });
        if (saved.completed) setPhase('review');
        else if (Array.isArray(saved.cluesFound) && saved.cluesFound.length) setPhase('evidence');
      }
    }).catch(() => undefined).finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);
  useEffect(() => { if (loaded) AsyncStorage.setItem(SAVE_KEY, JSON.stringify(progress)).catch(() => undefined); }, [loaded, progress]);

  const allClues = progress.cluesFound.length === CASE_005_GAME.clues.length;
  const heard = CASE_005_GAME.witnesses.filter((w) => w.questions.some((q) => progress.askedQuestions.includes(w.id + ':' + q.id))).length;
  const allHeard = heard === CASE_005_GAME.witnesses.length;
  const unanswered = CASE_005_GAME.witnesses.flatMap((w) => w.questions.filter((q) => !progress.askedQuestions.includes(w.id + ':' + q.id)).map((q) => w.name + ': ' + q.prompt));
  const inspect = (id: string) => {
    setProgress((p) => ({ ...p, cluesFound: p.cluesFound.includes(id) ? p.cluesFound : [...p.cluesFound, id] }));
    setActiveClue((v) => v === id ? null : id);
  };
  const ask = (witnessId: string, questionId: string) => {
    const key = witnessId + ':' + questionId;
    setProgress((p) => ({ ...p, askedQuestions: p.askedQuestions.includes(key) ? p.askedQuestions : [...p.askedQuestions, key] }));
    setActiveReply(key);
  };
  const selectEvent = (id: string) => {
    if (progress.timelineSolved || progress.timelineOrder.includes(id) || progress.timelineOrder.length >= 4) return;
    const next = [...progress.timelineOrder, id];
    const solved = next.length === 4 && isCase005TimelineCorrect(next);
    setProgress((p) => ({ ...p, timelineOrder: next, timelineSolved: solved }));
    if (next.length === 4) setMessage(solved ? 'Timeline confirmed. The courier left before the locker was opened.' : 'That order conflicts with the receipt and gate sheet. Reset and compare the times.');
  };
  const submit = () => {
    if (!isCase005DeductionCorrect(progress.selectedSuspect, progress.selectedMotive)) {
      setMessage('That conclusion does not explain the signed carbon, registrar credential and blank official copy together.');
      return;
    }
    onArchive({
      caseId: CASE_005_GAME.id, caseTitle: CASE_005_GAME.title, closedAt: new Date().toISOString(),
      selectedSuspectId: progress.selectedSuspect!, selectedMotiveId: progress.selectedMotive!,
      inspectedClues: CASE_005_GAME.clues.filter((c) => progress.cluesFound.includes(c.id)).map((c) => c.title),
      askedQuestions: CASE_005_GAME.witnesses.flatMap((w) => w.questions.filter((q) => progress.askedQuestions.includes(w.id + ':' + q.id)).map((q) => w.name + ': ' + q.prompt)),
      unansweredQuestions: unanswered,
    });
    setProgress((p) => ({ ...p, completed: true }));
    setMessage('');
    setPhase('review');
  };
  const card = { backgroundColor: colors.card, borderColor: colors.border };
  const text = { color: colors.foreground };
  const muted = { color: colors.mutedForeground };
  if (!loaded) return <View style={styles.loading}><Text style={[styles.label, { color: colors.primary }]}>RESTORING CASE 005…</Text></View>;

  return <>
    {phase === 'briefing' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 005 · MISSING DETECTIVE TRAIL</Text>
      <Text style={[styles.hero, text]}>{CASE_005_GAME.title}</Text>
      <Text style={[styles.subtitle, muted]}>{CASE_005_GAME.subtitle}</Text>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>EAST FREIGHT REGISTRY</Text>
        <Text style={[styles.body, text]}>{CASE_005_GAME.briefing}</Text>
        <Text style={[styles.note, muted]}>Earlier files remembered: {carryover.priorFiles.map((r) => r.caseTitle).join(' · ') || 'No earlier files archived'} · {carryover.clueCount} clues preserved.</Text>
      </View>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>PERSONS CONNECTED TO THE RECEIPT</Text>
        {CASE_005_GAME.suspects.map((s) => <View key={s.id} style={styles.person}><Text style={[styles.cardTitle, text]}>{s.name}</Text><Text style={[styles.note, { color: colors.primary }]}>{s.role}</Text><Text style={[styles.note, muted]}>{s.note}</Text></View>)}
      </View>
      <Action title="Begin evidence review" colors={colors} onPress={() => setPhase('evidence')} />
      <Action title="Back to Bureau" colors={colors} onPress={onReturn} ghost />
    </>}
    {phase === 'evidence' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 005 · EVIDENCE</Text>
      <Text style={[styles.hero, text]}>Who received the recorder?</Text>
      <Text style={[styles.subtitle, muted]}>Inspect every record. A signature, an access credential and a courier’s route must agree.</Text>
      <View style={styles.track}><View style={[styles.fill, { width: (progress.cluesFound.length / 4 * 100) + '%', backgroundColor: colors.primary }]} /></View>
      <Text style={[styles.note, muted]}>{progress.cluesFound.length}/4 records logged</Text>
      {CASE_005_GAME.clues.map((c, i) => <Pressable key={c.id} onPress={() => inspect(c.id)} style={[styles.card, card, { borderColor: progress.cluesFound.includes(c.id) ? colors.primary : colors.border }]}><Text style={[styles.label, { color: colors.primary }]}>0{i + 1} · {progress.cluesFound.includes(c.id) ? 'LOGGED' : 'INSPECT'}</Text><Text style={[styles.cardTitle, text]}>{c.title}</Text><Text style={[styles.note, muted]}>{c.label}</Text>{activeClue === c.id && <Text style={[styles.body, muted, styles.divider]}>{c.detail}</Text>}</Pressable>)}
      <Action title="Question the witnesses" colors={colors} onPress={() => setPhase('interviews')} disabled={!allClues} />
      <Action title="Back to briefing" colors={colors} onPress={() => setPhase('briefing')} ghost />
    </>}
    {phase === 'interviews' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 005 · INTERVIEWS</Text>
      <Text style={[styles.hero, text]}>Who controlled the receiving desk?</Text>
      <Text style={[styles.subtitle, muted]}>Ask at least one question to each witness to unlock the timeline. Follow-up questions are optional, but every answer you collect is saved in the case record.</Text>
      {CASE_005_GAME.witnesses.map((w, i) => <View key={w.id} style={[styles.card, card]}><Text style={[styles.cardTitle, text]}>{w.name}</Text><Text style={[styles.note, muted]}>{w.role} · {w.questions.some((q) => progress.askedQuestions.includes(w.id + ':' + q.id)) ? 'HEARD' : 'WITNESS 0' + (i + 1)}</Text>{w.questions.map((q) => { const key = w.id + ':' + q.id; return <View key={key} style={styles.question}><Pressable onPress={() => ask(w.id, q.id)} style={[styles.questionButton, { borderColor: progress.askedQuestions.includes(key) ? colors.primary : colors.border }]}><Text style={[styles.body, text]}>{q.prompt}</Text><Text style={[styles.note, { color: colors.primary }]}>{progress.askedQuestions.includes(key) ? 'ASKED' : 'ASK QUESTION'}</Text></Pressable>{activeReply === key && <Text style={[styles.reply, muted]}>{q.reply}</Text>}</View>; })}</View>)}
      <Text style={[styles.note, muted]}>{heard}/3 witnesses heard · {unanswered.length} questions left unasked</Text>
      <Action title="Reconstruct the timeline" colors={colors} onPress={() => setPhase('timeline')} disabled={!allHeard} />
      <Action title="Back to evidence" colors={colors} onPress={() => setPhase('evidence')} ghost />
    </>}
    {phase === 'timeline' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 005 · TIMELINE</Text>
      <Text style={[styles.hero, text]}>When did the trail change hands?</Text>
      <Text style={[styles.subtitle, muted]}>Put the receipt, courier exit, locker access and audit correction in order.</Text>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>YOUR SEQUENCE</Text>{progress.timelineOrder.map((id, i) => { const e = CASE_005_GAME.timelineEvents.find((x) => x.id === id); return <Text key={id} style={[styles.body, text]}>{i + 1}. {e?.time} — {e?.title}</Text>; })}</View>
      {CASE_005_GAME.timelineEvents.map((e) => <Pressable key={e.id} disabled={progress.timelineSolved || progress.timelineOrder.includes(e.id)} onPress={() => selectEvent(e.id)} style={[styles.card, card, { opacity: progress.timelineOrder.includes(e.id) ? 0.45 : 1 }]}><Text style={[styles.label, { color: colors.primary }]}>{e.time}</Text><Text style={[styles.cardTitle, text]}>{e.title}</Text><Text style={[styles.note, muted]}>{e.detail}</Text></Pressable>)}
      {!!message && <Text style={[styles.note, { color: progress.timelineSolved ? colors.primary : colors.destructive }]}>{message}</Text>}
      {progress.timelineSolved ? <Action title="Make your deduction" colors={colors} onPress={() => { setMessage(''); setPhase('deduction'); }} /> : progress.timelineOrder.length === 4 ? <Action title="Reset sequence and retry" colors={colors} onPress={() => { setProgress((p) => ({ ...p, timelineOrder: [] })); setMessage(''); }} /> : <Text style={[styles.note, muted]}>{progress.timelineOrder.length}/4 events selected</Text>}
      <Action title="Back to interviews" colors={colors} onPress={() => setPhase('interviews')} ghost />
    </>}
    {phase === 'deduction' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 005 · FINAL DEDUCTION</Text>
      <Text style={[styles.hero, text]}>Who hid the destination?</Text>
      <Text style={[styles.subtitle, muted]}>Select the person whose access and paperwork explain the full transfer, then identify the supported motive.</Text>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>WHO CONTROLLED THE LOCKER?</Text>{CASE_005_GAME.suspects.map((s) => <Pressable key={s.id} onPress={() => setProgress((p) => ({ ...p, selectedSuspect: s.id }))} style={[styles.choice, { borderColor: progress.selectedSuspect === s.id ? colors.primary : colors.border, backgroundColor: progress.selectedSuspect === s.id ? colors.secondary : 'transparent' }]}><Text style={[styles.cardTitle, text]}>{s.name}</Text><Text style={[styles.note, muted]}>{s.role}</Text></Pressable>)}</View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>WHY?</Text>{CASE_005_GAME.motives.map((m) => <Pressable key={m.id} onPress={() => setProgress((p) => ({ ...p, selectedMotive: m.id }))} style={[styles.choice, { borderColor: progress.selectedMotive === m.id ? colors.primary : colors.border, backgroundColor: progress.selectedMotive === m.id ? colors.secondary : 'transparent' }]}><Text style={[styles.cardTitle, text]}>{m.label}</Text><Text style={[styles.note, muted]}>{m.note}</Text></Pressable>)}</View>
      {!!message && <Text style={[styles.note, { color: colors.destructive }]}>{message}</Text>}
      <Action title="Submit evidence-based conclusion" colors={colors} onPress={submit} disabled={!allClues || !allHeard || !progress.timelineSolved || !progress.selectedSuspect || !progress.selectedMotive} />
      <Action title="Back to timeline" colors={colors} onPress={() => setPhase('timeline')} ghost />
    </>}
    {phase === 'review' && <>
      <View style={[styles.stamp, { borderColor: colors.primary }]}><Text style={[styles.label, { color: colors.primary }]}>CASE CLOSED · 005</Text></View>
      <Text style={[styles.hero, text]}>The recorder has a location again.</Text>
      <Text style={[styles.subtitle, muted]}>The Bureau recovered the recorder from Locker 14. Its contents remain sealed pending review.</Text>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>TRUTH</Text><Text style={[styles.body, text]}>{CASE_005_GAME.truth}</Text></View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>PROOF</Text><Text style={[styles.body, text]}>{CASE_005_GAME.proof}</Text></View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>OUTCOME</Text><Text style={[styles.body, text]}>{CASE_005_GAME.outcome}</Text></View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>THE MEMORY · CASE 005 ARCHIVED</Text><Text style={[styles.body, text]}>Clues inspected: {progress.cluesFound.length}/4</Text><Text style={[styles.body, text]}>Questions asked: {progress.askedQuestions.length}/6</Text><Text style={[styles.body, text]}>Questions left unasked: {unanswered.length}</Text></View>
      <Action title="Return to Detective Bureau" colors={colors} onPress={onReturn} />
    </>}
  </>;
}

function Action({ title, colors, onPress, disabled = false, ghost = false }: { title: string; colors: ReturnType<typeof useColors>; onPress: () => void; disabled?: boolean; ghost?: boolean }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.action, { backgroundColor: ghost ? 'transparent' : colors.primary, borderColor: ghost ? colors.border : colors.primary, opacity: disabled ? 0.4 : pressed ? 0.75 : 1 }]}><Text style={[styles.actionText, { color: ghost ? colors.foreground : colors.primaryForeground }]}>{title}</Text></Pressable>;
}

const styles = StyleSheet.create({
  loading: { padding: 28 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 1.8, marginBottom: 9 },
  hero: { fontSize: 29, lineHeight: 36, fontWeight: '800' },
  subtitle: { fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 13 },
  body: { fontSize: 14, lineHeight: 22 },
  note: { fontSize: 12, lineHeight: 19, marginTop: 8 },
  divider: { borderTopWidth: 1, borderTopColor: '#344052', marginTop: 13, paddingTop: 12 },
  person: { marginTop: 12 },
  cardTitle: { fontSize: 16, fontWeight: '800', lineHeight: 22 },
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
