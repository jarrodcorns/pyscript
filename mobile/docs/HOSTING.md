# Hosting privacy policy & terms (GitHub Pages)

These static pages live in `mobile/docs/` and can be published with the repo workflow **Deploy mobile legal docs (GitHub Pages)**.

## One-time setup (Jarrod)

1. GitHub repo → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions** (not “Deploy from branch”)
   - Or run the deploy workflow once: it uses `configure-pages` with **`enablement: true`** to request enablement automatically when the token allows it.
3. Merge or push `.github/workflows/mobile-docs-pages.yml`
4. Run the workflow (push to `main`/`master`/`cursor/anchor-oak-mobile-a6ec` or **Actions** → **Run workflow**)
5. Support contact in legal pages: **Pralungolabs@gmail.com**

## Public URLs (after Pages is enabled)

Assuming repo **`jarrodcorns/pyscript`** and default GitHub Pages project site:

| Document | URL |
|----------|-----|
| Privacy policy (use in Play Console) | `https://jarrodcorns.github.io/pyscript/privacy-policy.html` |
| Terms of use | `https://jarrodcorns.github.io/pyscript/terms.html` |

If the repo is renamed or Pages uses a custom domain, swap the host/path accordingly. Play Console wants the **privacy policy** URL only; terms are optional but recommended.

## Local preview

```bash
cd mobile/docs
python3 -m http.server 8765
# open http://localhost:8765/privacy-policy.html
```
