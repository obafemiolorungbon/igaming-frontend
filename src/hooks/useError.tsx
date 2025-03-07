import { useCallback, useState } from 'react'

interface ErrorHandlerProps {
  key: string
  value: string
  reset?: boolean
}

interface UseHandleFormErrorsProps<T extends Record<string, string>> {
  initialValues: T
}

export const useHandleFormErrors = <T extends Record<string, any>>({
  initialValues,
}: UseHandleFormErrorsProps<T>) => {
  // TODO: remove this and replace with
  const [errors, setErrors] = useState<T>(initialValues)

  const handleError = useCallback(
    ({ key, value, reset }: ErrorHandlerProps) => {
      if (reset) {
        setErrors(initialValues)
      } else {
        setErrors((prev: T) => ({
          ...prev,
          [key]: value,
        }))
      }
    },
    [initialValues]
  )

  return { handleError, errors }
}
