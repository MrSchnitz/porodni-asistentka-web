import { notFound } from 'next/navigation'

/**
 * Catch-all for unmatched frontend URLs (e.g. /hmmm). Ensures the custom 404
 * (frontend)/not-found.tsx is shown with the main layout (Header, Footer).
 */
export default function CatchAllNotFound() {
  notFound()
}
