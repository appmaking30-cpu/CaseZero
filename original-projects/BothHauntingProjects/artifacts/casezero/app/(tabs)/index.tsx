import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import TrainStationScene from '@/components/TrainStationScene';
import HotelNightScene from '@/components/HotelNightScene';
import RecordsAnnexScene from '@/components/RecordsAnnexScene';
import SuspectPortrait from '@/components/SuspectPortrait';
import { useColors } from '@/hooks/useColors';
import Case004Screen from '@/components/Case004Screen';
import Case005Screen from '@/components/Case005Screen';
import Case006Screen from '@/components/Case006Screen';
import Case007Screen from '@/components/Case007Screen';
import Case008Screen from '@/components/Case008Screen';
import Case009Screen from '@/components/Case009Screen';
import Case010Screen from '@/components/Case010Screen';
import Case011Screen from '@/components/Case011Screen';
import Case012Screen from '@/components/Case012Screen';
import Case013Screen from '@/components/Case013Screen';
import Case014Screen from '@/components/Case014Screen';
import Case015Screen from '@/components/Case015Screen';
import Case016Screen from '@/components/Case016Screen';
import Case017Screen from '@/components/Case017Screen';
import Case018Screen from '@/components/Case018Screen';
import Case019Screen from '@/components/Case019Screen';
import Case020Screen from '@/components/Case020Screen';
import Case021Screen from '@/components/Case021Screen';
import Case022Screen from '@/components/Case022Screen';
import Case023Screen from '@/components/Case023Screen';
import Case024Screen from '@/components/Case024Screen';
import Case025Screen from '@/components/Case025Screen';
import Case026Screen from '@/components/Case026Screen';
import Case027Screen from '@/components/Case027Screen';
import Case028Screen from '@/components/Case028Screen';
import Case029Screen from '@/components/Case029Screen';
import Case030Screen from '@/components/Case030Screen';
import Case031Screen from '@/components/Case031Screen';
import Case032Screen from '@/components/Case032Screen';
import Case033Screen from '@/components/Case033Screen';
import Case034Screen from '@/components/Case034Screen';
import Case035Screen from '@/components/Case035Screen';
import Case036Screen from '@/components/Case036Screen';
import Case037Screen from '@/components/Case037Screen';
import Case038Screen from '@/components/Case038Screen';
import Case039Screen from '@/components/Case039Screen';
import Case040Screen from '@/components/Case040Screen';
import Case041Screen from '@/components/Case041Screen';
import Case042Screen from '@/components/Case042Screen';
import Case043Screen from '@/components/Case043Screen';
import Case044Screen from '@/components/Case044Screen';
import Case045Screen from '@/components/Case045Screen';
import Case046Screen from '@/components/Case046Screen';
import Case047Screen from '@/components/Case047Screen';
import Case048Screen from '@/components/Case048Screen';
import Case049Screen from '@/components/Case049Screen';
import Case050Screen from '@/components/Case050Screen';
import Case051Screen from '@/components/Case051Screen';
import Case052Screen from '@/components/Case052Screen';
import Case053Screen from '@/components/Case053Screen';
import Case054Screen from '@/components/Case054Screen';
import Case055Screen from '@/components/Case055Screen';
import Case056Screen from '@/components/Case056Screen';
import Case057Screen from '@/components/Case057Screen';
import Case058Screen from '@/components/Case058Screen';
import Case059Screen from '@/components/Case059Screen';
import Case060Screen from '@/components/Case060Screen';
import Case061Screen from '@/components/Case061Screen';
import Case062Screen from '@/components/Case062Screen';
import Case063Screen from '@/components/Case063Screen';
import Case064Screen from '@/components/Case064Screen';
import Case065Screen from '@/components/Case065Screen';
import Case066Screen from '@/components/Case066Screen';
import DailyCaseBulletinScreen from '@/components/DailyCaseBulletinScreen';
import BureauTeamScreen from '@/components/BureauTeamScreen';
import { CASE_004_GAME } from '@/game/case004Game';
import { CASE_005_GAME } from '@/game/case005Game';
import { CASE_006_GAME } from '@/game/case006Game';
import { CASE_007_GAME } from '@/game/case007Game';
import { CASE_008_GAME } from '@/game/case008Game';
import { CASE_009_GAME } from '@/game/case009Game';
import { CASE_010_GAME } from '@/game/case010Game';
import { CASE_011_GAME } from '@/game/case011Game';
import { CASE_012_GAME } from '@/game/case012Game';
import { CASE_013_GAME } from '@/game/case013Game';
import { CASE_014_GAME } from '@/game/case014Game';
import { CASE_015_GAME } from '@/game/case015Game';
import { CASE_016_GAME } from '@/game/case016Game';
import { CASE_017_GAME } from '@/game/case017Game';
import { CASE_018_GAME } from '@/game/case018Game';
import { CASE_019_GAME } from '@/game/case019Game';
import { CASE_020_GAME } from '@/game/case020Game';
import { CASE_021_GAME } from '@/game/case021Game';
import { CASE_022_GAME } from '@/game/case022Game';
import { CASE_023_GAME } from '@/game/case023Game';
import { CASE_024_GAME } from '@/game/case024Game';
import { CASE_025_GAME } from '@/game/case025Game';
import { CASE_026_GAME } from '@/game/case026Game';
import { CASE_027_GAME } from '@/game/case027Game';
import { CASE_028_GAME } from '@/game/case028Game';
import { CASE_029_GAME } from '@/game/case029Game';
import { CASE_030_GAME } from '@/game/case030Game';
import { CASE_031_GAME } from '@/game/case031Game';
import { CASE_032_GAME } from '@/game/case032Game';
import { CASE_033_GAME } from '@/game/case033Game';
import { CASE_034_GAME } from '@/game/case034Game';
import { CASE_035_GAME } from '@/game/case035Game';
import { CASE_036_GAME } from '@/game/case036Game';
import { CASE_037_GAME } from '@/game/case037Game';
import { CASE_038_GAME } from '@/game/case038Game';
import { CASE_039_GAME } from '@/game/case039Game';
import { CASE_040_GAME } from '@/game/case040Game';
import { CASE_041_GAME } from '@/game/case041Game';
import { CASE_042_GAME } from '@/game/case042Game';
import { CASE_043_GAME } from '@/game/case043Game';
import { CASE_044_GAME } from '@/game/case044Game';
import { CASE_045_GAME } from '@/game/case045Game';
import { CASE_046_GAME } from '@/game/case046Game';
import { CASE_047_GAME } from '@/game/case047Game';
import { CASE_048_GAME } from '@/game/case048Game';
import { CASE_049_GAME } from '@/game/case049Game';
import { CASE_050_GAME } from '@/game/case050Game';
import { CASE_051_GAME } from '@/game/case051Game';
import { CASE_052_GAME } from '@/game/case052Game';
import { CASE_053_GAME } from '@/game/case053Game';
import { CASE_054_GAME } from '@/game/case054Game';
import { CASE_055_GAME } from '@/game/case055Game';
import { CASE_056_GAME } from '@/game/case056Game';
import { CASE_057_GAME } from '@/game/case057Game';
import { CASE_058_GAME } from '@/game/case058Game';
import { CASE_059_GAME } from '@/game/case059Game';
import { CASE_060_GAME } from '@/game/case060Game';
import { CASE_061_GAME } from '@/game/case061Game';
import { CASE_062_GAME } from '@/game/case062Game';
import { CASE_063_GAME } from '@/game/case063Game';
import { CASE_064_GAME } from '@/game/case064Game';
import { CASE_065_GAME } from '@/game/case065Game';
import { CASE_066_GAME } from '@/game/case066Game';
import {
  CASE_001,
  getInvestigationMemory,
  getCase001ResumePhase,
  sanitizeCase001SavedProgress,
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
import { getMissingDetectiveArcStatus, getMissingDetectiveConvergence, getMissingDetectiveRecorderTrail, MISSING_DETECTIVE_DOSSIER } from '@/game/missingDetectiveArc';
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
type AppPhase = 'menu' | 'campaign' | CasePhase | Case002Phase | Case003Phase | 'case004' | 'case005' | 'case006' | 'case007' | 'case008' | 'case009' | 'case010' | 'case011' | 'case012' | 'case013' | 'case014' | 'case015' | 'case016' | 'case017' | 'case018' | 'case019' | 'case020' | 'case021' | 'case022' | 'case023' | 'case024' | 'case025' | 'case026' | 'case027' | 'case028' | 'case029' | 'case030' | 'case031' | 'case032' | 'case033' | 'case034' | 'case035' | 'case036' | 'case037' | 'case038' | 'case039' | 'case040' | 'case041' | 'case042' | 'case043' | 'case044' | 'case045' | 'case046' | 'case047' | 'case048' | 'case049' | 'case050' | 'case051' | 'case052' | 'case053' | 'case054' | 'case055' | 'case056' | 'case057' | 'case058' | 'case059' | 'case060' | 'case061' | 'case062' | 'case063' | 'case064' | 'case065' | 'case066' | 'daily' | 'team';

const CASE001_PHASES = new Set(['hq', 'briefing', 'evidence', 'interviews', 'timeline', 'deduction', 'review']);
const CASE002_PHASES = new Set(['case002Briefing', 'case002Evidence', 'case002Interviews', 'case002Timeline', 'case002Deduction', 'case002Review']);
const CASE003_PHASES = new Set(['case003Briefing', 'case003Evidence', 'case003Interviews', 'case003Timeline', 'case003Deduction', 'case003Review']);

function isKnownAppPhase(value: unknown): value is AppPhase {
  return typeof value === 'string' && (
    value === 'menu' ||
    value === 'campaign' ||
    value === 'daily' ||
    value === 'team' ||
    CASE001_PHASES.has(value) ||
    CASE002_PHASES.has(value) ||
    CASE003_PHASES.has(value) ||
    /^case(?:00[4-9]|0[1-5][0-9]|06[0-6])$/.test(value)
  );
}

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

function InvestigationBanner({ eyebrow, title, subtitle, step, progress, scene = false }: { eyebrow: string; title: string; subtitle: string; step: string; progress: string; scene?: 'station' | 'hotel' | 'archive' | false }) {
  return (
    <View style={styles.investigationBanner}>
      {scene === 'station' && <View style={styles.bannerArtwork}><TrainStationScene height={230} /></View>}
      {scene === 'hotel' && <View style={styles.bannerArtwork}><HotelNightScene height={230} /></View>}
      {scene === 'archive' && <View style={styles.bannerArtwork}><RecordsAnnexScene height={230} /></View>}
      <LinearGradient colors={['rgba(24,42,59,0.70)', 'rgba(16,26,41,0.84)', 'rgba(11,17,28,0.96)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.bannerOverlay}>
        <View style={styles.bannerTopline}>
          <Text style={styles.bannerEyebrow}>{eyebrow}</Text>
          <Text style={styles.bannerStep}>{step}</Text>
        </View>
        <Text style={styles.bannerTitle}>{title}</Text>
        <Text style={styles.bannerSubtitle}>{subtitle}</Text>
        <View style={styles.bannerBottomline}>
          <View style={styles.bannerRule} />
          <Text style={styles.bannerProgress}>{progress}</Text>
        </View>
        <View style={styles.bannerAccent} />
      </LinearGradient>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const { width: viewportWidth, height: viewportHeight } = useWindowDimensions();
  const wideLayout = viewportWidth > viewportHeight;
  const [loaded, setLoaded] = useState(false);
  const [archiveLoaded, setArchiveLoaded] = useState(false);
  const [investigationArchive, setInvestigationArchive] = useState<InvestigationArchive>(EMPTY_INVESTIGATION_ARCHIVE);
  const [bureauTeamBoard, setBureauTeamBoard] = useState<BureauTeamBoard>(EMPTY_BUREAU_TEAM_BOARD);
  const [phase, setPhase] = useState<AppPhase>('menu');
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
        if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
          const restoredProgress = sanitizeCase001SavedProgress(saved);
          setCluesFound(restoredProgress.cluesFound);
          setAskedQuestions(restoredProgress.askedQuestions);
          setTimelineOrder(restoredProgress.timelineOrder);
          setTimelineSolved(restoredProgress.timelineSolved);
          setTimelineAttempts(restoredProgress.timelineAttempts);
          setSelectedSuspect(restoredProgress.selectedSuspect);
          setSelectedMotive(restoredProgress.selectedMotive);
          setCaseCompleted(restoredProgress.caseCompleted);

          const hasStartedInvestigation =
            restoredProgress.cluesFound.length > 0 ||
            restoredProgress.askedQuestions.length > 0 ||
            restoredProgress.timelineOrder.length > 0 ||
            restoredProgress.caseCompleted;

          if (typeof saved.phase === 'string' && CASE001_PHASES.has(saved.phase)) {
            // Re-derive Case 001's resume stage from verified progress; never trust a saved screen
            // to skip an evidence, witness or chronology gate.
            setPhase(
              saved.phase === 'hq'
                ? (hasStartedInvestigation ? 'hq' : 'menu')
                : getCase001ResumePhase(restoredProgress),
            );
          } else if (isKnownAppPhase(saved.phase)) {
            setPhase(saved.phase);
          } else {
            setPhase(getCase001ResumePhase(restoredProgress));
          }
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
  const missingDetectiveRecorderTrail = useMemo(
    () => getMissingDetectiveRecorderTrail(investigationArchive),
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

  const openCase = () => setPhase(getCase001ResumePhase({
    caseCompleted,
    cluesFound,
    askedQuestions,
    timelineOrder,
    timelineSolved,
    selectedSuspect,
    selectedMotive,
  }));

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
      <SafeAreaView style={[styles.safe, { backgroundColor: '#080D18' }]}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={require('../../assets/images/observatory.jpg')} resizeMode="cover" imageStyle={styles.loadingImage} style={styles.loadingBackdrop}>
          <LinearGradient colors={['rgba(5,10,18,0.38)', 'rgba(5,10,18,0.82)', '#080D18']} style={styles.loadingOverlay}>
            <Text style={styles.loadingEdition}>THE INVESTIGATION DIVISION PRESENTS</Text>
            <Text style={styles.loadingTitle}>CASEZERO</Text>
            <Text style={styles.loadingTagline}>BEYOND THE EVIDENCE</Text>
            <View style={styles.loadingRule} />
            <Text style={styles.loadingStatus}>THE BUREAU IS COMING ONLINE</Text>
            <Text style={styles.loadingSubstatus}>Restoring THE MEMORY · Preparing your case files</Text>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[styles.content, wideLayout && styles.contentWide]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topline}>
          <View>
            <Text style={[styles.brand, { color: colors.primary }]}>CASEZERO</Text>
            <Text style={[styles.kicker, mutedStyle]}>BEYOND THE EVIDENCE</Text>
          </View>
          <View style={[styles.caseStamp, { borderColor: colors.primary }]}>
            <Text style={[styles.caseStampText, { color: colors.primary }]}>{phase === 'daily' ? 'DAILY FILE' : phase === 'team' ? 'BUREAU' : phase === 'campaign' ? 'CAMPAIGN ARCHIVE' : phase.startsWith('case002') ? 'FILE 002' : phase.startsWith('case003') ? 'FILE 003'  : phase.startsWith('case004') ? 'FILE 004'  : phase.startsWith('case005') ? 'FILE 005' : phase.startsWith('case006') ? 'FILE 006' : phase.startsWith('case007') ? 'FILE 007' : phase.startsWith('case008') ? 'FILE 008' : phase.startsWith('case009') ? 'FILE 009' : phase.startsWith('case010') ? 'FILE 010' : phase.startsWith('case011') ? 'FILE 011' : phase.startsWith('case012') ? 'FILE 012' : phase.startsWith('case013') ? 'FILE 013' : phase.startsWith('case014') ? 'FILE 014' : phase.startsWith('case015') ? 'FILE 015' : phase.startsWith('case016') ? 'FILE 016' : phase.startsWith('case017') ? 'FILE 017' : phase.startsWith('case018') ? 'FILE 018' : phase.startsWith('case019') ? 'FILE 019' : phase.startsWith('case020') ? 'FILE 020' : phase.startsWith('case021') ? 'FILE 021' : phase.startsWith('case022') ? 'FILE 022' : phase.startsWith('case023') ? 'FILE 023' : phase.startsWith('case024') ? 'FILE 024' : phase.startsWith('case025') ? 'FILE 025' : phase.startsWith('case026') ? 'FILE 026' : phase.startsWith('case027') ? 'FILE 027' : phase.startsWith('case028') ? 'FILE 028' : phase.startsWith('case029') ? 'FILE 029' : phase.startsWith('case030') ? 'FILE 030' : 'FILE 001'}</Text>
          </View>
        </View>

        {phase === 'menu' && (
          <View style={{ minHeight: wideLayout ? Math.max(460, viewportHeight - 105) : 620, borderWidth: 1, borderColor: '#344354', backgroundColor: '#080D18', overflow: 'hidden' }}>
            <ImageBackground source={require('../../assets/images/observatory.jpg')} resizeMode="cover" style={{ flex: 1, minHeight: wideLayout ? Math.max(460, viewportHeight - 105) : 620 }} imageStyle={{ opacity: 0.82 }}>
              <LinearGradient colors={['rgba(4,9,16,0.20)', 'rgba(5,10,18,0.60)', 'rgba(5,10,18,0.98)']} locations={[0,0.48,1]} style={{ flex: 1, justifyContent: 'space-between', padding: wideLayout ? 34 : 22 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                    <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#B99A58' }} />
                    <Text style={{ color: '#D7C18E', fontSize: 10, letterSpacing: 2.2, fontWeight: '700' }}>THE INVESTIGATION DIVISION</Text>
                  </View>
                  <Text style={{ color: '#AAB4C1', fontSize: 10, letterSpacing: 1.6 }}>EST. 1998  /  BUREAU NETWORK</Text>
                </View>
                <View style={{ maxWidth: wideLayout ? 680 : 520, alignSelf: wideLayout ? 'flex-start' : 'stretch', marginTop: wideLayout ? 12 : 26 }}>
                  <Text style={{ color: '#C5A86A', fontSize: 11, letterSpacing: 4, fontWeight: '700' }}>THE FILES NEVER FORGET</Text>
                  <Text style={{ color: '#F2F0E9', fontSize: wideLayout ? 64 : 48, lineHeight: wideLayout ? 70 : 54, letterSpacing: 5, fontWeight: '900', marginTop: 10 }}>CASEZERO</Text>
                  <Text style={{ color: '#D8DCE2', fontSize: wideLayout ? 16 : 14, letterSpacing: 3.2, marginTop: 4 }}>BEYOND THE EVIDENCE</Text>
                  <View style={{ height: 1, width: 94, backgroundColor: '#B99A58', marginTop: 23, marginBottom: 18 }} />
                  <Text style={{ color: '#E8E5DD', fontSize: wideLayout ? 22 : 19, lineHeight: wideLayout ? 31 : 27, fontWeight: '600' }}>ONE THOUSAND CASES.{ '\n' }ONE HIDDEN TRUTH.</Text>
                  <Text style={{ color: '#B9C0CA', fontSize: 13, lineHeight: 21, marginTop: 12, maxWidth: 510 }}>Some mysteries are solved. Others are only beginning. Every case leaves a trace. Every trace leads somewhere.</Text>
                </View>
                <View style={{ flexDirection: wideLayout ? 'row' : 'column', gap: 12, alignItems: 'stretch', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, flexDirection: wideLayout ? 'row' : 'column', gap: 10 }}>
                    <Pressable accessibilityRole="button" onPress={openCase} style={({ pressed }) => ({ flex: 1, minHeight: 54, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: '#B99A58', borderWidth: 1, borderColor: '#D6BD83', opacity: pressed ? 0.82 : 1 })}>
                      <Text style={{ color: '#101722', fontSize: 12, fontWeight: '900', letterSpacing: 1.8, textAlign: 'center' }}>{caseCompleted ? 'CONTINUE INVESTIGATION' : cluesFound.length ? 'RESUME CASE 001' : 'BEGIN INVESTIGATION'}</Text>
                    </Pressable>
                    <Pressable accessibilityRole="button" onPress={() => setPhase('hq')} style={({ pressed }) => ({ flex: 1, minHeight: 54, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: 'rgba(11,19,30,0.78)', borderWidth: 1, borderColor: '#718092', opacity: pressed ? 0.78 : 1 })}>
                      <Text style={{ color: '#E5E8EC', fontSize: 12, fontWeight: '800', letterSpacing: 1.8, textAlign: 'center' }}>ENTER THE BUREAU</Text>
                    </Pressable>
                  </View>
                  <Pressable accessibilityRole="button" onPress={() => setPhase('campaign')} style={({ pressed }) => ({ minHeight: 42, justifyContent: 'center', paddingHorizontal: 14, borderWidth: 1, borderColor: '#596779', backgroundColor: 'rgba(8,14,23,0.72)', opacity: pressed ? 0.78 : 1 })}>
                    <Text style={{ color: '#D9C28F', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, textAlign: 'center' }}>OPEN CAMPAIGN ARCHIVE</Text>
                  </Pressable>
                  <View style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderLeftWidth: wideLayout ? 1 : 0, borderTopWidth: wideLayout ? 0 : 1, borderColor: '#455365' }}>
                    <Text style={{ color: '#C5A86A', fontSize: 10, letterSpacing: 1.5, fontWeight: '700' }}>CAMPAIGN ARCHIVE</Text>
                    <Text style={{ color: '#F0EEE8', fontSize: 22, fontWeight: '800', marginTop: 3 }}>1,000+</Text>
                    <Text style={{ color: '#AAB4C1', fontSize: 9, letterSpacing: 1.3 }}>PLANNED CASE FILES</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        )}

        {phase === 'campaign' && (
          <View style={{ gap: 16, paddingBottom: 24 }}>
            <ImageBackground source={require('../../assets/images/observatory.jpg')} resizeMode="cover" style={{ minHeight: 190, borderWidth: 1, borderColor: '#596779' }}>
              <LinearGradient colors={['rgba(5,10,18,0.50)','rgba(5,10,18,0.94)']} style={{ flex: 1, padding: 24, justifyContent: 'flex-end' }}>
                <Text style={{ color: '#C5A86A', fontSize: 10, letterSpacing: 2.6, fontWeight: '800' }}>THE INVESTIGATION DIVISION · MASTER ARCHIVE</Text>
                <Text style={{ color: '#F1EEE7', fontSize: wideLayout ? 38 : 30, fontWeight: '900', letterSpacing: 1.4, marginTop: 8 }}>THE CASE FILES</Text>
                <Text style={{ color: '#C1C8D1', fontSize: 13, lineHeight: 20, marginTop: 8, maxWidth: 620 }}>One thousand investigations. One hidden truth. Follow the main investigation, uncover optional story arcs, or open an independent case.</Text>
              </LinearGradient>
            </ImageBackground>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {[
                { value: '1,000+', label: 'PLANNED CASE FILES' },
                { value: '100', label: 'MAIN STORY FILES' },
                { value: '200', label: 'SIDE STORY FILES' },
                { value: '66', label: 'CURRENT CAMPAIGN SET' },
              ].map((stat) => (
                <View key={stat.label} style={{ flexGrow: 1, minWidth: 115, padding: 14, backgroundColor: '#111B29', borderWidth: 1, borderColor: '#344354' }}>
                  <Text style={{ color: '#E4C985', fontSize: 23, fontWeight: '900' }}>{stat.value}</Text>
                  <Text style={{ color: '#9DAABA', fontSize: 9, letterSpacing: 1.1, marginTop: 4 }}>{stat.label}</Text>
                </View>
              ))}
            </View>
            <View style={{ padding: 18, backgroundColor: '#111B29', borderWidth: 1, borderColor: '#9B814D' }}>
              <Text style={{ color: '#C5A86A', fontSize: 10, letterSpacing: 2, fontWeight: '800' }}>PRIMARY INVESTIGATION · ACT I</Text>
              <Text style={{ color: '#F0EEE8', fontSize: 23, fontWeight: '800', marginTop: 8 }}>The Missing Detective</Text>
              <Text style={{ color: '#B8C2CE', fontSize: 12, lineHeight: 19, marginTop: 6 }}>A colleague vanished while tracing links between closed cases. The first three files establish the mystery and begin the trail.</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                <Pressable accessibilityRole="button" onPress={openCase} style={{ backgroundColor: '#B99A58', paddingVertical: 12, paddingHorizontal: 16 }}>
                  <Text style={{ color: '#111722', fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }}>{caseCompleted ? 'REVIEW FIRST INVESTIGATION' : cluesFound.length || askedQuestions.length || timelineOrder.length ? 'RESUME FIRST INVESTIGATION' : 'OPEN FIRST INVESTIGATION'}</Text>
                </Pressable>
                <Pressable accessibilityRole="button" disabled={!case001Archived && !case002Progress.completed} onPress={() => setPhase(case002Progress.completed ? 'case002Review' : 'case002Briefing')} style={{ borderWidth: 1, borderColor: case001Archived || case002Progress.completed ? '#7D8A9A' : '#394555', paddingVertical: 12, paddingHorizontal: 16, opacity: case001Archived || case002Progress.completed ? 1 : 0.48 }}>
                  <Text style={{ color: '#E1E5EA', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 }}>{case002Progress.completed ? 'REVIEW FILE 002' : case001Archived ? 'CONTINUE TO FILE 002' : 'FILE 002 · LOCKED'}</Text>
                </Pressable>
              </View>
            </View>
            <View style={{ gap: 10 }}>
              <Text style={{ color: '#E8E5DD', fontSize: 16, fontWeight: '900', letterSpacing: 1.4 }}>SIDE-STORY DOSSIERS</Text>
              {[
                ['01','THE MISSING DETECTIVE','30+ files · Main-story connection','Reopen the unfinished investigation and follow the colleague’s final trail.'],
                ['02','THE ORGANIZED CRIME NETWORK','20+ files · Long-form investigation','Trace a web of connected cases, hidden relationships and financial records.'],
                ['03','THE SERIAL CASE FILES','20+ files · Advanced deduction','Compare evidence across incidents and reconstruct the connections.'],
                ['04','THE COLD CASE ARCHIVE','30+ files · Historical investigations','Return to abandoned files and uncover overlooked evidence.'],
                ['05','THE CORRUPT RECORDS','20+ files · Bureau mystery','Investigate altered reports, missing documents and unexplained closures.'],
                ['06','THE VANISHING WITNESSES','15+ files · Character-led arc','Discover why witnesses from separate investigations are connected.'],
                ['07','THE ART OF DECEPTION','20+ files · Standalone arc','Solve theft, forgery and elaborate evidence-based mysteries.'],
                ['08','THE PRIVATE INVESTIGATOR','15+ files · Rival detective arc','Follow a recurring rival whose theories challenge your own.'],
                ['09','THE VANISHED CITY','15+ files · Location-led arc','Explore forgotten places and the histories hidden inside them.'],
                ['10','THE FINAL DOSSIER','Late-game · Convergence arc','Bring evidence from earlier storylines together to face the largest mystery.'],
              ].map((arc) => (
                <View key={arc[0]} style={{ flexDirection: 'row', gap: 12, padding: 14, backgroundColor: '#101925', borderWidth: 1, borderColor: '#344354' }}>
                  <View style={{ width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#8D7548' }}>
                    <Text style={{ color: '#D8BC7F', fontSize: 12, fontWeight: '900' }}>{arc[0]}</Text>
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={{ color: '#E8E5DD', fontSize: 12, fontWeight: '900', letterSpacing: 0.8 }}>{arc[1]}</Text>
                    <Text style={{ color: '#C5A86A', fontSize: 9, letterSpacing: 1 }}>{arc[2]}</Text>
                    <Text style={{ color: '#AEB9C6', fontSize: 11, lineHeight: 17 }}>{arc[3]}</Text>
                  </View>
                  <Text style={{ color: '#8491A1', fontSize: 9, alignSelf: 'center' }}>DOSSIER</Text>
                </View>
              ))}
            </View>
            <View style={{ padding: 16, backgroundColor: '#0D1520', borderWidth: 1, borderColor: '#344354' }}>
              <Text style={{ color: '#C5A86A', fontSize: 10, letterSpacing: 1.8, fontWeight: '800' }}>ARCHIVE STATUS</Text>
              <Text style={{ color: '#E2E6EB', fontSize: 12, lineHeight: 19, marginTop: 7 }}>The 1,000+ figure is the long-term content target. Only implemented and tested files are playable; future dossiers unlock as their investigations are built.</Text>
            </View>
            <ActionButton title="Return to the opening screen" onPress={() => setPhase('menu')} colors={colors} variant="ghost" />
            <ActionButton title="Return to Detective Bureau" onPress={() => setPhase('hq')} colors={colors} />
          </View>
        )}

        {phase === 'hq' && (
          <>
            <View style={styles.hqTopGrid}>
              <View style={styles.commandHeroPane}>
                <ImageBackground source={require('../../assets/images/observatory.jpg')} resizeMode="cover" imageStyle={styles.commandHeroImageStyle} style={styles.commandHeroImage}>
                  <View style={styles.commandHero}>
                <View style={styles.commandTopline}>
                  <View style={styles.commandLive}><View style={styles.commandLiveDot} /><Text style={styles.commandLiveText}>BUREAU NETWORK · ONLINE</Text></View>
                  <Text style={styles.commandEdition}>CASEZERO / 01</Text>
                </View>
                <Text style={styles.commandEyebrow}>THE INVESTIGATION DIVISION</Text>
                <Text style={styles.commandTitle}>Every clue has a story.</Text>
                <Text style={styles.commandSubtitle}>Read the evidence. Challenge the timeline. Find what the record can prove.</Text>
                <View style={styles.commandDivider} />
                <View style={styles.commandStats}>
                  <View style={styles.commandStat}>
                    <Text style={styles.commandStatValue}>{investigationArchive.completedCases.length + (caseCompleted ? 1 : 0)}</Text>
                    <Text style={styles.commandStatLabel}>FILES CLOSED</Text>
                  </View>
                  <View style={styles.commandStatRule} />
                  <View style={styles.commandStat}>
                    <Text style={styles.commandStatValue}>{investigationArchive.completedCases.reduce((sum, record) => sum + record.inspectedClues.length, cluesFound.length)}</Text>
                    <Text style={styles.commandStatLabel}>CLUES LOGGED</Text>
                  </View>
                  <View style={styles.commandStatRule} />
                  <View style={styles.commandStat}>
                    <Text style={styles.commandStatValue}>66</Text>
                    <Text style={styles.commandStatLabel}>CAMPAIGN FILES</Text>
                  </View>
                </View>
                <View style={styles.commandBoard}>
                  <View style={styles.commandBoardLine} />
                  <View style={[styles.commandPin, styles.commandPinOne]} />
                  <View style={[styles.commandPin, styles.commandPinTwo]} />
                  <View style={[styles.commandPin, styles.commandPinThree]} />
                  <View style={styles.commandBoardCard}>
                    <Text style={styles.commandBoardLabel}>PRIORITY FILE · 001</Text>
                    <Text style={styles.commandBoardTitle}>The Last Train Home</Text>
                    <Text style={styles.commandBoardMeta}>{caseCompleted ? 'CLOSED · REVIEW AVAILABLE' : cluesFound.length > 0 ? 'ACTIVE · INVESTIGATION IN PROGRESS' : 'READY · AWAITING YOUR REVIEW'}</Text>
                  </View>
                </View>
              </View>
                </ImageBackground>
              </View>
              <View style={styles.hqCasePane}>
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
              </View>
            </View>

            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>MASTER CASE ARCHIVE</SectionLabel>
              <Text style={[styles.cardTitle, textStyle]}>The wider investigation.</Text>
              <Text style={[styles.body, mutedStyle]}>Track the central conspiracy, browse the ten connected story dossiers, and see which files are playable now versus planned for future releases.</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginTop: 12 }}>
                <View style={{ flex: 1, minWidth: 105, padding: 12, backgroundColor: '#101925', borderWidth: 1, borderColor: '#344354' }}>
                  <Text style={{ color: '#D8BC7F', fontSize: 22, fontWeight: '900' }}>66</Text>
                  <Text style={{ color: '#AEB9C6', fontSize: 9, letterSpacing: 1 }}>CURRENT FILE SET</Text>
                </View>
                <View style={{ flex: 1, minWidth: 105, padding: 12, backgroundColor: '#101925', borderWidth: 1, borderColor: '#344354' }}>
                  <Text style={{ color: '#D8BC7F', fontSize: 22, fontWeight: '900' }}>{investigationArchive.completedCases.length + (caseCompleted && !case001Archived ? 1 : 0)}</Text>
                  <Text style={{ color: '#AEB9C6', fontSize: 9, letterSpacing: 1 }}>FILES CLOSED</Text>
                </View>
                <View style={{ flex: 1, minWidth: 105, padding: 12, backgroundColor: '#101925', borderWidth: 1, borderColor: '#344354' }}>
                  <Text style={{ color: '#D8BC7F', fontSize: 22, fontWeight: '900' }}>1,000+</Text>
                  <Text style={{ color: '#AEB9C6', fontSize: 9, letterSpacing: 1 }}>LONG-TERM TARGET</Text>
                </View>
              </View>
              <ActionButton title="Open campaign archive and story dossiers" onPress={() => setPhase('campaign')} colors={colors} />
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
            {missingDetectiveConvergence.unlocked && !investigationArchive.completedCases.some((record) => record.caseId === 'case005') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 005</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_005_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_005_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The North Quay transfer has a destination after all. A carbon receipt survived at East Freight Registry.</Text>
                <ActionButton title="Open Case 005" onPress={() => setPhase('case005')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case005') && !investigationArchive.completedCases.some((record) => record.caseId === 'case006') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 006</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_006_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_006_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The recovered recorder is ready for controlled review. Its transcript may identify the authority behind the M-2 transfer, but not the speaker.</Text>
                <ActionButton title="Open recorder review" onPress={() => setPhase('case006')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case006') && !investigationArchive.completedCases.some((record) => record.caseId === 'case007') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 007</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_007_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_007_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The recovered instruction points to Station Three. The Bureau can now investigate the physical handover without assuming it knows who issued the order.</Text>
                <ActionButton title="Open Case 007" onPress={() => setPhase('case007')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case007') && !investigationArchive.completedCases.some((record) => record.caseId === 'case008') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 008</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_008_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_008_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Station Three's duplicate index names Bellweather Archive Exchange. Compare its intake receipt and maintenance register with the first relay's records.</Text>
                <ActionButton title="Open Case 008" onPress={() => setPhase('case008')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case008') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Next lead · Shared authorization</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>Two relays. One unresolved authority.</Text>
                <Text style={[styles.body, mutedStyle]}>The same M-2 route and override reference appear at both sites. That links the process, not a person. The third reference in Bellweather's inventory code is the next lead.</Text>
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case008') && !investigationArchive.completedCases.some((record) => record.caseId === 'case009') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 009</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_009_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_009_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Bellweather's inventory code points to schedule D-4 at Meridian Dispatch Annex. The Bureau can now trace the authorization record without assuming it reveals the approver.</Text>
                <ActionButton title="Open Case 009" onPress={() => setPhase('case009')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case009') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Next lead · Restricted personnel index</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>The approver field is still sealed.</Text>
                <Text style={[styles.body, mutedStyle]}>Schedule D-4 identifies the record series, not the person who authorized the M-2 renewal. A marginal note points to a sealed personnel index.</Text>
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case009') && !investigationArchive.completedCases.some((record) => record.caseId === 'case010') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 010</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_010_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_010_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The P-1 personnel index can identify which office held conditional M-2 authority during the Route Governance outage. The sealed C-4 rotation ledger may identify the individual holder.</Text>
                <ActionButton title="Open Case 010" onPress={() => setPhase('case010')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case010') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Next lead · Sealed rotation ledger</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>C-4 has a holder. The copy hides the name.</Text>
                <Text style={[styles.body, mutedStyle]}>Emergency Continuity held conditional M-2 authority during the outage. The pooled duty code still needs to be matched to the sealed rotation ledger.</Text>
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case010') && !investigationArchive.completedCases.some((record) => record.caseId === 'case011') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 011</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_011_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_011_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The sealed C-4 rotation ledger can confirm who was scheduled. The shared terminal session still does not identify who operated it.</Text>
                <ActionButton title="Open Case 011" onPress={() => setPhase('case011')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case011') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Next lead · Terminal access corridor</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>C-4-OPS-2 had a physical access route.</Text>
                <Text style={[styles.body, mutedStyle]}>The roster identifies Sable as primary, but the shared session has no personal operator. The access-control log may show who could reach the terminal.</Text>
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case011') && !investigationArchive.completedCases.some((record) => record.caseId === 'case012') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 012</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_012_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_012_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The C-4 access export records badge B-17 at the south vestibule around the terminal session. The next file reconstructs the route without assuming who carried the badge.</Text>
                <ActionButton title="Open Case 012" onPress={() => setPhase('case012')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case012') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Next lead · Badge custody register</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>Who had badge B-17 at 01:27?</Text>
                <Text style={[styles.body, mutedStyle]}>The south vestibule is confirmed as the route matching the C-4 session. The badge custody and temporary-loan register may explain whether B-17 changed hands before the entry.</Text>
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case012') && !investigationArchive.completedCases.some((record) => record.caseId === 'case013') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 013</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_013_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_013_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The L-204 custody register may identify who was recorded as borrowing B-17 during the 01:27 access window. It cannot, by itself, identify who presented the badge.</Text>
                <ActionButton title="Open Case 013" onPress={() => setPhase('case013')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case013') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Next lead · Reader exception packet</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>Did S-04 record a normal badge presentation?</Text>
                <Text style={[styles.body, mutedStyle]}>The loan register identifies Ivo as the recorded borrower, not the person who necessarily presented the badge. The reader maintenance and exception packet may clarify how the access event was accepted.</Text>
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case013') && !investigationArchive.completedCases.some((record) => record.caseId === 'case014') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 014</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_014_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_014_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The reader event records a local fallback decision during central-link instability. Determine what the system did without assuming who presented the badge.</Text>
                <ActionButton title="Open Case 014" onPress={() => setPhase('case014')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case014') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Next lead · Signed maintenance work order</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>Who was authorized to configure fallback?</Text>
                <Text style={[styles.body, mutedStyle]}>The event packet explains the reader path but not who configured it. The signed work order and technician handoff may establish the authorized maintenance window.</Text>
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case014') && !investigationArchive.completedCases.some((record) => record.caseId === 'case015') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 015</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_015_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_015_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>A secure-floor checkpoint places Ivo Dane’s staff pass beside the C-4 inner door. Establish what the credential record proves—and what it cannot.</Text>
                <ActionButton title="Open Case 015" onPress={() => setPhase('case015')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case015') && !investigationArchive.completedCases.some((record) => record.caseId === 'case016') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 016</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_016_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_016_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The checkpoint record led to the C-4 inner door. Now compare the latch, occupancy counter and shared terminal session—without confusing a system event with a person's identity.</Text>
                <ActionButton title="Open Case 016" onPress={() => setPhase('case016')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case016') && !investigationArchive.completedCases.some((record) => record.caseId === 'case017') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 017</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_017_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_017_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The C-4 session used a shared account. Now trace the token packet and handoff register to find where personal custody stops being documented.</Text>
                <ActionButton title="Open Case 017" onPress={() => setPhase('case017')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case017') && !investigationArchive.completedCases.some((record) => record.caseId === 'case018') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 018</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_018_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_018_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>H-9 was moved to a secure tray with no recipient recorded. Trace the key cabinet issue and return records without treating a shared credential as an identified person.</Text>
                <ActionButton title="Open Case 018" onPress={() => setPhase('case018')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case018') && !investigationArchive.completedCases.some((record) => record.caseId === 'case019') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 019</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_019_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_019_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>H-9 was listed in the secure tray, then absent from the morning count. Compare the inventory, seal sheet and audit notice without inventing a collector.</Text>
                <ActionButton title="Open Case 019" onPress={() => setPhase('case019')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case019') && !investigationArchive.completedCases.some((record) => record.caseId === 'case020') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 020</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_020_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_020_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The missing H-9 receipt leads beyond the vault. Match the dispatch manifest, route docket and East Archive stamp while keeping destination proof separate from personal custody.</Text>
                <ActionButton title="Open Case 020" onPress={() => setPhase('case020')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case020') && !investigationArchive.completedCases.some((record) => record.caseId === 'case021') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 021</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_021_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_021_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The East Archive roster identifies the assigned intake desk. Compare the shift roster, desk allocation, relief note and staffing reconciliation without treating assignment as a personal receipt.</Text>
                <ActionButton title="Open Case 021" onPress={() => setPhase('case021')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case021') && !investigationArchive.completedCases.some((record) => record.caseId === 'case022') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 022</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_022_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_022_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The intake roster identifies Desk C, but not H-9’s receiver. Review the sealed register, opening-control sheet, carbon index and seal inspection for a packet-level record.</Text>
                <ActionButton title="Open Case 022" onPress={() => setPhase('case022')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case022') && !investigationArchive.completedCases.some((record) => record.caseId === 'case023') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 023</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_023_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_023_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>E-44 was flagged for a blank receiver field. Check whether an amendment was actually submitted, whether the page changed, and what the audit could verify.</Text>
                <ActionButton title="Open Case 023" onPress={() => setPhase('case023')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case023') && !investigationArchive.completedCases.some((record) => record.caseId === 'case024') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 024</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_024_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_024_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The East Archive register already carried a blank receiver field. Trace H-9 back through the dispatch tally, archive-bound copy, transfer docket and duplicate control.</Text>
                <ActionButton title="Open Case 024" onPress={() => setPhase('case024')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case024') && !investigationArchive.completedCases.some((record) => record.caseId === 'case025') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 025</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_025_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_025_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The earliest surviving copy is already blank. Trace the copy-room queue, release counterfoil, duty roster and paper count without confusing print access with authorship.</Text>
                <ActionButton title="Open Case 025" onPress={() => setPhase('case025')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case025') && !investigationArchive.completedCases.some((record) => record.caseId === 'case026') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 026</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_026_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_026_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The print job points to terminal D-3. Compare its shared-session ledger with the source-file version register before deciding what can actually be attributed to a person.</Text>
                <ActionButton title="Open Case 026" onPress={() => setPhase('case026')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case026') && !investigationArchive.completedCases.some((record) => record.caseId === 'case027') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 027</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_027_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_027_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The source version belongs to a shared session. Reconstruct the shift handover and credential checkout to establish the team access window without assigning an individual.</Text>
                <ActionButton title="Open Case 027" onPress={() => setPhase('case027')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case027') && !investigationArchive.completedCases.some((record) => record.caseId === 'case028') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 028</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_028_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_028_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>A separate visitor register and personal badge log may place an individual in reception during the shared access window. Establish exactly what those records prove—and where their coverage ends.</Text>
                <ActionButton title="Open Case 028" onPress={() => setPhase('case028')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case028') && !investigationArchive.completedCases.some((record) => record.caseId === 'case029') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 029</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_029_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_029_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The visitor was recorded in reception. Now test whether escort paperwork and independent access records place that visitor in the secure corridor or terminal room.</Text>
                <ActionButton title="Open Case 029" onPress={() => setPhase('case029')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case029') && !investigationArchive.completedCases.some((record) => record.caseId === 'case030') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 030</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_030_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_030_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The escort reached the D-3 approach. Compare radio, occupancy, door and clock records to establish what happened inside—without assuming who was there.</Text>
                <ActionButton title="Open Case 030" onPress={() => setPhase('case030')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case030') && !investigationArchive.completedCases.some((record) => record.caseId === 'case031') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 031</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_031_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_031_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The room was occupied and a shared terminal session followed. Review the profile audit and pending credential request without treating a team login as a named operator.</Text>
                <ActionButton title="Open Case 031" onPress={() => setPhase('case031')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case039') && !investigationArchive.completedCases.some((record) => record.caseId === 'case040') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 040</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_040_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_040_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The missing DS-1 handover carbon has surfaced. Reconstruct the shift transfer and determine what it proves about responsibility—and what it cannot prove about the operator.</Text>
                <ActionButton title="Open Case 040" onPress={() => setPhase('case040')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case042') && !investigationArchive.completedCases.some((record) => record.caseId === 'case043') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 043</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_043_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_043_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The duplicate says “R. Vale”. Compare the entry with sealed handwriting samples and independent 09:03 records before attributing the writing.</Text>
                <ActionButton title="Open Case 043" onPress={() => setPhase('case043')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case043') && !investigationArchive.completedCases.some((record) => record.caseId === 'case044') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 044</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_044_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_044_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The handwriting review leaves a question about access. Trace D-17 through the corridor reader without assuming who carried the shared badge.</Text>
                <ActionButton title="Open Case 044" onPress={() => setPhase('case044')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case044') && !investigationArchive.completedCases.some((record) => record.caseId === 'case045') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 045</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_045_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_045_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The reader proved D-17 entered the corridor. Recover the original handover packet and establish who received the shared token—without confusing a shift role with a person.</Text>
                <ActionButton title="Open Case 045" onPress={() => setPhase('case045')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case045') && !investigationArchive.completedCases.some((record) => record.caseId === 'case046') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 046</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_046_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_046_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The handover names a role, not a recipient. Compare the signed RELIEF-2 roster with the separate desk allocation and shared console audit.</Text>
                <ActionButton title="Open Case 046" onPress={() => setPhase('case046')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case046') && !investigationArchive.completedCases.some((record) => record.caseId === 'case047') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 047</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_047_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_047_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>A carbon slip bears initials M.P. Compare the counter register, correction note and return seal before attributing the pickup to anyone.</Text>
                <ActionButton title="Open Case 047" onPress={() => setPhase('case047')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case047') && !investigationArchive.completedCases.some((record) => record.caseId === 'case048') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 048</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_048_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_048_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The original request behind the D-17 correction has surfaced. Trace its receipt and archive trail without treating a shared credential or matching initials as proof of authorship.</Text>
                <ActionButton title="Open Case 048" onPress={() => setPhase('case048')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case048') && !investigationArchive.completedCases.some((record) => record.caseId === 'case049') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 049</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_049_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_049_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The request packet's checklist calls for an authorization leaf that is absent from the scan batch. Trace the documented custody gap without assuming who removed it.</Text>
                <ActionButton title="Open Case 049" onPress={() => setPhase('case049')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case049') && !investigationArchive.completedCases.some((record) => record.caseId === 'case050') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 050</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_050_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_050_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The source-tray ledger lists the missing authorization leaf, but no independent contents check confirms it was physically there. Trace the tray's movement without guessing who handled it.</Text>
                <ActionButton title="Open Case 050" onPress={() => setPhase('case050')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case054') && !investigationArchive.completedCases.some((record) => record.caseId === 'case055') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 055</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_055_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_055_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 054 recovered the archive packet but could not verify the recorder itself. Now compare Rowan’s original item-level assignment schedule, duty roster, North Annex acknowledgment and independent closeout to establish the last assignment the records can actually support.</Text>
                <ActionButton title="Open Case 055" onPress={() => setPhase('case055')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case055') && !investigationArchive.completedCases.some((record) => record.caseId === 'case056') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 056</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_056_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_056_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 055 established Rowan’s North Annex RS-14 assignment. Now reconcile the corrected field-log clock with the independently retained relay-control recording to determine whether Rowan’s presence and participation can be corroborated—without claiming the recorder’s custody is solved.</Text>
                <ActionButton title="Open Case 056" onPress={() => setPhase('case056')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case056') && !investigationArchive.completedCases.some((record) => record.caseId === 'case057') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 057</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_057_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_057_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 056 corroborated Rowan’s North Annex presence and RS-14 participation. Now test the west-corridor response against the repeater mode sheet, decoder audit and channel-side inventory. A network receipt is not proof that Rowan or the recorder reached the corridor.</Text>
                <ActionButton title="Open Case 057" onPress={() => setPhase('case057')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case057') && !investigationArchive.completedCases.some((record) => record.caseId === 'case058') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 058</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_058_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_058_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 057 ruled out the west-corridor signal as a physical-location lead. Now authenticate the unindexed local buffer, correct its six-minute clock offset, and test whether its data carries a recorder-specific fingerprint.</Text>
                <ActionButton title="Open Case 058" onPress={() => setPhase('case058')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case065') && !investigationArchive.completedCases.some((record) => record.caseId === 'case066') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>FINAL CLASSIFIED FILE · 066</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_066_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_066_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The recovered recorder points to a final sealed statement. Authenticate it against the independent confidential-review register, then decide what the Bureau can responsibly publish without exposing private details or inventing an outcome.</Text>
                <ActionButton title="Open Case 066 · Close the arc" onPress={() => setPhase('case066')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case064') && !investigationArchive.completedCases.some((record) => record.caseId === 'case065') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 065</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_065_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_065_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The recorder packet has been retrieved under dual-witness custody. Examine its inventory, read-only metadata and independent checksum. Establish what the evidence can prove without inventing a speaker or local timestamp.</Text>
                <ActionButton title="Open Case 065" onPress={() => setPhase('case065')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case063') && !investigationArchive.completedCases.some((record) => record.caseId === 'case064') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 064</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_064_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_064_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 063 identified one corroborated system exception. Now trace the recorder-transfer packet through its accession label, dispatch manifest, receiving scan and seal report without assuming who carried it.</Text>
                <ActionButton title="Open Case 064" onPress={() => setPhase('case064')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case062') && !investigationArchive.completedCases.some((record) => record.caseId === 'case063') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 063</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_063_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_063_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 062 narrowed the cylinder trail without identifying a handler. Now compare the signed North Annex hardware baseline with two independent system indexes to isolate the corroborated exception window.</Text>
                <ActionButton title="Open Case 063" onPress={() => setPhase('case063')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case061') && !investigationArchive.completedCases.some((record) => record.caseId === 'case062') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 062</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_062_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_062_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 061 confirmed that K-2B was registered as a reserve but did not establish use. Now check whether C-2’s cylinder was serviced or replaced.</Text>
                <ActionButton title="Open Case 062" onPress={() => setPhase('case062')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case060') && !investigationArchive.completedCases.some((record) => record.caseId === 'case061') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 061</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_061_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_061_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 060 reconciled the shared badge event and team key issue. Check whether a registered spare was ever checked out or connected to the incident.</Text>
                <ActionButton title="Open Case 061" onPress={() => setPhase('case061')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case059') && !investigationArchive.completedCases.some((record) => record.caseId === 'case060') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 060</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_060_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_060_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 059 narrowed the lead to C-2. Reconcile the independent badge-controller archive with the physical key issue and return records.</Text>
                <ActionButton title="Open Case 060" onPress={() => setPhase('case060')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case058') && !investigationArchive.completedCases.some((record) => record.caseId === 'case059') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 059</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_059_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_059_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 058 authenticated B-17 but could not identify its creator. Compare the access roster, seal checks, independent retention receipt and shared maintenance handover.</Text>
                <ActionButton title="Open Case 059" onPress={() => setPhase('case059')} colors={colors} />
              </View>
            )}

            {investigationArchive.completedCases.some((record) => record.caseId === 'case053') && !investigationArchive.completedCases.some((record) => record.caseId === 'case054') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 054</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_054_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_054_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The independent archive index points to Rowan Vale’s recorder-transfer packet. Trace its receipt and routing, then establish whether the records prove the recorder itself entered custody.</Text>
                <ActionButton title="Open Case 054" onPress={() => setPhase('case054')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case052') && !investigationArchive.completedCases.some((record) => record.caseId === 'case053') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified incoming file · 053</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_053_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_053_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Case 052 traced the changed route. Now one seal serial appears on two dispatch packets, although the official register lists a single issue. Audit the records without assuming a second physical seal exists.</Text>
                <ActionButton title="Open Case 053" onPress={() => setPhase('case053')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case051') && !investigationArchive.completedCases.some((record) => record.caseId === 'case052') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 052</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_052_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_052_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The approval workflow was incomplete. Now the dispatch records show whether the changed destination was acted upon—and whether that execution can be tied to an individual.</Text>
                <ActionButton title="Open Case 052" onPress={() => setPhase('case052')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case050') && !investigationArchive.completedCases.some((record) => record.caseId === 'case051') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 051</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_051_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_051_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The source-tray trail records an allocation, but not physical custody. Examine the approval roster, workflow status and required signatures to determine whether D-17 was ever validly approved.</Text>
                <ActionButton title="Open Case 051" onPress={() => setPhase('case051')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case041') && !investigationArchive.completedCases.some((record) => record.caseId === 'case042') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 042</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_042_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_042_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>RA-17 has been retrieved under dual custody. The duplicate contains a recipient name; establish what that entry proves about the writer.</Text>
                <ActionButton title="Open Case 042" onPress={() => setPhase('case042')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case040') && !investigationArchive.completedCases.some((record) => record.caseId === 'case041') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 041</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_041_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_041_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>A second copy of the handover packet was routed to the Records Annex. Retrieve its trail and establish what the archive records prove—and what remains unknown.</Text>
                <ActionButton title="Open Case 041" onPress={() => setPhase('case041')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case038') && !investigationArchive.completedCases.some((record) => record.caseId === 'case039') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 039</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_039_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_039_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>A deeper audit identifies DS-1 as the workstation that created Q-19. The session is shared, however, and no personal operator is recorded. Find the missing handover.</Text>
                <ActionButton title="Open Case 039" onPress={() => setPhase('case039')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case037') && !investigationArchive.completedCases.some((record) => record.caseId === 'case038') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 038</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_038_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_038_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>Imaging queue ticket Q-19 reserved Bay 2 six minutes before cart M-4 left the restricted office. Find out what the early reservation proves—and who remains hidden behind the shared account.</Text>
                <ActionButton title="Open Case 038" onPress={() => setPhase('case038')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case036') && !investigationArchive.completedCases.some((record) => record.caseId === 'case037') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 037</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_037_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_037_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>A recovered movement carbon traces sealed cart M-4 from the restricted office to imaging. Reconstruct the route and identify what the torn handler field leaves unanswered.</Text>
                <ActionButton title="Open Case 037" onPress={() => setPhase('case037')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case035') && !investigationArchive.completedCases.some((record) => record.caseId === 'case036') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 036</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_036_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_036_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>A restricted review register names Rowan Vale as the assigned reviewer. Establish what the review proves—and what it cannot prove about the missing transfer.</Text>
                <ActionButton title="Open Case 036" onPress={() => setPhase('case036')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case034') && !investigationArchive.completedCases.some((record) => record.caseId === 'case035') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 035</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_035_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_035_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The changed attachment has been traced to a numbered source page. Its checksum points to Annex K-17, where a black-square routing mark and handwritten initials appear in the custody records. Establish the source without guessing who made the mark.</Text>
                <ActionButton title="Open Case 035" onPress={() => setPhase('case035')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case033') && !investigationArchive.completedCases.some((record) => record.caseId === 'case034') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 034</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_034_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_034_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The receipt confirmed which package Niko acknowledged. A revision ledger now reveals that the queued package changed moments earlier. Trace the version history without assigning a shared-profile action to a named person.</Text>
                <ActionButton title="Open Case 034" onPress={() => setPhase('case034')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case032') && !investigationArchive.completedCases.some((record) => record.caseId === 'case033') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 033</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_033_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_033_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>A newly recovered export receipt carries a personal badge signature. Determine exactly which action it identifies without extending that proof to the earlier shared terminal session.</Text>
                <ActionButton title="Open Case 033" onPress={() => setPhase('case033')} colors={colors} />
              </View>
            )}
            {investigationArchive.completedCases.some((record) => record.caseId === 'case031') && !investigationArchive.completedCases.some((record) => record.caseId === 'case032') && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Incoming file · 032</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{CASE_032_GAME.title}</Text>
                <Text style={[styles.body, mutedStyle]}>{CASE_032_GAME.subtitle}</Text>
                <Text style={[styles.memoryNote, textStyle]}>The shared profile has been confirmed, but its operator remains unknown. Review the duty roster and signed shift handover to establish who held responsibility for the desk.</Text>
                <ActionButton title="Open Case 032" onPress={() => setPhase('case032')} colors={colors} />
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
                <Text style={[styles.memoryNote, mutedStyle]}>{investigationArchive.completedCases.some((record) => record.caseId === 'case006') ? 'Next lead: trace the relay desk named in the recovered instruction.' : investigationArchive.completedCases.some((record) => record.caseId === 'case005') ? 'Next lead: review the recorder and establish who issued the M-2 instruction.' : 'Next lead: trace who received the M-2 transfer after the North Quay collection.'}</Text>
              </View>
            )}
            {missingDetectiveRecorderTrail.unlocked && (
              <View style={[styles.card, cardStyle]}>
                <SectionLabel colors={colors}>Classified · Rowan Vale casefile</SectionLabel>
                <Text style={[styles.caseTitle, textStyle]}>{missingDetectiveRecorderTrail.reportTitle}</Text>
                <Text style={[styles.small, { color: colors.primary }]}>Dispatch chain reviewed · {missingDetectiveRecorderTrail.completedCaseCount}/{missingDetectiveRecorderTrail.requiredCaseCount} files archived</Text>
                <Text style={[styles.body, mutedStyle]}>{missingDetectiveRecorderTrail.reportSummary}</Text>
                {missingDetectiveRecorderTrail.evidenceLinks.map((entry) => (
                  <View key={entry} style={[styles.detail, { borderTopColor: colors.border }]}>
                    <Text style={[styles.small, textStyle]}>{entry}</Text>
                  </View>
                ))}
                <Text style={[styles.memoryNote, mutedStyle]}>{missingDetectiveRecorderTrail.nextLead}</Text>
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
            <InvestigationBanner eyebrow="INCOMING FILE · 002" title={CASE_002_GAME.title} subtitle={CASE_002_GAME.subtitle} step="01 / BRIEFING" progress="NEW LOCATION · HOTEL ARCHIVE" scene="hotel" />
            <View style={wideLayout ? styles.briefingGrid : undefined}>
            <View style={[styles.card, cardStyle, wideLayout && styles.briefingPane]}>
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
            <View style={[styles.card, cardStyle, wideLayout && styles.briefingPane]}>
              <SectionLabel colors={colors}>Persons of interest</SectionLabel>
              {CASE_002_GAME.suspects.map((suspect) => (
                <View key={suspect.id} style={styles.personRow}>
                  <SuspectPortrait variant={suspect.id === 'june' ? 'nia' : suspect.id === 'ellis' ? 'miles' : 'ada'} size={66} />
                  <View style={styles.personCopy}>
                    <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text>
                    <Text style={[styles.small, { color: colors.primary }]}>{suspect.role}</Text>
                    <Text style={[styles.small, mutedStyle]}>{suspect.note}</Text>
                  </View>
                </View>
              ))}
            </View>
            </View>
            <ActionButton title="Begin evidence review" onPress={() => setPhase('case002Evidence')} colors={colors} />
            <ActionButton title="Back to Bureau" onPress={() => setPhase('hq')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case002Evidence' && (
          <>
            <InvestigationBanner eyebrow="HOTEL ARCHIVE · FILE 002" title="A locked room. An empty shelf." subtitle="Inspect all four records. The sequence matters more than the blackout itself." step="02 / EVIDENCE" progress={`${case002Progress.cluesFound.length} OF 4 RECORDS LOGGED`} scene="hotel" />
            <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${(case002Progress.cluesFound.length / CASE_002_GAME.clues.length) * 100}%` }]} />
            </View>
            <Text style={[styles.progressText, mutedStyle]}>{case002Progress.cluesFound.length} of 4 records logged</Text>
            <View style={wideLayout ? styles.evidenceGrid : undefined}>
            {CASE_002_GAME.clues.map((clue, index) => {
              const found = case002Progress.cluesFound.includes(clue.id);
              const expanded = case002ActiveClue === clue.id;
              return (
                <Pressable key={clue.id} accessibilityRole="button" onPress={() => inspectCase002Clue(clue.id)}
                  style={({ pressed }) => [styles.card, cardStyle, styles.inspectCard, wideLayout && styles.inspectCardWide, { opacity: pressed ? 0.82 : 1, borderColor: found ? colors.primary : colors.border }]}>
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
            </View>
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
            <InvestigationBanner eyebrow="HOTEL ARCHIVE · FILE 002" title="Who moved the ledger?" subtitle="Hear from each witness. Previous case notes can change what the Bureau asks you to notice." step="03 / INTERVIEWS" progress={`${case002WitnessCount} OF 3 WITNESSES HEARD`} />
            <View style={wideLayout ? styles.witnessGrid : undefined}>
            {CASE_002_GAME.witnesses.map((witness, index) => (
              <View key={witness.id} style={[styles.card, cardStyle, wideLayout && styles.witnessCardWide]}>
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
            </View>
            <Text style={[styles.progressText, mutedStyle]}>{case002WitnessCount}/3 witnesses heard · {case002Unanswered.length} questions left unasked</Text>
            <ActionButton title="Reconstruct the timeline" onPress={() => setPhase('case002Timeline')} colors={colors} disabled={!case002AllWitnessesHeard} />
            <ActionButton title="Back to evidence" onPress={() => setPhase('case002Evidence')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case002Timeline' && (
          <>
            <InvestigationBanner eyebrow="HOTEL ARCHIVE · FILE 002" title="Did the blackout hide the move?" subtitle="Put the four records in chronological order. Watch when the door actually closed." step="04 / RECONSTRUCTION" progress={`${case002Progress.timelineOrder.length} OF 4 EVENTS PLACED`} />
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Your sequence</SectionLabel>
              {case002Progress.timelineOrder.length === 0 ? <Text style={[styles.body, mutedStyle]}>No events selected yet.</Text> : case002Progress.timelineOrder.map((id, index) => {
                const event = CASE_002_GAME.timelineEvents.find((item) => item.id === id);
                return <Text key={id} style={[styles.sequenceItem, textStyle]}>{index + 1}. {event?.time} — {event?.title}</Text>;
              })}
            </View>
            <View style={wideLayout ? styles.timelineGrid : undefined}>
            {CASE_002_GAME.timelineEvents.map((event) => {
              const selected = case002Progress.timelineOrder.includes(event.id);
              return (
                <Pressable key={event.id} accessibilityRole="button" disabled={selected || case002Progress.timelineSolved} onPress={() => selectCase002TimelineEvent(event.id)}
                  style={({ pressed }) => [styles.optionCard, wideLayout && styles.timelineCardWide, { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border, opacity: selected ? 0.48 : pressed ? 0.8 : 1 }]}>
                  <Text style={[styles.small, { color: colors.primary }]}>{event.time}</Text>
                  <Text style={[styles.cardTitle, textStyle]}>{event.title}</Text>
                  <Text style={[styles.small, mutedStyle]}>{event.detail}</Text>
                </Pressable>
              );
            })}
            </View>
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
            <InvestigationBanner eyebrow="FINAL REVIEW · FILE 002" title="The room was locked. Was it a theft?" subtitle="Choose who moved the ledger and why. Your theory must fit the entry log, the water evidence and the timeline." step="05 / DEDUCTION" progress="ALL RECORDS MUST AGREE" />
            <View style={wideLayout ? styles.deductionGrid : undefined}>
            <View style={[styles.card, cardStyle, wideLayout && styles.deductionPane]}>
              <SectionLabel colors={colors}>Who moved it?</SectionLabel>
              {CASE_002_GAME.suspects.map((suspect) => {
                const selected = case002Progress.selectedSuspect === suspect.id;
                return <Pressable key={suspect.id} accessibilityRole="button" onPress={() => setCase002Progress((current) => ({ ...current, selectedSuspect: suspect.id }))}
                  style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text><Text style={[styles.small, mutedStyle]}>{suspect.role}</Text>
                </Pressable>;
              })}
            </View>
            <View style={[styles.card, cardStyle, wideLayout && styles.deductionPane]}>
              <SectionLabel colors={colors}>Why?</SectionLabel>
              {CASE_002_GAME.motives.map((motive) => {
                const selected = case002Progress.selectedMotive === motive.id;
                return <Pressable key={motive.id} accessibilityRole="button" onPress={() => setCase002Progress((current) => ({ ...current, selectedMotive: motive.id }))}
                  style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <Text style={[styles.cardTitle, textStyle]}>{motive.label}</Text><Text style={[styles.small, mutedStyle]}>{motive.note}</Text>
                </Pressable>;
              })}
            </View>
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
            <InvestigationBanner eyebrow="PRIORITY FILE · 001" title={CASE_001.title} subtitle="THE LAST TRAIN HOME · An envelope disappeared before the final train left the station." step="01 / BRIEFING" progress="PERSONS OF INTEREST IDENTIFIED" scene="station" />
            <Text style={[styles.subtitle, mutedStyle]}>{CASE_001.briefing}</Text>
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Persons of interest</SectionLabel>
              {CASE_001.suspects.map((suspect) => (
                <View key={suspect.id} style={styles.personRow}>
                  <SuspectPortrait variant={suspect.id} size={66} />
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
            <InvestigationBanner eyebrow="EVIDENCE ROOM · FILE 001" title="Every detail matters." subtitle="Inspect the recovered records. Match the small inconsistencies before you question the witnesses." step="02 / EVIDENCE" progress={`${cluesFound.length} OF 5 RECORDS LOGGED`} scene="station" />
            <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${(cluesFound.length / CASE_001.clues.length) * 100}%` }]} />
            </View>
            <Text style={[styles.progressText, mutedStyle]}>{cluesFound.length} of 5 records logged</Text>
            <View style={wideLayout ? styles.evidenceGrid : undefined}>
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
                    wideLayout && styles.inspectCardWide,
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
            </View>
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
            <InvestigationBanner eyebrow="INTERVIEW ROOM · FILE 001" title="Three accounts. One timeline." subtitle="Ask each witness at least one question. Follow the details that do not fit." step="03 / INTERVIEWS" progress={`${witnessCount} OF 3 WITNESSES HEARD`} />
            <View style={wideLayout ? styles.witnessGrid : undefined}>
            {CASE_001.witnesses.map((witness, index) => (
              <View key={witness.id} style={[styles.card, cardStyle, wideLayout && styles.witnessCardWide]}>
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
            </View>
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
            <InvestigationBanner eyebrow="TIMELINE ANALYSIS · FILE 001" title="Rebuild the final hour." subtitle="Arrange the verified events from earliest to latest. The timestamps are evidence too." step="04 / RECONSTRUCTION" progress={`${timelineOrder.length} OF 4 EVENTS PLACED`} />
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
            <View style={wideLayout ? styles.timelineGrid : undefined}>
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
                    wideLayout && styles.timelineCardWide,
                    { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border, opacity: selected ? 0.48 : pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text style={[styles.small, { color: colors.primary }]}>{event.time}</Text>
                  <Text style={[styles.cardTitle, textStyle]}>{event.title}</Text>
                  <Text style={[styles.small, mutedStyle]}>{event.detail}</Text>
                </Pressable>
              );
            })}
            </View>
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
            <InvestigationBanner eyebrow="FINAL REVIEW · FILE 001" title="Build your case." subtitle="Choose the person and motive that explain every verified clue. An unsupported guess will not close the file." step="05 / DEDUCTION" progress="ALL EVIDENCE MUST AGREE" />
            <View style={wideLayout ? styles.deductionGrid : undefined}>
            <View style={[styles.card, cardStyle, wideLayout && styles.deductionPane]}>
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
            <View style={[styles.card, cardStyle, wideLayout && styles.deductionPane]}>
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
            <InvestigationBanner eyebrow="CLASSIFIED FILE · 003" title={CASE_003_GAME.title} subtitle={CASE_003_GAME.subtitle} step="01 / BRIEFING" progress="BUREAU INTEGRITY REVIEW" scene="archive" />
            <View style={wideLayout ? styles.briefingGrid : undefined}>
            <View style={[styles.card, cardStyle, wideLayout && styles.briefingPane]}>
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
            <View style={[styles.card, cardStyle, wideLayout && styles.briefingPane]}>
              <SectionLabel colors={colors}>Persons under review</SectionLabel>
              {CASE_003_GAME.suspects.map((suspect) => (
                <View key={suspect.id} style={styles.personRow}>
                  <SuspectPortrait variant={suspect.id === 'pike' ? 'nia' : suspect.id === 'arden' ? 'miles' : 'ada'} size={66} />
                  <View style={styles.personCopy}>
                    <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text>
                    <Text style={[styles.small, { color: colors.primary }]}>{suspect.role}</Text>
                    <Text style={[styles.small, mutedStyle]}>{suspect.note}</Text>
                  </View>
                </View>
              ))}
            </View>
            </View>
            <ActionButton title="Begin evidence review" onPress={() => setPhase('case003Evidence')} colors={colors} />
            <ActionButton title="Back to Bureau" onPress={() => setPhase('hq')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case003Evidence' && (
          <>
            <InvestigationBanner eyebrow="RECORDS ANNEX · FILE 003" title="Who changed the closed files?" subtitle="Inspect every record. The mark matters, but the chain of custody matters more." step="02 / EVIDENCE" progress={`${case003Progress.cluesFound.length} OF 4 RECORDS LOGGED`} scene="archive" />
            <View style={[styles.progressTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${(case003Progress.cluesFound.length / CASE_003_GAME.clues.length) * 100}%` }]} />
            </View>
            <Text style={[styles.progressText, mutedStyle]}>{case003Progress.cluesFound.length} of 4 records logged</Text>
            <View style={wideLayout ? styles.evidenceGrid : undefined}>
            {CASE_003_GAME.clues.map((clue, index) => {
              const found = case003Progress.cluesFound.includes(clue.id);
              const expanded = case003ActiveClue === clue.id;
              return (
                <Pressable key={clue.id} accessibilityRole="button" onPress={() => inspectCase003Clue(clue.id)}
                  style={({ pressed }) => [styles.card, cardStyle, styles.inspectCard, wideLayout && styles.inspectCardWide, { opacity: pressed ? 0.82 : 1, borderColor: found ? colors.primary : colors.border }]}>
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
            </View>
            <ActionButton title="Question the witnesses" onPress={() => setPhase('case003Interviews')} colors={colors} disabled={!case003AllCluesFound} />
            <ActionButton title="Back to briefing" onPress={() => setPhase('case003Briefing')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'case003Interviews' && (
          <>
            <InvestigationBanner eyebrow="RECORDS ANNEX · FILE 003" title="Who had authority to alter the record?" subtitle="Compare each statement with the physical and digital records. Your earlier investigations shape what the Bureau asks next." step="03 / INTERVIEWS" progress={`${case003WitnessCount} OF 3 WITNESSES HEARD`} />
            <View style={wideLayout ? styles.witnessGrid : undefined}>
            {CASE_003_GAME.witnesses.map((witness, index) => (
              <View key={witness.id} style={[styles.card, cardStyle, wideLayout && styles.witnessCardWide]}>
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
            </View>
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
            <InvestigationBanner eyebrow="RECORDS ANNEX · FILE 003" title="When was the file changed?" subtitle="Place the four events in chronological order. Watch the difference between the cabinet opening and dispatch delivery." step="04 / RECONSTRUCTION" progress={`${case003Progress.timelineOrder.length} OF 4 EVENTS PLACED`} />
            <View style={[styles.card, cardStyle]}>
              <SectionLabel colors={colors}>Your sequence</SectionLabel>
              {case003Progress.timelineOrder.length === 0 ? <Text style={[styles.body, mutedStyle]}>No events selected yet.</Text> : case003Progress.timelineOrder.map((id, index) => {
                const event = CASE_003_GAME.timelineEvents.find((item) => item.id === id);
                return <Text key={id} style={[styles.sequenceItem, textStyle]}>{index + 1}. {event?.time} — {event?.title}</Text>;
              })}
            </View>
            <View style={wideLayout ? styles.timelineGrid : undefined}>
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
            </View>
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
            <InvestigationBanner eyebrow="FINAL REVIEW · FILE 003" title="Who placed the black square?" subtitle="Choose the person and motive that explain the printer job, seal custody and cabinet access together." step="05 / DEDUCTION" progress="CHAIN OF CUSTODY REQUIRED" />
            <View style={wideLayout ? styles.deductionGrid : undefined}>
            <View style={[styles.card, cardStyle, wideLayout && styles.deductionPane]}>
              <SectionLabel colors={colors}>Who altered the files?</SectionLabel>
              {CASE_003_GAME.suspects.map((suspect) => {
                const selected = case003Progress.selectedSuspect === suspect.id;
                return <Pressable key={suspect.id} accessibilityRole="button" onPress={() => setCase003Progress((current) => ({ ...current, selectedSuspect: suspect.id }))}
                  style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <Text style={[styles.cardTitle, textStyle]}>{suspect.name}</Text><Text style={[styles.small, mutedStyle]}>{suspect.role}</Text>
                </Pressable>;
              })}
            </View>
            <View style={[styles.card, cardStyle, wideLayout && styles.deductionPane]}>
              <SectionLabel colors={colors}>Why?</SectionLabel>
              {CASE_003_GAME.motives.map((motive) => {
                const selected = case003Progress.selectedMotive === motive.id;
                return <Pressable key={motive.id} accessibilityRole="button" onPress={() => setCase003Progress((current) => ({ ...current, selectedMotive: motive.id }))}
                  style={[styles.choice, { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.secondary : 'transparent' }]}>
                  <Text style={[styles.cardTitle, textStyle]}>{motive.label}</Text><Text style={[styles.small, mutedStyle]}>{motive.note}</Text>
                </Pressable>;
              })}
            </View>
            </View>
            {!!case003DeductionMessage && <Text style={[styles.notice, { color: colors.destructive }]}>{case003DeductionMessage}</Text>}
            <ActionButton title="Submit evidence-based conclusion" onPress={submitCase003Deduction} colors={colors}
              disabled={!case003Progress.selectedSuspect || !case003Progress.selectedMotive || !case003AllCluesFound || !case003AllWitnessesHeard || !case003Progress.timelineSolved} />
            <ActionButton title="Back to timeline" onPress={() => setPhase('case003Timeline')} colors={colors} variant="ghost" />
          </>
        )}

        {phase === 'team' && <BureauTeamScreen archive={investigationArchive} onBoardChange={setBureauTeamBoard} onReturn={() => setPhase('hq')} />}

        {phase === 'daily' && <DailyCaseBulletinScreen onReturn={() => setPhase('hq')} assignedSpecialistName={BUREAU_SPECIALISTS.find((specialist) => specialist.id === bureauTeamBoard.assignments.find((assignment) => assignment.targetId === 'daily')?.specialistId)?.name ?? null} onComplete={(dateKey) => setBureauTeamBoard((current) => awardBureauDailyExperience(current, dateKey))} />}

        {phase === 'case014' && (
          <Case014Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_014_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case020' && (
          <Case020Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_020_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case021' && (
          <Case021Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_021_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case022' && (
          <Case022Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_022_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case023' && (
          <Case023Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_023_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case024' && (
          <Case024Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_024_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case025' && (
          <Case025Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_025_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case026' && (
          <Case026Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_026_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case027' && (
          <Case027Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_027_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case028' && (
          <Case028Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_028_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case029' && (
          <Case029Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_029_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case030' && (
          <Case030Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_030_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case031' && (
          <Case031Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_031_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case040' && (
          <Case040Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_040_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case043' && (
          <Case043Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_043_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case044' && (
          <Case044Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_044_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case045' && (
          <Case045Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_045_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case046' && (
          <Case046Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_046_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case048' && (
          <Case048Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_048_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case049' && (
          <Case049Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_049_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case055' && (
          <Case055Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_055_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case056' && (
          <Case056Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_056_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case057' && (
          <Case057Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_057_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case058' && (
          <Case058Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_058_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case059' && (
          <Case059Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_059_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case060' && (
          <Case060Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_060_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case061' && (
          <Case061Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_061_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case066' && (
          <Case066Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_066_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case065' && (
          <Case065Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_065_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case064' && (
          <Case064Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_064_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case063' && (
          <Case063Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_063_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case062' && (
          <Case062Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_062_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case054' && (
          <Case054Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_054_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case053' && (
          <Case053Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_053_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case052' && (
          <Case052Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_052_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case051' && (
          <Case051Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_051_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case050' && (
          <Case050Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_050_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}
        {phase === 'case047' && (
          <Case047Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_047_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case042' && (
          <Case042Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_042_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case041' && (
          <Case041Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_041_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case039' && (
          <Case039Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_039_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case038' && (
          <Case038Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_038_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case037' && (
          <Case037Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_037_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case036' && (
          <Case036Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_036_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case035' && (
          <Case035Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_035_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case034' && (
          <Case034Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_034_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case033' && (
          <Case033Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_033_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case032' && (
          <Case032Screen archive={investigationArchive} bureauTeamBoard={bureauTeamBoard}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_032_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}


        {phase === 'case019' && (
          <Case019Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_019_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case018' && (
          <Case018Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_018_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case017' && (
          <Case017Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_017_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case016' && (
          <Case016Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_016_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case015' && (
          <Case015Screen archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_015_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case013' && (
          <Case013Screen
            archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_013_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case012' && (
          <Case012Screen
            archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_012_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case011' && (
          <Case011Screen
            archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_011_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case010' && (
          <Case010Screen
            archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_010_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case009' && (
          <Case009Screen
            archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_009_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case008' && (
          <Case008Screen
            archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_008_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case007' && (
          <Case007Screen
            archive={investigationArchive}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_007_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case006' && (
          <Case006Screen
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_006_GAME.id));
            }}
            onReturn={() => setPhase('hq')}
          />
        )}

        {phase === 'case005' && (
          <Case005Screen
            archive={investigationArchive}
            assignedSpecialistId={bureauTeamBoard.assignments.find((assignment) => assignment.targetId === 'case005')?.specialistId ?? null}
            assignedSpecialistRank={(() => { const id = bureauTeamBoard.assignments.find((assignment) => assignment.targetId === 'case005')?.specialistId; return id ? getBureauSpecialistProgress(bureauTeamBoard, id).rank : 0; })()}
            onArchive={(record) => {
              setInvestigationArchive((current) => archiveCompletedCase(current, record));
              setBureauTeamBoard((current) => awardBureauCaseExperience(current, CASE_005_GAME.id));
            }}
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
  investigationBanner: { minHeight: 190, borderWidth: 1, borderColor: '#34475B', borderRadius: 20, marginBottom: 14, overflow: 'hidden', backgroundColor: '#101A29' },
  bannerArtwork: { ...StyleSheet.absoluteFill, opacity: 0.94 },
  bannerOverlay: { flex: 1, minHeight: 190, paddingHorizontal: 24, paddingVertical: 20, justifyContent: 'center' },
  bannerTopline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  bannerEyebrow: { color: '#D7B873', fontSize: 9, fontWeight: '900', letterSpacing: 2 },
  bannerStep: { color: '#8294A8', fontSize: 9, fontWeight: '900', letterSpacing: 1.4 },
  bannerTitle: { color: '#F4EFE4', fontSize: 29, lineHeight: 34, fontWeight: '900', letterSpacing: -0.6 },
  bannerSubtitle: { color: '#B1BECC', fontSize: 12, lineHeight: 19, marginTop: 8, maxWidth: 680 },
  bannerBottomline: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  bannerRule: { width: 44, height: 2, backgroundColor: '#D7B873', marginRight: 10 },
  bannerProgress: { color: '#D7B873', fontSize: 8, fontWeight: '900', letterSpacing: 1.2 },
  bannerAccent: { position: 'absolute', width: 180, height: 180, borderWidth: 1, borderColor: 'rgba(215,184,115,0.15)', borderRadius: 90, right: -50, top: -70 },
  briefingGrid: { flexDirection: 'row', alignItems: 'stretch', gap: 14 },
  briefingPane: { flex: 1, minWidth: 0, marginTop: 0 },
  witnessGrid: { flexDirection: 'row', alignItems: 'stretch', gap: 12 },
  timelineGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  deductionGrid: { flexDirection: 'row', alignItems: 'stretch', gap: 14 },
  deductionPane: { flex: 1, minWidth: 0, marginTop: 0 },
  commandHeroImage: { flex: 1, minHeight: 390, borderRadius: 22, overflow: 'hidden', justifyContent: 'flex-end' },
  commandHeroImageStyle: { opacity: 0.72 },
  commandHeroPane: { flex: 1.25, minWidth: 0 },
  hqCasePane: { flex: 0.85, minWidth: 0, justifyContent: 'center' },
  hqTopGrid: { flexDirection: 'row', alignItems: 'stretch', gap: 18, minHeight: 390, marginBottom: 18 },
  commandHero: { flex: 1, backgroundColor: 'rgba(8, 15, 27, 0.78)', borderColor: '#526174', borderWidth: 1, borderRadius: 22, padding: 22, overflow: 'hidden', justifyContent: 'center' },
  commandTopline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 27 },
  commandLive: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B302F', borderColor: '#35544B', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 },
  commandLiveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#79C49A', marginRight: 7 },
  commandLiveText: { color: '#A9D8BA', fontSize: 8, fontWeight: '900', letterSpacing: 1.1 },
  commandEdition: { color: '#8191A3', fontSize: 9, fontWeight: '800', letterSpacing: 1.4 },
  commandEyebrow: { color: '#D6B46A', fontSize: 9, fontWeight: '900', letterSpacing: 2.2, marginBottom: 9 },
  commandTitle: { color: '#F4EFE4', fontSize: 29, lineHeight: 34, fontWeight: '900', letterSpacing: -0.6 },
  commandSubtitle: { color: '#AAB7C5', fontSize: 12, lineHeight: 19, marginTop: 8, maxWidth: 310 },
  commandDivider: { height: 1, backgroundColor: '#344354', marginTop: 18, marginBottom: 15 },
  commandStats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  commandStat: { flex: 1 },
  commandStatValue: { color: '#F0D18A', fontSize: 21, fontWeight: '900' },
  commandStatLabel: { color: '#8798AA', fontSize: 8, fontWeight: '900', letterSpacing: 1.05, marginTop: 3 },
  commandStatRule: { width: 1, height: 29, backgroundColor: '#344354', marginHorizontal: 10 },
  commandBoard: { height: 106, backgroundColor: '#172638', borderColor: '#3B4B5B', borderWidth: 1, borderRadius: 14, marginTop: 18, justifyContent: 'center', paddingHorizontal: 13, overflow: 'hidden' },
  commandBoardLine: { position: 'absolute', width: 210, height: 1, backgroundColor: '#9B7650', opacity: 0.8, left: 34, top: 51, transform: [{ rotate: '-12deg' }] },
  commandPin: { position: 'absolute', width: 7, height: 7, borderRadius: 4, backgroundColor: '#D6B46A', borderWidth: 1, borderColor: '#F5DCA3' },
  commandPinOne: { left: 27, top: 26 },
  commandPinTwo: { left: 116, top: 55 },
  commandPinThree: { right: 28, top: 29 },
  commandBoardCard: { alignSelf: 'flex-start', backgroundColor: '#202F40', borderColor: '#536173', borderWidth: 1, borderRadius: 9, paddingHorizontal: 12, paddingVertical: 9 },
  commandBoardLabel: { color: '#D6B46A', fontSize: 8, fontWeight: '900', letterSpacing: 1.3 },
  commandBoardTitle: { color: '#F1EBDD', fontSize: 15, fontWeight: '900', marginTop: 4 },
  commandBoardMeta: { color: '#A5B2BF', fontSize: 8, fontWeight: '800', letterSpacing: 0.7, marginTop: 4 },

  content: {
    width: '100%',
    maxWidth: 1320,
    alignSelf: 'center',
    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 48,
  },
  contentWide: { paddingHorizontal: 34, paddingTop: 10, paddingBottom: 24 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  loadingBackdrop: { flex: 1, width: '100%', justifyContent: 'center' },
  loadingImage: { opacity: 0.82 },
  loadingOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  loadingEdition: { color: '#D7B873', fontSize: 9, fontWeight: '900', letterSpacing: 3, textAlign: 'center' },
  loadingTitle: { color: '#F3EBDD', fontSize: 54, lineHeight: 62, fontWeight: '900', letterSpacing: 7, marginTop: 16 },
  loadingTagline: { color: '#AEBAC6', fontSize: 10, fontWeight: '800', letterSpacing: 4, marginTop: 7 },
  loadingRule: { width: 72, height: 2, backgroundColor: '#D7B873', marginTop: 28, marginBottom: 22 },
  loadingStatus: { color: '#E9D5A5', fontSize: 9, fontWeight: '900', letterSpacing: 2, textAlign: 'center' },
  loadingSubstatus: { color: '#94A2B1', fontSize: 11, marginTop: 9, textAlign: 'center' },
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
  personRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 13, gap: 12 },
  personInitial: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A2636', marginRight: 12 },
  personInitialText: { fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  personCopy: { flex: 1 },
  flexCopy: { flex: 1 },
  index: { fontSize: 12, fontWeight: '900', marginRight: 12 },
  evidenceGrid: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', gap: 12, marginTop: 8 },
  inspectCard: { padding: 15 },
  inspectCardWide: { width: '48%', flexGrow: 1, marginTop: 0, minHeight: 108 },
  timelineCardWide: { width: '48%', flexGrow: 1, marginTop: 0 },
  witnessCardWide: { flex: 1, minWidth: 0, marginTop: 0 },
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
