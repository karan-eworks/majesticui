# Error UI

MajesticUI should treat errors as a component family rather than one hardcoded error component.

## Family

```text
error
├── default
├── inline
├── alert
├── form
├── page
├── boundary
└── retry
```

## Install

```bash
majestic add error
majestic add error:inline
majestic add error:alert
majestic add error:form
majestic add error:page
majestic add error:boundary
majestic add error:retry
```

## Purpose

Use the family for reusable error presentation patterns:

```text
inline     field or local message
alert      prominent error notice
form       form submission error
page       full-page error state
boundary   React/Next error boundary UI
retry      recoverable error with action
```

## Registry structure

```text
registry/components/error/
├── default/
├── inline/
├── alert/
├── form/
├── page/
├── boundary/
└── retry/
```

## Base metadata

```json
{
  "name": "error",
  "family": "error",
  "variant": "alert",
  "type": "component",
  "client": false,
  "frameworks": ["react", "next", "vite"],
  "dependencies": {
    "npm": [],
    "registry": ["alert"]
  },
  "files": [
    {
      "source": "error-alert.tsx",
      "target": "{{ui}}/error-alert.tsx"
    }
  ],
  "preview": {
    "entry": "preview.tsx",
    "height": 260
  }
}
```

## Client behavior

Do not mark all error components as client components.

Examples:

```text
error:inline   client: false
error:alert    client: false
error:page     client: false
error:retry    client: true
```

The retry variant may require event handling and therefore:

```tsx
"use client"
```

## Preview examples

- Inline validation error
- Form error
- Network error
- Permission error
- Empty/error state
- Full page error
- Retry action
- Error with support/contact action

## Customization

Document:

- severity
- title
- description
- icon
- action
- retry behavior
- layout
- compact mode
- full-page mode
