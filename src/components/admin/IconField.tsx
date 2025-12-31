'use client'

import { Button, useField, useTranslation } from '@payloadcms/ui'
import { IconName, IconPicker } from '../ui/icon-picker'
import { TextFieldClientProps } from 'payload'
import { getTranslation } from '@payloadcms/translations'

export default function CustomIconField({ field: { label } }: TextFieldClientProps) {
  const { value, setValue } = useField<IconName | null>()
  const { i18n } = useTranslation()

  return (
    <div className="flex flex-col gap-y-1 items-start">
      {label && <label className="field-label">{getTranslation(label, i18n)}</label>}
      <div className="flex gap-x-2 items-center justify-start">
        <IconPicker
          searchPlaceholder="Vyhledejte ikonu..."
          triggerPlaceholder="Vyberte ikonu"
          value={value as IconName}
          onValueChange={setValue}
        />
        <Button className="m-0" onClick={() => setValue(null)}>
          Odstranit
        </Button>
      </div>
    </div>
  )
}
