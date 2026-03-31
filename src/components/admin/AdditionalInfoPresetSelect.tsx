'use client'

import { AdditionalInfo } from '@/features/_shared/types'
import { FieldLabel, SelectInput, useField } from '@payloadcms/ui'
import type { SelectFieldClientProps } from 'payload'

type PresetSelectField = SelectFieldClientProps['field'] & {
  presets?: AdditionalInfo[]
}

const AdditionalInfoPresetSelect: React.FC<SelectFieldClientProps> = ({ path, field }) => {
  const presetField = field as PresetSelectField
  const { value, setValue } = useField<string>({ path })
  const iconPath = path.replace(/\.preset$/, '.icon')
  const titlePath = path.replace(/\.preset$/, '.title')
  const textPath = path.replace(/\.preset$/, '.value')
  const { setValue: setIcon } = useField<string>({ path: iconPath })
  const { setValue: setTitle } = useField<string>({ path: titlePath })
  const { setValue: setText } = useField<string>({ path: textPath })
  const presets = presetField.presets ?? []

  const handleChange = (selectedValue: string) => {
    setValue(selectedValue)
    const preset = presets.find((item) => item.title === selectedValue)

    if (!preset) {
      return
    }

    setIcon(preset.icon)
    setTitle(preset.title)
    setText(preset.value)
  }

  const options =
    field.options?.map((option) =>
      typeof option === 'string' ? { label: option, value: option } : option,
    ) ?? []

  return (
    <div className="field-type select">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value || ''}
        onChange={(option) => {
          if (option && !Array.isArray(option)) {
            handleChange((option.value as string) || '')
          }
        }}
      />
    </div>
  )
}

export default AdditionalInfoPresetSelect
