'use client'

import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { useCallback, useState } from 'react'

type Props = {
  title: string
  path: string
  className?: string
}

/** Sestaví čistou URL pouze z cesty (bez náhodného textu za mezerou/newline). */
function buildShareUrl(path: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const cleanPath = path.split(/[\s\n]/)[0].trim()
  const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
  return `${origin}${normalized}`
}

export function ShareArticleButton({ title, path, className }: Props) {
  const [copied, setCopied] = useState(false)

  const handleShare = useCallback(async () => {
    const url = buildShareUrl(path)

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await copyToClipboard(url)
        }
      }
      return
    }

    await copyToClipboard(url)
  }, [title, path])

  async function copyToClipboard(url: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      onClick={handleShare}
      aria-label={copied ? 'Odkaz zkopírován' : 'Sdílet článek'}
    >
      <Share2 className="w-4 h-4 mr-2" aria-hidden />
      {copied ? 'Odkaz zkopírován!' : 'Sdílet článek'}
    </Button>
  )
}
