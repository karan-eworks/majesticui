import { ArrowRight } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

export function Button({
  children = "Continue",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
      {...props}
    >
      {children}
      <ArrowRight aria-hidden="true" size={16} />
    </button>
  )
}
