import { access, mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { defaultConfig, type MajesticConfig } from "../../config/src/index"
import type { ResolvedPlan } from "../../resolver/src/index"
import {
  addClientDirective,
  checksum,
  expandTarget,
} from "../../transformers/src/index"

export interface InstallOptions {
  root: string
  sourceRoot: string
  plan: ResolvedPlan
  config?: MajesticConfig
  dryRun?: boolean
  overwrite?: boolean
  skipExisting?: boolean
  force?: boolean
}

export interface InstallFileResult {
  path: string
  status: "installed" | "planned" | "unchanged" | "skipped" | "modified"
}

export interface InstallResult {
  files: InstallFileResult[]
  styles: InstallFileResult[]
  manifestPath: string
}

interface ManifestEntry {
  family: string
  variant: string
  version?: string
  files: Array<{ path: string; checksum: string }>
  styles: string[]
  npmDependencies: string[]
}

interface Manifest {
  version: 1
  installed: Record<string, ManifestEntry>
}

const emptyManifest: Manifest = { version: 1, installed: {} }

async function exists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function loadManifest(path: string): Promise<Manifest> {
  if (!(await exists(path))) return structuredClone(emptyManifest)
  return JSON.parse(await readFile(path, "utf8")) as Manifest
}

function manifestChecksum(
  manifest: Manifest,
  path: string,
): string | undefined {
  for (const entry of Object.values(manifest.installed)) {
    const file = entry.files.find((item) => item.path === path)
    if (file) return file.checksum
  }
  return undefined
}

export async function installPlan(
  options: InstallOptions,
): Promise<InstallResult> {
  const config = options.config ?? defaultConfig
  const manifestPath = join(options.root, ".majestic/manifest.json")
  const manifest = await loadManifest(manifestPath)
  const files: InstallFileResult[] = []
  const styles: InstallFileResult[] = []

  for (const selection of options.plan.selections) {
    const entryFiles: Array<{ path: string; checksum: string }> = []
    const entryStyles: string[] = []

    for (const file of selection.definition.files) {
      const relativePath = expandTarget(file.target, config.paths)
      const targetPath = resolve(options.root, relativePath)
      const sourcePath = resolve(options.sourceRoot, file.source)
      const targetExists = await exists(targetPath)
      let status: InstallFileResult["status"] = targetExists
        ? "modified"
        : "installed"

      if (targetExists) {
        const current = await readFile(targetPath, "utf8")
        const tracked = manifestChecksum(manifest, relativePath)
        status =
          tracked && tracked === checksum(current) ? "unchanged" : "modified"
      }

      const canWrite =
        !targetExists ||
        options.overwrite ||
        (options.force && status === "modified")
      if (options.dryRun) status = "planned"
      else if (targetExists && options.skipExisting) status = "skipped"
      else if (!canWrite)
        status = status === "unchanged" ? "unchanged" : "modified"

      if (
        !options.dryRun &&
        canWrite &&
        !(targetExists && options.skipExisting)
      ) {
        let content = await readFile(sourcePath, "utf8")
        if (selection.definition.client === true || file.client === true) {
          content = addClientDirective(content)
        }
        await mkdir(resolve(targetPath, ".."), { recursive: true })
        await writeFile(targetPath, content)
        status = "installed"
      }

      if (
        status === "installed" ||
        status === "planned" ||
        status === "unchanged"
      ) {
        const content = options.dryRun
          ? await readFile(sourcePath, "utf8")
          : await readFile(targetPath, "utf8").catch(() =>
              readFile(sourcePath, "utf8"),
            )
        entryFiles.push({ path: relativePath, checksum: checksum(content) })
      }
      files.push({ path: relativePath, status })
    }

    for (const style of selection.definition.styles ?? []) {
      const relativePath = expandTarget(
        style.target ?? style.source,
        config.paths,
      )
      const targetPath = resolve(options.root, relativePath)
      const sourcePath = resolve(options.sourceRoot, style.source)
      const mode = style.mode === "file" ? "copy" : style.mode
      const targetExists = await exists(targetPath)
      let status: InstallFileResult["status"] = targetExists
        ? "modified"
        : "installed"
      if (options.dryRun) status = "planned"
      if (
        !options.dryRun &&
        (!targetExists || options.overwrite || options.force)
      ) {
        const content = await readFile(sourcePath, "utf8")
        const output =
          mode === "merge" && targetExists
            ? (await readFile(targetPath, "utf8")) + "\n" + content
            : content
        await mkdir(resolve(targetPath, ".."), { recursive: true })
        await writeFile(targetPath, output)
        status = "installed"
      } else if (!options.dryRun && targetExists && options.skipExisting) {
        status = "skipped"
      }
      if (status === "installed" || status === "planned") {
        entryStyles.push(relativePath)
      }
      styles.push({ path: relativePath, status })
    }

    if (!options.dryRun) {
      manifest.installed[selection.family] = {
        family: selection.family,
        variant: selection.variant,
        version: selection.definition.version,
        files: entryFiles,
        styles: entryStyles,
        npmDependencies: selection.definition.dependencies?.npm ?? [],
      }
    }
  }

  if (!options.dryRun) {
    await mkdir(resolve(manifestPath, ".."), { recursive: true })
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n")
  }

  return { files, styles, manifestPath }
}
