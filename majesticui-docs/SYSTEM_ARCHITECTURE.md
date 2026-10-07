# MajesticUI — System Architecture

## 1. Architecture Goal

MajesticUI is a source-distribution platform that delivers validated, dependency-aware, variant-aware, project-compatible UI source into a consuming application.

The architecture separates five responsibilities:

```text
REGISTRY
What exists, including variants and assets?

RESOLVER
What does this exact selection require?

PLANNER
What will be added, reused, merged, skipped, or conflicted?

TRANSFORMER
How should source fit this project?

INSTALLER
How should the changes be applied safely?
```

## 2. High-Level Architecture

```text
                              Developer
                                 |
                    npm / pnpm / yarn / bun
                                 |
                                 v
                           Majestic CLI
                                 |
          +----------------------+----------------------+
          |                      |                      |
          v                      v                      v
   Project Detector        Config Loader        Registry Client
          |                      |                      |
          +----------------------+----------------------+
                                 |
                                 v
                       Selection Normalizer
                  (family / variant / namespace)
                                 |
                                 v
                       Dependency Resolver
                                 |
                                 v
                       Installation Planner
                                 |
                +----------------+----------------+
                |                |                |
                v                v                v
         Package Adapter    Transformer Chain   File/Style Installer
                |                |                |
                +----------------+----------------+
                                 |
                                 v
                       Validate / Format / Hash
                                 |
                                 v
                        Consumer Application
                                 |
                                 v
                    .majestic/manifest.json
```

## 3. System Boundaries

MajesticUI is composed of:

1. **CLI** — developer interface and orchestration.
2. **Registry** — metadata, source, variants, styles, assets, dependencies.
3. **Resolver/Planner** — dependency graph, dedupe, compatibility, conflict plan.
4. **Docs/Preview** — discovery, previews, examples, install commands.
5. **Registry Studio** — future authoring/publishing UI.
6. **Registry API/Gateway** — future managed/private registry infrastructure.

V1 requires CLI + static registry + docs/preview.

## 4. Architectural Principles

### 4.1 Source ownership

MajesticUI copies source into the consuming project. It does not require applications to render everything through a monolithic runtime package.

### 4.2 Dependency-by-selection

A registry can contain thousands of items backed by many libraries, but an install operation must include only the transitive dependency closure of the selected item/variant.

Example:

```text
Registry contains:
- lucide-react
- @phosphor-icons/react
- @tabler/icons-react
- framer-motion
- Radix UI
- Base UI
- 20 themes

User installs:
button:animated

Installed:
- button.tsx
- required utilities
- framer-motion

Not installed:
- unrelated icon packages
- unrelated UI foundations
- unrelated themes
```

### 4.3 Variant families

A component is a family. A concrete variant is an installable selection.

```text
button
├── default
├── outline
├── glass
├── gradient
├── animated
├── lucide
└── phosphor
```

Different variants may have different files, npm dependencies, styles, assets, client requirements, and theme tokens.

### 4.4 Safe file ownership

Existing files are classified before any write:

```text
missing
installed-unchanged
installed-locally-modified
untracked-existing
variant-conflict
style-merge-conflict
```

Locally modified files are never silently replaced.

## 5. CLI Responsibilities

The CLI must:

- detect React/Next/Vite/TypeScript/Tailwind
- detect package manager and monorepo root
- load `majestic.json`
- parse item references and variants
- fetch registry metadata
- resolve npm/registry/style/theme/asset dependencies
- deduplicate transitive dependencies
- detect compatibility issues
- generate a deterministic installation plan
- detect existing files and manifest state
- prompt before destructive replacement
- batch-install only missing npm dependencies
- transform imports/paths/directives
- ensure `"use client"` where required
- copy or merge styles/assets/tokens
- format and validate output
- update `.majestic/manifest.json`

The CLI must never contain hard-coded item-specific behavior.

## 6. Registry Item Taxonomy

```text
primitive
component
composite
block
feature
page
layout
template
theme
hook
utility
provider
adapter
asset
config
```

A registry item may also be a **family** with variants.

## 7. Registry Artifact Model

Each concrete selection can declare:

```text
metadata
source files
npm dependencies
dev dependencies
registry dependencies
style dependencies
theme/token dependencies
asset dependencies
icon dependencies
compatibility rules
client/server requirement
Tailwind requirements
Framer Motion requirement
options
integrity hashes
provenance/license metadata
```

## 8. Multi-Source UI Aggregation

MajesticUI may curate components adapted from multiple sources, subject to their licenses and attribution requirements.

The registry should store provenance metadata such as:

```json
{
  "provenance": {
    "origin": "shadcn",
    "adapted": true,
    "license": "MIT"
  }
}
```

Registry authors can also publish fully original components.

## 9. Selective Dependency Architecture

Dependencies are typed rather than flattened into one list.

```text
Registry Selection
       |
       v
Dependency Resolver
       |
       +--> npm packages
       +--> registry items
       +--> styles/keyframes
       +--> theme tokens
       +--> assets/fonts
       +--> icon libraries
       +--> configuration patches
```

The final plan is deduplicated before installation.

Example block:

```text
dashboard
├── metric-card -> lucide-react
├── animated-chart -> framer-motion + chart
├── dropdown -> @radix-ui/react-dropdown-menu
└── theme token -> dashboard-chart-tokens
```

Final npm operation:

```bash
pnpm add lucide-react framer-motion @radix-ui/react-dropdown-menu <chart-package>
```

One batch operation, not one installation per component.

## 10. Package Manager Architecture

MajesticUI exposes a common adapter:

```text
PackageManagerAdapter
├── NpmAdapter
├── PnpmAdapter
├── YarnAdapter
└── BunAdapter
```

Detection precedence:

1. explicit CLI flag
2. `majestic.json`
3. `package.json#packageManager`
4. nearest lockfile/workspace root
5. fallback prompt/default

## 11. Core Add Runtime Flow

```text
majestic add block:login
        |
        v
Load config + detect project
        |
        v
Normalize selection
        |
        v
Fetch registry item/family/variant
        |
        v
Resolve transitive dependencies
        |
        v
Deduplicate npm/styles/themes/assets/items
        |
        v
Evaluate compatibility
        |
        v
Inspect manifest + physical files
        |
        v
Classify each file/resource
        |
        v
Build installation plan
        |
        +--> unchanged existing -> reuse
        +--> missing -> add
        +--> modified -> prompt
        +--> variant conflict -> prompt
        +--> mergeable style -> merge plan
        |
        v
Confirm plan unless non-interactive policy supplied
        |
        v
Install missing npm dependencies in one batch
        |
        v
Fetch source/style/assets
        |
        v
Run transformer pipeline
        |
        v
Apply "use client" directive policy
        |
        v
Write/copy/merge
        |
        v
Format + validate + checksum
        |
        v
Update manifest
```

## 12. Existing Component and Block Safety

Example:

```text
Existing project:
components/ui/button.tsx  (locally modified)

Install:
majestic add block:login

Block dependencies:
button, input, label, card
```

Result:

```text
✓ input          already installed and unchanged -> reuse
! button         local changes detected          -> prompt
+ label          missing                         -> install
+ card           missing                         -> install
```

Prompt:

```text
button.tsx has local modifications.

> Keep existing (default)
  Show diff
  Replace with registry version
  Replace all conflicts
  Cancel installation
```

## 13. Style Architecture

Tailwind CSS is primary. Additional CSS is supported only where required.

A component may include:

```text
Tailwind classes
CSS variables
component CSS
CSS Modules
global utilities
keyframes
pseudo-element effects
browser-specific rules
theme token patches
```

Style application modes:

```text
copy  -> create dedicated stylesheet
merge -> merge variables/keyframes/utilities into configured stylesheet
inline -> source already carries Tailwind/inline class usage
```

Style writes use the same conflict and checksum policy as code files.

## 14. Theme Architecture

Themes are installable registry items. Installing one theme does not install every theme in the registry.

```text
Foundation tokens
     |
     v
Primitive color/spacing/motion tokens
     |
     v
Semantic tokens
     |
     v
Component tokens
```

Components should consume semantic tokens where possible so theme replacement does not require source rewrites.

## 15. Icon Architecture

MajesticUI supports any icon library per item/variant.

Examples:

```text
lucide-react
@phosphor-icons/react
@tabler/icons-react
react-icons
hugeicons-react
custom SVG assets
```

An item declares only the package it needs. There is no global requirement that all registry items share one icon library.

A project-level preferred icon library may be configured, but concrete variants can explicitly override it.

## 16. Client Component Architecture

Registry files can declare:

```text
client: true
client: false
client: auto   (future)
```

V1 should use explicit `true|false` metadata.

For `client: true`, the transformer guarantees:

```tsx
"use client"
```

is the first module directive and is not duplicated.

Common reasons:

- React state/effect hooks
- event-driven interactive components
- Framer Motion
- browser APIs
- client-only libraries
- interactive UI primitives

A block/feature can mix server-compatible and client components file-by-file.

## 17. Transformer Pipeline

Recommended order:

```text
Source normalization
        |
        v
Client directive transformer
        |
        v
Canonical import transformer
        |
        v
Alias/path transformer
        |
        v
Framework transformer
        |
        v
Theme/token transformer
        |
        v
Variant option transformer
        |
        v
Formatter
```

Each transformer should be idempotent.

## 18. Multi-Registry Architecture

Example `majestic.json`:

```json
{
  "registry": {
    "default": "@majestic",
    "sources": {
      "@majestic": "https://ui.majestic.dev/r",
      "@crm": "https://crm.example.com/r",
      "@sis": "https://sis.example.com/r"
    }
  }
}
```

Usage:

```bash
majestic add @majestic/button:animated
majestic add @crm/lead-pipeline
majestic add @sis/student-profile
```

Cross-registry dependencies are permitted when policy allows them.

## 19. V1 Registry Delivery

```text
Git source
  -> validate
  -> build registry JSON
  -> calculate integrity/checksums
  -> static hosting/CDN
  -> CLI
```

No database is needed in V1.

## 20. Future Managed Registry

```text
CLI / Docs / Studio
        |
        v
Registry Gateway
        |
        +--> Auth/RBAC
        +--> Registry API
        +--> Metadata DB
        +--> Object storage
        +--> Cache/CDN
        +--> Audit logs
```

The static and managed systems must share the same public registry contract.

## 21. Security

MajesticUI registry artifacts are code supply-chain inputs. Required controls include:

- schema validation
- integrity hashes
- provenance/license metadata
- package allow/deny policy
- dependency scanning
- malicious script prevention
- secret scanning
- authenticated private registries
- RBAC for publishing
- immutable published versions where possible
- audit trails
- HTTPS only
- no arbitrary post-install scripts from registry items by default

## 22. Repository Documentation Architecture

Every app/package/repository area must contain its own `README.md` covering:

```text
purpose
scope
ownership
public API/responsibilities
folder structure
local commands
dependencies
integration points
testing
release/deployment
contribution rules
```

The root README provides product orientation; local READMEs provide implementation context.
