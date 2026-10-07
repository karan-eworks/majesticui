import { mkdtemp, readFile, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { installPlan } from "../src/index"

describe("installer", () => {
  it("installs transformed files and records a manifest", async () => {
    const root = await mkdtemp(join(tmpdir(), "majestic-installer-"))
    const sourceRoot = await mkdtemp(join(tmpdir(), "majestic-source-"))
    await writeFile(
      join(sourceRoot, "button.tsx"),
      "export const Button = () => null\n",
    )

    const result = await installPlan({
      root,
      sourceRoot,
      plan: {
        selections: [
          {
            family: "button",
            variant: "animated",
            familyDefinition: {} as never,
            definition: {
              client: true,
              files: [
                {
                  source: "button.tsx",
                  target: "{{ui}}/button.tsx",
                  type: "component",
                },
              ],
            },
          },
        ],
        npmDependencies: ["framer-motion"],
        devNpmDependencies: [],
      },
    })

    expect(result.files[0].status).toBe("installed")
    expect(
      await readFile(join(root, "src/components/ui/button.tsx"), "utf8"),
    ).toContain('"use client"')
    expect(
      await readFile(join(root, ".majestic/manifest.json"), "utf8"),
    ).toContain("animated")
  })

  it("does not write during a dry run", async () => {
    const root = await mkdtemp(join(tmpdir(), "majestic-dry-run-"))
    const sourceRoot = await mkdtemp(join(tmpdir(), "majestic-source-"))
    await writeFile(
      join(sourceRoot, "button.tsx"),
      "export const Button = () => null\n",
    )

    const result = await installPlan({
      root,
      sourceRoot,
      dryRun: true,
      plan: {
        selections: [
          {
            family: "button",
            variant: "default",
            familyDefinition: {} as never,
            definition: {
              files: [
                {
                  source: "button.tsx",
                  target: "{{ui}}/button.tsx",
                  type: "component",
                },
              ],
            },
          },
        ],
        npmDependencies: [],
        devNpmDependencies: [],
      },
    })

    expect(result.files[0].status).toBe("planned")
    await expect(
      readFile(join(root, "src/components/ui/button.tsx")),
    ).rejects.toThrow()
  })
})
