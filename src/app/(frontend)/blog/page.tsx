import type { Metadata } from 'next'
import { BlogPostListWithSearch } from '@/features/blog/components/BlogPostListWithSearch/BlogPostListWithSearch'
import type { BlogPage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { hasData } from '@/utilities/payload'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Články o těhotenství, porodu a péči o novorozence. Tipy od porodní asistentky.',
}

export default async function Page() {
  const data = (await getGlobal('blogPage', 2)) as BlogPage
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
