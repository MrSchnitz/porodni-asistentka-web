import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

const baseUrl = getServerSideURL()

const staticRoutes: string[] = [
  '',
  '/sluzby',
  '/blog',
  '/kontakt',
  '/o-mne',
  '/ke-stazeni',
  '/aktualni-sluzby',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const [blogResult, servicesResult] = await Promise.all([
    payload.find({
      collection: 'blogs',
      limit: 5000,
      depth: 0,
      where: { publishedAt: { exists: true, not_equals: null } },
    }),
    payload.find({
      collection: 'services',
      limit: 5000,
      depth: 0,
    }),
  ])

  const blogSlugs = blogResult.docs.filter((doc) => doc.slug).map((doc) => `/blog/${doc.slug}`)
  const serviceSlugs = (servicesResult.docs as { slug: string }[])
    .filter((doc) => doc.slug)
    .map((doc) => `/sluzby/${doc.slug}`)

  const lastModified = new Date()

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.8,
    })),
    ...blogSlugs.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...serviceSlugs.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]

  return entries
}
