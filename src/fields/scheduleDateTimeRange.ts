import { parseISO, isValid, getMinutes, isBefore, set, getHours } from 'date-fns'
import type { Field } from 'payload'

export const validateDateTimeRange = (
  startDate: string | Date | null | undefined,
  endDate: string | Date | null | undefined,
  errorMessage: string,
  isTime: boolean = false,
): string | true => {
  if (!startDate || !endDate) return true

  const parseDate = (val: string | Date) => {
    const d = typeof val === 'string' ? parseISO(val) : val
    return isValid(d) ? d : null
  }

  const start = parseDate(startDate)
  const end = parseDate(endDate)

  if (!start || !end) return true

  if (isTime) {
    const baseDate = new Date(2000, 0, 1)
    const startDateNormalized = set(baseDate, {
      hours: getHours(start),
      minutes: getMinutes(start),
    })
    const endDateNormalized = set(baseDate, {
      hours: getHours(end),
      minutes: getMinutes(end),
    })

    if (isBefore(endDateNormalized, startDateNormalized)) {
      return errorMessage
    }
  }

  return isBefore(end, start) ? errorMessage : true
}

const datePickerAdmin = {
  pickerAppearance: 'dayAndTime' as const,
  displayFormat: 'd.M.yyyy HH:mm',
  timeFormat: 'HH:mm',
  timeIntervals: 15,
  overrides: {
    popperPlacement: 'bottom-end' as const,
  },
}

/**
 * Row: `startDate` + `endDate` with shared picker settings, range validation, and
 * start field that keeps the end date’s calendar day in sync when the start changes.
 */
export const scheduleDateTimeRange: Field = {
  type: 'row',
  fields: [
    {
      name: 'startDate',
      label: 'Datum a čas začátku',
      type: 'date',
      required: true,
      admin: {
        width: '50%',
        date: datePickerAdmin,
        components: {
          Field: '@/collections/Services/components/StartDateField/StartDateField',
        },
      },
      validate: (value, { siblingData }) => {
        if (!value) return 'Toto pole je povinné'
        const data = siblingData as { endDate?: string | Date }
        return validateDateTimeRange(value, data?.endDate, 'Musí být před datumem a časem konce')
      },
    },
    {
      name: 'endDate',
      label: 'Datum a čas konce',
      type: 'date',
      required: true,
      admin: {
        width: '50%',
        date: datePickerAdmin,
      },
      validate: (value, { siblingData }) => {
        if (!value) return 'Toto pole je povinné'
        const data = siblingData as { startDate?: string | Date }
        return validateDateTimeRange(data?.startDate, value, 'Musí být po datumu a čase začátku')
      },
    },
  ],
}
