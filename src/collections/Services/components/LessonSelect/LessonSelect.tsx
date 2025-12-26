'use client'

import {
  FieldLabel,
  SelectInput,
  TextInput,
  useDocumentInfo,
  useField,
  usePayloadAPI,
} from '@payloadcms/ui'
import { TextFieldClientProps } from 'payload'
import { Service } from '@/payload-types'
import { useMemo } from 'react'

const LessonSelect: React.FC<TextFieldClientProps> = (props) => {
  const { path, field } = props
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const { id } = useDocumentInfo()

  // Get courseId path from current field path (e.g., "schedules.0.scheduleItems.1.lesson" -> "schedules.0.courseIndex")
  const courseIdPath = useMemo(() => {
    const match = path.match(/^(schedules\.\d+)\./)
    return match ? `${match[1]}.courseIndex` : null
  }, [path])

  // Get courseId from the parent planning item (subscribes to form changes)
  const { value: courseId } = useField<string>({ path: courseIdPath || '' })

  // Fetch service data for courses/lessons
  const apiUrl = id ? `/api/services/${id}?depth=0` : ''
  const [{ data, isLoading }] = usePayloadAPI(apiUrl)
  const service = data as Service | undefined

  // Find the selected course by ID and get its lessons
  const lessons = useMemo(() => {
    if (service?.serviceType === 'lessons') {
      return service?.lessonsSection?.lessons || []
    }

    if (!courseId || !service?.courses) {
      return []
    }

    const course = service.courses.find((c) => c.id === courseId)
    return course?.lessonsSection?.lessons || []
  }, [courseId, service])

  // Convert lessons to select options
  const lessonOptions = useMemo(
    () => lessons.map((lesson) => ({ label: lesson.title, value: lesson.title })),
    [lessons],
  )

  return (
    <div style={{ marginBottom: 'var(--spacing-field)' }}>
      <FieldLabel label={field.label || 'Obsah'} path={path} required={field.required} />

      {/* Show lesson select as prefill helper when course has lessons */}
      {lessonOptions.length > 0 && !isLoading && (
        <div style={{ marginBottom: '8px' }}>
          <SelectInput
            path={`${path}_prefill`}
            name={`${path}_prefill`}
            options={[{ label: '📚 Vybrat z lekcí...', value: '' }, ...lessonOptions]}
            value=""
            onChange={(option) => {
              if (option && !Array.isArray(option) && option.value) {
                setValue(option.value as string)
              }
            }}
          />
        </div>
      )}

      {/* Always show the input */}
      <TextInput
        path={path}
        value={value || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Zadejte obsah termínu"
        required={field.required}
        showError={showError}
      />
      {showError && errorMessage && (
        <div className="field-error" style={{ color: 'var(--theme-error-500)', marginTop: '4px' }}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default LessonSelect
