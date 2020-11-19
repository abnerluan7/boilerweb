export type FormContextProps<T = any, R = any> = {
  form: T
  errors: R
  handleChange: (params: FormHandleChangeParams) => void
  validate: () => boolean
  isInvalid: boolean
  onSubmit: (values: any) => Promise<void>
}

export type FormHandleChangeParams = {
  name: string
  value: string | boolean
}

export type FormState = {
  [key: string]: string
}

export type FormErrorState = {
  [key: string]: string
}
