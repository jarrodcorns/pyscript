import { StyleSheet, View } from 'react-native';
import { Button, ProgressBar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BookOpen, CalendarDays, ChevronRight } from 'lucide-react-native';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { Screen } from '../components/Screen';
import { SectionCard } from '../components/SectionCard';
import { getDay, totalDays } from '../data/curriculum';
import { getProgressPercent, useAppStore } from '../store/appStore';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../types';

export function TodayScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentDay, completedDays } = useAppStore();
  const today = getDay(currentDay);
  const progress = getProgressPercent(completedDays) / 100;
  const isComplete = completedDays.includes(currentDay);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Today</Text>
        <Text style={styles.title}>Day {currentDay} of {totalDays}</Text>
        <Text style={styles.phase}>{today?.phaseTitle}</Text>
      </View>

      <DisclaimerBanner />

      <SectionCard title="Your progress" tone="accent">
        <ProgressBar progress={progress} color={colors.forest} style={styles.progress} />
        <Text style={styles.progressCopy}>
          {completedDays.length} days completed · {getProgressPercent(completedDays)}%
        </Text>
      </SectionCard>

      {today ? (
        <SectionCard title={today.title} subtitle={today.theme}>
          <Text style={styles.body}>{today.dailyRead}</Text>
          <Button
            mode="contained"
            buttonColor={colors.forest}
            icon={() => <ChevronRight color={colors.paper} size={18} />}
            onPress={() => navigation.navigate('Day', { day: currentDay })}
          >
            {isComplete ? 'Review today' : 'Open today’s session'}
          </Button>
        </SectionCard>
      ) : null}

      <SectionCard title="Quick paths">
        <Button
          mode="outlined"
          icon={() => <CalendarDays color={colors.forest} size={18} />}
          onPress={() => navigation.navigate('Main', { screen: 'Journey' } as never)}
        >
          View full journey
        </Button>
        <Button
          mode="outlined"
          icon={() => <BookOpen color={colors.forest} size={18} />}
          onPress={() => navigation.navigate('Main', { screen: 'Learn' } as never)}
        >
          Read research library
        </Button>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.moss,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.ink,
  },
  phase: {
    color: colors.muted,
    fontSize: 14,
  },
  progress: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#DDE8E3',
  },
  progressCopy: {
    color: colors.muted,
    fontSize: 13,
  },
  body: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
  },
});
