'use client'

import type { Blog, BlogPage } from '@/payload-types'
import { RowLabelProps, usePayloadAPI, useRowLabel } from '@payloadcms/ui'

type BlogPostRow = NonNullable<BlogPage['blogPosts']>[number]

function getTitle(blog: unknown): string | null {
  if (
    blog &&
    typeof blog === 'object' &&
    'title' in blog &&
    typeof (blog as Blog).title === 'string'
  ) {
    return (blog as Blog).title
  }
  return null
}

export const BlogPostRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<BlogPostRow>()
  const blogPost = data?.blogPost
  const titleFromData = getTitle(blogPost)
  const blogId = typeof blogPost === 'string' ? blogPost : null

  const [{ data: fetched }] = usePayloadAPI(
    blogId && !titleFromData ? `/api/blogs/${blogId}?depth=0` : '',
  )
  const title = titleFromData ?? getTitle(fetched) ?? null

  if (!title) return <div>Příspěvek {(rowNumber ?? 0) + 1}</div>

  return <div>{title.length > 50 ? `${title.slice(0, 50)}...` : title}</div>
}

export default BlogPostRowLabel
