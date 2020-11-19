import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import { TokenModel } from '~/domain/models'
import {
  EmailAuthenticationSpy,
  mockAppProvider,
  mockSetToken,
  ValidationStub
} from '~/presentation/tests'
import { populateField } from '~/presentation/tests/helpers/form-helper'
import LoginPage from './login'

type SutTypes = {
  validationStub: ValidationStub
  emailAuthenticationSpy: EmailAuthenticationSpy
  email: string
  password: string
  setTokenSpy: (token: TokenModel) => void
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const emailAuthenticationSpy = new EmailAuthenticationSpy()
  const email = faker.internet.email()
  const password = faker.internet.password()
  const setTokenSpy = mockSetToken
  mockAppProvider({
    emailAuthenticationSpy,
    setTokenSpy,
    Sut: <LoginPage validation={validationStub} />
  })

  return {
    validationStub,
    email,
    password,
    emailAuthenticationSpy,
    setTokenSpy
  }
}

const simulateValidSubmit = async (
  email: string,
  password: string
): Promise<void> => {
  populateField(email, 'email')
  populateField(password, 'password')
  const form = screen.getByRole('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('LoginPage', () => {
  beforeEach(() => jest.clearAllMocks())

  test('Should call validation with correct email', () => {
    const { validationStub, email } = makeSut()
    populateField(email, 'email')
    expect(validationStub.fieldName).toBe('email')
    expect(validationStub.fieldValue).toBe(email)
  })

  test('Should call validation with correct password', () => {
    const { validationStub, password } = makeSut()
    populateField(password, 'password')
    expect(validationStub.fieldName).toBe('password')
    expect(validationStub.fieldValue).toBe(password)
  })

  test('Should show email error if Validation fails', () => {
    const { validationStub, email } = makeSut()
    const errorMessage = faker.random.words()
    validationStub.errorMessage = errorMessage
    populateField(email, 'email')
    expect(screen.getByTitle('email-helper')).toHaveTextContent(errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const { validationStub, password } = makeSut()
    const errorMessage = faker.random.words()
    validationStub.errorMessage = errorMessage
    populateField(password, 'password')
    expect(screen.getByTitle('password-helper')).toHaveTextContent(errorMessage)
  })

  test('Should call EmailAuthentication with corrrect values', async () => {
    const { emailAuthenticationSpy, email, password } = makeSut()
    await simulateValidSubmit(email, password)
    expect(emailAuthenticationSpy.params).toEqual({ email, password })
  })

  test('Should call setToken on success', async () => {
    const { emailAuthenticationSpy, setTokenSpy, email, password } = makeSut()
    await simulateValidSubmit(email, password)

    expect(setTokenSpy).toHaveBeenCalledTimes(1)
    expect(setTokenSpy).toHaveBeenCalledWith(emailAuthenticationSpy.token)
  })
})
