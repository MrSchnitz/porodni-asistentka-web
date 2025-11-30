import { Home } from '@/payload-types'

type Props = {
  data: Home['reviews']
}

export function ReviewsSection({ data: { title, subtitle } }: Props) {
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

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-primary/30 relative hover:shadow-xl transition-all bg-card"
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-secondary/40 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>

                <p className="text-foreground/80 mb-6 italic">"{testimonial.text}"</p>

                <div className="border-t border-primary/20 pt-4">
                  <p className="text-foreground">{testimonial.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </div>
    </section>
  )
}
