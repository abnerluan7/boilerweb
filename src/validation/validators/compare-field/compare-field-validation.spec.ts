import faker from 'faker'
import { InvalidFieldError } from '~/validation/errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (
  field: string,
  valueToCompare: string
): CompareFieldValidation => new CompareFieldValidation(field, valueToCompare)

describe('CompareFieldValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, faker.random.word())
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError('errors.mismatchField'))
  })

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const valueToCompare = faker.random.word()
    const sut = makeSut(field, valueToCompare)
    const error = sut.validate({ [field]: valueToCompare })
    expect(error).toBeFalsy()
  })
})
