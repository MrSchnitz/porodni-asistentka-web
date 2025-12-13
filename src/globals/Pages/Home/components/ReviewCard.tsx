import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { HomePage } from '@/payload-types'
import { Quote, Star } from 'lucide-react'

type Props = {
  review: NonNullable<HomePage['reviews']['reviews']>[number]
}

export function ReviewCard({ review }: Props) {
  const value = review.reference?.value

  if (!value || typeof value === 'string') {
    return null
  }

  const numberOfStarsArray = [...Array(value.rating)]

  return (
    <Card className="border-primary/30 relative hover:shadow-xl transition-all bg-card">
      <CardContent className="p-6">
        <Quote className="w-10 h-10 text-secondary/40 mb-4" />

        <div className="flex gap-1 mb-4">
          {numberOfStarsArray.map((_, i) => (
            <Star key={i} className="w-5 h-5 text-primary fill-primary" />
          ))}
        </div>

        <div className="text-foreground/80 mb-6 italic">
          <RichText data={value.content} />
        </div>

        {value.author && (
          <div className="border-t border-primary/20 pt-4">
            <p className="text-foreground">{value.author}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
