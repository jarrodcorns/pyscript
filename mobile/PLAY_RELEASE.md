# Google Play release — Anchor & Oak (today)

Step-by-step guide to publish the Android app with a **R299 ZAR** one-time in-app purchase.

## App & billing identifiers

| Field | Value |
|--------|--------|
| Android package | `com.anchorandoak.app` |
| versionName | `1.0.0` (from `app.json` → `expo.version`) |
| versionCode | `1` (from `app.json` → `expo.android.versionCode`; bump for each Play upload) |
| In-app product id | **`lifetime_unlock`** (non-consumable / one-time) |
| Target price | **R299.00 ZAR** (set in Play Console; UI shows ~R299 as fallback) |

The app uses **expo-iap** → Google Play Billing Library. Purchases are **acknowledged** in-app (`finishTransaction` with `isConsumable: false`) within Google’s 3-day window.

---

## 1. Google Play Console — create the app

1. Open [Google Play Console](https://play.google.com/console).
2. **Create app** → name **Anchor & Oak**, default language, app/game type **App**, free/paid **Free** (monetization is via IAP).
3. Complete **App access** (if full functionality needs purchase, declare that and provide test credentials if needed).
4. Under **Setup → App integrity**, note your signing; EAS can manage the upload key (recommended).

---

## 2. Create the in-app product (`lifetime_unlock`)

1. **Monetize → Products → In-app products** → **Create product**.
2. **Product ID:** `lifetime_unlock` (must match `LIFETIME_UNLOCK_PRODUCT_ID` in `src/services/purchases.ts`).
3. **Product type:** One-time / non-consumable (managed one-time product in Play Billing 5+).
4. **Name & description** (store-facing for the SKU).
5. **Price:** set **South Africa** to **R299.00** (adjust other countries as needed).
6. **Activate** the product.

Until the product is active and a signed build is uploaded, the paywall may show the fallback price and purchases may fail with “item unavailable.”

---

## 3. License testing (before real charges)

1. **Setup → License testing** (or **Settings → License testing**).
2. Add Gmail accounts for testers (must be the account on the test device’s Play Store).
3. Set **License response** to **RESPOND_NORMALLY** for realistic purchase flow, or **LICENSED** for instant grants during smoke tests.
4. Testers install from **Internal testing** (below), not sideloaded APKs, so Billing works.

---

## 4. Build the release AAB (EAS)

Prerequisites on your machine:

```bash
cd mobile
npm install
npx eas-cli login
eas build:configure   # if not already linked to an Expo project
```

Production profile in `eas.json` builds an **AAB**:

```bash
eas build -p android --profile production
```

When the build finishes, upload to **internal testing** (recommended first):

```bash
eas submit -p android --profile internal --latest
```

See **`store/EAS_SUBMIT.md`** for the Google Play service account JSON (one-time). Production track submit uses `--profile production` when ready.

**Before each new Play upload:** increment `expo.android.versionCode` in `app.json` (Play rejects duplicate version codes).

---

## 5. Internal testing track

1. **Testing → Internal testing** → create release.
2. Upload the **AAB** from EAS (or submit via EAS).
3. Add testers (email list or Google Group).
4. Copy the **opt-in link**; testers accept and install from Play Store.
5. Verify:
   - Paywall shows price from Play (~R299).
   - Purchase completes and unlocks days 2–30.
   - **Restore Purchases** works after reinstall.
   - Purchase is **acknowledged** (no auto-refund after 3 days).

---

## 6. Store listing & graphics (pre-written)

Copy from repo files — minimal typing in Console:

| Asset / copy | File |
|--------------|------|
| Title, short & full description | `store/listing.md` |
| Icon 512×512 | `store/assets/icon-512.png` |
| Feature graphic 1024×500 | `store/assets/feature-graphic-1024x500.png` |
| Phone screenshots 1080×1920 | `store/assets/screenshot-0*.png` |

Regenerate graphics: `npm run store:assets` (uses `store/render/` HTML + headless Chrome).

---

## 7. Privacy policy URL (required)

Static pages are in **`mobile/docs/`**. Deploy via GitHub Actions (see **`docs/HOSTING.md`**).

**Expected URL (repo `jarrodcorns/pyscript`, GitHub Pages):**

`https://jarrodcorns.github.io/pyscript/privacy-policy.html`

Before launch: replace `REPLACE_ME@pralungolabs.example` in `privacy-policy.html` and `terms.html`, push, re-run Pages deploy.

Paste the privacy URL in Play Console → **Policy → App content → Privacy policy**.

---

## 8. Data safety form

Use exact answers in **`store/data-safety.md`** (local-only storage, no developer analytics, Google Play for purchases).

---

## 9. Content rating (health / mental health)

Use **`store/content-rating.md`** for IARC answers (mild educational intimacy/medication themes, no UGC).

---

## 10. Health & mental-health policy flags (review carefully)

Google Play **Health apps** and **Medical** policies apply to apps that address physical or mental health. Anchor & Oak includes mental-health-adjacent educational content. Ensure:

| Topic | Requirement |
|--------|-------------|
| **Not a medical device** | No diagnosis, treatment claims, or “replace your doctor/therapist” language in store listing or app. In-app disclaimer is present. |
| **No harmful content** | No methods encouraging self-harm; crisis resources (e.g. SADAG) visible in Support. |
| **Monetization** | Digital program unlock uses **Play Billing only** (`lifetime_unlock`) — no external payment link for the same digital content on Android. |
| **Misleading claims** | Avoid guaranteed outcomes for depression, intimacy, or medication effects. |
| **Children** | If not for children, set target age accordingly and complete **Target audience** declarations. |
| **Sensitive permissions** | Do not request unnecessary permissions (location, contacts, etc.). |
| **Government / clinical** | If you later add telehealth or prescription features, additional compliance applies — not in v1. |

Also review [Play Health apps policy](https://support.google.com/googleplay/android-developer/answer/12261419) and [Medical functionalities](https://support.google.com/googleplay/android-developer/answer/9888170) before production rollout.

---

## 11. Production rollout

1. Resolve all **Policy status** items (privacy, ads declaration if no ads, news app if N/A, COVID if N/A, etc.).
2. **Production** → **Create new release** → same AAB (or newer versionCode).
3. Roll out **staged** (e.g. 20% → 100%) if desired.

---

## Quick command reference

```bash
cd mobile
npm run typecheck
eas build -p android --profile production
```

---

## Jarrod — manual checklist

- [ ] Play Console app created under correct developer account  
- [ ] In-app product **`lifetime_unlock`** active at **R299 ZAR**  
- [ ] License testers added  
- [ ] Privacy policy URL live and entered in Console  
- [ ] Store listing + screenshots  
- [ ] Data safety + content rating completed  
- [ ] EAS project linked; first **production AAB** uploaded to internal test  
- [ ] Real purchase test on internal track  
- [ ] Increment **versionCode** before each subsequent upload  
