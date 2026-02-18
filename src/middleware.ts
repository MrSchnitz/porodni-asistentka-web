import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isPreview = request.nextUrl.pathname.includes('preview')

  if (!isPreview) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-preview', '1')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
