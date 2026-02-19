'use client'

import { formatServiceDateTime } from '@/utilities/formatServiceDateTime'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import { Ban } from 'lucide-react'
import { ScheduleItems } from '@/globals/Pages/types'

type Entry = NonNullable<ScheduleItems>[number]

const ScheduleRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<Entry>()

  if (!data?.startDate) {
    return <div>Termín {(rowNumber ?? 0) + 1}</div>
  }

  const { completeDateString: dateString } = formatServiceDateTime({
    startDate: data.startDate,
    endDate: data.endDate,
  })

  const lessonTitle = data.lesson ? `• ${data.lesson}` : ''

  const statusEmoji = ['cancelled', 'booked'].includes(data.status ?? '') ? (
    <Ban size={16} className="text-red-500 mr-1" />
  ) : (
    ''
  )

  return (
    <div className="flex items-center">
      {statusEmoji} {dateString} {lessonTitle}
    </div>
  )
}

export default ScheduleRowLabel
