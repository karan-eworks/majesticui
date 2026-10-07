export interface MajesticConfig {
  framework: "auto" | "react" | "next" | "vite"
  typescript: boolean | "auto"
  packageManager: "auto" | "npm" | "pnpm" | "yarn" | "bun"
  paths: {
    components: string
    ui: string
    blocks: string
    features: string
    hooks: string
    lib: string
    styles: string
    public: string
  }
  conflicts: { defaultAction: "keep" | "prompt" }
}

export const defaultConfig: MajesticConfig = {
  framework: "auto",
  typescript: "auto",
  packageManager: "auto",
  paths: {
    components: "src/components",
    ui: "src/components/ui",
    blocks: "src/components/blocks",
    features: "src/features",
    hooks: "src/hooks",
    lib: "src/lib",
    styles: "src/styles",
    public: "public",
  },
  conflicts: { defaultAction: "keep" },
}

export function mergeConfig(
  input: Partial<MajesticConfig> & { paths?: Partial<MajesticConfig["paths"]> },
): MajesticConfig {
  return {
    ...defaultConfig,
    ...input,
    paths: { ...defaultConfig.paths, ...input.paths },
    conflicts: { ...defaultConfig.conflicts, ...input.conflicts },
  }
}
