# MajesticUI Automatic Documentation Generation

## Goal

Every publishable registry item should automatically participate in MajesticUI Docs.

---

## Component Publish Flow

```text
Add component source
        ↓
Add registry.json
        ↓
Add preview.tsx
        ↓
Add examples
        ↓
Add optional MDX docs
        ↓
Validate
        ↓
Build registry
        ↓
Generate route params
        ↓
Generate sidebar
        ↓
Generate search index
        ↓
Build preview
        ↓
Deploy docs
```

---

## Block Publish Flow

```text
Add block source
        ↓
Add block metadata
        ↓
Add preview
        ↓
Validate
        ↓
Build block index
        ↓
Generate category page
        ↓
Generate individual route
        ↓
Generate standalone preview
        ↓
Update search
```

---

## Required Registry Metadata

For visual items:

```text
name
type
title
description
category
frameworks
client
dependencies
files
preview
```

Recommended:

```text
examples
docs
tags
api
related
```

---

## Documentation Metadata Example

```json
{
  "docs": {
    "usage": "docs/usage.mdx",
    "customization": "docs/customization.mdx",
    "notes": "docs/notes.mdx"
  }
}
```

---

## Generated Automatically

```text
install command
manual installation
dependency list
framework badges
client/server badge
file list
variant selector
sidebar item
search entry
preview route
```

---

## Human-Written

```text
usage guidance
customization explanation
accessibility guidance
advanced examples
migration notes
```

---

## Validation

Recommended command:

```bash
pnpm registry:validate
```

Check:

```text
schema validity
missing preview
missing description
broken imports
missing dependency declaration
invalid target path
invalid docs files
unsupported framework metadata
```

---

## Build Pipeline

```bash
pnpm registry:validate
pnpm registry:build
pnpm docs:generate
pnpm docs:build
```

Combined:

```bash
pnpm majestic:build
```

---

## Acceptance Rule

A new component is fully published only when:

```text
registry entry exists
preview compiles
docs route builds
search entry exists
navigation entry exists
install command is generated
```
