'use client'

import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Review } from '@/payload-types'
import { Quote, Star } from 'lucide-react'
import { useCallback, useId, useState } from 'react'

type Props = {
  review: Review
}

export function ReviewCard({ review }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const dialogTitleId = useId()
  const numberOfStarsArray = [...Array(review.rating)]

  const openDialog = useCallback(() => setDialogOpen(true), [])
  const closeDialog = useCallback(() => setDialogOpen(false), [])

  return (
    <>
      <Card
        className={cn(
          'border-primary/30 hover:border-primary hover:shadow-xl transition-all duration-300 bg-card h-full',
          'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
        role="button"
        tabIndex={0}
        onClick={openDialog}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openDialog()
          }
        }}
        aria-label="Otevřít celou recenzi"
        aria-haspopup="dialog"
        aria-expanded={dialogOpen}
      >
        <CardContent className="p-6 h-full flex flex-col">
          <Quote className="w-10 h-10 text-primary/60 mb-4" aria-hidden="true" />

          <div
            className="flex gap-1 mb-4"
            role="img"
            aria-label={`Hodnocení ${review.rating} z 5 hvězdiček`}
          >
            {numberOfStarsArray.map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary fill-primary" aria-hidden="true" />
            ))}
          </div>

          <blockquote className="text-foreground/80 mb-6 italic flex-1 line-clamp-8">
            <RichText data={review.content} />
          </blockquote>

          {review.author && (
            <footer className="border-t border-primary/20 pt-4">
              <p className="text-foreground">{review.author}</p>
            </footer>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby={dialogTitleId}>
        <DialogContent onClose={closeDialog}>
          <DialogHeader>
            <Quote className="w-10 h-10 text-primary/60" aria-hidden="true" />
          </DialogHeader>
          <DialogBody>
            <div
              className="flex gap-1 mb-4"
              role="img"
              aria-label={`Hodnocení ${review.rating} z 5 hvězdiček`}
            >
              {numberOfStarsArray.map((_, i) => (
                <Star key={i} className="w-7 h-7 text-primary fill-primary" aria-hidden="true" />
              ))}
            </div>
            <div className="text-foreground italic">
              <RichText data={review.content} className="text-base" />
            </div>
            <div className="border-t border-primary/30 pt-4 mt-4">
              <p className="text-foreground text-base">{review.author}</p>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  )
}
