import { getGlobal } from '@/utilities/getGlobals'
import { AboutPage } from '@/payload-types'
import { PageHeader } from '@/globals/Pages/components/PageHeader'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@payloadcms/ui'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

export default async function Page() {
  const data = (await getGlobal('aboutPage', 1)) as AboutPage

  return (
    <main className="min-h-dvh flex flex-col">
      <PageHeader data={data.pageHeader} />

      <section className="py-20 bg-card flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2
                className="text-3xl sm:text-4xl mb-6 text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {data.title}
              </h2>
              <RichText className="text-lg text-foreground/80 mb-6" data={data.content} />
            </div>

            {data.image && (
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/30 rounded-3xl transform rotate-3"></div>
                <Media
                  resource={data.image}
                  imgClassName="relative z-10 rounded-3xl w-full h-[500px] object-cover shadow-xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {data.myValuesSection && data.myValuesSection.showMyValues && (
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl mb-12 text-center text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {data.myValuesSection.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.myValuesSection.values?.map((value) => (
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

      <section className="py-20 bg-linear-to-br from-muted to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto border-primary/30 bg-card shadow-xl">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2
                className="text-3xl sm:text-4xl mb-4 text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {data.ctaSection.title}
              </h2>
              {data.ctaSection.subtitle && (
                <p className="text-xl text-foreground/70 mb-8">{data.ctaSection.subtitle}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {data.ctaSection.ctaButtons?.map((button, index) => (
                  <Link key={button.id} href={button.link.url ?? ''}>
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
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
