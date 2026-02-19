/**
 * Single source of truth for rich text TextStateFeature (font family, font size).
 * Used by the Lexical editor config and by the frontend RichText converter.
 */
export const richTextTextState = {
  fontFamily: {
    arial: {
      label: 'Arial',
      css: { 'font-family': 'Arial, sans-serif' },
    },
    'times-new-roman': {
      label: 'Times New Roman',
      css: { 'font-family': '"Times New Roman", serif' },
    },
    georgia: {
      label: 'Georgia',
      css: { 'font-family': 'Georgia, serif' },
    },
    verdana: {
      label: 'Verdana',
      css: { 'font-family': 'Verdana, sans-serif' },
    },
    'courier-new': {
      label: 'Courier New',
      css: { 'font-family': '"Courier New", monospace' },
    },
    'comic-sans': {
      label: 'Comic Sans MS',
      css: { 'font-family': '"Comic Sans MS", cursive' },
    },
    impact: {
      label: 'Impact',
      css: { 'font-family': 'Impact, fantasy' },
    },
  },
  fontSize: {
    '8px': { label: '8px', css: { 'font-size': '8px' } },
    '10px': { label: '10px', css: { 'font-size': '10px' } },
    '12px': { label: '12px', css: { 'font-size': '12px' } },
    '14px': { label: '14px', css: { 'font-size': '14px' } },
    '16px': { label: '16px', css: { 'font-size': '16px' } },
    '18px': { label: '18px', css: { 'font-size': '18px' } },
    '20px': { label: '20px', css: { 'font-size': '20px' } },
    '24px': { label: '24px', css: { 'font-size': '24px' } },
    '28px': { label: '28px', css: { 'font-size': '28px' } },
    '32px': { label: '32px', css: { 'font-size': '32px' } },
    '36px': { label: '36px', css: { 'font-size': '36px' } },
    '48px': { label: '48px', css: { 'font-size': '48px' } },
  },
} as const
