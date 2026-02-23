'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

interface ContactInfoRow {
  title?: string
}

const ContactInfoRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<ContactInfoRow>()
  const title = data?.title

  if (!title) {
    return <div>Kontakt {(rowNumber ?? 0) + 1}</div>
  }

  const displayText = title.length > 50 ? `${title.slice(0, 50)}...` : title
  return <div>{displayText}</div>
}

export default ContactInfoRowLabel
