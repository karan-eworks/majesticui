"use client"

import { motion } from "framer-motion"
import type { ButtonHTMLAttributes } from "react"

export function StatefulButton({
  progress = 0,
  children = "Upload",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { progress?: number }) {
  return (
    <motion.button
      {...props}
      className="relative overflow-hidden rounded-md px-4 py-2"
      disabled={(progress > 0 && progress < 100) || props.disabled}
    >
      <span className="relative z-10">
        {progress === 100 ? "Complete" : children}
      </span>
      <span
        className="absolute inset-y-0 left-0 bg-white/20"
        style={{ width: progress + "%" }}
      />
    </motion.button>
  )
}
