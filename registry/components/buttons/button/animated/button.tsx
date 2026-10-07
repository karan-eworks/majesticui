"use client"

import { motion } from "framer-motion"
import type { ComponentProps } from "react"

export function Button(props: ComponentProps<typeof motion.button>) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
      {...props}
    />
  )
}
