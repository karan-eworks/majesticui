"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { components } from "../lib/catalog"
import { SearchIcon } from "./icons"
import { ThemeToggle } from "./theme-toggle"

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const filtered = useMemo(
    () =>
      components.filter((item) =>
        (item.title + item.description)
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  )
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        inputRef.current?.focus()
      }
      if (event.key === "Escape") {
        setQuery("")
        inputRef.current?.blur()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="brand-mark">M</span> majestic<span>ui</span>
        </Link>
        <div className="topbar-actions">
          <label className="search">
            <SearchIcon />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components..."
              aria-label="Search components"
            />
            <kbd>⌘ K</kbd>
            {query && (
              <div className="search-results" role="listbox">
                {filtered.length ? (
                  filtered.map((item) => (
                    <Link
                      key={item.slug}
                      href={"/docs/components/base/" + item.slug}
                      onClick={() => setQuery("")}
                    >
                      <strong>{item.title}</strong>
                      <small>
                        {item.category} · {item.description}
                      </small>
                    </Link>
                  ))
                ) : (
                  <span>No components found.</span>
                )}
              </div>
            )}
          </label>
          <Link className="toplink" href="/docs">
            Docs
          </Link>
          <a
            className="toplink"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <ThemeToggle />
        </div>
      </header>
      <div className="docs-layout">
        <aside className="sidebar">
          <div className="sidebar-heading">Explore</div>
          <nav className="side-nav">
            <Link href="/docs" className="nav-link">
              Introduction
            </Link>
            <Link href="/docs/components" className="nav-link active">
              Components
            </Link>
            <Link href="/docs/installation" className="nav-link">
              Installation
            </Link>
            <Link href="/docs/registry" className="nav-link">
              Registry
            </Link>
          </nav>
          <div className="sidebar-heading sidebar-heading-spaced">
            Components
          </div>
          <nav className="side-nav">
            {filtered.map((item) => (
              <Link
                key={item.slug}
                href={"/docs/components/base/" + item.slug}
                className="nav-link"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="sidebar-note">
            <span className="status-dot" /> Registry synced
            <br />
            <small>v0.1 · source-owned</small>
          </div>
        </aside>
        <main className="content">{children}</main>
      </div>
    </div>
  )
}
