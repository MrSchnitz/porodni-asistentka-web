import type { Metadata } from 'next'
import { LecturesPageContent } from '@/features/lectures/LecturesPageContent'
import type { LecturesPage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

export const metadata: Metadata = {
  title: 'Přednášky',
  description: 'Termíny a informace k přednáškám a vzdělávacím akcím porodní asistentky.',
}

export default async function Page() {
  const data = (await getGlobal('lecturesPage', 1)) as LecturesPage
  return <LecturesPageContent data={data} />
}
