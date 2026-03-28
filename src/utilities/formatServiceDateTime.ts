import { parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { PRAGUE_TZ } from '@/utilities/pragueTime'

type Props = {
  startDate: string | Date
  endDate?: string | Date
}

function toDate(value: string | Date): Date {
  return typeof value === 'string' ? parseISO(value) : value
}

export function formatServiceDateTime({ startDate, endDate }: Props) {
  const start = startDate ? toDate(startDate) : null
  const end = endDate ? toDate(endDate) : null

  const isSameDate =
    start && end
      ? formatInTimeZone(start, PRAGUE_TZ, 'yyyy-MM-dd') ===
        formatInTimeZone(end, PRAGUE_TZ, 'yyyy-MM-dd')
      : false

  const completeFormattedStartDate = start
    ? formatInTimeZone(start, PRAGUE_TZ, 'd. M. yyyy HH:mm')
    : ''
  const completeFormattedEndDate = end
    ? formatInTimeZone(end, PRAGUE_TZ, isSameDate ? 'HH:mm' : 'd. M. yyyy HH:mm')
    : ''
  const formattedStartDate = start ? formatInTimeZone(start, PRAGUE_TZ, 'd. M. yyyy') : ''
  const formattedEndDate = end ? formatInTimeZone(end, PRAGUE_TZ, 'd. M. yyyy') : ''
  const formattedStartTime = start ? formatInTimeZone(start, PRAGUE_TZ, 'HH:mm') : ''
  const formattedEndTime = end ? formatInTimeZone(end, PRAGUE_TZ, 'HH:mm') : ''

  const completeDateString = `${completeFormattedStartDate} ${completeFormattedEndDate ? ` - ${completeFormattedEndDate}` : ''}`
  const dateString = `${formattedStartDate} ${endDate && !isSameDate ? ` - ${formattedEndDate}` : ''}`
  const timeString = `${formattedStartTime} ${endDate ? ` - ${formattedEndTime}` : ''}`

  return { completeDateString, dateString, timeString }
}
