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
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none prose-img:rounded-xl prose-img:overflow-hidden prose-img:shadow-lg">
              <RichText data={blogPost.content} />
            </div>
          </article>
        </div>
      </section>

      <RelatedPostsSection posts={relatedPosts} />
    </main>
  )
}
