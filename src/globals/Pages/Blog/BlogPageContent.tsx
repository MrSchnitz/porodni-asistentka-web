'use client'

import { BlogPostListWithSearch } from '@/globals/Pages/Blog/components/BlogPostListWithSearch/BlogPostListWithSearch'
import type { BlogPage } from '@/payload-types'
import { hasData } from '@/utilities/payload'

type Props = {
  data: BlogPage
}

export function BlogPageContent({ data }: Props) {
  const categories: string[] = Array.from(
    new Set(
      data.blogPosts?.map(({ blogPost }) =>
        hasData(blogPost) && hasData(blogPost?.category) ? blogPost.category.title : null,
      ),
    ),
  ).filter((category): category is string => Boolean(category))

  return (
    <main className="min-h-dvh">
      <BlogPostListWithSearch
        pageHeader={data.pageHeader}
        items={data.blogPosts}
        categories={categories}
      />
    </main>
  )
}
