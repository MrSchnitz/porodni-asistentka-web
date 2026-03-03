/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  const withCache = (value: string) => (cacheTag ? `${value}?${cacheTag}` : value)

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return withCache(url)
  }

  // Keep relative media URLs relative to avoid host mismatches on hard refresh.
  // In production, an incorrect NEXT_PUBLIC_SERVER_URL can otherwise produce broken image src.
  if (url.startsWith('/')) {
    return withCache(url)
  }

  // For non-leading slash paths, only prefix with a configured server URL.
  // Never fallback to localhost here as it can leak into production markup.
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (!baseUrl) return withCache(url)

  const normalizedBase = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`
  return withCache(`${normalizedBase}/${url.replace(/^\/+/, '')}`)
}
