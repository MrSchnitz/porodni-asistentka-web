import { CMSLink } from '@/components/CMSLink/CMSLink'
import { Button } from '@/components/ui/button'
import { Services } from '@/payload-types'

type Props = {
  button: NonNullable<Services['ctaButton']>[number]
}

export function ServiceLinkButton({ button }: Props) {
  if (!button) {
    return null
  }

  return (
    <CMSLink key={button.id} link={button.link}>
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10"
      >
        {button.link.label}
      </Button>
    </CMSLink>
  )
}
