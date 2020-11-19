import { InvalidFieldError } from '~/validation/errors'
import { FieldValidation } from '~/validation/protocols'

export class CompareFieldValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (input: FieldValidation.Params): Error {
    return input[this.field] !== this.valueToCompare
      ? new InvalidFieldError('errors.mismatchField')
      : null
  }
}
