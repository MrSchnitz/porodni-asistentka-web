import { serviceLimitedSpots } from '@/collections/Services/fields/serviceLimitedSpots'
import { serviceStatus } from '@/collections/Services/fields/serviceStatus'
import { CollectionConfig } from 'payload'
import { serviceScheduleItems } from './fields/serviceScheduleItems'
import { serviceLessonSection } from './fields/serviceLessonSection'
import { serviceAdditionalInfo } from './fields/serviceAdditionalInfo'
import { serviceAnnouncementsSection } from './fields/serviceAnnouncementsSection'
import { iconImageField } from '@/fields/iconField'
import { servicePackagesSection } from './fields/servicePackagesSection'
import { serviceBenefitsSection } from './fields/serviceBenefitsSection'
import { generateSlug } from '@/utilities/generateSlug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Služba',
    plural: 'Služby',
  },
  admin: {
    defaultColumns: ['title'],
    useAsTitle: 'title',
    group: 'Obsah',
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from title if not provided or on create
        if (data?.title && (!data.slug || operation === 'create')) {
          data.slug = generateSlug(data.title)
        }
        return data
      },
    ],
    afterDelete: [
      async ({ id, req }) => {
        // Remove deleted service from ServicesPage global
        const servicesPage = await req.payload.findGlobal({
          slug: 'servicesPage',
        })

        if (servicesPage?.serviceSections?.length) {
          let hasChanges = false

          const filteredSections = servicesPage.serviceSections.map((section) => {
            const items = section.servicesSection?.serviceSectionItems
            if (!items?.length) return section

            const filteredItems = items.filter((sectionItem) => {
              const itemValue = sectionItem.item?.value
              const itemId = typeof itemValue === 'object' ? itemValue?.id : itemValue
              return itemId !== id
            })

            if (filteredItems.length !== items.length) {
              hasChanges = true
              return {
                ...section,
                servicesSection: {
                  ...section.servicesSection,
                  serviceSectionItems: filteredItems,
                },
              }
            }

            return section
          })

          // Only update if something was removed
          if (hasChanges) {
            await req.payload.updateGlobal({
              slug: 'servicesPage',
              data: {
                serviceSections: filteredSections,
              },
            })
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'URL zkratka služby (Slug)',
      admin: {
        position: 'sidebar',
        placeholder: 'slug-z-nazvu',
        description: 'Automaticky generovaný z názvu služby. Lze upravit.',
      },
      required: true,
      unique: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Základní informace',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Název',
              required: true,
            },
            iconImageField,
            {
              type: 'tabs',
              tabs: [
                {
                  label: 'Kartička služby',
                  fields: [
                    {
                      name: 'card',
                      type: 'group',
                      label: '',
                      required: true,
                      admin: {
                        hideGutter: true,
                      },
                      fields: [
                        { name: 'description', type: 'richText', label: 'Popis', required: true },
                        serviceAdditionalInfo({
                          defaultValue: [
                            {
                              title: 'Cena',
                              value: '',
                            },
                          ],
                          fields: [
                            { name: 'title', label: 'Název', type: 'text', required: true },
                            { name: 'value', label: 'Popis', type: 'textarea', required: true },
                          ],
                        }),
                      ],
                    },
                  ],
                },
                {
                  label: 'Detail služby',
                  fields: [
                    {
                      name: 'detail',
                      type: 'group',
                      label: '',
                      required: true,
                      admin: {
                        hideGutter: true,
                      },
                      fields: [
                        {
                          name: 'content',
                          type: 'richText',
                          label: 'Obsah',
                        },
                        serviceAdditionalInfo({
                          defaultValue: [
                            {
                              icon: 'clock',
                              title: 'Délka',
                              value: '',
                            },
                            {
                              icon: 'coins',
                              title: 'Cena',
                              value: '',
                            },
                            {
                              icon: 'map-pin',
                              title: 'Místo',
                              value: '',
                            },
                          ],
                        }),
                        { name: 'note', type: 'richText', label: 'Poznámka' },
                        serviceBenefitsSection(),
                        servicePackagesSection(),
                        serviceAnnouncementsSection(),
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Lekce / Kurzy',
          fields: [
            {
              name: 'serviceType',
              type: 'select',
              label: 'Typ obsahu',
              defaultValue: 'courses',
              options: [
                { label: 'Kurzy s lekcemi', value: 'courses' },
                { label: 'Samostatné lekce', value: 'lessons' },
              ],
            },
            serviceLessonSection({
              admin: {
                condition: (_, siblingData) => siblingData?.serviceType === 'lessons',
              },
            }),
            {
              name: 'courses',
              interfaceName: 'courses',
              label: 'Kurzy',
              type: 'array',
              labels: { singular: 'Kurz', plural: 'Kurzy' },
              admin: {
                components: {
                  RowLabel: '@/collections/Services/components/RowLabels/CourseRowLabel',
                },
                condition: (_, siblingData) => siblingData?.serviceType === 'courses',
              },
              fields: [
                {
                  type: 'group',
                  label: 'Popis kurzu',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Název',
                    },
                    {
                      name: 'description',
                      type: 'richText',
                      label: 'Popis',
                    },
                    serviceAdditionalInfo({
                      maxRows: 3,
                      defaultValue: [
                        {
                          icon: 'clock',
                          title: 'Délka',
                          value: '',
                        },
                        {
                          icon: 'coins',
                          title: 'Cena',
                          value: '',
                        },
                        {
                          icon: 'map-pin',
                          title: 'Místo',
                          value: '',
                        },
                      ],
                    }),
                  ],
                },
                serviceLessonSection(),
              ],
            },
          ],
        },
        {
          label: 'Plánování',
          fields: [
            {
              name: 'schedules',
              interfaceName: 'schedules',
              type: 'array',
              label: 'Tabulky termínů',
              labels: { singular: 'Tabulka', plural: 'Tabulky' },
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/collections/Services/components/RowLabels/PlanningRowLabel',
                },
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Název tabulky',
                  admin: {
                    placeholder: 'např. Termíny kurzu, Konzultace...',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Popis',
                },
                {
                  name: 'courseIndex',
                  type: 'text',
                  label: 'Kurz (volitelné)',
                  admin: {
                    description: 'Vyberte kurz - v termínech pak můžete vybírat lekce',
                    components: {
                      Field: '@/collections/Services/components/CourseSelect/CourseSelect',
                    },
                  },
                },
                serviceStatus,
                serviceLimitedSpots,
                serviceScheduleItems,
              ],
            },
          ],
        },
      ],
    },
  ],
}
