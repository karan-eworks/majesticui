# MajesticUI — Detailed System Design

## 1. Design Objective

MajesticUI must install source code into an existing project safely, predictably, and selectively while allowing new UI libraries, icon libraries, themes, variants, blocks, registries, and frameworks to be added without rewriting the CLI core.

## 2. Monorepo Package Design

```text
packages/
├── cli/
├── config/
├── registry-schema/
├── registry-core/
├── resolver/
├── installer/
├── transformers/
├── project-detector/
├── package-manager/
├── logger/
├── testing/
├── auth/
└── shared/
```

Each directory must contain a local `README.md`.

### `@majestic/ui`

User-facing CLI package.

Responsibilities:

- parse commands/options
- render prompts
- coordinate services
- print deterministic plans/results
- map errors to actionable messages

### `@majestic/config`

- load/validate `majestic.json`
- merge defaults + CLI overrides
- normalize paths and policies

### `@majestic/registry-schema`

- Zod schemas
- generated TypeScript types
- schema versioning

### `@majestic/registry-core`

- registry discovery
- validation
- build static artifacts
- generate search index
- checksums/integrity
- provenance metadata

### `@majestic/resolver`

- normalize family/variant selection
- dependency graph
- typed dependency resolution
- dedupe
- cycle detection
- compatibility
- deterministic topological ordering

### `@majestic/installer`

- installation planning
- conflict classification
- file/style writes
- merge policies
- rollback boundaries
- manifest updates

### `@majestic/transformers`

- `"use client"` directives
- imports
- aliases
- framework paths
- variant options
- theme tokens
- source normalization

### `@majestic/project-detector`

- React/Next/Vite
- TypeScript
- Tailwind
- aliases
- app/workspace root
- package manager

### `@majestic/package-manager`

- npm/pnpm/yarn/Bun adapters
- dependency presence/version checks
- batch install/remove

## 3. Project Configuration

```ts
interface MajesticConfig {
  $schema?: string
  framework?: "auto" | "react" | "next" | "vite"
  typescript?: boolean | "auto"
  packageManager?: "auto" | "npm" | "pnpm" | "yarn" | "bun"

  registry: {
    default: string
    sources: Record<string, RegistrySourceConfig>
  }

  paths: {
    components: string
    ui: string
    blocks: string
    features: string
    hooks: string
    lib: string
    styles: string
    public?: string
  }

  styling: {
    engine: "tailwind"
    cssVariables: boolean
    theme?: string
    globalCss?: string
  }

  animation: {
    engine: "framer-motion"
    enabled: boolean
    respectReducedMotion: boolean
  }

  icons?: {
    preferred?: string
  }

  conflicts?: {
    defaultAction: "keep" | "prompt"
  }

  formatter?: "prettier" | "none"
}
```

## 4. Component Family and Variant Model

A family groups related installable implementations.

```ts
interface RegistryFamily {
  schemaVersion: number
  name: string
  type: RegistryItemType
  title: string
  description?: string
  defaultVariant: string
  variants: Record<string, RegistryVariant>
  tags?: string[]
  categories?: string[]
  provenance?: Provenance
}
```

Example:

```json
{
  "name": "button",
  "type": "component",
  "defaultVariant": "default",
  "variants": {
    "default": {
      "client": false,
      "files": [
        {
          "source": "default/button.tsx",
          "target": "{{ui}}/button.tsx",
          "type": "component"
        }
      ]
    },
    "animated": {
      "client": true,
      "dependencies": {
        "npm": ["framer-motion"]
      },
      "files": [
        {
          "source": "animated/button.tsx",
          "target": "{{ui}}/button.tsx",
          "type": "component"
        }
      ]
    }
  }
}
```

Supported CLI forms:

```bash
majestic add button
majestic add button:animated
majestic add button --variant animated
```

## 5. Concrete Variant Schema

```ts
type ClientRequirement = boolean | "auto"

interface RegistryVariant {
  version?: string
  client?: ClientRequirement
  dependencies?: RegistryDependencies
  compatibility?: CompatibilityRules
  files: RegistryFile[]
  styles?: RegistryStyle[]
  tokens?: RegistryTokenPatch[]
  assets?: RegistryAsset[]
  options?: RegistryOption[]
  provenance?: Provenance
}
```

For V1, publish `client` as explicit boolean. `"auto"` can be introduced after source-analysis rules are proven.

## 6. Typed Dependency Model

```ts
interface RegistryDependencies {
  npm?: string[]
  devNpm?: string[]
  registry?: RegistryDependency[]
  styles?: string[]
  themes?: string[]
  assets?: string[]
}
```

This allows MajesticUI to install only what is needed.

Example:

```json
{
  "dependencies": {
    "npm": ["framer-motion", "@phosphor-icons/react"],
    "registry": ["utils"],
    "styles": ["button-effects"],
    "themes": ["interaction-tokens"]
  }
}
```

## 7. Registry File Design

```ts
interface RegistryFile {
  source: string
  target: string
  type:
    "component" | "hook" | "utility" | "style" | "asset" | "config" | "other"
  client?: boolean
  transform?: boolean
}
```

Target variables:

```text
{{root}}
{{src}}
{{components}}
{{ui}}
{{blocks}}
{{features}}
{{hooks}}
{{lib}}
{{styles}}
{{public}}
```

## 8. Style Design

```ts
type StyleMode = "copy" | "merge" | "inline"

interface RegistryStyle {
  source: string
  target?: string
  mode: StyleMode
  scope?: "component" | "global" | "theme"
}
```

Examples:

### Dedicated file

```json
{
  "source": "button.css",
  "target": "{{styles}}/majestic/button.css",
  "mode": "copy"
}
```

### Merge into global CSS

```json
{
  "source": "effects.css",
  "target": "{{styles}}/globals.css",
  "mode": "merge"
}
```

Mergeable content can include:

- CSS variables
- `@keyframes`
- Tailwind-compatible utility layers
- theme token blocks

MajesticUI should avoid duplicate keyframes/tokens by tracking signatures in the manifest.

## 9. Client Directive Design

For every generated TSX/JSX file with `client: true`:

1. parse source
2. detect existing directives
3. ensure exactly one `"use client"`
4. place it before imports and ordinary comments where required for consistency
5. format source

Result:

```tsx
"use client"

import { motion } from "framer-motion"
```

Do not add the directive to server-compatible files merely because another file in the same block is client-side.

## 10. Provenance and License Metadata

When components are adapted from external UI libraries, keep source attribution metadata.

```ts
interface Provenance {
  origin?: string
  sourceUrl?: string
  adapted?: boolean
  license?: string
  attribution?: string
}
```

Publishing validation should enforce project policy for licenses.

## 11. Dependency Resolution Algorithm

Input:

```text
@majestic/dashboard:animated
```

Algorithm:

1. normalize namespace/family/variant
2. fetch concrete variant metadata
3. enqueue typed dependencies
4. recursively resolve registry dependencies
5. collect npm packages
6. collect styles/themes/assets
7. detect cycles
8. validate compatibility
9. deduplicate every dependency type
10. topologically order registry writes
11. pass normalized graph to planner

Pseudo type:

```ts
interface ResolvedGraph {
  items: ResolvedRegistryItem[]
  npm: Set<string>
  devNpm: Set<string>
  styles: ResolvedStyle[]
  themes: ResolvedTheme[]
  assets: ResolvedAsset[]
}
```

## 12. Package Presence Logic

Before installation:

- inspect `package.json`
- inspect workspace package manifests where relevant
- determine if dependency already exists
- compare required version range
- do not reinstall compatible dependencies unnecessarily
- warn before changing incompatible versions

Batch missing packages into one package-manager operation.

## 13. Installation Plan

```ts
interface InstallPlan {
  requested: Selection[]
  addFiles: PlannedFile[]
  reuseFiles: PlannedFile[]
  conflictingFiles: PlannedConflict[]
  mergeStyles: PlannedStyleMerge[]
  addAssets: PlannedAsset[]
  npmInstall: string[]
  devNpmInstall: string[]
  warnings: PlanWarning[]
}
```

The planner must be deterministic so `--dry-run` accurately represents execution.

## 14. File Conflict Classification

```ts
type FileState =
  | "missing"
  | "tracked-unchanged"
  | "tracked-modified"
  | "untracked-existing"
  | "variant-conflict"
  | "merge-conflict"
```

Rules:

### Missing

Install.

### Tracked + unchanged

Reuse; no prompt.

### Tracked + modified

Prompt; default keep local.

### Untracked existing

Prompt because ownership is unknown.

### Variant conflict

Example: project has `button:glass`, block requests `button:default` to same target. Show both variants and ask how to proceed.

### Merge conflict

Show style/config diff and keep local by default.

## 15. Conflict CLI Options

```text
--skip-existing   keep conflicting files
--overwrite       replace registry-owned conflicts
--force           bypass compatible warnings where allowed
--dry-run         print exact plan, make no changes
--yes             accept non-destructive defaults
--no-interactive  fail or apply provided policy when prompt is required
```

`--yes` must not imply destructive overwrite.

## 16. Manifest Design

Location:

```text
.majestic/manifest.json
```

Recommended record:

```json
{
  "schemaVersion": 1,
  "installed": {
    "@majestic/button": {
      "variant": "animated",
      "version": "1.2.0",
      "installedAt": "2026-10-07T00:00:00Z",
      "files": [
        {
          "path": "src/components/ui/button.tsx",
          "installedChecksum": "sha256:..."
        }
      ],
      "styles": [],
      "npmDependencies": ["framer-motion"]
    }
  }
}
```

The installer compares `installedChecksum` with the current file checksum to detect local edits.

## 17. Block Installation Example

Registry:

```text
block:login-01
├── button:default
├── input:default
├── label:default
└── card:default
```

Local project:

```text
button.tsx -> modified
input.tsx  -> unchanged
label.tsx  -> absent
card.tsx   -> absent
```

Plan:

```text
REUSE
input

ADD
label
card

CONFLICT
button (local modifications)
```

The block can still install while preserving the existing button if its API is compatible. If a required API contract is incompatible, planner marks the block unresolved and explains the requirement.

## 18. Compatibility Rules

```ts
interface CompatibilityRules {
  node?: string
  react?: string
  next?: string
  vite?: string
  tailwind?: string
  typescript?: string
}
```

Example error:

```text
Cannot install data-table:animated.
Requires React >= 19.
Detected React 18.3.

Options:
- upgrade React
- install a compatible older variant version
- cancel
```

## 19. Tailwind Rules

- Tailwind is the primary styling engine.
- Prefer semantic CSS variables.
- Avoid raw hard-coded brand colors in reusable components.
- Keep additional CSS isolated and declared in registry metadata.
- Do not install whole theme packs unless selected or transitively required.

## 20. Framer Motion Rules

- Framer Motion is optional per component/variant.
- A non-animated variant must not acquire Framer Motion merely because another registry item uses it.
- Animated files are `client: true` where required.
- Respect reduced motion.
- Prefer shared motion presets for consistency.

## 21. Icon Rules

A variant may depend on any supported icon source.

```json
{
  "dependencies": {
    "npm": ["@phosphor-icons/react"]
  }
}
```

Only that package is installed.

Project-level icon preference is advisory unless a variant supports substitution.

## 22. Update Design

`majestic diff <item>` compares:

```text
base installed version
local current file
latest registry version
```

`majestic update <item>`:

- auto-updates unchanged files
- asks before replacing locally modified files
- can show three-way diff
- updates style/token signatures
- updates manifest only after successful commit

## 23. Transaction/Rollback Boundary

Installer should stage the complete plan before mutation.

Recommended V1 behavior:

1. validate all source and destinations
2. prepare temp files
3. install packages
4. write files/styles/assets
5. format/validate
6. write manifest last
7. if file stage fails, restore backups of touched files

Future versions can provide stronger transaction journals.

## 24. Registry Search Index

`index.json` should contain family and variant metadata without full source payloads.

```json
{
  "name": "button",
  "type": "component",
  "defaultVariant": "default",
  "variants": ["default", "animated", "glass"],
  "tags": ["action", "form"]
}
```

## 25. Repository README Requirement

Every `apps/*`, `packages/*`, and significant `registry/*` area must have a README. CI should eventually verify this convention.
