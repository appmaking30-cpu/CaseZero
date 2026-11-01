import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { CASE_006_GAME, CASE_006_EMPTY_PROGRESS, isCase006OrderCorrect } from '@/game/case006Game';
import { archiveCompletedCase, type InvestigationArchive } from '@/game/investigationArchive';

const SAVE_KEY = 'casezero.case006.progress.v1';
type Progress = typeof CASE_006_EMPTY_PROGRESS;
type Props = {
  archive: InvestigationArchive;
  onArchive: (record: Parameters<typeof archiveCompletedCase>[1]) => void;
  onReturn: () => void;
};

export default function Case006Screen({ archive, onArchive, onReturn }: Props) {
  const colors = useColors();
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<'briefing' | 'fragments' | 'sequence' | 'conclusion' | 'review'>('briefing');
  const [progress, setProgress] = useState<Progress>(CASE_006_EMPTY_PROGRESS);
  const [activeFragment, setActiveFragment] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(SAVE_KEY).then((raw) => {
      if (!active || !raw) return;
      const saved = JSON.parse(raw) as Partial<Progress>;
      const fragmentIds = new Set(CASE_006_GAME.fragments.map((item) => item.id));
      const heard = Array.isArray(saved.heardFragments)
        ? [...new Set(saved.heardFragments.filter((id): id is string => typeof id === 'string' && fragmentIds.has(id)))]
        : [];
      const order = Array.isArray(saved.order)
        ? [...new Set(saved.order.filter((id): id is string => typeof id === 'string' && fragmentIds.has(id)))].slice(0, 3)
        : [];
      const validOrder = saved.completed === true && isCase006OrderCorrect(order);
      const sourceIds = new Set(CASE_006_GAME.sources.map((item) => item.id));
      const restored: Progress = {
        heardFragments: heard,
        order: validOrder ? [...order] : order,
        selectedSource: typeof saved.selectedSource === 'string' && sourceIds.has(saved.selectedSource) ? saved.selectedSource : null,
        completed: validOrder && saved.selectedSource === CASE_006_GAME.correctSource,
      };
      setProgress(restored);
      if (restored.completed) setPhase('review');
      else if (heard.length) setPhase('fragments');
    }).catch(() => undefined).finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(SAVE_KEY, JSON.stringify(progress)).catch(() => undefined);
  }, [loaded, progress]);

  const heardAll = progress.heardFragments.length === CASE_006_GAME.fragments.length;
  const sequenceCorrect = isCase006OrderCorrect(progress.order);
  const card = { backgroundColor: colors.card, borderColor: colors.border };
  const text = { color: colors.foreground };
  const muted = { color: colors.mutedForeground };

  const archiveCase = () => {
    if (progress.completed || !sequenceCorrect || progress.selectedSource !== CASE_006_GAME.correctSource) return;
    onArchive({
      caseId: CASE_006_GAME.id,
      caseTitle: CASE_006_GAME.title,
      closedAt: new Date().toISOString(),
      selectedSuspectId: 'dispatch-control',
      selectedMotiveId: 'conceal-authority',
      inspectedClues: CASE_006_GAME.fragments.map((fragment) => fragment.title),
      askedQuestions: [],
      unansweredQuestions: [],
    });
    setProgress((current) => ({ ...current, completed: true }));
    setMessage('');
    setPhase('review');
  };

  const selectFragment = (id: string) => {
    setProgress((current) => ({
      ...current,
      heardFragments: current.heardFragments.includes(id) ? current.heardFragments : [...current.heardFragments, id],
    }));
    setActiveFragment((current) => current === id ? null : id);
  };

  const addToOrder = (id: string) => {
    if (progress.order.includes(id) || progress.order.length >= 3) return;
    setProgress((current) => ({ ...current, order: [...current.order, id] }));
    setMessage('');
  };

  if (!loaded) return <View style={styles.loading}><Text style={[styles.label, { color: colors.primary }]}>RESTORING RECORDER REVIEW…</Text></View>;

  return <>
    {phase === 'briefing' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 006 · CLASSIFIED AUDIO REVIEW</Text>
      <Text style={[styles.hero, text]}>{CASE_006_GAME.title}</Text>
      <Text style={[styles.subtitle, muted]}>{CASE_006_GAME.subtitle}</Text>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>SEALED REVIEW ROOM</Text>
        <Text style={[styles.body, text]}>{CASE_006_GAME.briefing}</Text>
        <Text style={[styles.note, muted]}>The recording is represented as transcript fragments. The original audio remains preserved as evidence.</Text>
      </View>
      <Action title="Begin transcript review" colors={colors} onPress={() => setPhase('fragments')} />
      <Action title="Back to Bureau" colors={colors} onPress={onReturn} ghost />
    </>}

    {phase === 'fragments' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 006 · RECOVERED FRAGMENTS</Text>
      <Text style={[styles.hero, text]}>Three pieces. One instruction.</Text>
      <Text style={[styles.subtitle, muted]}>Open each fragment and read it carefully. Their timestamps will matter when reconstructing the instruction.</Text>
      <View style={styles.track}><View style={[styles.fill, { width: (progress.heardFragments.length / 3 * 100) + '%', backgroundColor: colors.primary }]} /></View>
      <Text style={[styles.note, muted]}>{progress.heardFragments.length}/3 fragments reviewed</Text>
      {CASE_006_GAME.fragments.map((fragment) => <Pressable key={fragment.id} onPress={() => selectFragment(fragment.id)} style={[styles.card, card, { borderColor: progress.heardFragments.includes(fragment.id) ? colors.primary : colors.border }]}>
        <Text style={[styles.label, { color: colors.primary }]}>{fragment.time} · {progress.heardFragments.includes(fragment.id) ? 'REVIEWED' : 'OPEN FRAGMENT'}</Text>
        <Text style={[styles.cardTitle, text]}>{fragment.title}</Text>
        <Text style={[styles.note, muted]}>{fragment.note}</Text>
        {activeFragment === fragment.id && <Text style={[styles.transcript, text]}>“{fragment.text}”</Text>}
      </Pressable>)}
      <Action title="Reconstruct the instruction" colors={colors} onPress={() => setPhase('sequence')} disabled={!heardAll} />
      <Action title="Back to briefing" colors={colors} onPress={() => setPhase('briefing')} ghost />
    </>}

    {phase === 'sequence' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 006 · SEQUENCE ANALYSIS</Text>
      <Text style={[styles.hero, text]}>What happened first?</Text>
      <Text style={[styles.subtitle, muted]}>Arrange the fragments by their timestamps, earliest to latest.</Text>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>YOUR SEQUENCE</Text>
        {progress.order.length === 0 ? <Text style={[styles.note, muted]}>No fragments placed yet.</Text> : progress.order.map((id, index) => {
          const fragment = CASE_006_GAME.fragments.find((item) => item.id === id);
          return <Text key={id} style={[styles.body, text]}>{index + 1}. {fragment?.time} — {fragment?.title}</Text>;
        })}
      </View>
      {CASE_006_GAME.fragments.map((fragment) => <Pressable key={fragment.id} disabled={progress.order.includes(fragment.id) || progress.order.length === 3} onPress={() => addToOrder(fragment.id)} style={[styles.card, card, { opacity: progress.order.includes(fragment.id) ? 0.4 : 1 }]}>
        <Text style={[styles.label, { color: colors.primary }]}>{fragment.time}</Text>
        <Text style={[styles.cardTitle, text]}>{fragment.title}</Text>
      </Pressable>)}
      {!!message && <Text style={[styles.note, { color: colors.destructive }]}>{message}</Text>}
      {progress.order.length === 3 ? sequenceCorrect
        ? <Action title="Sequence confirmed" colors={colors} onPress={() => { setMessage(''); setPhase('conclusion'); }} />
        : <Action title="Reset sequence and retry" colors={colors} onPress={() => { setProgress((current) => ({ ...current, order: [] })); setMessage(''); }} />
        : <Text style={[styles.note, muted]}>{progress.order.length}/3 fragments placed</Text>}
      <Action title="Back to fragments" colors={colors} onPress={() => setPhase('fragments')} ghost />
    </>}

    {phase === 'conclusion' && <>
      <Text style={[styles.label, { color: colors.primary }]}>CASE 006 · EVIDENCE CONCLUSION</Text>
      <Text style={[styles.hero, text]}>Who issued the instruction?</Text>
      <Text style={[styles.subtitle, muted]}>The transcript does not identify a person. Choose the level of authority supported by the recording, not a name you cannot prove.</Text>
      {CASE_006_GAME.sources.map((source) => <Pressable key={source.id} onPress={() => setProgress((current) => ({ ...current, selectedSource: source.id }))} style={[styles.card, card, { borderColor: progress.selectedSource === source.id ? colors.primary : colors.border }]}>
        <Text style={[styles.cardTitle, text]}>{source.label}</Text>
        <Text style={[styles.note, muted]}>{source.note}</Text>
      </Pressable>)}
      {!!message && <Text style={[styles.note, { color: colors.destructive }]}>{message}</Text>}
      <Action title="Submit conclusion" colors={colors} onPress={() => {
        if (progress.selectedSource !== CASE_006_GAME.correctSource) {
          setMessage('The recording proves an active transfer authority, but it does not identify the registrar or the audit supervisor as its source.');
          return;
        }
        archiveCase();
      }} disabled={!sequenceCorrect || !progress.selectedSource} />
      <Action title="Back to sequence" colors={colors} onPress={() => setPhase('sequence')} ghost />
    </>}

    {phase === 'review' && <>
      <View style={[styles.stamp, { borderColor: colors.primary }]}><Text style={[styles.label, { color: colors.primary }]}>REVIEW FILED · 006</Text></View>
      <Text style={[styles.hero, text]}>The voice has no name. The order does.</Text>
      <Text style={[styles.subtitle, muted]}>The Bureau has confirmed the transfer instruction without overstating what the recording can prove.</Text>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>FINDING</Text><Text style={[styles.body, text]}>{CASE_006_GAME.truth}</Text></View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>PROOF</Text><Text style={[styles.body, text]}>{CASE_006_GAME.proof}</Text></View>
      <View style={[styles.card, card]}><Text style={[styles.label, { color: colors.primary }]}>OUTCOME</Text><Text style={[styles.body, text]}>{CASE_006_GAME.outcome}</Text></View>
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
  transcript: { fontSize: 14, lineHeight: 23, marginTop: 14, fontStyle: 'italic' },
  cardTitle: { fontSize: 16, fontWeight: '800', lineHeight: 22 },
  track: { height: 5, borderRadius: 4, overflow: 'hidden', marginTop: 12, backgroundColor: '#263244' },
  fill: { height: 5, borderRadius: 4 },
  stamp: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 7, padding: 9, marginBottom: 14 },
  action: { minHeight: 48, borderWidth: 1, borderRadius: 13, padding: 13, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  actionText: { fontSize: 13, fontWeight: '900', textAlign: 'center' },
});
