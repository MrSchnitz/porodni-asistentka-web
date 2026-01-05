import { DownloadsPage } from '@/globals/Pages/Downloads/DownloadsPage'
import { DownloadAuthPage } from '@/globals/Pages/Downloads/DownloadAuthPage'
import { DownloadsPage as DownloadsPageType } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { isDownloadsAuthenticated } from './actions'

export default async function Page() {
  const data = (await getGlobal('downloadsPage', 1)) as DownloadsPageType
  const isAuthenticated = await isDownloadsAuthenticated()

  if (!isAuthenticated) {
    return <DownloadAuthPage data={data} />
  }

  return <DownloadsPage data={data} />
}
