import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const roots = ["apps", "packages", "registry"]
const missing = []

for (const root of roots) {
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const readme = join(root, entry.name, "README.md")
    if (!existsSync(readme)) missing.push(readme)
  }
}

if (missing.length) {
  console.error(
    "Missing README.md files:\n" +
      missing.map((file) => `- ${file}`).join("\n"),
  )
  process.exit(1)
}

console.log("README coverage passed.")
