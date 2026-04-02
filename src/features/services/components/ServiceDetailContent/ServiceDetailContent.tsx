'use client'
import { Service } from '@/payload-types'
import RichText from '@/components/RichText'
import { ServiceCourse } from './components/ServiceCourse/ServiceCourse'
import { ServiceContentSection } from './components/ServiceContentSection'
import { ServiceSchedule } from './components/ServiceSchedule/ServiceSchedule'
import { ServiceInfoItem } from './components/ServiceInfoItem'
import { ServiceLessons } from './components/ServiceCourse/ServiceLessons'
import { ServiceAnnouncements } from './components/ServiceAnnouncements'
import { cn } from '@/lib/utils'
import { ServiceBenefitsSection } from './components/ServiceBenefitsSection'
import { ServicePackagesSection } from './components/ServicePackagesSection'
import { isRichTextEmpty } from '@/utilities/richText'
import { ServiceCalendarSchedule } from './components/ServiceSchedule/ServiceCalendarSchedule'

type Props = {
  service: Service
  isPageDetail?: boolean
}

export function ServiceDetailContent({ service, isPageDetail = false }: Props) {
  if (!service.detail) {
    return null
  }

  const { serviceType, lessonsSection, courses, schedules, calendarSchedules } = service
  const { content, additionalInfo, note, announcementsSection, benefitsSection, packageSection } =
    service.detail

  const showContent = content && !isRichTextEmpty(content)
  const showAdditionalInfo = additionalInfo && additionalInfo.length > 0
  const showNote = note && !isRichTextEmpty(note)
  const showBenefits = benefitsSection?.enabled
  const showPackages = packageSection?.enabled
  const showLessons = serviceType === 'lessons' && lessonsSection
  const showCourses = serviceType === 'courses' && courses && courses.length > 0
  const showSchedule =
    (schedules && schedules.length > 0) || (calendarSchedules && calendarSchedules.length > 0)
  const showAnnouncements =
    announcementsSection?.enabled &&
    announcementsSection.announcements &&
    announcementsSection.announcements.length > 0

  return (
    <div className="space-y-6">
      {/* Content */}
      {showContent && <RichText className="text-lg text-foreground/90" data={content} />}

      {/* Benefits */}
      {showBenefits && <ServiceBenefitsSection benefitsSection={benefitsSection} />}

      {/* Info */}
      {showAdditionalInfo && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {additionalInfo.map((info, index) => {
            const isLastOdd = index === additionalInfo.length - 1 && additionalInfo.length % 2 !== 0

            return (
              <ServiceInfoItem
                key={info.id}
                {...info}
                className={cn(isPageDetail ? 'bg-card' : '', isLastOdd && 'sm:col-span-2')}
              />
            )
          })}
        </div>
      )}

      {/* Note */}
      {showNote && (
        <ServiceInfoItem
          className="bg-card"
          icon="notebook-pen"
          title="Poznámka"
          inline={false}
          value={<RichText className="text-base text-foreground/90" data={note} />}
        />
      )}

      {/* Packages */}
      {showPackages && <ServicePackagesSection packageSection={packageSection} />}

      {/* Lessons */}
      {showLessons && <ServiceLessons lessonsSection={lessonsSection} />}

      {/* Announcements */}
      {showAnnouncements && (
        <ServiceContentSection icon="megaphone" title="Aktuality a oznámení">
          <ServiceAnnouncements announcements={announcementsSection?.announcements ?? []} />
        </ServiceContentSection>
      )}

      {/* Courses */}
      {showCourses && (
        <ServiceContentSection icon="book-open" title="Kurzy">
          {courses.map((course) => (
            <ServiceCourse key={course.id} course={course} />
          ))}
        </ServiceContentSection>
      )}

      {/* Schedule */}
      {showSchedule && (
        <ServiceContentSection icon="calendar" title="Aktuální termíny">
          {schedules?.map((schedule) => (
            <ServiceSchedule key={schedule.id} schedule={schedule} />
          ))}
          {calendarSchedules?.map((calendarSchedule) => (
            <ServiceCalendarSchedule
              key={calendarSchedule.id}
              calendarSchedule={calendarSchedule}
            />
          ))}
        </ServiceContentSection>
      )}
    </div>
  )
}
