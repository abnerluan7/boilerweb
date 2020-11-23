import { FieldValidation } from '~/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null

  constructor (readonly field: string) {}

  validate (input: FieldValidation.Params): Error {
    return this.error
  }
}
