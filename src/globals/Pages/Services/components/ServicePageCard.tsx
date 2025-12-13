import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Service } from '@/payload-types'
import { ServiceIcon } from '../../components/ServiceIcon'
import Link from 'next/link'

type Props = {
  pageName: string
  data: Service
}

export const ServicePageCard = ({
  pageName,
  data: { slug, icon, title, description, duration, price },
}: Props) => {
  return (
    <Link href={`/${pageName}/${slug}`} scroll={false}>
      <Card className="border-primary/30 hover:shadow-xl transition-all duration-300 bg-background cursor-pointer h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-4">{icon && <ServiceIcon icon={icon} />}</div>
          <h3
            className="text-2xl mb-3 text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h3>
          <p className="text-foreground/70 mb-4 flex-1">
            <RichText data={description} />
          </p>

          <div className="mt-4 pt-4 border-t border-primary/20 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/60">{duration.title}:</span>
              <span className="text-foreground">{duration.value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/60">{price.title}:</span>
              <span className="text-primary">{price.value}</span>
            </div>
          </div>

          <Button className="w-full mt-4 bg-primary hover:bg-secondary text-foreground">
            Více informací
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
