import Link from "next/link"
import { components } from "../lib/catalog"

export default function DocsHome() {
  return (
    <div className="docs-home">
      <div className="component-kicker">Documentation</div>
      <h1>Everything you need to build with MajesticUI.</h1>
      <p className="lead">
        Explore components, compare variants, and install exactly what your
        project needs.
      </p>
      <div className="docs-home-section">
        <div className="section-label">Start here</div>
        <div className="docs-links">
          <Link href="/docs/components">
            Browse components <span>→</span>
          </Link>
          <Link href="/docs/components/base/button">
            See Button <span>→</span>
          </Link>
          <Link href="/docs/components/base/stateful-button">
            See Stateful Button <span>→</span>
          </Link>
        </div>
      </div>
      <div className="docs-home-section">
        <div className="section-label">Available now</div>
        <div className="component-index">
          {components.map((item) => (
            <Link key={item.slug} href={"/docs/components/base/" + item.slug}>
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <span className="index-arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
