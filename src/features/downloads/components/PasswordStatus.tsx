'use client'

import { useDocumentInfo, useForm } from '@payloadcms/ui'

const PasswordStatus = () => {
  const { initialData } = useDocumentInfo()
  const { getData } = useForm()

  // Check both initial data and current form data
  const formData = getData()
  const passwordHash =
    formData?.passwordHash || (initialData as { passwordHash?: string })?.passwordHash
  const hasPassword =
    passwordHash && typeof passwordHash === 'string' && passwordHash.startsWith('$2')

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '4px',
        marginBottom: '16px',
        backgroundColor: hasPassword ? 'var(--theme-success-100)' : 'var(--theme-warning-100)',
        border: `1px solid ${hasPassword ? 'var(--theme-success-500)' : 'var(--theme-warning-500)'}`,
        color: hasPassword ? 'var(--theme-success-800)' : 'var(--theme-warning-800)',
      }}
    >
      {hasPassword ? '✓ Heslo je nastaveno' : '⚠ Heslo není nastaveno'}
    </div>
  )
}

export default PasswordStatus
