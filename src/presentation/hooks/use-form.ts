import { useContext } from 'react'
import { FormContextProps } from '~/presentation/common/types'
import { FormContext } from '~/presentation/contexts'

export const useForm = <T = any, R = any>(): FormContextProps<T, R> => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useForm must be used within a FormProvider')
  }

  return context
}
