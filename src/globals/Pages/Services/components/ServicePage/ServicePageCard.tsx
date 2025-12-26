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

export const ServicePageCard = ({
  pageName,
  data: { slug, icon, title, description, duration, price },
}: Props) => {
  const isInfoAvailable = price || duration

  return (
    <Link href={`/${pageName}/${slug}`} scroll={false}>
      <Card className="border-primary/30 hover:shadow-xl transition-all duration-300 bg-background cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col h-full">
          {icon && <ServiceIcon icon={icon} className="mb-4" />}

          <h3 className="text-xl mb-3 text-foreground font-medium">{title}</h3>

          {description && <RichText className="text-foreground flex-1" data={description} />}

          {isInfoAvailable && (
            <div className="mt-4 pt-4 border-t border-primary/20 space-y-2">
              {duration && <InfoItem title="Délka" value={duration} />}
              {price && <InfoItem title="Cena" value={price} />}
            </div>
          )}

          <Button className="w-full mt-4 bg-primary hover:bg-secondary text-foreground">
            Více informací
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
