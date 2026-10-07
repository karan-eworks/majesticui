# MajesticUI Next.js Docs

This documentation pack defines the final **MajesticUI documentation website** architecture using **Next.js App Router**.

The docs platform is responsible for:

- component documentation
- block previews
- live component previews
- code previews
- installation commands
- manual installation guides
- framework support
- theming documentation
- CLI documentation
- typeset documentation
- skills documentation
- registry documentation
- search
- sidebar navigation
- automatic route generation from registry data

## Final Docs Stack

```text
Next.js
React
TypeScript
Tailwind CSS
Framer Motion
MDX
Shiki
MajesticUI Registry
```

## Main Routes

```text
/docs
/docs/components
/docs/components/base/[slug]
/docs/installation
/docs/installation/[framework]
/docs/theming
/docs/cli
/docs/typeset
/docs/skills
/docs/registry

/blocks
/blocks/[category]
/blocks/[category]/[slug]

/preview/components/[slug]
/preview/blocks/[slug]
```

## Important Rule

Whenever a new MajesticUI visual registry item is published, its corresponding documentation and preview should become available automatically.

Developers should not manually create one route file per component.
