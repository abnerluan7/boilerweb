import { ValidationComposite, ValidationBuilder } from '~/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email')
      .email()
      .required()
      .build(),
    ...ValidationBuilder.field('password')
      .required()
      .min(8)
      .build()
  ])
}
