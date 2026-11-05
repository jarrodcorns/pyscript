# Google Play — Data safety form (Anchor & Oak v1.0)

Use **App content → Data safety** in Play Console. Answers reflect the **current codebase** (local AsyncStorage, Google Play Billing via expo-iap, no accounts, no analytics SDKs).

> **Principle:** “Collected” means transmitted off the user’s device to you or a third party (except on-device processing). Local-only progress is **not** collected by the developer.

---

## Step 1 — Does your app collect or share any of the required user data types?

**Answer: No** — for all categories **as collected or shared by Pralungo Labs**.

*(Google Play still processes payments; declare the relationship in the Purchases section below.)*

If the form forces a “Yes” because of Google Play:

- Select **only** what Google Play handles on your behalf and mark **Not collected** for developer collection where accurate.

---

## Data types — developer collection

For each type below, select **No, this data is not collected** unless noted.

| Data type | Collected? | Shared? | Notes |
|-----------|------------|---------|--------|
| Location (approx/precise) | No | No | No location APIs |
| Personal info (name, email, user IDs) | No | No | No accounts |
| Financial info (payment info, purchase history) | No | No | Google Play charges user; app only checks entitlement via Billing API on device |
| Health info | No | No | Educational content only; no health data fields submitted |
| Messages | No | No | |
| Photos / videos | No | No | |
| Audio files | No | No | |
| Files and docs | No | No | |
| Calendar | No | No | |
| Contacts | No | No | |
| App activity (pages, taps, search) | No | No | Not sent to developer servers |
| App info and performance (crash logs, diagnostics) | No | No | No Crashlytics/Sentry in repo |
| Device or other IDs | No | No | No ads/analytics SDKs |
| Web browsing | No | No | |

---

## On-device data (AsyncStorage)

| Question | Answer |
|----------|--------|
| Is data stored on device? | Yes — program progress (day completed, current day) |
| Is it transmitted off device? | **No** |
| Play “Collected” toggle | **Off / Not collected** |
| Optional user-facing note in listing | “Progress is stored on your device only.” |

---

## Security practices

| Question | Answer |
|----------|--------|
| Data encrypted in transit | N/A — no developer backend |
| Data encrypted at rest | Device-level (OS); app uses standard local storage |
| Users can request deletion | Uninstall app or clear storage; email support for POPIA requests |
| Independent security review | No |

---

## Account deletion

| Question | Answer |
|----------|--------|
| Does app allow account creation? | **No** |
| Account deletion URL required? | **No** (no accounts) |

---

## Purchases (Google Play)

| Question | Answer |
|----------|--------|
| Digital purchases | Yes — one-time in-app product `lifetime_unlock` |
| Payment processor | Google Play |
| Developer receives | Product ownership token via Play Billing on device only; no card data |

In **Monetization** declarations: app contains in-app purchases.

---

## Data safety “Summary” text (user-visible, optional)

```
Anchor & Oak does not collect personal data on Pralungo Labs servers. Your program progress stays on your device. Purchases are handled by Google Play.
```

---

## POPIA / children

- Target audience: **18+** (adult relationship/wellness themes)
- POPIA responsible party: **Pralungo Labs**, South Africa — see privacy policy URL

---

## Before submitting

1. Replace placeholder email in `mobile/docs/privacy-policy.html`
2. Ensure privacy policy URL matches hosted GitHub Pages URL
3. Re-check if you add analytics, sign-in, or cloud sync later — update this file
