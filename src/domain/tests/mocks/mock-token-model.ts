import faker from 'faker'
import { TokenModel } from '~/domain/models'
import { Authentication } from '~/domain/modules'

export const mockTokenModel = (
  provider: Authentication.Provider = faker.random.arrayElement([
    Authentication.Provider.google,
    Authentication.Provider.facebook,
    Authentication.Provider.email
  ])
): TokenModel => ({
  provider,
  accessToken: faker.random.uuid(),
  expiresIn: faker.random.number(),
  refreshToken: faker.random.uuid(),
  refreshTokenExpiresIn: faker.random.number()
})
