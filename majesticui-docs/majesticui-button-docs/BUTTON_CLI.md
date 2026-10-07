# MajesticUI Button CLI Behavior

## Normal Buttons

```bash
majestic add button
majestic add button:shadcn
majestic add button:animated
majestic add button:glass
```

## Stateful Buttons

```bash
majestic add stateful-button
majestic add stateful-button:spinner
majestic add stateful-button:progress
```

## Default Variant

```bash
majestic add button
```

installs the configured default normal button variant.

```bash
majestic add stateful-button
```

installs the configured default stateful button variant.

## Existing File Behavior

When a target file does not exist:

```text
+ button.tsx will be installed
```

When it exists and matches the tracked registry version:

```text
✓ button already installed
```

When it exists and has local modifications:

```text
! button.tsx has local modifications

Choose an action:

❯ Keep existing
  Show diff
  Replace
  Cancel
```

The default must be `Keep existing`.

## Dependency Summary

Example:

```text
Installing stateful-button:progress

Registry dependencies
✓ button already installed
+ progress

Package dependencies
✓ lucide-react already installed
+ xstate
+ @xstate/react
+ framer-motion

Files
+ stateful-button.tsx
+ stateful-button-machine.ts
```

## Selective Installation Rule

The CLI must install only dependencies needed by the selected button variant.

For example:

```bash
majestic add button:shadcn
```

must not install:

```text
framer-motion
xstate
@xstate/react
other icon libraries
unrelated themes
unrelated UI libraries
```

unless the selected registry item explicitly requires them.

## Client Handling

For a registry item with:

```json
{
  "client": true
}
```

the CLI ensures:

```tsx
"use client"
```

exists at the top of the installed component.

## Recommended Flags

```text
--dry-run
--overwrite
--skip-existing
--force
```

Example:

```bash
majestic add stateful-button:progress --dry-run
```

The dry run should display the complete installation plan without writing files.
