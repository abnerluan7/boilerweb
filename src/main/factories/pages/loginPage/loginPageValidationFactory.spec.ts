import {
  ValidationComposite,
  MinLegthValidation,
  RequiredFieldValidation,
  EmailValidation
} from '~/validation/validators'
import { makeLoginValidation } from './loginPageValidationFactory'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new EmailValidation('email'),
        new RequiredFieldValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLegthValidation('password', 8)
      ])
    )
  })
})
