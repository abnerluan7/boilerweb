import { mockTokenModel } from '~/domain/tests'
import { LocalStorageAdapter } from '~/infra/cache'
import { getTokenAdapter, setTokenAdapter } from './accessTokenAdapter'

jest.mock('~/infra/cache/local-storage/local-storage-adapter')

describe('AccessTokenAdapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const token = mockTokenModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setTokenAdapter(token)
    expect(setSpy).toHaveBeenCalledWith('token', token)
  })

  test('Should call LocalStorageAdapter.get with correct values', () => {
    const token = mockTokenModel()
    const setSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(token)
    const result = getTokenAdapter()
    expect(setSpy).toHaveBeenCalledWith('token')
    expect(result).toEqual(token)
  })
})
