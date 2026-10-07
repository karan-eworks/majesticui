import Link from "next/link"
import { ArrowUpRight } from "./components/icons"

export default function Home() {
  return (
    <main className="landing">
      <div className="landing-orbit orbit-one" />
      <div className="landing-orbit orbit-two" />
      <nav className="landing-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">M</span> majestic<span>ui</span>
        </Link>
        <div>
          <Link href="/docs">Documentation</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </nav>
      <section className="landing-hero">
        <div className="component-kicker">Source-owned UI for modern React</div>
        <h1>
          Build with a library
          <br />
          <em>you can own.</em>
        </h1>
        <p>
          MajesticUI brings thoughtful components, focused variants, and
          transparent installation to your codebase.
        </p>
        <div className="hero-actions">
          <Link href="/docs/components/base/button" className="primary-action">
            Explore components <ArrowUpRight />
          </Link>
          <Link href="/docs" className="secondary-action">
            Read the docs
          </Link>
        </div>
      </section>
      <section className="landing-proof">
        <span>Registry-driven</span>
        <span>Variant-aware</span>
        <span>Framework-ready</span>
        <span>Source-first</span>
      </section>
    </main>
  )
}
