import type { ButtonHTMLAttributes } from "react"

export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "inline-flex min-h-10 items-center justify-center rounded-lg border px-5 py-2 text-sm font-semibold shadow-sm " +
        className
      }
      {...props}
    />
  )
}
