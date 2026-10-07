import { describe, expect, it } from "vitest"
import { defaultConfig, mergeConfig } from "../src/index"

describe("Majestic config", () => {
  it("provides installable path defaults", () => {
    expect(defaultConfig.paths.ui).toBe("src/components/ui")
    expect(defaultConfig.paths.lib).toBe("src/lib")
  })

  it("merges path overrides without dropping defaults", () => {
    const config = mergeConfig({ paths: { ui: "components/ui" } })

    expect(config.paths.ui).toBe("components/ui")
    expect(config.paths.lib).toBe("src/lib")
  })
})
