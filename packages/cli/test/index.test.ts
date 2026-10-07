import { mkdtemp } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { runCli } from "../src/index"

describe("Majestic CLI", () => {
  it("prints a selective dry-run plan", async () => {
    const cwd = await mkdtemp(join(tmpdir(), "majestic-cli-"))
    const output: string[] = []
    await runCli(["add", "button:shadcn", "--dry-run"], {
      cwd,
      output: (line) => output.push(line),
    })

    const text = output.join("\n")
    expect(text).toContain("button:shadcn")
    expect(text).toContain("@radix-ui/react-slot")
    expect(text).not.toContain("framer-motion")
  })

  it("rejects unknown commands", async () => {
    await expect(runCli(["remove", "button"])).rejects.toThrow(
      "Unknown command",
    )
  })
})
