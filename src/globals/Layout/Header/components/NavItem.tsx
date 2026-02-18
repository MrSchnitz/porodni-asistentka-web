'use client'

import { CMSLink } from '@/components/CMSLink/CMSLink'
import { cn } from '@/lib/utils'
import { Link as LinkType } from '@/payload-types'
import { getLinkUrl } from '@/utilities/getLinkUrl'
import { usePathname } from 'next/navigation'

type Props = {
  item: LinkType
  className?: string
  onClick?: () => void
}

export function NavItem({ item, className, onClick }: Props) {
  const pathname = usePathname()
  const href = getLinkUrl(item)
  const isActive = (path: string) => pathname === path

  return (
    <CMSLink
      link={item}
      className={cn(
        'transition-colors cursor-pointer',
        className,
        isActive(href) ? 'text-primary' : 'text-foreground hover:text-primary',
      )}
      onClick={onClick}
    />
  )
}
