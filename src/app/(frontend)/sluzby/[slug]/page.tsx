import type { Metadata } from 'next'
import { ServiceDetailPage } from '@/globals/Pages/Services/ServiceDetailPage'
import type { Service } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getServerSideURL } from '@/utilities/getURL'
import { extractTextFromRichText } from '@/utilities/richText'
import { truncateMetaDescription } from '@/utilities/meta'

type Props = {
  params: Promise<{ slug: string }>
}

async function getServiceBySlug(slug: string): Promise<Service | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (docs[0] as Service) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Služba nenalezena' }

  const baseUrl = getServerSideURL()
  const title = service.title
  const rawDescription = extractTextFromRichText(service.card?.description)
  const description = rawDescription ? truncateMetaDescription(rawDescription) : `Služba: ${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/sluzby/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/sluzby/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 3,
  })
  const service = docs[0] as Service | undefined
  if (!service) return notFound()

  return <ServiceDetailPage service={service} />
}
