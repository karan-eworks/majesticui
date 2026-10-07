import { access, mkdtemp, readFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { runCli } from "../../cli/src/index"

describe("button CLI integration", () => {
  it("installs the animated variant into a consumer fixture", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "majestic-button-project-"))
    const output: string[] = []

    await runCli(["add", "button:animated"], {
      cwd,
      registryRoot: resolve(process.cwd(), "../../registry/components/buttons"),
      output: (line) => output.push(line),
    })

    expect(
      await readFile(join(cwd, "src/components/ui/button.tsx"), "utf8"),
    ).toContain('"use client"')
    await access(join(cwd, "src/styles/majestic/button.css"))
    expect(
      await readFile(join(cwd, ".majestic/manifest.json"), "utf8"),
    ).toContain("animated")
    expect(output.join("\n")).toContain("Installation complete")
  })
})
