import type { Metadata } from "next"
import "./globals.css"
import { DocsShell } from "./components/docs-shell"

export const metadata: Metadata = {
  title: "MajesticUI — Source-owned components",
  description:
    "Discover, preview, and install source-owned MajesticUI components.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <DocsShell>{children}</DocsShell>
      </body>
    </html>
  )
}
