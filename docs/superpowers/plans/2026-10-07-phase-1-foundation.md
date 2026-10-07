# Phase 1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create the minimal MajesticUI pnpm/Turborepo foundation described by the setup guide.

**Architecture:** A private root workspace coordinates independent packages under `packages/*` and placeholder applications under `apps/*`. Shared TypeScript and task configuration lives at the root; package behavior is intentionally limited to valid entry points.

**Tech Stack:** Node.js, pnpm, Turborepo, TypeScript, ESLint, Prettier, Vitest, Playwright.

---

### Task 1: Add root workspace tooling

**Files:** root `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.json`, formatting/lint/test configs, `.gitignore`.

- [x] Add root scripts and dev dependencies.
- [x] Configure workspace package globs.
- [x] Configure shared task pipelines and TypeScript defaults.

### Task 2: Add package boundaries

**Files:** `packages/*/package.json`, `packages/*/src/index.ts`, package `tsconfig.json` files.

- [x] Create the documented package directories.
- [x] Give each package a scoped name and build/typecheck/test scripts.
- [x] Add minimal TypeScript entry points.

### Task 3: Add application and registry structure

**Files:** `apps/*/package.json`, app READMEs, `registry/*/README.md`, `fixtures/*/README.md`.

- [x] Add docs, playground, and studio placeholders.
- [x] Add registry taxonomy folders.
- [x] Add documented fixture placeholders.

### Task 4: Verify the foundation

- [ ] Install dependencies with `pnpm install`.
- [ ] Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build`.
- [ ] Run registry task commands and record any intentional placeholder behavior.
