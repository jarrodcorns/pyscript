import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckCircle2, Circle } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { SectionCard } from '../components/SectionCard';
import { curriculum } from '../data/curriculum';
import { useAppStore } from '../store/appStore';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../types';

const phaseSummaries = [
  { phase: 1, label: 'Grounding & separation of self', days: '1–7' },
  { phase: 2, label: 'Micro-connections & safe touch', days: '8–14' },
  { phase: 3, label: 'Communication without pressure', days: '15–21' },
  { phase: 4, label: 'The long anchor', days: '22–30' },
] as const;

export function JourneyScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { completedDays, currentDay } = useAppStore();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>30-Day Journey</Text>
        <Text style={styles.subtitle}>
          Move at your pace. Revisit days anytime. Progress is saved on this device.
        </Text>
      </View>

      {phaseSummaries.map((summary) => (
        <SectionCard
          key={summary.phase}
          title={`Phase ${summary.phase}`}
          subtitle={`${summary.label} · Days ${summary.days}`}
        >
          <View style={styles.dayList}>
            {curriculum
              .filter((day) => day.phase === summary.phase)
              .map((day) => {
                const done = completedDays.includes(day.day);
                const active = day.day === currentDay;
                return (
                  <Pressable
                    key={day.day}
                    style={[styles.dayRow, active && styles.dayRowActive]}
                    onPress={() => navigation.navigate('Day', { day: day.day })}
                  >
                    {done ? (
                      <CheckCircle2 color={colors.forest} size={18} />
                    ) : (
                      <Circle color={active ? colors.gold : colors.muted} size={18} />
                    )}
                    <View style={styles.dayCopy}>
                      <Text style={styles.dayTitle}>
                        Day {day.day}: {day.title}
                      </Text>
                      <Text style={styles.dayTheme}>{day.theme}</Text>
                    </View>
                  </Pressable>
                );
              })}
          </View>
        </SectionCard>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.ink,
  },
  subtitle: {
    color: colors.muted,
    lineHeight: 20,
  },
  dayList: {
    gap: spacing.sm,
  },
  dayRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'flex-start',
  },
  dayRowActive: {
    backgroundColor: '#F7FBF8',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
  },
  dayCopy: {
    flex: 1,
    gap: 2,
  },
  dayTitle: {
    color: colors.ink,
    fontWeight: '600',
    fontSize: 14,
  },
  dayTheme: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
  },
});
