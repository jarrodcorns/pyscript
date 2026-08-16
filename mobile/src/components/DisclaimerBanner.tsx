import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { AlertTriangle } from 'lucide-react-native';
import { colors, spacing } from '../theme';

export function DisclaimerBanner() {
  return (
    <View style={styles.banner}>
      <AlertTriangle color={colors.gold} size={18} />
      <Text style={styles.text}>
        Anchor & Oak is educational self-help for partners — not medical advice, diagnosis, or
        therapy. If someone is at risk of harm, use the Support tab immediately.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.goldSoft,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E8C9A8',
  },
  text: {
    flex: 1,
    color: colors.ink,
    fontSize: 13,
    lineHeight: 18,
  },
});
