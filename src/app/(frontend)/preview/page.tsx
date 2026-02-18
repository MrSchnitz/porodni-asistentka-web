import { getWeeklyScheduleItems, dayNames } from '@/app/(frontend)/aktualni-sluzby/actions'
import { PreviewRenderer } from '@/components/LivePreview/PreviewRenderer'
import { getDocument } from '@/utilities/getDocument'
import { getGlobal } from '@/utilities/getGlobals'
import type { Blog, Config, Service } from '@/payload-types'
import { notFound } from 'next/navigation'

type SearchParams = Promise<{ global?: string; collection?: string; slug?: string } | null>

type GlobalSlug = keyof Config['globals']

/** Globály podporované v /preview (client-side Live Preview v reálném čase). */
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

/** Kolekce podporované v /preview. */
const PREVIEW_COLLECTIONS = {
  services: { depth: 3 },
  blogs: { depth: 2 },
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

  if (collection && slug && collection in PREVIEW_COLLECTIONS) {
    const collConfig = PREVIEW_COLLECTIONS[collection as keyof typeof PREVIEW_COLLECTIONS]
    const initialData = await getDocument(
      collection as 'services' | 'blogs',
      slug,
      collConfig.depth,
    )
    if (!initialData) notFound()

    if (collection === 'services') {
      return (
        <PreviewRenderer
          collection="services"
          initialData={initialData as Service}
          depth={collConfig.depth}
        />
      )
    }

    if (collection === 'blogs') {
      return (
        <PreviewRenderer
          collection="blogs"
          initialData={initialData as Blog}
          depth={collConfig.depth}
        />
      )
    }
  }

  notFound()
}
