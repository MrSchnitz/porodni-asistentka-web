'use client'
import { HomePage } from '@/payload-types'
import { ReviewCard } from './components/ReviewCard'
import { motion } from 'motion/react'
import { hasData } from '@/utilities/payload'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type Props = {
  data: HomePage['reviews']
}

export function ReviewsSection({ data: { title, subtitle, reviews } }: Props) {
  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          {subtitle && <p className="text-xl text-foreground/70">{subtitle}</p>}
        </motion.div>

        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {reviews.map((review, index) => {
                if (!hasData(review.reference?.value)) {
                  return null
                }

                return (
                  <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                    <ReviewCard review={review.reference.value} />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            {/* Mobile: centered buttons below carousel */}
            <div className="flex justify-center gap-4 mt-6 sm:hidden">
              <CarouselPrevious className="static translate-y-0 border-primary/50" />
              <CarouselNext className="static translate-y-0 border-primary/50" />
            </div>
            {/* Desktop: buttons on sides */}
            <CarouselPrevious className="hidden sm:flex border-primary/50" />
            <CarouselNext className="hidden sm:flex border-primary/50" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
