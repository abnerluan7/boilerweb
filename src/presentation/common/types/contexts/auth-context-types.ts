import { TokenModel } from '~/domain/models'
import { Authentication } from '~/domain/modules'

export type AuthContextProps = {
  emailSignIn: (body: Authentication.EmailParams) => Promise<void>
  getToken: () => TokenModel
  setToken: (token: TokenModel) => void
  logout: () => void
  isAuthenticated: boolean
}
