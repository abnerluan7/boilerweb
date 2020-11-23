import faker from 'faker'
import {
  AccessDeniedError,
  InvalidCredentialsError,
  UnexpectedError
} from '~/domain/common/exceptions'
import { Error, Success } from '~/domain/common/utils'
import { Authentication } from '~/domain/modules'
import { mockTokenModel } from '~/domain/tests'
import { HttpStatusCode } from '~/application/protocols/http'
import { HttpClientSpy } from '~/application/tests'
import { RemoteEmailAuthentication } from './remoteEmailAuthentication'

type SutTypes = {
  sut: RemoteEmailAuthentication
  httpClientSpy: HttpClientSpy<RemoteEmailAuthentication.Model>
  authParams: Authentication.EmailParams
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const authParams = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  const httpClientSpy = new HttpClientSpy<RemoteEmailAuthentication.Model>()
  const sut = new RemoteEmailAuthentication(url, httpClientSpy)

  return { sut, httpClientSpy, authParams }
}

describe('RemoteEmailAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()

    const { sut, httpClientSpy, authParams } = makeSut(url)
    await sut.auth(authParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy, authParams } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const httpResponse = await sut.auth(authParams)

    expect(httpResponse).toEqual(new Error(new UnexpectedError()))
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy, authParams } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const httpResponse = await sut.auth(authParams)

    expect(httpResponse).toEqual(new Error(new InvalidCredentialsError()))
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy, authParams } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const httpResponse = await sut.auth(authParams)

    expect(httpResponse).toEqual(new Error(new AccessDeniedError()))
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy, authParams } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const httpResponse = await sut.auth(authParams)

    expect(httpResponse).toEqual(new Error(new UnexpectedError()))
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy, authParams } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const httpResponse = await sut.auth(authParams)

    expect(httpResponse).toEqual(new Error(new UnexpectedError()))
  })

  test('Should return a TokenModel if HttpClient returns 200', async () => {
    const { sut, httpClientSpy, authParams } = makeSut()
    const httpResult = mockTokenModel(Authentication.Provider.email)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.auth(authParams)

    expect(httpResponse).toEqual(new Success(httpResult))
  })

  test('Should return a TokenModel if HttpClient returns 201', async () => {
    const { sut, httpClientSpy, authParams } = makeSut()
    const httpResult = mockTokenModel(Authentication.Provider.email)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.created,
      body: httpResult
    }

    const httpResponse = await sut.auth(authParams)

    expect(httpResponse).toEqual(new Success(httpResult))
  })
})
