import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { makeLayouts } from '~/main/factories/layouts'
import { AppProviderComposition } from '~/main/factories/providers'
import { FullPageLoading } from '~/presentation/components'

const Router: React.FC = () => {
  return (
    <React.Suspense fallback={<FullPageLoading />}>
      <AppProviderComposition>
        <BrowserRouter>
          <CssBaseline />
          {makeLayouts()}
        </BrowserRouter>
      </AppProviderComposition>
    </React.Suspense>
  )
}

export default Router
