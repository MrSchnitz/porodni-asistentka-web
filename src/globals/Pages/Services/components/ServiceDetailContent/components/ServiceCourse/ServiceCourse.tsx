'use client'
import { Card, CardContent } from '@/components/ui/card'
import RichText from '@/components/RichText'
import { ServiceLessons } from './ServiceLessons'
import { ServiceCourseInfoItem } from './components/ServiceCourseInfoItem'
import { Course } from '../../../../../types'

interface CourseScheduleProps {
  course: Course
}

export function ServiceCourse({
  course: { name, description, additionalInfo, lessonsSection },
}: CourseScheduleProps) {
  return (
    <Card className="border-primary/30 bg-muted/50">
      <CardContent className="p-4">
        {/* Course Overview */}
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2 text-foreground">{name}</h4>

          {description && (
            <div className="text-sm text-foreground/80 mb-3">
              <RichText data={description} />
            </div>
          )}

          {additionalInfo && additionalInfo.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {additionalInfo.map((info) => (
                <ServiceCourseInfoItem key={info.id} {...info} />
              ))}
            </div>
          )}
        </div>

        {/* Lessons Section */}
        {lessonsSection && <ServiceLessons lessonsSection={lessonsSection} />}
      </CardContent>
    </Card>
  )
}
