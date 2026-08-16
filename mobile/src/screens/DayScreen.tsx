import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { SectionCard } from '../components/SectionCard';
import { SourceList } from '../components/SourceList';
import { getDay } from '../data/curriculum';
import { useAppStore } from '../store/appStore';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../types';

export function DayScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Day'>>();
  const { completeDay, completedDays } = useAppStore();
  const day = getDay(route.params.day);

  if (!day) {
    return (
      <Screen>
        <Text>Day not found.</Text>
      </Screen>
    );
  }

  const isComplete = completedDays.includes(day.day);

  const handleComplete = async () => {
    await completeDay(day.day);
    navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{day.phaseTitle}</Text>
        <Text style={styles.title}>Day {day.day}: {day.title}</Text>
        <Text style={styles.theme}>{day.theme}</Text>
      </View>

      <SectionCard title="Today’s read">
        <Text style={styles.body}>{day.dailyRead}</Text>
      </SectionCard>

      <SectionCard title="Real-world example" tone="accent">
        <Text style={styles.body}>{day.example}</Text>
      </SectionCard>

      <SectionCard title="Practice">
        <Text style={styles.body}>{day.practice}</Text>
      </SectionCard>

      <SectionCard title="Reflection">
        <Text style={styles.body}>{day.reflection}</Text>
      </SectionCard>

      <SectionCard title="Why this matters">
        <Text style={styles.body}>{day.evidenceNote}</Text>
        <SourceList sourceIds={day.sourceIds} />
      </SectionCard>

      <Button
        mode="contained"
        buttonColor={colors.forest}
        onPress={handleComplete}
        style={styles.cta}
      >
        {isComplete ? 'Mark reviewed again' : 'Complete day'}
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Main', { screen: 'Support' } as never)}>
        Need crisis support?
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.moss,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.ink,
    lineHeight: 32,
  },
  theme: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
  },
  body: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
  },
  cta: {
    marginTop: spacing.sm,
  },
});
