# Anchor & Oak — Mobile App

Cross-platform React Native (Expo) app for partners supporting a spouse through depression, anxiety, and medication-related intimacy changes.

## Stack

- Expo SDK 57 + React Native
- React Navigation (tabs + native stack)
- React Native Paper
- Zustand + AsyncStorage (local-first progress)
- **expo-iap** — Google Play Billing / App Store for the **R299** lifetime unlock (`lifetime_unlock`)

## Payments

Digital content in the app must use **Google Play Billing** (Android) or **App Store IAP** (iOS). This project uses **expo-iap** directly — no RevenueCat, Paystack, or server-side unlock bypass.

| Item | Value |
|------|--------|
| Product id | `lifetime_unlock` |
| Type | One-time / non-consumable |
| Target list price | **R299 ZAR** (Play Console sets the charged price) |

Entitlement is granted **only** when Play/App Store reports an owned purchase. There is no dev unlock or local bypass in production builds.

See **[PLAY_RELEASE.md](./PLAY_RELEASE.md)** for Play Console setup and shipping an AAB today.

## Setup

```bash
cd mobile
npm install
```

Requires a **development or production build** (EAS). In-app purchase does not work in Expo Go.

## Run

```bash
npm run start
npm run android
npm run ios
npm run typecheck
```

## Android release build

```bash
npx eas-cli login
eas build -p android --profile production
```

`eas.json` production profile outputs an **AAB** (`buildType: app-bundle`).

## Store submission checklist

- Privacy policy URL (required) — health/mental wellness disclosures
- Medical disclaimer in-app (included)
- Crisis resources (SADAG lines for ZA — included)
- Restore Purchases button (included)
- Data safety form + content rating (health app category)
- Play in-app product `lifetime_unlock` at ~R299 ZAR

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
