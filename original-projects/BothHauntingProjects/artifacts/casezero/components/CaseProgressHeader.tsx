import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

type Phase = 'briefing' | 'evidence' | 'interviews' | 'timeline' | 'deduction' | 'review' | 'fragments' | 'sequence' | 'conclusion';

const STEPS: { id: Phase; label: string }[] = [
  { id: 'briefing', label: 'BRIEF' },
  { id: 'evidence', label: 'CLUES' },
  { id: 'interviews', label: 'WITNESSES' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'deduction', label: 'DEDUCTION' },
  { id: 'review', label: 'FILED' },
];

export default function CaseProgressHeader({ caseNumber, phase }: { caseNumber: string; phase: Phase }) {
  const colors = useColors();
  const sequence = phase === 'fragments' || phase === 'sequence' || phase === 'conclusion'
    ? [{ id: 'briefing', label: 'BRIEF' }, { id: 'fragments', label: 'RECORD' }, { id: 'sequence', label: 'ORDER' }, { id: 'conclusion', label: 'FINDING' }]
    : STEPS;
  const activeIndex = Math.max(0, sequence.findIndex((step) => step.id === phase));
  const progress = phase === 'review' ? 100 : ((activeIndex + 1) / sequence.length) * 100;

  return (
    <View style={[styles.shell, { borderColor: colors.border, backgroundColor: colors.card }]}>
      <View style={styles.topline}>
        <Text style={[styles.kicker, { color: colors.primary }]}>CASE FILE {caseNumber}</Text>
        <Text style={[styles.status, { color: colors.mutedForeground }]}>{phase === 'review' ? 'ARCHIVED' : 'ACTIVE INVESTIGATION'}</Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.border }]}>
        <View style={[styles.fill, { width: progress + '%', backgroundColor: colors.primary }]} />
      </View>
      <View style={styles.steps}>
        {sequence.map((step, index) => (
          <Text key={step.id} style={[styles.step, { color: index <= activeIndex ? colors.primary : colors.mutedForeground }]}>{step.label}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { borderWidth: 1, borderRadius: 14, padding: 13, marginBottom: 15 },
  topline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  kicker: { fontSize: 10, fontWeight: '900', letterSpacing: 1.8 },
  status: { fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  track: { height: 4, borderRadius: 5, overflow: 'hidden', marginTop: 12 },
  fill: { height: 4, borderRadius: 5 },
  steps: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 },
  step: { fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
});
