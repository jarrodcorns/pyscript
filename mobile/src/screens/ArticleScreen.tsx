import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Screen } from '../components/Screen';
import { SectionCard } from '../components/SectionCard';
import { SourceList } from '../components/SourceList';
import { getArticleById } from '../data/learn';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../types';

export function ArticleScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Article'>>();
  const article = getArticleById(route.params.articleId);

  if (!article) {
    return (
      <Screen>
        <Text>Article not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{article.eyebrow}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.summary}>{article.summary}</Text>
      </View>

      {article.sections.map((section) => (
        <SectionCard key={section.heading} title={section.heading}>
          <Text style={styles.body}>{section.body}</Text>
        </SectionCard>
      ))}

      <SectionCard title="Key points" tone="accent">
        {article.keyPoints.map((point) => (
          <Text key={point} style={styles.bullet}>
            • {point}
          </Text>
        ))}
      </SectionCard>

      <SourceList sourceIds={article.sourceIds} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.moss,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.ink,
    lineHeight: 34,
  },
  summary: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  body: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
  },
  bullet: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
  },
});
