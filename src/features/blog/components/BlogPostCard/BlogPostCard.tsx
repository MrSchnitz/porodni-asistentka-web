import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Blog, BlogCategory } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { format } from 'date-fns'
import { Calendar, User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  post: Blog
  compact?: boolean
}

export function BlogPostCard({ post, compact = false }: Props) {
  const category = post.category ? (post.category as BlogCategory) : null

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card
        key={post.id}
        className="border-primary/30 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer gap-0 h-full"
      >
        <div className="relative overflow-hidden h-full">
          {post.headImage && (
            <Media
              resource={post.headImage}
              imgClassName="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {category ? (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-foreground">{category?.title}</Badge>
            </div>
          ) : null}
        </div>

        <CardHeader className="gap-0">
          <h3
            className="text-2xl text-foreground group-hover:text-primary transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-4 flex flex-col">
          {!compact && post.content && (
            <RichText className="text-foreground/90 line-clamp-3" data={post.content} />
          )}

          {!compact && (
            <div
              className={cn(
                'flex items-center pt-4 border-t border-primary/20 text-sm text-foreground/60 mt-auto',
                post.publishedAt && post.author ? 'justify-between' : 'justify-end',
              )}
            >
              {post.author && (
                <div className="flex items-center gap-2">
                  <>
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(post.publishedAt, 'd. M. yyyy')}</span>
                </div>
              )}
            </div>
          )}

          <Button className="w-full bg-primary hover:bg-secondary text-foreground">
            Číst více
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
