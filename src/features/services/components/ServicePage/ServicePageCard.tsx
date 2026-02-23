import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Service } from '@/payload-types'
import { ServiceIcon } from '../ServiceIcon'
import Link from 'next/link'

const InfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-foreground/80">{title}:</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}

type Props = {
  pageName: string
  data: Service
}

export const ServicePageCard = ({ pageName, data: { slug, icon, title, card } }: Props) => {
  const { description, additionalInfo } = card

  const isInfoAvailable = additionalInfo && additionalInfo.length > 0

  return (
    <Link href={`/${pageName}/${slug}`}>
      <Card className="border-primary/30 hover:border-primary hover:shadow-xl transition-all duration-300 bg-background cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-4">
            {icon && <ServiceIcon icon={icon} className="mb-4" />}
            <h3
              className="text-xl mb-3 text-foreground font-medium"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h3>
          </div>
          {description && <RichText className="text-foreground flex-1" data={description} />}

          {isInfoAvailable && (
            <div className="mt-4 pt-4 border-t border-primary/20 space-y-2">
              {additionalInfo.map((info) => (
                <InfoItem key={info.id} title={info.title} value={info.value} />
              ))}
            </div>
          )}

          <Button className="w-full mt-4 bg-primary/60 hover:bg-secondary/60 text-foreground">
            Více informací
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
