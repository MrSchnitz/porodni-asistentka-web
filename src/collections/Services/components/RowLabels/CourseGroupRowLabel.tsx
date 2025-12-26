'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type CourseGroup = {
  groupName?: string | null
  groupDescription?: string | null
}

export const CourseGroupRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<CourseGroup>()

  if (!data?.groupName) {
    return <div>Rozvrh {(rowNumber ?? 0) + 1}</div>
  }

  return <div>{data.groupName}</div>
}

export default CourseGroupRowLabel
