# MajesticUI Button System

## Goal

Implement the documented button system as the first complete local CLI vertical
slice. A consumer should be able to select a normal or stateful button family,
resolve its exact variant and dependencies, preview the plan, and install
source files safely into a project.

## Scope

Supported item references:

- button
- button:default
- button:shadcn
- button:animated
- button:glass
- button:gradient
- button:icon
- button:enterprise
- stateful-button
- stateful-button:default
- stateful-button:spinner
- stateful-button:progress

Supported CLI options:

- --dry-run
- --overwrite
- --skip-existing
- --force

The first registry is local and checked into this repository. Remote registry
fetching is intentionally deferred until the local contracts are exercised.

## Architecture

### Registry schema

@majestic/registry-schema owns the TypeScript contracts and runtime validation
for registry families and variants, files and target path variables, npm and
registry dependencies, client requirements, style declarations with copy and
merge modes, contracts, and version metadata.

Button metadata is stored under registry/components/buttons/ with one directory
per family/variant and source files alongside each variant definition.

### Registry core

@majestic/registry-core loads the local button catalog, validates it, and
returns a family or concrete variant. It exposes a deterministic catalog
without coupling the CLI to filesystem layout details.

### Resolver

@majestic/resolver parses family[:variant], applies the family default, resolves
transitive registry dependencies, deduplicates package dependencies, detects
cycles, and returns a stable installation plan.

The selected variant is the only source of dependencies. For example,
button:shadcn must not acquire animation, state-machine, or unrelated icon
packages.

### Installer and transformers

@majestic/installer classifies each target as missing, unchanged, modified,
unknown, or a variant conflict. It writes only after planning and honors the
safe default of preserving modified files.

@majestic/transformers handles:

- ensuring "use client" is the first statement when metadata requires it
- target token expansion such as {{ui}}, {{lib}}, and {{styles}}
- CSS copy and merge operations
- SHA-256 checksums for installed files

The initial implementation uses a project-local majestic.json when present,
with documented path defaults suitable for a TypeScript React project.

### CLI

@majestic/ui exposes a runnable majestic binary and a package-local developer
command. add prints a deterministic summary of registry dependencies, npm
dependencies, styles, and files. --dry-run performs all resolution and
classification without writing or installing packages.

Package-manager execution is represented in the plan and is injectable for
tests. The initial local CLI does not run a network package install during unit
tests; an explicit real-project invocation may use the detected package manager
after the plan is accepted.

### Manifest

Successful installation updates .majestic/manifest.json with the family,
variant, version, target paths, checksums, styles, and npm dependencies. This
manifest is the source of truth for unchanged-versus-modified detection.

## Error and conflict behavior

- Unknown families and variants fail with an actionable message.
- Cyclic registry dependencies fail before any write.
- Existing modified or unknown files are preserved by default.
- --skip-existing leaves an existing target untouched.
- --overwrite replaces targets after an explicit option is supplied.
- --force permits replacement of modified files.
- --dry-run never writes files, changes the manifest, or invokes package
  installation.

## Testing

Use Vitest for focused package tests and a CLI fixture for integration tests.
The test matrix covers default and explicit variant selection, all documented
button family variants, selective and transitive dependency resolution, client
directive insertion and non-insertion, CSS copy and merge, file
classification and safe conflict behavior, dry-run side-effect freedom,
manifest checksums and repeat installation, and CLI output and option handling.

## Success criteria

The following commands work from the repository root:

    pnpm majestic add button:shadcn --dry-run
    pnpm majestic add stateful-button:progress --dry-run
    pnpm test
    pnpm typecheck
    pnpm lint
    pnpm build
    pnpm registry:validate

The first two commands must show complete plans without modifying the caller's
filesystem.

## Deferred work

- remote registry fetching and authentication
- interactive TTY prompts
- framework-specific source transforms beyond path tokens and client directives
- real npm installation in automated tests
- browser docs pages for the button catalog
