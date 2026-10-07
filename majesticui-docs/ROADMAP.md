# MajesticUI — Complete Product and Engineering Roadmap

## 1. Roadmap Objective

Build MajesticUI in layers. Validate source ownership, variants, dependency selection, conflict safety, CSS integration, client-component handling, and package-manager independence before introducing enterprise infrastructure.

---

# Phase 0 — Architecture and Standards

## Deliverables

- product principles
- naming conventions
- monorepo layout
- README standard for every app/package
- registry item taxonomy
- component family + variant schema
- typed dependency schema
- `majestic.json` schema
- package manager adapter contract
- project context contract
- installation plan contract
- transformer contract
- manifest schema
- Tailwind conventions
- Framer Motion conventions
- `"use client"` policy
- CSS copy/merge policy
- conflict/overwrite policy
- provenance/license policy

## Exit Criteria

The team can answer precisely:

```text
What is a family?
What is a variant?
What gets installed for one selection?
How are styles/assets declared?
When is "use client" added?
How are existing components reused?
When does the CLI prompt?
How are upstream component origins tracked?
```

---

# Phase 1 — Monorepo Foundation

## Tasks

- initialize pnpm workspace
- configure Turborepo
- TypeScript/ESLint/Prettier
- Vitest/Playwright
- Changesets
- create all package/app skeletons
- add README.md to each package/app
- create fixture projects
- create CI

## Required Packages

```text
@majestic/ui
@majestic/config
@majestic/registry-schema
@majestic/registry-core
@majestic/resolver
@majestic/installer
@majestic/transformers
@majestic/project-detector
@majestic/package-manager
```

## Exit Criteria

```bash
pnpm build
pnpm test
pnpm lint
pnpm typecheck
```

pass and CI rejects a package/app missing README.md.

---

# Phase 2 — Project Detection and Init

## Commands

```bash
majestic init
majestic doctor
```

## Detect

- React
- Next.js
- Vite
- TypeScript
- Tailwind CSS
- package manager
- workspace/app root
- aliases
- source directory
- existing global CSS

## Output

- `majestic.json`
- `.majestic/manifest.json`

## Package Managers

```text
npm
pnpm
yarn
bun
```

## Exit Criteria

`majestic init` works across all fixtures.

---

# Phase 3 — Registry Schema, Families, and Variants

## Goals

Create static registry infrastructure with family/variant support.

## Tasks

- Zod schemas
- family metadata
- per-variant metadata
- provenance/license metadata
- client requirement
- files/styles/assets
- typed dependencies
- compatibility
- registry validation
- static index generation
- checksums/integrity

## Initial Families

```text
button
input
textarea
label
card
badge
avatar
separator
skeleton
checkbox
radio
switch
select
dialog
dropdown-menu
tabs
tooltip
table
pagination
breadcrumb
```

At least `button` should demonstrate multiple variants:

```text
default
animated
glass
lucide
phosphor
```

## Exit Criteria

A single registry family can publish several independently installable variants with different dependencies.

---

# Phase 4 — Core Add Installer

## Commands

```bash
majestic add button
majestic add button:animated
majestic add button --variant glass
majestic add button input dialog
```

## Tasks

- fetch exact variant
- resolve targets
- install only missing npm dependencies
- copy source
- transform imports
- apply `"use client"`
- copy/merge associated styles
- format source
- update manifest

## Exit Criteria

Works through:

```bash
npx @majestic/ui@latest add button:animated
pnpm dlx @majestic/ui@latest add button:animated
yarn dlx @majestic/ui@latest add button:animated
bunx @majestic/ui@latest add button:animated
```

and resulting projects build.

---

# Phase 5 — Typed Selective Dependency Resolver

## Goals

Install only the transitive dependencies of the selected item.

## Resolve

```text
npm packages
registry dependencies
styles
assets
theme/token dependencies
config patches
```

## Requirements

- recursive resolution
- deduplication
- cycle detection
- version compatibility
- cross-namespace dependencies
- batch package installation
- dependency-presence checks

## Exit Criteria

A registry containing many icon/UI libraries does not install unrelated packages when a single variant is selected.

---

# Phase 6 — Safe File and Style Management

## Tasks

- manifest checksums
- local modification detection
- untracked existing file detection
- variant conflict detection
- CSS merge conflict detection
- terminal diff
- `--skip-existing`
- `--overwrite`
- `--dry-run`
- `--yes`
- `--no-interactive`

## Default Rules

```text
unchanged tracked file -> reuse
locally modified file  -> keep + prompt
untracked existing     -> keep + prompt
variant conflict       -> prompt
```

## Exit Criteria

MajesticUI never silently overwrites a locally modified source/style file.

---

# Phase 7 — Blocks and Compositions

## Initial Blocks

```text
login-01
login-02
register-01
navbar-01
sidebar-01
dashboard-01
dashboard-02
profile-01
settings-01
```

## Key Scenario

User already has `button`. Installing `block:login-01` must reuse it when compatible and ask before replacement if modified/incompatible.

## Exit Criteria

Blocks can compose existing project state safely.

---

# Phase 8 — Tailwind Theme and CSS System

## Tasks

- semantic design tokens
- dark mode
- theme registry items
- CSS variable validation
- style copy mode
- style merge mode
- keyframe dedupe
- token signature tracking

## Initial Themes

```text
default
enterprise-light
enterprise-dark
ocean
emerald
neutral
glass
```

## Exit Criteria

Only the selected/required theme assets are installed.

---

# Phase 9 — Framer Motion System

## Tasks

- shared motion tokens
- shared presets
- reduced-motion policy
- per-variant Framer Motion dependency
- `client: true` validation
- animated component examples

## Exit Criteria

Static variants do not require Framer Motion; animated variants do.

---

# Phase 10 — Icon and UI Foundation Diversity

## Goals

Allow components from multiple foundations without bloating the consuming project.

## Supported Examples

```text
lucide-react
@phosphor-icons/react
@tabler/icons-react
react-icons
Radix UI
Base UI
Headless UI
custom SVG
```

## Exit Criteria

Each variant declares and installs only the library it actually uses.

---

# Phase 11 — Features

## Initial Features

```text
authentication
users
permissions
student-management
lead-management
notifications
file-management
```

Features can combine components, blocks, hooks, schemas, services, styles, and providers.

## Exit Criteria

Feature installation remains conflict-safe and selectively resolved.

---

# Phase 12 — Documentation and Preview Site

## Deliverables

- docs app
- searchable family catalog
- variant selector
- live preview
- source preview
- dependency preview
- install command generator
- provenance/license display
- CSS/theme requirements
- accessibility notes

Every component page should show exactly what will be installed.

---

# Phase 13 — Diff and Safe Update System

## Commands

```bash
majestic list
majestic outdated
majestic diff button
majestic update button
```

## Tasks

- base/local/remote comparison
- safe unchanged-file upgrade
- local modification warnings
- style/token update diff
- manifest migration

---

# Phase 14 — Multi-Registry Federation

Support:

```text
@majestic
@crm
@sis
@erp
```

Examples:

```bash
majestic add @sis/student-profile
majestic add @crm/lead-pipeline
```

---

# Phase 15 — Private Registry and Enterprise Security

## Deliverables

- authentication
- organization registry access
- RBAC
- access tokens
- integrity verification
- audit log
- publishing permissions
- license/dependency policy

---

# Phase 16 — Registry Studio

Visual workflows:

```text
Create family
Add variant
Upload/adapt source
Declare dependencies
Attach styles/assets
Preview
Validate
Publish
Deprecate
```

---

# Phase 17 — Marketplace / External Registries

Allow external registry sources under explicit trust policy.

```bash
majestic registry add acme https://ui.acme.com/r
majestic add @acme/awesome-chart
```

---

# Phase 18 — AI-Assisted MajesticUI

Potential commands:

```bash
majestic generate "student profile with attendance and tuition"
majestic ai migrate ./old-dashboard.tsx
```

AI should select from approved registry assets and respect project config rather than inventing uncontrolled dependencies.

---

# V1 Definition of Done

MajesticUI V1 is complete when these scenarios work reliably:

```text
1. init in npm/pnpm/yarn/Bun projects
2. install default component
3. install specific variant
4. install animated client component
5. install associated CSS/keyframes
6. install icon-specific variant without other icon libraries
7. install block using already-installed dependencies
8. prompt before overwriting locally modified component
9. dry-run produces accurate deterministic plan
10. manifest records exact variant/files/dependencies/checksums
11. docs preview shows exact installation footprint
12. every app/package repository area has README.md
```
