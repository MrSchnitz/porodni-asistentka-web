import { HomePage } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type Props = {
  images: HomePage['hero']['heroImages']
}

/**
 * Server component that renders <link rel="preload"> tags for hero images.
 * Place this component high in the page tree to ensure images start loading ASAP.
 */
export function HeroImagePreload({ images }: Props) {
  if (!images || images.length === 0) return null

  return (
    <>
      {images.map((item, index) => {
        if (!item?.heroImage || typeof item.heroImage !== 'object') return null

        const image = item.heroImage
        const src = getMediaUrl(image.url, image.updatedAt)

        return (
          <link
            key={index}
            rel="preload"
            as="image"
            href={src}
            // First image gets highest priority
            fetchPriority={index === 0 ? 'high' : 'low'}
          />
        )
      })}
    </>
  )
}
