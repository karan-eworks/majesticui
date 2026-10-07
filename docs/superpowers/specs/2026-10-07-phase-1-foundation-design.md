# MajesticUI Phase 1 Foundation

## Goal

Establish a minimal TypeScript monorepo that matches the documented MajesticUI boundaries and can grow into the V1 CLI, registry, and documentation platform.

## Design

- Use pnpm workspaces for dependency and package management.
- Use Turborepo to coordinate build, development, test, lint, and typecheck tasks.
- Keep domain responsibilities split into the documented packages: CLI, configuration, registry schema/core, resolver, installer, transformers, project detection, package manager, logger, testing, auth, and shared utilities.
- Add placeholder apps for docs, playground, and studio so the repository layout is stable before application behavior is implemented.
- Add registry taxonomy directories and fixture placeholders without inventing runtime behavior.

## Success criteria

- Root commands are defined for build, dev, test, lint, typecheck, and registry tasks.
- Every documented package has a valid package boundary and TypeScript entry point.
- The workspace installs and all initial validation commands complete successfully.

## Scope excluded

CLI commands, registry schemas, dependency resolution, installation, fixtures with real frameworks, and the docs UI are deferred to later roadmap phases.
