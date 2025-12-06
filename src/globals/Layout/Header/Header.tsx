import type { Header } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Header.client'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)() as Header

  return <HeaderClient data={headerData} />
}
