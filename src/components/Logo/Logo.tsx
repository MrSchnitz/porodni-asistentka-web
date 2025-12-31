/* eslint-disable */
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  url: string
  alt?: string
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, url, alt } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <img
      alt={alt}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={className}
      src={url}
    />
  )
}
