# Alert Dialog

## Family

```text
alert-dialog
├── default
├── shadcn
├── destructive
├── media
└── compact
```

## Install

```bash
majestic add alert-dialog
majestic add alert-dialog:shadcn
majestic add alert-dialog:destructive
majestic add alert-dialog:media
majestic add alert-dialog:compact
```

## Registry layout

```text
registry/components/alert-dialog/
├── default/
├── shadcn/
├── destructive/
├── media/
└── compact/
```

## Shadcn variant

```bash
majestic add alert-dialog:shadcn
```

Example metadata:

```json
{
  "name": "alert-dialog",
  "family": "alert-dialog",
  "variant": "shadcn",
  "type": "component",
  "client": true,
  "frameworks": ["react", "next", "vite"],
  "dependencies": {
    "npm": ["@radix-ui/react-alert-dialog"],
    "registry": ["button"]
  },
  "files": [
    {
      "source": "alert-dialog.tsx",
      "target": "{{ui}}/alert-dialog.tsx"
    }
  ],
  "preview": {
    "entry": "preview.tsx",
    "height": 420
  }
}
```

## Composition contract

Recommended API:

```text
AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction
```

## Preview examples

- Basic
- Destructive
- Small/compact
- With media/icon
- Async confirmation
- Delete confirmation

## Dependency reuse

If the project already has a compatible Majestic button:

```text
✓ button already installed
+ alert-dialog
```

Do not overwrite the existing button unless the user explicitly chooses to.

## Client rule

```tsx
"use client"
```

should be ensured by the installer.
