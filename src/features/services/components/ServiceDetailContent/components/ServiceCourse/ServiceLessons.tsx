import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { LessonsSection } from '@/features/_shared/types'
import { isRichTextEmpty } from '@/utilities/richText'
import { ChevronsDown, ChevronsUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utilities/ui'

const LessonTitle = ({
  title,
  index,
  className,
}: {
  title: string
  index?: number
  className?: string
}) => {
  return (
    <div className={cn('flex items-start gap-2', className)}>
      {index && <span className="text-primary shrink-0 text-sm">{index}.</span>}
      <p className="text-sm font-medium">{title}</p>
    </div>
  )
}

type Props = {
  lessonsSection: LessonsSection
}

export const ServiceLessons = ({
  lessonsSection: { lessons, title, description, showLessonNumbers },
}: Props) => {
  const [openItems, setOpenItems] = useState<string[]>([])
  const allExpanded = lessons && lessons.length > 0 && openItems.length === lessons.length
  const hasAnyDescription = lessons?.some(
    (lesson) => lesson.description && !isRichTextEmpty(lesson.description),
  )

  const handleExpandAll = () => {
    setOpenItems(lessons?.map((lesson) => lesson.id ?? '').filter(Boolean) ?? [])
  }

  const handleCollapseAll = () => {
    setOpenItems([])
  }

  if (!lessons || lessons.length === 0) {
    return null
  }

  return (
    <div className="bg-card rounded-lg p-4 border border-primary/20">
      <div className="flex items-center justify-between mb-2">
        {title && <h5 className="text-md font-medium text-foreground">{title}</h5>}
        {hasAnyDescription && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (allExpanded ? handleCollapseAll() : handleExpandAll())}
            className="text-primary hover:text-primary/80 hover:bg-primary/10 h-7 text-xs"
          >
            {allExpanded ? (
              <>
                <ChevronsUp className="w-3 h-3 mr-1" />
                Sbalit vše
              </>
            ) : (
              <>
                <ChevronsDown className="w-3 h-3 mr-1" />
                Rozbalit vše
              </>
            )}
          </Button>
        )}
      </div>
      {description && <p className="text-sm text-foreground/90 mb-3">{description}</p>}

      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
        {lessons.map((lesson, index) => {
          const hasDescription = lesson.description && !isRichTextEmpty(lesson.description)

          const title = (
            <LessonTitle title={lesson.title} index={showLessonNumbers ? index + 1 : undefined} />
          )

          return (
            <AccordionItem key={lesson.id ?? index} value={lesson.id ?? `lesson-${index}`}>
              {hasDescription ? (
                <AccordionTrigger className="text-left hover:text-primary cursor-pointer py-2">
                  {title}
                </AccordionTrigger>
              ) : (
                <div className="py-2">{title}</div>
              )}
              {hasDescription && lesson.description && (
                <AccordionContent>
                  <div className="text-sm leading-relaxed pl-6 border-l-2 border-primary/30">
                    <RichText className="text-sm" data={lesson.description} />
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
