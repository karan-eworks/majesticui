"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "./icons"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const stored = window.localStorage.getItem("majesticui-theme")
    if (stored === "dark") setDark(true)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light"
    window.localStorage.setItem("majesticui-theme", dark ? "dark" : "light")
  }, [dark])
  return (
    <button
      className="icon-button"
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      onClick={() => setDark((value) => !value)}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
