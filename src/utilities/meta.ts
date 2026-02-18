const META_DESCRIPTION_MAX_LENGTH = 160

/**
 * Truncate text for meta description (typically ~155–160 chars for SEO).
 */
export function truncateMetaDescription(
  text: string,
  maxLength = META_DESCRIPTION_MAX_LENGTH,
): string {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed
  const cut = trimmed.slice(0, maxLength - 3).lastIndexOf(' ')
  const end = cut > maxLength / 2 ? cut : maxLength - 3
  return trimmed.slice(0, end).trim() + '...'
}

/**
 * Build absolute URL for OG image (Media may have relative url).
 */
export function getAbsoluteMediaUrl(
  url: string | null | undefined,
  baseUrl: string,
): string | undefined {
  if (!url?.trim()) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = baseUrl.replace(/\/$/, '')
  const path = url.startsWith('/') ? url : `/${url}`
  return `${base}${path}`
}
