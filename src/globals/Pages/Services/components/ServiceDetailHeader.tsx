import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { PAGE_ROUTES } from '../../pageRoutes'
import { StickyHeader } from '../../components/StickyNavbar'
import { cn } from '@/lib/utils'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'

type Props = {
  title: string
  icon?: string
  description?: DefaultTypedEditorState
}

type HeaderContentProps = Props & {
  compact?: boolean
}

function BackButton({ compact }: { compact?: boolean }) {
  return (
    <Link href={PAGE_ROUTES.servicesPage.path} className={compact ? 'shrink-0' : undefined}>
      <Button
        variant="ghost"
        size={compact ? 'sm' : 'default'}
        className={cn(
          'text-foreground/70 hover:text-foreground hover:bg-muted',
          compact ? 'h-8 px-2' : 'w-fit',
        )}
      >
        <ArrowLeft className={cn('mr-2', compact ? 'w-3 h-3' : 'w-4 h-4')} />
        Zpět
      </Button>
    </Link>
  )
}

function TitleWithIcon({ title, icon, description, compact }: HeaderContentProps) {
  const iconSize = compact ? 'w-8 h-8' : 'w-14 h-14'
  const iconInnerSize = compact ? 'w-4 h-4' : 'w-7 h-7'
  const textSize = compact ? 'text-base sm:text-lg font-medium' : 'text-3xl'
  const Tag = compact ? 'span' : 'h1'

  return (
    <div
      className={cn(
        'flex',
        compact ? 'gap-3' : 'gap-4',
        description ? 'items-start' : 'items-center',
      )}
    >
      <div
        className={cn(
          'bg-primary/10 rounded-full flex items-center justify-center shrink-0',
          iconSize,
          compact && 'hidden sm:flex',
        )}
      >
        <DynamicIcon name={icon as IconName} className={cn('text-primary', iconInnerSize)} />
      </div>
      <div className="space-y-3">
        <Tag
          className={cn('text-foreground leading-tight', textSize)}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </Tag>
        {description && (
          <RichText className="text-base md:text-lg text-foreground/80" data={description} />
        )}
      </div>
    </div>
  )
}

function HeaderContent({ title, icon, description, compact }: HeaderContentProps) {
  return (
    <div className={cn('flex', compact ? 'items-center gap-4' : 'flex-col gap-6')}>
      <BackButton compact={compact} />
      <TitleWithIcon title={title} icon={icon} description={description} compact={compact} />
    </div>
  )
}

export function ServiceDetailHeader({ title, description, icon }: Props) {
  return (
    <StickyHeader
      className="bg-background py-8"
      fixedMaxWidth="max-w-4xl"
      fixedContent={<HeaderContent title={title} icon={icon} compact />}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <HeaderContent title={title} description={description} icon={icon} />
      </div>
    </StickyHeader>
  )
}
