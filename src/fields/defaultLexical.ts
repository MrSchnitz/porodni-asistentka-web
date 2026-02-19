import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'

import { richTextTextState } from './richTextTextState'

export const defaultLexical = lexicalEditor({
  features: ({ rootFeatures, defaultFeatures }) => {
    return [
      ...rootFeatures,
      ...defaultFeatures,
      // Toolbars
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      // Font selection (config shared with RichText converter for frontend rendering)
      TextStateFeature({ state: richTextTextState }),
      // Media
      // UploadFeature({
      //   collections: {
      //     media: {
      //       fields: ({ defaultFields }: { defaultFields: any[] }) => defaultFields,
      //     },
      //   },
      // }),
    ]
  },
})
