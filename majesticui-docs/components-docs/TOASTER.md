# MajesticUI Toaster — React-Toastify

MajesticUI uses **React-Toastify** for the `toaster` component family.

## Install

```bash
majestic add toaster
```

or explicitly:

```bash
majestic add toaster:toastify
```

The installer should install only:

```text
react-toastify
```

plus the MajesticUI toaster wrapper files.

---

## Supported toast types

MajesticUI exposes four required toast types:

```text
default
success
warning
error
```

Usage:

```tsx
import { majesticToast } from "@/components/ui/toaster"

majesticToast.default("Changes saved")
majesticToast.success("Student created successfully")
majesticToast.warning("Some fields still need attention")
majesticToast.error("Unable to save changes")
```

React-Toastify's native warning helper is `toast.warn(...)`; MajesticUI exposes it as `majesticToast.warning(...)` so the public API is clearer and consistent.

---

## Generated files

Recommended install result:

```text
components/
└── ui/
    └── toaster.tsx
```

The file must include:

```tsx
"use client"
```

because toast notifications are client-side UI.

---

## MajesticUI wrapper

```tsx
"use client"

import { ToastContainer, toast, type ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const baseOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
}

export const majesticToast = {
  default(message: string, options?: ToastOptions) {
    return toast(message, { ...baseOptions, ...options })
  },

  success(message: string, options?: ToastOptions) {
    return toast.success(message, { ...baseOptions, ...options })
  },

  warning(message: string, options?: ToastOptions) {
    return toast.warn(message, { ...baseOptions, ...options })
  },

  error(message: string, options?: ToastOptions) {
    return toast.error(message, { ...baseOptions, ...options })
  },

  dismiss(id?: string | number) {
    return id ? toast.dismiss(id) : toast.dismiss()
  },
}

export function MajesticToaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      limit={5}
    />
  )
}
```

---

## Root setup

For Next.js App Router, add the toaster once near the application root:

```tsx
import { MajesticToaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MajesticToaster />
      </body>
    </html>
  )
}
```

For Vite/React, render it once near the application root:

```tsx
function App() {
  return (
    <>
      <Application />
      <MajesticToaster />
    </>
  )
}
```

---

## Default toast

```tsx
majesticToast.default("Settings updated")
```

Optional overrides:

```tsx
majesticToast.default("Settings updated", {
  autoClose: 2500,
})
```

---

## Success toast

```tsx
majesticToast.success("Saved successfully")
```

Typical uses:

```text
Create succeeded
Update succeeded
Delete succeeded
Upload completed
Payment completed
Form submitted
```

---

## Warning toast

```tsx
majesticToast.warning("Please review the highlighted fields")
```

Typical uses:

```text
Unsaved changes
Partial completion
Expiring session
Incomplete form
Potential destructive action
```

---

## Error toast

```tsx
majesticToast.error("Something went wrong")
```

Typical uses:

```text
API failure
Validation failure
Network failure
Upload failure
Permission failure
Server error
```

---

## Async example

```tsx
async function saveStudent() {
  try {
    await saveStudentRequest()

    majesticToast.success("Student saved successfully")
  } catch {
    majesticToast.error("Unable to save student")
  }
}
```

---

## Per-toast configuration

Every helper can accept React-Toastify options:

```tsx
majesticToast.success("Saved", {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
})
```

Global defaults remain inside `baseOptions`.

---

## Registry definition

```json
{
  "name": "toaster",
  "family": "toaster",
  "variant": "toastify",
  "type": "component",
  "client": true,
  "frameworks": ["react", "next", "vite"],
  "dependencies": {
    "npm": ["react-toastify"],
    "registry": []
  },
  "files": [
    {
      "source": "toaster.tsx",
      "target": "{{ui}}/toaster.tsx"
    }
  ],
  "styles": [
    {
      "package": "react-toastify",
      "import": "react-toastify/dist/ReactToastify.css"
    }
  ],
  "setup": {
    "rootComponent": "MajesticToaster",
    "requiredOnce": true
  },
  "preview": {
    "entry": "preview.tsx",
    "height": 420,
    "responsive": true
  }
}
```

---

## Preview requirements

The MajesticUI docs preview must show all four toast states:

```text
[ Default Toast ]
[ Success Toast ]
[ Warning Toast ]
[ Error Toast ]
```

Example preview:

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { MajesticToaster, majesticToast } from "@/components/ui/toaster"

export default function ToasterPreview() {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => majesticToast.default("Default notification")}
        >
          Default
        </Button>

        <Button onClick={() => majesticToast.success("Operation completed")}>
          Success
        </Button>

        <Button
          variant="outline"
          onClick={() => majesticToast.warning("Please review this action")}
        >
          Warning
        </Button>

        <Button
          variant="destructive"
          onClick={() => majesticToast.error("Something went wrong")}
        >
          Error
        </Button>
      </div>

      <MajesticToaster />
    </>
  )
}
```

---

## Docs page

Generated route:

```text
/docs/components/toaster
```

Required sections:

```text
Toaster
Preview
Installation
Root Setup
Usage
Default
Success
Warning
Error
Configuration
Customization
Dependencies
Supported Frameworks
API
```

The installation section must show:

```bash
majestic add toaster:toastify
```

---

## Conflict handling

If:

```text
components/ui/toaster.tsx
```

already exists:

```text
toaster.tsx already exists.

❯ Keep existing
  Show diff
  Replace
  Cancel
```

Default:

```text
Keep existing
```

If `react-toastify` is already installed, MajesticUI reuses the installed dependency instead of adding it again.

---

## MajesticUI requirements

The Toaster implementation must:

1. use React-Toastify;
2. expose `default`, `success`, `warning`, and `error`;
3. expose one reusable `MajesticToaster`;
4. add `"use client"`;
5. install only `react-toastify`;
6. import its required stylesheet;
7. render the container only once at the application root;
8. support per-toast overrides;
9. appear automatically in MajesticUI Docs;
10. provide live previews for all four required toast types.
