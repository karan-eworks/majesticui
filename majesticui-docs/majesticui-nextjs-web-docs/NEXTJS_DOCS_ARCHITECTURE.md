# MajesticUI Next.js Docs Architecture

## 1. Purpose

MajesticUI Docs should provide an experience similar to modern component registries such as shadcn/ui.

Every component or block should expose:

```text
Title
Description
Preview
Code
Installation
Manual Installation
Usage
Variants
Examples
Customization
Dependencies
Associated CSS
Animation Requirements
Icon Requirements
Client/Server Status
Supported Frameworks
API Reference
Related Items
```

The registry is the source of truth.

---

## 2. Architecture

```text
MajesticUI Registry
        │
        ▼
Registry Loader
        │
        ├── Components
        ├── Blocks
        ├── Themes
        ├── Examples
        ├── Docs Metadata
        └── Preview Metadata
        │
        ▼
Docs Generator
        │
        ├── Navigation
        ├── Search Index
        ├── Static Params
        ├── Installation Data
        └── Preview Manifests
        │
        ▼
Next.js App Router
        │
        ├── Docs
        ├── Components
        ├── Blocks
        ├── Themes
        ├── CLI
        ├── Typeset
        └── Registry
```

---

## 3. Recommended Repository Layout

```text
apps/
└── docs/
    ├── app/
    ├── components/
    │   └── docs/
    ├── lib/
    │   ├── docs/
    │   └── registry/
    ├── content/
    ├── public/
    └── styles/

packages/
├── registry-core/
├── registry-schema/
├── docs-generator/
├── preview-runtime/
└── cli/

registry/
├── components/
├── blocks/
├── themes/
└── docs/
```

---

## 4. Next.js App Router Structure

```text
apps/docs/app/
├── page.tsx
│
├── docs/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── components/
│   │   ├── page.tsx
│   │   └── base/
│   │       └── [slug]/
│   │           └── page.tsx
│   │
│   ├── installation/
│   │   ├── page.tsx
│   │   └── [framework]/
│   │       └── page.tsx
│   │
│   ├── theming/
│   │   └── page.tsx
│   │
│   ├── cli/
│   │   └── page.tsx
│   │
│   ├── typeset/
│   │   └── page.tsx
│   │
│   ├── skills/
│   │   └── page.tsx
│   │
│   └── registry/
│       └── page.tsx
│
├── blocks/
│   ├── layout.tsx
│   ├── page.tsx
│   └── [category]/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
│
└── preview/
    ├── components/
    │   └── [slug]/
    │       └── page.tsx
    │
    └── blocks/
        └── [slug]/
            └── page.tsx
```

---

## 5. Dynamic Component Route

Use one dynamic route:

```text
/docs/components/base/[slug]
```

Example:

```tsx
import { notFound } from "next/navigation"
import { getComponentDocs, getComponentSlugs } from "@/lib/registry"

export async function generateStaticParams() {
  const slugs = await getComponentSlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getComponentDocs(slug)

  if (!item) {
    notFound()
  }

  return <ComponentDocsPage item={item} />
}
```

This route handles every component.

---

## 6. Dynamic Block Route

```text
/blocks/[category]/[slug]
```

Example:

```tsx
export async function generateStaticParams() {
  return getAllBlockRoutes()
}
```

One route handles all blocks.

---

## 7. Static Generation

MajesticUI should statically generate known documentation routes from the registry.

Benefits:

```text
Fast pages
SEO
Predictable builds
Build-time validation
Broken registry entries fail CI
```

---

## 8. Docs Layout

Recommended desktop layout:

```text
┌───────────────────────────────────────────────────────────────┐
│ Header                                                        │
├───────────────┬───────────────────────────────┬───────────────┤
│ Left Sidebar  │ Main Documentation            │ On This Page  │
│               │                               │               │
│ Introduction  │ Title                         │ Installation  │
│ Components    │ Description                   │ Usage         │
│ Blocks        │ Preview                       │ Examples      │
│ Themes        │ Installation                  │ API           │
│ CLI           │ Usage                         │               │
│ Registry      │ Examples                      │               │
│               │ Customization                 │               │
└───────────────┴───────────────────────────────┴───────────────┘
```

Mobile layout should collapse the sidebar and TOC.

---

## 9. Core Docs Components

Recommended shared components:

```text
DocsHeader
DocsSidebar
DocsSearch
DocsBreadcrumb
DocsTOC
ComponentPreview
BlockPreview
CodeViewer
FileTree
InstallCommand
InstallTabs
ManualInstall
VariantSelector
FrameworkBadges
DependencyList
ClientBadge
ThemeSwitcher
ViewportSwitcher
ExamplePreview
APIReference
RelatedItems
```

---

## 10. Preview Architecture

```text
Registry Preview
      │
      ▼
Preview Loader
      │
      ├── TSX
      ├── CSS
      ├── theme tokens
      ├── icons
      └── animation dependencies
      │
      ▼
Standalone Next.js Preview Route
```

Component preview route:

```text
/preview/components/[slug]
```

Block preview route:

```text
/preview/blocks/[slug]
```

Preview controls:

```text
Light
Dark
Desktop
Tablet
Mobile
Refresh
Open in New Tab
View Code
```

---

## 11. Component Preview

Each component registry item should include:

```text
preview.tsx
```

Example:

```text
registry/components/button/shadcn/
├── button.tsx
├── registry.json
├── preview.tsx
├── examples/
└── docs/
```

---

## 12. Block Preview

Blocks should render full-page or large previews.

Example:

```text
registry/blocks/dashboard/dashboard-01/
├── registry.json
├── preview.tsx
├── files/
├── examples/
└── docs/
```

---

## 13. Search Architecture

Search index fields:

```text
name
title
family
variant
description
category
tags
dependencies
docs headings
CLI command
```

Search should return:

```text
Components
Blocks
Themes
Docs
CLI
```

---

## 14. Sidebar Generation

Sidebar must be generated from registry metadata.

Flow:

```text
Registry
  ↓
Group by category
  ↓
Sort
  ↓
Create navigation model
  ↓
Render sidebar
```

Do not manually add every component to the sidebar.

---

## 15. Required Docs Pages

MajesticUI Docs should include:

```text
/docs
/docs/components
/docs/installation
/docs/theming
/docs/cli
/docs/typeset
/docs/skills
/docs/registry
```

Optional later:

```text
/docs/changelog
/docs/dark-mode
/docs/monorepo
/docs/accessibility
```

---

## 16. Current Initial Components

```text
Button
Stateful Button
Dialog
Alert Dialog
Combobox
Error
Toaster
```

Expected routes:

```text
/docs/components/base/button
/docs/components/base/stateful-button
/docs/components/base/dialog
/docs/components/base/alert-dialog
/docs/components/base/combobox
/docs/components/base/error
/docs/components/base/toaster
```

---

## 17. Current Initial Blocks

Recommended:

```text
dashboard
login
signup
table
```

Routes:

```text
/blocks/dashboard
/blocks/login
/blocks/signup
/blocks/table
```

Individual routes:

```text
/blocks/dashboard/dashboard-01
/blocks/login/login-01
/blocks/signup/signup-01
/blocks/table/table-01
```

---

## 18. Final Rule

MajesticUI Docs must be registry-driven.

Adding a component should not require:

```text
creating a new route
editing sidebar manually
editing search manually
adding install command manually
listing dependencies manually
```

Those must be generated from registry data.
