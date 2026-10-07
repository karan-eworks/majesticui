import { join } from "node:path"
import { installPlan } from "../../../installer/src/index"
import { loadRegistry } from "../../../registry-core/src/index"
import { resolveSelection } from "../../../resolver/src/index"

export interface AddOptions {
  cwd: string
  registryRoot: string
  output: (line: string) => void
  dryRun?: boolean
  overwrite?: boolean
  skipExisting?: boolean
  force?: boolean
}

export async function addCommand(
  reference: string,
  options: AddOptions,
): Promise<void> {
  const registry = loadRegistry(join(options.registryRoot, "registry.json"))
  const plan = resolveSelection(registry, reference)
  options.output("Installing " + reference)
  options.output("")
  options.output("Registry dependencies")
  for (const selection of plan.selections) {
    options.output("  " + selection.family + ":" + selection.variant)
  }
  options.output("")
  options.output("Package dependencies")
  for (const dependency of plan.npmDependencies)
    options.output("  " + dependency)
  options.output("")
  options.output("Files")
  for (const selection of plan.selections) {
    for (const file of selection.definition.files) {
      options.output("  " + file.target)
    }
  }

  const result = await installPlan({
    root: options.cwd,
    sourceRoot: options.registryRoot,
    plan,
    dryRun: options.dryRun,
    overwrite: options.overwrite,
    skipExisting: options.skipExisting,
    force: options.force,
  })
  options.output("")
  options.output(options.dryRun ? "Dry run complete" : "Installation complete")
  for (const file of result.files) options.output(file.status + " " + file.path)
}
