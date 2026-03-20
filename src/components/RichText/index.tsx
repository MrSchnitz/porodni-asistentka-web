import { type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/utilities/ui'
import { getRichTextConverters } from './richTextConverters'
import { isRichTextEmpty } from '@/utilities/richText'

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = false, ...rest } = props

  if (isRichTextEmpty(rest.data)) {
    return null
  }

  return (
    <ConvertRichText
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose md:prose-md dark:prose-invert prose-p:leading-snug prose-li:leading-snug prose-headings:leading-snug prose-p:my-2 prose-headings:my-3 prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm before:prose-code:content-none after:prose-code:content-none':
            enableProse,
        },
        className,
      )}
      converters={getRichTextConverters()}
      {...rest}
    />
  )
}
