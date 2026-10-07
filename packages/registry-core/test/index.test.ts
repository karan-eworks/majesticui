import { describe, expect, it } from "vitest"
import { createRegistry } from "../src/index"

const catalog = {
  schemaVersion: 1,
  families: {
    button: {
      name: "button",
      type: "component",
      title: "Button",
      defaultVariant: "default",
      variants: {
        default: { files: [] },
        shadcn: { files: [] },
      },
    },
  },
}

describe("button registry", () => {
  it("returns default and explicit variants", () => {
    const registry = createRegistry(catalog)

    expect(registry.resolve("button").variant).toBe("default")
    expect(registry.resolve("button:shadcn").variant).toBe("shadcn")
  })

  it("rejects unknown family and variant", () => {
    const registry = createRegistry(catalog)

    expect(() => registry.resolve("missing")).toThrow("Unknown registry family")
    expect(() => registry.resolve("button:missing")).toThrow("Unknown variant")
  })
})
