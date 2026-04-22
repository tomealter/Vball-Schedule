# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js 14 (App Router) volleyball schedule viewer for the BB Division 1 league at Fairfax Sportsplex. It pulls schedule and standings data live from two Google Sheets via the Sheets API v4 and renders them client-side with team filtering.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint + Stylelint
npm run prettier     # Check formatting
npm run prettier:write  # Auto-fix formatting
npm run tsc          # Type-check only
npm run test         # lint + tsc (no unit tests)
npm run component    # Run Plop to scaffold a new component
```

## Architecture

### Data flow

`app/page.tsx` (server component) fetches from Google Sheets API v4 with `cache: 'no-store'` and passes raw `string[][]` values down as props. The Google Sheets IDs and API key are hardcoded in `page.tsx`.

- **scheduleId** / **scheduleTab**: game schedule spreadsheet
- **standingsId** / **standingsTab**: win/loss records

### Key components

- **`source/03-components/Schedule/Schedule.tsx`** — the main orchestrator (client component). Parses raw sheet rows into typed schedule and standings arrays, manages `activeTeam` state (persisted to `localStorage`), exposes `ActiveTeamContext`.
- **`source/03-components/TeamSelect/TeamSelect.tsx`** — `react-select` dropdown that reads/writes `ActiveTeamContext`.
- **`source/03-components/Matches/Matches.tsx`** — renders the schedule list; match strings like `"1 vs 3"` are decoded using the team list array (team index = team number - 1).

### Source directory structure

```
source/
  00-config/    CSS variables, mixins, PostCSS entry
  01-global/    Fonts, global styles
  02-layouts/   Layout wrappers (SiteContainer, Section, Constrain, Footer, etc.)
  03-components/  UI components (Schedule, Matches, TeamSelect, etc.)
  04-templates/   Page template wrapper
  05-pages/     (unused currently)
  06-utility/   Utility CSS
```

### Styling

PostCSS with `postcss-nesting`, `postcss-advanced-variables`, and CSS Modules. Global CSS vars are in `source/00-config/vars/`. Component styles live alongside components as `.module.css` files. `clsx` is used for conditional class composition.

### Data parsing quirks

- Team list is read from rows 2–11 of the schedule sheet (column index 2).
- Date rows are detected by checking if the first word of a cell matches a month name (all-caps, e.g. `"APRIL 21ST"`).
- Match strings encode team numbers (1-based), e.g. `"2 vs 5"` → `teamList[1]` vs `teamList[4]`.
- Standings sheet rows are matched against the teamList to filter out non-team rows.
