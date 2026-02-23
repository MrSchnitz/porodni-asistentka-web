import type { Header } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Header.client'

export async function Header() {
  const headerData = (await getGlobal('header', 1)) as Header

  return <HeaderClient data={headerData} />
}
