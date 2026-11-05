import { Platform } from 'react-native';
import {
  ErrorCode,
  fetchProducts,
  finishTransaction,
  getAvailablePurchases,
  initConnection,
  isUserCancelledError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  type Product,
  type Purchase,
} from 'expo-iap';

/**
 * Google Play Console / App Store Connect product id for the one-time lifetime unlock.
 * Play Console → Monetize → Products → In-app products → create non-consumable with this id.
 */
export const LIFETIME_UNLOCK_PRODUCT_ID = 'lifetime_unlock';

/** UI fallback when the store price is not loaded yet (Play sets the live price). */
export const FALLBACK_PRICE_LABEL = 'R299.00';

export function isBillingSupported(): boolean {
  return Platform.OS === 'android' || Platform.OS === 'ios';
}

function isLifetimePurchase(purchase: Purchase): boolean {
  return purchase.productId === LIFETIME_UNLOCK_PRODUCT_ID;
}

export function isEntitlementPurchase(purchase: Purchase): boolean {
  if (!isLifetimePurchase(purchase)) return false;
  if (purchase.purchaseState === 'pending') return false;
  if (purchase.purchaseState !== 'purchased') return false;
  if ('isSuspendedAndroid' in purchase && purchase.isSuspendedAndroid) return false;
  return true;
}

async function acknowledgeLifetimePurchase(purchase: Purchase): Promise<void> {
  if (!isEntitlementPurchase(purchase)) return;
  await finishTransaction({
    purchase,
    isConsumable: false,
  });
}

async function findLifetimeEntitlement(purchases: Purchase[]): Promise<Purchase | null> {
  for (const purchase of purchases) {
    if (!isLifetimePurchase(purchase)) continue;
    if (purchase.purchaseState === 'pending') continue;
    if (isEntitlementPurchase(purchase)) {
      await acknowledgeLifetimePurchase(purchase);
      return purchase;
    }
  }
  return null;
}

let connectionReady = false;
let globalListenersRegistered = false;

function registerGlobalPurchaseListeners(): void {
  if (globalListenersRegistered) return;
  globalListenersRegistered = true;

  purchaseUpdatedListener(async (purchase) => {
    if (!isLifetimePurchase(purchase)) return;
    if (purchase.purchaseState === 'pending') return;
    if (isEntitlementPurchase(purchase)) {
      try {
        await acknowledgeLifetimePurchase(purchase);
      } catch (error) {
        console.warn('Failed to acknowledge purchase', error);
      }
    }
  });

  purchaseErrorListener((error) => {
    if (!isUserCancelledError(error)) {
      console.warn('Play Billing error', error.message);
    }
  });
}

export async function initBilling(): Promise<boolean> {
  if (!isBillingSupported()) return false;
  registerGlobalPurchaseListeners();

  if (connectionReady) return true;

  try {
    connectionReady = await initConnection();
    return connectionReady;
  } catch {
    connectionReady = false;
    return false;
  }
}

export async function checkUnlocked(): Promise<boolean> {
  if (!(await initBilling())) return false;

  try {
    const purchases = await getAvailablePurchases();
    const entitlement = await findLifetimeEntitlement(purchases);
    return entitlement !== null;
  } catch {
    return false;
  }
}

export async function fetchLifetimeProduct(): Promise<Product | null> {
  if (!(await initBilling())) return null;

  try {
    const products = await fetchProducts({
      skus: [LIFETIME_UNLOCK_PRODUCT_ID],
      type: 'in-app',
    });
    const list = products ?? [];
    const match = list.find(
      (product): product is Product =>
        product.id === LIFETIME_UNLOCK_PRODUCT_ID && product.type === 'in-app',
    );
    return match ?? null;
  } catch {
    return null;
  }
}

export function formatProductPrice(
  product: Product | null,
  fallback = FALLBACK_PRICE_LABEL,
): string {
  return product?.displayPrice ?? fallback;
}

export type PurchaseLifetimeResult = {
  unlocked: boolean;
  cancelled: boolean;
  pending: boolean;
  errorMessage: string | null;
};

function createLifetimePurchaseFlow(): {
  promise: Promise<PurchaseLifetimeResult>;
  cancel: (result: PurchaseLifetimeResult) => void;
} {
  let settleRef: ((result: PurchaseLifetimeResult) => void) | null = null;

  const promise = new Promise<PurchaseLifetimeResult>((resolve) => {
    let settled = false;

    const settle = (result: PurchaseLifetimeResult) => {
      if (settled) return;
      settled = true;
      purchaseSub.remove();
      errorSub.remove();
      clearTimeout(timeout);
      resolve(result);
    };

    settleRef = settle;

    const purchaseSub = purchaseUpdatedListener(async (purchase) => {
      if (!isLifetimePurchase(purchase)) return;

      if (purchase.purchaseState === 'pending') {
        settle({
          unlocked: false,
          cancelled: false,
          pending: true,
          errorMessage:
            'Payment is pending. You will unlock automatically when Google Play confirms the purchase.',
        });
        return;
      }

      if (!isEntitlementPurchase(purchase)) {
        settle({
          unlocked: false,
          cancelled: false,
          pending: false,
          errorMessage: 'Purchase could not be verified. Try Restore Purchases or contact support.',
        });
        return;
      }

      try {
        await acknowledgeLifetimePurchase(purchase);
        settle({ unlocked: true, cancelled: false, pending: false, errorMessage: null });
      } catch {
        settle({
          unlocked: false,
          cancelled: false,
          pending: false,
          errorMessage:
            'Purchase succeeded but acknowledgement failed. Open the app again or tap Restore Purchases.',
        });
      }
    });

    const errorSub = purchaseErrorListener((error) => {
      if (isUserCancelledError(error) || error.code === ErrorCode.UserCancelled) {
        settle({ unlocked: false, cancelled: true, pending: false, errorMessage: null });
        return;
      }

      if (error.code === ErrorCode.AlreadyOwned) {
        void (async () => {
          const restored = await checkUnlocked();
          settle({
            unlocked: restored,
            cancelled: false,
            pending: false,
            errorMessage: restored
              ? null
              : 'You already own this item but restore failed. Try Restore Purchases.',
          });
        })();
        return;
      }

      const message =
        error.message ||
        (error.code === ErrorCode.ItemUnavailable
          ? 'Product is not available yet. Confirm Play Console setup and license testers.'
          : 'Purchase failed. Check your connection and try again.');

      settle({ unlocked: false, cancelled: false, pending: false, errorMessage: message });
    });

    const timeout = setTimeout(() => {
      settle({
        unlocked: false,
        cancelled: false,
        pending: false,
        errorMessage: 'Purchase timed out. If you were charged, tap Restore Purchases.',
      });
    }, 120_000);
  });

  return {
    promise,
    cancel: (result) => settleRef?.(result),
  };
}

export async function purchaseLifetimeUnlock(): Promise<PurchaseLifetimeResult> {
  if (!(await initBilling())) {
    return {
      unlocked: false,
      cancelled: false,
      pending: false,
      errorMessage: 'In-app purchases are not available on this device.',
    };
  }

  const flow = createLifetimePurchaseFlow();

  try {
    await requestPurchase({
      request: {
        apple: { sku: LIFETIME_UNLOCK_PRODUCT_ID },
        google: { skus: [LIFETIME_UNLOCK_PRODUCT_ID] },
      },
      type: 'in-app',
    });
  } catch (error) {
    const purchaseError = error as { code?: ErrorCode; message?: string };
    if (isUserCancelledError(error) || purchaseError.code === ErrorCode.UserCancelled) {
      flow.cancel({ unlocked: false, cancelled: true, pending: false, errorMessage: null });
      return { unlocked: false, cancelled: true, pending: false, errorMessage: null };
    }
    const failure = {
      unlocked: false,
      cancelled: false,
      pending: false,
      errorMessage: purchaseError.message ?? 'Could not start purchase.',
    };
    flow.cancel(failure);
    return failure;
  }

  return flow.promise;
}

export async function restorePurchasesSafe(): Promise<{
  unlocked: boolean;
  errorMessage: string | null;
}> {
  if (!(await initBilling())) {
    return { unlocked: false, errorMessage: 'In-app purchases are not available on this device.' };
  }

  try {
    const purchases = await getAvailablePurchases();
    const entitlement = await findLifetimeEntitlement(purchases);
    return {
      unlocked: entitlement !== null,
      errorMessage: entitlement ? null : 'No previous purchase found for this Google account.',
    };
  } catch {
    return {
      unlocked: false,
      errorMessage: 'Could not restore purchases. Check your connection and try again.',
    };
  }
}
