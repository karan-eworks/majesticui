# Docs & Preview Requirements for This Component Pack

Every component in this pack must automatically produce a MajesticUI docs page.

## Generated routes

```text
/docs/components/dialog
/docs/components/alert-dialog
/docs/components/combobox
/docs/components/error
/docs/components/toaster
```

## Required page sections

Each page must contain:

```text
Title
Description
Supported Frameworks
Client/Server status
Variant selector
Live Preview
Code
Installation
Manual Installation
Usage
Examples
Customization
Dependencies
Associated Styles
API Reference
Related Components
```

## Variant selector

Example for Dialog:

```text
Default | Shadcn | Animated | Fullscreen
```

Selecting a variant changes:

```text
preview
install command
dependencies
files
styles
customization
```

## Install commands

Commands are generated from registry identity.

Examples:

```bash
majestic add dialog:shadcn
majestic add alert-dialog:destructive
majestic add combobox:multiple
majestic add error:retry
majestic add toaster:sonner
```

## Preview file

Every visual variant should have:

```text
preview.tsx
```

## Examples directory

Recommended:

```text
examples/
├── default.tsx
├── disabled.tsx
└── advanced.tsx
```

## Docs directory

Recommended:

```text
docs/
├── usage.mdx
├── customization.mdx
└── notes.mdx
```

Installation, dependencies, framework support, files, client status, and commands
must be generated automatically from `registry.json`.

## Publication validation

A visual component variant should fail publication when any required field is missing:

```text
title
description
frameworks
client
files
preview.entry
dependencies
```

## Search indexing

Each variant should be indexed by:

```text
name
family
variant
title
description
category
tags
dependencies
```
