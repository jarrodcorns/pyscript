import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  completedDays: 'anchor_oak_completed_days',
  currentDay: 'anchor_oak_current_day',
  onboardingSeen: 'anchor_oak_onboarding_seen',
} as const;

export async function getCompletedDays(): Promise<number[]> {
  const raw = await AsyncStorage.getItem(KEYS.completedDays);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed.filter((day) => Number.isInteger(day)) : [];
  } catch {
    return [];
  }
}

export async function markDayComplete(day: number): Promise<number[]> {
  const completed = await getCompletedDays();
  if (!completed.includes(day)) {
    completed.push(day);
    completed.sort((a, b) => a - b);
    await AsyncStorage.setItem(KEYS.completedDays, JSON.stringify(completed));
  }
  return completed;
}

export async function getCurrentDay(): Promise<number> {
  const raw = await AsyncStorage.getItem(KEYS.currentDay);
  const parsed = raw ? Number(raw) : 1;
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

export async function setCurrentDay(day: number): Promise<void> {
  await AsyncStorage.setItem(KEYS.currentDay, String(day));
}

export async function hasSeenOnboarding(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEYS.onboardingSeen)) === 'true';
}

export async function setOnboardingSeen(): Promise<void> {
  await AsyncStorage.setItem(KEYS.onboardingSeen, 'true');
}

export async function resetLocalProgress(): Promise<void> {
  await AsyncStorage.multiRemove([KEYS.completedDays, KEYS.currentDay, KEYS.onboardingSeen]);
}
