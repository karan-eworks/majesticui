export function clampProgress(progress: number): number {
  return Math.max(0, Math.min(100, progress))
}
