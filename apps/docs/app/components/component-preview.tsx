"use client"

import { useState } from "react"
import type { ComponentDoc } from "../lib/catalog"
import {
  ArrowUpRight,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  SearchIcon,
} from "./icons"

const options = ["React", "Next.js", "Vite", "Astro"]

export function ComponentPreview({
  component,
  variantId,
}: {
  component: ComponentDoc
  variantId: string
}) {
  const [progress, setProgress] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [comboOpen, setComboOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>(["React"])
  const [toastShown, setToastShown] = useState(false)
  const variant =
    component.variants.find((item) => item.id === variantId) ??
    component.variants[0]

  if (component.slug === "button")
    return (
      <div className={"preview-stage preview-" + variant.id}>
        <button
          className="demo-button"
          onClick={() => setProgress((value) => (value === 100 ? 0 : 100))}
        >
          {variant.id === "glass"
            ? "Open workspace"
            : variant.id === "animated"
              ? "Save changes"
              : "Continue"}
          <ArrowUpRight />
        </button>
        {progress === 100 && (
          <span className="preview-feedback">
            <CheckIcon /> Action completed
          </span>
        )}
      </div>
    )

  if (component.slug === "stateful-button")
    return (
      <div className="preview-stage">
        <button
          className="demo-button stateful-demo"
          onClick={() =>
            setProgress((value) =>
              value >= 100 ? 0 : Math.min(value + 25, 100),
            )
          }
        >
          <span
            className="progress-fill"
            style={{ transform: "scaleX(" + progress / 100 + ")" }}
          />
          <span className="demo-button-label">
            {progress >= 100
              ? "Complete"
              : progress > 0
                ? "Uploading " + progress + "%"
                : "Upload file"}
          </span>
        </button>
        <span className="preview-hint">Click to advance state</span>
      </div>
    )

  if (component.slug === "dialog" || component.slug === "alert-dialog")
    return (
      <div className="preview-stage">
        <button className="demo-button" onClick={() => setDialogOpen(true)}>
          Open {component.title}
          <ArrowUpRight />
        </button>
        {dialogOpen && (
          <div
            className="demo-modal-backdrop"
            role="presentation"
            onMouseDown={() => setDialogOpen(false)}
          >
            <section
              className="demo-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="preview-dialog-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                className="modal-close"
                aria-label="Close dialog"
                onClick={() => setDialogOpen(false)}
              >
                <CloseIcon />
              </button>
              <span className="component-kicker">
                {component.slug === "alert-dialog" ? "Confirmation" : "Preview"}
              </span>
              <h3 id="preview-dialog-title">
                {component.slug === "alert-dialog"
                  ? "Delete this project?"
                  : "Account settings"}
              </h3>
              <p>
                {component.slug === "alert-dialog"
                  ? "This action cannot be undone. Review the choice before continuing."
                  : "Manage your profile and workspace preferences from one focused surface."}
              </p>
              <div className="modal-actions">
                <button
                  className="secondary-action"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="primary-action"
                  onClick={() => setDialogOpen(false)}
                >
                  {component.slug === "alert-dialog"
                    ? "Continue"
                    : "Save changes"}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    )

  if (component.slug === "combobox") {
    const visibleOptions = options.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase()),
    )
    const multiple = variant.id === "multiple"
    return (
      <div className="preview-stage">
        <div className="demo-combobox-wrap">
          <button
            className="demo-combobox"
            aria-expanded={comboOpen}
            onClick={() => setComboOpen((value) => !value)}
          >
            <span>
              {multiple
                ? selected.join(", ")
                : (selected[0] ?? "Choose a framework")}
            </span>
            <ChevronDownIcon />
          </button>
          {comboOpen && (
            <div className="demo-combobox-menu">
              {(variant.id === "searchable" || variant.id === "async") && (
                <label className="combo-search">
                  <SearchIcon />
                  <input
                    autoFocus
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search frameworks"
                  />
                </label>
              )}
              {visibleOptions.map((option) => (
                <button
                  className="combo-option"
                  key={option}
                  onClick={() => {
                    setSelected((current) =>
                      multiple
                        ? current.includes(option)
                          ? current.filter((item) => item !== option)
                          : [...current, option]
                        : [option],
                    )
                    if (!multiple) setComboOpen(false)
                  }}
                >
                  <span>{option}</span>
                  {selected.includes(option) && <CheckIcon />}
                </button>
              ))}
              {!visibleOptions.length && (
                <span className="combo-empty">No frameworks found.</span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (component.slug === "toaster")
    return (
      <div className="preview-stage">
        <button
          className="demo-button"
          onClick={() => {
            setToastShown(true)
            window.setTimeout(() => setToastShown(false), 2400)
          }}
        >
          Show notification
        </button>
        {toastShown && (
          <div className="demo-toast" role="status">
            <CheckIcon />
            <span>
              <strong>Saved</strong>
              <small>Your changes are up to date.</small>
            </span>
            <button
              aria-label="Dismiss notification"
              onClick={() => setToastShown(false)}
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    )

  return (
    <div className="preview-stage">
      <button className="demo-button">
        Preview {component.title}
        <ArrowUpRight />
      </button>
    </div>
  )
}
