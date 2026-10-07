# Dialog

## Family

```text
dialog
├── default
├── shadcn
├── animated
└── fullscreen
```

## Install

```bash
majestic add dialog
majestic add dialog:shadcn
majestic add dialog:animated
majestic add dialog:fullscreen
```

## Registry layout

```text
registry/components/dialog/
├── default/
├── shadcn/
├── animated/
└── fullscreen/
```

Each variant should contain:

```text
dialog.tsx
registry.json
preview.tsx
examples/
docs/
```

## Shadcn variant

Recommended command:

```bash
majestic add dialog:shadcn
```

Example registry metadata:

```json
{
  "name": "dialog",
  "family": "dialog",
  "variant": "shadcn",
  "type": "component",
  "client": true,
  "frameworks": ["react", "next", "vite"],
  "dependencies": {
    "npm": ["@radix-ui/react-dialog", "lucide-react"],
    "registry": []
  },
  "files": [
    {
      "source": "dialog.tsx",
      "target": "{{ui}}/dialog.tsx"
    }
  ],
  "preview": {
    "entry": "preview.tsx",
    "height": 420,
    "responsive": true
  }
}
```

## Client behavior

Dialog is interactive, so the installed file should begin with:

```tsx
"use client"
```

## Preview examples

The docs page should include:

- Basic dialog
- Form dialog
- Confirmation dialog
- Animated dialog
- Fullscreen dialog
- Scrollable dialog

## Customization docs

Document:

- width
- max width
- overlay
- radius
- spacing
- close button
- animation
- content alignment
- responsive layout

## Animated variant

If the variant uses MajesticUI animation, install only:

```text
framer-motion
```

when required.

## Existing file behavior

If `dialog.tsx` already exists:

```text
! components/ui/dialog.tsx already exists

❯ Keep existing
  Show diff
  Replace
  Cancel
```

Default: `Keep existing`.
