/**
 * Live Preview requires `event.origin === serverURL` (Payload `@payloadcms/live-preview`).
 * If the string here ≠ browser origin (trailing slash, www, whitespace, old build), updates silently fail.
 *
 * Hardcoding `https://porodni-asistentka.cz` “fixes” prod only because it matches `event.origin` exactly;
 * the real issue is usually the inlined `NEXT_PUBLIC_SERVER_URL` value from build (or env priority over window).
 */
function normalizeOrigin(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return 'http://localhost:3000'
  try {
    return new URL(trimmed).origin
  } catch {
    return trimmed.replace(/\/+$/, '') || 'http://localhost:3000'
  }
}

export function getLivePreviewServerURL(): string {
  const envUrl =
    typeof process.env.NEXT_PUBLIC_SERVER_URL === 'string' &&
    process.env.NEXT_PUBLIC_SERVER_URL.trim() !== ''
      ? normalizeOrigin(process.env.NEXT_PUBLIC_SERVER_URL)
      : null

  if (typeof window !== 'undefined') {
    try {
      if (window.parent !== window) {
        void window.parent.location.origin
      }
    } catch {
      return envUrl ?? window.location.origin
    }
    return window.location.origin
  }

  return envUrl ?? 'http://localhost:3000'
}
