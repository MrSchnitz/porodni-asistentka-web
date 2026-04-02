import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PAGE_ROUTES } from '@/features/_shared/pageRoutes'
import { Service } from '@/payload-types'

type Props = {
  ctaButtons: NonNullable<Service['detail']>['ctaButtons']
}

export function ServiceDetailCtaButtons({ ctaButtons }: Props) {
  const showCTAButtons = ctaButtons && ctaButtons.length > 0

  return (
    <div className="w-full mt-6 space-y-2">
      {showCTAButtons &&
        ctaButtons.map((button) => (
          <Link key={button.id} href={button.link?.url ?? ''} className="block">
            <Button size="lg" variant="outline" className="w-full">
              {button.link?.label ?? ''}
            </Button>
          </Link>
        ))}
      <Link href={PAGE_ROUTES.contactPage.path} className="block">
        <Button size="lg" className="w-full bg-primary/60 hover:bg-secondary/60 text-foreground">
          Kontaktovat
        </Button>
      </Link>
    </div>
  )
}
