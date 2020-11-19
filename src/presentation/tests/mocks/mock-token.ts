import { TokenModel } from '~/domain/models'
import { mockTokenModel } from '~/domain/tests'

export const mockGetToken = (): TokenModel => mockTokenModel()
export const mockSetToken = jest.fn()
