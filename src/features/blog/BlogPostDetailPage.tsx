import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Blog } from '@/payload-types'
import { BlogPostDetailHeader } from './components/BlogPostDetailHeader/BlogPostDetailHeader'
import { RelatedPostsSection } from './components/RelatedPostsSection/RelatedPostsSection'

type Props = {
  blogPost: Blog
  relatedPosts: Blog[]
}

export function BlogPostDetailPage({ blogPost, relatedPosts }: Props) {
  return (
    <main className="min-h-screen bg-background">
      <BlogPostDetailHeader post={blogPost} />

      {blogPost.headImage && (
        <section className="pt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Media
                  resource={blogPost.headImage}
                  className="w-full max-h-[400px] sm:max-h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-p:leading-snug prose-li:leading-snug prose-headings:leading-snug prose-p:my-2 prose-headings:my-3 prose-img:rounded-xl prose-img:overflow-hidden prose-img:shadow-lg prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm before:prose-code:content-none after:prose-code:content-none">
              <RichText enableProse={false} data={blogPost.content} />
            </div>
          </article>
        </div>
      </section>

      <RelatedPostsSection posts={relatedPosts} />
    </main>
  )
}
