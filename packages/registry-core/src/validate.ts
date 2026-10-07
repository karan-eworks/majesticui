import { resolve } from "node:path"
import { loadRegistry } from "./index"

const path = resolve(
  process.cwd(),
  "../../registry/components/buttons/registry.json",
)
const registry = loadRegistry(path)
console.log(
  "Validated " +
    Object.keys(registry.catalog.families).length +
    " registry families.",
)
