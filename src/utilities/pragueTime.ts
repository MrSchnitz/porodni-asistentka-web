import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'
import { cs } from 'date-fns/locale'

/** Service scheduling and time display on the web, always in Prague calendar/wall time. */
export const PRAGUE_TZ = 'Europe/Prague'

/** Shift a civil `yyyy-MM-dd` date by N days (independent of server TZ). */
export function addCalendarDaysYmd(ymd: string, deltaDays: number): string {
  const [y, m, d] = ymd.split('-').map(Number)
  const u = new Date(Date.UTC(y, m - 1, d + deltaDays))
  return `${u.getUTCFullYear()}-${String(u.getUTCMonth() + 1).padStart(2, '0')}-${String(u.getUTCDate()).padStart(2, '0')}`
}

/** ISO weekday in Prague: 1 = Monday ... 7 = Sunday. */
export function isoWeekdayPrague(instant: Date): number {
  return Number(formatInTimeZone(instant, PRAGUE_TZ, 'i'))
}

/** "d.M." for one Prague calendar day (noon avoids DST edge cases). */
export function formatPragueCalendarDay(ymd: string): string {
  return formatInTimeZone(fromZonedTime(`${ymd}T12:00:00`, PRAGUE_TZ), PRAGUE_TZ, 'd.M.', {
    locale: cs,
  })
}

/**
 * Mon-Fri shows the current work week; from Saturday (inclusive) to Sunday shows next week.
 * Week boundaries as UTC instants, suitable for DB filters and `isWithinInterval`.
 */
export function getDisplayedWorkWeekRange(now: Date = new Date()) {
  const ymd = formatInTimeZone(now, PRAGUE_TZ, 'yyyy-MM-dd')
  const isoDow = Number(formatInTimeZone(now, PRAGUE_TZ, 'i'))
  const daysBackToSat = isoDow === 6 ? 0 : isoDow === 7 ? 1 : isoDow + 1
  const mondayYmd = addCalendarDaysYmd(addCalendarDaysYmd(ymd, -daysBackToSat), 2)
  const weekStart = fromZonedTime(`${mondayYmd}T00:00:00`, PRAGUE_TZ)
  const sundayYmd = addCalendarDaysYmd(mondayYmd, 6)
  const weekEnd = fromZonedTime(`${sundayYmd}T23:59:59.999`, PRAGUE_TZ)
  return { weekStart, weekEnd, mondayYmd }
}

/** New instant: calendar day from `dateFrom`, hours:minutes from `timeFrom` (both in Prague). */
export function replaceInstantDateKeepPragueTime(dateFrom: Date, timeFrom: Date): Date {
  const d = formatInTimeZone(dateFrom, PRAGUE_TZ, 'yyyy-MM-dd')
  const t = formatInTimeZone(timeFrom, PRAGUE_TZ, 'HH:mm:ss')
  return fromZonedTime(`${d}T${t}`, PRAGUE_TZ)
}
