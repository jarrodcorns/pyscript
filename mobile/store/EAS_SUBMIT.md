# EAS Submit — internal testing track (Android)

Use this after `eas build -p android --profile production` completes.

## `eas.json` profiles

| Profile | Purpose |
|---------|---------|
| `production` (build) | AAB for Play |
| `internal` (submit) | Upload to **Internal testing** track |
| `production` (submit) | Upload to production track (when ready) |

Submit internal:

```bash
cd mobile
eas submit -p android --profile internal --latest
```

Or submit a local file:

```bash
eas submit -p android --profile internal --path ./path/to/build.aab
```

---

## Google Play service account (one-time)

1. **Play Console** → **Setup** → **API access** → Link to Google Cloud project (if not linked).
2. **Create service account** in Google Cloud Console with role sufficient for Play Android Developer API.
3. In Play Console **API access**, grant the service account access to your app:
   - **Release to testing tracks** (internal/closed/open)
   - **View app information** (read)
4. **Create JSON key** for the service account → download `*.json`.

### Store the key safely

```bash
# From repo root — do NOT commit this file
cp ~/Downloads/your-key.json mobile/google-play-service-account.json
```

Add to `mobile/.gitignore` (already listed):

```
google-play-service-account.json
```

### Point EAS at the key

**Option A — local path in `eas.json`** (uncommitted key on Jarrod’s machine):

```json
"submit": {
  "internal": {
    "android": {
      "track": "internal",
      "serviceAccountKeyPath": "./google-play-service-account.json"
    }
  }
}
```

**Option B — EAS secret** (better for CI):

```bash
cd mobile
eas secret:create --name GOOGLE_SERVICE_ACCOUNT_KEY --type file --value ./google-play-service-account.json
```

Then in `eas.json`:

```json
"serviceAccountKeyPath": "@GOOGLE_SERVICE_ACCOUNT_KEY"
```

*(Use the path syntax documented in current EAS CLI for file secrets.)*

---

## First-time Play Console

Before submit succeeds:

1. App created in Play Console with package `com.anchorandoak.app`
2. At least one manual upload **or** app signing configured (EAS can upload if permissions are correct)
3. **Internal testing** track exists (created automatically on first internal release)

---

## Commands cheat sheet

```bash
eas build -p android --profile production
eas submit -p android --profile internal --latest
```

Increment `expo.android.versionCode` in `app.json` before each new upload.
