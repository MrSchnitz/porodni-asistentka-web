import { PageHeader as PageHeaderType } from '@/payload-types'

type Props = {
  data: PageHeaderType
  navbar?: React.ReactNode
}

export const PageHeader = ({ data: { title, subtitle }, navbar }: Props) => {
  return (
    <section className="py-10 sm:py-20 bg-linear-to-br from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 mb-6 sm:mb-8">{subtitle}</p>
          {navbar}
        </div>
      </div>
    </section>
  )
}
