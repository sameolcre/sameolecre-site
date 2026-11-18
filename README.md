# sameolcre® — website

Portfolio + journal for SAMEOL©®E. Built with **Astro**, hosted on **Netlify**, edited through **Decap CMS** at `/admin`.

```
Home ─ Work (case studies, filterable) ─ Journal (essays + daily notes) ─ Process ─ About
```

---

## Step 1 — Check your Mac has Node.js

Open **Terminal** (Applications → Utilities → Terminal) and run:

```bash
node -v
npm -v
```

You need Node **20 or newer** (22 recommended). If you see `command not found` or an older version, install the LTS version from **nodejs.org**, then close and reopen Terminal and check again.

## Step 2 — Put the project somewhere sensible

Unzip `sameolcre-site.zip` and move the `sameolcre-site` folder into your home folder (or wherever you keep projects). Then in Terminal:

```bash
cd ~/sameolcre-site
npm install
```

`npm install` downloads Astro and the fonts. It takes a minute and creates a `node_modules` folder, which you never need to touch.

## Step 3 — Run it on your Mac

```bash
npm run dev
```

Open **http://localhost:4321** in your browser. Edits to files show up instantly. Press `Ctrl + C` in Terminal to stop.

Draft content (like the TSK Folk Life Festival case study) appears here but never on the live site.

## Step 4 — Fill in your details

Search the project for `[YOUR` to find every placeholder. The main ones:

| File | What's in it |
|---|---|
| `src/data/settings.json` | Your name, email, location, intro line, social links |
| `src/content/pages/about.md` | About page: intro, bio, services, experience, clients |
| `src/content/work/*.md` | Portfolio case studies |
| `src/content/essays/` | Long-form journal posts (empty to start) |
| `src/content/notes/` | Quick daily notes |
| `src/content/process/` | Sketches, experiments, work in progress |

Once the CMS is on (Step 7) you can edit all of these from a dashboard instead.

## Step 5 — Put it on GitHub

1. Create a free account at **github.com** if you don't have one.
2. Click **New repository**, name it `sameolcre-site`, leave everything else unticked, and create it.
3. Back in Terminal, inside the project folder:

```bash
git init
git add .
git commit -m "First version of sameolcre site"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/sameolcre-site.git
git push -u origin main
```

If Git asks you to sign in, follow the prompt (GitHub's sign-in window, or a personal access token).

## Step 6 — Deploy on Netlify

1. Sign in at **app.netlify.com** (use "Sign up with GitHub").
2. **Add new site → Import an existing project → GitHub** → pick `sameolcre-site`.
3. Netlify reads `netlify.toml`, so the build settings fill in themselves (`npm run build`, publish `dist`). Click **Deploy**.
4. In a minute or two you'll get a URL like `random-name.netlify.app`. Under **Site configuration → Change site name** you can make it `sameolcre.netlify.app`.
5. If your URL is different from `https://sameolcre.netlify.app`, update it in `astro.config.mjs` (`site:`) and in `public/admin/config.yml` (`site_url`, `display_url`).

From now on, every `git push` (or every save in the CMS) redeploys the site automatically.

## Step 7 — Turn on the CMS (publish without code)

The dashboard lives at **yoursite.netlify.app/admin** and signs in with your GitHub account.

1. In `public/admin/config.yml`, replace `YOUR-GITHUB-USERNAME` with your GitHub username. Commit and push:
   ```bash
   git add . && git commit -m "Set CMS repo" && git push
   ```
2. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Application name: `sameolcre CMS`
   - Homepage URL: your Netlify URL
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Create it, then **Generate a new client secret**. Keep the page open.
3. On Netlify: **Site configuration → Access & security → OAuth → Install provider → GitHub**, and paste the Client ID and Client Secret.
4. Visit `/admin`, click **Login with GitHub**, and you're in.

Every save in the dashboard becomes a commit on GitHub and redeploys the site in about a minute.

**Using the CMS on your Mac (optional):** run `npm run dev` in one Terminal window and `npm run cms` in another, then open http://localhost:4321/admin. No sign-in needed, and changes save straight to your files.

## Step 8 — Your own domain (optional)

Netlify → **Domain management → Add a domain**. Follow its DNS instructions, then update `site:` in `astro.config.mjs` and the URLs in `public/admin/config.yml`.

---

## How the content works

- **Work**: one Markdown file per project. `featured: true` puts it on the home page; `order` controls position (lower first). Categories: Creative Direction, Branding, Web Development, Digital Media.
- **Journal**: essays and notes share one archive, newest first, filterable. Notes can be a single line; the title is optional.
- **Process**: status is `In progress`, `Exploration` or `Archived`.
- **Images**: uploads from the CMS go to `public/images/uploads/`. Keep photos under ~2 MB; export at 2400px wide max.
- **Drafts**: `draft: true` hides anything from the live site.

## Design tokens

| Token | Value |
|---|---|
| Off-white | `#F6F3E9` |
| Black | `#000000` |
| Wasp Yellow | `#FFC700` (labels and tape only, never a background) |
| Headlines | Inter Tight (free stand-in for Helvetica Now), caps, in "quotes" |
| Labels | IBM Plex Mono, caps, +8% tracking |

Styles live in `src/styles/global.css`. Brand files live in `public/brand/`.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local site at localhost:4321 |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run cms` | Local CMS backend (use with `npm run dev`) |
