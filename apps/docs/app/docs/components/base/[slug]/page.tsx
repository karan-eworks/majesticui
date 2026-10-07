import { notFound } from "next/navigation"
import { ComponentPage } from "../../../../components/component-page"
import { components, getComponent } from "../../../../lib/catalog"

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.slug }))
}

export default async function ComponentRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const component = getComponent(slug)
  if (!component) notFound()
  return <ComponentPage component={component} />
}
