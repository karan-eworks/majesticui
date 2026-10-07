# @majestic/studio

## Purpose

Registry authoring and preview workspace.

## Responsibilities

- Own the implementation and contracts for this area.
- Follow MajesticUI selective dependency, conflict-safety, client-awareness, and documentation standards.
- Keep public behavior covered by tests.

## Non-Responsibilities

- Do not duplicate logic owned by another MajesticUI package.
- Do not introduce item-specific logic into generic platform layers.

## Structure

Document important folders and entry points here as implementation is added.

## Public API / Commands

Document exports, commands, routes, or registry contracts exposed by this area.

## Development

pnpm build
pnpm test
pnpm lint
pnpm typecheck

## Dependencies

Keep dependencies minimal and domain-specific. Install only dependencies required by the selected item or variant.

## Integration Points

Document upstream inputs and downstream consumers.

## Testing

Add unit tests for contracts and integration/fixture tests for behavior crossing package boundaries.

## Release / Deployment

Document whether this area is published, built into static registry artifacts, or deployed as an application/service.

## Contribution Rules

- Preserve source ownership.
- Never silently overwrite locally modified consumer files.
- Keep client directives file-scoped and explicit.
- Tailwind CSS is primary styling; Framer Motion is selective per variant.
- Update this README when responsibilities, APIs, or commands change.
