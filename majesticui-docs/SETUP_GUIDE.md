# MajesticUI — Full Setup Guide

## 1. Repository Strategy

Use a TypeScript monorepo with pnpm and Turborepo internally. MajesticUI consumers remain free to use npm, pnpm, yarn, or Bun.

```text
majesticui/
├── apps/
│   ├── docs/
│   ├── playground/
│   ├── studio/
│   └── registry-api/
├── packages/
│   ├── cli/
│   ├── config/
│   ├── registry-core/
│   ├── registry-schema/
│   ├── resolver/
│   ├── installer/
│   ├── transformers/
│   ├── project-detector/
│   ├── package-manager/
│   ├── logger/
│   ├── testing/
│   ├── auth/
│   └── shared/
├── registry/
│   ├── components/
│   ├── composites/
│   ├── blocks/
│   ├── features/
│   ├── pages/
│   ├── layouts/
│   ├── templates/
│   ├── themes/
│   ├── hooks/
│   └── utilities/
├── fixtures/
│   ├── next-pnpm/
│   ├── next-npm/
│   ├── vite-pnpm/
│   ├── vite-bun/
│   └── monorepo/
├── tooling/
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json
```

**Every app/package/significant registry folder must include a README.md.** See `REPOSITORY_READMES.md` and `repo-readmes/`.

## 2. Prerequisites

Recommended platform development baseline:

```text
Node.js      >= 20
pnpm         >= 10
Git          current stable
TypeScript   current stable
```

Consumer projects can invoke MajesticUI through:

```text
npm / npx
pnpm / pnpm dlx
yarn / yarn dlx
bun / bunx
```

## 3. Bootstrap

```bash
mkdir majesticui
cd majesticui
pnpm init
pnpm add -D turbo typescript eslint prettier
```

`pnpm-workspace.yaml`:

```yaml
packages:
  - apps/*
  - packages/*
```

`turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {},
    "typecheck": {}
  }
}
```

## 4. Root package.json

```json
{
  "name": "majesticui",
  "private": true,
  "packageManager": "pnpm@10",
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "registry:validate": "pnpm --filter @majestic/registry-core validate",
    "registry:build": "pnpm --filter @majestic/registry-core build:registry"
  }
}
```

## 5. Package README Standard

Every package/app README should contain:

```text
# Name
Purpose
Responsibilities
Non-responsibilities
Folder structure
Public API / commands
Development commands
Dependencies
Integration points
Testing
Release/deployment
Contribution notes
```

This keeps ownership clear as the monorepo grows.

## 6. CLI Package

```text
packages/cli/
├── README.md
├── src/
│   ├── index.ts
│   ├── commands/
│   │   ├── init.ts
│   │   ├── add.ts
│   │   ├── list.ts
│   │   ├── search.ts
│   │   ├── info.ts
│   │   ├── diff.ts
│   │   ├── update.ts
│   │   └── doctor.ts
│   ├── services/
│   └── utils/
├── package.json
└── tsup.config.ts
```

`package.json`:

```json
{
  "name": "@majestic/ui",
  "type": "module",
  "bin": {
    "majestic": "./dist/index.js"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  }
}
```

Consumer commands:

```bash
npx @majestic/ui@latest init
pnpm dlx @majestic/ui@latest init
bunx @majestic/ui@latest init
yarn dlx @majestic/ui@latest init
```

## 7. Suggested CLI Dependencies

```bash
pnpm --filter @majestic/ui add commander @clack/prompts zod picocolors ora semver
pnpm --filter @majestic/ui add -D tsup typescript
```

Optional:

```text
execa
fast-glob
diff
ts-morph/recast
```

## 8. Styling Standard

Tailwind CSS is the primary styling mechanism.

Rules:

- use semantic tokens where possible
- avoid hard-coded design-system colors
- support dark mode through token strategy
- additional CSS must be explicitly declared by registry metadata
- do not import global CSS behind the developer's back without a planned/visible merge operation

## 9. Animation Standard

Use Framer Motion only for variants that actually require it.

```tsx
"use client"

import { motion } from "framer-motion"

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border bg-card p-6"
    />
  )
}
```

A static card must not gain `framer-motion` as a dependency.

## 10. Client Component Standard

Registry files that need browser/client behavior set:

```json
{ "client": true }
```

The transformer ensures:

```tsx
"use client"
```

at the top of the generated file.

Do not mark an entire block client-side when only individual files need it.

## 11. Project Configuration

`majestic.json`:

```json
{
  "$schema": "https://ui.majestic.dev/schema.json",
  "framework": "next",
  "typescript": true,
  "packageManager": "auto",
  "registry": {
    "default": "@majestic",
    "sources": {
      "@majestic": "https://ui.majestic.dev/r"
    }
  },
  "paths": {
    "components": "@/components",
    "ui": "@/components/ui",
    "blocks": "@/components/blocks",
    "features": "@/features",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "styles": "@/styles"
  },
  "styling": {
    "engine": "tailwind",
    "cssVariables": true,
    "theme": "default",
    "globalCss": "@/app/globals.css"
  },
  "animation": {
    "engine": "framer-motion",
    "enabled": true,
    "respectReducedMotion": true
  },
  "icons": {
    "preferred": "lucide"
  },
  "conflicts": {
    "defaultAction": "keep"
  },
  "formatter": "prettier"
}
```

The preferred icon setting does not force every component to use that library. A variant can declare another icon library and install it selectively.

## 12. Package Manager Detection

Detection precedence:

1. CLI override (`--package-manager`)
2. `majestic.json`
3. `package.json#packageManager`
4. nearest lockfile/workspace root
5. fallback/default

Recognized:

```text
package-lock.json -> npm
pnpm-lock.yaml    -> pnpm
yarn.lock         -> yarn
bun.lock/bun.lockb -> bun
```

## 13. Registry Source Structure

Recommended family-based layout:

```text
registry/components/button/
├── README.md
├── registry.json
├── default/
│   └── button.tsx
├── animated/
│   └── button.tsx
├── glass/
│   ├── button.tsx
│   └── button.css
└── phosphor/
    └── button.tsx
```

`registry.json` contains the family and variant definitions.

## 14. Adding a Component from Another UI Library

Workflow:

```text
obtain/adapt source according to license
        |
        v
normalize imports/styles
        |
        v
add provenance metadata
        |
        v
place under registry family/variant
        |
        v
declare only required dependencies
        |
        v
validate registry
        |
        v
publish built registry
```

After publishing, consumers install from MajesticUI, not by calling the upstream UI CLI.

## 15. Associated CSS

A variant may declare CSS:

```json
{
  "styles": [
    {
      "source": "glass/button.css",
      "target": "{{styles}}/majestic/button.css",
      "mode": "copy"
    }
  ]
}
```

Or merge tokens/keyframes:

```json
{
  "styles": [
    {
      "source": "glass/effects.css",
      "target": "{{styles}}/globals.css",
      "mode": "merge"
    }
  ]
}
```

The CLI must show style changes in the installation plan.

## 16. Selective Icon/UI/Theme Dependencies

Examples:

```text
button:lucide      -> lucide-react only
button:phosphor    -> @phosphor-icons/react only
button:animated    -> framer-motion only
select:radix       -> @radix-ui/react-select only
theme:enterprise   -> enterprise theme files only
```

Never install all libraries registered in MajesticUI.

## 17. Conflict-Safe Block Installation

Example:

```bash
majestic add block:login
```

If `button.tsx` already exists:

```text
tracked + unchanged -> reuse
tracked + modified  -> prompt
untracked existing  -> prompt
```

Default prompt action: **Keep existing**.

Flags:

```text
--skip-existing
--overwrite
--dry-run
--yes
--no-interactive
```

## 18. Local Manifest

Create during `init`:

```text
.majestic/manifest.json
```

Track:

- namespace/item/family
- selected variant
- installed version
- file paths
- installed checksums
- style signatures
- assets
- npm dependencies

This state powers conflict detection, `diff`, and safe updates.

## 19. Fixtures

Create fixture applications:

```text
fixtures/next-pnpm
fixtures/next-npm
fixtures/vite-pnpm
fixtures/vite-bun
fixtures/monorepo
```

Add install scenarios:

```text
basic component
variant component
animated client component
associated CSS
block with existing unchanged dependency
block with modified dependency
icon-library-specific variant
theme install
```

## 20. CI

Required checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm registry:validate
pnpm registry:build
```

CI should also verify:

- every app/package has README.md
- registry metadata validates
- dependency graph has no cycles
- registry items reference existing files
- license/provenance policy passes
- fixture installs build successfully
- generated client components have correct directives

## 21. Recommended First Milestone

The first end-to-end milestone should prove all core architectural rules:

```text
majestic init
majestic add button
majestic add button:animated
majestic add button:glass
majestic add block:login
```

with:

- selective npm dependencies
- associated CSS
- `"use client"`
- existing-file reuse
- prompt before overwrite
- manifest checksums
- npm/pnpm/yarn/Bun adapter coverage
