import { readFileSync } from "node:fs"
import {
  validateRegistryCatalog,
  type RegistryCatalog,
  type RegistryFamily,
  type RegistryVariant,
} from "../../registry-schema/src/index"

export interface RegistrySelection {
  family: string
  variant: string
  definition: RegistryVariant
  familyDefinition: RegistryFamily
}

export interface Registry {
  catalog: RegistryCatalog
  resolve(reference: string): RegistrySelection
}

export function createRegistry(input: unknown): Registry {
  const catalog = validateRegistryCatalog(input)

  return {
    catalog,
    resolve(reference) {
      const [familyName, variantName] = reference.split(":")
      const family = catalog.families[familyName]
      if (!family) throw new Error("Unknown registry family: " + familyName)

      const variant = variantName ?? family.defaultVariant
      const definition = family.variants[variant]
      if (!definition) {
        throw new Error(
          "Unknown variant " + variant + " for family " + familyName,
        )
      }

      return {
        family: familyName,
        variant,
        definition,
        familyDefinition: family,
      }
    },
  }
}

export function loadRegistry(path: string): Registry {
  return createRegistry(JSON.parse(readFileSync(path, "utf8")))
}
