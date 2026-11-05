import { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '../theme';

type SectionCardProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  tone?: 'default' | 'accent' | 'danger';
}>;

export function SectionCard({
  title,
  subtitle,
  children,
  style,
  tone = 'default',
}: SectionCardProps) {
  return (
    <View style={[styles.card, toneStyles[tone], style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

const toneStyles = StyleSheet.create({
  default: {
    backgroundColor: colors.paper,
    borderColor: colors.line,
  },
  accent: {
    backgroundColor: '#F3FAF6',
    borderColor: '#C9E7D8',
  },
  danger: {
    backgroundColor: colors.dangerSoft,
    borderColor: '#E8B7B2',
  },
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
});
