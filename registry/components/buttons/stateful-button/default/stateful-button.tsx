"use client"

import { useState } from "react"
import type { ButtonHTMLAttributes } from "react"

export function StatefulButton({
  children = "Submit",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [pending, setPending] = useState(false)
  return (
    <button
      {...props}
      disabled={pending || props.disabled}
      onClick={(event) => {
        setPending(true)
        props.onClick?.(event)
      }}
    >
      {pending ? "Working…" : children}
    </button>
  )
}
