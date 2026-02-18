'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { ReactNode } from 'react'
import { getLivePreviewServerURL } from './serverURL'

type LivePreviewProps<T> = {
  initialData: T
  depth?: number
  serverURL?: string
  children: (data: T) => ReactNode
}

export function LivePreview<T extends Record<string, unknown>>({
  initialData,
  depth = 0,
  serverURL = getLivePreviewServerURL(),
  children,
}: LivePreviewProps<T>) {
  const { data } = useLivePreview<T>({
    initialData,
    serverURL,
    depth,
  })
  return <>{children(data)}</>
}
