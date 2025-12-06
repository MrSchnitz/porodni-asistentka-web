import { Button } from '@/components/ui/button'
import { Services } from '@/payload-types'
import Link from 'next/link'

type Props = {
  button: NonNullable<Services['ctaButton']>[number]
}

export function ServiceLinkButton({ button }: Props) {
  if (!button) {
    return null
  }

  return (
    <Link key={button.id} href={button.link.url ?? ''}>
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
