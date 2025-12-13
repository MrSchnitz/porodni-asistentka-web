import { BookOpen, Clock, Coins, MapPin } from 'lucide-react'
import { Service } from '@/payload-types'
import { ServiceIcon } from '@/globals/Pages/components/ServiceIcon'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PAGE_ROUTES } from '../../pageRoutes'

type Props = {
  service: Service
}

export function ServiceContent({ service }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          {service.icon && <ServiceIcon icon={service.icon} />}
          <h1 className="text-3xl text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            {service.title}
          </h1>
        </div>
        <div className="text-lg text-foreground/70">
          <RichText data={service.description} />
        </div>
      </div>

      {/* Content */}
      {service.content && <RichText data={service.content} />}

      {/* Course Lesson Descriptions */}
      {service.lessons && service.lessons.length > 0 && (
        <div className="bg-muted rounded-xl p-6 border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-xl text-foreground">Obsah jednotlivých lekcí</h3>
          </div>
          <p className="text-sm text-foreground/70 mb-4">
            Tématické zaměření platí pro všechny běhy kurzu
          </p>
          <Accordion type="single" collapsible className="w-full">
            {service.lessons.map((lesson, index) => (
              <AccordionItem key={lesson.id} value={`lesson-${index + 1}`}>
                <AccordionTrigger className="text-left hover:text-primary cursor-pointer">
                  <span className="font-medium">
                    {index + 1}. lekce: {lesson.item.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-primary/30">
                    <RichText data={lesson.item.description} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Pricing & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-background rounded-xl p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>{service.duration.title}</span>
          </div>
          <p className="text-lg text-foreground">{service.duration.value}</p>
        </div>
        <div className="bg-background rounded-xl p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-primary" />
            <span>{service.price.title}</span>
          </div>
          <p className="text-lg">{service.price.value}</p>
        </div>
        <div className="bg-background rounded-xl p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{service.place.title}</span>
          </div>
          <p className="text-lg">{service.place.value}</p>
        </div>
      </div>

      {/* Price Details */}
      {service.note && <RichText data={service.note} />}

      {/* CTA Button */}
      <Link href={PAGE_ROUTES.contactPage.path}>
        <Button size="lg" className="w-full bg-primary hover:bg-secondary text-foreground">
          Kontaktovat
        </Button>
      </Link>
    </div>
  )
}
