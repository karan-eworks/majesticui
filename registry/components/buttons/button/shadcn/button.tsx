import { Slot } from "@radix-ui/react-slot"
import type { ButtonHTMLAttributes } from "react"

export function Button({
  asChild = false,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const Component = asChild ? Slot : "button"
  return (
    <Component
      className={
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
        className
      }
      {...props}
    />
  )
}
