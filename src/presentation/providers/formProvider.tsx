import React, { useCallback, useState } from 'react'
import { ParsedError, Validation } from '~/presentation/common/protocols'
import {
  FormContextProps,
  FormErrorState,
  FormHandleChangeParams,
  FormState
} from '~/presentation/common/types'
import { FormContext } from '~/presentation/contexts'
import { useTranslation } from '../hooks'

type Props = Omit<
FormContextProps,
'handleChange' | 'isInvalid' | 'validate'
> & {
  validation: Validation
}

const FormProvider: React.FC<Props> = ({
  errors,
  form,
  validation,
  onSubmit,
  children
}) => {
  const { translate } = useTranslation()
  const [formState, setFormState] = useState<FormState>({ ...form })
  const [errorState, setErrorState] = useState<FormErrorState>({ ...errors })

  const hasError = useCallback((): boolean => {
    const error = Object.values(errorState).filter((value: string) => value)
    return error.length > 0
  }, [errorState])

  const handleChange = useCallback(
    ({ name, value }: FormHandleChangeParams): void => {
      setFormState((prev: any) => ({ ...prev, [name]: value }))

      const errorMessage = validateField(name, value as string)

      setErrorState((prev: any) => ({
        ...prev,
        [name]: errorMessage
      }))
    },
    [validation]
  )

  const validate = (): boolean => {
    let isValid = {}
    for (const name in formState) {
      const errorMessage = validateField(name, formState[name])

      isValid = {
        ...isValid,
        [name]: errorMessage
      }
      setErrorState((prev: any) => ({
        ...prev,
        [name]: errorMessage
      }))
    }

    return Object.values(isValid).filter((value: string) => value).length > 0
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    if (validate()) return null
    onSubmit(formState)
  }

  const validateField = (name: string, value: string): string => {
    const error = validation.validate(name, value)

    const parsedError = parseError(error)

    return parsedError
      ? translate(parsedError.error, parsedError.option)
      : translate(error)
  }

  const parseError = (error: string): ParsedError =>
    error?.includes('"option":') && JSON.parse(error)

  return (
    <FormContext.Provider
      value={{
        errors: errorState,
        form: formState,
        handleChange,
        isInvalid: hasError(),
        validate,
        onSubmit: handleSubmit
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
