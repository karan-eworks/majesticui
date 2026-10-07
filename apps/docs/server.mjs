import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { join } from "node:path"

const root = fileURLToPath(new URL(".", import.meta.url))
const port = Number(process.env.PORT || 3000)

createServer(async (request, response) => {
  if (request.url !== "/" && request.url !== "/index.html") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" })
    response.end("Not found")
    return
  }

  const html = await readFile(join(root, "index.html"), "utf8")
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" })
  response.end(html)
}).listen(port, () => {
  console.log("MajesticUI preview: http://localhost:" + port)
})
