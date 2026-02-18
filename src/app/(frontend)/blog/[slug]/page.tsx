import type { Metadata } from 'next'
import { BlogPostDetailPage } from '@/globals/Pages/Blog/BlogPostDetailPage'
import type { Blog } from '@/payload-types'
import { hasData } from '@/utilities/payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getServerSideURL } from '@/utilities/getURL'
import { extractTextFromRichText } from '@/utilities/richText'
import { truncateMetaDescription, getAbsoluteMediaUrl } from '@/utilities/meta'
import type { Media } from '@/payload-types'

type Props = {
  params: Promise<{ slug: string }>
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (docs[0] as Blog) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blogPost = await getBlogBySlug(slug)
  if (!blogPost) return { title: 'Článek nenalezen' }

  const baseUrl = getServerSideURL()
  const title = blogPost.title
  const rawDescription = extractTextFromRichText(blogPost.content)
  const description = rawDescription ? truncateMetaDescription(rawDescription) : `Článek: ${title}`

  const headImage = blogPost.headImage
  const imageUrl =
    headImage && typeof headImage === 'object' && headImage.url
      ? getAbsoluteMediaUrl(headImage.url, baseUrl)
      : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/blog/${slug}`,
      type: 'article',
      publishedTime: blogPost.publishedAt ?? undefined,
      modifiedTime: blogPost.updatedAt,
      images: imageUrl ? [{ url: imageUrl, alt: (headImage as Media)?.alt ?? title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const blogPost = await getBlogBySlug(slug)
  if (!blogPost) return notFound()

  const payload = await getPayload({ config })

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
