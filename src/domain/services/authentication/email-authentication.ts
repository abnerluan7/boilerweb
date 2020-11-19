import { Authentication } from '~/domain/modules'

export interface EmailAuthentication {
  auth: (params: Authentication.EmailParams) => Promise<Authentication.Model>
}
