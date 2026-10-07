export type ComponentVariant = {
  id: string
  label: string
  description: string
  command: string
  client: boolean
  dependencies: string[]
  styles: string[]
  code: string
  manualSteps?: string[]
  customization?: string[]
  examples?: string[]
  icons?: string[]
  animation?: string
}

export type ComponentDoc = {
  slug: string
  title: string
  category: string
  description: string
  status: string
  related: string[]
  api: Array<{
    prop: string
    type: string
    defaultValue: string
    description: string
  }>
  variants: ComponentVariant[]
}

const code = (...lines: string[]) => lines.join("\n")

export const components: ComponentDoc[] = [
  {
    slug: "button",
    title: "Button",
    category: "Base",
    description:
      "Displays a button or button-like control with a consistent MajesticUI contract.",
    status: "Server-compatible",
    related: ["Stateful Button", "Alert Dialog"],
    api: [
      {
        prop: "variant",
        type: "string",
        defaultValue: "default",
        description: "Visual treatment for the button.",
      },
      {
        prop: "size",
        type: "sm | md | lg",
        defaultValue: "md",
        description: "Controls height and horizontal rhythm.",
      },
      {
        prop: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Prevents interaction and dims the control.",
      },
      {
        prop: "className",
        type: "string",
        defaultValue: "—",
        description: "Extends the component utility classes.",
      },
    ],
    variants: [
      {
        id: "default",
        label: "Default",
        description: "A quiet, high-contrast action for everyday interfaces.",
        command: "majestic add button",
        client: false,
        dependencies: [],
        styles: [],
        code: code(
          'import { Button } from "@/components/ui/button"',
          "",
          "export function Example() {",
          "  return <Button>Continue</Button>",
          "}",
        ),
      },
      {
        id: "shadcn",
        label: "Shadcn",
        description:
          "A familiar slot-compatible variant with the MajesticUI contract.",
        command: "majestic add button:shadcn",
        client: false,
        dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
        styles: [],
        code: code(
          'import { Button } from "@/components/ui/button"',
          "",
          "export function Example() {",
          '  return <Button variant="secondary">Continue</Button>',
          "}",
        ),
      },
      {
        id: "animated",
        label: "Animated",
        description:
          "Adds a restrained press response for high-intent actions.",
        command: "majestic add button:animated",
        client: true,
        dependencies: ["framer-motion"],
        styles: ["styles/majestic/button.css"],
        animation: "Framer Motion press response",
        code: code(
          '"use client"',
          "",
          'import { Button } from "@/components/ui/button"',
          "",
          "export function Example() {",
          "  return <Button>Save changes</Button>",
          "}",
        ),
      },
      {
        id: "glass",
        label: "Glass",
        description:
          "A translucent surface for layered or media-rich contexts.",
        command: "majestic add button:glass",
        client: false,
        dependencies: [],
        styles: ["styles/majestic/button.css"],
        code: code(
          'import { Button } from "@/components/ui/button"',
          "",
          "export function Example() {",
          "  return <Button>Open workspace</Button>",
          "}",
        ),
      },
    ],
  },
  {
    slug: "stateful-button",
    title: "Stateful Button",
    category: "Base",
    description:
      "A client component for actions that move through pending, success, and error states.",
    status: "Client Component",
    related: ["Button", "Combobox"],
    api: [
      {
        prop: "state",
        type: "idle | pending | success | error",
        defaultValue: "idle",
        description: "Current action state.",
      },
      {
        prop: "onSubmit",
        type: "() => Promise<void>",
        defaultValue: "—",
        description: "Async action invoked by the control.",
      },
      {
        prop: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Prevents a new action from starting.",
      },
    ],
    variants: [
      {
        id: "default",
        label: "Default",
        description: "A complete state machine for async form actions.",
        command: "majestic add stateful-button",
        client: true,
        dependencies: [
          "xstate",
          "@xstate/react",
          "framer-motion",
          "lucide-react",
        ],
        styles: [],
        animation: "Framer Motion state transition",
        code: code(
          '"use client"',
          "",
          'import { StatefulButton } from "@/components/ui/stateful-button"',
          "",
          "export function Example() {",
          "  return <StatefulButton>Submit request</StatefulButton>",
          "}",
        ),
      },
      {
        id: "spinner",
        label: "Spinner",
        description:
          "A compact pending state for actions with short completion times.",
        command: "majestic add stateful-button:spinner",
        client: true,
        dependencies: ["framer-motion", "lucide-react"],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { StatefulButton } from "@/components/ui/stateful-button"',
          "",
          "export function Example() {",
          "  return <StatefulButton loading>Sync account</StatefulButton>",
          "}",
        ),
      },
      {
        id: "progress",
        label: "Progress",
        description:
          "Communicates long-running work with a visible completion percentage.",
        command: "majestic add stateful-button:progress",
        client: true,
        dependencies: [
          "xstate",
          "@xstate/react",
          "framer-motion",
          "lucide-react",
        ],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { StatefulButton } from "@/components/ui/stateful-button"',
          "",
          "export function Example() {",
          "  return <StatefulButton progress={64}>Uploading</StatefulButton>",
          "}",
        ),
      },
    ],
  },
  {
    slug: "dialog",
    title: "Dialog",
    category: "Overlays",
    description:
      "A focused surface for decisions, forms, and contextual information.",
    status: "Client Component",
    related: ["Alert Dialog", "Toaster"],
    api: [
      {
        prop: "open",
        type: "boolean",
        defaultValue: "false",
        description: "Controls whether the dialog is visible.",
      },
      {
        prop: "onOpenChange",
        type: "(open: boolean) => void",
        defaultValue: "—",
        description: "Receives open state changes.",
      },
    ],
    variants: [
      {
        id: "default",
        label: "Default",
        description:
          "A centered dialog with a calm, accessible focus treatment.",
        command: "majestic add dialog",
        client: true,
        dependencies: ["@radix-ui/react-dialog"],
        styles: [],
        examples: ["Basic dialog", "Form dialog", "Scrollable dialog"],
        code: code(
          '"use client"',
          "",
          'import { Dialog } from "@/components/ui/dialog"',
          "",
          "export function Example() {",
          "  return <Dialog>Account settings</Dialog>",
          "}",
        ),
      },
      {
        id: "fullscreen",
        label: "Fullscreen",
        description:
          "A spacious takeover for complex workflows on smaller screens.",
        command: "majestic add dialog:fullscreen",
        client: true,
        dependencies: ["@radix-ui/react-dialog"],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { Dialog } from "@/components/ui/dialog"',
          "",
          "export function Example() {",
          '  return <Dialog variant="fullscreen">Edit profile</Dialog>',
          "}",
        ),
      },
    ],
  },
  {
    slug: "combobox",
    title: "Combobox",
    category: "Forms",
    description:
      "A keyboard-first selection control with searchable and multi-select variants.",
    status: "Client Component",
    related: ["Dialog", "Button"],
    api: [
      {
        prop: "value",
        type: "string",
        defaultValue: "—",
        description: "Currently selected option.",
      },
      {
        prop: "searchable",
        type: "boolean",
        defaultValue: "false",
        description: "Enables inline filtering.",
      },
      {
        prop: "multiple",
        type: "boolean",
        defaultValue: "false",
        description: "Allows more than one selected option.",
      },
    ],
    variants: [
      {
        id: "searchable",
        label: "Searchable",
        description: "Find an option quickly without leaving the field.",
        command: "majestic add combobox:searchable",
        client: true,
        dependencies: [],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { Combobox } from "@/components/ui/combobox"',
          "",
          "export function Example() {",
          '  return <Combobox searchable options={["React", "Next.js", "Vite"]} />',
          "}",
        ),
      },
      {
        id: "multiple",
        label: "Multiple",
        description:
          "Select and review several options in one compact control.",
        command: "majestic add combobox:multiple",
        client: true,
        dependencies: [],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { Combobox } from "@/components/ui/combobox"',
          "",
          "export function Example() {",
          '  return <Combobox multiple options={["React", "Next.js", "Vite"]} />',
          "}",
        ),
      },
      {
        id: "async",
        label: "Async",
        description:
          "Communicates loading while options arrive from a remote source.",
        command: "majestic add combobox:async",
        client: true,
        dependencies: [],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { Combobox } from "@/components/ui/combobox"',
          "",
          "export function Example() {",
          "  return <Combobox loading options={options} />",
          "}",
        ),
      },
    ],
  },
  {
    slug: "alert-dialog",
    title: "Alert Dialog",
    category: "Overlays",
    description:
      "A protected confirmation surface for destructive or consequential actions.",
    status: "Client Component",
    related: ["Dialog", "Stateful Button"],
    api: [
      {
        prop: "open",
        type: "boolean",
        defaultValue: "false",
        description: "Controls whether the alert is visible.",
      },
      {
        prop: "onConfirm",
        type: "() => void",
        defaultValue: "—",
        description: "Runs after the user confirms.",
      },
    ],
    variants: [
      {
        id: "default",
        label: "Default",
        description: "A clear confirmation with cancel and continue actions.",
        command: "majestic add alert-dialog",
        client: true,
        dependencies: ["@radix-ui/react-alert-dialog"],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { AlertDialog } from "@/components/ui/alert-dialog"',
          "",
          "export function Example() {",
          "  return <AlertDialog>Delete project?</AlertDialog>",
          "}",
        ),
      },
      {
        id: "destructive",
        label: "Destructive",
        description:
          "Adds a stronger warning treatment for irreversible actions.",
        command: "majestic add alert-dialog:destructive",
        client: true,
        dependencies: ["@radix-ui/react-alert-dialog"],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { AlertDialog } from "@/components/ui/alert-dialog"',
          "",
          "export function Example() {",
          '  return <AlertDialog variant="destructive">Delete project?</AlertDialog>',
          "}",
        ),
      },
    ],
  },
  {
    slug: "error",
    title: "Error State",
    category: "Feedback",
    description:
      "A recovery-oriented message for failed requests and invalid states.",
    status: "Server-compatible",
    related: ["Stateful Button", "Toaster"],
    api: [
      {
        prop: "title",
        type: "string",
        defaultValue: "Something went wrong",
        description: "Short explanation of the failure.",
      },
      {
        prop: "onRetry",
        type: "() => void",
        defaultValue: "—",
        description: "Optional recovery action.",
      },
    ],
    variants: [
      {
        id: "retry",
        label: "Retry",
        description: "Pairs a concise failure message with a recovery action.",
        command: "majestic add error:retry",
        client: false,
        dependencies: [],
        styles: [],
        code: code(
          'import { ErrorState } from "@/components/ui/error"',
          "",
          "export function Example() {",
          "  return <ErrorState onRetry={reload} />",
          "}",
        ),
      },
    ],
  },
  {
    slug: "toaster",
    title: "Toaster",
    category: "Feedback",
    description:
      "Transient notifications that confirm actions without interrupting the workflow.",
    status: "Client Component",
    related: ["Error State", "Dialog"],
    api: [
      {
        prop: "position",
        type: "top-right | bottom-right",
        defaultValue: "bottom-right",
        description: "Viewport edge where notifications appear.",
      },
      {
        prop: "duration",
        type: "number",
        defaultValue: "4000",
        description: "How long a notification remains visible.",
      },
    ],
    variants: [
      {
        id: "sonner",
        label: "Sonner",
        description:
          "A polished notification stack with accessible announcements.",
        command: "majestic add toaster:sonner",
        client: true,
        dependencies: ["sonner"],
        styles: [],
        code: code(
          '"use client"',
          "",
          'import { toast } from "sonner"',
          "",
          "export function Example() {",
          '  return <button onClick={() => toast("Saved")}>Save</button>',
          "}",
        ),
      },
    ],
  },
]

export function getComponent(slug: string) {
  return components.find((component) => component.slug === slug)
}
