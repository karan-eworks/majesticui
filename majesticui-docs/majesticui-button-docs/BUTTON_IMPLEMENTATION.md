# MajesticUI Button Implementation Guide

## 1. Goal

MajesticUI should support multiple normal and stateful button implementations inside the registry.

A developer should be able to install only the exact button variant they want.

Examples:

```bash
majestic add button
majestic add button:shadcn
majestic add button:animated
majestic add button:glass
majestic add stateful-button
majestic add stateful-button:spinner
majestic add stateful-button:progress
```

---

## 2. Button Families

MajesticUI should maintain two primary button families.

```text
button
├── default
├── shadcn
├── animated
├── glass
├── gradient
├── icon
└── enterprise

stateful-button
├── default
├── spinner
└── progress
```

Normal buttons and stateful buttons are separate families.

---

## 3. Recommended Registry Structure

```text
registry/
└── components/
    └── buttons/
        ├── button/
        │   ├── default/
        │   │   ├── button.tsx
        │   │   └── registry.json
        │   ├── shadcn/
        │   │   ├── button.tsx
        │   │   └── registry.json
        │   ├── animated/
        │   │   ├── button.tsx
        │   │   ├── button.css
        │   │   └── registry.json
        │   └── glass/
        │       ├── button.tsx
        │       ├── button.css
        │       └── registry.json
        │
        └── stateful-button/
            ├── default/
            │   ├── stateful-button.tsx
            │   ├── stateful-button-machine.ts
            │   └── registry.json
            ├── spinner/
            │   ├── stateful-button.tsx
            │   └── registry.json
            └── progress/
                ├── stateful-button.tsx
                ├── stateful-button-machine.ts
                └── registry.json
```

---

## 4. Shadcn Button

The shadcn-derived button should be stored as a normal MajesticUI button variant.

Command:

```bash
majestic add button:shadcn
```

Example registry item:

```json
{
  "name": "button",
  "family": "button",
  "variant": "shadcn",
  "type": "component",
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
  ]
}
```

The CLI should install only the packages required by this variant.

---

## 5. Stateful Button

Stateful buttons are installed independently from normal buttons.

Command:

```bash
majestic add stateful-button
```

Variants:

```bash
majestic add stateful-button:spinner
majestic add stateful-button:progress
```

Example dependency model:

```json
{
  "name": "stateful-button",
  "family": "stateful-button",
  "variant": "default",
  "type": "component",
  "client": true,
  "dependencies": {
    "npm": ["xstate", "@xstate/react", "framer-motion", "lucide-react"],
    "registry": ["button", "progress"]
  },
  "files": [
    {
      "source": "stateful-button.tsx",
      "target": "{{ui}}/stateful-button.tsx"
    },
    {
      "source": "stateful-button-machine.ts",
      "target": "{{lib}}/stateful-button-machine.ts"
    }
  ]
}
```

---

## 6. `"use client"` Rule

Interactive buttons should support:

```tsx
"use client"
```

MajesticUI should use explicit registry metadata.

```json
{
  "client": true
}
```

When `client` is `true`, the installer must ensure `"use client"` is the first statement in the generated component.

When `client` is `false`, MajesticUI should not add it.

Stateful buttons will normally use:

```json
{
  "client": true
}
```

because they use React state, XState, animation, events, and client-side interaction.

---

## 7. Tailwind CSS

Tailwind CSS is the default styling system.

Example:

```tsx
<button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium">
  Save
</button>
```

Variants can define their own Tailwind classes.

MajesticUI should not install unrelated theme packages when only one button is requested.

---

## 8. Associated CSS

A button variant may include additional CSS.

Example structure:

```text
animated/
├── button.tsx
├── button.css
└── registry.json
```

Example registry declaration:

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

Two supported style modes are recommended:

```text
file
merge
```

`file` copies the CSS to a dedicated file.

`merge` merges CSS variables, keyframes, or utility definitions into an existing stylesheet.

---

## 9. Framer Motion

MajesticUI standardizes animation on Framer Motion.

Animated buttons should use:

```tsx
import { motion } from "framer-motion"
```

Example:

```tsx
"use client"

import { motion } from "framer-motion"

export function AnimatedButton() {
  return (
    <motion.button whileTap={{ scale: 0.96 }} className="rounded-md px-4 py-2">
      Save
    </motion.button>
  )
}
```

Only variants that require animation should install Framer Motion.

---

## 10. Icon Libraries

Different button variants may use different icon packages.

Examples:

```text
lucide-react
@phosphor-icons/react
@tabler/icons-react
react-icons
```

MajesticUI must install only the icon library needed by the selected button.

Example:

```json
{
  "dependencies": {
    "npm": ["lucide-react"]
  }
}
```

Installing that button must not install Phosphor, Tabler, or React Icons.

---

## 11. Selective Dependency Installation

This is a core rule.

Installing:

```bash
majestic add button:shadcn
```

must install only dependencies required by `button:shadcn`.

Installing:

```bash
majestic add stateful-button:progress
```

must install only dependencies required by the progress stateful button and its transitive registry dependencies.

MajesticUI must not install the entire UI, icon, theme, or animation library set.

---

## 12. Existing Button Detection

If a user already has:

```text
src/components/ui/button.tsx
```

and installs a block or stateful button that depends on `button`, MajesticUI should detect the existing file before writing.

The installer should classify the file as:

```text
missing
installed and unchanged
installed and modified
variant conflict
unknown existing file
```

---

## 13. Conflict Prompt

If the existing button has local changes:

```text
button.tsx already exists and has local modifications.

What do you want to do?

❯ Keep existing
  Show diff
  Replace
  Cancel
```

Default action:

```text
Keep existing
```

MajesticUI should never silently overwrite a locally modified button.

---

## 14. Stateful Button Depending on Existing Button

Example:

```bash
majestic add stateful-button:progress
```

If a compatible normal button is already installed:

```text
✓ button already installed
+ progress will be installed
+ stateful-button will be installed
```

MajesticUI should reuse the button.

If an incompatible button variant exists:

```text
Existing button variant:
button:glass

Required contract:
majestic.button.v1
```

The CLI should ask whether to reuse, replace, or cancel.

---

## 15. Component Contract

Normal button variants should expose a common contract.

Example:

```json
{
  "contract": "majestic.button.v1"
}
```

A compatible button variant should support the expected API, such as:

```text
className
children
disabled
onClick
size
variant
```

Stateful buttons can depend on the contract instead of a specific visual implementation.

This allows:

```text
button:shadcn
button:glass
button:animated
button:enterprise
```

to work with the same higher-level component when they satisfy the contract.

---

## 16. Installation Manifest

MajesticUI should track installed button variants in:

```text
.majestic/manifest.json
```

Example:

```json
{
  "installed": {
    "button": {
      "family": "button",
      "variant": "shadcn",
      "version": "1.0.0",
      "files": [
        {
          "path": "src/components/ui/button.tsx",
          "checksum": "sha256:..."
        }
      ]
    }
  }
}
```

The checksum helps MajesticUI detect local modifications.

---

## 17. Recommended Implementation Order

Implement button support in this order:

1. `button:shadcn`
2. default `button`
3. `stateful-button`
4. `stateful-button:spinner`
5. `stateful-button:progress`
6. associated CSS support
7. Framer Motion handling
8. icon dependency resolution
9. manifest tracking
10. conflict prompts
11. button contracts
12. additional normal button variants

This gives MajesticUI a stable button foundation before adding more complex component families.
