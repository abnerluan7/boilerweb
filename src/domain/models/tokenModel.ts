import { Authentication } from '~/domain/modules'

export type TokenModel = {
  provider: Authentication.Provider
  accessToken: string
  expiresIn: number
  refreshToken: string
  refreshTokenExpiresIn: number
}
