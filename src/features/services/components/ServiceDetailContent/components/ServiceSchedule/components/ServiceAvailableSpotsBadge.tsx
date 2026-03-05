import { Users } from 'lucide-react'
import clsx from 'clsx'

type Props = {
  numberOfSpots: number
  small?: boolean
}

export const ServiceAvailableSpotsBadge = ({ numberOfSpots, small = false }: Props) => {
  if (numberOfSpots === 0) {
    return null
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-2 bg-muted rounded-full px-3 py-1.5 text-sm',
        small && 'text-xs px-2 py-1',
      )}
    >
      <Users className={clsx('w-4 h-4 text-primary', small && 'w-3 h-3')} />
      <span className={clsx('text-sm', small && 'text-xs')}>
        {numberOfSpots > 0
          ? `${numberOfSpots} ${numberOfSpots === 1 ? 'volné místo' : numberOfSpots < 5 ? 'volná místa' : 'volných míst'}`
          : 'Obsazeno'}
      </span>
    </div>
  )
}
