"use client"

import Link from "next/link"
import { useState } from "react"
import type { ComponentDoc } from "../lib/catalog"
import { CodeBlock } from "./code-block"
import { ComponentPreview } from "./component-preview"

export function ComponentPage({ component }: { component: ComponentDoc }) {
  const [variantId, setVariantId] = useState(component.variants[0].id)
  const [view, setView] = useState<"preview" | "code">("preview")
  const [installMode, setInstallMode] = useState<"command" | "manual">(
    "command",
  )
  const variant =
    component.variants.find((item) => item.id === variantId) ??
    component.variants[0]
  return (
    <div className="component-page">
      <div className="breadcrumb">
        <Link href="/docs/components">Components</Link>
        <span>/</span>
        <span>{component.title}</span>
      </div>
      <div className="component-heading">
        <div>
          <div className="component-kicker">{component.category} component</div>
          <h1>{component.title}</h1>
          <p>{component.description}</p>
        </div>
        <div className="support-badges">
          <span>React</span>
          <span>Next.js</span>
          <span className={variant.client ? "client-badge" : ""}>
            {variant.client ? "Client Component" : "Server-compatible"}
          </span>
        </div>
      </div>
      <section className="variant-section">
        <div className="section-label">
          Variants <span>{component.variants.length} available</span>
        </div>
        <div className="variant-tabs" role="tablist">
          {component.variants.map((item) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={item.id === variant.id}
              className={
                item.id === variant.id ? "variant-tab selected" : "variant-tab"
              }
              onClick={() => setVariantId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="variant-description">{variant.description}</p>
      </section>
      <section className="showcase-section">
        <div className="section-label">
          Preview <span>Interactive</span>
        </div>
        <div className="preview-tabs" role="tablist">
          <button
            className={
              view === "preview" ? "preview-tab selected" : "preview-tab"
            }
            onClick={() => setView("preview")}
          >
            Preview
          </button>
          <button
            className={view === "code" ? "preview-tab selected" : "preview-tab"}
            onClick={() => setView("code")}
          >
            Code
          </button>
        </div>
        {view === "preview" ? (
          <ComponentPreview component={component} variantId={variant.id} />
        ) : (
          <CodeBlock code={variant.code} />
        )}
      </section>
      <div className="detail-grid">
        <section>
          <div className="section-label">
            Installation{" "}
            <span>{installMode === "command" ? "CLI" : "Manual"}</span>
          </div>
          <div className="install-tabs">
            <button
              className={
                installMode === "command"
                  ? "install-tab selected"
                  : "install-tab"
              }
              onClick={() => setInstallMode("command")}
            >
              Command
            </button>
            <button
              className={
                installMode === "manual"
                  ? "install-tab selected"
                  : "install-tab"
              }
              onClick={() => setInstallMode("manual")}
            >
              Manual
            </button>
          </div>
          {installMode === "command" ? (
            <>
              <CodeBlock code={variant.command} language="bash" />
              <p className="muted">
                Installs only the selected variant and its declared
                dependencies.
              </p>
            </>
          ) : (
            <ol className="manual-steps">
              <li>Install the selected npm dependencies.</li>
              <li>Copy the registry files into your UI directory.</li>
              <li>Merge associated styles and theme tokens.</li>
              <li>
                Add <code>{variant.client ? '"use client"' : ""}</code> when the
                selected variant requires client behavior.
              </li>
            </ol>
          )}
        </section>
        <section>
          <div className="section-label">Dependencies</div>
          <div className="dependency-list">
            {variant.dependencies.length ? (
              variant.dependencies.map((dependency) => (
                <span key={dependency}>{dependency}</span>
              ))
            ) : (
              <span className="empty-dependency">No additional packages</span>
            )}
          </div>
          {variant.styles.length > 0 && (
            <>
              <div className="section-label style-label">Styles</div>
              <div className="dependency-list">
                {variant.styles.map((style) => (
                  <span key={style}>{style}</span>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
      <section className="content-section">
        <div className="section-label">
          Usage{" "}
          <span>{variant.client ? "Client component" : "TypeScript"}</span>
        </div>
        <CodeBlock code={variant.code} />
      </section>
      <section className="content-section">
        <div className="section-label">
          Examples <span>{variant.examples?.length ?? 1} patterns</span>
        </div>
        <div className="example-list">
          {(variant.examples ?? ["Default usage"]).map((example) => (
            <div className="example-row" key={example}>
              <span>{example}</span>
              <button onClick={() => setView("preview")}>View preview</button>
            </div>
          ))}
        </div>
      </section>
      <section className="content-section">
        <div className="section-label">Customization</div>
        <div className="customization-grid">
          <span>
            Colors<small>Theme tokens</small>
          </span>
          <span>
            Size<small>sm · md · lg</small>
          </span>
          <span>
            Radius<small>Uses project radius</small>
          </span>
          <span>
            Accessibility<small>Keyboard and focus ready</small>
          </span>
        </div>
      </section>
      {(variant.animation || variant.icons?.length) && (
        <section className="content-section">
          <div className="section-label">Motion & icons</div>
          {variant.animation && <p className="muted">{variant.animation}</p>}
          {variant.icons?.map((icon) => (
            <span className="metadata-chip" key={icon}>
              {icon}
            </span>
          ))}
        </section>
      )}
      <section className="content-section">
        <div className="section-label">API Reference</div>
        <div className="api-table">
          <div className="api-row api-header">
            <span>Prop</span>
            <span>Type</span>
            <span>Default</span>
            <span>Description</span>
          </div>
          {component.api.map((item) => (
            <div className="api-row" key={item.prop}>
              <code>{item.prop}</code>
              <code>{item.type}</code>
              <span>{item.defaultValue}</span>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="content-section">
        <div className="section-label">Accessibility</div>
        <p className="muted">
          The preview and generated component preserve semantic controls,
          visible focus, keyboard access, and status announcements for dynamic
          states.
        </p>
      </section>
      <section className="related-section">
        <div className="section-label">Related components</div>
        <div className="related-links">
          {component.related.map((item) => (
            <Link
              href={
                "/docs/components/base/" +
                item.toLowerCase().replaceAll(" ", "-")
              }
              key={item}
            >
              {item}
              <span>↗</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
