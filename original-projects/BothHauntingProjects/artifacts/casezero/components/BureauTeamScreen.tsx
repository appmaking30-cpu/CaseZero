import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import type { InvestigationArchive } from '@/game/investigationArchive';
import {
  assignBureauSpecialist,
  BUREAU_ASSIGNMENT_TARGETS,
  BUREAU_SPECIALISTS,
  EMPTY_BUREAU_TEAM_BOARD,
  getUnlockedBureauSpecialists,
  removeBureauAssignment,
  type BureauTeamBoard,
} from '@/game/bureauTeam';

const SAVE_KEY = 'casezero.bureau-team.v1';

export default function BureauTeamScreen({ archive, onReturn }: {
  archive: InvestigationArchive;
  onReturn: () => void;
}) {
  const colors = useColors();
  const [loaded, setLoaded] = useState(false);
  const [board, setBoard] = useState<BureauTeamBoard>(EMPTY_BUREAU_TEAM_BOARD);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const unlocked = useMemo(() => getUnlockedBureauSpecialists(archive), [archive]);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(SAVE_KEY).then((raw) => {
      if (!active) return;
      if (raw) {
        const saved = JSON.parse(raw) as Partial<BureauTeamBoard>;
        if (saved.version === 1 && Array.isArray(saved.assignments)) {
          setBoard({
            version: 1,
            assignments: saved.assignments.filter((item): item is BureauTeamBoard['assignments'][number] =>
              Boolean(item && typeof item.specialistId === 'string' && typeof item.targetId === 'string' && typeof item.assignedAt === 'string')),
          });
        }
      }
    }).catch(() => undefined).finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(SAVE_KEY, JSON.stringify(board)).catch(() => undefined);
  }, [loaded, board]);

  const card = { backgroundColor: colors.card, borderColor: colors.border };
  const text = { color: colors.foreground };
  const muted = { color: colors.mutedForeground };

  const assign = () => {
    if (!selectedSpecialist || !selectedTarget || !unlocked.some((specialist) => specialist.id === selectedSpecialist)) {
      setMessage('Choose an unlocked specialist and an assignment target.');
      return;
    }
    setBoard((current) => assignBureauSpecialist(current, selectedSpecialist, selectedTarget, new Date().toISOString()));
    const name = BUREAU_SPECIALISTS.find((specialist) => specialist.id === selectedSpecialist)?.name ?? 'Specialist';
    const target = BUREAU_ASSIGNMENT_TARGETS.find((item) => item.id === selectedTarget)?.label ?? 'file';
    setMessage(`${name} assigned to ${target}.`);
  };

  if (!loaded) return <View style={styles.loading}><Text style={[styles.label, { color: colors.primary }]}>RESTORING BUREAU ROSTER…</Text></View>;

  return (
    <>
      <View style={[styles.stamp, { borderColor: colors.primary }]}><Text style={[styles.label, { color: colors.primary }]}>BUREAU OPERATIONS</Text></View>
      <Text style={[styles.hero, text]}>Specialist Team</Text>
      <Text style={[styles.subtitle, muted]}>Recruit trusted specialists as the campaign advances, then assign one specialist to each active file. Assignments are saved on this device.</Text>
      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>ROSTER STATUS</Text>
        <Text style={[styles.heroSmall, text]}>{unlocked.length} / {BUREAU_SPECIALISTS.length} specialists recruited</Text>
        <Text style={[styles.note, muted]}>{board.assignments.length} active file assignments</Text>
      </View>

      <Text style={[styles.section, { color: colors.primary }]}>SPECIALIST ROSTER</Text>
      {BUREAU_SPECIALISTS.map((specialist) => {
        const isUnlocked = unlocked.some((entry) => entry.id === specialist.id);
        const currentAssignment = board.assignments.find((assignment) => assignment.specialistId === specialist.id);
        const assignedTarget = BUREAU_ASSIGNMENT_TARGETS.find((target) => target.id === currentAssignment?.targetId);
        const selected = selectedSpecialist === specialist.id;
        return <Pressable key={specialist.id} accessibilityRole="button" disabled={!isUnlocked} onPress={() => { setSelectedSpecialist(specialist.id); setMessage(''); }} style={[styles.card, card, { borderColor: selected ? colors.primary : colors.border, opacity: isUnlocked ? 1 : 0.58 }]}>
          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={[styles.cardTitle, text]}>{specialist.name}</Text>
              <Text style={[styles.note, { color: colors.primary }]}>{specialist.role}</Text>
            </View>
            <Text style={[styles.status, { color: isUnlocked ? colors.primary : colors.mutedForeground }]}>{isUnlocked ? selected ? 'SELECTED' : 'RECRUITED' : 'LOCKED'}</Text>
          </View>
          <Text style={[styles.note, muted]}>{specialist.specialty}</Text>
          <Text style={[styles.body, text]}>{specialist.profile}</Text>
          {assignedTarget && <Text style={[styles.note, { color: colors.primary }]}>Currently assigned: {assignedTarget.label}</Text>}
          {!isUnlocked && <Text style={[styles.note, muted]}>Unlock requirement: {specialist.unlockLabel}</Text>}
        </Pressable>;
      })}

      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>ASSIGNMENT BOARD</Text>
        <Text style={[styles.body, muted]}>Select a recruited specialist, then choose the file they will support. A specialist can hold one assignment at a time, and each file can have one assigned specialist.</Text>
        <Text style={[styles.section, { color: colors.primary }]}>1 · SELECT FILE</Text>
        {BUREAU_ASSIGNMENT_TARGETS.map((target) => {
          const selected = selectedTarget === target.id;
          const existing = board.assignments.find((assignment) => assignment.targetId === target.id);
          const existingName = BUREAU_SPECIALISTS.find((specialist) => specialist.id === existing?.specialistId)?.name;
          return <Pressable key={target.id} accessibilityRole="button" onPress={() => { setSelectedTarget(target.id); setMessage(''); }} style={[styles.option, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
            <Text style={[styles.body, text]}>{target.label}</Text>
            <Text style={[styles.note, muted]}>{existingName ? `Assigned: ${existingName}` : 'Unassigned'}</Text>
          </Pressable>;
        })}
        <Text style={[styles.section, { color: colors.primary }]}>2 · CONFIRM ASSIGNMENT</Text>
        <Text style={[styles.note, muted]}>Selected specialist: {BUREAU_SPECIALISTS.find((specialist) => specialist.id === selectedSpecialist)?.name ?? 'None'}</Text>
        <Action title="Assign specialist" colors={colors} onPress={assign} disabled={!selectedSpecialist || !selectedTarget} />
        {!!message && <Text style={[styles.note, { color: colors.primary }]}>{message}</Text>}
      </View>

      <View style={[styles.card, card]}>
        <Text style={[styles.label, { color: colors.primary }]}>CURRENT ASSIGNMENTS</Text>
        {board.assignments.length === 0
          ? <Text style={[styles.body, muted]}>No specialists assigned yet.</Text>
          : board.assignments.map((assignment) => {
            const specialist = BUREAU_SPECIALISTS.find((entry) => entry.id === assignment.specialistId);
            const target = BUREAU_ASSIGNMENT_TARGETS.find((entry) => entry.id === assignment.targetId);
            return <View key={assignment.targetId} style={styles.assignment}>
              <View style={styles.flex}>
                <Text style={[styles.cardTitle, text]}>{specialist?.name ?? 'Unknown specialist'}</Text>
                <Text style={[styles.note, muted]}>{target?.label ?? assignment.targetId}</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={() => setBoard((current) => removeBureauAssignment(current, assignment.targetId))}>
                <Text style={[styles.remove, { color: colors.destructive }]}>REMOVE</Text>
              </Pressable>
            </View>;
          })}
      </View>
      <Text style={[styles.note, muted]}>This is the first roster-and-assignment layer. Specialist abilities and training upgrades will be connected to investigation gameplay in a later Bureau systems pass.</Text>
      <Action title="Return to Detective Bureau" colors={colors} onPress={onReturn} />
    </>
  );
}

function Action({ title, colors, onPress, disabled = false }: {
  title: string;
  colors: ReturnType<typeof useColors>;
  onPress: () => void;
  disabled?: boolean;
}) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.action, { backgroundColor: colors.primary, borderColor: colors.primary, opacity: disabled ? 0.4 : pressed ? 0.75 : 1 }]}>
    <Text style={[styles.actionText, { color: colors.primaryForeground }]}>{title}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  loading: { padding: 28 },
  stamp: { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 7, padding: 9, marginTop: 8, marginBottom: 13 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 1.7, marginBottom: 8 },
  hero: { fontSize: 29, lineHeight: 36, fontWeight: '800' },
  heroSmall: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 12 },
  section: { fontSize: 10, fontWeight: '900', letterSpacing: 1.6, marginTop: 15, marginBottom: 8 },
  cardTitle: { fontSize: 16, lineHeight: 22, fontWeight: '800' },
  body: { fontSize: 13, lineHeight: 20, marginTop: 8 },
  note: { fontSize: 12, lineHeight: 19, marginTop: 7 },
  status: { fontSize: 9, fontWeight: '900', letterSpacing: 1.1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1 },
  option: { borderWidth: 1, borderRadius: 11, padding: 11, marginTop: 8 },
  assignment: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  remove: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  action: { minHeight: 48, borderWidth: 1, borderRadius: 13, padding: 13, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  actionText: { fontSize: 13, fontWeight: '900', textAlign: 'center' },
});
