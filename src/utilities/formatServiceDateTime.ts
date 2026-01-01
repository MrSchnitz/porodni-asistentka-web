import { format, isSameDay } from 'date-fns'

type Props = {
  startDate: string | Date
  endDate?: string | Date
}

export function formatServiceDateTime({ startDate, endDate }: Props) {
  const isSameDate = endDate ? isSameDay(startDate, endDate) : false

  const completeFormattedStartDate = startDate ? format(startDate, 'd. M. yyyy HH:mm') : ''
  const completeFormattedEndDate = endDate
    ? format(endDate, isSameDate ? 'HH:mm' : 'd. M. yyyy HH:mm')
    : ''
  const formattedStartDate = startDate ? format(startDate, 'd. M. yyyy') : ''
  const formattedEndDate = endDate ? format(endDate, 'd. M. yyyy') : ''
  const formattedStartTime = startDate ? format(startDate, 'HH:mm') : ''
  const formattedEndTime = endDate ? format(endDate, 'HH:mm') : ''

  const completeDateString = `${completeFormattedStartDate} ${completeFormattedEndDate ? ` - ${completeFormattedEndDate}` : ''}`
  const dateString = `${formattedStartDate} ${endDate && !isSameDate ? ` - ${formattedEndDate}` : ''}`
  const timeString = `${formattedStartTime} ${endDate ? ` - ${formattedEndTime}` : ''}`

  return { completeDateString, dateString, timeString }
}
