import { LinearGradient } from 'expo-linear-gradient';
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
    <LinearGradient colors={['#1B3044', '#111D2B', '#0A111B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.shell}>
      <View style={styles.topline}>
        <View>
          <Text style={styles.kicker}>CASEZERO  /  FILE {caseNumber}</Text>
          <Text style={styles.status}>{phase === 'review' ? 'ARCHIVED INVESTIGATION' : 'ACTIVE INVESTIGATION'}</Text>
        </View>
        <View style={[styles.phaseStamp, { borderColor: colors.primary }]}>
          <Text style={[styles.phaseStampText, { color: colors.primary }]}>{sequence[activeIndex]?.label ?? 'FILED'}</Text>
        </View>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: progress + '%' }]} />
      </View>
      <View style={styles.steps}>
        {sequence.map((step, index) => {
          const active = index === activeIndex;
          const done = index < activeIndex || phase === 'review';
          return (
            <View key={step.id} style={styles.stepCell}>
              <View style={[styles.stepDot, (active || done) && styles.stepDotActive]} />
              <Text style={[styles.step, (active || done) && styles.stepActive]}>{step.label}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.cornerLine} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  shell: { borderWidth: 1, borderColor: '#3A4B5D', borderRadius: 18, paddingHorizontal: 20, paddingVertical: 16, marginBottom: 18, minHeight: 112, overflow: 'hidden', justifyContent: 'center' },
  topline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  kicker: { color: '#D9BB7A', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  status: { color: '#92A1B1', fontSize: 8, fontWeight: '800', letterSpacing: 1.5, marginTop: 6 },
  phaseStamp: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: 'rgba(8,15,25,0.42)' },
  phaseStampText: { fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  track: { height: 3, borderRadius: 4, overflow: 'hidden', backgroundColor: '#344354', marginTop: 16 },
  fill: { height: 3, borderRadius: 4, backgroundColor: '#D9BB7A' },
  steps: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 13 },
  stepCell: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  stepDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#586779' },
  stepDotActive: { backgroundColor: '#D9BB7A' },
  step: { color: '#77889B', fontSize: 8, fontWeight: '900', letterSpacing: 0.7 },
  stepActive: { color: '#E7D3A5' },
  cornerLine: { position: 'absolute', width: 100, height: 100, borderWidth: 1, borderColor: 'rgba(217,187,122,0.12)', borderRadius: 50, right: -42, top: -54 },
});
