import { Linking, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Phone, MessageCircle, ShieldAlert } from 'lucide-react-native';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { Screen } from '../components/Screen';
import { SectionCard } from '../components/SectionCard';
import { colors, spacing } from '../theme';

const crisisLines = [
  {
    label: 'SADAG Suicide Crisis Helpline',
    detail: '24/7 · South Africa',
    value: '0800567567',
    display: '0800 567 567',
  },
  {
    label: 'Cipla Mental Health Helpline',
    detail: '24/7 · South Africa',
    value: '0800456789',
    display: '0800 456 789',
  },
  {
    label: 'SADAG SMS callback',
    detail: 'Text for a counsellor callback',
    value: 'sms:31393',
    display: 'SMS 31393',
  },
];

export function SupportScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Support</Text>
        <Text style={styles.subtitle}>
          If anyone is in immediate danger, call local emergency services. This app supports
          partners — it does not provide crisis counselling.
        </Text>
      </View>

      <DisclaimerBanner />

      <SectionCard title="South Africa crisis lines" tone="danger">
        {crisisLines.map((line) => (
          <Button
            key={line.label}
            mode="outlined"
            icon={() => <Phone color={colors.danger} size={16} />}
            onPress={() => Linking.openURL(line.value.startsWith('sms:') ? line.value : `tel:${line.value}`)}
            style={styles.lineButton}
          >
            {line.label} · {line.display}
          </Button>
        ))}
        <Button
          mode="text"
          onPress={() => Linking.openURL('https://www.sadag.org/index.php')}
        >
          Visit sadag.org
        </Button>
      </SectionCard>

      <SectionCard
        title="When to seek professional help"
        subtitle="Do not wait for a “better time” if safety is uncertain."
      >
        <View style={styles.list}>
          <Text style={styles.item}>• Suicidal thoughts, self-harm, or a suicide attempt</Text>
          <Text style={styles.item}>• Psychosis, mania, or inability to care for basic needs</Text>
          <Text style={styles.item}>• Violence, threats, or fear for anyone’s safety</Text>
          <Text style={styles.item}>• Worsening depression despite treatment</Text>
          <Text style={styles.item}>• Medication side effects affecting quality of life</Text>
        </View>
      </SectionCard>

      <SectionCard title="Medication reminder" tone="accent">
        <View style={styles.row}>
          <ShieldAlert color={colors.forest} size={18} />
          <Text style={styles.body}>
            Never stop, skip, or change psychiatric medication without medical supervision. Withdrawal
            can be severe. Sexual side effects and emotional blunting should be reported to a
            prescriber — there are management options.
          </Text>
        </View>
      </SectionCard>

      <SectionCard title="For the supporting partner">
        <View style={styles.row}>
          <MessageCircle color={colors.forest} size={18} />
          <Text style={styles.body}>
            Your distress matters too. Consider your own therapist, support group, or trusted friend.
            Couple therapy may help when depression and relationship conflict reinforce each other.
          </Text>
        </View>
      </SectionCard>
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
  lineButton: {
    marginBottom: spacing.xs,
  },
  list: {
    gap: spacing.xs,
  },
  item: {
    color: colors.ink,
    lineHeight: 20,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  body: {
    flex: 1,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
  },
});
