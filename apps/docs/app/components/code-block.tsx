"use client"

import { useState } from "react"
import { CopyIcon } from "./icons"

export function CodeBlock({
  code,
  language = "tsx",
}: {
  code: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{language}</span>
        <button onClick={copy} className="copy-button">
          <CopyIcon /> {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}
