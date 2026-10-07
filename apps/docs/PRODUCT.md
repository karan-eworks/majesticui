# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, TypeScript, and Tailwind CSS; delegated to the existing
MajesticUI monorepo and the user's explicit Next.js preview requirement.

## Users

Frontend developers evaluating, previewing, and installing MajesticUI registry
components into React, Next.js, and Vite projects.

## Product Purpose

MajesticUI Docs is the public discovery and preview layer for the source-owned
MajesticUI registry. It helps developers understand a component, inspect its
variants and dependencies, preview its behavior, copy code, and run the exact
MajesticUI installation command.

## Positioning

MajesticUI Docs is registry-driven: component pages, variants, install plans,
dependencies, and previews come from the same source metadata used by the CLI.

## Operating Context

Developers browse a component catalog, use search and sidebar navigation, switch
variants, compare preview and code, copy commands, and validate responsive
behavior in a browser.

## Capabilities and Constraints

- Component families have independently installable variants.
- Preview metadata and source ownership must remain aligned with the registry.
- The first implemented surface focuses on components, especially Button and
  Stateful Button.
- The docs should be familiar to shadcn/ui users while remaining an original
  MajesticUI product.
- Existing CLI, registry, and package boundaries remain authoritative.

## Brand Commitments

The product name is MajesticUI. The requested docs experience should feel
similar to shadcn/ui in navigation and usability, without copying its code,
branding, or exact visual treatment.

## Evidence on Hand

- Product and architecture documentation: majesticui-docs/
- Component documentation: majesticui-docs/components-docs/
- Next.js docs architecture: majesticui-docs/majesticui-nextjs-web-docs/
- Button registry and CLI documentation: majesticui-docs/majesticui-button-docs/
- Local registry catalog: registry/components/buttons/

No production customer claims, testimonials, or external brand assets are
provided; the docs must not invent them.

## Product Principles

- Show the component working before asking the reader to install it.
- Keep registry metadata, preview, code, and CLI output consistent.
- Make variants and dependencies explicit.
- Preserve keyboard access, responsive behavior, and readable code.

## Accessibility & Inclusion

Components and documentation must remain keyboard navigable, use semantic
controls, provide visible focus states, respect reduced motion, and maintain
readable contrast in light and dark themes.
