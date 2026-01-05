import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { Service } from '@/payload-types'
import { ServiceIcon } from '@/globals/Pages/Services/components/ServiceIcon'

type Props = {
  service: Service
}

export function ServiceCard({ service }: Props) {
  return (
    <Card
      key={service.id}
      className="border-primary/30 transition-all duration-300 bg-background h-full"
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {service.icon && <ServiceIcon icon={service.icon} className="mb-4" />}
          <h3
            className="text-xl mb-3 text-foreground font-medium"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {service.title}
          </h3>
        </div>
        <div className="text-foreground/70">
          <RichText data={service.card.description} />
        </div>
      </CardContent>
    </Card>
  )
}
