/**
 * URL of the app (frontend + Payload API). Used by Live Preview to communicate
 * between the admin iframe and the preview.
 */
export function getLivePreviewServerURL(): string {
  if (typeof process.env.NEXT_PUBLIC_SERVER_URL === 'string') {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`
  }
  return 'http://localhost:3000'
}
