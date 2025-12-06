import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Service, Services } from '@/payload-types'
import { Heart } from 'lucide-react'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

const ServiceIcon = ({
  icon: { fileIcon, lucideIcon },
}: {
  icon: NonNullable<Service['icon']>
}) => {
  if (fileIcon) {
    return <Media className="w-32 h-32 rounded-full " resource={fileIcon} />
  }

  if (lucideIcon) {
    return (
      <div className="w-14 h-14 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 shadow-md">
        {lucideIcon && <DynamicIcon className="w-7 h-7 text-white" name={lucideIcon as IconName} />}
      </div>
    )
  }

  return null
}

type Props = {
  service: NonNullable<Services['services']>[number]
}

export function ServiceCard({ service }: Props) {
  const value = service.reference?.value

  if (!value || typeof value === 'string') {
    return null
  }

  return (
    <Card
      key={service.id}
      className="border-primary/30 hover:border-primary hover:shadow-xl transition-all duration-300 bg-background"
    >
      <CardContent className="p-6">
        {value.icon && <ServiceIcon icon={value.icon} />}
        <h3 className="text-xl mb-3 text-foreground">{value.title}</h3>
        <div className="text-foreground/70">
          <RichText data={value.description} />
        </div>
      </CardContent>
    </Card>
  )
}
