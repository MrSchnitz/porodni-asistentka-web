import { Media } from '@/payload-types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

type Props = {
  logo: {
    img?: (string | null) | Media
    lucideIcon?: string | null
  }
  className?: string
}

export const GlobalLogo = ({ logo: { img, lucideIcon }, className }: Props) => {
  if (img) {
    return (
      <Logo
        className={className}
        url={typeof img === 'string' ? img : (img.url ?? '')}
        loading="eager"
        alt={typeof img === 'string' ? img : (img.alt ?? '')}
      />
    )
  }

  if (lucideIcon) {
    return (
      <div
        className={cn(
          'bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg',
          className,
        )}
      >
        <DynamicIcon className="text-white" name={lucideIcon as IconName} />
      </div>
    )
  }

  return null
}
