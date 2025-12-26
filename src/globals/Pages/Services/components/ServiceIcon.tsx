import { Media } from '@/components/Media'
import { Service } from '@/payload-types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { cn } from '@/lib/utils'

type Props = {
  icon: NonNullable<Service['icon']>
  className?: string
}

export const ServiceIcon = ({ icon: { fileIcon, lucideIcon }, className }: Props) => {
  if (fileIcon) {
    return <Media className={cn('w-32 h-32 rounded-full', className)} resource={fileIcon} />
  }

  if (lucideIcon) {
    return (
      <div
        className={cn(
          'w-14 h-14 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md shrink-0',
          className,
        )}
      >
        {lucideIcon && <DynamicIcon className="w-7 h-7 text-white" name={lucideIcon as IconName} />}
      </div>
    )
  }

  return null
}
