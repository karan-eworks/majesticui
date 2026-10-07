import type { ButtonHTMLAttributes } from "react"

export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
        className
      }
      {...props}
    />
  )
}
