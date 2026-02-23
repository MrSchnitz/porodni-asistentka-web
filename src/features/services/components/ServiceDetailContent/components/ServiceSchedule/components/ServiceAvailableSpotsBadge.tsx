import { Users } from 'lucide-react'

type Props = {
  numberOfSpots: number
}

export const ServiceAvailableSpotsBadge = ({ numberOfSpots }: Props) => {
  if (numberOfSpots === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1.5 text-sm">
      <Users className="w-4 h-4 text-primary" />
      <span className="text-sm">
        {numberOfSpots > 0
          ? `${numberOfSpots} ${numberOfSpots === 1 ? 'volné místo' : numberOfSpots < 5 ? 'volná místa' : 'volných míst'}`
          : 'Obsazeno'}
      </span>
    </div>
  )
}
