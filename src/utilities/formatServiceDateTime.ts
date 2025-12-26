import { format, isSameDay } from 'date-fns'

type Props = {
  startDate: string | Date
  endDate: string | Date
}

export function formatServiceDateTime({ startDate, endDate }: Props) {
  const isSameDate = isSameDay(startDate, endDate)

  const completeFormattedStartDate = startDate ? format(startDate, 'd. M. yyyy hh:mm') : ''
  const completeFormattedEndDate = endDate
    ? format(endDate, isSameDate ? 'hh:mm' : 'd. M. yyyy hh:mm')
    : ''
  const formattedStartDate = startDate ? format(startDate, 'd. M. yyyy') : ''
  const formattedEndDate = endDate ? format(endDate, 'd. M. yyyy') : ''
  const formattedStartTime = startDate ? format(startDate, 'hh:mm') : ''
  const formattedEndTime = endDate ? format(endDate, 'hh:mm') : ''

  const completeDateString = `${completeFormattedStartDate} ${completeFormattedEndDate ? ` - ${completeFormattedEndDate}` : ''}`
  const dateString = `${formattedStartDate} ${!isSameDate ? ` - ${formattedEndDate}` : ''}`
  const timeString = `${formattedStartTime} ${` - ${formattedEndTime}`}`

  return { completeDateString, dateString, timeString }
}
