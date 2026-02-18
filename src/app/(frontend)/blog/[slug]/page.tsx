import { BlogPostDetailPage } from '@/globals/Pages/Blog/BlogPostDetailPage'
import type { Blog } from '@/payload-types'
import { hasData } from '@/utilities/payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const blogPost = docs[0] as Blog | undefined
  if (!blogPost) return notFound()

  const categoryId = hasData(blogPost.category)
    ? typeof blogPost.category === 'object'
      ? blogPost.category.id
      : blogPost.category
    : undefined

  const { docs: relatedDocs } = await payload.find({
    collection: 'blogs',
    where: {
      and: [
        { slug: { not_equals: blogPost.slug } },
        ...(categoryId ? [{ category: { equals: categoryId } }] : []),
      ],
    },
    limit: 3,
    sort: '-publishedAt',
    depth: 2,
  })

  const relatedPosts = relatedDocs as Blog[]

  return <BlogPostDetailPage blogPost={blogPost} relatedPosts={relatedPosts} />
}
