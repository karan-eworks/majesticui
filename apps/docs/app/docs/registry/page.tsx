import Link from "next/link"
import { components } from "../../lib/catalog"

export default function RegistryPage() {
  return (
    <div className="docs-home">
      <div className="breadcrumb">
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span>Registry</span>
      </div>
      <h1>Registry</h1>
      <p className="lead">
        The registry is the source of truth for component files, variants,
        dependencies, framework support, and preview metadata.
      </p>
      <section className="content-section">
        <div className="section-label">
          Published families <span>{components.length} available</span>
        </div>
        <div className="component-index">
          {components.map((component) => (
            <Link
              href={"/docs/components/base/" + component.slug}
              key={component.slug}
            >
              <span>
                <strong>{component.title}</strong>
                <small>
                  {component.variants.length} variants · {component.status}
                </small>
              </span>
              <span className="index-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
