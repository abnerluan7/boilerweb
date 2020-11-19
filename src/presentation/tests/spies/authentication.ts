import { success } from '~/domain/common/utils'
import { Authentication } from '~/domain/modules'
import { EmailAuthentication } from '~/domain/services'
import { mockTokenModel } from '~/domain/tests'

export class EmailAuthenticationSpy implements EmailAuthentication {
  token = mockTokenModel()
  params: Authentication.EmailParams

  async auth (
    params: Authentication.EmailParams
  ): Promise<Authentication.Model> {
    this.params = params
    return success(this.token)
  }
}
