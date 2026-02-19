'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

interface ServiceSectionRow {
  servicesSection?: {
    title?: string
  }
}

export const ServiceSectionRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<ServiceSectionRow>()
  const title = data?.servicesSection?.title

  if (!title) {
    return <div>Sekce {(rowNumber ?? 0) + 1}</div>
  }

  const displayText = title.length > 50 ? `${title.slice(0, 50)}...` : title
  return <div>{displayText}</div>
}

export default ServiceSectionRowLabel
