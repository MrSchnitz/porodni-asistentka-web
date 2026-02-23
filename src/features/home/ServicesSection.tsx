'use client'
import { HomePage } from '@/payload-types'
import { ServiceCard } from './components/ServiceCard'
import { ServiceLinkButton } from './components/ServiceLinkButton'
import { motion } from 'motion/react'
import { hasData } from '@/utilities/payload'

type Props = {
  data: HomePage['services']
}

export function ServicesSection({ data: { title, subtitle, ctaButton, services } }: Props) {
  return (
    <section id="services" className="py-20 bg-card">
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

        {services && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              if (!hasData(service.item?.value)) {
                return null
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard key={service.id} service={service.item.value} />
                </motion.div>
              )
            })}
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
