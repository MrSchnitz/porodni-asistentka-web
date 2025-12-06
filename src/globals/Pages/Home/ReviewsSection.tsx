import { Card, CardContent } from '@/components/ui/card'
import { Home } from '@/payload-types'
import { Quote } from 'lucide-react'
import { ReviewCard } from './components/ReviewCard'

type Props = {
  data: Home['reviews']
}

export function ReviewsSection({ data: { title, subtitle, reviews } }: Props) {
  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          {subtitle && <p className="text-xl text-foreground/70">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
