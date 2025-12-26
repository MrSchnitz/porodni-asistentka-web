'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import { Service } from '@/payload-types'

type Course = NonNullable<NonNullable<Service['courses']>[number]>

export const CourseRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<Course>()

  const displayedTitle = data?.name ? data.name : `Kurz ${(rowNumber ?? 0) + 1}`

  return <strong className="text-xl">{displayedTitle}</strong>
}

export default CourseRowLabel
