import { ServiceDetailPage } from '@/globals/Pages/Services/ServiceDetailPage'
import type { Service } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
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
