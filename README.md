# MajesticUI

Registry-driven source distribution for React components, variants, blocks, features, themes, styles, and templates.

## Repository Areas

- apps/ — docs, playground, studio, and future registry gateway.
- packages/ — CLI and domain packages.
- registry/ — installable source families and variants.
- fixtures/ — consumer projects used for integration coverage.
- majesticui-docs/ — architecture, setup, design, and roadmap documentation.

## Development

pnpm install
pnpm build
pnpm test
pnpm lint
pnpm typecheck
pnpm docs:check-readmes

## Product Rules

- Installed source belongs to the consuming application.
- Dependencies are selected per family/variant and deduplicated.
- Styles, themes, assets, icons, and client directives are explicit metadata.
- Locally modified files are never silently overwritten.
# majesticui
