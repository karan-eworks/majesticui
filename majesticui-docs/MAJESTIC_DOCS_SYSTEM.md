# MajesticUI Documentation & Preview System

> Implementation specification for the MajesticUI documentation platform.
>
> This document defines how every component, block, feature, theme, or other registry item becomes a fully documented, previewable, installable entry in MajesticUI Docs.

---

# 1. Goal

MajesticUI Docs must work as the public documentation and preview layer for the MajesticUI registry.

Whenever a new registry item is added, the documentation system must automatically make that item available in the docs experience with:

- live preview
- install command
- installation instructions
- usage example
- supported frameworks
- supported package managers
- source files
- dependencies
- variants
- customization documentation
- Tailwind CSS requirements
- Framer Motion requirements
- icon requirements
- associated CSS
- `"use client"` requirement
- component API
- examples
- accessibility notes
- dependency information
- related components
- block file tree
- code preview
- registry metadata

The docs should feel similar to shadcn/ui in navigation and usability, while being driven entirely by the MajesticUI registry.

---

# 2. Core Principle

Documentation is not maintained separately from registry items.

The registry is the source of truth.

```text
Registry Item
    │
    ├── metadata
    ├── files
    ├── dependencies
    ├── variants
    ├── preview
    ├── examples
    └── documentation
            │
            ▼
        Docs Builder
            │
            ├── Component Page
            ├── Block Page
            ├── Installation Tab
            ├── Usage Tab
            ├── Customization
            ├── API Reference
            └── Search Index
```

When a component or block is published to the registry, the docs site should update automatically.

---

# 3. MajesticUI Docs Information Architecture

```text
Docs
│
├── Introduction
│
├── Installation
│   ├── Next.js
│   ├── Vite
│   ├── React
│   ├── Manual
│   └── Existing Project
│
├── Supported Frameworks
│   ├── Next.js
│   ├── React
│   └── Vite
│
├── Package Managers
│   ├── npm
│   ├── pnpm
│   ├── yarn
│   └── bun
│
├── Components
│   ├── Button
│   ├── Stateful Button
│   ├── Input
│   ├── Dialog
│   └── ...
│
├── Blocks
│   ├── Authentication
│   ├── Dashboard
│   ├── Forms
│   ├── Navigation
│   └── ...
│
├── Themes
│
├── Customization
│
├── Registry
│
└── CLI
```

---

# 4. Main Docs Layout

Recommended page shell:

```text
┌───────────────────────────────────────────────────────────────┐
│ MajesticUI                      Search              GitHub     │
├──────────────┬────────────────────────────────────────────────┤
│              │                                                │
│ Introduction │  Button                                        │
│ Installation │  Displays a button or button-like control.     │
│ Components   │                                                │
│   Button     │  [ Preview ] [ Code ]                          │
│   Input      │                                                │
│   Dialog     │  ┌──────────────────────────────────────────┐  │
│ Blocks       │  │             Live Preview                 │  │
│ Themes       │  └──────────────────────────────────────────┘  │
│ Registry     │                                                │
│              │  Installation                                  │
│              │                                                │
│              │  [pnpm] [npm] [yarn] [bun] [manual]           │
│              │                                                │
│              │  majestic add button:shadcn                    │
│              │                                                │
│              │  Usage                                         │
│              │  Variants                                      │
│              │  Customization                                 │
│              │  API Reference                                 │
│              │                                                │
└──────────────┴────────────────────────────────────────────────┘
```

The sidebar is generated from registry categories and docs configuration.

---

# 5. Component Documentation Page

Every component gets a standard generated page.

Example route:

```text
/docs/components/button
```

Required sections:

```text
Title
Description
Framework Support
Preview
Code
Installation
Usage
Variants
Examples
Customization
Dependencies
Associated CSS
Animation
Icons
API Reference
Accessibility
Related Components
```

---

# 6. Component Page Example

For:

```text
button:shadcn
```

The generated page should conceptually look like:

```text
Button
Displays a button or component styled as a button.

Supported:
Next.js
React
Vite

Preview | Code

[ Button ]

Installation

pnpm | npm | yarn | bun | manual

majestic add button:shadcn

Usage

import { Button } from "@/components/ui/button"

<Button>Continue</Button>

Variants

Default
Outline
Secondary
Ghost
Destructive

Customization

Theme
Size
Radius
Colors
Icons

Dependencies

@radix-ui/react-slot
class-variance-authority

Client Component

No

Related

Button Group
Stateful Button
```

---

# 7. Stateful Button Page

Route:

```text
/docs/components/stateful-button
```

Sections:

```text
Stateful Button

Preview
Code

Variants
├── Default
├── Spinner
└── Progress

Installation

majestic add stateful-button
majestic add stateful-button:spinner
majestic add stateful-button:progress

States

idle
loading
progress
success
error

Dependencies

xstate
@xstate/react
framer-motion
lucide-react

Registry Dependencies

button
progress

Client Component

Yes
```

---

# 8. Installation Section

Every registry item gets package-manager tabs.

The MajesticUI command itself stays the same:

```bash
majestic add button:shadcn
```

Package-manager specific documentation is mainly needed for installing/running MajesticUI globally or through package execution if supported by the project.

The installation UI should support:

```text
Majestic
Manual
```

If package-manager invocation examples are shown:

```text
npm
pnpm
yarn
bun
```

The default documented command for components remains:

```bash
majestic add <item>
```

---

# 9. Manual Installation

Every component page should support a Manual tab.

Example:

```text
1. Install dependencies.

pnpm add @radix-ui/react-slot class-variance-authority

2. Copy the component file.

components/ui/button.tsx

3. Add associated styles if required.

styles/majestic/button.css

4. Add registry dependencies.

utils
```

Manual steps are automatically generated from registry metadata.

---

# 10. Supported Frameworks

Each registry item can specify framework compatibility.

Example:

```json
{
  "frameworks": ["react", "next", "vite"]
}
```

Docs page renders:

```text
Supported Frameworks

✓ React
✓ Next.js
✓ Vite
```

A component can restrict support:

```json
{
  "frameworks": ["next"]
}
```

---

# 11. Framework Installation Guides

MajesticUI Docs should have dedicated guides:

```text
/docs/installation/next
/docs/installation/vite
/docs/installation/react
```

Each guide should cover:

```text
Requirements
Create project
Install MajesticUI
Initialize MajesticUI
Configure aliases
Configure Tailwind CSS
Install first component
Verify setup
```

Example:

```bash
majestic init
majestic add button:shadcn
```

---

# 12. Preview System

Every visual registry item should have a live preview.

The preview should render in an isolated environment.

Recommended architecture:

```text
Registry Item
     │
     ▼
Preview Entry
     │
     ▼
Preview Renderer
     │
     ├── Theme Provider
     ├── CSS
     ├── Fonts
     ├── Icons
     └── Dependencies
     │
     ▼
Isolated Preview
```

Preview should support:

```text
Light mode
Dark mode
Responsive widths
Reload
Fullscreen
Code
```

---

# 13. Preview Metadata

Example registry definition:

```json
{
  "preview": {
    "entry": "preview.tsx",
    "height": 320,
    "responsive": true,
    "themeSwitcher": true
  }
}
```

---

# 14. Preview Source

Recommended registry structure:

```text
button/
├── button.tsx
├── preview.tsx
├── examples/
│   ├── default.tsx
│   ├── outline.tsx
│   └── loading.tsx
└── registry.json
```

The `preview.tsx` file is used by the docs preview renderer.

---

# 15. Code Viewer

Every preview should support:

```text
Preview
Code
```

Code mode can display:

```text
button.tsx
preview.tsx
associated CSS
utilities
```

For blocks, it should display a file browser.

---

# 16. Block Documentation

Blocks are more complex than components.

Example:

```text
/docs/blocks/dashboard-01
```

A block page should include:

```text
Title
Description
Category
Live Preview
Code
Installation
File Tree
Dependencies
Registry Dependencies
Required Components
Customization
Framework Support
Responsive Behavior
```

---

# 17. Block Preview Layout

Recommended experience:

```text
Dashboard 01

[ Preview ] [ Code ]

┌──────────────────────────────────────────────┐
│                                              │
│             Full Block Preview               │
│                                              │
└──────────────────────────────────────────────┘

Install

majestic add block:dashboard-01

Files

app/
└── dashboard/
    └── page.tsx

components/
├── app-sidebar.tsx
├── data-table.tsx
├── chart.tsx
└── header.tsx
```

---

# 18. Block Registry Metadata

Example:

```json
{
  "name": "dashboard-01",
  "type": "block",
  "category": "dashboard",
  "title": "Dashboard 01",
  "description": "Admin dashboard with sidebar, data table and metrics.",
  "frameworks": ["next", "react"],
  "dependencies": {
    "npm": ["framer-motion", "lucide-react"],
    "registry": ["button", "card", "table"]
  },
  "preview": {
    "entry": "preview.tsx",
    "height": 800
  }
}
```

---

# 19. Automatic Documentation Requirement

Every registry item must contain enough metadata for the docs generator.

A component is not considered publishable until documentation validation succeeds.

Required documentation metadata:

```json
{
  "docs": {
    "title": "Button",
    "description": "Displays a button or button-like control.",
    "category": "forms",
    "usage": true,
    "api": true,
    "customization": true
  }
}
```

---

# 20. Registry Item Documentation Schema

Recommended full model:

```json
{
  "name": "button",
  "family": "button",
  "variant": "shadcn",
  "type": "component",
  "title": "Button",
  "description": "Displays a button or button-like control.",

  "frameworks": ["react", "next", "vite"],

  "client": false,

  "dependencies": {
    "npm": ["@radix-ui/react-slot", "class-variance-authority"],
    "registry": ["utils"]
  },

  "files": [
    {
      "source": "button.tsx",
      "target": "{{ui}}/button.tsx"
    }
  ],

  "preview": {
    "entry": "preview.tsx",
    "height": 300,
    "responsive": true
  },

  "docs": {
    "category": "buttons",
    "usage": "usage.mdx",
    "customization": "customization.mdx",
    "api": "api.json"
  }
}
```

---

# 21. Documentation Files Per Component

Recommended component folder:

```text
registry/components/button/shadcn/
├── button.tsx
├── registry.json
│
├── preview.tsx
│
├── examples/
│   ├── default.tsx
│   ├── outline.tsx
│   ├── ghost.tsx
│   └── icon.tsx
│
└── docs/
    ├── usage.mdx
    ├── customization.mdx
    └── notes.mdx
```

Not all documentation must be hand-written.

The docs builder generates:

```text
Installation
Dependencies
Files
Framework support
Client/server information
CLI commands
```

from registry metadata.

Human-authored MDX is mainly used for:

```text
Usage explanation
Customization
Special notes
Accessibility guidance
Advanced examples
```

---

# 22. Documentation Files Per Block

```text
registry/blocks/dashboard/dashboard-01/
├── registry.json
├── preview.tsx
│
├── files/
│   ├── dashboard.tsx
│   ├── sidebar.tsx
│   └── metrics.tsx
│
├── examples/
│
└── docs/
    ├── usage.mdx
    ├── customization.mdx
    └── notes.mdx
```

---

# 23. Add Component Workflow

When a developer adds a component to MajesticUI:

```text
Create component
      ↓
Create registry metadata
      ↓
Create preview
      ↓
Create examples
      ↓
Add optional docs content
      ↓
Run validation
      ↓
Generate registry JSON
      ↓
Generate docs page
      ↓
Generate search index
      ↓
Publish
```

---

# 24. Publishing Rule

A registry item should fail validation if required docs data is missing.

Example:

```text
✗ button:glass

Missing:
preview.entry
title
description
frameworks
```

Once corrected:

```text
✓ Registry validation
✓ Dependency validation
✓ Preview build
✓ Docs generation
✓ Search indexing

Ready to publish.
```

---

# 25. Docs Build Pipeline

```text
registry/
   │
   ▼
Registry Scanner
   │
   ▼
Schema Validation
   │
   ├── component metadata
   ├── dependency metadata
   ├── docs metadata
   └── preview metadata
   │
   ▼
Docs Generator
   │
   ├── routes
   ├── navigation
   ├── preview manifests
   ├── installation tabs
   ├── file trees
   └── search index
   │
   ▼
Next.js Docs Application
```

---

# 26. Generated Routes

The docs system should automatically generate routes like:

```text
/docs/components/button
/docs/components/stateful-button
/docs/components/dialog

/docs/blocks/login-01
/docs/blocks/dashboard-01

/docs/themes/enterprise
```

Do not manually register each page in navigation.

---

# 27. Component Family Routing

MajesticUI supports multiple variants.

For example:

```text
button
├── default
├── shadcn
├── glass
└── animated
```

Recommended docs route:

```text
/docs/components/button
```

Within the page:

```text
Variant selector

Default
Shadcn
Glass
Animated
```

Selecting a variant changes:

```text
preview
install command
dependencies
source
customization
```

Example:

```bash
majestic add button:glass
```

---

# 28. Separate Component Families

Stateful Button remains separate:

```text
/docs/components/stateful-button
```

Variants:

```text
Default
Spinner
Progress
```

Commands:

```bash
majestic add stateful-button
majestic add stateful-button:spinner
majestic add stateful-button:progress
```

---

# 29. Customization Documentation

Every component page should have a Customization section.

Generated subsections depend on metadata:

```text
Colors
Typography
Spacing
Radius
Size
Icons
Animations
Theme Tokens
CSS
Variants
```

Example:

```json
{
  "customization": {
    "theme": true,
    "colors": true,
    "radius": true,
    "icons": true,
    "animation": false
  }
}
```

---

# 30. CSS Documentation

When a registry item contains associated CSS:

```text
Associated Styles

styles/majestic/animated-button.css
```

Show whether the installer:

```text
copies
merges
or generates
```

the CSS.

Example:

```text
This variant adds:
- majestic-button-shimmer keyframes
- gradient utility classes

The installer automatically adds the required stylesheet.
```

---

# 31. Framer Motion Documentation

If a component requires Framer Motion:

```json
{
  "dependencies": {
    "npm": ["framer-motion"]
  }
}
```

Docs automatically display:

```text
Animation
Framer Motion

This dependency is installed automatically when this component is added.
```

If it does not use Framer Motion, do not show or install it.

---

# 32. Icon Documentation

If the selected component uses Lucide:

```text
Icons
lucide-react

Installed automatically.
```

If another variant uses Phosphor:

```text
Icons
@phosphor-icons/react
```

Only the selected variant's icon library appears.

---

# 33. `"use client"` Documentation

Registry:

```json
{
  "client": true
}
```

Docs page:

```text
Rendering

Client Component

MajesticUI automatically adds:

"use client"
```

If:

```json
{
  "client": false
}
```

show:

```text
Rendering

Server-compatible
```

---

# 34. Dependency Display

Example docs panel:

```text
Dependencies

NPM
├── framer-motion
└── lucide-react

Majestic Registry
├── button
└── progress

Styles
└── stateful-button.css
```

---

# 35. Installation Plan Preview

Optional but valuable:

```text
What will be installed?

Files
+ components/ui/stateful-button.tsx
+ lib/stateful-button-machine.ts

Packages
+ xstate
+ @xstate/react
+ framer-motion

Registry Components
+ progress

Existing
✓ button
```

This makes installation transparent.

---

# 36. File Tree Viewer

Blocks and complex components should expose their final installation tree.

Example:

```text
components/
└── ui/
    ├── button.tsx
    └── stateful-button.tsx

lib/
└── stateful-button-machine.ts
```

---

# 37. API Reference

Registry items can optionally declare prop documentation.

Example:

```json
{
  "api": {
    "props": [
      {
        "name": "variant",
        "type": "\"default\" | \"outline\" | \"ghost\"",
        "default": "\"default\"",
        "description": "Visual button variant."
      }
    ]
  }
}
```

Docs generator renders:

| Prop      | Type                                | Default     | Description            |
| --------- | ----------------------------------- | ----------- | ---------------------- |
| `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | Visual button variant. |

API extraction can later be automated from TypeScript.

---

# 38. Examples

Each example is registered independently.

```json
{
  "examples": [
    {
      "name": "Default",
      "entry": "examples/default.tsx"
    },
    {
      "name": "Outline",
      "entry": "examples/outline.tsx"
    }
  ]
}
```

Docs generator renders every example as:

```text
Example title

[Live Preview]

[View Code]
```

---

# 39. Search

When a component is published, it is automatically added to docs search.

Search index fields:

```text
title
name
family
variant
description
category
tags
dependencies
```

Example search:

```text
"loading button"
```

can return:

```text
Stateful Button
Button / Spinner
```

---

# 40. Components Index

Route:

```text
/docs/components
```

Generated from registry.

Recommended cards:

```text
Button
Stateful Button
Input
Dialog
Select
Card
...
```

Each card can show:

```text
name
description
preview thumbnail
new badge
category
```

---

# 41. Blocks Index

Route:

```text
/blocks
```

Filters:

```text
All
Authentication
Dashboard
Forms
Navigation
Marketing
CRM
SIS
ERP
```

Each block card shows:

```text
Preview
Title
Description
Install command
```

---

# 42. Preview Security

Preview files are executable React code.

Treat them as application code.

Recommended protections:

```text
build-time validation
dependency allowlist
isolated rendering boundary
no access to production secrets
no arbitrary server-side execution
```

---

# 43. Responsive Preview

Component preview controls:

```text
Desktop
Tablet
Mobile
```

For blocks:

```text
Full Width
Desktop
Tablet
Mobile
```

---

# 44. Theme Preview

Docs preview should support:

```text
Light
Dark
Majestic themes
```

Do not install all themes into consuming applications.

Themes in the docs site are preview resources.

A project receives only the theme or tokens explicitly required by the installed registry item.

---

# 45. Docs Tech Stack

Recommended:

```text
Next.js
React
TypeScript
Tailwind CSS
Framer Motion
MDX
Shiki or equivalent code highlighter
Registry-generated routes
```

---

# 46. Suggested Docs Application Structure

```text
apps/docs/
├── app/
│   ├── docs/
│   │   ├── components/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── blocks/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   └── installation/
│   │
│   └── blocks/
│
├── components/
│   └── docs/
│       ├── component-preview.tsx
│       ├── code-viewer.tsx
│       ├── install-command.tsx
│       ├── package-tabs.tsx
│       ├── variant-selector.tsx
│       ├── framework-support.tsx
│       ├── dependency-list.tsx
│       ├── file-tree.tsx
│       └── api-table.tsx
│
├── lib/
│   └── docs/
│       ├── registry-loader.ts
│       ├── docs-generator.ts
│       ├── navigation.ts
│       └── search-index.ts
│
└── content/
```

---

# 47. Registry-to-Docs Interface

Core abstraction:

```ts
interface RegistryDocsItem {
  name: string
  type: "component" | "block" | "theme" | "feature"
  title: string
  description: string

  family?: string
  variant?: string

  frameworks: string[]
  client: boolean

  preview?: PreviewConfig
  examples?: ExampleConfig[]

  dependencies: {
    npm: string[]
    registry: string[]
  }

  files: RegistryFile[]

  docs?: {
    usage?: string
    customization?: string
    notes?: string
  }
}
```

---

# 48. Add New Component Checklist

A developer adding a component must provide:

```text
[ ] registry.json
[ ] component source
[ ] title
[ ] description
[ ] category
[ ] framework support
[ ] client/server flag
[ ] dependencies
[ ] preview.tsx
[ ] at least one example
[ ] install target paths
```

Recommended:

```text
[ ] customization docs
[ ] API documentation
[ ] accessibility notes
[ ] related components
```

---

# 49. Add New Block Checklist

```text
[ ] registry.json
[ ] source files
[ ] title
[ ] description
[ ] category
[ ] preview
[ ] dependencies
[ ] registry dependencies
[ ] file targets
[ ] framework support
[ ] responsive preview
[ ] customization docs
```

---

# 50. CLI + Docs Integration

The command shown in docs must come directly from registry identity.

Example registry:

```json
{
  "name": "button",
  "variant": "shadcn"
}
```

Generated command:

```bash
majestic add button:shadcn
```

For:

```json
{
  "name": "stateful-button",
  "variant": "progress"
}
```

Generated command:

```bash
majestic add stateful-button:progress
```

For blocks:

```bash
majestic add block:dashboard-01
```

Do not manually write commands in each docs page.

---

# 51. Automated Documentation Workflow

Recommended CI/CD flow:

```text
Developer adds registry item
          │
          ▼
Registry validation
          │
          ▼
Docs metadata validation
          │
          ▼
Preview compilation
          │
          ▼
Example compilation
          │
          ▼
Generate docs route
          │
          ▼
Generate navigation
          │
          ▼
Generate search index
          │
          ▼
Build docs site
          │
          ▼
Publish registry + docs
```

---

# 52. Validation Command

Recommended MajesticUI development command:

```bash
pnpm docs:validate
```

or:

```bash
pnpm registry:validate
```

Validation should check:

```text
registry schema
missing docs metadata
preview existence
example existence
broken imports
missing dependencies
invalid target paths
unsupported framework metadata
```

---

# 53. Build Command

Recommended:

```bash
pnpm registry:build
pnpm docs:build
```

Or a combined command:

```bash
pnpm majestic:build
```

Pipeline:

```text
registry:validate
registry:build
docs:generate
docs:build
```

---

# 54. Documentation Generation Rule

MajesticUI should follow this rule:

> Every publishable visual registry item must produce a discoverable documentation page automatically.

Developers should not need to manually:

```text
create routes
edit sidebar navigation
edit component index
edit search configuration
write install commands
list dependencies
```

Those are generated from registry metadata.

---

# 55. Human-Written vs Generated Documentation

Generated automatically:

```text
title
description
install command
framework support
dependency list
file list
client/server indicator
variant selector
package requirements
style requirements
file tree
```

Human-authored:

```text
usage guidance
customization explanation
accessibility guidance
advanced notes
special migration guidance
```

This gives MajesticUI documentation consistency without making the docs feel robotic.

---

# 56. Initial MVP

Build the docs platform in this order:

## Phase 1

```text
Docs layout
Sidebar
Search shell
Component route
Preview
Code viewer
Installation
Usage
```

## Phase 2

```text
Registry-generated pages
Variant selector
Dependencies
Framework support
Associated CSS
Client/server badge
```

## Phase 3

```text
Blocks
Full-screen preview
File tree
Responsive controls
```

## Phase 4

```text
Customization docs
API tables
Examples
Related items
```

## Phase 5

```text
Automatic publishing
Search indexing
Documentation validation
```

---

# 57. Acceptance Criteria

MajesticUI Docs is ready when:

1. Adding a new registry component automatically creates a docs page.
2. Adding a new block automatically creates a block page.
3. Each visual item has a live preview.
4. Each page shows the correct Majestic install command.
5. Variants generate different commands and previews.
6. Dependencies are taken directly from registry metadata.
7. Only associated dependencies are shown.
8. Associated CSS is documented.
9. Framer Motion is shown only when required.
10. Icon packages are shown only when required.
11. `"use client"` status is visible.
12. Supported frameworks are visible.
13. Component examples can be previewed and inspected.
14. Blocks show their complete file tree.
15. Customization documentation is supported.
16. New items automatically appear in navigation and search.
17. Docs generation fails when required metadata or preview files are missing.

---

# 58. Final Target Experience

A developer visits:

```text
MajesticUI
→ Components
→ Stateful Button
```

They see:

```text
Stateful Button

Interactive button with loading, progress, success and error states.

React ✓   Next.js ✓   Vite ✓
Client Component

[Preview] [Code]

[ interactive preview ]

Variant:
Default | Spinner | Progress

Installation

majestic add stateful-button:progress

Dependencies

xstate
@xstate/react
framer-motion
lucide-react

Registry dependencies

button
progress

Usage
Examples
Customization
API Reference
```

A block provides the same experience at a larger scale:

```text
Dashboard 01

[Full Preview] [Code]

majestic add block:dashboard-01

Files
Dependencies
Required Components
Customization
Responsive Preview
```

This should be the standard documentation experience for every MajesticUI registry item.
