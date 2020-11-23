import faker from 'faker'
import { mockTokenModel } from '~/domain/tests'
import { HttpRequest } from '~/application/protocols/http'
import {
  mockHttpRequest,
  GetStorageSpy,
  HttpClientSpy
} from '~/application/tests'
import { AuthorizeHttpClientDecorator } from './authorizeHttpClientDecorator'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
  tokenPath: string
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const tokenPath = faker.random.word()
  const sut = new AuthorizeHttpClientDecorator(
    tokenPath,
    getStorageSpy,
    httpClientSpy
  )

  return { getStorageSpy, httpClientSpy, sut, tokenPath }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy, tokenPath } = makeSut()
    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe(tokenPath)
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field: faker.random.words()
      }
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('Should add headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    const value = mockTokenModel()
    getStorageSpy.value = value
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${value.accessToken}`
    })
  })

  test('Should merge headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    const field = faker.random.words()
    const value = mockTokenModel()
    getStorageSpy.value = value
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field
      }
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      field,
      Authorization: `Bearer ${value.accessToken}`
    })
  })

  test('Should return the same result as HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
