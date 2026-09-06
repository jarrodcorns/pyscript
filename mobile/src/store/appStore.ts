import { create } from 'zustand';
import { totalDays } from '../data/curriculum';
import {
  checkUnlocked,
  getCustomerInfoSafe,
  getLifetimePackage,
  getOfferingsSafe,
  purchaseLifetimePackage,
  restorePurchasesSafe,
} from '../services/purchases';
import {
  getCompletedDays,
  getCurrentDay,
  markDayComplete,
  setCurrentDay,
} from '../services/storage';
import type { PurchasesPackage } from 'react-native-purchases';

type AppState = {
  hydrated: boolean;
  unlocked: boolean;
  currentDay: number;
  completedDays: number[];
  purchasePackage: PurchasesPackage | null;
  priceLabel: string;
  purchaseLoading: boolean;
  purchaseError: string | null;
  hydrate: () => Promise<void>;
  refreshEntitlement: () => Promise<boolean>;
  completeDay: (day: number) => Promise<void>;
  goToDay: (day: number) => Promise<void>;
  purchaseProgram: () => Promise<boolean>;
  restoreProgram: () => Promise<boolean>;
};

export const useAppStore = create<AppState>((set, get) => ({
  hydrated: false,
  unlocked: false,
  currentDay: 1,
  completedDays: [],
  purchasePackage: null,
  priceLabel: 'R499.00',
  purchaseLoading: false,
  purchaseError: null,

  hydrate: async () => {
    const [unlocked, currentDay, completedDays, offerings] = await Promise.all([
      checkUnlocked(),
      getCurrentDay(),
      getCompletedDays(),
      getOfferingsSafe(),
    ]);

    const purchasePackage = getLifetimePackage(offerings);
    const priceLabel = purchasePackage?.product.priceString ?? 'R499.00';

    set({
      hydrated: true,
      unlocked,
      currentDay: Math.min(Math.max(currentDay, 1), totalDays),
      completedDays,
      purchasePackage,
      priceLabel,
      purchaseError: null,
    });

    await getCustomerInfoSafe();
  },

  refreshEntitlement: async () => {
    const unlocked = await checkUnlocked();
    set({ unlocked });
    return unlocked;
  },

  completeDay: async (day: number) => {
    const completedDays = await markDayComplete(day);
    const nextDay = Math.min(day + 1, totalDays);
    await setCurrentDay(nextDay);
    set({ completedDays, currentDay: nextDay });
  },

  goToDay: async (day: number) => {
    const bounded = Math.min(Math.max(day, 1), totalDays);
    await setCurrentDay(bounded);
    set({ currentDay: bounded });
  },

  purchaseProgram: async () => {
    const { purchasePackage } = get();
    if (!purchasePackage) {
      set({ purchaseError: 'Store product not configured yet. Check RevenueCat setup.' });
      return false;
    }

    set({ purchaseLoading: true, purchaseError: null });
    const result = await purchaseLifetimePackage(purchasePackage);
    set({ purchaseLoading: false });

    if (result.cancelled) return false;

    if (!result.unlocked) {
      set({ purchaseError: 'Purchase did not unlock the program. Try Restore Purchases or contact support.' });
      return false;
    }

    set({ unlocked: true, purchaseError: null });
    return true;
  },

  restoreProgram: async () => {
    set({ purchaseLoading: true, purchaseError: null });
    const result = await restorePurchasesSafe();
    set({ purchaseLoading: false, unlocked: result.unlocked });

    if (!result.unlocked) {
      set({ purchaseError: 'No previous purchase found for this store account.' });
      return false;
    }

    set({ purchaseError: null });
    return true;
  },
}));

export function getProgressPercent(completedDays: number[]): number {
  return Math.round((completedDays.length / totalDays) * 100);
}
