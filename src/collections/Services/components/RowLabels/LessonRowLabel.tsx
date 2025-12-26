'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import { Service } from '@/payload-types'

type Lesson = NonNullable<NonNullable<NonNullable<Service['courses']>[number]>['lessons']>[number]

export const LessonRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<Lesson>()

  if (!data?.title) {
    return <div>Lekce {(rowNumber ?? 0) + 1}</div>
  }

  return <div>{data.title}</div>
}

export default LessonRowLabel
