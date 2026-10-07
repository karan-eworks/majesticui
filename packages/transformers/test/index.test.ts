import { describe, expect, it } from "vitest"
import { addClientDirective, expandTarget, checksum } from "../src/index"

describe("source transformers", () => {
  it("expands target tokens", () => {
    expect(
      expandTarget("{{ui}}/button.tsx", {
        ui: "src/components/ui",
        lib: "src/lib",
        styles: "src/styles",
      }),
    ).toBe("src/components/ui/button.tsx")
  })

  it("puts the client directive first", () => {
    expect(addClientDirective("import x from 'x'\nexport const y = x")).toBe(
      "\"use client\"\n\nimport x from 'x'\nexport const y = x",
    )
    expect(addClientDirective('"use client"\n\nexport default 1')).toBe(
      '"use client"\n\nexport default 1',
    )
  })

  it("returns stable content checksums", () => {
    expect(checksum("button")).toBe(checksum("button"))
    expect(checksum("button")).not.toBe(checksum("other"))
  })
})
