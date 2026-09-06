import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Anchor, HeartHandshake, Shield, Sparkles } from 'lucide-react-native';
import { Screen } from '../components/Screen';
import { useAppStore } from '../store/appStore';
import { colors, spacing } from '../theme';

type PaywallScreenProps = {
  onUnlocked?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
};

const features = [
  { icon: Anchor, text: '30 days of partner-focused guidance with real-world examples' },
  { icon: Shield, text: 'Grounding, boundaries, and pressure-reduction strategies' },
  { icon: HeartHandshake, text: 'Consent-based touch and intimacy repair practices' },
  { icon: Sparkles, text: 'Evidence-informed Learn library on depression, anxiety, and meds' },
];

export function PaywallScreen({ onUnlocked, dismissible, onDismiss }: PaywallScreenProps) {
  const {
    priceLabel,
    purchaseLoading,
    purchaseError,
    purchaseProgram,
    restoreProgram,
  } = useAppStore();

  const handlePurchase = async () => {
    const unlocked = await purchaseProgram();
    if (unlocked) onUnlocked?.();
  };

  const handleRestore = async () => {
    const unlocked = await restoreProgram();
    if (unlocked) onUnlocked?.();
  };

  return (
    <Screen backgroundColor={colors.forest} contentStyle={styles.content}>
      <LinearGradient colors={['#0F382C', '#174C3D']} style={styles.hero}>
        <Text style={styles.brand}>ANCHOR & OAK</Text>
        <Text style={styles.subtitle}>
          Rebuild stability, protect your peace, and reconnect through the storm.
        </Text>
      </LinearGradient>

      <View style={styles.featureCard}>
        {features.map(({ icon: Icon, text }) => (
          <View key={text} style={styles.featureRow}>
            <Icon color={colors.mint} size={18} />
            <Text style={styles.featureText}>{text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.priceBlock}>
        <Text style={styles.price}>{priceLabel}</Text>
        <Text style={styles.priceSub}>One-time unlock · Lifetime access</Text>
        <Text style={styles.storeNote}>
          Purchases are processed through Apple App Store or Google Play (via RevenueCat). Store
          pricing may vary slightly by region and tax.
        </Text>
      </View>

      {purchaseError ? <Text style={styles.error}>{purchaseError}</Text> : null}

      <Button
        mode="contained"
        buttonColor={colors.gold}
        textColor={colors.paper}
        style={styles.cta}
        contentStyle={styles.ctaContent}
        onPress={handlePurchase}
        disabled={purchaseLoading}
      >
        {purchaseLoading ? 'Processing…' : 'Unlock Full 30-Day Program'}
      </Button>

      <Button mode="text" textColor={colors.mint} onPress={handleRestore} disabled={purchaseLoading}>
        Restore Purchases
      </Button>

      {dismissible ? (
        <Button mode="text" textColor={colors.mint} onPress={onDismiss}>
          Not now
        </Button>
      ) : null}

      <Text style={styles.legal}>
        Not medical advice. Does not replace therapy or psychiatric care. Never change medication
        without a prescriber.
      </Text>

      {purchaseLoading ? <ActivityIndicator color={colors.mint} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    minHeight: '100%',
    justifyContent: 'space-between',
  },
  hero: {
    borderRadius: 20,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  brand: {
    color: colors.cream,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.mint,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  featureCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    padding: spacing.md,
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  featureText: {
    flex: 1,
    color: colors.cream,
    fontSize: 15,
    lineHeight: 21,
  },
  priceBlock: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  price: {
    color: colors.gold,
    fontSize: 36,
    fontWeight: '900',
  },
  priceSub: {
    color: '#B7C9C1',
    fontSize: 13,
  },
  storeNote: {
    color: '#9FB5AC',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  cta: {
    borderRadius: 14,
  },
  ctaContent: {
    paddingVertical: 8,
  },
  error: {
    color: '#F8C9C4',
    textAlign: 'center',
    fontSize: 13,
  },
  legal: {
    color: '#8FA59C',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
