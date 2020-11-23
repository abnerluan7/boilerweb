import React from 'react'
import { Router } from 'react-router-dom'
import { render, RenderResult } from '@testing-library/react'
import { MemoryHistory, createMemoryHistory } from 'history'
import { TokenModel } from '~/domain/models'
import {
  AuthProvider,
  ThemeProvider,
  ToastProvider
} from '~/presentation/providers'
import {
  EmailAuthenticationSpy,
  mockGetToken,
  mockSetToken
} from '~/presentation/tests'

type MockAppProviderParams = {
  emailAuthenticationSpy?: EmailAuthenticationSpy
  history?: MemoryHistory
  setTokenSpy?: (token: TokenModel) => void
  getTokenSpy?: () => TokenModel
  Sut: React.ReactElement
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: (): any => new Promise(() => {})
    }
  })
}))

export const mockAppProvider = ({
  emailAuthenticationSpy = new EmailAuthenticationSpy(),
  history = createMemoryHistory(),
  getTokenSpy = mockGetToken,
  setTokenSpy = mockSetToken,
  Sut
}: MockAppProviderParams): RenderResult =>
  render(
    <Router history={history}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider
            emailAuthentication={emailAuthenticationSpy}
            getToken={getTokenSpy}
            setToken={setTokenSpy}
          >
            {Sut}
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  )
