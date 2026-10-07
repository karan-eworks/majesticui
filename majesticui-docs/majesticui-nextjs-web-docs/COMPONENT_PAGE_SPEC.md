# MajesticUI Component Page Specification

## Route

```text
/docs/components/base/[slug]
```

## Required Sections

Every component page must render:

```text
Title
Description
Framework Support
Client/Server status
Variant selector
Preview
Code
Installation
Manual Installation
Usage
Examples
Customization
Dependencies
Associated CSS
Animations
Icons
API Reference
Accessibility
Related Components
```

---

## Header

Example:

```text
Button

Displays a button or button-like control.

React ✓
Next.js ✓
Vite ✓
Server-compatible
```

---

## Variant Selector

Example:

```text
Default
Shadcn
Animated
Glass
```

Variant selection changes:

```text
preview
install command
code
dependencies
CSS
animation requirements
icon dependencies
customization docs
```

---

## Preview Tabs

```text
[ Preview ] [ Code ]
```

Preview:

```text
live rendered component
```

Code:

```text
component source
preview source
related CSS
```

---

## Installation

```text
Installation

[ Command ] [ Manual ]
```

Example:

```bash
majestic add button:shadcn
```

---

## Manual Installation

Generated from registry metadata.

Example:

```text
1. Install dependencies.
2. Install registry dependencies.
3. Copy files.
4. Copy or merge CSS.
5. Apply theme tokens.
6. Add root setup if needed.
```

---

## Usage

Example:

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button>Continue</Button>
}
```

---

## Dependencies

Display only selected variant dependencies.

Example:

```text
NPM
@radix-ui/react-slot
class-variance-authority

Registry
utils
```

---

## Associated CSS

If the component includes CSS, show:

```text
styles/majestic/button.css
```

and whether it is:

```text
copied
merged
package-provided
```

---

## Animation

If required:

```text
Framer Motion
Installed automatically.
```

Otherwise do not show it as a requirement.

---

## Icons

Only show icon libraries used by the selected variant.

Example:

```text
lucide-react
```

---

## Client Status

If registry says:

```json
{
  "client": true
}
```

show:

```text
Client Component
"use client" is added automatically.
```

Otherwise:

```text
Server-compatible
```

---

## Examples

Each example renders:

```text
Example Title
Live Preview
View Code
```

---

## Customization

Possible sections:

```text
Colors
Size
Radius
Typography
Icons
Animations
Spacing
Theme Tokens
CSS
```

---

## API Reference

Recommended table:

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |

This may later be generated from TypeScript types.

---

## Current MajesticUI Component Pages

```text
Button
Stateful Button
Dialog
Alert Dialog
Combobox
Error
Toaster
```
