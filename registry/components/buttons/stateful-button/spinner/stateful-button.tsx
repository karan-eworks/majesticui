"use client"

import { LoaderCircle } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

export function StatefulButton({
  loading = false,
  children = "Submit",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <LoaderCircle className="animate-spin" aria-label="Loading" size={16} />
      ) : (
        children
      )}
    </button>
  )
}
