import type { Metadata } from 'next'
import { DownloadAuthPage } from '@/globals/Pages/Downloads/DownloadAuthPage'
import { DownloadsPage } from '@/globals/Pages/Downloads/DownloadsPage'
import type { DownloadsPage as DownloadsPageType } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { isDownloadsAuthenticated } from './actions'

export const metadata: Metadata = {
  title: 'Ke stažení',
  description:
    'Materiály a dokumenty ke stažení – formuláře, informační letáky a další podklady od porodní asistentky.',
}

export default async function Page() {
  const data = (await getGlobal('downloadsPage', 1)) as DownloadsPageType
  const isAuthenticated = await isDownloadsAuthenticated()

  if (!isAuthenticated) {
    return <DownloadAuthPage data={data} />
  }

  return <DownloadsPage data={data} />
}
