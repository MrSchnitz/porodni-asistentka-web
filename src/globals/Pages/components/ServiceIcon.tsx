import { Media } from '@/components/Media'
import { Service } from '@/payload-types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

export const ServiceIcon = ({
  icon: { fileIcon, lucideIcon },
}: {
  icon: NonNullable<Service['icon']>
}) => {
  if (fileIcon) {
    return <Media className="w-32 h-32 rounded-full " resource={fileIcon} />
  }

  if (lucideIcon) {
    return (
      <div className="w-14 h-14 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 shadow-md">
        {lucideIcon && <DynamicIcon className="w-7 h-7 text-white" name={lucideIcon as IconName} />}
      </div>
    )
  }

  return null
}
