'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import { Calendar, BookOpen } from 'lucide-react'

type PlanningEntry = {
  title?: string
  courseIndex?: string
}

export const PlanningRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<PlanningEntry>()

  const hasCourse = !!data?.courseIndex

  let label = `Tabulka ${(rowNumber ?? 0) + 1}`

  if (data?.title) {
    label = data.title
  }

  const Icon = hasCourse ? BookOpen : Calendar

  return (
    <div className="flex items-center gap-2">
      <Icon size={14} />
      <span>{label}</span>
    </div>
  )
}

export default PlanningRowLabel

