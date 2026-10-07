import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { addCommand } from "./commands/add"

export interface CliOptions {
  cwd?: string
  output?: (line: string) => void
  registryRoot?: string
}

export async function runCli(
  argv: string[],
  options: CliOptions = {},
): Promise<void> {
  const [command, reference, ...flags] = argv
  if (command !== "add") throw new Error("Unknown command: " + (command ?? ""))
  if (!reference) throw new Error("An item reference is required")

  const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
  const output = options.output ?? console.log
  await addCommand(reference, {
    cwd: options.cwd ?? process.cwd(),
    registryRoot:
      options.registryRoot ??
      resolve(packageRoot, "../registry/components/buttons"),
    output,
    dryRun: flags.includes("--dry-run"),
    overwrite: flags.includes("--overwrite"),
    skipExisting: flags.includes("--skip-existing"),
    force: flags.includes("--force"),
  })
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  runCli(process.argv.slice(2)).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
