# MajesticUI Studio

## Purpose

Future registry authoring, preview, validation, publishing, and deprecation application.

## Responsibilities

- Own the implementation and contracts implied by this area.
- Follow MajesticUI architecture, selective dependency, conflict-safety, and documentation standards.
- Keep public behavior covered by tests.

## Non-Responsibilities

- Do not duplicate logic owned by another MajesticUI package.
- Do not introduce item-specific logic into generic platform layers.

## Structure

Document important folders and entry points here as implementation is added.

## Public API / Commands

Document exports, commands, routes, or registry contracts exposed by this area.

## Development

```bash
pnpm install
pnpm build
pnpm test
pnpm lint
pnpm typecheck
```

Use filtered workspace commands where appropriate.

## Dependencies

List important external and internal dependencies here. Dependencies must remain minimal and domain-specific.

## Integration Points

Document upstream inputs and downstream consumers.

## Testing

Add unit tests for contracts and integration/fixture tests for behavior that crosses package boundaries.

## Release / Deployment

Document whether this area is published to npm, built into static registry artifacts, or deployed as an application/service.

## Contribution Rules

- Preserve source ownership.
- Install only required dependencies.
- Never silently overwrite locally modified consumer files.
- Keep `"use client"` file-scoped and explicit.
- Tailwind CSS is primary styling; Framer Motion is selective per variant.
- Update this README when responsibilities, public APIs, or commands change.
