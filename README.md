# Personal Page (GitHub Pages)

This repo is a simple, animated personal homepage.

## Edit me

Open `index.html` and replace:

- Name, role, location
- Project cards (titles/links/tech)
- Contact links (email/GitHub/LinkedIn)

## Run locally

You can just open `index.html` in a browser.

If you prefer a local server (recommended for caching / JS):

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Publish on GitHub Pages

### Option A: `username.github.io` (recommended)

1. Create a GitHub repo named **`<your-username>.github.io`**
2. Put these files at the repo root (this folder)
3. Go to **Settings → Pages** and ensure:
   - Source: **Deploy from a branch**
   - Branch: **main** / root
4. Your site will be live at `https://<your-username>.github.io`

### Option B: Project Pages

1. Create a normal repo (any name)
2. Go to **Settings → Pages**
3. Choose branch **main** / root
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`

