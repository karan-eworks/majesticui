# MajesticUI Button System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement the documented button families as a local, runnable CLI vertical slice with registry validation, selective dependency resolution, safe installation, styles, client directives, and manifest tracking.

**Architecture:** Keep each existing package focused: schema defines contracts, registry-core owns catalog loading, resolver creates deterministic plans, transformers normalize source and paths, installer performs safe filesystem writes, and the CLI coordinates the flow. The registry stays local for this phase and package-manager operation is injected so dry-run and unit tests never perform network installs.

**Tech Stack:** TypeScript, Node.js standard library, pnpm workspaces, Turborepo, Vitest, existing ESLint/Prettier configuration.

---

### Task 1: Establish shared registry contracts

**Files:**

- Modify: packages/registry-schema/src/index.ts
- Test: packages/registry-schema/src/index.test.ts
- Modify: packages/registry-schema/package.json

- [ ] Write tests for valid family/variant metadata, required fields, style modes, file types, and rejection of malformed metadata.
- [ ] Run pnpm vitest run packages/registry-schema/src/index.test.ts and verify the new tests fail because the schema exports are missing.
- [ ] Implement plain TypeScript types plus a small runtime validator using the standard library; do not add Zod until the repository needs it.
- [ ] Export the contracts and validator from the package entrypoint.
- [ ] Run the focused test and pnpm typecheck.

### Task 2: Add the local button registry

**Files:**

- Create: registry/components/buttons/registry.json
- Create: registry/components/buttons/button/default/button.tsx
- Create: registry/components/buttons/button/shadcn/button.tsx
- Create: registry/components/buttons/button/animated/button.tsx
- Create: registry/components/buttons/button/animated/button.css
- Create: registry/components/buttons/button/glass/button.tsx
- Create: registry/components/buttons/button/glass/button.css
- Create: registry/components/buttons/button/gradient/button.tsx
- Create: registry/components/buttons/button/icon/button.tsx
- Create: registry/components/buttons/button/enterprise/button.tsx
- Create: registry/components/buttons/stateful-button/default/stateful-button.tsx
- Create: registry/components/buttons/stateful-button/default/stateful-button-machine.ts
- Create: registry/components/buttons/stateful-button/spinner/stateful-button.tsx
- Create: registry/components/buttons/stateful-button/progress/stateful-button.tsx
- Create: registry/components/buttons/stateful-button/progress/stateful-button-machine.ts
- Modify: packages/registry-core/src/index.ts
- Test: packages/registry-core/src/index.test.ts
- Modify: packages/registry-core/package.json

- [ ] Write tests for loading the catalog, default variants, explicit variants, and all documented variant names.
- [ ] Run the focused tests and verify they fail because the catalog and loader do not exist.
- [ ] Add minimal Tailwind-oriented React source for each variant, with only the dependencies declared by its metadata. Mark animated/stateful sources as client components.
- [ ] Add registry metadata for contracts, dependencies, styles, target paths, and registry dependencies.
- [ ] Implement local catalog loading, JSON validation, family lookup, and variant lookup.
- [ ] Run focused registry tests and pnpm registry:validate.

### Task 3: Implement deterministic variant and dependency resolution

**Files:**

- Modify: packages/resolver/src/index.ts
- Test: packages/resolver/src/index.test.ts
- Modify: packages/resolver/package.json

- [ ] Write tests for default selection, family:variant parsing, transitive registry dependencies, package deduplication, stable ordering, unknown variants, and dependency cycles.
- [ ] Run the focused tests and verify they fail because resolver functions are missing.
- [ ] Implement the resolver against registry-core contracts with no filesystem writes.
- [ ] Return a plan containing selected variants, registry items, npm/dev dependencies, files, and styles.
- [ ] Run focused resolver tests and pnpm typecheck.

### Task 4: Implement source transforms and target planning

**Files:**

- Modify: packages/transformers/src/index.ts
- Test: packages/transformers/src/index.test.ts
- Modify: packages/transformers/package.json
- Modify: packages/config/src/index.ts
- Test: packages/config/src/index.test.ts

- [ ] Write tests for default paths, majestic.json path overrides, target token expansion, client directive insertion, and preserving non-client files.
- [ ] Run focused tests and verify they fail.
- [ ] Implement configuration defaults, JSON loading, target expansion, client directive normalization, and SHA-256 checksum helpers.
- [ ] Implement CSS copy/merge preparation without touching disk.
- [ ] Run focused tests and pnpm typecheck.

### Task 5: Implement safe installation and manifest tracking

**Files:**

- Modify: packages/installer/src/index.ts
- Test: packages/installer/src/index.test.ts
- Modify: packages/installer/package.json
- Modify: packages/shared/src/index.ts
- Test: packages/shared/src/index.test.ts

- [ ] Write fixture-directory tests for missing, unchanged, modified, unknown, and conflicting targets.
- [ ] Run the focused tests and verify they fail.
- [ ] Implement plan classification using manifest checksums and explicit options.
- [ ] Implement safe writes, CSS copy/merge, client-transformed file output, and .majestic/manifest.json updates.
- [ ] Ensure dry-run performs no writes and default conflict handling preserves modified files.
- [ ] Run focused installer tests and pnpm test.

### Task 6: Wire the runnable CLI

**Files:**

- Modify: packages/cli/src/index.ts
- Test: packages/cli/src/index.test.ts
- Modify: packages/cli/package.json
- Modify: root package.json

- [ ] Write CLI tests for add, defaults, explicit variants, --dry-run, --skip-existing, --overwrite, and --force.
- [ ] Run focused tests and verify they fail because the command is not implemented.
- [ ] Implement argument parsing with Node's standard library and deterministic plan output.
- [ ] Add the majestic bin and root pnpm majestic convenience script.
- [ ] Inject package-manager execution; keep dry-run side-effect free.
- [ ] Run pnpm majestic add button:shadcn --dry-run and pnpm majestic add stateful-button:progress --dry-run.

### Task 7: Add an integration fixture and documentation wiring

**Files:**

- Create: fixtures/button-project/package.json
- Create: fixtures/button-project/README.md
- Create: fixtures/button-project/src/components/ui/.gitkeep
- Create: fixtures/button-project/src/lib/.gitkeep
- Create: fixtures/button-project/src/styles/.gitkeep
- Modify: scripts/check-readmes.mjs
- Modify: apps/docs/index.html

- [ ] Add a fixture package that can receive button installations without external framework dependencies.
- [ ] Add an integration test that installs one static, one styled, and one stateful variant into a temporary copy.
- [ ] Update the docs preview to list supported button commands and variants.
- [ ] Run the README check and fixture integration test.

### Task 8: Full verification

**Files:**

- No new production files; review all changed files.

- [ ] Run pnpm docs:check-readmes.
- [ ] Run pnpm typecheck.
- [ ] Run pnpm lint.
- [ ] Run pnpm test.
- [ ] Run pnpm build.
- [ ] Run pnpm registry:validate.
- [ ] Run both documented dry-run commands and verify no project files or manifest are changed.
- [ ] Run git diff --check and inspect git status.
