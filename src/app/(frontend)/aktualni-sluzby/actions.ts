import { getPayload } from 'payload'
import config from '@payload-config'
import { parseISO, isWithinInterval } from 'date-fns'
import { formatServiceDateTime } from '@/utilities/formatServiceDateTime'
import {
  addCalendarDaysYmd,
  formatPragueCalendarDay,
  getDisplayedWorkWeekRange,
  isoWeekdayPrague,
} from '@/utilities/pragueTime'
import { ServiceStatus } from '@/payload-types'

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
}

const isoDayInPragueToName: Record<number, keyof WeeklyScheduleByDay> = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
}

export const dayNames: Record<keyof WeeklyScheduleByDay, string> = {
  monday: 'Pondělí',
  tuesday: 'Úterý',
  wednesday: 'Středa',
  thursday: 'Čtvrtek',
  friday: 'Pátek',
}

export async function getWeeklyScheduleItems(): Promise<{
  weeklySchedule: WeeklyScheduleByDay
  dayDates: Record<keyof WeeklyScheduleByDay, string>
}> {
  const payload = await getPayload({ config })

  const { weekStart, weekEnd, mondayYmd } = getDisplayedWorkWeekRange(new Date())

  const dayDates: Record<keyof WeeklyScheduleByDay, string> = {
    monday: formatPragueCalendarDay(mondayYmd),
    tuesday: formatPragueCalendarDay(addCalendarDaysYmd(mondayYmd, 1)),
    wednesday: formatPragueCalendarDay(addCalendarDaysYmd(mondayYmd, 2)),
    thursday: formatPragueCalendarDay(addCalendarDaysYmd(mondayYmd, 3)),
    friday: formatPragueCalendarDay(addCalendarDaysYmd(mondayYmd, 4)),
  }

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
  }

  for (const service of services.docs) {
    if (!service.schedules) continue

    for (const schedule of service.schedules) {
      if (!schedule.scheduleItems) continue

      for (const scheduleItem of schedule.scheduleItems) {
        const startDate = parseISO(scheduleItem.startDate)

        if (isWithinInterval(startDate, { start: weekStart, end: weekEnd })) {
          const dayName = isoDayInPragueToName[isoWeekdayPrague(startDate)]
          if (!dayName) continue

          const isWholeScheduleCancelled = schedule.status === 'cancelled'
          const locationTitles = ['Místo', 'Místa', 'Místo konání', 'Location']

          weeklySchedule[dayName].push({
            serviceName: service.title,
            lessonName: scheduleItem.lesson,
            tableName: schedule.title ?? '',
            time: formatServiceDateTime({
              startDate: scheduleItem.startDate,
              endDate: scheduleItem.endDate,
            }).timeString,
            location:
              service.detail?.additionalInfo?.find((info) =>
                locationTitles.includes(info.title ?? ''),
              )?.value ?? '',
            status: isWholeScheduleCancelled ? schedule.status : scheduleItem.status,
            notes: scheduleItem.notes ?? '',
            slug: service.slug,
          })
        }
      }
    }
  }

  for (const day of Object.keys(weeklySchedule) as (keyof WeeklyScheduleByDay)[]) {
    weeklySchedule[day].sort((a, b) => a.time.localeCompare(b.time))
  }

  return { weeklySchedule, dayDates }
}
