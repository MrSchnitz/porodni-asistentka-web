import { Button } from '@/components/ui/button'
import { Home } from '@/payload-types'
import Link from 'next/link'

type Props = {
  data: Home['services']
}

export function ServicesSection({ data: { title, subtitle, ctaButton } }: Props) {
  return (
    <section id="services" className="py-20 bg-card">
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

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="border-primary/30 hover:border-primary hover:shadow-xl transition-all duration-300 bg-background"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl mb-3 text-foreground">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div> */}

        {ctaButton && (
          <div className="text-center mt-12">
            {ctaButton.map((button) => (
              <Link key={button.id} href={button.link.url ?? ''}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  {button.link.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
