# fishka.ai

Personal portfolio and project notes, built with Vite, React, and TypeScript.

## Stack

- **Build:** Vite 8
- **UI:** React 19 + TypeScript 7
- **Lint:** Oxlint
- **Hosting:** Cloudflare Pages (static output from `dist/`)

## Local Development

```bash
npm ci
npm run dev
```

## Verification & Build

```bash
npm run check   # typecheck + lint
npm run build   # production bundle -> dist/
npm run preview # preview production bundle locally
```

## Cloudflare Pages Settings

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** `24` (pinned in `.nvmrc`)
