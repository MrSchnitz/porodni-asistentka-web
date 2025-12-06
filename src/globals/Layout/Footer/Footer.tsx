import type { Footer } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { FooterClient } from './Footer.client'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 2)()) as Footer

  return <FooterClient data={footerData} />
}
