'use client'

import type { Announcement as AnnouncementType } from '@/payload-types'
import { AnnouncementBanner } from './components/AnnouncementBanner'
import { AnnouncementModal } from './components/AnnouncementModal'

type Props = {
  data: AnnouncementType
}

export function AnnouncementClient({ data }: Props) {
  if (!data) return null

  return (
    <>
      {data.bannerEnabled && data.banner && <AnnouncementBanner id={data.id} {...data.banner} />}
      {data.modalEnabled && data.modal && <AnnouncementModal id={data.id} {...data.modal} />}
    </>
  )
}
