import faker from 'faker'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLegthValidation
} from '~/validation/validators'
import { ValidationBuilder as sut } from './validationBuilder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut
      .field(field)
      .required()
      .build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut
      .field(field)
      .email()
      .build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLenghValidation', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = sut
      .field(field)
      .min(length)
      .build()
    expect(validations).toEqual([new MinLegthValidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = sut
      .field(field)
      .required()
      .email()
      .min(length)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLegthValidation(field, length)
    ])
  })
})
