# Anchor & Oak — Mobile App

Cross-platform React Native (Expo) app for partners supporting a spouse through depression, anxiety, and medication-related intimacy changes.

## Stack

- Expo SDK 57 + React Native
- React Navigation (tabs + native stack)
- React Native Paper
- Zustand + AsyncStorage (local-first progress)
- RevenueCat (App Store / Play Billing for the R499 lifetime unlock)
- Supabase (optional profile sync)

## Important: payments for App Store / Play Store

For digital content consumed inside the app, **Apple and Google require in-app purchase** (RevenueCat wraps StoreKit / Play Billing). A Paystack-only checkout **cannot** be the sole unlock path for iOS worldwide or for most Android markets, including South Africa, unless you enroll in Google Play’s alternative billing program and still offer Play Billing.

This repo implements **RevenueCat** as the production path. Paystack can be added later for a **web** checkout that unlocks the same RevenueCat entitlement — not as a bypass inside the app.

## Setup

```bash
cd mobile
npm install
cp .env.example .env
```

Fill in:

- `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID` (default: `full_program`)
- Optional Supabase keys

### RevenueCat

1. Create a project at [revenuecat.com](https://www.revenuecat.com)
2. Add iOS + Android apps
3. Create entitlement: `full_program`
4. Create a **non-consumable** / lifetime product in App Store Connect + Play Console (target ~R499 ZAR tier)
5. Map product to entitlement in RevenueCat
6. Paste public SDK keys into `.env`

### Dev unlock (local only)

```env
EXPO_PUBLIC_ENABLE_DEV_UNLOCK=true
```

Only works in development builds. Never ship this enabled.

## Run

```bash
npm run start
npm run android
npm run ios
npm run typecheck
```

## Store submission checklist

- Privacy policy + terms (health/wellness disclosures)
- Medical disclaimer in-app (included)
- Crisis resources (SADAG lines for ZA — included)
- Restore Purchases button (included)
- Account deletion flow if you add sign-in later
- App Store Connect / Play Console banking + tax setup

## Brand name alternatives

| Name | Vibe | Notes |
|------|------|-------|
| **Anchor & Oak** | Grounded, enduring | Existing counselling practice in Ontario — check trademarks before launch |
| **Still Harbor** | Calm, safe | No major app conflict found |
| **Weathering Us** | Honest about hard seasons | Descriptive phrase; likely clearer trademark path |
| **Tend & Hold** | Gentle, active care | “Tend” is crowded in App Store |
| **Quiet Harbor** | Low-pressure support | Distinct from SteadyUs / Paired |
| **Rootline** | Short, modern | Invented; good domain potential |
| **Hearthkeep** | Home + warmth | Invented compound |
| **Usward** | Poetic (“toward us”) | Literary word; uncommon in apps |

**Recommendation:** **Still Harbor** or **Weathering Us** if you want lower collision risk than Anchor & Oak.

## Research summary (in-app + sources)

See `src/data/learn.ts` and `src/data/sources.ts` for cited articles on:

- Depression/anxiety and couple functioning (dyadic coping)
- Caregiver burden in partners
- SSRI/SNRI sexual dysfunction and emotional blunting
- Post-treatment persistence (EMA/Health Canada labels)
- Safe communication and intimacy repair

**Not in the app:** medical advice, medication changes, guaranteed outcomes, or “doctor-free” framing.
