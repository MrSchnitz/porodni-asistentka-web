'use client'
import { WeeklyScheduledServicesInfoSection } from '../../types'
import { Card, CardContent } from '@/components/ui/card'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ZoomIn } from 'lucide-react'
import { Media } from '@/components/Media'
import { useState } from 'react'
import { Props as MediaProps } from '@/components/Media/types'
import { LightBox } from '@/components/Lightbox/LightBox'
import { formatServiceDateTime } from '@/utilities/formatServiceDateTime'

type Props = {
  infoSection: WeeklyScheduledServicesInfoSection
}

export const WeeklyInfoSection = ({
  infoSection: { title, description, announcements },
}: Props) => {
  const [lightboxImage, setLightboxImage] = useState<MediaProps['resource'] | null>(null)

  if (!announcements || announcements.length === 0) {
    return null
  }

  return (
    <>
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl mb-12 text-center text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          {description && (
            <p className="max-w-2xl mx-auto mb-10 text-center text-lg text-foreground/80">
              {description}
            </p>
          )}

          <div className="max-w-3xl mx-auto space-y-6">
            {announcements.map((announcement, index) => {
              const formatedDate = announcement.date
                ? formatServiceDateTime({
                    startDate: announcement.date,
                  })
                : null

              return (
                <Card key={index} className="border-primary/30 bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      {announcement.title && (
                        <h3 className="text-xl text-foreground">{announcement.title}</h3>
                      )}
                      {formatedDate && (
                        <span className="text-sm text-foreground/60 whitespace-nowrap ml-4">
                          {formatedDate.dateString}
                        </span>
                      )}
                    </div>
                    {announcement.description && (
                      <RichText data={announcement.description} className="text-foreground/80" />
                    )}
                    {announcement.image && (
                      <div
                        className="relative group cursor-pointer rounded-lg overflow-hidden max-w-xs mt-4"
                        onClick={() => setLightboxImage(announcement.image)}
                      >
                        <Media
                          resource={announcement.image}
                          imgClassName="w-full h-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center text-white">
                            <ZoomIn className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-sm">Klikněte pro zvětšení</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      {lightboxImage && (
        <LightBox resource={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </>
  )
}
