export interface Validation {
  validate: (fieldName: string, fieldValue: string) => string
}

export type ParsedError = {
  error: string
  option: any
}
