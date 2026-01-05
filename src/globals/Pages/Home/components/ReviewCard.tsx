import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { Review } from '@/payload-types'
import { Quote, Star } from 'lucide-react'

type Props = {
  review: Review
}

export function ReviewCard({ review }: Props) {
  const numberOfStarsArray = [...Array(review.rating)]

  return (
    <Card className="border-primary/30 relative hover:shadow-xl transition-all bg-card">
      <CardContent className="p-6">
        <Quote className="w-10 h-10 text-primary/60 mb-4" />

        <div className="flex gap-1 mb-4">
          {numberOfStarsArray.map((_, i) => (
            <Star key={i} className="w-5 h-5 text-primary fill-primary" />
          ))}
        </div>

        <div className="text-foreground/80 mb-6 italic">
          <RichText data={review.content} />
        </div>

        {review.author && (
          <div className="border-t border-primary/20 pt-4">
            <p className="text-foreground">{review.author}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
