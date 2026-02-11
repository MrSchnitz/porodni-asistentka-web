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

/**
 * Extract plain text from Lexical rich text editor state
 */
export function extractTextFromRichText(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null

  const richText = data as { root?: { children?: unknown[] } }
  if (!richText?.root?.children) return null

  const extractText = (nodes: unknown[]): string => {
    return nodes
      .map((node) => {
        if (!node || typeof node !== 'object') return ''
        const n = node as { text?: string; children?: unknown[] }
        if ('text' in n && typeof n.text === 'string') {
          return n.text
        }
        if ('children' in n && Array.isArray(n.children)) {
          return extractText(n.children)
        }
        return ''
      })
      .join('')
  }

  const text = extractText(richText.root.children).trim()
  return text || null
}

const WORDS_PER_MINUTE = 200

/**
 * Calculate read time in minutes from word count.
 * Uses ~200 words/min (average reading speed).
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/**
 * Get human-readable read time from Lexical rich text content.
 * Returns e.g. "1 min čtení" or "5 min čtení".
 */
export function getReadTimeFromRichText(data: unknown): string {
  const text = extractTextFromRichText(data)
  if (!text) return '1 min čtení'
  const words = countWords(text)
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
  return minutes === 1 ? '1 min čtení' : `${minutes} min čtení`
}
