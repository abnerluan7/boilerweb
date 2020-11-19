import React from 'react'
import { LoginPage } from '~/presentation/pages'
import { makeLoginValidation } from './login-page-validation-factory'

const makeLoginPage: React.FC = () => (
  <LoginPage validation={makeLoginValidation()} />
)

export default makeLoginPage
