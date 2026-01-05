import { Button } from '@/components/ui/button'
import { Services } from '@/payload-types'
import Link from 'next/link'
import { getLinkUrl } from '@/utilities/getLinkUrl'

type Props = {
  button: NonNullable<Services['ctaButton']>[number]
}

export function ServiceLinkButton({ button }: Props) {
  if (!button) {
    return null
  }

  return (
    <Link key={button.id} href={getLinkUrl(button.link)}>
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10"
      >
        {button.link.label}
      </Button>
    </Link>
  )
}
