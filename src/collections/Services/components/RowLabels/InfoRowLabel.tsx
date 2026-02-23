'use client'

import { AdditionalInfo } from '@/features/_shared/types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type Info = AdditionalInfo

const InfoRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<Info>()

  if (!data?.title) {
    return <div>Informace {(rowNumber ?? 0) + 1}</div>
  }

  return <div>{data?.title}</div>
}

export default InfoRowLabel
