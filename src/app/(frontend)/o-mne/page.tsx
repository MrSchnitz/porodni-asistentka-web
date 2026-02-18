import type { Metadata } from 'next'
import { AboutPageContent } from '@/globals/Pages/About/AboutPageContent'
import type { AboutPage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

export const metadata: Metadata = {
  title: 'O mně',
  description:
    'Představení porodní asistentky – vzdělání, zkušenosti a přístup k péči o těhotné a rodiny.',
}

export default async function Page() {
  const data = (await getGlobal('aboutPage', 1)) as AboutPage
  return <AboutPageContent data={data} />
}
