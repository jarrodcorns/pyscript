# Play Store assets & copy

| File | Use in Play Console |
|------|---------------------|
| `listing.md` | Title, short & full description |
| `data-safety.md` | Data safety questionnaire |
| `content-rating.md` | IARC content rating |
| `assets/icon-512.png` | App icon |
| `assets/feature-graphic-1024x500.png` | Feature graphic |
| `assets/screenshot-0*.png` | Phone screenshots (1080×1920) |

Regenerate graphics:

```bash
cd mobile
npm run store:assets
```

Default: SVG → PNG (fast, reliable). For HTML captures:

```bash
USE_CHROME_SCREENSHOTS=1 npm run store:assets
```

EAS submit: see `EAS_SUBMIT.md`.
