import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'
import { cs } from 'date-fns/locale'

/** Rozvrh služeb a zobrazení času na webu — vždy podle pražského kalendáře a zdi času. */
export const PRAGUE_TZ = 'Europe/Prague'

/** Posun civilního data `yyyy-MM-dd` o N dní (nezávislé na TZ serveru). */
export function addCalendarDaysYmd(ymd: string, deltaDays: number): string {
  const [y, m, d] = ymd.split('-').map(Number)
  const u = new Date(Date.UTC(y, m - 1, d + deltaDays))
  return `${u.getUTCFullYear()}-${String(u.getUTCMonth() + 1).padStart(2, '0')}-${String(u.getUTCDate()).padStart(2, '0')}`
}

/** ISO den v Praze: 1 = pondělí … 7 = neděle. */
export function isoWeekdayPrague(instant: Date): number {
  return Number(formatInTimeZone(instant, PRAGUE_TZ, 'i'))
}

/** „d.M.“ pro jeden den v pražském kalendáři (poledne vyhne se okrajům DST). */
export function formatPragueCalendarDay(ymd: string): string {
  return formatInTimeZone(fromZonedTime(`${ymd}T12:00:00`, PRAGUE_TZ), PRAGUE_TZ, 'd.M.', {
    locale: cs,
  })
}

/**
 * Po–Pá aktuální pracovní týden; od soboty (včetně) do neděle zobrazovaný následující týden.
 * Hranice týdne jako UTC instanty vhodné pro DB a `isWithinInterval`.
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

/** Nový okamžik: kalendářní den z `dateFrom`, hodiny:minuty z `timeFrom` (oba v Praze). */
export function replaceInstantDateKeepPragueTime(dateFrom: Date, timeFrom: Date): Date {
  const d = formatInTimeZone(dateFrom, PRAGUE_TZ, 'yyyy-MM-dd')
  const t = formatInTimeZone(timeFrom, PRAGUE_TZ, 'HH:mm:ss')
  return fromZonedTime(`${d}T${t}`, PRAGUE_TZ)
}
