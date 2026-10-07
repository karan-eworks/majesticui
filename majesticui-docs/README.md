# MajesticUI

MajesticUI is a registry-driven UI platform for installing source-owned React components, component variants, blocks, features, themes, styles, assets, icons, utilities, and application templates into existing projects.

It is inspired by the source-distribution model popularized by shadcn/ui, but MajesticUI is designed as a broader registry platform with variant families, selective dependency installation, associated CSS and theme assets, safe conflict handling, multi-registry support, and enterprise/private registry capabilities.

## Core Stack

| Area                     | Standard                         |
| ------------------------ | -------------------------------- |
| Language                 | TypeScript                       |
| UI runtime               | React                            |
| Styling                  | Tailwind CSS                     |
| Animation                | Framer Motion                    |
| Package managers         | npm/npx, pnpm, yarn, Bun/bunx    |
| Monorepo                 | Turborepo                        |
| Internal package manager | pnpm                             |
| Schema validation        | Zod                              |
| CLI                      | Commander/Citty + @clack/prompts |
| CLI bundling             | tsup                             |
| Testing                  | Vitest + Playwright              |
| Docs/preview             | Next.js                          |
| AST transforms           | ts-morph/Recast                  |
| Registry delivery        | Static JSON first, API later     |

## Core Product Rules

1. **Source ownership** — installed source belongs to the consuming application.
2. **Registry-driven** — the CLI is generic; registry metadata describes what to install.
3. **Selective installation** — install only dependencies, styles, icons, themes, assets, and registry items actually required by the selected item/variant.
4. **Component families and variants** — one family may expose many installable variants from different design sources.
5. **Associated assets** — components can bring their own CSS, keyframes, theme tokens, icons, images, fonts, or utilities.
6. **Safe by default** — never silently overwrite a locally modified file.
7. **Client-aware** — files that require client behavior are installed with `"use client"` at the top.
8. **Tailwind-first** — Tailwind CSS is the default styling system; extra CSS is added only when required.
9. **Framer Motion** — interactive/animated variants may selectively declare Framer Motion.
10. **Package-manager agnostic** — projects can use npm, pnpm, yarn, or Bun.
11. **Multi-registry ready** — public, private, product-specific, and third-party registries can coexist.
12. **Composable** — primitives -> components -> composites -> blocks -> features -> pages -> templates.

## Target Developer Experience

```bash
# Initialize
npx @majestic/ui@latest init
pnpm dlx @majestic/ui@latest init
bunx @majestic/ui@latest init

# Add a default component
npx @majestic/ui@latest add button

# Add a specific variant
npx @majestic/ui@latest add button:animated
npx @majestic/ui@latest add button --variant glass

# Add a larger composition
npx @majestic/ui@latest add block:login-01
npx @majestic/ui@latest add feature:student-management

# Add a theme
npx @majestic/ui@latest add theme:enterprise

# Inspect before changing files
npx @majestic/ui@latest add block:dashboard --dry-run
```

## Selective Dependency Example

If `button:animated` requires only Framer Motion, MajesticUI installs only that package and the files required by that variant.

```text
button:animated
├── button.tsx
├── optional button.css
└── npm: framer-motion
```

It does **not** install every icon library, animation library, theme, or UI dependency available in the registry.

## Existing Component Safety

If a block depends on a button that is already installed, MajesticUI classifies it before writing:

```text
✓ unchanged existing component -> reuse
! locally modified component   -> ask before overwrite
! different variant installed  -> show variant conflict
+ missing dependency           -> install
```

Default conflict action: **keep local file**.

## Documentation Set

- `SETUP_GUIDE.md` — monorepo bootstrap, package setup, repository README standard, local development, CI.
- `SYSTEM_ARCHITECTURE.md` — system boundaries, registry architecture, runtime flows, deployment, security, selective dependency model.
- `SYSTEM_DESIGN.md` — detailed schemas/interfaces for variants, files, styles, client directives, resolver, installer, manifest, updates.
- `ROADMAP.md` — phased product and engineering roadmap.
- `REPOSITORY_READMES.md` — README requirements and templates for every MajesticUI app/package area.
- `repo-readmes/` — ready-to-use README files for the proposed monorepo directories.

## Recommended V1 Scope

V1 should include:

- React + TypeScript
- Tailwind CSS
- Framer Motion as optional per-item dependency
- npm/pnpm/yarn/Bun support
- `init`, `add`, `list`, `search`, `info`, `doctor`
- static registry
- component families + variants
- per-variant dependency declaration
- associated CSS/style/token installation
- `"use client"` handling
- dependency graph resolution and deduplication
- conflict-safe block/feature installation
- `.majestic/manifest.json`
- docs site + live previews
- README in every app/package/repository area

Do not begin with marketplace, database-backed registry, private organization management, or AI generation. First make the registry, resolver, transformer, installer, and safety model dependable.
