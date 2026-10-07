# MajesticUI Blocks Web Specification

## Blocks Root

Route:

```text
/blocks
```

Purpose:

Browse larger pre-built UI sections and application patterns.

Categories:

```text
Dashboard
Login
Signup
Table
Forms
Navigation
CRM
SIS
ERP
```

---

## Category Routes

```text
/blocks/dashboard
/blocks/login
/blocks/signup
/blocks/table
```

Each category page displays a gallery of blocks.

---

## Block Card

Each block card should show:

```text
Preview
Code
Title
Description
Open in New Tab
Refresh
Install Command
```

Example:

```bash
majestic add block:dashboard-01
```

---

## Individual Block Route

Recommended:

```text
/blocks/[category]/[slug]
```

Example:

```text
/blocks/dashboard/dashboard-01
```

---

## Required Individual Block Sections

```text
Title
Description
Framework Support
Preview
Code
Responsive Preview
Installation
Dependencies
Required Components
Associated CSS
File Tree
Customization
```

---

## Preview Controls

```text
Desktop
Tablet
Mobile
Full Width
Refresh
Open in New Tab
Code
```

---

## File Tree

Example:

```text
app/
└── dashboard/
    └── page.tsx

components/
├── app-sidebar.tsx
├── data-table.tsx
├── section-cards.tsx
└── site-header.tsx
```

Every file should be clickable in code view.

---

## Standalone Preview Route

Example:

```text
/preview/blocks/dashboard-01
```

This route should render the block without docs chrome.

---

## Registry Metadata

Example:

```json
{
  "name": "dashboard-01",
  "type": "block",
  "category": "dashboard",
  "title": "Dashboard 01",
  "description": "Dashboard with sidebar, metrics and table.",
  "frameworks": ["next", "react"],
  "dependencies": {
    "npm": ["lucide-react"],
    "registry": ["button", "card", "table"]
  },
  "preview": {
    "entry": "preview.tsx",
    "route": "/preview/blocks/dashboard-01"
  }
}
```

---

## Publishing Behavior

Adding a block should automatically make it appear in:

```text
/blocks
/blocks/[category]
/blocks/[category]/[slug]
/preview/blocks/[slug]
search
```
