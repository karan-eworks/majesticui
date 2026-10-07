import Link from "next/link"

export default function InstallationPage() {
  return (
    <div className="docs-home">
      <div className="breadcrumb">
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span>Installation</span>
      </div>
      <h1>Installation</h1>
      <p className="lead">
        Add source-owned MajesticUI components to the project you already have.
        The CLI copies the selected implementation and its exact dependencies.
      </p>
      <section className="content-section">
        <div className="section-label">CLI workflow</div>
        <div className="docs-links">
          <div>
            <strong>1. Configure the project</strong>
            <span>
              Run <code>majestic init</code> once.
            </span>
          </div>
          <div>
            <strong>2. Add a component</strong>
            <span>
              Run <code>majestic add button</code> or select a variant.
            </span>
          </div>
          <div>
            <strong>3. Review the generated files</strong>
            <span>Every component remains local and editable.</span>
          </div>
        </div>
      </section>
      <section className="content-section">
        <div className="section-label">Examples</div>
        <div className="docs-links">
          <Link href="/docs/components/button">
            Install Button <span>→</span>
          </Link>
          <Link href="/docs/components/dialog">
            Install Dialog <span>→</span>
          </Link>
          <Link href="/docs/components/combobox">
            Install Combobox <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
