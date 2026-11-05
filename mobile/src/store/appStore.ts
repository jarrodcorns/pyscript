import { create } from 'zustand';
import { totalDays } from '../data/curriculum';
import type { Product } from 'expo-iap';
import {
  checkUnlocked,
  FALLBACK_PRICE_LABEL,
  fetchLifetimeProduct,
  formatProductPrice,
  purchaseLifetimeUnlock,
  restorePurchasesSafe,
} from '../services/purchases';
import {
  getCompletedDays,
  getCurrentDay,
  markDayComplete,
  setCurrentDay,
} from '../services/storage';

type AppState = {
  hydrated: boolean;
  unlocked: boolean;
  currentDay: number;
  completedDays: number[];
  lifetimeProduct: Product | null;
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

export const useAppStore = create<AppState>((set) => ({
  hydrated: false,
  unlocked: false,
  currentDay: 1,
  completedDays: [],
  lifetimeProduct: null,
  priceLabel: FALLBACK_PRICE_LABEL,
  purchaseLoading: false,
  purchaseError: null,

  hydrate: async () => {
    const [unlocked, currentDay, completedDays, lifetimeProduct] = await Promise.all([
      checkUnlocked(),
      getCurrentDay(),
      getCompletedDays(),
      fetchLifetimeProduct(),
    ]);

    const priceLabel = formatProductPrice(lifetimeProduct);

    set({
      hydrated: true,
      unlocked,
      currentDay: Math.min(Math.max(currentDay, 1), totalDays),
      completedDays,
      lifetimeProduct,
      priceLabel,
      purchaseError: null,
    });
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
    set({ purchaseLoading: true, purchaseError: null });
    const result = await purchaseLifetimeUnlock();
    set({ purchaseLoading: false });

    if (result.cancelled) return false;

    if (result.pending) {
      set({ purchaseError: result.errorMessage });
      return false;
    }

    if (!result.unlocked) {
      set({
        purchaseError:
          result.errorMessage ??
          'Purchase did not unlock the program. Try Restore Purchases or contact support.',
      });
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
      set({
        purchaseError: result.errorMessage ?? 'No previous purchase found for this store account.',
      });
      return false;
    }

    set({ purchaseError: null });
    return true;
  },
}));

export function getProgressPercent(completedDays: number[]): number {
  return Math.round((completedDays.length / totalDays) * 100);
}
