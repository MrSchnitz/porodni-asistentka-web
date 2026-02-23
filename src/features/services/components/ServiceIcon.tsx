import { Media } from '@/components/Media'
import { IconType } from '@/features/_shared/types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { cn } from '@/lib/utils'

type Props = {
  icon: IconType
  className?: string
}

export const ServiceIcon = ({ icon: { fileIcon, lucideIcon }, className }: Props) => {
  if (fileIcon) {
    return <Media className={cn('w-24 h-24 rounded-full', className)} resource={fileIcon} />
  }

  if (lucideIcon) {
    return (
      <div
        className={cn(
          'w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center shrink-0',
          className,
        )}
        aria-hidden="true"
      >
        {lucideIcon && (
          <DynamicIcon className="w-7 h-7 text-primary" name={lucideIcon as IconName} />
        )}
      </div>
    )
  }

  return null
}
