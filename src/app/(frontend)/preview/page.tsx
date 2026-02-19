import { getWeeklyScheduleItems, dayNames } from '@/app/(frontend)/aktualni-sluzby/actions'
import { PreviewRenderer } from '@/components/LivePreview/PreviewRenderer'
import { getDocument, getDocumentById } from '@/utilities/getDocument'
import { getGlobal } from '@/utilities/getGlobals'
import type { Blog, Config, Review, Service } from '@/payload-types'
import { notFound } from 'next/navigation'

type SearchParams = Promise<{
  global?: string
  collection?: string
  slug?: string
  id?: string
} | null>

type GlobalSlug = keyof Config['globals']

/** Globals supported in /preview (client-side Live Preview in real time). */
const PREVIEW_GLOBALS: Partial<Record<GlobalSlug, { depth: number }>> = {
  homePage: { depth: 2 },
  servicesPage: { depth: 3 },
  weeklyScheduledServicesPage: { depth: 2 },
  aboutPage: { depth: 1 },
  contactPage: { depth: 1 },
  downloadsPage: { depth: 1 },
  blogPage: { depth: 2 },
  header: { depth: 1 },
  footer: { depth: 2 },
  announcement: { depth: 1 },
}

/** Collections supported in /preview. */
const PREVIEW_COLLECTIONS = {
  services: { depth: 3 },
  blogs: { depth: 2 },
  reviews: { depth: 1 },
} as const

export default async function PreviewPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const globalSlug = params?.global as GlobalSlug | undefined
  const collection = params?.collection
  const slug = params?.slug

  if (globalSlug && globalSlug in PREVIEW_GLOBALS) {
    const config = PREVIEW_GLOBALS[globalSlug]
    if (!config) notFound()

    const initialData = await getGlobal(globalSlug, config.depth)

    if (globalSlug === 'weeklyScheduledServicesPage') {
      const { weeklySchedule, dayDates } = await getWeeklyScheduleItems()
      return (
        <PreviewRenderer
          global={globalSlug}
          initialData={initialData}
          depth={config.depth}
          weeklySchedule={weeklySchedule}
          dayDates={dayDates}
          dayNames={dayNames}
        />
      )
    }

    return <PreviewRenderer global={globalSlug} initialData={initialData} depth={config.depth} />
  }

  if (collection && collection in PREVIEW_COLLECTIONS) {
    const collConfig = PREVIEW_COLLECTIONS[collection as keyof typeof PREVIEW_COLLECTIONS]
    let initialData: Awaited<ReturnType<typeof getDocument>> | null = null
    switch (collection) {
      case 'reviews':
        initialData = params?.id
          ? await getDocumentById('reviews', params.id, collConfig.depth)
          : null
        break
      case 'services':
      case 'blogs':
        initialData = slug ? await getDocument(collection, slug, collConfig.depth) : null
        break
    }
    if (!initialData) notFound()

    switch (collection) {
      case 'services':
        return (
          <PreviewRenderer
            collection="services"
            initialData={initialData as Service}
            depth={collConfig.depth}
          />
        )
      case 'blogs':
        return (
          <PreviewRenderer
            collection="blogs"
            initialData={initialData as Blog}
            depth={collConfig.depth}
          />
        )
      case 'reviews':
        return (
          <PreviewRenderer
            collection="reviews"
            initialData={initialData as Review}
            depth={collConfig.depth}
          />
        )
      default:
        notFound()
    }
  }

  notFound()
}
