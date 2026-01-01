import { getPayload } from 'payload'
import config from '@payload-config'
import {
  startOfWeek,
  endOfWeek,
  parseISO,
  getDay,
  isWithinInterval,
  addDays,
  format,
} from 'date-fns'
import { formatServiceDateTime } from '@/utilities/formatServiceDateTime'
import { ServiceStatus } from '@/payload-types'
import { cs } from 'date-fns/locale'

export type WeeklyScheduleItem = {
  serviceName: string
  lessonName: string
  tableName: string
  time: string
  location: string
  status?: ServiceStatus
  notes: string
  slug: string
}

export type WeeklyScheduleByDay = {
  monday: WeeklyScheduleItem[]
  tuesday: WeeklyScheduleItem[]
  wednesday: WeeklyScheduleItem[]
  thursday: WeeklyScheduleItem[]
  friday: WeeklyScheduleItem[]
  saturday: WeeklyScheduleItem[]
}

export const dayIndexToName: Record<number, keyof WeeklyScheduleByDay> = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
}

export const dayNames: Record<keyof WeeklyScheduleByDay, string> = {
  monday: 'Pondělí',
  tuesday: 'Úterý',
  wednesday: 'Středa',
  thursday: 'Čtvrtek',
  friday: 'Pátek',
  saturday: 'Sobota',
}

export async function getWeeklyScheduleItems(): Promise<{
  weeklySchedule: WeeklyScheduleByDay
  dayDates: Record<keyof WeeklyScheduleByDay, string>
}> {
  const payload = await getPayload({ config })

  const now = new Date()
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }) // Monday as first day
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 })

  const dayDates: Record<keyof WeeklyScheduleByDay, string> = {
    monday: format(weekStart, 'd.M.', { locale: cs }),
    tuesday: format(addDays(weekStart, 1), 'd.M.', { locale: cs }),
    wednesday: format(addDays(weekStart, 2), 'd.M.', { locale: cs }),
    thursday: format(addDays(weekStart, 3), 'd.M.', { locale: cs }),
    friday: format(addDays(weekStart, 4), 'd.M.', { locale: cs }),
    saturday: format(addDays(weekStart, 5), 'd.M.', { locale: cs }),
  }

  // Query only services that have schedule items within the current week
  const services = await payload.find({
    collection: 'services',
    limit: 0,
    depth: 2,
    where: {
      and: [
        {
          'schedules.scheduleItems.startDate': {
            greater_than_equal: weekStart.toISOString(),
          },
        },
        {
          'schedules.scheduleItems.startDate': {
            less_than_equal: weekEnd.toISOString(),
          },
        },
      ],
    },
  })

  const weeklySchedule: WeeklyScheduleByDay = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  }

  // Still need to filter individual items since DB query returns services
  // that have at least one matching item, but may include other items too
  for (const service of services.docs) {
    if (!service.schedules) continue

    for (const schedule of service.schedules) {
      if (!schedule.scheduleItems) continue

      for (const scheduleItem of schedule.scheduleItems) {
        const startDate = parseISO(scheduleItem.startDate)

        if (isWithinInterval(startDate, { start: weekStart, end: weekEnd })) {
          const dayIndex = getDay(startDate)
          const dayName = dayIndexToName[dayIndex]

          const isWholeScheduleCancelled = ['cancelled', 'booked'].includes(schedule.status ?? '')

          weeklySchedule[dayName].push({
            serviceName: service.title,
            lessonName: scheduleItem.lesson,
            tableName: schedule.title ?? '',
            time: formatServiceDateTime({
              startDate: scheduleItem.startDate,
              endDate: scheduleItem.endDate,
            }).timeString,
            location: service.location ?? '',
            status: isWholeScheduleCancelled ? schedule.status : scheduleItem.status,
            notes: scheduleItem.notes ?? '',
            slug: service.slug,
          })
        }
      }
    }
  }

  // Sort each day's items by start time
  for (const day of Object.keys(weeklySchedule) as (keyof WeeklyScheduleByDay)[]) {
    weeklySchedule[day].sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime()
    })
  }

  return { weeklySchedule, dayDates }
}
