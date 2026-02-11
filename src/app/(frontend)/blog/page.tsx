import { BlogPostListWithSearch } from '@/globals/Pages/Blog/components/BlogPostListWithSearch/BlogPostListWithSearch'
import { BlogPage } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { hasData } from '@/utilities/payload'

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
