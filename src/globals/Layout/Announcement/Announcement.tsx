import { Announcement as AnnouncementType } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { AnnouncementBanner } from './components/AnnouncementBanner'
import { AnnouncementModal } from './components/AnnouncementModal'

export async function Announcement() {
  const data = (await getGlobal('announcement', 1)) as AnnouncementType

  if (!data) return null

  return (
    <>
      {data.bannerEnabled && data.banner && (
        <AnnouncementBanner id={data.id} {...data.banner} />
      )}
      {data.modalEnabled && data.modal && (
        <AnnouncementModal id={data.id} {...data.modal} />
      )}
    </>
  )
}

