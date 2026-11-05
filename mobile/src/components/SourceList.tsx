import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ExternalLink } from 'lucide-react-native';
import { getSourcesByIds } from '../data/sources';
import { colors, spacing } from '../theme';

type SourceListProps = {
  sourceIds: string[];
};

export function SourceList({ sourceIds }: SourceListProps) {
  const sources = getSourcesByIds(sourceIds);
  if (!sources.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sources</Text>
      {sources.map((source) => (
        <Pressable
          key={source.id}
          style={styles.row}
          onPress={() => Linking.openURL(source.url)}
        >
          <View style={styles.copy}>
            <Text style={styles.title}>{source.title}</Text>
            <Text style={styles.meta}>
              {source.publisher} · {source.year}
            </Text>
          </View>
          <ExternalLink color={colors.moss} size={16} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  heading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.moss,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    color: colors.ink,
    lineHeight: 19,
  },
  meta: {
    fontSize: 12,
    color: colors.muted,
  },
});
