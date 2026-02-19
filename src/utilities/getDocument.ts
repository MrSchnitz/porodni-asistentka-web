import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

export async function getDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}

/** Fetches a document by id (for collections without slug, e.g. reviews). */
export async function getDocumentById(collection: Collection, id: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection,
    depth,
    where: {
      id: { equals: id },
    },
  })

  return result.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
/** @public */
export const getCachedDocument = (collection: Collection, slug: string) =>
  unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })
