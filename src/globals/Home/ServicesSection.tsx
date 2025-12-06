import { Home } from '@/payload-types'
import { ServiceCard } from './components/ServiceCard'
import { ServiceLinkButton } from './components/ServiceLinkButton'

type Props = {
  data: Home['services']
}

export function ServicesSection({ data: { title, subtitle, ctaButton, services } }: Props) {
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

        {services && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {ctaButton && (
          <div className="text-center mt-12">
            {ctaButton.map((button) => (
              <ServiceLinkButton key={button.id} button={button} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
