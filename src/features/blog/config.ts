import { pageHeader } from '@/fields/pageHeader'
import { GlobalConfig } from 'payload'

export const BlogPage: GlobalConfig = {
  slug: 'blogPage',
  label: 'Blog',
  admin: {
    group: 'Stránky',
  },
  fields: [
    pageHeader,
    {
      name: 'blogPosts',
      type: 'array',
      label: 'Vybrané příspěvky',
      labels: {
        singular: 'Příspěvek',
        plural: 'Příspěvky',
      },
      admin: {
        components: {
          RowLabel: '@/features/blog/components/BlogPostRowLabel/BlogPostRowLabel',
        },
      },
      fields: [
        {
          name: 'blogPost',
          type: 'relationship',
          label: 'Blog',
          relationTo: 'blogs',
        },
      ],
    },
  ],
}
