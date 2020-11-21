import { Response } from '~/domain/common/types'
import { TokenModel } from '~/domain/models'

export namespace Authentication {
  export enum Provider {
    google = 'Google',
    facebook = 'Facebook',
    email = 'Email'
  }

  export type Model = Response<TokenModel>

  export type EmailParams = {
    email: string
    password: string
  }
}
