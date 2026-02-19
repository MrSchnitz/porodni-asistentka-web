'use client'

import { useEffect } from 'react'

/**
 * Provider that disables mobile keyboard on date inputs
 */
const DateInputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target
      if (target instanceof HTMLInputElement) {
        const isDateInput = target.closest(
          '.field-type.date, .field-type.datetime, .react-datepicker-wrapper',
        )
        if (isDateInput) {
          target.setAttribute('inputmode', 'none')
          target.setAttribute('readonly', 'readonly')
        }
      }
    }

    document.addEventListener('focusin', handleFocus, true)
    return () => {
      document.removeEventListener('focusin', handleFocus, true)
    }
  }, [])

  return <>{children}</>
}

export default DateInputProvider
