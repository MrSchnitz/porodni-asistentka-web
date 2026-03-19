'use client'

import { CMSLink } from '@/components/CMSLink/CMSLink'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/features/_shared/PageHeader'
import { AboutPage } from '@/payload-types'
import { isRichTextEmpty } from '@/utilities/richText'
import { cn } from '@/utilities/ui'

type Props = {
  data: AboutPage
}

export function AboutPageContent({
  data: { pageHeader, image, title, content, myStory, myValuesSection, ctaSection },
}: Props) {
  const showMyStory = myStory?.title || (myStory?.content && !isRichTextEmpty(myStory.content))
  const showMyValues = myValuesSection?.showMyValues
  const showCTA =
    ctaSection?.title || ctaSection?.subtitle || (ctaSection?.ctaButtons?.length ?? 0) > 0

  return (
    <main className="min-h-dvh flex flex-col">
      <PageHeader data={pageHeader} />

      <section className="py-20 bg-card flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              'grid grid-cols-1 gap-12 items-center mx-auto',
              image ? 'lg:grid-cols-2 max-w-6xl' : 'max-w-5xl',
            )}
          >
            <div>
              <h2
                className="text-3xl sm:text-4xl mb-6 text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {title}
              </h2>
              <RichText className="text-lg text-foreground/80 mb-6 max-w-full" data={content} />
            </div>

            {image && (
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/30 rounded-3xl transform rotate-3"></div>
                <Media
                  resource={image}
                  imgClassName="relative z-10 rounded-3xl w-full h-[500px] object-cover shadow-xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {showMyStory && (
        <section className="pb-20 bg-card flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {myStory?.title && (
                <h2
                  className="text-3xl text-center sm:text-4xl mb-6 text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {myStory?.title}
                </h2>
              )}
              {myStory?.content && !isRichTextEmpty(myStory.content) && (
                <RichText
                  className="text-lg text-foreground/80 mb-6 max-w-full"
                  data={myStory.content}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {showMyValues && (
        <section className="pb-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {myValuesSection?.title && (
                <h2
                  className="text-3xl sm:text-4xl mb-12 text-center text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {myValuesSection.title}
                </h2>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {myValuesSection?.values?.map((value) => (
                  <div key={value.id} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0 shadow-md">
                      <span className="text-2xl text-primary">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-foreground">{value.title}</h3>
                      <p className="text-foreground/70">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showCTA && (
        <section className="py-20 bg-linear-to-br from-muted to-accent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto border-primary/30 bg-card shadow-xl">
              <CardContent className="p-8 sm:p-12 text-center">
                <h2
                  className="text-3xl sm:text-4xl mb-4 text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {ctaSection?.title}
                </h2>
                {ctaSection?.subtitle && (
                  <p className="text-xl text-foreground/70 mb-8">{ctaSection.subtitle}</p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {ctaSection?.ctaButtons?.map((button, index) =>
                    button.link ? (
                      <CMSLink key={button.id} link={button.link}>
                        <Button
                          size="lg"
                          variant={index > 0 ? 'outline' : 'default'}
                          className={cn(
                            index > 0
                              ? 'border-primary text-primary hover:bg-primary/10'
                              : 'bg-primary hover:bg-secondary text-foreground shadow-lg',
                          )}
                        >
                          {button.link.label}
                        </Button>
                      </CMSLink>
                    ) : null,
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </main>
  )
}
