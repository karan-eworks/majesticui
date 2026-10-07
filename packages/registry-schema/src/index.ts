export type RegistryItemType = "component" | "hook" | "utility" | "block"
export type RegistryFileType =
  "component" | "hook" | "utility" | "style" | "asset" | "config" | "other"
export type RegistryStyleMode = "copy" | "file" | "merge" | "inline"
export type ClientRequirement = boolean | "auto"

export interface RegistryFile {
  source: string
  target: string
  type: RegistryFileType
  client?: boolean
  transform?: boolean
}

export interface RegistryStyle {
  source: string
  target?: string
  mode: RegistryStyleMode
  scope?: "component" | "global" | "theme"
}

export interface RegistryDependencies {
  npm?: string[]
  devNpm?: string[]
  registry?: string[]
  styles?: string[]
  themes?: string[]
  assets?: string[]
}

export interface RegistryVariant {
  version?: string
  contract?: string
  client?: ClientRequirement
  dependencies?: RegistryDependencies
  files: RegistryFile[]
  styles?: RegistryStyle[]
  description?: string
  tags?: string[]
}

export interface RegistryFamily {
  name: string
  type: RegistryItemType
  title: string
  description?: string
  defaultVariant: string
  variants: Record<string, RegistryVariant>
  tags?: string[]
  categories?: string[]
}

export interface RegistryCatalog {
  schemaVersion: number
  families: Record<string, RegistryFamily>
}

const styleModes = new Set<RegistryStyleMode>([
  "copy",
  "file",
  "merge",
  "inline",
])
const fileTypes = new Set<RegistryFileType>([
  "component",
  "hook",
  "utility",
  "style",
  "asset",
  "config",
  "other",
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function requireString(value: unknown, label: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(label + " must be a non-empty string")
  }
}

function validateVariant(
  value: unknown,
  label: string,
): asserts value is RegistryVariant {
  if (!isRecord(value)) throw new Error(label + " must be an object")
  if (!Array.isArray(value.files))
    throw new Error(label + ".files must be an array")

  for (const [index, file] of value.files.entries()) {
    const fileLabel = label + ".files[" + index + "]"
    if (!isRecord(file)) throw new Error(fileLabel + " must be an object")
    requireString(file.source, fileLabel + ".source")
    requireString(file.target, fileLabel + ".target")
    if (
      typeof file.type !== "string" ||
      !fileTypes.has(file.type as RegistryFileType)
    ) {
      throw new Error(fileLabel + ".type is invalid")
    }
  }

  if (value.styles !== undefined) {
    if (!Array.isArray(value.styles))
      throw new Error(label + ".styles must be an array")
    for (const [index, style] of value.styles.entries()) {
      const styleLabel = label + ".styles[" + index + "]"
      if (!isRecord(style)) throw new Error(styleLabel + " must be an object")
      requireString(style.source, styleLabel + ".source")
      if (
        typeof style.mode !== "string" ||
        !styleModes.has(style.mode as RegistryStyleMode)
      ) {
        throw new Error(styleLabel + ".style mode is invalid")
      }
    }
  }
}

export function validateRegistryCatalog(value: unknown): RegistryCatalog {
  if (!isRecord(value)) throw new Error("registry catalog must be an object")
  if (typeof value.schemaVersion !== "number") {
    throw new Error("registry schemaVersion must be a number")
  }
  if (!isRecord(value.families))
    throw new Error("registry families must be an object")

  for (const [name, family] of Object.entries(value.families)) {
    const familyLabel = "family " + name
    if (!isRecord(family)) throw new Error(familyLabel + " must be an object")
    requireString(family.name, familyLabel + ".name")
    requireString(family.defaultVariant, familyLabel + ".defaultVariant")
    if (!isRecord(family.variants)) {
      throw new Error(familyLabel + ".variants must be an object")
    }
    if (!(family.defaultVariant in family.variants)) {
      throw new Error(familyLabel + " default variant is missing")
    }
    for (const [variantName, variant] of Object.entries(family.variants)) {
      validateVariant(variant, familyLabel + " variant " + variantName)
    }
  }

  return value as unknown as RegistryCatalog
}
