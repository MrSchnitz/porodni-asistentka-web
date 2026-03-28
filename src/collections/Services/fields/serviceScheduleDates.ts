import { parseISO, isValid, isAfter } from 'date-fns'
import { Field } from 'payload'

const validateDateTimeRange = (
  startDate: string | Date | null | undefined,
  endDate: string | Date | null | undefined,
  errorMessage: string,
): string | true => {
  if (!startDate || !endDate) return true

  const parseDate = (val: string | Date) => {
    const d = typeof val === 'string' ? parseISO(val) : val
    return isValid(d) ? d : null
  }

  const start = parseDate(startDate)
  const end = parseDate(endDate)

  if (!start || !end) return true

  return isAfter(end, start) ? true : errorMessage
}

export const serviceScheduleDates: Field = {
  type: 'row',
  fields: [
    {
      name: 'startDate',
      label: 'Datum a čas začátku',
      type: 'date',
      required: true,
      admin: {
        width: '50%',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd.M.yyyy HH:mm',
          timeFormat: 'HH:mm',
          timeIntervals: 15,
          overrides: {
            popperPlacement: 'bottom-end',
          },
        },
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
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd.M.yyyy HH:mm',
          timeFormat: 'HH:mm',
          timeIntervals: 15,
          overrides: {
            popperPlacement: 'bottom-end',
          },
        },
      },
      validate: (value, { siblingData }) => {
        if (!value) return 'Toto pole je povinné'
        const data = siblingData as { startDate?: string | Date }
        return validateDateTimeRange(data?.startDate, value, 'Musí být po datumu a čase začátku')
      },
    },
  ],
}
