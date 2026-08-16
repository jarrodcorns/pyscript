import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronRight, Clock3 } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { learnArticles } from '../data/learn';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../types';

export function LearnScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Learn</Text>
        <Text style={styles.subtitle}>
          Evidence-informed guides on depression, anxiety, medication effects, and rebuilding
          connection — written for partners, not clinicians.
        </Text>
      </View>

      {learnArticles.map((article) => (
        <Pressable
          key={article.id}
          style={styles.card}
          onPress={() => navigation.navigate('Article', { articleId: article.id })}
        >
          <Text style={styles.eyebrow}>{article.eyebrow}</Text>
          <Text style={styles.cardTitle}>{article.title}</Text>
          <Text style={styles.summary}>{article.summary}</Text>
          <View style={styles.metaRow}>
            <Clock3 color={colors.moss} size={14} />
            <Text style={styles.meta}>{article.readingMinutes} min read</Text>
            <ChevronRight color={colors.moss} size={16} style={styles.chevron} />
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
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
  card: {
    backgroundColor: colors.paper,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.moss,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },
  summary: {
    color: colors.muted,
    lineHeight: 20,
    fontSize: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meta: {
    color: colors.moss,
    fontSize: 12,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
});
