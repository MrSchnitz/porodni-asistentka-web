'use client'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { Announcements } from '@/payload-types'
import { formatServiceDateTime } from '@/utilities/formatServiceDateTime'
import { ZoomIn } from 'lucide-react'
import { useState } from 'react'
import { Props as MediaProps } from '@/components/Media/types'
import { LightBox } from '@/components/Lightbox/LightBox'

type Props = {
  announcements: NonNullable<Announcements>
}

export const ServiceAnnouncements = ({ announcements }: Props) => {
  const [lightboxImage, setLightboxImage] = useState<MediaProps['resource'] | null>(null)

  if (!announcements || announcements.length === 0) {
    return null
  }

  return (
    <>
      {announcements.map((announcement, idx) => {
        const formatedDate = announcement.date
          ? formatServiceDateTime({ startDate: announcement.date })
          : null

        return (
          <Card key={idx} className="border-primary/20 bg-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg text-foreground">{announcement.title}</h3>
                {formatedDate && (
                  <span className="text-sm text-foreground/60 whitespace-nowrap ml-4">
                    {formatedDate?.dateString}
                  </span>
                )}
              </div>
              {announcement.description && (
                <RichText data={announcement.description} className="text-foreground/70 mb-3" />
              )}
              {announcement.image && (
                <button
                  type="button"
                  className="relative group cursor-pointer rounded-lg overflow-hidden max-w-xs mt-4 border-0 p-0 bg-transparent"
                  onClick={() => setLightboxImage(announcement.image)}
                  aria-label={`Zobrazit obrázek ${announcement.title} ve větší velikosti`}
                >
                  <Media
                    resource={announcement.image}
                    imgClassName="w-full h-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="text-center text-white">
                      <ZoomIn className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Klikněte pro zvětšení</p>
                    </div>
                  </div>
                </button>
              )}
            </CardContent>
          </Card>
        )
      })}
      {lightboxImage && (
        <LightBox resource={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </>
  )
}
