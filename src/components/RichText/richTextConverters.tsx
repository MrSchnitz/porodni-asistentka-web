import React from 'react'
import { defaultJSXConverters } from '@payloadcms/richtext-lexical/react'
import { richTextTextState } from '@/fields/richTextTextState'

/** Lexical serializes NodeState (TextStateFeature) under the key '$' */
const NODE_STATE_KEY = '$' as const

type SerializedTextNode = {
  type: 'text'
  text: string
  format?: number
  fontFamily?: string
  fontSize?: string
  lineHeight?: string
  __state?: { fontFamily?: string; fontSize?: string; lineHeight?: string }
  [NODE_STATE_KEY]?: { fontFamily?: string; fontSize?: string; lineHeight?: string }
}

/** Map CSS property names to React style (camelCase) */
const cssToReactStyle = (css: Record<string, string>): React.CSSProperties => ({
  ...(css['font-family'] != null && { fontFamily: css['font-family'] }),
  ...(css['font-size'] != null && { fontSize: css['font-size'] }),
  ...(css['line-height'] != null && { lineHeight: css['line-height'] }),
})

function getTextStateStyle(node: SerializedTextNode): React.CSSProperties | null {
  const state = node[NODE_STATE_KEY] ?? node.__state
  const fontFamily = node.fontFamily ?? state?.fontFamily
  const fontSize = node.fontSize ?? state?.fontSize
  const lineHeight = node.lineHeight ?? state?.lineHeight
  if (!fontFamily && !fontSize && !lineHeight) return null
  const style: React.CSSProperties = {}
  const fontFamilyEntry =
    fontFamily && fontFamily in richTextTextState.fontFamily
      ? richTextTextState.fontFamily[fontFamily as keyof typeof richTextTextState.fontFamily]
      : null
  const fontSizeEntry =
    fontSize && fontSize in richTextTextState.fontSize
      ? richTextTextState.fontSize[fontSize as keyof typeof richTextTextState.fontSize]
      : null
  const lineHeightEntry =
    lineHeight && lineHeight in richTextTextState.lineHeight
      ? richTextTextState.lineHeight[lineHeight as keyof typeof richTextTextState.lineHeight]
      : null
  if (fontFamilyEntry?.css) Object.assign(style, cssToReactStyle(fontFamilyEntry.css))
  if (fontSizeEntry?.css) Object.assign(style, cssToReactStyle(fontSizeEntry.css))
  if (lineHeightEntry?.css) Object.assign(style, cssToReactStyle(lineHeightEntry.css))
  return Object.keys(style).length ? style : null
}

/**
 * Extends the official text converter with font family, size, and line height from TextStateFeature.
 * Bold, italic, etc. are handled by the package; we only add the font-style wrapper.
 */
const customTextConverter = {
  text: (args: { node: SerializedTextNode; [key: string]: unknown }) => {
    const { node } = args
    const baseContent =
      typeof defaultJSXConverters.text === 'function'
        ? (defaultJSXConverters.text as (a: typeof args) => React.ReactNode)(args)
        : node.text
    const textStateStyle = getTextStateStyle(node)
    if (textStateStyle) {
      return <span style={textStateStyle}>{baseContent}</span>
    }
    return baseContent
  },
}

export function getRichTextConverters() {
  return {
    ...defaultJSXConverters,
    ...customTextConverter,
  }
}
