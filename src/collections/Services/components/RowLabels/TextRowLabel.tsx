'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

interface RowData {
  title?: string
  name?: string
  item?: string
}

/**
 * Generic row label component that displays the first found text value
 * from common fields: title, name, item
 */
export const TextRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<RowData>()

  const text = data?.title || data?.name || data?.item

  if (!text) {
    return <div>Položka {(rowNumber ?? 0) + 1}</div>
  }

  // Truncate long text
  const displayText = text.length > 50 ? `${text.slice(0, 50)}...` : text

  return <div>{displayText}</div>
}

export default TextRowLabel
