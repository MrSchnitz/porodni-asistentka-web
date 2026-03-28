'use client'

import { DateTimeField, useField } from '@payloadcms/ui'
import { parseISO, isValid } from 'date-fns'
import { DateFieldClientProps } from 'payload'
import { useEffect, useRef } from 'react'
import { replaceInstantDateKeepPragueTime } from '@/utilities/pragueTime'

const StartDateField: React.FC<DateFieldClientProps> = (props) => {
  const { path } = props
  const { value } = useField<string>({ path })

  // Get the endDate field path (sibling field)
  const endDatePath = path.replace(/startDate$/, 'endDate')
  const { value: endDateValue, setValue: setEndDateValue } = useField<string>({
    path: endDatePath,
  })

  const previousStartDate = useRef<string | undefined>(undefined)

  useEffect(() => {
    // Only auto-set endDate if:
    // 1. startDate has a value
    // 2. startDate actually changed (not just on mount)
    if (value && previousStartDate.current !== value && previousStartDate.current !== undefined) {
      const startDate = parseISO(value)

      if (isValid(startDate)) {
        const timeSource = endDateValue ? parseISO(endDateValue) : startDate
        const validTimeSource = isValid(timeSource) ? timeSource : startDate
        setEndDateValue(replaceInstantDateKeepPragueTime(startDate, validTimeSource).toISOString())
      }
    }

    previousStartDate.current = value
  }, [value, endDateValue, setEndDateValue])

  return <DateTimeField {...props} />
}

export default StartDateField
