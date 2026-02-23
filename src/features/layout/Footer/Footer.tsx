import type { Footer } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { FooterClient } from './Footer.client'

export async function Footer() {
  const footerData = (await getGlobal('footer', 2)) as Footer

  return <FooterClient data={footerData} />
}
