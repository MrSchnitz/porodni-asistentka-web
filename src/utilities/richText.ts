import { type DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

/**
 * Check if a Lexical rich text editor state is empty
 * (no actual text content, just empty paragraphs)
 */
export function isRichTextEmpty(data: DefaultTypedEditorState | null | undefined): boolean {
  if (!data?.root?.children) return true

  // Check if any child has actual content
  const hasContent = data.root.children.some((node) => {
    if ('children' in node && Array.isArray(node.children)) {
      return node.children.length > 0
    }
    if ('text' in node && typeof node.text === 'string') {
      return node.text.trim().length > 0
    }
    return false
  })

  return !hasContent
}
