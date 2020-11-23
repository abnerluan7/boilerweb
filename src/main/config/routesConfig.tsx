import { lazy } from 'react'

export const RouteConfig = {
  login: {
    path: '/',
    title: 'Login',
    private: false,
    component: lazy(async () =>
      import('~/main/factories/pages/loginPage/loginPageFactory')
    ),
    layout: 'DefaultLayout'
  }
}
