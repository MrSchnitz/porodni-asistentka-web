'use client'

import { Link as PayloadLink } from '@/payload-types'
import { getLinkUrl } from '@/utilities/getLinkUrl'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  link: PayloadLink
  className?: string
  onClick?: () => void
  children?: React.ReactNode
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'target' | 'rel'>

/** Ensure external URL has a protocol so it doesn't resolve under current origin (e.g. localhost). */
function toAbsoluteUrl(url: string): string {
  const trimmed = url.trim()
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('//')
  ) {
    return trimmed
  }
  return `https://${trimmed}`
}

export function CMSLink({ link, className, onClick, children, ...rest }: Props) {
  const rawHref = getLinkUrl(link)
  const href = link.type === 'reference' ? rawHref : toAbsoluteUrl(rawHref)
  const target = link.newTab ? '_blank' : '_self'
  const rel = link.newTab ? 'noopener noreferrer' : undefined
  const content = children ?? link.label

  if (!href) {
    return <span className={className}>{content}</span>
  }

  return (
    <Link href={href} className={className} onClick={onClick} target={target} rel={rel} {...rest}>
      {content}
    </Link>
  )
}
