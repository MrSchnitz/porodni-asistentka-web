'use client'

import { FieldLabel, SelectInput, useDocumentInfo, useField, usePayloadAPI } from '@payloadcms/ui'
import { TextFieldClientProps } from 'payload'
import { Service } from '@/payload-types'
import { useEffect, useMemo } from 'react'

type CourseOption = { label: string; value: string }

const CourseSelect: React.FC<TextFieldClientProps> = (props) => {
  const { path, field } = props
  const { value, setValue } = useField<string>({ path })
  const { id } = useDocumentInfo()

  // Get title field path (e.g., "planning.0.courseIndex" -> "planning.0.title")
  const titlePath = path.replace(/\.courseIndex$/, '.title')
  const { setValue: setTitle } = useField<string>({ path: titlePath })

  // Fetch courses using Payload's API hook
  const apiUrl = id ? `/api/services/${id}?depth=0` : ''
  const [{ data, isLoading }] = usePayloadAPI(apiUrl)
  const service = data as Service | undefined

  // Build options with course names stored for title prefill
  const coursesData = useMemo(
    () =>
      service?.courses
        ?.filter((course) => course.id)
        .map((course, index) => ({
          id: course.id!,
          name: course.name || `Kurz ${index + 1}`,
        })) || [],
    [service],
  )

  const options: CourseOption[] = useMemo(
    () => coursesData.map((c) => ({ label: c.name, value: c.id })),
    [coursesData],
  )

  // Clear value if selected course no longer exists
  useEffect(() => {
    if (value && options.length > 0 && !options.some((opt) => opt.value === value)) {
      setValue('')
    }
  }, [value, options, setValue])

  const handleChange = (courseId: string) => {
    setValue(courseId)
    // Prefill title with course name
    const course = coursesData.find((c) => c.id === courseId)
    if (course) {
      setTitle(course.name)
    }
  }

  return (
    <div className="field-type select">
      <FieldLabel label={field.label || 'Kurz (volitelné)'} path={path} />
      {isLoading ? (
        <SelectInput
          path={path}
          name={path}
          options={[{ label: 'Načítání...', value: '' }]}
          value=""
          onChange={() => {}}
        />
      ) : (
        <SelectInput
          path={path}
          name={path}
          options={[{ label: '-- Bez kurzu --', value: '' }, ...options]}
          value={value || ''}
          onChange={(option) => {
            if (option && !Array.isArray(option)) {
              handleChange((option.value as string) || '')
            }
          }}
        />
      )}
      {!isLoading && options.length === 0 && (
        <p style={{ color: 'var(--theme-warning-500)', marginTop: '8px', fontSize: '12px' }}>
          💡 Tip: Přidejte kurzy v záložce &quot;Lekce/Kurzy&quot; a uložte pro možnost výběru
        </p>
      )}
    </div>
  )
}

export default CourseSelect

