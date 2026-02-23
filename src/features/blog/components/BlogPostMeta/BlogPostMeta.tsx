import { Calendar, Clock, User } from 'lucide-react'
import { format } from 'date-fns'

type Props = {
  author?: string | null
  publishedAt?: string | null
  readTime: string
}

export function BlogPostMeta({ author, publishedAt, readTime }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-6 text-foreground/70">
      {author && (
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>{author}</span>
        </div>
      )}
      {publishedAt && (
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>{format(publishedAt, 'd. M. yyyy')}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5" />
        <span>{readTime}</span>
      </div>
    </div>
  )
}
