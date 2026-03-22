import { StickyHeader } from '@/features/_shared/StickyNavbar'
import { cn } from '@/lib/utils'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import { IconType } from '@/features/_shared/types'
import { ServiceIcon } from './ServiceIcon'
import { isRichTextEmpty } from '@/utilities/richText'
import { ServiceDetailBackButton } from './ServiceDetailBackButton'

type Props = {
  title: string
  icon?: IconType
  description?: DefaultTypedEditorState
}

type HeaderContentProps = Props & {
  compact?: boolean
}

function TitleWithIcon({ title, icon, description, compact }: HeaderContentProps) {
  const textSize = compact ? 'text-base sm:text-lg font-medium' : 'text-3xl'
  const Tag = compact ? 'span' : 'h1'
  const hasDescription = !!description && !isRichTextEmpty(description)

  return (
    <div
      className={cn(
        'flex',
        compact ? 'gap-3' : 'gap-4',
        hasDescription ? 'items-start' : 'items-center',
      )}
    >
      {!compact && icon && <ServiceIcon icon={icon} />}
      <div className="space-y-3">
        <Tag
          className={cn('text-foreground leading-tight', textSize)}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </Tag>
        {hasDescription && (
          <RichText className="text-base md:text-lg text-foreground/80" data={description!} />
        )}
      </div>
    </div>
  )
}

function HeaderContent({ title, icon, description, compact }: HeaderContentProps) {
  return (
    <div className={cn('flex', compact ? 'items-center gap-4' : 'flex-col gap-6')}>
      <ServiceDetailBackButton compact={compact} />
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
