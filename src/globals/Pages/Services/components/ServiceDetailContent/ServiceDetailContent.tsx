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

type Props = {
  service: Service
  isPageDetail?: boolean
}

export function ServiceDetailContent({ service, isPageDetail = false }: Props) {
  if (!service.detail) {
    return null
  }

  const { serviceType, lessonsSection, courses, schedules } = service
  const { content, additionalInfo, note, announcements } = service.detail

  return (
    <div className="space-y-6">
      {/* Content */}
      {content && <RichText className="text-base md:text-lg text-foreground/90" data={content} />}

      {/* Info */}
      {additionalInfo && additionalInfo.length > 0 && (
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
      {note && (
        <ServiceInfoItem
          className="bg-card"
          icon="notebook-pen"
          title="Poznámka"
          value={<RichText className="text-base" data={note} />}
        />
      )}

      {/* Lessons */}
      {serviceType === 'lessons' && lessonsSection && (
        <ServiceLessons lessonsSection={lessonsSection} />
      )}

      {/* Announcements */}
      {announcements && announcements.length > 0 && (
        <ServiceContentSection icon="megaphone" title="Aktuality a oznámení">
          <div className="space-y-4">
            <ServiceAnnouncements announcements={announcements} />
          </div>
        </ServiceContentSection>
      )}

      {/* Courses */}
      {serviceType === 'courses' && courses && courses.length > 0 && (
        <ServiceContentSection icon="book-open" title="Kurzy">
          <div className="space-y-4">
            {courses.map((course) => (
              <ServiceCourse key={course.id} course={course} />
            ))}
          </div>
        </ServiceContentSection>
      )}

      {/* Schedule */}
      {schedules && schedules.length > 0 && (
        <ServiceContentSection icon="calendar" title="Aktuální termíny">
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <ServiceSchedule key={schedule.id} schedule={schedule} />
            ))}
          </div>
        </ServiceContentSection>
      )}
    </div>
  )
}
