import { Blog } from '@/payload-types'
import { BlogPostCard } from '@/globals/Pages/Blog/components/BlogPostCard/BlogPostCard'

type Props = {
  posts: Blog[]
}

export function RelatedPostsSection({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl mb-12 text-center text-foreground"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Podobné články
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
