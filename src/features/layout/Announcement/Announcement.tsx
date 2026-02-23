import { Announcement as AnnouncementType } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { AnnouncementClient } from './AnnouncementClient'

export async function Announcement() {
  const data = (await getGlobal('announcement', 1)) as AnnouncementType

  return <AnnouncementClient data={data} />
}
