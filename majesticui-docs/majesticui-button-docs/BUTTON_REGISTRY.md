# MajesticUI Button Registry Specification

## Purpose

This document defines the registry format for normal buttons and stateful buttons only.

## Normal Button Example

```json
{
  "name": "button",
  "family": "button",
  "variant": "shadcn",
  "type": "component",
  "version": "1.0.0",
  "contract": "majestic.button.v1",
  "client": false,
  "dependencies": {
    "npm": ["@radix-ui/react-slot", "class-variance-authority"],
    "registry": ["utils"]
  },
  "styles": [],
  "files": [
    {
      "source": "button.tsx",
      "target": "{{ui}}/button.tsx",
      "type": "component"
    }
  ]
}
```

## Animated Button Example

```json
{
  "name": "button",
  "family": "button",
  "variant": "animated",
  "type": "component",
  "version": "1.0.0",
  "contract": "majestic.button.v1",
  "client": true,
  "dependencies": {
    "npm": ["framer-motion"],
    "registry": []
  },
  "styles": [
    {
      "source": "button.css",
      "target": "{{styles}}/majestic/button.css",
      "mode": "file"
    }
  ],
  "files": [
    {
      "source": "button.tsx",
      "target": "{{ui}}/button.tsx",
      "type": "component"
    }
  ]
}
```

## Stateful Button Example

```json
{
  "name": "stateful-button",
  "family": "stateful-button",
  "variant": "progress",
  "type": "component",
  "version": "1.0.0",
  "client": true,
  "dependencies": {
    "npm": ["xstate", "@xstate/react", "framer-motion", "lucide-react"],
    "registry": ["button", "progress"]
  },
  "files": [
    {
      "source": "stateful-button.tsx",
      "target": "{{ui}}/stateful-button.tsx",
      "type": "component"
    },
    {
      "source": "stateful-button-machine.ts",
      "target": "{{lib}}/stateful-button-machine.ts",
      "type": "utility"
    }
  ]
}
```

## Required Fields

Recommended fields:

```text
name
family
variant
type
version
client
dependencies
files
```

Optional fields:

```text
contract
styles
themeDependencies
description
tags
```

## Client Directive

If:

```json
{
  "client": true
}
```

the installer must ensure:

```tsx
"use client"
```

is present at the beginning of the installed file.

## Style Dependencies

Supported style mode examples:

```json
{
  "styles": [
    {
      "source": "button.css",
      "target": "{{styles}}/majestic/button.css",
      "mode": "file"
    }
  ]
}
```

or:

```json
{
  "styles": [
    {
      "source": "tokens.css",
      "target": "{{styles}}/globals.css",
      "mode": "merge"
    }
  ]
}
```

## Selective Dependencies

Every variant must declare only what it actually requires.

For example, `button:shadcn` should not inherit dependencies from `button:animated`.

Dependencies are resolved per selected variant and transitively through its registry dependencies.
