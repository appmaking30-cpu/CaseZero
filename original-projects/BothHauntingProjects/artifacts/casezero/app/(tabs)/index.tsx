import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import Case004Screen from '@/components/Case004Screen';
import Case005Screen from '@/components/Case005Screen';
import DailyCaseBulletinScreen from '@/components/DailyCaseBulletinScreen';
import BureauTeamScreen from '@/components/BureauTeamScreen';
import { CASE_004_GAME } from '@/game/case004Game';
import { CASE_005_GAME } from '@/game/case005Game';
import {
  CASE_001,
  getInvestigationMemory,
  isDeductionCorrect,
  isTimelineCorrect,
  type CasePhase,
} from '@/game/case001';
import {
  archiveCompletedCase,
  EMPTY_INVESTIGATION_ARCHIVE,
  type InvestigationArchive,
} from '@/game/investigationArchive';
import { CASE_002, getCase002Carryover } from '@/game/case002';
import {
  BUREAU_TEAM_SAVE_KEY,
  BUREAU_SPECIALISTS,
  EMPTY_BUREAU_TEAM_BOARD,
  getBureauSpecialistInsight,
  getBureauSpecialistProgress,
  awardBureauCaseExperience,
  awardBureauDailyExperience,
  restoreBureauTeamBoard,
  parseStoredJson,
  type BureauTeamBoard,
} from '@/game/bureauTeam';
import { getMissingDetectiveArcStatus, getMissingDetectiveConvergence, MISSING_DETECTIVE_DOSSIER } from '@/game/missingDetectiveArc';
import {
  CASE_003_GAME,
  EMPTY_CASE003_PROGRESS,
  getCase003Carryover,
  getCase003QuestionReply,
  isCase003DeductionCorrect,
  isCase003TimelineCorrect,
  type Case003Phase,
  type Case003Progress,
} from '@/game/case003Game';
import {
  CASE_002_GAME,
  EMPTY_CASE002_PROGRESS,
  getCase002QuestionReply,
  isCase002DeductionCorrect,
  isCase002TimelineCorrect,
  type Case002Phase,
  type Case002Progress,
} from '@/game/case002Game';

const SAVE_KEY = 'casezero.case001.memory.v1';
const ARCHIVE_KEY = 'casezero.investigation.archive.v1';
const CASE002_SAVE_KEY = 'casezero.case002.progress.v1';
const CASE003_SAVE_KEY = 'casezero.case003.progress.v1';
type AppPhase = CasePhase | Case002Phase | Case003Phase | 'case004' | 'case005' | 'daily' | 'team';

type SavedState = {
  phase: AppPhase;
  cluesFound: string[];
  askedQuestions: string[];
  timelineOrder: string[];
  timelineSolved: boolean;
  timelineAttempts: number;
  selectedSuspect: string | null;
  selectedMotive: string | null;
  caseCompleted: boolean;
};

type Palette = ReturnType<typeof useColors>;

function ActionButton({
  title,
  onPress,
  colors,
  disabled = false,
  variant = 'primary',
}: {
  title: string;
  onPress: () => void;
  colors: Palette;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
        ? colors.secondary
        : 'transparent';
  const textColor =
    variant === 'primary' ? colors.primaryForeground : colors.foreground;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        {
          backgroundColor,
          borderColor: variant === 'ghost' ? colors.border : backgroundColor,
          opacity: disabled ? 0.42 : pressed ? 0.78 : 1,
        },
      ]}
    >
      <Text style={[styles.actionButtonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

function SectionLabel({
  children,
  colors,
}: {
  children: string;
  colors: Palette;
}) {
  return (
    <Text style={[styles.sectionLabel, { color: colors.primary }]}>
      {children}
    </Text>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const [loaded, setLoaded] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);
  const [investigationArchive, setInvestigationArchive] = useState<InvestigationArchive>(EMPTY_INVESTIGATION_ARCHIVE);
  const [bureauTeamBoard, setBureauTeamBoard] = useState<BureauTeamBoard>(EMPTY_BUREAU_TEAM_BOARD);
  const [phase, setPhase] = useState<AppPhase>('hq');
  const [case002Progress, setCase002Progress] = useState<Case002Progress>(EMPTY_CASE002_PROGRESS);
  const [case003Progress, setCase003Progress] = useState<Case003Progress>(EMPTY_CASE003_PROGRESS);
  const [case003ActiveClue, setCase003ActiveClue] = useState<string | null>(null);
  const [case003ActiveReply, setCase003ActiveReply] = useState<string | null>(null);
  const [case003TimelineMessage, setCase003TimelineMessage] = useState('');
  const [case003DeductionMessage, setCase003DeductionMessage] = useState('');
  const [case002ActiveClue, setCase002ActiveClue] = useState<string | null>(null);
  const [case002ActiveReply, setCase002ActiveReply] = useState<string | null>(null);
  const [case002TimelineMessage, setCase002TimelineMessage] = useState('');
  const [case002DeductionMessage, setCase002DeductionMessage] = useState('');
  const [cluesFound, setCluesFound] = useState<string[]>([]);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [timelineOrder, setTimelineOrder] = useState<string[]>([]);
  const [timelineSolved, setTimelineSolved] = useState(false);
  const [timelineAttempts, setTimelineAttempts] = useState(0);
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [selectedMotive, setSelectedMotive] = useState<string | null>(null);
  const [caseCompleted, setCaseCompleted] = useState(false);
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [timelineMessage, setTimelineMessage] = useState('');
  const [deductionMessage, setDeductionMessage] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([
      AsyncStorage.getItem(SAVE_KEY),
      AsyncStorage.getItem(ARCHIVE_KEY),
      AsyncStorage.getItem(CASE002_SAVE_KEY),
      AsyncStorage.getItem(CASE003_SAVE_KEY),
      AsyncStorage.getItem(BUREAU_TEAM_SAVE_KEY),
    ])
      .then(([raw, archiveRaw, case002Raw, case003Raw, teamRaw]) => {
        if (!active) return;
        let restoredArchive = EMPTY_INVESTIGATION_ARCHIVE;
        if (archiveRaw) {
          const parsedArchive = parseStoredJson(archiveRaw) as InvestigationArchive | null;
          if (parsedArchive && typeof parsedArchive === 'object' && parsedArchive.version === 1 && Array.isArray(parsedArchive.completedCases)) {
            restoredArchive = parsedArchive;
            setInvestigationArchive(parsedArchive);
          }
        }
        setBureauTeamBoard(restoreBureauTeamBoard(teamRaw, restoredArchive));
        if (case003Raw) {
          const parsed = parseStoredJson(case003Raw) as Partial<Case003Progress> | null;
          if (parsed && typeof parsed === 'object') {
            setCase003Progress({
              cluesFound: Array.isArray(parsed.cluesFound) ? parsed.cluesFound.filter((id): id is string => typeof id === 'string') : [],
              askedQuestions: Array.isArray(parsed.askedQuestions) ? parsed.askedQuestions.filter((key): key is string => typeof key === 'string') : [],
              timelineOrder: Array.isArray(parsed.timelineOrder) ? parsed.timelineOrder.filter((id): id is string => typeof id === 'string') : [],
              timelineSolved: typeof parsed.timelineSolved === 'boolean' ? parsed.timelineSolved : false,
              selectedSuspect: typeof parsed.selectedSuspect === 'string' ? parsed.selectedSuspect : null,
              selectedMotive: typeof parsed.selectedMotive === 'string' ? parsed.selectedMotive : null,
              completed: typeof parsed.completed === 'boolean' ? parsed.completed : false,
            });
          }
        }
        if (case002Raw) {
          const parsedCase002 = parseStoredJson(case002Raw) as Partial<Case002Progress> | null;
          if (parsedCase002 && typeof parsedCase002 === 'object') {
            setCase002Progress({
              cluesFound: Array.isArray(parsedCase002.cluesFound)
                ? parsedCase002.cluesFound.filter((id): id is string => typeof id === 'string')
                : [],
              askedQuestions: Array.isArray(parsedCase002.askedQuestions)
                ? parsedCase002.askedQuestions.filter((key): key is string => typeof key === 'string')
                : [],
              timelineOrder: Array.isArray(parsedCase002.timelineOrder)
                ? parsedCase002.timelineOrder.filter((id): id is string => typeof id === 'string')
                : [],
              timelineSolved: typeof parsedCase002.timelineSolved === 'boolean'
                ? parsedCase002.timelineSolved
                : false,
              selectedSuspect: typeof parsedCase002.selectedSuspect === 'string'
                ? parsedCase002.selectedSuspect
                : null,
              selectedMotive: typeof parsedCase002.selectedMotive === 'string'
                ? parsedCase002.selectedMotive
                : null,
              completed: typeof parsedCase002.completed === 'boolean'
                ? parsedCase002.completed
                : false,
            });
          }
        }
        if (!active) return;
        const saved = parseStoredJson(raw) as Partial<SavedState> | null;
        if (saved && typeof saved === 'object') {
          if (Array.isArray(saved.cluesFound)) setCluesFound(saved.cluesFound);
          if (Array.isArray(saved.askedQuestions)) setAskedQuestions(saved.askedQuestions);
          if (Array.isArray(saved.timelineOrder)) setTimelineOrder(saved.timelineOrder);
          if (typeof saved.timelineSolved === 'boolean') setTimelineSolved(saved.timelineSolved);
          if (typeof saved.timelineAttempts === 'number') setTimelineAttempts(saved.timelineAttempts);
          if (typeof saved.selectedSuspect === 'string' || saved.selectedSuspect === null) {
            setSelectedSuspect(saved.selectedSuspect ?? null);
          }
          if (typeof saved.selectedMotive === 'string' || saved.selectedMotive === null) {
            setSelectedMotive(saved.selectedMotive ?? null);
          }
          if (typeof saved.caseCompleted === 'boolean') setCaseCompleted(saved.caseCompleted);
          if (saved.phase) setPhase(saved.phase);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) {
          setLoaded(true);
          setArchiveLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const saved: SavedState = {
      phase,
      cluesFound,
      askedQuestions,
      timelineOrder,
      timelineSolved,
      timelineAttempts,
      selectedSuspect,
      selectedMotive,
      caseCompleted,
    };
    AsyncStorage.setItem(SAVE_KEY, JSON.stringify(saved)).catch(() => undefined);
  }, [
    loaded,
    phase,
    cluesFound,
    askedQuestions,
    timelineOrder,
    timelineSolved,
    timelineAttempts,
    selectedSuspect,
    selectedMotive,
    caseCompleted,
  ]);

  useEffect(() => {
    if (!archiveLoaded) return;
    AsyncStorage.setItem(ARCHIVE_KEY, JSON.stringify(investigationArchive)).catch(() => undefined);
  }, [archiveLoaded, investigationArchive]);

  useEffect(() => {
    if (!archiveLoaded) return;
    AsyncStorage.setItem(BUREAU_TEAM_SAVE_KEY, JSON.stringify(bureauTeamBoard)).catch(() => undefined);
  }, [archiveLoaded, bureauTeamBoard]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(CASE002_SAVE_KEY, JSON.stringify(case002Progress)).catch(() => undefined);
  }, [loaded, case002Progress]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(CASE003_SAVE_KEY, JSON.stringify(case003Progress)).catch(() => undefined);
  }, [loaded, case003Progress]);

  const allCluesFound = cluesFound.length === CASE_001.clues.length;
  const witnessCount = useMemo(
    () =>
      CASE_001.witnesses.filter((witness) =>
        witness.questions.some((question) =>
          askedQuestions.includes(`${witness.id}:${question.id}`),
        ),
      ).length,
    [askedQuestions],
  );
  const allWitnessesHeard = witnessCount === CASE_001.witnesses.length;
  const unansweredQuestions = useMemo(
    () =>
      CASE_001.witnesses.reduce(
        (total, witness) =>
          total +
          witness.questions.filter(
            (question) =>
              !askedQuestions.includes(`${witness.id}:${question.id}`),
          ).length,
        0,
      ),
    [askedQuestions],
  );

  const investigationMemory = useMemo(
    () => getInvestigationMemory(cluesFound, askedQuestions),
    [cluesFound, askedQuestions],
  );
  const case002Carryover = useMemo(
    () => getCase002Carryover(investigationArchive),
    [investigationArchive],
  );
  const missingDetectiveArc = useMemo(
    () => getMissingDetectiveArcStatus(investigationArchive),
    [investigationArchive],
  );
  const missingDetectiveConvergence = useMemo(
    () => getMissingDetectiveConvergence(investigationArchive),
    [investigationArchive],
  );
  const case003Carryover = useMemo(() => getCase003Carryover(investigationArchive), [investigationArchive]);

  const case001Archived = investigationArchive.completedCases.some(
    (record) => record.caseId === CASE_001.id,
  );

  useEffect(() => {
    if (!loaded || !archiveLoaded || !caseCompleted || !selectedSuspect || !selectedMotive) return;
    const alreadyArchived = investigationArchive.completedCases.some(
      (record) => record.caseId === CASE_001.id,
    );
    if (alreadyArchived) return;

    const record = {
      caseId: CASE_001.id,
      caseTitle: CASE_001.title,
      closedAt: new Date().toISOString(),
      selectedSuspectId: selectedSuspect,
      selectedMotiveId: selectedMotive,
      inspectedClues: investigationMemory.inspectedClues,
      askedQuestions: investigationMemory.askedQuestions,
      unansweredQuestions: investigationMemory.unansweredQuestions,
    };
    setInvestigationArchive((current) => archiveCompletedCase(current, record));
  }, [
    loaded,
    archiveLoaded,
    caseCompleted,
    selectedSuspect,
    selectedMotive,
    investigationMemory,
    investigationArchive.completedCases,
  ]);

  const resetCase = () => {
    setPhase('hq');
    setCluesFound([]);
    setAskedQuestions([]);
    setTimelineOrder([]);
    setTimelineSolved(false);
    setTimelineAttempts(0);
    setSelectedSuspect(null);
    setSelectedMotive(null);
    setCaseCompleted(false);
    setActiveClue(null);
    setActiveReply(null);
    setTimelineMessage('');
    setDeductionMessage('');
    AsyncStorage.removeItem(SAVE_KEY).catch(() => undefined);
  };

  const openCase = () => setPhase(caseCompleted ? 'review' : 'briefing');

  const inspectClue = (clueId: string) => {
    setCluesFound((current) =>
      current.includes(clueId) ? current : [...current, clueId],
    );
    setActiveClue((current) => (current === clueId ? null : clueId));
  };

  const askQuestion = (witnessId: string, questionId: string) => {
    const questionKey = `${witnessId}:${questionId}`;
    setAskedQuestions((current) =>
      current.includes(questionKey) ? current : [...current, questionKey],
    );
    setActiveReply(questionKey);
  };

  const selectTimelineEvent = (eventId: string) => {
    if (timelineSolved || timelineOrder.includes(eventId) || timelineOrder.length >= 4) {
      return;
    }
    const nextOrder = [...timelineOrder, eventId];
    setTimelineOrder(nextOrder);
    if (nextOrder.length === CASE_001.correctTimelineOrder.length) {
      if (isTimelineCorrect(nextOrder)) {
        setTimelineSolved(true);
        setTimelineMessage('Timeline confirmed. The records now agree.');
      } else {
        setTimelineAttempts((current) => current + 1);
        setTimelineMessage('Not quite. Recheck the timestamps, then try again.');
      }
    }
  };

  const resetTimeline = () => {
    setTimelineOrder([]);
    setTimelineMessage('');
  };
  const case002AllCluesFound = case002Progress.cluesFound.length === CASE_002_GAME.clues.length;
  const case002SpecialistId = bureauTeamBoard.assignments.find((assignment) => assignment.targetId === 'case002')?.specialistId ?? null;
  const case002SpecialistRank = case002SpecialistId ? getBureauSpecialistProgress(bureauTeamBoard, case002SpecialistId).rank : 0;
  const case002SpecialistInsight = getBureauSpecialistInsight(case002SpecialistId, 'case002', case002Progress.cluesFound, [], case002SpecialistRank);
  const case002WitnessCount = CASE_002_GAME.witnesses.filter((witness) =>
    witness.questions.some((question) => case002Progress.askedQuestions.includes(`${witness.id}:${question.id}`)),
  ).length;
  const case002AllWitnessesHeard = case002WitnessCount === CASE_002_GAME.witnesses.length;
  const case002Unanswered = CASE_002_GAME.witnesses.flatMap((witness) =>
    witness.questions.filter((question) => !case002Progress.askedQuestions.includes(`${witness.id}:${question.id}`))
      .map((question) => `${witness.name}: ${question.prompt}`),
  );

  const inspectCase002Clue = (clueId: string) => {
    setCase002Progress((current) => ({
      ...current,
      cluesFound: current.cluesFound.includes(clueId) ? current.cluesFound : [...current.cluesFound, clueId],
    }));
    setCase002ActiveClue((current) => current === clueId ? null : clueId);
  };

  const askCase002Question = (witnessId: string, questionId: string) => {
    const key = `${witnessId}:${questionId}`;
    setCase002Progress((current) => ({
      ...current,
      askedQuestions: current.askedQuestions.includes(key) ? current.askedQuestions : [...current.askedQuestions, key],
    }));
    setCase002ActiveReply(key);
  };

  const selectCase002TimelineEvent = (eventId: string) => {
    if (case002Progress.timelineSolved || case002Progress.timelineOrder.includes(eventId) || case002Progress.timelineOrder.length >= 4) return;
    const next = [...case002Progress.timelineOrder, eventId];
    if (next.length === 4) {
      if (isCase002TimelineCorrect(next)) {
        setCase002Progress((current) => ({ ...current, timelineOrder: next, timelineSolved: true }));
        setCase002TimelineMessage('Timeline confirmed. The outage happened after the ledger was moved.');
      } else {
        setCase002Progress((current) => ({ ...current, timelineOrder: next }));
        setCase002TimelineMessage('That sequence does not fit the access panel and generator log. Reset and try again.');
      }
    } else {
      setCase002Progress((current) => ({ ...current, timelineOrder: next }));
    }
  };

  const resetCase002Timeline = () => {
    setCase002Progress((current) => ({ ...current, timelineOrder: [] }));
    setCase002TimelineMessage('');
  };

  const submitCase002Deduction = () => {
    if (!isCase002DeductionCorrect(case002Progress.selectedSuspect, case002Progress.selectedMotive)) {
      setCase002DeductionMessage('That theory does not fit the access log, the outage time and the transfer tag. Recheck the sequence.');
      return;
    }
    const record = {
      caseId: CASE_002_GAME.id,
      caseTitle: CASE_002_GAME.title,
      closedAt: new Date().toISOString(),
      selectedSuspectId: case002Progress.selectedSuspect!,
      selectedMotiveId: case002Progress.selectedMotive!,
      inspectedClues: CASE_002_GAME.clues.filter((clue) => case002Progress.cluesFound.includes(clue.id)).map((clue) => clue.title),
      askedQuestions: CASE_002_GAME.witnesses.flatMap((witness) => witness.questions
        .filter((question) => case002Progress.askedQuestions.includes(`${witness.id}:${question.id}`))
        .map((question) => `${witness.name}: ${question.prompt}`)),
      unansweredQuestions: case002Unanswered,
    };
    setInvestigationArchive((current) => archiveCompletedCase(current, record));
    setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_002_GAME.id));
    setCase002Progress((current) => ({ ...current, completed: true }));
    setCase002DeductionMessage('');
    setPhase('case002Review');
  };


  const case003AllCluesFound = case003Progress.cluesFound.length === CASE_003_GAME.clues.length;
  const case003SpecialistId = bureauTeamBoard.assignments.find((assignment) => assignment.targetId === 'case003')?.specialistId ?? null;
  const case003SpecialistRank = case003SpecialistId ? getBureauSpecialistProgress(bureauTeamBoard, case003SpecialistId).rank : 0;
  const case003SpecialistInsight = getBureauSpecialistInsight(case003SpecialistId, 'case003', case003Progress.cluesFound, case003Progress.askedQuestions, case003SpecialistRank);
  const case003WitnessCount = CASE_003_GAME.witnesses.filter((witness) =>
    witness.questions.some((question) => case003Progress.askedQuestions.includes(`${witness.id}:${question.id}`)),
  ).length;
  const case003AllWitnessesHeard = case003WitnessCount === CASE_003_GAME.witnesses.length;
  const case003Unanswered = CASE_003_GAME.witnesses.flatMap((witness) =>
    witness.questions.filter((question) => !case003Progress.askedQuestions.includes(`${witness.id}:${question.id}`))
      .map((question) => `${witness.name}: ${question.prompt}`),
  );

  const inspectCase003Clue = (clueId: string) => {
    setCase003Progress((current) => ({
      ...current,
      cluesFound: current.cluesFound.includes(clueId) ? current.cluesFound : [...current.cluesFound, clueId],
    }));
    setCase003ActiveClue((current) => current === clueId ? null : clueId);
  };
  const askCase003Question = (witnessId: string, questionId: string) => {
    const key = `${witnessId}:${questionId}`;
    setCase003Progress((current) => ({
      ...current,
      askedQuestions: current.askedQuestions.includes(key) ? current.askedQuestions : [...current.askedQuestions, key],
    }));
    setCase003ActiveReply(key);
  };
  const selectCase003TimelineEvent = (eventId: string) => {
    if (case003Progress.timelineSolved || case003Progress.timelineOrder.includes(eventId) || case003Progress.timelineOrder.length >= 4) return;
    const next = [...case003Progress.timelineOrder, eventId];
    if (next.length === 4) {
      if (isCase003TimelineCorrect(next)) {
        setCase003Progress((current) => ({ ...current, timelineOrder: next, timelineSolved: true }));
        setCase003TimelineMessage('Timeline confirmed. The altered routing slip predates the cabinet access and dispatch delivery.');
      } else {
        setCase003Progress((current) => ({ ...current, timelineOrder: next }));
        setCase003TimelineMessage('That sequence conflicts with the printer and cabinet records. Reset and compare the timestamps.');
      }
    } else {
      setCase003Progress((current) => ({ ...current, timelineOrder: next }));
    }
  };
  const resetCase003Timeline = () => {
    setCase003Progress((current) => ({ ...current, timelineOrder: [] }));
    setCase003TimelineMessage('');
  };
  const submitCase003Deduction = () => {
    if (!isCase003DeductionCorrect(case003Progress.selectedSuspect, case003Progress.selectedMotive)) {
      setCase003DeductionMessage('That theory does not explain the terminal job, seal custody and cabinet access together. Recheck the records.');
      return;
    }
    const record = {
      caseId: CASE_003_GAME.id,
      caseTitle: CASE_003_GAME.title,
      closedAt: new Date().toISOString(),
      selectedSuspectId: case003Progress.selectedSuspect!,
      selectedMotiveId: case003Progress.selectedMotive!,
      inspectedClues: CASE_003_GAME.clues.filter((clue) => case003Progress.cluesFound.includes(clue.id)).map((clue) => clue.title),
      askedQuestions: CASE_003_GAME.witnesses.flatMap((witness) => witness.questions
        .filter((question) => case003Progress.askedQuestions.includes(`${witness.id}:${question.id}`))
        .map((question) => `${witness.name}: ${question.prompt}`)),
      unansweredQuestions: case003Unanswered,
    };
    setInvestigationArchive((current) => archiveCompletedCase(current, record));
    setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_003_GAME.id));
    setCase003Progress((current) => ({ ...current, completed: true }));
    setCase003DeductionMessage('');
    setPhase('case003Review');
  };

  const submitDeduction = () => {
    if (isDeductionCorrect(selectedSuspect, selectedMotive)) {
      setCaseCompleted(true);
      setDeductionMessage('');
      setPhase('review');
    } else {
      setDeductionMessage(
        'That theory does not fit every record. Recheck the service-key register, cart mark and luggage-office slip.',
      );
    }
  };

  const cardStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
  };
  const textStyle = { color: colors.foreground };
  const mutedStyle = { color: colors.mutedForeground };

  if (!loaded) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.loading}>
          <Text style={[styles.brand, { color: colors.primary }]}>CASEZERO</Text>
          <Text style={[styles.body, mutedStyle]}>Restoring THE MEMORY…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topline}>
          <View>
            <Text style={[styles.brand, { color: colors.primary }]}>CASEZERO</Text>
            <Text style={[styles.kicker, mutedStyle]}>BEYOND THE EVIDENCE</Text>
          </View>
          <View style={[styles.caseStamp, { borderColor: colors.primary }]}>
            <Text style={[styles.caseStampText, { color: colors.primary }]}>{phase === 'daily' ? 'DAILY FILE' : phase === 'team' ? 'BUREAU' : phase.startsWith('case002') ? 'FILE 002' : phase.startsWith('case003') ? 'FILE 003'  : phase.startsWith('case004') ? 'FILE 004' : phase.startsWith('case005') ? 'FILE 005' : 'FILE 001'}</Text>
          </View>
        </View>

        {phase === 'hq' && (
          <>
            <Text style={[styles.heroTitle, textStyle]}>Detective Bureau</Text>
            <Text style={[styles.subtitle, mutedStyle]}>
              Truth is what happened. Proof is what you can show.
            </Text>

            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Active case file</SectionLabel>
              <Text style={[styles.caseTitle, textStyle]}>{CASE_001.title}</Text>
              <Text style={[styles.body, mutedStyle]}>{CASE_001.subtitle}</Text>
              <View style={styles.statusRow}>
                <Text style={[styles.statusText, { color: caseCompleted ? colors.primary : colors.mutedForeground }]}>
                  {caseCompleted ? 'CASE CLOSED' : cluesFound.length > 0 ? 'IN PROGRESS' : 'NEW FILE'}
                </Text>
                <Text style={[styles.statusText, mutedStyle]}>
                  {cluesFound.length}/5 records
                </Text>
              </View>
              <ActionButton
                title={caseCompleted ? 'Review closed file' : cluesFound.length > 0 ? 'Resume investigation' : 'Open case file'}
                onPress={openCase}
                colors={colors}
              />
              {caseCompleted && (
                <ActionButton
                  title="Replay from the beginning"
                  onPress={resetCase}
                  colors={colors}
                  variant="ghost"
                />
              )}
            </View>

            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>THE MEMORY</SectionLabel>
              <Text style={[styles.cardTitle, textStyle]}>
                {caseCompleted ? 'This file stays with you.' : 'Every detail leaves a trace.'}
              </Text>
              <View style={styles.memoryGrid}>
                <View style={styles.memoryCell}>
                  <Text style={[styles.memoryNumber, textStyle]}>{cluesFound.length}/5</Text>
                  <Text style={[styles.memoryLabel, mutedStyle]}>Clues noticed</Text>
                </View>
                <View style={styles.memoryCell}>
                  <Text style={[styles.memoryNumber, textStyle]}>{witnessCount}/3</Text>
                  <Text style={[styles.memoryLabel, mutedStyle]}>Witnesses heard</Text>
                </View>
                <View style={styles.memoryCell}>
                  <Text style={[styles.memoryNumber, textStyle]}>{unansweredQuestions}</Text>
                  <Text style={[styles.memoryLabel, mutedStyle]}>Questions unasked</Text>
                </View>
              </View>
              {investigationMemory.inspectedClues.length > 0 && (
                <Text style={[styles.memoryNote, mutedStyle]}>
                  Evidence on file: {investigationMemory.inspectedClues.join(' · ')}
                </Text>
              )}
              {investigationMemory.askedQuestions.length > 0 && (
                <Text style={[styles.memoryNote, mutedStyle]}>
                  Interview notes: {investigationMemory.askedQuestions.join(' · ')}
                </Text>
              )}
              {caseCompleted && (
                <Text style={[styles.memoryNote, mutedStyle]}>
                  Your recorded conclusion: Miles Renn moved the envelope to protect it from the leak.
                </Text>
              )}
            </View>
            {investigationArchive.completedCases.length > 0 && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Previous investigations</SectionLabel>
                <Text style={[styles.cardTitle, textStyle]}>The Bureau remembers.</Text>
                {investigationArchive.completedCases.map((record) => {
                  const suspect = (record.caseId === 'case004' ? CASE_004_GAME.suspects : record.caseId === CASE_003_GAME.id ? CASE_003_GAME.suspects : record.caseId === CASE_002_GAME.id ? CASE_002_GAME.suspects : CASE_001.suspects).find((entry) => entry.id === record.selectedSuspectId);
                  const motive = (record.caseId === 'case004' ? CASE_004_GAME.motives : record.caseId === CASE_003_GAME.id ? CASE_003_GAME.motives : record.caseId === CASE_002_GAME.id ? CASE_002_GAME.motives : CASE_001.motives).find((entry) => entry.id === record.selectedMotiveId);
                  return (
                    <View key={record.caseId} style={styles.questionBlock}>
                      <Text style={[styles.cardTitle, textStyle]}>{record.caseId.toUpperCase()} · {record.caseTitle}</Text>
                      <Text style={[styles.small, mutedStyle]}>
                        Conclusion: {suspect?.name ?? 'Unknown'} · {motive?.label ?? 'Motive not recorded'}
                      </Text>
                      <Text style={[styles.memoryNote, mutedStyle]}>
                        {record.inspectedClues.length} clues inspected · {record.askedQuestions.length} questions asked · {record.unansweredQuestions.length} left unasked
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Incoming file · 002</SectionLabel>
              <Text style={[styles.caseTitle, textStyle]}>{CASE_002.title}</Text>
              <Text style={[styles.body, mutedStyle]}>{CASE_002.subtitle}</Text>
              <Text style={[styles.memoryNote, textStyle]}>{CASE_002.briefing}</Text>
              <View style={[styles.detail, { borderTopColor: colors.border }]}>
                <SectionLabel colors={colors}>THE MEMORY · Carryover intelligence</SectionLabel>
                <Text style={[styles.body, mutedStyle]}>{case002Carryover.fieldLesson}</Text>
                {case002Carryover.priorConclusion && (
                  <Text style={[styles.memoryNote, textStyle]}>{case002Carryover.priorConclusion}</Text>
                )}
                {case002Carryover.unansweredLead && (
                  <Text style={[styles.memoryNote, { color: colors.primary }]}>
                    Unanswered lead from your last file: {case002Carryover.unansweredLead}
                  </Text>
                )}
                {case002Carryover.inspectedEvidence.length > 0 && (
                  <Text style={[styles.memoryNote, mutedStyle]}>
                    Evidence you previously noticed: {case002Carryover.inspectedEvidence.join(' · ')}
                  </Text>
                )}
              </View>
              <Text style={[styles.small, mutedStyle]}>
                {case001Archived
                  ? 'Your previous investigation has shaped this briefing.'
                  : 'Complete Case 001 to unlock this connected investigation.'}
              </Text>
              <ActionButton
                title={
                  case002Progress.completed
                    ? 'Review Case 002'
                    : case001Archived
                      ? 'Open Case 002'
                      : 'Complete Case 001 to unlock'
                }
                onPress={() => setPhase(case002Progress.completed ? 'case002Review' : 'case002Briefing')}
                colors={colors}
                disabled={!case001Archived && !case002Progress.completed}
              />
            </View>
            {missingDetectiveArc.unlocked && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified · New lead</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{MISSING_DETECTIVE_DOSSIER.title}</Text>
                <Text style={[styles.small, { color: colors.primary }]}>{MISSING_DETECTIVE_DOSSIER.label} · {MISSING_DETECTIVE_DOSSIER.detective}</Text>
                <Text style={[styles.body, mutedStyle]}>{MISSING_DETECTIVE_DOSSIER.briefing}</Text>
                <View style={[styles.detail, { borderTopColor: colors.border }]}>
                  <SectionLabel colors={colors}>Recovered note · R.V.</SectionLabel>
                  <Text style={[styles.body, textStyle]}>{MISSING_DETECTIVE_DOSSIER.recoveredNote}</Text>
                </View>
                <Text style={[styles.memoryNote, mutedStyle]}>{MISSING_DETECTIVE_DOSSIER.firstLead}</Text>
                <Text style={[styles.small, { color: colors.primary }]}>Campaign arc unlocked · {missingDetectiveArc.completedCaseCount}/{missingDetectiveArc.requiredCaseCount} opening cases closed</Text>
                <ActionButton
                  title={case003Progress.completed ? 'Review The Black Square' : 'Open Missing Detective investigation'}
                  onPress={() => setPhase(case003Progress.completed ? 'case003Review' : 'case003Briefing')}
                  colors={colors}
                />
              </View>
            )}
            {missingDetectiveConvergence.unlocked && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 005</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_005_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_005_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The North Quay transfer has a destination after all. A carbon receipt survived at East Freight Registry.</Text>
                <ActionButton title="Open Case 005" onPress={() => setPhase('case005')} colors={colors} />
              </View>
            )}
            {missingDetectiveConvergence.unlocked && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified · Cross-case review</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{missingDetectiveConvergence.reportTitle}</Text>
                <Text style={[styles.small, { color: colors.primary }]}>Rowan Vale investigation · Four files connected</Text>
                <Text style={[styles.body, mutedStyle]}>{missingDetectiveConvergence.reportSummary}</Text>
                {missingDetectiveConvergence.evidenceLinks.map((entry) => (
                  <View key={entry} style={[styles.detail, { borderTopColor: colors.border }]}>
                    <Text style={[styles.small, textStyle]}>{entry}</Text>
                  </View>
                ))}
                <Text style={[styles.memoryNote, mutedStyle]}>Next lead: trace who received the M-2 transfer after the North Quay collection.</Text>
              </View>
            )}
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Bureau operations</SectionLabel>
              <Text style={[styles.caseTitle, textStyle]}>Build your specialist team.</Text>
              <Text style={[styles.body, mutedStyle]}>Recruit specialists as campaign files close, then assign them to active investigations from the Bureau board.</Text>
              <ActionButton title="Open Bureau Team" onPress={() => setPhase('team')} colors={colors} />
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Daily case bulletin</SectionLabel>
              <Text style={[styles.caseTitle, textStyle]}>A new file every day.</Text>
              <Text style={[styles.body, mutedStyle]}>Short standalone investigations rotate with your local calendar date. They do not alter the main campaign archive.</Text>
              <ActionButton title="Open Daily Case Bulletin" onPress={() => setPhase('daily')} colors={colors} />
            </View>
            {case003Progress.completed && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 004</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_004_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_004_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Rowan Vale’s field recorder disappeared from North Quay Signal House. The maintenance override, locker seal and courier docket do not agree.</Text>
                <ActionButton title="Open Case 004" onPress={() => setPhase('case004')} colors={colors} />
              </View>
            )}
            <Text style={[styles.footerNote, mutedStyle]}>
              A quiet city. A long night. Nothing is forgotten.
            </Text>
          </>
        )}


        {phase === 'case002Briefing' && (
          <>
            <SectionLabel colors={colors}>Case 002 · Incoming file</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>{CASE_002_GAME.title}</Text>
            <Text style={[styles.subtitle, mutedStyle]}>{CASE_002_GAME.subtitle}</Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>The incident</SectionLabel>
              <Text style={[styles.body, textStyle]}>{CASE_002_GAME.briefing}</Text>
              <View style={[styles.detail, { borderTopColor: colors.border }]}>
                <SectionLabel colors={colors}>THE MEMORY · Carried from your last file</SectionLabel>
                <Text style={[styles.body, mutedStyle]}>{case002Carryover.fieldLesson}</Text>
                {case002Carryover.priorConclusion && <Text style={[styles.memoryNote, textStyle]}>{case002Carryover.priorConclusion}</Text>}
                {case002Carryover.unansweredLead && <Text style={[styles.memoryNote, { color: colors.primary }]}>Unanswered lead: {case002Carryover.unansweredLead}</Text>}
                {case002Carryover.inspectedEvidence.length > 0 && <Text style={[styles.memoryNote, mutedStyle]}>Evidence you noticed before: {case002Carryover.inspectedEvidence.join(' · ')}</Text>}
              </View>
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Persons of interest</SectionLabel>
              {CASE_002_GAME.suspects.map((suspect) => (
                <View key={suspect.id} style={styles.personRow}>
                  <View style={styles.personInitial}><Text style={[styles.personInitialText, { color: colors.primary }]}>{suspect.name.split(' ').map((part) => part[0]).join('')}</Text></View>
                  <View style={styles.personCopy}>
                    <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text>
                    <Text style={[styles.small, { color: colors.primary }]}>{suspect.role}</Text>
                    <Text style={[styles.small, mutedStyle]}>{suspect.note}</Text>
                  </View>
                </View>
              ))}
            </View>
            <ActionButton title="Begin evidence review" onPress={() => setPhase('case002Evidence')} colors={colors} />
            <ActionButton title="Back to Bureau" onPress={() => setPhase('hq')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case002Evidence' && (
          <>
            <SectionLabel colors={colors}>Case 002 · Evidence</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>A locked room. An empty shelf.</Text>
            <Text style={[styles.subtitle, mutedStyle]}>Inspect all four records. The sequence matters more than the blackout itself.</Text>
            <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${(case002Progress.cluesFound.length / CASE_002_GAME.clues.length) * 100}%` }]} />
            </View>
            <Text style={[styles.progressText, mutedStyle]}>{case002Progress.cluesFound.length} of 4 records logged</Text>
            {CASE_002_GAME.clues.map((clue, index) => {
              const found = case002Progress.cluesFound.includes(clue.id);
              const expanded = case002ActiveClue === clue.id;
              return (
                <Pressable key={clue.id} accessibilityRole="button" onPress={() => inspectCase002Clue(clue.id)}
                  style={({ pressed }) => [styles.card, cardStyle, styles.inspectCard, { opacity: pressed ? 0.82 : 1, borderColor: found ? colors.primary : colors.border }]}>
                  <View style={styles.row}>
                    <Text style={[styles.index, { color: colors.primary }]}>0{index + 1}</Text>
                    <View style={styles.flexCopy}>
                      <Text style={[styles.cardTitle, textStyle]}>{clue.title}</Text>
                      <Text style={[styles.small, mutedStyle]}>{clue.label}</Text>
                    </View>
                    <Text style={[styles.statusText, { color: found ? colors.primary : colors.mutedForeground }]}>{found ? 'LOGGED' : 'INSPECT'}</Text>
                  </View>
                  {expanded && <Text style={[styles.body, mutedStyle, styles.detail]}>{clue.detail}</Text>}
                </Pressable>
              );
            })}
            {case002SpecialistInsight && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>{case002SpecialistInsight.title}</SectionLabel>
                <Text style={[styles.body, textStyle]}>{case002SpecialistInsight.detail}</Text>
                {case002SpecialistInsight.rankPerk && <Text style={[styles.body, mutedStyle]}>{case002SpecialistInsight.rankPerk}</Text>}
              </View>
            )}
            <ActionButton title="Question the witnesses" onPress={() => setPhase('case002Interviews')} colors={colors} disabled={!case002AllCluesFound} />
            <ActionButton title="Back to briefing" onPress={() => setPhase('case002Briefing')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case002Interviews' && (
          <>
            <SectionLabel colors={colors}>Case 002 · Interviews</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>Who moved the ledger?</Text>
            <Text style={[styles.subtitle, mutedStyle]}>Hear from each witness. Previous case notes can change what the Bureau asks you to notice.</Text>
            {CASE_002_GAME.witnesses.map((witness, index) => (
              <View key={witness.id} style={[styles.card, cardStyle]}>
                <View style={styles.row}>
                  <View style={styles.flexCopy}>
                    <Text style={[styles.cardTitle, textStyle]}>{witness.name}</Text>
                    <Text style={[styles.small, mutedStyle]}>{witness.role}</Text>
                  </View>
                  <Text style={[styles.statusText, { color: witness.questions.some((q) => case002Progress.askedQuestions.includes(`${witness.id}:${q.id}`)) ? colors.primary : colors.mutedForeground }]}>
                    {witness.questions.some((q) => case002Progress.askedQuestions.includes(`${witness.id}:${q.id}`)) ? 'HEARD' : `WITNESS 0${index + 1}`}
                  </Text>
                </View>
                {witness.questions.map((question) => {
                  const key = `${witness.id}:${question.id}`;
                  const asked = case002Progress.askedQuestions.includes(key);
                  const active = case002ActiveReply === key;
                  return (
                    <View key={key} style={styles.questionBlock}>
                      <Pressable accessibilityRole="button" onPress={() => askCase002Question(witness.id, question.id)}
                        style={({ pressed }) => [styles.questionButton, { borderColor: asked ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}>
                        <Text style={[styles.questionText, textStyle]}>{question.prompt}</Text>
                        <Text style={[styles.small, { color: colors.primary }]}>{asked ? 'ASKED' : 'ASK QUESTION'}</Text>
                      </Pressable>
                      {active && <Text style={[styles.reply, mutedStyle]}>{getCase002QuestionReply(witness.id, question.id, investigationArchive)}</Text>}
                    </View>
                  );
                })}
              </View>
            ))}
            <Text style={[styles.progressText, mutedStyle]}>{case002WitnessCount}/3 witnesses heard · {case002Unanswered.length} questions left unasked</Text>
            <ActionButton title="Reconstruct the timeline" onPress={() => setPhase('case002Timeline')} colors={colors} disabled={!case002AllWitnessesHeard} />
            <ActionButton title="Back to evidence" onPress={() => setPhase('case002Evidence')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case002Timeline' && (
          <>
            <SectionLabel colors={colors}>Case 002 · Timeline</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>Did the blackout hide the move?</Text>
            <Text style={[styles.subtitle, mutedStyle]}>Put the four records in chronological order. Watch when the door actually closed.</Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Your sequence</SectionLabel>
              {case002Progress.timelineOrder.length === 0 ? <Text style={[styles.body, mutedStyle]}>No events selected yet.</Text> : case002Progress.timelineOrder.map((id, index) => {
                const event = CASE_002_GAME.timelineEvents.find((item) => item.id === id);
                return <Text key={id} style={[styles.sequenceItem, textStyle]}>{index + 1}. {event?.time} — {event?.title}</Text>;
              })}
            </View>
            {CASE_002_GAME.timelineEvents.map((event) => {
              const selected = case002Progress.timelineOrder.includes(event.id);
              return (
                <Pressable key={event.id} accessibilityRole="button" disabled={selected || case002Progress.timelineSolved} onPress={() => selectCase002TimelineEvent(event.id)}
                  style={({ pressed }) => [styles.optionCard, { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border, opacity: selected ? 0.48 : pressed ? 0.8 : 1 }]}>
                  <Text style={[styles.small, { color: colors.primary }]}>{event.time}</Text>
                  <Text style={[styles.cardTitle, textStyle]}>{event.title}</Text>
                  <Text style={[styles.small, mutedStyle]}>{event.detail}</Text>
                </Pressable>
              );
            })}
            {!!case002TimelineMessage && <Text style={[styles.notice, { color: case002Progress.timelineSolved ? colors.primary : colors.destructive }]}>{case002TimelineMessage}</Text>}
            {case002Progress.timelineSolved
              ? <ActionButton title="Make your deduction" onPress={() => setPhase('case002Deduction')} colors={colors} />
              : case002Progress.timelineOrder.length === 4
                ? <ActionButton title="Reset sequence and retry" onPress={resetCase002Timeline} colors={colors} variant="secondary" />
                : <Text style={[styles.progressText, mutedStyle]}>{case002Progress.timelineOrder.length}/4 events selected</Text>}
            <ActionButton title="Back to interviews" onPress={() => setPhase('case002Interviews')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case002Deduction' && (
          <>
            <SectionLabel colors={colors}>Case 002 · Final deduction</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>The room was locked. Was it a theft?</Text>
            <Text style={[styles.subtitle, mutedStyle]}>Choose who moved the ledger and why. Your theory must fit the entry log, the water evidence and the timeline.</Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Who moved it?</SectionLabel>
              {CASE_002_GAME.suspects.map((suspect) => {
                const selected = case002Progress.selectedSuspect === suspect.id;
                return <Pressable key={suspect.id} accessibilityRole="button" onPress={() => setCase002Progress((current) => ({ ...current, selectedSuspect: suspect.id }))}
                  style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text><Text style={[styles.small, mutedStyle]}>{suspect.role}</Text>
                </Pressable>;
              })}
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Why?</SectionLabel>
              {CASE_002_GAME.motives.map((motive) => {
                const selected = case002Progress.selectedMotive === motive.id;
                return <Pressable key={motive.id} accessibilityRole="button" onPress={() => setCase002Progress((current) => ({ ...current, selectedMotive: motive.id }))}
                  style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <Text style={[styles.cardTitle, textStyle]}>{motive.label}</Text><Text style={[styles.small, mutedStyle]}>{motive.note}</Text>
                </Pressable>;
              })}
            </View>
            {!!case002DeductionMessage && <Text style={[styles.notice, { color: colors.destructive }]}>{case002DeductionMessage}</Text>}
            <ActionButton title="Submit evidence-based conclusion" onPress={submitCase002Deduction} colors={colors}
              disabled={!case002Progress.selectedSuspect || !case002Progress.selectedMotive || !case002AllCluesFound || !case002AllWitnessesHeard || !case002Progress.timelineSolved} />
            <ActionButton title="Back to timeline" onPress={() => setPhase('case002Timeline')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case002Review' && (
          <>
            <View style={styles.closedStamp}><Text style={[styles.closedStampText, { color: colors.primary }]}>CASE CLOSED · 002</Text></View>
            <Text style={[styles.heroTitle, textStyle]}>The blackout was a distraction.</Text>
            <Text style={[styles.subtitle, mutedStyle]}>The ledger had already moved before the lights went out.</Text>
            <View style={[styles.card, cardStyle]}><SectionLabel colors={colors}>Truth</SectionLabel><Text style={[styles.body, textStyle]}>{CASE_002_GAME.truth}</Text></View>
            <View style={[styles.card, cardStyle]}><SectionLabel colors={colors}>Proof</SectionLabel><Text style={[styles.body, textStyle]}>{CASE_002_GAME.proof}</Text></View>
            <View style={[styles.card, cardStyle]}><SectionLabel colors={colors}>Outcome</SectionLabel><Text style={[styles.body, textStyle]}>{CASE_002_GAME.outcome}</Text></View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>THE MEMORY · Case 002 archived</SectionLabel>
              <Text style={[styles.memoryLine, textStyle]}>Clues inspected: {case002Progress.cluesFound.length}/4</Text>
              <Text style={[styles.memoryLine, textStyle]}>Questions asked: {case002Progress.askedQuestions.length}/6</Text>
              <Text style={[styles.memoryLine, textStyle]}>Questions left unasked: {case002Unanswered.length}</Text>
              <Text style={[styles.memoryNote, mutedStyle]}>The next file can use this investigation alongside the memory of Case 001.</Text>
            </View>
            <ActionButton title="Return to Detective Bureau" onPress={() => setPhase('hq')} colors={colors} />
          </>
        )}

        {phase === 'briefing' && (
          <>
            <SectionLabel colors={colors}>Case 001 · Briefing</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>{CASE_001.title}</Text>
            <Text style={[styles.subtitle, mutedStyle]}>{CASE_001.briefing}</Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Persons of interest</SectionLabel>
              {CASE_001.suspects.map((suspect) => (
                <View key={suspect.id} style={styles.personRow}>
                  <View style={styles.personInitial}>
                    <Text style={[styles.personInitialText, { color: colors.primary }]}>
                      {suspect.name.split(' ').map((part) => part[0]).join('')}
                    </Text>
                  </View>
                  <View style={styles.personCopy}>
                    <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text>
                    <Text style={[styles.small, { color: colors.primary }]}>{suspect.role}</Text>
                    <Text style={[styles.small, mutedStyle]}>{suspect.note}</Text>
                  </View>
                </View>
              ))}
            </View>
            <ActionButton title="Begin evidence review" onPress={() => setPhase('evidence')} colors={colors} />
            <ActionButton title="Back to Bureau" onPress={() => setPhase('hq')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'evidence' && (
          <>
            <SectionLabel colors={colors}>Investigation · Evidence</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>Inspect the records.</Text>
            <Text style={[styles.subtitle, mutedStyle]}>
              Tap each record to inspect it. You need all five before the witness interviews.
            </Text>
            <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${(cluesFound.length / CASE_001.clues.length) * 100}%` }]} />
            </View>
            <Text style={[styles.progressText, mutedStyle]}>{cluesFound.length} of 5 records logged</Text>
            {CASE_001.clues.map((clue, index) => {
              const found = cluesFound.includes(clue.id);
              const expanded = activeClue === clue.id;
              return (
                <Pressable
                  key={clue.id}
                  accessibilityRole="button"
                  onPress={() => inspectClue(clue.id)}
                  style={({ pressed }) => [
                    styles.card,
                    cardStyle,
                    styles.inspectCard,
                    { opacity: pressed ? 0.82 : 1, borderColor: found ? colors.primary : colors.border },
                  ]}
                >
                  <View style={styles.row}>
                    <Text style={[styles.index, { color: colors.primary }]}>0{index + 1}</Text>
                    <View style={styles.flexCopy}>
                      <Text style={[styles.cardTitle, textStyle]}>{clue.title}</Text>
                      <Text style={[styles.small, mutedStyle]}>{clue.label}</Text>
                    </View>
                    <Text style={[styles.statusText, { color: found ? colors.primary : colors.mutedForeground }]}>
                      {found ? 'LOGGED' : 'INSPECT'}
                    </Text>
                  </View>
                  {expanded && <Text style={[styles.body, mutedStyle, styles.detail]}>{clue.detail}</Text>}
                </Pressable>
              );
            })}
            <ActionButton
              title="Question the witnesses"
              onPress={() => setPhase('interviews')}
              colors={colors}
              disabled={!allCluesFound}
            />
            <ActionButton title="Back to briefing" onPress={() => setPhase('briefing')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'interviews' && (
          <>
            <SectionLabel colors={colors}>Investigation · Interviews</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>Ask the right questions.</Text>
            <Text style={[styles.subtitle, mutedStyle]}>
              Ask at least one question to each witness. Follow-ups are optional, but THE MEMORY keeps track of what you leave unasked.
            </Text>
            {CASE_001.witnesses.map((witness, index) => (
              <View key={witness.id} style={[styles.card, cardStyle]}>
                <View style={styles.row}>
                  <View style={styles.flexCopy}>
                    <Text style={[styles.cardTitle, textStyle]}>{witness.name}</Text>
                    <Text style={[styles.small, mutedStyle]}>{witness.role}</Text>
                  </View>
                  <Text style={[styles.statusText, { color: witness.questions.some((q) => askedQuestions.includes(`${witness.id}:${q.id}`)) ? colors.primary : colors.mutedForeground }]}>
                    {witness.questions.some((q) => askedQuestions.includes(`${witness.id}:${q.id}`)) ? 'HEARD' : `WITNESS 0${index + 1}`}
                  </Text>
                </View>
                {witness.questions.map((question) => {
                  const key = `${witness.id}:${question.id}`;
                  const asked = askedQuestions.includes(key);
                  const active = activeReply === key;
                  return (
                    <View key={key} style={styles.questionBlock}>
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => askQuestion(witness.id, question.id)}
                        style={({ pressed }) => [
                          styles.questionButton,
                          { borderColor: asked ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 },
                        ]}
                      >
                        <Text style={[styles.questionText, textStyle]}>{question.prompt}</Text>
                        <Text style={[styles.small, { color: colors.primary }]}>{asked ? 'ASKED' : 'ASK QUESTION'}</Text>
                      </Pressable>
                      {active && <Text style={[styles.reply, mutedStyle]}>{question.reply}</Text>}
                    </View>
                  );
                })}
              </View>
            ))}
            <Text style={[styles.progressText, mutedStyle]}>
              {witnessCount}/3 witnesses heard · {unansweredQuestions} optional questions left unasked
            </Text>
            <ActionButton
              title="Reconstruct the timeline"
              onPress={() => setPhase('timeline')}
              colors={colors}
              disabled={!allWitnessesHeard}
            />
            <ActionButton title="Back to evidence" onPress={() => setPhase('evidence')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'timeline' && (
          <>
            <SectionLabel colors={colors}>Investigation · Timeline</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>Put the night in order.</Text>
            <Text style={[styles.subtitle, mutedStyle]}>
              Select the four records from earliest to latest. The timestamps are evidence too.
            </Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Your sequence</SectionLabel>
              {timelineOrder.length === 0 ? (
                <Text style={[styles.body, mutedStyle]}>No events selected yet.</Text>
              ) : (
                timelineOrder.map((id, index) => {
                  const event = CASE_001.timelineEvents.find((item) => item.id === id);
                  return (
                    <Text key={id} style={[styles.sequenceItem, textStyle]}>
                      {index + 1}. {event?.time} — {event?.title}
                    </Text>
                  );
                })
              )}
            </View>
            {CASE_001.timelineEvents.map((event) => {
              const selected = timelineOrder.includes(event.id);
              return (
                <Pressable
                  key={event.id}
                  accessibilityRole="button"
                  disabled={selected || timelineSolved}
                  onPress={() => selectTimelineEvent(event.id)}
                  style={({ pressed }) => [
                    styles.optionCard,
                    { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border, opacity: selected ? 0.48 : pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text style={[styles.small, { color: colors.primary }]}>{event.time}</Text>
                  <Text style={[styles.cardTitle, textStyle]}>{event.title}</Text>
                  <Text style={[styles.small, mutedStyle]}>{event.detail}</Text>
                </Pressable>
              );
            })}
            {!!timelineMessage && (
              <Text style={[styles.notice, { color: timelineSolved ? colors.primary : colors.destructive }]}>
                {timelineMessage}
              </Text>
            )}
            {timelineSolved ? (
              <ActionButton title="Make your deduction" onPress={() => setPhase('deduction')} colors={colors} />
            ) : timelineOrder.length === 4 ? (
              <ActionButton title="Reset sequence and retry" onPress={resetTimeline} colors={colors} variant="secondary" />
            ) : (
              <Text style={[styles.progressText, mutedStyle]}>{timelineOrder.length}/4 events selected</Text>
            )}
            <ActionButton title="Back to interviews" onPress={() => setPhase('interviews')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'deduction' && (
          <>
            <SectionLabel colors={colors}>Final review · Deduction</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>What does the evidence prove?</Text>
            <Text style={[styles.subtitle, mutedStyle]}>
              Choose who moved the envelope and why. A correct guess is not enough; your theory must fit the records.
            </Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Who moved it?</SectionLabel>
              {CASE_001.suspects.map((suspect) => {
                const selected = selectedSuspect === suspect.id;
                return (
                  <Pressable
                    key={suspect.id}
                    accessibilityRole="button"
                    onPress={() => setSelectedSuspect(suspect.id)}
                    style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}
                  >
                    <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text>
                    <Text style={[styles.small, mutedStyle]}>{suspect.role}</Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Why did they move it?</SectionLabel>
              {CASE_001.motives.map((motive) => {
                const selected = selectedMotive === motive.id;
                return (
                  <Pressable
                    key={motive.id}
                    accessibilityRole="button"
                    onPress={() => setSelectedMotive(motive.id)}
                    style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}
                  >
                    <Text style={[styles.cardTitle, textStyle]}>{motive.label}</Text>
                    <Text style={[styles.small, mutedStyle]}>{motive.note}</Text>
                  </Pressable>
                );
              })}
            </View>
            {!!deductionMessage && <Text style={[styles.notice, { color: colors.destructive }]}>{deductionMessage}</Text>}
            <ActionButton
              title="Submit evidence-based conclusion"
              onPress={submitDeduction}
              colors={colors}
              disabled={!selectedSuspect || !selectedMotive || !allCluesFound || !allWitnessesHeard || !timelineSolved}
            />
            <ActionButton title="Back to timeline" onPress={() => setPhase('timeline')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'review' && (
          <>
            <View style={styles.closedStamp}>
              <Text style={[styles.closedStampText, { color: colors.primary }]}>CASE CLOSED · 001</Text>
            </View>
            <Text style={[styles.heroTitle, textStyle]}>The truth is in the details.</Text>
            <Text style={[styles.subtitle, mutedStyle]}>
              You identified the action and the reason behind it. Here is what the file can prove.
            </Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Truth</SectionLabel>
              <Text style={[styles.body, textStyle]}>{CASE_001.truth}</Text>
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Proof</SectionLabel>
              <Text style={[styles.body, textStyle]}>{CASE_001.proof}</Text>
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Outcome</SectionLabel>
              <Text style={[styles.body, textStyle]}>{CASE_001.outcome}</Text>
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>THE MEMORY · Your investigation</SectionLabel>
              <Text style={[styles.memoryLine, textStyle]}>Clues inspected: {cluesFound.length}/5</Text>
              <Text style={[styles.memoryLine, textStyle]}>Witness questions asked: {askedQuestions.length}/6</Text>
              <Text style={[styles.memoryLine, textStyle]}>Questions left unasked: {unansweredQuestions}</Text>
              <Text style={[styles.memoryLine, textStyle]}>Timeline attempts: {timelineAttempts + 1}</Text>
              <Text style={[styles.memoryNote, mutedStyle]}>
                Evidence you inspected: {investigationMemory.inspectedClues.join(' · ') || 'No evidence inspected yet.'}
              </Text>
              <Text style={[styles.memoryNote, mutedStyle]}>
                Questions you asked: {investigationMemory.askedQuestions.join(' · ') || 'No witness questions recorded yet.'}
              </Text>
              <Text style={[styles.memoryNote, mutedStyle]}>
                Questions left in the notebook: {investigationMemory.unansweredQuestions.join(' · ') || 'Every available question was asked.'}
              </Text>
              <Text style={[styles.memoryNote, mutedStyle]}>
                The next file can remember what you noticed, what you missed and which theory you trusted.
              </Text>
            </View>
            <ActionButton title="Return to Detective Bureau" onPress={() => setPhase('hq')} colors={colors} />
          </>
        )}

        {phase === 'case003Briefing' && (
          <>
            <SectionLabel colors={colors}>Case 003 · Classified investigation</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>{CASE_003_GAME.title}</Text>
            <Text style={[styles.subtitle, mutedStyle]}>{CASE_003_GAME.subtitle}</Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>The integrity review</SectionLabel>
              <Text style={[styles.body, textStyle]}>{CASE_003_GAME.briefing}</Text>
              <View style={[styles.detail, { borderTopColor: colors.border }]}>
                <SectionLabel colors={colors}>THE MEMORY · Opening files</SectionLabel>
                <Text style={[styles.body, mutedStyle]}>{case003Carryover.lead}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Evidence inspected across the first two cases: {case003Carryover.openingCasesInspected}</Text>
                <Text style={[styles.memoryNote, mutedStyle]}>Earlier conclusions: {case003Carryover.selectedConclusions.join(' · ')}</Text>
                {case003Carryover.unansweredFromPrior.length > 0 && <Text style={[styles.memoryNote, { color: colors.primary }]}>Unanswered questions carried forward: {case003Carryover.unansweredFromPrior.join(' · ')}</Text>}
              </View>
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Persons under review</SectionLabel>
              {CASE_003_GAME.suspects.map((suspect) => (
                <View key={suspect.id} style={styles.personRow}>
                  <View style={styles.personInitial}><Text style={[styles.personInitialText, { color: colors.primary }]}>{suspect.name.split(' ').map((part) => part[0]).join('')}</Text></View>
                  <View style={styles.personCopy}>
                    <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text>
                    <Text style={[styles.small, { color: colors.primary }]}>{suspect.role}</Text>
                    <Text style={[styles.small, mutedStyle]}>{suspect.note}</Text>
                  </View>
                </View>
              ))}
            </View>
            <ActionButton title="Begin evidence review" onPress={() => setPhase('case003Evidence')} colors={colors} />
            <ActionButton title="Back to Bureau" onPress={() => setPhase('hq')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case003Evidence' && (
          <>
            <SectionLabel colors={colors}>Case 003 · Evidence</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>Who changed the closed files?</Text>
            <Text style={[styles.subtitle, mutedStyle]}>Inspect every record. The mark matters, but the chain of custody matters more.</Text>
            <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${(case003Progress.cluesFound.length / CASE_003_GAME.clues.length) * 100}%` }]} />
            </View>
            <Text style={[styles.progressText, mutedStyle]}>{case003Progress.cluesFound.length} of 4 records logged</Text>
            {CASE_003_GAME.clues.map((clue, index) => {
              const found = case003Progress.cluesFound.includes(clue.id);
              const expanded = case003ActiveClue === clue.id;
              return (
                <Pressable key={clue.id} accessibilityRole="button" onPress={() => inspectCase003Clue(clue.id)}
                  style={({ pressed }) => [styles.card, cardStyle, styles.inspectCard, { opacity: pressed ? 0.82 : 1, borderColor: found ? colors.primary : colors.border }]}>
                  <View style={styles.row}>
                    <Text style={[styles.index, { color: colors.primary }]}>0{index + 1}</Text>
                    <View style={styles.flexCopy}>
                      <Text style={[styles.cardTitle, textStyle]}>{clue.title}</Text>
                      <Text style={[styles.small, mutedStyle]}>{clue.label}</Text>
                    </View>
                    <Text style={[styles.statusText, { color: found ? colors.primary : colors.mutedForeground }]}>{found ? 'LOGGED' : 'INSPECT'}</Text>
                  </View>
                  {expanded && <Text style={[styles.body, mutedStyle, styles.detail]}>{clue.detail}</Text>}
                </Pressable>
              );
            })}
            <ActionButton title="Question the witnesses" onPress={() => setPhase('case003Interviews')} colors={colors} disabled={!case003AllCluesFound} />
            <ActionButton title="Back to briefing" onPress={() => setPhase('case003Briefing')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case003Interviews' && (
          <>
            <SectionLabel colors={colors}>Case 003 · Interviews</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>Who had the authority to alter the record?</Text>
            <Text style={[styles.subtitle, mutedStyle]}>Compare each statement with the physical and digital records. Your earlier investigations shape what the Bureau asks next.</Text>
            {CASE_003_GAME.witnesses.map((witness, index) => (
              <View key={witness.id} style={[styles.card, cardStyle]}>
                <View style={styles.row}>
                  <View style={styles.flexCopy}>
                    <Text style={[styles.cardTitle, textStyle]}>{witness.name}</Text>
                    <Text style={[styles.small, mutedStyle]}>{witness.role}</Text>
                  </View>
                  <Text style={[styles.statusText, { color: witness.questions.some((q) => case003Progress.askedQuestions.includes(`${witness.id}:${q.id}`)) ? colors.primary : colors.mutedForeground }]}>
                    {witness.questions.some((q) => case003Progress.askedQuestions.includes(`${witness.id}:${q.id}`)) ? 'HEARD' : `WITNESS 0${index + 1}`}
                  </Text>
                </View>
                {witness.questions.map((question) => {
                  const key = `${witness.id}:${question.id}`;
                  const asked = case003Progress.askedQuestions.includes(key);
                  const active = case003ActiveReply === key;
                  return (
                    <View key={key} style={styles.questionBlock}>
                      <Pressable accessibilityRole="button" onPress={() => askCase003Question(witness.id, question.id)}
                        style={({ pressed }) => [styles.questionButton, { borderColor: asked ? colors.primary : colors.border, opacity: pressed ? 0.78 : 1 }]}>
                        <Text style={[styles.questionText, textStyle]}>{question.prompt}</Text>
                        <Text style={[styles.small, { color: colors.primary }]}>{asked ? 'ASKED' : 'ASK QUESTION'}</Text>
                      </Pressable>
                      {active && <Text style={[styles.reply, mutedStyle]}>{getCase003QuestionReply(witness.id, question.id, investigationArchive)}</Text>}
                    </View>
                  );
                })}
              </View>
            ))}
            {case003SpecialistInsight && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>{case003SpecialistInsight.title}</SectionLabel>
                <Text style={[styles.body, textStyle]}>{case003SpecialistInsight.detail}</Text>
                {case003SpecialistInsight.rankPerk && <Text style={[styles.body, mutedStyle]}>{case003SpecialistInsight.rankPerk}</Text>}
              </View>
            )}
            <Text style={[styles.progressText, mutedStyle]}>{case003WitnessCount}/3 witnesses heard · {case003Unanswered.length} questions left unasked</Text>
            <ActionButton title="Reconstruct the timeline" onPress={() => setPhase('case003Timeline')} colors={colors} disabled={!case003AllWitnessesHeard} />
            <ActionButton title="Back to evidence" onPress={() => setPhase('case003Evidence')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case003Timeline' && (
          <>
            <SectionLabel colors={colors}>Case 003 · Timeline</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>When was the file changed?</Text>
            <Text style={[styles.subtitle, mutedStyle]}>Place the four events in chronological order. Watch the difference between the cabinet opening and dispatch delivery.</Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Your sequence</SectionLabel>
              {case003Progress.timelineOrder.length === 0 ? <Text style={[styles.body, mutedStyle]}>No events selected yet.</Text> : case003Progress.timelineOrder.map((id, index) => {
                const event = CASE_003_GAME.timelineEvents.find((item) => item.id === id);
                return <Text key={id} style={[styles.sequenceItem, textStyle]}>{index + 1}. {event?.time} — {event?.title}</Text>;
              })}
            </View>
            {CASE_003_GAME.timelineEvents.map((event) => {
              const selected = case003Progress.timelineOrder.includes(event.id);
              return (
                <Pressable key={event.id} accessibilityRole="button" disabled={selected || case003Progress.timelineSolved} onPress={() => selectCase003TimelineEvent(event.id)}
                  style={({ pressed }) => [styles.optionCard, { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border, opacity: selected ? 0.48 : pressed ? 0.8 : 1 }]}>
                  <Text style={[styles.small, { color: colors.primary }]}>{event.time}</Text>
                  <Text style={[styles.cardTitle, textStyle]}>{event.title}</Text>
                  <Text style={[styles.small, mutedStyle]}>{event.detail}</Text>
                </Pressable>
              );
            })}
            {!!case003TimelineMessage && <Text style={[styles.notice, { color: case003Progress.timelineSolved ? colors.primary : colors.destructive }]}>{case003TimelineMessage}</Text>}
            {case003Progress.timelineSolved
              ? <ActionButton title="Make your deduction" onPress={() => setPhase('case003Deduction')} colors={colors} />
              : case003Progress.timelineOrder.length === 4
                ? <ActionButton title="Reset sequence and retry" onPress={resetCase003Timeline} colors={colors} variant="secondary" />
                : <Text style={[styles.progressText, mutedStyle]}>{case003Progress.timelineOrder.length}/4 events selected</Text>}
            <ActionButton title="Back to interviews" onPress={() => setPhase('case003Interviews')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case003Deduction' && (
          <>
            <SectionLabel colors={colors}>Case 003 · Final deduction</SectionLabel>
            <Text style={[styles.heroTitle, textStyle]}>Who placed the black square?</Text>
            <Text style={[styles.subtitle, mutedStyle]}>Choose the person and motive that explain the printer job, seal custody and cabinet access together.</Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Who altered the files?</SectionLabel>
              {CASE_003_GAME.suspects.map((suspect) => {
                const selected = case003Progress.selectedSuspect === suspect.id;
                return <Pressable key={suspect.id} accessibilityRole="button" onPress={() => setCase003Progress((current) => ({ ...current, selectedSuspect: suspect.id }))}
                  style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text><Text style={[styles.small, mutedStyle]}>{suspect.role}</Text>
                </Pressable>;
              })}
            </View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Why?</SectionLabel>
              {CASE_003_GAME.motives.map((motive) => {
                const selected = case003Progress.selectedMotive === motive.id;
                return <Pressable key={motive.id} accessibilityRole="button" onPress={() => setCase003Progress((current) => ({ ...current, selectedMotive: motive.id }))}
                  style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <Text style={[styles.cardTitle, textStyle]}>{motive.label}</Text><Text style={[styles.small, mutedStyle]}>{motive.note}</Text>
                </Pressable>;
              })}
            </View>
            {!!case003DeductionMessage && <Text style={[styles.notice, { color: colors.destructive }]}>{case003DeductionMessage}</Text>}
            <ActionButton title="Submit evidence-based conclusion" onPress={submitCase003Deduction} colors={colors}
              disabled={!case003Progress.selectedSuspect || !case003Progress.selectedMotive || !case003AllCluesFound || !case003AllWitnessesHeard || !case003Progress.timelineSolved} />
            <ActionButton title="Back to timeline" onPress={() => setPhase('case003Timeline')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'team' && <BureauTeamScreen archive={investigationArchive} onBoardChange={setBureauTeamBoard} onReturn={() => setPhase('hq')} />}

        {phase === 'daily' && <DailyCaseBulletinScreen onReturn={() => setPhase('hq')} assignedSpecialistName={BUREAU_SPECIALISTS.find((specialist) => specialist.id === bureauTeamBoard.assignments.find((assignment) => assignment.targetId === 'daily')?.specialistId)?.name ?? null} onComplete={(dateKey) => setBureauTeamBoard((current) => awardBureauDailyExperience(current, dateKey))} />}

        {phase === 'case005' && (
          <Case005Screen
            archive={investigationArchive}
            onArchive={(record) => setInvestigationArchive((current) => archiveCompletedCase(current, record))}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case004' && (
          <Case004Screen
            archive={investigationArchive}
            assignedSpecialistId={bureauTeamBoard.assignments.find((assignment) => assignment.targetId === 'case004')?.specialistId ?? null}
            assignedSpecialistRank={(() => { const id = bureauTeamBoard.assignments.find((assignment) => assignment.targetId === 'case004')?.specialistId; return id ? getBureauSpecialistProgress(bureauTeamBoard, id).rank : 0; })()}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_004_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case003Review' && (
          <>
            <View style={styles.closedStamp}><Text style={[styles.closedStampText, { color: colors.primary }]}>CASE CLOSED · 003</Text></View>
            <Text style={[styles.heroTitle, textStyle]}>The mark was never routine.</Text>
            <Text style={[styles.subtitle, mutedStyle]}>The Bureau has its first proven alteration. Rowan Vale’s warning now has a name attached to it.</Text>
            <View style={[styles.card, cardStyle]}><SectionLabel colors={colors}>Truth</SectionLabel><Text style={[styles.body, textStyle]}>{CASE_003_GAME.truth}</Text></View>
            <View style={[styles.card, cardStyle]}><SectionLabel colors={colors}>Proof</SectionLabel><Text style={[styles.body, textStyle]}>{CASE_003_GAME.proof}</Text></View>
            <View style={[styles.card, cardStyle]}><SectionLabel colors={colors}>Outcome</SectionLabel><Text style={[styles.body, textStyle]}>{CASE_003_GAME.outcome}</Text></View>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>THE MEMORY · Case 003 archived</SectionLabel>
              <Text style={[styles.memoryLine, textStyle]}>Clues inspected: {case003Progress.cluesFound.length}/4</Text>
              <Text style={[styles.memoryLine, textStyle]}>Questions asked: {case003Progress.askedQuestions.length}/6</Text>
              <Text style={[styles.memoryLine, textStyle]}>Questions left unasked: {case003Unanswered.length}</Text>
              <Text style={[styles.memoryNote, mutedStyle]}>This finding is now part of the Missing Detective campaign record.</Text>
            </View>
            <ActionButton title="Return to Detective Bureau" onPress={() => setPhase('hq')} colors={colors} />
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 48,
  },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  topline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  brand: { fontSize: 13, fontWeight: '900', letterSpacing: 4 },
  kicker: { fontSize: 9, fontWeight: '700', letterSpacing: 2, marginTop: 4 },
  caseStamp: { borderWidth: 1, borderRadius: 7, paddingHorizontal: 10, paddingVertical: 7 },
  caseStampText: { fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  heroTitle: { fontSize: 30, lineHeight: 36, fontWeight: '800', letterSpacing: 0.2 },
  subtitle: { fontSize: 14, lineHeight: 22, marginTop: 9, marginBottom: 12 },
  card: { borderWidth: 1, borderRadius: 18, padding: 17, marginTop: 14 },
  sectionLabel: { fontSize: 10, fontWeight: '900', letterSpacing: 2.1, marginBottom: 10, textTransform: 'uppercase' },
  caseTitle: { fontSize: 22, fontWeight: '800', lineHeight: 28 },
  cardTitle: { fontSize: 16, fontWeight: '800', lineHeight: 22 },
  body: { fontSize: 14, lineHeight: 22 },
  small: { fontSize: 12, lineHeight: 18, marginTop: 3 },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 },
  statusText: { fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  actionButton: { minHeight: 48, borderRadius: 13, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  actionButtonText: { fontSize: 13, fontWeight: '900', letterSpacing: 0.5, textAlign: 'center' },
  memoryGrid: { flexDirection: 'row', marginTop: 16, marginBottom: 4 },
  memoryCell: { flex: 1 },
  memoryNumber: { fontSize: 23, fontWeight: '800' },
  memoryLabel: { fontSize: 10, lineHeight: 15, marginTop: 4 },
  memoryNote: { fontSize: 12, lineHeight: 19, marginTop: 13 },
  footerNote: { fontSize: 11, lineHeight: 18, textAlign: 'center', marginTop: 24, letterSpacing: 0.4 },
  personRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 13 },
  personInitial: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A2636', marginRight: 12 },
  personInitialText: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  personCopy: { flex: 1 },
  flexCopy: { flex: 1 },
  index: { fontSize: 12, fontWeight: '900', marginRight: 12 },
  inspectCard: { padding: 15 },
  detail: { borderTopWidth: 1, borderTopColor: '#344052', marginTop: 13, paddingTop: 12 },
  progressTrack: { height: 5, borderRadius: 4, overflow: 'hidden', marginTop: 14 },
  progressFill: { height: 5, borderRadius: 4 },
  progressText: { fontSize: 11, lineHeight: 17, marginTop: 9 },
  row: { flexDirection: 'row', alignItems: 'center' },
  questionBlock: { marginTop: 13 },
  questionButton: { borderWidth: 1, borderRadius: 12, padding: 12 },
  questionText: { fontSize: 13, fontWeight: '700', lineHeight: 19 },
  reply: { fontSize: 13, lineHeight: 20, paddingHorizontal: 10, paddingTop: 10 },
  notice: { fontSize: 13, lineHeight: 20, marginTop: 14, fontWeight: '700' },
  sequenceItem: { fontSize: 13, lineHeight: 21, marginTop: 6 },
  optionCard: { borderWidth: 1, borderRadius: 14, padding: 15, marginTop: 10 },
  choice: { borderWidth: 1, borderRadius: 12, padding: 13, marginTop: 9 },
  closedStamp: { alignSelf: 'flex-start', borderWidth: 1, borderColor: '#B99A5B', borderRadius: 7, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 16 },
  closedStampText: { fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  memoryLine: { fontSize: 13, lineHeight: 22, marginTop: 4 },
});
