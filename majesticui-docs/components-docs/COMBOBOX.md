# Combobox

## Family

```text
combobox
├── default
├── shadcn
├── searchable
├── multiple
├── async
└── creatable
```

## Install

```bash
majestic add combobox
majestic add combobox:shadcn
majestic add combobox:searchable
majestic add combobox:multiple
majestic add combobox:async
majestic add combobox:creatable
```

## Registry layout

```text
registry/components/combobox/
├── default/
├── shadcn/
├── searchable/
├── multiple/
├── async/
└── creatable/
```

## Shadcn variant

```bash
majestic add combobox:shadcn
```

Example metadata:

```json
{
  "name": "combobox",
  "family": "combobox",
  "variant": "shadcn",
  "type": "component",
  "client": true,
  "frameworks": ["react", "next", "vite"],
  "dependencies": {
    "npm": [],
    "registry": []
  },
  "files": [
    {
      "source": "combobox.tsx",
      "target": "{{ui}}/combobox.tsx"
    }
  ],
  "preview": {
    "entry": "preview.tsx",
    "height": 380,
    "responsive": true
  }
}
```

The exact npm dependencies should be declared by the actual selected implementation
when it is ingested into MajesticUI.

## Client behavior

Combobox is interactive:

```tsx
"use client"
```

## Preview examples

- Basic selection
- Searchable
- Empty state
- Disabled
- Multiple selection
- Async data
- Creatable option
- Form integration

## Customization

Document:

- trigger width
- dropdown width
- item height
- selected icon
- empty state
- search field
- keyboard behavior
- multi-select chips
- loading state

## Selective dependencies

An async combobox may need a data-fetching package while the default combobox does not.
Dependencies must remain variant-specific.
