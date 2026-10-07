import { describe, expect, it } from "vitest"
import { createRegistry } from "../../registry-core/src/index"
import { resolveSelection } from "../src/index"

const registry = createRegistry({
  schemaVersion: 1,
  families: {
    button: {
      name: "button",
      type: "component",
      title: "Button",
      defaultVariant: "default",
      variants: {
        default: { files: [] },
        shadcn: {
          files: [],
          dependencies: { npm: ["radix"], registry: [] },
        },
      },
    },
    stateful: {
      name: "stateful",
      type: "component",
      title: "Stateful",
      defaultVariant: "default",
      variants: {
        default: {
          files: [],
          dependencies: {
            npm: ["motion", "radix"],
            registry: ["button:shadcn"],
          },
        },
      },
    },
  },
})

describe("registry resolver", () => {
  it("resolves defaults and transitive dependencies", () => {
    const plan = resolveSelection(registry, "stateful")

    expect(
      plan.selections.map((item) => item.family + ":" + item.variant),
    ).toEqual(["button:shadcn", "stateful:default"])
    expect(plan.npmDependencies).toEqual(["motion", "radix"])
  })

  it("rejects dependency cycles", () => {
    const cyclic = createRegistry({
      schemaVersion: 1,
      families: {
        a: {
          name: "a",
          type: "component",
          title: "A",
          defaultVariant: "default",
          variants: {
            default: { files: [], dependencies: { registry: ["b"] } },
          },
        },
        b: {
          name: "b",
          type: "component",
          title: "B",
          defaultVariant: "default",
          variants: {
            default: { files: [], dependencies: { registry: ["a"] } },
          },
        },
      },
    })

    expect(() => resolveSelection(cyclic, "a")).toThrow("cycle")
  })
})
