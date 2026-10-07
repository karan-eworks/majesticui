import { describe, expect, it } from "vitest"
import { validateRegistryCatalog, type RegistryCatalog } from "../src/index"

const validCatalog: RegistryCatalog = {
  schemaVersion: 1,
  families: {
    button: {
      name: "button",
      type: "component",
      title: "Button",
      defaultVariant: "default",
      variants: {
        default: {
          version: "1.0.0",
          contract: "majestic.button.v1",
          client: false,
          files: [
            {
              source: "button.tsx",
              target: "{{ui}}/button.tsx",
              type: "component",
            },
          ],
        },
      },
    },
  },
}

describe("registry schema", () => {
  it("accepts a valid catalog", () => {
    expect(validateRegistryCatalog(validCatalog)).toEqual(validCatalog)
  })

  it("rejects a family whose default variant is missing", () => {
    const invalid = structuredClone(validCatalog)
    invalid.families.button.defaultVariant = "missing"

    expect(() => validateRegistryCatalog(invalid)).toThrow("default variant")
  })

  it("rejects unsupported style modes", () => {
    const invalid = structuredClone(validCatalog) as unknown as Record<
      string,
      unknown
    >
    const families = invalid.families as Record<string, unknown>
    const button = families.button as Record<string, unknown>
    const variants = button.variants as Record<string, unknown>
    const variant = variants.default as Record<string, unknown>
    variant.styles = [
      { source: "button.css", target: "{{styles}}/button.css", mode: "bad" },
    ]

    expect(() => validateRegistryCatalog(invalid)).toThrow("style mode")
  })
})
