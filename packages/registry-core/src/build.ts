import { copyFile, mkdir } from "node:fs/promises"
import { resolve } from "node:path"

const source = resolve(
  process.cwd(),
  "../../registry/components/buttons/registry.json",
)
const destination = resolve(process.cwd(), "../../registry/index.json")
await mkdir(resolve(destination, ".."), { recursive: true })
await copyFile(source, destination)
console.log("Built registry/index.json")
