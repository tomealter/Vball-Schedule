---
name: plan-npm-updates
description: Plan npm package updates for this project by comparing against the upstream forumone/nextjs-project repo. Surfaces breaking changes and asks for permission before applying any major version bumps.
argument-hint: ""
allowed-tools: Bash(npm *), Bash(npx *), WebFetch, Read, Edit, Write
---

Plan and apply npm package updates for this project. This project is branched off the upstream repo at https://github.com/forumone/nextjs-project — use that repo's `package.json` and tooling config files as a reference when evaluating whether upgrades and config changes align with upstream intent.

## Step 1 — Read the upstream baseline

**Important:** Do NOT use `raw.githubusercontent.com` — it returns 404 for files in this repo. Use the GitHub Contents API instead:

1. First, fetch the repo root listing to discover which files actually exist:
   `https://api.github.com/repos/forumone/nextjs-project/contents`

2. Then fetch each relevant file via:
   `https://api.github.com/repos/forumone/nextjs-project/contents/<filename>`
   The response includes a base64-encoded `content` field — decode it to get the file contents.

Fetch whichever of these files appear in the root listing:

- `package.json` — package versions and scripts
- `.eslintrc.js` or `eslint.config.js` or `eslint.config.mjs` or `.eslintrc.json` (whichever exists) — ESLint rules and plugins
- `.prettierrc` or `prettier.config.js` (whichever exists) — Prettier config
- `tsconfig.json` — TypeScript compiler options
- `postcss.config.js` or `postcss.config.cjs` (whichever exists) — PostCSS plugins
- `.stylelintrc` or `.stylelintrc.yml` or `stylelint.config.js` (whichever exists) — Stylelint config
- `next.config.js` or `next.config.ts` or `next.config.mjs` (whichever exists) — Next.js config

Store all successfully fetched content — you will diff against local equivalents in Step 2b.

## Step 2 — Inspect the current project state

### 2a — Packages

Read the local `package.json` and `package-lock.json` to understand what is currently installed. Note any packages that diverge from upstream (additions, removals, pinned versions).

### 2b — Tooling config diff

Read the local equivalents of each tooling file fetched in Step 1. For each file that exists both locally and upstream, diff the two and note any meaningful differences — changed rules, added/removed plugins, altered compiler options, etc. Ignore whitespace-only or comment-only differences.

Produce a **Tooling Config Diff Summary** table:

| File | Local state | Upstream state | Notable differences |
|------|------------|---------------|-------------------|
| eslint.config.js | ... | ... | ... |

This table is informational for now — you will revisit it in Step 4b after identifying which packages changed.

## Step 3 — Minor/patch updates (safe range)

Run `npm update --dry-run` to preview which packages would be bumped within the existing semver ranges. Present the list to the user before applying anything.

Once the user confirms, run `npm update` to apply the safe-range updates.

## Step 4 — Check for major version upgrades

Run `npx --yes npm-check-updates` (no `-u` flag) to list packages with available major version bumps beyond the current ranges.

For each package with a major bump available:
- Note the current version → proposed new version
- Check whether the upstream forumone/nextjs-project has already adopted this version (from Step 1). If they have, flag it as "upstream-aligned." If they haven't, flag it as "ahead of upstream."
- Look up the package's changelog or GitHub releases to identify breaking changes. Summarize them in plain language (one or two sentences per package).

Present the full table to the user in this format:

| Package | Current | New | Upstream version | Status | Breaking changes |
|---------|---------|-----|-----------------|--------|-----------------|
| example | 3.x | 4.x | 4.x | upstream-aligned | ... |

Then ask: **"Apply these major version upgrades? You can approve all, approve a subset, or skip."** Wait for explicit confirmation before proceeding.

## Step 4b — Tooling config changes driven by package upgrades

For each major package bump the user approved, check whether the upstream tooling config diffs from Step 2b include changes that are likely driven by that upgrade (e.g. approving an ESLint major bump → upstream switched to flat config format; approving a Next.js major → `next.config.js` shape changed).

For each relevant config file:
- Describe the specific change the upstream made and why it is likely required or recommended given the package upgrade
- Show the upstream version of the relevant config block alongside the local version
- Ask: **"Apply this config change from upstream?"** — one confirmation prompt per file. Wait for a response before moving to the next file.

If the user approves, apply the change using Edit. If they decline, note it in the final summary as a skipped config change that may require manual follow-up.

## Step 5 — Apply approved major upgrades

If the user approves all packages:
- Run `npx npm-check-updates -u`
- Run `npm install`

If the user approves only some packages, build a reject list from the unapproved ones:
- Run `npx npm-check-updates -u --reject <rejected1>,<rejected2>,...`
- Run `npm install`

If the user declines all, skip this step entirely.

## Step 6 — Run tests

Run `npm run test` to verify nothing broke.

If tests fail:
- Show the error output
- Ask the user whether to revert (`git checkout package.json package-lock.json && npm install`) or investigate and fix.

## Step 7 — Summary

Report a final table of what changed:

**Packages:**

| Package | Old version | New version | Type | Upstream-aligned |
|---------|------------|------------|------|-----------------|

**Tooling config changes:**

| File | Change applied | Skipped | Notes |
|------|--------------|---------|-------|

Include whether tests passed and flag any skipped config changes that may require manual follow-up.
