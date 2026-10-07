import { redirect } from "next/navigation"

export default async function ComponentAliasPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect("/docs/components/base/" + slug)
}
