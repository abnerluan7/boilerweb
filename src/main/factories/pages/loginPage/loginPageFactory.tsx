import React from 'react'
import { LoginPage } from '~/presentation/pages'
import { makeLoginValidation } from './loginPageValidationFactory'

const makeLoginPage: React.FC = () => (
  <LoginPage validation={makeLoginValidation()} />
)

export default makeLoginPage
