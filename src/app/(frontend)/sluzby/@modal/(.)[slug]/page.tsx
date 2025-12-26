import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Service } from '@/payload-types'
import { ServiceDetailModal } from '@/globals/Pages/Services/ServiceDetailModal'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function InterceptedServicePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  })

  const service = docs[0] as Service | undefined

  if (!service) {
    return notFound()
  }

  return <ServiceDetailModal service={service} />
}

