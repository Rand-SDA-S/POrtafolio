# Randol OS: portfolio of Randol José Ozoria Santana

Next.js 15 + TypeScript + Tailwind + Framer Motion, exported as a static site for GitHub Pages.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in /out
```

## Edit content
Everything lives in `lib/portfolio-data.ts`: bio, skills, experience, projects, photos, videos, social links, photo path.
- Photos/images: put files in `public/images`, then use `'/images/name.jpg'`.
- MP4: put in `public/videos`, use `kind: 'mp4'` and `id: '/videos/name.mp4'`.
- YouTube/Vimeo: `kind` plus the video ID.
- Resume: replace `public/resume/Randol-Ozoria-Resume.pdf`.
- Add `public/images/og.png` (1200x630) for link previews.
- Replace `YOUR-USERNAME` / `YOUR-HANDLE` placeholders.

## Deploy to GitHub Pages
1. Create a GitHub repo and push this folder to `main`.
2. Repo Settings > Pages > Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes; it sets the base path from the repo name automatically.
Site URL: `https://USERNAME.github.io/REPO/`. For a `USERNAME.github.io` repo, remove the `NEXT_PUBLIC_BASE_PATH` line in the workflow.

## Folders
`app/` pages, metadata, sitemap, robots · `components/` desktop shell and window frame · `windows/` content of each window · `lib/` data and helpers · `public/` static files.

## Hidden section
Click the floating folder drifting on the desktop to open the playground.
