import { Link } from '@/payload-types'

export const getLinkUrl = (link: Link) => {
  return link.type === 'reference' ? (link.reference ?? '') : (link.url ?? '')
}
