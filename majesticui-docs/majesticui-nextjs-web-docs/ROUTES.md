# MajesticUI Next.js Route Map

## Public Website

```text
/
```

## Documentation

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
```

## Current Component Routes

```text
/docs/components/base/button
/docs/components/base/stateful-button
/docs/components/base/dialog
/docs/components/base/alert-dialog
/docs/components/base/combobox
/docs/components/base/error
/docs/components/base/toaster
```

## Blocks

```text
/blocks
/blocks/[category]
/blocks/[category]/[slug]
```

Examples:

```text
/blocks/dashboard
/blocks/login
/blocks/signup
/blocks/table

/blocks/dashboard/dashboard-01
/blocks/login/login-01
/blocks/signup/signup-01
/blocks/table/table-01
```

## Standalone Previews

```text
/preview/components/[slug]
/preview/blocks/[slug]
```

Examples:

```text
/preview/components/button
/preview/components/dialog
/preview/components/toaster

/preview/blocks/dashboard-01
/preview/blocks/login-01
```

## Optional Redirects

You may support:

```text
/docs/components/button
```

redirecting to:

```text
/docs/components/base/button
```

Similarly:

```text
/blocks/table-01
```

may redirect to:

```text
/blocks/table/table-01
```
