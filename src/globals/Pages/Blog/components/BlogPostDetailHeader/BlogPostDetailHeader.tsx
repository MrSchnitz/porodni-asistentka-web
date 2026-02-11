import { Badge } from '@/components/ui/badge'
import { PAGE_ROUTES } from '@/globals/Pages/pageRoutes'
import { StickyHeader } from '@/globals/Pages/components/StickyNavbar'
import { hasData } from '@/utilities/payload'
import { getReadTimeFromRichText } from '@/utilities/richText'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Blog } from '@/payload-types'
import { BlogPostMeta } from '../BlogPostMeta/BlogPostMeta'
import { ShareArticleButton } from '../ShareArticleButton/ShareArticleButton'

type Props = {
  post: Blog
}

function BackButton({ compact, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      href={PAGE_ROUTES.blogPage.path}
      className={cn(compact ? 'shrink-0' : undefined, 'block', className)}
      aria-label="Zpět na blog"
    >
      <Button
        variant="ghost"
        size={compact ? 'sm' : 'default'}
        className={cn(
          'text-foreground/70 hover:text-foreground hover:bg-muted',
          compact ? 'h-8 px-2' : 'w-fit',
        )}
      >
        <ArrowLeft className={cn('mr-2', compact ? 'w-3 h-3' : 'w-4 h-4')} aria-hidden="true" />
        Zpět na blog
      </Button>
    </Link>
  )
}

function HeaderContent({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <BackButton compact />
      <h1
        className="text-sm sm:text-lg text-foreground truncate"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h1>
    </div>
  )
}

export function BlogPostDetailHeader({ post }: Props) {
  return (
    <StickyHeader
      className="bg-background"
      fixedMaxWidth="max-w-4xl"
      fixedClassName="shadow-sm"
      fixedContent={<HeaderContent title={post.title} />}
    >
      <section className="relative py-12 bg-linear-to-br from-background to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <BackButton className="mb-6" />
            {hasData(post.category) && (
              <Badge className="block bg-primary text-foreground mb-4 w-fit">
                {post.category.title}
              </Badge>
            )}

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.title}
            </h1>

            <BlogPostMeta
              author={post.author}
              publishedAt={post.publishedAt}
              readTime={getReadTimeFromRichText(post.content)}
            />

            <div className="mt-8">
              <ShareArticleButton
                title={post.title}
                path={`/blog/${post.slug}`}
                className="border-primary text-primary hover:bg-primary/10"
              />
            </div>
          </div>
        </div>
      </section>
    </StickyHeader>
  )
}
