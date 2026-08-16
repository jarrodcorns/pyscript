import Constants from 'expo-constants';
import { Platform } from 'react-native';
import Purchases, {
  LOG_LEVEL,
  PURCHASES_ERROR_CODE,
  type CustomerInfo,
  type PurchasesOfferings,
  type PurchasesPackage,
} from 'react-native-purchases';

const ENTITLEMENT_ID =
  process.env.EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID ?? 'full_program';

const extra = Constants.expoConfig?.extra as
  | {
      revenueCatIosApiKey?: string;
      revenueCatAndroidApiKey?: string;
      enableDevUnlock?: boolean;
    }
  | undefined;

function getApiKey(): string | null {
  if (Platform.OS === 'ios') {
    return process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ?? extra?.revenueCatIosApiKey ?? null;
  }
  if (Platform.OS === 'android') {
    return process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ?? extra?.revenueCatAndroidApiKey ?? null;
  }
  return null;
}

export function isBillingConfigured(): boolean {
  return Boolean(getApiKey());
}

export function isDevUnlockEnabled(): boolean {
  return __DEV__ && (process.env.EXPO_PUBLIC_ENABLE_DEV_UNLOCK === 'true' || extra?.enableDevUnlock === true);
}

export function hasActiveEntitlement(customerInfo: CustomerInfo): boolean {
  const active = customerInfo.entitlements.active[ENTITLEMENT_ID];
  return Boolean(active?.isActive);
}

let configured = false;

export async function configurePurchases(): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey || configured) return;

  Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
  Purchases.configure({ apiKey });
  configured = true;
}

export async function getCustomerInfoSafe(): Promise<CustomerInfo | null> {
  try {
    await configurePurchases();
    if (!isBillingConfigured()) return null;
    return await Purchases.getCustomerInfo();
  } catch {
    return null;
  }
}

export async function checkUnlocked(): Promise<boolean> {
  if (isDevUnlockEnabled()) return true;

  const info = await getCustomerInfoSafe();
  return info ? hasActiveEntitlement(info) : false;
}

export async function getOfferingsSafe(): Promise<PurchasesOfferings | null> {
  try {
    await configurePurchases();
    if (!isBillingConfigured()) return null;
    return await Purchases.getOfferings();
  } catch {
    return null;
  }
}

export function getLifetimePackage(offerings: PurchasesOfferings | null): PurchasesPackage | null {
  if (!offerings) return null;
  const current = offerings.current;
  if (!current) return null;

  const lifetime =
    current.lifetime ??
    current.availablePackages.find((pkg) => pkg.packageType === 'LIFETIME') ??
    current.availablePackages[0];

  return lifetime ?? null;
}

export async function purchaseLifetimePackage(
  pkg: PurchasesPackage,
): Promise<{ unlocked: boolean; customerInfo: CustomerInfo | null; cancelled: boolean }> {
  try {
    await configurePurchases();
    const result = await Purchases.purchasePackage(pkg);
    return {
      unlocked: hasActiveEntitlement(result.customerInfo),
      customerInfo: result.customerInfo,
      cancelled: false,
    };
  } catch (error) {
    const purchasesError = error as { code?: string; userCancelled?: boolean };
    const cancelled =
      purchasesError.userCancelled === true ||
      purchasesError.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR;
    return { unlocked: false, customerInfo: null, cancelled };
  }
}

export async function restorePurchasesSafe(): Promise<{
  unlocked: boolean;
  customerInfo: CustomerInfo | null;
}> {
  try {
    await configurePurchases();
    if (!isBillingConfigured()) {
      return { unlocked: isDevUnlockEnabled(), customerInfo: null };
    }
    const customerInfo = await Purchases.restorePurchases();
    return { unlocked: hasActiveEntitlement(customerInfo), customerInfo };
  } catch {
    return { unlocked: false, customerInfo: null };
  }
}

export function formatPackagePrice(pkg: PurchasesPackage | null, fallback = 'R499.00'): string {
  return pkg?.product.priceString ?? fallback;
}
