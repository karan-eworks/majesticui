# MajesticUI — Repository README Standard

Every significant MajesticUI app, package, registry domain, fixture group, or independently owned repository must contain a `README.md`.

## Required README Sections

```markdown
# <Name>

## Purpose

Why this repository/package exists.

## Responsibilities

What it owns.

## Non-Responsibilities

What belongs elsewhere.

## Structure

Important directories/files.

## Public API / Commands

Exports, CLI commands, endpoints, or scripts.

## Development

How to install and run locally.

## Dependencies

Important direct dependencies and internal packages.

## Integration Points

What consumes it and what it consumes.

## Testing

Commands and fixture expectations.

## Release / Deployment

How it is published or deployed.

## Contribution Rules

Architecture constraints and review expectations.
```

## Root Repository README

The root README should explain:

- MajesticUI vision
- core stack
- install examples
- monorepo layout
- development commands
- architecture links
- contribution links

## App READMEs

Required:

```text
apps/docs/README.md
apps/playground/README.md
apps/studio/README.md
apps/registry-api/README.md
```

## Package READMEs

Required:

```text
packages/cli/README.md
packages/config/README.md
packages/registry-core/README.md
packages/registry-schema/README.md
packages/resolver/README.md
packages/installer/README.md
packages/transformers/README.md
packages/project-detector/README.md
packages/package-manager/README.md
packages/logger/README.md
packages/testing/README.md
packages/auth/README.md
packages/shared/README.md
```

## Registry Domain READMEs

Required at least at domain level:

```text
registry/components/README.md
registry/composites/README.md
registry/blocks/README.md
registry/features/README.md
registry/pages/README.md
registry/layouts/README.md
registry/templates/README.md
registry/themes/README.md
registry/hooks/README.md
registry/utilities/README.md
```

Individual complex component families may also contain a README describing variants and upstream provenance.

## Fixture README

`fixtures/README.md` should explain supported test matrices and how fixture projects are regenerated.

## CI Enforcement

Add a script that checks required README files exist. Later it can also validate required headings.
