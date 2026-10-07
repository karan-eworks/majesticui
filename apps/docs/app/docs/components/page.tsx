import Link from "next/link"
import { components } from "../../lib/catalog"

export default function ComponentsIndex() {
  return (
    <div className="docs-home">
      <div className="breadcrumb">
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span>Components</span>
      </div>
      <div className="component-kicker">Component library</div>
      <h1>Components that stay yours.</h1>
      <p className="lead">
        Every component is source-owned, documented, previewable, and
        installable by variant.
      </p>
      <div className="component-index component-index-large">
        {components.map((item) => (
          <Link key={item.slug} href={"/docs/components/base/" + item.slug}>
            <span>
              <small>{item.category}</small>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
            <span className="index-arrow">↗</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
