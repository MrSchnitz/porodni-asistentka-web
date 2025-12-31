import { unstable_cache } from 'next/cache'

// Redirects collection doesn't exist in this project
// This function is kept for compatibility but returns empty array
// eslint-disable-next-line
export async function getRedirects(depth = 1) {
  return []
}

/**
 * Returns a unstable_cache function mapped with the cache tag for 'redirects'.
 *
 * Cache all redirects together to avoid multiple fetches.
 */
export const getCachedRedirects = () =>
  unstable_cache(async () => getRedirects(), ['redirects'], {
    tags: ['redirects'],
  })
