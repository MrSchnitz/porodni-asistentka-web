import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { Services } from '@/payload-types'
import { ServiceIcon } from '@/globals/Pages/Services/components/ServiceIcon'

type Props = {
  service: NonNullable<Services['services']>[number]
}

export function ServiceCard({ service }: Props) {
  const value = service.item?.value

  if (!value || typeof value === 'string') {
    return null
  }

  return (
    <Card
      key={service.id}
      className="border-primary/30 transition-all duration-300 bg-background"
    >
      <CardContent className="p-6">
        {value.icon && <ServiceIcon icon={value.icon} className="mb-4" />}
        <h3 className="text-xl mb-3 text-foreground font-medium">{value.title}</h3>
        <div className="text-foreground/70">
          <RichText data={value.description} />
        </div>
      </CardContent>
    </Card>
  )
}
