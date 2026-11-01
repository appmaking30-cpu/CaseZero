import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import {
  getDailyCaseForDate,
  isDailyCaseSolutionCorrect,
} from '@/game/dailyCaseBulletin';

const SAVE_PREFIX = 'casezero.daily-bulletin.v1.';
type DailyPhase = 'evidence' | 'deduction' | 'review';
type DailyProgress = {
  inspectedClues: string[];
  selectedSuspect: string | null;
  selectedMotive: string | null;
  completed: boolean;
  phase: DailyPhase;
};
const EMPTY_PROGRESS: DailyProgress = {
  inspectedClues: [],
  selectedSuspect: null,
  selectedMotive: null,
  completed: false,
  phase: 'evidence',
};

export default function DailyCaseBulletinScreen({ onReturn, onComplete }: { onReturn: () => void; onComplete?: (dateKey: string) => void }) {
  const colors = useColors();
  const dateKey = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);
  const dailyCase = useMemo(() => getDailyCaseForDate(dateKey), [dateKey]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState<DailyProgress>(EMPTY_PROGRESS);
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(SAVE_PREFIX + dateKey).then((raw) => {
      if (!active) return;
      if (raw) {
        const saved = JSON.parse(raw) as Partial<DailyProgress>;
        const next: DailyProgress = {
          inspectedClues: Array.isArray(saved.inspectedClues) ? saved.inspectedClues.filter((id): id is string => typeof id === 'string') : [],
          selectedSuspect: typeof saved.selectedSuspect === 'string' ? saved.selectedSuspect : null,
          selectedMotive: typeof saved.selectedMotive === 'string' ? saved.selectedMotive : null,
          completed: saved.completed === true,
          phase: saved.phase === 'deduction' || saved.phase === 'review' ? saved.phase : 'evidence',
        };
        setProgress(next);
      }
    }).catch(() => undefined).finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, [dateKey]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(SAVE_PREFIX + dateKey, JSON.stringify(progress)).catch(() => undefined);
  }, [loaded, dateKey, progress]);

  const allCluesInspected = progress.inspectedClues.length === dailyCase.clues.length;
  const card = { backgroundColor: colors.card, borderColor: colors.border };
  const text = { color: colors.foreground };
  const muted = { color: colors.mutedForeground };

  const inspect = (clueId: string) => {
    setProgress((current) => ({
      ...current,
      inspectedClues: current.inspectedClues.includes(clueId) ? current.inspectedClues : [...current.inspectedClues, clueId],
    }));
    setActiveClue((current) => current === clueId ? null : clueId);
  };

  const submit = () => {
    if (!isDailyCaseSolutionCorrect(dailyCase, progress.selectedSuspect, progress.selectedMotive)) {
      setMessage('That conclusion does not match all three records. Recheck the evidence and try again.');
      return;
    }
    setProgress((current) => ({ ...current, completed: true, phase: 'review' }));
    onComplete?.(dateKey);
    setMessage('');
  };

  if (!loaded) return <View style={styles.loading}><Text style={[styles.label, { color: colors.primary }]}>LOADING TODAY’S BRIEF…</Text></View>;

  return (
    <>
      <View style={[styles.stamp, { borderColor: colors.primary }]}>
        <Text style={[styles.label, { color: colors.primary }]}>DAILY CASE BULLETIN · {dateKey}</Text>
      </View>
      {progress.phase === 'evidence' && (
        <>
          <Text style={[styles.hero, text]}>{dailyCase.title}</Text>
          <Text style={[styles.location, { color: colors.primary }]}>{dailyCase.location}</Text>
          <Text style={[styles.subtitle, muted]}>{dailyCase.briefing}</Text>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>FIELD RECORDS</Text>
            <Text style={[styles.note, muted]}>Inspect all three records before making your deduction.</Text>
            {dailyCase.clues.map((clue, index) => {
              const inspected = progress.inspectedClues.includes(clue.id);
              return <Pressable key={clue.id} accessibilityRole="button" accessibilityLabel={`Evidence clue: ${clue.title}`} onPress={() => inspect(clue.id)} style={[styles.clue, { borderColor: inspected ? colors.primary : colors.border }]}>
                <Text style={[styles.label, { color: colors.primary }]}>0{index + 1} · {inspected ? 'LOGGED' : 'INSPECT'}</Text>
                <Text style={[styles.cardTitle, text]}>{clue.title}</Text>
                {activeClue === clue.id && <Text style={[styles.body, muted, styles.detail]}>{clue.detail}</Text>}
              </Pressable>;
            })}
            <Text style={[styles.note, muted]}>{progress.inspectedClues.length} of {dailyCase.clues.length} clues logged</Text>
          </View>
          <Action title="Make your deduction" colors={colors} onPress={() => setProgress((current) => ({ ...current, phase: 'deduction' }))} disabled={!allCluesInspected} />
          <Action title="Back to Detective Bureau" colors={colors} onPress={onReturn} ghost />
        </>
      )}

      {progress.phase === 'deduction' && (
        <>
          <Text style={[styles.hero, text]}>{dailyCase.title}</Text>
          <Text style={[styles.subtitle, muted]}>Use the three records to identify who is responsible and why.</Text>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>WHO IS RESPONSIBLE?</Text>
            {dailyCase.suspects.map((suspect) => <Pressable key={suspect.id} accessibilityRole="button" accessibilityLabel={`Suspect: ${suspect.name}`} onPress={() => setProgress((current) => ({ ...current, selectedSuspect: suspect.id }))} style={[styles.choice, { borderColor: progress.selectedSuspect === suspect.id ? colors.primary : colors.border, backgroundColor: progress.selectedSuspect === suspect.id ? colors.secondary : 'transparent' }]}>
              <Text style={[styles.cardTitle, text]}>{suspect.name}</Text><Text style={[styles.note, muted]}>{suspect.role}</Text>
            </Pressable>)}
          </View>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>WHY?</Text>
            {dailyCase.motives.map((motive) => <Pressable key={motive.id} accessibilityRole="button" accessibilityLabel={`Motive: ${motive.label}`} onPress={() => setProgress((current) => ({ ...current, selectedMotive: motive.id }))} style={[styles.choice, { borderColor: progress.selectedMotive === motive.id ? colors.primary : colors.border, backgroundColor: progress.selectedMotive === motive.id ? colors.secondary : 'transparent' }]}>
              <Text style={[styles.body, text]}>{motive.label}</Text>
            </Pressable>)}
          </View>
          {!!message && <Text style={[styles.note, { color: colors.destructive }]}>{message}</Text>}
          <Action title="Submit conclusion" colors={colors} onPress={submit} disabled={!progress.selectedSuspect || !progress.selectedMotive} />
          <Action title="Review evidence again" colors={colors} onPress={() => setProgress((current) => ({ ...current, phase: 'evidence' }))} ghost />
        </>
      )}

      {progress.phase === 'review' && (
        <>
          <View style={[styles.stamp, { borderColor: colors.primary }]}><Text style={[styles.label, { color: colors.primary }]}>DAILY FILE · CLOSED</Text></View>
          <Text style={[styles.hero, text]}>{dailyCase.title}</Text>
          <Text style={[styles.subtitle, muted]}>Today’s investigation is complete. Your conclusion has been saved on this device.</Text>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>TRUTH</Text>
            <Text style={[styles.body, text]}>{dailyCase.truth}</Text>
          </View>
          <View style={[styles.card, card]}>
            <Text style={[styles.label, { color: colors.primary }]}>PROOF</Text>
            <Text style={[styles.body, text]}>{dailyCase.proof}</Text>
          </View>
          <Text style={[styles.note, muted]}>A new short investigation is selected automatically when the local calendar date changes.</Text>
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
  stamp: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 7, padding: 9, marginTop: 8, marginBottom: 13 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 1.7, marginBottom: 8 },
  hero: { fontSize: 28, lineHeight: 35, fontWeight: '800' },
  location: { fontSize: 12, fontWeight: '800', marginTop: 5, letterSpacing: 0.7 },
  subtitle: { fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 13 },
  clue: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 10 },
  cardTitle: { fontSize: 16, fontWeight: '800', lineHeight: 22 },
  body: { fontSize: 14, lineHeight: 22 },
  note: { fontSize: 12, lineHeight: 19, marginTop: 8 },
  detail: { borderTopWidth: 1, borderTopColor: '#344052', marginTop: 11, paddingTop: 10 },
  choice: { borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 9 },
  action: { minHeight: 48, borderWidth: 1, borderRadius: 13, padding: 13, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  actionText: { fontSize: 13, fontWeight: '900', textAlign: 'center' },
});
