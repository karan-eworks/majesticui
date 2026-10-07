import type { Registry, RegistrySelection } from "../../registry-core/src/index"

export interface ResolvedPlan {
  selections: RegistrySelection[]
  npmDependencies: string[]
  devNpmDependencies: string[]
}

export function resolveSelection(
  registry: Registry,
  reference: string,
): ResolvedPlan {
  const selections: RegistrySelection[] = []
  const visited = new Set<string>()
  const visiting = new Set<string>()

  function visit(itemReference: string): void {
    const selection = registry.resolve(itemReference)
    const key = selection.family + ":" + selection.variant
    if (visited.has(key)) return
    if (visiting.has(key))
      throw new Error("Registry dependency cycle detected at " + key)

    visiting.add(key)
    for (const dependency of selection.definition.dependencies?.registry ??
      []) {
      visit(dependency)
    }
    visiting.delete(key)
    visited.add(key)
    selections.push(selection)
  }

  visit(reference)

  const npmDependencies = new Set<string>()
  const devNpmDependencies = new Set<string>()
  for (const selection of selections) {
    for (const dependency of selection.definition.dependencies?.npm ?? []) {
      npmDependencies.add(dependency)
    }
    for (const dependency of selection.definition.dependencies?.devNpm ?? []) {
      devNpmDependencies.add(dependency)
    }
  }

  return {
    selections,
    npmDependencies: [...npmDependencies].sort(),
    devNpmDependencies: [...devNpmDependencies].sort(),
  }
}
