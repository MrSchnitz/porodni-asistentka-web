'use client'
import { cn } from '@/lib/utils'
import { Link as LinkType } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  item: LinkType
  className?: string
  onClick?: () => void
}

export function NavItem({ item, className, onClick }: Props) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path
  const href = item.type === 'reference' ? (item.reference ?? '') : (item.url ?? '')

  return (
    <Link
      href={href}
      className={cn(
        'transition-colors cursor-pointer',
        className,
        isActive(href) ? 'text-primary' : 'text-foreground hover:text-primary',
      )}
      onClick={onClick}
    >
      {item.label}
    </Link>
  )
}
