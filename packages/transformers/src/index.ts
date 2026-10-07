import { createHash } from "node:crypto"

export interface TargetPaths {
  root?: string
  src?: string
  components?: string
  ui: string
  blocks?: string
  features?: string
  hooks?: string
  lib: string
  styles: string
  public?: string
}

export function expandTarget(target: string, paths: TargetPaths): string {
  return target.replace(/\{\{(\w+)\}\}/g, (token, name: keyof TargetPaths) => {
    return paths[name] ?? token
  })
}

export function addClientDirective(source: string): string {
  const withoutDirective = source.replace(
    /^["']use client["'];?\s*\n?(\s*\n)?/,
    "",
  )
  return '"use client"\n\n' + withoutDirective
}

export function checksum(content: string): string {
  return createHash("sha256").update(content).digest("hex")
}
